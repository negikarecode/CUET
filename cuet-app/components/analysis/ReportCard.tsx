"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MockTestAnalysis, MockTestSession } from "@/lib/types";
import { ScoreHero } from "./ScoreHero";
import { AICoachMessage } from "./AICoachMessage";
import { ActionPlan } from "./ActionPlan";
import { SubjectBreakdown } from "./SubjectBreakdown";
import { ChapterBreakdown } from "./ChapterBreakdown";
import { TopicBreakdown } from "./TopicBreakdown";
import { TimeAnalysis } from "./TimeAnalysis";
import { MistakePatterns } from "./MistakePatterns";
import { PredictionCard } from "./PredictionCard";
import { ScoreTrend } from "./ScoreTrend";
import { ComparisonView } from "./ComparisonView";
import { DownloadButton } from "./DownloadButton";
import {
  Calendar,
  Clock,
  ChevronLeft,
  Share2,
  BarChart3,
  CalendarCheck,
  BookOpen,
  ShieldAlert,
  Compass,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportCardProps {
  session: MockTestSession;
  analysis: MockTestAnalysis;
  allSessions?: MockTestSession[];
  studentName?: string;
}

export function ReportCard({
  session,
  analysis,
  allSessions = [],
  studentName = "Student",
}: ReportCardProps) {
  const [activeTab, setActiveTab] = useState<
    "all" | "plan" | "academics" | "diagnostics" | "prediction" | "trend"
  >("all");

  const formattedDate = session.completed_at
    ? new Date(session.completed_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Recently Completed";

  const totalDurationMinutes = Math.round(
    (analysis.total_time_seconds || session.total_duration_seconds) / 60
  );

  // Derive primary weak topic ID for quick CTA
  const primaryWeakTopic = analysis.topic_breakdown.find(
    (t) => t.weakness_signal === "critical" || t.weakness_signal === "weak"
  );

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/analysis/history">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-slate-500 hover:text-slate-900 rounded-xl">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[11px] font-black text-indigo-800 uppercase">
                  Mock #{session.test_number}
                </span>
                <h1 className="text-base sm:text-lg font-black text-slate-900 truncate">
                  {session.session_name || `CUET Mock Test #${session.test_number}`}
                </h1>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Completed on {formattedDate} • {totalDurationMinutes} mins total
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Link href="/analysis/history">
              <Button variant="outline" size="sm" className="text-xs font-bold gap-1.5 h-9 hidden md:flex">
                <History className="h-4 w-4 text-slate-500" />
                <span>All Tests ({allSessions.length})</span>
              </Button>
            </Link>

            <DownloadButton
              analysisId={analysis.id}
              testNumber={session.test_number}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* Section 1: Hero Score Banner */}
        <ScoreHero
          rawScore={analysis.raw_score}
          maxScore={analysis.max_score}
          percentage={analysis.percentage}
          scoreVsLast={analysis.score_vs_last_test}
          bestEver={analysis.best_score_ever}
          avgLast5={analysis.average_score_last_5}
          correctCount={session.correct_count}
          wrongCount={session.wrong_count}
          skippedCount={session.skipped_count}
          trend={analysis.score_trend}
          testNumber={session.test_number}
        />

        {/* Section 2: AI Coach Debrief Message */}
        <AICoachMessage
          coachingMessage={analysis.ai_coaching_message}
          motivationalQuote={analysis.ai_motivational_quote}
          examStrategy={analysis.ai_exam_strategy}
          strengths={analysis.ai_strengths}
          improvements={analysis.ai_improvements}
          primaryWeakTopicId={primaryWeakTopic?.topic_id}
        />

        {/* Filter / Section Quick Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl transition-colors shrink-0 ${
              activeTab === "all"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Full Comprehensive Report
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-2 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === "plan"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            48-Hour Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("academics")}
            className={`px-4 py-2 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === "academics"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Subjects & Topics
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("diagnostics")}
            className={`px-4 py-2 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === "diagnostics"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            Speed & Mistakes
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("prediction")}
            className={`px-4 py-2 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === "prediction"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            CUET Cutoffs
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("trend")}
            className={`px-4 py-2 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === "trend"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Trend & Compare
          </button>
        </div>

        {/* Section 3: 48-Hour Action Plan */}
        {(activeTab === "all" || activeTab === "plan") && (
          <ActionPlan
            analysisId={analysis.id}
            actionPlan={analysis.ai_action_plan}
          />
        )}

        {/* Section 4: Academic Performance (Subjects, Chapters, Topics) */}
        {(activeTab === "all" || activeTab === "academics") && (
          <div className="space-y-8">
            <SubjectBreakdown
              subjects={analysis.subject_breakdown}
              chapters={analysis.chapter_breakdown}
            />

            <ChapterBreakdown
              chapters={analysis.chapter_breakdown}
            />

            <TopicBreakdown
              topics={analysis.topic_breakdown}
            />
          </div>
        )}

        {/* Section 5: Behavioral & Cognitive Diagnostics (Speed & Mistakes) */}
        {(activeTab === "all" || activeTab === "diagnostics") && (
          <div className="space-y-8">
            <TimeAnalysis
              avgTimePerQuestion={analysis.avg_time_per_question}
              avgTimeCorrect={analysis.avg_time_correct}
              avgTimeWrong={analysis.avg_time_wrong}
              avgTimeSkipped={analysis.avg_time_skipped}
              fastestQuestionSeconds={analysis.fastest_question_seconds}
              slowestQuestionSeconds={analysis.slowest_question_seconds}
              timeWastedSeconds={analysis.time_wasted_seconds}
              totalTimeSeconds={analysis.total_time_seconds}
            />

            <MistakePatterns
              patterns={analysis.mistake_patterns}
            />
          </div>
        )}

        {/* Section 6: CUET Cutoffs & Predictions */}
        {(activeTab === "all" || activeTab === "prediction") && (
          <PredictionCard
            predictedMin={analysis.predicted_cuet_score_min}
            predictedMax={analysis.predicted_cuet_score_max}
            maxScore={analysis.max_score}
            rankMin={analysis.predicted_rank_min}
            rankMax={analysis.predicted_rank_max}
            confidence={analysis.confidence_level}
          />
        )}

        {/* Section 7: Score Trend & Test Comparison */}
        {(activeTab === "all" || activeTab === "trend") && (
          <div className="space-y-8">
            <ScoreTrend
              scoreTrend={analysis.score_trend}
              scoreVsLastTest={analysis.score_vs_last_test}
              bestScoreEver={analysis.best_score_ever}
              averageScoreLast5={analysis.average_score_last_5}
              history={allSessions.map((s) => ({
                test_number: s.test_number,
                test_date: s.completed_at || s.created_at,
                raw_score: s.raw_score,
                max_score: s.max_possible_score,
                percentage: s.percentage_score,
                session_id: s.id,
              }))}
            />

            <ComparisonView
              currentSession={session}
              currentAnalysis={analysis}
              allSessions={allSessions}
            />
          </div>
        )}
      </main>
    </div>
  );
}
