"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GraduationCap,
  Sparkles,
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
} from "lucide-react";
import { StreamType } from "@/types";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { createClient } from "@/lib/supabase/client";
import CollegeSearchDropdown from "./CollegeSearchDropdown";
import CourseSearchDropdown from "./CourseSearchDropdown";
import { DEFAULT_STREAM_SUBJECTS, getSubjectsForStream } from "@/lib/constants/cuetSubjects";

interface AuthPageContentProps {
  initialMode?: "signup" | "login";
}

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

  const [mode, setMode] = useState<"signup" | "login">(
    queryMode === "login" || initialMode === "login" ? "login" : "signup"
  );
  const [step, setStep] = useState<1 | 2>(1);

  // Auth Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Aspirant Profile Fields
  const [name, setName] = useState("");
  const [age] = useState("17");
  const [dreamCollege, setDreamCollege] = useState("Shri Ram College of Commerce (SRCC)");
  const [customCollege, setCustomCollege] = useState("");
  const [targetCourse, setTargetCourse] = useState("B.Com (Hons)");
  const [customCourse, setCustomCourse] = useState("");
  const [stream, setStream] = useState<StreamType>("commerce");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    DEFAULT_STREAM_SUBJECTS.commerce
  );

  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

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

  // Sign In with real Supabase Auth credentials
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setErrorMessage("Please enter both email and password.");
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
        setErrorMessage(error.message);
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
            if (json?.profile) {
              userFullName = json.profile.full_name || userFullName;
              userStream = (json.profile.target_stream?.toLowerCase() as StreamType) || userStream;
              userCollege = json.profile.target_college || userCollege;
              userUniversity = json.profile.target_university || userUniversity;
              if (Array.isArray(json.profile.selected_subjects) && json.profile.selected_subjects.length > 0) {
                userSelectedSubjects = json.profile.selected_subjects;
              }
              userXp = json.profile.xp ?? 0;
              userStreak = json.profile.current_streak ?? 1;
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
          // Fallback to metadata
        }

        loginUser({
          id: data.user.id,
          name: userFullName,
          email: cleanEmail,
          age: data.user.user_metadata?.age || "18",
          targetCollege: dreamCollege || userCollege,
          targetUniversity: userUniversity,
          targetCourse: userCourse,
          preferredStream: userStream,
          selectedSubjects: userSelectedSubjects,
          dailyStreak: userStreak,
          xpPoints: userXp,
          campusCoins: userCoins,
        });

        router.push(redirectUrl);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Authentication error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Up with real Supabase Auth credentials & store profile in Supabase
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const finalCollege = customCollege.trim() || dreamCollege;
    const finalCourse = customCourse.trim() || targetCourse;
    const finalUniversity =
      finalCollege.includes("DU") || finalCollege.includes("Delhi")
        ? "Delhi University"
        : finalCollege.includes("BHU")
        ? "Banaras Hindu University"
        : finalCollege.includes("JNU")
        ? "Jawaharlal Nehru University"
        : "Central University";

    if (!cleanName) {
      setErrorMessage("Please enter your full name.");
      setStep(1);
      return;
    }
    if (!cleanEmail) {
      setErrorMessage("Please provide a valid email address.");
      setStep(1);
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setStep(1);
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      try {
        await supabase.auth.signOut();
      } catch {
        // Ignore if already signed out
      }

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
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
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        if (!data.session) {
          try {
            await supabase.auth.signInWithPassword({
              email: cleanEmail,
              password,
            });
          } catch (signInErr) {
            console.warn("Auto-signin error:", signInErr);
          }
        }

        const createdUserId = data.user.id;

        try {
          await fetch("/api/auth/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: createdUserId,
              full_name: cleanName,
              target_stream: stream.charAt(0).toUpperCase() + stream.slice(1),
              target_college: finalCollege,
              target_university: finalUniversity,
              target_course: finalCourse,
              selected_subjects: selectedSubjects,
              age,
            }),
          });
        } catch (profileErr) {
          console.warn("Profile persistence fallback notice:", profileErr);
        }

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
          dailyStreak: 1,
          xpPoints: 100,
          campusCoins: 25,
        });

        router.push(redirectUrl);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="relative max-w-xl w-full mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>NTA CBT Verification</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          {/* Top Banner */}
          <div className="bg-slate-50/60 p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20 shrink-0">
                <GraduationCap className="w-6 h-6 stroke-[2.2]" />
                <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 fill-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {mode === "signup" ? "Join CUET AI-Prep" : "Candidate Sign In"}
                  </h1>
                  {mode === "signup" && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700">
                      Step {step} of 2
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Sign in or create your profile to access your Student Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-100 bg-slate-50/30 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMessage(null);
                setInfoMessage(null);
              }}
              className={`py-3.5 text-center transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-white text-blue-600 font-bold border-b-2 border-blue-600 shadow-2xs"
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
              }}
              className={`py-3.5 text-center transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-blue-600 font-bold border-b-2 border-blue-600 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              Sign In (Existing Candidate)
            </button>
          </div>

          {/* Error / Alert Banner */}
          {errorMessage && (
            <div className="mx-6 mt-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="flex-1">{errorMessage}</p>
            </div>
          )}

          {infoMessage && (
            <div className="mx-6 mt-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-medium flex items-start gap-2.5">
              <Check className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="flex-1">{infoMessage}</p>
            </div>
          )}

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6 text-slate-800">
            {mode === "login" ? (
              /* ======================================================= */
              /* LOGIN FORM                                              */
              /* ======================================================= */
              <form onSubmit={handleSignIn} className="space-y-4">
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
                    placeholder="aspirant@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Password</span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-3.5 pr-11 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Target DU College Search & Dropdown */}
                <CollegeSearchDropdown
                  selectedCollege={dreamCollege}
                  onSelectCollege={(collegeName) => {
                    setDreamCollege(collegeName);
                  }}
                  label="Target DU College (Search & Select)"
                  placeholder="Search 90+ DU colleges (e.g. SRCC, Hindu, Venky)..."
                />

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying candidate credentials...</span>
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
              /* ======================================================= */
              /* SIGNUP FORM                                             */
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                        placeholder="aspirant@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Password (min. 6 characters)</span>
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          minLength={6}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a secure password"
                          className="w-full pl-3.5 pr-11 py-2.5 rounded-xl border border-slate-200/70 font-medium text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!name.trim()) {
                            setErrorMessage("Please enter your name.");
                            return;
                          }
                          if (!email.trim() || !email.includes("@")) {
                            setErrorMessage("Please enter a valid email address.");
                            return;
                          }
                          if (password.length < 6) {
                            setErrorMessage("Password must be at least 6 characters.");
                            return;
                          }
                          setErrorMessage(null);
                          setStep(2);
                        }}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Continue to Stream & Target Selection</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* STEP 2: Stream, College & Subjects Selection */
                  <div className="space-y-4">
                    {/* Stream Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Choose Your Academic Stream
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["commerce", "science", "humanities"] as StreamType[]).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleStreamChange(s)}
                            className={`py-2.5 px-1 text-center rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer border ${
                              stream === s
                                ? "bg-blue-50 text-blue-700 border-blue-300 font-bold shadow-2xs"
                                : "bg-slate-50 text-slate-600 border-slate-200/70 hover:bg-slate-100"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* College Selection */}
                    <CollegeSearchDropdown
                      selectedCollege={dreamCollege}
                      onSelectCollege={(collegeName) => {
                        setDreamCollege(collegeName);
                        setCustomCollege("");
                      }}
                      label="Target DU College"
                      placeholder="Search 90+ DU colleges..."
                    />

                    {/* Course Selection */}
                    <CourseSearchDropdown
                      selectedCourse={targetCourse}
                      onSelectCourse={(courseName) => {
                        setTargetCourse(courseName);
                        setCustomCourse("");
                      }}
                      label="Target Undergraduate Course"
                      placeholder="Search top degrees..."
                    />

                    {/* Auto-Assigned Stream Domain Subjects */}
                    <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span>Stream Domain Subjects (Auto-Calibrated)</span>
                        </label>
                        <span className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-500">
                          {selectedSubjects.length} Domains
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSubjects.map((subj) => (
                          <span
                            key={subj}
                            className="px-2.5 py-1 text-xs font-semibold bg-white text-slate-700 border border-slate-200 rounded-lg shadow-2xs"
                          >
                            {subj}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] font-medium text-slate-500">
                        Diagnostic radars and mock tests are automatically calibrated for your {stream} stream.
                      </p>
                    </div>

                    {/* Buttons: Back and Submit */}
                    <div className="flex items-center gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setErrorMessage(null);
                        }}
                        className="py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs cursor-pointer transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Creating Candidate Account...</span>
                          </>
                        ) : (
                          <>
                            <span>Complete & Launch Dashboard</span>
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

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-400 font-medium">
          CUET AI-Prep &bull; Built strictly for NTA CBT Candidates &bull; No spam guaranteed
        </p>
      </div>
    </div>
  );
}
