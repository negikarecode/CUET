import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import {
  resolveCollege,
  resolveProgram,
  isValidPair,
  getProgramsForCollege,
} from "../lib/college-offerings";

interface UserProfileRow {
  id: string;
  full_name: string;
  target_stream?: string;
  target_college?: string;
  target_university?: string;
  target_course?: string;
}

export async function dryRunUserTargets() {
  console.log("=================================================================");
  console.log("    DRY-RUN AUDIT: EXISTING USERS WITH INVALID SAVED TARGETS    ");
  console.log("=================================================================\n");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  let profiles: UserProfileRow[] = [];

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, target_stream, target_college, target_university");

    if (error) {
      console.error("Supabase query error:", error.message);
    } else {
      profiles = (data as UserProfileRow[]) || [];
    }
  } else {
    console.log("No Supabase credentials detected in environment; auditing seeded user records.");
  }

  // Also include mock user targets present in dashboard mock data / store
  const mockUsers: UserProfileRow[] = [
    {
      id: "guest-default",
      full_name: "Guest Aspirant (Default Store User)",
      target_stream: "science",
      target_college: "Hindu College",
      target_course: "B.Sc. (Hons.) Physics",
    },
    {
      id: "mock-commerce-stephens",
      full_name: "Commerce Student targeting Stephen's",
      target_stream: "commerce",
      target_college: "St. Stephen's College",
      target_course: "B.Com (Hons)",
    },
    {
      id: "mock-humanities-srcc",
      full_name: "Humanities Student targeting SRCC",
      target_stream: "humanities",
      target_college: "Shri Ram College of Commerce (SRCC)",
      target_course: "B.A. (Hons.) Political Science",
    },
  ];

  console.log(`Auditing ${profiles.length} Supabase production profiles + ${mockUsers.length} test user scenarios...\n`);

  const allAudited = [
    ...profiles.map((p) => ({ ...p, source: "Supabase profiles table" })),
    ...mockUsers.map((m) => ({ ...m, source: "Test scenario" })),
  ];

  let totalAudited = 0;
  let validCount = 0;
  let invalidCount = 0;
  const invalidUsers: Array<{
    id: string;
    name: string;
    source: string;
    college: string;
    course: string;
    stream: string;
    reason: string;
    validOfferedCourses: string[];
  }> = [];

  for (const u of allAudited) {
    totalAudited += 1;
    const rawCollege = (u.target_college || "").trim();
    const stream = (u.target_stream || "science").toLowerCase();

    // Reconstruct course using useTarget's fallback logic if not explicitly saved
    const fallbackCourse =
      stream === "commerce"
        ? "B.Com. (Hons.)"
        : stream === "humanities"
        ? "B.A. (Hons.) Political Science"
        : "B.Sc. (Hons.) Physics";

    const rawCourse = (u.target_course || fallbackCourse).trim();

    const colObj = resolveCollege(rawCollege);
    const progObj = resolveProgram(rawCourse);

    const valid = isValidPair(rawCollege, rawCourse);

    if (valid) {
      validCount += 1;
    } else {
      invalidCount += 1;
      let reason = "";
      if (!colObj) {
        reason = `Unknown or unverified college "${rawCollege}"`;
      } else if (!progObj) {
        reason = `Unknown or unverified course "${rawCourse}"`;
      } else {
        reason = `${colObj.name} does not offer ${progObj.name} (Stream: ${u.target_stream})`;
      }

      const offered = colObj ? getProgramsForCollege(colObj.id).map((p) => p.name) : [];

      invalidUsers.push({
        id: u.id,
        name: u.full_name,
        source: u.source,
        college: colObj ? colObj.name : rawCollege,
        course: progObj ? progObj.name : rawCourse,
        stream: u.target_stream || "Science",
        reason,
        validOfferedCourses: offered,
      });
    }
  }

  console.log("--- AUDIT RESULTS ---");
  console.log(`Total Profiles Audited: ${totalAudited}`);
  console.log(`Valid Target Pairs:     ${validCount}`);
  console.log(`Invalid Target Pairs:   ${invalidCount} (Marked "needs review")\n`);

  if (invalidUsers.length > 0) {
    console.log("Details of Affected Users:");
    invalidUsers.forEach((iu, idx) => {
      console.log(`[${idx + 1}] User: ${iu.name} (ID: ${iu.id}) [${iu.source}]`);
      console.log(`    Saved Target: ${iu.course} at ${iu.college} (Stream: ${iu.stream})`);
      console.log(`    Issue:        ${iu.reason}`);
      if (iu.validOfferedCourses.length > 0) {
        console.log(`    Valid Courses actually offered at ${iu.college}:`);
        console.log(`      ${iu.validOfferedCourses.slice(0, 6).join(", ")}${iu.validOfferedCourses.length > 6 ? ` (+${iu.validOfferedCourses.length - 6} more)` : ""}`);
      }
      console.log();
    });
  }

  console.log("=================================================================");
  console.log("Action Plan for Affected Users:");
  console.log("1. Targets are NOT modified silently.");
  console.log("2. Users are flagged with targetReviewNeeded: true.");
  console.log("3. Dismissible banner displays on Dashboard and Profile:");
  console.log('   "Your saved target (X at Y) isn\'t a valid combination. Update your goal"');
  console.log("4. Clicking the banner action opens Edit Goals modal with college preserved and course cleared.");
  console.log('5. Cutoff projection is shown as "unverified" until user selects a valid course.');
  console.log("=================================================================");

  return {
    totalAudited,
    validCount,
    invalidCount,
    invalidUsers,
  };
}

if (require.main === module) {
  dryRunUserTargets().catch(console.error);
}
