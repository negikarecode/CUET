/**
 * Dedicated authoritative scoring engine for CBT test sessions.
 * Strictly pairs client submission entries against authoritative questions.
 * Priority: Matches by question ID first; number only as a fallback.
 * Never reads client correctOption or isCorrect.
 */

/**
 * Checks whether an authoritative question has an unresolved answer status.
 * Unresolved questions must never be arbitrarily scored against a placeholder.
 */
export function isQuestionUnresolved(q: any): boolean {
  if (!q) return false;
  if (q.isPublishable === false) return true;
  if (q.needs_human_review === true) return true;
  const status = String(
    q.official_answer_status ||
    q.status ||
    q.verificationStatus ||
    q.answer_source ||
    q.provenance ||
    ""
  ).toLowerCase();
  if (
    status === "unresolved" ||
    status === "unresolved_needs_expert" ||
    status === "needs_human_review" ||
    status === "pending_subject_verification"
  ) {
    return true;
  }
  const key = String(q.correctOption || q.correctOptionId || q.correct_option || "").toUpperCase();
  if (key === "UNRESOLVED") return true;

  if (Array.isArray(q.options)) {
    for (const opt of q.options) {
      const text = typeof opt === "string" ? opt : (opt?.text || "");
      if (text.includes("Pending Subject Verification") || text.includes("Pending Verification")) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Strict publication eligibility check ensuring that no broken, quarantined,
 * unresolved, duplicate-option, corrupted stem, or synthetic boilerplate
 * questions can enter candidate-facing CBT tests.
 */
export function isQuestionEligibleForActiveCBT(q: any): boolean {
  if (!q) return false;
  if (isQuestionUnresolved(q)) return false;

  const stem = String(q.questionText || q.prompt || "").trim();
  if (stem.length < 15 && !q.is_authentic_short_stem) return false;
  if (stem.includes("sss 85858")) return false;
  if (/\b(at the time of|along wit|Particul)\s*$/i.test(stem)) return false;

  if (!Array.isArray(q.options) || q.options.length !== 4) return false;

  const optTexts = q.options.map((opt: any) =>
    (typeof opt === "string" ? opt : (opt?.text || "")).trim()
  );
  if (optTexts.some((t: string) => !t)) return false;
  if (optTexts.some((t: string) => t.includes("Pending Subject Verification") || t.includes("Pending Verification"))) return false;
  if (optTexts.some((t: string) => /^Option\s+[ABCD]$/i.test(t))) return false;

  if (!q.is_authentic_paper_duplicate && new Set(optTexts).size !== 4) return false;

  const correctKey = resolveQuestionCorrectOptionId(q);
  const isDropped = isQuestionDropped(q);
  if (!correctKey && !isDropped) return false;

  const sol = String(q.detailedSolution || q.solution?.detailed || q.explanation || "");
  if (
    sol.includes("Option A is consistent with the canonical curriculum") ||
    sol.includes("Analyze the stem and evaluate the criteria established in")
  ) {
    return false;
  }

  return true;
}

/**
 * Safely resolves the correct option key ("A" | "B" | "C" | "D") from any
 * question representation (correctOptionId, correct_option, correctOption, or options.isCorrect).
 * Strictly returns null for unresolved questions to prevent placeholder leaks.
 */
export function resolveQuestionCorrectOptionId(
  q: any
): "A" | "B" | "C" | "D" | null {
  if (!q) return null;
  if (isQuestionUnresolved(q)) return null;
  const direct =
    q.correctOptionId ||
    q.correctOption ||
    q.correct_option;
  if (direct && typeof direct === "string" && direct.trim()) {
    const upper = direct.trim().toUpperCase();
    if (["A", "B", "C", "D"].includes(upper)) {
      return upper as "A" | "B" | "C" | "D";
    }
  }
  if (Array.isArray(q.options)) {
    const correctOpt = q.options.find((o: any) => o?.isCorrect === true);
    if (correctOpt?.id && typeof correctOpt.id === "string") {
      const upper = correctOpt.id.trim().toUpperCase();
      if (["A", "B", "C", "D"].includes(upper)) {
        return upper as "A" | "B" | "C" | "D";
      }
    }
  }
  return null;
}

/**
 * Checks whether an authoritative question is officially dropped under NTA exam rules.
 */
export function isQuestionDropped(q: any): boolean {
  if (!q) return false;
  if (q.isDropped === true) return true;
  const status = String(q.official_answer_status || q.status || q.answer_status || "").toLowerCase();
  if (status === "officially_dropped" || status === "dropped") return true;
  const key = String(q.correctOption || q.correctOptionId || q.correct_option || "").toUpperCase();
  if (key === "DROPPED") return true;
  return false;
}

/**
 * Safely resolves all accepted option keys (e.g. for multi-correct or dropped questions).
 */
export function getQuestionAcceptedOptions(q: any): Array<"A" | "B" | "C" | "D"> {
  if (!q) return [];
  const rawAccepted = q.acceptedAnswers || q.accepted_answers || q.acceptedOptions;
  if (Array.isArray(rawAccepted)) {
    const list = rawAccepted
      .map((k: any) => String(k).trim().toUpperCase())
      .filter((k: string) => ["A", "B", "C", "D"].includes(k)) as Array<"A" | "B" | "C" | "D">;
    if (list.length > 0) return list;
  }
  const optStr = String(q.correctOption || q.correctOptionId || q.correct_option || "").trim();
  if (optStr.includes(",") || optStr.includes("/")) {
    return optStr
      .split(/[,/]/)
      .map((k) => k.trim().toUpperCase())
      .filter((k) => ["A", "B", "C", "D"].includes(k)) as Array<"A" | "B" | "C" | "D">;
  }
  const single = resolveQuestionCorrectOptionId(q);
  return single ? [single] : [];
}

export interface ScoredQuestionResult {
  authQuestion: any;
  clientQuestion: any;
  selectedOption: "A" | "B" | "C" | "D" | null;
  expectedOption: "A" | "B" | "C" | "D" | "DROPPED" | "UNRESOLVED";
  isCorrect: boolean;
  isDropped?: boolean;
  isMultipleCorrect?: boolean;
  isUnresolved?: boolean;
  acceptedOptions?: Array<"A" | "B" | "C" | "D">;
  timeSpentSeconds: number;
}

/**
 * Builds the scored set by iterating the AUTHORITATIVE questions,
 * matching at most one client entry per question (first wins), ignoring extras.
 * Priority: Matches by question ID first across all questions, with question number only as a fallback.
 * Never reads client correctOption or isCorrect.
 */
export function buildScoredSet(
  authoritativeQuestions: any[],
  clientQuestions: any[]
): ScoredQuestionResult[] {
  if (!Array.isArray(authoritativeQuestions) || authoritativeQuestions.length === 0) {
    return [];
  }
  if (!Array.isArray(clientQuestions) || clientQuestions.length === 0) {
    return [];
  }

  const scoredSet: ScoredQuestionResult[] = [];
  const matchedClientIndices = new Set<number>();
  const authMatchedClientIdx: number[] = new Array(authoritativeQuestions.length).fill(-1);

  // PASS 1: Match by Question ID first across all authoritative questions
  for (let aIdx = 0; aIdx < authoritativeQuestions.length; aIdx++) {
    const authQ = authoritativeQuestions[aIdx];
    const authId = authQ.id ? String(authQ.id).trim() : "";
    const authQId = authQ.questionId ? String(authQ.questionId).trim() : "";

    if (!authId && !authQId) continue;

    for (let cIdx = 0; cIdx < clientQuestions.length; cIdx++) {
      if (matchedClientIndices.has(cIdx)) continue;
      const cq = clientQuestions[cIdx];
      if (!cq) continue;

      const cqId = cq.questionId
        ? String(cq.questionId).trim()
        : (cq as any).id
        ? String((cq as any).id).trim()
        : "";

      if (cqId && (cqId === authId || cqId === authQId)) {
        matchedClientIndices.add(cIdx);
        authMatchedClientIdx[aIdx] = cIdx;
        break; // First match wins for this authoritative question
      }
    }
  }

  // PASS 2: Fallback to Question Number only for unmatched authoritative questions
  for (let aIdx = 0; aIdx < authoritativeQuestions.length; aIdx++) {
    if (authMatchedClientIdx[aIdx] !== -1) continue;

    const authQ = authoritativeQuestions[aIdx];
    const authQNum =
      authQ.questionNumber !== undefined && authQ.questionNumber !== null
        ? Number(authQ.questionNumber)
        : aIdx + 1;

    for (let cIdx = 0; cIdx < clientQuestions.length; cIdx++) {
      if (matchedClientIndices.has(cIdx)) continue;
      const cq = clientQuestions[cIdx];
      if (!cq) continue;

      const cqNum =
        cq.questionNumber !== undefined && cq.questionNumber !== null
          ? Number(cq.questionNumber)
          : null;

      if (cqNum !== null && cqNum === authQNum) {
        matchedClientIndices.add(cIdx);
        authMatchedClientIdx[aIdx] = cIdx;
        break; // First match wins
      }
    }
  }

  // Build the scored results in authoritative question order
  for (let aIdx = 0; aIdx < authoritativeQuestions.length; aIdx++) {
    const matchedClientIdx = authMatchedClientIdx[aIdx];
    if (matchedClientIdx === -1 || matchedClientIdx === undefined) continue;

    const authQ = authoritativeQuestions[aIdx];
    const clientQ = clientQuestions[matchedClientIdx];
    const isDropped = isQuestionDropped(authQ);
    const isUnresolved = !isDropped && isQuestionUnresolved(authQ);
    const acceptedOptions = getQuestionAcceptedOptions(authQ);
    const isMultipleCorrect = !isDropped && !isUnresolved && acceptedOptions.length > 1;
    const authExpectedKey = (isDropped
      ? "DROPPED"
      : isUnresolved
      ? "UNRESOLVED"
      : (resolveQuestionCorrectOptionId(authQ) || (acceptedOptions[0] ?? ""))) as "A" | "B" | "C" | "D" | "DROPPED" | "UNRESOLVED";

    // Never read client correctOption or isCorrect - derive solely from selectedOption vs authoritative key
    const rawOpt =
      typeof clientQ.selectedOption === "string"
        ? clientQ.selectedOption.trim().toUpperCase()
        : null;
    const validOpt =
      rawOpt && ["A", "B", "C", "D"].includes(rawOpt)
        ? (rawOpt as "A" | "B" | "C" | "D")
        : null;

    // Official NTA Grading Scheme:
    // 1. Officially dropped question: candidate who selected ANY valid option receives +5 (full marks, 0 penalty)
    // 2. Unresolved / Review question: zero marks awarded and zero penalty (never score against an arbitrary placeholder)
    // 3. Multiple-correct options: candidate choice in acceptedOptions receives +5 (full marks), choice outside receives -1
    // 4. Unanswered question: 0 marks
    // 5. Standard question: correct option receives +5, wrong receives -1
    let isCorrect = false;
    if (validOpt) {
      if (isDropped) {
        isCorrect = true;
      } else if (isUnresolved) {
        isCorrect = false;
      } else if (isMultipleCorrect) {
        isCorrect = acceptedOptions.includes(validOpt);
      } else {
        isCorrect = Boolean(validOpt === authExpectedKey);
      }
    }

    scoredSet.push({
      authQuestion: authQ,
      clientQuestion: clientQ,
      selectedOption: validOpt,
      expectedOption: authExpectedKey,
      isCorrect,
      isDropped,
      isMultipleCorrect,
      isUnresolved,
      acceptedOptions: isMultipleCorrect ? acceptedOptions : undefined,
      timeSpentSeconds: Math.max(0, clientQ.timeSpentSeconds || 0),
    });
  }

  return scoredSet;
}
