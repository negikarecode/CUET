import fs from "fs";
import path from "path";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { RecordedTestAttempt } from "@/types";
import { stringToUuid } from "@/lib/utils";
import { computeAnalyticsFromAttempts } from "@/lib/analytics";
import {
  getQuestionsForTest,
  SUBJECT_MOCK_DEFINITIONS,
  SubjectMockDefinition,
} from "@/lib/data/mock50Questions";
import { CUET_UG_2026_CONFIG, calculateExamScore } from "@/lib/config/examConfig";
import { calculateNextStreakOnPractice, getLocalDateString } from "@/lib/gamification";
import { sanitizeQuestionForActiveExam } from "@/lib/store/useCBTStore";
import { rateLimit, rateLimitResponse, getClientRateLimitIdentifier } from "@/lib/security/rateLimiter";
import { checkTestSessionEligibility, recordSessionCompletion } from "@/lib/payments/entitlements";
import { resolveCanonicalTestId } from "@/lib/canonical-tests";
import { buildScoredSet } from "@/lib/scoring";

export const dynamic = "force-dynamic";

// In-memory idempotency deduplication cache for test attempt submissions
const recentAttemptSubmissions = new Map<string, number>();

/**
 * Resolves a subject definition strictly if one of its known aliases matches the testId.
 * Never silently defaults to Physics if no alias matches.
 */
function findMatchingSubjectDef(testId: string): SubjectMockDefinition | null {
  const cleanId = (testId || "").toLowerCase();
  const sortedAliases: Array<{ alias: string; def: SubjectMockDefinition }> = [];
  for (const def of SUBJECT_MOCK_DEFINITIONS) {
    for (const alias of def.aliases) {
      sortedAliases.push({ alias, def });
    }
  }
  sortedAliases.sort((a, b) => b.alias.length - a.alias.length);

  for (const item of sortedAliases) {
    const regex = new RegExp("(^|[\\-_\\s])" + item.alias.replace(/[-\s]/g, "[-_\\s]?") + "([\\-_\\s]|$)", "i");
    if (regex.test(cleanId) || cleanId.startsWith(item.alias)) {
      return item.def;
    }
  }
  return null;
}

/**
 * Loads the authoritative question set and test metadata.
 * Looks up:
 * 1. DB-generated tests (via public.tests & public.test_questions junction table).
 * 2. Authentic static file bank (practice, pyq, or mock files on disk).
 * Returns null if no authoritative question set exists.
 */
async function getAuthoritativeTest(targetTestId: string): Promise<{
  authoritativeMeta: any;
  authoritativeQuestions: any[];
  isRepairQuiz: boolean;
  fromDatabase: boolean;
} | null> {
  const cleanId = (targetTestId || "").trim().toLowerCase();
  if (!cleanId) return null;

  // 1. Check DB-generated tests first (e.g. Sunday ritual, DB-persisted repair quizzes)
  try {
    const supabaseAdmin = createAdminClient();
    const testUuid = stringToUuid(targetTestId);

    const { data: dbTest } = await supabaseAdmin
      .from("tests")
      .select("*")
      .eq("id", testUuid)
      .maybeSingle();

    const { data: dbTestQuestions } = await supabaseAdmin
      .from("test_questions")
      .select("order_index, question_id, questions(id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, subject, chapter, micro_topic, ncert_reference)")
      .eq("test_id", testUuid)
      .order("order_index", { ascending: true });

    if (dbTestQuestions && dbTestQuestions.length > 0) {
      const authoritativeQuestions = dbTestQuestions.map((row: any) => {
        const q = row.questions || {};
        return {
          id: q.id || row.question_id,
          questionId: q.id || row.question_id,
          questionNumber: row.order_index,
          prompt: q.question_text || "",
          options: [
            { id: "A", text: q.option_a || "Option A" },
            { id: "B", text: q.option_b || "Option B" },
            { id: "C", text: q.option_c || "Option C" },
            { id: "D", text: q.option_d || "Option D" },
          ],
          correctOptionId: q.correct_option as "A" | "B" | "C" | "D",
          explanation: q.explanation || "",
          subjectId: q.subject || dbTest?.subject || "general",
          chapter: q.chapter || "",
          topic: q.micro_topic || "",
          ncertReference: q.ncert_reference,
        };
      });

      const isRepairQuiz = Boolean(
        dbTest?.is_repair_quiz === true ||
        dbTest?.test_type === "repair_quiz" ||
        dbTest?.test_type === "repair" ||
        dbTest?.practice_type === "repair" ||
        (dbTest?.title && (dbTest.title.toLowerCase().includes("repair") || dbTest.title.toLowerCase().includes("adaptive micro-drill")))
      );

      return {
        authoritativeMeta: dbTest,
        authoritativeQuestions,
        isRepairQuiz,
        fromDatabase: true,
      };
    }
  } catch (dbErr) {
    console.warn("[Authoritative DB Test Lookup Notice]:", dbErr);
  }

  // 2. Check File Bank
  const subjectDef = findMatchingSubjectDef(targetTestId);
  if (!subjectDef) {
    return null;
  }

  const isPractice =
    cleanId.includes("practice") ||
    (cleanId.includes("unit") && (cleanId.includes("test") || /unit[-_]?\d+/.test(cleanId)));
  const isPYQ = cleanId.includes("pyq");

  if (isPractice) {
    const unitMatch = cleanId.match(/unit[-_]?(\d+)/) || cleanId.match(/u[-_]?(\d+)/);
    const testMatch = cleanId.match(/test[-_]?(\d+)/) || cleanId.match(/t[-_]?(\d+)/) || cleanId.match(/-(\d+)$/);
    const unitNum = unitMatch && unitMatch[1] ? parseInt(unitMatch[1], 10) : 1;
    const testNum = testMatch && testMatch[1] ? parseInt(testMatch[1], 10) : 1;
    const filePath = path.join(process.cwd(), "practice", subjectDef.folder, `unit${unitNum}`, `${testNum}.json`);
    if (!fs.existsSync(filePath)) return null;
  } else if (isPYQ) {
    const pyqMatch = cleanId.match(/pyq[^\d]*(\d+)/) || cleanId.match(/-(\d+)$/) || cleanId.match(/(\d+)$/);
    const paperNum = pyqMatch && pyqMatch[1] ? parseInt(pyqMatch[1], 10) : 1;
    const pyqPath = path.join(process.cwd(), "pyq", subjectDef.folder, `${paperNum}.json`);
    const mockPath = path.join(process.cwd(), "mock", subjectDef.folder, `${paperNum}.json`);
    if (!fs.existsSync(pyqPath) && !fs.existsSync(mockPath)) return null;
  } else {
    // If testId includes "repair" or "drill" without DB persistence, reject as not a static file bank
    if (cleanId.includes("repair") || cleanId.includes("drill")) {
      return null;
    }
    const match = cleanId.match(/(\d+)/);
    const mockNum = match && match[1] ? parseInt(match[1], 10) : 1;
    const mockPath = path.join(process.cwd(), "mock", subjectDef.folder, `${mockNum}.json`);
    if (!fs.existsSync(mockPath)) return null;
  }

  try {
    const { questions, testMeta } = getQuestionsForTest(targetTestId);
    if (!questions || questions.length === 0) return null;

    const isRepairQuiz = Boolean(
      (testMeta as any)?.isRepairQuiz === true ||
      (testMeta as any)?.testType === "repair_quiz" ||
      (testMeta as any)?.practiceType === "repair"
    );

    return {
      authoritativeMeta: testMeta,
      authoritativeQuestions: questions,
      isRepairQuiz,
      fromDatabase: false,
    };
  } catch {
    return null;
  }
}

/**
 * For personalized drills and rituals (sunday_redemption_*, adaptive_drill_*, repair_quiz_*),
 * verifies that the embedded user ID prefix matches the authenticated candidate's user ID prefix (slice(0, 8)).
 */
function checkTestOwnership(testId: string, authUserId: string): boolean {
  if (!testId) return true;
  const lower = testId.toLowerCase();
  const prefixes = ["sunday_redemption_", "adaptive_drill_", "repair_quiz_"];
  const matchedPrefix = prefixes.find((p) => lower.startsWith(p));
  if (!matchedPrefix) {
    // Standard mock, PYQ, and practice tests have no per-user ownership restriction
    return true;
  }
  const remainder = lower.slice(matchedPrefix.length);
  const embeddedOwnerPrefix = remainder.split("_")[0];
  const expectedPrefix = (authUserId || "").slice(0, 8).toLowerCase();
  return Boolean(expectedPrefix && embeddedOwnerPrefix === expectedPrefix);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { testId: string } }
) {
  try {
    const canonicalTestId = resolveCanonicalTestId(params?.testId);
    if (!canonicalTestId) {
      return NextResponse.json(
        { error: `Test "${params?.testId}" not found or has no authoritative questions.`, code: "INVALID_TEST" },
        { status: 400 }
      );
    }

    // 1. Authenticate candidate & enforce usage eligibility
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser?.id) {
      return NextResponse.json(
        { error: "Unauthorized: Active candidate account required to access CBT exams.", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    const isEmailVerified = Boolean(
      authUser.email_confirmed_at ||
      authUser.confirmed_at ||
      (authUser.app_metadata?.provider && authUser.app_metadata.provider !== "email")
    );

    if (!isEmailVerified) {
      return NextResponse.json(
        { error: "Email verification required before accessing CBT test sessions.", code: "EMAIL_VERIFICATION_REQUIRED" },
        { status: 403 }
      );
    }

    // Verify candidate ownership on personalized drills and rituals
    if (!checkTestOwnership(canonicalTestId, authUser.id)) {
      return NextResponse.json(
        {
          error: "Forbidden: You do not have permission to access or take this personalized test.",
          code: "FORBIDDEN_TEST_OWNERSHIP",
        },
        { status: 403 }
      );
    }

    // Server-side rate limit on starting test sessions (10 per minute per user/IP)
    const rateIdentifier = getClientRateLimitIdentifier(_req, authUser.id, "exam:start");
    const rateCheck = await rateLimit("exam:start", rateIdentifier);
    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

    const testResult = await getAuthoritativeTest(canonicalTestId);
    if (!testResult || !testResult.authoritativeQuestions || testResult.authoritativeQuestions.length === 0) {
      return NextResponse.json(
        { error: `Test "${canonicalTestId}" not found or has no authoritative questions.`, code: "INVALID_TEST" },
        { status: 400 }
      );
    }

    const eligibility = await checkTestSessionEligibility(authUser.id, canonicalTestId);

    if (!eligibility.allowed) {
      return NextResponse.json(
        {
          error: eligibility.reason || "Free tier usage limit reached. Unlock unlimited access with CUETMate Premium.",
          code: "PAYWALL_LIMIT_REACHED",
          testType: eligibility.testType,
          currentUsage: eligibility.currentUsage,
          maxAllowed: eligibility.maxAllowed,
          canonicalSubject: eligibility.canonicalSubject,
        },
        { status: 403 }
      );
    }

    // Sanitize questions server-side before sending to client during active test
    const sanitizedQuestions = testResult.authoritativeQuestions.map(sanitizeQuestionForActiveExam);

    return NextResponse.json({
      testMeta: testResult.authoritativeMeta,
      questions: sanitizedQuestions,
    });
  } catch (err: any) {
    console.error("[Test Fetch Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to retrieve test" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { testId: string } }
) {
  try {
    const body = await req.json().catch(() => ({}));

    // Authorize candidate identity
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser?.id) {
      return NextResponse.json(
        { error: "Unauthorized: Active candidate account required to submit tests.", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    const isEmailVerified = Boolean(
      authUser.email_confirmed_at ||
      authUser.confirmed_at ||
      (authUser.app_metadata?.provider && authUser.app_metadata.provider !== "email")
    );

    if (!isEmailVerified) {
      return NextResponse.json(
        { error: "Email verification required before recording test attempts.", code: "EMAIL_VERIFICATION_REQUIRED" },
        { status: 403 }
      );
    }

    // Server-side rate limit on exam submissions (30 per minute per user)
    const rateIdentifier = getClientRateLimitIdentifier(req, authUser.id, "exam:submit");
    const rateCheck = await rateLimit("exam:submit", rateIdentifier);
    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

    const isRecordAttempt =
      params.testId === "record-attempt" ||
      body.action === "record" ||
      (Array.isArray(body.questions) && (Boolean(body.testId) || (Boolean(params.testId) && params.testId !== "record-attempt")));

    // ─── 1. RECORD TEST ATTEMPT & AUTHORITATIVE SERVER SCORING ───────────────
    if (isRecordAttempt) {
      const attempt = body as RecordedTestAttempt;

      const candidateTestId =
        params.testId && params.testId !== "record-attempt"
          ? params.testId
          : attempt?.testId;

      if (!candidateTestId || typeof candidateTestId !== "string" || !candidateTestId.trim() || !attempt || !Array.isArray(attempt.questions)) {
        return NextResponse.json(
          { error: "Invalid attempt payload. Valid testId and questions are required." },
          { status: 400 }
        );
      }

      const canonicalTestId = resolveCanonicalTestId(candidateTestId);
      if (!canonicalTestId) {
        return NextResponse.json(
          {
            error: `Invalid test: No authoritative question set found for testId "${candidateTestId}".`,
            code: "INVALID_TEST",
          },
          { status: 400 }
        );
      }

      // Verify candidate ownership on personalized drills and rituals
      if (!checkTestOwnership(canonicalTestId, authUser.id)) {
        return NextResponse.json(
          {
            error: "Forbidden: You do not have permission to submit attempts for this personalized test.",
            code: "FORBIDDEN_TEST_OWNERSHIP",
          },
          { status: 403 }
        );
      }

      // Canonical testId used identically across entitlement, answer-key lookup, scoring, and storage
      const targetTestId = canonicalTestId;
      attempt.testId = canonicalTestId;

      // Authoritative Server-Side Question Set Verification (File Bank OR DB-generated tests)
      const testResult = await getAuthoritativeTest(targetTestId);
      if (!testResult || !testResult.authoritativeQuestions || testResult.authoritativeQuestions.length === 0) {
        return NextResponse.json(
          {
            error: `Invalid test: No authoritative question set found for testId "${targetTestId}".`,
            code: "INVALID_TEST",
          },
          { status: 400 }
        );
      }

      // Authoritative Entitlement & Limit Verification
      const eligibility = await checkTestSessionEligibility(authUser.id, targetTestId);

      if (!eligibility.allowed) {
        return NextResponse.json(
          {
            error: eligibility.reason || "Free tier usage limit reached. Unlock unlimited access with CUETMate Premium.",
            code: "PAYWALL_LIMIT_REACHED",
            testType: eligibility.testType,
            currentUsage: eligibility.currentUsage,
            maxAllowed: eligibility.maxAllowed,
            canonicalSubject: eligibility.canonicalSubject,
          },
          { status: 403 }
        );
      }

      const authoritativeQuestions = testResult.authoritativeQuestions;
      const authoritativeMeta = testResult.authoritativeMeta;

      // Build authoritative answer key map
      const authMap = new Map<string, string>();
      authoritativeQuestions.forEach((tq) => {
        const isDroppedQ = Boolean(
          tq.isDropped === true ||
          (tq as any).official_answer_status === "officially_dropped" ||
          (tq as any).status === "dropped" ||
          String(tq.correctOption || tq.correctOptionId || tq.correct_option || "").toUpperCase() === "DROPPED"
        );
        const key =
          tq.correctOptionId ||
          tq.correct_option ||
          (tq as any).correctOption ||
          (isDroppedQ ? "DROPPED" : null) ||
          tq.options?.find((o: any) => o.isCorrect === true)?.id;
        if (key) {
          if (tq.id) authMap.set(tq.id, key);
          if (tq.questionId) authMap.set(tq.questionId, key);
          if (tq.questionNumber !== undefined) {
            authMap.set(String(tq.questionNumber), key);
            authMap.set(`q_${tq.questionNumber}`, key);
            authMap.set(tq.questionNumber.toString().padStart(2, "0"), key);
          }
        }
      });

      // Reject payloads with more entries than the authoritative test has questions
      if (attempt.questions.length > authoritativeQuestions.length) {
        return NextResponse.json(
          {
            error: `Payload contains ${attempt.questions.length} entries, exceeding authoritative test size (${authoritativeQuestions.length}).`,
            code: "EXCESSIVE_QUESTION_ENTRIES",
          },
          { status: 400 }
        );
      }

      // Reject payloads with duplicate question IDs or duplicate question numbers
      const seenSubmittedIds = new Set<string>();
      const seenSubmittedNumbers = new Set<number>();
      for (let idx = 0; idx < attempt.questions.length; idx++) {
        const q = attempt.questions[idx];
        if (!q) {
          return NextResponse.json(
            {
              error: `Submitted question at index ${idx} is invalid or undefined.`,
              code: "MISSING_AUTHORITATIVE_KEY",
            },
            { status: 400 }
          );
        }

        const idKey = q.questionId || (q as any).id;
        if (idKey) {
          const lowerId = String(idKey).trim().toLowerCase();
          if (seenSubmittedIds.has(lowerId)) {
            return NextResponse.json(
              {
                error: `Duplicate question entry detected for question ID "${idKey}".`,
                code: "DUPLICATE_QUESTION_ENTRY",
              },
              { status: 400 }
            );
          }
          seenSubmittedIds.add(lowerId);
        }

        if (q.questionNumber !== undefined && q.questionNumber !== null) {
          const qNum = Number(q.questionNumber);
          if (seenSubmittedNumbers.has(qNum)) {
            return NextResponse.json(
              {
                error: `Duplicate question entry detected for question number ${qNum}.`,
                code: "DUPLICATE_QUESTION_ENTRY",
              },
              { status: 400 }
            );
          }
          seenSubmittedNumbers.add(qNum);
        }

        const expectedOption =
          (q.questionId && authMap.get(q.questionId)) ||
          ((q as any).id && authMap.get((q as any).id)) ||
          (q.questionNumber !== undefined && authMap.get(String(q.questionNumber))) ||
          (q.questionNumber === undefined && authMap.get(String(idx + 1)));

        if (!expectedOption) {
          return NextResponse.json(
            {
              error: `Submitted question at index ${idx} has no authoritative answer key.`,
              code: "MISSING_AUTHORITATIVE_KEY",
            },
            { status: 400 }
          );
        }
      }

      // Build the scored set by iterating the AUTHORITATIVE questions, matching at most one client entry per question (first wins), ignoring extras
      const scoredSet = buildScoredSet(authoritativeQuestions, attempt.questions);

      // Compute correct/incorrect/attempted counts, marks, and accuracy from that deduped set only
      let verifiedCorrectCount = 0;
      let verifiedIncorrectCount = 0;
      let verifiedAttemptedCount = 0;

      for (const entry of scoredSet) {
        if (entry.clientQuestion) {
          entry.clientQuestion.correctOption = entry.expectedOption;
          entry.clientQuestion.isCorrect = entry.isCorrect;
          if (entry.isDropped) {
            entry.clientQuestion.isDropped = true;
            entry.clientQuestion.official_answer_status = "officially_dropped";
          }
          if (entry.isMultipleCorrect) {
            entry.clientQuestion.isMultipleCorrect = true;
            entry.clientQuestion.acceptedOptions = entry.acceptedOptions;
          }
        }
        if (entry.selectedOption) {
          verifiedAttemptedCount += 1;
          if (entry.isCorrect) {
            verifiedCorrectCount += 1;
          } else {
            verifiedIncorrectCount += 1;
          }
        }
      }

      // Reject submissions with zero answered questions (fail closed, write nothing)
      if (verifiedAttemptedCount === 0) {
        return NextResponse.json(
          {
            error: "Submissions with zero answered questions are not permitted.",
            code: "EMPTY_SUBMISSION",
          },
          { status: 400 }
        );
      }

      attempt.correctCount = verifiedCorrectCount;
      attempt.incorrectCount = verifiedIncorrectCount;
      attempt.attemptedCount = verifiedAttemptedCount;
      const unattemptedCount = Math.max(0, authoritativeQuestions.length - verifiedAttemptedCount);
      attempt.unattemptedCount = unattemptedCount;

      const totalQ = authoritativeQuestions.length || 50;
      const { totalMarks, maxMarks } = calculateExamScore(
        verifiedCorrectCount,
        verifiedIncorrectCount,
        unattemptedCount,
        CUET_UG_2026_CONFIG,
        totalQ
      );

      attempt.totalMarks = totalMarks;
      attempt.maxMarks = maxMarks;
      attempt.accuracyPercentage =
        verifiedAttemptedCount > 0
          ? Math.round((verifiedCorrectCount / verifiedAttemptedCount) * 100)
          : 0;

      // Determine target User ID securely
      const targetUserId = authUser.id;
      const isSupabaseAuthenticated = true;

      // 1. Resolve and enforce attempt UUID (server-derived UUID if missing or invalid)
      const rawAttemptId = typeof attempt.attemptId === "string" && attempt.attemptId.trim()
        ? attempt.attemptId.trim()
        : (typeof attempt.id === "string" && attempt.id.trim() ? attempt.id.trim() : "");

      const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      let attemptUuid: string;
      if (rawAttemptId && UUID_REGEX.test(rawAttemptId)) {
        attemptUuid = rawAttemptId.toLowerCase();
      } else if (rawAttemptId) {
        attemptUuid = stringToUuid(rawAttemptId);
      } else {
        // Missing attemptId: generate cryptographically secure unique server-side UUID so submission cannot share ledger or bypass dedup
        attemptUuid = crypto.randomUUID();
      }
      attempt.attemptId = attemptUuid;

      // Server Idempotency Guard: prevent duplicate submissions within 60 seconds (strictly bound to user, test, and attemptId)
      const idempotencyKey = `${targetUserId}_${canonicalTestId}_${attemptUuid}`;
      const nowMs = Date.now();
      const lastSeen = recentAttemptSubmissions.get(idempotencyKey);
      if (lastSeen && nowMs - lastSeen < 60000) {
        return NextResponse.json({
          success: true,
          deduplicated: true,
          persistedToDatabase: isSupabaseAuthenticated,
          attempt,
          questions: authoritativeQuestions,
        });
      }
      recentAttemptSubmissions.set(idempotencyKey, nowMs);
      if (recentAttemptSubmissions.size > 500) {
        for (const [k, t] of recentAttemptSubmissions.entries()) {
          if (nowMs - t > 60000) recentAttemptSubmissions.delete(k);
        }
      }

      const canPersistToDatabase = isSupabaseAuthenticated;
      let updatedStreak: number | undefined;
      let computedAnalytics: any = null;

      if (canPersistToDatabase) {
        const supabaseAdmin = createAdminClient();

        // 1. Ensure test record exists in tests table so foreign key constraint is satisfied
        // Authoritative server-side bank metadata only: client-supplied testTitle, subject, totalQuestions are discarded
        const testUuid = stringToUuid(targetTestId);
        await supabaseAdmin.from("tests").upsert(
          {
            id: testUuid,
            title: authoritativeMeta?.title || `CUET ${authoritativeMeta?.subject || "Practice"} Mock Test`,
            subject: authoritativeMeta?.subject || "General",
            total_questions: authoritativeMeta?.totalQuestions || (authoritativeQuestions.length > 0 ? authoritativeQuestions.length : 50),
            duration_minutes: authoritativeMeta?.durationMinutes || 60,
            is_active: true,
          },
          { onConflict: "id" }
        );

        // 2. Ensure question records exist in questions table with metadata
        // Authoritative server-side bank questions only: client-supplied question texts, options, explanations are discarded
        const questionsToUpsert = authoritativeQuestions.map((tq, idx) => {
          const qUuid = stringToUuid(tq.questionId || tq.id || `${targetTestId}_q_${idx + 1}`);
          const optA =
            tq.options?.find((o: any) => o.id === "A")?.text || "Option A";
          const optB =
            tq.options?.find((o: any) => o.id === "B")?.text || "Option B";
          const optC =
            tq.options?.find((o: any) => o.id === "C")?.text || "Option C";
          const optD =
            tq.options?.find((o: any) => o.id === "D")?.text || "Option D";
          const expectedOption =
            tq.correctOptionId ||
            tq.correct_option ||
            (tq as any).correctOption ||
            tq.options?.find((o: any) => o.isCorrect === true)?.id ||
            authMap.get(tq.questionId) ||
            authMap.get(tq.id) ||
            authMap.get(String(tq.questionNumber));

          return {
            id: qUuid,
            subject: authoritativeMeta?.subject || tq.subjectId || "General",
            chapter: tq.chapter || "Domain Core",
            micro_topic: tq.microTopic || tq.chapter || "Core Concept",
            ncert_reference: tq.ncertReference || `NCERT Class 12 (${tq.chapter || "Core"})`,
            archetype: "Direct Fact",
            question_text: tq.prompt || `Question ${tq.questionNumber || idx + 1}`,
            option_a: optA,
            option_b: optB,
            option_c: optC,
            option_d: optD,
            correct_option: expectedOption,
            explanation: tq.explanation || "Official Solution",
          };
        });

        if (questionsToUpsert.length > 0) {
          await supabaseAdmin.from("questions").upsert(questionsToUpsert, { onConflict: "id" });
        }

        // 3. Database Idempotency Check & Atomic Submission Flow
        // Derive the ledger session_id server-side as `${canonicalTestId}:${attemptUuid}`
        const ledgerSessionId = `${canonicalTestId}:${attemptUuid}`;

        // 3a. Idempotency check: if session is already recorded in authoritative user_usage_ledger, return immediately
        try {
          const { data: existingLedger } = await supabaseAdmin
            .from("user_usage_ledger")
            .select("id, completed_at")
            .eq("user_id", targetUserId)
            .eq("session_id", ledgerSessionId)
            .maybeSingle();

          if (existingLedger) {
            recentAttemptSubmissions.delete(idempotencyKey);
            return NextResponse.json({
              success: true,
              deduplicated: true,
              persistedToDatabase: true,
              attempt,
              questions: authoritativeQuestions,
            });
          }
        } catch (idempErr) {
          console.warn("[Submit Idempotency Check Warning]:", idempErr);
        }

        // 3b. Prepare per-question attempt rows (All answered questions count regardless of speed)
        const seenQuestionUuids = new Set<string>();
        const attemptsToInsert: any[] = [];

        scoredSet
          .filter((entry) => entry.selectedOption !== null && entry.selectedOption !== undefined)
          .forEach((entry) => {
            const authQ = entry.authQuestion;
            const canonicalQId = authQ.questionId || authQ.id || `${targetTestId}_q_${authQ.questionNumber}`;
            const qUuid = stringToUuid(canonicalQId);
            if (seenQuestionUuids.has(qUuid)) return;
            seenQuestionUuids.add(qUuid);

            const rowData: any = {
              user_id: targetUserId,
              test_id: testUuid,
              question_id: qUuid,
              selected_option: entry.selectedOption,
              is_correct: entry.isCorrect,
              time_spent_seconds: entry.timeSpentSeconds !== undefined && entry.timeSpentSeconds !== null
                ? Number(entry.timeSpentSeconds)
                : 0,
            };

            attemptsToInsert.push(rowData);
          });

        // 3c. Record session completion to immutable user_usage_ledger first
        let ledgerInserted = false;
        try {
          await recordSessionCompletion({
            userId: targetUserId,
            testId: targetTestId,
            sessionId: ledgerSessionId,
            subject: attempt.subject || authoritativeMeta?.subject,
          });
          ledgerInserted = true;
        } catch (ledgerErr) {
          recentAttemptSubmissions.delete(idempotencyKey);
          console.error("[Usage Ledger Recording Error]:", ledgerErr);
          return NextResponse.json(
            {
              error: "Failed to record session completion in authoritative usage ledger. Please retry.",
              code: "USAGE_RECORDING_FAILED",
            },
            { status: 500 }
          );
        }

        // 3d. Insert per-question attempts into public.user_attempts with rollback on failure
        if (attemptsToInsert.length > 0) {
          const { error: insertErr } = await supabaseAdmin
            .from("user_attempts")
            .insert(attemptsToInsert);

          if (insertErr) {
            console.error("[Record Attempt Insert DB Error]:", insertErr);

            // Roll back the ledger record to maintain atomic consistency (no half-saved sessions)
            if (ledgerInserted) {
              try {
                await supabaseAdmin
                  .from("user_usage_ledger")
                  .delete()
                  .eq("user_id", targetUserId)
                  .eq("session_id", ledgerSessionId);
              } catch (ledgerRollbackErr) {
                console.error("[Ledger Rollback Error]:", ledgerRollbackErr);
              }
            }

            recentAttemptSubmissions.delete(idempotencyKey);
            return NextResponse.json(
              {
                error: "Failed to record user attempt rows in database. Session was rolled back. Please retry.",
                code: "ATTEMPTS_INSERTION_FAILED",
              },
              { status: 500 }
            );
          }
        }

        // Update profile streak and canonical total_questions_attempted
        try {
          const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("current_streak, last_practice_date")
            .eq("id", targetUserId)
            .maybeSingle();

          const { count: canonicalDbAttemptCount } = await supabaseAdmin
            .from("user_attempts")
            .select("id", { count: "exact", head: true })
            .eq("user_id", targetUserId);

          if (profile) {
            const todayStr = getLocalDateString();

            updatedStreak = calculateNextStreakOnPractice(
              profile.current_streak ?? 0,
              profile.last_practice_date,
              todayStr
            );

            await supabaseAdmin
              .from("profiles")
              .update({
                current_streak: updatedStreak,
                last_practice_date: todayStr,
                total_questions_attempted: canonicalDbAttemptCount ?? attemptsToInsert.length,
              })
              .eq("id", targetUserId);
          }
        } catch (profileErr) {
          console.error("[Profile Update Post-Submission Error]:", profileErr);
        }
      }

      try {
        computedAnalytics = computeAnalyticsFromAttempts([attempt]);
      } catch (analyticsErr) {
        console.error("[computeAnalyticsFromAttempts Error]:", analyticsErr);
        computedAnalytics = null;
      }

      return NextResponse.json({
        success: true,
        persistedToDatabase: canPersistToDatabase,
        analytics: computedAnalytics,
        attempt,
        questions: authoritativeQuestions,
        streak: updatedStreak,
      });
    }

    // ─── 2. REVEAL AUTHENTIC ANSWER KEYS UPON VERIFIED SUBMISSION ────────────
    const { action } = body;
    const isVerifiedSubmission =
      action === "submit" &&
      (body.answersSubmitted === true || (body.questionStates && typeof body.questionStates === "object"));

    if (isVerifiedSubmission) {
      const rawRevealId = (params.testId && params.testId !== "record-attempt" ? params.testId : body.testId || "").trim();
      const canonicalTestId = resolveCanonicalTestId(rawRevealId);
      if (!canonicalTestId) {
        return NextResponse.json(
          { error: "Valid testId is required to reveal answers.", code: "INVALID_TEST" },
          { status: 400 }
        );
      }
      const targetTestId = canonicalTestId;
      const testUuid = stringToUuid(targetTestId);

      // Verify candidate ownership on personalized drills and rituals
      if (!checkTestOwnership(targetTestId, authUser.id)) {
        return NextResponse.json(
          {
            error: "Forbidden: You do not have permission to reveal answers for this personalized test.",
            code: "FORBIDDEN_TEST_OWNERSHIP",
          },
          { status: 403 }
        );
      }

      // Verify that candidate has already recorded user_attempts for this exact test
      const supabaseAdmin = createAdminClient();
      const { count: attemptCount, error: countErr } = await supabaseAdmin
        .from("user_attempts")
        .select("id", { count: "exact", head: true })
        .eq("user_id", authUser.id)
        .eq("test_id", testUuid);

      if (countErr || !attemptCount || attemptCount === 0) {
        return NextResponse.json(
          {
            error: "Forbidden: Test answers can only be revealed after user attempts have been recorded for this exact test.",
            code: "NO_ATTEMPTS_FOUND",
          },
          { status: 403 }
        );
      }

      const testResult = await getAuthoritativeTest(targetTestId);
      if (!testResult || !testResult.authoritativeQuestions || testResult.authoritativeQuestions.length === 0) {
        return NextResponse.json(
          { error: "Invalid test: No authoritative question set found.", code: "INVALID_TEST" },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        testMeta: testResult.authoritativeMeta,
        questions: testResult.authoritativeQuestions,
      });
    }

    return NextResponse.json(
      { error: "Forbidden: Test answers are only revealed upon verified submission of attempts." },
      { status: 403 }
    );
  } catch (err: any) {
    console.error("[Test Reveal/Action Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to process test action" },
      { status: 500 }
    );
  }
}
