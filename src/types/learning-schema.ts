import { z } from "zod";

const text = z.string().trim().min(1);
export const DifficultySchema = z.enum(["usor", "mediu", "greu"]);
export const CategoryIconSchema = z.enum(["BookOpen", "BriefcaseBusiness", "WalletCards", "CreditCard", "PiggyBank", "ShieldCheck", "ChartNoAxesCombined", "Coins", "House", "Brain", "Landmark", "Store", "TrendingUp"]);
export const FiniMessageSchema = z.object({ mood: z.enum(["neutral", "happy", "thinking", "encouraging", "surprised", "serious"]), message: text });
const base = { id: text, title: text, fini: FiniMessageSchema.optional() };
const prose = { ...base, body: text, highlight: text.optional(), continueLabel: text.optional() };
export const wordCount = (value: string) => value.trim().split(/\s+/u).filter(Boolean).length;
const countedText = (min: number, max: number, name: string) => text.superRefine((value, ctx) => {
  const count = wordCount(value);
  if (count < min || count > max) ctx.addIssue({ code: "custom", message: `${name} has ${count} words; expected ${min}-${max}` });
});
const note = z.object({ title: text.optional(), text });
const mood = FiniMessageSchema.shape.mood;
export const normalizeTakeaway = (value: string) => value.toLocaleLowerCase("ro-RO").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
export function isCopiedTakeaway(summary: string, detail: string) {
  const a = normalizeTakeaway(summary), b = normalizeTakeaway(detail);
  if (a === b) return true;
  // Catch a copied sentence with a short label/prefix, without rejecting a
  // genuine elaboration that naturally reuses the financial vocabulary.
  return a.length > 0 && b.includes(a) && b.split(" ").length - a.split(" ").length <= 5;
}
const explanation = z.object({ type: z.literal("explicatie"), ...base, body: text.optional(), highlight: text.optional(), continueLabel: text.optional(), eyebrow: text.optional(), finiMood: mood.optional(), paragraphs: z.array(text).min(2).max(4).optional(), example: note.optional(), detail: note.optional(), figuresNote: text.optional() }).superRefine((screen, ctx) => {
  if (!screen.paragraphs && !screen.body) ctx.addIssue({ code: "custom", message: `Explanation "${screen.id}" requires paragraphs or legacy body` });
  if (screen.paragraphs) {
    const count = wordCount(screen.paragraphs.join(" "));
    if (count < 80 || count > 150) ctx.addIssue({ code: "custom", message: `Explanation "${screen.id}" has ${count} words; expected 80-150` });
  }
});
export const CaseScreenSchema = z.object({ type: z.literal("caz_real"), ...base, caseId: text, label: text.optional(), paragraphs: z.array(text).min(2).max(3), finiMood: mood.optional() }).superRefine((screen, ctx) => {
  const result = countedText(120, 200, `Case "${screen.caseId}"`).safeParse(screen.paragraphs.join(" "));
  if (!result.success) for (const issue of result.error.issues) ctx.addIssue({ code: "custom", message: issue.message });
});
export const RememberScreenSchema = z.object({ type: z.literal("tine_minte"), ...base, finiMood: mood.optional(), items: z.array(z.object({ id: text, title: text, body: text, detail: text.optional(), type: z.enum(["normal", "action"]).default("normal") })).min(4).max(6) }).superRefine((screen, ctx) => {
  if (screen.items.at(-1)?.title !== "Ce poți face azi" || screen.items.at(-1)?.type !== "action") ctx.addIssue({ code: "custom", message: `Remember screen "${screen.id}" must end with action "Ce poți face azi"` });
  if (new Set(screen.items.map(item => item.id)).size !== screen.items.length) ctx.addIssue({ code: "custom", message: `Remember screen "${screen.id}" has duplicate item IDs` });
  screen.items.forEach((item, index) => {
    if (item.detail && isCopiedTakeaway(item.body, item.detail)) ctx.addIssue({ code: "custom", path: ["items", index, "detail"], message: "Expanded takeaway must add information, not copy its summary" });
  });
});
export const LessonOptionSchema = z.object({ id: text, label: text });
const question = { ...base, title: text.optional(), question: text, leadIn: text.optional(), explanation: text, correctFeedback: text.optional(), incorrectFeedback: text.optional(), caseId: text.optional(), feedbackFini: FiniMessageSchema.optional() };
const choice = { ...question, options: z.array(LessonOptionSchema).min(3).max(4), correctOption: text, shuffle: z.boolean().optional() };
export const LessonScreenSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("situatie"), ...prose }),
  explanation,
  CaseScreenSchema,
  RememberScreenSchema,
  z.object({ type: z.literal("variante"), ...choice }),
  z.object({ type: z.literal("adevarat_fals"), ...question, correctAnswer: z.boolean() }),
  z.object({ type: z.literal("scenariu"), ...choice, context: text, cards: z.array(z.object({ title: text, body: text })).optional() }),
  z.object({ type: z.literal("calcul"), ...question, context: text, options: z.array(z.object({ id: text, value: z.number().finite() })).min(3).max(4), expectedAnswer: z.number().finite(), unit: text.optional() }),
  z.object({ type: z.literal("recap"), ...base, points: z.array(text).min(2).max(3), continueLabel: text.optional() }),
  z.object({ type: z.literal("final"), ...base }),
]).superRefine((screen, ctx) => {
  if (!("options" in screen)) return;
  if (new Set(screen.options.map(o => o.id)).size !== screen.options.length) ctx.addIssue({ code: "custom", message: `Screen "${screen.id}" has duplicate option IDs` });
  if (screen.type === "calcul") {
    if (screen.options.filter(o => o.value === screen.expectedAnswer).length !== 1) ctx.addIssue({ code: "custom", message: `Screen "${screen.id}" must have exactly one correct calculation option` });
  } else if (!screen.options.some(o => o.id === screen.correctOption)) ctx.addIssue({ code: "custom", message: `Screen "${screen.id}" references missing correct option "${screen.correctOption}"` });
});
export const LessonMetadataSchema = z.object({ id: text, slug: text, categoryId: text, chapterId: text, title: text, description: text, objective: z.string().trim().min(30).max(400).optional(), quizFocus: z.array(text).optional(), minutes: z.number().int().positive(), xp: z.number().int().positive() });
const source = z.object({ label: text, url: z.url() });
export const ReadyLessonSchema = LessonMetadataSchema.extend({ status: z.literal("ready"), contentVersion: z.number().int().positive().optional(), formatVersion: z.literal(2).optional(), minutes: z.number().int().min(3).max(5), screens: z.array(LessonScreenSchema).min(3), recapPoints: z.array(text).optional(), sourceUrls: z.array(source).optional() }).superRefine((lesson, ctx) => {
  if (new Set(lesson.screens.map(s => s.id)).size !== lesson.screens.length) ctx.addIssue({ code: "custom", message: `Lesson "${lesson.id}" has duplicate screen IDs` });
  if (lesson.screens.at(-1)?.type !== "final" || !["recap", "tine_minte"].includes(lesson.screens.at(-2)?.type ?? "")) ctx.addIssue({ code: "custom", message: `Lesson "${lesson.id}" must end with recap/tine_minte, then final` });
  if (lesson.screens.slice(0, -2).some(s => ["recap", "tine_minte", "final"].includes(s.type))) ctx.addIssue({ code: "custom", message: `Lesson "${lesson.id}" has premature recap/final` });
  const cases = new Set<string>();
  for (const screen of lesson.screens) {
    if (screen.type === "caz_real") {
      if (cases.has(screen.caseId)) ctx.addIssue({ code: "custom", message: `Lesson "${lesson.id}": duplicate case "${screen.caseId}"` });
      cases.add(screen.caseId);
    } else if ("caseId" in screen && screen.caseId && !cases.has(screen.caseId)) ctx.addIssue({ code: "custom", message: `Lesson "${lesson.id}" screen "${screen.id}": missing previous case "${screen.caseId}"` });
  }
  // Content revision and pedagogical format are independent: editing legacy
  // content must not silently opt it into the sixteen-step format.
  if (lesson.formatVersion !== 2) return;
  if (!lesson.contentVersion) ctx.addIssue({ code: "custom", message: `Lesson "${lesson.id}": extended format requires contentVersion` });
  const fail = (message: string) => ctx.addIssue({ code: "custom", message: `Lesson "${lesson.id}": ${message}` });
  const screens = lesson.screens, questions = screens.filter(s => "question" in s);
  if (screens[0]?.type !== "situatie") fail("requires an opening situation");
  if (!screens.some(screen => screen.type === "explicatie")) fail("requires explanations");
  if (!questions.length) fail("requires meaningful practice");
  if (screens.at(-2)?.type !== "tine_minte") fail("requires tine_minte before final");
  screens.forEach(screen => {
    if (screen.type === "explicatie" && !screen.paragraphs) fail(`explanation "${screen.id}" requires structured paragraphs`);
    if ("question" in screen && (!screen.correctFeedback || !screen.incorrectFeedback)) fail(`question "${screen.id}" requires correct and incorrect feedback`);
  });
  if (new Set(questions.map(s => s.type)).size < 3) fail("requires at least 3 question types");
  for (const caseScreen of screens.filter(screen => screen.type === "caz_real")) {
    if (!questions.some(s => "caseId" in s && s.caseId === caseScreen.caseId)) fail(`case "${caseScreen.caseId}" requires linked practice`);
  }
});
export const ComingSoonLessonSchema = LessonMetadataSchema.extend({ status: z.literal("coming-soon"), screens: z.array(LessonScreenSchema).max(0).optional() });
export const LessonSchema = z.discriminatedUnion("status", [ReadyLessonSchema, ComingSoonLessonSchema]);
export const ChapterSchema = z.object({ id: text, title: text, lessons: z.array(text) });
export const CategorySchema = z.object({ id: text, slug: text, title: text, subtitle: text, icon: CategoryIconSchema, softColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/), difficulty: DifficultySchema, order: z.number().int().positive(), chapters: z.array(ChapterSchema).min(1) });
export const RoFactsSchema = z.object({ verifiedAt: z.iso.date(), sources: z.array(source).min(1), salary: z.object({ casRate: z.number().min(0).max(1), cassRate: z.number().min(0).max(1), incomeTaxRate: z.number().min(0).max(1), youthDeductionMaxAge: z.number().int().positive(), exampleGross: z.number().positive(), assumptions: text, notes: text }) });
