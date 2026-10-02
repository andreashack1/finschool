
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { ArrowRight, BookOpen, BriefcaseBusiness, Check, ChevronRight, Clock3, Flame, Gamepad2, Home, LockKeyhole, PiggyBank, RotateCcw, Sparkles, Target, Trophy, UserRound, Zap } from "lucide-react";
import { FinlyMascot } from "./components/finly-brand";
import { getCategory } from "@/src/content/categories";
import { getNextLesson, getReadyLessons, getLessonById, isLessonUnlocked } from "@/src/content/lessons";
import { useLearningProgress } from "@/src/lib/use-learning-progress";
import { categoryProgress } from "@/src/lib/learning-progress";
import { CategoriesView, CategoryView, categoryIcons } from "./components/learning-ui";
import { initialSimulation, levelFor, today, useSavedProgress } from "./lib/progress";

const homeCategories = ["primul-job", "carduri-si-banca", "bani-de-zi-cu-zi", "siguranta-financiara", "economia-pe-scurt"].flatMap(id => { const category = getCategory(id); return category ? [category] : []; });
const tabs = [{ id: "home", title: "Acasă", icon: Home }, { id: "learn", title: "Lecții", icon: BookOpen }, { id: "simulator", title: "Simulator", icon: Gamepad2 }, { id: "profile", title: "Profil", icon: UserRound }];
export function ProgressBar({ value, label }: { value: number; label: string }) {
  const percentage = Math.round(Math.max(0, Math.min(value, 100)));
  return <div className="app-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><span style={{ width: `${percentage}%` }}/></div>;
}

function ContinueLesson({ compact = false }: { compact?: boolean }) {
  const p = useLearningProgress();
  const lesson = getNextLesson(p.completedLessonIds, p.lastLessonId);
  const category = lesson ? getCategory(lesson.categoryId) : undefined;
  const Icon = category ? categoryIcons[category.icon] : Check;
  const progress = category ? categoryProgress(category.id, p.completedLessonIds).percentage : 100;
  return <article className={`continue-card ${compact ? "compact" : ""}`}>
    <div className="continue-copy"><div className="card-kicker"><Icon size={14}/> {category?.title.toLocaleUpperCase("ro-RO") ?? "PAS CU PAS"} <span className="tiny-tag">Ușor</span></div><h2>{lesson?.title ?? "Ai terminat lecțiile disponibile."}</h2><p>{lesson?.description ?? "Mai multe idei bune vin în curând."}</p>{lesson && <div className="lesson-meta"><span><Clock3 size={14}/> {lesson.minutes} min</span><span><Zap size={14}/> +{lesson.xp} XP</span></div>}</div>
    <FinlyMascot className="continue-fini" framing="bust" mood={lesson ? "normal" : "excited"} priority/>
    <div className="continue-bottom"><div className="continue-progress"><div><span>{lesson ? "Progresul categoriei" : "Gata. Ai prins ideea."}</span><strong>{progress}%</strong></div><ProgressBar value={progress} label={`Progres ${category?.title ?? "lecții disponibile"}`}/></div><Link className="app-button" href={lesson ? `/lectie/${lesson.slug}` : "/lectii"}>{lesson ? lesson.id === p.lastLessonId ? "Continuă" : "Hai să începem" : "Vezi lecțiile"}<ArrowRight size={18}/></Link></div>
  </article>;
}

function DailyChallenge() {
  const p = useSavedProgress();
  const [answer, setAnswer] = useState<number | null>(null);
  const won = p.completed.includes(`challenge-${today()}`);
  function choose(value: number) { setAnswer(value); if (value === 15) p.award(`challenge-${today()}`, 15); }
  return <section className="daily-card app-card"><div className="section-top"><span className="card-kicker"><Target size={15}/> PROVOCAREA ZILEI</span><span className="reward-chip"><Zap size={13}/> +15 XP</span></div><h3>Un calcul mic.<br/>Un obicei bun.</h3><p>Ai 200 lei. Cheltui 160 + 25 pe transport. Cât îți rămâne?</p><div className="challenge-answers">{[15, 25, 35].map(value => <button key={value} disabled={won} className={`${won && value === 15 ? "answer-correct" : answer === value ? "answer-wrong" : ""}`} onClick={() => choose(value)}>{value} lei {won && value === 15 && <Check size={15}/>}</button>)}</div><div aria-live="polite">{won ? <p className="challenge-feedback success"><Check size={15}/> Ai prins ideea. +15 XP în buzunar!</p> : answer !== null ? <p className="challenge-feedback error">Nu chiar. Scade ambele cheltuieli și mai încearcă.</p> : <span className="challenge-note">O întrebare. Fără presiune.</span>}</div></section>;
}

function QuickLessons() {
  const p = useLearningProgress();
  return <div className="quick-list">{getReadyLessons().filter(l => l.id !== "salariu-brut-vs-net" && (p.completedLessonIds.includes(l.id) || isLessonUnlocked(l, p.completedLessonIds))).map(lesson => {
    const category = getCategory(lesson.categoryId)!;
    const Icon = categoryIcons[category.icon];
    return <Link className="quick-row" href={`/lectie/${lesson.slug}`} key={lesson.id}><span className="icon-tile"><Icon size={21}/></span><div><strong>{lesson.title}</strong><span>{lesson.minutes} min <i/> Ușor</span></div>{p.completedLessonIds.includes(lesson.id) ? <Check className="completed-icon" size={19}/> : <ChevronRight size={18}/>}</Link>;
  })}</div>;
}

function HomeScreen({ explore }: { explore: (id: string) => void }) {
  const p = useSavedProgress();
  return <><header className="app-greeting"><div><p>Bună, Andrei <span className="greeting-dot"/></p><h1>Ce învățăm azi?</h1></div><Link className="profile-avatar" href="/?tab=profile" aria-label="Deschide profilul"><FinlyMascot framing="head"/><span>{levelFor(p.xp)}</span></Link></header>
    <div className="status-row"><span><Flame size={16}/> {p.streak} zile</span><span><Zap size={16}/> {p.xp} XP</span><span><Sparkles size={15}/> Nivel {levelFor(p.xp)}</span></div>
    <div className="home-layout"><div className="home-primary"><div className="section-top section-label"><h2>Un pas mai departe</h2><span>ÎN RITMUL TĂU</span></div><ContinueLesson/>
      <section className="explore-section"><div className="section-top"><h2>Ce vrei să înțelegi?</h2><span className="swipe-hint">Explorează <ArrowRight size={13}/></span></div><div className="category-scroll">{homeCategories.map(({ id, title, icon }) => { const Icon = categoryIcons[icon]; return <button className={`category-tile cat-${id}`} key={id} onClick={() => explore(id)}><Icon size={24}/><span>{title === "Carduri & bancă" ? "Carduri" : title === "Siguranță financiară" ? "Siguranță" : title === "Bani de zi cu zi" ? "Banii tăi" : title}</span></button>; })}</div></section>
      <section className="quick-section"><div className="section-top"><h2>Învață în 5 minute</h2><span className="tiny-tag">Mic, dar util</span></div><QuickLessons/></section>
    </div><div className="home-secondary"><DailyChallenge/><section className="fini-tip"><FinlyMascot framing="head" mood="thinking"/><div><span className="card-kicker">FINI ZICE</span><p>Dacă un job spune doar „5.000 lei”, prima întrebare e simplă: <strong>brut sau net?</strong></p></div></section><Link className="simulator-teaser" href="/?tab=simulator"><span className="icon-tile"><Gamepad2 size={23}/></span><div><strong>Și în viața reală?</strong><span>Încearcă o lună pe banii tăi.</span></div><ArrowRight size={18}/></Link></div></div>
    <p className="home-footer">Puțin azi. Mai clar mâine.<span className="brand-word">finly<span>.</span></span></p></>;
}

function LearnScreen({ category }: { category: string | null }) {
  const aliases: Record<string, string> = { job: "primul-job", economy: "economia-pe-scurt", cards: "carduri-si-banca", money: "bani-de-zi-cu-zi", savings: "economii", safety: "siguranta-financiara" };
  return category ? <CategoryView slug={aliases[category] ?? category}/> : <CategoriesView/>;
}

const events = [
  { day: 1, title: "A intrat primul salariu.", text: "3.500 lei în cont. Înainte să înceapă luna, ce faci cu primii 500 lei?", options: [{ title: "Îi pun deoparte", detail: "500 lei pentru obiectivul meu", cost: 500, save: 500, feedback: "Ți-ai plătit mai întâi planul. Ai 500 lei economisiți, iar restul rămâne pentru lună." }, { title: "Îi las în cont", detail: "Decid mai târziu", cost: 0, save: 0, feedback: "Ai flexibilitate, dar economiile nu sunt încă separate. Poți reveni la obiectiv la final." }] },
  { day: 5, title: "Cum ajungi la job?", text: "Ai nevoie de transport pentru restul lunii. Alegi comoditatea sau varianta mai ieftină?", options: [{ title: "Abonament de transport", detail: "120 lei · toată luna", cost: 120, save: 0, feedback: "Un cost fix de 120 lei îți face bugetul mai previzibil. Îți rămân mai mulți bani pentru alte nevoi." }, { title: "Curse la comandă", detail: "600 lei · estimarea lunii", cost: 600, save: 0, feedback: "Ai ales comoditatea. Costă cu 480 lei mai mult decât abonamentul în acest scenariu." }] },
  { day: 12, title: "Un telefon nou te tentează.", text: "Telefonul tău încă funcționează. Cel din vitrină e 1.800 lei. Ce alegi?", options: [{ title: "Mai aștept", detail: "Telefonul actual își face treaba", cost: 0, save: 0, feedback: "Ai amânat o dorință, fără să renunți la ea. O poți transforma într-un obiectiv separat." }, { title: "Îl cumpăr acum", detail: "1.800 lei · plată integrală", cost: 1800, save: 0, feedback: "Telefonul vine cu un cost mare pentru luna aceasta. Verifică ce mai ai de plătit înainte de următoarea achiziție." }] },
  { day: 21, title: "Mâncarea pentru ultima săptămână.", text: "Ai două variante. Sumele sunt estimative pentru această simulare.", options: [{ title: "Gătesc acasă", detail: "250 lei · cumpărături planificate", cost: 250, save: 0, feedback: "Ai un plan pentru mâncare și un cost mai mic. Timpul pentru gătit face și el parte din alegere." }, { title: "Comand mai des", detail: "550 lei · livrări", cost: 550, save: 0, feedback: "Ai câștigat timp, dar ai cheltuit 300 lei în plus. O alegere ocazională e diferită de un obicei zilnic." }] },
  { day: 30, title: "Ultima alegere a lunii.", text: "Mai faci un pas pentru economii? Transferul mută banii din sold în economii.", options: [{ title: "Pun încă 500 lei deoparte", detail: "Un pas pentru mine", cost: 500, save: 500, feedback: "Ai mutat 500 lei în economii. Suma rămâne a ta, doar că are acum un scop clar." }, { title: "Păstrez soldul disponibil", detail: "Închei luna fără transfer", cost: 0, save: 0, feedback: "Ai încheiat luna cu banii rămași disponibili. Uită-te la alegeri și vezi ce ai schimba data viitoare." }] },
];

function SimulatorScreen() {
  const p = useSavedProgress();
  const sim = p.simulation;
  const [feedback, setFeedback] = useState<string | null>(null);
  const finish = sim.step >= events.length;
  const event = events[Math.min(sim.step, events.length - 1)];
  const feedbackRef = useRef<HTMLDivElement>(null);
  function choose(option: typeof event.options[number]) {
    if (feedback || option.cost > sim.balance) return;
    p.saveSimulation({ step: sim.step + 1, balance: sim.balance - option.cost, savings: sim.savings + option.save, history: [...sim.history, option.title] });
    setFeedback(option.feedback);
    if (sim.step === events.length - 1) p.award("simulator", 40);
    requestAnimationFrame(() => feedbackRef.current?.focus());
  }
  return <><header className="screen-heading"><p>Un mic antrenament pentru viața reală.</p><h1>Luna ta.<br/>Alegerile tale.</h1><p>Ai primul salariu. Vezi unde ajungi până la finalul lunii.</p></header><div className="sim-status app-card"><div><span>Sold disponibil</span><strong>{sim.balance.toLocaleString("ro-RO")} <small>lei</small></strong></div><div><span>Ziua</span><strong>{finish ? 30 : event.day}<small> / 30</small></strong></div></div><div className="sim-goal"><div><span><PiggyBank size={18}/> Economisește 500 lei</span><strong>{sim.savings} / 500 lei</strong></div><ProgressBar value={sim.savings / 500 * 100} label="Obiectiv economii"/></div>
    {feedback ? <div className="sim-feedback app-card" ref={feedbackRef} tabIndex={-1}><FinlyMascot framing="bust" mood="thinking"/><span className="block-kicker">FINI EXPLICĂ</span><h2>O alegere. O consecință.</h2><p>{feedback}</p><button className="app-button" onClick={() => setFeedback(null)}>{finish ? "Vezi cum a fost luna" : "Hai mai departe"}<ArrowRight size={17}/></button></div> : finish ? <section className="sim-finish app-card"><FinlyMascot framing="bust" mood={sim.savings >= 500 ? "excited" : "normal"}/><span className="reward-chip"><Zap size={14}/> +40 XP</span><h2>{sim.savings >= 500 ? "Ai ținut de plan." : "O lună. Mai multe idei."}</h2><p>Ai încheiat cu {sim.balance.toLocaleString("ro-RO")} lei disponibili și {sim.savings} lei economisiți.</p><div className="sim-history">{sim.history.map((choice, i) => <div key={i}><Check size={15}/>{choice}</div>)}</div><button className="app-button secondary" onClick={() => p.saveSimulation(initialSimulation)}><RotateCcw size={17}/> Încearcă alte alegeri</button></section> : <section className="sim-event app-card" key={sim.step}><span className="card-kicker">ZIUA {event.day} <span className="tiny-tag">{sim.step + 1} / 5</span></span><h2>{event.title}</h2><p>{event.text}</p><div className="sim-choices">{event.options.map(option => <button key={option.title} disabled={option.cost > sim.balance} onClick={() => choose(option)}><div><strong>{option.title}</strong><span>{option.cost > sim.balance ? "Sold insuficient pentru această alegere" : option.detail}</span></div><ArrowRight size={18}/></button>)}</div></section>}
    <p className="screen-note">Un scenariu simplificat: exemple de alegeri, fără toate costurile unei luni reale.</p></>;
}

function ProfileScreen() {
  const p = useSavedProgress();
  const learning = useLearningProgress();
  const level = levelFor(p.xp);
  const achievements = [{ icon: Sparkles, title: "Primul «aha»", description: "Termină o lecție rapidă.", unlocked: getReadyLessons().some(l => l.id !== "salariu-brut-vs-net" && learning.completedLessonIds.includes(l.id)) }, { icon: Flame, title: "Ții ritmul", description: "Învață 7 zile la rând.", unlocked: p.streak >= 7 }, { icon: BriefcaseBusiness, title: "Gata de primul job", description: "Înțelege salariul brut și net.", unlocked: learning.completedLessonIds.includes("salariu-brut-vs-net") }, { icon: PiggyBank, title: "Alegeri cu cap", description: "Încheie o lună în simulator.", unlocked: p.completed.includes("simulator") }, { icon: Trophy, title: "O mie de motive", description: "Strânge 1.000 XP.", unlocked: p.xp >= 1000 }];
  return <><header className="screen-heading"><p>Fiecare pas se adună.</p><h1>Progresul tău.</h1></header><section className="profile-card app-card"><div className="profile-badge"><FinlyMascot framing="head" mood="normal"/><span><Sparkles size={14}/> Nivel {level}</span></div><h2>Andrei</h2><p>Money Smart</p><div className="profile-level"><span>Nivel {level}</span><span>{200 - p.xp % 200} XP până la nivelul {level + 1}</span></div><ProgressBar value={p.xp % 200 / 2} label="Progres către nivelul următor"/></section><div className="profile-stats">{[{ icon: Zap, value: p.xp, label: "XP total" }, { icon: Flame, value: p.streak, label: "zile streak" }, { icon: BookOpen, value: 18 + learning.completedLessonIds.filter(id => getLessonById(id)?.status === "ready").length, label: "lecții învățate" }, { icon: Trophy, value: p.record, label: "zile record" }].map(({ icon: Icon, value, label }) => <div key={label}><Icon size={19}/><strong>{value}</strong><span>{label}</span></div>)}</div><section className="achievements"><div className="section-top"><h2>Micile tale victorii</h2><span>{achievements.filter(a => a.unlocked).length} / {achievements.length}</span></div><div className="app-card achievement-list">{achievements.map(({ icon: Icon, title, description, unlocked }) => <div className={`achievement ${unlocked ? "unlocked" : "locked"}`} key={title}><span className="icon-tile"><Icon size={22}/></span><div><strong>{title}</strong><p>{description}</p></div>{unlocked ? <Check size={17}/> : <LockKeyhole size={15}/>}</div>)}</div></section><p className="screen-note">Progresul se salvează pe acest dispozitiv. Profilul pornește cu date demonstrative.</p><Link className="about-link" href="/despre">Despre Finly <ArrowRight size={14}/></Link></>;
}

function FinlyApp() {
  const params = useSearchParams();
  const router = useRouter();
  const tab = tabs.some(t => t.id === params.get("tab")) ? params.get("tab")! : "home";
  const category = params.get("category");
  function selectCategory(id: string | null) { router.push(id ? `/lectii/${getCategory(id)?.slug ?? id}` : "/lectii"); }
  return <div className={`finly-app tab-${tab}`}><a className="skip-link" href="#app-content">Sari la conținut</a><div className="desktop-brand"><Link href="/" className="brand-word">finly<span>.</span></Link><span>Banii, pe înțelesul tău.</span></div><main className="app-content" id="app-content" key={`${tab}-${category}`}>
    {tab === "home" && <HomeScreen explore={selectCategory}/>} {tab === "learn" && <LearnScreen category={category}/>} {tab === "simulator" && <SimulatorScreen/>} {tab === "profile" && <ProfileScreen/>}
  </main><nav className="bottom-nav" aria-label="Navigare principală">{tabs.map(({ id, title, icon: Icon }) => <Link key={id} href={id === "home" ? "/" : id === "learn" ? "/lectii" : `/?tab=${id}`} aria-current={tab === id ? "page" : undefined} className={tab === id ? "active" : ""}><span><Icon size={21} strokeWidth={tab === id ? 2.3 : 1.8}/></span><strong>{title}</strong></Link>)}</nav></div>;
}
export default function Page() { return <Suspense fallback={<div className="app-loading">Finly se pregătește…</div>}><FinlyApp/></Suspense>; }
