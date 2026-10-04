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
export function RememberReading({ screen }: { screen: RememberScreen }) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([screen.items[0].id]));
  return <div className="lesson-remember">{screen.items.map(item => {
    const open = expanded.has(item.id), firstSentence = item.body.match(/^.*?[.!?](?:\s|$)/u)?.[0] ?? item.body;
    const panelId = `remember-${screen.id}-${item.id}`;
    return <article key={item.id} className={item.type === "action" ? "remember-action" : ""}><button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setExpanded(current => { const next = new Set(current); if (next.has(item.id)) next.delete(item.id); else next.add(item.id); return next; })}><span>{item.title}</span><span aria-hidden="true">{open ? "−" : "+"}</span></button>{!open && <p className="remember-preview">{firstSentence}</p>}<div id={panelId} className={`remember-body ${open ? "is-open" : ""}`}><p>{item.body}</p><small><strong>Detaliu de ținut minte</strong> {item.detail}</small></div></article>;
  })}</div>;
}
