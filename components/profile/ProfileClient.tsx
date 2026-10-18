"use client";

import React, { useState, useTransition, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  User,
  GraduationCap,
  Building2,
  Flame,
  Zap,
  Edit3,
  Sparkles,
  Target,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Crown,
  BellRing,
  LogOut,
  RefreshCw,
  ArrowRight,
  Shield,
  Activity,
  Calendar,
  Download,
  Trash2,
  Eye,
  EyeOff,
  HelpCircle,
  Info,
} from "lucide-react";
import {
  ProfileInitialData,
  StudentProfileData,
} from "@/types/profile";
import { StreamOption } from "@/types/database";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { computeAuthoritativeDiagnosticProgress } from "@/lib/diagnostic-status";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import {
  computeAnalyticsFromAttempts,
  deduplicateTestAttempts,
  normalizeSubject,
} from "@/lib/analytics";
import {
  enablePushNotifications,
  disablePushNotifications,
  isPushPreferenceEnabled,
  sendTestNotification,
} from "@/lib/push-notifications";
import { useTestStore } from "@/lib/store/useTestStore";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTarget } from "@/lib/hooks/useTarget";
import { getMockStats, MockStatsResult } from "@/lib/mock-stats";
import { createClient } from "@/lib/supabase/client";
import { safeStorage } from "@/lib/storage/safe-storage";
import { updateProfileGoalsAction } from "@/app/dashboard/profile/actions";
import EditGoalsModal from "@/components/profile/EditGoalsModal";
import InvalidTargetBanner from "@/components/profile/InvalidTargetBanner";
import SignOutModal from "@/components/profile/SignOutModal";
import ResetConfirmModal from "@/components/profile/ResetConfirmModal";
import UpgradeButton from "@/components/payments/UpgradeButton";

interface ProfileClientProps {
  initialData: ProfileInitialData;
}

// Computes next upcoming CUET UG cycle dynamically from current date (e.g. May 2027 as of Oct 2026)
function getUpcomingCuetSeasons(): string[] {
  const now = new Date();
  const year = now.getFullYear();
  // CUET UG exam window is in May (month index 4)
  const isPastMay = now.getMonth() > 4;
  const startYear = isPastMay ? year + 1 : year;
  return [`May ${startYear}`, `May ${startYear + 1}`];
}

export default function ProfileClient({ initialData }: ProfileClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Zustand stores & single source of truth for dream targets
  const zustandUser = useTestStore((state) => state.user);
  const rawTestAttempts = useTestStore((state) => state.testAttempts);
  const rawAnalytics = useTestStore((state) => state.analytics);
  const loginUser = useTestStore((state) => state.loginUser);
  const setTargetCollege = useTestStore((state) => state.setTargetCollege);
  const logout = useTestStore((state) => state.logout);
  const clearAttempts = useTestStore((state) => state.clearAttempts);

  // Authoritative target from single source of truth useTarget()
  const target = useTarget();

  // Deduplicated test attempts
  const testAttempts = useMemo(() => {
    const list =
      rawTestAttempts && rawTestAttempts.length > 0
        ? rawTestAttempts
        : initialData.serverAttempts || [];
    return deduplicateTestAttempts(list);
  }, [rawTestAttempts, initialData.serverAttempts]);

  // Optimistic Profile State
  const [profile, setProfile] = useState<StudentProfileData>(initialData.profile);

  // Modals state
  const [isEditGoalsOpen, setIsEditGoalsOpen] = useState(false);
  const [clearCourseOnOpen, setClearCourseOnOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Handle URL query parameters to open Edit Goals modal with course cleared if flagged
  useEffect(() => {
    if (searchParams?.get("editGoals") === "true") {
      if (searchParams.get("clearCourse") === "true") {
        setClearCourseOnOpen(true);
      }
      setIsEditGoalsOpen(true);
    }
  }, [searchParams]);

  // Status message toast
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [isLaunchingDrill, setIsLaunchingDrill] = useState(false);

  // Push Notifications & Reminder Time
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushNotice, setPushNotice] = useState<string | null>(null);
  const [reminderTime, setReminderTime] = useState<string>("20:00");

  // Upcoming CUET exam seasons dynamically calculated from date
  const upcomingSeasons = useMemo(() => getUpcomingCuetSeasons(), []);
  const [examDate, setExamDate] = useState<string>(upcomingSeasons[0] || "May 2027");

  // Leaderboard Privacy: default for new users is anonymous (privacy-safe) unless user previously consented
  const [isAnonymous, setIsAnonymous] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const saved = localStorage.getItem("cuet_leaderboard_anonymous");
      if (saved === null) return true; // Default anonymous for new users
      return saved === "true";
    } catch {
      return true;
    }
  });

  // Load push preference, reminder time & exam season from storage
  useEffect(() => {
    setPushEnabled(isPushPreferenceEnabled());

    try {
      const savedTime = localStorage.getItem("cuet_push_reminder_time");
      if (savedTime) setReminderTime(savedTime);

      const savedDate = localStorage.getItem("cuet_target_exam_date");
      if (savedDate) setExamDate(savedDate);
      else setExamDate(upcomingSeasons[0] || "May 2027");

      const savedAnon = localStorage.getItem("cuet_leaderboard_anonymous");
      if (savedAnon !== null) {
        setIsAnonymous(savedAnon === "true");
      }
    } catch {
      // Safe fallback
    }

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

    if (zustandUser && zustandUser.id === profile.id) {
      if (zustandUser.dailyStreak !== profile.currentStreak || zustandUser.xpPoints > profile.xp) {
        setProfile((prev) => ({
          ...prev,
          currentStreak: zustandUser.dailyStreak,
          xp: Math.max(prev.xp, zustandUser.xpPoints),
          campusCoins: Math.max(prev.campusCoins, zustandUser.campusCoins ?? 0),
        }));
      }
    }
  }, [profile.id, zustandUser, profile.currentStreak, profile.xp, upcomingSeasons]);

  // Hydrate store if empty and server provided real attempts
  useEffect(() => {
    if (initialData.serverAttempts && initialData.serverAttempts.length > 0) {
      const currentAttempts = useTestStore.getState().testAttempts;
      if (!currentAttempts || currentAttempts.length === 0) {
        useTestStore.setState({
          testAttempts: initialData.serverAttempts,
          analytics: computeAnalyticsFromAttempts(initialData.serverAttempts),
        });
      }
    }
  }, [initialData.serverAttempts]);

  // Deduplicated attempt totals for diagnostic progress
  const totalAttempted = useMemo(() => {
    return testAttempts.reduce((sum, a) => sum + (a.attemptedCount || 0), 0);
  }, [testAttempts]);

  const totalCorrect = useMemo(() => {
    return testAttempts.reduce((sum, a) => sum + (a.correctCount || 0), 0);
  }, [testAttempts]);

  const overallAccuracy =
    totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  // Single authoritative diagnostic progress
  const diagnosticProgress = useMemo(() => {
    return computeAuthoritativeDiagnosticProgress({
      totalAttempted,
    });
  }, [totalAttempted]);

  // Progress percentage strictly derived from the same numbers: totalAttempted / 150
  const diagnosticCount = diagnosticProgress.isUnlocked ? 150 : Math.min(150, totalAttempted);
  const diagnosticPct = diagnosticProgress.isUnlocked
    ? 100
    : Math.min(100, Math.round((totalAttempted / 150) * 100));

  // ────────────────────────────────────────────────────────────
  // REQUIRED SUBJECTS & MOCK AVERAGES FROM getMockStats
  // ────────────────────────────────────────────────────────────
  const requiredSubjects = useMemo(() => {
    if (target.requiredSubjects && target.requiredSubjects.length > 0) {
      return target.requiredSubjects;
    }
    const perSubjKeys = Object.keys(target.perSubjectTargets || {}).filter(
      (k) => k.length > 0 && k === k.toLowerCase()
    );
    if (perSubjKeys.length > 0) {
      return perSubjKeys.map((k) => normalizeSubject(k).name);
    }
    return ["Physics", "Chemistry", "Mathematics"];
  }, [target.requiredSubjects, target.perSubjectTargets]);

  const subjectMockStatsMap = useMemo(() => {
    const map = new Map<string, MockStatsResult>();
    requiredSubjects.forEach((sub) => {
      map.set(sub, getMockStats(sub, testAttempts));
    });
    return map;
  }, [requiredSubjects, testAttempts]);

  const missingSubjects = useMemo(() => {
    return requiredSubjects.filter((sub) => {
      const st = subjectMockStatsMap.get(sub);
      return !st || !st.hasAttempts;
    });
  }, [requiredSubjects, subjectMockStatsMap]);

  const allRequiredHaveData = missingSubjects.length === 0 && requiredSubjects.length > 0;

  const currentMockAvgPerSubject = useMemo(() => {
    if (!allRequiredHaveData) return 0;
    let sum = 0;
    requiredSubjects.forEach((sub) => {
      sum += subjectMockStatsMap.get(sub)?.averageScore || 0;
    });
    return Math.round((sum / requiredSubjects.length) * 10) / 10;
  }, [allRequiredHaveData, requiredSubjects, subjectMockStatsMap]);

  const marksGap = useMemo(() => {
    return Math.round((target.perSubjectTarget - currentMockAvgPerSubject) * 10) / 10;
  }, [target.perSubjectTarget, currentMockAvgPerSubject]);

  // ────────────────────────────────────────────────────────────
  // WEAKNESS DATA (Top 3 with >= 10 questions requirement)
  // ────────────────────────────────────────────────────────────
  const rawWeaknesses = useMemo(() => {
    return rawAnalytics?.weaknessRadar && rawAnalytics.weaknessRadar.length > 0
      ? rawAnalytics.weaknessRadar
      : initialData.weakTopics?.map((wt) => ({
          chapter: wt.chapter,
          microTopic: wt.microTopic,
          subject: wt.subject,
          accuracyPercentage: wt.accuracyPercentage,
          attemptsCount: wt.totalAttempts,
          correctCount: 0,
          incorrectCount: wt.totalAttempts,
          timeSinksCount: wt.fatalTimeSinks,
          avgTimeSeconds: wt.avgTimeSeconds,
          status: "critical" as const,
        })) || [];
  }, [rawAnalytics?.weaknessRadar, initialData.weakTopics]);

  const qualifyingWeaknesses = useMemo(() => {
    return [...rawWeaknesses]
      .filter((w) => (w.attemptsCount || 0) >= 10)
      .sort((a, b) => {
        if (a.accuracyPercentage !== b.accuracyPercentage) {
          return a.accuracyPercentage - b.accuracyPercentage;
        }
        return (b.incorrectCount || 0) - (a.incorrectCount || 0);
      });
  }, [rawWeaknesses]);

  const top3Weaknesses = useMemo(() => {
    return qualifyingWeaknesses.slice(0, 3);
  }, [qualifyingWeaknesses]);

  // ────────────────────────────────────────────────────────────
  // SETTINGS HANDLERS
  // ────────────────────────────────────────────────────────────
  const handleExamDateChange = (val: string) => {
    setExamDate(val);
    try {
      localStorage.setItem("cuet_target_exam_date", val);
      setStatusMessage({ type: "success", text: `Target exam season set to ${val}.` });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch {
      // Safe fallback
    }
  };

  const handleToggleLeaderboardPrivacy = () => {
    const nextVal = !isAnonymous;
    setIsAnonymous(nextVal);
    try {
      localStorage.setItem("cuet_leaderboard_anonymous", String(nextVal));
      setStatusMessage({
        type: "success",
        text: nextVal
          ? "You will appear as Anonymous on the leaderboard."
          : "Your name and college will be visible on the leaderboard.",
      });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch {
      // Safe fallback
    }
  };

  const handleReminderTimeChange = (timeVal: string) => {
    setReminderTime(timeVal);
    try {
      localStorage.setItem("cuet_push_reminder_time", timeVal);
      setStatusMessage({ type: "success", text: `Daily reminder set to ${timeVal}.` });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch {
      // Safe fallback
    }
  };

  const handleTogglePush = async () => {
    if (pushEnabled) {
      disablePushNotifications();
      setPushEnabled(false);
      setPushNotice("Daily revision push reminders paused.");
      setTimeout(() => setPushNotice(null), 4000);
      return;
    }

    const res = await enablePushNotifications(profile.id);
    if (res.success) {
      setPushEnabled(true);
      setPushNotice(`Daily ${reminderTime} revision reminders enabled!`);
      setTimeout(() => setPushNotice(null), 5000);
    } else {
      setPushNotice(res.message);
      setTimeout(() => setPushNotice(null), 6000);
    }
  };

  const handleTestNotification = () => {
    const success = sendTestNotification();
    if (success) {
      setPushNotice("Test notification sent to your browser!");
    } else {
      setPushNotice("Unable to dispatch notification. Please ensure permissions are granted.");
    }
    setTimeout(() => setPushNotice(null), 4000);
  };

  // ────────────────────────────────────────────────────────────
  // GOALS UPDATE HANDLER (Combined Flow)
  // ────────────────────────────────────────────────────────────
  const handleSaveGoals = async (updatedData: {
    targetStream: StreamOption;
    targetUniversity: string;
    targetCollege: string;
    targetCourse: string;
    fullName: string;
    selectedSubjects: string[];
  }) => {
    const previousProfile = { ...profile };
    const finalSubjects = getSubjectsForStream(updatedData.targetStream);

    // 1. Optimistic UI & Store updates
    setProfile((prev) => ({
      ...prev,
      targetStream: updatedData.targetStream,
      targetUniversity: updatedData.targetUniversity,
      targetCollege: updatedData.targetCollege,
      fullName: updatedData.fullName,
      selectedSubjects: finalSubjects,
    }));

    loginUser({
      name: updatedData.fullName,
      preferredStream: updatedData.targetStream.toLowerCase() as any,
      targetUniversity: updatedData.targetUniversity,
      targetCollege: updatedData.targetCollege,
      targetCourse: updatedData.targetCourse,
      selectedSubjects: finalSubjects,
    });
    setTargetCollege(updatedData.targetCollege);

    try {
      // 2. Perform Server Action
      const result = await updateProfileGoalsAction({
        targetStream: updatedData.targetStream,
        targetUniversity: updatedData.targetUniversity,
        targetCollege: updatedData.targetCollege,
        targetCourse: updatedData.targetCourse,
        fullName: updatedData.fullName,
        selectedSubjects: finalSubjects,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to update profile goals");
      }

      setClearCourseOnOpen(false);
      setStatusMessage({
        type: "success",
        text: "Target updated. Your dashboard and recommendations are refreshed.",
      });
      setTimeout(() => setStatusMessage(null), 5000);

      startTransition(() => {
        router.refresh();
      });
    } catch (err: any) {
      setProfile(previousProfile);
      setStatusMessage({
        type: "error",
        text: `Failed to save changes: ${err?.message || "Network error. Reverting targets."}`,
      });
      throw err;
    }
  };

  // ────────────────────────────────────────────────────────────
  // FIX DRILL LAUNCH
  // ────────────────────────────────────────────────────────────
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
        startTransition(() => {
          router.push(`/test/${data.testId}`);
        });
      } else if (data.error === "QUALIFICATION_GATE_LOCKED") {
        setStatusMessage({
          type: "info",
          text: `Diagnostic requires 150 baseline questions. You're at ${diagnosticCount}/150! Complete domain mocks to unlock.`,
        });
        setIsLaunchingDrill(false);
      } else {
        startTransition(() => {
          router.push("/dashboard/mocks");
        });
      }
    } catch {
      startTransition(() => {
        router.push("/dashboard/mocks");
      });
    }
  };

  // ────────────────────────────────────────────────────────────
  // DATA MANAGEMENT & SIGN OUT
  // ────────────────────────────────────────────────────────────
  const handleExportData = () => {
    try {
      const exportPayload = {
        profile,
        target: {
          college: target.college,
          course: target.course,
          projectedCutoff: target.expectedCutoff,
          perSubjectTarget: target.perSubjectTarget,
        },
        attempts: testAttempts || [],
        settings: {
          examDate,
          isAnonymous,
          pushEnabled,
          reminderTime,
        },
        exportedAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cuet-prep-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusMessage({ type: "success", text: "Prep data successfully exported as JSON file." });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch {
      setStatusMessage({ type: "error", text: "Failed to export prep data." });
    }
  };

  const handleResetConfirmed = () => {
    try {
      clearAttempts();
      if (typeof window !== "undefined") {
        localStorage.removeItem("cbt_completed_attempts");
        localStorage.removeItem("cuet_user_attempts");
      }
      setStatusMessage({
        type: "success",
        text: "Practice data reset successfully. Dashboard and targets refreshed.",
      });
      setTimeout(() => setStatusMessage(null), 5000);
      startTransition(() => {
        router.refresh();
      });
    } catch {
      setStatusMessage({ type: "error", text: "Failed to reset practice data." });
    }
  };

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Supabase auth signout warning:", e);
    }

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

    if (typeof window !== "undefined") {
      try {
        safeStorage.clearUserScopedData(zustandUser?.id || initialData.profile?.id || "");
      } catch {
        // Safe fallback
      }
    }

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

  const streamBadgeColors: Record<StreamOption, { bg: string; text: string; border: string }> = {
    Science: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    Commerce: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
    Humanities: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  };
  const activeStreamBadge = streamBadgeColors[profile.targetStream] || streamBadgeColors.Science;

  const displaySubjects =
    profile.selectedSubjects && profile.selectedSubjects.length > 0
      ? profile.selectedSubjects
      : getSubjectsForStream(profile.targetStream);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Title & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Profile
          </h1>
        </div>

        <button
          type="button"
          onClick={() => {
            setClearCourseOnOpen(false);
            setIsEditGoalsOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 shadow-xs hover:shadow transition-all cursor-pointer self-start sm:self-auto"
        >
          <Edit3 className="w-4 h-4 text-slate-500" />
          <span>Edit goals</span>
        </button>
      </div>

      {/* Target combo validation warning if user has invalid pair */}
      <InvalidTargetBanner
        college={target.college || profile.targetCollege}
        course={target.course}
        onOpenEditModal={() => {
          setClearCourseOnOpen(true);
          setIsEditGoalsOpen(true);
        }}
      />

      {/* Global Status Message Toast */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 animate-in fade-in duration-150 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : statusMessage.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
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
      {/* SECTION 1: HERO & ACADEMIC IDENTITY CARD */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            {/* Student Avatar */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-xs shrink-0">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-xs">
                <Shield className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Name, Email, Stream */}
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  {profile.fullName || "CUET Aspirant"}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold font-sans ${activeStreamBadge.bg} ${activeStreamBadge.text} ${activeStreamBadge.border}`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  {profile.targetStream}
                </span>
              </div>
              <p className="text-[13px] text-slate-500 font-medium font-sans">
                {profile.email || "aspirant@cuet-prep.in"}
              </p>
            </div>
          </div>

          {/* Quick Target College Goal Pill with Edit Button (No Cutoff) */}
          <div className="flex items-start gap-3 bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl self-start sm:self-auto max-w-sm">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="text-left flex-1 min-w-0 pr-1">
              <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                Target College Goal
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug break-words">
                {target.college} — {target.course}
                {target.isUnverified && (
                  <span className="ml-1.5 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-semibold border border-amber-200">
                    unverified
                  </span>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setClearCourseOnOpen(false);
                setIsEditGoalsOpen(true);
              }}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition-all cursor-pointer shrink-0"
              title="Change target goals"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stream Domain Subjects Calibrated for Candidate */}
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Stream Domain Subjects ({profile.targetStream || "Science"} Stream · {displaySubjects.length} Domains)</span>
            </span>
            <button
              type="button"
              onClick={() => setIsEditGoalsOpen(true)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              <span>Change stream</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {displaySubjects.map((subj) => (
              <span
                key={subj}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs"
              >
                {subj}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Stats: Total Experience with tooltip & Practice Streak Flame */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* XP Pill with Info Tooltip */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                <Zap className="w-5 h-5 fill-indigo-500 text-indigo-500" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-900/60">
                    Total Experience
                  </p>
                  <span
                    className="cursor-help text-indigo-400 hover:text-indigo-600 inline-flex items-center"
                    title="Earn XP by attempting tests (+10 XP per correct answer, +50 XP per completed mock). Level 1 (<500 XP), Level 2 (500-1499 XP), Level 3 (1500+ XP)."
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </span>
                </div>
                <p className="text-lg font-extrabold text-slate-900 font-sans leading-none mt-0.5">
                  {profile.xp.toLocaleString()} XP
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-white text-indigo-700 rounded-full border border-indigo-100 shadow-xs">
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
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-900/60">
                  Practice Streak
                </p>
                <p className="text-lg font-extrabold text-slate-900 font-sans leading-none mt-0.5">
                  {profile.currentStreak} Day{profile.currentStreak === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-white text-amber-700 rounded-full border border-amber-100 shadow-xs">
              {profile.currentStreak >= 7 ? "7d Streak Master" : "Active"}
            </span>
          </div>

          {/* TODO: Campus Coins currently have no redemption store or spending mechanism in the app. Hiding coins tile until redemption catalog is implemented. */}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* TWO-COLUMN GRID: CARD 2 (DIAGNOSTIC & READINESS) & CARD 3 (SETTINGS) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ──────────────────────────────────────────────────────────── */}
        {/* CARD 2: DIAGNOSTIC READINESS & WEAK TOPICS */}
        {/* ──────────────────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Diagnostic & Readiness
                </h2>
                <p className="text-[13px] text-slate-500 font-medium">
                  150-question calibration & projected cutoff benchmarks
                </p>
              </div>
            </div>

            {/* Status Badge: Diagnostic complete or Diagnostic in progress */}
            {diagnosticProgress.isUnlocked ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                Diagnostic complete
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
                Diagnostic in progress
              </span>
            )}
          </div>

          {/* 1. Diagnostic Calibration Progress Meter */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
              <span className="text-slate-700 flex items-center gap-1.5 font-bold">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Diagnostic Calibration Progress</span>
              </span>
              <span className="text-slate-800 font-bold">
                {diagnosticCount} / 150 Qs ({diagnosticPct}%)
              </span>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                style={{ width: `${diagnosticPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[13px] text-slate-600 font-medium pt-0.5">
              <span>
                {diagnosticProgress.isUnlocked
                  ? "Diagnostic complete. Practice recommendations are on."
                  : `${Math.max(0, 150 - totalAttempted)} more questions to establish baseline calibration.`}
              </span>
              <span className="font-bold text-slate-800 shrink-0 ml-2">
                Overall accuracy: {overallAccuracy}%
              </span>
            </div>
          </div>

          {/* 2. Target College Readiness Card (Data-Driven from useTarget & getMockStats) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Target College Readiness
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug break-words">
                  {target.college} — {target.course}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Projected for {target.projectedYear || 2027}: <strong className="text-slate-800">{target.expectedCutoff} / {target.cutoffScale} marks</strong>
                  {target.likelyRange && (
                    <span className="text-slate-400 ml-1">
                      ({typeof target.likelyRange === 'string' ? target.likelyRange : target.likelyRange.label})
                    </span>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditGoalsOpen(true)}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer shrink-0"
                title="Edit target college and course"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Per-Subject Target Note */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-semibold text-slate-600">Per-subject target: </span>
                <strong className="text-slate-900">{target.perSubjectTarget} marks</strong>
                <span className="text-slate-500 ml-1">(split equally across {requiredSubjects.length} subjects)</span>
              </div>
              {allRequiredHaveData && (
                <div>
                  <span className="font-semibold text-slate-600">Your mock average: </span>
                  <strong className="text-blue-600">{currentMockAvgPerSubject} marks</strong>
                </div>
              )}
            </div>

            {/* Gap in Marks or Missing Subjects Guidance */}
            {allRequiredHaveData ? (
              <div className="space-y-2">
                <div className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 ${
                  marksGap <= 0
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-amber-50 border-amber-200 text-amber-900"
                }`}>
                  <span>
                    {marksGap <= 0
                      ? "Your average mock score meets or exceeds the projected target!"
                      : `On average you need ${marksGap} more marks per subject`}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-current font-bold shrink-0">
                    {marksGap <= 0 ? "Target Met" : `${marksGap} marks to go`}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500 font-medium">
                    <span>Current Average ({currentMockAvgPerSubject})</span>
                    <span>Target ({target.perSubjectTarget})</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        marksGap <= 0 ? "bg-emerald-500" : "bg-blue-600"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.max(5, Math.round((currentMockAvgPerSubject / target.perSubjectTarget) * 100)))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 space-y-2">
                <div className="font-semibold flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Take mocks to see your gap:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span className="text-slate-600 text-xs">Take mocks in</span>
                  {missingSubjects.map((subName) => {
                    const norm = normalizeSubject(subName);
                    return (
                      <Link
                        key={subName}
                        href={`/dashboard/mocks/${norm.key}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-700 font-bold hover:bg-blue-100/60 transition-colors text-xs"
                      >
                        <span>{subName}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    );
                  })}
                  <span className="text-slate-600 text-xs">to see your gap</span>
                </div>
              </div>
            )}
          </div>

          {/* 3. Weakness Section: Top 3 Weak Topics (Min 10 Qs) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
                  Priority Focus Topics
                </h3>
              </div>
              <Link
                href="/dashboard/radar"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View all
              </Link>
            </div>

            {top3Weaknesses.length > 0 ? (
              <div className="space-y-2">
                {top3Weaknesses.map((topicItem, idx) => {
                  const qCount = topicItem.attemptsCount || 0;
                  const qText = `${qCount} question${qCount === 1 ? "" : "s"}`;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {topicItem.microTopic || topicItem.chapter}
                        </p>
                        <p className="text-[13px] text-slate-500 truncate">
                          {topicItem.subject} · {qText}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 shrink-0">
                        {topicItem.accuracyPercentage}% accuracy
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center py-4 space-y-1">
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  Not enough data yet
                </p>
                <p className="text-[13px] text-slate-500 max-w-sm mx-auto">
                  Attempt at least 10 questions per topic to identify priority focus areas.
                </p>
              </div>
            )}
          </div>

          {/* Direct "Launch 15-Q Fix Drill" Button */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              type="button"
              disabled={isLaunchingDrill}
              onClick={handleLaunchFixDrill}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLaunchingDrill ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Compiling Adaptive Fix Drill...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Launch 15-Q Fix Drill for Weak Topics</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {top3Weaknesses.length > 0 && (
              <p className="text-xs text-slate-500 text-center font-medium">
                Covers: {top3Weaknesses.slice(0, 2).map((w) => w.microTopic || w.chapter).join(", ")}
                {top3Weaknesses.length > 2 ? `, +${top3Weaknesses.length - 2}` : ""}
              </p>
            )}
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* CARD 3: SUBSCRIPTION & SETTINGS */}
        {/* ──────────────────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Crown className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Subscription & Settings
                </h2>
                <p className="text-[13px] text-slate-500 font-medium">
                  Plan access, privacy & exam preferences
                </p>
              </div>
            </div>
          </div>

          {/* Subscription Status Card (Single tier wording) */}
          <div
            className={`p-5 rounded-2xl border space-y-3.5 ${
              profile.isPremium
                ? "bg-indigo-50/50 border-indigo-100"
                : "bg-slate-50 border-slate-200/70"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Current Plan
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  profile.isPremium
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-white text-slate-600 border-slate-200"
                }`}
              >
                {profile.isPremium ? "Active AI Pass" : "Free Plan"}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {profile.isPremium ? "CUET AI Practice Pass (Active)" : "Free Plan: 1 Full Mock per Day"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed">
                {profile.isPremium
                  ? "Unlimited full-length CUET mock simulations, targeted weak-topic practice drills, and All-India standing analytics are active."
                  : "Free plan includes 1 official mock test per day with complete score breakdown and answer key explanations. Upgrade to unlock unlimited simulations."}
              </p>
            </div>

            {!profile.isPremium && (
              <div className="pt-2">
                {/* TODO: AI Pass is ₹399 one-time payment for 1 full year access across the CUET UG admission cycle */}
                <UpgradeButton
                  planId="ai_pass_399"
                  variant="primary"
                  buttonText="Upgrade to AI Pass (₹399 · 1-year access)"
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow"
                />
              </div>
            )}
          </div>

          {/* Target Exam Season Setting (Dynamically computed from date) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Calendar className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Target Exam Season</h4>
                <p className="text-[13px] text-slate-500 font-medium">Upcoming CUET UG Cycle</p>
              </div>
            </div>
            <SearchableSelect
              ariaLabel="Target Exam Season"
              value={examDate}
              onChange={(val) => handleExamDateChange(val)}
              options={upcomingSeasons.map((season) => ({
                value: season,
                label: `CUET UG ${season}`,
              }))}
              buttonClassName="px-3 py-1.5 text-xs sm:text-sm font-semibold bg-slate-50 border-slate-200 rounded-xl text-slate-800"
            />
          </div>

          {/* Leaderboard Privacy Explicit Toggle */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                  {isAnonymous ? <EyeOff className="w-4 h-4 text-amber-600" /> : <Eye className="w-4 h-4 text-slate-600" />}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Show my name on the leaderboard
                  </h4>
                  <p className="text-[13px] text-slate-500 font-medium">
                    {isAnonymous
                      ? "You appear as Anonymous on the leaderboard"
                      : "Your name and college are visible"}
                  </p>
                </div>
              </div>

              {/* On = visible (!isAnonymous), Off = hidden (isAnonymous) */}
              <button
                type="button"
                onClick={handleToggleLeaderboardPrivacy}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                  !isAnonymous ? "bg-blue-600" : "bg-slate-200"
                }`}
                aria-label="Toggle show name on leaderboard"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    !isAnonymous ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="pt-1 pl-10.5">
              <Link
                href="/dashboard/leaderboard"
                className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                <span>See how I appear</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Daily Revision Push Alerts with Time Picker */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <BellRing className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Daily Revision Push Alerts
                  </h4>
                  <p className="text-[13px] text-slate-500 font-medium">
                    Automated practice streak and revision reminder
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTogglePush}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                  pushEnabled ? "bg-blue-600" : "bg-slate-200"
                }`}
                aria-label="Toggle push alerts"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    pushEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Custom Time Picker when Enabled */}
            {pushEnabled && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs sm:text-sm">
                <span className="font-medium text-slate-600">Reminder time:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => handleReminderTimeChange(e.target.value)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleTestNotification}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline ml-2"
                  >
                    Send test ping
                  </button>
                </div>
              </div>
            )}

            {pushNotice && (
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center justify-between">
                <span>{pushNotice}</span>
                <button
                  type="button"
                  onClick={() => setPushNotice(null)}
                  className="text-blue-500 hover:text-blue-800 font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* SECTION 4: DATA & PRACTICE HISTORY (Danger Zone) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Data Management
          </h3>
          <p className="text-[13px] text-slate-500 font-medium">
            Export your preparation data or reset your local practice history.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              Download your study data
            </p>
            <p className="text-[13px] text-slate-500">
              Export all your CBT sessions, answer telemetry, and settings in JSON format.
            </p>
          </div>
          <button
            type="button"
            onClick={handleExportData}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export my data (JSON)</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-semibold text-rose-900">
              Reset practice data
            </p>
            <p className="text-[13px] text-slate-500">
              Clear mock test sessions, averages, streak, and diagnostic progress. Keeps your XP and saved target.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs sm:text-sm border border-rose-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>Reset Practice Data</span>
          </button>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* SECTION 5: ACCOUNT SESSION & SIGN OUT */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-slate-900">Account Session</h4>
            <p className="text-[13px] text-slate-500 font-medium truncate">
              Signed in as <span className="text-slate-800 font-semibold">{profile.email}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsSignOutModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
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
        onClose={() => {
          setIsEditGoalsOpen(false);
          setClearCourseOnOpen(false);
        }}
        initialStream={profile.targetStream}
        initialUniversity={profile.targetUniversity}
        initialCollege={target.college || profile.targetCollege}
        initialCourse={clearCourseOnOpen ? "" : target.course}
        initialFullName={profile.fullName}
        initialSelectedSubjects={profile.selectedSubjects || []}
        onSave={handleSaveGoals}
      />

      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirmed}
      />

      <SignOutModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirm={handleSignOut}
      />
    </div>
  );
}
