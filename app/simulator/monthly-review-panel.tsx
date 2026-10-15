'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import { FinlyMascot } from '../components/finly-brand';
import { formatLei } from '../../src/lib/simulator/money';
import { formatSimulatorDate } from '../../src/lib/simulator/dashboard';
import { createClientUuid } from '../../src/lib/uuid';
import type { MonthlyReview } from '../../src/lib/simulator/monthly-review';
import { useOnline } from '../../src/lib/simulator/use-online';

export default function MonthlyReviewPanel({ review, count, acknowledge }: { review:MonthlyReview; count:number; acknowledge:(input:{reviewId:string;operationId:string})=>Promise<void> }) {
  const online = useOnline();
  const dialog=useRef<HTMLDialogElement>(null),heading=useRef<HTMLHeadingElement>(null),button=useRef<HTMLButtonElement>(null),flight=useRef(false),operation=useRef<string|null>(null);
  const [busy,setBusy]=useState(false),[error,setError]=useState(false);
  useLayoutEffect(()=>{
    const element=dialog.current,previous=document.activeElement as HTMLElement|null;
    element?.showModal(); heading.current?.focus({preventScroll:true}); if(element)element.scrollTop=0;
    const overflow=document.body.style.overflow; document.body.style.overflow='hidden';
    return ()=>{element?.close();document.body.style.overflow=overflow;previous?.focus();};
  },[]);
  async function submit(){
    if(flight.current || !online)return;
    flight.current=true;setBusy(true);setError(false);
    try { operation.current??=createClientUuid(); await acknowledge({reviewId:review.id,operationId:operation.current}); }
    catch {setError(true);}finally{flight.current=false;setBusy(false);}
  }
  const s=review.snapshot,month=formatSimulatorDate(s.monthKey,true);
  return <dialog ref={dialog} className="sim-monthly-dialog" aria-busy={busy} aria-labelledby="monthly-title" aria-describedby="monthly-subtitle" onCancel={e=>e.preventDefault()} onKeyDown={e=>{
    if(e.key==='Escape')e.preventDefault();
    if(e.key==='Tab'){e.preventDefault();button.current?.focus();}
  }}>
    <div className="sim-monthly-panel">
      <header className="sim-monthly-header"><FinlyMascot framing="head" mood="thinking"/><div><span className="card-kicker">UN MOMENT CU FINI</span><h1 ref={heading} tabIndex={-1} id="monthly-title">{month.charAt(0).toLocaleUpperCase('ro-RO')+month.slice(1)} s-a încheiat.</h1><p id="monthly-subtitle">Hai să vedem unde s-au dus banii.</p>{s.isPartial&&<small>Prima ta lună a avut {s.daysInPeriod} zile · {formatSimulatorDate(s.periodStart)} – {formatSimulatorDate(s.periodEnd)}.</small>}</div></header>
      <dl className="sim-monthly-numbers">{([['Ai primit',s.incomeBani],['Ai cheltuit',s.spentBani],['Ți-au rămas',s.closingBalanceBani]] as const).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{formatLei(value)}</dd></div>)}</dl>
      {s.topCategories.length>0&&<section className="sim-monthly-categories" aria-labelledby="monthly-categories"><h2 id="monthly-categories">Unde s-au dus banii</h2><dl>{s.topCategories.map(c=><div key={c.id}><dt>{c.label}</dt><dd>{formatLei(c.amountBani)}</dd></div>)}</dl></section>}
      <section className="sim-monthly-feedback" aria-label="Observațiile lui Fini">{s.insights.length?s.insights.map(i=><article key={i.id}><h2>{i.title}</h2><p>{i.body}</p></article>):<p>{s.finiMessage}</p>}</section>
      <footer>{error&&<p role="alert">Nu am putut salva. Apasă din nou pentru a continua.</p>}<button ref={button} className="app-button primary" disabled={!online || busy} onClick={()=>void submit()}>{busy?'Se salvează…':count>1?'Vezi luna următoare':'Începe luna următoare'}</button></footer>
    </div>
  </dialog>;
}
