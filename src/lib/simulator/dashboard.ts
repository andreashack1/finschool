import { incomeLabel, isSupportEntry } from '../../content/simulator/life-profile-config';
import { subscriptionDates, type SimulatorSubscription } from './subscriptions';
import { goalSchema } from './savings-goal';
import { z } from 'zod';
import { dayKeySchema, daysBetween, daysInMonth, formatDayKey, monthKey, nextMonth, parseDayKey, startOfMonth, type DayKey } from './calendar';
import { bani, moneyBaniSchema } from './money';
import { calculateBalance, settle } from './settle';
import { housingSchema, persistedEffectSchema, runSchema, type LedgerEntry, type PersistedEffect, type PersistedFlag, type SimulatorConfig, type SimulatorRun } from './types';
import { deriveRunState } from './state';
import { currentStateItemSchema, type ConsequenceState } from './consequences/types';
import { buildSimulatorStateAt, currentStateItems, effectActiveAt } from './consequences/state';

const movementSchema = z.object({ id: z.string(), sourceType: z.string().min(1), day: dayKeySchema, label: z.string(), amountBani: moneyBaniSchema, type: z.enum(['income', 'expense']), order: z.number() });
export const journalSchema = z.object({ month: z.string(), entries: z.array(z.object({ day: dayKeySchema, sequence: z.number(), label: z.string(), category: z.string(), type: z.string(), amountBani: moneyBaniSchema })), previousMonth: z.string().nullable(), nextMonth: z.string().nullable() });
export const dashboardSchema = z.object({
  incomeLabel: z.string().default('Salariu'),
  goal: goalSchema.nullable().default(null),
  runId: z.string(), serverDay: dayKeySchema, currentDay: dayKeySchema, startedOn: dayKeySchema,
  simulationDay: z.number(), lastSettledOn: dayKeySchema, housing: housingSchema, balanceBani: moneyBaniSchema,
  monthlyIncomeBani: moneyBaniSchema, monthlyIncomeReceived: moneyBaniSchema, monthlyExpensesPaid: moneyBaniSchema, fixedExpensesRemaining: moneyBaniSchema,
  nextPayday: dayKeySchema, daysUntilPayday: z.number(), salaryReceivedToday: z.boolean(),
  fixedExpenses: z.array(z.object({ id: z.string(), label: z.string(), category: z.string(), amountBani: moneyBaniSchema, dueOn: dayKeySchema.nullable(), dueDay: z.number(), status: z.enum(['paid', 'upcoming', 'not_applicable_start_month', 'not_scheduled_this_month']) })),
  nextFinancialMovement: movementSchema.nullable(), upcomingFinancialMovements: z.array(movementSchema),
  monthlyJournal: journalSchema, availableJournalMonths: z.array(z.string()), freshness: z.string(), finiMessage: z.string(),
  activeEffects: z.array(persistedEffectSchema), flags: z.record(z.string(), z.boolean()),
  currentStates: z.array(currentStateItemSchema).default([]),
});
export type SimulatorDashboardState = z.infer<typeof dashboardSchema>;
export type FinancialMovement = z.infer<typeof movementSchema>;
export type Journal = z.infer<typeof journalSchema>;
export const previewSchema = z.object({
  housing: housingSchema, startedOn: dayKeySchema, startingBalanceBani: moneyBaniSchema, monthlyIncomeBani: moneyBaniSchema,
  firstPayday: dayKeySchema, fixedMonthlyTotalBani: moneyBaniSchema, balanceAfterTodayBani: moneyBaniSchema,
  expenses: z.array(z.object({ id: z.string(), label: z.string(), amountBani: moneyBaniSchema, dueDay: z.number() })),
  todayTransactions: journalSchema.shape.entries,
});
export type StartPreview = z.infer<typeof previewSchema>;
export function fixedExpenses(run: SimulatorRun) {
  return [run.configSnapshot.housing[run.housing], ...run.configSnapshot.fixedExpenses].filter(e => e.amountBani > 0).sort((a, b) => a.dueDay - b.dueDay || a.order - b.order);
}
function dueOn(month: DayKey, dueDay: number): DayKey | null {
  const { year, month: number } = parseDayKey(month);
  return dueDay <= daysInMonth(year, number) ? formatDayKey(year, number, dueDay) : null;
}
/** Same foundation rule: absent dates 29–31 are skipped, never shifted. */
export function nextScheduledDay(day: DayKey, dueDay: number, inclusive = false): DayKey {
  let month = startOfMonth(day);
  for (let i = 0; i < 14; i++) {
    const candidate = dueOn(month, dueDay);
    if (candidate && (inclusive ? candidate >= day : candidate > day)) return candidate;
    month = nextMonth(month);
  }
  throw new RangeError('Nu există o scadență validă');
}
const categories: Record<string, string> = { venit: 'Venit', locuinta: 'Locuință', transport: 'Transport', abonamente: 'Abonamente', tehnologie: 'Telefon și tehnologie', mancare: 'Mâncare', iesiri: 'Ieșiri', cumparaturi: 'Cumpărături', sanatate: 'Sănătate', scoala: 'Școală', neprevazute: 'Neprevăzute', economii: 'Economii' };
export function journalEntries(ledger: readonly LedgerEntry[]): Journal['entries'] {
  // Timeline: newest day, then descending foundation sequence; stable refKey tie.
  return [...ledger].sort((a, b) => b.day.localeCompare(a.day) || b.sequence - a.sequence || a.refKey.localeCompare(b.refKey)).map(e => ({
    day: e.day, sequence: e.sequence, amountBani: e.amountBani,
    label: e.refKey.endsWith(':start:balance') ? 'Sold inițial' : e.kind === 'salariu' ? 'Salariu' : e.label,
    category: e.kind === 'transfer_obiectiv' ? 'Obiectiv' : categories[e.category] ?? 'Alte tranzacții',
    type: e.kind === 'transfer_obiectiv' ? 'Transfer' : e.kind === 'salariu' ? 'Venit încasat' : e.kind === 'cheltuiala_fixa' ? 'Cheltuială fixă' : e.refKey.endsWith(':start:balance') ? 'Bani de început' : e.autoResolved ? 'Automat' : e.kind === 'eveniment' ? 'Alegere' : 'Tranzacție',
  }));
}
export function availableMonths(startedOn: DayKey, currentDay: DayKey): string[] {
  const months: string[] = [];
  for (let day = startOfMonth(startedOn); day <= currentDay; day = nextMonth(day)) months.push(monthKey(day));
  return months;
}
export function buildJournal(run: SimulatorRun, ledger: readonly LedgerEntry[], currentDay: DayKey, month: string): Journal {
  const months = availableMonths(run.startedOn, currentDay), index = months.indexOf(month);
  if (index < 0) throw new RangeError('Luna nu aparține simulării');
  return { month, entries: journalEntries(ledger.filter(e => monthKey(e.day) === month)), previousMonth: months[index - 1] ?? null, nextMonth: months[index + 1] ?? null };
}
export function monthlyTotals(ledger: readonly LedgerEntry[], currentDay: DayKey) {
  const monthly = ledger.filter(e => monthKey(e.day) === monthKey(currentDay));
  return {
    monthlyIncomeReceived: bani(monthly.filter(e => (e.kind === 'salariu' || isSupportEntry(e) || e.refKey.endsWith(':salary:monthly')) && e.amountBani > 0).reduce((sum, e) => sum + e.amountBani, 0)),
    monthlyExpensesPaid: bani(monthly.filter(e => ['cheltuiala_fixa', 'eveniment', 'decizie_automata', 'abonament'].includes(e.kind) && e.amountBani < 0).reduce((sum, e) => sum - e.amountBani, 0)),
  };
}
export function fixedExpenseStatuses(run: SimulatorRun, ledger: readonly LedgerEntry[], currentDay: DayKey): SimulatorDashboardState['fixedExpenses'] {
  return fixedExpenses(run).map(e => {
    const date = dueOn(currentDay, e.dueDay);
    const paid = date !== null && ledger.some(l => l.refKey === `${run.id}:${date}:fixed:${e.id}`);
    const status = date === null ? 'not_scheduled_this_month' : date < run.startedOn ? 'not_applicable_start_month' : paid ? 'paid' : 'upcoming';
    return { id: e.id, label: e.label, category: e.category, amountBani: e.amountBani, dueOn: date, dueDay: e.dueDay, status };
  });
}
export function upcomingMovements(run: SimulatorRun, currentDay: DayKey, subscriptions: readonly SimulatorSubscription[] = []): FinancialMovement[] {
  const scheduled = [{ id: 'salary', sourceType: run.configSnapshot.lifeProfile?.activityStatus === 'liceu' ? 'support' : 'salary', label: incomeLabel(run), amountBani: run.monthlyIncomeBani, dueDay: run.configSnapshot.payday, type: 'income' as const, order: -1 }, ...(run.configSnapshot.recurringInflows ?? []).map(e => ({...e, sourceType:'support', type:'income' as const, order: e.order - 200})), ...fixedExpenses(run).map(e => ({ ...e, sourceType: 'fixed_expense', amountBani: bani(-e.amountBani), type: 'expense' as const }))];
  // Ties: salary first, then snapshot order, matching settlement semantics.
  const builtIn = scheduled.flatMap(e => {
    const first = nextScheduledDay(currentDay, e.dueDay);
    return [first, nextScheduledDay(first, e.dueDay)].map(day => ({ id: `${e.sourceType}:${e.id}:${day}`, sourceType: e.sourceType, day, label: e.label, amountBani: e.amountBani, type: e.type, order: e.order }));
  });
  const p = parseDayKey(currentDay);
  const through = formatDayKey(Math.min(9999, p.year + 2), p.month, 1);
  const recurring = subscriptions.flatMap(s => subscriptionDates(s, currentDay, through).slice(0, 2).map(day => ({ id: 'subscription:'+s.id+':'+day, sourceType:'subscription', day, label:s.name, amountBani:bani(-s.amountBani), type:'expense' as const, order:999 })));
  return [...builtIn, ...recurring].sort(financialMovementOrder).slice(0, run.configSnapshot.lifeProfile ? 5 : 3);
}
/** Chapter 5 can merge another occurrence source here without changing the UI
 * or consequence engine. There is no recurring-payment behavior in Chapter 4. */
export const financialMovementOrder = (a: FinancialMovement, b: FinancialMovement) => a.day.localeCompare(b.day) || a.order - b.order || a.id.localeCompare(b.id);
export function buildSimulatorDashboardState(run: SimulatorRun, ledger: readonly LedgerEntry[], currentDay: DayKey, serverDay = currentDay, effects: readonly PersistedEffect[] = [], flags: readonly PersistedFlag[] = [], context?: { state: ConsequenceState; at: string }, subscriptions: readonly SimulatorSubscription[] = []): SimulatorDashboardState {
  if (run.lastSettledOn !== currentDay || ledger.some(e => e.day > currentDay)) throw new RangeError('Snapshot nedecontat');
  const expenses = fixedExpenseStatuses(run, ledger, currentDay);
  const upcoming = upcomingMovements(run, currentDay, subscriptions);
  const nextPayday = nextScheduledDay(currentDay, run.configSnapshot.payday);
  const salaryReceivedToday = ledger.some(e => e.refKey.endsWith(':salary:monthly') && e.day === currentDay);
  const next = upcoming[0] ?? null;
  const base = deriveRunState(run, ledger, effects, flags, currentDay);
  if (context) {
    const current = buildSimulatorStateAt(context.state, context.at);
    base.flags = Object.fromEntries([...current.activeFlags.keys()].map(k => [k, true]));
    const richKeys = new Set(context.state.effects.map(e => e.effectKey)), activeKeys = new Set(context.state.effects.filter(e => effectActiveAt(e, context.at)).map(e => e.effectKey));
    base.activeEffects = base.activeEffects.filter(e => !richKeys.has(e.effectKey) || activeKeys.has(e.effectKey));
  }
  return dashboardSchema.parse({
    incomeLabel: incomeLabel(run), runId: run.id, serverDay, currentDay, startedOn: run.startedOn, simulationDay: daysBetween(run.startedOn, currentDay) + 1,
    lastSettledOn: run.lastSettledOn, housing: run.housing, balanceBani: base.balanceBani, monthlyIncomeBani: run.monthlyIncomeBani,
    activeEffects: base.activeEffects, flags: base.flags,
    currentStates: context ? currentStateItems(context.state, context.at) : [],
    ...monthlyTotals(ledger, currentDay), fixedExpensesRemaining: bani(expenses.filter(e => e.status === 'upcoming').reduce((sum, e) => sum + e.amountBani, 0)),
    nextPayday, daysUntilPayday: daysBetween(currentDay, nextPayday), salaryReceivedToday, fixedExpenses: expenses,
    nextFinancialMovement: next, upcomingFinancialMovements: upcoming, monthlyJournal: buildJournal(run, ledger, currentDay, monthKey(currentDay)),
    availableJournalMonths: availableMonths(run.startedOn, currentDay), freshness: `${run.id}:${currentDay}:${ledger.length}`,
    finiMessage: salaryReceivedToday ? `${incomeLabel(run)}: banii de azi au intrat.` : next ? `Următoarea mișcare: ${next.label.toLocaleLowerCase('ro-RO')}, pe ${parseDayKey(next.day).day}.` : 'Astăzi nu ai nicio plată programată.',
  });
}
/** Shared start plan: both preview and persisted start call foundation settle. */
export function buildStartPlan(id: string, userId: string, housing: SimulatorRun['housing'], startedOn: DayKey, config: SimulatorConfig) {
  const run = runSchema.parse({ id, userId, startedOn, housing, startAge: config.startAge, monthlyIncomeBani: config.monthlyIncomeBani, status: 'activ', rulesVersion: config.rulesVersion, rngVersion: config.rngVersion, configSnapshot: config, lastSettledOn: null });
  const settlement = settle(run, [], startedOn);
  const expenses = fixedExpenses(run);
  const initial = settlement.newEntries.find(e => e.refKey.endsWith(':start:balance'));
  const preview: StartPreview = { housing, startedOn, startingBalanceBani: initial?.amountBani ?? bani(0), monthlyIncomeBani: run.monthlyIncomeBani,
    firstPayday: nextScheduledDay(startedOn, config.payday, true), fixedMonthlyTotalBani: bani(expenses.reduce((sum, e) => sum + e.amountBani, 0)),
    balanceAfterTodayBani: calculateBalance(settlement.newEntries), expenses, todayTransactions: journalEntries(settlement.newEntries) };
  return { run, settlement, preview: previewSchema.parse(preview) };
}

export function formatSimulatorDate(day: string, monthOnly = false): string {
  return new Intl.DateTimeFormat('ro-RO', { timeZone: 'UTC', ...(monthOnly ? { month: 'long', year: 'numeric' } : { day: 'numeric', month: 'long', year: 'numeric' }) }).format(new Date(`${day.length === 7 ? `${day}-01` : day}T12:00:00Z`));
}
