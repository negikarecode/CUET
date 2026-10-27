/**
 * Canonical Site Configuration for CUET AI-Prep
 * Ensures unified domain normalization, canonical URLs, and metadata across all environments.
 */

export const SITE_CONFIG = {
  name: "CUET AI-Prep",
  tagline: "NTA-Grade CBT Practice & AI Mistake Diagnosis",
  description:
    "India's practice-first test preparation platform for CUET UG entrance examination. Experience authentic NTA CBT interface, real 60-minute timers, and granular AI mistake diagnosis for Science, Commerce, and Humanities.",
  // Production URL fallback normalized to the deployed Vercel domain
  url:
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://cuetmate.vercel.app"),
  ogImage: "/images/landing/og-image.png",
  supportEmail: "support@cuetprep.com",
  officialNTAHelpdeskEmail: "cuet-ug@nta.ac.in",
  officialNTAPhone: "011-40759000",
  officialNTAPhoneAlt: "011-69227700",
  academicSession: "2026–2027",
  examTargetYear: "2026",
};

/**
 * Helper to build absolute canonical URLs from a pathname.
 */
export function getCanonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath === "/" ? "" : cleanPath}`;
}
