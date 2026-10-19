import { NextRequest } from "next/server";
import { getClientIp as getSafeClientIp } from "./security/ip";
import { RateLimitResult as SecRateLimitResult } from "./security/rateLimiter";

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number; // Unix timestamp in milliseconds when quota resets
  error?: string;
  retryAfter?: number;
}

export function getClientIp(req: Request | NextRequest): string {
  return getSafeClientIp(req);
}

export function getDailyResetTimestamp(): number {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCHours(23, 59, 59, 999);
  return tomorrow.getTime();
}

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
 * Synchronous/async bridge for checking server rate limits with centralized policy.
 * Custom rate limiting is temporarily disabled across CUETMate.
 */
export function checkServerRateLimit(
  _feature: string,
  _identifier: string,
  _limit: number = 30
): RateLimitResult {
  // Custom rate-limiting is temporarily disabled across CUETMate
  return {
    allowed: true,
    limit: 999999,
    remaining: 999999,
    resetAt: Date.now() + 3600000,
  };
}

export async function checkRateLimit(
  userId: string,
  isPaid: boolean = false
): Promise<RateLimitResult> {
  const limit = isPaid ? 25 : 3;
  return checkServerRateLimit("insights", `user:${userId}`, limit);
}

export async function incrementUsage(userId: string): Promise<number> {
  const result = checkServerRateLimit("insights", `user:${userId}`, 1000);
  return result.limit - result.remaining;
}

export function getRateLimitHeaders(result: RateLimitResult | SecRateLimitResult): Record<string, string> {
  const resetEpoch = "reset" in result ? result.reset : Math.floor(result.resetAt / 1000);
  const remaining = "remaining" in result ? result.remaining : 0;
  const retryAfter = result.retryAfter ?? 0;

  const headers: Record<string, string> = {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": remaining.toString(),
    "X-RateLimit-Reset": resetEpoch.toString(),
  };

  if (retryAfter > 0) {
    headers["Retry-After"] = retryAfter.toString();
  }

  return headers;
}
