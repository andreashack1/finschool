'use client';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import { publicSupabaseConfig } from './env';
import type { Database } from '../account/database';
let client: SupabaseClient<Database> | null = null;
export function browserSupabase() {
  const config = publicSupabaseConfig();
  if (!config) return null;
  return client ??= createBrowserClient<Database>(config.url, config.key);
}
