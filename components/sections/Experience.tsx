"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Award, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { experience } from "@/lib/experience";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [current, ...past] = experience;

  return (
    <section
      id="experiencia"
      ref={ref}
      className="max-w-7xl mx-auto px-6 lg:px-12 pt-4 pb-8"
      aria-label="Experiencia profesional"
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
            02 / Experiencia
          </p>
          <h2 className="font-syne font-800 text-5xl lg:text-6xl leading-none tracking-[-0.03em] text-text">
            Trabajo
            <br />
            real
          </h2>
        </div>
      </motion.div>

      {/* ── Current: Freelance ── */}
      {current.isCurrent && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-6 border border-accent/30 bg-accent/[0.03] relative overflow-hidden"
        >
          {/* Accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

          {/* Header */}
          <div className="p-8 lg:p-10 border-b border-accent/20 flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 px-2.5 py-1">
                  <Zap size={9} className="animate-pulse" />
                  En curso
                </span>
              </div>
              <h3 className="font-syne font-800 text-2xl lg:text-3xl tracking-[-0.02em] text-text mb-2">
                {current.company}
              </h3>
              <p className="font-mono text-sm text-accent mb-1">{current.role}</p>
              <p className="font-mono text-xs text-text-muted">
                {current.period} · {current.location}
              </p>
            </div>
          </div>

          {/* Description */}
          {current.description && (
            <div className="px-8 lg:px-10 pt-8 pb-6 border-b border-accent/20">
              <p className="font-mono text-sm text-text-muted leading-relaxed max-w-2xl">
                {current.description}
              </p>
            </div>
          )}

          {/* Process steps */}
          {current.process && current.process.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-accent/15 border-b border-accent/20">
              {current.process.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                  className="p-6 lg:p-8 group"
                >
                  <span className="font-mono text-[10px] text-accent/60 tracking-[0.2em] mb-3 block">
                    {step.icon}
                  </span>
                  <p className="font-syne font-700 text-sm text-text mb-2 group-hover:text-accent transition-colors">
                    {step.title}
                  </p>
                  <p className="font-mono text-[11px] text-text-muted leading-relaxed">
                    {step.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Stack */}
          <div className="p-8 lg:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-4">
              Herramientas
            </p>
            <div className="flex flex-wrap gap-2">
              {current.stack.map((tech) => (
                <Badge key={tech} variant="accent">{tech}</Badge>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Past: Adding Technology ── */}
      {past.map((exp, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 + idx * 0.1 }}
          className="border border-border"
        >
          {/* Header */}
          <div className="p-8 lg:p-10 border-b border-border flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div>
              <h3 className="font-syne font-800 text-2xl lg:text-3xl tracking-[-0.02em] text-text mb-2">
                {exp.company}
              </h3>
              <p className="font-mono text-sm text-accent mb-1">{exp.role}</p>
              <p className="font-mono text-xs text-text-muted">
                {exp.period} · {exp.duration} · {exp.location}
              </p>
            </div>
          </div>

          {/* Highlights */}
          {exp.highlights.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {exp.highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="p-6 lg:p-8 border-b border-border group"
                >
                  <div className="font-syne font-800 text-3xl lg:text-4xl text-accent mb-3 group-hover:scale-105 transition-transform origin-left">
                    {item.metric}
                  </div>
                  <p className="font-mono text-xs text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Stack */}
          <div className="p-8 lg:p-10 border-t border-border">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-4">
              Stack utilizado
            </p>
            <div className="flex flex-wrap gap-2">
              {exp.stack.map((tech) => (
                <Badge key={tech} variant="default">{tech}</Badge>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {exp.certifications && exp.certifications.length > 0 && (
            <div className="p-8 lg:p-10 border-t border-border bg-surface/30">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-5">
                Certificaciones
              </p>
              {exp.certifications.map((cert) => (
                <a
                  key={cert.url}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cert flex items-start gap-4 hover:text-accent transition-colors"
                >
                  <div className="mt-0.5 text-accent">
                    <Award size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-syne font-600 text-base text-text group-hover/cert:text-accent transition-colors">
                      {cert.name}
                    </p>
                    <p className="font-mono text-xs text-text-muted mt-1">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-text-muted group-hover/cert:text-accent transition-colors mt-1 shrink-0"
                  />
                </a>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </section>
  );
}
