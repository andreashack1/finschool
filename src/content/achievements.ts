import { z } from "zod";
import { categories } from "./categories";
import { getLessonById } from "./lessons";
export const AchievementIconSchema = z.enum(["Footprints", "Flame", "CalendarCheck", "Trophy", "PiggyBank", "ShieldCheck", "WalletCards", "BriefcaseBusiness"]);
export const AchievementConditionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("completed-lessons"), count: z.number().int().positive() }),
  z.object({ type: z.literal("longest-streak"), days: z.number().int().positive() }),
  z.object({ type: z.literal("total-xp"), xp: z.number().int().positive() }),
  z.object({ type: z.literal("simulator"), simulatorId: z.string().min(1) }),
  z.object({ type: z.literal("category-correct"), categoryId: z.string().min(1), count: z.number().int().positive() }),
  z.object({ type: z.literal("lesson"), lessonId: z.string().min(1) }),
  z.object({ type: z.literal("chapter"), categoryId: z.string().min(1), chapterId: z.string().min(1) }),
]);
export const AchievementSchema = z.object({ id: z.string().min(1), title: z.string().min(1), description: z.string().min(1), icon: AchievementIconSchema, condition: AchievementConditionSchema });
export function validateAchievements(value: unknown) {
  const parsed = AchievementSchema.array().length(8).parse(value);
  if (new Set(parsed.map(a => a.id)).size !== parsed.length) throw new Error("Duplicate achievement ID");
  for (const a of parsed) {
    const c = a.condition;
    if (c.type === "lesson" && !getLessonById(c.lessonId)) throw new Error(`Achievement "${a.id}" references missing lesson "${c.lessonId}"`);
    if (c.type === "chapter" && !categories.find(category => category.id === c.categoryId)?.chapters.some(ch => ch.id === c.chapterId)) throw new Error(`Achievement "${a.id}" references missing chapter`);
    if (c.type === "category-correct" && !categories.some(category => category.id === c.categoryId)) throw new Error(`Achievement "${a.id}" references missing category`);
  }
  return parsed;
}
export const achievements = validateAchievements([
  { id: "first-step", title: "Primul pas", description: "Termină prima lecție.", icon: "Footprints", condition: { type: "completed-lessons", count: 1 } },
  { id: "focused", title: "Concentrat", description: "Ajungi la un streak de 7 zile.", icon: "Flame", condition: { type: "longest-streak", days: 7 } },
  { id: "consistent", title: "Consecvent", description: "Ajungi la un streak de 30 de zile.", icon: "CalendarCheck", condition: { type: "longest-streak", days: 30 } },
  { id: "xp-1000", title: "Club 1000 XP", description: "Strânge 1.000 XP.", icon: "Trophy", condition: { type: "total-xp", xp: 1000 } },
  { id: "first-month", title: "Prima lună", description: "Termină simulatorul pentru prima dată.", icon: "PiggyBank", condition: { type: "simulator", simulatorId: "simulator" } },
  { id: "trained-eye", title: "Ochi format", description: "Răspunde corect la 5 întrebări din categoria «Nu te lăsa păcălit».", icon: "ShieldCheck", condition: { type: "category-correct", categoryId: "siguranta-financiara", count: 5 } },
  { id: "budget-ready", title: "Buget gata", description: "Termină lecția «Primul tău buget».", icon: "WalletCards", condition: { type: "lesson", lessonId: "primul-buget" } },
  { id: "first-pay", title: "Prima plată", description: "Termină toate lecțiile disponibile din capitolul «Salariul».", icon: "BriefcaseBusiness", condition: { type: "chapter", categoryId: "primul-job", chapterId: "salariul" } },
]);
export type Achievement = z.infer<typeof AchievementSchema>;
export type AchievementIcon = z.infer<typeof AchievementIconSchema>;
