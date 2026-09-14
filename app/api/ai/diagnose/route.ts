import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@/lib/supabase/server";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import {
  checkRateLimit,
  incrementUsage,
  getRateLimitHeaders,
} from "@/lib/rate-limiter";
import {
  getCachedDiagnosticReport,
  setCachedDiagnosticReport,
} from "@/lib/ai-cache";
import { ErrorClassificationType, EngineConfidenceRating } from "@/types";

interface AttemptItem {
  questionId: string;
  selectedOption: string | null;
  timeSpentSeconds: number;
}

interface DiagnoseRequestBody {
  testId: string;
  attempts: AttemptItem[];
  userId?: string;
}

export interface MistakeAnalysisItem {
  question_id: string;
  distractor_trap: string;
  ncert_rule: string[];
  micro_topic: string;
  error_classification?: ErrorClassificationType;
  confidence?: EngineConfidenceRating;
  is_recurring?: boolean;
}

export interface TimeSinkAlert {
  question_number: number;
  message: string;
  category?: "slow_and_inaccurate" | "fast_but_careless" | "slow_but_accurate";
}

export interface StructuredEngineReport {
  overall_summary: {
    score: number;
    accuracy: number;
    attempt_rate: number;
    performance_level: string;
    trend: "improving" | "stable" | "declining" | "insufficient_data";
  };
  strengths: Array<{
    subject: string;
    chapter: string;
    topic: string;
    accuracy: number;
    evidence_count: number;
    confidence: EngineConfidenceRating;
  }>;
  weaknesses: Array<{
    subject: string;
    chapter: string;
    topic: string;
    accuracy: number;
    error_rate: number;
    evidence_count: number;
    error_type: ErrorClassificationType;
    priority: "critical" | "high" | "medium" | "low";
    confidence: EngineConfidenceRating;
    recommended_action: string;
  }>;
  recurring_mistakes: Array<{
    mistake_type: string;
    topic: string;
    frequency: number;
    last_occurrence: string;
    trend: "improving" | "recurring" | "worsening" | "resolved";
    recommendation: string;
  }>;
  time_analysis: {
    average_time_per_question: number;
    slow_areas: string[];
    fast_incorrect_areas: string[];
    time_management_issue: string;
  };
  difficulty_analysis: {
    easy: { attempted: number; correct: number; accuracy: number };
    moderate: { attempted: number; correct: number; accuracy: number };
    hard: { attempted: number; correct: number; accuracy: number };
  };
  why_losing_marks: Array<{
    cause: string;
    percentage: number;
    evidence: string;
  }>;
  next_actions: {
    biggest_strength: string;
    biggest_weakness: string;
    biggest_recurring_mistake: string;
    highest_impact_topic: string;
    recommended_revision: string[];
    recommended_practice: string[];
    recommended_next_test: string;
  };
  readiness: {
    level: "Developing" | "Moderate" | "Strong" | "Very Strong";
    confidence: EngineConfidenceRating;
    reasoning: string;
  };
}

export interface DiagnosticResponseData {
  overall_summary: string;
  primary_weak_topics: string[];
  time_sink_alerts: TimeSinkAlert[];
  mistake_analyses: MistakeAnalysisItem[];
  analytics: {
    chapterAccuracy: Record<string, { correct: number; total: number; percentage: number }>;
    microTopicAccuracy: Record<string, { correct: number; total: number; percentage: number }>;
    timeSinksCount: number;
    speedTrapsCount: number;
  };
  structured_report?: StructuredEngineReport;
  natural_language_report?: string;
}

/**
 * Generates Section 33 Natural-Language Student Report format
 */
function buildNaturalLanguageReport(params: {
  overallSummary: string;
  strengths: Array<{ topic: string; accuracy: number }>;
  weaknesses: Array<{ topic: string; accuracy: number; errorType: string; action: string }>;
  whyLosingMarks: Array<{ cause: string; percentage: number; evidence: string }>;
  nextActions: StructuredEngineReport["next_actions"];
  avgTimeSeconds: number;
  timeAlertsCount: number;
}): string {
  const { overallSummary, strengths, weaknesses, whyLosingMarks, nextActions, avgTimeSeconds, timeAlertsCount } = params;

  let md = `## Your Performance\n\n${overallSummary}\n\n`;

  md += `## 🔥 Your Strengths\n\n`;
  if (strengths.length > 0) {
    strengths.forEach((s) => {
      md += `* **${s.topic}**: ${s.accuracy}% accuracy — High retention and reliable problem-solving rhythm.\n`;
    });
  } else {
    md += `* Establishing initial baseline across upcoming mock questions.\n`;
  }
  md += `\n`;

  md += `## ⚠️ Your Weaknesses\n\n`;
  if (weaknesses.length > 0) {
    weaknesses.forEach((w) => {
      md += `* **${w.topic}** (${w.accuracy}% accuracy): ${w.errorType}. ${w.action}\n`;
    });
  } else {
    md += `* No critical conceptual weaknesses detected in this test attempt.\n`;
  }
  md += `\n`;

  md += `## 🧠 Why You're Making These Mistakes\n\n`;
  if (whyLosingMarks.length > 0) {
    whyLosingMarks.forEach((m) => {
      md += `* **${m.cause} (${m.percentage}%)**: ${m.evidence}\n`;
    });
  } else {
    md += `* Error sample size too low to diagnose recurring cognitive patterns reliably.\n`;
  }
  md += `\n`;

  md += `## 📉 Where You're Losing Marks\n\n`;
  md += `Your score deductions in this test were concentrated in ${weaknesses.slice(0, 2).map((w) => w.topic).join(" and ") || "isolated questions"}. Correcting distractor trap selection in these priority areas yields the highest net mark gain (+6 marks per question).\n\n`;

  md += `## 🎯 What You Should Do Next\n\n`;
  md += `* **Biggest Strength**: ${nextActions.biggest_strength}\n`;
  md += `* **Biggest Weakness**: ${nextActions.biggest_weakness}\n`;
  md += `* **Recurring Trap**: ${nextActions.biggest_recurring_mistake}\n`;
  md += `* **Highest-Impact Focus**: ${nextActions.highest_impact_topic}\n\n`;

  md += `## 📚 Topics to Revise\n\n`;
  nextActions.recommended_revision.forEach((r) => {
    md += `* ${r}\n`;
  });
  md += `\n`;

  md += `## 📝 Questions to Practice\n\n`;
  nextActions.recommended_practice.forEach((p) => {
    md += `* ${p}\n`;
  });
  md += `\n`;

  md += `## ⏱️ Test Strategy\n\n`;
  if (timeAlertsCount > 0) {
    md += `* You recorded ${timeAlertsCount} time-management bottleneck(s). Flag heavy calculation numericals on pass 1 and return to them in phase 2.\n`;
  } else {
    md += `* Average solving rhythm of ${avgTimeSeconds}s/Q is well within the 72-second CUET pace benchmark.\n`;
  }
  md += `\n`;

  md += `## 🚀 Next Test\n\n`;
  md += `* ${nextActions.recommended_next_test}\n`;

  return md;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DiagnoseRequestBody;
    const { testId, attempts, userId: payloadUserId } = body;

    if (!testId || !Array.isArray(attempts)) {
      return NextResponse.json(
        { error: "Invalid payload. testId and attempts array are required." },
        { status: 400 }
      );
    }

    // Determine User Identity & Premium Tier
    let userId = payloadUserId || "user_cuet_aspirant_01";
    let isPaidUser = false;

    try {
      const supabase = createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser) {
        userId = authUser.id;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", userId)
        .single();
      if (profile?.is_premium) {
        isPaidUser = true;
      }
    } catch {
      // Fallback
    }

    // 1. Check Response Cache FIRST: If student already ran diagnosis for this testId, return cached JSON!
    const cachedReport = await getCachedDiagnosticReport(userId, testId);
    if (cachedReport) {
      return NextResponse.json(cachedReport.data, {
        headers: {
          "X-Cache": "HIT",
          "X-Cache-Source": cachedReport.source,
        },
      });
    }

    // 2. Check Daily Rate Limit (Free: 3 / day, Paid: 25 / day)
    const rateLimitResult = await checkRateLimit(userId, isPaidUser);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Daily AI analysis limit reached. Upgrade to unlock more.",
          limit: rateLimitResult.limit,
          remaining: 0,
          resetAt: rateLimitResult.resetAt,
          upgradeUrl: "/#pricing",
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }

    // 3. Fetch Question Metadata from Supabase or Catalog fallback
    let questionsPool: Array<{
      id: string;
      subject: string;
      chapter: string;
      micro_topic: string;
      ncert_reference: string;
      archetype: string;
      difficulty: "easy" | "medium" | "hard";
      question_text: string;
      option_a: string;
      option_b: string;
      option_c: string;
      option_d: string;
      correct_option: string;
      explanation: string;
      question_number: number;
    }> = [];

    try {
      const supabase = createClient();
      const { data: dbQuestions } = await supabase
        .from("questions")
        .select(
          "id, subject, chapter, micro_topic, ncert_reference, archetype, question_text, option_a, option_b, option_c, option_d, correct_option, explanation"
        );

      if (dbQuestions && dbQuestions.length > 0) {
        questionsPool = dbQuestions.map((q, idx) => ({
          ...q,
          difficulty: (q.archetype === "Numerical" ? "hard" : "medium") as "easy" | "medium" | "hard",
          question_number: idx + 1,
        }));
      }
    } catch {
      // Offline / unconfigured Supabase fallback
    }

    // Fallback to local high-fidelity question sets if database didn't have all test questions
    if (questionsPool.length === 0) {
      const { questions } = getQuestionsForTest(testId);
      questionsPool = questions.map((q) => ({
        id: q.id,
        subject: q.subjectId,
        chapter: q.topic,
        micro_topic: q.topic,
        ncert_reference: `NCERT Class 12 (${q.topic}), Section Benchmark`,
        archetype: q.difficulty === "hard" ? "Numerical" : "Direct Fact",
        difficulty: (q.difficulty || "medium") as "easy" | "medium" | "hard",
        question_text: q.prompt,
        option_a: q.options[0]?.text ?? "",
        option_b: q.options[1]?.text ?? "",
        option_c: q.options[2]?.text ?? "",
        option_d: q.options[3]?.text ?? "",
        correct_option: q.correctOptionId,
        explanation: q.explanation,
        question_number: q.questionNumber,
      }));
    }

    // Map questions by id for O(1) lookup
    const qMap = new Map<string, (typeof questionsPool)[number]>();
    questionsPool.forEach((q) => qMap.set(q.id, q));

    // 4. Identify Pacing, Conceptual, and Difficulty Metrics
    const chapterStats: Record<string, { correct: number; total: number; timeSpent: number }> = {};
    const microTopicStats: Record<string, { correct: number; total: number }> = {};
    const difficultyStats = {
      easy: { attempted: 0, correct: 0 },
      moderate: { attempted: 0, correct: 0 },
      hard: { attempted: 0, correct: 0 },
    };

    const fatalTimeSinks: Array<{ question: (typeof questionsPool)[number]; time: number }> = [];
    const speedAccuracyTraps: Array<{ question: (typeof questionsPool)[number]; time: number }> = [];
    const failedQuestions: Array<{
      question: (typeof questionsPool)[number];
      selectedOption: string;
      timeSpent: number;
    }> = [];

    let totalAttempted = 0;
    let totalCorrect = 0;
    let totalTimeSpent = 0;

    attempts.forEach((att) => {
      const q = qMap.get(att.questionId);
      if (!q) return;

      const isAttempted = att.selectedOption !== null && att.selectedOption !== undefined;
      if (!isAttempted) return;

      totalAttempted += 1;
      totalTimeSpent += att.timeSpentSeconds || 0;
      const isCorrect = att.selectedOption === q.correct_option;
      const isIncorrect = !isCorrect;
      if (isCorrect) totalCorrect += 1;

      // Accuracy tallies
      const ch = q.chapter || "General";
      const mt = q.micro_topic || "Domain Concepts";

      if (!chapterStats[ch]) chapterStats[ch] = { correct: 0, total: 0, timeSpent: 0 };
      if (!microTopicStats[mt]) microTopicStats[mt] = { correct: 0, total: 0 };

      chapterStats[ch].total += 1;
      chapterStats[ch].timeSpent += att.timeSpentSeconds || 0;
      microTopicStats[mt].total += 1;
      if (isCorrect) {
        chapterStats[ch].correct += 1;
        microTopicStats[mt].correct += 1;
      }

      // Difficulty tallies
      const diffKey = q.difficulty === "easy" ? "easy" : q.difficulty === "hard" ? "hard" : "moderate";
      difficultyStats[diffKey].attempted += 1;
      if (isCorrect) difficultyStats[diffKey].correct += 1;

      // Time-sink questions: timeSpentSeconds > 72 and incorrect (3600s / 50 benchmark)
      if (att.timeSpentSeconds > 72 && isIncorrect) {
        fatalTimeSinks.push({ question: q, time: att.timeSpentSeconds });
      }

      // Speed-accuracy traps: timeSpentSeconds < 25 and incorrect
      if (att.timeSpentSeconds < 25 && isIncorrect) {
        speedAccuracyTraps.push({ question: q, time: att.timeSpentSeconds });
      }

      // Failed question log for AI diagnosis
      if (isIncorrect) {
        failedQuestions.push({
          question: q,
          selectedOption: att.selectedOption ?? "UNANSWERED",
          timeSpent: att.timeSpentSeconds,
        });
      }
    });

    const avgTimePerQuestion = totalAttempted > 0 ? Math.round(totalTimeSpent / totalAttempted) : 0;
    const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    // Calculate percentage rankings
    const chapterAccuracy: Record<string, { correct: number; total: number; percentage: number }> = {};
    Object.entries(chapterStats).forEach(([ch, st]) => {
      chapterAccuracy[ch] = {
        correct: st.correct,
        total: st.total,
        percentage: Math.round((st.correct / st.total) * 100),
      };
    });

    const microTopicAccuracy: Record<string, { correct: number; total: number; percentage: number }> = {};
    Object.entries(microTopicStats).forEach(([mt, st]) => {
      microTopicAccuracy[mt] = {
        correct: st.correct,
        total: st.total,
        percentage: Math.round((st.correct / st.total) * 100),
      };
    });

    // Determine top 3 primary weak topics (lowest accuracy with >=1 attempts)
    const sortedWeakTopics = Object.entries(microTopicAccuracy)
      .sort((a, b) => a[1].percentage - b[1].percentage)
      .map(([mt]) => mt)
      .slice(0, 3);

    // Determine strengths (highest accuracy with >=1 attempts)
    const sortedStrengths = Object.entries(microTopicAccuracy)
      .filter(([, st]) => st.total >= 1 && st.correct / st.total >= 0.7)
      .sort((a, b) => b[1].percentage - a[1].percentage)
      .map(([mt, st]) => ({ topic: mt, accuracy: st.percentage }));

    // Construct Pacing Alerts
    const timeSinkAlerts: TimeSinkAlert[] = fatalTimeSinks.map((item) => ({
      question_number: item.question.question_number,
      message: `Question ${item.question.question_number} (${item.question.micro_topic}): Spent ${item.time}s (>72s) resulting in -1 penalty mark. Flag time-consuming calculations for review.`,
      category: "slow_and_inaccurate",
    }));

    speedAccuracyTraps.forEach((item) => {
      timeSinkAlerts.push({
        question_number: item.question.question_number,
        message: `Question ${item.question.question_number} (${item.question.micro_topic}): Rushed in ${item.time}s (<25s) falling for a quick distractor trap. Slow down on keyword qualifiers.`,
        category: "fast_but_careless",
      });
    });

    // 5. Invoke Groq LPU with CUET AI Performance Intelligence Engine Master System Prompt
    let aiDiagnostic: {
      overall_summary: string;
      primary_weak_topics: string[];
      time_sink_alerts: TimeSinkAlert[];
      mistake_analyses: MistakeAnalysisItem[];
      why_losing_marks?: Array<{ cause: string; percentage: number; evidence: string }>;
      next_actions?: StructuredEngineReport["next_actions"];
      readiness?: StructuredEngineReport["readiness"];
    } | null = null;

    const apiKey = process.env.GROQ_API_KEY;

    if (
      apiKey &&
      !apiKey.includes("placeholder") &&
      failedQuestions.length > 0
    ) {
      try {
        const groq = new Groq({ apiKey });

        const promptPayload = {
          subject: questionsPool[0]?.subject ?? "CUET Domain",
          total_questions_attempted: totalAttempted,
          total_correct: totalCorrect,
          overall_accuracy: overallAccuracy,
          avg_time_per_question: avgTimePerQuestion,
          failed_questions: failedQuestions.slice(0, 8).map((fq) => ({
            question_id: fq.question.id,
            question_number: fq.question.question_number,
            question_text: fq.question.question_text,
            student_selected_option: fq.selectedOption,
            correct_option: fq.question.correct_option,
            micro_topic: fq.question.micro_topic,
            chapter: fq.question.chapter,
            ncert_reference: fq.question.ncert_reference,
            explanation: fq.question.explanation,
            time_spent_seconds: fq.timeSpent,
            chapter_accuracy: chapterAccuracy[fq.question.chapter]?.percentage ?? 0,
          })),
          weak_topics_by_data: sortedWeakTopics,
          strong_topics_by_data: sortedStrengths.map((s) => s.topic),
        };

        const groqModel = process.env.GROQ_MODEL || "groq/compound-mini";
        const completion = await groq.chat.completions.create({
          model: groqModel,
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content: `You are the **CUET AI Performance Intelligence Engine**, an advanced academic analytics and preparation system designed specifically for students preparing for the Common University Entrance Test (CUET-UG).

Your job is NOT merely to evaluate whether a student answered questions correctly.
Your job is to understand how the student thinks, where they lose marks, why they lose marks, what concepts they misunderstand, what patterns repeatedly cause mistakes, and exactly what they should do next to improve their CUET score.

Core Operating Principles:
1. Error Classification Engine: For every failed question, classify into one of the 12 error types:
   - "Conceptual Gap"
   - "Formula/Rule Recall Gap"
   - "Application Error"
   - "Calculation Error"
   - "Misreading Error"
   - "Careless Error"
   - "Concept Confusion"
   - "Option Confusion"
   - "Guessing Error"
   - "Time Pressure Error"
   - "Overthinking Error"
   - "Insufficient Information"
2. Distinguish Knowledge from Carelessness: If chapter accuracy is high (80%+), classify an isolated error as Careless or Calculation, NOT Conceptual Gap.
3. NCERT Alignment: Anchor all explanations strictly to Class 12 NCERT principles and definitions. Never fabricate page numbers.
4. Confidence Rating: Assign "High" | "Medium" | "Low" | "Insufficient Evidence".
5. Non-judgmental tone: Explain evidence clearly and objectively without generic platitudes.
6. Provide actionable recommendations (What to revise, practice, and test next).

Return a valid JSON object matching this schema:
{
  "overall_summary": "concise executive summary",
  "primary_weak_topics": ["topic 1", "topic 2"],
  "time_sink_alerts": [
    { "question_number": 1, "message": "string explanation" }
  ],
  "mistake_analyses": [
    {
      "question_id": "string",
      "distractor_trap": "why selected option was tempting",
      "ncert_rule": ["bullet 1", "bullet 2"],
      "micro_topic": "topic",
      "error_classification": "Calculation Error | Misreading Error | Conceptual Gap | Concept Confusion | Careless Error | Application Error | Formula/Rule Recall Gap | Time Pressure Error",
      "confidence": "High | Medium | Low"
    }
  ],
  "why_losing_marks": [
    { "cause": "Careless Calculation", "percentage": 35, "evidence": "arithmetic slips on multi-step questions" }
  ],
  "next_actions": {
    "biggest_strength": "string",
    "biggest_weakness": "string",
    "biggest_recurring_mistake": "string",
    "highest_impact_topic": "string",
    "recommended_revision": ["NCERT revision task"],
    "recommended_practice": ["targeted practice task"],
    "recommended_next_test": "recommended mock or drill"
  },
  "readiness": {
    "level": "Developing | Moderate | Strong | Very Strong",
    "confidence": "High | Medium | Low",
    "reasoning": "string"
  }
}`,
            },
            {
              role: "user",
              content: JSON.stringify(promptPayload),
            },
          ],
          response_format: { type: "json_object" },
        });

        const rawContent = completion.choices[0]?.message?.content;
        if (rawContent) {
          const cleaned = rawContent.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
          aiDiagnostic = JSON.parse(cleaned);
        }
      } catch (groqError) {
        console.warn("Groq API call failed or timed out. Using deterministic fallback:", groqError);
      }
    }

    // 6. High-Fidelity Deterministic Fallback adhering strictly to the Master System Prompt rules
    if (!aiDiagnostic) {
      const fallbackAnalyses: MistakeAnalysisItem[] = failedQuestions
        .slice(0, 8)
        .map(({ question, selectedOption, timeSpent }) => {
          const chAcc = chapterAccuracy[question.chapter]?.percentage ?? 50;

          // Deterministic Error Classification (Section 5 & 6)
          let classification: ErrorClassificationType = "Conceptual Gap";
          let trapExplanation: string;

          if (timeSpent < 25) {
            classification = "Misreading Error";
            trapExplanation = `Option ${selectedOption} is a classic speed trap. Solving in only ${timeSpent}s led to overlooking qualifying keywords (e.g. 'NOT' or unit boundaries) in ${question.micro_topic}.`;
          } else if (timeSpent > 75) {
            classification = "Calculation Error";
            trapExplanation = `Option ${selectedOption} caught an arithmetic or step substitution slip after spending ${timeSpent}s. Lengthy calculation caused algebraic drag.`;
          } else if (chAcc >= 75) {
            classification = "Careless Error";
            trapExplanation = `Option ${selectedOption} is an isolated slip. Your solid ${chAcc}% grasp in ${question.chapter} shows this was an avoidable option selection error rather than a knowledge deficit.`;
          } else if (question.difficulty === "hard") {
            classification = "Application Error";
            trapExplanation = `Option ${selectedOption} represents a standard application breakdown when extending core ${question.micro_topic} formulas to multi-step conditions.`;
          } else {
            classification = "Concept Confusion";
            trapExplanation = `Option ${selectedOption} is an attractive distractor conflating related definitions in ${question.micro_topic}. Review the precise boundary criteria in NCERT.`;
          }

          const confidence: EngineConfidenceRating =
            (chapterStats[question.chapter]?.total ?? 0) >= 3
              ? "High"
              : (chapterStats[question.chapter]?.total ?? 0) >= 2
              ? "Medium"
              : "Low";

          return {
            question_id: question.id,
            micro_topic: question.micro_topic,
            distractor_trap: trapExplanation,
            ncert_rule: [
              `Core Principle: ${question.explanation.slice(0, 140)}...`,
              `NCERT Anchor: Review standard Class 12 textbook guidelines at ${question.ncert_reference}.`,
            ],
            error_classification: classification,
            confidence,
          };
        });

      // Compute "Why Am I Losing Marks?" percentages
      const errorCounts: Record<string, number> = {};
      fallbackAnalyses.forEach((a) => {
        const key = a.error_classification || "Conceptual Gap";
        errorCounts[key] = (errorCounts[key] || 0) + 1;
      });

      const totalAnalyzed = fallbackAnalyses.length || 1;
      const whyLosingMarks = Object.entries(errorCounts).map(([cause, count]) => ({
        cause,
        percentage: Math.round((count / totalAnalyzed) * 100),
        evidence: `${count} question(s) classified as ${cause} across test attempts.`,
      }));

      const topWeakTopic = sortedWeakTopics[0] || "Targeted NCERT Concepts";
      const topStrongTopic = sortedStrengths[0]?.topic || "Foundation Principles";

      const nextActions: StructuredEngineReport["next_actions"] = {
        biggest_strength: `${topStrongTopic} (${sortedStrengths[0]?.accuracy ?? 80}% accuracy)`,
        biggest_weakness: `${topWeakTopic} (${microTopicAccuracy[topWeakTopic]?.percentage ?? 30}% accuracy)`,
        biggest_recurring_mistake: `${fallbackAnalyses[0]?.error_classification || "Distractor selection"} in ${topWeakTopic}`,
        highest_impact_topic: `${topWeakTopic} (potential score recovery: +${failedQuestions.length * 6} marks)`,
        recommended_revision: [
          `Re-read NCERT Class 12 definitions and summary points for ${topWeakTopic}.`,
          `Review formula sheets and unit conversion factors for calculation traps.`,
        ],
        recommended_practice: [
          `Solve 10 targeted medium-difficulty drill questions on ${topWeakTopic}.`,
          `Underline qualifying keywords ('NOT', 'INCORRECT', 'CONSTANT') before marking options.`,
        ],
        recommended_next_test: `5-minute adaptive repair quiz for ${topWeakTopic} to cement NCERT retention.`,
      };

      const readiness: StructuredEngineReport["readiness"] = {
        level: overallAccuracy >= 80 ? "Strong" : overallAccuracy >= 55 ? "Moderate" : "Developing",
        confidence: totalAttempted >= 25 ? "High" : totalAttempted >= 10 ? "Medium" : "Low",
        reasoning: `Recorded ${overallAccuracy}% accuracy across ${totalAttempted} attempted questions with ${avgTimePerQuestion}s average pace.`,
      };

      aiDiagnostic = {
        overall_summary:
          failedQuestions.length > 0
            ? `Diagnostic scan identified ${failedQuestions.length} negative-marking errors (-1 penalty each). Your accuracy drops under time pressure in '${sortedWeakTopics.join(", ")}'. Remediating these targeted NCERT rules will recover +${failedQuestions.length * 6} net marks.`
            : "Outstanding performance! All attempted questions adhered to exact NCERT principles with zero fatal negative marks.",
        primary_weak_topics: sortedWeakTopics.length > 0 ? sortedWeakTopics : ["General Revision"],
        time_sink_alerts: timeSinkAlerts,
        mistake_analyses: fallbackAnalyses,
        why_losing_marks: whyLosingMarks,
        next_actions: nextActions,
        readiness,
      };
    }

    // 7. Assemble Section 32 Structured Report
    const structuredReport: StructuredEngineReport = {
      overall_summary: {
        score: totalCorrect * 5 - (totalAttempted - totalCorrect),
        accuracy: overallAccuracy,
        attempt_rate: attempts.length > 0 ? Math.round((totalAttempted / attempts.length) * 100) : 0,
        performance_level: overallAccuracy >= 80 ? "Advanced" : overallAccuracy >= 60 ? "Proficient" : "Foundational",
        trend: "insufficient_data",
      },
      strengths: sortedStrengths.map((s) => ({
        subject: questionsPool[0]?.subject ?? "CUET Domain",
        chapter: s.topic,
        topic: s.topic,
        accuracy: s.accuracy,
        evidence_count: microTopicStats[s.topic]?.total ?? 1,
        confidence: (microTopicStats[s.topic]?.total ?? 0) >= 3 ? "High" : "Medium",
      })),
      weaknesses: sortedWeakTopics.map((w) => {
        const stat = microTopicAccuracy[w];
        const acc = stat ? stat.percentage : 30;
        return {
          subject: questionsPool[0]?.subject ?? "CUET Domain",
          chapter: w,
          topic: w,
          accuracy: acc,
          error_rate: 100 - acc,
          evidence_count: stat ? stat.total : 1,
          error_type: "Conceptual Gap" as ErrorClassificationType,
          priority: acc < 40 ? ("critical" as const) : ("high" as const),
          confidence: (stat?.total ?? 0) >= 2 ? ("Medium" as const) : ("Low" as const),
          recommended_action: `Review NCERT Class 12 textbook section on ${w} and resolve in-text examples.`,
        };
      }),
      recurring_mistakes: aiDiagnostic.mistake_analyses.slice(0, 3).map((m) => ({
        mistake_type: m.error_classification || "Trap Distractor",
        topic: m.micro_topic,
        frequency: 1,
        last_occurrence: "Current Test Session",
        trend: "recurring" as const,
        recommendation: m.distractor_trap,
      })),
      time_analysis: {
        average_time_per_question: avgTimePerQuestion,
        slow_areas: fatalTimeSinks.map((f) => f.question.micro_topic),
        fast_incorrect_areas: speedAccuracyTraps.map((s) => s.question.micro_topic),
        time_management_issue:
          fatalTimeSinks.length > 0
            ? `${fatalTimeSinks.length} time-sinks (>72s) drained exam clock.`
            : "Pacing is well calibrated.",
      },
      difficulty_analysis: {
        easy: {
          attempted: difficultyStats.easy.attempted,
          correct: difficultyStats.easy.correct,
          accuracy:
            difficultyStats.easy.attempted > 0
              ? Math.round((difficultyStats.easy.correct / difficultyStats.easy.attempted) * 100)
              : 0,
        },
        moderate: {
          attempted: difficultyStats.moderate.attempted,
          correct: difficultyStats.moderate.correct,
          accuracy:
            difficultyStats.moderate.attempted > 0
              ? Math.round((difficultyStats.moderate.correct / difficultyStats.moderate.attempted) * 100)
              : 0,
        },
        hard: {
          attempted: difficultyStats.hard.attempted,
          correct: difficultyStats.hard.correct,
          accuracy:
            difficultyStats.hard.attempted > 0
              ? Math.round((difficultyStats.hard.correct / difficultyStats.hard.attempted) * 100)
              : 0,
        },
      },
      why_losing_marks: aiDiagnostic.why_losing_marks || [],
      next_actions: aiDiagnostic.next_actions || {
        biggest_strength: sortedStrengths[0]?.topic || "General Foundation",
        biggest_weakness: sortedWeakTopics[0] || "Targeted NCERT Concepts",
        biggest_recurring_mistake: "Trap Distractor Selection",
        highest_impact_topic: sortedWeakTopics[0] || "Domain Core",
        recommended_revision: [`Re-read NCERT Class 12 on ${sortedWeakTopics[0] || "weak chapters"}`],
        recommended_practice: [`Complete 10-15 targeted questions on ${sortedWeakTopics[0] || "weak chapters"}`],
        recommended_next_test: "5-question Adaptive AI Repair Quiz",
      },
      readiness: aiDiagnostic.readiness || {
        level: overallAccuracy >= 75 ? "Strong" : "Moderate",
        confidence: "Medium",
        reasoning: `Accuracy: ${overallAccuracy}% across ${totalAttempted} attempted questions.`,
      },
    };

    // 8. Assemble Section 33 Natural-Language Student Report
    const naturalLanguageReport = buildNaturalLanguageReport({
      overallSummary: aiDiagnostic.overall_summary,
      strengths: sortedStrengths,
      weaknesses: structuredReport.weaknesses.map((w) => ({
        topic: w.topic,
        accuracy: w.accuracy,
        errorType: w.error_type,
        action: w.recommended_action,
      })),
      whyLosingMarks: structuredReport.why_losing_marks,
      nextActions: structuredReport.next_actions,
      avgTimeSeconds: avgTimePerQuestion,
      timeAlertsCount: timeSinkAlerts.length,
    });

    const responsePayload: DiagnosticResponseData = {
      overall_summary: aiDiagnostic.overall_summary,
      primary_weak_topics: aiDiagnostic.primary_weak_topics,
      time_sink_alerts: aiDiagnostic.time_sink_alerts.length > 0 ? aiDiagnostic.time_sink_alerts : timeSinkAlerts,
      mistake_analyses: aiDiagnostic.mistake_analyses,
      analytics: {
        chapterAccuracy,
        microTopicAccuracy,
        timeSinksCount: fatalTimeSinks.length,
        speedTrapsCount: speedAccuracyTraps.length,
      },
      structured_report: structuredReport,
      natural_language_report: naturalLanguageReport,
    };

    // 9. Record rate limit usage
    await incrementUsage(userId);

    // 10. Store generated report in memory cache
    await setCachedDiagnosticReport(userId, testId, responsePayload);

    return NextResponse.json(responsePayload, {
      headers: {
        "X-Cache": "MISS",
        ...getRateLimitHeaders({
          allowed: true,
          limit: rateLimitResult.limit,
          remaining: Math.max(0, rateLimitResult.remaining - 1),
          resetAt: rateLimitResult.resetAt,
        }),
      },
    });
  } catch (error) {
    console.error("AI Diagnostic Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error in diagnostic engine." },
      { status: 500 }
    );
  }
}
