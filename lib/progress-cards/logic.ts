import crypto from "crypto";
import { AICoachStoredReport } from "@/types/ai-coach";
import {
  ProgressCardCalculationResult,
  ProgressCardFrozenData,
  ProgressCardHighlight,
} from "./types";
import { filterStudentNote } from "./profanity";

/**
 * Generates an 8-character URL-safe random alphanumeric ID for public progress cards
 * Example: "c_k8m2p9x4"
 */
export function generateShortCardId(): string {
  const bytes = crypto.randomBytes(6);
  // Base64url alphanumeric clean replacement
  const clean = bytes
    .toString("base64")
    .replace(/\+/g, "k")
    .replace(/\//g, "m")
    .replace(/=/g, "")
    .toLowerCase()
    .slice(0, 8);
  return `c_${clean}`;
}

/**
 * Computes deterministic progress card data between two AI reports for the same subject.
 * Rules:
 * - gain = accuracy now minus accuracy before.
 * - Pick the top 2 topic improvements (both periods must have 5+ attempts and delta must be positive),
 *   plus negative-marks reduction if it improved. Cap highlights at 3.
 * - If accuracy dropped and there are no highlights, don't create a card.
 * - If accuracy dropped but another win exists, show the wins and hide the negative delta.
 *   Never show a negative card.
 * - Optional milestone badge (e.g. "500 questions", "12-day streak").
 * - Optional student note, max 60 chars, profanity-filtered.
 * - Anonymous by default. First name or nickname only, opt-in.
 */
export function calculateProgressCardData(params: {
  olderReport: AICoachStoredReport;
  newerReport: AICoachStoredReport;
  displayName?: string | null;
  studentNote?: string | null;
  milestoneBadge?: string | null;
}): ProgressCardCalculationResult {
  const { olderReport, newerReport, displayName, studentNote, milestoneBadge } = params;

  // 1. Subject match verification
  if (olderReport.subject.toLowerCase() !== newerReport.subject.toLowerCase()) {
    return {
      eligible: false,
      reason: "Both evaluations must be in the same subject.",
    };
  }

  const fromAccuracy = olderReport.stats_json.overallAccuracyPercentage;
  const toAccuracy = newerReport.stats_json.overallAccuracyPercentage;
  const accuracyDelta = toAccuracy - fromAccuracy;

  const fromNet = olderReport.stats_json.netScore;
  const toNet = newerReport.stats_json.netScore;
  const netScoreDelta = toNet - fromNet;

  const fromPenalties = olderReport.stats_json.negativeMarksLost;
  const toPenalties = newerReport.stats_json.negativeMarksLost;
  const negativeMarksReduction = fromPenalties - toPenalties; // Positive if penalties dropped

  // 2. Identify top topic improvements
  // Both periods must have 5+ attempts and delta must be positive
  const olderTopicsMap = new Map<string, { attempted: number; accuracy: number }>();
  (olderReport.stats_json.topicBreakdown || []).forEach((t) => {
    olderTopicsMap.set(t.topic.toLowerCase(), {
      attempted: t.attempted,
      accuracy: t.accuracyPercentage,
    });
  });

  const topicImprovements: Array<{
    topic: string;
    fromAcc: number;
    toAcc: number;
    delta: number;
    toAttempts: number;
  }> = [];

  (newerReport.stats_json.topicBreakdown || []).forEach((newTopic) => {
    const oldTopic = olderTopicsMap.get(newTopic.topic.toLowerCase());
    if (oldTopic) {
      if (oldTopic.attempted >= 5 && newTopic.attempted >= 5) {
        const delta = newTopic.accuracyPercentage - oldTopic.accuracy;
        if (delta > 0) {
          topicImprovements.push({
            topic: newTopic.topic,
            fromAcc: oldTopic.accuracy,
            toAcc: newTopic.accuracyPercentage,
            delta,
            toAttempts: newTopic.attempted,
          });
        }
      }
    }
  });

  // Sort by highest delta first
  topicImprovements.sort((a, b) => b.delta - a.delta);

  // 3. Assemble highlights (Cap at 3)
  const highlights: ProgressCardHighlight[] = [];

  // Top 2 topic improvements
  const topTopics = topicImprovements.slice(0, 2);
  topTopics.forEach((t) => {
    highlights.push({
      title: `${t.topic} Mastery`,
      detail: `${t.fromAcc}% → ${t.toAcc}% (+${t.delta}%)`,
    });
  });

  // Negative marks reduction highlight if improved
  if (negativeMarksReduction > 0 && highlights.length < 3) {
    highlights.push({
      title: "Negative Marks Contained",
      detail: `Saved ${negativeMarksReduction} marks (-${fromPenalties} → -${toPenalties})`,
    });
  }

  // If we still have capacity and more topic improvements exist, add 3rd topic
  if (highlights.length < 3 && topicImprovements.length > 2) {
    const third = topicImprovements[2];
    if (third) {
      highlights.push({
        title: `${third.topic} Progress`,
        detail: `${third.fromAcc}% → ${third.toAcc}% (+${third.delta}%)`,
      });
    }
  }

  // If net score significantly improved and we have room
  if (highlights.length < 3 && netScoreDelta > 0) {
    highlights.push({
      title: "Net CUET Score Growth",
      detail: `+${netScoreDelta} marks gained in ${newerReport.subject}`,
    });
  }

  // 4. Verification rule on negative/drop:
  // "If accuracy dropped and there are no highlights, don't create a card."
  // "If accuracy dropped but another win exists, show the wins and hide the negative delta. Never show a negative card."
  if (accuracyDelta <= 0 && highlights.length === 0) {
    return {
      eligible: false,
      reason: "No significant accuracy or topic gains recorded yet between these two reports.",
    };
  }

  // If accuracy dropped but other wins exist, hide the negative delta
  const showAccuracyGain = accuracyDelta > 0;

  // Sanitize student note (max 60 chars, profanity filtered)
  const sanitizedNote = filterStudentNote(studentNote);

  // Opt-in display name: if provided, keep first name / nickname; otherwise null (anonymous by default)
  let cleanDisplayName: string | null = null;
  if (displayName && typeof displayName === "string" && displayName.trim().length > 0) {
    cleanDisplayName = displayName.trim().slice(0, 30);
  }

  const frozenData: ProgressCardFrozenData = {
    subject: newerReport.subject,
    fromReportId: olderReport.id,
    toReportId: newerReport.id,
    fromDate: olderReport.created_at,
    toDate: newerReport.created_at,
    fromAccuracy,
    toAccuracy,
    accuracyDelta,
    showAccuracyGain,
    fromNetScore: fromNet,
    toNetScore: toNet,
    netScoreDelta,
    negativeMarksReduction,
    highlights: highlights.slice(0, 3),
    milestoneBadge: milestoneBadge || null,
    studentNote: sanitizedNote,
    displayName: cleanDisplayName,
    totalQuestionsAnalyzed: newerReport.questions_analyzed,
    examTarget: "CUET UG 2027",
  };

  return {
    eligible: true,
    cardData: frozenData,
  };
}
