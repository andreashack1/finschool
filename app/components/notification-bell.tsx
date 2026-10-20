'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, CheckCheck, Settings, X } from 'lucide-react';
import { z } from 'zod';
import { notificationRequest, pushSupported, NotificationSessionError } from '../../src/lib/simulator/notifications/client';
import { inboxSchema, notificationBadge, notificationGroup, notificationStatus, notificationTime } from '../../src/lib/simulator/notifications/inbox-view';
import { bani, formatLei } from '../../src/lib/simulator/money';
export default function NotificationBell({ userId }: { userId: string }) {
  return <AccountNotificationBell key={userId} userId={userId}/>;
}
function AccountNotificationBell({ userId }: { userId: string }) {
  const [data, setData] = useState<z.infer<typeof inboxSchema>>({ unread: 0, items: [], serverNow: new Date().toISOString(), nextSyncAt: null });
  const [loaded, setLoaded] = useState(false);
  const mounted = useRef(false), anchor = useRef(0);
  const [open, setOpen] = useState(false), [error, setError] = useState(''), [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null), button = useRef<HTMLButtonElement>(null), flight = useRef<Promise<void> | null>(null), last = useRef(-Infinity);
  const router = useRouter();
  const mutating = useRef(false);
  const refresh = useCallback(() => {
    if (mutating.current) return Promise.resolve();
    if (flight.current) return flight.current;
    last.current = performance.now();
    const task = notificationRequest(userId, '').then(value => { if (mounted.current) { setData(inboxSchema.parse(value)); anchor.current = performance.now(); setLoaded(true); setError(''); } }).catch(error => {
      if (!mounted.current) return;
      if (error instanceof NotificationSessionError) { setData({ unread: 0, items: [], serverNow: new Date().toISOString(), nextSyncAt: null }); setLoaded(false); setOpen(false); }
      setError('Notificările nu pot fi actualizate acum.');
    }).finally(() => { if (flight.current === task) flight.current = null; });
    flight.current = task; return task;
  }, [userId]);
  useEffect(() => {
    mounted.current = true;
    const timer = setTimeout(() => void refresh(), 0);
    const visible = () => { if (document.visibilityState === 'visible' && performance.now() - last.current > 3000) void refresh(); };
    const update = () => void refresh();
    const message = (event: MessageEvent) => { if (event.data?.type === 'finly-notifications-refresh') update(); };
    window.addEventListener('finly-notifications-refresh', update); window.addEventListener('focus', update); window.addEventListener('pageshow', visible); window.addEventListener('online', update); document.addEventListener('visibilitychange', visible);
    if (pushSupported()) navigator.serviceWorker.addEventListener('message', message);
    return () => { mounted.current = false; clearTimeout(timer); window.removeEventListener('finly-notifications-refresh', update); window.removeEventListener('focus', update); window.removeEventListener('pageshow', visible); window.removeEventListener('online', update); document.removeEventListener('visibilitychange', visible); if (pushSupported()) navigator.serviceWorker.removeEventListener('message', message); };
  }, [refresh]);
  useEffect(() => { if (open) { dialog.current?.showModal(); void refresh(); } else if (dialog.current?.open) dialog.current.close(); }, [open, refresh]);
  useEffect(() => {
    if (!data.nextSyncAt) return;
    const delay = Date.parse(data.nextSyncAt) - Date.parse(data.serverNow) - (performance.now() - anchor.current) + 500;
    const timer = setTimeout(() => { if (document.visibilityState === 'visible') void refresh(); }, Math.min(2147483647, Math.max(1000, delay)));
    return () => clearTimeout(timer);
  }, [data, refresh]);
  async function read(id?: string) {
    if (busy || mutating.current) return; setBusy(true); mutating.current = true;
    try {
      await flight.current;
      const raw = await notificationRequest(userId, '', id ? { id, version: data.items.find(i => i.id === id)?.availableAt } : {});
      const value = z.object({ target: z.string().regex(/^\/simulator(?:\?calendar=\d{4}-\d{2}-\d{2}|\/eveniment\/[a-f0-9-]+)?$/) }).parse(raw), next = inboxSchema.parse(raw);
      if (mounted.current) {
        if (!id && dialog.current?.contains(document.activeElement) && document.activeElement?.classList.contains('notification-read-all')) {
          dialog.current.querySelector<HTMLButtonElement>('.notification-settings-control')?.focus();
        }
        setData(next); setError(''); anchor.current = performance.now();
      }
      if (mounted.current && id) { setOpen(false); router.push(value.target); }
    }
    catch { if (mounted.current) setError(id ? 'Nu am putut deschide acum. Încearcă din nou.' : 'Nu putem marca notificările acum. Încearcă din nou.'); } finally { mutating.current = false; if (mounted.current) setBusy(false); }
  }
  const badge = notificationBadge(data.unread);
  return <>
    <button ref={button} className="notification-bell" aria-label={`Notificări${data.unread ? `, ${data.unread} necitite` : ''}`} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}><Bell size={21}/>{badge && <span aria-hidden="true">{badge}</span>}</button>
    <dialog ref={dialog} className="notification-inbox" aria-labelledby="notification-title" onCancel={() => setOpen(false)} onClose={() => { setOpen(false); button.current?.focus(); }} onClick={event => { if (event.target === dialog.current) setOpen(false); }}>
      <header><h2 id="notification-title">Notificări</h2>{data.unread > 0 && <button className="notification-read-all" disabled={busy} onClick={() => void read()}><CheckCheck size={17} aria-hidden="true"/>Marchează citite</button>}<div className="notification-header-controls"><button className="notification-settings-control" aria-label="Setările notificărilor" onClick={() => { dialog.current?.close(); setOpen(false); router.push('/?tab=profile#notification-settings'); }}><Settings size={20} aria-hidden="true"/></button><button aria-label="Închide notificările" onClick={() => setOpen(false)}><X size={20} aria-hidden="true"/></button></div></header>
      <div className="notification-list" aria-busy={busy}>
        {error && <div role="status"><p>{error}</p><button className="notification-retry" onClick={() => void refresh()}>Încearcă din nou</button></div>}
        {!loaded && !error && <p role="status">Încărcăm notificările…</p>}
        {['Astăzi', 'Ieri', 'Mai vechi'].map(group => {
          const items = data.items.filter(item => notificationGroup(item.availableAt, data.serverNow) === group);
          return items.length ? <section key={group} aria-label={group}><h3>{group}</h3><ol>{items.map(item => <li key={item.id}><button disabled={busy} className={item.readAt ? '' : 'unread'} onClick={() => void read(item.id)}>
            <span className="notification-row-icon"><Bell size={17} aria-hidden="true"/>{!item.readAt && <span className="notification-unread-dot"/>}</span>
            <span><strong>{item.title}</strong><span className="notification-summary">{item.body}</span><span className="notification-meta">{notificationStatus(item)}{notificationStatus(item) && ' · '}<time dateTime={item.availableAt}>{notificationTime(item.availableAt, data.serverNow)}</time></span>
              {item.expiresAt && <small>Mai ai {Math.max(1, Math.ceil((Date.parse(item.expiresAt) - Date.parse(data.serverNow)) / 60000))} min</small>}
              {item.amount !== null && <small>Cost: {formatLei(bani(item.amount))}</small>}
              <span className="notification-cta">{item.status === 'active' ? 'Deschide' : 'Detalii'}</span>
              {!item.readAt && <span className="sr-only">Necitită</span>}
            </span>
          </button></li>)}</ol></section> : null;
        })}
        {loaded && !data.items.length && <div className="notification-empty"><Bell size={28} aria-hidden="true"/><strong>Ești la zi.</strong><p>Noile situații din SimLife vor apărea aici.</p></div>}
      </div>
    </dialog>
  </>;
}
