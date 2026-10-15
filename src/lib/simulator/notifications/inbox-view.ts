import { z } from 'zod';
import { addDays, dayKey } from '../calendar';
export const inboxSchema = z.object({ unread: z.number().int().nonnegative(), serverNow: z.string(), nextSyncAt: z.string().nullable(), items: z.array(z.object({ id: z.uuid(), title: z.string(), body: z.string(), availableAt: z.string(), readAt: z.string().nullable(), status: z.enum(['active', 'missed', 'resolved', 'information']), amount: z.number().nullable(), expiresAt: z.string().nullable() })) });
export type Inbox = z.infer<typeof inboxSchema>;
export function notificationGroup(at: string, now: string) {
  const day = dayKey(new Date(at)), today = dayKey(new Date(now));
  return day === today ? 'Astăzi' : day === addDays(today, -1) ? 'Ieri' : 'Mai vechi';
}
export function notificationTime(at: string, now: string) {
  const minutes = Math.max(0, Math.floor((Date.parse(now) - Date.parse(at)) / 60000));
  if (minutes < 1) return 'Acum';
  if (minutes < 60) return `acum ${minutes} min`;
  if (minutes < 1440 && notificationGroup(at, now) === 'Astăzi') return `acum ${Math.floor(minutes / 60)}h`;
  return new Date(at).toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}
export function notificationStatus(item: Inbox['items'][number]) { return item.status === 'active' ? item.readAt ? 'În așteptare' : 'Nou' : item.status === 'missed' ? 'Ratată' : item.status === 'resolved' ? 'Rezolvată' : ''; }
export function notificationBadge(count: number) { return count > 9 ? '9+' : count > 0 ? String(count) : null; }
