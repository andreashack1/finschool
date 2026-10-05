import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { publicSupabaseConfig } from './env';
import { AccountError } from '../account/errors';
import { cache } from 'react';
import type { Database } from '../account/database';
export async function serverSupabase() {
  const config = publicSupabaseConfig();
  if (!config) throw new AccountError('CONFIGURATION_ERROR', 503);
  const jar = await cookies();
  return createServerClient<Database>(config.url, config.key, { cookies: {
    getAll: () => jar.getAll(),
    setAll(values) { try { for (const value of values) jar.set(value.name, value.value, value.options); } catch { /* Server Components refresh cookies through proxy. */ } },
  } });
}
export const currentUser=cache(async()=>{
  if (!publicSupabaseConfig()) return null;
  const client = await serverSupabase();
  const { data, error } = await client.auth.getUser();
  return error ? null : data.user;
});
export async function requireUser() {
  if (!publicSupabaseConfig()) throw new AccountError('CONFIGURATION_ERROR',503);
  const user = await currentUser();
  if (!user) throw new AccountError('AUTH_REQUIRED', 401);
  return user;
}
