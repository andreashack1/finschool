import { levels } from "../content/levels";
import { achievements, type Achievement } from "../content/achievements";
import { dailyChallenges } from "../content/daily-challenges";
import { getLessonById, getLegacyQuickLesson, getLessonsByChapter } from "../content/lessons";
import type { LessonScreen } from "../types/learning";
import type { ProgressState, DomainResult, Reward, RewardSource, LessonSessionResult, DailyChallengeResult, LegacyStreak, StreakStatus, SimulationState } from "../types/progress";
import { addCalendarDays, getBucharestDateKey, getBucharestWeekKey, isDateKey } from "./bucharest-date";

export { getBucharestDateKey, getBucharestWeekKey } from "./bucharest-date";
export const PROGRESS_STORAGE_KEY = "finly-progress-v2";
// The existing Zustand envelope has version 0; its successor is version 1.
// The "v2" in the stable key is a historical key name, not the stored version.
export const PROGRESS_VERSION = 1 as const;
export const LEGACY_LEARNING_STORAGE_KEY = "finly-learning-progress-v1";
export const DEFAULT_LESSON_XP = 30;
export const PERFECT_BONUS_XP = 20;
export const DAILY_CHALLENGE_XP = 15;
export const SIMULATOR_COMPLETION_XP = 50;
export const STREAK_7_BONUS_XP = 100;
export const SIMULATOR_ID = "simulator";
export const legacyLessonIds: Readonly<Record<string, string>> = { salary: "salariu-brut-vs-net", inflatie: "ce-este-inflatia", carduri: "card-debit-vs-credit", buget: "primul-buget" };
export const initialSimulation: SimulationState = { step: 0, balance: 3500, savings: 0, history: [] };
const resolveLesson = (id: string) => getLegacyQuickLesson(id) ?? getLessonById(id);
const integer = (value: unknown, fallback = 0) => typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : fallback;
const strings = (value: unknown): string[] => Array.isArray(value) ? [...new Set(value.filter((v): v is string => typeof v === "string" && v.length > 0))] : [];
const object = (value: unknown): Record<string, unknown> => value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
const canonicalId = (id: string) => legacyLessonIds[id] ?? id;
const dateList = (value: unknown, today: string) => strings(value).filter(d => isDateKey(d) && d <= today).sort();
export function createEmptyProgress(): ProgressState {
  return { version: PROGRESS_VERSION, totalXp: 0, completedLessonIds: [], awardedRewardKeys: [], lessonStats: {}, activityDates: [], freezeDates: [], longestStreak: 0, legacyStreak: null, dailyChallenges: {}, simulatorCompletions: [], simulation: { ...initialSimulation, history: [] }, uniqueCorrectAnswers: [], achievements: { unlockedIds: [], seenToastIds: [] }, highestCelebratedLevel: 1, lastLessonId: null, updatedAt: null };
}
export function getCurrentLevel(totalXp: number) {
  const xp = integer(totalXp);
  return [...levels].reverse().find(level => level.minXp <= xp)!;
}
export function getLevelProgress(totalXp: number) {
  const current = getCurrentLevel(totalXp), next = levels[current.level];
  const fraction = next ? Math.max(0, Math.min(1, (integer(totalXp) - current.minXp) / (next.minXp - current.minXp))) : 1;
  return { current, next: next ?? null, fraction, percent: Math.round(fraction * 100), remainingXp: next ? Math.max(0, next.minXp - integer(totalXp)) : 0, isMax: !next };
}
export function selectDailyChallenge(dateKey: string) {
  if (!isDateKey(dateKey)) throw new Error("Invalid Bucharest daily challenge date");
  // Stable calendar hash: adjacent dates always get distinct indices, including
  // month/year boundaries. 31 is coprime with 10; no recursive yesterday lookup.
  const day = Math.floor(Date.parse(dateKey + "T12:00:00Z") / 86400000);
  const index = ((day * 31 + 7) % dailyChallenges.length + dailyChallenges.length) % dailyChallenges.length;
  return dailyChallenges[index];
}
export const getDailyChallengeFor = (progress: ProgressState, today: string) => dailyChallenges.find(c => c.id === progress.dailyChallenges[today]?.challengeId) ?? selectDailyChallenge(today);
export const getTodayGoal = (progress: ProgressState, today: string) => ({ current: progress.activityDates.includes(today) ? 1 : 0, target: 1 });

function walkStreak(progress: ProgressState, today: string, automaticFreeze: boolean) {
  const freezes = [...progress.freezeDates];
  const frozen = new Set(freezes), usedWeeks = new Set(freezes.map(getBucharestWeekKey));
  let count = 0, longest = progress.longestStreak, runId: string | null = null, previous: string | null = null;
  const anchor = progress.legacyStreak;
  const dates = [...new Set([...progress.activityDates.filter(d => d <= today), ...(anchor && anchor.anchorDate <= today ? [anchor.anchorDate] : [])])].sort();
  function bridge(until: string) {
    if (!previous || count === 0) return;
    for (let day = addCalendarDays(previous, 1); day <= until; day = addCalendarDays(day, 1)) {
      if (frozen.has(day)) continue;
      const week = getBucharestWeekKey(day);
      if (automaticFreeze && !usedWeeks.has(week)) { frozen.add(day); freezes.push(day); usedWeeks.add(week); }
      else { count = 0; runId = null; break; }
    }
  }
  for (const date of dates) {
    bridge(addCalendarDays(date, -1));
    if (anchor?.anchorDate === date) {
      count = Math.max(count, anchor.count);
      runId = anchor.count > 0 ? anchor.runId : runId;
      if (progress.activityDates.includes(date) && !anchor.includesAnchorActivity) { if (!count) runId = date; count++; }
    } else {
      if (!count) runId = date;
      count++;
    }
    longest = Math.max(longest, count);
    previous = date;
  }
  // Today is never a missed day, even at 00:01.
  bridge(addCalendarDays(today, -1));
  return { current: count, longest, runId, freezeDates: freezes.sort(), freezeAvailable: !usedWeeks.has(getBucharestWeekKey(today)) };
}
export function calculateStreak(progress: ProgressState, today: string): StreakStatus {
  const { current, longest, runId, freezeAvailable } = walkStreak(progress, today, false);
  return { current, longest, runId, freezeAvailable };
}
export function getAchievementProgress(achievement: Achievement, progress: ProgressState) {
  let current = 0, target = 1;
  const c = achievement.condition;
  switch (c.type) {
    case "completed-lessons": current = progress.completedLessonIds.length; target = c.count; break;
    case "longest-streak": current = progress.longestStreak; target = c.days; break;
    case "total-xp": current = progress.totalXp; target = c.xp; break;
    case "simulator": current = Number(progress.simulatorCompletions.includes(c.simulatorId)); break;
    case "lesson": current = Number(progress.completedLessonIds.includes(c.lessonId)); break;
    case "category-correct": {
      const unique = new Set(progress.uniqueCorrectAnswers);
      current = [...unique].filter(key => {
        const divider = key.indexOf(":");
        const lesson = resolveLesson(key.slice(0, divider));
        return divider > 0 && lesson?.categoryId === c.categoryId && lesson.status === "ready" && lesson.screens.some(screen => screen.id === key.slice(divider + 1) && isAnswerScreen(screen));
      }).length;
      target = c.count; break;
    }
    case "chapter": {
      const ready = getLessonsByChapter(c.chapterId, c.categoryId).filter(l => l.status === "ready");
      target = Math.max(1, ready.length);
      current = ready.filter(l => progress.completedLessonIds.includes(l.id)).length;
      break;
    }
  }
  return { current: Math.min(current, target), target, percent: Math.round(Math.max(0, Math.min(1, current / Math.max(1, target))) * 100), eligible: current >= target };
}
export function evaluateAchievements(progress: ProgressState): ProgressState {
  const unlockedIds = [...new Set([...progress.achievements.unlockedIds, ...achievements.filter(a => getAchievementProgress(a, progress).eligible).map(a => a.id)])];
  return { ...progress, achievements: { ...progress.achievements, unlockedIds } };
}
function normalizeSimulation(value: unknown): SimulationState {
  const v = object(value);
  const finite = (x: unknown, fallback: number) => typeof x === "number" && Number.isFinite(x) ? x : fallback;
  return { step: Math.min(5, integer(v.step)), balance: Math.max(0, finite(v.balance, 3500)), savings: Math.max(0, finite(v.savings, 0)), history: strings(v.history) };
}
export function normalizeProgress(value: unknown, now: Date): ProgressState {
  const v = object(value), today = getBucharestDateKey(now), empty = createEmptyProgress();
  const ach = object(v.achievements), stats = object(v.lessonStats), daily = object(v.dailyChallenges);
  const anchor = object(v.legacyStreak);
  const legacyStreak: LegacyStreak | null = isDateKey(anchor.anchorDate) && anchor.anchorDate <= today && integer(anchor.count) > 0 ? { count: integer(anchor.count), anchorDate: anchor.anchorDate, runId: typeof anchor.runId === "string" ? anchor.runId : `legacy:${anchor.anchorDate}`, includesAnchorActivity: anchor.includesAnchorActivity === true } : null;
  const dailyResults: ProgressState["dailyChallenges"] = Object.fromEntries(Object.entries(daily).flatMap(([date, raw]) => {
    const result = object(raw);
    if (!isDateKey(date) || typeof result.challengeId !== "string") return [];
    return [[date, { challengeId: result.challengeId, selectedOptionId: typeof result.selectedOptionId === "string" ? result.selectedOptionId : null, wasCorrect: typeof result.wasCorrect === "boolean" ? result.wasCorrect : null, completedAt: typeof result.completedAt === "string" ? result.completedAt : null, xpAwarded: result.xpAwarded === true } satisfies DailyChallengeResult]];
  }));
  const lessonStats: ProgressState["lessonStats"] = Object.fromEntries(Object.entries(stats).map(([id, raw]) => {
    const s = object(raw);
    return [id, { sessionIds: strings(s.sessionIds), lastCompletedAt: typeof s.lastCompletedAt === "string" ? s.lastCompletedAt : "", bestCorrectAnswers: integer(s.bestCorrectAnswers), questionCount: integer(s.questionCount) }];
  }));
  const weeks = new Set<string>();
  const freezeDates = dateList(v.freezeDates, today).filter(date => { const week = getBucharestWeekKey(date); if (weeks.has(week)) return false; weeks.add(week); return true; });
  let progress: ProgressState = { ...empty,
    totalXp: integer(v.totalXp), completedLessonIds: [...new Set(strings(v.completedLessonIds).map(canonicalId))],
    awardedRewardKeys: strings(v.awardedRewardKeys), lessonStats, activityDates: dateList(v.activityDates, today), freezeDates,
    longestStreak: integer(v.longestStreak), legacyStreak, dailyChallenges: dailyResults,
    simulatorCompletions: strings(v.simulatorCompletions), simulation: normalizeSimulation(v.simulation), uniqueCorrectAnswers: strings(v.uniqueCorrectAnswers),
    achievements: { unlockedIds: strings(ach.unlockedIds), seenToastIds: strings(ach.seenToastIds) },
    highestCelebratedLevel: Math.max(1, Math.min(7, integer(v.highestCelebratedLevel, getCurrentLevel(integer(v.totalXp)).level))),
    lastLessonId: typeof v.lastLessonId === "string" ? canonicalId(v.lastLessonId) : null, updatedAt: typeof v.updatedAt === "string" ? v.updatedAt : null,
  };
  // Completion itself proves a base reward must never be claimed again.
  progress.awardedRewardKeys = [...new Set([...progress.awardedRewardKeys, ...progress.completedLessonIds.map(id => `lesson:${id}`), ...progress.simulatorCompletions.map(id => `simulator:${id}`), ...Object.keys(dailyResults).map(date => `daily:${date}`)])];
  const streak = walkStreak(progress, today, true);
  progress = { ...progress, freezeDates: streak.freezeDates, longestStreak: streak.longest };
  return evaluateAchievements(progress);
}
export function migrateProgress(value: unknown, learningValue: unknown, now: Date): ProgressState {
  const root = object(value);
  if (root.version === PROGRESS_VERSION && !("state" in root)) return normalizeProgress(root, now);
  const old = object(root.state ?? root), learning = object(learningValue);
  const today = getBucharestDateKey(now), oldCompleted = strings(old.completed);
  const ids = [...new Set([...strings(old.completedLessonIds), ...strings(learning.completedLessonIds), ...oldCompleted.filter(id => id !== SIMULATOR_ID && !id.startsWith("challenge-"))].map(canonicalId))];
  const knownDailyDates = oldCompleted.filter(id => id.startsWith("challenge-")).map(id => id.slice(10)).filter(isDateKey);
  const current = integer(old.currentStreak ?? old.streak), longest = Math.max(current, integer(old.longestStreak ?? old.record));
  const legacyStreak: LegacyStreak | null = current > 0 ? { count: current, anchorDate: today, runId: `legacy:${today}`, includesAnchorActivity: old.lastStudy === today || knownDailyDates.includes(today) } : null;
  const simulators = [...new Set([...strings(old.simulatorCompletions), ...(oldCompleted.includes(SIMULATOR_ID) || integer(object(old.simulation).step) >= 5 ? [SIMULATOR_ID] : [])])];
  const xp = integer(old.totalXp ?? old.xp);
  let progress = normalizeProgress({ ...createEmptyProgress(), totalXp: xp, completedLessonIds: ids,
    awardedRewardKeys: [...ids.map(id => `lesson:${id}`), ...simulators.map(id => `simulator:${id}`), ...knownDailyDates.map(date => `daily:${date}`), ...(legacyStreak && current >= 7 ? [`streak7:${legacyStreak.runId}`] : [])],
    legacyStreak, longestStreak: longest, simulatorCompletions: simulators, simulation: old.simulation,
    dailyChallenges: Object.fromEntries(knownDailyDates.map(date => [date, { challengeId: dailyChallenges[0].id, selectedOptionId: "value-15", wasCorrect: true, completedAt: null, xpAwarded: true }])),
    activityDates: knownDailyDates,
    highestCelebratedLevel: getCurrentLevel(xp).level,
    lastLessonId: learning.lastLessonId ?? old.lastLessonId, updatedAt: learning.updatedAt ?? old.updatedAt,
    achievements: old.achievements,
  }, now);
  // Existing achievements are unlocked silently; migration never awards XP.
  progress = { ...progress, achievements: { ...progress.achievements, seenToastIds: [...progress.achievements.unlockedIds] } };
  return progress;
}
export function applyReward(progress: ProgressState, reward: Reward): ProgressState {
  if (progress.awardedRewardKeys.includes(reward.key)) return progress;
  const xp = integer(reward.xp);
  return { ...progress, totalXp: progress.totalXp + xp, awardedRewardKeys: [...progress.awardedRewardKeys, reward.key] };
}
export function recordActivity(progress: ProgressState, now: Date): ProgressState {
  const today = getBucharestDateKey(now), normalized = normalizeProgress(progress, now);
  const next = { ...normalized, activityDates: [...new Set([...normalized.activityDates, today])].sort() };
  const streak = walkStreak(next, today, true);
  return { ...next, freezeDates: streak.freezeDates, longestStreak: streak.longest };
}
function finishAction(previous: ProgressState, next: ProgressState, candidates: Reward[], now: Date): DomainResult {
  let progress = next;
  const rewards: Reward[] = [];
  for (const reward of candidates) if (!progress.awardedRewardKeys.includes(reward.key)) { progress = applyReward(progress, reward); rewards.push(reward); }
  progress = evaluateAchievements({ ...progress, updatedAt: now.toISOString() });
  const achievementsUnlocked = progress.achievements.unlockedIds.filter(id => !previous.achievements.unlockedIds.includes(id));
  const from = getCurrentLevel(previous.totalXp), to = getCurrentLevel(progress.totalXp);
  const levelUp = to.level > from.level ? { from, to, levelsGained: to.level - from.level } : null;
  return { progress, xpGained: progress.totalXp - previous.totalXp, rewards, achievementsUnlocked, levelUp,
    events: [...rewards.map(reward => ({ type: "reward" as const, reward })), ...(levelUp ? [{ type: "level-up" as const, levelUp }] : []), ...achievementsUnlocked.map(id => ({ type: "achievement" as const, id }))] };
}
function streakReward(progress: ProgressState, now: Date): Reward[] {
  const streak = calculateStreak(progress, getBucharestDateKey(now));
  return streak.current >= 7 && streak.runId ? [{ source: "streak", key: `streak7:${streak.runId}`, xp: STREAK_7_BONUS_XP }] : [];
}
const reward = (source: RewardSource, key: string, xp: number): Reward => ({ source, key, xp });
export function isAnswerScreen(screen: LessonScreen): screen is Extract<LessonScreen, { question: string }> { return "question" in screen; }
export function getCorrectAnswerId(screen: LessonScreen): string | null {
  if (!isAnswerScreen(screen)) return null;
  if (screen.type === "adevarat_fals") return String(screen.correctAnswer);
  if (screen.type === "calcul") return screen.options.find(o => o.value === screen.expectedAnswer)?.id ?? null;
  return screen.correctOption;
}
export function completeLessonSession(previous: ProgressState, session: LessonSessionResult, now: Date): DomainResult {
  const lesson = resolveLesson(session.lessonId);
  if (!lesson || lesson.status !== "ready") throw new Error(`Cannot complete unavailable lesson "${session.lessonId}"`);
  if (!session.sessionId) throw new Error("Lesson completion requires a session ID");
  if (previous.lessonStats[lesson.id]?.sessionIds.includes(session.sessionId)) return finishAction(previous, previous, [], now);
  const questions = lesson.screens.filter(isAnswerScreen), firstAnswers = new Map<string, string>();
  for (const answer of session.answers) if (!firstAnswers.has(answer.screenId)) firstAnswers.set(answer.screenId, answer.selectedOptionId);
  if (questions.some(s => !firstAnswers.has(s.id))) throw new Error("Lesson completion requires an answer for every interactive screen");
  const correctScreens = questions.filter(s => firstAnswers.get(s.id) === getCorrectAnswerId(s));
  const perfect = questions.length > 0 && correctScreens.length === questions.length;
  let progress = recordActivity(previous, now);
  progress = { ...progress, completedLessonIds: [...new Set([...progress.completedLessonIds, lesson.id])],
    uniqueCorrectAnswers: [...new Set([...progress.uniqueCorrectAnswers, ...correctScreens.map(s => `${lesson.id}:${s.id}`)])],
    lessonStats: { ...progress.lessonStats, [lesson.id]: { sessionIds: [...(progress.lessonStats[lesson.id]?.sessionIds ?? []), session.sessionId], lastCompletedAt: now.toISOString(), bestCorrectAnswers: Math.max(progress.lessonStats[lesson.id]?.bestCorrectAnswers ?? 0, correctScreens.length), questionCount: questions.length } },
    lastLessonId: null };
  const base = previous.completedLessonIds.includes(lesson.id) ? [] : [reward("lesson", `lesson:${lesson.id}`, lesson.xp ?? DEFAULT_LESSON_XP)];
  return finishAction(previous, progress, [...base, ...(perfect ? [reward("perfect", `perfect:${lesson.id}`, PERFECT_BONUS_XP)] : []), ...streakReward(progress, now)], now);
}
export function completeDailyChallenge(previous: ProgressState, selectedOptionId: string, now: Date): DomainResult {
  const today = getBucharestDateKey(now);
  if (previous.dailyChallenges[today] || previous.awardedRewardKeys.includes(`daily:${today}`)) return finishAction(previous, previous, [], now);
  const challenge = selectDailyChallenge(today);
  if (!challenge.options.some(o => o.id === selectedOptionId)) throw new Error("Daily challenge option does not exist");
  let progress = recordActivity(previous, now);
  progress = { ...progress, dailyChallenges: { ...progress.dailyChallenges, [today]: { challengeId: challenge.id, selectedOptionId, wasCorrect: selectedOptionId === challenge.correctOptionId, completedAt: now.toISOString(), xpAwarded: true } } };
  return finishAction(previous, progress, [reward("daily", `daily:${today}`, DAILY_CHALLENGE_XP), ...streakReward(progress, now)], now);
}
export function completeSimulator(previous: ProgressState, simulatorId: string, now: Date, simulation?: SimulationState): DomainResult {
  if (simulatorId !== SIMULATOR_ID) throw new Error("Unknown simulator ID");
  const progress = { ...normalizeProgress(previous, now), simulation: simulation ? normalizeSimulation(simulation) : previous.simulation, simulatorCompletions: [...new Set([...previous.simulatorCompletions, simulatorId])] };
  const claimed = previous.simulatorCompletions.includes(simulatorId);
  return finishAction(previous, progress, claimed ? [] : [reward("simulator", `simulator:${simulatorId}`, SIMULATOR_COMPLETION_XP)], now);
}
export function saveSimulationStep(previous: ProgressState, simulation: SimulationState, now: Date): DomainResult {
  if (simulation.step >= 5) return completeSimulator(previous, SIMULATOR_ID, now, simulation);
  return finishAction(previous, { ...normalizeProgress(previous, now), simulation: normalizeSimulation(simulation) }, [], now);
}
export function markAchievementToastSeen(progress: ProgressState, id: string): ProgressState {
  return progress.achievements.unlockedIds.includes(id) ? { ...progress, achievements: { ...progress.achievements, seenToastIds: [...new Set([...progress.achievements.seenToastIds, id])] } } : progress;
}
export function markLevelCelebrated(progress: ProgressState): ProgressState {
  return { ...progress, highestCelebratedLevel: Math.max(progress.highestCelebratedLevel, getCurrentLevel(progress.totalXp).level) };
}
export function setLastLesson(progress: ProgressState, id: string, now: Date): ProgressState {
  return progress.lastLessonId === id ? progress : { ...progress, lastLessonId: id, updatedAt: now.toISOString() };
}

export type ProgressStorage = Pick<Storage, "getItem" | "setItem">;
function browserStorage(): ProgressStorage | undefined { try { return typeof window === "undefined" ? undefined : window.localStorage; } catch { return undefined; } }
const parse = (raw: string | null): unknown => { try { return raw ? JSON.parse(raw) : null; } catch { return null; } };
export function loadProgress(now: Date, storage: ProgressStorage | undefined = browserStorage()) {
  let raw: string | null = null, learning: unknown = null;
  try { raw = storage?.getItem(PROGRESS_STORAGE_KEY) ?? null; } catch { /* Read denied. */ }
  const value = parse(raw), root = object(value);
  if (root.version !== PROGRESS_VERSION || "state" in root) {
    try { learning = parse(storage?.getItem(LEGACY_LEARNING_STORAGE_KEY) ?? null); } catch { /* Legacy read denied. */ }
  }
  const progress = root.version === PROGRESS_VERSION && !("state" in root) ? normalizeProgress(value, now) : migrateProgress(value, learning, now);
  return { progress, changed: raw !== JSON.stringify(progress), persisted: value !== null };
}
export function saveProgress(progress: ProgressState, storage: ProgressStorage | undefined = browserStorage()): boolean {
  try { if (!storage) return false; storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress)); return true; } catch { return false; }
}
