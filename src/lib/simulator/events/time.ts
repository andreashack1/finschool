import { addDays, dayKey, parseDayKey, type DayKey } from '../calendar';
import type { EventPolicy, ScheduleProfile, WindowId } from './types';
import type { OpportunityId } from './life-taxonomy';

/** Breaks are opportunities for short decisions, not free hours in the program. */
export function lifeOpportunities(day:DayKey,profile:ScheduleProfile,policy:EventPolicy):{id:OpportunityId;start:number;end:number}[] {
  const occupied=occupiedSchedule(day,profile,policy), weekend=[0,6].includes(weekday(day));
  const evening=[{id:'early_evening' as const,start:1080,end:1140},{id:'evening' as const,start:1170,end:1260}];
  if(weekend || !occupied)return [{id:'weekend_morning',start:570,end:660},{id:'weekend_daytime',start:780,end:960},...evening];
  const middle=Math.min(occupied.end-20,occupied.start+240);
  return [{id:'before_program',start:Math.max(360,occupied.start-50),end:occupied.start-5},
    {id:'morning_break',start:occupied.start+140,end:Math.min(occupied.end,occupied.start+155)},
    {id:'midday_break',start:middle,end:Math.min(occupied.end,middle+20)},
    {id:'after_program',start:occupied.end+10,end:Math.min(1080,occupied.end+110)},...evening].filter(w=>w.start<w.end) as {id:OpportunityId;start:number;end:number}[];
}

/** Convert local wall time using the canonical Bucharest calendar. Iterating the
 * timezone offset also handles DST. Ambiguous/nonexistent times are rejected;
 * configured gameplay windows deliberately avoid the DST transition hours. */
export function localInstant(day: DayKey, minutes: number): Date {
  if (!Number.isInteger(minutes) || minutes < 0 || minutes >= 1440) throw new RangeError('Invalid local time');
  const p = parseDayKey(day);
  const wall = Date.UTC(p.year, p.month - 1, p.day, Math.floor(minutes / 60), minutes % 60);
  let candidate = wall;
  const format = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Bucharest', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  for (let i = 0; i < 4; i++) {
    const parts = format.formatToParts(new Date(candidate));
    const actual = Number(parts.find(x => x.type === 'hour')?.value) * 60 + Number(parts.find(x => x.type === 'minute')?.value);
    let delta = minutes - actual;
    if (dayKey(new Date(candidate)) < day) delta += 1440;
    if (dayKey(new Date(candidate)) > day) delta -= 1440;
    if (!delta) return new Date(candidate);
    candidate += delta * 60000;
  }
  throw new RangeError('Local time does not exist');
}
export function nextLocalMidnight(day: DayKey): Date { return localInstant(addDays(day, 1), 0); }
export function weekday(day: DayKey): number { const p = parseDayKey(day); return new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay(); }
export function occupiedSchedule(day: DayKey, profile: ScheduleProfile, policy: EventPolicy) {
  const exception = policy.exceptions.find(e => e.day === day);
  if (exception) return exception.type === 'free_day' ? null : exception.occupied;
  return [0, 6].includes(weekday(day)) ? null : policy.profiles[profile];
}
export function availabilityWindows(day: DayKey, profile: ScheduleProfile, policy: EventPolicy) {
  const occupied = occupiedSchedule(day, profile, policy);
  return (Object.keys(policy.windows) as WindowId[]).sort().flatMap(id => {
    if (id === 'weekend_day' && ![0, 6].includes(weekday(day))) return [];
    const configured = policy.windows[id];
    const start = id === 'after_program' && occupied ? Math.max(configured.start, occupied.end) : configured.start;
    const end = id === 'morning' && occupied ? Math.min(configured.end, occupied.start) : configured.end;
    return start < end ? [{ id, start, end }] : [];
  });
}
export function intervalFits(day: DayKey, scheduledAt: string, duration: number, profile: ScheduleProfile, policy: EventPolicy) {
  if (!duration) return true;
  const start = new Date(scheduledAt).getTime(), end = start + duration * 60000;
  if (end > nextLocalMidnight(day).getTime()) return false;
  const occupied = occupiedSchedule(day, profile, policy);
  return !occupied || !(start < localInstant(day, occupied.end).getTime() && end > localInstant(day, occupied.start).getTime());
}
