import { lifeProfileConfig } from '../../../content/simulator/life-profile-config';
import type { LifeProfile } from '../life-profile';
import 'server-only';
import { subscriptionSchema, settleSubscriptions } from '../subscriptions';
import { z } from 'zod';
import { simulatorConfig } from '../../../content/simulator/config';
import { simulatorResponseSchema, type SimulatorResponse } from '../api-types';
import { monthKey } from '../calendar';
import type { SimulatorClock } from '../clock';
import { SimulatorError } from '../errors';
import { formatLei } from '../money';
import { settle } from '../settle';
import { buildStartPlan } from '../dashboard';
import { deriveRunState } from '../state';
import { jsonSchema, ledgerEntrySchema, persistedEffectSchema, persistedFlagSchema, runSchema, type Housing, type LedgerEntry, type SimulatorRun } from '../types';
import { simulatorDatabase } from './database';
import { engineSchema, eventDaySchema, instanceSchema } from '../events/types';
import { stateEffectSchema, stateOperationSchema, type ConsequenceState } from '../consequences/types';
import { buildSimulatorStateAt, effectActiveAt } from '../consequences/state';
import { monthlyReviewSchema } from '../monthly-review';
import { goalView } from '../savings-goal';

const record = z.record(z.string(), z.unknown());
const databaseReadSchema = z.object({ run: record, ledger: z.array(record), effects: z.array(record), flags: z.array(record), goal: record.nullable().default(null), monthlyReviews: z.array(record).default([]), subscriptions: z.array(record).default([]), stateOperations: z.array(record).default([]), eventDays: z.array(record).default([]), eventInstances: z.array(record).default([]) });
type DatabaseClient = ReturnType<typeof simulatorDatabase>;
function dbFailure(): never { throw new SimulatorError('SIMULATOR_UNAVAILABLE', 503); }
export async function loadRun(userId: string, db: DatabaseClient = simulatorDatabase()) {
  const { data, error } = await db.rpc('read_simulator_state', { p_user: userId });
  if (error) dbFailure();
  if (data === null) return null;
  try {
    const rows = databaseReadSchema.parse(data);
    const iso = (value: unknown) => typeof value === 'string' ? new Date(value).toISOString() : value;
    const r = rows.run;
    const run = runSchema.parse({ id: r.id, userId: r.user_id, startedOn: r.started_on, startAge: r.start_age, monthlyIncomeBani: r.monthly_income_bani, housing: r.housing, status: r.status, rulesVersion: r.rules_version, rngVersion: r.rng_version, configSnapshot: r.config_snapshot, lastSettledOn: r.last_settled_on });
    if (run.userId !== userId) throw new Error('Owner mismatch');
    const owned = (row: Record<string, unknown>) => { if (row.user_id !== userId || row.run_id !== run.id) throw new Error('Owner mismatch'); };
    const ledger = rows.ledger.map(l => { owned(l); return ledgerEntrySchema.parse({ day: l.day, sequence: l.sequence, kind: l.kind, category: l.category, amountBani: l.amount_bani, label: l.label, refKey: l.ref_key, autoResolved: l.auto_resolved }); });
    const effects = rows.effects.map(e => { owned(e); return persistedEffectSchema.parse({ effectKey: e.effect_key, type: e.effect_type, startsOn: e.starts_on, endsOn: e.ends_on, value: e.value, metadata: e.metadata ?? undefined, sourceRef: e.source_ref }); });
    const flags = rows.flags.map(f => { owned(f); return persistedFlagSchema.parse({ key: f.flag_key, value: f.value, setOn: f.set_on, sourceRef: f.source_ref }); });
    const consequenceState: ConsequenceState = {
      effects: rows.effects.filter(e => e.state_snapshot != null).map(e => { owned(e); return stateEffectSchema.parse({ ...record.parse(e.state_snapshot), endedAt: iso(e.ended_at) }); }),
      operations: rows.stateOperations.map(o => { owned(o); return stateOperationSchema.parse(o.payload); }),
    };
    const operationByKey = new Map(consequenceState.operations.map(o => [o.idempotencyKey, o]));
    consequenceState.flagProjection = {
      through: consequenceState.operations.map(o => o.effectiveAt).sort().at(-1) ?? '0001-01-01T00:00:00.000Z',
      operations: rows.flags.flatMap(f => { const operation = operationByKey.get(String(f.source_ref)) ?? operationByKey.get(`baseline:${String(f.flag_key)}`); return operation ? [operation] : []; }),
    };
    const engine = r.schedule_profile == null ? null : engineSchema.parse({ scheduleProfile: r.schedule_profile, startedAt: iso(r.event_engine_started_at), catalogVersion: r.event_catalog_version, policyVersion: r.event_policy_version, policySnapshot: r.event_policy_snapshot, lastClosedDay: r.event_last_closed_day, processedAt: iso(r.event_processed_at) });
    const days = rows.eventDays.map(d => { owned(d); return eventDaySchema.parse({ day: d.day, catalogVersion: d.catalog_version, policyVersion: d.policy_version, plannedAt: iso(d.planned_at), closedAt: iso(d.closed_at), eventCount: d.event_count }); });
    const instances = rows.eventInstances.map(e => { owned(e); return instanceSchema.parse({ id: e.id, runId: e.run_id, userId: e.user_id, day: e.day, definitionId: e.definition_id, definitionVersion: e.definition_version, familyId: e.family_id, variationId: e.variation_id, scheduledAt: iso(e.scheduled_at), expiresAt: iso(e.expires_at), snapshotVersion: e.snapshot_version, snapshot: e.snapshot, ...(e.result_balance_bani != null ? {balanceAfterChoiceBani:e.result_balance_bani}:{}), status: e.status, resolutionMode: e.resolution_mode, selectedOptionId: e.selected_option_id, selectedCostBani: e.selected_cost_bani, feedbackSnapshot: e.feedback_snapshot, resolvedAt: iso(e.resolved_at), activityStartAt: iso(e.activity_start_at), activityEndAt: iso(e.activity_end_at), generationKey: e.generation_key, cancelReason: e.cancel_reason, createdAt: iso(e.created_at), ...(e.resolution_effective_at != null ? { resolutionEffectiveAt: iso(e.resolution_effective_at) } : {}), ...(e.cancelled_at != null ? { cancelledAt: iso(e.cancelled_at) } : {}) }); });
    const subscriptions = rows.subscriptions.map(s => { owned(s); return subscriptionSchema.parse({ id:s.id, runId:s.run_id, userId:s.user_id, name:s.name, amountBani:s.amount_bani, intervalMonths:s.interval_months, anchorDayOfMonth:s.anchor_day_of_month, nextDueOn:s.next_due_on, endsOn:s.ends_on, status:s.status, revision:s.revision, createdAt:iso(s.created_at), updatedAt:iso(s.updated_at), cancelledAt:iso(s.cancelled_at) }); });
    const monthlyReviews = rows.monthlyReviews.map(m=>{owned(m);return monthlyReviewSchema.parse({id:m.id,snapshot:m.snapshot,finalizedAt:iso(m.finalized_at),reviewedAt:iso(m.reviewed_at)});});
    if (rows.goal) owned(rows.goal);
    const goal = rows.goal ? goalView(z.object({ id:z.uuid(),name:z.string(),target_amount_bani:z.number().int(),status:z.string() }).parse(rows.goal), ledger) : null;
    return { run, ledger, goal, effects, flags, subscriptions, consequenceState, engine, days, instances, monthlyReviews, revision: z.number().int().nonnegative().parse(r.event_revision ?? 0) };
  } catch { throw new SimulatorError('INVALID_SIMULATOR_CONFIG', 503); }
}
function entryPayload(run: SimulatorRun, entries: readonly LedgerEntry[]) {
  return jsonSchema.parse(entries.map(entry => ({ ...entry, runId: run.id, userId: run.userId })));
}
export async function simulatorState(userId: string, clock: SimulatorClock, db: DatabaseClient = simulatorDatabase()): Promise<SimulatorResponse> {
  // One initial attempt and one refetch/recompute after a competing settlement.
  for (let attempt = 0; attempt < 2; attempt++) {
    let loaded = await loadRun(userId, db);
    if (!loaded) return { ...clock, run: null, state: null };
    if (loaded.engine) {
      const { syncSimulatorThrough } = await import('./events');
      const synced = await syncSimulatorThrough(userId, clock, db);
      if (!synced) throw new SimulatorError('SIMULATOR_CONFLICT', 409);
      loaded = synced;
      const state = deriveRunState(loaded.run, loaded.ledger, loaded.effects, loaded.flags, loaded.run.lastSettledOn!);
      const { effectiveNow } = await import('./events');
      const at = effectiveNow(clock).toISOString(), selected = buildSimulatorStateAt(loaded.consequenceState, at);
      state.flags = Object.fromEntries([...selected.activeFlags.keys()].map(k => [k, true]));
      const richKeys = new Set(loaded.consequenceState.effects.map(e => e.effectKey));
      const activeKeys = new Set(loaded.consequenceState.effects.filter(e => effectActiveAt(e, at)).map(e => e.effectKey));
      state.activeEffects = state.activeEffects.filter(e => !richKeys.has(e.effectKey) || activeKeys.has(e.effectKey));
      return simulatorResponseSchema.parse({ ...clock, run: loaded.run, state: { ...state, runId: loaded.run.id, balanceFormatted: formatLei(state.balanceBani), ledgerThisMonth: loaded.ledger.filter(e => monthKey(e.day) === monthKey(clock.effectiveDay)) } });
    }
    const result = settle(loaded.run, loaded.ledger, clock.effectiveDay);
    const previousSubscriptions = loaded.subscriptions;
    const recurring = settleSubscriptions(loaded.subscriptions, [...loaded.ledger, ...result.newEntries], clock.effectiveDay);
    result.newEntries.push(...recurring.entries);
    if (result.settledThrough === null) throw new SimulatorError('SIMULATOR_CLOCK_REVERSED', 409);
    if (loaded.run.lastSettledOn !== result.settledThrough || result.newEntries.length) {
      const { data, error } = await db.rpc('apply_simulator_settlement', { p_user: userId, p_run: loaded.run.id, p_expected: loaded.run.lastSettledOn, p_through: result.settledThrough, p_entries: entryPayload(loaded.run, result.newEntries), ...(recurring.entries.length ? { p_subscriptions: jsonSchema.parse(recurring.subscriptions.filter(s => s.revision !== previousSubscriptions.find(old => old.id === s.id)?.revision)), p_revision: loaded.revision } : {}) });
      if (error) dbFailure();
      const response = z.object({ status: z.enum(['applied', 'conflict']) }).safeParse(data);
      if (!response.success) dbFailure();
      if (response.data.status === 'conflict') continue;
      loaded = await loadRun(userId, db);
      if (!loaded) throw new SimulatorError('SIMULATOR_CONFLICT', 409);
    }
    // A different tab may have moved the logical dev clock further ahead.
    const { finalizeClosedMonths } = await import('./monthly-review');
    await finalizeClosedMonths(userId, loaded, clock, db);
    if (loaded.run.lastSettledOn && loaded.run.lastSettledOn > clock.effectiveDay) throw new SimulatorError('SIMULATOR_CLOCK_REVERSED', 409);
    const state = deriveRunState(loaded.run, loaded.ledger, loaded.effects, loaded.flags, clock.effectiveDay);
    return simulatorResponseSchema.parse({ ...clock, run: loaded.run, state: { ...state, runId: loaded.run.id, balanceFormatted: formatLei(state.balanceBani), ledgerThisMonth: loaded.ledger.filter(e => monthKey(e.day) === monthKey(clock.effectiveDay)).sort((a, b) => a.day.localeCompare(b.day) || a.sequence - b.sequence || a.refKey.localeCompare(b.refKey)) } });
  }
  throw new SimulatorError('SIMULATOR_CONFLICT', 409);
}
export async function startRun(userId: string, housing: Housing, clock: SimulatorClock, db: DatabaseClient = simulatorDatabase(), lifeProfile?: LifeProfile): Promise<SimulatorResponse> {
  if (await loadRun(userId, db)) return { ...await simulatorState(userId, clock, db), created: false };
  // Plain validated JSON snapshot is immutable for this run; no live-config replay.
  const { run, settlement: initial } = buildStartPlan(crypto.randomUUID(), userId, housing, clock.effectiveDay, lifeProfile ? lifeProfileConfig(lifeProfile) : simulatorConfig);
  const { data, error } = await db.rpc('start_simulator_run', { p_user: userId, p_run: jsonSchema.parse(run), p_entries: entryPayload(run, initial.newEntries) });
  if (error) dbFailure();
  const response = z.object({ runId: z.uuid(), created: z.boolean() }).safeParse(data);
  if (!response.success) dbFailure();
  const current = await simulatorState(userId, clock, db);
  if (current.run?.id !== response.data.runId) throw new SimulatorError('SIMULATOR_CONFLICT', 409);
  return { ...current, created: response.data.created };
}
export async function resetDevRun(userId: string, db: DatabaseClient = simulatorDatabase()) {
  if (process.env.NODE_ENV !== 'development') throw new SimulatorError('INVALID_SIMULATOR_INPUT', 404);
  // Ownership filter is mandatory. Cascades remove only this account's simulator data.
  const { error } = await db.from('sim_runs').delete().eq('user_id', userId);
  if (error) dbFailure();
}
