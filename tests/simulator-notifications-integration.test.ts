import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { notificationDbFixture } from './notification-db-fixture';
vi.mock('server-only', () => ({}));
const mock = vi.hoisted(() => ({ rpc: vi.fn(), notification: null as unknown, send: vi.fn() }));
vi.mock('../src/lib/simulator/server/database', () => ({ simulatorDatabase: () => ({ rpc: mock.rpc }) }));
vi.mock('../src/lib/simulator/notifications/database', async original => ({ ...await original<typeof import('../src/lib/simulator/notifications/database')>(), notificationDatabase: () => mock.notification }));
vi.mock('web-push', () => ({ default: { sendNotification: mock.send } }));
// Storage/delivery scenarios use explicit notification fixtures. Canonical event
// generation stays real; editorial policy is tested independently in domain tests.
vi.mock('../src/content/simulator/notification-config', () => ({ eventNotificationPolicies: {}, developmentEventNotificationPolicies: {} }));
import { loadRun, simulatorState } from '../src/lib/simulator/server/service';
import { activateEvents, chooseEvent, syncSimulatorThrough } from '../src/lib/simulator/server/events';
import { mutateSubscription } from '../src/lib/simulator/server/subscriptions';
import { ensureNotification, observeNotifications, observeUserSafely, notificationCandidates, type Loaded } from '../src/lib/simulator/notifications/observe';
import { markRead, inbox, display, register, preferences, savePreferences, subscriptionInput } from '../src/lib/simulator/notifications/service';
import { defaultPreferences } from '../src/lib/simulator/notifications/model';
import { metrics, processNotificationUser } from '../src/lib/simulator/notifications/worker';
import { fixtureRun, day } from './simulator-fixtures';
import { addDays, dayKey } from '../src/lib/simulator/calendar';
import { settle } from '../src/lib/simulator/settle';
import { localInstant } from '../src/lib/simulator/events/time';
import { synchronizeEvents } from '../src/lib/simulator/events/synchronize';
import { eventCatalog } from '../src/content/simulator/events/registry.server';
import { eventPolicyV2 } from '../src/content/simulator/events/policy-v2';
import type { SimulatorClock } from '../src/lib/simulator/clock';
let db: PGlite;
const signatures: Record<string, string[]> = { upgrade_simulator_decisions:['p_user','p_run','p_expected','p_day','p_now','p_development','p_policy'],
 read_simulator_state: ['p_user'], start_simulator_run: ['p_user','p_run','p_entries'], apply_simulator_settlement: ['p_user','p_run','p_expected','p_through','p_entries','p_subscriptions','p_revision'],
 activate_simulator_events: ['p_user','p_run','p_expected','p_engine'], commit_simulator_events: ['p_user','p_run','p_expected','p_settled','p_through','p_engine','p_days','p_instances','p_entries','p_now','p_development','p_operations','p_subscriptions'],
 finalize_simulator_month: ['p_user','p_run','p_expected','p_day','p_snapshot'], acknowledge_simulator_month: ['p_user','p_run','p_review','p_operation'],
 mutate_simulator_subscription: ['p_user','p_run','p_expected','p_day','p_now','p_development','p_action','p_operation','p_subscription','p_entries'], upgrade_simulator_life: ['p_user','p_run','p_expected','p_day','p_now','p_development','p_policy'],
};
const clock = (date = '2026-10-10', minute = 1200): SimulatorClock => ({ realDay: day(date), effectiveDay: day(date), offsetDays: 0, effectiveNow: localInstant(day(date), minute).toISOString() });
async function initialize() {
 const value = new PGlite();
 await value.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema public,auth to anon,authenticated,service_role;");
 for (const m of ['0003_simulator_foundation.sql','0004_simulator_events.sql','0005_simulator_consequences.sql','0006_simulator_subscriptions.sql','0007_simulator_life_catalog.sql','0008_simulator_monthly_reviews.sql','0009_simulator_notifications.sql','0010_simulator_decision_policy.sql']) await value.exec(readFileSync(`supabase/migrations/${m}`, 'utf8'));
 return value;
}
async function user(start = '2026-10-10', seed?: { id: string; run: string }) {
 const id = seed?.id ?? crypto.randomUUID(), run = { ...fixtureRun(start), id: seed?.run ?? crypto.randomUUID(), userId: id };
 await db.query('insert into auth.users values($1)', [id]); await db.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb)', [id, JSON.stringify(run), JSON.stringify(settle(run, [], run.startedOn).newEntries.map(e => ({ ...e, runId: run.id, userId: id })))]);
 await activateEvents(id, 'liceu', clock(start, 0), 2); return id;
}
async function through(id: string, date: string, background = false) {
 for (let n = 0; n < 50; n++) { if (background) await processNotificationUser(id, clock(date), metrics()); else await simulatorState(id, clock(date)); const loaded = (await loadRun(id))!; if (loaded.run.lastSettledOn === date && loaded.engine?.processedAt === clock(date).effectiveNow) return loaded; }
 throw Error('Incomplete catch-up');
}
const endpoint = (name: string) => ({ endpoint: `https://fcm.googleapis.com/fcm/send/${name}`, keys: { p256dh: 'A'.repeat(87), auth: 'B'.repeat(22) } });
async function testNotification(id: string, suffix = 'one') {
 const loaded = (await loadRun(id))!;
 return ensureNotification({ user_id: id, run_id: loaded.run.id, type: 'event_available', semantic_key: `test:${suffix}`, priority: 'normal', title: 'Notificare de test', body: 'Notificările din Finly funcționează.', target_kind: 'simulator', target_id: null, available_at: clock().effectiveNow!, expires_at: null, push_candidate: true });
}
describe('Chapter 8 actual PostgreSQL storage, worker, privacy and equivalence', () => {
 beforeAll(async () => {
  db = await initialize(); mock.notification = notificationDbFixture(() => db);
  mock.rpc.mockImplementation(async (name: string, args: Record<string, unknown>) => {
   // This historical fixture installs migrations through 0010: mirror PostgREST's missing-RPC response.
   if(name==='upgrade_simulator_daily_floor')return {data:null,error:{code:'PGRST202',message:'Daily floor migration not installed in historical fixture'}};

   const keys = signatures[name]; if (!keys) throw Error(`Unknown RPC ${name}`);
   const params = keys.map(k => args[k] === undefined ? (k === 'p_subscriptions' || k === 'p_operations' ? '[]' : null) : args[k] !== null && typeof args[k] === 'object' ? JSON.stringify(args[k]) : args[k]);
   try { const r = await db.query<{ result: unknown }>(`select public.${name}(${keys.map((_, i) => `$${i + 1}`).join(',')}) as result`, params); return { data: r.rows[0]?.result ?? null, error: null }; } catch (error) { return { data: null, error }; }
  });
 }, 30000);
 afterAll(async () => { await db.close(); });
 beforeEach(() => { vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY', 'public'); vi.stubEnv('WEB_PUSH_VAPID_PRIVATE_KEY', 'private'); vi.stubEnv('WEB_PUSH_VAPID_SUBJECT', 'https://finly.test'); mock.send.mockReset().mockResolvedValue({ statusCode: 201 }); });
 afterEach(() => vi.unstubAllEnvs());
 async function activeSituation() {
  const id = await user();
  for (let offset=0;offset<14;offset++) {
   const date=addDays(day('2026-10-10'),offset), base=clock(date,0);
   const planned=await syncSimulatorThrough(id,base);
   const event=planned?.instances.find(e=>e.day===date && e.status==='pending');
   if(!event)continue;
   const at=new Date(event.scheduledAt), current={...base,effectiveDay:dayKey(at),effectiveNow:at.toISOString()};
   const loaded=(await syncSimulatorThrough(id,current))!;await observeNotifications(loaded,at);
   return {id,event:loaded.instances.find(e=>e.id===event.id)!,current,at};
  }
  throw Error('No actionable event in real fixture');
 }
 it('an obsolete notification with a removed event falls back safely without deleting history',async()=>{
  const {id,event,at}=await activeSituation();
  const n=(await inbox(id,at)).items.find(n=>n.eventId===event.id)!;
  await db.query('update sim_notifications set target_id=$1,obsolete_at=$2 where id=$3',[crypto.randomUUID(),at.toISOString(),n.id]);
  expect((await markRead(id,n.id,at,n.availableAt)).target).toBe('/simulator');
  expect((await db.query('select id from sim_notifications where id=$1',[n.id])).rows).toHaveLength(1);
 });
 it('read active → automatic outcome → reconciliation → fresh inbox remains permanently read',async()=>{
  const {id,event,current,at}=await activeSituation();
  const n=(await inbox(id,at)).items.find(n=>n.eventId===event.id)!;expect(n.status).toBe('active');expect(n.readAt).toBeNull();
  const marked=await markRead(id,n.id,at,n.availableAt), readAt=marked.items.find(i=>i.id===n.id)!.readAt;expect(readAt).toBeTruthy();
  const expired=new Date(Date.parse(event.expiresAt)+1000), later={...current,effectiveDay:dayKey(expired),effectiveNow:expired.toISOString()};
  const loaded=(await syncSimulatorThrough(id,later))!;
  await Promise.all([observeNotifications(loaded,expired),observeNotifications(loaded,expired)]);
  const refreshed=await inbox(id,expired),result=refreshed.items.find(i=>i.id===n.id)!;expect(result.status).toBe('missed');expect(result.readAt).toBe(readAt);expect(result.body).toContain('SimLife a ales:');expect(result.amount).not.toBeNull();expect(result.expiresAt).toBeNull();
  expect(refreshed.unread).toBe(marked.unread);
  await markRead(id,n.id,expired,n.availableAt);expect((await inbox(id,expired)).items.find(i=>i.id===n.id)!.readAt).toBe(readAt);
  expect((await markRead(id,n.id,expired,result.availableAt)).target).toBe(`/simulator/eveniment/${event.id}`);
  await observeNotifications(loaded,expired);expect((await inbox(id,expired)).items.find(i=>i.id===n.id)!.readAt).toBeTruthy();
  await observeNotifications({...loaded,instances:loaded.instances.map(e=>e.id===event.id?event:e)},at); // stale device snapshot cannot regress a result
  expect((await inbox(id,expired)).items.find(i=>i.id===n.id)!.status).toBe('missed');
  expect((await db.query('select id from sim_notifications where user_id=$1 and target_id=$2 and obsolete_at is null',[id,event.id])).rows).toHaveLength(1);
  mock.notification=notificationDbFixture(()=>db); // Fresh transport/client, no React or client cache.
  expect((await inbox(id,new Date(expired.getTime()+86400000))).items.find(i=>i.id===n.id)!.readAt).toBe(readAt);
 },20000);
 it('mark-all persists three rows across a fresh client and next day; only a new fourth row is unread',async()=>{
  const id=await user(),at=new Date(clock().effectiveNow!);
  const original=await Promise.all(['first','second','third'].map(s=>testNotification(id,s)));
  expect((await inbox(id,at)).unread).toBe(3);
  const response=await markRead(id,undefined,at);
  expect(response.unread).toBe(0);expect(response.items).toHaveLength(3);
  const timestamps=new Map(response.items.map(n=>[n.id,n.readAt]));
  expect([...timestamps.values()].every(Boolean)).toBe(true);
  mock.notification=notificationDbFixture(()=>db);
  const tomorrow=new Date(at.getTime()+86400000);
  expect((await inbox(id,tomorrow)).unread).toBe(0);
  await testNotification(id,'fourth');
  const fresh=await inbox(id,tomorrow);expect(fresh.unread).toBe(1);
  for(const n of original)expect(fresh.items.find(i=>i.id===n!.id)!.readAt).toBe(timestamps.get(n!.id));
  const persisted=(await db.query<{read_at:Date|null}>('select read_at from sim_notifications where user_id=$1 and semantic_key<>$2',[id,'test:fourth'])).rows;
  expect(persisted).toHaveLength(3);expect(persisted.every(n=>n.read_at!==null)).toBe(true);
 },20000);
 it('a concurrent mark-read after observer snapshot survives automatic reconciliation',async()=>{
  const {id,event,current}=await activeSituation();
  const expired=new Date(Date.parse(event.expiresAt)+1000);
  const loaded=(await syncSimulatorThrough(id,{...current,effectiveDay:dayKey(expired),effectiveNow:expired.toISOString()}))!;
  const before=await inbox(id,expired),row=before.items.find(n=>n.eventId===event.id)!;
  expect(row.readAt).toBeNull();
  const database=notificationDbFixture(()=>db),readAt='2026-10-19T10:00:00.000Z';
  let concurrent:ReturnType<typeof db.query>|undefined;
  mock.notification={...database,from:(table:string)=>{
   const query=database.from(table),update=query.update.bind(query);
   query.update=values=>{
    if(table==='sim_notifications' && values.body && !concurrent){
     concurrent=db.query('update sim_notifications set read_at=$1 where id=$2',[readAt,row.id]);
    }
    return update(values);
   };
   return query;
  }};
  try{await observeNotifications(loaded,expired);await concurrent;}
  finally{mock.notification=database;}
  const fresh=await inbox(id,expired);
  expect(fresh.items.find(n=>n.id===row.id)).toMatchObject({status:'missed',readAt});
  expect(fresh.unread).toBe(before.unread-1);
 },20000);
 it('previously unread automatic results remain unread without duplicate threads',async()=>{
  const {id,event,current}=await activeSituation(),expired=new Date(Date.parse(event.expiresAt)+1000);
  const loaded=(await syncSimulatorThrough(id,{...current,effectiveDay:dayKey(expired),effectiveNow:expired.toISOString()}))!;
  const before=await inbox(id,expired),row=before.items.find(n=>n.eventId===event.id)!;
  await observeNotifications(loaded,expired);await observeNotifications(loaded,expired);
  const fresh=await inbox(id,expired);expect(fresh.items.find(n=>n.id===row.id)).toMatchObject({status:'missed',readAt:null});
  expect(fresh.unread).toBe(before.unread);expect(fresh.items.filter(n=>n.eventId===event.id)).toHaveLength(1);
 },20000);
 it('manual resolution from SimLife is read and remains a single historical item',async()=>{
  const {id,event,current,at}=await activeSituation();
  const detail=await import('../src/lib/simulator/server/events');const view=await detail.eventDetail(id,event.id,current);
  const option=view.event.options.find(o=>!o.unavailableReason)!;expect(option).toBeTruthy();
  await chooseEvent(id,event.id,option.id,current);await observeNotifications(await loadRun(id),at);
  const n=(await inbox(id,at)).items.find(n=>n.eventId===event.id)!;expect(n.status).toBe('resolved');expect(n.body).toBe(`Ai ales: ${option.label}`);expect(n.readAt).toBeTruthy();expect(n.amount).toBe(option.costBani);
  expect((await markRead(id,n.id,at)).target).toBe(`/simulator/eveniment/${event.id}`);
  const saved=(await loadRun(id))!;
  await observeNotifications({...saved,instances:saved.instances.map(e=>e.id===event.id?event:e)},at);
  expect((await db.query<{body:string;expires_at:Date|null}>('select body,expires_at from sim_notifications where id=$1',[n.id])).rows[0]).toEqual({body:`Ai ales: ${option.label}`,expires_at:null});
 },20000);
 it('absence backfills actual missed events once and cancelled/future items stay hidden',async()=>{
  const id=await user('2026-10-10',{id:crypto.randomUUID(),run:'00000000-0000-4000-8000-000000000051'}), loaded=await through(id,'2026-10-27'),at=new Date(clock('2026-10-27').effectiveNow!);
  const truth=structuredClone(loaded);
  await Promise.all([observeNotifications(loaded,at),observeNotifications(loaded,at)]);
  const expected=loaded.instances.filter(e=>e.status!=='cancelled'&&e.scheduledAt<=at.toISOString()&&(e.status==='resolved'||e.expiresAt>at.toISOString()));
  expect(expected.length).toBeGreaterThan(3);
  const rows=(await db.query<{target_id:string}>('select * from sim_notifications where user_id=$1 and target_kind=\'event\' and obsolete_at is null',[id])).rows;
  expect(rows).toHaveLength(expected.length);expect(new Set(rows.map(r=>r.target_id)).size).toBe(expected.length);expect(loaded).toEqual(truth);
  await markRead(id,undefined,at);expect((await inbox(id,at)).unread).toBe(0);await observeNotifications(loaded,at);expect((await inbox(id,at)).unread).toBe(0);
  const event=expected[0];await observeNotifications({...loaded,instances:loaded.instances.map(e=>e.id===event.id?{...e,status:'cancelled' as const}:e)},at);
  expect((await inbox(id,at)).items.some(n=>n.eventId===event.id)).toBe(false);
 },20000);
 it('notification storage failure preserves a committed choice and later reconciliation repairs the inbox',async()=>{
  const {id,event,current,at}=await activeSituation();
  const detail=await import('../src/lib/simulator/server/events'),view=await detail.eventDetail(id,event.id,current),option=view.event.options.find(o=>o.costBani===0&&!o.unavailableReason)!;
  const database=mock.notification;mock.notification={from:()=>{throw Error('Notification storage offline');}};
  try {const result=await chooseEvent(id,event.id,option.id,current);expect(result.event.status).toBe('resolved');await expect(observeUserSafely(id,current)).resolves.toBeUndefined();}
  finally {mock.notification=database;}
  const canonical=(await loadRun(id))!;expect(canonical.instances.find(e=>e.id===event.id)!.selectedOptionId).toBe(option.id);
  await observeNotifications(canonical,at);expect((await inbox(id,at)).items.find(n=>n.eventId===event.id)).toMatchObject({status:'resolved',readAt:expect.any(String),body:`Ai ales: ${option.label}`});
 },20000);
 it('same event app/cron/retry yields one logical record; two devices have two deliveries', async () => {
  const id = await user(); await register(id, endpoint('multi-a')); await register(id, endpoint('multi-b')); await savePreferences(id, { ...defaultPreferences, push_enabled: true, quiet_hours_enabled: false });
  const [a, b] = await Promise.all([testNotification(id), testNotification(id)]); expect(a!.id).toBe(b!.id);
  await processNotificationUser(id, clock(), metrics()); await processNotificationUser(id, clock(), metrics());
  expect((await db.query('select * from sim_notifications where semantic_key=$1 and user_id=$2', ['test:one', id])).rows).toHaveLength(1);
  expect((await db.query('select * from sim_notification_deliveries where notification_id=$1', [a!.id])).rows).toHaveLength(2);
  expect(mock.send.mock.calls.filter(c => JSON.parse(c[1]).notificationId === a!.id)).toHaveLength(2);
  expect(JSON.parse(mock.send.mock.calls[0][1])).toEqual({ notificationId: expect.any(String) });
 });
 it('read is cross-device idempotent, owned, and never alters ledger/review acknowledgment', async () => {
  const id = await user(), other = await user(), n = await testNotification(id); const before = (await loadRun(id))!;
  await expect(markRead(other, n!.id)).rejects.toThrow(); await markRead(id, n!.id); await markRead(id, n!.id);
  expect((await inbox(id, new Date(clock().effectiveNow!))).items.find(i => i.id === n!.id)?.readAt).toBeTruthy(); expect((await loadRun(id))!.ledger).toEqual(before.ledger);
  const closed = await through(id, '2026-11-01'); await observeNotifications(closed, new Date(clock('2026-11-01').effectiveNow!));
  const monthly = (await inbox(id, new Date(clock('2026-11-01').effectiveNow!))).items.find(i => i.title === 'Luna s-a încheiat')!;
  await markRead(id, monthly.id); expect((await loadRun(id))!.monthlyReviews[0].reviewedAt).toBeNull();
 });
 it('shared browser re-association cannot display A content as B', async () => {
  const a = await user(), b = await user(), device = endpoint('shared'); await register(a, device); const n = await testNotification(a);
  expect(await display(a, n!.id, new Date(clock().effectiveNow!))).toBeTruthy(); await register(b, device);
  expect(await display(b, n!.id, new Date(clock().effectiveNow!))).toBeNull();
  expect((await db.query<{ user_id: string }>('select user_id from sim_push_subscriptions where endpoint=$1', [device.endpoint])).rows).toEqual([{ user_id: b }]);
 });
 it('RLS own read only; endpoints, preferences, delivery rows and worker RPC are private', async () => {
  const a = await user(), b = await user(); await testNotification(a); await testNotification(b);
  await db.exec(`set role authenticated;set request.jwt.claim.sub='${a}';`);
  try { expect((await db.query('select user_id from sim_notifications')).rows).toEqual([{ user_id: a }]); for (const table of ['sim_push_subscriptions','sim_notification_deliveries','sim_notification_preferences']) await expect(db.exec(`select * from ${table}`)).rejects.toThrow('permission denied'); await expect(db.exec('update sim_notifications set title=\'evil\'')).rejects.toThrow('permission denied'); await expect(db.exec('select claim_notification_users(gen_random_uuid(),50)')).rejects.toThrow('permission denied'); }
  finally { await db.exec('reset role'); }
 });
 it('registration rejects non-provider endpoints, forged keys and arbitrary user identity', () => {
  expect(subscriptionInput.safeParse(endpoint('valid')).success).toBe(true);
  expect(subscriptionInput.safeParse({ ...endpoint('valid'), expirationTime: null }).success).toBe(true);
  for (const url of ['http://127.0.0.1/', 'https://evil.test/', 'https://fcm.googleapis.com.evil.test/', 'https://fcm.googleapis.com:8443/']) expect(subscriptionInput.safeParse({ ...endpoint('x'), endpoint: url }).success).toBe(false);
  expect(subscriptionInput.safeParse({ ...endpoint('x'), user_id: crypto.randomUUID() }).success).toBe(false);
  expect(subscriptionInput.safeParse({ ...endpoint('x'), keys: { p256dh: 'bad', auth: 'bad' } }).success).toBe(false);
 });
 it('quiet hours delays relevant push; rate limit affects delivery only; stale/disabled/category-off skipped', async () => {
  const id = await user(); await register(id, endpoint('quiet')); const n = await testNotification(id); await processNotificationUser(id, clock('2026-10-10', 1380), metrics());
  const delivery = (await db.query<{ deliver_after: string }>('select deliver_after from sim_notification_deliveries where notification_id=$1', [n!.id])).rows[0]; expect(new Date(delivery.deliver_after).toISOString()).toBe(localInstant(day('2026-10-11'), 480).toISOString()); expect(mock.send).not.toHaveBeenCalled();
  await savePreferences(id, { ...defaultPreferences, push_enabled: false }); await processNotificationUser(id, clock('2026-10-11', 600), metrics()); expect(mock.send).not.toHaveBeenCalled(); expect((await inbox(id, new Date(clock('2026-10-11').effectiveNow!))).items).not.toHaveLength(0);
 });
 it('expired provider endpoint is disabled; 5xx retry is bounded; missing VAPID leaves inbox intact', async () => {
  const id = await user(); await register(id, endpoint('gone')); await savePreferences(id, { ...defaultPreferences, push_enabled: true, quiet_hours_enabled: false }); await testNotification(id);
  mock.send.mockRejectedValueOnce({ statusCode: 410 }); const m = metrics(); await processNotificationUser(id, clock(), m); expect(m.staleSubscriptionsDisabled).toBe(1);
  expect((await db.query('select disabled_at from sim_push_subscriptions where user_id=$1', [id])).rows[0]).toMatchObject({ disabled_at: expect.any(Date) });
  await register(id, endpoint('retry')); const retryNotification = await testNotification(id, 'retry'); mock.send.mockRejectedValue({ statusCode: 503 });
  for (const minute of [1200,1210,1230,1270]) await processNotificationUser(id, clock('2026-10-10',minute), metrics());
  expect((await db.query('select attempt_count,status from sim_notification_deliveries where notification_id=$1', [retryNotification!.id])).rows).toEqual([{attempt_count:3,status:'failed'}]);
  vi.stubEnv('WEB_PUSH_VAPID_PRIVATE_KEY', ''); expect((await inbox(id, new Date(clock().effectiveNow!))).items.length).toBeGreaterThan(0);
 });
 it('deterministic tomorrow payment creates one reminder and no future ledger; past reminder disappears', async () => {
  const id = await user(); await through(id, '2026-10-10'); await mutateSubscription(id, clock(), 'create', { name: 'Sală', amount: '300', intervalMonths: 1, nextDueOn: '2026-10-11', operationId: crypto.randomUUID() });
  const loaded = (await loadRun(id))!, ledger = structuredClone(loaded.ledger); await observeNotifications(loaded, new Date(clock().effectiveNow!)); await observeNotifications(loaded, new Date(clock().effectiveNow!));
  const reminders = (await db.query('select * from sim_notifications where user_id=$1 and type=\'payment_due_tomorrow\'', [id])).rows; expect(reminders).toHaveLength(1); expect((await loadRun(id))!.ledger).toEqual(ledger);
  const later = await through(id,'2026-10-12'); expect(notificationCandidates(later,new Date(clock('2026-10-12').effectiveNow!)).filter(n=>n.type==='payment_due_tomorrow')).toEqual([]);
 });
 it('overlapping workers lease one user; no duplicate ledger or notification', async () => {
  const id = await user(); await register(id, endpoint('overlap')); await testNotification(id); await savePreferences(id, { ...defaultPreferences, push_enabled: true, quiet_hours_enabled: false });
  const a = metrics(), b = metrics(); await Promise.all([processNotificationUser(id, clock(), a), processNotificationUser(id, clock(), b)]); expect(a.runsProcessed + b.runsProcessed).toBe(1);
  const rows = (await db.query('select notification_id,push_subscription_id,count(*) from sim_notification_deliveries group by notification_id,push_subscription_id having count(*)>1')).rows; expect(rows).toEqual([]);
 });
 it('several eligible notifications respect gap, 3/day budget and category preferences without changing events', async () => {
  const id = await user(); await register(id, endpoint('budget')); await savePreferences(id, { ...defaultPreferences, push_enabled: true, quiet_hours_enabled: false });
  await through(id,'2026-10-10'); const canonicalBefore=(await loadRun(id))!;
  for(const key of ['a','b','c','d','e'])await testNotification(id,'budget-'+key);
  await processNotificationUser(id,clock(),metrics()); expect(mock.send).toHaveBeenCalledTimes(1);
  await processNotificationUser(id,clock('2026-10-10',1291),metrics()); await processNotificationUser(id,clock('2026-10-10',1382),metrics()); await processNotificationUser(id,clock('2026-10-10',1439),metrics());
  const expected=synchronizeEvents({...canonicalBefore,engine:canonicalBefore.engine!},new Date(clock('2026-10-10',1439).effectiveNow!),eventCatalog(canonicalBefore.engine!.catalogVersion));
  expect(mock.send).toHaveBeenCalledTimes(3); const canonicalAfter=(await loadRun(id))!; expect(canonicalAfter.ledger).toEqual(expected.ledger); expect(canonicalAfter.instances.map(e=>e.id)).toEqual(canonicalBefore.instances.map(e=>e.id));
  const off=await user();await register(off,endpoint('category'));await savePreferences(off,{...defaultPreferences,push_enabled:true,quiet_hours_enabled:false,events_push_enabled:false});await testNotification(off,'category');mock.send.mockClear();await processNotificationUser(off,clock(),metrics());expect(mock.send).not.toHaveBeenCalled();expect((await inbox(off,new Date(clock().effectiveNow!))).items.length).toBeGreaterThan(0);
 });
 it('multiple missed monthly reviews retain every inbox record but enqueue one review push', async () => {
  const id=await user('2026-09-25');const loaded=await through(id,'2026-12-01');await register(id,endpoint('months'));await savePreferences(id,{...defaultPreferences,push_enabled:true,quiet_hours_enabled:false});
  await processNotificationUser(id,clock('2026-12-01'),metrics());const records=(await db.query<{id:string}>('select id from sim_notifications where user_id=$1 and type=\'monthly_review_ready\'',[id])).rows;expect(records).toHaveLength(3);
  const ids=new Set(records.map(r=>r.id));expect(mock.send.mock.calls.filter(c=>ids.has(JSON.parse(c[1]).notificationId))).toHaveLength(1);expect((await loadRun(id))!.monthlyReviews).toEqual(loaded.monthlyReviews);
 },20000);
 it('actual worker periodic processing and lazy catch-up have equivalent canonical reality for same seed/run', async () => {
  const original = db, seed = { id: crypto.randomUUID(), run: crypto.randomUUID() };
  // Same persisted initial identities and clock in both environments.
  vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime(new Date());
  const stableSubscription = async (id: string) => {
    const uuid = vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValueOnce('00000000-0000-4000-8000-000000000124');
    try { await mutateSubscription(id,clock('2026-10-25'),'create',{name:'Sală',amount:'300',intervalMonths:1,nextDueOn:'2026-10-28',operationId:'00000000-0000-4000-8000-000000000123'}); } finally { uuid.mockRestore(); }
  };
  // createdAt is the DB materialization timestamp (periodic vs later catch-up),
  // not simulator time. Compare every event outcome/time/snapshot field; retain
  // scheduledAt, expiresAt, resolvedAt and resolutionEffectiveAt in full.
  const canonical = (loaded: Loaded) => ({ ledger: loaded.ledger, events: loaded.instances.map(({ createdAt, ...event })=>{expect(Date.parse(createdAt)).toBeLessThanOrEqual(Date.parse(clock('2026-11-02').effectiveNow!));return event;}).sort((a,b)=>a.id.localeCompare(b.id)), effects: loaded.effects, flags: loaded.flags, operations: loaded.consequenceState.operations, subscriptions: loaded.subscriptions, reviews: loaded.monthlyReviews.map(r=>r.snapshot) });
  try {
   db = await initialize(); const id = await user('2026-10-25',seed); await preferences(id); await stableSubscription(id);
   for (const date of ['2026-10-25','2026-10-26','2026-10-27','2026-10-28','2026-10-29','2026-10-30','2026-10-31','2026-11-01','2026-11-02']) await through(id,date,true);
   const background = canonical((await loadRun(id))!); await db.close();
   db = await initialize(); await user('2026-10-25',seed); await stableSubscription(id);
   const lazy = canonical(await through(id,'2026-11-02'));
   expect(lazy).toEqual(background); expect(lazy.reviews).toHaveLength(1); expect(lazy.ledger.some(e=>e.kind==='abonament')).toBe(true);
  } finally { await db.close(); db = original; vi.useRealTimers(); }
 },60000);
 it('legacy policy release produces the same history when first processed by worker or by a late app open',async()=>{
  const original=db,seed={id:'00000000-0000-4000-8000-000000000125',run:'00000000-0000-4000-8000-000000000126'};
  vi.useFakeTimers({toFake:['Date']});vi.setSystemTime(new Date());
  const legacyPolicy=eventPolicyV2;if(legacyPolicy.version!==2)throw new Error('Expected legacy policy 2');
  const setup=async()=>{db=await initialize();await user('2026-10-25',seed);await db.query("update sim_runs set event_policy_version=2,event_policy_snapshot=$1::jsonb,decision_policy_available_on='2026-10-27' where user_id=$2",[JSON.stringify({...legacyPolicy,opportunityChances:Object.fromEntries(Object.keys(legacyPolicy.opportunityChances).map(k=>[k,1]))}),seed.id]);};
  const truth=(s:Loaded)=>({engine:s.engine,ledger:s.ledger,events:s.instances.map(e=>({...e,createdAt:undefined})),state:s.consequenceState,subscriptions:s.subscriptions,reviews:s.monthlyReviews.map(r=>r.snapshot)});
  try{
   await setup();for(const date of ['2026-10-25','2026-10-26','2026-10-27','2026-10-28','2026-10-29','2026-10-30','2026-10-31','2026-11-01','2026-11-02'])await through(seed.id,date,true);
   const periodic=truth((await loadRun(seed.id))!);await db.close();await setup();const lazy=truth(await through(seed.id,'2026-11-02'));
   expect(lazy).toEqual(periodic);expect(lazy.engine!.policyVersion).toBe(3);expect(lazy.events.some(e=>e.generationKey.startsWith('v2:p3:'))).toBe(true);
   expect(lazy.events.filter(e=>e.generationKey.startsWith('v2:p3:')).every(e=>Date.parse(e.expiresAt)-Date.parse(e.scheduledAt)===1800000)).toBe(true);
   expect(lazy.events.filter(e=>e.day<'2026-10-27').every(e=>e.generationKey.startsWith('v2:p2:'))).toBe(true);
  }finally{await db.close();db=original;vi.useRealTimers();}
 },60000);
});
