import { RecordedTestAttempt } from "@/types";
import { deduplicateTestAttempts, normalizeSubject } from "@/lib/analytics";
import { stringToUuid } from "@/lib/utils";
import { getMockTestsForSubject, SUBJECT_MOCK_COUNTS } from "@/lib/data/subjects";

export interface MockStatsResult {
  subject: string;
  subjectKey: string;
  attemptedMocksCount: number; // distinct mocks attempted out of total (e.g. 1 out of 20)
  totalMocksCount: number; // usually 20
  totalAttemptsCount: number; // total valid mock attempts
  peakScore: number | null; // peak score on any mock for this subject
  peakMaxMarks: number; // 250
  averageScore: number | null; // average score across attempted mocks
  averageAccuracy: number; // average accuracy percentage
  bestAttempt: RecordedTestAttempt | null;
  attemptedMockIds: Set<string>;
  nextUnattemptedMockIndex: number; // 1-based index (e.g. 1..20), or 1 if none
  isAllAttempted: boolean;
  hasAttempts: boolean;
  formattedScore: string;
  helperText: string;
}

/**
 * Checks whether an attempt is a full-length domain mock exam.
 * Strictly excludes PYQ attempts and chapter/unit practice drills.
 */
export function isFullLengthMockAttempt(att: RecordedTestAttempt): boolean {
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

  // Exclude Unit Practice Tests and Repair Drills
  if (
    testId.includes("practice") ||
    testId.includes("repair") ||
    title.includes("practice") ||
    title.includes("drill") ||
    title.includes("repair") ||
    title.includes("unit") ||
    (att.totalQuestions !== undefined && att.totalQuestions > 0 && att.totalQuestions <= 25)
  ) {
    return false;
  }

  // Must be tagged as mock or full paper with >= 40 questions (or standard 50)
  if (
    testId.includes("mock") ||
    title.includes("mock") ||
    (att.totalQuestions && att.totalQuestions >= 40) ||
    (att.maxMarks && att.maxMarks >= 200)
  ) {
    return true;
  }

  return false;
}

export function matchesMockPaper(
  att: RecordedTestAttempt,
  subjectKey: string,
  mockId: string,
  mockNum: number
): boolean {
  if (!att) return false;
  const attTId = (att.testId || "").toLowerCase().trim();
  const attId = (att.id || "").toLowerCase().trim();
  const lowerMockId = mockId.toLowerCase().trim();
  const mockUuid = stringToUuid(lowerMockId);

  // 1. Direct ID & UUID matching
  if (attTId === lowerMockId || attId === lowerMockId) return true;
  if (attTId && (stringToUuid(attTId) === mockUuid || attTId === mockUuid)) return true;
  if (attId && (stringToUuid(attId) === mockUuid || attId === mockUuid)) return true;

  // 2. Check canonical aliases for this subject
  const aliases: string[] = [subjectKey];
  if (subjectKey === "biology" || subjectKey === "bio") aliases.push("bio", "biology");
  if (subjectKey === "mathematics" || subjectKey === "maths") aliases.push("maths", "mathematics", "math");
  if (subjectKey === "business-studies" || subjectKey === "bst") aliases.push("bst", "business-studies", "business");
  if (subjectKey === "political-science" || subjectKey === "pol science") aliases.push("pol-science", "political-science", "polscience", "pol");
  if (subjectKey === "economics" || subjectKey === "eco") aliases.push("eco", "economics");
  if (subjectKey === "geography" || subjectKey === "geo") aliases.push("geo", "geography");
  if (subjectKey === "physical-education") aliases.push("physical-education", "physical_education", "ped");
  if (subjectKey === "computer-science") aliases.push("computer-science", "computer_science", "cs", "csip");
  if (subjectKey === "home-science") aliases.push("home-science", "home_science", "hsc");
  if (subjectKey === "mass-media") aliases.push("mass-media", "mass_media", "mmc");
  if (subjectKey === "environmental-studies") aliases.push("environmental-studies", "environmental_studies", "evs");
  if (subjectKey === "fine-arts") aliases.push("fine-arts", "fine_arts", "fa");
  if (subjectKey === "agriculture") aliases.push("agriculture", "agr");
  if (subjectKey === "anthropology") aliases.push("anthropology", "ant");
  if (subjectKey === "english" || subjectKey === "eng") aliases.push("english", "eng");
  if (subjectKey === "general-test" || subjectKey === "gat" || subjectKey === "general") {
    aliases.push("general-test", "general_test", "gat", "general", "general-aptitude-test");
  }

  for (const alias of aliases) {
    const aliasId = `${alias}-mock-${mockNum}`;
    if (attTId === aliasId || attId === aliasId) return true;
    const aUuid = stringToUuid(aliasId);
    if (attTId === aUuid || attId === aUuid) return true;
    if (attTId && stringToUuid(attTId) === aUuid) return true;
  }

  // 3. Extract mock number from testId
  const idMatch = attTId.match(/(?:mock|paper|test)[-_]?(\d+)/i) || attTId.match(/-(\d+)$/);
  if (idMatch && idMatch[1] && parseInt(idMatch[1], 10) === mockNum) {
    return true;
  }

  // 4. Extract mock number from testTitle with word boundaries
  const attTitle = (att.testTitle || "").toLowerCase().trim();
  const titleNumMatch =
    attTitle.match(/\bmock(?:\s+paper|\s+test|\s+exam)?\s+(\d+)\b/i) ||
    attTitle.match(/\bpaper\s+(\d+)\b/i) ||
    attTitle.match(/\bmock\s*#\s*(\d+)\b/i);
  if (titleNumMatch && titleNumMatch[1] && parseInt(titleNumMatch[1], 10) === mockNum) {
    return true;
  }

  return false;
}

/**
 * Authoritative single selector for mock test statistics per subject.
 * Used consistently across:
 * - /dashboard/mocks (Subject list badges and progress)
 * - /dashboard/mocks/[subject] (X of 20 attempted, Peak Score, Avg Accuracy)
 * - /dashboard/standing (Where Do I Stand subject averages and "from N mock tests" text)
 */
export function getMockStats(
  subjectInput: string,
  rawAttempts: RecordedTestAttempt[] = []
): MockStatsResult {
  const norm = normalizeSubject(subjectInput || "physics");
  const subjectKey = norm.key;
  const subjectName = norm.name;

  const totalMocksCount = SUBJECT_MOCK_COUNTS[subjectKey] ?? 20;
  const mockTestsList = getMockTestsForSubject(subjectKey);

  // 1. Deduplicate test attempts first (same as Dashboard)
  const cleanAttempts = deduplicateTestAttempts(rawAttempts || []);

  // 2. Filter for full-length mocks matching this subject
  const subjectMockAttempts = cleanAttempts.filter((att) => {
    if (!isFullLengthMockAttempt(att)) return false;
    const attSubj = normalizeSubject(att.subject || att.testTitle || "").key;
    return attSubj === subjectKey;
  });

  // 3. Map attempts to distinct mock papers (1..20)
  const attemptedMockIds = new Set<string>();
  const bestAttemptByMock = new Map<string, RecordedTestAttempt>();

  mockTestsList.forEach((mockItem, idx) => {
    const mockNum = idx + 1;
    const mockId = mockItem.id;

    // Find any attempts matching this specific mock test
    const matchingAttempts = subjectMockAttempts.filter((att) =>
      matchesMockPaper(att, subjectKey, mockId, mockNum)
    );

    if (matchingAttempts.length > 0 && matchingAttempts[0]) {
      attemptedMockIds.add(mockId);
      const initial: RecordedTestAttempt = matchingAttempts[0];
      // Pick best attempt for this mock
      const best = matchingAttempts.reduce<RecordedTestAttempt>((prev, curr) => {
        const prevMarks = prev.totalMarks ?? 0;
        const currMarks = curr.totalMarks ?? 0;
        if (currMarks > prevMarks) return curr;
        if (currMarks === prevMarks) {
          if ((curr.accuracyPercentage ?? 0) > (prev.accuracyPercentage ?? 0)) return curr;
        }
        return prev;
      }, initial);
      bestAttemptByMock.set(mockId, best);
    }
  });

  // 4. Fallback for unassigned subject mock attempts (e.g. from server rows with unnumbered titles)
  const matchedAttemptIds = new Set<string>();
  Array.from(bestAttemptByMock.values()).forEach((att) => {
    if (att.id) matchedAttemptIds.add(att.id);
    if (att.attemptId) matchedAttemptIds.add(att.attemptId);
  });

  const unmatchedMocks = subjectMockAttempts.filter(
    (att) =>
      (!att.id || !matchedAttemptIds.has(att.id)) &&
      (!att.attemptId || !matchedAttemptIds.has(att.attemptId))
  );

  if (unmatchedMocks.length > 0) {
    for (const unassigned of unmatchedMocks) {
      const nextAvailable = mockTestsList.find((m) => !attemptedMockIds.has(m.id));
      if (nextAvailable) {
        attemptedMockIds.add(nextAvailable.id);
        bestAttemptByMock.set(nextAvailable.id, unassigned);
        if (unassigned.id) matchedAttemptIds.add(unassigned.id);
        if (unassigned.attemptId) matchedAttemptIds.add(unassigned.attemptId);
      }
    }
  }

  // Calculate next unattempted mock index (1-based)
  let nextUnattemptedMockIndex = 1;
  for (let i = 0; i < mockTestsList.length; i++) {
    const item = mockTestsList[i];
    if (item && !attemptedMockIds.has(item.id)) {
      nextUnattemptedMockIndex = i + 1;
      break;
    }
  }

  const attemptedMocksCount = attemptedMockIds.size;
  const isAllAttempted = attemptedMocksCount >= totalMocksCount;

  // Aggregate metrics across best attempts of each attempted mock
  const distinctBestAttempts = Array.from(bestAttemptByMock.values());
  const hasAttempts = distinctBestAttempts.length > 0;

  let peakScore: number | null = null;
  let peakMaxMarks = 250;
  let sumScore = 0;
  let sumAccuracy = 0;
  let overallBestAttempt: RecordedTestAttempt | null = null;

  distinctBestAttempts.forEach((att) => {
    const marks = att.totalMarks ?? 0;
    const acc = att.accuracyPercentage ?? 0;
    const maxM = att.maxMarks || 250;

    sumScore += marks;
    sumAccuracy += acc;

    if (peakScore === null || marks > peakScore) {
      peakScore = marks;
      peakMaxMarks = maxM;
      overallBestAttempt = att;
    } else if (marks === peakScore) {
      if (overallBestAttempt && acc > (overallBestAttempt.accuracyPercentage ?? 0)) {
        overallBestAttempt = att;
      }
    }
  });

  const averageScore = hasAttempts
    ? Math.round((sumScore / distinctBestAttempts.length) * 10) / 10
    : null;
  const averageAccuracy = hasAttempts
    ? Math.round(sumAccuracy / distinctBestAttempts.length)
    : 0;

  const formattedScore = averageScore !== null
    ? (averageScore % 1 === 0 ? String(averageScore) : averageScore.toFixed(1))
    : "—";

  const helperText = attemptedMocksCount === 1
    ? "from 1 mock test"
    : attemptedMocksCount > 1
    ? `from ${attemptedMocksCount} mock tests`
    : "No attempts recorded";

  return {
    subject: subjectName,
    subjectKey,
    attemptedMocksCount,
    totalMocksCount,
    totalAttemptsCount: subjectMockAttempts.length,
    peakScore,
    peakMaxMarks,
    averageScore,
    averageAccuracy,
    bestAttempt: overallBestAttempt,
    attemptedMockIds,
    nextUnattemptedMockIndex: isAllAttempted ? 1 : nextUnattemptedMockIndex,
    isAllAttempted,
    hasAttempts,
    formattedScore,
    helperText,
  };
}
