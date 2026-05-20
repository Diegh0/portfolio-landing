"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Award, ArrowDown } from "lucide-react";
import { PERSONAL, IBM_CERT } from "@/lib/constants";

const BELIEFS = [
  "El mejor código es el que el usuario no ve. El peor diseño es el que el usuario tiene que pensar.",
  "Un buen onboarding vale más que mil features. Si la primera experiencia falla, lo demás no importa.",
  "La IA es una herramienta, no un sustituto del criterio. La uso para ampliarme, no para reemplazarme.",
  "El wireframe en Figma y el componente en producción deben ser indistinguibles. Si hay diferencia, algo falló.",
  "El código que funciona en demo pero no en producción no funciona. El diseño que se ve bien en Figma pero no en mobile no diseña.",
  "Trabajar en producto significa pensar en el usuario final aunque nadie te lo haya pedido explícamente.",
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-8"
      aria-label="Sobre Diego Fuertes"
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
            04 / Sobre mí
          </p>
          <h2 className="font-syne font-800 text-5xl lg:text-6xl leading-none tracking-[-0.03em] text-text">
            Cómo
            <br />
            pienso
          </h2>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-16">
        {/* Left: photo + quick facts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Profile photo */}
          <div className="relative w-48 h-48 lg:w-full lg:h-64 border border-border overflow-hidden bg-surface">
            <Image
              src="/profile.jpg"
              alt="Diego Fuertes Moreno"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              sizes="(max-width: 1024px) 192px, 280px"
            />
            {/* Placeholder overlay when image missing */}
            <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-bg/60 to-transparent">
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                {PERSONAL.nameShort}
              </span>
            </div>
          </div>

          {/* Quick facts */}
          <div className="space-y-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-1">
                Ubicación
              </p>
              <p className="font-mono text-xs text-text">
                {PERSONAL.location}
              </p>
              <p className="font-mono text-xs text-accent">
                {PERSONAL.locationExtra}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-1">
                Rol
              </p>
              <p className="font-mono text-xs text-text">
                {PERSONAL.role}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2">
                Certificación
              </p>
              <a
                href={IBM_CERT.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cert flex items-start gap-2 hover:text-accent transition-colors"
              >
                <Award
                  size={14}
                  className="text-amber mt-0.5 shrink-0"
                />
                <div>
                  <p className="font-mono text-[10px] text-text group-hover/cert:text-accent transition-colors leading-relaxed">
                    {IBM_CERT.name}
                  </p>
                  <p className="font-mono text-[10px] text-text-muted">
                    {IBM_CERT.issuer} · {IBM_CERT.year}
                  </p>
                </div>
                <ExternalLink size={11} className="text-text-muted mt-0.5 shrink-0" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: beliefs / philosophy */}
        <div className="space-y-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted mb-8"
          >
            Lo que creo sobre construir producto:
          </motion.p>

          {BELIEFS.map((belief, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
              className="group border-b border-border py-6 flex gap-6 hover:bg-surface/30 transition-colors -mx-4 px-4"
            >
              <span className="font-mono text-xs text-accent mt-0.5 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-mono text-sm text-text-muted leading-relaxed group-hover:text-text transition-colors">
                {belief}
              </p>
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-10"
          >
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 bg-accent text-bg font-syne font-700 text-sm uppercase tracking-[0.08em] px-6 py-3 hover:bg-accent-dim transition-colors"
            >
              Hablemos
              <ArrowDown size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
