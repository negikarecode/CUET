"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";

interface CUETClosingCTAProps {
  onStartFreeMock?: () => void;
}

export default function CUETClosingCTA({ onStartFreeMock }: CUETClosingCTAProps) {
  return (
    <section className="py-14 md:py-20 bg-[#123E30] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>CUET UG 2026 Preparation</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Ready to Secure Your Target College Seat?
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
          Practice authentic NTA-style mocks with zero guesswork, eliminate preventable cognitive penalties with AI diagnostics, and calibrate your dream college cutoffs today.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            type="button"
            onClick={onStartFreeMock}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all focus-visible:outline-2 focus-visible:outline-purple-400 flex items-center justify-center gap-2 group"
          >
            <span>Start Free Mock Test</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <Link
            href="/dashboard/mocks"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm sm:text-base transition-colors focus-visible:outline-2 focus-visible:outline-white flex items-center justify-center"
          >
            Explore 251+ Shift Papers
          </Link>
        </div>

        {/* Trust Badges Row */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-200/80 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero Payment Details Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Latest Rationalized NCERT Syllabus</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant Raw & Normalized Scorecard</span>
          </div>
        </div>
      </div>
    </section>
  );
}
