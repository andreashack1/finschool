import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { User } from '@supabase/supabase-js';
import { AccountError } from '../src/lib/account/errors';
import { day, userA, userB } from './simulator-fixtures';

vi.mock('server-only', () => ({}));
const mocks = vi.hoisted(() => ({ requireUser: vi.fn(), clock: vi.fn(), advance: vi.fn(), resetClock: vi.fn(), state: vi.fn(), start: vi.fn(), reset: vi.fn() }));
vi.mock('../src/lib/supabase/server', () => ({ requireUser: mocks.requireUser }));
vi.mock('../src/lib/simulator/server/clock', () => ({ getServerClock: mocks.clock, advanceDevClock: mocks.advance, resetDevClock: mocks.resetClock }));
vi.mock('../src/lib/simulator/server/service', () => ({ simulatorState: mocks.state, startRun: mocks.start, resetDevRun: mocks.reset }));
import { POST as start } from '../app/api/simulator/run/route';
import { POST as settle } from '../app/api/simulator/settle/route';
import { GET as state } from '../app/api/simulator/state/route';
import { POST as advance } from '../app/api/simulator/dev/clock/route';
import { POST as reset } from '../app/api/simulator/dev/reset/route';
const clock = { realDay: day('2026-10-07'), effectiveDay: day('2026-10-07'), offsetDays: 0 };
const request = (path: string, body?: unknown, headers: Record<string, string> = {}) => new Request(`http://localhost:3000/api/simulator/${path}`, { method: body === undefined ? 'GET' : 'POST', headers: { origin: 'http://localhost:3000', 'content-type': 'application/json', ...headers }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
beforeEach(() => {
  vi.resetAllMocks(); vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000');
  mocks.requireUser.mockResolvedValue({ id: userA } as User); mocks.clock.mockResolvedValue(clock); mocks.advance.mockResolvedValue({ ...clock, effectiveDay: day('2026-10-08'), offsetDays: 1 });
  mocks.state.mockResolvedValue({ ...clock, run: null, state: null }); mocks.start.mockResolvedValue({ ...clock, created: true });
});
afterEach(() => vi.unstubAllEnvs());
describe('Simulator API authority and safe development boundary', () => {
  it.each([start, settle, state])('requires authenticated session', async handler => {
    mocks.requireUser.mockRejectedValue(new AccountError('AUTH_REQUIRED', 401));
    const response = await handler(request('state', handler === state ? undefined : {}));
    expect(response.status).toBe(401); expect(mocks.state).not.toHaveBeenCalled(); expect(mocks.start).not.toHaveBeenCalled();
  });
  it('start accepts only housing, gets identity/date from server and preserves existing flow', async () => {
    const response = await start(request('run', { housing: 'chirie' }));
    expect(response.status).toBe(200); expect(mocks.start).toHaveBeenCalledWith(userA, 'chirie', clock);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });
  it.each(['today', 'date', 'currentDay', 'startedOn', 'income', 'startingBalance', 'age', 'rulesVersion', 'rngVersion', 'configSnapshot', 'user_id'])('rejects client authority field %s', async key => {
    expect((await start(request('run', { housing: 'parinti', [key]: 'fake' }))).status).toBe(400);
    expect(mocks.start).not.toHaveBeenCalled();
  });
  it('settle rejects dates; GET query dates cannot influence clock', async () => {
    expect((await settle(request('settle', { today: '2099-01-01' }))).status).toBe(400);
    expect((await state(request('state?today=2099-01-01&offset=999'))).status).toBe(200);
    expect(mocks.state).toHaveBeenCalledWith(userA, clock);
  });
  it('supports empty/no-run state and bodyless settlement', async () => {
    expect((await state(request('state'))).status).toBe(200);
    const response = await settle(new Request('http://localhost:3000/api/simulator/settle', { method: 'POST', headers: { origin: 'http://localhost:3000' } }));
    expect(response.status).toBe(200); expect(await response.json()).toMatchObject({ run: null, state: null });
  });
  it('rejects cross-origin writes and stale account headers', async () => {
    expect((await start(request('run', { housing: 'parinti' }, { origin: 'https://evil.invalid' }))).status).toBe(403);
    expect((await start(request('run', { housing: 'parinti' }, { 'X-Finly-Account': userB }))).status).toBe(401);
    expect(mocks.start).not.toHaveBeenCalled();
  });
  it.each([1, 7, 30])('allows only dev increment %s and settles using resulting clock', async increment => {
    expect((await advance(request('dev/clock', { increment }))).status).toBe(200);
    expect(mocks.advance).toHaveBeenCalledWith(increment);
    expect(mocks.state).toHaveBeenCalledWith(userA, { ...clock, effectiveDay: day('2026-10-08'), offsetDays: 1 });
  });
  it.each([-1, 0, 2, 31, 1.5])('rejects dev increment %s', async increment => { expect((await advance(request('dev/clock', { increment }))).status).toBe(400); expect(mocks.advance).not.toHaveBeenCalled(); });
  it('reset filters by authenticated user and resets only simulator clock', async () => {
    expect((await reset(request('dev/reset', {}))).status).toBe(200);
    expect(mocks.reset).toHaveBeenCalledWith(userA); expect(mocks.resetClock).toHaveBeenCalledOnce();
  });
  it.each([advance, reset])('returns 404 in production before auth/cookies/db', async handler => {
    vi.stubEnv('NODE_ENV', 'production');
    expect((await handler(request('dev/reset', { increment: 1 }, { cookie: 'finly_sim_dev_day_offset=999' }))).status).toBe(404);
    expect(mocks.requireUser).not.toHaveBeenCalled(); expect(mocks.reset).not.toHaveBeenCalled(); expect(mocks.advance).not.toHaveBeenCalled();
  });
  it('never exposes transport errors/SQL details', async () => {
    mocks.start.mockRejectedValue(new Error('SQL service_key private_stack'));
    const response = await start(request('run', { housing: 'parinti' }));
    expect(response.status).toBe(503); expect(await response.text()).not.toMatch(/SQL|service_key|private_stack/);
  });
});
