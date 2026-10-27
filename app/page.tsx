import type { Metadata } from "next";
import LandingPageClient from "@/components/landing/LandingPageClient";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: "CUET AI-Prep | Timed Mock Tests & College Cutoff Standings",
  description:
    "Practice for CUET UG with timed CBT-style mock tests, mistake explanations, and official previous years' college cutoff standings.",
  keywords: [
    "CUET UG 2026 Mock Tests",
    "CUET College Cutoffs",
    "CUET Previous Year Papers",
    "Delhi University Cutoffs",
    "CUET CBT Practice",
    "CUET AI-Prep",
    "NTA CBT Simulator",
  ],
  authors: [{ name: "CUET AI-Prep Academic Team" }],
  openGraph: {
    title: "CUET AI-Prep | Timed Mock Tests & College Cutoff Standings",
    description:
      "Practice for CUET UG with timed CBT-style mock tests, mistake explanations, and official previous years' college cutoff standings.",
    url: SITE_CONFIG.url,
    siteName: "CUET AI-Prep",
    images: [
      {
        url: SITE_CONFIG.ogImage,
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
    images: [SITE_CONFIG.ogImage],
  },
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  other: {
    "strix-verification": "strix-verify-325cf40f42b8e96a8bad6c7e99ea5e67",
  },
};

export default function HomePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "CUET AI-Prep",
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_CONFIG.url}/dashboard/mocks?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "CUET AI-Prep",
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/icon.svg`,
      description:
        "Practice-first test preparation platform for CUET UG entrance examination with authentic NTA CBT interface and AI mistake diagnosis.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-11-40759000",
        contactType: "customer support",
        email: SITE_CONFIG.supportEmail,
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Are these mock tests strictly based on the latest NTA CUET 2026 pattern?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Every single mock test and practice paper strictly follows the latest official NTA Information Bulletin. This includes 50 compulsory questions per domain subject with zero internal choice and rationalized Class 12 NCERT curriculum alignment.",
          },
        },
        {
          "@type": "Question",
          name: "How does the official CUET marking scheme calculate my score?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You earn +5 marks for every correct response and receive a -1 mark penalty for each incorrect answer (-0.25 penalty ratio). Unattempted questions receive 0 marks with zero penalty. Our platform calculates this automatically with forensic scorecards.",
          },
        },
        {
          "@type": "Question",
          name: "Can I practice tests on mobile phones and tablets?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. The CBT simulator, chapter drills, and performance analytics are fully responsive and work seamlessly across all smartphones, tablets, laptops, and desktops with zero app installation required.",
          },
        },
        {
          "@type": "Question",
          name: "Is the Free plan genuinely free with zero credit card required?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can start immediately with diagnostic mock tests, chapter practice questions, NCERT explanations, and syllabus explorers with zero credit card or payment commitment.",
          },
        },
        {
          "@type": "Question",
          name: "How do I choose the right domain subjects for Delhi University (DU)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "University of Delhi requires candidates to appear in CUET in subjects they studied and passed in their Class 12 board examinations. Most honors courses require 1 Language + 3 Domain subjects (e.g. B.Com Hons requires English + Accounts/Maths + any two other domains).",
          },
        },
        {
          "@type": "Question",
          name: "Are the 251 Previous Year Papers (PYQs) official shift papers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our PYQ vault includes all authentic shift-wise question papers from CUET 2022, 2023, 2024, and 2025 across Science, Commerce, Humanities, and General Test streams, verified with authoritative NTA answer keys.",
          },
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingPageClient />
    </>
  );
}
