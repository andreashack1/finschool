# FINLY SIMULATOR — CHAPTER 8

Implementation report and deployment/QA instructions. No production deployment,
remote migration, reset or simulator-history deletion was performed.

## 1. CHAPTER 8 AUDIT

Next.js 16.3.8 / React 19 / Supabase SSR. Chapters 1–7 were already present in a
dirty working tree and were preserved. Canonical entry point is `simulatorState`
and its existing `syncSimulatorThrough` / atomic revision-based commits. Existing
lifecycle uses `SimulatorSync`, visibility and `nextRefreshAt`. No existing
scheduler or `vercel.json` was found. Last migration was **0008 monthly reviews**,
so this migration is **0009**, not 0008. Existing app icon `app/icon.svg` is reused;
192/512/180 PNGs are exact rasterizations, not a new logo.

## 2. ARCHITECTURE

Canonical persisted simulator truth → idempotent notification records → separate
delivery outbox. `observe.ts` is a read-only projection. It does not plan events,
call RNG, settle money or implement recurrence/review logic. Dashboard observation
failure is caught after settlement; provider delivery occurs downstream. Inbox
fetch does not launch a second simulator synchronization.

## 3. IN-APP INBOX

Compact utility bell in home/profile, learning and simulator shells. Native modal
dialog provides focus containment, Escape, restored bell focus and a mobile sheet.
Latest 50 active records, latest first. Separate indexed server unread count, capped
visually at 9+. Idempotent owned read / mark-all. No localStorage authority.

## 4. PUSH PERMISSION FLOW

Profile → Notificări explains utility. Only activation click/gesture calls
`Notification.requestPermission`. Default/granted/denied/unsupported and missing
configuration have calm states. Denied never prompts again. Capabilities require
secure context, Service Worker, PushManager and Notification. Global push and
category preferences never disable the in-app inbox. Activation can register this
installation even when another device already enabled global push.

## 5. SERVICE WORKER

`public/finly-push-sw.js`: push and notificationclick only. No fetch event handler,
offline queue or authenticated cache. Registered only during explicit activation,
with `updateViaCache: none`. Manifest and app/apple touch icons are provided.

## 6. PUSH PRIVACY MODEL

Encrypted Web Push payload contains only `{ notificationId }`. The worker fetches
same-origin `/api/notifications/push/display` with credentials and no-store. Server
verifies current authenticated owner, preferences and target relevance. Failed
authentication, old account, offline or stale target suppresses display. No balance
or financial summary totals on lock screen. Click revalidates, marks read, focuses
and navigates an existing same-origin window or opens one. A safe simulator fallback
handles old targets or expired sessions. Logout closes displayed Finly notifications,
deactivates this endpoint and best-effort unsubscribes before clearing the session.

## 7. MULTI-DEVICE MODEL

Globally unique endpoint identifies an installation; explicit authenticated
registration can re-associate it to a different account. One semantic inbox record
can have one unique outbox record per device. Every send rechecks both notification
and endpoint ownership. Read state comes from server on the next fetch.

## 8. NOTIFICATION TYPES

`event_available`, `event_expiring_soon`, `payment_due_tomorrow`,
`monthly_review_ready`. Targets are event/calendar_day/monthly_review/simulator.
No arbitrary paths are stored or accepted as redirect authority.

## 9. EVENT PUSH POLICY

Default: active visible pending events enter inbox, push off. Explicit editorial
allowlist: `school_study_cafe`, `school_project_cardboard`,
`unexpected_bag_followup`, `social_group_bowling`. Expiry reminders configured for
the study/bowling situations. Existing `dev_phone_problem` is push-worthy only in
development for QA. No rarity-based eligibility, event caps or RNG changes.
Future scheduled, resolved/cancelled and expired events are excluded. Historical
catch-up never creates expired-opportunity notifications.

## 10. PAYMENT REMINDERS

The existing Chapter 5 `buildFinancialCalendar` determines actual outgoing payments
tomorrow, after 19:00 Bucharest today. Added optional source identity to its view so
same-named subscriptions cannot collide. Reminder identity uses source ID and due
day. No future ledger insertion. Reminder expires at tomorrow's midnight; changed,
cancelled or settled schedule is rechecked and skipped. Same-day creation has no
redundant reminder. Calendar target reuses the existing calendar dialog/day selection.

## 11. MONTHLY REVIEW INTEGRATION

One notification per finalized unacknowledged review. All missed reviews remain in
inbox, but only the oldest is a push candidate. At most one logical high-priority
push/day. Tap opens `/simulator`; Chapter 7 gate remains mandatory. Reading is never
acknowledgment. Dashboard reconciliation obsoletes acknowledged review records.

## 12. QUIET HOURS

Default 22:00–08:00 Europe/Bucharest, stored in preferences. Current simple UI toggles
this fixed window. Civil time conversion uses existing timezone/DayKey helpers;
both DST boundaries are tested. Delay only delivery; suppress when expiry precedes
08:00. Inbox and simulator proceed immediately. Display rechecks quiet hours too.

## 13. PUSH RATE LIMITING

Central `notificationConfig`: 3 normal logical pushes/day, 90-minute gap, 3 attempts,
5-minute exponential retry base. High review push may bypass normal count, but
respects consent/quiet hours and one high logical notification/day. Highest priority
is processed first; ties use stable semantic keys, never random notification UUIDs.
Devices belonging to the same logical notification share budget.
No digest engine, attention bait or generic toast spam.

## 14. BACKGROUND WORKER

`notificationWorker` selects at most 50 consenting users with active subscriptions,
oldest processed first. SQL lease serializes a user's worker execution for 4 minutes.
Same canonical `simulatorState`, same run revision/settlement rules. Outbox/device
queries bounded at 100/20. A 200-second soft worker budget releases unprocessed
leases. Per-user and provider failures isolated. 404/410 disables endpoints;
429/5xx/transport errors retry at most 3 attempts. No provider secrets logged.
Metrics: runs, newly created records, attempts, sent/skipped/failed, disabled endpoints,
run failures. Catch-up may need multiple scheduled invocations, as existing engine
batching dictates; app-open catch-up remains available for everyone.

## 15. SCHEDULER / VERCEL CRON

`GET /api/cron/simulator-notifications`, Node runtime, maxDuration 240, no-store,
constant-time `Bearer CRON_SECRET` validation. Missing/wrong secret returns 401.
No request-supplied accounts, run IDs or time. **Not deployed or scheduled yet.**
Repository does not establish the hosting plan. Ready-to-merge example:
`deployment/vercel.notifications-pro.json` → `vercel.json` on a compatible plan:

```json
{"crons":[{"path":"/api/cron/simulator-notifications","schedule":"*/15 * * * *"}]}
```

Vercel Hobby permits once/day and cannot honestly supply 15-minute delivery;
Pro/Enterprise support this cadence. Verify plan/function duration before enabling.
Reference: https://vercel.com/docs/cron-jobs/usage-and-pricing
No exact-to-the-minute promise. Without scheduler, next app-open canonical catch-up
still produces correct simulator reality.

## 16. APP LIFECYCLE CHANGES

Added pageshow, online and offline to existing simulator visibility/debounce path.
Same single-flight, response generation/revision guards and nextRefreshAt timer.
Notification refresh piggybacks successful sync and inbox/lifecycle opening, without
interval polling. Mutation/refresh ordering in inbox protects read state from older
fetches. Offline status keeps previous render and disables financial/event/review
mutations. No offline decision queue. Existing safe UUID helper remains in use by
simulator mutations; notification client introduces no random ID generation.

## 17. DATABASE TABLES

`sim_notifications`, `sim_notification_preferences`, `sim_push_subscriptions`,
`sim_notification_deliveries`. Semantic notification uniqueness per user;
delivery uniqueness per notification/installation/channel. Indexes support unread
count, user history, active devices and due outbox work. No destructive retention.

## 18. RLS / SECURITY

RLS on all four tables. Only owned notifications allow authenticated SELECT;
logical-content writes, preferences, endpoint/keys and delivery details are server
only. Worker lease RPC uses SECURITY INVOKER and execution is service_role only.
Strict Zod bodies; user identity comes from verified session. Same-origin mutations
reuse established account protection. Endpoint registration accepts HTTPS standard
provider hosts only to prevent SSRF; unknown future providers require explicit
allowlist expansion. Service role/VAPID private key remain server only.

## 19. MIGRATION FILE

**Aplică doar: `supabase/migrations/0009_simulator_notifications.sql`.**
Do not rerun 0001–0008 or reset the database. Existing runs, ledger, accounts,
events, subscriptions, reviews and auth records are preserved. Migration was
executed against local PGlite PostgreSQL for verification, not remote Supabase.

## 20. ENV VARS REQUIRED

```dotenv
NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY=<generated public key>
WEB_PUSH_VAPID_PRIVATE_KEY=<generated private key; server only>
WEB_PUSH_VAPID_SUBJECT=https://<valid project domain>
CRON_SECRET=<strong private scheduler secret>
```

Reuse existing `NEXT_PUBLIC_APP_URL` and Supabase environment. No production values
were generated, printed or committed. Missing VAPID disables only push.

## 21. VAPID SETUP STEPS

1. Run `npx web-push generate-vapid-keys --json` privately.
2. Place generated public/private keys in their matching environment variables.
3. Use valid public HTTPS project URL or `mailto:` subject; not https://localhost
   (Safari rejects that VAPID subject).
4. Configure CRON_SECRET on server and scheduler. Rebuild after changing NEXT_PUBLIC
   public key. Keep the private key out of NEXT_PUBLIC, client, Git and logs.
5. Apply only migration 0009, configure a compatible scheduler, then test on HTTPS.
   Production deployment remains a separate authorized action.

## 22. FILES CREATED

- `src/lib/simulator/notifications/{model,database,observe,service,worker,client}.ts`
- `src/lib/simulator/use-online.ts`
- `src/content/simulator/notification-config.ts`
- `app/components/notification-{bell,settings,diagnostics}.tsx`
- `app/api/notifications/{route,preferences/route,push/route,push/display/route}.ts`
- `app/api/cron/simulator-notifications/route.ts`
- `app/api/simulator/dev/notifications/route.ts`
- `public/finly-push-sw.js`, `app/manifest.ts`, `app/notifications.css`
- `public/icons/finly-{192,512}.png`, `app/apple-icon.png` (existing icon rasterizations)
- `supabase/migrations/0009_simulator_notifications.sql`
- `deployment/vercel.notifications-pro.json`, this report
- `tests/notification-db-fixture.ts`, `tests/simulator-notifications*.{ts,mjs}`

## 23. FILES MODIFIED

`app/layout.tsx`, `app/finly-client.tsx`, `app/components/learning-ui.tsx`,
`app/simulator/simulator-client.tsx`, `financial-controls.tsx`,
`monthly-review-panel.tsx`, `eveniment/[id]/event-detail-client.tsx`,
`dev/simulator-dev-client.tsx`, `app/api/simulator/events/[id]/route.ts`,
`src/lib/account/logout.ts`, `src/lib/simulator/server/chapter-two.ts`,
`src/lib/simulator/financial-calendar.ts`, `proxy.ts`, `package.json` / lock.
Pre-existing unrelated modifications were preserved. No applied migration edited.

## 24. TEST RESULTS

Domain + real PostgreSQL + real Next/Auth SDK/PGlite browser QA. Provider send is
mocked in integration tests; browser permission/PushManager use fixtures for granted
flow. **A live OS push on an actual subscribed phone is not claimed as verified.**
Coverage includes semantic dedup, multi-device deliveries, cross-device reads, RLS,
shared-browser current-session display suppression, quiet/DST, stale target, retry,
404/410, count/gap/category policy, payments without ledger, missed monthly reviews,
overlapping worker leases, canonical worker/lazy equivalence and no cache handler.
Equivalence compares all financial/gameplay fields; event `createdAt` is explicitly
DB materialization time, not availability/expiry/resolution authority. Existing
regressions were retained without skip/only or weakened assertions.
Browser evidence: `artifacts/simulator-chapter-eight/browser/report.json` and
isolated QA screenshots. 35 suites / 743 tests pass; existing lesson validators pass.
Latest browser report: seven grouped checks, zero browser/provider errors, including
granted permission, actual endpoint registration/dedup, toggle-off unsubscribe and
offline/reconnect. The isolated runner creates a fresh Next build directory per run.

## 25. LINT

`npm run lint`: PASS, zero warnings.

## 26. TYPECHECK

`npx tsc --noEmit`: PASS.

## 27. BUILD

`npm run build`: PASS. Missing production VAPID is safe. The four new notification
environment variables are currently absent from local `.env.local`; only presence
was checked, no environment values were exposed.

## 28. MANUAL QA

### In-app

1. Apply only 0009; open `/simulator`, confirm utility bell.
2. Open `/simulator/dev` → “Notificare de test”. Return to simulator.
3. Confirm count increases; open inbox; open item or mark-all.
4. Refresh; item remains read. Open second device/tab, fetch; same read state.

### Push

1. Use compatible HTTPS environment (local dev-only endpoint still requires NODE_ENV
   development; production testing should use a real canonical event, never a public
   test endpoint).
2. Profile → Notificări → “Activează notificările”; accept browser permission.
3. `/simulator/dev` → “Inspectează notificările”: active device ID exists (no keys shown).
4. Use dev-only test; temporarily disable quiet hours if testing at night, respecting
   normal delivery budget. Background/minimize Finly before delivery; visible simulator
   suppresses redundant system notification.
5. Receive/tap; existing window is focused or Finly opens simulator. Inbox read does
   not resolve events or acknowledge reviews.

### Canonical event

1. Existing dev consequences control → phone problem fixture.
2. Existing dev clock/events control → advance 15 minutes; canonical fixture becomes
   visible. Chapter 8 → “Procesează contul curent”.
3. One `event:{id}:available` inbox record; at most one delivery/device. Refresh/process
   twice: no duplicate. Resolve before delivery: skip. No production policy for dev ID.

### Quiet hours

Use existing dev clock minute controls to reach 23:00, quiet toggle on; inspect
`deliver_after`/status. Review/test with enough lifetime delays to 08:00. Daily event
expiring at midnight skips. PostgreSQL tests cover next-day 07:00 expiry and DST;
never shift simulator timing because of push settings.

### Payment

Create actual subscription due tomorrow; advance dev clock to >=19:00 today;
process current account. One reminder for actual source/due date; compare ledger
before/after observation: no future payment. Tap opens existing calendar/day. Advance
past due date: stale reminder disappears, existing Chapter 5 settlement owns money.

### Month end / multi-device

Cross month boundary with existing dev clock and sync. Existing Chapter 7 snapshot
and mandatory panel appear; one notification/review. Reading notification leaves
panel mandatory. Several missed months preserve chronological review flow and push
only oldest. PC/phone share one inbox record, separate device deliveries and read
state after fetch.

## 29. HTTPS / MOBILE NOTES

`http://192.168.x.x:3115` may be insecure: missing push/SW is expected, not a simulator
failure. Desktop localhost security does not demonstrate iPhone LAN support. Test
real phone push on HTTPS; install/add to home screen where required. Capability
detection is used, not a hardcoded user-agent. Browser hints are contextual. Existing
Finly icon is reused with standard PNG/apple-touch sizes.

## 30. KNOWN LIMITATIONS

Production migration/env/scheduler and actual-device live push remain deployment
and manual acceptance steps. Hosting plan was not verified remotely. 50 users/batch
and 20 active devices/user delivery limit are conservative starting bounds; at scale,
measure backlog/cadence and adjust deliberately. Provider delivery is best-effort;
crash after provider acceptance before sent_at can retry, with stable notification tag
reducing visible duplicates. Browser offline/session validation intentionally favors
privacy over delivery. No guarantee of exact-minute delivery. Quiet window is fixed
22–08 in current UI, with a toggle rather than a custom hours editor.

## 31. INTENTIONALLY NOT IMPLEMENTED

No new simulator engine, offline simulator/cache/decision queue, Realtime/presence,
complex digest, salary/flag/gamification/marketing spam, SMS/email/WhatsApp/native
app, location/weather, AI notification writer or next chapter. No production deploy.
