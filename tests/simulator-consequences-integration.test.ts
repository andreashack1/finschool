import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('server-only', () => ({}));
const mock=vi.hoisted(()=>({rpc:vi.fn()}));
vi.mock('../src/lib/simulator/server/database',()=>({simulatorDatabase:()=>({rpc:mock.rpc})}));
import { activateEvents, chooseEvent, eventDetail, syncSimulatorThrough } from '../src/lib/simulator/server/events';
import { loadRun } from '../src/lib/simulator/server/service';
import { planConsequenceDemo } from '../src/lib/simulator/server/consequence-demos';
import { buildSimulatorStateAt, currentStateItems, reconstructEffects } from '../src/lib/simulator/consequences/state';
import { localInstant } from '../src/lib/simulator/events/time';
import { day, fixtureRun } from './simulator-fixtures';
import { calculateBalance, settle } from '../src/lib/simulator/settle';
import { eventPolicyV1 } from '../src/content/simulator/events/policy-v1';
import type { SimulatorClock } from '../src/lib/simulator/clock';
import type { DemoScenario } from '../src/content/simulator/events/consequence-demos.server';
import type { EventInstance } from '../src/lib/simulator/events/types';
import { snapshotSchema } from '../src/lib/simulator/events/types';
import type { ConsequenceDescriptor } from '../src/lib/simulator/consequences/types';

let db:PGlite;
const signatures:Record<string,string[]>={
 read_simulator_state:['p_user'],start_simulator_run:['p_user','p_run','p_entries'],apply_simulator_settlement:['p_user','p_run','p_expected','p_through','p_entries'],
 activate_simulator_events:['p_user','p_run','p_expected','p_engine'],commit_simulator_events:['p_user','p_run','p_expected','p_settled','p_through','p_engine','p_days','p_instances','p_entries','p_now','p_development','p_operations'],
};
const clock=(minute=600,date='2026-10-10'):SimulatorClock=>({realDay:day(date),effectiveDay:day(date),offsetDays:0,effectiveNow:localInstant(day(date),minute).toISOString()});
const sqlSetup="create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema public,auth to anon,authenticated,service_role;";
async function createUser() {
 const user=crypto.randomUUID(),run={...fixtureRun('2026-10-10'),id:crypto.randomUUID(),userId:user};
 await db.query('insert into auth.users values($1)',[user]);
 const entries=settle(run,[],run.startedOn).newEntries.map(e=>({...e,runId:run.id,userId:user}));
 await db.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb)',[user,JSON.stringify(run),JSON.stringify(entries)]);
 await activateEvents(user,'liceu',clock());
 const policy=structuredClone(eventPolicyV1);for(const key of Object.keys(policy.routineChances) as (keyof typeof policy.routineChances)[])policy.routineChances[key]=0;policy.additionalChance=0;
 await db.query('update public.sim_runs set event_policy_snapshot=$1::jsonb where id=$2',[JSON.stringify(policy),run.id]);
 await syncSimulatorThrough(user,clock());return {user,runId:run.id};
}
async function demo(user:string,scenario:DemoScenario,minute=600) {
 const planned=await planConsequenceDemo(user,scenario,clock(minute));expect(planned.created).toBe(1);
 const state=await loadRun(user),instance=state!.instances.find(e=>e.definitionId===`dev_${scenario}` && e.day===day('2026-10-10'));
 if(!instance)throw new Error('fixture missing');return instance;
}
const free=(e:EventInstance)=>e.snapshot.options.find(o=>o.fallbackWhenUnaffordable)!.id;
async function fixtureConsequences(e:EventInstance, consequences:ConsequenceDescriptor[]) {
 const snapshot=snapshotSchema.parse({...e.snapshot,options:e.snapshot.options.map(o=>({...o,consequences}))});
 // Trusted test fixture authoring, before any decision; all subsequent writes
 // are the real private resolver/RPC and must preserve this saved snapshot.
 await db.query('update public.sim_event_instances set snapshot=$1::jsonb where id=$2 and status=$3',[JSON.stringify(snapshot),e.id,'pending']);
 return {...e,snapshot};
}

describe('Chapter 4 real PostgreSQL resolution/state/RLS transactions',()=>{
 beforeAll(async()=>{
  db=new PGlite();await db.exec(sqlSetup);
  for(const name of ['0003_simulator_foundation.sql','0004_simulator_events.sql','0005_simulator_consequences.sql'])await db.exec(readFileSync(`supabase/migrations/${name}`,'utf8'));
  mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>{
   // This historical fixture installs migrations through 0010: mirror PostgREST's missing-RPC response.
   if(name==='upgrade_simulator_daily_floor')return {data:null,error:{code:'PGRST202',message:'Daily floor migration not installed in historical fixture'}};

   const keys=signatures[name];if(!keys)throw new Error('Unknown RPC');
   const params=keys.map(k=>args[k]!==null && typeof args[k]==='object'?JSON.stringify(args[k]):k==='p_operations' && args[k]===undefined?'[]':args[k]);
   try {const r=await db.query<{result:unknown}>(`select public.${name}(${keys.map((_,i)=>`$${i+1}`).join(',')}) as result`,params);return {data:r.rows[0]?.result??null,error:null};}
   catch(error){return {data:null,error};}
  });
 },30000);
 afterAll(async()=>{await db.close();});
 beforeEach(()=>vi.stubEnv('NODE_ENV','development'));afterEach(()=>vi.unstubAllEnvs());
 it('free choice persists effect/operation atomically without a zero ledger, retry/network loss sees saved result',async()=>{
  const {user,runId}=await createUser(),e=await demo(user,'coverage'),before=await loadRun(user);
  const first=await chooseEvent(user,e.id,free(e),clock(615));expect(first.event.status).toBe('resolved');
  const saved=await loadRun(user);expect(saved!.ledger).toEqual(before!.ledger);expect(saved!.consequenceState.effects).toHaveLength(1);expect(saved!.consequenceState.operations).toHaveLength(1);
  expect(saved!.consequenceState.effects[0].startsAt).toBe(clock(615).effectiveNow);expect(saved!.consequenceState.effects[0].expiresAt).toBe(clock(0,'2026-10-12').effectiveNow);
  expect((await chooseEvent(user,e.id,free(e),clock(615))).event).toEqual(first.event);
  expect((await db.query('select * from public.sim_state_operations where run_id=$1',[runId])).rows).toHaveLength(1);
  expect(reconstructEffects(saved!.consequenceState.operations)).toEqual(saved!.consequenceState.effects);
 });
 it('paid choice and two simultaneous devices commit exactly one cost and consequence',async()=>{
  const {user}=await createUser(),e=await demo(user,'coverage'),before=calculateBalance((await loadRun(user))!.ledger),choice=e.snapshot.options[0];
  await Promise.all([chooseEvent(user,e.id,choice.id,clock(615)),chooseEvent(user,e.id,choice.id,clock(615))]);
  const saved=await loadRun(user);expect(calculateBalance(saved!.ledger)).toBe(before-choice.costBani);expect(saved!.ledger.filter(l=>l.refKey.includes(e.id))).toHaveLength(1);
  expect(saved!.consequenceState.effects).toHaveLength(1);expect(saved!.consequenceState.operations).toHaveLength(1);
 });
 it('lost commit response followed by retry returns the saved decision without extending twice',async()=>{
  const {user}=await createUser(),e=await demo(user,'coverage'),implementation=mock.rpc.getMockImplementation()!;
  mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>{
    const result=await implementation(name,args);
    return name==='commit_simulator_events' && Array.isArray(args.p_operations) && args.p_operations.length && !result.error ? {data:null,error:new Error('response lost after commit')} : result;
  });
  try{await expect(chooseEvent(user,e.id,free(e),clock(615))).rejects.toMatchObject({code:'SIMULATOR_UNAVAILABLE'});}finally{mock.rpc.mockImplementation(implementation);}
  const retry=await chooseEvent(user,e.id,free(e),clock(615)),saved=(await loadRun(user))!;
  expect(retry.event.status).toBe('resolved');expect(retry.conflict).toBe(false);expect(saved.consequenceState.effects).toHaveLength(1);expect(saved.consequenceState.operations).toHaveLength(1);
  expect(saved.consequenceState.effects[0].expiresAt).toBe(clock(0,'2026-10-12').effectiveNow);
 });
 it('auto resolution uses historical expiresAt, not return/record time; expired row stays in history',async()=>{
  const {user}=await createUser(),e=await demo(user,'coverage');
  const saved=await syncSimulatorThrough(user,clock(600,'2026-10-17'));
  const operation=saved!.consequenceState.operations[0],effect=saved!.consequenceState.effects[0];
  expect(operation.effectiveAt).toBe(e.expiresAt);expect(effect.startsAt).toBe(e.expiresAt);expect(operation.recordedAt).not.toBe(operation.effectiveAt);
  expect(buildSimulatorStateAt(saved!.consequenceState,clock(600,'2026-10-11').effectiveNow!).activeEffects).toHaveLength(1);
  expect(buildSimulatorStateAt(saved!.consequenceState,clock(0,'2026-10-13').effectiveNow!).activeEffects).toEqual([]);
  expect(currentStateItems(saved!.consequenceState,clock(600,'2026-10-17').effectiveNow!)).toEqual([]);
 });
 it('two-day coverage excludes a real dev planner event until expiry',async()=>{
  const {user}=await createUser(),e=await demo(user,'coverage');await chooseEvent(user,e.id,free(e),clock(615));
  const excluded=await planConsequenceDemo(user,'coverage_probe',clock(630));expect(excluded.created).toBe(0);expect(excluded.rejected.some(r=>r.reason==='excluded_effect')).toBe(true);
  const eligible=await planConsequenceDemo(user,'coverage_probe',clock(600,'2026-10-12'));expect(eligible.created).toBe(1);
 });
 it('phone flag enables repair; repair clears flag and atomically cancels another visible pending event',async()=>{
  const {user}=await createUser();expect((await planConsequenceDemo(user,'phone_resolution',clock())).created).toBe(0);
  const problem=await demo(user,'phone_problem');await chooseEvent(user,problem.id,free(problem),clock(615));
  const repair=await demo(user,'phone_resolution',630),followup=await demo(user,'phone_followup',645);
  const before=calculateBalance((await loadRun(user))!.ledger);await chooseEvent(user,repair.id,free(repair),clock(660));
  const saved=await loadRun(user),cancelled=saved!.instances.find(e=>e.id===followup.id)!;
  expect(cancelled.status).toBe('cancelled');expect(cancelled.cancelledAt).toBe(clock(660).effectiveNow);expect(cancelled.selectedOptionId).toBeNull();
  expect(saved!.consequenceState.operations).toHaveLength(2);expect(calculateBalance(saved!.ledger)).toBe(before);
  expect(buildSimulatorStateAt(saved!.consequenceState,clock(620).effectiveNow!).activeFlags.has('phone_problematic')).toBe(true);
  expect(buildSimulatorStateAt(saved!.consequenceState,clock(660).effectiveNow!).activeFlags.size).toBe(0);
  expect((await eventDetail(user,followup.id,clock(660))).event.status).toBe('cancelled');
  await syncSimulatorThrough(user,clock(600,'2026-10-11'));expect((await loadRun(user))!.consequenceState.operations).toHaveLength(2);
  expect((await db.query<{value:boolean}>('select value from public.sim_flags where run_id=$1 and flag_key=$2',[saved!.run.id,'phone_problematic'])).rows[0].value).toBe(false);
 });
 it('auto relevance cancellation applies no ledger/selection/consequences',async()=>{
  const {user}=await createUser(),problem=await demo(user,'phone_problem');await chooseEvent(user,problem.id,free(problem),clock(615));
  const repair=await demo(user,'phone_resolution',630),followup=await demo(user,'phone_followup',645);
  const saved=await syncSimulatorThrough(user,clock(600,'2026-10-11'));
  expect(saved!.instances.find(e=>e.id===repair.id)?.status).toBe('resolved');expect(saved!.instances.find(e=>e.id===followup.id)?.status).toBe('cancelled');
  expect(saved!.ledger.some(l=>l.refKey.includes(followup.id))).toBe(false);expect(saved!.consequenceState.operations.filter(o=>o.sourceInstanceId===followup.id)).toEqual([]);
 });
 it('extend and concurrent retry add two days exactly once; one logical Acum row',async()=>{
  const {user}=await createUser(),initial=await demo(user,'coverage');await chooseEvent(user,initial.id,free(initial),clock(615));
  const extension=await demo(user,'extend',630);await Promise.all([chooseEvent(user,extension.id,free(extension),clock(645)),chooseEvent(user,extension.id,free(extension),clock(645))]);
  const saved=await loadRun(user);expect(saved!.consequenceState.effects).toHaveLength(2);expect(saved!.consequenceState.effects[1].expiresAt).toBe(clock(0,'2026-10-14').effectiveNow);
  expect(currentStateItems(saved!.consequenceState,clock(645).effectiveNow!)).toHaveLength(1);expect(saved!.consequenceState.operations).toHaveLength(2);
 });
 it('simultaneous different events affecting same family serialize extensions',async()=>{
  const {user}=await createUser(),a=await demo(user,'coverage'),b=await demo(user,'extend',615);
  await Promise.all([chooseEvent(user,a.id,free(a),clock(630)),chooseEvent(user,b.id,free(b),clock(630))]);
  const saved=await loadRun(user);expect(saved!.consequenceState.effects).toHaveLength(2);expect(saved!.consequenceState.operations.map(o=>o.sequence)).toEqual([0,1]);
  expect(saved!.consequenceState.effects.map(e=>e.expiresAt).sort()).toEqual([clock(0,'2026-10-12').effectiveNow,clock(0,'2026-10-14').effectiveNow]);
 });
 it('manual/auto race yields one resolution and one application',async()=>{
  const {user}=await createUser(),e=await demo(user,'coverage');
  await Promise.allSettled([chooseEvent(user,e.id,free(e),clock(1439)),syncSimulatorThrough(user,clock(0,'2026-10-11'))]);
  const saved=await loadRun(user);expect(saved!.instances.find(x=>x.id===e.id)?.status).toBe('resolved');expect(saved!.consequenceState.operations).toHaveLength(1);expect(saved!.consequenceState.effects).toHaveLength(1);
  expect(saved!.ledger.filter(l=>l.refKey.includes(e.id)).length).toBeLessThanOrEqual(1);
 });
 it('two events setting the same flag are persisted in stable serialized order',async()=>{
  const {user}=await createUser(),a=await demo(user,'phone_problem');
  const payload=await db.query<{snapshot:EventInstance['snapshot']}>('select snapshot from public.sim_event_instances where id=$1',[a.id]);
  // A second fixture uses the real planner/materialized snapshot, not client data.
  const b=await demo(user,'coverage',615);
  const snapshot=payload.rows[0].snapshot;await db.query('update public.sim_event_instances set snapshot=jsonb_set(snapshot,\'{options}\',$1::jsonb) where id=$2',[JSON.stringify(snapshot.options.map((o,i)=>({...o,id:b.snapshot.options[i].id}))),b.id]);
  await Promise.all([chooseEvent(user,a.id,free(a),clock(630)),chooseEvent(user,b.id,b.snapshot.options[2].id,clock(630))]);
  const saved=await loadRun(user);expect(saved!.consequenceState.operations).toHaveLength(2);expect(buildSimulatorStateAt(saved!.consequenceState,clock(630).effectiveNow!).activeFlags.size).toBe(1);
 });
 it('SQL rejection after ledger/decision mutation rolls back the entire transaction',async()=>{
  const {user}=await createUser(),e=await demo(user,'coverage'),before=await loadRun(user),implementation=mock.rpc.getMockImplementation()!;
  mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>{
    if(name==='commit_simulator_events' && Array.isArray(args.p_operations) && args.p_operations.length){
      const payload=structuredClone(args);const operations=payload.p_operations;if(Array.isArray(operations))Reflect.set(operations[0],'consequenceId','injected');return implementation(name,payload);
    }return implementation(name,args);
  });
  try{await expect(chooseEvent(user,e.id,e.snapshot.options[0].id,clock(615))).rejects.toThrow();}finally{mock.rpc.mockImplementation(implementation);}
  const after=await loadRun(user);expect(after!.ledger).toEqual(before!.ledger);expect(after!.instances).toEqual(before!.instances);
  expect(after!.consequenceState).toEqual(before!.consequenceState);expect(after!.revision).toBe(before!.revision+1); // only the pre-choice sync committed
  await chooseEvent(user,e.id,e.snapshot.options[0].id,clock(615));expect((await loadRun(user))!.consequenceState.effects).toHaveLength(1);
 });
 it('missing consequence operation cannot leave a ledger-only decision',async()=>{
  const {user}=await createUser(),e=await demo(user,'coverage'),before=await loadRun(user),implementation=mock.rpc.getMockImplementation()!;
  mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>implementation(name,name==='commit_simulator_events' && Array.isArray(args.p_operations) && args.p_operations.length?{...args,p_operations:[]}:args));
  try{await expect(chooseEvent(user,e.id,e.snapshot.options[0].id,clock(615))).rejects.toThrow();}finally{mock.rpc.mockImplementation(implementation);}
  const saved=await loadRun(user);expect(saved!.ledger).toEqual(before!.ledger);expect(saved!.instances.find(x=>x.id===e.id)?.status).toBe('pending');expect(saved!.consequenceState.operations).toEqual([]);
 });
 it('cross-user detail/choice and wrong owner private commit are denied',async()=>{
  const a=await createUser(),b=await createUser(),e=await demo(a.user,'coverage');
  await expect(eventDetail(b.user,e.id,clock(615))).rejects.toMatchObject({status:404});await expect(chooseEvent(b.user,e.id,free(e),clock(615))).rejects.toMatchObject({status:404});
  await expect(db.query("select public.commit_simulator_events($1,$2,0,'2026-10-10','2026-10-10','{}','[]','[]','[]',now(),true,'[]')",[b.user,a.runId])).rejects.toThrow('owner');
 });
 it.each(['anon','authenticated'])('%s cannot write state or invoke private state commit',async role=>{
  await db.exec(`set role ${role}`);
  try{
   for(const table of ['sim_flags','sim_effects','sim_state_operations']){
    await expect(db.query(`delete from public.${table}`)).rejects.toThrow();await expect(db.query(`update public.${table} set user_id=user_id`)).rejects.toThrow();
    await expect(db.query(`insert into public.${table}(run_id,user_id) values(null,null)`)).rejects.toThrow(/permission denied/);
   }
   await expect(db.query("select public.commit_simulator_events(null,null,0,null,null,'{}','[]','[]','[]',now(),true,'[]')")).rejects.toThrow();
   await expect(db.query('select * from public.sim_state_operations')).rejects.toThrow();
  }finally{await db.exec('reset role');}
 });
 it('authenticated users read only own state projections; operations are server-only',async()=>{
  const a=await createUser(),b=await createUser(),e=await demo(a.user,'coverage');await chooseEvent(a.user,e.id,free(e),clock(615));
  const f=await demo(b.user,'phone_problem');await chooseEvent(b.user,f.id,free(f),clock(615));
  await db.query("select set_config('request.jwt.claim.sub',$1,false)",[a.user]);await db.exec('set role authenticated');
  try {const effects=(await db.query<{user_id:string}>('select * from public.sim_effects')).rows;expect(effects).toHaveLength(1);expect(effects[0].user_id).toBe(a.user);expect((await db.query('select * from public.sim_flags')).rows).toEqual([]);}
  finally{await db.exec('reset role');}
 });
 it('append-only history rejects tampering; RLS and ownership constraints exist; account cascade cleans safely',async()=>{
  const {user,runId}=await createUser(),e=await demo(user,'coverage');await chooseEvent(user,e.id,free(e),clock(615));
  await expect(db.query('update public.sim_state_operations set target_key=$1 where run_id=$2',['tamper',runId])).rejects.toThrow('append-only');
  await expect(db.query('delete from public.sim_state_operations where run_id=$1',[runId])).rejects.toThrow('append-only');
  expect((await db.query<{enabled:boolean}>("select relrowsecurity as enabled from pg_class where oid='public.sim_state_operations'::regclass")).rows[0].enabled).toBe(true);
  await db.query('delete from auth.users where id=$1',[user]);
  for(const table of ['sim_state_operations','sim_effects','sim_flags'])expect((await db.query(`select * from public.${table} where run_id=$1`,[runId])).rows).toEqual([]);
 });
 it('service-role invoker path works with restrictive history grants',async()=>{
  const {user}=await createUser(),e=await demo(user,'coverage');await db.exec('set role service_role');
  try {expect((await chooseEvent(user,e.id,free(e),clock(615))).event.status).toBe('resolved');}finally{await db.exec('reset role');}
 });
 it('future replace persists exact termination while retaining current coverage',async()=>{
  const {user}=await createUser();let first=await demo(user,'coverage');
  const descriptor=first.snapshot.options[2].consequences![0];if(descriptor.type!=='add_effect')throw new Error('fixture');
  first=await fixtureConsequences(first,[{...descriptor,overlapPolicy:'replace',durationDays:4}]);await chooseEvent(user,first.id,free(first),clock(615));
  let second=await demo(user,'extend',630);second=await fixtureConsequences(second,[{...descriptor,overlapPolicy:'replace',startOffsetDays:1}]);await chooseEvent(user,second.id,free(second),clock(645));
  const state=(await loadRun(user))!.consequenceState;expect(state.effects[0].endedAt).toBe(clock(0,'2026-10-11').effectiveNow);
  expect(buildSimulatorStateAt(state,clock(645).effectiveNow!).activeEffects).toHaveLength(1);expect(reconstructEffects(state.operations)).toEqual(state.effects);
 });
 it.each(['family','exact','missing'] as const)('real removal %s preserves historical effect and audit',async target=>{
  const {user}=await createUser(),first=await demo(user,'coverage');await chooseEvent(user,first.id,free(first),clock(615));
  const before=(await loadRun(user))!,effectKey=before.consequenceState.effects[0].effectKey;
  let removal=await demo(user,'phone_problem',630);removal=await fixtureConsequences(removal,[{id:'remove',type:'remove_effect',target:target==='family'?{familyKey:'food_coverage'}:{effectKey:target==='exact'?effectKey:'missing'}}]);
  await chooseEvent(user,removal.id,free(removal),clock(645));const state=(await loadRun(user))!.consequenceState;
  expect(state.effects).toHaveLength(1);expect(state.effects[0].endedAt).toBe(target==='missing'?null:clock(645).effectiveNow);
  expect(state.operations[1].applied).toBe(target!=='missing');expect(buildSimulatorStateAt(state,clock(620).effectiveNow!).activeEffects).toHaveLength(1);
  expect(reconstructEffects(state.operations)).toEqual(state.effects);
 });
 it('failure after the first effect operation rolls back effect, flag, history and debit',async()=>{
  const {user}=await createUser();let e=await demo(user,'coverage');const descriptors=e.snapshot.options[0].consequences!;
  e=await fixtureConsequences(e,[...descriptors,{id:'phone',type:'set_flag',key:'phone_problematic',value:true}]);
  const before=(await loadRun(user))!,implementation=mock.rpc.getMockImplementation()!;
  mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>{
   const payload=structuredClone(args);
   if(name==='commit_simulator_events' && Array.isArray(payload.p_operations) && payload.p_operations.length===2)Reflect.set(payload.p_operations[1],'consequenceId','invalid-after-first-effect');
   return implementation(name,payload);
  });
  try{await expect(chooseEvent(user,e.id,e.snapshot.options[0].id,clock(615))).rejects.toThrow();}finally{mock.rpc.mockImplementation(implementation);}
  const saved=(await loadRun(user))!;expect(saved.ledger).toEqual(before.ledger);expect(saved.consequenceState.effects).toEqual([]);expect(saved.consequenceState.operations).toEqual([]);expect(saved.flags).toEqual([]);expect(saved.instances[0].status).toBe('pending');
 });
 it('old snapshots without consequences still resolve and unknown snapshots fail without writes',async()=>{
  const {user}=await createUser();let e=await demo(user,'coverage');e=await fixtureConsequences(e,[]);
  await chooseEvent(user,e.id,free(e),clock(615));expect((await loadRun(user))!.consequenceState.operations).toEqual([]);
  const bad=await demo(user,'extend',630),before=(await loadRun(user))!;
  const invalid={...bad.snapshot,options:bad.snapshot.options.map(o=>({...o,consequences:[{id:'invalid',type:'unknown'}]}))};
  await db.query('update public.sim_event_instances set snapshot=$1::jsonb where id=$2',[JSON.stringify(invalid),bad.id]);
  await expect(chooseEvent(user,bad.id,free(bad),clock(645))).rejects.toMatchObject({code:'INVALID_SIMULATOR_CONFIG'});
  expect((await db.query('select * from public.sim_state_operations where run_id=$1',[before.run.id])).rows).toEqual([]);
  expect((await db.query<{status:string}>('select status from public.sim_event_instances where id=$1',[bad.id])).rows[0].status).toBe('pending');
  expect((await db.query('select * from public.sim_ledger where run_id=$1',[before.run.id])).rows).toHaveLength(before.ledger.length);
 });
 it('production rejects dev fixture entry before any DB operation',async()=>{
  vi.stubEnv('NODE_ENV','production');const calls=mock.rpc.mock.calls.length;
  await expect(planConsequenceDemo(crypto.randomUUID(),'coverage',clock())).rejects.toMatchObject({status:404});expect(mock.rpc.mock.calls).toHaveLength(calls);
 });
 it('migration preserves legacy effects and flags as an explicit baseline, without inventing choices',async()=>{
  const legacy=new PGlite();try{
   await legacy.exec(sqlSetup);await legacy.exec(readFileSync('supabase/migrations/0003_simulator_foundation.sql','utf8'));
   const user=crypto.randomUUID(),run={...fixtureRun('2026-10-10'),id:crypto.randomUUID(),userId:user};await legacy.query('insert into auth.users values($1)',[user]);
   const entries=settle(run,[],run.startedOn).newEntries.map(e=>({...e,runId:run.id,userId:user}));await legacy.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb)',[user,JSON.stringify(run),JSON.stringify(entries)]);
   await legacy.query("insert into public.sim_flags(run_id,user_id,flag_key,value,set_on,source_ref) values($1,$2,'legacy_phone',true,'2026-10-10','legacy-source')",[run.id,user]);
   await legacy.query("insert into public.sim_effects(run_id,user_id,effect_key,effect_type,starts_on,ends_on,value,source_ref) values($1,$2,'legacy_food','food','2026-10-10','2026-10-11','true','legacy-source')",[run.id,user]);
   for(const name of ['0004_simulator_events.sql','0005_simulator_consequences.sql'])await legacy.exec(readFileSync(`supabase/migrations/${name}`,'utf8'));
   const operations=(await legacy.query<{source_instance_id:null;payload:unknown}>('select * from public.sim_state_operations')).rows;expect(operations).toHaveLength(1);expect(operations[0].source_instance_id).toBeNull();
   const effect=(await legacy.query<{expires_at:Date;value:boolean;source_ref:string}>('select * from public.sim_effects')).rows[0];expect(new Date(effect.expires_at).toISOString()).toBe(clock(0,'2026-10-12').effectiveNow);expect(effect.value).toBe(true);expect(effect.source_ref).toBe('legacy-source');
   expect((await legacy.query('select * from public.sim_event_instances')).rows).toEqual([]);
  }finally{await legacy.close();}
 });
});
