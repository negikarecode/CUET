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

import { RATE_LIMITING_DISABLED } from "@/lib/security/rateLimiter";

/**
 * Synchronous/async bridge for checking server rate limits with centralized policy.
 */
export function checkServerRateLimit(
  feature: string,
  identifier: string,
  limit: number = 30
): RateLimitResult {
  if (RATE_LIMITING_DISABLED) {
    return {
      allowed: true,
      limit: 999999,
      remaining: 999999,
      resetAt: Date.now() + 3600000,
    };
  }

  const policyKey = feature.startsWith("ai:") ? feature : `ai:${feature}`;
  const now = Date.now();
  const resetAt = getDailyResetTimestamp();
  const windowSec = 60;
  const record = ((globalThis as any).__legacyRateLimitStore ||= new Map<string, number[]>());
  const fullKey = `${policyKey}:${identifier}`;

  let timestamps: number[] = record.get(fullKey) || [];
  const cutoff = now - windowSec * 1000;
  timestamps = timestamps.filter((t: number) => t > cutoff);

  if (timestamps.length >= limit) {
    const oldest = timestamps[0] || now;
    const retryAfter = Math.max(1, Math.ceil((oldest + windowSec * 1000 - now) / 1000));
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: now + retryAfter * 1000,
      retryAfter,
      error: `Rate limit of ${limit} requests per minute reached for ${feature}. Please wait ${retryAfter}s.`,
    };
  }

  timestamps.push(now);
  record.set(fullKey, timestamps);

  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - timestamps.length),
    resetAt,
    retryAfter: 0,
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
