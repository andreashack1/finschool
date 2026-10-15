'use client';
import LifeSetup from './life-setup';
import type { LifeProfile } from '../../src/lib/simulator/life-profile';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, BookOpen, CalendarDays, ChevronLeft, ChevronRight, Gamepad2, Home, House, RefreshCw, ArrowLeftRight, Target, UserRound, Wallet } from 'lucide-react';
import { FinlyMascot } from '../components/finly-brand';
import { simulatorPageSchema, type SimulatorPageState } from '../../src/lib/simulator/chapter-two-api';
import { formatSimulatorDate, journalSchema, type Journal, type SimulatorDashboardState } from '../../src/lib/simulator/dashboard';
import { formatLei } from '../../src/lib/simulator/money';
import { SimulatorSync } from '../../src/lib/simulator/sync';
import EventsToday from './event-area';
import CurrentState from './current-state';
import FinancialControls from './financial-controls';
import SavingsGoalCard, { type GoalView } from './savings-goal';
import MonthlyReviewPanel from './monthly-review-panel';
import NotificationBell from '../components/notification-bell';
import { refreshNotifications } from '../../src/lib/simulator/notifications/client';
import type { EventArea, ScheduleProfile } from '../../src/lib/simulator/events/types';

const signedMoney = (amount: Parameters<typeof formatLei>[0]) => `${amount > 0 ? '+' : ''}${formatLei(amount)}`;
function Shell({ children, userId }: { children: React.ReactNode; userId: string }) {
  return <div className="finly-app simulator-app"><a className="skip-link" href="#simulator-content">Sari la conținut</a><div className="desktop-brand"><Link href="/" className="brand-word">finly<span>.</span></Link><span>Banii, pe înțelesul tău.</span></div><main className="simulator-content" id="simulator-content"><div className="notification-utility"><NotificationBell userId={userId}/></div>{children}</main><nav className="bottom-nav" aria-label="Navigare principală">{[{ href: '/', label: 'Acasă', icon: Home }, { href: '/lectii', label: 'Lecții', icon: BookOpen }, { href: '/simulator', label: 'Simulator', icon: Gamepad2 }, { href: '/?tab=profile', label: 'Profil', icon: UserRound }].map(({ href, label, icon: Icon }) => <Link key={label} href={href} aria-current={label === 'Simulator' ? 'page' : undefined} className={label === 'Simulator' ? 'active' : ''}><span><Icon size={21}/></span><strong>{label}</strong></Link>)}</nav></div>;
}
function Skeleton() {
  return <div className="sim-skeleton" aria-busy="true" role="status"><span className="sr-only">Pregătim simulatorul…</span><div className="sim-skeleton-heading"/><div className="sim-skeleton-hero"/><div className="sim-skeleton-row"><div/><div/></div><div className="sim-skeleton-journal"/></div>;
}
function FinancialJournal({ journal, busy, error, select, retry }: { journal: Journal; busy: boolean; error: boolean; select: (month: string) => void; retry: () => void }) {
  const groups = new Map<string, Journal['entries']>();
  for (const entry of journal.entries) groups.set(entry.day, [...(groups.get(entry.day) ?? []), entry]);
  return <section className="sim-journal app-card" aria-labelledby="journal-title"><div className="sim-section-top"><div><span className="card-kicker">CE S-A ÎNTÂMPLAT</span><h2 id="journal-title">Jurnal financiar</h2></div><CalendarDays size={23}/></div><div className="sim-month-selector"><button aria-label="Luna precedentă" disabled={busy || !journal.previousMonth} onClick={() => journal.previousMonth && select(journal.previousMonth)}><ChevronLeft size={20}/></button><strong>{formatSimulatorDate(journal.month, true)}</strong><button aria-label="Luna următoare" disabled={busy || !journal.nextMonth} onClick={() => journal.nextMonth && select(journal.nextMonth)}><ChevronRight size={20}/></button></div><div role="status" className="sim-journal-status">{busy ? 'Încărcăm jurnalul…' : error ? 'Nu am putut încărca luna selectată.' : ''}{error && <button className="sim-text-button" onClick={retry}>Încearcă din nou</button>}</div>
    <div aria-busy={busy}>{groups.size === 0 ? <p className="sim-empty">Nu există tranzacții în această lună.</p> : <ol className="sim-timeline">{[...groups].map(([day, entries]) => <li key={day} className="sim-timeline-day"><h3><time dateTime={day}>{formatSimulatorDate(day)}</time></h3><ol>{entries.map((entry, index) => <li className="sim-timeline-entry" key={`${entry.sequence}-${index}`}><span className={`sim-entry-icon ${entry.type === 'Transfer' ? 'transfer' : entry.amountBani < 0 ? 'expense' : ''}`} aria-hidden="true">{entry.type === 'Transfer' ? <ArrowLeftRight size={19}/> : entry.amountBani < 0 ? <ArrowUpRight size={19}/> : <ArrowDownLeft size={19}/>}</span><div><strong>{entry.label}</strong><small>{entry.type} · {entry.category}</small></div><strong className="sim-entry-amount">{signedMoney(entry.amountBani)}</strong></li>)}</ol></li>)}</ol>}</div></section>;
}
function Dashboard({ state, journal, journalBusy, journalError, selectJournal, retryJournal, heading, events, busy, profile, userId, refreshed, goalSaved }: { state: SimulatorDashboardState; journal: Journal; journalBusy: boolean; journalError: boolean; selectJournal: (month: string) => void; retryJournal: () => void; heading: React.RefObject<HTMLHeadingElement | null>; events?: EventArea; busy: boolean; profile: (value: ScheduleProfile) => void; userId: string; refreshed: () => Promise<unknown>; goalSaved: (value: SimulatorPageState) => void }) {
  const next = state.nextFinancialMovement;
  const [goalView, setGoalView] = useState<GoalView>(null);
  const [goalNotice, setGoalNotice] = useState(false);
  function putMoneyAside() {
    if (state.goal) { setGoalNotice(false); setGoalView('contribution'); return; }
    setGoalNotice(true);
    const card = document.getElementById('sim-goal-card');
    card?.focus({ preventScroll: true });
    card?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <><header className="sim-heading"><div><span className="card-kicker">VIAȚA TA FINANCIARĂ, ZI DE ZI</span><h1 ref={heading} tabIndex={-1}>Simulator</h1></div><div className="sim-date"><time dateTime={state.currentDay}>{formatSimulatorDate(state.currentDay)}</time><span>Ziua {state.simulationDay} din simulare</span><small>Timp real · Europe/Bucharest</small></div></header>
  <div className="sim-dashboard-layout"><section className="sim-balance" aria-labelledby="balance-title"><div className="sim-balance-top"><span id="balance-title">Sold disponibil</span><Wallet size={25}/></div><strong className="sim-balance-amount">{formatLei(state.balanceBani)}</strong><p>Bani fictivi pentru exercițiu</p>{state.goal && state.goal.savedAmountBani > 0 && <p>{formatLei(state.goal.savedAmountBani)} puși deoparte</p>}<button className="sim-goal-balance-action" disabled={busy || events?.caughtUp === false || state.goal?.remainingAmountBani === 0} onClick={putMoneyAside}><Target size={16}/>Pune bani deoparte</button>{!state.goal && goalNotice && <p className="sim-goal-instruction" role="status">Creează mai întâi un obiectiv pentru care vrei să pui bani deoparte.</p>}{state.balanceBani < 0 && <p className="sim-negative">Cheltuielile au depășit banii disponibili.</p>}<div className="sim-balance-foot"><span><House size={16}/>{state.housing === 'parinti' ? 'Locuiesc cu părinții' : 'Stau în chirie'}</span><span>Început pe {formatSimulatorDate(state.startedOn)}</span></div></section>
  <div className="sim-upcoming-area"><section className="sim-upcoming app-card"><div className="sim-upcoming-header"><h2>Ce urmează</h2><FinancialControls userId={userId} today={state.currentDay} balanceBani={state.balanceBani} disabled={busy || events?.caughtUp === false} refreshed={refreshed}/></div>{next && <div className="sim-next"><span>Următoarea mișcare</span><div><strong>{next.label}</strong><strong>{signedMoney(next.amountBani)}</strong></div><time dateTime={next.day}>{formatSimulatorDate(next.day)}</time></div>}<ol className="sim-upcoming-list">{state.upcomingFinancialMovements.slice(1).map((e, i) => <li key={i}><span><strong>{e.label}</strong><small>{formatSimulatorDate(e.day)}</small></span><strong>{signedMoney(e.amountBani)}</strong></li>)}</ol><div className="sim-fini"><FinlyMascot framing="head" mood="thinking"/><div><span className="card-kicker">FINI ZICE</span><p>{state.finiMessage}</p></div></div></section><CurrentState items={state.currentStates}/></div>
  <EventsToday area={events} busy={busy} profile={profile}/>
  <section className="sim-salary app-card"><div className="sim-section-top"><h2>{state.incomeLabel}</h2><ArrowDownLeft size={24}/></div><strong className="sim-salary-amount">{formatLei(state.monthlyIncomeBani)}<small> / lună</small></strong><p>{state.salaryReceivedToday ? 'Banii de azi au intrat.' : state.daysUntilPayday === 1 ? 'Următorii bani intră mâine.' : `Următorii bani intră în ${state.daysUntilPayday} zile.`}</p><div><span>Următoarea încasare</span><strong>{formatSimulatorDate(state.nextPayday)}</strong></div></section>
  <SavingsGoalCard key={userId} goal={state.goal} balanceBani={state.balanceBani} userId={userId} disabled={busy || events?.caughtUp === false} view={goalView} setView={view => { setGoalNotice(false); setGoalView(view); }} saved={goalSaved}/>
  <FinancialJournal journal={journal} busy={journalBusy} error={journalError} select={selectJournal} retry={retryJournal}/></div></>;
}
export default function SimulatorClient({ userId }: { userId: string }) {
  const [data, setData] = useState<SimulatorPageState | null>(null);
  const [busy, setBusy] = useState(false), [starting, setStarting] = useState(false), [error, setError] = useState(false);
  const [journal, setJournal] = useState<(Journal & { runId: string | null }) | null>(null), [journalBusy, setJournalBusy] = useState(false), [journalError, setJournalError] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [offline, setOffline] = useState(false);
  const sync = useRef(new SimulatorSync<SimulatorPageState>()), lastVisible = useRef(-Infinity), journalGeneration = useRef(0), journalController = useRef<AbortController | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const journalTarget = useRef<string | null>(null);
  const reviewAckInFlight = useRef(false);
  const request = useCallback(async (path: string, body?: object, signal?: AbortSignal) => {
    const response = await fetch(`/api/simulator/${path}`, { cache: 'no-store', signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(20000)]) : AbortSignal.timeout(20000), method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', 'X-Finly-Account': userId }, ...(body ? { body: JSON.stringify(body) } : {}) });
    if (!response.ok) throw new Error('Simulatorul nu a putut fi actualizat.');
    return response.json() as Promise<unknown>;
  }, [userId]);
  const refresh = useCallback((lifeProfile?: LifeProfile) => {
    if(reviewAckInFlight.current)return Promise.resolve();
    setBusy(true); setError(false);
    if (lifeProfile) setStarting(true);
    const began = performance.now();
    return sync.current.run(async () => {
      const value = simulatorPageSchema.parse(await request(lifeProfile ? 'start' : 'dashboard', lifeProfile ? { housing: lifeProfile.housingStatus, profile: lifeProfile.activityStatus, lifeProfile } : undefined));
      value.timing.refreshAfterMs = Math.max(1000, value.timing.refreshAfterMs - (performance.now() - began));
      return value;
    }, value => {
      setData(previous => {
        if (previous?.dashboard && value.dashboard?.runId === previous.dashboard.runId && value.dashboard.lastSettledOn < previous.dashboard.lastSettledOn) return previous;
        if (previous?.dashboard?.runId === value.dashboard?.runId && previous?.events && value.events && value.events.revision < previous.events.revision) return previous;
        return value;
      });
      if (lifeProfile) { setAnnouncement('Simularea a început. Soldul și jurnalul sunt pregătite.'); requestAnimationFrame(() => heading.current?.focus()); }
      refreshNotifications();
      setBusy(false); setStarting(false);
    }, () => { setError(true); setBusy(false); setStarting(false); });
  }, [request]);
  useEffect(() => {
    const initialTimer = setTimeout(() => void refresh(), 0);
    const visible = () => {
      if (document.visibilityState === 'visible' && performance.now() - lastVisible.current > 3000) { lastVisible.current = performance.now(); void refresh(); }
    };
    const online = () => { setOffline(false); visible(); };
    const disconnected = () => setOffline(true);
    setTimeout(() => setOffline(!navigator.onLine), 0);
    window.addEventListener('pageshow', visible);
    window.addEventListener('online', online);
    window.addEventListener('offline', disconnected);
    document.addEventListener('visibilitychange', visible);
    const currentSync = sync.current;
    const journalRequests = journalGeneration;
    const controller = journalController;
    return () => { clearTimeout(initialTimer); currentSync.invalidate(); journalRequests.current++; controller.current?.abort(); document.removeEventListener('visibilitychange', visible); window.removeEventListener('pageshow', visible); window.removeEventListener('online', online); window.removeEventListener('offline', disconnected); };
  }, [refresh]);
  useEffect(() => {
    if (!data) return;
    const timer = setTimeout(() => { void refresh(); }, data.timing.refreshAfterMs);
    return () => clearTimeout(timer);
  }, [data, refresh]);
  async function setProfile(profile: ScheduleProfile) {
    if (busy || offline) return;
    sync.current.invalidate();
    setBusy(true); setError(false);
    try { setData(simulatorPageSchema.parse(await request("profile", { profile }))); }
    catch { setError(true); } finally { setBusy(false); }
  }
  async function selectJournal(month: string) {
    const requestedRunId = data?.dashboard?.runId ?? null;
    journalTarget.current = month;
    const generation = ++journalGeneration.current;
    journalController.current?.abort();
    const controller = new AbortController(); journalController.current = controller;
    setJournalBusy(true); setJournalError(false);
    try { const next = journalSchema.parse(await request(`journal?month=${encodeURIComponent(month)}`, undefined, controller.signal)); if (generation === journalGeneration.current) setJournal({ ...next, runId: requestedRunId }); }
    catch { if (generation === journalGeneration.current && !controller.signal.aborted) setJournalError(true); }
    finally { if (generation === journalGeneration.current) setJournalBusy(false); }
  }
  const state = data?.dashboard;
  async function acknowledgeReview(input:{reviewId:string;operationId:string}) {
    if (offline) throw new Error('Ai nevoie de conexiune pentru a continua.');
    reviewAckInFlight.current=true;
    sync.current.invalidate();
    try {
      const value=simulatorPageSchema.parse(await request('monthly-review',input));
      sync.current.invalidate(); setData(value); setBusy(false); refreshNotifications();
    } finally {reviewAckInFlight.current=false;}
  }
  const selectedJournal = state && (!journal || journal.runId !== state.runId || journal.month === state.monthlyJournal.month ? state.monthlyJournal : journal);
  return <Shell userId={userId}>{data?.pendingMonthlyReview && <MonthlyReviewPanel key={data.pendingMonthlyReview.id} review={data.pendingMonthlyReview} count={data.pendingMonthlyReviewCount} acknowledge={acknowledgeReview}/>}<div className="sr-only" role="status" aria-live="polite">{announcement}</div>{error && <div className="sim-error app-card" role="alert"><p>{data ? 'Nu am putut actualiza simulatorul. Datele afișate pot fi neactualizate.' : 'Nu am putut încărca simulatorul.'}</p><button className="app-button secondary" disabled={busy} onClick={() => void refresh()}><RefreshCw size={16}/>Încearcă din nou</button></div>}{!data ? error ? null : <Skeleton/> : <><div className="sim-sync-status" role="status">{offline ? 'Ești offline. Ai nevoie de conexiune pentru a salva decizii.' : busy && !starting ? 'Se actualizează…' : ''}</div>{state && selectedJournal ? <Dashboard state={state} journal={selectedJournal} journalBusy={journalBusy} journalError={journalError} selectJournal={month => void selectJournal(month)} retryJournal={() => journalTarget.current && void selectJournal(journalTarget.current)} heading={heading} events={data.events} busy={busy || offline} profile={value => void setProfile(value)} userId={userId} refreshed={() => refresh()} goalSaved={value => { sync.current.invalidate(); setData(value); setJournal(null); }}/> : <LifeSetup busy={busy || offline} start={value => void refresh(value)}/>}</>}</Shell>;
}
