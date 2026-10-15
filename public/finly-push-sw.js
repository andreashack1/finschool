/* Push only. Deliberately no fetch handler and no application cache. */
'use strict';
const safeTarget = value => /^\/simulator(?:\/eveniment\/[0-9a-f-]{36}|\?calendar=\d{4}-\d{2}-\d{2})?$/.test(value) ? value : '/simulator';
self.addEventListener('push', event => {
  event.waitUntil((async () => {
    try {
      const id = event.data?.json()?.notificationId;
      if (typeof id !== 'string' || !/^[0-9a-f-]{36}$/.test(id)) return;
      const response = await fetch(`/api/notifications/push/display?id=${encodeURIComponent(id)}`, { credentials: 'include', cache: 'no-store', redirect: 'error' });
      if (!response.ok) return;
      const item = await response.json();
      if (!item || typeof item.title !== 'string' || typeof item.body !== 'string') return;
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      if (clients.some(client => client.visibilityState === 'visible' && new URL(client.url).pathname.startsWith('/simulator'))) {
        clients.forEach(client => client.postMessage({ type: 'finly-notifications-refresh' })); return;
      }
      await self.registration.showNotification(item.title, { body: item.body, tag: item.tag, data: { id, target: safeTarget(item.target) }, icon: '/icons/finly-192.png' });
    } catch { /* Offline, stale session or invalid payload: suppress private content. */ }
  })());
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    // Revalidate on click too: a resolved target falls back to the simulator.
    let target = '/simulator';
    try {
      const id = event.notification.data?.id;
      const validation = await fetch(`/api/notifications/push/display?id=${encodeURIComponent(id)}`, { credentials: 'include', cache: 'no-store', redirect: 'error' });
      if (validation.ok && await validation.json()) {
        const response = await fetch('/api/notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }), credentials: 'include', cache: 'no-store', redirect: 'error' });
        if (response.ok) target = safeTarget((await response.json())?.target);
      }
    } catch { /* Auth protection handles an expired session at the safe fallback. */ }
    const url = new URL(target, self.location.origin).href;
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const client = clients.find(c => new URL(c.url).origin === self.location.origin);
    if (client) { await client.navigate(url); await client.focus(); }
    else await self.clients.openWindow(url);
  })());
});
