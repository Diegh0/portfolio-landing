import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Vitalia Pro — Case Study",
  description:
    "Cómo diseñé y construí un SaaS de gestión clínica completo para fisioterapeutas — dashboard, pacientes, analíticas y facturación en una sola interfaz.",
  openGraph: {
    title: "Vitalia Pro — Case Study | Diego Fuertes",
    description:
      "SaaS de gestión clínica. Next.js 16 · React 19 · Recharts · Zustand · Framer Motion.",
  },
};

export default function VitaliaProPage() {
  const project = projects.find((p) => p.id === "vitalia-pro");
  const nextProject = projects.find((p) => p.id === "gastrofit") ?? null;

  if (!project) notFound();

  return <CaseStudyLayout project={project} nextProject={nextProject} />;
}
