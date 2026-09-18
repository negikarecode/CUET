"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, RefreshCw, BookOpen, AlertCircle, PlayCircle, BarChart3, ArrowRight } from "lucide-react";
import { WeaknessDashboard as IWeaknessDashboard, WeaknessScore } from "@/lib/types";
import { OverallHealthScore } from "./OverallHealthScore";
import { WeaknessLevel } from "./WeaknessLevel";
import { RecommendationBox } from "./RecommendationBox";
import { AlertBanner } from "./AlertBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface WeaknessDashboardProps {
  data?: IWeaknessDashboard | null;
  isLoading: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

export function WeaknessDashboard({
  data,
  isLoading,
  error,
  onRefresh,
}: WeaknessDashboardProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6 animate-pulse p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Skeleton className="h-9 w-64 rounded-xl" />
          <Skeleton className="h-9 w-32 rounded-xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="w-full max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-2xl text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
        <h3 className="text-lg font-bold text-red-900">Failed to load weakness analysis</h3>
        <p className="text-sm text-red-700">{error}</p>
        <Button onClick={onRefresh} className="bg-red-600 hover:bg-red-700 text-white font-semibold">
          Try Again
        </Button>
      </div>
    );
  }

  // 3. Empty State (No data or 0 total attempts)
  const allScores = [
    ...(data?.topics_by_level.critical || []),
    ...(data?.topics_by_level.weak || []),
    ...(data?.topics_by_level.average || []),
    ...(data?.topics_by_level.strong || []),
    ...(data?.topics_by_level.excellent || []),
  ];

  const totalAttempts = allScores.reduce((sum, s) => sum + (s.total_attempts || 0), 0);

  if (!data || totalAttempts === 0) {
    const firstTopicId = data?.topics_by_level.untested[0]?.id || 1;
    return (
      <div className="w-full max-w-xl mx-auto my-12 p-8 bg-white border border-slate-200 rounded-2xl text-center shadow-sm space-y-5">
        <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-3xl">
          🎯
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            You haven&apos;t practiced any topics yet!
          </h3>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
            Take your first 5-minute practice session to see your real-time AI Weakness breakdown across Accuracy, Speed, and Consistency.
          </p>
        </div>
        <Link href={`/practice/${firstTopicId}`}>
          <Button size="lg" className="font-bold gap-2 text-base px-8 shadow-md">
            <PlayCircle className="w-5 h-5" />
            Start Practicing →
          </Button>
        </Link>
      </div>
    );
  }

  // Filter scores by subject if selected
  const filterBySubj = (list: WeaknessScore[]) => {
    if (selectedSubject === "all") return list;
    return list.filter((item) => (item.subject?.name || "").toLowerCase() === selectedSubject.toLowerCase());
  };

  const filteredCritical = filterBySubj(data.topics_by_level.critical || []);
  const filteredWeak = filterBySubj(data.topics_by_level.weak || []);
  const filteredAverage = filterBySubj(data.topics_by_level.average || []);
  const filteredStrong = filterBySubj(data.topics_by_level.strong || []);
  const filteredExcellent = filterBySubj(data.topics_by_level.excellent || []);
  const filteredUntested = selectedSubject === "all"
    ? data.topics_by_level.untested || []
    : (data.topics_by_level.untested || []).filter((t) => t.subject_id === 1); // default or matching

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Top Banner: Student Welcome & Refetch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              AI Weakness Detector
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time diagnostic engine detecting precision leaks, speed traps, and knowledge gaps
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="text-xs font-semibold gap-1.5 h-9"
              aria-label="Refresh weakness data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Recalculate Scores
            </Button>
          )}
        </div>
      </div>

      {/* Latest Mock Test Report Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-indigo-700/50">
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-amber-400 text-indigo-950 font-black flex items-center justify-center shrink-0 shadow-sm">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                Module 5: AI Performance Analyzer
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-white">
              Latest Mock Test #6 Report Ready (Score: 156/250)
            </h4>
            <p className="text-xs text-indigo-200">
              Exam predictor, 48-hour action plan & DU college cutoffs generated.
            </p>
          </div>
        </div>

        <Link href="/analysis/demo-mock-session-6" className="w-full sm:w-auto">
          <Button
            size="sm"
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold gap-1.5 text-xs shadow-sm h-9"
          >
            <span>View Full Analysis</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {/* Smart Alerts */}
      {data.recent_alerts && data.recent_alerts.length > 0 && (
        <AlertBanner alerts={data.recent_alerts} />
      )}

      {/* Top Section: Overall Health Score Circular Gauge */}
      <OverallHealthScore
        score={data.overall_score}
        level={data.overall_level}
        criticalCount={data.topics_by_level.critical.length}
        weakCount={data.topics_by_level.weak.length}
        averageCount={data.topics_by_level.average.length}
        strongCount={data.topics_by_level.strong.length + data.topics_by_level.excellent.length}
        untestedCount={data.topics_by_level.untested.length}
      />

      {/* AI Recommendations Box */}
      {data.top_3_recommendations && data.top_3_recommendations.length > 0 && (
        <RecommendationBox
          recommendations={data.top_3_recommendations}
          totalAttempts={totalAttempts}
        />
      )}

      {/* Subject Filter Pills */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Topic-Level Diagnostics
          </h2>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["all", "Political Science", "History", "Economics", "English"].map((subj) => (
            <button
              key={subj}
              type="button"
              onClick={() => setSelectedSubject(subj)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap min-h-[38px] ${
                selectedSubject.toLowerCase() === subj.toLowerCase()
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {subj === "all" ? "All Subjects" : subj}
            </button>
          ))}
        </div>

        {/* Sectional Weakness Levels */}
        <WeaknessLevel
          critical={filteredCritical}
          weak={filteredWeak}
          average={filteredAverage}
          strong={filteredStrong}
          excellent={filteredExcellent}
          untested={filteredUntested}
        />
      </div>
    </div>
  );
}
