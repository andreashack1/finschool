import { z } from 'zod';
import { dayKeySchema, daysInMonth, formatDayKey, parseDayKey, type DayKey } from './calendar';
import { bani, costBaniSchema } from './money';
import type { LedgerEntry } from './types';

export const intervalMonthsSchema = z.union([z.literal(1), z.literal(3), z.literal(6), z.literal(12)]);
export const subscriptionSchema = z.object({
  id: z.uuid(), runId: z.uuid(), userId: z.uuid(), name: z.string().trim().min(1).max(60).regex(/^[^<>\p{Cc}\p{Cf}]+$/u).regex(/[^\s\p{C}]/u),
  amountBani: costBaniSchema.refine(n => n > 0), intervalMonths: intervalMonthsSchema,
  anchorDayOfMonth: z.number().int().min(1).max(31), nextDueOn: dayKeySchema,
  endsOn: dayKeySchema.nullable(), status: z.enum(['active', 'cancelled']), revision: z.number().int().min(1),
  createdAt: z.iso.datetime(), updatedAt: z.iso.datetime(), cancelledAt: z.iso.datetime().nullable(),
});
export type SimulatorSubscription = z.infer<typeof subscriptionSchema>;
/** Parse decimal text using integer digit arithmetic, never float currency. */
export const amountInputSchema = z.string().trim().regex(/^\d+(?:[.,]\d{1,2})?$/).transform(value => {
  const [whole, fraction = ''] = value.replace(',', '.').split('.');
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
}).pipe(costBaniSchema.refine(n => n > 0));
const fields = { name: subscriptionSchema.shape.name, amount: amountInputSchema, intervalMonths: intervalMonthsSchema,
  nextDueOn: dayKeySchema, endsOn: dayKeySchema.nullable().optional(), operationId: z.uuid() };
export const createSubscriptionSchema = z.strictObject(fields).refine(v => !v.endsOn || v.endsOn >= v.nextDueOn, 'Data de final precede plata');
export const editSubscriptionSchema = z.strictObject({ ...fields, id: z.uuid(), revision: z.number().int().min(1) }).refine(v => !v.endsOn || v.endsOn >= v.nextDueOn, 'Data de final precede plata');
export const cancelSubscriptionSchema = z.strictObject({ id: z.uuid(), revision: z.number().int().min(1), operationId: z.uuid() });
/** Calendar-month recurrence preserves the original anchor after every clamp. */
export function nextSubscriptionDate(date: DayKey, intervalMonths: number, anchor: number): DayKey {
  intervalMonthsSchema.parse(intervalMonths);
  subscriptionSchema.shape.anchorDayOfMonth.parse(anchor);
  const p = parseDayKey(date), index = p.year * 12 + p.month - 1 + intervalMonths;
  const year = Math.floor(index / 12), month = index % 12 + 1;
  return formatDayKey(year, month, Math.min(anchor, daysInMonth(year, month)));
}
export function subscriptionDates(s: SimulatorSubscription, from: DayKey, through: DayKey): DayKey[] {
  if (s.status !== 'active') return [];
  const dates: DayKey[] = [];
  for (let date = s.nextDueOn; date <= through && (!s.endsOn || date <= s.endsOn); date = nextSubscriptionDate(date, s.intervalMonths, s.anchorDayOfMonth)) {
    if (date >= from) dates.push(date);
  }
  return dates;
}
export function subscriptionRef(s: SimulatorSubscription, day: DayKey) { return `${s.runId}:${day}:subscription:${s.id}`; }
export const subscriptionOrder = (a: SimulatorSubscription, b: SimulatorSubscription) => a.id.localeCompare(b.id);
/** Called inside the canonical chronological day loop; returned cursor commits with ledger. */
export function settleSubscriptions(subscriptions: readonly SimulatorSubscription[], ledger: readonly LedgerEntry[], through: DayKey) {
  const keys = new Set(ledger.map(e => e.refKey)), entries: LedgerEntry[] = [];
  const updated = [...subscriptions].sort(subscriptionOrder).map(s => {
    const dates = subscriptionDates(s, s.nextDueOn, through);
    for (const day of dates) if (!keys.has(subscriptionRef(s, day))) {
      const entry: LedgerEntry = { day, sequence: 999, kind: 'abonament', category: 'abonamente', amountBani: bani(-s.amountBani),
        label: `Abonament · ${s.name}`, refKey: subscriptionRef(s, day), autoResolved: false };
      entries.push(entry); keys.add(entry.refKey);
    }
    return dates.length ? { ...s, nextDueOn: nextSubscriptionDate(dates.at(-1)!, s.intervalMonths, s.anchorDayOfMonth), revision: s.revision + 1 } : s;
  });
  return { subscriptions: updated, entries };
}
