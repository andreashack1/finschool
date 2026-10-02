export type CategoryStatus = "active" | "coming-soon";
export type LessonStatus = "ready" | "coming-soon";
export type CategoryIcon = "BriefcaseBusiness" | "WalletCards" | "CreditCard" | "PiggyBank" | "ShieldCheck" | "ChartNoAxesCombined";
export type FiniMood = "neutral" | "happy" | "thinking" | "encouraging" | "surprised" | "serious";
export type FiniMessage = { mood: FiniMood; message: string };
type ScreenBase = { id: string; title: string; fini?: FiniMessage };
export type TextScreen = ScreenBase & { type: "text"; body: string; highlight?: string; continueLabel?: string };
export type AnswerOption = { id: string; label: string };
type QuestionBase = ScreenBase & {
  question: string;
  explanation: string;
  correctFeedback?: string;
  incorrectFeedback?: string;
  feedbackFini?: FiniMessage;
};
type ChoiceBase = QuestionBase & { options: readonly AnswerOption[]; correctOption: string };
export type MultipleChoiceScreen = ChoiceBase & { type: "multiple-choice" };
export type TrueFalseScreen = QuestionBase & { type: "true-false"; correctAnswer: boolean };
export type ScenarioScreen = ChoiceBase & { type: "scenario"; context: string; cards?: readonly { title: string; body: string }[] };
export type QuickCalcScreen = QuestionBase & {
  type: "quick-calc";
  context: string;
  options: readonly { id: string; value: number }[];
  expectedAnswer: number;
  unit?: string;
};
export type LessonScreen = TextScreen | MultipleChoiceScreen | TrueFalseScreen | ScenarioScreen | QuickCalcScreen;
export type LessonMetadata = {
  id: string; slug: string; categoryId: string; chapterId: string;
  title: string; description: string; minutes: number; xp: number;
};
export type ReadyLesson = LessonMetadata & { status: "ready"; screens: readonly LessonScreen[]; recapPoints?: readonly string[]; sourceUrls?: readonly { label: string; url: string }[] };
export type ComingSoonLesson = LessonMetadata & { status: "coming-soon"; screens?: never };
export type Lesson = ReadyLesson | ComingSoonLesson;
export type Chapter = { id: string; title: string; lessons: readonly LessonMetadata[] };
export type Category = { id: string; slug: string; title: string; description: string; icon: CategoryIcon; softColor: string; status: CategoryStatus; chapters: readonly Chapter[] };
export type LearningProgress = { version: 1; completedLessonIds: string[]; lastLessonId: string | null; updatedAt: string | null };
export type LessonState = "completed" | "current" | "locked" | "coming-soon";
