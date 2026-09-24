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
    <div className="min-h-screen bg-[#FAF7EE] flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 academic-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-xl w-full mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-black text-black bg-white hover:bg-[#FAF7EE] px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-1 text-[11px] font-black text-black/70 bg-[#FEF3C7] px-2.5 py-1 rounded-full border border-black shadow-[1px_1px_0px_0px_#000]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>NTA CBT Verification</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_#000] overflow-hidden">
          {/* Top Banner */}
          <div className="bg-[#FAF7EE] p-5 sm:p-6 border-b-2 border-black flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl bg-[#FF5C5C] text-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] shrink-0">
                <GraduationCap className="w-6 h-6 stroke-[2.5]" />
                <Sparkles className="w-3 h-3 text-[#F59E0B] absolute -top-1 -right-1 fill-[#F59E0B]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-black tracking-tight">
                    {mode === "signup" ? "Join CUET AI-Prep" : "Candidate Sign In"}
                  </h1>
                  {mode === "signup" && (
                    <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-[#FEF3C7] border border-black text-black">
                      Step {step} of 2
                    </span>
                  )}
                </div>
                <p className="text-xs text-black/60 font-semibold mt-0.5">
                  Sign in or create your profile to access your Student Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 border-b-2 border-black bg-[#FAF7EE] text-xs font-black">
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMessage(null);
                setInfoMessage(null);
              }}
              className={`py-3 text-center border-r-2 border-black transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-white text-black font-black underline decoration-[#FF5C5C] decoration-2 underline-offset-4"
                  : "text-black/60 hover:bg-white/50"
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
              className={`py-3 text-center transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-black font-black underline decoration-[#FF5C5C] decoration-2 underline-offset-4"
                  : "text-black/60 hover:bg-white/50"
              }`}
            >
              Sign In (Existing Candidate)
            </button>
          </div>

          {/* Error / Alert Banner */}
          {errorMessage && (
            <div className="mx-6 mt-5 p-3.5 rounded-xl bg-[#FEE2E2] border-2 border-black text-[#DC2626] text-xs font-bold flex items-start gap-2.5 shadow-[2px_2px_0px_0px_#000]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 stroke-[2.5]" />
              <p className="flex-1">{errorMessage}</p>
            </div>
          )}

          {infoMessage && (
            <div className="mx-6 mt-5 p-3.5 rounded-xl bg-[#D1FAE5] border-2 border-black text-[#059669] text-xs font-bold flex items-start gap-2.5 shadow-[2px_2px_0px_0px_#000]">
              <Check className="w-4 h-4 shrink-0 mt-0.5 stroke-[2.5]" />
              <p className="flex-1">{infoMessage}</p>
            </div>
          )}

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6 text-black">
            {mode === "login" ? (
              /* ======================================================= */
              /* LOGIN FORM                                              */
              /* ======================================================= */
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Registered Email Address</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aspirant@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-black font-bold text-sm bg-[#FAF7EE] focus:bg-white focus:outline-none shadow-[2px_2px_0px_0px_#000]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
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
                      className="w-full pl-3.5 pr-11 py-2.5 rounded-lg border-2 border-black font-bold text-sm bg-[#FAF7EE] focus:bg-white focus:outline-none shadow-[2px_2px_0px_0px_#000]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 p-1 rounded hover:bg-black/10 text-black/70 hover:text-black transition-all cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Eye className="w-4 h-4 stroke-[2.5]" />
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
                    className="w-full py-3.5 px-4 rounded-xl bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying candidate credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In & Open Dashboard</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
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
                      <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>Full Legal Name</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg border-2 border-black font-bold text-sm bg-[#FAF7EE] focus:bg-white focus:outline-none shadow-[2px_2px_0px_0px_#000]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aspirant@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border-2 border-black font-bold text-sm bg-[#FAF7EE] focus:bg-white focus:outline-none shadow-[2px_2px_0px_0px_#000]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
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
                          className="w-full pl-3.5 pr-11 py-2.5 rounded-lg border-2 border-black font-bold text-sm bg-[#FAF7EE] focus:bg-white focus:outline-none shadow-[2px_2px_0px_0px_#000]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 p-1 rounded hover:bg-black/10 text-black/70 hover:text-black transition-all cursor-pointer"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <Eye className="w-4 h-4 stroke-[2.5]" />
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
                        className="w-full py-3.5 px-4 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Continue to Stream & Target Selection</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* STEP 2: Stream, College & Subjects Selection */
                  <div className="space-y-4">
                    {/* Stream Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-black">
                        Choose Your Academic Stream
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["commerce", "science", "humanities"] as StreamType[]).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleStreamChange(s)}
                            className={`py-2 px-1 text-center rounded-lg border-2 border-black text-xs font-black capitalize transition-all cursor-pointer ${
                              stream === s
                                ? "bg-[#FEF3C7] text-black shadow-[2px_2px_0px_0px_#000] -translate-x-0.5 -translate-y-0.5"
                                : "bg-white text-black/70 hover:bg-[#FAF7EE]"
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
                    <div className="p-3.5 bg-[#FAF7EE] border-2 border-black rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#FF5C5C]" />
                          <span>Stream Domain Subjects (Auto-Calibrated)</span>
                        </label>
                        <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded border border-black text-black/70">
                          {selectedSubjects.length} Domains
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSubjects.map((subj) => (
                          <span
                            key={subj}
                            className="px-2.5 py-1 text-xs font-black bg-white text-black border-2 border-black rounded-lg shadow-[1px_1px_0px_0px_#000]"
                          >
                            {subj}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] font-bold text-black/60">
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
                        className="py-3 px-4 rounded-xl border-2 border-black bg-white hover:bg-[#FAF7EE] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Creating Candidate Account...</span>
                          </>
                        ) : (
                          <>
                            <span>Complete & Launch Dashboard</span>
                            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
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
        <p className="text-center text-xs text-black/60 font-semibold">
          CUET AI-Prep &bull; Built strictly for NTA CBT Candidates &bull; No spam guaranteed
        </p>
      </div>
    </div>
  );
}
