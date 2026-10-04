"use client";
import { useEffect, useRef, useState } from "react";
import { Check, X, Target, Zap, Snowflake, Footprints, Flame, CalendarCheck, Trophy, PiggyBank, ShieldCheck, WalletCards, BriefcaseBusiness, LockKeyhole } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { achievements, type AchievementIcon } from "@/src/content/achievements";
import { getLevelProgress, getDailyChallengeFor, getAchievementProgress, getDailyGoalState, getLast7Days, getXpEventLabel } from "@/src/lib/progress";
import { submitDailyChallenge, useProgressData } from "@/src/lib/use-progress";
import { gamificationConfig } from "@/src/content/gamification-config";
import type { ProgressState } from "@/src/types/progress";

export const achievementIcons: Record<AchievementIcon, LucideIcon> = { Footprints, Flame, CalendarCheck, Trophy, PiggyBank, ShieldCheck, WalletCards, BriefcaseBusiness };
export function LevelProgress({ totalXp }: { totalXp: number }) {
  const level = getLevelProgress(totalXp);
  return <div className="gamification-level app-card"><div><strong>{level.isMax ? "Nivel maxim" : `Nivel ${level.current.level}`} · {level.current.title}</strong><span>{level.next ? `${level.earned} / ${level.target} XP` : `${totalXp} XP`}</span></div><div className="app-progress" role="progressbar" aria-label="Progresul nivelului" aria-valuemin={0} aria-valuemax={100} aria-valuenow={level.percent}><span style={{ width: `${level.percent}%` }}/></div></div>;
}
export function FreezeIndicator({ progress, today }: { progress: ProgressState; today: string }) {
  void today;
  return <span className="freeze-indicator" title="Un freeze salvează automat o singură zi ratată."><Snowflake size={14}/>{progress.freezeBalance} / {gamificationConfig.freeze.maxBalance} freeze-uri</span>;
}
export function DailyChallengeCard() {
  const p = useProgressData();
  const [saving, setSaving] = useState(false);
  const submitted = useRef(false);
  if (!p.hydrated || !p.todayKey) return <section className="daily-card app-card" aria-busy="true"><span className="card-kicker">PROVOCAREA ZILEI</span><p>Pregătim provocarea…</p></section>;
  const challenge = getDailyChallengeFor(p, p.todayKey), result = p.dailyChallenges[p.todayKey];
  async function choose(optionId: string) {
    if (submitted.current || result || saving) return;
    submitted.current = true; setSaving(true);
    try { await submitDailyChallenge(optionId); } finally { setSaving(false); submitted.current = false; }
  }
  return <section className="daily-card app-card"><div className="section-top"><span className="card-kicker"><Target size={15}/> PROVOCAREA ZILEI</span><span className="reward-chip"><Zap size={13}/> {result ? result.correct ? `+${gamificationConfig.rewards.daily_challenge_correct.xp} XP` : "Activitate încheiată" : `+${gamificationConfig.rewards.daily_challenge_correct.xp} XP dacă răspunzi corect`}</span></div><h3>Un calcul mic.<br/>Un obicei bun.</h3><p>{challenge.question}</p><div className="challenge-answers">{challenge.options.map(option => <button key={option.id} disabled={Boolean(result) || saving} aria-pressed={result?.selectedOptionId === option.id} className={result && option.id === challenge.correctOptionId ? "answer-correct" : result?.selectedOptionId === option.id ? "answer-wrong" : ""} onClick={() => { void choose(option.id); }}>{option.label}{result && option.id === challenge.correctOptionId ? <Check size={15} aria-label="Răspuns corect"/> : result?.selectedOptionId === option.id ? <X size={15} aria-label="Răspuns ales, incorect"/> : null}</button>)}</div><div aria-live="polite">{result ? <><p className={`challenge-feedback ${result.correct ? "success" : "error"}`}>{result.correct ? <Check size={15}/> : <X size={15}/>}<span><strong>{result.correct ? "Corect." : "Nu chiar."}</strong> {challenge.explanation}</span></p><span className="challenge-note">{result.correct ? `+${gamificationConfig.rewards.daily_challenge_correct.xp} XP primit` : "0 XP · Ai făcut activitatea de azi"} · Gata pentru azi.</span></> : <span className="challenge-note">O întrebare. Fără presiune.</span>}</div></section>;
}
export function AchievementsList({ progress }: { progress: ProgressState }) {
  return <section className="achievements"><div className="section-top"><h2>Realizări</h2><span>{achievements.filter(a => Boolean(progress.achievementUnlocks[a.id])).length} / {achievements.length}</span></div><div className="app-card achievement-list">{achievements.map(achievement => {
    const Icon = achievementIcons[achievement.icon], unlocked = Boolean(progress.achievementUnlocks[achievement.id]), count = getAchievementProgress(achievement, progress);
    return <div className={`achievement ${unlocked ? "unlocked" : "locked"}`} key={achievement.id} data-achievement={achievement.id}><span className="icon-tile"><Icon size={22}/></span><div><strong>{achievement.title}</strong><p>{achievement.description}</p>{unlocked && <span className="achievement-progress">Deblocat pe {new Date(progress.achievementUnlocks[achievement.id].unlockedAt).toLocaleDateString("ro-RO", { timeZone: "Europe/Bucharest", day: "numeric", month: "short" })}</span>}{!unlocked && <span className="achievement-progress">{count.current} / {count.target}{achievement.condition.type === "total-xp" ? " XP" : achievement.condition.type === "longest-streak" ? " zile" : ""}</span>}{!unlocked && <div className="app-progress" role="progressbar" aria-label={`Progres: ${achievement.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={count.percentage}><span style={{ width: `${count.percentage}%` }}/></div>}</div>{unlocked ? <Check size={17} aria-label="Realizare deblocată"/> : <LockKeyhole size={15} aria-label="Realizare încă blocată"/>}</div>;
  })}</div></section>;
}
export function DailyGoalRing({ progress, today }: { progress: ProgressState; today: string }) {
  const goal = getDailyGoalState(progress, today);
  return <div className={`daily-goal-status ${goal.completed ? "complete" : ""}`}><div className="daily-goal-ring" role="progressbar" aria-label="Obiectivul zilnic" aria-valuemin={0} aria-valuemax={goal.target} aria-valuenow={Math.min(goal.current, goal.target)} style={{ background: `conic-gradient(var(--finly-sky, #69c9f7) ${goal.percent}%, #e7edf2 0)` }}><Target size={18}/></div><span><strong>{goal.completed ? `${goal.current} XP azi` : `${goal.current} / ${goal.target} XP`}</strong><small>{goal.completed ? "Obiectiv atins" : "Obiectiv zilnic"}</small></span></div>;
}
export function LastSevenDays({ progress, today }: { progress: ProgressState; today: string }) {
  return <section className="app-card activity-week"><h2>Ultimele 7 zile</h2><div>{getLast7Days(progress, today).map(day => <span className={`activity-day ${day.state}`} key={day.date} title={`${day.date}: ${{ activity: "Activitate terminată", freeze: "Freeze folosit", today: "Azi, încă fără activitate", missed: "Fără activitate" }[day.state]}`}><small>{day.weekday}</small><i>{day.state === "activity" ? <Check size={18}/> : day.state === "freeze" ? <Snowflake size={18}/> : new Date(day.date + "T12:00:00Z").getUTCDate()}</i></span>)}</div></section>;
}
export function XpJournal({ progress }: { progress: ProgressState }) {
  return <section className="app-card xp-journal"><h2>Jurnalul XP</h2>{progress.xp_events.length ? <ol>{[...progress.xp_events].reverse().map(event => <li key={event.id}><span>{getXpEventLabel(event.type)}<small>{new Date(event.createdAt).toLocaleString("ro-RO", { timeZone: "Europe/Bucharest", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</small></span><strong>+{event.amount} XP</strong></li>)}</ol> : <p>Primii tăi pași vor apărea aici.</p>}</section>;
}
export function StreakChip({ current }: { current: number }) {
  const element = useRef<HTMLSpanElement>(null), previous = useRef(current);
  useEffect(() => { if (current > previous.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) element.current?.animate([{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }], { duration: gamificationConfig.ui.countUpMs }); previous.current = current; }, [current]);
  return <span className="streak-chip" ref={element}><Flame size={16}/> {current} {current === 1 ? "zi" : "zile"}</span>;
}

