import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Todos los proyectos de Diego Fuertes — aplicaciones web y case studies de diseño y desarrollo frontend.",
};

export default function ProyectosPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="border-b border-border pb-10 mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent mb-4">
              Proyectos
            </p>
            <h1 className="font-syne font-800 text-6xl lg:text-8xl tracking-[-0.04em] leading-none text-text">
              Todo
              <br />
              el trabajo
            </h1>
          </div>

          <div className="space-y-0">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={`group border-b border-border ${project.wip ? "opacity-50" : ""}`}
              >
                <div className="grid lg:grid-cols-[80px_1fr_280px_200px] gap-6 lg:gap-10 items-center py-8 hover:bg-surface/30 transition-colors -mx-2 px-2">
                  <span className="font-mono text-xs text-text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h2 className="font-syne font-700 text-2xl lg:text-3xl tracking-[-0.02em] text-text group-hover:text-accent transition-colors mb-1">
                      {project.title}
                    </h2>
                    <p className="font-mono text-xs text-text-muted">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-text-muted">
                      {project.year}
                    </span>
                    {!project.wip && (
                      <Link
                        href={`/proyectos/${project.id}`}
                        className="ml-auto flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-text-muted hover:text-accent transition-colors"
                      >
                        Case study
                        <ArrowUpRight size={12} />
                      </Link>
                    )}
                    {project.wip && (
                      <span className="ml-auto font-mono text-xs text-text-muted italic">
                        Próximamente
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
