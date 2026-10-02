import {
  SubjectRadarAIAnalysis,
  SubjectRadarAIPayload,
  SubjectAIKeyPattern,
  SubjectAICrossChapterPattern,
  SubjectAIPriorityArea,
  SubjectLearningProfile,
} from "@/types/subject-ai";
import Groq from "groq-sdk";

/**
 * Generate 100% deterministic fallback analysis from verified telemetry
 * Ensures zero hallucination, strict adherence to evidence thresholds, and instant availability if API fails.
 */
export function buildDeterministicSubjectRadarAI(
  payload: SubjectRadarAIPayload
): SubjectRadarAIAnalysis {
  const { subject, questions, deterministicStats, cycleInfo } = payload;
  const {
    totalAttempted,
    accuracyPercentage,
    avgTimeSeconds,
    difficultyStats,
    chapterPerformance,
    diagnosticConfidence,
    evidenceThresholdLabel,
  } = deterministicStats;

  // If insufficient data (<5 attempts)
  if (totalAttempted < 5) {
    return {
      subject,
      generatedAt: new Date().toISOString(),
      status: "insufficient_data",
      diagnosticConfidence: "INSUFFICIENT_EVIDENCE",
      evidenceThresholdLabel: "Insufficient evidence",
      subjectSummary: `Early baseline phase: ${totalAttempted} question${
        totalAttempted === 1 ? "" : "s"
      } attempted in ${subject}. Complete at least 5 qualifying questions across CBT mocks to unlock pattern detection.`,
      keyPatterns: [],
      knowledgePatterns: [],
      performancePatterns: [],
      interpretationPatterns: [],
      crossChapterPatterns: [],
      difficultyAnalysis: {
        easy: difficultyStats.easy.attempted > 0 ? `${difficultyStats.easy.accuracy}% across ${difficultyStats.easy.attempted} Qs` : "No attempts recorded",
        medium: difficultyStats.medium.attempted > 0 ? `${difficultyStats.medium.accuracy}% across ${difficultyStats.medium.attempted} Qs` : "No attempts recorded",
        hard: difficultyStats.hard.attempted > 0 ? `${difficultyStats.hard.accuracy}% across ${difficultyStats.hard.attempted} Qs` : "No attempts recorded",
      },
      priorityAreas: [
        {
          title: "Complete Baseline Qualification",
          reason: "Need at least 5 attempts to calibrate error taxonomy and pacing.",
          evidenceQuestionIds: questions.map((q) => q.questionId),
          actions: ["Attempt domain CBT mock to generate representative telemetry."],
          recommendedDrillType: "5-Question Concept Repair",
        },
      ],
      learningProfile: {
        strengths: [],
        weaknesses: [],
        recurringIssues: [],
        transferableIssues: [],
        difficultyPattern: "Awaiting sample calibration",
        recommendedFocus: ["Complete 5 initial diagnostic questions"],
      },
      cycleIntegration: cycleInfo
        ? {
            currentCycleNumber: cycleInfo.currentCycleNumber,
            cycleQuestionCount: cycleInfo.currentCycleQuestionCount,
            observations: [`Active in Diagnostic Cycle ${cycleInfo.currentCycleNumber}`],
          }
        : undefined,
    };
  }

  // 1. Identify Key Patterns from Error Taxonomy and Question Evidence
  const keyPatterns: SubjectAIKeyPattern[] = [];
  const knowledgePatterns: string[] = [];
  const performancePatterns: string[] = [];
  const interpretationPatterns: string[] = [];

  // Question Interpretation Patterns (NOT/EXCEPT, Distractors)
  const interpretationErrors = questions.filter(
    (q) =>
      q.isCorrect === false &&
      (q.errorCategory?.toLowerCase().includes("trap") ||
        q.errorCategory?.toLowerCase().includes("interpretation") ||
        q.prompt.toUpperCase().includes("NOT") ||
        q.prompt.toUpperCase().includes("EXCEPT") ||
        q.prompt.toUpperCase().includes("INCORRECT"))
  );

  if (interpretationErrors.length >= 2) {
    const qIds = interpretationErrors.map((q) => q.questionId).slice(0, 4);
    keyPatterns.push({
      title: "Qualifier & Distractor Susceptibility",
      description: `Observed ${interpretationErrors.length} mistake(s) on stems containing NOT/EXCEPT qualifiers or tempting boundary distractors. Evidence indicates rushing past negative condition markers.`,
      evidenceQuestionIds: qIds,
      confidence: interpretationErrors.length >= 4 ? "high" : "medium",
      classification: "QUESTION_INTERPRETATION",
    });
    interpretationPatterns.push(
      `Qualifier misses on negative phrasing (${interpretationErrors.length} instances): verify NOT/EXCEPT conditions before selection.`
    );
  }

  // Calculation & Sign Execution Errors
  const calculationErrors = questions.filter(
    (q) =>
      q.isCorrect === false &&
      (q.errorCategory?.toLowerCase().includes("calculation") ||
        q.errorCategory?.toLowerCase().includes("sign") ||
        q.errorCategory?.toLowerCase().includes("formula"))
  );

  if (calculationErrors.length >= 2) {
    const qIds = calculationErrors.map((q) => q.questionId).slice(0, 4);
    keyPatterns.push({
      title: "Calculation Setup & Sign Execution",
      description: `Detected ${calculationErrors.length} calculation or sign execution slips. The underlying formula is generally targeted correctly, but multi-step numerical execution causes mark loss.`,
      evidenceQuestionIds: qIds,
      confidence: calculationErrors.length >= 3 ? "high" : "medium",
      classification: "PERFORMANCE_PROBLEM",
    });
    performancePatterns.push(
      `Execution drag on multi-step numericals (${calculationErrors.length} instances). Intermediate sign and unit tracking required.`
    );
  }

  // Correct but slow observation (Pacing observation, NOT an accuracy weakness)
  const slowCorrectQuestions = questions.filter(
    (q) => q.isCorrect === true && q.timeSpentSeconds > 80
  );
  if (slowCorrectQuestions.length >= 2) {
    performancePatterns.push(
      `Pacing observation: ${slowCorrectQuestions.length} questions were answered correctly but required >80s. Concepts are solid, but retrieval speed can be improved with timed drills.`
    );
  }

  // Rapid responses observation (Purely observational, no psychological guessing)
  const rapidResponses = questions.filter((q) => q.timeSpentSeconds < 15);
  if (rapidResponses.length >= 3) {
    performancePatterns.push(
      `Telemetry observation: ${rapidResponses.length} questions answered in under 15s. Telemetry records rapid selection; verify pacing allows deliberate stem reading.`
    );
  }

  // Conceptual / Knowledge Gaps
  const conceptualErrors = questions.filter(
    (q) =>
      q.isCorrect === false &&
      (q.errorCategory?.toLowerCase().includes("concept") ||
        q.errorCategory?.toLowerCase().includes("knowledge") ||
        !q.errorCategory)
  );

  if (conceptualErrors.length >= 2) {
    const qIds = conceptualErrors.map((q) => q.questionId).slice(0, 4);
    keyPatterns.push({
      title: "Core NCERT Theoretical Discrimination",
      description: `Recorded ${conceptualErrors.length} foundational mistakes where similar principles or definitions were interchanged under timed conditions.`,
      evidenceQuestionIds: qIds,
      confidence: conceptualErrors.length >= 4 ? "high" : "medium",
      classification: "KNOWLEDGE_PROBLEM",
    });
    knowledgePatterns.push(
      `Fundamental concept confusion across ${conceptualErrors.length} questions. Revisit core NCERT theory tables and boundary conditions.`
    );
  }

  // 2. Cross-Chapter Pattern Detection
  const crossChapterPatterns: SubjectAICrossChapterPattern[] = [];
  const chaptersWithCalc = new Set<string>();
  const chaptersWithTrap = new Set<string>();

  calculationErrors.forEach((q) => chaptersWithCalc.add(q.chapter));
  interpretationErrors.forEach((q) => chaptersWithTrap.add(q.chapter));

  if (chaptersWithCalc.size >= 2) {
    const cList = Array.from(chaptersWithCalc);
    crossChapterPatterns.push({
      pattern: "Numerical Formula Application & Intermediate Calculation Setup",
      chapters: cList,
      evidenceQuestionIds: calculationErrors.map((q) => q.questionId).slice(0, 4),
      description: `Calculation setup slips appear systematically across multiple ${subject} chapters (${cList.join(", ")}). This reflects a transferable mathematical execution issue rather than an isolated chapter failure.`,
    });
  }

  if (chaptersWithTrap.size >= 2) {
    const tList = Array.from(chaptersWithTrap);
    crossChapterPatterns.push({
      pattern: "Negative Stem Phrasing (NOT / EXCEPT / INCORRECT)",
      chapters: tList,
      evidenceQuestionIds: interpretationErrors.map((q) => q.questionId).slice(0, 4),
      description: `Susceptibility to qualifier traps extends across ${tList.join(" and ")}. Under exam pace, the qualifying condition is overlooked before confirming the option.`,
    });
  }

  // 3. Difficulty Analysis
  let easyEval = "No easy attempts";
  if (difficultyStats.easy.attempted > 0) {
    easyEval =
      difficultyStats.easy.accuracy >= 80
        ? `Strong foundation: ${difficultyStats.easy.accuracy}% accuracy (${difficultyStats.easy.correct}/${difficultyStats.easy.attempted} correct). Direct recall is dependable.`
        : `Vulnerability on direct questions: ${difficultyStats.easy.accuracy}% accuracy (${difficultyStats.easy.correct}/${difficultyStats.easy.attempted} correct). Losing baseline marks on fundamentals.`;
  }

  let mediumEval = "No medium attempts";
  if (difficultyStats.medium.attempted > 0) {
    mediumEval =
      difficultyStats.medium.accuracy >= 70
        ? `Consistent standard application: ${difficultyStats.medium.accuracy}% accuracy (${difficultyStats.medium.correct}/${difficultyStats.medium.attempted} correct).`
        : `Moderate inconsistency: ${difficultyStats.medium.accuracy}% accuracy (${difficultyStats.medium.correct}/${difficultyStats.medium.attempted} correct). Application breaks down when multiple criteria are required.`;
  }

  let hardEval = "No hard attempts";
  if (difficultyStats.hard.attempted > 0) {
    hardEval =
      difficultyStats.hard.accuracy >= 65
        ? `Superior multi-step competence: ${difficultyStats.hard.accuracy}% accuracy (${difficultyStats.hard.correct}/${difficultyStats.hard.attempted} correct).`
        : `Steep drop on complex multi-step questions: ${difficultyStats.hard.accuracy}% accuracy (${difficultyStats.hard.correct}/${difficultyStats.hard.attempted} correct). Multi-concept integration requires structured drills.`;
  }

  // 4. Priority Areas for Repair
  const priorityAreas: SubjectAIPriorityArea[] = [];
  const weakestChapters = [...chapterPerformance]
    .filter((c) => c.attempted >= 2 && c.accuracy < 65)
    .sort((a, b) => a.accuracy - b.accuracy);

  weakestChapters.slice(0, 2).forEach((wc) => {
    const chapterMistakes = questions.filter(
      (q) => q.chapter === wc.chapter && q.isCorrect === false
    );
    priorityAreas.push({
      title: `Rebuild ${wc.chapter} Accuracy`,
      reason: `Recorded ${wc.accuracy}% accuracy across ${wc.attempted} attempts (${wc.primaryDiagnosis || "Knowledge Gap"}).`,
      evidenceQuestionIds: chapterMistakes.map((q) => q.questionId).slice(0, 3),
      actions: [
        `Review NCERT summary for ${wc.chapter}.`,
        "Complete a targeted 5-question repair drill focusing on primary failure mechanism.",
      ],
      recommendedDrillTopic: wc.chapter,
      recommendedDrillType: wc.attempted < 5 ? "5-Question Concept Repair" : "10-Question Application Drill",
    });
  });

  if (priorityAreas.length === 0) {
    priorityAreas.push({
      title: "Maintain Domain Speed & Exam Stamina",
      reason: `Accuracy is solid at ${accuracyPercentage}% across ${totalAttempted} questions. Focus is now on pacing and zero careless errors.`,
      evidenceQuestionIds: questions.map((q) => q.questionId).slice(0, 3),
      actions: ["Attempt full-length mixed CBT mock under strict 45-minute timing."],
      recommendedDrillType: "15-Question Mixed Remediation",
    });
  }

  // 5. Learning Profile
  const strongChapters = chapterPerformance
    .filter((c) => c.attempted >= 2 && c.accuracy >= 75)
    .map((c) => `${c.chapter} (${c.accuracy}%)`);

  const weakChapters = chapterPerformance
    .filter((c) => c.attempted >= 2 && c.accuracy < 65)
    .map((c) => `${c.chapter} (${c.accuracy}%)`);

  const learningProfile: SubjectLearningProfile = {
    strengths: strongChapters.length > 0 ? strongChapters : ["Broad domain exposure"],
    weaknesses: weakChapters.length > 0 ? weakChapters : ["No critical chapter failures detected"],
    recurringIssues: keyPatterns.map((p) => p.title),
    transferableIssues: crossChapterPatterns.map((p) => p.pattern),
    difficultyPattern: `${difficultyStats.easy.accuracy}% Easy → ${difficultyStats.medium.accuracy}% Medium → ${difficultyStats.hard.accuracy}% Hard`,
    recommendedFocus: priorityAreas.map((p) => p.title),
  };

  // Cycle integration observations
  const cycleObservations: string[] = [];
  if (cycleInfo) {
    cycleObservations.push(`Diagnostic Cycle ${cycleInfo.currentCycleNumber}: ${cycleInfo.currentCycleQuestionCount}/150 questions accumulated.`);
    if (cycleInfo.resolvedWeaknesses && cycleInfo.resolvedWeaknesses.length > 0) {
      cycleObservations.push(`Resolved from prior cycle: ${cycleInfo.resolvedWeaknesses.join(", ")}`);
    }
    if (cycleInfo.recurringWeaknesses && cycleInfo.recurringWeaknesses.length > 0) {
      cycleObservations.push(`Recurring across cycles: ${cycleInfo.recurringWeaknesses.join(", ")}`);
    }
  }

  const summary = `Analyzed ${totalAttempted} qualifying questions in ${subject} (${accuracyPercentage}% overall accuracy, ${avgTimeSeconds}s average response). Telemetry confirms ${keyPatterns.length} operational error patterns across ${chapterPerformance.length} tested topics.`;

  return {
    subject,
    generatedAt: new Date().toISOString(),
    status: "fallback",
    diagnosticConfidence,
    evidenceThresholdLabel,
    subjectSummary: summary,
    keyPatterns,
    knowledgePatterns,
    performancePatterns,
    interpretationPatterns,
    crossChapterPatterns,
    difficultyAnalysis: {
      easy: easyEval,
      medium: mediumEval,
      hard: hardEval,
    },
    priorityAreas,
    learningProfile,
    cycleIntegration: cycleInfo
      ? {
          currentCycleNumber: cycleInfo.currentCycleNumber,
          cycleQuestionCount: cycleInfo.currentCycleQuestionCount,
          observations: cycleObservations,
        }
      : undefined,
  };
}

/**
 * Generate Real AI Analysis for Subject Weakness Radar using Groq LPU with robust fallback.
 * Strictly respects confidence thresholds, evidence question IDs, and deterministic facts.
 */
export async function generateSubjectRadarAIAnalysis(
  payload: SubjectRadarAIPayload
): Promise<SubjectRadarAIAnalysis> {
  // If data is insufficient (<5 attempts), return deterministic baseline immediately without LLM call
  if (payload.deterministicStats.totalAttempted < 5) {
    return buildDeterministicSubjectRadarAI(payload);
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return buildDeterministicSubjectRadarAI(payload);
  }

  try {
    const groq = new Groq({ apiKey });

    // Construct verified prompt strictly from telemetry
    const systemPrompt = `You are the CUET Domain Intelligence Diagnostic Engine.
Your task is to act as an objective evidence-based AI learning analyst for a CUET aspirant in the subject "${payload.subject}".

STRICT RULES:
1. NEVER invent questions, scores, percentages, attempts, or historical facts. Use ONLY the provided evidence.
2. DO NOT simply repeat raw scores like "accuracy is X%". Analyze the UNDERLYING ERROR MECHANISM from the question stems, options, and explanations.
3. Distinguish between:
   - KNOWLEDGE PROBLEM: concept misunderstanding, missing definition, formula confusion.
   - PERFORMANCE PROBLEM: calculation errors, sign errors, slow execution, careless slip.
   - QUESTION INTERPRETATION: negative qualifiers (NOT, EXCEPT, INCORRECT), distractor attraction.
4. Detect CROSS-CHAPTER patterns: Does the same underlying flaw (e.g. calculation setup or qualifier miss) occur across multiple chapters? NEVER invent cross-chapter patterns simply because two chapters have low accuracy. Only group if the underlying error mechanism is identical.
5. Reference actual question IDs in evidenceQuestionIds array whenever discussing a pattern.
6. Adhere strictly to the student's deterministic confidence tier: "${payload.deterministicStats.evidenceThresholdLabel}".
   If tier is "Early signal" or "Emerging weakness", use observational phrasing ("Early signal indicates...", "Observed in 2 attempts..."). Never declare absolute certainty.
7. PACING & PSYCHOLOGICAL CLAIMS: NEVER claim the student "guessed", "panicked", or was "careless".
   Use purely observational telemetry language (e.g. "Rapid response telemetry (<15s) observed on...", "Extended duration (>75s) observed on correct solutions indicates slow retrieval rather than conceptual weakness").
   Do NOT classify correct-but-slow questions as accuracy weaknesses; surface them strictly as pacing observations.
8. DIFFICULTY PARADOX: Inspect the actual evidence across easy vs medium vs hard. If easy accuracy is low and hard accuracy is high, interpret that directly (e.g. foundational slip vs complex competence) rather than defaulting to "hard questions are weak".
9. Return strictly valid JSON matching the exact schema requested with NO markdown backticks or commentary outside JSON.`;

    const userPrompt = JSON.stringify({
      subject: payload.subject,
      deterministicStats: payload.deterministicStats,
      cycleInfo: payload.cycleInfo,
      questionsSummary: payload.questions.map((q) => ({
        id: q.questionId,
        chapter: q.chapter,
        microTopic: q.microTopic,
        prompt: q.prompt.slice(0, 140),
        selectedOption: q.selectedOption,
        correctOption: q.correctOption,
        isCorrect: q.isCorrect,
        timeSeconds: q.timeSpentSeconds,
        difficulty: q.difficulty,
        errorCategory: q.errorCategory,
      })),
    });

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Analyze this subject evidence pack and produce the JSON diagnostic report:\n${userPrompt}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content?.trim();
    if (!raw) {
      return buildDeterministicSubjectRadarAI(payload);
    }

    const parsed = JSON.parse(raw);

    // Merge parsed AI output with guaranteed deterministic boundaries
    const fallback = buildDeterministicSubjectRadarAI(payload);

    return {
      subject: payload.subject,
      generatedAt: new Date().toISOString(),
      status: "completed",
      diagnosticConfidence: payload.deterministicStats.diagnosticConfidence,
      evidenceThresholdLabel: payload.deterministicStats.evidenceThresholdLabel,
      subjectSummary: parsed.subjectSummary || fallback.subjectSummary,
      keyPatterns: Array.isArray(parsed.keyPatterns) && parsed.keyPatterns.length > 0
        ? parsed.keyPatterns.map((kp: any) => ({
            title: kp.title || "Identified Error Pattern",
            description: kp.description || "",
            evidenceQuestionIds: Array.isArray(kp.evidenceQuestionIds) ? kp.evidenceQuestionIds : [],
            confidence: kp.confidence || "medium",
            classification: kp.classification || "KNOWLEDGE_PROBLEM",
          }))
        : fallback.keyPatterns,
      knowledgePatterns: Array.isArray(parsed.knowledgePatterns) && parsed.knowledgePatterns.length > 0
        ? parsed.knowledgePatterns
        : fallback.knowledgePatterns,
      performancePatterns: Array.isArray(parsed.performancePatterns) && parsed.performancePatterns.length > 0
        ? parsed.performancePatterns
        : fallback.performancePatterns,
      interpretationPatterns: Array.isArray(parsed.interpretationPatterns) && parsed.interpretationPatterns.length > 0
        ? parsed.interpretationPatterns
        : fallback.interpretationPatterns,
      crossChapterPatterns: Array.isArray(parsed.crossChapterPatterns) && parsed.crossChapterPatterns.length > 0
        ? parsed.crossChapterPatterns
        : fallback.crossChapterPatterns,
      difficultyAnalysis: parsed.difficultyAnalysis || fallback.difficultyAnalysis,
      priorityAreas: Array.isArray(parsed.priorityAreas) && parsed.priorityAreas.length > 0
        ? parsed.priorityAreas.map((pa: any) => ({
            title: pa.title || "Priority Repair Area",
            reason: pa.reason || "",
            evidenceQuestionIds: Array.isArray(pa.evidenceQuestionIds) ? pa.evidenceQuestionIds : [],
            actions: Array.isArray(pa.actions) ? pa.actions : ["Practice 5 targeted questions"],
            recommendedDrillTopic: pa.recommendedDrillTopic || fallback.priorityAreas[0]?.recommendedDrillTopic,
            recommendedDrillType: pa.recommendedDrillType || fallback.priorityAreas[0]?.recommendedDrillType,
          }))
        : fallback.priorityAreas,
      learningProfile: {
        strengths: Array.isArray(parsed.learningProfile?.strengths) && parsed.learningProfile.strengths.length > 0
          ? parsed.learningProfile.strengths
          : fallback.learningProfile.strengths,
        weaknesses: Array.isArray(parsed.learningProfile?.weaknesses) && parsed.learningProfile.weaknesses.length > 0
          ? parsed.learningProfile.weaknesses
          : fallback.learningProfile.weaknesses,
        recurringIssues: Array.isArray(parsed.learningProfile?.recurringIssues) && parsed.learningProfile.recurringIssues.length > 0
          ? parsed.learningProfile.recurringIssues
          : fallback.learningProfile.recurringIssues,
        transferableIssues: Array.isArray(parsed.learningProfile?.transferableIssues) && parsed.learningProfile.transferableIssues.length > 0
          ? parsed.learningProfile.transferableIssues
          : fallback.learningProfile.transferableIssues,
        difficultyPattern: parsed.learningProfile?.difficultyPattern || fallback.learningProfile.difficultyPattern,
        recommendedFocus: Array.isArray(parsed.learningProfile?.recommendedFocus) && parsed.learningProfile.recommendedFocus.length > 0
          ? parsed.learningProfile.recommendedFocus
          : fallback.learningProfile.recommendedFocus,
      },
      cycleIntegration: fallback.cycleIntegration,
    };
  } catch (err) {
    console.warn("Groq subject radar AI analysis call failed; using deterministic fallback:", err);
    return buildDeterministicSubjectRadarAI(payload);
  }
}
