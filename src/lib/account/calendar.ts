import { createEmptyProgress,reconcileCalendar,normalizeProgress,getBucharestDateKey } from '../progress';
import { addCalendarDays } from '../bucharest-date';
import type { ProgressState } from '../../types/progress';
export const precedingCalendarDay=(now:Date)=>new Date(`${addCalendarDays(getBucharestDateKey(now),-1)}T12:00:00Z`);
// Reconstruct the cached balance from initial config, weekly grants and actual
// consumption history. Grant/cap rules remain in the existing pure engine.
export function freezeLedger(progress:ProgressState,until:Date) {
  let ledger=createEmptyProgress(new Date(progress.createdAt ?? until.toISOString()));
  const validDates:string[]=[];
  for(const day of [...new Set(progress.freezeDates)].sort().filter(day=>day<=getBucharestDateKey(until))) {
    ledger=reconcileCalendar(ledger,new Date(`${day}T12:00:00Z`));
    if(ledger.freezeBalance>0){validDates.push(day);ledger={...ledger,freezeBalance:ledger.freezeBalance-1};}
  }
  ledger=reconcileCalendar(ledger,until);
  return {freezeBalance:ledger.freezeBalance,lastFreezeGrantDateKey:ledger.lastFreezeGrantDateKey,lastFreezeGrantWeekKey:ledger.lastFreezeGrantWeekKey,validDates};
}
export function reconcileAccountCalendar(progress:ProgressState,now:Date) {
  const canonical=freezeLedger(progress,now);
  const valid={...progress,freezeDates:canonical.validDates};
  const before=freezeLedger(valid,precedingCalendarDay(now));
  // Let the engine consume yesterday before applying a new week's grant today.
  const normalized=normalizeProgress({...valid,freezeBalance:before.freezeBalance,lastFreezeGrantDateKey:before.lastFreezeGrantDateKey,lastFreezeGrantWeekKey:before.lastFreezeGrantWeekKey},now);
  const final=freezeLedger(normalized,now);
  return {...normalized,freezeDates:final.validDates,freezeBalance:final.freezeBalance,lastFreezeGrantDateKey:final.lastFreezeGrantDateKey,lastFreezeGrantWeekKey:final.lastFreezeGrantWeekKey};
}
