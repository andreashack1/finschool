-- Chapter 3. Apply after 0003; existing runs remain inactive until profile selection.
begin;
alter table public.sim_runs
 add column schedule_profile text check(schedule_profile in ('liceu','lucrez')),
 add column event_engine_started_at timestamptz,
 add column event_catalog_version integer,
 add column event_policy_version integer,
 add column event_policy_snapshot jsonb,
 add column event_last_closed_day date,
 add column event_processed_at timestamptz,
 add column event_revision bigint not null default 0;
alter table public.sim_runs add constraint sim_event_engine_config check(
 (schedule_profile is null and event_engine_started_at is null and event_catalog_version is null and event_policy_version is null and event_policy_snapshot is null)
 or (schedule_profile is not null and event_engine_started_at is not null and event_catalog_version is not null and event_catalog_version>=1 and event_policy_version is not null and event_policy_version>=1 and event_policy_snapshot is not null and jsonb_typeof(event_policy_snapshot)='object')
);
create table public.sim_event_days (
 run_id uuid not null, user_id uuid not null, day date not null,
 catalog_version integer not null, policy_version integer not null,
 planned_at timestamptz not null, closed_at timestamptz,
 event_count integer not null check(event_count>=0),
 primary key(run_id,day),
 foreign key(run_id,user_id) references public.sim_runs(id,user_id) on delete cascade
);
create table public.sim_event_instances (
 id uuid primary key, run_id uuid not null, user_id uuid not null, day date not null,
 definition_id text not null, definition_version integer not null, family_id text not null,
 variation_id text not null, scheduled_at timestamptz not null, expires_at timestamptz not null,
 snapshot_version integer not null, snapshot jsonb not null check(jsonb_typeof(snapshot)='object'),
 status text not null check(status in ('pending','resolved','cancelled')),
 resolution_mode text check(resolution_mode in ('manual','automatic')),
 selected_option_id text, selected_cost_bani integer check(selected_cost_bani>=0),
 feedback_snapshot text, resolved_at timestamptz, activity_start_at timestamptz, activity_end_at timestamptz,
 generation_key text not null, cancel_reason text, created_at timestamptz not null,
 unique(run_id,generation_key),
 foreign key(run_id,user_id) references public.sim_runs(id,user_id) on delete cascade,
 foreign key(run_id,day) references public.sim_event_days(run_id,day),
 check(scheduled_at<expires_at),
 check((activity_start_at is null and activity_end_at is null) or activity_start_at<activity_end_at),
 check((status='pending' and resolution_mode is null and selected_option_id is null and selected_cost_bani is null and resolved_at is null)
 or (status='resolved' and resolution_mode is not null and selected_option_id is not null and selected_cost_bani is not null and resolved_at is not null and feedback_snapshot is not null)
 or (status='cancelled' and cancel_reason is not null))
);
create index sim_event_days_owner on public.sim_event_days(user_id);
create index sim_event_instances_day on public.sim_event_instances(run_id,day);
create index sim_event_instances_status on public.sim_event_instances(run_id,status);
create index sim_event_instances_expiry on public.sim_event_instances(run_id,expires_at);
create index sim_event_instances_owner on public.sim_event_instances(user_id);
alter table public.sim_event_days enable row level security;
alter table public.sim_event_instances enable row level security;
revoke all on public.sim_event_days,public.sim_event_instances from public,anon,authenticated;
grant all on public.sim_event_days,public.sim_event_instances to service_role;

-- A single MVCC read: no separate financial/event snapshots.
create or replace function public.read_simulator_state(p_user uuid) returns jsonb
language sql stable security invoker set search_path='' as $$
 select jsonb_build_object('run',to_jsonb(r),
 'ledger',coalesce((select jsonb_agg(to_jsonb(l) order by l.day,l.sequence,l.ref_key) from public.sim_ledger l where l.run_id=r.id),'[]'::jsonb),
 'effects',coalesce((select jsonb_agg(to_jsonb(e)) from public.sim_effects e where e.run_id=r.id),'[]'::jsonb),
 'flags',coalesce((select jsonb_agg(to_jsonb(f)) from public.sim_flags f where f.run_id=r.id),'[]'::jsonb),
 'eventDays',coalesce((select jsonb_agg(to_jsonb(d) order by d.day) from public.sim_event_days d where d.run_id=r.id),'[]'::jsonb),
 'eventInstances',coalesce((select jsonb_agg(to_jsonb(e) order by e.scheduled_at,e.generation_key) from public.sim_event_instances e where e.run_id=r.id),'[]'::jsonb))
 from public.sim_runs r where r.user_id=p_user and r.status='activ';
$$;

create function public.activate_simulator_events(p_user uuid,p_run uuid,p_expected date,p_engine jsonb)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs;
begin
 select * into r from public.sim_runs where id=p_run for update;
 if not found or r.user_id<>p_user or r.status<>'activ' then raise exception 'invalid owner'; end if;
 if r.schedule_profile is not null then return jsonb_build_object('status','applied'); end if;
 if r.last_settled_on is distinct from p_expected then return jsonb_build_object('status','conflict'); end if;
 if (p_engine->>'startedAt')::timestamptz at time zone 'Europe/Bucharest' < r.last_settled_on::timestamp then raise exception 'clock reversed'; end if;
 update public.sim_runs set schedule_profile=p_engine->>'scheduleProfile',event_engine_started_at=(p_engine->>'startedAt')::timestamptz,
 event_catalog_version=(p_engine->>'catalogVersion')::integer,event_policy_version=(p_engine->>'policyVersion')::integer,
 event_policy_snapshot=p_engine->'policySnapshot',event_revision=event_revision+1 where id=p_run;
 return jsonb_build_object('status','applied');
end $$;

-- All server computation is validated before this private commit. CAS covers
-- balance, activities, planning and manual/auto races under the same run lock.
create function public.commit_simulator_events(p_user uuid,p_run uuid,p_expected bigint,p_settled date,p_through date,p_engine jsonb,p_days jsonb,p_instances jsonb,p_entries jsonb,p_now timestamptz,p_development boolean)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs; d jsonb; e jsonb; old public.sim_event_instances; effective_time timestamptz;
begin
 select * into r from public.sim_runs where id=p_run for update;
 if not found or r.user_id<>p_user or r.status<>'activ' then raise exception 'invalid owner'; end if;
 if r.event_revision<>p_expected or r.last_settled_on is distinct from p_settled then return jsonb_build_object('status','conflict'); end if;
 if p_through<r.last_settled_on then raise exception 'clock reversed'; end if;
 effective_time := case when p_development then p_now else clock_timestamp() end;
 -- Recheck manual availability while holding the lock, including a midnight race.
 for e in select value from jsonb_array_elements(p_instances) loop
  if e->>'resolutionMode'='manual' and (effective_time<(e->>'scheduledAt')::timestamptz or effective_time>=(e->>'expiresAt')::timestamptz) then return jsonb_build_object('status','conflict'); end if;
 end loop;
 for d in select value from jsonb_array_elements(p_days) loop
  insert into public.sim_event_days values(p_run,p_user,(d->>'day')::date,(d->>'catalogVersion')::integer,(d->>'policyVersion')::integer,(d->>'plannedAt')::timestamptz,null,(d->>'eventCount')::integer)
  on conflict(run_id,day) do nothing;
 end loop;
 for e in select value from jsonb_array_elements(p_instances) loop
  if e->>'runId'<>p_run::text or e->>'userId'<>p_user::text then raise exception 'invalid event owner'; end if;
  select * into old from public.sim_event_instances where id=(e->>'id')::uuid;
  if found then
   if old.run_id<>p_run or old.snapshot<>e->'snapshot' or old.generation_key<>e->>'generationKey' then raise exception 'immutable event mismatch'; end if;
   if old.status<>'pending' then raise exception 'immutable resolution'; end if;
   update public.sim_event_instances set status=e->>'status',resolution_mode=e->>'resolutionMode',selected_option_id=e->>'selectedOptionId',selected_cost_bani=(e->>'selectedCostBani')::integer,
   feedback_snapshot=e->>'feedbackSnapshot',resolved_at=(e->>'resolvedAt')::timestamptz,activity_start_at=(e->>'activityStartAt')::timestamptz,activity_end_at=(e->>'activityEndAt')::timestamptz,cancel_reason=e->>'cancelReason' where id=old.id;
  else
   insert into public.sim_event_instances values((e->>'id')::uuid,p_run,p_user,(e->>'day')::date,e->>'definitionId',(e->>'definitionVersion')::integer,e->>'familyId',e->>'variationId',
   (e->>'scheduledAt')::timestamptz,(e->>'expiresAt')::timestamptz,(e->>'snapshotVersion')::integer,e->'snapshot',e->>'status',e->>'resolutionMode',e->>'selectedOptionId',(e->>'selectedCostBani')::integer,
   e->>'feedbackSnapshot',(e->>'resolvedAt')::timestamptz,(e->>'activityStartAt')::timestamptz,(e->>'activityEndAt')::timestamptz,e->>'generationKey',e->>'cancelReason',(e->>'createdAt')::timestamptz);
  end if;
 end loop;
 for e in select value from jsonb_array_elements(p_entries) loop
  if (e->>'day')::date>p_through or (e->>'day')::date<r.started_on then raise exception 'invalid ledger day'; end if;
  insert into public.sim_ledger(run_id,user_id,day,sequence,kind,category,amount_bani,label,auto_resolved,ref_key)
  values(p_run,p_user,(e->>'day')::date,(e->>'sequence')::integer,e->>'kind',e->>'category',(e->>'amountBani')::integer,e->>'label',(e->>'autoResolved')::boolean,e->>'refKey');
 end loop;
 for d in select value from jsonb_array_elements(p_days) loop
  if (select count(*) from public.sim_event_instances where run_id=p_run and day=(d->>'day')::date)<>(d->>'eventCount')::integer then raise exception 'incomplete day plan'; end if;
  if d->>'closedAt' is not null then
   if exists(select 1 from public.sim_event_instances where run_id=p_run and day=(d->>'day')::date and status='pending') then raise exception 'pending day'; end if;
   update public.sim_event_days set closed_at=(d->>'closedAt')::timestamptz where run_id=p_run and day=(d->>'day')::date;
  end if;
 end loop;
 update public.sim_runs set last_settled_on=p_through,event_last_closed_day=(p_engine->>'lastClosedDay')::date,event_processed_at=(p_engine->>'processedAt')::timestamptz,event_revision=event_revision+1,updated_at=now() where id=p_run;
 return jsonb_build_object('status','applied');
end $$;
revoke all on function public.activate_simulator_events(uuid,uuid,date,jsonb),public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean) from public,anon,authenticated;
grant execute on function public.activate_simulator_events(uuid,uuid,date,jsonb),public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean) to service_role;
create or replace function public.apply_simulator_settlement(
 p_user uuid,p_run uuid,p_expected date,p_through date,p_entries jsonb
) returns jsonb language plpgsql security invoker set search_path = '' as $$
declare r public.sim_runs; e jsonb; existing public.sim_ledger; entry_day date;
begin
 select * into r from public.sim_runs where id=p_run for update;
 if not found or r.user_id is distinct from p_user or r.status <> 'activ' then
  raise exception 'invalid simulator owner or run';
 end if;
 if r.schedule_profile is not null then return jsonb_build_object('status','conflict'); end if;
 if r.last_settled_on is distinct from p_expected then return jsonb_build_object('status','conflict'); end if;
 if p_through is null or p_through < r.started_on or p_through < r.last_settled_on
    or p_entries is null or jsonb_typeof(p_entries) <> 'array' then raise exception 'invalid simulator cursor'; end if;
 for e in select value from jsonb_array_elements(p_entries) loop
  if jsonb_typeof(e) <> 'object' or e->>'runId' is distinct from p_run::text or e->>'userId' is distinct from p_user::text
   or nullif(trim(e->>'refKey'),'') is null then raise exception 'invalid simulator entry owner'; end if;
  entry_day := (e->>'day')::date;
  if entry_day is null or entry_day < r.started_on or entry_day > p_through then raise exception 'invalid simulator entry date'; end if;
  select * into existing from public.sim_ledger where run_id=p_run and ref_key=e->>'refKey';
  if found then
   -- Never reinterpret a previously persisted semantic identity.
   if existing.day is distinct from entry_day or existing.amount_bani is distinct from (e->>'amountBani')::integer
    or existing.sequence is distinct from (e->>'sequence')::integer or existing.kind is distinct from e->>'kind'
    or existing.category is distinct from e->>'category' or existing.label is distinct from e->>'label'
    or existing.auto_resolved is distinct from (e->>'autoResolved')::boolean then raise exception 'simulator ref mismatch'; end if;
  else
   if entry_day <= r.last_settled_on then raise exception 'entry precedes simulator cursor'; end if;
   insert into public.sim_ledger(run_id,user_id,day,sequence,kind,category,amount_bani,label,auto_resolved,ref_key)
   values(p_run,p_user,entry_day,(e->>'sequence')::integer,e->>'kind',e->>'category',(e->>'amountBani')::integer,e->>'label',(e->>'autoResolved')::boolean,e->>'refKey');
  end if;
 end loop;
 update public.sim_runs set last_settled_on=p_through,updated_at=now() where id=p_run;
 return jsonb_build_object('status','applied');
end $$;

commit;
