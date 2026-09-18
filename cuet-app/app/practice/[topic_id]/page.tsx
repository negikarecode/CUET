"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import { usePractice } from "@/hooks/usePractice";
import { QuestionCard } from "@/components/practice/QuestionCard";
import { SessionSummary } from "@/components/practice/SessionSummary";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function PracticeTopicPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = parseInt(params.topic_id as string, 10) || 1;

  const [topicName, setTopicName] = useState<string>("Practice Session");

  const {
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions,
    isLoading,
    error,
    isCompleted,
    correctCount,
    wrongCount,
    skippedCount,
    totalTimeSeconds,
    updatedWeaknessScore,
    recordAnswer,
    skipQuestion,
    nextQuestion,
    restart,
  } = usePractice(topicId);

  // Fetch topic details for header
  useEffect(() => {
    async function loadTopicDetails() {
      try {
        const res = await fetch(`/api/weakness/topic/${topicId}`);
        if (res.ok) {
          const json = await res.json();
          if (json.topic?.topic_name) {
            setTopicName(json.topic.topic_name);
          }
        }
      } catch (e) {}
    }
    if (topicId) loadTopicDetails();
  }, [topicId]);

  // Loading skeleton state
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
        <Skeleton className="h-6 w-32 rounded-lg" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <div className="space-y-3">
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || questions.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto my-16 p-6 bg-white border border-slate-200 rounded-2xl text-center space-y-4 shadow-sm">
        <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">
          {error || "No questions found for this topic"}
        </h3>
        <p className="text-xs text-slate-500">
          Try practicing another topic or reload the questions from our verified question bank.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Button onClick={restart} variant="outline" size="sm" className="gap-1.5 font-bold">
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </Button>
          <Link href="/weakness">
            <Button size="sm" className="font-bold">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-6 sm:py-10 px-4 sm:px-6">
      {/* Top back navigation */}
      <div className="max-w-3xl mx-auto mb-4 flex items-center justify-between">
        <Link
          href="/weakness"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Weakness Dashboard
        </Link>
        <span className="text-xs font-semibold text-slate-400">
          CUET Exam Simulation Mode
        </span>
      </div>

      {/* Main Practice Container */}
      {!isCompleted && currentQuestion ? (
        <QuestionCard
          question={currentQuestion}
          questionIndex={currentIndex}
          totalQuestions={totalQuestions}
          topicName={topicName}
          onAnswer={recordAnswer}
          onSkip={skipQuestion}
          onNext={nextQuestion}
          isLastQuestion={currentIndex + 1 >= totalQuestions}
        />
      ) : (
        <SessionSummary
          topicName={topicName}
          topicId={topicId}
          totalAnswered={correctCount + wrongCount + skippedCount}
          correctCount={correctCount}
          wrongCount={wrongCount}
          skippedCount={skippedCount}
          totalTimeSeconds={totalTimeSeconds}
          updatedWeaknessScore={updatedWeaknessScore}
          onPracticeAgain={restart}
        />
      )}
    </div>
  );
}
