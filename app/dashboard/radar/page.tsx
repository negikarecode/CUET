import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import WeaknessRadarClient, {
  WeaknessRadarInitialData,
} from "@/components/dashboard/WeaknessRadarClient";
import { buildDefaultSubjectCalibration, normalizeSubject } from "@/lib/analytics";
import { DEFAULT_STREAM_SUBJECTS } from "@/lib/constants/cuetSubjects";
import { StreamType } from "@/types";

export const metadata: Metadata = {
  title: "Subject Weakness Radar & AI Diagnostic | CUET AI-Prep",
  description:
    "AI diagnostic matrix and weak topic radar for CUET UG aspirants. Pinpoint distractor traps, clock-drain calculations, and NCERT-backed micro-topic weaknesses.",
};

export const dynamic = "force-dynamic";

export default async function WeaknessRadarPage() {
  const cookieStore = cookies();
  const cuetAuth = cookieStore.get("cuet_auth")?.value === "1";

  let serverData: WeaknessRadarInitialData = {
    user: {
      id: "guest",
      fullName: "CUET Aspirant",
      targetStream: "Science",
      targetUniversity: "Delhi University",
      targetCollege: "Central University",
      targetCourse: "Undergraduate Program",
      selectedSubjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      xp: 0,
      campusCoins: 0,
      currentStreak: 1,
    },
    totalAttempted: 0,
    accuracyPercentage: 0,
    weaknessRadar: [],
    strengthList: [],
    timeSinkAlerts: [],
    recommendedPractice: {
      topic: "Domain Calibration Mock",
      chapter: "Core Syllabus",
      subject: "Physics",
      durationMinutes: 60,
      questionCount: 50,
      reason: "Complete a full 50-question diagnostic mock to calibrate baseline accuracy and uncover trap options.",
    },
    subjectCalibration: buildDefaultSubjectCalibration(),
  };

  try {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser && !cuetAuth) {
      redirect("/signup?redirect=/dashboard/radar");
    }

    if (authUser) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (profile) {
        const streamKey = (profile.target_stream?.toLowerCase() as StreamType) || "science";
        const fallbackSubs = DEFAULT_STREAM_SUBJECTS[streamKey] || DEFAULT_STREAM_SUBJECTS.science;
        const profileSubjects =
          Array.isArray(profile.selected_subjects) && profile.selected_subjects.length > 0
            ? profile.selected_subjects
            : fallbackSubs;

        serverData.user = {
          id: profile.id,
          fullName: profile.full_name,
          targetStream: profile.target_stream,
          targetUniversity: profile.target_university ?? "Delhi University",
          targetCollege: profile.target_college ?? "SRCC",
          targetCourse: profile.target_course ?? "Undergraduate Program",
          selectedSubjects: profileSubjects,
          xp: profile.xp,
          campusCoins: profile.campus_coins,
          currentStreak: profile.current_streak,
        };
      }

      // Query authentic attempt history
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
            ncert_reference,
            correct_option
          )
        `)
        .eq("user_id", authUser.id);

      if (userAttempts && userAttempts.length > 0) {
        const attemptedRows = userAttempts.filter(
          (ua) => ua.selected_option !== null && ua.selected_option !== undefined
        );
        const totalAttempted = attemptedRows.length;
        const correctCount = attemptedRows.filter((ua: any) => {
          if (ua.is_correct === true || ua.is_correct === "true" || ua.is_correct === 1) return true;
          if (ua.selected_option && ua.questions?.correct_option && ua.selected_option === ua.questions.correct_option) return true;
          return false;
        }).length;
        const overallAccuracy =
          totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

        serverData.totalAttempted = totalAttempted;
        serverData.accuracyPercentage = overallAccuracy;

        const subMap = serverData.subjectCalibration || buildDefaultSubjectCalibration();
        attemptedRows.forEach((ua: any) => {
          const rawSub = ua.questions?.subject || "Physics";
          const info = normalizeSubject(rawSub);
          if (!subMap[info.key]) {
            subMap[info.key] = {
              subject: info.name,
              subjectKey: info.key,
              icon: info.icon,
              category: info.category,
              totalAttempted: 0,
              totalCorrect: 0,
              totalIncorrect: 0,
              accuracyPercentage: 0,
              testsCount: 0,
              isUnlocked: false,
              attemptsToUnlock: 150,
              unlockProgress: 0,
              mockUrl: info.mockUrl,
            };
          }
          const entry = subMap[info.key];
          if (entry) {
            entry.totalAttempted += 1;
            if (ua.is_correct === true) entry.totalCorrect += 1;
            else entry.totalIncorrect += 1;
          }
        });
        Object.keys(subMap).forEach((k) => {
          const item = subMap[k];
          if (item) {
            item.accuracyPercentage =
              item.totalAttempted > 0
                ? Math.round((item.totalCorrect / item.totalAttempted) * 100)
                : 0;
            item.isUnlocked = item.totalAttempted >= 150;
            item.attemptsToUnlock = Math.max(0, 150 - item.totalAttempted);
            item.unlockProgress = Math.min(100, Math.round((item.totalAttempted / 150) * 100));
          }
        });
        serverData.subjectCalibration = subMap;

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

        const computedTopics = Array.from(topicMap.values()).map((item) => {
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

        // Weakness radar: status critical/polish sorted by lowest accuracy
        const weaknesses = computedTopics
          .filter((t) => t.status === "critical" || t.status === "polish")
          .sort((a, b) => a.accuracyPercentage - b.accuracyPercentage);

        // Strength list: status mastered or >= 75%
        const strengths = computedTopics
          .filter((t) => t.status === "mastered" || t.accuracyPercentage >= 75)
          .sort((a, b) => b.accuracyPercentage - a.accuracyPercentage);

        serverData.weaknessRadar = weaknesses;
        serverData.strengthList = strengths;

        // Pacing / time sink alerts
        serverData.timeSinkAlerts = Array.from(topicMap.values())
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

        if (weaknesses.length > 0 && weaknesses[0]) {
          const topWeak = weaknesses[0];
          serverData.recommendedPractice = {
            topic: topWeak.microTopic,
            chapter: topWeak.chapter,
            subject: topWeak.subject,
            durationMinutes: 5,
            questionCount: 5,
            reason: `Targeted repair drill on ${topWeak.microTopic} (${topWeak.accuracyPercentage}% accuracy). Eliminate distractor traps.`,
          };
        }
      }
    }
  } catch {
    // Graceful fallback
  }

  return (
    <div className="min-h-screen bg-[#FAF7EE] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Suspense
          fallback={
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-black text-black">Loading Subject Weakness Radar...</p>
            </div>
          }
        >
          <WeaknessRadarClient initialData={serverData} />
        </Suspense>
      </div>
    </div>
  );
}
