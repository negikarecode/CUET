"use client";

import React from "react";
import Link from "next/link";
import {
  Lock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Zap,
  Landmark,
  Trophy,
  Radar,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { PRICING_CONFIG } from "@/lib/pricing";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  lock: Lock,
  landmark: Landmark,
  trophy: Trophy,
  radar: Radar,
  cbt: GraduationCap,
  graduation: GraduationCap,
  sparkles: Sparkles,
  shield: ShieldCheck,
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
  featureSubtitle = "Gold Pass Diagnostic Capability",
  featureDescription,
  benefits,
  iconName = "lock",
  returnUrl = "/dashboard",
  returnLabel = "Back to Aspirant Dashboard",
}: LockedFeaturePaywallProps) {
  const Icon = ICON_MAP[iconName?.toLowerCase() || "lock"] || Lock;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50/50">
      <div className="w-full max-w-xl mx-auto space-y-6">
        {/* Return back link */}
        <div>
          <Link
            href={returnUrl}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{returnLabel}</span>
          </Link>
        </div>

        {/* Feature Lock Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Icon className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>{featureSubtitle}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Unlock {featureTitle} with Gold Pass
          </h1>

          <p className="mt-3 text-sm text-slate-500 leading-relaxed font-normal">
            {featureDescription}
          </p>

          {/* Benefits Grid */}
          <div className="mt-8 text-left bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/70 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              What you unlock with Gold Pass:
            </h3>
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium"
              >
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
                  ₹{PRICING_CONFIG.priceInr}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  / {PRICING_CONFIG.validityLabel}
                </span>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <Link
                href="/dashboard/upgrade"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm px-6 py-3.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-slate-900/10 transition-colors"
              >
                <span>Upgrade to Gold Pass</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
              <Zap className="w-3.5 h-3.5 text-purple-600" />
              <span>No recurring auto-debits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
