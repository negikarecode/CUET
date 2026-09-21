"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, RotateCcw, Trophy, Timer, CheckCircle2 } from "lucide-react";
import { getSubjectMetadata } from "@/lib/config/subjectRegistry";
import { getPYQTestsForSubject, CUET_SUBJECTS, PYQTestItem } from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { getTestAttemptStats } from "@/lib/analytics";
import { useIsClient } from "@/lib/hooks/useIsClient";

type SubjectPageProps = {
  params: {
    subject: string;
  };
};

export default function SubjectPYQListPage({ params }: SubjectPageProps) {
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const subjectKey = params.subject.toLowerCase();

  const metadata = getSubjectMetadata(subjectKey);
  const subjectConfig = CUET_SUBJECTS.find(
    (s) => s.id === subjectKey || s.name.toLowerCase() === subjectKey
  );

  const pyqTests: PYQTestItem[] = getPYQTestsForSubject(subjectKey);
  const isLive = metadata?.supportedStatus === "active" || pyqTests.length > 0;

  const subjectName =
    metadata?.name ??
    subjectConfig?.name ??
    (subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1).replace(/[-_]/g, " "));

  const code = metadata?.officialCode ?? subjectConfig?.code ?? "300";
  const title = `${subjectName} Official CUET PYQ Papers`;

  const durationMinutes =
    code === "312" || code === "306" || code === "319" || code === "301" || code === "309" || code === "308"
      ? 60
      : 45;

  const subtitle = isLive
    ? `${pyqTests.length} Official NTA CUET CBT Past Year Papers • 50 Compulsory Questions • ${durationMinutes} Minutes each with verified NCERT solutions`
    : "50 Compulsory Questions per Paper • Official NTA CUET CBT Past Year Papers";

  return (
    <div className="min-h-screen bg-[#FAF7EE] p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="space-y-3">
          <Link
            href="/dashboard/pyqs"
            className="inline-flex items-center gap-1.5 text-xs font-black text-black/70 hover:text-black"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All PYQ Papers
          </Link>

          <div className="bg-white rounded-xl border-2 border-black p-5 md:p-6 shadow-[4px_4px_0px_0px_#000] space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black uppercase bg-[#FEF3C7] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                Code: {code}
              </span>
              <span className="text-[10px] font-black uppercase border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000] bg-[#D1FAE5] text-[#065F46]">
                {pyqTests.length} Official Papers Live
              </span>
              <span className="text-[10px] font-black uppercase border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000] bg-[#FAF7EE] text-black">
                50 Compulsory Qs • {durationMinutes} Mins
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-black flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#FF5C5C] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center shrink-0">
                <FileText className="w-4.5 h-4.5" />
              </div>
              {title}
            </h1>
            <p className="text-sm text-black/70 font-semibold">{subtitle}</p>
          </div>
        </div>

        {/* PYQ Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pyqTests.map((test) => {
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
                      {test.year} CBT
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-black leading-snug">{test.label}</h2>
                    <p className="text-xs text-black/70 font-bold mt-1">{test.yearLabel}</p>
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
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
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
                      <span>Start This Official Paper</span>
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
