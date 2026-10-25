import { getStructuralFingerprint } from "../lib/duplicate-detection";
import fs from "fs";
import path from "path";

const CANONICAL_SUBJECTS = [
  "accountancy",
  "agriculture",
  "anthropology",
  "bio",
  "bst",
  "chemistry",
  "computer_science",
  "eco",
  "english",
  "environmental_studies",
  "fine_arts",
  "general-test",
  "geo",
  "history",
  "home_science",
  "mass_media",
  "maths",
  "physical_education",
  "physics",
  "pol science",
  "psychology",
  "sociology",
];

export function runStructuralDedup() {
  console.log("===============================================================");
  console.log("STARTING STRUCTURAL FINGERPRINT DEDUPLICATION ACROSS ALL PRACTICE TESTS");
  console.log("===============================================================\n");

  let grandTotalDupes = 0;
  let grandTotalFilesModified = 0;
  let grandTotalFiles = 0;

  CANONICAL_SUBJECTS.forEach((sub, sIdx) => {
    const sDir = path.join(process.cwd(), "practice", sub);
    if (!fs.existsSync(sDir)) {
      console.log(`[${sIdx + 1}/22] ${sub}: Directory missing! Skipping.`);
      return;
    }

    const units = fs.readdirSync(sDir).filter((u) => {
      const uPath = path.join(sDir, u);
      return fs.existsSync(uPath) && fs.statSync(uPath).isDirectory();
    });

    let subDupes = 0;
    let subFilesModified = 0;
    let subFiles = 0;

    units.forEach((u) => {
      const uDir = path.join(sDir, u);
      const files = fs.readdirSync(uDir).filter((f) => f.endsWith(".json") && !isNaN(parseInt(f)));
      subFiles += files.length;

      // 1. Gather pool of unique questions in this unit by structural fingerprint
      const unitPool: any[] = [];
      const poolSeen = new Set<string>();

      files.forEach((f) => {
        const filePath = path.join(uDir, f);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        data.forEach((q: any) => {
          const fp = getStructuralFingerprint({
            questionText: q.questionText || q.question || q.prompt,
            options: q.options,
          });
          if (fp && !poolSeen.has(fp)) {
            poolSeen.add(fp);
            unitPool.push(JSON.parse(JSON.stringify(q)));
          }
        });
      });

      // 2. Deduplicate each test file
      files.forEach((f) => {
        const filePath = path.join(uDir, f);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const fileSeen = new Set<string>();
        let modified = false;

        data.forEach((q: any, idx: number) => {
          const fp = getStructuralFingerprint({
            questionText: q.questionText || q.question || q.prompt,
            options: q.options,
          });

          if (!fp || fileSeen.has(fp)) {
            // Find replacement from unitPool
            const rep = unitPool.find((candidate) => {
              const cFp = getStructuralFingerprint({
                questionText: candidate.questionText || candidate.question || candidate.prompt,
                options: candidate.options,
              });
              return cFp && !fileSeen.has(cFp);
            });

            if (rep) {
              const newQ = JSON.parse(JSON.stringify(rep));
              newQ.questionNumber = idx + 1;
              if (newQ.questionId) {
                const parts = newQ.questionId.split("-");
                parts[parts.length - 1] = `Q${String(idx + 1).padStart(2, "0")}`;
                newQ.questionId = parts.join("-");
              }
              data[idx] = newQ;
              const newFp = getStructuralFingerprint({
                questionText: newQ.questionText || newQ.question || newQ.prompt,
                options: newQ.options,
              });
              if (newFp) fileSeen.add(newFp);
              modified = true;
              subDupes++;
            } else {
              console.error(`[WARN] Pool exhausted for ${sub}/${u}/${f} at index ${idx + 1}`);
            }
          } else {
            fileSeen.add(fp);
          }
        });

        if (modified) {
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
          subFilesModified++;
        }
      });
    });

    console.log(
      `[${sIdx + 1}/22] ${sub.padEnd(22)}: ${units.length} units, ${subFiles} files, ${subDupes} duplicates resolved across ${subFilesModified} files.`
    );
    grandTotalDupes += subDupes;
    grandTotalFilesModified += subFilesModified;
    grandTotalFiles += subFiles;
  });

  console.log("\n===============================================================");
  console.log(`TOTAL STRUCTURAL DUPLICATES RESOLVED: ${grandTotalDupes}`);
  console.log(`TOTAL FILES MODIFIED: ${grandTotalFilesModified} / ${grandTotalFiles}`);
  console.log("===============================================================\n");
}

runStructuralDedup();
