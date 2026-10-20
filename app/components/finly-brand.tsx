import Image from "next/image";

export type FiniFraming = "head" | "bust" | "full";
export type FiniMood = "normal" | "thinking" | "correct" | "wrong" | "excited" | "serious";
type FiniAsset = { src: string; width: number; height: number; alt: string };
const portrait = (name: string, alt = "Fini, leul Finly."): FiniAsset => ({ src: `/brand/fini-v2/${name}.webp`, width: 900, height: 900, alt });
const normal: Record<FiniFraming, FiniAsset> = {
  head: portrait("profile"),
  bust: portrait("home"),
  full: { src: "/brand/fini-v2/neutral-full.webp", width: 720, height: 900, alt: "Fini, leul Finly." },
};
const thinking = portrait("thinking", "Fini, leul Finly, gânditor.");
const correct = portrait("correct", "Fini, leul Finly, bucuros.");
const excited: FiniAsset = { src: "/brand/fini-v2/excited.webp", width: 720, height: 900, alt: "Fini, leul Finly, bucuros." };
// Approved V2 sources only. Portrait-only expressions use the complete available
// upper-body artwork for full framing; never invent legs or fall back to V1.
const finiAssets: Partial<Record<FiniMood, Partial<Record<FiniFraming, FiniAsset>>>> = {
  normal,
  thinking: { head: thinking, bust: thinking, full: thinking },
  correct: { head: correct, bust: correct, full: correct },
  wrong: normal,
  excited: { head: portrait("excited-head", excited.alt), bust: excited, full: excited },
  serious: normal,
};
export function getFiniAsset(framing: FiniFraming, mood: FiniMood): FiniAsset {
  return finiAssets[mood]?.[framing] ?? normal[framing];
}
/** Stable framing/mood API; asset selection and accurate alt copy stay centralized. */
export function FinlyMascot({ className = "", priority = false, framing = "full", mood = "normal" }: { className?: string; priority?: boolean; framing?: FiniFraming; mood?: FiniMood }) {
  const asset = getFiniAsset(framing, mood);
  return <Image className={`fini-v2 ${className}`} {...asset} alt={asset.alt} sizes={framing === "head" ? "(max-width: 560px) 90px, 100px" : "(max-width: 560px) 170px, 220px"} preload={priority} style={{ objectFit: "contain" }} />;
}
