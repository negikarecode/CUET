import { Trophy } from "@/types";
import { createClient } from "@/lib/supabase/client";

export interface TestResultMetrics {
  totalQuestions: number;
  correctAnswers: number;
  accuracyPercentage: number;
  totalTimeSpentSeconds: number;
  isRepairQuiz?: boolean;
  currentStreak?: number;
}

// Master Trophy Definitions
export const MASTER_TROPHIES: Trophy[] = [
  {
    id: "ncert-sharpshooter",
    title: "NCERT Sharpshooter",
    description: "Achieved >90% accuracy in an authentic CUET domain examination paper.",
    icon: "Crosshair",
    xp_reward: 350,
    coin_reward: 25,
    criteria: "Achieve ≥90% accuracy in any test paper",
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Completed 50 questions with an average time < 45s per question and >80% accuracy.",
    icon: "Zap",
    xp_reward: 250,
    coin_reward: 25,
    criteria: "50 Qs with average pace < 45s and >80% accuracy",
  },
  {
    id: "consistency-king",
    title: "Consistency King",
    description: "Maintained an unbroken 7-day daily practice streak on official NTA mocks.",
    icon: "Flame",
    xp_reward: 200,
    coin_reward: 25,
    criteria: "Maintain a continuous 7-day practice streak",
  },
  {
    id: "the-phoenix",
    title: "The Phoenix",
    description: "Scored ≥80% on an AI Repair Quiz for a previously failed conceptual topic.",
    icon: "Sparkles",
    xp_reward: 500,
    coin_reward: 25,
    criteria: "Score ≥80% in an AI Remedial Repair Quiz",
  },
];

/**
 * Calculates XP earned from a test session
 * Base: +10 XP per correct question
 * Bonus: +50 XP if test accuracy is >= 90%
 * Bonus: +100 XP for completing a full 50-question mock
 */
export function calculateXP(
  correctAnswers: number,
  accuracyPercentage: number,
  _totalTimeSpent: number,
  totalQuestions: number = 50
): number {
  let earnedXP = correctAnswers * 10;

  // Bonus for high precision (>= 90% accuracy)
  if (accuracyPercentage >= 90 && correctAnswers > 0) {
    earnedXP += 50;
  }

  // Bonus for completing a full 50-question mock
  if (totalQuestions >= 50) {
    earnedXP += 100;
  }

  return earnedXP;
}

/**
 * Updates practice streak in database & returns updated streak info
 * - Increments current_streak if last_practice_date was yesterday
 * - Preserves streak if already practiced today
 * - Resets to 1 if last_practice_date was more than 48 hours ago (or never)
 */
export async function updateStreak(
  userId: string
): Promise<{ newStreak: number; streakMaintained: boolean }> {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]!; // YYYY-MM-DD

  let currentStreak = 1;
  let lastPracticeDateStr: string | null = null;

  try {
    const supabase = createClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("current_streak, last_practice_date")
      .eq("id", userId)
      .single();

    if (profile) {
      currentStreak = profile.current_streak ?? 0;
      lastPracticeDateStr = profile.last_practice_date;
    }
  } catch {
    // Client local storage fallback
    if (typeof window !== "undefined") {
      const storedDate = localStorage.getItem(`last_practice_date_${userId}`);
      const storedStreak = parseInt(localStorage.getItem(`streak_${userId}`) || "0", 10);
      if (storedDate) lastPracticeDateStr = storedDate;
      if (storedStreak) currentStreak = storedStreak;
    }
  }

  let newStreak = currentStreak;
  let streakMaintained = true;

  if (!lastPracticeDateStr) {
    newStreak = 1;
    streakMaintained = false;
  } else {
    const lastDate = new Date(lastPracticeDateStr);
    const msDiff = today.getTime() - lastDate.getTime();
    const daysDiff = Math.floor(msDiff / (1000 * 60 * 60 * 24));

    if (lastPracticeDateStr === todayStr) {
      // Already practiced today; preserve streak
      newStreak = currentStreak;
      streakMaintained = true;
    } else if (daysDiff === 1) {
      // Practiced yesterday; increment streak!
      newStreak = currentStreak + 1;
      streakMaintained = true;
    } else {
      // More than 48 hours ago; streak broken, reset to 1
      newStreak = 1;
      streakMaintained = false;
    }
  }

  // Persist updated streak
  try {
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({
        current_streak: newStreak,
        last_practice_date: todayStr,
      })
      .eq("id", userId);
  } catch {
    // Graceful offline catch
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(`last_practice_date_${userId}`, todayStr);
    localStorage.setItem(`streak_${userId}`, newStreak.toString());
  }

  return { newStreak, streakMaintained };
}

/**
 * Evaluates earned trophies for a completed test
 * - "NCERT Sharpshooter": Achieved >90% accuracy in a domain paper
 * - "Speed Demon": Completed 50 questions with an average time < 45 seconds per question and >80% accuracy
 * - "Consistency King": Maintained a 7-day daily practice streak
 * - "The Phoenix": Scored >= 80% on an AI Repair Quiz for a previously failed topic
 * Inserts unlocked trophies into public.user_trophies and awards bonus Campus Coins (+25 coins per trophy).
 */
export async function evaluateTrophies(
  userId: string,
  testResult: TestResultMetrics
): Promise<Trophy[]> {
  const unlockedIds: string[] = [];

  // 1. Check "NCERT Sharpshooter": Achieved >90% accuracy in a domain paper
  if (testResult.accuracyPercentage > 90 && testResult.correctAnswers >= 4) {
    unlockedIds.push("ncert-sharpshooter");
  }

  // 2. Check "Speed Demon": Completed 50 questions with average time < 45s and >80% accuracy
  const avgTimePerQuestion =
    testResult.totalQuestions > 0
      ? testResult.totalTimeSpentSeconds / testResult.totalQuestions
      : 999;

  if (
    testResult.totalQuestions >= 50 &&
    avgTimePerQuestion < 45 &&
    testResult.accuracyPercentage > 80
  ) {
    unlockedIds.push("speed-demon");
  }

  // 3. Check "Consistency King": Maintained a 7-day streak
  if ((testResult.currentStreak ?? 0) >= 7) {
    unlockedIds.push("consistency-king");
  }

  // 4. Check "The Phoenix": Scored >= 80% on an AI Repair Quiz
  if (testResult.isRepairQuiz && testResult.accuracyPercentage >= 80) {
    unlockedIds.push("the-phoenix");
  }

  if (unlockedIds.length === 0) {
    return [];
  }

  // Query existing trophies to only reward newly unlocked ones
  let alreadyUnlocked: string[] = [];
  try {
    const supabase = createClient();
    const { data: existing } = await supabase
      .from("user_trophies")
      .select("trophy_id")
      .eq("user_id", userId);

    if (existing) {
      alreadyUnlocked = existing.map((t) => t.trophy_id);
    }
  } catch {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`unlocked_trophies_${userId}`);
      if (stored) alreadyUnlocked = JSON.parse(stored);
    }
  }

  const newlyUnlockedIds = unlockedIds.filter((id) => !alreadyUnlocked.includes(id));
  if (newlyUnlockedIds.length === 0) {
    return [];
  }

  // Insert into user_trophies and award Campus Coins (+25 per trophy)
  const now = new Date().toISOString();
  try {
    const supabase = createClient();
    const insertPayload = newlyUnlockedIds.map((tId) => ({
      user_id: userId,
      trophy_id: tId,
      unlocked_at: now,
    }));

    await supabase.from("user_trophies").insert(insertPayload);

    // Update user profile with bonus coins
    const bonusCoins = newlyUnlockedIds.length * 25;
    const { data: userProfile } = await supabase
      .from("profiles")
      .select("campus_coins")
      .eq("id", userId)
      .single();

    if (userProfile) {
      await supabase
        .from("profiles")
        .update({
          campus_coins: (userProfile.campus_coins ?? 0) + bonusCoins,
        })
        .eq("id", userId);
    }
  } catch {
    // Offline local persistence
  }

  if (typeof window !== "undefined") {
    const updated = [...new Set([...alreadyUnlocked, ...newlyUnlockedIds])];
    localStorage.setItem(`unlocked_trophies_${userId}`, JSON.stringify(updated));
  }

  return MASTER_TROPHIES.filter((t) => newlyUnlockedIds.includes(t.id)).map((t) => ({
    ...t,
    isUnlocked: true,
    unlockedAt: now,
  }));
}

/**
 * Fetches all trophies with user unlock progress
 */
export async function getUserTrophiesWithProgress(userId: string): Promise<Trophy[]> {
  let unlockedMap: Record<string, string> = {};

  try {
    const supabase = createClient();
    const { data: userTrophies } = await supabase
      .from("user_trophies")
      .select("trophy_id, unlocked_at")
      .eq("user_id", userId);

    if (userTrophies) {
      userTrophies.forEach((ut) => {
        unlockedMap[ut.trophy_id] = ut.unlocked_at;
      });
    }
  } catch {
    // Fallback to local storage or defaults
  }

  if (Object.keys(unlockedMap).length === 0 && typeof window !== "undefined") {
    const stored = localStorage.getItem(`unlocked_trophies_${userId}`);
    if (stored) {
      const arr = JSON.parse(stored) as string[];
      arr.forEach((id) => (unlockedMap[id] = new Date().toISOString()));
    }
  }

  return MASTER_TROPHIES.map((t) => {
    const isUnlocked = Boolean(unlockedMap[t.id]);
    const unlockedAt = unlockedMap[t.id] ?? null;
    const progressPercentage = isUnlocked ? 100 : 0;

    return {
      ...t,
      isUnlocked,
      unlockedAt,
      progressPercentage,
    };
  });
}
