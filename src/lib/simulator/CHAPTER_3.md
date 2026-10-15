# Simulator Chapter 3 — event engine

## Foundation audit

The existing foundation uses integer `MoneyBani`, Bucharest civil `DayKey`,
xmur3/mulberry32 RNG v1, `settle`, semantic ledger keys and row-lock/CAS RPCs.
Next 16.3.8, React 19.2.8, TypeScript strict, Vitest 4.1.11 and Tailwind 4.
The worktree already contained uncommitted Chapters 1/2 and partial event domain
files. Existing account, financial, calendar and random systems are reused.
Migration 0004 extends 0003 without editing it or resetting existing accounts.

## Planning and content

Catalog v1 is a verification library: 12 families, two distinct contexts each,
three options each, exactly one zero-cost safe fallback per context. The full
catalog and registry import `server-only`. Scenario prices and prepared-food
alternatives are educational conventions; no inventory or persistent effects.

Policy v1 persists on activation. Profiles `liceu` and `lucrez` affect schedule
only. Occupied weekdays are 08–14 and 09–17; weekends are free. Date exceptions
are validated data and initially empty. No school holiday calendar is assumed.

Routine chances are per configured window; additional opportunities have
independent chances. The normal average targets 1–2, not a required daily count.
Zero days are saved. There is no min/max quota and legacy `maxEventsPerDay: 4`
is ignored. Tests demonstrate a synthetic eligible plan with more than four.
Family cooldown counts planned appearances: D + 3 means earliest three civil
days later. Social groups count current day plus previous six; lunch families
share an exclusion group. Potential activity intervals and appearance spacing
are checked before planning. Resolution checks accepted activity intervals again.

RNG namespaces: `candidate_eligibility`, `candidate_score`, `variation`,
`scheduled_time`, `price`, `price_addon`, `auto_resolve`, `instance_id`.
Weighted ranking uses independent stable-ID exponential races `-log(U)/weight`.
Canonical sorting makes catalog iteration order irrelevant. Prices materialize
once; dependent bundle prices reuse their base plus an independently seeded addon.

Assigned catalog/policy versions and policy snapshots own future reconstruction.
Keep v1 immutable after publication; add a new registry entry/module for changes.
Existing instance JSON snapshots never get refreshed from live content.

## One chronology and transaction

`syncSimulatorThrough` is the production orchestration path for active engines.
The pure `synchronizeEvents` walks local days, resolves expired events using the
old balance before settling the following day's salary/fixed expenses, closes
each day and plans the following day. Expiry is next local midnight, DST safe.
Automatic choice is uniform among currently eligible options, including free.
Activities start at the opportunity's scheduled time, even if answered later.
Free choices have no ledger row; paid choices have one semantic debit on event day.

Each synchronization batch processes at most 31 local days. Planning rows,
resolutions, ledger changes and checkpoints commit together under the existing
run row lock and a financial checkpoint/event revision CAS. A competing commit
causes refetch/recompute. Manual availability is rechecked under the SQL lock,
including production transaction time at midnight. Old financial-only settlement
returns conflict for active engines. Manual retries return the saved decision;
a different option returns 409 plus the authoritative decision. Partial-history
choices are disabled until caught up.

## Database / applying the migration

Open `supabase/migrations/0004_simulator_events.sql`, copy its full contents into
Supabase Dashboard → SQL Editor → New query and run after migration 0003. Review
against a staging database first. This task did not apply any remote migration.

`sim_runs` adds `schedule_profile`, `event_engine_started_at`,
`event_catalog_version`, `event_policy_version`, `event_policy_snapshot`,
`event_last_closed_day`, `event_processed_at`, `event_revision`.
Existing rows stay inactive with a null profile.

New `sim_event_days`: composite `(run_id,day)` key, `user_id`, catalog/policy
versions, `planned_at`, `closed_at`, `event_count`, including zero.

New `sim_event_instances`: `id`, `run_id`, `user_id`, `day`, `definition_id`,
`definition_version`, `family_id`, `variation_id`, `scheduled_at`, `expires_at`,
`snapshot_version`, `snapshot`, `status`, `resolution_mode`, `selected_option_id`,
`selected_cost_bani`, `feedback_snapshot`, `resolved_at`, `activity_start_at`,
`activity_end_at`, `generation_key`, `cancel_reason`, `created_at`.
Unique generation keys, owner composite FK/cascade and indexes protect integrity.
RLS is enabled; browser roles have no event-table privileges or mutation policies.
Only the existing service role can invoke activation/commit/read RPCs.
No new environment variable, secret, Supabase client or dependency is required.

## APIs and UI

- `POST /api/simulator/profile`: one-time profile selection.
- `GET /api/simulator/dashboard`: extends the canonical dashboard with sanitized
  visible pending events, today's results and catch-up metadata.
- `GET /api/simulator/events/[id]`: hidden future IDs return generic 404.
- `POST /api/simulator/events/[id]`: option ID only; the route supplies instance ID.
- `/simulator/eveniment/[id]`: stable detail route with preserved login destination,
  exact prices, disabled reasons, paid confirmation, saved feedback and balance.
- `/api/simulator/dev/events`: development-only full plan, policy, times, versions,
  checkpoints, generation keys, RNG namespaces/seeds, rejections and activity data.

The normal dashboard retains balance, salary, fixed expenses, Fini and journal.
Only the visible monthly-summary card is replaced by Events Today. The standard
single-flight sync refreshes on server deadlines and visibility changes; no frequent
polling. Stale lower-revision responses are rejected. The catalog is absent from
production browser chunks.

## Development sequence

1. Start `npm run dev`, login and open `/simulator/dev`.
2. Start a run, choose Liceu or Lucrez once, then inspect the full plan.
3. Use +15 minutes / +1 hour / +6 hours to reach a scheduled opportunity.
4. Open `/simulator`, choose a free option and inspect its persisted result.
5. Choose a paid option in another situation; confirm, inspect balance and ledger.
6. Leave a pending event and advance through local midnight; inspect automatic
   resolution and its event-day ledger entry. A free auto choice has no debit.
7. Salary is on day 1 in the actual financial config. Reach the preceding day,
   leave an event pending and advance midnight. Old-day choices use old-day money.
8. Advance +7 days; inspect chronological plans/closed days and ledger uniqueness.
9. For long absences inspect/continue until `caughtUp=true`; normal dashboard also
   continues automatically. Use reset to restart, never move time backwards.

All dev routes return 404 and dev offsets are ignored in production.

## Validation and limitations

Run `npm test`, `npm run lint`, `node node_modules/typescript/bin/tsc --noEmit`,
`npm run build`, `node tests/simulator-events-browser.mjs` and
`node tests/simulator-production.mjs`.

Domain tests cover 2,000 deterministic rhythm fixtures, 3,000 uniform automatic
choices, price relationships, versions, profiles, cooldown/groups, zero/>4, DST,
old-balance salary ordering and equivalent chronological catch-up batches.
Integration tests execute migrations and services against actual PostgreSQL
via PGlite, including CAS races, retries, rollback, future privacy and grants.
PGlite queues DB statements; this is not a multi-connection remote Supabase load
test. Browser tests use real Next, SDK and SQL, with simulated local Auth only;
no real email or remote database writes. Mobile checks cover 320/390/430.

Not implemented: 200-event final library, persistent effects, inventory/provisions,
push/native notifications, subscriptions created by players, debt/investment
gameplay, month-end education summary, XP/streak/progress changes.

Future integration points: immutable catalog/policy registry, versioned snapshots,
stable detail/deep-link route, persistent event history/activity intervals,
validated schedule exceptions and the common chronological orchestrator.

## Exact Chapter 3 file inventory

```text
src/content/simulator/events/catalog-v1.server.ts
src/content/simulator/events/registry.server.ts
src/content/simulator/events/policy-v1.ts
src/lib/simulator/events/types.ts
src/lib/simulator/events/validate.ts
src/lib/simulator/events/time.ts
src/lib/simulator/events/planner.ts
src/lib/simulator/events/resolve.ts
src/lib/simulator/events/synchronize.ts
src/lib/simulator/server/events.ts
src/lib/simulator/server/service.ts
src/lib/simulator/server/database.ts
src/lib/simulator/server/clock.ts
src/lib/simulator/server/chapter-two.ts
src/lib/simulator/clock.ts
src/lib/simulator/api-types.ts
src/lib/simulator/chapter-two-api.ts
src/lib/simulator/dashboard.ts
src/lib/simulator/CHAPTER_3.md
app/api/simulator/profile/route.ts
app/api/simulator/events/[id]/route.ts
app/api/simulator/dev/events/route.ts
app/api/simulator/start/route.ts
app/simulator/event-area.tsx
app/simulator/eveniment/[id]/page.tsx
app/simulator/eveniment/[id]/event-detail-client.tsx
app/simulator/dev/simulator-dev-client.tsx
app/simulator/simulator-client.tsx
app/simulator/simulator.css
app/autentificare/page.tsx
app/components/account-screens.tsx
supabase/migrations/0004_simulator_events.sql
tests/simulator-events.test.ts
tests/simulator-events-integration.test.ts
tests/simulator-events-api.test.ts
tests/simulator-events-browser.mjs
tests/simulator-production.mjs
tests/simulator-service.test.ts
```
