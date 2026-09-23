"use client";

import React, { useState } from "react";
import {
  Trophy,
  Flame,
  GraduationCap,
} from "lucide-react";
import { StreamType, LeaderboardEntry } from "@/types";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";

// Seeded Leaderboard Data across Science, Commerce, Humanities
const LEADERBOARD_DATABASE: Record<StreamType, LeaderboardEntry[]> = {
  science: [
    { rank: 1, userId: "u_sci_01", name: "Ishanvi Varma", stream: "science", targetCollege: "St. Stephen's College", streak: 21, accuracyPercentage: 96, totalXp: 4890 },
    { rank: 2, userId: "u_sci_02", name: "Devansh Patel", stream: "science", targetCollege: "Hindu College", streak: 18, accuracyPercentage: 94, totalXp: 4420 },
    { rank: 3, userId: "u_sci_03", name: "Ananya Iyer", stream: "science", targetCollege: "Miranda House", streak: 15, accuracyPercentage: 92, totalXp: 3980 },
    { rank: 4, userId: "u_sci_04", name: "Rohan Kulkarni", stream: "science", targetCollege: "Hansraj College", streak: 14, accuracyPercentage: 91, totalXp: 3650 },
    { rank: 5, userId: "u_sci_05", name: "Meera Nair", stream: "science", targetCollege: "St. Stephen's College", streak: 12, accuracyPercentage: 89, totalXp: 3340 },
    { rank: 6, userId: "u_sci_06", name: "Kabir Sengupta", stream: "science", targetCollege: "Ramjas College", streak: 11, accuracyPercentage: 88, totalXp: 3100 },
    { rank: 7, userId: "u_sci_07", name: "Pooja Hegde", stream: "science", targetCollege: "Sri Venkateswara", streak: 9, accuracyPercentage: 87, totalXp: 2950 },
    { rank: 8, userId: "u_sci_08", name: "Tanmay Bansal", stream: "science", targetCollege: "Kirori Mal College", streak: 8, accuracyPercentage: 86, totalXp: 2820 },
    { rank: 9, userId: "u_sci_09", name: "Shreya Joshi", stream: "science", targetCollege: "Gargi College", streak: 7, accuracyPercentage: 84, totalXp: 2650 },
    { rank: 10, userId: "u_sci_10", name: "Aditya Chopra", stream: "science", targetCollege: "Atma Ram Sanatan", streak: 6, accuracyPercentage: 83, totalXp: 2510 },
  ],
  commerce: [
    { rank: 1, userId: "u_com_01", name: "Siddharth Goel", stream: "commerce", targetCollege: "SRCC", streak: 25, accuracyPercentage: 98, totalXp: 5450 },
    { rank: 2, userId: "u_com_02", name: "Rhea Singhania", stream: "commerce", targetCollege: "Lady Shri Ram (LSR)", streak: 20, accuracyPercentage: 95, totalXp: 4670 },
    { rank: 3, userId: "u_com_03", name: "Pranav Maheshwari", stream: "commerce", targetCollege: "SRCC", streak: 19, accuracyPercentage: 93, totalXp: 4210 },
    { rank: 4, userId: "u_com_04", name: "Kritika Mittal", stream: "commerce", targetCollege: "Hindu College", streak: 16, accuracyPercentage: 91, totalXp: 3780 },
    { rank: 5, userId: "u_com_05", name: "Varun Bajaj", stream: "commerce", targetCollege: "Hansraj College", streak: 13, accuracyPercentage: 89, totalXp: 3410 },
    { rank: 6, userId: "u_com_06", name: "Tanya Aggarwal", stream: "commerce", targetCollege: "Sri Venkateswara", streak: 12, accuracyPercentage: 88, totalXp: 3190 },
    { rank: 7, userId: "u_com_07", name: "Nikhil Chawla", stream: "commerce", targetCollege: "Delhi College of Arts & Comm", streak: 10, accuracyPercentage: 86, totalXp: 2980 },
    { rank: 8, userId: "u_com_08", name: "Sanya Arora", stream: "commerce", targetCollege: "Jesus and Mary (JMC)", streak: 9, accuracyPercentage: 85, totalXp: 2840 },
    { rank: 9, userId: "u_com_09", name: "Harshvardhan Jain", stream: "commerce", targetCollege: "Ramjas College", streak: 7, accuracyPercentage: 83, totalXp: 2620 },
    { rank: 10, userId: "u_com_10", name: "Divya Kapoor", stream: "commerce", targetCollege: "IP College for Women", streak: 6, accuracyPercentage: 82, totalXp: 2490 },
  ],
  humanities: [
    { rank: 1, userId: "u_hum_01", name: "Tarini Roy", stream: "humanities", targetCollege: "St. Stephen's College", streak: 22, accuracyPercentage: 97, totalXp: 5120 },
    { rank: 2, userId: "u_hum_02", name: "Shaurya Dixit", stream: "humanities", targetCollege: "Hindu College", streak: 20, accuracyPercentage: 95, totalXp: 4720 },
    { rank: 3, userId: "u_hum_03", name: "Lavanya Sen", stream: "humanities", targetCollege: "Lady Shri Ram (LSR)", streak: 17, accuracyPercentage: 93, totalXp: 4150 },
    { rank: 4, userId: "u_hum_04", name: "Arjun Bhatia", stream: "humanities", targetCollege: "Miranda House", streak: 15, accuracyPercentage: 90, totalXp: 3690 },
    { rank: 5, userId: "u_hum_05", name: "Zoya Farooqui", stream: "humanities", targetCollege: "St. Stephen's College", streak: 13, accuracyPercentage: 89, totalXp: 3380 },
    { rank: 6, userId: "u_hum_06", name: "Advait Sharma", stream: "humanities", targetCollege: "Ramjas College", streak: 11, accuracyPercentage: 87, totalXp: 3120 },
    { rank: 7, userId: "u_hum_07", name: "Kavya Menon", stream: "humanities", targetCollege: "Gargi College", streak: 9, accuracyPercentage: 86, totalXp: 2910 },
    { rank: 8, userId: "u_hum_08", name: "Dhruv Saxena", stream: "humanities", targetCollege: "Kirori Mal College", streak: 8, accuracyPercentage: 84, totalXp: 2780 },
    { rank: 9, userId: "u_hum_09", name: "Pallavi Das", stream: "humanities", targetCollege: "Kamala Nehru College", streak: 7, accuracyPercentage: 83, totalXp: 2610 },
    { rank: 10, userId: "u_hum_10", name: "Manan Verma", stream: "humanities", targetCollege: "Shaheed Bhagat Singh", streak: 5, accuracyPercentage: 81, totalXp: 2430 },
  ],
};

export default function Leaderboard() {
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const selectedStream = useTestStore((state) => state.selectedStream);
  const [activeStream, setActiveStream] = useState<StreamType>(selectedStream);

  const entries = LEADERBOARD_DATABASE[activeStream] || LEADERBOARD_DATABASE.science;

  // Current logged in user status in this stream
  const clientAnalytics = useTestStore((state) => state.analytics);
  const userXp = isClient && user.xpPoints ? user.xpPoints : 0;
  const userStreak = isClient && user.dailyStreak ? user.dailyStreak : 0;
  const userAccuracy =
    isClient && user.accuracyPercentage
      ? user.accuracyPercentage
      : isClient && clientAnalytics.overallAccuracyPercentage > 0
      ? clientAnalytics.overallAccuracyPercentage
      : 0;
  const userName = isClient && user.name ? user.name : "You";

  const currentUserEntry: LeaderboardEntry = {
    rank: userXp > 0 ? Math.max(11, 80 - Math.floor(userXp / 100)) : 0,
    userId: user.id || "guest",
    name: userName,
    stream: activeStream,
    targetCollege: user.targetCollege || "Central University",
    streak: userStreak,
    accuracyPercentage: userAccuracy,
    totalXp: userXp,
    isCurrentUser: true,
  };

  // Check if current user is within top 10
  const isUserInTop10 = entries.some((e) => e.userId === user.id);

  return (
    <section className="bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[5px_5px_0px_0px_#000] p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#FEF3C7] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] shrink-0">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-black tracking-tight">
                All-India CUET Weekly Leaderboard
              </h2>
              <span className="bg-[#FEF3C7] text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase font-mono border border-black shadow-[1px_1px_0px_0px_#000]">
                Live NTA Percentile
              </span>
            </div>
            <p className="text-xs text-black/70 font-semibold mt-0.5">
              Rankings updated live based on official mock tests solved, accuracy, and practice streaks.
            </p>
          </div>
        </div>

        {/* Segmented Control to filter by stream */}
        <div className="grid grid-cols-3 sm:flex p-1 bg-[#FAF7EE] rounded-lg border-2 border-black text-xs font-black shadow-[2px_2px_0px_0px_#000] w-full sm:w-auto">
          {(["science", "commerce", "humanities"] as StreamType[]).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setActiveStream(st)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-md transition-all capitalize border text-center ${
                activeStream === st
                  ? "bg-black text-white border-black shadow-[1px_1px_0px_0px_#000] font-black"
                  : "border-transparent text-black hover:bg-black/5"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="mt-6 overflow-x-auto w-full max-w-full">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b-2 border-black text-black uppercase tracking-wider font-black text-[10px] sm:text-[11px] pb-3">
              <th className="py-2.5 sm:py-3 px-2 sm:px-3 w-10 sm:w-16">Rank</th>
              <th className="py-2.5 sm:py-3 px-2 sm:px-4">Student Aspirant</th>
              <th className="py-2.5 sm:py-3 px-2 sm:px-4 text-center hidden sm:table-cell">Daily Streak</th>
              <th className="py-2.5 sm:py-3 px-2 sm:px-4 text-center hidden md:table-cell">Accuracy %</th>
              <th className="py-2.5 sm:py-3 px-2 sm:px-4 text-right">Total XP</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black/10">
            {entries.map((entry) => {
              const isTop3 = entry.rank <= 3;
              let rankBadge = (
                <span className="font-mono font-black text-black w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#FAF7EE] border border-black flex items-center justify-center text-[11px] sm:text-xs shadow-[1px_1px_0px_0px_#000]">
                  #{entry.rank}
                </span>
              );

              if (entry.rank === 1) {
                rankBadge = (
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#FEF3C7] text-black border border-black font-mono font-black text-[11px] sm:text-xs flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
                    #1
                  </span>
                );
              } else if (entry.rank === 2) {
                rankBadge = (
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-white text-black border border-black font-mono font-black text-[11px] sm:text-xs flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
                    #2
                  </span>
                );
              } else if (entry.rank === 3) {
                rankBadge = (
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#FAF7EE] text-black border border-black font-mono font-black text-[11px] sm:text-xs flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
                    #3
                  </span>
                );
              }

              return (
                <tr
                  key={entry.userId}
                  className={`hover:bg-[#FAF7EE] transition-colors ${
                    isTop3 ? "bg-[#FEF3C7]/20" : ""
                  }`}
                >
                  {/* Rank */}
                  <td className="py-2.5 sm:py-3.5 px-2 sm:px-3">{rankBadge}</td>

                  {/* Student Info */}
                  <td className="py-2.5 sm:py-3.5 px-2 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-black text-black flex items-center justify-center font-black text-[10px] sm:text-xs uppercase shadow-[1px_1px_0px_0px_#000] shrink-0">
                        {entry.name.slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-black text-xs sm:text-sm truncate">
                          {entry.name}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-black/70 flex items-center gap-1 font-semibold truncate">
                          <GraduationCap className="w-3 h-3 text-black shrink-0" />
                          <span className="truncate">{entry.targetCollege}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Daily Streak */}
                  <td className="py-2.5 sm:py-3.5 px-2 sm:px-4 text-center hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1 font-black text-black font-mono bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-black text-xs shadow-[1px_1px_0px_0px_#000]">
                      <Flame className="w-3.5 h-3.5 fill-[#F59E0B] text-[#D97706]" />
                      {entry.streak}d
                    </span>
                  </td>

                  {/* Accuracy */}
                  <td className="py-2.5 sm:py-3.5 px-2 sm:px-4 text-center hidden md:table-cell">
                    <span className="font-mono font-black text-black bg-[#D1FAE5] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                      {entry.accuracyPercentage}%
                    </span>
                  </td>

                  {/* Total XP */}
                  <td className="py-2.5 sm:py-3.5 px-2 sm:px-4 text-right">
                    <span className="font-mono font-black text-black text-xs sm:text-sm whitespace-nowrap">
                      {entry.totalXp.toLocaleString()} XP
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pinned Current User Row if outside Top 10 */}
      {!isUserInTop10 && (
        <div className="mt-6 pt-4 border-t-2 border-dashed border-black">
          <div className="text-[11px] font-black text-black/70 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Your Current Standing</span>
            <span className="text-black font-bold">
              {currentUserEntry.totalXp > 0
                ? "Solve more mocks to break into Top 10"
                : "Complete your first mock to establish your live rank"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7EE] border-2 border-black text-black flex flex-wrap items-center justify-between gap-4 shadow-[4px_4px_0px_0px_#000]">
            <div className="flex items-center gap-4">
              <span className="font-mono font-black text-black bg-[#FEF3C7] px-3 py-1.5 rounded-lg border-2 border-black text-sm shadow-[1px_1px_0px_0px_#000]">
                {currentUserEntry.rank > 0 ? `#${currentUserEntry.rank}` : "#--"}
              </span>
              <div>
                <p className="font-black text-sm flex items-center gap-2 text-black">
                  <span>{currentUserEntry.name} (You)</span>
                  <span className="bg-[#D1FAE5] text-black text-[10px] px-2 py-0.2 rounded-full font-black uppercase border border-black shadow-[1px_1px_0px_0px_#000]">
                    {currentUserEntry.totalXp > 0 ? "Active" : "New Aspirant"}
                  </span>
                </p>
                <p className="text-xs text-black/70 font-semibold mt-0.5">
                  Target: {currentUserEntry.targetCollege}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div className="text-center">
                <p className="text-[10px] text-black/60 uppercase font-black">Streak</p>
                <p className="font-mono font-black text-black text-sm flex items-center gap-1 justify-center">
                  <Flame className="w-3.5 h-3.5 fill-[#F59E0B] text-[#D97706]" />
                  {currentUserEntry.streak}d
                </p>
              </div>

              <div className="text-center">
                <p className="text-[10px] text-black/60 uppercase font-black">Accuracy</p>
                <p className="font-mono font-black text-black text-sm">
                  {currentUserEntry.accuracyPercentage > 0
                    ? `${currentUserEntry.accuracyPercentage}%`
                    : "--"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-black/60 uppercase font-black">Total XP</p>
                <p className="font-mono font-black text-black text-base">
                  {currentUserEntry.totalXp.toLocaleString()} XP
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
