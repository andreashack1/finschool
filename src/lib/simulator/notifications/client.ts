'use client';
export class NotificationSessionError extends Error {}
export function pushSupported() {
  return typeof window !== 'undefined' && globalThis.isSecureContext && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}
export async function notificationRequest(userId: string, path: string, body?: object, method = 'POST') {
  const response = await fetch(`/api/notifications${path}`, { method: body === undefined ? 'GET' : method, cache: 'no-store', signal: AbortSignal.timeout(20000), headers: { 'Content-Type': 'application/json', 'X-Finly-Account': userId }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  if (response.status === 401) throw new NotificationSessionError('Contul s-a schimbat.');
  if (!response.ok) throw new Error('Nu putem actualiza notificările acum.');
  return response.json();
}
export function refreshNotifications() { window.dispatchEvent(new Event('finly-notifications-refresh')); }
export async function unregisterDevice(userId: string) {
  if (!pushSupported()) return;
  const registration = await navigator.serviceWorker.getRegistration('/');
  for (const notification of await registration?.getNotifications() ?? []) notification.close();
  const subscription = await registration?.pushManager.getSubscription();
  if (!subscription) return;
  try { await notificationRequest(userId, '/push', { endpoint: subscription.endpoint }, 'DELETE'); }
  finally { await subscription.unsubscribe(); }
}
