
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { ArrowRight, BookOpen, Check, ChevronRight, Clock3, Flame, Gamepad2, Home, PiggyBank, RotateCcw, Sparkles, Trophy, UserRound, Zap } from "lucide-react";
import { FinlyMascot } from "./components/finly-brand";
import { getCategory } from "@/src/content/categories";
import { getNextLesson, getReadyLessons, isLessonUnlocked, legacyQuickLessons } from "@/src/content/lessons";
import { useLearningProgress } from "@/src/lib/use-learning-progress";
import { categoryProgress, progressFor } from "@/src/lib/learning-progress";
import { CategoriesView, CategoryView, categoryIcons, difficultyLabels } from "./components/learning-ui";
import { initialSimulation, getCurrentLevel, getLevelProgress, calculateStreak, useSavedProgress, updateSimulation } from "./lib/progress";
import { getTodayGoal, SIMULATOR_COMPLETION_XP } from "@/src/lib/progress";
import { DailyChallengeCard as DailyChallenge, LevelProgress, FreezeIndicator, AchievementsList } from "./components/gamification-ui";

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
  const progress = category ? categoryProgress(category.id, p.completedLessonIds).percentage : progressFor(getReadyLessons(), p.completedLessonIds).percentage;
  return <article className={`continue-card ${compact ? "compact" : ""}`}>
    <div className="continue-copy"><div className="card-kicker"><Icon size={14}/> {category?.title.toLocaleUpperCase("ro-RO") ?? "PAS CU PAS"} {category && <span className="tiny-tag">{difficultyLabels[category.difficulty]}</span>}</div><h2>{lesson?.title ?? "Ai terminat toate lecțiile disponibile."}</h2><p>{lesson?.description ?? "Mai multe vin în curând."}</p>{lesson && <div className="lesson-meta"><span><Clock3 size={14}/> {lesson.minutes} min</span><span><Zap size={14}/> +{lesson.xp} XP</span></div>}</div>
    <FinlyMascot className="continue-fini" framing="bust" mood={lesson ? "normal" : "excited"} priority/>
    <div className="continue-bottom"><div className="continue-progress"><div><span>{lesson ? "Progresul categoriei" : "Gata. Ai prins ideea."}</span><strong>{progress}%</strong></div><ProgressBar value={progress} label={`Progres ${category?.title ?? "lecții disponibile"}`}/></div><Link className="app-button" href={lesson ? `/lectie/${lesson.slug}` : "/lectii"}>{lesson ? lesson.id === p.lastLessonId ? "Continuă" : "Hai să începem" : "Vezi lecțiile"}<ArrowRight size={18}/></Link></div>
  </article>;
}

function QuickLessons() {
  const p = useLearningProgress();
  return <div className="quick-list">{[...getReadyLessons().filter(l => l.id !== "salariu-brut-vs-net" && (p.completedLessonIds.includes(l.id) || isLessonUnlocked(l, p.completedLessonIds))), ...legacyQuickLessons].map(lesson => {
    const category = getCategory(lesson.categoryId)!;
    const Icon = categoryIcons[category.icon];
    return <Link className="quick-row" href={legacyQuickLessons.some(l => l.id === lesson.id) ? `/rapid?lesson=${lesson.id === "primul-buget" ? "buget" : "carduri"}` : `/lectie/${lesson.slug}`} key={lesson.id}><span className="icon-tile"><Icon size={21}/></span><div><strong>{lesson.title}</strong><span>{lesson.minutes} min <i/> {difficultyLabels[category.difficulty]}</span></div>{p.completedLessonIds.includes(lesson.id) ? <Check className="completed-icon" size={19}/> : <ChevronRight size={18}/>}</Link>;
  })}</div>;
}

function HomeScreen({ explore }: { explore: (id: string) => void }) {
  const p = useSavedProgress();
  if (!p.hydrated || !p.todayKey) return <div className="app-loading" aria-busy="true">Progresul tău se pregătește…</div>;
  const level = getCurrentLevel(p.totalXp), streak = calculateStreak(p, p.todayKey), goal = getTodayGoal(p, p.todayKey);
  return <><header className="app-greeting"><div><p>Bună, Andrei <span className="greeting-dot"/></p><h1>Ce învățăm azi?</h1></div><Link className="profile-avatar" href="/?tab=profile" aria-label="Deschide profilul"><FinlyMascot framing="head"/><span>{level.level}</span></Link></header>
    <div className="status-row"><span><Flame size={16}/> {streak.current} zile</span><span><Zap size={16}/> {p.totalXp} XP</span><span><Sparkles size={15}/> Nivel {level.level}</span><span><Check size={15}/> {goal.current ? "1 activitate azi ✓" : "0/1 activitate azi"}</span></div><LevelProgress totalXp={p.totalXp}/><FreezeIndicator progress={p} today={p.todayKey}/>
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
  const [simReward, setSimReward] = useState<number | null>(null);
  const choosing = useRef(false);
  const finish = sim.step >= events.length;
  const event = events[Math.min(sim.step, events.length - 1)];
  const feedbackRef = useRef<HTMLDivElement>(null);
  async function choose(option: typeof event.options[number]) {
    if (feedback || choosing.current || option.cost > sim.balance) return;
    choosing.current = true;
    try {
      const result = await updateSimulation({ step: sim.step + 1, balance: sim.balance - option.cost, savings: sim.savings + option.save, history: [...sim.history, option.title] });
      setSimReward(result.xpGained);
      setFeedback(option.feedback);
      requestAnimationFrame(() => feedbackRef.current?.focus());
    } finally { choosing.current = false; }
  }
  if (!p.hydrated) return <div className="app-loading" aria-busy="true">Pregătim simulatorul…</div>;
  return <><header className="screen-heading"><p>Un mic antrenament pentru viața reală.</p><h1>Luna ta.<br/>Alegerile tale.</h1><p>Ai primul salariu. Vezi unde ajungi până la finalul lunii.</p></header><div className="sim-status app-card"><div><span>Sold disponibil</span><strong>{sim.balance.toLocaleString("ro-RO")} <small>lei</small></strong></div><div><span>Ziua</span><strong>{finish ? 30 : event.day}<small> / 30</small></strong></div></div><div className="sim-goal"><div><span><PiggyBank size={18}/> Economisește 500 lei</span><strong>{sim.savings} / 500 lei</strong></div><ProgressBar value={sim.savings / 500 * 100} label="Obiectiv economii"/></div>
    {feedback ? <div className="sim-feedback app-card" ref={feedbackRef} tabIndex={-1}><FinlyMascot framing="bust" mood="thinking"/><span className="block-kicker">FINI EXPLICĂ</span><h2>O alegere. O consecință.</h2><p>{feedback}</p><button className="app-button" onClick={() => setFeedback(null)}>{finish ? "Vezi cum a fost luna" : "Hai mai departe"}<ArrowRight size={17}/></button></div> : finish ? <section className="sim-finish app-card"><FinlyMascot framing="bust" mood={sim.savings >= 500 ? "excited" : "normal"}/><span className="reward-chip"><Zap size={14}/> {simReward ? `+${simReward} XP` : simReward === 0 || p.simulatorCompletions.includes("simulator") ? "Practică · XP deja primit" : `Reward unic · ${SIMULATOR_COMPLETION_XP} XP`}</span><h2>{sim.savings >= 500 ? "Ai ținut de plan." : "O lună. Mai multe idei."}</h2><p>Ai încheiat cu {sim.balance.toLocaleString("ro-RO")} lei disponibili și {sim.savings} lei economisiți.</p><div className="sim-history">{sim.history.map((choice, i) => <div key={i}><Check size={15}/>{choice}</div>)}</div><button className="app-button secondary" onClick={() => { void updateSimulation(initialSimulation); setSimReward(null); }}><RotateCcw size={17}/> Încearcă alte alegeri</button></section> : <section className="sim-event app-card" key={sim.step}><span className="card-kicker">ZIUA {event.day} <span className="tiny-tag">{sim.step + 1} / 5</span></span><h2>{event.title}</h2><p>{event.text}</p><div className="sim-choices">{event.options.map(option => <button key={option.title} disabled={option.cost > sim.balance} onClick={() => { void choose(option); }}><div><strong>{option.title}</strong><span>{option.cost > sim.balance ? "Sold insuficient pentru această alegere" : option.detail}</span></div><ArrowRight size={18}/></button>)}</div></section>}
    <p className="screen-note">Un scenariu simplificat: exemple de alegeri, fără toate costurile unei luni reale.</p></>;
}

function ProfileScreen() {
  const p = useSavedProgress();
  if (!p.hydrated || !p.todayKey) return <div className="app-loading" aria-busy="true">Pregătim progresul tău…</div>;
  const level = getLevelProgress(p.totalXp), streak = calculateStreak(p, p.todayKey);
  return <><header className="screen-heading"><p>Fiecare pas se adună.</p><h1>Progresul tău.</h1></header><section className="profile-card app-card"><div className="profile-badge"><FinlyMascot framing="head" mood="normal"/><span><Sparkles size={14}/> Nivel {level.current.level}</span></div><h2>Andrei</h2><p>{level.current.title}</p><div className="profile-level"><span>{level.isMax ? "Nivel maxim" : `Nivel ${level.current.level}`}</span><span>{level.isMax ? "Money Master" : `${level.remainingXp} XP până la nivelul ${level.next!.level}`}</span></div><ProgressBar value={level.percent} label="Progres către nivelul următor"/></section><div className="profile-stats">{[{ icon: Zap, value: p.totalXp, label: "XP total" }, { icon: Flame, value: streak.current, label: "zile streak" }, { icon: BookOpen, value: p.completedLessonIds.length, label: "lecții terminate" }, { icon: Trophy, value: streak.longest, label: "zile record" }].map(({ icon: Icon, value, label }) => <div key={label}><Icon size={19}/><strong>{value}</strong><span>{label}</span></div>)}</div><FreezeIndicator progress={p} today={p.todayKey}/><AchievementsList progress={p}/><p className="screen-note">Progresul se salvează pe acest dispozitiv.</p><Link className="about-link" href="/despre">Despre Finly <ArrowRight size={14}/></Link></>;
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
