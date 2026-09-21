"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { getTestAttemptStats } from "@/lib/analytics";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { useTranslation } from "@/lib/i18n/LanguageContext";

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
    badge: "7 Domains • 35 PYQ Papers",
    accentBg: "#E0F2FE",
    accentText: "#0369A1",
    subjects: [
      "physics",
      "chemistry",
      "mathematics",
      "biology",
      "computer-science",
      "agriculture",
      "environmental-studies",
    ],
  },
  commerce: {
    key: "commerce",
    name: "Commerce Stream",
    shortName: "Commerce",
    badge: "4 Domains • 20 PYQ Papers",
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
    badge: "10 Domains • 50 PYQ Papers",
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

const PYQ_SUBJECT_CONFIGS: Record<Exclude<SubjectKey, "all">, SubjectMeta> = {
  physics: {
    key: "physics",
    name: "Physics",
    code: "312",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 60,
    subtitle:
      "Official NTA CUET CBT papers (2024 Shifts 1 & 2, 2023 Shifts 1 & 2, 2022) with complete step-by-step NCERT solutions.",
    icon: Atom,
  },
  chemistry: {
    key: "chemistry",
    name: "Chemistry",
    code: "306",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 60,
    subtitle:
      "Official NTA CUET CBT papers covering Physical, Organic, and Inorganic Chemistry with reaction mechanisms and pacing benchmarks.",
    icon: FlaskConical,
  },
  mathematics: {
    key: "mathematics",
    name: "Mathematics",
    code: "319",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 60,
    subtitle:
      "Official NTA CUET CBT papers covering Calculus, Algebra, Probability, and Vectors with full analytical derivations.",
    icon: Binary,
  },
  biology: {
    key: "biology",
    name: "Biology",
    code: "304",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Genetics, Reproduction, Biotechnology, and Ecology with line-by-line NCERT references.",
    icon: Dna,
  },
  accountancy: {
    key: "accountancy",
    name: "Accountancy",
    code: "301",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 60,
    subtitle:
      "Official NTA CUET CBT papers covering Partnership, Company Accounts, Cash Flow Statements, and Financial Analysis.",
    icon: Calculator,
  },
  "business-studies": {
    key: "business-studies",
    name: "Business Studies",
    code: "305",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Principles of Management, Financial Markets, Marketing, and Consumer Protection.",
    icon: Briefcase,
  },
  economics: {
    key: "economics",
    name: "Economics",
    code: "309",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 60,
    subtitle:
      "Official NTA CUET CBT papers covering Introductory Macroeconomics and Indian Economic Development.",
    icon: TrendingUp,
  },
  history: {
    key: "history",
    name: "History",
    code: "314",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Themes in Indian History Parts I, II, and III with source-based and chronology questions.",
    icon: ScrollText,
  },
  "political-science": {
    key: "political-science",
    name: "Political Science",
    code: "323",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Contemporary World Politics and Politics in India Since Independence.",
    icon: Landmark,
  },
  geography: {
    key: "geography",
    name: "Geography",
    code: "313",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Fundamentals of Human Geography and India: People and Economy.",
    icon: Globe,
  },
  psychology: {
    key: "psychology",
    name: "Psychology",
    code: "324",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Psychological Disorders, Personality, Social Influence, and Therapeutic Approaches.",
    icon: BrainCircuit,
  },
  sociology: {
    key: "sociology",
    name: "Sociology",
    code: "325",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Indian Society, Social Institutions, and Social Change and Development.",
    icon: Users,
  },
  "physical-education": {
    key: "physical-education",
    name: "Physical Education",
    code: "321",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Management of Sports Events, Children & Women in Sports, Yoga, and Biomechanics.",
    icon: Activity,
  },
  "computer-science": {
    key: "computer-science",
    name: "Computer Science / IP",
    code: "308",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 60,
    subtitle:
      "Official NTA CUET CBT papers covering Computational Thinking, Python Programming, SQL Databases, and Computer Networks.",
    icon: Laptop,
  },
  "home-science": {
    key: "home-science",
    name: "Home Science",
    code: "315",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Clinical Nutrition, Human Development, Fabric and Apparel, and Resource Management.",
    icon: Home,
  },
  "mass-media": {
    key: "mass-media",
    name: "Mass Media & Communication",
    code: "318",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Communication Theories, Journalism, Cinema, Radio & Television, and New Media.",
    icon: Tv,
  },
  "environmental-studies": {
    key: "environmental-studies",
    name: "Environmental Studies",
    code: "307",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Human & Environment, Ecosystem Dynamics, Pollution, and Sustainable Development.",
    icon: Leaf,
  },
  "fine-arts": {
    key: "fine-arts",
    name: "Fine Arts / Visual Arts",
    code: "311",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Rajasthani, Pahari, Mughal & Deccan Miniatures, Bengal School, and Modern Indian Art.",
    icon: Palette,
  },
  agriculture: {
    key: "agriculture",
    name: "Agriculture",
    code: "302",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Agrometeorology, Genetics, Livestock Production, Crop Production, and Horticulture.",
    icon: Sprout,
  },
  anthropology: {
    key: "anthropology",
    name: "Anthropology",
    code: "303",
    isLive: true,
    paperCount: 5,
    totalQuestions: 250,
    durationMinutes: 45,
    subtitle:
      "Official NTA CUET CBT papers covering Physical Anthropology, Prehistoric Archaeology, Socio-Cultural Anthropology, and Tribal Studies.",
    icon: Footprints,
  },
};

export default function PYQsPage() {
  const { t } = useTranslation();
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const [selectedStream, setSelectedStream] = useState<StreamKey>("all");
  const [selectedTab, setSelectedTab] = useState<SubjectKey>("all");

  const allPYQsList: PYQTestItem[] = useMemo(() => {
    return getAllPYQTests();
  }, []);

  const displayedTests = useMemo(() => {
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

  const activeSubjectInfo = selectedTab !== "all" ? PYQ_SUBJECT_CONFIGS[selectedTab] : null;
  const activeStreamInfo = selectedStream !== "all" ? STREAM_CONFIGS[selectedStream] : null;

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

  // Subjects to show in the subject dropdown select
  const availableSubjectsForDropdown = useMemo(() => {
    if (selectedStream === "all") {
      return Object.values(PYQ_SUBJECT_CONFIGS);
    }
    return STREAM_CONFIGS[selectedStream].subjects.map((k) => PYQ_SUBJECT_CONFIGS[k]);
  }, [selectedStream]);

  if (!isClient) {
    return <div className="min-h-screen bg-[#FAF7EE]" />;
  }

  return (
    <div className="min-h-screen bg-[#FAF7EE] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto mb-10 space-y-8">
        {/* Header Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-black uppercase bg-[#D1FAE5] text-[#065F46] px-2.5 py-1 rounded-md border border-black shadow-[1px_1px_0px_0px_#000]">
              20 Subjects Live
            </span>
            <span className="text-[11px] font-black uppercase bg-[#FEF3C7] text-black px-2.5 py-1 rounded-md border border-black shadow-[1px_1px_0px_0px_#000]">
              100 Official CBT Papers
            </span>
            <span className="text-[11px] font-black uppercase bg-white text-black px-2.5 py-1 rounded-md border border-black shadow-[1px_1px_0px_0px_#000]">
              5,000 Questions
            </span>
            <span className="text-[11px] font-black uppercase bg-[#E0F2FE] text-[#0369A1] px-2.5 py-1 rounded-md border border-black shadow-[1px_1px_0px_0px_#000]">
              Official NTA Pattern (+5 / -1)
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF5C5C] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <FileText className="w-5 h-5" />
            </div>
            Previous Year Questions (PYQs)
          </h1>
          <p className="text-black/60 font-bold text-base md:text-lg">
            Practice authentic official NTA CUET UG CBT examination papers (2024, 2023, 2022) with verified solutions, continuous timer & AI diagnostics.
          </p>
        </div>

        {/* Stream & Subject Dropdown Controls */}
        <div className="bg-white rounded-xl border-2 border-black p-5 md:p-6 shadow-[4px_4px_0px_0px_#000]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stream Dropdown Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase text-black/70 tracking-wider block">
                Select Stream:
              </label>
              <div className="relative">
                <select
                  value={selectedStream}
                  onChange={(e) => handleSelectStream(e.target.value as StreamKey)}
                  className="w-full bg-[#FAF7EE] hover:bg-white text-black font-black text-sm px-4 py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] focus:outline-none cursor-pointer appearance-none pr-10"
                >
                  <option value="all">All Streams (100 Total PYQs)</option>
                  <option value="science">Science Stream (7 Subjects • 35 PYQs)</option>
                  <option value="commerce">Commerce Stream (4 Subjects • 20 PYQs)</option>
                  <option value="humanities">Humanities & Arts (10 Subjects • 50 PYQs)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-black/60 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Subject Dropdown Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase text-black/70 tracking-wider block">
                Select Subject:
              </label>
              <div className="relative">
                <select
                  value={selectedTab}
                  onChange={(e) => handleSelectSubject(e.target.value as SubjectKey)}
                  className="w-full bg-[#FAF7EE] hover:bg-white text-black font-black text-sm px-4 py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] focus:outline-none cursor-pointer appearance-none pr-10"
                >
                  <option value="all">
                    {selectedStream === "all"
                      ? "All 20 Domain Subjects"
                      : `All Subjects in ${STREAM_CONFIGS[selectedStream].name} (${STREAM_CONFIGS[selectedStream].subjects.length} Subjects)`}
                  </option>
                  {selectedStream === "all" ? (
                    <>
                      <optgroup label="Science Stream">
                        {STREAM_CONFIGS.science.subjects.map((k) => (
                          <option key={`sci-${k}`} value={k}>
                            {PYQ_SUBJECT_CONFIGS[k].name} (Code {PYQ_SUBJECT_CONFIGS[k].code} • 5 PYQs)
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Commerce Stream">
                        {STREAM_CONFIGS.commerce.subjects.map((k) => (
                          <option key={`com-${k}`} value={k}>
                            {PYQ_SUBJECT_CONFIGS[k].name} (Code {PYQ_SUBJECT_CONFIGS[k].code} • 5 PYQs)
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Humanities & Arts Stream">
                        {STREAM_CONFIGS.humanities.subjects.map((k) => (
                          <option key={`hum-${k}`} value={k}>
                            {PYQ_SUBJECT_CONFIGS[k].name} (Code {PYQ_SUBJECT_CONFIGS[k].code} • 5 PYQs)
                          </option>
                        ))}
                      </optgroup>
                    </>
                  ) : (
                    availableSubjectsForDropdown.map((sub) => (
                      <option key={sub.key} value={sub.key}>
                        {sub.name} (Code {sub.code} • 5 PYQs)
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown className="w-4 h-4 text-black/60 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Domain Heading Banner */}
        {activeSubjectInfo && (
          <div className="bg-white rounded-xl border-2 border-black p-5 md:p-6 shadow-[4px_4px_0px_0px_#000] space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-[#E0F2FE] border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
                  <activeSubjectInfo.icon className="w-6 h-6 text-[#0369A1]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl md:text-2xl font-black text-black">
                      {activeSubjectInfo.name} Official CUET PYQ Papers
                    </h2>
                    <span className="text-xs font-black uppercase bg-[#D1FAE5] text-[#065F46] border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                      {activeSubjectInfo.paperCount} Official Papers Live
                    </span>
                    <span className="text-xs font-black uppercase bg-[#FEF3C7] text-black border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                      Code: {activeSubjectInfo.code}
                    </span>
                    <span className="text-xs font-black uppercase bg-[#FAF7EE] text-black border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                      {activeSubjectInfo.durationMinutes} Minutes
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-black/70">
                    {activeSubjectInfo.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/dashboard/pyqs/${activeSubjectInfo.key}`}
                  className="px-4 py-2 rounded-lg font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all bg-[#FF5C5C] text-white hover:bg-[#FF4545] flex items-center gap-1.5"
                >
                  <span>Open Full Subject Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Stream Heading Banner */}
        {!activeSubjectInfo && activeStreamInfo && (
          <div className="bg-white rounded-xl border-2 border-black p-5 md:p-6 shadow-[4px_4px_0px_0px_#000] space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl md:text-2xl font-black text-black">
                {activeStreamInfo.name} Official CUET PYQs
              </h2>
              <span className="text-xs font-black uppercase bg-[#D1FAE5] text-[#065F46] border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                {activeStreamInfo.badge}
              </span>
            </div>
            <p className="text-sm font-semibold text-black/70">
              Showing all {displayedTests.length} official papers across {activeStreamInfo.name}.
            </p>
          </div>
        )}

        {/* Papers Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-black flex items-center gap-2">
              <span>
                {selectedTab === "all"
                  ? selectedStream === "all"
                    ? "Official CUET NTA CBT Examination Papers"
                    : `${STREAM_CONFIGS[selectedStream].name} Official Papers`
                  : `${activeSubjectInfo?.name} Official Papers (${displayedTests.length} Papers)`}
              </span>
              <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full font-bold">
                {displayedTests.length}
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedTests.map((test) => {
              const stats = isClient
                ? getTestAttemptStats(testAttempts, test.id)
                : { attemptsCount: 0, bestAttempt: null, latestAttempt: null, hasAttempted: false };
              const hasAttempted = stats.hasAttempted && stats.bestAttempt !== null;
              const best = stats.bestAttempt;

              return (
                <div
                  key={test.id}
                  className="bg-white rounded-xl border-2 border-black p-5 shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase bg-[#FEF3C7] px-2 py-0.5 rounded border border-black">
                        {test.subjectName} • Code {test.code}
                      </span>
                      <span className="text-[10px] font-black uppercase bg-[#D1FAE5] text-[#065F46] px-2 py-0.5 rounded border border-black">
                        {test.year} Official
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-black leading-snug">
                        {test.label}
                      </h4>
                      <p className="text-xs text-black/70 font-bold mt-1">
                        {test.yearLabel}
                      </p>
                    </div>

                    {/* Best Score Badge if attempted */}
                    {hasAttempted && best && (
                      <div className="p-2 rounded-lg bg-[#FEF3C7] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                          <span className="text-[11px] font-black text-black">
                            Best: {best.totalMarks} / {best.maxMarks}
                          </span>
                        </div>
                        <span className="text-[10px] font-black text-black/70 font-mono">
                          {best.accuracyPercentage}% Acc • {stats.attemptsCount}{" "}
                          {stats.attemptsCount === 1 ? "attempt" : "attempts"}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs font-bold text-black/60">
                      <span className="flex items-center gap-1">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        {test.questions} Compulsory Qs
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Timer className="w-3.5 h-3.5" />
                        {test.duration}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {test.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold bg-[#FAF7EE] text-black/80 px-1.5 py-0.5 rounded border border-black/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/10">
                    {hasAttempted ? (
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/test/${test.id}?reattempt=true`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>{t("reattemptTest", "Re-attempt")}</span>
                        </Link>
                        <Link
                          href={`/test/${test.id}`}
                          className="px-3 py-2.5 rounded-lg border-2 border-black bg-white hover:bg-[#FAF7EE] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000] transition-all"
                        >
                          {t("scorecardTitle", "Result")}
                        </Link>
                      </div>
                    ) : (
                      <Link
                        href={`/test/${test.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] transition-all"
                      >
                        <span>Start Official Paper</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
