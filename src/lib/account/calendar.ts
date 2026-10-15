import { createEmptyProgress,reconcileCalendar,normalizeProgress,getBucharestDateKey } from '../progress';
import { addCalendarDays } from '../bucharest-date';
import type { ProgressState } from '../../types/progress';
export const precedingCalendarDay=(now:Date)=>new Date(`${addCalendarDays(getBucharestDateKey(now),-1)}T12:00:00Z`);
// Reconstruct the cached balance from initial config, weekly grants and actual
// consumption history. Grant/cap rules remain in the existing pure engine.
export function freezeLedger(progress:ProgressState,until:Date) {
  let ledger=createEmptyProgress(new Date(progress.createdAt ?? until.toISOString()));
  ledger={...ledger,freezeBalance:progress.freezeInitialBalance ?? ledger.freezeBalance};
  const validDates:string[]=[];
  for(const day of [...new Set(progress.freezeDates)].sort().filter(day=>day<=getBucharestDateKey(until))) {
    ledger=reconcileCalendar(ledger,new Date(`${day}T12:00:00Z`));
    if(ledger.freezeBalance>0){validDates.push(day);ledger={...ledger,freezeBalance:ledger.freezeBalance-1};}
  }
  ledger=reconcileCalendar(ledger,until);
  return {freezeBalance:ledger.freezeBalance,lastFreezeGrantDateKey:ledger.lastFreezeGrantDateKey,lastFreezeGrantWeekKey:ledger.lastFreezeGrantWeekKey,validDates};
}
export function reconcileAccountCalendar(progress:ProgressState,now:Date) {
  // Inventory is reconstructed only through the last settled/open day. Future
  // Monday grants must not be available while closing earlier missed days.
  const anchor=progress.maxSeenDateKey ?? getBucharestDateKey(new Date(progress.createdAt ?? now.toISOString()));
  const before=freezeLedger(progress,new Date(`${anchor}T12:00:00Z`));
  return normalizeProgress({...progress,freezeBalance:before.freezeBalance,lastFreezeGrantDateKey:before.lastFreezeGrantDateKey,lastFreezeGrantWeekKey:before.lastFreezeGrantWeekKey},now);
}
