"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { FinlyMascot } from "./finly-brand";
import { achievements, type Achievement } from "@/src/content/achievements";
import { levels } from "@/src/content/levels";
import { getCurrentLevel } from "@/src/lib/progress";
import { acknowledgeAchievement, acknowledgeLevel, useProgressData } from "@/src/lib/use-progress";
import type { LevelUp } from "@/src/types/progress";

export function GamificationMoments() {
  const progress = useProgressData();
  const [levelUp, setLevelUp] = useState<LevelUp | null>(null);
  const [toast, setToast] = useState<Achievement | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const current = getCurrentLevel(progress.totalXp);
  const pendingLevel = progress.hydrated && current.level > progress.highestCelebratedLevel;
  const nextAchievement = achievements.find(a => progress.achievements.unlockedIds.includes(a.id) && !progress.achievements.seenToastIds.includes(a.id));

  useEffect(() => {
    if (levelUp || toast || !progress.hydrated) return;
    // Let the completion result/feedback render before announcing its rewards.
    const timer = window.setTimeout(() => {
      if (pendingLevel) {
        const from = levels[Math.max(0, progress.highestCelebratedLevel - 1)];
        setLevelUp({ from, to: current, levelsGained: current.level - from.level });
      } else if (nextAchievement) setToast(nextAchievement);
    }, 200);
    return () => window.clearTimeout(timer);
  }, [levelUp, toast, pendingLevel, nextAchievement, progress.hydrated, progress.highestCelebratedLevel, current]);
  useEffect(() => {
    if (!levelUp || !dialog.current) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.current.showModal();
    void acknowledgeLevel();
    return () => { returnFocus.current?.focus(); };
  }, [levelUp]);
  useEffect(() => {
    if (!toast) return;
    void acknowledgeAchievement(toast.id);
    const timer = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(timer);
  }, [toast]);
  return <>
    {levelUp && <dialog ref={dialog} className="finly-level-dialog" aria-labelledby="level-up-title" aria-describedby="level-up-copy" onCancel={() => setLevelUp(null)}><FinlyMascot framing="head" mood="excited"/><span className="block-kicker">NIVEL NOU</span><h2 id="level-up-title">{levelUp.to.title}</h2><p id="level-up-copy">{levelUp.levelsGained > 1 ? `Ai urcat ${levelUp.levelsGained} niveluri. Acum ești ${levelUp.to.title}.` : `Ai ajuns la nivelul ${levelUp.to.level}. Fiecare pas se adună.`}</p><button className="app-button" autoFocus onClick={() => setLevelUp(null)}>Continuă</button></dialog>}
    {toast && !levelUp && <aside className="finly-achievement-toast" role="status" aria-live="polite" aria-atomic="true"><FinlyMascot framing="head" mood="correct"/><div><span>Realizare deblocată</span><strong>{toast.title}</strong><p>{toast.description}</p></div><button aria-label="Închide notificarea realizării" onClick={() => setToast(null)}><X size={18}/></button></aside>}
  </>;
}
