/**
 * CUETMate Authentication & Email Verification Error Handling Utility
 * Distinguishes between:
 * 1. Supabase shared SMTP provider delivery quota ("email rate limit exceeded")
 * 2. Supabase Auth per-user frequency limits (e.g. 60-second minimum between sends)
 * 3. Application-level rolling-window rate limits (3 resends per 15 min, IP limits)
 * 4. Transient network failures (offline, timeout)
 * 5. Already registered accounts & invalid email formats
 */

export type AuthErrorKind =
  | "provider_quota"        // Supabase built-in mailer hourly sending limit reached
  | "frequency_limit"       // Supabase per-user security cooldown (e.g. 60s)
  | "app_rate_limit"        // Application policy limit (3 in 15m)
  | "already_registered"    // Account already exists
  | "network_error"         // Offline / connection dropped
  | "invalid_email"         // Malformed email
  | "expired_token"         // Token hash expired or already consumed
  | "generic_error";

export interface ParsedAuthError {
  kind: AuthErrorKind;
  isRateLimit: boolean;
  message: string;
  recommendedCooldownSeconds?: number;
  providerBottleneck: boolean;
}

/**
 * Inspects any raw error from Supabase Auth or network requests and formats a human-friendly response.
 */
export function parseAuthError(error: unknown, fallbackMessage = "An unexpected error occurred."): ParsedAuthError {
  if (!error) {
    return {
      kind: "generic_error",
      isRateLimit: false,
      message: fallbackMessage,
      providerBottleneck: false,
    };
  }

  const rawMessage =
    typeof error === "string"
      ? error
      : (error as any)?.message || (error as any)?.error_description || (error as any)?.error || "";

  const status = Number((error as any)?.status || (error as any)?.statusCode || 0);
  const lower = rawMessage.toLowerCase();

  // 1. Transient Network Disconnection
  if (
    lower.includes("failed to fetch") ||
    lower.includes("networkerror") ||
    lower.includes("network request failed") ||
    lower.includes("abort") ||
    lower.includes("timeout") ||
    lower.includes("connection refused")
  ) {
    return {
      kind: "network_error",
      isRateLimit: false,
      message: "Network connection issue. Please check your internet connection and try again.",
      providerBottleneck: false,
    };
  }

  // 2. Supabase Shared SMTP Mailer Hourly Quota ("email rate limit exceeded")
  if (lower.includes("email rate limit exceeded") || (lower.includes("rate limit") && lower.includes("email") && !lower.includes("security purposes"))) {
    return {
      kind: "provider_quota",
      isRateLimit: true,
      message:
        "The confirmation email delivery service is temporarily at its hourly capacity. If you just registered, your confirmation email is likely already in your Spam, Promotions, or Updates folder. Please check there first, or wait a few minutes before requesting another link.",
      recommendedCooldownSeconds: 60,
      providerBottleneck: true,
    };
  }

  // 3. Supabase Auth Per-User Minimum Frequency ("For security purposes, you can only request this once every...")
  if (lower.includes("for security purposes") || lower.includes("once every") || (status === 429 && lower.includes("security"))) {
    return {
      kind: "frequency_limit",
      isRateLimit: true,
      message:
        "For security, replacement emails can only be requested once every 30 to 60 seconds. Please wait for the cooldown timer before trying again.",
      recommendedCooldownSeconds: 30,
      providerBottleneck: false,
    };
  }

  // 4. Application-Level Rate Limit
  if (status === 429 || lower.includes("too many") || lower.includes("rate limit")) {
    return {
      kind: "app_rate_limit",
      isRateLimit: true,
      message:
        rawMessage ||
        "Too many requests. Please wait a few moments before trying again.",
      recommendedCooldownSeconds: 45,
      providerBottleneck: false,
    };
  }

  // 5. Already Registered
  if (lower.includes("already registered") || lower.includes("user already exists")) {
    return {
      kind: "already_registered",
      isRateLimit: false,
      message: "An account with this email address already exists. Please sign in instead.",
      providerBottleneck: false,
    };
  }

  // 6. Invalid / Expired Token
  if (lower.includes("expired") || lower.includes("invalid token") || lower.includes("already been used")) {
    return {
      kind: "expired_token",
      isRateLimit: false,
      message: "The confirmation link is invalid, expired, or has already been used. Please request a new confirmation email or sign in directly.",
      providerBottleneck: false,
    };
  }

  // 7. Invalid Email Format
  if (lower.includes("invalid email") || lower.includes("unable to validate email")) {
    return {
      kind: "invalid_email",
      isRateLimit: false,
      message: "Please enter a valid, deliverable email address.",
      providerBottleneck: false,
    };
  }

  return {
    kind: "generic_error",
    isRateLimit: false,
    message: rawMessage || fallbackMessage,
    providerBottleneck: false,
  };
}
