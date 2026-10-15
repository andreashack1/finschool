import { incomeLabel } from '../../content/simulator/life-profile-config';
import { addDays, dayKeySchema, dayOfMonth, type DayKey } from './calendar';
import { SimulatorError } from './errors';
import { bani, type MoneyBani } from './money';
import { ledgerEntrySchema, ledgerSequence, runSchema, type LedgerEntry, type SimulatorRun } from './types';

export function calculateBalance(ledger: readonly LedgerEntry[]): MoneyBani {
  return ledger.reduce((sum, entry) => bani(sum + ledgerEntrySchema.parse(entry).amountBani), bani(0));
}
/** Pure domain settlement. Reads the run snapshot, never today's live config or clock.
 * Days 29..31 only trigger when that civil date exists; they do not shift to month end. */
export function settle(runInput: SimulatorRun, existingLedger: readonly LedgerEntry[], today: DayKey): { newEntries: LedgerEntry[]; settledThrough: DayKey | null } {
  today = dayKeySchema.parse(today);
  const parsed = runSchema.safeParse(runInput);
  if (!parsed.success) throw new SimulatorError('INVALID_SIMULATOR_CONFIG', 503);
  const run = parsed.data;
  if (run.status !== 'activ') throw new SimulatorError('SIMULATOR_CONFLICT', 409);
  if (run.lastSettledOn && today < run.lastSettledOn) throw new SimulatorError('SIMULATOR_CLOCK_REVERSED', 409);
  const config = run.configSnapshot;
  const keys = new Set(existingLedger.map(e => ledgerEntrySchema.parse(e).refKey));
  const newEntries: LedgerEntry[] = [];
  const emit = (entry: LedgerEntry) => { if (!keys.has(entry.refKey)) { newEntries.push(ledgerEntrySchema.parse(entry)); keys.add(entry.refKey); } };
  const expenses = [config.housing[run.housing], ...config.fixedExpenses].filter(e => e.amountBani > 0).sort((a, b) => a.order - b.order);
  let cursor = run.lastSettledOn;
  // Do not compute the next date after today: this also handles 9999-12-31 safely.
  while (cursor === null ? run.startedOn <= today : cursor < today) {
    const day = cursor === null ? run.startedOn : addDays(cursor, 1);
    if (day === run.startedOn && dayOfMonth(day) !== config.payday) emit({ day, sequence: ledgerSequence.start, kind: 'ajustare', category: 'venit', amountBani: config.startingBalanceBani, label: 'Sold inițial (exemplu)', refKey: `${run.id}:${day}:start:balance`, autoResolved: false });
    if (dayOfMonth(day) === config.payday) emit({ day, sequence: ledgerSequence.salary, kind: config.lifeProfile?.activityStatus === 'liceu' ? 'ajustare' : 'salariu', category: 'venit', amountBani: config.monthlyIncomeBani, label: config.lifeProfile ? incomeLabel(run) : 'Salariu lunar (exemplu)', refKey: `${run.id}:${day}:salary:monthly`, autoResolved: false });
    for (const inflow of config.recurringInflows ?? []) if (dayOfMonth(day) === inflow.dueDay) emit({ day, sequence: inflow.order, kind: 'ajustare', category: 'venit', amountBani: inflow.amountBani, label: inflow.label, refKey: `${run.id}:${day}:inflow:${inflow.id}`, autoResolved: false });
    expenses.forEach((expense, index) => {
      if (dayOfMonth(day) === expense.dueDay) emit({ day, sequence: ledgerSequence.fixed + index, kind: 'cheltuiala_fixa', category: expense.category, amountBani: bani(-expense.amountBani), label: expense.label, refKey: `${run.id}:${day}:fixed:${expense.id}`, autoResolved: false });
    });
    // Future event occurrences and missed decisions extend this ordered civil-day loop.
    cursor = day;
  }
  return { newEntries, settledThrough: cursor };
}
