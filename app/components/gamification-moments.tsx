"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { FinlyMascot } from "./finly-brand";
import { achievements, type Achievement } from "@/src/content/achievements";
import { gamificationConfig } from "@/src/content/gamification-config";
import { levels } from "@/src/content/levels";
import { acknowledgeAchievement, acknowledgeLevel, useProgressData } from "@/src/lib/use-progress";
import { StreakMomentHost } from "./streak-moment-host";
import type { LevelUp } from "@/src/types/progress";
export function GamificationMoments() { const p=useProgressData(); return <AccountMoments key={p.userId ?? "guest"}/>; }
function AccountMoments() {
  const p = useProgressData();
  const [levelUp, setLevelUp] = useState<LevelUp | null>(null), [toast, setToast] = useState<Achievement | null>(null);
  const [streakBusy,setStreakBusy]=useState(false);
  const dialog = useRef<HTMLDialogElement>(null), returnFocus = useRef<HTMLElement | null>(null);
  const nextAchievement = achievements.find(a => p.achievementUnlocks[a.id] && !p.seenAchievementToastIds.includes(a.id));

  useEffect(() => {
    if (!p.hydrated || !p.userId || !p.notificationsReady || levelUp || toast || streakBusy) return;
    const timer = window.setTimeout(() => {
      // Rewards never cover an active question. Domain unlocks are committed at
      // completion, then displayed once its summary has rendered.
      if (document.querySelector(".lesson-question") && !document.querySelector(".lesson-finish")) return;
      if (p.pendingLevelUp) setLevelUp(p.pendingLevelUp);
      else if (nextAchievement) setToast(nextAchievement);

    }, gamificationConfig.ui.momentDelayMs);
    return () => window.clearTimeout(timer);
  }, [p.hydrated, p.userId, p.notificationsReady, p.pendingLevelUp, nextAchievement, levelUp, toast,streakBusy]);
  useEffect(() => {
    if (!levelUp || !dialog.current) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.current.showModal(); void acknowledgeLevel();
    return () => returnFocus.current?.focus();
  }, [levelUp]);
  useEffect(() => {
    if (!toast) return;
    if (toast) void acknowledgeAchievement(toast.id);

    const timer = window.setTimeout(() => { setToast(null); }, gamificationConfig.ui.toastMs);
    return () => window.clearTimeout(timer);
  }, [toast]);
  const next = levelUp && levels.find(l => l.level === levelUp.to.level + 1);
  return <>
    <StreakMomentHost blocked={Boolean(levelUp || toast)} onActiveChange={setStreakBusy}/>
    {levelUp && <dialog ref={dialog} className="finly-level-dialog" aria-labelledby="level-up-title" onCancel={() => setLevelUp(null)}><FinlyMascot framing="head" mood="excited"/><span className="block-kicker">Nivel nou</span><h2 id="level-up-title">{levelUp.to.title}</h2><p>{levelUp.levelsGained > 1 ? `Ai urcat ${levelUp.levelsGained} niveluri. Acum ești ${levelUp.to.title}.` : `Ai trecut pragul de ${levelUp.to.minXp.toLocaleString("ro-RO")} XP.`}</p>{next && <p>Următorul nivel: {next.title} la {next.minXp.toLocaleString("ro-RO")} XP.</p>}<button className="app-button" autoFocus onClick={() => setLevelUp(null)}>Continuă</button></dialog>}
    {toast && !levelUp && <aside className="finly-achievement-toast" role="status" aria-live="polite" aria-atomic="true"><FinlyMascot framing="head" mood="correct"/><div><span>Realizare deblocată</span><strong>{toast.title}</strong></div><button aria-label="Închide notificarea" onClick={() => { setToast(null); }}><X size={18}/></button></aside>}
  </>;
}

