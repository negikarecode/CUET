import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type OtpType = "signup" | "login" | "recovery";

export interface StoredOtpRecord {
  id: string;
  email: string;
  otp_type: OtpType;
  otp_hash: string;
  attempts: number;
  metadata?: Record<string, any>;
  expires_at: string;
  created_at: string;
}

// In-memory fallback cache (used if Supabase user_otp_codes table is not yet migrated)
declare global {
  // eslint-disable-next-line no-var
  var __cuetOtpMemoryStore: Map<string, StoredOtpRecord> | undefined;
}

if (!globalThis.__cuetOtpMemoryStore) {
  globalThis.__cuetOtpMemoryStore = new Map<string, StoredOtpRecord>();
}
const memoryStore = globalThis.__cuetOtpMemoryStore;

const OTP_SECRET = process.env.OTP_SECRET || "cuetmate-default-otp-secret-salt-2026";
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const COOLDOWN_SECONDS = 60;
const MAX_ATTEMPTS = 5;

/**
 * Generates a cryptographically secure 6-digit numeric OTP.
 */
export function generateNumericOtp(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Hashes an OTP with HMAC-SHA256 using the configured secret.
 */
export function hashOtp(code: string): string {
  return crypto.createHmac("sha256", OTP_SECRET).update(code.trim()).digest("hex");
}

/**
 * Constant-time comparison of two hex hashes to prevent timing attacks.
 */
function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const bufA = Buffer.from(a, "hex");
  const bufB = Buffer.from(b, "hex");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function getMemoryKey(email: string, type: OtpType): string {
  return `${email.trim().toLowerCase()}::${type}`;
}

/**
 * Stores a freshly generated OTP code with HMAC-SHA256 hashing.
 * Enforces a 60-second cooldown per email and OTP type.
 */
export async function saveOtp({
  email,
  type,
  code,
  metadata = {},
}: {
  email: string;
  type: OtpType;
  code: string;
  metadata?: Record<string, any>;
}): Promise<{ success: boolean; cooldownRemaining?: number; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const hash = hashOtp(code);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MS).toISOString();

  // 1. Check existing record for active cooldown
  const existing = await getActiveOtpRecord(cleanEmail, type);
  if (existing) {
    const elapsedSeconds = Math.floor(
      (now.getTime() - new Date(existing.created_at).getTime()) / 1000
    );
    if (elapsedSeconds < COOLDOWN_SECONDS) {
      return {
        success: false,
        cooldownRemaining: COOLDOWN_SECONDS - elapsedSeconds,
        error: `Please wait ${COOLDOWN_SECONDS - elapsedSeconds}s before requesting a new code.`,
      };
    }
  }

  // 2. Try persisting to Supabase `user_otp_codes` table
  let persistedInDb = false;
  try {
    // Delete any old OTPs for this email and type
    await supabaseAdmin
      .from("user_otp_codes")
      .delete()
      .eq("email", cleanEmail)
      .eq("otp_type", type);

    const { error: insertErr } = await supabaseAdmin.from("user_otp_codes").insert({
      email: cleanEmail,
      otp_type: type,
      otp_hash: hash,
      attempts: 0,
      metadata,
      expires_at: expiresAt,
      created_at: now.toISOString(),
    });

    if (!insertErr) {
      persistedInDb = true;
    }
  } catch (err) {
    // Table might not exist yet; will fall back to memory
  }

  // 3. Fallback to in-memory store if DB table was unavailable
  if (!persistedInDb) {
    const record: StoredOtpRecord = {
      id: crypto.randomUUID(),
      email: cleanEmail,
      otp_type: type,
      otp_hash: hash,
      attempts: 0,
      metadata,
      expires_at: expiresAt,
      created_at: now.toISOString(),
    };
    memoryStore.set(getMemoryKey(cleanEmail, type), record);
  }

  return { success: true };
}

/**
 * Retrieves the currently active OTP record for an email and type.
 */
async function getActiveOtpRecord(
  email: string,
  type: OtpType
): Promise<StoredOtpRecord | null> {
  const cleanEmail = email.trim().toLowerCase();

  // Try DB first
  try {
    const { data, error } = await supabaseAdmin
      .from("user_otp_codes")
      .select("*")
      .eq("email", cleanEmail)
      .eq("otp_type", type)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return data as StoredOtpRecord;
    }
  } catch {}

  // Fallback to memory
  const mem = memoryStore.get(getMemoryKey(cleanEmail, type));
  if (mem) {
    if (new Date(mem.expires_at).getTime() > Date.now()) {
      return mem;
    } else {
      memoryStore.delete(getMemoryKey(cleanEmail, type));
    }
  }

  return null;
}

/**
 * Verifies a candidate OTP against the stored HMAC-SHA256 hash.
 * Enforces single-use consumption, timing-safe checks, and a 5-attempt limit.
 */
export async function verifyOtpCode({
  email,
  type,
  code,
}: {
  email: string;
  type: OtpType;
  code: string;
}): Promise<{
  success: boolean;
  error?: string;
  metadata?: Record<string, any>;
  isExpired?: boolean;
  isMaxAttempts?: boolean;
}> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanCode = code.trim();

  if (!cleanCode || cleanCode.length !== 6) {
    return { success: false, error: "Please enter the complete 6-digit verification code." };
  }

  const record = await getActiveOtpRecord(cleanEmail, type);

  if (!record) {
    return {
      success: false,
      isExpired: true,
      error: "Verification code has expired or does not exist. Please request a new code.",
    };
  }

  // Check attempt limit
  if (record.attempts >= MAX_ATTEMPTS) {
    await deleteOtpRecord(cleanEmail, type);
    return {
      success: false,
      isMaxAttempts: true,
      error: "Too many failed attempts. This verification code has been invalidated. Please request a new code.",
    };
  }

  const candidateHash = hashOtp(cleanCode);
  const isMatch = timingSafeEqualHex(record.otp_hash, candidateHash);

  if (!isMatch) {
    const nextAttempts = record.attempts + 1;
    await updateAttempts(cleanEmail, type, nextAttempts);

    const remaining = MAX_ATTEMPTS - nextAttempts;
    if (remaining <= 0) {
      await deleteOtpRecord(cleanEmail, type);
      return {
        success: false,
        isMaxAttempts: true,
        error: "Too many failed attempts. This code has been invalidated. Please request a new code.",
      };
    }

    return {
      success: false,
      error: `Incorrect verification code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
    };
  }

  // Match confirmed! Delete record immediately for single-use safety
  await deleteOtpRecord(cleanEmail, type);

  return {
    success: true,
    metadata: record.metadata || {},
  };
}

/**
 * Updates the attempts count on failure.
 */
async function updateAttempts(email: string, type: OtpType, attempts: number): Promise<void> {
  const cleanEmail = email.trim().toLowerCase();

  try {
    await supabaseAdmin
      .from("user_otp_codes")
      .update({ attempts })
      .eq("email", cleanEmail)
      .eq("otp_type", type);
  } catch {}

  const mem = memoryStore.get(getMemoryKey(cleanEmail, type));
  if (mem) {
    mem.attempts = attempts;
    memoryStore.set(getMemoryKey(cleanEmail, type), mem);
  }
}

/**
 * Deletes the OTP record upon consumption or invalidation.
 */
export async function deleteOtpRecord(email: string, type: OtpType): Promise<void> {
  const cleanEmail = email.trim().toLowerCase();

  try {
    await supabaseAdmin
      .from("user_otp_codes")
      .delete()
      .eq("email", cleanEmail)
      .eq("otp_type", type);
  } catch {}

  memoryStore.delete(getMemoryKey(cleanEmail, type));
}
