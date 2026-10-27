import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  // Real, indexable, public canonical routes only.
  // Private dashboard, CBT simulator, and auth pages are excluded per technical SEO standards.
  const publicRoutes: {
    path: string;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
  }[] = [
    {
      path: "",
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      path: "/pricing",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: "/contact",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/privacy",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      path: "/terms",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      path: "/refunds",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const now = new Date();

  return publicRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
