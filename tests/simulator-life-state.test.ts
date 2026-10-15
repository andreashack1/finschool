import { describe,it,expect,vi } from 'vitest';
vi.mock('server-only',()=>({}));
import { catalogV2 } from '../src/content/simulator/events/catalog-v2.server';
import { catalogV1 } from '../src/content/simulator/events/catalog-v1.server';
import { eventPolicyV2 } from '../src/content/simulator/events/policy-v2';
import { eventPolicyV1 } from '../src/content/simulator/events/policy-v1';
import { engineSchema,type EventInstance } from '../src/lib/simulator/events/types';
import { planEventDay } from '../src/lib/simulator/events/planner';
import { automaticOption,resolveEvent,cancelIrrelevantEvent,optionAvailability } from '../src/lib/simulator/events/resolve';
import { emptyConsequenceState,buildSimulatorStateAt } from '../src/lib/simulator/consequences/state';
import { localInstant } from '../src/lib/simulator/events/time';
import { day,runId,userA,fixtureRun } from './simulator-fixtures';
import { bani } from '../src/lib/simulator/money';
import { synchronizeEvents } from '../src/lib/simulator/events/synchronize';
import { settle } from '../src/lib/simulator/settle';
import type { ConsequenceState } from '../src/lib/simulator/consequences/types';
const policy=structuredClone(eventPolicyV2);if(policy.version===2)for(const k of Object.keys(policy.opportunityChances) as (keyof typeof policy.opportunityChances)[])policy.opportunityChances[k]=1;
const engine=engineSchema.parse({scheduleProfile:'liceu',startedAt:localInstant(day('2026-10-01'),0).toISOString(),catalogVersion:2,policyVersion:2,policySnapshot:policy,lastClosedDay:null,processedAt:null});
function plan(id:string,date='2026-10-12',state=emptyConsequenceState(),history:EventInstance[]=[]){const d=catalogV2.find(d=>d.id===id)!;return planEventDay({runId,userId:userA,rngVersion:1,day:day(date),engine,catalog:[d],history,plannedAt:localInstant(day(date),0).toISOString(),consequenceState:state,diagnostics:true});}
const one=(id:string,date='2026-10-12',state?:ConsequenceState)=>{const e=plan(id,date,state).instances[0];if(!e)throw new Error(`Expected fixture ${id}`);return e;};
describe('Chapter 6 declarative life consequences',()=>{
 it('creates a phone problem, prevents another copy, permits contextual follow-up, then clears and cancels it',()=>{
  const first=one('digital_phone_fault'),wait=first.snapshot.options.find(o=>o.fallbackWhenUnaffordable)!;
  const problem=resolveEvent(first,wait.id,'manual',first.scheduledAt,bani(0),[],engine,0);
  expect(problem.entry).toBeNull();expect(buildSimulatorStateAt(problem.consequenceState,first.scheduledAt).activeFlags.has('phone_problematic')).toBe(true);
  expect(plan('digital_phone_fault','2026-10-13',problem.consequenceState).instances).toHaveLength(0);
  const follow=one('digital_phone_followup','2026-10-16',problem.consequenceState),other=one('digital_phone_resolution','2026-10-16',problem.consequenceState);
  const solved=resolveEvent(follow,follow.snapshot.options[0].id,'manual',localInstant(day('2026-10-16'),1300).toISOString(),bani(100000),[follow,other],engine,0,problem.consequenceState);
  expect(solved.entry!.amountBani).toBeLessThan(0);expect(buildSimulatorStateAt(solved.consequenceState,solved.instance.resolutionEffectiveAt!).activeFlags.has('phone_problematic')).toBe(false);
  expect(cancelIrrelevantEvent(other,solved.consequenceState,solved.instance.resolutionEffectiveAt!)?.status).toBe('cancelled');
  expect(plan('digital_phone_followup','2026-10-17',solved.consequenceState).instances).toHaveLength(0);
 });
 it.each(['cable','headphones','bag','clothing'] as const)('resolves the %s mini-story through canonical state',name=>{
  const problemId={cable:'digital_cable_fault',headphones:'digital_headphones_fault',bag:'unexpected_bag_zip',clothing:'unexpected_clothing_seam'}[name],resolutionId={cable:'obligation_cable_replace',headphones:'digital_headphones_resolution',bag:'obligation_bag_repair',clothing:'obligation_clothing_repair'}[name];
  const first=one(problemId),problem=resolveEvent(first,first.snapshot.options.find(o=>o.fallbackWhenUnaffordable)!.id,'manual',first.scheduledAt,bani(0),[],engine,0);
  const last=one(resolutionId,'2026-10-19',problem.consequenceState),paid=resolveEvent(last,last.snapshot.options[0].id,'manual',last.scheduledAt,bani(100000),[],engine,0,problem.consequenceState);
  expect(buildSimulatorStateAt(paid.consequenceState,last.scheduledAt).activeFlags.size).toBe(0);
 });
 it('makes a prepared-food option available only during the real effect interval',()=>{
  const first=one('groceries_two_meals'),prepared=resolveEvent(first,first.snapshot.options[0].id,'manual',first.scheduledAt,bani(100000),[],engine,0);
  const next=one('dinner_delivery_choice','2026-10-13'),covered=next.snapshot.options.find(o=>o.state)!.id;
  expect(optionAvailability(next,bani(0),[],engine,true,prepared.consequenceState).find(o=>o.id===covered)!.unavailableReason).toBeNull();
  const expired=one('dinner_delivery_choice','2026-10-16');expect(optionAvailability(expired,bani(0),[],engine,true,prepared.consequenceState).find(o=>o.id===covered)!.unavailableReason).toBe('state_changed');
 });
 it('applies identical problem consequences during auto-resolution with no zero ledger row',()=>{const e=one('digital_cable_fault'),option=automaticOption(e,bani(0),[],engine,1),result=resolveEvent(e,option,'automatic',e.expiresAt,bani(0),[],engine,0);expect(result.entry).toBeNull();expect(buildSimulatorStateAt(result.consequenceState,e.expiresAt).activeFlags.has('cable_problematic')).toBe(true);});
 it('retains old option/price/feedback snapshots under policy v2',()=>{const legacy={...engine,catalogVersion:1 as const,policyVersion:1 as const,policySnapshot:{...eventPolicyV1,routineChances:{...eventPolicyV1.routineChances,morning:1}}};const old=planEventDay({runId,userId:userA,rngVersion:1,day:day('2026-10-12'),engine:legacy,catalog:[catalogV1[0]],history:[],plannedAt:localInstant(day('2026-10-12'),0).toISOString()}).instances[0];const snapshot=structuredClone(old.snapshot),free=old.snapshot.options.find(o=>o.fallbackWhenUnaffordable)!;const result=resolveEvent(old,free.id,'manual',old.scheduledAt,bani(0),[],engine,0);expect(result.instance.snapshot).toEqual(snapshot);expect(result.instance.feedbackSnapshot).toBe(free.feedback);});
 it('persists quiet-day markers and reconstructs historical state during multi-day absence',()=>{const quiet=structuredClone(engine);if(quiet.policySnapshot.version===2)for(const k of Object.keys(quiet.policySnapshot.opportunityChances) as (keyof typeof quiet.policySnapshot.opportunityChances)[])quiet.policySnapshot.opportunityChances[k]=0;quiet.startedAt=localInstant(day('2026-10-12'),0).toISOString();const run=fixtureRun('2026-10-12'),first=settle(run,[],run.startedOn);run.lastSettledOn=first.settledThrough;const state={run,ledger:first.newEntries,engine:quiet,days:[],instances:[],revision:1};const a=synchronizeEvents(state,localInstant(day('2026-10-15'),600),catalogV2);expect(a.days).toHaveLength(4);expect(a.days.every(d=>d.eventCount===0)).toBe(true);expect(synchronizeEvents(a,localInstant(day('2026-10-15'),600),catalogV2).plannedDays).toEqual([]);});
});
