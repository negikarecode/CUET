import { RecordedTestAttempt } from "@/types";
import { deduplicateTestAttempts } from "@/lib/analytics";
import { stringToUuid } from "@/lib/utils";
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
  if (!subjectInput) return "";
  const lower = subjectInput.toLowerCase().trim();
  const cleaned = lower.replace(/[-_ ]/g, "");

  if (cleaned === "physicaleducation" || cleaned === "ped" || cleaned.includes("physical")) return "physical_education";
  if (cleaned === "physics" || cleaned === "phys") return "physics";
  if (cleaned === "chemistry" || cleaned === "chem") return "chemistry";
  if (cleaned === "mathematics" || cleaned === "maths" || cleaned === "math" || cleaned.includes("math")) return "maths";
  if (cleaned === "biology" || cleaned === "bio" || cleaned.includes("biolog")) return "bio";
  if (cleaned === "accountancy" || cleaned === "accounts" || cleaned === "acc" || cleaned === "accs" || cleaned.includes("account")) return "accountancy";
  if (cleaned === "economics" || cleaned === "eco" || cleaned.includes("econom")) return "eco";
  if (cleaned === "businessstudies" || cleaned === "business" || cleaned === "bst" || cleaned.includes("business")) return "bst";
  if (cleaned === "history" || cleaned === "hist" || cleaned.includes("history")) return "history";
  if (cleaned === "politicalscience" || cleaned === "polscience" || cleaned === "pol" || cleaned.includes("politic")) return "pol science";
  if (cleaned === "geography" || cleaned === "geo" || cleaned.includes("geograph")) return "geo";
  if (cleaned === "psychology" || cleaned === "psy" || cleaned === "psych" || cleaned.includes("psych")) return "psychology";
  if (cleaned === "sociology" || cleaned === "soc" || cleaned.includes("sociol")) return "sociology";
  if (cleaned === "computerscience" || cleaned === "cs" || cleaned === "csip" || cleaned.includes("computer")) return "computer_science";
  if (cleaned === "homescience" || cleaned === "hsc") return "home_science";
  if (cleaned === "massmedia" || cleaned === "mmc" || cleaned === "masscomm") return "mass_media";
  if (cleaned === "environmentalstudies" || cleaned === "evs" || cleaned === "environmental" || cleaned.includes("environment")) return "environmental_studies";
  if (cleaned === "finearts" || cleaned === "fa" || cleaned === "visualarts") return "fine_arts";
  if (cleaned === "agriculture" || cleaned === "agr" || cleaned.includes("agri")) return "agriculture";
  if (cleaned === "anthropology" || cleaned === "ant" || cleaned.includes("anthropolog")) return "anthropology";
  if (cleaned === "english" || cleaned === "eng" || cleaned.includes("english")) return "english";
  if (cleaned === "generaltest" || cleaned === "general" || cleaned === "gt" || cleaned === "gat") return "general-test";

  // Check direct manifest match
  if ((practiceManifest as Record<string, any>)[lower]) return lower;
  return lower;
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

export function matchesPracticePaper(
  a: RecordedTestAttempt,
  folder: string,
  uNum: number,
  tNum: number
): boolean {
  if (!a) return false;
  const aTId = (a.testId || "").toLowerCase().trim();
  const aId = (a.id || "").toLowerCase().trim();
  const aTitle = (a.testTitle || "").toLowerCase().trim();

  // 1. Direct ID matching
  const testId = `practice-${folder}-unit${uNum}-test${tNum}`;
  const altTestId = `practice-${folder}-u${uNum}-t${tNum}`;
  const dashTestId = `practice-${folder}-unit-${uNum}-test-${tNum}`;
  const plainTestId = `${folder}-unit${uNum}-test${tNum}`;

  if (aTId === testId || aId === testId) return true;
  if (aTId === altTestId || aId === altTestId) return true;
  if (aTId === dashTestId || aId === dashTestId) return true;
  if (aTId === plainTestId || aId === plainTestId) return true;

  // UUID matching
  const uuid1 = stringToUuid(testId);
  const uuid2 = stringToUuid(altTestId);
  if (aTId === uuid1 || aId === uuid1 || aTId === uuid2 || aId === uuid2) return true;
  if (aTId && (stringToUuid(aTId) === uuid1 || stringToUuid(aTId) === uuid2)) return true;

  // 2. Canonical aliases for folder
  const aliases: string[] = [folder];
  if (folder === "bio") aliases.push("biology");
  if (folder === "maths") aliases.push("mathematics", "math");
  if (folder === "bst") aliases.push("business-studies", "business_studies", "business");
  if (folder === "pol science") aliases.push("political-science", "political_science", "pol-science", "polscience", "pol");
  if (folder === "eco") aliases.push("economics");
  if (folder === "geo") aliases.push("geography");
  if (folder === "physical_education") aliases.push("physical-education", "physical_education", "ped");
  if (folder === "computer_science") aliases.push("computer-science", "computer_science", "cs", "csip");
  if (folder === "home_science") aliases.push("home-science", "home_science", "hsc");
  if (folder === "mass_media") aliases.push("mass-media", "mass_media", "mmc");
  if (folder === "environmental_studies") aliases.push("environmental-studies", "environmental_studies", "evs");
  if (folder === "fine_arts") aliases.push("fine-arts", "fine_arts", "fa");
  if (folder === "agriculture") aliases.push("agriculture", "agr");
  if (folder === "anthropology") aliases.push("anthropology", "ant");
  if (folder === "english") aliases.push("english", "eng");
  if (folder === "general-test") aliases.push("general-test", "general", "gt", "gat");

  for (const alias of aliases) {
    const aliasTestId1 = `practice-${alias}-unit${uNum}-test${tNum}`;
    const aliasTestId2 = `practice-${alias}-u${uNum}-t${tNum}`;
    if (aTId === aliasTestId1 || aId === aliasTestId1 || aTId === aliasTestId2 || aId === aliasTestId2) return true;
    const aUuid1 = stringToUuid(aliasTestId1);
    const aUuid2 = stringToUuid(aliasTestId2);
    if (aTId === aUuid1 || aId === aUuid1 || aTId === aUuid2 || aId === aUuid2) return true;
    if (aTId && (stringToUuid(aTId) === aUuid1 || stringToUuid(aTId) === aUuid2)) return true;
  }

  // 3. Extract unit and test number from testId
  const idUMatch = aTId.match(/unit[-_]?(\d+)/i) || aTId.match(/u[-_]?(\d+)/i);
  const idTMatch = aTId.match(/test[-_]?(\d+)/i) || aTId.match(/t[-_]?(\d+)/i) || aTId.match(/-(\d+)$/);
  if (idUMatch && idTMatch && idUMatch[1] && idTMatch[1]) {
    if (parseInt(idUMatch[1], 10) === uNum && parseInt(idTMatch[1], 10) === tNum) {
      return true;
    }
  }

  // 4. Extract unit and test number from testTitle
  const titleUMatch = aTitle.match(/\bunit\s*(\d+)\b/i);
  const titleTMatch = aTitle.match(/\b(?:practice\s+test|test)\s*(\d+)\b/i) || aTitle.match(/\b#(\d+)\b/i);
  if (titleUMatch && titleTMatch && titleUMatch[1] && titleTMatch[1]) {
    if (parseInt(titleUMatch[1], 10) === uNum && parseInt(titleTMatch[1], 10) === tNum) {
      return true;
    }
  }

  return false;
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
    const title = (att.testTitle || "").toLowerCase();
    const subKey = normalizePracticeFolder(att.subject || att.testTitle || "");
    return (
      testId.includes(`practice-${folder}`) ||
      testId.includes(`-${folder}-`) ||
      testId.includes(folder) ||
      title.includes(folder) ||
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
    for (let tNum = 1; tNum <= 50; tNum++) {
      totalCount++;
      const testId = `practice-${folder}-unit${uNum}-test${tNum}`;

      const matchedAttempts = practiceAttempts.filter((a) =>
        matchesPracticePaper(a, folder, uNum, tNum)
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

  // 5. Fallback for unassigned subject practice attempts (e.g. from server rows with generic names)
  const matchedAttemptIds = new Set<string>();
  Array.from(testsMap.values()).forEach((ts) => {
    if (ts.bestAttempt) {
      if (ts.bestAttempt.id) matchedAttemptIds.add(ts.bestAttempt.id);
      if (ts.bestAttempt.attemptId) matchedAttemptIds.add(ts.bestAttempt.attemptId);
    }
  });

  const unmatchedPractice = practiceAttempts.filter(
    (att) =>
      (!att.id || !matchedAttemptIds.has(att.id)) &&
      (!att.attemptId || !matchedAttemptIds.has(att.attemptId))
  );

  if (unmatchedPractice.length > 0) {
    for (const unassigned of unmatchedPractice) {
      let foundSlot = false;
      for (const u of targetUnits) {
        for (let tNum = 1; tNum <= 50; tNum++) {
          const testId = `practice-${folder}-unit${u.unitNumber}-test${tNum}`;
          const currentStat = testsMap.get(testId);
          if (!currentStat || !currentStat.hasAttempted) {
            attemptedCount++;
            testsMap.set(testId, {
              testId,
              hasAttempted: true,
              attemptsCount: 1,
              bestScore: unassigned.totalMarks,
              maxMarks: unassigned.maxMarks || 100,
              lastScore: unassigned.totalMarks,
              accuracy: unassigned.accuracyPercentage,
              lastAttemptDate: formatDate(unassigned.submittedAt),
              bestAttempt: unassigned,
            });
            if (unassigned.id) matchedAttemptIds.add(unassigned.id);
            if (unassigned.attemptId) matchedAttemptIds.add(unassigned.attemptId);
            foundSlot = true;
            break;
          }
        }
        if (foundSlot) break;
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
