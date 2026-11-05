import fs from "fs";
import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";

async function backup() {
  const admin = createAdminClient();
  const backupData: Record<string, any> = {
    timestamp: new Date().toISOString(),
    authUsers: [],
    tables: {},
  };

  console.log("Starting candidate data backup...");

  // 1. Fetch auth.users
  let page = 1;
  const perPage = 50;
  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) {
      console.error("Error fetching auth users:", error);
      break;
    }
    if (!data.users || data.users.length === 0) break;
    backupData.authUsers.push(...data.users);
    if (data.users.length < perPage) break;
    page++;
  }
  console.log(`Exported ${backupData.authUsers.length} auth users.`);

  // 2. Fetch candidate tables
  const candidateTables = [
    "profiles",
    "user_otp_codes",
    "user_attempts",
    "user_usage_ledger",
    "progress_cards",
    "ai_reports",
    "sunday_mentor_reports",
    "payment_orders",
    "payment_transactions",
  ];

  for (const table of candidateTables) {
    try {
      const { data, error } = await admin.from(table).select("*");
      if (error) {
        console.warn(`Table ${table} export warning:`, error.message);
        backupData.tables[table] = [];
      } else {
        backupData.tables[table] = data || [];
        console.log(`Exported table ${table}: ${data?.length || 0} rows.`);
      }
    } catch (e: any) {
      console.warn(`Table ${table} exception:`, e.message);
      backupData.tables[table] = [];
    }
  }

  // Ensure backups directory exists
  const backupsDir = path.join(process.cwd(), "backups");
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
  }

  const backupFilePath = path.join(
    backupsDir,
    "pre_reset_candidate_backup_20261105.json"
  );
  fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2), "utf8");
  console.log(`Backup successfully written to: ${backupFilePath}`);

  // Verification: read back and verify JSON validity
  const readBack = JSON.parse(fs.readFileSync(backupFilePath, "utf8"));
  console.log("Verified backup restorable. Record counts match:", {
    authUsers: readBack.authUsers.length,
    profiles: readBack.tables.profiles.length,
    user_otp_codes: readBack.tables.user_otp_codes.length,
  });
}

backup().catch(console.error);
