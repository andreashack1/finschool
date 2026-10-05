import { CategoryView, LearningShell } from "../../components/learning-ui";
import { redirect } from "next/navigation";
import { getCategory } from "@/src/content/categories";
export default async function Page({ params }: { params: Promise<{ categorie: string }> }) {
  const { categorie } = await params;
  if (categorie === "afaceri-si-venituri-extra") redirect("/lectii");
  const category = getCategory(categorie);
  if (category && category.slug !== categorie) redirect(`/lectii/${category.slug}`);
  return <LearningShell><CategoryView slug={categorie}/></LearningShell>;
}
