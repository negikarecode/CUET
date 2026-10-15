"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
    name: "Languages & General",
    subjects: ["english", "general-test"],
  },
};

function formatShortPaperTitle(test: PYQTestItem): string {
  if (test.dateDisplay && test.shift) {
    return `${test.dateDisplay} · ${test.shift}`;
  }
  if (test.dateDisplay) return test.dateDisplay;
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const targetData = useTarget();

  // Backward compatibility redirect: /dashboard/pyqs?subject=physics -> /dashboard/pyqs/physics
  useEffect(() => {
    const subjParam = searchParams.get("subject");
    if (subjParam) {
      const normalizedKey = normalizeSubject(subjParam).key;
      router.replace(`/dashboard/pyqs/${normalizedKey}`);
    }
  }, [searchParams, router]);

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
      { value: "languages_general", label: "Languages & General (2 Subjects)", badge: "2 Core" },
    ];
  }, []);

  // Options for Subject SearchableSelect
  const subjectSelectOptions: SearchableSelectOption[] = useMemo(() => {
    const groups: SearchableSelectOption[] = [
      { value: "all", label: "All Subjects (14 Subjects)" },
    ];

    const streams = [
      { key: "science", label: "Science Stream" },
      { key: "commerce", label: "Commerce Stream" },
      { key: "humanities", label: "Humanities & Arts" },
      { key: "languages_general", label: "Languages & General" },
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
            keywords: [s.code, s.name, s.key],
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

  // Render a standard PYQ Subject Card (identical layout to Domain Mock Card)
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
        className={`bg-white rounded-3xl border transition-all flex flex-col justify-between p-5 sm:p-6 min-w-0 ${
          isRecommended
            ? "border-blue-200/80 shadow-md ring-1 ring-blue-500/10"
            : "border-slate-100 shadow-sm hover:shadow-md"
        }`}
      >
        <div className="space-y-3.5 flex-1 flex flex-col min-w-0">
          {/* Header Row: Icon + Badges */}
          <div className="flex items-start justify-between gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                isRecommended
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                  : "bg-blue-50 border border-blue-200/60 text-blue-600"
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              {stats.attemptedCount > 0 ? (
                <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>
                    {stats.attemptedCount} of {paperCount} Attempted
                  </span>
                </span>
              ) : (
                <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  0/{paperCount} Attempted
                </span>
              )}

              <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-sans">
                Code {sub.code}
              </span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {sub.name}
              </h3>
              {isRecommended && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/70 inline-flex items-center gap-1 shrink-0">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  Target Required
                </span>
              )}
            </div>
            <p className="text-[13px] font-normal text-slate-500 line-clamp-2 h-10 leading-relaxed">
              {sub.subtitle}
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-[12px] font-medium text-slate-500">
              <span>Paper Progress</span>
              <span className="font-semibold text-slate-700 tabular-nums">
                {stats.attemptedCount} / {paperCount} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Meta specs row matching Mocks */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[13px] text-slate-600 font-medium">
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
              <span>{paperCount} Official NTA Shift Papers (+5/−1)</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions: Pinned with mt-auto */}
        <div className="pt-3 border-t border-slate-100 mt-auto flex items-center gap-2 w-full">
          <Link
            href={`/dashboard/pyqs/${sub.key}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[13px] shadow-sm hover:shadow-md transition-all text-center"
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
            className="px-3.5 py-2.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[13px] transition-all text-center flex items-center gap-1.5 shrink-0 max-w-[50%]"
            title={
              stats.isAllAttempted
                ? `Re-attempt best paper for ${sub.name}`
                : `Next: ${nextPaperTitle}`
            }
          >
            {stats.isAllAttempted ? (
              <>
                <RotateCw className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Re-attempt best</span>
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
      {/* 1. Header with Info Tooltip & Grey Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Previous Year Questions
            </h1>
            <div className="relative group inline-block">
              <span
                tabIndex={0}
                role="note"
                aria-label="Answer keys are provisional and under verification against official NTA response sheets."
                title="Answer keys are provisional and under verification against official NTA response sheets."
                className="cursor-help inline-flex items-center text-slate-400 hover:text-slate-600 focus:text-blue-600 focus:outline-none"
              >
                <Info className="w-4 h-4" />
              </span>
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
            Official NTA CUET shift papers · 50 questions · 60 mins · +5 / -1 marking · {totalAttemptedPapers} of {totalShiftPapers} attempted
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

      {/* 2. Slim Toolbar matching Mocks: Stream, Subject, and Status Filter (56-64px tall) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs">
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
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[12px] font-semibold shrink-0">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
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
              className={`px-3 py-1.5 rounded-lg transition-all ${
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
              className={`px-3 py-1.5 rounded-lg transition-all ${
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
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Recommended for your target
              </h2>
            </div>
            <p className="text-[12px] font-medium text-slate-500">
              Required for <strong>{targetData.course}</strong> at <strong>{targetData.college}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
            {recommendedSubjects.map((sub) => renderSubjectCard(sub, true))}
          </div>
        </div>
      ) : !targetData.hasTarget && !isFilterActive ? (
        <div className="bg-blue-50/50 border border-blue-200/60 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 text-[13px] text-blue-900">
          <div className="flex items-center gap-2.5">
            <Target className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Set your dream college & course to see priority PYQ recommendations.</span>
          </div>
          <Link
            href="/dashboard/profile"
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline shrink-0"
          >
            Set your dream college &rarr;
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
          <div className="bg-white rounded-3xl border border-slate-100 p-8 text-center space-y-2">
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

      {/* Answer-key notice at bottom of the page */}
      <div className="pt-4 border-t border-slate-200/60 text-center">
        <p className="text-[13px] text-slate-400">
          Answer keys are provisional and under verification against official NTA response sheets.
        </p>
      </div>
    </div>
  );
}
