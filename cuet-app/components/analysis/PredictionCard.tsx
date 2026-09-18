"use client";

import React from "react";
import { Award, Compass, ShieldCheck, Sparkles, Building2, CheckCircle, ArrowUpRight } from "lucide-react";

interface PredictionCardProps {
  predictedMin: number;
  predictedMax: number;
  maxScore: number;
  rankMin: number;
  rankMax: number;
  confidence: "low" | "medium" | "high";
  percentile?: number;
}

export function PredictionCard({
  predictedMin,
  predictedMax,
  maxScore,
  rankMin,
  rankMax,
  confidence,
  percentile = 92.5,
}: PredictionCardProps) {
  const getConfidenceBadge = () => {
    switch (confidence) {
      case "high":
        return {
          label: "High Confidence (Based on 5+ tests)",
          className: "bg-emerald-100 text-emerald-800 border-emerald-300",
        };
      case "medium":
        return {
          label: "Moderate Confidence (3-5 tests)",
          className: "bg-amber-100 text-amber-800 border-amber-300",
        };
      case "low":
      default:
        return {
          label: "Early Estimate (1-2 tests)",
          className: "bg-slate-100 text-slate-700 border-slate-300",
        };
    }
  };

  const confidenceBadge = getConfidenceBadge();

  // Normalize predicted score to 200-scale benchmark for DU/CUET top colleges
  const normalizedMidScore = Math.round(((predictedMin + predictedMax) / 2 / maxScore) * 200);

  const collegeBenchmarks = [
    {
      college: "SRCC / St. Stephen's / Hindu College",
      course: "Top DU Honors (Pol Sci, Eco, B.Com)",
      cutoff200: 190,
    },
    {
      college: "Miranda House / LSR / Hansraj",
      course: "Tier 1 DU North & South Campus",
      cutoff200: 178,
    },
    {
      college: "KMC / Ramjas / Gargi / Venky",
      course: "Popular Humanities & Commerce",
      cutoff200: 165,
    },
    {
      college: "BHU / Jamia / Allahabad University",
      course: "Central Universities Main Campuses",
      cutoff200: 145,
    },
  ];

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border border-indigo-500/20 shadow-xl space-y-6 relative overflow-hidden">
      {/* Background flare */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-800/50 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                CUET Exam Predictor & Cutoff Analysis
                <Sparkles className="h-4 w-4 text-amber-400" />
              </h3>
              <p className="text-xs text-indigo-200">
                AI statistical projection modeled on NTA historical percentile percentiles
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${confidenceBadge.className}`}
          >
            <ShieldCheck className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
            {confidenceBadge.label}
          </span>
        </div>

        {/* Prediction Hero Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Score Range */}
          <div className="rounded-2xl bg-indigo-900/40 border border-indigo-700/50 p-5 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
              Predicted Exam Score
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
              {predictedMin} – {predictedMax}
              <span className="text-sm font-semibold text-indigo-300 ml-1">/ {maxScore}</span>
            </div>
            <p className="text-xs text-indigo-200 font-medium">
              Expected final normalized CUET score
            </p>
          </div>

          {/* Rank Range */}
          <div className="rounded-2xl bg-indigo-900/40 border border-indigo-700/50 p-5 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
              Estimated All-India Rank
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              #{rankMin.toLocaleString()} – #{rankMax.toLocaleString()}
            </div>
            <p className="text-xs text-indigo-200 font-medium">
              Based on ~2.5L CUET domain candidates
            </p>
          </div>

          {/* Percentile */}
          <div className="rounded-2xl bg-indigo-900/40 border border-indigo-700/50 p-5 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
              Projected Percentile
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
              {percentile.toFixed(1)}%ile
            </div>
            <p className="text-xs text-indigo-200 font-medium">
              Top {(100 - percentile).toFixed(1)}% candidate bracket
            </p>
          </div>
        </div>

        {/* Target College Cutoff Predictor */}
        <div className="rounded-2xl bg-slate-950/60 border border-indigo-800/40 p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
            <Building2 className="h-4 w-4 text-indigo-400" />
            Delhi University & Central University Cutoff Gauge
          </div>

          <div className="space-y-2.5">
            {collegeBenchmarks.map((bench, idx) => {
              const isSafe = normalizedMidScore >= bench.cutoff200 + 4;
              const isTarget = normalizedMidScore >= bench.cutoff200 - 8 && !isSafe;
              const isReach = normalizedMidScore < bench.cutoff200 - 8;

              return (
                <div
                  key={idx}
                  className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-indigo-950/30 border border-indigo-900/40 hover:border-indigo-700/40 transition-colors"
                >
                  <div>
                    <h5 className="font-bold text-sm text-white flex items-center gap-1.5">
                      {bench.college}
                    </h5>
                    <p className="text-xs text-indigo-300">{bench.course}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-400">
                      Cutoff benchmark: ~{bench.cutoff200}/200
                    </span>

                    {isSafe && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle className="h-3.5 w-3.5" />
                        High Probability (Safe)
                      </span>
                    )}
                    {isTarget && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Sparkles className="h-3.5 w-3.5" />
                        Target Zone (In Reach)
                      </span>
                    )}
                    {isReach && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        Reach Goal (+{bench.cutoff200 - normalizedMidScore} pts needed)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
