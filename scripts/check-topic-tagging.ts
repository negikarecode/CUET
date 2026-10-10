import fs from "fs";
import path from "path";

interface MockQuestion {
  questionNumber?: number;
  questionId?: string;
  chapter?: string;
  topic?: string;
  questionText?: string;
  detailedSolution?: string;
  explanation?: string;
  solution?: {
    concept?: string;
    detailed?: string;
  };
}

interface TaggingMismatchFlag {
  file: string;
  questionNumber: number;
  questionId: string;
  taggedChapter: string;
  taggedTopic: string;
  explanationSnippet: string;
  reason: string;
  severity: "high" | "medium";
}

// Known cross-topic contamination patterns to inspect
const MISMATCH_PATTERNS = [
  {
    topicMustContain: ["monitoring", "pollution"],
    explanationDisallowedKeywords: ["soil erosion", "afforestation for soil", "gully erosion", "sheet erosion"],
    reason: "Soil erosion / conservation mechanism tagged under air/water pollution monitoring.",
  },
  {
    topicMustContain: ["solid waste", "waste management"],
    explanationDisallowedKeywords: ["tropospheric ozone", "stratospheric ozone depletion", "cfc refrigerant"],
    reason: "Atmospheric ozone layer depletion tagged under municipal solid waste.",
  },
  {
    topicMustContain: ["organic", "haloalkane"],
    explanationDisallowedKeywords: ["galvanic cell", "nernst equation", "faraday constant"],
    reason: "Electrochemistry calculation tagged under Organic Chemistry haloalkane topic.",
  },
  {
    topicMustContain: ["optics"],
    explanationDisallowedKeywords: ["de broglie", "photoelectric work function", "compton shift"],
    reason: "Dual Nature / Quantum concept tagged under Ray/Wave Optics topic.",
  },
];

export function auditQuestionTagging(mockDirPath: string): TaggingMismatchFlag[] {
  const flags: TaggingMismatchFlag[] = [];

  if (!fs.existsSync(mockDirPath)) {
    console.warn(`Mock directory not found: ${mockDirPath}`);
    return flags;
  }

  const subjects = fs.readdirSync(mockDirPath);

  for (const subject of subjects) {
    const subjectDir = path.join(mockDirPath, subject);
    if (!fs.statSync(subjectDir).isDirectory()) continue;

    const files = fs.readdirSync(subjectDir).filter((f) => f.endsWith(".json"));

    for (const file of files) {
      const filePath = path.join(subjectDir, file);
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        const questions: MockQuestion[] = JSON.parse(content);

        if (!Array.isArray(questions)) continue;

        questions.forEach((q, idx) => {
          const qNum = q.questionNumber || idx + 1;
          const qId = q.questionId || `${subject}-${file}-Q${qNum}`;
          const chapter = (q.chapter || "").toLowerCase();
          const topic = (q.topic || "").toLowerCase();
          const explanation = (
            q.detailedSolution ||
            q.explanation ||
            q.solution?.detailed ||
            q.solution?.concept ||
            ""
          ).toLowerCase();

          for (const pattern of MISMATCH_PATTERNS) {
            const topicMatches = pattern.topicMustContain.some(
              (kw) => chapter.includes(kw) || topic.includes(kw)
            );

            if (topicMatches) {
              const matchedDisallowed = pattern.explanationDisallowedKeywords.find((kw) =>
                explanation.includes(kw)
              );

              if (matchedDisallowed) {
                flags.push({
                  file: `${subject}/${file}`,
                  questionNumber: qNum,
                  questionId: qId,
                  taggedChapter: q.chapter || "",
                  taggedTopic: q.topic || "",
                  explanationSnippet: explanation.slice(0, 150) + "...",
                  reason: `${pattern.reason} (Found disallowed concept: '${matchedDisallowed}')`,
                  severity: "high",
                });
              }
            }
          }
        });
      } catch (err) {
        console.warn(`Error reading ${filePath}:`, err);
      }
    }
  }

  return flags;
}

// Self-executing runner
if (require.main === module) {
  const mockPath = path.resolve(process.cwd(), "mock");
  console.log(`Starting topic tagging audit on: ${mockPath}...`);
  const results = auditQuestionTagging(mockPath);

  console.log(`\n======================================================`);
  console.log(`TOPIC TAGGING AUDIT COMPLETE`);
  console.log(`Total questions audited across all subject mocks.`);
  console.log(`Total flagged potential mismatches: ${results.length}`);
  console.log(`======================================================\n`);

  if (results.length > 0) {
    results.slice(0, 10).forEach((flag, idx) => {
      console.log(`[Flag ${idx + 1}] ${flag.file} Q#${flag.questionNumber} (${flag.questionId})`);
      console.log(`  Tagged: [Chapter: ${flag.taggedChapter}] / [Topic: ${flag.taggedTopic}]`);
      console.log(`  Issue:  ${flag.reason}`);
      console.log(`  Text:   ${flag.explanationSnippet}\n`);
    });

    const reportDir = path.resolve(process.cwd(), "reports");
    if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
    const reportPath = path.join(reportDir, "topic-tagging-audit.json");
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`Full report saved to: ${reportPath}`);
  } else {
    console.log("No cross-topic contamination flags detected in inspected patterns.");
  }
}
