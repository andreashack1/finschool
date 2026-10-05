import { z } from 'zod';
import { OperationSchema, SnapshotSchema, type AccountProgressSnapshot, type ProgressOperation } from './contracts';
export const cacheKey = (userId:string) => `finly-account-cache:v1:${userId}`;
export const queueKey = (userId:string) => `finly-sync-queue:v1:${userId}`;
const QueueItemSchema=z.object({userId:z.uuid(),operation:OperationSchema,createdAt:z.iso.datetime(),attempts:z.number().int().nonnegative()});
export type QueueItem=z.infer<typeof QueueItemSchema>;
const memoryQueues=new Map<string,QueueItem[]>();
function read(key:string):unknown {if(typeof localStorage==='undefined')return null;try{return JSON.parse(localStorage.getItem(key) ?? 'null');}catch{return null;}}
function write(key:string,value:unknown) {if(typeof localStorage==='undefined')return false;try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}}
export function readAccountCache(userId:string) {const value=SnapshotSchema.safeParse(read(cacheKey(userId)));return value.success && value.data.userId===userId?value.data:null;}
export function writeAccountCache(snapshot:AccountProgressSnapshot) {const saved=write(cacheKey(snapshot.userId),snapshot);if(!saved && typeof localStorage!=='undefined')try{localStorage.removeItem(cacheKey(snapshot.userId));}catch{}return saved;}
export function readQueue(userId:string) {const value=z.array(QueueItemSchema).safeParse(memoryQueues.get(userId) ?? read(queueKey(userId)));return value.success?value.data.filter(item=>item.userId===userId):[];}
export function writeQueue(userId:string,items:QueueItem[]) {const own=items.filter(i=>i.userId===userId);if(write(queueKey(userId),own))memoryQueues.delete(userId);else memoryQueues.set(userId,own);return true;}
export function enqueue(userId:string,operation:ProgressOperation) {const items=readQueue(userId);if(!items.some(i=>i.operation.operationId===operation.operationId))items.push({userId,operation,createdAt:new Date().toISOString(),attempts:0});if(!writeQueue(userId,items))throw new Error('storage unavailable');return items;}
export function clearAccountStorage(userId:string) {memoryQueues.delete(userId);if(typeof localStorage==='undefined')return;for(const key of [cacheKey(userId),queueKey(userId)])try{localStorage.removeItem(key);}catch{}}
export function clearUnverifiedCaches() {if(typeof localStorage==='undefined')return;try{const keys=Array.from({length:localStorage.length},(_,index)=>localStorage.key(index));for(const key of keys)if(key?.startsWith('finly-account-cache:v1:'))localStorage.removeItem(key);}catch{}}
