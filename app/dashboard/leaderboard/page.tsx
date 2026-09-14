import { Metadata } from "next";
import Leaderboard from "@/components/dashboard/Leaderboard";

export const metadata: Metadata = {
  title: "All-India Weekly Leaderboard | CUET AI-Prep",
  description:
    "Real-time All-India CUET UG weekly leaderboard tracking rank percentiles, mock accuracy, study streaks, and XP points across Science, Commerce, and Humanities.",
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#FAF7EE] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Page Title & Context Banner */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEF3C7] border-2 border-black rounded-full text-black text-xs font-black shadow-[2px_2px_0px_0px_#000]">
            <span>National Percentile Standings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            All-India Weekly Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-medium max-w-2xl">
            Live rankings calibrated against 2024 cutoff benchmarks for North Campus flagships (SRCC, St. Stephen&apos;s, Hindu, LSR).
          </p>
        </div>

        {/* Standalone Leaderboard Component */}
        <Leaderboard />
      </div>
    </div>
  );
}
