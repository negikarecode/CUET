import { createClient } from "@/lib/supabase/server";

// Fast in-memory LRU-like response cache
// Map key: `${userId}:${testId}`
const memoryResponseCache = new Map<
  string,
  {
    data: any;
    cachedAt: number;
  }
>();

// 24-hour cache TTL
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * Retrieves cached diagnostic report if available
 */
export async function getCachedDiagnosticReport(
  userId: string,
  testId: string
): Promise<{ data: any; source: "memory" | "database" } | null> {
  const cacheKey = `${userId}:${testId}`;

  // 1. Check in-memory fast cache
  const memoryHit = memoryResponseCache.get(cacheKey);
  if (memoryHit && Date.now() - memoryHit.cachedAt < CACHE_TTL_MS) {
    return { data: memoryHit.data, source: "memory" };
  }

  // 2. Check Supabase user_attempts table for stored diagnostic_report
  try {
    const supabase = createClient();
    const { data: attempt } = await supabase
      .from("user_attempts")
      .select("diagnostic_report")
      .eq("user_id", userId)
      .eq("test_id", testId)
      .not("diagnostic_report", "is", null)
      .limit(1)
      .maybeSingle();

    if (attempt && attempt.diagnostic_report) {
      // Re-populate memory cache
      memoryResponseCache.set(cacheKey, {
        data: attempt.diagnostic_report,
        cachedAt: Date.now(),
      });
      return { data: attempt.diagnostic_report, source: "database" };
    }
  } catch {
    // Database check failed or offline
  }

  return null;
}

/**
 * Persists newly generated diagnostic report to both in-memory cache and Supabase
 */
export async function setCachedDiagnosticReport(
  userId: string,
  testId: string,
  report: any
): Promise<void> {
  const cacheKey = `${userId}:${testId}`;

  // 1. Save to in-memory cache
  memoryResponseCache.set(cacheKey, {
    data: report,
    cachedAt: Date.now(),
  });

  // 2. Persist to Supabase public.user_attempts.diagnostic_report
  try {
    const supabase = createClient();
    await supabase
      .from("user_attempts")
      .update({ diagnostic_report: report })
      .eq("user_id", userId)
      .eq("test_id", testId);
  } catch (err) {
    console.warn("Failed to persist diagnostic_report to Supabase:", err);
  }
}
