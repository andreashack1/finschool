'use client';
import Link from 'next/link';
import { Check, ArrowLeft } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { publicEventSchema, type PublicEvent } from '../../../../src/lib/simulator/events/types';
import { moneyBaniSchema, formatLei } from '../../../../src/lib/simulator/money';
import { useOnline } from '../../../../src/lib/simulator/use-online';
import EventCountdown,{type ServerTimeAnchor} from '../../event-countdown';
const resultSchema=z.object({event:publicEventSchema,balanceBani:moneyBaniSchema,caughtUp:z.boolean(),serverNow:z.iso.datetime(),conflict:z.boolean().optional()});
type Result=z.infer<typeof resultSchema> & {anchor:ServerTimeAnchor};
const reasons={insufficient_funds:'Sold insuficient',activity_overlap:'Se suprapune cu o activitate',schedule_conflict:'Nu se potrivește cu programul',catching_up:'Actualizăm zilele precedente',state_changed:'Situația s-a schimbat.'};
export default function EventDetailClient({id,userId}:{id:string;userId:string}){
 const online=useOnline();
 const [data,setData]=useState<Result|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const [confirm,setConfirm]=useState<PublicEvent['options'][number]|null>(null);
 const [expiredId,setExpiredId]=useState<string|null>(null);
 const pending=useRef(false),panel=useRef<HTMLDivElement>(null),mounted=useRef(true),lastRefresh=useRef(-Infinity);
 const request=useCallback(async(optionId?:string)=>{
  const response=await fetch(`/api/simulator/events/${encodeURIComponent(id)}`,{method:optionId?'POST':'GET',cache:'no-store',headers:{'Content-Type':'application/json','X-Finly-Account':userId},...(optionId?{body:JSON.stringify({optionId})}:{})});
  const raw:unknown=await response.json();
  const failure=z.object({error:z.object({code:z.string()})}).safeParse(raw);
  if(failure.success&&failure.data.error.code==='MONTHLY_REVIEW_REQUIRED'){window.location.replace('/simulator');throw new Error('Parcurge mai întâi luna încheiată împreună cu Fini.');}
  const result=resultSchema.safeParse(raw);if(!result.success)throw new Error('Situația nu este disponibilă momentan.');
  return {...result.data,anchor:{serverMs:Date.parse(result.data.serverNow),receivedAt:performance.now()}};
 },[id,userId]);
 const refresh=useCallback(async()=>{
  if(pending.current||!navigator.onLine)return;
  pending.current=true;lastRefresh.current=performance.now();
  try{const next=await request();if(mounted.current){setData(next);setConfirm(null);setError('');}}
  catch{if(mounted.current)setError('Nu am putut actualiza situația. Încearcă din nou.');}
  finally{pending.current=false;}
 },[request]);
 useEffect(()=>{mounted.current=true;queueMicrotask(()=>void refresh());let timer:ReturnType<typeof setTimeout>|undefined;const foreground=()=>{if(document.visibilityState!=='visible')return;clearTimeout(timer);timer=setTimeout(()=>void refresh(),Math.max(0,1500-(performance.now()-lastRefresh.current)));};document.addEventListener('visibilitychange',foreground);window.addEventListener('pageshow',foreground);window.addEventListener('online',foreground);return()=>{mounted.current=false;clearTimeout(timer);document.removeEventListener('visibilitychange',foreground);window.removeEventListener('pageshow',foreground);window.removeEventListener('online',foreground);};},[refresh]);
 useEffect(()=>{if(confirm)panel.current?.focus();},[confirm]);
 async function choose(optionId:string){
  if(pending.current||!online)return;pending.current=true;setBusy(true);setError('');
  try{const next=await request(optionId);if(mounted.current){setData(next);setConfirm(null);if(next.conflict)setError(next.event.status==='resolved'?'Situația a fost deja rezolvată. Vezi alegerea salvată.':'Situația s-a actualizat. Verifică opțiunile disponibile.');}}
  catch{if(mounted.current)setError('Nu am putut salva alegerea. Încearcă din nou.');}
  finally{pending.current=false;if(mounted.current)setBusy(false);}
 }
 const event=data?.event,expired=event?.id===expiredId;
 return <div className="finly-app simulator-app"><main className="simulator-content sim-event-detail">
  <Link className="sim-event-back" href="/simulator"><ArrowLeft size={17} aria-hidden="true"/>Înapoi la SimLife</Link>
  <section className="app-card sim-situation">
   {!online&&<p role="status">Ești offline. Reconectează-te pentru a alege.</p>}
   {error&&<div role="alert"><p>{error}</p><button className="app-button secondary" onClick={()=>void refresh()}>Încearcă din nou</button></div>}
   {!event||!data?<p role="status">Încărcăm situația…</p>:<>
    <header><h1>{event.title}</h1><p className="sim-event-context">{event.description}</p></header>
    {event.status==='pending'&&event.presentation&&<ul className="sim-situation-details">{event.presentation.bullets.map((b,i)=><li key={i}>{b.text}{b.amountBani!==undefined&&<> — <strong>{b.amountKind==='approx'?'~':''}{formatLei(b.amountBani)}</strong></>}</li>)}</ul>}
    {event.status==='cancelled'?<p role="status">Situația nu mai necesită o decizie.</p>:event.status==='resolved'?<section className="sim-event-result" aria-labelledby="result-title" role="status" aria-live="polite">
     <div className="sim-result-heading"><Check size={20} aria-hidden="true"/><h2 id="result-title">{event.resolutionMode==='automatic'?'SimLife a ales':'Ai ales'}</h2></div>
     <p className="sim-result-choice">{event.options.find(o=>o.id===event.selectedOptionId)?.label}</p>
     {event.resolutionMode==='automatic'&&<p className="sim-event-note">Nu ai răspuns la timp, iar SimLife a ales automat această variantă.</p>}
     <dl className="sim-result-stats"><div><dt>Cost</dt><dd>{formatLei(event.selectedCostBani!)}</dd></div><div><dt>{event.balanceAfterChoiceBani!=null?'Sold după alegere':'Sold curent'}</dt><dd>{formatLei(event.balanceAfterChoiceBani??data.balanceBani)}</dd></div></dl>
    </section>:<>
     <EventCountdown expiresAt={event.expiresAt} anchor={data.anchor} onExpire={()=>{setExpiredId(event.id);setConfirm(null);void refresh();}}/>
     <p className="sim-event-note">Dacă nu alegi la timp, SimLife va alege automat una dintre variantele disponibile.</p>
     {!data.caughtUp&&<p role="status">Actualizăm zilele precedente. Revino la SimLife pentru continuare.</p>}
     <h2 className="sim-choice-heading">Ce faci?</h2>
     <div className="sim-event-options">{event.options.map(option=><div key={option.id}><button className="sim-choice-card" disabled={!online||busy||Boolean(expired)||Boolean(option.unavailableReason)||!data.caughtUp} aria-describedby={option.unavailableReason?`${option.id}-reason`:undefined} onClick={()=>option.costBani>0?setConfirm(option):void choose(option.id)}><span>{option.label}</span><strong>{option.costBani>0?'−':''}{formatLei(option.costBani)}</strong></button>{option.unavailableReason&&<p className="sim-event-note" id={`${option.id}-reason`}>{reasons[option.unavailableReason]}</p>}</div>)}</div>
     {confirm&&<div className="sim-confirm" role="group" aria-labelledby="confirm-title" tabIndex={-1} ref={panel}><h2 id="confirm-title">Confirmi alegerea?</h2><p>{confirm.label} · {formatLei(confirm.costBani)}</p><div className="sim-event-actions"><button className="app-button" disabled={!online||busy||Boolean(expired)} onClick={()=>void choose(confirm.id)}>Confirmă</button><button className="app-button secondary" disabled={busy} onClick={()=>setConfirm(null)}>Înapoi</button></div></div>}
    </>}
   </>}
  </section>
 </main></div>;
}
