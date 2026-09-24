import fs from "fs";
import path from "path";

interface AuditStats {
  totalFiles: number;
  totalQuestions: number;
  strippedLoneConcepts: number;
  patchedTypoDelimiters: number;
  sanitizedFormulas: number;
  validMathCount: number;
  currencyMatchesPreserved: number;
}

const stats: AuditStats = {
  totalFiles: 0,
  totalQuestions: 0,
  strippedLoneConcepts: 0,
  patchedTypoDelimiters: 0,
  sanitizedFormulas: 0,
  validMathCount: 0,
  currencyMatchesPreserved: 0,
};

function getAllJsonFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllJsonFiles(fullPath));
    } else if (file.endsWith(".json")) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Strips an accidental lone "1. " or "1) " prefix if the string does not
 * contain a subsequent "2. " or "2) " item.
 */
function cleanConcept(raw: string): { text: string; modified: boolean } {
  if (!raw) return { text: "", modified: false };
  let text = raw.trim();
  if (
    /^\s*1[\.\)]\s+/.test(text) &&
    !/\n\s*2[\.\)]\s+/.test(text) &&
    !/(?:^|\s)2[\.\)]\s+/.test(text)
  ) {
    const cleaned = text.replace(/^\s*1[\.\)]\s+/, "");
    return { text: cleaned, modified: true };
  }
  return { text, modified: false };
}

/**
 * Patches known delimiter typos (e.g. $$...$|)
 */
function patchDelimiterTypos(text: string): { text: string; modified: boolean } {
  if (!text) return { text: "", modified: false };
  let modified = false;
  let res = text;

  // Typo: $$...$| at the end of display math
  if (res.includes("}$|")) {
    res = res.replace(/}\$\|/g, "}$$");
    modified = true;
  }

  // Double dollar with unbalanced spacing or trailing broken delimiters
  if (res.includes("$$|")) {
    res = res.replace(/\$\$\|/g, "$$");
    modified = true;
  }

  return { text: res, modified };
}

/**
 * Ensures formulas are cleanly formatted with single or double dollar signs
 */
function normalizeFormula(raw: string): { text: string; modified: boolean } {
  if (!raw) return { text: "", modified: false };
  let trimmed = raw.trim();

  // If it already starts and ends with $, return as is
  if (trimmed.startsWith("$") && trimmed.endsWith("$")) {
    return { text: trimmed, modified: false };
  }

  // If it contains math operators or LaTeX macros, wrap in $ ... $
  if (/[\\=_^+\-*/\(\)]/.test(trimmed) && !trimmed.startsWith("$")) {
    return { text: `$${trimmed}$`, modified: true };
  }

  return { text: trimmed, modified: false };
}

function processQuestion(q: any): boolean {
  let wasModified = false;

  // 1. Sanitize solution.concept
  if (q.solution?.concept) {
    const { text, modified } = cleanConcept(q.solution.concept);
    if (modified) {
      q.solution.concept = text;
      stats.strippedLoneConcepts++;
      wasModified = true;
    }
  }

  // 2. Sanitize formula
  if (q.formula) {
    const { text, modified } = normalizeFormula(q.formula);
    if (modified) {
      q.formula = text;
      stats.sanitizedFormulas++;
      wasModified = true;
    }
  }

  // 3. Patch known delimiter typos in detailedSolution, explanation, prompt
  ["detailedSolution", "explanation", "questionText", "prompt"].forEach((field) => {
    if (q[field] && typeof q[field] === "string") {
      const { text, modified } = patchDelimiterTypos(q[field]);
      if (modified) {
        q[field] = text;
        stats.patchedTypoDelimiters++;
        wasModified = true;
      }
    }
  });

  if (q.solution?.detailed && typeof q.solution.detailed === "string") {
    const { text, modified } = patchDelimiterTypos(q.solution.detailed);
    if (modified) {
      q.solution.detailed = text;
      stats.patchedTypoDelimiters++;
      wasModified = true;
    }
  }

  return wasModified;
}

export function runAuditAndNormalization(dryRun = false) {
  console.log("=== CUET Question Bank LaTeX & Delimiter Audit ===");
  const targetDir = path.resolve(process.cwd(), "mock");
  const files = getAllJsonFiles(targetDir);
  stats.totalFiles = files.length;

  let modifiedFilesCount = 0;

  for (const filePath of files) {
    try {
      const rawContent = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(rawContent);

      let fileModified = false;

      if (Array.isArray(data)) {
        for (const q of data) {
          stats.totalQuestions++;
          const mod = processQuestion(q);
          if (mod) fileModified = true;
        }
      } else if (data && typeof data === "object") {
        if (Array.isArray(data.questions)) {
          for (const q of data.questions) {
            stats.totalQuestions++;
            const mod = processQuestion(q);
            if (mod) fileModified = true;
          }
        }
      }

      if (fileModified) {
        modifiedFilesCount++;
        if (!dryRun) {
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
        }
      }
    } catch (err: any) {
      console.error(`Error processing file ${filePath}:`, err.message);
    }
  }

  console.log("--------------------------------------------------");
  console.log(`Total Mock JSON Files Scanned : ${stats.totalFiles}`);
  console.log(`Total Questions Inspected    : ${stats.totalQuestions}`);
  console.log(`Lone '1. ' Concepts Stripped  : ${stats.strippedLoneConcepts}`);
  console.log(`Formulas Standardized ($...$) : ${stats.sanitizedFormulas}`);
  console.log(`Delimiter Typos Patched       : ${stats.patchedTypoDelimiters}`);
  console.log(`Total Files Normalized        : ${modifiedFilesCount} ${dryRun ? "(DRY RUN)" : "(SAVED)"}`);
  console.log("==================================================");
}

// Execute immediately when run directly
if (require.main === module || process.argv[1]?.includes("audit-latex-syntax")) {
  const isDryRun = process.argv.includes("--dry-run");
  runAuditAndNormalization(isDryRun);
}
