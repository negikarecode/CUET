/**
 * Lightweight Profanity Filter for Student Progress Card Notes
 * Sanitizes input and enforces a strict 60-character ceiling.
 */

const BLOCKED_WORDS = [
  "abuse",
  "asshole",
  "bastard",
  "bitch",
  "bullshit",
  "crap",
  "damn",
  "dick",
  "fuck",
  "idiot",
  "piss",
  "prick",
  "retard",
  "scam",
  "shit",
  "slut",
  "stupid",
  "whore",
  "chutiya",
  "bhosdi",
  "madarchod",
  "behenchod",
  "gandu",
  "harami",
  "saala",
];

const BLOCKED_REGEX = new RegExp(
  `\\b(${BLOCKED_WORDS.join("|")})\\b`,
  "gi"
);

/**
 * Filters profanity from user input and enforces 60 character ceiling
 */
export function filterStudentNote(input?: string | null): string | null {
  if (!input || typeof input !== "string") return null;

  let trimmed = input.trim();
  if (trimmed.length === 0) return null;

  // Max 60 characters
  trimmed = trimmed.slice(0, 60);

  // Replace profanity matches with asterisks
  const sanitized = trimmed.replace(BLOCKED_REGEX, (match) => "*".repeat(match.length));

  return sanitized.trim() || null;
}
