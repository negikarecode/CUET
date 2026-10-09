/**
 * scripts/reconcile-attempts.ts
 *
 * Dev / Admin utility for Canonical Question Attempt Reconciliation (Requirement 8).
 *
 * Invariant:
 * 1 Real Question Attempt = 1 Canonical Attempt Everywhere
 * TOTAL QUALIFYING ATTEMPTS = COUNT(UNIQUE VALID QUESTION ATTEMPT RECORDS)
 *
 * Actions:
 * 1. Loads all question attempts from public.user_attempts for a user (or all users).
 * 2. Generates canonical attempt IDs: `${test_id}:::${question_id || id}`.
 * 3. Identifies and reports exact duplicates.
 * 4. Quarantines/deletes duplicates, keeping exactly one canonical record per question attempt.
 * 5. Reconciles user profiles (total_questions_attempted) against the canonical database count.
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase configuration (.env.local)");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface UserAttemptRow {
  id: string;
  user_id: string;
  test_id: string;
  question_id: string;
  selected_option: string | null;
  is_correct: boolean | string | number | null;
  time_spent_seconds: number | null;
  created_at: string;
}

export async function reconcileUserAttempts(targetUserId?: string, dryRun: boolean = false) {
  console.log(`\n==================================================`);
  console.log(`CANONICAL QUESTION ATTEMPT RECONCILIATION AUDIT`);
  console.log(`Target User: ${targetUserId || "ALL USERS"}`);
  console.log(`Dry Run Mode: ${dryRun ? "YES (No deletions)" : "NO (Live reconciliation)"}`);
  console.log(`==================================================\n`);

  let query = supabase.from("user_attempts").select("*").order("created_at", { ascending: true });
  if (targetUserId) {
    query = query.eq("user_id", targetUserId);
  }

  const { data: rows, error } = await query;
  if (error) {
    console.error("Error querying user_attempts:", error);
    return;
  }

  const attempts = (rows || []) as UserAttemptRow[];
  console.log(`Total raw user_attempts rows fetched: ${attempts.length}`);

  // Group by user_id
  const byUser = new Map<string, UserAttemptRow[]>();
  for (const row of attempts) {
    const uList = byUser.get(row.user_id) || [];
    uList.push(row);
    byUser.set(row.user_id, uList);
  }

  let totalDuplicatesDetected = 0;
  let totalDuplicatesRemoved = 0;

  for (const [userId, userRows] of byUser.entries()) {
    console.log(`\n--------------------------------------------------`);
    console.log(`Processing User ID: ${userId}`);
    console.log(`Raw DB records: ${userRows.length}`);

    // Group by canonical attempt key: `${test_id}:::${question_id}`
    const canonicalGroups = new Map<string, UserAttemptRow[]>();
    for (const r of userRows) {
      if (r.selected_option === null || r.selected_option === undefined) {
        continue; // Unanswered
      }
      const canonicalKey = `${r.test_id || "default"}:::${r.question_id || r.id}`;
      const group = canonicalGroups.get(canonicalKey) || [];
      group.push(r);
      canonicalGroups.set(canonicalKey, group);
    }

    const uniqueCount = canonicalGroups.size;
    console.log(`Unique Canonical Qualifying Attempts: ${uniqueCount}`);

    const duplicatesToDelete: string[] = [];
    const duplicateReport: any[] = [];

    for (const [canonicalKey, group] of canonicalGroups.entries()) {
      if (group.length > 1) {
        totalDuplicatesDetected += group.length - 1;
        // Keep the first (earliest created_at), remove the rest
        const canonicalRecord = group[0];
        if (!canonicalRecord) continue;
        const extraRecords = group.slice(1);

        duplicateReport.push({
          canonicalKey,
          testId: canonicalRecord.test_id,
          questionId: canonicalRecord.question_id,
          canonicalRecordId: canonicalRecord.id,
          canonicalCreatedAt: canonicalRecord.created_at,
          duplicateCount: extraRecords.length,
          duplicateRecordIds: extraRecords.map((e) => e.id),
          duplicateTimestamps: extraRecords.map((e) => e.created_at),
        });

        for (const extra of extraRecords) {
          duplicatesToDelete.push(extra.id);
        }
      }
    }

    if (duplicateReport.length > 0) {
      console.log(`\n⚠️  DUPLICATES DETECTED: ${duplicateReport.length} question(s) duplicated!`);
      console.log(JSON.stringify(duplicateReport, null, 2));

      if (!dryRun) {
        console.log(`Removing ${duplicatesToDelete.length} duplicate record(s) from public.user_attempts...`);
        const { error: delError } = await supabase
          .from("user_attempts")
          .delete()
          .in("id", duplicatesToDelete);

        if (delError) {
          console.error("Failed to delete duplicate records:", delError);
        } else {
          totalDuplicatesRemoved += duplicatesToDelete.length;
          console.log(`✅ Successfully removed ${duplicatesToDelete.length} duplicate rows.`);
        }
      }
    } else {
      console.log(`✅ Zero duplicates found for user ${userId}. All attempts are canonical.`);
    }

    // Reconcile user profile total_questions_attempted
    if (!dryRun) {
      console.log(`Synchronizing profiles.total_questions_attempted to ${uniqueCount}...`);
      const { error: profError } = await supabase
        .from("profiles")
        .update({ total_questions_attempted: uniqueCount })
        .eq("id", userId);

      if (profError) {
        console.warn(`Could not update profiles table for user ${userId}:`, profError.message);
      } else {
        console.log(`✅ Profile synchronized to exact canonical count: ${uniqueCount}`);
      }
    }
  }

  console.log(`\n==================================================`);
  console.log(`AUDIT & RECONCILIATION SUMMARY:`);
  console.log(`Total Users Processed: ${byUser.size}`);
  console.log(`Total Duplicates Found: ${totalDuplicatesDetected}`);
  console.log(`Total Duplicates Removed: ${totalDuplicatesRemoved}`);
  console.log(`==================================================\n`);
}

async function main() {
  const args = process.argv.slice(2);
  const targetUserId = args[0] && !args[0].startsWith("--") ? args[0] : undefined;
  const isDryRun = args.includes("--dry-run");

  await reconcileUserAttempts(targetUserId, isDryRun);
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Reconciliation error:", err);
    process.exit(1);
  });
}
