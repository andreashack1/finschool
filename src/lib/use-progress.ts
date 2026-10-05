'use client';
import { useSyncExternalStore } from 'react';
import { createEmptyProgress,getEffectiveDateKey,getTotalXp,getCompletedLessonIds,getSimulatorCompletionIds } from './progress';
import type { DomainResult,LessonSessionResult,SimulationState } from '../types/progress';
import { SnapshotSchema,type AccountProgressSnapshot,type ProgressOperation,type MutationResponse } from './account/contracts';
import { applyAccountOperation,neutralResult,simulatorChoices } from './account/domain';
import { clearAccountStorage,clearUnverifiedCaches,enqueue,readAccountCache,readQueue,writeAccountCache,writeQueue } from './account/storage';
import { errorCopy,type AccountErrorCode } from './account/errors';
import { broadcastAuthChange,listenAuthChanges } from './account/events';
type State={progress:ReturnType<typeof createEmptyProgress>;hydrated:boolean;todayKey:string|null;account:AccountProgressSnapshot|null;userId:string|null;isSyncing:boolean;pendingCount:number;syncError:string|null;notificationsReady:boolean;authTransition:boolean};
const initial:State={progress:createEmptyProgress(),hydrated:false,todayKey:null,account:null,userId:null,isSyncing:false,pendingCount:0,syncError:null,notificationsReady:false,authTransition:false};
let state=initial;let identity:string|null=null;let flushing:Promise<void>|null=null;let confirmedRevision:number|null=null;
const listeners=new Set<()=>void>();const emit=(update:Partial<State>)=>{state={...state,...update};listeners.forEach(l=>l());};
const subscribe=(listener:()=>void)=>{listeners.add(listener);return()=>{listeners.delete(listener);};};
function replace(snapshot:AccountProgressSnapshot,confirmed=true) {
  if(snapshot.userId!==identity)return;
  if(confirmed && confirmedRevision!==null && snapshot.revision<confirmedRevision)return;
  if(confirmed)confirmedRevision=snapshot.revision;
  writeAccountCache(snapshot);let progress=snapshot.progress;const pending=readQueue(snapshot.userId);
  for(const item of pending) {try{progress=applyAccountOperation(progress,item.operation,snapshot.profile.created_at,new Date()).progress;}catch{/* Rejected when sent. */}}
  emit({account:snapshot,progress,hydrated:true,todayKey:getEffectiveDateKey(progress,new Date()),pendingCount:pending.length});
}
export async function refreshProgress() {
  const userId=identity;if(!userId)return;
  try{const response=await fetch('/api/progress',{cache:'no-store',headers:{'X-Finly-Account':userId}});if(response.status===401){clearSessionDisplay(userId);return;}if(!response.ok){const body=await response.json();if(body.error?.code==='CONFIGURATION_ERROR'){emit({syncError:errorCopy.CONFIGURATION_ERROR});return;}throw new Error('network');}const snapshot=SnapshotSchema.parse(await response.json());if(identity===userId){replace(snapshot);emit({notificationsReady:true,syncError:state.pendingCount>0?state.syncError:null});}}
  catch{if(identity===userId)emit({syncError:state.hydrated?'Se va sincroniza când revii online.':'Nu putem încărca progresul acum. Reîncearcă.'});}
}
function clearSessionDisplay(userId:string) {if(identity!==userId)return;identity=null;results.clear();emit({...initial,syncError:errorCopy.AUTH_REQUIRED});try{localStorage.removeItem(`finly-account-cache:v1:${userId}`);}catch{}window.location.replace(new URL('/autentificare',window.location.origin).href);}
const results=new Map<string,DomainResult>();
const rejected=new Set<string>();
export function useOperationResult(operationId:string|null) {return useSyncExternalStore(subscribe,()=>operationId?results.get(operationId) ?? null:null,()=>null);}
function rememberResult(operationId:string,result:DomainResult) {results.set(operationId,result);while(results.size>64){const first=results.keys().next().value;if(first)results.delete(first);}}
async function queueTransaction(userId:string,action:()=>void) {if(navigator.locks)await navigator.locks.request(`finly-queue:${userId}`,action);else action();}
async function flushNow() {
  const userId=identity;if(!userId || !navigator.onLine)return;
  emit({isSyncing:true});
  try {
    while(identity===userId && navigator.onLine) {
      const item=readQueue(userId)[0];if(!item)break;
      await queueTransaction(userId,()=>{const items=readQueue(userId);const index=items.findIndex(value=>value.operation.operationId===item.operation.operationId);if(index>=0){items[index]={...items[index],attempts:items[index].attempts+1};writeQueue(userId,items);}});
      let response:Response;
      try{response=await fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json','X-Finly-Account':userId},body:JSON.stringify(item.operation)});}catch{emit({syncError:'Se va sincroniza când revii online.'});break;}
      if(identity!==userId)break;
      if(response.status===401){clearSessionDisplay(userId);break;}
      if(response.status>=500 || response.status===429){emit({syncError:'Se va sincroniza când revii online.'});break;}
      if(!response.ok){await queueTransaction(userId,()=>{writeQueue(userId,readQueue(userId).filter(i=>i.operation.operationId!==item.operation.operationId));});await refreshProgress();rejected.add(item.operation.operationId);if(state.account)rememberResult(item.operation.operationId,neutralResult(state.account.progress));emit({syncError:'Nu am putut salva activitatea exact cum era. Progresul tău a fost sincronizat cu contul.'});continue;}
      const result:MutationResponse=await response.json();await queueTransaction(userId,()=>{writeQueue(userId,readQueue(userId).filter(i=>i.operation.operationId!==item.operation.operationId));});replace(SnapshotSchema.parse(result.snapshot));rememberResult(item.operation.operationId,result.mutationResult);emit({syncError:null,notificationsReady:true});
    }
  }catch{if(identity===userId)emit({syncError:'Se va sincroniza când revii online.'});}
  finally{if(identity===userId)emit({isSyncing:false,pendingCount:readQueue(userId).length});}
}
export function flushProgressQueue() {
  if(flushing)return flushing;
  const userId=identity;
  flushing=(async()=>{if(navigator.locks && userId)await navigator.locks.request(`finly-flush:${userId}`,async()=>{await flushNow();});else await flushNow();})().finally(()=>{flushing=null;});return flushing;
}
export function initializeAccount(userId:string|null) {
  identity=userId;confirmedRevision=null;results.clear();rejected.clear();emit({...initial,userId,hydrated:!userId});
  const stopAuth=listenAuthChanges(change=>{if(change.type==='logout' && change.userId)clearAccountStorage(change.userId);identity=null;results.clear();clearUnverifiedCaches();emit({...initial,authTransition:true});window.location.replace(new URL('/',window.location.origin).href);});
  if(!userId){clearUnverifiedCaches();return stopAuth;}
  // A persisted cache is unverified until the server responds. Only use it when
  // the device is already offline; online entry must wait for cloud authority.
  const cache=!navigator.onLine?readAccountCache(userId):null;if(cache)replace(cache,false);
  const resume=()=>{void Promise.resolve(flushProgressQueue()).then(refreshProgress);};
  const visible=()=>{if(!document.hidden)resume();};
  const storage=(event:StorageEvent)=>{if(event.key===`finly-sync-queue:v1:${userId}` && readQueue(userId).length)void flushProgressQueue();else if(event.key===`finly-account-cache:v1:${userId}`){const cached=readAccountCache(userId);if(cached && cached.revision>(confirmedRevision ?? 0))void refreshProgress();}};
  window.addEventListener('online',resume);window.addEventListener('focus',resume);window.addEventListener('storage',storage);document.addEventListener('visibilitychange',visible);
  resume();const timer=window.setInterval(resume,60000);
  return ()=>{stopAuth();window.clearInterval(timer);window.removeEventListener('online',resume);window.removeEventListener('focus',resume);window.removeEventListener('storage',storage);document.removeEventListener('visibilitychange',visible);};
}
export function cleanupAccount() {const userId=state.userId;if(userId)clearAccountStorage(userId);identity=null;results.clear();emit({...initial,authTransition:true});broadcastAuthChange('logout',userId);}
async function mutate(operation:ProgressOperation):Promise<DomainResult> {
  const userId=identity;const account=state.account;if(!userId || !account)throw new Error(errorCopy.AUTH_REQUIRED);
  const optimistic=applyAccountOperation(state.progress,operation,account.profile.created_at,new Date());
  await queueTransaction(userId,()=>{enqueue(userId,operation);});if(state.account)replace(state.account,false);
  if(!navigator.onLine){emit({syncError:'Se va sincroniza când revii online.'});return optimistic;}
  await flushProgressQueue();
  if(identity!==userId)throw new Error(errorCopy.AUTH_REQUIRED);
  if(rejected.has(operation.operationId))throw new Error('Nu am putut salva activitatea exact cum era. Progresul tău a fost sincronizat cu contul.');
  const result=results.get(operation.operationId);
  if(!result && !readQueue(userId).some(item=>item.operation.operationId===operation.operationId))throw new Error('Nu am putut salva activitatea exact cum era. Progresul tău a fost sincronizat cu contul.');
  return result ?? {...optimistic,progress:state.progress};
}
const operation=(type:ProgressOperation['type'],payload:ProgressOperation['payload'],operationId=crypto.randomUUID()):ProgressOperation=>({type,payload,operationId,occurredAt:new Date().toISOString()} as ProgressOperation);
export const finishLessonSession=(session:LessonSessionResult)=>mutate(operation('completeLesson',{lessonId:session.lessonId,answers:session.answers,trial:false},session.sessionId));
export const submitDailyChallenge=(selectedOptionId:string)=>mutate(operation('answerDailyChallenge',{selectedOptionId}));
export const updateSimulation=(simulation:SimulationState)=>mutate(operation('simulator',{choices:simulatorChoices(simulation.history)}));
export const saveLastLesson=async(id:string)=>{if(identity && state.account)await mutate(operation('lastLesson',{id}));};
export const acknowledgeAchievement=async(id:string)=>{if(identity)await mutate(operation('achievementSeen',{id}));};
export const acknowledgeLevel=async()=>{if(identity)await mutate(operation('levelSeen',{}));};
export const acknowledgeFreeze=async(day:string)=>{if(identity)await mutate(operation('freezeSeen',{day}));};
export function useProgressData() {const value=useSyncExternalStore(subscribe,()=>state,()=>initial);return {...value.progress,totalXp:getTotalXp(value.progress),completedLessonIds:getCompletedLessonIds(value.progress),simulatorCompletions:getSimulatorCompletionIds(value.progress),hydrated:value.hydrated,todayKey:value.todayKey,profile:value.account?.profile ?? null,email:value.account?.email ?? null,userId:value.userId,isSyncing:value.isSyncing,pendingCount:value.pendingCount,syncError:value.syncError,notificationsReady:value.notificationsReady,authTransition:value.authTransition};}
export function friendlyApiError(code:unknown) {return typeof code==='string' && Object.hasOwn(errorCopy,code)?errorCopy[code as AccountErrorCode]:errorCopy.SERVER_ERROR;}
