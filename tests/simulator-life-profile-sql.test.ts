import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { lifeProfileConfig } from '../src/content/simulator/life-profile-config';
import type { LifeProfile } from '../src/lib/simulator/life-profile';
import { fixtureRun } from './simulator-fixtures';
import { settle } from '../src/lib/simulator/settle';

let db: PGlite;
describe('Life profile atomic persistence on PostgreSQL', () => {
  beforeAll(async () => {
    db = new PGlite();
    await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema public,auth to authenticated,anon,service_role;");
    await db.exec(readFileSync('supabase/migrations/0003_simulator_foundation.sql','utf8'));
  },30000);
  afterAll(async () => { await db.close(); });
  const p: LifeProfile = {version:1,activityStatus:'lucrez',housingStatus:'chirie',transportMode:'public'};
  async function account() {
    const userId=crypto.randomUUID();await db.query('insert into auth.users values($1)',[userId]);
    return {...fixtureRun('2026-11-01',lifeProfileConfig(p),'chirie'),id:crypto.randomUUID(),userId};
  }
  async function start(run: ReturnType<typeof fixtureRun>, bad=false) {
    const entries=settle(run,[],run.startedOn).newEntries.map(e=>({...e,userId:run.userId,runId:run.id}));
    if(bad)entries[0].userId=crypto.randomUUID();
    return db.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb) as result',[run.userId,JSON.stringify(run),JSON.stringify(entries)]);
  }
  it('profile and first money commit once; two devices read the same profile', async () => {
    const run=await account();await Promise.all([start(run),start({...run,id:crypto.randomUUID()})]);
    const read=()=>db.query<{result:{run:{config_snapshot:{lifeProfile:LifeProfile}};ledger:unknown[]}}>('select public.read_simulator_state($1) as result',[run.userId]);
    const a=(await read()).rows[0].result,b=(await read()).rows[0].result;
    expect(a).toEqual(b);expect(a.run.config_snapshot.lifeProfile).toEqual(p);expect(a.ledger).toHaveLength(3);
    await start({...run,id:crypto.randomUUID(),configSnapshot:lifeProfileConfig({...p,housingStatus:'parinti'})});
    expect((await read()).rows[0].result).toEqual(a);
  });
  it('failed initial settlement rolls back the profile and can safely retry', async () => {
    const run=await account();await expect(start(run,true)).rejects.toThrow();
    expect((await db.query('select id from sim_runs where user_id=$1',[run.userId])).rows).toEqual([]);
    await start(run);expect((await db.query('select id from sim_runs where user_id=$1',[run.userId])).rows).toHaveLength(1);
  });
  it('RLS isolates snapshots and forbids client profile writes', async () => {
    const a=await account(),b=await account();await start(a);await start(b);
    await db.exec('set role authenticated');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[a.userId]);
    const rows=await db.query<{user_id:string}>('select user_id from sim_runs');expect(rows.rows.map(r=>r.user_id)).toEqual([a.userId]);
    await expect(db.query('update sim_runs set config_snapshot=$1 where user_id=$2',[JSON.stringify(lifeProfileConfig(p)),a.userId])).rejects.toThrow();
    await db.exec('reset role');
  });
});
