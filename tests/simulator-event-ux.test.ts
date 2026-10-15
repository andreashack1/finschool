import { describe,it,expect,vi } from 'vitest';
vi.mock('server-only',()=>({}));
import { mkdirSync,writeFileSync } from 'node:fs';
import { catalogV2,presentationTitleAudit } from '../src/content/simulator/events/catalog-v2.server';
import { eventPolicyV2 } from '../src/content/simulator/events/policy-v2';
import { eventPolicyV3 } from '../src/content/simulator/events/policy-v3';
import { planEventDay,materializeSnapshot } from '../src/lib/simulator/events/planner';
import { engineSchema,instanceSchema,presentationSchema } from '../src/lib/simulator/events/types';
import { synchronizeEvents } from '../src/lib/simulator/events/synchronize';
import { publicEvent,resolveEvent,automaticOption,cancelIrrelevantEvent } from '../src/lib/simulator/events/resolve';
import { applyConsequences,emptyConsequenceState } from '../src/lib/simulator/consequences/state';
import { remainingSeconds } from '../app/simulator/event-countdown';
import { decisionExpiry } from '../src/lib/simulator/events/decision-policy';
import { localInstant } from '../src/lib/simulator/events/time';
import { fixtureRun,day,runId,userA } from './simulator-fixtures';
import { bani } from '../src/lib/simulator/money';
import { settle } from '../src/lib/simulator/settle';

const engine=engineSchema.parse({scheduleProfile:'liceu',startedAt:localInstant(day('2026-10-01'),0).toISOString(),catalogVersion:2,policyVersion:3,policySnapshot:eventPolicyV3,lastClosedDay:null,processedAt:null});
const input={runId,userId:userA,rngVersion:1 as const,day:day('2026-10-12'),engine,catalog:catalogV2,history:[],plannedAt:'2026-10-12T00:00:00.000Z'};
function instance(){for(let i=0;i<100;i++){const events=planEventDay({...input,runId:`00000000-0000-4000-8000-${String(i).padStart(12,'0')}`}).instances;if(events.length)return events[0];}throw new Error('No fixture event');}
describe('Targeted event experience repair',()=>{
 it('reviews all 200 definitions and persists validated curated presentation without parsing descriptions',()=>{
  const changed=presentationTitleAudit.filter(d=>d.oldTitles.some((t,i)=>t!==d.newTitles[i]));
  const report={reviewed:presentationTitleAudit.length,titlesChanged:changed.length,events:presentationTitleAudit};
  mkdirSync('artifacts/simulator-event-ux',{recursive:true});writeFileSync('artifacts/simulator-event-ux/title-audit.json',JSON.stringify(report,null,2));
  expect(report.reviewed).toBe(200);expect(changed.length).toBeGreaterThan(50);
  for(const d of catalogV2)for(const v of d.variations){const a=materializeSnapshot(runId,1,input.day,d,v),b=materializeSnapshot(runId,1,input.day,d,v);expect(a).toEqual(b);expect(presentationSchema.safeParse(a.presentation).success).toBe(true);expect(a.presentation!.bullets.length).toBeGreaterThanOrEqual(2);}
 });
 it('uses exact elapsed 30 minutes, including the Romanian DST transition',()=>{
  expect(decisionExpiry('2026-10-12T11:20:00.000Z')).toBe('2026-10-12T11:50:00.000Z');
  expect(Date.parse(decisionExpiry('2026-10-25T00:50:00.000Z'))-Date.parse('2026-10-25T00:50:00.000Z')).toBe(1800000);
  const a=instance(),b=planEventDay({...input,runId:a.runId}).instances.find(e=>e.id===a.id)!;expect(a).toEqual(b);expect(Date.parse(a.expiresAt)-Date.parse(a.scheduledAt)).toBe(1800000);
 });
 it('calibrates countdown from server time and monotonic elapsed time',()=>{const anchor={serverMs:Date.parse('2026-10-12T11:20:00Z'),receivedAt:100};expect(remainingSeconds('2026-10-12T11:50:00Z',anchor,900100)).toBe(900);expect(remainingSeconds('2026-10-12T11:50:00Z',anchor,1800100)).toBe(0);});
 it('supports legacy snapshots and preserves their original deadline',()=>{const a=instance();delete a.snapshot.presentation;a.expiresAt=localInstant(day('2026-10-13'),0).toISOString();expect(instanceSchema.parse(a).expiresAt).toBe(a.expiresAt);expect(publicEvent(a,bani(100000),[a],engine).title).toBe(a.snapshot.title);});
 it('records result balance once and keeps zero-balance auto choices affordable',()=>{const a=instance(),chosen=automaticOption(a,bani(0),[a],engine,1);const result=resolveEvent(a,chosen,'automatic',a.expiresAt,bani(0),[a],engine,0);expect(result.entry).toBeNull();expect(result.instance.balanceAfterChoiceBani).toBe(0);expect(result.instance.selectedCostBani).toBe(0);expect(automaticOption(a,bani(0),[a],engine,1)).toBe(chosen);});
 it('matches background periodic processing with closed-app catch-up, including ledger ordering, effects and flags',()=>{
  const run={...fixtureRun('2026-10-01'),id:runId,userId:userA};
  const start={run,ledger:settle(run,[],run.startedOn).newEntries,engine,instances:[],days:[],revision:0};
  let periodic=start as Parameters<typeof synchronizeEvents>[0];
  for(let d=1;d<=4;d++)for(const minute of [0,600,900,1200,1439])periodic=synchronizeEvents(periodic,localInstant(day(`2026-10-${String(d).padStart(2,'0')}`),minute),catalogV2,false,'2026-10-05T12:00:00Z');
  const lazy=synchronizeEvents(start,localInstant(day('2026-10-04'),1439),catalogV2,false,'2026-10-05T12:00:00Z');
  expect(periodic.ledger).toEqual(lazy.ledger);expect(periodic.consequenceState).toEqual(lazy.consequenceState);expect(periodic.subscriptions).toEqual(lazy.subscriptions);
  const canonical=(events:typeof lazy.instances)=>events.map(e=>({...e,createdAt:undefined}));expect(canonical(periodic.instances)).toEqual(canonical(lazy.instances));
 });
 it('keeps an old policy snapshot on already-planned days while the next day uses the new window',()=>{
  const a=instance(),legacy={...engine,policyVersion:2 as const,policySnapshot:eventPolicyV2};
  const old=planEventDay({...input,engine:legacy,runId:a.runId}).instances;expect(old.every(e=>e.expiresAt===localInstant(day('2026-10-13'),0).toISOString())).toBe(true);
  expect(old.map(e=>e.snapshot.options)).toEqual(planEventDay({...input,engine:legacy,runId:a.runId}).instances.map(e=>e.snapshot.options));
 });
 it('uses the same canonical cancellation time even when a state requirement later returns',()=>{
  const a=instance();a.scheduledAt='2026-10-12T11:10:00.000Z';a.expiresAt='2026-10-12T11:40:00.000Z';a.snapshot.relevance=[{requiredFlags:['phone_problematic']}];
  let state=emptyConsequenceState();
  const change=(time:string,set:boolean)=>{state=applyConsequences({state,instanceId:runId,optionId:'choice_'+time.replace(/[^0-9]/g,''),effectiveAt:time,recordedAt:time,consequences:set?[{id:'set',type:'set_flag',key:'phone_problematic',value:true}]:[{id:'clear',type:'clear_flag',key:'phone_problematic'}]}).state;};
  change('2026-10-12T10:00:00.000Z',true);change('2026-10-12T11:00:00.000Z',false);
  const periodic=cancelIrrelevantEvent(a,state,'2026-10-12T11:20:00.000Z');change('2026-10-12T11:25:00.000Z',true);
  const lazy=cancelIrrelevantEvent(a,state,a.expiresAt);expect(lazy).toEqual(periodic);expect(lazy?.cancelledAt).toBe(a.scheduledAt);
 });
});
