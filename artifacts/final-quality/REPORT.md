# Finly final quality pass — 2026-10-16

Implementation completed locally. No commit, push, deployment, remote migration, database reset or user-data deletion was performed.

## Root causes

- Takeaway toggles were conditional on optional `detail`, leaving many cards static.
- Expanded details used ordinary text and a display toggle without a distinct reveal state or structured emphasis.
- Contextual event opportunities could all fail their probability draws. Policy v3 inherited that behavior without a daily minimum.
- The active catalog retained older presentation text; changing historical definitions directly would also risk changing catch-up inputs.

## Takeaways

Audited all 100 ready lessons and 407 recap cards, including every final action. Detail and 1–3 highlight phrases are required by the canonical schema. Validation rejects absent/duplicate highlight phrases, excessive highlights and obvious summary copies. Exact phrase rendering escapes regex characters and renders React text safely. Every card has a connected real button, independent expansion state, a 44px affordance, a 220ms grid/opacity reveal, a blue open-state accent and reduced-motion support.

Identity, lesson/screen/item order, slugs, questions, progression and rewards are protected by comparison with the pre-pass content snapshot. Changes are limited to recap content. One awkward investment sentence was corrected during the resumed final review; the focused content checks passed afterward.

## Simulator

Policy v4 retains ordinary seeded opportunities, then completes underfilled days in deterministic stages: probability bypass, semantic relaxation, and a curated late at-home pool. Exact-event/family cooldowns, profile/state/variation eligibility, occupied schedules, activity overlap and minimum spacing remain enforced. Selection penalizes repeated semantic contexts and same-day domains. Planning does not consult balance; affordability remains a decision-time concern.

Current open days with zero or one usable event receive only future additions. Saved instances retain IDs, snapshots and times. Repeated synchronization does not add duplicates. Extremely late starts may have insufficient safe time; complete days and ordinary 15:05 starts are covered by the floor tests. Server and UI order events chronologically. The existing 30-minute response window and future-content visibility filter remain intact. Random events stay outside the financial calendar.

## Editorial and version compatibility

Catalog v3 layers curated titles/context over historical v2 definitions without changing definition IDs. The editorial map changes 47 definitions. Examples include `Cină acasă`, `Plan de weekend`, `Ai uitat pachetul`, and `Fișiere fără loc`. Existing unmodified context/options remain available where already suitable. Tests cover active title quality, excessive duplicate titles and frozen historical snapshots.

Persisted policy v4 records the previous policy/catalog and upgrade boundary. Historical catch-up resolves with those original inputs. Existing balances, ledger, subscriptions, profile, consequences and savings goals are retained.

Migration `0013_simulator_daily_floor.sql` is necessary because existing production RPCs cannot persist this version transition or maintain same-day event counts through the existing development-only update path. It adds a service-role-only upgrade and delegates event commits to the existing transaction/CAS safeguards, updating counts only on the current open day. Prior migrations remain unchanged. It was exercised in local PostgreSQL fixtures, not applied remotely. Until rollout includes this migration, existing engines retain their persisted behavior.

## Verification

Saved pre-interruption command output was recovered and inspected:

- `npm test`: PASS, 51 files / 900 tests, plus answer-option, extended-lesson and curriculum validation.
- `node node_modules/vitest/vitest.mjs run tests/simulator-daily-floor.test.ts tests/simulator-daily-floor-integration.test.ts`: saved focused run PASS, 21 tests across 2 files.
- `npm run build`: PASS, production compilation, TypeScript and 53 generated pages.

Completed after resuming:

- `npm run lint`: PASS.
- `node node_modules/typescript/bin/tsc --noEmit`: PASS (repository has no typecheck script).
- `node node_modules/vitest/vitest.mjs run tests/takeaway-final-quality.test.ts tests/lesson-quality.test.ts`: PASS, 15 tests after the final wording correction.
- `node tests/final-quality-browser.mjs --life`: PASS in the existing isolated QA copy.
- `git -c core.safecrlf=false diff --check`: PASS.

The planner matrix spans four life profiles, three fixed seeds and 21 consecutive days, plus afternoon/late starts, diversity, state constraints, repeated sync and policy/catalog upgrades. Browser QA covers all four school/work × family/rental combinations, real local Next/API/PostgreSQL flows, event visibility, expiry and stable refresh. Three unrelated lessons were exercised at 390/375/360px with all cards open, action cards, blue highlights, keyboard collapse/reopen and reduced motion. Browser/provider error arrays are empty. Mobile screenshots were visually inspected for expanded takeaways and event chronology/readability.

## Scope and limitations

The working tree already contains Home cleanup changes (`app/finly-client.tsx`, Home CSS, recommendation helpers/tests and Home artifacts); these were retained. No auth, environment or deployment configuration was changed for this pass. Updated historical assertions allow the explicitly requested recap edits; independent snapshot checks continue to protect all non-recap content and metadata.

Browser authentication uses simulated local accounts with the real SDK and local PostgreSQL; remote authentication/delivery and deployed behavior were not tested. Screenshots and the successful browser report are in `browser/`. The successful browser copy precedes the final investment wording correction; focused canonical-content tests cover that final sentence change. No functionality changed after browser verification.

`changed-files.txt` lists the exact current modified/new source, test and migration paths, including pre-existing Home changes. Generated QA artifacts are excluded from that manifest.
