import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Deterministically transforms any string (or legacy test/question ID)
 * into a valid RFC 4122 v4 UUID using MD5 hashing.
 */
export function stringToUuid(str: string): string {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(str)) {
    return str;
  }
  const hash = crypto.createHash("md5").update(str).digest("hex");
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    "4" + hash.substring(13, 16),
    ((parseInt(hash.substring(16, 18), 16) & 0x3f) | 0x80).toString(16) +
      hash.substring(18, 20),
    hash.substring(20, 32),
  ].join("-");
}
