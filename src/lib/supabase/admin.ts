import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { publicSupabaseConfig } from './env';
import { AccountError } from '../account/errors';
import type { Database } from '../account/database';
export function accountsConfigured() {return Boolean(publicSupabaseConfig() && process.env.SUPABASE_SERVICE_ROLE_KEY);}
export function adminSupabase() {
  const config = publicSupabaseConfig();
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!config || !secret) throw new AccountError('CONFIGURATION_ERROR', 503);
  return createClient<Database>(config.url, secret, { auth: { persistSession: false, autoRefreshToken: false } });
}
