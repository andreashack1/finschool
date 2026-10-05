'use client';
let sender:string|null=null;
function tabId(){return sender ??= crypto.randomUUID();}
type AuthChange={type:'sessionChanged'|'logout';userId:string|null;sender:string};
export function broadcastAuthChange(type:AuthChange['type'],userId:string|null=null) {if(typeof BroadcastChannel==='undefined')return;const channel=new BroadcastChannel('finly-account-state:v1');channel.postMessage({type,userId,sender:tabId()});channel.close();}
export function listenAuthChanges(listener:(change:AuthChange)=>void) {if(typeof BroadcastChannel==='undefined')return ()=>{};const channel=new BroadcastChannel('finly-account-state:v1');const current=tabId();channel.onmessage=event=>{const data:unknown=event.data;if(!data || typeof data!=='object')return;const value=data as Record<string,unknown>;if(value.sender===current || (value.type!=='sessionChanged' && value.type!=='logout'))return;if(value.userId!==null && typeof value.userId!=='string')return;listener({type:value.type,userId:value.userId,sender:String(value.sender)});};return()=>channel.close();}
