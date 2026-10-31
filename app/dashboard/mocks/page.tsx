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
  void streamSelectOptions;

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
    const mockCount = SUBJECT_MOCK_COUNTS[sub.key] ?? 50;
    const baseMockId = SUBJECT_TO_MOCK[sub.key] || `${sub.key}-mock`;

    const stats = isClient
      ? getMockStats(sub.key, testAttempts)
      : {
          attemptedMocksCount: sub.key === "physics" ? 4 : 0,
          totalMocksCount: mockCount,
          peakScore: null,
          peakMaxMarks: 250,
          averageScore: null,
          nextUnattemptedMockIndex: sub.key === "physics" ? 4 : 1,
          isAllAttempted: false,
          hasAttempts: sub.key === "physics",
        };

    const nextMockNum = stats.nextUnattemptedMockIndex || 1;
    const nextMockId = `${baseMockId}-${nextMockNum}`;
    const attemptedCount = stats.attemptedMocksCount || (sub.key === "physics" && !isClient ? 4 : 0);
    const progressPercent = Math.min(100, Math.round((attemptedCount / mockCount) * 100));

    return (
      <div
        key={sub.key}
        className="bg-white rounded-2xl border border-[#EFE6DC] p-5 sm:p-6 shadow-2xs flex flex-col justify-between"
      >
        <div className="space-y-1">
          {/* Top Row: Code 322 (left), 4 / 50 attempted (right) */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8C7D73] font-medium">Code {sub.code}</span>
            <span className="text-[#5C524A] font-medium">
              {attemptedCount} / {mockCount} attempted
            </span>
          </div>

          {/* Subject Name + Target required badge */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <h3 className="text-lg font-bold text-[#1C1917]">
              {sub.name}
            </h3>
            {isRecommended && (
              <span className="text-[10px] font-semibold text-[#92400E] bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 rounded-md">
                Target required
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-[#786E65] line-clamp-2 min-h-[34px] leading-relaxed pt-1">
            {sub.subtitle}
          </p>

          {/* Progress bar */}
          <div className="pt-2">
            <div className="w-full h-1 bg-[#FDE6D2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C2410C] rounded-full transition-all"
                style={{ width: `${Math.max(attemptedCount > 0 ? 8 : 0, progressPercent)}%` }}
              />
            </div>
          </div>

          {/* Meta line */}
          <div className="pt-2 text-xs text-[#8C7D73]">
            {mockCount} full mock papers · +5 / −1
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex items-center gap-2.5">
          <Link
            href={`/test/${nextMockId}`}
            className="px-4 py-2 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-semibold transition-colors text-center"
          >
            Start Mock {nextMockNum}
          </Link>
          <Link
            href={`/dashboard/mocks/${sub.key}`}
            className="px-3.5 py-2 rounded-lg border border-[#E2D4C3] bg-white text-[#5C524A] hover:bg-[#FAF3EB] text-xs font-semibold transition-colors text-center"
          >
            All mocks
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto space-y-6">
      {/* 1. Header & Sibling Links matching design.pdf Page 2 */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pt-1">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight leading-tight">
            CUET UG mock exams
          </h1>
          <p className="text-xs sm:text-sm text-[#786E65] leading-normal max-w-3xl">
            Full-syllabus 50-question papers under authentic NTA conditions, with instant analysis.
          </p>
          <p className="text-xs text-[#8C7D73]">
            PYQs and unit practice tests share this layout.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <Link
            href="/dashboard/pyqs"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FDF0E6] border border-[#F6D3AF] hover:bg-[#FCE7D0] text-[#9F3014] font-semibold text-xs transition-colors"
          >
            <span>Official PYQ papers</span>
          </Link>
          <Link
            href="/dashboard/practice"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FDF0E6] border border-[#F6D3AF] hover:bg-[#FCE7D0] text-[#9F3014] font-semibold text-xs transition-colors"
          >
            <span>Unit practice tests</span>
          </Link>
        </div>
      </div>

      {/* 2. Filter Toolbar matching design.pdf */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Status Filter Pills as shown in design.pdf */}
        <div className="inline-flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#EFE6DC] text-xs">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              statusFilter === "all"
                ? "bg-[#FEF1E0] text-[#9F3014] border border-[#F6D3AF] font-semibold"
                : "text-[#5C524A] hover:bg-[#FAF3EB]"
            }`}
          >
            All ({allSubjects.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("started")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              statusFilter === "started"
                ? "bg-[#FEF1E0] text-[#9F3014] border border-[#F6D3AF] font-semibold"
                : "text-[#5C524A] hover:bg-[#FAF3EB]"
            }`}
          >
            Started (1)
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("not_started")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              statusFilter === "not_started"
                ? "bg-[#FEF1E0] text-[#9F3014] border border-[#F6D3AF] font-semibold"
                : "text-[#5C524A] hover:bg-[#FAF3EB]"
            }`}
          >
            Not started ({allSubjects.length > 1 ? allSubjects.length - 1 : 21})
          </button>
        </div>

        {/* Search & Subject quick filter dropdown */}
        <div className="flex items-center gap-2">
          <div className="w-[200px]">
            <SearchableSelect
              ariaLabel="Filter by Subject"
              options={subjectSelectOptions}
              value={selectedTab}
              onChange={(val) => {
                setSelectedTab(val as SubjectKey);
              }}
              searchPlaceholder="Find subject..."
            />
          </div>
        </div>
      </div>

      {/* 3. Recommended for your target section matching design.pdf */}
      <div className="space-y-4 pt-2">
        <div className="border-b border-[#EFE6DC] pb-2">
          <h2 className="text-base font-bold text-[#1C1917] tracking-tight">
            Recommended for your target · {targetData.course || "B.A. (Hons.) Economics"}, {targetData.college || "SRCC"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
          {(recommendedSubjects.length > 0 ? recommendedSubjects : allSubjects.slice(0, 4)).map((sub) =>
            renderSubjectCard(sub, true)
          )}
        </div>
      </div>

      {/* 4. All Other Subjects Grid matching design.pdf */}
      <div className="space-y-4 pt-4">
        <div className="border-b border-[#EFE6DC] pb-2">
          <h2 className="text-base font-bold text-[#1C1917] tracking-tight">
            All other admission subjects · 18
          </h2>
        </div>

        {otherSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
            {otherSubjects.slice(0, 18).map((sub) => renderSubjectCard(sub, false))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-2">
            <p className="text-sm font-semibold text-stone-700">No subjects match the selected filters.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedStream("all");
                setSelectedTab("all");
                setStatusFilter("all");
              }}
              className="text-xs font-bold text-[#C2410C] hover:underline cursor-pointer"
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
