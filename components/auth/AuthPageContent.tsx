"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GraduationCap,
  ArrowRight,
  Check,
  Mail,
  Lock,
  User,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  Send,
} from "lucide-react";
import { StreamType } from "@/types";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { createClient } from "@/lib/supabase/client";
import { calculateActiveStreak } from "@/lib/gamification";
import CollegeSearchDropdown from "./CollegeSearchDropdown";
import CourseSearchDropdown from "./CourseSearchDropdown";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import OtpVerificationView, { OtpVerificationType } from "./OtpVerificationView";
import VerifyEmailView from "./VerifyEmailView";
import ForgotPasswordView from "./ForgotPasswordView";
import { DEFAULT_STREAM_SUBJECTS, getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import { validateEmail, isPasswordValid } from "@/lib/auth/validation";
import { parseAuthError } from "@/lib/auth/emailErrorHandler";

interface AuthPageContentProps {
  initialMode?: "signup" | "login";
}

type AuthViewMode = "signup" | "login" | "otp" | "forgot_password" | "verify_email";
type LoginMethod = "password" | "otp";

export default function AuthPageContent({
  initialMode = "signup",
}: AuthPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isClient = useIsClient();
  const storeUser = useTestStore((state) => state.user);
  const loginUser = useTestStore((state) => state.loginUser);

  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const queryMode = searchParams.get("mode");

  const [mode, setMode] = useState<AuthViewMode>(
    queryMode === "login" || initialMode === "login" ? "login" : "signup"
  );
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("password");
  const [step, setStep] = useState<1 | 2>(1);

  // Auth Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Aspirant Profile Fields
  const [name, setName] = useState("");
  const [age] = useState("17");
  const [dob, setDob] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [guardianEmail, setGuardianEmail] = useState("");

  const computedAge = useMemo(() => {
    if (!dob) return Number(age) || 17;
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return Number(age) || 17;
    const today = new Date();
    let calculated = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculated--;
    }
    return calculated;
  }, [dob, age]);

  const isMinor = computedAge < 18;
  const [dreamCollege, setDreamCollege] = useState("Shri Ram College of Commerce (SRCC)");
  const [targetCourse, setTargetCourse] = useState("B.Com (Hons)");
  const [stream, setStream] = useState<StreamType>("commerce");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    DEFAULT_STREAM_SUBJECTS.commerce
  );

  // OTP Configuration State
  const [otpType, setOtpType] = useState<OtpVerificationType>("signup");
  const [registrationId, setRegistrationId] = useState<string>("");
  const [unconfirmedEmailForVerification, setUnconfirmedEmailForVerification] = useState<string | null>(null);

  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isClient && storeUser?.isLoggedIn && storeUser?.name && storeUser?.id !== "guest") {
      router.replace(redirectUrl);
    }
  }, [isClient, storeUser, router, redirectUrl]);

  const handleStreamChange = (newStream: StreamType) => {
    setStream(newStream);
    setSelectedSubjects(getSubjectsForStream(newStream));
  };

  // Helper to sync user profile and log into Zustand store
  const syncProfileAndLogin = async (authUser: any) => {
    const cleanEmail = authUser.email?.trim().toLowerCase() || email.trim().toLowerCase();
    let userFullName = authUser.user_metadata?.full_name || name.trim() || cleanEmail.split("@")[0];
    let userStream: StreamType = (authUser.user_metadata?.target_stream?.toLowerCase() as StreamType) || stream;
    let userCollege = authUser.user_metadata?.target_college || dreamCollege;
    let userUniversity = authUser.user_metadata?.target_university || "Delhi University";
    let userCourse = authUser.user_metadata?.target_course || targetCourse;
    let userSelectedSubjects =
      authUser.user_metadata?.selected_subjects || selectedSubjects || DEFAULT_STREAM_SUBJECTS[userStream];
    let userXp = 0;
    let userStreak = 0;
    let userCoins = 50;

    try {
      const res = await fetch(`/api/auth/profile?id=${authUser.id}`);
      if (res.ok) {
        const json = await res.json();
        if (json?.profile) {
          if (
            json.profile.full_name &&
            json.profile.full_name !== "CUET Aspirant" &&
            json.profile.full_name !== "Aspirant" &&
            json.profile.full_name !== "Aryan 3"
          ) {
            userFullName = json.profile.full_name;
          }
          userStream = (json.profile.target_stream?.toLowerCase() as StreamType) || userStream;
          userCollege = json.profile.target_college || userCollege;
          userUniversity = json.profile.target_university || userUniversity;
          if (Array.isArray(json.profile.selected_subjects) && json.profile.selected_subjects.length > 0) {
            userSelectedSubjects = json.profile.selected_subjects;
          }
          userXp = json.profile.xp ?? 0;
          userStreak = calculateActiveStreak(
            json.profile.current_streak ?? 0,
            json.profile.last_practice_date
          );
          userCoins = json.profile.campus_coins ?? 50;
        }
      } else {
        // Idempotent auto-heal for profile
        await fetch("/api/auth/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: authUser.id,
            full_name: userFullName,
            target_stream: userStream.charAt(0).toUpperCase() + userStream.slice(1),
            target_college: userCollege,
            target_university: userUniversity,
            target_course: userCourse,
            selected_subjects: userSelectedSubjects,
            age,
          }),
        }).catch(() => {});
      }
    } catch {
      // Fallback to metadata
    }

    loginUser({
      id: authUser.id,
      name: userFullName,
      email: cleanEmail,
      age: authUser.user_metadata?.age || age,
      targetCollege: userCollege,
      targetUniversity: userUniversity,
      targetCourse: userCourse,
      preferredStream: userStream,
      selectedSubjects: userSelectedSubjects,
      dailyStreak: userStreak,
      xpPoints: userXp,
      campusCoins: userCoins,
      isLoggedIn: true,
    });

    window.location.href = redirectUrl;
  };

  // Sign In with Email & Password
  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setErrorMessage(null);
    setInfoMessage(null);
    setUnconfirmedEmailForVerification(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setErrorMessage("Please enter both your email address and password.");
      isSubmittingRef.current = false;
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setErrorMessage("Please enter a valid email address.");
      isSubmittingRef.current = false;
      return;
    }

    setIsLoading(true);

    try {
      // Preliminary rate limit verification before calling Supabase Auth API (5 failed attempts allowed)
      const rateCheck = await fetch("/api/auth/rate-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "auth:login", identifier: cleanEmail }),
      }).catch(() => null);

      if (rateCheck && rateCheck.status === 429) {
        const errJson = await rateCheck.json().catch(() => ({}));
        setErrorMessage(
          errJson.error || "Too many failed login attempts. Please wait a few minutes before trying again."
        );
        setIsLoading(false);
        isSubmittingRef.current = false;
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        const errMsg = error.message.toLowerCase();
        if (
          errMsg.includes("not confirmed") ||
          errMsg.includes("not_confirmed") ||
          errMsg.includes("not verified") ||
          errMsg.includes("not_verified")
        ) {
          setUnconfirmedEmailForVerification(cleanEmail);
          setEmail(cleanEmail);
          setMode("verify_email");
          setErrorMessage(null);
          setInfoMessage("Your email address has not been verified yet. We have sent a confirmation email to your address.");
        } else if (errMsg.includes("invalid login credentials")) {
          setErrorMessage("Invalid email or password. Please check your credentials and try again.");
        } else {
          setErrorMessage(parseAuthError(error).message);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        await syncProfileAndLogin(data.user);
      }
    } catch (err: any) {
      setErrorMessage(parseAuthError(err).message);
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  // Sign In with One-Time Code (Passwordless OTP Login)
  const handleOtpSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setErrorMessage(null);
    setInfoMessage(null);

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

    try {
      // Preliminary rate limit verification before calling Supabase Auth API (5 failed attempts allowed)
      const rateCheck = await fetch("/api/auth/rate-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "auth:login", identifier: cleanEmail }),
      }).catch(() => null);

      if (rateCheck && rateCheck.status === 429) {
        const errJson = await rateCheck.json().catch(() => ({}));
        setErrorMessage(
          errJson.error || "Too many failed login attempts. Please wait a few minutes before trying again."
        );
        setIsLoading(false);
        isSubmittingRef.current = false;
        return;
      }

      // Dispatch 6-digit OTP via Brevo
      const otpRes = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, type: "login" }),
      });
      const otpData = await otpRes.json().catch(() => null);

      if (!otpRes.ok || !otpData?.ok) {
        setErrorMessage(otpData?.error || "Failed to send verification code. Please try again.");
        setIsLoading(false);
        isSubmittingRef.current = false;
        return;
      }

      // Transition to OTP verification
      setOtpType("email");
      setMode("otp");
    } catch (err: any) {
      setErrorMessage(parseAuthError(err).message);
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  // Step 1 Validation & Email Availability Check
  const handleStep1Submit = async () => {
    if (!name.trim()) {
      setErrorMessage("Please enter your full legal name.");
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    if (!validateEmail(cleanEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!isPasswordValid(password)) {
      setErrorMessage("Please ensure your password satisfies all security requirements.");
      return;
    }
    if (!agreeTerms) {
      setErrorMessage("Please read and accept the Terms of Service and Privacy Policy to continue.");
      return;
    }
    if (isMinor) {
      if (!guardianConsent) {
        setErrorMessage("Parental / guardian consent is required under DPDP Act 2023 for candidates under 18.");
        return;
      }
      if (!guardianEmail || !validateEmail(guardianEmail.trim().toLowerCase())) {
        setErrorMessage("Please provide a valid parent or legal guardian email address.");
        return;
      }
    }

    setErrorMessage(null);
    setIsCheckingEmail(true);

    try {
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await res.json().catch(() => null);

      if (data?.exists) {
        setErrorMessage(data.message || "An account with this email already exists. Please log in instead.");
        setIsCheckingEmail(false);
        return;
      }
    } catch {
      // Allow user to proceed if non-critical network check fails
    } finally {
      setIsCheckingEmail(false);
    }

    setStep(2);
  };

  // Sign Up Initiation
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setErrorMessage(null);
    setInfoMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const finalCollege = dreamCollege;
    const finalCourse = targetCourse;
    const finalUniversity =
      finalCollege.includes("DU") || finalCollege.includes("Delhi")
        ? "Delhi University"
        : finalCollege.includes("BHU")
        ? "Banaras Hindu University"
        : finalCollege.includes("JNU")
        ? "Jawaharlal Nehru University"
        : "Central University";

    if (!cleanName) {
      setErrorMessage("Please enter your full legal name.");
      setStep(1);
      isSubmittingRef.current = false;
      return;
    }
    if (!validateEmail(cleanEmail)) {
      setErrorMessage("Please provide a valid email address.");
      setStep(1);
      isSubmittingRef.current = false;
      return;
    }
    if (!isPasswordValid(password)) {
      setErrorMessage("Please ensure your password meets all requirements (min. 8 characters, uppercase, lowercase, and number).");
      setStep(1);
      isSubmittingRef.current = false;
      return;
    }

    setIsLoading(true);

    try {
      // Preliminary rate limit verification before calling Supabase Auth API (15 signups per IP allowed)
      const rateCheck = await fetch("/api/auth/rate-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "auth:signup", identifier: cleanEmail }),
      }).catch(() => null);

      if (rateCheck && rateCheck.status === 429) {
        const errJson = await rateCheck.json().catch(() => ({}));
        setErrorMessage(
          errJson.error || "Too many signup requests. Please wait a few minutes before trying again."
        );
        setIsLoading(false);
        isSubmittingRef.current = false;
        return;
      }

      // Stage A: Dispatch OTP and register pending registration (ZERO permanent account created before OTP verification)
      const otpRes = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          type: "signup",
          password,
          fullName: cleanName,
          age: String(computedAge),
          dob: dob || undefined,
          guardianConsent,
          guardianEmail: guardianEmail ? guardianEmail.trim().toLowerCase() : undefined,
          consentAcceptedAt: new Date().toISOString(),
          consentVersion: "v1.0",
          targetCollege: finalCollege,
          targetUniversity: finalUniversity,
          targetCourse: finalCourse,
          targetStream: stream.charAt(0).toUpperCase() + stream.slice(1),
          selectedSubjects,
        }),
      });

      const otpData = await otpRes.json().catch(() => null);

      if (!otpRes.ok || !otpData?.ok) {
        if (otpRes.status === 409 || otpData?.code === "ACCOUNT_EXISTS") {
          setErrorMessage(otpData?.error || "An account with this email already exists. Please sign in instead.");
          setMode("login");
        } else {
          setErrorMessage(otpData?.error || "Failed to dispatch verification code.");
        }
        setIsLoading(false);
        isSubmittingRef.current = false;
        return;
      }

      if (otpData.registrationId) {
        setRegistrationId(otpData.registrationId);
      }

      setOtpType("signup");
      setMode("otp");
      return;
    } catch (err: any) {
      setErrorMessage(parseAuthError(err).message);
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BDE8DF]/30 via-[#F8FAFC] to-[#F0FAF7] flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="relative max-w-xl w-full mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>NTA CBT Verification</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-xl overflow-hidden">
          {/* Top Banner */}
          <div className="bg-slate-50/70 p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <Link
                href="/"
                title="Back to Homepage"
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-purple-500/20 shrink-0 hover:scale-105 transition-all cursor-pointer"
                aria-label="CUET AI-Prep Home"
              >
                <GraduationCap className="w-5 h-5 text-white" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {mode === "signup"
                      ? "Join CUET AI-Prep"
                      : mode === "forgot_password"
                      ? "Recover Account"
                      : mode === "verify_email"
                      ? "Verify Your Email"
                      : mode === "otp"
                      ? "Verify One-Time Code"
                      : "Candidate Sign In"}
                  </h1>
                  {mode === "signup" && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700">
                      Step {step} of 2
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {mode === "signup"
                    ? "Create your candidate profile to access calibrated domain mocks"
                    : mode === "forgot_password"
                    ? "Reset your password via verified email"
                    : mode === "verify_email"
                    ? "Check your inbox to verify your email and activate your account"
                    : mode === "otp"
                    ? "Enter your 6-digit verification code to proceed"
                    : "Sign in with your email or passwordless code to open your dashboard"}
                </p>
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs (Only shown in main signup / login views) */}
          {(mode === "signup" || mode === "login") && (
            <div className="grid grid-cols-2 border-b border-slate-100 bg-slate-50 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setStep(1);
                  setErrorMessage(null);
                  setInfoMessage(null);
                  setUnconfirmedEmailForVerification(null);
                }}
                className={`py-3.5 text-center transition-all cursor-pointer ${
                  mode === "signup"
                    ? "bg-white text-purple-700 font-bold border-b-2 border-purple-600 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                Join Now (New Candidate)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMessage(null);
                  setInfoMessage(null);
                  setUnconfirmedEmailForVerification(null);
                }}
                className={`py-3.5 text-center transition-all cursor-pointer ${
                  mode === "login"
                    ? "bg-white text-purple-700 font-bold border-b-2 border-purple-600 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                Sign In (Existing Candidate)
              </button>
            </div>
          )}

          {/* Error / Alert Banner */}
          {errorMessage && (
            <div className="mx-6 mt-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <div className="flex-1 space-y-1">
                <p>{errorMessage}</p>
                {errorMessage.includes("already exists") && (
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage(null);
                      setMode("login");
                    }}
                    className="inline-flex items-center gap-1.5 font-bold text-purple-600 hover:text-purple-700 hover:underline pt-1 cursor-pointer"
                  >
                    <span>Click here to Sign In with this email</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {unconfirmedEmailForVerification && (
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(unconfirmedEmailForVerification);
                      setMode("verify_email");
                      setErrorMessage(null);
                    }}
                    className="inline-flex items-center gap-1.5 font-bold text-purple-600 hover:text-purple-700 hover:underline pt-1 cursor-pointer"
                  >
                    <span>Click here to verify your email address</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {infoMessage && (
            <div className="mx-6 mt-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
              <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <p className="flex-1">{infoMessage}</p>
            </div>
          )}

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6 text-slate-800">
            {mode === "verify_email" ? (
              /* ======================================================= */
              /* VERIFY EMAIL VIEW (Confirmation link screen)           */
              /* ======================================================= */
              <VerifyEmailView
                email={email.trim().toLowerCase()}
                onBackToSignup={() => {
                  setMode("signup");
                  setStep(1);
                  setErrorMessage(null);
                }}
                onEmailChange={(newEmail: string) => {
                  setEmail(newEmail);
                }}
                initialError={errorMessage}
                initialMessage={infoMessage}
              />
            ) : mode === "otp" ? (
              /* ======================================================= */
              /* OTP VERIFICATION VIEW                                   */
              /* ======================================================= */
              <OtpVerificationView
                email={email.trim().toLowerCase()}
                otpType={otpType}
                registrationId={registrationId}
                onSuccess={async (data) => {
                  if (data.user) {
                    await syncProfileAndLogin(data.user);
                  }
                }}
                onBack={() => {
                  setMode(otpType === "signup" ? "signup" : "login");
                }}
              />
            ) : mode === "forgot_password" ? (
              /* ======================================================= */
              /* FORGOT PASSWORD VIEW                                    */
              /* ======================================================= */
              <ForgotPasswordView
                onBackToLogin={() => {
                  setMode("login");
                  setErrorMessage(null);
                }}
                onResetReady={() => {
                  router.push("/reset-password");
                }}
              />
            ) : mode === "login" ? (
              /* ======================================================= */
              /* LOGIN FORM (Tabs: Password / One-Time Code)             */
              /* ======================================================= */
              <div className="space-y-5">
                {/* Login Method Subtabs */}
                <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod("password");
                      setErrorMessage(null);
                    }}
                    className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
                      loginMethod === "password"
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Password Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod("otp");
                      setErrorMessage(null);
                    }}
                    className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
                      loginMethod === "otp"
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Sign In with One-Time Code
                  </button>
                </div>

                {loginMethod === "password" ? (
                  <form onSubmit={handlePasswordSignIn} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Registered Email Address</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aspirant@cuet-prep.in"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Password</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setMode("forgot_password");
                            setErrorMessage(null);
                          }}
                          className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full pl-3.5 pr-11 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Target DU College Search */}
                    <CollegeSearchDropdown
                      selectedCollege={dreamCollege}
                      onSelectCollege={(collegeName) => setDreamCollege(collegeName)}
                      label="Target DU College (Search & Select)"
                      placeholder="Search 90+ DU colleges (e.g. SRCC, Hindu, Venky)..."
                    />

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#18262E] hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Verifying credentials...</span>
                          </>
                        ) : (
                          <>
                            <span>Sign In & Open Dashboard</span>
                            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* PASSWORDLESS OTP SIGN IN */
                  <form onSubmit={handleOtpSignIn} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Registered Email Address</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aspirant@cuet-prep.in"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                      />
                      <p className="text-[11px] text-slate-500 pt-0.5">
                        We will send a 6-digit one-time code to this address for instant, passwordless sign-in.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading || !email.trim()}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#18262E] hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Dispatching code...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send One-Time Code</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* ======================================================= */
              /* SIGNUP FORM (Two-Step Flow)                             */
              /* ======================================================= */
              <form onSubmit={handleSignUp} className="space-y-5">
                {step === 1 ? (
                  /* STEP 1: Basic Identity & Credentials */
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>Full Legal Name</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aspirant@cuet-prep.in"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Password (min. 8 characters)</span>
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a strong password"
                          className="w-full pl-3.5 pr-11 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>

                      {/* Password Requirements Checklist */}
                      <PasswordStrengthIndicator password={password} />
                    </div>

                    {/* Date of Birth & Age Verification */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Date of Birth
                        </label>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {dob ? `Age: ${computedAge} ${isMinor ? "(Minor Candidate)" : "(Adult Candidate)"}` : "Required for DPDP verification"}
                        </span>
                      </div>
                      <input
                        type="date"
                        value={dob}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all text-slate-700"
                      />
                    </div>

                    {/* Minor Guardian Consent Card (DPDP Act 2023 Section 9) */}
                    {isMinor && (
                      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 space-y-3 text-xs animate-in fade-in">
                        <div className="flex items-start gap-2 font-bold text-amber-900">
                          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>Parental / Guardian Consent Notice (DPDP Act 2023)</span>
                        </div>
                        <p className="text-[11px] text-amber-800 leading-relaxed font-normal">
                          Because you are under 18 years of age, Indian data protection law (Section 9 of the Digital Personal Data Protection Act, 2023) requires verifiable parent or legal guardian consent before registering.
                        </p>
                        <label className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={guardianConsent}
                            onChange={(e) => setGuardianConsent(e.target.checked)}
                            className="mt-0.5 rounded border-amber-300 text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer shrink-0"
                          />
                          <span className="text-xs text-amber-950 font-medium leading-snug">
                            I confirm that my parent or legal guardian has reviewed and consented to my registration.
                          </span>
                        </label>
                        <div className="space-y-1 pt-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                            Parent / Legal Guardian Email Address
                          </label>
                          <input
                            type="email"
                            value={guardianEmail}
                            onChange={(e) => setGuardianEmail(e.target.value)}
                            placeholder="guardian@example.com"
                            className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-xs bg-white text-slate-800 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 outline-none"
                          />
                          <span className="text-[10px] text-amber-700 block">
                            A notification of consent terms may be delivered to this guardian address.
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Mandatory Unchecked Terms & Privacy Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer shrink-0"
                        />
                        <span className="text-xs text-slate-600 leading-snug font-normal">
                          I agree to the{" "}
                          <Link href="/terms" target="_blank" className="font-semibold text-purple-700 underline hover:text-purple-800">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" target="_blank" className="font-semibold text-purple-700 underline hover:text-purple-800">
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>
                    </div>

                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium space-y-2 animate-in fade-in">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span className="font-semibold text-amber-950">{errorMessage}</span>
                        </div>
                        {errorMessage.toLowerCase().includes("already exists") && (
                          <button
                            type="button"
                            onClick={() => {
                              setErrorMessage(null);
                              setMode("login");
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-[#18262E] text-white font-bold hover:bg-purple-700 text-center flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                          >
                            <span>Click Here to Sign In to Your Existing Account</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={handleStep1Submit}
                        disabled={isCheckingEmail}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#18262E] hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {isCheckingEmail ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin stroke-[2.2]" />
                            <span>Checking email availability...</span>
                          </>
                        ) : (
                          <>
                            <span>Continue to Target & Subjects</span>
                            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* STEP 2: Academic Targeting & Domain Configuration */
                  <div className="space-y-5 animate-in fade-in duration-150">
                    {/* Stream Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Academic Stream
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["science", "commerce", "humanities"] as StreamType[]).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleStreamChange(st)}
                            className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all cursor-pointer ${
                              stream === st
                                ? "bg-purple-50 border-purple-300 text-purple-900 shadow-xs font-bold"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Target DU College Search */}
                    <CollegeSearchDropdown
                      selectedCollege={dreamCollege}
                      onSelectCollege={(collegeName) => setDreamCollege(collegeName)}
                      label="Target DU College"
                      placeholder="Search 90+ DU colleges (e.g. SRCC, Hindu)..."
                    />

                    {/* Target Course Search */}
                    <CourseSearchDropdown
                      selectedCourse={targetCourse}
                      onSelectCourse={(courseName) => setTargetCourse(courseName)}
                      label="Target Undergrad Course"
                      placeholder="Search courses (e.g. B.Com Hons, B.Sc Physics)..."
                    />

                    {/* Selected Domain Subjects */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Selected Domain Subjects ({selectedSubjects.length})
                        </label>
                        <span className="text-[11px] text-slate-400">Customizable in Dashboard</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                        {selectedSubjects.map((sub) => (
                          <span
                            key={sub}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
                          >
                            <Check className="w-3 h-3 text-purple-600 stroke-[2.5]" />
                            <span>{sub}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-3.5 px-4 rounded-xl bg-[#18262E] hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Creating account & sending confirmation...</span>
                          </>
                        ) : (
                          <>
                            <span>Create Account & Verify Email</span>
                            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
