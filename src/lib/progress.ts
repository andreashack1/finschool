import { gamificationConfig as config } from "../content/gamification-config";
import { levels } from "../content/levels";
import { achievements, type Achievement } from "../content/achievements";
import { dailyChallenges } from "../content/daily-challenges";
import { getLessonById, getLegacyQuickLesson, getReadyLessons } from "../content/lessons";
import type { LessonScreen, ReadyLesson } from "../types/learning";
import type { ProgressState, DomainResult, XpEvent, XpEventType, LessonSessionResult, SimulationState, LessonRewardSummary } from "../types/progress";
import { ProgressSchema, XpEventSchema, LessonStatsSchema, DailyChallengeResultSchema, SimulationSchema, LevelUpSchema } from "./progress-schema";
import { addCalendarDays, getBucharestDateKey, getBucharestWeekKey, isDateKey } from "./bucharest-date";
import { shuffleOptions } from "./lesson-options";
export { getBucharestDateKey, getBucharestWeekKey } from "./bucharest-date";
export { SIMULATOR_COMPLETION_XP } from "../content/gamification-config";
export const PROGRESS_STORAGE_KEY = "finly-progress-v2";
export const PROGRESS_VERSION = config.storageVersion;
export const SIMULATOR_ID = config.simulatorId;
export const initialSimulation: SimulationState = { step: 0, balance: 3500, savings: 0, history: [] };
const object = (v: unknown): Record<string, unknown> => v && typeof v === "object" && !Array.isArray(v) ? v as Record<string, unknown> : {};
const strings = (v: unknown) => Array.isArray(v) ? [...new Set(v.filter((x): x is string => typeof x === "string" && x.length > 0))] : [];
const dates = (v: unknown) => strings(v).filter(isDateKey).sort();
const iso = (v: unknown): string | null => typeof v === "string" && /^\d{4}-\d\d-\d\dT/.test(v) && Number.isFinite(Date.parse(v)) ? new Date(v).toISOString() : null;
const integer = (v: unknown, fallback = 0) => typeof v === "number" && Number.isInteger(v) && v >= 0 ? v : fallback;
const monday = (key: string) => addCalendarDays(key, -((new Date(key + "T12:00:00Z").getUTCDay() + 6) % 7));
export function createEmptyProgress(now?: Date): ProgressState {
  const key = now ? getBucharestDateKey(now) : null, timestamp = now?.toISOString() ?? null;
  return { version: PROGRESS_VERSION, xp_events: [], lessonStats: {}, activityDates: [], freezeDates: [], freezeBalance: config.freeze.initialBalance, lastFreezeGrantWeekKey: key ? getBucharestWeekKey(key) : null, lastFreezeGrantDateKey: key ? monday(key) : null, dailyChallenges: {}, achievementUnlocks: {}, seenAchievementToastIds: [], seenFreezeToastDates: [], pendingLevelUp: null, simulation: { ...initialSimulation, history: [] }, uniqueCorrectAnswers: [], lastLessonId: null, maxSeenDateKey: key, maxSeenAt: timestamp, createdAt: timestamp, updatedAt: timestamp };
}
export function getEffectiveDateKey(p: ProgressState, now: Date) { return [getBucharestDateKey(now), p.maxSeenDateKey ?? ""].sort().at(-1)!; }
function effectiveNow(p: ProgressState, now: Date) { return p.maxSeenAt && p.maxSeenAt > now.toISOString() ? new Date(p.maxSeenAt) : now; }
function dedupeEvents(events: readonly XpEvent[]) { return [...new Map([...events].reverse().map(e => [e.id, e])).values()].reverse(); }
export const getTotalXp = (p: ProgressState) => dedupeEvents(p.xp_events).reduce((sum, e) => sum + e.amount, 0);
export const getEarnedXpExcludingDebug = (p: ProgressState) => dedupeEvents(p.xp_events).filter(e => config.rewards[e.type].countsTowardEarnedXp).reduce((sum, e) => sum + e.amount, 0);
export const getCompletedLessonIds = (p: ProgressState) => Object.entries(p.lessonStats).filter(([, s]) => s.completed).map(([id]) => id);
export const getCompletedLessonCount = (p: ProgressState) => getCompletedLessonIds(p).length;
export const getSimulatorCompletionIds = (p: ProgressState) => [...new Set(p.xp_events.filter(e => e.type === "simulator_completion").map(e => e.refId ?? e.id.replace(/^simulator-completion:/, "")))];
export function getCurrentLevel(totalXp: number) { return [...levels].reverse().find(l => l.minXp <= Math.max(0, totalXp)) ?? levels[0]; }
export function getLevelProgress(totalXp: number) {
  const current = getCurrentLevel(totalXp), next = levels.find(l => l.level === current.level + 1);
  const earned = Math.max(0, totalXp - current.minXp), target = next ? next.minXp - current.minXp : 0;
  return { current, next, isMax: !next, earned, target, remainingXp: next ? Math.max(0, next.minXp - totalXp) : 0, percent: next ? Math.max(0, Math.min(100, earned / target * 100)) : 100 };
}
export function getQualifyingXpForDate(p: ProgressState, key: string) { return dedupeEvents(p.xp_events).filter(e => e.bucharestDateKey === key && config.rewards[e.type].countsTowardDailyGoal).reduce((sum, e) => sum + e.amount, 0); }
export function getDailyGoalState(p: ProgressState, key: string) { const current = getQualifyingXpForDate(p, key), target = config.dailyGoalTargetXp; return { current, target, completed: current >= target, percent: Math.min(100, current / target * 100) }; }
export const getTodayGoal = getDailyGoalState;
export function selectDailyChallenge(key: string) {
  if (!isDateKey(key)) throw new Error("Invalid challenge date");
  // One monthly permutation, not a daily modulo hash: no repeated IDs in a month.
  const ordered = shuffleOptions([...dailyChallenges].sort((a, b) => a.id.localeCompare(b.id)), `${key.slice(0, 7)}:${config.challengeRotationVersion}`);
  return ordered[Number(key.slice(8)) - 1];
}
export function getDailyChallengeFor(p: ProgressState, key: string) { const saved = p.dailyChallenges[key]; return dailyChallenges.find(c => c.id === saved?.challengeId) ?? selectDailyChallenge(key); }
export function calculateStreak(p: ProgressState, today: string) {
  const active = [...new Set(p.activityDates)].filter(d => d <= today).sort(), frozen = new Set(p.freezeDates);
  let current = 0, longest = 0, previous: string | null = null;
  for (const day of active) {
    const connected = previous && (day === addCalendarDays(previous, 1) || (day === addCalendarDays(previous, 2) && frozen.has(addCalendarDays(previous, 1))));
    current = connected ? current + 1 : 1; longest = Math.max(longest, current); previous = day;
  }
  if (!previous || (today !== previous && today !== addCalendarDays(previous, 1) && !(today === addCalendarDays(previous, 2) && frozen.has(addCalendarDays(previous, 1))))) current = 0;
  return { current, longest, freezeAvailable: p.freezeBalance > 0 };
}
export const getCurrentStreak = (p: ProgressState, today: string) => calculateStreak(p, today).current;
export const getLongestStreak = (p: ProgressState) => calculateStreak(p, p.maxSeenDateKey ?? p.activityDates.at(-1) ?? "1970-01-01").longest;
export const getFreezeState = (p: ProgressState) => ({ balance: p.freezeBalance, max: config.freeze.maxBalance });
export function getLast7Days(p: ProgressState, today: string) { return Array.from({ length: 7 }, (_, i) => { const date = addCalendarDays(today, i - 6); return { date, weekday: ["D", "L", "Ma", "Mi", "J", "V", "S"][new Date(date + "T12:00:00Z").getUTCDay()], state: p.activityDates.includes(date) ? "activity" : p.freezeDates.includes(date) ? "freeze" : date === today ? "today" : "missed" }; }); }
export function reconcileCalendar(p: ProgressState, now: Date): ProgressState {
  const today = getEffectiveDateKey(p, now), timestamp = effectiveNow(p, now).toISOString();
  let balance = p.freezeBalance, grant = p.lastFreezeGrantDateKey ?? monday(today);
  const advanceGrants = (until: string) => { const target = monday(until); while (grant < target) { grant = addCalendarDays(grant, 7); balance = Math.min(config.freeze.maxBalance, balance + config.freeze.weeklyGrant); } };
  const lastActive = p.activityDates.filter(d => d < today).at(-1), missed = lastActive ? addCalendarDays(lastActive, 1) : null;
  const freezes = [...p.freezeDates];
  // Only a single fully elapsed day can be bridged. Never chain freezes over
  // two missed days, even if a prior app load already consumed the first one.
  if (lastActive && missed && today === addCalendarDays(lastActive, 2) && !p.activityDates.includes(missed) && !freezes.includes(missed) && !freezes.includes(addCalendarDays(missed, -1)) && !freezes.includes(addCalendarDays(missed, 1))) {
    advanceGrants(missed);
    if (balance > 0) { freezes.push(missed); balance--; }
  }
  advanceGrants(today);
  // Local-clock regression protection; this is not server-side anti-cheat.
  return { ...p, freezeBalance: balance, freezeDates: freezes.sort(), lastFreezeGrantDateKey: grant, lastFreezeGrantWeekKey: getBucharestWeekKey(today), maxSeenDateKey: today, maxSeenAt: timestamp, createdAt: p.createdAt ?? timestamp };
}
export function normalizeProgress(value: unknown, now: Date): ProgressState {
  const root = object(value);
  if (root.version !== PROGRESS_VERSION) return createEmptyProgress(now);
  const base = createEmptyProgress(now), events: XpEvent[] = [];
  if (Array.isArray(root.xp_events)) for (const value of root.xp_events) { const parsed = XpEventSchema.safeParse(value); if (parsed.success && !events.some(e => e.id === parsed.data.id)) events.push(parsed.data); }
  const lessonStats: ProgressState["lessonStats"] = {};
  for (const [id, value] of Object.entries(object(root.lessonStats))) {
    const raw = object(value), parsed = LessonStatsSchema.safeParse({ completed: false, bestFirstTryCorrect: 0, questionCount: 0, perfectEver: false, completionCount: 0, sessionIds: [], ...raw });
    if (parsed.success) { const stats = parsed.data; lessonStats[id] = { ...stats, bestFirstTryCorrect: Math.min(stats.bestFirstTryCorrect, stats.questionCount), sessionIds: strings(stats.sessionIds) }; }
  }
  // A partial v2 object must not make a journaled completion look like a first
  // completion again. Recover the available score evidence, without minting XP.
  for (const completion of events.filter(e => e.type === "lesson_completion")) {
    const id = completion.lessonId ?? completion.id.replace(/^lesson-completion:/, "");
    const content = getLegacyQuickLesson(id) ?? getLessonById(id);
    const questionCount = content?.status === "ready" ? content.screens.filter(isAnswerScreen).length : lessonStats[id]?.questionCount ?? 0;
    const firstScore = events.filter(e => e.type === "lesson_question_first_try" && (e.lessonId === id || e.id.startsWith(`lesson-question:${id}:`))).length;
    const improvements = events.filter(e => e.type === "lesson_replay_improvement" && e.id.startsWith(`lesson-improvement:${id}:best-`)).map(e => Number(e.id.split(":best-")[1])).filter(Number.isInteger);
    const old = lessonStats[id];
    const best = Math.min(questionCount, Math.max(old?.bestFirstTryCorrect ?? 0, firstScore, ...improvements));
    lessonStats[id] = { completed: true, firstCompletedAt: old?.firstCompletedAt ?? completion.createdAt, lastCompletedAt: old?.lastCompletedAt ?? completion.createdAt, bestFirstTryCorrect: best, questionCount, perfectEver: Boolean(old?.perfectEver || (questionCount > 0 && best === questionCount)), completionCount: Math.max(1, old?.completionCount ?? 1), sessionIds: old?.sessionIds ?? [] };
  }
  const daily: ProgressState["dailyChallenges"] = {}, unlocks: ProgressState["achievementUnlocks"] = {};
  for (const [date, value] of Object.entries(object(root.dailyChallenges))) { const parsed = DailyChallengeResultSchema.safeParse(value); if (isDateKey(date) && parsed.success) daily[date] = parsed.data; }
  for (const [id, value] of Object.entries(object(root.achievementUnlocks))) { const timestamp = iso(object(value).unlockedAt); if (timestamp) unlocks[id] = { unlockedAt: timestamp }; }
  const activityDates = dates(root.activityDates), freezeDates = dates(root.freezeDates).filter(d => !activityDates.includes(d));
  const simulation = SimulationSchema.safeParse(root.simulation), levelUp = LevelUpSchema.safeParse(root.pendingLevelUp);
  const latestDate = [...activityDates, ...freezeDates, ...Object.keys(daily), ...events.map(e => e.bucharestDateKey), ...(isDateKey(root.maxSeenDateKey) ? [root.maxSeenDateKey] : []), base.maxSeenDateKey!].sort().at(-1)!;
  const latestTimestamp = [iso(root.maxSeenAt), ...events.map(e => e.createdAt), ...Object.values(daily).map(d => d.answeredAt), ...Object.values(lessonStats).map(s => s.lastCompletedAt), base.maxSeenAt].filter((v): v is string => Boolean(v)).sort().at(-1)!;
  const result: ProgressState = { ...base, xp_events: events, lessonStats, activityDates, freezeDates, freezeBalance: Math.min(config.freeze.maxBalance, integer(root.freezeBalance, config.freeze.initialBalance)), lastFreezeGrantDateKey: isDateKey(root.lastFreezeGrantDateKey) ? monday(root.lastFreezeGrantDateKey) : base.lastFreezeGrantDateKey, lastFreezeGrantWeekKey: typeof root.lastFreezeGrantWeekKey === "string" ? root.lastFreezeGrantWeekKey : base.lastFreezeGrantWeekKey, dailyChallenges: daily, achievementUnlocks: unlocks, seenAchievementToastIds: strings(root.seenAchievementToastIds), seenFreezeToastDates: dates(root.seenFreezeToastDates), pendingLevelUp: levelUp.success ? levelUp.data : null, simulation: simulation.success ? simulation.data : base.simulation, uniqueCorrectAnswers: strings(root.uniqueCorrectAnswers), lastLessonId: typeof root.lastLessonId === "string" ? root.lastLessonId : null, maxSeenDateKey: isDateKey(root.maxSeenDateKey) ? root.maxSeenDateKey : base.maxSeenDateKey, maxSeenAt: iso(root.maxSeenAt) ?? base.maxSeenAt, createdAt: iso(root.createdAt) ?? base.createdAt, updatedAt: iso(root.updatedAt) ?? base.updatedAt };
  return ProgressSchema.parse(reconcileCalendar({ ...result, maxSeenDateKey: latestDate, maxSeenAt: latestTimestamp }, now));
}
export function getAchievementProgress(a: Achievement, p: ProgressState, curriculum: readonly ReadyLesson[] = getReadyLessons()) {
  const c = a.condition, complete = new Set(getCompletedLessonIds(p));
  const coverage = (list: readonly ReadyLesson[]) => ({ current: list.filter(l => complete.has(l.id)).length, target: list.length || 1 });
  let current = 0, target = c.target;
  switch (c.type) {
    case "completed-lessons": current = complete.size; break;
    case "perfect-lessons": current = Object.values(p.lessonStats).filter(s => s.perfectEver).length; break;
    case "longest-streak": current = getLongestStreak(p); break;
    case "total-xp": current = getEarnedXpExcludingDebug(p); break;
    case "daily-goals": current = new Set(p.xp_events.filter(e => e.type === "daily_goal_bonus").map(e => e.bucharestDateKey)).size; break;
    case "daily-answers": current = Object.keys(p.dailyChallenges).length; break;
    case "daily-correct": current = Object.values(p.dailyChallenges).filter(d => d.correct).length; break;
    case "lesson": current = complete.has(c.refId!) ? 1 : 0; break;
    case "simulator": current = p.xp_events.some(e => e.id === `simulator-completion:${c.refId}`) ? 1 : 0; break;
    case "category": ({ current, target } = coverage(curriculum.filter(l => l.categoryId === c.refId))); break;
    case "chapter": ({ current, target } = coverage(curriculum.filter(l => l.chapterId === c.refId && l.categoryId === c.categoryId))); break;
    case "specialist": {
      const groups = [...new Set(curriculum.map(l => l.categoryId))].map(id => curriculum.filter(l => l.categoryId === id)).filter(list => list.length >= config.specialistMinReadyLessons).map(coverage).sort((a, b) => b.current / b.target - a.current / a.target);
      ({ current, target } = groups[0] ?? { current: 0, target: config.specialistMinReadyLessons }); break;
    }
  }
  return { current: Math.min(current, target), target, percentage: Math.min(100, current / target * 100), label: `${Math.min(current, target)} din ${target}` };
}
export function evaluateAchievements(p: ProgressState, now: Date, curriculum: readonly ReadyLesson[] = getReadyLessons()): ProgressState {
  const unlocks = { ...p.achievementUnlocks };
  for (const achievement of achievements) if (!unlocks[achievement.id] && getAchievementProgress(achievement, p, curriculum).percentage >= 100) unlocks[achievement.id] = { unlockedAt: effectiveNow(p, now).toISOString() };
  return { ...p, achievementUnlocks: unlocks };
}
export function getAchievementStates(p: ProgressState) { return achievements.map(a => ({ ...a, ...getAchievementProgress(a, p), unlockedAt: p.achievementUnlocks[a.id]?.unlockedAt ?? null })); }
export function getProfileStats(p: ProgressState, today: string) { const totalXp = getTotalXp(p); return { totalXp, level: getCurrentLevel(totalXp), levelProgress: getLevelProgress(totalXp), ...calculateStreak(p, today), completedLessons: getCompletedLessonCount(p), freeze: getFreezeState(p), dailyGoal: getDailyGoalState(p, today), last7Days: getLast7Days(p, today), achievements: getAchievementStates(p) }; }
export function isAnswerScreen(screen: LessonScreen): screen is Extract<LessonScreen, { question: string }> { return "question" in screen; }
export function getCorrectAnswerId(screen: LessonScreen): string | null { if (!isAnswerScreen(screen)) return null; if (screen.type === "adevarat_fals") return String(screen.correctAnswer); if (screen.type === "calcul") return screen.options.find(o => o.value === screen.expectedAnswer)?.id ?? null; return screen.correctOption; }
export function getLessonRewardPreview(lesson: ReadyLesson) { return lesson.screens.filter(isAnswerScreen).length * config.rewards.lesson_question_first_try.xp + config.rewards.lesson_completion.xp + config.rewards.lesson_perfect.xp; }
export function getPendingQuestionXp(p: ProgressState, lessonId: string, correctFirstTry: boolean) { return !p.lessonStats[lessonId]?.completed && correctFirstTry ? config.rewards.lesson_question_first_try.xp : 0; }
// Improvement pays only for a new best; the cap applies per replay, not per lifetime.
export function calculateReplayReward(newScore: number, previousBest: number) { return Math.min(Math.max(newScore - previousBest, 0) * config.rewards.lesson_question_first_try.xp, config.maxReplayXp); }
const labels: Record<XpEventType, string> = { lesson_question_first_try: "Răspunsuri corecte din prima", lesson_completion: "Lecție terminată", lesson_perfect: "Lecție perfectă", lesson_replay_improvement: "Scor îmbunătățit", daily_challenge_correct: "Provocarea zilei", daily_goal_bonus: "Obiectiv zilnic atins", streak_milestone: "Prag de streak", simulator_completion: "Simulator terminat", debug_adjustment: "XP de test" };
export const getXpEventLabel = (type: XpEventType) => labels[type];
export function appendXpEvents(p: ProgressState, candidates: readonly XpEvent[]): ProgressState { const ids = new Set(p.xp_events.map(e => e.id)), newEvents = candidates.filter(e => { XpEventSchema.parse(e); if (ids.has(e.id)) return false; ids.add(e.id); return true; }); return { ...p, xp_events: [...p.xp_events, ...newEvents] }; }
function event(p: ProgressState, now: Date, id: string, type: XpEventType, amount = config.rewards[type].xp, refs: Partial<Pick<XpEvent, "refId" | "lessonId" | "screenId">> = {}): XpEvent { return { id, type, amount, createdAt: effectiveNow(p, now).toISOString(), bucharestDateKey: getEffectiveDateKey(p, now), ...refs }; }
export function finishAction(previous: ProgressState, next: ProgressState, candidates: XpEvent[], now: Date, activity = false, lesson?: LessonRewardSummary): DomainResult {
  let p = reconcileCalendar(appendXpEvents(next, candidates), now);
  const key = getEffectiveDateKey(p, now);
  if (activity) {
    p = reconcileCalendar({ ...p, activityDates: [...new Set([...p.activityDates, key])].sort() }, now);
    const streak = calculateStreak(p, key).current;
    p = appendXpEvents(p, config.streakMilestones.filter(m => streak >= m.days).map(m => event(p, now, `streak-milestone:${m.days}`, "streak_milestone", m.xp)));
  }
  if (getDailyGoalState(p, key).completed) p = appendXpEvents(p, [event(p, now, `daily-goal:${key}`, "daily_goal_bonus")]);
  p = evaluateAchievements(p, now);
  const from = getCurrentLevel(getTotalXp(previous)), to = getCurrentLevel(getTotalXp(p)), levelUp = to.level > from.level ? { from, to, levelsGained: to.level - from.level } : null;
  if (levelUp) { const earliest = p.pendingLevelUp?.from ?? from; p = { ...p, pendingLevelUp: { from: earliest, to, levelsGained: to.level - earliest.level } }; }
  p = { ...p, updatedAt: effectiveNow(p, now).toISOString() };
  const newEvents = p.xp_events.filter(e => !previous.xp_events.some(old => old.id === e.id));
  const xpBreakdown = [...new Set(newEvents.map(e => e.type))].map(type => { const list = newEvents.filter(e => e.type === type); return { type, label: labels[type], amount: list.reduce((sum, e) => sum + e.amount, 0), count: list.length }; });
  return { progress: p, newEvents, xpGained: newEvents.reduce((sum, e) => sum + e.amount, 0), xpBreakdown, levelBefore: from, levelAfter: to, levelUpCount: to.level - from.level, levelUp, streakBefore: calculateStreak(previous, key).current, streakAfter: calculateStreak(p, key).current, freezeConsumed: p.freezeDates.filter(d => !previous.freezeDates.includes(d)), dailyGoalCompleted: newEvents.some(e => e.type === "daily_goal_bonus"), achievementsUnlocked: Object.keys(p.achievementUnlocks).filter(id => !previous.achievementUnlocks[id]), lesson };
}
export function completeLessonSession(previous: ProgressState, session: LessonSessionResult, now: Date): DomainResult {
  const lesson = getLegacyQuickLesson(session.lessonId) ?? getLessonById(session.lessonId);
  if (!lesson || lesson.status !== "ready" || !session.sessionId) throw new Error(`Invalid lesson session: ${session.lessonId}`);
  if (previous.lessonStats[lesson.id]?.sessionIds.includes(session.sessionId)) return finishAction(previous, previous, [], now);
  const questions = lesson.screens.filter(isAnswerScreen), answers = new Map<string, string>();
  for (const a of session.answers) if (!answers.has(a.screenId)) answers.set(a.screenId, a.selectedOptionId);
  if (questions.some(q => !answers.has(q.id))) throw new Error(`Lesson ${lesson.id}: every question requires a first attempt`);
  const correct = questions.filter(q => getCorrectAnswerId(q) === answers.get(q.id)), score = correct.length, count = questions.length, old = previous.lessonStats[lesson.id];
  const firstCompletion = !old?.completed, perfect = count > 0 && score === count, previousBest = old?.bestFirstTryCorrect ?? 0, improvementXp = firstCompletion ? 0 : calculateReplayReward(score, previousBest), timestamp = effectiveNow(previous, now).toISOString();
  let p = reconcileCalendar(previous, now);
  p = { ...p, lessonStats: { ...p.lessonStats, [lesson.id]: { completed: true, firstCompletedAt: old?.firstCompletedAt ?? timestamp, lastCompletedAt: timestamp, bestFirstTryCorrect: Math.max(previousBest, score), questionCount: count, perfectEver: Boolean(old?.perfectEver || perfect), completionCount: (old?.completionCount ?? 0) + 1, sessionIds: [...(old?.sessionIds ?? []), session.sessionId] } }, uniqueCorrectAnswers: [...new Set([...p.uniqueCorrectAnswers, ...correct.map(q => `${lesson.id}:${q.id}`)])] };
  const events: XpEvent[] = [];
  if (firstCompletion) {
    events.push(...correct.map(q => event(p, now, `lesson-question:${lesson.id}:${q.id}`, "lesson_question_first_try", undefined, { lessonId: lesson.id, screenId: q.id })), event(p, now, `lesson-completion:${lesson.id}`, "lesson_completion", undefined, { lessonId: lesson.id }));
    if (perfect) events.push(event(p, now, `lesson-perfect:${lesson.id}`, "lesson_perfect", undefined, { lessonId: lesson.id }));
  } else if (improvementXp > 0) events.push(event(p, now, `lesson-improvement:${lesson.id}:best-${score}`, "lesson_replay_improvement", improvementXp, { lessonId: lesson.id }));
  return finishAction(previous, p, events, now, true, { firstCompletion, score, questionCount: count, previousBest, best: Math.max(previousBest, score), perfect, improvementXp });
}
export function completeDailyChallenge(previous: ProgressState, optionId: string, now: Date): DomainResult {
  const p = reconcileCalendar(previous, now), key = getEffectiveDateKey(p, now);
  if (p.dailyChallenges[key]) return finishAction(previous, p, [], now);
  const challenge = selectDailyChallenge(key);
  if (!challenge.options.some(o => o.id === optionId)) throw new Error("Invalid challenge option");
  const correct = optionId === challenge.correctOptionId, next = { ...p, dailyChallenges: { ...p.dailyChallenges, [key]: { challengeId: challenge.id, selectedOptionId: optionId, correct, answeredAt: effectiveNow(p, now).toISOString() } } };
  return finishAction(previous, next, correct ? [event(p, now, `daily-challenge:${key}`, "daily_challenge_correct")] : [], now, true);
}
export function completeSimulator(p: ProgressState, id: string, now: Date) { if (id !== config.simulatorId) throw new Error("Unknown simulator"); return finishAction(p, p, [event(p, now, `simulator-completion:${id}`, "simulator_completion", undefined, { refId: id })], now); }
export function saveSimulationStep(p: ProgressState, simulation: SimulationState, now: Date) { const next = { ...p, simulation: SimulationSchema.parse(simulation) }; return simulation.step >= 5 ? finishAction(p, next, [event(p, now, `simulator-completion:${config.simulatorId}`, "simulator_completion", undefined, { refId: config.simulatorId })], now) : finishAction(p, next, [], now); }
export function addDebugXp(p: ProgressState, id: string, now: Date) { return finishAction(p, p, [event(p, now, `debug:${id}`, "debug_adjustment", config.debugXpAmount)], now); }
export const markAchievementToastSeen = (p: ProgressState, id: string): ProgressState => ({ ...p, seenAchievementToastIds: [...new Set([...p.seenAchievementToastIds, id])] });
export const markFreezeToastSeen = (p: ProgressState, date: string): ProgressState => ({ ...p, seenFreezeToastDates: [...new Set([...p.seenFreezeToastDates, date])] });
export const markLevelCelebrated = (p: ProgressState): ProgressState => ({ ...p, pendingLevelUp: null });
export const setLastLesson = (p: ProgressState, id: string, now: Date): ProgressState => ({ ...reconcileCalendar(p, now), lastLessonId: id });
function browserStorage() { try { return typeof window === "undefined" ? null : window.localStorage; } catch { return null; } }
export function loadProgress(now: Date) {
  const storage = browserStorage(); let raw: unknown = null;
  try { raw = JSON.parse(storage?.getItem(PROGRESS_STORAGE_KEY) ?? "null"); } catch { /* Corrupt test/storage data safely starts clean. */ }
  const future = typeof object(raw).version === "number" && (object(raw).version as number) > PROGRESS_VERSION;
  if (future && process.env.NODE_ENV === "development") console.warn("Finly: future progress schema is read-only; stored data will not be overwritten.");
  const progress = normalizeProgress(raw, now);
  return { progress, persisted: Boolean(storage && raw && !future), changed: !future && JSON.stringify(raw) !== JSON.stringify(progress), readOnly: future };
}
export function saveProgress(p: ProgressState): boolean {
  const storage = browserStorage(); if (!storage) return false;
  try { const saved = JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) ?? "null"); if (typeof saved?.version === "number" && saved.version > PROGRESS_VERSION) return false; } catch { /* Replace corrupt JSON only. */ }
  try { storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(ProgressSchema.parse(p))); return true; } catch { return false; }
}


