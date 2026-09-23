"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus, Award, Target } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

interface ScoreHistoryItem {
  test_number: number;
  test_date: string;
  raw_score: number;
  max_score: number;
  percentage: number;
  session_id?: string;
}

interface ScoreTrendProps {
  scoreTrend: "improving" | "declining" | "stable" | "first_test";
  scoreVsLastTest: number;
  bestScoreEver: number;
  averageScoreLast5: number;
  history?: ScoreHistoryItem[];
  targetScore?: number;
}

export function ScoreTrend({
  scoreTrend,
  scoreVsLastTest,
  bestScoreEver,
  averageScoreLast5,
  history = [],
  targetScore = 180,
}: ScoreTrendProps) {
  // Format history for recharts
  const chartData = history.map((item) => ({
    name: `Mock #${item.test_number}`,
    score: item.raw_score,
    maxScore: item.max_score,
    percentage: item.percentage,
    date: item.test_date ? new Date(item.test_date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "",
  }));

  const getTrendBadge = () => {
    switch (scoreTrend) {
      case "improving":
        return {
          icon: <TrendingUp className="h-4 w-4 text-emerald-600" />,
          label: "Improving Trajectory ",
          className: "bg-emerald-50 text-emerald-800 border-emerald-200",
        };
      case "declining":
        return {
          icon: <TrendingDown className="h-4 w-4 text-rose-600" />,
          label: "Dip Detected ",
          className: "bg-rose-50 text-rose-800 border-rose-200",
        };
      case "stable":
        return {
          icon: <Minus className="h-4 w-4 text-blue-600" />,
          label: "Consistent Performance ",
          className: "bg-blue-50 text-blue-800 border-blue-200",
        };
      case "first_test":
      default:
        return {
          icon: <Award className="h-4 w-4 text-indigo-600" />,
          label: "Baseline Established ",
          className: "bg-indigo-50 text-indigo-800 border-indigo-200",
        };
    }
  };

  const trendBadge = getTrendBadge();

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            Historical Score Trajectory
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Track your score progression across mock tests over time
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${trendBadge.className}`}
        >
          {trendBadge.icon}
          {trendBadge.label}
        </span>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Best Score Ever
          </span>
          <div className="text-2xl font-black text-indigo-600 mt-1">
            {bestScoreEver} <span className="text-xs text-slate-400 font-normal">pts</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">All-time peak</span>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Avg Last 5 Mocks
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {averageScoreLast5} <span className="text-xs text-slate-400 font-normal">pts</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">Weighted average</span>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Change vs Last Test
          </span>
          <div
            className={`text-2xl font-black mt-1 ${
              scoreVsLastTest > 0
                ? "text-emerald-600"
                : scoreVsLastTest < 0
                ? "text-rose-600"
                : "text-slate-700"
            }`}
          >
            {scoreVsLastTest > 0 ? `+${scoreVsLastTest}` : scoreVsLastTest} <span className="text-xs font-normal">pts</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {scoreVsLastTest >= 0 ? "Progress made" : "Score variation"}
          </span>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            CUET Target Benchmark
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {targetScore} <span className="text-xs text-slate-400 font-normal">pts</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">Top college cutoff zone</span>
        </div>
      </div>

      {/* Recharts Line Chart */}
      {chartData.length > 1 ? (
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Mock Test Performance Curve
            </span>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                Score Achieved
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Target Line ({targetScore})
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip
                  formatter={(value: any) => [`${value} marks`, "Score"]}
                  labelFormatter={(label: any) => `${label}`}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "12px",
                    color: "#fff",
                    border: "none",
                    fontSize: "12px",
                  }}
                />
                <ReferenceLine
                  y={targetScore}
                  stroke="#f59e0b"
                  strokeDasharray="4 4"
                  label={{
                    value: "Target",
                    fill: "#f59e0b",
                    fontSize: 11,
                    position: "top",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#4f46e5", stroke: "#ffffff", strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: "#4338ca" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl p-6 text-center text-slate-500 text-sm font-medium border border-slate-200">
          This is your first recorded mock test in this session. Take more mock tests to unlock your historical trajectory chart!
        </div>
      )}
    </div>
  );
}
