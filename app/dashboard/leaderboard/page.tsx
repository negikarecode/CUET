import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Leaderboard from "@/components/dashboard/Leaderboard";
import LockedFeaturePaywall from "@/components/payments/LockedFeaturePaywall";

export const metadata: Metadata = {
  title: "All-India Trophy Leaderboard | CUET AI-Prep",
  description:
    "Real-time All-India CUET UG leaderboard tracking locked trophies, subject-wise mastery, and study streaks across Science, Commerce, and Humanities.",
};

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  let isPremium = false;

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", user.id)
        .maybeSingle();

      isPremium = Boolean(profile?.is_premium);
    }
  } catch (err) {
    console.warn("LeaderboardPage auth query notice:", err);
  }

  if (!isPremium) {
    return (
      <LockedFeaturePaywall
        featureTitle="All-India Trophy Leaderboard"
        featureSubtitle="National Ranking & Peer Benchmark"
        featureDescription="Track your live All-India Rank (AIR) against thousands of serious CUET UG aspirants across Science, Commerce, and Humanities."
        benefits={[
          "Live national rank benchmarks calculated from authentic NTA +5 / −1 mock exam scores",
          "Subject-specific domain leaderboards across all 20 subjects with stream filters",
          "Filter competitors by dream university (Delhi University, BHU, JNU) and college targets",
          "Track consistency streaks and trophy unlocks across India",
        ]}
        iconName="trophy"
      />
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          All-India CUET Trophy Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl">
          Live rankings based on locked mock exam trophies (+5 per correct, -1 per negative). Track overall rankings or toggle subject-wise domain leaderboards.
        </p>
      </div>

      <Leaderboard />
    </div>
  );
}
