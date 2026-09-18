export interface GeneratedQuestion {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic_tested: string;
  confidence_score: number;
  context_quality: string;
  flags: string[];
}

export interface ValidationResult {
  isValid: boolean;
  issues: string[];
  autoApprove: boolean;
  score: number;
}

export function validateGeneratedQuestion(
  q: GeneratedQuestion
): ValidationResult {
  const issues: string[] = [];
  let score = 100;

  // ─── Check 1: All fields present ─────────────────
  const required = [
    'question',
    'option_a',
    'option_b',
    'option_c',
    'option_d',
    'correct_option',
    'explanation',
  ];

  for (const field of required) {
    if (!q[field as keyof GeneratedQuestion]) {
      issues.push(`Missing field: ${field}`);
      score -= 20;
    }
  }

  // ─── Check 2: Question length ─────────────────────
  if (q.question && q.question.length < 20) {
    issues.push('Question too short (< 20 chars)');
    score -= 15;
  }

  if (q.question && q.question.length > 500) {
    issues.push('Question too long (> 500 chars)');
    score -= 10;
  }

  // ─── Check 3: Options are distinct ───────────────
  const options = [q.option_a, q.option_b, q.option_c, q.option_d];
  const uniqueOptions = new Set(options.filter(Boolean));

  if (uniqueOptions.size < 4) {
    issues.push('Duplicate options detected');
    score -= 25;
  }

  // ─── Check 4: Valid correct option ────────────────
  if (!['A', 'B', 'C', 'D'].includes(q.correct_option)) {
    issues.push('Invalid correct_option (must be A/B/C/D)');
    score -= 30;
  }

  // ─── Check 5: Explanation references answer ───────
  if (q.explanation && q.explanation.length < 30) {
    issues.push('Explanation too short');
    score -= 10;
  }

  // ─── Check 6: AI confidence ───────────────────────
  if (typeof q.confidence_score !== 'number' || q.confidence_score < 0.7) {
    issues.push('Low AI confidence score');
    score -= 20;
  }

  // ─── Check 7: Flags from AI itself ────────────────
  if (q.flags && q.flags.includes('fact_not_in_context')) {
    issues.push('AI used external knowledge (hallucination risk)');
    score -= 40;
  }

  // ─── Check 8: Options not too similar in length ───
  const optionLengths = options.map((o) => o?.length || 0);
  const maxLen = Math.max(...optionLengths);
  const minLen = Math.min(...optionLengths);

  if (minLen > 0 && maxLen > minLen * 4) {
    issues.push('Options have very unequal lengths (answer obvious)');
    score -= 10;
  }

  // ─── Check 9: Red flag words ──────────────────────
  const redFlags = [
    "i don't know",
    'cannot determine',
    'not enough information',
    "context doesn't mention",
  ];

  for (const flag of redFlags) {
    if (
      q.question?.toLowerCase().includes(flag) ||
      q.explanation?.toLowerCase().includes(flag)
    ) {
      issues.push(`Red flag phrase detected: "${flag}"`);
      score -= 30;
    }
  }

  const isValid = score >= 60 && issues.length < 3;
  const autoApprove = score >= 85 && issues.length === 0;

  return { isValid, issues, autoApprove, score };
}
