import { describe, expect, it, vi } from 'vitest';
vi.mock('server-only', () => ({}));
import { notificationBadge, notificationGroup, notificationStatus, notificationTime } from '../src/lib/simulator/notifications/inbox-view';
import { eventNotificationPresentation } from '../src/lib/simulator/notifications/observe';
import { type EventInstance } from '../src/lib/simulator/events/types';
import { bani } from '../src/lib/simulator/money';
describe('notification center presentation', () => {
  it('hides zero and preserves compact count', () => { expect(notificationBadge(0)).toBeNull(); for (const n of [1,3,9]) expect(notificationBadge(n)).toBe(String(n)); expect(notificationBadge(14)).toBe('9+'); });
  it('groups civil dates in Bucharest across UTC midnight and DST', () => {
    expect(notificationGroup('2026-10-12T21:30:00Z','2026-10-13T00:00:00Z')).toBe('Astăzi');
    expect(notificationGroup('2026-10-12T20:30:00Z','2026-10-13T00:00:00Z')).toBe('Ieri');
    expect(notificationGroup('2026-10-24T21:30:00Z','2026-10-25T22:30:00Z')).toBe('Ieri');
    expect(notificationGroup('2026-10-01T20:30:00Z','2026-10-13T00:00:00Z')).toBe('Mai vechi');
    expect(notificationTime('2026-10-13T00:00:00Z','2026-10-13T00:05:00Z')).toBe('acum 5 min');
  });
  it('keeps read distinct from outcome', () => {
    const item = {status:'active',readAt:null} as Parameters<typeof notificationStatus>[0];
    expect(notificationStatus(item)).toBe('Nou'); expect(notificationStatus({...item,readAt:'2026-10-13T00:00:00Z'})).toBe('În așteptare');
    expect(notificationStatus({...item,status:'missed'})).toBe('Ratată'); expect(notificationStatus({...item,status:'resolved'})).toBe('Rezolvată');
  });
  it('uses immutable old snapshots and structured presentation without catalog lookup', () => {
    const event = { status:'pending',scheduledAt:'2026-10-13T00:00:00Z',expiresAt:'2026-10-13T00:30:00Z',selectedCostBani:null,snapshot:{title:'Cafea după ore',description:'Colegii te invită.',options:[{id:'home',label:'Rămâi acasă'}]} } as EventInstance;
    expect(eventNotificationPresentation(event)).toMatchObject({title:'Cafea după ore',body:'Colegii te invită.',status:'active'});
    const resolved = {...event,status:'resolved' as const,resolutionMode:'automatic' as const,resolutionEffectiveAt:event.expiresAt,selectedOptionId:'home',selectedCostBani:bani(0)};
    expect(eventNotificationPresentation(resolved)).toMatchObject({status:'missed',body:'Simulatorul a ales: Rămâi acasă',amount:0,significantAt:event.expiresAt});
    expect(eventNotificationPresentation({...resolved,resolutionMode:'manual'}).body).toBe('Ai ales: Rămâi acasă');
  });
});
