import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileClient from "@/components/profile/ProfileClient";
import {
  ProfileInitialData,
  StudentProfileData,
  DiagnosticReadiness,
  WeakMicroTopicItem,
  ProfileTrophyItem,
} from "@/types/profile";
import { calculateCollegeReadiness } from "@/lib/college-benchmarks";
import { MASTER_TROPHIES } from "@/lib/gamification";
import { StreamOption } from "@/types/database";

export const metadata: Metadata = {
  title: "Aspirant Profile & Readiness | CUET AI-Prep",
  description:
    "Student academic identity, 150-question AI diagnostic calibration meter, target college cutoff comparison, and achievement trophies.",
};

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const cuetAuth = cookieStore.get("cuet_auth")?.value === "1";

  // 1. Establish Default Fallback Profile Data
  let initialProfile: StudentProfileData = {
    id: "guest",
    fullName: "CUET Aspirant",
    email: "aspirant@cuet-prep.in",
    targetStream: "Science",
    targetUniversity: "Delhi University",
    targetCollege: "SRCC",
    xp: 0,
    campusCoins: 50,
    currentStreak: 1,
    isPremium: false,
    subscriptionTier: "free",
    subscriptionExpiresAt: null,
    selectedSubjects: ["Physics", "Chemistry", "Mathematics"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  let totalAttempts = 0;
  let correctAttempts = 0;
  let accuracyPercentage = 0;
  let weakTopics: WeakMicroTopicItem[] = [];
  let userUnlockedTrophyMap: Record<string, string> = {};

  // 2. Fetch authenticated Supabase session & real-time data
  try {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser && !cuetAuth) {
      redirect("/signup");
    }

    if (authUser) {
      initialProfile.id = authUser.id;
      initialProfile.email = authUser.email || "aspirant@cuet-prep.in";

      // 2a. Query public.profiles
      const { data: profileRow } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();

      if (profileRow) {
        initialProfile = {
          id: profileRow.id,
          fullName: profileRow.full_name || "CUET Aspirant",
          email: authUser.email || "aspirant@cuet-prep.in",
          targetStream: (profileRow.target_stream || "Science") as StreamOption,
          targetUniversity: profileRow.target_university || "Delhi University",
          targetCollege: profileRow.target_college || "SRCC",
          xp: profileRow.xp ?? 0,
          campusCoins: profileRow.campus_coins ?? 50,
          currentStreak: profileRow.current_streak ?? 1,
          isPremium: Boolean(profileRow.is_premium),
          subscriptionTier: profileRow.subscription_tier || "free",
          subscriptionExpiresAt: profileRow.subscription_expires_at ?? null,
          selectedSubjects:
            profileRow.selected_subjects && profileRow.selected_subjects.length > 0
              ? profileRow.selected_subjects
              : profileRow.target_stream === "Commerce"
              ? ["Accountancy", "Business Studies", "Economics"]
              : profileRow.target_stream === "Humanities"
              ? ["History", "Political Science", "Psychology"]
              : ["Physics", "Chemistry", "Mathematics"],
          createdAt: profileRow.created_at,
          updatedAt: profileRow.updated_at,
        };
      }

      // 2b. Query attempts count & accuracy from public.user_attempts
      const { data: attemptsRows } = await supabase
        .from("user_attempts")
        .select("id, is_correct, selected_option, questions(correct_option)")
        .eq("user_id", authUser.id);

      if (attemptsRows) {
        const attemptedQuestions = attemptsRows.filter(
          (a) => a.selected_option !== null && a.selected_option !== undefined
        );
        totalAttempts = attemptedQuestions.length;
        correctAttempts = attemptedQuestions.filter((a: any) => {
          if (a.is_correct === true || a.is_correct === "true" || a.is_correct === 1) return true;
          if (a.selected_option && a.questions?.correct_option && a.selected_option === a.questions.correct_option) return true;
          return false;
        }).length;
        accuracyPercentage =
          totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
      }

      // 2c. Query pacing & weak spots from public.pacing_analytics_summary
      try {
        const { data: pacingRows } = await supabase
          .from("pacing_analytics_summary")
          .select(
            "micro_topic, chapter, subject, accuracy_percentage, fatal_time_sinks, total_attempts, avg_time_seconds"
          )
          .eq("user_id", authUser.id)
          .order("fatal_time_sinks", { ascending: false })
          .order("accuracy_percentage", { ascending: true })
          .limit(3);

        if (pacingRows && pacingRows.length > 0) {
          weakTopics = pacingRows.map((r: any) => ({
            microTopic: r.micro_topic,
            chapter: r.chapter,
            subject: r.subject,
            accuracyPercentage: Math.round(r.accuracy_percentage ?? 0),
            fatalTimeSinks: r.fatal_time_sinks ?? 0,
            totalAttempts: r.total_attempts ?? 0,
            avgTimeSeconds: Math.round(r.avg_time_seconds ?? 0),
          }));
        }
      } catch (pacingErr) {
        console.warn("Pacing analytics view query notice:", pacingErr);
      }

      // Fallback: If pacing view returned empty but user has wrong attempts, inspect user_attempts
      if (weakTopics.length === 0 && totalAttempts > 0) {
        try {
          const { data: wrongAttempts } = await supabase
            .from("user_attempts")
            .select(`
              is_time_sink,
              time_spent_seconds,
              questions (
                micro_topic,
                chapter,
                subject
              )
            `)
            .eq("user_id", authUser.id)
            .eq("is_correct", false)
            .limit(10);

          if (wrongAttempts && wrongAttempts.length > 0) {
            const seen = new Set<string>();
            wrongAttempts.forEach((wa: any) => {
              const q = wa.questions;
              if (q && q.micro_topic && !seen.has(q.micro_topic)) {
                seen.add(q.micro_topic);
                weakTopics.push({
                  microTopic: q.micro_topic,
                  chapter: q.chapter || "Domain Chapter",
                  subject: q.subject || "Domain",
                  accuracyPercentage: 40,
                  fatalTimeSinks: wa.is_time_sink ? 1 : 0,
                  totalAttempts: 3,
                  avgTimeSeconds: wa.time_spent_seconds || 85,
                });
              }
            });
          }
        } catch {
          // Non-blocking fallback
        }
      }

      // 2d. Query public.user_trophies
      try {
        const { data: userTrophies } = await supabase
          .from("user_trophies")
          .select("trophy_id, unlocked_at")
          .eq("user_id", authUser.id);

        if (userTrophies) {
          userTrophies.forEach((ut: any) => {
            userUnlockedTrophyMap[ut.trophy_id] = ut.unlocked_at;
          });
        }
      } catch (trophyErr) {
        console.warn("User trophies query notice:", trophyErr);
      }
    }
  } catch (err) {
    console.warn("Supabase profile page data resolution warning:", err);
  }

  // 3. Calculate 150-Question Calibration Progress & College Benchmark
  const calibrationProgress = Math.min(100, Math.round((totalAttempts / 150) * 100));
  const isAiMentorUnlocked = totalAttempts >= 150;

  const collegeCutoff = calculateCollegeReadiness(
    initialProfile.targetCollege,
    initialProfile.targetUniversity,
    accuracyPercentage,
    totalAttempts
  );

  const diagnostic: DiagnosticReadiness = {
    totalAttempts,
    correctAttempts,
    accuracyPercentage,
    calibrationThreshold: 150,
    calibrationProgress,
    isAiMentorUnlocked,
    predictedPercentile: collegeCutoff.predictedPercentile,
    collegeCutoff,
  };

  // 4. Build Trophies Shelf List
  const trophies: ProfileTrophyItem[] = MASTER_TROPHIES.map((mt) => {
    const isUnlocked = Boolean(userUnlockedTrophyMap[mt.id]);
    const unlockedAt = userUnlockedTrophyMap[mt.id] ?? null;

    let progressPercentage = isUnlocked ? 100 : 0;
    if (!isUnlocked) {
      if (mt.id === "consistency-king") {
        progressPercentage = Math.min(100, Math.round((initialProfile.currentStreak / 7) * 100));
      } else if (mt.id === "ncert-sharpshooter") {
        progressPercentage = Math.min(100, Math.round((accuracyPercentage / 90) * 100));
      } else if (mt.id === "speed-demon") {
        progressPercentage = Math.min(100, Math.round((totalAttempts / 50) * 100));
      } else if (mt.id === "the-phoenix") {
        progressPercentage = totalAttempts > 0 ? 50 : 0;
      }
    }

    return {
      id: mt.id,
      title: mt.title,
      description: mt.description,
      icon: mt.icon,
      xpReward: mt.xp_reward,
      coinReward: mt.coin_reward ?? 25,
      isUnlocked,
      unlockedAt,
      criteria: mt.criteria || "Complete CBT requirements to unlock",
      progressPercentage,
    };
  });

  const initialData: ProfileInitialData = {
    profile: initialProfile,
    diagnostic,
    weakTopics,
    trophies,
  };

  return <ProfileClient initialData={initialData} />;
}
