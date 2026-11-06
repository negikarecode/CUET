"use client";

import React from "react";
import Link from "next/link";
import {
  Lock,
  Sparkles,
  CheckCircle2,
  X,
  ArrowRight,
} from "lucide-react";
import { PRICING_CONFIG } from "@/lib/pricing";

export interface UsageLimitPaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  testType: "mock" | "practice" | "pyq" | string;
  limitMessage?: string;
  canonicalSubject?: string;
}

export default function UsageLimitPaywallModal({
  isOpen,
  onClose,
  testType,
  limitMessage,
  canonicalSubject,
}: UsageLimitPaywallModalProps) {
  if (!isOpen) return null;

  const title =
    testType === "mock"
      ? "Free Mock Limit Reached"
      : testType === "practice"
      ? "Free Practice Limit Reached"
      : "Free PYQ Quota Reached";

  const defaultDescription =
    testType === "mock"
      ? `You have completed your 3 free domain mock tests. Upgrade to Gold Pass for unlimited full-length NTA CBT simulations across all ${PRICING_CONFIG.domainSubjectCount} subjects.`
      : testType === "practice"
      ? "You have completed your 3 free unit practice tests. Upgrade to Gold Pass for unlimited unit-wise practice tests across all chapters."
      : `You have completed your 1 free past year question paper attempt for ${canonicalSubject?.toUpperCase() || "this subject"}. Upgrade to Gold Pass to unlock every shift of reconstructed past papers across all subjects.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-tr from-purple-700 to-indigo-700 text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-white" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200 block mb-1">
            Usage Limit Reached
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {title}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {limitMessage || defaultDescription}
          </p>

          {/* Gold Pass Value Callout */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-emerald-900 block">
                  {PRICING_CONFIG.planName}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">
                  {PRICING_CONFIG.validityLabel} · {PRICING_CONFIG.gstNote}
                </span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-emerald-900 shrink-0">
              ₹{PRICING_CONFIG.priceInr}
            </span>
          </div>

          {/* Unlocked Benefits */}
          <div className="space-y-2 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Unlimited Mock Tests across all {PRICING_CONFIG.domainSubjectCount} domain subjects</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Unlimited Unit Practice & Reconstructed Shift Papers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Where Do I Stand dream college cutoff predictor</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Granular AI Mistake Diagnosis & NCERT Citations</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/dashboard/upgrade"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-700 text-white shadow-md transition-colors"
            >
              <span>Unlock Gold Pass (₹{PRICING_CONFIG.priceInr})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Continue with Free Features
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
