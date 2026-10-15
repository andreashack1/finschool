import { afterEach, describe, expect, it, vi } from 'vitest';
import { clockSnapshot } from '../src/lib/simulator/clock';
import { settle } from '../src/lib/simulator/settle';
import type { SimulatorRun } from '../src/lib/simulator/types';
import { day, fixtureRun, userA } from './simulator-fixtures';

vi.mock('server-only', () => ({}));
vi.mock('../src/lib/simulator/server/database', () => ({ simulatorDatabase: vi.fn(() => { throw new Error('Inject test database'); }) }));
const jar = vi.hoisted(() => ({ get: vi.fn(), set: vi.fn(), delete: vi.fn() }));
const cookieAccess = vi.hoisted(() => vi.fn());
vi.mock('next/headers', () => ({ cookies: cookieAccess }));
import { resetDevRun, simulatorState, startRun } from '../src/lib/simulator/server/service';
import { advanceDevClock, getServerClock, resetDevClock } from '../src/lib/simulator/server/clock';

type Client = NonNullable<Parameters<typeof simulatorState>[2]>;
const mockClient = (rpc: ReturnType<typeof vi.fn>, from = vi.fn()) => ({ rpc, from }) as unknown as Client;
const success = (data: unknown) => ({ data, error: null });
function rows(run: SimulatorRun) {
  const ledger = settle({ ...run, lastSettledOn: null }, [], run.lastSettledOn ?? run.startedOn).newEntries;
  return {
    run: { id: run.id, user_id: run.userId, started_on: run.startedOn, start_age: run.startAge, monthly_income_bani: run.monthlyIncomeBani, housing: run.housing, status: run.status, rules_version: run.rulesVersion, rng_version: run.rngVersion, config_snapshot: run.configSnapshot, last_settled_on: run.lastSettledOn },
    ledger: ledger.map(e => ({ run_id: run.id, user_id: run.userId, day: e.day, sequence: e.sequence, kind: e.kind, category: e.category, amount_bani: e.amountBani, label: e.label, ref_key: e.refKey, auto_resolved: e.autoResolved })), effects: [], flags: [],
  };
}
const clock = clockSnapshot(new Date('2026-10-07T12:00:00Z'), 0, 'production');
afterEach(() => { vi.unstubAllEnvs(); vi.useRealTimers(); vi.clearAllMocks(); });
describe('Server settlement service consistency and limited CAS retry', () => {
  it('returns controlled empty state before start', async () => {
    const rpc = vi.fn().mockResolvedValue(success(null));
    expect(await simulatorState(userA, clock, mockClient(rpc))).toEqual({ ...clock, run: null, state: null });
  });
  it('refetches and recomputes once after CAS conflict, returning committed ledger', async () => {
    const run = { ...fixtureRun(), lastSettledOn: day('2026-10-02') };
    const rpc = vi.fn().mockResolvedValueOnce(success(rows(run))).mockResolvedValueOnce(success({ status: 'conflict' }))
      .mockResolvedValueOnce(success(rows({ ...run, lastSettledOn: day('2026-10-05') })))
      .mockResolvedValueOnce(success({ status: 'applied' })).mockResolvedValueOnce(success(rows({ ...run, lastSettledOn: clock.effectiveDay })));
    const result = await simulatorState(userA, clock, mockClient(rpc));
    expect(result.run?.lastSettledOn).toBe(clock.effectiveDay); expect(result.state?.balanceBani).toBe(10000);
    expect(rpc.mock.calls.filter(([name]) => name === 'apply_simulator_settlement')).toHaveLength(2);
    expect(rpc.mock.calls[3][1]).toMatchObject({ p_user: userA, p_expected: '2026-10-05', p_through: '2026-10-07', p_entries: [] });
  });
  it('stops after two CAS conflicts', async () => {
    const run = { ...fixtureRun(), lastSettledOn: day('2026-10-02') };
    const rpc = vi.fn().mockResolvedValueOnce(success(rows(run))).mockResolvedValueOnce(success({ status: 'conflict' })).mockResolvedValueOnce(success(rows(run))).mockResolvedValueOnce(success({ status: 'conflict' }));
    await expect(simulatorState(userA, clock, mockClient(rpc))).rejects.toThrow('Starea simulatorului');
    expect(rpc).toHaveBeenCalledTimes(4);
  });
  it('starting with active run never creates another run', async () => {
    const run = { ...fixtureRun(), lastSettledOn: clock.effectiveDay };
    const rpc = vi.fn().mockResolvedValue(success(rows(run)));
    expect((await startRun(userA, 'chirie', clock, mockClient(rpc))).created).toBe(false);
    expect(rpc.mock.calls.every(([name]) => name === 'read_simulator_state')).toBe(true);
  });
  it('a competing start returns winner and does not produce a 500', async () => {
    const run = { ...fixtureRun(), lastSettledOn: clock.effectiveDay };
    const rpc = vi.fn().mockResolvedValueOnce(success(null)).mockResolvedValueOnce(success({ created: false, runId: run.id })).mockResolvedValueOnce(success(rows(run)));
    const result = await startRun(userA, 'parinti', clock, mockClient(rpc));
    expect(result.created).toBe(false); expect(result.run?.id).toBe(run.id);
    const sent = rpc.mock.calls[1][1].p_run;
    expect(sent).toMatchObject({ userId: userA, startedOn: clock.effectiveDay, startAge: 18, rulesVersion: 1, rngVersion: 1 });
  });
  it('unknown snapshot version and owner mismatch fail before any mutation', async () => {
    const raw = rows(fixtureRun());
    const rpc = vi.fn().mockResolvedValue(success({ ...raw, run: { ...raw.run, rules_version: 2 } }));
    await expect(simulatorState(userA, clock, mockClient(rpc))).rejects.toThrow('Regulile'); expect(rpc).toHaveBeenCalledTimes(1);
    raw.run.user_id = crypto.randomUUID();
    rpc.mockResolvedValue(success(raw));
    await expect(simulatorState(userA, clock, mockClient(rpc))).rejects.toThrow('Regulile');
  });
  it('reset deletes only this user simulator records and is guarded outside dev', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    const eq = vi.fn().mockResolvedValue({ error: null }), remove = vi.fn(() => ({ eq })), from = vi.fn(() => ({ delete: remove }));
    await resetDevRun(userA, mockClient(vi.fn(), from)); expect(from).toHaveBeenCalledWith('sim_runs'); expect(eq).toHaveBeenCalledWith('user_id', userA);
    vi.stubEnv('NODE_ENV', 'production');
    await expect(resetDevRun(userA, mockClient(vi.fn(), from))).rejects.toThrow(); expect(from).toHaveBeenCalledOnce();
  });
});
describe('Server cookie clock boundary', () => {
  it('production never reads a forged dev cookie', async () => {
    vi.stubEnv('NODE_ENV', 'production'); vi.useFakeTimers(); vi.setSystemTime(new Date('2026-10-07T12:00:00Z'));
    jar.get.mockReturnValue({ value: '999' }); cookieAccess.mockResolvedValue(jar);
    expect(await getServerClock()).toMatchObject(clock); expect(cookieAccess).not.toHaveBeenCalled();
  });
  it('dev increments logical offset and reset deletes it', async () => {
    vi.stubEnv('NODE_ENV', 'development'); vi.useFakeTimers(); vi.setSystemTime(new Date('2026-10-07T12:00:00Z'));
    jar.get.mockReturnValue({ value: '1' }); cookieAccess.mockResolvedValue(jar);
    const result = await advanceDevClock(7); expect(result.effectiveDay).toBe('2026-10-15'); expect(result.offsetDays).toBe(8);
    expect(jar.set).toHaveBeenCalledWith('finly_sim_dev_day_offset', '8', expect.objectContaining({ httpOnly: true, sameSite: 'strict', path: '/' }));
    await resetDevClock(); expect(jar.delete).toHaveBeenCalledWith('finly_sim_dev_day_offset');
  });
});
