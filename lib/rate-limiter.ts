/**
 * High-Performance Rate Limiter & Usage Tracker
 * Free tier: 3 AI diagnostic runs per 24 hours
 * Paid tier (is_premium): 25 AI diagnostic runs per 24 hours
 */

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number; // Unix timestamp in milliseconds when daily quota resets
  error?: string;
}

// In-Memory Daily Tracker
// Key format: `${userId}:${YYYY-MM-DD}`
const memoryUsageStore = new Map<string, number>();

// Clean up keys older than 2 days periodically
function cleanupOldKeys() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 2);
  const cutoffDateStr = cutoff.toISOString().split("T")[0]!;

  for (const key of memoryUsageStore.keys()) {
    const parts = key.split(":");
    const keyDate = parts[1];
    if (keyDate && keyDate < cutoffDateStr) {
      memoryUsageStore.delete(key);
    }
  }
}

/**
 * Calculates milliseconds remaining until midnight UTC / local day reset
 */
export function getDailyResetTimestamp(): number {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCHours(23, 59, 59, 999);
  return tomorrow.getTime();
}

/**
 * Checks if user is permitted to make an AI request
 */
export async function checkRateLimit(
  userId: string,
  isPaid: boolean = false
): Promise<RateLimitResult> {
  cleanupOldKeys();

  const todayStr = new Date().toISOString().split("T")[0]!;
  const key = `${userId}:${todayStr}`;

  const limit = isPaid ? 25 : 3;
  const currentCount = memoryUsageStore.get(key) ?? 0;
  const resetAt = getDailyResetTimestamp();

  if (currentCount >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt,
      error: "Daily AI analysis limit reached. Upgrade to unlock more.",
    };
  }

  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - currentCount),
    resetAt,
  };
}

/**
 * Increments AI analysis usage count for today
 */
export async function incrementUsage(userId: string): Promise<number> {
  const todayStr = new Date().toISOString().split("T")[0]!;
  const key = `${userId}:${todayStr}`;

  const currentCount = memoryUsageStore.get(key) ?? 0;
  const nextCount = currentCount + 1;
  memoryUsageStore.set(key, nextCount);

  return nextCount;
}

/**
 * Generates HTTP rate limit response headers
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": Math.floor(result.resetAt / 1000).toString(),
  };
}
