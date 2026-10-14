import { NoteDocument } from "@/types/notes";

export const accountancyUnits1to3Topics: NoteDocument[] = [
  // Unit 1: Partnership Fundamentals, Goodwill Valuation, Profit Sharing Ratio
  {
    id: "accountancy_u1_t1",
    slug: "partnership-fundamentals-goodwill-valuation-profit-sharing-ratio",
    subject: "accountancy",
    subjectName: "Accountancy",
    subjectCode: "301",
    unitNumber: 1,
    unitTitle: "Accounting for Partnership: Basic Concepts and Goodwill",
    topicTitle: "Partnership Fundamentals, Goodwill Valuation, Profit Sharing Ratio",
    ncertReference: {
      class: "Class 12",
      book: "Accountancy — Partnership Accounts",
      chapterNumber: 1,
      chapterName: "Accounting for Partnership: Basic Concepts",
      sections: [
        "1.1 Nature of Partnership and Partnership Deed",
        "1.2 Provisions of the Indian Partnership Act, 1932 in Absence of Deed",
        "1.3 Maintenance of Capital Accounts (Fixed vs Fluctuating Capital Method)",
        "1.4 Profit and Loss Appropriation Account & Past Adjustments",
        "1.5 Interest on Capital, Interest on Drawings (Average Period Method)",
        "1.6 Nature and Valuation of Goodwill (Average Profits, Super Profits, Capitalisation)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (8-10 questions per shift)",
      totalPyqsInRepo: 290,
      weightagePercentage: 16,
    },
    summary30Seconds: [
      "In the absence of a Partnership Deed: Profit-sharing is equal; No interest on capital, drawings, or salary; Interest on partner's loan is allowed @ 6% p.a.",
      "Fixed vs Fluctuating Capital: Under fixed capital, two accounts are maintained per partner (Capital A/c and Current A/c); Under fluctuating, all entries go into Capital A/c.",
      "Goodwill valuation methods: Average Profit Method, Super Profit Method ($SP = \\text{Actual/Average Profit} - \\text{Normal Profit}$), and Capitalisation Method ($SP \\times \\frac{100}{\\text{NRR}}$).",
    ],
    coreConcepts: [
      {
        title: "Provisions in the Absence of Partnership Deed & Capital Systems",
        content: `Under the **Indian Partnership Act, 1932**, if there is no partnership deed or if the deed is silent, the following rules apply strictly:
1. **Profit Sharing Ratio**: Profits and losses are shared **equally**, irrespective of capital contribution.
2. **Interest on Capital**: **No interest** on capital is allowed to any partner.
3. **Interest on Drawings**: **No interest** is charged on drawings.
4. **Salary / Remuneration**: **No salary**, commission, or remuneration is payable to any partner.
5. **Interest on Partner's Loan / Advance**: Allowed at **6% per annum** (treated as a **charge against profits**, debited to P&L Account, not P&L Appropriation A/c).

**Fixed vs Fluctuating Capital Method**:
- **Fixed Capital Method**: Capital remains unaltered except for introduction of permanent fresh capital or withdrawal of capital. Two accounts:
  1. *Partner's Capital A/c*: Always shows a credit balance.
  2. *Partner's Current A/c*: Records drawings, interest on capital, salary, commission, share of profit/loss. Can show a debit or credit balance.
- **Fluctuating Capital Method**: Only *Partner's Capital A/c* is maintained. All adjustments are recorded directly in this account.`,
        ncertPointers: [
          "Interest on partner's loan is a charge against profit, not an appropriation. It must be paid even if the firm incurs a net loss.",
          "Rent paid to a partner for using his premises is also a charge against profits debited to P&L A/c.",
        ],
      },
      {
        title: "Interest on Drawings: The Average Period Method",
        content: `When fixed amounts are withdrawn at regular monthly or quarterly intervals throughout the year:
$$\\text{Interest on Drawings} = \\text{Total Annual Drawings} \\times \\frac{\\text{Rate}}{100} \\times \\frac{\\text{Average Period}}{12}$$
Where:
$$\\text{Average Period} = \\frac{\\text{Months left after 1st drawing} + \\text{Months left after last drawing}}{2}$$

**Standard Average Periods for Monthly Drawings**:
- Beginning of each month: $\\frac{12 + 1}{2} = \\mathbf{6.5 \\text{ months}}$.
- Middle of each month: $\\frac{11.5 + 0.5}{2} = \\mathbf{6.0 \\text{ months}}$.
- End of each month: $\\frac{11 + 0}{2} = \\mathbf{5.5 \\text{ months}}$.

**Standard Average Periods for Quarterly Drawings**:
- Beginning of each quarter: $\\frac{12 + 3}{2} = \\mathbf{7.5 \\text{ months}}$.
- Middle of each quarter: $\\frac{10.5 + 1.5}{2} = \\mathbf{6.0 \\text{ months}}$.
- End of each quarter: $\\frac{9 + 0}{2} = \\mathbf{4.5 \\text{ months}}$.
*Note: If date of drawing is not specified, interest is calculated for an average period of 6 months.*`,
        ncertPointers: [
          "If drawings are made during 6 months only (beginning of each month), Average Period = (6 + 1)/2 = 3.5 months.",
          "Distinguish drawings against capital (debited to Capital A/c) from drawings against profit (debited to Drawings/Current A/c).",
        ],
      },
      {
        title: "Goodwill Valuation: Methods & Formulas",
        content: `Goodwill is an intangible asset representing the firm's reputation and excess earning power over normal firms.

1. **Average Profit Method**:
   $$\\text{Value of Goodwill} = \\text{Adjusted Average Normal Profit} \\times \\text{Number of Years' Purchase}$$
   *(Adjustments: Deduct abnormal gains like profit on sale of fixed asset; add back abnormal losses like loss by fire/theft; deduct non-operating incomes).*

2. **Super Profit Method**:
   $$\\text{Normal Profit} = \\text{Capital Employed} \\times \\frac{\\text{Normal Rate of Return (NRR)}}{100}$$
   $$\\text{Super Profit (SP)} = \\text{Actual/Adjusted Average Profit} - \\text{Normal Profit}$$
   $$\\text{Goodwill} = \\text{Super Profit} \\times \\text{Number of Years' Purchase}$$
   *(Capital Employed = Total Tangible Assets - Outside Liabilities, excluding fictitious assets, non-trade investments, and existing goodwill).*

3. **Capitalisation Method**:
   - **Capitalisation of Super Profits**:
     $$\\text{Goodwill} = \\text{Super Profit} \\times \\frac{100}{\\text{NRR}}$$
   - **Capitalisation of Average Profits**:
     $$\\text{Capitalised Value of Business} = \\text{Average Profit} \\times \\frac{100}{\\text{NRR}}$$
     $$\\text{Goodwill} = \\text{Capitalised Value} - \\text{Net Capital Employed}$$`,
        ncertPointers: [
          "As per AS-26 (Intangible Assets), only purchased goodwill can be recorded in the books of accounts. Self-generated goodwill is NEVER recorded in balance sheet.",
          "If Super Profit is zero or negative, goodwill is nil.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Average Period for Interest on Drawings",
        formula: "\\text{Avg Period} = \\frac{\\text{Time left after 1st drawing} + \\text{Time left after last drawing}}{2}",
        symbols: "Beg: 6.5m; Mid: 6m; End: 5.5m (Monthly) | Beg: 7.5m; Mid: 6m; End: 4.5m (Quarterly)",
        siUnits: "Months",
        applicationCondition: "Regular equal drawings at uniform intervals",
      },
      {
        name: "Super Profit & Capitalisation Goodwill Formulas",
        formula: "\\text{SP} = \\text{Avg Profit} - (\\text{Capital Employed} \\times \\text{NRR}); \\quad \\text{Goodwill} = \\text{SP} \\times \\frac{100}{\\text{NRR}}",
        symbols: "SP = Super Profit, NRR = Normal Rate of Return",
        siUnits: "Rupees (INR)",
        applicationCondition: "Firm valuation under partnership reconstruction",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Partnership Fundamentals & Goodwill Valuation Decision Tree</text>
  
  <!-- Left Box: Absence of Deed -->
  <rect x="50" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5"/>
  <text x="205" y="90" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">Absence of Partnership Deed (Act 1932)</text>
  
  <text x="80" y="120" fill="#cbd5e1" fontSize="11">• Profit Sharing Ratio: <tspan fill="#34d399" fontWeight="bold">EQUAL (1:1)</tspan></text>
  <text x="80" y="145" fill="#cbd5e1" fontSize="11">• Interest on Capital: <tspan fill="#f87171" fontWeight="bold">NIL (Not Allowed)</tspan></text>
  <text x="80" y="170" fill="#cbd5e1" fontSize="11">• Interest on Drawings: <tspan fill="#f87171" fontWeight="bold">NIL (Not Charged)</tspan></text>
  <text x="80" y="195" fill="#cbd5e1" fontSize="11">• Partner's Salary / Remuneration: <tspan fill="#f87171" fontWeight="bold">NIL</tspan></text>
  <text x="80" y="220" fill="#cbd5e1" fontSize="11">• Interest on Partner Loan: <tspan fill="#fbbf24" fontWeight="bold">6% p.a. (Charge on P&amp;L)</tspan></text>
  <text x="80" y="245" fill="#94a3b8" fontSize="10">*Loan interest payable even if firm incurs LOSS</text>
  
  <!-- Right Box: Goodwill Valuation -->
  <rect x="400" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5"/>
  <text x="555" y="90" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Goodwill Valuation Methods</text>
  
  <rect x="420" y="110" width="270" height="36" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="555" y="125" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">1. Average Profit Method</text>
  <text x="555" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">Adjusted Avg Profit × Years' Purchase</text>
  
  <rect x="420" y="155" width="270" height="42" rx="6" fill="#0f172a" stroke="#f59e0b"/>
  <text x="555" y="170" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">2. Super Profit Method</text>
  <text x="555" y="188" textAnchor="middle" fill="#fde68a" fontSize="10">SP = Actual Profit - (Capital Employed × NRR)</text>
  
  <rect x="420" y="208" width="270" height="42" rx="6" fill="#0f172a" stroke="#10b981"/>
  <text x="555" y="224" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">3. Capitalisation Method</text>
  <text x="555" y="242" textAnchor="middle" fill="#86efac" fontSize="10">Goodwill = Super Profit × (100 / NRR)</text>
</svg>`,
    workedExamples: [
      {
        id: "accountancy_u1_t1_we1",
        questionNumber: 1,
        question: "A partner, Raman, withdraws ₹10,000 at the beginning of every month for 12 months. If interest on drawings is charged @ 12% p.a., calculate the interest on drawings for the year.",
        options: [
          { id: "A", text: "₹7,200" },
          { id: "B", text: "₹7,800" },
          { id: "C", text: "₹6,600" },
          { id: "D", text: "₹8,400" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Total drawings for the year = ₹10,000 × 12 = ₹1,20,000.",
          "Step 2: Drawings are made at the beginning of each month, so Average Period = (12 + 1) / 2 = 6.5 months.",
          "Step 3: Interest = Total Drawings × Rate × (Average Period / 12).",
          "Step 4: Interest = ₹1,20,000 × (12/100) × (6.5 / 12) = ₹14,400 × (6.5 / 12) = ₹7,800.",
          "Step 5: Option B is exact.",
        ],
      },
      {
        id: "accountancy_u1_t1_we2",
        questionNumber: 2,
        question: "A firm earned average net profits of ₹1,50,000 during the last few years. The capital employed in the business is ₹10,00,000 and the normal rate of return in similar industry is 10%. Calculate the value of goodwill by the capitalisation of super profit method.",
        options: [
          { id: "A", text: "₹5,00,000" },
          { id: "B", text: "₹1,50,000" },
          { id: "C", text: "₹10,00,000" },
          { id: "D", text: "₹50,000" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Normal Profit = Capital Employed × NRR / 100 = ₹10,00,000 × 10% = ₹1,00,000.",
          "Step 2: Super Profit = Actual Average Profit - Normal Profit = ₹1,50,000 - ₹1,00,000 = ₹50,000.",
          "Step 3: Goodwill by Capitalisation of Super Profit = Super Profit × (100 / NRR).",
          "Step 4: Goodwill = ₹50,000 × (100 / 10) = ₹5,00,000. Option A is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Absence of Deed Rules",
        frequency: "Extremely High (appears in >90% shifts)",
        typicalStem: "In the absence of a partnership deed, partner X contributed ₹5,00,000 capital and Y contributed ₹1,00,000. Partner X claims 10% interest on capital and 2/3rd share of profits. What is X entitled to?",
        strategy: "Under Indian Partnership Act 1932: Zero interest on capital, and profits shared EQUALLY (1:1), regardless of capital contributed.",
      },
      {
        patternType: "Interest on Drawings Period Calculation",
        frequency: "High",
        typicalStem: "If a partner withdraws ₹5,000 in the middle of each month, interest on drawings is calculated for how many months?",
        strategy: "Beginning = 6.5 months; Middle = 6.0 months; End = 5.5 months.",
      },
    ],
    commonTraps: [
      {
        concept: "Partner's Loan Interest vs Capital Interest",
        misconception: "Students assume partner loan interest is not allowed without a deed.",
        correctUnderstanding: "Interest on capital is NOT allowed, but **Interest on Partner's Loan IS allowed @ 6% p.a.** and is a charge on profits (P&L A/c), not an appropriation.",
      },
      {
        concept: "Self-Generated Goodwill in Balance Sheet",
        misconception: "Writing self-generated goodwill as an asset in the balance sheet.",
        correctUnderstanding: "Under AS-26, self-generated goodwill cannot be recognized in the books. Only purchased goodwill (where monetary consideration is paid) can be shown.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Monthly Drawings Average Periods",
        mnemonic: "B-M-E: 6.5, 6.0, 5.5 (Subtract 0.5 each step).",
        explanation: "Quick mental arithmetic for monthly drawings.",
      },
      {
        title: "Super Profit Chain",
        mnemonic: "C-N-S-G: Capital $\\to$ Normal Profit $\\to$ Super Profit $\\to$ Goodwill.",
        explanation: "Sequential roadmap to solve all super profit numericals without error.",
      },
    ],
    quickRevisionCard: {
      title: "Partnership Fundamentals — Quick Revision Card",
      bulletPoints: [
        "No deed: Profits equal, No Interest on Capital/Drawings/Salary, Loan interest @ 6% p.a.",
        "Partner's loan interest is a CHARGE against profit (debited to P&L A/c).",
        "Fixed Capital: 2 accounts (Capital A/c + Current A/c); Fluctuating: 1 account.",
        "Drawings Avg Period: Monthly (Beg 6.5, Mid 6.0, End 5.5); Quarterly (Beg 7.5, Mid 6.0, End 4.5).",
        "Normal Profit = Capital Employed $\\times$ NRR / 100.",
        "Super Profit = Average Adjusted Profit - Normal Profit.",
        "Goodwill (Capitalisation of SP) = $\\text{SP} \\times \\frac{100}{\\text{NRR}}$.",
        "AS-26: Only purchased goodwill is recorded in books; internally generated is not.",
      ],
    },
    practiceQuestions: [
      {
        id: "accountancy_u1_t1_q1",
        question: "In the absence of a partnership deed, interest on a partner's loan/advance to the firm is paid at the rate of:",
        options: [
          { id: "A", text: "12% per annum" },
          { id: "B", text: "6% per annum" },
          { id: "C", text: "10% per annum" },
          { id: "D", text: "No interest is payable" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "According to the Indian Partnership Act 1932, in the absence of any agreement, a partner is entitled to interest on the advance/loan made by him beyond his capital @ 6% p.a.",
      },
      {
        id: "accountancy_u1_t1_q2",
        question: "Under the fixed capital method, which of the following transactions is recorded in the Partner's Current Account?",
        options: [
          { id: "A", text: "Introduction of additional permanent capital" },
          { id: "B", text: "Permanent withdrawal of capital" },
          { id: "C", text: "Interest on capital, partner's salary, and share of profit" },
          { id: "D", text: "Opening balance of fixed capital" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Under the fixed capital method, only permanent capital contributions and withdrawals go into the Capital Account. All recurring items (drawings, interest on capital, salary, commission, share of profit) are recorded in the Partner's Current Account.",
      },
      {
        id: "accountancy_u1_t1_q3",
        question: "If equal amounts are withdrawn by a partner at the end of each month throughout the year, interest on drawings is calculated for an average period of:",
        options: [
          { id: "A", text: "6.5 months" },
          { id: "B", text: "6 months" },
          { id: "C", text: "5.5 months" },
          { id: "D", text: "4.5 months" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Average period = (Months remaining after 1st drawing + Months remaining after last drawing) / 2 = (11 + 0) / 2 = 5.5 months.",
      },
      {
        id: "accountancy_u1_t1_q4",
        question: "As per Accounting Standard-26 (AS-26) issued by ICAI, which type of goodwill can be recorded in the books of accounts?",
        options: [
          { id: "A", text: "Self-generated goodwill" },
          { id: "B", text: "Purchased goodwill only" },
          { id: "C", text: "Both self-generated and purchased goodwill" },
          { id: "D", text: "Neither self-generated nor purchased goodwill" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "As per AS-26, internally generated goodwill should not be recognized as an asset. Only purchased goodwill (where monetary consideration has been paid) can be recorded in the books.",
      },
      {
        id: "accountancy_u1_t1_q5",
        question: "Capital employed by a partnership firm is ₹5,00,000. Its average profit is ₹60,000. The normal rate of return in similar business is 10%. What is the Super Profit of the firm?",
        options: [
          { id: "A", text: "₹50,000" },
          { id: "B", text: "₹10,000" },
          { id: "C", text: "₹60,000" },
          { id: "D", text: "₹1,10,000" },
        ],
        correctOption: "B",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "easy",
        explanation: "Normal Profit = ₹5,00,000 × 10% = ₹50,000. Super Profit = Actual Profit - Normal Profit = ₹60,000 - ₹50,000 = ₹10,000.",
      },
      {
        id: "accountancy_u1_t1_q6",
        question: "Rent paid to a partner for using his personal premises for business purposes is treated as:",
        options: [
          { id: "A", text: "An appropriation of profit (debited to P&L Appropriation A/c)" },
          { id: "B", text: "A charge against profit (debited to Profit & Loss A/c)" },
          { id: "C", text: "An addition to Partner's Capital Account" },
          { id: "D", text: "A deduction from Partner's Current Account" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Rent paid to a partner is a charge against profit, not an appropriation. It is payable whether the firm makes a profit or incurs a loss, and is debited to the Profit & Loss Account.",
      },
      {
        id: "accountancy_u1_t1_q7",
        question: "Assertion (A): Interest on a partner's loan is debited to Profit and Loss Account and not to Profit and Loss Appropriation Account.\nReason (R): Interest on loan is a charge against profit and must be paid even if the firm incurs losses.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is not the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        questionType: "Assertion-Reason",
        difficulty: "medium",
        explanation: "Charges against profit are debited to P&L A/c before determining net profit; appropriations of profit among partners are recorded in P&L Appropriation A/c.",
      },
      {
        id: "accountancy_u1_t1_q8",
        question: "If total drawings of a partner during the year are ₹60,000 and the date of drawings is not mentioned, interest on drawings @ 10% p.a. will be:",
        options: [
          { id: "A", text: "₹6,000" },
          { id: "B", text: "₹3,000" },
          { id: "C", text: "₹5,000" },
          { id: "D", text: "₹1,500" },
        ],
        correctOption: "B",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "easy",
        explanation: "When the date of withdrawal is not specified, interest on drawings is calculated for an average period of 6 months: ₹60,000 × 10% × (6/12) = ₹3,000.",
      },
      {
        id: "accountancy_u1_t1_q9",
        question: "Match the following items with their accounting treatment in the absence of a partnership deed:\n(a) Salary to partner - (i) Equal sharing\n(b) Interest on capital - (ii) Allowed @ 6% p.a.\n(c) Interest on partner's loan - (iii) Not allowed\n(d) Sharing of profits - (iv) Not allowed",
        options: [
          { id: "A", text: "a-(iii), b-(iv), c-(ii), d-(i)" },
          { id: "B", text: "a-(i), b-(ii), c-(iii), d-(iv)" },
          { id: "C", text: "a-(iv), b-(iii), c-(ii), d-(i)" },
          { id: "D", text: "a-(ii), b-(iii), c-(iv), d-(i)" },
        ],
        correctOption: "A",
        questionType: "Match The Following",
        difficulty: "medium",
        explanation: "Salary and Interest on capital are both not allowed; Loan interest is 6% p.a.; Profits are shared equally.",
      },
      {
        id: "accountancy_u1_t1_q10",
        question: "Under the capitalisation of average profits method, goodwill is equal to:",
        options: [
          { id: "A", text: "Capitalised Value of Average Profits minus Net Assets (Capital Employed)" },
          { id: "B", text: "Net Assets minus Capitalised Value of Profits" },
          { id: "C", text: "Super Profit divided by Number of Years' Purchase" },
          { id: "D", text: "Average Profits multiplied by NRR" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Goodwill = Capitalised Value of Business (Average Profit × 100 / NRR) minus Net Tangible Assets (Capital Employed).",
      },
    ],
  },

  // Unit 2: Admission, Retirement and Death of a Partner
  {
    id: "accountancy_u2_t1",
    slug: "admission-retirement-and-death-of-a-partner",
    subject: "accountancy",
    subjectName: "Accountancy",
    subjectCode: "301",
    unitNumber: 2,
    unitTitle: "Reconstitution of a Partnership Firm: Admission, Retirement and Death",
    topicTitle: "Admission, Retirement and Death of a Partner",
    ncertReference: {
      class: "Class 12",
      book: "Accountancy — Partnership Accounts",
      chapterNumber: 2,
      chapterName: "Reconstitution of a Partnership Firm — Admission, Retirement/Death",
      sections: [
        "2.1 Sacrificing Ratio & Gaining Ratio",
        "2.2 Accounting Treatment of Goodwill on Admission (Premium for Goodwill)",
        "2.3 Revaluation of Assets and Reassessment of Liabilities (Revaluation Account)",
        "2.4 Adjustment of Accumulated Profits, Reserves and Losses (Workmen Compensation Reserve, IFR)",
        "2.5 Retirement of a Partner (Ascertainment of amount due, Loan A/c settlement)",
        "2.6 Death of a Partner (Interim Profit calculation, Deceased Partner's Executor A/c, Section 37)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (8-10 questions per shift)",
      totalPyqsInRepo: 310,
      weightagePercentage: 17,
    },
    summary30Seconds: [
      "On Admission: New partner brings capital and Premium for Goodwill, which is distributed among old partners in their Sacrificing Ratio (Old Ratio - New Ratio).",
      "Revaluation Account (Nominal A/c): Debit decrease in asset & increase in liability; Credit increase in asset & decrease in liability. Profit/Loss transferred to Old Partners in Old Ratio.",
      "On Retirement/Death: Gaining Ratio = New Ratio - Old Ratio. Retiring/deceased partner's share of goodwill is compensated by gaining partners in gaining ratio. Interim profit to deceased partner is debited to P&L Suspense Account.",
    ],
    coreConcepts: [
      {
        title: "Sacrificing vs Gaining Ratio & Revaluation Account",
        content: `**Ratios**:
- **Sacrificing Ratio (Admission)**:
  $$\\text{Sacrificing Ratio} = \\text{Old Ratio} - \\text{New Ratio}$$
  Used strictly to distribute the incoming partner's **Premium for Goodwill** among sacrificing partners.
- **Gaining Ratio (Retirement / Death)**:
  $$\\text{Gaining Ratio} = \\text{New Ratio} - \\text{Old Ratio}$$
  Used to debit gaining partners' capital accounts to compensate the retiring/deceased partner for their goodwill share.

**Revaluation Account (Profit and Loss Adjustment Account)**:
A nominal account prepared at the time of reconstitution to revalue assets and reassess liabilities:
- **Debit side**: Decrease in value of assets, increase in value of liabilities, unrecorded liabilities.
- **Credit side**: Increase in value of assets, decrease in value of liabilities, unrecorded assets.
- **Balancing Figure**: Net profit or net loss transferred to **Old Partners' Capital Accounts in their Old Profit Sharing Ratio**.`,
        ncertPointers: [
          "Expenses on revaluation paid by the firm on behalf of a partner are debited to Partner's Capital A/c.",
          "Workmen Compensation Reserve (WCR): Excess reserve over actual liability is distributed to old partners in old ratio.",
          "Investment Fluctuation Reserve (IFR): Used to absorb fall in market value of investments below book value; remainder distributed in old ratio.",
        ],
      },
      {
        title: "Goodwill Treatment on Admission & Retirement",
        content: `**On Admission**:
1. When premium for goodwill is paid **privately**: No journal entry in firm's books.
2. When brought in cash:
   $$\\text{Bank A/c Dr. to Premium for Goodwill A/c}$$
   $$\\text{Premium for Goodwill A/c Dr. to Sacrificing Partners' Capital A/cs [Sacrificing Ratio]}$$
3. When new partner cannot bring premium in cash:
   $$\\text{New Partner's Current A/c Dr. to Sacrificing Partners' Capital A/cs}$$
4. Existing goodwill in balance sheet:
   $$\\text{Old Partners' Capital A/cs Dr. [Old Ratio] to Goodwill A/c}$$

**On Retirement / Death**:
Goodwill is not brought into books. Retiring partner's share is adjusted through remaining partners:
$$\\text{Gaining Partners' Capital A/cs Dr. [Gaining Ratio] to Retiring/Deceased Partner's Capital A/c}$$`,
        ncertPointers: [
          "Hidden Goodwill: Total capital of new firm based on new partner's investment minus actual combined capital of all partners.",
          "If a continuing partner sacrifices on retirement, their capital account is ALSO credited along with retiring partner.",
        ],
      },
      {
        title: "Death of a Partner: Interim Profit & Section 37",
        content: `**Calculation of Deceased Partner's Share of Profit till Date of Death**:
1. **On Time Basis**:
   $$\\text{Profit till Death} = \\text{Previous Year / Average Profit} \\times \\frac{\\text{Days / Months till Death}}{12 / 365}$$
   $$\\text{Deceased Partner's Share} = \\text{Profit till Death} \\times \\text{Deceased Partner's Ratio}$$
2. **On Turnover / Sales Basis**:
   $$\\text{Estimated Profit} = \\frac{\\text{Previous Year Profit}}{\\text{Previous Year Sales}} \\times \\text{Sales till Date of Death}$$
   $$\\text{Deceased Partner's Share} = \\text{Estimated Profit} \\times \\text{Deceased Partner's Ratio}$$

**Journal Entry (if PSR of continuing partners does not change)**:
$$\\text{Profit and Loss Suspense A/c Dr. to Deceased Partner's Capital A/c}$$
*(If PSR changes, it is adjusted via Gaining Partners' Capital A/cs Dr. in Gaining Ratio).*

**Section 37 of Indian Partnership Act, 1932**:
If the outgoing/deceased partner's dues are not settled immediately and no agreement exists, the executor is entitled at their option to:
- **Interest @ 6% p.a.** on unpaid balance, OR
- Such share of subsequent profits earned as attributable to the use of their capital.`,
        ncertPointers: [
          "All balances of deceased partner's capital account are transferred to Deceased Partner's Executor's Account, not paid directly to the partner.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Sacrificing vs Gaining Ratio",
        formula: "\\text{Sacrificing Ratio} = \\text{Old} - \\text{New}; \\quad \\text{Gaining Ratio} = \\text{New} - \\text{Old}",
        symbols: "Admission: Sacrificing | Retirement/Death: Gaining",
        siUnits: "Fractions / Ratios",
        applicationCondition: "Goodwill adjustment on partnership reconstitution",
      },
      {
        name: "Section 37 Settlement Options",
        formula: "\\text{Option A: Interest @ 6% p.a. on unpaid dues} \\quad \\text{vs} \\quad \\text{Option B: Proportionate share of post-death profits}",
        symbols: "Section 37 Indian Partnership Act 1932",
        siUnits: "INR",
        applicationCondition: "Delayed settlement of deceased partner's dues",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Revaluation Account Structure & Profit Allocation</text>
  
  <!-- T-Account Outline -->
  <line x1="380" y1="55" x2="380" y2="280" stroke="#475569" strokeWidth="2"/>
  <line x1="40" y1="85" x2="720" y2="85" stroke="#475569" strokeWidth="2"/>
  
  <!-- Header Labels -->
  <text x="210" y="75" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="bold">DEBIT (Losses / Decreases in Net Worth)</text>
  <text x="550" y="75" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">CREDIT (Gains / Increases in Net Worth)</text>
  
  <!-- Debit Entries -->
  <text x="60" y="115" fill="#fca5a5" fontSize="11">• To Decrease in Value of Assets</text>
  <text x="60" y="140" fill="#fca5a5" fontSize="11">• To Increase in Value of Liabilities</text>
  <text x="60" y="165" fill="#fca5a5" fontSize="11">• To Unrecorded Liabilities (Discovered)</text>
  <text x="60" y="190" fill="#fca5a5" fontSize="11">• To Provision for Doubtful Debts / Discounts</text>
  
  <rect x="50" y="220" width="310" height="45" rx="6" fill="#1e293b" stroke="#34d399"/>
  <text x="205" y="240" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">To Profit transferred to Old Partners'</text>
  <text x="205" y="255" textAnchor="middle" fill="#86efac" fontSize="10">Capital A/cs in OLD RATIO (Balancing Figure)</text>
  
  <!-- Credit Entries -->
  <text x="400" y="115" fill="#86efac" fontSize="11">• By Increase in Value of Assets</text>
  <text x="400" y="140" fill="#86efac" fontSize="11">• By Decrease in Value of Liabilities</text>
  <text x="400" y="165" fill="#86efac" fontSize="11">• By Unrecorded Assets (Discovered)</text>
  
  <rect x="390" y="220" width="310" height="45" rx="6" fill="#1e293b" stroke="#f87171"/>
  <text x="545" y="240" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">By Loss transferred to Old Partners'</text>
  <text x="545" y="255" textAnchor="middle" fill="#fca5a5" fontSize="10">Capital A/cs in OLD RATIO (If Debits > Credits)</text>
</svg>`,
    workedExamples: [
      {
        id: "accountancy_u2_t1_we1",
        questionNumber: 1,
        question: "A and B are partners sharing profits in the ratio 3:2. They admit C into partnership for 1/5th share which he acquires entirely from A. Calculate the new profit-sharing ratio.",
        options: [
          { id: "A", text: "2 : 2 : 1" },
          { id: "B", text: "1 : 2 : 1" },
          { id: "C", text: "3 : 1 : 1" },
          { id: "D", text: "12 : 8 : 5" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Old shares: A = 3/5, B = 2/5.",
          "Step 2: C's share = 1/5, acquired entirely from A.",
          "Step 3: A's new share = Old share - Share sacrificed = 3/5 - 1/5 = 2/5.",
          "Step 4: B's share remains unchanged = 2/5.",
          "Step 5: C's share = 1/5. New ratio A : B : C = 2/5 : 2/5 : 1/5 = 2 : 2 : 1. Option A is exact.",
        ],
      },
      {
        id: "accountancy_u2_t1_we2",
        questionNumber: 2,
        question: "P, Q, and R share profits in the ratio 5:3:2. R dies on 30th June 2025. Accounts are closed on 31st March every year. Sales for the year ended 31st March 2025 were ₹6,00,000 and profit was ₹1,20,000. Sales from 1st April 2025 to 30th June 2025 were ₹2,00,000. Calculate R's share of profit till the date of death.",
        options: [
          { id: "A", text: "₹8,000" },
          { id: "B", text: "₹12,000" },
          { id: "C", text: "₹40,000" },
          { id: "D", text: "₹6,000" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Profit percentage on sales in previous year = (₹1,20,000 / ₹6,00,000) × 100 = 20%.",
          "Step 2: Estimated profit for the 3 months (sales = ₹2,00,000) = ₹2,00,000 × 20% = ₹40,000.",
          "Step 3: R's profit sharing ratio = 2/10 = 1/5.",
          "Step 4: R's share of profit till death = ₹40,000 × (2/10) = ₹8,000.",
          "Step 5: Option A is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Gaining Ratio from New PSR",
        frequency: "Very High",
        typicalStem: "A, B, and C are partners sharing in ratio 4:3:2. B retires and his share is taken over by A and C equally. What is the new ratio?",
        strategy: "A's gain = 3/9 × 1/2 = 3/18. A's new = 4/9 + 3/18 = 11/18. C's new = 2/9 + 3/18 = 7/18. New ratio = 11:7.",
      },
      {
        patternType: "P&L Suspense Account Usage",
        frequency: "High",
        typicalStem: "Which account is debited to record the interim share of profit given to a deceased partner when the continuing partners' ratio does not change?",
        strategy: "Profit and Loss Suspense Account.",
      },
    ],
    commonTraps: [
      {
        concept: "Revaluation Profit Ratio",
        misconception: "Distributing revaluation profit among ALL partners including the newly admitted partner.",
        correctUnderstanding: "Revaluation profit belongs strictly to the **OLD partners in their OLD profit-sharing ratio** because the appreciation occurred prior to admission.",
      },
      {
        concept: "Goodwill Premium Withdrawal",
        misconception: "Confusing credit of premium to sacrificing partners with actual cash withdrawal.",
        correctUnderstanding: "Crediting premium increases capital. Partners may withdraw cash only if the problem explicitly says 'and was withdrawn by the old partners' (then Partners' Capital Dr. to Bank).",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Sacrificing vs Gaining Formula",
        mnemonic: "SON: Sacrificing = Old - New. GNO: Gaining = New - Old.",
        explanation: "Simple acronym to avoid reversing fractions during exam pressure.",
      },
      {
        title: "Revaluation Golden Rule",
        mnemonic: "Good news on Credit (+), Bad news on Debit (-).",
        explanation: "Asset increase/Liability decrease = Credit; Asset decrease/Liability increase = Debit.",
      },
    ],
    quickRevisionCard: {
      title: "Admission, Retirement & Death — Quick Card",
      bulletPoints: [
        "Sacrificing Ratio = Old - New; Gaining Ratio = New - Old.",
        "Premium for Goodwill is distributed to Sacrificing Partners in Sacrificing Ratio.",
        "Revaluation A/c profit/loss belongs to Old Partners in Old Ratio.",
        "WCR / IFR excess is distributed to Old Partners in Old Ratio.",
        "Retirement: Retiring partner's goodwill is debited to Gaining Partners in Gaining Ratio.",
        "Death: Interim profit debited to P&L Suspense A/c (if continuing PSR unchanged).",
        "Section 37: Unpaid executor gets 6% p.a. interest OR share of subsequent profits.",
        "Hidden Goodwill = Total Capital of new firm based on new partner minus combined actual capital.",
      ],
    },
    practiceQuestions: [
      {
        id: "accountancy_u2_t1_q1",
        question: "When a new partner brings cash for goodwill, the amount is credited to:",
        options: [
          { id: "A", text: "Premium for Goodwill Account" },
          { id: "B", text: "New Partner's Capital Account" },
          { id: "C", text: "Revaluation Account" },
          { id: "D", text: "Profit & Loss Appropriation Account" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "When cash is brought in for goodwill by the new partner, the entry is Cash/Bank A/c Dr. to Premium for Goodwill A/c.",
      },
      {
        id: "accountancy_u2_t1_q2",
        question: "Premium for goodwill brought in by a newly admitted partner is shared by old partners in their:",
        options: [
          { id: "A", text: "Old Profit Sharing Ratio" },
          { id: "B", text: "Sacrificing Ratio" },
          { id: "C", text: "New Profit Sharing Ratio" },
          { id: "D", text: "Capital Ratio" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The premium for goodwill is compensation paid by incoming partner to existing partners for surrendering part of their profit share; hence it is credited in Sacrificing Ratio.",
      },
      {
        id: "accountancy_u2_t1_q3",
        question: "Revaluation Account is a:",
        options: [
          { id: "A", text: "Real Account" },
          { id: "B", text: "Personal Account" },
          { id: "C", text: "Nominal Account" },
          { id: "D", text: "Representative Personal Account" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Revaluation Account is a nominal account prepared to ascertain net gain or loss arising from revaluation of assets and reassessment of liabilities.",
      },
      {
        id: "accountancy_u2_t1_q4",
        question: "At the time of admission of a partner, unrecorded investment of ₹10,000 is accounted for by:",
        options: [
          { id: "A", text: "Crediting Revaluation Account" },
          { id: "B", text: "Debiting Revaluation Account" },
          { id: "C", text: "Debiting Old Partners' Capital Accounts" },
          { id: "D", text: "Crediting New Partner's Capital Account" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "An unrecorded asset increases the net worth of the business; hence Unrecorded Investment A/c is debited and Revaluation Account is credited.",
      },
      {
        id: "accountancy_u2_t1_q5",
        question: "X, Y, and Z are partners sharing profits in the ratio 3:2:1. Z retires. The gaining ratio of X and Y will be:",
        options: [
          { id: "A", text: "3 : 2" },
          { id: "B", text: "1 : 1" },
          { id: "C", text: "2 : 3" },
          { id: "D", text: "3 : 1" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "If no information is given regarding the acquisition of retiring partner's share, the remaining partners share profits in their old relative ratio (3:2), which is also their gaining ratio.",
      },
      {
        id: "accountancy_u2_t1_q6",
        question: "Under Section 37 of the Indian Partnership Act 1932, if the dues of a deceased partner are not settled immediately, the executor is entitled to interest on the unpaid amount at:",
        options: [
          { id: "A", text: "12% per annum" },
          { id: "B", text: "6% per annum" },
          { id: "C", text: "10% per annum" },
          { id: "D", text: "Bank lending rate" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Under Section 37, the outgoing/deceased partner's executor is entitled to interest @ 6% p.a. on the unsettled amount or a proportionate share of subsequent profits.",
      },
      {
        id: "accountancy_u2_t1_q7",
        question: "A and B share profits in ratio 3:2. C is admitted with 1/4th share. C brings ₹40,000 as capital. The total capital of the new firm based on C's share is:",
        options: [
          { id: "A", text: "₹1,60,000" },
          { id: "B", text: "₹1,20,000" },
          { id: "C", text: "₹1,00,000" },
          { id: "D", text: "₹2,00,000" },
        ],
        correctOption: "A",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "easy",
        explanation: "Total capital = C's capital × reciprocal of C's share = ₹40,000 × (4/1) = ₹1,60,000.",
      },
      {
        id: "accountancy_u2_t1_q8",
        question: "General Reserve appearing in the Balance Sheet at the time of admission of a new partner is transferred to:",
        options: [
          { id: "A", text: "Revaluation Account" },
          { id: "B", text: "Old Partners' Capital Accounts in Old Ratio" },
          { id: "C", text: "All Partners' Capital Accounts in New Ratio" },
          { id: "D", text: "Profit & Loss Account" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "General Reserve is an accumulated profit created out of past earnings before admission; it belongs solely to old partners and is transferred to their Capital Accounts in their old ratio.",
      },
      {
        id: "accountancy_u2_t1_q9",
        question: "On the death of a partner, the balance in his capital account is finally transferred to:",
        options: [
          { id: "A", text: "Deceased Partner's Executor's Account" },
          { id: "B", text: "Continuing Partners' Capital Accounts" },
          { id: "C", text: "Realisation Account" },
          { id: "D", text: "Cash Account" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Since the deceased partner is no longer alive, the net amount payable is transferred to Deceased Partner's Executor's Account.",
      },
      {
        id: "accountancy_u2_t1_q10",
        question: "If continuing partners decide to change their profit sharing ratio among themselves after retirement of a partner, the goodwill of the retiring partner is debited to continuing partners in:",
        options: [
          { id: "A", text: "Old Profit Sharing Ratio" },
          { id: "B", text: "New Profit Sharing Ratio" },
          { id: "C", text: "Gaining Ratio" },
          { id: "D", text: "Equal Ratio" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Whenever there is a change in profit share, the gaining partners compensate the sacrificing/retiring partner in their gaining ratio (Gaining Partners' Capital Dr. to Retiring Partner's Capital).",
      },
    ],
  },

  // Unit 3: Realisation Account, Settlement of Accounts (Dissolution of Partnership Firm)
  {
    id: "accountancy_u3_t1",
    slug: "realisation-account-settlement-of-accounts",
    subject: "accountancy",
    subjectName: "Accountancy",
    subjectCode: "301",
    unitNumber: 3,
    unitTitle: "Dissolution of a Partnership Firm",
    topicTitle: "Realisation Account, Settlement of Accounts",
    ncertReference: {
      class: "Class 12",
      book: "Accountancy — Partnership Accounts",
      chapterNumber: 3,
      chapterName: "Dissolution of a Partnership Firm",
      sections: [
        "3.1 Dissolution of Partnership vs Dissolution of Firm",
        "3.2 Settlement of Accounts as per Section 48 of the Indian Partnership Act, 1932",
        "3.3 Accounting Treatment on Dissolution (Realisation Account, Partner's Loan A/c, Capital A/cs, Cash/Bank A/c)",
        "3.4 Realisation of Assets and Settlement of Liabilities (including Unrecorded)",
        "3.5 Treatment of Partner's Loan and Realisation Expenses",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (6-8 questions per shift)",
      totalPyqsInRepo: 250,
      weightagePercentage: 14,
    },
    summary30Seconds: [
      "Dissolution of Partnership ends the old relation but business continues; Dissolution of Firm terminates business completely, closes all books, realizes assets, and pays off liabilities.",
      "Section 48 priority order of payment: 1. Third-party outside debts, 2. Partner's loans/advances, 3. Partner's capital balances, 4. Surplus divided in PSR.",
      "Realisation Account: All assets (except cash/bank and fictitious losses) and all outside liabilities (including provisions) transferred at book value. Assets taken over by partner credited to Realisation A/c at agreed value.",
    ],
    coreConcepts: [
      {
        title: "Dissolution of Partnership vs Dissolution of Firm & Section 48",
        content: `**Key Distinctions**:
- **Dissolution of Partnership**: Reconstitution (admission, retirement, change in PSR). Business continues under a new agreement; books are NOT closed; Revaluation A/c is prepared.
- **Dissolution of Firm**: Complete breakdown of partnership relation among ALL partners. Business ceases; books of accounts are closed permanently; assets are sold and liabilities paid; **Realisation A/c** is prepared.

**Order of Payment under Section 48 of the Indian Partnership Act, 1932**:
In settling the accounts of a firm after dissolution, the following order of payment is legally mandatory:
1. First, pay off all **debts of the firm to third parties / outside creditors** (Bank overdraft, sundry creditors, bills payable, loan from partner's wife).
2. Second, pay each partner ratably for **advances/loans made by partners** beyond capital.
3. Third, pay each partner ratably what is due on account of **capital balances**.
4. Fourth, the residue (if any) is divided among partners in their **profit-sharing ratio**.

*Firm's Debts vs Private Debts (Section 49)*: Firm's property is applied first in payment of firm's debts; private property of partner applied first in payment of his private debts.`,
        ncertPointers: [
          "Loan from partner's wife is an OUTSIDE liability (paid before partner's own loan).",
          "Partner's loan is NOT transferred to Realisation Account; it is settled directly through Partner's Loan Account.",
        ],
      },
      {
        title: "Realisation Account Preparation & Rules",
        content: `**Realisation Account**: A nominal account prepared to ascertain net profit or loss on the disposal of assets and discharge of liabilities upon dissolution.

**Step 1: Transfer of Assets at Book Value (Debit Realisation A/c)**:
- Transfer all tangible and intangible assets (Goodwill, Land, Debtors at gross value, Stock, Machinery).
- **DO NOT transfer**: Cash/Bank balances, debit balance of P&L A/c, deferred advertisement expenditure, partner's loan.

**Step 2: Transfer of Liabilities at Book Value (Credit Realisation A/c)**:
- Transfer all outside third-party liabilities (Creditors, Bills Payable, Bank Loan, Outstanding Expenses, Partner's Wife's Loan).
- Transfer all contra provisions: Provision for Doubtful Debts, Provision for Depreciation, Investment Fluctuation Reserve.
- **DO NOT transfer**: Partner's Capital, Partner's Current A/c, Partner's Loan, General Reserve, P&L credit balance.

**Step 3: Realisation of Assets & Liabilities**:
- Sale of assets in cash: $\\text{Bank A/c Dr. to Realisation A/c}$.
- Asset taken over by a partner: $\\text{Partner's Capital A/c Dr. to Realisation A/c}$.
- Payment of liabilities: $\\text{Realisation A/c Dr. to Bank A/c}$.
- Liability assumed by partner: $\\text{Realisation A/c Dr. to Partner's Capital A/c}$.
- **CRITICAL RULE**: If an asset is given to a creditor in full/partial satisfaction of claim, **NO JOURNAL ENTRY** is passed for the settled amount!`,
        ncertPointers: [
          "If the question is silent about the realisation of an intangible asset (Goodwill, Patent), it is assumed to realise ZERO.",
          "If the question is silent about an outside liability, it MUST be paid in full at book value.",
        ],
      },
      {
        title: "Realisation Expenses Accounting Matrix",
        content: `Accounting for realization expenses depends on **who bears** and **who pays**:

1. **Firm bears and firm pays**:
   $$\\text{Realisation A/c Dr. to Bank A/c}$$
2. **Firm bears and partner pays on behalf of firm**:
   $$\\text{Realisation A/c Dr. to Partner's Capital A/c}$$
3. **Partner bears (paid a fixed remuneration) and firm pays**:
   - For remuneration: $\\text{Realisation A/c Dr. to Partner's Capital A/c}$
   - For actual expenses paid by firm: $\\text{Partner's Capital A/c Dr. to Bank A/c}$
4. **Partner bears and partner pays**:
   **NO ENTRY** in firm's books.`,
        ncertPointers: [
          "Realisation Account closes with a balancing figure (Profit/Loss), transferred to all partners in their PSR.",
          "The Cash/Bank Account and Partners' Capital Accounts must tally automatically without any remaining balance.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Section 48 Settlement Hierarchy",
        formula: "1. \\text{Outside Creditors} \\to 2. \\text{Partner's Loan} \\to 3. \\text{Partner's Capital} \\to 4. \\text{Surplus in PSR}",
        symbols: "Section 48 Indian Partnership Act 1932",
        siUnits: "Priority order",
        applicationCondition: "Dissolution of partnership firm",
      },
      {
        name: "Creditor Taking Asset Rule",
        formula: "\\text{Creditor Accepts Asset in Full Settlement} \\implies \\text{\\textbf{NO JOURNAL ENTRY}}",
        symbols: "Realisation A/c contra elimination",
        siUnits: "Zero ledger entry",
        applicationCondition: "In-kind debt settlement during dissolution",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Dissolution of Firm: Section 48 Settlement Flowchart</text>
  
  <!-- Step 1 -->
  <rect x="40" y="80" width="150" height="150" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2"/>
  <text x="115" y="105" textAnchor="middle" fill="#fda4af" fontSize="13" fontWeight="bold">Step 1: Outside</text>
  <text x="115" y="125" textAnchor="middle" fill="#fda4af" fontSize="13" fontWeight="bold">Creditors</text>
  <text x="115" y="155" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Trade Creditors</text>
  <text x="115" y="175" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Bills Payable</text>
  <text x="115" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Partner's Wife Loan</text>
  <text x="115" y="215" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Bank Overdraft</text>
  
  <!-- Arrow 1 -->
  <path d="M 195,155 L 215,155" stroke="#94a3b8" strokeWidth="3" marker-end="url(#arrow)"/>
  
  <!-- Step 2 -->
  <rect x="220" y="80" width="150" height="150" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
  <text x="295" y="105" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Step 2: Partner</text>
  <text x="295" y="125" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Loan Accounts</text>
  <text x="295" y="160" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Ratably paid</text>
  <text x="295" y="180" textAnchor="middle" fill="#cbd5e1" fontSize="11">• NOT through Realisation A/c</text>
  <text x="295" y="200" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Prior to Capital</text>
  
  <!-- Arrow 2 -->
  <path d="M 375,155 L 395,155" stroke="#94a3b8" strokeWidth="3"/>
  
  <!-- Step 3 -->
  <rect x="400" y="80" width="150" height="150" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="475" y="105" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">Step 3: Partner</text>
  <text x="475" y="125" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">Capitals</text>
  <text x="475" y="160" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Capital balances</text>
  <text x="475" y="180" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Ratably if deficient</text>
  <text x="475" y="200" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Deficit met by partner</text>
  
  <!-- Arrow 3 -->
  <path d="M 555,155 L 575,155" stroke="#94a3b8" strokeWidth="3"/>
  
  <!-- Step 4 -->
  <rect x="580" y="80" width="140" height="150" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="650" y="105" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Step 4: Surplus</text>
  <text x="650" y="125" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Divided</text>
  <text x="650" y="165" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Remaining cash</text>
  <text x="650" y="185" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Divided in PSR</text>
  <text x="650" y="205" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">Accounts Tally</text>
</svg>`,
    workedExamples: [
      {
        id: "accountancy_u3_t1_we1",
        questionNumber: 1,
        question: "A firm is dissolved. Creditors of ₹80,000 accepted machinery of book value ₹1,00,000 at an agreed value of ₹75,000 in partial satisfaction of their claim, and the remaining balance was paid in cash. What is the amount debited to Realisation Account for cash payment?",
        options: [
          { id: "A", text: "₹5,000" },
          { id: "B", text: "₹25,000" },
          { id: "C", text: "₹20,000" },
          { id: "D", text: "₹80,000" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Total creditor claim = ₹80,000.",
          "Step 2: Creditors accept machinery at agreed value of ₹75,000. No journal entry is required for the machinery settlement.",
          "Step 3: Remaining unpaid creditor balance = ₹80,000 - ₹75,000 = ₹5,000.",
          "Step 4: This balance is paid in cash: Realisation A/c Dr. to Bank A/c ₹5,000.",
          "Step 5: Hence, ₹5,000 is debited to Realisation Account. Option A is exact.",
        ],
      },
      {
        id: "accountancy_u3_t1_we2",
        questionNumber: 2,
        question: "On dissolution of a firm, partner Mohan was appointed to look after dissolution work for which he was allowed a remuneration of ₹10,000. Mohan agreed to bear the realisation expenses. Actual realisation expenses of ₹6,000 were paid by the firm out of bank account. What are the journal entries?",
        options: [
          { id: "A", text: "Realisation A/c Dr. ₹10,000 to Mohan's Capital A/c; and Mohan's Capital A/c Dr. ₹6,000 to Bank A/c" },
          { id: "B", text: "Realisation A/c Dr. ₹16,000 to Bank A/c" },
          { id: "C", text: "Realisation A/c Dr. ₹10,000 to Bank A/c" },
          { id: "D", text: "Mohan's Capital A/c Dr. ₹10,000 to Realisation A/c" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Firm is liable to pay Mohan remuneration of ₹10,000 $\\implies$ Realisation A/c Dr. ₹10,000 to Mohan's Capital A/c.",
          "Step 2: Mohan agreed to bear the expenses, but firm paid ₹6,000 on his behalf $\\implies$ Mohan's Capital A/c Dr. ₹6,000 to Bank A/c.",
          "Step 3: Option A is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Creditor Taking Asset No-Entry Trap",
        frequency: "Very High",
        typicalStem: "A creditor of ₹50,000 accepted an unrecorded asset valued at ₹45,000 in full settlement. What entry is recorded in the Realisation Account?",
        strategy: "NO ENTRY! When a creditor accepts an asset in settlement, no journal entry is passed.",
      },
      {
        patternType: "Order of Payment Section 48 Identification",
        frequency: "High",
        typicalStem: "Arrange in proper order of payment at the time of dissolution: (A) Partner's capital (B) Partner's loan (C) Outside creditors (D) Surplus to partners.",
        strategy: "Outside creditors (C) $\\to$ Partner's loan (B) $\\to$ Partner's capital (A) $\\to$ Surplus (D).",
      },
    ],
    commonTraps: [
      {
        concept: "Partner's Loan in Realisation Account",
        misconception: "Transferring partner's loan to Realisation Account.",
        correctUnderstanding: "Partner's loan is NOT an outside liability. It is never transferred to Realisation Account; it is paid directly through Partner's Loan A/c (Partner's Loan A/c Dr. to Bank).",
      },
      {
        concept: "Unrecorded Asset Realisation",
        misconception: "Debiting unrecorded asset to Realisation A/c before sale.",
        correctUnderstanding: "Unrecorded assets are not brought into books first; their sale is credited directly to Realisation A/c (Bank A/c Dr. to Realisation A/c).",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Section 48 Order",
        mnemonic: "C-L-C-S: Creditors $\\to$ Loans (Partner) $\\to$ Capitals $\\to$ Surplus.",
        explanation: "Never fail an ordering MCQ on Section 48 in CUET.",
      },
    ],
    quickRevisionCard: {
      title: "Dissolution of Firm — Quick Revision Card",
      bulletPoints: [
        "Dissolution of firm closes all accounts; Realisation Account is prepared.",
        "Cash/Bank and accumulated losses (fictitious assets) NOT transferred to Realisation A/c.",
        "Section 48 priority: 1. Third-party debts, 2. Partner's loans, 3. Capital, 4. Surplus.",
        "Partner's wife's loan is a THIRD-PARTY liability (transferred to Realisation A/c).",
        "Asset accepted by creditor in full/partial settlement $\\implies$ NO ENTRY for that portion.",
        "If question is silent: Tangible asset realizes book value, Intangible realizes NIL.",
        "If question is silent on liability: Must be paid in full at book value.",
      ],
    },
    practiceQuestions: [
      {
        id: "accountancy_u3_t1_q1",
        question: "On dissolution of a partnership firm, which of the following is NOT transferred to the Realisation Account?",
        options: [
          { id: "A", text: "Goodwill" },
          { id: "B", text: "Partner's Loan Account" },
          { id: "C", text: "Sundry Debtors" },
          { id: "D", text: "Bills Payable" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "A partner's loan is an internal advance paid after outside liabilities but before capital; it is not transferred to Realisation Account.",
      },
      {
        id: "accountancy_u3_t1_q2",
        question: "According to Section 48 of the Indian Partnership Act 1932, which liability is paid first out of assets realized on dissolution?",
        options: [
          { id: "A", text: "Partner's loan" },
          { id: "B", text: "Partner's capital" },
          { id: "C", text: "Debts of the firm to third parties" },
          { id: "D", text: "Surplus profit distribution" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Debts of the firm to third parties (outside creditors) must be paid first.",
      },
      {
        id: "accountancy_u3_t1_q3",
        question: "On dissolution, if a creditor accepts an asset of the firm in full settlement of his claim, the journal entry passed is:",
        options: [
          { id: "A", text: "Realisation A/c Dr. to Creditors A/c" },
          { id: "B", text: "Creditors A/c Dr. to Realisation A/c" },
          { id: "C", text: "No entry is passed" },
          { id: "D", text: "Bank A/c Dr. to Realisation A/c" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Both asset and liability have already been transferred to Realisation Account; when one cancels out the other, no further entry is required.",
      },
      {
        id: "accountancy_u3_t1_q4",
        question: "An unrecorded liability of ₹5,000 settled at the time of dissolution is recorded by:",
        options: [
          { id: "A", text: "Debiting Realisation Account and crediting Bank Account" },
          { id: "B", text: "Debiting Bank Account and crediting Realisation Account" },
          { id: "C", text: "Debiting Partner's Capital Account and crediting Bank" },
          { id: "D", text: "No entry is passed" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Payment of an unrecorded liability reduces bank balance and increases loss on realization: Realisation A/c Dr. to Bank A/c.",
      },
      {
        id: "accountancy_u3_t1_q5",
        question: "Loan from partner's spouse (e.g. loan from Mrs. A) is treated on dissolution as:",
        options: [
          { id: "A", text: "Partner's loan" },
          { id: "B", text: "An outside liability and transferred to Realisation Account" },
          { id: "C", text: "An internal reserve" },
          { id: "D", text: "Deduction from partner's capital" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Spouse is a separate legal person; loan from partner's wife is a third-party outside debt, transferred to Realisation Account and paid along with other creditors.",
      },
      {
        id: "accountancy_u3_t1_q6",
        question: "If total assets at book value are ₹5,00,000, outside liabilities are ₹2,00,000, and assets realized 110% while liabilities were settled at a discount of 5%, what is the profit/loss on realization?",
        options: [
          { id: "A", text: "Profit of ₹60,000" },
          { id: "B", text: "Profit of ₹50,000" },
          { id: "C", text: "Loss of ₹10,000" },
          { id: "D", text: "Profit of ₹40,000" },
        ],
        correctOption: "A",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "medium",
        explanation: "Gain on assets = ₹5,00,000 × 10% = ₹50,000. Gain on liabilities (discount) = ₹2,00,000 × 5% = ₹10,000. Total realization profit = ₹50,000 + ₹10,000 = ₹60,000.",
      },
      {
        id: "accountancy_u3_t1_q7",
        question: "At the time of dissolution, Provision for Doubtful Debts appearing against debtors in the Balance Sheet is:",
        options: [
          { id: "A", text: "Credited to Realisation Account" },
          { id: "B", text: "Debited to Realisation Account" },
          { id: "C", text: "Transferred to Partners' Capital Accounts" },
          { id: "D", text: "Paid in cash" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Debtors are transferred at gross value on debit side of Realisation Account, and Provision for Doubtful Debts is transferred to the credit side of Realisation Account.",
      },
      {
        id: "accountancy_u3_t1_q8",
        question: "When a partner takes over an unrecorded asset at an agreed value of ₹15,000, the entry is:",
        options: [
          { id: "A", text: "Partner's Capital A/c Dr. ₹15,000 to Realisation A/c" },
          { id: "B", text: "Realisation A/c Dr. ₹15,000 to Partner's Capital A/c" },
          { id: "C", text: "Bank A/c Dr. ₹15,000 to Realisation A/c" },
          { id: "D", text: "No entry is passed" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Partner's capital account is debited because the partner receives an asset, and Realisation Account is credited.",
      },
      {
        id: "accountancy_u3_t1_q9",
        question: "Realisation expenses of ₹8,000 were to be borne by partner X for a fixed remuneration of ₹10,000. The expenses were actually paid by partner X personally. What is the amount debited to Realisation Account?",
        options: [
          { id: "A", text: "₹10,000" },
          { id: "B", text: "₹8,000" },
          { id: "C", text: "₹18,000" },
          { id: "D", text: "₹2,000" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "The firm is only responsible for the agreed remuneration of ₹10,000 (Realisation A/c Dr. to X's Capital A/c). Since X bore and paid the ₹8,000 expense himself, no entry is passed for that.",
      },
      {
        id: "accountancy_u3_t1_q10",
        question: "The final balance of the Realisation Account represents:",
        options: [
          { id: "A", text: "Cash balance available" },
          { id: "B", text: "Profit or loss on realisation, transferred to partners in their PSR" },
          { id: "C", text: "Capital due to partners" },
          { id: "D", text: "Amount paid to creditors" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The balancing figure of Realisation Account is net profit or loss on realization, transferred to all partners' capital accounts in their profit-sharing ratio.",
      },
    ],
  },
];
