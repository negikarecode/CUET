import fs from "fs";
import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";

export async function executeCandidateReset() {
  const admin = createAdminClient();
  console.log("=================================================");
  console.log("CUET AI-PREP: CANDIDATE DATABASE PURGE & RESET");
  console.log("=================================================");

  // 1. Sanity check: Ensure static question banks and tests exist and are untouched
  const { count: questionsCount } = await admin
    .from("questions")
    .select("id", { count: "exact", head: true });
  const { count: testsCount } = await admin
    .from("tests")
    .select("id", { count: "exact", head: true });

  console.log(`[Static Datasets Safeguard] Questions: ${questionsCount}, Tests: ${testsCount}`);
  if (!questionsCount || questionsCount < 1000 || !testsCount || testsCount < 100) {
    throw new Error("[ABORT]: Question bank count is abnormal. Reset halted for data safety.");
  }

  // 2. Load approved snapshot manifest
  const backupPath = path.resolve(process.cwd(), "backups/pre_reset_candidate_backup_20261105.json");
  if (!fs.existsSync(backupPath)) {
    throw new Error(`[ABORT]: Approved backup snapshot not found at ${backupPath}`);
  }

  const backupData = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
  const approvedSnapshotIds = new Set<string>(backupData.authUsers.map((u: any) => u.id));
  const approvedSnapshotEmails = new Set<string>(backupData.authUsers.map((u: any) => (u.email || "").toLowerCase()));

  console.log(`Loaded approved backup snapshot with ${approvedSnapshotIds.size} approved candidate account(s).`);

  // 3. Fetch current users from auth.users catalog
  let allUsers: any[] = [];
  let page = 1;
  const perPage = 50;
  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) {
      console.error("Error listing users:", error);
      break;
    }
    if (!data.users || data.users.length === 0) break;
    allUsers.push(...data.users);
    if (data.users.length < perPage) break;
    page++;
  }

  // 4. Partition users into Target Deletions vs. Protected / Preserved
  const targetUsers: any[] = [];
  const preservedUsers: any[] = [];

  for (const u of allUsers) {
    const email = (u.email || "").toLowerCase();
    // Protected System Account UUID check
    if (u.id === "00000000-0000-0000-0000-000000000000") {
      preservedUsers.push(u);
      continue;
    }

    // Strictly target ONLY accounts present in the approved backup snapshot.
    // Any account created after the backup or not in the snapshot is strictly preserved.
    if (approvedSnapshotIds.has(u.id)) {
      targetUsers.push(u);
    } else {
      preservedUsers.push(u);
    }
  }

  console.log(`Eligible for purge: ${targetUsers.length} account(s).`);
  console.log(`Protected & Preserved: ${preservedUsers.length} account(s) (outside approved snapshot / system).`);
  for (const p of preservedUsers) {
    console.log(`  -> [IMMUNE]: ${p.id} (${p.email})`);
  }

  if (targetUsers.length === 0) {
    console.log("No snapshot candidate accounts remain to delete. Database is already clean (Idempotent).");
    return;
  }

  const targetIds = targetUsers.map((u) => u.id);
  const targetEmails = targetUsers.map((u) => (u.email || "").toLowerCase()).filter(Boolean);

  // 5. Purge candidate relational tables strictly scoped to target candidate IDs
  const userScopedTables = [
    "user_attempts",
    "user_usage_ledger",
    "progress_cards",
    "ai_reports",
    "sunday_mentor_reports",
    "payment_transactions",
    "payment_orders",
  ];

  for (const t of userScopedTables) {
    try {
      const { error } = await admin
        .from(t)
        .delete()
        .in("user_id", targetIds);
      if (error) {
        console.warn(`Table ${t} delete notice:`, error.message);
      } else {
        console.log(`Purged records in table: ${t} for target candidate IDs`);
      }
    } catch (e: any) {
      console.warn(`Table ${t} exception:`, e.message);
    }
  }

  // Scoped purge of user_otp_codes by target emails
  if (targetEmails.length > 0) {
    try {
      await admin.from("user_otp_codes").delete().in("email", targetEmails);
      console.log("Purged targeted OTP codes.");
    } catch (otpErr: any) {
      console.warn("OTP codes notice:", otpErr.message);
    }
  }

  // Release any promotional slots safely (UPDATE, NEVER DELETE)
  try {
    await admin
      .from("promotional_slots")
      .update({
        user_id: null,
        order_id: null,
        status: "released",
        claimed_at: null,
      })
      .in("user_id", targetIds);
    console.log("Safely unlinked target candidate claims on promotional slots.");
  } catch (slotErr: any) {
    console.warn("Promotional slots notice:", slotErr.message);
  }

  // Purge candidate profiles strictly scoped to target candidate IDs
  const { error: profErr } = await admin
    .from("profiles")
    .delete()
    .in("id", targetIds);
  if (profErr) {
    console.warn("Profiles delete notice:", profErr.message);
  } else {
    console.log("Purged candidate profiles matching target candidate IDs.");
  }

  // 6. Delete accounts from auth.users catalog via Supabase Admin API
  let deletedCount = 0;
  for (const u of targetUsers) {
    const { error: delErr } = await admin.auth.admin.deleteUser(u.id);
    if (delErr) {
      console.error(`Failed to delete user ${u.id} (${u.email}):`, delErr.message);
    } else {
      deletedCount++;
      console.log(`Deleted auth user ${u.id} (${u.email})`);
    }
  }

  // 7. Post-reset verification
  const { count: remProfiles } = await admin
    .from("profiles")
    .select("id", { count: "exact", head: true });
  const { count: remOtps } = await admin
    .from("user_otp_codes")
    .select("id", { count: "exact", head: true });
  const { count: remAttempts } = await admin
    .from("user_attempts")
    .select("id", { count: "exact", head: true });
  const { count: finalQuestions } = await admin
    .from("questions")
    .select("id", { count: "exact", head: true });
  const { count: finalTests } = await admin
    .from("tests")
    .select("id", { count: "exact", head: true });
  const { data: remUsers } = await admin.auth.admin.listUsers({ page: 1, perPage: 10 });

  console.log("\n--- Post-Purge Verification ---");
  console.log(`Remaining auth.users: ${remUsers?.users?.length || 0}`);
  console.log(`Remaining profiles: ${remProfiles || 0}`);
  console.log(`Remaining user_otp_codes: ${remOtps || 0}`);
  console.log(`Remaining user_attempts: ${remAttempts || 0}`);
  console.log(`Preserved Questions: ${finalQuestions || 0} (Protected)`);
  console.log(`Preserved Tests: ${finalTests || 0} (Protected)`);
  console.log("=================================================");
  console.log(`Reset completed successfully. Total deleted: ${deletedCount}.`);
}

if (process.argv.includes("--confirm")) {
  executeCandidateReset().catch(console.error);
} else {
  console.log("Dry run: To execute reset, pass --confirm flag.");
}
