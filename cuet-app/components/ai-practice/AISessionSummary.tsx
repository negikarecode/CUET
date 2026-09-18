"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  TrendingUp,
  RefreshCw,
  LayoutDashboard,
  Share2,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AISessionSummaryProps {
  topicId: number;
  topicName: string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  initialScore: number;
  updatedScore: number;
  difficultyBreakdown: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  };
  onPracticeAgain: () => void;
  fromPlanner?: boolean;
}

export function AISessionSummary({
  topicId,
  topicName,
  totalQuestions,
  correctCount,
  wrongCount,
  initialScore,
  updatedScore,
  difficultyBreakdown,
  onPracticeAgain,
  fromPlanner,
}: AISessionSummaryProps) {
  const [copied, setCopied] = useState(false);

  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const scoreDiff = Math.round(updatedScore - initialScore);
  const cuetMarks = correctCount * 5 - wrongCount * 1;

  const handleShare = async () => {
    const text = `🎯 I scored ${correctCount}/${totalQuestions} (${percentage}%) in CUET AI Practice on "${topicName}"! My topic score improved from ${initialScore} → ${updatedScore} 🚀`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My CUET AI Practice Results",
          text,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto my-8 p-6 sm:p-10 bg-white border border-slate-200 rounded-3xl shadow-lg text-center space-y-8"
    >
      {/* Trophy Header */}
      <div>
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 mb-4">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs uppercase tracking-wider mb-2">
          Session Completed
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {percentage >= 70 ? "Outstanding Work!" : "Great Practice Run!"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          This session was dynamically adapted for your identified weak spots in{" "}
          <strong className="text-slate-800">{topicName}</strong>.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
          <span className="text-xs text-slate-400 font-bold uppercase block">Accuracy</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
            {correctCount}/{totalQuestions}
          </span>
          <span className="text-xs text-emerald-600 font-semibold block">{percentage}% Correct</span>
        </div>

        <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
          <span className="text-xs text-indigo-500 font-bold uppercase block">CUET Score</span>
          <span className="text-xl sm:text-2xl font-black text-indigo-950 mt-1 block">
            {cuetMarks > 0 ? `+${cuetMarks}` : cuetMarks}
          </span>
          <span className="text-xs text-indigo-600 font-semibold block">Marking: +5 / -1</span>
        </div>

        <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
          <span className="text-xs text-emerald-600 font-bold uppercase block">Topic Mastery</span>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-black text-emerald-900">{updatedScore}</span>
            {scoreDiff !== 0 && (
              <span className="text-xs font-bold text-emerald-600">
                ({scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff})
              </span>
            )}
          </div>
          <span className="text-xs text-emerald-700 font-semibold block">/ 100 Scale</span>
        </div>
      </div>

      {/* Before vs After Topic Score Progression */}
      <div className="p-5 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl text-white text-left flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-200 font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Weakness Progression</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            Your {topicName} Score: {initialScore} → {updatedScore} 📈
          </h3>
          <p className="text-xs text-indigo-300 mt-0.5">
            Module 1 calibrated your mastery using updated accuracy, speed, and streak metrics.
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-xl text-xs font-bold">
            {scoreDiff >= 0 ? `+${scoreDiff}% boost` : `${scoreDiff}%`}
          </span>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="space-y-2 text-left">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Breakdown by Difficulty
        </h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-xs font-bold text-emerald-700 block">Easy</span>
            <span className="text-sm font-black text-slate-800">
              {difficultyBreakdown.easy.correct} / {difficultyBreakdown.easy.total}
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-xs font-bold text-amber-700 block">Medium</span>
            <span className="text-sm font-black text-slate-800">
              {difficultyBreakdown.medium.correct} / {difficultyBreakdown.medium.total}
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-xs font-bold text-red-700 block">Hard</span>
            <span className="text-sm font-black text-slate-800">
              {difficultyBreakdown.hard.correct} / {difficultyBreakdown.hard.total}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        {fromPlanner ? (
          <Link href="/planner" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold gap-2 h-11 px-6 rounded-xl shadow-md"
            >
              <span>📅</span>
              <span>Return to Study Plan</span>
            </Button>
          </Link>
        ) : null}

        <Button
          onClick={onPracticeAgain}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 h-11 px-6 rounded-xl"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Practice More Questions</span>
        </Button>

        <Link href="/weakness" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="w-full sm:w-auto font-bold gap-2 h-11 px-6 rounded-xl border-slate-200"
          >
            <LayoutDashboard className="w-4 h-4 text-slate-600" />
            <span>Weakness Dashboard</span>
          </Button>
        </Link>

        <Button
          variant="ghost"
          onClick={handleShare}
          className="w-full sm:w-auto font-semibold gap-2 h-11 text-slate-600"
        >
          <Share2 className="w-4 h-4" />
          <span>{copied ? "Copied Link!" : "Share Score"}</span>
        </Button>
      </div>
    </motion.div>
  );
}
