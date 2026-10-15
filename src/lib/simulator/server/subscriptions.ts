import 'server-only';
import { z } from 'zod';
import { dayOfMonth, monthKey } from '../calendar';
import type { SimulatorClock } from '../clock';
import { buildFinancialCalendar, monthInputSchema, subscriptionView } from '../financial-calendar';
import { createSubscriptionSchema, editSubscriptionSchema, cancelSubscriptionSchema, subscriptionSchema, settleSubscriptions } from '../subscriptions';
import { jsonSchema } from '../types';
import { SimulatorError } from '../errors';
import { simulatorDatabase } from './database';
import { loadRun, simulatorState } from './service';
import { effectiveNow } from './events';
import { assertMonthlyReviewComplete } from './monthly-review';

export async function financialCalendar(userId: string, clock: SimulatorClock, selectedMonth?: string) {
  // Viewing any month never runs settlement and cannot write future transactions.
  const month = monthInputSchema.parse(selectedMonth ?? monthKey(clock.effectiveDay));
  const loaded = await loadRun(userId);
  if (!loaded || month < monthKey(loaded.run.startedOn)) throw new SimulatorError('INVALID_SIMULATOR_INPUT');
  return buildFinancialCalendar(loaded.run, loaded.ledger, loaded.subscriptions, clock.effectiveDay, month);
}
export async function mutateSubscription(userId: string, clock: SimulatorClock, action: 'create' | 'edit' | 'cancel', raw: unknown) {
  const input = action === 'create' ? createSubscriptionSchema.parse(raw) : action === 'edit' ? editSubscriptionSchema.parse(raw) : cancelSubscriptionSchema.parse(raw);
  for (let attempt = 0; attempt < 4; attempt++) {
    await simulatorState(userId, clock);
    const loaded = await loadRun(userId);
    if (!loaded) throw new SimulatorError('SIMULATOR_CONFLICT', 409);
    assertMonthlyReviewComplete(loaded,clock);
    if (loaded.run.lastSettledOn !== clock.effectiveDay) throw new SimulatorError('SIMULATOR_CONFLICT', 409);
    const now = effectiveNow(clock).toISOString();
    const existing = 'id' in input ? loaded.subscriptions.find(s => s.id === input.id) : undefined;
    if (action !== 'create' && !existing) throw new SimulatorError('INVALID_SIMULATOR_INPUT', 404);
    // Retry identity is checked in the locked RPC before stale revision/date checks.
    const subscription = 'name' in input ? subscriptionSchema.parse({
      id: existing?.id ?? crypto.randomUUID(), runId: loaded.run.id, userId, name: input.name, amountBani: input.amount,
      intervalMonths: input.intervalMonths, anchorDayOfMonth: dayOfMonth(input.nextDueOn), nextDueOn: input.nextDueOn,
      endsOn: input.endsOn ?? null, status: 'active', revision: existing ? ('revision' in input ? z.number().int().parse(input.revision) + 1 : 1) : 1,
      createdAt: existing?.createdAt ?? now, updatedAt: now, cancelledAt: null,
    }) : { ...existing!, status: 'cancelled' as const, revision: cancelSubscriptionSchema.parse(input).revision + 1, updatedAt: now, cancelledAt: now };
    const recurring = action !== 'cancel' && subscription.nextDueOn === clock.effectiveDay ? settleSubscriptions([subscription], loaded.ledger, clock.effectiveDay) : { entries: [], subscriptions: [subscription] };
    const final = recurring.subscriptions[0];
    // SQL validates input revision separately; payment cursor advancement uses the same transaction.
    const payload = { ...final, expectedRevision: existing ? ('revision' in input ? input.revision : null) : null, requestedDueOn: 'nextDueOn' in input ? input.nextDueOn : null };
    const result = await simulatorDatabase().rpc('mutate_simulator_subscription', { p_user: userId, p_run: loaded.run.id, p_expected: loaded.revision,
      p_day: clock.effectiveDay, p_now: now, p_development: process.env.NODE_ENV === 'development', p_action: action, p_operation: input.operationId,
      p_subscription: jsonSchema.parse(payload), p_entries: jsonSchema.parse(recurring.entries) });
    if (result.error) throw new SimulatorError('SIMULATOR_UNAVAILABLE', 503);
    const response = z.object({ status: z.enum(['applied', 'retry', 'conflict', 'stale', 'invalid','required']) }).parse(result.data);
    if(response.status==='required')throw new SimulatorError('MONTHLY_REVIEW_REQUIRED',409);
    if (response.status === 'conflict') continue;
    if (response.status === 'stale') { const authoritative = await loadRun(userId); return { conflict: true, subscription: authoritative?.subscriptions.find(s => s.id === existing?.id) ? subscriptionView(authoritative.subscriptions.find(s => s.id === existing?.id)!) : null }; }
    if (response.status === 'invalid') throw new SimulatorError('INVALID_SIMULATOR_INPUT');
    const authoritative = await loadRun(userId);
    return { conflict: false, subscriptions: authoritative!.subscriptions.map(subscriptionView) };
  }
  throw new SimulatorError('SIMULATOR_CONFLICT', 409);
}
