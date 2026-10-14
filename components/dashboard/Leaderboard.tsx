"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Trophy,
  Flame,
  GraduationCap,
  RefreshCw,
  Lock,
  Sparkles,
  BookOpen,
  Filter,
  Eye,
  EyeOff,
  HelpCircle,
} from "lucide-react";
import { StreamType, LeaderboardEntry } from "@/types";
import { useTestStore } from "@/lib/store/useTestStore";

type ViewMode = "overall" | "subject";
type StreamFilter = "all" | StreamType;
type TimeFilter = "all" | "month" | "week";

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
  bestScore?: number;
  bestScoreTest?: string;
  lastActive?: string;
}

function formatRelativeTime(dateStr?: string | null): string {
  if (!dateStr) return "Recently";
  const now = Date.now();
  const past = new Date(dateStr).getTime();
  if (isNaN(past)) return "Recently";
  const diffMinutes = Math.floor((now - past) / 60000);
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 7)}w ago`;
}

function getMaskedName(fullName: string, isAnon: boolean): string {
  if (!isAnon) return fullName;
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return `${parts[0]![0]}. Aspirant`;
  return `${parts[0]![0]}. ${parts[parts.length - 1]![0]}.`;
}

export default function Leaderboard() {
  const currentUser = useTestStore((state) => state.user);
  const clientAttempts = useTestStore((state) => state.testAttempts);

  // Leaderboard filters
  const [viewMode, setViewMode] = useState<ViewMode>("overall");
  const [selectedSubject, setSelectedSubject] = useState<string>("Physics");
  const [activeStreamFilter, setActiveStreamFilter] = useState<StreamFilter>("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");

  // Privacy setting (Anonymous vs Public)
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [showMarkingInfo, setShowMarkingInfo] = useState<boolean>(false);

  // Load privacy preference from localStorage
  useEffect(() => {
    try {
      const savedPrivacy = localStorage.getItem("cuet_leaderboard_anonymous");
      if (savedPrivacy === "true") {
        setIsAnonymous(true);
      }
    } catch {
      // Ignore localStorage issues
    }
  }, []);

  const togglePrivacy = () => {
    const nextVal = !isAnonymous;
    setIsAnonymous(nextVal);
    try {
      localStorage.setItem("cuet_leaderboard_anonymous", String(nextVal));
    } catch {
      // Ignore
    }
  };

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
  // Rule: Locked per unique testId. NTA raw score (+5 / -1) without zero clamping.
  const localClientStats = useMemo(() => {
    if (!clientAttempts || clientAttempts.length === 0) {
      return {
        total: 0,
        bySubject: {} as Record<string, number>,
        count: 0,
        bestScore: 0,
        bestScoreTest: "Official Mock",
        lastActive: new Date().toISOString(),
        avgAccuracy: 0,
      };
    }

    const now = Date.now();
    const cutoffTime =
      timeFilter === "week"
        ? now - 7 * 86400000
        : timeFilter === "month"
        ? now - 30 * 86400000
        : 0;

    const filteredAttempts = clientAttempts.filter((att) => {
      if (cutoffTime === 0) return true;
      const attDate = new Date(att.submittedAt || att.date || att.timestamp || 0).getTime();
      return isNaN(attDate) || attDate >= cutoffTime;
    });

    const testMap = new Map<string, {
      subject: string;
      marks: number;
      accuracy: number;
      title: string;
      date: string;
    }>();

    // Group by testId and lock to first attempt score (NTA raw score without zero clamping)
    filteredAttempts.forEach((att) => {
      const tId = att.testId || att.id;
      const rawDate = att.submittedAt || att.date || att.timestamp || new Date().toISOString();
      if (tId && !testMap.has(tId)) {
        const marks = att.totalMarks ?? ((att.correctCount || 0) * 5 - (att.incorrectCount || 0) * 1);
        const accuracy = att.accuracyPercentage ?? (
          (att.correctCount || 0) + (att.incorrectCount || 0) > 0
            ? Math.round(((att.correctCount || 0) / ((att.correctCount || 0) + (att.incorrectCount || 0))) * 100)
            : 0
        );
        testMap.set(tId, {
          subject: att.subject || "General",
          marks,
          accuracy,
          title: att.testTitle || `${att.subject || "General"} Drill`,
          date: rawDate,
        });
      }
    });

    let total = 0;
    let sumAcc = 0;
    let maxScore = -Infinity;
    let bestTest = "Official Mock";
    let latestDate = "";
    const bySubject: Record<string, number> = {};

    testMap.forEach(({ subject, marks, accuracy, title, date }) => {
      total += marks;
      sumAcc += accuracy;
      bySubject[subject] = (bySubject[subject] || 0) + marks;
      if (marks > maxScore) {
        maxScore = marks;
        bestTest = title;
      }
      if (!latestDate || new Date(date).getTime() > new Date(latestDate).getTime()) {
        latestDate = date;
      }
    });

    return {
      total,
      bySubject,
      count: testMap.size,
      bestScore: maxScore === -Infinity ? 0 : maxScore,
      bestScoreTest: bestTest,
      lastActive: latestDate || new Date().toISOString(),
      avgAccuracy: testMap.size > 0 ? Math.round(sumAcc / testMap.size) : 0,
    };
  }, [clientAttempts, timeFilter]);

  // Merge server data with active client user state
  const mergedUsers = useMemo(() => {
    const list = [...serverUsers];
    const currentId = currentUser.id;

    // Filter server users by time window if specified
    const now = Date.now();
    const cutoffTime =
      timeFilter === "week"
        ? now - 7 * 86400000
        : timeFilter === "month"
        ? now - 30 * 86400000
        : 0;

    let timeFilteredList = list;
    if (cutoffTime > 0) {
      timeFilteredList = list.filter((u) => {
        if (!u.lastActive) return true;
        const d = new Date(u.lastActive).getTime();
        return isNaN(d) || d >= cutoffTime;
      });
    }

    const existingIndex = timeFilteredList.findIndex(
      (u) =>
        (currentId && currentId !== "guest" && u.userId === currentId) ||
        u.isCurrentUser
    );

    if (existingIndex >= 0) {
      const existing = timeFilteredList[existingIndex]!;
      const updatedTotal = Math.max(existing.totalTrophies, localClientStats.total);
      const mergedSubj: Record<string, number> = { ...(existing.subjectTrophies || {}) };

      Object.entries(localClientStats.bySubject).forEach(([s, val]) => {
        mergedSubj[s] = Math.max(mergedSubj[s] || 0, val);
      });

      timeFilteredList[existingIndex] = {
        ...existing,
        name: currentUser.name && currentUser.name !== "guest" ? currentUser.name : existing.name,
        targetCollege: currentUser.targetCollege || existing.targetCollege,
        streak: Math.max(existing.streak, currentUser.dailyStreak || 0),
        totalTrophies: updatedTotal,
        subjectTrophies: mergedSubj,
        completedTestsCount: Math.max(
          existing.completedTestsCount || 0,
          localClientStats.count
        ),
        accuracyPercentage: localClientStats.avgAccuracy || existing.accuracyPercentage,
        bestScore: Math.max(existing.bestScore || 0, localClientStats.bestScore),
        bestScoreTest: localClientStats.bestScoreTest || existing.bestScoreTest,
        lastActive: localClientStats.lastActive || existing.lastActive,
        isCurrentUser: true,
      };
    } else if (currentUser && (localClientStats.count > 0 || localClientStats.total !== 0)) {
      // Add current client user if not present
      timeFilteredList.push({
        userId: currentId || "client_user",
        name: currentUser.name && currentUser.name !== "guest" ? currentUser.name : "Aspirant (You)",
        stream: (currentUser.preferredStream as StreamType) || "science",
        targetCollege: currentUser.targetCollege || "Central University",
        streak: currentUser.dailyStreak || 0,
        accuracyPercentage: localClientStats.avgAccuracy,
        totalXp: currentUser.xpPoints || 0,
        totalTrophies: localClientStats.total,
        subjectTrophies: localClientStats.bySubject,
        completedTestsCount: localClientStats.count,
        bestScore: localClientStats.bestScore,
        bestScoreTest: localClientStats.bestScoreTest,
        lastActive: localClientStats.lastActive,
        isCurrentUser: true,
      });
    }

    return timeFilteredList;
  }, [serverUsers, currentUser, localClientStats, timeFilter]);

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
    return sorted.map((entry, idx): LeaderboardEntry & { bestScore?: number; bestScoreTest?: string; lastActive?: string } => ({
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
      bestScore: entry.bestScore,
      bestScoreTest: entry.bestScoreTest,
      lastActive: entry.lastActive,
    }));
  }, [mergedUsers, activeStreamFilter, viewMode, selectedSubject, currentUser.id]);

  // Top 50 view pagination
  const top50Entries = useMemo(() => rankedEntries.slice(0, 50), [rankedEntries]);

  // Current user rank & pin state
  const currentUserRanked = rankedEntries.find((e) => e.isCurrentUser);
  const isCurrentUserInTop50 = currentUserRanked && currentUserRanked.rank <= 50;

  return (
    <section className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-5 sm:p-7 space-y-6">
      {/* 1. Sleek Controls & Status Toolbar (No duplicate title) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Live Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Rankings</span>
          </div>

          {/* Marking scheme popover button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMarkingInfo(!showMarkingInfo)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer"
              title="Click to view official NTA scoring rule"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>+5 / -1 Marking Rule</span>
            </button>

            {showMarkingInfo && (
              <div className="absolute left-0 mt-2 z-20 w-72 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> NTA Fair-Play Scoring
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowMarkingInfo(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Each mock completion earns authentic NTA marks: <strong>+5</strong> per correct answer, <strong>-1</strong> for negative errors.
                </p>
                <p className="text-slate-400 text-[10px] border-t border-slate-800 pt-1.5">
                  Anti-Farming: Trophies are permanently locked to your <strong>first completion</strong> of each unique test to prevent score inflation.
                </p>
              </div>
            )}
          </div>

          {lastUpdated && (
            <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
              Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>

        {/* Action Controls: Privacy Toggle & Live Refresh */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Privacy Setting Toggle */}
          <button
            type="button"
            onClick={togglePrivacy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
            title="Toggle anonymous mode to protect your identity"
          >
            {isAnonymous ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                <span>Anonymous Mode</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>Public Mode</span>
              </>
            )}
          </button>

          {/* Refresh Icon Button */}
          <button
            type="button"
            onClick={() => fetchLeaderboardData(true)}
            disabled={isRefreshing}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            title="Refresh live leaderboard rankings"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-amber-600" : "text-slate-500"}`} />
          </button>
        </div>
      </div>

      {/* 2. Filter Bar (Mode, Time Filter, Stream Filter) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/60">
        {/* Left: Mode & Time Tabs */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* View Mode */}
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("overall")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "overall"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Overall Trophies</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("subject")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "subject"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Subject-Wise</span>
            </button>
          </div>

          {/* If Subject Mode is active */}
          {viewMode === "subject" && (
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          )}

          {/* Time Filter Pills */}
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-xs text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTimeFilter("all")}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeFilter === "all" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Time
            </button>
            <button
              type="button"
              onClick={() => setTimeFilter("month")}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeFilter === "month" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              This Month
            </button>
            <button
              type="button"
              onClick={() => setTimeFilter("week")}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeFilter === "week" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Right: Stream Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            Stream:
          </span>
          <div className="grid grid-cols-4 sm:flex p-1 bg-white rounded-xl border border-slate-200 text-xs font-semibold shadow-xs w-full sm:w-auto">
            {(["all", "science", "commerce", "humanities"] as StreamFilter[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setActiveStreamFilter(st)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all capitalize text-center cursor-pointer ${
                  activeStreamFilter === st
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st === "all" ? "All" : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Status View Context */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <div className="flex items-center gap-2">
          <span>
            Showing top rankings in{" "}
            <strong className="text-slate-900 font-bold">
              {viewMode === "overall" ? "Overall Mock Trophies" : `${selectedSubject} Trophies`}
            </strong>{" "}
            for{" "}
            <strong className="text-slate-900 font-bold capitalize">
              {activeStreamFilter === "all" ? "All Aspirants" : `${activeStreamFilter} Stream`}
            </strong>{" "}
            ({timeFilter === "week" ? "Past 7 Days" : timeFilter === "month" ? "Past 30 Days" : "All Time"})
          </span>
        </div>
        <span className="text-slate-400 font-mono text-[11px]">
          Top {Math.min(50, rankedEntries.length)} of {rankedEntries.length} aspirants
        </span>
      </div>

      {/* 4. Loading Skeleton */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-16 bg-slate-50 border border-slate-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* 5. Empty State */}
      {!isLoading && rankedEntries.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs mb-3">
            <Trophy className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Aspirants Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 font-medium">
            No student mock sessions found matching this filter window. Complete an official mock test to place #1!
          </p>
        </div>
      )}

      {/* 6. Comprehensive Leaderboard Table */}
      {!isLoading && top50Entries.length > 0 && (
        <div className="overflow-x-auto w-full max-w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold text-[10px] sm:text-[11px] pb-3">
                <th className="py-3 px-3 w-12 text-center">Rank</th>
                <th className="py-3 px-3">Aspirant</th>
                <th className="py-3 px-3 text-center hidden md:table-cell">Stream</th>
                <th className="py-3 px-3 text-left">Accuracy</th>
                <th className="py-3 px-3 text-left hidden lg:table-cell">Best Score</th>
                <th className="py-3 px-3 text-center hidden sm:table-cell">Streak</th>
                <th className="py-3 px-3 text-left hidden xl:table-cell">Last Active</th>
                <th className="py-3 px-3 text-right">
                  {viewMode === "overall" ? "Trophies" : `${selectedSubject} Trophies`}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {top50Entries.map((entry) => {
                const isTop1 = entry.rank === 1;
                const isTop2 = entry.rank === 2;
                const isTop3 = entry.rank === 3;
                const isCurrentUser = entry.isCurrentUser;
                const effectiveName = isCurrentUser ? getMaskedName(entry.name, isAnonymous) : entry.name;
                const effectiveCollege = isCurrentUser && isAnonymous ? "Confidential" : entry.targetCollege;

                let rankBadge = (
                  <span className="font-mono font-bold text-slate-600 w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-[11px] mx-auto">
                    #{entry.rank}
                  </span>
                );

                if (isTop1) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center shadow-xs mx-auto">
                      🥇
                    </span>
                  );
                } else if (isTop2) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-xl bg-slate-200 text-slate-800 font-mono font-bold text-xs flex items-center justify-center shadow-xs mx-auto">
                      🥈
                    </span>
                  );
                } else if (isTop3) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-xl bg-amber-50 text-amber-800 font-mono font-bold text-xs flex items-center justify-center shadow-xs mx-auto">
                      🥉
                    </span>
                  );
                }

                return (
                  <tr
                    key={entry.userId}
                    className={`transition-colors ${
                      isCurrentUser
                        ? "bg-blue-50/60 hover:bg-blue-50/80 font-semibold"
                        : isTop1
                        ? "bg-amber-50/20 hover:bg-amber-50/30"
                        : "hover:bg-slate-50/60"
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-3 text-center">{rankBadge}</td>

                    {/* Aspirant Details */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-[10px] sm:text-xs uppercase shrink-0 shadow-xs ${
                            isCurrentUser
                              ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white"
                              : isTop1
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {effectiveName.slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5 truncate">
                            <span className="truncate">{effectiveName}</span>
                            {isCurrentUser && (
                              <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0">
                                You
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1 font-medium truncate">
                            <GraduationCap className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{effectiveCollege}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Stream Badge */}
                    <td className="py-3.5 px-3 text-center hidden md:table-cell">
                      <span className="capitalize text-[10px] font-bold px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-600">
                        {entry.stream}
                      </span>
                    </td>

                    {/* Average Accuracy (with mini visual bar) */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-800 tabular-nums w-8">
                          {entry.accuracyPercentage}%
                        </span>
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0 hidden sm:block">
                          <div
                            className={`h-full rounded-full ${
                              entry.accuracyPercentage >= 80
                                ? "bg-emerald-500"
                                : entry.accuracyPercentage >= 50
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                            style={{ width: `${Math.min(100, Math.max(5, entry.accuracyPercentage))}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Best Score */}
                    <td className="py-3.5 px-3 hidden lg:table-cell">
                      <div>
                        <span className={`font-mono font-bold text-xs tabular-nums ${entry.bestScore && entry.bestScore < 0 ? "text-rose-600" : "text-slate-900"}`}>
                          {entry.bestScore !== undefined ? `${entry.bestScore} pts` : "—"}
                        </span>
                        {entry.bestScoreTest && (
                          <p className="text-[10px] text-slate-400 truncate max-w-[130px]" title={entry.bestScoreTest}>
                            {entry.bestScoreTest}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Daily Streak */}
                    <td className="py-3.5 px-3 text-center hidden sm:table-cell">
                      <span className="inline-flex items-center gap-1 font-bold text-amber-800 font-mono bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 text-xs">
                        <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {entry.streak}d
                      </span>
                    </td>

                    {/* Last Active */}
                    <td className="py-3.5 px-3 hidden xl:table-cell text-slate-500 font-medium text-[11px]">
                      {formatRelativeTime(entry.lastActive)}
                    </td>

                    {/* Trophies */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50/80 border border-amber-200/60 text-amber-800 shadow-xs">
                        <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-mono font-bold text-xs sm:text-sm tabular-nums">
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

      {/* 7. Pinned Current User Standing Row (Pinned if outside Top 50 or unranked) */}
      {!isLoading && currentUserRanked && !isCurrentUserInTop50 && (
        <div className="pt-3 border-t border-dashed border-slate-200">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Your Live Standing (Outside Top 50)</span>
            <span className="text-slate-600 font-semibold">
              Attempt official mocks to climb into the Top 50!
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-200/80 text-slate-900 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <span className="font-mono font-bold text-blue-700 bg-white px-3 py-1.5 rounded-xl border border-blue-200 text-sm shadow-xs">
                #{currentUserRanked.rank}
              </span>
              <div>
                <p className="font-bold text-sm flex items-center gap-2 text-slate-900">
                  <span>{getMaskedName(currentUserRanked.name, isAnonymous)} (You)</span>
                  <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                    Active
                  </span>
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Target: {isAnonymous ? "Confidential" : currentUserRanked.targetCollege} · Accuracy: {currentUserRanked.accuracyPercentage}%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Daily Streak</p>
                <p className="font-mono font-bold text-amber-700 text-sm flex items-center gap-1 justify-center">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {currentUserRanked.streak}d
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  {viewMode === "overall" ? "Total Trophies" : `${selectedSubject} Trophies`}
                </p>
                <p className="font-mono font-extrabold text-slate-900 text-base flex items-center gap-1 justify-end">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  {currentUserRanked.totalTrophies.toLocaleString()} 🏆
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Fair Play & Anti-Farming Footer */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-medium">
            <strong className="text-slate-700 font-bold">Anti-Farming Rule:</strong> Trophies are permanently locked to your 1st attempt per test. Re-attempts award 0 additional trophies.
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>NTA Authentic Marking: +5 Correct, -1 Wrong</span>
        </div>
      </div>
    </section>
  );
}
