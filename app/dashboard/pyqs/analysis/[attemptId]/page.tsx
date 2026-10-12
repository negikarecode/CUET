"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle, BookOpen, Play } from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { buildPostMockDeterministicReport } from "@/lib/post-mock-engine";
import PostMockAnalysisClient from "@/components/cbt/PostMockAnalysisClient";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import { RecordedTestAttempt } from "@/types";

export default function PYQAnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const resetSession = useCBTStore((state) => state.resetSession);

  const attemptId = String(params?.attemptId || "");

  // Find attempt matching either attempt.id or attempt.testId
  const matchingAttempt = useMemo(() => {
    if (!testAttempts || testAttempts.length === 0) return null;
    return (
      testAttempts.find((a) => a.id === attemptId) ||
      testAttempts.find((a) => a.testId === attemptId) ||
      null
    );
  }, [testAttempts, attemptId]);

  // If student hasn't taken this paper yet, synthesize a review report so they can review official solutions
  const fallbackReport = useMemo(() => {
    if (matchingAttempt) return null;
    try {
      const { testMeta, questions } = getQuestionsForTest(attemptId);
      if (!questions || questions.length === 0) return null;

      const syntheticAttempt: RecordedTestAttempt = {
        id: `preview_${attemptId}`,
        userId: "student",
        testId: attemptId,
        testTitle: testMeta.title || `CUET UG ${testMeta.subject} Official Past Paper`,
        subject: testMeta.subject,
        totalQuestions: questions.length,
        attemptedCount: 0,
        unattemptedCount: questions.length,
        correctCount: 0,
        incorrectCount: 0,
        totalMarks: 0,
        maxMarks: questions.length * 5,
        accuracyPercentage: 0,
        timeTakenSeconds: 0,
        timeSinkCount: 0,
        submittedAt: new Date().toISOString(),
        questions: questions.map((q) => ({
          questionId: q.id,
          conceptId: q.conceptId,
          questionNumber: q.questionNumber,
          subject: testMeta.subject,
          chapter: q.chapter || q.topic || "Core Domain",
          microTopic: q.topic || "Core Topic",
          prompt: q.prompt,
          options: q.options,
          questionType: q.questionType,
          selectedOption: null,
          correctOption: q.correctOptionId,
          isCorrect: null,
          timeSpentSeconds: 0,
          isTimeSink: false,
          difficulty: String(q.difficulty),
          ncertReference: q.pyqSource || `NCERT Class 12 (${q.chapter})`,
          explanation: q.explanation,
        })),
      };

      return buildPostMockDeterministicReport(syntheticAttempt, questions);
    } catch {
      return null;
    }
  }, [matchingAttempt, attemptId]);

  const report = useMemo(() => {
    if (matchingAttempt) {
      return buildPostMockDeterministicReport(matchingAttempt);
    }
    return fallbackReport;
  }, [matchingAttempt, fallbackReport]);

  if (!isClient) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 flex justify-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <Link
          href="/dashboard/pyqs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All PYQ Papers
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">PYQ Paper Attempt Not Found</h2>
          <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
            We couldn&apos;t find saved question telemetry or a matching official paper for &ldquo;{attemptId}&rdquo;.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/dashboard/pyqs"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs inline-flex items-center gap-2 transition-all"
            >
              <span>Browse All PYQ Papers</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isPreviewMode = !matchingAttempt && Boolean(fallbackReport);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {isPreviewMode && (
        <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-blue-900">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-xs font-semibold">
              Preview Mode: You are reviewing the official NCERT solutions & chapter breakdown for this past paper.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              resetSession();
              router.push(`/test/${attemptId}`);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shrink-0 cursor-pointer transition-colors"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Attempt as Timed CBT Exam</span>
          </button>
        </div>
      )}

      <PostMockAnalysisClient
        report={report}
        onRetake={() => {
          resetSession();
          router.push(`/test/${matchingAttempt?.testId || attemptId}?reattempt=true`);
        }}
      />
    </div>
  );
}
