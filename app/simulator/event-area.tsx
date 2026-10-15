'use client';
import Link from 'next/link';
import EventCountdown from './event-countdown';
import type { EventArea, ScheduleProfile } from '../../src/lib/simulator/events/types';
import { formatLei } from '../../src/lib/simulator/money';
import ScheduleOptions from './schedule-options';
export const eventTime = (instant: string) => new Intl.DateTimeFormat('ro-RO', { timeZone: 'Europe/Bucharest', hour: '2-digit', minute: '2-digit' }).format(new Date(instant));
export default function EventsToday({ area, busy, profile }: { area?: EventArea; busy: boolean; profile: (value: ScheduleProfile) => void }) {
  return <section className="sim-events app-card" aria-labelledby="events-title"><h2 id="events-title">Evenimentele de azi</h2>
    {!area ? <p>Pregătim situațiile zilei…</p> : area.engineStatus === 'needs_profile' ? <><p className="sim-events-intro">Înainte să pornim evenimentele</p><ScheduleOptions busy={busy} choose={profile}/></> : <>
      <p className="sim-events-intro">Situațiile care apar pe parcursul zilei.</p>
      {!area.caughtUp && <p role="status">Actualizăm zilele în care nu ai intrat…</p>}
      {area.pending.length === 0 ? <p className="sim-empty">Momentan nu ai nicio decizie de luat.</p> : <ul className="sim-event-list">{area.pending.map(event => <li key={event.id}><div><strong>{event.title}</strong><p className="sim-event-preview">{event.description}</p>{area.serverNow&&<EventCountdown compact expiresAt={event.expiresAt} serverNow={area.serverNow}/>}</div>{area.caughtUp && <Link className="app-button secondary" href={`/simulator/eveniment/${event.id}`}>Vezi opțiunile</Link>}</li>)}</ul>}
      {area.resolved.length > 0 && <div className="sim-events-resolved"><h3>Rezolvate azi</h3><ul className="sim-event-list">{area.resolved.map(event => <li key={event.id}><div><strong>{event.title}</strong><span>{event.resolutionMode === 'automatic' ? 'Ales automat · ' : ''}{event.options.find(o => o.id === event.selectedOptionId)?.label} · {formatLei(event.selectedCostBani! )}</span></div><Link href={`/simulator/eveniment/${event.id}`}>Vezi rezultatul</Link></li>)}</ul></div>}
    </>}
  </section>;
}
