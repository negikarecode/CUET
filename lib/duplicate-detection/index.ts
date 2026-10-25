/**
 * CUET Global Duplicate Question Detection & Fingerprinting Engine
 * 
 * Implements 3-Level Duplicate Detection:
 * - Level A: Exact Duplicates (normalized stem + options string)
 * - Level B: Structural Duplicates (normalized stem + sorted substantive options set)
 * - Level C: Semantic Duplicates (token/shingle similarity & semantic equivalence)
 */

export interface DuplicateCheckOption {
  id?: string;
  text: string;
  isCorrect?: boolean;
}

export interface DuplicateCheckQuestion {
  questionNumber?: number;
  questionId?: string;
  questionText?: string;
  prompt?: string;
  options?: DuplicateCheckOption[];
  correctOption?: string;
  chapter?: string;
  topic?: string;
  keyConcept?: string;
}

export type DuplicateSimilarityLevel = "EXACT_A" | "STRUCTURAL_B" | "SEMANTIC_C" | "DISTINCT";

export interface DuplicateDetectionResult {
  isDuplicate: boolean;
  level: DuplicateSimilarityLevel;
  confidence: number; // 0.0 to 1.0
  reason: string;
}

/**
 * Normalizes question stem or option text:
 * - Strips artificial set/question prefixes: [Set 35.9], Set 35.9:, Q9., Question 9:, etc.
 * - Strips HTML tags and entities
 * - Strips option labels: (A), A., Option A:, etc.
 * - Standardizes Unicode, punctuation, and collapsed whitespace
 */
export function normalizeQuestionText(text?: string | null): string {
  if (!text || typeof text !== "string") return "";

  let cleaned = text.trim();

  // 1. Strip HTML entities and tags
  cleaned = cleaned.replace(/&nbsp;/gi, " ");
  cleaned = cleaned.replace(/&amp;/gi, " and ");
  cleaned = cleaned.replace(/&lt;/gi, "<");
  cleaned = cleaned.replace(/&gt;/gi, ">");
  cleaned = cleaned.replace(/&quot;/gi, '"');
  cleaned = cleaned.replace(/&#39;/gi, "'");
  cleaned = cleaned.replace(/&(?:mdash|ndash);/gi, "-");
  cleaned = cleaned.replace(/&/g, " and ");
  cleaned = cleaned.replace(/<[^>]+>/g, " ");

  // 2. Strip artificial generation prefixes: [Set 35.9], [Set X.Y], Set 35.9:, etc.
  cleaned = cleaned.replace(/^\s*\[Set\s+[^\]]+\]\s*/i, "");
  cleaned = cleaned.replace(/^\s*Set\s+[\d\.]+\s*[:\-]\s*/i, "");
  cleaned = cleaned.replace(/^\s*(?:Question|Q\.?)\s*\d+\s*[:\-]\s*/i, "");
  cleaned = cleaned.replace(/^\s*\(\s*(?:Question|Q\.?)\s*\d+\s*\)\s*[:\-]?\s*/i, "");
  cleaned = cleaned.replace(/^\s*\(?([A-D]|[1-4])\)?[\.\:\-]\s*/i, "");

  // 3. Strip trailing reference tokens like "(Reference token 123)", "(Case index 456)"
  cleaned = cleaned.replace(/\((?:Reference token|Case index|Context reference|Set Ref)[^)]*\)/gi, "");

  // 4. Unicode normalization
  cleaned = cleaned.normalize("NFKC");
  cleaned = cleaned.replace(/[\u2018\u2019\u201A\u201B]/g, "'");
  cleaned = cleaned.replace(/[\u201C\u201D\u201E\u201F]/g, '"');
  cleaned = cleaned.replace(/[\u2013\u2014]/g, "-");

  // 5. Lowercase and normalize whitespace
  cleaned = cleaned.toLowerCase();
  cleaned = cleaned.replace(/[^a-z0-9]/g, " ");
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  return cleaned;
}

/**
 * Normalizes option text, stripping leading option identifiers like "A)", "(A)", "A."
 */
export function normalizeOptionText(text?: string | null): string {
  if (!text || typeof text !== "string") return "";
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^\(?([A-D]|[1-4])\)?[\.\:\-\s]+/i, "");
  cleaned = cleaned.replace(/^Option\s+([A-D]|[1-4])\s*[\:\.\-]?\s*/i, "");
  return normalizeQuestionText(cleaned);
}

/**
 * Level A: Exact duplicate fingerprint.
 * Format: `<normalized_stem>|||<opt0>|<opt1>|<opt2>|<opt3>`
 */
export function getExactFingerprint(q: DuplicateCheckQuestion): string {
  const stem = normalizeQuestionText(q.questionText || q.prompt || "");
  const opts = (q.options || []).map((o) => normalizeOptionText(o.text)).join("|");
  return `${stem}|||${opts}`;
}

/**
 * Level B: Structural duplicate fingerprint.
 * Order-independent substantive option comparison.
 * Format: `<normalized_stem>|||<sorted_opt0>|<sorted_opt1>|<sorted_opt2>|<sorted_opt3>`
 */
export function getStructuralFingerprint(q: DuplicateCheckQuestion): string {
  const stem = normalizeQuestionText(q.questionText || q.prompt || "");
  const sortedOpts = (q.options || [])
    .map((o) => normalizeOptionText(o.text))
    .filter((t) => t.length > 0)
    .sort()
    .join("|");
  return `${stem}|||${sortedOpts}`;
}

/**
 * Extract tokens for Jaccard and n-gram shingling
 */
function tokenize(text: string): Set<string> {
  const words = text.split(" ").filter((w) => w.length > 1);
  return new Set(words);
}

/**
 * Extract numerical tokens from a string to distinguish parameterized math/science problems
 */
export function extractNumbers(text: string): string[] {
  const matches = text.match(/\b\d+(?:\.\d+)?\b/g);
  return matches ? matches : [];
}

/**
 * Computes Jaccard similarity between two token sets
 */
function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 && setB.size === 0) return 1.0;
  if (setA.size === 0 || setB.size === 0) return 0.0;

  let intersectionSize = 0;
  for (const item of setA) {
    if (setB.has(item)) intersectionSize++;
  }

  const unionSize = setA.size + setB.size - intersectionSize;
  return unionSize > 0 ? intersectionSize / unionSize : 0;
}

/**
 * Computes substantive options similarity (order-independent)
 */
function compareSubstantiveOptions(
  optsA: DuplicateCheckOption[] = [],
  optsB: DuplicateCheckOption[] = []
): number {
  if (optsA.length === 0 || optsB.length === 0) return 0.0;

  const normA = optsA.map((o) => normalizeOptionText(o.text)).filter(Boolean);
  const normB = optsB.map((o) => normalizeOptionText(o.text)).filter(Boolean);

  if (normA.length === 0 || normB.length === 0) return 0.0;

  let matches = 0;
  for (const a of normA) {
    if (normB.includes(a)) {
      matches++;
    } else {
      // Check partial match for slight phrasing differences
      const setA = tokenize(a);
      for (const b of normB) {
        const setB = tokenize(b);
        if (jaccardSimilarity(setA, setB) >= 0.85) {
          matches += 0.9;
          break;
        }
      }
    }
  }

  const maxOpts = Math.max(normA.length, normB.length);
  return Math.min(1.0, matches / maxOpts);
}

/**
 * Level C / Deep Duplicate Comparison:
 * Evaluates whether two questions are Exact, Structural, Semantic Duplicates,
 * or Legitimate Similar Questions (e.g. definition vs difference, or parameterized variations).
 */
export function compareQuestions(
  q1: DuplicateCheckQuestion,
  q2: DuplicateCheckQuestion
): DuplicateDetectionResult {
  // 1. Check Level A (Exact fingerprint)
  const fpA1 = getExactFingerprint(q1);
  const fpA2 = getExactFingerprint(q2);
  if (fpA1 && fpA1 === fpA2) {
    return {
      isDuplicate: true,
      level: "EXACT_A",
      confidence: 1.0,
      reason: "Normalized question stem and options in exact order are identical.",
    };
  }

  // 2. Check Level B (Structural fingerprint - shuffled options)
  const fpB1 = getStructuralFingerprint(q1);
  const fpB2 = getStructuralFingerprint(q2);
  if (fpB1 && fpB1 === fpB2) {
    return {
      isDuplicate: true,
      level: "STRUCTURAL_B",
      confidence: 0.99,
      reason: "Identical question stem with identical substantive options (shuffled).",
    };
  }

  // 3. Level C - Semantic & Lexical Analysis
  const stem1 = normalizeQuestionText(q1.questionText || q1.prompt || "");
  const stem2 = normalizeQuestionText(q2.questionText || q2.prompt || "");

  if (!stem1 || !stem2) {
    return {
      isDuplicate: false,
      level: "DISTINCT",
      confidence: 0.0,
      reason: "Empty question stem.",
    };
  }

  // Check numerical parameters: If numbers differ significantly, treat as parameterized variation
  const nums1 = extractNumbers(stem1);
  const nums2 = extractNumbers(stem2);
  if (nums1.length > 0 && nums2.length > 0 && nums1.join(",") !== nums2.join(",")) {
    // Different numerical problem parameters
    return {
      isDuplicate: false,
      level: "DISTINCT",
      confidence: 0.1,
      reason: "Parameterized numerical variation: distinct numerical values in stems.",
    };
  }

  // Check contrastive keywords: e.g. "differs from", "advantage vs disadvantage", "not", "except"
  const contrastKeywords = ["differ", "difference", "except", "not", "incorrect", "false", "advantage", "disadvantage"];
  const hasContrast1 = contrastKeywords.some((w) => stem1.includes(w));
  const hasContrast2 = contrastKeywords.some((w) => stem2.includes(w));
  if (hasContrast1 !== hasContrast2) {
    return {
      isDuplicate: false,
      level: "DISTINCT",
      confidence: 0.2,
      reason: "Contrasting cognitive focus: one question tests difference/negation while other does not.",
    };
  }

  const tokens1 = tokenize(stem1);
  const tokens2 = tokenize(stem2);
  const stemJaccard = jaccardSimilarity(tokens1, tokens2);
  const optionsSim = compareSubstantiveOptions(q1.options, q2.options);

  // Composite confidence
  const compositeScore = stemJaccard * 0.5 + optionsSim * 0.5;

  if ((optionsSim >= 0.95 && stemJaccard >= 0.50) || (stemJaccard >= 0.85 && optionsSim >= 0.85)) {
    return {
      isDuplicate: true,
      level: "SEMANTIC_C",
      confidence: Number(Math.max(0.9, compositeScore).toFixed(3)),
      reason: `High-confidence semantic duplicate: stem similarity ${(stemJaccard * 100).toFixed(1)}%, option similarity ${(optionsSim * 100).toFixed(1)}%.`,
    };
  }

  if (stemJaccard >= 0.70 && optionsSim >= 0.70) {
    return {
      isDuplicate: false, // Flag for review, not auto-quarantined
      level: "SEMANTIC_C",
      confidence: Number(compositeScore.toFixed(3)),
      reason: `Suspected semantic similarity requiring manual review: stem similarity ${(stemJaccard * 100).toFixed(1)}%, option similarity ${(optionsSim * 100).toFixed(1)}%.`,
    };
  }

  return {
    isDuplicate: false,
    level: "DISTINCT",
    confidence: Number(compositeScore.toFixed(3)),
    reason: "Distinct questions with differing substantive content or options.",
  };
}
