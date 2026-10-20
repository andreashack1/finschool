'use client';
import type { ScheduleProfile } from '../../src/lib/simulator/events/types';

const schedules = [
  { value: 'liceu', label: 'Sunt la liceu', description: 'În timpul săptămânii, programul principal este dimineața și la prânz.', hours: '08:00–14:00' },
  { value: 'lucrez', label: 'Lucrez', description: 'În timpul săptămânii, programul principal este în timpul zilei.', hours: '09:00–17:00' },
] as const;

export default function ScheduleOptions({ selected, busy, choose, setup = false }: { selected?: ScheduleProfile | null; busy: boolean; choose: (value: ScheduleProfile) => void; setup?: boolean }) {
  return <fieldset className="sim-schedule" disabled={busy}>
    <legend>Cum arată ziua ta de obicei?</legend>
    <p>Folosim programul doar ca situațiile din SimLife să apară la ore care au sens.</p>
    <div className="sim-schedule-options">{schedules.map(option => setup ?
      <label key={option.value} className={`sim-schedule-option ${selected === option.value ? 'selected' : ''}`}>
        <span><input type="radio" name="schedule" checked={selected === option.value} onChange={() => choose(option.value)}/><strong>{option.label}</strong></span>
        <span>{option.description}</span><small>Scenariu: {option.hours}</small>
      </label> :
      <button key={option.value} type="button" className="sim-schedule-option" onClick={() => choose(option.value)}>
        <strong>{option.label}</strong><span>{option.description}</span><small>Scenariu: {option.hours}</small>
      </button>
    )}</div>
    <p className="sim-schedule-note">Programul influențează doar momentul în care pot apărea situațiile din SimLife. Nu schimbă salariul.</p>
  </fieldset>;
}
