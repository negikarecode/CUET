"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTestStore } from "@/lib/store/useTestStore";
import { calculateXP, updateStreak, evaluateTrophies } from "@/lib/gamification";
import { getTestAttemptStats } from "@/lib/analytics";
import { Trophy, RecordedTestAttempt } from "@/types";
import PostMockAnalysisClient from "./PostMockAnalysisClient";
import { buildPostMockDeterministicReport } from "@/lib/post-mock-engine";

export default function CBTResultView() {
  const testMeta = useCBTStore((state) => state.testMeta);
  const questions = useCBTStore((state) => state.questions);
  const answers = useCBTStore((state) => state.answers);
  const submittedScore = useCBTStore((state) => state.submittedScore);
  const resetSession = useCBTStore((state) => state.resetSession);

  const user = useTestStore((state) => state.user);
  const testAttempts = useTestStore((state) => state.testAttempts);
  const addXP = useTestStore((state) => state.addXP);
  const addCoins = useTestStore((state) => state.addCoins);
  const recordTestAttempt = useTestStore((state) => state.recordTestAttempt);

  const [earnedXP, setEarnedXP] = useState(0);
  const [unlockedTrophies, setUnlockedTrophies] = useState<Trophy[]>([]);
  const hasProcessedRef = useRef(false);
  const currentAttemptRecordRef = useRef<RecordedTestAttempt | null>(null);

  // Derive all-time personal best stats for this specific test
  const currentTestId = testMeta?.id ?? "cbt_exam";
  const testStats = getTestAttemptStats(testAttempts, currentTestId);
  const attemptsCount = Math.max(1, testStats.attemptsCount);
  const bestAttempt = testStats.bestAttempt;

  const currentMarks = submittedScore?.totalMarks ?? 0;
  const currentAccuracy = submittedScore?.accuracyPercentage ?? 0;
  const bestMarks = bestAttempt ? Math.max(bestAttempt.totalMarks, currentMarks) : currentMarks;
  const bestAccuracy =
    bestAttempt && bestAttempt.totalMarks > currentMarks
      ? bestAttempt.accuracyPercentage
      : currentAccuracy;
  const isNewPersonalBest = !bestAttempt || currentMarks >= bestAttempt.totalMarks;
  const scoreImprovement =
    bestAttempt && currentMarks > bestAttempt.totalMarks
      ? currentMarks - bestAttempt.totalMarks
      : 0;

  useEffect(() => {
    if (hasProcessedRef.current || !submittedScore) return;
    hasProcessedRef.current = true;

    // 1. Record the complete attempt for Weakness Radar, Accuracy, and Solved Questions analytics
    const questionAttempts = questions.map((q) => {
      const ans = answers[q.id];
      const selectedOption = ans?.selectedOption ?? null;
      const isCorrect =
        selectedOption !== null && selectedOption !== undefined
          ? selectedOption === q.correctOptionId
          : null;
      const timeSpent = ans?.timeSpentSeconds ?? 0;
      return {
        questionId: q.id,
        conceptId: q.conceptId,
        questionNumber: q.questionNumber,
        subject: testMeta?.subject ?? "Physics",
        chapter: q.chapter || q.topic || "Domain Core",
        microTopic: q.topic,
        prompt: q.prompt,
        options: q.options,
        questionType: q.questionType,
        selectedOption,
        correctOption: q.correctOptionId,
        isCorrect,
        timeSpentSeconds: timeSpent,
        isTimeSink: timeSpent > 72,
        difficulty: String(q.difficulty),
        ncertReference: q.pyqSource || `NCERT Class 12 (${q.chapter || q.topic})`,
        explanation: q.explanation,
      };
    });

    const currentTId = testMeta?.id ?? "cbt_exam";
    const existingAttempt = (testAttempts || []).find(
      (a) => a.testId === currentTId && Math.abs(Date.now() - new Date(a.submittedAt).getTime()) < 300000
    );
    const attemptId = existingAttempt ? existingAttempt.id : `attempt_${currentTId}_${Date.now()}`;

    const attemptRecord: RecordedTestAttempt = {
      id: attemptId,
      userId: user.id || "guest",
      testId: testMeta?.id ?? "cbt_exam",
      testTitle: testMeta?.title ?? "CUET Domain Examination Paper",
      subject: testMeta?.subject ?? "Physics",
      totalQuestions: questions.length,
      attemptedCount: submittedScore.attemptedCount,
      unattemptedCount: submittedScore.unattemptedCount,
      correctCount: submittedScore.correctCount,
      incorrectCount: submittedScore.incorrectCount,
      totalMarks: submittedScore.totalMarks,
      maxMarks: submittedScore.maxMarks,
      accuracyPercentage: submittedScore.accuracyPercentage,
      timeTakenSeconds: submittedScore.timeTakenSeconds,
      timeSinkCount: submittedScore.timeSinkCount,
      submittedAt: new Date().toISOString(),
      questions: questionAttempts,
    };

    currentAttemptRecordRef.current = attemptRecord;

    // Save locally into user store
    recordTestAttempt(attemptRecord);

    // Save asynchronously to Supabase database via API
    fetch("/api/test/record-attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attemptRecord),
    }).catch((err) => {
      console.warn("Background attempt database sync notice:", err);
    });

    const xp = calculateXP(
      submittedScore.correctCount,
      submittedScore.accuracyPercentage,
      submittedScore.timeTakenSeconds,
      questions.length
    );
    setEarnedXP(xp);
    addXP(xp);

    // Update practice streak
    updateStreak(user.id);

    // Evaluate trophy achievements
    evaluateTrophies(user.id, {
      totalQuestions: questions.length,
      correctAnswers: submittedScore.correctCount,
      accuracyPercentage: submittedScore.accuracyPercentage,
      totalTimeSpentSeconds: submittedScore.timeTakenSeconds,
      isRepairQuiz: questions.length <= 5,
      currentStreak: user.dailyStreak,
    }).then((newlyUnlocked) => {
      if (newlyUnlocked.length > 0) {
        setUnlockedTrophies(newlyUnlocked);
        newlyUnlocked.forEach((t) => {
          addXP(t.xp_reward);
          addCoins(t.coin_reward);
        });
      }
    });
  }, [
    submittedScore,
    questions,
    answers,
    testMeta,
    recordTestAttempt,
    user.id,
    user.dailyStreak,
    addXP,
    addCoins,
    testAttempts,
  ]);

  // Compile deterministic Post-Mock Analysis report from this attempt (Hooks must run unconditionally)
  const deterministicReport = useMemo(() => {
    if (!submittedScore) return null;
    if (currentAttemptRecordRef.current) {
      return buildPostMockDeterministicReport(currentAttemptRecordRef.current, questions);
    }

    const currentTId = testMeta?.id ?? "cbt_exam";
    const existingAttempt = (testAttempts || []).find((a) => a.testId === currentTId);
    if (existingAttempt) {
      return buildPostMockDeterministicReport(existingAttempt, questions);
    }

    // Synthesize from active store state if first run before effect
    const syntheticAttempt: RecordedTestAttempt = {
      id: `attempt_${currentTId}_${Date.now()}`,
      userId: user.id || "guest",
      testId: testMeta?.id ?? "cbt_exam",
      testTitle: testMeta?.title ?? "CUET Domain Examination Paper",
      subject: testMeta?.subject ?? "Physics",
      totalQuestions: questions.length,
      attemptedCount: submittedScore.attemptedCount,
      unattemptedCount: submittedScore.unattemptedCount,
      correctCount: submittedScore.correctCount,
      incorrectCount: submittedScore.incorrectCount,
      totalMarks: submittedScore.totalMarks,
      maxMarks: submittedScore.maxMarks,
      accuracyPercentage: submittedScore.accuracyPercentage,
      timeTakenSeconds: submittedScore.timeTakenSeconds,
      timeSinkCount: submittedScore.timeSinkCount,
      submittedAt: new Date().toISOString(),
      questions: questions.map((q) => {
        const ans = answers[q.id];
        const selectedOption = ans?.selectedOption ?? null;
        const isCorrect =
          selectedOption !== null && selectedOption !== undefined
            ? selectedOption === q.correctOptionId
            : null;
        const timeSpent = ans?.timeSpentSeconds ?? 0;
        return {
          questionId: q.id,
          conceptId: q.conceptId,
          questionNumber: q.questionNumber,
          subject: testMeta?.subject ?? "Physics",
          chapter: q.chapter || q.topic || "Domain Core",
          microTopic: q.topic,
          prompt: q.prompt,
          options: q.options,
          questionType: q.questionType,
          selectedOption,
          correctOption: q.correctOptionId,
          isCorrect,
          timeSpentSeconds: timeSpent,
          isTimeSink: timeSpent > 72,
          difficulty: String(q.difficulty),
          ncertReference: q.pyqSource || `NCERT Class 12 (${q.chapter || q.topic})`,
          explanation: q.explanation,
        };
      }),
    };
    return buildPostMockDeterministicReport(syntheticAttempt, questions);
  }, [questions, answers, submittedScore, testMeta, user.id, testAttempts]);

  if (!submittedScore || (questions.length > 0 && !questions[0]?.correctOptionId)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-[#FAF7EE] border-2 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
          <Loader2 className="w-6 h-6 animate-spin text-black stroke-[2.5]" />
        </div>
        <h3 className="text-base font-black text-black">
          Compiling Official CBT Scorecard...
        </h3>
        <p className="text-xs text-black/60 font-semibold mt-1">
          Validating answer keys and generating NCERT performance diagnostics.
        </p>
      </div>
    );
  }



  if (!deterministicReport) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-[#FAF7EE] border-2 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
          <Loader2 className="w-6 h-6 animate-spin text-black stroke-[2.5]" />
        </div>
        <h3 className="text-base font-black text-black">
          Generating Unified Post-Mock Analysis...
        </h3>
        <p className="text-xs text-black/60 font-semibold mt-1">
          Compiling official scorecard, chapter analytics, and grounded diagnostic verification.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      <PostMockAnalysisClient
        report={deterministicReport}
        onRetake={resetSession}
        earnedXP={earnedXP}
        unlockedTrophies={unlockedTrophies}
        attemptsCount={attemptsCount}
        bestMarks={bestMarks}
        bestAccuracy={bestAccuracy}
        isNewPersonalBest={isNewPersonalBest}
        scoreImprovement={scoreImprovement}
      />
    </div>
  );
}
