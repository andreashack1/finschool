'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect,useRef,useState } from 'react';
import { cleanupAccount,friendlyApiError,refreshProgress,useProgressData } from '../../src/lib/use-progress';
import { ProfileUpdateSchema } from '../../src/lib/account/schemas';
import { UsernameField } from './account-screens';
import { logoutAccount } from '../../src/lib/account/logout';
import { X } from 'lucide-react';
export function AccountSettings({ onClose }: { onClose: () => void }) {
  const router=useRouter();const leaving=useRef(false);
  const p=useProgressData();const [deletion,setDeletion]=useState(0);const [confirmation,setConfirmation]=useState('');const [busy,setBusy]=useState(false);const [error,setError]=useState('');const alert=useRef<HTMLParagraphElement>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const panel=dialog.current;panel?.showModal();return()=>panel?.close();},[]);
  useEffect(()=>{if(error)alert.current?.focus();},[error]);
  if(!p.profile)return null;
  async function request(url:string,method:string,data:unknown) {const response=await fetch(url,{method,headers:{'Content-Type':'application/json','X-Finly-Account':p.userId ?? ''},body:JSON.stringify(data)});const result=await response.json();if(!response.ok)throw new Error(friendlyApiError(result.error?.code));return result;}
  async function save(event:React.FormEvent<HTMLFormElement>) {event.preventDefault();if(busy)return;const fields=new FormData(event.currentTarget);const parsed=ProfileUpdateSchema.safeParse({username:fields.get('username'),displayName:fields.get('displayName')});if(!parsed.success){setError('Verifică username-ul și numele afișat.');alert.current?.focus();return;}setBusy(true);setError('');try{await request('/api/account/profile','POST',parsed.data);dialog.current?.close();void refreshProgress();}catch(cause){setError(cause instanceof Error?cause.message:'Nu putem salva acum.');}finally{setBusy(false);}}
  async function leave(remove=false) {
    if(busy || leaving.current)return;leaving.current=true;setBusy(true);setError('');
    try {
      if(remove)await request('/api/account/profile','DELETE',{confirmation});
      else {
        let success=false;
        try{success=await logoutAccount(p.userId);}finally{cleanupAccount(!success);}
        if(!success)return;
      }
      if(remove)cleanupAccount();
      router.replace('/bun-venit');router.refresh();
    }catch(cause){setError(cause instanceof Error?cause.message:'Nu putem finaliza acum.');}
    finally{leaving.current=false;setBusy(false);}
  }
  // Strict Mode can deliver a cleanup close event after the dialog has reopened.
  return <dialog ref={dialog} className="profile-settings-dialog" aria-labelledby="profile-settings-title" onClose={event=>{if(!event.currentTarget.open)onClose();}} onCancel={event=>{if(busy)event.preventDefault();}}>
    <header><h2 id="profile-settings-title">Editează profilul</h2><button type="button" className="profile-utility" aria-label="Închide setările profilului" disabled={busy} onClick={()=>dialog.current?.close()}><X size={20} aria-hidden="true"/></button></header>
    <div className="profile-settings-body">
      {error && <p ref={alert} tabIndex={-1} role="alert">{error}</p>}
      <form className="account-form" onSubmit={save}><fieldset disabled={busy}><legend className="sr-only">Profil</legend><UsernameField initial={p.profile.username}/><label>Nume afișat<input name="displayName" defaultValue={p.profile.display_name ?? ''} maxLength={40}/></label></fieldset><div className="profile-form-actions"><button className="app-button" disabled={busy}>{busy?'Salvăm…':'Salvează profilul'}</button><button type="button" className="app-button secondary" disabled={busy} onClick={()=>dialog.current?.close()}>Renunță</button></div></form>
      <section className="profile-security" aria-labelledby="profile-security-title"><h3 id="profile-security-title">Cont și securitate</h3><Link className="account-action" href="/resetare-parola">Schimbă parola</Link><button className="account-action" disabled={busy} onClick={()=>void leave()}>Deconectează-te</button></section>
      <section className="account-danger" aria-labelledby="profile-danger-title"><h3 id="profile-danger-title">Șterge contul</h3>{deletion===0?<button className="account-action" disabled={busy} onClick={()=>setDeletion(1)}>Șterge contul</button>:deletion===1?<><p>Această acțiune șterge definitiv progresul.</p><button className="app-button secondary" disabled={busy} onClick={()=>setDeletion(2)}>Continuă</button><button className="account-action" disabled={busy} onClick={()=>setDeletion(0)}>Renunță</button></>:<><label>Scrie username-ul exact: {p.profile.username}<input value={confirmation} disabled={busy} onChange={event=>setConfirmation(event.target.value)} autoComplete="off"/></label><button className="app-button" disabled={busy || confirmation!==p.profile.username} onClick={()=>void leave(true)}>Șterge definitiv contul</button><button className="account-action" disabled={busy} onClick={()=>setDeletion(0)}>Renunță</button></>}</section>
      <p className="profile-legal"><Link href="/termeni" target="_blank" rel="noopener noreferrer">Termeni</Link> · <Link href="/confidentialitate" target="_blank" rel="noopener noreferrer">Confidențialitate</Link></p>
    </div>
  </dialog>;
}
