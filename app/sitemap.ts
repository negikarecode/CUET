import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://cuet-prep.in";

  const routes = [
    "",
    "/pricing",
    "/dashboard/mocks",
    "/dashboard/practice",
    "/dashboard/pyqs",
    "/dashboard/standing",
    "/dashboard/notes",
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : 0.8,
  }));
}
