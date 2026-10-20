/**
 * CUETMate Security Engine: Safe Redirect Validation
 * Enforces strict RFC 3986 path validation to prevent Open Redirect vulnerabilities (SEC-05).
 */

export const DEFAULT_SAFE_REDIRECT = "/dashboard";

/**
 * Validates and sanitizes a candidate redirect URL or path.
 * Strictly permits only relative internal application paths.
 * Rejects:
 * - Protocol-relative destinations (//attacker.com)
 * - Backslash-encoded path traversal (/\\attacker.com, \\attacker.com, /%5Cattacker.com)
 * - Explicit URI schemes (http://, https://, javascript:, data:)
 * - CRLF injection sequences (\r, \n)
 * - Obfuscated URL encodings and control characters
 */
export function getSafeRedirectPath(
  target: string | null | undefined,
  fallback = DEFAULT_SAFE_REDIRECT
): string {
  if (!target || typeof target !== "string") {
    return fallback;
  }

  const trimmed = target.trim();
  if (!trimmed) {
    return fallback;
  }

  // Inspect both raw and URL-decoded forms to defeat obfuscation
  let decoded = trimmed;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    // Malformed URI percent-encoding -> reject
    return fallback;
  }

  // 1. Block protocol-relative paths (//) in raw or decoded form
  if (trimmed.startsWith("//") || decoded.startsWith("//")) {
    return fallback;
  }

  // 2. Block backslash variants (/\\, \\, \/, %5c) in raw or decoded form
  if (
    trimmed.startsWith("/\\") ||
    trimmed.startsWith("\\") ||
    trimmed.includes("\\") ||
    decoded.startsWith("/\\") ||
    decoded.startsWith("\\") ||
    decoded.includes("\\") ||
    /%5[cC]/i.test(trimmed)
  ) {
    return fallback;
  }

  // 3. Block URI schemes and authority indicators (://, javascript:, data:, vbscript:)
  if (
    trimmed.includes("://") ||
    decoded.includes("://") ||
    /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed) ||
    /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(decoded)
  ) {
    return fallback;
  }

  // 4. Block CRLF or control characters that could induce HTTP response splitting
  if (/[\r\n\0\t]/.test(trimmed) || /[\r\n\0\t]/.test(decoded)) {
    return fallback;
  }

  // 5. Must start with a single forward slash
  if (!trimmed.startsWith("/") || !decoded.startsWith("/")) {
    return fallback;
  }

  // 6. Ensure the path cannot be interpreted as a network host or authority
  try {
    const dummyOrigin = "https://cuetmate.internal";
    const parsed = new URL(trimmed, dummyOrigin);

    if (parsed.origin !== dummyOrigin) {
      return fallback;
    }

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}
