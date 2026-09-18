"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Mail, CheckCircle2, BookOpen, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  // Auth & Onboarding state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState<"login" | "otp" | "onboarding">("login");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Onboarding Form
  const [name, setName] = useState("Aryan Sharma");
  const [phone, setPhone] = useState("+91 9876543210");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "Political Science",
    "History",
    "Economics",
    "English",
  ]);
  const [dailyHours, setDailyHours] = useState(4);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthStep("otp");
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthStep("onboarding");
    }, 600);
  };

  const handleCompleteOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const profile = {
      name,
      email: email || "student@cuet-prep.in",
      phone,
      selected_subjects: selectedSubjects,
      target_college: "Delhi University (DU)",
      exam_date: "2026-05-15",
      daily_study_hours: dailyHours,
      plan_type: "free",
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("cuet_student_profile", JSON.stringify(profile));
    }

    // Call API in background
    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    }).catch(() => {});

    setTimeout(() => {
      setIsLoading(false);
      router.push("/weakness");
    }, 500);
  };

  const toggleSubject = (subj: string) => {
    if (selectedSubjects.includes(subj)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== subj));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12 sm:px-6">
      {/* Hero Section */}
      <div className="w-full max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          MODULE 1: AI WEAKNESS DETECTOR SYSTEM
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          India&apos;s Smartest <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            CUET Prep Platform
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Stop guessing what to revise. Our real-time diagnostic engine pinpoints your exact accuracy leaks, speed traps, and knowledge gaps topic-by-topic.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs sm:text-sm font-semibold text-slate-700">
          <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Accuracy & Speed Scoring
          </span>
          <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-xs">
            <Target className="w-4 h-4 text-red-600" />
            Critical Weakness Alerts
          </span>
          <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-xs">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Official NTA Syllabus Pattern
          </span>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 max-w-md mx-auto">
          <Button
            size="lg"
            onClick={() => {
              setIsAuthModalOpen(true);
              setAuthStep("login");
            }}
            className="w-full font-bold gap-2 text-base h-12 shadow-lg hover:shadow-xl bg-indigo-600 hover:bg-indigo-700 text-white min-h-[48px]"
          >
            <Mail className="w-5 h-5" />
            Login with Email (OTP)
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              // Direct login demo
              setEmail("student@cuet-prep.in");
              setIsAuthModalOpen(true);
              setAuthStep("onboarding");
            }}
            className="w-full font-semibold gap-2 text-base h-12 bg-white hover:bg-slate-100 min-h-[48px]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            Login with Google
          </Button>
        </div>

        <div className="pt-4 flex items-center justify-center gap-4 flex-wrap text-xs sm:text-sm">
          <Link
            href="/planner"
            className="font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-4"
          >
            📅 AI Study Planner (Mod 4) →
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            href="/weakness"
            className="font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-4"
          >
            Weakness Dashboard (Mod 1) →
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            href="/chat"
            className="font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-4"
          >
            💬 24/7 AI Doubt Solver (Mod 3) →
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            href="/admin/chat-analytics"
            className="font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-4"
          >
            Admin Analytics →
          </Link>
        </div>
      </div>

      {/* Auth & Onboarding Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-2">
                C
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {authStep === "login" && "Student Login"}
                {authStep === "otp" && "Enter Security OTP"}
                {authStep === "onboarding" && "Setup Your CUET Profile"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {authStep === "login" && "No password needed. We'll send a 6-digit OTP code."}
                {authStep === "otp" && `Enter the verification code sent to ${email || "your email"}.`}
                {authStep === "onboarding" && "Select your subjects to personalize your weakness detection."}
              </p>
            </div>

            {/* STEP 1: Enter Email */}
            {authStep === "login" && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-11 font-bold min-h-[44px]">
                  {isLoading ? "Sending OTP..." : "Send Verification OTP →"}
                </Button>
              </form>
            )}

            {/* STEP 2: Enter OTP */}
            {authStep === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    6-Digit OTP Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-center font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="block text-[11px] text-slate-400 text-center mt-1">
                    (Tip: Enter any 6 digits to proceed)
                  </span>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-11 font-bold min-h-[44px]">
                  {isLoading ? "Verifying..." : "Verify & Continue →"}
                </Button>
              </form>
            )}

            {/* STEP 3: Onboarding Details */}
            {authStep === "onboarding" && (
              <form onSubmit={handleCompleteOnboarding} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Your CUET Domain Subjects (At least 1)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Political Science", "History", "Economics", "English"].map((subj) => (
                      <button
                        key={subj}
                        type="button"
                        onClick={() => toggleSubject(subj)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          selectedSubjects.includes(subj)
                            ? "bg-indigo-50 border-indigo-600 text-indigo-950 ring-1 ring-indigo-600"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                      >
                        ✓ {subj}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target College</label>
                    <input
                      type="text"
                      disabled
                      value="Delhi University"
                      className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Daily Study Hours</label>
                    <select
                      value={dailyHours}
                      onChange={(e) => setDailyHours(Number(e.target.value))}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value={2}>2 Hours</option>
                      <option value={4}>4 Hours</option>
                      <option value={6}>6 Hours</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full h-11 font-bold mt-2 min-h-[44px]">
                  {isLoading ? "Saving Profile..." : "Launch AI Weakness Detector →"}
                </Button>
              </form>
            )}

            <button
              type="button"
              onClick={() => setIsAuthModalOpen(false)}
              className="block w-full text-center text-xs text-slate-400 hover:text-slate-600 pt-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
