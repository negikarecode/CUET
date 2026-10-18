"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ShieldCheck,
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  RotateCw,
} from "lucide-react";
import OtpInput from "./OtpInput";
import { maskEmail } from "@/lib/auth/validation";
import { createClient } from "@/lib/supabase/client";

export type OtpVerificationType = "signup" | "email" | "recovery";

interface OtpVerificationViewProps {
  email: string;
  otpType?: OtpVerificationType;
  onSuccess: (data: { user: any; session: any }) => void;
  onBack?: () => void;
  metadata?: Record<string, any>;
}

const RESEND_COOLDOWN_SECONDS = 60;
const MAX_RESEND_ATTEMPTS = 5;

export default function OtpVerificationView({
  email,
  otpType = "signup",
  onSuccess,
  onBack,
  metadata: _metadata,
}: OtpVerificationViewProps) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [resendCount, setResendCount] = useState(0);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = useCallback(
    async (codeToVerify?: string) => {
      const token = (codeToVerify || otp).trim();
      if (token.length !== 6) {
        setErrorMessage("Please enter the complete 6-digit verification code.");
        return;
      }

      setErrorMessage(null);
      setSuccessMessage(null);
      setIsVerifying(true);

      try {
        const supabase = createClient();
        const cleanEmail = email.trim().toLowerCase();

        // Supabase Auth verifyOtp call
        const { data, error } = await supabase.auth.verifyOtp({
          email: cleanEmail,
          token,
          type: otpType as any,
        });

        if (error) {
          // If signup OTP fails, attempt 'email' type as fallback in case of template configuration
          if (otpType === "signup") {
            const fallback = await supabase.auth.verifyOtp({
              email: cleanEmail,
              token,
              type: "email",
            });
            if (!fallback.error && fallback.data.user) {
              setSuccessMessage("Verification successful! Initializing your workspace...");
              onSuccess({ user: fallback.data.user, session: fallback.data.session });
              return;
            }
          }

          if (error.message.toLowerCase().includes("expired")) {
            setErrorMessage("This verification code has expired. Please request a new code.");
          } else if (error.message.toLowerCase().includes("invalid")) {
            setErrorMessage("Incorrect 6-digit code. Please verify the numbers and try again.");
          } else {
            setErrorMessage(error.message || "Verification failed. Please try again.");
          }
          return;
        }

        if (data.user) {
          setSuccessMessage("Verification successful! Initializing your workspace...");
          onSuccess({ user: data.user, session: data.session });
        } else {
          setErrorMessage("Verification succeeded, but no session was returned. Please try logging in.");
        }
      } catch (err: any) {
        setErrorMessage(err?.message || "A network error occurred. Please check your connection.");
      } finally {
        setIsVerifying(false);
      }
    },
    [otp, email, otpType, onSuccess]
  );

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;

    if (resendCount >= MAX_RESEND_ATTEMPTS) {
      setErrorMessage("Maximum resend attempts reached. Please wait a few minutes before trying again.");
      return;
    }

    setIsResending(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const supabase = createClient();
      const cleanEmail = email.trim().toLowerCase();

      let error = null;

      if (otpType === "signup") {
        const res = await supabase.auth.resend({
          type: "signup",
          email: cleanEmail,
        });
        error = res.error;
      } else if (otpType === "recovery") {
        const res = await supabase.auth.resetPasswordForEmail(cleanEmail);
        error = res.error;
      } else {
        const res = await supabase.auth.signInWithOtp({
          email: cleanEmail,
          options: { shouldCreateUser: false },
        });
        error = res.error;
      }

      if (error) {
        if (error.message.toLowerCase().includes("rate limit") || error.status === 429) {
          setErrorMessage("Security rate limit reached. Please wait a moment before requesting another code.");
          setCooldown(60);
        } else {
          setErrorMessage(error.message || "Failed to resend code. Please try again.");
        }
        return;
      }

      setResendCount((prev) => prev + 1);
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setSuccessMessage("A fresh 6-digit verification code has been dispatched to your email.");
      setOtp("");
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to resend code. Please check your internet connection.");
    } finally {
      setIsResending(false);
    }
  };

  const maskedDisplayEmail = maskEmail(email);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs mx-auto">
          <Mail className="w-6 h-6" strokeWidth={2} />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          {otpType === "recovery"
            ? "Verify Password Reset Code"
            : otpType === "email"
            ? "Sign in with One-Time Code"
            : "Verify Your Email Address"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          We have sent a six-digit verification code to{" "}
          <span className="font-semibold text-slate-800 font-mono">
            {maskedDisplayEmail}
          </span>
        </p>
      </div>

      {/* Error or Success Notice */}
      {errorMessage && (
        <div
          role="alert"
          className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2.5 animate-in fade-in"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <span className="font-medium leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2.5 animate-in fade-in"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <span className="font-medium leading-relaxed">{successMessage}</span>
        </div>
      )}

      {/* 6-Digit OTP Input */}
      <div className="py-2">
        <OtpInput
          value={otp}
          onChange={(val) => {
            setOtp(val);
            if (errorMessage) setErrorMessage(null);
          }}
          onComplete={(completedOtp) => {
            handleVerify(completedOtp);
          }}
          disabled={isVerifying}
          hasError={Boolean(errorMessage)}
          autoFocus={true}
        />
      </div>

      {/* Submit Action */}
      <button
        type="button"
        onClick={() => handleVerify()}
        disabled={isVerifying || otp.length !== 6}
        className={`w-full py-3 px-4 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer
          ${
            isVerifying || otp.length !== 6
              ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25 active:scale-[0.99]"
          }
        `}
      >
        {isVerifying ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Verifying code...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4" />
            <span>Verify & Continue</span>
          </>
        )}
      </button>

      {/* Resend & Cooldown Footer */}
      <div className="pt-2 flex flex-col items-center justify-center gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span>Didn&apos;t receive the code?</span>
          {cooldown > 0 ? (
            <span className="font-semibold text-slate-400 font-mono">
              Resend in {cooldown}s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
            >
              {isResending ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Resending...</span>
                </>
              ) : (
                <>
                  <RotateCw className="w-3 h-3" />
                  <span>Resend code</span>
                </>
              )}
            </button>
          )}
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Use a different email address</span>
          </button>
        )}
      </div>
    </div>
  );
}
