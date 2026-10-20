import { describe, expect, it, vi, afterEach } from "vitest";
import * as curriculum from "../src/content/lessons";
import { categories } from "../src/content/categories";
import { getNextLesson, getReadyLessons, isLessonUnlocked, lessons } from "../src/content/lessons";
import { getHomeRecommendations } from "../src/lib/home-recommendations";

const ready = getReadyLessons();
describe("Home recommendations from canonical progress", () => {
  it("caps recommendations at two and is deterministic", () => {
    expect(getHomeRecommendations([])).toHaveLength(2);
    expect(getHomeRecommendations([])).toEqual(getHomeRecommendations([]));
  });
  it("excludes ContinueLesson, including a resumed lesson", () => {
    const last = ready.find(l => l.categoryId === categories[2].id)!;
    const current = getNextLesson([], last.id)!;
    expect(getHomeRecommendations([], last.id).map(l => l.id)).not.toContain(current.id);
  });
  it("never recommends locked, unavailable, legacy or nonexistent lessons", () => {
    for (let count = 0; count <= ready.length; count++) {
      const completed = ready.slice(0, count).map(l => l.id);
      for (const lesson of getHomeRecommendations(completed)) {
        expect(lessons).toContain(lesson);
        expect(lesson.status).toBe("ready");
        expect(isLessonUnlocked(lesson, completed)).toBe(true);
        expect(completed).not.toContain(lesson.id);
      }
    }
  });
  it("returns one when only one recommendation remains", () => {
    const remaining = categories.slice(0, 2).map(c => ready.filter(l => l.categoryId === c.id).at(-1)!.id);
    expect(getHomeRecommendations(ready.filter(l => !remaining.includes(l.id)).map(l => l.id))).toHaveLength(1);
  });
  it("returns none after completion or when only ContinueLesson remains", () => {
    expect(getHomeRecommendations(ready.map(l => l.id))).toEqual([]);
    expect(getHomeRecommendations(ready.slice(0, -1).map(l => l.id))).toEqual([]);
  });
  it("prefers different categories", () => {
    const result = getHomeRecommendations([]);
    expect(result[0].categoryId).not.toBe(result[1].categoryId);
  });
  it("does not grow when many lessons are completed", () => {
    for (let count = 0; count <= ready.length; count++)
      expect(getHomeRecommendations(ready.slice(0, count).map(l => l.id)).length).toBeLessThanOrEqual(2);
  });
});

describe("Home edge cases at the selector boundary", () => {
  afterEach(() => vi.restoreAllMocks());
  it("accepts a second legitimate same-category candidate if the pool permits it", () => {
    const pool = ready.filter(l => l.categoryId === ready[0].categoryId).slice(0, 3);
    vi.spyOn(curriculum, "getReadyLessons").mockReturnValue(pool);
    vi.spyOn(curriculum, "getNextLesson").mockReturnValue(pool[0]);
    vi.spyOn(curriculum, "isLessonUnlocked").mockReturnValue(true);
    expect(getHomeRecommendations([])).toEqual(pool.slice(1));
  });
  it("excludes coming-soon content through the real ready selector", () => {
    const unavailable = { ...ready[0], status: "coming-soon" as const };
    lessons.push(unavailable);
    try {
      expect(getHomeRecommendations([])).not.toContain(unavailable);
    } finally {
      lessons.pop();
    }
  });
});
