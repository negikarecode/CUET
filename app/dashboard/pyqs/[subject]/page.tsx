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
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="space-y-3">
          <Link
            href="/dashboard/pyqs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All PYQ Papers
          </Link>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-semibold bg-amber-50 text-amber-800 px-3 py-0.5 rounded-full border border-amber-200/60">
                Code: {code}
              </span>
              <span
                className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                  isLive && pyqTests.length > 0 ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60" : "bg-amber-50 text-amber-800 border border-amber-200/60"
                }`}
              >
                {isLive && pyqTests.length > 0 ? `${pyqTests.length} Official Papers Live` : "In Preparation / Rebuilding"}
              </span>
              <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                50 Compulsory Qs • {durationMinutes} Mins
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              {title}
            </h1>
            <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
          </div>
        </div>

        {/* PYQ Tests Grid */}
        {isLive && pyqTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {pyqTests.map((test) => {
            const stats = isClient
              ? getTestAttemptStats(testAttempts, test.id)
              : { attemptsCount: 0, bestAttempt: null, latestAttempt: null, hasAttempted: false };
            const hasAttempted = stats.hasAttempted && stats.bestAttempt !== null;
            const best = stats.bestAttempt;

            return (
              <div
                key={test.id}
                className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                      {subjectName} • Code {code}
                    </span>
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                      {test.year} CBT
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">{test.label}</h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{test.yearLabel}</p>
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
                        {best.accuracyPercentage}% Acc • {stats.attemptsCount} {stats.attemptsCount === 1 ? "attempt" : "attempts"}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
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
                        <span>Re-attempt</span>
                      </Link>
                      <Link
                        href={`/test/${test.id}`}
                        className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all"
                      >
                        Result
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/test/${test.id}`}
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all"
                    >
                      <span>Start This Official Paper</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mx-auto text-amber-600">
              <RotateCcw className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-slate-900">
                {title} In Preparation
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Official NTA past year papers for {subjectName} (Code {code}) are currently being remade and digitized from verified answer keys and shifts. They will be published shortly.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/dashboard/pyqs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <span>Back to All PYQ Papers</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 hover:bg-slate-100 transition-all"
              >
                <span>Go to Command Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
