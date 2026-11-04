"use client";

import React from "react";
import { Check, Sparkles, Zap, ShieldCheck } from "lucide-react";

interface CUETPlanComparisonProps {
  onSelectPlan?: (plan: "free" | "gold") => void;
}

export default function CUETPlanComparison({ onSelectPlan }: CUETPlanComparisonProps) {
  const freeFeatures = [
    "3 Full-Length NTA-Style Mocks per domain subject",
    "1 Official Shift Reconstructed Past Paper (2024)",
    "3 Chapter-Wise Diagnostic Drills",
    "Standard Raw (out of 250) & Normalized Scorecard",
    "Verified NCERT Answer Explanations",
    "Desktop & Mobile Browser Access",
  ];

  const goldFeatures = [
    "All 251+ Reconstructed Shift Papers (2022–2025)",
    "Unlimited Full-Length NTA-Style CBT Mock Tests",
    "Granular AI Mistake Diagnosis (Careless Slips vs Concept Gaps)",
    "Exact NCERT Class 12 Page & Chapter Citations",
    "DU CSAS 4-Year Cutoff Predictor (SRCC, Hindu, Hansraj)",
    "7-Day Score Accelerator Spaced Repetition Drills",
    "All-India Percentile Leaderboard & AIR Rank Estimator",
    "Priority Subject Expert Doubts & Solution Walkthroughs",
  ];

  return (
    <section id="pricing" className="py-14 md:py-24 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5">
          <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200">
            Transparent Preparation Plans
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Free Forever vs Gold Pass
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Start preparing immediately with zero payment details required, or upgrade to Gold Pass for unrestricted access to all 251+ shift papers and AI diagnosis.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {/* Free Tier Card */}
          <div className="bg-slate-50/80 rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-600 bg-slate-200/70 px-3 py-1 rounded-full">
                  Free Plan
                </span>
                <span className="text-xs text-slate-500 font-medium">No Card Required</span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900">Essential Practice</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-6 leading-relaxed">
                Ideal for diagnosing your baseline score and experiencing authentic NTA-style test conditions.
              </p>

              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">₹0</span>
                  <span className="text-xs text-slate-500 font-medium">/ free forever</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Start immediately without creating an account</p>
              </div>

              <div className="space-y-3 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  What is included:
                </span>
                {freeFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan?.("free")}
              className="w-full py-3 px-5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-slate-900 shadow-sm"
            >
              Start Free Mock Test
            </button>
          </div>

          {/* Gold Pass Card (Highlighted) */}
          <div className="bg-gradient-to-b from-[#123E30] to-[#0D2B22] text-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl shadow-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>Most Popular</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full">
                  Gold Pass
                </span>
                <span className="text-xs text-emerald-200/80 font-medium">Full Season Access</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white">All-India Rank 1 Pack</h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 mb-6 leading-relaxed">
                Comprehensive preparation engine built to secure top North Campus DU colleges (SRCC, Hindu, Hansraj).
              </p>

              <div className="mb-6 pb-6 border-b border-emerald-800/60">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white">₹999</span>
                  <span className="text-xs text-emerald-300 line-through">₹2,499</span>
                  <span className="text-xs text-emerald-300 font-semibold bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">
                    One-Time · Valid Till CUET 2026
                  </span>
                </div>
                <p className="text-xs text-emerald-200/70 mt-1">Single pass covers all 22 domain subjects + General Test</p>
              </div>

              <div className="space-y-3 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
                  Everything in Free, plus:
                </span>
                {goldFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 fill-emerald-300 text-emerald-300" />
                    </div>
                    <span className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onSelectPlan?.("gold")}
                className="w-full py-3 px-5 rounded-xl font-bold text-sm bg-purple-600 hover:bg-purple-700 text-white transition-colors focus-visible:outline-2 focus-visible:outline-purple-400 shadow-md"
              >
                Unlock Gold Pass
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-emerald-200/70">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>30-Day Money Back Guarantee · Instant Digital Activation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer / Non-affiliation notice */}
        <div className="mt-8 text-center text-xs text-slate-500 max-w-xl mx-auto">
          cuetmate is an independent academic preparation platform and is not affiliated with, authorized, or endorsed by the National Testing Agency (NTA).
        </div>
      </div>
    </section>
  );
}
