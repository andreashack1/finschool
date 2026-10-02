"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { KeyboardEvent } from "react";
import { ArrowRight, BookOpen, Check, ChevronRight, Clock3, CreditCard, Flame, Landmark, Menu, Percent, Play, ShieldCheck, Target, TrendingUp, Wallet, X, Zap } from "lucide-react";
import { FinlyMascot } from "../components/finly-brand";
import { LessonPreview } from "../components/lesson-preview";

const topics = [
  { icon: Wallet, title: "Buget & cheltuieli", text: "Știi unde se duc banii tăi." },
  { icon: CreditCard, title: "Carduri & conturi", text: "Primul card, fără semne de întrebare." },
  { icon: Target, title: "Economii", text: "Pui deoparte pentru ce contează." },
  { icon: Landmark, title: "Salariu & taxe", text: "Înțelegi ce intră în cont și de ce." },
  { icon: Percent, title: "Credite & dobândă", text: "Înveți cât costă banii împrumutați." },
  { icon: TrendingUp, title: "Inflație & economie", text: "De ce aceiași bani cumpără mai puțin." },
];
const links = [{ href: "#cum-functioneaza", text: "Cum funcționează" }, { href: "#lectii", text: "Ce înveți" }, { href: "#despre", text: "De ce Finly?" }];

function keepDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;
  const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
  const first = buttons[0];
  const last = buttons[buttons.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault(); last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault(); first?.focus();
  }
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [info, setInfo] = useState<"privacy" | "terms">("privacy");
  const menuToggle = useRef<HTMLButtonElement>(null);
  const infoDialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const closeDialog = () => { document.body.style.overflow = ""; lastTrigger.current?.focus(); };
  const showInfo = (type: "privacy" | "terms") => {
    lastTrigger.current = document.activeElement as HTMLElement;
    setInfo(type); infoDialog.current?.showModal(); document.body.style.overflow = "hidden";
  };

  return <>
    <a className="skip-link" href="#continut">Sari la conținut</a>
    <header className="header container">
      <a className="logo" href="#" aria-label="Finly, acasă">Finly<span className="brand-period" aria-hidden="true">.</span></a>
      <nav className="desktop-nav" aria-label="Navigare principală">{links.map(link => <a key={link.href} href={link.href}>{link.text}</a>)}</nav>
      <Link className="nav-cta" href="/lectie/salariu-brut-vs-net">Hai să începem <ArrowRight size={17}/></Link>
      <button ref={menuToggle} className="menu-toggle" aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      {menuOpen && <nav className="mobile-menu" id="mobile-menu" aria-label="Navigare mobilă">{links.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.text}<ChevronRight size={16}/></a>)}<Link className="mobile-start" href="/lectie/salariu-brut-vs-net" onClick={() => setMenuOpen(false)}>Începe gratuit <ArrowRight size={16}/></Link></nav>}
    </header>
    <main id="continut">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span/> BANI PE ÎNȚELESUL TĂU</div><h1 id="hero-title">Banii sunt<br/>complicați.<br/><span>Învățatul lor nu<br/>trebuie să fie.</span></h1><p>Învață cum funcționează banii prin lecții scurte, quiz-uri și exemple pe care chiar le înțelegi.</p><div className="hero-actions"><Link className="button primary" href="/lectie/salariu-brut-vs-net">Începe gratuit <ArrowRight size={19}/></Link><a className="button text-button" href="#cum-functioneaza"><Play size={15}/> Vezi cum funcționează</a></div><p className="microcopy">Gratuit. Fără card. În ritmul tău.</p></div>
        <div className="hero-visual"><div className="mascot-stage"/><div className="speech-bubble">Hei! Facem echipă?<span className="speech-author">FINI, PRIETENUL TĂU CU EXPLICAȚIILE</span></div><FinlyMascot className="hero-mascot" priority/><div className="hero-streak"><Flame size={20}/><div><strong>3 zile la rând</strong><span>Un obicei care prinde.</span></div><span className="streak-dots" aria-hidden="true"><i/><i/><i/></span></div><div className="hero-lesson"><div className="lesson-card-top"><span className="lesson-icon"><BookOpen size={21}/></span><span className="xp-chip">+20 XP</span></div><span className="ui-label">PRIMUL PAS SPRE VIITOR</span><strong>Ce sunt banii?</strong><div className="lesson-card-bottom"><span>Lecția 1 din 5</span><ArrowRight size={16}/></div><div className="progress-track"><span/></div></div></div>
      </section>
      <div className="benefit-strip container" aria-label="Pe scurt despre Finly"><span><Clock3/> 5 minute pe zi</span><span><BookOpen/> Lecții scurte</span><span><Target/> Creat pentru adolescenți</span><span><ShieldCheck/> 100% gratuit</span></div>
      <section className="how section container" id="cum-functioneaza"><div className="section-heading"><div className="eyebrow">UN PIC AZI. MAI CLAR MÂINE.</div><h2>Învață despre bani<br/>fără să simți că înveți.</h2><p>Fără jargon. Fără lecții de o oră.</p></div><div className="steps"><article><span className="step-number">01</span><h3>Învață</h3><p>Lecții de câteva minute. Un singur concept, explicat pe înțelesul tău.</p><div className="step-ui"><BookOpen size={18}/><span>Nevoie sau dorință?</span><span className="step-time">3 min</span></div></article><article><span className="step-number">02</span><h3>Testează-te</h3><p>Quiz-uri scurte ca să vezi dacă ai prins ideea. Greșelile fac parte din joc.</p><div className="step-ui"><span className="mini-check"><Check size={14}/></span><span>Exact. Ai prins ideea!</span></div></article><article><span className="step-number">03</span><h3>Progresează</h3><p>XP, streak-uri și progres vizibil. Motive mici să te întorci și mâine.</p><div className="step-ui"><Zap size={18}/><span>Un pas mai departe</span><span className="step-time">+20 XP</span></div></article></div></section>
      <section className="topics section container" id="lectii"><div className="section-heading left"><div className="eyebrow">PENTRU VIAȚA REALĂ</div><h2>Lucrurile despre bani pe care<br className="wide-only"/> ar fi trebuit să ni le explice cineva.</h2><p>De la primul card până la primul salariu.</p></div><div className="topic-grid">{topics.map(({ icon: Icon, title, text }) => <article className="topic" key={title}><span className="topic-icon"><Icon size={23}/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
      <section className="product-section section container" id="incearca"><div className="product-copy"><div className="eyebrow">MAI PUȚINĂ TEORIE. MAI MULT „AHA”.</div><h2>Așa arată<br/>un moment de claritate.</h2><p>O întrebare. Un exemplu din viața ta.<br/>Și o explicație care rămâne cu tine.</p><span className="preview-note"><span/> Demo interactiv · Încearcă un răspuns</span></div><div className="product-window"><div className="window-bar"><span className="window-dots" aria-hidden="true"><i/><i/><i/></span><span>Finly / Lecții</span><span className="window-status">DEMO</span></div><LessonPreview initialAnswer={1}/></div></section>
      <section className="why section container" id="despre"><div className="section-heading"><div className="eyebrow">UN PRIETEN, NU UN MANUAL</div><h2>Finanțe explicate ca unui prieten.</h2><p>Nu trebuie să știi deja. De asta suntem aici.</p></div><div className="why-grid"><article><span>01 / CLAR</span><h3>Fără termeni complicați</h3><p>Explicăm lucrurile normal. Iar dacă apare un termen nou, îl luăm de la zero.</p></article><article><span>02 / ÎN RITMUL TĂU</span><h3>Lecții de câteva minute</h3><p>Înveți ceva util fără să-ți ocupi jumătate de zi. Cinci minute chiar contează.</p></article><article><span>03 / UTIL</span><h3>Făcut pentru viața reală</h3><p>Carduri, salarii, economii, taxe. Decizii pe care chiar o să le întâlnești.</p></article></div></section>
      <section className="final-cta container"><div><div className="eyebrow">PRIMUL PAS E CEL MAI SIMPLU.</div><h2>Banii n-ar trebui să vină<br/>fără instrucțiuni.</h2><p>Începe cu prima lecție. Durează mai puțin decât un scroll pe TikTok.</p><Link className="button primary" href="/lectie/salariu-brut-vs-net">Începe gratuit <ArrowRight size={19}/></Link><span className="microcopy">Fără card. Fără presiune.</span></div><FinlyMascot className="cta-mascot"/></section>
    </main>
    <footer className="footer container"><div className="footer-brand"><a className="logo" href="#">Finly<span className="brand-period" aria-hidden="true">.</span></a><p>Educație financiară pe înțelesul tău.</p></div><nav aria-label="Linkuri footer"><a href="#despre">Despre</a><button onClick={() => showInfo("privacy")}>Confidențialitate</button><button onClick={() => showInfo("terms")}>Termeni</button></nav><small>© {new Date().getFullYear()} Finly. Făcut cu grijă, în România.</small></footer>
    <dialog ref={infoDialog} className="info-dialog" aria-labelledby="info-title" onClose={closeDialog} onKeyDown={keepDialogFocus} onClick={e => { if (e.target === e.currentTarget) infoDialog.current?.close(); }}><button className="dialog-close" aria-label="Închide" onClick={() => infoDialog.current?.close()} autoFocus><X size={21}/></button><h2 id="info-title">{info === "privacy" ? "Confidențialitate" : "Despre acest demo"}</h2>{info === "privacy" ? <><p>Această pagină nu cere numele, adresa de email sau datele cardului. Nu creează conturi și nu trimite răspunsurile din quiz către un server.</p><p>Selecțiile sunt păstrate doar în memoria paginii și se resetează la reîncărcare. Nu am integrat instrumente de publicitate sau analytics. Infrastructura de găzduire poate păstra loguri tehnice ale accesărilor.</p></> : <><p>Finly este o demonstrație de educație financiară. Poți explora pagina și lecția gratuit, fără înregistrare.</p><p>XP-ul, streak-ul și progresul ilustrate prezintă experiența propusă. Nu sunt salvate între vizite. Exemplele sunt pentru învățare și nu sunt recomandări financiare personalizate.</p></>}</dialog>
  </>;
}


