import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { stringToUuid } from "@/lib/utils";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import { Question } from "@/types";

export interface WeeklyAttemptStats {
  userId: string;
  totalAttempts: number;
  correctCount: number;
  incorrectCount: number;
  overallAccuracy: number;
  netScoreEstimate: number;
  scoreTrend: "improving" | "stable" | "declining";
  resolvedWeaknesses: string[];
  persistentWeakSpots: string[];
  fatalTimeSinksCount: number;
  fatalTimeSinkTopics: string[];
  trapArchetypes: string[];
}

export interface SundayRitualResult {
  stats: WeeklyAttemptStats;
  mentorDebrief: string;
  redemptionTest: {
    testId: string;
    title: string;
    totalQuestions: 50;
    durationMinutes: 60;
    questions: Question[];
    composition: {
      highErrorMicroTopics: number; // 20 Qs (40%)
      freshUnattempted: number;     // 20 Qs (40%)
      trapArchetypes: number;       // 10 Qs (20%)
    };
  };
  fromCache: boolean;
}

/**
 * Aggregates the last 7 days of user_attempts for the student
 */
export async function aggregateWeeklyAttempts(userId: string): Promise<WeeklyAttemptStats> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  let attemptsRows: any[] = [];
  try {
    const client = supabaseAdmin || createClient();
    const { data } = await client
      .from("user_attempts")
      .select(`
        id,
        is_correct,
        time_spent_seconds,
        is_time_sink,
        created_at,
        questions (
          id,
          subject,
          chapter,
          micro_topic,
          archetype
        )
      `)
      .eq("user_id", userId)
      .gte("created_at", sevenDaysAgo);

    if (data) attemptsRows = data;
  } catch (err) {
    console.warn("Failed to fetch 7-day attempts from Supabase:", err);
  }

  // Topic metrics
  const topicStats: Record<string, { total: number; correct: number; timeSinks: number }> = {};
  const archetypeErrors: Record<string, number> = {};
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let fatalTimeSinksCount = 0;
  const fatalTimeSinkTopics: string[] = [];

  attemptsRows.forEach((row) => {
    const q = row.questions;
    const isCorrect = row.is_correct === true;
    const isIncorrect = row.is_correct === false;
    const time = row.time_spent_seconds || 0;
    const topic = q?.micro_topic || "Domain Concepts";
    const archetype = q?.archetype || "Direct Fact";

    if (!topicStats[topic]) topicStats[topic] = { total: 0, correct: 0, timeSinks: 0 };
    topicStats[topic].total += 1;

    if (isCorrect) {
      totalCorrect += 1;
      topicStats[topic].correct += 1;
    } else if (isIncorrect) {
      totalIncorrect += 1;
      archetypeErrors[archetype] = (archetypeErrors[archetype] || 0) + 1;

      // Fatal time-sink: >90s and incorrect
      if (time > 90 || row.is_time_sink) {
        fatalTimeSinksCount += 1;
        topicStats[topic].timeSinks += 1;
        if (!fatalTimeSinkTopics.includes(topic)) {
          fatalTimeSinkTopics.push(topic);
        }
      }
    }
  });

  const totalAttempts = attemptsRows.length;
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const netScoreEstimate = totalCorrect * 5 - totalIncorrect * 1;

  const resolvedWeaknesses: string[] = [];
  const persistentWeakSpots: string[] = [];

  Object.entries(topicStats).forEach(([t, s]) => {
    const acc = Math.round((s.correct / s.total) * 100);
    if (s.total >= 3 && acc >= 70) {
      resolvedWeaknesses.push(t);
    } else if (s.total >= 2 && acc < 50) {
      persistentWeakSpots.push(t);
    }
  });

  // Top error archetypes
  const trapArchetypes = Object.entries(archetypeErrors)
    .sort((a, b) => b[1] - a[1])
    .map(([arch]) => arch)
    .slice(0, 2);

  return {
    userId,
    totalAttempts,
    correctCount: totalCorrect,
    incorrectCount: totalIncorrect,
    overallAccuracy,
    netScoreEstimate,
    scoreTrend: overallAccuracy >= 65 ? "improving" : overallAccuracy >= 45 ? "stable" : "declining",
    resolvedWeaknesses: resolvedWeaknesses.slice(0, 3),
    persistentWeakSpots: persistentWeakSpots.length > 0
      ? persistentWeakSpots.slice(0, 4)
      : ["Electrostatics & Gauss Theorem", "Chemical Kinetics", "Definite Integrals"],
    fatalTimeSinksCount,
    fatalTimeSinkTopics: fatalTimeSinkTopics.slice(0, 3),
    trapArchetypes: trapArchetypes.length > 0 ? trapArchetypes : ["Numerical", "Assertion-Reasoning"],
  };
}

/**
 * Generates the weekly personalized 3-paragraph mentor debrief (~500 tokens)
 */
export async function generateSundayMentorDebrief(stats: WeeklyAttemptStats): Promise<string> {
  const prompt = `Act as an authoritative, encouraging Senior Academic Mentor for a CUET UG aspirant.
Based on the student's past 7 days of performance:
- Total Attempted: ${stats.totalAttempts} questions
- 7-Day Accuracy: ${stats.overallAccuracy}%
- Resolved Topics (Wins): ${stats.resolvedWeaknesses.join(", ") || "Steady retention progress across core concepts"}
- Persistent Weak Spots: ${stats.persistentWeakSpots.join(", ")}
- Fatal Time-Sinks (>90s Incorrect): ${stats.fatalTimeSinksCount} questions (Topics: ${stats.fatalTimeSinkTopics.join(", ") || "Complex numericals"})
- Trap Question Archetypes: ${stats.trapArchetypes.join(", ")}

Write a personalized 3-paragraph mentor debrief:
Paragraph 1: Celebrate their major win / resolved topic with specific evidence.
Paragraph 2: Identify their single most dangerous persistent error habit (e.g. fatal time sinks or distractor traps).
Paragraph 3: Give exactly two actionable test-taking strategies to apply on the Sunday Redemption Mock today.`;

  // Try Gemini or Groq
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && !geminiKey.includes("placeholder")) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 600 },
          }),
        }
      );
      if (res.ok) {
        const json = await res.json();
        const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      }
    } catch (e) {
      console.warn("Gemini Sunday debrief generation failed:", e);
    }
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey && !groqKey.includes("placeholder")) {
    try {
      const Groq = (await import("groq-sdk")).default;
      const groq = new Groq({ apiKey: groqKey });
      const completion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || "groq/compound-mini",
        temperature: 0.3,
        messages: [
          { role: "system", content: "You are the CUET Sunday Mentor. Provide a personalized 3-paragraph debrief." },
          { role: "user", content: prompt },
        ],
      });
      const text = completion.choices[0]?.message?.content;
      if (text) return text.trim();
    } catch (e) {
      console.warn("Groq Sunday debrief generation failed:", e);
    }
  }

  // High-quality deterministic fallback
  const topWin = stats.resolvedWeaknesses[0] || "Foundational NCERT recall";
  const topTrap = stats.persistentWeakSpots[0] || "calculation-heavy topics";
  return `### 1. Your Major Win This Week\nYour dedication has paid clear dividends in **${topWin}**. Your consistency across the week demonstrates that your foundational understanding and conceptual retention in this area have stabilized firmly above benchmark accuracy.\n\n### 2. The Habit Draining Your Score\nYour analytics reveal that **${topTrap}** remains your most vulnerable area, exacerbated by **${stats.fatalTimeSinksCount} fatal time-sink(s)** where you spent over 90 seconds before taking a negative mark (-1 penalty). When an initial algebraic step becomes murky, you are hesitating to disengage, which drains critical cognitive energy.\n\n### 3. Actionable Sunday Redemption Strategy\nFirst, adopt a strict **Two-Pass Protocol**: skip any calculation question in ${topTrap} on your first pass if the solution path isn't obvious within 30 seconds. Second, on ${stats.trapArchetypes[0] || "Assertion-Reasoning"} questions, verify both statements independently before looking at the linking conjunction ('because') to eliminate deceptive distractor traps.`;
}

/**
 * Programmatically compiles the 50-Question Sunday Redemption Mock (0 tokens)
 * Composition:
 * - 40% (20 Qs): High-error micro-topics from the user's last 7 days.
 * - 40% (20 Qs): Fresh unattempted questions from high-weightage NCERT domains.
 * - 20% (10 Qs): Question archetypes where the student fell for traps.
 */
export async function compileSundayRedemptionMock(
  userId: string,
  stats: WeeklyAttemptStats
): Promise<SundayRitualResult["redemptionTest"]> {
  const supabase = createClient();

  // Find all questions attempted by user
  let attemptedIds = new Set<string>();
  try {
    const { data: userAttempts } = await supabase
      .from("user_attempts")
      .select("question_id")
      .eq("user_id", userId);
    if (userAttempts) {
      userAttempts.forEach((ua) => attemptedIds.add(ua.question_id));
    }
  } catch {
    // Ignore
  }

  const selectedQuestions: Question[] = [];
  const selectedIds = new Set<string>();

  const mapDbQuestion = (q: any, idx: number, note: string): Question => {
    selectedIds.add(q.id);
    return {
      id: q.id,
      subjectId: (q.subject || "physics").toLowerCase(),
      questionNumber: idx + 1,
      prompt: q.question_text,
      options: [
        { id: "A", text: q.option_a },
        { id: "B", text: q.option_b },
        { id: "C", text: q.option_c },
        { id: "D", text: q.option_d },
      ],
      correctOptionId: q.correct_option as "A" | "B" | "C" | "D",
      explanation: q.explanation,
      aiDiagnosisNotes: note,
      pyqSource: q.ncert_reference || "Sunday Redemption Blueprint",
      topic: q.micro_topic || "Domain Core",
      chapter: q.chapter,
      difficulty: q.archetype === "Numerical" ? "hard" : "medium",
    };
  };

  // ─── 1. 40% (20 Questions): High-Error Micro-Topics from Last 7 Days ──────
  const weakTopics = stats.persistentWeakSpots;
  try {
    const { data: weakQs } = await supabase
      .from("questions")
      .select("*")
      .in("micro_topic", weakTopics)
      .limit(30);

    if (weakQs) {
      weakQs.forEach((q) => {
        if (selectedQuestions.length < 20 && !selectedIds.has(q.id)) {
          selectedQuestions.push(
            mapDbQuestion(
              q,
              selectedQuestions.length,
              `Sunday Redemption Target: Re-testing persistent weak topic (${q.micro_topic})`
            )
          );
        }
      });
    }
  } catch {
    // Ignore
  }

  // ─── 2. 40% (20 Questions): Fresh Unattempted High-Weightage Questions ────
  try {
    const { data: freshQs } = await supabase
      .from("questions")
      .select("*")
      .limit(60);

    if (freshQs) {
      freshQs.forEach((q) => {
        if (
          selectedQuestions.length < 40 &&
          !selectedIds.has(q.id) &&
          !attemptedIds.has(q.id)
        ) {
          selectedQuestions.push(
            mapDbQuestion(
              q,
              selectedQuestions.length,
              `Fresh NCERT Calibration: Testing unattempted core syllabus (${q.chapter})`
            )
          );
        }
      });
    }
  } catch {
    // Ignore
  }

  // ─── 3. 20% (10 Questions): Question Archetypes with Frequent Traps ───────
  const trapArchetypes = stats.trapArchetypes;
  try {
    const { data: trapQs } = await supabase
      .from("questions")
      .select("*")
      .in("archetype", trapArchetypes)
      .limit(20);

    if (trapQs) {
      trapQs.forEach((q) => {
        if (selectedQuestions.length < 50 && !selectedIds.has(q.id)) {
          selectedQuestions.push(
            mapDbQuestion(
              q,
              selectedQuestions.length,
              `Trap Archetype Neutralizer: Mastering ${q.archetype} problem structures`
            )
          );
        }
      });
    }
  } catch {
    // Ignore
  }

  // ─── 4. Fill to 50 Questions from Verified Assessment Catalog ─────────────
  if (selectedQuestions.length < 50) {
    const testFallback = getQuestionsForTest("physics");
    const fallbackQuestions = testFallback.questions || [];

    for (const fq of fallbackQuestions) {
      if (selectedQuestions.length >= 50) break;
      if (!selectedIds.has(fq.id)) {
        selectedIds.add(fq.id);
        const qNum = selectedQuestions.length + 1;
        selectedQuestions.push({
          ...fq,
          questionNumber: qNum,
          aiDiagnosisNotes: `Sunday Redemption Protocol: Complete mock balance`,
        });
      }
    }
  }

  const dateStr = new Date().toISOString().slice(0, 10);
  const redemptionTestId = `sunday_redemption_${userId.slice(0, 8)}_${dateStr.replace(/-/g, "")}`;

  // Persist test definition in public.tests & public.test_questions
  try {
    await supabaseAdmin.from("tests").upsert(
      {
        id: redemptionTestId,
        title: `Sunday 50-Question Redemption Mock (${dateStr})`,
        subject: "CUET Comprehensive Domain",
        total_questions: 50,
        duration_minutes: 60,
        is_active: true,
      },
      { onConflict: "id" }
    );

    const junctionRows = selectedQuestions.slice(0, 50).map((q, idx) => ({
      test_id: stringToUuid(redemptionTestId),
      question_id: stringToUuid(q.id),
      order_index: idx + 1,
    }));

    await supabaseAdmin
      .from("test_questions")
      .upsert(junctionRows, { onConflict: "test_id,question_id" });
  } catch (dbErr) {
    console.warn("Sunday mock DB persistence fallback:", dbErr);
  }

  return {
    testId: redemptionTestId,
    title: `Sunday 50-Question Redemption Mock (${dateStr})`,
    totalQuestions: 50,
    durationMinutes: 60,
    questions: selectedQuestions.slice(0, 50),
    composition: {
      highErrorMicroTopics: 20,
      freshUnattempted: 20,
      trapArchetypes: 10,
    },
  };
}

/**
 * Executes the complete Sunday Ritual on demand or via Sunday Cron
 */
export async function runSundayRitual(userId: string): Promise<SundayRitualResult> {
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekStartStr = weekStart.toISOString().slice(0, 10);
  const weekEndStr = new Date().toISOString().slice(0, 10);

  // 1. Check if Sunday report already generated for this week
  try {
    const client = supabaseAdmin || createClient();
    const { data: existingReport } = await client
      .from("sunday_mentor_reports")
      .select("*")
      .eq("user_id", userId)
      .eq("week_start_date", weekStartStr)
      .maybeSingle();

    if (existingReport && existingReport.mentor_debrief) {
      // Re-compile redemption mock from cached stats
      const stats = existingReport.stats_summary as WeeklyAttemptStats;
      const redemptionTest = await compileSundayRedemptionMock(userId, stats);
      return {
        stats,
        mentorDebrief: existingReport.mentor_debrief,
        redemptionTest,
        fromCache: true,
      };
    }
  } catch (err) {
    console.warn("Error reading sunday_mentor_reports cache:", err);
  }

  // 2. Aggregate 7-day stats
  const stats = await aggregateWeeklyAttempts(userId);

  // 3. Generate low-token mentor debrief (~500 tokens)
  const mentorDebrief = await generateSundayMentorDebrief(stats);

  // 4. Programmatically compile 50-Question Redemption Mock (0 tokens)
  const redemptionTest = await compileSundayRedemptionMock(userId, stats);

  // 5. Persist into sunday_mentor_reports
  try {
    await supabaseAdmin.from("sunday_mentor_reports").upsert(
      {
        user_id: userId,
        week_start_date: weekStartStr,
        week_end_date: weekEndStr,
        mentor_debrief: mentorDebrief,
        stats_summary: stats,
        redemption_test_id: stringToUuid(redemptionTest.testId),
      },
      { onConflict: "user_id,week_start_date" }
    );
  } catch (saveErr) {
    console.warn("Failed to persist sunday_mentor_reports:", saveErr);
  }

  return {
    stats,
    mentorDebrief,
    redemptionTest,
    fromCache: false,
  };
}
