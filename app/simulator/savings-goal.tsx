'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeftRight, Check, MoreHorizontal, Target, X } from 'lucide-react';
import { createClientUuid } from '../../src/lib/uuid';
import { bani, formatLei } from '../../src/lib/simulator/money';
import { amountInputSchema } from '../../src/lib/simulator/subscriptions';
import { goalInputSchema, type SavingsGoal } from '../../src/lib/simulator/savings-goal';
import { simulatorPageSchema, type SimulatorPageState } from '../../src/lib/simulator/chapter-two-api';
import { useOnline } from '../../src/lib/simulator/use-online';

export type GoalView = 'create' | 'edit' | 'contribution' | 'withdrawal' | 'archive' | null;
export default function SavingsGoalCard({ goal, balanceBani, userId, disabled, view, setView, saved }: { goal:SavingsGoal|null; balanceBani:number; userId:string; disabled:boolean; view:GoalView; setView:(view:GoalView)=>void; saved:(value:SimulatorPageState)=>void }) {
  const online=useOnline(), menu=useRef<HTMLDetailsElement>(null), previous=useRef(goal?.status);
  const [completed,setCompleted]=useState(false);
  useEffect(() => {
    if (goal?.status==='reached' && previous.current==='active') {
      const start = setTimeout(()=>setCompleted(true),0), end = setTimeout(()=>setCompleted(false),1100);
      previous.current=goal.status;
      return ()=>{clearTimeout(start);clearTimeout(end);};
    }
    previous.current=goal?.status;
    const reset=setTimeout(()=>setCompleted(false),0);
    return ()=>clearTimeout(reset);
  },[goal?.status]);
  const unavailable=disabled||!online;
  const manage=(next: 'edit' | 'archive')=>{if(menu.current){menu.current.open=false;menu.current.querySelector('summary')?.focus();}setView(next);};
  return <><section className={`sim-fixed sim-goal app-card ${completed?'sim-goal-completed':''}`} id="sim-goal-card" tabIndex={-1} aria-labelledby="sim-goal-title"><div className="sim-section-top"><span className="card-kicker">{goal?.status==='reached'?'OBIECTIV ATINS':'OBIECTIVUL MEU'}</span><span className="sim-goal-icon" aria-hidden="true">{goal?.status==='reached'?<Check size={22}/>:<Target size={22}/>}</span></div>
    {!goal?<><h2 id="sim-goal-title">Pentru ce vrei să pui bani deoparte?</h2><button className="app-button" disabled={unavailable} onClick={()=>setView('create')}>Creează un obiectiv</button></>:<><h2 id="sim-goal-title">{goal.name}</h2><p className="sim-goal-money"><strong>{formatLei(goal.savedAmountBani)}</strong><span> / {formatLei(goal.targetAmountBani)}</span></p><div className="sim-goal-track" role="progressbar" aria-label={`Bani puși deoparte pentru ${goal.name}`} aria-valuemin={0} aria-valuemax={goal.targetAmountBani} aria-valuenow={goal.savedAmountBani} aria-valuetext={`${formatLei(goal.savedAmountBani)} din ${formatLei(goal.targetAmountBani)}, ${goal.progressPercent}%`}><span style={{width:`${Math.min(100,goal.savedAmountBani/goal.targetAmountBani*100)}%`}}/></div><div className="sim-goal-progress"><strong>{goal.progressPercent}%</strong><span>{goal.status==='reached'?'Ai strâns suma pe care ți-ai propus-o.':`${formatLei(goal.remainingAmountBani)} rămași`}</span></div><div className="sim-goal-actions"><button className="sim-text-button" disabled={unavailable||goal.savedAmountBani===0} onClick={()=>setView('withdrawal')}><ArrowLeftRight size={15}/>Scoate bani</button><details ref={menu}><summary aria-label="Opțiuni obiectiv"><MoreHorizontal size={20}/></summary><div><button disabled={unavailable} onClick={()=>manage('edit')}>Editează obiectivul</button><button disabled={unavailable} onClick={()=>manage('archive')}>{goal.status==='reached'?'Încheie obiectivul':'Șterge obiectivul'}</button></div></details></div></>}
    <span className="sr-only" role="status">{completed&&goal?`Obiectiv atins. Ai strâns ${formatLei(goal.savedAmountBani)} pentru ${goal.name}.`:''}</span></section>
    {view&&<GoalSheet key={view} goal={goal} balanceBani={balanceBani} userId={userId} disabled={disabled} view={view} setView={setView} saved={saved}/>}
  </>;
}
function GoalSheet({ goal, balanceBani, userId, disabled, view, setView, saved }: { goal:SavingsGoal|null; balanceBani:number; userId:string; disabled:boolean; view:GoalView; setView:(view:GoalView)=>void; saved:(value:SimulatorPageState)=>void }) {
  const online = useOnline(), dialog = useRef<HTMLDialogElement>(null), inFlight = useRef(false), operation = useRef<string|null>(null);
  const [name,setName] = useState(goal?.name??''), [amount,setAmount] = useState(view==='edit'&&goal?String(goal.targetAmountBani/100):''), [error,setError] = useState(''), [busy,setBusy] = useState(false);
  const [goalId] = useState(goal?.id);
  useLayoutEffect(()=>{const node=dialog.current;node?.showModal();return ()=>{if(node?.open)node.close();};},[]);
  const close=()=>{if(!inFlight.current){dialog.current?.close();setView(null);}};
  const changed=()=>{operation.current=null;setError('');};
  const parsed=amountInputSchema.safeParse(amount), value=parsed.success?parsed.data:null;
  const max=view==='withdrawal'?goal?.savedAmountBani??0:Math.max(0,Math.min(balanceBani,goal?.remainingAmountBani??0));
  async function submit(event:React.FormEvent) {
    event.preventDefault();
    if(inFlight.current||disabled||!online||!view)return;
    if(view!=='archive'&&value===null){setError('Introdu o sumă mai mare decât zero, cu cel mult două zecimale.');return;}
    if((view==='create'||view==='edit')&&!name.trim()){setError('Scrie numele obiectivului.');return;}
    if(view==='contribution'&&value!>balanceBani){setError('Nu ai suficienți bani disponibili.');return;}
    if(view==='contribution'&&goal&&value!>goal.remainingAmountBani){setError(`Mai ai ${formatLei(goal.remainingAmountBani)} până la obiectiv.`);return;}
    if(view==='withdrawal'&&goal&&value!>goal.savedAmountBani){setError(`Poți scoate maximum ${formatLei(goal.savedAmountBani)}.`);return;}
    if(view==='edit'&&goal&&value!<goal.savedAmountBani){setError('Suma țintă nu poate fi mai mică decât suma pe care ai pus-o deja deoparte.');return;}
    inFlight.current=true;setBusy(true);setError('');
    try {
      operation.current??=createClientUuid();
      const input={action:view,operationId:operation.current,...(view!=='create'?{id:goalId}:{}),...(view==='create'||view==='edit'?{name}:{}),...(view!=='archive'?{amount}:{})};
      if(!goalInputSchema.safeParse(input).success)throw new Error('Verifică numele și suma obiectivului.');
      const response=await fetch('/api/simulator/goal',{method:'POST',cache:'no-store',signal:AbortSignal.timeout(20000),headers:{'Content-Type':'application/json','X-Finly-Account':userId},body:JSON.stringify(input)});
      const result=await response.json();
      if(!response.ok)throw new Error(result?.error?.message??'Nu am putut salva. Încearcă din nou.');
      saved(simulatorPageSchema.parse(result));setView(null);operation.current=null;
    }catch(e){setError(e instanceof Error&&!['AbortError','TimeoutError','TypeError','SyntaxError','ZodError'].includes(e.name)?e.message:'Nu am putut salva. Verifică conexiunea și încearcă din nou.');}
    finally{inFlight.current=false;setBusy(false);}
  }
  const unavailable=disabled||busy||!online;
  const title=view==='create'?'Creează un obiectiv':view==='edit'?'Editează obiectivul':view==='contribution'?'Pune bani deoparte':view==='withdrawal'?'Scoate bani':goal?.status==='reached'?'Închei obiectivul?':'Ștergi obiectivul?';
  return <dialog className="sim-financial-dialog sim-goal-dialog" ref={dialog} aria-labelledby="sim-goal-dialog-title" onCancel={e=>{e.preventDefault();close();}} onClose={()=>{if(!dialog.current?.open)close();}}><div className="sim-financial-panel"><header><h2 id="sim-goal-dialog-title">{title}</h2><button aria-label="Închide" disabled={busy} onClick={close}><X size={20}/></button></header><form onSubmit={submit}><fieldset disabled={unavailable}>
    {(view==='create'||view==='edit')&&<label htmlFor="sim-goal-name">Numele obiectivului<input id="sim-goal-name" autoFocus required maxLength={60} placeholder="Ex. Laptop" value={name} onChange={e=>{changed();setName(e.target.value);}} aria-invalid={!!error} aria-describedby={error?'sim-goal-error':undefined}/></label>}
    {view==='contribution'&&goal&&<p>Pentru: <strong>{goal.name}</strong></p>}{view==='contribution'&&<p>Disponibil: <strong>{formatLei(bani(balanceBani))}</strong></p>}{view==='withdrawal'&&goal&&<p>Puși deoparte: <strong>{formatLei(goal.savedAmountBani)}</strong></p>}
    {view&&view!=='archive'&&<label htmlFor="sim-goal-amount">{view==='create'||view==='edit'?'Suma obiectivului':view==='contribution'?'Cât vrei să pui deoparte?':'Cât vrei să scoți?'}<span className="sim-money-input"><input id="sim-goal-amount" aria-label={view==='create'||view==='edit'?'Suma obiectivului':view==='contribution'?'Cât vrei să pui deoparte?':'Cât vrei să scoți?'} autoFocus={view==='contribution'||view==='withdrawal'} required inputMode="decimal" placeholder="100" value={amount} onChange={e=>{changed();setAmount(e.target.value);}} aria-invalid={!!error} aria-describedby={error?'sim-goal-error':undefined}/><span>lei</span></span></label>}
    {view==='contribution'&&<div className="sim-goal-quick">{[50,100,200].map(n=><button type="button" key={n} disabled={n*100>max} onClick={()=>{changed();setAmount(String(n));}}>{n} lei</button>)}</div>}
    {view==='archive'&&<p>{goal&&goal.savedAmountBani>0?`Cei ${formatLei(goal.savedAmountBani)} puși deoparte vor reveni la banii disponibili.`:'Obiectivul va fi eliminat din dashboard.'}</p>}
    {error&&<p id="sim-goal-error" className="sim-financial-error" role="alert">{error}</p>}
    <button className="app-button sim-save-subscription" type="submit" aria-busy={busy}>{busy?'Se salvează…':view==='create'?'Creează obiectivul':view==='edit'?'Salvează modificările':view==='archive'?(goal?.status==='reached'?'Încheie obiectivul':'Șterge obiectivul'):view==='contribution'?(value!==null?`Pune ${formatLei(value)} deoparte`:'Pune bani deoparte'):'Scoate bani'}</button></fieldset>{view==='archive'&&<button type="button" className="sim-text-button" disabled={busy} onClick={close}>Renunță</button>}</form></div></dialog>;
}
