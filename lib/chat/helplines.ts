/**
 * Tele-MANAS and National Mental Health Helplines (India)
 * Used when a candidate expresses severe exam stress, anxiety, despair, or crisis.
 */

export interface HelplineInfo {
  name: string;
  numbers: string[];
  hours: string;
  description: string;
  authority: string;
}

export const NATIONAL_HELPLINES: HelplineInfo[] = [
  {
    name: "Tele-MANAS (National Tele-Mental Health Programme)",
    numbers: ["14416", "1800-891-4416"],
    hours: "24x7, Free & Confidential",
    description: "Government of India 24/7 mental health counseling across 20+ languages.",
    authority: "Ministry of Health & Family Welfare, Govt. of India",
  },
  {
    name: "Kiran Mental Health Helpline",
    numbers: ["1800-599-0019"],
    hours: "24x7, Toll-Free",
    description: "Professional psychological support and crisis management in 13 Indian languages.",
    authority: "Department of Empowerment of Persons with Disabilities, Govt. of India",
  },
  {
    name: "Vandrevala Foundation Helpline",
    numbers: ["+91 9999 666 555", "1860-2662-345"],
    hours: "24x7, Free Counseling",
    description: "Trained clinical psychologists and counselors for student emotional well-being.",
    authority: "Vandrevala Foundation",
  },
];

export const CRISIS_DETECTION_KEYWORDS = [
  "kill myself",
  "suicide",
  "end my life",
  "end it all",
  "life is over",
  "want to die",
  "better off dead",
  "harm myself",
  "self harm",
  "no reason to live",
  "cannot go on",
  "can't live like this",
  "cutting myself",
  "hang myself",
  "jump off",
  "jumping off",
];

export function isCrisisMessage(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_DETECTION_KEYWORDS.some((kw) => lower.includes(kw));
}

export function formatCrisisResponse(): string {
  return (
    `I hear how overwhelmed and exhausted you are feeling right now, and I want you to know that your life and well-being are infinitely more important than any exam or score.\n\n` +
    `Please speak with someone who can support you right now. Compassionate, professional help is completely free, anonymous, and available 24/7:\n\n` +
    `• **Tele-MANAS (Govt. of India)**: Call **14416** or **1800-891-4416** (Toll-free, 24x7, available in all Indian languages)\n` +
    `• **Kiran National Helpline**: Call **1800-599-0019** (24x7 Toll-free)\n` +
    `• **Vandrevala Foundation**: Call **+91 9999 666 555** (24x7 free mental health counseling)\n\n` +
    `Please reach out to one of these numbers, or talk to a parent, teacher, or trusted friend right now. You do not have to carry this alone.`
  );
}
