"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Printer,
  ChevronDown,
  ChevronUp,
  Target,
  BarChart3,
  Award,
  Layers,
  FileText,
} from "lucide-react";
import { NoteDocument } from "@/types/notes";
import { NotesMarkdownRenderer } from "./NotesMarkdownRenderer";
import { useTestStore } from "@/lib/store/useTestStore";

interface Props {
  note: NoteDocument;
}

export function NoteReader({ note }: Props) {
  const [activeSection, setActiveSection] = useState<string>("summary");
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isRevised, setIsRevised] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showWorkedSolution, setShowWorkedSolution] = useState<Record<number, boolean>>({});

  // User practice stats from useTestStore
  const testAttempts = useTestStore((s) => s.testAttempts);
  const [topicAccuracy, setTopicAccuracy] = useState<number | null>(null);
  const [attemptsCount, setAttemptsCount] = useState<number>(0);

  useEffect(() => {
    // Check localStorage for bookmark and revised state
    try {
      const bKey = `notes_bookmarked_${note.id}`;
      const rKey = `notes_revised_${note.id}`;
      setIsBookmarked(localStorage.getItem(bKey) === "true");
      setIsRevised(localStorage.getItem(rKey) === "true");
    } catch {}

    // Calculate user accuracy for this topic/unit
    if (testAttempts && testAttempts.length > 0) {
      const unitKey = `unit${note.unitNumber}`;
      const relevantAttempts = testAttempts.filter((a) => {
        const id = a.testId?.toLowerCase() || "";
        const sub = (a as any).subject?.toLowerCase() || "";
        return (
          (sub.includes(note.subject) || id.includes(note.subject)) &&
          id.includes(unitKey)
        );
      });

      if (relevantAttempts.length > 0) {
        setAttemptsCount(relevantAttempts.length);
        const sumAcc = relevantAttempts.reduce((acc, curr: any) => acc + (curr.accuracy || 0), 0);
        setTopicAccuracy(Math.round(sumAcc / relevantAttempts.length));
      }
    }
  }, [note.id, note.unitNumber, note.subject, testAttempts]);

  const toggleBookmark = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    try {
      localStorage.setItem(`notes_bookmarked_${note.id}`, String(next));
    } catch {}
  };

  const toggleRevised = () => {
    const next = !isRevised;
    setIsRevised(next);
    try {
      localStorage.setItem(`notes_revised_${note.id}`, String(next));
    } catch {}
  };

  const handleSelectOption = (qId: string, optId: string) => {
    if (selectedAnswers[qId]) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const toggleSolution = (idx: number) => {
    setShowWorkedSolution((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Relevance Badge styling
  const relevance = note.cuetRelevance?.level || "Medium";
  const relevanceBadge = {
    High: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
    Low: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800",
  }[relevance];

  const svgCode = note.diagramSvg || (note.diagram as any)?.code || "";
  const keyPoints =
    note.quickRevisionCard?.keyPoints || note.quickRevisionCard?.bulletPoints || [];
  const workedExamples = note.workedExamples || [];
  const howCuetAsks = note.howCuetAsks || (note as any).howCuetAsksThis || [];
  const practiceQuestions = note.practiceQuestions || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16">
      {/* Top Breadcrumb & Action Bar */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm">
            <Link
              href={`/dashboard/notes/${note.subject}`}
              className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              {note.subjectName}
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-slate-500 dark:text-slate-400 truncate max-w-xs">
              Unit {note.unitNumber}: {note.unitTitle}
            </span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-sm">
              {note.topicTitle}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleBookmark}
              className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg border transition ${
                isBookmarked
                  ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 mr-1.5 ${isBookmarked ? "fill-amber-500" : ""}`} />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>

            <button
              onClick={toggleRevised}
              className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg border transition ${
                isRevised
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 ${isRevised ? "fill-emerald-500" : ""}`} />
              {isRevised ? "Revised (Day 1)" : "Mark Revised"}
            </button>

            {isRevised && (
              <span className="hidden sm:inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Spaced: Day 3 in 48h
              </span>
            )}

            <button
              onClick={handlePrint}
              className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              title="Print Revision Card"
            >
              <Printer className="w-3.5 h-3.5 mr-1" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Table of Contents (Desktop Sticky) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 flex items-center">
                <Layers className="w-3.5 h-3.5 mr-1.5 text-sky-500" />
                Table of Contents
              </h3>
              <nav className="space-y-1 text-sm font-medium">
                {[
                  { id: "summary", label: "30-Second Summary" },
                  { id: "concepts", label: "Core Concepts" },
                  { id: "formulas", label: "Formulas & Definitions" },
                  { id: "diagram", label: "Visual Diagram" },
                  { id: "worked-examples", label: "Worked Examples (+5/-1)" },
                  { id: "how-cuet-asks", label: "How CUET Asks This" },
                  { id: "traps", label: "Common Traps & Pitfalls" },
                  { id: "mnemonics", label: "Mnemonics & Shortcuts" },
                  { id: "practice-mcqs", label: "10 Practice MCQs" },
                  { id: "exam-links", label: "Drills & Weakness Radar" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setActiveSection(item.id)}
                    className={`block px-3 py-2 rounded-lg transition ${
                      activeSection === item.id
                        ? "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick NCERT Citation */}
            <div className="bg-slate-100/70 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 text-xs">
              <div className="font-semibold text-slate-900 dark:text-white mb-1.5 flex items-center">
                <BookOpen className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                NCERT Ground Truth
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {note.ncertReference?.class} • {note.ncertReference?.book}
              </p>
              <p className="text-slate-700 dark:text-slate-300 font-medium mt-1">
                Chapter {note.ncertReference?.chapterNumber}: {note.ncertReference?.chapterName}
              </p>
              {note.ncertReference?.sections && (
                <div className="mt-2 text-slate-500 dark:text-slate-400 space-y-0.5">
                  {note.ncertReference.sections.map((sec, i) => (
                    <div key={i} className="truncate" title={sec}>
                      • {sec}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* CENTER COLUMN: Comprehensive Note Document */}
          <main className="lg:col-span-6 space-y-8">
            {/* Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Unit {note.unitNumber}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${relevanceBadge}`}
                >
                  CUET Relevance: {relevance}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  {note.cuetRelevance?.totalPyqsInRepo || 0} Shift Questions Analyzed
                </span>
                {note.metadata?.isFreePreview && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Free Preview Topic
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {note.topicTitle}
              </h1>

              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-amber-500" />
                {note.cuetRelevance?.pyqFrequency ||
                  "Essential topic with regular appearances in official CUET papers"}
              </p>
            </div>

            {/* 1. 30-Second Summary */}
            <section id="summary" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-sky-500/10 via-indigo-500/5 to-transparent dark:from-sky-950/30 dark:via-indigo-950/20 rounded-2xl p-6 border border-sky-200 dark:border-sky-900/60 shadow-sm">
                <div className="flex items-center space-x-2 text-sky-700 dark:text-sky-400 font-bold mb-3">
                  <Clock className="w-5 h-5" />
                  <h2 className="text-lg">30-Second High-Yield Summary</h2>
                </div>
                <ul className="space-y-2.5">
                  {(note.summary30Seconds || []).map((point, idx) => (
                    <li key={idx} className="flex items-start text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
                      <span className="inline-block w-2 h-2 rounded-full bg-sky-500 mt-2 mr-3 flex-shrink-0" />
                      <NotesMarkdownRenderer content={point} className="flex-1" />
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 2. Core Concepts */}
            <section id="concepts" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-sky-500" />
                  Core Concepts & NCERT Derivations
                </h2>
              </div>
              <div className="space-y-6">
                {(note.coreConcepts || []).map((concept, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                      {concept.title}
                    </h3>
                    <NotesMarkdownRenderer content={concept.content || concept.explanation || ""} />
                    {concept.ncertPointers && concept.ncertPointers.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        <span className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                          Key NCERT Takeaways
                        </span>
                        <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                          {concept.ncertPointers.map((p, pIdx) => (
                            <li key={pIdx}>• {p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Key Facts / Formulas Table */}
            <section id="formulas" className="scroll-mt-24 space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  <Layers className="w-6 h-6 mr-2 text-sky-500" />
                  Key Facts, Formulas & Definitions
                </h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3.5">Concept / Name</th>
                      <th className="px-4 py-3.5">Formula / Definition</th>
                      <th className="px-4 py-3.5">SI Unit / Dimensions</th>
                      <th className="px-4 py-3.5">When to Apply</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {(note.keyFormulasAndTables || []).map((f, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                        <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                          {f.name}
                        </td>
                        <td className="px-4 py-3 font-mono text-sky-600 dark:text-sky-400 font-medium">
                          <NotesMarkdownRenderer content={`$${f.formula}$`} />
                        </td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                          {f.siUnits || "—"}
                        </td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-xs">
                          {f.applicationCondition || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Responsive Technical Diagram */}
            {svgCode && (
              <section id="diagram" className="scroll-mt-24 space-y-3">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                    <Sparkles className="w-6 h-6 mr-2 text-sky-500" />
                    Visual Diagram
                  </h2>
                </div>
                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm overflow-hidden flex flex-col items-center">
                  <div
                    className="w-full max-w-full overflow-x-auto flex justify-center py-2"
                    dangerouslySetInnerHTML={{ __html: svgCode }}
                  />
                  {(note.diagram as any)?.caption && (
                    <p className="text-xs text-slate-400 mt-2 text-center italic">
                      {(note.diagram as any).caption}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* 5. Worked Examples */}
            {workedExamples.length > 0 && (
              <section id="worked-examples" className="scroll-mt-24 space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                    <HelpCircle className="w-6 h-6 mr-2 text-emerald-500" />
                    Worked Examples (NTA +5 / -1 Format)
                  </h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Official CUET Standard
                  </span>
                </div>

                <div className="space-y-4">
                  {workedExamples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          Example {idx + 1}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          Marks: +5 / -1
                        </span>
                      </div>

                      <div className="text-base text-slate-900 dark:text-white font-medium mb-4">
                        <NotesMarkdownRenderer content={ex.question} />
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {(ex.options || []).map((opt: any, oIdx: number) => {
                          const optId = typeof opt === "string" ? opt.slice(1, 2) : opt.id;
                          const optText = typeof opt === "string" ? opt : `(${opt.id}) ${opt.text}`;
                          const isCorrect =
                            ex.correctOption === optId ||
                            Boolean((ex as any).correctAnswer?.includes(`(${optId})`));

                          return (
                            <div
                              key={oIdx}
                              className={`p-3 rounded-xl border text-sm font-medium ${
                                showWorkedSolution[idx] && isCorrect
                                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300 font-bold"
                                  : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              <NotesMarkdownRenderer content={optText} />
                            </div>
                          );
                        })}
                      </div>

                      {/* Solution Toggle Button */}
                      <button
                        onClick={() => toggleSolution(idx)}
                        className="inline-flex items-center text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        {showWorkedSolution[idx] ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-1" />
                            Hide Step-by-Step Solution
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1" />
                            View Step-by-Step Solution & Tip
                          </>
                        )}
                      </button>

                      {showWorkedSolution[idx] && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-xl">
                          <div className="font-semibold text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                            Correct Answer: {ex.correctOption || (ex as any).correctAnswer}
                          </div>
                          <div className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                            {(ex.solutionSteps || (ex as any).solutionStepByStep || []).map(
                              (step: string, sIdx: number) => (
                                <NotesMarkdownRenderer key={sIdx} content={step} />
                              )
                            )}
                          </div>
                          {ex.cuetTip && (
                            <div className="mt-3 text-xs bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-2.5 rounded-lg text-amber-800 dark:text-amber-300 flex items-start">
                              <Lightbulb className="w-4 h-4 mr-1.5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                              <span>{ex.cuetTip}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 6. How CUET Asks This */}
            {howCuetAsks.length > 0 && (
              <section id="how-cuet-asks" className="scroll-mt-24 space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                    <Target className="w-6 h-6 mr-2 text-indigo-500" />
                    How CUET Tests This Topic
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {howCuetAsks.map((pattern: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-slate-900 dark:text-white text-base">
                          {pattern.patternType || pattern.type}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          {pattern.frequency}
                        </span>
                      </div>

                      {pattern.typicalStem && (
                        <p className="text-sm text-slate-600 dark:text-slate-300 italic mb-3">
                          &ldquo;{pattern.typicalStem}&rdquo;
                        </p>
                      )}

                      {pattern.pyqExample?.question && (
                        <div className="text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg text-slate-700 dark:text-slate-300 mb-2">
                          <span className="font-semibold text-slate-900 dark:text-white">Sample PYQ: </span>
                          {pattern.pyqExample.question}
                        </div>
                      )}

                      <div className="text-xs text-sky-700 dark:text-sky-300 bg-sky-50/50 dark:bg-sky-950/30 p-2.5 rounded-lg border border-sky-100 dark:border-sky-900/40 flex items-start">
                        <Sparkles className="w-3.5 h-3.5 mr-1.5 text-sky-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Strategy: </strong>
                          {pattern.strategy}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 7. Common Traps & Pitfalls */}
            {(note.commonTraps || []).length > 0 && (
              <section id="traps" className="scroll-mt-24 space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2 text-rose-500" />
                    Common Traps & Student Misconceptions
                  </h2>
                </div>

                <div className="space-y-4">
                  {note.commonTraps.map((trap, idx) => (
                    <div
                      key={idx}
                      className="bg-rose-50/40 dark:bg-rose-950/20 rounded-2xl p-5 border border-rose-200 dark:border-rose-900/60 shadow-sm space-y-2"
                    >
                      <div className="font-bold text-rose-900 dark:text-rose-300 text-sm flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1.5 text-rose-600 dark:text-rose-400" />
                        Misconception: {trap.misconception || trap.concept}
                      </div>
                      {trap.whyWrong && (
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          <span className="font-semibold text-rose-800 dark:text-rose-400">Why it&apos;s wrong: </span>
                          {trap.whyWrong}
                        </p>
                      )}
                      <p className="text-sm text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900/50">
                        <span className="font-semibold">Correct understanding: </span>
                        {trap.correctUnderstanding || trap.correctFact}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 8. Mnemonics & Exam Shortcuts */}
            {(note.mnemonicsAndShortcuts || []).length > 0 && (
              <section id="mnemonics" className="scroll-mt-24 space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-amber-500" />
                    Mnemonics & Speed Shortcuts
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {((note.mnemonicsAndShortcuts || note.mnemonics || []) as any[]).map((m: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-900/60 shadow-sm space-y-2"
                    >
                      <div className="font-bold text-amber-900 dark:text-amber-200 text-base">
                        {m.title || m.mnemonic || m.rule}
                      </div>
                      {m.mnemonic && m.title && (
                        <div className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 inline-block">
                          {m.mnemonic}
                        </div>
                      )}
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {m.explanation || m.shortcut}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 9. 10 Practice MCQs */}
            {practiceQuestions.length > 0 && (
              <section id="practice-mcqs" className="scroll-mt-24 space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                    <CheckCircle2 className="w-6 h-6 mr-2 text-sky-500" />
                    10 Exam Practice MCQs
                  </h2>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                    Self-Evaluation Drill
                  </span>
                </div>

                <div className="space-y-6">
                  {practiceQuestions.map((q: any, idx: number) => {
                    const qId = q.id || `q_${idx}`;
                    const userAnswer = selectedAnswers[qId];
                    const correctOpt = q.correctOption || q.correctAnswer?.replace(/[()]/g, "");

                    return (
                      <div
                        key={idx}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            Q{idx + 1}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                              {q.questionType || q.type}
                            </span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {q.difficulty || "medium"}
                            </span>
                          </div>
                        </div>

                        <div className="text-base text-slate-900 dark:text-white font-medium">
                          <NotesMarkdownRenderer content={q.question} />
                        </div>

                        {/* Options */}
                        <div className="space-y-2">
                          {(q.options || []).map((opt: any, oIdx: number) => {
                            const optId = typeof opt === "string" ? opt.slice(1, 2) : opt.id;
                            const optText =
                              typeof opt === "string" ? opt : `(${opt.id}) ${opt.text}`;
                            const isSelected = userAnswer === optId;
                            const isCorrect = correctOpt === optId;

                            let btnStyle =
                              "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-sky-400";

                            if (userAnswer) {
                              if (isCorrect) {
                                btnStyle =
                                  "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 font-bold";
                              } else if (isSelected && !isCorrect) {
                                btnStyle =
                                  "bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-600 text-rose-900 dark:text-rose-200";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleSelectOption(qId, optId)}
                                disabled={Boolean(userAnswer)}
                                className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition ${btnStyle}`}
                              >
                                <NotesMarkdownRenderer content={optText} />
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation reveal */}
                        {userAnswer && (
                          <div
                            className={`p-4 rounded-xl text-sm border ${
                              userAnswer === correctOpt
                                ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200"
                                : "bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200"
                            }`}
                          >
                            <div className="font-bold mb-1 flex items-center">
                              {userAnswer === correctOpt ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                                  Correct! Option ({correctOpt}) (+5 marks)
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="w-4 h-4 mr-1 text-rose-600" />
                                  Incorrect (-1 mark). Correct is Option ({correctOpt})
                                </>
                              )}
                            </div>
                            <NotesMarkdownRenderer content={q.explanation} className="text-xs" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 10. Links, Next Steps & Practice Drill */}
            <section
              id="exam-links"
              className="scroll-mt-24 bg-gradient-to-br from-indigo-500/10 to-sky-500/10 dark:from-indigo-950/30 dark:to-sky-950/30 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-900/60 shadow-sm space-y-4"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-indigo-500" />
                Practice & Diagnostic Connections
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300">
                Ready to test your speed under official exam timing? Attempt the dedicated 20-question practice test or analyze your weak areas on the Weakness Radar.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={note.links?.practiceTestUrl || `/test/practice-${note.subject}-unit${note.unitNumber}-test1`}
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition shadow-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Practice This Topic ({note.unitTitle})
                </Link>

                <Link
                  href={note.links?.weaknessRadarUrl || note.links?.weaknessReportUrl || `/dashboard/radar?subject=${note.subject}`}
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition"
                >
                  <BarChart3 className="w-4 h-4 mr-2 text-indigo-500" />
                  Weakness Radar Report
                </Link>
              </div>
            </section>
          </main>

          {/* RIGHT COLUMN: Quick Revision Card & User Stats (Desktop Sticky) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
            {/* Quick Revision Card */}
            <div className="print-card-only bg-gradient-to-b from-sky-500/5 to-white dark:from-slate-900 dark:to-slate-900/80 rounded-2xl p-5 border border-sky-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider flex items-center">
                  <Award className="w-4 h-4 mr-1.5" />
                  Quick Revision Card
                </h3>
                <button
                  onClick={handlePrint}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                  title="Print Card"
                >
                  <Printer className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                {keyPoints.slice(0, 10).map((pt, i) => (
                  <div key={i} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2 flex-shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handlePrint}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 text-sky-700 dark:text-sky-300 font-semibold text-xs border border-sky-200 dark:border-sky-800 transition flex items-center justify-center"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5" />
                Export / Print 1-Page Card
              </button>
            </div>

            {/* User Topic Performance Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center">
                <BarChart3 className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                Your Unit Practice History
              </h3>

              {topicAccuracy !== null ? (
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      {topicAccuracy}%
                    </span>
                    <span className="text-xs text-slate-500">
                      {attemptsCount} drill attempt{attemptsCount > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        topicAccuracy >= 75
                          ? "bg-emerald-500"
                          : topicAccuracy >= 50
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${topicAccuracy}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {topicAccuracy >= 75
                      ? "Strong mastery! Keep revising before test day."
                      : "Target practice needed to reinforce weak concepts."}
                  </p>
                </div>
              ) : (
                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
                  <p>No recorded sessions for Unit {note.unitNumber} yet.</p>
                  <Link
                    href={`/test/practice-${note.subject}-unit${note.unitNumber}-test1`}
                    className="block text-center py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold transition"
                  >
                    Start 20-Question Drill
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
