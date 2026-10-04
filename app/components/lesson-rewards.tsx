"use client";
import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { DailyGoalRing } from "./gamification-ui";
import { gamificationConfig } from "@/src/content/gamification-config";
import { getEffectiveDateKey } from "@/src/lib/progress";
import { getNow } from "@/src/lib/clock";
import type { DomainResult } from "@/src/types/progress";
function XpCount({ amount }: { amount: number }) {
  const [count, setCount] = useState(amount);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0; const start = performance.now();
    const tick = (time: number) => { const fraction = Math.min(1, (time - start) / gamificationConfig.ui.countUpMs); setCount(Math.round(amount * fraction)); if (fraction < 1) frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame);
  }, [amount]);
  return <span>+{count} XP</span>;
}
export function LessonRewards({ result }: { result: DomainResult }) {
  const summary = result.lesson;
  return <div className="lesson-reward-summary"><div className="lesson-reward"><XpCount amount={result.xpGained}/></div>{summary && <><strong>{summary.score} din {summary.questionCount} corecte din prima</strong>{!summary.firstCompletion && <p>{summary.improvementXp > 0 ? `Scor îmbunătățit: ${summary.best} / ${summary.questionCount}.` : `Cel mai bun scor rămâne ${summary.best} / ${summary.questionCount}. 0 XP pentru îmbunătățire.`}</p>}</>}<ul className="reward-breakdown">{result.xpBreakdown.map(item => <li key={item.type}>{item.label}: {item.type === "lesson_question_first_try" ? `${item.count} × ${gamificationConfig.rewards.lesson_question_first_try.xp} = ${item.amount} XP` : `+${item.amount} XP`}</li>)}</ul><span className="streak-chip"><Flame size={16}/> {result.streakAfter} {result.streakAfter === 1 ? "zi activă" : "zile active"}</span><DailyGoalRing progress={result.progress} today={getEffectiveDateKey(result.progress, getNow())}/></div>;
}

