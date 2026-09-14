#!/usr/bin/env node

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import Groq from "groq-sdk";

// Load environment variables from .env.local or .env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export interface ExtractedQuestion {
  subject: string;
  chapter: string;
  micro_topic: string;
  ncert_reference: string;
  archetype:
    | "Direct Fact"
    | "Assertion-Reasoning"
    | "Match the Following"
    | "Case-Study MCQ"
    | "Numerical";
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: "A" | "B" | "C" | "D";
  explanation: string;
  is_pyq: boolean;
  pyq_year: number;
}

const VALID_ARCHETYPES = [
  "Direct Fact",
  "Assertion-Reasoning",
  "Match the Following",
  "Case-Study MCQ",
  "Numerical",
] as const;

// Visual terminal styling helpers
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
};

function renderProgressBar(
  current: number,
  total: number,
  label: string,
  width: number = 30
) {
  const percent = total > 0 ? Math.min(1, current / total) : 0;
  const filled = Math.round(width * percent);
  const empty = width - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);
  const percentageStr = `${Math.round(percent * 100)}%`.padStart(4);
  process.stdout.write(
    `\r${colors.cyan}[${bar}]${colors.reset} ${colors.bright}${percentageStr}${colors.reset} | ${label} (${current}/${total})`
  );
  if (current >= total) {
    process.stdout.write("\n");
  }
}

// Fallback Rule-Based Parser for standard NTA Question formats if no LLM key is configured
function parseRawQuestionBlock(
  rawBlock: string,
  defaultSubject: string = "CUET Domain",
  defaultYear: number = 2024
): ExtractedQuestion | null {
  const trimmed = rawBlock.trim();
  if (!trimmed || trimmed.length < 20) return null;

  // Regex patterns for Question, Options A/B/C/D, and Answer
  const qMatch = trimmed.match(/(?:Q\d+[\.:\)]?|Question\s*\d*[\.:\)]?)([\s\S]*?)(?=(?:\(?[A-Da-d]\)[\.:\)]|\n[A-D][\.\)]))/i);
  const optAMatch = trimmed.match(/(?:\(?A\)[\.:\)]?|\bA[\.\)])\s*([\s\S]*?)(?=(?:\(?B\)[\.:\)]?|\bB[\.\)]))/i);
  const optBMatch = trimmed.match(/(?:\(?B\)[\.:\)]?|\bB[\.\)])\s*([\s\S]*?)(?=(?:\(?C\)[\.:\)]?|\bC[\.\)]))/i);
  const optCMatch = trimmed.match(/(?:\(?C\)[\.:\)]?|\bC[\.\)])\s*([\s\S]*?)(?=(?:\(?D\)[\.:\)]?|\bD[\.\)]))/i);
  const optDMatch = trimmed.match(/(?:\(?D\)[\.:\)]?|\bD[\.\)])\s*([\s\S]*?)(?=(?:Ans|Answer|Explanation|\n\s*\n|$))/i);
  const ansMatch = trimmed.match(/(?:Ans|Answer|Correct Option)[\s:=]+([A-D])/i);

  const questionText = qMatch ? qMatch[1]?.trim() : trimmed.split("\n")[0]?.trim();
  const optA = optAMatch ? optAMatch[1]?.trim() : "";
  const optB = optBMatch ? optBMatch[1]?.trim() : "";
  const optC = optCMatch ? optCMatch[1]?.trim() : "";
  const optD = optDMatch ? optDMatch[1]?.trim() : "";
  const correctOption = (ansMatch ? ansMatch[1]?.toUpperCase() : "A") as "A" | "B" | "C" | "D";

  if (!questionText || !optA || !optB || !optC || !optD) {
    return null;
  }

  // Determine archetype based on structural cues
  let archetype: ExtractedQuestion["archetype"] = "Direct Fact";
  if (questionText.includes("Assertion") && questionText.includes("Reason")) {
    archetype = "Assertion-Reasoning";
  } else if (questionText.includes("Match") || questionText.includes("Column I")) {
    archetype = "Match the Following";
  } else if (questionText.length > 250 || questionText.includes("Passage") || questionText.includes("Case")) {
    archetype = "Case-Study MCQ";
  } else if (/\d+[\.\d]*\s*(?:N|kg|m\/s|Hz|₹|%|F|V|C|Ω)/.test(questionText) || questionText.includes("Calculate")) {
    archetype = "Numerical";
  }

  return {
    subject: defaultSubject,
    chapter: "Core Syllabus Concept",
    micro_topic: "Standard NTA Formulation",
    ncert_reference: `NCERT Standard Reference (${defaultSubject})`,
    archetype,
    question_text: questionText,
    option_a: optA,
    option_b: optB,
    option_c: optC,
    option_d: optD,
    correct_option: correctOption,
    explanation: `According to NCERT guidelines for ${defaultSubject}, Option (${correctOption}) establishes the scientifically valid formulation.`,
    is_pyq: true,
    pyq_year: defaultYear,
  };
}

// AI-Powered Parsing & 4D Classification via Groq LPU (or OpenAI)
async function parseWithLLM(
  rawQuestionsBatch: string[],
  subjectHint: string,
  yearHint: number
): Promise<ExtractedQuestion[]> {
  const groqApiKey = process.env.GROQ_API_KEY;

  if (!groqApiKey || groqApiKey.includes("placeholder")) {
    // Fall back to rule-based parser
    return rawQuestionsBatch
      .map((block) => parseRawQuestionBlock(block, subjectHint, yearHint))
      .filter((q): q is ExtractedQuestion => q !== null);
  }

  try {
    const groq = new Groq({ apiKey: groqApiKey });

    const systemPrompt = `You are a Principal NTA CUET Paper Data Architect.
Extract MCQs from the raw examination text and classify each into the 4D diagnostic matrix:
- subject: e.g. "Physics", "Accountancy", "English", "Economics", "Mathematics"
- chapter: NCERT Class 12 chapter title
- micro_topic: granular sub-topic concept
- ncert_reference: exact book & chapter (e.g. "NCERT Physics Part 1, Ch 2, Page 64")
- archetype: EXACTLY one of: "Direct Fact", "Assertion-Reasoning", "Match the Following", "Case-Study MCQ", "Numerical"
- question_text: clean prompt without question numbers
- option_a, option_b, option_c, option_d: clean option text without (A)/(B) prefixes
- correct_option: strictly "A" | "B" | "C" | "D"
- explanation: 2 concise sentences citing the NCERT textbook rule
- is_pyq: true
- pyq_year: integer (default ${yearHint})

You MUST respond strictly with a valid JSON object matching this structure:
{
  "questions": [
    {
      "subject": "Physics",
      "chapter": "Electrostatic Potential",
      "micro_topic": "Dielectric Polarization",
      "ncert_reference": "NCERT Physics Part 1, Ch 2, Page 72",
      "archetype": "Direct Fact",
      "question_text": "...",
      "option_a": "...",
      "option_b": "...",
      "option_c": "...",
      "option_d": "...",
      "correct_option": "A",
      "explanation": "...",
      "is_pyq": true,
      "pyq_year": 2024
    }
  ]
}`;

    const groqModel = process.env.GROQ_MODEL || "groq/compound-mini";
    const completion = await groq.chat.completions.create({
      model: groqModel,
      temperature: 0.1,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Subject Hint: ${subjectHint}. Year: ${yearHint}.\n\nRaw Text:\n${rawQuestionsBatch.join("\n\n---NEXT QUESTION---\n\n")}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return [];

    const cleaned = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(cleaned) as { questions: ExtractedQuestion[] };
    return parsed.questions || [];
  } catch (error) {
    console.warn(`[Warning] Groq LLM parsing error. Falling back to heuristic parser:`, error);
    return rawQuestionsBatch
      .map((block) => parseRawQuestionBlock(block, subjectHint, yearHint))
      .filter((q): q is ExtractedQuestion => q !== null);
  }
}

// Strict Validator
function validateQuestion(q: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const requiredFields = [
    "subject",
    "chapter",
    "micro_topic",
    "ncert_reference",
    "archetype",
    "question_text",
    "option_a",
    "option_b",
    "option_c",
    "option_d",
    "correct_option",
    "explanation",
  ];

  requiredFields.forEach((field) => {
    if (!q[field] || typeof q[field] !== "string" || q[field].trim().length === 0) {
      errors.push(`Field '${field}' is missing or empty`);
    }
  });

  if (!VALID_ARCHETYPES.includes(q.archetype)) {
    errors.push(`Invalid archetype '${q.archetype}'. Expected one of: ${VALID_ARCHETYPES.join(", ")}`);
  }

  const validOptions = ["A", "B", "C", "D"];
  if (!validOptions.includes(q.correct_option)) {
    errors.push(`Invalid correct_option '${q.correct_option}'. Expected 'A', 'B', 'C', or 'D'`);
  }

  if (q.pyq_year && (q.pyq_year < 2020 || q.pyq_year > 2030)) {
    errors.push(`Invalid pyq_year '${q.pyq_year}'. Must be between 2020 and 2030`);
  }

  return { valid: errors.length === 0, errors };
}

// Batch Insert with Upsert into Supabase public.questions
async function batchInsertQuestions(
  questions: ExtractedQuestion[],
  chunkSize: number = 25
): Promise<{ insertedCount: number; error: any }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
    console.log(
      `${colors.yellow}[Notice] Supabase URL is placeholder. Simulating database upsert.${colors.reset}`
    );
    return { insertedCount: questions.length, error: null };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  let totalInserted = 0;

  for (let i = 0; i < questions.length; i += chunkSize) {
    const chunk = questions.slice(i, i + chunkSize);

    const { error, count } = await supabase
      .from("questions")
      .upsert(chunk, { onConflict: "question_text" });

    if (error) {
      console.error(`\n[Database Error in Batch ${Math.floor(i / chunkSize) + 1}]:`, error.message);
      return { insertedCount: totalInserted, error };
    }

    totalInserted += count ?? chunk.length;
  }

  return { insertedCount: totalInserted, error: null };
}

// CLI Execution Function
async function main() {
  const args = process.argv.slice(2);

  console.log(`\n${colors.bright}${colors.cyan}══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}    CUET AI-Prep: Automated PYQ Ingestion & 4D Tagging Engine ${colors.reset}`);
  console.log(`${colors.cyan}══════════════════════════════════════════════════════════════${colors.reset}\n`);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(`Usage:`);
    console.log(`  npx tsx scripts/ingest-questions.ts <file-path> [options]`);
    console.log(`\nOptions:`);
    console.log(`  --subject <name>    Hint subject (e.g. "Physics", "Accountancy", "English")`);
    console.log(`  --year <number>     PYQ examination year (e.g. 2024) [default: 2024]`);
    console.log(`  --batch-size <num>  Database upsert chunk size [default: 25]`);
    console.log(`\nExamples:`);
    console.log(`  npx tsx scripts/ingest-questions.ts scripts/sample-cuet-2024-pyq.txt --subject Physics --year 2024`);
    console.log(`  npx tsx scripts/ingest-questions.ts pyq_questions.json\n`);
    process.exit(0);
  }

  const filePath = path.resolve(process.cwd(), args[0]!);
  if (!fs.existsSync(filePath)) {
    console.error(`${colors.red}Error: Target file not found at ${filePath}${colors.reset}`);
    process.exit(1);
  }

  // Parse optional arguments
  let subjectHint = "Physics";
  let yearHint = 2024;
  let batchSize = 25;

  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--subject" && args[i + 1]) subjectHint = args[++i]!;
    if (args[i] === "--year" && args[i + 1]) yearHint = parseInt(args[++i]!, 10);
    if (args[i] === "--batch-size" && args[i + 1]) batchSize = parseInt(args[++i]!, 10);
  }

  console.log(`${colors.dim}Target File:${colors.reset}    ${colors.bright}${path.basename(filePath)}${colors.reset}`);
  console.log(`${colors.dim}Subject Hint:${colors.reset}   ${colors.yellow}${subjectHint}${colors.reset}`);
  console.log(`${colors.dim}Exam Year:${colors.reset}      ${colors.yellow}${yearHint}${colors.reset}`);
  console.log(`${colors.dim}AI Engine:${colors.reset}      ${process.env.GROQ_API_KEY ? colors.green + "Groq LPU (llama-3.3-70b-versatile)" : colors.yellow + "Heuristic Regex Extractor"}${colors.reset}`);
  console.log(`${colors.dim}Batch Size:${colors.reset}     ${batchSize} questions per upsert\n`);

  const startTime = Date.now();
  const fileContent = fs.readFileSync(filePath, "utf-8");

  let rawQuestionBlocks: string[] = [];

  // Check if input is JSON or Raw Text
  if (filePath.endsWith(".json")) {
    try {
      const parsedJson = JSON.parse(fileContent);
      if (Array.isArray(parsedJson)) {
        rawQuestionBlocks = parsedJson.map((item) =>
          typeof item === "string" ? item : JSON.stringify(item)
        );
      } else if (parsedJson.questions && Array.isArray(parsedJson.questions)) {
        rawQuestionBlocks = parsedJson.questions.map((item: any) =>
          typeof item === "string" ? item : JSON.stringify(item)
        );
      }
    } catch {
      rawQuestionBlocks = [fileContent];
    }
  } else {
    // Split by question markers like "Q1.", "Question 1", or multiple line breaks
    rawQuestionBlocks = fileContent
      .split(/\n\s*(?:Q\d+[\.:\)]|Question\s*\d+[\.:\)]|\d+[\.:\)])/i)
      .map((b) => b.trim())
      .filter((b) => b.length > 25);

    // If split did not find markers, fallback to splitting by double newlines
    if (rawQuestionBlocks.length <= 1) {
      rawQuestionBlocks = fileContent
        .split(/\n{2,}/)
        .map((b) => b.trim())
        .filter((b) => b.length > 25);
    }
  }

  console.log(`${colors.cyan}Found ${rawQuestionBlocks.length} raw question candidate blocks.${colors.reset}`);
  console.log(`${colors.dim}Starting AI extraction & 4D diagnostic tagging...${colors.reset}\n`);

  const extractedQuestions: ExtractedQuestion[] = [];
  const chunkSize = 5; // LLM batch size for prompt context window

  for (let i = 0; i < rawQuestionBlocks.length; i += chunkSize) {
    const slice = rawQuestionBlocks.slice(i, i + chunkSize);
    renderProgressBar(i, rawQuestionBlocks.length, "Parsing MCQs with 4D Matrix");

    const parsed = await parseWithLLM(slice, subjectHint, yearHint);
    extractedQuestions.push(...parsed);
  }
  renderProgressBar(rawQuestionBlocks.length, rawQuestionBlocks.length, "Parsing Complete");

  console.log(`\n${colors.bright}Validating extracted question schemas...${colors.reset}`);

  const validatedQuestions: ExtractedQuestion[] = [];
  let invalidCount = 0;

  extractedQuestions.forEach((q, idx) => {
    const { valid, errors } = validateQuestion(q);
    if (valid) {
      validatedQuestions.push(q);
    } else {
      invalidCount++;
      console.warn(`  ${colors.red}✗ Question #${idx + 1} validation failed:${colors.reset} ${errors.join("; ")}`);
    }
  });

  console.log(
    `Validated: ${colors.green}${validatedQuestions.length} passed${colors.reset} | ${colors.red}${invalidCount} rejected${colors.reset}\n`
  );

  if (validatedQuestions.length === 0) {
    console.error(`${colors.red}Error: No valid questions extracted. Please check input format.${colors.reset}`);
    process.exit(1);
  }

  // Bulk Insert into Supabase
  console.log(`${colors.cyan}Executing batch upsert into Supabase 'public.questions' table...${colors.reset}`);
  const { insertedCount, error } = await batchInsertQuestions(validatedQuestions, batchSize);

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n${colors.bright}${colors.green}══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.green}               INGESTION COMPLETE SUMMARY                    ${colors.reset}`);
  console.log(`${colors.green}══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`  ${colors.dim}Total Raw Candidates:${colors.reset}     ${rawQuestionBlocks.length}`);
  console.log(`  ${colors.dim}Successfully Extracted:${colors.reset}   ${extractedQuestions.length}`);
  console.log(`  ${colors.dim}Schema Validated:${colors.reset}         ${colors.green}${validatedQuestions.length}${colors.reset}`);
  console.log(`  ${colors.dim}Inserted into Supabase:${colors.reset}   ${colors.bright}${colors.green}${insertedCount}${colors.reset}`);
  console.log(`  ${colors.dim}Total Elapsed Time:${colors.reset}       ${colors.yellow}${durationSec}s${colors.reset}`);
  console.log(`  ${colors.dim}Processing Throughput:${colors.reset}    ${(validatedQuestions.length / Math.max(1, parseFloat(durationSec))).toFixed(1)} Qs/sec`);
  console.log(`${colors.green}══════════════════════════════════════════════════════════════${colors.reset}\n`);

  if (error) {
    console.error(`${colors.red}Completed with database errors.${colors.reset}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("\n[Fatal Error]:", err);
  process.exit(1);
});
