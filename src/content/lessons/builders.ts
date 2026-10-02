import type { AnswerOption, MultipleChoiceScreen, ScenarioScreen, QuickCalcScreen } from "../../types/learning";
export const options = (labels: readonly string[]): AnswerOption[] => labels.map((label, i) => ({ id: String(i), label }));
export function choice(id: string, title: string, question: string, labels: readonly string[], correct: number, explanation: string): MultipleChoiceScreen {
  return { id, type: "multiple-choice", title, question, options: options(labels), correctOption: String(correct), explanation };
}
export function scenario(id: string, title: string, context: string, question: string, labels: readonly string[], correct: number, explanation: string): ScenarioScreen {
  return { ...choice(id, title, question, labels, correct, explanation), type: "scenario", context };
}
export function calc(id: string, title: string, context: string, question: string, values: readonly number[], expectedAnswer: number, explanation: string, unit = "lei"): QuickCalcScreen {
  return { id, type: "quick-calc", title, context, question, options: values.map((value, i) => ({ id: String(i), value })), expectedAnswer, unit, explanation };
}
