import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import DashboardClient, { DashboardInitialData } from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Aspirant Command Hub | CUET AI-Prep",
  description:
    "Real-time CUET UG preparation command center with AI diagnostic insights, chapter mastery radar, time-sink alerts, daily practice streaks, and trophies.",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // 1. Clean real initial state (no fake mock attempts)
  let serverData: DashboardInitialData = {
    user: {
      id: "guest",
      fullName: "CUET Aspirant",
      targetStream: "Science",
      targetUniversity: "Delhi University",
      targetCollege: "Central University",
      targetCourse: "Undergraduate Program",
      xp: 0,
      campusCoins: 0,
      currentStreak: 1,
    },
    kpi: {
      totalAttempted: 0,
      accuracyPercentage: 0,
      dailyStreak: 1,
      xpLevel: "Level 1 - Aspirant",
      xpLevelNumber: 1,
      xpProgressInLevel: 0,
      xpForNextLevel: 500,
    },
    recommendedPractice: {
      topic: "Initial Diagnostic Mock",
      chapter: "Domain Knowledge Calibration",
      subject: "Physics",
      durationMinutes: 60,
      questionCount: 50,
      reason:
        "Complete your first 50-question diagnostic test to establish your baseline pace and detect trap options.",
    },
    weaknessRadar: [],
    timeSinkAlerts: [],
  };

  // 2. Query Supabase database to override with live data if available
  try {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (profile) {
        serverData.user = {
          id: profile.id,
          fullName: profile.full_name,
          targetStream: profile.target_stream,
          targetUniversity: profile.target_university ?? "Delhi University",
          targetCollege: profile.target_college ?? "SRCC",
          targetCourse: "B.Com (Hons)",
          xp: profile.xp,
          campusCoins: profile.campus_coins,
          currentStreak: profile.current_streak,
        };
        serverData.kpi.dailyStreak = profile.current_streak;
      }

      // Query real attempts count and attempt history with question metadata
      const { data: userAttempts } = await supabase
        .from("user_attempts")
        .select(`
          id,
          selected_option,
          is_correct,
          time_spent_seconds,
          is_time_sink,
          test_id,
          question_id,
          questions (
            id,
            subject,
            chapter,
            micro_topic,
            ncert_reference
          )
        `)
        .eq("user_id", authUser.id);

      if (userAttempts && userAttempts.length > 0) {
        const attemptedRows = userAttempts.filter(
          (ua) => ua.selected_option !== null && ua.selected_option !== undefined
        );
        const totalAttempted = attemptedRows.length;
        const correctCount = attemptedRows.filter((ua) => ua.is_correct === true).length;
        const overallAccuracy =
          totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

        serverData.kpi.totalAttempted = totalAttempted;
        serverData.kpi.accuracyPercentage = overallAccuracy;

        // Group by micro_topic & chapter
        const topicMap = new Map<
          string,
          {
            subject: string;
            chapter: string;
            microTopic: string;
            ncertReference: string;
            attemptsCount: number;
            correctCount: number;
            incorrectCount: number;
            timeSinksCount: number;
            totalTimeSpent: number;
          }
        >();

        attemptedRows.forEach((ua: any) => {
          const q = ua.questions;
          const subject = q?.subject || "Physics";
          const chapter = q?.chapter || "Domain Knowledge Calibration";
          const microTopic = q?.micro_topic || "Key Concept";
          const ncertRef = q?.ncert_reference || `NCERT Class 12 (${chapter})`;
          const key = `${subject.toLowerCase()}:::${chapter.toLowerCase()}:::${microTopic.toLowerCase()}`;

          let item = topicMap.get(key);
          if (!item) {
            item = {
              subject,
              chapter,
              microTopic,
              ncertReference: ncertRef,
              attemptsCount: 0,
              correctCount: 0,
              incorrectCount: 0,
              timeSinksCount: 0,
              totalTimeSpent: 0,
            };
            topicMap.set(key, item);
          }

          item.attemptsCount += 1;
          if (ua.is_correct === true) {
            item.correctCount += 1;
          } else if (ua.is_correct === false) {
            item.incorrectCount += 1;
          }

          const timeSpent = ua.time_spent_seconds || 0;
          item.totalTimeSpent += timeSpent;
          if (ua.is_time_sink || timeSpent > 72) {
            item.timeSinksCount += 1;
          }
        });

        const computedRadar = Array.from(topicMap.values()).map((item) => {
          const acc = Math.round((item.correctCount / item.attemptsCount) * 100);
          const status: "critical" | "polish" | "mastered" =
            acc < 50 ? "critical" : acc < 80 ? "polish" : "mastered";

          return {
            chapter: item.chapter,
            microTopic: item.microTopic,
            subject: item.subject,
            ncertReference: item.ncertReference,
            accuracyPercentage: acc,
            attemptsCount: item.attemptsCount,
            correctCount: item.correctCount,
            incorrectCount: item.incorrectCount,
            avgTimeSeconds: Math.round(item.totalTimeSpent / item.attemptsCount),
            timeSinksCount: item.timeSinksCount,
            status,
          };
        });

        // Sort: lowest accuracy first
        computedRadar.sort((a, b) => {
          const statusWeight = { critical: 1, polish: 2, mastered: 3 };
          if (statusWeight[a.status] !== statusWeight[b.status]) {
            return statusWeight[a.status] - statusWeight[b.status];
          }
          return a.accuracyPercentage - b.accuracyPercentage;
        });

        serverData.weaknessRadar = computedRadar;

        // Pacing / time sink alerts
        const timeSinkAlerts = Array.from(topicMap.values())
          .filter((item) => item.timeSinksCount > 0)
          .map((item) => {
            const errorRate = Math.round((item.incorrectCount / item.attemptsCount) * 100);
            const avgTime = Math.round(item.totalTimeSpent / item.attemptsCount);
            return {
              topic: item.microTopic,
              avgTimeSpent: avgTime,
              errorRate,
              timeSinksCount: item.timeSinksCount,
              recoveryTactic:
                errorRate >= 50
                  ? `${item.microTopic} consumes >72s with ${errorRate}% error rate. Flag for Phase 2 review on exam day.`
                  : `${item.microTopic} involves extensive calculations (avg ${avgTime}s). Apply approximation techniques.`,
            };
          });

        serverData.timeSinkAlerts = timeSinkAlerts;

        // Update recommended practice if weak topics found
        if (computedRadar.length > 0 && computedRadar[0]) {
          const topWeak = computedRadar[0];
          serverData.recommendedPractice = {
            topic: topWeak.microTopic,
            chapter: topWeak.chapter,
            subject: topWeak.subject,
            durationMinutes: 5,
            questionCount: 5,
            reason:
              topWeak.status === "critical"
                ? `Critical Weakness (${topWeak.accuracyPercentage}% accuracy). Focus on eliminating trap options.`
                : `Targeted Polish (${topWeak.accuracyPercentage}% accuracy). Fast 5-minute drill to achieve mastery.`,
          };
        }
      }
    }
  } catch {
    // Graceful fallback to serverData
  }

  return (
    <div className="min-h-screen bg-[#FAF7EE] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <DashboardClient initialData={serverData} />
      </div>
    </div>
  );
}
