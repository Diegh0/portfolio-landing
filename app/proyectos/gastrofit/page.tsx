import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "GastroFit — Case Study",
  description:
    "Cómo diseñé y construí una app PWA de planificación nutricional que reduce la fricción de 7 pasos a 2.",
  openGraph: {
    title: "GastroFit — Case Study | Diego Fuertes",
    description: "App PWA de planificación nutricional semanal. Angular + Firebase + PWA.",
  },
};

export default function GastroFitPage() {
  const project = projects.find((p) => p.id === "gastrofit");
  const nextProject = projects.find((p) => p.id === "psicoapp") ?? null;

  if (!project) notFound();

  return <CaseStudyLayout project={project} nextProject={nextProject} />;
}
