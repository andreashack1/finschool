import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
vi.mock('server-only', () => ({}));
import { consequenceSchema, consequencesSchema, stateRulesSchema, type ConsequenceDescriptor } from '../src/lib/simulator/consequences/types';
import { applyConsequences, buildSimulatorStateAt, currentStateItems, effectActiveAt, emptyConsequenceState, reconstructEffects, stateRuleReason } from '../src/lib/simulator/consequences/state';
import { day, fixtureRun, runId, userA } from './simulator-fixtures';
import { addDays, dayKey } from '../src/lib/simulator/calendar';
import { localInstant } from '../src/lib/simulator/events/time';
import { engineSchema, instanceSchema, snapshotSchema } from '../src/lib/simulator/events/types';
import { eventPolicyV1 } from '../src/content/simulator/events/policy-v1';
import { consequenceDemoCatalog } from '../src/content/simulator/events/consequence-demos.server';
import { materializeSnapshot, planEventDay } from '../src/lib/simulator/events/planner';
import { automaticOption, cancelIrrelevantEvent, optionAvailability, resolveEvent } from '../src/lib/simulator/events/resolve';
import { validateCatalog } from '../src/lib/simulator/events/validate';
import { synchronizeEvents, type EventState } from '../src/lib/simulator/events/synchronize';
import { bani } from '../src/lib/simulator/money';
import { buildSimulatorDashboardState, financialMovementOrder } from '../src/lib/simulator/dashboard';
import { settle } from '../src/lib/simulator/settle';
import CurrentState from '../app/simulator/current-state';

const at = (date = '2026-10-10', minute = 1080) => localInstant(day(date), minute).toISOString();
const visible = { title: 'Ai provizii.', description: 'Mese pregătite în scenariu.', visibility: 'user' as const, priority: 20 };
const food = (changes: Partial<Extract<ConsequenceDescriptor, {type:'add_effect'}>> = {}): ConsequenceDescriptor => ({ id: 'food', type: 'add_effect', familyKey: 'food', effectType: 'food', durationDays: 2, startOffsetDays: 0, overlapPolicy: 'extend', value: { coverage: true }, presentation: visible, ...changes });
const phone = (changes: Partial<Extract<ConsequenceDescriptor, {type:'set_flag'}>> = {}): ConsequenceDescriptor => ({ id: 'phone', type: 'set_flag', key: 'phone_problematic', value: true, presentation: { title: 'Telefonul are o problemă.', visibility: 'user', priority: 50 }, ...changes });
const clear: ConsequenceDescriptor = { id: 'clear', type: 'clear_flag', key: 'phone_problematic' };
const ids = ['11111111-1111-4111-8111-111111111111','22222222-2222-4222-8222-222222222222','33333333-3333-4333-8333-333333333333'];
function apply(state = emptyConsequenceState(), consequences: ConsequenceDescriptor[] = [food()], effectiveAt = at(), instanceId = ids[0]) {
  return applyConsequences({ state, consequences, instanceId, optionId: 'choice', effectiveAt, recordedAt: at('2026-10-20') });
}
const engine = () => engineSchema.parse({ scheduleProfile: 'liceu', startedAt: at('2026-10-10',0), catalogVersion: 1, policyVersion: 1, policySnapshot: eventPolicyV1, lastClosedDay: null, processedAt: null });
function plan(scenario: Parameters<typeof consequenceDemoCatalog>[0] = 'coverage', state = emptyConsequenceState(), date = '2026-10-10') {
  const e = engine(); e.policySnapshot.additionalChance = 1; e.policySnapshot.windows.evening = { start: 1080, end: 1081 };
  return planEventDay({ runId, userId: userA, rngVersion: 1, day: day(date), engine: e, catalog: consequenceDemoCatalog(scenario), history: [], plannedAt: at(date), consequenceState: state, diagnostics: true });
}
function event(consequences: ConsequenceDescriptor[] = []) {
  const e = plan().instances[0];
  for (const o of e.snapshot.options) o.consequences = consequences;
  return instanceSchema.parse(e);
}

describe('strict declarative consequence data', () => {
  it.each([phone(),clear,food(),{id:'remove',type:'remove_effect',target:{familyKey:'food'}},{id:'exact',type:'remove_effect',target:{effectKey:'one_effect'}}])('validates $type', value => expect(consequenceSchema.safeParse(value).success).toBe(true));
  it.each([
    {type:'adjust_money'}, {...phone(),type:'unknown'}, {...phone(),key:'Telefon stricat'}, {...phone(),key:'é'}, {...phone(),key:'_bad'},
    {...food(),durationDays:0}, {...food(),durationDays:-1}, {...food(),durationDays:1.2}, {...food(),startOffsetDays:-1}, {...food(),startOffsetDays:0.5},
    {...food(),overlapPolicy:'stack'}, {...phone(),value:{}}, {...food(),value:{unbounded:{nested:true}}}, {...food(),callback:'eval'},
    {id:'bad',type:'remove_effect',target:{familyKey:'food',effectKey:'exact'}}, {...phone(),presentation:{title:'Test',visibility:'public'}},
  ])('rejects invalid descriptor %#', value => expect(consequenceSchema.safeParse(value).success).toBe(false));
  it.each([
    [phone(),clear], [food(),{id:'remove',type:'remove_effect',target:{familyKey:'food'}}], [phone(),{...food(),id:'phone'}], [food(),{...food(),id:'second'}],
  ].map(values => ({ values })))('rejects contradictions/duplicate IDs %#', ({ values }) => expect(consequencesSchema.safeParse(values).success).toBe(false));
  it('rejects contradictory rules and mutable fallback requirements', () => {
    expect(stateRulesSchema.safeParse({requiredFlags:['phone'],excludedFlags:['phone']}).success).toBe(false);
    const catalog = consequenceDemoCatalog('coverage'); catalog[0].variations[0].options[2].state={requiredFlags:['phone']};
    expect(()=>validateCatalog(catalog)).toThrow('Fallback');
  });
});

describe('calendar effects and historical flags', () => {
  it.each([
    ['2026-10-10',1080,0,'2026-10-12'], ['2026-10-10',1080,1,'2026-10-13'],
    ['2026-03-28',1080,0,'2026-03-30'], ['2026-10-24',1080,0,'2026-10-26'],
    ['2026-01-31',1080,0,'2026-02-02'], ['2026-12-31',1080,0,'2027-01-02'], ['2028-02-28',1080,0,'2028-03-01'],
  ])('calendar coverage %s offset %s', (date,minute,offset,end) => {
    const inputAt=at(date,minute), result=apply(undefined,[food({startOffsetDays:offset})],inputAt), effect=result.state.effects[0];
    expect(effect.startsAt).toBe(offset ? at(addDays(day(date),offset),0) : inputAt);
    expect(effect.expiresAt).toBe(at(end,0)); expect(effectActiveAt(effect,effect.startsAt)).toBe(true); expect(effectActiveAt(effect,effect.expiresAt)).toBe(false);
  });
  it('evening effects cannot affect earlier same-day evaluation; future offset starts at midnight',()=>{
    const a=apply().state, e=a.effects[0]; expect(buildSimulatorStateAt(a,at('2026-10-10',600)).activeEffects).toEqual([]);
    expect(buildSimulatorStateAt(a,at()).activeEffects).toHaveLength(1); expect(e.recordedAt).toBe(at('2026-10-20'));
    const b=apply(undefined,[food({startOffsetDays:1})]).state; expect(buildSimulatorStateAt(b,at()).activeEffects).toEqual([]);
    expect(buildSimulatorStateAt(b,at('2026-10-11',0)).activeEffects).toHaveLength(1);
  });
  it('spring and fall durations are local days, not 48 elapsed hours',()=>{
    for(const date of ['2026-03-28','2026-10-24']) {
      const e=apply(undefined,[food()],at(date,0)).state.effects[0];
      expect((Date.parse(e.expiresAt)-Date.parse(e.startsAt))/3600000).toBe(date.includes('03')?47:49);
    }
  });
  it('set/clear/set reconstruct all periods without future knowledge',()=>{
    const a=apply(undefined,[phone()],at('2026-10-10')).state;
    const b=apply(a,[clear],at('2026-10-11'),ids[1]).state;
    const c=apply(b,[phone()],at('2026-10-12'),ids[2]).state;
    for(const [date,active] of [['2026-10-09',false],['2026-10-10',true],['2026-10-11',false],['2026-10-12',true]] as const)
      expect(buildSimulatorStateAt(c,at(date)).activeFlags.has('phone_problematic')).toBe(active);
    expect(buildSimulatorStateAt(c,at('2027-01-01')).activeFlags.has('phone_problematic')).toBe(true);
  });
  it('same-time ties use persisted sequence; recordedAt does not decide history',()=>{
    const a=apply(undefined,[phone()]).state,b=apply(a,[clear],at(),ids[1]).state;
    b.operations[0].recordedAt=at('2026-10-30'); expect(buildSimulatorStateAt(b,at()).activeFlags.size).toBe(0);
  });
  it('clear absent records an idempotent no-op',()=>{
    const result=apply(undefined,[clear]); expect(result.operations[0].applied).toBe(false);
    expect(apply(result.state,[clear]).operations).toEqual([]);
  });
});

describe('effect overlap/early termination and retries',()=>{
  it('extend adds calendar coverage once and does not rewrite original row',()=>{
    const a=apply().state,b=apply(a,[food()],at('2026-10-11'),ids[1]);
    expect(b.state.effects[0].expiresAt).toBe(at('2026-10-12',0)); expect(b.state.effects[1].expiresAt).toBe(at('2026-10-14',0));
    expect(apply(b.state,[food()],at('2026-10-11'),ids[1]).state).toEqual(b.state);
    expect(reconstructEffects(b.state.operations)).toEqual(b.state.effects);
  });
  it('extend touching interval works; a real gap remains inactive',()=>{
    const a=apply().state,b=apply(a,[food()],at('2026-10-12',0),ids[1]).state;
    expect(b.effects[1].expiresAt).toBe(at('2026-10-14',0));
    const gap=apply(a,[food()],at('2026-10-14'),ids[1]).state;
    expect(buildSimulatorStateAt(gap,at('2026-10-13')).activeEffects).toEqual([]);
    expect(gap.effects[1].expiresAt).toBe(at('2026-10-16',0));
  });
  it('incompatible extension fails before mutating input',()=>{
    const a=apply().state,copy=structuredClone(a); expect(()=>apply(a,[food({value:{coverage:false}})],at('2026-10-11'),ids[1])).toThrow('payload'); expect(a).toEqual(copy);
    expect(()=>apply(a,[food({overlapPolicy:'replace'})],at('2026-10-11'),ids[1])).toThrow('policy');
  });
  it.each([0,1])('replace at offset %i ends original at the new start',offset=>{
    const a=apply(undefined,[food({overlapPolicy:'replace',durationDays:4})]).state;
    const b=apply(a,[food({overlapPolicy:'replace',startOffsetDays:offset})],at('2026-10-11'),ids[1]).state;
    const end=offset?at('2026-10-12',0):at('2026-10-11'); expect(b.effects[0].endedAt).toBe(end);
    expect(effectActiveAt(b.effects[0],at('2026-10-11',600))).toBe(true); expect(effectActiveAt(b.effects[0],end)).toBe(false);
    expect(reconstructEffects(b.operations)).toEqual(b.effects);
  });
  it('independent instances coexist without forced aggregation',()=>{
    const a=apply(undefined,[food({overlapPolicy:'independent'})]).state;
    const b=apply(a,[food({overlapPolicy:'independent'})],at('2026-10-11'),ids[1]).state;
    expect(buildSimulatorStateAt(b,at('2026-10-11')).activeEffects).toHaveLength(2);
    expect(currentStateItems(b,at('2026-10-11'))).toHaveLength(2);
  });
  it('remove exact affects only that identity; family removes matching future rows',()=>{
    const a=apply(undefined,[food({overlapPolicy:'independent'})]).state;
    const b=apply(a,[food({overlapPolicy:'independent',startOffsetDays:1})],at(),ids[1]).state;
    const c=apply(b,[{id:'remove',type:'remove_effect',target:{effectKey:a.effects[0].effectKey}}],at(),ids[2]).state;
    expect(c.effects[0].endedAt).toBe(at()); expect(c.effects[1].endedAt).toBeNull();
    const d=apply(c,[{id:'family',type:'remove_effect',target:{familyKey:'food'}}],at(),crypto.randomUUID()).state;
    expect(d.effects[1].endedAt! < d.effects[1].startsAt).toBe(true);
    expect(buildSimulatorStateAt(d,at('2026-10-11')).activeEffects).toEqual([]); expect(d.effects).toHaveLength(2);
  });
  it('remove missing is a recorded safe no-op',()=>expect(apply(undefined,[{id:'remove',type:'remove_effect',target:{familyKey:'missing'}}]).operations[0].applied).toBe(false));
  it('historical removal cannot target an effect that was created in the future',()=>{
    const future=apply(undefined,[food()],at('2026-10-12')).state;
    const past=apply(future,[{id:'remove',type:'remove_effect',target:{familyKey:'food'}}],at('2026-10-11'),ids[1]);
    expect(past.operations[0].applied).toBe(false);expect(past.state.effects[0].endedAt).toBeNull();
  });
  it('retry identity cannot be reinterpreted with different semantics',()=>{
    const a=apply().state; expect(()=>apply(a,[food({durationDays:3})])).toThrow('identity');
  });
});

describe('snapshots, shared resolution, relevance and planning',()=>{
  it('old snapshots remain byte-compatible and resolve without state',()=>{
    const e=event(); for(const o of e.snapshot.options) delete o.consequences;
    const before=JSON.stringify(e.snapshot), parsed=snapshotSchema.parse(e.snapshot); expect(JSON.stringify(parsed)).toBe(before);
    const result=resolveEvent(e,e.snapshot.options[2].id,'manual',at(),bani(10000),[e],engine(),0);
    expect(result.operations).toEqual([]); expect(result.entry).toBeNull();
  });
  it('materialization snapshots trusted consequences independently of future catalog edits',()=>{
    const d=consequenceDemoCatalog('coverage')[0],snapshot=materializeSnapshot(runId,1,day('2026-10-10'),d,d.variations[0]);
    d.variations[0].options[2].consequences=[phone()];
    expect(snapshot.options[2].consequences?.[0].type).toBe('add_effect');
  });
  it('manual/auto use identical consequence engine; free state creates no ledger',()=>{
    const e=event([food(),phone()]),option=e.snapshot.options[2].id;
    const manual=resolveEvent(e,option,'manual',at(),bani(10000),[e],engine(),0);
    const automatic=resolveEvent(e,option,'automatic',at('2026-10-20'),bani(10000),[e],engine(),0);
    expect(manual.entry).toBeNull(); expect(automatic.entry).toBeNull();
    expect(manual.operations[0].effectiveAt).toBe(at()); expect(automatic.operations[0].effectiveAt).toBe(e.expiresAt);
    expect(automatic.consequenceState.effects[0].startsAt).toBe(e.expiresAt); expect(automatic.operations[0].recordedAt).toBe(at('2026-10-20'));
    expect(automatic.operations.map(o=>o.descriptor)).toEqual(manual.operations.map(o=>o.descriptor));
  });
  it('paid choice retains one financial system and invalid consequence fails atomically in domain',()=>{
    const e=event([food()]); const r=resolveEvent(e,e.snapshot.options[0].id,'manual',at(),bani(10000),[e],engine(),0);
    expect(r.entry?.amountBani).toBe(-100); expect(r.operations).toHaveLength(1);
    const bad={...e,snapshot:{...e.snapshot,options:e.snapshot.options.map(o=>({...o,consequences:[{id:'bad',type:'unknown'}]}))}};
    expect(instanceSchema.safeParse(bad).success).toBe(false); expect(e.status).toBe('pending');
  });
  it.each([
    [{requiredFlags:['phone_problematic']},'required_flag'], [{excludedFlags:['phone_problematic']},'excluded_flag'],
    [{requiredEffects:['food']},'required_effect'], [{excludedEffects:['food']},'excluded_effect'],
  ] as const)('state rule %j evaluates active/historical state', (rules,reason)=>{
    const full=apply(undefined,[food(),phone()]).state,active=buildSimulatorStateAt(full,at()),empty=buildSimulatorStateAt(full,at('2026-10-09'));
    const required='requiredFlags' in rules || 'requiredEffects' in rules;
    const parsedRules=stateRulesSchema.parse(rules);
    expect(stateRuleReason(parsedRules,required?empty:active)).toBe(reason); expect(stateRuleReason(parsedRules,required?active:empty)).toBeNull();
  });
  it('planner respects coverage expiry and no future knowledge',()=>{
    const full=apply(undefined,[food({familyKey:'food_coverage'})],at('2026-10-10',0)).state;
    expect(plan('coverage_probe',full).instances).toEqual([]); expect(plan('coverage_probe',full).rejected.some(r=>r.reason==='excluded_effect')).toBe(true);
    expect(plan('coverage_probe',full,'2026-10-12').instances).toHaveLength(1);
    const future=apply(undefined,[phone()],at('2026-10-12')).state;
    expect(plan('phone_resolution',future,'2026-10-11').instances).toEqual([]); expect(plan('phone_resolution',future,'2026-10-13').instances).toHaveLength(1);
  });
  it('option requirements disable one option without changing price/text or fallback',()=>{
    const e=event(),before=structuredClone(e.snapshot); e.snapshot.options[0].state={requiredFlags:['phone_problematic']};
    const a=optionAvailability(e,bani(10000),[e],engine(),true,emptyConsequenceState(),at());
    expect(a[0].unavailableReason).toBe('state_changed'); expect(a[2].unavailableReason).toBeNull();
    expect(a[0].label).toBe(before.options[0].label); expect(a[0].costBani).toBe(before.options[0].costBani);
  });
  it('irrelevant event is cancelled without selection, ledger or operations',()=>{
    const e=event([phone()]); e.snapshot.relevance=[{requiredFlags:['phone_problematic']}];
    const cancelled=cancelIrrelevantEvent(e,emptyConsequenceState(),at()); expect(cancelled?.status).toBe('cancelled');
    expect(cancelled?.selectedOptionId).toBeNull(); expect(cancelled?.cancelledAt).toBe(at());
    expect(()=>resolveEvent(e,e.snapshot.options[2].id,'manual',at(),bani(10000),[e],engine(),0)).toThrow('irrelevant');
  });
  it('catch-up equals daily chronology: historical auto consequences precede next-day planning',()=>{
    const run=fixtureRun('2026-10-10'),financial=settle(run,[],day('2026-10-10'));
    const base: EventState={run:{...run,lastSettledOn:financial.settledThrough},ledger:financial.newEntries,engine:engine(),instances:[],days:[],revision:0};
    const policy=base.engine.policySnapshot; policy.additionalChance=1; policy.windows.evening={start:1080,end:1081};
    const catalog=validateCatalog([...consequenceDemoCatalog('phone_problem'),...consequenceDemoCatalog('phone_resolution')]);
    const direct=synchronizeEvents(base,new Date(at('2026-10-13')),catalog,false,at('2026-10-20'));
    let daily: EventState=base;
    for(const date of ['2026-10-10','2026-10-11','2026-10-12','2026-10-13']) {
      const result=synchronizeEvents(daily,new Date(at(date)),catalog,false,at('2026-10-20'));
      daily={...result};
    }
    expect(direct.consequenceState).toEqual(daily.consequenceState); expect(direct.ledger).toEqual(daily.ledger);
    expect(direct.instances.map(e=>[e.generationKey,e.status,e.selectedOptionId])).toEqual(daily.instances.map(e=>[e.generationKey,e.status,e.selectedOptionId]));
    expect(direct.instances.filter(e=>e.definitionId==='dev_phone_resolution').every(e=>e.day>day('2026-10-10'))).toBe(true);
    expect(direct.consequenceState.operations[0].effectiveAt).toBe(at('2026-10-11',0));
  });
  it('automatic fallback remains a valid path when other state options are unavailable',()=>{
    const e=event(); for(const o of e.snapshot.options.slice(0,2))o.state={requiredFlags:['absent']};
    expect(automaticOption(e,bani(10000),[e],engine(),1)).toBe(e.snapshot.options[2].id);
  });
});

describe('normalized current state and compact Acum',()=>{
  it('empty and internal state produce no card',()=>{
    expect(renderToStaticMarkup(createElement(CurrentState,{items:[]}))).toBe('');
    const state=apply(undefined,[food({presentation:{...visible,visibility:'internal'}}),phone({presentation:{title:'internal',visibility:'internal',priority:10}})]).state;
    expect(currentStateItems(state,at())).toEqual([]);
  });
  it('visible flags/effects render Romanian copy without technical identities',()=>{
    const items=currentStateItems(apply(undefined,[food(),phone()]).state,at());
    const html=renderToStaticMarkup(createElement(CurrentState,{items})); expect(html).toContain('Acum'); expect(html).toContain('Telefonul are o problemă.');
    expect(html).not.toMatch(/phone_problematic|state_[a-f0-9]|sourceInstanceId|true|false/);
    expect(items.find(i=>i.kind==='flag')?.validityLabel).toBeUndefined();
  });
  it('extended coverage aggregates, sorts by priority/expiry/stable identity',()=>{
    const a=apply().state,b=apply(a,[food(),phone()],at('2026-10-11'),ids[1]).state,items=currentStateItems(b,at('2026-10-11'));
    expect(items).toHaveLength(2); expect(items[0].kind).toBe('flag'); expect(items[1].expiresAt).toBe(at('2026-10-14',0));
    const low=food({id:'other',familyKey:'other',presentation:{...visible,priority:20},durationDays:1});
    const c=apply(b,[low],at('2026-10-11'),ids[2]).state; expect(currentStateItems(c,at('2026-10-11'))[1].id).toBe('effect:other');
  });
  it.each([['2026-10-10','Disponibil până mâine.'],['2026-10-11','Valabil astăzi.']])('calendar copy %s', (date,copy)=>expect(currentStateItems(apply().state,at(date))[0].validityLabel).toBe(copy));
  it('canonical dashboard includes state with no independent API',()=>{
    const run=fixtureRun('2026-10-10'),financial=settle(run,[],day('2026-10-10'));
    const dashboard=buildSimulatorDashboardState({...run,lastSettledOn:financial.settledThrough},financial.newEntries,day('2026-10-10'),day('2026-10-10'),[],[],{state:apply(undefined,[phone()]).state,at:at()});
    expect(dashboard.currentStates).toHaveLength(1); expect(dashboard.flags.phone_problematic).toBe(true);
    expect(dashboard.upcomingFinancialMovements.every(m=>m.id && ['salary','fixed_expense'].includes(m.sourceType))).toBe(true);
    const futureSource={...dashboard.upcomingFinancialMovements[0],id:'future-source',sourceType:'future_source'};
    expect([futureSource,...dashboard.upcomingFinancialMovements].sort(financialMovementOrder)).toHaveLength(4);
  });
  it('refresh selectors are pure and retain expired rows for audit',()=>{
    const state=apply().state,copy=structuredClone(state); expect(currentStateItems(state,at())).toEqual(currentStateItems(state,at()));
    expect(currentStateItems(state,at('2026-10-13'))).toEqual([]); expect(state).toEqual(copy); expect(state.effects).toHaveLength(1);
    expect(dayKey(new Date(state.effects[0].expiresAt))).toBe(day('2026-10-12'));
  });
  it('current flag projection accelerates reads without leaking its future into historical queries',()=>{
    const a=apply(undefined,[phone()],at('2026-10-10')).state,b=apply(a,[clear],at('2026-10-11'),ids[1]).state;
    const projected={...b,flagProjection:{through:at('2026-10-11'),operations:[b.operations[1]]}};
    expect(buildSimulatorStateAt(projected,at('2026-10-10')).activeFlags.has('phone_problematic')).toBe(true);
    expect(buildSimulatorStateAt(projected,at('2026-10-12')).activeFlags.size).toBe(0);
    const c=apply(projected,[phone()],at('2026-10-12'),ids[2]).state;
    expect(buildSimulatorStateAt(c,at('2026-10-12')).activeFlags.has('phone_problematic')).toBe(true);
  });
});
