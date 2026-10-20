"use client";
import { useEffect, useRef, useState } from "react";
import { Check, X, Target, Zap, Snowflake, Footprints, Flame, CalendarCheck, Trophy, PiggyBank, ShieldCheck, WalletCards, BriefcaseBusiness } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { achievements, type AchievementIcon } from "@/src/content/achievements";
import { getLevelProgress, getDailyChallengeFor, getAchievementProgress, getDailyGoalState, getLast7Days } from "@/src/lib/progress";
import { getActiveAchievements, getProfileLearningProgress } from "@/src/lib/profile-progress";
import Link from 'next/link';
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
  return <span className="freeze-indicator" title="Un Freeze îți protejează streak-ul într-o zi în care nu ai activitate."><Snowflake size={14} aria-hidden="true"/>{progress.freezeBalance} / {gamificationConfig.freeze.maxBalance} Freeze-uri</span>;
}
export function DailyChallengeCard() {
  const p = useProgressData();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const submitted = useRef(false);
  if (!p.hydrated || !p.todayKey) return <section className="daily-card app-card" aria-busy="true"><span className="card-kicker">PROVOCAREA ZILEI</span><p>Pregătim provocarea…</p></section>;
  const challenge = getDailyChallengeFor(p, p.todayKey), result = p.dailyChallenges[p.todayKey];
  async function choose(optionId: string) {
    if (submitted.current || result || saving) return;
    submitted.current = true; setSaving(true); setError('');
    try { await submitDailyChallenge(optionId); }
    catch { setError('Nu am putut trimite răspunsul. Încearcă din nou.'); }
    finally { setSaving(false); submitted.current = false; }
  }
  return <section className="daily-card app-card"><div className="section-top"><span className="card-kicker"><Target size={15}/> PROVOCAREA ZILEI</span><span className="reward-chip"><Zap size={13}/> {result ? result.correct ? `+${gamificationConfig.rewards.daily_challenge_correct.xp} XP` : "Activitate încheiată" : `+${gamificationConfig.rewards.daily_challenge_correct.xp} XP dacă răspunzi corect`}</span></div><h3>Un calcul mic.<br/>Un obicei bun.</h3><p>{challenge.question}</p><div className="challenge-answers">{challenge.options.map(option => <button key={option.id} disabled={Boolean(result) || saving} aria-pressed={result?.selectedOptionId === option.id} className={result && option.id === challenge.correctOptionId ? "answer-correct" : result?.selectedOptionId === option.id ? "answer-wrong" : ""} onClick={() => { void choose(option.id); }}>{option.label}{result && option.id === challenge.correctOptionId ? <Check size={15} aria-label="Răspuns corect"/> : result?.selectedOptionId === option.id ? <X size={15} aria-label="Răspuns ales, incorect"/> : null}</button>)}</div><div aria-live="polite">{error && <p role="alert">{error}</p>}{result ? <><p className={`challenge-feedback ${result.correct ? "success" : "error"}`}>{result.correct ? <Check size={15}/> : <X size={15}/>}<span><strong>{result.correct ? "Corect." : "Nu chiar."}</strong> {challenge.explanation}</span></p><span className="challenge-note">{result.correct ? `+${gamificationConfig.rewards.daily_challenge_correct.xp} XP primit` : "0 XP · Ai făcut activitatea de azi"} · Gata pentru azi.</span></> : <span className="challenge-note">O întrebare. Fără presiune.</span>}</div></section>;
}
export function AchievementsList({ progress }: { progress: ProgressState }) {
  const active=getActiveAchievements(progress);
  return <section className="achievements"><div className="section-top"><h2>Realizări</h2><span>{achievements.filter(a => Boolean(progress.achievementUnlocks[a.id])).length} deblocate</span></div>{!active.length?<p className="app-card profile-completed">Ai deblocat toate realizările disponibile.</p>:<div className="app-card achievement-list">{active.map(achievement => {
    const Icon = achievementIcons[achievement.icon], count = getAchievementProgress(achievement, progress);
    return <div className="achievement active" key={achievement.id} data-achievement={achievement.id}><span className="icon-tile"><Icon size={20} aria-hidden="true"/></span><div><strong>{achievement.title}</strong><p>{achievement.description}</p><span className="achievement-progress">{count.current} / {count.target}{achievement.condition.type === "total-xp" ? " XP" : achievement.condition.type === "longest-streak" ? " zile" : ""}</span><div className="app-progress" role="progressbar" aria-label={`Progres: ${achievement.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={count.percentage}><span style={{ width: `${count.percentage}%` }}/></div></div></div>;
  })}</div>}</section>;
}
export function DailyGoalRing({ progress, today }: { progress: ProgressState; today: string }) {
  const goal = getDailyGoalState(progress, today);
  return <div className={`daily-goal-status ${goal.completed ? "complete" : ""}`}><div className="daily-goal-ring" role="progressbar" aria-label="Obiectivul zilnic" aria-valuemin={0} aria-valuemax={goal.target} aria-valuenow={Math.min(goal.current, goal.target)} style={{ background: `conic-gradient(var(--finly-sky, #69c9f7) ${goal.percent}%, #e7edf2 0)` }}><Target size={18}/></div><span><strong>{goal.completed ? `${goal.current} XP azi` : `${goal.current} / ${goal.target} XP`}</strong><small>{goal.completed ? "Obiectiv atins" : "Obiectiv zilnic"}</small></span></div>;
}
export function LastSevenDays({ progress, today }: { progress: ProgressState; today: string }) {
  const [detail,setDetail]=useState<string|null>(null);
  const p=useProgressData(),container=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const frost=(event:Event)=>{
      const data=(event as CustomEvent<{userId:string;days:string[]}>).detail;
      if(data.userId!==p.userId || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      for(const day of data.days)container.current?.querySelector(`[data-day="${day}"] i`)?.animate([{transform:'scale(.7)',opacity:.5},{transform:'scale(1.1)',opacity:1},{transform:'scale(1)',opacity:1}],{duration:450});
    };
    window.addEventListener('finly-streak-moment',frost);return()=>window.removeEventListener('finly-streak-moment',frost);
  },[p.userId]);
  return <section className="app-card activity-week"><h2>Ultimele 7 zile</h2><div ref={container}>{getLast7Days(progress, today).map(day=>{
    const localized=new Date(`${day.date}T12:00:00Z`).toLocaleDateString('ro-RO',{timeZone:'Europe/Bucharest',day:'numeric',month:'long'});
    const status={activity:'zi activă',freeze:'protejată cu Freeze',today:'azi, încă fără activitate',missed:'fără activitate'}[day.state];
    const label=`${localized} — ${status}`;
    return <button type="button" className={`activity-day ${day.state} ${day.date===today?'is-today':''}`} data-day={day.date} key={day.date} title={label} aria-label={label} onClick={()=>setDetail(day.state==='freeze'?`${localized}: Nu ai avut activitate în această zi, dar un Freeze ți-a păstrat streak-ul.`:label)}><small>{day.weekday}</small><i aria-hidden="true">{day.state==='activity'?<Flame size={18}/>:day.state==='freeze'?<Snowflake size={18}/>:Number(day.date.slice(8))}</i></button>;
  })}</div>{detail && <p className="calendar-detail" role="status">{detail}</p>}</section>;
}
export function ProfileLearningProgress({ progress }: { progress: ProgressState }) {
  const summary=getProfileLearningProgress(progress);
  const bar=(value:number,label:string)=><div className="app-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}><span style={{width:`${value}%`}}/></div>;
  return <section className="app-card profile-learning" aria-labelledby="profile-learning-title"><h2 id="profile-learning-title">Progres la lecții</h2><div className="profile-learning-total"><span>{summary.completed} din {summary.available} lecții</span><strong>{summary.percentage}%</strong></div>{bar(summary.percentage,'Progres total la lecții')}{summary.categories.map(c=><div className="profile-category-progress" key={c.category.id}><div><strong>{c.category.title}</strong><span>{c.completed} / {c.available}</span></div>{bar(c.percentage,`Progres: ${c.category.title}`)}</div>)}{summary.completed===summary.available&&summary.available>0?<p>Ai parcurs toate lecțiile disponibile.</p>:!summary.categories.length&&<p>{summary.completed > 0 ? "Categoriile în curs vor apărea aici când continui lecțiile." : "Primele tale categorii vor apărea aici după ce începi lecțiile."}</p>}<Link className="profile-learning-link" href="/lectii">Vezi lecțiile</Link></section>;
}
export function StreakChip({ current }: { current: number }) {
  const element = useRef<HTMLSpanElement>(null), previous = useRef(current);
  useEffect(() => { if (current > previous.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) element.current?.animate([{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }], { duration: gamificationConfig.ui.countUpMs }); previous.current = current; }, [current]);
  return <span className="streak-chip" ref={element}><Flame size={16}/> {current} {current === 1 ? "zi" : "zile"}</span>;
}

