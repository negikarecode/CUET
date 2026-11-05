import fs from "fs";
import path from "path";
import { config } from "dotenv";

// Ensure local env is loaded
config({ path: path.resolve(process.cwd(), ".env.local") });

import { createAdminClient } from "../lib/supabase/admin";

async function main() {
  console.log("=== CAPTURING PRODUCTION INCIDENT BASELINE ===");
  const admin = createAdminClient();

  // 1. Fetch auth.users
  const authUsers: any[] = [];
  let page = 1;
  const perPage = 50;
  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) {
      console.error("Error fetching auth users:", error);
      break;
    }
    if (!data.users || data.users.length === 0) break;
    authUsers.push(...data.users);
    if (data.users.length < perPage) break;
    page++;
  }

  console.log(`Auth Users Count: ${authUsers.length}`);
  authUsers.forEach((u) => {
    console.log(` - ID: ${u.id} | Email: ${u.email} | Confirmed: ${Boolean(u.email_confirmed_at)} | Created: ${u.created_at}`);
  });

  // 2. Fetch all candidate tables
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
    "promotional_slots",
  ];

  const tableData: Record<string, any[]> = {};

  for (const table of candidateTables) {
    try {
      const { data, error, count } = await admin
        .from(table)
        .select("*", { count: "exact" });
      if (error) {
        console.warn(`Table ${table} error: ${error.message}`);
        tableData[table] = [];
      } else {
        tableData[table] = data || [];
        console.log(`Table ${table}: ${data?.length || 0} rows (count: ${count})`);
      }
    } catch (err: any) {
      console.warn(`Table ${table} exception: ${err.message}`);
      tableData[table] = [];
    }
  }

  // 3. Question bank & Tests counts
  const { count: questionsCount } = await admin
    .from("questions")
    .select("*", { count: "exact", head: true });

  const { count: testsCount } = await admin
    .from("tests")
    .select("*", { count: "exact", head: true });

  console.log(`Questions Count: ${questionsCount}`);
  console.log(`Tests Count: ${testsCount}`);

  // 4. Save to backups
  const backupsDir = path.join(process.cwd(), "backups");
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
  }

  const backupPath = path.join(
    backupsDir,
    "incident_baseline_backup_20261105.json"
  );

  const baselinePayload = {
    capturedAt: new Date().toISOString(),
    gitCommit: "1420dfd6",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    counts: {
      authUsers: authUsers.length,
      questions: questionsCount,
      tests: testsCount,
      ...Object.fromEntries(Object.entries(tableData).map(([k, v]) => [k, v.length])),
    },
    authUsers: authUsers.map((u) => ({
      id: u.id,
      email: u.email,
      email_confirmed_at: u.email_confirmed_at,
      created_at: u.created_at,
      user_metadata: u.user_metadata,
    })),
    tables: tableData,
  };

  fs.writeFileSync(backupPath, JSON.stringify(baselinePayload, null, 2), "utf8");
  console.log(`\nBaseline successfully backed up to: ${backupPath}`);
}

main().catch((err) => {
  console.error("Fatal in capture-incident-baseline:", err);
  process.exit(1);
});
