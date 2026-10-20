import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { beforeAll, afterAll, describe, it, expect, vi } from 'vitest';
vi.mock('server-only',()=>({}));
const mock=vi.hoisted(()=>({rpc:vi.fn()}));
vi.mock('../src/lib/simulator/server/database',()=>({simulatorDatabase:()=>({rpc:mock.rpc})}));
import { syncSimulatorThrough } from '../src/lib/simulator/server/events';
import { loadRun } from '../src/lib/simulator/server/service';
import { eventPolicyV3 } from '../src/content/simulator/events/policy-v3';
import { eventPolicyV4 } from '../src/content/simulator/events/policy-v4';
import { catalogV2 } from '../src/content/simulator/events/catalog-v2.server';
import { engineSchema } from '../src/lib/simulator/events/types';
import { planEventDay } from '../src/lib/simulator/events/planner';
import { localInstant } from '../src/lib/simulator/events/time';
import { settle } from '../src/lib/simulator/settle';
import { day, fixtureRun } from './simulator-fixtures';
import type { SimulatorClock } from '../src/lib/simulator/clock';

let db:PGlite;
const date=day('2026-10-19'),at=localInstant(date,905).toISOString();
const clock:SimulatorClock={realDay:date,effectiveDay:date,offsetDays:0,effectiveNow:at};
const signatures:Record<string,string[]>={
 read_simulator_state:['p_user'],
 upgrade_simulator_daily_floor:['p_user','p_run','p_expected','p_day','p_now','p_development','p_policy'],
 commit_simulator_events:['p_user','p_run','p_expected','p_settled','p_through','p_engine','p_days','p_instances','p_entries','p_now','p_development','p_operations','p_subscriptions'],
};
async function account(count:number){
 const run={...fixtureRun(date),id:crypto.randomUUID(),userId:crypto.randomUUID()},ledger=settle(run,[],date).newEntries;
 await db.query('insert into auth.users values($1)',[run.userId]);
 await db.query('select start_simulator_run($1,$2::jsonb,$3::jsonb)',[run.userId,JSON.stringify(run),JSON.stringify(ledger.map(e=>({...e,runId:run.id,userId:run.userId})))]);
 const engine=engineSchema.parse({scheduleProfile:'liceu',startedAt:localInstant(date,0).toISOString(),catalogVersion:2,policyVersion:3,policySnapshot:eventPolicyV3,lastClosedDay:null,processedAt:null});
 await db.query('select activate_simulator_events($1,$2,$3,$4::jsonb)',[run.userId,run.id,date,JSON.stringify(engine)]);
 const instances=planEventDay({runId:run.id,userId:run.userId,rngVersion:1,day:date,engine,catalog:catalogV2,history:[],plannedAt:engine.startedAt}).instances.filter(e=>e.scheduledAt>at).slice(0,count);
 // Guarantee the one-instance fixture independently of the legacy probability draw.
 if(count===1 && !instances.length){
  const d=catalogV2.find(d=>d.id==='home_group_meal')!;
  const { materializeSnapshot }=await import('../src/lib/simulator/events/planner');
  instances.push({id:crypto.randomUUID(),runId:run.id,userId:run.userId,day:date,definitionId:d.id,definitionVersion:d.version,familyId:d.familyId,variationId:d.variations[0].id,scheduledAt:localInstant(date,1100).toISOString(),expiresAt:localInstant(date,1130).toISOString(),snapshotVersion:1,snapshot:materializeSnapshot(run.id,1,date,d,d.variations[0]),status:'pending',resolutionMode:null,selectedOptionId:null,selectedCostBani:null,feedbackSnapshot:null,resolvedAt:null,activityStartAt:null,activityEndAt:null,generationKey:'v2:p3:fixture-home',cancelReason:null,createdAt:engine.startedAt});
 }
 const marker={day:date,catalogVersion:2,policyVersion:3,plannedAt:engine.startedAt,closedAt:null,eventCount:count};
 const current=(await loadRun(run.userId))!;expect(current.engine).not.toBeNull();
 const result=await mock.rpc('commit_simulator_events',{p_user:run.userId,p_run:run.id,p_expected:current.revision,p_settled:date,p_through:date,p_engine:engine,p_days:[marker],p_instances:instances,p_entries:[],p_now:at,p_development:true});
 expect(result.error).toBeNull();expect(result.data).toEqual({status:'applied'});return {run,instances};
}
describe('Daily floor PostgreSQL upgrade, CAS and immutable history',()=>{
 beforeAll(async()=>{
  vi.stubEnv('NODE_ENV','development');db=new PGlite();
  await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;");
  for(const file of ['0003_simulator_foundation.sql','0004_simulator_events.sql','0005_simulator_consequences.sql','0006_simulator_subscriptions.sql','0007_simulator_life_catalog.sql','0008_simulator_monthly_reviews.sql','0009_simulator_notifications.sql','0010_simulator_decision_policy.sql','0012_simulator_savings_goal.sql','0013_simulator_daily_floor.sql'])await db.exec(readFileSync('supabase/migrations/'+file,'utf8'));
  mock.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>{
   const keys=signatures[name];if(!keys)throw new Error('Unexpected RPC '+name);
   const params=keys.map(k=>args[k]===undefined?(k==='p_operations'||k==='p_subscriptions'?'[]':null):typeof args[k]==='object'&&args[k]!==null?JSON.stringify(args[k]):args[k]);
   try{const r=await db.query<{result:unknown}>(`select ${name}(${keys.map((_,i)=>'$'+(i+1)).join(',')}) as result`,params);return {data:r.rows[0].result,error:null};}catch(error){return {data:null,error};}
  });
 },30000);
 afterAll(async()=>{await db.close();vi.unstubAllEnvs();});
 it.each([0,1])('upgrades and tops up %i saved events exactly once across devices',async count=>{
  const {run,instances}=await account(count),before=(await loadRun(run.userId))!;
  await Promise.all([syncSimulatorThrough(run.userId,clock),syncSimulatorThrough(run.userId,clock)]);
  const saved=(await loadRun(run.userId))!;
  expect(saved.engine!.policyVersion).toBe(4);expect(saved.engine!.catalogVersion).toBe(3);
  expect(saved.instances.filter(e=>e.status!=='cancelled').length).toBeGreaterThanOrEqual(2);
  expect(saved.days[0].eventCount).toBe(saved.instances.filter(e=>e.status!=='cancelled').length);
  for(const old of instances)expect(saved.instances.find(e=>e.id===old.id)).toEqual(old);
  expect(saved.instances.filter(e=>!instances.some(old=>old.id===e.id)).every(e=>e.scheduledAt>at)).toBe(true);
  expect(saved.ledger).toEqual(before.ledger);
  await syncSimulatorThrough(run.userId,clock);
  expect((await loadRun(run.userId))!.instances).toEqual(saved.instances);
  expect((await loadRun(run.userId))!.ledger).toEqual(saved.ledger);
 });
 it('preserves closed historical markers and rejects foreign/stale/browser upgrades',async()=>{
  const {run}=await account(0),saved=(await loadRun(run.userId))!;
  const oldDay='2026-10-15';await db.query('insert into sim_event_days values($1,$2,$3,2,3,$4,$4,0)',[run.id,run.userId,oldDay,at]);
  const args={p_user:run.userId,p_run:run.id,p_expected:saved.revision,p_day:date,p_now:at,p_development:true,p_policy:eventPolicyV4};
  expect((await mock.rpc('upgrade_simulator_daily_floor',{...args,p_user:crypto.randomUUID()})).error).toBeTruthy();
  expect((await mock.rpc('upgrade_simulator_daily_floor',{...args,p_expected:saved.revision-1})).data).toEqual({status:'conflict'});
  await syncSimulatorThrough(run.userId,clock);
  expect((await loadRun(run.userId))!.days.find(d=>d.day===oldDay)).toMatchObject({catalogVersion:2,policyVersion:3,eventCount:0,closedAt:at});
  const privilege=await db.query<{allowed:boolean}>("select has_function_privilege('authenticated','public.upgrade_simulator_daily_floor(uuid,uuid,bigint,date,timestamptz,boolean,jsonb)','EXECUTE') as allowed");
  expect(privilege.rows[0].allowed).toBe(false);
 });
});
