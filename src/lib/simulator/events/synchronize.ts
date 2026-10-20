import { settleSubscriptions, type SimulatorSubscription } from '../subscriptions';
import { planningEngineForDay } from './decision-policy';
import { addDays, dayKey, daysBetween, type DayKey } from '../calendar';
import { calculateBalance, settle } from '../settle';
import type { LedgerEntry, SimulatorRun } from '../types';
import { planEventDay, type Rejection } from './planner';
import { automaticOption, cancelIrrelevantEvent, resolveEvent } from './resolve';
import { emptyConsequenceState } from '../consequences/state';
import type { ConsequenceState, StateOperation } from '../consequences/types';
import type { EventDay, EventDefinitionV1, EventEngine, EventInstance } from './types';

export interface EventState {
  run: SimulatorRun; ledger: LedgerEntry[]; engine: EventEngine; instances: EventInstance[]; days: EventDay[]; revision: number;
  consequenceState?: ConsequenceState; subscriptions?: SimulatorSubscription[];
}
/** One chronological timeline. Expired old-day decisions always precede the
 * next day's salary/fixed settlement. All mutations are committed in one CAS. */
export function synchronizeEvents(state: EventState, now: Date, catalog: readonly EventDefinitionV1[], diagnostics = false, recordedAt = now.toISOString(), catalogForVersion?: (version:number)=>readonly EventDefinitionV1[]) {
  const targetDay = dayKey(now), nowIso = now.toISOString();
  if (state.engine.processedAt && nowIso < state.engine.processedAt) throw new RangeError('Clock reversed');
  const engine = structuredClone(state.engine), run = structuredClone(state.run);
  const ledger = [...state.ledger], instances = structuredClone(state.instances), days = structuredClone(state.days);
  let consequenceState = structuredClone(state.consequenceState ?? emptyConsequenceState());
  const newOperations: StateOperation[] = [], cancellations: EventInstance[] = [];
  const newEntries: LedgerEntry[] = [], newInstances: EventInstance[] = [], resolutions: EventInstance[] = [], plannedDays: EventDay[] = [], closedDays: DayKey[] = [], rejected: Rejection[] = [];
  let cursor = engine.lastClosedDay ? addDays(engine.lastClosedDay, 1) : dayKey(new Date(engine.startedAt));
  let processed = 0;
  let subscriptions = structuredClone(state.subscriptions ?? []);
  while (cursor <= targetDay && processed < engine.policySnapshot.batchDays) {
    // Previous iteration has closed its event day before reaching this point.
    const financial = settle(run, ledger, cursor);
    ledger.push(...financial.newEntries); newEntries.push(...financial.newEntries); run.lastSettledOn = financial.settledThrough;
    const recurring = settleSubscriptions(subscriptions, ledger, cursor);
    subscriptions = recurring.subscriptions; ledger.push(...recurring.entries); newEntries.push(...recurring.entries);
    if (!days.some(d => d.day === cursor)) {
      const dayEngine=planningEngineForDay(engine,cursor);
      if(dayEngine.catalogVersion!==engine.catalogVersion && !catalogForVersion)throw new Error('Historical catalog resolver required');
      const dayCatalog=dayEngine.catalogVersion===engine.catalogVersion?catalog:catalogForVersion!(dayEngine.catalogVersion);
      const plan = planEventDay({ lifeProfile: run.configSnapshot.lifeProfile, runId: run.id, userId: run.userId, rngVersion: run.rngVersion, day: cursor, engine:dayEngine, catalog:dayCatalog, history: instances, plannedAt: nowIso, diagnostics, consequenceState });
      rejected.push(...plan.rejected); instances.push(...plan.instances); newInstances.push(...plan.instances);
      const marker: EventDay = { day: cursor, catalogVersion: dayEngine.catalogVersion, policyVersion: dayEngine.policyVersion, plannedAt: nowIso, closedAt: null, eventCount: plan.instances.length };
      days.push(marker); plannedDays.push(marker);
    }
    const expired = instances.filter(e => e.day === cursor && e.status === 'pending' && e.expiresAt <= nowIso).sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt) || a.generationKey.localeCompare(b.generationKey));
    for (const [resolutionIndex, instance] of expired.entries()) {
      const cancelled = cancelIrrelevantEvent(instance, consequenceState, instance.expiresAt);
      if (cancelled) { instances[instances.findIndex(e => e.id === instance.id)] = cancelled; cancellations.push(cancelled); continue; }
      const balance = calculateBalance(ledger), option = automaticOption(instance, balance, instances, engine, run.rngVersion, consequenceState);
      const stableIndex=(instance.generationKey.startsWith('v2:p3:') || instance.generationKey.startsWith('v3:p4:')) ? instances.filter(e=>e.day===cursor).sort((a,b)=>a.scheduledAt.localeCompare(b.scheduledAt)||a.generationKey.localeCompare(b.generationKey)).findIndex(e=>e.id===instance.id) : resolutionIndex;
      const result = resolveEvent(instance, option, 'automatic', nowIso, balance, instances, engine, stableIndex, consequenceState, recordedAt);
      consequenceState = result.consequenceState; newOperations.push(...result.operations);
      instances[instances.findIndex(e => e.id === instance.id)] = result.instance; resolutions.push(result.instance);
      if (result.entry) { ledger.push(result.entry); newEntries.push(result.entry); }
    }
    if (cursor < targetDay) {
      if (instances.some(e => e.day === cursor && e.status === 'pending')) throw new Error('Cannot close pending day');
      const marker = days.find(d => d.day === cursor)!;
      marker.closedAt = nowIso; closedDays.push(cursor); engine.lastClosedDay = cursor;
    }
    processed++;
    if (cursor === targetDay) break;
    cursor = addDays(cursor, 1);
  }
  const caughtUp = run.lastSettledOn === targetDay && days.some(d => d.day === targetDay);
  // A partial batch records the last fully processed boundary, not target now.
  engine.processedAt = caughtUp ? nowIso : engine.processedAt;
  if (caughtUp) for (const instance of instances.filter(e => e.status === 'pending' && e.scheduledAt <= nowIso)) {
    const cancelled = cancelIrrelevantEvent(instance, consequenceState, nowIso);
    if (cancelled) { instances[instances.findIndex(e => e.id === instance.id)] = cancelled; cancellations.push(cancelled); }
  }
  // Only the active open civil day is repairable. Saved snapshots are immutable.
  const active=days.find(d=>d.day===targetDay && !d.closedAt);
  const currentEngine=planningEngineForDay(engine,targetDay);
  if(caughtUp && active && currentEngine.policySnapshot.version===4){
    const usable=instances.filter(e=>e.day===targetDay && e.status!=='cancelled');
    if(usable.length<currentEngine.policySnapshot.minDailyEvents){
      const plan=planEventDay({lifeProfile:run.configSnapshot.lifeProfile,runId:run.id,userId:run.userId,rngVersion:run.rngVersion,day:targetDay,engine:currentEngine,catalog,history:instances,plannedAt:nowIso,notBefore:nowIso,floorOnly:true,diagnostics,consequenceState});
      instances.push(...plan.instances);newInstances.push(...plan.instances);rejected.push(...plan.rejected);
    }
    const count=instances.filter(e=>e.day===targetDay && e.status!=='cancelled').length;
    if(active.eventCount!==count){active.eventCount=count;if(!plannedDays.some(d=>d.day===targetDay))plannedDays.push(active);}
  }
  instances.sort((a,b)=>a.scheduledAt.localeCompare(b.scheduledAt)||a.generationKey.localeCompare(b.generationKey));
  return { run, engine, ledger, subscriptions, instances, days, consequenceState, newOperations, cancellations, revision: state.revision, newEntries, newInstances, resolutions, plannedDays, closedDays, rejected,
    caughtUp, processedThrough: run.lastSettledOn!, targetDay, remainingDaysEstimate: Math.max(0, daysBetween(run.lastSettledOn!, targetDay)) };
}
