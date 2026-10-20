Finly daily facts, inbox polish and simulator continuity — 2026-10-17

1. Current state and causes

Home's Fini card rendered a literal gross/net paragraph in JSX. Home already had a trusted todayKey, so no new clock or persistence was needed. The inbox was already a native dialog with date groups, badge calculation, individual navigation and a server-backed mark-all-read action. That action already prevented duplicate requests, waited for the server and refreshed the canonical response without deleting history. Its visible label was long and underlined. Settings were a footer Link to /?tab=profile without a section anchor.

The simulator already had deterministic RNG, policy V4's two-event daily floor and repairs, semantic/domain diversity, immutable snapshots, consequence operations and bounded effects. Existing chains covered phone, cable, headphones, printing, groceries/food coverage, packed lunch, home supplies, project preparation and transport preparation. Existing bag/clothing flags also remain available. All previous Home cleanup, lesson changes and simulator work were preserved.

2. Exact application and test files changed in this task

- app/finly-client.tsx
- app/components/notification-bell.tsx
- app/components/notification-settings.tsx
- app/notifications.css
- src/content/daily-facts.ts
- src/content/simulator/events/catalog-v3.server.ts
- src/lib/simulator/events/interest.ts
- src/lib/simulator/events/planner.ts
- tests/daily-facts.test.ts
- tests/daily-polish-browser.mjs
- tests/simulator-continuity-interest.test.ts
- tests/simulator-daily-floor.test.ts

catalog-v3.server.ts and simulator-daily-floor.test.ts already existed as untracked local work; they were extended in place. app/finly-app.css was inspected but not edited by this task. Existing simulator daily-floor migration/configuration was preserved, not applied remotely or changed.

Generated evidence added under artifacts/daily-polish: implementation-report.md, report.json, inbox-350.png, inbox-360.png, inbox-375.png, inbox-390.png, inbox-1280.png, profile-anchor-390.png.

3. Daily facts

src/content/daily-facts.ts owns 36 typed facts with stable IDs, category IDs, lesson IDs and short Romanian text. References were checked against the current curriculum. No tax rates, investment returns or changing product terms were introduced. getDailyFinlyFact(todayKey) maps an already-local civil date ordinal into the stable editorial sequence. UTC is used only for arithmetic on that civil key, never to determine the browser's day. Home reuses its trusted Europe/Bucharest todayKey. The same day selects the same catalog object across renders, refreshes and devices. Adjacent entries, including the cycle boundary, have different categories; the cycle repeats after 36 days. Fini and the compact card remain; the label is ȘTIAI CĂ...?.

4. Inbox

Removed the visible footer entirely. A 44×44 settings gear closes the dialog before navigating to /?tab=profile#notification-settings. The canonical Profile section has that stable ID and scrolls to it when mounted after hydration. The gear's accessible name is Setările notificărilor. The existing close label is preserved.

Marchează citite is a text-and-check pill on its own header row, shown only for unread > 0. It reuses the existing operation and busy/failure handling. Success updates canonical unread items, dots and badge while preserving every notification. Focus moves to the gear when the focused mark-read control is about to disappear. Failure preserves unread state and allows retry. A legacy header button width rule was found during screenshot review and overridden so the full label fits on one line.

5. Continuity

V3 adds prepared_dinner_followup (food_coverage), prepared_project_followup (project_ready) and prepared_route_followup (transport_prepared). These use existing requiredEffects and existing zero-cost covered options; they do not create another charge, consequence system or narrative engine. Their effects expire normally. The route follow-up uses a different family from preparation so the existing family cooldown cannot make its three-day effect impossible to use.

Policy V4 requires the source flag/effect to come from an earlier Bucharest day before planning a recognition event. Cooldowns, schedule/profile checks and the seeded selection still apply; eligibility does not guarantee a follow-up. school_missing_snack is excluded while packed_lunch is active, and the ordinary work cable scenario is excluded while cable_problematic is active. Existing cable repair clears the flag. Tests cover idempotency, later eligibility with source history, expiry, free covered choices, incompatible events and unchanged snapshots/historical state.

6. Interest

interest.ts derives a small typed routine/engaging distinction from existing semantic metadata and state requirements, never from prices or balances. While V4 is still filling its daily minimum, a routine first selection makes an equally diverse engaging candidate preferable. Candidate validity is checked first, diversity ranks first, and existing weighted deterministic scores break remaining ties. The preference stops after the floor is satisfied. Routine-only or otherwise constrained pools still produce valid floor events. Both normal opportunity passes and quiet-day floor completion have deterministic fixtures.

7. Actual checks

| Command | Final result |
| --- | --- |
| npm run lint | PASS |
| npx tsc --noEmit | PASS; no typecheck script exists |
| npm test | PASS; 53 files, 912 tests, plus all three content/shuffle/curriculum validators |
| npx vitest run tests/daily-facts.test.ts tests/simulator-continuity-interest.test.ts tests/simulator-daily-floor.test.ts tests/simulator-daily-floor-integration.test.ts --testTimeout=30000 | PASS; 4 files, 31 tests at that checkpoint; an additional interest fixture was subsequently included in the 912-test full run |
| node tests/daily-polish-browser.mjs | PASS in C:/Users/Fabian/finly-final-quality-20261016 |
| npm run build | PASS; final rerun after the CSS fix |
| git diff --check | PASS |

Initial focused runs exposed an obsolete exact-catalog-size assertion and a timeout under concurrent build/browser load. The catalog test now verifies preservation of every original ID and option plus the exact three added IDs. No assertion was removed, and no .skip or .only was added. The unchanged normal-timeout full suite subsequently passed. The old browser harness's obsolete simulator setup selector was adapted to the current three-question setup.

8. Browser and visual QA

Real local Next.js → actual notification API → local PostgreSQL (PGlite) → rendered UI, with simulated local Auth transport. Tested 390, 375, 360, 350 and 1280 px. Checked dialog/page overflow, full action dimensions and single-line text, 44px gear targets, keyboard containment, Escape/focus return, mark-read busy/error/retry/success, dots and badge, retained history and old navigation, empty inbox, long inbox, reduced motion and cross-device read state. Settings navigation closes the dialog and scrolls to the anchor without trapping focus. Home's label, mascot and stable fact on reload and a second browser context were checked. The 350px screenshot was inspected visually after correction. The final report has no browser or provider errors.

9. Limits and final Git review

QA used headless Chrome and local database/Auth fixtures, not physical phones or production services. No remote migration, deployment or push-delivery test was performed. Previous working-tree changes remain in place. git status, git diff and git diff --check were run and reviewed; environment files, authentication, Supabase and Vercel configuration were not changed. No commit, push or deployment was made.
