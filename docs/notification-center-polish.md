# Finly — In-app Notification Center

## 1. Notification Center audit

Audited the working repository before edits, including `git status`, `git diff`, app shells, bell, event detail, simulator synchronization/resolution, Chapter 8 projection/worker, authenticated routes, notification schema/RLS and tests. The workspace already contained extensive uncommitted Chapter 3–8, learning, authentication and streak work; these changes were preserved.

The existing inbox persisted reads, but used active push-delivery relevance to hide resolved/expired events. GET did not perform canonical catch-up, available/expiring rows could duplicate one situation, and the badge was green. Existing event detail already rendered manual/automatic read-only results, but the monthly-review gate also blocked historical results.

## 2. Existing notification architecture found

Chapter 8: `sim_notifications`, `sim_notification_preferences`, `sim_push_subscriptions`, `sim_notification_deliveries`, semantic uniqueness, server service-role writes, a shared observer and optional push worker. Reused these tables and the existing API. Existing payment/monthly-review types remain supported.

## 3. Bell component

`app/components/notification-bell.tsx`, already used by the main, learning and simulator shells. One existing bell; a native modal dialog manages focus, Escape and return focus. Mobile uses an 88dvh bottom panel; desktop uses a compact panel capped at 440px with an independently scrolling list.

## 4. Red unread badge

44px bell target, small red `#dc2626` badge, white text, upper-right position, pointer-events disabled. Shows 1–9, then 9+, and disappears at zero. Exact count remains in the Romanian aria-label.

## 5. Unread count logic

Server COUNT of owned, available, non-obsolete rows with `read_at IS NULL`, independent of the latest-50 list. Opening the panel only fetches state. Rows show Nou / În așteptare / Ratată / Rezolvată; grouping uses Europe/Bucharest and timestamp + ID sorting is stable.

## 6. Read / unread server persistence

Reused `read_at`. No notification localStorage state. Reading acknowledges the displayed `available_at` version, so a stale acknowledgment cannot consume a newer automatic result. Mutation returns confirmed server state immediately; a follow-up refresh reconciles further changes.

## 7. Mark all as read

Authenticated, same-origin, current-user-only update; idempotent; excludes future/obsolete rows. The action disappears when unread is zero.

## 8. Active event notifications

Canonical availability only: scheduled now or earlier, pending, not expired and actionable today. Snapshot title/context and actual expiresAt; no catalog reconstruction. One existing `event:{id}:available` semantic identity is reused.

## 9. Missed / auto-resolved notifications

Retains the same logical item with Ratată, Simulatorul a ales, selected snapshot option and actual cost. First return after absence can create the final historical representation directly. No popup flood.

## 10. Manual resolved event state

Ai ales and saved cost; same historical item, read automatically. This works when a choice originates from Events Today or the bell.

## 11. Significant state change / re-unread

`available_at` represents the canonical significant timestamp: scheduledAt initially, resolutionEffectiveAt for results, with legacy fallback. Transition to automatic outcome resets read_at once. Manual outcome is read. Conditional updates and a terminal delivery-expiry marker prevent stale devices regressing a result, including an immediate manual choice at scheduledAt. Timestamps compare by instant, accepting PostgreSQL timezone formatting differences.

## 12. Deep links

Owned event items navigate to `/simulator/eveniment/[id]`; saved outcomes no longer fall back to the dashboard just because the event is resolved or a monthly review is pending.

## 13. Read-only event result

Existing detail displays snapshot context, choice, automatic-expiry explanation, cost and existing saved/current balance. No decision buttons for resolved events. Historical viewing bypasses the review gate; pending decisions and mutation gates still apply.

## 14. Catch-up integration

Inbox GET calls existing `simulatorState` first, then shared notification observation. No event-engine duplication. App dashboard and Chapter 8 worker reuse the same mapping/observer. Reads and choices reconcile notifications after canonical completion, with notification errors caught separately; later inbox load retries.

## 15. Cross-device behavior

Initial load, opening, focus, visible lifecycle, reconnect and simulator updates refresh server state. A single wake-up at the next canonical availability/expiry boundary handles an open panel. No polling interval or Realtime addition. Account-keyed component and 401 clearing remove stale identity data.

## 16. Deduplication

Existing `(user_id, semantic_key)` uniqueness and idempotent inserts. Available thread is updated in place. Old expiring reminder rows become obsolete in the inbox without deleting delivery history. Concurrent retries and stale snapshots are covered by PostgreSQL integration tests.

## 17. Database changes

No schema changes or production SQL executed. Existing rows are reconciled through the owned server observer; prior IDs/created_at and event snapshots are retained.

## 18. Migration file

**NONE.** Existing semantic key, available_at, nullable expires_at, read_at and obsolete_at support these semantics. Existing migrations were not edited.

## 19. RLS / auth

Existing owner SELECT policy and revoked browser writes remain. Server derives identity from requireUser, checks account context and same-origin mutations; strict input rejects userId/user_id/payload/status/read_at. Service-role queries are explicitly user-scoped. PostgreSQL tests enforce cross-owner denial and browser mutation denial.

## 20. Files created

- `src/lib/simulator/notifications/inbox-view.ts`
- `tests/notification-center.test.ts`
- `tests/notification-center-api.test.ts`
- `tests/notification-center-browser.mjs`
- `docs/notification-center-polish.md`
- Evidence under `artifacts/notification-center/browser/`.

## 21. Files modified by this task

- `app/components/notification-bell.tsx`
- `app/notifications.css`
- `app/api/notifications/route.ts`
- `app/api/simulator/events/[id]/route.ts`
- `src/lib/simulator/notifications/observe.ts`
- `src/lib/simulator/notifications/service.ts`
- `src/lib/simulator/notifications/client.ts`
- `src/lib/simulator/server/events.ts` — historical detail gate only.
- `tests/simulator-notifications-integration.test.ts`
- `tests/simulator-monthly-review-integration.test.ts` — assert saved history can be viewed while mutations remain gated.

## 22. Test results

Full suite: 42 files / 808 tests passed with `node node_modules/vitest/vitest.mjs run --maxWorkers=2`. Subsequent final targeted suite: 29 tests passed, including the added notification-storage-failure recovery test. Earlier broader affected suite: 72 tests passed. Existing content validators all passed. No .skip/.only or deleted tests.

Browser: real Next + Supabase SDK + PostgreSQL; simulated local Auth; separate browser contexts for devices. Verified red 3, open preserving unread, click 3→2, mark-all zero, refresh, other-device focus, future exclusion, active→missed re-unread, saved choice/cost, read-only route, dedup, manual history, exact aria 14 with visual 9+, account switch, empty state, keyboard, reduced motion and 320/390/430/1280 layouts. Report has zero page errors and provider errors.

The initial unlimited test workers caused unrelated timeouts; limiting worker concurrency passed without changing test timeouts/assertions. Browser harness was updated for the existing 0011 account RPCs and uses Turbopack to avoid Windows Webpack dev-manifest write races. These are test setup changes only.

## 23. Lint

`npm run lint`: PASS.

## 24. Typecheck

`node node_modules/typescript/bin/tsc --noEmit`: PASS.

## 25. Build

`npm run build`: PASS. No deployment performed.

## 26. Manual QA steps

Run only with a dedicated test account/local database. `tests/notification-center-browser.mjs` prepares actual EventInstances and exercises the sequence below using the reusable isolated harness; it refuses to run in the working Git repository.

### Badge / reading

A. Prepare three available, unresolved canonical EventInstances and reconcile the inbox; acknowledge any unrelated prior notifications first.
B. Open Finly: red badge 3, aria-label Notificări, 3 necitite.
C. Open the bell: still 3, with three unread rows.
D. Open one row: active event options appear; return to Finly: badge 2.
E. Open the bell and choose Marchează toate ca citite: badge disappears and the action is hidden.
F. Refresh: badge stays absent.

### Missed event

A. Prepare an active event and leave it unanswered.
B. Allow its existing expiresAt to pass; use existing development minute controls in a local run if needed.
C. Refocus/open Finly to trigger canonical sync.
D. Verify Ratată, Simulatorul a ales, the selected option and saved cost.
E. Open the row: context/result are shown with no decision buttons.

### Read then automatic resolution

A. Open an active notification without choosing an option; unread decreases.
B. Let its canonical deadline pass and sync.
C. The same item becomes unread again, with Ratată and the automatic outcome.
D. Open it, then sync again: it stays read and no second item is created.

### Absence / retry

A. In a local simulator account, advance through several hours/days with multiple real event instances; do not manually answer them.
B. Return through the home bell, without first opening Events Today.
C. Verify canonical automatic results, relevant unread count and recent event history.
D. Repeat sync and trigger sync in two contexts: still one logical available thread per event; cancelled/future events have no dead active row.

### Cross-device / account switch

A. Open phone and desktop with the same account and unread notifications.
B. Read on phone; refocus desktop: server count and read rows agree.
C. Refresh both: acknowledgments remain.
D. Logout A and log into B: no A badge, title or row survives.
E. For development clock tests, use matching clock cookies on both devices or finish cross-device testing before advancing a per-device dev clock.

### Responsive / accessible

A. Check 320, 390 and 430px: badge readable, 44px bell target, full-width bottom panel, wrapped titles and no horizontal overflow.
B. Check desktop: compact max-width, scroll inside the list, usable header.
C. Keyboard open/Tab/Escape: focus remains inside the modal and returns to bell.
D. Enable reduced motion: no repeated badge or panel animation.
E. Test a disconnected notification request: last known data remains with a retry message; successful reconnect reconciles the server state.

## 27. Known limitations

Inbox initially displays the latest 50 rows; count covers all relevant persisted rows. Existing engine batch/catch-up limits remain. Cross-device QA used separate browser contexts with real local PostgreSQL, not physical phones or production. Production schema/data/deployment were not modified. List timers are display-only, refreshed at canonical boundaries and lifecycle sync.

## 28. Intentionally unchanged systems

Planner, deterministic RNG, event frequency/duration, affordability, ledger, settlement, consequences, subscriptions, calendar, monthly-review acknowledgment, auth implementation, lessons, XP, streaks, About page and existing push infrastructure. No new push library, VAPID setup, Service Worker, email/SMS/WhatsApp, notification-list route or heavy dependency.
