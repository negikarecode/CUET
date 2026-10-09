"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import CollegeSearchDropdown from "./CollegeSearchDropdown";
import CourseSearchDropdown from "./CourseSearchDropdown";
import { DEFAULT_STREAM_SUBJECTS, getSubjectsForStream } from "@/lib/constants/cuetSubjects";

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
  const router = useRouter();
  const loginUser = useTestStore((state) => state.loginUser);

  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [step, setStep] = useState<1 | 2>(1);

  // Auth Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Aspirant Profile Fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("17");
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

  // Sync mode when initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
    setStep(1);
    setErrorMessage(null);
    setInfoMessage(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

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
            if (json.profile) {
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
          // Profile fallback to metadata
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

        onClose();
        router.push("/dashboard");
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

      // Ensure any previous session is cleared before new signup
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
        // Guarantee cookies and session are active in the browser
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
          dailyStreak: 1,
          xpPoints: 50,
          campusCoins: 25,
        });

        onClose();
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
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
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2 shadow-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 stroke-[2]" />
            <p className="flex-1">{errorMessage}</p>
          </div>
        )}

        {infoMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-start gap-2 shadow-xs">
            <Check className="w-4 h-4 shrink-0 mt-0.5 stroke-[2]" />
            <p className="flex-1">{infoMessage}</p>
          </div>
        )}

        {/* Modal Body / Scrollable Form */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-900">
          {mode === "login" ? (
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

              {/* Target DU College Search & Dropdown (For Sign In) */}
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
                  {/* Dream Target College (Official du.ac.in Search & Dropdown) */}
                  <div className="space-y-1.5">
                    <CollegeSearchDropdown
                      selectedCollege={customCollege || dreamCollege}
                      onSelectCollege={(collegeName) => {
                        setDreamCollege(collegeName);
                        setCustomCollege(collegeName);
                      }}
                      label="Dream Target College (Official DU Directory)"
                      placeholder="Search 90+ DU colleges (e.g. SRCC, Hindu, Venky, Gargi)..."
                    />

                    {/* Quick-Pick Popular Flagships */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">
                        Popular:
                      </span>
                      {[
                        "Shri Ram College of Commerce (SRCC)",
                        "St. Stephen's College",
                        "Hindu College",
                        "Hans Raj College",
                        "Lady Shri Ram College for Women (LSR)",
                        "Miranda House",
                        "Sri Venkateswara College (Venky)",
                        "Gargi College",
                      ].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setDreamCollege(c);
                            setCustomCollege(c);
                          }}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border transition-all shadow-xs ${
                            (customCollege || dreamCollege) === c
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {c.split(" (")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Degree / Program (Official DU Course Search & Dropdown) */}
                  <div className="space-y-1.5">
                    <CourseSearchDropdown
                      selectedCourse={customCourse || targetCourse}
                      onSelectCourse={(courseName) => {
                        setTargetCourse(courseName);
                        setCustomCourse(courseName);
                      }}
                      label="Target Degree / Program (Official DU Catalog)"
                      placeholder="Search 75+ DU degrees (e.g. BCom Hons, Economics, Physics)..."
                    />

                    {/* Quick-Pick Popular Programs */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">
                        Popular:
                      </span>
                      {[
                        "BCom (Hons)",
                        "B.A. (Hons) Economics",
                        "B.Sc. (Hons) Computer Science",
                        "B.Sc. (Hons) Physics",
                        "B.A. (Hons) Political Science",
                        "B.A. (Hons) English",
                        "Bachelor of Financial & Investment Analysis",
                      ].map((crs) => (
                        <button
                          key={crs}
                          type="button"
                          onClick={() => {
                            setTargetCourse(crs);
                            setCustomCourse(crs);
                          }}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border transition-all shadow-xs ${
                            (customCourse || targetCourse) === crs
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {crs}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Academic Stream */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Academic Stream
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["science", "commerce", "humanities"] as StreamType[]).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleStreamChange(st)}
                          className={`p-2.5 rounded-xl border font-semibold text-xs capitalize transition-all shadow-xs cursor-pointer ${
                            stream === st
                              ? "bg-blue-50/70 border-blue-600 text-blue-700"
                              : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

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
                      disabled={isLoading}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
