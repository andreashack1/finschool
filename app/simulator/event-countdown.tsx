'use client';
import { Clock3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
export type ServerTimeAnchor={serverMs:number;receivedAt:number};
export function remainingSeconds(expiresAt:string,anchor:ServerTimeAnchor,monotonicNow:number){return Math.max(0,Math.ceil((Date.parse(expiresAt)-anchor.serverMs-(monotonicNow-anchor.receivedAt))/1000));}
/** Display only. Canonical sync supplies the outcome. */
export default function EventCountdown({expiresAt,anchor,serverNow,onExpire,compact=false}:{expiresAt:string;anchor?:ServerTimeAnchor;serverNow?:string;onExpire?:()=>void;compact?:boolean}){
 const [seconds,setSeconds]=useState<number|null>(null),callback=useRef(onExpire),signalled=useRef(false);
 useEffect(()=>{callback.current=onExpire;},[onExpire]);
 useEffect(()=>{if(!anchor&&!serverNow)return;const calibrated=anchor??{serverMs:Date.parse(serverNow!),receivedAt:performance.now()};signalled.current=false;const tick=()=>{const n=remainingSeconds(expiresAt,calibrated,performance.now());setSeconds(n);if(n===0&&!signalled.current){signalled.current=true;callback.current?.();}};const first=window.setTimeout(tick,0),timer=window.setInterval(tick,1000);return()=>{window.clearTimeout(first);window.clearInterval(timer);};},[expiresAt,anchor,serverNow]);
 const text=seconds===null?'Se actualizează timpul…':seconds===0?'Timpul a expirat. Se actualizează alegerea…':compact?`Mai ai ${Math.ceil(seconds/60)} min`:`Mai ai ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
 return <p className={`sim-decision-timer${seconds!==null&&seconds<300?' sim-timer-short':''}`}><Clock3 size={18} aria-hidden="true"/><span role={seconds===0?'status':undefined}>{text}</span></p>;
}
