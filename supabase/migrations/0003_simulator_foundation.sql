-- Simulator-only foundation. No existing account/progress table is changed.
begin;
create table public.sim_runs (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 started_on date not null, start_age integer not null check(start_age >= 0),
 monthly_income_bani integer not null check(monthly_income_bani >= 0),
 housing text not null check(housing in ('parinti','chirie')),
 status text not null default 'activ' check(status in ('activ','inchis')),
 rules_version integer not null check(rules_version >= 1), rng_version integer not null check(rng_version >= 1),
 config_snapshot jsonb not null check(jsonb_typeof(config_snapshot) = 'object')
  check(config_snapshot ?& array['monthlyIncomeBani','startAge','rulesVersion','rngVersion'])
  check(jsonb_typeof(config_snapshot->'monthlyIncomeBani')='number' and jsonb_typeof(config_snapshot->'startAge')='number'
   and jsonb_typeof(config_snapshot->'rulesVersion')='number' and jsonb_typeof(config_snapshot->'rngVersion')='number'),
 last_settled_on date check(last_settled_on >= started_on),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(id,user_id),
 check(monthly_income_bani = (config_snapshot->>'monthlyIncomeBani')::integer),
 check(start_age = (config_snapshot->>'startAge')::integer),
 check(rules_version = (config_snapshot->>'rulesVersion')::integer),
 check(rng_version = (config_snapshot->>'rngVersion')::integer)
);
create unique index sim_runs_one_active on public.sim_runs(user_id) where status = 'activ';
create index sim_runs_owner on public.sim_runs(user_id);
create table public.sim_ledger (
 id uuid primary key default gen_random_uuid(), run_id uuid not null, user_id uuid not null,
 day date not null, sequence integer not null check(sequence >= 0),
 kind text not null check(kind in ('salariu','cheltuiala_fixa','eveniment','decizie_automata','ajustare')),
 category text not null check(length(category) > 0), amount_bani integer not null,
 label text not null check(length(label) > 0), auto_resolved boolean not null default false,
 ref_key text not null check(length(trim(ref_key)) > 0), created_at timestamptz not null default now(),
 foreign key(run_id,user_id) references public.sim_runs(id,user_id) on delete cascade,
 unique(run_id,ref_key)
);
create index sim_ledger_owner on public.sim_ledger(user_id);
create index sim_ledger_order on public.sim_ledger(run_id,day,sequence);
create table public.sim_effects (
 id uuid primary key default gen_random_uuid(), run_id uuid not null, user_id uuid not null,
 effect_key text not null check(effect_key ~ '^[a-z][a-z0-9_]*$'),
 effect_type text not null check(effect_type ~ '^[a-z][a-z0-9_]*$'),
 starts_on date not null, ends_on date not null check(ends_on >= starts_on),
 value jsonb not null, metadata jsonb, source_ref text not null check(length(source_ref) > 0),
 created_at timestamptz not null default now(),
 foreign key(run_id,user_id) references public.sim_runs(id,user_id) on delete cascade,
 unique(run_id,effect_key)
);
create index sim_effects_owner on public.sim_effects(user_id);
create index sim_effects_dates on public.sim_effects(run_id,starts_on,ends_on);
create table public.sim_flags (
 run_id uuid not null, user_id uuid not null, flag_key text not null check(flag_key ~ '^[a-z][a-z0-9_]*$'),
 value boolean not null, set_on date not null, source_ref text not null check(length(source_ref) > 0),
 created_at timestamptz not null default now(), primary key(run_id,flag_key),
 foreign key(run_id,user_id) references public.sim_runs(id,user_id) on delete cascade
);
create index sim_flags_owner on public.sim_flags(user_id);

alter table public.sim_runs enable row level security;
alter table public.sim_ledger enable row level security;
alter table public.sim_effects enable row level security;
alter table public.sim_flags enable row level security;
create policy own_select on public.sim_runs for select to authenticated using ((select auth.uid()) = user_id);
create policy own_select on public.sim_ledger for select to authenticated using ((select auth.uid()) = user_id);
create policy own_select on public.sim_effects for select to authenticated using ((select auth.uid()) = user_id);
create policy own_select on public.sim_flags for select to authenticated using ((select auth.uid()) = user_id);
revoke all on public.sim_runs,public.sim_ledger,public.sim_effects,public.sim_flags from public,anon,authenticated;
grant select on public.sim_runs,public.sim_ledger,public.sim_effects,public.sim_flags to authenticated;
grant all on public.sim_runs,public.sim_ledger,public.sim_effects,public.sim_flags to service_role;

-- Invoker functions: only the existing server service role may execute them.
-- One lock + CAS + ledger insertion + cursor update, including empty civil days.
create function public.apply_simulator_settlement(
 p_user uuid,p_run uuid,p_expected date,p_through date,p_entries jsonb
) returns jsonb language plpgsql security invoker set search_path = '' as $$
declare r public.sim_runs; e jsonb; existing public.sim_ledger; entry_day date;
begin
 select * into r from public.sim_runs where id=p_run for update;
 if not found or r.user_id is distinct from p_user or r.status <> 'activ' then
  raise exception 'invalid simulator owner or run';
 end if;
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

-- Active-run uniqueness is the race arbiter. A losing start returns the winner.
-- The winning run and its first settlement are committed together or not at all.
create function public.start_simulator_run(p_user uuid,p_run jsonb,p_entries jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare run_id uuid; existing_id uuid; result jsonb;
begin
 if p_run->>'userId' is distinct from p_user::text or p_run->>'status' is distinct from 'activ'
  or p_run->'lastSettledOn' is distinct from 'null'::jsonb then raise exception 'invalid simulator start'; end if;
 insert into public.sim_runs(id,user_id,started_on,start_age,monthly_income_bani,housing,status,rules_version,rng_version,config_snapshot)
 values((p_run->>'id')::uuid,p_user,(p_run->>'startedOn')::date,(p_run->>'startAge')::integer,
  (p_run->>'monthlyIncomeBani')::integer,p_run->>'housing','activ',(p_run->>'rulesVersion')::integer,
  (p_run->>'rngVersion')::integer,p_run->'configSnapshot')
 on conflict(user_id) where status='activ' do nothing returning id into run_id;
 if run_id is null then
  select id into existing_id from public.sim_runs where user_id=p_user and status='activ';
  return jsonb_build_object('runId',existing_id,'created',false);
 end if;
 result := public.apply_simulator_settlement(p_user,run_id,null,(p_run->>'startedOn')::date,p_entries);
 if result->>'status' <> 'applied' then raise exception 'invalid initial settlement'; end if;
 return jsonb_build_object('runId',run_id,'created',true);
end $$;

-- A single MVCC statement avoids mixing a new cursor with an older ledger read.
create function public.read_simulator_state(p_user uuid) returns jsonb
language sql stable security invoker set search_path = '' as $$
 select jsonb_build_object('run',to_jsonb(r),
  'ledger',coalesce((select jsonb_agg(to_jsonb(l) order by l.day,l.sequence,l.created_at,l.ref_key) from public.sim_ledger l where l.run_id=r.id and l.user_id=p_user),'[]'::jsonb),
  'effects',coalesce((select jsonb_agg(to_jsonb(e) order by e.starts_on,e.effect_key) from public.sim_effects e where e.run_id=r.id and e.user_id=p_user),'[]'::jsonb),
  'flags',coalesce((select jsonb_agg(to_jsonb(f) order by f.flag_key) from public.sim_flags f where f.run_id=r.id and f.user_id=p_user),'[]'::jsonb))
 from public.sim_runs r where r.user_id=p_user and r.status='activ';
$$;
revoke all on function public.apply_simulator_settlement(uuid,uuid,date,date,jsonb),public.start_simulator_run(uuid,jsonb,jsonb),public.read_simulator_state(uuid) from public,anon,authenticated;
grant execute on function public.apply_simulator_settlement(uuid,uuid,date,date,jsonb),public.start_simulator_run(uuid,jsonb,jsonb),public.read_simulator_state(uuid) to service_role;
commit;
