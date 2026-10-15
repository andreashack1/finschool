import { addDays, dayKey, type DayKey } from './calendar';

export const DEV_CLOCK_COOKIE = 'finly_sim_dev_day_offset';
export const MAX_DEV_OFFSET = 3650;
export interface SimulatorClock { realDay: DayKey; effectiveDay: DayKey; offsetDays: number; effectiveNow?: string; }
export function getRealNow(): Date { return new Date(); }
export function parseDevOffset(value: string | undefined): number {
  if (!value || !/^\d+$/.test(value)) return 0;
  const n = Number(value);
  return Number.isSafeInteger(n) && n <= MAX_DEV_OFFSET ? n : 0;
}
/** Logical civil-day offset; never changes the host clock or adds 24-hour intervals.
 * Production ignores the offset absolutely, including a forged cookie. */
export function getEffectiveDay(now: Date, offset: number, environment: string): DayKey {
  return addDays(dayKey(now), environment === 'development' ? parseDevOffset(String(offset)) : 0);
}
export function clockSnapshot(now: Date, offset: number, environment: string): SimulatorClock {
  const offsetDays = environment === 'development' ? parseDevOffset(String(offset)) : 0;
  return { realDay: dayKey(now), effectiveDay: getEffectiveDay(now, offsetDays, environment), offsetDays };
}
