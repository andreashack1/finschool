Finly Profile cleanup, active achievements, circular preferences and SimLife — 2026-10-17

1. Root causes and baseline

The current Profile rendered identity/level, four useful statistics, seven-day activity, all 21 achievement definitions, the entire XP journal and a permanent AccountSettings card. The card repeated account identity and permanently displayed email and age. Achievement rendering mapped the whole catalog, including completed entries and redundant future thresholds. The XP journal exposed transactions rather than overall learning coverage. Notification inputs used native green checkbox visuals. Product copy was spread across navigation, Home, About, feature pages, errors and notifications.

git status, git diff, AGENTS.md, local Next documentation, progress/account schemas, account/progress/notification tests and the current components were inspected before implementation. Existing local curriculum, daily facts, Home cleanup, notification inbox and simulator daily-floor/continuity work was retained.

2. Exact application/test file list for this task

The machine-readable list is files-changed.json (40 files). Files already changed before this task were extended in place; this list does not attribute all pre-existing diffs to this task.

```text
app/components/account-settings.tsx
app/components/gamification-ui.tsx
app/components/learning-ui.tsx
app/components/notification-bell.tsx
app/components/notification-diagnostics.tsx
app/components/notification-settings.tsx
app/despre/page.tsx
app/finly-app.css
app/finly-client.tsx
app/globals.css
app/layout.tsx
app/notifications.css
app/profile.css
app/simulator/dev/simulator-dev-client.tsx
app/simulator/eveniment/[id]/event-detail-client.tsx
app/simulator/life-setup.tsx
app/simulator/page.tsx
app/simulator/schedule-options.tsx
app/simulator/simulator-client.tsx
src/content/achievements.ts
src/content/simulator/events/consequence-demos.server.ts
src/lib/profile-progress.ts
src/lib/progress.ts
src/lib/simulator/errors.ts
src/lib/simulator/notifications/observe.ts
tests/notification-center-browser.mjs
tests/notification-center.test.ts
tests/profile-branding.test.ts
tests/profile-polish-browser.mjs
tests/profile-progress.test.ts
tests/simulator-browser.mjs
tests/simulator-chapter-two-service.test.ts
tests/simulator-event-ux-browser.mjs
tests/simulator-events-browser.mjs
tests/simulator-life-integration.test.ts
tests/simulator-notifications-browser.mjs
tests/simulator-notifications-integration.test.ts
tests/simulator-service.test.ts
tests/simulator-subscriptions-browser.mjs
vitest.config.mts
```

Additional generated evidence is under artifacts/profile-polish/: this report, files-changed.json, browser/report.json and browser/*.png. Existing browser/test assertions were updated for visible copy; their routes and technical fixture identities remain unchanged.

3. Profile settings

The original identity/level card, four statistics and LastSevenDays remain. A compact 44px pencil in the hero opens the refactored AccountSettings native dialog. The standalone Contul tău card, permanent email and age display are gone. Username and display-name editing still use the existing validation, username availability check, profile API and refresh. Cancel discards edits. Password and logout are secondary actions. Delete remains in a separated danger section with warning, a second confirmation step and exact username validation; the existing server deletion and cleanup path is unchanged. Legal links remain subtly available at the bottom.

The modal is bounded by the viewport, its body scrolls, and its header/close control stays reachable. Escape and focus return to the pencil were tested at all four mobile widths. A development Strict Mode cleanup-close race found during QA was fixed by ignoring stale close events after the native dialog has reopened.

4. Active achievements

getActiveAchievements in src/lib/profile-progress.ts is a pure deterministic presentation helper. It retains all 21 catalog entries and all existing IDs, conditions and unlock timestamps. It removes already-unlocked or already-satisfied candidates, groups sequential milestones into tracks and keeps only the nearest incomplete threshold. Daily answer/correct-answer milestones share a challenge track. Category/chapter/lesson/specialist one-offs retain distinct identities.

Candidates are ranked by existing progress percentage and stable catalog order. Selection gives a slot to learning, consistency, perfect lessons, subject progress, challenges, SimLife and XP as space permits, then fills remaining slots, with a hard maximum of five. SimLife has its own diversity kind so advanced profiles do not fill all spare slots with subject goals. Completion continues through existing award logic: the goal leaves the queue automatically and the next eligible threshold can enter. No claim operation, random selection or new achievement storage was added. The header reports N deblocate; completed state renders with zero active rows.

5. Learning progress

The unused XpJournal component/import and journal-specific CSS were removed. XP events, calculations, synchronization and audit history remain intact. Progres la lecții uses canonical getReadyLessons and completed-ID intersection, with one overall percentage/bar. It renders at most three started, incomplete categories, preferring the current category, then recent completion, percentage and curriculum order. No lesson total is hardcoded. Empty, completed-category and complete-curriculum states are handled.

6. Notification preferences

All five native checkbox inputs and their existing independent booleans, requests, push permission rules and error/disabled behavior remain. CSS changes only their appearance: white empty circle when off, solid Finly blue when on, no checkmark, with focus-visible and disabled styles. Labels retain 44px rows, Space toggles natively, and forced-colors styling preserves state visibility. The stable notification-settings anchor and inbox gear destination remain intact.

7. SimLife branding

User-visible product copy now uses exactly SimLife in Home, all bottom nav variants, /simulator heading and title metadata, About, setup and schedule explanations, feature loading/errors, event-result copy, notification settings/inbox/generated result text, achievements and visible development diagnostics. Romanian sentences were reviewed for grammar. The first-month achievement retains id first-month, condition type simulator and refId simulator; only its visible group/description changed.

The AST-based branding test scans app/src JSX text and explanatory literals, while recognizing paths, technical identifiers, references and console messages as internal. Remaining simulator strings are imports/routes, schema conditions, operation/XP identifiers, comments or diagnostic logs. /simulator, app/simulator, API paths, database tables/migrations, storage keys, type/function names and existing refs were preserved. No backend endpoint, authentication logic or remote configuration was changed.

8. Actual verification results

| Command | Final result |
| --- | --- |
| npm run lint | PASS |
| npx tsc --noEmit | PASS; package.json has no typecheck script |
| npm test | PASS: 55 test files, 923 tests; answer/shuffle, extended lesson and canonical curriculum validators also PASS |
| npx vitest run tests/profile-progress.test.ts tests/profile-branding.test.ts tests/simulator-service.test.ts tests/simulator-chapter-two-service.test.ts tests/auth.test.ts tests/account.test.ts tests/account-sql.test.ts tests/notification-center.test.ts tests/notification-center-api.test.ts | PASS: 9 files, 127 tests at that checkpoint; the subsequent advanced-diversity case is included in the final 923-test run |
| node tests/profile-polish-browser.mjs | PASS in C:/Users/Fabian/finly-final-quality-20261016; final UI and advanced SimLife goal mix verified |
| npm run build | PASS; production compile, TypeScript and all 53 pages generated successfully |
| git diff --check | PASS |

Vitest gained the same @/ source alias already used by the application so actual component markup could be tested. Its previous maxWorkers setting was preserved. Intermediate failures were corrected: missing test alias, stale expected user-facing error copy, modal Strict Mode closure, a test-route synchronization race, and a stale development cache. Each final browser run uses an isolated build directory. No assertions were removed and no .skip/.only was introduced.

9. Browser/manual review

Real Next routes and real local PostgreSQL migrations were exercised through Chrome with simulated local Auth transport. Checked 390, 375, 360 and 350px: new user, three lessons, 25 lessons/15 unlocks/60-day streak, and complete curriculum/all 21 unlocks. Verified bounded goals/categories, retained statistics/activity, no XP journal/account wall, no permanent email/age, all-complete state and no overflow.

Settings QA covers pencil open, keyboard containment, Escape/focus return, cancel, save error/retry, real username/display-name persistence, retained hidden age/email, password navigation, real logout, wrong confirmation rejection and successful local deletion/cascade. Notification QA covers five checkbox roles, Space interaction, white/blue computed styles and disabled saving. Branding QA covers Home CTA, navigation, /simulator heading/metadata, inbox/settings and About. Final browser/report.json reports no JavaScript or local provider errors. Mobile settings, experienced Profile and deletion screenshots were visually reviewed.

10. Real limitations and scope

Browser QA used headless Chrome with local PostgreSQL and simulated Auth, not physical phones, mobile screen readers or production services. Account deletion was tested only against disposable local fixture users. No remote migration or delivery was tested. Previous working-tree changes remain. Environment files and Supabase/Vercel configuration were not edited. No commit, push or deployment was made.
