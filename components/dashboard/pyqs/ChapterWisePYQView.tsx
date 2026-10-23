"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  RotateCw,
  Clock,
  Filter,
  ChevronDown,
  AlertCircle,
  Lightbulb,
  Award,
} from "lucide-react";
import MathRenderer from "@/components/cbt/MathRenderer";
import pyqChaptersRaw from "@/lib/data/pyq_chapters.json";
import { normalizeSubject } from "@/lib/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChapterQuestion {
  id: string;
  questionNumber: number;
  paperNumber: string;
  paperLabel: string;
  questionText: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  correctOption: string;
  difficulty: string;
  difficultyLevel: number;
  topic?: string;
  detailedSolution?: string;
}

interface Chapter {
  chapterName: string;
  questionCount: number;
  weightagePercent?: number;
  difficultyCounts?: { easy: number; medium: number; hard: number };
  topics?: string[];
  questions: ChapterQuestion[];
}

interface SubjectChapterData {
  subjectSlug?: string;
  subjectName?: string;
  totalPapers?: number;
  totalQuestions?: number;
  chaptersCount?: number;
  chapters: Chapter[];
}

interface QuestionState {
  selected: string | null;
  submitted: boolean;
  showSolution: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pyqChapters = pyqChaptersRaw as Record<string, any>;

function getChapterData(subjectKey: string): SubjectChapterData | null {
  const cleanKey = subjectKey.toLowerCase().replace(/[-_\s]/g, "");

  // Direct key match
  if (pyqChapters[subjectKey]) {
    return pyqChapters[subjectKey] as SubjectChapterData;
  }

  // Alias table: map normalised key -> pyq_chapters.json keys to try
  const aliasTable: Record<string, string[]> = {
    physics: ["physics"],
    chemistry: ["chemistry"],
    mathematics: ["maths", "mathematics", "math"],
    biology: ["bio", "biology"],
    accountancy: ["accountancy", "accounts", "accs"],
    businessstudies: ["bst", "business-studies", "business_studies"],
    economics: ["eco", "economics"],
    history: ["history"],
    politicalscience: ["pol science", "political-science", "political_science", "polscience"],
    geography: ["geo", "geography"],
    psychology: ["psychology"],
    sociology: ["sociology"],
    english: ["english"],
    generalaptitudetest: ["general-test", "gat", "general_aptitude_test"],
  };

  for (const [canonicalClean, aliases] of Object.entries(aliasTable)) {
    const allClean = [canonicalClean, ...aliases.map((a) => a.replace(/[-_\s]/g, ""))];
    if (allClean.includes(cleanKey)) {
      for (const alias of aliases) {
        if (pyqChapters[alias]) return pyqChapters[alias] as SubjectChapterData;
      }
      if (pyqChapters[canonicalClean]) return pyqChapters[canonicalClean] as SubjectChapterData;
    }
  }

  return null;
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "hard":
      return "bg-rose-50 text-rose-700 border-rose-200";
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

// ─── Chapter List ─────────────────────────────────────────────────────────────

interface ChapterListProps {
  chapters: Chapter[];
  subjectName: string;
  onSelectChapter: (index: number) => void;
  progress: Record<string, { attempted: number; correct: number }>;
}

function ChapterList({ chapters, subjectName, onSelectChapter, progress }: ChapterListProps) {
  const totalQs = chapters.reduce((s, c) => s + c.questions.length, 0);
  const totalAttempted = Object.values(progress).reduce((s, v) => s + v.attempted, 0);

  return (
    <div className="space-y-4">
      {/* Subject stats bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {subjectName} — Chapter-wise PYQs
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {chapters.length} chapters · {totalQs} questions available for practice
            </p>
          </div>
          {totalAttempted > 0 && (
            <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200/60 shrink-0">
              {totalAttempted} of {totalQs} Attempted
            </span>
          )}
        </div>

        {totalAttempted > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((totalAttempted / totalQs) * 100))}%` }}
              />
            </div>
            <span className="text-xs text-slate-500 font-bold tabular-nums w-10 text-right">
              {Math.min(100, Math.round((totalAttempted / totalQs) * 100))}%
            </span>
          </div>
        )}
      </div>

      {/* Chapter grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((ch, idx) => {
          const prog = progress[ch.chapterName] ?? { attempted: 0, correct: 0 };
          const qCount = ch.questions.length;
          const accuracy =
            prog.attempted > 0 ? Math.round((prog.correct / prog.attempted) * 100) : null;

          return (
            <button
              key={ch.chapterName}
              type="button"
              onClick={() => onSelectChapter(idx)}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all text-left group w-full"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug line-clamp-2">
                    {ch.chapterName}
                  </h3>
                  {ch.topics && ch.topics.length > 0 && (
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {ch.topics.slice(0, 2).join(" · ")}
                    </p>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0 mt-0.5" />
              </div>

              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                  <BookOpen className="w-3 h-3" />
                  {qCount} {qCount === 1 ? "question" : "questions"}
                </span>
                {ch.weightagePercent && ch.weightagePercent > 0 && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
                    {ch.weightagePercent.toFixed(1)}% weightage
                  </span>
                )}
              </div>

              {prog.attempted > 0 ? (
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>
                      {prog.attempted}/{qCount} done
                    </span>
                    {accuracy !== null && (
                      <span
                        className={
                          accuracy >= 70
                            ? "text-emerald-600 font-bold"
                            : "text-amber-600 font-bold"
                        }
                      >
                        {accuracy}% accuracy
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        accuracy !== null && accuracy >= 70 ? "bg-emerald-500" : "bg-blue-500"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.round((prog.attempted / qCount) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Not started
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Question Practice ────────────────────────────────────────────────────────

interface QuestionPracticeProps {
  chapter: Chapter;
  onBack: () => void;
  onUpdateProgress: (chapterName: string, attempted: number, correct: number) => void;
}

function QuestionPractice({ chapter, onBack, onUpdateProgress }: QuestionPracticeProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [states, setStates] = useState<Record<number, QuestionState>>({});
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const questions = chapter.questions;

  const availablePapers = useMemo(() => {
    const papers = new Set<string>();
    questions.forEach((q) => papers.add(q.paperLabel));
    return Array.from(papers).sort();
  }, [questions]);

  const filteredQuestions = useMemo(
    () => (yearFilter === "all" ? questions : questions.filter((q) => q.paperLabel === yearFilter)),
    [questions, yearFilter]
  );

  const currentQ = filteredQuestions[currentIdx];

  const attempted = Object.values(states).filter((s) => s?.submitted).length;
  const correct = Object.entries(states).filter(
    ([k, s]) => s?.submitted && s?.selected === filteredQuestions[Number(k)]?.correctOption
  ).length;

  const handleOptionSelect = useCallback(
    (optId: string) => {
      setStates((prev) => ({
        ...prev,
        [currentIdx]: {
          submitted: false,
          showSolution: false,
          ...prev[currentIdx],
          selected: optId,
        },
      }));
    },
    [currentIdx]
  );

  const handleSubmit = useCallback(() => {
    const sel = states[currentIdx]?.selected;
    if (!sel || states[currentIdx]?.submitted) return;
    setStates((prev) => {
      const updated: Record<number, QuestionState> = {
        ...prev,
        [currentIdx]: {
          selected: sel,
          submitted: true,
          showSolution: false,
        },
      };
      // Calculate new totals
      const att = Object.values(updated).filter((s) => s.submitted).length;
      const cor = Object.entries(updated).filter(
        ([k, s]) => s.submitted && s.selected === filteredQuestions[Number(k)]?.correctOption
      ).length;
      onUpdateProgress(chapter.chapterName, att, cor);
      return updated;
    });
  }, [states, currentIdx, filteredQuestions, chapter.chapterName, onUpdateProgress]);

  const toggleSolution = useCallback(() => {
    setStates((prev) => {
      const existing = prev[currentIdx];
      return {
        ...prev,
        [currentIdx]: {
          selected: existing?.selected ?? null,
          submitted: existing?.submitted ?? false,
          showSolution: !(existing?.showSolution ?? false),
        },
      };
    });
  }, [currentIdx]);

  if (!currentQ) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
        <p className="text-sm font-semibold text-slate-700">No questions match the filter.</p>
        <button
          type="button"
          onClick={() => {
            setYearFilter("all");
            setCurrentIdx(0);
          }}
          className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
        >
          Show all questions
        </button>
      </div>
    );
  }

  const currentState = states[currentIdx];
  const isSubmitted = currentState?.submitted ?? false;
  const isCorrect = isSubmitted && currentState?.selected === currentQ.correctOption;

  return (
    <div className="space-y-4 w-full min-w-0">
      {/* Header: back + filter */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          All Chapters
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowYearDropdown((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-slate-300 transition-all cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            {yearFilter === "all" ? "All Papers" : yearFilter}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          {showYearDropdown && (
            <div className="absolute right-0 top-full mt-1 z-10 bg-white border border-slate-200 rounded-xl shadow-lg min-w-[160px] py-1">
              {["all", ...availablePapers].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setYearFilter(p);
                    setCurrentIdx(0);
                    setShowYearDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    yearFilter === p ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {p === "all" ? `All Papers (${questions.length})` : p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chapter meta + navigation */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {chapter.chapterName}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Question {currentIdx + 1} of {filteredQuestions.length}
              {attempted > 0 && (
                <>
                  {" · "}
                  <span className="font-semibold text-slate-700">{attempted} attempted</span>
                  {" · "}
                  <span
                    className={
                      attempted > 0 && correct / attempted >= 0.7
                        ? "text-emerald-600 font-bold"
                        : "text-amber-600 font-bold"
                    }
                  >
                    {attempted > 0 ? Math.round((correct / attempted) * 100) : 0}% correct
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              disabled={currentIdx === 0}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              aria-label="Previous question"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentIdx((i) => Math.min(filteredQuestions.length - 1, i + 1))}
              disabled={currentIdx === filteredQuestions.length - 1}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              aria-label="Next question"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.round(((currentIdx + 1) / filteredQuestions.length) * 100)}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
        {/* Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide ${getDifficultyColor(
              currentQ.difficulty
            )}`}
          >
            {currentQ.difficulty}
          </span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
            {currentQ.paperLabel}
          </span>
          {currentQ.topic && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/60 max-w-[200px] truncate">
              {currentQ.topic}
            </span>
          )}
        </div>

        {/* Question text */}
        <div className="text-sm sm:text-[15px] font-medium text-slate-900 leading-relaxed">
          <MathRenderer content={currentQ.questionText} />
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt) => {
            const isSelected = currentState?.selected === opt.id;
            const isThisCorrect = opt.id === currentQ.correctOption;

            let optClass =
              "w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium ";

            if (!isSubmitted) {
              optClass += isSelected
                ? "border-blue-500 bg-blue-50 text-blue-900 shadow-xs cursor-pointer"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 cursor-pointer";
            } else {
              optClass += isThisCorrect
                ? "border-emerald-500 bg-emerald-50 text-emerald-900 cursor-default"
                : isSelected
                ? "border-rose-400 bg-rose-50 text-rose-900 cursor-default"
                : "border-slate-200 bg-slate-50/50 text-slate-400 cursor-default";
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isSubmitted}
                onClick={() => !isSubmitted && handleOptionSelect(opt.id)}
                className={optClass}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5 ${
                      isSubmitted && isThisCorrect
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : isSubmitted && isSelected && !isThisCorrect
                        ? "border-rose-400 bg-rose-400 text-white"
                        : isSelected
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-slate-300 text-slate-500 bg-white"
                    }`}
                  >
                    {isSubmitted && isThisCorrect ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : isSubmitted && isSelected && !isThisCorrect ? (
                      <X className="w-3.5 h-3.5" />
                    ) : (
                      opt.id
                    )}
                  </span>
                  <span className="flex-1 leading-relaxed">
                    <MathRenderer content={opt.text} inline />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit / Result */}
        {!isSubmitted ? (
          <button
            type="button"
            disabled={!currentState?.selected}
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all cursor-pointer"
          >
            Submit Answer
          </button>
        ) : (
          <div className="space-y-3">
            {/* Result banner */}
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                isCorrect
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              <div
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  isCorrect ? "bg-emerald-500" : "bg-rose-500"
                }`}
              >
                {isCorrect ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <X className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <p className="font-bold text-sm">{isCorrect ? "Correct!" : "Incorrect"}</p>
                {!isCorrect && (
                  <p className="text-xs font-medium opacity-80">
                    Correct answer: Option {currentQ.correctOption}
                  </p>
                )}
              </div>
            </div>

            {/* Solution toggle */}
            {currentQ.detailedSolution && (
              <>
                <button
                  type="button"
                  onClick={toggleSolution}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-sm font-semibold text-slate-700 transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    {currentState?.showSolution ? "Hide" : "View"} Solution
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      currentState?.showSolution ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {currentState?.showSolution && (
                  <div className="px-4 py-4 rounded-xl border border-amber-200/60 bg-amber-50/50 space-y-2">
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                      Step-by-step Solution
                    </p>
                    <div className="text-sm text-slate-700 leading-relaxed">
                      <MathRenderer content={currentQ.detailedSolution} />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Next / complete */}
            {currentIdx < filteredQuestions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIdx((i) => i + 1)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Next Question
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 text-center space-y-3">
                <Award className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-sm font-bold text-slate-900">Chapter Complete!</p>
                <p className="text-xs text-slate-500">
                  {correct} of {attempted} answered correctly in this session.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentIdx(0);
                      setStates({});
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    Retry Chapter
                  </button>
                  <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all cursor-pointer"
                  >
                    All Chapters
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dot navigator */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
          Questions ({filteredQuestions.length})
        </p>
        <div className="flex flex-wrap gap-1.5">
          {filteredQuestions.map((_, idx) => {
            const st = states[idx];
            const isAttempted = st?.submitted;
            const wasCorrect =
              isAttempted && st?.selected === filteredQuestions[idx]?.correctOption;
            const isCurrent = idx === currentIdx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`w-7 h-7 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                  isCurrent
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : isAttempted
                    ? wasCorrect
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-rose-500 text-white border-rose-500"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                }`}
                aria-label={`Question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface ChapterWisePYQViewProps {
  subjectKey: string;
}

export default function ChapterWisePYQView({ subjectKey }: ChapterWisePYQViewProps) {
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState<
    Record<string, { attempted: number; correct: number }>
  >({});

  const normalized = normalizeSubject(subjectKey);
  const chapterData = useMemo(() => getChapterData(subjectKey), [subjectKey]);

  const handleUpdateProgress = useCallback(
    (chapterName: string, attempted: number, correct: number) => {
      setProgress((prev) => ({ ...prev, [chapterName]: { attempted, correct } }));
    },
    []
  );

  if (!chapterData?.chapters?.length) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
        <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
        <p className="text-sm font-semibold text-slate-700">
          Chapter-wise data is not yet available for {normalized.name}.
        </p>
        <p className="text-xs text-slate-400">
          We are actively curating chapter mappings. Check back soon.
        </p>
      </div>
    );
  }

  const chapters = chapterData.chapters.filter(
    (ch) => ch.questions && ch.questions.length > 0
  );

  if (selectedChapterIdx !== null && chapters[selectedChapterIdx]) {
    return (
      <QuestionPractice
        chapter={chapters[selectedChapterIdx]}
        onBack={() => setSelectedChapterIdx(null)}
        onUpdateProgress={handleUpdateProgress}
      />
    );
  }

  return (
    <ChapterList
      chapters={chapters}
      subjectName={normalized.name}
      onSelectChapter={setSelectedChapterIdx}
      progress={progress}
    />
  );
}
