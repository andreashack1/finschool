import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { settle } from '../src/lib/simulator/settle';
import type { LedgerEntry, SimulatorRun } from '../src/lib/simulator/types';
import { day, fixtureRun, runId, userA, userB } from './simulator-fixtures';

const sql = readFileSync('supabase/migrations/0003_simulator_foundation.sql', 'utf8');
let db: PGlite;
const entries = (run: SimulatorRun, list: LedgerEntry[]) => JSON.stringify(list.map(e => ({ ...e, runId: run.id, userId: run.userId })));
async function start(run: SimulatorRun) {
  return (await db.query<{ result: { created: boolean; runId: string } }>('select public.start_simulator_run($1,$2::jsonb,$3::jsonb) as result', [run.userId, JSON.stringify(run), entries(run, settle(run, [], run.startedOn).newEntries)])).rows[0].result;
}
async function newRun() {
  const userId = crypto.randomUUID(); await db.query('insert into auth.users values($1)', [userId]);
  return { ...fixtureRun(), id: crypto.randomUUID(), userId };
}
async function apply(run: SimulatorRun, expected: string | null, through: string, list: LedgerEntry[]) {
  return (await db.query<{ result: { status: string } }>('select public.apply_simulator_settlement($1,$2,$3,$4,$5::jsonb) as result', [run.userId, run.id, expected, through, entries(run, list)])).rows[0].result;
}

describe('Simulator migration executed on actual PostgreSQL (PGlite)', () => {
  beforeAll(async () => {
    db = new PGlite();
    await db.exec("create role anon; create role authenticated; create role service_role bypassrls; create schema auth; create table auth.users(id uuid primary key); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema public,auth to anon,authenticated,service_role;");
    await db.exec(sql);
    await db.query('insert into auth.users values($1),($2)', [userA, userB]);
    await start(fixtureRun()); await start({ ...fixtureRun(), id: crypto.randomUUID(), userId: userB });
  }, 30000);
  afterAll(async () => { await db?.close(); });
  it('creates only four simulator tables with RLS, no client writes and no balance column', async () => {
    for (const table of ['sim_runs', 'sim_ledger', 'sim_effects', 'sim_flags']) {
      const result = await db.query<{ enabled: boolean; writes: boolean; anon: boolean }>("select relrowsecurity as enabled,has_table_privilege('authenticated',oid,'INSERT,UPDATE,DELETE') as writes,has_table_privilege('anon',oid,'SELECT') as anon from pg_class where oid=$1::regclass", [`public.${table}`]);
      expect(result.rows).toEqual([{ enabled: true, writes: false, anon: false }]);
    }
    expect((await db.query("select column_name from information_schema.columns where table_name='sim_runs' and column_name like '%balance%'" )).rows).toEqual([]);
    expect(sql).not.toMatch(/drop table|delete from|disable row level security/i);
  });
  it('A reads only A, including ledger/effects/flags; anon reads nothing', async () => {
    await db.query("insert into public.sim_effects(run_id,user_id,effect_key,effect_type,starts_on,ends_on,value,source_ref) values($1,$2,'test_effect','test_type','2026-10-02','2026-10-03','1','test')", [runId, userA]);
    await db.query("insert into public.sim_flags(run_id,user_id,flag_key,value,set_on,source_ref) values($1,$2,'test_flag',true,'2026-10-02','test')", [runId, userA]);
    for (const role of ['authenticated', 'anon']) {
      await db.exec(`set role ${role}; set request.jwt.claim.sub='${userA}'`);
      try {
        for (const table of ['sim_runs', 'sim_ledger', 'sim_effects', 'sim_flags']) {
          if (role === 'anon') await expect(db.query(`select * from public.${table}`)).rejects.toThrow();
          else expect((await db.query<{ user_id: string }>(`select user_id from public.${table}`)).rows.every(row => row.user_id === userA)).toBe(true);
        }
      } finally { await db.exec('reset role'); }
    }
  });
  it('client roles cannot mutate any simulator table or execute private functions', async () => {
    for (const role of ['anon', 'authenticated']) {
      await db.exec(`set role ${role}`);
      try {
        for (const table of ['sim_runs', 'sim_ledger', 'sim_effects', 'sim_flags']) {
          for (const statement of [`insert into public.${table} default values`, `update public.${table} set user_id='${userB}'`, `delete from public.${table}`]) await expect(db.query(statement)).rejects.toThrow();
        }
        await expect(db.query('select public.read_simulator_state($1)', [userA])).rejects.toThrow();
        await expect(db.query("select public.apply_simulator_settlement($1,$2,null,'2026-10-02','[]')", [userA, runId])).rejects.toThrow();
        await expect(db.query("select public.start_simulator_run($1,'{}','[]')", [userA])).rejects.toThrow();
      } finally { await db.exec('reset role'); }
    }
  });
  it('private RPCs are invoker, safe search_path, service-only and use a row lock', async () => {
    const result = await db.query<{ name: string; definer: boolean; service: boolean; client: boolean; public_grant: boolean; config: string[] }>("select proname as name,prosecdef as definer,has_function_privilege('service_role',oid,'EXECUTE') as service,has_function_privilege('authenticated',oid,'EXECUTE') as client,exists(select 1 from aclexplode(proacl) where grantee=0 and privilege_type='EXECUTE') as public_grant,proconfig as config from pg_proc where proname in ('start_simulator_run','apply_simulator_settlement','read_simulator_state')");
    expect(result.rows).toHaveLength(3);
    for (const row of result.rows) { expect(row).toMatchObject({ definer: false, service: true, client: false, public_grant: false }); expect(row.config.join()).toContain('search_path='); }
    expect(sql).toMatch(/for update/i);
    await db.exec('set role service_role');
    try { expect((await db.query('select public.read_simulator_state($1)', [userA])).rows).toHaveLength(1); }
    finally { await db.exec('reset role'); }
  });
  it('creation is atomic with starting-day ledger, duplicate start returns existing run', async () => {
    const run = await newRun();
    expect(await start(run)).toEqual({ created: true, runId: run.id });
    expect(await start({ ...run, id: crypto.randomUUID() })).toEqual({ created: false, runId: run.id });
    const result = await db.query<{ day: string; count: number }>('select last_settled_on::text as day,(select count(*)::integer from public.sim_ledger where run_id=$1) as count from public.sim_runs where id=$1', [run.id]);
    expect(result.rows).toEqual([{ day: '2026-10-02', count: 1 }]);
  });
  it('malformed initial settlement rolls back the entire new run', async () => {
    const run = await newRun();
    await expect(db.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb)', [run.userId, JSON.stringify(run), '[{}]'])).rejects.toThrow();
    expect((await db.query('select id from public.sim_runs where id=$1', [run.id])).rows).toEqual([]);
  });
  it('queued simultaneous start calls arbitrate one active run via the unique index', async () => {
    const run = await newRun();
    // PGlite queues one connection: validates arbitration, not multi-session locking.
    const results = await Promise.all([start(run), start({ ...run, id: crypto.randomUUID(), housing: 'chirie' })]);
    expect(results.map(r => r.created).sort()).toEqual([false, true]);
    expect(new Set(results.map(r => r.runId)).size).toBe(1);
    expect((await db.query('select id from public.sim_runs where user_id=$1', [run.userId])).rows).toHaveLength(1);
  });
  it('CAS rejects competing old cursors, duplicate identities remain single, empty days advance', async () => {
    const run = await newRun(); await start(run);
    const prior = settle(run, [], run.startedOn).newEntries;
    const next = settle({ ...run, lastSettledOn: run.startedOn }, prior, day('2026-10-06'));
    expect(await apply(run, run.startedOn, '2026-10-06', next.newEntries)).toEqual({ status: 'applied' });
    expect(await apply(run, run.startedOn, '2026-10-06', next.newEntries)).toEqual({ status: 'conflict' });
    expect(await apply(run, '2026-10-06', '2026-10-07', next.newEntries)).toEqual({ status: 'applied' });
    expect((await db.query<{ count: number }>('select count(*)::integer as count from public.sim_ledger where run_id=$1', [run.id])).rows[0].count).toBe(2);
    expect(await apply(run, '2026-10-07', '2026-10-08', [])).toEqual({ status: 'applied' });
    await expect(apply(run, '2026-10-08', '2026-10-07', [])).rejects.toThrow();
  });
  it('failed second entry rolls back first entry and cursor; semantic mismatches reject', async () => {
    const run = await newRun(); await start(run);
    const next = settle({ ...run, lastSettledOn: run.startedOn }, [], day('2026-10-15')).newEntries;
    await expect(apply(run, run.startedOn, '2026-10-15', [next[0], { ...next[1], sequence: -1 }])).rejects.toThrow();
    expect((await db.query<{ count: number }>('select count(*)::integer as count from public.sim_ledger where run_id=$1', [run.id])).rows[0].count).toBe(1);
    expect(await apply(run, run.startedOn, '2026-10-15', next)).toEqual({ status: 'applied' });
    await expect(apply(run, '2026-10-15', '2026-10-16', [{ ...next[0], amountBani: next[1].amountBani }])).rejects.toThrow('ref mismatch');
  });
  it('owner mismatch, inactive run and mismatched composite owner FK reject', async () => {
    await expect(db.query("select public.apply_simulator_settlement($1,$2,'2026-10-02','2026-10-03','[]')", [userB, runId])).rejects.toThrow('owner');
    for (const query of ["insert into public.sim_ledger(run_id,user_id,day,sequence,kind,category,amount_bani,label,ref_key) values($1,$2,'2026-10-02',100,'ajustare','venit',1,'Test','wrong_owner')", "insert into public.sim_effects(run_id,user_id,effect_key,effect_type,starts_on,ends_on,value,source_ref) values($1,$2,'wrong_owner','test','2026-10-02','2026-10-03','1','test')", "insert into public.sim_flags(run_id,user_id,flag_key,value,set_on,source_ref) values($1,$2,'wrong_owner',true,'2026-10-02','test')"]) await expect(db.query(query, [runId, userB])).rejects.toThrow();
    const run = await newRun(); await start(run); await db.query("update public.sim_runs set status='inchis' where id=$1", [run.id]);
    await expect(apply(run, run.startedOn, '2026-10-03', [])).rejects.toThrow('run');
  });
  it('effects enforce date range and semantic identity; snapshot columns agree', async () => {
    await expect(db.query("insert into public.sim_effects(run_id,user_id,effect_key,effect_type,starts_on,ends_on,value,source_ref) values($1,$2,'invalid','test','2026-10-05','2026-10-04','1','test')", [runId, userA])).rejects.toThrow();
    await expect(db.query("insert into public.sim_effects(run_id,user_id,effect_key,effect_type,starts_on,ends_on,value,source_ref) values($1,$2,'test_effect','test','2026-10-02','2026-10-03','1','test')", [runId, userA])).rejects.toThrow();
    await expect(db.query('update public.sim_runs set monthly_income_bani=1 where id=$1', [runId])).rejects.toThrow();
  });
  it('deleting the auth account cascades only that account simulator data', async () => {
    await db.query('delete from auth.users where id=$1', [userA]);
    for (const table of ['sim_runs', 'sim_ledger', 'sim_effects', 'sim_flags']) expect((await db.query(`select * from public.${table} where user_id=$1`, [userA])).rows).toEqual([]);
    expect((await db.query('select * from public.sim_runs where user_id=$1', [userB])).rows).toHaveLength(1);
  });
});
