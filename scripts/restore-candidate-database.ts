import fs from "fs";
import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";

export async function executeCandidateRestore() {
  const admin = createAdminClient();
  console.log("=================================================");
  console.log("CUET AI-PREP: CANDIDATE DATABASE RESTORE UTILITY");
  console.log("=================================================");

  const backupPath = path.resolve(process.cwd(), "backups/pre_reset_candidate_backup_20261105.json");
  if (!fs.existsSync(backupPath)) {
    throw new Error(`[ABORT]: Backup archive not found at ${backupPath}`);
  }

  const backupData = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
  console.log(`Loaded backup timestamp: ${backupData.timestamp}`);
  console.log(`Candidate accounts to restore: ${backupData.authUsers.length}`);

  // 1. Restore auth.users
  let restoredAuth = 0;
  for (const u of backupData.authUsers) {
    try {
      const { data, error } = await admin.auth.admin.createUser({
        id: u.id,
        email: u.email,
        email_confirm: true,
        user_metadata: u.user_metadata || {},
        app_metadata: u.app_metadata || {},
      });

      if (error && !error.message.includes("already registered")) {
        console.warn(`User restore note (${u.email}):`, error.message);
      } else {
        restoredAuth++;
        console.log(`Restored auth user: ${u.id} (${u.email})`);
      }
    } catch (e: any) {
      console.warn(`Exception restoring auth user ${u.email}:`, e.message);
    }
  }

  // 2. Restore public.profiles
  let restoredProfiles = 0;
  for (const p of backupData.tables.profiles || []) {
    try {
      const { error } = await admin.from("profiles").upsert(p, { onConflict: "id" });
      if (error) {
        console.warn(`Profile restore note (${p.id}):`, error.message);
      } else {
        restoredProfiles++;
        console.log(`Restored profile: ${p.id} (${p.full_name})`);
      }
    } catch (e: any) {
      console.warn(`Exception restoring profile ${p.id}:`, e.message);
    }
  }

  // 3. Restore public.user_otp_codes
  for (const otp of backupData.tables.user_otp_codes || []) {
    try {
      await admin.from("user_otp_codes").upsert(otp, { onConflict: "id" });
    } catch {}
  }

  // 4. Verification
  const { count: finalUsers } = await admin.from("profiles").select("id", { count: "exact", head: true });
  console.log("=================================================");
  console.log(`Restoration complete. Verified profiles in DB: ${finalUsers}`);
  console.log("=================================================");
}

if (process.argv.includes("--confirm")) {
  executeCandidateRestore().catch(console.error);
} else {
  console.log("Dry run: To execute restoration, pass --confirm flag.");
}
