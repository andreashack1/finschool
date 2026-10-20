import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, CircleCheck, Flame, Gamepad2, Home, Layers3, Target, UserRound, Wallet } from "lucide-react";
import { FinlyMascot } from "../components/finly-brand";
import { categories } from "@/src/content/categories";
import { getReadyLessons } from "@/src/content/lessons";
import "./about.css";

export const metadata: Metadata = { title: "Despre Finly", description: "Educație financiară pentru tineri, prin lecții, decizii și practică în SimLife." };
const steps = [
  { icon: BookOpen, title: "Înțelegi", text: "Explicații simple și exemple pe care le poți lega de viața reală." },
  { icon: CircleCheck, title: "Alegi", text: "Răspunzi la întrebări și iei decizii în scenarii practice." },
  { icon: Wallet, title: "Aplici", text: "În SimLife vezi cum alegerile de zi cu zi îți schimbă banii în timp." },
];
const principles = [
  { title: "Fără limbaj complicat", text: "Pornim de la zero, fără să presupunem că știi deja finanțe." },
  { title: "Situații familiare", text: "Exemplele pornesc de la lucruri pe care le întâlnești zi de zi." },
  { title: "Loc pentru încercări", text: "Poți testa alegeri în SimLife fără să riști bani reali." },
];
const navigation = [
  { href: "/", label: "Acasă", icon: Home }, { href: "/lectii", label: "Lecții", icon: BookOpen },
  { href: "/simulator", label: "SimLife", icon: Gamepad2 }, { href: "/?tab=profile", label: "Profil", icon: UserRound },
];
export default function AboutPage() {
  const readyLessons = getReadyLessons();
  const activeCategories = categories.filter(category => readyLessons.some(lesson => lesson.categoryId === category.id));
  const features = [
    { icon: Layers3, title: `${readyLessons.length} de lecții · ${activeCategories.length} categorii`, text: "Organizate pe categorii și capitole, de la bazele banilor la decizii mai complexe." },
    { icon: CircleCheck, title: "Quiz-uri și scenarii", text: "Îți verifici ideile și primești explicații pentru răspunsuri." },
    { icon: Flame, title: "Progres în ritmul tău", text: "XP-ul, streak-ul și progresul salvat în cont te ajută să rămâi constant." },
    { icon: Target, title: "Provocarea zilei", text: "Revii la ce ai învățat printr-o nouă întrebare." },
    { icon: Gamepad2, title: "SimLife", text: "Exersezi decizii cu bani fictivi și urmărești efectele lor." },
  ];
  return <div className="finly-app tab-profile about-page">
    <a className="skip-link" href="#app-content">Sari la conținut</a>
    <div className="desktop-brand"><Link href="/" className="brand-word">finly<span>.</span></Link><span>Banii, pe înțelesul tău.</span></div>
    <main className="app-content" id="app-content">
      <Link className="back-button" href="/?tab=profile"><ArrowLeft size={18} aria-hidden="true"/> Înapoi la profil</Link>
      <header className="screen-heading"><h1>Despre Finly</h1></header>
      <section className="about-hero app-card" aria-labelledby="about-intro"><FinlyMascot className="about-fini" framing="bust" priority/><div><h2 id="about-intro">Învață să te descurci cu banii.</h2><p>Lecții, situații practice și SimLife, unde vezi ce se întâmplă când iei decizii cu banii.</p></div></section>
      <section className="about-section" aria-labelledby="about-what"><h2 id="about-what">Ce este Finly?</h2><p>Finly este o aplicație de educație financiară pentru tineri. Înveți conceptele pas cu pas, apoi le aplici prin întrebări și situații inspirate din viața reală.</p></section>
      <section className="about-section" aria-labelledby="about-how"><h2 id="about-how">Cum înveți</h2><div className="about-steps">{steps.map(({ icon: Icon, title, text }) => <article className="app-card about-step" key={title}><span className="icon-tile"><Icon size={21} aria-hidden="true"/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
      <section className="about-section" aria-labelledby="about-features"><h2 id="about-features">Ce găsești în Finly</h2><div className="about-features app-card">{features.map(({ icon: Icon, title, text }) => <article className="about-feature" key={title}><Icon size={21} aria-hidden="true"/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
      <section className="about-section about-practice app-card" aria-labelledby="about-simulator"><span className="icon-tile"><Gamepad2 size={23} aria-hidden="true"/></span><h2 id="about-simulator">Învață făcând alegeri</h2><p>În SimLife gestionezi bani fictivi într-un calendar care urmărește timpul real. Primești venituri, ai cheltuieli și întâlnești situații de zi cu zi. Alegerile îți schimbă soldul, iar unele au consecințe mai târziu.</p><p>Poți adăuga abonamente și urmări plățile. La final de lună vezi unde s-au dus banii și ce ai putea schimba.</p><p className="about-note">Banii și situațiile din SimLife sunt pentru exercițiu.</p><Link className="back-button" href="/simulator">Deschide SimLife <ArrowRight size={17} aria-hidden="true"/></Link></section>
      <section className="about-section" aria-labelledby="about-why"><h2 id="about-why">De ce Finly?</h2><div className="about-principles">{principles.map(({ title, text }) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="about-end app-card" aria-labelledby="about-next"><h2 id="about-next">Un pas mai departe.</h2><p>Alege ce vrei să înțelegi și învață în ritmul tău.</p><Link className="app-button" href="/lectii">Vezi lecțiile <ArrowRight size={18} aria-hidden="true"/></Link></section>
      <footer className="about-footer"><nav aria-label="Informații legale"><Link href="/termeni">Termeni</Link><Link href="/confidentialitate">Confidențialitate</Link></nav></footer>
    </main>
    <nav className="bottom-nav" aria-label="Navigare principală">{navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={label === "Profil" ? "active" : undefined}><span><Icon size={21} strokeWidth={label === "Profil" ? 2.3 : 1.8} aria-hidden="true"/></span><strong>{label}</strong></Link>)}</nav>
  </div>;
}
