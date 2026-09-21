"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  getMockTestsForSubject,
  MockTestItem,
} from "@/lib/data/subjects";
import {
  ClipboardCheck,
  ArrowRight,
  ChevronDown,
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
  mockCount: number;
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
    badge: "7 Domains • 140 Mocks",
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
    badge: "4 Domains • 80 Mocks",
    accentBg: "#FEF3C7",
    accentText: "#92400E",
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
    badge: "10 Domains • 200 Mocks",
    accentBg: "#FCE7F3",
    accentText: "#9D174D",
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
    code: "312",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 60 Minutes • Complete Full Syllabus Coverage",
    icon: Atom,
  },
  chemistry: {
    key: "chemistry",
    name: "Chemistry",
    code: "306",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 60 Minutes • Complete Full Syllabus Coverage",
    icon: FlaskConical,
  },
  mathematics: {
    key: "mathematics",
    name: "Mathematics",
    code: "319",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 60 Minutes • Complete Full Syllabus Coverage",
    icon: Binary,
  },
  biology: {
    key: "biology",
    name: "Biology",
    code: "304",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Complete Full Syllabus Coverage",
    icon: Dna,
  },
  accountancy: {
    key: "accountancy",
    name: "Accountancy",
    code: "301",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 60 Minutes • Complete Full Syllabus Coverage",
    icon: Calculator,
  },
  "business-studies": {
    key: "business-studies",
    name: "Business Studies",
    code: "305",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Standard NTA CUET CBT Syllabus",
    icon: Briefcase,
  },
  economics: {
    key: "economics",
    name: "Economics",
    code: "309",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 60 Minutes • Standard NTA CUET CBT Syllabus",
    icon: TrendingUp,
  },
  history: {
    key: "history",
    name: "History",
    code: "314",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Themes in Indian History Parts I, II & III",
    icon: ScrollText,
  },
  "political-science": {
    key: "political-science",
    name: "Political Science",
    code: "323",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Contemporary World Politics & Politics in India",
    icon: Landmark,
  },
  geography: {
    key: "geography",
    name: "Geography",
    code: "313",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Fundamentals of Human Geography & India: People and Economy",
    icon: Globe,
  },
  psychology: {
    key: "psychology",
    name: "Psychology",
    code: "324",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • NCERT Class 12 Variations, Personality & Disorders",
    icon: BrainCircuit,
  },
  sociology: {
    key: "sociology",
    name: "Sociology",
    code: "325",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Structure of Indian Society & Social Change",
    icon: Users,
  },
  "physical-education": {
    key: "physical-education",
    name: "Physical Education",
    code: "321",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Sports Events, Yoga, Nutrition & Biomechanics",
    icon: Activity,
  },
  "computer-science": {
    key: "computer-science",
    name: "Computer Science / IP",
    code: "308",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 60 Minutes • Computational Thinking, Python, SQL & Networks",
    icon: Laptop,
  },
  "home-science": {
    key: "home-science",
    name: "Home Science",
    code: "315",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Clinical Nutrition, Human Development & Resource Management",
    icon: Home,
  },
  "mass-media": {
    key: "mass-media",
    name: "Mass Media & Communication",
    code: "318",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Communication Theories, Journalism, Cinema & New Media",
    icon: Tv,
  },
  "environmental-studies": {
    key: "environmental-studies",
    name: "Environmental Studies",
    code: "307",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Ecosystem Ecology, Pollution & Sustainable Development",
    icon: Leaf,
  },
  "fine-arts": {
    key: "fine-arts",
    name: "Fine Arts / Visual Arts",
    code: "311",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Miniature Painting, Mughal & Bengal Schools, Modern Art",
    icon: Palette,
  },
  agriculture: {
    key: "agriculture",
    name: "Agriculture",
    code: "302",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Agrometeorology, Genetics, Livestock, Agronomy & Horticulture",
    icon: Sprout,
  },
  anthropology: {
    key: "anthropology",
    name: "Anthropology",
    code: "303",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Physical & Cultural Anthropology, Prehistory & Tribal Studies",
    icon: Footprints,
  },
};

export default function MocksPage() {
  const { t } = useTranslation();
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const [selectedStream, setSelectedStream] = useState<StreamKey>("all");
  const [selectedTab, setSelectedTab] = useState<SubjectKey>("all");

  const allMocksList: Array<
    MockTestItem & { subjectName: string; subjectSlug: string; code: string }
  > = useMemo(() => {
    const list: Array<
      MockTestItem & { subjectName: string; subjectSlug: string; code: string }
    > = [];

    (Object.keys(SUBJECT_CONFIGS) as Array<Exclude<SubjectKey, "all">>).forEach((subKey) => {
      const config = SUBJECT_CONFIGS[subKey];
      const tests = getMockTestsForSubject(subKey);
      tests.forEach((t) => {
        list.push({
          ...t,
          subjectName: config.name,
          subjectSlug: config.key,
          code: config.code,
        });
      });
    });

    return list;
  }, []);

  // Filter tests based on selected stream and subject
  const displayedTests = useMemo(() => {
    if (selectedTab !== "all") {
      return allMocksList.filter((m) => m.subjectSlug === selectedTab);
    }
    if (selectedStream !== "all") {
      const allowed = STREAM_CONFIGS[selectedStream].subjects;
      return allMocksList.filter((m) => allowed.includes(m.subjectSlug as any));
    }
    return allMocksList;
  }, [allMocksList, selectedStream, selectedTab]);

  const activeSubjectInfo = selectedTab !== "all" ? SUBJECT_CONFIGS[selectedTab] : null;
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
      return Object.values(SUBJECT_CONFIGS);
    }
    return STREAM_CONFIGS[selectedStream].subjects.map((k) => SUBJECT_CONFIGS[k]);
  }, [selectedStream]);

  return (
    <div className="min-h-screen bg-[#FAF7EE] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto mb-10 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-black uppercase bg-[#D1FAE5] text-[#065F46] px-2.5 py-1 rounded-md border border-black shadow-[1px_1px_0px_0px_#000]">
              20 Subjects Live
            </span>
            <span className="text-[11px] font-black uppercase bg-[#FEF3C7] text-black px-2.5 py-1 rounded-md border border-black shadow-[1px_1px_0px_0px_#000]">
              400 Full Mocks
            </span>
            <span className="text-[11px] font-black uppercase bg-white text-black px-2.5 py-1 rounded-md border border-black shadow-[1px_1px_0px_0px_#000]">
              20,000 Questions
            </span>
            <span className="text-[11px] font-black uppercase bg-[#E0F2FE] text-[#0369A1] px-2.5 py-1 rounded-md border border-black shadow-[1px_1px_0px_0px_#000]">
              Official NTA CBT Pattern (+5 / -1)
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF5C5C] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            Full-Length Mock Tests
          </h1>
          <p className="text-black/60 font-bold text-base md:text-lg">
            Complete full-length NTA CUET UG CBT mock papers with real-time timer, +5 / -1 scoring & AI diagnostics.
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
                  <option value="all">All Streams (400 Total Mocks)</option>
                  <option value="science">Science Stream (7 Subjects • 140 Mocks)</option>
                  <option value="commerce">Commerce Stream (4 Subjects • 80 Mocks)</option>
                  <option value="humanities">Humanities & Arts (10 Subjects • 200 Mocks)</option>
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
                            {SUBJECT_CONFIGS[k].name} (Code {SUBJECT_CONFIGS[k].code} • 20 Mocks)
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Commerce Stream">
                        {STREAM_CONFIGS.commerce.subjects.map((k) => (
                          <option key={`com-${k}`} value={k}>
                            {SUBJECT_CONFIGS[k].name} (Code {SUBJECT_CONFIGS[k].code} • 20 Mocks)
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Humanities & Arts Stream">
                        {STREAM_CONFIGS.humanities.subjects.map((k) => (
                          <option key={`hum-${k}`} value={k}>
                            {SUBJECT_CONFIGS[k].name} (Code {SUBJECT_CONFIGS[k].code} • 20 Mocks)
                          </option>
                        ))}
                      </optgroup>
                    </>
                  ) : (
                    availableSubjectsForDropdown.map((sub) => (
                      <option key={sub.key} value={sub.key}>
                        {sub.name} (Code {sub.code} • 20 Mocks)
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown className="w-4 h-4 text-black/60 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* DOMAIN HEADING BANNER: rendered when a specific subject is selected */}
        {/* =============================================================== */}
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
                      {activeSubjectInfo.name} Domain Full CBT Mocks
                    </h2>
                    <span className="text-xs font-black uppercase bg-[#D1FAE5] text-[#065F46] border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                      {activeSubjectInfo.mockCount} Mocks Live
                    </span>
                    <span className="text-xs font-black uppercase bg-[#FEF3C7] text-black border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                      Code: {activeSubjectInfo.code}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-black/70">
                    {activeSubjectInfo.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/dashboard/mocks/${activeSubjectInfo.key}`}
                  className="px-4 py-2 rounded-lg font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all bg-[#FF5C5C] text-white hover:bg-[#FF4545] flex items-center gap-1.5"
                >
                  <span>Open Full Subject Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* STREAM HEADING BANNER: rendered when a stream is selected with all its subjects */}
        {/* =============================================================== */}
        {!activeSubjectInfo && activeStreamInfo && (
          <div className="bg-white rounded-xl border-2 border-black p-5 md:p-6 shadow-[4px_4px_0px_0px_#000] space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl md:text-2xl font-black text-black">
                {activeStreamInfo.name} Full CBT Mocks
              </h2>
              <span className="text-xs font-black uppercase bg-[#D1FAE5] text-[#065F46] border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                {activeStreamInfo.badge}
              </span>
            </div>
            <p className="text-sm font-semibold text-black/70">
              Showing all {displayedTests.length} mock tests across {activeStreamInfo.name}.
            </p>
          </div>
        )}

        {/* Mock Test Cards Grid / Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-black flex items-center gap-2">
              <span>
                {selectedTab === "all"
                  ? selectedStream === "all"
                    ? "Available Full-Length Mock Papers"
                    : `${STREAM_CONFIGS[selectedStream].name} Papers`
                  : `${activeSubjectInfo?.name} CBT Mock Papers (${displayedTests.length} Mocks)`}
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
                        Full CBT Mock
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-black leading-snug">
                        {test.label}
                      </h4>
                      <p className="text-xs text-black/70 font-bold mt-1">
                        {test.mockLabel}
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
                          {best.accuracyPercentage}% Acc • {stats.attemptsCount} {stats.attemptsCount === 1 ? "attempt" : "attempts"}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs font-bold text-black/60">
                      <span className="flex items-center gap-1">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        {test.questions} Questions
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
                        <span>{t("startTest", "Start This Mock")}</span>
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
