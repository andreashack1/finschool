import { z } from 'zod';
import { addDays, dayKey } from '../calendar';
import { localInstant } from '../events/time';

export const notificationConfig = { inboxLimit: 50, reconciliationLimit: 500, subscriptionLimit: 20, userBatch: 50, deliveryBatch: 100, normalDailyLimit: 3, gapMinutes: 90, paymentMinute: 19 * 60, maxAttempts: 3, retryMinutes: 5, workerBudgetMs: 200000 } as const;
export const preferencesSchema = z.strictObject({ push_enabled: z.boolean(), events_push_enabled: z.boolean(), payments_push_enabled: z.boolean(), monthly_review_push_enabled: z.boolean(), quiet_hours_enabled: z.boolean() });
export const defaultPreferences = { push_enabled: false, events_push_enabled: true, payments_push_enabled: true, monthly_review_push_enabled: true, quiet_hours_enabled: true };
export type Preferences = z.infer<typeof preferencesSchema>;
export const typeSchema = z.enum(['event_available', 'event_expiring_soon', 'payment_due_tomorrow', 'monthly_review_ready']);
export type NotificationRecord = { id: string; user_id: string; run_id: string | null; type: z.infer<typeof typeSchema>; semantic_key: string; priority: 'low' | 'normal' | 'high'; title: string; body: string; target_kind: 'event' | 'calendar_day' | 'monthly_review' | 'simulator'; target_id: string | null; available_at: string; expires_at: string | null; read_at: string | null; obsolete_at: string | null; push_candidate: boolean; created_at: string };
export type NotificationInput = Omit<NotificationRecord, 'id' | 'created_at' | 'read_at' | 'obsolete_at'>;
export function localMinute(now: Date) {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Bucharest', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
  return Number(p.find(x => x.type === 'hour')?.value) * 60 + Number(p.find(x => x.type === 'minute')?.value);
}
export function deliveryTime(now: Date, preferences: Preferences, expiresAt: string | null): string | null {
  const minute = localMinute(now);
  const at = preferences.quiet_hours_enabled && (minute >= 1320 || minute < 480) ? localInstant(minute >= 1320 ? addDays(dayKey(now), 1) : dayKey(now), 480) : now;
  return expiresAt && at.getTime() >= Date.parse(expiresAt) ? null : at.toISOString();
}
export function categoryEnabled(n: Pick<NotificationRecord, 'type'>, p: Preferences) {
  return p.push_enabled && (n.type.startsWith('event_') ? p.events_push_enabled : n.type === 'payment_due_tomorrow' ? p.payments_push_enabled : p.monthly_review_push_enabled);
}
export function safeTarget(path: string): string {
  return /^\/simulator(?:\/eveniment\/[0-9a-f-]{36}|\?calendar=\d{4}-\d{2}-\d{2})?$/.test(path) ? path : '/simulator';
}
export function notificationTarget(n: Pick<NotificationRecord, 'target_kind' | 'target_id'>) {
  return safeTarget(n.target_kind === 'event' ? `/simulator/eveniment/${n.target_id}` : n.target_kind === 'calendar_day' ? `/simulator?calendar=${n.target_id}` : '/simulator');
}
