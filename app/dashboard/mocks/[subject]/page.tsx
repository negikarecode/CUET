"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  BarChart2,
  Trophy,
  Clock,
  HelpCircle,
  CheckCircle2,
  Activity,
  FileText,
  BookOpen,
  Layers,
  Sparkles,
  Timer,
} from "lucide-react";
import { getSubjectMetadata } from "@/lib/config/subjectRegistry";
import {
  CUET_SUBJECTS,
  getMockTestsForSubject,
  MockTestItem,
  SUBJECT_DURATION_MINUTES,
} from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { getTestAttemptStats } from "@/lib/analytics";
import { useIsClient } from "@/lib/hooks/useIsClient";

interface SubjectPageProps {
  params: {
    subject: string;
  };
}

export default function SubjectMocksListPage({ params }: SubjectPageProps) {
  const routeParams = useParams();
  const rawSubject = (params?.subject || routeParams?.subject || "") as string;
  const subjectKey = decodeURIComponent(rawSubject).toLowerCase().trim();

  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);

  const metadata = getSubjectMetadata(subjectKey);
  const subjectConfig = CUET_SUBJECTS.find(
    (s) => s.id === subjectKey || s.name.toLowerCase() === subjectKey
  );

  const subjectName =
    metadata?.name ??
    subjectConfig?.name ??
    (subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1).replace(/[-_]/g, " "));

  const code = metadata?.officialCode ?? subjectConfig?.code ?? "300";

  const durationMinutes =
    SUBJECT_DURATION_MINUTES[subjectKey] ??
    (code === "322" ||
    code === "306" ||
    code === "319" ||
    code === "301" ||
    code === "309" ||
    code === "308" ||
    code === "501"
      ? 60
      : 45);

  const mockTests: MockTestItem[] = useMemo(() => {
    return getMockTestsForSubject(subjectKey);
  }, [subjectKey]);

  // Overall telemetry across this subject's mock tests
  const { attemptedCount, bestOverallScore, avgAccuracy } = useMemo(() => {
    if (!isClient || !testAttempts || mockTests.length === 0) {
      return { attemptedCount: 0, bestOverallScore: null as number | null, avgAccuracy: 0 };
    }
    let count = 0;
    let maxScore = -Infinity;
    let totalAcc = 0;

    for (const test of mockTests) {
      const stats = getTestAttemptStats(testAttempts, test.id);
      if (stats.hasAttempted && stats.bestAttempt) {
        count++;
        if (stats.bestAttempt.totalMarks > maxScore) {
          maxScore = stats.bestAttempt.totalMarks;
        }
        totalAcc += stats.bestAttempt.accuracyPercentage;
      }
    }

    return {
      attemptedCount: count,
      bestOverallScore: maxScore === -Infinity ? null : maxScore,
      avgAccuracy: count > 0 ? Math.round(totalAcc / count) : 0,
    };
  }, [isClient, testAttempts, mockTests]);

  return (
    <div className="w-full min-w-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/dashboard/mocks"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Domain Mock Assessments
        </Link>
      </div>

      {/* Subject Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {subjectName} Full-Length Mock Exams
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Comprehensive 50-question CUET UG full syllabus mock tests under official NTA computer-based examination conditions with instant results and NCERT solutions.
            </p>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <Clock className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Exam Duration</p>
              <p className="text-sm font-bold text-slate-800">{durationMinutes} Minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pattern & Questions</p>
              <p className="text-sm font-bold text-slate-800">50 Compulsory Questions</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Marking Scheme</p>
              <p className="text-sm font-bold text-slate-800">+5 Correct / -1 Incorrect</p>
            </div>
          </div>
        </div>

        {/* Telemetry Strip (if attempted) */}
        {attemptedCount > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200/60">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>{attemptedCount} of {mockTests.length} Mocks Attempted</span>
            </div>
            {bestOverallScore !== null && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/60">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Peak Score: {bestOverallScore} / 250</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Avg Accuracy: {avgAccuracy}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Mock Tests Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Available Full-Length Mock Papers</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {mockTests.length}
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Each test features 50 original domain questions strictly aligned with CUET UG syllabus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {mockTests.map((test) => {
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
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200/60 font-mono">
                        Mock #{test.mockNumber}
                      </span>
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        <span>NTA CBT</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {test.mockLabel || `Full Syllabus Mock ${test.mockNumber}`}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Full domain coverage across all NCERT syllabus units with authentic examination difficulty
                    </p>
                  </div>

                  {/* Best Score Badge if attempted */}
                  {hasAttempted && best && (
                    <div className="px-3.5 py-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-center justify-between gap-2 text-xs font-semibold text-amber-900">
                      <div className="flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>
                          Best: {best.totalMarks} / {best.maxMarks}
                        </span>
                      </div>
                      <span className="text-amber-800 text-[11px] font-mono">
                        {best.accuracyPercentage}% Acc • {stats.attemptsCount}{" "}
                        {stats.attemptsCount === 1 ? "attempt" : "attempts"}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      50 Questions
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5 text-slate-400" />
                      {test.duration}
                    </span>
                    <span>•</span>
                    <span className="text-slate-600 font-mono text-[11px]">
                      +5 / -1 Marking
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

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  {hasAttempted ? (
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/test/${test.id}?reattempt=true`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all text-center"
                      >
                        <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span>Re-attempt CBT</span>
                      </Link>
                      <Link
                        href={`/dashboard/mocks/analysis/${best?.id || test.id}`}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all flex items-center gap-1.5 text-center"
                      >
                        <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Analysis</span>
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/test/${test.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all text-center"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Mock Test</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Complementary Preparation Resources */}
      <div className="space-y-4 pt-4 border-t border-slate-200/60">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Additional Preparation Resources for {subjectName}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-indigo-600">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Unit Practice Tests</h3>
              <p className="text-xs text-slate-500 font-medium">
                Master individual chapters with 20-question unit drills (20 practice tests per unit).
              </p>
            </div>
            <Link
              href={`/dashboard/practice/${subjectKey}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <span>Explore Unit Tests</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Official PYQ Papers</h3>
              <p className="text-xs text-slate-500 font-medium">
                Practice authentic past year question papers from 2022-2025 with official NTA answer keys.
              </p>
            </div>
            <Link
              href={`/dashboard/pyqs?subject=${subjectKey}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all"
            >
              <span>Explore Official PYQs</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Diagnostic Radar</h3>
              <p className="text-xs text-slate-500 font-medium">
                Identify weaknesses across all syllabus chapters with AI-driven diagnostic telemetry.
              </p>
            </div>
            <Link
              href={`/dashboard/radar?subject=${subjectKey}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all"
            >
              <span>View Weakness Radar</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
