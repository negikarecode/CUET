"use client";

import React, { useState, useEffect, useRef } from "react";
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
}

export default function OnboardingModal({
  isOpen,
  onClose,
  initialMode = "signup",
}: OnboardingModalProps) {
  const loginUser = useTestStore((state) => state.loginUser);

  const [mode, setMode] = useState<"signup" | "login" | "otp" | "verify_email">(initialMode);
  const [otpType] = useState<OtpVerificationType>("signup");
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  // Auth Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Aspirant Profile Fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("17");

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);

  // Sync mode when initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
    setStep(1);
    setErrorMessage(null);
    setInfoMessage(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

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
        let userFullName = data.user.user_metadata?.full_name || cleanEmail.split("@")[0];
        let userStream: StreamType = (data.user.user_metadata?.target_stream?.toLowerCase() as StreamType) || "commerce";
        let userCollege = data.user.user_metadata?.target_college || "Central University";
        let userUniversity = data.user.user_metadata?.target_university || "Delhi University";
        let userCourse = data.user.user_metadata?.target_course || "Undergraduate Program";
        let userSelectedSubjects = data.user.user_metadata?.selected_subjects || DEFAULT_STREAM_SUBJECTS[userStream] || DEFAULT_STREAM_SUBJECTS.commerce;
        let userXp = 0;
        let userStreak = 1;
        let userCoins = 0;

        try {
          const res = await fetch(`/api/auth/profile?id=${data.user.id}`);
          if (res.ok) {
            const json = await res.json();
            if (json.profile) {
              userFullName = json.profile.full_name || userFullName;
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
              userCoins = json.profile.campus_coins ?? 0;
            }
          } else {
            // Auto-heal missing profile row in public.profiles
            fetch("/api/auth/profile", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: data.user.id,
                full_name: userFullName,
                target_stream: userStream.charAt(0).toUpperCase() + userStream.slice(1),
                target_college: userCollege,
                target_university: userUniversity,
                target_course: userCourse,
                selected_subjects: userSelectedSubjects,
                age: data.user.user_metadata?.age || "18",
              }),
            }).catch(() => {});
          }
        } catch {
          // Profile fallback to metadata
        }

        loginUser({
          id: data.user.id,
          name: userFullName,
          email: cleanEmail,
          age: data.user.user_metadata?.age || "18",
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
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setErrorMessage(parseAuthError(err).message);
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  // Sign Up with real Supabase Auth credentials & store profile in Supabase
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
      const supabase = createClient();

      // Ensure any previous session is cleared before new signup
      try {
        await supabase.auth.signOut();
      } catch {
        // Ignore if already signed out
      }

      const origin =
        typeof window !== "undefined" && window.location.origin
          ? window.location.origin
          : process.env.NEXT_PUBLIC_SITE_URL || "https://cuetmate.vercel.app";
      const emailRedirectTo = `${origin}/auth/confirm?next=%2Fdashboard`;

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo,
          data: {
            full_name: cleanName,
            age,
            target_college: finalCollege,
            target_university: finalUniversity,
            target_course: finalCourse,
            target_stream: stream.charAt(0).toUpperCase() + stream.slice(1),
            selected_subjects: selectedSubjects,
          },
        },
      });

      if (error) {
        setErrorMessage(parseAuthError(error).message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        if (data.user.identities && data.user.identities.length === 0) {
          setErrorMessage("An account with this email already exists. Please sign in instead.");
          setMode("login");
          setIsLoading(false);
          return;
        }

        if (!data.user.email_confirmed_at && !data.session) {
          setMode("verify_email");
          setIsLoading(false);
          return;
        }

        const createdUserId = data.user.id;

        // Persist authentic profile to Supabase database via server route
        try {
          await fetch("/api/auth/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: createdUserId,
              fullName: cleanName,
              targetStream: stream,
              targetUniversity: finalUniversity,
              targetCollege: finalCollege,
              targetCourse: finalCourse,
              selectedSubjects,
            }),
          });
        } catch (profileErr) {
          console.warn("[Profile Persistence Notice]:", profileErr);
        }

        // Initialize clean Zustand store session
        loginUser({
          id: createdUserId,
          name: cleanName,
          email: cleanEmail,
          age,
          targetCollege: finalCollege,
          targetUniversity: finalUniversity,
          targetCourse: finalCourse,
          preferredStream: stream,
          selectedSubjects,
          dailyStreak: 0,
          xpPoints: 0,
          campusCoins: 0,
        });

        onClose();
        window.location.href = "/dashboard";
      }
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 tracking-tight">
                  {mode === "signup" ? "Join CUET AI-Prep" : "Candidate Sign In"}
                </span>
                {mode === "signup" && (
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                    Step {step} of 2
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-normal">
                Authentic NTA CBT Simulator & University Cutoff Calibration
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
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMessage(null);
            }}
            className={`py-3 text-center border-r border-slate-200 transition-all cursor-pointer ${
              mode === "signup"
                ? "bg-white text-blue-600 font-bold border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Join Now (New Candidate)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMessage(null);
            }}
            className={`py-3 text-center transition-all cursor-pointer ${
              mode === "login"
                ? "bg-white text-blue-600 font-bold border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign In (Existing Candidate)
          </button>
        </div>

        {/* Error / Alert Banner */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2 shadow-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 stroke-[2]" />
            <div className="flex-1 space-y-1.5">
              <p>{errorMessage}</p>
              {unconfirmedEmail && (
                <button
                  type="button"
                  onClick={() => {
                    setEmail(unconfirmedEmail);
                    setMode("verify_email");
                    setErrorMessage(null);
                  }}
                  className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-800 hover:underline pt-0.5 cursor-pointer"
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
              onSuccess={async (data) => {
                if (data.user) {
                  onClose();
                  window.location.href = "/dashboard";
                }
              }}
              onBack={() => setMode("signup")}
            />
          ) : mode === "login" ? (
            /* ======================================================= */
            /* LOGIN FORM (Authentic Supabase Authentication)           */
            /* ======================================================= */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Registered Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aspirant@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-sm bg-white focus:outline-none focus:border-blue-500 shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Password</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-3.5 pr-11 py-2.5 rounded-xl border border-slate-200 font-medium text-sm bg-white focus:outline-none focus:border-blue-500 shadow-xs"
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
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Don&apos;t have an account? Join Now & Create Profile
                </button>
              </div>
            </form>
          ) : (
            /* ======================================================= */
            /* SIGN UP FLOW (Step 1: Account Info, Step 2: Academics)   */
            /* ======================================================= */
            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSignUp} className="space-y-5">
              {step === 1 ? (
                <>
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aryan Gupta"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-sm bg-white focus:outline-none focus:border-blue-500 shadow-xs"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aspirant@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-sm bg-white focus:outline-none focus:border-blue-500 shadow-xs"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-blue-600" />
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
                        className="w-full pl-3.5 pr-11 py-2.5 rounded-xl border border-slate-200 font-medium text-sm bg-white focus:outline-none focus:border-blue-500 shadow-xs"
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
                              ? "bg-blue-50/70 border-blue-600 text-blue-700"
                              : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to Dream College & Stream</span>
                      <ArrowRight className="w-4 h-4 stroke-[2]" />
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
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
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
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer"
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
