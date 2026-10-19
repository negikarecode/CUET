"use client";

import React, { useState } from "react";
import Script from "next/script";
import { Sparkles, ShieldCheck, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayCheckoutButtonProps {
  amountPaise?: number; // amount in paise (default: 49900 = ₹499)
  currency?: string;    // default: "INR"
  planTitle?: string;   // description in modal
  buttonText?: string;
  className?: string;
  prefillName?: string;
  prefillEmail?: string;
  prefillContact?: string;
  onSuccess?: (verificationResult: any) => void;
  onFailure?: (error: any) => void;
  onDismiss?: () => void;
}

// Fallback script loader if next/script hasn't completed yet
function ensureRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
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

export default function RazorpayCheckoutButton({
  amountPaise = 49900,
  currency = "INR",
  planTitle = "CUETMate Premium (All-Access Pass)",
  buttonText,
  className = "",
  prefillName = "CUET Aspirant",
  prefillEmail = "aspirant@cuetmate.in",
  prefillContact = "9876543210",
  onSuccess,
  onFailure,
  onDismiss,
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Step 1: Ensure Razorpay Standard Checkout script is loaded
      const scriptReady = await ensureRazorpayScript();
      if (!scriptReady || !window.Razorpay) {
        throw new Error("Unable to load Razorpay checkout gateway. Please check your network connection.");
      }

      // Step 2: Call backend to create Razorpay Order (POST /api/create-order)
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountPaise,
          currency,
          receipt: `rcpt_${Date.now()}`.slice(0, 40),
        }),
      });

      if (!orderRes.ok) {
        const errorData = await orderRes.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to create order (HTTP ${orderRes.status})`);
      }

      const orderData = await orderRes.json();
      const orderId = orderData.order_id || orderData.orderId;
      const keyId = orderData.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      if (!orderId) {
        throw new Error("Invalid order received from server.");
      }

      // Step 3: Configure Razorpay Checkout options
      const options = {
        key: keyId,
        amount: orderData.amount || amountPaise,
        currency: orderData.currency || currency,
        name: "CUETMate AI-Prep",
        description: planTitle,
        image: "https://cdn-icons-png.flaticon.com/512/2997/2997295.png",
        order_id: orderId,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // Step 4: Verify payment signature on backend (POST /api/verify-payment)
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              const msg = verifyData.error || "Payment signature verification failed.";
              setErrorMessage(msg);
              if (onFailure) onFailure(verifyData);
              return;
            }

            // Success state
            setSuccessMessage("Payment verified successfully! Welcome to CUETMate Premium.");
            setLoading(false);
            if (onSuccess) onSuccess(verifyData);
          } catch (verifyErr: any) {
            console.error("[Razorpay Verification Error]:", verifyErr);
            const msg = verifyErr.message || "Failed to verify payment with server.";
            setErrorMessage(msg);
            if (onFailure) onFailure(verifyErr);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: prefillName,
          email: prefillEmail,
          contact: prefillContact,
        },
        theme: {
          color: "#312E81", // Brand Indigo
        },
        modal: {
          ondismiss: function () {
            console.log("[Razorpay Checkout] Modal closed by user.");
            setLoading(false);
            if (onDismiss) onDismiss();
          },
        },
      };

      // Step 5: Instantiate and open Razorpay modal
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        console.error("[Razorpay Payment Failed Event]:", response.error);
        const failMsg = response.error?.description || "Payment failed or was declined by bank.";
        setErrorMessage(failMsg);
        setLoading(false);
        if (onFailure) onFailure(response.error);
      });

      rzp.open();
    } catch (err: any) {
      console.error("[Razorpay Checkout Initialization Error]:", err);
      setErrorMessage(err.message || "Could not initiate payment. Please retry.");
      setLoading(false);
      if (onFailure) onFailure(err);
    }
  };

  const displayAmount = `₹${Math.round(amountPaise / 100)}`;
  const label = buttonText || `Pay ${displayAmount} with Razorpay`;

  return (
    <div className="inline-flex flex-col items-center gap-2">
      {/* Load script via Next.js Script component */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <button
        type="button"
        disabled={loading}
        onClick={handleCheckout}
        className={`px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all disabled:opacity-60 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md active:scale-[0.98] ${className}`}
      >
        {loading ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Connecting Razorpay...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{label}</span>
          </>
        )}
      </button>

      {/* Success Banner */}
      {successMessage && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg mt-1 animate-in fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg mt-1 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
