import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { beforeAll, afterAll, describe, it, expect, vi } from 'vitest';
import type { User } from '@supabase/supabase-js';
const bridge=vi.hoisted(()=>({rpc:vi.fn()}));
vi.mock('server-only',()=>({}));
vi.mock('../src/lib/supabase/admin',()=>({adminSupabase:()=>bridge}));
import { getAccountSnapshot, mutateAccountProgress } from '../src/lib/account/repository';
import { isMissingStreakRpc } from '../src/lib/account/streak-rpc';
import { getFirstCurriculumLesson } from '../src/lib/account/first-lesson';
import { getCorrectAnswerId, isAnswerScreen, getTotalXp } from '../src/lib/progress';
import { OperationSchema } from '../src/lib/account/contracts';
const id='66666666-6666-4666-8666-666666666666';
const user={id,email:'compatibility@example.test',created_at:new Date(Date.now()-60000).toISOString()} as User;
const missing=(name:string)=>({code:'PGRST202',message:`Could not find the function public.${name}(p_user) in the schema cache`});
let db:PGlite;
describe('Progress remains available before presentation migration',()=>{
  beforeAll(async()=>{
    db=new PGlite();
    await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,raw_user_meta_data jsonb);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;");
    // Intentionally only the deployed business migration: no outbox or new RPC.
    await db.exec(readFileSync('supabase/migrations/0001_accounts_and_progress.sql','utf8'));
    await db.query('insert into auth.users values($1,$2::jsonb)',[id,JSON.stringify({username:'compatibility_user',age_range:'20+',terms:true,privacy:true,terms_version:'2026-10-draft',privacy_version:'2026-10-draft'})]);
    bridge.rpc.mockImplementation(async(name:string,args:Record<string,unknown>)=>{
      if(name==='apply_streak_progress_mutation')return {data:null,error:missing(name)};
      const read=name==='read_account_progress';
      const sql=read?'select public.read_account_progress($1) as result':'select public.apply_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8) as result';
      const values=read?[args.p_user]:[args.p_user,args.p_operation,args.p_type,args.p_revision,JSON.stringify(args.p_state),JSON.stringify(args.p_result),args.p_streak,args.p_longest];
      try{const result=await db.query<{result:unknown}>(sql,values);return {data:result.rows[0].result,error:null};}catch(error){return {data:null,error};}
    });
  },30000);
  afterAll(async()=>{await db.close();});
  it('loads and initializes progress through the existing locked transaction',async()=>{
    const first=await getAccountSnapshot(user),again=await getAccountSnapshot(user);
    expect(first.userId).toBe(id);expect(first.progress.freezeBalance).toBe(2);
    expect(getTotalXp(first.progress)).toBe(0);expect(again.revision).toBe(first.revision);
    expect(bridge.rpc.mock.calls.some(([name])=>name==='apply_progress_mutation')).toBe(true);
  });
  it('saves a lesson, streak and rewards durably and deduplicates its retry',async()=>{
    const lesson=getFirstCurriculumLesson();
    const operation=OperationSchema.parse({operationId:crypto.randomUUID(),type:'completeLesson',occurredAt:new Date().toISOString(),payload:{lessonId:lesson.id,answers:lesson.screens.filter(isAnswerScreen).map(screen=>({screenId:screen.id,selectedOptionId:getCorrectAnswerId(screen)}))}});
    const first=await mutateAccountProgress(user,operation),again=await mutateAccountProgress(user,operation);
    expect(first.snapshot.statsSummary.currentStreak).toBe(1);expect(again.duplicate).toBe(true);
    expect(getTotalXp(again.snapshot.progress)).toBe(getTotalXp(first.snapshot.progress));
    expect(again.snapshot.progress.lessonStats[lesson.id].completionCount).toBe(1);
    expect((await db.query('select day from public.activity_days where user_id=$1',[id])).rows).toHaveLength(1);
    expect((await db.query('select operation_id from public.processed_operations where user_id=$1',[id])).rows).toHaveLength(1);
  });
  it('never falls back for permission or transaction failures',async()=>{
    const achievement=Object.keys((await getAccountSnapshot(user)).progress.achievementUnlocks)[0];
    expect(achievement).toBeTruthy();
    const implementation=bridge.rpc.getMockImplementation()!;
    bridge.rpc.mockImplementation((name,args)=>name==='apply_streak_progress_mutation'?Promise.resolve({data:null,error:{code:'42501',message:'permission denied'}}):implementation(name,args));
    const before=bridge.rpc.mock.calls.filter(([name])=>name==='apply_progress_mutation').length;
    try{
      await expect(mutateAccountProgress(user,OperationSchema.parse({operationId:crypto.randomUUID(),type:'achievementSeen',occurredAt:new Date().toISOString(),payload:{id:achievement}}))).rejects.toMatchObject({code:'SERVER_ERROR'});
      expect(bridge.rpc.mock.calls.filter(([name])=>name==='apply_progress_mutation')).toHaveLength(before);
    }finally{bridge.rpc.mockImplementation(implementation);}
  });
  it('recognizes only the exact missing presentation function',()=>{
    expect(isMissingStreakRpc(missing('apply_streak_progress_mutation'),'apply_streak_progress_mutation')).toBe(true);
    expect(isMissingStreakRpc(missing('read_account_progress'),'apply_streak_progress_mutation')).toBe(false);
    expect(isMissingStreakRpc({code:'PGRST000',message:'connection unavailable'},'apply_streak_progress_mutation')).toBe(false);
  });
});
