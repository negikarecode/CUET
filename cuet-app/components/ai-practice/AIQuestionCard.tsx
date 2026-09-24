"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LatexRenderer from "@/components/common/LatexRenderer";

export interface AIQuestionView {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  difficulty: "easy" | "medium" | "hard";
  is_ai_generated?: boolean;
  from_cache?: boolean;
  from_fallback?: boolean;
}

interface AIQuestionCardProps {
  question: AIQuestionView;
  questionIndex: number;
  totalQuestions: number;
  topicName: string;
  subjectName?: string;
  timerSeconds: number;
  selectedOption: string | null;
  correctOption: string | null;
  explanation: string | null;
  isVerifying: boolean;
  isAnswered: boolean;
  onSelectOption: (option: "A" | "B" | "C" | "D") => void;
  onNext: () => void;
  usageInfo?: {
    used_today: number;
    daily_limit: number;
    remaining: number;
  };
}

export function AIQuestionCard({
  question,
  questionIndex,
  totalQuestions,
  topicName,
  subjectName = "Political Science",
  timerSeconds,
  selectedOption,
  correctOption,
  explanation,
  isVerifying,
  isAnswered,
  onSelectOption,
  onNext,
  usageInfo,
}: AIQuestionCardProps) {
  const options = [
    { key: "A" as const, text: question.option_a },
    { key: "B" as const, text: question.option_b },
    { key: "C" as const, text: question.option_c },
    { key: "D" as const, text: question.option_d },
  ];

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  const isCorrect = isAnswered && selectedOption === correctOption;
  const progressPercent = Math.round(((questionIndex + 1) / totalQuestions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden"
    >
      {/* Top Progress bar */}
      <div className="w-full bg-slate-100 h-1.5">
        <motion.div
          className="bg-indigo-600 h-1.5 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="p-5 sm:p-8 space-y-6">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
            <span>•</span>
            <Badge variant="outline" className="text-xs font-bold text-slate-700 bg-slate-50">
              {topicName}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Difficulty Badge */}
            <Badge
              className={`text-xs font-bold capitalize ${
                question.difficulty === "easy"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : question.difficulty === "medium"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {question.difficulty}
            </Badge>

            {/* AI Source Tag */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>{question.is_ai_generated !== false ? "AI Generated" : "Question Bank"}</span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatTimer(timerSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Question Text */}
        <div>
          <div className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
            <LatexRenderer content={question.question_text} />
          </div>
        </div>

        {/* Options Grid */}
        <div className="space-y-3 pt-2">
          {options.map((opt) => {
            const isSelected = selectedOption === opt.key;
            const isOptCorrect = isAnswered && correctOption === opt.key;
            const isOptWrong = isAnswered && isSelected && !isCorrect;

            let buttonStyle =
              "bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-slate-50";

            if (isAnswered) {
              if (isOptCorrect) {
                buttonStyle =
                  "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm ring-1 ring-emerald-500";
              } else if (isOptWrong) {
                buttonStyle =
                  "bg-red-50 border-red-500 text-red-950 font-bold shadow-sm ring-1 ring-red-500";
              } else {
                buttonStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              buttonStyle = "bg-indigo-50 border-indigo-500 text-indigo-950 font-bold";
            }

            return (
              <button
                key={opt.key}
                type="button"
                disabled={isAnswered || isVerifying}
                onClick={() => onSelectOption(opt.key)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-sm sm:text-base min-h-[56px] ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                      isOptCorrect
                        ? "bg-emerald-600 text-white"
                        : isOptWrong
                        ? "bg-red-600 text-white"
                        : isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {opt.key}
                  </span>
                  <div className="leading-snug flex-1">
                    <LatexRenderer content={opt.text} inline />
                  </div>
                </div>

                {isAnswered && (
                  <div className="flex-shrink-0">
                    {isOptCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isOptWrong ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Verifying Indicator */}
        {isVerifying && (
          <div className="py-2 text-center text-xs text-indigo-600 font-medium animate-pulse">
            Checking answer with CUET verified rubric...
          </div>
        )}

        {/* Post-Answer Result & Explanation */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-2 overflow-hidden"
            >
              {/* Outcome Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  isCorrect
                    ? "bg-emerald-500/10 border-emerald-300 text-emerald-950"
                    : "bg-red-500/10 border-red-300 text-red-950"
                }`}
              >
                <div className="mt-0.5">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm sm:text-base">
                    {isCorrect ? "Correct Answer! (+5 marks)" : "Incorrect Answer (-1 mark)"}
                  </h4>
                  <div className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                    <LatexRenderer content={explanation || "Refer to NCERT CUET preparation material for detailed review."} />
                  </div>
                </div>
              </div>

              {/* Action bar: Next Question + Usage Counter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified CUET Content Source</span>
                  {usageInfo && (
                    <>
                      <span>•</span>
                      <span className="font-semibold text-indigo-600">
                        Today: {usageInfo.used_today}/{usageInfo.daily_limit} AI questions
                      </span>
                    </>
                  )}
                </div>

                <Button
                  onClick={onNext}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 px-6 h-11 rounded-xl shadow-md"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
