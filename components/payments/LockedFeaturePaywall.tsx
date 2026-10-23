"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Flame,
  Zap,
  Landmark,
  Trophy,
  Radar,
  GraduationCap,
} from "lucide-react";
import UpgradeButton from "./UpgradeButton";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  lock: Lock,
  landmark: Landmark,
  trophy: Trophy,
  radar: Radar,
  cbt: GraduationCap,
  graduation: GraduationCap,
  sparkles: Sparkles,
  shield: ShieldCheck,
  flame: Flame,
  zap: Zap,
};

export interface LockedFeaturePaywallProps {
  featureTitle: string;
  featureSubtitle?: string;
  featureDescription: string;
  benefits: string[];
  iconName?: "lock" | "landmark" | "trophy" | "radar" | "cbt" | "sparkles" | string;
  returnUrl?: string;
  returnLabel?: string;
}

export default function LockedFeaturePaywall({
  featureTitle,
  featureSubtitle = "Premium Diagnostic Capability",
  featureDescription,
  benefits,
  iconName = "lock",
  returnUrl = "/dashboard",
  returnLabel = "Back to Aspirant Dashboard",
}: LockedFeaturePaywallProps) {
  const Icon = ICON_MAP[iconName?.toLowerCase() || "lock"] || Lock;
  const [pricing, setPricing] = useState<{
    currentPriceInr: number;
    standardPriceInr: number;
    isPromotionalActive: boolean;
    remainingPromotionalSlots: number;
  }>({
    currentPriceInr: 10,
    standardPriceInr: 799,
    isPromotionalActive: true,
    remainingPromotionalSlots: 100,
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
              currentPriceInr: data.pricing.currentPriceInr ?? 2,
              standardPriceInr: data.pricing.standardPriceInr ?? 799,
              isPromotionalActive: data.pricing.isPromotionalActive ?? true,
              remainingPromotionalSlots: data.pricing.remainingPromotionalSlots ?? 100,
            });
          }
        }
      } catch {
        // Fallback to default
      }
    }
    loadPricing();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Return Link */}
      <div className="mb-6">
        <Link
          href={returnUrl}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{returnLabel}</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Top Accent Strip */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />

        <div className="p-6 sm:p-10 text-center max-w-2xl mx-auto">
          {/* Badge & Lock Icon */}
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Icon className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{featureSubtitle}</span>
          </div>

          {/* Consistent H1 messaging per spec */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Unlock {featureTitle} with CUETMate Premium
          </h1>

          <p className="mt-3 text-sm text-slate-500 leading-relaxed font-normal">
            {featureDescription}
          </p>

          {/* Promotional scarcity badge */}
          {pricing.isPromotionalActive && pricing.remainingPromotionalSlots > 0 && (
            <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70 text-xs font-semibold shadow-xs">
              <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>
                Launch Offer: <strong>₹{pricing.currentPriceInr}</strong> for the first 100 buyers ({pricing.remainingPromotionalSlots} slots remaining)
              </span>
            </div>
          )}

          {/* Benefits Grid */}
          <div className="mt-8 text-left bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/70 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              What you unlock with Premium:
            </h3>
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Price & Checkout Action */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Single One-Time Payment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  ₹{pricing.currentPriceInr}
                </span>
                {pricing.isPromotionalActive && (
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    ₹{pricing.standardPriceInr}
                  </span>
                )}
                <span className="text-xs font-medium text-slate-500">
                  / Full Exam Cycle
                </span>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <UpgradeButton
                planId="all_access_pass_799"
                variant="primary"
                buttonText={`Get Premium (₹${pricing.currentPriceInr})`}
                className="w-full sm:w-auto text-sm px-6 py-3.5 shadow-md shadow-blue-500/10"
              />
            </div>
          </div>

          {/* Safe Guarantee & Return */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 font-medium">
            <div className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant Digital Activation</span>
            </div>
            <span>•</span>
            <div className="inline-flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>No recurring auto-debits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
