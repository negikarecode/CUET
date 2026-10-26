/**
 * Unit Test Suite: CUET Progress Cards (Phase 4)
 *
 * Verifies:
 * 1. Progress card accuracy delta calculation
 * 2. Top 2 topic improvements (both periods >= 5 attempts, delta > 0)
 * 3. Negative marks reduction highlight calculation (cap at 3 highlights)
 * 4. Negative card suppression (if accuracy dropped and 0 highlights -> ineligible;
 *    if accuracy dropped but other wins exist -> show wins, hide negative delta)
 * 5. Student note profanity filtering & 60-char ceiling
 * 6. Anonymous by default & opt-in display name
 * 7. Short random public ID generation format
 * 8. API endpoints & auth guards (401 on unauthenticated, 404 on private)
 */

import assert from "assert";
import { NextRequest } from "next/server";
import {
  calculateProgressCardData,
  generateShortCardId,
  isProgressCardSafeguardPassed,
} from "../lib/progress-cards/logic";
import { filterStudentNote } from "../lib/progress-cards/profanity";
import { GET, POST, PATCH, DELETE } from "../app/api/[...route]/route";
import { AICoachStoredReport } from "../types/ai-coach";

let passedCount = 0;
let failedCount = 0;

function runTest(name: string, fn: () => void) {
  try {
    fn();
    passedCount++;
    console.log(`  PASS: ${name}`);
  } catch (err: any) {
    failedCount++;
    console.error(`  FAIL: ${name} - ${err.message}`);
  }
}

async function runAsyncTest(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    passedCount++;
    console.log(`  PASS: ${name}`);
  } catch (err: any) {
    failedCount++;
    console.error(`  FAIL: ${name} - ${err.message}`);
  }
}

function createMockReport(overrides: Partial<AICoachStoredReport> = {}): AICoachStoredReport {
  return {
    id: overrides.id || "report-1",
    user_id: "user-test-1",
    subject: overrides.subject || "Physics",
    questions_analyzed: overrides.questions_analyzed || 150,
    created_at: overrides.created_at || "2026-10-01T10:00:00Z",
    model: "gemini-2.0-flash",
    prompt_version: "v1.0",
    score_snapshot: {
      netScore: overrides.stats_json?.netScore || 180,
      potentialScore: 250,
      accuracyPercentage: overrides.stats_json?.overallAccuracyPercentage || 54,
      negativeMarksLost: overrides.stats_json?.negativeMarksLost || 14,
    },
    stats_json: {
      subject: overrides.subject || "Physics",
      totalAttempts: 150,
      uniqueQuestionsAnalyzed: 150,
      overallAccuracyPercentage: overrides.stats_json?.overallAccuracyPercentage ?? 54,
      attemptRate: 90,
      netScore: overrides.stats_json?.netScore ?? 180,
      potentialScore: 250,
      negativeMarksLost: overrides.stats_json?.negativeMarksLost ?? 14,
      errorTypes: {
        carelessErrors: 10,
        conceptGaps: 12,
        confidenceGaps: 3,
      },
      rightToWrongChanges: 2,
      mockVsPyqGap: {
        mockAccuracy: 56,
        mockAttempts: 100,
        pyqAccuracy: 50,
        pyqAttempts: 50,
        accuracyDelta: 6,
      },
      recentTrend: {
        recentAccuracies: [50, 52, 54],
        trajectory: "improving",
      },
      topicBreakdown: overrides.stats_json?.topicBreakdown || [
        {
          topic: "Optics",
          attempted: 8,
          correct: 3,
          accuracyPercentage: 38,
          classification: "weak",
        },
        {
          topic: "Electrostatics",
          attempted: 10,
          correct: 6,
          accuracyPercentage: 60,
          classification: "weak",
        },
        {
          topic: "Magnetism",
          attempted: 3, // < 5 attempts
          correct: 1,
          accuracyPercentage: 33,
          classification: "insufficient data",
        },
      ],
      daysToExam: 200,
      ...overrides.stats_json,
    },
    report_json: {
      summary: "Diagnostic summary",
      biggest_leaks: [{ issue: "Optics formulas", evidence: "38% acc", fix: "Review lens law" }],
      strengths: ["Current Electricity"],
      weekly_plan: [{ day: "Day 1", focus: "Optics", task: "Solve 10 Qs", minutes: 30 }],
      test_taking_strategy: ["Pace calculations"],
      next_test_goal: "Hit 65% accuracy",
      comparison_with_previous: "First report",
      ...overrides.report_json,
    },
  };
}

async function main() {
  console.log("\n============================================================");
  console.log("UNIT TESTS: CUET Progress Cards Subsystem (Phase 4)");
  console.log("============================================================\n");

  // 1. Short Card ID Generation
  console.log("1. Short Card ID Generation:");
  runTest("generateShortCardId produces c_ prefix and 10-char format", () => {
    const id = generateShortCardId();
    assert.match(id, /^c_[a-z0-9]{8}$/);
    const id2 = generateShortCardId();
    assert.notStrictEqual(id, id2);
  });

  // 2. Profanity Filtering & Note Sanitation
  console.log("\n2. Student Note Profanity Filtering & Constraints:");
  runTest("Filters profanity cleanly with asterisks", () => {
    const dirty = "I kicked ass and defeated that idiot question!";
    const clean = filterStudentNote(dirty);
    assert.strictEqual(clean?.includes("idiot"), false);
    assert.ok(clean?.includes("*****"));
  });
  runTest("Enforces 60-character maximum ceiling", () => {
    const longNote = "This is an extremely long note that exceeds sixty characters easily in practice";
    const clean = filterStudentNote(longNote);
    assert.ok(clean);
    assert.ok(clean.length <= 60);
  });
  runTest("Returns null for empty or whitespace-only notes", () => {
    assert.strictEqual(filterStudentNote(""), null);
    assert.strictEqual(filterStudentNote("   "), null);
    assert.strictEqual(filterStudentNote(undefined), null);
  });

  // 3. Card Calculation: Positive Gain & Topic Improvements
  console.log("\n3. Card Calculation & Positive Highlights:");
  const report1 = createMockReport({
    id: "rep-1",
    created_at: "2026-10-01T10:00:00Z",
    stats_json: {
      overallAccuracyPercentage: 54,
      netScore: 180,
      negativeMarksLost: 14,
      topicBreakdown: [
        { topic: "Optics", attempted: 10, correct: 4, accuracyPercentage: 40, classification: "weak" },
        { topic: "Electrostatics", attempted: 12, correct: 6, accuracyPercentage: 50, classification: "weak" },
        { topic: "Modern Physics", attempted: 3, correct: 1, accuracyPercentage: 33, classification: "insufficient data" }, // < 5 Qs
      ],
    } as any,
  });

  const report2 = createMockReport({
    id: "rep-2",
    created_at: "2026-10-15T10:00:00Z",
    stats_json: {
      overallAccuracyPercentage: 71, // 54 -> 71 (+17)
      netScore: 235,                // +55
      negativeMarksLost: 5,         // 14 -> 5 (9 marks saved)
      topicBreakdown: [
        { topic: "Optics", attempted: 15, correct: 12, accuracyPercentage: 80, classification: "strong" }, // +40% (eligible)
        { topic: "Electrostatics", attempted: 14, correct: 10, accuracyPercentage: 71, classification: "strong" }, // +21% (eligible)
        { topic: "Modern Physics", attempted: 8, correct: 6, accuracyPercentage: 75, classification: "strong" }, // older was < 5!
      ],
    } as any,
  });

  const calc = calculateProgressCardData({
    olderReport: report1,
    newerReport: report2,
    displayName: "Aryan",
    studentNote: "Mastered ray optics and cut careless negatives!",
    milestoneBadge: "500+ Questions Solved",
  });

  runTest("Calculates positive accuracy gain (+17)", () => {
    assert.strictEqual(calc.eligible, true);
    assert.ok(calc.cardData);
    assert.strictEqual(calc.cardData.accuracyDelta, 17);
    assert.strictEqual(calc.cardData.fromAccuracy, 54);
    assert.strictEqual(calc.cardData.toAccuracy, 71);
    assert.strictEqual(calc.cardData.showAccuracyGain, true);
  });

  runTest("Selects top 2 topic improvements with 5+ attempts in both periods", () => {
    assert.ok(calc.cardData);
    const topicsInHighlights = calc.cardData.highlights.filter((h) => h.title.includes("Mastery") || h.title.includes("Progress"));
    assert.ok(topicsInHighlights.some((h) => h.title.includes("Optics")));
    assert.ok(topicsInHighlights.some((h) => h.title.includes("Electrostatics")));
    // Modern Physics had < 5 attempts in older report, so should NOT be in highlights
    assert.strictEqual(topicsInHighlights.some((h) => h.title.includes("Modern Physics")), false);
  });

  runTest("Includes negative marks reduction when improved", () => {
    assert.ok(calc.cardData);
    assert.strictEqual(calc.cardData.negativeMarksReduction, 9);
    const penHighlight = calc.cardData.highlights.find((h) => h.title.includes("Negative Marks"));
    assert.ok(penHighlight);
    assert.ok(penHighlight.detail.includes("Saved 9 marks"));
  });

  runTest("Caps total highlights at exactly 3", () => {
    assert.ok(calc.cardData);
    assert.ok(calc.cardData.highlights.length <= 3);
  });

  // 4. Negative Card Suppression
  console.log("\n4. Negative Card Suppression & Fallback:");
  // Scenario A: Accuracy dropped and no highlights -> Don't create card
  const droppingReportNoWins = createMockReport({
    id: "rep-drop-1",
    created_at: "2026-10-20T10:00:00Z",
    stats_json: {
      overallAccuracyPercentage: 45, // Dropped from 54
      netScore: 140,
      negativeMarksLost: 20,         // Penalties increased
      topicBreakdown: [
        { topic: "Optics", attempted: 10, correct: 3, accuracyPercentage: 30, classification: "weak" },
        { topic: "Electrostatics", attempted: 10, correct: 4, accuracyPercentage: 40, classification: "weak" },
        { topic: "Magnetism", attempted: 10, correct: 4, accuracyPercentage: 40, classification: "weak" },
      ],
    } as any,
  });

  const calcDropNoWins = calculateProgressCardData({
    olderReport: report1,
    newerReport: droppingReportNoWins,
  });

  runTest("Rejects card creation when accuracy drops and 0 wins exist", () => {
    assert.strictEqual(calcDropNoWins.eligible, false);
    assert.ok(calcDropNoWins.reason?.includes("No significant"));
  });

  // Scenario B: Accuracy dropped slightly, but topic win and penalty reduction exist
  const droppingReportWithWins = createMockReport({
    id: "rep-drop-wins",
    created_at: "2026-10-20T10:00:00Z",
    stats_json: {
      overallAccuracyPercentage: 52, // Dropped from 54 (-2)
      netScore: 185,
      negativeMarksLost: 8,          // Reduced from 14 (Saved 6 marks!)
      topicBreakdown: [
        { topic: "Optics", attempted: 10, correct: 8, accuracyPercentage: 80, classification: "strong" }, // +40%
        { topic: "Electrostatics", attempted: 10, correct: 5, accuracyPercentage: 50, classification: "weak" },
        { topic: "Magnetism", attempted: 10, correct: 4, accuracyPercentage: 40, classification: "weak" },
      ],
    } as any,
  });

  const calcDropWithWins = calculateProgressCardData({
    olderReport: report1,
    newerReport: droppingReportWithWins,
  });

  runTest("Suppresses negative delta and displays only wins when win exists", () => {
    assert.strictEqual(calcDropWithWins.eligible, true);
    assert.ok(calcDropWithWins.cardData);
    // Never show a negative delta
    assert.strictEqual(calcDropWithWins.cardData.showAccuracyGain, false);
    // Highlights are present
    assert.ok(calcDropWithWins.cardData.highlights.length >= 1);
  });

  // 5. Privacy: Anonymous by default
  console.log("\n5. Privacy Invariants (Anonymous by Default):");
  const anonCalc = calculateProgressCardData({
    olderReport: report1,
    newerReport: report2,
  });
  runTest("Defaults displayName to null when omitted", () => {
    assert.strictEqual(anonCalc.cardData?.displayName, null);
  });

  // 6. Unified API Route Guards & Public Route Behavior
  console.log("\n6. Unified Route Guards & Public Endpoints:");
  await runAsyncTest("GET /api/progress-cards/list without session returns 401", async () => {
    const req = new NextRequest("https://cuetmate.vercel.app/api/progress-cards/list");
    const res = await GET(req, { params: { route: ["progress-cards", "list"] } });
    assert.strictEqual(res.status, 401);
  });

  await runAsyncTest("POST /api/progress-cards/create without session returns 401", async () => {
    const req = new NextRequest("https://cuetmate.vercel.app/api/progress-cards/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromReportId: "a", toReportId: "b" }),
    });
    const res = await POST(req, { params: { route: ["progress-cards", "create"] } });
    assert.strictEqual(res.status, 401);
  });

  await runAsyncTest("PATCH /api/progress-cards/card-1 without session returns 401", async () => {
    const req = new NextRequest("https://cuetmate.vercel.app/api/progress-cards/card-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_public: true }),
    });
    const res = await PATCH(req, { params: { route: ["progress-cards", "card-1"] } });
    assert.strictEqual(res.status, 401);
  });

  await runAsyncTest("DELETE /api/progress-cards/card-1 without session returns 401", async () => {
    const req = new NextRequest("https://cuetmate.vercel.app/api/progress-cards/card-1", {
      method: "DELETE",
    });
    const res = await DELETE(req, { params: { route: ["progress-cards", "card-1"] } });
    assert.strictEqual(res.status, 401);
  });

  await runAsyncTest("GET /api/progress-cards/public/non_existent_card returns 404", async () => {
    const req = new NextRequest("https://cuetmate.vercel.app/api/progress-cards/public/non_existent_card");
    const res = await GET(req, { params: { route: ["progress-cards", "public", "non_existent_card"] } });
    assert.strictEqual(res.status, 404);
  });

  // 7. Safeguards (cards only, never counting)
  console.log("\n7. Progress Card Safeguards (Accuracy >= 15%, >= 3 units, unique questions footer):");
  runTest("Rejects card creation if older report has accuracy < 15%", () => {
    const lowAccReport = createMockReport({
      id: "low-acc",
      stats_json: {
        overallAccuracyPercentage: 12,
        netScore: 30,
        negativeMarksLost: 40,
        topicBreakdown: [
          { topic: "Optics", attempted: 10, correct: 1, accuracyPercentage: 10, classification: "weak" },
          { topic: "Electrostatics", attempted: 10, correct: 1, accuracyPercentage: 10, classification: "weak" },
          { topic: "Magnetism", attempted: 10, correct: 1, accuracyPercentage: 10, classification: "weak" },
        ],
      } as any,
    });
    const result = calculateProgressCardData({
      olderReport: lowAccReport,
      newerReport: report2,
    });
    assert.strictEqual(result.eligible, false);
    assert.ok(result.reason?.includes("accuracy ≥15%"));
  });

  runTest("Rejects card creation if reports have attempts across fewer than 3 units", () => {
    const fewUnitsReport = createMockReport({
      id: "few-units",
      stats_json: {
        overallAccuracyPercentage: 60,
        netScore: 180,
        negativeMarksLost: 10,
        topicBreakdown: [
          { topic: "Optics", attempted: 20, correct: 12, accuracyPercentage: 60, classification: "strong" },
          { topic: "Electrostatics", attempted: 20, correct: 12, accuracyPercentage: 60, classification: "strong" },
        ],
      } as any,
    });
    const result = calculateProgressCardData({
      olderReport: fewUnitsReport,
      newerReport: report2,
    });
    assert.strictEqual(result.eligible, false);
    assert.ok(result.reason?.includes("at least 3 different units"));
  });

  runTest("isProgressCardSafeguardPassed blocks cards with accuracy < 15%", () => {
    assert.strictEqual(isProgressCardSafeguardPassed({ fromAccuracy: 10, toAccuracy: 50 }), false);
    assert.strictEqual(isProgressCardSafeguardPassed({ fromAccuracy: 50, toAccuracy: 14 }), false);
    assert.strictEqual(isProgressCardSafeguardPassed({ fromAccuracy: 25, toAccuracy: 60 }), true);
  });

  runTest("Card data preserves totalQuestionsAnalyzed (300 across both windows) for footer", () => {
    assert.strictEqual(calc.cardData?.totalQuestionsAnalyzed, 300);
  });

  runTest("Rejects card creation if either window has fewer than 150 questions", () => {
    const smallWindowReport = createMockReport({
      id: "small-win",
      questions_analyzed: 120,
    });
    const result = calculateProgressCardData({
      olderReport: smallWindowReport,
      newerReport: report2,
    });
    assert.strictEqual(result.eligible, false);
    assert.ok(result.reason?.includes("at least 150 eligible unique questions"));
  });

  runTest("Rejects card creation if assessment window is flagged as low-signal or random answering", () => {
    const randomReport = createMockReport({
      id: "random-report",
      stats_json: {
        ...report1.stats_json,
        hasRandomAnswering: true,
      },
    });
    const result = calculateProgressCardData({
      olderReport: randomReport,
      newerReport: report2,
    });
    assert.strictEqual(result.eligible, false);
    assert.ok(result.reason?.includes("low-signal or random answering"));
  });

  console.log("\n============================================================");
  console.log(`PHASE 4 TEST SUMMARY: ${passedCount} passed, ${failedCount} failed`);
  console.log("============================================================\n");

  if (failedCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
