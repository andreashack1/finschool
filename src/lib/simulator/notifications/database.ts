import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import { adminSupabase } from '../../supabase/admin';
import type { NotificationRecord, Preferences } from './model';
export type PreferenceRow = Preferences & { user_id: string; worker_token: string | null; worker_until: string | null; last_processed_at: string | null; quiet_start: string; quiet_end: string; updated_at: string };
export type SubscriptionRow = { id: string; user_id: string; endpoint: string; p256dh: string; auth: string; disabled_at: string | null; last_seen_at: string };
export type DeliveryRow = { id: string; notification_id: string; push_subscription_id: string; channel: 'push'; status: 'pending' | 'sent' | 'skipped' | 'failed'; deliver_after: string; attempt_count: number; last_attempt_at: string | null; last_error_code: string | null; sent_at: string | null; updated_at: string };
type Table<R> = { Row: R; Insert: Partial<R>; Update: Partial<R>; Relationships: [] };
type Schema = { public: { Tables: { sim_notifications: Table<NotificationRecord>; sim_notification_preferences: Table<PreferenceRow>; sim_push_subscriptions: Table<SubscriptionRow>; sim_notification_deliveries: Table<DeliveryRow> }; Views: Record<string, never>; Enums: Record<string, never>; CompositeTypes: Record<string, never>; Functions: { claim_notification_users: { Args: { p_token: string; p_limit: number; p_user?: string }; Returns: string[] } } } };
export function notificationDatabase() { return adminSupabase() as unknown as SupabaseClient<Schema>; }
export function checked<T>(result: { data: T; error: unknown }): T { if (result.error) throw new Error('Notifications unavailable'); return result.data; }
