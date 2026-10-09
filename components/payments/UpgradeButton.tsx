"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Coins,
  ArrowRight,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface UpgradeButtonProps {
  planId?: "ai_pass_399" | "ai_practice_pass_499" | "all_access_pass_799";
  className?: string;
  buttonText?: string;
  variant?: "primary" | "amber" | "outline";
  onSuccess?: () => void;
}

// Dynamically load the external Razorpay checkout script
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function UpgradeButton({
  planId = "ai_practice_pass_499",
  className = "",
  buttonText,
  variant = "amber",
  onSuccess,
}: UpgradeButtonProps) {
  const router = useRouter();
  const user = useTestStore((state) => state.user);
  const addCoins = useTestStore((state) => state.addCoins);

  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const is399 = planId === "ai_pass_399";
  const isAllAccess = planId === "all_access_pass_799";
  const price = is399 ? "₹399" : isAllAccess ? "₹799" : "₹499";
  const planTitle = is399 ? "CUET AI Pass" : isAllAccess ? "All-Access Pass" : "AI Practice Pass";

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // 1. Ensure Razorpay script is loaded
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Unable to load Razorpay payment gateway. Please check your internet connection.");
        setLoading(false);
        return;
      }

      // 2. Call Server Route Handler to generate Razorpay Order
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          userId: user.id,
          email: user.email,
          name: user.name,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create Razorpay order.");
      }

      const orderData = await res.json();
      const { orderId, amount, currency, keyId, isSimulated } = orderData;

      // 3. Simulated Checkout if running in local development with placeholder keys
      if (isSimulated || !window.Razorpay) {
        setTimeout(async () => {
          // Verify simulation
          await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: orderId,
              razorpay_payment_id: `pay_sim_${Date.now()}`,
              userId: user.id,
              tier: "ai_practice_pass",
            }),
          });

          // Award 500 bonus coins in client store
          addCoins(500);
          setLoading(false);
          setShowSuccessModal(true);
        }, 1200);
        return;
      }

      // 4. Configure Razorpay Options
      const options = {
        key: keyId,
        amount,
        currency,
        name: "CUET AI-Prep",
        description: `Upgrade to ${planTitle} (1-Year Access)`,
        image: "https://cdn-icons-png.flaticon.com/512/2997/2997295.png",
        order_id: orderId,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // Verify payment on backend
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user.id,
                tier: isAllAccess ? "all_access_pass" : "ai_practice_pass",
              }),
            });

            if (verifyRes.ok) {
              addCoins(500);
              setShowSuccessModal(true);
              if (onSuccess) onSuccess();
            } else {
              alert("Payment verification issue. Please contact support.");
            }
          } catch (err) {
            console.error("Verification failed:", err);
            setShowSuccessModal(true);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9876543210",
        },
        notes: {
          userId: user.id,
          targetCollege: user.targetCollege,
        },
        theme: {
          color: "#312E81", // Deep Indigo Brand Primary
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      // 5. Open Razorpay Modal
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      rzp.open();
    } catch (err) {
      console.error("Checkout launch error:", err);
      alert("Error initiating checkout. Please retry.");
      setLoading(false);
    }
  };

  const buttonContent = buttonText || `Upgrade for ${price}`;

  const variantStyles = {
    amber:
      "bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-xs hover:shadow active:scale-[0.98]",
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-xs hover:shadow active:scale-[0.98]",
    outline:
      "bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 rounded-xl shadow-xs active:scale-[0.98]",
  };

  return (
    <>
      <button
        type="button"
        disabled={loading}
        onClick={handleCheckout}
        className={`px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      >
        {loading ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Connecting Razorpay...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{buttonContent}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>

      {/* Celebratory Success Modal */}
      {showSuccessModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <CheckCircle2 className="w-8 h-8 stroke-[2]" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200/60 uppercase shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Payment Confirmed
            </span>

            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-3">
              Welcome to the AI Practice Pass!
            </h3>

            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-normal">
              Your 1-year unlimited access to official NTA CBT mock simulators, instant NCERT mistake decrypter, and personalized repair quizzes is now active.
            </p>

            {/* Bonus Coins Callout */}
            <div className="mt-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-center gap-3">
              <Coins className="w-6 h-6 text-amber-600 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-900">
                  +500 Campus Coins Credited!
                </p>
                <p className="text-[10px] text-slate-500 font-normal">
                  Use them to unlock domain mock shifts and diagnostic reports.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push("/dashboard");
                  router.refresh();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs transition-all shadow-xs hover:shadow active:scale-[0.98]"
              >
                Go to Aspirant Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
