"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
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
  Sparkles,
} from "lucide-react";
import { StreamType } from "@/types";
import { useTestStore } from "@/lib/store/useTestStore";
import { createClient } from "@/lib/supabase/client";
import { calculateActiveStreak } from "@/lib/gamification";
import CascadingTargetSelector from "@/components/ui/CascadingTargetSelector";
import { useTargetSelection } from "@/lib/hooks/useTargetSelection";
import { DEFAULT_STREAM_SUBJECTS, getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import OtpVerificationView, { OtpVerificationType } from "./OtpVerificationView";
import VerifyEmailView from "./VerifyEmailView";
import { validateEmail, isPasswordValid } from "@/lib/auth/validation";
import { parseAuthError } from "@/lib/auth/emailErrorHandler";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signup" | "login";
  redirectUrl?: string;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  initialMode = "signup",
  redirectUrl = "/dashboard",
}: OnboardingModalProps) {
  const loginUser = useTestStore((state) => state.loginUser);

  const [mode, setMode] = useState<"signup" | "login" | "otp" | "verify_email">(initialMode);
  const [otpType, setOtpType] = useState<OtpVerificationType>("signup");
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  // Auth Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Aspirant Profile Fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("17");
  const [dob, setDob] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [guardianEmail, setGuardianEmail] = useState("");

  const computedAge = React.useMemo(() => {
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

  const isMinor = computedAge < 18 || age === "17";

  // Cascading Target Selection
  const targetSelection = useTargetSelection({
    initialCollege: "Shri Ram College of Commerce (SRCC)",
    initialCourse: "B.Com. (Hons.)",
    initialStream: "Commerce",
  });

  const stream = (targetSelection.stream.toLowerCase() as StreamType) || "commerce";
  const selectedSubjects = getSubjectsForStream(stream);

  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);

  // Sync mode when initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
    setStep(1);
    setRegistrationId(null);
    setErrorMessage(null);
    setInfoMessage(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  // Synchronize authenticated user profile and establish application session
  const syncProfileAndLogin = async (authUser: any, emailFallback?: string) => {
    const cleanEmail = (authUser.email || emailFallback || email).trim().toLowerCase();
    let userFullName = authUser.user_metadata?.full_name || cleanEmail.split("@")[0];
    let userStream: StreamType = (authUser.user_metadata?.target_stream?.toLowerCase() as StreamType) || "commerce";
    let userCollege = authUser.user_metadata?.target_college || "Central University";
    let userUniversity = authUser.user_metadata?.target_university || "Delhi University";
    let userCourse = authUser.user_metadata?.target_course || "Undergraduate Program";
    let userSelectedSubjects = authUser.user_metadata?.selected_subjects || DEFAULT_STREAM_SUBJECTS[userStream] || DEFAULT_STREAM_SUBJECTS.commerce;
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
        // Auto-heal missing profile row in public.profiles
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
            age: authUser.user_metadata?.age || "18",
          }),
        }).catch(() => {});
      }
    } catch {
      // Profile fallback to metadata
    }

    loginUser({
      id: authUser.id,
      name: userFullName,
      email: cleanEmail,
      age: authUser.user_metadata?.age || "18",
      targetCollege: userCollege,
      targetUniversity: userUniversity,
      targetCourse: userCourse,
      preferredStream: userStream,
      selectedSubjects: userSelectedSubjects,
      dailyStreak: userStreak,
      xpPoints: userXp,
      campusCoins: userCoins,
    });

    onClose();
    window.location.href = redirectUrl || "/dashboard";
  };

  // Sign In with real Supabase Auth credentials
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setErrorMessage(null);
    setInfoMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setErrorMessage("Please enter both email and password.");
      isSubmittingRef.current = false;
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        const errMsg = error.message.toLowerCase();
        if (errMsg.includes("email not confirmed") || errMsg.includes("not confirmed") || errMsg.includes("not verified")) {
          setUnconfirmedEmail(cleanEmail);
          setEmail(cleanEmail);
          setMode("verify_email");
          setErrorMessage(null);
          setInfoMessage("Your email address has not been verified yet. We have sent a confirmation email to your address.");
        } else {
          setErrorMessage(parseAuthError(error).message);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        await syncProfileAndLogin(data.user, cleanEmail);
      }
    } catch (err: any) {
      setErrorMessage(parseAuthError(err).message);
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  // Step 1 Validation & Email Availability Check
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Please enter your full legal name.");
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    if (!validateEmail(cleanEmail)) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (!isPasswordValid(password)) {
      setErrorMessage("Password must be at least 8 characters and include uppercase, lowercase, and a number.");
      return;
    }
    if (!agreeTerms) {
      setErrorMessage("Please accept the Terms of Service and Privacy Policy to continue.");
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
      // Allow proceeding if network check is unavailable
    } finally {
      setIsCheckingEmail(false);
    }

    setStep(2);
  };

  // Sign Up Initiation (Stage A: Zero Supabase account created before OTP verification)
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setErrorMessage(null);
    setInfoMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const finalCollege = targetSelection.collegeName;
    const finalCourse = targetSelection.courseName;
    const finalUniversity = targetSelection.derivedUniversity;

    if (!targetSelection.isValidPair) {
      setErrorMessage("Please select a valid college and degree program combination.");
      setStep(2);
      isSubmittingRef.current = false;
      return;
    }

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
      setErrorMessage("Password must be at least 8 characters and include uppercase, lowercase, and a number.");
      setStep(1);
      isSubmittingRef.current = false;
      return;
    }

    setIsLoading(true);

    try {
      // Preliminary rate limit verification before calling OTP endpoint
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

      // Stage A: Dispatch OTP and stage pending registration (ZERO permanent account created before OTP verification)
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
          setErrorMessage(otpData?.error || "An account with this email already exists. Please log in instead.");
          setMode("login");
        } else {
          setErrorMessage(otpData?.error || "Failed to dispatch verification code. Please try again.");
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-slate-50/80 p-5 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              onClick={onClose}
              title="Go to Homepage"
              className="w-9 h-9 rounded-xl bg-[#18262E] text-white flex items-center justify-center shadow-xs hover:scale-105 transition-transform cursor-pointer shrink-0"
              aria-label="CUET AI-Prep Home"
            >
              <GraduationCap className="w-4 h-4 stroke-[2]" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 tracking-tight">
                  {mode === "signup"
                    ? "Join CUET AI-Prep"
                    : mode === "login"
                    ? "Candidate Sign In"
                    : mode === "otp"
                    ? "Verify One-Time Code"
                    : "Verify Your Email"}
                </span>
                {mode === "signup" && (
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700">
                    Step {step} of 2
                  </span>
                )}
                {mode === "otp" && (
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700">
                    Verification
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-normal">
                NTA-Style CBT Simulator & University Cutoff Calibration
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-xs transition-all cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        {(mode === "signup" || mode === "login") && (
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/50 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setStep(1);
                setRegistrationId(null);
                setErrorMessage(null);
              }}
              className={`py-3 text-center border-r border-slate-200 transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-white text-purple-700 font-bold border-b-2 border-purple-700"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Join Now (New Candidate)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setRegistrationId(null);
                setErrorMessage(null);
              }}
              className={`py-3 text-center transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-purple-700 font-bold border-b-2 border-purple-700"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sign In (Existing Candidate)
            </button>
          </div>
        )}

        {/* Error / Alert Banner */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2 shadow-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 stroke-[2]" />
            <div className="flex-1 space-y-1.5">
              <p>{errorMessage}</p>
              {errorMessage.includes("already exists") && (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setMode("login");
                  }}
                  className="inline-flex items-center gap-1 font-bold text-purple-600 hover:text-purple-700 hover:underline pt-0.5 cursor-pointer"
                >
                  <span>Click here to Sign In with this email</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {unconfirmedEmail && (
                <button
                  type="button"
                  onClick={() => {
                    setEmail(unconfirmedEmail);
                    setMode("verify_email");
                    setErrorMessage(null);
                  }}
                  className="inline-flex items-center gap-1 font-bold text-purple-600 hover:text-purple-700 hover:underline pt-0.5 cursor-pointer"
                >
                  <span>Click here to verify your email address</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {infoMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-start gap-2 shadow-xs animate-in fade-in">
            <Check className="w-4 h-4 shrink-0 mt-0.5 stroke-[2]" />
            <p className="flex-1">{infoMessage}</p>
          </div>
        )}

        {/* Modal Body / Scrollable Form */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-900">
          {mode === "verify_email" ? (
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
            <OtpVerificationView
              email={email.trim().toLowerCase()}
              otpType={otpType}
              registrationId={registrationId || undefined}
              onSuccess={async (data) => {
                if (data.user) {
                  await syncProfileAndLogin(data.user);
                }
              }}
              onBack={() => setMode(otpType === "signup" ? "signup" : "login")}
            />
          ) : mode === "login" ? (
            /* ======================================================= */
            /* LOGIN FORM (Authentic Supabase Authentication)           */
            /* ======================================================= */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-600" />
                  <span>Registered Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aspirant@cuet-prep.in"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-sm bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-500/20 shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-purple-600" />
                  <span>Password</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-3.5 pr-11 py-2.5 rounded-xl border border-slate-200 font-medium text-sm bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-500/20 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[2]" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-[#18262E] hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying candidate credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In & Open Dashboard</span>
                      <ArrowRight className="w-4 h-4 stroke-[2]" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setStep(1);
                  }}
                  className="text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Don&apos;t have an account? Join Now & Create Profile
                </button>
              </div>
            </form>
          ) : (
            /* ======================================================= */
            /* SIGN UP FLOW (Step 1: Account Info, Step 2: Academics)   */
            /* ======================================================= */
            <form onSubmit={step === 1 ? handleStep1Submit : handleSignUp} className="space-y-5">
              {step === 1 ? (
                <>
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-600" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aryan Gupta"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-sm bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-500/20 shadow-xs"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-purple-600" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aspirant@cuet-prep.in"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-sm bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-500/20 shadow-xs"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-purple-600" />
                      <span>Password (Min 6 Characters)</span>
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-3.5 pr-11 py-2.5 rounded-xl border border-slate-200 font-medium text-sm bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-500/20 shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 stroke-[2]" />
                        ) : (
                          <Eye className="w-4 h-4 stroke-[2]" />
                        )}
                      </button>
                    </div>
                    <PasswordStrengthIndicator password={password} />
                  </div>

                  {/* Candidate Status / Age */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Candidate Status & Age
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: "17", label: "17 (Class 12th)" },
                        { val: "18", label: "18 (Class 12th)" },
                        { val: "19", label: "18+ (Dropper)" },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setAge(item.val)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                            age === item.val
                              ? "bg-purple-50 border-purple-200 text-purple-700"
                              : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date of Birth Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Date of Birth (Optional)
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {dob ? `Age: ${computedAge} ${isMinor ? "(Minor Candidate)" : "(Adult Candidate)"}` : "Verification under DPDP"}
                      </span>
                    </div>
                    <input
                      type="date"
                      value={dob}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-sm bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-500/20 shadow-xs text-slate-700"
                    />
                  </div>

                  {/* Minor Guardian Consent Card (DPDP Act 2023 Section 9) */}
                  {isMinor && (
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-3 text-xs animate-in fade-in">
                      <div className="flex items-start gap-2 font-bold text-amber-900">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Parental / Guardian Consent Notice (DPDP Act 2023)</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed font-normal">
                        Because you are under 18 years of age, Indian data protection law (Section 9 of the DPDP Act 2023) requires verifiable parent or legal guardian consent before registration.
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
                          className="w-full py-2.5 px-3 rounded-lg bg-[#18262E] text-white font-bold hover:bg-purple-700 text-center flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                        >
                          <span>Click Here to Sign In to Your Existing Account</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isCheckingEmail}
                      className="w-full py-3 px-4 rounded-xl bg-[#18262E] hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isCheckingEmail ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Checking email availability...</span>
                        </>
                      ) : (
                        <>
                          <span>Proceed to Dream College & Stream</span>
                          <ArrowRight className="w-4 h-4 stroke-[2]" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Cascading Target Selector: College + Degree Program + Stream + Derived University */}
                  <CascadingTargetSelector
                    targetSelection={targetSelection}
                    showStreamButtons={true}
                    showDerivedUniversity={true}
                    showUnavailableToggle={false}
                    collegeLabelPrefix="Dream Target College"
                    courseLabelPrefix="Target Degree Program"
                    collegePlaceholder="Search DU & Central colleges (e.g. SRCC, Hindu, Venky)..."
                    coursePlaceholder="Search degree programs (e.g. B.Com. (Hons.), Economics)..."
                  />

                  {/* Auto-Assigned Stream Domain Subjects */}
                  <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>Stream Domain Subjects (Auto-Calibrated)</span>
                      </label>
                      <span className="text-[10px] font-medium bg-white px-2.5 py-0.5 rounded-full border border-slate-200 text-slate-600 shadow-xs">
                        {selectedSubjects.length} Domains
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSubjects.map((subj) => (
                        <span
                          key={subj}
                          className="px-2.5 py-1 text-xs font-semibold bg-white text-slate-800 border border-slate-200 rounded-xl shadow-xs"
                        >
                          {subj}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] font-normal text-slate-500">
                      Mock tests, diagnostic radars, and daily drills are calibrated automatically for your {stream} stream.
                    </p>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="pt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-xs cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !targetSelection.isValidPair}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 ${
                        targetSelection.isValidPair && !isLoading
                          ? "bg-[#18262E] hover:bg-purple-700 text-white cursor-pointer"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-70"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Getting ready to prepare you — your challenge is upcoming...</span>
                        </>
                      ) : (
                        <>
                          <span>Complete Sign Up & Enter Dashboard</span>
                          <ArrowRight className="w-4 h-4 stroke-[2]" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
