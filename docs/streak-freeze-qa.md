# Finly streak / Freeze verification

## Database activation

Apply `supabase/migrations/0011_streak_freeze_moments.sql` before deploying this
application version. No earlier migration is edited. Use the Supabase SQL Editor
or your normal migration pipeline. This session has no Supabase management MCP,
database password or management access token, so remote DDL is not executed.
Until that migration is applied, an exact missing-function response uses the
existing revision-locked business RPC. Progress remains readable and writable;
durable streak presentations activate once the new RPCs exist. Permission,
connection and transaction errors do not trigger this compatibility path.

The migration adds only a presentation table and three private RPCs. The original
revision-locked progress RPC still writes business state. The wrapper inserts
presentation events inside that same transaction; an outbox failure rolls back
the mutation. RLS permits authenticated users to read only their own moments;
only the trusted server can claim, acknowledge or write payloads.

## Automated commands

```powershell
$env:VITEST_MAX_WORKERS = '2'
npm test
npm run lint
npx tsc --noEmit
npm run build
node tests/streak-freeze-browser.mjs
```

The worker cap avoids CPU contention between the existing PostgreSQL simulator
fixtures. No test timeout or assertion is relaxed; the complete suite still runs.

The browser command creates `C:/Users/Fabian/finly-streak-qa-20261012`, reuses the
installed dependencies through a junction, and runs an isolated Next server on
3145 from an isolated production build, plus a simulated Supabase transport on
3146. PostgreSQL is real PGlite;
authentication and unrelated notification transport are simulated. Production
accounts and the existing dev server are untouched. Chrome and the existing
Playwright installation are used. Fixtures reset only disposable local users.
Screenshots and the report are copied into `artifacts/streak-freeze/`.

## Manual streak check

1. Use an expendable QA account. Prepare N consecutive active civil days ending
   yesterday and ensure there is no `activity_days` row for today. The browser
   fixture's `seed(0, N)` does exactly this in local PostgreSQL.
2. Load Home. Confirm N, then open the first accessible curriculum lesson.
3. Complete every question and finish the lesson. Wait for the server response.
4. Inspect `/api/progress` with the signed-in browser: `statsSummary.currentStreak`
   must be N+1 and today must occur exactly once in `progress.activityDates`.
5. Observe the flame drop, settle, ignition, six sparks and N→N+1 number change.
   The overlay dismisses in 1.35 seconds; no button or focus change is required.
6. Check `streak_moments`: exactly one `streak_incremented:<today>` for this user,
   and `acknowledged_at` becomes non-null after presentation.
7. Refresh, navigate Home→Profile→Home, and open a second authenticated browser
   context/device. The full celebration must not replay.
8. Finish another lesson/replay and submit Daily Challenge today. The streak stays
   N+1 and no second increment event appears.
9. On a fresh inactive day, submit an incorrect Daily Challenge answer. It creates
   an active day even though challenge XP is zero. Starting/abandoning a lesson,
   opening pages and completing the simulator must not create an active day.

## One and two protected days

1. In disposable local fixtures, call `seed(1, 8)` or `seed(2, 8)`. The function
   prepares eight active days followed by one/two closed missed civil days, an
   initial two-charge inventory and a consistent grant anchor.
2. Open Profile; the GET performs transactional server catch-up.
3. Expect streak 8, one/two durable `streak_freeze_days` rows, and a single
   consolidated “Streak protejat” presentation. Frozen days never enter
   `activity_days` and produce zero XP.
4. Inventory is 1/2 or 0/2 before any later Monday refill. If the return itself is
   Monday, expect +1 capped at 2; the summary shows the current confirmed balance.
5. Focus or tap each Snowflake tile. Its localized accessible label says
   “protejată cu Freeze”; the detail explains the protection. Active tiles use
   Flame, missed tiles remain neutral, and today has a distinct outline.
6. Refresh. Historical Snowflakes remain and the acknowledged overlay does not
   replay. Complete a qualifying activity: 8→9.

## Three misses and break

Use three missed days with no intervening Monday grant. For example, active Monday
2026-10-05, missing Tuesday/Wednesday/Thursday, return Friday 2026-10-09. Start
with two charges. Tuesday and Wednesday are frozen, Thursday breaks the streak,
and inventory is zero. Expect one understated break summary mentioning the
protected dates, no Freeze slideshow. A later qualifying activity starts at 1.
Further absence consumes nothing while streak is zero.

The `seed(3, 8)` browser case adapts to the current civil weekday. Returning on
Tuesday/Wednesday can involve a Monday grant between misses, allowing a third
protected day without ever holding more than two charges. Fixed-date domain
tests independently verify the three-miss break with no intervening grant.

## Sunday and Monday

Use injected civil dates in `tests/streak-freeze.test.ts`:

- Saturday 2026-10-10 active, inventory zero; Sunday inactive; read Monday
  2026-10-12. Sunday breaks the streak and Monday refills inventory to 1.
- Sunday 2026-10-11 active, inventory zero; Monday inactive; read Tuesday
  2026-10-13. Monday's own +1 protects Monday. Inventory is zero; count unchanged.
- Recompute the same state/date repeatedly: no extra grant or consumption.
- Balance 2 on entering Monday remains 2. Multiple absent weeks refill only up to
  2 and cannot repair a prior break. DST cases use Bucharest civil DayKeys.

## Presentation failure, concurrency and account isolation

- Race two valid same-day operations with the same stats revision: one succeeds,
  the other retries after a conflict. One activity day, increment and milestone
  reward persist. Retry the same operation UUID: no second mutation.
- Drop the mutation's response after PostgreSQL commits. Its unacknowledged
  outbox row still exists and can be claimed on the next load.
- Phone and desktop claim concurrently with different UUIDs: only one receives
  the batch. After the phone acknowledges, desktop receives no full celebration.
- Fail the first acknowledgment response: the client retries the receipt. XP,
  activity and inventory must remain unchanged.
- Close a tab before presentation/ack. Its 10-second reservation expires and a
  later claim recovers the event. A failed acknowledgment can rarely replay a
  visual; business state remains idempotent.
- Logout/switch from A to B while A has a pending event: A's host unmounts,
  aborts requests and clears timers. B cannot claim or acknowledge A's IDs.
- Sync an eligible late activity over a previously protected date. The existing
  refund rule is preserved; obsolete pending Freeze/break snapshots are retired
  transactionally. New presentations follow commit order so a newer canonical
  streak snapshot is not discarded just because its activity date is older.

## Visual and accessibility review

At 320, 390, 430 and 1440 px, check Home, Profile/calendar, lesson final and Daily
Challenge. Moment cards have a 340 px maximum width and no horizontal overflow.
Inspect all four moment types, Home/Daily Challenge and lesson-final screenshots
in `artifacts/streak-freeze/`. Enable reduced
motion: the flame and particles stop moving; text, fade, timing and server ack
remain. Tab navigation retains focus; the noninteractive moment never traps it.
One atomic polite status announces the result, with decorative numbers/icons
hidden from assistive technology. No sound or continuous flame loop is added.

Existing accounts retain their original inventory allocation through
`freezeInitialBalance=1` when first mapped from legacy stats. New accounts start
with 2. Existing XP, history, grants and acknowledgment records are preserved.
