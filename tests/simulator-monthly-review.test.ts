import { describe,expect,it } from 'vitest';
import { buildMonthlyReview,closedReviewPeriods,rankReviewInsights } from '../src/lib/simulator/monthly-review';
import { bani } from '../src/lib/simulator/money';
import { settle } from '../src/lib/simulator/settle';
import { day,fixtureRun } from './simulator-fixtures';
import { dayKey } from '../src/lib/simulator/calendar';
import type { LedgerEntry } from '../src/lib/simulator/types';
import type { EventInstance } from '../src/lib/simulator/events/types';
const expense=(n:number,amount=1800,category:LedgerEntry['category']='mancare',kind:LedgerEntry['kind']='eveniment'):LedgerEntry=>({day:day('2026-10-20'),sequence:1000+n,kind,category,amountBani:bani(-amount),label:'Fixture',refKey:`fixture:${n}`,autoResolved:false});
describe('Monthly review deterministic evidence and calendar',()=>{
 it.each([['2024-02-18','2024-03-01','2024-02-29',12],['2025-02-18','2025-03-01','2025-02-28',11],['2026-12-18','2027-01-01','2026-12-31',14],['2026-01-18','2026-02-01','2026-01-31',14]])('civil periods %s',(start,current,end,days)=>{
  const run=fixtureRun(start),period=closedReviewPeriods(run,day(current),day(end))[0];expect(period).toEqual({start:day(start),end:day(end)});expect(buildMonthlyReview(run,[],period.start,period.end).daysInPeriod).toBe(days);
 });
 it('Bucharest crosses month before UTC and open months are excluded',()=>{expect(dayKey(new Date('2026-10-31T22:30:00Z'))).toBe('2026-11-01');expect(closedReviewPeriods(fixtureRun(),day('2026-10-31'),day('2026-10-31'))).toEqual([]);});
 it('partial first month, starting balance, future entries and category reconciliation',()=>{
  const run=fixtureRun('2026-10-18'),ledger=settle(run,[],day('2026-11-10')).newEntries;
  ledger.push(...['mancare','iesiri','cumparaturi','transport','scoala','sanatate'].map((c,i)=>expense(i,1101+i,c as LedgerEntry['category'])));
  const s=buildMonthlyReview(run,ledger,run.startedOn,day('2026-10-31'));
  expect(s.isPartial).toBe(true);expect(s.daysInPeriod).toBe(14);expect(s.incomeBani).toBe(0);expect(s.openingBalanceBani).toBe(run.configSnapshot.startingBalanceBani);
  expect(s.topCategories).toHaveLength(5);expect(s.topCategories.at(-1)?.id).toBe('other');expect(s.topCategories.reduce((n,c)=>n+c.amountBani,0)).toBe(s.spentBani);expect(s.closingBalanceBani).toBe(ledger.filter(e=>e.day<='2026-10-31').reduce((n,e)=>n+e.amountBani,0));
 });
 it('small purchases exact count, sum and deterministic four-purchase what-if',()=>{
  const run=fixtureRun('2026-10-01'),entries=[1800,2200,2000,2200,2100,1900].map((a,i)=>expense(i,a));
  const s=buildMonthlyReview(run,entries,run.startedOn,day('2026-10-31')),i=s.insights.find(i=>i.id==='small_spends')!;
  expect(i.amountBani).toBe(12200);expect(i.body).toContain('6 cumpărături');expect(i.body).toContain('păstrai 82 lei');expect(i.evidence).toHaveLength(6);expect(buildMonthlyReview(run,[...entries].reverse(),run.startedOn,day('2026-10-31'))).toEqual(s);
 });
 it('automatic necessities and a lone coffee do not create small-purchase judgment',()=>{const r=fixtureRun();const s=buildMonthlyReview(r,[expense(0),...Array.from({length:9},(_,i)=>expense(i+1,1800,'mancare','decizie_automata'))],r.startedOn,day('2026-10-31'));expect(s.insights.some(i=>i.id==='small_spends')).toBe(false);});
 it('actual subscription charges only, zero costs and no usage claims',()=>{const r=fixtureRun();const s=buildMonthlyReview(r,[expense(1,2999,'abonamente','abonament'),expense(2,0),{...expense(3,5000,'abonamente','abonament'),day:day('2026-11-01')}],r.startedOn,day('2026-10-31'));expect(s.spentBani).toBe(2999);expect(s.insights.find(i=>i.id==='subscriptions')?.amountBani).toBe(2999);expect(JSON.stringify(s)).not.toMatch(/NaN|Infinity|Nu folosești/);});
 it('empty data falls back and negative closing balance is supported',()=>{const r=fixtureRun();expect(buildMonthlyReview(r,[],r.startedOn,day('2026-10-31')).finiMessage).toBe('Asta a fost luna ta. Continuăm.');expect(buildMonthlyReview(r,[expense(0)],r.startedOn,day('2026-10-31')).closingBalanceBani).toBe(-1800);});
 it('full adjacent months compare, partial months never compare',()=>{
  const r=fixtureRun('2026-10-01'),oct=buildMonthlyReview(r,[expense(1,10000,'iesiri')],r.startedOn,day('2026-10-31'));
  const ledger=[{...expense(2,1000,'iesiri'),day:day('2026-11-20')}];
  const nov=buildMonthlyReview(r,ledger,day('2026-11-01'),day('2026-11-30'),oct);expect(nov.insights.find(i=>i.id==='month_change')?.body).toContain('90 lei mai puțin');expect(buildMonthlyReview(r,ledger,day('2026-11-01'),day('2026-11-30'),{...oct,isPartial:true}).insights.some(i=>i.id==='month_change')).toBe(false);
 });
 it('ranks at most three diverse families with stable ties',()=>{const candidates=Array.from({length:6},(_,i)=>({id:`i${i}`,family:i<3?'food':`family${i}`,priority:100-i,title:'Test',body:'Test',evidence:[]}));expect(rankReviewInsights(candidates).map(i=>i.id)).toEqual(['i0','i3','i4']);});
 it('positive observation requires actual manual free choices with paid alternatives; automatic fallback earns no praise',()=>{
  const r=fixtureRun();const events=Array.from({length:3},(_,i)=>({id:`choice-${i}`,day:day('2026-10-20'),status:'resolved',resolutionMode:'manual',selectedCostBani:0,snapshot:{options:[{costBani:0},{costBani:2000}]}} as EventInstance));
  const s=buildMonthlyReview(r,[],r.startedOn,day('2026-10-31'),undefined,events);expect(s.insights.find(i=>i.id==='free_choices')?.evidence).toHaveLength(3);expect(s.insights[0].body).toContain('3 situații');expect(s.insights[0].body).not.toContain('lei');expect(buildMonthlyReview(r,[],r.startedOn,day('2026-10-31'),undefined,events.map(e=>({...e,resolutionMode:'automatic'}))).insights).toEqual([]);
 });
 it('fixed food obligations are excluded from flexible spending claims',()=>{const r=fixtureRun();const s=buildMonthlyReview(r,[expense(1,99999,'mancare','cheltuiala_fixa'),expense(2,2500,'mancare')],r.startedOn,day('2026-10-31'));expect(s.insights.find(i=>i.id==='largest_flexible')?.amountBani).toBe(2500);});
 it('deferring a flagged problem does not produce a positive free-choice observation',()=>{
  const r=fixtureRun();const events=Array.from({length:3},(_,i)=>({id:`defer-${i}`,day:day('2026-10-20'),status:'resolved',resolutionMode:'manual',selectedOptionId:'defer',selectedCostBani:0,snapshot:{options:[{id:'defer',costBani:0,consequences:[{id:'problem',type:'set_flag',key:'phone_problematic',value:true}]},{id:'repair',costBani:2000}]}} as EventInstance));
  expect(buildMonthlyReview(r,[],r.startedOn,day('2026-10-31'),undefined,events).insights).toEqual([]);
  expect(buildMonthlyReview(r,Array.from({length:6},(_,i)=>expense(i,1800,'tehnologie')),r.startedOn,day('2026-10-31')).insights.some(i=>i.family==='flexible')).toBe(false);
 });
});
