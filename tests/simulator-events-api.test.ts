import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AccountError } from '../src/lib/account/errors';
import { day, userA, userB, runId } from './simulator-fixtures';
vi.mock('server-only', () => ({}));
const mocks=vi.hoisted(()=>({user:vi.fn(),clock:vi.fn(),detail:vi.fn(),choose:vi.fn(),activate:vi.fn(),dashboard:vi.fn(),advance:vi.fn(),demo:vi.fn()}));
vi.mock('../src/lib/supabase/server',()=>({requireUser:mocks.user}));
vi.mock('../src/lib/simulator/server/clock',()=>({getServerClock:mocks.clock,advanceDevMinutes:mocks.advance}));
vi.mock('../src/lib/simulator/server/events',()=>({eventDetail:mocks.detail,chooseEvent:mocks.choose,activateEvents:mocks.activate}));
vi.mock('../src/lib/simulator/server/chapter-two',()=>({simulatorPageState:mocks.dashboard}));
vi.mock('../src/lib/simulator/server/consequence-demos',()=>({planConsequenceDemo:mocks.demo}));
import { GET as detail, POST as choose } from '../app/api/simulator/events/[id]/route';
import { POST as profile } from '../app/api/simulator/profile/route';
import { GET as devGet, POST as devPost } from '../app/api/simulator/dev/events/route';
import { POST as demoPost } from '../app/api/simulator/dev/consequences/route';
const clock={realDay:day('2026-10-09'),effectiveDay:day('2026-10-09'),offsetDays:0};
const context={params:Promise.resolve({id:runId})};
const request=(body?:unknown,headers:Record<string,string>={})=>new Request('http://localhost:3000/api/simulator/events/'+runId,{method:body===undefined?'GET':'POST',headers:{origin:'http://localhost:3000','content-type':'application/json',...headers},...(body===undefined?{}:{body:JSON.stringify(body)})});
beforeEach(()=>{vi.resetAllMocks();vi.stubEnv('NODE_ENV','development');vi.stubEnv('NEXT_PUBLIC_APP_URL','http://localhost:3000');mocks.user.mockResolvedValue({id:userA});mocks.clock.mockResolvedValue(clock);mocks.detail.mockResolvedValue({event:{id:runId}});mocks.choose.mockResolvedValue({conflict:false,event:{id:runId}});mocks.dashboard.mockResolvedValue({dashboard:null});});
afterEach(()=>vi.unstubAllEnvs());
describe('Event routes accept IDs only and enforce existing mutation protection',()=>{
 it('anonymous cannot read or choose and cross-account context is rejected',async()=>{
  mocks.user.mockRejectedValue(new AccountError('AUTH_REQUIRED',401));expect((await detail(request(),context)).status).toBe(401);expect((await choose(request({optionId:'free'}),context)).status).toBe(401);
  mocks.user.mockResolvedValue({id:userA});expect((await detail(request(undefined,{'X-Finly-Account':userB}),context)).status).toBe(401);expect(mocks.detail).not.toHaveBeenCalled();
 });
 it.each(['costBani','balance','day','scheduledAt','expiresAt','userId','feedback','durationMinutes','seed','consequences','flagKey','effectKey','value','overlapPolicy','presentation','effectiveAt','recordedAt'])('rejects client authority for %s',async key=>{
  expect((await choose(request({optionId:'free',[key]:1}),context)).status).toBe(400);expect(mocks.choose).not.toHaveBeenCalled();
 });
 it('server identity and clock are used, reads no-store and stale choice returns saved 409 body',async()=>{
  const response=await detail(request(),context);expect(response.headers.get('cache-control')).toBe('no-store');expect(mocks.detail).toHaveBeenCalledWith(userA,runId,clock);
  mocks.choose.mockResolvedValue({conflict:true,event:{status:'resolved',selectedOptionId:'saved'}});
  const conflict=await choose(request({optionId:'other'}),context);expect(conflict.status).toBe(409);expect(await conflict.json()).toMatchObject({event:{selectedOptionId:'saved'}});
 });
 it('rejects cross-origin mutation without executing a decision',async()=>{expect((await choose(request({optionId:'free'},{origin:'https://evil.invalid'}),context)).status).toBe(403);expect(mocks.choose).not.toHaveBeenCalled();});
 it('profile validates stable values and rejects finance overrides',async()=>{
  expect((await profile(request({profile:'liceu'}))).status).toBe(200);expect(mocks.activate).toHaveBeenCalledWith(userA,'liceu',clock,2);
  expect((await profile(request({profile:'other'}))).status).toBe(400);expect((await profile(request({profile:'lucrez',income:999}))).status).toBe(400);
 });
 it('production diagnostics and minute offsets return 404 before auth/clock reads',async()=>{
  vi.stubEnv('NODE_ENV','production');expect((await devGet(request())).status).toBe(404);expect((await devPost(request({minutes:15}))).status).toBe(404);expect((await demoPost(request({scenario:'coverage'}))).status).toBe(404);expect(mocks.user).not.toHaveBeenCalled();expect(mocks.clock).not.toHaveBeenCalled();expect(mocks.advance).not.toHaveBeenCalled();expect(mocks.demo).not.toHaveBeenCalled();
 });
 it('dev fixture API accepts only trusted scenario identity',async()=>{
  mocks.demo.mockResolvedValue({created:1});expect((await demoPost(request({scenario:'coverage'}))).status).toBe(200);expect(mocks.demo).toHaveBeenCalledWith(userA,'coverage',clock);
  mocks.demo.mockClear();expect((await demoPost(request({scenario:'coverage',consequences:[{type:'set_flag',key:'injected'}]}))).status).toBe(400);expect(mocks.demo).not.toHaveBeenCalled();
 });
});
