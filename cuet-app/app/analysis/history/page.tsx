"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MockTestSession, ScoreHistoryRecord } from "@/lib/types";
import {
  History,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
  Download,
  Calendar,
  Layers,
  Sparkles,
  ArrowLeft,
  Target,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function MockHistoryPage() {
  const [sessions, setSessions] = useState<MockTestSession[]>([]);
  const [historyRecords, setHistoryRecords] = useState<ScoreHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [compareId1, setCompareId1] = useState<string>("");
  const [compareId2, setCompareId2] = useState<string>("");

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        const res = await fetch("/api/analysis/history");
        const data = await res.json();
        if (data.success) {
          setSessions(data.sessions || []);
          setHistoryRecords(data.history || []);
          if (data.sessions && data.sessions.length >= 2) {
            setCompareId1(data.sessions[0].id);
            setCompareId2(data.sessions[1].id);
          }
        }
      } catch (err) {
        console.error("Failed to load mock history:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const chartData = [...sessions]
    .sort((a, b) => a.test_number - b.test_number)
    .map((s) => ({
      name: `Mock #${s.test_number}`,
      score: s.raw_score,
      maxScore: s.max_possible_score,
      percentage: s.percentage_score,
    }));

  const bestScore = sessions.reduce((max, s) => Math.max(max, s.raw_score), 0);
  const avgScore =
    sessions.length > 0
      ? Math.round(sessions.reduce((sum, s) => sum + s.raw_score, 0) / sessions.length)
      : 0;

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-slate-500 hover:text-slate-900 rounded-xl">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <History className="h-6 w-6 text-indigo-600" />
                Mock Test History & Trajectory
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Comprehensive archives of all full-length and subject mock attempts
              </p>
            </div>
          </div>

          <Link href="/practice">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm gap-2">
              <Sparkles className="h-4 w-4 text-amber-300" />
              Start New Test
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* KPI Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Tests Completed
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {sessions.length}
            </div>
            <span className="text-xs text-slate-500 font-medium">Full and partial tests</span>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Best Raw Score
            </span>
            <div className="text-3xl font-black text-indigo-600 mt-1">
              {bestScore} <span className="text-xs text-slate-400 font-normal">pts</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">Peak CUET benchmark</span>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Average Score
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {avgScore} <span className="text-xs text-slate-400 font-normal">pts</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">Across all attempts</span>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              CUET Target
            </span>
            <div className="text-3xl font-black text-amber-500 mt-1">
              180+ <span className="text-xs text-slate-400 font-normal">pts</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">Tier-1 DU cutoff aim</span>
          </div>
        </div>

        {/* Historical Progression Chart */}
        {chartData.length > 1 && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Score Progression Curve
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Watch your CUET marks evolve across every mock attempt
                </p>
              </div>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip
                    formatter={(value: any) => [`${value} marks`, "Raw Score"]}
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#4f46e5", stroke: "#fff", strokeWidth: 2 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Mock Tests List */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-600" />
                All Completed Mock Tests
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Click on any test to explore the deep AI diagnostics and 4-page report
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-500 font-medium text-sm">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent mb-2" />
              <p>Loading mock history...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No mock tests completed yet. Start your first mock to see your report!
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((s) => {
                const dateStr = s.completed_at
                  ? new Date(s.completed_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Completed";

                const acc = s.attempted_count > 0
                  ? Math.round((s.correct_count / s.attempted_count) * 100)
                  : 0;

                return (
                  <div
                    key={s.id}
                    className="rounded-2xl border border-slate-200 hover:border-indigo-300 p-4 sm:p-5 transition-all bg-slate-50/40 hover:bg-white hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-black flex items-center justify-center text-sm shrink-0">
                        #{s.test_number}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-base">
                            {s.session_name || `CUET Mock Test #${s.test_number}`}
                          </h4>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-800">
                            {s.test_type.replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          {dateStr} • {s.total_questions} Questions • {s.correct_count} Correct • {s.wrong_count} Wrong
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-left sm:text-right">
                        <div className="text-lg font-black text-slate-900">
                          {s.raw_score} <span className="text-xs text-slate-400 font-normal">/ {s.max_possible_score}</span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600">
                          {acc}% Accuracy
                        </span>
                      </div>

                      <Link href={`/analysis/${s.id}`}>
                        <Button
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-1.5 h-9 shadow-sm"
                        >
                          <span>View Report</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
