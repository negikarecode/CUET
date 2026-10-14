import { RecordedTestAttempt } from "@/types";
import { deduplicateTestAttempts } from "@/lib/analytics";
import practiceManifest from "@/lib/data/practice_test_manifest.json";

export interface PracticeTestStats {
  testId: string;
  hasAttempted: boolean;
  attemptsCount: number;
  bestScore: number | null;
  maxMarks: number;
  lastScore: number | null;
  accuracy: number | null;
  lastAttemptDate: string | null;
  bestAttempt: RecordedTestAttempt | null;
}

export interface PracticeStatsResult {
  subject: string;
  folder: string;
  unitNumber?: number;
  attemptedCount: number; // distinct tests attempted
  totalCount: number; // total tests available
  bestScore: number | null;
  maxMarks: number;
  lastScore: number | null;
  accuracy: number | null; // from best attempt or average
  lastAttemptDate: string | null; // from best attempt
  bestAttempt: RecordedTestAttempt | null;
  hasAttempts: boolean;
  nextUnattemptedTestId: string | null;
  nextUnattemptedUnit: number | null;
  nextUnattemptedTestNumber: number | null;
  testsMap: Map<string, PracticeTestStats>;
}

export function normalizePracticeFolder(subjectInput: string): string {
  if (!subjectInput) return "physics";
  const lower = subjectInput.toLowerCase().trim();
  const cleaned = lower.replace(/[-_ ]/g, "");

  if (cleaned === "physics" || cleaned === "phys") return "physics";
  if (cleaned === "chemistry" || cleaned === "chem") return "chemistry";
  if (cleaned === "mathematics" || cleaned === "maths" || cleaned === "math") return "maths";
  if (cleaned === "biology" || cleaned === "bio") return "bio";
  if (cleaned === "accountancy" || cleaned === "accounts" || cleaned === "acc") return "accountancy";
  if (cleaned === "businessstudies" || cleaned === "business" || cleaned === "bst") return "bst";
  if (cleaned === "economics" || cleaned === "eco") return "eco";
  if (cleaned === "history" || cleaned === "hist") return "history";
  if (cleaned === "politicalscience" || cleaned === "polscience" || cleaned === "pol") return "pol science";
  if (cleaned === "geography" || cleaned === "geo") return "geo";
  if (cleaned === "psychology" || cleaned === "psy" || cleaned === "psych") return "psychology";
  if (cleaned === "sociology" || cleaned === "soc") return "sociology";
  if (cleaned === "physicaleducation" || cleaned === "ped" || cleaned === "physical") return "physical_education";
  if (cleaned === "computerscience" || cleaned === "cs" || cleaned === "csip") return "computer_science";
  if (cleaned === "homescience" || cleaned === "hsc") return "home_science";
  if (cleaned === "massmedia" || cleaned === "mmc" || cleaned === "masscomm") return "mass_media";
  if (cleaned === "environmentalstudies" || cleaned === "evs" || cleaned === "environmental") return "environmental_studies";
  if (cleaned === "finearts" || cleaned === "fa" || cleaned === "visualarts") return "fine_arts";
  if (cleaned === "agriculture" || cleaned === "agr") return "agriculture";
  if (cleaned === "anthropology" || cleaned === "ant") return "anthropology";
  if (cleaned === "english" || cleaned === "eng") return "english";
  if (cleaned === "generaltest" || cleaned === "general" || cleaned === "gt" || cleaned === "gat") return "general-test";

  // Check direct manifest match
  if ((practiceManifest as Record<string, any>)[lower]) return lower;
  return "physics";
}

export function isPracticeAttempt(att: RecordedTestAttempt): boolean {
  if (!att) return false;
  const testId = (att.testId || "").toLowerCase();
  const title = (att.testTitle || "").toLowerCase();

  // Exclude PYQs / Past Papers
  if (
    testId.includes("pyq") ||
    title.includes("pyq") ||
    title.includes("past paper") ||
    title.includes("official past") ||
    title.includes("previous year")
  ) {
    return false;
  }

  // Exclude full-length domain mocks
  if (
    testId.includes("-mock") ||
    testId.includes("mock-") ||
    title.includes("full mock") ||
    title.includes("domain mock") ||
    (att.totalQuestions !== undefined && att.totalQuestions >= 40)
  ) {
    return false;
  }

  // Must match practice pattern or 20 questions
  if (
    testId.includes("practice") ||
    testId.includes("unit") ||
    title.includes("practice") ||
    title.includes("unit") ||
    (att.totalQuestions !== undefined && att.totalQuestions <= 25)
  ) {
    return true;
  }

  return false;
}

function formatDate(isoStr?: string | null): string | null {
  if (!isoStr) return null;
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

/**
 * Authoritative single selector for unit practice test statistics.
 * Excludes full mocks, PYQ attempts, and duplicates.
 * Returns attempted count, total count, best score, last score, accuracy, and last date.
 * Score, accuracy, and date come from the same (best) attempt.
 */
export function getPracticeStats(
  subjectInput: string,
  unitNumber?: number,
  rawAttempts: RecordedTestAttempt[] = []
): PracticeStatsResult {
  const folder = normalizePracticeFolder(subjectInput);
  const subjectData = (practiceManifest as Record<string, any>)[folder];
  const units: any[] = subjectData?.units || [];

  // Deduplicate test attempts (same list as Dashboard)
  const cleanAttempts = deduplicateTestAttempts(rawAttempts || []);

  // Filter for practice sessions matching this subject folder
  const practiceAttempts = cleanAttempts.filter((att) => {
    if (!isPracticeAttempt(att)) return false;
    const testId = (att.testId || "").toLowerCase();
    const subKey = normalizePracticeFolder(att.subject || att.testTitle || "");
    return (
      testId.includes(`practice-${folder}`) ||
      testId.includes(`-${folder}-`) ||
      subKey === folder
    );
  });

  // Calculate per-test statistics map
  const testsMap = new Map<string, PracticeTestStats>();

  // Determine target units to evaluate
  const targetUnits = unitNumber !== undefined
    ? units.filter((u) => u.unitNumber === unitNumber)
    : units;

  let totalCount = 0;
  let attemptedCount = 0;
  let globalBestAttempt: RecordedTestAttempt | null = null;
  let globalLatestAttempt: RecordedTestAttempt | null = null;
  let totalAccuracySum = 0;

  let nextUnattemptedTestId: string | null = null;
  let nextUnattemptedUnit: number | null = null;
  let nextUnattemptedTestNumber: number | null = null;

  for (const u of targetUnits) {
    const uNum = u.unitNumber;
    for (let tNum = 1; tNum <= 20; tNum++) {
      totalCount++;
      const testId = `practice-${folder}-unit${uNum}-test${tNum}`;
      // Also match alternate format like practice-physics-u1-t1
      const altTestId = `practice-${folder}-u${uNum}-t${tNum}`;

      const matchedAttempts = practiceAttempts.filter(
        (a) => a.testId === testId || a.testId === altTestId
      );

      if (matchedAttempts.length > 0) {
        attemptedCount++;

        // Find best attempt: highest totalMarks, then higher accuracy, then lower time
        const sortedBest = [...matchedAttempts].sort((a, b) => {
          if (b.totalMarks !== a.totalMarks) return b.totalMarks - a.totalMarks;
          if (b.accuracyPercentage !== a.accuracyPercentage)
            return b.accuracyPercentage - a.accuracyPercentage;
          return a.timeTakenSeconds - b.timeTakenSeconds;
        });
        const best = sortedBest[0]!;

        // Find latest attempt by date
        const sortedLatest = [...matchedAttempts].sort(
          (a, b) =>
            new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );
        const latest = sortedLatest[0]!;

        totalAccuracySum += best.accuracyPercentage;

        testsMap.set(testId, {
          testId,
          hasAttempted: true,
          attemptsCount: matchedAttempts.length,
          bestScore: best.totalMarks,
          maxMarks: best.maxMarks || 100,
          lastScore: latest.totalMarks,
          accuracy: best.accuracyPercentage,
          lastAttemptDate: formatDate(best.submittedAt),
          bestAttempt: best,
        });

        // Track global best across target units
        if (!globalBestAttempt || best.totalMarks > globalBestAttempt.totalMarks) {
          globalBestAttempt = best;
        } else if (
          best.totalMarks === globalBestAttempt.totalMarks &&
          best.accuracyPercentage > globalBestAttempt.accuracyPercentage
        ) {
          globalBestAttempt = best;
        }

        // Track global latest
        if (
          !globalLatestAttempt ||
          new Date(latest.submittedAt).getTime() >
            new Date(globalLatestAttempt.submittedAt).getTime()
        ) {
          globalLatestAttempt = latest;
        }
      } else {
        testsMap.set(testId, {
          testId,
          hasAttempted: false,
          attemptsCount: 0,
          bestScore: null,
          maxMarks: 100,
          lastScore: null,
          accuracy: null,
          lastAttemptDate: null,
          bestAttempt: null,
        });

        // First unattempted test encountered
        if (!nextUnattemptedTestId) {
          nextUnattemptedTestId = testId;
          nextUnattemptedUnit = uNum;
          nextUnattemptedTestNumber = tNum;
        }
      }
    }
  }

  // Fallback for next unattempted if all are completed
  if (!nextUnattemptedTestId && units.length > 0) {
    const firstUnit = units[0]?.unitNumber || 1;
    nextUnattemptedTestId = `practice-${folder}-unit${firstUnit}-test1`;
    nextUnattemptedUnit = firstUnit;
    nextUnattemptedTestNumber = 1;
  }

  const hasAttempts = attemptedCount > 0;
  const bestScore = globalBestAttempt ? globalBestAttempt.totalMarks : null;
  const maxMarks = globalBestAttempt?.maxMarks || 100;
  const lastScore = globalLatestAttempt ? globalLatestAttempt.totalMarks : null;

  // Accuracy and lastAttemptDate come from the SAME best attempt as requested
  const accuracy = globalBestAttempt
    ? globalBestAttempt.accuracyPercentage
    : null;
  const lastAttemptDate = globalBestAttempt
    ? formatDate(globalBestAttempt.submittedAt)
    : null;

  return {
    subject: subjectData?.name || folder,
    folder,
    unitNumber,
    attemptedCount,
    totalCount,
    bestScore,
    maxMarks,
    lastScore,
    accuracy,
    lastAttemptDate,
    bestAttempt: globalBestAttempt,
    hasAttempts,
    nextUnattemptedTestId,
    nextUnattemptedUnit,
    nextUnattemptedTestNumber,
    testsMap,
  };
}
