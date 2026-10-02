import { redirect } from "next/navigation";
import { legacyLessonIds } from "@/src/lib/learning-storage";
export default async function Page({ searchParams }: { searchParams: Promise<{ lesson?: string }> }) {
  const { lesson } = await searchParams;
  const id = lesson ? legacyLessonIds[lesson] : undefined;
  redirect(id ? `/lectie/${id}` : "/lectii");
}
