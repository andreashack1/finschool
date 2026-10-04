"use client";
import { useRef, useState } from "react";
import { Check, X, Target, Zap, Snowflake, Footprints, Flame, CalendarCheck, Trophy, PiggyBank, ShieldCheck, WalletCards, BriefcaseBusiness, LockKeyhole } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { achievements, type AchievementIcon } from "@/src/content/achievements";
import { calculateStreak, getLevelProgress, getDailyChallengeFor, getAchievementProgress, DAILY_CHALLENGE_XP } from "@/src/lib/progress";
import { submitDailyChallenge, useProgressData } from "@/src/lib/use-progress";
import type { ProgressState } from "@/src/types/progress";

export const achievementIcons: Record<AchievementIcon, LucideIcon> = { Footprints, Flame, CalendarCheck, Trophy, PiggyBank, ShieldCheck, WalletCards, BriefcaseBusiness };
export function LevelProgress({ totalXp }: { totalXp: number }) {
  const level = getLevelProgress(totalXp);
  return <div className="gamification-level app-card"><div><strong>{level.isMax ? "Nivel maxim" : `Nivel ${level.current.level}`} · {level.current.title}</strong><span>{level.next ? `${totalXp} / ${level.next.minXp} XP` : `${totalXp} XP`}</span></div><div className="app-progress" role="progressbar" aria-label="Progresul nivelului" aria-valuemin={0} aria-valuemax={100} aria-valuenow={level.percent}><span style={{ width: `${level.percent}%` }}/></div></div>;
}
export function FreezeIndicator({ progress, today }: { progress: ProgressState; today: string }) {
  const streak = calculateStreak(progress, today);
  return <span className="freeze-indicator"><Snowflake size={14}/>{streak.freezeAvailable ? "1 freeze disponibil" : "Freeze folosit săptămâna asta"}</span>;
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
  return <section className="daily-card app-card"><div className="section-top"><span className="card-kicker"><Target size={15}/> PROVOCAREA ZILEI</span><span className="reward-chip"><Zap size={13}/> +{DAILY_CHALLENGE_XP} XP</span></div><h3>Un calcul mic.<br/>Un obicei bun.</h3><p>{challenge.question}</p><div className="challenge-answers">{challenge.options.map(option => <button key={option.id} disabled={Boolean(result) || saving} aria-pressed={result?.selectedOptionId === option.id} className={result && option.id === challenge.correctOptionId ? "answer-correct" : result?.selectedOptionId === option.id ? "answer-wrong" : ""} onClick={() => { void choose(option.id); }}>{option.label}{result && option.id === challenge.correctOptionId ? <Check size={15} aria-label="Răspuns corect"/> : result?.selectedOptionId === option.id ? <X size={15} aria-label="Răspuns ales, incorect"/> : null}</button>)}</div><div aria-live="polite">{result ? <><p className={`challenge-feedback ${result.wasCorrect ? "success" : "error"}`}>{result.wasCorrect ? <Check size={15}/> : <X size={15}/>}<span><strong>{result.wasCorrect ? "Corect." : "Nu chiar."}</strong> {challenge.explanation}</span></p><span className="challenge-note">+{DAILY_CHALLENGE_XP} XP primit · Gata pentru azi.</span></> : <span className="challenge-note">O întrebare. Fără presiune.</span>}</div></section>;
}
export function AchievementsList({ progress }: { progress: ProgressState }) {
  return <section className="achievements"><div className="section-top"><h2>Realizări</h2><span>{achievements.filter(a => progress.achievements.unlockedIds.includes(a.id)).length} / {achievements.length}</span></div><div className="app-card achievement-list">{achievements.map(achievement => {
    const Icon = achievementIcons[achievement.icon], unlocked = progress.achievements.unlockedIds.includes(achievement.id), count = getAchievementProgress(achievement, progress);
    return <div className={`achievement ${unlocked ? "unlocked" : "locked"}`} key={achievement.id} data-achievement={achievement.id}><span className="icon-tile"><Icon size={22}/></span><div><strong>{achievement.title}</strong><p>{achievement.description}</p>{!unlocked && count.target > 1 && <span className="achievement-progress">{count.current} / {count.target}{achievement.condition.type === "total-xp" ? " XP" : achievement.condition.type === "longest-streak" ? " zile" : ""}</span>}</div>{unlocked ? <Check size={17} aria-label="Realizare deblocată"/> : <LockKeyhole size={15} aria-label="Realizare încă blocată"/>}</div>;
  })}</div></section>;
}
