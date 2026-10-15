'use client';
import { useState } from 'react';
import { lifeProfileConfig, lifeProfilePresets } from '../../src/content/simulator/life-profile-config';
import type { LifeProfile } from '../../src/lib/simulator/life-profile';
import { bani, formatLei } from '../../src/lib/simulator/money';

export default function LifeSetup({ busy, start }: { busy: boolean; start: (profile: LifeProfile) => void }) {
  const [step, setStep] = useState(0);
  const [activity, setActivity] = useState<LifeProfile['activityStatus'] | null>(null);
  const [housing, setHousing] = useState<LifeProfile['housingStatus'] | null>(null);
  const [transport, setTransport] = useState<LifeProfile['transportMode'] | null>(null);
  const profile: LifeProfile | null = activity && housing && transport ? { version: 1, activityStatus: activity, housingStatus: housing, transportMode: transport } : null;
  const config = profile ? lifeProfileConfig(profile) : null;
  const schedule = activity ? lifeProfilePresets.schedules[activity] : null;
  const clock = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const questions = ['Ce faci în perioada asta?', 'Cu cine locuiești?', 'Cum te deplasezi de obicei?'];
  const choices = [
    [{ label: 'Sunt la liceu', value: 'liceu' }, { label: 'Muncesc', value: 'lucrez' }],
    [{ label: 'Cu părinții / familia', value: 'parinti' }, { label: 'Pe cont propriu', value: 'chirie' }],
    [{ label: 'Transport public', value: 'public' }, { label: 'Mai mult pe jos', value: 'walk' }],
  ];
  const selected = [activity, housing, transport][step];
  return <section className="sim-life-setup app-card" aria-busy={busy}>
    <header><h1>{step < 3 ? 'Cum începi?' : 'Așa începi'}</h1><p>{step < 3 ? 'Alege situația cu care vrei să începi în simulator.' : 'Banii și programul urmează alegerile tale.'}</p></header>
    {step < 3 ? <><p className="sim-muted">{step + 1} / 3</p><h2>{questions[step]}</h2><p>Răspunsurile schimbă programul, banii și situațiile care pot apărea.</p>
      <div className="sim-life-options">{choices[step].map(c => <button key={c.value} className={`sim-housing ${selected === c.value ? 'selected' : ''}`} aria-pressed={selected === c.value} disabled={busy} onClick={() => {
        if (step === 0) setActivity(c.value as LifeProfile['activityStatus']);
        if (step === 1) setHousing(c.value as LifeProfile['housingStatus']);
        if (step === 2) setTransport(c.value as LifeProfile['transportMode']);
      }}>{c.label}</button>)}</div></> : config && profile && schedule && <>
      <p>{activity === 'liceu' ? 'Liceu' : 'Muncesc'} · {housing === 'parinti' ? 'Cu părinții / familia' : 'Pe cont propriu'} · {transport === 'public' ? 'Transport public' : 'Mai mult pe jos'}</p>
      <dl className="sim-preview-facts"><div><dt>{activity === 'liceu' ? 'Buget lunar' : 'Salariu'}</dt><dd>{formatLei(config.monthlyIncomeBani)} / lună</dd></div>
        {config.recurringInflows?.map(e => <div key={e.id}><dt>{e.label}</dt><dd>+{formatLei(e.amountBani)}</dd></div>)}
        <div><dt>{housing === 'chirie' ? 'Chirie' : 'Locuință'}</dt><dd>{formatLei(config.housing[profile.housingStatus].amountBani)}</dd></div>
        <div><dt>Transport</dt><dd>{formatLei(transport === 'public' ? lifeProfilePresets.transportBani : bani(0))}</dd></div>
        <div><dt>Program luni–vineri</dt><dd>{clock(schedule.start)}–{clock(schedule.end)}</dd></div></dl></>}
    <div className="sim-life-actions">{step > 0 && <button className="app-button secondary" disabled={busy} onClick={() => setStep(step - 1)}>Înapoi</button>}
      {step < 3 ? <button className="app-button" disabled={busy || !selected} onClick={() => setStep(step + 1)}>Continuă</button> : <button className="app-button" disabled={busy || !profile} onClick={() => profile && start(profile)}>{busy ? 'Pornim simularea…' : 'Începe simularea'}</button>}</div>
  </section>;
}
