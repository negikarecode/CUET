import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

export interface CandidateRegistrationDetails {
  fullName: string;
  age?: string;
  dob?: string;
  guardianConsent?: boolean;
  guardianEmail?: string;
  consentAcceptedAt?: string;
  consentVersion?: string;
  targetCollege: string;
  targetUniversity: string;
  targetCourse: string;
  targetStream: string;
  selectedSubjects: string[];
}

export interface PendingRegistrationRecord {
  registrationId: string;
  email: string;
  encryptedPassword: string; // AES-256-GCM encrypted
  candidateDetails: CandidateRegistrationDetails;
  otpHash: string;
  attemptsRemaining: number;
  resendCount: number;
  lastOtpSentAt: string;
  expiresAt: string;
  createdAt: string;
  status: "pending" | "verified" | "consumed" | "expired";
  ip?: string;
}

function getOtpSecret(): string {
  return process.env.OTP_SECRET || "cuetmate-default-otp-secret-salt-2026";
}
export const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
export const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds
export const MAX_RESENDS_PER_HOUR = 5;
export const MAX_VERIFY_ATTEMPTS = 5;

// Persistent database storage is mandatory in production serverless environments.
// No in-memory fallback is used, ensuring full consistency across distributed Vercel serverless lambdas.

// ─────────────────────────────────────────────────────────────────────────────
// Cryptographic Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derives a 32-byte key from OTP_SECRET for AES-256-GCM.
 */
function getEncryptionKey(): Buffer {
  return crypto.createHash("sha256").update(getOtpSecret()).digest();
}

/**
 * Encrypts sensitive credentials (like candidate password) using AES-256-GCM.
 */
export function encryptCredential(plainText: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * Decrypts sensitive credentials using AES-256-GCM.
 */
export function decryptCredential(cipherText: string): string {
  const [ivHex, authTagHex, encryptedData] = cipherText.split(":");
  if (!ivHex || !authTagHex || !encryptedData) {
    throw new Error("Invalid encrypted credential format");
  }
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    Buffer.from(ivHex, "hex")
  );
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

/**
 * Generates a cryptographically secure 6-digit numeric OTP.
 */
export function generateSecureNumericOtp(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Generates a cryptographically secure UUID registration transaction ID.
 */
export function generateRegistrationId(): string {
  return crypto.randomUUID();
}

/**
 * Hashes an OTP with HMAC-SHA256 using OTP_SECRET.
 */
export function hashOtp(code: string): string {
  return crypto.createHmac("sha256", getOtpSecret()).update(code.trim()).digest("hex");
}

/**
 * Constant-time comparison of two hex hashes to prevent timing attacks.
 */
export function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const bufA = Buffer.from(a, "hex");
  const bufB = Buffer.from(b, "hex");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// ─────────────────────────────────────────────────────────────────────────────
// Database & Persistence Adapters
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates or overwrites a pending registration record.
 */
export async function createPendingRegistration({
  registrationId,
  email,
  password,
  candidateDetails,
  otpCode,
  ip,
}: {
  registrationId: string;
  email: string;
  password: string;
  candidateDetails: CandidateRegistrationDetails;
  otpCode: string;
  ip?: string;
}): Promise<{ success: boolean; error?: string; cooldownRemaining?: number }> {
  const cleanEmail = email.trim().toLowerCase();
  const now = new Date();
  const nowMs = now.getTime();

  // 1. Check existing pending registration for rate limits / cooldown
  const existing = await getPendingRegistrationByEmail(cleanEmail);
  if (existing && existing.status === "pending") {
    const lastSentMs = new Date(existing.lastOtpSentAt).getTime();
    const elapsedMs = nowMs - lastSentMs;

    if (elapsedMs < RESEND_COOLDOWN_MS) {
      const remainingSec = Math.ceil((RESEND_COOLDOWN_MS - elapsedMs) / 1000);
      return {
        success: false,
        cooldownRemaining: remainingSec,
        error: `Please wait ${remainingSec} seconds before requesting a new verification code.`,
      };
    }

    // Check hourly limit
    const oneHourAgo = nowMs - 60 * 60 * 1000;
    const createdAtMs = new Date(existing.createdAt).getTime();
    if (createdAtMs > oneHourAgo && existing.resendCount >= MAX_RESENDS_PER_HOUR) {
      return {
        success: false,
        error: "Maximum verification code requests exceeded for this hour. Please try again later.",
      };
    }
  }

  const resendCount = existing && existing.status === "pending" ? existing.resendCount + 1 : 0;
  const encryptedPassword = encryptCredential(password);
  const otpHash = hashOtp(otpCode);
  const expiresAt = new Date(nowMs + OTP_EXPIRY_MS).toISOString();

  const record: PendingRegistrationRecord = {
    registrationId,
    email: cleanEmail,
    encryptedPassword,
    candidateDetails,
    otpHash,
    attemptsRemaining: MAX_VERIFY_ATTEMPTS,
    resendCount,
    lastOtpSentAt: now.toISOString(),
    expiresAt,
    createdAt: now.toISOString(),
    status: "pending",
    ip,
  };

  // 2. Mandatory Persistent Database Storage (user_otp_codes)
  // Delete any old pending signup records for this email first
  const { error: delErr } = await supabaseAdmin
    .from("user_otp_codes")
    .delete()
    .eq("email", cleanEmail)
    .eq("otp_type", "signup");

  if (delErr) {
    console.warn("[PendingRegistration] Warning deleting prior pending signup:", delErr.message);
  }

  const { error: insertErr } = await supabaseAdmin.from("user_otp_codes").insert({
    id: registrationId,
    email: cleanEmail,
    otp_type: "signup",
    otp_hash: otpHash,
    attempts: 0,
    metadata: {
      registration_id: registrationId,
      encrypted_password: encryptedPassword,
      candidate_details: candidateDetails,
      resend_count: resendCount,
      last_otp_sent_at: record.lastOtpSentAt,
      status: "pending",
      ip,
    },
    expires_at: expiresAt,
    created_at: now.toISOString(),
  });

  if (insertErr) {
    console.error("[PendingRegistration] Mandatory database persistence failed:", insertErr.message);
    return {
      success: false,
      error: "Database persistence error while creating pending registration. Please try again.",
    };
  }

  return { success: true };
}

/**
 * Retrieves an active pending registration record by registrationId or email.
 */
export async function getPendingRegistration(
  identifier: string
): Promise<PendingRegistrationRecord | null> {
  const cleanId = identifier.trim().toLowerCase();

  // 1. Try DB lookup by ID or Email
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanId);
    let query = supabaseAdmin
      .from("user_otp_codes")
      .select("*")
      .eq("otp_type", "signup");

    if (isUuid) {
      query = query.eq("id", cleanId);
    } else {
      query = query.eq("email", cleanId);
    }

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data && data.metadata) {
      const meta = data.metadata;
      return {
        registrationId: data.id,
        email: data.email,
        encryptedPassword: meta.encrypted_password,
        candidateDetails: meta.candidate_details,
        otpHash: data.otp_hash,
        attemptsRemaining: Math.max(0, MAX_VERIFY_ATTEMPTS - (data.attempts || 0)),
        resendCount: meta.resend_count || 0,
        lastOtpSentAt: meta.last_otp_sent_at || data.created_at,
        expiresAt: data.expires_at,
        createdAt: data.created_at,
        status: meta.status || "pending",
        ip: meta.ip,
      };
    }
  } catch (err: any) {
    console.error("[PendingRegistration] Database query exception:", err.message);
  }

  // Persistent database is the sole authoritative source of truth.
  return null;
}

export async function getPendingRegistrationByEmail(
  email: string
): Promise<PendingRegistrationRecord | null> {
  return getPendingRegistration(email);
}

/**
 * Validates candidate OTP and enforces single-use atomic consumption.
 */
export async function verifyPendingRegistrationOtp({
  registrationId,
  email,
  code,
}: {
  registrationId?: string;
  email: string;
  code: string;
}): Promise<{
  success: boolean;
  error?: string;
  record?: PendingRegistrationRecord;
  decryptedPassword?: string;
  isExpired?: boolean;
  isMaxAttempts?: boolean;
}> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanCode = code.trim();

  if (!cleanCode || cleanCode.length !== 6) {
    return { success: false, error: "Please enter the complete 6-digit verification code." };
  }

  // Lookup record
  const record = registrationId
    ? await getPendingRegistration(registrationId)
    : await getPendingRegistration(cleanEmail);

  if (!record || record.email !== cleanEmail) {
    return {
      success: false,
      isExpired: true,
      error: "Registration session has expired or does not exist. Please submit registration again.",
    };
  }

  if (record.status !== "pending") {
    return {
      success: false,
      error: "This registration verification code has already been used. Please log in.",
    };
  }

  // Verify expiration
  if (new Date(record.expiresAt).getTime() <= Date.now()) {
    record.status = "expired";
    await consumePendingRegistration(record.registrationId, "expired");
    return {
      success: false,
      isExpired: true,
      error: "Verification code has expired. Please request a new code.",
    };
  }

  // Verify attempts
  if (record.attemptsRemaining <= 0) {
    record.status = "expired";
    await consumePendingRegistration(record.registrationId, "expired");
    return {
      success: false,
      isMaxAttempts: true,
      error: "Too many failed attempts. This code has been invalidated. Please request a new code.",
    };
  }

  // Validate OTP hash
  const candidateHash = hashOtp(cleanCode);
  const isMatch = timingSafeEqualHex(record.otpHash, candidateHash);

  if (!isMatch) {
    const nextAttempts = MAX_VERIFY_ATTEMPTS - record.attemptsRemaining + 1;
    const remaining = Math.max(0, MAX_VERIFY_ATTEMPTS - nextAttempts);

    // Update attempts in DB & memory
    try {
      await supabaseAdmin
        .from("user_otp_codes")
        .update({ attempts: nextAttempts })
        .eq("id", record.registrationId);
    } catch {}

    record.attemptsRemaining = remaining;
    if (remaining <= 0) {
      await consumePendingRegistration(record.registrationId, "expired");
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

  // OTP Match confirmed! Decrypt password
  let decryptedPassword = "";
  try {
    decryptedPassword = decryptCredential(record.encryptedPassword);
  } catch (err) {
    return {
      success: false,
      error: "Security error during credential decryption. Please try registering again.",
    };
  }

  // Atomically mark as verified/consumed to prevent replay
  await consumePendingRegistration(record.registrationId, "consumed");

  return {
    success: true,
    record,
    decryptedPassword,
  };
}

/**
 * Consumes or deletes a pending registration to ensure single-use enforcement.
 */
export async function consumePendingRegistration(
  registrationId: string,
  _finalStatus: "consumed" | "expired" = "consumed"
): Promise<void> {
  try {
    await supabaseAdmin
      .from("user_otp_codes")
      .delete()
      .eq("id", registrationId);
  } catch {}
}
