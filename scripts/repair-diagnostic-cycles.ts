import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { fetchServerTestAttempts } from "../lib/server-attempts";
import { deduplicateTestAttempts, getCanonicalTestKey } from "../lib/analytics";
import { computeCycleMetrics, compareDiagnosticCycles } from "../lib/cycle-engine";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const isDryRun = !process.argv.includes("--execute");

async function run() {
  console.log("=========================================================");
  console.log(`DIAGNOSTIC CYCLE REPAIR SCRIPT (${isDryRun ? "DRY-RUN MODE" : "EXECUTE MODE"})`);
  console.log("=========================================================\n");

  // 1. Fetch all profiles
  const { data: profiles, error: pErr } = await supabase.from("profiles").select("*");
  if (pErr) {
    console.error("Failed to fetch profiles:", pErr);
    return;
  }

  // 2. Backup all user_attempts before any modification
  const { data: allUserAttempts, error: uaErr } = await supabase.from("user_attempts").select("*");
  if (uaErr) {
    console.error("Failed to fetch user_attempts:", uaErr);
    return;
  }

  const backupDir = path.join(process.cwd(), "scripts", "backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(backupDir, `user_attempts_backup_${timestamp}.json`);
  fs.writeFileSync(
    backupFile,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        profilesCount: profiles.length,
        userAttemptsCount: allUserAttempts.length,
        userAttempts: allUserAttempts,
      },
      null,
      2
    )
  );
  console.log(`[Backup] Snapshot of ${allUserAttempts.length} user_attempts written to:`);
  console.log(`         ${backupFile}\n`);

  let totalDuplicateRowsFound = 0;
  const duplicateIdsToDelete: string[] = [];

  // 3. Inspect each user
  for (const profile of profiles) {
    const userId = profile.id;
    const userAttempts = allUserAttempts.filter((ua) => ua.user_id === userId);
    if (userAttempts.length === 0) continue;

    console.log(`---------------------------------------------------------`);
    console.log(`User: ${profile.full_name || "Unnamed"} (${userId})`);
    console.log(`  Raw user_attempts in DB: ${userAttempts.length}`);

    // Check for exact duplicate question attempts: same (test_id, question_id)
    const seen = new Map<string, any[]>();
    for (const ua of userAttempts) {
      const key = `${ua.test_id}:::${ua.question_id}`;
      const existing = seen.get(key) || [];
      existing.push(ua);
      seen.set(key, existing);
    }

    let userDupes = 0;
    for (const [key, rows] of seen.entries()) {
      if (rows.length > 1) {
        userDupes += rows.length - 1;
        // Keep the latest row, mark older duplicates for removal
        rows.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        for (let i = 1; i < rows.length; i++) {
          duplicateIdsToDelete.push(rows[i].id);
        }
      }
    }

    totalDuplicateRowsFound += userDupes;
    console.log(`  Unique question attempts: ${seen.size}`);
    console.log(`  Duplicate question attempt rows: ${userDupes}`);

    // Reconstruct canonical server test attempts
    const serverTests = await fetchServerTestAttempts(supabase, userId);
    const cleanTests = deduplicateTestAttempts(serverTests);

    // Collect questions ordered chronologically
    const sortedTests = [...cleanTests].sort((a, b) => {
      const tA = new Date(a.submittedAt || 0).getTime();
      const tB = new Date(b.submittedAt || 0).getTime();
      return tA - tB;
    });

    const seenQuestionKeys = new Set<string>();
    const qualifyingQuestions: any[] = [];
    for (const test of sortedTests) {
      const testKey = getCanonicalTestKey(test);
      for (const q of test.questions || []) {
        if (q.selectedOption === null || q.selectedOption === undefined) continue;
        const qKey = q.questionId || (q.questionNumber !== undefined ? `q_${q.questionNumber}` : "q");
        const canonicalKey = `${testKey}:::${qKey}`;
        if (seenQuestionKeys.has(canonicalKey)) continue;
        seenQuestionKeys.add(canonicalKey);
        qualifyingQuestions.push({
          ...q,
          testId: test.testId || test.id,
          submittedAt: test.submittedAt,
        });
      }
    }

    const totalQuestions = qualifyingQuestions.length;
    const derivedCompletedCycles = Math.floor(totalQuestions / 150);
    const derivedCurrentCycle = derivedCompletedCycles + 1;
    const derivedCurrentCycleQuestions = totalQuestions % 150;

    console.log(`  Deduplicated qualifying questions: ${totalQuestions}`);
    console.log(`  Derived completed cycles: ${derivedCompletedCycles}`);
    console.log(`  Derived active cycle: Cycle ${derivedCurrentCycle} (${derivedCurrentCycleQuestions} / 150 Qs)`);

    // Show cycle breakdown
    for (let c = 0; c < derivedCompletedCycles; c++) {
      const slice = qualifyingQuestions.slice(c * 150, (c + 1) * 150);
      const correct = slice.filter((q) => q.isCorrect === true).length;
      const acc = Math.round((correct / 150) * 100);
      console.log(`    -> Cycle ${c + 1}: 150/150 questions, ${correct} correct, ${acc}% accuracy`);
    }

    // Sync profile.total_questions_attempted if drifting
    if (profile.total_questions_attempted !== totalQuestions) {
      console.log(
        `  [Profile Drift] total_questions_attempted is ${profile.total_questions_attempted}, should be ${totalQuestions}`
      );
      if (!isDryRun) {
        await supabase
          .from("profiles")
          .update({ total_questions_attempted: totalQuestions })
          .eq("id", userId);
        console.log(`  [Profile Updated] Synced to ${totalQuestions}`);
      }
    }
  }

  console.log(`\n=========================================================`);
  console.log(`SUMMARY OF REPAIR`);
  console.log(`=========================================================`);
  console.log(`Total duplicate question rows found across DB: ${totalDuplicateRowsFound}`);
  console.log(`Row IDs to delete: ${duplicateIdsToDelete.length}`);

  if (duplicateIdsToDelete.length > 0) {
    if (isDryRun) {
      console.log(`[DRY-RUN] Would delete ${duplicateIdsToDelete.length} duplicate rows. No rows were touched.`);
    } else {
      console.log(`[EXECUTE] Deleting ${duplicateIdsToDelete.length} duplicate rows...`);
      const { error: delErr } = await supabase
        .from("user_attempts")
        .delete()
        .in("id", duplicateIdsToDelete);
      if (delErr) {
        console.error("Deletion error:", delErr);
      } else {
        console.log(`[EXECUTE] Successfully deleted ${duplicateIdsToDelete.length} duplicate rows.`);
      }
    }
  } else {
    console.log(`Database is already completely clean of duplicate question attempts (0 duplicates).`);
  }

  console.log(`\n[Client-Store Repair Note]`);
  console.log(`The client's Zustand localStorage store ('cuet_test_store') stored 2 completed cycles`);
  console.log(`because attempts were temporarily doubled during client-server hydration.`);
  console.log(`Our code update to 'useTestStore.ts' and 'getDiagnosticProgress' makes cycles 100% derived`);
  console.log(`and prunes stored cycles to match floor(totalQuestions / 150) upon initialization.`);
  console.log(`=========================================================\n`);
}

run().catch(console.error);
