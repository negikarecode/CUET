"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
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
  Users,
  Activity,
  Laptop,
  Home,
  Tv,
  Leaf,
  Palette,
  Sprout,
  Footprints,
  CheckCircle2,
  Clock,
  Play,
  FileText,
  Target,
  ArrowRight,
  RotateCw,
  Sparkles,
  BookOpen,
  Compass,
} from "lucide-react";
import { SUBJECT_MOCK_COUNTS, SUBJECT_TO_MOCK } from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { useTarget } from "@/lib/hooks/useTarget";
import { getMockStats } from "@/lib/mock-stats";
import { normalizeSubject } from "@/lib/analytics";
import SearchableSelect, { SearchableSelectOption } from "@/components/ui/SearchableSelect";

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
type StatusFilter = "all" | "started" | "not_started";

interface SubjectMeta {
  key: SubjectKey;
  name: string;
  code: string;
  isLive: boolean;
  durationMinutes: number;
  totalQuestions: number;
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
    badge: "7 Domains",
    accentBg: "#E0F2FE",
    accentText: "#0369A1",
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
  commerce: {
    key: "commerce",
    name: "Commerce Stream",
    shortName: "Commerce",
    badge: "4 Domains",
    accentBg: "#FEF3C7",
    accentText: "#D97706",
    subjects: [
      "accountancy",
      "business-studies",
      "economics",
      "mathematics",
    ],
  },
  humanities: {
    key: "humanities",
    name: "Humanities & Arts",
    shortName: "Humanities",
    badge: "10 Domains",
    accentBg: "#FCE7F3",
    accentText: "#BE185D",
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
  common: {
    key: "common",
    name: "General Subjects (English & GAT)",
    shortName: "General Subjects",
    badge: "2 Subjects",
    accentBg: "#EEF2FF",
    accentText: "#4F46E5",
    subjects: [
      "english",
      "general-test",
    ],
  },
};

const SUBJECT_CONFIGS: Record<Exclude<SubjectKey, "all">, SubjectMeta> = {
  physics: {
    key: "physics",
    name: "Physics",
    code: "322",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Electrostatics, Optics, Magnetism, Modern Physics & Semiconductor Devices",
    icon: Atom,
  },
  chemistry: {
    key: "chemistry",
    name: "Chemistry",
    code: "306",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Physical Chemistry, Organic Mechanisms, Coordination Compounds & Biomolecules",
    icon: FlaskConical,
  },
  mathematics: {
    key: "mathematics",
    name: "Mathematics",
    code: "319",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Calculus, Linear Programming, Vectors, 3D Geometry & Probability",
    icon: Binary,
  },
  biology: {
    key: "biology",
    name: "Biology",
    code: "304",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Genetics, Reproduction, Biotechnology, Human Health & Ecology",
    icon: Dna,
  },
  accountancy: {
    key: "accountancy",
    name: "Accountancy",
    code: "301",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Partnership, Share Capital, Cash Flow & Financial Statement Analysis",
    icon: Calculator,
  },
  "business-studies": {
    key: "business-studies",
    name: "Business Studies",
    code: "305",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Principles of Management, Marketing, Business Finance & Consumer Protection",
    icon: Briefcase,
  },
  economics: {
    key: "economics",
    name: "Economics",
    code: "309",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Macroeconomic Identities, National Income, Fiscal Policy & Indian Economy",
    icon: TrendingUp,
  },
  history: {
    key: "history",
    name: "History",
    code: "314",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Ancient Harappa, Medieval Agrarian Society, Colonialism & Constitution",
    icon: ScrollText,
  },
  "political-science": {
    key: "political-science",
    name: "Political Science",
    code: "323",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Contemporary World Order, South Asia, Indian Democracy & Foreign Policy",
    icon: Landmark,
  },
  geography: {
    key: "geography",
    name: "Geography",
    code: "313",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Human Geography, Population, Resource Allocation & Spatial Organization",
    icon: Globe,
  },
  psychology: {
    key: "psychology",
    name: "Psychology",
    code: "324",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Psychological Attributes, Self, Personality, Disorders & Social Influence",
    icon: BrainCircuit,
  },
  sociology: {
    key: "sociology",
    name: "Sociology",
    code: "326",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Indian Social Structure, Caste, Stratification, Demographic Dynamics & Change",
    icon: Users,
  },
  "physical-education": {
    key: "physical-education",
    name: "Physical Education",
    code: "321",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Management of Sporting Events, Yoga, Sports Nutrition & Biomechanics",
    icon: Activity,
  },
  "computer-science": {
    key: "computer-science",
    name: "Computer Science / IP",
    code: "308",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Python Structures, SQL Queries, Computer Networks & Cyber Ethics",
    icon: Laptop,
  },
  "home-science": {
    key: "home-science",
    name: "Home Science",
    code: "315",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Clinical Nutrition, Human Development, Fabric Care & Resource Management",
    icon: Home,
  },
  "mass-media": {
    key: "mass-media",
    name: "Mass Media & Communication",
    code: "318",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Journalism Traditions, Cinema Grammar, Digital Media & Advertising",
    icon: Tv,
  },
  "environmental-studies": {
    key: "environmental-studies",
    name: "Environmental Science",
    code: "307",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Ecosystem Conservation, Pollution Control & Sustainable Development",
    icon: Leaf,
  },
  "fine-arts": {
    key: "fine-arts",
    name: "Fine Arts / Visual Arts",
    code: "312",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Rajasthani & Pahari Miniatures, Bengal School of Art & Modern Sculptures",
    icon: Palette,
  },
  agriculture: {
    key: "agriculture",
    name: "Agriculture",
    code: "302",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Agrometeorology, Genetics, Livestock Husbandry & Crop Cultivation",
    icon: Sprout,
  },
  anthropology: {
    key: "anthropology",
    name: "Anthropology",
    code: "303",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Physical Evolution, Archaeological Foundations & Socio-Cultural Institutions",
    icon: Footprints,
  },
  english: {
    key: "english",
    name: "English Language",
    code: "101",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Reading Comprehension, Vocabulary, Verbal Ability, Synonyms & Antonyms",
    icon: BookOpen,
  },
  "general-test": {
    key: "general-test",
    name: "General Aptitude Test (GAT)",
    code: "501",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "General Knowledge, Current Affairs, Mental Ability, Numerical & Logical Reasoning",
    icon: Compass,
  },
};

export default function MocksPage() {
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const targetData = useTarget();

  // Synchronize authenticated server attempts if local Zustand store is empty
  React.useEffect(() => {
    if (!isClient) return;
    const current = useTestStore.getState().testAttempts || [];
    if (current.length === 0) {
      fetch("/api/student/attempts")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.attempts && Array.isArray(data.attempts) && data.attempts.length > 0) {
            data.attempts.forEach((att: any) => {
              useTestStore.getState().recordTestAttempt(att);
            });
          }
        })
        .catch(() => {});
    }
  }, [isClient]);

  const [selectedStream, setSelectedStream] = useState<StreamKey>("all");
  const [selectedTab, setSelectedTab] = useState<SubjectKey>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const activeSubjectInfo = selectedTab !== "all" ? SUBJECT_CONFIGS[selectedTab] : null;

  const allSubjects = useMemo(() => {
    if (selectedTab !== "all" && activeSubjectInfo) {
      return [activeSubjectInfo];
    }
    if (selectedStream !== "all") {
      return STREAM_CONFIGS[selectedStream].subjects.map((k) => SUBJECT_CONFIGS[k]);
    }
    return Object.values(SUBJECT_CONFIGS);
  }, [selectedStream, selectedTab, activeSubjectInfo]);

  // Filtered by status (All / Started / Not started) using authoritative getMockStats
  const displayedSubjects = useMemo(() => {
    return allSubjects.filter((sub) => {
      if (statusFilter === "all") return true;
      const stats = getMockStats(sub.key, isClient ? testAttempts : []);
      if (statusFilter === "started") return stats.attemptedMocksCount > 0;
      if (statusFilter === "not_started") return stats.attemptedMocksCount === 0;
      return true;
    });
  }, [allSubjects, statusFilter, isClient, testAttempts]);

  // Recommended subjects for user target dream college/course
  const recommendedSubjects = useMemo(() => {
    if (!targetData.hasTarget || !targetData.requiredSubjects || targetData.requiredSubjects.length === 0) {
      return [];
    }
    const reqKeys = new Set(
      targetData.requiredSubjects.map((s) => normalizeSubject(s).key)
    );
    const seen = new Set<string>();
    const list: SubjectMeta[] = [];
    for (const sub of Object.values(SUBJECT_CONFIGS)) {
      if (reqKeys.has(sub.key) && !seen.has(sub.key)) {
        seen.add(sub.key);
        list.push(sub);
      }
    }
    return list;
  }, [targetData]);

  const isFilterActive = selectedTab !== "all" || selectedStream !== "all" || statusFilter !== "all";
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

  const availableSubjectsForDropdown = useMemo(() => {
    if (selectedStream === "all") {
      return Object.values(SUBJECT_CONFIGS);
    }
    return STREAM_CONFIGS[selectedStream].subjects.map((k) => SUBJECT_CONFIGS[k]);
  }, [selectedStream]);

  const streamSelectOptions: SearchableSelectOption[] = useMemo(
    () => [
      {
        value: "all",
        label: "All Streams (22 Subjects)",
        keywords: ["all", "streams", "22 subjects", "everything"],
      },
      {
        value: "common",
        label: "General Subjects (English & GAT)",
        badge: "2 Subjects",
        keywords: [
          "general",
          "general subjects",
          "general subject",
          "common",
          "english",
          "gat",
          "general test",
          "languages",
          "language",
          "section 1a",
          "section 3",
          "general aptitude test",
        ],
      },
      {
        value: "science",
        label: "Science Stream (7 Domains)",
        badge: "7 Domains",
        keywords: ["science", "physics", "chemistry", "mathematics", "biology", "computer science", "agriculture", "environmental studies"],
      },
      {
        value: "commerce",
        label: "Commerce Stream (4 Domains)",
        badge: "4 Domains",
        keywords: ["commerce", "accountancy", "business studies", "economics", "mathematics"],
      },
      {
        value: "humanities",
        label: "Humanities Stream (10 Domains)",
        badge: "10 Domains",
        keywords: ["humanities", "arts", "history", "political science", "geography", "psychology", "sociology"],
      },
    ],
    []
  );

  const subjectSelectOptions: SearchableSelectOption[] = useMemo(() => {
    if (selectedStream === "all") {
      return [
        {
          value: "all",
          label: "All 22 Subjects",
          keywords: ["all", "22 subjects", "all subjects"],
        },
        {
          heading: "General Subjects (English & GAT - Section IA & III)",
          options: STREAM_CONFIGS.common.subjects.map((k) => ({
            value: k,
            label: SUBJECT_CONFIGS[k].name,
            badge: `Code ${SUBJECT_CONFIGS[k].code}`,
            keywords: [
              SUBJECT_CONFIGS[k].code,
              SUBJECT_CONFIGS[k].name,
              k,
              "general",
              "general subjects",
              "general subject",
              "common",
              "gat",
              "english",
              "language",
              "section 1a",
              "section 3",
              k === "english" ? "verbal ability" : "reasoning",
              k === "english" ? "reading comprehension" : "general aptitude test",
              k === "english" ? "vocabulary" : "numerical ability",
            ],
          })),
        },
        {
          heading: "Science Stream",
          options: STREAM_CONFIGS.science.subjects.map((k) => ({
            value: k,
            label: SUBJECT_CONFIGS[k].name,
            badge: `Code ${SUBJECT_CONFIGS[k].code}`,
            keywords: [SUBJECT_CONFIGS[k].code, SUBJECT_CONFIGS[k].name, k, "science"],
          })),
        },
        {
          heading: "Commerce Stream",
          options: STREAM_CONFIGS.commerce.subjects.map((k) => ({
            value: k,
            label: SUBJECT_CONFIGS[k].name,
            badge: `Code ${SUBJECT_CONFIGS[k].code}`,
            keywords: [SUBJECT_CONFIGS[k].code, SUBJECT_CONFIGS[k].name, k, "commerce"],
          })),
        },
        {
          heading: "Humanities & Arts Stream",
          options: STREAM_CONFIGS.humanities.subjects.map((k) => ({
            value: k,
            label: SUBJECT_CONFIGS[k].name,
            badge: `Code ${SUBJECT_CONFIGS[k].code}`,
            keywords: [SUBJECT_CONFIGS[k].code, SUBJECT_CONFIGS[k].name, k, "humanities", "arts"],
          })),
        },
      ];
    }

    return [
      {
        value: "all",
        label: `All Subjects in ${STREAM_CONFIGS[selectedStream].name}`,
        keywords: [
          "all",
          STREAM_CONFIGS[selectedStream].name,
          ...(selectedStream === "common" ? ["general subjects", "general", "english", "gat"] : []),
        ],
      },
      ...availableSubjectsForDropdown.map((sub) => ({
        value: sub.key,
        label: sub.name,
        badge: `Code ${sub.code}`,
        keywords: [
          sub.code,
          sub.name,
          sub.key,
          ...(sub.key === "english" || sub.key === "general-test"
            ? [
                "general",
                "general subjects",
                "general subject",
                "common",
                "english",
                "gat",
                "general test",
                "language",
                "section 1a",
                "section 3",
              ]
            : []),
        ],
      })),
    ];
  }, [selectedStream, availableSubjectsForDropdown]);

  // Standard Subject Card matching design system
  const renderSubjectCard = (sub: SubjectMeta, isRecommended = false) => {
    const Icon = sub.icon;
    const mockCount = SUBJECT_MOCK_COUNTS[sub.key] ?? 50;
    const baseMockId = SUBJECT_TO_MOCK[sub.key] || `${sub.key}-mock`;

    const stats = isClient
      ? getMockStats(sub.key, testAttempts)
      : {
          attemptedMocksCount: 0,
          totalMocksCount: mockCount,
          peakScore: null,
          peakMaxMarks: 250,
          averageScore: null,
          nextUnattemptedMockIndex: 1,
          isAllAttempted: false,
          hasAttempts: false,
        };

    const nextMockNum = stats.nextUnattemptedMockIndex;
    const nextMockId = `${baseMockId}-${nextMockNum}`;
    const progressPercent = Math.min(100, Math.round((stats.attemptedMocksCount / mockCount) * 100));

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
          {/* Top Header Row: Icon + Badges */}
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
              {stats.attemptedMocksCount > 0 ? (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>
                    {stats.attemptedMocksCount} / {mockCount} Attempted
                  </span>
                </span>
              ) : (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                  0/{mockCount} Attempted
                </span>
              )}

              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Code {sub.code}
              </span>
            </div>
          </div>

          {/* Title & Description */}
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
              <span>Mock Progress</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {stats.attemptedMocksCount} / {mockCount} ({progressPercent}%)
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
              <span>{mockCount} Full Mock Papers (+5 / −1)</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions: Pinned with mt-auto */}
        <div className="pt-3.5 border-t border-slate-100 mt-auto flex items-center gap-2 w-full">
          <Link
            href={`/dashboard/mocks/${sub.key}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs transition-all shadow-xs text-center cursor-pointer"
          >
            <span>View All Mocks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href={stats.isAllAttempted ? `/dashboard/mocks/${sub.key}` : `/test/${nextMockId}`}
            className="px-3 py-2.5 rounded-xl border border-blue-200 bg-blue-50/80 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-all text-center flex items-center gap-1.5 shrink-0 max-w-[48%] cursor-pointer"
            title={
              stats.isAllAttempted
                ? `All mocks attempted for ${sub.name}`
                : `Start Mock ${nextMockNum} for ${sub.name}`
            }
          >
            {stats.isAllAttempted ? (
              <>
                <RotateCw className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Analysis</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current shrink-0" />
                <span className="truncate">Next: Mock {nextMockNum}</span>
              </>
            )}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto space-y-6">
      {/* 1. Header & Sibling Links */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
            CUET UG Mock Exams
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-normal max-w-3xl">
            Simulate 50-question full syllabus papers for Domain and General Subjects (English & GAT) under authentic NTA CUET CBT interface conditions with instant answer analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <Link
            href="/dashboard/pyqs"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-2xs"
          >
            <span>Official PYQ Papers</span>
          </Link>
          <Link
            href="/dashboard/practice"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-2xs"
          >
            <span>Unit Practice Tests</span>
          </Link>
        </div>
      </div>

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
                  setSelectedTab("all");
                }}
                searchPlaceholder="Search streams..."
              />
            </div>

            {/* Subject Selector */}
            <div className="min-w-[180px] sm:min-w-[240px]">
              <SearchableSelect
                ariaLabel="Filter by Subject"
                options={subjectSelectOptions}
                value={selectedTab}
                onChange={(val) => {
                  setSelectedTab(val as SubjectKey);
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
              All ({allSubjects.length})
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
              {
                allSubjects.filter(
                  (s) => getMockStats(s.key, isClient ? testAttempts : []).attemptedMocksCount > 0
                ).length
              }
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
              {
                allSubjects.filter(
                  (s) => getMockStats(s.key, isClient ? testAttempts : []).attemptedMocksCount === 0
                ).length
              }
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
            <span>Set your target college & course to unlock priority mock recommendations.</span>
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
              : selectedTab !== "all"
              ? `${SUBJECT_CONFIGS[selectedTab]?.name || "Selected Subject"} Mock Papers`
              : selectedStream !== "all"
              ? `${STREAM_CONFIGS[selectedStream].name}`
              : "All CUET UG Mock Subjects"}
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
                setSelectedTab("all");
                setStatusFilter("all");
              }}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Footnote */}
      <div className="pt-4 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400">
          Authentic full-length CUET UG mock tests with real-time scoring, negative marking (+5 / −1), and instant solutions.
        </p>
      </div>
    </div>
  );
}
