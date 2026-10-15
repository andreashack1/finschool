import type { LifeProfile } from '../life-profile';
import 'server-only';
import { addDays, dayKey, monthKey } from '../calendar';
import { getRealNow, type SimulatorClock } from '../clock';
import { buildJournal, buildSimulatorDashboardState } from '../dashboard';
import { simulatorPageSchema, type SimulatorPageState } from '../chapter-two-api';
import { SimulatorError } from '../errors';
import type { Housing } from '../types';
import { loadRun, simulatorState, startRun } from './service';
import { eventArea, effectiveNow } from './events';
import { localInstant } from '../events/time';
import { simulatorDatabase } from './database';
import { eventPolicy } from '../../../content/simulator/events/registry.server';
import { jsonSchema } from '../types';
import { observeSafely } from '../notifications/observe';

/** Locate the next Romanian midnight with the existing DayKey timezone conversion.
 * Calibrated on server time; handles 23/25-hour days without a device wall clock. */
export function serverTiming(now: Date) {
  const target = addDays(dayKey(now), 1);
  let low = now.getTime(), high = low + 36 * 60 * 60 * 1000;
  while (high - low > 1) {
    const middle = Math.floor((low + high) / 2);
    if (dayKey(new Date(middle)) < target) low = middle; else high = middle;
  }
  return { serverNow: now.toISOString(), refreshAfterMs: high - now.getTime() + 1000 };
}
export async function simulatorPageState(userId: string, clock: SimulatorClock): Promise<SimulatorPageState> {
  await simulatorState(userId, clock);
  // Atomic MVCC reread supplies both full-run balance and current-month selectors.
  let loaded = await loadRun(userId);
  if(loaded?.engine?.catalogVersion===1 && loaded.run.lastSettledOn===clock.effectiveDay && loaded.days.some(d=>d.day===clock.effectiveDay)){
    const upgraded=await simulatorDatabase().rpc('upgrade_simulator_life',{p_user:userId,p_run:loaded.run.id,p_expected:loaded.revision,p_day:clock.effectiveDay,p_now:effectiveNow(clock).toISOString(),p_development:process.env.NODE_ENV==='development',p_policy:jsonSchema.parse(eventPolicy(2))});
    if(upgraded.error)throw new SimulatorError('SIMULATOR_UNAVAILABLE',503);
    loaded=await loadRun(userId);
  }
  if (loaded?.run.configSnapshot.lifeProfile && !loaded.engine) {
    const { activateEvents } = await import('./events');
    await activateEvents(userId, loaded.run.configSnapshot.lifeProfile.activityStatus, clock, 2);
    return simulatorPageState(userId, clock);
  }
  const now = getRealNow();
  const timing = serverTiming(now);
  if (dayKey(now) !== clock.realDay) timing.refreshAfterMs = 1000;
  if (!loaded) return simulatorPageSchema.parse({ dashboard: null, timing, previews: [] });
  if (loaded.run.lastSettledOn! > clock.effectiveDay || (!loaded.engine && loaded.run.lastSettledOn !== clock.effectiveDay)) throw new SimulatorError('SIMULATOR_CONFLICT', 409);
  const synced = { ...loaded, engine: loaded.engine ?? null, instances: loaded.instances ?? [], days: loaded.days ?? [], revision: loaded.revision ?? 0, caughtUp: !loaded.engine || (loaded.run.lastSettledOn === clock.effectiveDay && loaded.days.some(d => d.day === clock.effectiveDay)) };
  const events = eventArea(synced, clock);
  await observeSafely(loaded, effectiveNow(clock));
  timing.refreshAfterMs = events.caughtUp ? Math.max(1000, Date.parse(events.nextRefreshAt) - effectiveNow(clock).getTime() + 1000) : 1000;
  const at = events.caughtUp ? effectiveNow(clock).toISOString() : localInstant(synced.run.lastSettledOn!, 1439).toISOString();
  const pending=loaded.monthlyReviews.filter(r=>!r.reviewedAt).sort((a,b)=>a.snapshot.monthKey.localeCompare(b.snapshot.monthKey));
  return simulatorPageSchema.parse({ pendingMonthlyReview:pending[0]??null,pendingMonthlyReviewCount:pending.length, dashboard: { ...buildSimulatorDashboardState(synced.run, synced.ledger, synced.run.lastSettledOn!, clock.realDay, synced.effects, synced.flags, { state: synced.consequenceState, at }, synced.subscriptions), goal:loaded.goal }, previews: [], timing, events });
}
export async function startSimulatorPage(userId: string, housing: Housing, clock: SimulatorClock, profile?: 'liceu' | 'lucrez', lifeProfile?: LifeProfile) {
  if (lifeProfile) await startRun(userId, housing, clock, undefined, lifeProfile);
  else await startRun(userId, housing, clock);
  if (profile) {
    const { activateEvents } = await import('./events');
    await activateEvents(userId, profile, clock,2);
  }
  return simulatorPageState(userId, clock);
}
export async function simulatorJournal(userId: string, clock: SimulatorClock, month: string) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw new SimulatorError('INVALID_SIMULATOR_INPUT');
  const loaded = await loadRun(userId);
  if (!loaded || month < monthKey(loaded.run.startedOn) || month > monthKey(clock.effectiveDay)) throw new SimulatorError('INVALID_SIMULATOR_INPUT');
  return buildJournal(loaded.run, loaded.ledger, clock.effectiveDay, month);
}
