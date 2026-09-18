"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { TrendingUp, TrendingDown, Minus, Share2, Award, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ScoreHeroProps {
  rawScore: number;
  maxScore: number;
  percentage: number;
  scoreVsLast: number;
  bestEver: number;
  avgLast5: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  trend: "improving" | "declining" | "stable" | "first_test";
  testNumber?: number;
}

export function ScoreHero({
  rawScore,
  maxScore,
  percentage,
  scoreVsLast,
  bestEver,
  avgLast5,
  correctCount,
  wrongCount,
  skippedCount,
  trend,
  testNumber = 6,
}: ScoreHeroProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [copied, setCopied] = useState(false);

  const isPersonalBest = rawScore >= bestEver && bestEver > 0;
  const isImproved = scoreVsLast > 0;
  const isFirstTest = trend === "first_test";

  useEffect(() => {
    // Score count-up animation
    let current = 0;
    const step = Math.max(1, Math.ceil(rawScore / 35));
    const timer = setInterval(() => {
      current += step;
      if (current >= rawScore) {
        setAnimatedScore(rawScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 25);

    // Fire celebratory confetti if improved or personal best
    if (isImproved || isPersonalBest) {
      setTimeout(() => {
        try {
          confetti({
            particleCount: 75,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {}
      }, 500);
    }

    return () => clearInterval(timer);
  }, [rawScore, isImproved, isPersonalBest]);

  const handleShare = async () => {
    const text = `🎯 I just scored ${rawScore}/${maxScore} (${percentage}%) in CUET Mock Test #${testNumber}! Targeting Delhi University. Check out my performance report 🚀`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `CUET Mock #${testNumber} Result`, text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm text-center space-y-6">
      {/* Background Accent Gradients */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Message */}
      <div className="flex flex-col items-center justify-center gap-2">
        {isPersonalBest ? (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full gap-1.5 shadow-xs">
            🎉 New Personal Best Score!
          </Badge>
        ) : isImproved ? (
          <Badge className="bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800 text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full gap-1.5">
            📈 Score Improved by +{scoreVsLast} Marks!
          </Badge>
        ) : isFirstTest ? (
          <Badge className="bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800 text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full gap-1.5">
            🎓 First Full Mock Test Complete!
          </Badge>
        ) : (
          <Badge className="bg-amber-500/15 text-amber-800 dark:text-amber-400 border-amber-300 dark:border-amber-800 text-xs font-bold px-3.5 py-1 rounded-full gap-1.5">
            ⚠️ {Math.abs(scoreVsLast)} Marks Below Last Mock — Let&apos;s Review
          </Badge>
        )}

        <h3 className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          Mock Test #{testNumber} • Official CUET UG 2026 Marking (+5 / -1)
        </h3>
      </div>

      {/* Big Animated Score Display */}
      <div className="space-y-1">
        <div className="inline-flex items-baseline justify-center gap-2">
          <span className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
            {animatedScore}
          </span>
          <span className="text-xl sm:text-3xl font-bold text-slate-400">
            /{maxScore}
          </span>
        </div>
        <p className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400">
          {percentage}% Overall Percentage
        </p>
      </div>

      {/* Comparisons Row: Change vs last | Best | Avg */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 border-y border-slate-100 dark:border-slate-800/80 py-3 max-w-lg mx-auto">
        {!isFirstTest && (
          <div className="flex items-center gap-1.5">
            {scoreVsLast > 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            ) : scoreVsLast < 0 ? (
              <TrendingDown className="w-4 h-4 text-rose-500" />
            ) : (
              <Minus className="w-4 h-4 text-slate-400" />
            )}
            <span
              className={
                scoreVsLast > 0
                  ? "text-emerald-600 dark:text-emerald-400 font-bold"
                  : scoreVsLast < 0
                  ? "text-rose-600 dark:text-rose-400 font-bold"
                  : ""
              }
            >
              {scoreVsLast > 0 ? `+${scoreVsLast}` : scoreVsLast} from last test
            </span>
          </div>
        )}

        <div>
          <span className="text-slate-400">Best: </span>
          <span className="font-bold text-slate-900 dark:text-white">{bestEver}</span>
        </div>

        <div>
          <span className="text-slate-400">5-Test Avg: </span>
          <span className="font-bold text-slate-900 dark:text-white">{avgLast5}</span>
        </div>
      </div>

      {/* Counts: Correct / Wrong / Skipped */}
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs sm:text-sm font-bold">
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300">
          <div className="flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{correctCount} Correct</span>
          </div>
          <span className="text-[11px] font-normal text-emerald-600 dark:text-emerald-400 block mt-0.5">
            +{correctCount * 5} marks
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-300">
          <div className="flex items-center justify-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>{wrongCount} Wrong</span>
          </div>
          <span className="text-[11px] font-normal text-rose-600 dark:text-rose-400 block mt-0.5">
            -{wrongCount * 1} penalty
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
          <div className="flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{skippedCount} Skipped</span>
          </div>
          <span className="text-[11px] font-normal text-slate-500 block mt-0.5">
            0 marks
          </span>
        </div>
      </div>

      {/* Share Action */}
      <div className="pt-1">
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="gap-1.5 rounded-xl text-xs font-semibold"
        >
          <Share2 className="w-3.5 h-3.5 text-slate-500" />
          <span>{copied ? "Score Link Copied!" : "Share My Score"}</span>
        </Button>
      </div>
    </div>
  );
}
