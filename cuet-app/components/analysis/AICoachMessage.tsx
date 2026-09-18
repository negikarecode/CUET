"use client";

import React from "react";
import Link from "next/link";
import { Bot, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Quote, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AICoachMessageProps {
  coachingMessage: string;
  motivationalQuote?: string;
  examStrategy?: string;
  strengths: string[];
  improvements: string[];
  primaryWeakTopicId?: number;
}

export function AICoachMessage({
  coachingMessage,
  motivationalQuote,
  examStrategy,
  strengths = [],
  improvements = [],
  primaryWeakTopicId,
}: AICoachMessageProps) {
  const chatUrl = primaryWeakTopicId
    ? `/chat?topic=${primaryWeakTopicId}`
    : "/chat";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl p-6 sm:p-8">
      {/* Background glowing orbs */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 space-y-6">
        {/* Header with Avatar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-700/50 pb-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-indigo-950 shadow-md">
              <Bot className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-white sm:text-xl">
                  CUETBot Coach Debrief
                </h3>
                <span className="rounded-full bg-indigo-500/30 px-2.5 py-0.5 text-xs font-semibold text-indigo-200 border border-indigo-400/20">
                  AI Mentor
                </span>
              </div>
              <p className="text-xs text-indigo-200">
                Personalized post-mock guidance generated specifically for your attempt
              </p>
            </div>
          </div>

          <Link href={chatUrl}>
            <Button
              size="sm"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md gap-1.5 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask CUETBot about this mock</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* AI Coaching Main Message */}
        <div className="rounded-2xl bg-indigo-950/40 p-5 backdrop-blur-sm border border-indigo-700/40">
          <p className="text-sm sm:text-base leading-relaxed text-indigo-100 font-medium">
            {coachingMessage}
          </p>
        </div>

        {/* Motivational Quote */}
        {motivationalQuote && (
          <div className="flex items-start gap-3 rounded-2xl bg-amber-400/10 p-4 border border-amber-400/20 text-amber-200">
            <Quote className="h-5 w-5 shrink-0 text-amber-300 mt-0.5" />
            <p className="text-xs sm:text-sm font-semibold italic">
              &ldquo;{motivationalQuote}&rdquo;
            </p>
          </div>
        )}

        {/* Strengths and Improvements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/30 p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-emerald-200 uppercase tracking-wider">
                What Went Right (Strengths)
              </h4>
            </div>
            {strengths.length > 0 ? (
              <ul className="space-y-2">
                {strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-emerald-100 font-medium">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-emerald-200/70">Solid attempt pacing and strong question discipline.</p>
            )}
          </div>

          {/* Improvements */}
          <div className="rounded-2xl bg-amber-950/40 border border-amber-500/30 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <h4 className="text-sm font-bold text-amber-200 uppercase tracking-wider">
                High-Yield Fixes (Improvement Areas)
              </h4>
            </div>
            {improvements.length > 0 ? (
              <ul className="space-y-2">
                {improvements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-amber-100 font-medium">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-amber-200/70">Focus on eliminating careless skips and review long-solve questions.</p>
            )}
          </div>
        </div>

        {/* Exam Strategy Section */}
        {examStrategy && (
          <div className="rounded-2xl bg-indigo-950/50 border border-indigo-700/50 p-4 flex items-start gap-3">
            <div className="rounded-xl bg-indigo-800/80 p-2 text-indigo-300 shrink-0">
              <Compass className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Recommended Exam Strategy for Next Mock
              </h4>
              <p className="text-xs sm:text-sm text-indigo-200 font-medium leading-relaxed">
                {examStrategy}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
