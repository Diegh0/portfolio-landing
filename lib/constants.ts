export const PERSONAL = {
  name: "Diego Fuertes Moreno",
  nameShort: "Diego Fuertes",
  role: "Frontend Developer · UI/UX Designer",
  tagline: "Diseño y construyo interfaces de producto que los usuarios usan sin pensar.",
  location: "Valencia, España",
  locationExtra: "Abierto a remoto",
  available: true,
  email: "diegofuertesmo@gmail.com",
  linkedin: "https://www.linkedin.com/in/diego-fuertes-moreno-695822253",
  github: "https://github.com/Diegh0",
  cvUrl: "/cv/CV-Frontend.pdf",
  siteUrl: "https://diegofm.vercel.app",
} as const;

export const NAV_LINKS = [
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Experiencia", href: "/#experiencia" },
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export const STACK_BADGES = [
  "React",
  "Next.js",
  "Angular",
  "TypeScript",
  "Figma",
  "Firebase",
  "SASS",
  "Tailwind",
] as const;

export const IBM_CERT = {
  name: "Diseño de interfaces y experiencias de usuario (UI/UX)",
  issuer: "IBM",
  year: 2025,
  url: "https://coursera.org/verify/HXZ3X1LTCKHI",
} as const;
