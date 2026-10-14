"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  getPYQTestsForSubject,
  getAllPYQTests,
  PYQTestItem,
} from "@/lib/data/subjects";
import {
  FileText,
  ArrowRight,
  Atom,
  Timer,
  FileCheck2,
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
  Trophy,
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
  AlertTriangle,
  BarChart2,
  Calendar,
  Clock,
  AlertCircle,
  Play,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { getTestAttemptStats } from "@/lib/analytics";
import { useIsClient } from "@/lib/hooks/useIsClient";

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

type StreamKey = "all" | "science" | "commerce" | "humanities" | "common";

type SortOption = "newest" | "oldest" | "best-score" | "lowest-score";

type StatusFilter = "all" | "attempted" | "not-attempted";

type GroupByOption = "month" | "subject";

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

interface StreamInfo {
  key: StreamKey;
  name: string;
  shortName: string;
  badge: string;
  accentBg: string;
  accentText: string;
  subjects: Array<Exclude<SubjectKey, "all">>;
}

const STREAM_CONFIGS: Record<Exclude<StreamKey, "all">, StreamInfo> = {
  science: {
    key: "science",
    name: "Science Stream",
    shortName: "Science",
    badge: "4 Core Domains • 90 Official Papers Live",
    accentBg: "#E0F2FE",
    accentText: "#0369A1",
    subjects: ["physics", "chemistry", "mathematics", "biology"],
  },
  commerce: {
    key: "commerce",
    name: "Commerce Stream",
    shortName: "Commerce",
    badge: "4 Core Domains • 81 Official Papers Live",
    accentBg: "#FEF3C7",
    accentText: "#D97706",
    subjects: ["accountancy", "business-studies", "economics", "mathematics"],
  },
  humanities: {
    key: "humanities",
    name: "Humanities & Arts",
    shortName: "Humanities",
    badge: "5 Core Domains • 55 Official Papers Live",
    accentBg: "#FCE7F3",
    accentText: "#BE185D",
    subjects: [
      "history",
      "political-science",
      "geography",
      "psychology",
      "sociology",
    ],
  },
  common: {
    key: "common",
    name: "Common & Languages",
    shortName: "General/Lang",
    badge: "2 Subjects • 50 Official Papers Live",
    accentBg: "#F0FDF4",
    accentText: "#15803D",
    subjects: ["english", "general-test"],
  },
};

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

// 14 Core CUET Subjects for fast chips row
const CORE_14_SUBJECTS: Array<{ key: SubjectKey; name: string; code: string }> = [
  { key: "physics", name: "Physics", code: "322" },
  { key: "chemistry", name: "Chemistry", code: "306" },
  { key: "mathematics", name: "Mathematics", code: "319" },
  { key: "biology", name: "Biology", code: "304" },
  { key: "accountancy", name: "Accountancy", code: "301" },
  { key: "business-studies", name: "Business Studies", code: "305" },
  { key: "economics", name: "Economics", code: "309" },
  { key: "history", name: "History", code: "314" },
  { key: "political-science", name: "Pol Science", code: "323" },
  { key: "geography", name: "Geography", code: "313" },
  { key: "psychology", name: "Psychology", code: "324" },
  { key: "sociology", name: "Sociology", code: "326" },
  { key: "english", name: "English", code: "101" },
  { key: "general-test", name: "General Test", code: "501" },
];

// Stable AA-compliant badge color classes per subject
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

function formatAttemptDate(isoStr?: string | null): string {
  if (!isoStr) return "";
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
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

interface InProgressSessionInfo {
  testId: string;
  testTitle: string;
  answeredCount: number;
  remainingMinutes: number;
}

export default function PYQsPage() {
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);

  // Filter & Display State
  const [selectedStream, setSelectedStream] = useState<StreamKey>("all");
  const [selectedTab, setSelectedTab] = useState<SubjectKey>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [groupBy, setGroupBy] = useState<GroupByOption>("month");
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
      const savedStream = sessionStorage.getItem("cuet_pyqs_stream");
      if (savedStream) setSelectedStream(savedStream as StreamKey);
      const savedTab = sessionStorage.getItem("cuet_pyqs_tab");
      if (savedTab) setSelectedTab(savedTab as SubjectKey);
      const savedStatus = sessionStorage.getItem("cuet_pyqs_status");
      if (savedStatus) setStatusFilter(savedStatus as StatusFilter);
      const savedSort = sessionStorage.getItem("cuet_pyqs_sort");
      if (savedSort) setSortOption(savedSort as SortOption);
      const savedGroup = sessionStorage.getItem("cuet_pyqs_group_by");
      if (savedGroup) setGroupBy(savedGroup as GroupByOption);
    } catch {}
  }, []);

  // Persist filter and loaded count to sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem("cuet_pyqs_visible_count", String(visibleCount));
      sessionStorage.setItem("cuet_pyqs_stream", selectedStream);
      sessionStorage.setItem("cuet_pyqs_tab", selectedTab);
      sessionStorage.setItem("cuet_pyqs_status", statusFilter);
      sessionStorage.setItem("cuet_pyqs_sort", sortOption);
      sessionStorage.setItem("cuet_pyqs_group_by", groupBy);
    } catch {}
  }, [visibleCount, selectedStream, selectedTab, statusFilter, sortOption, groupBy]);

  // Check for in-progress unsubmitted CBT session from localStorage
  /*
    CONTINUE WHERE YOU LEFT OFF STRIP
    Detects active unsubmitted CBT sessions for PYQ exams from localStorage (cuet_cbt_session_*).
    TODO: Once backend sync / remote session resumption is enabled in production,
    synchronize this state with server-side attempt records for seamless cross-device resumption.
  */
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

  // 1. Filter by stream & subject
  const subjectFilteredPapers = useMemo(() => {
    let pool = allPYQsList;
    if (selectedTab !== "all") {
      return getPYQTestsForSubject(selectedTab);
    }
    if (selectedStream !== "all") {
      const allowed = STREAM_CONFIGS[selectedStream].subjects;
      return pool.filter((t) => allowed.includes(t.subjectSlug as any));
    }
    return pool;
  }, [allPYQsList, selectedStream, selectedTab]);

  // 2. Precompute stats map for fast filtering & sorting
  const statsMap = useMemo(() => {
    if (!isClient) return new Map<string, ReturnType<typeof getTestAttemptStats>>();
    const map = new Map<string, ReturnType<typeof getTestAttemptStats>>();
    for (const test of allPYQsList) {
      map.set(test.id, getTestAttemptStats(testAttempts, test.id));
    }
    return map;
  }, [isClient, allPYQsList, testAttempts]);

  // 3. Filter by attempt status (All / Attempted / Not attempted)
  const statusFilteredPapers = useMemo(() => {
    if (statusFilter === "all" || !isClient) return subjectFilteredPapers;
    return subjectFilteredPapers.filter((test) => {
      const stats = statsMap.get(test.id);
      const hasAttempted = Boolean(stats?.hasAttempted && stats.bestAttempt !== null);
      return statusFilter === "attempted" ? hasAttempted : !hasAttempted;
    });
  }, [subjectFilteredPapers, statusFilter, statsMap, isClient]);

  // 4. Sort papers according to sortOption
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
        // Tie-breaker: newest
        return (b.examDate || "").localeCompare(a.examDate || "");
      }
      if (sortOption === "lowest-score") {
        const hasA = statsMap.get(a.id)?.hasAttempted;
        const hasB = statsMap.get(b.id)?.hasAttempted;
        // Unattempted tests go to bottom
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

  // 5. Paginated visible subset
  const visiblePapers = useMemo(() => {
    return sortedPapers.slice(0, visibleCount);
  }, [sortedPapers, visibleCount]);

  // 6. Group visible papers by Month or Subject
  const groupedSections = useMemo(() => {
    if (selectedTab !== "all" || groupBy === "month") {
      // Group by month
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
    } else {
      // Group by subject
      const groups: { key: string; label: string; count: number; tests: PYQTestItem[] }[] = [];
      const map = new Map<string, { label: string; tests: PYQTestItem[] }>();

      for (const test of visiblePapers) {
        const subKey = test.subjectSlug || "general";
        const meta = PYQ_SUBJECT_CONFIGS[subKey as Exclude<SubjectKey, "all">];
        const label = meta ? `${meta.name} (Code ${meta.code})` : test.subjectName;

        if (!map.has(subKey)) {
          map.set(subKey, { label, tests: [] });
        }
        map.get(subKey)!.tests.push(test);
      }

      for (const [key, data] of map.entries()) {
        groups.push({
          key,
          label: data.label,
          count: data.tests.length,
          tests: data.tests,
        });
      }
      return groups;
    }
  }, [visiblePapers, selectedTab, groupBy]);

  // Progress stats summary
  const progressStats = useMemo(() => {
    if (!isClient) {
      return { total: subjectFilteredPapers.length, attempted: 0, avgBestScore: null };
    }
    const total = subjectFilteredPapers.length;
    const attemptedList = subjectFilteredPapers.filter((t) => {
      const st = statsMap.get(t.id);
      return st?.hasAttempted && st.bestAttempt !== null;
    });
    const attempted = attemptedList.length;

    if (attempted === 0) {
      return { total, attempted: 0, avgBestScore: null };
    }

    const totalScore = attemptedList.reduce((sum, t) => {
      const best = statsMap.get(t.id)?.bestAttempt;
      return sum + (best?.totalMarks ?? 0);
    }, 0);

    const avg = Math.round((totalScore / attempted) * 10) / 10;
    return { total, attempted, avgBestScore: avg };
  }, [subjectFilteredPapers, statsMap, isClient]);

  const activeSubjectInfo = selectedTab !== "all" ? PYQ_SUBJECT_CONFIGS[selectedTab] : null;

  const handleSelectStream = (stream: StreamKey) => {
    setSelectedStream(stream);
    setSelectedTab("all");
    setVisibleCount(24);
  };

  const handleSelectSubject = (subjKey: SubjectKey, streamKey?: StreamKey) => {
    setSelectedTab(subjKey);
    setVisibleCount(24);
    if (streamKey) {
      setSelectedStream(streamKey);
    } else if (subjKey !== "all") {
      for (const [stKey, stInfo] of Object.entries(STREAM_CONFIGS)) {
        if (stInfo.subjects.includes(subjKey as any)) {
          setSelectedStream(stKey as StreamKey);
          break;
        }
      }
    } else {
      setSelectedStream("all");
    }
  };

  const availableSubjectsForDropdown = useMemo(() => {
    if (selectedStream === "all") {
      return Object.values(PYQ_SUBJECT_CONFIGS);
    }
    return STREAM_CONFIGS[selectedStream].subjects.map((k) => PYQ_SUBJECT_CONFIGS[k]);
  }, [selectedStream]);

  if (!isClient) {
    return <div className="min-h-screen bg-[#F8FAFC]" />;
  }

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-5">
      {/* 1. Compressed Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span>Previous Year Questions (PYQs)</span>
          </h1>
          <p className="text-slate-600 font-medium text-xs sm:text-sm">
            Official NTA CUET past shift papers extracted from official candidate response sheets.
          </p>
        </div>

        {/* Compact Progress Summary Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-xs font-semibold text-slate-700 shrink-0 self-start sm:self-auto">
          <BarChart2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>
            {progressStats.attempted} of {progressStats.total} attempted
            {progressStats.avgBestScore !== null
              ? ` · Avg best score ${progressStats.avgBestScore}/250`
              : " · No attempts yet"}
          </span>
        </div>
      </div>

      {/* 2. In-Progress Unsubmitted Session Strip (if any) */}
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

      {/* 3. Slim Combined Toolbar (Stream, Subject, Status, Sort) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Stream Select */}
          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Stream
            </label>
            <div className="relative">
              <select
                value={selectedStream}
                onChange={(e) => handleSelectStream(e.target.value as StreamKey)}
                className="w-full bg-slate-50 hover:bg-slate-100/70 text-slate-800 font-semibold text-xs px-3 py-2 rounded-xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-8 transition-all"
              >
                <option value="all">All Streams (251 Papers)</option>
                <option value="science">Science Stream (90 Papers)</option>
                <option value="commerce">Commerce Stream (81 Papers)</option>
                <option value="humanities">Humanities & Arts (55 Papers)</option>
                <option value="common">Common & Languages (50 Papers)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Subject Select */}
          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Subject
            </label>
            <div className="relative">
              <select
                value={selectedTab}
                onChange={(e) => handleSelectSubject(e.target.value as SubjectKey)}
                className="w-full bg-slate-50 hover:bg-slate-100/70 text-slate-800 font-semibold text-xs px-3 py-2 rounded-xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-8 transition-all"
              >
                <option value="all">
                  {selectedStream === "all"
                    ? "All 14 Core Subjects (251 Papers)"
                    : `All Subjects in ${STREAM_CONFIGS[selectedStream].shortName}`}
                </option>
                {selectedStream === "all" ? (
                  <>
                    <optgroup label="Science Stream">
                      {STREAM_CONFIGS.science.subjects.map((k) => (
                        <option key={`sci-${k}`} value={k}>
                          {PYQ_SUBJECT_CONFIGS[k].name} ({PYQ_SUBJECT_CONFIGS[k].paperCount} Papers)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Commerce Stream">
                      {STREAM_CONFIGS.commerce.subjects.map((k) => (
                        <option key={`com-${k}`} value={k}>
                          {PYQ_SUBJECT_CONFIGS[k].name} ({PYQ_SUBJECT_CONFIGS[k].paperCount} Papers)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Humanities Stream">
                      {STREAM_CONFIGS.humanities.subjects.map((k) => (
                        <option key={`hum-${k}`} value={k}>
                          {PYQ_SUBJECT_CONFIGS[k].name} ({PYQ_SUBJECT_CONFIGS[k].paperCount} Papers)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Common & Languages">
                      {STREAM_CONFIGS.common.subjects.map((k) => (
                        <option key={`comn-${k}`} value={k}>
                          {PYQ_SUBJECT_CONFIGS[k].name} ({PYQ_SUBJECT_CONFIGS[k].paperCount} Papers)
                        </option>
                      ))}
                    </optgroup>
                  </>
                ) : (
                  availableSubjectsForDropdown.map((sub) => (
                    <option key={sub.key} value={sub.key}>
                      {sub.name} ({sub.paperCount} Papers)
                    </option>
                  ))
                )}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Status Segmented Control */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Status Filter
            </label>
            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("all");
                  setVisibleCount(24);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === "all"
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
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
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === "attempted"
                    ? "bg-white text-blue-700 shadow-2xs font-bold"
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
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === "not-attempted"
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Not Attempted
              </button>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Sort By
            </label>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full bg-slate-50 hover:bg-slate-100/70 text-slate-800 font-semibold text-xs px-3 py-2 rounded-xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-8 transition-all"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="best-score">Best Score (High to Low)</option>
                <option value="lowest-score">Lowest Score (Low to High)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Verification Notice Banner below toolbar */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[11px] text-amber-900 bg-amber-50/70 px-3 py-1.5 rounded-xl border border-amber-200/60 font-medium">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Answer keys are provisional and under active verification against official NTA response sheets.</span>
          </div>
          <span className="text-amber-800/80 font-semibold text-[10px]">
            {sortedPapers.length} {sortedPapers.length === 1 ? "paper" : "papers"} matching filters
          </span>
        </div>
      </div>

      {/* 4. Subject Filter Chip Row & Group By Toggle (Shown when "All Core Subjects" is selected) */}
      {selectedTab === "all" && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
          {/* Fast Subject Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <button
              onClick={() => handleSelectSubject("all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedTab === "all"
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Domains ({allPYQsList.length})
            </button>
            {CORE_14_SUBJECTS.map((sub) => {
              const meta = PYQ_SUBJECT_CONFIGS[sub.key as Exclude<SubjectKey, "all">];
              const isSelected = selectedTab === sub.key;
              return (
                <button
                  key={sub.key}
                  onClick={() => handleSelectSubject(sub.key)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 border ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {sub.name}
                  <span className="text-[10px] ml-1 opacity-70">({meta?.paperCount || 0})</span>
                </button>
              );
            })}
          </div>

          {/* Group By Toggle */}
          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto bg-slate-100/90 p-0.5 rounded-xl border border-slate-200/60 text-xs">
            <span className="text-[11px] font-semibold text-slate-500 pl-2">Group by:</span>
            <button
              onClick={() => setGroupBy("month")}
              className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-all ${
                groupBy === "month"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setGroupBy("subject")}
              className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-all ${
                groupBy === "subject"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Subject
            </button>
          </div>
        </div>
      )}

      {/* 5. Active Subject Banner (if specific subject selected) */}
      {activeSubjectInfo && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center shrink-0 text-blue-600">
              <activeSubjectInfo.icon className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {activeSubjectInfo.name} Official Past Shift Papers
                </h2>
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                  {activeSubjectInfo.paperCount} Papers Live
                </span>
                <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md">
                  Code: {activeSubjectInfo.code}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">{activeSubjectInfo.subtitle}</p>
            </div>
          </div>
          <Link
            href={`/dashboard/pyqs/${activeSubjectInfo.key}`}
            className="px-4 py-2 rounded-xl font-semibold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <span>Open Dedicated Subject Suite</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 6. Papers Grid Grouped with Sticky Section Headers */}
      {groupedSections.length > 0 ? (
        <div className="space-y-6">
          {groupedSections.map((section) => (
            <div key={section.key} className="space-y-3">
              {/* Sticky Month / Subject Header */}
              <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-md py-2 px-3 rounded-xl border border-slate-200/70 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {groupBy === "month" ? (
                    <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                  )}
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">{section.label}</h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200/80">
                  {section.count} {section.count === 1 ? "paper" : "papers"}
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full min-w-0">
                {section.tests.map((test) => {
                  const stats = statsMap.get(test.id) || {
                    attemptsCount: 0,
                    bestAttempt: null,
                    latestAttempt: null,
                    hasAttempted: false,
                  };
                  const hasAttempted = stats.hasAttempted && stats.bestAttempt !== null;
                  const best = stats.bestAttempt;

                  // Chronological attempt number of the best attempt
                  const chronologicalAttempts = [...testAttempts]
                    .filter((a) => a.testId === test.id)
                    .sort(
                      (a, b) =>
                        new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
                    );
                  const bestAttemptIndex = chronologicalAttempts.findIndex(
                    (a) => a.id === best?.id
                  );
                  const attemptNumber = bestAttemptIndex >= 0 ? bestAttemptIndex + 1 : null;
                  const lastAttemptDate = formatAttemptDate(
                    stats.latestAttempt?.submittedAt || best?.submittedAt
                  );

                  // Short Title: "13 May 2025 · Shift 1"
                  let shortTitle =
                    test.dateDisplay && test.shift
                      ? `${test.dateDisplay} · ${test.shift}`
                      : test.dateDisplay || test.label;
                  if (shortTitle.startsWith("CUET UG")) {
                    const match = test.label.match(
                      /\((\d{1,2}\s+[A-Za-z]+\s+\d{4})\s+(Shift\s+\d+)\)/i
                    );
                    if (match && match[1] && match[2]) {
                      shortTitle = `${match[1]} · ${match[2]}`;
                    } else if (test.shift && test.year) {
                      shortTitle = `${test.year} · ${test.shift}`;
                    }
                  }

                  const badgeStyle = getSubjectBadge(test.subjectSlug);
                  const isNegativeScore = (best?.totalMarks ?? 0) < 0;

                  return (
                    <div
                      key={test.id}
                      className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col h-full min-w-0 justify-between"
                    >
                      <div className="space-y-3 min-w-0 flex-1">
                        {/* 1. Subject Tag & Verification Badge */}
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

                        {/* 2. Paper Title */}
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                            {shortTitle}
                          </h4>
                        </div>

                        {/* 3. Fixed Status Area (min-h-[64px]) */}
                        {hasAttempted && best ? (
                          <div className="px-3.5 py-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 min-h-[64px] flex flex-col justify-center">
                            <div className="flex items-center justify-between gap-1.5 text-xs font-bold whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                <span className="text-amber-800 font-bold">Best:</span>
                                <span
                                  className={`tabular-nums ${
                                    isNegativeScore
                                      ? "text-rose-600 font-extrabold flex items-center gap-1"
                                      : "text-slate-900 font-bold"
                                  }`}
                                >
                                  {best.totalMarks} / {best.maxMarks}
                                  {isNegativeScore && (
                                    <span
                                      tabIndex={0}
                                      role="note"
                                      aria-label="Includes negative marking (+5 / -1). Wrong answers can reduce your score below 0."
                                      title="Includes negative marking (+5 / -1). Wrong answers can reduce your score below 0."
                                      className="cursor-help inline-flex items-center focus:outline-none focus:ring-1 focus:ring-rose-500 rounded-full"
                                    >
                                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                    </span>
                                  )}
                                </span>
                              </div>
                              <span className="text-[11px] font-semibold text-slate-600">
                                {best.accuracyPercentage}% acc
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1">
                              <span>
                                {stats.attemptsCount}{" "}
                                {stats.attemptsCount === 1 ? "attempt" : "attempts"}
                                {attemptNumber ? ` (Best: #${attemptNumber})` : ""}
                              </span>
                              {lastAttemptDate && (
                                <span className="text-slate-400">Last: {lastAttemptDate}</span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-dashed border-slate-200 min-h-[64px] flex items-center justify-center gap-2 text-slate-400">
                            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="text-xs font-medium">Not attempted yet</span>
                          </div>
                        )}

                        {/* 4. Meta Row (>=13px with text-slate-600) */}
                        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600 whitespace-nowrap overflow-hidden pt-1">
                          <FileCheck2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{test.questions} Qs</span>
                          <span className="text-slate-300">·</span>
                          <Timer className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{test.duration}</span>
                          <span className="text-slate-300">·</span>
                          <span className="font-mono text-slate-600 font-semibold">+5 / -1</span>
                        </div>
                      </div>

                      {/* 5. Action Buttons pinned to bottom with mt-auto */}
                      <div className="pt-3 border-t border-slate-100 mt-4 w-full min-w-0">
                        {hasAttempted ? (
                          <div className="flex flex-col gap-2 w-full min-w-0">
                            {/* Primary filled button: Scorecard */}
                            <Link
                              href={`/dashboard/pyqs/analysis/${best?.id || test.id}`}
                              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-2xs hover:shadow-xs transition-all min-w-0"
                            >
                              <BarChart2 className="w-3.5 h-3.5 text-white shrink-0" />
                              <span>View Scorecard</span>
                            </Link>

                            {/* Secondary outline button: Re-attempt */}
                            <Link
                              href={`/test/${test.id}?reattempt=true`}
                              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-all min-w-0"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              <span>Re-attempt Paper</span>
                            </Link>
                          </div>
                        ) : (
                          /* Primary filled button: Start */
                          <Link
                            href={`/test/${test.id}`}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-2xs hover:shadow-xs transition-all min-w-0"
                          >
                            <span>Start Official Paper</span>
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* 7. Load More Pagination Button */}
          {visibleCount < sortedPapers.length && (
            <div className="pt-4 pb-2 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <span>Load More Official Papers</span>
                <span className="text-slate-400 font-medium">
                  (Showing {Math.min(visibleCount, sortedPapers.length)} of {sortedPapers.length})
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-2xs text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
            <RotateCcw className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              No matching past year papers found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Try adjusting your status filter or selected stream to view other official CUET shift papers.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setStatusFilter("all");
                setSelectedStream("all");
                setSelectedTab("all");
                setVisibleCount(24);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-all"
            >
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
