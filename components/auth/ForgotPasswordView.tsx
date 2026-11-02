"use client";

import React, { useState, useRef } from "react";
import { Mail, ArrowRight, Loader2, AlertCircle, ArrowLeft, KeyRound } from "lucide-react";
import { validateEmail } from "@/lib/auth/validation";
import OtpVerificationView from "./OtpVerificationView";
import ResetPasswordView from "./ResetPasswordView";

interface ForgotPasswordViewProps {
  onBackToLogin: () => void;
  onResetReady?: () => void;
}

export default function ForgotPasswordView({
  onBackToLogin,
  onResetReady,
}: ForgotPasswordViewProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const isSubmittingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMessage("Please enter your registered email address.");
      isSubmittingRef.current = false;
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setErrorMessage("Please provide a valid email format.");
      isSubmittingRef.current = false;
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Preliminary rate limit check before dispatching recovery email
      const rateCheck = await fetch("/api/auth/rate-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "auth:password_recovery", identifier: cleanEmail }),
      }).catch(() => null);

      if (rateCheck && rateCheck.status === 429) {
        const errJson = await rateCheck.json().catch(() => ({}));
        setErrorMessage(
          errJson.error || "Too many password reset requests. Please wait a few minutes before trying again."
        );
        setIsLoading(false);
        isSubmittingRef.current = false;
        return;
      }

      // Dispatch 6-digit OTP via Brevo
      const otpRes = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, type: "recovery" }),
      });

      const otpData = await otpRes.json().catch(() => null);

      if (!otpRes.ok || !otpData?.ok) {
        setErrorMessage(otpData?.error || "Failed to dispatch recovery code. Please try again.");
        setIsLoading(false);
        isSubmittingRef.current = false;
        return;
      }

      setStep("otp");
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to dispatch verification code.");
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  if (step === "otp") {
    return (
      <OtpVerificationView
        email={email.trim().toLowerCase()}
        otpType="recovery"
        onSuccess={() => {
          if (onResetReady) {
            onResetReady();
          } else {
            setStep("reset");
          }
        }}
        onBack={() => setStep("email")}
      />
    );
  }

  if (step === "reset") {
    return (
      <ResetPasswordView
        onSuccess={() => {
          window.location.href = "/dashboard";
        }}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FDF0E6] text-[#C2410C] border border-[#F6D3AF] shadow-2xs mx-auto">
          <KeyRound className="w-6 h-6" strokeWidth={2} />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          Reset Your Password
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Enter your registered email address and we&apos;ll send you a six-digit verification code to reset your account.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2.5 animate-in fade-in"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <span className="font-medium leading-relaxed">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Registered Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="e.g. aspirant@gmail.com"
              className="w-full h-11 pl-10 pr-4 bg-white text-sm text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 hover:border-slate-300 focus:outline-hidden focus:border-[#C2410C] focus:ring-3 focus:ring-[#C2410C]/15 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className={`w-full py-3 px-4 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer
            ${
              isLoading || !email.trim()
                ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                : "bg-[#C2410C] hover:bg-[#9A3412] shadow-orange-500/20 active:scale-[0.99]"
            }
          `}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending verification code...</span>
            </>
          ) : (
            <>
              <span>Send Verification Code</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onBackToLogin}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to sign in</span>
        </button>
      </div>
    </div>
  );
}
