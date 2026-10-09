import {
  DiagnosticCycle,
  CycleComparisonResult,
  CycleImprovedItem,
  CycleRecurringWeakItem,
  CycleResolvedItem,
  CycleNewMistakeItem,
  CycleDeclinedItem,
  CycleRecommendedFocus,
  CycleAIAnalysis,
  CycleSubjectPerformance,
  CycleTopicPerformance,
} from "@/types/cycle";
import { RecordedQuestionAttempt, TopicMastery } from "@/types";
import {
  generateFullTopicDiagnosis,
  classifyErrorTaxonomy,
} from "@/lib/diagnostic-engine";
import { normalizeSubject } from "@/lib/analytics";
import Groq from "groq-sdk";

export const CYCLE_WINDOW_SIZE = 150;

/**
 * Deterministically compute all metrics and diagnoses for a single 150-question cycle window.
 */
export function computeCycleMetrics(
  questions: RecordedQuestionAttempt[],
  cycleNumber: number,
  startedAt?: string,
  completedAt?: string
): DiagnosticCycle {
  // Only qualifying answered attempts count towards the cycle
  const qualifying = questions.filter(
    (q) => q.selectedOption !== null && q.selectedOption !== undefined
  );

  const totalAttempted = qualifying.length;
  const correctCount = qualifying.filter((q) => q.isCorrect === true).length;
  const incorrectCount = totalAttempted - correctCount;
  const accuracyPercentage =
    totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

  const totalTimeSpent = qualifying.reduce(
    (sum, q) => sum + (q.timeSpentSeconds || 0),
    0
  );
  const avgTimeSeconds =
    totalAttempted > 0 ? Math.round(totalTimeSpent / totalAttempted) : 0;

  const fastResponsesCount = qualifying.filter(
    (q) => (q.timeSpentSeconds || 0) < 15
  ).length;
  const slowResponsesCount = qualifying.filter(
    (q) => (q.timeSpentSeconds || 0) > 75
  ).length;

  // 1. Group by Subject
  const subjectGroups = new Map<string, RecordedQuestionAttempt[]>();
  qualifying.forEach((q) => {
    const rawSub = q.subject || "Physics";
    const info = normalizeSubject(rawSub);
    const existing = subjectGroups.get(info.key) || [];
    existing.push(q);
    subjectGroups.set(info.key, existing);
  });

  const subjectPerformance: Record<string, CycleSubjectPerformance> = {};
  subjectGroups.forEach((qList, key) => {
    const info = normalizeSubject(key);
    const subAttempted = qList.length;
    const subCorrect = qList.filter((q) => q.isCorrect === true).length;
    const subIncorrect = subAttempted - subCorrect;
    const subAccuracy =
      subAttempted > 0 ? Math.round((subCorrect / subAttempted) * 100) : 0;
    const subTime = qList.reduce((s, q) => s + (q.timeSpentSeconds || 0), 0);
    const subAvgTime = subAttempted > 0 ? Math.round(subTime / subAttempted) : 0;

    subjectPerformance[key] = {
      subject: info.name,
      subjectKey: info.key,
      attempted: subAttempted,
      correct: subCorrect,
      incorrect: subIncorrect,
      accuracy: subAccuracy,
      avgTimeSeconds: subAvgTime,
    };
  });

  // 2. Group by Chapter / Micro-Topic
  const topicGroups = new Map<string, RecordedQuestionAttempt[]>();
  qualifying.forEach((q) => {
    const chapter = q.chapter || "Core Chapter";
    const key = `${q.subject || "Domain"}:::${chapter}`;
    const existing = topicGroups.get(key) || [];
    existing.push(q);
    topicGroups.set(key, existing);
  });

  const topicPerformance: CycleTopicPerformance[] = [];
  const diagnosedWeaknesses: TopicMastery[] = [];
  const strengths: TopicMastery[] = [];

  topicGroups.forEach((qList, key) => {
    const parts = key.split(":::");
    const subRaw = parts[0] || "Physics";
    const chapterName = parts[1] || "Core Chapter";
    const subInfo = normalizeSubject(subRaw);
    const attempts = qList.length;
    const correct = qList.filter((q) => q.isCorrect === true).length;
    const incorrect = attempts - correct;
    const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
    const timeSpent = qList.reduce((s, q) => s + (q.timeSpentSeconds || 0), 0);
    const avgTime = attempts > 0 ? Math.round(timeSpent / attempts) : 0;
    const microTopic = qList[0]?.microTopic || chapterName;

    // Run Full Topic Diagnosis from diagnostic engine
    const diag = generateFullTopicDiagnosis(
      subInfo.key,
      chapterName,
      microTopic,
      attempts,
      correct,
      incorrect,
      avgTime,
      qList
    );

    const topicEntry: CycleTopicPerformance = {
      chapter: chapterName,
      microTopic,
      subject: subInfo.name,
      attempts,
      correct,
      incorrect,
      accuracy,
      avgTimeSeconds: avgTime,
      primaryDiagnosis: diag.primaryDiagnosis,
      contributingFactor: diag.contributingFactor,
      problemClassification: diag.problemClassification,
      errorPattern: diag.primaryFailurePattern,
    };
    topicPerformance.push(topicEntry);

    const topicMastery: TopicMastery = {
      chapter: chapterName,
      microTopic,
      subject: subInfo.name,
      accuracyPercentage: accuracy,
      attemptsCount: attempts,
      correctCount: correct,
      incorrectCount: incorrect,
      timeSinksCount: qList.filter((q) => (q.timeSpentSeconds || 0) > 75).length,
      avgTimeSeconds: avgTime,
      status: accuracy < 65 ? "critical" : accuracy < 80 ? "polish" : "mastered",
      fullDiagnosis: diag,
    };

    if (accuracy < 65 && attempts >= 2) {
      diagnosedWeaknesses.push(topicMastery);
    } else if (accuracy >= 75 && attempts >= 2) {
      strengths.push(topicMastery);
    }
  });

  // Sort weaknesses by lowest accuracy, then highest attempts
  diagnosedWeaknesses.sort((a, b) => {
    if (a.accuracyPercentage !== b.accuracyPercentage) {
      return a.accuracyPercentage - b.accuracyPercentage;
    }
    return b.attemptsCount - a.attemptsCount;
  });

  // Sort strengths by highest accuracy
  strengths.sort((a, b) => b.accuracyPercentage - a.accuracyPercentage);

  // 3. Classify Overall Error Taxonomy
  const errorTaxonomy = classifyErrorTaxonomy(
    totalAttempted,
    incorrectCount,
    avgTimeSeconds,
    60,
    accuracyPercentage,
    qualifying
  );

  // 4. Response Telemetry Pacing note
  let pacingIssue = "Standard response pace maintained across attempted questions.";
  if (fastResponsesCount >= 20) {
    pacingIssue = `Very fast responses detected (~${avgTimeSeconds}s/Q). Telemetry cannot determine whether this reflects rapid guessing or instant selection.`;
  } else if (slowResponsesCount >= 15) {
    pacingIssue = "Extended solving times detected on multi-step calculation stems.";
  }

  const isCompleted = totalAttempted >= CYCLE_WINDOW_SIZE;

  return {
    cycleNumber,
    status: isCompleted ? "completed" : "in_progress",
    startedAt: startedAt || new Date().toISOString(),
    completedAt: isCompleted ? completedAt || new Date().toISOString() : undefined,
    questionCount: totalAttempted,
    totalQuestionsAttempted: totalAttempted,
    correctCount,
    correctAnswersCount: correctCount,
    incorrectCount,
    accuracyPercentage,
    overallAccuracyPercentage: accuracyPercentage,
    avgTimeSeconds,
    questions: qualifying.slice(0, CYCLE_WINDOW_SIZE),
    subjectPerformance,
    topicPerformance,
    errorTaxonomy,
    diagnosedWeaknesses,
    strengths,
    responseTelemetry: {
      avgTimeSeconds,
      fastResponsesCount,
      slowResponsesCount,
      pacingIssue,
    },
  };
}

/**
 * Deterministic comparison between Cycle N and Cycle N - 1.
 * Answers all 6 core diagnostic questions strictly from recorded telemetry.
 */
export function compareDiagnosticCycles(
  prevCycle: DiagnosticCycle,
  currentCycle: DiagnosticCycle
): CycleComparisonResult {
  const overallAccuracyChange =
    currentCycle.accuracyPercentage - prevCycle.accuracyPercentage;

  const prevTopicMap = new Map<string, CycleTopicPerformance>();
  prevCycle.topicPerformance.forEach((t) => {
    prevTopicMap.set(`${t.subject}:::${t.chapter}`.toLowerCase(), t);
  });

  const currTopicMap = new Map<string, CycleTopicPerformance>();
  currentCycle.topicPerformance.forEach((t) => {
    currTopicMap.set(`${t.subject}:::${t.chapter}`.toLowerCase(), t);
  });

  const whatImproved: CycleImprovedItem[] = [];
  const whatRemainedWeak: CycleRecurringWeakItem[] = [];
  const whatWasFixed: CycleResolvedItem[] = [];
  const newMistakes: CycleNewMistakeItem[] = [];
  const whatGotWorse: CycleDeclinedItem[] = [];

  // 1. Compare Topics
  currTopicMap.forEach((curr, key) => {
    const prev = prevTopicMap.get(key);

    if (prev) {
      const accuracyDiff = curr.accuracy - prev.accuracy;

      // Check for What Was Fixed (Was <60% in prev with attempts, now >=75% with >=3 attempts)
      if (prev.accuracy < 60 && curr.accuracy >= 75 && curr.attempts >= 3) {
        whatWasFixed.push({
          name: curr.chapter,
          subject: curr.subject,
          previousAccuracy: prev.accuracy,
          currentAccuracy: curr.accuracy,
          previousErrors: prev.incorrect,
          currentErrors: curr.incorrect,
          currentAttempts: curr.attempts,
          explanation: `Resolved. Accuracy improved from ${prev.accuracy}% to ${curr.accuracy}% across ${curr.attempts} questions (${curr.incorrect} error(s) vs ${prev.incorrect} in Cycle ${prevCycle.cycleNumber}).`,
        });
      }
      // Check for What Improved (+5 percentage points or significant error reduction)
      else if (accuracyDiff >= 5 && curr.attempts >= 2) {
        const errorsReduced = Math.max(0, prev.incorrect - curr.incorrect);
        whatImproved.push({
          type: "topic",
          name: curr.chapter,
          subject: curr.subject,
          previousAccuracy: prev.accuracy,
          currentAccuracy: curr.accuracy,
          improvementPercentagePoints: accuracyDiff,
          previousErrors: prev.incorrect,
          currentErrors: curr.incorrect,
          errorsReduced,
          explanation: `${curr.chapter} improved by +${accuracyDiff} percentage points (${prev.accuracy}% → ${curr.accuracy}%) with ${curr.incorrect} error(s) in Cycle ${currentCycle.cycleNumber}.`,
        });
      }
      // Check for What Got Worse (Regressions: drop >= 15 points with >= 3 attempts in both)
      else if (accuracyDiff <= -15 && prev.attempts >= 3 && curr.attempts >= 3) {
        whatGotWorse.push({
          name: curr.chapter,
          subject: curr.subject,
          previousAccuracy: prev.accuracy,
          currentAccuracy: curr.accuracy,
          dropPercentagePoints: Math.abs(accuracyDiff),
          previousErrors: prev.incorrect,
          currentErrors: curr.incorrect,
          telemetryEvidence: `Accuracy declined from ${prev.accuracy}% to ${curr.accuracy}% (${curr.incorrect} errors in Cycle ${currentCycle.cycleNumber} vs ${prev.incorrect} in Cycle ${prevCycle.cycleNumber}).`,
          explanation: `Performance decline detected in ${curr.chapter}. Drop of ${Math.abs(accuracyDiff)} percentage points under timed conditions.`,
        });
      }
      // Check for What Remained Weak (both cycles < 65% accuracy)
      else if (prev.accuracy < 65 && curr.accuracy < 65 && curr.attempts >= 2) {
        const errorPatternChanged =
          Boolean(prev.primaryDiagnosis && curr.primaryDiagnosis && prev.primaryDiagnosis !== curr.primaryDiagnosis);

        let explanation = `${curr.chapter} remains weak (${prev.accuracy}% in Cycle ${prevCycle.cycleNumber} vs ${curr.accuracy}% in Cycle ${currentCycle.cycleNumber}).`;
        if (errorPatternChanged) {
          explanation += ` Telemetry shows the error pattern shifted from ${prev.primaryDiagnosis} to ${curr.primaryDiagnosis}.`;
        } else {
          explanation += ` Persistent issue: ${curr.primaryDiagnosis || "conceptual and execution inconsistency"}.`;
        }

        whatRemainedWeak.push({
          name: curr.chapter,
          subject: curr.subject,
          previousAccuracy: prev.accuracy,
          currentAccuracy: curr.accuracy,
          previousPrimaryDiagnosis: prev.primaryDiagnosis || "Conceptual Gap",
          currentPrimaryDiagnosis: curr.primaryDiagnosis || "Conceptual Gap",
          previousErrorPattern: prev.errorPattern || "Unspecified",
          currentErrorPattern: curr.errorPattern || "Unspecified",
          errorPatternChanged,
          explanation,
        });
      }
    } else {
      // Topic was NOT attempted or present in prevCycle
      // If it has low accuracy in currentCycle, check if it is a New Mistake
      if (curr.accuracy < 60 && curr.attempts >= 3 && curr.incorrect >= 2) {
        newMistakes.push({
          name: curr.chapter,
          subject: curr.subject,
          currentAccuracy: curr.accuracy,
          currentAttempts: curr.attempts,
          currentErrors: curr.incorrect,
          primaryDiagnosis: curr.primaryDiagnosis || "Emerging Pattern",
          contributingFactor: curr.contributingFactor || "First Cycle Telemetry",
          explanation: `New pattern in Cycle ${currentCycle.cycleNumber}: ${curr.chapter} recorded ${curr.incorrect} errors across ${curr.attempts} attempts (${curr.accuracy}% accuracy). Primary pattern: ${curr.primaryDiagnosis || "Distractor Selection"}.`,
        });
      }
    }
  });

  // Check error taxonomy changes (e.g. calculation errors reduced, qualifier misses reduced)
  const prevTax = prevCycle.errorTaxonomy;
  const currTax = currentCycle.errorTaxonomy;

  if (prevTax && currTax) {
    if (prevTax.questionInterpretationCount > currTax.questionInterpretationCount && prevTax.questionInterpretationCount >= 3) {
      const diff = prevTax.questionInterpretationCount - currTax.questionInterpretationCount;
      whatImproved.push({
        type: "error_category",
        name: "Qualifier-Word & NOT/EXCEPT Traps",
        previousAccuracy: Math.round(((150 - prevTax.questionInterpretationCount) / 150) * 100),
        currentAccuracy: Math.round(((150 - currTax.questionInterpretationCount) / 150) * 100),
        improvementPercentagePoints: Math.round((diff / 150) * 100),
        previousErrors: prevTax.questionInterpretationCount,
        currentErrors: currTax.questionInterpretationCount,
        errorsReduced: diff,
        explanation: `Qualifier-word mistakes dropped from ${prevTax.questionInterpretationCount} to ${currTax.questionInterpretationCount} (${diff} fewer trap errors).`,
      });
    }

    if (prevTax.calculationCount > currTax.calculationCount && prevTax.calculationCount >= 3) {
      const diff = prevTax.calculationCount - currTax.calculationCount;
      whatImproved.push({
        type: "error_category",
        name: "Numerical Calculation & Sign Errors",
        previousAccuracy: Math.round(((150 - prevTax.calculationCount) / 150) * 100),
        currentAccuracy: Math.round(((150 - currTax.calculationCount) / 150) * 100),
        improvementPercentagePoints: Math.round((diff / 150) * 100),
        previousErrors: prevTax.calculationCount,
        currentErrors: currTax.calculationCount,
        errorsReduced: diff,
        explanation: `Calculation errors decreased from ${prevTax.calculationCount} to ${currTax.calculationCount} (${diff} fewer execution slips).`,
      });
    }
  }

  // 6. Actionable Recommended Focus for Next Cycle
  const recommendedFocus: CycleRecommendedFocus[] = [];
  let priorityCounter = 1;

  // Priority 1: Shifted recurring weaknesses (quick win)
  whatRemainedWeak
    .filter((w) => w.errorPatternChanged)
    .forEach((w) => {
      recommendedFocus.push({
        priority: priorityCounter++,
        title: `Targeted Drill on ${w.name}`,
        topic: w.name,
        subject: w.subject,
        reason: `Difficulty shifted to ${w.currentPrimaryDiagnosis}. A focused drill will lock in recent concept gains.`,
        recommendedDrill: "10-Question Application Drill",
      });
    });

  // Priority 2: Unresolved persistent weaknesses (<50% accuracy)
  whatRemainedWeak
    .filter((w) => !w.errorPatternChanged && w.currentAccuracy < 50)
    .forEach((w) => {
      if (priorityCounter <= 5) {
        recommendedFocus.push({
          priority: priorityCounter++,
          title: `Rebuild Foundations: ${w.name}`,
          topic: w.name,
          subject: w.subject,
          reason: `Persistent accuracy at ${w.currentAccuracy}%. Review core NCERT definitions before next mock.`,
          recommendedDrill: "5-Question Concept Repair",
        });
      }
    });

  // Priority 3: Newly emerged patterns
  newMistakes.forEach((m) => {
    if (priorityCounter <= 5) {
      recommendedFocus.push({
        priority: priorityCounter++,
        title: `Contain Emerging Issue: ${m.name}`,
        topic: m.name,
        subject: m.subject,
        reason: `Emerged in Cycle ${currentCycle.cycleNumber} with ${m.currentErrors} errors. Address early to prevent compounding.`,
        recommendedDrill: "Misconception Repair Drill",
      });
    }
  });

  // Priority 4: Performance declines
  whatGotWorse.forEach((d) => {
    if (priorityCounter <= 5) {
      recommendedFocus.push({
        priority: priorityCounter++,
        title: `Recover Pace in ${d.name}`,
        topic: d.name,
        subject: d.subject,
        reason: `Dropped ${d.dropPercentagePoints} percentage points. Check time management and sign precision.`,
        recommendedDrill: "10-Question Timed Drill",
      });
    }
  });

  // Fallback if no critical issues found
  if (recommendedFocus.length === 0) {
    recommendedFocus.push({
      priority: 1,
      title: "Maintain Mixed Practice Pace",
      topic: "All Domain Subjects",
      subject: "General",
      reason: "Performance stable across cycles. Continue timed mixed mocks to build stamina.",
      recommendedDrill: "15-Question Mixed Remediation",
    });
  }

  return {
    previousCycleNumber: prevCycle.cycleNumber,
    currentCycleNumber: currentCycle.cycleNumber,
    overallAccuracyChange,
    accuracyDelta: overallAccuracyChange,
    previousOverallAccuracy: prevCycle.accuracyPercentage,
    currentOverallAccuracy: currentCycle.accuracyPercentage,
    whatImproved,
    improved: whatImproved,
    whatRemainedWeak,
    recurringWeak: whatRemainedWeak,
    whatWasFixed,
    resolved: whatWasFixed,
    newMistakes,
    whatGotWorse,
    declined: whatGotWorse,
    recommendedFocus,
  };
}

/**
 * Generate AI interpretation for a completed cycle.
 * Uses Groq/Gemini if configured, with a 100% deterministic fallback so data is never lost.
 */
export async function generateCycleAIInterpretation(
  currentCycle: DiagnosticCycle,
  prevCycle?: DiagnosticCycle
): Promise<CycleAIAnalysis> {
  const isFirstCycle = !prevCycle || currentCycle.cycleNumber === 1;

  // Build factual prompt payload strictly from verified telemetry
  const telemetrySummary = {
    cycleNumber: currentCycle.cycleNumber,
    isBaseline: isFirstCycle,
    overallAccuracy: currentCycle.accuracyPercentage,
    totalQuestions: currentCycle.questionCount,
    avgTimeSeconds: currentCycle.avgTimeSeconds,
    weaknessesCount: currentCycle.diagnosedWeaknesses.length,
    strengthsCount: currentCycle.strengths.length,
    topWeaknesses: currentCycle.diagnosedWeaknesses.slice(0, 3).map((w) => ({
      topic: w.chapter,
      subject: w.subject,
      accuracy: w.accuracyPercentage,
      errorType: w.fullDiagnosis?.primaryDiagnosis,
    })),
    topStrengths: currentCycle.strengths.slice(0, 3).map((s) => ({
      topic: s.chapter,
      subject: s.subject,
      accuracy: s.accuracyPercentage,
    })),
    comparison: currentCycle.comparison
      ? {
          overallChange: currentCycle.comparison.overallAccuracyChange,
          improvedCount: currentCycle.comparison.whatImproved.length,
          remainedWeakCount: currentCycle.comparison.whatRemainedWeak.length,
          fixedCount: currentCycle.comparison.whatWasFixed.length,
          newMistakesCount: currentCycle.comparison.newMistakes.length,
          declinedCount: currentCycle.comparison.whatGotWorse.length,
        }
      : null,
  };

  const groqApiKey = process.env.GROQ_API_KEY;

  if (groqApiKey && !groqApiKey.includes("placeholder")) {
    try {
      const groq = new Groq({ apiKey: groqApiKey });
      const prompt = `You are an expert CUET psychometric exam diagnostics engine.
Analyze this completed 150-question Diagnostic Cycle:
${JSON.stringify(telemetrySummary, null, 2)}

Provide an observational, evidence-based interpretation conforming STRICTLY to this JSON format (no code fence, no commentary):
{
  "overallNarrative": "2-3 sentences summarizing performance and telemetry shift without psychological speculation",
  "recurringMisconceptions": ["bullet 1", "bullet 2"],
  "crossTopicPatterns": ["pattern 1", "pattern 2"],
  "behavioralShift": "1 sentence on response time or distractor selection pattern",
  "personalizedRoadmap": ["Actionable step 1", "Actionable step 2", "Actionable step 3"]
}`;

      const res = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 600,
        response_format: { type: "json_object" },
      });

      const raw = res.choices[0]?.message?.content?.trim();
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          status: "completed",
          generatedAt: new Date().toISOString(),
          overallNarrative: parsed.overallNarrative || "Telemetry analysis completed.",
          recurringMisconceptions: Array.isArray(parsed.recurringMisconceptions) ? parsed.recurringMisconceptions : [],
          crossTopicPatterns: Array.isArray(parsed.crossTopicPatterns) ? parsed.crossTopicPatterns : [],
          behavioralShift: parsed.behavioralShift,
          personalizedRoadmap: Array.isArray(parsed.personalizedRoadmap) ? parsed.personalizedRoadmap : [],
        };
      }
    } catch (err) {
      console.warn("Groq Cycle AI Interpretation notice:", err);
    }
  }

  // Robust deterministic fallback based strictly on actual telemetry
  let narrative = "";
  if (isFirstCycle) {
    narrative = `Cycle 1 establishes your initial diagnostic baseline with ${currentCycle.accuracyPercentage}% accuracy across 150 questions. Strong performance observed in ${currentCycle.strengths[0]?.chapter || "core concepts"}, with remediation required in ${currentCycle.diagnosedWeaknesses[0]?.chapter || "foundational areas"}.`;
  } else {
    const change = currentCycle.comparison?.overallAccuracyChange || 0;
    const changeStr = change >= 0 ? `+${change}%` : `${change}%`;
    narrative = `Cycle ${currentCycle.cycleNumber} concluded with ${currentCycle.accuracyPercentage}% accuracy (${changeStr} vs Cycle ${currentCycle.cycleNumber - 1}). Telemetry highlights ${currentCycle.comparison?.whatImproved.length || 0} improving area(s) and ${currentCycle.comparison?.whatRemainedWeak.length || 0} recurring weakness pattern(s).`;
  }

  const recurringMisconceptions: string[] = [];
  currentCycle.diagnosedWeaknesses.slice(0, 3).forEach((w) => {
    recurringMisconceptions.push(
      `${w.chapter} (${w.subject}): ${w.fullDiagnosis?.primaryDiagnosis || "Error pattern"} (${w.accuracyPercentage}% accuracy across ${w.attemptsCount} attempts).`
    );
  });

  const crossTopicPatterns: string[] = [];
  if (currentCycle.errorTaxonomy.questionInterpretationCount >= 3) {
    crossTopicPatterns.push(
      `Keyword qualifier misses ('NOT/EXCEPT') recorded across multiple domain subjects.`
    );
  }
  if (currentCycle.errorTaxonomy.calculationCount >= 3) {
    crossTopicPatterns.push(
      `Numerical calculation slips under timed exam pressure.`
    );
  }
  if (crossTopicPatterns.length === 0) {
    crossTopicPatterns.push("Isolated errors with consistent foundational theory grasp.");
  }

  const roadmap: string[] = [];
  currentCycle.comparison?.recommendedFocus.slice(0, 3).forEach((rf) => {
    roadmap.push(`${rf.title}: ${rf.reason}`);
  });
  if (roadmap.length === 0) {
    roadmap.push(`Complete targeted practice drill on ${currentCycle.diagnosedWeaknesses[0]?.chapter || "weak areas"}.`);
    roadmap.push("Review NCERT key definitions and sign conventions.");
    roadmap.push("Proceed to next full CBT domain mock.");
  }

  return {
    status: "completed",
    generatedAt: new Date().toISOString(),
    overallNarrative: narrative,
    recurringMisconceptions,
    crossTopicPatterns,
    behavioralShift: currentCycle.responseTelemetry.pacingIssue,
    personalizedRoadmap: roadmap,
  };
}

/**
 * Process a batch of qualifying question attempts into the 150-question cycle pipeline.
 * Completely idempotent: guarantees no double counting and no question 151 inside a cycle.
 */
export async function processQuestionsIntoCycles(
  existingCycles: DiagnosticCycle[],
  allAttempts: RecordedQuestionAttempt[]
): Promise<{
  cycles: DiagnosticCycle[];
  currentCycleNumber: number;
  currentCycleQuestionCount: number;
  justCompletedCycle: DiagnosticCycle | null;
}> {
  // Only unique qualifying answered attempts count towards diagnostic cycles
  const seenCanonicalKeys = new Set<string>();
  const qualifying: RecordedQuestionAttempt[] = [];

  for (const q of allAttempts) {
    if (q.selectedOption === null || q.selectedOption === undefined) continue;
    const testKey = ((q as any).testId || (q as any).mockId || (q as any).sessionId || "mock").trim();
    const qKey = (q.questionId || (q.questionNumber !== undefined ? `q_${q.questionNumber}` : "q")).trim();
    const canonicalKey = `${testKey}:::${qKey}`;
    if (seenCanonicalKeys.has(canonicalKey)) continue;
    seenCanonicalKeys.add(canonicalKey);
    qualifying.push(q);
  }

  const totalQuestions = qualifying.length;
  const completedCycleCount = Math.floor(totalQuestions / CYCLE_WINDOW_SIZE);
  const remainderQuestions = totalQuestions % CYCLE_WINDOW_SIZE;

  const updatedCycles: DiagnosticCycle[] = [...existingCycles];
  let justCompletedCycle: DiagnosticCycle | null = null;

  // Process all fully completed cycles
  for (let c = 0; c < completedCycleCount; c++) {
    const cycleNum = c + 1;
    const startIndex = c * CYCLE_WINDOW_SIZE;
    const endIndex = startIndex + CYCLE_WINDOW_SIZE;
    const cycleQuestions = qualifying.slice(startIndex, endIndex);

    const existingIdx = updatedCycles.findIndex((cy) => cy.cycleNumber === cycleNum);
    const existing = existingIdx >= 0 ? updatedCycles[existingIdx] : null;

    if (!existing || existing.status !== "completed") {
      // Compute cycle metrics
      const newCycle = computeCycleMetrics(
        cycleQuestions,
        cycleNum,
        existing?.startedAt,
        new Date().toISOString()
      );

      // If Cycle >= 2, run comparison against Cycle N - 1
      if (cycleNum > 1) {
        const prevCycle = updatedCycles.find((cy) => cy.cycleNumber === cycleNum - 1);
        if (prevCycle) {
          newCycle.comparison = compareDiagnosticCycles(prevCycle, newCycle);
        }
      }

      // Generate AI analysis (deterministic + Groq if available)
      const prevForAI = cycleNum > 1 ? updatedCycles.find((cy) => cy.cycleNumber === cycleNum - 1) : undefined;
      newCycle.aiAnalysis = await generateCycleAIInterpretation(newCycle, prevForAI);

      if (existingIdx >= 0) {
        updatedCycles[existingIdx] = newCycle;
      } else {
        updatedCycles.push(newCycle);
      }

      // Mark as just completed if this was newly closed
      justCompletedCycle = newCycle;
    }
  }

  // Sort cycles by cycleNumber
  updatedCycles.sort((a, b) => a.cycleNumber - b.cycleNumber);

  const currentCycleNumber = completedCycleCount + 1;
  const currentCycleQuestionCount = remainderQuestions;

  return {
    cycles: updatedCycles,
    currentCycleNumber,
    currentCycleQuestionCount,
    justCompletedCycle,
  };
}
