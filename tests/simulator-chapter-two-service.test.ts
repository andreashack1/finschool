import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { settle } from '../src/lib/simulator/settle';
import { clockSnapshot } from '../src/lib/simulator/clock';
import { day, fixtureRun, userA } from './simulator-fixtures';
vi.mock('server-only', () => ({}));
const mocks = vi.hoisted(() => ({ load: vi.fn(), settle: vi.fn(), start: vi.fn() }));
vi.mock('../src/lib/simulator/server/service', () => ({ loadRun: mocks.load, simulatorState: mocks.settle, startRun: mocks.start }));
import { simulatorJournal, simulatorPageState, startSimulatorPage } from '../src/lib/simulator/server/chapter-two';
const clock = clockSnapshot(new Date('2026-10-08T12:00:00Z'), 0, 'production');
beforeEach(() => { vi.resetAllMocks(); vi.useFakeTimers(); vi.setSystemTime(new Date('2026-10-08T12:00:00Z')); });
afterEach(() => vi.useRealTimers());
const loaded = (start = '2026-10-02', through = '2026-10-08') => {
  const run = fixtureRun(start), ledger = settle(run, [], day(through)).newEntries;
  return { run: { ...run, lastSettledOn: day(through) }, ledger, monthlyReviews: [], effects: [], flags: [], consequenceState: { effects: [], operations: [] } };
};
describe('Canonical server orchestration', () => {
  it('no run requires setup without assuming income or housing obligations', async () => {
    mocks.load.mockResolvedValue(null);
    const result = await simulatorPageState(userA, clock);
    expect(mocks.settle).toHaveBeenCalledWith(userA, clock);
    expect(result.dashboard).toBeNull(); expect(result.previews).toEqual([]);
    expect(mocks.start).not.toHaveBeenCalled();
    expect(result.timing.serverNow).toBe('2026-10-08T12:00:00.000Z');
  });
  it('settlement completes before atomic read; sends only current journal and full-run balance', async () => {
    const data = loaded('2026-09-02'); mocks.load.mockResolvedValue(data);
    const result = await simulatorPageState(userA, clock);
    expect(mocks.settle.mock.invocationCallOrder[0]).toBeLessThan(mocks.load.mock.invocationCallOrder[0]);
    // September: 400−300−50−40=10 lei. October through the 8th: +2000−120−300.
    expect(result.dashboard?.balanceBani).toBe(159000);
    expect(result.dashboard?.monthlyJournal.entries.every(e => e.day.startsWith('2026-10'))).toBe(true);
    expect(result.previews).toEqual([]); expect(JSON.stringify(result)).not.toContain('configSnapshot');
  });
  it('failed settlement never marks obligations as paid or sends partial dashboard', async () => {
    mocks.settle.mockRejectedValue(new Error('network'));
    await expect(simulatorPageState(userA, clock)).rejects.toThrow(); expect(mocks.load).not.toHaveBeenCalled();
  });
  it('concurrent checkpoint ahead fails safely; no mismatched ledger/cursor snapshot', async () => {
    mocks.load.mockResolvedValue(loaded('2026-10-02', '2026-10-09'));
    await expect(simulatorPageState(userA, clock)).rejects.toThrow('Starea SimLife');
  });
  it('start returns committed dashboard and recalculates with the given authoritative day', async () => {
    const data = loaded(); mocks.load.mockResolvedValue(data);
    const result = await startSimulatorPage(userA, 'parinti', clock);
    expect(mocks.start).toHaveBeenCalledWith(userA, 'parinti', clock);
    expect(mocks.start.mock.invocationCallOrder[0]).toBeLessThan(mocks.settle.mock.invocationCallOrder[0]);
    expect(result.dashboard?.runId).toBe(data.run.id);
  });
  it('midnight during response assembly requests quick revalidation', async () => {
    vi.setSystemTime(new Date('2026-10-08T21:00:01Z')); mocks.load.mockResolvedValue(null);
    expect((await simulatorPageState(userA, clock)).timing.refreshAfterMs).toBe(1000);
  });
  it.each(['2026-09', '2026-11', '2026-13', 'not-a-month'])('journal rejects outside run bounds or malformed %s', async month => {
    mocks.load.mockResolvedValue(loaded()); await expect(simulatorJournal(userA, clock, month)).rejects.toThrow();
  });
  it('journal requires a run and never changes current financial state', async () => {
    mocks.load.mockResolvedValue(null); await expect(simulatorJournal(userA, clock, '2026-10')).rejects.toThrow();
    mocks.load.mockResolvedValue(loaded('2026-09-02'));
    expect((await simulatorJournal(userA, clock, '2026-09')).month).toBe('2026-09');
    expect(mocks.settle).not.toHaveBeenCalled(); expect(mocks.start).not.toHaveBeenCalled();
  });
});
