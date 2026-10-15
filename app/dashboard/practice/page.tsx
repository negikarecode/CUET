"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  ArrowRight,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  Briefcase,
  TrendingUp,
  ScrollText,
  Landmark,
  Globe,
  BrainCircuit,
  Users,
  Activity,
  Laptop,
  Home,
  Tv,
  Leaf,
  Palette,
  Sprout,
  Footprints,
  FileText,
  Layers,
  Sparkles,
  Info,
  Target,
} from "lucide-react";
import practiceManifest from "@/lib/data/practice_test_manifest.json";
import { useTarget } from "@/lib/hooks/useTarget";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { getPracticeStats, normalizePracticeFolder } from "@/lib/practice-stats";

type StreamKey = "all" | "science" | "commerce" | "humanities" | "applied";
type StatusFilter = "all" | "started" | "not-started";

interface SubjectItem {
  id: string;
  name: string;
  code: string;
  stream: StreamKey;
  unitsCount: number;
  totalTests: number;
  totalQuestions: number;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
}

const SUBJECT_STREAM_MAP: Record<
  string,
  { stream: StreamKey; icon: any; accentColor: string; badgeBg: string }
> = {
  physics: { stream: "science", icon: Atom, accentColor: "#0284C7", badgeBg: "#E0F2FE" },
  chemistry: { stream: "science", icon: FlaskConical, accentColor: "#7C3AED", badgeBg: "#EDE9FE" },
  maths: { stream: "science", icon: Calculator, accentColor: "#2563EB", badgeBg: "#DBEAFE" },
  bio: { stream: "science", icon: Dna, accentColor: "#059669", badgeBg: "#D1FAE5" },
  accountancy: { stream: "commerce", icon: Calculator, accentColor: "#D97706", badgeBg: "#FEF3C7" },
  eco: { stream: "commerce", icon: TrendingUp, accentColor: "#0D9488", badgeBg: "#CCFBF1" },
  bst: { stream: "commerce", icon: Briefcase, accentColor: "#4F46E5", badgeBg: "#E0E7FF" },
  history: { stream: "humanities", icon: ScrollText, accentColor: "#B45309", badgeBg: "#FEF3C7" },
  "pol science": { stream: "humanities", icon: Landmark, accentColor: "#DC2626", badgeBg: "#FEE2E2" },
  geo: { stream: "humanities", icon: Globe, accentColor: "#0284C7", badgeBg: "#E0F2FE" },
  psychology: { stream: "humanities", icon: BrainCircuit, accentColor: "#9333EA", badgeBg: "#F3E8FF" },
  sociology: { stream: "humanities", icon: Users, accentColor: "#EA580C", badgeBg: "#FFEDD5" },
  physical_education: { stream: "applied", icon: Activity, accentColor: "#16A34A", badgeBg: "#DCFCE7" },
  computer_science: { stream: "science", icon: Laptop, accentColor: "#0284C7", badgeBg: "#E0F2FE" },
  home_science: { stream: "applied", icon: Home, accentColor: "#DB2777", badgeBg: "#FCE7F3" },
  mass_media: { stream: "applied", icon: Tv, accentColor: "#6366F1", badgeBg: "#EEF2FF" },
  environmental_studies: { stream: "applied", icon: Leaf, accentColor: "#059669", badgeBg: "#D1FAE5" },
  fine_arts: { stream: "applied", icon: Palette, accentColor: "#CA8A04", badgeBg: "#FEF08A" },
  agriculture: { stream: "applied", icon: Sprout, accentColor: "#15803D", badgeBg: "#DCFCE7" },
  anthropology: { stream: "humanities", icon: Footprints, accentColor: "#854D0E", badgeBg: "#FEF9C3" },
  english: { stream: "applied", icon: FileText, accentColor: "#2563EB", badgeBg: "#DBEAFE" },
  "general-test": { stream: "applied", icon: Layers, accentColor: "#7C3AED", badgeBg: "#EDE9FE" },
};

export default function PracticeTestsHubPage() {
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const target = useTarget();

  const [selectedStream, setSelectedStream] = useState<StreamKey>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const subjectsList: SubjectItem[] = useMemo(() => {
    return Object.entries(practiceManifest).map(([folder, data]: [string, any]) => {
      const meta = SUBJECT_STREAM_MAP[folder] || {
        stream: "applied" as StreamKey,
        icon: BookOpen,
        accentColor: "#2563EB",
        badgeBg: "#DBEAFE",
      };
      const unitsCount = data.units.length;
      return {
        id: folder,
        name: data.name,
        code: data.code,
        stream: meta.stream,
        unitsCount,
        totalTests: unitsCount * 20,
        totalQuestions: unitsCount * 400,
        icon: meta.icon,
        accentColor: meta.accentColor,
        badgeBg: meta.badgeBg,
      };
    });
  }, []);

  // Precompute practice statistics for each subject folder
  const subjectStatsMap = useMemo(() => {
    if (!isClient) return new Map<string, ReturnType<typeof getPracticeStats>>();
    const map = new Map<string, ReturnType<typeof getPracticeStats>>();
    for (const sub of subjectsList) {
      map.set(sub.id, getPracticeStats(sub.id, undefined, testAttempts));
    }
    return map;
  }, [isClient, subjectsList, testAttempts]);

  // Recommended subjects based on target dream college requirements (3-4 subjects)
  const recommendedSubjects = useMemo(() => {
    if (!target.hasTarget || !target.requiredSubjects || target.requiredSubjects.length === 0) {
      return [];
    }
    const reqNormalized = new Set(target.requiredSubjects.map((s) => normalizePracticeFolder(s)));
    const seen = new Set<string>();
    const list: SubjectItem[] = [];
    for (const s of subjectsList) {
      if (reqNormalized.has(normalizePracticeFolder(s.id))) {
        if (!seen.has(s.id)) {
          seen.add(s.id);
          list.push(s);
        }
      }
    }
    return list;
  }, [target, subjectsList]);

  const isSearchActive = Boolean(searchQuery.trim());
  const isFilterActive = selectedStream !== "all" || statusFilter !== "all";
  const showRecommendedRow = Boolean(
    target.hasTarget &&
    recommendedSubjects.length > 0 &&
    !isSearchActive &&
    !isFilterActive
  );

  const recommendedIds = useMemo(() => {
    return new Set(recommendedSubjects.map((s) => s.id));
  }, [recommendedSubjects]);

  // Filter subjects by stream, search, and status (excludes recommended when recommended row is shown)
  const filteredSubjects = useMemo(() => {
    const baseList = showRecommendedRow
      ? subjectsList.filter((s) => !recommendedIds.has(s.id))
      : subjectsList;

    const seen = new Set<string>();
    return baseList.filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);

      const matchesStream = selectedStream === "all" || s.stream === selectedStream;
      const matchesSearch =
        !searchQuery ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        s.code.includes(searchQuery.trim()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const stats = subjectStatsMap.get(s.id);
      const hasAttempts = Boolean(stats?.hasAttempts);

      let matchesStatus = true;
      if (statusFilter === "started") {
        matchesStatus = hasAttempts;
      } else if (statusFilter === "not-started") {
        matchesStatus = !hasAttempts;
      }

      return matchesStream && matchesSearch && matchesStatus;
    });
  }, [subjectsList, showRecommendedRow, recommendedIds, selectedStream, searchQuery, statusFilter, subjectStatsMap]);

  if (!isClient) {
    return <div className="min-h-screen bg-[#F8FAFC]" />;
  }

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-5">
      {/* 1. Compressed Header with Slim Spec Line */}
      <div className="space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span>CUET UG Practice Tests</span>
          </h1>

          {/* Subject count clarification badge with tooltip */}
          <div
            tabIndex={0}
            role="note"
            aria-label="Practice includes 22 subjects (20 domain subjects plus English Language & General Test). Domain Mocks focuses on 20 domain subjects, while PYQs covers the 14 core admission subjects."
            title="Practice includes 22 subjects (20 domain subjects plus English Language & General Test). Domain Mocks focuses on 20 domain subjects, while PYQs covers the 14 core admission subjects."
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-xs font-semibold text-slate-600 cursor-help transition-all self-start sm:self-auto"
          >
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>22 Subjects Available</span>
          </div>
        </div>

        {/* Slim Spec Line under title replacing the four bulky stat cards */}
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          22 subjects · 155 syllabus units · 3,100 practice tests · 20 questions each · 25 min duration · +5 / -1 marking
        </p>
      </div>

      {/* 2. Recommended for Your Target Row */}
      {showRecommendedRow ? (
        <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-purple-50/40 rounded-2xl border border-blue-200/80 p-4 sm:p-5 shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Recommended for your target: {target.college} ({target.course})
              </h2>
            </div>
            <Link
              href="/profile"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline self-start sm:self-auto"
            >
              Change target in Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {recommendedSubjects.map((s) => {
              const IconComp = s.icon;
              const stats = subjectStatsMap.get(s.id);
              const hasAttempts = Boolean(stats?.hasAttempts);
              const progressPct = stats?.totalCount
                ? Math.round((stats.attemptedCount / stats.totalCount) * 100)
                : 0;

              return (
                <div
                  key={`rec-${s.id}`}
                  className="bg-white rounded-xl border border-blue-100 p-4 shadow-2xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: s.badgeBg, color: s.accentColor }}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60 font-sans">
                        Code {s.code}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {s.name}
                      </h3>
                      <p className="text-[13px] text-slate-500 font-medium">
                        {s.unitsCount} syllabus units · 20 tests/unit
                      </p>
                    </div>

                    {/* Progress line & bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className={hasAttempts ? "text-slate-900 font-bold" : "text-slate-400"}>
                          {hasAttempts ? `${stats?.attemptedCount} / ${s.totalTests} done` : "Not started"}
                        </span>
                        {hasAttempts && stats?.accuracy !== null && (
                          <span className="text-blue-700 font-bold">{stats?.accuracy}% acc</span>
                        )}
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href={
                        hasAttempts && stats?.nextUnattemptedTestId
                          ? `/test/${stats.nextUnattemptedTestId}`
                          : `/dashboard/practice/${s.id}`
                      }
                      className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-2xs transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <span>{hasAttempts ? "Continue" : "Start"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/dashboard/practice/${s.id}`}
                      className="py-1.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all text-center"
                    >
                      <span>All Units</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : !target.hasTarget && !isSearchActive ? (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Target college not configured. Set your dream college to get prioritized subjects.</span>
          </div>
          <Link
            href="/profile"
            className="font-bold text-blue-600 hover:underline shrink-0"
          >
            Set your dream college
          </Link>
        </div>
      ) : null}

      {/* 3. Slim Combined Toolbar (Stream, Search, Status) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-2.5 sm:p-3 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Stream Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          {[
            { key: "all", label: "All Subjects" },
            { key: "science", label: "Science" },
            { key: "commerce", label: "Commerce" },
            { key: "humanities", label: "Humanities" },
            { key: "applied", label: "Languages & General" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedStream(tab.key as StreamKey)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap shrink-0 ${
                selectedStream === tab.key
                  ? "bg-slate-900 text-white shadow-2xs font-bold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right controls: Status filter + Search box */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Status Filter Segmented Control */}
          <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/60 shrink-0 text-xs">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === "all"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("started")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === "started"
                  ? "bg-white text-blue-700 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Started
            </button>
            <button
              onClick={() => setStatusFilter("not-started")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === "not-started"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Not started
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search subject or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* 4. All Subjects Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>
            {showRecommendedRow
              ? `Other subjects (${filteredSubjects.length})`
              : `All Practice Subjects (${filteredSubjects.length})`}
          </span>
          <span>Click card to open full syllabus units</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredSubjects.map((s) => {
            const IconComp = s.icon;
            const stats = subjectStatsMap.get(s.id);
            const hasAttempts = Boolean(stats?.hasAttempts);
            const progressPct = stats?.totalCount
              ? Math.round((stats.attemptedCount / stats.totalCount) * 100)
              : 0;
            const urlSlug = encodeURIComponent(s.id);

            return (
              <div
                key={s.id}
                className="group bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-3 min-w-0"
              >
                <div className="space-y-2.5 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0"
                      style={{ backgroundColor: s.badgeBg, color: s.accentColor }}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    {/* Normal font for code badge instead of monospace */}
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 font-sans">
                      Code {s.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      <Link href={`/dashboard/practice/${urlSlug}`}>{s.name}</Link>
                    </h3>
                    {/* Meta text >= 13px */}
                    <p className="text-[13px] text-slate-600 font-medium mt-0.5">
                      {s.unitsCount} syllabus units • 20 practice tests per unit
                    </p>
                  </div>

                  {/* Progress Line and Thin Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className={hasAttempts ? "text-slate-900 font-bold" : "text-slate-400"}>
                        {hasAttempts ? `${stats?.attemptedCount} / ${s.totalTests} done` : "Not started"}
                      </span>
                      {hasAttempts && stats?.accuracy !== null && (
                        <span className="text-blue-700 font-bold">{stats?.accuracy}% acc</span>
                      )}
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2.5 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={
                      hasAttempts && stats?.nextUnattemptedTestId
                        ? `/test/${stats.nextUnattemptedTestId}`
                        : `/test/practice-${s.id}-unit1-test1`
                    }
                    className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-2xs transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>{hasAttempts ? "Continue" : "Start"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/dashboard/practice/${urlSlug}`}
                    className="py-1.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all text-center"
                  >
                    <span>Units</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-10 text-center space-y-3 shadow-2xs">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-sm sm:text-base font-bold text-slate-700">No matching subjects found</h3>
            <p className="text-xs text-slate-400">Try modifying your search query or switching streams.</p>
          </div>
        )}
      </div>
    </div>
  );
}
