-- Delivery observes simulator state. No simulator tables or existing functions change.
create table public.sim_notification_preferences (
 user_id uuid primary key references auth.users(id) on delete cascade,
 push_enabled boolean not null default false,
 events_push_enabled boolean not null default true,
 payments_push_enabled boolean not null default true,
 monthly_review_push_enabled boolean not null default true,
 quiet_hours_enabled boolean not null default true,
 quiet_start time not null default '22:00', quiet_end time not null default '08:00',
 worker_token uuid, worker_until timestamptz, last_processed_at timestamptz,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.sim_notifications (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 run_id uuid references public.sim_runs(id) on delete cascade,
 type text not null check(type in ('event_available','event_expiring_soon','payment_due_tomorrow','monthly_review_ready')),
 semantic_key text not null, priority text not null check(priority in ('low','normal','high')),
 title text not null, body text not null,
 target_kind text not null check(target_kind in ('event','calendar_day','monthly_review','simulator')), target_id text,
 available_at timestamptz not null, expires_at timestamptz, read_at timestamptz, obsolete_at timestamptz,
 push_candidate boolean not null default false, created_at timestamptz not null default now(),
 unique(user_id,semantic_key)
);
create table public.sim_push_subscriptions (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 endpoint text not null unique, p256dh text not null, auth text not null,
 disabled_at timestamptz, created_at timestamptz not null default now(), last_seen_at timestamptz not null default now()
);
create table public.sim_notification_deliveries (
 id uuid primary key default gen_random_uuid(), notification_id uuid not null references public.sim_notifications(id) on delete cascade,
 push_subscription_id uuid not null references public.sim_push_subscriptions(id) on delete cascade,
 channel text not null default 'push' check(channel='push'),
 status text not null default 'pending' check(status in ('pending','sent','skipped','failed')),
 deliver_after timestamptz not null, attempt_count integer not null default 0,
 last_attempt_at timestamptz, last_error_code text, sent_at timestamptz,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(notification_id,push_subscription_id,channel)
);
create index sim_notification_history on public.sim_notifications(user_id,created_at desc);
create index sim_notification_unread on public.sim_notifications(user_id) where read_at is null and obsolete_at is null;
create index sim_push_active on public.sim_push_subscriptions(user_id) where disabled_at is null;
create index sim_delivery_pending on public.sim_notification_deliveries(deliver_after) where status='pending';
alter table public.sim_notifications enable row level security;
alter table public.sim_notification_preferences enable row level security;
alter table public.sim_push_subscriptions enable row level security;
alter table public.sim_notification_deliveries enable row level security;
revoke all on public.sim_notifications, public.sim_notification_preferences, public.sim_push_subscriptions, public.sim_notification_deliveries from anon, authenticated;
grant select on public.sim_notifications to authenticated;
create policy notification_owner on public.sim_notifications for select to authenticated using ((select auth.uid())=user_id);
grant all on public.sim_notifications, public.sim_notification_preferences, public.sim_push_subscriptions, public.sim_notification_deliveries to service_role;

-- One leased worker per user, including overlapping cron/development calls.
-- Fair bounded batches select only consenting users with active devices.
create function public.claim_notification_users(p_token uuid,p_limit integer,p_user uuid default null)
returns setof uuid language sql security invoker set search_path='' as $$
 with candidates as (
 select p.user_id from public.sim_notification_preferences p
 where (p.worker_until is null or p.worker_until < now())
 and (p_user is not null and p.user_id=p_user or p_user is null and p.push_enabled and exists(select 1 from public.sim_push_subscriptions s where s.user_id=p.user_id and s.disabled_at is null))
 order by p.last_processed_at nulls first,p.user_id limit least(greatest(p_limit,1),50) for update skip locked
 ) update public.sim_notification_preferences p set worker_token=p_token,worker_until=now()+interval '4 minutes'
 from candidates c where p.user_id=c.user_id returning p.user_id;
$$;
revoke all on function public.claim_notification_users(uuid,integer,uuid) from public,anon,authenticated;
grant execute on function public.claim_notification_users(uuid,integer,uuid) to service_role;
