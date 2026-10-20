import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import EventsToday from '../app/simulator/event-area';
import { publicEvent, resolveEvent } from '../src/lib/simulator/events/resolve';
import { bani } from '../src/lib/simulator/money';
vi.mock('server-only',()=>({}));
import { catalogV2 } from '../src/content/simulator/events/catalog-v2.server';
import { catalogV3, lifeEditorialV3 } from '../src/content/simulator/events/catalog-v3.server';
import { eventPolicyV3 } from '../src/content/simulator/events/policy-v3';
import { eventPolicyV4 } from '../src/content/simulator/events/policy-v4';
import { lifeProfileConfig, lifeProfilePresets } from '../src/content/simulator/life-profile-config';
import { planEventDay } from '../src/lib/simulator/events/planner';
import { planningEngineForDay } from '../src/lib/simulator/events/decision-policy';
import { synchronizeEvents } from '../src/lib/simulator/events/synchronize';
import { localInstant, occupiedSchedule, intervalFits } from '../src/lib/simulator/events/time';
import { lifeProfileEventReason } from '../src/lib/simulator/events/profile-context';
import { engineSchema, eventAreaSchema, type EventInstance } from '../src/lib/simulator/events/types';
import { addDays } from '../src/lib/simulator/calendar';
import type { LifeProfile } from '../src/lib/simulator/life-profile';
import { settle } from '../src/lib/simulator/settle';
import { day, fixtureRun, runId, userA } from './simulator-fixtures';

const profiles:LifeProfile[]=(['liceu','lucrez'] as const).flatMap(activityStatus=>(['parinti','chirie'] as const).map(housingStatus=>({version:1,activityStatus,housingStatus,transportMode:'public'})));
const date=day('2026-10-19');
const engine=(p:LifeProfile,start=localInstant(date,0).toISOString())=>engineSchema.parse({scheduleProfile:p.activityStatus,startedAt:start,catalogVersion:3,policyVersion:4,policySnapshot:{...eventPolicyV4,profiles:lifeProfilePresets.schedules},lastClosedDay:null,processedAt:null});
const input=(p=profiles[0])=>({runId,userId:userA,rngVersion:1 as const,day:date,engine:engine(p),lifeProfile:p,catalog:catalogV3,history:[] as EventInstance[],plannedAt:localInstant(date,0).toISOString()});

describe('Policy 4 deterministic daily floor',()=>{
 it.each(profiles)('full days, recent history and both weekends: $activityStatus $housingStatus',p=>{
  const counts:number[]=[];
  for(let seed=0;seed<3;seed++){
   const history:EventInstance[]=[];
   for(let offset=0;offset<21;offset++){
    const d=addDays(date,offset),request={...input(p),runId:`floor-seed-${seed}`,day:d,history};
    const result=planEventDay(request).instances;
    expect(result.length,`${p.activityStatus} ${d} seed ${seed}`).toBeGreaterThanOrEqual(2);
    expect(result).toEqual([...result].sort((a,b)=>a.scheduledAt.localeCompare(b.scheduledAt)||a.generationKey.localeCompare(b.generationKey)));
    const occupied=occupiedSchedule(d,p.activityStatus,request.engine.policySnapshot);
    for(const e of result){
     const definition=catalogV3.find(c=>c.id===e.definitionId)!;
     const minute=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Bucharest',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(e.scheduledAt)).split(':').reduce((n,x,i)=>n+Number(x)*(i?1:60),0));
     expect(lifeProfileEventReason(definition,p,occupied,minute)).toBeNull();
     for(const o of e.snapshot.options)expect(intervalFits(d,e.scheduledAt,o.durationMinutes,p.activityStatus,request.engine.policySnapshot)).toBe(true);
     expect(Date.parse(e.expiresAt)-Date.parse(e.scheduledAt)).toBe(30*60000);
     expect(history.some(old=>old.definitionId===e.definitionId && Number((Date.parse(d)-Date.parse(old.day))/86400000)<definition.rules.cooldownDays)).toBe(false);
    }
    counts.push(result.length);history.push(...result);
   }
  }
  expect(counts.some(n=>n>2)).toBe(true);
 },120000);
 it.each(profiles)('15:05 first activation: $activityStatus $housingStatus',p=>{
  const start=localInstant(date,905).toISOString(),request={...input(p),engine:engine(p,start)};
  for(let seed=0;seed<12;seed++){
   const result=planEventDay({...request,runId:`afternoon-${seed}`}).instances;
   expect(result.length).toBeGreaterThanOrEqual(2);
   expect(result.every(e=>e.scheduledAt>=start)).toBe(true);
  }
 },60000);
 it('completes quiet opportunities with distinct domains and stays catalog-order independent',()=>{
  const request=input();if(request.engine.policySnapshot.version!==4)throw new Error();
  for(const key of Object.keys(request.engine.policySnapshot.opportunityChances) as (keyof typeof request.engine.policySnapshot.opportunityChances)[])request.engine.policySnapshot.opportunityChances[key]=0;
  const result=planEventDay(request);
  expect(result.instances).toHaveLength(2);
  expect(new Set(result.instances.map(e=>e.snapshot.life!.domain)).size).toBe(2);
  expect(result).toEqual(planEventDay({...request,catalog:[...catalogV3].reverse()}));
 });
 it('does not invent past opportunities for a genuinely late start',()=>{
  const start=localInstant(date,1430).toISOString(),result=planEventDay({...input(),engine:engine(profiles[0],start)});
  expect(result.instances.every(e=>e.scheduledAt>=start)).toBe(true);
  expect(result.instances.length).toBeLessThan(2);
  expect(planEventDay({...input(),engine:engine(profiles[0],start),day:addDays(date,1)}).instances.length).toBeGreaterThanOrEqual(2);
 });
 it('uses only curated at-home decisions when ordinary evening slots have passed',()=>{
  for(const minute of [1265,1320,1360])for(let seed=0;seed<8;seed++){
   const start=localInstant(date,minute).toISOString(),result=planEventDay({...input(),runId:`late-${seed}`,engine:engine(profiles[0],start)}).instances;
   expect(result.length).toBeGreaterThanOrEqual(2);
   expect(result.every(e=>e.scheduledAt>=start&&e.expiresAt<localInstant(addDays(date,1),0).toISOString())).toBe(true);
   expect(result.every(e=>eventPolicyV4.evergreenDefinitionIds.includes(e.definitionId))).toBe(true);
   expect(new Set(result.map(e=>e.definitionId)).size).toBe(result.length);
  }
 });
 it.each([0,1])('repairs a saved %i-event active day once and preserves snapshots',count=>{
  const request=input(),run=fixtureRun(date,lifeProfileConfig(profiles[0]),'parinti'),first=settle(run,[],date);
  run.lastSettledOn=date;
  const old=planEventDay(request).instances.slice(0,count);
  const marker={day:date,catalogVersion:2 as const,policyVersion:3 as const,plannedAt:request.plannedAt,closedAt:null,eventCount:count};
  const state={run,ledger:first.newEntries,engine:request.engine,instances:old,days:[marker],revision:1};
  const now=localInstant(date,905),a=synchronizeEvents(state,now,catalogV3),b=synchronizeEvents(a,now,catalogV3);
  expect(a.instances.filter(e=>e.status!=='cancelled').length).toBeGreaterThanOrEqual(2);
  expect(a.newInstances.every(e=>e.scheduledAt>now.toISOString())).toBe(true);
  for(const e of old){const saved=a.instances.find(x=>x.id===e.id)!;expect(saved.snapshot).toEqual(e.snapshot);expect(saved.scheduledAt).toBe(e.scheduledAt);expect(saved.generationKey).toBe(e.generationKey);}
  expect(b.newInstances).toEqual([]);expect(b.newEntries).toEqual([]);expect(b.instances).toEqual(a.instances);expect(b.days).toEqual(a.days);
  expect(a.days[0].eventCount).toBe(a.instances.filter(e=>e.status!=='cancelled').length);
 });
 it('replaces a cancelled opportunity without reusing its generation key',()=>{
  const request=input(),planned=planEventDay(request).instances;
  const history=planned.map((e,index)=>index?e:{...e,status:'cancelled' as const,cancelReason:'state_changed'});
  const result=planEventDay({...request,history,floorOnly:true,notBefore:localInstant(date,905).toISOString()});
  expect(result.instances.length).toBeGreaterThanOrEqual(1);
  expect(result.instances.every(e=>!history.some(old=>old.generationKey===e.generationKey))).toBe(true);
 });
 it('resolves old policy/catalog inputs before the civil cutover',()=>{
  const e=engine(profiles[0]);e.policySnapshot={...eventPolicyV4,floorUpgrade:{startsOn:day('2026-10-16'),previousCatalogVersion:2,previousPolicy:eventPolicyV3}};
  expect(planningEngineForDay(e,day('2026-10-15'))).toMatchObject({catalogVersion:2,policyVersion:3,policySnapshot:eventPolicyV3});
  expect(planningEngineForDay(e,day('2026-10-16'))).toMatchObject({catalogVersion:3,policyVersion:4});
 });
});

describe('Versioned active catalog editorial quality',()=>{
 it('renders resolved and pending rows together in canonical time order',()=>{
  const request=input(),events=planEventDay(request).instances;
  const first=events[0],last=events.at(-1)!,fallback=first.snapshot.options.find(o=>o.fallbackWhenUnaffordable)!;
  const resolved=resolveEvent(first,fallback.id,'manual',first.scheduledAt,bani(0),events,request.engine,0).instance;
  const view=(e:EventInstance)=>publicEvent(e,bani(0),events,request.engine);
  const area=eventAreaSchema.parse({engineStatus:'active',profile:'liceu',pending:[view(last)],resolved:[view(resolved)],revision:1,caughtUp:true,processedThrough:date,targetDay:date,remainingDaysEstimate:0,nextRefreshAt:last.expiresAt});
  const html=renderToStaticMarkup(createElement(EventsToday,{area,busy:false,profile:()=>{}}));
  expect(html.indexOf(`dateTime="${first.scheduledAt}"`)).toBeLessThan(html.indexOf(`dateTime="${last.scheduledAt}"`));
  expect(html).toContain('sim-event-resolved');expect(html).toContain('Vezi opțiunile');expect(html).toContain('Vezi rezultatul');
 });
 it('keeps identities/options and historical wording while changing new presentation',()=>{
  // Every historical identity and option survives; V3 additionally recognizes earlier preparation.
  expect(catalogV3.filter(d=>catalogV2.some(old=>old.id===d.id)).map(d=>d.id)).toEqual(catalogV2.map(d=>d.id));
  expect(catalogV3.filter(d=>!catalogV2.some(old=>old.id===d.id)).map(d=>d.id)).toEqual(['prepared_dinner_followup','prepared_project_followup','prepared_route_followup']);
  for(const old of catalogV2){const d=catalogV3.find(x=>x.id===old.id)!;expect(d.variations.map(v=>v.options)).toEqual(old.variations.map(v=>v.options));}
  expect(catalogV2.find(d=>d.id==='home_group_meal')!.variations[0].presentation!.title).toBe('O masă împreună acasă');
  expect(catalogV3.find(d=>d.id==='home_group_meal')!.variations[0].presentation!.title).toBe('Cină acasă');
  expect(Object.keys(lifeEditorialV3).length).toBeGreaterThan(40);
 });
 it('rejects title duplication across definitions and known procedural phrases',()=>{
  const seen=new Map<string,string>();
  for(const d of catalogV3)for(const title of new Set(d.variations.map(v=>v.presentation!.title))){
   expect(title.trim().length).toBeGreaterThan(0);expect(title.length).toBeLessThanOrEqual(60);
   expect(title).not.toMatch(/O ieșire de o jumătate de zi|O masă împreună acasă/iu);
   const normalized=title.toLocaleLowerCase('ro-RO').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
   expect(seen.get(normalized),`${title}: ${seen.get(normalized)} / ${d.id}`).toBeUndefined();seen.set(normalized,d.id);
  }
 });
});
