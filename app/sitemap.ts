import type { MetadataRoute } from "next";
import { PERSONAL } from "@/lib/constants";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = PERSONAL.siteUrl;

  const projectRoutes = projects
    .filter((p) => !p.wip)
    .map((p) => ({
      url: `${base}/proyectos/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/proyectos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projectRoutes,
  ];
}
