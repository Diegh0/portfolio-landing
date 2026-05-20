import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "PsicoApp — Case Study",
  description:
    "Cómo diseñé una plataforma de bienestar mental validada con psicólogos — donde la interfaz es parte de la terapia.",
  openGraph: {
    title: "PsicoApp — Case Study | Diego Fuertes",
    description: "Plataforma web de bienestar mental. Angular + Firebase + SASS + Figma.",
  },
};

export default function PsicoAppPage() {
  const project = projects.find((p) => p.id === "psicoapp");
  const nextProject = projects.find((p) => p.id === "gastrofit") ?? null;

  if (!project) notFound();

  return <CaseStudyLayout project={project} nextProject={nextProject} />;
}
