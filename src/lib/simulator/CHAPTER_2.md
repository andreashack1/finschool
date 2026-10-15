# Simulator Chapter 2

`/simulator` is the account-only main experience. Home and lesson navigation link
here; `/?tab=simulator` redirects here. It does not call progress or XP mutations.

## Data flow

- `GET /api/simulator/dashboard`: existing settlement service, atomic MVCC read,
  full-run balance and current-month dashboard. A fresh account gets both server
  housing previews in the same request.
- `POST /api/simulator/preview`: housing only, verified session, current server
  calendar and config. Both preview and start call `buildStartPlan`, which uses
  foundation `settle`. On payday there is salary, no separate initial balance.
- `POST /api/simulator/start`: housing only; existing atomic `startRun`, then the
  same complete canonical dashboard. The server recalculates the start day.
- `GET /api/simulator/journal?month=YYYY-MM`: one selected month; rejects months
  before the run or after the authoritative current month. History cannot change
  the current dashboard.

All endpoints reuse `simulatorApi` auth, account context, origin checks and
`no-store`. No new Supabase client, database table, money model, calendar engine,
environment variable, package, or migration is required. Migration
`0003_simulator_foundation.sql` must already be applied in the target environment.

## Rules and synchronization

The canonical builder uses the run's immutable config snapshot and full ledger.
The browser receives only current-month journal entries with readable labels;
internal refKeys and full historical ledger are not exposed. Server reads retain
the foundation's full-ledger RPC. Journal ordering is day descending, sequence
descending, then stable refKey order. Future scheduled ties use salary first,
then snapshot expense order. Nonexistent dates 29–31 stay skipped.

Amounts stay integer bani. Initial balance and technical adjustments are not
income. Pre-start obligations are not remaining debts. Automatic obligations
apply even when the result is negative. Flags/effects are carried through the
foundation selector, without applying any new gameplay.

The browser uses single-flight requests, generation invalidation, account-bound
headers and stale-checkpoint protection. It refreshes on load, visible-tab return
(three-second burst throttle) and server-calibrated Romanian midnight. Midnight
is located through existing DayKey conversion, including 23/25-hour days.
`performance.now()` compensates request duration; device wall time never drives
financial settlement. Failed refresh keeps existing state and offers retry.

## Verification

`npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`.
`node tests/simulator-production.mjs` verifies production dev-route 404s,
unauthenticated private APIs, no-store and absence of service-role references in
public JavaScript. It makes no authenticated database mutations.

`tests/simulator-browser.mjs` runs real Next.js and Supabase SDK against a local
PGlite provider with simulated Auth. Run it in an isolated project copy; it owns
ports 3125/3126 and modifies only its ephemeral local database. If dependencies
are junctioned outside that copy, configure its test-only Turbopack root to cover
both locations. The runner uses installed Windows Chrome; the Playwright module
path can be passed as its first argument. Screenshots/report go to
`artifacts/simulator-qa`.

The browser flow verifies setup, keyboard housing selection, two-tab start,
persisted dashboard, visibility/network retry, lost committed response recovery,
refresh, logout/login, a separate browser context, month history, unchanged
gamification and mobile/desktop presentation. PGlite queues a single connection;
multi-session database locking still needs a disposable Supabase/Postgres test DB.

Development only: `/simulator/dev`, start, +1/+7/+30; the existing engine settles
all crossed due dates and month boundaries without reset. Reset affects only the
current account's simulator. All dev routes return 404 in production.
