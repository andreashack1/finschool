import { addDays, dayKey, daysBetween } from '../calendar';
import { localInstant } from '../events/time';
import { consequencesSchema, stateEffectSchema, stateOperationSchema, type ConsequenceDescriptor, type ConsequenceState, type CurrentStateItem, type StateEffect, type StateOperation, type StateRules } from './types';

export const emptyConsequenceState = (): ConsequenceState => ({ operations: [], effects: [] });
export const operationOrder = (a: StateOperation, b: StateOperation) => a.effectiveAt.localeCompare(b.effectiveAt) || a.sequence - b.sequence || a.idempotencyKey.localeCompare(b.idempotencyKey);
export const effectActiveAt = (e: StateEffect, at: string) => e.startsAt <= at && at < e.expiresAt && (e.endedAt === null || at < e.endedAt);
export function buildSimulatorStateAt(state: ConsequenceState, at: string) {
  const flags = new Map<string, StateOperation>();
  const flagSource = state.flagProjection && state.flagProjection.through <= at ? state.flagProjection.operations : state.operations;
  for (const operation of [...flagSource].filter(o => o.effectiveAt <= at).sort(operationOrder)) {
    if (operation.descriptor.type === 'set_flag') flags.set(operation.descriptor.key, operation);
    if (operation.descriptor.type === 'clear_flag') flags.delete(operation.descriptor.key);
  }
  const activeFlags = new Map([...flags].filter(([, o]) => o.descriptor.type === 'set_flag' && o.descriptor.value));
  const activeEffects = state.effects.filter(e => effectActiveAt(e, at));
  return { activeFlags, activeEffects, effectFamilies: new Set(activeEffects.map(e => e.familyKey)) };
}
export function stateRuleReason(rules: StateRules | undefined, state: ReturnType<typeof buildSimulatorStateAt>): string | null {
  if (!rules) return null;
  if (rules.requiredFlags?.some(k => !state.activeFlags.has(k))) return 'required_flag';
  if (rules.excludedFlags?.some(k => state.activeFlags.has(k))) return 'excluded_flag';
  if (rules.requiredEffects?.some(k => !state.effectFamilies.has(k))) return 'required_effect';
  if (rules.excludedEffects?.some(k => state.effectFamilies.has(k))) return 'excluded_effect';
  return null;
}
const compatible = (a: StateEffect, b: Extract<ConsequenceDescriptor, { type: 'add_effect' }>) =>
  a.effectType === b.effectType && JSON.stringify(Object.entries(a.value).sort()) === JSON.stringify(Object.entries(b.value).sort());
/** Calendar-day coverage, never elapsed multiples of 24 hours. Each extension
 * creates its own semantic row; it cannot rewrite yesterday's expiry/history. */
export function applyConsequences(input: { state: ConsequenceState; instanceId: string; optionId: string; consequences: readonly ConsequenceDescriptor[]; effectiveAt: string; recordedAt: string }) {
  const descriptors = consequencesSchema.parse(input.consequences);
  const state = structuredClone(input.state), operations: StateOperation[] = [];
  let sequence = Math.max(-1, ...state.operations.map(o => o.sequence)) + 1;
  descriptors.forEach((descriptor, consequenceIndex) => {
    const idempotencyKey = `${input.instanceId}:${input.optionId}:${descriptor.id}`;
    const existing = state.operations.find(o => o.idempotencyKey === idempotencyKey);
    if (existing) {
      if (JSON.stringify(existing.descriptor) !== JSON.stringify(descriptor)) throw new Error('Consequence identity mismatch');
      return;
    }
    let effect: StateEffect | null = null, endedEffectKeys: string[] = [], endsAt: string | null = null, applied = true;
    if (descriptor.type === 'add_effect') {
      const effectiveDay = dayKey(new Date(input.effectiveAt));
      const startsAt = descriptor.startOffsetDays === 0 ? input.effectiveAt : localInstant(addDays(effectiveDay, descriptor.startOffsetDays), 0).toISOString();
      let expiresAt = localInstant(addDays(effectiveDay, descriptor.startOffsetDays + descriptor.durationDays), 0).toISOString();
      const family = state.effects.filter(e => e.familyKey === descriptor.familyKey && e.effectiveAt <= input.effectiveAt && (e.endedAt === null || e.endedAt > startsAt) && e.expiresAt >= startsAt);
      if (family.some(e => e.overlapPolicy !== descriptor.overlapPolicy)) throw new Error('Incompatible family policy');
      if (descriptor.overlapPolicy === 'extend') {
        // Only coverage overlapping or touching this request participates. Gaps remain gaps.
        const overlaps = family.filter(e => e.startsAt <= expiresAt && (e.endedAt ?? e.expiresAt) >= startsAt);
        if (overlaps.some(e => !compatible(e, descriptor))) throw new Error('Incompatible extension payload');
        const last = overlaps.map(e => e.endedAt && e.endedAt < e.expiresAt ? e.endedAt : e.expiresAt).sort().at(-1);
        if (last && last >= startsAt) expiresAt = localInstant(addDays(dayKey(new Date(last)), descriptor.durationDays), 0).toISOString();
      }
      if (descriptor.overlapPolicy === 'replace') {
        endsAt = startsAt;
        endedEffectKeys = family.map(e => e.effectKey);
      }
      effect = stateEffectSchema.parse({ effectKey: `state_${input.instanceId.replaceAll('-', '')}_${descriptor.id.replaceAll('-', '_')}`, effectType: descriptor.effectType,
        familyKey: descriptor.familyKey, startsAt, expiresAt, endedAt: null, value: descriptor.value, presentation: descriptor.presentation,
        overlapPolicy: descriptor.overlapPolicy, sourceInstanceId: input.instanceId, sourceOptionId: input.optionId, consequenceId: descriptor.id,
        effectiveAt: input.effectiveAt, recordedAt: input.recordedAt });
    } else if (descriptor.type === 'remove_effect') {
      endsAt = input.effectiveAt;
      endedEffectKeys = state.effects.filter(e => e.effectiveAt <= input.effectiveAt && ('familyKey' in descriptor.target ? e.familyKey === descriptor.target.familyKey : e.effectKey === descriptor.target.effectKey) && e.expiresAt > endsAt! && (e.endedAt === null || e.endedAt > endsAt!)).map(e => e.effectKey);
      applied = endedEffectKeys.length > 0;
    } else if (descriptor.type === 'clear_flag') applied = buildSimulatorStateAt(state, input.effectiveAt).activeFlags.has(descriptor.key);
    for (const e of state.effects) if (endedEffectKeys.includes(e.effectKey) && endsAt && (e.endedAt === null || endsAt < e.endedAt)) e.endedAt = endsAt;
    if (effect) state.effects.push(effect);
    const operation = stateOperationSchema.parse({ idempotencyKey, sourceInstanceId: input.instanceId, sourceOptionId: input.optionId, consequenceId: descriptor.id,
      consequenceIndex, sequence: sequence++, descriptor, effectiveAt: input.effectiveAt, recordedAt: input.recordedAt, applied, effect, endedEffectKeys, endsAt });
    state.operations.push(operation); operations.push(operation);
  });
  if (state.flagProjection && operations.length) {
    const projected = new Map(state.flagProjection.operations.flatMap(o => o.descriptor.type === 'set_flag' || o.descriptor.type === 'clear_flag' ? [[o.descriptor.key, o] as const] : []));
    for (const o of operations) if (o.descriptor.type === 'set_flag' || o.descriptor.type === 'clear_flag') {
      const previous = projected.get(o.descriptor.key);
      if (!previous || operationOrder(previous, o) <= 0) projected.set(o.descriptor.key, o);
    }
    state.flagProjection = { through: [state.flagProjection.through, ...operations.map(o => o.effectiveAt)].sort().at(-1)!, operations: [...projected.values()] };
  }
  return { state, operations };
}
/** Rebuild projections from the small simulator-only operation log. Legacy
 * rows are an explicit migration baseline, never fabricated event choices. */
export function reconstructEffects(operations: readonly StateOperation[], baseline: readonly StateEffect[] = []): StateEffect[] {
  const effects = structuredClone([...baseline]);
  for (const operation of [...operations].sort(operationOrder)) {
    for (const e of effects) if (operation.endedEffectKeys.includes(e.effectKey) && operation.endsAt && (e.endedAt === null || operation.endsAt < e.endedAt)) e.endedAt = operation.endsAt;
    if (operation.effect) effects.push(structuredClone(operation.effect));
  }
  return effects;
}
export function currentStateItems(state: ConsequenceState, at: string): CurrentStateItem[] {
  const selected = buildSimulatorStateAt(state, at), items: CurrentStateItem[] = [];
  for (const operation of selected.activeFlags.values()) {
    const descriptor = operation.descriptor;
    if (descriptor.type !== 'set_flag' || descriptor.presentation?.visibility !== 'user') continue;
    const { title, description, iconKey, priority } = descriptor.presentation;
    items.push({ id: `flag:${descriptor.key}`, kind: 'flag', title, description, iconKey, priority, startsAt: operation.effectiveAt });
  }
  const grouped = new Map<string, StateEffect[]>();
  for (const effect of selected.activeEffects) {
    if (effect.presentation?.visibility !== 'user') continue;
    const key = effect.overlapPolicy === 'independent' ? effect.effectKey : effect.familyKey;
    grouped.set(key, [...(grouped.get(key) ?? []), effect]);
  }
  for (const [key, effects] of grouped) {
    const representative = [...effects].sort((a, b) => b.effectiveAt.localeCompare(a.effectiveAt) || a.effectKey.localeCompare(b.effectKey))[0];
    const { title, description, iconKey, priority } = representative.presentation!;
    const expiresAt = effects.map(e => e.endedAt && e.endedAt < e.expiresAt ? e.endedAt : e.expiresAt).sort().at(-1)!;
    const endDay = dayKey(new Date(expiresAt));
    const lastDay = expiresAt === localInstant(endDay, 0).toISOString() ? addDays(endDay, -1) : endDay, today = dayKey(new Date(at));
    const remainingDays = Math.max(1, daysBetween(today, lastDay) + 1);
    const validityLabel = lastDay === today ? 'Valabil astăzi.' : lastDay === addDays(today, 1) ? 'Disponibil până mâine.' : `Disponibil până la ${new Intl.DateTimeFormat('ro-RO', { timeZone: 'UTC', day: 'numeric', month: 'long' }).format(new Date(`${lastDay}T12:00:00Z`))} inclusiv.`;
    items.push({ id: `effect:${key}`, kind: 'effect', title, description, iconKey, priority, startsAt: effects.map(e => e.startsAt).sort()[0], expiresAt, remainingDays, validityLabel });
  }
  return items.sort((a, b) => b.priority - a.priority || (a.expiresAt ?? '9999').localeCompare(b.expiresAt ?? '9999') || a.id.localeCompare(b.id));
}
