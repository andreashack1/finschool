"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { FinlyMascot } from "./finly-brand";
import type { CaseScreen, ExplanationScreen, RememberScreen } from "@/src/types/learning";

const moods = { neutral: "normal", happy: "correct", thinking: "thinking", encouraging: "wrong", surprised: "excited", serious: "serious" } as const;
export function ReadingGuide({ mood = "neutral", label }: { mood?: ExplanationScreen["finiMood"]; label: string }) {
  return <div className="lesson-reading-guide"><FinlyMascot framing="head" mood={moods[mood]}/><span>{label}</span></div>;
}
export function ExplanationReading({ screen }: { screen: ExplanationScreen }) {
  if (!screen.paragraphs) return <><p className="lesson-prompt">{screen.body}</p>{screen.highlight && <div className="lesson-highlight">{screen.highlight}</div>}</>;
  return <div className="lesson-reading">{screen.paragraphs ? screen.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>) : <p>{screen.body}</p>}{screen.example && <aside className="lesson-example"><strong>{screen.example.title ?? "Exemplu"}</strong><p>{screen.example.text}</p>{screen.figuresNote && <small>{screen.figuresNote}</small>}</aside>}{screen.detail && <aside className="lesson-detail"><strong>{screen.detail.title ?? "Detaliu"}</strong><p>{screen.detail.text}</p></aside>}</div>;
}
export function CaseReading({ screen }: { screen: CaseScreen }) {
  return <div className="lesson-reading case-reading">{screen.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>;
}
export function QuestionLeadIn({ text }: { text?: string }) {
  return text ? <p className="lesson-lead-in">{text}</p> : null;
}
export function CaseReader({ screen }: { screen: CaseScreen }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null), trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const returnTarget = trigger.current;
    dialog.current?.showModal();
    return () => { returnTarget?.focus(); };
  }, [open]);
  return <><button type="button" ref={trigger} className="lesson-case-trigger" onClick={() => setOpen(true)}>Recitește cazul</button>{open && <dialog ref={dialog} className="lesson-case-dialog" aria-labelledby="case-reader-title" onCancel={() => setOpen(false)} onKeyDown={event => { if (event.key === "Tab") { event.preventDefault(); dialog.current?.querySelector("button")?.focus(); } }}><div className="lesson-case-dialog-top"><span>CAZ REAL</span><button type="button" autoFocus aria-label="Închide cazul" onClick={() => setOpen(false)}><X size={20}/></button></div><h2 id="case-reader-title">{screen.title}</h2><CaseReading screen={screen}/></dialog>}</>;
}
export function HighlightedDetail({ text, terms }: { text: string; terms: readonly string[] }) {
  const escaped=[...terms].sort((a,b)=>b.length-a.length).map(term=>term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
  const pattern=new RegExp(`(${escaped.join('|')})`,'giu');
  const keys=new Set(terms.map(term=>term.toLocaleLowerCase('ro-RO')));
  return <>{text.split(pattern).map((part,index)=>keys.has(part.toLocaleLowerCase('ro-RO'))?<strong className="remember-keyword" key={index}>{part}</strong>:part)}</>;
}
export function RememberReading({ screen }: { screen: RememberScreen }) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  return <div className="lesson-remember">{screen.items.map(item => {
    const open = expanded.has(item.id);
    const panelId = `remember-${screen.id}-${item.id}`;
    return <article key={item.id} className={`${item.type === "action" ? "remember-action" : ""} ${open ? "is-open" : ""}`}><button id={`${panelId}-toggle`} type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setExpanded(current => { const next = new Set(current); if (next.has(item.id)) next.delete(item.id); else next.add(item.id); return next; })}><span>{item.title}</span><span className="remember-toggle" aria-hidden="true"><span className="remember-toggle-horizontal"/><span className="remember-toggle-vertical"/></span></button><p className="remember-preview">{item.body}</p><div id={panelId} role="region" aria-labelledby={`${panelId}-toggle`} aria-hidden={!open} inert={!open} className={`remember-body ${open ? "is-open" : ""}`}><div><p><HighlightedDetail text={item.detail} terms={item.detailHighlights}/></p></div></div></article>;
  })}</div>;
}
