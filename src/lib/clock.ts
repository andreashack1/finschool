import { addCalendarDays, getBucharestDateKey } from "./bucharest-date";
let debugDateOffsetDays = 0;
export const getDebugDateOffsetDays = () => debugDateOffsetDays;
export function advanceDebugDay() { if (process.env.NODE_ENV === "development") debugDateOffsetDays++; }
export function resetDebugClock() { debugDateOffsetDays = 0; }
// The only production wall-clock read. Domain functions always receive a Date.
export function getOffsetNow(realNow: Date, offsetDays: number): Date {
  const target = addCalendarDays(getBucharestDateKey(realNow), offsetDays);
  let shifted = new Date(realNow.getTime() + offsetDays * 86400000);
  // At DST boundaries, 24 elapsed hours can land on the same local date.
  // The development button advances calendar days, without changing the OS clock.
  while (getBucharestDateKey(shifted) !== target) shifted = new Date(shifted.getTime() + (getBucharestDateKey(shifted) < target ? 1 : -1) * 3600000);
  return shifted;
}
export function getNow(): Date { return getOffsetNow(new Date(Date.now()), process.env.NODE_ENV === "development" ? debugDateOffsetDays : 0); }
