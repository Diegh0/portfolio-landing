import type { MetadataRoute } from "next";
import { PERSONAL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PERSONAL.siteUrl}/sitemap.xml`,
  };
}
