"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, Send, ArrowUpRight } from "lucide-react";
import { PERSONAL } from "@/lib/constants";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const res = await fetch("https://formspree.io/f/xdkojkgq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section
      id="contacto"
      ref={ref}
      className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-32"
      aria-label="Contacto"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 border-b border-border pb-6"
      >
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent mb-3">
          05 / Contacto
        </p>
        <h2 className="font-syne font-800 text-5xl lg:text-7xl leading-none tracking-[-0.03em] text-text max-w-3xl">
          ¿Tienes un proyecto interesante?{" "}
          <span className="text-accent">Hablemos.</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-16">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="font-mono text-sm text-text-muted mb-10 leading-relaxed max-w-lg">
            Estoy abierto a oportunidades en empresas SaaS donde pueda combinar
            diseño, código e impacto real en el producto.
          </p>

          {formState === "sent" ? (
            <div className="border border-accent p-8">
              <p className="font-syne font-700 text-2xl text-accent mb-2">
                Mensaje enviado
              </p>
              <p className="font-mono text-sm text-text-muted">
                Suelo responder en menos de 24h. Hablamos pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border border-border text-text font-mono text-sm px-4 py-3 focus:border-accent focus:outline-none transition-colors placeholder:text-text-muted/40"
                  placeholder="Tu nombre"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border border-border text-text font-mono text-sm px-4 py-3 focus:border-accent focus:outline-none transition-colors placeholder:text-text-muted/40"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full bg-transparent border border-border text-text font-mono text-sm px-4 py-3 focus:border-accent focus:outline-none transition-colors resize-none placeholder:text-text-muted/40"
                  placeholder="Cuéntame en qué puedo ayudarte..."
                />
              </div>

              {formState === "error" && (
                <p className="font-mono text-xs text-red-400">
                  Algo falló. Escríbeme directamente a{" "}
                  <a href={`mailto:${PERSONAL.email}`} className="text-accent underline">
                    {PERSONAL.email}
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={formState === "sending"}
                className="inline-flex items-center gap-2 bg-accent text-bg font-syne font-700 text-sm uppercase tracking-[0.08em] px-7 py-3.5 hover:bg-accent-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === "sending" ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar mensaje
                    <Send size={14} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Right: direct links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-6">
              O contáctame directamente
            </p>
            <div className="space-y-4">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="group flex items-center gap-3 border border-border p-4 hover:border-accent transition-colors"
              >
                <Mail size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                    Email
                  </p>
                  <p className="font-mono text-xs text-text truncate group-hover:text-accent transition-colors">
                    {PERSONAL.email}
                  </p>
                </div>
                <ArrowUpRight size={14} className="text-text-muted group-hover:text-accent transition-colors shrink-0" />
              </a>

              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border border-border p-4 hover:border-accent transition-colors"
              >
                <Linkedin size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                    LinkedIn
                  </p>
                  <p className="font-mono text-xs text-text group-hover:text-accent transition-colors">
                    Diego Fuertes Moreno
                  </p>
                </div>
                <ArrowUpRight size={14} className="text-text-muted group-hover:text-accent transition-colors shrink-0" />
              </a>

              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border border-border p-4 hover:border-accent transition-colors"
              >
                <Github size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                    GitHub
                  </p>
                  <p className="font-mono text-xs text-text group-hover:text-accent transition-colors">
                    diegofuertesmoreno
                  </p>
                </div>
                <ArrowUpRight size={14} className="text-text-muted group-hover:text-accent transition-colors shrink-0" />
              </a>
            </div>
          </div>

          <div className="border border-border p-5 bg-surface/20">
            <p className="font-mono text-xs text-text-muted leading-relaxed">
              <span className="text-accent">→</span> Suelo responder en menos
              de 24h. Si el proyecto es interesante, antes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
