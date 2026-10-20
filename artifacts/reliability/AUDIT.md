# Finly reliability sweep — 2026-10-18

Work performed in `C:/Users/Fabian/bani-app`. Existing local changes preserved.
No commit, push, deployment, production data mutation, migration creation or
applied migration edit. The pre-existing untracked migration 0013 was only used
in the isolated PostgreSQL test fixture.

## Scope and inventory

`controls.json` inventories 160 JSX control/form definitions in 23 source files:
69 buttons, 57 Links, 18 inputs, 4 forms, 2 selects, 7 anchors, 3 summaries.
These are source definitions, not runtime totals: mapped lesson answers,
categories, notifications, dates and subscriptions produce repeated controls.
Dedicated development routes are excluded; shared diagnostic components remain
in the source inventory. Classification records the primary interaction;
conditional controls can combine local state, navigation and a server mutation.

Audited surfaces: Home/category recommendations/navigation/avatar, curriculum
categories and lesson unlocks, lesson answers/keyboard/continue/completion/replay,
trial save, daily challenge, profile edit/cancel/security/logout/delete
confirmation/legal links, verification/resend/reset/update-password, notification
inbox/read-all/history/settings, independent push preferences, SimLife setup,
events/free/paid choices/results/retry/offline, calendar/day/month navigation,
subscriptions/revisions, savings/create/edit/contribute/withdraw/archive and
monthly review/retry/idempotency. Local UI includes case rereading, expandable
takeaways, activity-day details, password visibility and native dialog focus.

## Confirmed defects and changes

| Defect | Root layer and files | Correction |
| --- | --- | --- |
| Offset notification versions rejected | API validation, `app/api/notifications/route.ts` | Installed default `z.iso.datetime()` rejects `2026-10-16T12:59:00+00:00` and `2026-10-16T15:59:00+03:00`; `{offset:true}` accepts these and Z timestamps while rejecting malformed values. The original version is passed to the existing DB equality predicate. |
| Notification navigation awaited a redundant read | Client orchestration, `app/components/notification-bell.tsx` | Parse the authoritative POST response, update inbox/unread, close and navigate immediately. No secondary GET is required. Primary failure keeps the inbox and does not invent read state. |
| Notification copy described saving instead of opening | Same component | `Deschide` for active items, `Detalii` otherwise; action-specific opening failure. Existing badge, header gear, history and read-all polish preserved. |
| Recovery emails inherited dev localhost | Origin configuration, `src/lib/supabase/env.ts`, `app/api/account/auth/route.ts` | Separate `authEmailOrigin()`: default development emails use the public origin; a server-only explicit loopback override enables local testing. Production retains canonical-origin validation and fails closed. |
| Daily Challenge async rejection lacked feedback | Client handler, `app/components/gamification-ui.tsx` | Catch, concise retry feedback, and existing ref/disabled guard restored in finally; domain XP/idempotency unchanged. |
| Background metadata/receipts could reject unhandled | `lesson-player.tsx`, `gamification-moments.tsx` | Explicit best-effort catches; progress queue and domain reconciliation preserved. |
| Subscription form waited for dashboard refresh after commit | `app/simulator/financial-controls.tsx` | Close on successful mutation; dashboard reconciliation is best-effort. Operation and revision safety retained. |
| Calendar/form Close was disabled offline | Same component | Only an active mutation disables Close. Calendar load failures use Romanian load-specific feedback. |
| Calendar deep-link dialog covered the mandatory monthly review | Same component and `app/simulator/simulator-client.tsx` | Reproduced by a real pointer click in browser QA. Defer automatic calendar opening while canonical monthly review is pending; open the requested day after acknowledgement. |
| Profile success could become an error during post-save snapshot read | `app/api/account/profile/route.ts`, `account-settings.tsx` | A confirmed RPC commit remains successful if the optional snapshot read fails; safe diagnostic and background client reconciliation. |
| Push preference success could be called a settings failure after device cleanup | `notification-settings.tsx` | Preserve committed settings and distinguish device-disconnection failure. |
| Password minimum was implicit in input validation | `account-screens.tsx` | Display `Minimum 8 caractere.` without changing shared password validation. |

## Intentionally preserved

Existing production notification storage, history, server-authoritative read
state, version predicates, cross-account checks, push/quiet hours, independent
checkboxes and current Finly/SimLife styling. Event choices remain canonical and
idempotent; resolved/missed details expose no new choice. Subscription and goal
operation IDs, revision checks, integer bani and Bucharest dates remain intact.
Reached goals retain withdrawal/edit/archive behavior; no funds are released
implicitly. Lesson session IDs and the progress ledger continue to deduplicate
XP. Existing resend cooldown, anti-enumeration and SMTP guidance remain.

## Security and database review

Mutation ownership still comes from the verified Auth user. `X-Finly-Account`
checks stale account context and never selects ownership. Same-origin mutation
checks, strict input validation, service-role server boundary and existing
owner-scoped database filters/RLS were not relaxed. Notification targets remain
internal; recovery `next` uses the existing allowlist. The short-lived HMAC
HTTP-only recovery proof is matched to the account and consumed only after
successful Supabase password update. No passwords, hashes, recovery/access/
refresh tokens or service keys were added to logs, client storage or DB tables.
No account lookup or enumeration behavior was added. Destructive deletion was
not tested against production data.

## Verification

Final results on the current source:

| Check | Result |
| --- | --- |
| `npm run test` | PASS: 993 tests in 59 files, plus all answer/curriculum verification scripts |
| `npm run lint` | PASS |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS: 53 routes generated |
| `git diff --check` | PASS |
| Extended notification/interaction browser smoke | PASS; no browser or provider errors |
| Local recovery browser/API/PostgreSQL | PASS; real SMTP delivery intentionally outside fixture scope |

`browser-report.json` contains the extended interaction checks. Inbox screenshots
exist for 350, 360, 375, 390, 430 and 1280px in the isolated QA directory. An older
human-readable check label still mentions 320px; the executed loop and screenshot
filenames establish the actual viewport set listed above.

Regression sources: `notification-center-api.test.ts`,
`auth-email-origin.test.ts`, `profile-reconciliation.test.ts`,
`simulator-notifications-integration.test.ts`, and expanded
`notification-center-browser.mjs`. Existing Z and security tests are retained.
Local password-recovery browser QA passed with a simulated fresh email, real
Next/Supabase SDK callback, signed proof, confirmation validation, password
update, consumed proof, retained session, rejected old password and accepted new
password. SMTP and hosted Auth behavior were simulated, not claimed as live.

Browser smoke uses real local Next routes, Supabase SDK and PGlite migrations,
with isolated Auth transport and no remote credentials. Viewports:
350, 360, 375, 390, 430 and 1280px. The test exercises actual pointer/keyboard
interactions; it does not use forced clicks to bypass modal overlays.

One concurrent full-suite run hit the existing 5-second daily-floor planner test
timeout while browser/build processes were running. The initial full suite
passed; the final suite passed all 993 tests without concurrent QA/build work.
No timeout, assertion or test was weakened to hide the contention.

## Files changed by this sweep

Existing unrelated working-tree changes are not attributed to this task.

- `app/api/account/auth/route.ts`
- `app/api/account/profile/route.ts`
- `app/api/notifications/route.ts`
- `app/components/account-screens.tsx`
- `app/components/account-settings.tsx`
- `app/components/gamification-moments.tsx`
- `app/components/gamification-ui.tsx`
- `app/components/lesson-player.tsx`
- `app/components/notification-bell.tsx`
- `app/components/notification-settings.tsx`
- `app/simulator/financial-controls.tsx`
- `app/simulator/simulator-client.tsx`
- `src/lib/supabase/env.ts`
- `scripts/verify-account-local.mjs`
- `tests/auth.test.ts`
- `tests/auth-email-origin.test.ts` (new)
- `tests/notification-center-api.test.ts`
- `tests/notification-center-browser.mjs`
- `tests/password-recovery-browser.mjs`
- `tests/profile-reconciliation.test.ts` (new)
- `tests/simulator-notifications-integration.test.ts`
- `supabase/AUTH_PASSWORD_RECOVERY.md` (new)
- `supabase/AUTH_EMAIL_VERIFICATION.md`
- Audit inventory, diff/status captures and reports under `artifacts/`.

## Hosted verification still required

See `supabase/AUTH_PASSWORD_RECOVERY.md` for exact Site URL, callback allowlist
and Recovery template instructions. No hosted management tools were available.
The generated production recovery callback is:
`https://finly2-ruddy.vercel.app/auth/callback?next=/actualizeaza-parola`.

For cross-origin/cross-browser recovery, the documented dynamic OTP template
passes `.TokenHash` and `type=recovery` to `.RedirectTo`; it avoids depending on
a PKCE verifier cookie from the initiating localhost browser. A plain
`.ConfirmationURL` remains supported for same-browser/same-origin PKCE flows.
Inspect the actual hosted template and request a brand-new real recovery email.
Old emails containing localhost cannot be repaired retroactively.
