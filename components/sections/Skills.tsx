"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    category: "Frontend",
    description: "Lo que construyo",
    skills: [
      "React",
      "Next.js",
      "Angular",
      "NgRx",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],
    accent: "var(--accent)",
  },
  {
    category: "Diseño",
    description: "Cómo pienso",
    skills: [
      "Figma",
      "SASS",
      "Tailwind CSS",
      "Material Design",
      "Design Systems",
      "Responsive",
      "UI/UX",
    ],
    accent: "var(--amber)",
  },
  {
    category: "Backend & Infra",
    description: "Cómo lo despliego",
    skills: [
      "Firebase",
      "Spring Boot",
      "Oracle",
      "AWS",
      "Jenkins",
      "Git",
      "GitHub",
      "Scrum",
    ],
    accent: "var(--text-muted)",
  },
  {
    category: "IA & Workflow",
    description: "Cómo me amplío",
    skills: [
      "Claude",
      "Cursor",
      "ChatGPT",
      "Prompting",
      "IA-first dev",
    ],
    accent: "var(--accent)",
  },
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-8"
      aria-label="Habilidades técnicas"
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
            03 / Stack
          </p>
          <h2 className="font-syne font-800 text-5xl lg:text-6xl leading-none tracking-[-0.03em] text-text">
            Herramientas
            <br />
            con criterio
          </h2>
        </div>
      </motion.div>

      {/* Skills grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border border border-border">
        {skillGroups.map((group, groupIndex) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
            className="p-8"
          >
            {/* Category header */}
            <div className="mb-6">
              <h3
                className="font-syne font-700 text-lg mb-1"
                style={{ color: group.accent }}
              >
                {group.category}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                {group.description}
              </p>
            </div>

            {/* Skills list */}
            <ul className="space-y-2 list-none" role="list">
              {group.skills.map((skill, skillIndex) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: groupIndex * 0.1 + skillIndex * 0.05 + 0.3,
                  }}
                  className="group flex items-center gap-2"
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: group.accent }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-text-muted group-hover:text-text transition-colors">
                    {skill}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Philosophy note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-8 font-mono text-xs text-text-muted text-right"
      >
        * Sin progress bars. Las herramientas no tienen porcentajes — tienen proyectos.
      </motion.p>
    </section>
  );
}
