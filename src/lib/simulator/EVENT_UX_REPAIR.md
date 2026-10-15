# Finly — targeted event UX repair

## 1. Audit

The financial marker is rendered in `app/simulator/financial-controls.tsx` from `day.items.length`; its existing meaning includes salary, fixed expenses and subscriptions. Event detail uses the existing `/simulator/eveniment/[id]` route. Persisted JSONB snapshots own all prices and event content. Exact expiry timestamps and the canonical deterministic resolver already existed. The existing run revision and locked commit protect manual/automatic races.

## 2. Calendar marker

The dot/count is replaced by exactly one sky-blue `$` for any nonempty financial day. Empty days have none. The existing accessible movement count and selected-day details remain. Cell spacing accommodates day number, “Azi” and the symbol.

## 3. Event detail

Title, context, authored situation bullets, server-calibrated countdown and distinct choice cards form the pending screen. Technical scheduled/deadline rows are removed. After resolution, choices/countdown/details disappear and a compact result shows the chosen label, cost once and balance. Manual: “Ai ales”; automatic: “Simulatorul a ales”. Financial confirmation remains.

## 4. Dashboard

Pending events show title, short context preview, remaining time and “Vezi opțiunile”. Resolved events remain compact. A local countdown component updates without ticking the entire dashboard. Canonical next-refresh includes exact pending expiries.

## 5. Presentation model

Optional `presentation` contains title/context/2–5 bullet records. Definitions can explicitly reference an option's cost; materialization stores the exact generated integer-bani value in the immutable snapshot. No paragraph splitting, price extraction, runtime AI or client price generation. Zod validates count/length/money; catalog validation rejects missing price references and duplicate option labels.

## 6. Catalog review

All 200 production definitions receive presentation metadata. 65 definitions receive changed display titles. Situation-specific authored details supplement shared family facts. The original stable IDs, prices, rules and options are retained. `artifacts/simulator-event-ux/title-audit.json` lists each ID and all old/new variation display titles.

## 7. Decision window

Policy version 3, catalog version 2. `defaultDecisionWindowMinutes = 30` lives in `events/decision-policy.ts`; expiry is scheduled availability plus 30 real minutes. Epoch arithmetic handles DST without fixed UTC offsets. Server time plus monotonic elapsed browser time calibrates display. At zero the client requests canonical state; it never chooses locally.

## 8. Auto-resolution

The existing seeded resolver and eligibility/affordability/fallback rules remain. Automatic ledger sequence uses stable daily event order under policy 3, so periodic processing and lazy catch-up agree. Policy-3 cancellation records the first canonical state invalidation, even if the requirement later returns. SQL rechecks the deadline under the existing run lock. +29-minute manual submission succeeds; +30-minute concurrent submission/sync has one automatic outcome.

## 9. Legacy compatibility

Existing event snapshots, deadlines, prices and resolutions are untouched. Missing presentation renders the safe original title/context/options. New engines start on policy 3. Existing policy-2 engines upgrade before planning: the cutover is the later of the migration day and the day after the last persisted plan. That release date is stored on the run when migration is applied, so first app-open time cannot change the policy. Historical policy snapshots remain available for older unplanned dates. Legacy results without a recorded result balance explicitly show “Sold curent”.

## 10. Chapter 8

Existing delivery/display relevance checks already use exact `expiresAt`; no second event engine is added. Explicit configured expiry reminders move from 60 to 5 minutes. Stale notifications still suppress delivery. Push remains optional and does not resolve events.

## 11. Files created

- `app/simulator/event-countdown.tsx`
- `src/lib/simulator/events/decision-policy.ts`
- `src/content/simulator/events/policy-v3.ts`
- `src/content/simulator/events/presentation-editorial.ts`
- `src/content/simulator/events/presentation-details.ts`
- `supabase/migrations/0010_simulator_decision_policy.sql`
- `tests/simulator-event-ux.test.ts`
- `tests/simulator-event-ux-browser.mjs`
- This report and generated title/browser QA artifacts.

## 12. Files modified

- UI: `app/simulator/financial-controls.tsx`, `simulator.css`, `event-area.tsx`, `eveniment/[id]/event-detail-client.tsx`, `dev/simulator-dev-client.tsx`.
- Dev API: `app/api/simulator/dev/events/route.ts`.
- Content: `src/content/simulator/events/catalog-v2.server.ts`, `registry.server.ts`, `consequence-demos.server.ts`, `src/content/simulator/notification-config.ts`.
- Domain: `src/lib/simulator/events/types.ts`, `planner.ts`, `resolve.ts`, `synchronize.ts`.
- Server: `src/lib/simulator/server/events.ts`, `service.ts`, `database.ts`, `clock.ts`, `consequence-demos.ts`.
- Tests: catalog regression expectation now checks unchanged original fields plus exact additive presentation; integration fixtures apply the new migration. Life integration adds policy/privacy/expiry/race/result persistence tests. Notification budget regression compares worker output with canonical settlement at the same time.

## 13. Database migration

**Apply only `supabase/migrations/0010_simulator_decision_policy.sql` for this repair**, after the existing migrations. It adds a run policy-release date, nullable event result balance metadata and a service-role-only policy upgrade RPC. Result balance is persisted in the same transaction after canonical commit succeeds. No old migration is edited, no data is reset and no historical event is backfilled. The migration was exercised in local PostgreSQL fixtures; it was not applied remotely.

## 14. Manual QA

1. Open `/simulator`, then Calendar. A financial day shows `$`; an empty day does not. Add two subscriptions due on one date: one `$`, two selected-day details.
2. Inspect `/simulator/dev` → event diagnostics. Find a new policy-3 pending event and open its existing detail link. Check human title/context/bullets/timer/options and exact costs.
3. Choose an available option before expiry. For paid choices confirm. Check “Ai ales”, one cost and the saved balance after choice.
4. For a quick development fixture, press “B. Problemă telefon”, then “+1 minut” to reach availability. Inspect `decisionWindowMinutes` (30 under policy 3), press “+29 minute”: pending; then “+1 minut”: “Simulatorul a ales”. Inspect the exact timestamps if real time elapsed between clicks. The +29 test starts from availability, not an arbitrary later page opening. Existing legacy fixtures keep their old deadline.
5. Refresh halfway through: same snapshot/prices/expiry. Close the tab and return after expiry: canonical catch-up resolves it.
6. Open the same event on phone and desktop. Both show the same expiry; resolve on one and foreground/reload the other to see the saved result.
7. Check a resolved event and the compact dashboard preview. Open an old snapshot: no presentation field is required and its original deadline remains.
8. Repeat at 320/390/430 px and desktop; use Tab/Enter, offline/reconnect and pageshow. Timer ticks do not announce every second.

Development diagnostics expose scheduled/available/expires timestamps, actual window minutes, status/mode/option, structured presentation and the title audit. +29 and +1-minute controls remain development-only.

## 15–18. Validation

- Unit/integration/regression tests: 36 suites, 754 tests; all pass. Three curriculum/shuffle/progress validators also pass.
- Browser: five flow groups, real Next/Auth SDK/PostgreSQL local fixtures; zero browser/provider errors. 320/390/430/1280 px screenshots and report under `artifacts/simulator-event-ux/browser/`.
- Lint: pass, zero warnings. Typecheck: pass. Production build: pass.
- Tests include exact 30-minute/DST expiry, immutable snapshots, zero-balance fallback, stable automatic choice, legacy deadlines, recorded result balance, manual/automatic race and background/lazy equivalence including existing monthly/subscription regression coverage.

## 19. Limitations

Mobile widths are Chromium emulation; physical iPhone testing remains manual. Live Web Push/provider delivery and remote migration were not exercised by this UX repair. Existing events intentionally keep legacy response windows. Legacy result balances cannot be reconstructed reliably, so the UI labels their balance as current.

## 20. Intentionally unchanged

Event frequency/RNG algorithm, eligibility, recurrence, subscription settlement, fixed expenses, salary, monthly-review gate, auth, gamification and notification architecture. No dependency added, production deployment, reset, new simulator chapter or offline decision queue.
