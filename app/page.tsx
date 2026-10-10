import type { Metadata } from "next";
import LandingPageClient from "@/components/landing/LandingPageClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://cuet-prep.in"),
  title: "CUET AI-Prep | Timed Mock Tests & College Cutoff Standings",
  description:
    "Practice for CUET UG with timed CBT-style mock tests, mistake explanations, and official previous years' college cutoff standings.",
  keywords: [
    "CUET UG Mock Tests",
    "CUET College Cutoffs",
    "CUET Previous Year Papers",
    "Delhi University Cutoffs",
    "CUET CBT Practice",
    "CUET AI-Prep",
  ],
  authors: [{ name: "CUET AI-Prep Academic Team" }],
  openGraph: {
    title: "CUET AI-Prep | Timed Mock Tests & College Cutoff Standings",
    description:
      "Practice for CUET UG with timed CBT-style mock tests, mistake explanations, and official previous years' college cutoff standings.",
    url: "https://cuet-prep.in",
    siteName: "CUET AI-Prep",
    images: [
      {
        url: "/images/landing/og-image.png",
        width: 1200,
        height: 630,
        alt: "CUET AI-Prep - Mock Tests and College Cutoff Standings",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CUET AI-Prep | Timed Mock Tests & College Cutoff Standings",
    description:
      "Practice for CUET UG with timed CBT-style mock tests, mistake explanations, and official previous years' college cutoff standings.",
    images: ["/images/landing/og-image.png"],
  },
  alternates: {
    canonical: "https://cuet-prep.in",
  },
};

export default function HomePage() {
  return <LandingPageClient />;
}
