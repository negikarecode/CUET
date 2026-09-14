"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  FileCheck2,
  Brain,
  CheckCircle2,
  RotateCcw,
  Flame,
  ArrowRight,
} from "lucide-react";
import LiveDiagnosticDemo from "@/components/LiveDiagnosticDemo";
import StatsSection from "@/components/StatsSection";
import StreamSelector from "@/components/StreamSelector";
import PricingSection from "@/components/payments/PricingSection";
import OnboardingModal from "@/components/auth/OnboardingModal";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";

export default function HomePage() {
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const scrollToDemo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elem = document.getElementById("live-demo");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7EE]">
      {/* =================================================================== */}
      {/* SECTION 1: ABOVE-THE-FOLD HERO (Side-by-Side: Reality Check & Demo) */}
      {/* =================================================================== */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 pb-12 sm:pb-16 bg-[#FAF7EE]">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 academic-grid-pattern opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Value Prop & CTAs */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left">
              {/* Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] border-2 border-black text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]">
                <span className="w-2 h-2 rounded-full bg-[#FF5C5C] border border-black animate-pulse" />
                <span>[NEW 2026 NTA PATTERN: 50/50 COMPULSORY]</span>
              </div>

              {/* Headline - Main Attention Grabber */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black text-black tracking-tight leading-[1.06]">
                Stop losing{" "}
                <span className="inline-block bg-[#FEE2E2] text-[#DC2626] px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] -rotate-1 align-middle my-1">
                  -6 marks
                </span>{" "}
                to trick options.
                <span className="block mt-2.5 sm:mt-3 text-2xl sm:text-3xl lg:text-[2.5rem] xl:text-[2.85rem] text-black font-black leading-tight">
                  Master CUET&apos;s{" "}
                  <span className="underline decoration-[#FF5C5C] decoration-[5px] sm:decoration-[6px] underline-offset-[6px]">
                    zero-buffer format.
                  </span>
                </span>
              </h1>

              {/* Sub-headline (1 sentence) */}
              <p className="text-base sm:text-lg text-black/80 leading-relaxed font-semibold">
                All 50 questions are mandatory. You have 72 seconds per question. CUET AI-Prep pinpoints the trap option you fell for before exam day does.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Primary CTA */}
                <a
                  href="#live-demo"
                  onClick={scrollToDemo}
                  className="px-6 py-3.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] active:bg-[#E03E3E] text-white font-black text-sm tracking-wide border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Try 1 Diagnostic Question Free</span>
                </a>

                {/* Secondary CTA */}
                <Link
                  href="#stream-matrix"
                  className="px-6 py-3.5 rounded-lg border-2 border-black bg-white hover:bg-[#FAF7EE] text-black font-black text-sm tracking-wide shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <span>View Stream Tests</span>
                </Link>
              </div>

              {/* Trust Highlights */}
              <div className="pt-4 border-t-2 border-black/10 grid grid-cols-2 gap-3 text-xs text-black font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#D1FAE5] border border-black flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </div>
                  <span>100% Shift-Wise PYQs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#FEF3C7] border border-black flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </div>
                  <span>Instant Trap Breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#EEF2FF] border border-black flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </div>
                  <span>Exact +5 / -1 Marking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#FAF7EE] border border-black flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </div>
                  <span>No Login Required to Try</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Diagnostic Demo */}
            <div className="lg:col-span-6 xl:col-span-6 w-full">
              <LiveDiagnosticDemo />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 3: THE REALITY CHECK BAR (3 Neo-Brutalist Stat Chips)       */}
      {/* =================================================================== */}
      <StatsSection />

      {/* =================================================================== */}
      {/* SECTION 4: THE 3-STEP FEATURE GRID (Minimal Cards)                  */}
      {/* =================================================================== */}
      <section id="features" className="py-16 bg-white border-b-2 border-black text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#FEF3C7] px-3.5 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              Built For Zero Internal Choice
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-black">
              Engineered To Break Through Score Plateaus
            </h2>
            <p className="mt-2 text-sm text-black/70 font-semibold">
              No generic question banks. Three targeted tools designed specifically for the 50-compulsory NTA format.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Real NTA CBT Engine */}
            <div className="rounded-xl bg-[#FAF7EE] border-2 border-black p-6 shadow-[5px_5px_0px_0px_#000] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#EEF2FF] text-black border-2 border-black flex items-center justify-center mb-5 shadow-[2px_2px_0px_0px_#000]">
                  <FileCheck2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-black text-black">
                  Real NTA CBT Engine
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-black/80 font-medium leading-relaxed">
                  Cloned down to the exact countdown timer, palette colors, and question layout. Practice under genuine test center sensory conditions so nothing surprises you on exam day.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black/10 text-xs font-black text-black flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] stroke-[2.5]" />
                <span>Exact 1-50 Question Matrix</span>
              </div>
            </div>

            {/* Card 2: Trap-Distractor Post-Mortem */}
            <div className="rounded-xl bg-[#FEF3C7] border-2 border-black p-6 shadow-[5px_5px_0px_0px_#000] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-white text-black border-2 border-black flex items-center justify-center mb-5 shadow-[2px_2px_0px_0px_#000]">
                  <Brain className="w-6 h-6 text-[#DC2626] stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-black text-black">
                  Trap-Distractor Post-Mortem
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-black/80 font-medium leading-relaxed">
                  Traditional keys say <em>&quot;Option A is correct.&quot;</em> Our AI explains <strong>why</strong> you fell for Option C, what intermediate step you missed, and what NCERT concept you skipped.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black/10 text-xs font-black text-black flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] stroke-[2.5]" />
                <span>NCERT Page-Level Rule Citations</span>
              </div>
            </div>

            {/* Card 3: Streak & Weakness Drills */}
            <div className="rounded-xl bg-[#FAF7EE] border-2 border-black p-6 shadow-[5px_5px_0px_0px_#000] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#D1FAE5] text-black border-2 border-black flex items-center justify-center mb-5 shadow-[2px_2px_0px_0px_#000]">
                  <RotateCcw className="w-6 h-6 text-[#059669] stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-black text-black">
                  Streak & Weakness Drills
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-black/80 font-medium leading-relaxed">
                  Bite-sized 5-question targeted drills generated solely from your flagged mistakes. Fix your recurring slips in 5 minutes a day and build unstoppable habit streaks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black/10 text-xs font-black text-black flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] stroke-[2.5]" />
                <span>Adaptive 5-Min Repair Sprints</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stream Selector Matrix (Science, Commerce, Humanities) */}
      <StreamSelector />

      {/* =================================================================== */}
      {/* SECTION 5: TRANSPARENT, ZERO-FRICTION PRICING                       */}
      {/* =================================================================== */}
      <PricingSection />

      {/* =================================================================== */}
      {/* SECTION 6: THE "NORTH CAMPUS DREAM" FOOTER CTA                      */}
      {/* =================================================================== */}
      <section className="py-20 bg-[#FEF3C7] text-black text-center border-t-2 border-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-black text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]">
            <Flame className="w-4 h-4 fill-[#F59E0B] text-[#D97706]" />
            <span>Target: 960+ / 1,000 (99.5+ Percentile) North Campus Cutoff</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black leading-tight">
            Don&apos;t gamble your dream university on guesswork.
          </h2>

          <p className="text-black/80 font-semibold text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            50 mandatory questions means zero margin for avoidable errors. Practice under real shift pressure, eliminate trap habits, and claim your North Campus seat.
          </p>

          <div className="pt-3 flex justify-center">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] active:bg-[#E03E3E] text-white font-black text-sm sm:text-base tracking-wide border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-2.5 transition-all"
              >
                <span>Go to Aspirant Command Hub →</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="px-8 py-4 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] active:bg-[#E03E3E] text-white font-black text-sm sm:text-base tracking-wide border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>Join Now — Claim Your Dream Seat</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Onboarding / Real Supabase Auth Modal */}
      <OnboardingModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="signup"
      />
    </div>
  );
}

