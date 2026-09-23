"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Sparkles, AlertTriangle, BookOpen, Crown } from "lucide-react";
import { GeneratingQuestion } from "./GeneratingQuestion";
import { AIQuestionCard, AIQuestionView } from "./AIQuestionCard";
import { AISessionSummary } from "./AISessionSummary";
import { Button } from "@/components/ui/button";

interface AIPracticeSessionProps {
  topicId: number;
}

interface AnswerRecord {
  questionId: number;
  questionText: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
  difficulty: "easy" | "medium" | "hard";
}

export function AIPracticeSession({ topicId }: AIPracticeSessionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const weaknessLevelParam = searchParams.get("weakness_level");
  const fromPlanner = searchParams.get("from_planner") === "true";
  const taskId = searchParams.get("task_id");
  const plannedMinutes = searchParams.get("planned_minutes")
    ? parseInt(searchParams.get("planned_minutes") as string, 10)
    : 30;

  // State
  const [topicDetails, setTopicDetails] = useState<{
    topic_name: string;
    chapter_name: string;
    subject_name: string;
  }>({
    topic_name: "Fundamental Rights",
    chapter_name: "Constitution: Why and How?",
    subject_name: "Political Science",
  });

  const [questionsQueue, setQuestionsQueue] = useState<AIQuestionView[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Per-question state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Timer per question
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalSessionSecondsRef = useRef(0);
  const isCompletedSynced = useRef(false);

  // Session stats & weakness progression
  const [answersHistory, setAnswersHistory] = useState<AnswerRecord[]>([]);
  const [initialScore, setInitialScore] = useState(32);
  const [updatedScore, setUpdatedScore] = useState(32);

  // Rate limiting & upgrade modal
  const [rateLimitModal, setRateLimitModal] = useState<{
    show: boolean;
    reason?: string;
  }>({ show: false });

  const [notEnoughContent, setNotEnoughContent] = useState(false);
  const [usageInfo, setUsageInfo] = useState<{
    used_today: number;
    daily_limit: number;
    remaining: number;
  }>({
    used_today: 0,
    daily_limit: 10,
    remaining: 10,
  });

  // 1. Fetch initial topic data & weakness score
  useEffect(() => {
    async function loadTopicData() {
      try {
        const res = await fetch(`/api/weakness/topic/${topicId}`);
        if (res.ok) {
          const json = await res.json();
          if (json.topic) {
            setTopicDetails({
              topic_name: json.topic.topic_name,
              chapter_name: json.topic.chapters?.chapter_name || "Constitution",
              subject_name: json.topic.subjects?.name || "Political Science",
            });
          }
          if (json.weaknessScore) {
            const currentScore = Math.round(json.weaknessScore.final_weakness_score || 35);
            setInitialScore(currentScore);
            setUpdatedScore(currentScore);
          }
        }
      } catch (e) {
        console.warn("Could not fetch topic info:", e);
      }
    }

    loadTopicData();
  }, [topicId]);

  // 2. Fetch upfront batch of questions on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchQuestionsBatch() {
      setIsGenerating(true);
      try {
        const res = await fetch("/api/ai/generate-batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic_id: topicId, count: 5 }),
        });

        const data = await res.json();

        if (!isMounted) return;

        if (res.status === 429 || data.error === "RATE_LIMIT_EXCEEDED") {
          setRateLimitModal({ show: true, reason: data.reason });
          setIsGenerating(false);
          return;
        }

        if (data.error === "NOT_ENOUGH_CONTENT") {
          setNotEnoughContent(true);
          setIsGenerating(false);
          return;
        }

        if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestionsQueue(data.questions);
          if (data.usage) setUsageInfo(data.usage);
        } else {
          // Fallback to single question endpoint
          const singleRes = await fetch("/api/ai/generate-question", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic_id: topicId }),
          });
          const singleData = await singleRes.json();
          if (singleData.success && singleData.question) {
            setQuestionsQueue([singleData.question]);
            if (singleData.usage) setUsageInfo(singleData.usage);
          } else if (singleData.error === "NOT_ENOUGH_CONTENT") {
            setNotEnoughContent(true);
          }
        }
      } catch (err) {
        console.error("Failed to load initial batch:", err);
      } finally {
        if (isMounted) setIsGenerating(false);
      }
    }

    fetchQuestionsBatch();

    return () => {
      isMounted = false;
    };
  }, [topicId]);

  // 3. Question timer
  useEffect(() => {
    if (isGenerating || isAnswered || sessionCompleted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimerSeconds(0);
    timerRef.current = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isGenerating, isAnswered, sessionCompleted]);

  // Overall session elapsed time tracker
  useEffect(() => {
    const interval = setInterval(() => {
      totalSessionSecondsRef.current += 1;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // When session completes, auto-complete planner task if coming from planner
  useEffect(() => {
    if (sessionCompleted && fromPlanner && taskId && !isCompletedSynced.current) {
      isCompletedSynced.current = true;
      const actualMinutes = Math.max(1, Math.round(totalSessionSecondsRef.current / 60)) || 15;
      fetch("/api/planner/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task_id: taskId,
          actual_minutes: actualMinutes,
        }),
      }).catch((err) => console.warn("Planner task complete sync warning:", err));
    }
  }, [sessionCompleted, fromPlanner, taskId]);

  const handleFinishAndReturnToPlan = async () => {
    if (taskId && !isCompletedSynced.current) {
      isCompletedSynced.current = true;
      const actualMinutes = Math.max(1, Math.round(totalSessionSecondsRef.current / 60)) || 10;
      try {
        await fetch("/api/planner/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task_id: taskId,
            actual_minutes: actualMinutes,
          }),
        });
      } catch (err) {
        console.warn("Planner task sync error:", err);
      }
    }
    router.push("/planner");
  };

  const currentQuestion = questionsQueue[currentIndex] || null;

  // Handle option selection
  const handleSelectOption = async (option: "A" | "B" | "C" | "D") => {
    if (isAnswered || isVerifying || !currentQuestion) return;

    setSelectedOption(option);
    setIsVerifying(true);

    try {
      const res = await fetch("/api/ai/verify-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: currentQuestion.id,
          selected_option: option,
          time_taken_seconds: timerSeconds,
          topic_id: topicId,
        }),
      });

      const data = await res.json();
      const verifiedCorrect = data.is_correct;
      const returnedCorrectOption = data.correct_option || "A";
      const returnedExplanation = data.explanation || "";

      setCorrectOption(returnedCorrectOption);
      setExplanation(returnedExplanation);
      setIsAnswered(true);

      if (data.weaknessScore?.final_weakness_score) {
        setUpdatedScore(Math.round(data.weaknessScore.final_weakness_score));
      }

      setAnswersHistory((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          questionText: currentQuestion.question_text,
          selectedOption: option,
          correctOption: returnedCorrectOption,
          isCorrect: verifiedCorrect,
          difficulty: currentQuestion.difficulty,
        },
      ]);
    } catch (err) {
      console.error("Answer verification error:", err);
      setIsAnswered(true);
      setExplanation("Unable to verify answer. Recorded for practice.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle next question
  const handleNext = async () => {
    const nextIdx = currentIndex + 1;
    const TOTAL_SESSION_QUESTIONS = 10;

    // Check if session reached target 10 questions
    if (nextIdx >= TOTAL_SESSION_QUESTIONS) {
      setSessionCompleted(true);
      return;
    }

    // If we're at the end of current questions queue and haven't reached 10, generate more!
    if (nextIdx >= questionsQueue.length) {
      setIsGenerating(true);
      setSelectedOption(null);
      setCorrectOption(null);
      setExplanation(null);
      setIsAnswered(false);

      try {
        const res = await fetch("/api/ai/generate-batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic_id: topicId,
            count: Math.min(5, TOTAL_SESSION_QUESTIONS - questionsQueue.length),
          }),
        });

        const data = await res.json();

        if (res.status === 429 || data.error === "RATE_LIMIT_EXCEEDED") {
          setRateLimitModal({ show: true, reason: data.reason });
          setIsGenerating(false);
          return;
        }

        if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestionsQueue((prev) => [...prev, ...data.questions]);
          setCurrentIndex(nextIdx);
          if (data.usage) setUsageInfo(data.usage);
        } else {
          // If no more questions can be generated, complete session
          setSessionCompleted(true);
        }
      } catch (err) {
        setSessionCompleted(true);
      } finally {
        setIsGenerating(false);
      }
      return;
    }

    // Reset per-question state and proceed
    setSelectedOption(null);
    setCorrectOption(null);
    setExplanation(null);
    setIsAnswered(false);
    setCurrentIndex(nextIdx);
  };

  const handlePracticeAgain = () => {
    setCurrentIndex(0);
    setAnswersHistory([]);
    setSelectedOption(null);
    setCorrectOption(null);
    setExplanation(null);
    setIsAnswered(false);
    setSessionCompleted(false);
    setQuestionsQueue([]);
    setIsGenerating(true);

    fetch("/api/ai/generate-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic_id: topicId, count: 5 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.questions) {
          setQuestionsQueue(data.questions);
          if (data.usage) setUsageInfo(data.usage);
        }
      })
      .finally(() => setIsGenerating(false));
  };

  // 4. Render Loading
  if (isGenerating && questionsQueue.length === 0) {
    return (
      <div className="w-full min-h-screen py-10 px-4">
        <GeneratingQuestion
          topicName={topicDetails.topic_name}
          difficulty={weaknessLevelParam || "medium"}
        />
      </div>
    );
  }

  // 5. Render Not Enough Content Fallback
  if (notEnoughContent) {
    return (
      <div className="w-full max-w-lg mx-auto my-16 p-8 bg-white border border-slate-200 rounded-3xl text-center shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto text-amber-600">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          We&apos;re adding more content for this topic!
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Our educators are currently embedding syllabus notes for{" "}
          <strong>{topicDetails.topic_name}</strong>. Try standard practice for now!
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link href={`/practice/${topicId}`}>
            <Button className="w-full sm:w-auto font-bold bg-indigo-600 hover:bg-indigo-700">
              Go to Standard Practice →
            </Button>
          </Link>
          <Link href="/weakness">
            <Button variant="outline" className="w-full sm:w-auto font-semibold">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // 6. Render Session Summary
  if (sessionCompleted) {
    const correctCount = answersHistory.filter((a) => a.isCorrect).length;
    const wrongCount = answersHistory.filter((a) => !a.isCorrect).length;

    const breakdown = {
      easy: {
        correct: answersHistory.filter((a) => a.difficulty === "easy" && a.isCorrect).length,
        total: answersHistory.filter((a) => a.difficulty === "easy").length,
      },
      medium: {
        correct: answersHistory.filter((a) => a.difficulty === "medium" && a.isCorrect).length,
        total: answersHistory.filter((a) => a.difficulty === "medium").length,
      },
      hard: {
        correct: answersHistory.filter((a) => a.difficulty === "hard" && a.isCorrect).length,
        total: answersHistory.filter((a) => a.difficulty === "hard").length,
      },
    };

    return (
      <div className="w-full min-h-screen py-8 px-4">
        <AISessionSummary
          topicId={topicId}
          topicName={topicDetails.topic_name}
          totalQuestions={answersHistory.length || 1}
          correctCount={correctCount}
          wrongCount={wrongCount}
          initialScore={initialScore}
          updatedScore={updatedScore}
          difficultyBreakdown={breakdown}
          onPracticeAgain={handlePracticeAgain}
          fromPlanner={fromPlanner}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-6 sm:py-10 px-4 sm:px-6">
      {/* Planner Context Banner */}
      {fromPlanner && (
        <div className="max-w-3xl mx-auto mb-4 p-3.5 bg-indigo-50/90 border border-indigo-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-950">
            <span className="text-base"></span>
            <span>Today&apos;s Plan: Task Session ({plannedMinutes} min)</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleFinishAndReturnToPlan}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white border-indigo-200 hover:bg-indigo-100/60 transition-colors h-8"
          >
            End & Return to Plan →
          </Button>
        </div>
      )}

      {/* Top Navigation */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between">
        <Link
          href={fromPlanner ? "/planner" : "/weakness"}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{fromPlanner ? "Back to Study Plan" : "Exit AI Practice"}</span>
        </Link>

        <div className="inline-flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full font-bold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>AI Adaptive Session</span>
        </div>
      </div>

      {/* Main Question Card or Inline Loader */}
      {isGenerating ? (
        <GeneratingQuestion
          topicName={topicDetails.topic_name}
          difficulty={currentQuestion?.difficulty || "medium"}
        />
      ) : currentQuestion ? (
        <AIQuestionCard
          question={currentQuestion}
          questionIndex={currentIndex}
          totalQuestions={Math.max(questionsQueue.length, 5)}
          topicName={topicDetails.topic_name}
          subjectName={topicDetails.subject_name}
          timerSeconds={timerSeconds}
          selectedOption={selectedOption}
          correctOption={correctOption}
          explanation={explanation}
          isVerifying={isVerifying}
          isAnswered={isAnswered}
          onSelectOption={handleSelectOption}
          onNext={handleNext}
          usageInfo={usageInfo}
        />
      ) : null}

      {/* Rate Limit / Upgrade Modal */}
      {rateLimitModal.show && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-4 border border-indigo-100">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
              <Crown className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Daily AI Question Limit Reached
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {rateLimitModal.reason ||
                "You've used your 10 free AI questions today! Upgrade to Pro for 100 AI questions/day with unlimited custom generation."}
            </p>
            <div className="pt-2 space-y-2">
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold h-11 rounded-xl shadow-md gap-2"
              >
                <Crown className="w-4 h-4" />
                Upgrade to Pro (100 Qs/Day)
              </Button>
              <Link href={`/practice/${topicId}`} className="block">
                <Button variant="outline" className="w-full font-semibold h-11 rounded-xl">
                  Continue with Standard Practice
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
