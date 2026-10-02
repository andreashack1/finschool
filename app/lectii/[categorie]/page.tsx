import { CategoryView, LearningShell } from "../../components/learning-ui";
export default async function Page({ params }: { params: Promise<{ categorie: string }> }) {
  const { categorie } = await params;
  return <LearningShell><CategoryView slug={categorie}/></LearningShell>;
}
