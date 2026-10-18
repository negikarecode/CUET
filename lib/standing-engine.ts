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
import collegesData from "@/lib/data/standing/colleges.json";

export interface CanonicalSubjectInfo {
  id: string;
  name: string;
  code: string;
  type: string;
}

export interface CourseCombinationRule {
  type: "required" | "one_of" | "best_of" | "qualifying";
  subjects: string[];
  count: number;
  label?: string;
  isCountedInCutoff?: boolean;
  qualifyingPercentage?: number;
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
  ruleType: "required" | "one_of" | "best_of" | "qualifying";
  isCountedInCutoff: boolean;
  roleLabel: string;
  hasData: boolean;
  averageMarks: number | null; // arithmetic mean marks out of maxMarks, e.g. 36.8
  maxMarks: number; // 250
  targetMarks: number; // equal-share or weighted target marks, e.g. 106.5
  marksNeeded: number; // max(0, targetMarks - (averageMarks ?? 0))
  answeredQuestions: number;
  isBestOptionChosen?: boolean;
  userPercentage?: number | null;
  qualifyingPercentage?: number;
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
  canonicalCollege?: string;
  isFallbackYear?: boolean;
  effectiveYear?: number;
  requestedYear?: number;
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
  canonicalCollegeName: string;
  targetCourse: string;
  courseId: string;
  category: CategoryCode;
  cutoffScale: number;
  expectedCutoffMarks: number; // e.g. 319.5
  cutoffDisplay: string; // e.g. "319.5/750 marks"
  cutoffYearLabel: string; // e.g. "2026 Official Cutoff" or "Projected for 2027"
  effectiveYear: number;
  isProjectedYear: boolean;
  isFallbackYear: boolean;
  isComplete: boolean;
  hasNoData: boolean;
  hasNoCutoffHistory: boolean;
  status: "above_cutoff" | "below_cutoff" | "incomplete" | "no_data";
  statusLabel: string; // "Incomplete — awaiting remaining subjects", "10 marks above cutoff", "25 marks below cutoff"
  combinedMarks: number | null; // sum of subject averages of counted subjects
  combinedMarksDisplay: string; // e.g. "300.0/750 marks" or "Incomplete"
  marksGap: number | null; // cutoffMarks - combinedMarks (null if incomplete)
  gapDisplay: string; // "10 marks above cutoff", "25 marks below cutoff", or "Awaiting all subjects"
  summaryMessage: string;
  actionGuidance: string[];
  emptyStateReason?: string;
  multiYearStats?: MultiYearCutoffStats;
  subjectImprovementBreakdown: Array<{
    subjectId: string;
    subjectName: string;
    hasData: boolean;
    isCountedInCutoff: boolean;
    roleLabel: string;
    currentMarks: number | null; // arithmetic mean, e.g. 36.8
    subjectMaxMarks: number; // 250
    currentPerformanceDisplay: string; // "36.8/250 marks" or "No score yet"
    targetMarks: number; // e.g. 106.5
    targetMarksDisplay: string; // "106.5/250 marks"
    marksNeeded: number; // max(0, targetMarks - (currentMarks ?? 0))
    marksNeededDisplay: string; // "70 marks" or "Target met"
    progressPercent: number;
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
  jmc: "Jesus & Mary College (W)",
  ipcw: "Indraprastha College for Women (W)",
  stephens: "St. Stephen's College",
  venky: "Sri Venketeswara College",
  venkateswara: "Sri Venketeswara College",
  venketeswara: "Sri Venketeswara College",
  sscbs: "Shaheed Sukhdev College Business Studies",
  hansraj: "Hansraj College",
  hindu: "Hindu College",
  ramjas: "Ramjas College",
  miranda: "Miranda House (W)",
  bhu: "Banaras Hindu University",
  jnu: "Jawaharlal Nehru University",
};

export function cleanCollegeString(s: string): string {
  if (!s) return "";
  return s
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/\b(of|for|the|and|in|at|w|women|college)\b/g, "")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Resolves any college name, acronym, or variant to canonical college in NORMALIZED_CUTOFFS.
 */
export function resolveCanonicalCutoffCollege(input: string): string | null {
  if (!input) return null;
  const raw = input.trim();
  const lower = raw.toLowerCase();

  const cutoffColleges = Array.from(new Set(NORMALIZED_CUTOFFS.map((r) => r.college)));

  // 1. Exact match (case insensitive)
  const exact = cutoffColleges.find((c) => c.toLowerCase() === lower);
  if (exact) return exact;

  // 2. Acronym lookup
  const strippedAlpha = lower.replace(/[^a-z]/g, "");
  if (KNOWN_COLLEGE_ACRONYMS[strippedAlpha]) {
    const acrTarget = KNOWN_COLLEGE_ACRONYMS[strippedAlpha];
    const m = cutoffColleges.find((c) => c.toLowerCase() === acrTarget.toLowerCase());
    if (m) return m;
  }
  for (const [acr, target] of Object.entries(KNOWN_COLLEGE_ACRONYMS)) {
    if (
      lower === acr ||
      lower.includes(`(${acr})`) ||
      lower.startsWith(`${acr} `) ||
      lower.endsWith(` ${acr}`)
    ) {
      const m = cutoffColleges.find((c) => c.toLowerCase() === target.toLowerCase());
      if (m) return m;
    }
  }

  // 3. Clean string match with stopwords removed
  const cInput = cleanCollegeString(raw);
  const cleanMatch = cutoffColleges.find((c) => cleanCollegeString(c) === cInput);
  if (cleanMatch) return cleanMatch;

  // 4. Match against collegesData catalog
  const colCatalog = collegesData as Array<{ name: string; shortName?: string; aliases?: string[] }>;
  const colObj = colCatalog.find(
    (c) =>
      c.name.toLowerCase() === lower ||
      c.shortName?.toLowerCase() === lower ||
      (c.aliases || []).some((a) => a.toLowerCase() === lower)
  );
  if (colObj) {
    const colNameClean = cleanCollegeString(colObj.name);
    const m = cutoffColleges.find((c) => cleanCollegeString(c) === colNameClean);
    if (m) return m;
    for (const a of colObj.aliases || []) {
      const cA = cleanCollegeString(a);
      const mA = cutoffColleges.find((c) => cleanCollegeString(c) === cA);
      if (mA) return mA;
    }
  }

  // 5. Substring inclusion
  for (const c of cutoffColleges) {
    const cClean = cleanCollegeString(c);
    if (cClean.length > 5 && (cInput.includes(cClean) || cClean.includes(cInput))) {
      return c;
    }
  }

  return null;
}

/**
 * Resolves a user dream college string to the canonical college name in NORMALIZED_CUTOFFS.
 */
export function resolveTargetCollegeMatch(userCollege: string): string | null {
  if (!userCollege) return null;
  return resolveCanonicalCutoffCollege(userCollege);
}

export const COURSE_ALIASES_MAP: Record<string, string> = {
  "b.sc. cs": "bsc_hons_computer_science",
  "b.sc cs": "bsc_hons_computer_science",
  "bsc cs": "bsc_hons_computer_science",
  "bsc_cs": "bsc_hons_computer_science",
  "b.sc. (hons) cs": "bsc_hons_computer_science",
  "b.sc (hons) cs": "bsc_hons_computer_science",
  "bsc (hons) cs": "bsc_hons_computer_science",
  "computer science": "bsc_hons_computer_science",
  "cs": "bsc_hons_computer_science",
  "bsc_phys": "bsc_hons_physics",
  "bsc phys": "bsc_hons_physics",
  "b.sc phys": "bsc_hons_physics",
  "b.sc. phys": "bsc_hons_physics",
  "physics": "bsc_hons_physics",
  "physics hons": "bsc_hons_physics",
  "b.sc. (hons) physics": "bsc_hons_physics",
  "b.sc. (hons.) physics": "bsc_hons_physics",
  "bsc_chem": "bsc_hons_chemistry",
  "bsc chem": "bsc_hons_chemistry",
  "b.sc chem": "bsc_hons_chemistry",
  "chemistry": "bsc_hons_chemistry",
  "b.sc. (hons) chemistry": "bsc_hons_chemistry",
  "bsc_maths": "bsc_hons_mathematics",
  "bsc math": "bsc_hons_mathematics",
  "b.sc math": "bsc_hons_mathematics",
  "mathematics": "bsc_hons_mathematics",
  "b.sc. (hons) mathematics": "bsc_hons_mathematics",
  "bcom": "bcom_prog",
  "b.com": "bcom_prog",
  "bcom hons": "bcom_hons",
  "b.com (hons)": "bcom_hons",
  "b.com. (hons.)": "bcom_hons",
  "economics": "ba_hons_economics",
  "eco hons": "ba_hons_economics",
  "b.a. (hons) economics": "ba_hons_economics",
  "pol science": "ba_hons_pol_science",
  "political science": "ba_hons_pol_science",
  "history": "ba_hons_history",
  "history hons": "ba_hons_history",
};

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

  // 3. Known Aliases Map
  if (COURSE_ALIASES_MAP[raw]) {
    const aliasId = COURSE_ALIASES_MAP[raw];
    const found = courses.find((c) => c.id === aliasId);
    if (found) return found.id;
  }

  // 4. Normalized clean match
  const clean = raw.replace(/[^a-z0-9]/g, "");
  for (const c of courses) {
    const cClean = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cClean === clean) return c.id;
    const cIdClean = c.id.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cIdClean === clean) return c.id;
  }

  // 5. Clean alias lookup
  for (const [aliasKey, cid] of Object.entries(COURSE_ALIASES_MAP)) {
    const aClean = aliasKey.replace(/[^a-z0-9]/g, "");
    if (aClean === clean) {
      const found = courses.find((c) => c.id === cid);
      if (found) return found.id;
    }
  }

  // 6. Substring match
  for (const c of courses) {
    const cClean = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cClean.length > 5 && (cClean.includes(clean) || clean.includes(cClean))) {
      return c.id;
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// 2. Target Marks Calculation Helper
// ---------------------------------------------------------------------------

/**
 * Calculates equal-share or proportional target marks for a subject in a course combination.
 * For equal weighting (composite scale === numberOfCountedSubjects * subjectMax), calculates cutoffMarks / numberOfCountedSubjects.
 * For unequal weighting, calculates cutoffMarks * (subjectMax / cutoffScale).
 */
export function calculateSubjectTargetMarks(
  cutoffMarks: number,
  cutoffScale: number,
  subjectMaxMarks: number = STANDING_CONFIG.MAX_MARKS_PER_SUBJECT,
  numberOfCountedSubjects: number = 3,
  isEquallyWeighted?: boolean
): number {
  const equalWeight =
    isEquallyWeighted !== undefined
      ? isEquallyWeighted
      : numberOfCountedSubjects > 0 && cutoffScale === numberOfCountedSubjects * subjectMaxMarks;

  if (equalWeight && numberOfCountedSubjects > 0) {
    // Standard equally weighted admission scheme: perSubjectTarget = totalCutoff / numberOfCountedSubjects
    // E.g. 600/3 = 200, 480/3 = 160, 800/4 = 200
    return Math.round((cutoffMarks / numberOfCountedSubjects) * 10) / 10;
  }
  if (cutoffScale > 0 && subjectMaxMarks > 0) {
    // Proportional / normalized weighting based on paper maximum
    return Math.round((cutoffMarks * (subjectMaxMarks / cutoffScale)) * 10) / 10;
  }
  return numberOfCountedSubjects > 0 ? Math.round((cutoffMarks / numberOfCountedSubjects) * 10) / 10 : 0;
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
      const isQualifyingRule = rule.type === "qualifying" || rule.isCountedInCutoff === false;
      const isCounted = !isQualifyingRule;
      const qualifyingPct = rule.qualifyingPercentage ?? 30;

      if (rule.type === "qualifying") {
        const candidates = rule.subjects.filter((s) => !usedSubjectKeys.has(s));
        const pickedSub = candidates.find((s) => (userPerformance[s]?.validSessionsCount ?? 0) > 0) || candidates[0];
        if (pickedSub) {
          usedSubjectKeys.add(pickedSub);
          const perf = userPerformance[pickedSub];
          const hasData = Boolean(perf && (perf.hasSufficientData || perf.validSessionsCount > 0));
          const maxMarks = perf?.maxMarks || STANDING_CONFIG.MAX_MARKS_PER_SUBJECT;
          const averageMarks = hasData && perf
            ? (perf.averageMarks !== undefined
                ? perf.averageMarks
                : perf.rawAveragePercentage !== undefined
                ? Math.round(((perf.rawAveragePercentage * maxMarks) / 100) * 10) / 10
                : null)
            : null;
          const targetMarks = Math.round((maxMarks * qualifyingPct) / 100);
          const marksNeeded = hasData && averageMarks !== null
            ? Math.max(0, Math.round((targetMarks - averageMarks) * 10) / 10)
            : targetMarks;

          resolved.push({
            subjectId: pickedSub,
            subjectName: perf?.subjectName || CANONICAL_SUBJECTS_MAP[pickedSub]?.name || pickedSub,
            ruleType: "qualifying",
            isCountedInCutoff: false,
            roleLabel: `Eligibility requirement (Qualifying · min ${qualifyingPct}%, not counted in cutoff score)`,
            hasData,
            averageMarks,
            maxMarks,
            targetMarks,
            marksNeeded,
            answeredQuestions: perf?.answeredQuestions || 0,
            userPercentage: perf ? perf.rawAveragePercentage : null,
            qualifyingPercentage: qualifyingPct,
          });
        }
      } else if (rule.type === "required") {
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
              isCountedInCutoff: isCounted,
              roleLabel: isCounted
                ? "Counted toward cutoff · Mandatory domain"
                : `Eligibility requirement (Qualifying · min ${qualifyingPct}%, not counted in cutoff score)`,
              hasData,
              averageMarks,
              maxMarks,
              targetMarks: 0,
              marksNeeded: 0,
              answeredQuestions: perf?.answeredQuestions || 0,
              userPercentage: perf ? perf.rawAveragePercentage : null,
              qualifyingPercentage: isCounted ? undefined : qualifyingPct,
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
            isCountedInCutoff: isCounted,
            roleLabel: isCounted
              ? rule.type === "one_of"
                ? "Counted toward cutoff · Language"
                : "Counted toward cutoff · Best-of domain"
              : `Eligibility requirement (Qualifying · min ${qualifyingPct}%, not counted in cutoff score)`,
            hasData: item.hasData,
            averageMarks: itemAverageMarks,
            maxMarks,
            targetMarks: 0,
            marksNeeded: 0,
            answeredQuestions: item.perf?.answeredQuestions || 0,
            isBestOptionChosen: true,
            userPercentage: item.perf ? item.perf.rawAveragePercentage : null,
            qualifyingPercentage: isCounted ? undefined : qualifyingPct,
          });
        }
      }
    }

    const countedResolved = resolved.filter((s) => s.isCountedInCutoff !== false);
    const qualifyingResolved = resolved.filter((s) => s.isCountedInCutoff === false);
    const totalCountedRequired = countedResolved.length || course.subjectCount || 3;
    const totalRequired = totalCountedRequired;
    const subjectsWithData = countedResolved.filter((s) => s.hasData).length;
    const coverage = totalRequired > 0 ? Math.round((subjectsWithData / totalRequired) * 100) / 100 : 0;
    const isComplete = subjectsWithData === totalRequired;

    // Calculate subject target marks and marks needed
    const effectiveCutoff = cutoffMarks ?? course.cutoffScale;
    countedResolved.forEach((sub) => {
      sub.targetMarks = calculateSubjectTargetMarks(effectiveCutoff, course.cutoffScale, sub.maxMarks, totalCountedRequired);
      sub.marksNeeded = sub.hasData && sub.averageMarks !== null
        ? Math.max(0, Math.round((sub.targetMarks - sub.averageMarks) * 10) / 10)
        : sub.targetMarks;
    });

    qualifyingResolved.forEach((sub) => {
      sub.targetMarks = Math.round((sub.maxMarks * (sub.qualifyingPercentage ?? 30)) / 100);
      sub.marksNeeded = sub.hasData && sub.averageMarks !== null
        ? Math.max(0, Math.round((sub.targetMarks - sub.averageMarks) * 10) / 10)
        : sub.targetMarks;
    });

    // Combined average marks is ONLY calculated when ALL required counted subjects have data!
    // Never fabricate an overall score for incomplete subject data!
    const combinedAverageMarks = isComplete
      ? Math.round(countedResolved.reduce((sum, s) => sum + (s.averageMarks || 0), 0) * 10) / 10
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
  filterYear?: number | "all"
): MultiYearCutoffStats | null {
  const canonicalCollege = resolveCanonicalCutoffCollege(collegeName) || collegeName;
  const canonicalCourseId = matchCourseToId(courseId) || courseId;

  const records = NORMALIZED_CUTOFFS.filter(
    (r) =>
      (r.college.toLowerCase().trim() === canonicalCollege.toLowerCase().trim() ||
        cleanCollegeString(r.college) === cleanCollegeString(canonicalCollege)) &&
      r.canonical_course_id === canonicalCourseId &&
      r.category === category
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
  const latestHistoricalRecord = yearlyData[yearlyData.length - 1]!;
  const latestHistoricalYear = latestHistoricalRecord.year;

  // Year selection & fallback logic:
  // If a specific year is requested, check if historical data exists for it.
  // If not, sensibly fallback to latest historical cutoff and flag as fallback.
  let effectiveYear: number = latestHistoricalYear;
  let isFallbackYear: boolean = false;
  let requestedYear: number | undefined = undefined;
  let activeValue: number = latestHistoricalRecord.cutoffValue;

  if (filterYear !== undefined && filterYear !== "all") {
    requestedYear = filterYear;
    const yearMatch = yearlyData.find((d) => d.year === filterYear);
    if (yearMatch) {
      effectiveYear = yearMatch.year;
      isFallbackYear = false;
      activeValue = yearMatch.cutoffValue;
    } else {
      effectiveYear = latestHistoricalYear;
      isFallbackYear = true;
      activeValue = latestHistoricalRecord.cutoffValue;
    }
  }

  const latestYear = effectiveYear;
  const latestValue = activeValue;

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
  const projectedYear: number = latestHistoricalYear + 1;
  let projectedBasis: string;
  let projectedRange: { low: number; high: number; label: string };

  if (yearlyData.length < 3) {
    projectedCutoffMarks = latestHistoricalRecord.cutoffValue;
    projectedBasis = `Based on ${latestHistoricalYear} cutoff`;
    const delta = Math.max(6, cutoffScale * 0.02);
    const low = Math.max(0, Math.round(latestHistoricalRecord.cutoffValue - delta));
    const high = Math.min(cutoffScale, Math.round(latestHistoricalRecord.cutoffValue + delta));
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
    if (slope > 0 && rawProj < latestHistoricalRecord.cutoffValue) {
      rawProj = latestHistoricalRecord.cutoffValue;
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

    projectedBasis = `Projected for ${projectedYear} · based on ${years[0]}-${latestHistoricalYear} trend`;
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
    college: canonicalCollege,
    canonicalCollege,
    courseId: canonicalCourseId,
    category,
    cutoffScale,
    years,
    latestYear,
    latestValue,
    effectiveYear,
    isFallbackYear,
    requestedYear,
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
  const canonicalCollege = resolveCanonicalCutoffCollege(collegeName) || collegeName;
  const canonicalCourseId = matchCourseToId(courseId) || courseId;
  const stats = computeMultiYearCutoff(canonicalCollege, canonicalCourseId, category);

  const course = CANONICAL_COURSES_MAP[canonicalCourseId];
  const countedSubjectsCount = course?.subjectCount || 3;

  if (stats && stats.projectedCutoffMarks !== undefined && stats.projectedRange) {
    const proj = stats.projectedCutoffMarks;
    return {
      projectedValue: proj,
      projectedYear: stats.projectedYear || 2027,
      basis: stats.projectedBasis || `Projected for 2027 · based on trend`,
      likelyRange: stats.projectedRange,
      perSubjectTarget: calculateSubjectTargetMarks(proj, stats.cutoffScale, 250, countedSubjectsCount),
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

  const canonicalCourseId = matchCourseToId(courseId) || courseId;
  const userSubjectPerformance = computeUserSubjectPerformance(userAttempts);
  const resolution = resolveCourseRequirements(canonicalCourseId, userSubjectPerformance);

  const offeringColleges = Array.from(
    new Set(
      NORMALIZED_CUTOFFS.filter((r) => r.canonical_course_id === canonicalCourseId).map(
        (r) => r.college
      )
    )
  );

  const standings: CollegeStandingResult[] = [];

  for (const college of offeringColleges) {
    const multiYear = computeMultiYearCutoff(college, canonicalCourseId, category, filterYear);
    if (!multiYear) continue;

    const matchedRecord = NORMALIZED_CUTOFFS.find(
      (r) =>
        (r.college.toLowerCase().trim() === college.toLowerCase().trim() ||
          cleanCollegeString(r.college) === cleanCollegeString(college)) &&
        r.canonical_course_id === canonicalCourseId
    );
    const resolvedUniversity = matchedRecord?.university || "University of Delhi";

    if (filterUniversity && filterUniversity !== "all" && resolvedUniversity !== filterUniversity) {
      continue;
    }

    const cutoffScale = multiYear.cutoffScale;
    const cutoffMarks = multiYear.latestValue;
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
  filterYear?: number | "all";
}): DreamCollegeGapAnalysis | null {
  const {
    collegeName,
    courseId,
    category = STANDING_CONFIG.DEFAULT_CATEGORY,
    userAttempts,
    filterYear,
  } = params;

  const canonicalCollege = resolveCanonicalCutoffCollege(collegeName) || collegeName;
  const canonicalCourseId = matchCourseToId(courseId) || courseId;

  const multiYear = computeMultiYearCutoff(canonicalCollege, canonicalCourseId, category, filterYear);
  const course = CANONICAL_COURSES_MAP[canonicalCourseId] || CANONICAL_COURSES_MAP["bsc_hons_physics"]!;
  const userSubjectPerformance = computeUserSubjectPerformance(userAttempts);

  if (!multiYear) {
    const resolution = resolveCourseRequirements(canonicalCourseId, userSubjectPerformance, undefined, undefined);
    const subjectBreakdown = resolution.resolvedSubjects.map((sub) => {
      const curMarks = sub.averageMarks;
      const targetMarks = sub.targetMarks;
      const marksNeeded = sub.marksNeeded;
      return {
        subjectId: sub.subjectId,
        subjectName: sub.subjectName,
        hasData: sub.hasData,
        isCountedInCutoff: sub.isCountedInCutoff,
        roleLabel: sub.roleLabel,
        currentMarks: curMarks,
        subjectMaxMarks: sub.maxMarks,
        currentPerformanceDisplay: sub.hasData && curMarks !== null ? `${curMarks}/${sub.maxMarks} marks` : "No score yet",
        targetMarks,
        targetMarksDisplay: `${targetMarks}/${sub.maxMarks} marks`,
        marksNeeded,
        marksNeededDisplay: sub.hasData && curMarks !== null ? (marksNeeded === 0 ? "Target met" : `${marksNeeded} marks needed`) : "No score yet",
        progressPercent: sub.hasData && curMarks !== null ? Math.min(100, Math.max(0, Math.round((curMarks / sub.maxMarks) * 100))) : 0,
      };
    });

    return {
      targetCollege: collegeName,
      canonicalCollegeName: canonicalCollege,
      targetCourse: course.name,
      courseId: canonicalCourseId,
      category,
      cutoffScale: course.cutoffScale,
      expectedCutoffMarks: 0,
      cutoffDisplay: "No past cutoff data yet",
      cutoffYearLabel: "No cutoff data",
      effectiveYear: 2026,
      isProjectedYear: false,
      isFallbackYear: false,
      isComplete: false,
      hasNoData: resolution.hasNoData,
      hasNoCutoffHistory: true,
      status: "no_data",
      statusLabel: "No past cutoff data recorded",
      combinedMarks: null,
      combinedMarksDisplay: "—",
      marksGap: null,
      gapDisplay: "No cutoff data",
      summaryMessage: `No historical cutoff records have been published for ${collegeName} in ${course.name} (${category} category). As new official CUET seat allocation lists are released, benchmarks will update automatically.`,
      actionGuidance: [
        `Select another college or check the Course Standings table to see available historical cutoffs.`,
      ],
      emptyStateReason: `No cutoff records recorded for ${collegeName} - ${course.name} (${category}).`,
      subjectImprovementBreakdown: subjectBreakdown,
      coverage: resolution.coverage,
    };
  }

  const cutoffScale = multiYear.cutoffScale;
  const expectedCutoffMarks = multiYear.latestValue;
  const effectiveYear = multiYear.effectiveYear ?? multiYear.latestYear;
  const isFallbackYear = multiYear.isFallbackYear ?? false;
  const isProjectedYear = Boolean(filterYear && typeof filterYear === "number" && filterYear > multiYear.latestYear);

  let cutoffYearLabel = `${effectiveYear} Official Cutoff`;
  if (isFallbackYear && multiYear.requestedYear) {
    cutoffYearLabel = `${effectiveYear} Official Cutoff (Latest available for ${multiYear.requestedYear})`;
  } else if (isProjectedYear) {
    cutoffYearLabel = `Projected for ${filterYear} (Latest official: ${effectiveYear})`;
  }

  const cutoffDisplay = `${expectedCutoffMarks}/${cutoffScale} marks`;

  const resolution = resolveCourseRequirements(canonicalCourseId, userSubjectPerformance, undefined, expectedCutoffMarks);
  const isComplete = resolution.isComplete;
  const hasNoData = resolution.hasNoData;

  // Calculate subject improvement breakdown in marks
  const subjectBreakdown = resolution.resolvedSubjects.map((sub) => {
    const curMarks = sub.averageMarks;
    const targetMarks = sub.targetMarks;
    const marksNeeded = sub.marksNeeded;

    const currentPerformanceDisplay = sub.hasData && curMarks !== null
      ? `${curMarks}/${sub.maxMarks} marks`
      : "No score yet";
    const targetMarksDisplay = `${targetMarks}/${sub.maxMarks} marks`;
    const marksNeededDisplay = sub.hasData && curMarks !== null
      ? (marksNeeded === 0 ? "Target met" : `${marksNeeded} marks needed`)
      : "No score yet";

    const progressPercent = sub.hasData && curMarks !== null
      ? Math.min(100, Math.max(0, Math.round((curMarks / sub.maxMarks) * 100)))
      : 0;

    return {
      subjectId: sub.subjectId,
      subjectName: sub.subjectName,
      hasData: sub.hasData,
      isCountedInCutoff: sub.isCountedInCutoff,
      roleLabel: sub.roleLabel,
      currentMarks: curMarks,
      subjectMaxMarks: sub.maxMarks,
      currentPerformanceDisplay,
      targetMarks,
      targetMarksDisplay,
      marksNeeded,
      marksNeededDisplay,
      progressPercent,
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

  // Check scale compatibility:
  const isScaleCompatible = resolution.course.cutoffScale === cutoffScale;

  if (hasNoData) {
    status = "no_data";
    statusLabel = "No attempts recorded";
    combinedMarks = null;
    combinedMarksDisplay = "No score yet";
    marksGap = null;
    gapDisplay = "No score yet";
    summaryMessage = `To target ${canonicalCollege} (${resolution.course.name}), complete mocks in ${resolution.resolvedSubjects.map((s) => s.subjectName).join(", ")} to calibrate your baseline standing against the cutoff of ${cutoffDisplay} (${cutoffYearLabel}).`;
    actionGuidance.push(`Take an initial mock in ${resolution.resolvedSubjects[0]?.subjectName || "your core domain"}.`);
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

    summaryMessage = `Current performance on available subjects: ${availableSummary}. Complete mocks in remaining required subject(s): ${resolution.missingSubjectNames.join(", ")} to calculate your overall standing against the ${cutoffDisplay} cutoff (${cutoffYearLabel}).`;
    actionGuidance.push(`Take a mock in ${resolution.missingSubjectNames.join(", ")} to unlock your combined score.`);
    subjectBreakdown.filter((s) => s.hasData && s.marksNeeded > 0).forEach((s) => {
      actionGuidance.push(`Bridge the ${s.marksNeeded} marks gap in ${s.subjectName} to reach its target (${s.targetMarks} marks).`);
    });
  } else if (!isScaleCompatible) {
    // Scoring scales incompatible!
    status = "incomplete";
    statusLabel = "Scoring scale incompatible";
    combinedMarks = resolution.combinedAverageMarks!;
    combinedMarksDisplay = `${combinedMarks}/${resolution.course.cutoffScale} marks`;
    marksGap = null;
    gapDisplay = "Scale incompatible";
    summaryMessage = `The student mock combination uses a ${resolution.course.cutoffScale}-mark scale while ${canonicalCollege} cutoff is on a ${cutoffScale}-mark scale. Direct marks subtraction cannot be performed safely.`;
    actionGuidance.push(`Ensure the course subject combination matches the official admission scheme for this university.`);
  } else {
    // All required counted subjects available & scales compatible!
    combinedMarks = resolution.combinedAverageMarks!;
    combinedMarksDisplay = `${combinedMarks}/${cutoffScale} marks`;
    marksGap = Math.round((expectedCutoffMarks - combinedMarks) * 10) / 10;

    if (marksGap > 0) {
      status = "below_cutoff";
      statusLabel = `${marksGap} marks below cutoff`;
      gapDisplay = `${marksGap} marks below cutoff`;
      summaryMessage = `Your combined mock score is ${combinedMarksDisplay} against the ${cutoffYearLabel} of ${cutoffDisplay} (${marksGap} marks below cutoff). Increase your total score by ${marksGap} marks across your subjects to reach the admission threshold for ${canonicalCollege}.`;
      actionGuidance.push(`Bridge the ${marksGap} marks gap across your ${resolution.totalRequiredCount} counted subjects.`);
      actionGuidance.push("Target 3 to 4 additional correct questions per subject to eliminate negative deductions.");
    } else {
      status = "above_cutoff";
      const above = Math.abs(marksGap);
      statusLabel = above === 0 ? "Meets cutoff" : `${above} marks above cutoff`;
      gapDisplay = above === 0 ? "0 marks (meets cutoff)" : `${above} marks above cutoff`;
      summaryMessage = `Your combined mock score is ${combinedMarksDisplay}, which ${above === 0 ? "matches" : `is ${above} marks above`} the historical cutoff (${cutoffDisplay}, ${cutoffYearLabel}) for ${canonicalCollege}! Maintain consistency and avoid negative marking traps.`;
      actionGuidance.push("Focus on timed mock simulations to maintain accuracy under exam conditions.");
      actionGuidance.push("Review high-yield trap options to protect your score from negative marks.");
    }
  }

  // Legacy compatibility calculations
  const legacyTargetPct = cutoffScale > 0 ? Math.round((expectedCutoffMarks / cutoffScale) * 1000) / 10 : 0;
  const legacyUserPct = resolution.userPct ?? null;
  const legacyGapMarks = marksGap !== null ? Math.max(0, marksGap) : expectedCutoffMarks;
  const legacyGapPct = legacyUserPct !== null ? Math.max(0, Math.round((legacyTargetPct - legacyUserPct) * 10) / 10) : legacyTargetPct;
  const legacyBand = resolution.hasNoData
    ? "Far"
    : evaluateChanceBand(legacyUserPct, multiYear.expectedRange.lowPct ?? 70, multiYear.expectedRange.highPct ?? 80);

  return {
    targetCollege: collegeName,
    canonicalCollegeName: canonicalCollege,
    targetCourse: resolution.course.name,
    courseId: canonicalCourseId,
    category,
    cutoffScale,
    expectedCutoffMarks,
    cutoffDisplay,
    cutoffYearLabel,
    effectiveYear,
    isProjectedYear,
    isFallbackYear,
    isComplete,
    hasNoData,
    hasNoCutoffHistory: false,
    status,
    statusLabel,
    combinedMarks,
    combinedMarksDisplay,
    marksGap,
    gapDisplay,
    summaryMessage,
    actionGuidance,
    multiYearStats: multiYear,
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
