import 'server-only';
import { eventNotificationPolicies, developmentEventNotificationPolicies } from '../../../content/simulator/notification-config';
import { addDays, dayKey, monthKey } from '../calendar';
import { buildFinancialCalendar } from '../financial-calendar';
import { formatLei } from '../money';
import { localInstant } from '../events/time';
import type { loadRun } from '../server/service';
import type { EventInstance } from '../events/types';
import { notificationDatabase, checked } from './database';
import { notificationConfig, localMinute, typeSchema, type NotificationInput, type NotificationRecord } from './model';
export type Loaded = NonNullable<Awaited<ReturnType<typeof loadRun>>>;

/** Immutable instance snapshots supply both current and historical copy. */
export function eventNotificationPresentation(e: EventInstance) {
  const status = e.status === 'resolved' ? e.resolutionMode === 'automatic' ? 'missed' : 'resolved' : 'active';
  const option = e.snapshot.options.find(o => o.id === e.selectedOptionId);
  return {
    status,
    title: e.snapshot.presentation?.title ?? e.snapshot.title,
    body: status === 'active' ? e.snapshot.presentation?.context ?? e.snapshot.description : `${status === 'missed' ? 'Simulatorul a ales' : 'Ai ales'}: ${option?.label ?? 'Varianta salvată'}`,
    amount: e.selectedCostBani,
    significantAt: e.status === 'resolved' ? e.resolutionEffectiveAt ?? e.resolvedAt ?? e.expiresAt : e.scheduledAt,
  };
}

/** Pure projection of persisted canonical truth. Never settles or plans anything. */
export function notificationCandidates(loaded: Loaded, now: Date): NotificationInput[] {
  const at = now.toISOString(), today = dayKey(now), rows: NotificationInput[] = [];
  const base = { user_id: loaded.run.userId, run_id: loaded.run.id, available_at: at };
  for (const e of loaded.instances) {
    if (e.status === 'cancelled' || e.scheduledAt > at || (e.status === 'pending' && (e.expiresAt <= at || e.day !== today))) continue;
    const presentation = eventNotificationPresentation(e);
    const policy = eventNotificationPolicies[e.definitionId] ?? (process.env.NODE_ENV === 'development' ? developmentEventNotificationPolicies[e.definitionId] : undefined);
    rows.push({ ...base, available_at: presentation.significantAt, priority: policy ? 'normal' : 'low', body: presentation.body, target_kind: 'event', target_id: e.id, expires_at: e.status === 'pending' ? e.expiresAt : null, push_candidate: e.status === 'pending' && !!policy, type: 'event_available', semantic_key: `event:${e.id}:available`, title: presentation.title });
  }
  if (localMinute(now) >= notificationConfig.paymentMinute && loaded.run.lastSettledOn === today) {
    const tomorrow = addDays(today, 1);
    const calendar = buildFinancialCalendar(loaded.run, loaded.ledger, loaded.subscriptions, today, monthKey(tomorrow));
    const items = calendar.days.find(d => d.day === tomorrow)?.items.filter(i => i.status === 'upcoming' && i.amountBani < 0) ?? [];
    // Identity includes deterministic schedule position, so equal labels do not collide.
    items.forEach(item => rows.push({ ...base, type: 'payment_due_tomorrow', semantic_key: `payment:${loaded.run.id}:${tomorrow}:${item.sourceType}:${item.sourceId}`, priority: 'normal', title: 'Mâine ai o plată programată', body: `${item.title} · ${formatLei(Math.abs(item.amountBani) as typeof item.amountBani)}`, target_kind: 'calendar_day', target_id: tomorrow, expires_at: localInstant(tomorrow, 0).toISOString(), push_candidate: true }));
  }
  const pending = loaded.monthlyReviews.filter(r => !r.reviewedAt).sort((a, b) => a.snapshot.monthKey.localeCompare(b.snapshot.monthKey));
  for (const review of pending) rows.push({ ...base, type: 'monthly_review_ready', semantic_key: `monthly-review:${review.id}:ready`, priority: 'high', title: 'Luna s-a încheiat', body: 'Fini are rezumatul pregătit.', target_kind: 'monthly_review', target_id: review.id, expires_at: null, push_candidate: review.id === pending[0]?.id });
  return rows;
}
export function relevant(n: NotificationRecord, loaded: Loaded | null, now: Date) {
  if (!loaded || loaded.run.id !== n.run_id || n.obsolete_at || n.available_at > now.toISOString() || (n.expires_at && n.expires_at <= now.toISOString())) return false;
  if (n.target_kind === 'event') return loaded.instances.some(e => e.id === n.target_id && e.status === 'pending' && e.scheduledAt <= now.toISOString() && e.expiresAt > now.toISOString() && e.day === dayKey(now));
  if (n.target_kind === 'monthly_review') return loaded.monthlyReviews.some(r => r.id === n.target_id && !r.reviewedAt);
  if (n.target_kind === 'calendar_day') return notificationCandidates(loaded, now).some(c => c.semantic_key === n.semantic_key && c.body === n.body);
  return process.env.NODE_ENV === 'development';
}
export async function ensureNotification(input: NotificationInput, created?: () => void) {
  typeSchema.parse(input.type);
  const db = notificationDatabase();
  const inserted = checked(await db.from('sim_notifications').upsert(input, { onConflict: 'user_id,semantic_key', ignoreDuplicates: true }).select('*').maybeSingle());
  if (inserted) { created?.(); return inserted; }
  return checked(await db.from('sim_notifications').select('*').eq('user_id', input.user_id).eq('semantic_key', input.semantic_key).single());
}
export async function observeNotifications(loaded: Loaded | null, now: Date) {
  if (!loaded) return 0;
  const db = notificationDatabase();
  const old = checked(await db.from('sim_notifications').select('*').eq('user_id', loaded.run.userId).order('available_at', { ascending: false }).limit(notificationConfig.reconciliationLimit)) ?? [];
  const existing = new Map(old.map(n => [n.semantic_key, n]));
  // Old expiry reminders remain delivery history, but never count as a second inbox thread.
  checked(await db.from('sim_notifications').update({ obsolete_at: now.toISOString() }).eq('user_id', loaded.run.userId).eq('type', 'event_expiring_soon').eq('target_kind', 'event').is('obsolete_at', null));
  for (const n of old) {
    const event = n.target_kind === 'event' ? loaded.instances.find(e => e.id === n.target_id) : null;
    // Delivery relevance remains active-only; inbox relevance also includes results.
    const keep = event && n.type === 'event_available' ? event.status !== 'cancelled' && event.scheduledAt <= now.toISOString() : relevant(n, loaded, now);
    if (!keep && !n.obsolete_at) checked(await db.from('sim_notifications').update({ obsolete_at: now.toISOString(), read_at: n.read_at ?? now.toISOString() }).eq('user_id', loaded.run.userId).eq('id', n.id));
  }
  let created = 0;
  for (const n of notificationCandidates(loaded, now)) {
    const saved = existing.get(n.semantic_key) ?? await ensureNotification(n, () => { created++; });
    if (!saved || n.target_kind !== 'event') continue;
    const event = loaded.instances.find(e => e.id === n.target_id)!;
    // A terminal thread has no delivery expiry. This also protects an immediate
    // manual choice whose significant timestamp equals its availability.
    if (event.status === 'pending' && saved.expires_at === null && saved.title !== 'Situație nouă') continue;
    // available_at is the existing significant-version timestamp. Conditional
    // updates prevent stale devices regressing a result or resetting a later read.
    if (Date.parse(saved.available_at) > Date.parse(n.available_at) && saved.title !== 'Situație nouă') continue;
    const changed = saved.body !== n.body || saved.title !== n.title || Date.parse(saved.available_at) !== Date.parse(n.available_at) || (saved.expires_at ? Date.parse(saved.expires_at) : null) !== (n.expires_at ? Date.parse(n.expires_at) : null) || saved.obsolete_at !== null;
    if (changed || (event.resolutionMode === 'manual' && !saved.read_at)) {
      let update = db.from('sim_notifications').update({ ...n, obsolete_at: null,
        read_at: event.resolutionMode === 'manual' ? saved.read_at ?? new Date().toISOString() : changed && event.resolutionMode === 'automatic' ? null : saved.read_at,
      }).eq('user_id', loaded.run.userId).eq('id', saved.id).eq('body', saved.body).eq('available_at', saved.available_at);
      if (event.resolutionMode !== 'automatic') update = saved.read_at ? update.eq('read_at', saved.read_at) : update.is('read_at', null);
      checked(await update);
    }
  }
  return created;
}
/** Delivery/storage failure cannot undo or block canonical settlement. */
export async function observeSafely(loaded: Loaded | null, now: Date) {
  try { await observeNotifications(loaded, now); } catch { if (process.env.NODE_ENV === 'development') console.warn('[notifications] storage unavailable; simulator preserved'); }
}
export async function observeUserSafely(userId: string, clock: import('../clock').SimulatorClock) {
  try {
    const { loadRun } = await import('../server/service');
    const { effectiveNow } = await import('../server/events');
    await observeNotifications(await loadRun(userId), effectiveNow(clock));
  } catch { /* Retried by the next inbox load; canonical choices are already committed. */ }
}
