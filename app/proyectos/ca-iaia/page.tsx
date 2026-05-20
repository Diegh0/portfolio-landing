import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Ca' Iaia — Case Study",
  description:
    "App de pedidos para llevar con backend 100% sobre Google Sheets. React + Vite + Apps Script — sin servidor propio.",
  openGraph: {
    title: "Ca' Iaia — Case Study | Diego Fuertes",
    description: "Web app fullstack para gestión de pedidos. React · Vite · Google Sheets · Apps Script.",
  },
};

export default function CaIaiaPage() {
  const project = projects.find((p) => p.id === "ca-iaia");
  const nextProject = projects.find((p) => p.id === "vitalia-pro") ?? null;

  if (!project) notFound();

  return <CaseStudyLayout project={project} nextProject={nextProject} />;
}
