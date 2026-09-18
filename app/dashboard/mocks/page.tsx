"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  PHYSICS_MOCK_TESTS,
  CHEMISTRY_MOCK_TESTS,
  MATHS_MOCK_TESTS,
  BIOLOGY_MOCK_TESTS,
  ACCOUNTANCY_MOCK_TESTS,
  BUSINESS_STUDIES_MOCK_TESTS,
  ECONOMICS_MOCK_TESTS,
  HISTORY_MOCK_TESTS,
  POLITICAL_SCIENCE_MOCK_TESTS,
  GEOGRAPHY_MOCK_TESTS,
  PSYCHOLOGY_MOCK_TESTS,
  MockTestItem,
} from "@/lib/data/subjects";
import {
  ClipboardCheck,
  ArrowRight,
  Lock,
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
  Sparkles,
  RotateCcw,
  Trophy,
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
  | "psychology";

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

const SUBJECT_CONFIGS: Record<Exclude<SubjectKey, "all">, SubjectMeta> = {
  physics: {
    key: "physics",
    name: "Physics",
    code: "312",
    isLive: true,
    mockCount: 20,
    totalQuestions: 1000,
    subtitle:
      "1,000 Total Questions • 50 Compulsory Questions per Paper • Complete Full Syllabus Coverage",
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
      "1,000 Total Questions • 50 Compulsory Questions per Paper • Complete Full Syllabus Coverage",
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
      "1,000 Total Questions • 50 Compulsory Questions per Paper • Complete Full Syllabus Coverage",
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
      "1,000 Total Questions • 50 Compulsory Questions per Paper • Complete Full Syllabus Coverage",
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
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 60 Minutes • Standard NTA CUET CBT Syllabus",
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
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • Contemporary World Politics & Politics in India Since Independence",
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
      "1,000 Total Questions • 50 Compulsory Questions per Paper • 45 Minutes • NCERT Class 12 Variations, Personality, Disorders & Applied Skills",
    icon: BrainCircuit,
  },
};

export default function MocksPage() {
  const { t } = useTranslation();
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const [selectedTab, setSelectedTab] = useState<SubjectKey>("all");

  const allMocksList: Array<
    MockTestItem & { subjectName: string; subjectSlug: string; code: string }
  > = useMemo(() => {
    const list: Array<
      MockTestItem & { subjectName: string; subjectSlug: string; code: string }
    > = [];

    // Physics mocks (20 tests)
    PHYSICS_MOCK_TESTS.forEach((t) => {
      list.push({
        ...t,
        subjectName: "Physics",
        subjectSlug: "physics",
        code: "312",
      });
    });

    // Chemistry mocks (20 tests)
    CHEMISTRY_MOCK_TESTS.forEach((t) => {
      list.push({
        ...t,
        subjectName: "Chemistry",
        subjectSlug: "chemistry",
        code: "306",
      });
    });

    // Mathematics mocks (20 tests)
    MATHS_MOCK_TESTS.forEach((t) => {
      list.push({
        ...t,
        subjectName: "Mathematics",
        subjectSlug: "mathematics",
        code: "319",
      });
    });

    // Biology mocks (20 tests)
    BIOLOGY_MOCK_TESTS.forEach((t) => {
      list.push({
        ...t,
        subjectName: "Biology",
        subjectSlug: "biology",
        code: "304",
      });
    });

    // Accountancy mocks (20 tests)
    ACCOUNTANCY_MOCK_TESTS.forEach((t) => {
      list.push({
        ...t,
        subjectName: "Accountancy",
        subjectSlug: "accountancy",
        code: "301",
      });
    });

    // Business Studies mocks (20 tests)
    BUSINESS_STUDIES_MOCK_TESTS.forEach((t) => {
      list.push({
        ...t,
        subjectName: "Business Studies",
        subjectSlug: "business-studies",
        code: "305",
      });
    });

    // Economics mocks (20 tests)
    ECONOMICS_MOCK_TESTS.forEach((t) => {
      list.push({
        ...t,
        subjectName: "Economics",
        subjectSlug: "economics",
        code: "309",
      });
    });

    // History mocks (20 tests)
    HISTORY_MOCK_TESTS.forEach((t) => {
      list.push({
        ...t,
        subjectName: "History",
        subjectSlug: "history",
        code: "314",
      });
    });

    // Political Science mocks (20 tests)
    POLITICAL_SCIENCE_MOCK_TESTS.forEach((t) => {
      list.push({
        ...t,
        subjectName: "Political Science",
        subjectSlug: "political-science",
        code: "323",
      });
    });

    // Geography mocks (20 tests)
    GEOGRAPHY_MOCK_TESTS.forEach((t) => {
      list.push({
        ...t,
        subjectName: "Geography",
        subjectSlug: "geography",
        code: "313",
      });
    });

    // Psychology mocks (20 tests)
    PSYCHOLOGY_MOCK_TESTS.forEach((t) => {
      list.push({
        ...t,
        subjectName: "Psychology",
        subjectSlug: "psychology",
        code: "324",
      });
    });

    return list;
  }, []);

  const displayedTests = useMemo(() => {
    if (selectedTab === "all") {
      return allMocksList;
    }
    return allMocksList.filter((m) => m.subjectSlug === selectedTab);
  }, [allMocksList, selectedTab]);

  const activeSubjectInfo = selectedTab !== "all" ? SUBJECT_CONFIGS[selectedTab] : null;

  return (
    <div className="min-h-screen bg-[#FAF7EE] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto mb-10 space-y-8">
        {/* Header */}
        <div className="space-y-2">
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

        {/* Filter Tabs by Subject */}
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <button
            type="button"
            onClick={() => setSelectedTab("all")}
            className={`px-4 py-2 rounded-lg font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer ${
              selectedTab === "all"
                ? "bg-[#FF5C5C] text-white"
                : "bg-white text-black hover:bg-[#FAF7EE]"
            }`}
          >
            {t("allAbove", "All Live Mocks")} ({allMocksList.length})
          </button>

          {Object.values(SUBJECT_CONFIGS).map((sub) => {
            const Icon = sub.icon;
            const isCurrent = selectedTab === sub.key;

            return (
              <button
                key={sub.key}
                type="button"
                onClick={() => setSelectedTab(sub.key)}
                className={`px-3.5 py-2 rounded-lg font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? "bg-[#FF5C5C] text-white"
                    : "bg-white text-black hover:bg-[#FAF7EE]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>
                  {t(sub.key.replace(/-/g, ""), sub.name)}
                  {sub.isLive ? ` (${sub.mockCount} Mocks)` : ""}
                </span>
              </button>
            );
          })}
        </div>


        {/* =============================================================== */}
        {/* DOMAIN HEADING BANNER: ONLY rendered when a specific subject is clicked */}
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
                    <span
                      className={`text-xs font-black uppercase border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000] ${
                        activeSubjectInfo.isLive
                          ? "bg-[#D1FAE5] text-[#065F46]"
                          : "bg-[#FEF3C7] text-black"
                      }`}
                    >
                      {activeSubjectInfo.isLive
                        ? `${activeSubjectInfo.mockCount} Mocks Live`
                        : "In Preparation"}
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
                <button
                  type="button"
                  onClick={() => setSelectedTab("all")}
                  className="px-4 py-2 rounded-lg font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer bg-[#FAF7EE] text-black hover:bg-white"
                >
                  View All Live Mocks
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mock Test Cards Grid / Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-black flex items-center gap-2">
              <span>
                {selectedTab === "all"
                  ? "Available Full-Length Mock Papers"
                  : `${activeSubjectInfo?.name} CBT Mock Papers (${displayedTests.length} Mocks)`}
              </span>
              <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full font-bold">
                {displayedTests.length}
              </span>
            </h3>
          </div>

          {displayedTests.length > 0 ? (
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
          ) : (
            /* Subject Mock Coming Soon state */
            <div className="bg-white rounded-xl border-2 border-black p-8 shadow-[4px_4px_0px_0px_#000] text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FEF3C7] border-2 border-black flex items-center justify-center mx-auto shadow-[2px_2px_0px_0px_#000]">
                <Lock className="w-6 h-6 text-black" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h4 className="text-xl font-black text-black">
                  {activeSubjectInfo?.name} Mock Papers Coming Soon
                </h4>
                <p className="text-xs text-black/70 font-semibold leading-relaxed">
                  Full CBT mock papers for {activeSubjectInfo?.name} (Code {activeSubjectInfo?.code}) are currently being aligned with the official NTA 50 compulsory questions pattern and will be released shortly.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTab("physics")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Practice 20 Physics Mocks</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTab("chemistry")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
                >
                  <FlaskConical className="w-4 h-4" />
                  <span>Practice 20 Chemistry Mocks</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTab("mathematics")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
                >
                  <Binary className="w-4 h-4" />
                  <span>Practice 20 Maths Mocks</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Coming Soon Subjects Grid (shown when in "all" tab) */}
        {selectedTab === "all" && (
          <div className="pt-8 border-t-2 border-black/20">
            <h3 className="text-2xl font-black text-black mb-4">
              📚 Additional Subject Mocks (Coming Soon)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(SUBJECT_CONFIGS)
                .filter((s) => !s.isLive)
                .map((test) => {
                  const Icon = test.icon;
                  return (
                    <div
                      key={test.code}
                      onClick={() => setSelectedTab(test.key)}
                      className="bg-white rounded-xl border-2 border-dashed border-black/40 p-5 opacity-70 hover:opacity-100 hover:border-solid hover:shadow-[3px_3px_0px_0px_#000] transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded bg-[#FAF7EE] border border-black flex items-center justify-center">
                            <Icon className="w-4 h-4 text-black" />
                          </div>
                          <div>
                            <h4 className="text-base font-black text-black">
                              {test.name}
                            </h4>
                            <p className="text-xs font-bold text-black/50">
                              Code: {test.code}
                            </p>
                          </div>
                        </div>
                        <Lock className="w-4 h-4 text-black/40" />
                      </div>
                      <p className="text-xs font-medium text-black/60">
                        {test.subtitle}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
