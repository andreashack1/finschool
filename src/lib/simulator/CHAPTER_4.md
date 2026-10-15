# Simulator Chapter 4 — consequences and persistent state

## Audit and scope

Chapters 1–3 already own civil time, money, ledger, deterministic planning,
snapshots, catch-up, authentication and row-lock/CAS commits. `sim_flags` and
`sim_effects` were empty-capability projections: boolean current flags and
inclusive DayKey effect ranges, without decision consequences or flag history.
Chapter 4 extends those systems. It does not change production catalog v1,
prices, salary, housing, RNG namespaces or the event plan already saved.

The catch-up equivalence test exposed one Chapter 3 defect: automatic ledger
sequence used the whole batch's resolution count. It now uses the stable index
within the event day. Existing ledger rows are never rewritten.

## Data and authority

`ConsequenceDescriptor` is strict Zod data: `set_flag`, `clear_flag`,
`add_effect`, `remove_effect`. Stable ASCII IDs are unique within an option;
contradictory flag operations/add-remove families are rejected. Values are
boolean flags or bounded scalar effect records. Presentation is a bounded
snapshot with title, optional description/icon, priority and user/internal
visibility. No executable content and no money consequences exist.

Event snapshot version 1 remains compatible: optional `consequences` defaults
semantically to `[]`; optional option state rules and event relevance are
additive. Old JSON is not normalized in-place, regenerated or given new
consequences. Resolution always uses instance data, never today's catalog.
Browser choice payload remains exactly `{ optionId }`; instance ID is the route.
Public event responses never include consequence descriptors.

## Time, effects and history

Manual `effectiveAt` is the server-authoritative choice instant; automatic
`effectiveAt` is the saved event expiration. `recordedAt` is server processing
time, independent of the dev effective clock and historical catch-up time.
Ledger day remains the event's original day.

Offset zero starts immediately, without morning retroactivity. Positive offsets
start at local midnight of effective DayKey + offset. Expiry is local midnight
of effective DayKey + offset + duration; expiry is exclusive. `addDays` and
`localInstant` handle DST, month/year boundaries and leap years.

`replace` terminates old family rows at the new start, including future starts.
`extend` requires compatible type/value/policy and overlapping/touching coverage;
it adds calendar days after the existing coverage end. Each extension is its
own semantic row; it never overwrites the original expiry. Gaps remain gaps.
`independent` keeps separate instances; domain selectors decide meaning.
Removal sets `endedAt`, including termination before a future effect starts.
Expiry/removal never physically deletes an effect.

`sim_state_operations` stores descriptor, consequence order, source event and
option, effective/recorded time, computed effect and termination identities,
applied/no-op result and semantic idempotency key. Uniqueness and append-only
protection preserve audit. Flags reconstruct by effectiveAt, persisted sequence,
then stable identity. Effect rows reconstruct from their creation snapshots and
termination operations. Current flags use the existing projection; historical
evaluation before that projection's boundary uses the operation history.

Semantic key is instance + option + consequence. Retry returns the authoritative
saved event before reapplying anything, so it cannot extend twice. The domain
application engine also recognizes previously applied keys.

## One timeline and transaction

`synchronizeEvents` remains the canonical orchestrator: old-day expiration,
financial cost, consequences, day closure, new-day financial settlement, state
context, planning. Each historical planner evaluates state at that day's
boundary; dev fixtures can explicitly evaluate at their current effective time.
Eligibility supports required/excluded flags and effect families. Option state
requirements are separate; the safe fallback cannot depend on mutable state.
Snapshot relevance is checked before detail, choice and auto-resolution. An
irrelevant visible pending event becomes cancelled, with reason/time and no
choice, debit or consequences. No replacement event is generated.

Migration 0005 keeps the Chapter 3 commit body as `commit_simulator_events_v3`.
The service-only `commit_simulator_events` wrapper uses the SAME transaction,
run lock and CAS, validates descriptor completeness/identity against the
saved selected option, then inserts history and updates projections. A failure
rolls back event, ledger, activity, flags, effects and history together.
Both functions are invoker functions with an empty search_path and no browser
execute grants. State ownership follows the existing composite run/user pattern.

## Migration and compatibility baseline

Apply `supabase/migrations/0005_simulator_consequences.sql` manually AFTER 0004
using your established migration process or Supabase SQL Editor, as one script.
Do not reapply 0003/0004, reset the database or run the script from build.
This task does not execute a production migration and adds no environment vars.

Existing flags are preserved as explicit baseline operations with a null event
source at their recorded `set_on` local midnight. Earlier overwritten flag
transitions cannot be fabricated: authoritative consequence history starts with
this baseline and all Chapter 4 operations. Existing effects retain original
value/metadata/provenance; their inclusive dates map to exclusive local-midnight
timestamps. Their presentation is internal and their new bounded semantic value
is empty rather than inventing new content semantics.

Tables affected: `sim_event_instances` (logical/cancellation time and composite
identity), `sim_effects` (precise intervals/family/policy/creation snapshot),
`sim_flags` (logical time/sequence/presentation), new `sim_state_operations`.
Indexes: operation owner/timeline/source, effect family interval. Existing RLS
is retained; operation history is server-only. Browser state writes are denied.
Account/run cascades still clean owned data; standalone history edits are denied.

## Dashboard and Chapter 5 boundary

Canonical dashboard responses contain `currentStates`; no extra state APIs or
client expiry logic. Only active user-visible states render. Compatible family
coverage aggregates once; priority, nearest expiration and ID define ordering.
`Acum` is a compact sibling directly under `Ce urmează` inside its original grid
area. It is absent when empty. Events retains column 1/row 2 and mobile DOM order.
There is no new mascot, generic action, separate flag/effect cards or countdown.

Financial movements now carry stable `id` and `sourceType` and use the shared
`financialMovementOrder`. A future occurrence source can merge into the same
model/UI. Subscriptions, recurring custom obligations and calendar UI are NOT
implemented and do not belong in generic flags/effects.

## Development verification

Use a development run and activate its schedule. Do not reset real data.
All controls are unavailable in production (404 before auth/DB).

1. A: click `A. Provizii 2 zile`, advance `+15 minute`, open the situation in
   `/simulator` and choose. `Acum` shows coverage. `Verifică excluderea mesei`
   returns an `excluded_effect` diagnostic while coverage is active.
2. B: click `B. Problemă telefon`, advance 15 minutes and choose. Plan
   `Repară telefonul`, advance 15 minutes; plan `A doua verificare`, advance
   15 minutes. Resolve the repair: the flag disappears and the other situation
   cancels without a debit. Its detail says it no longer needs a decision.
3. C: with coverage active, click `C. Extinde proviziile`, advance 15 minutes
   and choose. Coverage grows by two local days; `Acum` still has one coverage
   item. Refresh/retry keeps the same expiration.
4. D: advance local days beyond the displayed inclusive end. The card disappears
   if there are no other visible states; expired rows remain in diagnostics.
5. E: plan a fixture without choosing it and advance `+7 zile`. The saved
   automatic operation uses the historical expiration, with separate real
   recorded time; expired coverage is not shown as current.

Diagnostics include current flags, flag history, all operations, active/future/
expired/ended effects, source identities, family/policy, effective/recorded time,
normalized visible states and planner rejection reasons. Fixtures use actual
planner/snapshot/commit/resolution code and never enter production selection.
Dev fixtures may append to an open day's marker; they do not replan old instances.

## Verification and limitations

Focused domain tests cover validation, old snapshots, immutable consequences,
calendar time, overlap, history, eligibility, options, cancellation, catch-up
equivalence and presentation. PGlite runs the real migrations/functions for
atomic writes, rollback, CAS races, ownership, RLS and restrictive grants.
Browser tests use actual Next + SDK + PostgreSQL with simulated local Auth,
checking mobile/desktop layout, detail decisions, session re-login and separate
browser contexts. Production smoke checks have no authenticated DB writes.

Remote Supabase deployment/migration and real network concurrency on hosted
Postgres remain deployment verification; PGlite cannot prove hosted network
behavior or truly simultaneous transactions on multiple Postgres connections.

Security reference reviewed: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)
and [database functions](https://supabase.com/docs/guides/database/functions).
