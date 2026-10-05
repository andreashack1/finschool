'use client';
import { useEffect } from 'react';
import { initializeAccount,useProgressData,refreshProgress } from '../../src/lib/use-progress';
import { readTrial } from '../../src/lib/account/onboarding';
export function AccountBoundary({userId,children}:{userId:string|null;children:React.ReactNode}) {
  useEffect(()=>{
    const allowed=['/salveaza-progresul','/actualizeaza-parola','/resetare-parola','/verifica-email','/termeni','/confidentialitate'];
    if(userId && readTrial()?.completed && !allowed.includes(window.location.pathname)){window.location.replace(new URL('/salveaza-progresul',window.location.origin).href);return;}
    return initializeAccount(userId);
  },[userId]);
  const progress=useProgressData();
  if(progress.authTransition)return <main className="account-loading" aria-busy="true">Pregătim contul tău…</main>;
  if(userId && (!progress.hydrated || progress.userId!==userId))return <main className="account-loading" aria-busy="true"><p>Pregătim locul tău în Finly…</p>{progress.syncError && <><p role="status">{progress.syncError}</p><button className="app-button" onClick={()=>void refreshProgress()}>Reîncearcă</button></>}</main>;
  return <>{children}{userId && (progress.pendingCount>0 || progress.syncError) && <div className="account-sync" role="status">{progress.syncError ?? 'Îți salvăm progresul…'}</div>}</>;
}
