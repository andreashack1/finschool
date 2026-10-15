import { incomeLabel, isSupportEntry } from '../../content/simulator/life-profile-config';
import { z } from 'zod';
import { addDays, dayKeySchema, endOfMonth, monthKey, parseDayKey, type DayKey } from './calendar';
import { fixedExpenses, nextScheduledDay } from './dashboard';
import { bani, moneyBaniSchema } from './money';
import { subscriptionDates, type SimulatorSubscription } from './subscriptions';
import type { LedgerEntry, SimulatorRun } from './types';

export const monthInputSchema = z.string().regex(/^(?!0000)\d{4}-(0[1-9]|1[0-2])$/);
export const subscriptionViewSchema = z.object({ id: z.uuid(), name: z.string(), amountBani: moneyBaniSchema,
  intervalMonths: z.number(), nextDueOn: dayKeySchema, endsOn: dayKeySchema.nullable(), revision: z.number(), status: z.enum(['active', 'cancelled']) });
export const calendarItemSchema = z.object({ day: dayKeySchema, title: z.string(), amountBani: moneyBaniSchema,
  sourceType: z.enum(['salary', 'support', 'fixed_expense', 'subscription']), sourceId: z.string().optional(), status: z.enum(['received', 'paid', 'upcoming']), order: z.number() });
export const financialCalendarSchema = z.object({ month: monthInputSchema, currentDay: dayKeySchema, firstMonth: monthInputSchema,
  days: z.array(z.object({ day: dayKeySchema, weekday: z.number(), items: z.array(calendarItemSchema) })), subscriptions: z.array(subscriptionViewSchema) });
export type FinancialCalendar = z.infer<typeof financialCalendarSchema>;
export function subscriptionView(s: SimulatorSubscription) {
  return subscriptionViewSchema.parse(s);
}
/** Read-only selector: historical money comes only from the ledger. No event source. */
export function buildFinancialCalendar(run: SimulatorRun, ledger: readonly LedgerEntry[], subscriptions: readonly SimulatorSubscription[], today: DayKey, month: string): FinancialCalendar {
  monthInputSchema.parse(month);
  if (month < monthKey(run.startedOn)) throw new RangeError('Luna precede run-ul');
  const first = dayKeySchema.parse(`${month}-01`), last = endOfMonth(first);
  const items: z.infer<typeof calendarItemSchema>[] = ledger.filter(e => monthKey(e.day) === month && (['salariu', 'cheltuiala_fixa', 'abonament'].includes(e.kind) || isSupportEntry(e) || e.refKey.endsWith(':salary:monthly'))).map(e => ({
    day: e.day, title: e.kind === 'salariu' ? 'Salariu' : e.kind === 'abonament' ? e.label.replace(/^Abonament · /, '') : e.label,
    amountBani: e.amountBani, sourceType: e.kind === 'salariu' ? 'salary' : isSupportEntry(e) || e.refKey.endsWith(':salary:monthly') ? 'support' : e.kind === 'abonament' ? 'subscription' : 'fixed_expense',
    status: e.amountBani > 0 ? 'received' : 'paid', order: e.sequence,
  }));
  const start = first > today ? first : today < last ? addDays(today, 1) : null;
  if (start) {
    const scheduled = [{ title: incomeLabel(run), amountBani: run.monthlyIncomeBani, dueDay: run.configSnapshot.payday, sourceType: run.configSnapshot.lifeProfile?.activityStatus === 'liceu' ? 'support' as const : 'salary' as const, order: 200 },
      ...(run.configSnapshot.recurringInflows ?? []).map(e => ({title:e.label, amountBani:e.amountBani, dueDay:e.dueDay, sourceType:'support' as const, order:e.order})),
      ...fixedExpenses(run).map(e => ({ sourceId: e.id, title: e.label, amountBani: bani(-e.amountBani), dueDay: e.dueDay, sourceType: 'fixed_expense' as const, order: 300 + e.order }))];
    for (const s of scheduled) { const day = nextScheduledDay(start, s.dueDay, true); if (day <= last) items.push({ ...s, day, status: 'upcoming' }); }
    for (const s of [...subscriptions].sort((a, b) => a.id.localeCompare(b.id))) for (const day of subscriptionDates(s, start, last)) items.push({ sourceId: s.id, day, title: s.name, amountBani: bani(-s.amountBani), sourceType: 'subscription', status: 'upcoming', order: 999 });
  }
  const days: FinancialCalendar['days'] = [];
  for (let day = first; day <= last; day = addDays(day, 1)) {
    const p = parseDayKey(day), utc = new Date(0); utc.setUTCFullYear(p.year, p.month - 1, p.day);
    days.push({ day, weekday: (utc.getUTCDay() + 6) % 7, items: items.filter(e => e.day === day).sort((a, b) => a.order - b.order) });
    if (day === last) break;
  }
  return financialCalendarSchema.parse({ month, currentDay: today, firstMonth: monthKey(run.startedOn), days, subscriptions: subscriptions.map(subscriptionView) });
}
