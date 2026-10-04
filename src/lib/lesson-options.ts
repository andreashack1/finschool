import type { AnswerOption, LessonScreen, ReadyLesson } from "../types/learning";

type ChoiceScreen = Extract<LessonScreen, { type: "variante" | "scenariu" }>;

export function shouldShuffleOptions(screen: LessonScreen): screen is ChoiceScreen & { shuffle?: true } {
  return (screen.type === "variante" || screen.type === "scenariu") && screen.shuffle !== false;
}

// Seeded Fisher–Yates, for display order only. Never mutates content and never
// depends on render timing. This PRNG is not intended for security purposes.
export function shuffleOptions<T>(options: readonly T[], seed: string): T[] {
  let state = 2166136261;
  for (let i = 0; i < seed.length; i++) state = Math.imul(state ^ seed.charCodeAt(i), 16777619);
  const random = () => {
    state = (state + 0x6D2B79F5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
  const result = [...options];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getDisplayOptions(screen: LessonScreen, lessonId: string, sessionSeed: string): AnswerOption[] {
  if (screen.type === "adevarat_fals") return [{ id: "true", label: "Adevărat" }, { id: "false", label: "Fals" }];
  if (screen.type === "calcul") return screen.options.map(option => ({
    id: option.id, label: `${option.value.toLocaleString("ro-RO")} ${screen.unit ?? ""}`.trim(),
  }));
  if (screen.type !== "variante" && screen.type !== "scenariu") return [];
  const options = screen.options;
  return shouldShuffleOptions(screen)
    ? shuffleOptions(options, JSON.stringify([sessionSeed, lessonId, screen.id]))
    : [...options];
}

export function answerPositionDistribution(lesson: ReadyLesson) {
  const questions = lesson.screens.filter(shouldShuffleOptions).map(screen => ({
    screenId: screen.id, arity: screen.options.length,
    position: screen.options.findIndex(option => option.id === screen.correctOption),
  }));
  const groups = new Map<number, number[]>();
  for (const question of questions) {
    const counts = groups.get(question.arity) ?? Array<number>(question.arity).fill(0);
    if (question.position >= 0) counts[question.position]++;
    groups.set(question.arity, counts);
  }
  return { questions, groups };
}

export function validateAnswerPositions(lesson: ReadyLesson): void {
  const { questions, groups } = answerPositionDistribution(lesson);
  // Consecutive means the global sequence of eligible choice screens, ignoring
  // reading steps, true/false, calculations and shuffle:false exceptions.
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    if (question.position < 0) throw new Error(`Lesson "${lesson.id}" screen "${question.screenId}": missing correct option`);
    if (i >= 2 && questions[i - 1].position === question.position && questions[i - 2].position === question.position) {
      throw new Error(`Lesson "${lesson.id}": correct option position "${String.fromCharCode(65 + question.position)}" appears 3 times consecutively on screens ${questions.slice(i - 2, i + 1).map(q => q.screenId).join(", ")}.`);
    }
  }
  for (const [arity, counts] of groups) {
    if (counts.reduce((sum, count) => sum + count, 0) < 3) continue;
    if (Math.max(...counts) - Math.min(...counts) > 1) {
      throw new Error(`Lesson "${lesson.id}": unbalanced correct positions for ${arity}-option questions (${counts.map((count, i) => `${String.fromCharCode(65 + i)}=${count}`).join(", ")}); expected max-min <= 1.`);
    }
  }
}
