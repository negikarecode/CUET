"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ClipboardCheck, Lock, RotateCcw, Trophy } from "lucide-react";
import { getSubjectMetadata } from "@/lib/config/subjectRegistry";
import { getMockTestsForSubject, CUET_SUBJECTS, MockTestItem } from "@/lib/data/subjects";
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

  const metadata = getSubjectMetadata(subjectKey);
  const subjectConfig = CUET_SUBJECTS.find(
    (s) => s.id === subjectKey || s.name.toLowerCase() === subjectKey
  );

  const mockTests: MockTestItem[] = getMockTestsForSubject(subjectKey);
  const isLive = metadata?.supportedStatus === "active" || mockTests.length > 0;

  const subjectName =
    metadata?.name ??
    subjectConfig?.name ??
    (subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1).replace(/[-_]/g, " "));

  const code = metadata?.officialCode ?? subjectConfig?.code ?? "300";

  const durationMinutes =
    code === "312" || code === "306" || code === "319" || code === "301" || code === "309" || code === "308"
      ? 60
      : 45;

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
      {/* Navigation & Subject Header */}
      <div className="space-y-4">
        <Link
          href="/dashboard/mocks"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Mock Papers
        </Link>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20 flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {subjectName} CBT Mocks
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {mockTests.length} full-length CBT mocks · 50 questions per paper · {durationMinutes} minutes · Code {code}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Tests Grid */}
      {isLive ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
          {mockTests.map((test) => {
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
                      {subjectName} · Code {code}
                    </p>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug mt-0.5">
                      {test.label}
                    </h2>
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
                        <span>Re-attempt</span>
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
                      <span>Start Test</span>
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
            <Lock className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-slate-900">
              {subjectName} CBT Mocks In Preparation
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Full CBT mock papers for {subjectConfig?.name || subjectKey} (Code {code}) are currently being calibrated according to the latest NTA CUET UG CBT pattern and will be released shortly.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard/mocks"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <span>Back to All Mock Papers</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
