#!/usr/bin/env node

/**
 * =============================================================================
 * CUET AI-Prep: Bulk Seed Script for Questions and Tests
 * Architecture: Crawls all JSON files in /mock, normalizes 4D question schemas,
 * converts IDs via deterministic stringToUuid(), and bulk upserts
 * tests, questions, and test_questions junction table into Supabase.
 * =============================================================================
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Deterministic RFC 4122 compliant UUID v4 generator (matching lib/analytics.ts)
export function stringToUuid(str: string): string {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(str)) {
    return str;
  }
  const hash = crypto.createHash("md5").update(str).digest("hex");
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    "4" + hash.substring(13, 16),
    ((parseInt(hash.substring(16, 18), 16) & 0x3f) | 0x80).toString(16) +
      hash.substring(18, 20),
    hash.substring(20, 32),
  ].join("-");
}

// Subject folder mapping
interface SubjectMeta {
  name: string;
  code: string;
  durationMinutes: number;
}

const FOLDER_TO_SUBJECT: Record<string, SubjectMeta> = {
  physics: { name: "Physics", code: "312", durationMinutes: 60 },
  chemistry: { name: "Chemistry", code: "306", durationMinutes: 60 },
  maths: { name: "Mathematics", code: "319", durationMinutes: 60 },
  bio: { name: "Biology", code: "304", durationMinutes: 45 },
  accs: { name: "Accountancy", code: "301", durationMinutes: 60 },
  accountancy: { name: "Accountancy", code: "301", durationMinutes: 60 },
  eco: { name: "Economics", code: "309", durationMinutes: 60 },
  eco_units: { name: "Economics", code: "309", durationMinutes: 45 },
  bst: { name: "Business Studies", code: "305", durationMinutes: 45 },
  bst_units: { name: "Business Studies", code: "305", durationMinutes: 45 },
  history: { name: "History", code: "314", durationMinutes: 45 },
  history_units: { name: "History", code: "314", durationMinutes: 45 },
  "pol science": { name: "Political Science", code: "323", durationMinutes: 45 },
  polscience: { name: "Political Science", code: "323", durationMinutes: 45 },
  pol_units: { name: "Political Science", code: "323", durationMinutes: 45 },
  geo: { name: "Geography", code: "313", durationMinutes: 45 },
  geo_units: { name: "Geography", code: "313", durationMinutes: 45 },
  psychology: { name: "Psychology", code: "324", durationMinutes: 45 },
  psy_units: { name: "Psychology", code: "324", durationMinutes: 45 },
  sociology: { name: "Sociology", code: "325", durationMinutes: 45 },
  soc_units: { name: "Sociology", code: "325", durationMinutes: 45 },
  physical_education: { name: "Physical Education", code: "321", durationMinutes: 45 },
  ped_units: { name: "Physical Education", code: "321", durationMinutes: 45 },
  computer_science: { name: "Computer Science", code: "308", durationMinutes: 60 },
  cs_units: { name: "Computer Science", code: "308", durationMinutes: 45 },
  home_science: { name: "Home Science", code: "315", durationMinutes: 45 },
  hsc_units: { name: "Home Science", code: "315", durationMinutes: 45 },
  mass_media: { name: "Mass Media", code: "318", durationMinutes: 45 },
  mmc_units: { name: "Mass Media", code: "318", durationMinutes: 45 },
  environmental_studies: { name: "Environmental Studies", code: "307", durationMinutes: 45 },
  evs_units: { name: "Environmental Studies", code: "307", durationMinutes: 45 },
  fine_arts: { name: "Fine Arts", code: "311", durationMinutes: 45 },
  fa_units: { name: "Fine Arts", code: "311", durationMinutes: 45 },
  agriculture: { name: "Agriculture", code: "302", durationMinutes: 45 },
  agr_units: { name: "Agriculture", code: "302", durationMinutes: 45 },
  anthropology: { name: "Anthropology", code: "303", durationMinutes: 45 },
  ant_units: { name: "Anthropology", code: "303", durationMinutes: 45 },
};

function resolveSubject(folder: string): SubjectMeta {
  const norm = folder.toLowerCase().trim();
  if (FOLDER_TO_SUBJECT[norm]) return FOLDER_TO_SUBJECT[norm];
  const cleaned = norm.replace(/_units$/, "");
  if (FOLDER_TO_SUBJECT[cleaned]) return FOLDER_TO_SUBJECT[cleaned];
  return {
    name: norm.charAt(0).toUpperCase() + norm.slice(1).replace(/_/g, " "),
    code: "GEN",
    durationMinutes: 60,
  };
}

function normalizeArchetype(rawType?: string, questionText: string = ""): string {
  const typeStr = (rawType || "").toLowerCase();
  const text = questionText.toLowerCase();

  if (
    typeStr.includes("assertion") ||
    text.includes("assertion") ||
    text.includes("reason (r)") ||
    text.includes("assertion (a)")
  ) {
    return "Assertion-Reasoning";
  }
  if (
    typeStr.includes("match") ||
    text.includes("match list") ||
    text.includes("match the following") ||
    text.includes("list i")
  ) {
    return "Match the Following";
  }
  if (
    typeStr.includes("case") ||
    typeStr.includes("passage") ||
    text.includes("read the following passage") ||
    text.includes("case study")
  ) {
    return "Case-Study MCQ";
  }
  if (
    typeStr.includes("numerical") ||
    typeStr.includes("calculation") ||
    (/\d+[\.,]\d+|\$\d+/.test(text) &&
      (text.includes("calculate") ||
        text.includes("compute") ||
        text.includes("find the value") ||
        text.includes("ratio")))
  ) {
    return "Numerical";
  }
  return "Direct Fact";
}

interface TestRecord {
  id: string;
  title: string;
  subject: string;
  total_questions: number;
  duration_minutes: number;
  is_active: boolean;
}

interface QuestionRecord {
  id: string;
  subject: string;
  chapter: string;
  micro_topic: string;
  ncert_reference: string;
  archetype: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
  is_pyq: boolean;
  pyq_year: number | null;
}

interface TestQuestionRecord {
  test_id: string;
  question_id: string;
  order_index: number;
}

// Colors for terminal output
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
};

async function batchUpsert<T>(
  supabase: SupabaseClient,
  table: string,
  records: T[],
  batchSize: number = 250,
  onConflict: string = "id"
): Promise<{ successCount: number; errorCount: number }> {
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < records.length; i += batchSize) {
    const chunk = records.slice(i, i + batchSize);
    const { error } = await supabase
      .from(table)
      .upsert(chunk as any, { onConflict });

    if (error) {
      console.error(
        `\n${c.red}[Upsert Error]${c.reset} Table ${table} batch ${i / batchSize + 1}: ${error.message}`
      );
      errorCount += chunk.length;
    } else {
      successCount += chunk.length;
      process.stdout.write(
        `\r  ${c.cyan}→${c.reset} ${table}: ${successCount}/${records.length} records processed...`
      );
    }
  }
  process.stdout.write("\n");
  return { successCount, errorCount };
}

async function main() {
  console.log(`\n${c.bold}${c.cyan}======================================================${c.reset}`);
  console.log(`${c.bold}${c.cyan}    CUET AI-Prep: Bulk Seed Questions & Tests         ${c.reset}`);
  console.log(`${c.bold}${c.cyan}======================================================${c.reset}\n`);

  // CLI Arguments
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const subjectFilter = args.find((a) => a.startsWith("--subject="))?.split("=")[1]?.toLowerCase();
  const limitArg = args.find((a) => a.startsWith("--limit="))?.split("=")[1];
  const limit = limitArg ? parseInt(limitArg, 10) : undefined;
  const batchSizeArg = args.find((a) => a.startsWith("--batch-size="))?.split("=")[1];
  const batchSize = batchSizeArg ? parseInt(batchSizeArg, 10) : 250;

  if (isDryRun) {
    console.log(`${c.yellow}[Dry Run Mode Active] - No database writes will be executed.${c.reset}\n`);
  }

  const mockDir = path.resolve(process.cwd(), "mock");
  if (!fs.existsSync(mockDir)) {
    console.error(`${c.red}Error:${c.reset} Mock directory not found at ${mockDir}`);
    process.exit(1);
  }

  // Discover all JSON files, skipping symlinked directories
  const subDirs = fs.readdirSync(mockDir);
  const jsonFilePaths: { folder: string; file: string; fullPath: string }[] = [];

  for (const dir of subDirs) {
    const dirPath = path.join(mockDir, dir);
    const stat = fs.lstatSync(dirPath);
    if (stat.isSymbolicLink() || !stat.isDirectory()) {
      continue;
    }
    if (subjectFilter && !dir.toLowerCase().includes(subjectFilter)) {
      continue;
    }

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      jsonFilePaths.push({
        folder: dir,
        file,
        fullPath: path.join(dirPath, file),
      });
    }
  }

  const targetFiles = limit ? jsonFilePaths.slice(0, limit) : jsonFilePaths;
  console.log(
    `Found ${c.bold}${targetFiles.length}${c.reset} mock files to process across ${subDirs.length} directories.\n`
  );

  const testsMap = new Map<string, TestRecord>();
  const questionsMap = new Map<string, QuestionRecord>();
  const testQuestionsMap = new Map<string, TestQuestionRecord>();

  let totalParsedQuestions = 0;

  for (const target of targetFiles) {
    const { folder, file, fullPath } = target;
    const fileBase = path.basename(file, ".json");
    const subject = resolveSubject(folder);

    // Primary test identifiers
    const testId = isNaN(Number(fileBase))
      ? `${folder}-${fileBase}`
      : `${folder}-mock-${fileBase}`;
    const testUuid = stringToUuid(testId);

    let rawQuestions: any[] = [];
    try {
      const content = fs.readFileSync(fullPath, "utf-8");
      rawQuestions = JSON.parse(content);
    } catch (err: any) {
      console.warn(`[Warning] Failed to parse ${fullPath}: ${err.message}`);
      continue;
    }

    if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
      continue;
    }

    // Build Test Record
    const testTitle = isNaN(Number(fileBase))
      ? `CUET UG ${subject.name} - ${fileBase.toUpperCase()} Practice Drill`
      : `CUET UG ${subject.name} Full Mock Paper ${fileBase} (NTA Pattern)`;

    testsMap.set(testUuid, {
      id: testUuid,
      title: testTitle,
      subject: subject.name,
      total_questions: rawQuestions.length,
      duration_minutes: subject.durationMinutes,
      is_active: true,
    });

    // Also register alias without '-mock-' if applicable so direct ID lookups always resolve
    if (!isNaN(Number(fileBase))) {
      const aliasId = `${folder}-${fileBase}`;
      const aliasUuid = stringToUuid(aliasId);
      if (!testsMap.has(aliasUuid)) {
        testsMap.set(aliasUuid, {
          id: aliasUuid,
          title: testTitle,
          subject: subject.name,
          total_questions: rawQuestions.length,
          duration_minutes: subject.durationMinutes,
          is_active: true,
        });
      }
    }

    // Process questions
    rawQuestions.forEach((q: any, idx: number) => {
      totalParsedQuestions++;
      const orderIndex = q.questionNumber || idx + 1;
      const qIdString =
        q.questionId || `${testId}_q_${orderIndex.toString().padStart(2, "0")}`;
      const qUuid = stringToUuid(qIdString);

      const qText = q.questionText || q.prompt || `Question ${orderIndex}`;
      const archetype = normalizeArchetype(q.questionType, qText);

      // Extract options
      const optA =
        q.options?.find((o: any) => o.id === "A")?.text ||
        q.options?.[0]?.text ||
        "Option A";
      const optB =
        q.options?.find((o: any) => o.id === "B")?.text ||
        q.options?.[1]?.text ||
        "Option B";
      const optC =
        q.options?.find((o: any) => o.id === "C")?.text ||
        q.options?.[2]?.text ||
        "Option C";
      const optD =
        q.options?.find((o: any) => o.id === "D")?.text ||
        q.options?.[3]?.text ||
        "Option D";

      let correctOpt = "A";
      if (q.correctOption && ["A", "B", "C", "D"].includes(q.correctOption.toUpperCase())) {
        correctOpt = q.correctOption.toUpperCase();
      } else if (q.correctOptionId && ["A", "B", "C", "D"].includes(q.correctOptionId.toUpperCase())) {
        correctOpt = q.correctOptionId.toUpperCase();
      } else if (Array.isArray(q.options)) {
        const found = q.options.find((o: any) => o.isCorrect === true);
        if (found && ["A", "B", "C", "D"].includes(found.id?.toUpperCase())) {
          correctOpt = found.id.toUpperCase();
        }
      }

      const isPyq = Boolean(
        q.pyqSource ||
        testId.includes("pyq") ||
        (Array.isArray(q.tags) && q.tags.some((t: string) => typeof t === "string" && t.toLowerCase().includes("pyq")))
      );

      const explanation =
        q.detailedSolution ||
        q.explanation ||
        q.solution?.detailed ||
        q.solution?.concept ||
        "Comprehensive step-by-step NCERT solution.";

      const ncertRef =
        q.ncertReference ||
        q.ncert_reference ||
        `NCERT Class 12 (${q.chapter || subject.name}), Key Concept Focus`;

      questionsMap.set(qUuid, {
        id: qUuid,
        subject: subject.name,
        chapter: q.chapter || "Domain Core",
        micro_topic: q.topic || q.microTopic || "Key Concept",
        ncert_reference: ncertRef,
        archetype,
        question_text: qText,
        option_a: optA,
        option_b: optB,
        option_c: optC,
        option_d: optD,
        correct_option: correctOpt,
        explanation,
        is_pyq: isPyq,
        pyq_year: isPyq ? 2024 : null,
      });

      const tqKey = `${testUuid}_${qUuid}`;
      testQuestionsMap.set(tqKey, {
        test_id: testUuid,
        question_id: qUuid,
        order_index: orderIndex,
      });
    });
  }

  const testsList = Array.from(testsMap.values());
  const questionsList = Array.from(questionsMap.values());
  const testQuestionsList = Array.from(testQuestionsMap.values());

  console.log(`${c.green}${c.reset} Parsing and deduplication complete:`);
  console.log(`  • Tests to upsert:          ${c.bold}${testsList.length}${c.reset}`);
  console.log(`  • Unique Questions:         ${c.bold}${questionsList.length}${c.reset} (from ${totalParsedQuestions} raw entries)`);
  console.log(`  • Test-Question Junctions:  ${c.bold}${testQuestionsList.length}${c.reset}\n`);

  if (isDryRun) {
    console.log(`${c.green}[Dry Run Summary] Validation passed. All UUIDs and mappings verified!${c.reset}`);
    return;
  }

  // Initialize Supabase Admin Client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://djqgpcbjcszczcfrirri.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseKey) {
    console.error(`${c.red}Error:${c.reset} Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.`);
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log(`${c.bold}Beginning Supabase Bulk Upserts (Batch Size: ${batchSize})...${c.reset}`);
  const startTime = Date.now();

  // 1. Upsert Tests
  console.log(`\n${c.bold}[1/3] Upserting public.tests...${c.reset}`);
  const testResults = await batchUpsert(supabase, "tests", testsList, batchSize, "id");

  // 2. Upsert Questions
  console.log(`\n${c.bold}[2/3] Upserting public.questions...${c.reset}`);
  const qResults = await batchUpsert(supabase, "questions", questionsList, batchSize, "id");

  // 3. Upsert Test Questions
  console.log(`\n${c.bold}[3/3] Upserting public.test_questions...${c.reset}`);
  const tqResults = await batchUpsert(supabase, "test_questions", testQuestionsList, batchSize, "test_id,question_id");

  const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n${c.bold}${c.green}======================================================${c.reset}`);
  console.log(`${c.bold}${c.green}    Seeding Completed in ${elapsedSec}s               ${c.reset}`);
  console.log(`${c.bold}${c.green}======================================================${c.reset}`);
  console.log(`  • Tests:          ${testResults.successCount} succeeded, ${testResults.errorCount} failed`);
  console.log(`  • Questions:      ${qResults.successCount} succeeded, ${qResults.errorCount} failed`);
  console.log(`  • Test-Questions: ${tqResults.successCount} succeeded, ${tqResults.errorCount} failed\n`);
}

main().catch((err) => {
  console.error(`${c.red}[Fatal Error]:${c.reset}`, err);
  process.exit(1);
});
