import { Trophy } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { safeStorage } from "@/lib/storage/safe-storage";

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
 * Formats a Date to local calendar string YYYY-MM-DD
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns difference in whole calendar days between two YYYY-MM-DD strings (dateStrB - dateStrA)
 */
export function getDaysBetweenCalendarDates(dateStrA: string, dateStrB: string): number {
  if (!dateStrA || !dateStrB) return 0;
  const [y1, m1, d1] = dateStrA.split("T")[0]!.split("-").map(Number);
  const [y2, m2, d2] = dateStrB.split("T")[0]!.split("-").map(Number);
  if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) return 0;
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  return Math.round((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

/**
 * Calculates current consecutive practice days streak directly from attempt history.
 * - Same-day sessions do not duplicate the streak.
 * - Missing a calendar day breaks the streak.
 * - If last session was yesterday, the streak remains active today awaiting practice.
 */
export function calculateStreakFromAttempts(
  attempts: Array<{ submittedAt?: string | null }>,
  todayStr: string = getLocalDateString()
): number {
  if (!attempts || attempts.length === 0) return 0;

  const validDates = attempts
    .filter((a) => Boolean(a.submittedAt))
    .map((a) => {
      try {
        const raw = a.submittedAt!.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
          return raw;
        }
        return getLocalDateString(new Date(raw));
      } catch {
        return null;
      }
    })
    .filter((d): d is string => Boolean(d && d <= todayStr));

  if (validDates.length === 0) return 0;

  // Distinct dates in descending order (newest first)
  const distinctSortedDates = Array.from(new Set(validDates)).sort().reverse();
  const latestPracticeDate = distinctSortedDates[0]!;

  const daysSinceLatest = getDaysBetweenCalendarDates(latestPracticeDate, todayStr);
  if (daysSinceLatest > 1) {
    // Last practiced 2 or more days ago - streak expired
    return 0;
  }

  let streak = 1;
  let currentDate = latestPracticeDate;

  for (let i = 1; i < distinctSortedDates.length; i++) {
    const prevDate = distinctSortedDates[i]!;
    const diff = getDaysBetweenCalendarDates(prevDate, currentDate);
    if (diff === 1) {
      streak += 1;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Computes the active streak when passively viewing dashboard/profile (before practicing today).
 * - If last practice was today or yesterday, streak is active.
 * - If last practice was 2 or more days ago, streak has expired (0).
 */
export function calculateActiveStreak(
  storedStreak: number,
  lastPracticeDate: string | null | undefined,
  todayStr: string = getLocalDateString()
): number {
  if (!lastPracticeDate || storedStreak <= 0) return 0;
  const cleanLastDate = lastPracticeDate.split("T")[0]!;
  const daysDiff = getDaysBetweenCalendarDates(cleanLastDate, todayStr);

  if (daysDiff <= 1) {
    // 0 = practiced today, 1 = practiced yesterday (still active today)
    return storedStreak;
  }

  // 2 or more days have elapsed without practice - streak broken
  return 0;
}

/**
 * Computes next streak value when a test is completed today.
 * - Same day: preserves existing streak (does not increment multiple times on the same day).
 * - Practiced yesterday (1 day diff): increments streak by 1.
 * - Missed yesterday (>= 2 days diff or never): resets streak to 1.
 */
export function calculateNextStreakOnPractice(
  currentStreak: number,
  lastPracticeDate: string | null | undefined,
  todayStr: string = getLocalDateString()
): number {
  if (!lastPracticeDate || currentStreak <= 0) {
    return 1;
  }

  const cleanLastDate = lastPracticeDate.split("T")[0]!;
  const daysDiff = getDaysBetweenCalendarDates(cleanLastDate, todayStr);

  if (daysDiff === 0) {
    // Already practiced today; maintain streak
    return Math.max(1, currentStreak);
  }

  if (daysDiff === 1) {
    // Practiced yesterday; increment streak!
    return currentStreak + 1;
  }

  // Missed one or more days (or date in the future due to clock anomaly); start new streak
  return 1;
}

/**
 * Updates practice streak in database & returns updated streak info
 * - Increments current_streak if last_practice_date was yesterday
 * - Preserves streak if already practiced today
 * - Resets to 1 if last_practice_date was 2+ calendar days ago (or never)
 */
export async function updateStreak(
  userId: string,
  practiceDate: Date = new Date()
): Promise<{ newStreak: number; streakMaintained: boolean }> {
  const todayStr = getLocalDateString(practiceDate);

  let currentStreak = 0;
  let lastPracticeDateStr: string | null = null;

  try {
    const supabase = createClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("current_streak, last_practice_date")
      .eq("id", userId)
      .maybeSingle();

    if (profile) {
      currentStreak = profile.current_streak ?? 0;
      lastPracticeDateStr = profile.last_practice_date;
    }
  } catch {
    // Client local storage fallback
    if (typeof window !== "undefined") {
      const storedDate = safeStorage.getItem(`last_practice_date_${userId}`);
      const storedStreak = parseInt(safeStorage.getItem(`streak_${userId}`) || "0", 10);
      if (storedDate) lastPracticeDateStr = storedDate;
      if (!isNaN(storedStreak)) currentStreak = storedStreak;
    }
  }

  const newStreak = calculateNextStreakOnPractice(currentStreak, lastPracticeDateStr, todayStr);
  const streakMaintained = newStreak > 1 || (currentStreak === 0 && newStreak === 1);

  // Persist updated streak to Supabase
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

  // Persist to safe storage
  if (typeof window !== "undefined") {
    safeStorage.setItem(`last_practice_date_${userId}`, todayStr);
    safeStorage.setItem(`streak_${userId}`, newStreak.toString());
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
      const stored = safeStorage.getItem(`unlocked_trophies_${userId}`);
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
    safeStorage.setItem(`unlocked_trophies_${userId}`, JSON.stringify(updated));
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
    // Fallback to safe storage or defaults
  }

  if (Object.keys(unlockedMap).length === 0 && typeof window !== "undefined") {
    const stored = safeStorage.getItem(`unlocked_trophies_${userId}`);
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
