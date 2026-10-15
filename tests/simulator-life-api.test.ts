import { beforeEach,afterEach,describe,it,expect,vi } from 'vitest';
vi.mock('server-only',()=>({}));
const mocks=vi.hoisted(()=>({user:vi.fn(),database:vi.fn()}));
vi.mock('../src/lib/supabase/server',()=>({requireUser:mocks.user}));
vi.mock('../src/lib/simulator/server/database',()=>({simulatorDatabase:mocks.database}));
import { GET } from '../app/api/simulator/dev/life/route';
import { AccountError } from '../src/lib/account/errors';
import { userA } from './simulator-fixtures';
const request=(query='days=1')=>new Request('http://localhost:3000/api/simulator/dev/life?'+query);
beforeEach(()=>{vi.resetAllMocks();vi.stubEnv('NODE_ENV','development');mocks.user.mockResolvedValue({id:userA});});
afterEach(()=>vi.unstubAllEnvs());
describe('Chapter 6 private development diagnostics',()=>{
 it('uses the same deterministic namespace for simulation and selected-day explanation, without database writes',async()=>{const r=await GET(request());expect(r.status).toBe(200);expect(r.headers.get('cache-control')).toBe('no-store');const body=await r.json();expect(body.catalog.definitions).toBe(200);expect(body.selectedDay.selected.length).toBe(body.simulation.dayCounts[0].count);expect(body.selectedDay.candidates).toHaveLength(200);expect(mocks.database).not.toHaveBeenCalled();});
 it('is 404 in production before auth or data access',async()=>{vi.stubEnv('NODE_ENV','production');expect((await GET(request())).status).toBe(404);expect(mocks.user).not.toHaveBeenCalled();expect(mocks.database).not.toHaveBeenCalled();});
 it('requires authenticated development access',async()=>{mocks.user.mockRejectedValue(new AccountError('AUTH_REQUIRED',401));expect((await GET(request())).status).toBe(401);});
 it.each(['day=2026-02-30','profile=other','days=91','seed=bad%20seed','days=1&rngSeed=123'])('rejects invalid query %s',async query=>{expect((await GET(request(query))).status).toBe(400);expect(mocks.database).not.toHaveBeenCalled();});
});
