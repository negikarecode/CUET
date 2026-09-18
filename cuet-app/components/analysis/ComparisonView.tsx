"use client";

import React, { useState } from "react";
import { MockTestAnalysis, MockTestSession } from "@/lib/types";
import { ArrowLeftRight, TrendingUp, TrendingDown, CheckCircle, Clock, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComparisonViewProps {
  currentSession: MockTestSession;
  currentAnalysis: MockTestAnalysis;
  allSessions?: MockTestSession[];
}

export function ComparisonView({
  currentSession,
  currentAnalysis,
  allSessions = [],
}: ComparisonViewProps) {
  // Available other sessions
  const otherSessions = allSessions.filter((s) => s.id !== currentSession.id);
  const [selectedOtherId, setSelectedOtherId] = useState<string>(
    otherSessions.length > 0 ? otherSessions[0].id : ""
  );
  const [otherAnalysis, setOtherAnalysis] = useState<MockTestAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComparison = async (otherId: string) => {
    setSelectedOtherId(otherId);
    if (!otherId) {
      setOtherAnalysis(null);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`/api/analysis/compare?id1=${currentSession.id}&id2=${otherId}`);
      const data = await res.json();
      if (data.success && data.test2?.analysis) {
        setOtherAnalysis(data.test2.analysis);
      }
    } catch (err) {
      console.error("Comparison fetch failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedOtherSession = otherSessions.find((s) => s.id === selectedOtherId);

  // If no other test exists, show an encouraging message
  if (otherSessions.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <ArrowLeftRight className="h-5 w-5 text-indigo-600" />
          Mock Test Comparison
        </div>
        <p className="text-sm text-slate-500 font-medium">
          Take another mock test to unlock automatic side-by-side comparison, score deltas, and speed evolution!
        </p>
      </div>
    );
  }

  // Calculate deltas if other analysis is present
  const scoreDelta = otherAnalysis
    ? currentAnalysis.raw_score - otherAnalysis.raw_score
    : selectedOtherSession
    ? currentSession.raw_score - selectedOtherSession.raw_score
    : 0;

  const accDelta = otherAnalysis
    ? Math.round(currentAnalysis.accuracy_rate - otherAnalysis.accuracy_rate)
    : 0;

  const paceDelta = otherAnalysis
    ? currentAnalysis.avg_time_per_question - otherAnalysis.avg_time_per_question
    : 0;

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-indigo-600" />
            Side-by-Side Test Comparison
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Compare this test directly with your past attempts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Compare with:</span>
          <select
            aria-label="Select comparison mock test"
            value={selectedOtherId}
            onChange={(e) => fetchComparison(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 py-1.5 px-3 bg-white font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {otherSessions.map((s) => (
              <option key={s.id} value={s.id}>
                Mock #{s.test_number} ({s.raw_score} pts)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Score */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Raw Score (+5 / -1)
            </span>
            <span
              className={`text-xs font-black px-2 py-0.5 rounded-full ${
                scoreDelta >= 0
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-rose-100 text-rose-800"
              }`}
            >
              {scoreDelta >= 0 ? `+${scoreDelta} pts` : `${scoreDelta} pts`}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[11px] font-bold text-slate-400 block">Mock #{selectedOtherSession?.test_number || "?"}</span>
              <span className="text-xl font-black text-slate-600">
                {selectedOtherSession?.raw_score ?? "—"} pts
              </span>
            </div>

            <ArrowRight className="h-4 w-4 text-slate-300" />

            <div className="text-right">
              <span className="text-[11px] font-bold text-indigo-600 block">Current (Mock #{currentSession.test_number})</span>
              <span className="text-2xl font-black text-indigo-700">
                {currentAnalysis.raw_score} pts
              </span>
            </div>
          </div>
        </div>

        {/* Metric 2: Accuracy */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Accuracy Rate
            </span>
            <span
              className={`text-xs font-black px-2 py-0.5 rounded-full ${
                accDelta >= 0
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-rose-100 text-rose-800"
              }`}
            >
              {accDelta >= 0 ? `+${accDelta}%` : `${accDelta}%`}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[11px] font-bold text-slate-400 block">Past Test</span>
              <span className="text-xl font-black text-slate-600">
                {otherAnalysis?.accuracy_rate ?? (selectedOtherSession ? Math.round((selectedOtherSession.correct_count / (selectedOtherSession.attempted_count || 1)) * 100) : "—")}%
              </span>
            </div>

            <ArrowRight className="h-4 w-4 text-slate-300" />

            <div className="text-right">
              <span className="text-[11px] font-bold text-indigo-600 block">Current Test</span>
              <span className="text-2xl font-black text-indigo-700">
                {Math.round(currentAnalysis.accuracy_rate)}%
              </span>
            </div>
          </div>
        </div>

        {/* Metric 3: Speed & Pace */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Average Pace
            </span>
            <span
              className={`text-xs font-black px-2 py-0.5 rounded-full ${
                paceDelta <= 0
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {paceDelta <= 0 ? `${paceDelta}s (faster)` : `+${paceDelta}s`}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[11px] font-bold text-slate-400 block">Past Pace</span>
              <span className="text-xl font-black text-slate-600">
                {otherAnalysis?.avg_time_per_question ?? "—"}s
              </span>
            </div>

            <ArrowRight className="h-4 w-4 text-slate-300" />

            <div className="text-right">
              <span className="text-[11px] font-bold text-indigo-600 block">Current Pace</span>
              <span className="text-2xl font-black text-indigo-700">
                {currentAnalysis.avg_time_per_question}s
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
