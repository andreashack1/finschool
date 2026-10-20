import { describe, expect, it, vi } from 'vitest';
vi.mock('server-only',()=>({}));
import { catalogV3 } from '../src/content/simulator/events/catalog-v3.server';
import { eventPolicyV4 } from '../src/content/simulator/events/policy-v4';
import { engineSchema, type EventDefinitionV1, type EventInstance } from '../src/lib/simulator/events/types';
import { planEventDay, materializeSnapshot } from '../src/lib/simulator/events/planner';
import { eventInterest } from '../src/lib/simulator/events/interest';
import { applyConsequences, buildSimulatorStateAt, emptyConsequenceState, stateRuleReason } from '../src/lib/simulator/consequences/state';
import { localInstant } from '../src/lib/simulator/events/time';
import { day, runId, userA } from './simulator-fixtures';

const date=day('2026-10-19'),at=(date:string,minute=1080)=>localInstant(day(date),minute).toISOString();
const engine=()=>engineSchema.parse({scheduleProfile:'liceu',startedAt:at(date,0),catalogVersion:3,policyVersion:4,policySnapshot:{...eventPolicyV4,opportunityChances:Object.fromEntries(Object.keys(eventPolicyV4.opportunityChances).map(k=>[k,0]))},lastClosedDay:null,processedAt:null});
const input=()=>({runId,userId:userA,rngVersion:1 as const,day:date,engine:engine(),catalog:catalogV3,history:[] as EventInstance[],plannedAt:at(date,0)});
const definition=(id:string)=>catalogV3.find(d=>d.id===id)!;

describe('existing consequence infrastructure powers later recognition',()=>{
  it.each([
    ['groceries_two_meals','prepared_dinner_followup'],
    ['school_project_cardboard','prepared_project_followup'],
    ['transport_route_plan','prepared_route_followup'],
  ])('%s → %s is bounded, later and idempotent',(prepareId,followupId)=>{
    const follow=definition(followupId),family=follow.rules.state!.requiredEffects![0];
    const prepare=definition(prepareId);
    const snapshot=materializeSnapshot(runId,1,date,prepare,prepare.variations[0]),before=structuredClone(snapshot);
    const option=snapshot.options.find(o=>o.consequences?.some(c=>c.type==='add_effect'))!;
    const request={state:emptyConsequenceState(),instanceId:'00000000-0000-4000-8000-000000000001',optionId:option.id,consequences:option.consequences!,effectiveAt:at(date,600),recordedAt:at(date,600)};
    const saved=applyConsequences(request).state;
    expect(applyConsequences({...request,state:saved}).operations).toEqual([]);
    expect(stateRuleReason(follow.rules.state,buildSimulatorStateAt(saved,at(date,700)))).toBeNull();
    expect(planEventDay({...input(),catalog:[follow],consequenceState:saved}).instances).toEqual([]);
    const source=planEventDay({...input(),catalog:[prepare]}).instances[0];
    expect(source).toBeDefined();
    const next={...input(),day:day('2026-10-20'),catalog:[prepare,follow],history:[{...source,status:'resolved' as const}],consequenceState:saved};
    const planned=planEventDay(next).instances;
    expect(planned.length).toBeGreaterThan(0);
    expect(planEventDay(next).instances).toEqual(planned);
    const covered=planned[0].snapshot.options.find(o=>o.state?.requiredEffects?.includes(family))!;
    expect(covered.costBani).toBe(0);expect(covered.consequences).toBeUndefined();
    expect(stateRuleReason(follow.rules.state,buildSimulatorStateAt(saved,at('2026-10-23')))).toBe('required_effect');
    expect(snapshot).toEqual(before);
  });
  it('remembers a cable problem, excludes the incompatible normal cable event, and clears on repair',()=>{
    const problem=definition('digital_cable_fault'),follow=definition('digital_cable_followup');
    const free=problem.variations[0].options.find(o=>o.fallbackWhenUnaffordable)!;
    const saved=applyConsequences({state:emptyConsequenceState(),instanceId:'00000000-0000-4000-8000-000000000002',optionId:free.id,consequences:free.consequences!,effectiveAt:at(date,900),recordedAt:at(date,900)}).state;
    const active=buildSimulatorStateAt(saved,at('2026-10-20'));
    expect(stateRuleReason(follow.rules.state,active)).toBeNull();
    expect(stateRuleReason(definition('work_desk_cable').rules.state,active)).toBe('excluded_flag');
    expect(stateRuleReason(problem.rules.state,active)).toBe('excluded_flag');
    expect(planEventDay({...input(),catalog:[follow],consequenceState:saved}).instances).toEqual([]);
    expect(planEventDay({...input(),day:day('2026-10-20'),catalog:[follow],consequenceState:saved}).instances).toHaveLength(1);
    const repair=follow.variations[0].options.find(o=>o.consequences?.some(c=>c.type==='clear_flag'))!;
    const resolved=applyConsequences({state:saved,instanceId:'00000000-0000-4000-8000-000000000003',optionId:repair.id,consequences:repair.consequences!,effectiveAt:at('2026-10-20'),recordedAt:at('2026-10-20')}).state;
    expect(stateRuleReason(follow.rules.state,buildSimulatorStateAt(resolved,at('2026-10-21')))).toBe('required_flag');
    expect(buildSimulatorStateAt(resolved,at(date,1000)).activeFlags.has('cable_problematic')).toBe(true);
  });
});

describe('floor interest remains subordinate to eligibility and diversity',()=>{
  function candidates():EventDefinitionV1[]{
    return ['morning_coffee','school_pencil','leisure_sport_court'].map((id,i)=>{
      const d=structuredClone(definition(id));
      d.weight=i===0?1e9:1e-9;
      d.rules={...d.rules,groups:[],cooldownDays:0};
      d.life={...d.life!,domain:i===0?'routine':i===1?'school':'leisure',semanticTags:i===0?['coffee']:i===1?['supplies']:['sport'],profiles:['liceu'],opportunities:['early_evening','evening'],contexts:['free_time'],weekdaysOnly:false,familyCooldownDays:0};
      return d;
    });
  }
  it.each([0,1])('chooses a different engaging candidate after a routine first choice (opportunity chance %i)',chance=>{
    const catalog=candidates(),request={...input(),catalog};
    if(request.engine.policySnapshot.version!==4)throw new Error('Expected policy 4');
    for(const key of Object.keys(request.engine.policySnapshot.opportunityChances) as (keyof typeof request.engine.policySnapshot.opportunityChances)[])request.engine.policySnapshot.opportunityChances[key]=chance;
    const result=planEventDay(request).instances;
    expect(result).toHaveLength(2);
    expect(result.map(e=>eventInterest(catalog.find(d=>d.id===e.definitionId)!)).sort()).toEqual(['engaging','routine']);
    expect(planEventDay({...request,catalog:[...catalog].reverse()}).instances).toEqual(result);
  });
  it('still fills the floor with routine candidates when engaging ones are ineligible',()=>{
    const catalog=candidates();catalog[2].rules.state={requiredFlags:['phone_problematic']};
    const result=planEventDay({...input(),catalog}).instances;
    expect(result).toHaveLength(2);
    expect(result.every(e=>e.definitionId!==catalog[2].id)).toBe(true);
  });
});
