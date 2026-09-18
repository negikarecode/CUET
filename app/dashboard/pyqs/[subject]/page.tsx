"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, RotateCcw, Trophy } from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { getTestAttemptStats } from "@/lib/analytics";
import { useIsClient } from "@/lib/hooks/useIsClient";

type SubjectPageProps = {
  params: {
    subject: string;
  };
};

const PYQ_SUBJECT_LISTS: Record<
  string,
  {
    title: string;
    subtitle: string;
    tests: Array<{ id: string; label: string; yearLabel: string; duration: string; questions: number }>;
  }
> = {
  physics: {
    title: "Physics CUET Official PYQ Papers",
    subtitle: "Official NTA CUET CBT past year papers with step-by-step NCERT solutions and pacing benchmarks.",
    tests: [
      { id: "physics-pyq", label: "CUET UG 2024 Physics (Shift 1 Official CBT)", yearLabel: "2024 Official NTA CBT Paper", duration: "60 Minutes", questions: 50 },
      { id: "physics-mock-2", label: "CUET UG 2024 Physics (Shift 2 Official CBT)", yearLabel: "2024 Shift 2 Official CBT", duration: "60 Minutes", questions: 50 },
      { id: "physics-mock-3", label: "CUET UG 2023 Physics (Shift 1 Official CBT)", yearLabel: "2023 Official Paper", duration: "60 Minutes", questions: 50 },
      { id: "physics-mock-4", label: "CUET UG 2023 Physics (Shift 2 Official CBT)", yearLabel: "2023 Official Paper", duration: "60 Minutes", questions: 50 },
    ],
  },
  chemistry: {
    title: "Chemistry CUET Official PYQ Papers",
    subtitle: "Official NTA CUET CBT past year papers covering Organic, Inorganic, and Physical Chemistry.",
    tests: [
      { id: "chemistry-pyq", label: "CUET UG 2024 Chemistry (Shift 1 Official CBT)", yearLabel: "2024 Official NTA CBT Paper", duration: "60 Minutes", questions: 50 },
      { id: "chemistry-mock-2", label: "CUET UG 2024 Chemistry (Shift 2 Official CBT)", yearLabel: "2024 Shift 2 Official CBT", duration: "60 Minutes", questions: 50 },
      { id: "chemistry-mock-3", label: "CUET UG 2023 Chemistry (Shift 1 Official CBT)", yearLabel: "2023 Official Paper", duration: "60 Minutes", questions: 50 },
    ],
  },
  mathematics: {
    title: "Mathematics CUET Official PYQ Papers",
    subtitle: "Official NTA CUET CBT past year papers covering Calculus, Algebra, Probability, and Vectors.",
    tests: [
      { id: "math-sci-pyq", label: "CUET UG 2024 Mathematics (Shift 1 Official CBT)", yearLabel: "2024 Official NTA CBT Paper", duration: "60 Minutes", questions: 50 },
      { id: "maths-mock-2", label: "CUET UG 2024 Mathematics (Shift 2 Official CBT)", yearLabel: "2024 Shift 2 Official CBT", duration: "60 Minutes", questions: 50 },
      { id: "maths-mock-3", label: "CUET UG 2023 Mathematics (Shift 1 Official CBT)", yearLabel: "2023 Official Paper", duration: "60 Minutes", questions: 50 },
    ],
  },
  biology: {
    title: "Biology CUET Official PYQ Papers",
    subtitle: "Official NTA CUET CBT past year papers with comprehensive Genetics, Reproduction & Ecology keys.",
    tests: [
      { id: "biology-pyq", label: "CUET UG 2024 Biology (Shift 1 Official CBT)", yearLabel: "2024 Official NTA CBT Paper", duration: "45 Minutes", questions: 50 },
      { id: "biology-mock-2", label: "CUET UG 2024 Biology (Shift 2 Official CBT)", yearLabel: "2024 Shift 2 Official CBT", duration: "45 Minutes", questions: 50 },
      { id: "biology-mock-3", label: "CUET UG 2023 Biology (Shift 1 Official CBT)", yearLabel: "2023 Official Paper", duration: "45 Minutes", questions: 50 },
    ],
  },
  accountancy: {
    title: "Accountancy CUET Official PYQ Papers",
    subtitle: "Official NTA CUET CBT past year papers covering Partnership, Share Capital, and Cash Flow Statements.",
    tests: [
      { id: "accountancy-pyq", label: "CUET UG 2024 Accountancy (Shift 1 Official CBT)", yearLabel: "2024 Official NTA CBT Paper", duration: "60 Minutes", questions: 50 },
      { id: "accountancy-mock-2", label: "CUET UG 2024 Accountancy (Shift 2 Official CBT)", yearLabel: "2024 Shift 2 Official CBT", duration: "60 Minutes", questions: 50 },
      { id: "accountancy-mock-3", label: "CUET UG 2023 Accountancy (Shift 1 Official CBT)", yearLabel: "2023 Official Paper", duration: "60 Minutes", questions: 50 },
    ],
  },
  economics: {
    title: "Economics CUET Official PYQ Papers",
    subtitle: "Official NTA CUET CBT past year papers covering Macroeconomics, National Income, and Indian Economic Development.",
    tests: [
      { id: "eco-pyq", label: "CUET UG 2024 Economics (Shift 1 Official CBT)", yearLabel: "2024 Official NTA CBT Paper", duration: "60 Minutes", questions: 50 },
      { id: "eco-mock-2", label: "CUET UG 2024 Economics (Shift 2 Official CBT)", yearLabel: "2024 Shift 2 Official CBT", duration: "60 Minutes", questions: 50 },
      { id: "eco-mock-3", label: "CUET UG 2023 Economics (Shift 1 Official CBT)", yearLabel: "2023 Official Paper", duration: "60 Minutes", questions: 50 },
    ],
  },
  "business-studies": {
    title: "Business Studies CUET Official PYQ Papers",
    subtitle: "Official NTA CUET CBT past year papers covering Management Principles, Marketing, and Consumer Protection.",
    tests: [
      { id: "business-pyq", label: "CUET UG 2024 Business Studies (Shift 1 Official CBT)", yearLabel: "2024 Official NTA CBT Paper", duration: "45 Minutes", questions: 50 },
      { id: "bst-mock-2", label: "CUET UG 2024 Business Studies (Shift 2 Official CBT)", yearLabel: "2024 Shift 2 Official CBT", duration: "45 Minutes", questions: 50 },
      { id: "bst-mock-3", label: "CUET UG 2023 Business Studies (Shift 1 Official CBT)", yearLabel: "2023 Official Paper", duration: "45 Minutes", questions: 50 },
    ],
  },
  history: {
    title: "History CUET Official PYQ Papers",
    subtitle: "Official NTA CUET CBT past year papers covering Themes in Indian History Parts I, II, and III.",
    tests: [
      { id: "history-pyq", label: "CUET UG 2024 History (Shift 1 Official CBT)", yearLabel: "2024 Official NTA CBT Paper", duration: "45 Minutes", questions: 50 },
      { id: "history-mock-2", label: "CUET UG 2024 History (Shift 2 Official CBT)", yearLabel: "2024 Shift 2 Official CBT", duration: "45 Minutes", questions: 50 },
      { id: "history-mock-3", label: "CUET UG 2023 History (Shift 1 Official CBT)", yearLabel: "2023 Official Paper", duration: "45 Minutes", questions: 50 },
    ],
  },
  "political-science": {
    title: "Political Science CUET Official PYQ Papers",
    subtitle: "Official NTA CUET CBT past year papers covering Contemporary World Politics and Politics in India Since Independence.",
    tests: [
      { id: "pol-science-pyq", label: "CUET UG 2024 Political Science (Shift 1 Official CBT)", yearLabel: "2024 Official NTA CBT Paper", duration: "45 Minutes", questions: 50 },
      { id: "pol-science-mock-2", label: "CUET UG 2024 Political Science (Shift 2 Official CBT)", yearLabel: "2024 Shift 2 Official CBT", duration: "45 Minutes", questions: 50 },
      { id: "pol-science-mock-3", label: "CUET UG 2023 Political Science (Shift 1 Official CBT)", yearLabel: "2023 Official Paper", duration: "45 Minutes", questions: 50 },
    ],
  },
  geography: {
    title: "Geography CUET Official PYQ Papers",
    subtitle: "Official NTA CUET CBT past year papers covering Human Geography and India: People and Economy.",
    tests: [
      { id: "geo-pyq", label: "CUET UG 2024 Geography (Shift 1 Official CBT)", yearLabel: "2024 Official NTA CBT Paper", duration: "45 Minutes", questions: 50 },
      { id: "geo-mock-2", label: "CUET UG 2024 Geography (Shift 2 Official CBT)", yearLabel: "2024 Shift 2 Official CBT", duration: "45 Minutes", questions: 50 },
      { id: "geo-mock-3", label: "CUET UG 2023 Geography (Shift 1 Official CBT)", yearLabel: "2023 Official Paper", duration: "45 Minutes", questions: 50 },
    ],
  },
  psychology: {
    title: "Psychology CUET Official PYQ Papers",
    subtitle: "Official NTA CUET CBT past year papers covering Psychological Disorders, Personality, and Social Influence.",
    tests: [
      { id: "psychology-pyq", label: "CUET UG 2024 Psychology (Shift 1 Official CBT)", yearLabel: "2024 Official NTA CBT Paper", duration: "45 Minutes", questions: 50 },
      { id: "psychology-mock-2", label: "CUET UG 2024 Psychology (Shift 2 Official CBT)", yearLabel: "2024 Shift 2 Official CBT", duration: "45 Minutes", questions: 50 },
      { id: "psychology-mock-3", label: "CUET UG 2023 Psychology (Shift 1 Official CBT)", yearLabel: "2023 Official Paper", duration: "45 Minutes", questions: 50 },
    ],
  },
};

const ALIAS_MAP: Record<string, string> = {
  maths: "mathematics",
  math: "mathematics",
  bio: "biology",
  accounts: "accountancy",
  accs: "accountancy",
  eco: "economics",
  bst: "business-studies",
  business: "business-studies",
  hist: "history",
  pol: "political-science",
  polscience: "political-science",
  geo: "geography",
  psy: "psychology",
  psych: "psychology",
};

function getSubjectPYQData(subj: string) {
  const norm = (subj || "").toLowerCase();
  const canonical = ALIAS_MAP[norm] || norm;
  return PYQ_SUBJECT_LISTS[canonical];
}

export default function SubjectPYQListPage({ params }: SubjectPageProps) {
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const subjectData = getSubjectPYQData(params.subject);

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-[#FAF7EE] p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border-2 border-black p-6 shadow-[3px_3px_0px_0px_#000] space-y-4">
            <h1 className="text-2xl font-black text-black">Subject Not Found</h1>
            <p className="text-black/70 font-semibold text-sm">
              This PYQ subject list is not available yet.
            </p>
            <Link
              href="/dashboard/pyqs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF5C5C] text-white font-black text-sm border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to PYQ Subjects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7EE] p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="space-y-2">
          <Link
            href="/dashboard/pyqs"
            className="inline-flex items-center gap-1.5 text-xs font-black text-black/70 hover:text-black"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to PYQ Subjects
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-black flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#FF5C5C] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center">
              <FileText className="w-4.5 h-4.5" />
            </div>
            {subjectData.title}
          </h1>
          <p className="text-sm text-black/70 font-semibold">{subjectData.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectData.tests.map((test) => {
            const stats = isClient
              ? getTestAttemptStats(testAttempts, test.id)
              : { attemptsCount: 0, bestAttempt: null, latestAttempt: null, hasAttempted: false };
            const hasAttempted = stats.hasAttempted && stats.bestAttempt !== null;
            const best = stats.bestAttempt;

            return (
              <div
                key={test.id}
                className="bg-white rounded-xl border-2 border-black p-5 shadow-[3px_3px_0px_0px_#000] flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h2 className="text-lg font-black text-black">{test.label}</h2>
                  <p className="text-xs text-black/70 font-bold">{test.yearLabel}</p>

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

                  <p className="text-sm text-black/70 font-bold">
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
                    >
                      Start This Test
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
