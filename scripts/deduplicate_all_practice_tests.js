const fs = require("fs");
const path = require("path");

function norm(text) {
  if (!text) return "";
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

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
  "sociology"
];

function deduplicateAllPractice() {
  console.log("===============================================================");
  console.log("STARTING GLOBAL PRACTICE TEST DEDUPLICATION & ENRICHMENT");
  console.log("===============================================================\n");

  let grandTotalDupesFixed = 0;
  let grandTotalFilesModified = 0;
  let grandTotalFilesCleaned = 0;

  CANONICAL_SUBJECTS.forEach((sub, sIdx) => {
    const sDir = path.join("practice", sub);
    if (!fs.existsSync(sDir)) {
      console.log(`[${sIdx + 1}/22] ${sub}: Directory missing! Skipping.`);
      return;
    }

    const units = fs.readdirSync(sDir).filter(u => {
      const uPath = path.join(sDir, u);
      return fs.existsSync(uPath) && fs.statSync(uPath).isDirectory();
    });

    let subDupesFixed = 0;
    let subFilesModified = 0;
    let subTotalFiles = 0;

    units.forEach(u => {
      const uDir = path.join(sDir, u);
      const files = fs.readdirSync(uDir).filter(f => f.endsWith(".json"));
      subTotalFiles += files.length;

      // 1. Gather pool of unique questions in this unit
      const unitPool = [];
      const poolSeen = new Set();

      files.forEach(f => {
        const d = JSON.parse(fs.readFileSync(path.join(uDir, f), "utf-8"));
        d.forEach(q => {
          const t = norm(q.questionText || q.question);
          if (t && !poolSeen.has(t)) {
            poolSeen.add(t);
            unitPool.push(JSON.parse(JSON.stringify(q)));
          }
        });
      });

      // 2. Deduplicate each file in this unit
      files.forEach(f => {
        const filePath = path.join(uDir, f);
        const d = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const fileSeen = new Set();
        let changed = false;

        d.forEach((q, idx) => {
          const t = norm(q.questionText || q.question);
          if (!t || fileSeen.has(t)) {
            // Find replacement from unitPool
            const rep = unitPool.find(candidate => !fileSeen.has(norm(candidate.questionText || candidate.question)));
            if (rep) {
              const newQ = JSON.parse(JSON.stringify(rep));
              newQ.questionNumber = idx + 1;
              if (newQ.questionId) {
                const parts = newQ.questionId.split("-");
                parts[parts.length - 1] = `Q${String(idx + 1).padStart(2, "0")}`;
                newQ.questionId = parts.join("-");
              }
              d[idx] = newQ;
              fileSeen.add(norm(newQ.questionText || newQ.question));
              changed = true;
              subDupesFixed++;
            } else {
              console.error(`[CRITICAL] Pool exhausted for ${sub}/${u}/${f} at index ${idx + 1}`);
            }
          } else {
            fileSeen.add(t);
          }
        });

        if (changed) {
          fs.writeFileSync(filePath, JSON.stringify(d, null, 2), "utf-8");
          subFilesModified++;
        }
      });
    });

    console.log(`[${sIdx + 1}/22] ${sub.padEnd(22)}: ${units.length} units, ${subTotalFiles} files, ${subDupesFixed} duplicates eliminated across ${subFilesModified} files.`);
    grandTotalDupesFixed += subDupesFixed;
    grandTotalFilesModified += subFilesModified;
    grandTotalFilesCleaned += subTotalFiles;
  });

  console.log("\n===============================================================");
  console.log(`TOTAL PRACTICE TEST DUPLICATES ELIMINATED: ${grandTotalDupesFixed}`);
  console.log(`TOTAL FILES MODIFIED: ${grandTotalFilesModified} / ${grandTotalFilesCleaned}`);
  console.log("===============================================================");
}

deduplicateAllPractice();
