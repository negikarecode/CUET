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
      "bg-[#F59E0B] text-black font-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
    primary:
      "bg-[#FF5C5C] text-white font-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
    outline:
      "bg-white text-black font-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FAF7EE] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  };

  return (
    <>
      <button
        type="button"
        disabled={loading}
        onClick={handleCheckout}
        className={`px-5 py-3 rounded-lg flex items-center justify-center gap-2 text-xs transition-all disabled:opacity-50 ${variantStyles[variant]} ${className}`}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="w-full max-w-md bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_#000] p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-xl bg-[#10B981] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1FAE5] text-black text-[11px] font-black border-2 border-black uppercase font-mono shadow-[1px_1px_0px_0px_#000]">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              Payment Confirmed
            </span>

            <h3 className="text-2xl font-black text-black tracking-tight mt-3">
              Welcome to the AI Practice Pass!
            </h3>

            <p className="text-xs text-black/70 mt-2 leading-relaxed font-semibold">
              Your 1-year unlimited access to official NTA CBT mock simulators, instant NCERT mistake decrypter, and personalized repair quizzes is now active.
            </p>

            {/* Bonus Coins Callout */}
            <div className="mt-5 p-4 rounded-xl bg-[#FEF3C7] border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center gap-3">
              <Coins className="w-6 h-6 text-black shrink-0" />
              <div className="text-left">
                <p className="text-xs font-black text-black">
                  +500 Campus Coins Credited!
                </p>
                <p className="text-[10px] text-black/70 font-bold">
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
                className="w-full py-3 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white border-2 border-black font-black text-xs transition-all shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
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
