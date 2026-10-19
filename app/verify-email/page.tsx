"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import VerifyEmailView from "@/components/auth/VerifyEmailView";
import { createClient } from "@/lib/supabase/client";
import { validateEmail } from "@/lib/auth/validation";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryEmail = searchParams.get("email") || "";
  const queryError = searchParams.get("error");
  const queryMessage = searchParams.get("message");

  const [email, setEmail] = useState(queryEmail);
  const [manualEmailInput, setManualEmailInput] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      // Check if user session has an email
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => {
        if (data.user?.email) {
          setEmail(data.user.email);
        }
      });
    }
  }, [email]);

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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="relative max-w-md w-full mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>NTA Candidate Security</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-6 sm:p-8">
          {email ? (
            <VerifyEmailView
              email={email}
              initialError={queryError}
              initialMessage={queryMessage}
              onBackToSignup={() => router.push("/signup")}
            />
          ) : (
            <div className="space-y-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">Check Your Email</h2>
                <p className="text-xs text-slate-600">
                  Enter your registered email address to receive or resend your candidate verification link.
                </p>
              </div>

              {inputError && (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs text-left">
                  {inputError}
                </div>
              )}

              <form onSubmit={handleManualEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={manualEmailInput}
                  onChange={(e) => setManualEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
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

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
