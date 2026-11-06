import React, { Suspense } from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PricingSection from "@/components/payments/PricingSection";
import { getCanonicalUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Upgrade to Gold Pass | CUET AI-Prep",
  description:
    "Upgrade to CUET AI-Prep Gold Pass. Unlimited full-length NTA mock exams, all 251+ past shift papers, and granular AI mistake debriefs.",
  alternates: {
    canonical: getCanonicalUrl("/dashboard/upgrade"),
  },
};

export default function DashboardUpgradePage() {
  return (
    <div className="w-full min-h-[calc(100vh-56px)] bg-slate-50/50 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Upgrade" },
            ]}
          />
        </div>
        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-white rounded-3xl" />}>
          <PricingSection isDashboard={true} />
        </Suspense>
      </div>
    </div>
  );
}
