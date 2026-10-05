import { getReadyLessons } from '../../content/lessons';
import { categories } from '../../content/categories';
export function getFirstCurriculumLesson() {
  const registry = new Map(getReadyLessons().map(lesson => [lesson.id, lesson]));
  for (const category of [...categories].sort((a,b) => a.order - b.order)) for (const chapter of category.chapters) for (const id of chapter.lessons) {
    const lesson = registry.get(id); if (lesson) return lesson;
  }
  throw new Error('Curriculum has no ready lesson');
}
