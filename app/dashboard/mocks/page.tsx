"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  getMockTestsForSubject,
  MockTestItem,
} from "@/lib/data/subjects";
import {
  ArrowRight,
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
import { ScheduleMockTest } from "@/components/dashboard/prep-pulse/ScheduleMockTest";

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
    badge: "10 Domains",
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
    subtitle: "20 full-length CBT mocks · 1,000 questions · 60 minutes per paper",
    icon: Atom,
  },
  chemistry: {
    key: "chemistry",
    name: "Chemistry",
    code: "306",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 60 minutes per paper",
    icon: FlaskConical,
  },
  mathematics: {
    key: "mathematics",
    name: "Mathematics",
    code: "319",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 60 minutes per paper",
    icon: Binary,
  },
  biology: {
    key: "biology",
    name: "Biology",
    code: "304",
    isLive: true,
    mockCount: 12,
    totalQuestions: 600,
    subtitle: "12 full-length CBT mocks · 600 questions · 45 minutes per paper",
    icon: Dna,
  },
  accountancy: {
    key: "accountancy",
    name: "Accountancy",
    code: "301",
    isLive: true,
    mockCount: 18,
    totalQuestions: 900,
    subtitle: "18 full-length CBT mocks · 900 questions · 60 minutes per paper",
    icon: Calculator,
  },
  "business-studies": {
    key: "business-studies",
    name: "Business Studies",
    code: "305",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: Briefcase,
  },
  economics: {
    key: "economics",
    name: "Economics",
    code: "309",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 60 minutes per paper",
    icon: TrendingUp,
  },
  history: {
    key: "history",
    name: "History",
    code: "314",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: ScrollText,
  },
  "political-science": {
    key: "political-science",
    name: "Political Science",
    code: "323",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: Landmark,
  },
  geography: {
    key: "geography",
    name: "Geography",
    code: "313",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: Globe,
  },
  psychology: {
    key: "psychology",
    name: "Psychology",
    code: "324",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: BrainCircuit,
  },
  sociology: {
    key: "sociology",
    name: "Sociology",
    code: "325",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: Users,
  },
  "physical-education": {
    key: "physical-education",
    name: "Physical Education",
    code: "321",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: Activity,
  },
  "computer-science": {
    key: "computer-science",
    name: "Computer Science / IP",
    code: "308",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 60 minutes per paper",
    icon: Laptop,
  },
  "home-science": {
    key: "home-science",
    name: "Home Science",
    code: "315",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: Home,
  },
  "mass-media": {
    key: "mass-media",
    name: "Mass Media & Communication",
    code: "318",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: Tv,
  },
  "environmental-studies": {
    key: "environmental-studies",
    name: "Environmental Studies",
    code: "307",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: Leaf,
  },
  "fine-arts": {
    key: "fine-arts",
    name: "Fine Arts / Visual Arts",
    code: "311",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: Palette,
  },
  agriculture: {
    key: "agriculture",
    name: "Agriculture",
    code: "302",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: Sprout,
  },
  anthropology: {
    key: "anthropology",
    name: "Anthropology",
    code: "303",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle: "20 full-length CBT mocks · 1,000 questions · 45 minutes per paper",
    icon: Footprints,
  },
};

export default function MocksPage() {
  const { t } = useTranslation();
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const [selectedStream, setSelectedStream] = useState<StreamKey>("all");
  const [selectedTab, setSelectedTab] = useState<SubjectKey>("all");

  const allMocksList = useMemo(() => {
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

  const availableSubjectsForDropdown = useMemo(() => {
    if (selectedStream === "all") {
      return Object.values(SUBJECT_CONFIGS);
    }
    return STREAM_CONFIGS[selectedStream].subjects.map((k) => SUBJECT_CONFIGS[k]);
  }, [selectedStream]);

  return (
    <div className="w-full min-w-0 max-w-[1120px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-[28px] font-semibold text-[var(--text)] leading-[1.25]">
          Mock tests
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5]">
          Full-length practice tests across domain subjects with standard CUET scoring (+5 / -1).
        </p>
      </div>

      {/* Schedule Mock Section */}
      <div className="mb-6">
        <ScheduleMockTest />
      </div>

      {/* Stream & Subject Dropdown Controls */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Select Stream */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
              Filter by Stream:
            </label>
            <div className="relative">
              <select
                value={selectedStream}
                onChange={(e) => handleSelectStream(e.target.value as StreamKey)}
                className="w-full bg-slate-50 hover:bg-slate-100/70 text-slate-800 font-semibold text-sm px-4 py-3 rounded-2xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-10 transition-all"
              >
                <option value="all">All Domain Streams (20 Subjects)</option>
                <option value="science">Science Stream (7 Subjects)</option>
                <option value="commerce">Commerce Stream (4 Subjects)</option>
                <option value="humanities">Humanities & Arts (10 Subjects)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Select Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
              Filter by Subject:
            </label>
            <div className="relative">
              <select
                value={selectedTab}
                onChange={(e) => handleSelectSubject(e.target.value as SubjectKey)}
                className="w-full bg-slate-50 hover:bg-slate-100/70 text-slate-800 font-semibold text-sm px-4 py-3 rounded-2xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-10 transition-all"
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
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Subject Banner */}
      {activeSubjectInfo && (
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center shrink-0 text-blue-600">
              <activeSubjectInfo.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {activeSubjectInfo.name}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                {activeSubjectInfo.mockCount} full-length CBT mocks · {activeSubjectInfo.totalQuestions.toLocaleString()} questions · Code {activeSubjectInfo.code}
              </p>
            </div>
          </div>

          <Link
            href={`/dashboard/mocks/${activeSubjectInfo.key}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm hover:shadow-md transition-all shrink-0 self-start md:self-auto"
          >
            <span>Open Full Subject Suite</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Active Stream Banner */}
      {!activeSubjectInfo && activeStreamInfo && (
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {activeStreamInfo.name}
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            {displayedTests.length} full-length CBT mocks available across {activeStreamInfo.name.toLowerCase()}
          </p>
        </div>
      )}

      {/* Mock Test Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {selectedTab === "all"
              ? selectedStream === "all"
                ? "Available Mock Papers"
                : `${STREAM_CONFIGS[selectedStream].name} Papers`
              : `${activeSubjectInfo?.name} CBT Papers`}
            <span className="text-xs font-medium text-slate-400 ml-2">
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
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {test.subjectName} · Code {test.code}
                      </p>
                      <h4 className="text-lg font-bold text-slate-900 leading-snug mt-0.5">
                        {test.label}
                      </h4>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        {test.mockLabel} · Full Syllabus CBT
                      </p>
                    </div>

                    {hasAttempted && best && (
                      <div className="px-3.5 py-2 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-between gap-2 text-xs font-semibold text-amber-900">
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>Best: {best.totalMarks} / {best.maxMarks}</span>
                        </div>
                        <span className="text-amber-700/80 text-[11px] font-mono">
                          {best.accuracyPercentage}% Acc ({stats.attemptsCount} {stats.attemptsCount === 1 ? "attempt" : "attempts"})
                        </span>
                      </div>
                    )}

                    <p className="text-xs font-medium text-slate-500">
                      50 Questions · {test.duration}
                    </p>
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
                          href={`/dashboard/mocks/analysis/${best?.id || test.id}`}
                          className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all"
                        >
                          Analysis
                        </Link>
                        <Link
                          href={`/test/${test.id}`}
                          className="px-2.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all"
                        >
                          Scorecard
                        </Link>
                      </div>
                    ) : (
                      <Link
                        href={`/test/${test.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all"
                      >
                        <span>{t("startTest", "Start Test")}</span>
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
              <h3 className="text-xl font-bold text-slate-900">
                {activeSubjectInfo ? `${activeSubjectInfo.name} Mocks Being Prepared` : "Mock Papers Under Preparation"}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Full CBT mock papers for this subject are being calibrated according to the latest NTA CUET UG CBT pattern and will be published shortly.
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
