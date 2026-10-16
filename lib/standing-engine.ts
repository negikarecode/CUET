import { RecordedTestAttempt } from "@/types";
import { isFullLengthMockAttempt } from "@/lib/mock-stats";
import { deduplicateTestAttempts } from "@/lib/analytics";
import {
  STANDING_CONFIG,
  CategoryCode,
  ChanceBand,
  CHANCE_BANDS,
  ChanceBandInfo,
} from "@/lib/config/standingConfig";

// Load normalized datasets from lib/data/standing
import canonicalCoursesData from "@/lib/data/standing/canonical_courses.json";
import canonicalSubjectsData from "@/lib/data/standing/canonical_subjects.json";
import normalizedCutoffsData from "@/lib/data/standing/normalized_cutoffs.json";

export interface CanonicalSubjectInfo {
  id: string;
  name: string;
  code: string;
  type: string;
}

export interface CourseCombinationRule {
  type: "required" | "one_of" | "best_of";
  subjects: string[];
  count: number;
  label?: string;
}

export interface CourseCombination {
  id: string;
  label: string;
  rules: CourseCombinationRule[];
}

export interface CanonicalCourse {
  id: string;
  name: string;
  stream: "science" | "commerce" | "humanities" | "general";
  degreeType: string;
  cutoffScale: number;
  subjectCount: number;
  combinations: CourseCombination[];
}

export interface NormalizedCutoffRecord {
  university: string;
  college: string;
  raw_college: string;
  course: string;
  canonical_course_id: string;
  canonical_course_name: string;
  stream: string;
  year: number;
  category: CategoryCode;
  round: string;
  cutoff_value: number;
  cutoff_max: number;
  source_file: string;
}

export interface UserSubjectPerformance {
  subjectId: string;
  subjectName: string;
  answeredQuestions: number;
  validSessionsCount: number;
  excludedLowEffortCount: number;
  averageMarks: number; // arithmetic mean of marks across completed mock-tests
  maxMarks: number; // standard subject max marks (normally 250)
  rawAveragePercentage?: number;
  weightedPercentage?: number;
  hasSufficientData: boolean;
  status: "valid" | "insufficient_data" | "no_attempts";
}

export interface ResolvedSubjectChoice {
  subjectId: string;
  subjectName: string;
  ruleType: "required" | "one_of" | "best_of";
  hasData: boolean;
  averageMarks: number | null; // arithmetic mean marks out of maxMarks, e.g. 36.8
  maxMarks: number; // 250
  targetMarks: number; // equal-share or weighted target marks, e.g. 106.5
  marksNeeded: number; // max(0, targetMarks - (averageMarks ?? 0))
  answeredQuestions: number;
  isBestOptionChosen?: boolean;
  userPercentage?: number | null;
}

export interface CourseResolutionResult {
  course: CanonicalCourse;
  chosenCombination: CourseCombination;
  resolvedSubjects: ResolvedSubjectChoice[];
  totalRequiredCount: number;
  subjectsWithDataCount: number;
  coverage: number; // 0.0 to 1.0 (subjectsWithDataCount / totalRequiredCount)
  isComplete: boolean; // subjectsWithDataCount === totalRequiredCount
  isBelowCoverageThreshold: boolean;
  hasNoData: boolean;
  combinedAverageMarks: number | null; // sum of averageMarks if isComplete, else null!
  standingStatus: "complete" | "incomplete" | "no_data";
  standingLabel: string; // "Incomplete — awaiting remaining subjects" when incomplete
  participatingSubjectNames: string[];
  missingSubjectNames: string[];
  userPct?: number | null;
}

export interface MultiYearCutoffStats {
  college: string;
  courseId: string;
  category: CategoryCode;
  cutoffScale: number;
  years: number[];
  latestYear: number;
  latestValue: number; // in marks, e.g. 319.5
  averageMarks: number; // arithmetic mean of yearly cutoffs in marks
  minMarks: number;
  maxMarks: number;
  trend: "rising" | "falling" | "stable" | "not enough years";
  trendDeltaMarks: number | null;
  expectedRange: {
    lowMarks: number;
    highMarks: number;
    midpointMarks: number;
    lowPct?: number;
    highPct?: number;
    midpointPct?: number;
  };
  yearlyData: Array<{
    year: number;
    cutoffValue: number; // in marks
    cutoffMax: number;   // scale
    cutoffPct?: number;
  }>;
  latestPercentage?: number;
  averagePercentage?: number;
  minPercentage?: number;
  maxPercentage?: number;
  trendDeltaPercentage?: number | null;
  projectedCutoffMarks?: number;
  projectedYear?: number;
  projectedBasis?: string;
  projectedRange?: {
    low: number;
    high: number;
    label: string;
  };
}

export interface CollegeStandingResult {
  collegeName: string;
  universityName: string;
  courseName: string;
  category: CategoryCode;
  cutoffScale: number;
  cutoffMarks: number; // expected cutoff marks, e.g. 319.5
  projectedCutoffMarks?: number; // trend projected cutoff, e.g. 574.5
  projectedBasis?: string;
  projectedRangeDisplay?: string;
  cutoffDisplay: string; // e.g. "319.5/750 marks"
  cutoffRangeDisplay: string; // e.g. "310.0 - 330.0/750 marks"
  combinedAverageMarks: number | null; // null if incomplete
  marksGap: number | null; // cutoffMarks - combinedAverageMarks (null if incomplete)
  status: "above_cutoff" | "below_cutoff" | "incomplete" | "no_data";
  statusLabel: string; // "Incomplete — awaiting remaining subjects", "10 marks above cutoff", "25 marks below cutoff"
  gapDisplay: string; // "10 marks above cutoff", "25 marks below cutoff", "Awaiting all subjects"
  isComplete: boolean;
  hasNoData: boolean;
  reasoning: string;
  multiYearStats: MultiYearCutoffStats;
  expectedRange: {
    lowMarks: number;
    highMarks: number;
    midpointMarks: number;
    lowPct?: number;
    highPct?: number;
    midpointPct?: number;
  };
  // Legacy compatibility fields
  band?: ChanceBand;
  bandInfo?: ChanceBandInfo;
  userPct?: number | null;
  gapPercentagePoints?: number;
  gapMarks?: number;
  coverage?: number;
  isRoughEstimate?: boolean;
}

export interface DreamCollegeGapAnalysis {
  targetCollege: string;
  targetCourse: string;
  category: CategoryCode;
  cutoffScale: number;
  expectedCutoffMarks: number; // e.g. 319.5
  cutoffDisplay: string; // e.g. "319.5/750 marks"
  isComplete: boolean;
  hasNoData: boolean;
  status: "above_cutoff" | "below_cutoff" | "incomplete" | "no_data";
  statusLabel: string; // "Incomplete — awaiting remaining subjects", "10 marks above cutoff", "25 marks below cutoff"
  combinedMarks: number | null; // sum of subject averages if complete, else null
  combinedMarksDisplay: string; // e.g. "300.0/750 marks" or "Incomplete"
  marksGap: number | null; // cutoffMarks - combinedMarks (null if incomplete)
  gapDisplay: string; // "10 marks above cutoff", "25 marks below cutoff", or "Awaiting all subjects"
  summaryMessage: string;
  actionGuidance: string[];
  subjectImprovementBreakdown: Array<{
    subjectId: string;
    subjectName: string;
    hasData: boolean;
    currentMarks: number | null; // arithmetic mean, e.g. 36.8
    subjectMaxMarks: number; // 250
    currentPerformanceDisplay: string; // "36.8/250 marks" or "No data yet"
    targetMarks: number; // e.g. 106.5
    targetMarksDisplay: string; // "106.5/250 marks"
    marksNeeded: number; // max(0, targetMarks - (currentMarks ?? 0))
    marksNeededDisplay: string; // "70 marks" or "Target met"
  }>;
  // Legacy compatibility fields
  expectedCutoffPct?: number;
  userPct?: number | null;
  userEquivalentMarks?: number | null;
  gapPercentagePoints?: number;
  gapMarks?: number;
  band?: ChanceBand;
  coverage?: number;
}

// ---------------------------------------------------------------------------
// 1. Data Access & Subject Normalization Helpers
// ---------------------------------------------------------------------------

export const CANONICAL_COURSES_MAP: Record<string, CanonicalCourse> = (
  canonicalCoursesData as CanonicalCourse[]
).reduce((acc, c) => ({ ...acc, [c.id]: c }), {});

export const CANONICAL_SUBJECTS_MAP: Record<string, CanonicalSubjectInfo> =
  canonicalSubjectsData as Record<string, CanonicalSubjectInfo>;

export const NORMALIZED_CUTOFFS: NormalizedCutoffRecord[] =
  normalizedCutoffsData as NormalizedCutoffRecord[];

/**
 * Normalizes user subject name/key to canonical subject ID
 */
export function normalizeSubjectToKey(rawSubject: string): string {
  if (!rawSubject) return "unknown";
  const clean = rawSubject.toLowerCase().trim().replace(/[-_]/g, " ");

  if (clean.includes("physic")) return "physics";
  if (clean.includes("chem")) return "chemistry";
  if (clean.includes("math")) return "maths";
  if (clean.includes("bio")) return "bio";
  if (clean.includes("account") || clean.includes("accs")) return "accs";
  if (clean.includes("econ") || clean.includes("eco")) return "eco";
  if (clean.includes("business") || clean.includes("bst")) return "bst";
  if (clean.includes("hist")) return "history";
  if (clean.includes("pol") || clean.includes("political")) return "pol science";
  if (clean.includes("geo")) return "geo";
  if (clean.includes("psych")) return "psychology";
  if (clean.includes("socio")) return "sociology";
  if (clean.includes("eng")) return "english";
  if (clean.includes("hind")) return "hindi";
  if (clean.includes("comp") || clean.includes("cs") || clean.includes("ip")) return "computer_science";
  if (clean.includes("pe") || clean.includes("physical edu")) return "physical_education";
  if (clean.includes("general") || clean.includes("gat")) return "general_test";
  if (clean.includes("sanskrit")) return "sanskrit";
  if (clean.includes("environ") || clean.includes("evs")) return "environmental_studies";
  if (clean.includes("fine art") || clean.includes("visual art")) return "fine_arts";

  return clean.replace(/\s+/g, "_");
}

export const KNOWN_COLLEGE_ACRONYMS: Record<string, string> = {
  srcc: "Shri Ram College of Commerce",
  lsr: "Lady Shri Ram College for Women (W)",
  arsd: "Atma Ram Sanatan Dharma College",
  dcac: "Delhi College of Arts and Commerce",
  cvs: "College of Vocational Studies",
  sgtb: "Sri Guru Tegh Bahadur Khalsa College",
  kmc: "Kirori Mal College",
  dduc: "Deen Dayal Upadhyaya College",
  andc: "Acharya Narendra Dev College",
  jmc: "Jesus and Mary College (W)",
  ipcw: "Indraprastha College for Women (W)",
  stephens: "St. Stephen's College",
  venky: "Sri Venketeswara College",
  venkateswara: "Sri Venketeswara College",
  venketeswara: "Sri Venketeswara College",
  bhu: "Banaras Hindu University",
  jnu: "Jawaharlal Nehru University",
};

/**
 * Resolves a user dream college string to the canonical college name in NORMALIZED_CUTOFFS.
 */
export function resolveTargetCollegeMatch(userCollege: string): string | null {
  if (!userCollege) return null;
  const raw = userCollege.toLowerCase().trim();

  // 1. Direct acronym match or acronym in parenthetical
  const stripped = raw.replace(/[^a-z]/g, "");
  if (KNOWN_COLLEGE_ACRONYMS[stripped]) {
    return KNOWN_COLLEGE_ACRONYMS[stripped];
  }
  for (const [acr, col] of Object.entries(KNOWN_COLLEGE_ACRONYMS)) {
    if (raw.includes(acr) || raw.includes(`(${acr})`)) {
      return col;
    }
  }

  const allColleges = Array.from(new Set(NORMALIZED_CUTOFFS.map((r) => r.college)));

  const cleanInput = userCollege
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[-_]/g, " ")
    .trim();

  // 2. Exact match (case insensitive)
  const exact = allColleges.find((c) => c.toLowerCase() === userCollege.toLowerCase().trim());
  if (exact) return exact;

  // 3. Exact match on cleaned name
  const cleanExact = allColleges.find((c) => {
    const cleanC = c.toLowerCase().replace(/\(.*?\)/g, "").replace(/[-_]/g, " ").trim();
    return cleanC === cleanInput;
  });
  if (cleanExact) return cleanExact;

  // 4. One includes the other
  const includesMatch = allColleges.find((c) => {
    const cleanC = c.toLowerCase().replace(/\(.*?\)/g, "").replace(/[-_]/g, " ").trim();
    return cleanInput.includes(cleanC) || cleanC.includes(cleanInput);
  });
  if (includesMatch) return includesMatch;

  // 5. Token overlap without stopwords
  const stopWords = new Set(["college", "for", "women", "university", "institute", "department", "of", "the", "and"]);
  const inputTokens = cleanInput.split(/\s+/).filter((t) => t.length > 2 && !stopWords.has(t));
  let bestCandidate: string | null = null;
  let maxMatchedTokens = 0;
  for (const c of allColleges) {
    const cTokens = c.toLowerCase().split(/\s+/).filter((t) => t.length > 2 && !stopWords.has(t));
    const matchedCount = inputTokens.filter((t) => cTokens.some((ct) => ct.includes(t) || t.includes(ct))).length;
    if (matchedCount > maxMatchedTokens && matchedCount >= 1) {
      maxMatchedTokens = matchedCount;
      bestCandidate = c;
    }
  }

  return bestCandidate;
}

/**
 * Matches a user target course string to a canonical course ID.
 */
export function matchCourseToId(
  courseNameOrId: string,
  courses: CanonicalCourse[] = Object.values(CANONICAL_COURSES_MAP)
): string | null {
  if (!courseNameOrId) return null;
  const raw = courseNameOrId.toLowerCase().trim();

  // 1. Direct ID match
  const byId = courses.find((c) => c.id.toLowerCase() === raw);
  if (byId) return byId.id;

  // 2. Exact name match
  const byName = courses.find((c) => c.name.toLowerCase() === raw);
  if (byName) return byName.id;

  // 3. Clean alphanumeric substring match
  const clean = raw.replace(/[^a-z0-9]/g, "");
  const byClean = courses.find((c) => {
    const cClean = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    return cClean.includes(clean) || clean.includes(cClean);
  });
  if (byClean) return byClean.id;

  return null;
}

// ---------------------------------------------------------------------------
// 2. Target Marks Calculation Helper
// ---------------------------------------------------------------------------

/**
 * Calculates equal-share or proportional target marks for a subject in a course combination.
 * For equal weighting (composite scale === totalCount * subjectMax), calculates cutoffMarks / totalCount.
 * For unequal weighting, calculates cutoffMarks * (subjectMax / cutoffScale).
 */
export function calculateSubjectTargetMarks(
  cutoffMarks: number,
  cutoffScale: number,
  subjectMaxMarks: number = STANDING_CONFIG.MAX_MARKS_PER_SUBJECT,
  totalSubjectCount: number = 3
): number {
  if (totalSubjectCount > 0 && cutoffScale === totalSubjectCount * subjectMaxMarks) {
    // Standard equally weighted CUET papers: exact equal division
    return Math.round((cutoffMarks / totalSubjectCount) * 10) / 10;
  }
  if (cutoffScale > 0) {
    // Proportional weighting based on paper maximum
    return Math.round((cutoffMarks * (subjectMaxMarks / cutoffScale)) * 10) / 10;
  }
  return totalSubjectCount > 0 ? Math.round((cutoffMarks / totalSubjectCount) * 10) / 10 : 0;
}

// ---------------------------------------------------------------------------
// 3. User Subject Performance Evaluator
// ---------------------------------------------------------------------------

/**
 * Computes deterministic user performance per subject from all recorded sessions.
 * Calculates arithmetic mean of marks across completed mock-test scores.
 * Marks subjects with fewer than MIN_ANSWERED_QUESTIONS_PER_SUBJECT as insufficient_data.
 */
export function computeUserSubjectPerformance(
  attempts: RecordedTestAttempt[],
  options?: {
    minAnsweredQuestions?: number;
    decayFactor?: number;
    scoreAdjustmentFactor?: number;
  }
): Record<string, UserSubjectPerformance> {
  const minQuestions = options?.minAnsweredQuestions ?? STANDING_CONFIG.MIN_ANSWERED_QUESTIONS_PER_SUBJECT;

  // Deduplicate attempts and filter ONLY full-length domain mock sessions
  const cleanAttempts = deduplicateTestAttempts(attempts || []);

  // Group attempts by normalized subject key
  const subjectSessionsMap: Record<
    string,
    Array<{
      attempt: RecordedTestAttempt;
      marks: number;
      maxMarks: number;
      answeredCount: number;
      isValid: boolean;
      submittedAtMs: number;
    }>
  > = {};

  for (const att of cleanAttempts) {
    if (!isFullLengthMockAttempt(att)) continue;

    const rawSubj = att.subject || att.testTitle || "";
    const subjKey = normalizeSubjectToKey(rawSubj);

    const questionsList = att.questions || [];
    const answeredCount =
      questionsList.length > 0
        ? questionsList.filter((q) => q.selectedOption !== null && q.selectedOption !== undefined).length
        : att.attemptedCount || 0;

    const maxMarks = att.maxMarks > 0 ? att.maxMarks : STANDING_CONFIG.MAX_MARKS_PER_SUBJECT;
    // Score in marks according to CUET (+5 correct, -1 incorrect)
    const marks = att.totalMarks !== undefined ? att.totalMarks : (att.correctCount * 5 - (att.incorrectCount || 0) * 1);
    const submittedAtMs = att.submittedAt ? new Date(att.submittedAt).getTime() : 0;

    if (!subjectSessionsMap[subjKey]) {
      subjectSessionsMap[subjKey] = [];
    }

    subjectSessionsMap[subjKey]!.push({
      attempt: att,
      marks,
      maxMarks,
      answeredCount,
      isValid: true,
      submittedAtMs,
    });
  }

  const result: Record<string, UserSubjectPerformance> = {};

  // Initialize for all known canonical subjects
  for (const [sKey, sMeta] of Object.entries(CANONICAL_SUBJECTS_MAP)) {
    result[sKey] = {
      subjectId: sKey,
      subjectName: sMeta.name,
      answeredQuestions: 0,
      validSessionsCount: 0,
      excludedLowEffortCount: 0,
      averageMarks: 0,
      maxMarks: STANDING_CONFIG.MAX_MARKS_PER_SUBJECT,
      rawAveragePercentage: 0,
      weightedPercentage: 0,
      hasSufficientData: false,
      status: "no_attempts",
    };
  }

  // Calculate arithmetic mean marks for subjects that have user attempts
  for (const [sKey, sessions] of Object.entries(subjectSessionsMap)) {
    const sorted = [...sessions].sort((a, b) => b.submittedAtMs - a.submittedAtMs);
    const validSessions = sorted.filter((s) => s.isValid);

    const totalAnswered = validSessions.reduce((sum, s) => sum + s.answeredCount, 0);
    const totalMarks = validSessions.reduce((sum, s) => sum + s.marks, 0);

    // Arithmetic mean of user's eligible completed mock scores
    const averageMarks = validSessions.length > 0
      ? Math.round((totalMarks / validSessions.length) * 10) / 10
      : 0;

    const subjMax = validSessions[0]?.maxMarks || STANDING_CONFIG.MAX_MARKS_PER_SUBJECT;
    const rawPct = subjMax > 0 ? Math.round((averageMarks / subjMax) * 1000) / 10 : 0;

    const hasSufficientData = totalAnswered >= minQuestions && validSessions.length > 0;
    const metaName = CANONICAL_SUBJECTS_MAP[sKey]?.name || sKey;

    result[sKey] = {
      subjectId: sKey,
      subjectName: metaName,
      answeredQuestions: totalAnswered,
      validSessionsCount: validSessions.length,
      excludedLowEffortCount: 0,
      averageMarks,
      maxMarks: subjMax,
      rawAveragePercentage: rawPct,
      weightedPercentage: rawPct,
      hasSufficientData,
      status: hasSufficientData
        ? "valid"
        : validSessions.length > 0
        ? "insufficient_data"
        : "no_attempts",
    };
  }

  return result;
}

// ---------------------------------------------------------------------------
// 4. Course Requirement Resolution
// ---------------------------------------------------------------------------

/**
 * Resolves required subjects for a course based on its combinations and student's valid scores.
 * Picks the optimal combination and best-scoring subjects for the user.
 * Missing subjects are NOT treated as zero. Never fabricates an overall score for incomplete data.
 */
export function resolveCourseRequirements(
  courseId: string,
  userPerformance: Record<string, UserSubjectPerformance>,
  targetCombinationId?: string,
  cutoffMarks?: number
): CourseResolutionResult {
  const course = CANONICAL_COURSES_MAP[courseId] || CANONICAL_COURSES_MAP["bcom_hons"]!;
  const combinations = course.combinations || [];

  if (combinations.length === 0) {
    return {
      course,
      chosenCombination: { id: "default", label: "Default", rules: [] },
      resolvedSubjects: [],
      totalRequiredCount: course.subjectCount || 4,
      subjectsWithDataCount: 0,
      coverage: 0,
      isComplete: false,
      isBelowCoverageThreshold: true,
      hasNoData: true,
      combinedAverageMarks: null,
      standingStatus: "no_data",
      standingLabel: "No attempts recorded",
      participatingSubjectNames: [],
      missingSubjectNames: [],
      userPct: null,
    };
  }

  interface CombEvaluation {
    combination: CourseCombination;
    resolved: ResolvedSubjectChoice[];
    totalRequired: number;
    subjectsWithData: number;
    coverage: number;
    isComplete: boolean;
    combinedAverageMarks: number | null;
  }

  const evaluatedCombos: CombEvaluation[] = combinations.map((comb) => {
    const resolved: ResolvedSubjectChoice[] = [];
    const usedSubjectKeys = new Set<string>();

    for (const rule of comb.rules) {
      if (rule.type === "required") {
        for (const subKey of rule.subjects) {
          if (!usedSubjectKeys.has(subKey)) {
            usedSubjectKeys.add(subKey);
            const perf = userPerformance[subKey];
            const hasData = Boolean(perf && (perf.hasSufficientData || perf.validSessionsCount > 0));
            const maxMarks = perf?.maxMarks || STANDING_CONFIG.MAX_MARKS_PER_SUBJECT;
            const averageMarks = hasData && perf
              ? (perf.averageMarks !== undefined
                  ? perf.averageMarks
                  : perf.rawAveragePercentage !== undefined
                  ? Math.round(((perf.rawAveragePercentage * maxMarks) / 100) * 10) / 10
                  : null)
              : null;

            resolved.push({
              subjectId: subKey,
              subjectName: perf?.subjectName || CANONICAL_SUBJECTS_MAP[subKey]?.name || subKey,
              ruleType: "required",
              hasData,
              averageMarks,
              maxMarks,
              targetMarks: 0,
              marksNeeded: 0,
              answeredQuestions: perf?.answeredQuestions || 0,
              userPercentage: perf ? perf.rawAveragePercentage : null,
            });
          }
        }
      } else if (rule.type === "one_of" || rule.type === "best_of") {
        const candidates = rule.subjects.filter((s) => !usedSubjectKeys.has(s));

        const rankedCandidates = candidates.map((subKey) => {
          const perf = userPerformance[subKey];
          const hasData = Boolean(perf && (perf.hasSufficientData || perf.validSessionsCount > 0));
          const maxM = perf?.maxMarks || STANDING_CONFIG.MAX_MARKS_PER_SUBJECT;
          const candidateMarks = hasData && perf
            ? (perf.averageMarks !== undefined
                ? perf.averageMarks
                : ((perf.rawAveragePercentage ?? 0) * maxM) / 100)
            : -1;
          return {
            subKey,
            perf,
            hasData,
            marks: candidateMarks,
          };
        });

        rankedCandidates.sort((a, b) => {
          if (a.hasData && !b.hasData) return -1;
          if (!a.hasData && b.hasData) return 1;
          return b.marks - a.marks;
        });

        const countToPick = Math.min(rule.count, rankedCandidates.length);
        const picked = rankedCandidates.slice(0, countToPick);

        for (const item of picked) {
          usedSubjectKeys.add(item.subKey);
          const maxMarks = item.perf?.maxMarks || STANDING_CONFIG.MAX_MARKS_PER_SUBJECT;
          const itemAverageMarks = item.hasData && item.perf
            ? (item.perf.averageMarks !== undefined
                ? item.perf.averageMarks
                : Math.round((((item.perf.rawAveragePercentage ?? 0) * maxMarks) / 100) * 10) / 10)
            : null;
          resolved.push({
            subjectId: item.subKey,
            subjectName: item.perf?.subjectName || CANONICAL_SUBJECTS_MAP[item.subKey]?.name || item.subKey,
            ruleType: rule.type,
            hasData: item.hasData,
            averageMarks: itemAverageMarks,
            maxMarks,
            targetMarks: 0,
            marksNeeded: 0,
            answeredQuestions: item.perf?.answeredQuestions || 0,
            isBestOptionChosen: true,
            userPercentage: item.perf ? item.perf.rawAveragePercentage : null,
          });
        }
      }
    }

    const totalRequired = course.subjectCount || resolved.length || 4;
    const subjectsWithData = resolved.filter((s) => s.hasData).length;
    const coverage = totalRequired > 0 ? Math.round((subjectsWithData / totalRequired) * 100) / 100 : 0;
    const isComplete = subjectsWithData === totalRequired;

    // Calculate subject target marks and marks needed
    const effectiveCutoff = cutoffMarks ?? course.cutoffScale;
    resolved.forEach((sub) => {
      sub.targetMarks = calculateSubjectTargetMarks(effectiveCutoff, course.cutoffScale, sub.maxMarks, totalRequired);
      sub.marksNeeded = sub.hasData && sub.averageMarks !== null
        ? Math.max(0, Math.round((sub.targetMarks - sub.averageMarks) * 10) / 10)
        : sub.targetMarks;
    });

    // Combined average marks is ONLY calculated when ALL required subjects have data!
    // Never fabricate an overall score for incomplete subject data!
    const combinedAverageMarks = isComplete
      ? Math.round(resolved.reduce((sum, s) => sum + (s.averageMarks || 0), 0) * 10) / 10
      : null;

    return {
      combination: comb,
      resolved,
      totalRequired,
      subjectsWithData,
      coverage,
      isComplete,
      combinedAverageMarks,
    };
  });

  let chosen = evaluatedCombos[0]!;
  if (targetCombinationId) {
    const found = evaluatedCombos.find((c) => c.combination.id === targetCombinationId);
    if (found) chosen = found;
  } else {
    evaluatedCombos.sort((a, b) => {
      if (b.subjectsWithData !== a.subjectsWithData) return b.subjectsWithData - a.subjectsWithData;
      const bMarksSum = b.resolved.filter((s) => s.hasData).reduce((sum, s) => sum + (s.averageMarks || 0), 0);
      const aMarksSum = a.resolved.filter((s) => s.hasData).reduce((sum, s) => sum + (s.averageMarks || 0), 0);
      return bMarksSum - aMarksSum;
    });
    chosen = evaluatedCombos[0]!;
  }

  const participatingSubjectNames = chosen.resolved
    .filter((s) => s.hasData)
    .map((s) => s.subjectName);

  const missingSubjectNames = chosen.resolved
    .filter((s) => !s.hasData)
    .map((s) => s.subjectName);

  const isBelowCoverageThreshold =
    chosen.coverage < STANDING_CONFIG.COVERAGE_CONFIDENCE_THRESHOLD;

  const standingStatus: "complete" | "incomplete" | "no_data" =
    chosen.subjectsWithData === 0 ? "no_data" : chosen.isComplete ? "complete" : "incomplete";

  const standingLabel = chosen.isComplete
    ? "Complete"
    : chosen.subjectsWithData === 0
    ? "No attempts recorded"
    : "Incomplete — awaiting remaining subjects";

  // Legacy userPct calculation for backward compatibility
  const validScores = chosen.resolved
    .filter((s) => s.hasData && s.userPercentage !== null && s.userPercentage !== undefined)
    .map((s) => s.userPercentage!);
  const userPct = validScores.length > 0 ? Math.round((validScores.reduce((a, b) => a + b, 0) / validScores.length) * 10) / 10 : null;

  return {
    course,
    chosenCombination: chosen.combination,
    resolvedSubjects: chosen.resolved,
    totalRequiredCount: chosen.totalRequired,
    subjectsWithDataCount: chosen.subjectsWithData,
    coverage: chosen.coverage,
    isComplete: chosen.isComplete,
    isBelowCoverageThreshold,
    hasNoData: chosen.subjectsWithData === 0,
    combinedAverageMarks: chosen.combinedAverageMarks,
    standingStatus,
    standingLabel,
    participatingSubjectNames,
    missingSubjectNames,
    userPct,
  };
}

// ---------------------------------------------------------------------------
// 5. Multi-Year Cutoff Statistical Analysis
// ---------------------------------------------------------------------------

/**
 * Computes statistical cutoff metrics in marks across available years for a college + course + category.
 */
export function computeMultiYearCutoff(
  collegeName: string,
  courseId: string,
  category: CategoryCode = STANDING_CONFIG.DEFAULT_CATEGORY,
  filterYear?: number
): MultiYearCutoffStats | null {
  const records = NORMALIZED_CUTOFFS.filter(
    (r) =>
      r.college.toLowerCase().trim() === collegeName.toLowerCase().trim() &&
      r.canonical_course_id === courseId &&
      r.category === category &&
      (filterYear === undefined || r.year === filterYear)
  );

  if (records.length === 0) {
    return null;
  }

  records.sort((a, b) => a.year - b.year);

  const years = records.map((r) => r.year);
  const cutoffScale = records[0]!.cutoff_max || 1000;

  const yearlyData = records.map((r) => ({
    year: r.year,
    cutoffValue: Math.round(r.cutoff_value * 10) / 10,
    cutoffMax: r.cutoff_max,
    cutoffPct: Math.round((r.cutoff_value / r.cutoff_max) * 1000) / 10,
  }));

  const values = yearlyData.map((y) => y.cutoffValue);
  const latestRecord = yearlyData[yearlyData.length - 1]!;
  const latestYear = latestRecord.year;
  const latestValue = latestRecord.cutoffValue;

  const minMarks = Math.min(...values);
  const maxMarks = Math.max(...values);
  const averageMarks = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;

  let trend: "rising" | "falling" | "stable" | "not enough years" = "not enough years";
  let trendDeltaMarks: number | null = null;

  if (yearlyData.length >= 2) {
    const first = yearlyData[0]!.cutoffValue;
    const last = yearlyData[yearlyData.length - 1]!.cutoffValue;
    trendDeltaMarks = Math.round((last - first) * 10) / 10;
    if (trendDeltaMarks > 5) trend = "rising";
    else if (trendDeltaMarks < -5) trend = "falling";
    else trend = "stable";
  }

  let rangeLowMarks: number;
  let rangeHighMarks: number;

  if (yearlyData.length === 1) {
    // Single year: widen range by +/- 2.5% of cutoff scale
    const delta = cutoffScale * 0.025;
    rangeLowMarks = Math.max(0, Math.round((latestValue - delta) * 10) / 10);
    rangeHighMarks = Math.min(cutoffScale, Math.round((latestValue + delta) * 10) / 10);
  } else {
    // Multiple years: use min & max with margin expansion
    const spread = maxMarks - minMarks;
    const margin = Math.max(cutoffScale * 0.015, spread * 0.15);
    rangeLowMarks = Math.max(0, Math.round((minMarks - margin) * 10) / 10);
    rangeHighMarks = Math.min(cutoffScale, Math.round((maxMarks + margin) * 10) / 10);
  }

  const midpointMarks = Math.round(((rangeLowMarks + rangeHighMarks) / 2) * 10) / 10;

  // Linear trend extrapolation for next admission cycle (e.g. 2027)
  let projectedCutoffMarks: number;
  const projectedYear: number = latestYear + 1;
  let projectedBasis: string;
  let projectedRange: { low: number; high: number; label: string };

  if (yearlyData.length < 3) {
    projectedCutoffMarks = latestValue;
    projectedBasis = "Based on the latest cutoff";
    const delta = Math.max(6, cutoffScale * 0.02);
    const low = Math.max(0, Math.round(latestValue - delta));
    const high = Math.min(cutoffScale, Math.round(latestValue + delta));
    projectedRange = {
      low,
      high,
      label: `Likely range ${low} - ${high}`,
    };
  } else {
    const n = yearlyData.length;
    const meanX = yearlyData.reduce((sum, d) => sum + d.year, 0) / n;
    const meanY = yearlyData.reduce((sum, d) => sum + d.cutoffValue, 0) / n;

    let numerator = 0;
    let denominator = 0;
    for (const d of yearlyData) {
      const diffX = d.year - meanX;
      const diffY = d.cutoffValue - meanY;
      numerator += diffX * diffY;
      denominator += diffX * diffX;
    }

    const slope = denominator !== 0 ? numerator / denominator : 0;
    const intercept = meanY - slope * meanX;
    let rawProj = slope * projectedYear + intercept;

    // Never project below latest year if trend is rising
    if (slope > 0 && rawProj < latestValue) {
      rawProj = latestValue;
    }

    const clamped = Math.max(0, Math.min(cutoffScale, rawProj));
    projectedCutoffMarks = Math.round(clamped * 10) / 10;

    let totalDelta = 0;
    for (let i = 1; i < n; i++) {
      totalDelta += Math.abs(yearlyData[i]!.cutoffValue - yearlyData[i - 1]!.cutoffValue);
    }
    const avgYearDelta = totalDelta / (n - 1);
    const spreadMargin = Math.max(avgYearDelta, (maxMarks - minMarks) * 0.15, 6);

    const lowRange = Math.max(0, Math.round(projectedCutoffMarks - spreadMargin));
    const highRange = Math.min(cutoffScale, Math.round(projectedCutoffMarks + spreadMargin));

    projectedBasis = `Projected for ${projectedYear} · based on ${years[0]}-${latestYear} trend`;
    projectedRange = {
      low: lowRange,
      high: highRange,
      label: `Likely range ${lowRange} - ${highRange}`,
    };
  }

  // Percentage representations for legacy compatibility
  const latestPercentage = Math.round((latestValue / cutoffScale) * 1000) / 10;
  const averagePercentage = Math.round((averageMarks / cutoffScale) * 1000) / 10;
  const minPercentage = Math.round((minMarks / cutoffScale) * 1000) / 10;
  const maxPercentage = Math.round((maxMarks / cutoffScale) * 1000) / 10;
  const lowPct = Math.round((rangeLowMarks / cutoffScale) * 1000) / 10;
  const highPct = Math.round((rangeHighMarks / cutoffScale) * 1000) / 10;
  const midpointPct = Math.round((midpointMarks / cutoffScale) * 1000) / 10;
  const trendDeltaPercentage = trendDeltaMarks !== null ? Math.round((trendDeltaMarks / cutoffScale) * 1000) / 10 : null;

  return {
    college: collegeName,
    courseId,
    category,
    cutoffScale,
    years,
    latestYear,
    latestValue,
    averageMarks,
    minMarks,
    maxMarks,
    trend,
    trendDeltaMarks,
    expectedRange: {
      lowMarks: rangeLowMarks,
      highMarks: rangeHighMarks,
      midpointMarks,
      lowPct,
      highPct,
      midpointPct,
    },
    yearlyData,
    latestPercentage,
    averagePercentage,
    minPercentage,
    maxPercentage,
    trendDeltaPercentage,
    projectedCutoffMarks,
    projectedYear,
    projectedBasis,
    projectedRange,
  };
}

export interface ProjectedCutoffResult {
  projectedValue: number;
  projectedYear: number;
  basis: string;
  likelyRange: {
    low: number;
    high: number;
    label: string;
  };
  perSubjectTarget: number;
  isProjected: boolean;
  yearsCount: number;
  yearlyData: Array<{ year: number; cutoffValue: number }>;
}

/**
 * Shared authoritative helper for projected cutoffs across Dashboard, Where Do I Stand, and Homepage.
 */
export function getProjectedCutoff(
  collegeName: string,
  courseId: string,
  category: CategoryCode = STANDING_CONFIG.DEFAULT_CATEGORY
): ProjectedCutoffResult {
  const stats = computeMultiYearCutoff(collegeName, courseId, category);

  if (stats && stats.projectedCutoffMarks !== undefined && stats.projectedRange) {
    const proj = stats.projectedCutoffMarks;
    return {
      projectedValue: proj,
      projectedYear: stats.projectedYear || 2027,
      basis: stats.projectedBasis || `Projected for 2027 · based on trend`,
      likelyRange: stats.projectedRange,
      perSubjectTarget: Math.round((proj / 3) * 10) / 10,
      isProjected: (stats.years?.length || 0) >= 3,
      yearsCount: stats.years?.length || 0,
      yearlyData: stats.yearlyData || [],
    };
  }

  // Fallback if no matching records / no past cutoff data
  return {
    projectedValue: 0,
    projectedYear: 2027,
    basis: "No past cutoff data yet",
    likelyRange: {
      low: 0,
      high: 0,
      label: "No past cutoff data yet",
    },
    perSubjectTarget: 0,
    isProjected: false,
    yearsCount: 0,
    yearlyData: [],
  };
}

// ---------------------------------------------------------------------------
// 6. Legacy Chance Band Evaluator (Preserved for backward compatibility)
// ---------------------------------------------------------------------------

export function evaluateChanceBand(
  userPct: number | null,
  rangeLowPct: number,
  rangeHighPct: number
): ChanceBand {
  if (userPct === null || userPct === undefined) {
    return "Far";
  }

  const midpoint = (rangeLowPct + rangeHighPct) / 2;

  if (userPct >= rangeHighPct) {
    return "Safe";
  }
  if (userPct >= midpoint) {
    return "Likely";
  }
  if (userPct >= rangeLowPct) {
    return "Possible";
  }
  if (userPct >= rangeLowPct - STANDING_CONFIG.REACH_MARGIN_PERCENTAGE) {
    return "Reach";
  }
  return "Far";
}

// ---------------------------------------------------------------------------
// 7. Comprehensive College Standings Calculation (Marks-Only)
// ---------------------------------------------------------------------------

/**
 * Computes standing across all colleges offering the chosen course.
 * Standing is communicated strictly in marks. Incomplete subjects are never fabricated.
 */
export function computeCollegeStandings(params: {
  courseId: string;
  category?: CategoryCode;
  userAttempts: RecordedTestAttempt[];
  filterYear?: number;
  filterUniversity?: string;
  filterStatus?: "above_cutoff" | "below_cutoff" | "incomplete" | "all";
}): {
  resolution: CourseResolutionResult;
  userSubjectPerformance: Record<string, UserSubjectPerformance>;
  standings: CollegeStandingResult[];
  groupedByStatus: {
    aboveCutoff: CollegeStandingResult[];
    belowCutoff: CollegeStandingResult[];
    incomplete: CollegeStandingResult[];
  };
  groupedByBand: {
    likely: CollegeStandingResult[];
    possible: CollegeStandingResult[];
    reach: CollegeStandingResult[];
  };
  totalCollegesCount: number;
} {
  const {
    courseId,
    category = STANDING_CONFIG.DEFAULT_CATEGORY,
    userAttempts,
    filterYear,
    filterUniversity,
    filterStatus,
  } = params;

  const userSubjectPerformance = computeUserSubjectPerformance(userAttempts);
  const resolution = resolveCourseRequirements(courseId, userSubjectPerformance);

  const offeringColleges = Array.from(
    new Set(
      NORMALIZED_CUTOFFS.filter((r) => r.canonical_course_id === courseId).map(
        (r) => r.college
      )
    )
  );

  const standings: CollegeStandingResult[] = [];

  for (const college of offeringColleges) {
    const multiYear = computeMultiYearCutoff(college, courseId, category, filterYear);
    if (!multiYear) continue;

    const matchedRecord = NORMALIZED_CUTOFFS.find(
      (r) => r.college.toLowerCase().trim() === college.toLowerCase().trim() && r.canonical_course_id === courseId
    );
    const resolvedUniversity = matchedRecord?.university || "University of Delhi";

    if (filterUniversity && filterUniversity !== "all" && resolvedUniversity !== filterUniversity) {
      continue;
    }

    const cutoffScale = multiYear.cutoffScale;
    const cutoffMarks = multiYear.projectedCutoffMarks ?? multiYear.expectedRange.midpointMarks;
    const projectedCutoffMarks = multiYear.projectedCutoffMarks ?? cutoffMarks;
    const projectedBasis = multiYear.projectedBasis;
    const projectedRangeDisplay = multiYear.projectedRange?.label;
    const cutoffDisplay = `${cutoffMarks}/${cutoffScale} marks`;
    const cutoffRangeDisplay = `${multiYear.expectedRange.lowMarks} - ${multiYear.expectedRange.highMarks}/${cutoffScale} marks`;

    let status: "above_cutoff" | "below_cutoff" | "incomplete" | "no_data";
    let statusLabel: string;
    let gapDisplay: string;
    let marksGap: number | null = null;
    let combinedAverageMarks: number | null = null;

    if (resolution.hasNoData) {
      status = "no_data";
      statusLabel = "No attempts recorded";
      gapDisplay = "—";
    } else if (!resolution.isComplete) {
      status = "incomplete";
      statusLabel = "Incomplete — awaiting remaining subjects";
      gapDisplay = "Awaiting all subjects";
    } else {
      combinedAverageMarks = resolution.combinedAverageMarks!;
      marksGap = Math.round((cutoffMarks - combinedAverageMarks) * 10) / 10;
      if (marksGap > 0) {
        status = "below_cutoff";
        statusLabel = `${marksGap} marks below cutoff`;
        gapDisplay = `${marksGap} marks below cutoff`;
      } else {
        status = "above_cutoff";
        const above = Math.abs(marksGap);
        statusLabel = above === 0 ? "Meets cutoff" : `${above} marks above cutoff`;
        gapDisplay = above === 0 ? "0 marks (meets cutoff)" : `${above} marks above cutoff`;
      }
    }

    if (filterStatus && filterStatus !== "all" && status !== filterStatus) {
      continue;
    }

    const yearsStr = multiYear.years.join(", ");
    let reasoning = "";
    if (resolution.hasNoData) {
      reasoning = `No valid mock attempts recorded. Target admission cutoff is ${cutoffDisplay} based on ${yearsStr} admissions.`;
    } else if (!resolution.isComplete) {
      reasoning = `Incomplete data (${resolution.subjectsWithDataCount}/${resolution.totalRequiredCount} subjects completed). Official standing requires all required subjects. Expected cutoff: ${cutoffDisplay}.`;
    } else {
      reasoning = `Combined score is ${combinedAverageMarks}/${cutoffScale} marks (${gapDisplay}) against historical ${yearsStr} cutoff of ${cutoffDisplay}.`;
    }

    // Legacy chance band mapping for backward compatibility
    const legacyBand: ChanceBand = resolution.hasNoData
      ? "Far"
      : evaluateChanceBand(
          resolution.userPct ?? null,
          multiYear.expectedRange.lowPct ?? 70,
          multiYear.expectedRange.highPct ?? 80
        );

    standings.push({
      collegeName: college,
      universityName: resolvedUniversity,
      courseName: resolution.course.name,
      category,
      cutoffScale,
      cutoffMarks,
      projectedCutoffMarks,
      projectedBasis,
      projectedRangeDisplay,
      cutoffDisplay,
      cutoffRangeDisplay,
      combinedAverageMarks,
      marksGap,
      status,
      statusLabel,
      gapDisplay,
      isComplete: resolution.isComplete,
      hasNoData: resolution.hasNoData,
      reasoning,
      multiYearStats: multiYear,
      expectedRange: multiYear.expectedRange,
      band: legacyBand,
      bandInfo: CHANCE_BANDS[legacyBand],
      userPct: resolution.userPct,
      gapPercentagePoints: marksGap !== null && cutoffScale > 0 ? Math.max(0, Math.round((marksGap / cutoffScale) * 1000) / 10) : 0,
      gapMarks: marksGap !== null ? Math.max(0, marksGap) : cutoffMarks,
      coverage: resolution.coverage,
      isRoughEstimate: resolution.isBelowCoverageThreshold,
    });
  }

  // Sort standings by cutoffMarks descending
  standings.sort((a, b) => b.cutoffMarks - a.cutoffMarks);

  const groupedByStatus = {
    aboveCutoff: standings.filter((s) => s.status === "above_cutoff"),
    belowCutoff: standings.filter((s) => s.status === "below_cutoff"),
    incomplete: standings.filter((s) => s.status === "incomplete" || s.status === "no_data"),
  };

  const groupedByBand = {
    likely: groupedByStatus.aboveCutoff,
    possible: groupedByStatus.belowCutoff,
    reach: groupedByStatus.incomplete,
  };

  return {
    resolution,
    userSubjectPerformance,
    standings,
    groupedByStatus,
    groupedByBand,
    totalCollegesCount: standings.length,
  };
}

// ---------------------------------------------------------------------------
// 8. Dream College Gap Engine (Marks-Only)
// ---------------------------------------------------------------------------

/**
 * Computes marks-only gap analysis for a student's chosen dream college + course target.
 * Preserves the official cutoff and its scale.
 * When incomplete, displays available subject averages and marks needed without fabricating overall scores.
 * When complete, compares combined marks directly against official cutoff marks.
 */
export function computeDreamCollegeGap(params: {
  collegeName: string;
  courseId: string;
  category?: CategoryCode;
  userAttempts: RecordedTestAttempt[];
}): DreamCollegeGapAnalysis | null {
  const { collegeName, courseId, category = STANDING_CONFIG.DEFAULT_CATEGORY, userAttempts } = params;

  const multiYear = computeMultiYearCutoff(collegeName, courseId, category);
  if (!multiYear) return null;

  const cutoffScale = multiYear.cutoffScale;
  const expectedCutoffMarks = multiYear.projectedCutoffMarks ?? multiYear.expectedRange.midpointMarks;
  const cutoffDisplay = `${expectedCutoffMarks}/${cutoffScale} marks`;

  const userSubjectPerformance = computeUserSubjectPerformance(userAttempts);
  const resolution = resolveCourseRequirements(courseId, userSubjectPerformance, undefined, expectedCutoffMarks);

  const isComplete = resolution.isComplete;
  const hasNoData = resolution.hasNoData;

  // Calculate subject improvement breakdown in marks
  const subjectBreakdown = resolution.resolvedSubjects.map((sub) => {
    const targetMarks = calculateSubjectTargetMarks(
      expectedCutoffMarks,
      cutoffScale,
      sub.maxMarks,
      resolution.totalRequiredCount
    );
    const curMarks = sub.averageMarks;
    const marksNeeded = sub.hasData && curMarks !== null
      ? Math.max(0, Math.round((targetMarks - curMarks) * 10) / 10)
      : targetMarks;

    const currentPerformanceDisplay = sub.hasData && curMarks !== null
      ? `${curMarks}/${sub.maxMarks} marks`
      : "No data yet";
    const targetMarksDisplay = `${targetMarks}/${sub.maxMarks} marks`;
    const marksNeededDisplay = sub.hasData && curMarks !== null
      ? marksNeeded > 0 ? `${marksNeeded} marks needed` : "Target met"
      : "No data yet";

    return {
      subjectId: sub.subjectId,
      subjectName: sub.subjectName,
      hasData: sub.hasData,
      currentMarks: curMarks,
      subjectMaxMarks: sub.maxMarks,
      currentPerformanceDisplay,
      targetMarks,
      targetMarksDisplay,
      marksNeeded,
      marksNeededDisplay,
    };
  });

  let status: "above_cutoff" | "below_cutoff" | "incomplete" | "no_data";
  let statusLabel: string;
  let combinedMarks: number | null = null;
  let combinedMarksDisplay: string;
  let marksGap: number | null = null;
  let gapDisplay: string;
  let summaryMessage = "";
  const actionGuidance: string[] = [];

  if (hasNoData) {
    status = "no_data";
    statusLabel = "No attempts recorded";
    combinedMarks = null;
    combinedMarksDisplay = "No data yet";
    marksGap = null;
    gapDisplay = "No data yet";
    summaryMessage = `To target ${collegeName} (${resolution.course.name}), complete mocks in ${resolution.resolvedSubjects.map((s) => s.subjectName).join(", ")} to calibrate your baseline standing against the expected cutoff of ${cutoffDisplay}.`;
    actionGuidance.push(`Take an initial 50-question mock in ${resolution.resolvedSubjects[0]?.subjectName || "your core domain"}.`);
    actionGuidance.push(`Target at least ${subjectBreakdown[0]?.targetMarks || 100} / 250 marks (+5 / -1 marking scheme).`);
  } else if (!isComplete) {
    status = "incomplete";
    statusLabel = "Incomplete — awaiting remaining subjects";
    combinedMarks = null;
    combinedMarksDisplay = "Incomplete";
    marksGap = null;
    gapDisplay = "Awaiting all subjects";

    const availableSummary = subjectBreakdown
      .filter((s) => s.hasData && s.currentMarks !== null)
      .map((s) => `${s.subjectName} is ${s.currentMarks}/${s.subjectMaxMarks} marks (target: ${s.targetMarks} marks, ${s.marksNeeded} marks needed)`)
      .join("; ");

    summaryMessage = `Current performance on available subjects: ${availableSummary}. Complete mocks in remaining required subject(s): ${resolution.missingSubjectNames.join(", ")} to calculate your overall standing against the ${cutoffDisplay} cutoff.`;
    actionGuidance.push(`Take a mock in ${resolution.missingSubjectNames.join(", ")} to unlock your combined score.`);
    subjectBreakdown.filter((s) => s.hasData && s.marksNeeded > 0).forEach((s) => {
      actionGuidance.push(`Bridge the ${s.marksNeeded} marks gap in ${s.subjectName} to reach its target (${s.targetMarks} marks).`);
    });
  } else {
    // All required subjects available!
    combinedMarks = resolution.combinedAverageMarks!;
    combinedMarksDisplay = `${combinedMarks}/${cutoffScale} marks`;
    marksGap = Math.round((expectedCutoffMarks - combinedMarks) * 10) / 10;

    if (marksGap > 0) {
      status = "below_cutoff";
      statusLabel = `${marksGap} marks below cutoff`;
      gapDisplay = `${marksGap} marks below cutoff`;
      summaryMessage = `Your combined mock score is ${combinedMarksDisplay} against the expected cutoff of ${cutoffDisplay} (${marksGap} marks below cutoff). Increase your total score by ${marksGap} marks across your subjects to reach the admission threshold for ${collegeName}.`;
      actionGuidance.push(`Bridge the ${marksGap} marks gap across your ${resolution.totalRequiredCount} required subjects.`);
      actionGuidance.push("Target 3 to 4 additional correct questions per subject to eliminate negative deductions.");
    } else {
      status = "above_cutoff";
      const above = Math.abs(marksGap);
      statusLabel = above === 0 ? "Meets cutoff" : `${above} marks above cutoff`;
      gapDisplay = above === 0 ? "0 marks (meets cutoff)" : `${above} marks above cutoff`;
      summaryMessage = `Your combined mock score is ${combinedMarksDisplay}, which ${above === 0 ? "matches" : `is ${above} marks above`} the historical cutoff (${cutoffDisplay}) for ${collegeName}! Maintain consistency and avoid negative marking traps.`;
      actionGuidance.push("Focus on timed mock simulations to maintain accuracy under exam conditions.");
      actionGuidance.push("Review high-yield trap options to protect your score from negative marks.");
    }
  }

  // Legacy compatibility calculations
  const legacyTargetPct = Math.round((expectedCutoffMarks / cutoffScale) * 1000) / 10;
  const legacyUserPct = resolution.userPct ?? null;
  const legacyGapMarks = marksGap !== null ? Math.max(0, marksGap) : expectedCutoffMarks;
  const legacyGapPct = legacyUserPct !== null ? Math.max(0, Math.round((legacyTargetPct - legacyUserPct) * 10) / 10) : legacyTargetPct;
  const legacyBand = resolution.hasNoData
    ? "Far"
    : evaluateChanceBand(legacyUserPct, multiYear.expectedRange.lowPct ?? 70, multiYear.expectedRange.highPct ?? 80);

  return {
    targetCollege: collegeName,
    targetCourse: resolution.course.name,
    category,
    cutoffScale,
    expectedCutoffMarks,
    cutoffDisplay,
    isComplete,
    hasNoData,
    status,
    statusLabel,
    combinedMarks,
    combinedMarksDisplay,
    marksGap,
    gapDisplay,
    summaryMessage,
    actionGuidance,
    subjectImprovementBreakdown: subjectBreakdown,
    expectedCutoffPct: legacyTargetPct,
    userPct: legacyUserPct,
    userEquivalentMarks: combinedMarks,
    gapPercentagePoints: legacyGapPct,
    gapMarks: legacyGapMarks,
    band: legacyBand,
    coverage: resolution.coverage,
  };
}
