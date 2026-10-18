"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Sparkles,
  CheckCircle2,
  X,
  Flame,
} from "lucide-react";
import UpgradeButton from "./UpgradeButton";

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
  const [pricing, setPricing] = useState({
    currentPriceInr: 499,
    standardPriceInr: 799,
    remainingSlots: 100,
  });

  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    async function loadPricing() {
      try {
        const res = await fetch("/api/payments");
        if (res.ok) {
          const data = await res.json();
          if (data?.pricing && isMounted) {
            setPricing({
              currentPriceInr: data.pricing.currentPriceInr ?? 499,
              standardPriceInr: data.pricing.standardPriceInr ?? 799,
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
  }, [isOpen]);

  if (!isOpen) return null;

  const title =
    testType === "mock"
      ? "Free Mock Limit Reached"
      : testType === "practice"
      ? "Free Practice Limit Reached"
      : "Free PYQ Quota Reached";

  const defaultDescription =
    testType === "mock"
      ? "You have completed your 3 free domain mock tests. Upgrade to CUETMate Premium for unlimited full-length NTA CBT simulations across all 20 subjects."
      : testType === "practice"
      ? "You have completed your 3 free unit practice tests. Upgrade to CUETMate Premium for unlimited unit-wise practice tests across all chapters."
      : `You have completed your 1 free past year question paper attempt for ${canonicalSubject?.toUpperCase() || "this subject"}. Upgrade to CUETMate Premium to unlock every shift of official past papers across all subjects.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>Free Tier Limit Reached</span>
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

          {/* Promotional Offer Callout */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Flame className="w-5 h-5 text-amber-600 fill-amber-500 shrink-0" />
              <div>
                <span className="text-xs font-bold text-amber-900 block">
                  Introductory Launch Offer
                </span>
                <span className="text-[11px] text-amber-700 font-medium">
                  Only ₹{pricing.currentPriceInr} (First 100 Buyers · {pricing.remainingSlots} left)
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400 line-through shrink-0">
              ₹{pricing.standardPriceInr}
            </span>
          </div>

          {/* Unlocked Benefits */}
          <div className="space-y-2 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Unlimited Mock Tests across all 20 domain subjects</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Unlimited Unit Practice & Official Past Year Papers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Where Do I Stand dream college cutoff predictor</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Subject Weakness Radar & AI Mistake Decrypter</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <UpgradeButton
              planId="all_access_pass_799"
              variant="primary"
              className="w-full text-center"
              buttonText={`Unlock Unlimited Access (₹${pricing.currentPriceInr})`}
              onSuccess={onClose}
            />

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Continue with Free Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
