import Image from "next/image";

/** Fini: the recurring lion guide. The blue quarter zip and quiet F are his brand cues. */
export function FinlyMascot({ className = "", priority = false, framing = "full", mood = "normal" }: { className?: string; priority?: boolean; framing?: "head" | "bust" | "full"; mood?: "normal" | "thinking" | "correct" | "wrong" | "excited" | "serious" }) {
  const dimensions = framing === "head" ? [340, 340] : framing === "bust" ? [390, 490] : [600, 700];
  return <Image className={className} src={`/brand/fini-${framing}-${mood}.svg`} alt={`Fini, leul Finly${mood === "thinking" ? ", curios, cu o labă la bărbie" : mood === "correct" ? ", mândru de progresul tău" : mood === "wrong" ? ", te încurajează să mai încerci" : mood === "excited" ? ", bucuros de reușită" : mood === "serious" ? ", atent" : ", cu un zâmbet cald"}.`} width={dimensions[0]} height={dimensions[1]} sizes={framing === "head" ? "80px" : "(max-width: 560px) 170px, 220px"} preload={priority} />;
}
