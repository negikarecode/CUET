"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";
import { PRICING_CONFIG } from "@/lib/pricing";
import { useEntitlement } from "@/lib/hooks/useEntitlement";
import { useTestStore } from "@/lib/store/useTestStore";
import { loadRazorpayScript } from "@/lib/payments/razorpay-client";
import { getLoggedOutUpgradeLoginHref } from "@/lib/navigation/upgrade";

export interface PricingSectionProps {
  id?: string;
  className?: string;
  isDashboard?: boolean;
  onSelectPlan?: (plan: "free" | "gold") => void;
}

function CheckoutParamSync({
  isAuthenticated,
  isPremium,
  onActivateCheckout,
}: {
  isAuthenticated: boolean;
  isPremium: boolean;
  onActivateCheckout: () => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("checkout") === "1" && isAuthenticated && !isPremium) {
      onActivateCheckout();
    }
  }, [searchParams, isAuthenticated, isPremium, onActivateCheckout]);

  return null;
}

export default function PricingSection({
  id = "pricing",
  className = "",
  isDashboard = false,
  onSelectPlan,
}: PricingSectionProps) {
  const router = useRouter();
  const { isPremium } = useEntitlement();
  const storeUser = useTestStore((s) => s.user);
  const loginUser = useTestStore((s) => s.loginUser);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "error" | "success" | "info";
    text: string;
  } | null>(null);

  // Check if candidate is authenticated
  const isAuthenticated = Boolean(storeUser?.id && storeUser.id !== "guest");

  const handleActivateCheckout = useCallback(() => {
    setTermsAccepted(true);
    setStatusMessage({
      type: "info",
      text: "Please accept the Terms of Service to proceed with Gold Pass checkout.",
    });
  }, []);

  const handleCheckout = async () => {
    if (isPremium) {
      return;
    }

    if (!isAuthenticated) {
      if (onSelectPlan) {
        onSelectPlan("gold");
      } else {
        router.push(getLoggedOutUpgradeLoginHref());
      }
      return;
    }

    if (!termsAccepted) {
      setStatusMessage({
        type: "error",
        text: "Please accept the Terms of Service and Refund Policy to proceed with payment.",
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      // 1. Load Razorpay Checkout SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setStatusMessage({
          type: "error",
          text: "Unable to load the secure payment gateway. Please verify your internet connection and retry.",
        });
        setLoading(false);
        return;
      }

      // 2. Request verified order from server route
      const orderRes = await fetch("/api/payments/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!orderRes.ok) {
        if (orderRes.status === 409) {
          loginUser({ isPremium: true, subscriptionTier: "all_access_pass" });
          setStatusMessage({
            type: "success",
            text: "Your account already has an active Gold Pass! Refreshing access...",
          });
          router.refresh();
          setLoading(false);
          return;
        }

        const errData = await orderRes.json().catch(() => null);
        throw new Error(errData?.error || "Failed to initialize checkout session.");
      }

      const orderData = await orderRes.json();
      const { orderId, amount, currency, keyId } = orderData;

      // 3. Open Razorpay Checkout Modal
      const options = {
        key: keyId,
        amount,
        currency: currency || "INR",
        name: "CUET AI-Prep",
        description: PRICING_CONFIG.planName,
        order_id: orderId,
        prefill: {
          name: storeUser?.name || "",
          email: storeUser?.email || "",
        },
        theme: {
          color: "#059669", // Emerald brand color matching Gold Pass
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setStatusMessage({
              type: "info",
              text: "Payment window was dismissed. You can complete your upgrade whenever you are ready.",
            });
          },
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            setStatusMessage({
              type: "info",
              text: "Verifying transaction signature...",
            });

            // 4. Authoritative server verification
            const verifyRes = await fetch("/api/payments/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) {
              const verifyErr = await verifyRes.json().catch(() => null);
              throw new Error(
                verifyErr?.error || "Transaction verification could not be confirmed."
              );
            }

            // 5. Update local state and refresh router
            loginUser({
              isPremium: true,
              subscriptionTier: "all_access_pass",
            });

            setStatusMessage({
              type: "success",
              text: "Payment confirmed! Gold Pass has been activated for your account.",
            });
            router.refresh();
          } catch (verifyError: any) {
            console.error("[Razorpay Verification Error]:", verifyError);
            setStatusMessage({
              type: "error",
              text:
                verifyError?.message ||
                "Payment was received, but server verification is processing. Please refresh shortly.",
            });
          } finally {
            setLoading(false);
          }
        },
      };

      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.open();
    } catch (err: any) {
      console.error("[Razorpay Checkout Error]:", err);
      setStatusMessage({
        type: "error",
        text: err?.message || "An unexpected error occurred during checkout initialization.",
      });
      setLoading(false);
    }
  };

  const handleFreeAction = () => {
    if (onSelectPlan) {
      onSelectPlan("free");
    } else if (isAuthenticated) {
      router.push("/dashboard/mocks");
    } else {
      router.push("/test/physics");
    }
  };

  return (
    <section
      id={id}
      className={`py-12 md:py-20 px-4 sm:px-6 lg:px-8 ${
        isDashboard ? "bg-transparent max-w-6xl mx-auto" : "bg-white border-b border-slate-100"
      } ${className}`}
    >
      <Suspense fallback={null}>
        <CheckoutParamSync
          isAuthenticated={isAuthenticated}
          isPremium={isPremium}
          onActivateCheckout={handleActivateCheckout}
        />
      </Suspense>

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Transparent Preparation Plans
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Free Forever vs Gold Pass
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Start preparing immediately with zero payment details required, or upgrade to
            Gold Pass for unrestricted access to all 251+ reconstructed shift papers and AI
            mistake telemetry.
          </p>
        </div>

        {/* Global Feedback Banner */}
        {statusMessage && (
          <div
            className={`max-w-4xl mx-auto mb-8 p-4 rounded-2xl flex items-start gap-3 text-sm font-medium animate-in fade-in duration-200 ${
              statusMessage.type === "error"
                ? "bg-rose-50 border border-rose-200 text-rose-800"
                : statusMessage.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-blue-50 border border-blue-200 text-blue-800"
            }`}
          >
            {statusMessage.type === "error" ? (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
            ) : statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
            ) : (
              <Sparkles className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />
            )}
            <div className="flex-1">
              <p>{statusMessage.text}</p>
            </div>
          </div>
        )}

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {/* Plan 1: Free Tier Card */}
          <div className="bg-slate-50/80 rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-600 bg-slate-200/70 px-3 py-1 rounded-full">
                  Free Plan
                </span>
                <span className="text-xs text-slate-500 font-medium">No Card Required</span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900">Essential Practice</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-6 leading-relaxed">
                Ideal for diagnosing your baseline score and experiencing authentic NTA-style
                test conditions.
              </p>

              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">₹0</span>
                  <span className="text-xs text-slate-500 font-medium">/ free forever</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Start immediately without creating an account
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  What is included:
                </span>
                {PRICING_CONFIG.freeFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleFreeAction}
              className="w-full py-3 px-5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-slate-900 shadow-sm cursor-pointer"
            >
              Start Free Mock Test
            </button>
          </div>

          {/* Plan 2: Green Gold Pass Card */}
          <div className="bg-gradient-to-b from-[#123E30] to-[#0D2B22] text-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl shadow-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>Most Popular</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full">
                  {PRICING_CONFIG.planName}
                </span>
                <span className="text-xs text-emerald-200/80 font-medium">Full Season Access</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white">{PRICING_CONFIG.planName}</h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 mb-6 leading-relaxed">
                Comprehensive preparation engine built to secure top North Campus DU colleges
                (SRCC, Hindu, Hansraj).
              </p>

              <div className="mb-6 pb-6 border-b border-emerald-800/60">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    ₹{PRICING_CONFIG.priceInr}
                  </span>
                  {PRICING_CONFIG.strikethroughPriceInr ? (
                    <span className="text-xs text-emerald-300 line-through">
                      ₹{PRICING_CONFIG.strikethroughPriceInr}
                    </span>
                  ) : (
                    <span className="text-xs text-emerald-200/90 font-semibold bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/60">
                      {PRICING_CONFIG.launchBadgeText}
                    </span>
                  )}
                  <span className="text-xs text-emerald-300 font-semibold bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">
                    {PRICING_CONFIG.validityLabel}
                  </span>
                </div>
                <p className="text-xs text-emerald-200/70 mt-1.5">
                  {PRICING_CONFIG.gstNote} · Single pass covers all {PRICING_CONFIG.domainSubjectCount} domain subjects + General Test
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
                  Everything in Free, plus:
                </span>
                {PRICING_CONFIG.goldFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 fill-emerald-300 text-emerald-300" />
                    </div>
                    <span className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* If user is already premium: disabled "Premium active" button */}
              {isPremium ? (
                <div className="space-y-3">
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="w-full py-3.5 px-5 rounded-xl font-bold text-sm bg-emerald-900/80 text-emerald-200 border border-emerald-700/80 flex items-center justify-center gap-2 cursor-not-allowed shadow-none"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Premium active</span>
                  </button>
                  <p className="text-center text-[11px] text-emerald-300/80">
                    Your Gold Pass is active for CUET UG 2027. All mock tests and AI debriefs are unlocked.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Terms & Refund Policy Agreement Checkbox */}
                  <div className="pt-2 border-t border-emerald-800/40">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-emerald-100/90 select-none">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-emerald-600 bg-emerald-950/80 text-purple-600 focus:ring-purple-400 focus:ring-offset-0"
                      />
                      <span>
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-white"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/refunds"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-white"
                        >
                          Refund Policy
                        </Link>
                        .
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={loading || !termsAccepted}
                    className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                      !termsAccepted
                        ? "bg-emerald-950/70 text-emerald-400/60 border border-emerald-800/50 cursor-not-allowed"
                        : loading
                        ? "bg-purple-700 text-white cursor-wait opacity-90"
                        : "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-purple-400"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Initializing Razorpay...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-purple-200" />
                        <span>Unlock Gold Pass</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-200/70">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant Digital Activation · 100% Secure Razorpay Checkout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer / Non-affiliation notice */}
        <div className="mt-8 text-center text-xs text-slate-500 max-w-xl mx-auto">
          cuetmate is an independent academic preparation platform and is not affiliated
          with, authorized, or endorsed by the National Testing Agency (NTA).
        </div>
      </div>
    </section>
  );
}
