/**
 * Authentication and input validation utilities for CUETMate
 */

export interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  // RFC 5322 compliant regex for standard email format
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim().toLowerCase());
}

export function getPasswordRequirements(password: string): PasswordRequirements {
  const pwd = password || "";
  return {
    minLength: pwd.length >= 8,
    hasUppercase: /[A-Z]/.test(pwd),
    hasLowercase: /[a-z]/.test(pwd),
    hasNumber: /[0-9]/.test(pwd),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
  };
}

export function isPasswordValid(password: string): boolean {
  const reqs = getPasswordRequirements(password);
  // Must satisfy at least minLength, plus uppercase, lowercase, and number
  return reqs.minLength && reqs.hasUppercase && reqs.hasLowercase && reqs.hasNumber;
}

/**
 * Masks an email address for safe public/semi-public display.
 * e.g., "aryannegiofficial@gmail.com" -> "a*********l@gmail.com"
 * e.g., "pupadhayay089@gmail.com" -> "p************9@gmail.com"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "your email";
  const parts = email.trim().toLowerCase().split("@");
  const localPart = parts[0] || "";
  const domainPart = parts[1] || "";
  if (!localPart || !domainPart) return "your email";

  if (localPart.length <= 2) {
    return `${localPart[0]}*@${domainPart}`;
  }

  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const maskedMiddle = "*".repeat(Math.min(localPart.length - 2, 6));

  return `${firstChar}${maskedMiddle}${lastChar}@${domainPart}`;
}

/**
 * Cleans and extracts digits from any pasted or typed OTP string.
 */
export function sanitizeOtp(raw: string): string {
  if (!raw) return "";
  return raw.replace(/[^0-9]/g, "").slice(0, 6);
}
