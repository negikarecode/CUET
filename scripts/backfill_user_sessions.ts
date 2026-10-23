import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeSubject } from "@/lib/analytics";
import { resolveCanonicalTestId } from "@/lib/canonical-tests";

export interface ReconstructedSession {
  userId: string;
  testId: string;
  canonicalTestId: string;
  testTitle: string;
  subject: string;
  canonicalSubject: string;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  cuetScore: number;
  accuracyPercentage: number;
  completedAt: string;
  ledgerSessionId: string;
  ledgerRowExists: boolean;
}

export async function runBackfill(dryRun: boolean = true) {
  const admin = createAdminClient();
  console.log(`\n============================================================`);
  console.log(`CUET USER PROGRESS & SESSION RECONSTRUCTION BACKFILL`);
  console.log(`MODE: ${dryRun ? "DRY RUN (Read-Only)" : "LIVE EXECUTION (Additive Only)"}`);
  console.log(`============================================================\n`);

  // 1. Fetch all attempts in public.user_attempts
  const { data: attempts, error } = await admin
    .from("user_attempts")
    .select(`
      id,
      user_id,
      test_id,
      question_id,
      selected_option,
      is_correct,
      time_spent_seconds,
      created_at,
      questions (
        id,
        subject,
        chapter,
        correct_option
      ),
      tests (
        id,
        title,
        subject,
        total_questions
      )
    `)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to query user_attempts:", error);
    return;
  }

  if (!attempts || attempts.length === 0) {
    console.log("Zero user_attempts found in database.");
    return;
  }

  console.log(`Found ${attempts.length} total attempt rows in public.user_attempts.`);

  // 2. Group attempts by (user_id, test_id, timestamp_bucket)
  const groupMap = new Map<string, any[]>();
  attempts.forEach((a) => {
    const timeBucket = a.created_at ? new Date(a.created_at).toISOString().slice(0, 16) : "default";
    const groupKey = `${a.user_id}:::${a.test_id}:::${timeBucket}`;
    if (!groupMap.has(groupKey)) {
      groupMap.set(groupKey, []);
    }
    groupMap.get(groupKey)!.push(a);
  });

  console.log(`Grouped into ${groupMap.size} distinct test session(s).\n`);

  // 3. Fetch all current user_usage_ledger records
  const { data: existingLedger } = await admin
    .from("user_usage_ledger")
    .select("id, user_id, test_id, session_id, canonical_subject, completed_at");

  const ledgerSessionSet = new Set(existingLedger?.map((l) => `${l.user_id}:::${l.test_id}`));

  const reconstructedSessions: ReconstructedSession[] = [];
  const unmatchedAttempts: any[] = [];

  for (const [groupKey, rows] of groupMap.entries()) {
    const first = rows[0];
    const userId = first.user_id;
    const testId = first.test_id;
    const testObj = Array.isArray(first.tests) ? first.tests[0] : first.tests;
    const qObj = Array.isArray(first.questions) ? first.questions[0] : first.questions;

    const rawSubject = qObj?.subject || testObj?.subject || "Physics";
    const normSub = normalizeSubject(rawSubject);
    const testTitle = testObj?.title || `CUET ${normSub.name} Mock`;
    const canonicalSlug = resolveCanonicalTestId(String(testId), String(testTitle), normSub.name) || String(testId);

    const totalQuestions = testObj?.total_questions || 50;
    const attemptedCount = rows.filter((r) => r.selected_option !== null && r.selected_option !== undefined).length;
    const correctCount = rows.filter((r) => {
      if (r.is_correct === true || r.is_correct === "true" || r.is_correct === 1) return true;
      if (r.selected_option && r.questions?.correct_option && r.selected_option === r.questions.correct_option) return true;
      return false;
    }).length;
    const incorrectCount = Math.max(0, attemptedCount - correctCount);
    const unattemptedCount = Math.max(0, totalQuestions - attemptedCount);
    const cuetScore = correctCount * 5 - incorrectCount * 1;
    const accuracyPercentage = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const completedAt = first.created_at || new Date().toISOString();

    const ledgerSessionId = `${canonicalSlug}:${userId}_${first.created_at ? new Date(first.created_at).getTime() : Date.now()}`;
    const ledgerRowExists = ledgerSessionSet.has(`${userId}:::${canonicalSlug}`) || ledgerSessionSet.has(`${userId}:::${testId}`);

    if (!canonicalSlug || canonicalSlug === "cbt_exam") {
      unmatchedAttempts.push({ groupKey, rowsCount: rows.length, testId, testTitle });
    }

    reconstructedSessions.push({
      userId,
      testId,
      canonicalTestId: canonicalSlug,
      testTitle,
      subject: normSub.name,
      canonicalSubject: normSub.key,
      totalQuestions,
      attemptedCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      cuetScore,
      accuracyPercentage,
      completedAt,
      ledgerSessionId,
      ledgerRowExists,
    });
  }

  // Log reconstructed sessions
  console.log("RECONSTRUCTED SESSIONS:");
  reconstructedSessions.forEach((s, idx) => {
    console.log(`[Session ${idx + 1}]`);
    console.log(`  User ID:             ${s.userId}`);
    console.log(`  Canonical Test ID:   ${s.canonicalTestId}`);
    console.log(`  Title:               ${s.testTitle}`);
    console.log(`  Subject:             ${s.subject} (${s.canonicalSubject})`);
    console.log(`  Questions:           ${s.totalQuestions} (Attempted: ${s.attemptedCount}, Unattempted: ${s.unattemptedCount})`);
    console.log(`  Correct:             ${s.correctCount}`);
    console.log(`  Incorrect:           ${s.incorrectCount}`);
    console.log(`  CUET Score (+5/-1):  ${s.cuetScore} / ${s.totalQuestions * 5}`);
    console.log(`  Accuracy:            ${s.accuracyPercentage}%`);
    console.log(`  Completed At:        ${s.completedAt}`);
    console.log(`  Ledger Status:       ${s.ledgerRowExists ? "ALREADY RECORDED IN USER_USAGE_LEDGER" : "PENDING INSERTION"}`);
    console.log();
  });

  if (unmatchedAttempts.length > 0) {
    console.log("UNMATCHED ATTEMPTS (Action required - do not guess):");
    console.log(unmatchedAttempts);
  } else {
    console.log("Unmatched attempts: ZERO (All attempts successfully matched to canonical exams).");
  }

  // 4. If live mode and missing ledger entries, insert them additively
  const toInsert = reconstructedSessions.filter((s) => !s.ledgerRowExists);
  console.log(`Missing ledger rows to insert: ${toInsert.length}`);

  if (!dryRun && toInsert.length > 0) {
    const rowsToInsert = toInsert.map((s) => ({
      user_id: s.userId,
      test_id: s.canonicalTestId,
      canonical_subject: s.canonicalSubject,
      session_type: "mock",
      session_id: s.ledgerSessionId,
      completed_at: s.completedAt,
    }));

    const { error: insertErr } = await admin.from("user_usage_ledger").insert(rowsToInsert);
    if (insertErr) {
      console.error("Error inserting missing ledger rows:", insertErr);
    } else {
      console.log(`Successfully backfilled ${toInsert.length} session row(s) to user_usage_ledger.`);
    }
  }

  console.log(`\n============================================================`);
  console.log(`BACKFILL ${dryRun ? "DRY RUN COMPLETE" : "EXECUTION FINISHED"}`);
  console.log(`============================================================\n`);
}

// CLI execution
if (require.main === module) {
  const isLive = process.argv.includes("--live");
  runBackfill(!isLive)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
