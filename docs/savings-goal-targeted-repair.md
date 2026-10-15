# Savings goal final correction

## Confirmed creation failure

On 2026-10-13 the configured remote Data API returned `404 / PGRST205` for
`sim_savings_goals` and `sim_goal_operations`, and `404 / PGRST202` for
`mutate_simulator_goal` with the exact server signature. The required migration
already exists: `supabase/migrations/0012_simulator_savings_goal.sql`.
The previous implementation verified it locally but did not apply it remotely.

Apply **0012 once**, after the existing simulator migrations, through the project's
SQL Editor or normal migration pipeline. It contains its own transaction.
Do not reset the database, edit previous migrations, or create a duplicate migration.
Server service-role credentials cannot execute DDL through the Data API. This
workspace has no management token, database connection credentials, CLI or MCP
with which to apply it remotely.

Then run `node --use-system-ca scripts/verify-savings-goal-schema.mjs`.
The check reads no user rows and its RPC probe uses a nonexistent owner/run,
which must be rejected before mutation. A failed check exits nonzero.

## Dashboard behavior

- No goal: the balance card permanently offers `Pune bani deoparte`. It shows
  `Creează mai întâi un obiectiv pentru care vrei să pui bani deoparte.` and
  focuses/scrolls the existing goal card, without opening a form. The dedicated
  goal card contains the only `Creează un obiectiv` CTA.
- Existing goal: the balance card offers `Pune bani deoparte`, opening only the
  contribution sheet. At the target it is disabled to preserve the funding cap.
- Creation returns confirmed simulator state, immediately replacing the empty
  goal card with the actual name, target and zero progress.
- Creation asks only `Numele obiectivului` and `Suma obiectivului`.
- Contribution shows the goal name, available money and all 50/100/200 lei
  shortcuts. Invalid shortcuts are disabled, never hidden or silently capped.
- Its primary button names the selected amount, e.g. `Pune 100 lei deoparte`.

Accounting, lifecycle, RLS, ownership, receipts and all other simulator systems
remain unchanged. Browser regression checks cover the distinct entry points,
immediate state, refresh, multiple devices/accounts and responsive widths.

## Manual verification after migration

1. Open Simulator without a goal. Verify `Pune bani deoparte` inside the balance
   card and one creation CTA, only in `Obiectivul meu`. Click the balance action:
   verify the instruction and focus on the existing goal card, with no form.
2. Create `Laptop` with `3500`. Verify the sheet closes, `0 lei / 3.500 lei`, 0%,
   with the balance action still visible, without refreshing.
3. Refresh and open a second device/session. Verify the goal persists.
4. Click `Pune bani deoparte`. Verify available balance and an amount input,
   with no name/target configuration fields. Contribute 200 from 1000 available;
   verify 800 available, 200 reserved, and unchanged monthly spending.
5. Check 320, 390, 430 px and desktop. Repeat creation with `3500,50` after
   archiving the prior goal. Invalid/zero/negative/overflow targets must fail.
6. From 500 lei available, confirm 50, then 100, then 200 through shortcuts:
   expected available/reserve is 450/50, 350/150, 150/350. At 80 available or
   50 remaining, verify 50 enabled and 100/200 visibly disabled.
7. Contribute a custom `37,50`, refresh, and verify both balances persist.
8. Verify the exact invariant 500 available + 100 reserved, contributing 200:
   300 available + 300 reserved = 600 total, monthly spending unchanged.

Remote creation remains unverified until migration 0012 is applied.

## Validation result

- 829 tests passed across 44 files, including the missing-migration regression,
  exact 500+100 → 300+300 invariant and successive 50/100/200/custom transfers.
- Lint, TypeScript and production build passed.
- Final browser run passed all eight flow groups with no unexpected browser/provider
  errors. It first reproduced the real missing RPC failure through the form/API/SQL,
  then applied migration 0012 in the local PostgreSQL database and successfully
  retried the same operation: exactly one persisted goal, immediate UI and refresh.
- 44 screenshots cover 320, 390, 430 and 1280 px, including empty/newly-created
  states and visible disabled shortcuts for available/remaining caps.
- `git diff --check` passed.
- Remote schema probe failed as expected: tables/RPC missing, ledger goal column missing.
  Migration application and remote creation remain outstanding.
