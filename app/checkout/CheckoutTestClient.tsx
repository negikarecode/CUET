"use client";

import React, { useState } from "react";
import Link from "next/link";
import RazorpayCheckoutButton from "@/components/payments/RazorpayCheckoutButton";
import { ShieldCheck, Check, ArrowRight, Zap } from "lucide-react";

export default function CheckoutTestClient() {
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "test">("standard");
  const [lastVerification, setLastVerification] = useState<any>(null);

  const amountPaise = selectedPlan === "standard" ? 49900 : 100;
  const planTitle =
    selectedPlan === "standard"
      ? "CUETMate Premium All-Access Pass (2026 Cycle)"
      : "Razorpay Test Order (100 Paise Minimum)";

  return (
    <div className="space-y-6">
      {/* Checkout Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-8 space-y-6">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
            Select Test Transaction
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <button
              type="button"
              onClick={() => setSelectedPlan("standard")}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedPlan === "standard"
                  ? "border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20"
                  : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">CUETMate Premium</span>
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                  ₹499
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Full 2026 exam cycle with all 20 domain mocks & PYQs.</p>
            </button>

            {process.env.NODE_ENV !== "production" && (
              <button
                type="button"
                onClick={() => setSelectedPlan("test")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedPlan === "test"
                    ? "border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Micro Test Transaction</span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-200 px-2.5 py-0.5 rounded-full">
                    ₹1
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Sandbox only: 100 paise minimum amount to test modal popup.</p>
              </button>
            )}
          </div>
        </div>

        {/* Feature summary */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Endpoint: <code>POST /api/payments (action: create-order)</code> generates server-priced order</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Frontend: Loads Razorpay modal script and triggers <code>window.Razorpay</code></span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Endpoint: <code>POST /api/payments (action: verify)</code> validates HMAC-SHA256 signature &amp; amount</span>
          </div>
        </div>

        {/* The Action Button */}
        <div className="pt-2 flex flex-col items-center justify-center">
          <RazorpayCheckoutButton
            amountPaise={amountPaise}
            currency="INR"
            planTitle={planTitle}
            buttonText={`Launch Razorpay Checkout (${selectedPlan === "standard" ? "₹499" : "₹1"})`}
            className="w-full sm:w-auto px-8 py-3.5 text-sm"
            onSuccess={(result) => {
              setLastVerification(result);
            }}
          />
        </div>

        {/* Last Verification Result Card */}
        {lastVerification && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Payment Verified & Account Upgraded</span>
            </div>
            <pre className="p-2 rounded bg-white/80 border border-emerald-200/60 overflow-x-auto text-[11px] text-emerald-950 font-mono">
              {JSON.stringify(lastVerification, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Test Guide & Credentials info */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>How to Test with Razorpay Test Mode</span>
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 leading-relaxed">
          <li>Click the <strong>Launch Razorpay Checkout</strong> button above.</li>
          <li>In the Razorpay checkout modal, select any test method (UPI, Netbanking, or Card).</li>
          <li>For Card: Use test card numbers or choose <strong>Success</strong> in the test simulation screen.</li>
          <li>Upon approval, the modal sends the payment ID, order ID, and HMAC signature to <code>/api/payments</code>.</li>
          <li>The backend verifies the signature using the configured <code>RAZORPAY_KEY_SECRET</code>, verifies order ownership and amount, and unlocks access.</li>
        </ol>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
          >
            <span>View Full Pricing Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-slate-500 font-medium hover:text-slate-800 transition-colors"
          >
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
