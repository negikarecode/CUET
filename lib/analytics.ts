import crypto from "crypto";
import {
  RecordedTestAttempt,
  TopicMastery,
  TimeSinkAlertData,
  UserAnalyticsSummary,
  SubjectCalibrationData,
} from "@/types";
import { generateFullTopicDiagnosis } from "@/lib/diagnostic-engine";

export interface CanonicalSubjectInfo {
  key: string;
  name: string;
  icon: string;
  category: "Science" | "Commerce" | "Humanities" | "Common" | "Arts & Performing";
  mockUrl: string;
}

export function normalizeSubject(rawSubject?: string): CanonicalSubjectInfo {
  const clean = (rawSubject || "physics").trim().toLowerCase().replace(/[-_]/g, " ");

  if (clean.includes("math")) {
    return {
      key: "mathematics",
      name: "Mathematics",
      icon: "Calculator",
      category: "Science",
      mockUrl: "/dashboard/mocks/maths",
    };
  }
  if (clean.includes("chem")) {
    return {
      key: "chemistry",
      name: "Chemistry",
      icon: "FlaskConical",
      category: "Science",
      mockUrl: "/dashboard/mocks/chemistry",
    };
  }
  if (clean.includes("phys")) {
    return {
      key: "physics",
      name: "Physics",
      icon: "Zap",
      category: "Science",
      mockUrl: "/dashboard/mocks/physics",
    };
  }
  if (clean.includes("bio")) {
    return {
      key: "biology",
      name: "Biology",
      icon: "Dna",
      category: "Science",
      mockUrl: "/dashboard/mocks/bio",
    };
  }
  if (clean.includes("account") || clean === "accs" || clean === "accounts") {
    return {
      key: "accountancy",
      name: "Accountancy",
      icon: "BarChart3",
      category: "Commerce",
      mockUrl: "/dashboard/mocks/accountancy",
    };
  }
  if (clean.includes("eco")) {
    return {
      key: "economics",
      name: "Economics",
      icon: "TrendingUp",
      category: "Commerce",
      mockUrl: "/dashboard/mocks/eco",
    };
  }
  if (clean.includes("business") || clean === "bst") {
    return {
      key: "business-studies",
      name: "Business Studies",
      icon: "Briefcase",
      category: "Commerce",
      mockUrl: "/dashboard/mocks/bst",
    };
  }
  if (clean.includes("pol")) {
    return {
      key: "political-science",
      name: "Political Science",
      icon: "Scale",
      category: "Humanities",
      mockUrl: "/dashboard/mocks/pol%20science",
    };
  }
  if (clean.includes("hist")) {
    return {
      key: "history",
      name: "History",
      icon: "Landmark",
      category: "Humanities",
      mockUrl: "/dashboard/mocks/history",
    };
  }
  if (clean.includes("geo")) {
    return {
      key: "geography",
      name: "Geography",
      icon: "Globe",
      category: "Humanities",
      mockUrl: "/dashboard/mocks/geo",
    };
  }
  if (clean.includes("psych")) {
    return {
      key: "psychology",
      name: "Psychology",
      icon: "Brain",
      category: "Humanities",
      mockUrl: "/dashboard/mocks/psychology",
    };
  }
  if (clean.includes("soc")) {
    return {
      key: "sociology",
      name: "Sociology",
      icon: "Users",
      category: "Humanities",
      mockUrl: "/dashboard/mocks/sociology",
    };
  }
  if (clean.includes("eng")) {
    return {
      key: "english",
      name: "English",
      icon: "BookOpen",
      category: "Common",
      mockUrl: "/dashboard/mocks/english",
    };
  }
  if (clean.includes("general") || clean === "gt") {
    return {
      key: "general-test",
      name: "General Test",
      icon: "Target",
      category: "Common",
      mockUrl: "/dashboard/mocks/general-test",
    };
  }
  if (clean.includes("computer") || clean === "cs" || clean === "csip") {
    return {
      key: "computer-science",
      name: "Computer Science",
      icon: "Laptop",
      category: "Science",
      mockUrl: "/dashboard/mocks/computer_science",
    };
  }
  if (clean.includes("physical") || clean === "ped") {
    return {
      key: "physical-education",
      name: "Physical Education",
      icon: "Medal",
      category: "Arts & Performing",
      mockUrl: "/dashboard/mocks/physical_education",
    };
  }

  const title = (rawSubject || "General").trim();
  return {
    key: clean.replace(/\s+/g, "-"),
    name: title.charAt(0).toUpperCase() + title.slice(1),
    icon: "GraduationCap",
    category: "Science",
    mockUrl: `/dashboard/mocks/${clean.replace(/\s+/g, "-")}`,
  };
}

export function buildDefaultSubjectCalibration(): Record<string, SubjectCalibrationData> {
  const defaults = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Accountancy",
    "Economics",
    "Business Studies",
    "Political Science",
    "History",
    "Geography",
    "English",
    "General Test",
  ];

  const map: Record<string, SubjectCalibrationData> = {};
  defaults.forEach((sub) => {
    const info = normalizeSubject(sub);
    map[info.key] = {
      subject: info.name,
      subjectKey: info.key,
      icon: info.icon,
      category: info.category,
      totalAttempted: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      accuracyPercentage: 0,
      testsCount: 0,
      isUnlocked: false,
      attemptsToUnlock: 150,
      unlockProgress: 0,
      mockUrl: info.mockUrl,
    };
  });
  return map;
}

/**
 * Deterministically creates an RFC 4122 compliant UUID from an arbitrary string.
 * Used for database foreign keys when tests or questions have string IDs like "physics-mock-1".
 */
export function stringToUuid(str: string): string {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(str)) {
    return str;
  }
  const hash = crypto.createHash("md5").update(str).digest("hex");
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    "4" + hash.substring(13, 16),
    ((parseInt(hash.substring(16, 18), 16) & 0x3f) | 0x80).toString(16) +
      hash.substring(18, 20),
    hash.substring(20, 32),
  ].join("-");
}

/**
 * Generates a stable canonical attempt ID for question telemetry deduplication:
 * Format: userId:::testId:::questionId
 * An invariant is that the exact same question in the exact same completed mock test
 * always resolves to the identical canonical attempt key.
 */
export function getCanonicalAttemptId(
  userId?: string,
  testId?: string,
  questionId?: string,
  questionNumber?: number
): string {
  const u = (userId || "user").trim();
  const t = (testId || "test").trim();
  const q = (questionId || (questionNumber !== undefined ? `q_${questionNumber}` : "q")).trim();
  return `${u}:::${t}:::${q}`;
}

/**
 * Aggregates all recorded test attempts into actionable insights:
 * - Questions solved & Diagnostic accuracy
 * - Weakness radar (critical & polish topics)
 * - Core strengths (mastered topics)
 * - Pacing & time-sink alerts
 * - Dynamic targeted remedial practice
 * - Subject-wise AI Calibration (150 questions milestone per subject)
 */
export function computeAnalyticsFromAttempts(
  attempts: RecordedTestAttempt[]
): UserAnalyticsSummary {
  if (!attempts || attempts.length === 0) {
    return {
      totalQuestionsAttempted: 0,
      totalCorrectAnswers: 0,
      totalIncorrectAnswers: 0,
      totalTimeSpentSeconds: 0,
      overallAccuracyPercentage: 0,
      completedTestsCount: 0,
      weaknessRadar: [],
      strengthList: [],
      timeSinkAlerts: [],
      recommendedPractice: {
        topic: "Initial Diagnostic Mock",
        chapter: "Domain Knowledge Calibration",
        subject: "Physics",
        durationMinutes: 60,
        questionCount: 50,
        reason:
          "Complete your first 50-question diagnostic test to establish your baseline pace and detect trap options.",
      },
      subjectCalibration: buildDefaultSubjectCalibration(),
    };
  }

  // 1. Deduplicate test attempts by testId (or id if testId not present) so re-renders or multiple submissions cannot duplicate attempts
  const deduplicatedAttemptsMap = new Map<string, RecordedTestAttempt>();
  for (const a of attempts) {
    const key = (a.testId ? a.testId.trim() : (a.id || "").trim());
    if (!key) continue;
    // Prefer attempt with questions data or highest answered count
    const existing = deduplicatedAttemptsMap.get(key);
    if (!existing) {
      deduplicatedAttemptsMap.set(key, a);
    } else {
      const existingQCount = existing.questions?.filter((q) => q.selectedOption !== null && q.selectedOption !== undefined).length || 0;
      const newQCount = a.questions?.filter((q) => q.selectedOption !== null && q.selectedOption !== undefined).length || 0;
      if (newQCount >= existingQCount) {
        deduplicatedAttemptsMap.set(key, a);
      }
    }
  }

  const cleanAttempts = Array.from(deduplicatedAttemptsMap.values());
  const completedTestsCount = cleanAttempts.length;

  // 2. Canonical question-level deduplication:
  // Key: testId:::questionId (or testId:::questionNumber)
  const canonicalQuestionsMap = new Map<string, { q: import("@/types").RecordedQuestionAttempt; attempt: RecordedTestAttempt }>();
  let totalTimeSpentSeconds = 0;

  cleanAttempts.forEach((attempt) => {
    totalTimeSpentSeconds += attempt.timeTakenSeconds ?? 0;
    const testKey = (attempt.testId || attempt.id || "test").trim();

    (attempt.questions || []).forEach((q, idx) => {
      // Only count questions that the user actually answered
      if (q.selectedOption === null || q.selectedOption === undefined) return;

      const qIdentifier = (q.questionId || (q.questionNumber ? `q_${q.questionNumber}` : `q_${idx + 1}`)).trim();
      const canonicalKey = `${testKey}:::${qIdentifier}`;

      // Check correctness self-healing
      const trueOption =
        q.correctOption ||
        (q as any).correctOptionId ||
        q.options?.find((o: any) => o.isCorrect === true)?.id;
      const isCorrect = Boolean(
        q.isCorrect === true ||
        (trueOption && q.selectedOption === trueOption)
      );

      const verifiedQ = {
        ...q,
        isCorrect,
        correctOption: trueOption || q.correctOption,
      };

      if (!canonicalQuestionsMap.has(canonicalKey)) {
        canonicalQuestionsMap.set(canonicalKey, { q: verifiedQ, attempt });
      }
    });
  });

  const canonicalEntries = Array.from(canonicalQuestionsMap.values());
  const totalQuestionsAttempted = canonicalEntries.length;
  const totalCorrectAnswers = canonicalEntries.filter(({ q }) => q.isCorrect === true).length;
  const totalIncorrectAnswers = Math.max(0, totalQuestionsAttempted - totalCorrectAnswers);

  const overallAccuracyPercentage =
    totalQuestionsAttempted > 0
      ? Math.round((totalCorrectAnswers / totalQuestionsAttempted) * 100)
      : 0;

  // Aggregate questions by Chapter / Core Domain Area
  interface ChapterDiagnosticBucket {
    subject: string;
    chapter: string;
    ncertReference: string;
    attemptsCount: number;
    correctCount: number;
    incorrectCount: number;
    timeSinksCount: number;
    fastErrorsCount: number; // <35s & wrong: impulsive trap errors
    slowErrorsCount: number; // >75s & wrong: heavy calculation trap errors
    totalTimeSpent: number;
    troubleSubtopicsMap: Map<string, number>;
    masteredSubtopicsMap: Map<string, number>;
    questionsData: import("@/types").RecordedQuestionAttempt[];
    mistakesList: import("@/types").TopicMistakeRecord[];
  }

  const chapterMap = new Map<string, ChapterDiagnosticBucket>();
  const subjectMap = new Map<string, SubjectCalibrationData>();
  const defaultSubjectCalibration = buildDefaultSubjectCalibration();
  Object.keys(defaultSubjectCalibration).forEach((key) => {
    const item = defaultSubjectCalibration[key];
    if (item) {
      subjectMap.set(key, { ...item });
    }
  });
  const testIdsBySubject = new Map<string, Set<string>>();

  // Populate subject calibration & chapters strictly from canonical question entries
  canonicalEntries.forEach(({ q, attempt }) => {
    // Subject Calibration tally
    const qSubRaw = q.subject || attempt.subject || "Physics";
    const subInfo = normalizeSubject(qSubRaw);
    let subCal = subjectMap.get(subInfo.key);
    if (!subCal) {
      subCal = {
        subject: subInfo.name,
        subjectKey: subInfo.key,
        icon: subInfo.icon,
        category: subInfo.category,
        totalAttempted: 0,
        totalCorrect: 0,
        totalIncorrect: 0,
        accuracyPercentage: 0,
        testsCount: 0,
        isUnlocked: false,
        attemptsToUnlock: 150,
        unlockProgress: 0,
        mockUrl: subInfo.mockUrl,
      };
      subjectMap.set(subInfo.key, subCal);
    }
    subCal.totalAttempted += 1;
    if (q.isCorrect === true) {
      subCal.totalCorrect += 1;
    } else {
      subCal.totalIncorrect += 1;
    }

    if (!testIdsBySubject.has(subInfo.key)) {
      testIdsBySubject.set(subInfo.key, new Set());
    }
    testIdsBySubject.get(subInfo.key)!.add(attempt.testId || attempt.id);

      const subject = q.subject || attempt.subject || "Physics";
      let rawChapter = (q.chapter || "Domain Core").trim();
      if (rawChapter === "Current Electricity & Semiconductor Electronics") {
        rawChapter = "Current Electricity";
      }
      const chapter = rawChapter || "General Domain";
      const microTopic = (q.microTopic || (q as unknown as { topic?: string }).topic || "Core Concept").trim();
      const key = `${subject.toLowerCase()}:::${chapter.toLowerCase()}`;

      let bucket = chapterMap.get(key);
      if (!bucket) {
        bucket = {
          subject,
          chapter,
          ncertReference:
            q.ncertReference ||
            `NCERT Class 12 (${chapter}), Section Focus`,
          attemptsCount: 0,
          correctCount: 0,
          incorrectCount: 0,
          timeSinksCount: 0,
          fastErrorsCount: 0,
          slowErrorsCount: 0,
          totalTimeSpent: 0,
          troubleSubtopicsMap: new Map(),
          masteredSubtopicsMap: new Map(),
          questionsData: [] as import("@/types").RecordedQuestionAttempt[],
          mistakesList: [] as import("@/types").TopicMistakeRecord[],
        };
        chapterMap.set(key, bucket);
      }

      bucket.attemptsCount += 1;
      const timeSpent = q.timeSpentSeconds || 0;
      bucket.totalTimeSpent += timeSpent;
      bucket.questionsData.push(q);

      if (timeSpent > 72 || q.isTimeSink) {
        bucket.timeSinksCount += 1;
      }

      if (q.isCorrect === true) {
        bucket.correctCount += 1;
        bucket.masteredSubtopicsMap.set(
          microTopic,
          (bucket.masteredSubtopicsMap.get(microTopic) || 0) + 1
        );
      } else if (q.isCorrect === false) {
        bucket.incorrectCount += 1;
        bucket.troubleSubtopicsMap.set(
          microTopic,
          (bucket.troubleSubtopicsMap.get(microTopic) || 0) + 1
        );

        if (timeSpent < 35) {
          bucket.fastErrorsCount += 1;
        }
        if (timeSpent > 75) {
          bucket.slowErrorsCount += 1;
        }

        // Determine specific error category from telemetry
        let errCat = "Conceptual Gap";
        if (timeSpent < 20) errCat = "Guessing / Uncertainty";
        else if (timeSpent < 35 && (q.prompt?.toLowerCase().includes("not") || q.prompt?.toLowerCase().includes("except"))) errCat = "Question Interpretation";
        else if (timeSpent > 85) errCat = "Calculation & Clock Drain";
        else if (q.questionType?.toLowerCase().includes("application")) errCat = "Concept Application Gap";
        else if (timeSpent < 30) errCat = "Distractor Trap";

        bucket.mistakesList.push({
          questionId: q.questionId || q.conceptId || `q_${bucket.mistakesList.length + 1}`,
          prompt: q.prompt || "Question stem from CBT attempt",
          userAnswer: q.selectedOption || "None",
          correctAnswer: q.correctOption || "Correct Answer",
          errorCategory: errCat,
          explanation: q.explanation || "Official NCERT explanation and derivation.",
          timeSpentSeconds: timeSpent,
          chapter: bucket.chapter,
          microTopic,
        });
      }
  });

  // Finalize subject-wise calibration calculations
  subjectMap.forEach((subCal, key) => {
    subCal.accuracyPercentage =
      subCal.totalAttempted > 0
        ? Math.round((subCal.totalCorrect / subCal.totalAttempted) * 100)
        : 0;
    subCal.isUnlocked = subCal.totalAttempted >= 150;
    subCal.attemptsToUnlock = Math.max(0, 150 - subCal.totalAttempted);
    subCal.unlockProgress = Math.min(100, Math.round((subCal.totalAttempted / 150) * 100));
    subCal.testsCount = testIdsBySubject.get(key)?.size || (subCal.totalAttempted > 0 ? 1 : 0);
  });

  const allTopics: TopicMastery[] = [];

  chapterMap.forEach((bucket) => {
    const attempts = bucket.attemptsCount;
    if (attempts === 0) return;

    const accuracy = Math.round((bucket.correctCount / attempts) * 100);
    const avgTime = Math.round(bucket.totalTimeSpent / attempts);

    // Sort trouble subtopics by frequency of error
    const troubleTopics = Array.from(bucket.troubleSubtopicsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);

    // Sort mastered subtopics
    const strongTopics = Array.from(bucket.masteredSubtopicsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);

    // Confidence level based on sample size
    let confidenceLevel: "high" | "medium" | "emerging";
    if (attempts >= 4) {
      confidenceLevel = "high";
    } else if (attempts >= 2) {
      confidenceLevel = "medium";
    } else {
      confidenceLevel = "emerging";
    }

    // Mastery Score (0 - 100) combining accuracy, pace, and error severity
    let masteryScore = (bucket.correctCount / attempts) * 70;

    if (accuracy >= 75) {
      if (avgTime <= 45) masteryScore += 20; // Swift fluent mastery
      else if (avgTime <= 65) masteryScore += 12; // Optimal CUET pace
    } else {
      if (avgTime > 80) {
        masteryScore -= Math.min(15, Math.round((avgTime - 75) * 0.4));
      }
      if (avgTime < 32 && accuracy < 60) {
        masteryScore -= 14; // Impulsive rushing penalty
      }
    }

    // Error severity penalties
    masteryScore -= Math.min(12, bucket.slowErrorsCount * 3);
    masteryScore -= Math.min(8, bucket.fastErrorsCount * 2);

    // Single-question calibration: avoid premature extremes
    if (attempts === 1) {
      if (accuracy === 100) masteryScore = Math.min(74, masteryScore);
      else if (accuracy === 0) masteryScore = Math.max(35, masteryScore);
    }

    masteryScore = Math.max(5, Math.min(98, Math.round(masteryScore)));

    // Error Classification & Careless vs Knowledge Disambiguation (Section 5 & 6)
    let primaryErrorType: import("@/types").ErrorClassificationType = "Insufficient Information";
    if (accuracy >= 80 && bucket.incorrectCount > 0) {
      // High domain accuracy with isolated error -> Careless or arithmetic, NOT conceptual gap
      primaryErrorType = bucket.fastErrorsCount > 0 ? "Careless Error" : "Calculation Error";
    } else if (bucket.fastErrorsCount >= 2) {
      primaryErrorType = "Misreading Error";
    } else if (bucket.slowErrorsCount >= 1 && avgTime > 75) {
      primaryErrorType = "Calculation Error";
    } else if (accuracy < 50 && attempts >= 2) {
      primaryErrorType = "Conceptual Gap";
    } else if (accuracy >= 50 && accuracy < 75) {
      primaryErrorType = bucket.slowErrorsCount > 0 ? "Formula/Rule Recall Gap" : "Concept Confusion";
    } else if (attempts === 1 && bucket.incorrectCount === 1) {
      primaryErrorType = "Insufficient Information";
    }

    // Priority Score Calculation (Section 9):
    // Priority Score = Frequency × Error Rate × Importance × Improvement Potential
    const errorRate = attempts > 0 ? bucket.incorrectCount / attempts : 0;
    const importance = 1.2; // Class 12 Core CUET Weightage
    const improvementPotential =
      primaryErrorType === "Careless Error" || primaryErrorType === "Calculation Error"
        ? 1.4
        : primaryErrorType === "Formula/Rule Recall Gap"
        ? 1.3
        : 1.1;
    const priorityScore =
      Math.round(attempts * errorRate * importance * improvementPotential * 10) / 10;
    const scoreImpactPotentialMarks = bucket.incorrectCount * 6; // +5 for correct, -1 penalty saved

    // Weakness & Strength Tiers (Section 7 & 8)
    let weaknessTier: import("@/types").WeaknessSeverityTier | undefined;
    let strengthTier: import("@/types").StrengthMasteryTier | undefined;

    if (accuracy >= 85 && attempts >= 4 && avgTime <= 65) {
      strengthTier = "mastered";
    } else if (accuracy >= 75 && attempts >= 2 && avgTime <= 60) {
      strengthTier = "core";
    } else if (attempts === 1 && accuracy === 100) {
      strengthTier = "emerging";
    } else if (accuracy >= 75 && (avgTime > 75 || bucket.slowErrorsCount > 0)) {
      strengthTier = "unstable";
    }

    if (attempts >= 2 && accuracy < 50) {
      weaknessTier = "critical";
    } else if (attempts >= 3 && accuracy < 65) {
      weaknessTier = "major";
    } else if (attempts >= 2 && accuracy < 75) {
      weaknessTier = "moderate";
    } else if (attempts >= 4 && accuracy >= 75 && bucket.incorrectCount > 0) {
      weaknessTier = "minor";
    } else if (attempts === 1 && bucket.incorrectCount === 1) {
      weaknessTier = "potential";
    }

    // Categorization logic: True Weakness vs Polish vs True Strength
    let status: "critical" | "polish" | "mastered";
    let diagnosisLabel: string;
    let diagnosticInsight: string;
    let remedialPrescription: string;

    const troubleListStr = troubleTopics.slice(0, 2).join(", ");
    const strongListStr = strongTopics.slice(0, 2).join(", ");

    // Strictly respect evidence thresholds:
    // <5 attempts: LIMITED DATA - Not enough evidence to diagnose a weakness yet
    if (attempts < 5) {
      const needed = Math.max(1, 5 - attempts);
      status = "polish";
      diagnosisLabel = "Limited Data (Need " + needed + " More Qs)";
      diagnosticInsight = `Only ${attempts} question attempt${attempts === 1 ? "" : "s"} recorded (${accuracy}% accuracy). Need ${needed} more attempt${needed === 1 ? "" : "s"} (minimum 5 total) before diagnosing a genuine weakness pattern.`;
      remedialPrescription = `Practice 5 questions in ${bucket.chapter} to calibrate baseline accuracy without guessing.`;
    } else if (accuracy < 50 || masteryScore < 45) {
      status = "critical";
      diagnosisLabel = "Critical Conceptual Gap";
      diagnosticInsight = `${bucket.incorrectCount} mistakes out of ${attempts} questions tested (${accuracy}% accuracy). Repeated breakdowns identified in: ${troubleListStr || "core chapter concepts"}.`;
      remedialPrescription = `Re-read NCERT Class 12 (${bucket.chapter}). Revisit basic definitions and resolve NCERT in-text examples before taking another mock.`;
    } else if (bucket.timeSinksCount >= 2 || (bucket.slowErrorsCount >= 1 && avgTime > 75)) {
      status = "critical";
      diagnosisLabel = "Calculation & Clock Drain";
      diagnosticInsight = `Average solving pace of ${avgTime}s/Q is severely drag-heavy (${bucket.timeSinksCount} questions exceeded 72s limit). Calculations are eating valuable CBT exam time.`;
      remedialPrescription = `Practice shortcut formula substitutions and dimensional elimination for ${bucket.chapter} to bring pace under 60s.`;
    } else if (bucket.fastErrorsCount >= 2 || (accuracy < 50 && avgTime < 38)) {
      status = "critical";
      diagnosisLabel = "Impulsive Trap Exposure";
      diagnosticInsight = `Rapid solving pace (${avgTime}s avg) with ${bucket.incorrectCount} errors. You are falling for NTA negative marking (-1) trap choices in: ${troubleListStr || "formula questions"}.`;
      remedialPrescription = `Slow down. Underline 'INCORRECT' / 'NOT TRUE' qualifying keywords in question stems before selecting answers.`;
    } else if (accuracy >= 80 && bucket.incorrectCount === 1) {
      status = "polish";
      diagnosisLabel = "Careless / Precision Slip";
      diagnosticInsight = `High accuracy (${accuracy}% across ${attempts} questions). The single error was a careless calculation/reading slip, not a conceptual deficit.`;
      remedialPrescription = `Maintain habit of double-checking final arithmetic before locking option. Knowledge retention is solid.`;
    } else if (masteryScore >= 75 && accuracy >= 75) {
      status = "mastered";
      diagnosisLabel = "Core Pillar Strength";
      diagnosticInsight = `Exceptional precision (${accuracy}% accuracy across ${attempts} questions) with optimal solving rhythm (${avgTime}s avg). Solid mastery of: ${strongListStr || bucket.chapter}.`;
      remedialPrescription = `Exam-ready stronghold. Maintain sharpness with a quick 5-minute revision drill once a week.`;
    } else {
      status = "polish";
      diagnosisLabel = "Needs Polish & Consistency";
      diagnosticInsight = `Moderate performance (${accuracy}% accuracy, ${bucket.correctCount}/${attempts} correct). Concept is recognized, but slips occurred in: ${troubleListStr || "secondary concepts"}.`;
      remedialPrescription = `Review formulas for ${troubleListStr || bucket.chapter}. Target 80%+ accuracy threshold to turn this into a core strength.`;
    }

    const fullDiagnosis = generateFullTopicDiagnosis(
      bucket.subject,
      bucket.chapter,
      bucket.chapter,
      attempts,
      bucket.correctCount,
      bucket.incorrectCount,
      avgTime,
      bucket.questionsData
    );

    // Determine Remediation Stage
    let remediationStage: import("@/types").RemediationStage = "DETECTED";
    let isRecovered = false;
    if (accuracy >= 80 && attempts >= 10 && avgTime <= 75) {
      remediationStage = "RECOVERED";
      isRecovered = true;
    } else if (attempts >= 5 && accuracy < 60) {
      remediationStage = "DIAGNOSED";
    } else if (attempts >= 5 && accuracy < 75) {
      remediationStage = "PRACTICING";
    } else if (attempts < 5) {
      remediationStage = "DETECTED";
    }

    fullDiagnosis.remediationStage = remediationStage;
    fullDiagnosis.isRecovered = isRecovered;

    allTopics.push({
      subject: bucket.subject,
      chapter: bucket.chapter,
      microTopic: bucket.chapter, // Chapter is the true curriculum domain
      ncertReference: bucket.ncertReference,
      accuracyPercentage: accuracy,
      attemptsCount: attempts,
      correctCount: bucket.correctCount,
      incorrectCount: bucket.incorrectCount,
      timeSinksCount: bucket.timeSinksCount,
      avgTimeSeconds: avgTime,
      status,
      remediationStage,
      isRecovered,
      masteryScore,
      diagnosisLabel,
      diagnosticInsight,
      remedialPrescription,
      confidenceLevel,
      troubleTopics,
      strongTopics,
      priorityScore,
      weaknessTier,
      strengthTier,
      primaryErrorType,
      scoreImpactPotentialMarks,
      fullDiagnosis,
      recordedMistakes: bucket.mistakesList,
    });
  });

  // Weakness Radar: True weak areas prioritized by severity & Priority Score (Section 9)
  const weaknessRadar = [...allTopics]
    .filter((t) => t.status === "critical" || t.status === "polish")
    .sort((a, b) => {
      // 1. Critical before Polish
      if (a.status !== b.status) {
        return a.status === "critical" ? -1 : 1;
      }
      // 2. Priority Score ranking: higher score impact first
      const pA = a.priorityScore ?? 0;
      const pB = b.priorityScore ?? 0;
      if (pB !== pA) {
        return pB - pA;
      }
      // 3. Lower mastery score first
      const aScore = a.masteryScore ?? 50;
      const bScore = b.masteryScore ?? 50;
      if (aScore !== bScore) {
        return aScore - bScore;
      }
      // 4. Higher attempts count
      if (b.attemptsCount !== a.attemptsCount) {
        return b.attemptsCount - a.attemptsCount;
      }
      return b.timeSinksCount - a.timeSinksCount;
    });

  // Strengths: Validated core strengths prioritized by mastery and volume
  const strengthList = allTopics
    .filter(
      (t) =>
        t.status === "mastered" ||
        (t.accuracyPercentage >= 75 && (t.masteryScore ?? 0) >= 70)
    )
    .sort((a, b) => {
      // 1. Mastered before polish
      if (a.status !== b.status) {
        return a.status === "mastered" ? -1 : 1;
      }
      // 2. Higher mastery score
      const aScore = a.masteryScore ?? 50;
      const bScore = b.masteryScore ?? 50;
      if (bScore !== aScore) {
        return bScore - aScore;
      }
      // 3. Higher attempts count (tested more times)
      if (b.attemptsCount !== a.attemptsCount) {
        return b.attemptsCount - a.attemptsCount;
      }
      return a.avgTimeSeconds - b.avgTimeSeconds;
    });

  // Time-sink pacing alerts
  const timeSinkAlerts: TimeSinkAlertData[] = allTopics
    .filter((t) => t.timeSinksCount > 0)
    .map((t) => {
      const errorRatePct =
        t.attemptsCount > 0
          ? Math.round((t.incorrectCount / t.attemptsCount) * 100)
          : 0;
      let recoveryTactic: string;
      if (errorRatePct >= 50) {
        recoveryTactic = `${t.chapter} consumes >72s with high error rate (${errorRatePct}%). Trap distractor detected—flag on pass 1 and solve in phase 2.`;
      } else {
        recoveryTactic = `${t.chapter} requires extensive calculation (${t.avgTimeSeconds}s avg). Use approximation shortcuts to preserve clock time.`;
      }

      return {
        topic: t.chapter,
        chapter: t.chapter,
        avgTimeSpent: t.avgTimeSeconds,
        errorRate: errorRatePct,
        timeSinksCount: t.timeSinksCount,
        recoveryTactic,
      };
    })
    .sort((a, b) => b.timeSinksCount - a.timeSinksCount || b.errorRate - a.errorRate);

  // Dynamic Recommended Practice based on primary weakness
  let recommendedPractice = {
    topic: "Initial Diagnostic Mock",
    chapter: "Domain Knowledge Calibration",
    subject: "Physics",
    durationMinutes: 60,
    questionCount: 50,
    reason:
      "Complete your first 50-question diagnostic test to establish your baseline pace and detect trap options.",
  };

  if (weaknessRadar.length > 0 && weaknessRadar[0]) {
    const topWeak = weaknessRadar[0];
    const drillTopic =
      (topWeak.troubleTopics && topWeak.troubleTopics.length > 0
        ? topWeak.troubleTopics[0]
        : topWeak.chapter) || "Core Concept";

    recommendedPractice = {
      topic: drillTopic,
      chapter: topWeak.chapter,
      subject: topWeak.subject,
      durationMinutes: 5,
      questionCount: 5,
      reason: `${topWeak.diagnosisLabel || "Targeted Fix"} (${topWeak.accuracyPercentage}% accuracy). ${topWeak.remedialPrescription || "Complete this 5-minute drill to eliminate misconception traps."}`,
    };
  }

  // Section 26: "Why Am I Losing Marks?" Engine
  let marksLostBreakdown: UserAnalyticsSummary["marksLostBreakdown"];
  if (totalIncorrectAnswers >= 3) {
    let carelessCount = 0;
    let clockDrainCount = 0;
    let conceptualCount = 0;
    let formulaCount = 0;

    allTopics.forEach((t) => {
      if (t.primaryErrorType === "Careless Error" || t.primaryErrorType === "Misreading Error") {
        carelessCount += t.incorrectCount;
      } else if (t.primaryErrorType === "Calculation Error" || t.primaryErrorType === "Time Pressure Error") {
        clockDrainCount += t.incorrectCount;
      } else if (t.primaryErrorType === "Conceptual Gap" || t.primaryErrorType === "Concept Confusion") {
        conceptualCount += t.incorrectCount;
      } else {
        formulaCount += t.incorrectCount;
      }
    });

    const totalMissed = totalIncorrectAnswers || 1;
    marksLostBreakdown = [
      {
        category: "Careless & Speed Traps",
        count: carelessCount,
        percentage: Math.round((carelessCount / totalMissed) * 100),
        description: "Rushed answers under 35 seconds or overlooked qualifying keywords (NOT, INCORRECT).",
      },
      {
        category: "Clock Drain & Calculation Errors",
        count: clockDrainCount,
        percentage: Math.round((clockDrainCount / totalMissed) * 100),
        description: "Arithmetic slips or time-sink derivations exceeding the 72s/Q benchmark.",
      },
      {
        category: "Conceptual Breakdowns",
        count: conceptualCount,
        percentage: Math.round((conceptualCount / totalMissed) * 100),
        description: "Fundamental NCERT theoretical gaps requiring direct textbook revision.",
      },
      {
        category: "Formula & Application Errors",
        count: formulaCount,
        percentage: Math.round((formulaCount / totalMissed) * 100),
        description: "Step substitutions, sign conventions, or unit conversion mistakes.",
      },
    ].filter((item) => item.count > 0);
  }

  // Section 28: "What Should I Do Next?" Engine
  const topStrength = strengthList[0];
  const topWeakness = weaknessRadar[0];
  const mostTroubledMicro = topWeakness?.troubleTopics?.[0] || topWeakness?.chapter || "Core NCERT Principles";

  const nextActionsPlan: UserAnalyticsSummary["nextActionsPlan"] = {
    biggestStrength: topStrength
      ? `${topStrength.chapter} (${topStrength.accuracyPercentage}% accuracy, ${topStrength.attemptsCount} questions solved)`
      : "Pending calibration across more test attempts",
    biggestWeakness: topWeakness
      ? `${topWeakness.chapter} (${topWeakness.accuracyPercentage}% accuracy, ${topWeakness.incorrectCount} errors, ${topWeakness.diagnosisLabel || "Priority Gap"})`
      : "No critical weaknesses detected so far",
    biggestRecurringMistake: topWeakness?.primaryErrorType
      ? `${topWeakness.primaryErrorType} in ${mostTroubledMicro}`
      : "Isolated question slips (no chronic pattern yet)",
    highestImpactTopic: topWeakness
      ? `${topWeakness.chapter} (potential recovery: +${topWeakness.scoreImpactPotentialMarks || topWeakness.incorrectCount * 6} marks)`
      : "General Mock Practice",
    recommendedRevision: topWeakness
      ? `Re-read NCERT Class 12 (${topWeakness.chapter}), focusing on in-text definitions and summary points.`
      : "Maintain weekly formula flashcard sweeps.",
    recommendedPractice: topWeakness
      ? `Solve 10-15 targeted questions on ${mostTroubledMicro} with emphasis on eliminating distractor traps.`
      : "Attempt 20 mixed questions across domain chapters.",
    recommendedNextTest: topWeakness
      ? `5-minute adaptive repair drill on ${mostTroubledMicro} before full mock re-attempt.`
      : "Next full-length CUET CBT Mock Test.",
  };

  // Section 25: Readiness Score Engine
  let readinessLevel: "Developing" | "Moderate" | "Strong" | "Very Strong";
  let readinessConfidence: import("@/types").EngineConfidenceRating;
  let readinessReasoning: string;

  if (totalQuestionsAttempted < 20 || attempts.length === 0) {
    readinessLevel = "Developing";
    readinessConfidence = "Insufficient Evidence";
    readinessReasoning = "Fewer than 20 questions attempted. Baseline calibration required to establish reliable metrics.";
  } else if (overallAccuracyPercentage >= 85 && weaknessRadar.filter((w) => w.weaknessTier === "critical").length === 0) {
    readinessLevel = "Very Strong";
    readinessConfidence = attempts.length >= 3 ? "High" : "Medium";
    readinessReasoning = `Outstanding accuracy (${overallAccuracyPercentage}%) with minimal critical conceptual gaps across ${attempts.length} test session(s). High CBT exam readiness.`;
  } else if (overallAccuracyPercentage >= 70) {
    readinessLevel = "Strong";
    readinessConfidence = attempts.length >= 2 ? "High" : "Medium";
    readinessReasoning = `Solid mastery (${overallAccuracyPercentage}% accuracy). Focus on eliminating careless calculation traps in priority chapters to push into the 95th+ percentile.`;
  } else if (overallAccuracyPercentage >= 50) {
    readinessLevel = "Moderate";
    readinessConfidence = "Medium";
    readinessReasoning = `Moderate domain grasp (${overallAccuracyPercentage}% accuracy). Performance is held back by recurring breakdowns in ${topWeakness?.chapter || "key chapters"}.`;
  } else {
    readinessLevel = "Developing";
    readinessConfidence = "Medium";
    readinessReasoning = `Current domain accuracy is ${overallAccuracyPercentage}%. Prioritize targeted NCERT concept revision before advancing to timed full-length mocks.`;
  }

  return {
    totalQuestionsAttempted,
    totalCorrectAnswers,
    totalIncorrectAnswers,
    totalTimeSpentSeconds,
    overallAccuracyPercentage,
    completedTestsCount,
    weaknessRadar,
    strengthList,
    allTopics,
    timeSinkAlerts,
    recommendedPractice,
    marksLostBreakdown,
    nextActionsPlan,
    readinessAssessment: {
      level: readinessLevel,
      confidence: readinessConfidence,
      reasoning: readinessReasoning,
    },
    subjectCalibration: Object.fromEntries(subjectMap),
  };
}

export interface TestAttemptStats {
  attemptsCount: number;
  bestAttempt: RecordedTestAttempt | null;
  latestAttempt: RecordedTestAttempt | null;
  hasAttempted: boolean;
}

/**
 * Returns the best attempt for a specific test based on:
 * 1. Highest totalMarks
 * 2. Higher accuracyPercentage (tie-breaker)
 * 3. Lower timeTakenSeconds (tie-breaker)
 */
export function getBestAttemptForTest(
  attempts: RecordedTestAttempt[],
  testId: string
): RecordedTestAttempt | null {
  if (!attempts || attempts.length === 0 || !testId) return null;
  const filtered = attempts.filter((a) => a.testId === testId);
  if (filtered.length === 0 || !filtered[0]) return null;

  const initialAttempt: RecordedTestAttempt = filtered[0];

  return filtered.reduce<RecordedTestAttempt>((best, curr) => {
    if (curr.totalMarks > best.totalMarks) return curr;
    if (curr.totalMarks === best.totalMarks) {
      if (curr.accuracyPercentage > best.accuracyPercentage) return curr;
      if (curr.accuracyPercentage === best.accuracyPercentage) {
        if (curr.timeTakenSeconds < best.timeTakenSeconds) return curr;
      }
    }
    return best;
  }, initialAttempt);
}

/**
 * Returns aggregated stats for a given testId across all recorded attempts
 */
export function getTestAttemptStats(
  attempts: RecordedTestAttempt[],
  testId: string
): TestAttemptStats {
  if (!attempts || attempts.length === 0 || !testId) {
    return {
      attemptsCount: 0,
      bestAttempt: null,
      latestAttempt: null,
      hasAttempted: false,
    };
  }

  const filtered = attempts.filter((a) => a.testId === testId);
  if (filtered.length === 0) {
    return {
      attemptsCount: 0,
      bestAttempt: null,
      latestAttempt: null,
      hasAttempted: false,
    };
  }

  const bestAttempt = getBestAttemptForTest(filtered, testId);
  const sortedByDate = [...filtered].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return {
    attemptsCount: filtered.length,
    bestAttempt,
    latestAttempt: sortedByDate[0] || null,
    hasAttempted: true,
  };
}
