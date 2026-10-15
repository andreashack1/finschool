import { z } from 'zod';
import { getBucharestDateKey, isDateKey, addCalendarDays } from '../bucharest-date';

/** A Romanian civil date, not an instant at midnight UTC. */
export const dayKeySchema = z.string().refine(value => isDateKey(value) && !value.startsWith('0000-'), 'Zi calendaristică invalidă').brand<'DayKey'>();
export type DayKey = z.infer<typeof dayKeySchema>;
export function dayKey(date: Date): DayKey {
  if (!Number.isFinite(date.getTime())) throw new RangeError('Invalid instant');
  return dayKeySchema.parse(getBucharestDateKey(date));
}
export function parseDayKey(day: DayKey | string) {
  const valid = dayKeySchema.parse(day);
  const [year, month, date] = valid.split('-').map(Number);
  return { year, month, day: date };
}
export function formatDayKey(year: number, month: number, day: number): DayKey {
  return dayKeySchema.parse(`${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
}
export function compareDayKeys(a: DayKey, b: DayKey): -1 | 0 | 1 { return a < b ? -1 : a > b ? 1 : 0; }
export function addDays(day: DayKey, count: number): DayKey {
  if (!Number.isSafeInteger(count)) throw new RangeError('Day increment must be an integer');
  // Existing helper changes UTC Y/M/D fields. It never adds 24-hour elapsed time,
  // and its result is interpreted only as a civil date, including across DST.
  return dayKeySchema.parse(addCalendarDays(dayKeySchema.parse(day), count));
}
function ordinal(day: DayKey): number {
  const { year, month, day: date } = parseDayKey(day);
  const utc = new Date(0);
  utc.setUTCHours(0, 0, 0, 0);
  utc.setUTCFullYear(year, month - 1, date);
  // UTC is only a Y/M/D ordinal technique here, never the gameplay timezone.
  return utc.getTime() / 86_400_000;
}
export function daysBetween(a: DayKey, b: DayKey): number { return ordinal(b) - ordinal(a); }
export function daysInMonth(year: number, month: number): number {
  if (!Number.isInteger(year) || year < 1 || year > 9999 || !Number.isInteger(month) || month < 1 || month > 12) throw new RangeError('Invalid month');
  if (month === 2) return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}
export function startOfMonth(day: DayKey): DayKey { const p = parseDayKey(day); return formatDayKey(p.year, p.month, 1); }
export function endOfMonth(day: DayKey): DayKey { const p = parseDayKey(day); return formatDayKey(p.year, p.month, daysInMonth(p.year, p.month)); }
export function dayOfMonth(day: DayKey): number { return parseDayKey(day).day; }
export function monthKey(day: DayKey): string { return dayKeySchema.parse(day).slice(0, 7); }
/** The first civil date of the following month. */
export function nextMonth(day: DayKey): DayKey { return addDays(endOfMonth(day), 1); }
