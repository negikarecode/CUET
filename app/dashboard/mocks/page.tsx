"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown,
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
} from "lucide-react";
import { SUBJECT_MOCK_COUNTS, SUBJECT_TO_MOCK } from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { useTarget } from "@/lib/hooks/useTarget";
import { getMockStats } from "@/lib/mock-stats";
import { normalizeSubject } from "@/lib/analytics";

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
  | "anthropology";

type StreamKey = "all" | "science" | "commerce" | "humanities";
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
};

export default function MocksPage() {
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const targetData = useTarget();

  const [selectedStream, setSelectedStream] = useState<StreamKey>("all");
  const [selectedTab, setSelectedTab] = useState<SubjectKey>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const activeSubjectInfo = selectedTab !== "all" ? SUBJECT_CONFIGS[selectedTab] : null;

  const handleSelectStream = (stream: StreamKey) => {
    setSelectedStream(stream);
    setSelectedTab("all");
  };

  const handleSelectSubject = (subjKey: SubjectKey, streamKey?: StreamKey) => {
    setSelectedTab(subjKey);
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

  // Recommended subjects for user target dream college/course (3-4 subjects)
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

  // Render a standard subject card
  const renderSubjectCard = (sub: SubjectMeta, isRecommended = false) => {
    const Icon = sub.icon;
    const mockCount = SUBJECT_MOCK_COUNTS[sub.key] ?? 20;
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
        className={`bg-white rounded-3xl border transition-all flex flex-col justify-between p-5 sm:p-6 min-w-0 ${
          isRecommended
            ? "border-blue-200/80 shadow-md ring-1 ring-blue-500/10"
            : "border-slate-100 shadow-sm hover:shadow-md"
        }`}
      >
        <div className="space-y-3.5 flex-1 flex flex-col min-w-0">
          {/* Top Header Row: Icon + Badges */}
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
              {stats.attemptedMocksCount > 0 ? (
                <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>
                    {stats.attemptedMocksCount} of {mockCount} Attempted
                  </span>
                </span>
              ) : (
                <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  0/{mockCount} Attempted
                </span>
              )}

              <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                Code {sub.code}
              </span>
            </div>
          </div>

          {/* Title & Description */}
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
            {/* Description clamped to exactly 2 lines with fixed height so cards align */}
            <p className="text-[13px] font-normal text-slate-500 line-clamp-2 h-10 leading-relaxed">
              {sub.subtitle}
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-[12px] font-medium text-slate-500">
              <span>Mock Progress</span>
              <span className="font-semibold text-slate-700 tabular-nums">
                {stats.attemptedMocksCount} / {mockCount} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Meta specs row: raised to at least 13px with darker text */}
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
              <span>{mockCount} Full Mock Papers (+5/−1)</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions: Pinned with mt-auto */}
        <div className="pt-3 border-t border-slate-100 mt-auto flex items-center gap-2 w-full">
          <Link
            href={`/dashboard/mocks/${sub.key}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[13px] shadow-sm hover:shadow-md transition-all text-center"
          >
            <span>View All Mocks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href={stats.isAllAttempted ? `/dashboard/mocks/${sub.key}` : `/test/${nextMockId}`}
            className="px-3.5 py-2.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[13px] transition-all text-center flex items-center gap-1.5 shrink-0"
            title={
              stats.isAllAttempted
                ? `All mocks attempted for ${sub.name}`
                : `Start Mock ${nextMockNum} for ${sub.name}`
            }
          >
            {stats.isAllAttempted ? (
              <>
                <RotateCw className="w-3.5 h-3.5" />
                <span>Review</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Next: Mock {nextMockNum}</span>
              </>
            )}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto space-y-6">
      {/* 1. Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Domain Mock Exams
          </h1>
          <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed max-w-3xl">
            Simulate 50-question full syllabus domain papers under authentic NTA CUET CBT interface conditions with instant answer analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <Link
            href="/dashboard/practice"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all"
          >
            <span>Unit Practice Tests</span>
          </Link>
          <Link
            href="/dashboard/pyqs"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all"
          >
            <span>Official PYQ Papers</span>
          </Link>
        </div>
      </div>

      {/* 2. Slim Toolbar: Stream, Subject, and Status Filter (56-64px tall) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
            {/* Stream Selector */}
            <div className="relative min-w-[180px] sm:min-w-[200px]">
              <select
                aria-label="Filter by Stream"
                value={selectedStream}
                onChange={(e) => handleSelectStream(e.target.value as StreamKey)}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-[13px] px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-8 transition-colors"
              >
                <option value="all">All Streams (20 Subjects)</option>
                <option value="science">Science Stream (7 Domains)</option>
                <option value="commerce">Commerce Stream (4 Domains)</option>
                <option value="humanities">Humanities Stream (10 Domains)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Subject Selector */}
            <div className="relative min-w-[180px] sm:min-w-[220px]">
              <select
                aria-label="Filter by Subject"
                value={selectedTab}
                onChange={(e) => handleSelectSubject(e.target.value as SubjectKey)}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-[13px] px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-8 transition-colors"
              >
                <option value="all">
                  {selectedStream === "all"
                    ? "All 20 Domain Subjects"
                    : `All Subjects in ${STREAM_CONFIGS[selectedStream].name}`}
                </option>
                {selectedStream === "all" ? (
                  <>
                    <optgroup label="Science Stream">
                      {STREAM_CONFIGS.science.subjects.map((k) => (
                        <option key={`sci-${k}`} value={k}>
                          {SUBJECT_CONFIGS[k].name} (Code {SUBJECT_CONFIGS[k].code})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Commerce Stream">
                      {STREAM_CONFIGS.commerce.subjects.map((k) => (
                        <option key={`com-${k}`} value={k}>
                          {SUBJECT_CONFIGS[k].name} (Code {SUBJECT_CONFIGS[k].code})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Humanities & Arts Stream">
                      {STREAM_CONFIGS.humanities.subjects.map((k) => (
                        <option key={`hum-${k}`} value={k}>
                          {SUBJECT_CONFIGS[k].name} (Code {SUBJECT_CONFIGS[k].code})
                        </option>
                      ))}
                    </optgroup>
                  </>
                ) : (
                  availableSubjectsForDropdown.map((sub) => (
                    <option key={sub.key} value={sub.key}>
                      {sub.name} (Code {sub.code})
                    </option>
                  ))
                )}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Status Filter Segmented Control */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[12px] font-semibold">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
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
              onClick={() => setStatusFilter("started")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "started"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Started
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("not_started")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "not_started"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Not started
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
            <span>Set your dream college & course to see priority mock recommendations.</span>
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
              ? "All other domain subjects"
              : selectedTab !== "all" && activeSubjectInfo
              ? `${activeSubjectInfo.name} Specification`
              : selectedStream !== "all"
              ? `${STREAM_CONFIGS[selectedStream].name}`
              : "All CUET UG Domain Subjects"}
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
    </div>
  );
}
