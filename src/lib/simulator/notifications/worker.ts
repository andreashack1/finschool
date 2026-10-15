import 'server-only';
import { randomUUID } from 'node:crypto';
import webPush from 'web-push';
import { clockSnapshot, type SimulatorClock } from '../clock';
import { dayKey } from '../calendar';
import { localInstant } from '../events/time';
import { loadRun, simulatorState } from '../server/service';
import { checked, notificationDatabase, type DeliveryRow } from './database';
import { categoryEnabled, deliveryTime, notificationConfig } from './model';
import { observeNotifications, relevant } from './observe';
import { preferences, pushConfigured } from './service';

export function metrics() { return { runsProcessed: 0, notificationsCreated: 0, attempted: 0, sent: 0, skipped: 0, failed: 0, staleSubscriptionsDisabled: 0, runFailures: 0 }; }
export type Metrics = ReturnType<typeof metrics>;
export async function processNotificationUser(userId: string, clock: SimulatorClock, result: Metrics) {
  const db = notificationDatabase(), token = randomUUID();
  await preferences(userId);
  const claimed = checked(await db.rpc('claim_notification_users', { p_token: token, p_limit: 1, p_user: userId }));
  if (!claimed?.includes(userId)) return;
  try { await processLeasedUser(userId, clock, result, token); }
  finally { checked(await db.from('sim_notification_preferences').update({ worker_token: null, worker_until: null, last_processed_at: new Date().toISOString() }).eq('user_id', userId).eq('worker_token', token)); }
}
async function processLeasedUser(userId: string, clock: SimulatorClock, result: Metrics, token: string) {
  const db = notificationDatabase();
  // SAME canonical engine as app open; catch-up remains bounded by its existing policy.
  await simulatorState(userId, clock);
  result.runsProcessed++;
  let loaded = await loadRun(userId);
  if (!loaded) return;
  const now = process.env.NODE_ENV === 'development' && clock.effectiveNow ? new Date(clock.effectiveNow) : new Date();
  result.notificationsCreated += await observeNotifications(loaded, now);
  const p = await preferences(userId);
  if (!p.push_enabled || !pushConfigured()) return;
  const subscriptions = checked(await db.from('sim_push_subscriptions').select('*').eq('user_id', userId).is('disabled_at', null).limit(notificationConfig.subscriptionLimit)) ?? [];
  const notifications = checked(await db.from('sim_notifications').select('*').eq('user_id', userId).is('obsolete_at', null).is('read_at', null).eq('push_candidate', true).order('priority').order('available_at').order('id').limit(notificationConfig.deliveryBatch)) ?? [];
  for (const n of notifications) {
    if (!categoryEnabled(n, p) || !relevant(n, loaded, now)) continue;
    const at = deliveryTime(now, p, n.expires_at);
    for (const s of subscriptions) checked(await db.from('sim_notification_deliveries').upsert({ notification_id: n.id, push_subscription_id: s.id, channel: 'push', status: at ? 'pending' : 'skipped', deliver_after: at ?? now.toISOString() }, { onConflict: 'notification_id,push_subscription_id,channel', ignoreDuplicates: true }));
  }
  const deviceIds = subscriptions.map(s => s.id);
  if (!deviceIds.length) return;
  const pending = checked(await db.from('sim_notification_deliveries').select('*').in('push_subscription_id', deviceIds).eq('status', 'pending').lte('deliver_after', now.toISOString()).order('created_at').limit(notificationConfig.deliveryBatch)) ?? [];
  const rank = { high: 0, normal: 1, low: 2 };
  pending.sort((a, b) => (rank[notifications.find(n => n.id === a.notification_id)?.priority ?? 'normal'] - rank[notifications.find(n => n.id === b.notification_id)?.priority ?? 'normal']) || (notifications.find(n => n.id === a.notification_id)?.semantic_key ?? '').localeCompare(notifications.find(n => n.id === b.notification_id)?.semantic_key ?? '') || a.push_subscription_id.localeCompare(b.push_subscription_id));
  const dayStart = localInstant(dayKey(now), 0).toISOString();
  const history = checked(await db.from('sim_notification_deliveries').select('*').in('push_subscription_id', deviceIds).eq('status', 'sent').gte('sent_at', dayStart)) ?? [];
  const sentIds = new Set(history.map(d => d.notification_id));
  const historyNotifications = sentIds.size ? checked(await db.from('sim_notifications').select('*').in('id', [...sentIds])) ?? [] : [];
  const normalIds = new Set(history.filter(d => historyNotifications.find(n => n.id === d.notification_id)?.priority !== 'high').map(d => d.notification_id));
  let lastSent = Math.max(0, ...history.map(d => Date.parse(d.sent_at!)));
  const highAlreadySent = history.some(d => historyNotifications.find(n => n.id === d.notification_id)?.priority === 'high');
  let highSent = highAlreadySent;
  for (const d of pending) {
    // Re-read ownership, preferences and truth immediately before external delivery.
    const lease = checked(await db.from('sim_notification_preferences').select('worker_token,worker_until').eq('user_id', userId).single());
    if (!lease || lease.worker_token !== token || !lease.worker_until || Date.parse(lease.worker_until) <= Date.now()) break;
    loaded = await loadRun(userId);
    const current = await preferences(userId);
    const n = checked(await db.from('sim_notifications').select('*').eq('id', d.notification_id).eq('user_id', userId).maybeSingle());
    const s = checked(await db.from('sim_push_subscriptions').select('*').eq('id', d.push_subscription_id).eq('user_id', userId).is('disabled_at', null).maybeSingle());
    const finish = async (patch: Partial<DeliveryRow>) => { checked(await db.from('sim_notification_deliveries').update({ ...patch, updated_at: new Date().toISOString() }).eq('id', d.id)); };
    if (!n || !s || n.read_at || !categoryEnabled(n, current) || !relevant(n, loaded, now)) { await finish({ status: 'skipped' }); result.skipped++; continue; }
    const at = deliveryTime(now, current, n.expires_at);
    if (!at) { await finish({ status: 'skipped' }); result.skipped++; continue; }
    if (at > now.toISOString()) { await finish({ deliver_after: at }); continue; }
    // Count logical notifications, not devices. All active devices may receive one record.
    if (!sentIds.has(n.id) && ((n.priority === 'high' && highSent) || (n.priority !== 'high' && (normalIds.size >= notificationConfig.normalDailyLimit || now.getTime() - lastSent < notificationConfig.gapMinutes * 60000)))) {
      const later = new Date(Math.max(now.getTime() + notificationConfig.gapMinutes * 60000, lastSent + notificationConfig.gapMinutes * 60000));
      if (n.priority === 'high' || normalIds.size >= notificationConfig.normalDailyLimit || (n.expires_at && later.getTime() >= Date.parse(n.expires_at))) { await finish({ status: 'skipped' }); result.skipped++; }
      else await finish({ deliver_after: later.toISOString() });
      continue;
    }
    result.attempted++;
    // Persist attempt before provider I/O. Retries are bounded even after a crash.
    if (d.attempt_count >= notificationConfig.maxAttempts) { await finish({ status: 'failed' }); result.failed++; continue; }
    await finish({ attempt_count: d.attempt_count + 1, last_attempt_at: new Date().toISOString(), deliver_after: new Date(now.getTime() + notificationConfig.retryMinutes * 60000 * 2 ** d.attempt_count).toISOString() });
    try {
      await webPush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify({ notificationId: n.id }), { vapidDetails: { subject: process.env.WEB_PUSH_VAPID_SUBJECT!, publicKey: process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY!, privateKey: process.env.WEB_PUSH_VAPID_PRIVATE_KEY! }, TTL: 900, timeout: 10000 });
      await finish({ status: 'sent', sent_at: now.toISOString(), last_error_code: null }); result.sent++;
      sentIds.add(n.id); lastSent = now.getTime();
      if (n.priority === 'high') highSent = true; else normalIds.add(n.id);
    } catch (error) {
      const status = typeof error === 'object' && error && 'statusCode' in error ? Number(error.statusCode) : 0;
      if (status === 404 || status === 410) { checked(await db.from('sim_push_subscriptions').update({ disabled_at: new Date().toISOString() }).eq('id', s.id)); result.staleSubscriptionsDisabled++; }
      const retry = (status === 0 || status === 429 || status >= 500) && d.attempt_count + 1 < notificationConfig.maxAttempts;
      await finish({ status: retry ? 'pending' : 'failed', last_error_code: String(status || 'transport') }); result.failed++;
    }
  }
}
export async function notificationWorker() {
  const db = notificationDatabase(), token = randomUUID(), result = metrics();
  const started = Date.now();
  const users = checked(await db.rpc('claim_notification_users', { p_token: token, p_limit: notificationConfig.userBatch }));
  for (const userId of users ?? []) {
    try { if (Date.now() - started < notificationConfig.workerBudgetMs) { const now = new Date(); await processLeasedUser(userId, { ...clockSnapshot(now, 0, 'production'), effectiveNow: now.toISOString() }, result, token); } }
    catch { result.runFailures++; }
    finally { try { checked(await db.from('sim_notification_preferences').update({ worker_token: null, worker_until: null, last_processed_at: new Date().toISOString() }).eq('user_id', userId).eq('worker_token', token)); } catch { /* Lease expires safely. */ } }
  }
  return result;
}
