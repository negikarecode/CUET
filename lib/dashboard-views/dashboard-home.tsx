import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import DashboardClient, { DashboardInitialData } from "@/components/dashboard/DashboardClient";
import { buildDefaultSubjectCalibration, normalizeSubject } from "@/lib/analytics";
import { DEFAULT_STREAM_SUBJECTS } from "@/lib/constants/cuetSubjects";
import { StreamType } from "@/types";
import { fetchServerTestAttempts } from "@/lib/server-attempts";
import { calculateActiveStreak } from "@/lib/gamification";
import { computeAuthoritativeDiagnosticProgress } from "@/lib/diagnostic-status";
import { getUserProgress } from "@/lib/user-progress";

export const metadata: Metadata = {
  title: "Dashboard | CUET AI-Prep",
  description:
    "Real-time CUET UG preparation dashboard with performance analytics, diagnostic reports, and college cutoffs.",
};


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
      selectedSubjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      xp: 0,
      campusCoins: 0,
      currentStreak: 0,
    },
    kpi: {
      totalAttempted: 0,
      accuracyPercentage: 0,
      dailyStreak: 0,
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
        "Complete your first 50-question diagnostic test to establish your baseline accuracy and detect trap options.",
    },
    weaknessRadar: [],
    timeSinkAlerts: [],
    subjectCalibration: buildDefaultSubjectCalibration(),
    currentCycleNumber: 1,
    currentCycleQuestionCount: 0,
    isDiagnosticUnlocked: false,
  };

  // 2. Query Supabase database to override with live data if available
  try {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    // If guest user without auth, proceed with default clean aspirant state

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

        const activeStreak = calculateActiveStreak(
          profile.current_streak ?? 0,
          profile.last_practice_date
        );

        const { getUserEntitlement } = await import("@/lib/payments/entitlements");
        const entitlement = await getUserEntitlement(authUser.id);

        serverData.user = {
          id: profile.id,
          fullName: profile.full_name,
          targetStream: profile.target_stream,
          targetUniversity: profile.target_university ?? "Delhi University",
          targetCollege: profile.target_college ?? "SRCC",
          targetCourse: profile.target_course ?? authUser.user_metadata?.target_course ?? "Undergraduate Program",
          selectedSubjects: profileSubjects,
          xp: profile.xp,
          campusCoins: profile.campus_coins,
          currentStreak: activeStreak,
          isPremium: entitlement.isPremium,
          subscriptionTier: entitlement.subscriptionTier,
          subscriptionExpiresAt: entitlement.subscriptionExpiresAt,
        };
        serverData.kpi.dailyStreak = activeStreak;
      }

      // Authoritative user progress from single source of truth
      const userProgress = await getUserProgress(authUser.id);

      serverData.kpi.totalAttempted = userProgress.totalAttempts;
      serverData.kpi.correctCount = userProgress.totalCorrect;
      serverData.kpi.accuracyPercentage = userProgress.overallAccuracyPercentage;
      serverData.kpi.dailyStreak = userProgress.activeStreak;
      serverData.serverAttempts = userProgress.serverAttempts;

      const diagProgress = computeAuthoritativeDiagnosticProgress({ totalAttempted: userProgress.totalAttempts });
      serverData.currentCycleNumber = diagProgress.currentCycleNumber;
      serverData.currentCycleQuestionCount = diagProgress.currentCycleQuestionCount;
      serverData.isDiagnosticUnlocked = diagProgress.isUnlocked;

      const subMap = serverData.subjectCalibration || buildDefaultSubjectCalibration();
      Object.keys(userProgress.subjectProgress).forEach((subKey) => {
        const prog = userProgress.subjectProgress[subKey];
        if (!prog) return;
        const info = normalizeSubject(prog.subject);
        subMap[info.key] = {
          subject: info.name,
          subjectKey: info.key,
          icon: info.icon,
          category: info.category,
          totalAttempted: prog.totalAttempts,
          totalCorrect: prog.correctCount,
          totalIncorrect: prog.incorrectCount,
          accuracyPercentage: prog.accuracyPercentage,
          testsCount: prog.completedTests.length,
          isUnlocked: prog.isUnlocked,
          attemptsToUnlock: prog.questionsRemainingToUnlock,
          unlockProgress: Math.min(100, Math.round((prog.uniqueQuestionsAttempted / 150) * 100)),
          mockUrl: info.mockUrl,
        };
      });
      serverData.subjectCalibration = subMap;

      // Group by micro_topic & chapter for Weakness Radar & Time Sinks
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

      const allQuestions = userProgress.serverAttempts.flatMap((a) => a.questions || []);
      allQuestions.forEach((q: any) => {
        const subject = q.subject || "Physics";
        const chapter = q.chapter || "Domain Knowledge Calibration";
        const microTopic = q.microTopic || "Key Concept";
        const ncertRef = q.ncertReference || `NCERT Class 12 (${chapter})`;
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
        if (q.isCorrect === true) {
          item.correctCount += 1;
        } else if (q.isCorrect === false) {
          item.incorrectCount += 1;
        }

        const timeSpent = q.timeSpentSeconds || 0;
        item.totalTimeSpent += timeSpent;
        if (q.isTimeSink || timeSpent > 72) {
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

      // Reconstruct authentic test attempts directly synced from Supabase
      serverData.serverAttempts = await fetchServerTestAttempts(supabase, authUser.id);
    }
  } catch {
    // Graceful fallback to serverData
  }

  return (
    <div className="w-full">
      <DashboardClient initialData={serverData} />
    </div>
  );
}
