"use client";
import { useState } from "react";
import { debugReset, debugAdvanceDay, debugAddXp, debugCompleteCurrentLesson } from "@/src/lib/use-progress";
import { getDebugDateOffsetDays } from "@/src/lib/clock";
import { gamificationConfig } from "@/src/content/gamification-config";
export default function DevGamificationPanel() {
  const [open, setOpen] = useState(false), [busy, setBusy] = useState(false), [offset, setOffset] = useState(getDebugDateOffsetDays);
  async function run(action: () => Promise<unknown>) { setBusy(true); try { await action(); setOffset(getDebugDateOffsetDays()); } finally { setBusy(false); } }
  return <aside className="gamification-dev"><button aria-expanded={open} onClick={() => setOpen(!open)}>Dev</button>{open && <div><strong>Gamification · data +{offset} zile</strong><button disabled={busy} onClick={() => { void run(debugReset); }}>Resetează tot</button><button disabled={busy} onClick={() => { void run(debugAdvanceDay); }}>Mută data cu +1 zi</button><button disabled={busy} onClick={() => { void run(debugAddXp); }}>+{gamificationConfig.debugXpAmount} XP</button><button disabled={busy} onClick={() => { void run(debugCompleteCurrentLesson); }}>Termină lecția curentă</button></div>}</aside>;
}
