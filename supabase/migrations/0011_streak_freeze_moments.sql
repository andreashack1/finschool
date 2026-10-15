-- Only durable presentation metadata. Streak, inventory, XP and day history
-- remain in the existing tables and existing revision-locked transaction.
begin;
create table public.streak_moments (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 type text not null check(type in ('streak_incremented','freeze_consumed','freeze_refilled','streak_broken')),
 semantic_key text not null, effective_day date not null,
 payload jsonb not null check(payload->>'schemaVersion'='1'),
 created_at timestamptz not null default now(), acknowledged_at timestamptz,
 claim_id uuid, claim_until timestamptz,
 unique(user_id,semantic_key)
);
create index streak_moments_pending on public.streak_moments(user_id,effective_day) where acknowledged_at is null;
alter table public.streak_moments enable row level security;
revoke all on public.streak_moments from public,anon,authenticated;
grant select on public.streak_moments to authenticated;
grant all on public.streak_moments to service_role;
create policy streak_moments_own_read on public.streak_moments for select to authenticated using ((select auth.uid())=user_id);

create function public.apply_streak_progress_mutation(p_user uuid,p_operation uuid,p_type text,p_revision bigint,p_state jsonb,p_result jsonb,p_streak integer,p_longest integer,p_moments jsonb) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare outcome jsonb; item jsonb;
begin
 outcome:=public.apply_progress_mutation(p_user,p_operation,p_type,p_revision,p_state,p_result,p_streak,p_longest);
 if outcome->>'status'='applied' then
  -- Existing offline semantics can replace a frozen/broken day with genuine
  -- activity. Retire obsolete pending snapshots, keeping their audit history.
  update public.streak_moments set acknowledged_at=now(),claim_until=null
  where user_id=p_user and acknowledged_at is null and (
   (type='freeze_consumed' and not (p_state->'freezeDates' ? effective_day::text)) or
   (type='streak_broken' and ((p_state->'activityDates' ? effective_day::text) or (p_state->'freezeDates' ? effective_day::text)))
  );
  for item in select value from jsonb_array_elements(p_moments) loop
   insert into public.streak_moments(user_id,type,semantic_key,effective_day,payload)
   values(p_user,item->>'type',item->>'semantic_key',(item->>'effective_day')::date,item->'payload')
   on conflict(user_id,semantic_key) do nothing;
  end loop;
 end if;
 return outcome;
end $$;

-- Account-level lease prevents two tabs/devices presenting the same batch.
-- Retry with the same claim recovers a lost claim response. Expiry recovers a
-- closed tab before presentation/ack. No business values are mutated here.
create function public.claim_streak_moments(p_user uuid,p_claim uuid) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare result jsonb;
begin
 perform 1 from public.user_stats where user_id=p_user for update;
 if exists(select 1 from public.streak_moments where user_id=p_user and acknowledged_at is null and claim_until>now() and claim_id<>p_claim) then return '[]'::jsonb; end if;
 with candidates as (
  select id from public.streak_moments where user_id=p_user and acknowledged_at is null order by effective_day,created_at,id limit 128
 ) update public.streak_moments set claim_id=p_claim,claim_until=now()+interval '10 seconds' where id in (select id from candidates);
 select coalesce(jsonb_agg(jsonb_build_object('id',id,'type',type,'semantic_key',semantic_key,'effective_day',effective_day,'created_at',created_at,'payload',payload) order by effective_day,created_at,id),'[]'::jsonb) into result
 from public.streak_moments where user_id=p_user and acknowledged_at is null and claim_id=p_claim;
 return result;
end $$;

create function public.acknowledge_streak_moments(p_user uuid,p_claim uuid,p_ids uuid[]) returns boolean
language plpgsql security invoker set search_path='' as $$
begin
 perform 1 from public.user_stats where user_id=p_user for update;
 if exists(select 1 from unnest(p_ids) requested(id) where not exists(select 1 from public.streak_moments m where m.id=requested.id and m.user_id=p_user and (m.acknowledged_at is not null or m.claim_id=p_claim))) then return false; end if;
 update public.streak_moments set acknowledged_at=coalesce(acknowledged_at,now()),claim_until=null where user_id=p_user and id=any(p_ids) and claim_id=p_claim;
 return true;
end $$;

revoke all on function public.apply_streak_progress_mutation(uuid,uuid,text,bigint,jsonb,jsonb,integer,integer,jsonb) from public,anon,authenticated;
revoke all on function public.claim_streak_moments(uuid,uuid) from public,anon,authenticated;
revoke all on function public.acknowledge_streak_moments(uuid,uuid,uuid[]) from public,anon,authenticated;
grant execute on function public.apply_streak_progress_mutation(uuid,uuid,text,bigint,jsonb,jsonb,integer,integer,jsonb) to service_role;
grant execute on function public.claim_streak_moments(uuid,uuid) to service_role;
grant execute on function public.acknowledge_streak_moments(uuid,uuid,uuid[]) to service_role;
commit;
