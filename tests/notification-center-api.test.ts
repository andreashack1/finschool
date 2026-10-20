import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { AccountError } from '../src/lib/account/errors';
vi.mock('server-only',()=>({}));
const mocks=vi.hoisted(()=>({user:vi.fn(),clock:vi.fn(),sync:vi.fn(),load:vi.fn(),observe:vi.fn(),inbox:vi.fn(),read:vi.fn()}));
vi.mock('../src/lib/supabase/server',()=>({requireUser:mocks.user}));
vi.mock('../src/lib/simulator/server/clock',()=>({getServerClock:mocks.clock}));
vi.mock('../src/lib/simulator/server/service',()=>({simulatorState:mocks.sync,loadRun:mocks.load}));
vi.mock('../src/lib/simulator/server/events',()=>({effectiveNow:(clock:{effectiveNow:string})=>new Date(clock.effectiveNow)}));
vi.mock('../src/lib/simulator/notifications/observe',()=>({observeSafely:mocks.observe}));
vi.mock('../src/lib/simulator/notifications/service',()=>({inbox:mocks.inbox,markRead:mocks.read}));
import { GET,POST } from '../app/api/notifications/route';
const user='00000000-0000-4000-8000-000000000001',id='00000000-0000-4000-8000-000000000002',now='2026-10-13T09:00:00.000Z';
const request=(body?:unknown,extra:Record<string,string>={})=>new Request('http://localhost:3000/api/notifications',{method:body===undefined?'GET':'POST',headers:{origin:'http://localhost:3000','content-type':'application/json','X-Finly-Account':user,...extra},...(body===undefined?{}:{body:JSON.stringify(body)})});
beforeEach(()=>{vi.resetAllMocks();vi.stubEnv('NODE_ENV','development');vi.stubEnv('NEXT_PUBLIC_APP_URL','http://localhost:3000');mocks.user.mockResolvedValue({id:user});mocks.clock.mockResolvedValue({effectiveNow:now});mocks.load.mockResolvedValue(null);mocks.inbox.mockResolvedValue({items:[],unread:0});mocks.read.mockResolvedValue({target:'/simulator',items:[],unread:0});});
afterEach(()=>vi.unstubAllEnvs());
describe('notification API ownership and lifecycle',()=>{
 it.each(['2026-10-16T12:59:00+00:00','2026-10-16T15:59:00+03:00','2026-10-16T14:59:00+02:00'])('accepts PostgREST timestamp %s without losing the concurrency version',async version=>{
  mocks.read.mockResolvedValue({target:`/simulator/eveniment/${id}`,items:[],unread:0});
  const response=await POST(request({id,version}));
  expect(response.status).toBe(200);expect(mocks.read).toHaveBeenCalledWith(user,id,new Date(now),version);
  expect((await response.json()).target).toBe(`/simulator/eveniment/${id}`);
 });
 it.each(['garbage','2026-10-16','2026-13-16T12:59:00+00:00','2026-10-16T12:59:00','2026-10-16T12:59:00+99:99'])('rejects malformed timestamp %s',async version=>{
  expect((await POST(request({id,version}))).status).toBe(400);expect(mocks.read).not.toHaveBeenCalled();
 });
 it('settles canonical simulator before observing; opening bell is read-only',async()=>{
  const r=await GET(request());expect(r.status).toBe(200);expect(r.headers.get('cache-control')).toBe('no-store');
  expect(mocks.sync).toHaveBeenCalledWith(user,{effectiveNow:now});expect(mocks.sync.mock.invocationCallOrder[0]).toBeLessThan(mocks.observe.mock.invocationCallOrder[0]);expect(mocks.read).not.toHaveBeenCalled();
 });
 it('acknowledges only the verified session and displayed significant version',async()=>{
  expect((await POST(request({id,version:now}))).status).toBe(200);expect(mocks.read).toHaveBeenCalledWith(user,id,new Date(now),now);
  expect((await POST(request({}))).status).toBe(200);expect(mocks.read).toHaveBeenLastCalledWith(user,undefined,new Date(now),undefined);
 });
 it.each(['userId','user_id','payload','status','read_at'])('rejects browser authority over %s',async key=>{
  expect((await POST(request({id,[key]:user}))).status).toBe(400);expect(mocks.read).not.toHaveBeenCalled();
 });
 it('anonymous, cross-account and cross-origin requests cannot mutate or list data',async()=>{
  mocks.user.mockRejectedValue(new AccountError('AUTH_REQUIRED',401));expect((await GET(request())).status).toBe(401);expect((await POST(request({id}))).status).toBe(401);
  mocks.user.mockResolvedValue({id:user});expect((await GET(request(undefined,{'X-Finly-Account':id}))).status).toBe(401);expect((await POST(request({id},{origin:'https://evil.test'}))).status).toBe(403);expect(mocks.sync).not.toHaveBeenCalled();expect(mocks.read).not.toHaveBeenCalled();
 });
});
