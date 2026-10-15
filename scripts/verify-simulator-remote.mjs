// Read-only schema probe. No credentials, user rows or response bodies are printed.
import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.log(JSON.stringify({ configured: false })); process.exitCode = 1; }
else {
  const checks = [];
  for (const table of ['sim_runs', 'sim_ledger', 'sim_effects', 'sim_flags']) {
    const response = await fetch(new URL(`/rest/v1/${table}?select=*&limit=0`, url), { headers: { apikey: key, Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(15000) });
    const data = await response.json();
    checks.push({ name: table, status: response.status, code: response.ok ? null : data.code ?? 'UNKNOWN' });
  }
  const response = await fetch(new URL('/rest/v1/rpc/read_simulator_state', url), { method: 'POST', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ p_user: '00000000-0000-4000-8000-000000000000' }), signal: AbortSignal.timeout(15000) });
  const data = await response.json();
  checks.push({ name: 'read_simulator_state (nonexistent user)', status: response.status, code: response.ok ? null : data.code ?? 'UNKNOWN', ...(response.ok ? { empty: data === null } : {}) });
  console.log(JSON.stringify({ configured: true, checks }, null, 2));
  if (checks.some(check => check.status !== 200)) process.exitCode = 1;
}
