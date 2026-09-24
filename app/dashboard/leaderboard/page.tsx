import { Metadata } from "next";
import Leaderboard from "@/components/dashboard/Leaderboard";

export const metadata: Metadata = {
  title: "All-India Trophy Leaderboard | CUET AI-Prep",
  description:
    "Real-time All-India CUET UG leaderboard tracking locked trophies, subject-wise mastery, and study streaks across Science, Commerce, and Humanities.",
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#FAF7EE] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Page Title & Context Banner */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEF3C7] border-2 border-black rounded-full text-black text-xs font-black shadow-[2px_2px_0px_0px_#000]">
            <span>🏆 National Trophy Standings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            All-India CUET Trophy Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-medium max-w-2xl">
            Live rankings based on locked mock exam trophies (+5 per correct, -1 per negative). Track overall rankings or toggle subject-wise domain leaderboards.
          </p>
        </div>

        {/* Standalone Leaderboard Component */}
        <Leaderboard />
      </div>
    </div>
  );
}
