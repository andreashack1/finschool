import { CategorySchema, LessonSchema, LessonScreenSchema } from "../types/learning-schema";
import type { Category, Lesson, LessonScreen } from "../types/learning";
import { validateAnswerPositions } from "./lesson-options";

export const isValidScreen = (value: unknown): value is LessonScreen => LessonScreenSchema.safeParse(value).success;

// Called by the registry at module evaluation, including production build.
export function validateContentTree(categories: readonly Category[], lessons: readonly Lesson[], legacy: readonly Lesson[] = []) {
  CategorySchema.array().parse(categories);
  for (const lesson of [...lessons, ...legacy]) {
    const result = LessonSchema.safeParse(lesson);
    if (!result.success) throw new Error(`Lesson "${lesson.id}": ${result.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`);
    if (result.data.status === "ready") validateAnswerPositions(result.data);
  }
  const unique = (ids: readonly string[], name: string) => {
    const seen = new Set<string>();
    for (const id of ids) { if (seen.has(id)) throw new Error(`Duplicate ${name} ID "${id}"`); seen.add(id); }
  };
  unique(categories.map(c => c.id), "category");
  unique(categories.map(c => c.slug), "category slug");
  unique([...lessons, ...legacy].map(l => l.id), "lesson");
  unique([...lessons, ...legacy].map(l => l.slug), "lesson slug");
  const orders = categories.map(c => c.order).sort((a, b) => a - b);
  if (orders.some((order, i) => order !== i + 1)) throw new Error("Category order must be unique and consecutive, starting at 1");
  const registry = new Map(lessons.map(l => [l.id, l]));
  const refs = new Set<string>();
  for (const category of categories) {
    unique(category.chapters.map(c => c.id), `chapter in category "${category.id}"`);
    for (const chapter of category.chapters) for (const id of chapter.lessons) {
      if (refs.has(id)) throw new Error(`Lesson "${id}" appears in more than one chapter`);
      refs.add(id);
      const lesson = registry.get(id);
      if (!lesson) throw new Error(`Chapter "${chapter.id}" references missing lesson "${id}"`);
      if (lesson.categoryId !== category.id || lesson.chapterId !== chapter.id) throw new Error(`Lesson "${id}" disagrees with its category/chapter reference`);
    }
  }
  for (const lesson of [...lessons, ...legacy]) {
    const category = categories.find(c => c.id === lesson.categoryId);
    if (!category) throw new Error(`Lesson "${lesson.id}" references missing category "${lesson.categoryId}"`);
    if (!category.chapters.some(c => c.id === lesson.chapterId)) throw new Error(`Lesson "${lesson.id}" references missing chapter "${lesson.chapterId}"`);
    if (registry.has(lesson.id) && !refs.has(lesson.id)) throw new Error(`Lesson "${lesson.id}" is not referenced in the curriculum`);
  }
}
