import { accountProgressSummary } from '../src/lib/account/mapping';
import { describe,it,expect,vi,beforeEach,afterEach } from 'vitest';
import { createEmptyProgress,getCorrectAnswerId,getTotalXp,isAnswerScreen } from '../src/lib/progress';
import { getFirstCurriculumLesson } from '../src/lib/account/first-lesson';
import { OperationSchema,type AccountProgressSnapshot,type MutationResponse } from '../src/lib/account/contracts';
import { applyAccountOperation } from '../src/lib/account/domain';
const a='11111111-1111-4111-8111-111111111111',b='22222222-2222-4222-8222-222222222222';
let values:Map<string,string>,online:boolean,activeUser:string,postMode:'success'|'lost'|'invalid'|'401';
let snapshots:Map<string,AccountProgressSnapshot>,processed:Map<string,MutationResponse>,posts:string[];
let runtime:typeof import('../src/lib/use-progress'),storage:typeof import('../src/lib/account/storage'),dispose:(()=>void)|undefined;
beforeEach(async()=>{
  vi.resetModules();values=new Map();online=true;activeUser=a;postMode='success';posts=[];processed=new Map();
  const created=new Date(Date.now()-86400000).toISOString();snapshots=new Map([a,b].map(id=>[id,{version:1,userId:id,revision:1,email:null,serverTime:new Date().toISOString(),profile:{id,username:id===a?'alpha_user':'beta_user',display_name:null,age_range:'20+',parental_consent:false,parental_consent_at:null,locale:'ro',created_at:created,updated_at:created},progress:createEmptyProgress(new Date(created)),statsSummary:accountProgressSummary(createEmptyProgress(new Date(created)),new Date())}]));
  vi.stubGlobal('localStorage',{getItem:(key:string)=>values.get(key)??null,setItem:(key:string,value:string)=>values.set(key,value),removeItem:(key:string)=>values.delete(key),get length(){return values.size;},key:(index:number)=>[...values.keys()][index]??null});
  vi.stubGlobal('navigator',{get onLine(){return online;}});
  vi.stubGlobal('BroadcastChannel',undefined);
  vi.stubGlobal('window',{addEventListener:()=>{},removeEventListener:()=>{},setInterval:()=>0,clearInterval:()=>{},location:{origin:'https://finly.test',replace:vi.fn()}});
  vi.stubGlobal('document',{hidden:false,addEventListener:()=>{},removeEventListener:()=>{}});
  vi.stubGlobal('fetch',vi.fn(async(_url:string,init?:RequestInit)=>{
    const current=snapshots.get(activeUser)!;
    if(new Headers(init?.headers).get('X-Finly-Account')!==activeUser)return Response.json({error:{code:'AUTH_REQUIRED'}},{status:401});
    if(!init?.method || init.method==='GET')return Response.json(current);
    const operation=OperationSchema.parse(JSON.parse(String(init.body)));posts.push(`${activeUser}:${operation.operationId}`);
    if(postMode==='401')return Response.json({error:{code:'AUTH_REQUIRED'}},{status:401});
    if(postMode==='invalid')return Response.json({error:{code:'INVALID_OPERATION'}},{status:400});
    let result=processed.get(operation.operationId);
    if(!result){const mutationResult=applyAccountOperation(current.progress,operation,current.profile.created_at,new Date());const snapshot={...current,revision:current.revision+1,progress:mutationResult.progress,statsSummary:accountProgressSummary(mutationResult.progress,new Date()),serverTime:new Date().toISOString()};snapshots.set(activeUser,snapshot);result={mutationResult,snapshot,duplicate:false};processed.set(operation.operationId,result);}
    else result={...result,snapshot:snapshots.get(activeUser)!,duplicate:true};
    if(postMode==='lost'){postMode='success';throw new Error('response lost after commit');}
    return Response.json(result);
  }));
  runtime=await import('../src/lib/use-progress');storage=await import('../src/lib/account/storage');dispose=runtime.initializeAccount(a);await runtime.refreshProgress();
});
afterEach(()=>{dispose?.();vi.unstubAllGlobals();});
const session=()=>{const lesson=getFirstCurriculumLesson();return {lessonId:lesson.id,sessionId:crypto.randomUUID(),answers:lesson.screens.filter(isAnswerScreen).map(s=>({screenId:s.id,selectedOptionId:getCorrectAnswerId(s)!}))};};
describe('Account queue runtime',()=>{
  it('offline completion queues evidence and reconnect replaces with authority',async()=>{online=false;const input=session();const optimistic=await runtime.finishLessonSession(input);expect(optimistic.xpGained).toBeGreaterThan(0);expect(storage.readQueue(a)).toHaveLength(1);expect(getTotalXp(snapshots.get(a)!.progress)).toBe(0);online=true;await runtime.flushProgressQueue();expect(storage.readQueue(a)).toEqual([]);expect(getTotalXp(storage.readAccountCache(a)!.progress)).toBe(getTotalXp(snapshots.get(a)!.progress));});
  it('lost response retries same UUID and never adds reward or attempt twice',async()=>{postMode='lost';const input=session();await runtime.finishLessonSession(input);expect(storage.readQueue(a)).toHaveLength(1);const xp=getTotalXp(snapshots.get(a)!.progress);await runtime.flushProgressQueue();expect(storage.readQueue(a)).toHaveLength(0);expect(posts).toEqual([`${a}:${input.sessionId}`,`${a}:${input.sessionId}`]);expect(getTotalXp(snapshots.get(a)!.progress)).toBe(xp);expect(snapshots.get(a)!.progress.lessonStats[input.lessonId].completionCount).toBe(1);});
  it('validation rejection removes operation and rolls back cache',async()=>{postMode='invalid';await expect(runtime.finishLessonSession(session())).rejects.toThrow();expect(storage.readQueue(a)).toEqual([]);expect(getTotalXp(storage.readAccountCache(a)!.progress)).toBe(0);});
  it('401 preserves A queue but clears cache; B never sends A operations',async()=>{online=false;const input=session();await runtime.finishLessonSession(input);online=true;postMode='401';await runtime.flushProgressQueue();expect(storage.readQueue(a)).toHaveLength(1);expect(storage.readAccountCache(a)).toBeNull();dispose?.();activeUser=b;postMode='success';dispose=runtime.initializeAccount(b);await runtime.refreshProgress();await runtime.flushProgressQueue();expect(posts.every(value=>value.startsWith(a+':'))).toBe(true);expect(getTotalXp(storage.readAccountCache(b)!.progress)).toBe(0);expect(storage.readQueue(a)).toHaveLength(1);});
  it('explicit logout clears cache and pending queue',async()=>{online=false;await runtime.finishLessonSession(session());runtime.cleanupAccount();expect(storage.readQueue(a)).toEqual([]);expect(storage.readAccountCache(a)).toBeNull();});
  it('failed logout hides A and clears only A local data, preserving trial and B',async()=>{
    online=false;await runtime.finishLessonSession(session());storage.writeAccountCache(snapshots.get(b)!);values.set('finly-onboarding-progress:v1','temporary-trial');
    runtime.cleanupAccount(true);expect(storage.readQueue(a)).toEqual([]);expect(storage.readAccountCache(a)).toBeNull();expect(storage.readAccountCache(b)?.userId).toBe(b);expect(values.get('finly-onboarding-progress:v1')).toBe('temporary-trial');
    await runtime.refreshProgress();expect(storage.readAccountCache(a)).toBeNull();await expect(runtime.finishLessonSession(session())).rejects.toThrow();
  });
  it('denied storage keeps pending evidence in memory and synchronizes it',async()=>{
    vi.stubGlobal('localStorage',{getItem:()=>{throw Error('denied');},setItem:()=>{throw Error('denied');},removeItem:()=>{throw Error('denied');}});
    online=false;await runtime.finishLessonSession(session());expect(storage.readQueue(a)).toHaveLength(1);
    online=true;await runtime.flushProgressQueue();expect(storage.readQueue(a)).toEqual([]);expect(getTotalXp(snapshots.get(a)!.progress)).toBeGreaterThan(0);
  });
  it('FIFO queue drains sequentially',async()=>{online=false;const one=session(),two=session();await runtime.finishLessonSession(one);await runtime.finishLessonSession(two);online=true;await runtime.flushProgressQueue();expect(posts).toEqual([`${a}:${one.sessionId}`,`${a}:${two.sessionId}`]);expect(snapshots.get(a)!.progress.lessonStats[one.lessonId].completionCount).toBe(2);});
  it('a forged high cache revision never overrides the server',async()=>{dispose?.();storage.writeAccountCache({...snapshots.get(a)!,revision:99999,progress:{...snapshots.get(a)!.progress,xp_events:[{id:'forged',type:'lesson_completion',amount:99999,createdAt:new Date().toISOString(),bucharestDateKey:'2026-10-05'}]}});dispose=runtime.initializeAccount(a);await runtime.refreshProgress();expect(storage.readAccountCache(a)!.revision).toBe(1);expect(getTotalXp(storage.readAccountCache(a)!.progress)).toBe(0);});
  it('online initialization does not expose cached progress before cloud responds',async()=>{
    dispose?.();storage.writeAccountCache({...snapshots.get(a)!,revision:99999});
    vi.mocked(fetch).mockImplementation(()=>new Promise(()=>{}));
    dispose=runtime.initializeAccount(a);
    expect(storage.readAccountCache(a)!.revision).toBe(99999);
    await expect(runtime.finishLessonSession(session())).rejects.toThrow();
    expect(storage.readQueue(a)).toEqual([]);
  });
  it('already offline initialization can resume the same account from cache',async()=>{
    dispose?.();online=false;dispose=runtime.initializeAccount(a);
    await runtime.finishLessonSession(session());expect(storage.readQueue(a)).toHaveLength(1);
  });
  it('changing the cookie account in another tab cannot apply A queue to B',async()=>{online=false;await runtime.finishLessonSession(session());activeUser=b;online=true;await runtime.flushProgressQueue();expect(storage.readQueue(a)).toHaveLength(1);expect(getTotalXp(snapshots.get(b)!.progress)).toBe(0);expect(processed.size).toBe(0);});
});
