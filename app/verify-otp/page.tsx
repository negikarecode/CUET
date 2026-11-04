"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import OtpVerificationView, { OtpVerificationType } from "@/components/auth/OtpVerificationView";
import { validateEmail } from "@/lib/auth/validation";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryEmail = searchParams.get("email") || "";
  const queryType = (searchParams.get("type") || "signup") as OtpVerificationType;

  const [email, setEmail] = useState(queryEmail);
  const [manualEmailInput, setManualEmailInput] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const handleManualEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = manualEmailInput.trim().toLowerCase();
    if (!validateEmail(clean)) {
      setInputError("Please enter a valid email address.");
      return;
    }
    setInputError(null);
    setEmail(clean);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(194,65,12,0.08),rgba(255,255,255,0))] pointer-events-none" />

      <div className="relative max-w-md w-full mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/80 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Candidate Verification</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden p-6 sm:p-8">
          {email ? (
            <OtpVerificationView
              email={email}
              otpType={queryType}
              onSuccess={() => {
                router.push("/dashboard");
              }}
              onBack={() => setEmail("")}
            />
          ) : (
            <div className="space-y-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto border border-purple-200/80">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">Enter Your Registered Email</h2>
                <p className="text-xs text-slate-600">
                  Enter your email address to verify your account with a six-digit verification code.
                </p>
              </div>

              {inputError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-left">
                  {inputError}
                </div>
              )}

              <form onSubmit={handleManualEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={manualEmailInput}
                  onChange={(e) => setManualEmailInput(e.target.value)}
                  placeholder="aspirant@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#18262E] hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
