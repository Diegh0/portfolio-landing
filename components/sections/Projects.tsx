"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/lib/projects";

function ProjectImagePlaceholder({
  title,
  color,
}: {
  title: string;
  color: string;
}) {
  return (
    <div
      className="w-full h-full flex items-end p-6 relative overflow-hidden"
      style={{ backgroundColor: `${color}10` }}
    >
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${(i + 1) * (100 / 7)}%`, backgroundColor: color }}
          />
        ))}
      </div>
      <div className="absolute top-8 left-6 right-6 space-y-3 opacity-30">
        <div className="h-px w-full" style={{ backgroundColor: color }} />
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-sm" style={{ backgroundColor: color, opacity: 0.4 }} />
          <div className="h-6 w-24 rounded-sm" style={{ backgroundColor: color, opacity: 0.2 }} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((j) => (
            <div key={j} className="h-20 rounded-sm" style={{ backgroundColor: color, opacity: 0.15 }} />
          ))}
        </div>
      </div>
      <span
        className="relative z-10 font-syne font-800 text-3xl uppercase tracking-[-0.02em]"
        style={{ color }}
      >
        {title}
      </span>
    </div>
  );
}

function PersonalProjects({ isInView }: { isInView: boolean }) {
  const personal = projects.filter((p) => p.category === "personal");
  const [featured, ...rest] = personal;

  return (
    <div>
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="flex items-center gap-4 mb-10"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          Proyectos personales
        </span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      {/* Featured */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6"
        >
          <article className="group relative grid lg:grid-cols-[1fr_1fr] border border-border hover:border-accent transition-colors duration-300">
            <div className="relative h-72 lg:h-[480px] overflow-hidden bg-surface">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={`Captura de ${featured.title}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <ProjectImagePlaceholder title={featured.title} color={featured.color} />
              )}
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="accent">Destacado</Badge>
                  <span className="font-mono text-xs text-text-muted">{featured.year}</span>
                </div>
                <h3 className="font-syne font-800 text-4xl lg:text-5xl tracking-[-0.03em] mb-4 text-text group-hover:text-accent transition-colors">
                  {featured.title}
                </h3>
                <p className="font-mono text-sm text-text-muted leading-relaxed mb-6">
                  {featured.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {featured.stack.map((tech) => (
                    <Badge key={tech} variant="default">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/proyectos/${featured.id}`}
                  className="group/btn inline-flex items-center gap-2 bg-accent text-bg font-syne font-700 text-xs uppercase tracking-[0.1em] px-5 py-2.5 hover:bg-accent-dim transition-all hover:gap-3"
                >
                  Case study
                  <ArrowUpRight size={12} aria-hidden="true" className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
                {featured.demoUrl && (
                  <a
                    href={featured.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-border text-text font-syne font-600 text-xs uppercase tracking-[0.1em] px-5 py-2.5 hover:border-accent hover:text-accent transition-colors"
                  >
                    Demo en vivo
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </article>
        </motion.div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {rest.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
          >
            <article className={`group border border-border hover:border-accent transition-colors duration-300 ${project.wip ? "opacity-60" : ""}`}>
              <div className="relative h-56 overflow-hidden bg-surface">
                {project.wip ? (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}08` }}
                  >
                    <div className="text-center">
                      <Clock size={32} className="mx-auto mb-3 text-text-muted" />
                      <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
                        En construcción
                      </span>
                    </div>
                  </div>
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={`Captura de ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <ProjectImagePlaceholder title={project.title} color={project.color} />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-syne font-700 text-2xl tracking-[-0.02em] text-text group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-text-muted">{project.year}</span>
                </div>
                <p className="font-mono text-xs text-text-muted leading-relaxed mb-4">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-1 mb-5">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="default">{tech}</Badge>
                  ))}
                </div>
                {!project.wip && (
                  <div className="flex gap-3">
                    <Link
                      href={`/proyectos/${project.id}`}
                      className="group/cs inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-accent border-b border-accent/40 hover:border-accent pb-px transition-all hover:gap-2"
                    >
                      Case study
                      <ArrowUpRight size={11} className="transition-transform group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5" />
                    </Link>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-text-muted hover:text-accent transition-colors"
                      >
                        Demo
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                )}
                {project.wip && (
                  <p className="font-mono text-xs text-text-muted italic">
                    Próximamente — en desarrollo
                  </p>
                )}
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProfessionalProjects({ isInView }: { isInView: boolean }) {
  const professional = projects.filter((p) => p.category === "professional");

  return (
    <div className="mt-24">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-10"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          Proyectos profesionales
        </span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {professional.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + index * 0.15 }}
          >
            {project.wip ? (
              <article
                className="border border-border opacity-50 h-64 flex items-center justify-center"
                style={{ backgroundColor: `${project.color}05` }}
              >
                <div className="text-center px-8">
                  <Clock size={28} className="mx-auto mb-3 text-text-muted" />
                  <p className="font-syne font-700 text-lg text-text-muted mb-1">
                    {project.title}
                  </p>
                  <p className="font-mono text-xs text-text-muted">{project.tagline}</p>
                </div>
              </article>
            ) : (
              <article className="group border border-border hover:border-accent transition-colors duration-300">
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-surface">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Web de ${project.title}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <ProjectImagePlaceholder title={project.title} color={project.color} />
                  )}
                  {project.clientType && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="default">{project.clientType}</Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-syne font-700 text-xl tracking-[-0.02em] text-text group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      {project.clientBio && (
                        <p className="font-mono text-xs text-text-muted mt-1 leading-relaxed">
                          {project.clientBio}
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-xs text-text-muted shrink-0">{project.year}</span>
                  </div>

                  {/* Before / After */}
                  {(project.problem || project.solution) && (
                    <div className="grid grid-cols-2 gap-3 my-4">
                      {project.problem && (
                        <div className="border border-border p-3">
                          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted mb-1.5">
                            Antes
                          </p>
                          <p className="font-mono text-xs text-text-muted leading-relaxed">
                            {project.problem}
                          </p>
                        </div>
                      )}
                      {project.solution && (
                        <div className="border p-3" style={{ borderColor: `${project.color}40` }}>
                          <p
                            className="font-mono text-[9px] uppercase tracking-[0.15em] mb-1.5"
                            style={{ color: project.color }}
                          >
                            Después
                          </p>
                          <p className="font-mono text-xs text-text-muted leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Stack + CTA */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-1">
                      {project.stack.map((tech) => (
                        <Badge key={tech} variant="default">{tech}</Badge>
                      ))}
                    </div>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-accent hover:text-accent-dim transition-colors shrink-0 ml-4"
                      >
                        Ver web
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="proyectos"
      ref={ref}
      className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-4"
      aria-label="Proyectos"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-16 border-b border-border pb-6"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent mb-3">
            01 / Proyectos
          </p>
          <h2 className="font-syne font-800 text-5xl lg:text-6xl leading-none tracking-[-0.03em] text-text">
            Trabajo
            <br />
            seleccionado
          </h2>
        </div>
        <Link
          href="/proyectos"
          className="hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-text-muted hover:text-accent transition-colors"
        >
          Ver todos
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </motion.div>

      <PersonalProjects isInView={isInView} />
      <ProfessionalProjects isInView={isInView} />
    </section>
  );
}
