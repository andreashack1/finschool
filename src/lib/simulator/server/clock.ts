import 'server-only';
import { cookies } from 'next/headers';
import { clockSnapshot, DEV_CLOCK_COOKIE, getRealNow, MAX_DEV_OFFSET, parseDevOffset } from '../clock';
import { SimulatorError } from '../errors';
import { localInstant } from '../events/time';
import { addDays, dayKey } from '../calendar';
const MINUTE_COOKIE = 'finly_sim_dev_minute_offset';
function minuteOffset(value: string | undefined) { const n = Number(value ?? 0); return Number.isSafeInteger(n) && n >= 0 && n <= MAX_DEV_OFFSET * 1440 ? n : 0; }

export async function getServerClock() {
  // Do not even read a dev cookie in production. No client date is an authority.
  const offset = process.env.NODE_ENV === 'development' ? parseDevOffset((await cookies()).get(DEV_CLOCK_COOKIE)?.value) : 0;
  const now = getRealNow();
  const snapshot = clockSnapshot(now, offset, process.env.NODE_ENV ?? 'production');
  if (process.env.NODE_ENV !== 'development') return { ...snapshot, effectiveNow: now.toISOString() };
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Bucharest', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
  const minutes = Number(parts.find(p => p.type === 'hour')?.value) * 60 + Number(parts.find(p => p.type === 'minute')?.value) + minuteOffset((await cookies()).get(MINUTE_COOKIE)?.value);
  const effective = localInstant(addDays(snapshot.effectiveDay, Math.floor(minutes / 1440)), minutes % 1440);
  return { ...snapshot, effectiveDay: dayKey(effective), effectiveNow: effective.toISOString() };
}
export async function advanceDevMinutes(increment: 1 | 29 | 15 | 60 | 360 | 1440 | 10080) {
  if (process.env.NODE_ENV !== 'development') throw new SimulatorError('INVALID_SIMULATOR_INPUT', 404);
  const jar = await cookies(), offset = minuteOffset(jar.get(MINUTE_COOKIE)?.value) + increment;
  if (offset > MAX_DEV_OFFSET * 1440) throw new SimulatorError('INVALID_SIMULATOR_INPUT');
  jar.set(MINUTE_COOKIE, String(offset), { httpOnly: true, sameSite: 'strict', path: '/', maxAge: 86400 * 30 });
  return getServerClock();
}
export async function advanceDevClock(increment: 1 | 7 | 30) {
  if (process.env.NODE_ENV !== 'development') throw new SimulatorError('INVALID_SIMULATOR_INPUT', 404);
  const jar = await cookies();
  const offset = parseDevOffset(jar.get(DEV_CLOCK_COOKIE)?.value) + increment;
  if (offset > MAX_DEV_OFFSET) throw new SimulatorError('INVALID_SIMULATOR_INPUT');
  jar.set(DEV_CLOCK_COOKIE, String(offset), { httpOnly: true, sameSite: 'strict', path: '/', maxAge: 86400 * 30 });
  return clockSnapshot(getRealNow(), offset, 'development');
}
export async function resetDevClock() {
  if (process.env.NODE_ENV !== 'development') throw new SimulatorError('INVALID_SIMULATOR_INPUT', 404);
  (await cookies()).delete(DEV_CLOCK_COOKIE);
  (await cookies()).delete(MINUTE_COOKIE);
}
