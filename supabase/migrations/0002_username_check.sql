-- Only repairs the existing boolean availability contract. No data changes.
begin;
create or replace function public.username_available(candidate text)
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce(
    normalized.value ~ '^[a-z0-9_]{3,20}$'
    and not exists(select 1 from public.reserved_usernames where username = normalized.value)
    and not exists(select 1 from public.profiles where username = normalized.value),
    false
  ) from (select lower(trim(candidate)) as value) normalized;
$$;
revoke all on function public.username_available(text) from public, anon, authenticated;
grant execute on function public.username_available(text) to anon, authenticated, service_role;
commit;
