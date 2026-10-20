'use client';
import { useEffect,useRef,useState } from 'react';
import { useRouter } from 'next/navigation';
import { initializeAccount,useProgressData,refreshProgress,cleanupAccount } from '../../src/lib/use-progress';
import { clearVerificationState } from '../../src/lib/account/verification';
import { readTrial } from '../../src/lib/account/onboarding';
import { logoutAccount,logoutErrorCopy,logoutUnconfirmedCopy } from '../../src/lib/account/logout';
export function AccountBoundary({userId,children}:{userId:string|null;children:React.ReactNode}) {
  const router=useRouter();const [busy,setBusy]=useState(false);const retrying=useRef(false);
  useEffect(()=>{
    if(userId)clearVerificationState();
    const allowed=['/salveaza-progresul','/actualizeaza-parola','/resetare-parola','/verifica-email','/termeni','/confidentialitate'];
    if(userId && readTrial()?.completed && !allowed.includes(window.location.pathname)){window.location.replace(new URL('/salveaza-progresul',window.location.origin).href);return;}
    return initializeAccount(userId);
  },[userId]);
  const progress=useProgressData();
  async function retryLogout() {
    if(retrying.current)return;retrying.current=true;setBusy(true);
    let success=false;
    try{success=await logoutAccount(userId);}finally{cleanupAccount(!success);retrying.current=false;setBusy(false);}
    if(success){router.replace('/bun-venit');router.refresh();}
  }
  if(progress.logoutFailed)return <main className="account-loading"><p role="alert">{logoutErrorCopy}</p><p>{logoutUnconfirmedCopy}</p><button className="app-button" disabled={busy} onClick={()=>void retryLogout()}>{busy?'Te deconectăm…':'Reîncearcă deconectarea'}</button></main>;
  if(progress.authTransition)return <main className="account-loading" aria-busy="true">Pregătim contul tău…</main>;
  if(userId && (!progress.hydrated || progress.userId!==userId))return <main className="account-loading" aria-busy="true"><p>Pregătim locul tău în Finly…</p>{progress.syncError && <><p role="status">{progress.syncError}</p><button className="app-button" onClick={()=>void refreshProgress()}>Reîncearcă</button></>}</main>;
  return <>{children}{userId && (progress.pendingCount>0 || progress.syncError) && <div className="account-sync" role="status">{progress.syncError ?? 'Îți salvăm progresul…'}</div>}</>;
}
