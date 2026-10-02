import { LessonPlayer } from "../../components/lesson-player";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LessonPlayer id={id}/>;
}
