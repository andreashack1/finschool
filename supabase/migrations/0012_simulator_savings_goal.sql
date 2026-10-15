-- Manual internal transfers. Existing money/history is never rewritten.
begin;
create table public.sim_savings_goals (
 id uuid primary key default gen_random_uuid(), run_id uuid not null, user_id uuid not null,
 name text not null check(length(btrim(name)) between 1 and 60),
 target_amount_bani integer not null check(target_amount_bani>0),
 status text not null check(status in ('active','reached','archived')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 reached_at timestamptz, archived_at timestamptz,
 foreign key(run_id,user_id) references public.sim_runs(id,user_id) on delete cascade,
 unique(id,run_id,user_id), check((status='archived')=(archived_at is not null))
);
create unique index sim_savings_one_current on public.sim_savings_goals(user_id) where status in ('active','reached');
alter table public.sim_savings_goals enable row level security;
revoke all on public.sim_savings_goals from public,anon,authenticated;
grant select on public.sim_savings_goals to authenticated;
grant all on public.sim_savings_goals to service_role;
create policy sim_savings_owner on public.sim_savings_goals for select to authenticated using((select auth.uid())=user_id);

-- This ledger is also the movement history. Never maintain a second saved total.
alter table public.sim_ledger drop constraint sim_ledger_kind_check;
alter table public.sim_ledger add constraint sim_ledger_kind_check check(kind in ('salariu','cheltuiala_fixa','eveniment','decizie_automata','ajustare','abonament','transfer_obiectiv'));
alter table public.sim_ledger add column goal_id uuid;
alter table public.sim_ledger add constraint sim_ledger_goal_owner foreign key(goal_id,run_id,user_id) references public.sim_savings_goals(id,run_id,user_id);
alter table public.sim_ledger add constraint sim_ledger_goal_transfer check((kind='transfer_obiectiv')=(goal_id is not null) and (kind<>'transfer_obiectiv' or (amount_bani<>0 and not auto_resolved)));
create index sim_goal_movements on public.sim_ledger(goal_id) where goal_id is not null;
create table public.sim_goal_operations (
 run_id uuid not null, user_id uuid not null, operation_id uuid not null, goal_id uuid not null,
 request jsonb not null, created_at timestamptz not null default now(),
 primary key(run_id,operation_id),
 foreign key(goal_id,run_id,user_id) references public.sim_savings_goals(id,run_id,user_id) on delete cascade
);
alter table public.sim_goal_operations enable row level security;
revoke all on public.sim_goal_operations from public,anon,authenticated;
grant all on public.sim_goal_operations to service_role;

alter function public.read_simulator_state(uuid) rename to read_simulator_state_v11;
revoke all on function public.read_simulator_state_v11(uuid) from public,anon,authenticated;
create function public.read_simulator_state(p_user uuid) returns jsonb language sql stable security invoker set search_path='' as $$
 select public.read_simulator_state_v11(p_user) || jsonb_build_object('goal',
  (select to_jsonb(g) from public.sim_savings_goals g join public.sim_runs r on r.id=g.run_id
   where g.user_id=p_user and g.status in ('active','reached') and r.status='activ'));
$$;
revoke all on function public.read_simulator_state(uuid) from public,anon,authenticated;
grant execute on function public.read_simulator_state(uuid) to service_role;

create function public.mutate_simulator_goal(p_user uuid,p_run uuid,p_expected bigint,p_day date,p_now timestamptz,p_development boolean,p_input jsonb)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs; g public.sim_savings_goals; receipt public.sim_goal_operations;
 action text:=p_input->>'action'; operation uuid:=(p_input->>'operationId')::uuid;
 saved bigint; available bigint; amount integer; delta integer:=0; target integer; goal_name text; effective_time timestamptz; goal_status text;
begin
 -- SAME run lock and revision used by events, salaries, subscriptions and settlement.
 select * into r from public.sim_runs where id=p_run and user_id=p_user for update;
 if not found or r.status<>'activ' then raise exception 'invalid owner'; end if;
 if operation is null then return jsonb_build_object('status','invalid'); end if;
 select * into receipt from public.sim_goal_operations where run_id=p_run and operation_id=operation;
 if found then
  if receipt.request is distinct from p_input then return jsonb_build_object('status','invalid'); end if;
  return jsonb_build_object('status','retry');
 end if;
 effective_time:=case when p_development then p_now else clock_timestamp() end;
 if p_day is null or effective_time is null or p_day<>(effective_time at time zone 'Europe/Bucharest')::date
  or r.last_settled_on is distinct from p_day or r.event_revision<>p_expected then return jsonb_build_object('status','conflict'); end if;
 if public.simulator_review_required(p_run,p_day) then return jsonb_build_object('status','review_required'); end if;
 if action not in ('create','edit','contribution','withdrawal','archive') or action is null then return jsonb_build_object('status','invalid'); end if;
 if action<>'archive' then
  if jsonb_typeof(p_input->'amount') is distinct from 'number' or p_input->>'amount' !~ '^[0-9]+$' then return jsonb_build_object('status','invalid'); end if;
  if (p_input->>'amount')::numeric not between 1 and 2147483647 then return jsonb_build_object('status','invalid'); end if;
  amount:=(p_input->>'amount')::integer;
 end if;
 if action in ('create','edit') then
  goal_name:=btrim(p_input->>'name');
  if goal_name is null or length(goal_name) not between 1 and 60 then return jsonb_build_object('status','invalid'); end if;
 end if;
 if action='create' then
  if exists(select 1 from public.sim_savings_goals where user_id=p_user and status in ('active','reached')) then return jsonb_build_object('status','exists'); end if;
  insert into public.sim_savings_goals(run_id,user_id,name,target_amount_bani,status) values(p_run,p_user,goal_name,amount,'active') returning * into g;
 else
  select * into g from public.sim_savings_goals where id=(p_input->>'id')::uuid and run_id=p_run and user_id=p_user and status in ('active','reached') for update;
  if not found then return jsonb_build_object('status','missing'); end if;
  select -coalesce(sum(amount_bani),0) into saved from public.sim_ledger where goal_id=g.id;
  select coalesce(sum(amount_bani),0) into available from public.sim_ledger where run_id=p_run;
  target:=g.target_amount_bani;
  if action='contribution' then
   if amount>available then return jsonb_build_object('status','insufficient'); end if;
   if amount>target-saved then return jsonb_build_object('status','over_target'); end if;
   delta:=-amount;
  elsif action='withdrawal' then
   if amount>saved then return jsonb_build_object('status','over_saved'); end if;
   delta:=amount;
  elsif action='archive' then delta:=saved::integer;
  elsif action='edit' then
   if amount<saved then return jsonb_build_object('status','below_saved'); end if;
   target:=amount;
  end if;
  if delta<>0 then
   insert into public.sim_ledger(run_id,user_id,day,sequence,kind,category,amount_bani,label,auto_resolved,ref_key,goal_id)
    values(p_run,p_user,p_day,8999,'transfer_obiectiv','economii',delta,
     case when delta<0 then 'Pus deoparte pentru ' else 'Scoși din obiectivul ' end||g.name,false,'goal:'||g.id::text||':'||operation::text,g.id);
  end if;
  saved:=saved-delta;
  goal_status:=case when action='archive' then 'archived' when saved=target then 'reached' else 'active' end;
  update public.sim_savings_goals set name=coalesce(goal_name,name),target_amount_bani=target,status=goal_status,
   reached_at=case when goal_status='reached' then coalesce(reached_at,effective_time) else null end,
   archived_at=case when goal_status='archived' then effective_time else null end,updated_at=effective_time where id=g.id;
 end if;
 insert into public.sim_goal_operations(run_id,user_id,operation_id,goal_id,request) values(p_run,p_user,operation,g.id,p_input);
 update public.sim_runs set event_revision=event_revision+1,updated_at=now() where id=p_run;
 return jsonb_build_object('status','applied');
end $$;
revoke all on function public.mutate_simulator_goal(uuid,uuid,bigint,date,timestamptz,boolean,jsonb) from public,anon,authenticated;
grant execute on function public.mutate_simulator_goal(uuid,uuid,bigint,date,timestamptz,boolean,jsonb) to service_role;
-- Preserve all monthly-close guards; exclude internal transfers from its SQL totals.
create or replace function public.finalize_simulator_month(p_user uuid,p_run uuid,p_expected bigint,p_day date,p_snapshot jsonb) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs; existing public.sim_monthly_reviews; first_day date; last_day date; income bigint; spent bigint; opening bigint; closing bigint; categories jsonb;
begin
 select * into r from public.sim_runs where id=p_run and user_id=p_user for update;
 if not found or r.status<>'activ' then raise exception 'invalid owner'; end if;
 select * into existing from public.sim_monthly_reviews where run_id=p_run and month_key=p_snapshot->>'monthKey';
 if found then return jsonb_build_object('status','applied','snapshot',existing.snapshot); end if;
 if r.event_revision<>p_expected then return jsonb_build_object('status','conflict'); end if;
 first_day:=(p_snapshot->>'periodStart')::date; last_day:=(p_snapshot->>'periodEnd')::date;
 if first_day<>greatest(r.started_on,date_trunc('month',first_day)::date) or last_day<>(date_trunc('month',first_day)+interval '1 month - 1 day')::date
 or last_day>=p_day or r.last_settled_on is null or r.last_settled_on<last_day or (r.event_engine_started_at is not null and r.event_last_closed_day<last_day)
 or (r.event_engine_started_at is not null and r.event_last_closed_day is null)
 or p_snapshot->>'monthKey'<>to_char(first_day,'YYYY-MM')
 or (p_snapshot->>'daysInPeriod')::integer<>last_day-first_day+1
 or (p_snapshot->>'isPartial')::boolean<>(first_day<>date_trunc('month',first_day)::date)
 then raise exception 'month not closed'; end if;
 -- Backfill must proceed oldest first, including legacy runs with no event engine.
 if exists(select 1 from generate_series(date_trunc('month',r.started_on),date_trunc('month',first_day)-interval '1 month',interval '1 month') d where not exists(select 1 from public.sim_monthly_reviews m where m.run_id=p_run and m.month_key=to_char(d,'YYYY-MM'))) then raise exception 'month order'; end if;
 select coalesce(sum(amount_bani) filter(where amount_bani>0 and (kind='salariu' or (category='venit' and kind in ('eveniment','decizie_automata')))),0),coalesce(-sum(amount_bani) filter(where amount_bani<0),0) into income,spent from public.sim_ledger where run_id=p_run and kind<>'transfer_obiectiv' and day between first_day and last_day;
 select coalesce(sum(amount_bani),0) into opening from public.sim_ledger where run_id=p_run and kind<>'transfer_obiectiv' and (day<first_day or (day=first_day and ref_key like '%:start:balance'));
 select coalesce(sum(amount_bani),0) into closing from public.sim_ledger where run_id=p_run and kind<>'transfer_obiectiv' and day<=last_day;
 if income<>(p_snapshot->>'incomeBani')::bigint or spent<>(p_snapshot->>'spentBani')::bigint or opening<>(p_snapshot->>'openingBalanceBani')::bigint or closing<>(p_snapshot->>'closingBalanceBani')::bigint then raise exception 'snapshot totals mismatch'; end if;
 select coalesce(jsonb_object_agg(category,total),'{}') into categories from (select category,-sum(amount_bani) total from public.sim_ledger where run_id=p_run and kind<>'transfer_obiectiv' and day between first_day and last_day and amount_bani<0 group by category) s;
 if categories is distinct from (select coalesce(jsonb_object_agg(x->>'id',(x->>'amountBani')::bigint),'{}') from jsonb_array_elements(p_snapshot->'categoryBreakdown') x)
 or spent<>(select coalesce(sum((x->>'amountBani')::bigint),0) from jsonb_array_elements(p_snapshot->'topCategories') x)
 or jsonb_array_length(p_snapshot->'insights')>3 or jsonb_array_length(p_snapshot->'topCategories')>5 then raise exception 'snapshot breakdown mismatch'; end if;
 insert into public.sim_monthly_reviews(run_id,user_id,month_key,period_start,period_end,snapshot) values(p_run,p_user,p_snapshot->>'monthKey',first_day,last_day,p_snapshot) returning * into existing;
 return jsonb_build_object('status','applied','snapshot',existing.snapshot);
end $$;
revoke all on function public.finalize_simulator_month(uuid,uuid,bigint,date,jsonb) from public,anon,authenticated;
grant execute on function public.finalize_simulator_month(uuid,uuid,bigint,date,jsonb) to service_role;
notify pgrst,'reload schema';
commit;
