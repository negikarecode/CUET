"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Question, WeaknessScore, RecordAttemptPayload } from "@/lib/types";

export function usePractice(topicId: number) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Session Statistics
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [skippedCount, setSkippedCount] = useState<number>(0);
  const [totalTimeSeconds, setTotalTimeSeconds] = useState<number>(0);
  const [updatedWeaknessScore, setUpdatedWeaknessScore] = useState<WeaknessScore | null>(null);

  // Generate unique session ID
  const sessionId = useMemo(() => {
    return typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  // Fetch questions
  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCurrentIndex(0);
    setIsCompleted(false);
    setCorrectCount(0);
    setWrongCount(0);
    setSkippedCount(0);
    setTotalTimeSeconds(0);
    setUpdatedWeaknessScore(null);

    try {
      const res = await fetch(`/api/questions/${topicId}`);
      if (!res.ok) {
        throw new Error(`Failed to load questions: ${res.statusText}`);
      }
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error fetching questions";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [topicId]);

  useEffect(() => {
    if (topicId) {
      loadQuestions();
    }
  }, [topicId, loadQuestions]);

  // Record an attempt
  const recordAnswer = async (
    selectedOption: "A" | "B" | "C" | "D",
    isCorrect: boolean,
    timeSeconds: number
  ) => {
    const currQ = questions[currentIndex];
    if (!currQ) return;

    // 1. Optimistic state update
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }
    setTotalTimeSeconds((prev) => prev + timeSeconds);

    // 2. Send to API in background
    const payload: RecordAttemptPayload = {
      question_id: currQ.id,
      subject_id: currQ.subject_id,
      chapter_id: currQ.chapter_id,
      topic_id: currQ.topic_id,
      selected_option: selectedOption,
      is_correct: isCorrect,
      is_skipped: false,
      time_taken_seconds: timeSeconds,
      attempt_source: "practice",
      session_id: sessionId,
    };

    try {
      const res = await fetch("/api/attempts/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const resData = await res.json();
        if (resData.weaknessScore) {
          setUpdatedWeaknessScore(resData.weaknessScore);
        }
      }
    } catch (e) {
      console.warn("Failed to record attempt to server:", e);
    }
  };

  // Skip question
  const skipQuestion = async (timeSeconds: number) => {
    const currQ = questions[currentIndex];
    if (!currQ) return;

    setSkippedCount((prev) => prev + 1);
    setTotalTimeSeconds((prev) => prev + timeSeconds);

    const payload: RecordAttemptPayload = {
      question_id: currQ.id,
      subject_id: currQ.subject_id,
      chapter_id: currQ.chapter_id,
      topic_id: currQ.topic_id,
      selected_option: null,
      is_correct: false,
      is_skipped: true,
      time_taken_seconds: timeSeconds,
      attempt_source: "practice",
      session_id: sessionId,
    };

    try {
      const res = await fetch("/api/attempts/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const resData = await res.json();
        if (resData.weaknessScore) {
          setUpdatedWeaknessScore(resData.weaknessScore);
        }
      }
    } catch (e) {
      console.warn("Failed to record skip to server:", e);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  return {
    questions,
    currentQuestion: questions[currentIndex] || null,
    currentIndex,
    totalQuestions: questions.length,
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
    restart: loadQuestions,
  };
}
