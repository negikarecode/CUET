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

const PROTECTED_OPTION_PREFIXES = [
  "o-", "p-", "m-", "cis-", "trans-", "tert-", "sec-", "n-", "t-", "s-", "d-", "l-", "dl-",
  "pH", "pKa", "pKb", "pOH", "mRNA", "tRNA", "rRNA", "cDNA", "siRNA", "miRNA",
  "sp ", "sp2", "sp3", "d2sp3", "sp3d2",
];

/**
 * Safely capitalizes sentence beginnings of textual answer options,
 * protecting stereochemical prefixes, units, and mathematical expressions.
 */
export function safeCapitalizeOptionText(text: string): string {
  if (!text || typeof text !== "string") return text;
  // Strip trailing NTA section/options header noise if present
  const cleaned = text.replace(/(\r?\n|\s{2,})(?:Options\s+\d+.*|Section\s*:.*)$/is, "").trim();
  if (!cleaned) return text;

  const match = cleaned.match(/^(\s*)([a-zA-Z])(.*)$/s);
  if (!match || !match[2]) return cleaned;

  const leadingSpace = match[1] ?? "";
  const firstChar = match[2];
  const rest = match[3] ?? "";

  if (firstChar === firstChar.toUpperCase()) return cleaned;

  const checkStr = firstChar + rest;
  for (const prefix of PROTECTED_OPTION_PREFIXES) {
    if (checkStr.startsWith(prefix)) return cleaned;
  }
  if (/^[a-z]\s*=/.test(checkStr)) return cleaned;

  return leadingSpace + firstChar.toUpperCase() + rest;
}

