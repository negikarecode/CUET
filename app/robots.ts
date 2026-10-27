import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/pricing",
          "/privacy",
          "/terms",
          "/refunds",
          "/contact",
          "/r/",
        ],
        disallow: [
          "/api/",
          "/dashboard/",
          "/test/",
          "/checkout/",
          "/auth/",
          "/verify-email",
          "/verify-otp",
          "/forgot-password",
          "/reset-password",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
