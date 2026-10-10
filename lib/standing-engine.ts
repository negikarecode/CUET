import { RecordedTestAttempt } from "@/types";
import { evaluateSessionValidity } from "@/lib/session-validity";
import {
  STANDING_CONFIG,
  CategoryCode,
  ChanceBand,
  CHANCE_BANDS,
  ChanceBandInfo,
} from "@/lib/config/standingConfig";

// Load normalized datasets from data/cutoff or lib/data/standing
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
  rawAveragePercentage: number;
  weightedPercentage: number;
  hasSufficientData: boolean;
  status: "valid" | "insufficient_data" | "no_attempts";
}

export interface ResolvedSubjectChoice {
  subjectId: string;
  subjectName: string;
  ruleType: "required" | "one_of" | "best_of";
  hasData: boolean;
  userPercentage: number | null;
  answeredQuestions: number;
  isBestOptionChosen?: boolean;
}

export interface CourseResolutionResult {
  course: CanonicalCourse;
  chosenCombination: CourseCombination;
  resolvedSubjects: ResolvedSubjectChoice[];
  totalRequiredCount: number;
  subjectsWithDataCount: number;
  coverage: number; // 0.0 to 1.0
  isBelowCoverageThreshold: boolean;
  hasNoData: boolean;
  userPct: number | null; // average percentage across participating subjects with data
  participatingSubjectNames: string[];
  missingSubjectNames: string[];
}

export interface MultiYearCutoffStats {
  college: string;
  courseId: string;
  category: CategoryCode;
  cutoffScale: number;
  years: number[];
  latestYear: number;
  latestValue: number;
  latestPercentage: number;
  averagePercentage: number;
  minPercentage: number;
  maxPercentage: number;
  trend: "rising" | "falling" | "stable" | "not enough years";
  trendDeltaPercentage: number | null;
  expectedRange: {
    lowPct: number;
    highPct: number;
    midpointPct: number;
    lowMarks: number;
    highMarks: number;
    midpointMarks: number;
  };
  yearlyData: Array<{
    year: number;
    cutoffValue: number;
    cutoffMax: number;
    cutoffPct: number;
  }>;
}

export interface CollegeStandingResult {
  collegeName: string;
  universityName: string;
  courseName: string;
  category: CategoryCode;
  band: ChanceBand;
  bandInfo: ChanceBandInfo;
  userPct: number | null;
  expectedRange: {
    lowPct: number;
    highPct: number;
    midpointPct: number;
    lowMarks: number;
    highMarks: number;
  };
  gapPercentagePoints: number;
  gapMarks: number;
  coverage: number;
  isRoughEstimate: boolean;
  hasNoData: boolean;
  reasoning: string;
  multiYearStats: MultiYearCutoffStats;
}

export interface DreamCollegeGapAnalysis {
  targetCollege: string;
  targetCourse: string;
  category: CategoryCode;
  cutoffScale: number;
  expectedCutoffPct: number;
  expectedCutoffMarks: number;
  userPct: number | null;
  userEquivalentMarks: number | null;
  gapPercentagePoints: number;
  gapMarks: number;
  band: ChanceBand;
  coverage: number;
  summaryMessage: string;
  actionGuidance: string[];
  subjectImprovementBreakdown: Array<{
    subjectId: string;
    subjectName: string;
    currentPct: number | null;
    currentMarks: number | null;
    targetPctNeeded: number;
    targetMarksNeeded: number;
    pctDelta: number;
    marksDelta: number;
  }>;
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

// ---------------------------------------------------------------------------
// 2. User Subject Performance Evaluator
// ---------------------------------------------------------------------------

/**
 * Computes deterministic user performance per subject from valid sessions.
 * Excludes low-effort sessions (too fast pacing or chance accuracy).
 * Weights recent sessions higher using configurable decay.
 * Marks subjects with fewer than MIN_ANSWERED_QUESTIONS_PER_SUBJECT as insufficient_data.
 */
export function computeUserSubjectPerformance(
  attempts: RecordedTestAttempt[],
  options?: {
    decayFactor?: number;
    minAnsweredQuestions?: number;
    scoreAdjustmentFactor?: number;
  }
): Record<string, UserSubjectPerformance> {
  const decayFactor = options?.decayFactor ?? STANDING_CONFIG.SESSION_RECENCY_DECAY_FACTOR;
  const minQuestions = options?.minAnsweredQuestions ?? STANDING_CONFIG.MIN_ANSWERED_QUESTIONS_PER_SUBJECT;
  const adjFactor = options?.scoreAdjustmentFactor ?? STANDING_CONFIG.SCORE_ADJUSTMENT_FACTOR;

  // Group attempts by normalized subject key
  const subjectSessionsMap: Record<
    string,
    Array<{
      attempt: RecordedTestAttempt;
      percentage: number;
      answeredCount: number;
      isValid: boolean;
      submittedAtMs: number;
    }>
  > = {};

  for (const att of attempts) {
    const rawSubj = att.subject || att.testTitle || "";
    const subjKey = normalizeSubjectToKey(rawSubj);

    // Evaluate session effort/validity gate
    let isLowEffort = att.isLowEffort;
    if (isLowEffort === undefined && att.questions && att.questions.length > 0) {
      const validity = evaluateSessionValidity(att.questions);
      isLowEffort = validity.isLowEffort;
    }

    const questionsList = att.questions || [];
    const answeredCount =
      questionsList.length > 0
        ? questionsList.filter((q) => q.selectedOption !== null && q.selectedOption !== undefined).length
        : att.attemptedCount || 0;

    // Calculate percentage on the standardized subject scale
    const maxMarks = att.maxMarks > 0 ? att.maxMarks : STANDING_CONFIG.MAX_MARKS_PER_SUBJECT;
    const marks = att.totalMarks ?? (att.correctCount * 5 - (att.incorrectCount || 0));
    const sessionPct = Math.max(0, Math.min(100, (marks / maxMarks) * 100));

    const submittedAtMs = att.submittedAt ? new Date(att.submittedAt).getTime() : 0;

    if (!subjectSessionsMap[subjKey]) {
      subjectSessionsMap[subjKey] = [];
    }

    subjectSessionsMap[subjKey]!.push({
      attempt: att,
      percentage: sessionPct,
      answeredCount,
      isValid: !isLowEffort,
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
      rawAveragePercentage: 0,
      weightedPercentage: 0,
      hasSufficientData: false,
      status: "no_attempts",
    };
  }

  // Calculate metrics for subjects that have user attempts
  for (const [sKey, sessions] of Object.entries(subjectSessionsMap)) {
    // Sort chronological: newest session first
    const sorted = [...sessions].sort((a, b) => b.submittedAtMs - a.submittedAtMs);

    const validSessions = sorted.filter((s) => s.isValid);
    const lowEffortSessions = sorted.filter((s) => !s.isValid);

    const totalAnswered = validSessions.reduce((sum, s) => sum + s.answeredCount, 0);

    let rawAvg = 0;
    let weightedAvg = 0;

    if (validSessions.length > 0) {
      rawAvg = validSessions.reduce((sum, s) => sum + s.percentage, 0) / validSessions.length;

      let totalWeight = 0;
      let weightedSum = 0;
      validSessions.forEach((s, rank) => {
        const weight = Math.pow(decayFactor, rank);
        totalWeight += weight;
        weightedSum += s.percentage * weight;
      });

      weightedAvg = totalWeight > 0 ? (weightedSum / totalWeight) * adjFactor : 0;
      weightedAvg = Math.max(0, Math.min(100, Math.round(weightedAvg * 10) / 10));
      rawAvg = Math.max(0, Math.min(100, Math.round(rawAvg * 10) / 10));
    }

    const hasSufficientData = totalAnswered >= minQuestions && validSessions.length > 0;
    const metaName = CANONICAL_SUBJECTS_MAP[sKey]?.name || sKey;

    result[sKey] = {
      subjectId: sKey,
      subjectName: metaName,
      answeredQuestions: totalAnswered,
      validSessionsCount: validSessions.length,
      excludedLowEffortCount: lowEffortSessions.length,
      rawAveragePercentage: rawAvg,
      weightedPercentage: weightedAvg,
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
// 3. Course Requirement Resolution
// ---------------------------------------------------------------------------

/**
 * Resolves required subjects for a course based on its combinations and student's valid scores.
 * Picks the optimal combination and best-scoring subjects for the user.
 * Missing subjects are NOT treated as zero: uses available subjects with coverage tracking.
 */
export function resolveCourseRequirements(
  courseId: string,
  userPerformance: Record<string, UserSubjectPerformance>,
  targetCombinationId?: string
): CourseResolutionResult {
  const course = CANONICAL_COURSES_MAP[courseId] || CANONICAL_COURSES_MAP["bcom_hons"]!;
  const combinations = course.combinations || [];

  if (combinations.length === 0) {
    // Fallback if no explicit combinations
    return {
      course,
      chosenCombination: { id: "default", label: "Default", rules: [] },
      resolvedSubjects: [],
      totalRequiredCount: course.subjectCount || 4,
      subjectsWithDataCount: 0,
      coverage: 0,
      isBelowCoverageThreshold: true,
      hasNoData: true,
      userPct: null,
      participatingSubjectNames: [],
      missingSubjectNames: [],
    };
  }

  // Evaluate each combination to find the one that yields highest valid coverage & score
  interface CombEvaluation {
    combination: CourseCombination;
    resolved: ResolvedSubjectChoice[];
    totalRequired: number;
    subjectsWithData: number;
    coverage: number;
    userPct: number | null;
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
            const hasData = Boolean(perf && perf.hasSufficientData);
            resolved.push({
              subjectId: subKey,
              subjectName: perf?.subjectName || CANONICAL_SUBJECTS_MAP[subKey]?.name || subKey,
              ruleType: "required",
              hasData,
              userPercentage: hasData && perf ? perf.weightedPercentage : null,
              answeredQuestions: perf?.answeredQuestions || 0,
            });
          }
        }
      } else if (rule.type === "one_of" || rule.type === "best_of") {
        // Pool of available candidate subjects for this rule that haven't been picked yet
        const candidates = rule.subjects.filter((s) => !usedSubjectKeys.has(s));

        // Sort candidates: subjects with valid data first (descending by weighted percentage),
        // then subjects without data
        const rankedCandidates = candidates.map((subKey) => {
          const perf = userPerformance[subKey];
          const hasData = Boolean(perf && perf.hasSufficientData);
          return {
            subKey,
            perf,
            hasData,
            pct: hasData && perf ? perf.weightedPercentage : -1,
          };
        });

        rankedCandidates.sort((a, b) => {
          if (a.hasData && !b.hasData) return -1;
          if (!a.hasData && b.hasData) return 1;
          return b.pct - a.pct;
        });

        const countToPick = Math.min(rule.count, rankedCandidates.length);
        const picked = rankedCandidates.slice(0, countToPick);

        for (const item of picked) {
          usedSubjectKeys.add(item.subKey);
          resolved.push({
            subjectId: item.subKey,
            subjectName: item.perf?.subjectName || CANONICAL_SUBJECTS_MAP[item.subKey]?.name || item.subKey,
            ruleType: rule.type,
            hasData: item.hasData,
            userPercentage: item.hasData && item.perf ? item.perf.weightedPercentage : null,
            answeredQuestions: item.perf?.answeredQuestions || 0,
            isBestOptionChosen: true,
          });
        }
      }
    }

    const totalRequired = course.subjectCount || resolved.length || 4;
    const subjectsWithData = resolved.filter((s) => s.hasData).length;
    const coverage = totalRequired > 0 ? Math.round((subjectsWithData / totalRequired) * 100) / 100 : 0;

    // user_pct is the arithmetic mean across ONLY participating subjects that have valid data
    const validScores = resolved
      .filter((s) => s.hasData && s.userPercentage !== null)
      .map((s) => s.userPercentage!);

    const userPct =
      validScores.length > 0
        ? Math.round((validScores.reduce((a, b) => a + b, 0) / validScores.length) * 10) / 10
        : null;

    return {
      combination: comb,
      resolved,
      totalRequired,
      subjectsWithData,
      coverage,
      userPct,
    };
  });

  // Pick combination: if targetCombinationId specified, use it; otherwise pick best coverage / score
  let chosen = evaluatedCombos[0]!;
  if (targetCombinationId) {
    const found = evaluatedCombos.find((c) => c.combination.id === targetCombinationId);
    if (found) chosen = found;
  } else {
    evaluatedCombos.sort((a, b) => {
      // Primary: higher coverage
      if (b.coverage !== a.coverage) return b.coverage - a.coverage;
      // Secondary: higher user percentage
      return (b.userPct || 0) - (a.userPct || 0);
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

  return {
    course,
    chosenCombination: chosen.combination,
    resolvedSubjects: chosen.resolved,
    totalRequiredCount: chosen.totalRequired,
    subjectsWithDataCount: chosen.subjectsWithData,
    coverage: chosen.coverage,
    isBelowCoverageThreshold,
    hasNoData: chosen.subjectsWithData === 0,
    userPct: chosen.userPct,
    participatingSubjectNames,
    missingSubjectNames,
  };
}

// ---------------------------------------------------------------------------
// 4. Multi-Year Cutoff Statistical Analysis
// ---------------------------------------------------------------------------

/**
 * Computes statistical cutoff metrics across available years for a college + course + category.
 * Derives expected cutoff as a range (low - high) with trend analysis.
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

  // Sort chronological
  records.sort((a, b) => a.year - b.year);

  const years = records.map((r) => r.year);
  const cutoffScale = records[0]!.cutoff_max || 1000;

  const yearlyData = records.map((r) => ({
    year: r.year,
    cutoffValue: r.cutoff_value,
    cutoffMax: r.cutoff_max,
    cutoffPct: Math.round((r.cutoff_value / r.cutoff_max) * 1000) / 10,
  }));

  const percentages = yearlyData.map((y) => y.cutoffPct);
  const latestRecord = yearlyData[yearlyData.length - 1]!;
  const latestYear = latestRecord.year;
  const latestValue = latestRecord.cutoffValue;
  const latestPercentage = latestRecord.cutoffPct;

  const minPercentage = Math.min(...percentages);
  const maxPercentage = Math.max(...percentages);
  const averagePercentage =
    Math.round((percentages.reduce((a, b) => a + b, 0) / percentages.length) * 10) / 10;

  // Trend detection
  let trend: "rising" | "falling" | "stable" | "not enough years" = "not enough years";
  let trendDeltaPercentage: number | null = null;

  if (yearlyData.length >= 2) {
    const first = yearlyData[0]!.cutoffPct;
    const last = yearlyData[yearlyData.length - 1]!.cutoffPct;
    trendDeltaPercentage = Math.round((last - first) * 10) / 10;
    if (trendDeltaPercentage > 0.8) trend = "rising";
    else if (trendDeltaPercentage < -0.8) trend = "falling";
    else trend = "stable";
  }

  // Derive Expected Range (low - high) without false precision
  let rangeLowPct: number;
  let rangeHighPct: number;

  if (yearlyData.length === 1) {
    // Single year: widen range by +/- SINGLE_YEAR_WIDEN_PERCENTAGE (e.g. 2.5%)
    rangeLowPct = Math.max(0, latestPercentage - STANDING_CONFIG.SINGLE_YEAR_WIDEN_PERCENTAGE);
    rangeHighPct = Math.min(100, latestPercentage + STANDING_CONFIG.SINGLE_YEAR_WIDEN_PERCENTAGE);
  } else {
    // Multiple years: use min & max with margin expansion
    const spread = maxPercentage - minPercentage;
    const margin = Math.max(
      STANDING_CONFIG.MIN_RANGE_SPREAD_PERCENTAGE,
      spread * 0.15
    );
    rangeLowPct = Math.max(0, minPercentage - margin);
    rangeHighPct = Math.min(100, maxPercentage + margin);
  }

  rangeLowPct = Math.round(rangeLowPct * 10) / 10;
  rangeHighPct = Math.round(rangeHighPct * 10) / 10;
  const midpointPct = Math.round(((rangeLowPct + rangeHighPct) / 2) * 10) / 10;

  const lowMarks = Math.round((rangeLowPct / 100) * cutoffScale * 10) / 10;
  const highMarks = Math.round((rangeHighPct / 100) * cutoffScale * 10) / 10;
  const midpointMarks = Math.round((midpointPct / 100) * cutoffScale * 10) / 10;

  return {
    college: collegeName,
    courseId,
    category,
    cutoffScale,
    years,
    latestYear,
    latestValue,
    latestPercentage,
    averagePercentage,
    minPercentage,
    maxPercentage,
    trend,
    trendDeltaPercentage,
    expectedRange: {
      lowPct: rangeLowPct,
      highPct: rangeHighPct,
      midpointPct,
      lowMarks,
      highMarks,
      midpointMarks,
    },
    yearlyData,
  };
}

// ---------------------------------------------------------------------------
// 5. Chance Band Classification
// ---------------------------------------------------------------------------

/**
 * Deterministically classifies user standing against expected cutoff range into:
 * - Safe: above high end
 * - Likely: above midpoint
 * - Possible: within range [low, midpoint)
 * - Reach: below range by small margin (<= 5%)
 * - Far: well below
 */
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
// 6. Comprehensive College Standings Calculation
// ---------------------------------------------------------------------------

/**
 * Computes standing across all colleges offering the chosen course.
 */
export function computeCollegeStandings(params: {
  courseId: string;
  category?: CategoryCode;
  userAttempts: RecordedTestAttempt[];
  filterYear?: number;
  filterUniversity?: string;
  filterBand?: ChanceBand;
}): {
  resolution: CourseResolutionResult;
  userSubjectPerformance: Record<string, UserSubjectPerformance>;
  standings: CollegeStandingResult[];
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
    filterBand,
  } = params;

  const userSubjectPerformance = computeUserSubjectPerformance(userAttempts);
  const resolution = resolveCourseRequirements(courseId, userSubjectPerformance);

  // Find all distinct colleges offering this course
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

    // Resolve University
    const matchedRecord = NORMALIZED_CUTOFFS.find(
      (r) => r.college.toLowerCase().trim() === college.toLowerCase().trim() && r.canonical_course_id === courseId
    );
    const resolvedUniversity = matchedRecord?.university || "University of Delhi";

    if (filterUniversity && filterUniversity !== "all" && resolvedUniversity !== filterUniversity) {
      continue;
    }

    const band = resolution.hasNoData
      ? "Far"
      : evaluateChanceBand(
          resolution.userPct,
          multiYear.expectedRange.lowPct,
          multiYear.expectedRange.highPct
        );

    if (filterBand && band !== filterBand) {
      continue;
    }

    const bandInfo = CHANCE_BANDS[band];

    // Gap computation
    let gapPct = 0;
    if (resolution.userPct !== null) {
      gapPct = Math.max(0, Math.round((multiYear.expectedRange.midpointPct - resolution.userPct) * 10) / 10);
    } else {
      gapPct = multiYear.expectedRange.midpointPct;
    }

    const gapMarks = Math.round((gapPct / 100) * multiYear.cutoffScale * 10) / 10;

    // Reasoning statement
    const yearsStr = multiYear.years.join(", ");
    const reasoning = resolution.hasNoData
      ? `No valid mock attempts recorded. Target admission cutoff is ~${multiYear.expectedRange.midpointPct}% (${multiYear.expectedRange.midpointMarks} / ${multiYear.cutoffScale} marks) based on ${yearsStr} admissions.`
      : `Based on your ${resolution.participatingSubjectNames.join(", ")} score (${resolution.userPct}%, ${Math.round(resolution.coverage * 100)}% coverage) against historical ${yearsStr} cutoffs [${multiYear.expectedRange.lowPct}% - ${multiYear.expectedRange.highPct}%].`;

    standings.push({
      collegeName: college,
      universityName: resolvedUniversity,
      courseName: resolution.course.name,
      category,
      band,
      bandInfo,
      userPct: resolution.userPct,
      expectedRange: multiYear.expectedRange,
      gapPercentagePoints: gapPct,
      gapMarks,
      coverage: resolution.coverage,
      isRoughEstimate: resolution.isBelowCoverageThreshold,
      hasNoData: resolution.hasNoData,
      reasoning,
      multiYearStats: multiYear,
    });
  }

  // Sort standings: highest cutoffs first (or lowest gap)
  standings.sort((a, b) => b.expectedRange.midpointPct - a.expectedRange.midpointPct);

  // Group into UI sections:
  // "You can likely get": Safe & Likely
  // "Possible": Possible
  // "Reach": Reach & Far
  const groupedByBand = {
    likely: standings.filter((s) => s.band === "Safe" || s.band === "Likely"),
    possible: standings.filter((s) => s.band === "Possible"),
    reach: standings.filter((s) => s.band === "Reach" || s.band === "Far"),
  };

  return {
    resolution,
    userSubjectPerformance,
    standings,
    groupedByBand,
    totalCollegesCount: standings.length,
  };
}

// ---------------------------------------------------------------------------
// 7. Dream College Gap Engine
// ---------------------------------------------------------------------------

/**
 * Computes gap analysis for a student's chosen dream college + course target.
 * Calculates needed percentage increase per subject and "what it would take" narrative.
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

  const userSubjectPerformance = computeUserSubjectPerformance(userAttempts);
  const resolution = resolveCourseRequirements(courseId, userSubjectPerformance);

  const targetPct = multiYear.expectedRange.midpointPct;
  const targetMarks = multiYear.expectedRange.midpointMarks;
  const userPct = resolution.userPct;
  const scale = multiYear.cutoffScale;

  const userEquivalentMarks =
    userPct !== null ? Math.round((userPct / 100) * scale * 10) / 10 : null;

  const gapPct = userPct !== null ? Math.max(0, Math.round((targetPct - userPct) * 10) / 10) : targetPct;
  const gapMarks =
    userEquivalentMarks !== null
      ? Math.max(0, Math.round((targetMarks - userEquivalentMarks) * 10) / 10)
      : targetMarks;

  const band = resolution.hasNoData
    ? "Far"
    : evaluateChanceBand(userPct, multiYear.expectedRange.lowPct, multiYear.expectedRange.highPct);

  // Per-subject improvement breakdown:
  // How much does each subject need to improve if other subjects remain constant?
  // user_pct = sum(scores) / N. To raise user_pct by gapPct, sum must increase by N * gapPct.
  // If distributed equally across all participating subjects: each subject needs +gapPct.
  // In marks out of 250: +gapPct * 2.5 marks.
  const subjectBreakdown = resolution.resolvedSubjects.map((sub) => {
    const curPct = sub.userPercentage;
    const curMarks = curPct !== null ? Math.round((curPct / 100) * STANDING_CONFIG.MAX_MARKS_PER_SUBJECT) : null;

    // Equal-distribution target
    const targetSubPct = Math.min(100, Math.round(((curPct ?? targetPct) + gapPct) * 10) / 10);
    const targetSubMarks = Math.round((targetSubPct / 100) * STANDING_CONFIG.MAX_MARKS_PER_SUBJECT);
    const marksDelta = curMarks !== null ? Math.max(0, targetSubMarks - curMarks) : targetSubMarks;

    return {
      subjectId: sub.subjectId,
      subjectName: sub.subjectName,
      currentPct: curPct,
      currentMarks: curMarks,
      targetPctNeeded: targetSubPct,
      targetMarksNeeded: targetSubMarks,
      pctDelta: gapPct,
      marksDelta,
    };
  });

  // What it would take summary narrative
  let summaryMessage = "";
  const actionGuidance: string[] = [];

  if (resolution.hasNoData) {
    summaryMessage = `To target ${collegeName} (${resolution.course.name}), complete mocks in ${resolution.resolvedSubjects.map((s) => s.subjectName).join(", ")} to calibrate your baseline standing against the ~${targetPct}% cutoff.`;
    actionGuidance.push(`Take an initial 50-question mock in ${resolution.resolvedSubjects[0]?.subjectName || "your core domain"}.`);
    actionGuidance.push(`Target at least ${Math.round(targetPct * 2.5)} / 250 marks (+5 / -1 marking scheme).`);
  } else if (gapPct === 0) {
    summaryMessage = `You are currently matching or exceeding the historical cutoff (${targetPct}%) for ${collegeName}! Maintain consistency and avoid negative marking traps.`;
    actionGuidance.push("Focus on timed speed drills to maintain fluency under pressure.");
    actionGuidance.push("Review high-yield misread traps in Section II domain subjects.");
  } else {
    summaryMessage = `Raise your domain average from ${userPct}% to ${targetPct}% (+${gapPct}% overall, or ~${Math.round(gapPct * 2.5)} marks per subject) to reach the expected cutoff for ${collegeName}.`;
    actionGuidance.push(`Bridge the ${gapMarks} marks gap across your ${resolution.subjectsWithDataCount} tested subject(s).`);
    if (resolution.missingSubjectNames.length > 0) {
      actionGuidance.push(`Take mocks in missing required subject(s): ${resolution.missingSubjectNames.join(", ")} to raise your coverage.`);
    }
    actionGuidance.push("Target 3 to 4 additional correct questions per subject to eliminate negative deductions.");
  }

  return {
    targetCollege: collegeName,
    targetCourse: resolution.course.name,
    category,
    cutoffScale: scale,
    expectedCutoffPct: targetPct,
    expectedCutoffMarks: targetMarks,
    userPct,
    userEquivalentMarks,
    gapPercentagePoints: gapPct,
    gapMarks,
    band,
    coverage: resolution.coverage,
    summaryMessage,
    actionGuidance,
    subjectImprovementBreakdown: subjectBreakdown,
  };
}
