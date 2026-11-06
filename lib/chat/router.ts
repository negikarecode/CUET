import { isCrisisMessage, formatCrisisResponse } from "./helplines";

export type MessageClassification =
  | "IN_SCOPE"
  | "OFF_SCOPE"
  | "PROMPT_INJECTION"
  | "CRISIS_DISTRESS";

export interface RouterDecision {
  classification: MessageClassification;
  immediateResponse?: string;
  reason?: string;
}

const INJECTION_PATTERNS = [
  /ignore (all |the )?(previous|prior|above) instructions/i,
  /ignore (above|these|all) rules/i,
  /disregard (all |the )?(previous|prior|above) instructions/i,
  /you are now in (dan|jailbreak|developer|unfiltered) mode/i,
  /bypass (all )?(guardrails|safety|restrictions)/i,
  /system prompt/i,
  /reveal your (hidden )?(prompt|tool definitions|system instructions|hidden rules)/i,
  /act as a (linux terminal|bash shell|python interpreter|unrestricted)/i,
  /print your (initial|system) (prompt|instructions)/i,
  /forget (you are|your role)/i,
  /unrestricted ai/i,
  /zero rules/i,
  /shell access/i,
];

const OFF_SCOPE_PATTERNS = [
  // Programming / coding requests
  /\b(write|create|debug|code in)\s+(a\s+)?(python|javascript|typescript|c\+\+|java|html|css|sql|rust|php|script)\b/i,
  /\b(react component|node\.js|dockerfile|kubernetes|git commit)\b/i,
  // Other exams outside CUET
  /\b(jee advanced|upsc civil services|neet pg|cat 202|gate cse|clat pg)\b/i,
  // Entertainment / gaming / sports / gossip / creative writing
  /\b(who won the|fifa|world cup|qatar|cricket ipl|football final)\b/i,
  /\bwrite an essay about\b/i,
  /\b(recipe for|cook chicken|chocolate chip cookies)\b/i,
  /\b(crypto|bitcoin|invest in)\b/i,
  /\b(minecraft|fortnite|gta|san andreas|cheat codes|playstation|xbox)\b/i,
  /\b(poker|texas hold'em|blackjack|casino)\b/i,
  /\b(write a (romantic )?poem|for my (girlfriend|boyfriend))\b/i,
  /\b(marvel|dc movies|avengers|batman)\b/i,
  // Politics
  /\b(who should i vote for|political party|election debate)\b/i,
];

export function classifyMessageFast(text: string): RouterDecision {
  const trimmed = text.trim();

  // 1. Critical Mental Health / Distress Check
  if (isCrisisMessage(trimmed)) {
    return {
      classification: "CRISIS_DISTRESS",
      immediateResponse: formatCrisisResponse(),
      reason: "Matched emergency mental health distress criteria.",
    };
  }

  // 2. Prompt Injection & Jailbreak Defense
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        classification: "PROMPT_INJECTION",
        immediateResponse:
          "I am your dedicated CUET UG Academic Coach, focused exclusively on helping you master your NCERT syllabus, CBT mocks, and college cutoffs. Let's redirect our attention back to your CUET preparation!",
        reason: "Matched prompt injection or system prompt extraction pattern.",
      };
    }
  }

  // 3. Clear Off-Scope Refusal
  for (const pattern of OFF_SCOPE_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        classification: "OFF_SCOPE",
        immediateResponse:
          "I am your dedicated CUET UG Academic Coach, so I specialize exclusively in CUET UG exam preparation, NCERT syllabus mastery, and college cutoffs. Let's get back on track for your CUET goals! Which subject or topic would you like to review today?",
        reason: "Matched off-scope query pattern.",
      };
    }
  }

  // Default to IN_SCOPE for academic coaching
  return {
    classification: "IN_SCOPE",
  };
}
