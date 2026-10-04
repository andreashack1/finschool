import type { z } from "zod";
import type { CategorySchema, ChapterSchema, DifficultySchema, CategoryIconSchema, FiniMessageSchema, LessonScreenSchema, LessonMetadataSchema, ReadyLessonSchema, ComingSoonLessonSchema } from "./learning-schema";

export type Difficulty = z.infer<typeof DifficultySchema>;
export type CategoryIcon = z.infer<typeof CategoryIconSchema>;
export type FiniMessage = z.infer<typeof FiniMessageSchema>;
export type FiniMood = FiniMessage["mood"];
export type LessonScreen = z.infer<typeof LessonScreenSchema>;
export type TextScreen = Extract<LessonScreen, { type: "situatie" | "explicatie" }>;
export type MultipleChoiceScreen = Extract<LessonScreen, { type: "variante" }>;
export type ScenarioScreen = Extract<LessonScreen, { type: "scenariu" }>;
export type QuickCalcScreen = Extract<LessonScreen, { type: "calcul" }>;
export type ExplanationScreen = Extract<LessonScreen, { type: "explicatie" }>;
export type CaseScreen = Extract<LessonScreen, { type: "caz_real" }>;
export type RememberScreen = Extract<LessonScreen, { type: "tine_minte" }>;
export type AnswerOption = { id: string; label: string };
export type LessonMetadata = z.infer<typeof LessonMetadataSchema>;
export type ReadyLesson = z.infer<typeof ReadyLessonSchema>;
export type ComingSoonLesson = z.infer<typeof ComingSoonLessonSchema>;
export type Lesson = ReadyLesson | ComingSoonLesson;
export type Chapter = z.infer<typeof ChapterSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type LessonState = "completed" | "current" | "locked" | "coming-soon";

