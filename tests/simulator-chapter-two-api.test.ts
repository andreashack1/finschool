import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { User } from '@supabase/supabase-js';
import { AccountError } from '../src/lib/account/errors';
import { day, userA, userB } from './simulator-fixtures';
vi.mock('server-only', () => ({}));
const mocks = vi.hoisted(() => ({ user: vi.fn(), clock: vi.fn(), dashboard: vi.fn(), start: vi.fn(), journal: vi.fn() }));
vi.mock('../src/lib/supabase/server', () => ({ requireUser: mocks.user }));
vi.mock('../src/lib/simulator/server/clock', () => ({ getServerClock: mocks.clock }));
vi.mock('../src/lib/simulator/server/chapter-two', () => ({ simulatorPageState: mocks.dashboard, startSimulatorPage: mocks.start, simulatorJournal: mocks.journal }));
import { GET as dashboard } from '../app/api/simulator/dashboard/route';
import { POST as start } from '../app/api/simulator/start/route';
import { POST as preview } from '../app/api/simulator/preview/route';
import { GET as journal } from '../app/api/simulator/journal/route';
const clock = { realDay: day('2026-10-05'), effectiveDay: day('2026-10-05'), offsetDays: 0 };
const request = (path: string, body?: unknown, extraHeaders: Record<string, string> = {}) => new Request(`http://localhost:3000/api/simulator/${path}`, { method: body === undefined ? 'GET' : 'POST', headers: { origin: 'http://localhost:3000', 'content-type': 'application/json', ...extraHeaders }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
beforeEach(() => {
  vi.resetAllMocks(); vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000');
  mocks.user.mockResolvedValue({ id: userA } as User); mocks.clock.mockResolvedValue(clock); mocks.dashboard.mockResolvedValue({ dashboard: null }); mocks.start.mockResolvedValue({ dashboard: { runId: 'example' } }); mocks.journal.mockResolvedValue({ month: '2026-10', entries: [] });
});
afterEach(() => vi.unstubAllEnvs());
describe('Chapter 2 API uses verified session and server clock', () => {
  it.each([
    undefined,
    { version: 1, activityStatus: 'liceu', housingStatus: 'parinti' },
    { version: 1, activityStatus: 'student', housingStatus: 'parinti', transportMode: 'walk' },
    { version: 1, activityStatus: 'liceu', housingStatus: 'parinti', transportMode: 'walk', income: 999999 },
  ])('setup refuses incomplete or client-authored financial profiles', async lifeProfile => {
    expect((await start(request('start', { housing: 'parinti', ...(lifeProfile ? {lifeProfile} : {}) }))).status).toBe(400);
    expect(mocks.start).not.toHaveBeenCalled();
  });
  it.each([dashboard, start, preview, journal])('unauthenticated requests never access finance', async handler => {
    mocks.user.mockRejectedValue(new AccountError('AUTH_REQUIRED', 401));
    const response = await handler(request('journal?month=2026-10', handler === start || handler === preview ? { housing: 'parinti' } : undefined));
    expect(response.status).toBe(401); expect(mocks.dashboard).not.toHaveBeenCalled(); expect(mocks.start).not.toHaveBeenCalled(); expect(mocks.journal).not.toHaveBeenCalled();
  });
  it.each(['userId', 'user_id', 'startedOn', 'balance', 'income', 'payday', 'configSnapshot', 'rulesVersion', 'currentDay'])('start and preview reject forged %s', async key => {
    for (const handler of [start, preview]) expect((await handler(request('start', { housing: 'chirie', [key]: 'forged' }))).status).toBe(400);
    expect(mocks.start).not.toHaveBeenCalled();
  });
  it('preview calculates same-day housing from server config; start uses current server day', async () => {
    const response = await preview(request('preview', { housing: 'parinti' }));
    expect(response.status).toBe(200); expect(await response.json()).toMatchObject({ startedOn: '2026-10-05', startingBalanceBani: 40000, balanceAfterTodayBani: 10000 });
    mocks.clock.mockResolvedValue({ ...clock, realDay: day('2026-10-06'), effectiveDay: day('2026-10-06') });
    const lifeProfile = { version: 1, activityStatus: 'lucrez', housingStatus: 'chirie', transportMode: 'public' };
    const started = await start(request('start', { housing: 'chirie', lifeProfile }));
    expect(started.status).toBe(200);
    expect(mocks.start).toHaveBeenCalledWith(userA, 'chirie', expect.objectContaining({ effectiveDay: '2026-10-06' }), 'lucrez', lifeProfile);
  });
  it('dashboard private no-store and query dates cannot change server authority', async () => {
    const response = await dashboard(request('dashboard?currentDay=2099-01-01'));
    expect(response.headers.get('cache-control')).toBe('no-store'); expect(mocks.dashboard).toHaveBeenCalledWith(userA, clock);
  });
  it('cross-user account context and cross-origin mutations are rejected', async () => {
    expect((await dashboard(request('dashboard', undefined, { 'X-Finly-Account': userB }))).status).toBe(401);
    expect((await start(request('start', { housing: 'parinti' }, { origin: 'https://evil.invalid' }))).status).toBe(403);
    expect(mocks.start).not.toHaveBeenCalled(); expect(mocks.dashboard).not.toHaveBeenCalled();
  });
  it.each(['2026-00', '2026-13', 'invalid', '2026-10&userId=forged', '2026-10&balance=9'])('journal rejects invalid query %s', async query => {
    expect((await journal(request(`journal?month=${query}`))).status).toBe(400); expect(mocks.journal).not.toHaveBeenCalled();
  });
  it('journal passes only the selected month and verified identity', async () => {
    const response = await journal(request('journal?month=2026-10'));
    expect(response.status).toBe(200); expect(mocks.journal).toHaveBeenCalledWith(userA, clock, '2026-10');
    expect(response.headers.get('cache-control')).toBe('no-store');
  });
  it('transport failures expose no SQL or secrets', async () => {
    mocks.dashboard.mockRejectedValue(new Error('SQL private service_role'));
    const response = await dashboard(request('dashboard')); expect(response.status).toBe(503); expect(await response.text()).not.toMatch(/SQL|private|service_role/);
  });
});
