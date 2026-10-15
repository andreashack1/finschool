import { bani, type MoneyBani } from '../money';
import { arrayChoice } from '../rng';
import { ledgerEntrySchema, ledgerSequence, type LedgerEntry } from '../types';
import { eventRng } from './planner';
import { intervalFits } from './time';
import { instanceSchema, publicEventSchema, type EventEngine, type EventInstance, type PublicEvent } from './types';
import { applyConsequences, buildSimulatorStateAt, emptyConsequenceState, stateRuleReason } from '../consequences/state';
import type { ConsequenceState } from '../consequences/types';

export function optionAvailability(instance: EventInstance, balance: MoneyBani, instances: readonly EventInstance[], engine: EventEngine, caughtUp = true, state: ConsequenceState = emptyConsequenceState(), at = instance.scheduledAt): PublicEvent['options'] {
  const current = buildSimulatorStateAt(state, at);
  return instance.snapshot.options.map(option => {
    const start = new Date(instance.scheduledAt).getTime(), end = start + option.durationMinutes * 60000;
    const overlap = option.durationMinutes > 0 && instances.some(e => e.id !== instance.id && e.status === 'resolved' && e.activityStartAt && e.activityEndAt && start < new Date(e.activityEndAt).getTime() && end > new Date(e.activityStartAt).getTime());
    const reason = !caughtUp ? 'catching_up' : instance.status === 'cancelled' || stateRuleReason(option.state, current) ? 'state_changed' : !intervalFits(instance.day, instance.scheduledAt, option.durationMinutes, engine.scheduleProfile, engine.policySnapshot) ? 'schedule_conflict' : overlap ? 'activity_overlap' : option.costBani > Math.max(balance, 0) ? 'insufficient_funds' : null;
    return { id: option.id, label: option.label, costBani: option.costBani, durationMinutes: option.durationMinutes, unavailableReason: reason };
  });
}
export function publicEvent(instance: EventInstance, balance: MoneyBani, instances: readonly EventInstance[], engine: EventEngine, caughtUp = true, state: ConsequenceState = emptyConsequenceState(), at = instance.scheduledAt): PublicEvent {
  return publicEventSchema.parse({ id: instance.id, title: instance.snapshot.presentation?.title ?? instance.snapshot.title, description: instance.snapshot.presentation?.context ?? instance.snapshot.description,
    ...(instance.snapshot.presentation ? {presentation:instance.snapshot.presentation}:{}),
    category: instance.snapshot.category, scheduledAt: instance.scheduledAt, expiresAt: instance.expiresAt, status: instance.status,
    resolutionMode: instance.resolutionMode, selectedOptionId: instance.selectedOptionId, selectedCostBani: instance.selectedCostBani,
    balanceAfterChoiceBani:instance.balanceAfterChoiceBani??null, feedback: instance.feedbackSnapshot, options: optionAvailability(instance, balance, instances, engine, caughtUp, state, at) });
}
export function cancelIrrelevantEvent(instance: EventInstance, state: ConsequenceState, at: string): EventInstance | null {
  if (instance.status !== 'pending' || instance.scheduledAt > at) return null;
  if(instance.generationKey.startsWith('v2:p3:')&&instance.snapshot.relevance?.length){
    // First canonical invalidation, not the time a worker happens to observe it.
    // A later restoration must not resurrect an opportunity already cancelled.
    const boundaries=[instance.scheduledAt,...state.operations.map(o=>o.effectiveAt),...state.effects.flatMap(e=>[e.startsAt,e.expiresAt,...(e.endedAt?[e.endedAt]:[])])];
    for(const boundary of [...new Set(boundaries)].filter(b=>b>=instance.scheduledAt&&b<=at).sort()){
      const view=buildSimulatorStateAt(state,boundary),reason=instance.snapshot.relevance.map(r=>stateRuleReason(r,view)).find(Boolean);
      if(reason)return {...instance,status:'cancelled',cancelReason:reason,cancelledAt:boundary};
    }
    return null;
  }
  const current = buildSimulatorStateAt(state, at);
  const reason = instance.snapshot.relevance?.map(r => stateRuleReason(r, current)).find(Boolean);
  return reason ? { ...instance, status: 'cancelled', cancelReason: reason, cancelledAt: at } : null;
}
export function resolveEvent(instance: EventInstance, optionId: string, mode: 'manual' | 'automatic', now: string, balance: MoneyBani, instances: readonly EventInstance[], engine: EventEngine, sequence: number, state: ConsequenceState = emptyConsequenceState(), recordedAt = now) {
  instance = instanceSchema.parse(instance);
  if (instance.status !== 'pending') throw new Error('Already resolved');
  const effectiveAt = mode === 'automatic' ? instance.expiresAt : now;
  if (cancelIrrelevantEvent(instance, state, effectiveAt)) throw new Error('Event irrelevant');
  const availability = optionAvailability(instance, balance, instances, engine, true, state, effectiveAt).find(o => o.id === optionId);
  const option = instance.snapshot.options.find(o => o.id === optionId);
  if (!availability || !option || availability.unavailableReason) throw new Error('Option unavailable');
  const resolved: EventInstance = { ...instance, status: 'resolved', resolutionMode: mode, selectedOptionId: option.id,
    balanceAfterChoiceBani:bani(balance-option.costBani),
    selectedCostBani: option.costBani, feedbackSnapshot: option.feedback, resolvedAt: recordedAt, resolutionEffectiveAt: effectiveAt,
    activityStartAt: option.durationMinutes ? instance.scheduledAt : null,
    activityEndAt: option.durationMinutes ? new Date(new Date(instance.scheduledAt).getTime() + option.durationMinutes * 60000).toISOString() : null };
  const entry: LedgerEntry | null = option.costBani === 0 ? null : ledgerEntrySchema.parse({ day: instance.day,
    sequence: (mode === 'automatic' ? ledgerSequence.missed : ledgerSequence.events) + sequence,
    kind: mode === 'automatic' ? 'decizie_automata' : 'eveniment', category: instance.snapshot.category,
    amountBani: bani(-option.costBani), label: instance.snapshot.title, refKey: `${instance.runId}:event:${instance.id}:cost`, autoResolved: mode === 'automatic' });
  const consequenceResult = applyConsequences({ state, instanceId: instance.id, optionId: option.id, consequences: option.consequences ?? [], effectiveAt, recordedAt });
  return { instance: resolved, entry, consequenceState: consequenceResult.state, operations: consequenceResult.operations };
}
export function automaticOption(instance: EventInstance, balance: MoneyBani, instances: readonly EventInstance[], engine: EventEngine, rngVersion: 1, state: ConsequenceState = emptyConsequenceState()) {
  const eligible = optionAvailability(instance, balance, instances, engine, true, state, instance.expiresAt).filter(o => !o.unavailableReason).sort((a, b) => a.id.localeCompare(b.id));
  return arrayChoice(eventRng(instance.runId, rngVersion, instance.day, 'auto_resolve', instance.generationKey), eligible).id;
}
