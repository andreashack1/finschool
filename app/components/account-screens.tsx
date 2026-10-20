'use client';
import Link from 'next/link';
import { useCallback,useEffect,useRef,useState } from 'react';
import { BookOpen,Cloud,Eye,EyeOff,Zap } from 'lucide-react';
import { FinlyMascot } from './finly-brand';
import { publicSupabaseConfig } from '../../src/lib/supabase/env';
import { accountConfig } from '../../src/content/account-config';
import { SignupSchema,normalizeUsername,EmailSchema,PasswordSchema } from '../../src/lib/account/schemas';
import { clearTrial,previewTrial,readTrial } from '../../src/lib/account/onboarding';
import { friendlyApiError } from '../../src/lib/use-progress';
import { broadcastAuthChange } from '../../src/lib/account/events';
import { SnapshotSchema } from '../../src/lib/account/contracts';
import { writeAccountCache } from '../../src/lib/account/storage';
import { startUsernameCheck,usernameValidationMessage,usernameStatusCopy,type UsernameStatus } from '../../src/lib/account/username-availability';
import { pendingVerificationEmail,rememberVerificationEmail,verificationCooldown,startVerificationCooldown,clearVerificationState,resetAvailableKey,resendAvailableKey } from '../../src/lib/account/verification';
import { errorCopy } from '../../src/lib/account/errors';
export function AccountShell({title,children,large=false,intro}:{title:string;children:React.ReactNode;large?:boolean;intro?:React.ReactNode}) {return <main className={`account-page ${large?'account-large':''}`}><Link className="account-brand" href="/bun-venit">finly<span>.</span></Link><section className="account-card"><FinlyMascot className="account-fini" framing={large?'bust':'head'} mood="normal" priority/>{intro}<h1>{title}</h1>{children}</section></main>;}
export function WelcomeScreen() {
  const [ready,setReady]=useState(false);
  useEffect(()=>{if(readTrial()?.completed)window.location.replace('/salveaza-progresul');else{const frame=requestAnimationFrame(()=>setReady(true));return()=>cancelAnimationFrame(frame);}},[]);
  if(!ready)return <main className="account-loading" aria-busy="true">Pregătim prima lecție…</main>;
  return <AccountShell title="Bine ai venit în Finly" large intro={<div className="fini-bubble"><strong>Hei! Eu sunt Fini.</strong><p>Facem prima lecție împreună. După ea îți salvezi progresul într-un cont și continui de oriunde.</p></div>}><p>Învață să-ți înțelegi banii prin situații reale și quiz-uri scurte.</p><Link className="app-button" href="/incepe">Începe prima lecție</Link><p className="account-small">Durează aproximativ 5 minute. Prima lecție o poți încerca fără cont. După ea îți salvezi progresul într-un cont.</p><Link className="app-button secondary" href="/autentificare">Am deja cont</Link><p><Link href="/creeaza-cont">Vrei să-ți creezi cont acum?</Link></p><div className="account-benefits"><span><BookOpen size={20}/><strong>100 de lecții</strong><small>Înveți prin situații reale</small></span><span><Cloud size={20}/><strong>Progres salvat</strong><small>Continui de unde ai rămas</small></span><span><Zap size={20}/><strong>XP & streak</strong><small>Vezi cum progresezi</small></span></div></AccountShell>;
}
export function GateScreen({authenticated,userId=null}:{authenticated:boolean;userId?:string|null}) {
  const [preview,setPreview]=useState<number|null>(null);const [error,setError]=useState<string|null>(null);const [busy,setBusy]=useState(false);const started=useRef(false);
  const sync=useCallback(async()=>{
    if(authenticated)broadcastAuthChange('sessionChanged',userId);
    const trial=readTrial();if(!trial?.completed || !trial.completedAt){window.location.replace(authenticated?'/':'/bun-venit');return;}
    setPreview(previewTrial(trial).xpGained);if(!authenticated)return;
    setBusy(true);setError(null);
    try{const response=await fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json','X-Finly-Account':userId ?? ''},body:JSON.stringify({operationId:trial.operationId,type:'completeLesson',occurredAt:trial.completedAt,payload:{lessonId:trial.lessonId,answers:trial.answers,trial:true,startedAt:trial.startedAt}})});const result=await response.json();if(!response.ok)throw new Error(friendlyApiError(result.error?.code));const snapshot=SnapshotSchema.parse(result.snapshot);if(snapshot.userId!==userId)throw new Error('Conectează-te din nou pentru a salva progresul.');writeAccountCache(snapshot);setPreview(result.mutationResult.xpGained);clearTrial();window.location.replace('/');}catch(cause){setError(cause instanceof Error?cause.message:'Nu putem salva acum. Reîncearcă.');}finally{setBusy(false);}
  },[authenticated,userId]);
  useEffect(()=>{if(!started.current){started.current=true;void sync();}},[sync]);
  return <AccountShell title="Primul pas e făcut." large><p>Ai terminat prima lecție. Creează-ți cont ca să-ți salvez progresul și să continui.</p>{preview!==null && <div className="account-preview"><strong>1 lecție finalizată</strong><span>+{preview} XP pregătiți de salvat</span></div>}{authenticated?<><p role="status">{busy?'Îți salvăm progresul…':'Progresul este pregătit pentru contul tău.'}</p>{error && <p role="alert">{error}</p>}<button className="app-button" disabled={busy} onClick={()=>void sync()}>Reîncearcă salvarea</button></>:<><Link className="app-button" href="/creeaza-cont">Creează-mi cont</Link><Link className="app-button secondary" href="/autentificare">Am deja cont</Link></>}</AccountShell>;
}
function PasswordField({label,name}:{label:string;name:string}) {
  const [shown,setShown]=useState(false);const description=name==='repeatPassword'?'confirmarea parolei':'parola';
  return <div className="account-field"><label htmlFor={name}>{label}</label><div className="account-password"><input id={name} required name={name} type={shown?'text':'password'} minLength={8} maxLength={128} autoComplete={name==='loginPassword'?'current-password':'new-password'}/><button type="button" onClick={()=>setShown(!shown)} aria-label={`${shown?'Ascunde':'Arată'} ${description}`} aria-controls={name} aria-pressed={shown}>{shown?<EyeOff size={20}/>:<Eye size={20}/>}</button></div>{name==="password" && <small>Minimum 8 caractere.</small>}</div>;
}
export function UsernameField({initial='',enabled=true}:{initial?:string;enabled?:boolean}) {
  const [username,setUsername]=useState(initial);
  const [result,setResult]=useState<{candidate:string;status:UsernameStatus}>({candidate:initial,status:'idle'});
  const input=useRef<HTMLInputElement>(null);
  const invalid=username?usernameValidationMessage(username):'';
  const unchanged=Boolean(initial && username===initial);
  const status=result.candidate===username?result.status:'checking';
  const taken=!unchanged && status==='taken';
  useEffect(()=>{if(!enabled || !username || username===initial)return;return startUsernameCheck(username,status=>setResult({candidate:username,status}));},[username,initial,enabled]);
  useEffect(()=>{input.current?.setCustomValidity(invalid || (taken?errorCopy.USERNAME_TAKEN:''));},[invalid,taken]);
  const message=invalid || (unchanged?'Username-ul tău.':username && enabled?usernameStatusCopy[status]:'');
  return <div className="account-field"><label htmlFor="username">Username</label><input ref={input} id="username" required name="username" value={username} onChange={event=>{const value=normalizeUsername(event.target.value);event.target.setCustomValidity(value?usernameValidationMessage(value):'');setUsername(value);}} minLength={3} maxLength={20} pattern="[a-z0-9_]{3,20}" autoComplete="username" aria-invalid={Boolean(invalid || taken)} aria-describedby="username-status"/><small id="username-status" role="status" aria-live="polite">{message || '3–20 caractere: a–z, 0–9 și underscore.'}</small></div>;
}
type Mode='signup'|'login'|'reset'|'update'|'verify';
const headings:Record<Mode,string>={signup:'Hai să-ți facem locul tău în Finly.',login:'Bine ai revenit.',reset:'Ai uitat parola?',update:'Alege o parolă nouă.',verify:'Verifică-ți emailul'};
export function AuthScreen({mode,recoveryTokenHash,recoveryValid=false,verificationInvalid=false,configured=Boolean(publicSupabaseConfig()),accountUserId=null,destination='/'}:{mode:Mode;recoveryTokenHash?:string;recoveryValid?:boolean;verificationInvalid?:boolean;configured?:boolean;accountUserId?:string|null;destination?:string}) {
  const [busy,setBusy]=useState(false);const [error,setError]=useState<string|null>(verificationInvalid?'Linkul de confirmare nu mai este valid sau a expirat. Cere un email nou.':null);const [message,setMessage]=useState('');const [age,setAge]=useState('');const [cooldown,setCooldown]=useState(0);const alert=useRef<HTMLParagraphElement>(null);

  useEffect(()=>{if(error)alert.current?.focus();},[error]);
  const emailInput=useRef<HTMLInputElement>(null);
  const cooldownUntil=useRef(0);
  const [resetRequested,setResetRequested]=useState(false);
  const recoveryChannel=useRef<BroadcastChannel|null>(null);
  useEffect(()=>{
    if(mode!=='reset' || typeof BroadcastChannel==='undefined')return;
    const channel=new BroadcastChannel('finly.passwordRecoveryCooldown');recoveryChannel.current=channel;
    channel.onmessage=event=>{
      if(event.data==='query'){
        const remaining=verificationCooldown(Date.now(),resetAvailableKey);
        if(remaining>0)channel.postMessage(Date.now()+remaining*1000);
      }else if(typeof event.data==='number' && event.data>Date.now() && event.data<=Date.now()+61000){
        cooldownUntil.current=Math.max(cooldownUntil.current,event.data);
        try{sessionStorage.setItem(resetAvailableKey,String(cooldownUntil.current));}catch{/* Provider remains authoritative. */}
        setCooldown(Math.ceil((cooldownUntil.current-Date.now())/1000));
      }
    };
    channel.postMessage('query');
    return()=>{channel.close();recoveryChannel.current=null;};
  },[mode]);
  useEffect(()=>{
    if(mode!=='verify' && mode!=='reset')return;
    const key=mode==='reset'?resetAvailableKey:resendAvailableKey;
    if(mode==='verify' && emailInput.current)emailInput.current.value=pendingVerificationEmail();
    const update=()=>{setCooldown(Math.max(verificationCooldown(Date.now(),key),Math.max(0,Math.ceil((cooldownUntil.current-Date.now())/1000))));if(mode==='reset'){try{setResetRequested(Number(sessionStorage.getItem(resetAvailableKey))>0);}catch{/* Provider remains authoritative. */}}};
    const frame=requestAnimationFrame(update);const timer=setInterval(update,1000);
    return()=>{cancelAnimationFrame(frame);clearInterval(timer);};
  },[mode]);
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();if(busy || !configured || ((mode==='verify' || mode==='reset') && (cooldown>0 || verificationCooldown(Date.now(),mode==='reset'?resetAvailableKey:resendAvailableKey)>0)))return;const fields=new FormData(event.currentTarget);setError(null);setMessage('');
    const email=String(fields.get('email') ?? '').trim().toLowerCase();let data:unknown={email};
    if(mode==='signup'){
      if(fields.get('terms')!=='on' || fields.get('privacy')!=='on'){setError(errorCopy.LEGAL_CONSENT_REQUIRED);return;}
      if(age==='14-15' && fields.get('parentalConsent')!=='on'){setError(errorCopy.PARENT_ACKNOWLEDGEMENT_REQUIRED);return;}
      data={email,username:fields.get('username'),displayName:fields.get('displayName') ?? '',ageRange:fields.get('ageRange'),password:fields.get('password'),repeatPassword:fields.get('repeatPassword'),terms:true,privacy:true,parentalConsent:fields.get('parentalConsent')==='on'};const parsed=SignupSchema.safeParse(data);if(!parsed.success){setError(age==='Sub 14'?'Finly este momentan pentru persoane de 14 ani sau mai mult.':'Verifică username-ul, parola și confirmările obligatorii.');return;}data=parsed.data;
    }
    else if(mode==='login'){data={email,password:fields.get('loginPassword')};if(!EmailSchema.safeParse(email).success){setError('Verifică adresa de email.');return;}}
    else if(mode==='update'){const password=String(fields.get('password'));if(!PasswordSchema.safeParse(password).success || password!==fields.get('repeatPassword')){setError('Parola trebuie să aibă minimum 8 caractere, iar cele două parole să coincidă.');return;}data={password,repeatPassword:fields.get('repeatPassword'),...(recoveryTokenHash?{tokenHash:recoveryTokenHash}:{})};}
    else if(!EmailSchema.safeParse(email).success){setError('Verifică adresa de email.');return;}
    setBusy(true);
    try{const response=await fetch('/api/account/auth',{method:'POST',headers:{'Content-Type':'application/json','X-Finly-Account':accountUserId ?? ''},body:JSON.stringify({action:mode==='verify'?'resend':mode==='update' && recoveryTokenHash?'recover':mode,data})});const result=await response.json();if(!response.ok){if((mode==='verify' || mode==='reset') && result.error?.code==='RATE_LIMITED'){cooldownUntil.current=startVerificationCooldown(Date.now(),mode==='reset'?resetAvailableKey:resendAvailableKey);setCooldown(accountConfig.emailCooldownSeconds);throw new Error(mode==='reset'?'Mai așteaptă puțin înainte să ceri alt link.':'Mai așteaptă puțin înainte să ceri un email nou.');}throw new Error(result.error?.code==='RECOVERY_TEMPORARY'?errorCopy.RECOVERY_TEMPORARY:friendlyApiError(result.error?.code));}
      if(mode==='signup' && result.state!=='authenticated'){rememberVerificationEmail(email);startVerificationCooldown();window.location.assign(new URL('/verifica-email',window.location.origin).href);return;}
      if(mode==='login' || mode==='signup' || mode==='update'){clearVerificationState();broadcastAuthChange('sessionChanged',accountUserId);if(mode==='update')window.location.replace('/');else window.location.assign(mode==='login' && destination!=='/'?destination:readTrial()?.completed?'/salveaza-progresul':'/');return;}
      if(mode==='reset'){setMessage('Dacă există un cont pentru această adresă, vei primi un email cu instrucțiuni.');cooldownUntil.current=startVerificationCooldown(Date.now(),resetAvailableKey);recoveryChannel.current?.postMessage(cooldownUntil.current);setCooldown(accountConfig.emailCooldownSeconds);}else{setMessage('Dacă emailul necesită confirmare, vei primi un link nou.');rememberVerificationEmail(email);cooldownUntil.current=startVerificationCooldown();setCooldown(accountConfig.emailCooldownSeconds);}
    }catch(cause){setError(cause instanceof TypeError?'Verifică conexiunea și încearcă din nou.':cause instanceof Error?cause.message:'Mai încearcă puțin mai târziu.');}finally{setBusy(false);}
  }
  if(mode==='update' && !recoveryValid)return <AccountShell title="Acest link nu mai este valid. Cere un link nou."><Link className="app-button" href="/resetare-parola">Cere un link nou</Link></AccountShell>;
  return <AccountShell title={headings[mode]}>{!configured && <p role="status">Conturile nu sunt configurate în acest mediu.</p>}{mode==='verify' && <p>Verifică-ți emailul pentru linkul de confirmare. Dacă adresa necesită confirmare, poți cere un link nou. Verifică și folderul Spam.</p>}<form onSubmit={submit} className="account-form">{mode!=='update' && <label>Email<input ref={emailInput} name="email" required type="email" autoComplete="email" maxLength={254}/></label>}{mode==='signup' && <><UsernameField enabled={configured}/><label>Cum vrei să-ți spunem? <small>Opțional. Poți folosi un nume inventat.</small><input name="displayName" maxLength={40} autoComplete="nickname"/></label><label>Interval de vârstă<select name="ageRange" required value={age} onChange={event=>setAge(event.target.value)}><option value="">Alege intervalul</option>{accountConfig.ageOptions.map(option=><option key={option}>{option}</option>)}</select></label>{age==='Sub 14' && <p role="status">Finly este momentan pentru persoane de 14 ani sau mai mult.</p>}{age==='14-15' && <label className="account-check"><input required type="checkbox" name="parentalConsent" aria-describedby={error ? 'signup-error' : undefined} onInvalid={()=>setError(errorCopy.PARENT_ACKNOWLEDGEMENT_REQUIRED)}/>Un părinte sau tutore știe că îmi fac cont.</label>}</>}{(mode==='signup' || mode==='update') && <><PasswordField label={mode==='update'?'Parolă nouă':'Parolă'} name="password"/><PasswordField label={mode==='update'?'Confirmă parola nouă':'Repetă parola'} name="repeatPassword"/></>}{mode==='login' && <PasswordField label="Parolă" name="loginPassword"/>}{mode==='signup' && <><label className="account-check"><input type="checkbox" required name="terms" aria-describedby={error ? 'signup-error' : undefined} onInvalid={()=>setError(errorCopy.LEGAL_CONSENT_REQUIRED)}/>Accept <Link href="/termeni" target="_blank" rel="noopener noreferrer">Termenii și condițiile</Link>.</label><label className="account-check"><input type="checkbox" required name="privacy" aria-describedby={error ? 'signup-error' : undefined} onInvalid={()=>setError(errorCopy.LEGAL_CONSENT_REQUIRED)}/>Am citit <Link href="/confidentialitate" target="_blank" rel="noopener noreferrer">Politica de confidențialitate</Link>.</label></>}{error && <p id="signup-error" ref={alert} role="alert" tabIndex={-1}>{error}</p>}{mode==='update' && (error===errorCopy.RECOVERY_REQUIRED || error===errorCopy.RECOVERY_AUTH_REQUIRED) && <Link href="/resetare-parola">Cere un link nou</Link>}{message && <p role="status">{message}</p>}<button className="app-button" disabled={busy || !configured || (mode==='signup' && age==='Sub 14') || cooldown>0}>{busy?(mode==='signup'?'Se creează contul...':mode==='login'?'Te conectăm...':'Lucrăm la cererea ta...'):mode==='signup'?'Creează-mi cont':mode==='login'?'Conectează-te':mode==='reset'?(cooldown>0?`Retrimite peste ${cooldown}s`:resetRequested?'Retrimite linkul':'Trimite linkul'):mode==='update'?'Salvează parola':cooldown>0?`Retrimite peste ${cooldown}s`:'Retrimite emailul'}</button></form>{mode==='login' && <><Link href="/resetare-parola">Ai uitat parola?</Link><p>Nu ai cont? <Link href="/creeaza-cont">Creează unul</Link></p></>}{mode==='verify' && <><p>Ai confirmat deja emailul? <Link href="/autentificare">Conectează-te</Link></p><p><Link href="/resetare-parola">Ai uitat parola?</Link></p><p className="account-small"><Link href="/creeaza-cont">Ai folosit alt email? Înapoi la creare cont</Link></p></>}{mode==='signup' && <p>Am deja cont. <Link href="/autentificare">Conectează-te</Link></p>}</AccountShell>;
}
