import { NextRequest } from "next/server";

/**
 * Server-Side Rate Limiter & Abuse Prevention Engine
 * Supports user-scoped and IP-scoped rate limiting with daily reset.
 */

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number; // Unix timestamp in milliseconds when daily quota resets
  error?: string;
}

// In-Memory Daily Tracker
// Key format: `${feature}:${identifier}:${YYYY-MM-DD}`
const memoryUsageStore = new Map<string, number>();

// Clean up keys older than 2 days periodically
function cleanupOldKeys() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 2);
  const cutoffDateStr = cutoff.toISOString().split("T")[0]!;

  for (const key of memoryUsageStore.keys()) {
    const parts = key.split(":");
    const keyDate = parts[parts.length - 1];
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
 * Safely extracts client IP address from request headers
 */
export function getClientIp(req: Request | NextRequest): string {
  try {
    const headers = req.headers;
    const xForwardedFor = headers.get("x-forwarded-for");
    if (xForwardedFor) {
      const firstIp = xForwardedFor.split(",")[0]?.trim();
      if (firstIp) return firstIp;
    }
    const xRealIp = headers.get("x-real-ip");
    if (xRealIp) return xRealIp.trim();

    const cfIp = headers.get("cf-connecting-ip");
    if (cfIp) return cfIp.trim();
  } catch {
    // Ignore header reading errors
  }
  return "127.0.0.1";
}

/**
 * Resolves a trusted client identifier for rate limiting:
 * Prefers verified auth user ID; falls back to client IP address.
 */
export function getClientIdentifier(
  req: Request | NextRequest,
  authUserId?: string | null
): string {
  if (authUserId && authUserId !== "guest" && !authUserId.startsWith("anon_")) {
    return `user:${authUserId}`;
  }
  return `ip:${getClientIp(req)}`;
}

/**
 * Checks and increments rate limit usage for a given feature and identifier.
 */
export function checkServerRateLimit(
  feature: string,
  identifier: string,
  dailyLimit: number = 30
): RateLimitResult {
  cleanupOldKeys();

  const todayStr = new Date().toISOString().split("T")[0]!;
  const key = `${feature}:${identifier}:${todayStr}`;

  const currentCount = memoryUsageStore.get(key) ?? 0;
  const resetAt = getDailyResetTimestamp();

  if (currentCount >= dailyLimit) {
    return {
      allowed: false,
      limit: dailyLimit,
      remaining: 0,
      resetAt,
      error: `Daily limit of ${dailyLimit} requests for ${feature} reached. Resets at midnight UTC.`,
    };
  }

  // Atomically record usage
  memoryUsageStore.set(key, currentCount + 1);

  return {
    allowed: true,
    limit: dailyLimit,
    remaining: Math.max(0, dailyLimit - (currentCount + 1)),
    resetAt,
  };
}

/**
 * Checks if user is permitted to make an AI request (compatibility method)
 */
export async function checkRateLimit(
  userId: string,
  isPaid: boolean = false
): Promise<RateLimitResult> {
  cleanupOldKeys();

  const todayStr = new Date().toISOString().split("T")[0]!;
  const key = `ai_diagnose:${userId}:${todayStr}`;

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
 * Increments AI analysis usage count for today (compatibility method)
 */
export async function incrementUsage(userId: string): Promise<number> {
  const todayStr = new Date().toISOString().split("T")[0]!;
  const key = `ai_diagnose:${userId}:${todayStr}`;

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
