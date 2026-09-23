"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Clock, AlertTriangle, ArrowRight, BookOpen, MessageSquare } from "lucide-react";
import { WeaknessScore } from "@/lib/types";
import { WEAKNESS_CONFIG } from "@/lib/weakness-engine";
import { ProgressBar } from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TopicCardProps {
  score: WeaknessScore;
  isScheduled?: boolean;
  scheduledLabel?: string;
}

export function TopicCard({ score, isScheduled, scheduledLabel }: TopicCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const level = score.weakness_level || "untested";
  const config = WEAKNESS_CONFIG[level] || WEAKNESS_CONFIG.untested;
  const topicName = score.topic?.topic_name || "Topic Analysis";
  const subjectName = score.subject?.name || "CUET Subject";
  const finalScore = Math.round(score.final_weakness_score || 0);

  // Speed evaluation
  const avgTime = Math.round(score.avg_time_seconds || 0);
  const isTimeSink = avgTime > 45; // 45s is CUET target

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-4 sm:p-5">
        {/* Top Header: Topic Name & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-start gap-2">
            <span className="text-xl select-none" aria-hidden="true">
              {config.emoji}
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {topicName}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="inline-flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  <BookOpen className="w-3 h-3 mr-1 text-slate-400" />
                  {subjectName}
                </span>
                {score.chapter && (
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    Ch. {score.chapter.chapter_number}: {score.chapter.chapter_name}
                  </span>
                )}
                {(isScheduled || level === "critical" || level === "weak") && (
                  <Link
                    href="/planner"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md hover:bg-indigo-100 transition-colors"
                  >
                    <span></span>
                    <span>{scheduledLabel || (level === "critical" ? "Priority in Plan" : "In Active Plan")}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 mt-2 sm:mt-0">
            <Badge variant={level as any}>
              {config.label}
            </Badge>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                {finalScore}
              </span>
              <span className="text-xs text-slate-400">/100</span>
            </div>
          </div>
        </div>

        {/* Main Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1">
            <span>Overall Topic Mastery</span>
            <span className={config.textColor}>{config.message}</span>
          </div>
          <ProgressBar value={finalScore} level={level} height="md" />
        </div>

        {/* Three Sub-Bars: Accuracy, Speed, Consistency */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 pt-3 border-t border-slate-100">
          <div>
            <div className="flex justify-between items-center text-[11px] font-medium text-slate-500 mb-1">
              <span>Accuracy (60%)</span>
              <span className="font-bold text-slate-700">{Math.round(score.accuracy_score || 0)}%</span>
            </div>
            <ProgressBar value={score.accuracy_score || 0} level={score.accuracy_score < 50 ? "critical" : "strong"} height="sm" />
          </div>

          <div>
            <div className="flex justify-between items-center text-[11px] font-medium text-slate-500 mb-1">
              <span>Speed (25%)</span>
              <span className="font-bold text-slate-700">{Math.round(score.speed_score || 0)}%</span>
            </div>
            <ProgressBar value={score.speed_score || 0} level={score.speed_score < 50 ? "weak" : "strong"} height="sm" />
          </div>

          <div>
            <div className="flex justify-between items-center text-[11px] font-medium text-slate-500 mb-1">
              <span>Consistency (15%)</span>
              <span className="font-bold text-slate-700">{Math.round(score.consistency_score || 0)}%</span>
            </div>
            <ProgressBar value={score.consistency_score || 0} level={score.consistency_score < 50 ? "weak" : "strong"} height="sm" />
          </div>
        </div>

        {/* Stats Row & Avg Time */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-emerald-700 font-medium">{score.correct_count} correct</span>
            <span className="text-red-600 font-medium">{score.wrong_count} wrong</span>
            <span className="text-slate-500 font-medium">{score.skipped_count} skipped</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className={isTimeSink ? "text-red-600 font-semibold" : "text-slate-600"}>
              Avg: {avgTime}s {isTimeSink && <AlertTriangle className="w-3.5 h-3.5 inline text-red-500 ml-0.5" />}
            </span>
          </div>
        </div>

        {/* Action Row & Expand toggle */}
        <div className="flex items-center justify-between gap-3 mt-4 pt-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors min-h-[44px] sm:min-h-0"
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" /> Less Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> Deep Breakdown
              </>
            )}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link href={`/chat?topic=${score.topic_id}&subject=${score.subject_id}`} className="w-full sm:w-auto">
              <Button
                size="sm"
                variant="outline"
                className="w-full sm:w-auto font-semibold gap-1.5 min-h-[44px] border-indigo-200 hover:bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:hover:bg-indigo-950/60 dark:text-indigo-300"
                aria-label={`Ask doubt about ${topicName} with CUETBot`}
              >
                <MessageSquare className="w-4 h-4 text-indigo-500" />
                Ask Doubt
              </Button>
            </Link>

            <Link href={`/practice/ai/${score.topic_id}?weakness_level=${level}`} className="w-full sm:w-auto">
              <Button
                size="sm"
                variant={level === "critical" ? "destructive" : "default"}
                className="w-full sm:w-auto font-semibold gap-1.5 min-h-[44px]"
                aria-label={`Practice ${topicName} now with AI`}
              >
                Practice Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Collapsible Deep Breakdown */}
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-2 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Attempts</span>
                <span className="text-sm font-bold text-slate-900">{score.total_attempts}</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Accuracy Weight</span>
                <span className="text-sm font-bold text-indigo-600">{(score.accuracy_score * 0.6).toFixed(1)} / 60</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Speed Weight</span>
                <span className="text-sm font-bold text-indigo-600">{(score.speed_score * 0.25).toFixed(1)} / 25</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Consistency Weight</span>
                <span className="text-sm font-bold text-indigo-600">{(score.consistency_score * 0.15).toFixed(1)} / 15</span>
              </div>
            </div>
            <p className="text-slate-500 italic text-center pt-1">
              Final Weakness Score = (Accuracy × 60%) + (Speed × 25%) + (Consistency × 15%)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
