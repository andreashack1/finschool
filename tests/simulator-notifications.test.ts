import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';
vi.mock('server-only', () => ({}));
import { defaultPreferences, deliveryTime, safeTarget } from '../src/lib/simulator/notifications/model';
import { notificationCandidates, relevant, type Loaded } from '../src/lib/simulator/notifications/observe';
import { fixtureRun, day } from './simulator-fixtures';
import { localInstant } from '../src/lib/simulator/events/time';
import { synchronizeEvents } from '../src/lib/simulator/events/synchronize';
import { engineSchema } from '../src/lib/simulator/events/types';
import { eventCatalog, eventPolicy } from '../src/content/simulator/events/registry.server';
import { settle } from '../src/lib/simulator/settle';
const source = readFileSync('public/finly-push-sw.js', 'utf8');
describe('Chapter 8 notification projection and quiet hours', () => {
  it.each(['2026-03-28', '2026-10-24'])('quiet hours cross DST in Bucharest: %s', date => {
    const next = date.endsWith('28') ? '2026-03-29' : '2026-10-25';
    const now = localInstant(day(date), 1380), end = localInstant(day(next), 480);
    expect(deliveryTime(now, defaultPreferences, null)).toBe(end.toISOString());
    expect(deliveryTime(now, defaultPreferences, localInstant(day(next), 420).toISOString())).toBeNull();
    expect(deliveryTime(now, { ...defaultPreferences, quiet_hours_enabled: false }, null)).toBe(now.toISOString());
  });
  it('rejects arbitrary URLs and accepts only typed simulator routes', () => {
    expect(safeTarget('https://evil.test')).toBe('/simulator'); expect(safeTarget('//evil.test')).toBe('/simulator'); expect(safeTarget('/simulator?calendar=2026-10-12')).toContain('calendar');
  });
  it('observes only real visible pending events; default routine push is off; no projection mutation', () => {
    let run = fixtureRun('2026-10-10');
    const engine = engineSchema.parse({ scheduleProfile: 'liceu', startedAt: localInstant(run.startedOn, 0).toISOString(), catalogVersion: 2, policyVersion: 2, policySnapshot: eventPolicy(2), lastClosedDay: null, processedAt: null });
    const materialize = () => synchronizeEvents({ run, ledger: settle(run, [], run.startedOn).newEntries, engine, instances: [], days: [], revision: 0, subscriptions: [], consequenceState: { effects: [], operations: [] } }, localInstant(run.startedOn, 600), eventCatalog(2), true, '2026-10-10T00:00:00.000Z', eventCatalog);
    let result = materialize();
    // Quiet days are legitimate. Select a deterministic real nonquiet fixture
    // without asking notification code to invent an event.
    for (let seed = 1; !result.instances.length && seed <= 20; seed++) { run = { ...run, id: `00000000-0000-4000-8000-${String(seed).padStart(12, '0')}` }; result = materialize(); }
    const loaded = { ...result, monthlyReviews: [], revision: 1 } as unknown as Loaded;
    const before = structuredClone(loaded), now = localInstant(run.startedOn, 600);
    const candidates = notificationCandidates(loaded, now);
    for (const n of candidates) { const event = loaded.instances.find(e => e.id === n.target_id)!; expect(event.scheduledAt <= now.toISOString()).toBe(true); expect(event.status).toBe('pending'); if (event.definitionId.includes('water')) expect(n.push_candidate).toBe(false); }
    expect(loaded).toEqual(before);
    const later = localInstant(day('2026-11-01'), 600);
    expect(notificationCandidates(loaded, later).filter(n => n.type.startsWith('event_'))).toEqual([]);
    for (const n of candidates) expect(relevant({ ...n, id: crypto.randomUUID(), created_at: now.toISOString(), read_at: null, obsolete_at: null }, loaded, later)).toBe(false);
    const instance = loaded.instances[0]; expect(instance).toBeTruthy();
    const notification = { id: crypto.randomUUID(), user_id: run.userId, run_id: run.id, type: 'event_available' as const, semantic_key: `event:${instance.id}:available`, priority: 'normal' as const, title: 'Situație nouă', body: instance.snapshot.title, target_kind: 'event' as const, target_id: instance.id, available_at: now.toISOString(), expires_at: null, read_at: null, obsolete_at: null, push_candidate: true, created_at: now.toISOString() };
    for (const status of ['resolved', 'cancelled'] as const) expect(relevant(notification, { ...loaded, instances: [{ ...instance, status }] }, now)).toBe(false);
    expect(relevant(notification, { ...loaded, instances: [{ ...instance, scheduledAt: new Date(now.getTime()+60000).toISOString() }] }, now)).toBe(false);
  });
});
describe('Chapter 8 real service worker privacy and clicks', () => {
  function worker(response: Response, clients: object[] = []) {
    const handlers: Record<string, (event: object) => void> = {}, show = vi.fn(), open = vi.fn(), fetchMock = vi.fn().mockResolvedValue(response);
    runInNewContext(source, { self: { addEventListener: (name: string, fn: (event: object) => void) => { handlers[name] = fn; }, clients: { matchAll: async () => clients, openWindow: open }, registration: { showNotification: show }, location: { origin: 'https://finly.test' } }, fetch: fetchMock, URL, encodeURIComponent });
    return { handlers, show, open, fetchMock };
  }
  it.each([401, 403, 503])('never displays unauthenticated/foreign/offline content (%s)', async status => {
    const w = worker(new Response(null, { status })); let pending: Promise<void> = Promise.resolve();
    w.handlers.push({ data: { json: () => ({ notificationId: '00000000-0000-4000-8000-000000000001' }) }, waitUntil: (p: Promise<void>) => { pending = p; } }); await pending; expect(w.show).not.toHaveBeenCalled();
  });
  it('validates opaque payload, suppresses foreground and has no cache interception', async () => {
    const w = worker(Response.json({ title: 'Situație nouă', body: 'Colegii au propus ceva după ore.', target: 'https://evil.test', tag: 'event:x' })); let pending: Promise<void> = Promise.resolve();
    w.handlers.push({ data: { json: () => ({ notificationId: '00000000-0000-4000-8000-000000000001' }) }, waitUntil: (p: Promise<void>) => { pending = p; } }); await pending;
    expect(w.show).toHaveBeenCalledWith('Situație nouă', expect.objectContaining({ data: expect.objectContaining({ target: '/simulator' }) })); expect(w.handlers.fetch).toBeUndefined();
  });
  it('focuses/navigates existing same-origin tab, otherwise opens safe simulator', async () => {
    const navigate = vi.fn(), focus = vi.fn(), w = worker(new Response(null, { status: 401 }), [{ url: 'https://finly.test/', navigate, focus }]); let pending: Promise<void> = Promise.resolve();
    w.handlers.notificationclick({ notification: { close: vi.fn(), data: { id: 'old' } }, waitUntil: (p: Promise<void>) => { pending = p; } }); await pending;
    expect(navigate).toHaveBeenCalledWith('https://finly.test/simulator'); expect(focus).toHaveBeenCalledOnce(); expect(w.open).not.toHaveBeenCalled();
  });
  it('offline validation rejects content; visible simulator suppresses redundant OS push', async () => {
    const offline = worker(new Response(null)); offline.fetchMock.mockRejectedValue(new Error('offline')); let pending: Promise<void> = Promise.resolve();
    const push = { data: { json: () => ({ notificationId: '00000000-0000-4000-8000-000000000001' }) }, waitUntil: (p: Promise<void>) => { pending = p; } };
    offline.handlers.push(push); await pending; expect(offline.show).not.toHaveBeenCalled();
    const postMessage=vi.fn(), visible=worker(Response.json({title:'Situație nouă',body:'Colegii au propus ceva după ore.'}),[{url:'https://finly.test/simulator',visibilityState:'visible',postMessage}]);
    visible.handlers.push(push);await pending;expect(visible.show).not.toHaveBeenCalled();expect(postMessage).toHaveBeenCalledWith({type:'finly-notifications-refresh'});
  });
  it('opens new same-origin window if no Finly window exists', async () => {
    const w = worker(new Response(null, {status:401}));let pending:Promise<void>=Promise.resolve();
    w.handlers.notificationclick({notification:{close:vi.fn(),data:{id:'old'}},waitUntil:(p:Promise<void>)=>{pending=p;}});await pending;expect(w.open).toHaveBeenCalledWith('https://finly.test/simulator');
  });
});
