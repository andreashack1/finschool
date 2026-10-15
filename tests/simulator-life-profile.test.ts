import { describe, expect, it, vi } from 'vitest';
vi.mock('server-only', () => ({}));
import { lifeProfileConfig, lifeProfilePresets } from '../src/content/simulator/life-profile-config';
import type { LifeProfile } from '../src/lib/simulator/life-profile';
import { catalogV2 } from '../src/content/simulator/events/catalog-v2.server';
import { eventPolicyV3 } from '../src/content/simulator/events/policy-v3';
import { buildStartPlan, buildSimulatorDashboardState } from '../src/lib/simulator/dashboard';
import { buildFinancialCalendar } from '../src/lib/simulator/financial-calendar';
import { buildMonthlyReview } from '../src/lib/simulator/monthly-review';
import { calculateBalance, settle } from '../src/lib/simulator/settle';
import { engineSchema } from '../src/lib/simulator/events/types';
import { planEventDay } from '../src/lib/simulator/events/planner';
import { lifeProfileEventReason } from '../src/lib/simulator/events/profile-context';
import { localInstant, occupiedSchedule } from '../src/lib/simulator/events/time';
import { synchronizeEvents } from '../src/lib/simulator/events/synchronize';
import { day, fixtureRun, runId, userA } from './simulator-fixtures';
import { addDays } from '../src/lib/simulator/calendar';

const profiles: LifeProfile[] = (['liceu','lucrez'] as const).flatMap(activityStatus => (['parinti','chirie'] as const).flatMap(housingStatus => (['public','walk'] as const).map(transportMode => ({version:1,activityStatus,housingStatus,transportMode}))));
const engine = (p: LifeProfile) => engineSchema.parse({scheduleProfile:p.activityStatus,startedAt:localInstant(day('2026-11-01'),0).toISOString(),catalogVersion:2,policyVersion:3,policySnapshot:{...eventPolicyV3,profiles:lifeProfilePresets.schedules},lastClosedDay:null,processedAt:null});
describe('Life profile finances and persisted snapshot compatibility', () => {
  it.each(profiles)('monthly cash flow $activityStatus $housingStatus $transportMode', p => {
    const config=lifeProfileConfig(p), plan=buildStartPlan(runId,userA,p.housingStatus,day('2026-11-01'),config);
    const ledger=settle(plan.run,[],day('2026-11-30')).newEntries;
    const expectedIncome=p.activityStatus==='lucrez'?200000:p.housingStatus==='chirie'?160000:100000;
    expect(ledger.find(e=>e.refKey.endsWith(':salary:monthly'))).toMatchObject({label:p.activityStatus==='lucrez'?'Salariu':'Buget lunar',amountBani:expectedIncome,kind:p.activityStatus==='lucrez'?'salariu':'ajustare'});
    expect(ledger.filter(e=>e.category==='locuinta')).toHaveLength(p.housingStatus==='chirie'?1:0);
    expect(ledger.filter(e=>e.category==='transport')).toHaveLength(p.transportMode==='public'?1:0);
    expect(ledger.some(e=>e.label==='Contribuție la locuință')).toBe(false);
    expect(ledger.some(e=>e.category==='abonamente')).toBe(false);
    if(p.housingStatus==='chirie') {
      expect(ledger.find(e=>e.label==='Chirie')?.amountBani).toBe(-120000);
      expect(ledger.find(e=>e.label==='Ajutor chirie')).toMatchObject({amountBani:60000,kind:'ajustare'});
      expect(ledger.findIndex(e=>e.label==='Ajutor chirie')).toBeLessThan(ledger.findIndex(e=>e.label==='Chirie'));
    }
    const baseline=p.activityStatus==='lucrez'?(p.housingStatus==='chirie'?140000:200000):100000;
    expect(calculateBalance(ledger)).toBe(baseline-(p.transportMode==='public'?12000:0));
    expect(settle({...plan.run,lastSettledOn:day('2026-11-30')},ledger,day('2026-11-30')).newEntries).toEqual([]);
    const review=buildMonthlyReview(plan.run,ledger,day('2026-11-01'),day('2026-11-30'));
    expect(review.incomeBani).toBe(expectedIncome+(p.housingStatus==='chirie'?60000:0));
    const state=buildSimulatorDashboardState({...plan.run,lastSettledOn:day('2026-11-30')},ledger,day('2026-11-30'));
    expect(state.incomeLabel).toBe(p.activityStatus==='liceu'?'Buget lunar':'Salariu');
    if(p.activityStatus==='liceu')expect(state.finiMessage.toLowerCase()).not.toContain('salariu');
    const calendar=buildFinancialCalendar(plan.run,ledger,[],day('2026-11-30'),'2026-12');
    expect(calendar.days.flatMap(d=>d.items).filter(i=>i.amountBani>0).map(i=>i.title)).toEqual(p.housingStatus==='chirie'?[state.incomeLabel,'Ajutor chirie']:[state.incomeLabel]);
    expect(calendar.days.flatMap(d=>d.items).find(i=>i.title===state.incomeLabel)?.sourceType).toBe(p.activityStatus==='liceu'?'support':'salary');
  });
  it('legacy run remains byte-for-byte unchanged with historical obligations', () => {
    const run=fixtureRun(), before=JSON.stringify(run), entries=settle(run,[],day('2026-11-06')).newEntries;
    expect(entries.some(e=>e.label==='Contribuție la locuință'&&e.amountBani===-30000)).toBe(true);
    expect(JSON.stringify(run)).toBe(before);expect(run.configSnapshot.lifeProfile).toBeUndefined();
  });
});
describe('Catalog context and deterministic schedule', () => {
  it.each(['liceu','lucrez'] as const)('retains an active pool and quiet days over 60 days for %s', activityStatus => {
    const p: LifeProfile={version:1,activityStatus,housingStatus:'parinti',transportMode:'walk'},e=engine(p);
    const history: ReturnType<typeof planEventDay>['instances']=[],counts:number[]=[];
    for(let i=0;i<60;i++) {
      const date=addDays(day('2026-11-01'),i),result=planEventDay({runId,userId:userA,rngVersion:1,day:date,engine:e,catalog:catalogV2,history,plannedAt:localInstant(date,0).toISOString(),lifeProfile:p});
      counts.push(result.instances.length);history.push(...result.instances);
    }
    expect(history.length).toBeGreaterThan(30);expect(history.length).toBeLessThan(150);
    expect(counts.some(n=>n===0)).toBe(true);expect(new Set(counts).size).toBeGreaterThan(2);
  });
  it('audits all production definitions with context metadata', () => {
    expect(catalogV2).toHaveLength(200);
    expect(catalogV2.every(d=>d.life?.contexts?.length)).toBe(true);
    console.info('LIFE_PROFILE_CATALOG_AUDIT',JSON.stringify({definitions:catalogV2.length,families:new Set(catalogV2.map(d=>d.familyId)).size,...Object.fromEntries(['school','work','free_time','home','transport'].map(tag=>[tag,catalogV2.filter(d=>d.life?.contexts?.includes(tag as 'school')).length])),housingRestricted:catalogV2.filter(d=>d.life?.requiredHousing).length,transportRestricted:catalogV2.filter(d=>d.life?.requiredTransport).length}));
  });
  it.each(profiles)('context and repeated planning for $activityStatus $housingStatus $transportMode', p => {
    const e=engine(p), occupied=occupiedSchedule(day('2026-11-03'),p.activityStatus,e.policySnapshot);
    const cinema=catalogV2.find(d=>d.life?.semanticTags.includes('cinema'))!;
    expect(lifeProfileEventReason(cinema,p,occupied,p.activityStatus==='liceu'?660:780)).toBe('scheduled_hours');
    expect(lifeProfileEventReason(cinema,p,occupied,p.activityStatus==='liceu'?1020:1140)).toBeNull();
    expect(lifeProfileEventReason(cinema,p,null,660)).toBeNull();
    const compatible=catalogV2.filter(d=>d.life?.domain===(p.activityStatus==='liceu'?'school':'work'));
    expect(compatible.some(d=>!lifeProfileEventReason(d,p,occupied,p.activityStatus==='liceu'?660:780))).toBe(true);
    for(const d of catalogV2.filter(d=>d.life?.requiredHousing))expect(lifeProfileEventReason(d,p,null)).toBe(p.housingStatus==='chirie'?null:'housing_profile');
    const input={runId,userId:userA,rngVersion:1 as const,day:day('2026-11-03'),engine:e,catalog:catalogV2,history:[],plannedAt:localInstant(day('2026-11-03'),0).toISOString(),lifeProfile:p};
    expect(planEventDay(input)).toEqual(planEventDay({...input,catalog:[...catalogV2].reverse()}));
    const run=fixtureRun('2026-11-01',lifeProfileConfig(p),p.housingStatus), ledger=settle(run,[],run.startedOn).newEntries;
    const state={run:{...run,lastSettledOn:run.startedOn},ledger,engine:e,instances:[],days:[],revision:0};
    const now=localInstant(day('2026-11-03'),1200);
    const first=synchronizeEvents(state,now,catalogV2);
    const second=synchronizeEvents({...state,ledger:[...ledger,{day:run.startedOn,sequence:101,kind:'ajustare' as const,category:'venit' as const,amountBani:lifeProfilePresets.income.lucrez.parinti,label:'Test funds',refKey:'test:funds',autoResolved:false}]},now,catalogV2);
    expect(first.newInstances.map(i=>[i.id,i.definitionId,i.scheduledAt])).toEqual(second.newInstances.map(i=>[i.id,i.definitionId,i.scheduledAt]));
    expect(first.newInstances.every(i=>Date.parse(i.expiresAt)-Date.parse(i.scheduledAt)===30*60000)).toBe(true);
  });
});
