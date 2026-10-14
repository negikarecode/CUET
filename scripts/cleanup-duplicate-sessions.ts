import { createAdminClient } from "../lib/supabase/admin";
import { CUET_UG_2026_CONFIG, calculateExamScore } from "../lib/config/examConfig";

interface UserAttemptRow {
  id: string;
  user_id: string;
  test_id: string;
  question_id: string;
  selected_option: string | null;
  is_correct: boolean | null;
  time_spent_seconds: number;
  created_at: string;
}

interface ReconstructedSession {
  sessionId: string;
  userId: string;
  testId: string;
  createdAt: Date;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  totalMarks: number;
  accuracyPercentage: number;
  rowIds: string[];
}

export async function runCleanup(isDryRun: boolean = true) {
  console.log(`\n======================================================`);
  console.log(`DUPLICATE TEST SESSION CLEANUP (${isDryRun ? "DRY RUN MODE" : "REAL EXECUTION"})`);
  console.log(`======================================================\n`);

  const supabase = createAdminClient();

  const { data: rows, error } = await supabase
    .from("user_attempts")
    .select("id, user_id, test_id, question_id, selected_option, is_correct, time_spent_seconds, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to query user_attempts:", error);
    return;
  }

  if (!rows || rows.length === 0) {
    console.log("No user_attempts rows found in database.");
    return;
  }

  console.log(`Total question attempt rows in database: ${rows.length}`);

  // Group rows by user_id and test_id
  const groups = new Map<string, UserAttemptRow[]>();
  rows.forEach((r) => {
    const key = `${r.user_id}:::${r.test_id}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(r);
  });

  console.log(`Distinct (user, test) pairs: ${groups.size}`);

  const rowIdsToDelete: string[] = [];
  const duplicateSessionsFound: Array<{
    userId: string;
    testId: string;
    earliestDate: string;
    duplicateDate: string;
    score: number;
    accuracy: number;
    rowsCount: number;
  }> = [];

  for (const [key, groupRows] of groups.entries()) {
    const [userId, testId] = key.split(":::");

    // Cluster rows by timestamp: rows submitted within 60s belong to the same session
    const clusters: UserAttemptRow[][] = [];
    let currentCluster: UserAttemptRow[] = [];
    let clusterStartTime = 0;

    groupRows.forEach((row) => {
      const rowTime = new Date(row.created_at).getTime();
      if (currentCluster.length === 0) {
        currentCluster.push(row);
        clusterStartTime = rowTime;
      } else if (Math.abs(rowTime - clusterStartTime) <= 60000) {
        currentCluster.push(row);
      } else {
        clusters.push(currentCluster);
        currentCluster = [row];
        clusterStartTime = rowTime;
      }
    });

    if (currentCluster.length > 0) {
      clusters.push(currentCluster);
    }

    if (clusters.length <= 1) continue;

    // Convert each cluster into a ReconstructedSession
    const sessions: ReconstructedSession[] = clusters.map((cluster, idx) => {
      const attempted = cluster.filter((r) => r.selected_option !== null);
      const correct = cluster.filter((r) => r.is_correct === true);
      const incorrect = attempted.length - correct.length;
      const unattempted = Math.max(0, 50 - attempted.length);

      const { totalMarks } = calculateExamScore(
        correct.length,
        incorrect,
        unattempted,
        CUET_UG_2026_CONFIG,
        50
      );
      const accuracy = attempted.length > 0 ? Math.round((correct.length / attempted.length) * 100) : 0;

      return {
        sessionId: `${key}_cluster_${idx}`,
        userId,
        testId,
        createdAt: new Date(cluster[0].created_at),
        attemptedCount: attempted.length,
        correctCount: correct.length,
        incorrectCount: incorrect,
        unattemptedCount: unattempted,
        totalMarks,
        accuracyPercentage: accuracy,
        rowIds: cluster.map((r) => r.id),
      };
    });

    // Detect duplicate sessions: same user, same test, same score, same accuracy, created within 60s of each other
    for (let i = 0; i < sessions.length; i++) {
      for (let j = i + 1; j < sessions.length; j++) {
        const s1 = sessions[i];
        const s2 = sessions[j];

        const timeDiffSeconds = Math.abs(s2.createdAt.getTime() - s1.createdAt.getTime()) / 1000;

        if (
          s1.totalMarks === s2.totalMarks &&
          s1.accuracyPercentage === s2.accuracyPercentage &&
          timeDiffSeconds <= 60
        ) {
          // Keep earlier (s1), delete duplicate (s2)
          rowIdsToDelete.push(...s2.rowIds);
          duplicateSessionsFound.push({
            userId,
            testId,
            earliestDate: s1.createdAt.toISOString(),
            duplicateDate: s2.createdAt.toISOString(),
            score: s2.totalMarks,
            accuracy: s2.accuracyPercentage,
            rowsCount: s2.rowIds.length,
          });
        }
      }
    }
  }

  console.log(`\nDuplicate sessions detected: ${duplicateSessionsFound.length}`);
  console.log(`Question attempt rows affected: ${rowIdsToDelete.length}\n`);

  if (duplicateSessionsFound.length > 0) {
    duplicateSessionsFound.forEach((d, idx) => {
      console.log(
        `[#${idx + 1}] User: ${d.userId.slice(0, 8)}... | Test: ${d.testId.slice(0, 8)}... | Score: ${d.score} / 250 | Accuracy: ${d.accuracy}% | Kept: ${d.earliestDate} | Duplicate to delete: ${d.duplicateDate} (${d.rowsCount} rows)`
      );
    });
  } else {
    console.log("No duplicate test sessions found in Postgres database.");
    console.log("(Note: Postgres was already protected via prior delete-before-insert. Client storage deduplication handles client-side cache).");
  }

  if (!isDryRun && rowIdsToDelete.length > 0) {
    console.log(`\nExecuting deletion of ${rowIdsToDelete.length} rows...`);
    const { error: delError } = await supabase
      .from("user_attempts")
      .delete()
      .in("id", rowIdsToDelete);

    if (delError) {
      console.error("Deletion failed:", delError);
    } else {
      console.log(`Successfully deleted ${rowIdsToDelete.length} duplicate rows.`);
    }
  }

  return {
    duplicateSessionsCount: duplicateSessionsFound.length,
    rowsAffected: rowIdsToDelete.length,
  };
}

// Auto-run if executed directly via CLI
if (process.argv[1]?.includes("cleanup-duplicate-sessions")) {
  const isDryRun = !process.argv.includes("--real");
  runCleanup(isDryRun)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
