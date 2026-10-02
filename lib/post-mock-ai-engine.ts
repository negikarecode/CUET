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
  let diffInsight = "";
  const easy = difficultyBreakdown.find((d) => d.difficulty === "easy");
  const med = difficultyBreakdown.find((d) => d.difficulty === "medium");
  const hard = difficultyBreakdown.find((d) => d.difficulty === "hard");

  if (easy && hard && easy.attempted > 0 && hard.attempted > 0) {
    if (easy.accuracy >= 75 && hard.accuracy <= 50) {
      diffInsight = `In this mock, your accuracy dropped from ${easy.accuracy}% on Easy questions to ${hard.accuracy}% on Hard questions. You navigated foundational questions smoothly but encountered resistance on deeper analytical items.`;
    } else if (Math.abs(easy.accuracy - hard.accuracy) <= 15) {
      diffInsight = `In this mock, your accuracy remained steady across difficulty tiers (${easy.accuracy}% on Easy vs ${hard.accuracy}% on Hard).`;
    } else {
      diffInsight = `In this mock, you achieved ${easy.accuracy}% on Easy questions, ${med ? `${med.accuracy}% on Medium, ` : ""}and ${hard.accuracy}% on Hard questions.`;
    }
  } else if (easy && easy.attempted > 0) {
    diffInsight = `In this mock, you achieved ${easy.accuracy}% accuracy across ${easy.attempted} Easy questions attempted.`;
  } else {
    diffInsight = `Performance across difficulty tiers in this mock showed an overall accuracy of ${overall.accuracyPercentage}%.`;
  }

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
      evidenceQuestionIds: incorrectQIds.length > 0 ? incorrectQIds.slice(0, 5) : chapterQuestions.slice(0, 3).map((q) => q.questionId),
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
      evidenceQuestionIds: timeSinkQIds.slice(0, 4),
    });
  }

  // Skipped questions pattern
  if (overall.skippedCount > 0) {
    const skippedQIds = allQuestions.filter((q) => q.isSkipped).map((q) => q.questionId);
    notablePatterns.push({
      title: "Strategic Skipping",
      description: `You chose not to answer ${overall.skippedCount} questions, preserving ${overall.skippedCount} marks from negative penalty.`,
      evidenceQuestionIds: skippedQIds.slice(0, 4),
    });
  }

  // Chapter concentration of mistakes
  const mostPenalizedChapter = [...chapterBreakdown].sort((a, b) => b.incorrect - a.incorrect)[0];
  if (mostPenalizedChapter && mostPenalizedChapter.incorrect >= 2) {
    const chapIncorrectIds = allQuestions
      .filter((q) => q.chapter === mostPenalizedChapter.chapter && q.isAttempted && q.isCorrect === false)
      .map((q) => q.questionId);

    notablePatterns.push({
      title: "Penalty Concentration",
      description: `In this paper, ${mostPenalizedChapter.incorrect} incorrect answers originated from "${mostPenalizedChapter.chapter}".`,
      evidenceQuestionIds: chapIncorrectIds.slice(0, 4),
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
2. Use NEUTRAL, OBSERVATIONAL language describing THIS single mock only.
   - GOOD: "In this mock, your accuracy dropped from 82% on Easy to 48% on Hard questions."
   - GOOD: "Most of your incorrect answers in this paper came from Electrochemistry."
   - FORBIDDEN: "You have poor understanding", "You are careless", "This is your permanent weakness".
3. Return VALID JSON matching this exact structure:
{
  "summary": "1-2 sentences summarizing what happened in this mock",
  "difficultyInsight": "1-2 sentences on how difficulty affected performance in this mock",
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
      "description": "pattern observation",
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
      return {
        status: "available",
        summary: parsed.summary,
        difficultyInsight: parsed.difficultyInsight,
        chapterInsights: parsed.chapterInsights.map((ci: any) => ({
          chapter: String(ci.chapter || "Core Chapter"),
          insight: String(ci.insight || ""),
          evidenceQuestionIds: Array.isArray(ci.evidenceQuestionIds) ? ci.evidenceQuestionIds : [],
        })),
        notablePatterns: Array.isArray(parsed.notablePatterns)
          ? parsed.notablePatterns.map((np: any) => ({
              title: String(np.title || "Pattern"),
              description: String(np.description || ""),
              evidenceQuestionIds: Array.isArray(np.evidenceQuestionIds) ? np.evidenceQuestionIds : [],
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
