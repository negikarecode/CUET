import { Metadata } from "next";
import PricingView from "@/components/payments/PricingView";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Pricing & Plans | CUET AI-Prep",
  description:
    "Upgrade to CUET AI-Prep Ranker Pass. Unlimited 50-question NTA mock exams, where do I stand college cutoff predictor, subject weakness radar, and NCERT mistake decrypter.",
  alternates: {
    canonical: getCanonicalUrl("/pricing"),
  },
  openGraph: {
    title: "Pricing & Plans | CUET AI-Prep",
    description:
      "Upgrade to CUET AI-Prep Ranker Pass. Authentic NTA-grade CBT mock exams, real-time college cutoff predictor, and AI mistake diagnosis.",
    url: getCanonicalUrl("/pricing"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Plans | CUET AI-Prep",
    description: "Affordable, high-yield CUET UG practice plans with AI mistake diagnosis.",
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Breadcrumbs items={[{ label: "Pricing & Plans" }]} />
      </div>
      <PricingView />
    </div>
  );
}
