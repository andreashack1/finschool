import 'server-only';
import { z } from 'zod';
import { loadRun } from '../server/service';
import { SimulatorError } from '../errors';
import { notificationDatabase, checked } from './database';
import { defaultPreferences, notificationConfig, preferencesSchema, notificationTarget, categoryEnabled, deliveryTime } from './model';
import { relevant, eventNotificationPresentation } from './observe';
export function pushConfigured() { return !!(process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY && process.env.WEB_PUSH_VAPID_PRIVATE_KEY && process.env.WEB_PUSH_VAPID_SUBJECT); }
export async function preferences(userId: string) {
  const db = notificationDatabase();
  checked(await db.from('sim_notification_preferences').upsert({ user_id: userId }, { onConflict: 'user_id', ignoreDuplicates: true }));
  return preferencesSchema.parse(checked(await db.from('sim_notification_preferences').select('push_enabled,events_push_enabled,payments_push_enabled,monthly_review_push_enabled,quiet_hours_enabled').eq('user_id', userId).single()));
}
export async function inbox(userId: string, at = new Date()) {
  const db = notificationDatabase(), now = at.toISOString();
  const items = checked(await db.from('sim_notifications').select('*').eq('user_id', userId).is('obsolete_at', null).lte('available_at', now).order('available_at', { ascending: false }).order('id').limit(notificationConfig.inboxLimit)) ?? [];
  const count = await db.from('sim_notifications').select('id', { count: 'exact', head: true }).eq('user_id', userId).is('read_at', null).is('obsolete_at', null).lte('available_at', now);
  checked(count);
  // Read canonical instances after notification rows so a concurrent choice
  // cannot pair a newer terminal thread with an older pending snapshot.
  const loaded = await loadRun(userId);
  const nextSyncAt = loaded?.instances.filter(e => e.status === 'pending').flatMap(e => [e.scheduledAt, e.expiresAt]).filter(t => t > now).sort()[0] ?? null;
  return { serverNow: now, nextSyncAt, items: items.map(n => {
    const event = n.target_kind === 'event' ? loaded?.instances.find(e => e.id === n.target_id) : null;
    const presentation = event ? eventNotificationPresentation(event) : null;
    return { id: n.id, eventId: event?.id ?? null, title: presentation?.title ?? n.title, body: presentation?.body ?? n.body, status: presentation?.status ?? 'information', amount: presentation?.amount ?? null, expiresAt: event?.status === 'pending' ? event.expiresAt : null, target: notificationTarget(n), availableAt: n.available_at, readAt: n.read_at };
  }), unread: count.count ?? 0 };
}
export async function markRead(userId: string, id?: string, at = new Date(), version?: string) {
  const db = notificationDatabase();
  let target = '/simulator';
  if (id) {
    const n = checked(await db.from('sim_notifications').select('*').eq('user_id', userId).eq('id', id).maybeSingle());
    if (!n) throw new SimulatorError('INVALID_SIMULATOR_INPUT', 404);
    const loaded = await loadRun(userId);
    const event = n.target_kind === 'event' ? loaded?.instances.find(e => e.id === n.target_id && e.status !== 'cancelled' && e.scheduledAt <= at.toISOString()) : null;
    if (event || (relevant(n, loaded, at) && !loaded?.monthlyReviews.some(r => !r.reviewedAt))) target = notificationTarget(n);
  }
  let query = db.from('sim_notifications').update({ read_at: new Date().toISOString() }).eq('user_id', userId).is('read_at', null).is('obsolete_at', null).lte('available_at', at.toISOString());
  if (id) query = query.eq('id', id);
  if (id && version) query = query.eq('available_at', version);
  checked(await query);
  return { target, ...await inbox(userId, at) };
}
export const subscriptionInput = z.strictObject({ endpoint: z.url().max(2048).refine(value => {
  const url = new URL(value);
  // Fixed Web Push services only: never turn registration into a server SSRF proxy.
  return url.protocol === 'https:' && !url.username && !url.password && !url.port && ['fcm.googleapis.com', 'updates.push.services.mozilla.com', 'web.push.apple.com', 'wns.windows.com'].some(h => url.hostname === h || url.hostname.endsWith(`.${h}`));
}), expirationTime: z.number().finite().nonnegative().nullable().optional(), keys: z.strictObject({ p256dh: z.string().regex(/^[A-Za-z0-9_-]{87}=?$/), auth: z.string().regex(/^[A-Za-z0-9_-]{22}==?$/).or(z.string().regex(/^[A-Za-z0-9_-]{22}$/)) }) });
export async function register(userId: string, value: z.infer<typeof subscriptionInput>) {
  const db = notificationDatabase();
  // Explicit authenticated registration safely transfers this installation.
  const previous = checked(await db.from('sim_push_subscriptions').select('id,user_id').eq('endpoint', value.endpoint).maybeSingle());
  if (previous && previous.user_id !== userId) checked(await db.from('sim_notification_deliveries').update({ status: 'skipped' }).eq('push_subscription_id', previous.id).eq('status', 'pending'));
  checked(await db.from('sim_push_subscriptions').upsert({ user_id: userId, endpoint: value.endpoint, ...value.keys, disabled_at: null, last_seen_at: new Date().toISOString() }, { onConflict: 'endpoint' }));
  const p = await preferences(userId);
  checked(await db.from('sim_notification_preferences').update({ ...p, push_enabled: true }).eq('user_id', userId));
  return { ok: true };
}
export async function unregister(userId: string, endpoint: string) {
  checked(await notificationDatabase().from('sim_push_subscriptions').update({ disabled_at: new Date().toISOString() }).eq('user_id', userId).eq('endpoint', endpoint));
  return { ok: true };
}
export async function markTargetHandled(userId: string, kind: 'event' | 'monthly_review', id: string) {
  try { checked(await notificationDatabase().from('sim_notifications').update({ read_at: new Date().toISOString() }).eq('user_id', userId).eq('target_kind', kind).eq('target_id', id).is('read_at', null)); }
  catch { /* Notification persistence never blocks an existing simulator action. */ }
}
export async function savePreferences(userId: string, input: unknown) {
  const p = preferencesSchema.parse(input);
  await preferences(userId);
  checked(await notificationDatabase().from('sim_notification_preferences').update({ ...p, updated_at: new Date().toISOString() }).eq('user_id', userId));
  return { preferences: p };
}
export async function display(userId: string, id: string, at = new Date()) {
  const n = checked(await notificationDatabase().from('sim_notifications').select('*').eq('user_id', userId).eq('id', id).maybeSingle());
  const p = await preferences(userId);
  if (!n || !categoryEnabled(n, p) || n.read_at || deliveryTime(at, p, n.expires_at) !== at.toISOString() || !relevant(n, await loadRun(userId), at)) return null;
  return { title: n.title, body: n.body, target: notificationTarget(n), tag: n.semantic_key, id: n.id };
}
export { defaultPreferences };
