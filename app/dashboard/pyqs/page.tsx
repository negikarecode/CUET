"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  RotateCw,
  Users,
  Info,
  Play,
  CheckCircle2,
  Target,
  Clock,
  FileText,
  Trophy,
  Sparkles,
} from "lucide-react";
import {
  getPYQTestsForSubject,
  PYQTestItem,
} from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { deduplicateTestAttempts, normalizeSubject } from "@/lib/analytics";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { useTarget } from "@/lib/hooks/useTarget";
import SearchableSelect, { SearchableSelectOption } from "@/components/ui/SearchableSelect";
import { RecordedTestAttempt } from "@/types";

type StreamKey = "all" | "science" | "commerce" | "humanities" | "languages_general";
type StatusFilter = "all" | "started" | "not_started";

interface SubjectMeta {
  key: string;
  name: string;
  code: string;
  stream: StreamKey;
  durationMinutes: number;
  totalQuestions: number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PYQ_SUBJECTS: SubjectMeta[] = [
  {
    key: "physics",
    name: "Physics",
    code: "322",
    stream: "science",
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Electrostatics, Optics, Magnetism, Modern Physics & Semiconductor Devices",
    icon: Atom,
  },
  {
    key: "chemistry",
    name: "Chemistry",
    code: "306",
    stream: "science",
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Physical Chemistry, Organic Mechanisms, Coordination Compounds & Biomolecules",
    icon: FlaskConical,
  },
  {
    key: "mathematics",
    name: "Mathematics",
    code: "319",
    stream: "science",
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Calculus, Linear Programming, Vectors, 3D Geometry & Probability",
    icon: Binary,
  },
  {
    key: "biology",
    name: "Biology",
    code: "304",
    stream: "science",
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Genetics, Human Reproduction, Ecology, Evolution & Biotechnology",
    icon: Dna,
  },
  {
    key: "accountancy",
    name: "Accountancy",
    code: "301",
    stream: "commerce",
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Partnership Deeds, Share Capital, Cash Flow Statements & Debentures",
    icon: Calculator,
  },
  {
    key: "business-studies",
    name: "Business Studies",
    code: "305",
    stream: "commerce",
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Principles of Management, Marketing Mix, Financial Markets & Consumer Protection",
    icon: Briefcase,
  },
  {
    key: "economics",
    name: "Economics",
    code: "309",
    stream: "commerce",
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Macroeconomic Identities, Government Budget, Inflation & Indian Economic Development",
    icon: TrendingUp,
  },
  {
    key: "history",
    name: "History",
    code: "314",
    stream: "humanities",
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Harappan Archaeology, Mughal Chronicles, Bhakti-Sufi & Indian National Movement",
    icon: ScrollText,
  },
  {
    key: "political-science",
    name: "Political Science",
    code: "323",
    stream: "humanities",
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Contemporary World Politics, Cold War Era, Democratic Resurgence & Globalisation",
    icon: Landmark,
  },
  {
    key: "geography",
    name: "Geography",
    code: "313",
    stream: "humanities",
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Human Geography, Population Growth, Resource Distribution & Indian Economy",
    icon: Globe,
  },
  {
    key: "psychology",
    name: "Psychology",
    code: "324",
    stream: "humanities",
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Variations in Psychological Attributes, Self and Personality & Therapeutic Approaches",
    icon: BrainCircuit,
  },
  {
    key: "sociology",
    name: "Sociology",
    code: "326",
    stream: "humanities",
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Indian Society Demographics, Social Institutions, Inequality & Social Movements",
    icon: Users,
  },
  {
    key: "english",
    name: "English Language",
    code: "101",
    stream: "languages_general",
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Reading Comprehension Passages, Synonyms, Antonyms, Idioms & Verbal Aptitude",
    icon: FileText,
  },
  {
    key: "general-test",
    name: "General Aptitude Test",
    code: "501",
    stream: "languages_general",
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "General Knowledge, Current Affairs, Numerical Ability, Reasoning & Analytical Skills",
    icon: Trophy,
  },
];

const STREAM_CONFIGS: Record<
  Exclude<StreamKey, "all">,
  { name: string; subjects: string[] }
> = {
  science: {
    name: "Science Stream",
    subjects: ["physics", "chemistry", "mathematics", "biology"],
  },
  commerce: {
    name: "Commerce Stream",
    subjects: ["accountancy", "business-studies", "economics", "mathematics"],
  },
  humanities: {
    name: "Humanities & Arts",
    subjects: ["history", "political-science", "geography", "psychology", "sociology"],
  },
  languages_general: {
    name: "General Subjects (English & GAT)",
    subjects: ["english", "general-test"],
  },
};

function getPaperNumber(test: PYQTestItem): number {
  if (test.paperNumber) return test.paperNumber;
  const match = test.id.match(/pyq[-_]?(\d+)/i);
  return match && match[1] ? parseInt(match[1], 10) : 1;
}

function formatShortPaperTitle(test: PYQTestItem): string {
  const paperNum = getPaperNumber(test);
  if (test.dateDisplay && test.shift) {
    return `Paper ${paperNum} (${test.dateDisplay} · ${test.shift})`;
  }
  if (test.dateDisplay) return `Paper ${paperNum} (${test.dateDisplay})`;
  const match = test.label.match(
    /\((\d{1,2}\s+[A-Za-z]+\s+\d{4})\s+(Shift\s+\d+)\)/i
  );
  if (match && match[1] && match[2]) {
    return `Paper ${paperNum} (${match[1]} · ${match[2]})`;
  }
  if (test.shift && test.year) {
    return `Paper ${paperNum} (CUET ${test.year} · ${test.shift})`;
  }
  return `Paper ${paperNum}`;
}

interface InProgressSessionInfo {
  testId: string;
  testTitle: string;
  answeredCount: number;
  remainingMinutes: number;
}

export default function PYQsPage() {
  const router = useRouter();
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const targetData = useTarget();

  // Backward compatibility redirect: /dashboard/pyqs?subject=physics -> /dashboard/pyqs/physics
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const subjParam = urlParams.get("subject");
    if (subjParam) {
      const normalizedKey = normalizeSubject(subjParam).key;
      router.replace(`/dashboard/pyqs/${normalizedKey}`);
    }
  }, [router]);

  const [selectedStream, setSelectedStream] = useState<StreamKey>("all");
  const [selectedSubjectTab, setSelectedSubjectTab] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // In-progress test session detection
  const [inProgressSession, setInProgressSession] = useState<InProgressSessionInfo | null>(null);

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
      console.warn("[PYQsPage] Error checking in-progress session:", err);
    }
  }, []);

  // Deduplicate test attempts strictly for PYQs
  const cleanAttempts = useMemo(() => {
    const deduped = deduplicateTestAttempts(testAttempts || []);
    return deduped.filter((att) => {
      const id = (att.testId || "").toLowerCase();
      const title = (att.testTitle || "").toLowerCase();
      return id.includes("-pyq") || id.includes("pyq") || title.includes("shift") || title.includes("pyq");
    });
  }, [testAttempts]);

  // Precompute PYQ statistics for all 14 subjects
  const subjectStatsMap = useMemo(() => {
    const map = new Map<
      string,
      {
        attemptedCount: number;
        totalCount: number;
        peakScore: number | null;
        averageAccuracy: number;
        nextUnattemptedPaper: PYQTestItem | null;
        bestAttemptPaper: PYQTestItem | null;
        isAllAttempted: boolean;
        hasAttempts: boolean;
      }
    >();

    for (const sub of PYQ_SUBJECTS) {
      const papers = getPYQTestsForSubject(sub.key);
      let attempted = 0;
      let nextUnattempted: PYQTestItem | null = null;
      let peakScore: number | null = null;
      let totalAcc = 0;
      let bestScoreSoFar = -9999;
      let bestAttemptPaper: PYQTestItem | null = null;

      for (const p of papers) {
        const matches = cleanAttempts.filter((a) => a.testId === p.id);
        if (matches.length > 0) {
          attempted++;
          const best = matches.reduce<RecordedTestAttempt>((b, curr) => {
            const cScore = curr.totalMarks ?? 0;
            const bScore = b.totalMarks ?? 0;
            if (cScore > bScore) return curr;
            if (cScore === bScore && (curr.accuracyPercentage ?? 0) > (b.accuracyPercentage ?? 0)) return curr;
            return b;
          }, matches[0]!);

          const score = best.totalMarks ?? 0;
          if (peakScore === null || score > peakScore) {
            peakScore = score;
          }
          if (score > bestScoreSoFar) {
            bestScoreSoFar = score;
            bestAttemptPaper = p;
          }
          totalAcc += best.accuracyPercentage ?? 0;
        } else if (!nextUnattempted) {
          nextUnattempted = p;
        }
      }

      const totalCount = papers.length;
      const isAllAttempted = totalCount > 0 && attempted >= totalCount;
      const avgAcc = attempted > 0 ? Math.round(totalAcc / attempted) : 0;

      map.set(sub.key, {
        attemptedCount: attempted,
        totalCount,
        peakScore,
        averageAccuracy: avgAcc,
        nextUnattemptedPaper: nextUnattempted || papers[0] || null,
        bestAttemptPaper: bestAttemptPaper || papers[0] || null,
        isAllAttempted,
        hasAttempts: attempted > 0,
      });
    }

    return map;
  }, [cleanAttempts]);

  // Overall paper count
  const totalShiftPapers = useMemo(() => {
    return PYQ_SUBJECTS.reduce((acc, sub) => acc + (subjectStatsMap.get(sub.key)?.totalCount || 0), 0);
  }, [subjectStatsMap]);

  // Overall attempted paper count
  const totalAttemptedPapers = useMemo(() => {
    return PYQ_SUBJECTS.reduce((acc, sub) => acc + (subjectStatsMap.get(sub.key)?.attemptedCount || 0), 0);
  }, [subjectStatsMap]);

  // Filter subjects by stream and individual tab
  const streamFilteredSubjects = useMemo(() => {
    if (selectedSubjectTab !== "all") {
      const match = PYQ_SUBJECTS.find((s) => s.key === selectedSubjectTab);
      return match ? [match] : PYQ_SUBJECTS;
    }
    if (selectedStream !== "all") {
      const keys = STREAM_CONFIGS[selectedStream].subjects;
      return PYQ_SUBJECTS.filter((s) => keys.includes(s.key));
    }
    return PYQ_SUBJECTS;
  }, [selectedStream, selectedSubjectTab]);

  // Filter by status (All / Started / Not started)
  const displayedSubjects = useMemo(() => {
    return streamFilteredSubjects.filter((sub) => {
      if (statusFilter === "all") return true;
      const stats = subjectStatsMap.get(sub.key);
      if (statusFilter === "started") return Boolean(stats?.hasAttempts);
      if (statusFilter === "not_started") return !stats?.hasAttempts;
      return true;
    });
  }, [streamFilteredSubjects, statusFilter, subjectStatsMap]);

  // Recommended subjects for user's target dream college & course
  const recommendedSubjects = useMemo(() => {
    if (!targetData.hasTarget || !targetData.requiredSubjects || targetData.requiredSubjects.length === 0) {
      return [];
    }
    const reqKeys = new Set(
      targetData.requiredSubjects.map((s) => normalizeSubject(s).key)
    );
    const seen = new Set<string>();
    const list: SubjectMeta[] = [];
    for (const sub of PYQ_SUBJECTS) {
      if (reqKeys.has(sub.key) && !seen.has(sub.key)) {
        seen.add(sub.key);
        list.push(sub);
      }
    }
    return list;
  }, [targetData]);

  const isFilterActive = selectedSubjectTab !== "all" || selectedStream !== "all" || statusFilter !== "all";
  const showRecommendedRow = Boolean(
    targetData.hasTarget &&
    recommendedSubjects.length > 0 &&
    !isFilterActive
  );

  const recommendedKeys = useMemo(() => {
    return new Set(recommendedSubjects.map((s) => s.key));
  }, [recommendedSubjects]);

  // Other subjects (excluding recommended) when recommended section is shown
  const otherSubjects = useMemo(() => {
    const baseList = showRecommendedRow
      ? displayedSubjects.filter((s) => !recommendedKeys.has(s.key))
      : displayedSubjects;

    const seen = new Set<string>();
    return baseList.filter((s) => {
      if (seen.has(s.key)) return false;
      seen.add(s.key);
      return true;
    });
  }, [displayedSubjects, showRecommendedRow, recommendedKeys]);

  // Options for Stream SearchableSelect
  const streamSelectOptions: SearchableSelectOption[] = useMemo(() => {
    return [
      { value: "all", label: "All Streams (14 Subjects)" },
      { value: "science", label: "Science Stream (4 Subjects)", badge: "4 Core" },
      { value: "commerce", label: "Commerce Stream (4 Subjects)", badge: "4 Core" },
      { value: "humanities", label: "Humanities & Arts (5 Subjects)", badge: "5 Core" },
      {
        value: "languages_general",
        label: "General Subjects (English & GAT)",
        badge: "2 Core",
        keywords: [
          "general",
          "general subjects",
          "general subject",
          "common",
          "english",
          "gat",
          "general test",
          "languages",
        ],
      },
    ];
  }, []);

  // Options for Subject SearchableSelect
  const subjectSelectOptions: SearchableSelectOption[] = useMemo(() => {
    const groups: SearchableSelectOption[] = [
      { value: "all", label: "All Subjects (14 Subjects)", keywords: ["all", "14 subjects"] },
    ];

    const streams = [
      { key: "science", label: "Science Stream" },
      { key: "commerce", label: "Commerce Stream" },
      { key: "humanities", label: "Humanities & Arts" },
      { key: "languages_general", label: "General Subjects (English & GAT)" },
    ];

    for (const st of streams) {
      const subs = PYQ_SUBJECTS.filter((s) => s.stream === st.key);
      if (subs.length > 0) {
        groups.push({
          heading: st.label,
          options: subs.map((s) => ({
            value: s.key,
            label: `${s.name} (Code ${s.code})`,
            sublabel: `${subjectStatsMap.get(s.key)?.totalCount || 0} Official Shift Papers`,
            keywords: [
              s.code,
              s.name,
              s.key,
              ...(s.stream === "languages_general"
                ? ["general", "general subjects", "common", "english", "gat", "general test"]
                : []),
            ],
            icon: s.icon,
          })),
        });
      }
    }

    return groups;
  }, [subjectStatsMap]);

  if (!isClient) {
    return <div className="min-h-screen bg-[#F8FAFC]" />;
  }

  // Standard PYQ Subject Card (consistent, clean, balanced height)
  const renderSubjectCard = (sub: SubjectMeta, isRecommended: boolean = false) => {
    const Icon = sub.icon;
    const stats = subjectStatsMap.get(sub.key) || {
      attemptedCount: 0,
      totalCount: 0,
      peakScore: null,
      averageAccuracy: 0,
      nextUnattemptedPaper: null,
      bestAttemptPaper: null,
      isAllAttempted: false,
      hasAttempts: false,
    };

    const paperCount = stats.totalCount;
    const progressPercent = paperCount > 0 ? Math.min(100, Math.round((stats.attemptedCount / paperCount) * 100)) : 0;
    const nextPaper = stats.nextUnattemptedPaper;
    const nextPaperTitle = nextPaper ? formatShortPaperTitle(nextPaper) : "Shift 1";
    const nextPaperId = nextPaper ? nextPaper.id : `${sub.key}-pyq-1`;
    const bestPaperId = stats.bestAttemptPaper ? stats.bestAttemptPaper.id : nextPaperId;

    return (
      <div
        key={sub.key}
        className={`bg-white rounded-2xl border transition-all flex flex-col justify-between p-5 sm:p-6 min-w-0 ${
          isRecommended
            ? "border-blue-300 shadow-xs ring-1 ring-blue-500/15"
            : "border-slate-200/90 shadow-xs hover:border-slate-300"
        }`}
      >
        <div className="space-y-3.5 flex-1 flex flex-col min-w-0">
          {/* Header Row: Icon + Badges */}
          <div className="flex items-start justify-between gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                isRecommended
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-blue-50 border border-blue-200/60 text-blue-600"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              {stats.attemptedCount > 0 ? (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>
                    {stats.attemptedCount} / {paperCount} Attempted
                  </span>
                </span>
              ) : (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                  0/{paperCount} Attempted
                </span>
              )}

              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Code {sub.code}
              </span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {sub.name}
              </h3>
              {isRecommended && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/70 inline-flex items-center gap-1 shrink-0">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  Target Required
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 h-9 leading-relaxed">
              {sub.subtitle}
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Paper Progress</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {stats.attemptedCount} / {paperCount} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/50">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  progressPercent >= 100
                    ? "bg-emerald-600"
                    : progressPercent > 0
                    ? "bg-blue-600"
                    : "bg-transparent"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Meta specs row */}
          <div className="pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{sub.durationMinutes} Mins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>50 Questions</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{paperCount} Official NTA Papers (+5 / −1)</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions: Pinned with mt-auto */}
        <div className="pt-3.5 border-t border-slate-100 mt-auto flex items-center gap-2 w-full">
          <Link
            href={`/dashboard/pyqs/${sub.key}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs transition-all shadow-xs text-center cursor-pointer"
          >
            <span>View all papers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href={
              stats.isAllAttempted
                ? `/test/${bestPaperId}?reattempt=true`
                : `/test/${nextPaperId}`
            }
            className="px-3 py-2.5 rounded-xl border border-blue-200 bg-blue-50/80 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-all text-center flex items-center gap-1.5 shrink-0 max-w-[48%] cursor-pointer"
            title={
              stats.isAllAttempted
                ? `Re-attempt best paper for ${sub.name}`
                : `Next: ${nextPaperTitle}`
            }
          >
            {stats.isAllAttempted ? (
              <>
                <RotateCw className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Re-attempt</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current shrink-0" />
                <span className="truncate">Next: {nextPaperTitle}</span>
              </>
            )}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto space-y-6">
      {/* 1. Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Previous Year Questions
            </h1>
            <div className="relative group inline-block">
              <span
                tabIndex={0}
                role="note"
                aria-label="Provisional official NTA answer keys under continuous verification."
                title="Provisional official NTA answer keys under continuous verification."
                className="cursor-help inline-flex items-center text-slate-400 hover:text-slate-600 focus:text-blue-600 focus:outline-hidden"
              >
                <Info className="w-4 h-4" />
              </span>
              <div
                role="tooltip"
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block group-focus-within:block z-30 w-72 p-2.5 bg-slate-900 text-white text-xs font-normal rounded-xl shadow-lg leading-snug pointer-events-none"
              >
                Official NTA CUET CBT shift papers with step-by-step NCERT solutions.
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-normal max-w-3xl">
            Official NTA CUET shift papers · 50 questions · 45-60 mins · +5 / -1 marking scheme · {totalAttemptedPapers} of {totalShiftPapers} attempted
          </p>
        </div>

        {/* Sibling navigation */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-2xs"
          >
            <span>Domain Mock Exams</span>
          </Link>
          <Link
            href="/dashboard/practice"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-2xs"
          >
            <span>Unit Practice Tests</span>
          </Link>
        </div>
      </div>

      {/* In-Progress Unsubmitted Session Strip (if any) */}
      {inProgressSession && (
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                  Resume active exam
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {inProgressSession.testTitle}
                </h4>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {inProgressSession.answeredCount} questions answered · {inProgressSession.remainingMinutes} mins remaining
              </p>
            </div>
          </div>
          <Link
            href={`/test/${inProgressSession.testId}`}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <span>Resume Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 2. Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
            {/* Stream Selector */}
            <div className="min-w-[180px] sm:min-w-[220px]">
              <SearchableSelect
                ariaLabel="Filter by Stream"
                options={streamSelectOptions}
                value={selectedStream}
                onChange={(val) => {
                  setSelectedStream(val as StreamKey);
                  setSelectedSubjectTab("all");
                }}
                searchPlaceholder="Search streams..."
              />
            </div>

            {/* Subject Selector */}
            <div className="min-w-[180px] sm:min-w-[240px]">
              <SearchableSelect
                ariaLabel="Filter by Subject"
                options={subjectSelectOptions}
                value={selectedSubjectTab}
                onChange={(val) => {
                  setSelectedSubjectTab(val);
                }}
                searchPlaceholder="Search subjects or codes..."
              />
            </div>
          </div>

          {/* Status Filter Segmented Control */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === "all"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({PYQ_SUBJECTS.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("started")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === "started"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Started (
              {PYQ_SUBJECTS.filter((s) => subjectStatsMap.get(s.key)?.hasAttempts).length}
              )
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("not_started")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === "not_started"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Not started (
              {PYQ_SUBJECTS.filter((s) => !subjectStatsMap.get(s.key)?.hasAttempts).length}
              )
            </button>
          </div>
        </div>
      </div>

      {/* 3. Recommended for your target row */}
      {showRecommendedRow ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Recommended for your target
              </h2>
            </div>
            <p className="text-xs font-medium text-slate-500">
              Required for <strong className="text-slate-800">{targetData.course}</strong> at <strong className="text-slate-800">{targetData.college}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
            {recommendedSubjects.map((sub) => renderSubjectCard(sub, true))}
          </div>
        </div>
      ) : !targetData.hasTarget && !isFilterActive ? (
        <div className="bg-blue-50/60 border border-blue-200/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-900">
          <div className="flex items-center gap-2.5">
            <Target className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Set your target college & course to unlock personalized paper recommendations.</span>
          </div>
          <Link
            href="/dashboard/profile"
            className="font-bold text-blue-700 hover:text-blue-900 hover:underline shrink-0"
          >
            Set target goals &rarr;
          </Link>
        </div>
      ) : null}

      {/* 4. All Other Subjects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {showRecommendedRow
              ? "All other admission subjects"
              : selectedSubjectTab !== "all"
              ? `${PYQ_SUBJECTS.find((s) => s.key === selectedSubjectTab)?.name || "Selected Subject"} Papers`
              : selectedStream !== "all"
              ? `${STREAM_CONFIGS[selectedStream].name}`
              : "All CUET UG PYQ Subjects"}
            <span className="text-xs font-normal text-slate-400 ml-2 font-mono">
              ({otherSubjects.length})
            </span>
          </h2>
        </div>

        {otherSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
            {otherSubjects.map((sub) => renderSubjectCard(sub, false))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-700">No subjects match the selected filters.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedStream("all");
                setSelectedSubjectTab("all");
                setStatusFilter("all");
              }}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Provisional notice footnote */}
      <div className="pt-4 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400">
          Official NTA CUET past year shift papers with complete verified answer keys and solutions.
        </p>
      </div>
    </div>
  );
}
