/**
 * CUET UG Master Question Paper Generator (v2) - Few-Shot Exemplar Bank
 * Fulfills Section 2: Calibration Anchoring via Few-Shot Real CUET / NTA Exemplars.
 */

import fs from "fs";
import path from "path";
import { FewShotExemplar } from "./types";

export class FewShotBank {
  private exemplarsBySubject: Map<string, FewShotExemplar[]> = new Map();

  constructor() {
    this.loadBuiltinExemplars();
    this.loadExemplarsFromParsedJson();
  }

  public addExemplar(exemplar: FewShotExemplar): void {
    const key = exemplar.subject.toLowerCase().trim();
    const list = this.exemplarsBySubject.get(key) || [];
    list.push(exemplar);
    this.exemplarsBySubject.set(key, list);
  }

  /**
   * Returns formatted few-shot exemplar text to inject into {{FEWSHOT_EXAMPLES}}
   */
  public getFewShotContext(subject: string, maxCount = 4): string {
    const key = subject.toLowerCase().trim();
    const list = this.exemplarsBySubject.get(key) || [];

    if (list.length === 0) {
      return "";
    }

    const selected = list.slice(0, maxCount);
    return selected
      .map((ex, idx) => {
        let optText = "";
        if (ex.options && ex.options.length > 0) {
          optText = ex.options.map((o) => `(${o.id}) ${o.text}`).join("\n");
        }
        return `### Exemplar ${idx + 1} (${ex.source} - ${ex.archetype || "Standard"}):
${ex.questionText}
${optText}
Correct Option: ${ex.correctOption || "N/A"}
${ex.explanation ? `Explanation: ${ex.explanation}` : ""}
`;
      })
      .join("\n" + "-".repeat(40) + "\n\n");
  }

  private loadBuiltinExemplars(): void {
    // ─── Business Studies ───
    this.addExemplar({
      subject: "business_studies",
      source: "CUET UG 2024 Actual Examination",
      archetype: "Conceptual Application",
      questionText: `A sales manager has to negotiate a deal with a buyer. She finds that if she can offer a credit period of 60 days, she is likely to clinch the deal which is supposed to fetch the company a net margin of Rs. 50 crores. The company entrusts her the task of clinching the deal but gives her power to offer a credit period of only 40 days. Identify the principle of management violated in the aforesaid statement.`,
      options: [
        { id: "A", text: "Authority and Responsibility" },
        { id: "B", text: "Unity of Command" },
        { id: "C", text: "Unity of Direction" },
        { id: "D", text: "Scalar Chain" },
      ],
      correctOption: "A",
      explanation: "Parity between authority and responsibility was violated because authority to grant sufficient credit (60 days) was withheld while responsibility for clinching the deal was assigned.",
    });

    this.addExemplar({
      subject: "business_studies",
      source: "CUET UG 2024 Actual Examination",
      archetype: "Match the Columns",
      questionText: `Match List-I with List-II:
List-I (Functional Areas)
(A) Production
(B) Marketing
(C) Human Resource Management
(D) Finance and Accounting

List-II (Standards)
(I) Quantity
(II) Labour absenteeism
(III) Sales-person's performance
(IV) Flow of capital

Choose the correct answer from the options given below:`,
      options: [
        { id: "A", text: "(A) - (I), (B) - (III), (C) - (II), (D) - (IV)" },
        { id: "B", text: "(A) - (I), (B) - (II), (C) - (III), (D) - (IV)" },
        { id: "C", text: "(A) - (I), (B) - (II), (C) - (IV), (D) - (III)" },
        { id: "D", text: "(A) - (III), (B) - (IV), (C) - (I), (D) - (II)" },
      ],
      correctOption: "A",
      explanation: "Production standard is Quantity (I); Marketing is Sales-person's performance (III); HRM is Labour absenteeism (II); Finance is Flow of capital (IV).",
    });

    // ─── Economics ───
    this.addExemplar({
      subject: "economics",
      source: "CUET UG 2024 Actual Examination",
      archetype: "Calculation Trap",
      questionText: `If Marginal Propensity to Save ($MPS$) is $0.20$ and autonomous investment increases by ₹$500$ crores, the total increase in national income will be:`,
      options: [
        { id: "A", text: "₹100 crores" },
        { id: "B", text: "₹2,500 crores" },
        { id: "C", text: "₹2,000 crores" },
        { id: "D", text: "₹625 crores" },
      ],
      correctOption: "B",
      explanation: "Investment multiplier $k = 1 / MPS = 1 / 0.20 = 5$. Total increase in income $\\Delta Y = k \\times \\Delta I = 5 \\times 500 = 2500$ crores. Trap option A is multiplying $MPS \\times \\Delta I = 100$.",
    });

    // ─── Physics ───
    this.addExemplar({
      subject: "physics",
      source: "CUET UG 2024 Actual Examination",
      archetype: "Calculation Trap",
      questionText: `Two point charges $+4q$ and $+q$ are placed at a distance $L$ apart in air. At what distance from the $+4q$ charge should a third charge $Q$ be placed on the line joining them so that the system remains in equilibrium?`,
      options: [
        { id: "A", text: "$L / 3$" },
        { id: "B", text: "$2L / 3$" },
        { id: "C", text: "$L / 2$" },
        { id: "D", text: "$3L / 4$" },
      ],
      correctOption: "B",
      explanation: "For net force on $Q$ to be zero: $\\frac{k(4q)Q}{x^2} = \\frac{kqQ}{(L - x)^2} \\implies \\frac{2}{x} = \\frac{1}{L - x} \\implies 2L - 2x = x \\implies 3x = 2L \\implies x = 2L/3$. Trap A is measured from $+q$.",
    });

    // ─── Political Science ───
    this.addExemplar({
      subject: "political_science",
      source: "CUET UG 2024 Actual Examination",
      archetype: "Chronological Sequence",
      questionText: `Arrange the following events in chronological sequence:
(A) Disintegration of the Soviet Union
(B) Fall of the Berlin Wall
(C) Soviet invasion of Afghanistan
(D) Mikhail Gorbachev becomes General Secretary of CPSU
Choose the correct answer from the options given below:`,
      options: [
        { id: "A", text: "(C), (D), (B), (A)" },
        { id: "B", text: "(D), (C), (B), (A)" },
        { id: "C", text: "(C), (B), (D), (A)" },
        { id: "D", text: "(B), (C), (D), (A)" },
      ],
      correctOption: "A",
      explanation: "(C) Soviet invasion of Afghanistan (1979) -> (D) Gorbachev General Secretary (1985) -> (B) Fall of Berlin Wall (Nov 1989) -> (A) Disintegration of Soviet Union (Dec 1991).",
    });
  }

  private loadExemplarsFromParsedJson(): void {
    const mappings: Array<{ file: string; subject: string }> = [
      { file: "scripts/parsed_bst_pyqs.json", subject: "business_studies" },
      { file: "scripts/parsed_eco_pyqs.json", subject: "economics" },
      { file: "scripts/parsed_pol_science_pyqs.json", subject: "political_science" },
    ];

    for (const m of mappings) {
      const fullPath = path.resolve(process.cwd(), m.file);
      if (!fs.existsSync(fullPath)) continue;
      try {
        const raw = fs.readFileSync(fullPath, "utf-8");
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          for (const item of list.slice(0, 10)) {
            if (item.questionText && item.questionText.length > 30) {
              this.addExemplar({
                subject: m.subject,
                source: `NTA CUET PYQ Archive (${item.source || "Official NTA Paper"})`,
                questionNumber: item.qNumber,
                questionText: item.questionText,
              });
            }
          }
        }
      } catch {
        // Skip unparsable files
      }
    }
  }
}

export const globalFewShotBank = new FewShotBank();
