import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local / .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface SessionGroup {
  userId: string;
  testId: string;
  testTitle: string;
  subject: string;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  totalMarks: number;
  accuracyPercentage: number;
  createdAt: string;
  timestamp: number;
  rowIds: string[];
}

async function runDeduplication() {
  console.log("\n============================================================");
  console.log("       CUET AI-PREP: SESSION DEDUPLICATION SCRIPT            ");
  console.log("============================================================\n");

  // 1. Fetch all user attempts from database
  console.log("1. Fetching all user_attempts from database...");
  const { data: allAttempts, error } = await supabase
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
      tests (
        id,
        title,
        subject,
        total_questions
      )
    `)
    .order("created_at", { ascending: true });

  if (error || !allAttempts) {
    console.error("Failed to fetch user_attempts:", error);
    process.exit(1);
  }

  console.log(`✓ Fetched ${allAttempts.length} total attempt rows from database.\n`);

  // 2. Perform full backup before any deletions
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.resolve(process.cwd(), "backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  const backupPath = path.join(backupDir, `user_attempts_backup_${timestamp}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(allAttempts, null, 2), "utf-8");
  console.log(`2. Backup created successfully at:\n   ${backupPath}\n`);

  // 3. Group attempts into distinct sessions
  // An attempt session consists of question attempts for a user and test around the same submission time
  const userTestClusters = new Map<string, typeof allAttempts>();
  for (const row of allAttempts) {
    const key = `${row.user_id}:::${row.test_id}`;
    if (!userTestClusters.has(key)) {
      userTestClusters.set(key, []);
    }
    userTestClusters.get(key)!.push(row);
  }

  // Decompose each cluster into distinct timestamp-based sessions (split if timestamps differ by > 60s)
  const sessions: SessionGroup[] = [];

  for (const [key, rows] of userTestClusters.entries()) {
    const [userIdRaw, testIdRaw] = key.split(":::");
    const userId = userIdRaw || "";
    const testId = testIdRaw || "";
    // Sort rows by created_at
    rows.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    // Sub-cluster rows by timestamp window (within 30 seconds)
    const timeSubClusters: (typeof rows)[] = [];
    let currentSubCluster: typeof rows = [];

    for (const r of rows) {
      if (currentSubCluster.length === 0) {
        currentSubCluster.push(r);
      } else {
        const lastRowInSub = currentSubCluster[currentSubCluster.length - 1];
        const prevTime = lastRowInSub ? new Date(lastRowInSub.created_at).getTime() : 0;
        const currTime = new Date(r.created_at).getTime();
        if (Math.abs(currTime - prevTime) <= 30000) {
          currentSubCluster.push(r);
        } else {
          timeSubClusters.push(currentSubCluster);
          currentSubCluster = [r];
        }
      }
    }
    if (currentSubCluster.length > 0) {
      timeSubClusters.push(currentSubCluster);
    }

    for (const subCluster of timeSubClusters) {
      const firstRow = subCluster[0];
      if (!firstRow) continue;
      const testMeta = firstRow.tests as any;
      const totalQ = testMeta?.total_questions || 50;
      const correct = subCluster.filter((r) => r.is_correct === true).length;
      const attempted = subCluster.filter(
        (r) => r.selected_option !== null && r.selected_option !== undefined
      ).length;
      const incorrect = attempted - correct;
      const totalMarks = correct * 5 - incorrect * 1;
      const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
      const createdAt = firstRow.created_at;

      sessions.push({
        userId,
        testId,
        testTitle: testMeta?.title || "CUET Mock Test",
        subject: testMeta?.subject || "Domain",
        totalQuestions: totalQ,
        attemptedCount: attempted,
        correctCount: correct,
        incorrectCount: incorrect,
        totalMarks,
        accuracyPercentage: accuracy,
        createdAt,
        timestamp: new Date(createdAt).getTime(),
        rowIds: subCluster.map((r) => r.id),
      });
    }
  }

  console.log(`3. Analyzed into ${sessions.length} total sessions across all users.\n`);

  // 4. Identify duplicate sessions:
  // Same user, same test (or test title), same score, and timestamps within 60 seconds
  const duplicateRowIdsToDelete: string[] = [];
  const duplicateSessionIndexes = new Set<number>();

  for (let i = 0; i < sessions.length; i++) {
    if (duplicateSessionIndexes.has(i)) continue;
    const s1 = sessions[i];
    if (!s1) continue;

    for (let j = i + 1; j < sessions.length; j++) {
      if (duplicateSessionIndexes.has(j)) continue;
      const s2 = sessions[j];
      if (!s2) continue;

      if (s1.userId === s2.userId) {
        const isSameTest =
          s1.testId === s2.testId ||
          s1.testTitle.toLowerCase().trim() === s2.testTitle.toLowerCase().trim();
        const isSameScore = s1.totalMarks === s2.totalMarks && s1.correctCount === s2.correctCount;
        const timeDiffSec = Math.abs(s1.timestamp - s2.timestamp) / 1000;

        if (isSameTest && isSameScore && timeDiffSec <= 60) {
          console.log(`  [DUPLICATE DETECTED]`);
          console.log(`    User: ${s1.userId}`);
          console.log(`    Test: "${s1.testTitle}" (Score: ${s1.totalMarks}, Acc: ${s1.accuracyPercentage}%)`);
          console.log(`    Session 1: ${s1.createdAt} (${s1.rowIds.length} rows)`);
          console.log(`    Session 2: ${s2.createdAt} (${s2.rowIds.length} rows) - Time diff: ${timeDiffSec}s`);
          console.log(`    Marking Session 2 for deletion (${s2.rowIds.length} rows).\n`);

          duplicateSessionIndexes.add(j);
          s2.rowIds.forEach((id) => duplicateRowIdsToDelete.push(id));
        }
      }
    }
  }

  // Also check for duplicate rows within the same session (duplicate question_id within a session)
  const intraSessionDuplicateRowIds: string[] = [];
  for (const s of sessions) {
    if (duplicateSessionIndexes.has(sessions.indexOf(s))) continue;
    const sessionRows = allAttempts.filter((r) => s.rowIds.includes(r.id));
    const seenQ = new Set<string>();
    for (const r of sessionRows) {
      if (seenQ.has(r.question_id)) {
        intraSessionDuplicateRowIds.push(r.id);
      } else {
        seenQ.add(r.question_id);
      }
    }
  }

  const allRowIdsToDelete = Array.from(
    new Set([...duplicateRowIdsToDelete, ...intraSessionDuplicateRowIds])
  );

  console.log("============================================================");
  console.log(`DUPLICATE SCAN REPORT BEFORE DELETION:`);
  console.log(`- Duplicate sessions found: ${duplicateSessionIndexes.size}`);
  console.log(`- Duplicate session rows to delete: ${duplicateRowIdsToDelete.length}`);
  console.log(`- Intra-session duplicate question rows: ${intraSessionDuplicateRowIds.length}`);
  console.log(`- Total database rows to delete: ${allRowIdsToDelete.length}`);
  console.log("============================================================\n");

  // 5. Delete duplicate records if found
  if (allRowIdsToDelete.length > 0) {
    console.log(`5. Deleting ${allRowIdsToDelete.length} duplicate records from Supabase user_attempts...`);
    const chunkSize = 100;
    for (let i = 0; i < allRowIdsToDelete.length; i += chunkSize) {
      const chunk = allRowIdsToDelete.slice(i, i + chunkSize);
      const { error: delErr } = await supabase
        .from("user_attempts")
        .delete()
        .in("id", chunk);

      if (delErr) {
        console.error("Error deleting duplicate chunk:", delErr);
      }
    }
    console.log(`✓ Deleted ${allRowIdsToDelete.length} duplicate rows.\n`);
  } else {
    console.log("5. No duplicate rows found in Supabase user_attempts to delete.\n");
  }

  // 6. Recompute KPI Stats for each user from remaining authentic sessions
  const remainingSessions = sessions.filter((_, idx) => !duplicateSessionIndexes.has(idx));
  const userMap = new Map<string, SessionGroup[]>();

  for (const s of remainingSessions) {
    if (!userMap.has(s.userId)) userMap.set(s.userId, []);
    userMap.get(s.userId)!.push(s);
  }

  console.log("============================================================");
  console.log("RECOMPUTED USER KPI STATISTICS:");
  console.log("============================================================");

  for (const [userId, uSessions] of userMap.entries()) {
    const completedSessions = uSessions.length;
    const totalScore = uSessions.reduce((sum, s) => sum + s.totalMarks, 0);
    const avgScore = completedSessions > 0 ? Math.round(totalScore / completedSessions) : 0;
    const totalAcc = uSessions.reduce((sum, s) => sum + s.accuracyPercentage, 0);
    const avgAccuracy = completedSessions > 0 ? Math.round(totalAcc / completedSessions) : 0;
    const personalBest = uSessions.reduce((max, s) => Math.max(max, s.totalMarks), 0);

    // Count authoritative unique questions in DB for this user
    const { count: actualDbQuestions } = await supabase
      .from("user_attempts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    console.log(`\nUser ID: ${userId}`);
    console.log(`  • Completed Sessions: ${completedSessions}`);
    console.log(`  • Average Score:      ${avgScore} marks`);
    console.log(`  • Average Accuracy:   ${avgAccuracy}%`);
    console.log(`  • Personal Best:      ${personalBest} marks`);
    console.log(`  • Authoritative Solved Questions: ${actualDbQuestions || 0}`);

    // Update profile in Supabase
    await supabase
      .from("profiles")
      .update({
        total_questions_attempted: actualDbQuestions || 0,
      })
      .eq("id", userId);
  }

  console.log("\n============================================================");
  console.log("✓ Deduplication and Stats Recomputation Completed.");
  console.log("============================================================\n");
}

runDeduplication().catch((err) => {
  console.error("Fatal error during deduplication:", err);
  process.exit(1);
});
