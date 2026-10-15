import { z } from 'zod';
import { simulatorApi } from '../../../../../src/lib/simulator/server/http';
import { readBody } from '../../../../../src/lib/account/http';
import { getServerClock } from '../../../../../src/lib/simulator/server/clock';
import { loadRun } from '../../../../../src/lib/simulator/server/service';
import { effectiveNow } from '../../../../../src/lib/simulator/server/events';
import { ensureNotification } from '../../../../../src/lib/simulator/notifications/observe';
import { metrics, processNotificationUser } from '../../../../../src/lib/simulator/notifications/worker';
import { notificationDatabase, checked } from '../../../../../src/lib/simulator/notifications/database';
import { preferences, pushConfigured } from '../../../../../src/lib/simulator/notifications/service';
export async function GET(request: Request) { return simulatorApi(request, async user => {
  const db = notificationDatabase();
  const notifications = checked(await db.from('sim_notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(50)) ?? [];
  const ids = notifications.map(n => n.id);
  return { preferences: await preferences(user.id), configured: pushConfigured(), notifications, worker: checked(await db.from('sim_notification_preferences').select('last_processed_at,worker_until,quiet_start,quiet_end').eq('user_id', user.id).single()), subscriptions: checked(await db.from('sim_push_subscriptions').select('id,disabled_at,last_seen_at').eq('user_id', user.id)), deliveries: ids.length ? checked(await db.from('sim_notification_deliveries').select('*').in('notification_id', ids).limit(100)) : [] };
}, true); }
export async function POST(request: Request) { return simulatorApi(request, async user => {
  const input = z.strictObject({ action: z.enum(['process', 'test']) }).parse(await readBody(request));
  const clock = await getServerClock(), now = effectiveNow(clock);
  if (input.action === 'test') {
    const loaded = await loadRun(user.id);
    if (loaded) await ensureNotification({ user_id: user.id, run_id: loaded.run.id, type: 'event_available', semantic_key: `dev-test:${now.toISOString().slice(0, 16)}`, priority: 'normal', title: 'Notificare de test', body: 'Notificările din Finly funcționează.', target_kind: 'simulator', target_id: null, available_at: now.toISOString(), expires_at: new Date(now.getTime() + 86400000).toISOString(), push_candidate: true });
  }
  const result = metrics(); await processNotificationUser(user.id, clock, result); return result;
}, true); }
