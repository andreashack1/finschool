-- Versioned policy upgrade and production-safe same-day count maintenance.
begin;
create function public.upgrade_simulator_daily_floor(p_user uuid,p_run uuid,p_expected bigint,p_day date,p_now timestamptz,p_development boolean,p_policy jsonb)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs; starts_on date;
begin
 select * into r from public.sim_runs where id=p_run and user_id=p_user for update;
 if not found or r.status<>'activ' then raise exception 'invalid owner'; end if;
 if r.event_policy_version=4 then return jsonb_build_object('status','applied'); end if;
 if r.event_revision<>p_expected then return jsonb_build_object('status','conflict'); end if;
 if r.event_policy_version not in (1,2,3) then raise exception 'invalid transition'; end if;
 if not p_development and abs(extract(epoch from (p_now-now())))>120 then raise exception 'invalid clock'; end if;
 if (p_now at time zone 'Europe/Bucharest')::date<>p_day then return jsonb_build_object('status','conflict'); end if;
 if p_day<date '2026-10-16' then return jsonb_build_object('status','not_due'); end if;
 if p_policy->>'version' is distinct from '4' or p_policy->>'minDailyEvents' is distinct from '2'
 or p_policy->>'decisionWindowMinutes' is distinct from '30' or p_policy ? 'floorUpgrade'
 or p_policy ? 'decisionUpgrade' or p_policy ? 'upgrade' then raise exception 'invalid policy'; end if;
 starts_on:=greatest(date '2026-10-16',coalesce(r.event_last_closed_day+1,date '2026-10-16'));
 update public.sim_runs set event_catalog_version=3,event_policy_version=4,
 event_policy_snapshot=p_policy||jsonb_build_object('profiles',r.event_policy_snapshot->'profiles','floorUpgrade',
 jsonb_build_object('startsOn',starts_on,'previousCatalogVersion',r.event_catalog_version,'previousPolicy',r.event_policy_snapshot)),
 event_revision=event_revision+1,updated_at=now() where id=p_run;
 return jsonb_build_object('status','applied','startsOn',starts_on);
end $$;
revoke all on function public.upgrade_simulator_daily_floor(uuid,uuid,bigint,date,timestamptz,boolean,jsonb) from public,anon,authenticated;
grant execute on function public.upgrade_simulator_daily_floor(uuid,uuid,bigint,date,timestamptz,boolean,jsonb) to service_role;

-- Delegate to the existing transaction/lock/CAS and all historical safeguards.
alter function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb,jsonb) rename to commit_simulator_events_v6;
revoke all on function public.commit_simulator_events_v6(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.commit_simulator_events_v6(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb,jsonb) to service_role;
create function public.commit_simulator_events(p_user uuid,p_run uuid,p_expected bigint,p_settled date,p_through date,p_engine jsonb,p_days jsonb,p_instances jsonb,p_entries jsonb,p_now timestamptz,p_development boolean,p_operations jsonb default '[]',p_subscriptions jsonb default '[]')
returns jsonb language plpgsql security invoker set search_path='' as $$
declare result jsonb; local_day date;
begin
 result:=public.commit_simulator_events_v6(p_user,p_run,p_expected,p_settled,p_through,p_engine,p_days,p_instances,p_entries,p_now,p_development,p_operations,p_subscriptions);
 if result->>'status'='applied' and p_engine->>'policyVersion'='4' then
  local_day:=(case when p_development then p_now else clock_timestamp() end at time zone 'Europe/Bucharest')::date;
  update public.sim_event_days d set event_count=(select count(*) from public.sim_event_instances e where e.run_id=p_run and e.day=local_day and e.status<>'cancelled')
   where d.run_id=p_run and d.user_id=p_user and d.day=local_day and d.closed_at is null;
 end if;
 return result;
end $$;
revoke all on function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb,jsonb) to service_role;
commit;
