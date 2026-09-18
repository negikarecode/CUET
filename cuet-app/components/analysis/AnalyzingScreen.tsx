"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, Loader2, Award } from "lucide-react";

interface AnalyzingScreenProps {
  sessionId?: string;
  testNumber?: number;
  onComplete?: () => void;
}

const STEPS = [
  { text: "Calculating your CUET score (+5 / -1 marking)", time: 1200 },
  { text: "Analyzing all 50 question answers & time stamps", time: 2400 },
  { text: "Detecting mistake patterns (careless vs conceptual)", time: 3600 },
  { text: "Predicting CUET rank & target college cutoffs", time: 5000 },
  { text: "Generating personalized AI coach roadmap...", time: 6500 },
];

const FUN_FACTS = [
  "💡 Did you know? Students who review mock test wrong answers improve 20% faster!",
  "🎯 Speed Tip: Skipping an unsure question in 40s saves you 1 full negative penalty mark.",
  "🏛️ Fun Fact: Top Delhi University North Campus cutoffs typically range between 170-195/200.",
  "📈 Consistency Wins: 5 mocks with deep analysis beat 20 mocks with no review.",
];

export function AnalyzingScreen({ sessionId, testNumber, onComplete }: AnalyzingScreenProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [factIndex, setFactIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Step progression
    STEPS.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, index]);
        setProgress(Math.min(95, Math.round(((index + 1) / STEPS.length) * 100)));
      }, step.time);
      return () => clearTimeout(timeout);
    });

    // Rotate fun facts
    const factInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
    }, 3000);

    return () => clearInterval(factInterval);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6">
        {/* Animated Robot / Analyzer Icon */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-500/30 rounded-3xl animate-ping" />
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-10 h-10 animate-spin" style={{ animationDuration: "6s" }} />
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Analyzing Your Mock Test...
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Running 15+ diagnostic models to uncover your score bottlenecks.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
            <span>Diagnostic Progress</span>
            <span className="text-indigo-600 dark:text-indigo-400">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Items List */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 text-left space-y-3">
          {STEPS.map((step, idx) => {
            const isDone = completedSteps.includes(idx);
            const isCurrent = completedSteps.length === idx;

            return (
              <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex-shrink-0" />
                )}

                <span
                  className={
                    isDone
                      ? "text-slate-900 dark:text-white font-medium"
                      : isCurrent
                      ? "text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-slate-400 dark:text-slate-600"
                  }
                >
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Fun Fact */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-900 dark:text-amber-300 transition-all duration-300">
          {FUN_FACTS[factIndex]}
        </div>
      </div>
    </div>
  );
}
