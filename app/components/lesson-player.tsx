"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, RotateCcw, X, Zap } from "lucide-react";
import { FinlyMascot } from "./finly-brand";
import { getCategory } from "@/src/content/categories";
import { getLessonById, getLessonBySlug, getLegacyQuickLesson, getNextLesson, isLessonUnlocked } from "@/src/content/lessons";
import { saveLastLesson, useLearningProgress } from "@/src/lib/use-learning-progress";
import { isValidScreen } from "@/src/lib/learning-validation";
import { categoryProgress } from "@/src/lib/learning-progress";
import { finishLessonSession } from "@/src/lib/use-progress";
import { getCorrectAnswerId, isAnswerScreen } from "@/src/lib/progress";
import { getDisplayOptions } from "@/src/lib/lesson-options";
import type { DomainResult } from "@/src/types/progress";
import type { FiniMessage, FiniMood, ReadyLesson } from "@/src/types/learning";

import { ReadingGuide, ExplanationReading, CaseReading, CaseReader, RememberReading } from "./lesson-reading";

const moods = { neutral: "normal", happy: "correct", thinking: "thinking", encouraging: "wrong", surprised: "excited", serious: "serious" } as const satisfies Record<FiniMood, string>;
function FiniNote({ note }: { note: FiniMessage }) { return <div className="learning-fini-note"><FinlyMascot framing="head" mood={moods[note.mood]}/><p>{note.message}</p></div>; }
function LessonNotice({ title, href = "/lectii", label = "Înapoi la lecții" }: { title: string; href?: string; label?: string }) {
  return <main className="salary-lesson"><section className="lesson-finish"><FinlyMascot className="lesson-finish-mascot" framing="bust" mood="thinking"/><h1>{title}</h1><Link className="app-button" href={href}>{label}<ArrowRight size={18}/></Link></section></main>;
}
export function LessonPlayer({ id, legacyQuick = false }: { id: string; legacyQuick?: boolean }) {
  const lesson = (legacyQuick ? getLegacyQuickLesson(id) : undefined) ?? getLessonById(id) ?? getLessonBySlug(id);
  const progress = useLearningProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const frame = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(frame); }, []);
  if (!lesson) return <LessonNotice title="Lecția nu există."/>;
  const category = getCategory(lesson.categoryId);
  const href = `/lectii/${category?.slug ?? lesson.categoryId}`;
  if (lesson.status === "coming-soon") return <LessonNotice title="Lecția asta vine în curând." href={href} label="Înapoi la categorie"/>;
  if (!mounted || !progress.hydrated) return <main className="salary-lesson"><p className="lesson-hint">Pregătim lecția…</p></main>;
  if (!legacyQuick && !progress.completedLessonIds.includes(lesson.id) && !isLessonUnlocked(lesson, progress.completedLessonIds)) return <LessonNotice title="Mai întâi, lecția anterioară." href={href} label="Înapoi la categorie"/>;
  return <ReadyLessonPlayer key={`${lesson.id}:${lesson.contentVersion ?? 1}`} lesson={lesson} legacyQuick={legacyQuick}/>;
}
function ReadyLessonPlayer({ lesson, legacyQuick }: { lesson: ReadyLesson; legacyQuick: boolean }) {
  const progress = useLearningProgress();
  const [index, setIndex] = useState(0);
  // ReadyLessonPlayer mounts only after the parent's client hydration gate.
  // Keep this seed in session memory; a replay starts a fresh display order.
  const [shuffleSeed, setShuffleSeed] = useState(() => crypto.randomUUID());
  const [answer, setAnswer] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [completion, setCompletion] = useState<DomainResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [completionError, setCompletionError] = useState<string | null>(null);
  const finishing = useRef(false);
  const sessionId = useRef<string | null>(null);
  const firstAnswers = useRef(new Map<string, string>());
  const feedback = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const continueButton = useRef<HTMLButtonElement>(null);
  const category = getCategory(lesson.categoryId);
  const categoryHref = `/lectii/${category?.slug ?? lesson.categoryId}`;
  const screen = lesson.screens[index];
  const valid = isValidScreen(screen);
  const options = useMemo(() => valid ? getDisplayOptions(screen, lesson.id, shuffleSeed) : [], [screen, valid, lesson.id, shuffleSeed]);
  const correct = valid ? getCorrectAnswerId(screen) : null;
  const answeredCorrectly = answer === correct;
  const isProse = valid && (screen.type === "situatie" || screen.type === "explicatie" || screen.type === "caz_real");
  const isRecap = valid && (screen.type === "recap" || screen.type === "tine_minte");
  const isQuestion = valid && isAnswerScreen(screen);
  const questionTotal = lesson.screens.filter(isAnswerScreen).length;
  const questionNumber = lesson.screens.slice(0, index + 1).filter(isAnswerScreen).length;
  const caseScreen = "caseId" in screen && screen.type !== "caz_real" ? lesson.screens.find(s => s.type === "caz_real" && s.caseId === screen.caseId) : undefined;
  const canContinue = valid && (isProse || isRecap || answer !== null);
  const chooseAnswer = useCallback((optionId: string) => {
    if (firstAnswers.current.has(screen.id)) return;
    firstAnswers.current.set(screen.id, optionId);
    setAnswer(optionId);
  }, [screen.id]);
  useEffect(() => { void saveLastLesson(lesson.id); }, [lesson.id]);
  useEffect(() => { if (index > 0 || done) { heading.current?.focus(); window.scrollTo({ top: 0, behavior: "instant" }); } }, [index, done]);
  useEffect(() => { if (answer !== null) feedback.current?.focus(); }, [answer]);
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (document.querySelector("dialog[open]") || done || !valid || event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.matches("input, textarea, select") || target.isContentEditable)) return;
      const optionIndex = Number(event.key) - 1;
      if (/^[1-4]$/.test(event.key) && answer === null && options[optionIndex]) { event.preventDefault(); chooseAnswer(options[optionIndex].id); }
      if (event.key === "Enter" && canContinue && !(target instanceof HTMLElement && target.closest("a, button"))) { event.preventDefault(); continueButton.current?.click(); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [answer, canContinue, done, options, valid, chooseAnswer]);
  async function next() {
    if (!canContinue || done || finishing.current) return;
    if (lesson.screens[index + 1]?.type === "final") {
      if (finishing.current) return;
      finishing.current = true;
      setSaving(true);
      setCompletionError(null);
      sessionId.current ??= crypto.randomUUID();
      try {
        const result = await finishLessonSession({ lessonId: lesson.id, sessionId: sessionId.current, answers: [...firstAnswers.current].map(([screenId, selectedOptionId]) => ({ screenId, selectedOptionId })) });
        setCompletion(result);
        setIndex(i => i + 1);
        setDone(true);
      } catch {
        finishing.current = false;
        setCompletionError("Nu am putut încheia acest pas. Mai încearcă.");
      } finally { setSaving(false); }
    } else { setIndex(i => i + 1); setAnswer(null); }
  }
  const finalProgress = categoryProgress(lesson.categoryId, progress.completedLessonIds);
  const nextLesson = done ? getNextLesson(progress.completedLessonIds) : undefined;
  const percentage = done ? 100 : lesson.screens.length ? (index + 1) / lesson.screens.length * 100 : 0;
  return <main className="salary-lesson generic-lesson">{completionError && <p role="alert" className="lesson-hint">{completionError}</p>}<div className="lesson-top"><Link className="lesson-exit" href={`${categoryHref}#${lesson.chapterId}`} aria-label="Închide lecția"><X size={22}/></Link><div className="lesson-progress-wrap"><div className="lesson-progress" role="progressbar" aria-label="Progresul lecției" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(percentage)}><span style={{ width: `${percentage}%` }}/></div><span className="lesson-count">{done ? lesson.screens.length : index + 1} / {lesson.screens.length}</span></div><span className="lesson-xp"><Zap size={16}/> +{lesson.xp} XP</span></div>
    {done ? <section className="lesson-finish lesson-enter"><FinlyMascot className="lesson-finish-mascot" mood="excited" framing="bust"/><span className="lesson-label">Lecție terminată · {lesson.title}</span><h1 ref={heading} tabIndex={-1}>Lecție terminată.</h1><div className="lesson-reward"><Check size={22}/>{completion?.xpGained ? `+${completion.xpGained} XP` : "Ideile bune merită repetate."}</div>{completion && completion.rewards.length > 1 && <ul className="reward-breakdown">{completion.rewards.map(reward => <li key={reward.key}>+{reward.xp} XP · {({ lesson: "lecție", perfect: "quiz perfect", daily: "provocarea zilei", simulator: "simulator", streak: "7 zile active" })[reward.source]}</li>)}</ul>}{legacyQuick && !lesson.contentVersion ? <p>Ai terminat lecția rapidă. Curriculumul complet vine în curând.</p> : <div className="lesson-category-progress"><strong>{category?.title}</strong><p>{finalProgress.percentage}% completat · {finalProgress.completed} din {finalProgress.available} lecții disponibile</p><div className="app-progress" role="progressbar" aria-label="Progresul categoriei" aria-valuemin={0} aria-valuemax={100} aria-valuenow={finalProgress.percentage}><span style={{ width: `${finalProgress.percentage}%` }}/></div></div>}{nextLesson ? <Link className="app-button" href={`/lectie/${nextLesson.slug}`}>Următoarea lecție<ArrowRight size={18}/></Link> : <><p>Ai terminat lecțiile disponibile. Mai multe vin în curând.</p><Link className="app-button" href="/lectii">Vezi lecțiile<ArrowRight size={18}/></Link></>}<Link className="lesson-restart" href={`${categoryHref}#${lesson.chapterId}`}>Înapoi la {category?.title ?? "categorie"}</Link><button className="lesson-restart" onClick={() => { setShuffleSeed(crypto.randomUUID()); setIndex(0); setAnswer(null); setDone(false); setCompletion(null); finishing.current = false; firstAnswers.current.clear(); sessionId.current = null; void saveLastLesson(lesson.id); }}><RotateCcw size={16}/> Refă lecția</button></section> : !valid ? <section className="lesson-finish"><h1>Nu am putut încărca această parte a lecției.</h1><Link className="app-button" href={categoryHref}>Înapoi la categorie</Link></section> : <>
      <section className="lesson-question lesson-enter" key={screen.id}><span className="lesson-label">{category?.title} · {lesson.minutes} min</span>{isQuestion && <span className="lesson-question-count">Întrebarea {questionNumber} din {questionTotal}</span>}{screen.type === "explicatie" && screen.paragraphs && <ReadingGuide mood={screen.finiMood} label={screen.eyebrow ?? "CONCEPT"}/>}<h1 ref={heading} tabIndex={-1}>{screen.title}</h1>{screen.type === "situatie" ? <><p className="lesson-prompt">{screen.body}</p>{screen.highlight && <div className="lesson-highlight">{screen.highlight}</div>}</> : screen.type === "explicatie" ? <ExplanationReading screen={screen}/> : screen.type === "caz_real" ? <><ReadingGuide mood={screen.finiMood} label="CAZ REAL"/><CaseReading screen={screen}/></> : screen.type === "tine_minte" ? <><ReadingGuide mood={screen.finiMood} label="ȚINE MINTE"/><RememberReading screen={screen}/></> : screen.type === "recap" ? <ul className="lesson-recap learning-recap">{screen.points.map(point => <li key={point}><Check size={17}/><span>{point}</span></li>)}</ul> : screen.type === "final" ? null : <>{caseScreen?.type === "caz_real" && <CaseReader key={screen.id} screen={caseScreen}/>} {(screen.type === "scenariu" || screen.type === "calcul") && <div className="learning-context">{screen.context}{screen.type === "scenariu" && screen.cards?.map(card => <div key={card.title}><strong>{card.title}</strong><p>{card.body}</p></div>)}</div>}<p className="lesson-prompt">{screen.question}</p><div className="lesson-answers">{options.map((option, i) => <button key={option.id} data-option-id={option.id} className={`lesson-answer ${answer !== null && option.id === correct ? "correct" : answer === option.id ? "wrong" : ""}`} disabled={answer !== null} aria-pressed={answer === option.id} onClick={() => chooseAnswer(option.id)}><span className="lesson-option-letter">{String.fromCharCode(65 + i)}</span><span>{option.label}</span>{answer !== null && option.id === correct ? <Check size={19} aria-label="Răspuns corect"/> : answer === option.id ? <X size={19} aria-label="Răspuns ales, incorect"/> : null}</button>)}</div></>}{screen.fini && <FiniNote note={screen.fini}/>}</section>
      {isQuestion && "explanation" in screen && answer !== null ? <div className={`lesson-feedback ${answeredCorrectly ? "positive" : "supportive"}`} ref={feedback} tabIndex={-1} role="status"><div className="lesson-feedback-title">{answeredCorrectly ? <Check size={22}/> : <X size={22}/>}<strong>{answeredCorrectly ? "Corect." : "Nu chiar."}</strong></div><p>{(answeredCorrectly ? screen.correctFeedback : screen.incorrectFeedback) ?? screen.explanation}</p>{screen.feedbackFini && <FiniNote note={screen.feedbackFini}/>}<button className="app-button lesson-continue" ref={continueButton} disabled={saving} onClick={() => { void next(); }}>Continuă<ArrowRight size={18}/></button></div> : (isProse || isRecap) ? <button className="app-button lesson-continue learning-text-continue" ref={continueButton} onClick={next}>{screen.type === "caz_real" ? "Am citit, hai la întrebări" : "continueLabel" in screen ? screen.continueLabel ?? "Continuă" : "Continuă"}<ArrowRight size={18}/></button> : <p className="lesson-hint">Alege ce crezi. Descoperim împreună de ce.</p>}
    </>}
  </main>;
}
