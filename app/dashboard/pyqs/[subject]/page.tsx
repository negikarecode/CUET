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
> = {};

export default function SubjectPYQListPage({ params }: SubjectPageProps) {
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const subjectData = PYQ_SUBJECT_LISTS[params.subject];

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
