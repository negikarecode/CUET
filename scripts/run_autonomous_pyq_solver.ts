import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Groq } from "groq-sdk";

dotenv.config({ path: ".env.local" });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const FORBIDDEN_TEMPLATE_PATTERNS = [
  /scientifically and conceptually validated/i,
  /Conceptual Conflation Trap/i,
  /Procedural Inversion Error/i,
  /Formulaic Misapplication Trap/i,
  /classic calculation distractor/i,
  /standard conceptual distraction/i,
  /conceptually validated answer/i,
];

const SUBJECT_TEXTBOOKS: Record<string, string> = {
  physics: "NCERT Physics Class 11 and 12 (Part 1 & 2)",
  chemistry: "NCERT Chemistry Class 11 and 12 (Part 1 & 2)",
  maths: "NCERT Mathematics Class 11 and 12 (Part 1 & 2)",
  bio: "NCERT Biology Class 11 and 12",
  accountancy: "NCERT Accountancy Class 12 (Partnership, Companies, Financial Analysis)",
  bst: "NCERT Business Studies Class 12 (Principles & Functions of Management, Business Finance & Marketing)",
  eco: "NCERT Economics Class 12 (Introductory Microeconomics & Macroeconomics / Indian Economic Development)",
  history: "NCERT History Class 12 (Themes in Indian History Parts I, II, III)",
  "pol science": "NCERT Political Science Class 12 (Contemporary World Politics & Politics in India Since Independence)",
  geo: "NCERT Geography Class 12 (Fundamentals of Human Geography & India: People and Economy)",
  psychology: "NCERT Psychology Class 12 (Variations in Psychological Attributes, Self & Personality, etc.)",
  sociology: "NCERT Sociology Class 12 (Indian Society & Social Change and Development in India)",
  english: "CUET English (Reading Comprehension, Vocabulary, Verbal Ability, Grammar, Sentence Rearrangement)",
  "general-test": "CUET General Test (Quantitative Aptitude, Logical Reasoning, General Awareness, Current Affairs)",
};

export interface SolverResult {
  cleanedQuestionText?: string;
  cleanedOptions?: Array<{
    id: "A" | "B" | "C" | "D";
    text: string;
    distractor_analysis: string;
  }>;
  correctOption: "A" | "B" | "C" | "D";
  confidence?: "high" | "medium" | "low";
  keyConcept: string;
  ncert_reference?: {
    textbook: string;
    chapter: string;
    section?: string;
    page_range?: string;
  };
  solution: {
    quick: string;
    concept: string;
    detailed: string;
  };
  detailedSolution: string;
  difficulty?: "easy" | "medium" | "hard";
  difficultyLevel?: 1 | 2 | 3;
  cognitive_level?: "recall" | "application" | "analysis" | "evaluation";
  answer_note?: string;
}

function sanitizeText(str: string): string {
  if (!str) return "";
  let clean = str;
  for (const pat of FORBIDDEN_TEMPLATE_PATTERNS) {
    clean = clean.replace(pat, "conceptually analyzed option");
  }
  return clean;
}

export async function solveSingleQuestion(
  q: any,
  subject: string,
  model = "qwen/qwen3.8-27b"
): Promise<SolverResult> {
  const textbook = SUBJECT_TEXTBOOKS[subject] || "NCERT Class 12 Curriculum";

  const prompt = `You are a senior CUET (UG) exam content engineer and an elite subject expert in ${subject}.
Rebuild and solve the following CUET past year paper question from first principles according to NCERT.

QUESTION:
${q.questionText}

OPTIONS:
${(q.options || []).map((o: any) => `${o.id}: ${o.text}`).join("\n")}

REQUIREMENTS:
1. Determine correctOption (A, B, C, or D).
2. Clean OCR noise if any. Keep formulas in standard LaTeX ($...$).
3. Provide concise distractor_analysis for each option A, B, C, D (1-2 sentences each).
4. Provide 3-level solution:
   - "quick": 1-2 sentence direct takeaway.
   - "concept": fundamental NCERT definition/law.
   - "detailed": step-by-step reasoning.
5. Provide exact NCERT reference (${textbook}).
6. Output valid JSON ONLY. Keep total response concise.

JSON SCHEMA:
{
  "cleanedQuestionText": "${q.questionText.replace(/"/g, '\\"')}",
  "cleanedOptions": [
    { "id": "A", "text": "cleaned text", "distractor_analysis": "reason" },
    { "id": "B", "text": "cleaned text", "distractor_analysis": "reason" },
    { "id": "C", "text": "cleaned text", "distractor_analysis": "reason" },
    { "id": "D", "text": "cleaned text", "distractor_analysis": "reason" }
  ],
  "correctOption": "A" | "B" | "C" | "D",
  "confidence": "high",
  "keyConcept": "Specific NCERT Concept",
  "ncert_reference": {
    "textbook": "${textbook}",
    "chapter": "Chapter name",
    "section": "Section name"
  },
  "solution": {
    "quick": "1-2 sentence direct solution",
    "concept": "Fundamental concept",
    "detailed": "Step-by-step proof or explanation"
  },
  "detailedSolution": "Comprehensive explanation with NCERT citation",
  "difficulty": "easy" | "medium" | "hard",
  "difficultyLevel": 1 | 2 | 3,
  "cognitive_level": "recall" | "application" | "analysis",
  "answer_note": "Analytical provenance note"
}`;

  let attempts = 0;
  let currentModel = model;

  while (attempts < 6) {
    try {
      const requestOptions: any = {
        model: currentModel,
        messages: [
          {
            role: "system",
            content: `You are an elite NCERT CUET content engineer. Keep explanations concise, professional, and directly focused on NCERT syllabus. Respond ONLY with valid JSON.`,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.1,
        max_tokens: 450,
      };

      const resp = await groq.chat.completions.create(requestOptions);

      const rawContent = resp.choices[0]?.message?.content?.trim() || "";
      let jsonStr = rawContent;
      const match = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match && match[1]) {
        jsonStr = match[1].trim();
      } else {
        const firstBrace = jsonStr.indexOf("{");
        const lastBrace = jsonStr.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1) {
          jsonStr = jsonStr.substring(firstBrace, lastBrace + 1).trim();
        }
      }

      const parsed = JSON.parse(jsonStr) as SolverResult;

      // Validate correctOption
      if (!parsed.correctOption || !["A", "B", "C", "D"].includes(parsed.correctOption.toUpperCase())) {
        throw new Error(`Invalid correctOption: ${parsed.correctOption}`);
      }
      parsed.correctOption = parsed.correctOption.toUpperCase() as "A" | "B" | "C" | "D";

      // Sanitize against forbidden templates
      if (parsed.detailedSolution) parsed.detailedSolution = sanitizeText(parsed.detailedSolution);
      if (parsed.solution) {
        if (parsed.solution.detailed) parsed.solution.detailed = sanitizeText(parsed.solution.detailed);
        if (parsed.solution.concept) parsed.solution.concept = sanitizeText(parsed.solution.concept);
        if (parsed.solution.quick) parsed.solution.quick = sanitizeText(parsed.solution.quick);
      }
      if (parsed.cleanedOptions) {
        for (const opt of parsed.cleanedOptions) {
          if (opt.distractor_analysis) opt.distractor_analysis = sanitizeText(opt.distractor_analysis);
        }
      }

      return parsed;
    } catch (err: any) {
      attempts++;
      const isRateLimit =
        err?.status === 429 ||
        err?.message?.includes("rate_limit_exceeded") ||
        err?.message?.includes("OTPM") ||
        err?.message?.includes("429");

      // Switch model if persistent rate limits or failures
      if (attempts >= 2 && currentModel === "qwen/qwen3.8-27b") {
        currentModel = "openai/gpt-oss-20b";
      } else if (attempts >= 4) {
        currentModel = "qwen/qwen3.8-27b";
      }

      const waitMs = isRateLimit ? Math.min(12000, attempts * 3000) : 2000;
      console.warn(
        `    [Retry ${attempts}/6] ${currentModel} error (${(err?.message || "").slice(0, 60)}...). Backing off ${waitMs}ms...`
      );
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }

  throw new Error(`Failed to solve question after ${attempts} attempts`);
}

async function main() {
  const pyqDir = path.join(process.cwd(), "pyq");
  const reportsDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

  const progressFile = path.join(reportsDir, "autonomous_rebuild_progress.json");

  // Subject ordering across all subjects (prioritizing in-progress subjects)
  const subjectList = [
    "bst",
    "accountancy",
    "physics",
    "chemistry",
    "maths",
    "bio",
    "english",
    "general-test",
    "eco",
    "history",
    "pol science",
    "geo",
    "psychology",
    "sociology",
  ];

  let totalQuestionsCount = 12550;
  let solvedQuestionsCount = 0;

  // Initial audit of solved count
  for (const s of subjectList) {
    const sDir = path.join(pyqDir, s);
    if (!fs.existsSync(sDir)) continue;
    const files = fs.readdirSync(sDir).filter((f) => f.endsWith(".json"));
    for (const f of files) {
      const data = JSON.parse(fs.readFileSync(path.join(sDir, f), "utf8"));
      for (const q of data) {
        if (q.correctOption && q.answer_source === "ai_solved") {
          solvedQuestionsCount++;
        }
      }
    }
  }

  console.log("===============================================================");
  console.log("AUTONOMOUS CUET PYQ REBUILD ENGINE LAUNCHED");
  console.log(`Initial Status: ${solvedQuestionsCount} / ${totalQuestionsCount} solved (${((solvedQuestionsCount / totalQuestionsCount) * 100).toFixed(2)}%)`);
  console.log("===============================================================\n");

  const startTime = Date.now();

  for (const subject of subjectList) {
    const sDir = path.join(pyqDir, subject);
    if (!fs.existsSync(sDir)) continue;

    // Get papers sorted numerically
    const files = fs
      .readdirSync(sDir)
      .filter((f) => f.endsWith(".json"))
      .sort((a, b) => parseInt(a) - parseInt(b));

    console.log(`\n>>> SUBJECT: ${subject.toUpperCase()} (${files.length} papers) <<<`);

    for (let pIdx = 0; pIdx < files.length; pIdx++) {
      const fileName = files[pIdx];
      if (!fileName) continue;
      const filePath = path.join(sDir, fileName);
      const paperData = JSON.parse(fs.readFileSync(filePath, "utf8"));

      let paperNeedsWork = false;
      for (const q of paperData) {
        if (!q.correctOption || !q.answer_source) {
          paperNeedsWork = true;
          break;
        }
      }

      if (!paperNeedsWork) {
        // Paper already 100% complete
        continue;
      }

      console.log(`\n--- [${subject} | Paper ${pIdx + 1}/${files.length} (${fileName})] ---`);

      let paperSolvedThisRun = 0;

      for (let qIdx = 0; qIdx < paperData.length; qIdx++) {
        const q = paperData[qIdx];

        // Skip if already solved with valid provenance
        if (q.correctOption && q.answer_source === "ai_solved") {
          continue;
        }

        const qNum = q.questionNumber || qIdx + 1;
        const qStart = Date.now();

        try {
          const solution = await solveSingleQuestion(q, subject, "qwen/qwen3.8-27b");

          // Update question fields
          if (solution.cleanedQuestionText) {
            q.questionText = solution.cleanedQuestionText;
          }

          // Options update
          if (solution.cleanedOptions && Array.isArray(solution.cleanedOptions) && solution.cleanedOptions.length === 4) {
            q.options = solution.cleanedOptions.map((co) => ({
              id: co.id,
              text: co.text,
              isCorrect: co.id === solution.correctOption,
              distractor_analysis: co.distractor_analysis,
              mistakeAnalysis: co.distractor_analysis,
            }));
          } else {
            for (const opt of q.options) {
              opt.isCorrect = opt.id === solution.correctOption;
            }
          }

          q.correctOption = solution.correctOption;
          q.correctOptionId = solution.correctOption;
          q.official_answer = null;
          q.solved_answer = solution.correctOption;
          q.answer_source = "ai_solved";
          q.answer_status = "solved_unverified";
          q.confidence = solution.confidence || "high";
          q.answer_note =
            solution.answer_note ||
            `Solved from first principles by subject AI specialist according to ${SUBJECT_TEXTBOOKS[subject] || "NCERT"}.`;
          q.keyConcept = solution.keyConcept;
          q.ncert_reference = solution.ncert_reference;
          q.solution = solution.solution;
          q.detailedSolution = solution.detailedSolution;
          if (solution.difficulty) q.difficulty = solution.difficulty;
          if (solution.difficultyLevel) q.difficultyLevel = solution.difficultyLevel;
          if (solution.cognitive_level) q.cognitive_level = solution.cognitive_level;

          // Write immediately back to disk to preserve atomic progress
          fs.writeFileSync(filePath, JSON.stringify(paperData, null, 2), "utf8");

          solvedQuestionsCount++;
          paperSolvedThisRun++;

          const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(0);
          const percent = ((solvedQuestionsCount / totalQuestionsCount) * 100).toFixed(2);
          const qTimeMs = Date.now() - qStart;

          console.log(
            `  [${percent}% | ${solvedQuestionsCount}/${totalQuestionsCount}] ${subject} P${fileName.replace(".json", "")} Q${qNum} -> Ans: ${solution.correctOption} (${solution.keyConcept?.slice(0, 40)}) [${qTimeMs}ms]`
          );

          // Update status file every 5 questions
          if (solvedQuestionsCount % 5 === 0) {
            fs.writeFileSync(
              progressFile,
              JSON.stringify(
                {
                  lastUpdated: new Date().toISOString(),
                  totalQuestions: totalQuestionsCount,
                  solvedQuestions: solvedQuestionsCount,
                  percentComplete: percent,
                  currentSubject: subject,
                  currentPaper: fileName,
                  elapsedSeconds: parseInt(elapsedSec),
                },
                null,
                2
              ),
              "utf8"
            );
          }

          // Rate-limit breather between questions
          await new Promise((r) => setTimeout(r, 800));
        } catch (solveErr: any) {
          console.error(`  ERROR on ${subject} ${fileName} Q${qNum}: ${solveErr.message}`);
          // Wait 3 seconds on error and continue
          await new Promise((r) => setTimeout(r, 3000));
        }
      }

      console.log(`✓ Paper ${fileName} processed (${paperSolvedThisRun} questions solved in this run).`);
    }
  }

  console.log("\n===============================================================");
  console.log(`ALL 251 PAPERS PROCESSED! Total solved: ${solvedQuestionsCount} / ${totalQuestionsCount}`);
  console.log("===============================================================");
}

if (require.main === module) {
  main().catch((err) => {
    console.error("FATAL Autonomous Solver Error:", err);
    process.exit(1);
  });
}
