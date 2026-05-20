"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Project } from "@/lib/projects";

interface CaseStudyLayoutProps {
  project: Project;
  nextProject?: Project | null;
}

function Gallery({ images, title, color }: { images: string[]; title: string; color: string }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => setActive((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(
    () => setActive((i) => (i !== null && i < images.length - 1 ? i + 1 : i)),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, close, prev, next]);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t border-border"
      >
        <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-20">
          <div className="flex lg:flex-col gap-4 lg:gap-2">
            <span className="font-mono text-xs text-accent">05</span>
            <h2 className="font-syne font-700 text-xl lg:text-2xl text-text tracking-[-0.02em]">
              Galería
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative aspect-video overflow-hidden border border-border hover:border-accent transition-colors duration-300 group"
                style={{ borderColor: active === i ? color : undefined }}
                aria-label={`Ver captura ${i + 1} de ${title}`}
              >
                <Image
                  src={src}
                  alt={`${title} — captura ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[200] bg-bg/95 backdrop-blur-md flex items-center justify-center p-4 lg:p-12"
          onClick={close}
        >
          {/* Image */}
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${title} — captura ${active + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Counter */}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-text-muted">
            {active + 1} / {images.length}
          </span>

          {/* Prev */}
          {active > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 lg:left-8 p-2 text-text-muted hover:text-accent transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Next */}
          {active < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 lg:right-8 p-2 text-text-muted hover:text-accent transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-accent transition-colors"
            aria-label="Cerrar galería"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </>
  );
}

export function CaseStudyLayout({ project, nextProject }: CaseStudyLayoutProps) {
  const sections = [
    { label: "El problema",           number: "01", content: project.problem },
    { label: "El proceso",            number: "02", content: project.process },
    { label: "La solución técnica",   number: "03", content: project.solution },
    { label: "Resultados & aprendizajes", number: "04", content: project.results },
  ];

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back */}
            <Link
              href="/#proyectos"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-text-muted hover:text-accent transition-colors mb-12"
            >
              <ArrowLeft size={12} />
              Volver a proyectos
            </Link>

            {/* Header grid */}
            <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="accent">{project.year}</Badge>
                  <Badge variant="default">{project.role}</Badge>
                  <Badge variant="default">{project.duration}</Badge>
                </div>
                <h1 className="font-syne font-800 text-6xl lg:text-8xl tracking-[-0.04em] leading-none mb-6 text-text">
                  {project.title}
                </h1>
                <p
                  className="font-mono text-base lg:text-lg text-text-muted leading-relaxed max-w-xl"
                  style={{ color: project.color }}
                >
                  {project.tagline}
                </p>
              </div>

              {/* Meta */}
              <div className="space-y-6 lg:pt-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-3">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="default">{tech}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-accent text-bg font-syne font-700 text-xs uppercase tracking-[0.1em] px-5 py-2.5 hover:bg-accent-dim transition-colors w-fit"
                    >
                      Demo en vivo
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-border text-text font-syne font-600 text-xs uppercase tracking-[0.1em] px-5 py-2.5 hover:border-accent hover:text-accent transition-colors w-fit"
                    >
                      GitHub
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div
              className="relative w-full h-[40vh] lg:h-[60vh] border border-border overflow-hidden bg-surface"
              style={{ borderColor: `${project.color}30` }}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`Captura de pantalla de ${project.title}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: `${project.color}08` }}
                >
                  <span
                    className="font-syne font-800 text-8xl lg:text-[12rem] tracking-[-0.05em] opacity-10"
                    style={{ color: project.color }}
                  >
                    {project.title[0]}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Case study sections */}
        {sections.map((section) => (
          <motion.section
            key={section.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t border-border"
            aria-labelledby={`section-${section.number}`}
          >
            <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-20">
              <div className="flex lg:flex-col gap-4 lg:gap-2">
                <span className="font-mono text-xs text-accent">{section.number}</span>
                <h2
                  id={`section-${section.number}`}
                  className="font-syne font-700 text-xl lg:text-2xl text-text tracking-[-0.02em]"
                >
                  {section.label}
                </h2>
              </div>
              <div className="max-w-2xl">
                {section.content.split("\n").map((para, i) =>
                  para.trim() ? (
                    <p key={i} className="font-mono text-sm text-text-muted leading-relaxed mb-4 last:mb-0">
                      {para}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          </motion.section>
        ))}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <Gallery images={project.gallery} title={project.title} color={project.color} />
        )}

        {/* Next project CTA */}
        {nextProject && !nextProject.wip && (
          <section className="border-t border-border">
            <Link
              href={`/proyectos/${nextProject.id}`}
              className="group block max-w-7xl mx-auto px-6 lg:px-12 py-16 hover:bg-surface/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-3">
                    Siguiente proyecto
                  </p>
                  <h3 className="font-syne font-800 text-4xl lg:text-5xl tracking-[-0.03em] text-text group-hover:text-accent transition-colors">
                    {nextProject.title}
                  </h3>
                  <p className="font-mono text-xs text-text-muted mt-2">{nextProject.tagline}</p>
                </div>
                <ArrowRight
                  size={32}
                  className="text-text-muted group-hover:text-accent group-hover:translate-x-2 transition-all shrink-0 ml-8"
                />
              </div>
            </Link>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
