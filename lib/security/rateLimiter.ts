import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "./ip";
import { getRateLimitPolicy, RateLimitPolicy } from "./rateLimitPolicy";

export interface RateLimitResult {
  success: boolean;       // true if allowed, false if rate limited
  allowed: boolean;       // alias for success
  limit: number;          // configured maximum
  remaining: number;      // requests remaining in window
  reset: number;          // Unix epoch timestamp in seconds when quota resets
  retryAfter: number;     // seconds to wait before retrying
  key: string;            // full identifier key
  error?: string;         // user-facing error message
  blocked?: boolean;      // whether client is currently in penalty block
}

interface SlidingWindowRecord {
  timestamps: number[];
  blockedUntil?: number;
}

// In-Memory Concurrency-Safe Sliding Window Store
const localStore = new Map<string, SlidingWindowRecord>();

// Periodic garbage collection for expired keys (every 2 minutes)
let lastCleanup = Date.now();
function cleanupExpiredKeys() {
  const now = Date.now();
  if (now - lastCleanup < 120_000) return;
  lastCleanup = now;

  for (const [key, record] of localStore.entries()) {
    // Keep records active if in penalty block
    if (record.blockedUntil && record.blockedUntil > now) continue;

    // Remove timestamps older than 2 hours
    const validTimestamps = record.timestamps.filter((t) => now - t < 7200_000);
    if (validTimestamps.length === 0) {
      localStore.delete(key);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}

/**
 * Checks rate limits against Upstash Redis or Vercel KV via REST API if configured.
 * Returns null if not configured or on network failure.
 */
async function checkExternalStore(
  fullKey: string,
  policy: RateLimitPolicy,
  nowMs: number
): Promise<RateLimitResult | null> {
  const restUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const restToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!restUrl || !restToken) {
    return null;
  }

  try {
    const windowSec = policy.windowSeconds;
    // Execute atomic INCR and TTL check via Upstash REST pipeline
    const pipelineUrl = `${restUrl.replace(/\/+$/, "")}/pipeline`;
    const res = await fetch(pipelineUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${restToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", fullKey],
        ["TTL", fullKey],
      ]),
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`[RateLimit External Store HTTP ${res.status}]`);
      if (policy.failClosed) {
        return {
          success: false,
          allowed: false,
          limit: policy.max,
          remaining: 0,
          reset: Math.floor(nowMs / 1000) + policy.windowSeconds,
          retryAfter: policy.windowSeconds,
          key: fullKey,
          error: "Rate limit verification temporarily unavailable. Request blocked for security.",
        };
      }
      return null;
    }

    const json = (await res.json()) as Array<{ result: any; error?: string }>;
    if (!Array.isArray(json) || json.length < 2) return null;

    const count = Number(json[0]?.result);
    let ttl = Number(json[1]?.result);

    // If key had no TTL set yet, set expiration
    if (ttl === -1 || count === 1) {
      await fetch(`${restUrl}/expire/${encodeURIComponent(fullKey)}/${windowSec}`, {
        headers: { Authorization: `Bearer ${restToken}` },
        cache: "no-store",
      }).catch(() => {});
      ttl = windowSec;
    }

    const resetSec = Math.floor(nowMs / 1000) + Math.max(1, ttl);
    const retryAfter = Math.max(1, ttl);

    if (count > policy.max) {
      return {
        success: false,
        allowed: false,
        limit: policy.max,
        remaining: 0,
        reset: resetSec,
        retryAfter,
        key: fullKey,
        error: policy.errorMessage,
      };
    }

    return {
      success: true,
      allowed: true,
      limit: policy.max,
      remaining: Math.max(0, policy.max - count),
      reset: resetSec,
      retryAfter: 0,
      key: fullKey,
    };
  } catch (err) {
    console.warn("[RateLimit External Store Notice]:", err);
    if (policy.failClosed) {
      return {
        success: false,
        allowed: false,
        limit: policy.max,
        remaining: 0,
        reset: Math.floor(nowMs / 1000) + policy.windowSeconds,
        retryAfter: policy.windowSeconds,
        key: fullKey,
        error: "Rate limit verification temporarily unavailable. Request blocked for security.",
      };
    }
    return null;
  }
}

/**
 * Concurrency-safe in-memory sliding window rate limiter.
 * Operates atomically per serverless container with exact second-resolution eviction.
 */
function checkLocalSlidingWindow(
  fullKey: string,
  policy: RateLimitPolicy,
  nowMs: number
): RateLimitResult {
  cleanupExpiredKeys();

  let record = localStore.get(fullKey);
  if (!record) {
    record = { timestamps: [] };
    localStore.set(fullKey, record);
  }

  // 1. Check if key is in active penalty block
  if (record.blockedUntil && record.blockedUntil > nowMs) {
    const retryAfter = Math.ceil((record.blockedUntil - nowMs) / 1000);
    return {
      success: false,
      allowed: false,
      limit: policy.max,
      remaining: 0,
      reset: Math.floor(record.blockedUntil / 1000),
      retryAfter,
      key: fullKey,
      blocked: true,
      error: policy.errorMessage,
    };
  }

  // 2. Evict timestamps outside the active sliding window
  const windowMs = policy.windowSeconds * 1000;
  const windowStart = nowMs - windowMs;
  record.timestamps = record.timestamps.filter((t) => t > windowStart);

  // 3. Check capacity
  if (record.timestamps.length >= policy.max) {
    const oldestTimestamp = record.timestamps[0] || nowMs;
    const windowExpiry = oldestTimestamp + windowMs;
    let retryAfter = Math.max(1, Math.ceil((windowExpiry - nowMs) / 1000));

    // Apply block duration penalty if configured
    if (policy.blockDurationSeconds && !record.blockedUntil) {
      record.blockedUntil = nowMs + policy.blockDurationSeconds * 1000;
      retryAfter = policy.blockDurationSeconds;
    }

    const resetSec = Math.floor((record.blockedUntil || windowExpiry) / 1000);

    return {
      success: false,
      allowed: false,
      limit: policy.max,
      remaining: 0,
      reset: resetSec,
      retryAfter,
      key: fullKey,
      error: policy.errorMessage,
    };
  }

  // 4. Record new timestamp atomically
  record.timestamps.push(nowMs);
  const remaining = Math.max(0, policy.max - record.timestamps.length);
  const resetSec = Math.floor((nowMs + windowMs) / 1000);

  return {
    success: true,
    allowed: true,
    limit: policy.max,
    remaining,
    reset: resetSec,
    retryAfter: 0,
    key: fullKey,
  };
}

/**
 * Central switch to control rate-limiting across CUETMate.
 * Default is FALSE (production security rate limiting strictly active and enforced).
 * Can be configured via setRateLimitingDisabled() for controlled test isolation.
 */
export let RATE_LIMITING_DISABLED = false;

export function setRateLimitingDisabled(disabled: boolean): void {
  RATE_LIMITING_DISABLED = disabled;
}

/**
 * Primary rate limit evaluation function.
 * Checks external shared store (Upstash/KV) if configured, with local sliding window fallback.
 */
export async function rateLimit(
  action: string,
  identifier: string,
  customPolicy?: Partial<RateLimitPolicy>
): Promise<RateLimitResult> {
  const fullKey = `rl:${action}:${identifier}`;

  // Custom rate-limiting is temporarily disabled across CUETMate
  if (RATE_LIMITING_DISABLED) {
    return {
      success: true,
      allowed: true,
      limit: 999999,
      remaining: 999999,
      reset: Math.floor(Date.now() / 1000) + 3600,
      retryAfter: 0,
      key: fullKey,
    };
  }

  const basePolicy = getRateLimitPolicy(action);
  const policy: RateLimitPolicy = { ...basePolicy, ...(customPolicy || {}) };
  const nowMs = Date.now();

  // Try external multi-instance store first if configured
  const externalResult = await checkExternalStore(fullKey, policy, nowMs);
  if (externalResult !== null) {
    if (!externalResult.success) {
      console.warn(`[RATE_LIMIT_EXCEEDED] Action: ${action}, Identifier: ${identifier}`);
    }
    return externalResult;
  }

  // Fallback to local sliding window store
  const localResult = checkLocalSlidingWindow(fullKey, policy, nowMs);
  if (!localResult.success) {
    console.warn(`[RATE_LIMIT_EXCEEDED] Action: ${action}, Identifier: ${identifier}`);
  }
  return localResult;
}

/**
 * Resolves a trusted rate limit client identifier based on policy scoping rules:
 * - "ip": Keys strictly by client IP (e.g. signup, brute-force defense)
 * - "user": Keys by authenticated user ID (falls back to IP if guest)
 * - "combined": Keys by combined user ID and client IP
 */
export function getClientRateLimitIdentifier(
  req: Request | NextRequest,
  userId?: string | null,
  action?: string
): string {
  const policy = action ? getRateLimitPolicy(action) : null;
  const scope = policy?.scope || "combined";
  const ip = getClientIp(req);

  const isGuest = !userId || userId === "guest" || userId.startsWith("anon_");

  if (scope === "ip" || isGuest) {
    return `ip:${ip}`;
  }

  if (scope === "user") {
    return `usr:${userId}`;
  }

  // combined scope
  return `usr:${userId}:ip:${ip}`;
}

/**
 * Formats a standardized HTTP 429 Too Many Requests response with standard rate limit headers.
 */
export function rateLimitResponse(result: RateLimitResult): NextResponse {
  return NextResponse.json(
    {
      error: result.error || "Too Many Requests",
      code: "RATE_LIMIT_EXCEEDED",
      retryAfter: result.retryAfter,
      limit: result.limit,
      remaining: 0,
      reset: result.reset,
    },
    {
      status: 429,
      headers: {
        "Retry-After": result.retryAfter.toString(),
        "X-RateLimit-Limit": result.limit.toString(),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": result.reset.toString(),
      },
    }
  );
}

/**
 * Resets a specific key (primarily used for automated tests and admin overrides)
 */
export function resetRateLimitKey(action: string, identifier: string): void {
  const fullKey = `rl:${action}:${identifier}`;
  localStore.delete(fullKey);
}
