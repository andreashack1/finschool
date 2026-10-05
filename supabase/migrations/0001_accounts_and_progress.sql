-- Finly: run once in the Supabase SQL Editor. Rewards are calculated in Next,
-- never in SQL or by the browser. CAS + a per-user row lock serialize mutations.
begin;
create table public.reserved_usernames (username text primary key);
insert into public.reserved_usernames values ('admin'),('administrator'),('finly'),('support'),('help'),('official'),('moderator'),('mod'),('security'),('system'),('root'),('api'),('staff'),('team');
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 username text not null unique check (username ~ '^[a-z0-9_]{3,20}$'),
 display_name text check (char_length(display_name)<=40),
 age_range text not null check (age_range in ('14-15','16-17','18-19','20+')),
 parental_consent boolean not null default false, parental_consent_at timestamptz,
 locale text not null default 'ro', created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check (age_range <> '14-15' or (parental_consent and parental_consent_at is not null))
);
create table public.user_consents (user_id uuid references auth.users(id) on delete cascade, consent_type text check (consent_type in ('terms','privacy','parental_acknowledgement')), version text not null, accepted_at timestamptz not null default now(), primary key(user_id,consent_type,version));
create table public.lesson_progress (
 user_id uuid references auth.users(id) on delete cascade, lesson_id text, best_score integer not null check(best_score>=0),
 best_correct integer not null check(best_correct>=0), total_questions integer not null check(total_questions>=0), attempts integer not null check(attempts>=1),
 perfect_ever boolean not null, first_completed_at timestamptz not null, last_completed_at timestamptz not null, completed_at timestamptz not null,
 session_ids jsonb not null default '[]', updated_at timestamptz not null default now(), primary key(user_id,lesson_id), check(best_correct<=total_questions), check(best_score=best_correct)
);
create table public.xp_events (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 event_key text not null, source text not null, ref_id text, lesson_id text, screen_id text,
 amount integer not null check(amount>=0), bucharest_day date not null, operation_id uuid, created_at timestamptz not null,
 unique(user_id,event_key)
);
create table public.activity_days (user_id uuid references auth.users(id) on delete cascade, day date, created_at timestamptz not null default now(), primary key(user_id,day));
create table public.streak_freeze_days (user_id uuid references auth.users(id) on delete cascade, day date, created_at timestamptz not null default now(), primary key(user_id,day));
create table public.user_stats (
 user_id uuid primary key references auth.users(id) on delete cascade, revision bigint not null default 0 check(revision>=0),
 streak_current integer not null default 0 check(streak_current>=0), streak_longest integer not null default 0 check(streak_longest>=streak_current), streak_freezes integer not null default 0 check(streak_freezes between 0 and 2),
 last_active_day date, last_freeze_grant_week_key text, state_meta jsonb not null default '{}', updated_at timestamptz not null default now()
);
create table public.user_achievements (user_id uuid references auth.users(id) on delete cascade, achievement_id text, unlocked_at timestamptz not null, notified_at timestamptz, primary key(user_id,achievement_id));
create table public.daily_challenge_answers (user_id uuid references auth.users(id) on delete cascade, day date, challenge_id text not null, selected_option_id text not null, correct boolean not null, answered_at timestamptz not null, operation_id uuid, primary key(user_id,day));
create table public.processed_operations (user_id uuid references auth.users(id) on delete cascade, operation_id uuid, operation_type text not null, processed_at timestamptz not null default now(), result_metadata jsonb, primary key(user_id,operation_id));
create index on public.xp_events(user_id,created_at);
create index on public.xp_events(user_id,bucharest_day);
create index on public.lesson_progress(user_id,completed_at);
create index on public.user_achievements(user_id,unlocked_at);
-- The primary keys already index activity_days, streak_freeze_days and daily answers.
create function public.validate_finly_profile() returns trigger language plpgsql security definer set search_path = '' as $$
begin
 new.username := lower(trim(new.username));
 if exists(select 1 from public.reserved_usernames where username=new.username) then raise exception 'reserved username'; end if;
 new.display_name := nullif(trim(new.display_name),''); new.updated_at := now(); return new;
end $$;
create trigger validate_finly_profile before insert or update on public.profiles for each row execute function public.validate_finly_profile();
create function public.create_finly_profile() returns trigger language plpgsql security definer set search_path = '' as $$
declare m jsonb := new.raw_user_meta_data; parental boolean;
begin
 if m->>'terms_version' is distinct from '2026-10-draft' or m->>'privacy_version' is distinct from '2026-10-draft' or m->>'terms' is distinct from 'true' or m->>'privacy' is distinct from 'true' then raise exception 'invalid consent'; end if;
 parental := coalesce((m->>'parental_consent')::boolean,false);
 insert into public.profiles(id,username,display_name,age_range,parental_consent,parental_consent_at)
 values(new.id,lower(trim(m->>'username')),nullif(trim(m->>'display_name'),''),m->>'age_range',parental,case when parental then now() else null end);
 insert into public.user_consents(user_id,consent_type,version) values(new.id,'terms',m->>'terms_version'),(new.id,'privacy',m->>'privacy_version');
 if m->>'age_range'='14-15' then insert into public.user_consents(user_id,consent_type,version) values(new.id,'parental_acknowledgement','2026-10-draft'); end if;
 return new;
end $$;
create trigger on_finly_user_created after insert on auth.users for each row execute function public.create_finly_profile();
create function public.username_available(candidate text) returns boolean language sql stable security definer set search_path = '' as $$
 select coalesce(candidate ~ '^[a-z0-9_]{3,20}$' and not exists(select 1 from public.reserved_usernames where username=candidate) and not exists(select 1 from public.profiles where username=candidate),false);
$$;
-- One consistent MVCC read; the Next layer maps rows to the existing engine.
create function public.read_account_progress(p_user uuid) returns jsonb language sql stable security definer set search_path = '' as $$
 select jsonb_build_object(
 'profile',(select to_jsonb(p) from public.profiles p where id=p_user),
 'stats',(select to_jsonb(s) from public.user_stats s where user_id=p_user),
 'lessons',coalesce((select jsonb_agg(to_jsonb(l)) from public.lesson_progress l where user_id=p_user),'[]'),
 'events',coalesce((select jsonb_agg(to_jsonb(e) order by created_at,event_key) from public.xp_events e where user_id=p_user),'[]'),
 'activity',coalesce((select jsonb_agg(day order by day) from public.activity_days where user_id=p_user),'[]'),
 'freezes',coalesce((select jsonb_agg(day order by day) from public.streak_freeze_days where user_id=p_user),'[]'),
 'achievements',coalesce((select jsonb_agg(to_jsonb(a)) from public.user_achievements a where user_id=p_user),'[]'),
 'daily',coalesce((select jsonb_agg(to_jsonb(d)) from public.daily_challenge_answers d where user_id=p_user),'[]'));
$$;
create function public.apply_progress_mutation(p_user uuid,p_operation uuid,p_type text,p_revision bigint,p_state jsonb,p_result jsonb,p_streak integer,p_longest integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare current_revision bigint; prior jsonb; item jsonb; pair record;
begin
 insert into public.user_stats(user_id) values(p_user) on conflict do nothing;
 select revision into current_revision from public.user_stats where user_id=p_user for update;
 if p_operation is not null then
  select result_metadata into prior from public.processed_operations where user_id=p_user and operation_id=p_operation;
  if found then return jsonb_build_object('status','duplicate','result',prior); end if;
 end if;
 if current_revision<>p_revision then return jsonb_build_object('status','conflict'); end if;
 for item in select value from jsonb_array_elements(p_state->'xp_events') loop
  insert into public.xp_events(user_id,event_key,source,ref_id,lesson_id,screen_id,amount,bucharest_day,operation_id,created_at)
  values(p_user,item->>'id',item->>'type',item->>'refId',item->>'lessonId',item->>'screenId',(item->>'amount')::integer,(item->>'bucharestDateKey')::date,p_operation,(item->>'createdAt')::timestamptz) on conflict(user_id,event_key) do nothing;
 end loop;
 for pair in select key,value from jsonb_each(p_state->'lessonStats') loop
  if (pair.value->>'completed')::boolean then
   insert into public.lesson_progress(user_id,lesson_id,best_score,best_correct,total_questions,attempts,perfect_ever,first_completed_at,last_completed_at,completed_at,session_ids)
   values(p_user,pair.key,(pair.value->>'bestFirstTryCorrect')::integer,(pair.value->>'bestFirstTryCorrect')::integer,(pair.value->>'questionCount')::integer,(pair.value->>'completionCount')::integer,(pair.value->>'perfectEver')::boolean,(pair.value->>'firstCompletedAt')::timestamptz,(pair.value->>'lastCompletedAt')::timestamptz,(pair.value->>'firstCompletedAt')::timestamptz,pair.value->'sessionIds')
   on conflict(user_id,lesson_id) do update set best_score=excluded.best_score,best_correct=excluded.best_correct,total_questions=excluded.total_questions,attempts=excluded.attempts,perfect_ever=excluded.perfect_ever,last_completed_at=excluded.last_completed_at,session_ids=excluded.session_ids,updated_at=now();
  end if;
 end loop;
 for item in select value from jsonb_array_elements(p_state->'activityDates') loop insert into public.activity_days(user_id,day) values(p_user,(item#>>'{}')::date) on conflict do nothing; end loop;
 delete from public.streak_freeze_days where user_id=p_user and not (p_state->'freezeDates' ? day::text);
 for item in select value from jsonb_array_elements(p_state->'freezeDates') loop insert into public.streak_freeze_days(user_id,day) values(p_user,(item#>>'{}')::date) on conflict do nothing; end loop;
 for pair in select key,value from jsonb_each(p_state->'achievementUnlocks') loop
  insert into public.user_achievements(user_id,achievement_id,unlocked_at,notified_at)
  values(p_user,pair.key,(pair.value->>'unlockedAt')::timestamptz,case when p_state->'seenAchievementToastIds' ? pair.key then now() else null end)
  on conflict(user_id,achievement_id) do update set notified_at=coalesce(public.user_achievements.notified_at,excluded.notified_at);
 end loop;
 for pair in select key,value from jsonb_each(p_state->'dailyChallenges') loop
  insert into public.daily_challenge_answers(user_id,day,challenge_id,selected_option_id,correct,answered_at,operation_id)
  values(p_user,pair.key::date,pair.value->>'challengeId',pair.value->>'selectedOptionId',(pair.value->>'correct')::boolean,(pair.value->>'answeredAt')::timestamptz,p_operation) on conflict do nothing;
 end loop;
 update public.user_stats set revision=revision+1,streak_current=p_streak,streak_longest=p_longest,streak_freezes=(p_state->>'freezeBalance')::integer,
 last_active_day=(select max(value::date) from jsonb_array_elements_text(p_state->'activityDates')),last_freeze_grant_week_key=p_state->>'lastFreezeGrantWeekKey',
 state_meta=p_state-'xp_events'-'lessonStats'-'activityDates'-'freezeDates'-'dailyChallenges'-'achievementUnlocks'-'seenAchievementToastIds'-'freezeBalance',updated_at=now() where user_id=p_user;
 if p_operation is not null then insert into public.processed_operations(user_id,operation_id,operation_type,result_metadata) values(p_user,p_operation,p_type,p_result); end if;
 return jsonb_build_object('status','applied','result',p_result);
end $$;
create function public.update_account_profile(p_user uuid,p_username text,p_display_name text) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
 perform 1 from public.user_stats where user_id=p_user for update;
 update public.profiles set username=p_username,display_name=p_display_name where id=p_user;
 if not found then return false; end if;
 update public.user_stats set revision=revision+1,updated_at=now() where user_id=p_user;
 return true;
end $$;
do $$ declare t text; column_name text; begin
 foreach t in array array['profiles','user_consents','lesson_progress','xp_events','activity_days','streak_freeze_days','user_stats','user_achievements','daily_challenge_answers','processed_operations'] loop
  execute format('alter table public.%I enable row level security',t);
  column_name := case when t='profiles' then 'id' else 'user_id' end;
  execute format('create policy own_select on public.%I for select to authenticated using ((select auth.uid())=%I)',t,column_name);
  execute format('revoke all on public.%I from anon,authenticated',t);
  execute format('grant select on public.%I to authenticated',t);
  execute format('grant all on public.%I to service_role',t);
 end loop;
end $$;
alter table public.reserved_usernames enable row level security;
revoke all on public.reserved_usernames from anon,authenticated;
grant all on public.reserved_usernames to service_role;
revoke all on function public.create_finly_profile(),public.validate_finly_profile(),public.read_account_progress(uuid),public.apply_progress_mutation(uuid,uuid,text,bigint,jsonb,jsonb,integer,integer),public.update_account_profile(uuid,text,text),public.username_available(text) from public,anon,authenticated;
grant execute on function public.username_available(text) to anon,authenticated,service_role;
grant execute on function public.read_account_progress(uuid),public.apply_progress_mutation(uuid,uuid,text,bigint,jsonb,jsonb,integer,integer),public.update_account_profile(uuid,text,text) to service_role;
commit;
