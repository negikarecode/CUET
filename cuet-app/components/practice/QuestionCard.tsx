"use client";

import React, { useState, useEffect } from "react";
import { Clock, ArrowRight, SkipForward, Sparkles } from "lucide-react";
import { Question } from "@/lib/types";
import { OptionButton } from "./OptionButton";
import { ExplanationPanel } from "./ExplanationPanel";
import { ProgressBar } from "@/components/weakness/ProgressBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  topicName: string;
  onAnswer: (selectedOption: "A" | "B" | "C" | "D", isCorrect: boolean, timeSeconds: number) => void;
  onSkip: (timeSeconds: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  topicName,
  onAnswer,
  onSkip,
  onNext,
  isLastQuestion,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);

  // Timer: count up per question
  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setTimeSeconds(0);

    const timer = setInterval(() => {
      setTimeSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [question.id]);

  const handleSelectOption = (optionId: "A" | "B" | "C" | "D") => {
    if (isSubmitted) return;
    setSelectedOption(optionId);
    setIsSubmitted(true);

    const isCorrect = optionId === question.correct_option;
    onAnswer(optionId, isCorrect, timeSeconds);
  };

  const handleSkipQuestion = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    onSkip(timeSeconds);
  };

  const progressPercent = ((questionIndex + 1) / totalQuestions) * 100;
  const isCorrect = selectedOption === question.correct_option;

  const targetTime = question.difficulty === "easy" ? 30 : question.difficulty === "hard" ? 65 : 45;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Header Progress Bar */}
      <div className="w-full">
        <ProgressBar value={progressPercent} level="strong" height="sm" animate={false} />
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Navigation & Telemetry Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                {topicName}
              </span>
              <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0">
                {question.difficulty}
              </Badge>
              {question.question_type === "pyq" && (
                <Badge className="bg-amber-100 text-amber-800 text-[10px] py-0 border-amber-200">
                  CUET PYQ
                </Badge>
              )}
            </div>
            <h4 className="text-sm font-semibold text-slate-500 mt-1">
              Question {questionIndex + 1} of {totalQuestions}
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono font-semibold">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{timeSeconds}s</span>
              <span className="text-slate-400">/ {targetTime}s target</span>
            </div>

            {!isSubmitted && (
              <button
                type="button"
                onClick={handleSkipQuestion}
                className="text-xs font-semibold text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors min-h-[36px]"
              >
                <SkipForward className="w-3.5 h-3.5" />
                Skip
              </button>
            )}
          </div>
        </div>

        {/* Question Text */}
        <div className="space-y-2">
          <p className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed sm:leading-relaxed">
            {question.question_text}
          </p>
        </div>

        {/* Option Buttons (A, B, C, D) */}
        <div className="space-y-3 pt-2">
          {(["A", "B", "C", "D"] as const).map((optKey) => {
            const optText = question[`option_${optKey.toLowerCase()}` as "option_a" | "option_b" | "option_c" | "option_d"];
            return (
              <OptionButton
                key={optKey}
                id={optKey}
                text={optText}
                isSelected={selectedOption === optKey}
                isSubmitted={isSubmitted}
                isCorrect={question.correct_option === optKey}
                onSelect={handleSelectOption}
                disabled={isSubmitted}
              />
            );
          })}
        </div>

        {/* Slide-in Explanation Panel */}
        {isSubmitted && (
          <ExplanationPanel
            isCorrect={isCorrect}
            correctOption={question.correct_option}
            explanation={question.explanation}
            timeTakenSeconds={timeSeconds}
            targetSeconds={targetTime}
          />
        )}

        {/* Next Question / Finish Session Action */}
        {isSubmitted && (
          <div className="pt-4 flex justify-end">
            <Button
              size="lg"
              onClick={onNext}
              className="w-full sm:w-auto font-bold gap-2 text-base px-8 shadow-md"
            >
              {isLastQuestion ? (
                <>
                  Complete Session <Sparkles className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next Question <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
