-- Chapter 6: transition only after the existing chronology has caught up.
-- No table changes, no historical edits. Apply manually after 0006.
begin;
create function public.upgrade_simulator_life(p_user uuid,p_run uuid,p_expected bigint,p_day date,p_now timestamptz,p_development boolean,p_policy jsonb)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs; starts_on date;
begin
 select * into r from public.sim_runs where id=p_run and user_id=p_user for update;
 if not found or r.status<>'activ' then raise exception 'invalid owner'; end if;
 if r.event_catalog_version=2 and r.event_policy_version=2 then return jsonb_build_object('status','applied'); end if;
 if r.event_revision<>p_expected then return jsonb_build_object('status','conflict'); end if;
 if r.event_catalog_version<>1 or r.event_policy_version<>1 or r.event_engine_started_at is null then raise exception 'invalid transition'; end if;
 if not p_development and abs(extract(epoch from (p_now-now())))>120 then raise exception 'invalid clock'; end if;
 if (p_now at time zone 'Europe/Bucharest')::date<>p_day or r.last_settled_on<>p_day
   or not exists(select 1 from public.sim_event_days where run_id=p_run and day=p_day)
   or exists(select 1 from public.sim_event_instances where run_id=p_run and status='pending' and expires_at<=p_now)
   then return jsonb_build_object('status','conflict'); end if;
 if p_policy->>'version'<>'2' or jsonb_typeof(p_policy->'opportunityChances')<>'object' or p_policy ? 'upgrade' then raise exception 'invalid policy'; end if;
 select greatest(p_day+1,coalesce(max(day)+1,p_day+1)) into starts_on from public.sim_event_days where run_id=p_run;
 update public.sim_runs set event_catalog_version=2,event_policy_version=2,
  event_policy_snapshot=p_policy||jsonb_build_object('upgrade',jsonb_build_object('startsOn',starts_on,'previousPolicy',r.event_policy_snapshot)),
  event_revision=event_revision+1,updated_at=now() where id=p_run;
 return jsonb_build_object('status','applied','startsOn',starts_on);
end $$;
revoke all on function public.upgrade_simulator_life(uuid,uuid,bigint,date,timestamptz,boolean,jsonb) from public,anon,authenticated;
grant execute on function public.upgrade_simulator_life(uuid,uuid,bigint,date,timestamptz,boolean,jsonb) to service_role;
commit;
