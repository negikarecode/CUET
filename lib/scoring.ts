/**
 * Dedicated authoritative scoring engine for CBT test sessions.
 * Strictly pairs client submission entries against authoritative questions.
 * Priority: Matches by question ID first; number only as a fallback.
 * Never reads client correctOption or isCorrect.
 */

export interface ScoredQuestionResult {
  authQuestion: any;
  clientQuestion: any;
  selectedOption: "A" | "B" | "C" | "D" | null;
  expectedOption: "A" | "B" | "C" | "D";
  isCorrect: boolean;
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
    const authExpectedKey = (
      authQ.correctOptionId ||
      authQ.correct_option ||
      ""
    )
      .toString()
      .trim()
      .toUpperCase() as "A" | "B" | "C" | "D";

    // Never read client correctOption or isCorrect - derive solely from selectedOption vs authoritative key
    const rawOpt =
      typeof clientQ.selectedOption === "string"
        ? clientQ.selectedOption.trim().toUpperCase()
        : null;
    const validOpt =
      rawOpt && ["A", "B", "C", "D"].includes(rawOpt)
        ? (rawOpt as "A" | "B" | "C" | "D")
        : null;
    const isCorrect = Boolean(validOpt && validOpt === authExpectedKey);

    scoredSet.push({
      authQuestion: authQ,
      clientQuestion: clientQ,
      selectedOption: validOpt,
      expectedOption: authExpectedKey,
      isCorrect,
      timeSpentSeconds: Math.max(0, clientQ.timeSpentSeconds || 0),
    });
  }

  return scoredSet;
}
