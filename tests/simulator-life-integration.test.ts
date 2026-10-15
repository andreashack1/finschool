import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { beforeAll,afterAll,describe,it,expect,vi } from 'vitest';
vi.mock('server-only',()=>({}));
const mock=vi.hoisted(()=>({rpc:vi.fn()}));
vi.mock('../src/lib/simulator/server/database',()=>({simulatorDatabase:()=>({rpc:mock.rpc})}));
import { simulatorPageState } from '../src/lib/simulator/server/chapter-two';
import { activateEvents,syncSimulatorThrough,chooseEvent,eventDetail } from '../src/lib/simulator/server/events';
import { loadRun } from '../src/lib/simulator/server/service';
import { fixtureRun,day } from './simulator-fixtures';
import { settle } from '../src/lib/simulator/settle';
import { localInstant } from '../src/lib/simulator/events/time';
import { eventPolicyV2 } from '../src/content/simulator/events/policy-v2';
import { eventPolicyV3 } from '../src/content/simulator/events/policy-v3';

import { mutateSubscription,financialCalendar } from '../src/lib/simulator/server/subscriptions';
import type { SimulatorClock } from '../src/lib/simulator/clock';
let db:PGlite;
const clock=(d='2026-10-10'):SimulatorClock=>({realDay:day(d),effectiveDay:day(d),offsetDays:0,effectiveNow:localInstant(day(d),600).toISOString()});
const signatures:Record<string,string[]>={upgrade_simulator_decisions:["p_user","p_run","p_expected","p_day","p_now","p_development","p_policy"],read_simulator_state:['p_user'],start_simulator_run:['p_user','p_run','p_entries'],activate_simulator_events:['p_user','p_run','p_expected','p_engine'],apply_simulator_settlement:['p_user','p_run','p_expected','p_through','p_entries','p_subscriptions','p_revision'],commit_simulator_events:['p_user','p_run','p_expected','p_settled','p_through','p_engine','p_days','p_instances','p_entries','p_now','p_development','p_operations','p_subscriptions'],upgrade_simulator_life:['p_user','p_run','p_expected','p_day','p_now','p_development','p_policy'],mutate_simulator_subscription:['p_user','p_run','p_expected','p_day','p_now','p_development','p_action','p_operation','p_subscription','p_entries']};
async function user(){const id=crypto.randomUUID(),run={...fixtureRun('2026-10-10'),id:crypto.randomUUID(),userId:id};await db.query('insert into auth.users values($1)',[id]);await db.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb)',[id,JSON.stringify(run),JSON.stringify(settle(run,[],run.startedOn).newEntries.map(e=>({...e,runId:run.id,userId:id})))]);await activateEvents(id,'liceu',clock());await syncSimulatorThrough(id,clock());return id;}
const saved=async(id:string)=>{const state=await loadRun(id);if(!state?.engine)throw new Error('Missing engine');return state;};
describe('Chapter 6 safe upgrade in real PostgreSQL',()=>{
 beforeAll(async()=>{vi.stubEnv('NODE_ENV','development');db=new PGlite();await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;");for(const f of ['0003_simulator_foundation.sql','0004_simulator_events.sql','0005_simulator_consequences.sql','0006_simulator_subscriptions.sql','0007_simulator_life_catalog.sql','0010_simulator_decision_policy.sql'])await db.exec(readFileSync(`supabase/migrations/${f}`,'utf8'));mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>{try{const keys=signatures[name];if(!keys)throw new Error(`Unexpected RPC ${name}`);const params=keys.map(k=>args[k]===undefined?(k==='p_operations'||k==='p_subscriptions'?'[]':null):args[k]!==null&&typeof args[k]==='object'?JSON.stringify(args[k]):args[k]);const r=await db.query<{result:unknown}>(`select public.${name}(${keys.map((_,i)=>`$${i+1}`).join(',')}) as result`,params);return {data:r.rows[0]?.result,error:null};}catch(error){return {data:null,error};}});},30000);
 afterAll(async()=>{await db.close();vi.unstubAllEnvs();});
 it('starts a new life engine directly with v2 without retroactive events',async()=>{const id=crypto.randomUUID(),run={...fixtureRun('2026-10-10'),id:crypto.randomUUID(),userId:id};await db.query('insert into auth.users values($1)',[id]);await db.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb)',[id,JSON.stringify(run),JSON.stringify(settle(run,[],run.startedOn).newEntries.map(e=>({...e,runId:run.id,userId:id})))]);await activateEvents(id,'lucrez',clock(),2);await syncSimulatorThrough(id,clock());const a=await saved(id);expect(a.engine!.catalogVersion).toBe(2);expect(a.days[0].catalogVersion).toBe(2);expect(a.instances.every(e=>e.scheduledAt>=a.engine!.startedAt && Boolean(e.snapshot.life))).toBe(true);});
 it('upgrades on dashboard after catch-up without changing existing snapshots or money',async()=>{const id=await user(),before=await saved(id);await simulatorPageState(id,clock());const after=await saved(id);expect(after.engine!.catalogVersion).toBe(2);expect(after.engine!.startedAt).toBe(before.engine!.startedAt);expect(after.instances).toEqual(before.instances);expect(after.days).toEqual(before.days);expect(after.ledger).toEqual(before.ledger);expect(after.engine!.policySnapshot.version).toBe(2);if(after.engine!.policySnapshot.version===2)expect(after.engine!.policySnapshot.upgrade!.startsOn).toBe('2026-10-11');});
 it('retains today as v1 and plans next day as v2 exactly once across two devices',async()=>{const id=await user();await simulatorPageState(id,clock());await Promise.all([syncSimulatorThrough(id,clock('2026-10-11')),syncSimulatorThrough(id,clock('2026-10-11'))]);const a=await saved(id);expect(a.days.map(d=>[d.day,d.catalogVersion])).toEqual([['2026-10-10',1],['2026-10-11',2]]);const count=a.instances.length;await syncSimulatorThrough(id,clock('2026-10-11'));expect((await saved(id)).instances).toHaveLength(count);});
 it('concurrent transition is idempotent and rejects stale revisions',async()=>{const id=await user(),a=await saved(id),args={p_user:id,p_run:a.run.id,p_expected:a.revision,p_day:'2026-10-10',p_now:clock().effectiveNow,p_development:true,p_policy:eventPolicyV2};expect((await mock.rpc('upgrade_simulator_life',{...args,p_expected:a.revision-1})).data).toEqual({status:'conflict'});const results=await Promise.all([mock.rpc('upgrade_simulator_life',args),mock.rpc('upgrade_simulator_life',args)]);expect(results.every(r=>r.data.status==='applied')).toBe(true);expect((await saved(id)).revision).toBe(a.revision+1);});
 it('does not reinterpret already-persisted future plans',async()=>{const id=await user(),a=await saved(id);await db.query('insert into public.sim_event_days values($1,$2,$3,1,1,$4,null,0)',[a.run.id,id,'2026-10-12',clock().effectiveNow]);await simulatorPageState(id,clock());const b=await saved(id);if(b.engine!.policySnapshot.version!==2)throw new Error('Expected v2');expect(b.engine!.policySnapshot.upgrade!.startsOn).toBe('2026-10-13');await syncSimulatorThrough(id,clock('2026-10-13'));const c=await saved(id);expect(c.days.find(d=>d.day==='2026-10-11')!.catalogVersion).toBe(1);expect(c.days.find(d=>d.day==='2026-10-12')!.eventCount).toBe(0);expect(c.days.find(d=>d.day==='2026-10-13')!.catalogVersion).toBe(2);});
 it('never retroactively upgrades absent historical days',async()=>{const id=await user();await simulatorPageState(id,clock('2026-10-20'));const a=await saved(id);expect(a.days.every(d=>d.catalogVersion===1)).toBe(true);if(a.engine!.policySnapshot.version!==2)throw new Error('Expected v2');expect(a.engine!.policySnapshot.upgrade!.startsOn).toBe('2026-10-21');});
 it('keeps subscriptions and read-only calendar untouched by life planning',async()=>{const id=await user();await simulatorPageState(id,clock());await mutateSubscription(id,clock(),'create',{operationId:crypto.randomUUID(),name:'GYM Sala',amount:'300',intervalMonths:1,nextDueOn:'2026-10-12'});await syncSimulatorThrough(id,clock('2026-10-12'));const a=await saved(id);expect(a.ledger.filter(l=>l.kind==='abonament')).toHaveLength(1);const before=JSON.stringify(a);await financialCalendar(id,clock('2026-10-12'),'2026-12');expect(JSON.stringify(await saved(id))).toBe(before);});
 it('owner isolation and SQL privileges block foreign or browser upgrades',async()=>{const id=await user(),a=await saved(id);const args={p_user:crypto.randomUUID(),p_run:a.run.id,p_expected:a.revision,p_day:'2026-10-10',p_now:clock().effectiveNow,p_development:true,p_policy:eventPolicyV2};expect((await mock.rpc('upgrade_simulator_life',args)).error).toBeTruthy();const r=await db.query<{allowed:boolean}>("select has_function_privilege('authenticated','public.upgrade_simulator_life(uuid,uuid,bigint,date,timestamptz,boolean,jsonb)','EXECUTE') as allowed");expect(r.rows[0].allowed).toBe(false);});
 it('keeps the simulator usable when the decision migration has not been installed',async()=>{
  const id=await user();await simulatorPageState(id,clock());const before=await saved(id);
  expect(before.engine!.policyVersion).toBe(2);
  const original=mock.rpc.getMockImplementation()!;
  mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>name==='upgrade_simulator_decisions'?{data:null,error:{code:'PGRST202',message:'Function missing from schema cache'}}:original(name,args));
  try {
   const page=await simulatorPageState(id,clock('2026-10-11'));
   expect(page).toBeTruthy();const after=await saved(id);
   expect(after.engine!.policyVersion).toBe(2);expect(after.run.lastSettledOn).toBe('2026-10-11');
   for(const instance of before.instances){const persisted=after.instances.find(e=>e.id===instance.id)!;expect(persisted.snapshot).toEqual(instance.snapshot);expect(persisted.expiresAt).toBe(instance.expiresAt);expect(persisted.status).toBe('resolved');expect(persisted.resolutionMode).toBe('automatic');}
   const repeated=await syncSimulatorThrough(id,clock('2026-10-11'));
   expect(repeated!.caughtUp).toBe(true);expect((await saved(id)).ledger).toEqual(after.ledger);
  } finally {mock.rpc.mockImplementation(original);}
  await syncSimulatorThrough(id,clock('2026-10-11'));expect((await saved(id)).engine!.policyVersion).toBe(3);
 });
 it('does not suppress permission errors from the decision upgrade',async()=>{
  const id=await user();await simulatorPageState(id,clock());const original=mock.rpc.getMockImplementation()!;
  mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>name==='upgrade_simulator_decisions'?{data:null,error:{code:'42501',message:'Permission denied'}}:original(name,args));
  try {await expect(syncSimulatorThrough(id,clock())).rejects.toMatchObject({code:'SIMULATOR_UNAVAILABLE'});}
  finally {mock.rpc.mockImplementation(original);}
 });
 it('decision policy upgrade preserves legacy instances, is owner-safe and starts after persisted plans',async()=>{
  const id=await user();await simulatorPageState(id,clock());const before=await saved(id);
  await syncSimulatorThrough(id,clock());const after=await saved(id);
  expect(after.engine!.policyVersion).toBe(3);expect(after.instances).toEqual(before.instances);expect(after.ledger).toEqual(before.ledger);expect(after.days).toEqual(before.days);
  const release=(await db.query<{day:string}>('select decision_policy_available_on::text as day from sim_runs where user_id=$1',[id])).rows[0].day;
  if(after.engine!.policySnapshot.version!==3)throw new Error('Expected decision policy 3');expect(after.engine!.policySnapshot.decisionUpgrade!.startsOn).toBe(release>'2026-10-11'?release:'2026-10-11');
  const foreign=await mock.rpc('upgrade_simulator_decisions',{p_user:crypto.randomUUID(),p_run:after.run.id,p_expected:after.revision,p_day:'2026-10-10',p_now:clock().effectiveNow,p_development:true,p_policy:eventPolicyV3});expect(foreign.error).toBeTruthy();
  const permissions=await db.query<{allowed:boolean}>("select has_function_privilege('authenticated','public.upgrade_simulator_decisions(uuid,uuid,bigint,date,timestamptz,boolean,jsonb)','EXECUTE') as allowed");expect(permissions.rows[0].allowed).toBe(false);
 });
 it('accepts a decision at +29 minutes, persists result balance, and auto-resolves exactly at +30 under concurrent requests',async()=>{
  const id=await user();await simulatorPageState(id,clock());await syncSimulatorThrough(id,clock());
  const policy={...eventPolicyV3,opportunityChances:Object.fromEntries(Object.keys(eventPolicyV3.opportunityChances).map(k=>[k,1]))};
  await db.query('update public.sim_runs set event_policy_snapshot=$1::jsonb where user_id=$2',[JSON.stringify(policy),id]);
  const planned=await syncSimulatorThrough(id,{...clock('2026-10-11'),effectiveNow:localInstant(day('2026-10-11'),0).toISOString()});const events=planned!.instances.filter(e=>e.day==='2026-10-11').sort((a,b)=>a.scheduledAt.localeCompare(b.scheduledAt));expect(events.length).toBeGreaterThan(1);
  const at=(iso:string):SimulatorClock=>({...clock('2026-10-11'),effectiveNow:iso});
  const a=events[0],half=await eventDetail(id,a.id,at(new Date(Date.parse(a.scheduledAt)+29*60000).toISOString()));expect(half.event.status).toBe('pending');expect(Date.parse(a.expiresAt)-Date.parse(a.scheduledAt)).toBe(1800000);
  const free=half.event.options.find(o=>o.costBani===0)!;const manual=await chooseEvent(id,a.id,free.id,at(half.serverNow));expect(manual.event.resolutionMode).toBe('manual');expect(manual.event.balanceAfterChoiceBani).toBe(manual.balanceBani);
  const b=events[1];await Promise.all([chooseEvent(id,b.id,b.snapshot.options[0].id,at(b.expiresAt)),syncSimulatorThrough(id,at(b.expiresAt))]);const result=await eventDetail(id,b.id,at(b.expiresAt));expect(result.event.resolutionMode).toBe('automatic');
  const balance=manual.event.balanceAfterChoiceBani;const final=await saved(id);expect(final.instances.find(e=>e.id===a.id)!.balanceAfterChoiceBani).toBe(balance);expect(final.ledger.filter(e=>e.refKey===`${b.runId}:event:${b.id}:cost`).length).toBeLessThanOrEqual(1);
 });
});
