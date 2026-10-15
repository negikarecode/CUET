"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  getPYQTestsForSubject,
  getAllPYQTests,
  PYQTestItem,
} from "@/lib/data/subjects";
import {
  ArrowRight,
  Atom,
  FlaskConical,
  Binary,
  Dna,
  Calculator,
  Briefcase,
  TrendingUp,
  ScrollText,
  Landmark,
  Globe,
  BrainCircuit,
  RotateCcw,
  Users,
  Activity,
  Laptop,
  Home,
  Tv,
  Leaf,
  Palette,
  Sprout,
  Footprints,
  ChevronDown,
  Info,
  AlertCircle,
  Play,
  CheckCircle2,
  Target,
  FileText,
  Trophy,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { getTestAttemptStats, normalizeSubject } from "@/lib/analytics";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { useTarget } from "@/lib/hooks/useTarget";

type SubjectKey =
  | "all"
  | "physics"
  | "chemistry"
  | "mathematics"
  | "biology"
  | "accountancy"
  | "business-studies"
  | "economics"
  | "history"
  | "political-science"
  | "geography"
  | "psychology"
  | "sociology"
  | "physical-education"
  | "computer-science"
  | "home-science"
  | "mass-media"
  | "environmental-studies"
  | "fine-arts"
  | "agriculture"
  | "anthropology"
  | "english"
  | "general-test";

type SortOption = "newest" | "oldest" | "best-score" | "lowest-score";

type StatusFilter = "all" | "attempted" | "not-attempted";

interface SubjectMeta {
  key: SubjectKey;
  name: string;
  code: string;
  isLive: boolean;
  paperCount: number;
  totalQuestions: number;
  durationMinutes: number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

function makeSubjectMeta(
  key: Exclude<SubjectKey, "all">,
  name: string,
  code: string,
  durationMinutes: number,
  subtitle: string,
  icon: React.ComponentType<{ className?: string }>
): SubjectMeta {
  const tests = getPYQTestsForSubject(key);
  const count = tests.length;
  const isLive = count > 0;
  return {
    key,
    name,
    code,
    isLive,
    paperCount: count,
    totalQuestions: count * 50,
    durationMinutes,
    subtitle,
    icon,
  };
}

const PYQ_SUBJECT_CONFIGS: Record<Exclude<SubjectKey, "all">, SubjectMeta> = {
  physics: makeSubjectMeta("physics", "Physics", "322", 60, "Official NTA CUET CBT shift papers with complete step-by-step NCERT solutions.", Atom),
  chemistry: makeSubjectMeta("chemistry", "Chemistry", "306", 60, "Official NTA CUET CBT shift papers covering Physical, Organic, and Inorganic Chemistry.", FlaskConical),
  mathematics: makeSubjectMeta("mathematics", "Mathematics", "319", 60, "Official NTA CUET CBT shift papers covering Calculus, Algebra, Vectors, and Probability.", Binary),
  biology: makeSubjectMeta("biology", "Biology", "304", 45, "Official NTA CUET CBT shift papers covering Genetics, Reproduction, and Biotechnology with NCERT references.", Dna),
  accountancy: makeSubjectMeta("accountancy", "Accountancy", "301", 60, "Official NTA CUET CBT shift papers covering Partnership, Company Accounts, and Financial Analysis.", Calculator),
  "business-studies": makeSubjectMeta("business-studies", "Business Studies", "305", 45, "Official NTA CUET CBT shift papers covering Principles of Management and Marketing.", Briefcase),
  economics: makeSubjectMeta("economics", "Economics", "309", 60, "Official NTA CUET CBT shift papers covering Introductory Macroeconomics and Indian Economy.", TrendingUp),
  history: makeSubjectMeta("history", "History", "314", 45, "Official NTA CUET CBT shift papers covering Themes in Indian History Parts I, II, and III.", ScrollText),
  "political-science": makeSubjectMeta("political-science", "Political Science", "323", 45, "Official NTA CUET CBT shift papers covering Contemporary World Politics and Politics in India.", Landmark),
  geography: makeSubjectMeta("geography", "Geography", "313", 45, "Official NTA CUET CBT shift papers covering Human Geography and India: People and Economy.", Globe),
  psychology: makeSubjectMeta("psychology", "Psychology", "324", 45, "Official NTA CUET CBT shift papers covering Psychological Disorders, Personality, and Social Influence.", BrainCircuit),
  sociology: makeSubjectMeta("sociology", "Sociology", "326", 45, "Official NTA CUET CBT shift papers covering Indian Society, Social Institutions, and Social Change.", Users),
  "physical-education": makeSubjectMeta("physical-education", "Physical Education", "321", 45, "Official NTA CUET CBT shift papers covering Sports Events, Yoga, and Biomechanics.", Activity),
  "computer-science": makeSubjectMeta("computer-science", "Computer Science / IP", "308", 60, "Official NTA CUET CBT shift papers covering Python, SQL Databases, and Computer Networks.", Laptop),
  "home-science": makeSubjectMeta("home-science", "Home Science", "315", 45, "Official NTA CUET CBT shift papers covering Clinical Nutrition, Human Development, and Apparel.", Home),
  "mass-media": makeSubjectMeta("mass-media", "Mass Media & Communication", "318", 45, "Official NTA CUET CBT shift papers covering Journalism, Cinema, Radio, and New Media.", Tv),
  "environmental-studies": makeSubjectMeta("environmental-studies", "Environmental Science", "307", 45, "Official NTA CUET CBT shift papers covering Ecosystems, Pollution, and Sustainable Development.", Leaf),
  "fine-arts": makeSubjectMeta("fine-arts", "Fine Arts / Visual Arts", "312", 45, "Official NTA CUET CBT shift papers covering Miniature Paintings, Bengal School, and Modern Art.", Palette),
  agriculture: makeSubjectMeta("agriculture", "Agriculture", "302", 45, "Official NTA CUET CBT shift papers covering Agrometeorology, Genetics, Livestock, and Crop Production.", Sprout),
  anthropology: makeSubjectMeta("anthropology", "Anthropology", "303", 45, "Official NTA CUET CBT shift papers covering Physical, Archaeological, and Social Anthropology.", Footprints),
  english: makeSubjectMeta("english", "English Language", "101", 45, "Official NTA CUET CBT shift papers covering Reading Comprehension, Vocabulary, and Verbal Ability.", FileText),
  "general-test": makeSubjectMeta("general-test", "General Aptitude Test", "501", 60, "Official NTA CUET CBT shift papers covering General Knowledge, Mental Ability, and Quantitative Aptitude.", Trophy),
};

const STREAM_GROUPS: {
  name: string;
  subjects: Array<Exclude<SubjectKey, "all">>;
}[] = [
  {
    name: "Science Stream",
    subjects: [
      "physics",
      "chemistry",
      "mathematics",
      "biology",
      "computer-science",
      "environmental-studies",
      "agriculture",
    ],
  },
  {
    name: "Commerce Stream",
    subjects: [
      "accountancy",
      "business-studies",
      "economics",
      "mathematics",
    ],
  },
  {
    name: "Humanities & Arts",
    subjects: [
      "history",
      "political-science",
      "geography",
      "psychology",
      "sociology",
      "physical-education",
      "home-science",
      "mass-media",
      "fine-arts",
      "anthropology",
    ],
  },
  {
    name: "Languages & General Test",
    subjects: ["english", "general-test"],
  },
];

// AA-compliant badge color classes per subject
const SUBJECT_BADGE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  physics: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  chemistry: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  mathematics: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  biology: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  accountancy: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  "business-studies": { bg: "bg-orange-50", text: "text-orange-800", border: "border-orange-200" },
  economics: { bg: "bg-cyan-50", text: "text-cyan-800", border: "border-cyan-200" },
  history: { bg: "bg-stone-100", text: "text-stone-800", border: "border-stone-300" },
  "political-science": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  geography: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  psychology: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  sociology: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
  "physical-education": { bg: "bg-lime-50", text: "text-lime-800", border: "border-lime-200" },
  "computer-science": { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  "home-science": { bg: "bg-rose-50", text: "text-rose-800", border: "border-rose-200" },
  "mass-media": { bg: "bg-fuchsia-50", text: "text-fuchsia-700", border: "border-fuchsia-200" },
  "environmental-studies": { bg: "bg-green-50", text: "text-green-800", border: "border-green-200" },
  "fine-arts": { bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-200" },
  agriculture: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
  anthropology: { bg: "bg-zinc-100", text: "text-zinc-800", border: "border-zinc-300" },
  english: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200" },
  "general-test": { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200" },
};

function getSubjectBadge(subjectSlug?: string) {
  const norm = subjectSlug?.toLowerCase().replace(/_/g, "-") || "";
  return (
    SUBJECT_BADGE_STYLES[norm] || {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-200",
    }
  );
}

function getTestMonthLabel(test: PYQTestItem): string {
  if (test.examDate && /^\d{4}-\d{2}-\d{2}$/.test(test.examDate)) {
    const parts = test.examDate.split("-");
    const yearStr = parts[0] || "";
    const monthStr = parts[1] || "";
    const monthIndex = parseInt(monthStr, 10) - 1;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${months[monthIndex]} ${yearStr}`;
    }
  }
  if (test.dateDisplay) {
    const match = test.dateDisplay.match(/([A-Za-z]+)\s+(\d{4})/);
    if (match) {
      return `${match[1]} ${match[2]}`;
    }
  }
  if (test.year) {
    return `CUET ${test.year}`;
  }
  return "Past Papers";
}

function formatShortPaperTitle(test: PYQTestItem): string {
  if (test.dateDisplay && test.shift) {
    return `${test.dateDisplay} · ${test.shift}`;
  }
  if (test.dateDisplay) {
    return test.dateDisplay;
  }
  const match = test.label.match(
    /\((\d{1,2}\s+[A-Za-z]+\s+\d{4})\s+(Shift\s+\d+)\)/i
  );
  if (match && match[1] && match[2]) {
    return `${match[1]} · ${match[2]}`;
  }
  if (test.shift && test.year) {
    return `CUET ${test.year} · ${test.shift}`;
  }
  return test.label;
}

interface InProgressSessionInfo {
  testId: string;
  testTitle: string;
  answeredCount: number;
  remainingMinutes: number;
}

export default function PYQsPage() {
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const targetData = useTarget();

  // Filter & Display State
  const [selectedTab, setSelectedTab] = useState<SubjectKey>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // In-progress test session state
  const [inProgressSession, setInProgressSession] = useState<InProgressSessionInfo | null>(null);

  // Restore filter and loaded count from sessionStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedCount = sessionStorage.getItem("cuet_pyqs_visible_count");
      if (savedCount) {
        const parsed = parseInt(savedCount, 10);
        if (!isNaN(parsed) && parsed >= 24) setVisibleCount(parsed);
      }
      const savedTab = sessionStorage.getItem("cuet_pyqs_tab");
      if (savedTab) setSelectedTab(savedTab as SubjectKey);
      const savedStatus = sessionStorage.getItem("cuet_pyqs_status");
      if (savedStatus) setStatusFilter(savedStatus as StatusFilter);
      const savedSort = sessionStorage.getItem("cuet_pyqs_sort");
      if (savedSort) setSortOption(savedSort as SortOption);
    } catch {}
  }, []);

  // Persist filter and loaded count to sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem("cuet_pyqs_visible_count", String(visibleCount));
      sessionStorage.setItem("cuet_pyqs_tab", selectedTab);
      sessionStorage.setItem("cuet_pyqs_status", statusFilter);
      sessionStorage.setItem("cuet_pyqs_sort", sortOption);
    } catch {}
  }, [visibleCount, selectedTab, statusFilter, sortOption]);

  // Check for in-progress unsubmitted CBT session from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (!key || !key.startsWith("cuet_cbt_session_")) continue;
        const raw = window.localStorage.getItem(key);
        if (!raw) continue;
        const session = JSON.parse(raw);
        if (
          session &&
          !session.isSubmitted &&
          session.testId &&
          (session.testId.includes("-pyq") || session.testId.includes("pyq"))
        ) {
          const qStates = session.questionStates || {};
          const answeredCount = Object.values(qStates).filter(
            (q: any) => q && q.selectedOption !== null
          ).length;
          const remainingMinutes = Math.max(
            1,
            Math.round((session.remainingSeconds || 0) / 60)
          );
          setInProgressSession({
            testId: session.testId,
            testTitle: session.testMeta?.title || session.testId,
            answeredCount,
            remainingMinutes,
          });
          break;
        }
      }
    } catch (err) {
      console.warn("[PYQsPage] Could not check in-progress sessions:", err);
    }
  }, []);

  const allPYQsList: PYQTestItem[] = useMemo(() => {
    return getAllPYQTests();
  }, []);

  // Filter by subject
  const subjectFilteredPapers = useMemo(() => {
    if (selectedTab !== "all") {
      return getPYQTestsForSubject(selectedTab);
    }
    return allPYQsList;
  }, [allPYQsList, selectedTab]);

  // Precompute stats map for fast filtering & sorting
  const statsMap = useMemo(() => {
    if (!isClient) return new Map<string, ReturnType<typeof getTestAttemptStats>>();
    const map = new Map<string, ReturnType<typeof getTestAttemptStats>>();
    for (const test of allPYQsList) {
      map.set(test.id, getTestAttemptStats(testAttempts, test.id));
    }
    return map;
  }, [isClient, allPYQsList, testAttempts]);

  // Progress stats summary (follows current subject filters)
  const progressStats = useMemo(() => {
    if (!isClient) {
      return { total: subjectFilteredPapers.length, attempted: 0 };
    }
    const total = subjectFilteredPapers.length;
    const attemptedList = subjectFilteredPapers.filter((t) => {
      const st = statsMap.get(t.id);
      return st?.hasAttempted && st.bestAttempt !== null;
    });
    return { total, attempted: attemptedList.length };
  }, [subjectFilteredPapers, statsMap, isClient]);

  // Filter by attempt status (All / Attempted / Not attempted)
  const statusFilteredPapers = useMemo(() => {
    if (statusFilter === "all" || !isClient) return subjectFilteredPapers;
    return subjectFilteredPapers.filter((test) => {
      const stats = statsMap.get(test.id);
      const hasAttempted = Boolean(stats?.hasAttempted && stats.bestAttempt !== null);
      return statusFilter === "attempted" ? hasAttempted : !hasAttempted;
    });
  }, [subjectFilteredPapers, statusFilter, statsMap, isClient]);

  // Sort papers according to sortOption
  const sortedPapers = useMemo(() => {
    const list = [...statusFilteredPapers];
    return list.sort((a, b) => {
      if (sortOption === "newest") {
        const dateA = a.examDate || "";
        const dateB = b.examDate || "";
        if (dateB !== dateA) return dateB.localeCompare(dateA);
        return (b.shift || "").localeCompare(a.shift || "");
      }
      if (sortOption === "oldest") {
        const dateA = a.examDate || "";
        const dateB = b.examDate || "";
        if (dateA !== dateB) return dateA.localeCompare(dateB);
        return (a.shift || "").localeCompare(b.shift || "");
      }
      if (sortOption === "best-score") {
        const scoreA = statsMap.get(a.id)?.bestAttempt?.totalMarks ?? -99999;
        const scoreB = statsMap.get(b.id)?.bestAttempt?.totalMarks ?? -99999;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return (b.examDate || "").localeCompare(a.examDate || "");
      }
      if (sortOption === "lowest-score") {
        const hasA = statsMap.get(a.id)?.hasAttempted;
        const hasB = statsMap.get(b.id)?.hasAttempted;
        if (hasA && !hasB) return -1;
        if (!hasA && hasB) return 1;
        if (hasA && hasB) {
          const scoreA = statsMap.get(a.id)?.bestAttempt?.totalMarks ?? 0;
          const scoreB = statsMap.get(b.id)?.bestAttempt?.totalMarks ?? 0;
          if (scoreA !== scoreB) return scoreA - scoreB;
        }
        return (b.examDate || "").localeCompare(a.examDate || "");
      }
      return 0;
    });
  }, [statusFilteredPapers, sortOption, statsMap]);

  // Paginated visible subset
  const visiblePapers = useMemo(() => {
    return sortedPapers.slice(0, visibleCount);
  }, [sortedPapers, visibleCount]);

  // Always group visible papers by month
  const groupedSections = useMemo(() => {
    const groups: { key: string; label: string; count: number; tests: PYQTestItem[] }[] = [];
    const map = new Map<string, PYQTestItem[]>();

    for (const test of visiblePapers) {
      const monthKey = getTestMonthLabel(test);
      if (!map.has(monthKey)) {
        map.set(monthKey, []);
      }
      map.get(monthKey)!.push(test);
    }

    for (const [key, tests] of map.entries()) {
      groups.push({
        key,
        label: key,
        count: tests.length,
        tests,
      });
    }
    return groups;
  }, [visiblePapers]);

  // Recommended subjects for user's target dream college & course
  const recommendedSubjects = useMemo(() => {
    if (
      !targetData.hasTarget ||
      !targetData.requiredSubjects ||
      targetData.requiredSubjects.length === 0
    ) {
      return [];
    }
    const reqKeys = targetData.requiredSubjects.map(
      (s) => normalizeSubject(s).key
    );

    const seen = new Set<string>();
    const list: {
      subKey: SubjectKey;
      meta: SubjectMeta;
      nextPaper: PYQTestItem | null;
      attemptedCount: number;
      totalCount: number;
    }[] = [];

    for (const key of reqKeys) {
      if (seen.has(key)) continue;
      seen.add(key);

      const meta = PYQ_SUBJECT_CONFIGS[key as Exclude<SubjectKey, "all">];
      if (!meta) continue;
      const papers = getPYQTestsForSubject(key);
      if (papers.length === 0) continue;

      let attempted = 0;
      let nextUnattempted: PYQTestItem | null = null;

      for (const p of papers) {
        const stats = statsMap.get(p.id);
        if (stats?.hasAttempted) {
          attempted++;
        } else if (!nextUnattempted) {
          nextUnattempted = p;
        }
      }

      list.push({
        subKey: key as SubjectKey,
        meta,
        nextPaper: nextUnattempted || papers[0] || null,
        attemptedCount: attempted,
        totalCount: papers.length,
      });
    }

    return list;
  }, [targetData, statsMap]);

  if (!isClient) {
    return <div className="min-h-screen bg-[#F8FAFC]" />;
  }

  // Render a standard PYQ card
  const renderCard = (test: PYQTestItem) => {
    const stats = statsMap.get(test.id) || {
      attemptsCount: 0,
      bestAttempt: null,
      latestAttempt: null,
      hasAttempted: false,
    };
    const hasAttempted = stats.hasAttempted && stats.bestAttempt !== null;
    const best = stats.bestAttempt;
    const shortTitle = formatShortPaperTitle(test);
    const badgeStyle = getSubjectBadge(test.subjectSlug);
    const isNegativeScore = (best?.totalMarks ?? 0) < 0;

    return (
      <div
        key={test.id}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col h-full min-w-0 justify-between"
      >
        <div className="space-y-2.5 min-w-0 flex-1">
          {/* Subject Tag & Optional Verified Badge */}
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span
              className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-md border tracking-tight truncate ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
            >
              {test.subjectName}
            </span>
            {((test as any).status === "verified" ||
              (test as any).status === "official_verified") && (
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Verified Key</span>
              </span>
            )}
          </div>

          {/* Paper Title */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {shortTitle}
            </h3>
          </div>

          {/* Status Line */}
          {hasAttempted && best ? (
            <div className="text-[13px] font-semibold text-slate-800 flex items-center gap-1.5 flex-wrap">
              <span>
                Best{" "}
                <span
                  className={
                    isNegativeScore
                      ? "text-rose-600 font-bold inline-flex items-center gap-1"
                      : "text-slate-900 font-bold"
                  }
                >
                  {best.totalMarks} / {best.maxMarks}
                  {isNegativeScore && (
                    <span
                      tabIndex={0}
                      role="note"
                      aria-label="Includes negative marking (+5 / -1). Wrong answers reduce score below 0."
                      title="Includes negative marking (+5 / -1). Wrong answers reduce score below 0."
                      className="cursor-help inline-flex items-center focus:outline-none focus:ring-1 focus:ring-rose-500 rounded-full"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    </span>
                  )}
                </span>
              </span>
              <span className="text-slate-400 font-normal">·</span>
              <span className="text-slate-600 font-medium">
                {best.accuracyPercentage}%
              </span>
            </div>
          ) : (
            <p className="text-[13px] text-slate-400 font-normal">
              Not attempted yet
            </p>
          )}
        </div>

        {/* Bottom Actions: Pinned with mt-auto */}
        <div className="pt-3 border-t border-slate-100 mt-4 flex items-center gap-2 w-full">
          {hasAttempted && best ? (
            <>
              <Link
                href={`/dashboard/pyqs/analysis/${best.id || test.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[13px] shadow-sm hover:shadow-md transition-all text-center"
              >
                <span>Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/test/${test.id}?reattempt=true`}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[13px] transition-all text-center shrink-0"
              >
                <span>Re-attempt</span>
              </Link>
            </>
          ) : (
            <Link
              href={`/test/${test.id}`}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[13px] shadow-sm hover:shadow-md transition-all text-center"
            >
              <span>Start</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto space-y-6">
      {/* 1. Header: title and one line */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Previous Year Questions
            </h1>
            <div className="relative group inline-flex items-center">
              <button
                type="button"
                aria-label="Answer keys verification notice"
                className="p-1 text-slate-400 hover:text-slate-600 focus:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-colors cursor-help"
              >
                <Info className="w-4 h-4" />
              </button>
              <div
                role="tooltip"
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block group-focus-within:block z-30 w-72 p-2.5 bg-slate-900 text-white text-[12px] font-normal rounded-xl shadow-lg leading-snug pointer-events-none"
              >
                Answer keys are provisional and under verification against official NTA response sheets.
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
              </div>
            </div>
          </div>
          <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed max-w-3xl">
            Official NTA CUET shift papers · 50 questions · 60 mins · +5 / -1 marking · {progressStats.attempted} of {progressStats.total} attempted
          </p>
        </div>

        {/* Sibling navigation matching Mocks page */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all"
          >
            <span>Domain Mock Exams</span>
          </Link>
          <Link
            href="/dashboard/practice"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all"
          >
            <span>Unit Practice Tests</span>
          </Link>
        </div>
      </div>

      {/* In-Progress Unsubmitted Session Strip (if any) */}
      {inProgressSession && (
        <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border border-blue-200/80 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                  Continue where you left off
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {inProgressSession.testTitle}
                </h4>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                {inProgressSession.answeredCount} questions answered ·{" "}
                {inProgressSession.remainingMinutes} mins remaining
              </p>
            </div>
          </div>
          <Link
            href={`/test/${inProgressSession.testId}`}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <span>Resume Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 2. One slim toolbar row (same style as Mocks) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 min-w-0">
            {/* Subject Selector grouped by stream */}
            <div className="relative flex-1 min-w-0 sm:min-w-[240px]">
              <select
                aria-label="Filter by Subject"
                value={selectedTab}
                onChange={(e) => {
                  setSelectedTab(e.target.value as SubjectKey);
                  setVisibleCount(24);
                }}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-[13px] px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-8 transition-colors"
              >
                <option value="all">All Subjects (251 Papers)</option>
                {STREAM_GROUPS.map((group) => (
                  <optgroup key={group.name} label={group.name}>
                    {group.subjects.map((subKey) => {
                      const meta = PYQ_SUBJECT_CONFIGS[subKey];
                      if (!meta) return null;
                      return (
                        <option
                          key={`opt-${group.name}-${subKey}`}
                          value={subKey}
                        >
                          {meta.name} (Code {meta.code})
                        </option>
                      );
                    })}
                  </optgroup>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Selector */}
            <div className="relative sm:w-[200px] shrink-0">
              <select
                aria-label="Sort papers"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-[13px] px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-8 transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="best-score">Best Score (High to Low)</option>
                <option value="lowest-score">Lowest Score (Low to High)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Status Filter Segmented Control */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[12px] font-semibold shrink-0 justify-center">
            <button
              type="button"
              onClick={() => {
                setStatusFilter("all");
                setVisibleCount(24);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "all"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => {
                setStatusFilter("attempted");
                setVisibleCount(24);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "attempted"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Attempted
            </button>
            <button
              type="button"
              onClick={() => {
                setStatusFilter("not-attempted");
                setVisibleCount(24);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "not-attempted"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Not attempted
            </button>
          </div>
        </div>
      </div>

      {/* 3. Optional "Recommended for your target" row */}
      {targetData.hasTarget &&
        recommendedSubjects.length > 0 &&
        selectedTab === "all" &&
        statusFilter === "all" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Recommended for your target
              </h2>
            </div>
            <p className="text-[12px] font-medium text-slate-500">
              Required for <strong>{targetData.course}</strong> at{" "}
              <strong>{targetData.college}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
            {recommendedSubjects.map(
              ({ subKey, meta, nextPaper, attemptedCount, totalCount }) => {
                const Icon = meta.icon;
                const shortPaperTitle = nextPaper
                  ? formatShortPaperTitle(nextPaper)
                  : `${meta.name} Shift Paper`;

                return (
                  <div
                    key={subKey}
                    className="bg-white rounded-2xl border border-blue-200/80 p-4 sm:p-5 shadow-xs hover:border-blue-400 transition-all flex flex-col h-full min-w-0 justify-between relative overflow-hidden"
                  >
                    <div className="space-y-2.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2.5 pt-0.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-slate-900 leading-tight truncate">
                            {meta.name}
                          </h3>
                          <span className="text-[12px] text-slate-500 font-medium">
                            Code {meta.code} · {attemptedCount} of {totalCount} attempted
                          </span>
                        </div>
                      </div>

                      <div className="pt-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                          Next Paper
                        </span>
                        <p className="text-[13px] font-bold text-slate-800 truncate">
                          {shortPaperTitle}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-3 flex items-center gap-2 w-full">
                      {nextPaper ? (
                        <Link
                          href={`/test/${nextPaper.id}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[13px] shadow-sm hover:shadow-md transition-all text-center"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Start next paper</span>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTab(subKey);
                            setVisibleCount(24);
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-[13px] hover:bg-slate-200 transition-all text-center"
                        >
                          <span>View All Papers</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* 4. Papers Grid Grouped by Month */}
      {groupedSections.length > 0 ? (
        <div className="space-y-6">
          {groupedSections.map((section) => (
            <div key={section.key} className="space-y-3">
              {/* Simple sticky month header with thin divider */}
              <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-xs py-2 border-b border-slate-200/80 flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-slate-800">
                  {section.label}{" "}
                  <span className="text-slate-400 font-normal">
                    · {section.count}{" "}
                    {section.count === 1 ? "paper" : "papers"}
                  </span>
                </h2>
              </div>

              {/* 3 columns desktop, 2 on tablet, 1 on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
                {section.tests.map(renderCard)}
              </div>
            </div>
          ))}

          {/* Load More Pagination Button */}
          {visibleCount < sortedPapers.length && (
            <div className="pt-4 pb-2 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <span>Load More Official Papers</span>
                <span className="text-slate-400 font-medium">
                  (Showing {Math.min(visibleCount, sortedPapers.length)} of{" "}
                  {sortedPapers.length})
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-xs text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
            <RotateCcw className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              No matching past year papers found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Try adjusting your status filter or selected subject to view other official CUET shift papers.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setStatusFilter("all");
                setSelectedTab("all");
                setVisibleCount(24);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
            >
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>
      )}

      {/* Answer-key notice at bottom of the page */}
      <p className="text-[13px] text-slate-400 text-center pt-4 pb-2">
        Answer keys are provisional and under verification against official NTA response sheets.
      </p>
    </div>
  );
}
