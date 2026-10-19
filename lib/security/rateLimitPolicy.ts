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
    max: 15,
    windowSeconds: 15 * 60, // 15 per 15 minutes per IP (allows normal typo corrections and shared networks)
    failClosed: false,
    scope: "ip",
    errorMessage: "Registration attempts from this network are temporarily paused. Please wait a few moments before trying again.",
  },
  "auth:password_reset": {
    max: 3,
    windowSeconds: 15 * 60, // 3 per 15 minutes
    blockDurationSeconds: 15 * 60,
    failClosed: true,
    scope: "combined",
    errorMessage: "Too many password reset requests. Please wait 15 minutes before requesting another reset.",
  },
  "auth:resend_verification": {
    max: 3,
    windowSeconds: 15 * 60, // 3 per 15 minutes per account
    failClosed: false,
    scope: "combined",
    errorMessage: "You have reached the limit of 3 verification email requests for this 15-minute window. Please check your Spam/Promotions folder, or wait a short while before requesting another link.",
  },
  "auth:resend_ip": {
    max: 10,
    windowSeconds: 15 * 60, // 10 per 15 minutes per IP across all accounts
    failClosed: false,
    scope: "ip",
    errorMessage: "Too many verification requests from this network. Please wait a few moments before trying again.",
  },
  "auth:confirm": {
    max: 30,
    windowSeconds: 15 * 60, // 30 per 15 minutes
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
