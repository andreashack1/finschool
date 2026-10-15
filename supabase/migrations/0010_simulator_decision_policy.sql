-- New decisions only. No event, ledger or historical snapshot is changed.
begin;
-- Existing runs share the migration's civil-day cutover. First app-open time
-- must not decide whether historical opportunities had 30 minutes or all day.
alter table public.sim_runs add column decision_policy_available_on date not null
 default ((CURRENT_TIMESTAMP at time zone 'Europe/Bucharest')::date);
alter table public.sim_event_instances add column result_balance_bani bigint;
-- Store result metadata after the same canonical commit succeeds, in its transaction.
alter function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb,jsonb) rename to commit_simulator_events_v5;
create function public.commit_simulator_events(p_user uuid,p_run uuid,p_expected bigint,p_settled date,p_through date,p_engine jsonb,p_days jsonb,p_instances jsonb,p_entries jsonb,p_now timestamptz,p_development boolean,p_operations jsonb default '[]',p_subscriptions jsonb default '[]')
returns jsonb language plpgsql security invoker set search_path='' as $$
declare result jsonb; e jsonb;
begin
 result:=public.commit_simulator_events_v5(p_user,p_run,p_expected,p_settled,p_through,p_engine,p_days,p_instances,p_entries,p_now,p_development,p_operations,p_subscriptions);
 if result->>'status'='applied' then
  for e in select value from jsonb_array_elements(p_instances) loop
   if e->>'status'='resolved' and e->'balanceAfterChoiceBani' is not null then
    update public.sim_event_instances set result_balance_bani=(e->>'balanceAfterChoiceBani')::bigint
     where id=(e->>'id')::uuid and run_id=p_run and user_id=p_user and result_balance_bani is null;
   end if;
  end loop;
 end if;
 return result;
end $$;
revoke all on function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.commit_simulator_events(uuid,uuid,bigint,date,date,jsonb,jsonb,jsonb,jsonb,timestamptz,boolean,jsonb,jsonb) to service_role;
create function public.upgrade_simulator_decisions(p_user uuid,p_run uuid,p_expected bigint,p_day date,p_now timestamptz,p_development boolean,p_policy jsonb)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare r public.sim_runs; starts_on date;
begin
 select * into r from public.sim_runs where id=p_run and user_id=p_user for update;
 if not found or r.status<>'activ' then raise exception 'invalid owner'; end if;
 if r.event_policy_version=3 then return jsonb_build_object('status','applied'); end if;
 if r.event_revision<>p_expected then return jsonb_build_object('status','conflict'); end if;
 if r.event_catalog_version<>2 or r.event_policy_version<>2 then raise exception 'invalid transition'; end if;
 if not p_development and abs(extract(epoch from (p_now-now())))>120 then raise exception 'invalid clock'; end if;
 if (p_now at time zone 'Europe/Bucharest')::date<>p_day
 then return jsonb_build_object('status','conflict'); end if;
 if p_policy->>'version' is distinct from '3' or p_policy->>'decisionWindowMinutes' is distinct from '30'
    or jsonb_typeof(p_policy->'opportunityChances') is distinct from 'object'
    or p_policy ? 'decisionUpgrade' or p_policy ? 'upgrade' then raise exception 'invalid policy'; end if;
 select greatest(r.decision_policy_available_on,coalesce(max(day)+1,r.decision_policy_available_on)) into starts_on from public.sim_event_days where run_id=p_run;
 update public.sim_runs set event_policy_version=3,
  event_policy_snapshot=p_policy||jsonb_build_object('decisionUpgrade',jsonb_build_object('startsOn',starts_on,'previousPolicy',r.event_policy_snapshot)),
  event_revision=event_revision+1,updated_at=now() where id=p_run;
 return jsonb_build_object('status','applied','startsOn',starts_on);
end $$;
revoke all on function public.upgrade_simulator_decisions(uuid,uuid,bigint,date,timestamptz,boolean,jsonb) from public,anon,authenticated;
grant execute on function public.upgrade_simulator_decisions(uuid,uuid,bigint,date,timestamptz,boolean,jsonb) to service_role;
commit;
