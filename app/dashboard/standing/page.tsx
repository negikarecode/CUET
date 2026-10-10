import { Metadata } from "next";
import StandingViewClient from "@/components/dashboard/standing/StandingViewClient";

export const metadata: Metadata = {
  title: "Where Do I Stand | CUET AI-Prep",
  description:
    "Compare your CUET mock scores against previous years' official college cutoffs. Deterministic chance band predictions, dream college gap analysis, and subject requirements.",
};

export const dynamic = "force-dynamic";

export default function StandingPage() {
  return <StandingViewClient />;
}
