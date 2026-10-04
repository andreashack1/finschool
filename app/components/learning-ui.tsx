"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen, BriefcaseBusiness, ChartNoAxesCombined, Check, ChevronRight, Clock3, CreditCard, Gamepad2, Home, LockKeyhole, PiggyBank, ShieldCheck, UserRound, WalletCards, Coins, House, Brain, Landmark, Store, TrendingUp } from "lucide-react";
import { categories, getCategory } from "@/src/content/categories";
import { getLessonsByChapter } from "@/src/content/lessons";
import { categoryProgress, chapterProgress, lessonState } from "@/src/lib/learning-progress";
import { useLearningProgress } from "@/src/lib/use-learning-progress";
import type { Category, CategoryIcon, Difficulty } from "@/src/types/learning";
import type { LucideIcon } from "lucide-react";

export const categoryIcons: Record<CategoryIcon, LucideIcon> = { BriefcaseBusiness, WalletCards, CreditCard, PiggyBank, ShieldCheck, ChartNoAxesCombined, Coins, House, Brain, Landmark, Store, TrendingUp };
export const difficultyLabels: Record<Difficulty, string> = { usor: "Ușor", mediu: "Mediu", greu: "Greu" };
const difficultyText: Record<Difficulty, string> = {
  usor: "Perfect de început. Nu ai nevoie de nicio cunoștință înainte.",
  mediu: "Ai nevoie de câteva noțiuni de bază. Merită să începi după categoriile ușoare.",
  greu: "Nivel avansat. Concepte mai complexe, merită parcurs după ce ai bazele.",
};
export function DifficultyBars({ difficulty }: { difficulty: Difficulty }) {
  const count = { usor: 1, mediu: 2, greu: 3 }[difficulty];
  return <span className="difficulty-bars" role="img" aria-label={`Dificultate ${count} din 3`}>{[1, 2, 3].map(n => <span key={n} className={n <= count ? "filled" : ""} aria-hidden="true"/>)}</span>;
}
function DifficultyBox({ category }: { category: Category }) {
  const investments = category.id === "investitii-de-la-zero";
  return <aside className="difficulty-box app-card"><div><strong>{investments ? "Greu · Nivel avansat" : difficultyLabels[category.difficulty]}</strong><DifficultyBars difficulty={category.difficulty}/></div><p>{investments ? "Aici învățăm cum funcționează investițiile și ce riscuri au. E educație, nu sfat financiar. Poți pierde bani când investești." : difficultyText[category.difficulty]}</p>{investments && <p>Înainte de asta, merită să termini <Link href={`/lectii/${getCategory("economii")!.slug}`}>Buget și economii</Link>.</p>}</aside>;
}
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
    return <Link className="course-card app-card" href={`/lectii/${category.slug}`} key={category.id}><div className="learning-card-top"><span className="icon-tile" style={{ background: category.softColor }}><Icon size={23}/></span><span className="difficulty-badge">{difficultyLabels[category.difficulty]}<DifficultyBars difficulty={category.difficulty}/></span></div><h3>{category.title}</h3><p>{category.subtitle}</p><div className="learning-card-count">{category.chapters.length} capitole · {progress.total} lecții</div>{progress.available ? <><div className="learning-card-progress"><span>{progress.completed} din {progress.available} lecții disponibile</span><strong>{progress.percentage}%</strong></div><LearningProgressBar value={progress.percentage} label={`Progres ${category.title}`}/></> : <div className="learning-card-progress"><span><Clock3 size={13}/> În curând</span><ChevronRight size={16}/></div>}</Link>;
  })}</div></>;
}
export function CategoryView({ slug }: { slug: string }) {
  const p = useLearningProgress();
  const category = getCategory(slug);
  if (!category) return <><h1>Categoria nu există.</h1><Link className="app-button" href="/lectii">Înapoi la lecții</Link></>;
  const Icon = categoryIcons[category.icon];
  const progress = categoryProgress(category.id, p.completedLessonIds);
  return <><Link className="back-button" href="/lectii"><ArrowLeft size={18}/> Toate categoriile</Link><header className="screen-heading"><span className="icon-tile" style={{ background: category.softColor }}><Icon size={27}/></span><h1>{category.title}</h1><p>{category.subtitle}</p></header><div className="learning-summary app-card"><div className="course-summary"><span>{progress.available ? `${progress.completed} din ${progress.available} lecții disponibile` : "În curând"}</span>{progress.available > 0 && <strong>{progress.percentage}%</strong>}</div>{progress.available > 0 && <LearningProgressBar value={progress.percentage} label={`Progres ${category.title}`}/>}</div><DifficultyBox category={category}/>{category.chapters.map((chapter, i) => {
    const cp = chapterProgress(chapter.id, p.completedLessonIds, category.id);
    return <section className="learning-chapter" key={chapter.id} id={chapter.id}><span className="block-kicker">CAPITOLUL {i + 1}</span><h2>{chapter.title}</h2><p>{cp.available ? `${cp.completed} din ${cp.available} terminate` : "În curând"}</p>{cp.available > 0 && <LearningProgressBar value={cp.percentage} label={`Progres ${chapter.title}`}/>}<div className="course-path">{getLessonsByChapter(chapter.id, category.id).map(lesson => {
      const state = lessonState(lesson, p.completedLessonIds);
      const interactive = state === "completed" || state === "current";
      const body = <><span className="path-number">{state === "completed" ? <Check size={19}/> : state === "current" ? <BookOpen size={18}/> : state === "locked" ? <LockKeyhole size={16}/> : <Clock3 size={16}/>}</span><div><strong>{lesson.title}</strong><span>{state === "completed" ? "Terminată · Reia" : state === "current" ? lesson.id === p.lastLessonId ? "Gata · Continuă" : "Gata · Începe" : state === "locked" ? "Termină lecția anterioară" : "În curând"} · {lesson.minutes} min · +{lesson.xp} XP</span></div>{interactive && <ChevronRight size={19}/>}</>;
      return interactive ? <Link className={`path-row ${state}`} href={`/lectie/${lesson.slug}`} key={lesson.id} data-state={state}>{body}</Link> : <div className={`path-row locked ${state}`} key={lesson.id} data-state={state}>{body}</div>;
    })}</div></section>;
  })}</>;
}
