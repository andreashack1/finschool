import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { beforeAll,afterAll,describe,it,expect } from 'vitest';
import { createEmptyProgress,finishAction,calculateStreak } from '../src/lib/progress';
import { buildStreakMoments } from '../src/lib/streak-moments';
let db:PGlite;
const user='11111111-1111-4111-8111-111111111111',other='22222222-2222-4222-8222-222222222222';
const now=new Date('2026-10-06T12:00:00Z');
const before=createEmptyProgress(now),next=finishAction(before,before,[],now,true).progress;
const drafts=buildStreakMoments(before,next,now);
const apply=(revision:number,operation:string,state=next,moments=drafts)=>db.query<{result:{status:string}}>('select public.apply_streak_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8,$9::jsonb) result',[user,operation,'completeLesson',revision,JSON.stringify(state),'{}',calculateStreak(state,'2026-10-06').current,calculateStreak(state,'2026-10-06').longest,JSON.stringify(moments)]);
const claim=(owner:string,token:string)=>db.query<{events:{id:string}[]}>('select public.claim_streak_moments($1,$2) events',[owner,token]);
describe('Actual streak outbox transaction, lease and RLS',()=>{
  beforeAll(async()=>{
    db=new PGlite();await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,raw_user_meta_data jsonb);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema public,auth to anon,authenticated,service_role;");
    for(const name of ['0001_accounts_and_progress.sql','0002_username_check.sql','0011_streak_freeze_moments.sql'])await db.exec(readFileSync(`supabase/migrations/${name}`,'utf8'));
    for(const [id,username] of [[user,'moment_alpha'],[other,'moment_beta']])await db.query('insert into auth.users values($1,$2::jsonb)',[id,JSON.stringify({username,age_range:'18-19',terms:true,privacy:true,terms_version:'2026-10-draft',privacy_version:'2026-10-draft'})]);
  },30000);
  afterAll(async()=>{await db?.close();});
  it('two operations with same revision yield one transition; UUID retry is duplicate',async()=>{
    const operation=crypto.randomUUID();const results=await Promise.all([apply(0,operation),apply(0,crypto.randomUUID())]);
    expect(results.map(r=>r.rows[0].result.status)).toEqual(['applied','conflict']);expect((await apply(0,operation)).rows[0].result.status).toBe('duplicate');
    expect((await db.query('select * from public.activity_days where user_id=$1',[user])).rows).toHaveLength(1);
    expect((await db.query('select * from public.streak_moments where user_id=$1',[user])).rows).toHaveLength(1);
    expect((await apply(1,crypto.randomUUID())).rows[0].result.status).toBe('applied');
    expect((await db.query('select * from public.streak_moments')).rows).toHaveLength(1);
  });
  it('lost response leaves an event; competing phone/PC claims are exclusive; ack is durable',async()=>{
    const phone=crypto.randomUUID(),pc=crypto.randomUUID();
    const result=(await claim(user,phone)).rows[0].events;expect(result).toHaveLength(1);
    expect((await claim(user,pc)).rows[0].events).toEqual([]);
    expect((await claim(user,phone)).rows[0].events).toEqual(result);
    expect((await claim(other,pc)).rows[0].events).toEqual([]);
    const ids=result.map(r=>r.id);
    expect((await db.query<{ok:boolean}>('select public.acknowledge_streak_moments($1,$2,$3) ok',[other,phone,ids])).rows[0].ok).toBe(false);
    expect((await db.query<{ok:boolean}>('select public.acknowledge_streak_moments($1,$2,$3) ok',[user,pc,ids])).rows[0].ok).toBe(false);
    for(let i=0;i<2;i++)expect((await db.query<{ok:boolean}>('select public.acknowledge_streak_moments($1,$2,$3) ok',[user,phone,ids])).rows[0].ok).toBe(true);
    expect((await claim(user,pc)).rows[0].events).toEqual([]);
  });
  it('expired reservation recovers a closed tab before presentation',async()=>{
    await db.query("update public.streak_moments set acknowledged_at=null,claim_until=now()-interval '1 second'");
    expect((await claim(user,crypto.randomUUID())).rows[0].events).toHaveLength(1);
  });
  it('invalid outbox insert rolls back business truth in the same transaction',async()=>{
    const stats=(await db.query<{revision:number}>('select revision from public.user_stats where user_id=$1',[user])).rows[0];
    const invalid=[{...drafts[0],type:'untrusted_type'}] as unknown as typeof drafts;
    await expect(apply(Number(stats.revision),crypto.randomUUID(),next,invalid)).rejects.toThrow();
    expect((await db.query('select revision from public.user_stats where user_id=$1',[user])).rows[0]).toEqual(stats);
  });
  it('owner can read; other account and anon cannot; direct payload/ack writes and RPC denied',async()=>{
    await db.exec(`set role authenticated;set request.jwt.claim.sub='${user}';`);expect((await db.query('select id from public.streak_moments')).rows).toHaveLength(1);
    for(const sql of ["update public.streak_moments set acknowledged_at=now()","insert into public.streak_moments(user_id) values(null)",`select public.claim_streak_moments('${user}','${crypto.randomUUID()}')`])await expect(db.query(sql)).rejects.toThrow();
    await db.exec(`set request.jwt.claim.sub='${other}';`);expect((await db.query('select id from public.streak_moments')).rows).toEqual([]);
    await db.exec('reset role;set role anon');await expect(db.query('select id from public.streak_moments')).rejects.toThrow();await db.exec('reset role');
  });
  it('private wrapper works with actual service role privileges',async()=>{
    await db.exec('set role service_role');expect((await claim(other,crypto.randomUUID())).rows[0].events).toEqual([]);await db.exec('reset role');
  });
  it('late real activity suppresses obsolete pending Freeze/break snapshots atomically',async()=>{
    for(const type of ['freeze_consumed','streak_broken'])await db.query('insert into public.streak_moments(user_id,type,semantic_key,effective_day,payload) values($1,$2,$3,$4,$5::jsonb)',[other,type,`${type}:2026-10-06`,'2026-10-06',JSON.stringify(drafts[0].payload)]);
    await db.query('select public.apply_streak_progress_mutation($1,$2,$3,0,$4::jsonb,$5::jsonb,1,1,$6::jsonb)',[other,crypto.randomUUID(),'answerDailyChallenge',JSON.stringify(next),'{}',JSON.stringify(drafts)]);
    const pending=await db.query<{type:string}>('select type from public.streak_moments where user_id=$1 and acknowledged_at is null',[other]);expect(pending.rows).toEqual([{type:'streak_incremented'}]);
    expect((await db.query('select id from public.streak_moments where user_id=$1',[other])).rows).toHaveLength(3);
  });
});
