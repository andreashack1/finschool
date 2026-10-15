import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
vi.mock('server-only',()=>({}));
import { fixtureRun, day } from './simulator-fixtures';
import { settle, calculateBalance } from '../src/lib/simulator/settle';
import { goalInputSchema, goalView } from '../src/lib/simulator/savings-goal';
import { ledgerEntrySchema } from '../src/lib/simulator/types';
import { deriveRunState } from '../src/lib/simulator/state';
import { buildMonthlyReview } from '../src/lib/simulator/monthly-review';
import { monthlyTotals, buildSimulatorDashboardState } from '../src/lib/simulator/dashboard';
import { buildFinancialCalendar } from '../src/lib/simulator/financial-calendar';
import { settleSubscriptions, subscriptionSchema } from '../src/lib/simulator/subscriptions';
import { bani } from '../src/lib/simulator/money';
import { engineSchema, instanceSchema } from '../src/lib/simulator/events/types';
import { eventPolicyV1 } from '../src/content/simulator/events/policy-v1';
import { catalogV1 } from '../src/content/simulator/events/catalog-v1.server';
import { planEventDay } from '../src/lib/simulator/events/planner';
import { optionAvailability, resolveEvent } from '../src/lib/simulator/events/resolve';

let db:PGlite;
let missingGoalRpcCode:string|undefined;
const date='2026-10-10', now='2026-10-10T09:00:00.000Z';
type Account={userId:string;run:ReturnType<typeof fixtureRun>};
async function account():Promise<Account> {
  const run={...fixtureRun(date),id:crypto.randomUUID(),userId:crypto.randomUUID()};
  await db.query('insert into auth.users values($1)',[run.userId]);
  await db.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb)',[run.userId,JSON.stringify(run),JSON.stringify(settle(run,[],run.startedOn).newEntries.map(e=>({...e,runId:run.id,userId:run.userId})))]);
  // Deterministic fixture: 1,000 lei total cash without changing production defaults.
  await db.query("update public.sim_ledger set amount_bani=100000-(select coalesce(sum(amount_bani),0) from public.sim_ledger where run_id=$1 and kind<>'ajustare') where run_id=$1 and kind='ajustare'",[run.id]);
  return {userId:run.userId,run};
}
async function state(a:Account) {
  const result=await db.query<{result:{run:Record<string,unknown>;goal:{id:string;name:string;target_amount_bani:number;status:string}|null;ledger:Record<string,unknown>[]}}>('select public.read_simulator_state($1) as result',[a.userId]);
  const rows=result.rows[0].result;
  const ledger=rows.ledger.map(e=>ledgerEntrySchema.parse({day:e.day,sequence:e.sequence,kind:e.kind,category:e.category,amountBani:e.amount_bani,label:e.label,refKey:e.ref_key,autoResolved:e.auto_resolved}));
  const goal=rows.goal?goalView(rows.goal,ledger):null;
  return {revision:Number(rows.run.event_revision),ledger,goal,available:calculateBalance(ledger)};
}
async function mutate(a:Account,input:object,expected?:number,when=date) {
  const revision=expected??(await state(a)).revision;
  const result=await db.query<{result:{status:string}}>('select public.mutate_simulator_goal($1,$2,$3,$4,$5,true,$6::jsonb) as result',[a.userId,a.run.id,revision,when,when===date?now:`${when}T09:00:00.000Z`,JSON.stringify(input)]);
  return result.rows[0].result.status;
}
const create=(amount=350000)=>({action:'create',name:'Laptop',amount,operationId:crypto.randomUUID()});
const movement=(id:string,action:string,amount?:number)=>({id,action,...(amount!==undefined?{amount}:{}),operationId:crypto.randomUUID()});
const assets=(s:Awaited<ReturnType<typeof state>>)=>s.available+(s.goal?.savedAmountBani??0);

describe('Savings goal real PostgreSQL accounting, receipts, CAS and RLS',()=>{
  beforeAll(async()=>{
    db=new PGlite();
    await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema public,auth to anon,authenticated,service_role;");
    for(const file of ['0003_simulator_foundation.sql','0004_simulator_events.sql','0005_simulator_consequences.sql','0006_simulator_subscriptions.sql','0007_simulator_life_catalog.sql','0008_simulator_monthly_reviews.sql','0010_simulator_decision_policy.sql'])await db.exec(readFileSync(`supabase/migrations/${file}`,'utf8'));
    try { await db.query("select public.mutate_simulator_goal(null,null,0,null,null,false,'{}'::jsonb)"); } catch(error) { missingGoalRpcCode=(error as {code?:string}).code; }
    await db.exec(readFileSync('supabase/migrations/0012_simulator_savings_goal.sql','utf8'));
  },30000);
  afterAll(async()=>{await db.close();});
  it('requires migration 0012: missing RPC fails, migrated schema creates a decimal target',async()=>{
    expect(missingGoalRpcCode).toBe('42883');
    const a=await account();const input=goalInputSchema.parse({action:'create',name:'  Laptop  ',amount:'3500,50',operationId:crypto.randomUUID()});
    expect(await mutate(a,input)).toBe('applied');
    expect((await state(a)).goal).toMatchObject({name:'Laptop',targetAmountBani:350050,savedAmountBani:0,progressPercent:0,status:'active'});
  });
  it('preserves the exact 500 available + 100 reserved → 300 available + 300 reserved invariant',async()=>{
    const a=await account();
    await db.query("update sim_ledger set amount_bani=amount_bani-40000 where run_id=$1 and kind='ajustare'",[a.run.id]);
    await mutate(a,create());const id=(await state(a)).goal!.id;
    await mutate(a,movement(id,'contribution',10000));const before=await state(a);
    expect(before.available).toBe(50000);expect(before.goal!.savedAmountBani).toBe(10000);
    expect(await mutate(a,movement(id,'contribution',20000))).toBe('applied');const after=await state(a);
    expect(after.available).toBe(30000);expect(after.goal!.savedAmountBani).toBe(30000);
    expect(assets(before)).toBe(60000);expect(assets(after)).toBe(60000);
    expect(monthlyTotals(after.ledger,day(date))).toEqual(monthlyTotals(before.ledger,day(date)));
  });
  it('persists successive 50/100/200 amounts from 500 available and custom 37,50',async()=>{
    const a=await account();await db.query("update sim_ledger set amount_bani=amount_bani-50000 where run_id=$1 and kind='ajustare'",[a.run.id]);
    await mutate(a,create());const id=(await state(a)).goal!.id;
    for(const [amount,available,saved] of [[5000,45000,5000],[10000,35000,15000],[20000,15000,35000],[3750,11250,38750]]){
      expect(await mutate(a,movement(id,'contribution',amount))).toBe('applied');const current=await state(a);
      expect(current.available).toBe(available);expect(current.goal!.savedAmountBani).toBe(saved);expect(assets(current)).toBe(50000);
    }
  });
  it('creates empty goal and rejects second goal, including reached goals',async()=>{
    const a=await account();expect(await mutate(a,create(20000))).toBe('applied');
    expect((await state(a)).goal).toMatchObject({name:'Laptop',savedAmountBani:0,status:'active'});
    expect(await mutate(a,create())).toBe('exists');
    await mutate(a,movement((await state(a)).goal!.id,'contribution',20000));
    expect(await mutate(a,create())).toBe('exists');
  });
  it('contributes/withdraws atomically, conserves assets and leaves all income/expense metrics unchanged',async()=>{
    const a=await account();await mutate(a,create());const before=await state(a),id=before.goal!.id;
    expect(before.available).toBe(100000);
    expect(await mutate(a,movement(id,'contribution',20000))).toBe('applied');
    const deposit=await state(a);expect(deposit.available).toBe(80000);expect(deposit.goal!.savedAmountBani).toBe(20000);expect(deposit.goal!.progressPercent).toBe(6);expect(assets(deposit)).toBe(assets(before));
    await mutate(a,movement(id,'withdrawal',10000));const withdrawn=await state(a);
    expect(withdrawn.available).toBe(90000);expect(withdrawn.goal!.savedAmountBani).toBe(10000);expect(assets(withdrawn)).toBe(assets(before));
    const run={...a.run,lastSettledOn:day(date)};
    expect(monthlyTotals(withdrawn.ledger,day(date))).toEqual(monthlyTotals(before.ledger,day(date)));
    expect(deriveRunState(run,withdrawn.ledger,[],[],day(date)).spentByCategoryThisMonth).toEqual(deriveRunState(run,before.ledger,[],[],day(date)).spentByCategoryThisMonth);
    const review=buildMonthlyReview(run,withdrawn.ledger,day(date),day('2026-10-31'));
    const baseline=buildMonthlyReview(run,before.ledger,day(date),day('2026-10-31'));
    expect(review.spentBani).toBe(baseline.spentBani);expect(review.incomeBani).toBe(baseline.incomeBani);expect(review.categoryBreakdown).toEqual(baseline.categoryBreakdown);expect(review.insights).toEqual(baseline.insights);
    expect(review.openingBalanceBani).toBe(baseline.openingBalanceBani);expect(review.closingBalanceBani).toBe(baseline.closingBalanceBani);
    const dashboard=buildSimulatorDashboardState(run,withdrawn.ledger,day(date));
    expect(dashboard.monthlyJournal.entries.filter(e=>e.type==='Transfer')).toHaveLength(2);
    expect(buildFinancialCalendar(run,withdrawn.ledger,[],day(date),'2026-10').days.flatMap(d=>d.items).some(e=>e.title.includes('Laptop'))).toBe(false);
    await mutate(a,movement(id,'contribution',85000));const reserved=await state(a);
    const obligation=ledgerEntrySchema.parse({day:date,sequence:999,kind:'cheltuiala_fixa',category:'locuinta',amountBani:-10000,label:'Obligation',refKey:'qa:obligation',autoResolved:false});
    expect(calculateBalance([...reserved.ledger,obligation])).toBe(-5000);
    const withReserve=buildMonthlyReview(run,[...reserved.ledger,obligation],day(date),day('2026-10-31'));
    const withoutReserve=buildMonthlyReview(run,[...before.ledger,obligation],day(date),day('2026-10-31'));
    expect(withReserve).toEqual(withoutReserve);expect(withReserve.insights.some(i=>i.id==='negative_balance')).toBe(false);
  });
  it('rejects insufficient cash, overfunding, excessive withdrawal and invalid target without mutations',async()=>{
    const a=await account();await mutate(a,create(50000));const before=await state(a),id=before.goal!.id;
    expect(await mutate(a,movement(id,'contribution',150000))).toBe('insufficient');
    expect(await mutate(a,movement(id,'contribution',60000))).toBe('over_target');
    expect(await mutate(a,movement(id,'withdrawal',1))).toBe('over_saved');
    expect((await state(a)).ledger).toEqual(before.ledger);
    await mutate(a,movement(id,'contribution',20000));
    expect(await mutate(a,{...movement(id,'edit',10000),name:'Laptop'})).toBe('below_saved');
  });
  it('handles exact completion, withdrawal, target equal to savings and target increase',async()=>{
    const a=await account();await mutate(a,create(30000));const id=(await state(a)).goal!.id;
    await mutate(a,movement(id,'contribution',30000));expect((await state(a)).goal).toMatchObject({status:'reached',progressPercent:100,savedAmountBani:30000});
    expect((await state(a)).available).toBe(70000);
    await mutate(a,movement(id,'withdrawal',10000));expect((await state(a)).goal!.status).toBe('active');
    await mutate(a,{...movement(id,'edit',20000),name:'MacBook'});expect((await state(a)).goal).toMatchObject({name:'MacBook',status:'reached'});
    await mutate(a,{...movement(id,'edit',40000),name:'MacBook'});expect((await state(a)).goal).toMatchObject({status:'active',savedAmountBani:20000});
  });
  it('retries create/deposit/edit/archive exactly once, rejects reused identity with changed payload',async()=>{
    const a=await account(),creation=create();await mutate(a,creation);expect(await mutate(a,creation)).toBe('retry');
    const id=(await state(a)).goal!.id,deposit=movement(id,'contribution',20000);await mutate(a,deposit);expect(await mutate(a,deposit)).toBe('retry');
    expect(await mutate(a,{...deposit,amount:30000})).toBe('invalid');expect((await state(a)).goal!.savedAmountBani).toBe(20000);
    const edit={...movement(id,'edit',400000),name:'MacBook'};await mutate(a,edit);expect(await mutate(a,edit)).toBe('retry');
    const archive=movement(id,'archive');await mutate(a,archive);expect(await mutate(a,archive)).toBe('retry');
    const result=await state(a);expect(result.goal).toBeNull();expect(result.available).toBe(100000);expect(await mutate(a,create())).toBe('applied');
  });
  it('archives empty goal without money movement',async()=>{
    const a=await account();await mutate(a,create());const before=await state(a);await mutate(a,movement(before.goal!.id,'archive'));expect((await state(a)).ledger).toEqual(before.ledger);
  });
  it('two stale tabs cannot spend the same balance; event commits share the same CAS',async()=>{
    const a=await account();await mutate(a,create());const before=await state(a),id=before.goal!.id;
    const results=await Promise.all([mutate(a,movement(id,'contribution',70000),before.revision),mutate(a,movement(id,'contribution',70000),before.revision)]);
    expect(results.sort()).toEqual(['applied','conflict']);expect(await mutate(a,movement(id,'contribution',70000))).toBe('insufficient');
    const event=await db.query<{result:{status:string}}>("select public.commit_simulator_events($1,$2,$3,$4,$4,'{}','[]','[]','[]',$5,true) as result",[a.userId,a.run.id,before.revision,date,now]);
    expect(event.rows[0].result.status).toBe('conflict');expect(assets(await state(a))).toBe(100000);
  });
  it('rolls back release and archive together on injected ledger failure',async()=>{
    const a=await account();await mutate(a,create());const id=(await state(a)).goal!.id;await mutate(a,movement(id,'contribution',20000));
    await db.exec("create function public.qa_goal_fail() returns trigger language plpgsql as $$ begin if NEW.kind='transfer_obiectiv' and NEW.amount_bani>0 then raise exception 'injected failure';end if;return NEW;end $$;create trigger qa_goal_fail before insert on public.sim_ledger for each row execute function public.qa_goal_fail();");
    const before=await state(a);try{await expect(mutate(a,movement(id,'archive'))).rejects.toThrow('injected failure');expect(await state(a)).toEqual(before);}finally{await db.exec('drop trigger qa_goal_fail on public.sim_ledger;drop function public.qa_goal_fail();');}
  });
  it('salary and fixed expenses still settle, preserving reserve/calendar/upcoming',async()=>{
    const a=await account();await mutate(a,create());const id=(await state(a)).goal!.id;await mutate(a,movement(id,'contribution',20000));const before=await state(a);
    const run={...a.run,lastSettledOn:day(date)},result=settle(run,before.ledger,day('2026-11-10'));
    await db.query('select public.apply_simulator_settlement($1,$2,$3,$4,$5::jsonb)',[a.userId,a.run.id,date,'2026-11-10',JSON.stringify(result.newEntries.map(e=>({...e,runId:a.run.id,userId:a.userId})))]);
    const after=await state(a);expect(after.goal!.savedAmountBani).toBe(20000);expect(after.ledger.some(e=>e.kind==='salariu')).toBe(true);expect(after.ledger.some(e=>e.kind==='cheltuiala_fixa')).toBe(true);
    const dashboard=buildSimulatorDashboardState({...run,lastSettledOn:day('2026-11-10')},after.ledger,day('2026-11-10'));
    expect(dashboard.upcomingFinancialMovements.some(e=>e.sourceType==='fixed_expense')).toBe(true);
    expect(buildFinancialCalendar(run,after.ledger,[],day('2026-11-10'),'2026-11').days.flatMap(d=>d.items).some(e=>e.sourceType==='fixed_expense')).toBe(true);
    const snapshot=buildMonthlyReview(run,after.ledger,run.startedOn,day('2026-10-31'));
    await expect(db.query('select public.finalize_simulator_month($1,$2,$3,$4,$5::jsonb)',[a.userId,a.run.id,after.revision,'2026-11-10',JSON.stringify({...snapshot,spentBani:snapshot.spentBani+20000})])).rejects.toThrow('snapshot totals mismatch');
    const closed=await db.query<{result:{status:string;snapshot:unknown}}>('select public.finalize_simulator_month($1,$2,$3,$4,$5::jsonb) as result',[a.userId,a.run.id,after.revision,'2026-11-10',JSON.stringify(snapshot)]);
    expect(closed.rows[0].result).toEqual({status:'applied',snapshot});
    expect(await mutate(a,movement(id,'withdrawal',100),undefined,'2026-11-10')).toBe('review_required');
    expect((await state(a)).ledger).toEqual(after.ledger);
  });
  it('900 lei choice cannot use 200 reserved; event planning is independent of cash and reserve',async()=>{
    const a=await account();await mutate(a,create());const id=(await state(a)).goal!.id;await mutate(a,movement(id,'contribution',20000));const current=await state(a);
    const engine=engineSchema.parse({scheduleProfile:'liceu',startedAt:'2026-10-10T00:00:00.000Z',catalogVersion:1,policyVersion:1,policySnapshot:eventPolicyV1,lastClosedDay:null,processedAt:null});
    const event=instanceSchema.parse({id:crypto.randomUUID(),runId:a.run.id,userId:a.userId,day:date,definitionId:'goal_test',definitionVersion:1,familyId:'goal_test',variationId:'goal_test',scheduledAt:now,expiresAt:'2026-10-10T20:59:59.000Z',snapshotVersion:1,snapshot:{version:1,title:'Choice',description:'Fixture',variationId:'goal_test',category:'cumparaturi',options:[{id:'paid',label:'Purchase',costBani:90000,feedback:'Bought',durationMinutes:0,fallbackWhenUnaffordable:false},{id:'free',label:'Free',costBani:0,feedback:'Free',durationMinutes:0,fallbackWhenUnaffordable:true}]},status:'pending',resolutionMode:null,selectedOptionId:null,selectedCostBani:null,feedbackSnapshot:null,resolvedAt:null,activityStartAt:null,activityEndAt:null,generationKey:'goal-test',cancelReason:null,createdAt:now});
    expect(optionAvailability(event,current.available,[],engine)[0].unavailableReason).toBe('insufficient_funds');
    expect(optionAvailability(event,bani(100000),[],engine)[0].unavailableReason).toBeNull();
    expect(()=>resolveEvent(event,'paid','manual',now,current.available,[],engine,1)).toThrow('Option unavailable');
    const base={runId:a.run.id,userId:a.userId,rngVersion:1 as const,day:day(date),engine,catalog:catalogV1,history:[],plannedAt:now};
    expect(planEventDay({...base,...{balanceBani:current.available,goal:current.goal}})).toEqual(planEventDay({...base,...{balanceBani:100000,goal:null}}));
  });
  it('mandatory subscription may make available negative without raiding goal reserve',async()=>{
    const a=await account();await mutate(a,create());const id=(await state(a)).goal!.id;await mutate(a,movement(id,'contribution',20000));const current=await state(a);
    const subscription=subscriptionSchema.parse({id:crypto.randomUUID(),runId:a.run.id,userId:a.userId,name:'Obligation',amountBani:90000,intervalMonths:1,anchorDayOfMonth:10,nextDueOn:date,endsOn:null,status:'active',revision:1,createdAt:now,updatedAt:now,cancelledAt:null});
    const result=settleSubscriptions([subscription],current.ledger,day(date));
    expect(calculateBalance([...current.ledger,...result.entries])).toBe(-10000);
    expect(goalView({id,name:'Laptop',target_amount_bani:350000,status:'active'},[...current.ledger,...result.entries]).savedAmountBani).toBe(20000);
  });
  it('enforces ownership, per-user RLS and no browser money mutation privileges',async()=>{
    const a=await account(),b=await account();await mutate(a,create());const id=(await state(a)).goal!.id;
    expect(await mutate(b,movement(id,'contribution',10000))).toBe('missing');
    await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${b.userId}',false);`);
    try{expect((await db.query('select * from public.sim_savings_goals')).rows).toEqual([]);await expect(db.query('insert into public.sim_savings_goals(run_id,user_id,name,target_amount_bani,status) values($1,$2,\'Bad\',100,\'active\')',[b.run.id,b.userId])).rejects.toThrow();await expect(db.query('select public.mutate_simulator_goal($1,$2,0,$3,$4,true,$5)',[b.userId,b.run.id,date,now,JSON.stringify(create())])).rejects.toThrow();}finally{await db.exec('reset role');}
    await db.exec('set role anon');try{await expect(db.query('select * from public.sim_savings_goals')).rejects.toThrow();}finally{await db.exec('reset role');}
  });
  it('validates money input, whitespace names, overflow, account spoofing',()=>{
    expect(goalInputSchema.parse({action:'create',name:' Laptop ',amount:'100,50',operationId:crypto.randomUUID()})).toMatchObject({name:'Laptop',amount:10050});
    for(const amount of ['0','-1','NaN','Infinity','21474836.48','1,234','3.500'])expect(goalInputSchema.safeParse({action:'create',name:'Laptop',amount,operationId:crypto.randomUUID()}).success).toBe(false);
    expect(goalInputSchema.safeParse({action:'create',name:' ',amount:'100',operationId:crypto.randomUUID()}).success).toBe(false);
    expect(goalInputSchema.safeParse({action:'create',name:'Laptop',amount:'100',userId:crypto.randomUUID(),operationId:crypto.randomUUID()}).success).toBe(false);
  });
});
