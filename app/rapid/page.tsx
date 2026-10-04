import { redirect } from "next/navigation";
import { legacyLessonIds } from "@/src/lib/learning-storage";
import { getLegacyQuickLesson } from "@/src/content/lessons";
import { LessonPlayer } from "../components/lesson-player";
export default async function Page({ searchParams }: { searchParams: Promise<{ lesson?: string }> }) {
  const { lesson } = await searchParams;
  const id = lesson ? legacyLessonIds[lesson] : undefined;
  if (id && getLegacyQuickLesson(id)) return <LessonPlayer id={id} legacyQuick/>;
  redirect(id ? `/lectie/${id}` : "/lectii");
}
