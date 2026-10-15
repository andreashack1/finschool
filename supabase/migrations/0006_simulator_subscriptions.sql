-- Chapter 5. Apply manually after 0005; no reset or historical rewrite.
begin;
create table public.sim_subscriptions (
 id uuid primary key, run_id uuid not null, user_id uuid not null,
 name text not null check(length(btrim(name)) between 1 and 60 and name !~ '[<>[:cntrl:]]'),
 amount_bani integer not null check(amount_bani>0),
 interval_months integer not null check(interval_months in (1,3,6,12)),
 anchor_day_of_month integer not null check(anchor_day_of_month between 1 and 31),
 next_due_on date not null, ends_on date,
 status text not null check(status in ('active','cancelled')), revision integer not null check(revision>=1),
 created_at timestamptz not null, updated_at timestamptz not null, cancelled_at timestamptz,
 foreign key(run_id,user_id) references public.sim_runs(id,user_id) on delete cascade,
 check((status='cancelled')=(cancelled_at is not null)),
 check(ends_on is null or ends_on >= (created_at at time zone 'Europe/Bucharest')::date)
);
create index sim_subscriptions_schedule on public.sim_subscriptions(run_id,status,next_due_on);
alter table public.sim_subscriptions enable row level security;
revoke all on public.sim_subscriptions from public,anon,authenticated;
grant select on public.sim_subscriptions to authenticated;
grant all on public.sim_subscriptions to service_role;
create policy sim_subscriptions_owner on public.sim_subscriptions for select to authenticated using((select auth.uid())=user_id);
create table public.sim_subscription_operations (
 run_id uuid not null, user_id uuid not null, operation_id uuid not null, subscription_id uuid not null references public.sim_subscriptions(id),
 action text not null check(action in ('create','edit','cancel')), created_at timestamptz not null default now(),
 primary key(run_id,operation_id), foreign key(run_id,user_id) references public.sim_runs(id,user_id) on delete cascade
);
alter table public.sim_subscription_operations enable row level security;
revoke all on public.sim_subscription_operations from public,anon,authenticated;
grant all on public.sim_subscription_operations to service_role;
alter table public.sim_ledger drop constraint sim_ledger_kind_check;
alter table public.sim_ledger add constraint sim_ledger_kind_check check(kind in ('salariu','cheltuiala_fixa','eveniment','decizie_automata','ajustare','abonament'));

alter function public.read_simulator_state(uuid) rename to read_simulator_state_v4;
revoke all on function public.read_simulator_state_v4(uuid) from public,anon,authenticated;
create function public.read_simulator_state(p_user uuid) returns jsonb language sql stable security invoker set search_path='' as $$
 select public.read_simulator_state_v4(p_user) || jsonb_build_object('subscriptions',coalesce((select jsonb_agg(to_jsonb(s) order by s.id) from public.sim_subscriptions s join public.sim_runs r on r.id=s.run_id where s.user_id=p_user and r.status='activ'),'[]'::jsonb));
$$;
revoke all on function public.read_simulator_state(uuid) from public,anon,authenticated;
grant execute on function public.read_simulator_state(uuid) to service_role;

-- Cursor updates execute inside the existing run lock, with the payment ledger.
-- Calendar recurrence remains a single pure TypeScript implementation.
create function public.commit_subscription_cursors(p_user uuid,p_run uuid,p_updates jsonb,p_entries jsonb,p_through date) returns void
language plpgsql security invoker set search_path='' as $$
declare s public.sim_subscriptions; u jsonb; e jsonb;
begin
 for u in select value from jsonb_array_elements(p_updates) loop
  select * into s from public.sim_subscriptions where id=(u->>'id')::uuid and run_id=p_run and user_id=p_user for update;
  if not found or s.status<>'active' or s.next_due_on>p_through or s.name<>u->>'name' or s.amount_bani<>(u->>'amountBani')::integer
   or (u->>'nextDueOn')::date<=s.next_due_on or (u->>'revision')::integer<=s.revision then raise exception 'invalid subscription cursor'; end if;
  if not exists(select 1 from jsonb_array_elements(p_entries) x where x->>'refKey'=p_run::text||':'||s.next_due_on::text||':subscription:'||s.id::text)
   and not exists(select 1 from public.sim_ledger where run_id=p_run and ref_key=p_run::text||':'||s.next_due_on::text||':subscription:'||s.id::text) then raise exception 'cursor without payment'; end if;
  update public.sim_subscriptions set next_due_on=(u->>'nextDueOn')::date,revision=(u->>'revision')::integer,updated_at=now() where id=s.id;
 end loop;
 for e in select value from jsonb_array_elements(p_entries) where value->>'kind'='abonament' loop
  select * into s from public.sim_subscriptions where id=split_part(e->>'refKey',':',4)::uuid and run_id=p_run and user_id=p_user;
  if not found or s.status<>'active' or (e->>'amountBani')::integer<>-s.amount_bani or e->>'label'<>'Abonament · '||s.name
   or (e->>'day')::date>p_through or (s.ends_on is not null and (e->>'day')::date>s.ends_on)
   or e->>'refKey'<>p_run::text||':'||(e->>'day')||':subscription:'||s.id::text then raise exception 'invalid subscription payment'; end if;
 end loop;
end $$;
revoke all on function public.commit_subscription_cursors(uuid,uuid,jsonb,jsonb,date) from public,anon,authenticated;
grant execute on function public.commit_subscription_cursors(uuid,uuid,jsonb,jsonb,date) to service_role;

alter function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb) rename to commit_simulator_events_v4;
create function public.commit_simulator_events(p_user uuid,p_run uuid,p_expected bigint,p_settled date,p_through date,p_engine jsonb,p_days jsonb,p_instances jsonb,p_entries jsonb,p_now timestamptz,p_development boolean,p_operations jsonb default '[]',p_subscriptions jsonb default '[]')
returns jsonb language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs; result jsonb;
begin
 select * into r from public.sim_runs where id=p_run and user_id=p_user for update;
 if not found or r.status<>'activ' then raise exception 'invalid owner'; end if;
 if r.event_revision<>p_expected or r.last_settled_on is distinct from p_settled then return jsonb_build_object('status','conflict'); end if;
 result:=public.commit_simulator_events_v4(p_user,p_run,p_expected,p_settled,p_through,p_engine,p_days,p_instances,p_entries,p_now,p_development,p_operations);
 if result->>'status'='applied' then perform public.commit_subscription_cursors(p_user,p_run,p_subscriptions,p_entries,p_through); end if;
 return result;
end $$;
revoke all on function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb,jsonb) to service_role;

alter function public.apply_simulator_settlement(uuid,uuid,date,date,jsonb) rename to apply_simulator_settlement_v4;
create function public.apply_simulator_settlement(p_user uuid,p_run uuid,p_expected date,p_through date,p_entries jsonb,p_subscriptions jsonb default '[]',p_revision bigint default null)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs; result jsonb;
begin
 select * into r from public.sim_runs where id=p_run and user_id=p_user for update;
 if not found or r.status<>'activ' then raise exception 'invalid owner'; end if;
 if p_revision is not null and r.event_revision<>p_revision then return jsonb_build_object('status','conflict'); end if;
 result:=public.apply_simulator_settlement_v4(p_user,p_run,p_expected,p_through,p_entries);
 if result->>'status'='applied' then
  perform public.commit_subscription_cursors(p_user,p_run,p_subscriptions,p_entries,p_through);
  update public.sim_runs set event_revision=event_revision+1 where id=p_run;
 end if;
 return result;
end $$;
revoke all on function public.apply_simulator_settlement(uuid,uuid,date,date,jsonb,jsonb,bigint) from public,anon,authenticated;
grant execute on function public.apply_simulator_settlement(uuid,uuid,date,date,jsonb,jsonb,bigint) to service_role;

create function public.mutate_simulator_subscription(p_user uuid,p_run uuid,p_expected bigint,p_day date,p_now timestamptz,p_development boolean,p_action text,p_operation uuid,p_subscription jsonb,p_entries jsonb)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs; s public.sim_subscriptions; receipt public.sim_subscription_operations; e jsonb; due date; effective_time timestamptz; sid uuid;
begin
 select * into r from public.sim_runs where id=p_run and user_id=p_user for update;
 if not found or r.status<>'activ' then raise exception 'invalid owner'; end if;
 select * into receipt from public.sim_subscription_operations where run_id=p_run and operation_id=p_operation;
 if found then
  if receipt.action<>p_action or (p_action<>'create' and receipt.subscription_id<>(p_subscription->>'id')::uuid) then raise exception 'operation mismatch'; end if;
  return jsonb_build_object('status','retry');
 end if;
 effective_time:=case when p_development then p_now else clock_timestamp() end;
 if p_day<>(effective_time at time zone 'Europe/Bucharest')::date or r.last_settled_on is distinct from p_day or r.event_revision<>p_expected then return jsonb_build_object('status','conflict'); end if;
 sid:=(p_subscription->>'id')::uuid;
 if p_action<>'create' then
  select * into s from public.sim_subscriptions where id=sid and run_id=p_run and user_id=p_user for update;
  if not found then raise exception 'invalid subscription owner'; end if;
  if s.revision<>(p_subscription->>'expectedRevision')::integer or s.status<>'active' then return jsonb_build_object('status','stale'); end if;
 end if;
 if p_action='cancel' then
  update public.sim_subscriptions set status='cancelled',cancelled_at=effective_time,updated_at=effective_time,revision=revision+1 where id=sid;
 elsif p_action in ('create','edit') then
  due:=(p_subscription->>'requestedDueOn')::date;
  if due<p_day or (p_subscription->>'endsOn' is not null and (p_subscription->>'endsOn')::date<due) then return jsonb_build_object('status','invalid'); end if;
  if p_subscription->>'userId'<>p_user::text or p_subscription->>'runId'<>p_run::text then raise exception 'invalid owner'; end if;
  if due=p_day and not exists(select 1 from public.sim_ledger where run_id=p_run and ref_key=p_run::text||':'||due::text||':subscription:'||sid::text)
   and jsonb_array_length(p_entries)<>1 then raise exception 'missing immediate payment'; end if;
  if due>p_day and jsonb_array_length(p_entries)<>0 then raise exception 'future payment forbidden'; end if;
  if p_action='create' then
   insert into public.sim_subscriptions values(sid,p_run,p_user,p_subscription->>'name',(p_subscription->>'amountBani')::integer,(p_subscription->>'intervalMonths')::integer,(p_subscription->>'anchorDayOfMonth')::integer,
    (p_subscription->>'nextDueOn')::date,(p_subscription->>'endsOn')::date,'active',(p_subscription->>'revision')::integer,effective_time,effective_time,null);
  else
   update public.sim_subscriptions set name=p_subscription->>'name',amount_bani=(p_subscription->>'amountBani')::integer,interval_months=(p_subscription->>'intervalMonths')::integer,
    anchor_day_of_month=(p_subscription->>'anchorDayOfMonth')::integer,next_due_on=(p_subscription->>'nextDueOn')::date,ends_on=(p_subscription->>'endsOn')::date,revision=(p_subscription->>'revision')::integer,updated_at=effective_time where id=sid;
  end if;
  for e in select value from jsonb_array_elements(p_entries) loop
   if e->>'refKey'<>p_run::text||':'||p_day::text||':subscription:'||sid::text or (e->>'day')::date<>p_day or (e->>'amountBani')::integer<>-(p_subscription->>'amountBani')::integer or e->>'kind'<>'abonament' then raise exception 'invalid immediate payment'; end if;
   insert into public.sim_ledger(run_id,user_id,day,sequence,kind,category,amount_bani,label,auto_resolved,ref_key)
    values(p_run,p_user,p_day,999,'abonament','abonamente',(e->>'amountBani')::integer,e->>'label',false,e->>'refKey');
  end loop;
 else raise exception 'invalid action'; end if;
 insert into public.sim_subscription_operations(run_id,user_id,operation_id,subscription_id,action) values(p_run,p_user,p_operation,sid,p_action);
 update public.sim_runs set event_revision=event_revision+1,updated_at=now() where id=p_run;
 return jsonb_build_object('status','applied');
end $$;
revoke all on function public.mutate_simulator_subscription(uuid,uuid,bigint,date,timestamptz,boolean,text,uuid,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.mutate_simulator_subscription(uuid,uuid,bigint,date,timestamptz,boolean,text,uuid,jsonb,jsonb) to service_role;
notify pgrst, 'reload schema';
commit;
