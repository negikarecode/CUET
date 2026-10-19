"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Sparkles,
  Flame,
  ArrowRight,
} from "lucide-react";
import UpgradeButton from "./UpgradeButton";

export default function PricingView() {
  const [pricing, setPricing] = useState({
    currentPriceInr: 10,
    standardPriceInr: 799,
    isPromotionalActive: true,
    totalSlots: 100,
    claimedSlots: 0,
    remainingSlots: 100,
  });

  useEffect(() => {
    let isMounted = true;
    async function loadPricing() {
      try {
        const res = await fetch("/api/payments");
        if (res.ok) {
          const data = await res.json();
          if (data?.pricing && isMounted) {
            setPricing({
              currentPriceInr: data.pricing.currentPriceInr ?? 10,
              standardPriceInr: data.pricing.standardPriceInr ?? 799,
              isPromotionalActive: data.pricing.isPromotionalActive ?? true,
              totalSlots: data.pricing.totalPromotionalSlots ?? 100,
              claimedSlots: data.pricing.claimedPromotionalSlots ?? 0,
              remainingSlots: data.pricing.remainingPromotionalSlots ?? 100,
            });
          }
        }
      } catch {}
    }
    loadPricing();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* 1. Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-200/80 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 fill-blue-500" />
          <span>CUET UG 2026 Aspirant Pass</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-normal">
          No hidden checkout fees. Single one-time payment valid for the entire 2026 CUET examination cycle.
        </p>

        {/* Truthful Promotional Banner */}
        {pricing.isPromotionalActive && pricing.remainingSlots > 0 ? (
          <div className="mt-4 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold shadow-xs animate-in fade-in duration-300">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>
              Launch Offer: <strong>₹{pricing.currentPriceInr}</strong> for the first {pricing.totalSlots} buyers (
              <span className="text-amber-700 font-bold">{pricing.remainingSlots} slots remaining</span>)
            </span>
          </div>
        ) : (
          <div className="mt-4 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold">
            <span>Standard Price: <strong>₹{pricing.standardPriceInr}</strong> / Full Exam Cycle</span>
          </div>
        )}
      </div>

      {/* 2. Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Free Starter
              </span>
              <span className="text-[11px] font-medium text-slate-400">No Credit Card</span>
            </div>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">₹0</span>
              <span className="text-xs text-slate-500 font-medium">Free Forever</span>
            </div>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
              Get familiar with the authentic NTA Computer-Based Test environment.
            </p>

            <div className="mt-7 space-y-3.5 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>3 Full Domain Mock Exams (50 Qs)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>3 Unit-wise Practice Tests</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>1 Official PYQ Attempt per Subject</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                  <X className="w-3 h-3 stroke-[2]" />
                </span>
                <span>Where Do I Stand College Predictor</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                  <X className="w-3 h-3 stroke-[2]" />
                </span>
                <span>Subject Weakness Radar & AI Diagnosis</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                  <X className="w-3 h-3 stroke-[2]" />
                </span>
                <span>All-India Trophy Leaderboard</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Link
              href="/dashboard/mocks"
              className="w-full py-3.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-all"
            >
              <span>Explore Free Mocks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-indigo-600 shadow-lg flex flex-col justify-between relative ring-4 ring-indigo-50/50">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-1 rounded-full shadow-xs">
            Most Popular
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
                CUETMate Premium
              </span>
              <span className="text-[11px] font-semibold text-indigo-600">Single One-Time Payment</span>
            </div>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                ₹{pricing.currentPriceInr}
              </span>
              {pricing.isPromotionalActive && (
                <span className="text-lg font-semibold text-slate-400 line-through">
                  ₹{pricing.standardPriceInr}
                </span>
              )}
              <span className="text-xs text-slate-500 font-medium">/ 2026 Exam Cycle</span>
            </div>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
              Full unconstrained access to every mock, practice unit, college cutoff predictor, and AI tool.
            </p>

            <div className="mt-7 space-y-3.5 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>Unlimited</strong> Full-Length Mock Exams (All 20 Subjects)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>Unlimited</strong> Unit-wise Practice Tests</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>Unlimited</strong> Official Past Year Question Papers (PYQs)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>Where Do I Stand:</strong> Official College Cutoff Gap Analysis</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>Subject Weakness Radar:</strong> Micro-topic diagnostic engine</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>All-India Leaderboard:</strong> Live national ranking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 text-amber-600">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                  +500 Campus Coins Bonus
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <UpgradeButton
              planId="all_access_pass_799"
              variant="primary"
              className="w-full text-center py-3.5 shadow-md shadow-blue-500/10"
              buttonText={`Get CUETMate Premium (₹${pricing.currentPriceInr})`}
            />
          </div>
        </div>
      </div>

      {/* 3. Detailed Comparison Table */}
      <div className="max-w-4xl mx-auto space-y-6 pt-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Detailed Feature Comparison
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Understand exactly what is included in each access tier.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-4 px-6">Feature</th>
                  <th className="py-4 px-6 text-center w-36">Free Starter</th>
                  <th className="py-4 px-6 text-center w-48 text-indigo-700 bg-indigo-50/50">CUETMate Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr>
                  <td className="py-3.5 px-6">Domain Mock Tests (50 Qs)</td>
                  <td className="py-3.5 px-6 text-center text-slate-500">First 3 Tests</td>
                  <td className="py-3.5 px-6 text-center font-bold text-emerald-700 bg-indigo-50/20">Unlimited (400+)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6">Unit Practice Tests</td>
                  <td className="py-3.5 px-6 text-center text-slate-500">First 3 Units</td>
                  <td className="py-3.5 px-6 text-center font-bold text-emerald-700 bg-indigo-50/20">Unlimited (100+)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6">Official Past Year Papers (PYQ)</td>
                  <td className="py-3.5 px-6 text-center text-slate-500">1 per Subject</td>
                  <td className="py-3.5 px-6 text-center font-bold text-emerald-700 bg-indigo-50/20">Unlimited All Subjects</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6">Where Do I Stand (College Predictor)</td>
                  <td className="py-3.5 px-6 text-center text-slate-400"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="py-3.5 px-6 text-center text-emerald-600 font-bold bg-indigo-50/20"><Check className="w-4 h-4 mx-auto stroke-[2.5]" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6">Subject Weakness Radar & Deep Diagnosis</td>
                  <td className="py-3.5 px-6 text-center text-slate-400"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="py-3.5 px-6 text-center text-emerald-600 font-bold bg-indigo-50/20"><Check className="w-4 h-4 mx-auto stroke-[2.5]" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6">All-India Trophy Leaderboard</td>
                  <td className="py-3.5 px-6 text-center text-slate-400"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="py-3.5 px-6 text-center text-emerald-600 font-bold bg-indigo-50/20"><Check className="w-4 h-4 mx-auto stroke-[2.5]" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6">NCERT Mistake Decrypter & Doubt Solver</td>
                  <td className="py-3.5 px-6 text-center text-slate-400"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="py-3.5 px-6 text-center text-emerald-600 font-bold bg-indigo-50/20"><Check className="w-4 h-4 mx-auto stroke-[2.5]" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6">Adaptive 15-Question Repair Drills</td>
                  <td className="py-3.5 px-6 text-center text-slate-400"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="py-3.5 px-6 text-center text-emerald-600 font-bold bg-indigo-50/20"><Check className="w-4 h-4 mx-auto stroke-[2.5]" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6">Sunday Ritual Mentor AI Debriefs</td>
                  <td className="py-3.5 px-6 text-center text-slate-400"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="py-3.5 px-6 text-center text-emerald-600 font-bold bg-indigo-50/20"><Check className="w-4 h-4 mx-auto stroke-[2.5]" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6">Official NTA +5 / -1 Marking Engine</td>
                  <td className="py-3.5 px-6 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto stroke-[2.5]" /></td>
                  <td className="py-3.5 px-6 text-center text-emerald-600 font-bold bg-indigo-50/20"><Check className="w-4 h-4 mx-auto stroke-[2.5]" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6">Access Duration</td>
                  <td className="py-3.5 px-6 text-center text-slate-500">Ongoing</td>
                  <td className="py-3.5 px-6 text-center font-semibold text-slate-800 bg-indigo-50/20">Full 2026 Exam Cycle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto space-y-6 pt-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Clear, transparent answers with zero corporate fluff.
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <h4 className="font-bold text-slate-900">
              Is this a recurring subscription that will charge my card again?
            </h4>
            <p className="mt-1.5 text-slate-500 font-normal leading-relaxed">
              <strong>No.</strong> There are no auto-debit traps or recurring charges. You pay once (₹499 on launch offer / ₹799 standard) and receive full access for the entire 2026 examination cycle (365 days).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <h4 className="font-bold text-slate-900">
              What payment methods do you support?
            </h4>
            <p className="mt-1.5 text-slate-500 font-normal leading-relaxed">
              We support all standard Indian digital payment methods via Razorpay: UPI (GPay, PhonePe, Paytm, BHIM), Debit & Credit Cards, Netbanking, and Wallets.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <h4 className="font-bold text-slate-900">
              What happens if my payment succeeds but my account isn&apos;t upgraded?
            </h4>
            <p className="mt-1.5 text-slate-500 font-normal leading-relaxed">
              Our backend verifies transactions through both client-side cryptographic verification and automated webhooks. If there is any network timeout, simply refresh the dashboard or contact our support team with your Razorpay payment ID for instant reconciliation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <h4 className="font-bold text-slate-900">
              Will upgrading reset my past test attempts or statistics?
            </h4>
            <p className="mt-1.5 text-slate-500 font-normal leading-relaxed">
              <strong>Never.</strong> All your existing test history, question answers, campus coins, and streak data remain 100% intact when you upgrade.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Footer Terms & Legal Links */}
      <div className="pt-8 border-t border-slate-200 text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <Link href="/terms" className="hover:text-slate-800 transition-colors">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-slate-800 transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/refunds" className="hover:text-slate-800 transition-colors">
            Cancellation & Refund Policy
          </Link>
          <span>•</span>
          <Link href="/dashboard" className="hover:text-slate-800 transition-colors">
            Aspirant Dashboard
          </Link>
        </div>
        <p className="text-[11px] text-slate-400">
          © 2026 CUETMate AI-Prep. 256-bit SSL encrypted checkout powered by Razorpay.
        </p>
      </div>
    </div>
  );
}
