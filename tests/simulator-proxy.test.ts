import { describe, expect, it, vi, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
const getUser = vi.hoisted(() => vi.fn(async () => ({ data: { user: null } })));
vi.mock('@supabase/ssr', () => ({ createServerClient: () => ({ auth: { getUser } }) }));
import { proxy } from '../proxy';
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });
describe('Technical simulator route isolation', () => {
  it.each(['/simulator/dev', '/simulator/dev/', '/api/simulator/dev/clock', '/api/simulator/dev/reset'])('production %s returns 404 before auth', async path => {
    vi.stubEnv('NODE_ENV', 'production');
    const response = await proxy(new NextRequest(`http://localhost:3000${path}`, { headers: { cookie: 'finly_sim_dev_day_offset=999' } }));
    expect(response.status).toBe(404); expect(response.headers.has('location')).toBe(false); expect(getUser).not.toHaveBeenCalled();
  });
  it('development page keeps the existing auth-required redirect', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    const response = await proxy(new NextRequest('http://localhost:3000/simulator/dev'));
    expect(response.headers.get('location')).toBe('http://localhost:3000/bun-venit');
  });
});
