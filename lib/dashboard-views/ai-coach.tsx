import React from "react";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import AICoachClient from "@/components/dashboard/ai-coach/AICoachClient";
import { checkSubjectEligibility } from "@/lib/ai-coach/stats-engine";
import {
  getDailyUsageCount,
  getNextMidnightIST,
} from "@/lib/ai-coach/quota-engine";
import { AI_COACH_CONFIG } from "@/lib/ai-coach/config";
import { SubjectEligibility } from "@/types/ai-coach";

export const metadata: Metadata = {
  title: "AI Coach | CUET AI-Prep",
  description:
    "Targeted subject diagnostic analysis, error pattern classification, and personalized score-improvement strategy.",
};

const DEFAULT_SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology"];

export default async function AICoachPage() {
  let userId = "guest";
  let enrolledSubjects = DEFAULT_SUBJECTS;

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.id) {
      userId = user.id;

      const admin = createAdminClient();
      const { data: profile } = await admin
        .from("profiles")
        .select("selected_subjects")
        .eq("id", user.id)
        .maybeSingle();

      if (
        profile?.selected_subjects &&
        Array.isArray(profile.selected_subjects) &&
        profile.selected_subjects.length > 0
      ) {
        enrolledSubjects = profile.selected_subjects;
      }
    }
  } catch (err) {
    console.warn("AICoachPage SSR session load fallback:", err);
  }

  // Pre-fetch eligibilities for enrolled subjects
  let initialSubjects: SubjectEligibility[] = [];
  try {
    initialSubjects = await Promise.all(
      enrolledSubjects.map((sub) => checkSubjectEligibility(userId, sub))
    );
  } catch {
    initialSubjects = enrolledSubjects.map((sub) => ({
      subject: sub,
      freshQuestionsCount: 0,
      isUnlocked: false,
      requiredQuestions: AI_COACH_CONFIG.FRESH_QUESTIONS_THRESHOLD,
      questionsRemaining: AI_COACH_CONFIG.FRESH_QUESTIONS_THRESHOLD,
      reportsLeftToday: AI_COACH_CONFIG.DAILY_REPORT_LIMIT,
      dailyLimitReached: false,
      nextResetIso: getNextMidnightIST(),
    }));
  }

  const dailyUsage = await getDailyUsageCount(userId);
  const reportsLeftToday = Math.max(0, AI_COACH_CONFIG.DAILY_REPORT_LIMIT - dailyUsage);
  const dailyLimitReached = reportsLeftToday === 0;
  const nextResetIso = getNextMidnightIST();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <AICoachClient
        initialSubjects={initialSubjects}
        initialReportsLeftToday={reportsLeftToday}
        initialDailyLimitReached={dailyLimitReached}
        initialNextResetIso={nextResetIso}
      />
    </div>
  );
}
