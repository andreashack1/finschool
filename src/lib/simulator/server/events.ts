import 'server-only';
import { lifeProfilePresets } from '../../../content/simulator/life-profile-config';
import { eventCatalog, eventPolicy } from '../../../content/simulator/events/registry.server';
import { dayKey } from '../calendar';
import type { SimulatorClock } from '../clock';
import { calculateBalance } from '../settle';
import { jsonSchema } from '../types';
import { engineSchema, eventAreaSchema, type ScheduleProfile, type EventInstance } from '../events/types';
import { synchronizeEvents } from '../events/synchronize';
import { publicEvent, resolveEvent, optionAvailability, cancelIrrelevantEvent } from '../events/resolve';
import { localInstant, nextLocalMidnight } from '../events/time';
import { SimulatorError } from '../errors';
import { loadRun } from './service';
import { simulatorDatabase } from './database';
import { finalizeClosedMonths, assertMonthlyReviewComplete } from './monthly-review';

type Db = ReturnType<typeof simulatorDatabase>;
async function upgradeDecisions(userId:string, loaded:NonNullable<Awaited<ReturnType<typeof loadRun>>>, clock:SimulatorClock, db:Db) {
  if(loaded.engine?.policyVersion!==2) return loaded;
  const result=await db.rpc('upgrade_simulator_decisions',{p_user:userId,p_run:loaded.run.id,p_expected:loaded.revision,p_day:dayKey(effectiveNow(clock)),p_now:effectiveNow(clock).toISOString(),p_development:process.env.NODE_ENV==='development',p_policy:jsonSchema.parse(eventPolicy(3))});
  // A rolling code/schema release must not make existing runs unavailable.
  // Keep their persisted policy until the narrow upgrade RPC is installed.
  if(result.error?.code==='PGRST202')return null;
  if(result.error)throw new SimulatorError('SIMULATOR_UNAVAILABLE',503);
  return await loadRun(userId,db) ?? loaded;
}
export function effectiveNow(clock: SimulatorClock): Date {
  const now = new Date();
  if (process.env.NODE_ENV !== 'development') return now;
  if (clock.effectiveNow) return new Date(clock.effectiveNow);
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Bucharest', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
  return localInstant(clock.effectiveDay, Number(parts.find(p => p.type === 'hour')?.value) * 60 + Number(parts.find(p => p.type === 'minute')?.value));
}
export async function syncSimulatorThrough(userId: string, clock: SimulatorClock, db: Db = simulatorDatabase()) {
  for (let attempt = 0; attempt < 4; attempt++) {
    let loaded = await loadRun(userId, db);
    if (!loaded?.engine) return loaded && { ...loaded, caughtUp: true };
    const now = effectiveNow(clock);
    if ((loaded.engine.processedAt && now.toISOString() < loaded.engine.processedAt) || (loaded.engine.lastClosedDay && dayKey(now) <= loaded.engine.lastClosedDay)) throw new SimulatorError('SIMULATOR_CLOCK_REVERSED', 409);
    const upgraded=await upgradeDecisions(userId,loaded,clock,db);
    if(upgraded)loaded=upgraded;
    if(!loaded.engine)throw new SimulatorError('SIMULATOR_CONFLICT',409);
    if(upgraded && loaded.engine.policyVersion===2)continue;
    if(loaded.engine.policyVersion!==4 && dayKey(now)>='2026-10-16'){
      const upgrade=await db.rpc('upgrade_simulator_daily_floor',{p_user:userId,p_run:loaded.run.id,p_expected:loaded.revision,p_day:dayKey(now),p_now:now.toISOString(),p_development:process.env.NODE_ENV==='development',p_policy:jsonSchema.parse(eventPolicy(4))});
      // Missing migration keeps the persisted engine available during rollout.
      if(upgrade.error && upgrade.error.code!=='PGRST202')throw new SimulatorError('SIMULATOR_UNAVAILABLE',503);
      if(!upgrade.error)continue;
    }
    const result = synchronizeEvents({ ...loaded, engine: loaded.engine }, now, eventCatalog(loaded.engine.catalogVersion), process.env.NODE_ENV === 'development', new Date().toISOString(),eventCatalog);
    const changed = result.newEntries.length || result.newInstances.length || result.resolutions.length || result.cancellations.length || result.plannedDays.length || result.closedDays.length || result.engine.processedAt !== loaded.engine.processedAt;
    if (!changed) { await finalizeClosedMonths(userId,loaded,clock,db); const saved=await loadRun(userId,db); return saved && { ...saved, caughtUp: result.caughtUp }; }
    const updates = new Map<string, EventInstance>();
    for (const e of [...result.newInstances, ...result.resolutions, ...result.cancellations]) updates.set(e.id, e);
    const response = await db.rpc('commit_simulator_events', { p_user: userId, p_run: loaded.run.id, p_expected: loaded.revision, p_now: effectiveNow(clock).toISOString(), p_development: process.env.NODE_ENV === 'development', p_settled: loaded.run.lastSettledOn, p_through: result.run.lastSettledOn!, p_engine: jsonSchema.parse(result.engine), p_days: jsonSchema.parse(result.days.filter(d => result.plannedDays.some(p => p.day === d.day) || result.closedDays.includes(d.day))), p_instances: jsonSchema.parse([...updates.values()]), p_entries: jsonSchema.parse(result.newEntries), p_operations: jsonSchema.parse(result.newOperations), ...(result.subscriptions.some(s => s.revision !== loaded.subscriptions.find(old => old.id === s.id)?.revision) ? { p_subscriptions: jsonSchema.parse(result.subscriptions.filter(s => s.revision !== loaded.subscriptions.find(old => old.id === s.id)?.revision)) } : {}) });
    if (response.error) throw new SimulatorError('SIMULATOR_UNAVAILABLE', 503);
    if (response.data && typeof response.data === 'object' && !Array.isArray(response.data) && response.data.status === 'conflict') continue;
    const saved = await loadRun(userId, db);
    if(saved)await finalizeClosedMonths(userId,saved,clock,db);
    const final=await loadRun(userId,db);
    return final && { ...final, caughtUp: result.caughtUp };
  }
  throw new SimulatorError('SIMULATOR_CONFLICT', 409);
}
export async function activateEvents(userId: string, profile: ScheduleProfile, clock: SimulatorClock, catalogVersion:1|2=1) {
  const { simulatorState } = await import('./service');
  const initial = await loadRun(userId);
  if (!initial?.engine) await simulatorState(userId, clock);
  const loaded = await loadRun(userId);
  if (!loaded) throw new SimulatorError('SIMULATOR_CONFLICT', 409);
  const lifeProfile = loaded.run.configSnapshot.lifeProfile;
  if (lifeProfile) profile = lifeProfile.activityStatus;
  assertMonthlyReviewComplete(loaded,clock);
  if (!loaded.engine) {
    const policyVersion=catalogVersion===2?3:1;
    const policy = eventPolicy(policyVersion);
    const engine = engineSchema.parse({ scheduleProfile: profile, startedAt: effectiveNow(clock).toISOString(), catalogVersion, policyVersion, policySnapshot: lifeProfile ? {...policy, profiles: lifeProfilePresets.schedules} : policy, lastClosedDay: null, processedAt: null });
    const response = await simulatorDatabase().rpc('activate_simulator_events', { p_user: userId, p_run: loaded.run.id, p_expected: loaded.run.lastSettledOn, p_engine: jsonSchema.parse(engine) });
    if (response.error) throw new SimulatorError('SIMULATOR_UNAVAILABLE', 503);
  }
  return loaded;
}
export function eventArea(loaded: NonNullable<Awaited<ReturnType<typeof syncSimulatorThrough>>>, clock: SimulatorClock) {
  const now = effectiveNow(clock), targetDay = dayKey(now), engine = loaded.engine;
  const balance = calculateBalance(loaded.ledger), caughtUp = loaded.caughtUp;
  const visible = loaded.instances.filter(e => e.scheduledAt <= now.toISOString()).sort((a,b)=>a.scheduledAt.localeCompare(b.scheduledAt)||a.generationKey.localeCompare(b.generationKey));
  const midnight = nextLocalMidnight(targetDay).toISOString();
  const nextRefreshAt=[midnight,...loaded.instances.filter(e=>e.status==='pending').flatMap(e=>[e.scheduledAt,e.expiresAt])].filter(at=>at>now.toISOString()).sort()[0];
  return eventAreaSchema.parse({ serverNow:now.toISOString(), engineStatus: engine ? 'active' : 'needs_profile', profile: engine?.scheduleProfile ?? null, revision: loaded.revision,
    pending: engine ? visible.filter(e => e.day === targetDay && e.status === 'pending').map(e => publicEvent(e, balance, loaded.instances, engine, caughtUp, loaded.consequenceState, now.toISOString())) : [],
    resolved: engine ? visible.filter(e => e.day === targetDay && e.status === 'resolved').map(e => publicEvent(e, balance, loaded.instances, engine, caughtUp, loaded.consequenceState, now.toISOString())) : [],
    caughtUp, processedThrough: loaded.run.lastSettledOn, targetDay, remainingDaysEstimate: Math.max(0, Math.round((Date.parse(targetDay) - Date.parse(loaded.run.lastSettledOn!)) / 86400000)), nextRefreshAt });
}
function detailResult(loaded: Awaited<ReturnType<typeof syncSimulatorThrough>>, id: string, clock: SimulatorClock) {
  const instance = loaded?.instances.find(e => e.id === id && e.scheduledAt <= effectiveNow(clock).toISOString());
  if (!loaded?.engine || !instance) throw new SimulatorError('INVALID_SIMULATOR_INPUT', 404);
  const event=publicEvent(instance, calculateBalance(loaded.ledger), loaded.instances, loaded.engine, loaded.caughtUp, loaded.consequenceState, effectiveNow(clock).toISOString());
  return { event, serverNow:effectiveNow(clock).toISOString(), balanceBani: calculateBalance(loaded.ledger), caughtUp: loaded.caughtUp };
}
export async function eventDetail(userId: string, id: string, clock: SimulatorClock) {
  const loaded=await syncSimulatorThrough(userId,clock);
  // Reviewing a saved outcome does not initiate a new decision. Pending choices
  // still respect the existing mandatory monthly-review gate.
  if(loaded?.instances.find(e=>e.id===id)?.status==='pending')assertMonthlyReviewComplete(loaded,clock);
  return detailResult(loaded,id,clock);
}
export async function chooseEvent(userId: string, id: string, optionId: string, clock: SimulatorClock) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const loaded = await syncSimulatorThrough(userId, clock);
    if(loaded)assertMonthlyReviewComplete(loaded,clock);
    const now = effectiveNow(clock).toISOString();
    const instance = loaded?.instances.find(e => e.id === id && e.scheduledAt <= now);
    if (!loaded?.engine || !instance) throw new SimulatorError('INVALID_SIMULATOR_INPUT', 404);
    if (instance.status === 'resolved') return { ...detailResult(loaded, id, clock), conflict: instance.selectedOptionId !== optionId };
    const balance = calculateBalance(loaded.ledger);
    if (!loaded.caughtUp || instance.expiresAt <= now || instance.status !== 'pending' || !optionAvailability(instance, balance, loaded.instances, loaded.engine, true, loaded.consequenceState, now).some(o => o.id === optionId && !o.unavailableReason)) return { ...detailResult(loaded, id, clock), conflict: true };
    const result = resolveEvent(instance, optionId, 'manual', now, balance, loaded.instances, loaded.engine, loaded.revision, loaded.consequenceState, new Date().toISOString());
    const cancellations = loaded.instances.flatMap(e => { const cancelled = e.id !== instance.id ? cancelIrrelevantEvent(e, result.consequenceState, now) : null; return cancelled ? [cancelled] : []; });
    const response = await simulatorDatabase().rpc('commit_simulator_events', { p_user: userId, p_run: loaded.run.id, p_expected: loaded.revision, p_now: effectiveNow(clock).toISOString(), p_development: process.env.NODE_ENV === 'development', p_settled: loaded.run.lastSettledOn, p_through: loaded.run.lastSettledOn!, p_engine: jsonSchema.parse(loaded.engine), p_days: [], p_instances: jsonSchema.parse([result.instance, ...cancellations]), p_entries: jsonSchema.parse(result.entry ? [result.entry] : []), p_operations: jsonSchema.parse(result.operations) });
    if (response.error) throw new SimulatorError(response.error.message.includes('MONTHLY_REVIEW_REQUIRED') ? 'MONTHLY_REVIEW_REQUIRED' : 'SIMULATOR_UNAVAILABLE', response.error.message.includes('MONTHLY_REVIEW_REQUIRED') ? 409 : 503);
    if (response.data && typeof response.data === 'object' && !Array.isArray(response.data) && response.data.status === 'conflict') continue;
    const saved = await loadRun(userId);
    return { ...detailResult(saved && { ...saved, caughtUp: true }, id, clock), conflict: false };
  }
  throw new SimulatorError('SIMULATOR_CONFLICT', 409);
}
