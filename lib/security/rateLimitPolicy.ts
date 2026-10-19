/**
 * Centralized Rate Limiting & Abuse Protection Policies
 * Defines authoritative limits, sliding window durations, and fail-closed policies across CUETMate.
 */

export interface RateLimitPolicy {
  max: number;                  // Maximum requests allowed within sliding window
  windowSeconds: number;        // Sliding window duration in seconds
  blockDurationSeconds?: number;// Additional cooldown penalty when limit is breached
  failClosed: boolean;          // If true, requests are rejected if rate limit store is down
  scope: "ip" | "user" | "combined"; // Keying strategy
  errorMessage: string;
}

export const RATE_LIMIT_POLICIES: Record<string, RateLimitPolicy> = {
  // ─── AUTHENTICATION & IDENTITY ─────────────────────────────────────────────
  "auth:login": {
    max: 5,
    windowSeconds: 15 * 60, // 5 per 15 minutes
    blockDurationSeconds: 15 * 60,
    failClosed: true,
    scope: "combined",
    errorMessage: "Too many login attempts. For security, please wait 15 minutes before trying again.",
  },
  "auth:signup": {
    max: 5,
    windowSeconds: 60 * 60, // 5 per hour
    blockDurationSeconds: 60 * 60,
    failClosed: true,
    scope: "ip",
    errorMessage: "Account creation limit reached for this IP address. Please try again later.",
  },
  "auth:password_reset": {
    max: 3,
    windowSeconds: 60 * 60, // 3 per hour
    blockDurationSeconds: 60 * 60,
    failClosed: true,
    scope: "combined",
    errorMessage: "Too many password reset requests. Please wait an hour before requesting another reset.",
  },
  "auth:resend_verification": {
    max: 3,
    windowSeconds: 15 * 60, // 3 per 15 minutes
    blockDurationSeconds: 15 * 60,
    failClosed: true,
    scope: "combined",
    errorMessage: "Too many verification emails requested. Please wait 15 minutes before requesting a new link.",
  },
  "auth:confirm": {
    max: 20,
    windowSeconds: 15 * 60, // 20 per 15 minutes
    failClosed: false,
    scope: "ip",
    errorMessage: "Too many confirmation attempts. Please wait a moment before trying again.",
  },

  // ─── EXAMS, PRACTICE & CBT SIMULATOR ───────────────────────────────────────
  "exam:start": {
    max: 10,
    windowSeconds: 60, // 10 per minute
    failClosed: false,
    scope: "combined",
    errorMessage: "You are starting tests too quickly. Please wait a moment before starting another session.",
  },
  "exam:submit": {
    max: 30,
    windowSeconds: 60, // 30 submissions per minute
    failClosed: false,
    scope: "combined",
    errorMessage: "Test submission rate limit exceeded. Please wait a few seconds.",
  },

  // ─── AI-POWERED FEATURES ───────────────────────────────────────────────────
  "ai:insights": {
    max: 10,
    windowSeconds: 60, // 10 per minute per user
    failClosed: false,
    scope: "user",
    errorMessage: "AI analysis rate limit reached. Please wait a minute before requesting further insights.",
  },
  "ai:doubt_solver": {
    max: 10,
    windowSeconds: 60, // 10 per minute per user
    failClosed: false,
    scope: "user",
    errorMessage: "AI tutor is processing previous queries. Please wait a moment before sending another doubt.",
  },
  "ai:repair_quiz": {
    max: 5,
    windowSeconds: 60, // 5 per minute per user
    failClosed: false,
    scope: "user",
    errorMessage: "Adaptive drill generation limit reached. Please wait a minute before generating another quiz.",
  },

  // ─── PAYMENTS & ENTITLEMENTS ───────────────────────────────────────────────
  "payment:create_order": {
    max: 5,
    windowSeconds: 10 * 60, // 5 per 10 minutes per user/IP
    blockDurationSeconds: 10 * 60,
    failClosed: true,
    scope: "combined",
    errorMessage: "Order creation limit reached. Please complete your existing checkout or wait 10 minutes.",
  },
  "payment:verify": {
    max: 10,
    windowSeconds: 10 * 60, // 10 per 10 minutes per user/IP
    blockDurationSeconds: 10 * 60,
    failClosed: true,
    scope: "combined",
    errorMessage: "Payment verification limit reached. If your account was debited, please contact support.",
  },

  // ─── USER DATA & SENSITIVE OPERATIONS ──────────────────────────────────────
  "user:profile_update": {
    max: 10,
    windowSeconds: 60, // 10 per minute per user
    failClosed: false,
    scope: "user",
    errorMessage: "Profile update rate limit reached. Please wait a moment before saving changes again.",
  },
  "user:leaderboard": {
    max: 30,
    windowSeconds: 60, // 30 per minute
    failClosed: false,
    scope: "combined",
    errorMessage: "Leaderboard request limit reached. Please wait a moment before refreshing.",
  },
  "student:attempts_delete": {
    max: 5,
    windowSeconds: 10 * 60, // 5 per 10 minutes per user
    failClosed: true,
    scope: "user",
    errorMessage: "Attempt deletion limit reached. Please wait 10 minutes before deleting more attempts.",
  },
  "admin:pyq": {
    max: 30,
    windowSeconds: 60, // 30 per minute
    failClosed: true,
    scope: "ip",
    errorMessage: "PYQ admin operations rate limit exceeded. Please wait a minute.",
  },

  // Generic fallback for unlisted sensitive endpoints
  "default": {
    max: 60,
    windowSeconds: 60,
    failClosed: false,
    scope: "ip",
    errorMessage: "Too many requests. Please slow down and try again.",
  },
};

export function getRateLimitPolicy(action: string): RateLimitPolicy {
  return RATE_LIMIT_POLICIES[action] || RATE_LIMIT_POLICIES["default"]!;
}
