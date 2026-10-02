"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, RotateCcw, X, Zap } from "lucide-react";
import { FinlyMascot } from "./finly-brand";
import { getCategory } from "@/src/content/categories";
import { getLessonById, getLessonBySlug, getNextLesson, isLessonUnlocked } from "@/src/content/lessons";
import { saveCompletedLesson, saveLastLesson, useLearningProgress } from "@/src/lib/use-learning-progress";
import { isValidScreen } from "@/src/lib/learning-validation";
import { legacyLessonIds } from "@/src/lib/learning-storage";
import { useProgress, useSavedProgress } from "../lib/progress";
import type { FiniMessage, FiniMood, LessonScreen, ReadyLesson } from "@/src/types/learning";

const moods = { neutral: "normal", happy: "correct", thinking: "thinking", encouraging: "wrong", surprised: "excited", serious: "serious" } as const satisfies Record<FiniMood, string>;
function FiniNote({ note }: { note: FiniMessage }) { return <div className="learning-fini-note"><FinlyMascot framing="head" mood={moods[note.mood]}/><p>{note.message}</p></div>; }
function screenOptions(screen: LessonScreen) {
  switch (screen.type) {
    case "text": return [];
    case "true-false": return [{ id: "true", label: "Adevărat" }, { id: "false", label: "Fals" }];
    case "quick-calc": return screen.options.map(o => ({ id: o.id, label: `${o.value.toLocaleString("ro-RO")} ${screen.unit ?? ""}`.trim() }));
    case "multiple-choice": case "scenario": return screen.options;
  }
}
function correctId(screen: LessonScreen) {
  switch (screen.type) {
    case "text": return null;
    case "true-false": return String(screen.correctAnswer);
    case "quick-calc": return screen.options.find(o => o.value === screen.expectedAnswer)?.id ?? null;
    case "multiple-choice": case "scenario": return screen.correctOption;
  }
}
function LessonNotice({ title, href = "/lectii", label = "Înapoi la lecții" }: { title: string; href?: string; label?: string }) {
  return <main className="salary-lesson"><section className="lesson-finish"><FinlyMascot className="lesson-finish-mascot" framing="bust" mood="thinking"/><h1>{title}</h1><Link className="app-button" href={href}>{label}<ArrowRight size={18}/></Link></section></main>;
}
export function LessonPlayer({ id }: { id: string }) {
  const lesson = getLessonById(id) ?? getLessonBySlug(id);
  const progress = useLearningProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const frame = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(frame); }, []);
  if (!lesson) return <LessonNotice title="Lecția nu există."/>;
  const category = getCategory(lesson.categoryId);
  const href = `/lectii/${category?.slug ?? lesson.categoryId}`;
  if (lesson.status === "coming-soon") return <LessonNotice title="Lecția asta vine în curând." href={href} label="Înapoi la categorie"/>;
  if (!mounted) return <main className="salary-lesson"><p className="lesson-hint">Pregătim lecția…</p></main>;
  if (!progress.completedLessonIds.includes(lesson.id) && !isLessonUnlocked(lesson, progress.completedLessonIds)) return <LessonNotice title="Mai întâi, lecția anterioară." href={href} label="Înapoi la categorie"/>;
  return <ReadyLessonPlayer key={lesson.id} lesson={lesson}/>;
}
function ReadyLessonPlayer({ lesson }: { lesson: ReadyLesson }) {
  const progress = useLearningProgress();
  useSavedProgress();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [rewarded, setRewarded] = useState(false);
  const feedback = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const continueButton = useRef<HTMLButtonElement>(null);
  const category = getCategory(lesson.categoryId);
  const categoryHref = `/lectii/${category?.slug ?? lesson.categoryId}`;
  const screen = lesson.screens[index];
  const valid = isValidScreen(screen);
  const options = useMemo(() => valid ? screenOptions(screen) : [], [screen, valid]);
  const correct = valid ? correctId(screen) : null;
  const answeredCorrectly = answer === correct;
  const canContinue = valid && (screen.type === "text" || answer !== null);
  useEffect(() => { saveLastLesson(lesson.id); }, [lesson.id]);
  useEffect(() => { if (index > 0 || done) { heading.current?.focus(); window.scrollTo({ top: 0, behavior: "instant" }); } }, [index, done]);
  useEffect(() => { if (answer !== null) feedback.current?.focus(); }, [answer]);
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (done || !valid || event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.matches("input, textarea, select") || target.isContentEditable)) return;
      const optionIndex = Number(event.key) - 1;
      if (/^[1-4]$/.test(event.key) && answer === null && options[optionIndex]) { event.preventDefault(); setAnswer(options[optionIndex].id); }
      if (event.key === "Enter" && canContinue && !(target instanceof HTMLElement && target.closest("a, button"))) { event.preventDefault(); continueButton.current?.click(); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [answer, canContinue, done, options, valid]);
  function next() {
    if (!canContinue || done) return;
    if (index + 1 === lesson.screens.length) {
      const first = saveCompletedLesson(lesson.id);
      setRewarded(first);
      if (first) {
        const legacyId = Object.keys(legacyLessonIds).find(key => legacyLessonIds[key] === lesson.id);
        const xp = useProgress.getState();
        if (!legacyId || !xp.completed.includes(legacyId)) xp.award(lesson.id, lesson.xp);
      }
      setDone(true);
    } else { setIndex(i => i + 1); setAnswer(null); }
  }
  const nextLesson = done ? getNextLesson(progress.completedLessonIds) : undefined;
  const percentage = done ? 100 : lesson.screens.length ? index / lesson.screens.length * 100 : 0;
  return <main className="salary-lesson generic-lesson"><div className="lesson-top"><Link className="lesson-exit" href={`${categoryHref}#${lesson.chapterId}`} aria-label="Închide lecția"><X size={22}/></Link><div className="lesson-progress-wrap"><div className="lesson-progress" role="progressbar" aria-label="Progresul lecției" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(percentage)}><span style={{ width: `${percentage}%` }}/></div><span className="lesson-count">{done ? lesson.screens.length : index + 1} / {lesson.screens.length}</span></div><span className="lesson-xp"><Zap size={16}/> +{lesson.xp} XP</span></div>
    {done ? <section className="lesson-finish lesson-enter"><FinlyMascot className="lesson-finish-mascot" mood="excited" framing="bust"/><span className="lesson-label">Lecție terminată · {lesson.title}</span><h1 ref={heading} tabIndex={-1}>Gata. Ai prins ideea.</h1><div className="lesson-reward"><Check size={22}/>{rewarded ? `+${lesson.xp} XP` : "Ideile bune merită repetate."}</div><div className="lesson-recap">{lesson.recapPoints?.slice(0, 3).map(point => <div key={point}><Check size={17}/><span>{point}</span></div>)}</div>{nextLesson ? <Link className="app-button" href={`/lectie/${nextLesson.slug}`}>Următoarea lecție<ArrowRight size={18}/></Link> : <><p>Ai terminat lecțiile disponibile. Mai multe vin în curând.</p><Link className="app-button" href="/lectii">Vezi alte lecții<ArrowRight size={18}/></Link></>}<Link className="lesson-restart" href={`${categoryHref}#${lesson.chapterId}`}>Înapoi la {category?.title ?? "categorie"}</Link><button className="lesson-restart" onClick={() => { setIndex(0); setAnswer(null); setDone(false); saveLastLesson(lesson.id); }}><RotateCcw size={16}/> Refă lecția</button>{lesson.sourceUrls && <p className="lesson-source">Surse: {lesson.sourceUrls.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} </a>)}</p>}</section> : !valid ? <section className="lesson-finish"><h1>Nu am putut încărca această parte a lecției.</h1><Link className="app-button" href={categoryHref}>Înapoi la categorie</Link></section> : <>
      <section className="lesson-question lesson-enter" key={screen.id}><span className="lesson-label">{category?.title} · {lesson.minutes} min</span><h1 ref={heading} tabIndex={-1}>{screen.title}</h1>{screen.type === "text" ? <><p className="lesson-prompt">{screen.body}</p>{screen.highlight && <div className="lesson-highlight">{screen.highlight}</div>}</> : <>{(screen.type === "scenario" || screen.type === "quick-calc") && <div className="learning-context">{screen.context}{screen.type === "scenario" && screen.cards?.map(card => <div key={card.title}><strong>{card.title}</strong><p>{card.body}</p></div>)}</div>}<p className="lesson-prompt">{screen.question}</p><div className="lesson-answers">{options.map((option, i) => <button key={option.id} className={`lesson-answer ${answer !== null && option.id === correct ? "correct" : answer === option.id ? "wrong" : ""}`} disabled={answer !== null} aria-pressed={answer === option.id} onClick={() => { if (answer === null) setAnswer(option.id); }}><span className="lesson-option-letter">{String.fromCharCode(65 + i)}</span><span>{option.label}</span>{answer !== null && option.id === correct ? <Check size={19} aria-label="Răspuns corect"/> : answer === option.id ? <X size={19} aria-label="Răspuns ales, incorect"/> : null}</button>)}</div></>}{screen.fini && <FiniNote note={screen.fini}/>}</section>
      {screen.type !== "text" && answer !== null ? <div className={`lesson-feedback ${answeredCorrectly ? "positive" : "supportive"}`} ref={feedback} tabIndex={-1} role="status"><div className="lesson-feedback-title">{answeredCorrectly ? <Check size={22}/> : <X size={22}/>}<strong>{answeredCorrectly ? screen.correctFeedback ?? "Exact." : screen.incorrectFeedback ?? "Nu chiar."}</strong></div><p>{screen.explanation}</p>{screen.feedbackFini && <FiniNote note={screen.feedbackFini}/>}<button className="app-button lesson-continue" ref={continueButton} onClick={next}>Continuă<ArrowRight size={18}/></button></div> : screen.type === "text" ? <button className="app-button lesson-continue learning-text-continue" ref={continueButton} onClick={next}>{screen.continueLabel ?? "Continuă"}<ArrowRight size={18}/></button> : <p className="lesson-hint">Alege ce crezi. Descoperim împreună de ce.</p>}
    </>}
  </main>;
}
