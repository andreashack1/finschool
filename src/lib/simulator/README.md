# Simulator foundation — version 1

The existing user simulator is independent and unchanged. The event registry is empty.

- Time is server-authoritative. `DayKey` is a Romanian civil date, calculated with
  `Europe/Bucharest`, not a UTC midnight. Calendar arithmetic operates on Y/M/D.
- Money is integer **bani**. Each persisted transaction fits PostgreSQL integer;
  derived lifetime sums must remain JS safe integers. There is no stored balance.
- A run stores validated plain-JSON config, rules and RNG versions. Existing runs
  replay their snapshot. Unknown versions/corrupt snapshots fail without mutation.
- Start on payday: salary, no initial balance. Other start days: initial balance,
  then future payday. Obligations before start never apply. Configured days 29–31
  apply only in months where that date exists, without shifting to month end.
- Each civil day processes start (100), salary (200), ordered fixed expenses
  (300–999), future occurrences (1000–8999), automatic resolutions (9000+).
  Semantic ref keys deduplicate entries. Empty days advance the settlement cursor.
- Pure settlement does not access DB or clock. Server-only services reuse existing
  auth/admin clients. Start plus first settlement is atomic. Later writes lock the
  run, check the expected cursor and update ledger/cursor in one transaction;
  the service permits one CAS retry. Reads use one MVCC snapshot.
- Client roles have owner-only SELECT, no writes and no access to private RPCs.
  Effects have inclusive `[startsOn, endsOn]` dates (N days ends at start + N − 1).
  Flags persist by stable key. No effect application or scheduling exists yet.
- RNG v1 is xmur3 + mulberry32, noncryptographic. Seeds use unambiguous encoded
  version/run/civil-day/namespace/event parts, independent of device/session.
  Missed decisions prefer uniformly selected affordable positive-cost options,
  then explicit free fallbacks. Their calendar integration is deferred.
- `/simulator/dev` and dev endpoints are unavailable outside development. The
  HTTP-only logical day-offset cookie never changes the system clock or DB.
  Production ignores it. Dev reset deletes only the current user's simulator
  runs (children cascade), then resets the offset. No backwards travel is offered.

Apply `supabase/migrations/0003_simulator_foundation.sql` before runtime testing.
Compilation/build do not require simulator tables. No new environment variables.
