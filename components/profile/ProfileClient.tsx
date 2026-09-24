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
  Lock,
  Crown,
  BellRing,
  LogOut,
  RefreshCw,
  Clock,
  ArrowRight,
  Shield,
  HelpCircle,
} from "lucide-react";
import {
  ProfileInitialData,
  StudentProfileData,
  ProfileTrophyItem,
  WeakMicroTopicItem,
} from "@/types/profile";
import { StreamOption } from "@/types/database";
import { calculateCollegeReadiness } from "@/lib/college-benchmarks";
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
import TrophyDetailModal from "@/components/profile/TrophyDetailModal";
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
  const [trophies] = useState<ProfileTrophyItem[]>(initialData.trophies);

  // Modals state
  const [isEditGoalsOpen, setIsEditGoalsOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [selectedTrophy, setSelectedTrophy] = useState<ProfileTrophyItem | null>(null);

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
    Science: { bg: "bg-[#EEF2FF]", text: "text-[#4338CA]", border: "border-[#6366F1]" },
    Commerce: { bg: "bg-[#FEF3C7]", text: "text-[#92400E]", border: "border-[#F59E0B]" },
    Humanities: { bg: "bg-[#F3E8FF]", text: "text-[#6B21A8]", border: "border-[#A855F7]" },
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

    // 1. Optimistic UI update
    setProfile((prev) => ({
      ...prev,
      targetStream: updatedData.targetStream,
      targetUniversity: updatedData.targetUniversity,
      targetCollege: updatedData.targetCollege,
      fullName: updatedData.fullName,
      selectedSubjects: updatedData.selectedSubjects,
    }));

    // Update Zustand client store
    loginUser({
      name: updatedData.fullName,
      preferredStream: updatedData.targetStream.toLowerCase() as any,
      targetUniversity: updatedData.targetUniversity,
      targetCollege: updatedData.targetCollege,
      selectedSubjects: updatedData.selectedSubjects,
    });

    setStatusMessage({
      type: "info",
      text: "Syncing your updated academic targets and subjects...",
    });

    try {
      // 2. Perform Server Action
      const result = await updateProfileGoalsAction({
        targetStream: updatedData.targetStream,
        targetUniversity: updatedData.targetUniversity,
        targetCollege: updatedData.targetCollege,
        fullName: updatedData.fullName,
        selectedSubjects: updatedData.selectedSubjects,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to update profile goals");
      }

      setStatusMessage({
        type: "success",
        text: `Target goals updated: ${updatedData.targetUniversity} — ${updatedData.targetCollege} (${updatedData.selectedSubjects.length} subjects)`,
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

  // Unlocked trophies count
  const unlockedCount = trophies.filter((t) => t.isUnlocked).length;

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
            <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-black text-[11px] font-black uppercase font-mono shadow-[1px_1px_0px_0px_#000]">
              Official Student Record
            </span>
            <span className="text-xs text-black/50 font-bold">•</span>
            <span className="text-xs text-black/60 font-mono font-bold">
              ID: {profile.id.slice(0, 8)}...
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-1">
            Academic Identity & Readiness
          </h1>
        </div>

        {/* Edit Goals Action Button */}
        <button
          type="button"
          onClick={() => setIsEditGoalsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer self-start sm:self-auto"
        >
          <Edit3 className="w-4 h-4 text-black" />
          <span>Edit Academic Goals</span>
        </button>
      </div>

      {/* Global Status Message Toast */}
      {statusMessage && (
        <div
          className={`p-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] text-xs font-black flex items-center justify-between gap-2 animate-in fade-in duration-150 ${
            statusMessage.type === "success"
              ? "bg-[#D1FAE5] text-black"
              : statusMessage.type === "error"
              ? "bg-[#FEE2E2] text-[#991B1B]"
              : "bg-[#FEF3C7] text-black"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-[#10B981] stroke-[2.5]" />
            ) : statusMessage.type === "error" ? (
              <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
            ) : (
              <RefreshCw className="w-4 h-4 text-[#D97706] animate-spin" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-black/60 hover:text-black font-bold p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* CARD 1: HERO & ACADEMIC IDENTITY CARD */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_#000] p-6 sm:p-8 space-y-6">
        {/* Top: Avatar, Name, Email, Stream Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b-2 border-black/10">
          <div className="flex items-center gap-4">
            {/* Student Avatar */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black text-white flex items-center justify-center font-black text-xl sm:text-2xl border-2 border-black shadow-[3px_3px_0px_0px_#FF5C5C] shrink-0">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#10B981] border-2 border-black flex items-center justify-center text-white shadow-[1px_1px_0px_0px_#000]">
                <Shield className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Name, Email, Stream */}
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight truncate">
                  {profile.fullName || "CUET Aspirant"}
                </h2>
                {/* Stream Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border-2 text-[11px] font-black uppercase font-mono shadow-[1px_1px_0px_0px_#000] ${activeStreamBadge.bg} ${activeStreamBadge.text} ${activeStreamBadge.border}`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  {profile.targetStream}
                </span>
              </div>
              <p className="text-xs text-black/60 font-semibold truncate">
                {profile.email || "aspirant@cuet-prep.in"}
              </p>
            </div>
          </div>

          {/* Quick Target College Pill with Edit Button */}
          <div className="flex items-center gap-2 bg-[#FAF7EE] border-2 border-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_#000] self-start sm:self-auto">
            <Building2 className="w-5 h-5 text-[#FF5C5C] shrink-0" />
            <div className="text-left pr-2">
              <p className="text-[10px] uppercase font-black text-black/50">
                Target College Goal
              </p>
              <p className="text-xs font-black text-black truncate max-w-[220px]">
                {profile.targetUniversity} — {profile.targetCollege}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsEditGoalsOpen(true)}
              className="p-1.5 rounded-lg border border-black bg-white hover:bg-[#FEF3C7] text-black shadow-[1px_1px_0px_0px_#000] transition-all"
              title="Change target college"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Selected Domain Subjects Aspirant is Preparing For */}
        <div className="p-4 bg-[#FAF7EE] rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#FF5C5C]" />
              <span>Target Domain Subjects ({profile.selectedSubjects?.length || 0} Preparing)</span>
            </span>
            <button
              type="button"
              onClick={() => setIsEditGoalsOpen(true)}
              className="text-xs font-black text-black hover:text-[#FF5C5C] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Subjects</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {(profile.selectedSubjects || []).length === 0 ? (
              <p className="text-xs text-black/60 font-semibold italic">
                No subjects selected yet. Click Edit Subjects to choose your domain papers.
              </p>
            ) : (
              (profile.selectedSubjects || []).map((subj) => (
                <span
                  key={subj}
                  className="px-3 py-1 rounded-lg bg-white border-2 border-black text-xs font-black text-black shadow-[2px_2px_0px_0px_#000]"
                >
                  {subj}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Quick Stats Pills: XP, Active Streak Flame, Campus Coins */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* XP Pill */}
          <div className="p-4 rounded-xl bg-[#EEF2FF] border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center text-[#4F46E5] shadow-[1px_1px_0px_0px_#000]">
                <Zap className="w-5 h-5 fill-[#4F46E5]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-black/60">
                  Total Experience
                </p>
                <p className="text-lg font-black text-black font-mono leading-none mt-0.5">
                  {profile.xp.toLocaleString()} XP
                </p>
              </div>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 bg-white rounded-md border border-black">
              {profile.xp >= 1500 ? "Level 3" : profile.xp >= 500 ? "Level 2" : "Level 1"}
            </span>
          </div>

          {/* Streak Flame Pill */}
          <div className="p-4 rounded-xl bg-[#FEF3C7] border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center text-[#D97706] shadow-[1px_1px_0px_0px_#000]">
                <Flame className="w-5 h-5 fill-[#F59E0B]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-black/60">
                  Practice Streak
                </p>
                <p className="text-lg font-black text-black font-mono leading-none mt-0.5">
                  {profile.currentStreak} Day{profile.currentStreak === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 bg-white rounded-md border border-black text-[#D97706]">
              {profile.currentStreak >= 7 ? "7d King 🔥" : "Active"}
            </span>
          </div>

          {/* Campus Coins Pill */}
          <div className="p-4 rounded-xl bg-[#D1FAE5] border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center text-[#059669] shadow-[1px_1px_0px_0px_#000]">
                <Coins className="w-5 h-5 text-[#059669]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-black/60">
                  Campus Coins
                </p>
                <p className="text-lg font-black text-black font-mono leading-none mt-0.5">
                  {profile.campusCoins} Coins
                </p>
              </div>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 bg-white rounded-md border border-black text-[#047857]">
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
        <section className="bg-white rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_#000] p-6 sm:p-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header with AI Mentor Status */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-black/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#FAF7EE] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
                  <Brain className="w-5 h-5 text-[#FF5C5C]" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-black tracking-tight">
                    AI Diagnostic & Exam Readiness
                  </h2>
                  <p className="text-xs text-black/60 font-semibold">
                    150-question calibration & historical cutoff benchmarks
                  </p>
                </div>
              </div>

              {/* Active Pulse Badge or Calibration Badge */}
              {effectiveDiagnostic.isAiMentorUnlocked ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1FAE5] border-2 border-black text-[11px] font-black text-black font-mono shadow-[1px_1px_0px_0px_#000]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                  </span>
                  <span>AI Mentor Active</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border-2 border-black text-[10px] font-black text-black font-mono shadow-[1px_1px_0px_0px_#000]">
                  <Clock className="w-3 h-3 text-[#D97706]" />
                  <span>Calibrating</span>
                </div>
              )}
            </div>

            {/* 1. AI Calibration Progress Meter */}
            <div className="p-4 rounded-xl bg-[#FAF7EE] border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-3">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-black flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#FF5C5C]" />
                  <span>AI Calibration Progress</span>
                </span>
                <span className="font-mono text-black">
                  {effectiveDiagnostic.totalAttempts} / 150 Qs ({effectiveDiagnostic.calibrationProgress}%)
                </span>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full h-3.5 bg-white rounded-full border-2 border-black overflow-hidden shadow-[1px_1px_0px_0px_#000]">
                <div
                  className="h-full bg-[#10B981] transition-all duration-500 rounded-full"
                  style={{ width: `${effectiveDiagnostic.calibrationProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-black/70">
                {effectiveDiagnostic.isAiMentorUnlocked ? (
                  <span className="text-[#059669] font-black flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    Baseline complete. Sub-second trap remediation active.
                  </span>
                ) : (
                  <span>
                    {Math.max(0, 150 - effectiveDiagnostic.totalAttempts)} more questions to establish full NTA timing accuracy.
                  </span>
                )}
                <span className="font-mono font-black text-black">
                  Acc: {effectiveDiagnostic.accuracyPercentage}%
                </span>
              </div>
            </div>

            {/* 2. Target College Readiness Index */}
            <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span className="text-xs font-black uppercase text-black">
                      Target College Readiness Index
                    </span>
                  </div>
                  <p className="text-xs font-bold text-black/80 mt-0.5">
                    {collegeBenchmark.collegeName} ({collegeBenchmark.campus})
                  </p>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full border text-[10px] font-black uppercase font-mono shadow-[1px_1px_0px_0px_#000] ${collegeBenchmark.statusBadgeClass}`}
                >
                  {collegeBenchmark.statusLabel}
                </span>
              </div>

              {/* Comparison Visual Meter */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-black text-black font-mono">
                  <span>Predicted: {collegeBenchmark.predictedPercentile}%tile</span>
                  <span>Cutoff: {collegeBenchmark.historicalCutoffPercentile}%tile ({collegeBenchmark.targetScoreFormatted})</span>
                </div>

                <div className="relative w-full h-4 bg-[#FAF7EE] rounded-full border-2 border-black overflow-hidden shadow-[1px_1px_0px_0px_#000]">
                  {/* Predicted Bar */}
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      collegeBenchmark.status === "surpassed"
                        ? "bg-[#10B981]"
                        : collegeBenchmark.status === "striking_distance"
                        ? "bg-[#F59E0B]"
                        : "bg-[#FF5C5C]"
                    }`}
                    style={{ width: `${Math.min(100, collegeBenchmark.predictedPercentile)}%` }}
                  />
                  {/* Cutoff Target Marker Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-black z-10"
                    style={{ left: `${Math.min(99, collegeBenchmark.historicalCutoffPercentile)}%` }}
                    title={`Target Cutoff: ${collegeBenchmark.historicalCutoffPercentile}%`}
                  />
                </div>
              </div>

              <p className="text-[11px] text-black/70 font-semibold leading-relaxed">
                {collegeBenchmark.recommendation}
              </p>
            </div>

            {/* 3. Persistent Red Zones */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Persistent Red Zones (Top 3 Weak Spots)</span>
                </span>
                <span className="text-[10px] text-black/60 font-mono font-bold">
                  Pacing Sinks
                </span>
              </div>

              {weakTopics.length === 0 ? (
                <div className="p-3.5 rounded-xl bg-[#FAF7EE] border-2 border-dashed border-black text-center text-xs font-bold text-black/60">
                  No chronic weak spots detected yet. Start solving mocks to populate your topic radar!
                </div>
              ) : (
                <div className="space-y-2">
                  {weakTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#FAF7EE] border-2 border-black flex items-center justify-between gap-3 shadow-[2px_2px_0px_0px_#000]"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] font-black flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-black text-black truncate">
                            {topic.microTopic}
                          </span>
                        </div>
                        <p className="text-[10px] text-black/60 font-bold truncate pl-5">
                          {topic.subject} • {topic.chapter}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-black text-[#DC2626] font-mono bg-[#FEE2E2] px-2 py-0.5 rounded border border-black">
                          {topic.accuracyPercentage}% Acc
                        </span>
                        {topic.fatalTimeSinks > 0 && (
                          <span className="text-[10px] font-black text-black/70 font-mono bg-white px-1.5 py-0.5 rounded border border-black/40">
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
          <div className="pt-4 border-t-2 border-black/10">
            <button
              type="button"
              disabled={isLaunchingDrill}
              onClick={handleLaunchFixDrill}
              className="w-full py-3 px-4 rounded-xl bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
        <section className="bg-white rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_#000] p-6 sm:p-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
                  <Crown className="w-5 h-5 text-[#D97706]" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-black tracking-tight">
                    Subscription & Study Alerts
                  </h2>
                  <p className="text-xs text-black/60 font-semibold">
                    Pass validity, push reminders & exam preferences
                  </p>
                </div>
              </div>
            </div>

            {/* Subscription Status Card */}
            <div
              className={`p-5 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-3.5 ${
                profile.isPremium ? "bg-[#EEF2FF]" : "bg-[#FAF7EE]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-black/60 font-mono">
                  Current Membership
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full border-2 text-[11px] font-black font-mono shadow-[1px_1px_0px_0px_#000] ${
                    profile.isPremium
                      ? "bg-[#D1FAE5] text-black border-black"
                      : "bg-white text-black/70 border-black"
                  }`}
                >
                  {profile.isPremium ? "Active AI Pass" : "Free Aspirant Tier"}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-black tracking-tight">
                  {profile.isPremium
                    ? "CUET AI Practice Pass (Valid until July 31)"
                    : "Free Tier (1 Domain Mock / Day)"}
                </h3>
                <p className="text-xs text-black/70 font-semibold mt-1 leading-relaxed">
                  {profile.isPremium
                    ? "Unlimited NTA CBT full mock simulations, instant NCERT mistake decrypter, and personalized Sunday ritual reports are fully unlocked."
                    : "Upgrade to unlock unlimited 50-Q NTA simulations, zero-token AI repair quizzes, and target college cutoff projections."}
                </p>
              </div>

              {/* If Free: High-contrast "Upgrade to AI Pass (₹399)" CTA triggering Razorpay modal */}
              {!profile.isPremium && (
                <div className="pt-2">
                  <UpgradeButton
                    planId="ai_pass_399"
                    variant="primary"
                    buttonText="Upgrade to AI Pass (₹399)"
                    className="w-full py-3 rounded-xl font-black text-xs shadow-[3px_3px_0px_0px_#000]"
                  />
                </div>
              )}
            </div>

            {/* Study Alerts & Web Push Preference */}
            <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] border border-black flex items-center justify-center">
                    <BellRing className="w-4 h-4 text-[#D97706]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-black">
                      Daily Revision Push Alerts
                    </h4>
                    <p className="text-[10px] text-black/60 font-semibold">
                      Automated 8:00 PM practice streak ping
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  onClick={handleTogglePush}
                  className={`w-12 h-6 rounded-full border-2 border-black p-0.5 transition-colors shadow-[1px_1px_0px_0px_#000] ${
                    pushEnabled ? "bg-[#10B981]" : "bg-black/20"
                  }`}
                  aria-label="Toggle push notifications"
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white border border-black transition-transform ${
                      pushEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {pushNotice && (
                <div className="p-2.5 rounded-lg bg-[#FAF7EE] border border-black text-[11px] font-bold text-black flex items-center justify-between">
                  <span>{pushNotice}</span>
                  <button
                    type="button"
                    onClick={() => setPushNotice(null)}
                    className="text-black/50 hover:text-black ml-2"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Test Notification Trigger Button */}
              <div className="flex items-center justify-between pt-2 border-t border-black/10 text-xs">
                <span className="text-[11px] text-black/60 font-bold">
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
                    className="text-[11px] font-black text-black hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Send Test Ping</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick System Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                href="/dashboard/mocks"
                className="p-2.5 rounded-lg bg-[#FAF7EE] border border-black hover:bg-white text-black flex items-center justify-between"
              >
                <span>Mock Tests</span>
                <Play className="w-3 h-3 text-black/50" />
              </Link>
              <Link
                href="/dashboard/leaderboard"
                className="p-2.5 rounded-lg bg-[#FAF7EE] border border-black hover:bg-white text-black flex items-center justify-between"
              >
                <span>DU Leaderboard</span>
                <TrophyIcon className="w-3 h-3 text-black/50" />
              </Link>
            </div>
          </div>

          {/* Account Security Quick Sign Out */}
          <div className="pt-3 border-t-2 border-black/10">
            <button
              type="button"
              onClick={() => setIsSignOutModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-[#FEE2E2] text-black hover:text-[#DC2626] font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#DC2626] transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out from Device</span>
            </button>
          </div>
        </section>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* CARD 3: GAMIFICATION & TROPHY SHELF */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_#000] p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
              <TrophyIcon className="w-6 h-6 text-[#D97706]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-black tracking-tight">
                  Gamification Trophy Shelf
                </h2>
                <span className="bg-[#FEF3C7] text-black text-[11px] font-black px-2.5 py-0.5 rounded-full border border-black font-mono shadow-[1px_1px_0px_0px_#000]">
                  {unlockedCount} / {trophies.length} Badges Earned
                </span>
              </div>
              <p className="text-xs text-black/60 font-semibold mt-0.5">
                Authentic NTA CBT mastery milestones awarding XP and redeemable Campus Coins.
              </p>
            </div>
          </div>
        </div>

        {/* Trophy Grid */}
        {trophies.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF7EE] rounded-xl border-2 border-dashed border-black space-y-2">
            <TrophyIcon className="w-8 h-8 text-black/40 mx-auto" />
            <h4 className="text-sm font-black text-black">No Badges Unlocked Yet</h4>
            <p className="text-xs text-black/60 max-w-sm mx-auto">
              Complete your first NTA domain mock test to unlock &quot;NCERT Sharpshooter&quot; or start a 7-day streak to claim &quot;Consistency King&quot;!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trophies.map((trophy) => {
              const isUnlocked = trophy.isUnlocked;

              return (
                <button
                  key={trophy.id}
                  type="button"
                  onClick={() => setSelectedTrophy(trophy)}
                  className={`group relative p-4 rounded-xl border-2 border-black text-left transition-all flex flex-col justify-between focus:outline-none cursor-pointer ${
                    isUnlocked
                      ? "bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] shadow-[3px_3px_0px_0px_#000]"
                      : "bg-[#FAF7EE] opacity-75 hover:opacity-100 shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  <div>
                    {/* Icon & Unlocked Status Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-11 h-11 rounded-lg border-2 border-black flex items-center justify-center transition-transform group-hover:scale-105 shadow-[2px_2px_0px_0px_#000] ${
                          isUnlocked ? "bg-[#FEF3C7] text-black" : "bg-black/10 text-black/40"
                        }`}
                      >
                        {trophy.icon === "Flame" ? (
                          <Flame className="w-5 h-5 text-[#D97706] fill-[#F59E0B]" />
                        ) : trophy.icon === "Zap" ? (
                          <Zap className="w-5 h-5 text-[#4F46E5] fill-[#4F46E5]" />
                        ) : trophy.icon === "Sparkles" ? (
                          <Sparkles className="w-5 h-5 text-[#D97706]" />
                        ) : (
                          <Target className="w-5 h-5 text-black" />
                        )}
                      </div>

                      {isUnlocked ? (
                        <span className="flex items-center gap-1 text-[10px] font-black text-black bg-[#D1FAE5] border border-black px-2 py-0.5 rounded-full shadow-[1px_1px_0px_0px_#000]">
                          <CheckCircle2 className="w-3 h-3 text-[#10B981] stroke-[2.5]" />
                          Unlocked
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-black text-black/60 bg-white border border-black px-2 py-0.5 rounded-full shadow-[1px_1px_0px_0px_#000]">
                          <Lock className="w-3 h-3 text-black/40" />
                          Locked
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-black text-sm tracking-tight text-black">
                      {trophy.title}
                    </h3>
                    <p className="mt-1 text-xs text-black/70 font-medium line-clamp-2 leading-relaxed">
                      {trophy.description}
                    </p>
                  </div>

                  {/* Bottom: Rewards or Progress */}
                  <div className="mt-4 pt-3 border-t-2 border-black/10">
                    {isUnlocked ? (
                      <div className="flex items-center justify-between text-[11px] font-black">
                        <span className="text-black font-mono">+{trophy.xpReward} XP</span>
                        <span className="text-[#D97706] font-mono">+{trophy.coinReward} Coins</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[10px] font-black text-black/50">
                        <span className="line-clamp-1">{trophy.criteria}</span>
                        <HelpCircle className="w-3 h-3 shrink-0 ml-1" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* PHASE 3: DEDICATED SIGN OUT FOOTER SECTION */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FAF7EE] border-2 border-black flex items-center justify-center text-black/70">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-black">Account Session Management</h4>
            <p className="text-xs text-black/60 font-semibold">
              Signed in as <span className="font-mono text-black">{profile.email}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsSignOutModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FEE2E2] text-black hover:text-[#DC2626] font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#DC2626] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
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

      <TrophyDetailModal
        trophy={selectedTrophy}
        onClose={() => setSelectedTrophy(null)}
      />
    </div>
  );
}
