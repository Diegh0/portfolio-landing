"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { PERSONAL, STACK_BADGES } from "@/lib/constants";

const ROTATING_WORDS = ["interfaces", "productos", "experiencias", "sistemas"];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
      aria-label="Presentación"
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="absolute left-[16.66%] top-0 bottom-0 w-px bg-border opacity-40" />
        <div className="absolute left-[33.33%] top-0 bottom-0 w-px bg-border opacity-20" />
        <div className="absolute left-[66.66%] top-0 bottom-0 w-px bg-border opacity-20" />
        <div className="absolute left-[83.33%] top-0 bottom-0 w-px bg-border opacity-40" />
      </div>

      <motion.div
        style={{ y: titleY, opacity }}
        className="max-w-7xl mx-auto px-6 lg:px-12 w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="py-20 lg:py-28 grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_560px] gap-12 lg:gap-8 items-center"
        >
          {/* ── LEFT: text content ── */}
          <div>
            {/* Available label */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-8"
            >
              <span
                className="w-2 h-2 rounded-full bg-accent animate-blink"
                aria-hidden="true"
              />
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
                Disponible para trabajar ·{" "}
                <span className="text-text">{PERSONAL.location}</span>
              </span>
            </motion.div>

            {/* Big editorial headline */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="font-syne font-800 leading-[0.92] tracking-[-0.03em]">
                <span className="block text-[clamp(2.8rem,7vw,7.5rem)] text-text-muted">
                  {PERSONAL.nameShort.split(" ")[0]}
                </span>
                <span className="block text-[clamp(2.8rem,7vw,7.5rem)] text-text">
                  {PERSONAL.nameShort.split(" ")[1]}
                </span>
                <span className="block text-[clamp(2.8rem,7vw,7.5rem)] overflow-hidden">
                  <span className="text-accent inline-block">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1] as [
                          number,
                          number,
                          number,
                          number,
                        ],
                      }}
                      className="block"
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Role & tagline */}
            <motion.div variants={itemVariants} className="mb-10 ml-1">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent mb-4">
                {PERSONAL.role}
              </p>
              <p className="font-mono text-sm text-text-muted leading-relaxed max-w-md">
                &ldquo;{PERSONAL.tagline}&rdquo;
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link
                href="/#proyectos"
                className="inline-flex items-center gap-2 bg-accent text-bg font-syne font-700 text-sm uppercase tracking-[0.08em] px-6 py-3 hover:bg-accent-dim transition-colors"
              >
                Ver proyectos
                <ArrowDown size={14} aria-hidden="true" />
              </Link>
              <a
                href={PERSONAL.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border text-text font-syne font-600 text-sm uppercase tracking-[0.08em] px-6 py-3 hover:border-accent hover:text-accent transition-colors"
              >
                <Download size={14} aria-hidden="true" />
                Descargar CV
              </a>
            </motion.div>

            {/* Stack badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {STACK_BADGES.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.8 + i * 0.07,
                    duration: 0.4,
                    ease: "backOut",
                  }}
                >
                  <Badge variant="default">{tech}</Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Spline 3D scene ── */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block h-[500px] xl:h-[580px] border border-border/60 overflow-hidden"
            style={{ background: "var(--surface)", clipPath: "inset(0)" }}
          >
            {/* Spotlight hover effect */}
            <Spotlight size={400} />

            {/* Subtle corner label */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
                Interactive
              </span>
            </div>

            {/* Spline scene */}
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />

            {/* Bottom gradient fade to blend with bg */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, var(--surface) 0%, transparent 100%)",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}
