import { addDays, daysBetween, type DayKey } from '../calendar';
import { validateCatalog, validateCatalogPolicy } from './validate';
import { materializeSnapshot, planEventDay } from './planner';
import { engineSchema, instanceSchema, type EventDefinitionV1, type ScheduleProfile } from './types';
import { localInstant } from './time';
import { domains } from './life-taxonomy';
import type { EventPolicy } from './types';
import { createRng,seedFromParts,uniformInt } from '../rng';
import { bani } from '../money';
import { emptyConsequenceState } from '../consequences/state';
import { automaticOption,cancelIrrelevantEvent,resolveEvent } from './resolve';

const counts=(values:readonly string[])=>Object.fromEntries([...new Set(values)].sort().map(v=>[v,values.filter(x=>x===v).length]));
export function catalogReport(catalog:readonly EventDefinitionV1[],policy:EventPolicy){
  validateCatalogPolicy(catalog,policy);
  if(catalog.some(d=>!d.life))throw new Error('Missing life taxonomy');
  for(const d of catalog)for(const v of d.variations)materializeSnapshot('catalog-validation',1,'2026-10-10' as DayKey,d,v);
  const stateful=catalog.filter(d=>d.rules.state || d.variations.some(v=>v.additionalRules?.state || v.options.some(o=>o.state||o.consequences?.length)));
  const titles=catalog.flatMap(d=>d.variations.map(v=>({id:d.id,title:v.title.toLocaleLowerCase('ro').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,'').trim()})));
  const similarTitles=titles.flatMap((a,i)=>titles.slice(i+1).filter(b=>a.id!==b.id && a.title===b.title).map(b=>[a.id,b.id]));
  const nearConcepts=catalog.flatMap((a,i)=>catalog.slice(i+1).filter(b=>a.familyId===b.familyId && [...a.life!.semanticTags].sort().join() === [...b.life!.semanticTags].sort().join()).map(b=>[a.id,b.id]));
  const distribution=counts(catalog.map(d=>d.life!.domain));
  return {definitions:catalog.length,variations:catalog.reduce((n,d)=>n+d.variations.length,0),options:catalog.reduce((n,d)=>n+d.variations.reduce((m,v)=>m+v.options.length,0),0),families:new Set(catalog.map(d=>d.familyId)).size,domains:Object.keys(distribution).length,tags:new Set(catalog.flatMap(d=>d.life!.semanticTags)).size,domainCounts:distribution,rarityCounts:counts(catalog.map(d=>d.life!.rarity)),profileCounts:{liceu:catalog.filter(d=>d.life!.profiles.includes('liceu')).length,lucrez:catalog.filter(d=>d.life!.profiles.includes('lucrez')).length},stateful:stateful.length,seasonal:catalog.filter(d=>d.life!.months).length,tagCounts:counts(catalog.flatMap(d=>d.life!.semanticTags)),familyCounts:counts(catalog.map(d=>d.familyId)),similarTitles,nearConcepts,warnings:[...domains.filter(d=>!distribution[d]).map(d=>`Empty domain: ${d}`),...(distribution.food>catalog.length*.35?['Food concentration']:[])]};
}
/** Pure quality harness. It never contacts the database or writes financial history. */
export function simulateLife(catalog:readonly EventDefinitionV1[],policy:EventPolicy,profile:ScheduleProfile,seed:string,start:DayKey,numberOfDays:number){
  if(policy.version!==2 || !Number.isInteger(numberOfDays)||numberOfDays<1||numberOfDays>366)throw new Error('Invalid life simulation');
  const engine=engineSchema.parse({scheduleProfile:profile,startedAt:localInstant(start,0).toISOString(),catalogVersion:2,policyVersion:2,policySnapshot:policy,lastClosedDay:null,processedAt:null});
  const seeded=createRng(seedFromParts(1,'life-quality-run',seed)),hex=Array.from({length:16},()=>uniformInt(seeded,0,255).toString(16).padStart(2,'0')).join('');
  const runId=`${hex.slice(0,8)}-${hex.slice(8,12)}-4${hex.slice(13,16)}-8${hex.slice(17,20)}-${hex.slice(20)}`;
  let state=emptyConsequenceState(),balance=bani(200000);
  const history:ReturnType<typeof planEventDay>['instances']=[],days:{day:DayKey;count:number}[]=[];
  for(let i=0;i<numberOfDays;i++){
    const day=addDays(start,i),plan=planEventDay({runId,userId:'00000000-0000-4000-8000-000000000001',rngVersion:1,day,engine,catalog,history,plannedAt:localInstant(day,0).toISOString(),consequenceState:state});
    if(i>0 && day.endsWith('-01'))balance=bani(balance+200000);
    for(const instance of plan.instances)instanceSchema.parse(instance);
    for(const [index,instance] of plan.instances.entries()){
      const cancelled=cancelIrrelevantEvent(instance,state,instance.expiresAt);
      if(cancelled){history.push(cancelled);continue;}
      const selected=automaticOption(instance,balance,[...history,...plan.instances],engine,1,state);
      const resolved=resolveEvent(instance,selected,'automatic',instance.expiresAt,balance,[...history,...plan.instances],engine,index,state);
      state=resolved.consequenceState;balance=bani(balance+(resolved.entry?.amountBani??0));history.push(resolved.instance);
    }
    days.push({day,count:plan.instances.length});
  }
  const quiet=days.filter(d=>d.count===0).length,busy=days.filter(d=>d.count>=3).length;
  const repetition={exactCooldownViolations:0,familyCooldownViolations:0,semanticCooldownViolations:0,sameDayFamilyViolations:0,activityConflicts:0};
  const active=history.filter(e=>e.status!=='cancelled');
  for(const [i,e] of active.entries()){
    const definition=catalog.find(d=>d.id===e.definitionId)!,previous=active.slice(0,i);
    for(const p of previous){
      const elapsed=daysBetween(p.day,e.day);
      if(p.definitionId===e.definitionId && elapsed<definition.rules.cooldownDays)repetition.exactCooldownViolations++;
      if(p.familyId===e.familyId && elapsed<definition.life!.familyCooldownDays)repetition.familyCooldownViolations++;
      if(p.familyId===e.familyId && p.day===e.day)repetition.sameDayFamilyViolations++;
      if(!definition.rules.state?.requiredFlags?.length && definition.life!.semanticTags.some(t=>policy.semanticHardDays[t] && elapsed<policy.semanticHardDays[t]! && p.snapshot.life!.semanticTags.includes(t)))repetition.semanticCooldownViolations++;
      if(e.activityStartAt && e.activityEndAt && p.activityStartAt && p.activityEndAt && e.activityStartAt<p.activityEndAt && e.activityEndAt>p.activityStartAt)repetition.activityConflicts++;
    }
  }
  const timeline=history.map(e=>({day:e.day,time:new Intl.DateTimeFormat('ro',{timeZone:'Europe/Bucharest',hour:'2-digit',minute:'2-digit'}).format(new Date(e.scheduledAt)),title:e.snapshot.title,family:e.familyId,domain:e.snapshot.life!.domain,tags:e.snapshot.life!.semanticTags,status:e.status}));
  return {profile,seed,runId,days:numberOfDays,totalEvents:history.length,quietDays:quiet,quietPercent:Math.round(quiet/numberOfDays*1000)/10,busyDays:busy,busyPercent:Math.round(busy/numberOfDays*1000)/10,maxInDay:Math.max(...days.map(d=>d.count)),eventsPerDay:counts(days.map(d=>String(d.count))),domains:counts(history.map(e=>e.snapshot.life!.domain)),rarities:counts(history.map(e=>e.snapshot.life!.rarity)),families:counts(history.map(e=>e.familyId)),semanticTags:counts(history.flatMap(e=>e.snapshot.life!.semanticTags)),stateOperations:state.operations.length,repetition,timeline,dayCounts:days,sample:timeline.filter(e=>e.day<addDays(start,14)),instances:history};
}
export function validateLifeCatalog(input:unknown,policy:EventPolicy){return catalogReport(validateCatalog(input),policy);}
