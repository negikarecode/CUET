"use client";

import React from "react";
import Link from "next/link";
import HeroCampusIllustration from "./illustrations/HeroCampusIllustration";
import { Sparkles, ArrowRight, Eye, Trophy, ShieldCheck, Clock, QrCode } from "lucide-react";

interface CUETHeroProps {
  onAuth: (mode: "login" | "signup") => void;
  isLoggedIn: boolean;
  onOpenQuickStart?: () => void;
}

export default function CUETHero({ onAuth, isLoggedIn, onOpenQuickStart }: CUETHeroProps) {
  return (
    <section
      id="home"
      className="relative w-full pt-4 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#BDE8DF] via-[#A6E1D4] to-[#F0FAF7]"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-white/30 blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-emerald-200/40 blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Top Feature Pill Card: "Designed for Focus. Built for Rank 1." */}
        <div className="mb-10 p-5 md:p-6 rounded-3xl bg-white/75 backdrop-blur-md border border-white/80 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xs text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              Designed for Focus.<br />
              <span className="text-purple-600">Built for Rank 1.</span>
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-medium">
              Rigorous, analytical, and honest — from 50-question NTA CBT mocks to AI-powered NCERT mistake diagnosis.
            </p>
            {onOpenQuickStart && (
              <button
                type="button"
                onClick={onOpenQuickStart}
                className="mt-3 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                <span>Mobile QR Quick-Access</span>
              </button>
            )}
          </div>

          {/* 2 Floating Feature Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto flex-1">
            {/* Card 1: Master Authentic NTA Pacing */}
            <div className="p-4 rounded-2xl bg-white/95 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2.5">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Master Authentic NTA Pacing</h4>
              <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
                Sit real 60-minute countdowns, zero internal choice, and strict +5/−1 negative marking schemes.
              </p>
              <Link
                href="/dashboard/mocks"
                className="mt-2 text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group"
              >
                Explore Mocks <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Card 2: Diagnose Score Leaks Instantly */}
            <div className="p-4 rounded-2xl bg-white/95 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2.5">
                <Eye className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Diagnose Score Leaks Instantly</h4>
              <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
                Separate careless reading slips from foundational NCERT concept gaps with precision AI analytics.
              </p>
              <Link
                href="/dashboard/ai-coach"
                className="mt-2 text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group"
              >
                View AI Coach <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Admission CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-white text-xs font-bold text-purple-800 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>India&apos;s Dedicated NTA CUET CBT Practice Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Master CUET UG 2026 with{" "}
              <span className="text-purple-600 underline decoration-purple-300 decoration-wavy decoration-2">
                authentic exam pacing
              </span>{" "}
              and confidence.
            </h1>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Practice 50-question full-syllabus CBT papers, 251+ reconstructed shift-wise PYQs, and AI-powered NCERT mistake explanations to secure your dream Delhi University campus.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto bg-[#18262E] hover:bg-purple-700 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-purple-500/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Open Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => onAuth("signup")}
                  className="w-full sm:w-auto bg-[#18262E] hover:bg-purple-700 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-purple-500/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Start Practicing Free <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <Link
                href="/dashboard/pyqs"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm px-6 py-3.5 rounded-full border border-slate-200 shadow-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Solve 251+ Official PYQs
              </Link>
            </div>

            {/* Trust and Highlights Row */}
            <div className="pt-3 border-t border-emerald-300/60 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-700 font-medium">
              <span className="flex items-center gap-1.5 font-bold text-slate-900">
                <Trophy className="w-4 h-4 text-amber-500" />
                200,000+ Aspirants
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Latest NTA Rationalized Syllabus
              </span>
              <span>•</span>
              <span>45+ Central Universities</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Campus & Scholar Illustration */}
          <div className="lg:col-span-6 flex justify-center">
            <HeroCampusIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
