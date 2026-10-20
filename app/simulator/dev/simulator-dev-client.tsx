'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import NotificationDiagnostics from '../../components/notification-diagnostics';
import { simulatorResponseSchema, type SimulatorResponse } from '../../../src/lib/simulator/api-types';
import { formatLei } from '../../../src/lib/simulator/money';
import type { Housing } from '../../../src/lib/simulator/types';

export default function SimulatorDevClient({ userId }: { userId: string }) {
  const [data, setData] = useState<SimulatorResponse | null>(null);
  const [housing, setHousing] = useState<Housing>('parinti');
  const [activity, setActivity] = useState<'liceu' | 'lucrez'>('liceu');
  const [transport, setTransport] = useState<'public' | 'walk'>('public');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [diagnostics, setDiagnostics] = useState<unknown>(null);
  const [lifeDay,setLifeDay]=useState('2026-10-01');
  const pending = useRef(false);
  const request = useCallback(async (path: string, body?: object, signal?: AbortSignal) => {
    const response = await fetch(path, { method: body === undefined ? 'GET' : 'POST', cache: 'no-store', signal, headers: { 'Content-Type': 'application/json', 'X-Finly-Account': userId }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    const json: unknown = await response.json();
    if (!response.ok) {
      const parsed = z.object({ error: z.object({ message: z.string() }) }).safeParse(json);
      throw new Error(parsed.success ? parsed.data.error.message : 'Cererea nu a putut fi finalizată.');
    }
    return simulatorResponseSchema.parse(json);
  }, [userId]);
  useEffect(() => {
    const controller = new AbortController();
    request('/api/simulator/state', undefined, controller.signal).then(setData).catch(e => { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : 'Nu am putut citi starea.'); });
    return () => controller.abort();
  }, [request]);
  async function act(path: string, body: object) {
    if (pending.current) return;
    pending.current = true; setBusy(true); setError('');
    try { setData(await request(path, body)); } catch (e) { setError(e instanceof Error ? e.message : 'Cererea a eșuat.'); }
    finally { pending.current = false; setBusy(false); }
  }
  const run = data?.run, state = data?.state;
  async function inspect(minutes?: number) {
    if (pending.current) return;
    pending.current = true; setBusy(true); setError('');
    try {
      const response = await fetch('/api/simulator/dev/events', { method: minutes ? 'POST' : 'GET', cache: 'no-store', headers: { 'Content-Type': 'application/json', 'X-Finly-Account': userId }, ...(minutes ? { body: JSON.stringify({ minutes }) } : {}) });
      if (!response.ok) throw new Error('Nu putem actualiza diagnosticul acum.');
      setDiagnostics(await response.json());
      setData(await request('/api/simulator/state'));
    } catch (e) { setError(e instanceof Error ? e.message : 'Nu putem actualiza acum.'); }
    finally { pending.current = false; setBusy(false); }
  }
  async function profile(value: 'liceu' | 'lucrez') {
    if (pending.current) return;
    pending.current = true; setBusy(true);
    try { const response = await fetch('/api/simulator/profile', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Finly-Account': userId }, body: JSON.stringify({ profile: value }) }); if (!response.ok) throw new Error('Nu putem salva programul.'); }
    catch (e) { setError(e instanceof Error ? e.message : 'Nu putem salva.'); }
    finally { pending.current = false; setBusy(false); }
    await inspect();
  }
  async function demo(scenario: string) {
    if (pending.current) return;
    pending.current = true; setBusy(true); setError('');
    try {
      const response = await fetch('/api/simulator/dev/consequences', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Finly-Account': userId }, body: JSON.stringify({ scenario }) });
      if (!response.ok) throw new Error('Scenariul nu poate fi planificat. Verifică run-ul, programul și sincronizarea.');
      setDiagnostics(await response.json());
    } catch (e) { setError(e instanceof Error ? e.message : 'Nu putem planifica.'); }
    finally { pending.current = false; setBusy(false); }
  }
  return <main className="mx-auto max-w-5xl space-y-6 p-6"><NotificationDiagnostics userId={userId}/>
    <h1 className="text-2xl font-bold">SimLife — development</h1><button className="rounded-lg border p-3" onClick={async () => { const response = await fetch('/api/simulator/dev/subscriptions', { cache:'no-store', headers:{'X-Finly-Account':userId} }); if(response.ok) setDiagnostics(await response.json()); else setError('Nu putem citi abonamentele.'); }}>Inspectează abonamentele și plățile</button>
    <button className="rounded-lg border p-3" disabled={busy} onClick={async()=>{const response=await fetch('/api/simulator/dev/monthly-reviews',{cache:'no-store',headers:{'X-Finly-Account':userId}});if(response.ok)setDiagnostics(await response.json());else setError('Nu putem citi lunile încheiate.');}}>Inspectează lunile încheiate / snapshot / insights</button><a className="rounded-lg border p-3" href="/simulator">Parcurge review-ul cu Fini</a>
    <p>Fundație tehnică. Valorile economice sunt exemple educaționale.</p>
    <div className="flex flex-wrap gap-3 rounded-2xl border p-4"><label>Zi pentru analiza vieții <input type="date" value={lifeDay} onChange={e=>setLifeDay(e.target.value)} className="rounded-lg border p-2" /></label>{(['liceu','lucrez'] as const).map(profile=><button key={profile} className="rounded-lg border p-3" disabled={busy} onClick={async()=>{setBusy(true);try{const response=await fetch(`/api/simulator/dev/life?day=${encodeURIComponent(lifeDay)}&profile=${profile}&days=90&seed=finly-life-${profile}`,{cache:'no-store',headers:{'X-Finly-Account':userId}});if(!response.ok)throw new Error('Nu putem genera raportul.');setDiagnostics(await response.json());}catch(e){setError(e instanceof Error?e.message:'Raport indisponibil.');}finally{setBusy(false);}}}>Raport 90 zile — {profile==='liceu'?'Liceu':'Lucrez'}</button>)}</div>
    <div className="rounded-2xl border p-4">
      <p>Data reală: {data?.realDay ?? '…'}</p><p>Data efectivă: {data?.effectiveDay ?? '…'}</p><p>Offset: {data?.offsetDays ?? 0} zile</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label>Locuință <select className="rounded-lg border p-2" value={housing} disabled={busy || Boolean(run)} onChange={e => setHousing(e.target.value === 'chirie' ? 'chirie' : 'parinti')}><option value="parinti">Cu părinții</option><option value="chirie">Chirie</option></select></label>
        <label>Situație <select className="rounded-lg border p-2" value={activity} disabled={busy || Boolean(run)} onChange={e => setActivity(e.target.value === 'lucrez' ? 'lucrez' : 'liceu')}><option value="liceu">Liceu</option><option value="lucrez">Muncesc</option></select></label>
        <label>Transport <select className="rounded-lg border p-2" value={transport} disabled={busy || Boolean(run)} onChange={e => setTransport(e.target.value === 'walk' ? 'walk' : 'public')}><option value="public">Transport public</option><option value="walk">Mai mult pe jos</option></select></label>
        <button className="rounded-lg border px-3 py-2 focus-visible:outline-2" disabled={busy || !data || Boolean(run)} onClick={() => act('/api/simulator/run', { housing, lifeProfile: { version: 1, activityStatus: activity, housingStatus: housing, transportMode: transport } })}>Pornește run</button>
        {([1, 7, 30] as const).map(increment => <button key={increment} className="rounded-lg border px-3 py-2 focus-visible:outline-2" disabled={busy || !run} onClick={() => act('/api/simulator/dev/clock', { increment })}>{increment === 1 ? 'Mută data +1 zi' : `+${increment} zile`}</button>)}
        <button className="rounded-lg border px-3 py-2 focus-visible:outline-2" disabled={busy || !data} onClick={() => act('/api/simulator/dev/reset', {})}>Resetează</button>
      </div>
      <p className="mt-2 text-sm">Reset șterge doar run-urile SimLife pentru contul curent și readuce offset-ul la 0.</p>
    </div>
    {error && <p role="alert">{error}</p>}
    <section className="rounded-2xl border p-4"><h2>Consecințe — scenarii de verificare</h2>
      <p>Necesită run și program activ. Scenariul apare peste un minut; avansează +15 minute, apoi alege în SimLife. Aceste controale există doar în development.</p>
      <div className="mt-3 flex flex-wrap gap-3">{([
        ['coverage', 'A. Provizii 2 zile'], ['coverage_probe', 'Verifică excluderea mesei'], ['phone_problem', 'B. Problemă telefon'],
        ['phone_resolution', 'Repară telefonul'], ['phone_followup', 'A doua verificare'], ['extend', 'C. Extinde proviziile'],
      ] as const).map(([scenario, label]) => <button key={scenario} className="rounded-lg border p-3" disabled={busy || !run} onClick={() => void demo(scenario)}>{label}</button>)}</div>
      <p className="mt-3">Expirare: avansează +1 zi de două ori. Catch-up: planifică un scenariu, lasă-l fără alegere și avansează +7 zile. Inspectează effectiveAt, recordedAt și istoricul din diagnosticul motorului.</p>
    </section>
    {busy && <p role="status">Se procesează…</p>}
    <section className="rounded-2xl border p-4"><h2>Motorul de evenimente</h2><p>Programul poate fi stabilit o singură dată. Folosește reset pentru alt scenariu.</p><div className="flex flex-wrap gap-3">
      <button className="rounded-lg border p-3" disabled={busy || !run} onClick={() => void profile('liceu')}>Liceu</button><button className="rounded-lg border p-3" disabled={busy || !run} onClick={() => void profile('lucrez')}>Lucrez</button>
      <button className="rounded-lg border p-3" disabled={busy || !run} onClick={() => void inspect()}>Inspectează planul / continuă sincronizarea</button>
      {([[29,'+29 minute'],[1,'+1 minut'],[15,'+15 minute'],[60,'+1 oră'],[360,'+6 ore'],[1440,'+1 zi'],[10080,'+7 zile']] as const).map(([minutes,label]) => <button className="rounded-lg border p-3" key={minutes} disabled={busy || !run} onClick={() => void inspect(minutes)}>{label}</button>)}
    </div><p>Diagnosticul include instanțele viitoare. Acestea sunt ascunse în SimLife.</p><pre className="max-h-[600px] overflow-auto text-sm">{JSON.stringify(diagnostics,null,2)}</pre></section>
    {run && state && <>
      <section className="rounded-2xl border p-4"><h2 className="font-bold">Run</h2><dl className="grid gap-2 sm:grid-cols-2">
        <div><dt>ID</dt><dd className="break-all">{run.id}</dd></div><div><dt>Versiuni reguli / RNG</dt><dd>{run.rulesVersion} / {run.rngVersion}</dd></div>
        <div><dt>Pornit</dt><dd>{run.startedOn}</dd></div><div><dt>Decontat până la</dt><dd>{run.lastSettledOn}</dd></div>
        <div><dt>Locuință</dt><dd>{run.housing}</dd></div><div><dt>Venit lunar (exemplu)</dt><dd>{formatLei(run.monthlyIncomeBani)}</dd></div>
        <div><dt>Sold din întregul ledger</dt><dd>{state.balanceFormatted}</dd></div>
      </dl></section>
      <section className="overflow-x-auto rounded-2xl border p-4"><h2 className="font-bold">Ledger — luna curentă</h2><table className="w-full text-left text-sm"><thead><tr><th scope="col">Zi</th><th scope="col">Ordine</th><th scope="col">Tip</th><th scope="col">Descriere</th><th scope="col">Sumă</th></tr></thead><tbody>{state.ledgerThisMonth.map(e => <tr key={e.refKey}><td className="py-2">{e.day}</td><td>{e.sequence}</td><td>{e.kind}</td><td>{e.label}</td><td>{formatLei(e.amountBani)}</td></tr>)}</tbody></table></section>
      <section className="rounded-2xl border p-4"><h2 className="font-bold">Efecte active / flags / cheltuieli pe categorii</h2><pre className="overflow-x-auto text-sm">{JSON.stringify({ activeEffects: state.activeEffects, flags: state.flags, spentByCategoryThisMonth: state.spentByCategoryThisMonth, autoResolvedDecisionsThisMonth: state.autoResolvedDecisionsThisMonth }, null, 2)}</pre></section>
    </>}
  </main>;
}
