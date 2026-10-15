import { describe, expect, it, vi } from 'vitest';
import { simulatorConfig } from '../src/content/simulator/config';
import { buildJournal, buildSimulatorDashboardState, buildStartPlan, fixedExpenseStatuses, monthlyTotals, nextScheduledDay, upcomingMovements } from '../src/lib/simulator/dashboard';
import { calculateBalance, settle } from '../src/lib/simulator/settle';
import { lei } from '../src/lib/simulator/money';
import { SimulatorSync } from '../src/lib/simulator/sync';
import { day, fixtureRun, runId, userA } from './simulator-fixtures';
vi.mock('server-only', () => ({}));
import { serverTiming } from '../src/lib/simulator/server/chapter-two';

const settled = (start: string, through: string, housing: 'parinti' | 'chirie' = 'parinti') => {
  const run = fixtureRun(start, simulatorConfig, housing), currentDay = day(through);
  const ledger = settle(run, [], currentDay).newEntries;
  return { run: { ...run, lastSettledOn: currentDay }, ledger, currentDay };
};
describe('Shared start preview and canonical finance selectors', () => {
  it.each([
    ['2026-10-01', 0, 188000, 200000, 12000],
    ['2026-10-05', 40000, 10000, 0, 30000],
    ['2026-10-06', 40000, 40000, 0, 0],
    ['2026-10-20', 40000, 40000, 0, 0],
  ])('preview and actual settlement agree on %s', (date, initial, balance, income, expense) => {
    const plan = buildStartPlan(runId, userA, 'parinti', day(date), simulatorConfig);
    expect(plan.preview.startingBalanceBani).toBe(initial);
    expect(plan.preview.balanceAfterTodayBani).toBe(balance);
    expect(calculateBalance(plan.settlement.newEntries)).toBe(balance);
    expect(monthlyTotals(plan.settlement.newEntries, day(date))).toEqual({ monthlyIncomeReceived: income, monthlyExpensesPaid: expense });
    expect(plan.settlement.newEntries.filter(e => e.refKey.endsWith(':start:balance')).length).toBe(date.endsWith('-01') ? 0 : 1);
  });
  it('preview before midnight does not authorize the following-day start', () => {
    const preview = buildStartPlan(runId, userA, 'parinti', day('2026-10-04'), simulatorConfig).preview;
    const start = buildStartPlan(runId, userA, 'parinti', day('2026-10-05'), simulatorConfig);
    expect(preview.balanceAfterTodayBani).toBe(40000);
    expect(start.run.startedOn).toBe('2026-10-05'); expect(start.preview.balanceAfterTodayBani).toBe(10000);
  });
  it('snapshot stays immutable when the live economy changes', () => {
    const live = structuredClone(simulatorConfig);
    const { run } = buildStartPlan(runId, userA, 'parinti', day('2026-10-02'), live);
    live.monthlyIncomeBani = lei(9000); live.housing.parinti.amountBani = lei(999);
    const currentDay = day('2026-11-15');
    const ledger = settle(run, [], currentDay).newEntries;
    const dashboard = buildSimulatorDashboardState({ ...run, lastSettledOn: currentDay }, ledger, currentDay);
    expect(dashboard.monthlyIncomeBani).toBe(200000); expect(dashboard.monthlyIncomeReceived).toBe(200000);
    expect(dashboard.fixedExpenses.find(e => e.id === 'housing')?.amountBani).toBe(30000);
    expect(buildStartPlan(runId, userA, 'parinti', day('2026-11-15'), live).preview.monthlyIncomeBani).toBe(900000);
  });
  it('absence crosses months without resetting run or balance; repeated settlement emits nothing', () => {
    const { run, ledger, currentDay } = settled('2026-10-02', '2026-12-15');
    const state = buildSimulatorDashboardState(run, ledger, currentDay);
    expect(state.balanceBani).toBe(299000); expect(state.monthlyExpensesPaid).toBe(51000);
    expect(state.balanceBani).toBe(calculateBalance(ledger)); expect(state.monthlyIncomeReceived).toBe(200000);
    expect(settle(run, ledger, currentDay).newEntries).toEqual([]);
  });
  it('rent on the start day applies despite insufficient money', () => {
    const { run, ledger, currentDay } = settled('2026-10-05', '2026-10-05', 'chirie');
    const state = buildSimulatorDashboardState(run, ledger, currentDay);
    expect(state.balanceBani).toBe(-40000); expect(state.fixedExpenses.find(e => e.id === 'housing')?.status).toBe('paid');
  });
  it('remaining obligations exclude pre-start due dates, include future dates and exclude paid dates', () => {
    const start = settled('2026-10-06', '2026-10-06');
    const state = buildSimulatorDashboardState(start.run, start.ledger, start.currentDay);
    expect(state.fixedExpensesRemaining).toBe(9000);
    expect(state.fixedExpenses.find(e => e.id === 'housing')?.status).toBe('not_applicable_start_month');
    const paid = settled('2026-10-06', '2026-10-15');
    expect(buildSimulatorDashboardState(paid.run, paid.ledger, paid.currentDay).fixedExpensesRemaining).toBe(0);
    const next = settled('2026-10-20', '2026-11-01');
    const normal = buildSimulatorDashboardState(next.run, next.ledger, next.currentDay);
    expect(normal.fixedExpensesRemaining).toBe(39000); expect(normal.salaryReceivedToday).toBe(true); expect(normal.nextPayday).toBe('2026-12-01');
  });
  it('monthly totals exclude initial balance and technical adjustments', () => {
    const { ledger, currentDay } = settled('2026-10-02', '2026-10-15');
    expect(monthlyTotals([...ledger, { ...ledger[0], amountBani: lei(-5), refKey: 'technical' }], currentDay)).toEqual({ monthlyIncomeReceived: 0, monthlyExpensesPaid: 39000 });
  });
  it.each([['2026-10-31', '2026-11-01'], ['2026-11-01', '2026-12-01'], ['2026-12-31', '2027-01-01']])('next payday after %s is %s', (date, expected) => expect(nextScheduledDay(day(date), 1)).toBe(expected));
  it('inclusive payday before settlement and exclusive payday after settlement', () => {
    expect(nextScheduledDay(day('2026-10-01'), 1, true)).toBe('2026-10-01');
    expect(nextScheduledDay(day('2026-10-01'), 1)).toBe('2026-11-01');
  });
  it('upcoming movements choose expense, salary, and deterministic salary-first ties', () => {
    const run = fixtureRun();
    expect(upcomingMovements(run, day('2026-10-02'))[0].label).toBe('Contribuție la locuință');
    expect(upcomingMovements(run, day('2026-10-20')).map(e => e.label)).toEqual(['Salariu', 'Transport', 'Contribuție la locuință']);
  });
  it('missing calendar dates preserve foundation semantics', () => {
    const run = fixtureRun('2026-02-01', { ...simulatorConfig, housing: { ...simulatorConfig.housing, parinti: { ...simulatorConfig.housing.parinti, dueDay: 31 } } });
    expect(fixedExpenseStatuses(run, [], day('2026-02-20')).find(e => e.id === 'housing')?.status).toBe('not_scheduled_this_month');
    expect(nextScheduledDay(day('2026-02-20'), 31)).toBe('2026-03-31');
  });
  it.each([['2026-03-28', '2026-03-30', 3], ['2026-10-24', '2026-10-26', 3], ['2026-12-31', '2027-01-01', 2]])('simulation days are civil across %s → %s', (start, end, expected) => {
    const { run, ledger, currentDay } = settled(start, end);
    expect(buildSimulatorDashboardState(run, ledger, currentDay).simulationDay).toBe(expected);
  });
  it('refuses unsettled snapshots instead of presenting unpaid obligations as paid', () => {
    expect(() => buildSimulatorDashboardState(fixtureRun(), [], day('2026-10-05'))).toThrow('Snapshot nedecontat');
  });
});
describe('Financial journal history', () => {
  it('current, previous and starting months are bounded; no internal identifiers exposed', () => {
    const { run, ledger, currentDay } = settled('2026-10-02', '2026-12-15');
    const start = buildJournal(run, ledger, currentDay, '2026-10');
    expect(start.previousMonth).toBeNull(); expect(start.nextMonth).toBe('2026-11');
    expect(buildJournal(run, ledger, currentDay, '2026-11').previousMonth).toBe('2026-10');
    expect(buildJournal(run, ledger, currentDay, '2026-12').nextMonth).toBeNull();
    expect(() => buildJournal(run, ledger, currentDay, '2026-09')).toThrow();
    expect(() => buildJournal(run, ledger, currentDay, '2027-01')).toThrow();
    expect(JSON.stringify(start)).not.toContain('refKey'); expect(JSON.stringify(start)).not.toContain(run.id);
    expect(start.entries.find(e => e.type === 'Bani de început')?.label).toBe('Sold inițial');
  });
  it('newest day first, sequence descending within a day', () => {
    const { run, ledger, currentDay } = settled('2026-10-01', '2026-11-01');
    const entries = buildJournal(run, ledger, currentDay, '2026-10').entries;
    expect(entries[0].day).toBe('2026-10-15');
    expect(entries.filter(e => e.day === '2026-10-01').map(e => e.label)).toEqual(['Transport', 'Salariu']);
  });
});
describe('Server calibrated midnight and request ordering', () => {
  it.each([['2026-03-28T22:00:00Z', 23], ['2026-10-24T21:00:00Z', 25], ['2026-10-07T21:00:00Z', 24]])('next Romanian midnight after %s is %s hours away', (date, hours) => {
    expect(serverTiming(new Date(date)).refreshAfterMs).toBe(hours * 3600000 + 1000);
  });
  it('overlapping initial/visibility/midnight requests reuse one flight', async () => {
    const sync = new SimulatorSync<number>(), accept = vi.fn(), reject = vi.fn();
    let resolve!: (n: number) => void;
    const load = vi.fn(() => new Promise<number>(done => { resolve = done; }));
    const a = sync.run(load, accept, reject), b = sync.run(load, accept, reject), c = sync.run(load, accept, reject);
    expect(a).toBe(b); expect(a).toBe(c); expect(load).toHaveBeenCalledOnce();
    resolve(3); await a; expect(accept).toHaveBeenCalledExactlyOnceWith(3);
  });
  it('B arrives before invalidated A; stale A cannot overwrite B', async () => {
    const sync = new SimulatorSync<number>(), seen: number[] = [];
    let resolveA!: (n: number) => void;
    const a = sync.run(() => new Promise<number>(resolve => { resolveA = resolve; }), n => seen.push(n), () => {});
    sync.invalidate(); await sync.run(async () => 2, n => seen.push(n), () => {});
    resolveA(1); await a; expect(seen).toEqual([2]);
  });
  it('network failure can retry; invalidated failures do not announce stale errors', async () => {
    const sync = new SimulatorSync<number>(), accept = vi.fn(), reject = vi.fn();
    await sync.run(async () => { throw new Error('network'); }, accept, reject);
    expect(reject).toHaveBeenCalledOnce(); await sync.run(async () => 4, accept, reject); expect(accept).toHaveBeenCalledWith(4);
  });
});
