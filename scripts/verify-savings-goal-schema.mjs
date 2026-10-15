// Read-only deployment check. Never reads user rows or prints credentials.
import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const checks = [];
if (!url || !key) throw new Error('Supabase server configuration is missing.');
const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
for (const [table, column] of [['sim_savings_goals', 'target_amount_bani'], ['sim_goal_operations', 'operation_id'], ['sim_ledger', 'goal_id']]) {
  const response = await fetch(new URL(`/rest/v1/${table}?select=${column}&limit=0`, url), { headers, signal: AbortSignal.timeout(15000) });
  const data = await response.json();
  checks.push({ name: `${table}.${column}`, ready: response.ok, status: response.status, code: data.code ?? null });
}
// The deliberately nonexistent owner/run must fail before any mutation.
const zero = '00000000-0000-4000-8000-000000000000';
const response = await fetch(new URL('/rest/v1/rpc/mutate_simulator_goal', url), {
  method: 'POST', headers, signal: AbortSignal.timeout(15000),
  body: JSON.stringify({ p_user: zero, p_run: zero, p_expected: 0, p_day: '2026-10-13', p_now: '2026-10-13T12:00:00Z', p_development: false, p_input: { action: 'create', name: 'Schema probe', amount: 350000, operationId: zero } }),
});
const data = await response.json();
checks.push({ name: 'mutate_simulator_goal signature and owner guard', ready: response.status === 400 && data.code === 'P0001' && data.message === 'invalid owner', status: response.status, code: data.code ?? null });
const ready = checks.every(check => check.ready);
console.log(JSON.stringify({ ready, migration: '0012_simulator_savings_goal.sql', checks }, null, 2));
if (!ready) process.exitCode = 1;
