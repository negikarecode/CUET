import {
  PostMockDeterministicReport,
  AIPostMockInsight,
} from "@/types/postMockAnalysis";
import Groq from "groq-sdk";

/**
 * Creates deterministic fallback AI interpretation if LLM is unavailable or fails.
 * Uses strictly neutral, observational language describing only THIS single mock.
 */
export function buildDeterministicPostMockAIInsight(
  report: PostMockDeterministicReport
): AIPostMockInsight {
  const { overall, difficultyBreakdown, chapterBreakdown, allQuestions, subject } = report;

  // 1. Difficulty Observation
  // Always summarize all present difficulty tiers deterministically before interpreting
  const easy = difficultyBreakdown.find((d) => d.difficulty === "easy");
  const med = difficultyBreakdown.find((d) => d.difficulty === "medium");
  const hard = difficultyBreakdown.find((d) => d.difficulty === "hard");

  const tierSummaries: string[] = [];
  if (easy && easy.totalQuestions > 0) {
    tierSummaries.push(`Easy: ${easy.correct}/${easy.attempted} = ${easy.accuracy}%`);
  }
  if (med && med.totalQuestions > 0) {
    tierSummaries.push(`Medium: ${med.correct}/${med.attempted} = ${med.accuracy}%`);
  }
  if (hard && hard.totalQuestions > 0) {
    tierSummaries.push(`Hard: ${hard.correct}/${hard.attempted} = ${hard.accuracy}%`);
  }

  let diffInterpretation = "";
  if (easy && hard && easy.attempted >= 3 && hard.attempted >= 3) {
    if (easy.accuracy >= hard.accuracy + 20) {
      diffInterpretation = ` Accuracy declined notably from Easy to Hard questions in this paper.`;
    } else if (hard.accuracy >= easy.accuracy + 10) {
      diffInterpretation = ` Accuracy on Hard questions matched or exceeded Easy questions, showing the paper did not follow a typical difficulty drop.`;
    } else {
      diffInterpretation = ` Performance remained steady across difficulty tiers in this mock.`;
    }
  } else if (easy && med && easy.attempted >= 3 && med.attempted >= 3) {
    if (med.accuracy >= easy.accuracy) {
      diffInterpretation = ` Accuracy was slightly higher on Medium questions than Easy questions in this mock.`;
    } else {
      diffInterpretation = ` Accuracy was higher on Easy questions than Medium questions in this mock.`;
    }
  }

  const diffInsight = tierSummaries.length > 0
    ? `${tierSummaries.join(" | ")}.${diffInterpretation}`
    : `Performance across difficulty tiers in this mock showed an overall accuracy of ${overall.accuracyPercentage}%.`;

  // 2. Chapter Insights
  const chapterInsights = chapterBreakdown.slice(0, 3).map((ch) => {
    const chapterQuestions = allQuestions.filter((q) => q.chapter === ch.chapter);
    const incorrectQIds = chapterQuestions.filter((q) => q.isAttempted && q.isCorrect === false).map((q) => q.questionId);

    let insightText = "";
    if (ch.accuracy >= 80) {
      insightText = `Strong accuracy of ${ch.accuracy}% across ${ch.totalQuestions} questions in this mock, reflecting confident recall and concept application.`;
    } else if (ch.accuracy <= 50) {
      insightText = `In this mock, ${ch.incorrect} of your ${ch.attempted} attempted questions in ${ch.chapter} resulted in penalties (${ch.accuracy}% accuracy).`;
    } else {
      insightText = `Moderate performance in this mock with ${ch.correct} correct out of ${ch.attempted} attempted questions (${ch.accuracy}% accuracy).`;
    }

    return {
      chapter: ch.chapter,
      insight: insightText,
      evidenceQuestionIds: incorrectQIds.length > 0 ? incorrectQIds : chapterQuestions.map((q) => q.questionId),
    };
  });

  // 3. Notable Patterns
  const notablePatterns = [];

  // Pacing pattern
  if (overall.timeSinkCount > 0) {
    const timeSinkQIds = allQuestions.filter((q) => q.isTimeSink).map((q) => q.questionId);
    notablePatterns.push({
      title: "Time-Sink Questions (>72s)",
      description: `${overall.timeSinkCount} question${overall.timeSinkCount === 1 ? "" : "s"} required more than 72 seconds in this mock, which impacted overall pacing.`,
      evidenceQuestionIds: timeSinkQIds,
    });
  }

  // Skipped questions pattern
  if (overall.skippedCount > 0) {
    const skippedQIds = allQuestions.filter((q) => q.isSkipped).map((q) => q.questionId);
    notablePatterns.push({
      title: "Strategic Skipping",
      description: `You chose not to answer ${overall.skippedCount} questions, preserving ${overall.skippedCount} marks from negative penalty.`,
      evidenceQuestionIds: skippedQIds,
    });
  }

  // Chapter concentration of mistakes
  const mostPenalizedChapter = [...chapterBreakdown].sort((a, b) => b.incorrect - a.incorrect)[0];
  if (mostPenalizedChapter && mostPenalizedChapter.incorrect >= 2) {
    const chapIncorrectIds = allQuestions
      .filter((q) => q.chapter === mostPenalizedChapter.chapter && q.isAttempted && q.isCorrect === false)
      .map((q) => q.questionId);

    const pctOfAllMistakes = overall.incorrectCount > 0
      ? Math.round((mostPenalizedChapter.incorrect / overall.incorrectCount) * 100)
      : 0;

    notablePatterns.push({
      title: "Penalty Concentration",
      description: `${mostPenalizedChapter.chapter} accounted for ${mostPenalizedChapter.incorrect} of your ${overall.incorrectCount} incorrect answers (${pctOfAllMistakes}% of all mistakes). You answered ${mostPenalizedChapter.correct} of ${mostPenalizedChapter.attempted} ${mostPenalizedChapter.chapter} questions correctly (${mostPenalizedChapter.accuracy}%).`,
      evidenceQuestionIds: chapIncorrectIds,
    });
  }

  // Summary
  const summary = `In this mock examination for ${subject}, you completed ${overall.attemptedCount} of ${overall.totalQuestions} questions with an overall accuracy of ${overall.accuracyPercentage}% (Score: ${overall.totalMarks}/${overall.maxMarks}). ${
    overall.correctCount > 0 ? `${overall.correctCount} correct answers yielded +${overall.correctCount * 5} marks, ` : ""
  }while ${overall.incorrectCount} incorrect answers incurred -${overall.incorrectCount} negative marks.`;

  // Recommended Next Steps
  const recommendedNextSteps = [];
  if (mostPenalizedChapter && mostPenalizedChapter.incorrect > 0) {
    recommendedNextSteps.push(`Review the ${mostPenalizedChapter.incorrect} incorrect solutions from "${mostPenalizedChapter.chapter}".`);
  }
  if (overall.timeSinkCount > 0) {
    recommendedNextSteps.push(`Inspect the ${overall.timeSinkCount} time-sink question explanations to identify speed shortcuts.`);
  }
  recommendedNextSteps.push(`Start a targeted 5-question repair drill to reinforce concepts missed in this paper.`);

  return {
    status: "available",
    summary,
    difficultyInsight: diffInsight,
    chapterInsights,
    notablePatterns,
    recommendedNextSteps,
    generatedAt: new Date().toISOString(),
    modelUsed: "deterministic-engine",
  };
}

/**
 * Calls Groq AI to generate observational insights strictly grounded in verified mock telemetry.
 * If API key is missing or fails, seamlessly falls back to the deterministic AI insight.
 */
export async function generatePostMockAIInsight(
  report: PostMockDeterministicReport
): Promise<AIPostMockInsight> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return buildDeterministicPostMockAIInsight(report);
  }

  try {
    const groq = new Groq({ apiKey });

    // Prepare compact evidence payload - ONLY aggregate numbers and specific incorrect questions
    const incorrectSample = report.allQuestions
      .filter((q) => q.isAttempted && q.isCorrect === false)
      .slice(0, 6)
      .map((q) => ({
        id: q.questionId,
        chapter: q.chapter,
        microTopic: q.microTopic,
        difficulty: q.difficulty,
        timeSpent: q.timeSpentSeconds,
        selectedOption: q.selectedOption,
        correctOption: q.correctOption,
      }));

    const promptContext = {
      subject: report.subject,
      paperTitle: report.testTitle,
      overall: {
        totalQuestions: report.overall.totalQuestions,
        attempted: report.overall.attemptedCount,
        correct: report.overall.correctCount,
        incorrect: report.overall.incorrectCount,
        skipped: report.overall.skippedCount,
        accuracy: report.overall.accuracyPercentage,
        score: `${report.overall.totalMarks}/${report.overall.maxMarks}`,
      },
      difficultyBreakdown: report.difficultyBreakdown.map((d) => ({
        difficulty: d.label,
        attempted: d.attempted,
        correct: d.correct,
        accuracy: `${d.accuracy}%`,
      })),
      chapterBreakdown: report.chapterBreakdown.slice(0, 5).map((c) => ({
        chapter: c.chapter,
        attempted: c.attempted,
        correct: c.correct,
        incorrect: c.incorrect,
        accuracy: `${c.accuracy}%`,
      })),
      incorrectEvidenceSample: incorrectSample,
    };

    const systemPrompt = `You are an expert CUET Post-Mock Analysis Engine.
Your task is to provide an observational interpretation of ONE single completed mock attempt.
CRITICAL RULES:
1. Ground every statement STRICTLY in the provided verified telemetry. Do NOT invent numbers or statistics.
2. In difficultyInsight: ALWAYS summarize all present difficulty tiers first (e.g. Easy: X/Y = Z%, Medium: X/Y = Z%, Hard: A/B = C%), then offer neutral interpretation only if data supports it. Never assume harder = worse without data.
3. In notablePatterns: If noting penalty concentration in a chapter, include: incorrect count, total incorrect count, percentage of all mistakes, chapter correct count, chapter attempted count, and chapter accuracy percentage.
4. Any evidenceQuestionIds provided MUST strictly be taken from the provided question IDs. The count stated in any claim MUST EXACTLY match the number of IDs in evidenceQuestionIds.
5. Use NEUTRAL, OBSERVATIONAL language describing THIS single mock only.
   - GOOD: "In this mock, your accuracy was 22% on Easy and 33% on Medium."
   - GOOD: "Matrices accounted for 6 of your 38 incorrect answers (16% of all mistakes)."
   - FORBIDDEN: "You have poor understanding", "You are careless", "This is your permanent weakness".
6. Return VALID JSON matching this exact structure:
{
  "summary": "1-2 sentences summarizing what happened in this mock",
  "difficultyInsight": "Deterministic summary of present tiers followed by neutral observation",
  "chapterInsights": [
    {
      "chapter": "chapter name",
      "insight": "specific observation for this chapter in this mock",
      "evidenceQuestionIds": ["q_id"]
    }
  ],
  "notablePatterns": [
    {
      "title": "pattern title",
      "description": "pattern observation with verified numbers",
      "evidenceQuestionIds": ["q_id"]
    }
  ],
  "recommendedNextSteps": [
    "actionable step 1",
    "actionable step 2"
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Here is the verified mock telemetry:\n${JSON.stringify(promptContext, null, 2)}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
      max_tokens: 1000,
    });

    const rawContent = completion.choices[0]?.message?.content;
    if (!rawContent) {
      return buildDeterministicPostMockAIInsight(report);
    }

    const parsed = JSON.parse(rawContent);

    // Validate parsed output fields
    if (
      typeof parsed.summary === "string" &&
      typeof parsed.difficultyInsight === "string" &&
      Array.isArray(parsed.chapterInsights)
    ) {
      const validQIds = new Set(report.allQuestions.map((q) => q.questionId));

      return {
        status: "available",
        summary: parsed.summary,
        difficultyInsight: parsed.difficultyInsight,
        chapterInsights: parsed.chapterInsights.map((ci: any) => ({
          chapter: String(ci.chapter || "Core Chapter"),
          insight: String(ci.insight || ""),
          evidenceQuestionIds: (Array.isArray(ci.evidenceQuestionIds) ? ci.evidenceQuestionIds : []).filter((id: any) => validQIds.has(String(id))),
        })),
        notablePatterns: Array.isArray(parsed.notablePatterns)
          ? parsed.notablePatterns.map((np: any) => ({
              title: String(np.title || "Pattern"),
              description: String(np.description || ""),
              evidenceQuestionIds: (Array.isArray(np.evidenceQuestionIds) ? np.evidenceQuestionIds : []).filter((id: any) => validQIds.has(String(id))),
            }))
          : [],
        recommendedNextSteps: Array.isArray(parsed.recommendedNextSteps)
          ? parsed.recommendedNextSteps.map(String)
          : ["Review mistakes and practice weak chapters."],
        generatedAt: new Date().toISOString(),
        modelUsed: "llama-3.3-70b-versatile",
      };
    }

    return buildDeterministicPostMockAIInsight(report);
  } catch (err) {
    console.warn("Groq Post-Mock AI generation notice (using deterministic fallback):", err);
    return buildDeterministicPostMockAIInsight(report);
  }
}
