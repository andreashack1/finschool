import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { describe,it,expect,beforeAll,afterAll } from 'vitest';
import { createEmptyProgress,completeLessonSession,getCorrectAnswerId,isAnswerScreen,calculateStreak } from '../src/lib/progress';
import { getFirstCurriculumLesson } from '../src/lib/account/first-lesson';
let db:PGlite;
const a='11111111-1111-4111-8111-111111111111',b='22222222-2222-4222-8222-222222222222';
const metadata=(username:string)=>JSON.stringify({username,age_range:'16-17',terms:true,privacy:true,terms_version:'2026-10-draft',privacy_version:'2026-10-draft'});
describe('Actual Postgres migration and RLS',()=>{
  beforeAll(async()=>{db=new PGlite();await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,raw_user_meta_data jsonb);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema public,auth to anon,authenticated,service_role;");await db.exec(readFileSync('supabase/migrations/0001_accounts_and_progress.sql','utf8'));await db.exec(readFileSync('supabase/migrations/0002_username_check.sql','utf8'));await db.query('insert into auth.users values($1,$2::jsonb),($3,$4::jsonb)',[a,metadata('alpha_user'),b,metadata('beta_user')]);},30000);
  afterAll(async()=>{await db?.close();});
  it('profile trigger creates profile and consent records',async()=>{const result=await db.query<{count:number}>('select count(*)::integer as count from public.user_consents where user_id=$1',[a]);expect(result.rows[0].count).toBe(2);});
  it('missing, null or outdated consent versions reject signup atomically',async()=>{
    for(const key of ['terms_version','privacy_version'])for(const value of [undefined,null,'old']){
      const id=crypto.randomUUID();const input={...JSON.parse(metadata('consent_user')),[key]:value};
      await expect(db.query('insert into auth.users values($1,$2::jsonb)',[id,JSON.stringify(input)])).rejects.toThrow('invalid consent');
      expect((await db.query('select id from auth.users where id=$1',[id])).rows).toEqual([]);
    }
  });
  it('every account table enables RLS and denies direct client writes',async()=>{
    const tables=['profiles','user_consents','lesson_progress','xp_events','activity_days','streak_freeze_days','user_stats','user_achievements','daily_challenge_answers','processed_operations','reserved_usernames'];
    for(const table of tables){
      const result=await db.query<{enabled:boolean;client_write:boolean}>("select relrowsecurity as enabled,has_table_privilege('authenticated',oid,'INSERT,UPDATE,DELETE') as client_write from pg_class where oid=$1::regclass",[`public.${table}`]);
      expect(result.rows).toEqual([{enabled:true,client_write:false}]);
    }
  });
  it('stats reject negative streak, revision and invalid freeze balances',async()=>{
    for(const values of ['-1,0,0,0','0,-1,0,0','0,2,1,0','0,0,0,-1','0,0,0,3'])await expect(db.query(`insert into public.user_stats(user_id,revision,streak_current,streak_longest,streak_freezes) values($1,${values})`,[b])).rejects.toThrow();
  });
  it('unique username and reserved/age constraints are enforced',async()=>{await expect(db.query('insert into auth.users values($1,$2::jsonb)',[crypto.randomUUID(),metadata('alpha_user')])).rejects.toThrow();await expect(db.query('insert into auth.users values($1,$2::jsonb)',[crypto.randomUUID(),metadata('admin')])).rejects.toThrow();await expect(db.query('insert into auth.users values($1,$2::jsonb)',[crypto.randomUUID(),JSON.stringify({...JSON.parse(metadata('young_user')),age_range:'14-15',parental_consent:false})])).rejects.toThrow();});
  it('A can select only A profile, anon cannot read progress',async()=>{await db.exec(`set role authenticated;set request.jwt.claim.sub='${a}';`);const rows=await db.query<{id:string}>('select id from public.profiles');expect(rows.rows.map(r=>r.id)).toEqual([a]);await db.exec('reset role;set role anon');await expect(db.query('select * from public.xp_events')).rejects.toThrow();await db.exec('reset role');});
  it('authenticated cannot write XP, lessons, streak or call private RPC',async()=>{await db.exec('set role authenticated');for(const sql of ['insert into public.xp_events(user_id) values(null)','update public.lesson_progress set attempts=999','update public.user_stats set streak_current=999',`select public.read_account_progress('${a}')`])await expect(db.query(sql)).rejects.toThrow();await db.exec('reset role');});
  it('anonymous username function returns only a boolean',async()=>{await db.exec('set role anon');const result=await db.query<{available:boolean}>("select public.username_available('new_user') as available");expect(result.rows).toEqual([{available:true}]);await db.exec('reset role');});
  it('username repair is idempotent, normalizes and keeps tables private',async()=>{
    await db.exec(readFileSync('supabase/migrations/0002_username_check.sql','utf8'));
    for(const role of ['anon','authenticated']){
      await db.exec(`set role ${role}`);
      try {
        for(const [candidate,expected] of [[' New_User ',true],[' ALPHA_USER ',false],[' ADMIN ',false],['finly',false],['support',false],['ab',false],['abcdefghijklmnopqrstu',false],['fab ian',false],['fabian!',false],[null,false]]){
          const result=await db.query<{available:boolean}>('select public.username_available($1) as available',[candidate]);expect(result.rows).toEqual([{available:expected}]);
        }
        if(role==='anon')await expect(db.query('select * from public.profiles')).rejects.toThrow();
        await expect(db.query('select * from public.reserved_usernames')).rejects.toThrow();
      }finally{await db.exec('reset role');}
    }
    expect((await db.query<{allowed:boolean}>("select exists(select 1 from information_schema.routine_privileges where routine_name='username_available' and grantee='PUBLIC') as allowed")).rows[0].allowed).toBe(false);
  });
  it('atomic CAS, operation idempotency and semantic XP uniqueness',async()=>{const lesson=getFirstCurriculumLesson()!;const now=new Date('2026-10-05T12:00:00Z');const op=crypto.randomUUID();const result=completeLessonSession(createEmptyProgress(now),{lessonId:lesson.id,sessionId:op,answers:lesson.screens.filter(isAnswerScreen).map(s=>({screenId:s.id,selectedOptionId:getCorrectAnswerId(s)!}))},now);const streak=calculateStreak(result.progress,'2026-10-05');const args=[a,op,'completeLesson',0,JSON.stringify(result.progress),JSON.stringify(result),streak.current,streak.longest];const sql='select public.apply_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8) as result';const first=await db.query<{result:{status:string}}>(sql,args);expect(first.rows[0].result.status).toBe('applied');const duplicate=await db.query<{result:{status:string}}>(sql,args);expect(duplicate.rows[0].result.status).toBe('duplicate');const stale=await db.query<{result:{status:string}}>(sql,[a,crypto.randomUUID(),...args.slice(2)]);expect(stale.rows[0].result.status).toBe('conflict');const events=await db.query<{count:number}>('select count(*)::integer as count from public.xp_events where user_id=$1',[a]);expect(events.rows[0].count).toBe(result.progress.xp_events.length);});
  it('deleting auth user cascades every user-owned record',async()=>{await db.query('insert into public.streak_freeze_days(user_id,day) values($1,$2)',[a,'2026-10-04']);await db.query("insert into public.daily_challenge_answers(user_id,day,challenge_id,selected_option_id,correct,answered_at) values($1,'2026-10-05','test','choice',true,now())",[a]);await db.query('delete from auth.users where id=$1',[a]);for(const table of ['profiles','user_consents','lesson_progress','xp_events','activity_days','streak_freeze_days','user_stats','user_achievements','daily_challenge_answers','processed_operations']){const column=table==='profiles'?'id':'user_id';const rows=await db.query(`select * from public.${table} where ${column}=$1`,[a]);expect(rows.rows).toEqual([]);}const other=await db.query('select * from public.profiles where id=$1',[b]);expect(other.rows).toHaveLength(1);});
});
