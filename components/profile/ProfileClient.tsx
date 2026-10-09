"use client";

import React, { useState, useTransition, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  GraduationCap,
  Building2,
  Flame,
  Zap,
  Coins,
  Edit3,
  Sparkles,
  Target,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  Trophy as TrophyIcon,
  Crown,
  BellRing,
  LogOut,
  RefreshCw,
  Clock,
  ArrowRight,
  Shield,
} from "lucide-react";
import {
  ProfileInitialData,
  StudentProfileData,
  WeakMicroTopicItem,
} from "@/types/profile";
import { StreamOption } from "@/types/database";
import { calculateCollegeReadiness } from "@/lib/college-benchmarks";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import {
  isPushNotificationSupported,
  getNotificationPermissionState,
  enablePushNotifications,
  disablePushNotifications,
  isPushPreferenceEnabled,
  sendTestNotification,
  PushPermissionStatus,
} from "@/lib/push-notifications";
import { useTestStore } from "@/lib/store/useTestStore";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { createClient } from "@/lib/supabase/client";
import { updateProfileGoalsAction } from "@/app/dashboard/profile/actions";
import EditGoalsModal from "@/components/profile/EditGoalsModal";
import SignOutModal from "@/components/profile/SignOutModal";
import UpgradeButton from "@/components/payments/UpgradeButton";

interface ProfileClientProps {
  initialData: ProfileInitialData;
}

export default function ProfileClient({ initialData }: ProfileClientProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  // Zustand stores
  const zustandUser = useTestStore((state) => state.user);
  const testAttempts = useTestStore((state) => state.testAttempts);
  const clientAnalytics = useTestStore((state) => state.analytics);
  const loginUser = useTestStore((state) => state.loginUser);
  const logout = useTestStore((state) => state.logout);

  // Optimistic Profile State
  const [profile, setProfile] = useState<StudentProfileData>(initialData.profile);
  const [diagnostic, setDiagnostic] = useState(initialData.diagnostic);
  const [weakTopics] = useState<WeakMicroTopicItem[]>(initialData.weakTopics);

  // Modals state
  const [isEditGoalsOpen, setIsEditGoalsOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  // Status alerts & action loaders
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [isLaunchingDrill, setIsLaunchingDrill] = useState(false);

  // Push Notifications State
  const [pushSupported, setPushSupported] = useState(false);
  const [pushStatus, setPushStatus] = useState<PushPermissionStatus>("default");
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushNotice, setPushNotice] = useState<string | null>(null);

  // Check push notifications and sync Zustand on mount
  useEffect(() => {
    setPushSupported(isPushNotificationSupported());
    setPushStatus(getNotificationPermissionState());
    setPushEnabled(isPushPreferenceEnabled());

    if (typeof window !== "undefined") {
      try {
        const { recoverUnrecordedCBTSessions } = useTestStore.getState();
        if (typeof recoverUnrecordedCBTSessions === "function") {
          recoverUnrecordedCBTSessions();
        }
      } catch (err) {
        console.warn("Session recovery notice:", err);
      }
    }

    // If Zustand user has more recent local xp or streak, synchronize gracefully
    if (zustandUser && zustandUser.id === profile.id) {
      if (zustandUser.dailyStreak > profile.currentStreak || zustandUser.xpPoints > profile.xp) {
        setProfile((prev) => ({
          ...prev,
          currentStreak: Math.max(prev.currentStreak, zustandUser.dailyStreak),
          xp: Math.max(prev.xp, zustandUser.xpPoints),
          campusCoins: Math.max(prev.campusCoins, zustandUser.campusCoins ?? 0),
        }));
      }
    }
  }, [profile.id, zustandUser, profile.currentStreak, profile.xp]);

  // Robust accuracy reconciliation between server and client store attempts
  const clientAttempted =
    testAttempts && testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + (a.attemptedCount || 0), 0)
      : clientAnalytics?.totalQuestionsAttempted || 0;

  const clientCorrect =
    testAttempts && testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + (a.correctCount || 0), 0)
      : clientAnalytics?.totalCorrectAnswers || 0;

  const clientAccuracy =
    clientAttempted > 0
      ? Math.round((clientCorrect / clientAttempted) * 100)
      : clientAnalytics?.overallAccuracyPercentage || 0;

  const effectiveTotalAttempts = Math.max(diagnostic.totalAttempts, clientAttempted);
  const effectiveAccuracy =
    diagnostic.accuracyPercentage > 0 && clientAccuracy > 0
      ? diagnostic.totalAttempts >= clientAttempted
        ? diagnostic.accuracyPercentage
        : clientAccuracy
      : diagnostic.accuracyPercentage > 0
      ? diagnostic.accuracyPercentage
      : clientAccuracy;

  const effectiveDiagnostic = useMemo(() => {
    const isUnlocked = effectiveTotalAttempts >= 150;
    const progress = Math.min(100, Math.round((effectiveTotalAttempts / 150) * 100));
    return {
      ...diagnostic,
      totalAttempts: effectiveTotalAttempts,
      accuracyPercentage: effectiveAccuracy,
      calibrationProgress: progress,
      isAiMentorUnlocked: isUnlocked,
    };
  }, [diagnostic, effectiveTotalAttempts, effectiveAccuracy]);

  // Recalculate College Benchmark dynamically whenever target college or university changes
  const collegeBenchmark = calculateCollegeReadiness(
    profile.targetCollege,
    profile.targetUniversity,
    effectiveDiagnostic.accuracyPercentage,
    effectiveDiagnostic.totalAttempts
  );

  // Format stream badge color
  const streamBadgeColors: Record<StreamOption, { bg: string; text: string; border: string }> = {
    Science: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200/60" },
    Commerce: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200/60" },
    Humanities: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200/60" },
  };
  const activeStreamBadge = streamBadgeColors[profile.targetStream] || streamBadgeColors.Science;

  // Optimistic Profile Goals Update Handler
  const handleSaveGoals = async (updatedData: {
    targetStream: StreamOption;
    targetUniversity: string;
    targetCollege: string;
    fullName: string;
    selectedSubjects: string[];
  }) => {
    const previousProfile = { ...profile };
    const finalSubjects = getSubjectsForStream(updatedData.targetStream);

    // 1. Optimistic UI update
    setProfile((prev) => ({
      ...prev,
      targetStream: updatedData.targetStream,
      targetUniversity: updatedData.targetUniversity,
      targetCollege: updatedData.targetCollege,
      fullName: updatedData.fullName,
      selectedSubjects: finalSubjects,
    }));

    // Update Zustand client store
    loginUser({
      name: updatedData.fullName,
      preferredStream: updatedData.targetStream.toLowerCase() as any,
      targetUniversity: updatedData.targetUniversity,
      targetCollege: updatedData.targetCollege,
      selectedSubjects: finalSubjects,
    });

    setStatusMessage({
      type: "info",
      text: "Syncing your updated academic targets and stream subjects...",
    });

    try {
      // 2. Perform Server Action
      const result = await updateProfileGoalsAction({
        targetStream: updatedData.targetStream,
        targetUniversity: updatedData.targetUniversity,
        targetCollege: updatedData.targetCollege,
        fullName: updatedData.fullName,
        selectedSubjects: finalSubjects,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to update profile goals");
      }

      setStatusMessage({
        type: "success",
        text: `Target goals updated: ${updatedData.targetUniversity} — ${updatedData.targetCollege} (${finalSubjects.length} domains)`,
      });

      // Recalculate college readiness in state
      const newBenchmark = calculateCollegeReadiness(
        updatedData.targetCollege,
        updatedData.targetUniversity,
        effectiveDiagnostic.accuracyPercentage,
        effectiveDiagnostic.totalAttempts
      );
      setDiagnostic((prev) => ({
        ...prev,
        collegeCutoff: newBenchmark,
      }));

      setTimeout(() => setStatusMessage(null), 5000);
    } catch (err: any) {
      // Rollback on failure
      setProfile(previousProfile);
      setStatusMessage({
        type: "error",
        text: `Failed to save changes: ${err?.message || "Network error. Reverting targets."}`,
      });
      throw err;
    }
  };

  // Launch 15-Q Fix Drill
  const handleLaunchFixDrill = async () => {
    setIsLaunchingDrill(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/tests/generate-adaptive-drill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: profile.id }),
      });

      const data = await res.json();

      if (data.success && data.testId) {
        // Redirect to CBT test runner
        startTransition(() => {
          router.push(`/test/${data.testId}`);
        });
      } else if (data.error === "QUALIFICATION_GATE_LOCKED") {
        setStatusMessage({
          type: "info",
          text: `AI Adaptive Drill requires 150 baseline questions. You're at ${effectiveDiagnostic.totalAttempts}/150! Complete domain mocks to unlock.`,
        });
        setIsLaunchingDrill(false);
      } else if (data.error === "CADENCE_LIMIT_EXCEEDED") {
        setStatusMessage({
          type: "info",
          text: data.message || "Daily drill cadence limit reached (1 drill every 12 hours).",
        });
        setIsLaunchingDrill(false);
      } else {
        // Fallback: launch default domain mock
        startTransition(() => {
          router.push("/dashboard/mocks");
        });
      }
    } catch (err: any) {
      console.error("Drill launch error:", err);
      // Fallback redirect to mocks
      startTransition(() => {
        router.push("/dashboard/mocks");
      });
    }
  };

  // Toggle Push Notifications
  const handleTogglePush = async () => {
    if (pushEnabled) {
      disablePushNotifications();
      setPushEnabled(false);
      setPushNotice("Daily revision push reminders paused.");
      setTimeout(() => setPushNotice(null), 4000);
      return;
    }

    const res = await enablePushNotifications(profile.id);
    setPushStatus(res.status);
    if (res.success) {
      setPushEnabled(true);
      setPushNotice("Daily 8:00 PM revision reminders enabled!");
      setTimeout(() => setPushNotice(null), 5000);
    } else {
      setPushNotice(res.message);
      setTimeout(() => setPushNotice(null), 6000);
    }
  };

  // Test Notification Dispatch
  const handleTestNotification = () => {
    const success = sendTestNotification();
    if (success) {
      setPushNotice("Test notification sent to your browser!");
    } else {
      setPushNotice("Unable to dispatch notification. Please ensure permissions are granted.");
    }
    setTimeout(() => setPushNotice(null), 4000);
  };

  // Secure Sign-Out Handler
  const handleSignOut = async () => {
    try {
      // 1. Invalidate Supabase session
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Supabase auth signout warning:", e);
    }

    // 2. Reset client Zustand stores
    logout();
    try {
      useCBTStore.setState({
        isInitialized: false,
        isTimerRunning: false,
        remainingSeconds: 0,
        questionStates: {},
        answers: {},
        submittedScore: null,
      });
    } catch {
      // Safe fallback
    }

    // 3. Clear session storage & exam caches
    if (typeof window !== "undefined") {
      sessionStorage.clear();
      // Clear exam and session keys
      try {
        const keysToRemove = Object.keys(localStorage).filter(
          (k) =>
            k.startsWith("cuet_cbt_session_") ||
            k.startsWith("streak_") ||
            k.startsWith("last_practice_date_") ||
            k.startsWith("unlocked_trophies_")
        );
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      } catch {
        // Safe fallback
      }
    }

    // 4. Clean redirect to home
    setIsSignOutModalOpen(false);
    startTransition(() => {
      router.push("/");
      router.refresh();
    });
  };


  // Student Initials
  const initials =
    (profile.fullName || "Aspirant")
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CU";

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Title & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-[11px] font-bold uppercase tracking-wider font-mono">
              Official Student Record
            </span>
            <span className="text-xs text-slate-300 font-bold">•</span>
            <span className="text-xs text-slate-500 font-mono font-semibold">
              ID: {profile.id.slice(0, 8)}...
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Academic Identity & Readiness
          </h1>
        </div>

        {/* Edit Goals Action Button */}
        <button
          type="button"
          onClick={() => setIsEditGoalsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200/80 shadow-xs hover:shadow transition-all cursor-pointer self-start sm:self-auto"
        >
          <Edit3 className="w-4 h-4 text-slate-500" />
          <span>Edit Academic Goals</span>
        </button>
      </div>

      {/* Global Status Message Toast */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in duration-150 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200/80 text-emerald-800"
              : statusMessage.type === "error"
              ? "bg-rose-50 border-rose-200/80 text-rose-800"
              : "bg-blue-50 border-blue-200/80 text-blue-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
            ) : statusMessage.type === "error" ? (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            ) : (
              <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-slate-400 hover:text-slate-700 font-bold p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* CARD 1: HERO & ACADEMIC IDENTITY CARD */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 sm:p-8 space-y-6">
        {/* Top: Avatar, Name, Email, Stream Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            {/* Student Avatar */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-sm shrink-0">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-xs">
                <Shield className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Name, Email, Stream */}
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate">
                  {profile.fullName || "CUET Aspirant"}
                </h2>
                {/* Stream Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider font-mono ${activeStreamBadge.bg} ${activeStreamBadge.text} ${activeStreamBadge.border}`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  {profile.targetStream}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate">
                {profile.email || "aspirant@cuet-prep.in"}
              </p>
            </div>
          </div>

          {/* Quick Target College Pill with Edit Button */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/70 p-3 rounded-2xl self-start sm:self-auto">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="text-left pr-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Target College Goal
              </p>
              <p className="text-xs font-bold text-slate-800 truncate max-w-[200px]">
                {profile.targetUniversity} — {profile.targetCollege}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsEditGoalsOpen(true)}
              className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition-all cursor-pointer"
              title="Change target college"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stream Domain Subjects Calibrated for Candidate */}
        {(() => {
          const displaySubjects =
            profile.selectedSubjects && profile.selectedSubjects.length > 0
              ? profile.selectedSubjects
              : getSubjectsForStream(profile.targetStream);
          return (
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>Stream Domain Subjects ({profile.targetStream || "Science"} Stream • {displaySubjects.length} Domains)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditGoalsOpen(true)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Change Stream</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {displaySubjects.map((subj) => (
                  <span
                    key={subj}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-xs"
                  >
                    {subj}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Quick Stats Pills: XP, Active Streak Flame, Campus Coins */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* XP Pill */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                <Zap className="w-5 h-5 fill-indigo-500 text-indigo-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-900/60">
                  Total Experience
                </p>
                <p className="text-lg font-extrabold text-slate-900 font-mono leading-none mt-0.5">
                  {profile.xp.toLocaleString()} XP
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 bg-white text-indigo-700 rounded-full border border-indigo-100 shadow-xs">
              {profile.xp >= 1500 ? "Level 3" : profile.xp >= 500 ? "Level 2" : "Level 1"}
            </span>
          </div>

          {/* Streak Flame Pill */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-amber-100 flex items-center justify-center text-amber-600 shadow-xs">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60">
                  Practice Streak
                </p>
                <p className="text-lg font-extrabold text-slate-900 font-mono leading-none mt-0.5">
                  {profile.currentStreak} Day{profile.currentStreak === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 bg-white text-amber-700 rounded-full border border-amber-100 shadow-xs">
              {profile.currentStreak >= 7 ? "7d King 🔥" : "Active"}
            </span>
          </div>

          {/* Campus Coins Pill */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                <Coins className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-900/60">
                  Campus Coins
                </p>
                <p className="text-lg font-extrabold text-slate-900 font-mono leading-none mt-0.5">
                  {profile.campusCoins} Coins
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 bg-white text-emerald-700 rounded-full border border-emerald-100 shadow-xs">
              Redeemable
            </span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* GRID: CARD 2 (DIAGNOSTIC READINESS) & CARD 4 (SUBSCRIPTION) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ──────────────────────────────────────────────────────────── */}
        {/* CARD 2: AI DIAGNOSTIC & EXAM READINESS CARD */}
        {/* ──────────────────────────────────────────────────────────── */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 sm:p-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header with AI Mentor Status */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    AI Diagnostic & Readiness
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    150-question calibration & historical cutoff benchmarks
                  </p>
                </div>
              </div>

              {/* Active Pulse Badge or Calibration Badge */}
              {effectiveDiagnostic.isAiMentorUnlocked ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>AI Mentor Active</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-700">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Calibrating</span>
                </div>
              )}
            </div>

            {/* 1. AI Calibration Progress Meter */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI Calibration Progress</span>
                </span>
                <span className="font-mono text-slate-800">
                  {effectiveDiagnostic.totalAttempts} / 150 Qs ({effectiveDiagnostic.calibrationProgress}%)
                </span>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full h-3 bg-slate-200/70 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500 rounded-full"
                  style={{ width: `${effectiveDiagnostic.calibrationProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                {effectiveDiagnostic.isAiMentorUnlocked ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    Baseline complete. Trap remediation active.
                  </span>
                ) : (
                  <span>
                    {Math.max(0, 150 - effectiveDiagnostic.totalAttempts)} more questions to establish NTA timing accuracy.
                  </span>
                )}
                <span className="font-mono font-bold text-slate-700">
                  Acc: {effectiveDiagnostic.accuracyPercentage}%
                </span>
              </div>
            </div>

            {/* 2. Target College Readiness Index */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Target College Readiness
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">
                    {collegeBenchmark.collegeName} ({collegeBenchmark.campus})
                  </p>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider font-mono ${collegeBenchmark.statusBadgeClass}`}
                >
                  {collegeBenchmark.statusLabel}
                </span>
              </div>

              {/* Comparison Visual Meter */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-700 font-mono">
                  <span>Predicted: {collegeBenchmark.predictedPercentile}%tile</span>
                  <span>Cutoff: {collegeBenchmark.historicalCutoffPercentile}%tile ({collegeBenchmark.targetScoreFormatted})</span>
                </div>

                <div className="relative w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                  {/* Predicted Bar */}
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      collegeBenchmark.status === "surpassed"
                        ? "bg-emerald-500"
                        : collegeBenchmark.status === "striking_distance"
                        ? "bg-amber-500"
                        : "bg-blue-600"
                    }`}
                    style={{ width: `${Math.min(100, collegeBenchmark.predictedPercentile)}%` }}
                  />
                  {/* Cutoff Target Marker Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-slate-900 z-10"
                    style={{ left: `${Math.min(99, collegeBenchmark.historicalCutoffPercentile)}%` }}
                    title={`Target Cutoff: ${collegeBenchmark.historicalCutoffPercentile}%`}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {collegeBenchmark.recommendation}
              </p>
            </div>

            {/* 3. Persistent Red Zones */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  <span>Persistent Red Zones (Top 3 Weak Spots)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-semibold">
                  Pacing Sinks
                </span>
              </div>

              {weakTopics.length === 0 ? (
                <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs font-medium text-slate-500">
                  No chronic weak spots detected yet. Start solving mocks to populate your topic radar!
                </div>
              ) : (
                <div className="space-y-2">
                  {weakTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-800 truncate">
                            {topic.microTopic}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium truncate pl-5">
                          {topic.subject} • {topic.chapter}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold text-rose-700 font-mono bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/70">
                          {topic.accuracyPercentage}% Acc
                        </span>
                        {topic.fatalTimeSinks > 0 && (
                          <span className="text-[10px] font-bold text-slate-600 font-mono bg-white px-1.5 py-0.5 rounded-md border border-slate-200">
                            {topic.fatalTimeSinks} Sinks
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Direct "Launch 15-Q Fix Drill" CTA Button */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              disabled={isLaunchingDrill}
              onClick={handleLaunchFixDrill}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLaunchingDrill ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Compiling Adaptive Fix Drill...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Launch 15-Q Fix Drill for Red Zones</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* CARD 4: SUBSCRIPTION, SETTINGS & STUDY ALERTS */}
        {/* ──────────────────────────────────────────────────────────── */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 sm:p-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <Crown className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    Subscription & Study Alerts
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Pass validity, push reminders & exam preferences
                  </p>
                </div>
              </div>
            </div>

            {/* Subscription Status Card */}
            <div
              className={`p-5 rounded-2xl border space-y-3.5 ${
                profile.isPremium
                  ? "bg-indigo-50/50 border-indigo-100"
                  : "bg-slate-50 border-slate-200/70"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Current Membership
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono border ${
                    profile.isPremium
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-white text-slate-600 border-slate-200"
                  }`}
                >
                  {profile.isPremium ? "Active AI Pass" : "Free Aspirant Tier"}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {profile.isPremium
                    ? "CUET AI Practice Pass (Valid until July 31)"
                    : "Free Tier (1 Domain Mock / Day)"}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  {profile.isPremium
                    ? "Unlimited NTA CBT full mock simulations, instant NCERT mistake decrypter, and personalized Sunday ritual reports are fully unlocked."
                    : "Upgrade to unlock unlimited 50-Q NTA simulations, zero-token AI repair quizzes, and target college cutoff projections."}
                </p>
              </div>

              {/* If Free: Modern Upgrade CTA */}
              {!profile.isPremium && (
                <div className="pt-2">
                  <UpgradeButton
                    planId="ai_pass_399"
                    variant="primary"
                    buttonText="Upgrade to AI Pass (₹399)"
                    className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs hover:shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Study Alerts & Web Push Preference */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <BellRing className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Daily Revision Push Alerts
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Automated 8:00 PM practice streak ping
                    </p>
                  </div>
                </div>

                {/* Modern Toggle Switch */}
                <button
                  type="button"
                  onClick={handleTogglePush}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                    pushEnabled ? "bg-blue-600" : "bg-slate-200"
                  }`}
                  aria-label="Toggle push notifications"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      pushEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {pushNotice && (
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200/60 text-[11px] font-medium text-blue-800 flex items-center justify-between">
                  <span>{pushNotice}</span>
                  <button
                    type="button"
                    onClick={() => setPushNotice(null)}
                    className="text-blue-500 hover:text-blue-800 ml-2 font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Test Notification Trigger Button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-slate-500 font-medium">
                  Status:{" "}
                  {pushEnabled
                    ? "Enabled (Browser VAPID)"
                    : pushSupported
                    ? `Disabled (${pushStatus})`
                    : "Browser Unsupported"}
                </span>
                {pushEnabled && (
                  <button
                    type="button"
                    onClick={handleTestNotification}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1"
                  >
                    <span>Send Test Ping</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick System Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/dashboard/mocks"
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:shadow-xs text-slate-700 flex items-center justify-between transition-all"
              >
                <span>Mock Tests</span>
                <Play className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href="/dashboard/leaderboard"
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:shadow-xs text-slate-700 flex items-center justify-between transition-all"
              >
                <span>DU Leaderboard</span>
                <TrophyIcon className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Account Security Quick Sign Out */}
          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsSignOutModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-semibold text-xs border border-slate-200/60 hover:border-rose-200 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out from Device</span>
            </button>
          </div>
        </section>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* PHASE 3: DEDICATED SIGN OUT FOOTER SECTION */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Account Session Management</h4>
            <p className="text-xs text-slate-500 font-medium">
              Signed in as <span className="font-mono text-slate-700 font-semibold">{profile.email}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsSignOutModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs border border-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* MODALS */}
      {/* ──────────────────────────────────────────────────────────── */}
      <EditGoalsModal
        isOpen={isEditGoalsOpen}
        onClose={() => setIsEditGoalsOpen(false)}
        initialStream={profile.targetStream}
        initialUniversity={profile.targetUniversity}
        initialCollege={profile.targetCollege}
        initialFullName={profile.fullName}
        initialSelectedSubjects={profile.selectedSubjects || []}
        onSave={handleSaveGoals}
      />

      <SignOutModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirm={handleSignOut}
      />
    </div>
  );
}
