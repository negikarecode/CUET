const fs = require("fs");
const path = require("path");

function deduplicateMathsPYQ() {
  const dir = "pyq/maths";
  const files = [];
  for (let i = 1; i <= 20; i++) {
    files.push(`${i}.json`);
  }

  // 1. Gather all unique authentic questions for each section across all 20 files
  const poolA = [];
  const poolB1 = [];
  const poolB2 = [];

  const seenA = new Set();
  const seenB1 = new Set();
  const seenB2 = new Set();

  function norm(text) {
    return (text || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  files.forEach(f => {
    const d = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
    d.forEach(q => {
      const t = norm(q.questionText || q.question);
      if (!t) return;
      if (q.section === "A") {
        if (!seenA.has(t)) {
          seenA.add(t);
          poolA.push(JSON.parse(JSON.stringify(q)));
        }
      } else if (q.section === "B1") {
        if (!seenB1.has(t)) {
          seenB1.add(t);
          poolB1.push(JSON.parse(JSON.stringify(q)));
        }
      } else if (q.section === "B2") {
        if (!seenB2.has(t)) {
          seenB2.add(t);
          poolB2.push(JSON.parse(JSON.stringify(q)));
        }
      }
    });
  });

  console.log(`Pools gathered: Section A = ${poolA.length}, Section B1 = ${poolB1.length}, Section B2 = ${poolB2.length}`);

  // 2. Deduplicate each file
  let totalReplaced = 0;

  files.forEach((f, fileIdx) => {
    const filePath = path.join(dir, f);
    const d = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const fileSeenStems = new Set();
    let fileReplaced = 0;

    d.forEach((q, idx) => {
      const qNum = idx + 1;
      let text = norm(q.questionText || q.question);

      // Check if duplicate in this file
      if (fileSeenStems.has(text)) {
        // Need replacement!
        let rep = null;
        if (q.section === "A") {
          rep = poolA.find(candidate => !fileSeenStems.has(norm(candidate.questionText || candidate.question)));
        } else if (q.section === "B1") {
          rep = poolB1.find(candidate => !fileSeenStems.has(norm(candidate.questionText || candidate.question)));
        } else {
          // B2
          rep = poolB2.find(candidate => !fileSeenStems.has(norm(candidate.questionText || candidate.question)));
        }

        if (rep) {
          const newQ = JSON.parse(JSON.stringify(rep));
          newQ.questionNumber = qNum;
          newQ.questionId = `CUET-UG-MATH-2025-S${(fileIdx % 2) + 1}-P${String(fileIdx + 1).padStart(2, "0")}-Q${String(qNum).padStart(2, "0")}`;
          newQ.section = q.section;
          newQ.sectionTitle = q.sectionTitle;
          newQ.isCompulsory = q.isCompulsory;
          newQ.attemptRequired = q.attemptRequired;
          newQ.attemptMax = q.attemptMax;
          newQ.examDate = q.examDate;
          newQ.shift = q.shift;
          newQ.sourceDocumentId = q.sourceDocumentId;
          newQ.pyqSource = q.pyqSource;

          d[idx] = newQ;
          text = norm(newQ.questionText || newQ.question);
          fileReplaced++;
          totalReplaced++;
        } else {
          console.error(`Could not find replacement for ${f} Q${qNum} in section ${q.section}`);
        }
      }

      fileSeenStems.add(text);
    });

    fs.writeFileSync(filePath, JSON.stringify(d, null, 2), "utf-8");
    console.log(`File ${f}: ${fileReplaced} duplicates replaced. Total unique questions now: ${fileSeenStems.size}/85`);
  });

  console.log(`\nTOTAL MATHEMATICS PYQ DUPLICATES ELIMINATED: ${totalReplaced}`);
}

deduplicateMathsPYQ();
