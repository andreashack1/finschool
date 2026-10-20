import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('server-only', () => ({}));
const mock = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock('../src/lib/simulator/server/database', () => ({ simulatorDatabase: () => ({ rpc: mock.rpc }) }));
import { mutateSubscription, financialCalendar } from '../src/lib/simulator/server/subscriptions';
import { loadRun, simulatorState } from '../src/lib/simulator/server/service';
import { activateEvents, syncSimulatorThrough } from '../src/lib/simulator/server/events';
import { localInstant } from '../src/lib/simulator/events/time';
import { day, fixtureRun } from './simulator-fixtures';
import { calculateBalance, settle } from '../src/lib/simulator/settle';
import { eventPolicyV1 } from '../src/content/simulator/events/policy-v1';
import type { SimulatorClock } from '../src/lib/simulator/clock';

let db: PGlite;
const clock = (date='2026-10-10'): SimulatorClock => ({ realDay:day(date),effectiveDay:day(date),offsetDays:0,effectiveNow:localInstant(day(date),600).toISOString() });
const signatures: Record<string,string[]> = { upgrade_simulator_decisions:['p_user','p_run','p_expected','p_day','p_now','p_development','p_policy'],
 finalize_simulator_month:['p_user','p_run','p_expected','p_day','p_snapshot'],
 read_simulator_state:['p_user'], start_simulator_run:['p_user','p_run','p_entries'],
 apply_simulator_settlement:['p_user','p_run','p_expected','p_through','p_entries','p_subscriptions','p_revision'],
 activate_simulator_events:['p_user','p_run','p_expected','p_engine'],
 commit_simulator_events:['p_user','p_run','p_expected','p_settled','p_through','p_engine','p_days','p_instances','p_entries','p_now','p_development','p_operations','p_subscriptions'],
 mutate_simulator_subscription:['p_user','p_run','p_expected','p_day','p_now','p_development','p_action','p_operation','p_subscription','p_entries'],
};
async function user(events=true) {
 const id=crypto.randomUUID(),run={...fixtureRun('2026-10-10'),id:crypto.randomUUID(),userId:id};
 await db.query('insert into auth.users values($1)',[id]);
 await db.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb)',[id,JSON.stringify(run),JSON.stringify(settle(run,[],run.startedOn).newEntries.map(e=>({...e,runId:run.id,userId:id})))]);
 if(events) { await activateEvents(id,'liceu',clock()); const policy=structuredClone(eventPolicyV1); for(const key of Object.keys(policy.routineChances) as (keyof typeof policy.routineChances)[]) policy.routineChances[key]=0; policy.additionalChance=0; await db.query('update public.sim_runs set event_policy_snapshot=$1::jsonb where id=$2',[JSON.stringify(policy),run.id]); await syncSimulatorThrough(id,clock()); }
 return id;
}
const input=(date='2026-10-12',amount='300')=>({ name:'Abonament sală',amount,nextDueOn:date,intervalMonths:1,operationId:crypto.randomUUID() });
const saved=async(id:string)=>(await loadRun(id))!;
async function through(id:string,date:string) { for(let i=0;i<30;i++) if((await syncSimulatorThrough(id,clock(date)))?.caughtUp) return; throw new Error('Catch-up incomplete'); }
const payments=async(id:string)=>(await saved(id)).ledger.filter(e=>e.kind==='abonament');
describe('Chapter 5 real PostgreSQL atomic subscription operations / run CAS / RLS',()=>{
 beforeAll(async()=>{
  db=new PGlite(); await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema public,auth to anon,authenticated,service_role;");
  for(const migration of ['0003_simulator_foundation.sql','0004_simulator_events.sql','0005_simulator_consequences.sql','0006_simulator_subscriptions.sql','0007_simulator_life_catalog.sql','0008_simulator_monthly_reviews.sql','0010_simulator_decision_policy.sql']) await db.exec(readFileSync(`supabase/migrations/${migration}`,'utf8'));
  await db.exec(`create function public.qa_subscription_failure() returns trigger language plpgsql as $$ begin
   if TG_TABLE_NAME='sim_ledger' then if NEW.label='Abonament · fail immediate' then raise exception 'injected ledger failure'; end if;
   elsif NEW.name='fail cursor' and NEW.next_due_on<>OLD.next_due_on then raise exception 'injected cursor failure'; end if;
   return NEW; end $$;
   create trigger qa_fail_ledger before insert on public.sim_ledger for each row execute function public.qa_subscription_failure();
   create trigger qa_fail_cursor before update on public.sim_subscriptions for each row execute function public.qa_subscription_failure();`);
  mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>{
   // This historical fixture installs migrations through 0010: mirror PostgREST's missing-RPC response.
   if(name==='upgrade_simulator_daily_floor')return {data:null,error:{code:'PGRST202',message:'Daily floor migration not installed in historical fixture'}};

   const keys=signatures[name],params=keys.map(k=>args[k]===undefined?(k==='p_operations'||k==='p_subscriptions'?'[]':null):args[k]!==null && typeof args[k]==='object'?JSON.stringify(args[k]):args[k]);
   try {const result=await db.query<{result:unknown}>(`select public.${name}(${keys.map((_,i)=>`$${i+1}`).join(',')}) as result`,params);return {data:result.rows[0]?.result??null,error:null};}
   catch(error){return {data:null,error};}
  });
 },30000);
 afterAll(async()=>{await db.close();}); beforeEach(()=>vi.stubEnv('NODE_ENV','development')); afterEach(()=>vi.unstubAllEnvs());
 it('future create persists schedule without money, same-name distinct operations are allowed',async()=>{
  const id=await user(),request=input();await mutateSubscription(id,clock(),'create',request);await mutateSubscription(id,clock(),'create',input());
  expect((await saved(id)).subscriptions).toHaveLength(2);expect(await payments(id)).toEqual([]);
  expect((await financialCalendar(id,clock(),'2026-10')).days.find(d=>d.day==='2026-10-12')!.items.filter(e=>e.sourceType==='subscription')).toHaveLength(2);
 });
 it('create today is atomic, retry and two simultaneous tabs produce one subscription and payment',async()=>{
  const id=await user(),request=input('2026-10-10');await Promise.all([mutateSubscription(id,clock(),'create',request),mutateSubscription(id,clock(),'create',request)]);await mutateSubscription(id,clock(),'create',request);
  expect((await saved(id)).subscriptions).toHaveLength(1);expect(await payments(id)).toHaveLength(1);expect((await saved(id)).subscriptions[0].nextDueOn).toBe('2026-11-10');
 });
 it('past first date rejected; no partial rows',async()=>{
  const id=await user();await expect(mutateSubscription(id,clock(),'create',input('2026-10-09'))).rejects.toMatchObject({code:'INVALID_SIMULATOR_INPUT'});expect((await saved(id)).subscriptions).toEqual([]);expect(await payments(id)).toEqual([]);
 });
 it('automatic payment may take balance negative',async()=>{
  const id=await user();await mutateSubscription(id,clock(),'create',input('2026-10-10','50000'));expect(calculateBalance((await saved(id)).ledger)).toBeLessThan(0);
 });
 it('concurrent device settlement and refresh cannot double debit',async()=>{
  const id=await user();await mutateSubscription(id,clock(),'create',input());await Promise.all([syncSimulatorThrough(id,clock('2026-10-12')),syncSimulatorThrough(id,clock('2026-10-12'))]);await simulatorState(id,clock('2026-10-12'));
  expect(await payments(id)).toHaveLength(1);expect((await saved(id)).subscriptions[0].nextDueOn).toBe('2026-11-12');
 });
 it('multi-month absence replays all obligations through canonical batched chronology',async()=>{
  const id=await user();await mutateSubscription(id,clock(),'create',input('2026-10-31'));
  for(let i=0;i<20;i++){const result=await syncSimulatorThrough(id,clock('2027-04-30'));if(result?.caughtUp)break;}
  expect((await payments(id)).map(e=>e.day)).toEqual(['2026-10-31','2026-11-30','2026-12-31','2027-01-31','2027-02-28','2027-03-31','2027-04-30']);
  expect((await saved(id)).subscriptions[0].nextDueOn).toBe('2027-05-31');
 });
 it('rename and price edit preserve paid snapshots and use the new future configuration',async()=>{
  const id=await user();await mutateSubscription(id,clock(),'create',input('2026-10-10'));const s=(await saved(id)).subscriptions[0];
  await mutateSubscription(id,clock(),'edit',{...input('2026-11-10','350'),name:'Telefon',id:s.id,revision:s.revision});await through(id,'2026-11-10');
  const entries=await payments(id);expect(entries[0]).toMatchObject({label:'Abonament · Abonament sală',amountBani:-30000});expect(entries[1]).toMatchObject({label:'Abonament · Telefon',amountBani:-35000});
 });
 it('frequency change confirms next due date and resets anchor without drift',async()=>{
  const id=await user();await mutateSubscription(id,clock(),'create',input());const s=(await saved(id)).subscriptions[0];
  await mutateSubscription(id,clock(),'edit',{...input('2026-10-31'),intervalMonths:3,id:s.id,revision:s.revision});await syncSimulatorThrough(id,clock('2026-10-31'));
  expect((await saved(id)).subscriptions[0]).toMatchObject({intervalMonths:3,anchorDayOfMonth:31,nextDueOn:'2027-01-31'});
 });
 it('edit to today settles once; already paid today is never charged again',async()=>{
  const id=await user();await mutateSubscription(id,clock(),'create',input());let s=(await saved(id)).subscriptions[0];await mutateSubscription(id,clock(),'edit',{...input('2026-10-10'),id:s.id,revision:s.revision});
  s=(await saved(id)).subscriptions[0];await mutateSubscription(id,clock(),'edit',{...input('2026-10-10','350'),id:s.id,revision:s.revision});expect(await payments(id)).toHaveLength(1);
 });
 it('stale edit returns authoritative value instead of overwriting',async()=>{
  const id=await user();await mutateSubscription(id,clock(),'create',input());const s=(await saved(id)).subscriptions[0];await mutateSubscription(id,clock(),'edit',{...input(),name:'Nou',id:s.id,revision:s.revision});
  const stale=await mutateSubscription(id,clock(),'edit',{...input(),name:'Vechi',id:s.id,revision:s.revision});expect(stale).toMatchObject({conflict:true,subscription:{name:'Nou'}});expect((await saved(id)).subscriptions[0].name).toBe('Nou');
 });
 it('cancel and retry preserve historical money, stop future payments/projections',async()=>{
  const id=await user();await mutateSubscription(id,clock(),'create',input('2026-10-10'));const s=(await saved(id)).subscriptions[0],request={id:s.id,revision:s.revision,operationId:crypto.randomUUID()};
  await mutateSubscription(id,clock(),'cancel',request);await mutateSubscription(id,clock(),'cancel',request);await syncSimulatorThrough(id,clock('2026-11-10'));expect(await payments(id)).toHaveLength(1);
  expect((await saved(id)).subscriptions[0]).toMatchObject({status:'cancelled'});expect((await saved(id)).subscriptions[0].cancelledAt).not.toBeNull();
  expect((await financialCalendar(id,clock('2026-11-10'),'2026-12')).days.flatMap(d=>d.items).filter(e=>e.sourceType==='subscription')).toEqual([]);
 });
 it('finite end date is inclusive and never produces later money',async()=>{
  const id=await user();await mutateSubscription(id,clock(),'create',{...input(),endsOn:'2026-11-12'});await through(id,'2026-12-12');expect((await payments(id)).map(e=>e.day)).toEqual(['2026-10-12','2026-11-12']);
 });
 it('future and past calendar reads do not write any rows or reveal future events',async()=>{
  const id=await user();await mutateSubscription(id,clock(),'create',input());const before=await saved(id);const result=await financialCalendar(id,clock(),'2029-10');await financialCalendar(id,clock(),'2026-10');expect(await saved(id)).toEqual(before);expect(JSON.stringify(result)).not.toMatch(/refKey|scheduledAt|definitionId|generationKey/);
 });
 it('legacy run without event profile also settles subscriptions exactly once',async()=>{
  const id=await user(false);await mutateSubscription(id,clock(),'create',input());await Promise.all([simulatorState(id,clock('2026-11-12')),simulatorState(id,clock('2026-11-12'))]);expect(await payments(id)).toHaveLength(2);
 });
 it('cross-owner server edit and cancel cannot access a subscription',async()=>{
  const a=await user(),b=await user();await mutateSubscription(a,clock(),'create',input());const s=(await saved(a)).subscriptions[0];
  await expect(mutateSubscription(b,clock(),'edit',{...input(),id:s.id,revision:s.revision})).rejects.toMatchObject({status:404});await expect(mutateSubscription(b,clock(),'cancel',{id:s.id,revision:s.revision,operationId:crypto.randomUUID()})).rejects.toMatchObject({status:404});expect((await saved(b)).subscriptions).toEqual([]);
 });
 it('RLS isolates owners; browser writes and private RPC execution are denied',async()=>{
  const a=await user(),b=await user();await mutateSubscription(a,clock(),'create',input());
  await db.exec('set role authenticated');
  try {
   await db.query("select set_config('request.jwt.claim.sub',$1,false)",[b]);expect((await db.query('select * from public.sim_subscriptions')).rows).toEqual([]);
   await db.query("select set_config('request.jwt.claim.sub',$1,false)",[a]);expect((await db.query('select * from public.sim_subscriptions')).rows).toHaveLength(1);
   await expect(db.exec("update public.sim_subscriptions set name='intruder'")).rejects.toThrow(/permission denied/);
   await expect(db.exec('delete from public.sim_subscriptions')).rejects.toThrow(/permission denied/);
   await expect(db.query('select public.read_simulator_state($1)',[a])).rejects.toThrow(/permission denied/);
  } finally {await db.exec('reset role');}
  await db.exec('set role anon');try {await expect(db.exec('select * from public.sim_subscriptions')).rejects.toThrow(/permission denied/);}finally {await db.exec('reset role');}
 });
 it('lost mutation response retry recovers the single saved subscription/payment',async()=>{
  const id=await user(),request=input('2026-10-10'),implementation=mock.rpc.getMockImplementation()!;
  mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>{const result=await implementation(name,args);return name==='mutate_simulator_subscription' && !result.error?{data:null,error:new Error('lost response')}:result;});
  try {await expect(mutateSubscription(id,clock(),'create',request)).rejects.toMatchObject({code:'SIMULATOR_UNAVAILABLE'});}finally {mock.rpc.mockImplementation(implementation);}
  await mutateSubscription(id,clock(),'create',request);expect((await saved(id)).subscriptions).toHaveLength(1);expect(await payments(id)).toHaveLength(1);
 });
 it('a failed immediate ledger insert rolls back subscription and operation receipt',async()=>{
  const id=await user();await expect(mutateSubscription(id,clock(),'create',{...input('2026-10-10'),name:'fail immediate'})).rejects.toMatchObject({code:'SIMULATOR_UNAVAILABLE'});
  expect((await saved(id)).subscriptions).toEqual([]);expect(await payments(id)).toEqual([]);
  expect((await db.query('select * from public.sim_subscription_operations where user_id=$1',[id])).rows).toEqual([]);
 });
 it('a failed cursor advancement rolls back payment and run/event cursor together',async()=>{
  const id=await user();await mutateSubscription(id,clock(),'create',{...input(),name:'fail cursor'});const before=await saved(id);
  await expect(syncSimulatorThrough(id,clock('2026-10-12'))).rejects.toMatchObject({code:'SIMULATOR_UNAVAILABLE'});
  expect(await saved(id)).toEqual(before);expect(await payments(id)).toEqual([]);
 });
});
