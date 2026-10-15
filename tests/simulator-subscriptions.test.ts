import { describe, expect, it } from 'vitest';
import { amountInputSchema, createSubscriptionSchema, nextSubscriptionDate, settleSubscriptions, subscriptionDates, subscriptionSchema } from '../src/lib/simulator/subscriptions';
import { buildFinancialCalendar } from '../src/lib/simulator/financial-calendar';
import { upcomingMovements } from '../src/lib/simulator/dashboard';
import { day, fixtureRun, userA, runId } from './simulator-fixtures';
import { settle } from '../src/lib/simulator/settle';
import { bani } from '../src/lib/simulator/money';

const fixture = (date = '2026-10-12', interval = 1) => subscriptionSchema.parse({ id: '44444444-4444-4444-8444-444444444444', runId, userId: userA, name: 'Abonament sală', amountBani: 30000, intervalMonths: interval,
  anchorDayOfMonth: Number(date.slice(-2)), nextDueOn: date, endsOn: null, status: 'active', revision: 1, createdAt: '2026-10-10T08:00:00.000Z', updatedAt: '2026-10-10T08:00:00.000Z', cancelledAt: null });
describe('Chapter 5 civil recurrence and financial projections', () => {
  it.each([
    ['2026-10-12',1,12,'2026-11-12'],['2026-11-12',1,12,'2026-12-12'],
    ['2027-01-31',1,31,'2027-02-28'],['2027-02-28',1,31,'2027-03-31'],
    ['2026-03-31',1,31,'2026-04-30'],['2026-04-30',1,31,'2026-05-31'],
    ['2028-01-31',1,31,'2028-02-29'],['2028-02-29',12,29,'2029-02-28'],
    ['2031-02-28',12,29,'2032-02-29'],['2026-11-30',3,30,'2027-02-28'],
    ['2027-02-28',3,30,'2027-05-30'],['2026-08-31',6,31,'2027-02-28'],
  ])('advance %s by %i months preserving anchor %i', (date, interval, anchor, expected) => expect(nextSubscriptionDate(day(date), interval, anchor)).toBe(expected));
  it.each(['300','300,50','300.50'])('decimal input %s is exact integer money', amount => expect(amountInputSchema.parse(amount)).toBe(amount === '300' ? 30000 : 30050));
  it.each(['0','-1','1.234','Infinity','3e2','21474836.48'])('invalid amount %s rejected', amount => expect(amountInputSchema.safeParse(amount).success).toBe(false));
  it('strict input rejects authority fields, HTML, blank or overly long names', () => {
    const input = { name:' sală ', amount:'300', intervalMonths:1, nextDueOn:'2026-10-12', operationId:crypto.randomUUID() };
    expect(createSubscriptionSchema.parse(input).name).toBe('sală');
    for (const extra of [{userId:userA},{balance:12},{status:'paid'},{runId}]) expect(createSubscriptionSchema.safeParse({...input,...extra}).success).toBe(false);
    for (const name of [' ','<b>Sală</b>','a'.repeat(61)]) expect(createSubscriptionSchema.safeParse({...input,name}).success).toBe(false);
  });
  it('catch-up, idempotency, snapshot label and finite end boundary', () => {
    const s = {...fixture('2027-01-31'), endsOn:day('2027-04-30')};
    const result = settleSubscriptions([s],[],day('2027-05-10'));
    expect(result.entries.map(e=>e.day)).toEqual(['2027-01-31','2027-02-28','2027-03-31','2027-04-30']);
    expect(settleSubscriptions(result.subscriptions,result.entries,day('2027-05-10')).entries).toEqual([]);
    expect(result.entries[0].label).toBe('Abonament · Abonament sală');
    expect(result.subscriptions[0].anchorDayOfMonth).toBe(31);
    expect(subscriptionDates({...s,status:'cancelled'},day('2027-01-01'),day('2027-12-31'))).toEqual([]);
  });
  it('future calendar is read-only and contains no random ledger events', () => {
    const run = fixtureRun('2026-10-10'), ledger = settle(run,[],day('2026-10-10')).newEntries, before = structuredClone(ledger), s = fixture();
    const calendar = buildFinancialCalendar(run,ledger,[s],day('2026-10-10'),'2026-11');
    expect(calendar.days.find(d=>d.day==='2026-11-12')!.items).toMatchObject([{title:'Abonament sală',amountBani:-30000,status:'upcoming'}]);
    expect(new Set(calendar.days.flatMap(d=>d.items.map(i=>i.sourceType)))).toEqual(new Set(['salary','fixed_expense','subscription']));
    expect(ledger).toEqual(before); expect(JSON.stringify(calendar)).not.toMatch(/refKey|eventId|anchorDay|userId|runId/);
  });
  it('past calendar uses snapshots even after rename/cancel; never reconstructs missing past obligations', () => {
    const run=fixtureRun('2026-10-10'), s=fixture(), actual=settleSubscriptions([s],[],day('2026-10-12')).entries;
    const calendar=buildFinancialCalendar(run,actual,[{...s,name:'Nou',amountBani:bani(35000),status:'cancelled'}],day('2026-11-01'),'2026-10');
    expect(calendar.days.find(d=>d.day==='2026-10-12')!.items).toMatchObject([{title:'Abonament sală',amountBani:-30000,status:'paid'}]);
    expect(calendar.days.flatMap(d=>d.items)).toHaveLength(1);
  });
  it('upcoming is nearest three, with salary/fixed/subscription server order', () => {
    const run=fixtureRun('2026-10-10'), subscriptions=Array.from({length:20},(_,i)=>({...fixture('2026-11-01'),id:`44444444-4444-4444-8444-${String(i).padStart(12,'0')}`}));
    const items=upcomingMovements(run,day('2026-10-31'),subscriptions);
    expect(items).toHaveLength(3); expect(items[0].sourceType).toBe('salary');
    expect(items.every(e=>e.day==='2026-11-01')).toBe(true);
  });
});
