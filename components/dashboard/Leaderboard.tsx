"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Trophy,
  Flame,
  GraduationCap,
  RefreshCw,
  Lock,
  Award,
  Sparkles,
  BookOpen,
  Filter,
} from "lucide-react";
import { StreamType, LeaderboardEntry } from "@/types";
import { useTestStore } from "@/lib/store/useTestStore";

type ViewMode = "overall" | "subject";
type StreamFilter = "all" | StreamType;

const DEFAULT_SUBJECTS = [
  "Physics",
  "Chemistry",
  "Mathematics",
  "Accountancy",
  "Economics",
  "Business Studies",
  "History",
  "Political Science",
  "Biology",
  "Computer Science",
  "English",
  "General Test",
];

interface RawLeaderboardUser {
  userId: string;
  name: string;
  stream: StreamType;
  targetCollege: string;
  targetUniversity?: string;
  streak: number;
  accuracyPercentage: number;
  totalXp: number;
  totalTrophies: number;
  subjectTrophies?: Record<string, number>;
  completedTestsCount?: number;
  selectedSubjects?: string[];
  isCurrentUser?: boolean;
}

export default function Leaderboard() {
  const currentUser = useTestStore((state) => state.user);
  const clientAttempts = useTestStore((state) => state.testAttempts);

  // Leaderboard filters
  const [viewMode, setViewMode] = useState<ViewMode>("overall");
  const [selectedSubject, setSelectedSubject] = useState<string>("Physics");
  const [activeStreamFilter, setActiveStreamFilter] = useState<StreamFilter>("all");

  // Data fetching state
  const [serverUsers, setServerUsers] = useState<RawLeaderboardUser[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>(DEFAULT_SUBJECTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch real users and test trophy calculations from Supabase backend
  const fetchLeaderboardData = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);
    try {
      const res = await fetch("/api/leaderboard", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load leaderboard");
      const data = await res.json();
      if (data && data.success && Array.isArray(data.users)) {
        setServerUsers(data.users);
        if (Array.isArray(data.availableSubjects) && data.availableSubjects.length > 0) {
          // Merge unique subjects
          const subjSet = new Set([...DEFAULT_SUBJECTS, ...data.availableSubjects]);
          setAvailableSubjects(Array.from(subjSet));
        }
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.warn("[Leaderboard Fetch Error]:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboardData();
  }, [fetchLeaderboardData]);

  // Compute local locked trophies for the active client user from Zustand testAttempts
  // Rule: Locked per unique testId. Re-attempting the same test awards 0 additional trophies.
  const localClientTrophies = useMemo(() => {
    if (!clientAttempts || clientAttempts.length === 0) {
      return { total: 0, bySubject: {} as Record<string, number>, count: 0 };
    }

    const testMap = new Map<string, { subject: string; marks: number }>();
    // Group by testId and lock to first attempt score
    clientAttempts.forEach((att) => {
      const tId = att.testId || att.id;
      if (tId && !testMap.has(tId)) {
        const marks = Math.max(
          0,
          att.totalMarks ?? (att.correctCount || 0) * 5 - (att.incorrectCount || 0) * 1
        );
        testMap.set(tId, {
          subject: att.subject || "General",
          marks,
        });
      }
    });

    let total = 0;
    const bySubject: Record<string, number> = {};
    testMap.forEach(({ subject, marks }) => {
      total += marks;
      bySubject[subject] = (bySubject[subject] || 0) + marks;
    });

    return { total, bySubject, count: testMap.size };
  }, [clientAttempts]);

  // Merge server data with active client user state
  const mergedUsers = useMemo(() => {
    const list = [...serverUsers];
    const currentId = currentUser.id;

    // Check if current user is already present in serverUsers
    const existingIndex = list.findIndex(
      (u) =>
        (currentId && currentId !== "guest" && u.userId === currentId) ||
        u.isCurrentUser
    );

    if (existingIndex >= 0) {
      const existing = list[existingIndex]!;
      // Reconcile: Take max trophies between server and client local attempts
      const updatedTotal = Math.max(existing.totalTrophies, localClientTrophies.total);
      const mergedSubj: Record<string, number> = { ...(existing.subjectTrophies || {}) };

      Object.entries(localClientTrophies.bySubject).forEach(([s, val]) => {
        mergedSubj[s] = Math.max(mergedSubj[s] || 0, val);
      });

      list[existingIndex] = {
        ...existing,
        name: currentUser.name && currentUser.name !== "guest" ? currentUser.name : existing.name,
        targetCollege: currentUser.targetCollege || existing.targetCollege,
        streak: Math.max(existing.streak, currentUser.dailyStreak || 0),
        totalTrophies: updatedTotal,
        subjectTrophies: mergedSubj,
        completedTestsCount: Math.max(
          existing.completedTestsCount || 0,
          localClientTrophies.count
        ),
        isCurrentUser: true,
      };
    }

    return list;
  }, [serverUsers, currentUser, localClientTrophies]);

  // Filter and sort entries based on active filters and viewMode
  const rankedEntries = useMemo(() => {
    // 1. Filter by stream if not 'all'
    let filtered = mergedUsers;
    if (activeStreamFilter !== "all") {
      filtered = filtered.filter((u) => u.stream === activeStreamFilter);
    }

    // 2. Sort by trophies depending on viewMode
    const sorted = [...filtered].sort((a, b) => {
      if (viewMode === "overall") {
        if (b.totalTrophies !== a.totalTrophies) {
          return b.totalTrophies - a.totalTrophies;
        }
        return b.totalXp - a.totalXp;
      } else {
        // Subject-wise view
        const trophiesA = a.subjectTrophies?.[selectedSubject] || 0;
        const trophiesB = b.subjectTrophies?.[selectedSubject] || 0;
        if (trophiesB !== trophiesA) {
          return trophiesB - trophiesA;
        }
        return b.totalTrophies - a.totalTrophies;
      }
    });

    // 3. Assign ranks
    return sorted.map((entry, idx): LeaderboardEntry => ({
      rank: idx + 1,
      userId: entry.userId,
      name: entry.name,
      stream: entry.stream,
      targetCollege: entry.targetCollege,
      streak: entry.streak,
      accuracyPercentage: entry.accuracyPercentage,
      totalXp: entry.totalXp,
      totalTrophies:
        viewMode === "overall"
          ? entry.totalTrophies
          : entry.subjectTrophies?.[selectedSubject] || 0,
      subjectTrophies: entry.subjectTrophies,
      completedTestsCount: entry.completedTestsCount,
      isCurrentUser: entry.isCurrentUser || (Boolean(currentUser.id) && currentUser.id !== "guest" && entry.userId === currentUser.id),
    }));
  }, [mergedUsers, activeStreamFilter, viewMode, selectedSubject, currentUser.id]);

  // Find current user's standing in this view
  const currentUserRanked = rankedEntries.find((e) => e.isCurrentUser);
  const isCurrentUserInTop3 = currentUserRanked && currentUserRanked.rank <= 3;

  return (
    <section className="bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[5px_5px_0px_0px_#000] p-4 sm:p-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-[#FEF3C7] text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000] shrink-0">
            <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-[#D97706]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                All-India CUET Trophy Leaderboard
              </h2>
              <span className="bg-[#FEF3C7] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase font-mono border border-black shadow-[1px_1px_0px_0px_#000]">
                Live Supabase Verified
              </span>
            </div>
            <p className="text-xs sm:text-sm text-black/75 font-semibold mt-0.5">
              Rankings determined by locked mock exam trophies (+5 marks per correct, -1 per negative). Each mock is locked on first attempt.
            </p>
          </div>
        </div>

        {/* Refresh Action */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => fetchLeaderboardData(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-[#FAF7EE] hover:bg-[#FEF3C7] text-xs font-black text-black transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-50"
            title="Refresh real-time data from Supabase backend"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#D97706]" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Live Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Filter and Mode Control Bar */}
      <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-[#FAF7EE] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
        {/* Left: Overall vs Subject Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-black text-black/70 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-black" />
            Mode:
          </span>
          <div className="inline-flex p-1 bg-white rounded-lg border-2 border-black shadow-[1px_1px_0px_0px_#000]">
            <button
              type="button"
              onClick={() => setViewMode("overall")}
              className={`px-3 py-1.5 rounded-md text-xs font-black transition-all flex items-center gap-1.5 ${
                viewMode === "overall"
                  ? "bg-black text-white shadow-[1px_1px_0px_0px_#000]"
                  : "text-black hover:bg-black/5"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Overall Trophies</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("subject")}
              className={`px-3 py-1.5 rounded-md text-xs font-black transition-all flex items-center gap-1.5 ${
                viewMode === "subject"
                  ? "bg-black text-white shadow-[1px_1px_0px_0px_#000]"
                  : "text-black hover:bg-black/5"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Subject-Wise</span>
            </button>
          </div>

          {/* If Subject Mode is active, render Subject Dropdown */}
          {viewMode === "subject" && (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-150">
              <label htmlFor="subject-select" className="sr-only">
                Select Subject
              </label>
              <select
                id="subject-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-1.5 bg-white border-2 border-black rounded-lg text-xs font-black text-black shadow-[2px_2px_0px_0px_#000] focus:outline-none cursor-pointer"
              >
                {availableSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Right: Stream Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-black text-black/70 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-black" />
            Stream:
          </span>
          <div className="grid grid-cols-4 sm:flex p-1 bg-white rounded-lg border-2 border-black text-xs font-black shadow-[1px_1px_0px_0px_#000] w-full sm:w-auto">
            {(["all", "science", "commerce", "humanities"] as StreamFilter[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setActiveStreamFilter(st)}
                className={`px-2.5 sm:px-3 py-1 rounded-md transition-all capitalize text-center ${
                  activeStreamFilter === st
                    ? "bg-black text-white shadow-[1px_1px_0px_0px_#000]"
                    : "text-black hover:bg-black/5"
                }`}
              >
                {st === "all" ? "All Streams" : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View Context Banner */}
      <div className="mt-4 flex items-center justify-between text-xs text-black/70 font-semibold px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Showing{" "}
            <strong className="text-black font-black">
              {viewMode === "overall" ? "Overall Mock Trophies" : `${selectedSubject} Trophies`}
            </strong>{" "}
            for{" "}
            <strong className="text-black font-black capitalize">
              {activeStreamFilter === "all" ? "All Aspirants" : `${activeStreamFilter} Stream`}
            </strong>
          </span>
        </div>
        {lastUpdated && (
          <span className="text-[11px] text-black/50 font-mono hidden sm:inline">
            Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="mt-6 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 bg-[#FAF7EE] border-2 border-black rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && rankedEntries.length === 0 && (
        <div className="mt-8 text-center py-12 px-4 rounded-xl bg-[#FAF7EE] border-2 border-dashed border-black">
          <div className="w-12 h-12 mx-auto rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] mb-3">
            <Trophy className="w-6 h-6 text-black/40" />
          </div>
          <h3 className="text-base font-black text-black">No Aspirants Found</h3>
          <p className="text-xs text-black/70 max-w-sm mx-auto mt-1 font-medium">
            No students have registered in this stream or completed a mock test in {selectedSubject} yet.
            Take a mock test to establish your #1 position!
          </p>
        </div>
      )}

      {/* Leaderboard Table */}
      {!isLoading && rankedEntries.length > 0 && (
        <div className="mt-6 overflow-x-auto w-full max-w-full">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b-2 border-black text-black uppercase tracking-wider font-black text-[10px] sm:text-[11px] pb-3">
                <th className="py-2.5 sm:py-3 px-2 sm:px-3 w-10 sm:w-16">Rank</th>
                <th className="py-2.5 sm:py-3 px-2 sm:px-4">Aspirant</th>
                <th className="py-2.5 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">Stream</th>
                <th className="py-2.5 sm:py-3 px-2 sm:px-4 text-center hidden md:table-cell">Streak</th>
                <th className="py-2.5 sm:py-3 px-2 sm:px-4 text-center hidden lg:table-cell">Mocks Solved</th>
                <th className="py-2.5 sm:py-3 px-2 sm:px-4 text-right">
                  {viewMode === "overall" ? "Total Trophies" : `${selectedSubject} Trophies`}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black/10">
              {rankedEntries.map((entry) => {
                const isTop1 = entry.rank === 1;
                const isTop2 = entry.rank === 2;
                const isTop3 = entry.rank === 3;
                const isCurrentUser = entry.isCurrentUser;

                let rankBadge = (
                  <span className="font-mono font-black text-black w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#FAF7EE] border border-black flex items-center justify-center text-[11px] sm:text-xs shadow-[1px_1px_0px_0px_#000]">
                    #{entry.rank}
                  </span>
                );

                if (isTop1) {
                  rankBadge = (
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#FEF3C7] text-black border border-black font-mono font-black text-[11px] sm:text-xs flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                      🥇
                    </span>
                  );
                } else if (isTop2) {
                  rankBadge = (
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#F3F4F6] text-black border border-black font-mono font-black text-[11px] sm:text-xs flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
                      🥈
                    </span>
                  );
                } else if (isTop3) {
                  rankBadge = (
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#FFEDD5] text-black border border-black font-mono font-black text-[11px] sm:text-xs flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
                      🥉
                    </span>
                  );
                }

                return (
                  <tr
                    key={entry.userId}
                    className={`transition-colors ${
                      isCurrentUser
                        ? "bg-[#FEF3C7]/40 hover:bg-[#FEF3C7]/60 font-bold"
                        : isTop1
                        ? "bg-[#FEF3C7]/20 hover:bg-[#FEF3C7]/30"
                        : "hover:bg-[#FAF7EE]"
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3 px-2 sm:px-3">{rankBadge}</td>

                    {/* Aspirant Info */}
                    <td className="py-3 px-2 sm:px-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black text-black flex items-center justify-center font-black text-[10px] sm:text-xs uppercase shadow-[1px_1px_0px_0px_#000] shrink-0 ${
                            isCurrentUser
                              ? "bg-black text-white"
                              : isTop1
                              ? "bg-[#FEF3C7]"
                              : "bg-white"
                          }`}
                        >
                          {entry.name.slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-black text-xs sm:text-sm flex items-center gap-1.5 truncate">
                            <span className="truncate">{entry.name}</span>
                            {isCurrentUser && (
                              <span className="bg-black text-white text-[9px] px-1.5 py-0.5 rounded font-black uppercase shrink-0">
                                You
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-black/70 flex items-center gap-1 font-semibold truncate">
                            <GraduationCap className="w-3 h-3 text-black shrink-0" />
                            <span className="truncate">{entry.targetCollege}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Stream Badge */}
                    <td className="py-3 px-2 sm:px-4 hidden sm:table-cell">
                      <span className="capitalize text-[10px] font-black px-2 py-0.5 rounded border border-black bg-white shadow-[1px_1px_0px_0px_#000]">
                        {entry.stream}
                      </span>
                    </td>

                    {/* Daily Streak */}
                    <td className="py-3 px-2 sm:px-4 text-center hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 font-black text-black font-mono bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-black text-xs shadow-[1px_1px_0px_0px_#000]">
                        <Flame className="w-3.5 h-3.5 fill-[#F59E0B] text-[#D97706]" />
                        {entry.streak}d
                      </span>
                    </td>

                    {/* Mocks Solved */}
                    <td className="py-3 px-2 sm:px-4 text-center hidden lg:table-cell">
                      <span className="font-mono font-black text-black bg-[#FAF7EE] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                        {entry.completedTestsCount || 0} mocks
                      </span>
                    </td>

                    {/* Trophies */}
                    <td className="py-3 px-2 sm:px-4 text-right">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FEF3C7] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                        <Trophy className="w-4 h-4 text-[#D97706] shrink-0" />
                        <span className="font-mono font-black text-black text-xs sm:text-sm whitespace-nowrap">
                          {entry.totalTrophies.toLocaleString()} 🏆
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pinned Current User Row if outside Top Ranks or unranked */}
      {!isLoading && currentUserRanked && !isCurrentUserInTop3 && (
        <div className="mt-6 pt-4 border-t-2 border-dashed border-black">
          <div className="text-[11px] font-black text-black/70 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Your Live Standing</span>
            <span className="text-black font-bold">
              {currentUserRanked.totalTrophies > 0
                ? "Attempt new tests to earn more locked trophies!"
                : "Complete a mock exam to unlock your first trophies!"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FEF3C7]/40 border-2 border-black text-black flex flex-wrap items-center justify-between gap-4 shadow-[4px_4px_0px_0px_#000]">
            <div className="flex items-center gap-4">
              <span className="font-mono font-black text-black bg-[#FEF3C7] px-3 py-1.5 rounded-lg border-2 border-black text-sm shadow-[2px_2px_0px_0px_#000]">
                #{currentUserRanked.rank}
              </span>
              <div>
                <p className="font-black text-sm flex items-center gap-2 text-black">
                  <span>{currentUserRanked.name} (You)</span>
                  <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase">
                    Active Aspirant
                  </span>
                </p>
                <p className="text-xs text-black/75 font-semibold mt-0.5">
                  Target: {currentUserRanked.targetCollege}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div className="text-center">
                <p className="text-[10px] text-black/60 uppercase font-black">Daily Streak</p>
                <p className="font-mono font-black text-black text-sm flex items-center gap-1 justify-center">
                  <Flame className="w-3.5 h-3.5 fill-[#F59E0B] text-[#D97706]" />
                  {currentUserRanked.streak}d
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-black/60 uppercase font-black">
                  {viewMode === "overall" ? "Total Trophies" : `${selectedSubject} Trophies`}
                </p>
                <p className="font-mono font-black text-black text-base flex items-center gap-1 justify-end">
                  <Trophy className="w-4 h-4 text-[#D97706]" />
                  {currentUserRanked.totalTrophies.toLocaleString()} 🏆
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fair Play & Trophy Rule Footer */}
      <div className="mt-8 pt-4 border-t-2 border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-black/70">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-black shrink-0" />
          <span className="font-medium">
            <strong className="text-black font-black">Anti-Farming Rule:</strong> Trophies for each mock are permanently locked on first completion. Re-attempting the same test awards 0 additional trophies.
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
          <span>CUET Marking: +5 Correct, -1 Incorrect</span>
        </div>
      </div>
    </section>
  );
}
