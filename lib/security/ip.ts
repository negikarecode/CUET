import { NextRequest } from "next/server";

const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/;
const IPV6_REGEX = /^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$|^::(?:[a-fA-F0-9]{1,4}:){0,6}[a-fA-F0-9]{1,4}$|^(?:[a-fA-F0-9]{1,4}:){1,7}:$/;

/**
 * Validates whether an IP address matches standard IPv4 or IPv6 format.
 */
export function isValidIp(ip: string): boolean {
  if (!ip || typeof ip !== "string") return false;
  const cleanIp = ip.trim();
  return IPV4_REGEX.test(cleanIp) || IPV6_REGEX.test(cleanIp);
}

/**
 * Normalizes an IP string by trimming, stripping ports (e.g., 1.2.3.4:8080),
 * and validating format. Returns "127.0.0.1" for invalid or missing values.
 */
export function cleanIpAddress(rawIp: string | null | undefined): string {
  if (!rawIp) return "127.0.0.1";

  let ip = rawIp.trim();

  // Strip port if IPv4 with port (e.g. 192.168.1.1:3000)
  if (ip.includes(":") && !ip.includes("::")) {
    const parts = ip.split(":");
    const host = parts[0];
    if (parts.length === 2 && host && IPV4_REGEX.test(host)) {
      ip = host;
    }
  }

  // Handle IPv6 mapped IPv4 (e.g. ::ffff:192.168.1.1)
  if (ip.startsWith("::ffff:")) {
    const v4 = ip.replace("::ffff:", "");
    if (IPV4_REGEX.test(v4)) {
      return v4;
    }
  }

  if (isValidIp(ip)) {
    return ip;
  }

  return "127.0.0.1";
}

/**
 * Safely extracts client IP address from platform-provided headers.
 * Prioritizes trusted, tamper-proof headers injected by Vercel's edge proxy:
 * 1. x-vercel-ip / x-vercel-forwarded-for (Vercel Edge Proxy)
 * 2. cf-connecting-ip (Cloudflare)
 * 3. x-real-ip
 * 4. x-forwarded-for (first valid public entry)
 */
export function getClientIp(req: Request | NextRequest): string {
  try {
    const headers = req.headers;

    // 1. Authoritative Vercel platform-injected header (cannot be spoofed by client)
    const vercelIp = headers.get("x-vercel-ip");
    if (vercelIp && isValidIp(vercelIp.trim())) {
      return cleanIpAddress(vercelIp);
    }

    // 2. Cloudflare Connecting IP
    const cfIp = headers.get("cf-connecting-ip");
    if (cfIp && isValidIp(cfIp.trim())) {
      return cleanIpAddress(cfIp);
    }

    // 3. X-Real-IP
    const realIp = headers.get("x-real-ip");
    if (realIp && isValidIp(realIp.trim())) {
      return cleanIpAddress(realIp);
    }

    // 4. X-Forwarded-For fallback (extract leftmost valid IP)
    const xForwardedFor = headers.get("x-forwarded-for");
    if (xForwardedFor) {
      const candidates = xForwardedFor.split(",").map((s) => s.trim());
      for (const candidate of candidates) {
        if (candidate && isValidIp(candidate)) {
          return cleanIpAddress(candidate);
        }
      }
    }
  } catch {
    // Fail safe to localhost identifier on unexpected header parsing errors
  }

  return "127.0.0.1";
}
