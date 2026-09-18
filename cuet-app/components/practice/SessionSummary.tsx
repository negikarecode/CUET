"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Trophy, RefreshCw, LayoutDashboard, Clock, Target, CheckCircle2, XCircle } from "lucide-react";
import { WeaknessScore } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/weakness/ProgressBar";

interface SessionSummaryProps {
  topicName: string;
  topicId: number;
  totalAnswered: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  totalTimeSeconds: number;
  updatedWeaknessScore?: WeaknessScore | null;
  onPracticeAgain: () => void;
}

export function SessionSummary({
  topicName,
  topicId,
  totalAnswered,
  correctCount,
  wrongCount,
  skippedCount,
  totalTimeSeconds,
  updatedWeaknessScore,
  onPracticeAgain,
}: SessionSummaryProps) {
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const avgSeconds = totalAnswered > 0 ? Math.round(totalTimeSeconds / totalAnswered) : 0;
  const totalMinutes = Math.max(1, Math.round(totalTimeSeconds / 60));

  useEffect(() => {
    if (accuracy >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback if canvas is not supported in test env
      }
    }
  }, [accuracy]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6 text-center animate-in fade-in duration-300">
      {/* Trophy Badge */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-lg">
        <Trophy className="w-10 h-10" />
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Session Completed! 🎉
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mt-1 font-medium">
          Practice report for <span className="font-bold text-slate-800">{topicName}</span>
        </p>
      </div>

      {/* Accuracy & Score Highlight Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700">
        <div className="p-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Accuracy</span>
          <span className="text-2xl sm:text-3xl font-black text-indigo-600 mt-0.5 block">{accuracy}%</span>
          <span className="text-xs text-slate-500 font-medium">
            {correctCount}/{totalAnswered} correct
          </span>
        </div>

        <div className="p-3 border-y sm:border-y-0 sm:border-x border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pace</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5 block">{avgSeconds}s</span>
          <span className="text-xs text-slate-500 font-medium">
            Avg per question
          </span>
        </div>

        <div className="p-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Time Invested</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5 block">~{totalMinutes}m</span>
          <span className="text-xs text-slate-500 font-medium">
            {totalTimeSeconds}s total session
          </span>
        </div>
      </div>

      {/* Breakdown counters */}
      <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-semibold">
        <span className="flex items-center gap-1.5 text-green-700">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          {correctCount} Correct
        </span>
        <span className="flex items-center gap-1.5 text-red-600">
          <XCircle className="w-4 h-4 text-red-500" />
          {wrongCount} Wrong
        </span>
        <span className="flex items-center gap-1.5 text-slate-500">
          ⏭️ {skippedCount} Skipped
        </span>
      </div>

      {/* Updated Weakness Engine Card */}
      {updatedWeaknessScore && (
        <div className="p-5 rounded-2xl border border-indigo-100 bg-indigo-50/50 text-left space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-600" />
              Real-time Weakness Engine Calibration
            </h4>
            <Badge variant={updatedWeaknessScore.weakness_level as any} className="uppercase font-bold text-[10px]">
              {updatedWeaknessScore.weakness_level}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-indigo-900">
              <span>Updated Topic Mastery Score</span>
              <span>{Math.round(updatedWeaknessScore.final_weakness_score)} / 100</span>
            </div>
            <ProgressBar
              value={updatedWeaknessScore.final_weakness_score}
              level={updatedWeaknessScore.weakness_level}
              height="md"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
            <div className="bg-white/80 p-2 rounded-lg border border-indigo-100/50">
              <span className="text-slate-400 block text-[10px] font-bold">Accuracy</span>
              <span className="font-bold text-slate-900">{Math.round(updatedWeaknessScore.accuracy_score)}%</span>
            </div>
            <div className="bg-white/80 p-2 rounded-lg border border-indigo-100/50">
              <span className="text-slate-400 block text-[10px] font-bold">Speed</span>
              <span className="font-bold text-slate-900">{Math.round(updatedWeaknessScore.speed_score)}%</span>
            </div>
            <div className="bg-white/80 p-2 rounded-lg border border-indigo-100/50">
              <span className="text-slate-400 block text-[10px] font-bold">Consistency</span>
              <span className="font-bold text-slate-900">{Math.round(updatedWeaknessScore.consistency_score)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Button
          onClick={onPracticeAgain}
          variant="outline"
          size="lg"
          className="w-full sm:w-auto font-bold gap-2 text-sm min-h-[48px]"
        >
          <RefreshCw className="w-4 h-4" />
          Practice Again
        </Button>

        <Link href="/weakness" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto font-bold gap-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white min-h-[48px] px-6 shadow-md"
          >
            <LayoutDashboard className="w-4 h-4" />
            Back to Weakness Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
