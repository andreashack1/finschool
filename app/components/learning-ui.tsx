"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen, BriefcaseBusiness, ChartNoAxesCombined, Check, ChevronRight, Clock3, CreditCard, Gamepad2, Home, LockKeyhole, PiggyBank, ShieldCheck, UserRound, WalletCards } from "lucide-react";
import { categories, getCategory } from "@/src/content/categories";
import { getLessonsByChapter } from "@/src/content/lessons";
import { categoryProgress, chapterProgress, lessonState } from "@/src/lib/learning-progress";
import { useLearningProgress } from "@/src/lib/use-learning-progress";
import type { CategoryIcon } from "@/src/types/learning";
import type { LucideIcon } from "lucide-react";

export const categoryIcons: Record<CategoryIcon, LucideIcon> = { BriefcaseBusiness, WalletCards, CreditCard, PiggyBank, ShieldCheck, ChartNoAxesCombined };
export function LearningProgressBar({ value, label }: { value: number; label: string }) {
  const percentage = Number.isFinite(value) ? Math.round(Math.max(0, Math.min(value, 100))) : 0;
  return <div className="app-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><span style={{ width: `${percentage}%` }}/></div>;
}
export function LearningShell({ children }: { children: React.ReactNode }) {
  return <div className="finly-app tab-learn"><a className="skip-link" href="#app-content">Sari la conținut</a><div className="desktop-brand"><Link href="/" className="brand-word">finly<span>.</span></Link><span>Banii, pe înțelesul tău.</span></div><main className="app-content" id="app-content">{children}</main><nav className="bottom-nav" aria-label="Navigare principală">{[{ href: "/", label: "Acasă", icon: Home }, { href: "/lectii", label: "Lecții", icon: BookOpen }, { href: "/?tab=simulator", label: "Simulator", icon: Gamepad2 }, { href: "/?tab=profile", label: "Profil", icon: UserRound }].map(({ href, label, icon: Icon }) => <Link key={label} href={href} aria-current={label === "Lecții" ? "page" : undefined} className={label === "Lecții" ? "active" : ""}><span><Icon size={21} strokeWidth={label === "Lecții" ? 2.3 : 1.8}/></span><strong>{label}</strong></Link>)}</nav></div>;
}
export function CategoriesView() {
  const p = useLearningProgress();
  return <><header className="screen-heading"><h1>Lecții</h1><p>Alege ce vrei să înțelegi.</p></header><div className="course-grid learning-grid">{categories.map(category => {
    const Icon = categoryIcons[category.icon];
    const progress = categoryProgress(category.id, p.completedLessonIds);
    const soon = category.status === "coming-soon";
    const body = <><span className="icon-tile" style={{ background: category.softColor }}><Icon size={23}/></span>{soon && <span className="tiny-tag soon-tag"><Clock3 size={12}/> În curând</span>}<h3>{category.title}</h3><p>{category.description}</p><div className="learning-card-count">{progress.total} lecții{!soon && <span>{progress.available} {progress.available === 1 ? "disponibilă" : "disponibile"}</span>}</div>{!soon && <><LearningProgressBar value={progress.percentage} label={`Progres ${category.title}`}/><div className="learning-card-progress"><span>{progress.percentage}%</span><ChevronRight size={16}/></div></>}</>;
    return soon ? <article className="course-card app-card learning-soon" key={category.id}>{body}</article> : <Link className="course-card app-card" href={`/lectii/${category.slug}`} key={category.id}>{body}</Link>;
  })}</div></>;
}
export function CategoryView({ slug }: { slug: string }) {
  const p = useLearningProgress();
  const category = getCategory(slug);
  if (!category) return <><h1>Categoria nu există.</h1><Link className="app-button" href="/lectii">Înapoi la lecții</Link></>;
  const Icon = categoryIcons[category.icon];
  const progress = categoryProgress(category.id, p.completedLessonIds);
  const soon = category.status === "coming-soon";
  return <><Link className="back-button" href="/lectii"><ArrowLeft size={18}/> Toate categoriile</Link><header className="screen-heading"><span className="icon-tile" style={{ background: category.softColor }}><Icon size={27}/></span><h1>{category.title}</h1><p>{category.description}</p></header><div className="learning-summary app-card"><div className="course-summary"><span>{soon ? "În curând" : `${progress.completed} / ${progress.available} lecții terminate`}</span>{!soon && <strong>{progress.percentage}%</strong>}</div>{!soon && <LearningProgressBar value={progress.percentage} label={`Progres ${category.title}`}/>}</div>{category.chapters.map((chapter, i) => {
    const cp = chapterProgress(chapter.id, p.completedLessonIds);
    return <section className="learning-chapter" key={chapter.id} id={chapter.id}><span className="block-kicker">CAPITOLUL {i + 1}</span><h2>{chapter.title}</h2><p>{soon || !cp.available ? "Lecțiile vin în curând" : `${cp.completed} / ${cp.available} terminate`}</p>{!soon && cp.available > 0 && <LearningProgressBar value={cp.percentage} label={`Progres ${chapter.title}`}/>}<div className="course-path">{getLessonsByChapter(chapter.id).map(lesson => {
      const state = soon ? "coming-soon" : lessonState(lesson, p.completedLessonIds);
      const interactive = state === "completed" || state === "current";
      const body = <><span className="path-number">{state === "completed" ? <Check size={19}/> : state === "current" ? <BookOpen size={18}/> : state === "locked" ? <LockKeyhole size={16}/> : <Clock3 size={16}/>}</span><div><strong>{lesson.title}</strong><span>{state === "completed" ? "Completată" : state === "current" ? lesson.id === p.lastLessonId ? "Continuă" : "Începe" : state === "locked" ? "Termină lecția anterioară" : "În curând"}{interactive && ` · ${lesson.minutes} min · +${lesson.xp} XP`}</span></div>{interactive && <ChevronRight size={19}/>}</>;
      return interactive ? <Link className={`path-row ${state}`} href={`/lectie/${lesson.slug}`} key={lesson.id} data-state={state}>{body}</Link> : <div className={`path-row locked ${state}`} key={lesson.id} data-state={state}>{body}</div>;
    })}</div></section>;
  })}</>;
}
