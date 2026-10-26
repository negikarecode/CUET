"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  RotateCcw,
  Tag,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Question } from "@/types";
import { MistakeTag, TopicPracticeDelta } from "@/types/ai-coach";
import { recordTopicPracticeDelta } from "@/lib/ai-coach/practice-deltas";
import { enrollMissedQuestion, setMistakeTag } from "@/lib/spaced-repetition";
import MathRenderer from "@/components/cbt/MathRenderer";

interface AICoachTopicQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  topic: string;
  userId: string;
  baselineAccuracy?: number;
  onQuizCompleted?: (delta: TopicPracticeDelta) => void;
}

export default function AICoachTopicQuizModal({
  isOpen,
  onClose,
  subject,
  topic,
  userId,
  baselineAccuracy = 0,
  onQuizCompleted,
}: AICoachTopicQuizModalProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreSummary, setScoreSummary] = useState<{
    correctCount: number;
    totalCount: number;
    accuracyPercentage: number;
  } | null>(null);
  const [mistakeTags, setMistakeTags] = useState<Record<string, MistakeTag>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Load 10 prioritized questions for this topic
  useEffect(() => {
    if (!isOpen || !topic) return;

    setIsLoading(true);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setCurrentIndex(0);
    setScoreSummary(null);
    setMistakeTags({});

    fetch(`/api/ai-coach/practice-quiz?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.questions) {
          setQuestions(data.questions);
        }
      })
      .catch((e) => console.error("Practice quiz API error:", e))
      .finally(() => {
        setIsLoading(false);
      });
  }, [isOpen, subject, topic, userId]);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted || !currentQ) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleSubmitQuiz = () => {
    if (isSubmitted || questions.length === 0) return;

    let correct = 0;
    const wrongQs: Question[] = [];

    questions.forEach((q) => {
      const userPick = selectedAnswers[q.id];
      const isCorrect = userPick && userPick === q.correctOptionId;
      if (isCorrect) {
        correct++;
      } else {
        wrongQs.push(q);
        // Automatically enroll wrong question into Mistake Notebook
        try {
          enrollMissedQuestion(userId, {
            questionId: q.id,
            subject,
            chapter: q.chapter || topic,
            microTopic: q.topic || topic,
            prompt: q.prompt,
            options: q.options,
            correctOption: q.correctOptionId || "A",
            userSelectedOption: userPick || "None",
            explanation: q.explanation || "Refer to NCERT textbook.",
          });
        } catch (e) {
          console.warn("Auto-enroll missed question error:", e);
        }
      }
    });

    const accuracy = Math.round((correct / questions.length) * 100);
    setScoreSummary({
      correctCount: correct,
      totalCount: questions.length,
      accuracyPercentage: accuracy,
    });
    setIsSubmitted(true);

    // Record immediate before/after delta (5+ attempts rule satisfied by 10-Q quiz)
    const delta: TopicPracticeDelta = {
      topic,
      subject,
      beforeAccuracy: baselineAccuracy,
      afterAccuracy: accuracy,
      attemptsCount: questions.length,
      timestamp: new Date().toISOString(),
    };
    recordTopicPracticeDelta(userId, delta);
    if (onQuizCompleted) {
      onQuizCompleted(delta);
    }
  };

  const handleTagMistake = (qId: string, tag: MistakeTag) => {
    setMistakeTags((prev) => ({ ...prev, [qId]: tag }));
    setMistakeTag(userId, qId, tag);
    fetch("/api/ai-coach/tag-mistake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: qId, tag }),
    }).catch((e) => console.warn("Tag mistake fetch failed:", e));
  };

  const wrongQuestions = questions.filter(
    (q) => selectedAnswers[q.id] !== q.correctOptionId
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-3xl w-full flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase tracking-wider">
                Targeted Practice Drill
              </span>
              <span className="text-xs font-semibold text-slate-500 font-mono">
                {subject} • 10 Questions
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>{topic}</span>
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {isLoading ? (
            <div className="text-center py-16 space-y-3">
              <RotateCcw className="w-6 h-6 animate-spin mx-auto text-indigo-600" />
              <p className="text-xs font-semibold text-slate-600">
                Generating 10 targeted questions for {topic}...
              </p>
            </div>
          ) : !isSubmitted ? (
            /* Active Quiz View */
            <div className="space-y-6">
              {/* Question Navigation Bar */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {questions.map((q, idx) => {
                    const isAnswered = Boolean(selectedAnswers[q.id]);
                    const isCurrent = idx === currentIndex;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                          isCurrent
                            ? "bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-600/30"
                            : isAnswered
                            ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-medium text-slate-500">
                  Answered <span className="font-bold text-slate-900">{answeredCount}</span> of {questions.length}
                </div>
              </div>

              {/* Current Question */}
              {currentQ && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                    <span className="text-slate-500 font-medium">
                      No time limit • Focus purely on accuracy
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm font-medium text-slate-900 leading-relaxed">
                    <MathRenderer text={currentQ.prompt} />
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {currentQ.options.map((opt) => {
                      const isSelected = selectedAnswers[currentQ.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectOption(opt.id)}
                          className={`w-full p-3.5 rounded-xl text-left text-xs transition-all cursor-pointer flex items-start gap-3 border shadow-2xs ${
                            isSelected
                              ? "bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-600/20 text-indigo-950 font-semibold"
                              : "bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50/60"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-lg font-mono font-bold flex items-center justify-center text-xs shrink-0 ${
                              isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {opt.id}
                          </span>
                          <div className="flex-1 leading-relaxed">
                            <MathRenderer text={opt.text} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitQuiz}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer shadow-md transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Practice Quiz</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Post-Quiz Results & Mistake Review Screen */
            <div className="space-y-6">
              {/* Scorecard Banner with Before/After */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-lg space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-slate-950" />
                    Immediate Progress Recorded
                  </span>
                  <span className="text-xs text-indigo-200 font-mono">
                    10 Questions Attempted
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-white">
                      {topic}: {baselineAccuracy}% → {scoreSummary?.accuracyPercentage}%
                    </h4>
                    <p className="text-xs text-indigo-200 mt-0.5">
                      {scoreSummary?.correctCount} of {scoreSummary?.totalCount} correct
                      {scoreSummary && scoreSummary.accuracyPercentage >= baselineAccuracy
                        ? ` (+${scoreSummary.accuracyPercentage - baselineAccuracy}% improvement!)`
                        : ""}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                      {scoreSummary?.accuracyPercentage}%
                    </span>
                    <span className="block text-[10px] text-indigo-300 uppercase font-semibold">
                      Drill Accuracy
                    </span>
                  </div>
                </div>
              </div>

              {/* Mistake Review Screen */}
              {wrongQuestions.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                        Mistake Review ({wrongQuestions.length} Incorrect)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Each wrong question is automatically saved to your Mistake Notebook (resurfacing in 2 days, then 7 days). Tap a tag below:
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 divide-y divide-slate-100">
                    {wrongQuestions.map((q, idx) => {
                      const userPick = selectedAnswers[q.id];
                      const studentOpt = q.options.find((o) => o.id === userPick);
                      const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
                      const currentTag = mistakeTags[q.id];

                      const TAG_OPTIONS: MistakeTag[] = [
                        "Didn't know concept",
                        "Misread",
                        "Guessed",
                        "Changed my answer",
                      ];

                      return (
                        <div key={q.id} className={`space-y-3 ${idx > 0 ? "pt-4" : ""}`}>
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-900 font-medium leading-relaxed">
                            <span className="font-bold text-slate-700 mr-1.5">Q:</span>
                            <MathRenderer text={q.prompt} />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                              <span className="text-[10px] uppercase font-bold text-rose-700 block mb-0.5">
                                Your Pick: ({userPick || "None"})
                              </span>
                              <MathRenderer text={studentOpt?.text || "No option selected"} />
                            </div>

                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                              <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-0.5">
                                Correct Answer: ({q.correctOptionId})
                              </span>
                              <MathRenderer text={correctOpt?.text || "Option text unavailable"} />
                            </div>
                          </div>

                          {q.explanation && (
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                              <span className="text-[10px] uppercase font-bold text-slate-600 block mb-0.5">
                                NCERT Rationale:
                              </span>
                              <MathRenderer text={q.explanation} className="leading-relaxed" />
                            </div>
                          )}

                          {/* One-Tap Tags */}
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
                              Categorize this mistake:
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                              {TAG_OPTIONS.map((tag) => {
                                const isSelected = currentTag === tag;
                                return (
                                  <button
                                    key={tag}
                                    type="button"
                                    onClick={() => handleTagMistake(q.id, tag)}
                                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                                      isSelected
                                        ? "bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs"
                                        : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                                    }`}
                                  >
                                    {isSelected ? (
                                      <Check className="w-3 h-3 text-white" />
                                    ) : (
                                      <Tag className="w-3 h-3 text-slate-400" />
                                    )}
                                    <span>{tag}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Perfect Score! 10 / 10 Correct
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Outstanding precision. You mastered every question on this topic with zero mistakes.
                  </p>
                </div>
              )}

              {/* Close Button */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs cursor-pointer transition-all"
                >
                  Return to AI Coach
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
