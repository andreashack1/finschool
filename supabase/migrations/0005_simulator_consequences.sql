-- Chapter 4: simulator-only state history and precise effect projections.
-- Apply manually after 0004. No old decision receives retroactive consequences.
begin;
alter table public.sim_event_instances add constraint sim_event_instance_owner_identity unique(id,run_id,user_id);
alter table public.sim_event_instances add column resolution_effective_at timestamptz, add column cancelled_at timestamptz;
alter table public.sim_effects
 add column starts_at timestamptz, add column expires_at timestamptz, add column ended_at timestamptz,
 add column family_key text check(family_key ~ '^[a-z][a-z0-9_]*$'),
 add column overlap_policy text check(overlap_policy in ('replace','extend','independent')),
 add column state_snapshot jsonb;
alter table public.sim_flags add column effective_at timestamptz, add column state_sequence bigint, add column presentation jsonb;
create table public.sim_state_operations (
 id uuid primary key default gen_random_uuid(), run_id uuid not null, user_id uuid not null,
 source_instance_id uuid, source_option_id text, consequence_id text not null,
 operation_type text not null check(operation_type in ('set_flag','clear_flag','add_effect','remove_effect')),
 target_key text not null, payload jsonb not null check(jsonb_typeof(payload)='object'),
 effective_at timestamptz not null, recorded_at timestamptz not null,
 sequence bigint not null check(sequence>=0), consequence_index integer not null check(consequence_index>=0),
 idempotency_key text not null, created_at timestamptz not null default now(),
 unique(run_id,idempotency_key), unique(run_id,sequence),
 foreign key(run_id,user_id) references public.sim_runs(id,user_id) on delete cascade,
 foreign key(source_instance_id,run_id,user_id) references public.sim_event_instances(id,run_id,user_id) on delete cascade
);
create index sim_state_operations_owner on public.sim_state_operations(user_id);
create index sim_state_operations_timeline on public.sim_state_operations(run_id,effective_at,sequence);
create index sim_state_operations_source on public.sim_state_operations(source_instance_id);
create index sim_effects_family_time on public.sim_effects(run_id,family_key,starts_at,expires_at);
alter table public.sim_state_operations enable row level security;
revoke all on public.sim_state_operations from public,anon,authenticated,service_role;
grant select,insert on public.sim_state_operations to service_role;

-- Existing foundation flags become an explicit baseline at their existing
-- set_on date. Original rows/values/provenance are retained, not reinterpreted.
insert into public.sim_state_operations(run_id,user_id,consequence_id,operation_type,target_key,payload,effective_at,recorded_at,sequence,consequence_index,idempotency_key)
select run_id,user_id,'baseline','set_flag',flag_key,
 jsonb_build_object('idempotencyKey','baseline:'||flag_key,'sourceInstanceId',null,'sourceOptionId',null,'consequenceId','baseline','consequenceIndex',0,
 'sequence',row_number() over(partition by run_id order by set_on,flag_key)-1,
 'descriptor',jsonb_build_object('id','baseline','type','set_flag','key',flag_key,'value',value),
 'effectiveAt',to_char(set_on::timestamp at time zone 'Europe/Bucharest' at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
 'recordedAt',to_char(clock_timestamp() at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
 'applied',true,'effect',null,'endedEffectKeys','[]'::jsonb,'endsAt',null),
 set_on::timestamp at time zone 'Europe/Bucharest',clock_timestamp(),row_number() over(partition by run_id order by set_on,flag_key)-1,0,'baseline:'||flag_key
from public.sim_flags;
update public.sim_flags f set effective_at=o.effective_at,state_sequence=o.sequence
from public.sim_state_operations o where o.run_id=f.run_id and o.target_key=f.flag_key;
-- Legacy effects had inclusive end dates. Preserve that coverage. Their
-- legacy JSON is untouched; no invented user presentation or semantic payload.
update public.sim_effects set starts_at=starts_on::timestamp at time zone 'Europe/Bucharest',
 expires_at=(ends_on+1)::timestamp at time zone 'Europe/Bucharest',family_key=effect_type,overlap_policy='independent';
update public.sim_effects set state_snapshot=jsonb_build_object('effectKey',effect_key,'effectType',effect_type,'familyKey',family_key,
 'startsAt',to_char(starts_at at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
 'expiresAt',to_char(expires_at at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'), 'endedAt',null,
 'value','{}'::jsonb,'overlapPolicy',overlap_policy,'sourceInstanceId',null,'sourceOptionId',null,'consequenceId',null,
 'effectiveAt',to_char(starts_at at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
 'recordedAt',to_char(created_at at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'));
alter table public.sim_effects alter column starts_at set not null, alter column expires_at set not null,
 alter column family_key set not null, alter column overlap_policy set not null, alter column state_snapshot set not null;
alter table public.sim_effects add constraint sim_effect_exact_interval check(starts_at<expires_at);

create function public.protect_simulator_state_history() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 -- Allow only owner run/account cascade cleanup, not standalone history edits.
 if exists(select 1 from public.sim_runs where id=old.run_id) then raise exception 'simulator state history is append-only'; end if;
 return old;
end $$;
create trigger sim_state_operations_append_only before update or delete on public.sim_state_operations for each row execute function public.protect_simulator_state_history();
revoke all on function public.protect_simulator_state_history() from public,anon,authenticated;

create or replace function public.read_simulator_state(p_user uuid) returns jsonb
language sql stable security invoker set search_path='' as $$
 select jsonb_build_object('run',to_jsonb(r),
 'ledger',coalesce((select jsonb_agg(to_jsonb(l) order by l.day,l.sequence,l.ref_key) from public.sim_ledger l where l.run_id=r.id),'[]'::jsonb),
 'effects',coalesce((select jsonb_agg(to_jsonb(e) order by e.starts_at,e.effect_key) from public.sim_effects e where e.run_id=r.id),'[]'::jsonb),
 'flags',coalesce((select jsonb_agg(to_jsonb(f) order by f.flag_key) from public.sim_flags f where f.run_id=r.id),'[]'::jsonb),
 'stateOperations',coalesce((select jsonb_agg(to_jsonb(o) order by o.effective_at,o.sequence) from public.sim_state_operations o where o.run_id=r.id),'[]'::jsonb),
 'eventDays',coalesce((select jsonb_agg(to_jsonb(d) order by d.day) from public.sim_event_days d where d.run_id=r.id),'[]'::jsonb),
 'eventInstances',coalesce((select jsonb_agg(to_jsonb(e) order by e.scheduled_at,e.generation_key) from public.sim_event_instances e where e.run_id=r.id),'[]'::jsonb))
 from public.sim_runs r where r.user_id=p_user and r.status='activ';
$$;

-- Preserve the Chapter 3 commit body; the wrapper extends the SAME transaction,
-- SAME lock/CAS, not a second commit or a separate state sync.
alter function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean) rename to commit_simulator_events_v3;
revoke all on function public.commit_simulator_events_v3(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean) from public,anon,authenticated,service_role;
-- Invoker wrapper needs its internal callee; browser roles still have neither.
grant execute on function public.commit_simulator_events_v3(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean) to service_role;
create function public.commit_simulator_events(p_user uuid,p_run uuid,p_expected bigint,p_settled date,p_through date,p_engine jsonb,p_days jsonb,p_instances jsonb,p_entries jsonb,p_now timestamptz,p_development boolean,p_operations jsonb default '[]'::jsonb)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs; result jsonb; e jsonb; op jsonb; c jsonb; fx jsonb; source public.sim_event_instances;
 opt jsonb; counter integer; descriptor_count integer; target text; logical_time timestamptz; next_sequence bigint;
begin
 select * into r from public.sim_runs where id=p_run for update;
 if not found or r.user_id is distinct from p_user or r.status<>'activ' then raise exception 'invalid owner'; end if;
 if r.event_revision<>p_expected or r.last_settled_on is distinct from p_settled then return jsonb_build_object('status','conflict'); end if;
 if p_operations is null or jsonb_typeof(p_operations)<>'array' then raise exception 'invalid state operations'; end if;
 result := public.commit_simulator_events_v3(p_user,p_run,p_expected,p_settled,p_through,p_engine,p_days,p_instances,p_entries,p_now,p_development);
 if result->>'status'<>'applied' then return result; end if;
 -- Dev fixtures may append to the already planned day through the real RPC;
 -- they never regenerate existing instances or enter the production catalog.
 if p_development then
  for e in select value from jsonb_array_elements(p_days) loop
   update public.sim_event_days set event_count=(e->>'eventCount')::integer where run_id=p_run and day=(e->>'day')::date and closed_at is null;
  end loop;
 end if;
 -- Every snapshotted descriptor must have exactly one operation in this commit.
 for e in select value from jsonb_array_elements(p_instances) loop
  if e->>'status'='resolved' then
   select value into opt from jsonb_array_elements(e->'snapshot'->'options') where value->>'id'=e->>'selectedOptionId';
   if opt is null then raise exception 'invalid selected snapshot option'; end if;
   logical_time := case when e->>'resolutionMode'='automatic' then (e->>'expiresAt')::timestamptz else (e->>'resolutionEffectiveAt')::timestamptz end;
   if logical_time is null then logical_time := (e->>'resolvedAt')::timestamptz; end if;
   update public.sim_event_instances set resolution_effective_at=logical_time where id=(e->>'id')::uuid;
   descriptor_count := jsonb_array_length(coalesce(opt->'consequences','[]'::jsonb));
   select count(*) into counter from jsonb_array_elements(p_operations) x where x->>'sourceInstanceId'=e->>'id';
   if counter<>descriptor_count then raise exception 'incomplete consequences'; end if;
  elsif e->>'status'='cancelled' then
   update public.sim_event_instances set cancelled_at=(e->>'cancelledAt')::timestamptz where id=(e->>'id')::uuid;
  end if;
 end loop;
 select coalesce(max(sequence)+1,0) into next_sequence from public.sim_state_operations where run_id=p_run;
 for op in select value from jsonb_array_elements(p_operations) order by (value->>'sequence')::bigint loop
  select * into source from public.sim_event_instances where id=(op->>'sourceInstanceId')::uuid and run_id=p_run and user_id=p_user;
  if not found or source.status<>'resolved' or source.selected_option_id is distinct from op->>'sourceOptionId' then raise exception 'invalid consequence source'; end if;
  if not exists(select 1 from jsonb_array_elements(p_instances) x where x->>'id'=source.id::text and x->>'status'='resolved') then raise exception 'state operation without new decision'; end if;
  select value into opt from jsonb_array_elements(source.snapshot->'options') where value->>'id'=source.selected_option_id;
  c := (opt->'consequences')->(op->>'consequenceIndex')::integer;
  if c is null or c is distinct from op->'descriptor' or c->>'id' is distinct from op->>'consequenceId'
    or op->>'idempotencyKey' is distinct from source.id::text||':'||source.selected_option_id||':'||(c->>'id')
    or (op->>'effectiveAt')::timestamptz is distinct from source.resolution_effective_at
    or (op->>'sequence')::bigint<>next_sequence then raise exception 'invalid consequence snapshot/chronology'; end if;
  if c->>'type' not in ('set_flag','clear_flag','add_effect','remove_effect') then raise exception 'unknown consequence'; end if;
  next_sequence := next_sequence+1;
  target := coalesce(c->>'key',c->>'familyKey',c->'target'->>'familyKey',c->'target'->>'effectKey');
  insert into public.sim_state_operations(run_id,user_id,source_instance_id,source_option_id,consequence_id,operation_type,target_key,payload,effective_at,recorded_at,sequence,consequence_index,idempotency_key)
  values(p_run,p_user,source.id,source.selected_option_id,c->>'id',c->>'type',target,op,(op->>'effectiveAt')::timestamptz,(op->>'recordedAt')::timestamptz,(op->>'sequence')::bigint,(op->>'consequenceIndex')::integer,op->>'idempotencyKey');
  if c->>'type' in ('set_flag','clear_flag') then
   insert into public.sim_flags(run_id,user_id,flag_key,value,set_on,source_ref,effective_at,state_sequence,presentation)
   values(p_run,p_user,target,case when c->>'type'='clear_flag' then false else (c->>'value')::boolean end,
    ((op->>'effectiveAt')::timestamptz at time zone 'Europe/Bucharest')::date,op->>'idempotencyKey',(op->>'effectiveAt')::timestamptz,(op->>'sequence')::bigint,c->'presentation')
   on conflict(run_id,flag_key) do update set value=excluded.value,set_on=excluded.set_on,source_ref=excluded.source_ref,effective_at=excluded.effective_at,state_sequence=excluded.state_sequence,presentation=excluded.presentation
   where (sim_flags.effective_at,sim_flags.state_sequence)<=(excluded.effective_at,excluded.state_sequence);
  end if;
  if op->>'endsAt' is not null then
   update public.sim_effects set ended_at=least(coalesce(ended_at,(op->>'endsAt')::timestamptz),(op->>'endsAt')::timestamptz)
   where run_id=p_run and user_id=p_user and effect_key in(select jsonb_array_elements_text(op->'endedEffectKeys'));
  end if;
  if c->>'type'='add_effect' then
   fx := op->'effect';
   if fx is null or fx='null'::jsonb or fx->>'sourceInstanceId'<>source.id::text or fx->>'sourceOptionId'<>source.selected_option_id or fx->>'consequenceId'<>c->>'id'
    or fx->>'familyKey'<>c->>'familyKey' or fx->>'overlapPolicy'<>c->>'overlapPolicy' or fx->'value'<>c->'value' then raise exception 'invalid effect identity'; end if;
   insert into public.sim_effects(run_id,user_id,effect_key,effect_type,starts_on,ends_on,value,source_ref,starts_at,expires_at,ended_at,family_key,overlap_policy,state_snapshot)
   values(p_run,p_user,fx->>'effectKey',fx->>'effectType',((fx->>'startsAt')::timestamptz at time zone 'Europe/Bucharest')::date,
    ((fx->>'expiresAt')::timestamptz at time zone 'Europe/Bucharest')::date-1,fx->'value',op->>'idempotencyKey',(fx->>'startsAt')::timestamptz,(fx->>'expiresAt')::timestamptz,null,fx->>'familyKey',fx->>'overlapPolicy',fx);
  elsif op->'effect'<>'null'::jsonb then raise exception 'unexpected effect'; end if;
 end loop;
 return result;
end $$;
revoke all on function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb) from public,anon,authenticated;
grant execute on function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb) to service_role;
commit;
