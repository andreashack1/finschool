import { z } from "zod";
import { categories } from "./categories";
import { getLessonById } from "./lessons";
export const AchievementIconSchema = z.enum(["Footprints", "Flame", "CalendarCheck", "Trophy", "PiggyBank", "ShieldCheck", "WalletCards", "BriefcaseBusiness"]);
export const AchievementConditionSchema = z.object({ type: z.enum(["completed-lessons", "perfect-lessons", "specialist", "longest-streak", "daily-goals", "total-xp", "daily-answers", "daily-correct", "category", "chapter", "lesson", "simulator"]), target: z.number().int().positive(), refId: z.string().min(1).optional(), categoryId: z.string().min(1).optional() });
export const AchievementSchema = z.object({ id: z.string().min(1), title: z.string().min(1), description: z.string().min(1), icon: AchievementIconSchema, group: z.enum(["Învățare", "Consecvență", "XP", "Provocări", "Subiecte", "Simulator"]), condition: AchievementConditionSchema });
export function validateAchievements(value: unknown) {
  const parsed = AchievementSchema.array().length(21).parse(value);
  if (new Set(parsed.map(a => a.id)).size !== parsed.length) throw new Error("Duplicate achievement ID");
  for (const a of parsed) {
    const c = a.condition;
    if (c.type === "lesson" && !getLessonById(c.refId!)) throw new Error(`Achievement ${a.id}: missing lesson`);
    if (c.type === "category" && !categories.some(x => x.id === c.refId)) throw new Error(`Achievement ${a.id}: missing category`);
    if (c.type === "chapter" && !categories.find(x => x.id === c.categoryId)?.chapters.some(x => x.id === c.refId)) throw new Error(`Achievement ${a.id}: missing chapter`);
  }
  return parsed;
}
type Entry = [string, string, string, z.infer<typeof AchievementIconSchema>, z.infer<typeof AchievementSchema>["group"], z.infer<typeof AchievementConditionSchema>];
const entries: Entry[] = [
  ["first-step", "Primul pas", "Termină prima lecție.", "Footprints", "Învățare", { type: "completed-lessons", target: 1 }],
  ["serious-student", "Elev serios", "Termină 5 lecții.", "BriefcaseBusiness", "Învățare", { type: "completed-lessons", target: 5 }],
  ["passionate", "Pasionat", "Termină 15 lecții.", "Trophy", "Învățare", { type: "completed-lessons", target: 15 }],
  ["perfectionist", "Perfecționist", "Termină o lecție cu toate răspunsurile corecte din prima.", "Trophy", "Învățare", { type: "perfect-lessons", target: 1 }],
  ["three-perfect", "Trei de zece", "Termină perfect 3 lecții diferite.", "Trophy", "Învățare", { type: "perfect-lessons", target: 3 }],
  ["specialist", "Specialist", "Termină toate lecțiile disponibile dintr-o categorie cu minimum 3 lecții gata.", "ShieldCheck", "Învățare", { type: "specialist", target: 1 }],
  ["three-days", "Trei zile la rând", "Adună 3 zile active într-un streak.", "Flame", "Consecvență", { type: "longest-streak", target: 3 }],
  ["focused", "Concentrat", "Adună 7 zile active într-un streak.", "Flame", "Consecvență", { type: "longest-streak", target: 7 }],
  ["consistent", "Consecvent", "Adună 30 de zile active într-un streak.", "CalendarCheck", "Consecvență", { type: "longest-streak", target: 30 }],
  ["daily-goals-seven", "Obiectiv în mână", "Atinge obiectivul zilnic în 7 zile diferite.", "CalendarCheck", "Consecvență", { type: "daily-goals", target: 7 }],
  ["xp-100", "100 XP", "Strânge 100 XP din activități.", "Trophy", "XP", { type: "total-xp", target: 100 }],
  ["xp-500", "500 XP", "Strânge 500 XP din activități.", "Trophy", "XP", { type: "total-xp", target: 500 }],
  ["xp-1000", "Club 1000 XP", "Strânge 1.000 XP din activități.", "Trophy", "XP", { type: "total-xp", target: 1000 }],
  ["xp-2500", "2500 XP", "Strânge 2.500 XP din activități.", "Trophy", "XP", { type: "total-xp", target: 2500 }],
  ["first-challenge", "Prima provocare", "Răspunde la prima provocare a zilei.", "Footprints", "Provocări", { type: "daily-answers", target: 1 }],
  ["ten-challenges", "10 provocări corecte", "Răspunde corect la provocări în 10 zile diferite.", "CalendarCheck", "Provocări", { type: "daily-correct", target: 10 }],
  ["trained-eye", "Ochi format", "Termină toate lecțiile disponibile din «Nu te lăsa păcălit».", "ShieldCheck", "Subiecte", { type: "category", target: 1, refId: "siguranta-financiara" }],
  ["budget-ready", "Buget gata", "Termină lecția «Primul tău buget».", "WalletCards", "Subiecte", { type: "lesson", target: 1, refId: "primul-buget" }],
  ["first-pay", "Prima plată", "Termină toate lecțiile disponibile din capitolul «Salariul».", "BriefcaseBusiness", "Subiecte", { type: "chapter", target: 1, refId: "salariul", categoryId: "primul-job" }],
  ["calm-credit", "Calm la credit", "Termină lecția «Scorul de credit».", "WalletCards", "Subiecte", { type: "lesson", target: 1, refId: "scorul-de-credit" }],
  ["first-month", "Prima lună", "Termină simulatorul pentru prima dată.", "PiggyBank", "Simulator", { type: "simulator", target: 1, refId: "simulator" }],
];
export const achievements = validateAchievements(entries.map(([id, title, description, icon, group, condition]) => ({ id, title, description, icon, group, condition })));
export type Achievement = z.infer<typeof AchievementSchema>;
export type AchievementIcon = z.infer<typeof AchievementIconSchema>;
