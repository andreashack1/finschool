-- Chapter 7. Apply manually after 0007. Existing simulator data is preserved.
begin;
create table public.sim_monthly_reviews (
 id uuid primary key default gen_random_uuid(), run_id uuid not null, user_id uuid not null,
 month_key text not null check(month_key ~ '^\d{4}-\d{2}$'),
 period_start date not null, period_end date not null, snapshot jsonb not null,
 finalized_at timestamptz not null default now(), reviewed_at timestamptz,
 acknowledgment_operation uuid,
 foreign key(run_id,user_id) references public.sim_runs(id,user_id) on delete cascade,
 unique(run_id,month_key), unique(run_id,acknowledgment_operation),
 check(period_start<=period_end and to_char(period_start,'YYYY-MM')=month_key),
 check(period_end=(date_trunc('month',period_start)+interval '1 month - 1 day')::date),
 check(jsonb_typeof(snapshot)='object'),
 check((reviewed_at is null)=(acknowledgment_operation is null))
);
alter table public.sim_monthly_reviews enable row level security;
create index sim_monthly_reviews_owner_run on public.sim_monthly_reviews(user_id,run_id,month_key);
revoke all on public.sim_monthly_reviews from public,anon,authenticated;
grant select on public.sim_monthly_reviews to authenticated;
grant select,insert,update,delete on public.sim_monthly_reviews to service_role;
create policy sim_monthly_reviews_owner on public.sim_monthly_reviews for select to authenticated using((select auth.uid())=user_id);
create function public.protect_sim_monthly_review() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if (to_jsonb(new)-'reviewed_at'-'acknowledgment_operation') is distinct from (to_jsonb(old)-'reviewed_at'-'acknowledgment_operation')
 or (old.reviewed_at is not null and new is distinct from old) then raise exception 'immutable monthly review'; end if;
 return new;
end $$;
create trigger sim_monthly_review_immutable before update on public.sim_monthly_reviews for each row execute function public.protect_sim_monthly_review();
revoke all on function public.protect_sim_monthly_review() from public,anon,authenticated;

alter function public.read_simulator_state(uuid) rename to read_simulator_state_v6;
create function public.read_simulator_state(p_user uuid) returns jsonb language sql stable security invoker set search_path='' as $$
 select public.read_simulator_state_v6(p_user) || jsonb_build_object('monthlyReviews',coalesce((select jsonb_agg(to_jsonb(m) order by m.month_key) from public.sim_monthly_reviews m join public.sim_runs r on r.id=m.run_id where m.user_id=p_user and r.status='activ'),'[]'::jsonb));
$$;
revoke all on function public.read_simulator_state(uuid),public.read_simulator_state_v6(uuid) from public,anon,authenticated;
grant execute on function public.read_simulator_state(uuid) to service_role;

create function public.finalize_simulator_month(p_user uuid,p_run uuid,p_expected bigint,p_day date,p_snapshot jsonb) returns jsonb
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
 select coalesce(sum(amount_bani) filter(where amount_bani>0 and (kind='salariu' or (category='venit' and kind in ('eveniment','decizie_automata')))),0),coalesce(-sum(amount_bani) filter(where amount_bani<0),0) into income,spent from public.sim_ledger where run_id=p_run and day between first_day and last_day;
 select coalesce(sum(amount_bani),0) into opening from public.sim_ledger where run_id=p_run and (day<first_day or (day=first_day and ref_key like '%:start:balance'));
 select coalesce(sum(amount_bani),0) into closing from public.sim_ledger where run_id=p_run and day<=last_day;
 if income<>(p_snapshot->>'incomeBani')::bigint or spent<>(p_snapshot->>'spentBani')::bigint or opening<>(p_snapshot->>'openingBalanceBani')::bigint or closing<>(p_snapshot->>'closingBalanceBani')::bigint then raise exception 'snapshot totals mismatch'; end if;
 select coalesce(jsonb_object_agg(category,total),'{}') into categories from (select category,-sum(amount_bani) total from public.sim_ledger where run_id=p_run and day between first_day and last_day and amount_bani<0 group by category) s;
 if categories is distinct from (select coalesce(jsonb_object_agg(x->>'id',(x->>'amountBani')::bigint),'{}') from jsonb_array_elements(p_snapshot->'categoryBreakdown') x)
 or spent<>(select coalesce(sum((x->>'amountBani')::bigint),0) from jsonb_array_elements(p_snapshot->'topCategories') x)
 or jsonb_array_length(p_snapshot->'insights')>3 or jsonb_array_length(p_snapshot->'topCategories')>5 then raise exception 'snapshot breakdown mismatch'; end if;
 insert into public.sim_monthly_reviews(run_id,user_id,month_key,period_start,period_end,snapshot) values(p_run,p_user,p_snapshot->>'monthKey',first_day,last_day,p_snapshot) returning * into existing;
 return jsonb_build_object('status','applied','snapshot',existing.snapshot);
end $$;
revoke all on function public.finalize_simulator_month(uuid,uuid,bigint,date,jsonb) from public,anon,authenticated;
grant execute on function public.finalize_simulator_month(uuid,uuid,bigint,date,jsonb) to service_role;

-- Once snapshotted, an old month's financial source cannot receive late writes.
create function public.protect_closed_simulator_ledger() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 perform 1 from public.sim_runs where id=new.run_id for update;
 if exists(select 1 from public.sim_monthly_reviews where run_id=new.run_id and month_key=to_char(new.day,'YYYY-MM')) then raise exception 'closed month ledger'; end if;
 return new;
end $$;
create trigger sim_closed_month_ledger before insert on public.sim_ledger for each row execute function public.protect_closed_simulator_ledger();
revoke all on function public.protect_closed_simulator_ledger() from public,anon,authenticated;

create function public.acknowledge_simulator_month(p_user uuid,p_run uuid,p_review uuid,p_operation uuid) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs; m public.sim_monthly_reviews;
begin
 select * into r from public.sim_runs where id=p_run and user_id=p_user for update;
 if not found or r.status<>'activ' then raise exception 'invalid owner'; end if;
 select * into m from public.sim_monthly_reviews where id=p_review and run_id=p_run and user_id=p_user;
 if not found then return jsonb_build_object('status','invalid'); end if;
 if exists(select 1 from public.sim_monthly_reviews where run_id=p_run and acknowledgment_operation=p_operation and id<>p_review) then return jsonb_build_object('status','invalid'); end if;
 if m.reviewed_at is not null then return jsonb_build_object('status','applied'); end if;
 if exists(select 1 from public.sim_monthly_reviews where run_id=p_run and month_key<m.month_key and reviewed_at is null) then return jsonb_build_object('status','required'); end if;
 update public.sim_monthly_reviews set reviewed_at=now(),acknowledgment_operation=p_operation where id=m.id;
 return jsonb_build_object('status','applied');
end $$;
revoke all on function public.acknowledge_simulator_month(uuid,uuid,uuid,uuid) from public,anon,authenticated;
grant execute on function public.acknowledge_simulator_month(uuid,uuid,uuid,uuid) to service_role;

-- Locked mutation paths enforce the gate even between server reads and writes.
create function public.simulator_review_required(p_run uuid,p_day date) returns boolean language sql stable security invoker set search_path='' as $$
 select exists(select 1 from public.sim_monthly_reviews where run_id=p_run and reviewed_at is null)
 or exists(select 1 from public.sim_runs r, lateral generate_series(date_trunc('month',r.started_on),date_trunc('month',p_day)-interval '1 month',interval '1 month') d where r.id=p_run and not exists(select 1 from public.sim_monthly_reviews m where m.run_id=p_run and m.month_key=to_char(d,'YYYY-MM')));
$$;
revoke all on function public.simulator_review_required(uuid,date) from public,anon,authenticated;
grant execute on function public.simulator_review_required(uuid,date) to service_role;
create function public.gate_simulator_manual_event() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if new.resolution_mode='manual' and (TG_OP='INSERT' or old.status='pending') and public.simulator_review_required(new.run_id,(new.resolved_at at time zone 'Europe/Bucharest')::date) then raise exception 'MONTHLY_REVIEW_REQUIRED'; end if;
 return new;
end $$;
create trigger sim_manual_monthly_gate before insert or update on public.sim_event_instances for each row execute function public.gate_simulator_manual_event();
revoke all on function public.gate_simulator_manual_event() from public,anon,authenticated;
alter function public.mutate_simulator_subscription(uuid,uuid,bigint,date,timestamptz,boolean,text,uuid,jsonb,jsonb) rename to mutate_simulator_subscription_v5;
create function public.mutate_simulator_subscription(p_user uuid,p_run uuid,p_expected bigint,p_day date,p_now timestamptz,p_development boolean,p_action text,p_operation uuid,p_subscription jsonb,p_entries jsonb) returns jsonb language plpgsql security invoker set search_path='' as $$
begin
 perform 1 from public.sim_runs where id=p_run and user_id=p_user and status='activ' for update;
 if not found then raise exception 'invalid owner'; end if;
 if public.simulator_review_required(p_run,p_day) then return jsonb_build_object('status','required'); end if;
 return public.mutate_simulator_subscription_v5(p_user,p_run,p_expected,p_day,p_now,p_development,p_action,p_operation,p_subscription,p_entries);
end $$;
revoke all on function public.mutate_simulator_subscription(uuid,uuid,bigint,date,timestamptz,boolean,text,uuid,jsonb,jsonb),public.mutate_simulator_subscription_v5(uuid,uuid,bigint,date,timestamptz,boolean,text,uuid,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.mutate_simulator_subscription(uuid,uuid,bigint,date,timestamptz,boolean,text,uuid,jsonb,jsonb) to service_role;
notify pgrst,'reload schema';
commit;
