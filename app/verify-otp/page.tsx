"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";
import OtpVerificationView, { OtpVerificationType } from "@/components/auth/OtpVerificationView";
import { useTestStore } from "@/lib/store/useTestStore";
import { validateEmail } from "@/lib/auth/validation";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginUser = useTestStore((state) => state.loginUser);

  const initialEmail = searchParams.get("email") || "";
  const initialType = (searchParams.get("type") as OtpVerificationType) || "signup";
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState(initialEmail);
  const [hasEnteredEmail, setHasEnteredEmail] = useState(Boolean(initialEmail));
  const [emailInputError, setEmailInputError] = useState<string | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!validateEmail(clean)) {
      setEmailInputError("Please provide a valid email address.");
      return;
    }
    setEmailInputError(null);
    setHasEnteredEmail(true);
  };

  const handleSuccess = async (data: { user: any; session: any }) => {
    const user = data.user;
    if (user) {
      let fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "CUET Aspirant";
      let targetStream = user.user_metadata?.target_stream || "Science";
      let targetCollege = user.user_metadata?.target_college || "SRCC";
      let targetUniversity = user.user_metadata?.target_university || "Delhi University";
      let targetCourse = user.user_metadata?.target_course || "Undergraduate Program";
      let selectedSubjects = user.user_metadata?.selected_subjects || [];

      try {
        const res = await fetch(`/api/auth/profile?id=${user.id}`);
        if (res.ok) {
          const json = await res.json();
          if (json?.profile) {
            fullName = json.profile.full_name || fullName;
            targetStream = json.profile.target_stream || targetStream;
            targetCollege = json.profile.target_college || targetCollege;
            targetUniversity = json.profile.target_university || targetUniversity;
            selectedSubjects = json.profile.selected_subjects || selectedSubjects;
          }
        }
      } catch {}

      loginUser({
        id: user.id,
        name: fullName,
        email: user.email,
        targetCollege,
        targetUniversity,
        targetCourse,
        preferredStream: targetStream.toLowerCase() as any,
        selectedSubjects,
        isLoggedIn: true,
      });

      router.replace(redirectUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="relative max-w-md w-full mx-auto space-y-6">
        {/* Navigation */}
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
            <span>NTA CBT Verification</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-6 sm:p-8">
          {hasEnteredEmail ? (
            <OtpVerificationView
              email={email.trim().toLowerCase()}
              otpType={initialType}
              onSuccess={handleSuccess}
              onBack={() => setHasEnteredEmail(false)}
            />
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Enter Your Email</h2>
                <p className="text-xs text-slate-500">
                  Please enter the email address you registered with to verify your six-digit OTP.
                </p>
              </div>

              {emailInputError && (
                <p className="text-xs text-rose-600 font-medium bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                  {emailInputError}
                </p>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aspirant@example.com"
                  className="w-full h-11 px-3.5 bg-slate-50 text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all"
              >
                Continue to OTP Verification
              </button>
            </form>
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
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
