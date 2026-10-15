'use client';
import { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { z } from 'zod';
import { createClientUuid } from '../../src/lib/uuid';
import { formatLei, bani } from '../../src/lib/simulator/money';
import { formatSimulatorDate } from '../../src/lib/simulator/dashboard';
import { financialCalendarSchema, type FinancialCalendar } from '../../src/lib/simulator/financial-calendar';
import { amountInputSchema, createSubscriptionSchema } from '../../src/lib/simulator/subscriptions';
import { useOnline } from '../../src/lib/simulator/use-online';

type Subscription = FinancialCalendar['subscriptions'][number];
const frequency = { 1: 'Lunar', 3: 'La 3 luni', 6: 'La 6 luni', 12: 'Anual' };
const money = (n: number) => `${n > 0 ? '+' : '−'}${formatLei(bani(Math.abs(n)))}`;
const monthShift = (month: string, step: number) => { const [y, m] = month.split('-').map(Number), index = y * 12 + m - 1 + step; return `${Math.floor(index / 12)}-${String(index % 12 + 1).padStart(2, '0')}`; };

export default function FinancialControls({ userId, today, balanceBani, disabled, refreshed }: { userId: string; today: string; balanceBani: number; disabled: boolean; refreshed: () => Promise<unknown> }) {
  const online = useOnline();
  const [view, setView] = useState<'calendar' | 'form' | null>(null);
  const [calendar, setCalendar] = useState<FinancialCalendar | null>(null), [month, setMonth] = useState(today.slice(0, 7)), [selected, setSelected] = useState(today);
  const [editing, setEditing] = useState<Subscription | null>(null);
  const [name, setName] = useState(''), [amount, setAmount] = useState(''), [due, setDue] = useState(today), [interval, setInterval] = useState(1), [endsOn, setEndsOn] = useState('');
  const [busy, setBusy] = useState(false), [error, setError] = useState('');
  const dialog = useRef<HTMLDialogElement>(null), operation = useRef<string | null>(null), generation = useRef(0), submitting = useRef(false);
  useEffect(() => {
    const day = new URLSearchParams(window.location.search).get('calendar');
    if (!day || !/^\d{4}-\d{2}-\d{2}$/.test(day)) return;
    const timer = setTimeout(() => { setMonth(day.slice(0, 7)); setSelected(day); setView('calendar'); }, 0);
    return () => clearTimeout(timer);
  }, []);
  const endpoint = async (path: string, body?: object, signal?: AbortSignal): Promise<unknown> => {
    const response = await fetch(`/api/simulator/${path}`, { cache: 'no-store', signal, method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', 'X-Finly-Account': userId }, ...(body ? { body: JSON.stringify(body) } : {}) });
    const value: unknown = await response.json();
    if (!response.ok) { const parsed = z.object({ error: z.object({ message: z.string() }) }).safeParse(value); throw new Error(parsed.success ? parsed.data.error.message : 'Nu am putut salva. Încearcă din nou.'); }
    return value;
  };
  useEffect(() => {
    const node = dialog.current;
    if (view && node && !node.open) node.showModal();
    if (!view && node?.open) node.close();
  }, [view]);
  useEffect(() => {
    if (view !== 'calendar') return;
    const controller = new AbortController(), current = ++generation.current;
    fetch(`/api/simulator/calendar?month=${month}`, { cache: 'no-store', signal: controller.signal, headers: { 'X-Finly-Account': userId } })
      .then(async response => { if (!response.ok) throw new Error('Nu am putut încărca calendarul.'); return financialCalendarSchema.parse(await response.json()); })
      .then(value => { if (generation.current === current) setCalendar(value); })
      .catch(e => { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : 'Calendar indisponibil.'); });
    return () => controller.abort();
  }, [view, month, today, userId]);
  const close = () => { if (!submitting.current) { setView(null); setError(''); } };
  const openForm = (s: Subscription | null) => {
    setEditing(s); setName(s?.name ?? ''); setAmount(s ? String(s.amountBani / 100) : ''); setDue(s?.nextDueOn ?? today); setInterval(s?.intervalMonths ?? 1); setEndsOn(s?.endsOn ?? ''); operation.current = null; setError(''); setView('form');
  };
  const changed = () => { operation.current = null; setError(''); };
  async function mutate(action: 'create' | 'edit' | 'cancel', input: object) {
    if (submitting.current || !online || disabled) return;
    submitting.current = true; setBusy(true); setError('');
    try {
      operation.current ??= createClientUuid();
      const value = z.object({ conflict: z.boolean(), subscription: z.unknown().optional() }).parse(await endpoint('subscriptions', { action, input: { ...input, operationId: operation.current } }));
      if (value.conflict) {
        if (value.subscription) { const latest = financialCalendarSchema.shape.subscriptions.element.parse(value.subscription); setEditing(latest); setName(latest.name); setAmount(String(latest.amountBani / 100)); setDue(latest.nextDueOn); setInterval(latest.intervalMonths); setEndsOn(latest.endsOn ?? ''); }
        operation.current = null;
        setError('Abonamentul a fost modificat pe alt dispozitiv. Am încărcat versiunea actuală.'); return;
      }
      await refreshed(); setCalendar(null); setView(null); operation.current = null;
    } catch (e) { setError(e instanceof Error ? e.message : 'Nu am putut salva.'); }
    finally { submitting.current = false; setBusy(false); }
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    const parsed = createSubscriptionSchema.safeParse({ name, amount, nextDueOn: due, intervalMonths: interval, endsOn: endsOn || null, operationId: operation.current ?? '00000000-0000-4000-8000-000000000000' });
    if (!parsed.success || due < today) { setError('Verifică numele, costul pozitiv și data plății. Data nu poate fi în trecut.'); return; }
    await mutate(editing ? 'edit' : 'create', { name, amount, nextDueOn: due, intervalMonths: interval, endsOn: endsOn || null, ...(editing ? { id: editing.id, revision: editing.revision } : {}) });
  }
  const parsedMoney = amountInputSchema.safeParse(amount), cost = parsedMoney.success ? parsedMoney.data : null;
  const selectedDay = calendar?.days.find(d => d.day === selected);
  const calendarReady = calendar?.month === month;
  return <><div className="sim-financial-actions"><button type="button" disabled={disabled} className="sim-calendar-action" onClick={() => { setMonth(today.slice(0, 7)); setSelected(today); setCalendar(null); setError(''); setView('calendar'); }}><CalendarDays size={15}/>Calendar</button><button type="button" disabled={disabled} className="sim-add-action" onClick={() => openForm(null)}><Plus size={15}/>Adaugă abonament</button></div>
    <dialog className="sim-financial-dialog" ref={dialog} aria-labelledby="sim-financial-title" onCancel={event => { event.preventDefault(); close(); }} onClose={close}>
      <div className="sim-financial-panel"><header><h2 id="sim-financial-title">{view === 'calendar' ? 'Calendar financiar' : editing ? 'Editează abonamentul' : 'Adaugă abonament'}</h2><button type="button" aria-label="Închide" disabled={!online || busy} onClick={close}><X size={20}/></button></header>
      {error && <p role="alert" className="sim-financial-error">{error}</p>}
      {view === 'form' && <form onSubmit={save}><fieldset disabled={!online || busy}><label>Nume abonament<input autoFocus maxLength={60} required placeholder="Ex. Abonament sală" value={name} onChange={e => { changed(); setName(e.target.value); }}/></label><label>Cost<span className="sim-money-input"><input aria-label="Cost" required inputMode="decimal" placeholder="300" value={amount} onChange={e => { changed(); setAmount(e.target.value); }}/><span>lei</span></span></label><label>Data plății<input required type="date" min={today} value={due} onChange={e => { changed(); setDue(e.target.value); }}/></label><label className="sim-secondary-field">Se repetă<select aria-label="Se repetă" value={interval} onChange={e => { changed(); setInterval(Number(e.target.value)); }}>{Object.entries(frequency).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><details className="sim-secondary-field"><summary>{endsOn ? 'Până la…' : 'Fără dată de final'}</summary><label>Data de final<input type="date" min={due} value={endsOn} onChange={e => { changed(); setEndsOn(e.target.value); }}/></label></details>
      {cost !== null && due && <p className="sim-financial-preview">{formatLei(cost)} · {frequency[interval as keyof typeof frequency].toLocaleLowerCase('ro-RO')} · următoarea plată {formatSimulatorDate(due)}</p>}
      {due === today && <p className="sim-financial-note">{editing ? 'Plata de astăzi va fi înregistrată după salvare dacă nu a fost deja procesată.' : 'Prima plată este astăzi și va fi înregistrată imediat după salvare.'}{cost !== null && cost > balanceBani && <><br/>Plata de astăzi poate duce soldul sub 0 lei.</>}</p>}
      <button type="submit" className="app-button sim-save-subscription">{busy ? 'Se salvează…' : editing ? 'Salvează modificările' : 'Salvează abonamentul'}</button></fieldset></form>}
      {view === 'calendar' && <><div className="sim-month-selector"><button type="button" aria-label="Luna precedentă" disabled={!calendarReady || month <= calendar!.firstMonth} onClick={() => { setMonth(monthShift(month, -1)); setSelected(`${monthShift(month, -1)}-01`); setError(''); }}><ChevronLeft size={20}/></button><strong>{formatSimulatorDate(month, true)}</strong><button type="button" aria-label="Luna următoare" disabled={!calendarReady || month === '9999-12'} onClick={() => { setMonth(monthShift(month, 1)); setSelected(`${monthShift(month, 1)}-01`); setError(''); }}><ChevronRight size={20}/></button></div>
      {!calendarReady ? <p role="status">Încărcăm calendarul…</p> : <><div className="sim-calendar-grid" aria-label={formatSimulatorDate(month, true)}>{['Lu','Ma','Mi','Jo','Vi','Sâ','Du'].map(d => <span className="sim-weekday" key={d}>{d}</span>)}{Array.from({ length: calendar!.days[0].weekday }, (_, i) => <span key={`empty-${i}`}/>)}{calendar!.days.map(d => <button type="button" key={d.day} aria-label={`${formatSimulatorDate(d.day)}${d.day === today ? ', astăzi' : ''}, ${d.items.length} mișcări financiare`} aria-pressed={d.day === selected} aria-current={d.day === today ? 'date' : undefined} className={`${d.day === today ? 'today' : ''} ${d.day === selected ? 'selected' : ''}`} onClick={() => setSelected(d.day)}><span>{Number(d.day.slice(-2))}</span>{d.day === today && <small>Azi</small>}{d.items.length > 0 && <span className="sim-day-marker" aria-hidden="true">$</span>}</button>)}</div>
      <section className="sim-selected-day" aria-live="polite"><h3>{formatSimulatorDate(selected)}</h3>{selectedDay?.items.length ? selectedDay.items.map((item, i) => <div className="sim-calendar-item" key={i}><span><strong>{item.title}</strong><small>{item.status === 'received' ? 'Încasat' : item.status === 'paid' ? 'Plătit' : item.sourceType === 'subscription' ? 'De plată' : 'Urmează'}</small></span><strong>{money(item.amountBani)}</strong></div>) : <p>Nicio mișcare financiară în această zi.</p>}</section>
      <section className="sim-subscription-management"><h3>Abonamentele mele</h3>{calendar!.subscriptions.filter(s => s.status === 'active').length === 0 && <p>Nu ai abonamente active.</p>}{calendar!.subscriptions.filter(s => s.status === 'active').map(s => <div className="sim-managed-subscription" key={s.id}><div><strong>{s.name}</strong><span>{formatLei(s.amountBani)} · {frequency[s.intervalMonths as keyof typeof frequency]}</span><small>{s.endsOn && s.nextDueOn > s.endsOn ? 'Perioada s-a încheiat' : `Următoarea plată: ${formatSimulatorDate(s.nextDueOn)}`}</small></div><div className="sim-management-actions"><button type="button" disabled={!online || busy} onClick={() => openForm(s)}>Editează</button><button type="button" disabled={!online || busy} onClick={() => { if (window.confirm(`Anulează abonamentul „${s.name}”? Plățile deja înregistrate rămân în jurnal.`)) { operation.current = null; void mutate('cancel', { id: s.id, revision: s.revision }); } }}>Anulează abonamentul</button></div></div>)}</section></> }</>}
      </div>
    </dialog></>;
}
