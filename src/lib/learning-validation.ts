import type { LessonScreen } from "../types/learning";
export function isValidScreen(value: unknown): value is LessonScreen {
  if (!value || typeof value !== "object") return false;
  if (!("id" in value) || typeof value.id !== "string" || !value.id || !("title" in value) || typeof value.title !== "string" || !value.title || !("type" in value)) return false;
  if (value.type === "text") return "body" in value && typeof value.body === "string" && Boolean(value.body.trim());
  if (!("question" in value) || typeof value.question !== "string" || !value.question.trim() || !("explanation" in value) || typeof value.explanation !== "string" || !value.explanation.trim()) return false;
  if (value.type === "true-false") return "correctAnswer" in value && typeof value.correctAnswer === "boolean";
  if (value.type !== "multiple-choice" && value.type !== "scenario" && value.type !== "quick-calc") return false;
  if (!("options" in value) || !Array.isArray(value.options) || value.options.length < 2) return false;
  const ids: string[] = [];
  for (const option of value.options as unknown[]) {
    if (!option || typeof option !== "object" || !("id" in option) || typeof option.id !== "string" || !option.id || ids.includes(option.id)) return false;
    ids.push(option.id);
    if (value.type === "quick-calc") { if (!("value" in option) || typeof option.value !== "number" || !Number.isFinite(option.value)) return false; }
    else if (!("label" in option) || typeof option.label !== "string" || !option.label.trim()) return false;
  }
  if (value.type === "scenario" || value.type === "quick-calc") {
    if (!("context" in value) || typeof value.context !== "string" || !value.context.trim()) return false;
  }
  if (value.type === "quick-calc") return "expectedAnswer" in value && typeof value.expectedAnswer === "number" && Number.isFinite(value.expectedAnswer) && value.options.filter((option: unknown) => Boolean(option && typeof option === "object" && "value" in option && option.value === value.expectedAnswer)).length === 1;
  return "correctOption" in value && typeof value.correctOption === "string" && ids.includes(value.correctOption);
}
