'use client';
import { useEffect,useRef,useState } from 'react';
import { Flame,Snowflake } from 'lucide-react';
import { createClientUuid } from '@/src/lib/uuid';
import { coalesceStreakMoments,freezeLabel,streakLabel,StreakMomentSchema,type MomentPresentation } from '@/src/lib/streak-moments';
import { useProgressData } from '@/src/lib/use-progress';
import { gamificationConfig } from '@/src/content/gamification-config';

export function StreakMomentHost({blocked,onActiveChange}:{blocked:boolean;onActiveChange:(active:boolean)=>void}) {
  const p=useProgressData();
  // Remount on account identity change: no pending promises/timers leak into B.
  return p.userId && p.notificationsReady && !p.authTransition ? <AccountStreakMoments key={p.userId} userId={p.userId} revision={p.accountRevision} balance={p.freezeBalance} blocked={blocked} onActiveChange={onActiveChange}/> : null;
}
function AccountStreakMoments({userId,revision,balance,blocked,onActiveChange}:{userId:string;revision:number;balance:number;blocked:boolean;onActiveChange:(active:boolean)=>void}) {
  const [moment,setMoment]=useState<MomentPresentation|null>(null);
  const blockedRef=useRef(blocked);
  const refreshRef=useRef<()=>void>(()=>{});
  const claimRef=useRef<string|null>(null);
  useEffect(()=>{blockedRef.current=blocked;refreshRef.current();},[revision,blocked]);
  useEffect(()=>{
    // React Strict Mode rehearses effects. Reuse this instance's reservation
    // token so a committed request from that rehearsal cannot lock out itself.
    claimRef.current ??=createClientUuid();
    const claim=claimRef.current,controller=new AbortController();
    let alive=true,busy=false,dirty=false,timer:ReturnType<typeof setTimeout>|undefined;
    const request=async(body:object)=>{
      const response=await fetch('/api/progress/moments',{method:'POST',headers:{'Content-Type':'application/json','X-Finly-Account':userId},body:JSON.stringify(body),signal:controller.signal});
      if(!response.ok)throw new Error('moment request');
      return response.json();
    };
    const pause=(ms:number)=>new Promise<void>(resolve=>{timer=setTimeout(resolve,ms);});
    const activeQuestion=()=>Boolean(document.querySelector('.lesson-question') && !document.querySelector('.lesson-finish'));
    const run=async()=>{
      if(!alive)return;
      if(busy){dirty=true;return;}
      if(document.hidden || blockedRef.current || activeQuestion() || !navigator.onLine)return;
      busy=true;dirty=false;
      try {
        const body=await request({action:'claim',claim});
        const events=StreakMomentSchema.array().parse(body.events);
        for(const item of coalesceStreakMoments(events)) {
          if(!alive || blockedRef.current || document.hidden || activeQuestion())return;
          // Refresh ownership immediately before each short moment. An orphaned
          // tab expires quickly; a slow/obsolete claim response cannot replay a
          // batch that another device has since acquired or acknowledged.
          const reservation=await request({action:'claim',claim});
          const owned=StreakMomentSchema.array().parse(reservation.events);
          if(!alive || blockedRef.current || document.hidden || activeQuestion() || !item.ids.every(id=>owned.some(event=>event.id===id)))return;
          onActiveChange(true);
          setMoment(item);
          window.dispatchEvent(new CustomEvent('finly-streak-moment',{detail:{userId,type:item.type,days:item.payload.freezeDays}}));
          await pause(item.type==='freeze_refilled'?1300:item.type==='streak_incremented'?1350:item.type==='streak_broken'?1200:1400);
          if(!alive)return;
          setMoment(null);
          if(document.hidden)return;
          // Business state was committed before claiming. Retry only its receipt.
          for(let attempt=0;alive && attempt<4;attempt++) {
            try{await request({action:'ack',claim,ids:item.ids});break;}
            catch{if(attempt===3)throw new Error('ack pending');await pause(400*(attempt+1));}
          }
          await pause(150);
        }
      }catch{/* Unacknowledged events survive network loss and lease expiry. */}
      finally{
        busy=false;if(alive)onActiveChange(false);
        if(alive && dirty)timer=setTimeout(()=>{void run();},0);
      }
    };
    refreshRef.current=()=>{void run();};
    const resume=()=>{void run();};
    let questionWasActive=activeQuestion();
    const observer=new MutationObserver(()=>{
      const questionIsActive=activeQuestion();
      if(questionWasActive && !questionIsActive)resume();
      questionWasActive=questionIsActive;
    });
    observer.observe(document.body,{childList:true,subtree:true});
    const interval=setInterval(resume,15000);
    window.addEventListener('online',resume);window.addEventListener('focus',resume);document.addEventListener('visibilitychange',resume);
    void run();
    return()=>{alive=false;controller.abort();observer.disconnect();clearTimeout(timer);clearInterval(interval);refreshRef.current=()=>{};window.removeEventListener('online',resume);window.removeEventListener('focus',resume);document.removeEventListener('visibilitychange',resume);};
  },[userId,onActiveChange]);
  return moment?<StreakMomentVisual key={moment.ids.join(':')} moment={{...moment,payload:{...moment.payload,freezeAfter:balance}}}/>:null;
}
export function StreakMomentVisual({moment}:{moment:MomentPresentation}) {
  const {type,payload}=moment,n=payload.freezeDays.length;
  if(type==='freeze_refilled')return <aside className="streak-refill" role="status"><Snowflake aria-hidden="true" size={20}/><strong>+{gamificationConfig.freeze.weeklyGrant} Freeze</strong><span>{payload.freezeAfter} / {gamificationConfig.freeze.maxBalance}</span></aside>;
  const frozen=type==='freeze_consumed',broken=type==='streak_broken';
  const title=frozen?'Streak protejat':broken?'Streak-ul s-a încheiat':streakLabel(payload.streakAfter);
  const copy=frozen?(n===1?'Ai lipsit o zi. Un Freeze ți-a păstrat streak-ul.':`Ai lipsit ${n} zile. Freeze-urile ți-au păstrat streak-ul.`):broken?(n?`Freeze-urile ți-au protejat ${n===1?'o zi':`${n} zile`}, apoi streak-ul s-a încheiat.`:'O nouă zi poate fi un nou început.'):null;
  return <aside className={`streak-moment ${type}`} role="status" aria-live="polite" aria-atomic="true">
    <div className="streak-moment-card">
      <div className="streak-art" aria-hidden="true"><Flame className="moment-flame" size={74}/>{frozen && <><span className="frost-sweep"/><Snowflake className="moment-snow" size={36}/></>}{!broken && Array.from({length:6},(_,i)=><i className="moment-particle" style={{'--particle':i} as React.CSSProperties} key={i}/>)}</div>
      {type==='streak_incremented' && <div className="moment-number" aria-hidden="true"><span className="moment-old">{payload.streakBefore}</span><span className="moment-new">{payload.streakAfter}</span></div>}
      <strong className="moment-title">{title}</strong>{copy && <p>{copy}</p>}
      {frozen && <><span>{streakLabel(payload.streakAfter)}</span><span className="moment-balance"><Snowflake size={16} aria-hidden="true"/>{payload.freezeAfter} / {gamificationConfig.freeze.maxBalance} · {freezeLabel(payload.freezeAfter)}</span></>}
    </div>
  </aside>;
}
