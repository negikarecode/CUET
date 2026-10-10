import {
  calculateCUETScore,
  MARKING_SCHEME,
  CALIBRATION_THRESHOLDS,
  getTopicConfidence,
  getPercentileConfidence,
  formatDateIndian,
  formatPlainLanguageDiagnosis,
  getEvaluatorForSubject,
} from "../lib/config/dashboardConfig";
import { getInitials, getAvatarColor } from "../components/ui/Avatar";
import { generate90DayHeatmap } from "../lib/heatmap-utils";
import { calculateCollegeReadiness } from "../lib/college-benchmarks";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests += 1;
  if (condition) {
    passedTests += 1;
    console.log(`  PASS: ${testName}`);
  } else {
    failedTests += 1;
    console.error(`  FAIL: ${testName}`);
    if (detail) {
      console.error(`     Detail: ${detail}`);
    }
  }
}

async function runDashboardRefactorTests() {
  console.log("===============================================================");
  console.log("DASHBOARD REFACTOR UNIT TEST SUITE (PHASES 1 - 5)");
  console.log("===============================================================\n");

  // -----------------------------------------------------------------
  // 1. ACCURACY & SCORE CALCULATIONS (+5, -1, 250 scale)
  // -----------------------------------------------------------------
  console.log("1. CUET Scoring & Accuracy Calculations:");

  // User's exact session: 10 correct, 40 incorrect out of 50 attempted
  const userScore = calculateCUETScore(10, 50).score;
  assert(
    userScore === 10,
    `Mock score calculation: 10 correct * 5 - 40 incorrect * 1 = 10 pts (Computed: ${userScore})`
  );

  const userAccuracy = Math.round((10 / 50) * 100);
  assert(
    userAccuracy === 20,
    `Mock accuracy calculation: 10 / 50 = 20% (Computed: ${userAccuracy}%)`
  );

  const perfectScore = calculateCUETScore(50, 50).score;
  assert(
    perfectScore === 250,
    `Perfect attempt: 50 correct = 250 pts max marks (Computed: ${perfectScore})`
  );

  const allWrongScore = calculateCUETScore(0, 50).score;
  assert(
    allWrongScore === -50,
    `All incorrect attempt: 50 wrong = -50 pts (Computed: ${allWrongScore})`
  );

  const mixedScore = calculateCUETScore(40, 45).score;
  assert(
    mixedScore === 195,
    `Mixed attempt: 40 correct, 5 wrong = 195 pts (Computed: ${mixedScore})`
  );

  assert(
    MARKING_SCHEME.MAX_SCORE_PER_SUBJECT === 250,
    `Marking scheme config max score: 250 pts (Config: ${MARKING_SCHEME.MAX_SCORE_PER_SUBJECT})`
  );

  // College Benchmark Scale (Hindu College 238 / 250 pts)
  const hinduBenchmark = calculateCollegeReadiness("Hindu College", "Delhi University", 20, 50, userScore);
  assert(
    hinduBenchmark.targetScoreFormatted.includes("250 pts"),
    `Target college scoring scale: Uses 250 pts scale (Formatted: ${hinduBenchmark.targetScoreFormatted})`
  );
  assert(
    hinduBenchmark.pointsGap === 228,
    `Points gap calculation: 238 target - 10 current = 228 pts (Computed: ${hinduBenchmark.pointsGap})`
  );
  assert(
    hinduBenchmark.gapLabel === "Need +228 pts to reach target",
    `Labelled points gap: "Need +228 pts to reach target" (Found: "${hinduBenchmark.gapLabel}")`
  );

  console.log();

  // -----------------------------------------------------------------
  // 2. PERCENTILE & TOPIC CONFIDENCE GATING (<150 Qs, <10 Qs)
  // -----------------------------------------------------------------
  console.log("2. Percentile & Topic Confidence Gating:");

  // Below calibration gate (50 attempted out of 150)
  const lowDataPercentile = getPercentileConfidence(50, 20);
  assert(
    lowDataPercentile.hasEnoughData === false && lowDataPercentile.isCalibrated === false,
    `Percentile gate below 150 Qs: Hidden/muted (hasEnoughData: ${lowDataPercentile.hasEnoughData})`
  );
  assert(
    lowDataPercentile.displayValue === "Not enough data yet",
    `Percentile display text below gate: "Not enough data yet" (Found: "${lowDataPercentile.displayValue}")`
  );
  assert(
    lowDataPercentile.subtext.includes("50/150 Qs"),
    `Percentile subtext records calibration progress: "${lowDataPercentile.subtext}"`
  );

  // Calibrated user (160 attempted, 85% accuracy)
  const calibratedPercentile = getPercentileConfidence(160, 85);
  assert(
    calibratedPercentile.hasEnoughData === true && calibratedPercentile.isCalibrated === true,
    `Percentile gate at/above 150 Qs: Calibrated and visible (hasEnoughData: ${calibratedPercentile.hasEnoughData})`
  );
  assert(
    calibratedPercentile.displayValue.includes("%ile"),
    `Percentile display formatted: "${calibratedPercentile.displayValue}"`
  );

  // Topic confidence levels (<10 early signal, 10-19 emerging, 20+ established)
  const earlyTopic = getTopicConfidence(6);
  assert(
    earlyTopic.isLowConfidence === true,
    `Topic with 6 attempts: Low confidence flagged (isLowConfidence: ${earlyTopic.isLowConfidence})`
  );
  assert(
    earlyTopic.badgeLabel === "Early signal, low confidence",
    `Topic with 6 attempts label: "Early signal, low confidence" (Found: "${earlyTopic.badgeLabel}")`
  );

  const emergingTopic = getTopicConfidence(14);
  assert(
    emergingTopic.badgeLabel === "Emerging pattern",
    `Topic with 14 attempts label: "Emerging pattern" (Found: "${emergingTopic.badgeLabel}")`
  );

  const establishedTopic = getTopicConfidence(25);
  assert(
    establishedTopic.badgeLabel === "Established weakness",
    `Topic with 25 attempts label: "Established weakness" (Found: "${establishedTopic.badgeLabel}")`
  );

  // Plain language diagnosis
  const plainDiagnosis = formatPlainLanguageDiagnosis({
    primaryDiagnosis: "Rapid Response Pacing",
    contributingFactor: "High-Speed Answer Selection",
    avgTimeSeconds: 2,
    accuracyPercentage: 0,
  });
  assert(
    plainDiagnosis.humanSentence.includes("Slow down and read all options"),
    `Plain language diagnosis generates human sentence: "${plainDiagnosis.humanSentence}"`
  );

  console.log();

  // -----------------------------------------------------------------
  // 3. HEATMAP 90-DAY DATE-TO-CELL MAPPING & TOOLTIPS
  // -----------------------------------------------------------------
  console.log("3. Heatmap 90-Day Date-to-Cell Mapping:");

  const attemptsData = [
    {
      submittedAt: "2026-10-06T14:30:00.000Z",
      subject: "Environmental Studies",
      attemptedCount: 50,
      score: 10,
    },
  ];

  const heatmap = generate90DayHeatmap("2026-10-10", attemptsData);
  assert(
    heatmap.weeks.length >= 13,
    `Heatmap columns span ~13 calendar weeks (Found: ${heatmap.weeks.length} weeks)`
  );

  // Flatten all days in range
  const allDays = heatmap.weeks.flat().filter(Boolean);
  const inRangeDays = allDays.filter((d) => d!.isInRange);
  assert(
    inRangeDays.length === 90,
    `Heatmap window spans exactly 90 days ending today (Found: ${inRangeDays.length} days)`
  );

  // Find Oct 6, 2026 day cell
  const oct6Cell = allDays.find((d) => d!.date === "2026-10-06");
  assert(
    Boolean(oct6Cell),
    "Heatmap contains cell for Oct 6, 2026"
  );
  assert(
    oct6Cell!.count === 1,
    `Oct 6, 2026 has count = 1 (Found: ${oct6Cell?.count})`
  );
  assert(
    oct6Cell!.questionCount === 50,
    `Oct 6, 2026 records 50 questions (Found: ${oct6Cell?.questionCount})`
  );
  assert(
    oct6Cell!.tooltipText === "6 Oct 2026: 1 mock, 50 questions",
    `Oct 6, 2026 tooltip text formatted: "${oct6Cell?.tooltipText}"`
  );

  // Day of week alignment: 2026-10-06 was Tuesday -> dayOfWeek index 1 (Monday=0, Tuesday=1)
  assert(
    oct6Cell!.dayOfWeek === 1,
    `Oct 6, 2026 day of week is Tuesday (Row index: ${oct6Cell?.dayOfWeek})`
  );

  // Verify Oct 6 sits in the current October week column (last column)
  const lastWeek = heatmap.weeks[heatmap.weeks.length - 1] || [];
  const hasOct6InLastWeek = lastWeek.some((d) => d?.date === "2026-10-06");
  assert(
    hasOct6InLastWeek,
    "Oct 6, 2026 correctly sits in the current week column of October (not in September)"
  );

  console.log();

  // -----------------------------------------------------------------
  // 4. AVATAR INITIALS & FALLBACKS
  // -----------------------------------------------------------------
  console.log("4. Reusable Avatar Initials & Fallback:");

  const initials1 = getInitials("Aryan Negi");
  assert(initials1 === "AN", `Initials for "Aryan Negi" = "AN" (Computed: "${initials1}")`);

  const initials2 = getInitials("Dr. A. Verma");
  assert(initials2 === "AV", `Initials for "Dr. A. Verma" = "AV" (Computed: "${initials2}")`);

  const initials3 = getInitials("Hindu College");
  assert(initials3 === "HC", `Initials for "Hindu College" = "HC" (Computed: "${initials3}")`);

  const initials4 = getInitials("");
  assert(initials4 === "CU", `Fallback initials for empty name = "CU" (Computed: "${initials4}")`);

  const color1 = getAvatarColor("Aryan Negi");
  const color2 = getAvatarColor("Aryan Negi");
  assert(
    color1.bg === color2.bg,
    `Avatar color palette is deterministic for same user name ("${color1.bg}")`
  );
  assert(
    CALIBRATION_THRESHOLDS.SUBJECT_CALIBRATION_GATE === 150,
    "Calibration gate threshold is 150 questions"
  );

  // Evaluator mapping for Environmental Studies
  const evEVS = getEvaluatorForSubject("Environmental Studies");
  assert(
    evEVS.name.includes("Nair") && evEVS.role.includes("Environmental"),
    `Environmental Studies evaluator matched: "${evEVS.name}" (${evEVS.role})`
  );

  // Date formatting (en-IN DD MMM YYYY)
  const indianDate = formatDateIndian("2026-11-10");
  assert(
    indianDate === "10 Nov 2026",
    `Unambiguous Indian date formatting: "10 Nov 2026" (Computed: "${indianDate}")`
  );

  console.log();
  console.log("===============================================================");
  console.log(`DASHBOARD REFACTOR TEST SUMMARY: ${passedTests} / ${totalTests} PASSED (${failedTests} FAILED)`);
  console.log("===============================================================");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runDashboardRefactorTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
