"use client";

import React from "react";
import { Clock, Zap, AlertCircle, Timer, Award, Lightbulb } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TimeAnalysisProps {
  avgTimePerQuestion: number;
  avgTimeCorrect: number;
  avgTimeWrong: number;
  avgTimeSkipped?: number;
  fastestQuestionSeconds: number;
  slowestQuestionSeconds: number;
  timeWastedSeconds: number;
  totalTimeSeconds: number;
}

export function TimeAnalysis({
  avgTimePerQuestion,
  avgTimeCorrect,
  avgTimeWrong,
  avgTimeSkipped = 0,
  fastestQuestionSeconds,
  slowestQuestionSeconds,
  timeWastedSeconds,
  totalTimeSeconds,
}: TimeAnalysisProps) {
  const timeWastedMinutes = Math.round(timeWastedSeconds / 60);
  const totalMinutes = Math.round(totalTimeSeconds / 60);

  const chartData = [
    { name: "Target Pace", seconds: 45, color: "#94a3b8" },
    { name: "Your Avg", seconds: avgTimePerQuestion, color: "#6366f1" },
    { name: "Correct", seconds: avgTimeCorrect, color: "#10b981" },
    { name: "Incorrect", seconds: avgTimeWrong, color: "#f43f5e" },
    ...(avgTimeSkipped > 0 ? [{ name: "Skipped", seconds: avgTimeSkipped, color: "#cbd5e1" }] : []),
  ];

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-600" />
            Time Management & Speed Analysis
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            How efficiently you spent your {totalMinutes} minutes during the test
          </p>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-indigo-50/60 border border-indigo-100 p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">
            <Timer className="h-4 w-4 text-indigo-600" />
            Average Pace
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {avgTimePerQuestion}s
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Target: 45s - 55s per MCQ
          </div>
        </div>

        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
            <Award className="h-4 w-4 text-emerald-600" />
            On Correct MCQs
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">
            {avgTimeCorrect}s
          </div>
          <div className="text-xs text-emerald-600/80 font-medium mt-1">
            Fast, confident decisions
          </div>
        </div>

        <div className="rounded-2xl bg-rose-50/60 border border-rose-100 p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase tracking-wider mb-1">
            <AlertCircle className="h-4 w-4 text-rose-600" />
            On Wrong MCQs
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-700">
            {avgTimeWrong}s
          </div>
          <div className="text-xs text-rose-600/80 font-medium mt-1">
            {avgTimeWrong > avgTimeCorrect ? "Overthought wrong answers" : "Careless rush"}
          </div>
        </div>

        <div className="rounded-2xl bg-amber-50/60 border border-amber-100 p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
            <Zap className="h-4 w-4 text-amber-600" />
            Fastest / Slowest
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {fastestQuestionSeconds}s <span className="text-xs text-slate-400 font-normal">/</span> {slowestQuestionSeconds}s
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Range of question duration
          </div>
        </div>
      </div>

      {/* Time Comparison Chart & Time Wasted Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Recharts Bar Chart */}
        <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Pace Comparison (Seconds per Question)
          </h4>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} unit="s" />
                <Tooltip
                  formatter={(value: any) => [`${value} seconds`, "Time"]}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "12px",
                    color: "#fff",
                    border: "none",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="seconds" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Wasted & 60-Second Rule Callout */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                Time Lost on Missteps
              </span>
              <span className="text-xs font-black bg-rose-200/80 text-rose-900 px-2 py-0.5 rounded-full">
                Attention Needed
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-900">
              ~{timeWastedMinutes} minutes ({timeWastedSeconds}s)
            </div>
            <p className="text-xs text-rose-700 font-medium leading-relaxed">
              You spent over {timeWastedMinutes} minutes on questions that were either answered incorrectly or skipped. In CUET, preserving this time gives you an extra review pass.
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                Pro Strategy: The 60-Second Skip Rule
              </h5>
              <p className="text-xs text-indigo-900/80 font-medium leading-relaxed">
                If you cannot identify the formula or concept within 30-40 seconds, mark it and skip. Return to it in Round 2 when your confidence is high!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
