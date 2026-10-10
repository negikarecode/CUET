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
  | "anthropology"
  | "english"
  | "general-test";

type StreamKey = "all" | "science" | "commerce" | "humanities" | "common";

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
    badge: "7 Domains • 150 Official Papers Live",
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
    badge: "4 Domains • 81 Official Papers Live",
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
    badge: "10 Domains • 150 Official Papers Live",
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
    name: "Common & Languages",
    shortName: "General/Lang",
    badge: "2 Subjects • 50 Official Papers Live",
    accentBg: "#F0FDF4",
    accentText: "#15803D",
    subjects: [
      "english",
      "general-test",
    ],
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
  const count = tests.length || 5;
  return {
    key,
    name,
    code,
    isLive: true,
    paperCount: count,
    totalQuestions: count * 50,
    durationMinutes,
    subtitle,
    icon,
  };
}

const PYQ_SUBJECT_CONFIGS: Record<Exclude<SubjectKey, "all">, SubjectMeta> = {
  physics: makeSubjectMeta("physics", "Physics", "312", 60, "Official NTA CUET CBT shift papers with complete step-by-step NCERT solutions.", Atom),
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
  sociology: makeSubjectMeta("sociology", "Sociology", "325", 45, "Official NTA CUET CBT shift papers covering Indian Society, Social Institutions, and Social Change.", Users),
  "physical-education": makeSubjectMeta("physical-education", "Physical Education", "321", 45, "Official NTA CUET CBT shift papers covering Sports Events, Yoga, and Biomechanics.", Activity),
  "computer-science": makeSubjectMeta("computer-science", "Computer Science / IP", "308", 60, "Official NTA CUET CBT shift papers covering Python, SQL Databases, and Computer Networks.", Laptop),
  "home-science": makeSubjectMeta("home-science", "Home Science", "315", 45, "Official NTA CUET CBT shift papers covering Clinical Nutrition, Human Development, and Apparel.", Home),
  "mass-media": makeSubjectMeta("mass-media", "Mass Media & Communication", "318", 45, "Official NTA CUET CBT shift papers covering Journalism, Cinema, Radio, and New Media.", Tv),
  "environmental-studies": makeSubjectMeta("environmental-studies", "Environmental Studies", "307", 45, "Official NTA CUET CBT shift papers covering Ecosystems, Pollution, and Sustainable Development.", Leaf),
  "fine-arts": makeSubjectMeta("fine-arts", "Fine Arts / Visual Arts", "311", 45, "Official NTA CUET CBT shift papers covering Miniature Paintings, Bengal School, and Modern Art.", Palette),
  agriculture: makeSubjectMeta("agriculture", "Agriculture", "302", 45, "Official NTA CUET CBT shift papers covering Agrometeorology, Genetics, Livestock, and Crop Production.", Sprout),
  anthropology: makeSubjectMeta("anthropology", "Anthropology", "303", 45, "Official NTA CUET CBT shift papers covering Physical, Archaeological, and Social Anthropology.", Footprints),
  english: makeSubjectMeta("english", "English Language", "101", 45, "Official NTA CUET CBT shift papers covering Reading Comprehension, Vocabulary, and Verbal Ability.", FileText),
  "general-test": makeSubjectMeta("general-test", "General Aptitude Test", "501", 60, "Official NTA CUET CBT shift papers covering General Knowledge, Mental Ability, and Quantitative Aptitude.", Trophy),
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
    return <div className="min-h-screen bg-[#F8FAFC]" />;
  }

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6 sm:space-y-8">
      {/* Header Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200/60">
              110 Official Papers Live
            </span>
            <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200/60">
              All 22 Subjects Live
            </span>
            <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
              5,500 Questions
            </span>
            <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200/60">
              Official NTA Pattern (+5 / -1)
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20 shrink-0">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            Previous Year Questions (PYQs)
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-3xl">
            Practice authentic official NTA CUET UG CBT examination papers (2024, 2023, 2022) with verified solutions, continuous timer & AI diagnostics.
          </p>
        </div>

        {/* Stream & Subject Dropdown Controls */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stream Dropdown Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
                Select Stream:
              </label>
              <div className="relative">
                <select
                  value={selectedStream}
                  onChange={(e) => handleSelectStream(e.target.value as StreamKey)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 text-slate-800 font-semibold text-sm px-4 py-3 rounded-2xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-10 transition-all"
                >
                  <option value="all">All Streams (22 Subjects • 411 Papers Live)</option>
                  <option value="science">Science Stream (7 Subjects • 150 Papers Live)</option>
                  <option value="commerce">Commerce Stream (4 Subjects • 81 Papers Live)</option>
                  <option value="humanities">Humanities & Arts (10 Subjects • 150 Papers Live)</option>
                  <option value="common">Common & Languages (2 Subjects • 50 Papers Live)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Subject Dropdown Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
                Select Subject:
              </label>
              <div className="relative">
                <select
                  value={selectedTab}
                  onChange={(e) => handleSelectSubject(e.target.value as SubjectKey)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 text-slate-800 font-semibold text-sm px-4 py-3 rounded-2xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-10 transition-all"
                >
                  <option value="all">
                    {selectedStream === "all"
                      ? "All 22 Subjects (411 Papers Live)"
                      : `All Subjects in ${STREAM_CONFIGS[selectedStream].name} (${STREAM_CONFIGS[selectedStream].subjects.length} Subjects)`}
                  </option>
                  {selectedStream === "all" ? (
                    <>
                      <optgroup label="Science Stream">
                        {STREAM_CONFIGS.science.subjects.map((k) => (
                          <option key={`sci-${k}`} value={k}>
                            {PYQ_SUBJECT_CONFIGS[k].name} (Code {PYQ_SUBJECT_CONFIGS[k].code} • {PYQ_SUBJECT_CONFIGS[k].paperCount} Papers Live)
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Commerce Stream">
                        {STREAM_CONFIGS.commerce.subjects.map((k) => (
                          <option key={`com-${k}`} value={k}>
                            {PYQ_SUBJECT_CONFIGS[k].name} (Code {PYQ_SUBJECT_CONFIGS[k].code} • {PYQ_SUBJECT_CONFIGS[k].paperCount} Papers Live)
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Humanities & Arts Stream">
                        {STREAM_CONFIGS.humanities.subjects.map((k) => (
                          <option key={`hum-${k}`} value={k}>
                            {PYQ_SUBJECT_CONFIGS[k].name} (Code {PYQ_SUBJECT_CONFIGS[k].code} • {PYQ_SUBJECT_CONFIGS[k].paperCount} Papers Live)
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Common & Languages">
                        {STREAM_CONFIGS.common.subjects.map((k) => (
                          <option key={`comn-${k}`} value={k}>
                            {PYQ_SUBJECT_CONFIGS[k].name} (Code {PYQ_SUBJECT_CONFIGS[k].code} • {PYQ_SUBJECT_CONFIGS[k].paperCount} Papers Live)
                          </option>
                        ))}
                      </optgroup>
                    </>
                  ) : (
                    availableSubjectsForDropdown.map((sub) => (
                      <option key={sub.key} value={sub.key}>
                        {sub.name} (Code {sub.code} • {sub.paperCount} Papers Live)
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Domain Heading Banner */}
        {activeSubjectInfo && (
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center shrink-0 text-blue-600">
                  <activeSubjectInfo.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      {activeSubjectInfo.name} Official CUET PYQ Papers
                    </h2>
                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                      {activeSubjectInfo.isLive ? `${activeSubjectInfo.paperCount} Papers Live` : "In Preparation / Rebuilding"}
                    </span>
                    <span className="text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/60 px-2.5 py-0.5 rounded-full">
                      Code: {activeSubjectInfo.code}
                    </span>
                    <span className="text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-full">
                      {activeSubjectInfo.durationMinutes} Minutes
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    {activeSubjectInfo.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/dashboard/pyqs/${activeSubjectInfo.key}`}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
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
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                {activeStreamInfo.name} Official CUET PYQs
              </h2>
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                {activeStreamInfo.badge}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">
              Showing all {displayedTests.length} official papers across {activeStreamInfo.name}.
            </p>
          </div>
        )}

        {/* Papers Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>
                {selectedTab === "all"
                  ? selectedStream === "all"
                    ? "Official CUET NTA CBT Examination Papers"
                    : `${STREAM_CONFIGS[selectedStream].name} Official Papers`
                  : `${activeSubjectInfo?.name} Official Papers`}
              </span>
              <span className="text-xs font-semibold text-slate-400 ml-1">
                ({displayedTests.length} papers)
              </span>
            </h3>
          </div>

          {displayedTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
            {displayedTests.map((test) => {
              const stats = isClient
                ? getTestAttemptStats(testAttempts, test.id)
                : { attemptsCount: 0, bestAttempt: null, latestAttempt: null, hasAttempted: false };
              const hasAttempted = stats.hasAttempted && stats.bestAttempt !== null;
              const best = stats.bestAttempt;

              return (
                <div
                  key={test.id}
                  className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 min-w-0"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                        {test.subjectName} • Code {test.code}
                      </span>
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        {test.year} Official
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-slate-900 leading-snug">
                        {test.label}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {test.yearLabel}
                      </p>
                    </div>

                    {/* Best Score Badge if attempted */}
                    {hasAttempted && best && (
                      <div className="px-3.5 py-2 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-between gap-2 text-xs font-semibold text-amber-900">
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>
                            Best: {best.totalMarks} / {best.maxMarks}
                          </span>
                        </div>
                        <span className="text-amber-700/80 text-[11px] font-mono">
                          {best.accuracyPercentage}% Acc • {stats.attemptsCount}{" "}
                          {stats.attemptsCount === 1 ? "attempt" : "attempts"}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
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

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {test.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    {hasAttempted ? (
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/test/${test.id}?reattempt=true`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-2xs hover:shadow-sm transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
                          <span>{t("reattemptTest", "Re-attempt")}</span>
                        </Link>
                        <Link
                          href={`/test/${test.id}`}
                          className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all"
                        >
                          {t("scorecardTitle", "Result")}
                        </Link>
                      </div>
                    ) : (
                      <Link
                        href={`/test/${test.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all"
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
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-sm text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mx-auto text-amber-600">
              <RotateCcw className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-2 max-w-lg mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-[11px] font-semibold text-amber-800">
                <span>Under Active Reconstruction</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {activeSubjectInfo ? `${activeSubjectInfo.name} Official PYQs Being Remade` : "Official PYQ Papers Under Reconstruction"}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Authentic NTA CUET past year shift papers (2022–2025) are currently being digitized, NCERT-verified, and recalibrated into the modern 50-compulsory-questions CBT simulator. Updated papers will be released shortly.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <span>Back to Command Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
