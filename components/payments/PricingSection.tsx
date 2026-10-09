"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles, ShieldCheck, QrCode, ArrowRight, X } from "lucide-react";
import UpgradeButton from "./UpgradeButton";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-20 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-200/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Zero Corporate Fluff • 100% Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Transparent, Zero-Friction Pricing
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-normal">
            No sales calls. No hidden checkout taxes. Instant activation for your CUET exam cycle.
          </p>

          {/* Instant UPI highlight pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
            <QrCode className="w-4 h-4 text-emerald-600" />
            <span>Scan & unlock via PhonePe / GPay in 10s</span>
          </div>
        </div>

        {/* Pricing Cards: Exactly 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {/* Plan 1: Free Starter (₹0) */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                  Free Starter
                </span>
                <span className="text-[11px] font-medium text-slate-400">No Card Needed</span>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">₹0</span>
                <span className="text-xs text-slate-500 font-medium">Forever Free</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 font-normal leading-relaxed">
                Test drive the authentic NTA CBT Player with official domain sample questions.
              </p>

              <div className="mt-7 space-y-3 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span>3 Domain Mock Tests</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span>60-Minute Countdown CBT Player (Exact NTA clone)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span>Official +5 / -1 Marking Scorecard</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                    <X className="w-3 h-3 stroke-[2]" />
                  </span>
                  <span>AI NCERT Mistake Decrypter</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                    <X className="w-3 h-3 stroke-[2]" />
                  </span>
                  <span>5-Question Adaptive Repair Drills</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Link
                href="/test/physics"
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-200 shadow-xs transition-all"
              >
                <span>Start Free Mock</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </Link>
            </div>
          </div>

          {/* Plan 2: Ranker Pass (₹499) */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-indigo-600 shadow-sm flex flex-col justify-between relative ring-4 ring-indigo-50/50 hover:shadow-md transition-all">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-1 rounded-full shadow-xs">
              Complete Ranker Pass
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/60">
                  Ranker Pass
                </span>
                <span className="text-[11px] font-semibold text-indigo-600">One-Time Payment</span>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">₹499</span>
                <span className="text-xs text-slate-500 font-medium">/ Exam Cycle (Single Payment)</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 font-normal leading-relaxed">
                Everything you need to eliminate trap options, debug time-sinks, and secure a top Central University seat.
              </p>

              <div className="mt-7 space-y-3.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span><strong>Unlimited</strong> 50-Q Full NTA Mock Papers (All Streams)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span><strong>Instant NCERT Mistake Decrypter</strong> with direct rule citations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span><strong>Automated 5-Question AI Repair Quizzes</strong> for weak spots</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span><strong>Time-Sink Bottleneck Detection (&gt;72s)</strong> & pace radar</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 text-amber-600">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">+1,000 Campus Coins Bonus</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
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
          <p className="text-xs text-slate-500 font-medium">
            <em>No auto-renewing subscription traps. Pay once for the exam cycle.</em>
          </p>
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit SSL encrypted. Instant digital activation with official Razorpay invoice.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
