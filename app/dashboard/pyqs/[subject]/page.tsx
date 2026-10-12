"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  RotateCcw,
  Trophy,
  Timer,
  CheckCircle2,
  AlertTriangle,
  Layers,
  BookOpen,
  ChevronDown,
  ChevronUp,
  BarChart2,
  Sparkles,
} from "lucide-react";
import { getSubjectMetadata } from "@/lib/config/subjectRegistry";
import { getPYQTestsForSubject, CUET_SUBJECTS, PYQTestItem } from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { getTestAttemptStats } from "@/lib/analytics";
import { useIsClient } from "@/lib/hooks/useIsClient";
import pyqChaptersData from "@/lib/data/pyq_chapters.json";

type SubjectPageProps = {
  params: {
    subject: string;
  };
};

interface ChapterQuestion {
  id: string | number;
  questionNumber: number;
  paperNumber: string;
  paperLabel: string;
  questionText: string;
  options: Array<{ id: string; text: string }>;
  correctOption: string;
  difficulty: "easy" | "medium" | "hard" | string;
  difficultyLevel: number;
  topic: string;
  detailedSolution: string;
}

interface ChapterItem {
  chapterName: string;
  questionCount: number;
  weightagePercent: number;
  difficultyCounts: {
    easy: number;
    medium: number;
    hard: number;
  };
  topics: string[];
  questions: ChapterQuestion[];
}

export default function SubjectPYQListPage({ params }: SubjectPageProps) {
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const subjectKey = params.subject.toLowerCase();

  const [activeTab, setActiveTab] = useState<"papers" | "chapters">("papers");
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [expandedSolutionId, setExpandedSolutionId] = useState<string | null>(null);

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
    code === "322" || code === "306" || code === "319" || code === "301" || code === "309" || code === "308" || code === "501"
      ? 60
      : 45;

  const subtitle = isLive
    ? `${pyqTests.length} Official NTA CUET CBT Past Year Papers • 50 Compulsory Questions • ${durationMinutes} Minutes each with verified NCERT solutions`
    : "50 Compulsory Questions per Paper • Official NTA CUET CBT Past Year Papers";

  // Chapter-wise data from precomputed index
  const subjectChaptersInfo = ((pyqChaptersData as unknown) as Record<string, {
    subjectSlug: string;
    subjectName: string;
    totalPapers: number;
    totalQuestions: number;
    chaptersCount: number;
    chapters: ChapterItem[];
  }>)[subjectKey] || null;

  const filteredChapters = useMemo(() => {
    if (!subjectChaptersInfo?.chapters) return [];
    if (difficultyFilter === "all") return subjectChaptersInfo.chapters;
    return subjectChaptersInfo.chapters.filter(
      (c) => (c.difficultyCounts[difficultyFilter] || 0) > 0
    );
  }, [subjectChaptersInfo, difficultyFilter]);

  const totalQuestionsInSubject = subjectChaptersInfo?.totalQuestions ?? pyqTests.length * 50;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Navigation & Header */}
      <div className="space-y-3">
        <Link
          href="/dashboard/pyqs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to All PYQ Papers
        </Link>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold bg-amber-50 text-amber-800 px-3 py-0.5 rounded-full border border-amber-200/60">
              Code: {code}
            </span>
            <span
              className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                isLive && pyqTests.length > 0
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : "bg-amber-50 text-amber-800 border border-amber-200/60"
              }`}
            >
              {isLive && pyqTests.length > 0 ? `${pyqTests.length} Official Papers Live` : "In Preparation"}
            </span>
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
              50 Compulsory Qs • {durationMinutes} Mins
            </span>
            {subjectChaptersInfo && (
              <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                {subjectChaptersInfo.chaptersCount} NCERT Chapters
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            {title}
          </h1>
          <p className="text-sm text-slate-500 font-medium">{subtitle}</p>

          {/* View Mode Toggle: Official Shift Papers vs Chapter-Wise Division */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setActiveTab("papers")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "papers"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Official Shift Papers ({pyqTests.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("chapters")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "chapters"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Chapter-Wise Division ({subjectChaptersInfo?.chaptersCount || 0})</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% NCERT Solutions & Option Analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW 1: OFFICIAL SHIFT PAPERS */}
      {activeTab === "papers" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Phase A Verification Notice Banner */}
          {pyqTests.length > 0 && (
            <div className="bg-amber-50/90 border border-amber-200/90 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 text-amber-900">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 text-amber-700">
                <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm text-amber-950">
                    Official NTA Past-Year Papers • Authentic CBT Simulation
                  </h3>
                  <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                    100% Solved
                  </span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  Official CUET UG Computer-Based Tests with complete question telemetry, difficulty breakdown, chapter performance matrix, and verified NCERT step-by-step solutions.
                </p>
              </div>
            </div>
          )}

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
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                            {test.year} CBT
                          </span>
                          <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200/60 flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5 text-blue-600" />
                            <span>Official Key</span>
                          </span>
                        </div>
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
                            {best.accuracyPercentage}% Acc • {stats.attemptsCount}{" "}
                            {stats.attemptsCount === 1 ? "attempt" : "attempts"}
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

                    <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                      {hasAttempted ? (
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/test/${test.id}?reattempt=true`}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-2xs hover:shadow-sm transition-all"
                          >
                            <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
                            <span>Re-attempt CBT</span>
                          </Link>
                          <Link
                            href={`/dashboard/pyqs/analysis/${best?.id || test.id}`}
                            className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all flex items-center gap-1.5"
                          >
                            <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Result & Analysis</span>
                          </Link>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/test/${test.id}`}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all"
                          >
                            <span>Start Official Paper</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/dashboard/pyqs/analysis/${test.id}`}
                            className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all flex items-center gap-1"
                            title="View Solutions & Chapter Analysis"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                            <span>Solutions</span>
                          </Link>
                        </div>
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
                <h3 className="text-xl font-bold text-slate-900">{title} In Preparation</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Official NTA past year papers for {subjectName} (Code {code}) will be published shortly.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: CHAPTER-WISE DIVISION */}
      {activeTab === "chapters" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Chapter Division Summary Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800/60 inline-flex items-center gap-1.5 mb-2">
                  <Layers className="w-3 h-3 text-indigo-400" />
                  NCERT Syllabus Chapter Division
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  {subjectName} Chapter-Wise Past Year Questions
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  All {totalQuestionsInSubject.toLocaleString()} authentic CUET UG questions cataloged by NCERT chapter, past exam weightage, and difficulty level.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[100px]">
                  <p className="text-2xl font-extrabold font-mono text-white">
                    {subjectChaptersInfo?.chaptersCount || 0}
                  </p>
                  <p className="text-[10px] uppercase font-bold text-slate-300 tracking-wider mt-0.5">Chapters</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[100px]">
                  <p className="text-2xl font-extrabold font-mono text-indigo-300">
                    {totalQuestionsInSubject}
                  </p>
                  <p className="text-[10px] uppercase font-bold text-slate-300 tracking-wider mt-0.5">Questions</p>
                </div>
              </div>
            </div>

            {/* Filter by Difficulty */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-300 font-medium">Filter chapters by difficulty:</span>
              <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/10">
                {(["all", "easy", "medium", "hard"] as const).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficultyFilter(diff)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                      difficultyFilter === diff
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {diff === "all" ? "All Levels" : diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chapters List */}
          <div className="space-y-4">
            {filteredChapters.map((chapter, idx) => {
              const isExpanded = expandedChapter === chapter.chapterName;

              return (
                <div
                  key={chapter.chapterName}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:border-slate-200"
                >
                  {/* Chapter Header / Summary Row */}
                  <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                          Chapter {idx + 1}
                        </span>
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                          {chapter.weightagePercent}% Weightage
                        </span>
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                          {chapter.questionCount} Questions in PYQs
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">{chapter.chapterName}</h3>

                      {/* Topics pills */}
                      {chapter.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {chapter.topics.slice(0, 5).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100"
                            >
                              {t}
                            </span>
                          ))}
                          {chapter.topics.length > 5 && (
                            <span className="text-[10px] text-slate-400 font-medium self-center">
                              +{chapter.topics.length - 5} more topics
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Difficulty Pills & Action */}
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200/60">
                          {chapter.difficultyCounts.easy} Easy
                        </span>
                        <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200/60">
                          {chapter.difficultyCounts.medium} Medium
                        </span>
                        <span className="text-[10px] font-semibold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md border border-rose-200/60">
                          {chapter.difficultyCounts.hard} Hard
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedChapter(isExpanded ? null : chapter.chapterName)
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        <span>{isExpanded ? "Hide Questions" : `Browse Questions (${chapter.questions.length})`}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Questions List */}
                  {isExpanded && (
                    <div className="bg-slate-50/70 border-t border-slate-100 p-5 sm:p-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          Authentic Questions from Official NTA Shift Papers
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          Showing top {chapter.questions.length} questions
                        </span>
                      </div>

                      <div className="space-y-4">
                        {chapter.questions.map((q, qIndex) => {
                          const isSolOpen = expandedSolutionId === String(q.id);

                          return (
                            <div
                              key={String(q.id)}
                              className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-3"
                            >
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-bold font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200">
                                    Q{qIndex + 1}
                                  </span>
                                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                                    {q.paperLabel}
                                  </span>
                                  <span className="text-[10px] font-medium text-slate-500">
                                    Topic: {q.topic}
                                  </span>
                                </div>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                                    q.difficulty === "easy"
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                      : q.difficulty === "medium"
                                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                                      : "bg-rose-50 text-rose-700 border border-rose-200"
                                  }`}
                                >
                                  {q.difficulty} Level {q.difficultyLevel}
                                </span>
                              </div>

                              <p className="text-sm font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                                {q.questionText}
                              </p>

                              {/* Options */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                {q.options.map((opt) => {
                                  const isCorrect = opt.id === q.correctOption;
                                  return (
                                    <div
                                      key={opt.id}
                                      className={`p-2.5 rounded-xl text-xs font-medium border flex items-start gap-2 ${
                                        isCorrect
                                          ? "bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold"
                                          : "bg-white border-slate-200/70 text-slate-700"
                                      }`}
                                    >
                                      <span
                                        className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                          isCorrect
                                            ? "bg-emerald-600 text-white"
                                            : "bg-slate-100 text-slate-600"
                                        }`}
                                      >
                                        {opt.id}
                                      </span>
                                      <span className="leading-snug">{opt.text}</span>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Solution Toggle */}
                              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Correct Answer: Option {q.correctOption}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedSolutionId(isSolOpen ? null : String(q.id))
                                  }
                                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <span>{isSolOpen ? "Hide Solution" : "View Step-by-Step Solution"}</span>
                                  {isSolOpen ? (
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>

                              {/* Step-by-Step Solution & Option Analysis */}
                              {isSolOpen && (
                                <div className="mt-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 space-y-2 animate-in fade-in duration-150">
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                                    <span>NCERT Verified Detailed Solution:</span>
                                  </div>
                                  <div className="whitespace-pre-line leading-relaxed text-slate-700 font-normal">
                                    {q.detailedSolution}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
