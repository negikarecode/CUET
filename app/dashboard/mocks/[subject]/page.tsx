"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ClipboardCheck, Lock, Sparkles, RotateCcw, Trophy } from "lucide-react";
import {
  PHYSICS_MOCK_TESTS,
  CHEMISTRY_MOCK_TESTS,
  MATHS_MOCK_TESTS,
  BIOLOGY_MOCK_TESTS,
  ACCOUNTANCY_MOCK_TESTS,
  ECONOMICS_MOCK_TESTS,
  BUSINESS_STUDIES_MOCK_TESTS,
  HISTORY_MOCK_TESTS,
  POLITICAL_SCIENCE_MOCK_TESTS,
  GEOGRAPHY_MOCK_TESTS,
  PSYCHOLOGY_MOCK_TESTS,
  CUET_SUBJECTS,
} from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { getTestAttemptStats } from "@/lib/analytics";
import { useIsClient } from "@/lib/hooks/useIsClient";

type SubjectPageProps = {
  params: {
    subject: string;
  };
};

export default function SubjectMocksListPage({ params }: SubjectPageProps) {
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const subjectKey = params.subject.toLowerCase();
  const isPhysics = subjectKey === "physics" || subjectKey === "physics-mock";
  const isChemistry = subjectKey === "chemistry" || subjectKey === "chemistry-mock";
  const isMaths =
    subjectKey === "maths" ||
    subjectKey === "mathematics" ||
    subjectKey === "mathematics-sci" ||
    subjectKey === "maths-mock" ||
    subjectKey === "mathematics-mock" ||
    subjectKey === "math-mock" ||
    subjectKey === "math";
  const isBio =
    subjectKey === "bio" ||
    subjectKey === "biology" ||
    subjectKey === "biology-mock";
  const isAccountancy =
    subjectKey === "accountancy" ||
    subjectKey === "accountancy-mock" ||
    subjectKey === "accounts" ||
    subjectKey === "accs";
  const isEco =
    subjectKey === "eco" ||
    subjectKey === "economics" ||
    subjectKey === "eco-mock" ||
    subjectKey === "economics-mock";
  const isBst =
    subjectKey === "bst" ||
    subjectKey === "business" ||
    subjectKey === "business-studies" ||
    subjectKey === "bst-mock" ||
    subjectKey === "business-mock" ||
    subjectKey === "business-studies-mock";
  const isHistory =
    subjectKey === "history" ||
    subjectKey === "history-mock" ||
    subjectKey === "hist" ||
    subjectKey === "hist-mock";
  const isPoliticalScience =
    subjectKey === "political-science" ||
    subjectKey === "pol-science" ||
    subjectKey === "polscience" ||
    subjectKey === "political" ||
    subjectKey === "pol-science-mock" ||
    subjectKey === "pol" ||
    subjectKey === "pol-mock";
  const isGeography =
    subjectKey === "geography" ||
    subjectKey === "geo" ||
    subjectKey === "geo-mock" ||
    subjectKey === "geography-mock";
  const isPsychology =
    subjectKey === "psychology" ||
    subjectKey === "psy" ||
    subjectKey === "psych" ||
    subjectKey === "psychology-mock" ||
    subjectKey === "psy-mock";
  const isLive = isPhysics || isChemistry || isMaths || isBio || isAccountancy || isEco || isBst || isHistory || isPoliticalScience || isGeography || isPsychology;

  // Find subject config if available
  const subjectConfig = CUET_SUBJECTS.find(
    (s) =>
      s.id === subjectKey ||
      s.name.toLowerCase() === subjectKey ||
      (isPhysics && s.id === "physics") ||
      (isChemistry && s.id === "chemistry") ||
      (isMaths && (s.id === "mathematics-sci" || s.id === "mathematics")) ||
      (isBio && s.id === "biology") ||
      (isAccountancy && (s.id === "accountancy" || s.name.toLowerCase().includes("account"))) ||
      (isEco && (s.id === "economics" || s.name.toLowerCase().includes("economic"))) ||
      (isBst && (s.id === "business-studies" || s.name.toLowerCase().includes("business"))) ||
      (isHistory && (s.id === "history" || s.name.toLowerCase().includes("histor"))) ||
      (isPoliticalScience && (s.id === "political-science" || s.name.toLowerCase().includes("politi"))) ||
      (isGeography && (s.id === "geography" || s.name.toLowerCase().includes("geograph"))) ||
      (isPsychology && (s.id === "psychology" || s.name.toLowerCase().includes("psych")))
  );

  const subjectName = isPhysics
    ? "Physics"
    : isChemistry
    ? "Chemistry"
    : isMaths
    ? "Mathematics"
    : isBio
    ? "Biology"
    : isAccountancy
    ? "Accountancy"
    : isEco
    ? "Economics"
    : isBst
    ? "Business Studies"
    : isHistory
    ? "History"
    : isPoliticalScience
    ? "Political Science"
    : isGeography
    ? "Geography"
    : isPsychology
    ? "Psychology"
    : subjectConfig?.name ?? (subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1));

  const code = isPhysics
    ? "312"
    : isChemistry
    ? "306"
    : isMaths
    ? "319"
    : isBio
    ? "304"
    : isAccountancy
    ? "301"
    : isEco
    ? "309"
    : isBst
    ? "305"
    : isHistory
    ? "314"
    : isPoliticalScience
    ? "323"
    : isGeography
    ? "313"
    : isPsychology
    ? "324"
    : subjectConfig?.code ?? "300";
  const title = `${subjectName} Domain Full CBT Mocks`;

  const subtitle = isLive
    ? isBio || isHistory || isPoliticalScience || isGeography || isPsychology
      ? "20 Full-Length NTA CBT Mock Papers • 50 Compulsory Questions • 45 Minutes each"
      : "20 Full-Length NTA CBT Mock Papers • 50 Compulsory Questions • 60 Minutes each"
    : "50 Compulsory Questions per Paper • Standard NTA CUET CBT Syllabus (Releasing Soon)";

  const mockTests = isPhysics
    ? PHYSICS_MOCK_TESTS
    : isChemistry
    ? CHEMISTRY_MOCK_TESTS
    : isMaths
    ? MATHS_MOCK_TESTS
    : isBio
    ? BIOLOGY_MOCK_TESTS
    : isAccountancy
    ? ACCOUNTANCY_MOCK_TESTS
    : isEco
    ? ECONOMICS_MOCK_TESTS
    : isBst
    ? BUSINESS_STUDIES_MOCK_TESTS
    : isHistory
    ? HISTORY_MOCK_TESTS
    : isPoliticalScience
    ? POLITICAL_SCIENCE_MOCK_TESTS
    : isGeography
    ? GEOGRAPHY_MOCK_TESTS
    : isPsychology
    ? PSYCHOLOGY_MOCK_TESTS
    : [];

  return (
    <div className="min-h-screen bg-[#FAF7EE] p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="space-y-3">
          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center gap-1.5 text-xs font-black text-black/70 hover:text-black"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Mock Papers
          </Link>

          <div className="bg-white rounded-xl border-2 border-black p-5 md:p-6 shadow-[4px_4px_0px_0px_#000] space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black uppercase bg-[#FEF3C7] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                Code: {code}
              </span>
              <span
                className={`text-[10px] font-black uppercase border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000] ${
                  isLive ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#FEF3C7] text-black"
                }`}
              >
                {isLive ? "20 Mocks Live" : "In Preparation"}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-black flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#FF5C5C] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-4.5 h-4.5" />
              </div>
              {title}
            </h1>
            <p className="text-sm text-black/70 font-semibold">{subtitle}</p>
          </div>
        </div>

        {/* Mock Tests Grid */}
        {isLive ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTests.map((test) => {
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
                        {subjectName} • Code {code}
                      </span>
                      <span className="text-[10px] font-black uppercase bg-[#D1FAE5] text-[#065F46] px-2 py-0.5 rounded border border-black">
                        50 Compulsory Qs
                      </span>
                    </div>

                    <div>
                      <h2 className="text-lg font-black text-black">{test.label}</h2>
                      <p className="text-xs text-black/70 font-bold mt-0.5">{test.mockLabel}</p>
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

                    <p className="text-xs text-black/70 font-bold">
                      {test.questions} Questions • {test.duration}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/10">
                    {hasAttempted ? (
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/test/${test.id}?reattempt=true`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Re-attempt</span>
                        </Link>
                        <Link
                          href={`/test/${test.id}`}
                          className="px-3 py-2.5 rounded-lg border-2 border-black bg-white hover:bg-[#FAF7EE] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000] transition-all"
                        >
                          Result
                        </Link>
                      </div>
                    ) : (
                      <Link
                        href={`/test/${test.id}`}
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
                      >
                        <span>Start This Mock</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Non-live subjects: Coming Soon Card */
          <div className="bg-white rounded-xl border-2 border-black p-8 shadow-[4px_4px_0px_0px_#000] text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FEF3C7] border-2 border-black flex items-center justify-center mx-auto shadow-[2px_2px_0px_0px_#000]">
              <Lock className="w-6 h-6 text-black" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-xl font-black text-black">
                {title} Coming Soon
              </h3>
              <p className="text-xs text-black/70 font-semibold leading-relaxed">
                Full CBT mock papers for {subjectConfig?.name || subjectKey} (Code {code}) are currently being finalized according to the latest NTA 50 compulsory questions pattern and will be released shortly.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/dashboard/mocks/physics"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Practice 20 Physics Mocks</span>
              </Link>
              <Link
                href="/dashboard/mocks/chemistry"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Practice 20 Chemistry Mocks</span>
              </Link>
              <Link
                href="/dashboard/mocks/maths"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Practice 20 Maths Mocks</span>
              </Link>
              <Link
                href="/dashboard/mocks/biology"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Practice 20 Biology Mocks</span>
              </Link>
              <Link
                href="/dashboard/mocks/accountancy"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Practice 20 Accountancy Mocks</span>
              </Link>
              <Link
                href="/dashboard/mocks"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-white transition-all"
              >
                View All Mocks
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
