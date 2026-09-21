"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles, ShieldCheck, QrCode, ArrowRight, X } from "lucide-react";
import UpgradeButton from "./UpgradeButton";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 bg-[#FAF7EE] border-t-2 border-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] text-black text-xs font-black uppercase tracking-wider mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            <span>Zero Corporate Fluff • 100% Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
            Transparent, Zero-Friction Pricing
          </h2>
          <p className="mt-2 text-sm text-black/70 font-medium">
            No sales calls. No hidden checkout taxes. Instant activation for your CUET exam cycle.
          </p>

          {/* Instant UPI highlight pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] text-xs font-black text-black">
            <QrCode className="w-4 h-4 text-[#10B981]" />
            <span>Scan & unlock via PhonePe / GPay in 10s</span>
          </div>
        </div>

        {/* Pricing Cards: Exactly 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {/* Plan 1: Free Starter (₹0) */}
          <div className="p-7 sm:p-8 rounded-xl bg-white border-2 border-black shadow-[5px_5px_0px_0px_#000] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-black font-mono bg-[#FAF7EE] px-2.5 py-1 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                  Free Starter
                </span>
                <span className="text-[11px] font-bold text-black/60">No Card Needed</span>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-black font-mono">₹0</span>
                <span className="text-xs text-black/60 font-bold">Forever Free</span>
              </div>
              <p className="mt-2 text-xs text-black/70 font-medium leading-relaxed">
                Test drive the authentic NTA CBT Player with official domain sample questions.
              </p>

              <div className="mt-7 space-y-3 text-xs text-black font-bold">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#D1FAE5] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span>3 Domain Mock Tests</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#D1FAE5] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span>60-Minute Countdown CBT Player (Exact NTA clone)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#D1FAE5] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span>Official +5 / -1 Marking Scorecard</span>
                </div>
                <div className="flex items-center gap-2.5 text-black/40">
                  <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3 text-black/50 stroke-[2.5]" />
                  </span>
                  <span>AI NCERT Mistake Decrypter</span>
                </div>
                <div className="flex items-center gap-2.5 text-black/40">
                  <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3 text-black/50 stroke-[2.5]" />
                  </span>
                  <span>5-Question Adaptive Repair Drills</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-black">
              <Link
                href="/test/physics"
                className="w-full py-3.5 px-4 rounded-lg bg-white hover:bg-[#FAF7EE] active:bg-[#F3EEDD] text-black font-black text-xs flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <span>Start Free Mock</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Plan 2: Ranker Pass (₹499) */}
          <div className="p-7 sm:p-8 rounded-xl bg-[#FFFDF9] border-2 border-black shadow-[7px_7px_0px_0px_#000] flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF5C5C] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              Complete Ranker Pass
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-black font-mono bg-[#FEF3C7] px-2.5 py-1 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                  Ranker Pass
                </span>
                <span className="text-[11px] font-black text-[#FF5C5C]">One-Time Payment</span>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-black font-mono">₹499</span>
                <span className="text-xs text-black/60 font-bold">/ Exam Cycle (Single Payment)</span>
              </div>
              <p className="mt-2 text-xs text-black/70 font-medium leading-relaxed">
                Everything you need to eliminate trap options, debug time-sinks, and secure a top Central University seat.
              </p>

              <div className="mt-7 space-y-3.5 text-xs text-black font-bold">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#D1FAE5] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span><strong>Unlimited</strong> 50-Q Full NTA Mock Papers (All Streams)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#D1FAE5] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span><strong>Instant NCERT Mistake Decrypter</strong> with direct rule citations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#D1FAE5] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span><strong>Automated 5-Question AI Repair Quizzes</strong> for weak spots</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#D1FAE5] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span><strong>Time-Sink Bottleneck Detection (&gt;72s)</strong> & pace radar</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FEF3C7] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span className="text-black font-black bg-[#FEF3C7] px-2 py-0.5 rounded border border-black">+1,000 Campus Coins Bonus</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-black">
              <UpgradeButton
                planId="ai_practice_pass_499"
                variant="primary"
                className="w-full text-center"
                buttonText="Get Ranker Pass (₹499)"
              />
            </div>
          </div>
        </div>

        {/* Disclaimer & Security badge footer */}
        <div className="mt-10 text-center space-y-2">
          <p className="text-xs text-black/80 font-bold">
            <em>No auto-renewing subscription traps. Pay once for the exam cycle.</em>
          </p>
          <div className="flex items-center justify-center gap-2 text-[11px] text-black/60 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>256-bit SSL encrypted. Instant digital activation with official Razorpay invoice.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
