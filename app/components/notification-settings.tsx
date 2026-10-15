'use client';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { defaultPreferences, preferencesSchema, type Preferences } from '../../src/lib/simulator/notifications/model';
import { notificationRequest, pushSupported, unregisterDevice } from '../../src/lib/simulator/notifications/client';
export default function NotificationSettings({ userId }: { userId: string }) {
  const [p, setP] = useState<Preferences>(defaultPreferences), [configured, setConfigured] = useState(false), [loaded, setLoaded] = useState(false), [busy, setBusy] = useState(false), [message, setMessage] = useState(''), [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('unsupported');
  const [installHint, setInstallHint] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => { setPermission(pushSupported() ? Notification.permission : 'unsupported'); setInstallHint(globalThis.isSecureContext && !pushSupported() && (navigator as Navigator & { standalone?: boolean }).standalone === false); void notificationRequest(userId, '/preferences').then(value => { const parsed = z.object({ preferences: preferencesSchema, configured: z.boolean() }).parse(value); setP(parsed.preferences); setConfigured(parsed.configured); setLoaded(true); }).catch(() => setMessage('Nu putem încărca setările acum.')); }, 0);
    return () => clearTimeout(timer);
  }, [userId]);
  async function save(next: Preferences) {
    const previous = p; let saved = false;
    setBusy(true); setMessage(''); setP(next);
    try { await notificationRequest(userId, '/preferences', next); saved = true; if (!next.push_enabled) await unregisterDevice(userId); }
    catch { if (!saved) setP(previous); setMessage('Nu putem actualiza setările acum. Reîncearcă.'); } finally { setBusy(false); }
  }
  async function activate() {
    if (!pushSupported() || Notification.permission === 'denied' || !configured || busy) return;
    // Must be invoked synchronously from this button gesture, before any async work.
    const permissionRequest = Notification.permission === 'granted' ? Promise.resolve('granted' as const) : Notification.requestPermission();
    setBusy(true); setMessage('');
    try {
      const result = await permissionRequest; setPermission(result);
      if (result !== 'granted') return;
      const registration = await navigator.serviceWorker.register('/finly-push-sw.js', { scope: '/', updateViaCache: 'none' });
      await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        const value = process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY!;
        const decoded = atob(value.replace(/-/g, '+').replace(/_/g, '/'));
        const key = Uint8Array.from(decoded, c => c.charCodeAt(0));
        subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key });
      }
      const resultSaved = await notificationRequest(userId, '/push', subscription.toJSON());
      if (!resultSaved.ok) throw new Error('unconfigured');
      setP(old => ({ ...old, push_enabled: true })); setMessage('Notificările push sunt activate pe acest dispozitiv.');
    } catch { setMessage('Nu am putut activa push pe acest dispozitiv. Notificările din Finly funcționează în continuare.'); }
    finally { setBusy(false); }
  }
  return <section className="notification-settings app-card" aria-labelledby="notification-settings-title"><h2 id="notification-settings-title">Notificări</h2><p>Primește notificări când apare ceva important în simulator: situații importante, plăți apropiate și rezumatul lunii.</p><label><input type="checkbox" checked={p.push_enabled} disabled={!loaded || busy || (!p.push_enabled && (permission === 'unsupported' || permission === 'denied' || !configured))} onChange={e => e.target.checked ? void activate() : void save({ ...p, push_enabled: false })}/>Notificări push</label>{permission === 'unsupported' ? <p>Notificările push nu sunt disponibile în această configurație. Notificările din Finly funcționează în continuare.</p> : permission === 'denied' ? <p>Notificările push sunt dezactivate în browser.</p> : !configured ? <p>Push nu este încă configurat. Notificările din Finly funcționează în continuare.</p> : <button className="app-button secondary" disabled={busy || !loaded} onClick={() => void activate()}>Activează notificările{p.push_enabled ? ' pe acest dispozitiv' : ''}</button>}{([{ key: 'events_push_enabled', label: 'Evenimente importante' }, { key: 'payments_push_enabled', label: 'Plăți și abonamente' }, { key: 'monthly_review_push_enabled', label: 'Rezumat lunar' }, { key: 'quiet_hours_enabled', label: 'Ore liniștite · 22:00 → 08:00' }] as const).map(item => <label key={item.key}><input type="checkbox" checked={p[item.key]} disabled={!loaded || busy} onChange={e => void save({ ...p, [item.key]: e.target.checked })}/>{item.label}</label>)}{installHint && <p>Încearcă „Adaugă pe ecranul principal”, apoi deschide Finly de acolo.</p>}<small>Orele sunt în Europe/Bucharest. Inbox-ul din Finly rămâne disponibil pe toate dispozitivele.</small>{message && <p role="status">{message}</p>}</section>;
}
