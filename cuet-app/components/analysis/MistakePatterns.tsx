"use client";

import React from "react";
import { MistakePatterns as MistakePatternsType } from "@/lib/types";
import { AlertCircle, Clock, Zap, Repeat, HelpCircle, ShieldAlert, Sparkles } from "lucide-react";
import Link from "next/link";

interface MistakePatternsProps {
  patterns: MistakePatternsType;
}

export function MistakePatterns({ patterns }: MistakePatternsProps) {
  const totalIdentifiedMistakes =
    (patterns.careless_mistakes || 0) +
    (patterns.conceptual_gaps || 0) +
    (patterns.time_pressure_mistakes || 0) +
    (patterns.repeated_mistakes || 0);

  const patternCards = [
    {
      title: "Careless Mistakes",
      count: patterns.careless_mistakes || 0,
      icon: <AlertCircle className="h-5 w-5 text-amber-600" />,
      tag: "Normal Pace, Wrong Answer",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      description:
        "Questions answered at your standard pace but marked with incorrect options. Often caused by misreading 'NOT', calculation slips, or option rushing.",
      advice: "Double-check negative statements ('Which of these is NOT true?') before locking in.",
    },
    {
      title: "Conceptual Gaps",
      count: patterns.conceptual_gaps || 0,
      icon: <HelpCircle className="h-5 w-5 text-rose-600" />,
      tag: "Deep Revision Needed",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      description:
        "Questions missed due to incomplete understanding of core NCERT definitions, principles, or historical sequences.",
      advice: "Review NCERT concept notes and solve 10 targeted MCQs via AI Practice.",
    },
    {
      title: "Time Pressure Traps",
      count: patterns.time_pressure_mistakes || 0,
      icon: <Clock className="h-5 w-5 text-purple-600" />,
      tag: "Spent > 1.8x Avg Time",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      description:
        "Questions where you spent excessive time (often >80s) wrestling with the question and still answered incorrectly.",
      advice: "Never let one question steal time from 3 easy questions waiting at the end of the paper.",
    },
    {
      title: "Repeated Mistakes",
      count: patterns.repeated_mistakes || 0,
      icon: <Repeat className="h-5 w-5 text-red-600" />,
      tag: "Missed in Past Tests Too",
      badgeColor: "bg-red-100 text-red-800 border-red-200",
      description:
        "Topics you have answered incorrectly in previous mock tests. These persist unless actively remediated.",
      advice: "Prioritize these first in your daily study planner to stop recurring negative marks.",
    },
    {
      title: "Lucky Guesses",
      count: patterns.lucky_guesses || 0,
      icon: <Zap className="h-5 w-5 text-emerald-600" />,
      tag: "Solved in < 10 seconds",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description:
        "Questions marked correct in under 10 seconds. Unless you immediately knew it from memory, this might be a guess that won't always work on exam day.",
      advice: "Review the explanations for these to make sure your conceptual logic was 100% sound.",
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-indigo-600" />
            AI Mistake Pattern Diagnostics
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Behavioral and cognitive analysis of where marks were lost
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {totalIdentifiedMistakes} Root-Cause Traps Identified
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patternCards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition-all ${
              card.count > 0
                ? "bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:shadow-sm"
                : "bg-slate-50/20 border-slate-100 opacity-70"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{card.title}</h4>
                    <span className="text-[11px] font-semibold text-slate-400 block">
                      {card.tag}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${card.badgeColor}`}
                >
                  {card.count}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {card.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 bg-white/70 -mx-5 -mb-5 p-4 rounded-b-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                AI Fix:
              </span>
              <p className="text-xs font-semibold text-slate-800 leading-snug">
                {card.advice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
