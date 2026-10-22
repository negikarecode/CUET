import { createClient } from "@/lib/supabase/client";
import { safeStorage } from "@/lib/storage/safe-storage";

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

