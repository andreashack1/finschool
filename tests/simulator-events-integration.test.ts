import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { beforeAll, afterAll, beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('server-only', () => ({}));
const mock = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock('../src/lib/simulator/server/database', () => ({ simulatorDatabase: () => ({ rpc: mock.rpc }) }));
import { loadRun, simulatorState } from '../src/lib/simulator/server/service';
import { activateEvents, syncSimulatorThrough, eventArea, eventDetail, chooseEvent } from '../src/lib/simulator/server/events';
import { calculateBalance, settle } from '../src/lib/simulator/settle';
import { fixtureRun, day } from './simulator-fixtures';
import { localInstant } from '../src/lib/simulator/events/time';
import type { SimulatorClock } from '../src/lib/simulator/clock';
import { eventPolicyV1 } from '../src/content/simulator/events/policy-v1';

let db: PGlite;
const signatures: Record<string, string[]> = { upgrade_simulator_decisions:['p_user','p_run','p_expected','p_day','p_now','p_development','p_policy'],
 finalize_simulator_month:['p_user','p_run','p_expected','p_day','p_snapshot'],
 read_simulator_state: ['p_user'], start_simulator_run: ['p_user','p_run','p_entries'], apply_simulator_settlement: ['p_user','p_run','p_expected','p_through','p_entries'],
 activate_simulator_events: ['p_user','p_run','p_expected','p_engine'], commit_simulator_events: ['p_user','p_run','p_expected','p_settled','p_through','p_engine','p_days','p_instances','p_entries','p_now','p_development','p_operations'],
};
function clock(date = '2026-10-02', minute = 360): SimulatorClock { return { realDay: day(date), effectiveDay: day(date), offsetDays: 0, effectiveNow: localInstant(day(date), minute).toISOString() }; }
async function start() {
 const user = crypto.randomUUID(), run = { ...fixtureRun(), id: crypto.randomUUID(), userId: user };
 await db.query('insert into auth.users values($1)', [user]);
 const entries = settle(run, [], run.startedOn).newEntries.map(e => ({ ...e, userId: user, runId: run.id }));
 await db.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb)', [user,JSON.stringify(run),JSON.stringify(entries)]);
 return user;
}
async function active() { const user = await start(); await activateEvents(user, 'liceu', clock());
 const policy = structuredClone(eventPolicyV1); policy.routineChances.morning = 1; policy.routineChances.lunch = 1; policy.routineChances.after_program = 1;
 await db.query('update public.sim_runs set event_policy_snapshot=$1::jsonb where user_id=$2',[JSON.stringify(policy),user]);
 const state = await syncSimulatorThrough(user, clock('2026-10-02', 1439)); if (!state?.engine) throw new Error('fixture activation'); return { user, state }; }
describe('Chapter 3 actual PostgreSQL atomic engine and private APIs', () => {
 beforeAll(async () => {
  db = new PGlite();
  await db.exec("create role anon; create role authenticated; create role service_role bypassrls; create schema auth; create table auth.users(id uuid primary key); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema public,auth to anon,authenticated,service_role;");
  await db.exec(readFileSync('supabase/migrations/0003_simulator_foundation.sql','utf8'));
  await db.exec(readFileSync('supabase/migrations/0004_simulator_events.sql','utf8'));
  await db.exec(readFileSync('supabase/migrations/0005_simulator_consequences.sql','utf8'));
  for(const migration of ['0006_simulator_subscriptions.sql','0007_simulator_life_catalog.sql','0008_simulator_monthly_reviews.sql','0010_simulator_decision_policy.sql'])await db.exec(readFileSync(`supabase/migrations/${migration}`,'utf8'));
  mock.rpc.mockImplementation(async (name: string, args: Record<string, unknown>) => {

   // This historical fixture installs migrations through 0010: mirror PostgREST's missing-RPC response.
   if(name==='upgrade_simulator_daily_floor')return {data:null,error:{code:'PGRST202',message:'Daily floor migration not installed in historical fixture'}};
   const keys = signatures[name]; if (!keys) throw new Error(`Unknown RPC ${name}`);
   const parameters = keys.map(k => typeof args[k] === 'object' && args[k] !== null ? JSON.stringify(args[k]) : k === 'p_operations' && args[k] === undefined ? '[]' : args[k]);
   try { const result = await db.query<{ result: unknown }>(`select public.${name}(${keys.map((_,i)=>`$${i+1}`).join(',')}) as result`, parameters); return { data: result.rows[0]?.result ?? null, error: null }; }
   catch (error) { return { data: null, error }; }
  });
 }, 30000);
 afterAll(async () => { await db.close(); });
 beforeEach(() => vi.stubEnv('NODE_ENV','development'));
 afterEach(() => vi.unstubAllEnvs());
 it('legacy run has no silent profile, activation persists versions and scenario without changing money', async () => {
  const user = await start(), before = await loadRun(user); expect(before?.engine).toBeNull();
  await activateEvents(user, 'liceu', clock()); const after = await loadRun(user);
  expect(after?.engine?.catalogVersion).toBe(1); expect(after?.engine?.policyVersion).toBe(1); expect(calculateBalance(after!.ledger)).toBe(calculateBalance(before!.ledger));
  await activateEvents(user,'lucrez',clock()); expect((await loadRun(user))?.engine?.scheduleProfile).toBe('liceu');
 });
 it('plans persist, other devices/reloads receive identical instances and prices', async () => {
  const { user, state } = await active(), second = await syncSimulatorThrough(user,clock('2026-10-02',1439));
  expect(second?.instances).toEqual(state.instances); expect(second?.days).toEqual(state.days);
  expect((await db.query('select * from public.sim_event_days where run_id=$1',[state.run.id])).rows).toHaveLength(1);
 });
 it('parallel planners converge to one day and one immutable plan', async () => {
  const user = await start(); await activateEvents(user,'liceu',clock());
  await Promise.all([syncSimulatorThrough(user,clock()),syncSimulatorThrough(user,clock())]);
  const state = await loadRun(user); expect(state?.days).toHaveLength(1); expect(new Set(state?.instances.map(e=>e.generationKey)).size).toBe(state?.instances.length);
 });
 it('zero-event day is persisted and never regenerated after refresh or policy change', async () => {
  const user=await start(); await activateEvents(user,'liceu',clock());
  const policy=structuredClone(eventPolicyV1); for(const key of Object.keys(policy.routineChances) as (keyof typeof policy.routineChances)[]) policy.routineChances[key]=0; policy.additionalChance=0;
  await db.query('update public.sim_runs set event_policy_snapshot=$1::jsonb where user_id=$2',[JSON.stringify(policy),user]);
  const zero=await syncSimulatorThrough(user,clock()); expect(zero?.days[0].eventCount).toBe(0); expect(zero?.instances).toEqual([]);
  await db.query('update public.sim_runs set event_policy_snapshot=$1::jsonb where user_id=$2',[JSON.stringify(eventPolicyV1),user]);
  expect((await syncSimulatorThrough(user,clock()))?.instances).toEqual([]);
 });
 it('normal API hides all future snapshots/IDs and direct detail cannot inspect them', async () => {
  const user = await start(); await activateEvents(user,'liceu',clock()); const state = await syncSimulatorThrough(user,clock());
  const area = eventArea(state!,clock()); expect(area.pending).toEqual([]); expect(area.resolved).toEqual([]);
  expect(JSON.stringify(area)).not.toMatch(/generationKey|seed|definitionId/);
  for (const instance of state!.instances) { expect(JSON.stringify(area)).not.toContain(instance.id); await expect(eventDetail(user,instance.id,clock())).rejects.toMatchObject({status:404}); }
 });
 it('another authenticated account cannot inspect or choose an instance', async () => {
  const {state} = await active(), other = await start();
  if (!state.instances.length) throw new Error('fixture expected events');
  await expect(eventDetail(other,state.instances[0].id,clock('2026-10-02',1439))).rejects.toMatchObject({status:404});
 });
 it('free choice is persisted without a ledger entry; same retry returns saved result, different retry conflicts', async () => {
  const {user,state} = await active(); const e=state.instances[0]; if(!e) throw new Error('fixture event');
  const free=e.snapshot.options.find(o=>o.fallbackWhenUnaffordable)!;
  const before=state.ledger.length, first=await chooseEvent(user,e.id,free.id,clock('2026-10-02',1439));
  expect(first.event.status).toBe('resolved'); expect(first.conflict).toBe(false); expect((await loadRun(user))!.ledger).toHaveLength(before);
  expect((await chooseEvent(user,e.id,free.id,clock('2026-10-02',1439))).event).toEqual(first.event);
  expect((await chooseEvent(user,e.id,e.snapshot.options[0].id,clock('2026-10-02',1439))).conflict).toBe(true);
 });
 it('paid choice commits exactly one ledger debit and anchored activity, no double-spend on retries', async () => {
  const {user,state}=await active(), e=state.instances[0]; if(!e) throw new Error('fixture event'); const paid=e.snapshot.options[0];
  const before=calculateBalance(state.ledger); await Promise.all([chooseEvent(user,e.id,paid.id,clock('2026-10-02',1439)),chooseEvent(user,e.id,paid.id,clock('2026-10-02',1439))]);
  const after=await loadRun(user); expect(calculateBalance(after!.ledger)).toBe(before-paid.costBani); expect(after!.ledger.filter(l=>l.refKey===`${state.run.id}:event:${e.id}:cost`)).toHaveLength(1);
 });
 it('two simultaneous choices cannot consume the same funds; stale balance returns current state', async () => {
  const {user,state}=await active(), [a,b]=state.instances; expect(b).toBeDefined();
  const paidA=a.snapshot.options[0], paidB=b.snapshot.options[0], balance=Math.max(paidA.costBani,paidB.costBani);
  await db.query("insert into public.sim_ledger(run_id,user_id,day,sequence,kind,category,amount_bani,label,auto_resolved,ref_key) values($1,$2,'2026-10-02',999,'ajustare','mancare',$3,'Fixture',false,'fixture-balance')",[state.run.id,user,balance-calculateBalance(state.ledger)]);
  const results=await Promise.all([chooseEvent(user,a.id,paidA.id,clock('2026-10-02',1439)),chooseEvent(user,b.id,paidB.id,clock('2026-10-02',1439))]);
  expect(results.filter(r=>!r.conflict)).toHaveLength(1); expect(calculateBalance((await loadRun(user))!.ledger)).toBeGreaterThanOrEqual(0);
  expect(results.find(r=>r.conflict)?.event.options.some(o=>o.unavailableReason==='insufficient_funds')).toBe(true);
 });
 it('midnight manual/automatic race saves exactly one immutable result', async () => {
  const {user,state}=await active(), e=state.instances[0]; if(!e) throw new Error('fixture event');
  await Promise.allSettled([chooseEvent(user,e.id,e.snapshot.options[0].id,clock('2026-10-03',0)),syncSimulatorThrough(user,clock('2026-10-03',0))]);
  const after=await loadRun(user), resolved=after!.instances.find(x=>x.id===e.id)!;
  expect(resolved.status).toBe('resolved'); expect(resolved.resolutionMode).toBe('automatic'); expect(after!.ledger.filter(l=>l.refKey===`${state.run.id}:event:${e.id}:cost`).length).toBeLessThanOrEqual(1);
 });
 it('absence processes multiple batches; checkpoint only advances with saved decisions', async () => {
  const {user}=await active(); const partial=await syncSimulatorThrough(user,clock('2026-12-03',720)); expect(partial?.caughtUp).toBe(false);
  const middle=await syncSimulatorThrough(user,clock('2026-12-03',720)); expect(middle?.caughtUp).toBe(false);
  const final=await syncSimulatorThrough(user,clock('2026-12-03',720)); expect(final?.caughtUp).toBe(true);
  expect(final?.instances.filter(e=>e.day<day('2026-12-03')).every(e=>e.status==='resolved')).toBe(true);
 });
 it('a failed batch leaves checkpoint untouched, retry resumes without duplicates', async () => {
  const {user,state}=await active(), implementation=mock.rpc.getMockImplementation()!;
  mock.rpc.mockImplementation(async (name: string,args: Record<string,unknown>)=>name==='commit_simulator_events'?{data:null,error:new Error('failure')}:implementation(name,args));
  await expect(syncSimulatorThrough(user,clock('2026-10-06',720))).rejects.toThrow();
  mock.rpc.mockImplementation(implementation); const unchanged=await loadRun(user); expect(unchanged?.revision).toBe(state.revision); expect(unchanged?.days).toEqual(state.days);
  const resumed=await syncSimulatorThrough(user,clock('2026-10-06',720)); expect(resumed?.caughtUp).toBe(true); expect(new Set(resumed?.ledger.map(l=>l.refKey)).size).toBe(resumed?.ledger.length);
 });
 it('old financial RPC cannot bypass active event timeline', async () => {
  const {user,state}=await active(); const result=await mock.rpc('apply_simulator_settlement',{p_user:user,p_run:state.run.id,p_expected:state.run.lastSettledOn,p_through:'2026-11-01',p_entries:[]}); expect(result.data.status).toBe('conflict');
  await simulatorState(user,clock('2026-10-03',720)); expect((await loadRun(user))?.days).toHaveLength(2);
 });
 it('SQL failure after inserting plans rolls back every row and checkpoint, then retry succeeds', async () => {
  const {user,state}=await active(), implementation=mock.rpc.getMockImplementation()!;
  mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>{
   if(name==='commit_simulator_events'){
    const payload=structuredClone(args), entries=payload.p_entries;
    if(Array.isArray(entries) && entries.length) Reflect.set(entries[entries.length-1],'amountBani',2147483648);
    return implementation(name,payload);
   }
   return implementation(name,args);
  });
  await expect(syncSimulatorThrough(user,clock('2026-10-12',720))).rejects.toThrow();
  mock.rpc.mockImplementation(implementation);
  const rolledBack=await loadRun(user); expect(rolledBack?.revision).toBe(state.revision); expect(rolledBack?.days).toEqual(state.days); expect(rolledBack?.instances).toEqual(state.instances); expect(rolledBack?.ledger).toEqual(state.ledger);
  expect((await syncSimulatorThrough(user,clock('2026-10-12',720)))?.caughtUp).toBe(true);
 });
 it.each(['anon','authenticated'])('%s cannot SELECT future tables or mutate instances or invoke private functions',async role=>{
  await db.exec(`set role ${role}`);
  try {
   for(const table of ['sim_event_days','sim_event_instances']) {
    await expect(db.query(`select * from public.${table}`)).rejects.toThrow();
    await expect(db.query(`delete from public.${table}`)).rejects.toThrow();
   }
   await expect(db.query("select public.activate_simulator_events(null,null,null,'{}')")).rejects.toThrow();
  } finally {await db.exec('reset role');}
 });
 it('new event tables have RLS and composite cascading ownership',async()=>{
  for(const table of ['sim_event_days','sim_event_instances']) expect((await db.query<{enabled:boolean}>('select relrowsecurity as enabled from pg_class where oid=$1::regclass',[`public.${table}`])).rows[0].enabled).toBe(true);
  const {user,state}=await active(); await db.query('delete from auth.users where id=$1',[user]);
  expect((await db.query('select * from public.sim_event_days where run_id=$1',[state.run.id])).rows).toEqual([]);
  expect((await db.query('select * from public.sim_event_instances where run_id=$1',[state.run.id])).rows).toEqual([]);
 });
});
