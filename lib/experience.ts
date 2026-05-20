export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  highlights: { metric: string; description: string }[];
  stack: string[];
  certifications?: { name: string; issuer: string; year: number; url: string }[];
  isCurrent?: boolean;
  description?: string;
  process?: { icon: string; title: string; detail: string }[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Freelance",
    role: "Frontend Designer & Developer",
    period: "2025 – Presente",
    duration: "En curso",
    location: "Valencia, España",
    isCurrent: true,
    description:
      "Diseño y construyo landings de alto impacto para profesionales, negocios y autónomos que quieren una presencia digital a la altura de su trabajo. Cada proyecto parte de cero: sin plantillas, sin atajos, sin genérico.",
    process: [
      {
        icon: "01",
        title: "Análisis de negocio",
        detail:
          "Antes de abrir un editor, entiendo la esencia del cliente, su mercado y lo que le diferencia. El diseño tiene que reflejar la personalidad real del negocio — no un patrón de industria.",
      },
      {
        icon: "02",
        title: "Branding con Figma + MCP",
        detail:
          "Conexión directa entre diseño y código mediante MCP de Figma. Construyo sistemas visuales coherentes — paleta, tipografía, componentes — que pasan de mockup a producción sin fricciones.",
      },
      {
        icon: "03",
        title: "Identidad visual con IA",
        detail:
          "Logotipos y assets dinámicos con Nano Banana. Prompts de marca elaborados con ChatGPT para coherencia visual total. La IA como herramienta estratégica, no como atajo.",
      },
      {
        icon: "04",
        title: "Desarrollo con Claude AI",
        detail:
          "Uso avanzado de Claude como copiloto de arquitectura y desarrollo. Flujos que multiplican la velocidad de entrega sin sacrificar calidad ni criterio técnico.",
      },
    ],
    highlights: [],
    stack: [
      "Claude AI",
      "Figma MCP",
      "ChatGPT",
      "Nano Banana",
      "Next.js",
      "Tailwind",
      "Vercel",
    ],
  },
  {
    company: "Adding Technology S.A.",
    role: "Frontend Developer & UI/UX Designer",
    period: "mar. 2024 – abr. 2026",
    duration: "2 años 2 meses",
    location: "Valencia, España",
    highlights: [
      {
        metric: "+25",
        description:
          "Despliegues coordinados con Jenkins entre integración, preproducción y producción — sin rollbacks",
      },
      {
        metric: "100%",
        description:
          "Migración completa de aplicación empresarial legacy: PL/SQL + Java → Angular + NgRx + Spring Boot",
      },
      {
        metric: "48h",
        description:
          "Tiempo de entrega de landing pages para clientes usando flujo IA-first (Claude + Cursor + ChatGPT)",
      },
      {
        metric: "Figma→Prod",
        description:
          "Rediseño de pantallas críticas: de wireframe en Figma a componente Angular en producción sin pérdida de coherencia visual",
      },
    ],
    stack: [
      "Angular",
      "NgRx",
      "TypeScript",
      "SASS",
      "Spring Boot",
      "Oracle",
      "Jenkins",
      "GitHub",
      "Scrum",
    ],
    certifications: [
      {
        name: "Diseño de interfaces y experiencias de usuario (UI/UX)",
        issuer: "IBM",
        year: 2025,
        url: "https://coursera.org/verify/HXZ3X1LTCKHI",
      },
    ],
  },
];
