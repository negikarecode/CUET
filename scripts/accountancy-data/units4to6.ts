import { NoteDocument } from "@/types/notes";

export const accountancyUnits4to6Topics: NoteDocument[] = [
  // Unit 4: Issue, Forfeiture and Reissue of Shares, Issue and Redemption of Debentures
  {
    id: "accountancy_u4_t1",
    slug: "issue-forfeiture-and-reissue-of-shares-issue-and-redemption-of-debentures",
    subject: "accountancy",
    subjectName: "Accountancy",
    subjectCode: "301",
    unitNumber: 4,
    unitTitle: "Accounting for Companies: Shares and Debentures",
    topicTitle: "Issue, Forfeiture and Reissue of Shares, Issue and Redemption of Debentures",
    ncertReference: {
      class: "Class 12",
      book: "Accountancy — Company Accounts and Analysis of Financial Statements",
      chapterNumber: 1,
      chapterName: "Accounting for Share Capital & Issue and Redemption of Debentures",
      sections: [
        "1.1 Nature and Classes of Shares (Equity vs Preference)",
        "1.2 Issue of Shares at Par and Premium (Section 52(2) Uses of Securities Premium)",
        "1.3 Calls-in-Arrears & Calls-in-Advance (Table F Interest Rates: 10% and 12%)",
        "1.4 Over-subscription & Pro-rata Allotment",
        "1.5 Forfeiture of Shares & Re-issue of Forfeited Shares (Transfer to Capital Reserve)",
        "2.1 Meaning and Types of Debentures (Issue of Debentures with Redemption Conditions)",
        "2.2 Issue of Debentures as Collateral Security",
        "2.3 Writing off Discount/Loss on Issue of Debentures",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Highest numerical weightage in Accountancy (10-12 questions per shift)",
      totalPyqsInRepo: 340,
      weightagePercentage: 18,
    },
    summary30Seconds: [
      "Securities Premium utilization (Section 52(2)): 1. Issue fully paid bonus shares, 2. Write off preliminary expenses, 3. Write off share/debenture issue expenses/commission/discount, 4. Premium on redemption of preference shares/debentures, 5. Buy-back of shares.",
      "Pro-rata Allotment: Excess application money is adjusted towards allotment; on forfeiture, Share Capital A/c is debited with CALLED-UP value, Share Forfeiture credited with amount ACTUALLY RECEIVED.",
      "Capital Reserve on Re-issue: Profit on reissue of forfeited shares = (Credit in Forfeiture per share - Discount on reissue per share) $\\times$ Number of shares REISSUED.",
    ],
    coreConcepts: [
      {
        title: "Share Capital: Classes, Pro-Rata Allotment & Calls",
        content: `**Share Capital Categories**:
1. **Authorized (Nominal) Capital**: Maximum share capital stated in Memorandum of Association.
2. **Issued Capital**: Part of authorized capital offered to the public for subscription.
3. **Subscribed Capital**:
   - *Subscribed and fully paid-up*: All calls made and paid in full.
   - *Subscribed but not fully paid-up*: Calls made but in arrears, or company has not called up full face value.

**Calls-in-Arrears and Calls-in-Advance (Table F of Companies Act 2013)**:
- **Calls-in-Arrears**: Money called but not received. Interest charged up to **10% p.a.**
- **Calls-in-Advance**: Money received prior to call. Interest paid up to **12% p.a.** (paid even if there is no profit).

**Pro-Rata Allotment**:
When shares are over-subscribed, allotment is made proportionately.
$$\\text{Allotment Ratio} = \\frac{\\text{Shares Allotted}}{\\text{Shares Applied}}$$
$$\\text{Excess Application Money} = (\\text{Applied} - \\text{Allotted}) \\times \\text{Application Money per share}$$
Excess is adjusted towards allotment and calls as per agreement.`,
        ncertPointers: [
          "Minimum Subscription (Section 39): 90% of the issued amount must be subscribed within 30 days of prospectus issue; otherwise application money must be refunded within 15 days.",
          "Securities Premium Account cannot be used for paying dividends or general reserves.",
        ],
      },
      {
        title: "Forfeiture & Re-issue of Shares & Capital Reserve",
        content: `**Journal Entry for Forfeiture of Shares**:
$$\\text{Share Capital A/c Dr. [No. of shares } \\times \\text{\\textbf{Called-up value per share}}]$$
$$\\text{Securities Premium A/c Dr. [If premium was NOT received]}$$
$$\\quad \\text{To Calls-in-Arrears A/c [Unpaid calls amount]}$$
$$\\quad \\text{To Share Forfeiture A/c [Amount \\textbf{already received} excluding premium]}$$

*Rule for Securities Premium*:
- If premium was **already received**: DO NOT reverse/debit Securities Premium.
- If premium was **not received**: DEBIT Securities Premium A/c.

**Re-issue of Forfeited Shares**:
- Shares can be reissued at par, premium, or discount.
- **Maximum Permissible Discount on Re-issue**: Cannot exceed the amount forfeited (credited to Share Forfeiture A/c) on those reissued shares.
- Re-issue at discount:
  $$\\text{Bank A/c Dr. [Amount received]}$$
  $$\\text{Share Forfeiture A/c Dr. [Discount on reissue]}$$
  $$\\quad \\text{To Share Capital A/c [Paid-up value]}$$

**Transfer to Capital Reserve**:
$$\\text{Capital Reserve} = \\left( \\frac{\\text{Total Forfeited Amount}}{\\text{Total Forfeited Shares}} \\times \\text{Shares Reissued} \\right) - \\text{Discount on Re-issue}$$
$$\\text{Share Forfeiture A/c Dr. to Capital Reserve A/c}$$`,
        ncertPointers: [
          "Balance left in Share Forfeiture Account (for shares not yet reissued) is shown under Share Capital as an addition to Subscribed Capital in the Balance Sheet.",
        ],
      },
      {
        title: "Debentures: Issue Conditions & Collateral Security",
        content: `**Issue of Debentures with Redemption Conditions (6 Cases)**:
1. Issued at Par, Redeemable at Par: Standard par entry.
2. Issued at Discount, Redeemable at Par: Discount on Issue of Debentures Dr.
3. Issued at Premium, Redeemable at Par: Securities Premium Cr.
4. Issued at Par, Redeemable at Premium:
   $$\\text{Loss on Issue of Debentures A/c Dr. to Premium on Redemption of Debentures A/c}$$
5. Issued at Discount, Redeemable at Premium:
   $$\\text{Loss on Issue A/c Dr. [Discount + Redemption Premium]}$$
   $$\\quad \\text{To Debentures A/c [Face value]}$$
   $$\\quad \\text{To Premium on Redemption A/c [Redemption Premium]}$$
6. Issued at Premium, Redeemable at Premium:
   $$\\text{Loss on Issue A/c Dr. [Redemption Premium] to Premium on Redemption A/c [Redemption Premium]}$$

**Debentures as Collateral Security**:
- Secondary security given to bank against a loan in addition to principal security.
- Two methods:
  - *Method 1*: No journal entry; only a footnote in Balance Sheet under Long-Term Borrowings.
  - *Method 2*: $\\text{Debenture Suspense A/c Dr. to Debentures A/c}$ (Debenture Suspense is deducted from Debentures in Balance Sheet).`,
        ncertPointers: [
          "Premium on Redemption of Debentures is a personal liability account shown under Non-Current / Other Current Liabilities.",
          "Loss on Issue of Debentures must be written off in the year of issue using Securities Premium first, then P&L statement.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Capital Reserve Formula",
        formula: "\\text{Capital Reserve} = (\\text{Forfeited Amount per share} - \\text{Discount on Reissue per share}) \\times \\text{No. of Shares Reissued}",
        symbols: "Forfeiture and reissue profit transfer",
        siUnits: "INR",
        applicationCondition: "Reissue of forfeited shares",
      },
      {
        name: "Section 52(2) Permissible Uses of Securities Premium",
        formula: "\\text{1. Fully paid bonus shares; 2. Prelim expenses; 3. Issue expenses/commission; 4. Redemption premium; 5. Buy-back}",
        symbols: "5 statutory uses",
        siUnits: "Statutory provisions",
        applicationCondition: "Corporate balance sheet allocation",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Share Forfeiture & Re-issue Accounting Logic</text>
  
  <!-- Step 1: Forfeiture -->
  <rect x="50" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5"/>
  <text x="205" y="90" textAnchor="middle" fill="#fda4af" fontSize="13" fontWeight="bold">Step 1: Forfeiture Entry</text>
  
  <text x="70" y="120" fill="#fca5a5" fontSize="11"><tspan fill="#38bdf8" fontWeight="bold">Share Capital Dr.</tspan> [Shares × Called-up Value]</text>
  <text x="70" y="145" fill="#fca5a5" fontSize="11"><tspan fill="#38bdf8" fontWeight="bold">Securities Premium Dr.</tspan> [Only if NOT received]</text>
  <text x="90" y="175" fill="#cbd5e1" fontSize="11">• <tspan fill="#fbbf24" fontWeight="bold">To Calls-in-Arrears</tspan> [Unpaid Calls]</text>
  <text x="90" y="200" fill="#cbd5e1" fontSize="11">• <tspan fill="#34d399" fontWeight="bold">To Share Forfeiture</tspan> [Amount RECEIVED]</text>
  <text x="70" y="235" fill="#94a3b8" fontSize="10">*Never credit securities premium to Share Forfeiture</text>
  <text x="70" y="255" fill="#94a3b8" fontSize="10">*Max Discount on Reissue = Share Forfeiture per share</text>
  
  <!-- Step 2: Re-issue & Capital Reserve -->
  <rect x="400" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5"/>
  <text x="555" y="90" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Step 2: Re-issue &amp; Capital Reserve</text>
  
  <rect x="420" y="110" width="270" height="40" rx="6" fill="#0f172a" stroke="#3b82f6"/>
  <text x="555" y="127" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Bank A/c Dr. [Amount received]</text>
  <text x="555" y="142" textAnchor="middle" fill="#f87171" fontSize="10">Share Forfeiture Dr. [Discount on Reissue]</text>
  
  <rect x="420" y="165" width="270" height="50" rx="6" fill="#0f172a" stroke="#10b981"/>
  <text x="555" y="185" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">To Capital Reserve:</text>
  <text x="555" y="203" textAnchor="middle" fill="#cbd5e1" fontSize="10">(Credit in Forfeiture - Discount) × Shares Reissued</text>
  
  <text x="555" y="245" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Share Forfeiture A/c Dr. to Capital Reserve</text>
</svg>`,
    workedExamples: [
      {
        id: "accountancy_u4_t1_we1",
        questionNumber: 1,
        question: "A company forfeited 1,000 shares of ₹10 each, fully called up, on which the shareholder had paid ₹3 on application and ₹2 on allotment, but failed to pay the first & final call of ₹5. Out of these, 600 shares were reissued as fully paid-up for ₹8 per share. What is the amount transferred to Capital Reserve?",
        options: [
          { id: "A", text: "₹1,800" },
          { id: "B", text: "₹3,000" },
          { id: "C", text: "₹1,200" },
          { id: "D", text: "₹2,400" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Amount forfeited per share = ₹3 (application) + ₹2 (allotment) = ₹5 per share.",
          "Step 2: Reissue price = ₹8 per share (fully paid ₹10 share) $\\implies$ Discount on reissue = ₹10 - ₹8 = ₹2 per share.",
          "Step 3: Profit on reissue per share = Forfeited amount per share - Discount on reissue = ₹5 - ₹2 = ₹3 per share.",
          "Step 4: Number of shares reissued = 600 shares.",
          "Step 5: Amount transferred to Capital Reserve = 600 × ₹3 = ₹1,800. Option A is exact.",
        ],
      },
      {
        id: "accountancy_u4_t1_we2",
        questionNumber: 2,
        question: "XYZ Ltd. issued 10,000, 9% Debentures of ₹100 each at a discount of 5%, redeemable at a premium of 10% after 5 years. What is the total amount debited to 'Loss on Issue of Debentures Account'?",
        options: [
          { id: "A", text: "₹1,50,000" },
          { id: "B", text: "₹1,00,000" },
          { id: "C", text: "₹50,000" },
          { id: "D", text: "₹2,00,000" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Total face value = 10,000 × ₹100 = ₹10,00,000.",
          "Step 2: Discount on issue = 5% of ₹10,00,000 = ₹50,00,0.",
          "Step 3: Premium on redemption = 10% of ₹10,00,000 = ₹1,00,000.",
          "Step 4: Total Loss on Issue of Debentures = Discount on Issue + Premium on Redemption = ₹50,000 + ₹1,00,000 = ₹1,50,000.",
          "Step 5: Option A is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Securities Premium Prohibited Uses",
        frequency: "Very High",
        typicalStem: "Under Section 52(2) of the Companies Act 2013, which of the following is NOT a permissible use of Securities Premium? (A) Issue of fully paid bonus shares (B) Writing off preliminary expenses (C) Distribution of cash dividends (D) Buy-back of own shares.",
        strategy: "Securities Premium can NEVER be used for distribution of dividends or writing off general trading losses.",
      },
      {
        patternType: "Table F Interest Rates",
        frequency: "High",
        typicalStem: "As per Table F of Companies Act 2013, the maximum interest rate on calls-in-arrears and calls-in-advance respectively are:",
        strategy: "Calls-in-arrears = 10% p.a.; Calls-in-advance = 12% p.a.",
      },
    ],
    commonTraps: [
      {
        concept: "Debiting Share Capital on Forfeiture",
        misconception: "Debiting Share Capital with face value (e.g. ₹10) when only ₹7 was called.",
        correctUnderstanding: "Share Capital is debited STRICTLY with the **CALLED-UP VALUE** per share up to the stage of forfeiture.",
      },
      {
        concept: "Capital Reserve Calculation on Partial Reissue",
        misconception: "Transferring the entire balance of Share Forfeiture to Capital Reserve.",
        correctUnderstanding: "Only the proportionate profit on SHARES ACTUALLY REISSUED is transferred. The balance belonging to un-reissued shares stays in Share Forfeiture A/c.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Table F Interest Rates",
        mnemonic: "Arrears 10, Advance 12 (Advance gives higher bonus 12%).",
        explanation: "Never reverse 10% and 12%.",
      },
    ],
    quickRevisionCard: {
      title: "Shares & Debentures — High-Yield Cheat Sheet",
      bulletPoints: [
        "Table F rates: Calls-in-arrears @ 10% p.a.; Calls-in-advance @ 12% p.a.",
        "Section 52(2): Bonus shares, Prelim expenses, Issue commission, Redemption premium, Buy-back.",
        "Forfeiture: Share Capital debited with CALLED-UP value.",
        "Securities premium debited ONLY if not received; never reversed if already received.",
        "Max discount on reissue = Amount credited to Share Forfeiture per share.",
        "Capital Reserve = (Forfeited amount per share - Reissue discount per share) × Shares Reissued.",
        "Issue at discount, redeem at premium: Loss on Issue = Discount + Premium on Redemption.",
        "Debentures as Collateral: Method 1 (Footnote) or Method 2 (Debenture Suspense A/c).",
      ],
    },
    practiceQuestions: [
      {
        id: "accountancy_u4_t1_q1",
        question: "As per Table F of Companies Act 2013, the maximum rate of interest chargeable on calls-in-arrears is:",
        options: [
          { id: "A", text: "6% p.a." },
          { id: "B", text: "10% p.a." },
          { id: "C", text: "12% p.a." },
          { id: "D", text: "5% p.a." },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "As per Table F, the board of directors can charge interest on calls-in-arrears @ 10% p.a. from the due date to the date of actual payment.",
      },
      {
        id: "accountancy_u4_t1_q2",
        question: "Which of the following is NOT a permitted use of the Securities Premium Account under Section 52(2) of the Companies Act, 2013?",
        options: [
          { id: "A", text: "Issue of fully paid bonus shares" },
          { id: "B", text: "Payment of cash dividends to shareholders" },
          { id: "C", text: "Writing off preliminary expenses of the company" },
          { id: "D", text: "Providing for the premium payable on redemption of preference shares" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Section 52(2) prohibits the use of securities premium for payment of dividends.",
      },
      {
        id: "accountancy_u4_t1_q3",
        question: "On forfeiture of shares, the Share Capital Account is debited with:",
        options: [
          { id: "A", text: "Nominal / Face value of shares" },
          { id: "B", text: "Called-up amount on shares" },
          { id: "C", text: "Paid-up amount on shares" },
          { id: "D", text: "Market value of shares" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Share Capital Account is debited with the amount called-up on the forfeited shares up to the date of forfeiture.",
      },
      {
        id: "accountancy_u4_t1_q4",
        question: "The maximum permissible discount that a company can allow at the time of reissue of forfeited shares is:",
        options: [
          { id: "A", text: "10% of the face value" },
          { id: "B", text: "The amount previously forfeited on those shares" },
          { id: "C", text: "5% of the face value" },
          { id: "D", text: "Unpaid calls amount" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The discount allowed on reissue of forfeited shares cannot exceed the amount already received and credited to the Share Forfeiture Account on those specific shares.",
      },
      {
        id: "accountancy_u4_t1_q5",
        question: "When debentures are issued as collateral security against a bank loan, under Method 2, which account is debited?",
        options: [
          { id: "A", text: "Bank Loan Account" },
          { id: "B", text: "Debenture Suspense Account" },
          { id: "C", text: "Debentures Account" },
          { id: "D", text: "Interest Accrued Account" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "When recorded by entry, the journal entry is Debenture Suspense A/c Dr. to Debentures A/c.",
      },
      {
        id: "accountancy_u4_t1_q6",
        question: "A company forfeited 200 shares of ₹10 each on which ₹6 per share (including ₹1 premium) was received. The amount credited to the Share Forfeiture Account will be:",
        options: [
          { id: "A", text: "₹1,200" },
          { id: "B", text: "₹1,000" },
          { id: "C", text: "₹800" },
          { id: "D", text: "₹2,000" },
        ],
        correctOption: "B",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "medium",
        explanation: "Securities premium once received cannot be transferred to or credited to Share Forfeiture Account. Amount credited = 200 × (₹6 - ₹1 premium) = 200 × ₹5 = ₹1,000.",
      },
      {
        id: "accountancy_u4_t1_q7",
        question: "Premium payable on redemption of debentures is a:",
        options: [
          { id: "A", text: "Nominal Account (Expense)" },
          { id: "B", text: "Personal Account (Liability)" },
          { id: "C", text: "Real Account (Asset)" },
          { id: "D", text: "Revenue Account" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Premium on redemption of debentures is a liability payable to debenture holders in future; hence it is a Personal Account shown under Non-Current / Other Long-Term Liabilities.",
      },
      {
        id: "accountancy_u4_t1_q8",
        question: "According to SEBI guidelines, what is the minimum subscription required before a company can proceed with allotment of shares?",
        options: [
          { id: "A", text: "75% of the issued capital" },
          { id: "B", text: "90% of the issued capital" },
          { id: "C", text: "80% of the issued capital" },
          { id: "D", text: "100% of the issued capital" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "As per SEBI guidelines and Section 39 of Companies Act, minimum subscription is 90% of the entire issue.",
      },
      {
        id: "accountancy_u4_t1_q9",
        question: "Balance remaining in the Share Forfeiture Account after reissue of all forfeited shares is transferred to:",
        options: [
          { id: "A", text: "General Reserve" },
          { id: "B", text: "Capital Reserve" },
          { id: "C", text: "Securities Premium" },
          { id: "D", text: "Profit & Loss Statement" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Profit on reissue of forfeited shares is a capital profit and is transferred to Capital Reserve Account.",
      },
      {
        id: "accountancy_u4_t1_q10",
        question: "When shares are issued to promoters for their incorporation services, which account is debited?",
        options: [
          { id: "A", text: "Promoters' Capital Account" },
          { id: "B", text: "Incorporation Costs / Goodwill Account" },
          { id: "C", text: "Preliminary Expenses Account" },
          { id: "D", text: "Bank Account" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "When shares are issued to promoters for services rendered, Incorporation Costs A/c or Goodwill A/c is debited and Share Capital is credited.",
      },
    ],
  },

  // Unit 5: Financial Statement Analysis, Accounting Ratios, Cash Flow Statement
  {
    id: "accountancy_u5_t1",
    slug: "financial-statement-analysis-accounting-ratios-cash-flow-statement",
    subject: "accountancy",
    subjectName: "Accountancy",
    subjectCode: "301",
    unitNumber: 5,
    unitTitle: "Analysis of Financial Statements and Cash Flow Statement",
    topicTitle: "Financial Statement Analysis, Accounting Ratios, Cash Flow Statement",
    ncertReference: {
      class: "Class 12",
      book: "Accountancy — Company Accounts and Analysis of Financial Statements",
      chapterNumber: 3,
      chapterName: "Analysis of Financial Statements, Accounting Ratios & Cash Flow Statement",
      sections: [
        "3.1 Schedule III Part I (Balance Sheet Format) and Part II (Statement of P&L)",
        "3.2 Tools of Financial Analysis (Comparative Statements, Common Size Statements)",
        "4.1 Liquidity Ratios (Current Ratio, Quick/Liquid Ratio)",
        "4.2 Solvency Ratios (Debt-Equity, Total Assets to Debt, Proprietary, Interest Coverage)",
        "4.3 Activity/Turnover Ratios (Inventory, Trade Receivables, Trade Payables, Working Capital)",
        "4.4 Profitability Ratios (Gross Profit, Operating, Net Profit, ROCE / Return on Investment)",
        "5.1 Cash Flow Statement as per AS-3 (Operating, Investing, Financing Activities)",
        "5.2 Cash & Cash Equivalents (Treasury bills, Commercial papers, Call money)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (9-11 questions per shift)",
      totalPyqsInRepo: 330,
      weightagePercentage: 17,
    },
    summary30Seconds: [
      "Schedule III Balance Sheet heads: 1. Shareholders' Funds, 2. Share Application Money pending allotment, 3. Non-Current Liabilities, 4. Current Liabilities.",
      "Key Ratios: Current Ratio = Current Assets / Current Liabilities (ideal 2:1); Quick Ratio = Quick Assets / Current Liabilities (ideal 1:1, excludes Inventory & Prepaid expenses); Debt-Equity = Long-term Debt / Shareholders' Funds.",
      "Cash Flow Statement (AS-3): Operating (Net profit adjusted for non-cash/non-operating items & working capital changes), Investing (Purchase/sale of fixed assets & investments), Financing (Issue/redemption of shares/debentures, dividend/interest paid).",
    ],
    coreConcepts: [
      {
        title: "Schedule III Presentation & Major Headings",
        content: `Under **Schedule III of Companies Act 2013**, items must be classified under specific major and sub-heads:

**Equity and Liabilities**:
1. **Shareholders' Funds**:
   - Share Capital
   - Reserves and Surplus (Capital Reserve, Securities Premium, General Reserve, P&L balance)
   - Money received against share warrants
2. **Non-Current Liabilities**:
   - Long-term borrowings (Debentures, Term loans)
   - Deferred tax liabilities (Net)
   - Other long-term liabilities (Premium on redemption of debentures)
   - Long-term provisions (Provision for gratuity/leave encashment)
3. **Current Liabilities**:
   - Short-term borrowings (Bank overdraft, cash credit)
   - Trade payables (Creditors, Bills payable)
   - Other current liabilities (Unpaid dividend, interest accrued, calls-in-advance)
   - Short-term provisions (Provision for tax)

**Assets**:
1. **Non-Current Assets**:
   - Property, Plant and Equipment and Intangible Assets
   - Non-current investments
   - Long-term loans and advances
2. **Current Assets**:
   - Current investments (Marketable securities)
   - Inventories (Stock, loose tools, stores and spares)
   - Trade receivables (Debtors, Bills receivable)
   - Cash and cash equivalents (Cash, bank, bank deposits < 3 months, treasury bills)
   - Short-term loans and advances
   - Other current assets (Prepaid expenses, accrued income)`,
        ncertPointers: [
          "Loose tools and stores & spares are shown under Inventories in Balance Sheet, but EXCLUDED when calculating Current Ratio and Quick Ratio.",
          "Proposed dividend of current year is a Contingent Liability shown in Notes to Accounts.",
        ],
      },
      {
        title: "Accounting Ratios: Formulas & Standard Norms",
        content: `1. **Liquidity Ratios**:
   - **Current Ratio**: $\\frac{\\text{Current Assets}}{\\text{Current Liabilities}}$ (Standard norm = $2:1$).
   - **Quick / Acid-Test Ratio**: $\\frac{\\text{Quick Assets}}{\\text{Current Liabilities}}$ (Standard norm = $1:1$).
     *Quick Assets = Current Assets - Inventory - Prepaid Expenses.*

2. **Solvency Ratios**:
   - **Debt-Equity Ratio**: $\\frac{\\text{Long-Term Debt}}{\\text{Shareholders' Funds / Equity}}$ (Safe norm = $2:1$).
   - **Total Assets to Debt Ratio**: $\\frac{\\text{Total Assets}}{\\text{Long-Term Debt}}$.
   - **Proprietary Ratio**: $\\frac{\\text{Shareholders' Funds}}{\\text{Total Assets}}$.
   - **Interest Coverage Ratio**: $\\frac{\\text{Net Profit before Interest and Tax (NPBIT)}}{\\text{Interest on Long-Term Debt}}$ (Expressed in 'Times').

3. **Activity / Turnover Ratios**:
   - **Inventory Turnover Ratio**: $\\frac{\\text{Cost of Revenue from Operations (COGS)}}{\\text{Average Inventory}}$ (in Times).
   - **Trade Receivables Turnover**: $\\frac{\\text{Credit Revenue from Operations}}{\\text{Average Trade Receivables}}$.
   - **Working Capital Turnover**: $\\frac{\\text{Revenue from Operations}}{\\text{Working Capital}}$ (Working Capital = CA - CL).

4. **Profitability Ratios**:
   - **Gross Profit Ratio**: $\\frac{\\text{Gross Profit}}{\\text{Revenue from Operations}} \\times 100$.
   - **Operating Ratio**: $\\frac{\\text{Cost of Revenue} + \\text{Operating Expenses}}{\\text{Revenue from Operations}} \\times 100$.
   - **Return on Investment (ROI / ROCE)**: $\\frac{\\text{NPBIT}}{\\text{Capital Employed}} \\times 100$.`,
        ncertPointers: [
          "Operating Ratio + Operating Profit Ratio = 100%.",
          "Purchase of goods on credit increases both CA and CL by equal amount $\\implies$ reduces Current Ratio if existing ratio > 1.",
        ],
      },
      {
        title: "Cash Flow Statement (AS-3 Revised)",
        content: `Prepared under indirect method classifying cash flows into three activities:

1. **Cash Flow from Operating Activities**:
   - Start with **Net Profit before Tax and Extraordinary Items**.
   - Add non-cash & non-operating expenses: Depreciation, amortization, loss on sale of fixed asset, interest paid on borrowings.
   - Less non-operating incomes: Interest/dividend received, profit on sale of fixed asset.
   - **Operating Profit before Working Capital Changes**:
     - Add: Decrease in Current Assets & Increase in Current Liabilities.
     - Less: Increase in Current Assets & Decrease in Current Liabilities.
   - Less: Income Tax Paid (net of refund).

2. **Cash Flow from Investing Activities**:
   - Cash Inflows: Sale of fixed assets/investments, interest & dividend received (for non-financial enterprise).
   - Cash Outflows: Purchase of fixed assets/intangibles/investments.

3. **Cash Flow from Financing Activities**:
   - Cash Inflows: Proceeds from issue of shares/debentures, long-term loans raised.
   - Cash Outflows: Repayment of loans, redemption of preference shares/debentures, payment of dividend (interim/final), interest paid on loans.

**Cash and Cash Equivalents**: Short-term, highly liquid investments readily convertible into known amounts of cash with insignificant risk of change in value (maturity within **3 months**). Includes Treasury bills, commercial papers, demand deposits.`,
        ncertPointers: [
          "For a financial enterprise (bank, finance co.): Interest paid/received and dividend received are Operating Activities; Dividend paid is ALWAYS Financing Activity.",
          "Non-cash transactions (issue of shares to vendor for machinery) are EXCLUDED from Cash Flow Statement.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Key Accounting Ratios Summary",
        formula: "\\text{Current} = \\frac{\\text{CA}}{\\text{CL}}; \\; \\text{Quick} = \\frac{\\text{CA} - \\text{Inv} - \\text{Prepaid}}{\\text{CL}}; \\; \\text{Debt-Equity} = \\frac{\\text{Debt}}{\\text{Equity}}; \\; \\text{ROI} = \\frac{\\text{NPBIT}}{\\text{Capital Employed}} \\times 100",
        symbols: "CA, CL, Quick Assets, Debt, Equity, NPBIT",
        siUnits: "Pure ratios, %, or Times",
        applicationCondition: "Financial statement analysis",
      },
      {
        name: "Operating Profit and Operating Ratio Relation",
        formula: "\\text{Operating Ratio} + \\text{Operating Profit Ratio} = 100\\%",
        symbols: "Complementary percentages",
        siUnits: "Percentage (%)",
        applicationCondition: "Statement of P&L analysis",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Cash Flow Statement (AS-3): Three Operating Pillars</text>
  
  <!-- Operating Box -->
  <rect x="40" y="65" width="210" height="210" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="145" y="90" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">1. Operating Activities</text>
  <text x="145" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Net Profit before Tax</text>
  <text x="145" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Non-cash: +Depreciation</text>
  <text x="145" y="155" textAnchor="middle" fill="#cbd5e1" fontSize="11">• +Loss on sale of assets</text>
  <text x="145" y="175" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Working capital: ΔCA, ΔCL</text>
  <text x="145" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Less: Income tax paid</text>
  <text x="145" y="245" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Core Revenue Generator</text>
  
  <!-- Investing Box -->
  <rect x="275" y="65" width="210" height="210" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="380" y="90" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">2. Investing Activities</text>
  <text x="380" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="11">• +Sale of Fixed Assets</text>
  <text x="380" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">• -Purchase of Fixed Assets</text>
  <text x="380" y="155" textAnchor="middle" fill="#cbd5e1" fontSize="11">• -Purchase of Investments</text>
  <text x="380" y="175" textAnchor="middle" fill="#cbd5e1" fontSize="11">• +Interest / Dividend Recd</text>
  <text x="380" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="11">(Non-financial company)</text>
  <text x="380" y="245" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">Long-Term Asset Growth</text>
  
  <!-- Financing Box -->
  <rect x="510" y="65" width="210" height="210" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
  <text x="615" y="90" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">3. Financing Activities</text>
  <text x="615" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="11">• +Issue of Shares / Debs</text>
  <text x="615" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">• -Redemption of Shares/Debs</text>
  <text x="615" y="155" textAnchor="middle" fill="#cbd5e1" fontSize="11">• -Repayment of Bank Loans</text>
  <text x="615" y="175" textAnchor="middle" fill="#cbd5e1" fontSize="11">• -Dividend Paid (ALWAYS)</text>
  <text x="615" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="11">• -Interest on Debs Paid</text>
  <text x="615" y="245" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">Capital Structure Changes</text>
</svg>`,
    workedExamples: [
      {
        id: "accountancy_u5_t1_we1",
        questionNumber: 1,
        question: "A company's Current Ratio is 2.5:1 and its Quick Ratio is 1.5:1. If its Current Liabilities are ₹2,00,000 and prepaid expenses are ₹20,000, calculate the value of Inventory.",
        options: [
          { id: "A", text: "₹1,80,000" },
          { id: "B", text: "₹2,00,000" },
          { id: "C", text: "₹1,00,000" },
          { id: "D", text: "₹2,20,000" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Current Assets = Current Ratio × Current Liabilities = 2.5 × ₹2,00,000 = ₹5,00,000.",
          "Step 2: Quick Assets = Quick Ratio × Current Liabilities = 1.5 × ₹2,00,000 = ₹3,00,000.",
          "Step 3: Current Assets - Quick Assets = Inventory + Prepaid Expenses.",
          "Step 4: ₹5,00,000 - ₹3,00,000 = ₹2,00,000 = Inventory + ₹20,000.",
          "Step 5: Inventory = ₹2,00,000 - ₹20,000 = ₹1,80,000. Option A is exact.",
        ],
      },
      {
        id: "accountancy_u5_t1_we2",
        questionNumber: 2,
        question: "During the year 2024-25, Tata Ltd. paid an interim dividend of ₹50,000 on equity shares. In the Cash Flow Statement prepared as per AS-3, this transaction will be shown as:",
        options: [
          { id: "A", text: "Outflow under Operating Activities" },
          { id: "B", text: "Outflow under Investing Activities" },
          { id: "C", text: "Outflow under Financing Activities" },
          { id: "D", text: "Non-cash transaction" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Payment of dividend (both interim and final) relates to the servicing of share capital.",
          "Step 2: Share capital is part of the equity capital structure of the company.",
          "Step 3: Therefore, dividend paid is ALWAYS classified as a cash outflow under Financing Activities for all enterprises. Option C is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Classification under Schedule III",
        frequency: "Very High (at least 2 questions per shift)",
        typicalStem: "Under which heading and sub-heading is 'Provision for Tax' shown in the Balance Sheet of a company?",
        strategy: "Major Head: Current Liabilities; Sub-Head: Short-Term Provisions.",
      },
      {
        patternType: "Impact of Transaction on Current Ratio",
        frequency: "High",
        typicalStem: "Current Ratio is 2:1. State whether purchase of goods on credit for ₹20,000 will improve, decline, or not change the ratio.",
        strategy: "Credit purchase adds equal amount to CA and CL. If ratio > 1, equal addition DECLINES the ratio.",
      },
    ],
    commonTraps: [
      {
        concept: "Dividend Paid vs Dividend Received",
        misconception: "Treating dividend paid as operating activity.",
        correctUnderstanding: "Dividend PAID is ALWAYS a Financing outflow for every company. Dividend RECEIVED is an Investing inflow for non-financial companies, and an Operating inflow for financial companies.",
      },
      {
        concept: "Loose Tools in Current Ratio",
        misconception: "Including loose tools in Current Assets while computing Current Ratio.",
        correctUnderstanding: "Loose tools and stores & spares are included under Inventories in Balance Sheet, but **EXCLUDED** when calculating Current Ratio and Quick Ratio because they are not meant for resale.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Cash Flow Activities Simplified",
        mnemonic: "O-I-F: Operations (P&L core), Investments (Fixed Assets), Financing (Capital & Loans).",
        explanation: "Quick mental check for any cash flow question.",
      },
      {
        title: "Quick Assets Exclusion",
        mnemonic: "Quick = CA - IP (Inventory & Prepaid).",
        explanation: "Instantly subtracts the two illiquid current assets.",
      },
    ],
    quickRevisionCard: {
      title: "Ratios & Cash Flow — Quick Revision Card",
      bulletPoints: [
        "Schedule III: Loose tools under Inventory; Excluded from Current Ratio calculation.",
        "Current Ratio: CA / CL (norm 2:1); Quick Ratio: (CA - Inv - Prepaid) / CL (norm 1:1).",
        "Debt-Equity Ratio: Long-term Debt / Shareholders' Funds (norm 2:1).",
        "Interest Coverage Ratio: NPBIT / Interest on Long-Term Debt (in Times).",
        "Operating Ratio + Operating Profit Ratio = 100%.",
        "AS-3 Cash Flow: Operating, Investing, Financing.",
        "Dividend Paid is ALWAYS a Financing outflow.",
        "Cash Equivalents: Maturity within 3 months (Treasury bills, commercial paper).",
      ],
    },
    practiceQuestions: [
      {
        id: "accountancy_u5_t1_q1",
        question: "Loose tools and stores & spares are shown in the Balance Sheet under which sub-head?",
        options: [
          { id: "A", text: "Property, Plant and Equipment" },
          { id: "B", text: "Inventories" },
          { id: "C", text: "Trade Receivables" },
          { id: "D", text: "Other Current Assets" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "As per Schedule III Part I of Companies Act 2013, loose tools and stores & spares are classified under Current Assets under the sub-head 'Inventories'.",
      },
      {
        id: "accountancy_u5_t1_q2",
        question: "If a company's Current Ratio is 2:1, payment of a current liability of ₹10,000 will:",
        options: [
          { id: "A", text: "Improve the Current Ratio" },
          { id: "B", text: "Reduce the Current Ratio" },
          { id: "C", text: "Have no effect on the Current Ratio" },
          { id: "D", text: "Make the ratio negative" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "When Current Ratio is greater than 1, an equal reduction in both Current Assets (cash) and Current Liabilities (creditors) causes the ratio to increase (improve). E.g., 200/100 = 2; (200 - 10)/(100 - 10) = 190/90 = 2.11:1.",
      },
      {
        id: "accountancy_u5_t1_q3",
        question: "Which of the following is classified as Cash & Cash Equivalents under AS-3?",
        options: [
          { id: "A", text: "Investments in equity shares of another company" },
          { id: "B", text: "Treasury Bills with maturity period of 60 days" },
          { id: "C", text: "Inventories of finished goods" },
          { id: "D", text: "Plant and machinery" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Cash equivalents are short-term, highly liquid investments with an original maturity of three months (90 days) or less, such as Treasury bills.",
      },
      {
        id: "accountancy_u5_t1_q4",
        question: "Interest Coverage Ratio is computed as:",
        options: [
          { id: "A", text: "Net Profit after Tax / Interest on Long-Term Debt" },
          { id: "B", text: "Net Profit before Interest and Tax / Interest on Long-Term Debt" },
          { id: "C", text: "Operating Profit / Revenue from Operations" },
          { id: "D", text: "Gross Profit / Total Debt" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Interest Coverage Ratio = Net Profit before Interest and Tax (NPBIT) / Interest on Long-Term Debt.",
      },
      {
        id: "accountancy_u5_t1_q5",
        question: "For a commercial bank (financial enterprise), dividend received on shares is classified in the Cash Flow Statement as:",
        options: [
          { id: "A", text: "Operating Activity" },
          { id: "B", text: "Investing Activity" },
          { id: "C", text: "Financing Activity" },
          { id: "D", text: "Non-cash Transaction" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "For financial enterprises whose principal business is dealing in securities and granting loans, interest and dividend received are classified as Operating Activities.",
      },
      {
        id: "accountancy_u5_t1_q6",
        question: "If the Operating Ratio of a firm is 78%, its Operating Profit Ratio will be:",
        options: [
          { id: "A", text: "22%" },
          { id: "B", text: "78%" },
          { id: "C", text: "122%" },
          { id: "D", text: "12%" },
        ],
        correctOption: "A",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "easy",
        explanation: "Operating Ratio + Operating Profit Ratio = 100%. Therefore, Operating Profit Ratio = 100% - 78% = 22%.",
      },
      {
        id: "accountancy_u5_t1_q7",
        question: "Under which sub-heading is 'Calls-in-Advance' shown in the Balance Sheet of a company?",
        options: [
          { id: "A", text: "Share Capital" },
          { id: "B", text: "Other Current Liabilities" },
          { id: "C", text: "Short-Term Provisions" },
          { id: "D", text: "Reserves and Surplus" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Calls-in-advance is money received before the call is made; it is shown under Current Liabilities under the sub-head 'Other Current Liabilities'.",
      },
      {
        id: "accountancy_u5_t1_q8",
        question: "An increase in Current Assets (other than cash) during the year is shown in the Cash Flow from Operating Activities as:",
        options: [
          { id: "A", text: "An addition to Operating Profit before Working Capital Changes" },
          { id: "B", text: "A deduction from Operating Profit before Working Capital Changes" },
          { id: "C", text: "An inflow under Investing Activities" },
          { id: "D", text: "An outflow under Financing Activities" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Increase in current assets indicates that cash has been blocked/tied up in operations; hence it is deducted.",
      },
      {
        id: "accountancy_u5_t1_q9",
        question: "Quick Assets do NOT include:",
        options: [
          { id: "A", text: "Cash and cash equivalents" },
          { id: "B", text: "Trade receivables" },
          { id: "C", text: "Inventories and prepaid expenses" },
          { id: "D", text: "Marketable securities" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Quick Assets = Current Assets minus (Inventories + Prepaid Expenses).",
      },
      {
        id: "accountancy_u5_t1_q10",
        question: "Payment of dividend by any company is ALWAYS classified in the Cash Flow Statement under:",
        options: [
          { id: "A", text: "Operating Activities" },
          { id: "B", text: "Investing Activities" },
          { id: "C", text: "Financing Activities" },
          { id: "D", text: "Appropriation of Reserves" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Dividend paid is a distribution to providers of share capital and is ALWAYS classified as a Financing Activity for both financial and non-financial enterprises.",
      },
    ],
  },

  // Unit 6: Electronic Spreadsheets, Database Management System for Accounting
  {
    id: "accountancy_u6_t1",
    slug: "electronic-spreadsheets-database-management-system-for-accounting",
    subject: "accountancy",
    subjectName: "Accountancy",
    subjectCode: "301",
    unitNumber: 6,
    unitTitle: "Computerised Accounting System",
    topicTitle: "Electronic Spreadsheets, Database Management System for Accounting",
    ncertReference: {
      class: "Class 12",
      book: "Accountancy — Computerised Accounting System",
      chapterNumber: 1,
      chapterName: "Overview of Computerised Accounting System & Electronic Spreadsheets",
      sections: [
        "1.1 Concept and Features of Computerised Accounting System (CAS)",
        "1.2 Comparison between Manual and Computerised Accounting",
        "2.1 Electronic Spreadsheet: Concept, Features and Formulas (SUM, AVERAGE, IF, VLOOKUP, HLOOKUP, PMT, FV, RATE)",
        "2.2 Pivot Tables, Data Validation, Charts and Graphs",
        "3.1 Database Management System (DBMS) Concepts: Data Models, Tables, Records, Fields, Primary Key, Foreign Key",
        "3.2 SQL Queries (SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY, GROUP BY)",
      ],
    },
    cuetRelevance: {
      level: "Medium",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4-6 questions per shift)",
      totalPyqsInRepo: 170,
      weightagePercentage: 8,
    },
    summary30Seconds: [
      "Computerised Accounting System (CAS) relies on the framework of software, database, and hardware to process transactions via codified ledgers with automatic trail generation.",
      "Spreadsheet Financial Functions: PMT(rate, nper, pv) calculates loan installment; VLOOKUP(lookup_value, table_array, col_index, [range_lookup]) performs vertical table search; PV calculates present value.",
      "DBMS: Relational data model organizes data into tables (Relations) where columns are Attributes/Fields and rows are Tuples/Records; Primary key uniquely identifies each record; Foreign key enforces referential integrity.",
    ],
    coreConcepts: [
      {
        title: "Computerised Accounting System: Features & Structure",
        content: `**Core Architecture of CAS**:
- **Data Entry**: Transactions are recorded through structured accounting vouchers (Payment, Receipt, Contra, Journal, Sales, Purchase).
- **Data Storage**: Stored in relational databases with tables linked via primary and foreign keys.
- **Reporting**: Automated generation of Trial Balance, Profit & Loss Statement, and Balance Sheet without manual ledger balancing.

**Manual vs Computerised Accounting**:
- *Identification of transactions*: Same in both (source documents).
- *Recording*: Manual requires physical journalizing; CAS uses voucher entry with pre-set ledger accounts.
- *Posting & Balancing*: Manual requires labor-intensive posting to individual ledger folios; CAS automates instant posting upon voucher save.
- *Trail Balance & Financial Statements*: Manual requires period-end manual extraction; CAS generates them dynamically at any instant.
- *Storage & Audit Trail*: CAS provides permanent electronic audit trails and access control security.`,
        ncertPointers: [
          "Codification of accounts: Sequential, Block, or Hierarchical/Mnemonic codes are assigned to ledger accounts for structured grouping.",
          "Security features of CAS: Password security, Data audit, Role-based user rights, Data encryption.",
        ],
      },
      {
        title: "Electronic Spreadsheet: Financial & Logical Functions",
        content: `**Key Financial Functions in Spreadsheets**:
1. **PMT**: Calculates the payment for a loan based on constant payments and a constant interest rate:
   $$\\text{=PMT(rate, nper, pv, [fv], [type])}$$
   - *rate*: Interest rate per period (if annual rate is $r$, monthly rate is $r/12$).
   - *nper*: Total number of payment periods (e.g., 5 years monthly = $5 \\times 12 = 60$).
   - *pv*: Present value (principal loan amount).
2. **PV**: Calculates present value of an investment: $\\text{=PV(rate, nper, pmt, [fv], [type])}$.
3. **FV**: Calculates future value of an investment: $\\text{=FV(rate, nper, pmt, [pv], [type])}$.
4. **RATE**: Returns interest rate per period of an annuity: $\\text{=RATE(nper, pmt, pv)}$.

**Lookup and Logical Functions**:
- **VLOOKUP**: Searches for a value in the leftmost column of a table and returns a value in the same row from a specified column:
  $$\\text{=VLOOKUP(lookup\\_value, table\\_array, col\\_index\\_num, [range\\_lookup])}$$
  *(Range_lookup = FALSE for exact match; TRUE for approximate match).*
- **IF Function**: Conditional logical test: $\\text{=IF(logical\\_test, value\\_if\\_true, value\\_if\\_false)}$.
- **SUMIF / COUNTIF**: Conditional arithmetic aggregates based on criteria.`,
        ncertPointers: [
          "Absolute cell referencing uses dollar signs (e.g., $A$1) so cell coordinate does not change when copied; Relative referencing (A1) adjusts automatically.",
          "Pivot Table: Interactive tool used to summarize, analyze, explore, and present summary data.",
        ],
      },
      {
        title: "Database Management System (DBMS) & SQL Basics",
        content: `**Relational Database Model Terminology**:
- **Relation**: A two-dimensional table consisting of rows and columns.
- **Tuple / Record**: A single row in a table representing a complete entity record (e.g., one customer).
- **Attribute / Field**: A column in a table representing a specific property (e.g., CustomerID, Name).
- **Domain**: Pool of legal values from which actual attribute values are drawn.
- **Keys**:
  - **Primary Key**: An attribute (or set of attributes) that **uniquely identifies** each tuple in a relation (cannot be NULL).
  - **Candidate Key**: Any attribute that has the potential to become a primary key.
  - **Foreign Key**: An attribute in a table whose values are derived from the primary key of another table, ensuring **referential integrity**.

**SQL Command Categories**:
1. **DDL (Data Definition Language)**: Defines database structure: $\\text{CREATE, ALTER, DROP}$.
2. **DML (Data Manipulation Language)**: Modifies and queries data: $\\text{SELECT, INSERT, UPDATE, DELETE}$.
- Standard Query Syntax:
  $$\\text{SELECT column1, column2 FROM TableName WHERE condition ORDER BY column1 ASC/DESC;}$$`,
        ncertPointers: [
          "Referential integrity prevents orphan records in child tables.",
          "NULL value represents missing, unknown, or inapplicable data; it is not equal to zero or blank space.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Spreadsheet PMT Function Syntax",
        formula: "\\text{=PMT(rate/12, nper*12, pv)} \\quad \\text{for monthly loan repayment calculation}",
        symbols: "rate = annual rate, nper = years, pv = loan principal",
        siUnits: "Currency per period",
        applicationCondition: "Loan amortization schedules",
      },
      {
        name: "VLOOKUP Parameter Order",
        formula: "\\text{=VLOOKUP(LookupValue, TableRange, ColumnNumber, FALSE)} \\quad \\text{[FALSE = Exact Match]}",
        symbols: "Lookup search parameters",
        siUnits: "Spreadsheet function syntax",
        applicationCondition: "Data lookup across accounting ledgers",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Relational Database Model &amp; Primary / Foreign Key Integrity</text>
  
  <!-- Parent Table: Customers -->
  <rect x="50" y="65" width="300" height="210" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="200" y="90" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">Parent Table: CUSTOMERS</text>
  
  <!-- Table Header -->
  <rect x="65" y="105" width="270" height="30" fill="#0f172a" stroke="#475569"/>
  <text x="110" y="125" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">CustomerID (PK)</text>
  <text x="195" y="125" textAnchor="middle" fill="#cbd5e1" fontSize="11">CustName</text>
  <text x="280" y="125" textAnchor="middle" fill="#cbd5e1" fontSize="11">City</text>
  
  <!-- Row 1 -->
  <rect x="65" y="135" width="270" height="30" fill="#1e293b" stroke="#334155"/>
  <text x="110" y="155" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">C101</text>
  <text x="195" y="155" textAnchor="middle" fill="#f8fafc" fontSize="11">Apex Corp</text>
  <text x="280" y="155" textAnchor="middle" fill="#f8fafc" fontSize="11">Delhi</text>
  
  <!-- Row 2 -->
  <rect x="65" y="165" width="270" height="30" fill="#1e293b" stroke="#334155"/>
  <text x="110" y="185" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">C102</text>
  <text x="195" y="185" textAnchor="middle" fill="#f8fafc" fontSize="11">Zenith Ltd</text>
  <text x="280" y="185" textAnchor="middle" fill="#f8fafc" fontSize="11">Mumbai</text>
  
  <text x="200" y="240" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Primary Key (PK): Unique, NOT NULL</text>
  
  <!-- Child Table: Orders -->
  <rect x="410" y="65" width="300" height="210" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="560" y="90" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Child Table: ORDERS</text>
  
  <!-- Table Header -->
  <rect x="425" y="105" width="270" height="30" fill="#0f172a" stroke="#475569"/>
  <text x="470" y="125" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">OrderID (PK)</text>
  <text x="560" y="125" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">CustID (FK)</text>
  <text x="645" y="125" textAnchor="middle" fill="#cbd5e1" fontSize="11">Amount</text>
  
  <!-- Row 1 -->
  <rect x="425" y="135" width="270" height="30" fill="#1e293b" stroke="#334155"/>
  <text x="470" y="155" textAnchor="middle" fill="#f8fafc" fontSize="11">O801</text>
  <text x="560" y="155" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">C101</text>
  <text x="645" y="155" textAnchor="middle" fill="#f8fafc" fontSize="11">₹45,000</text>
  
  <!-- Row 2 -->
  <rect x="425" y="165" width="270" height="30" fill="#1e293b" stroke="#334155"/>
  <text x="470" y="185" textAnchor="middle" fill="#f8fafc" fontSize="11">O802</text>
  <text x="560" y="185" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">C102</text>
  <text x="645" y="185" textAnchor="middle" fill="#f8fafc" fontSize="11">₹92,000</text>
  
  <text x="560" y="240" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Foreign Key (FK) enforces Referential Integrity</text>
</svg>`,
    workedExamples: [
      {
        id: "accountancy_u6_t1_we1",
        questionNumber: 1,
        question: "To calculate the monthly installment of a car loan of ₹5,00,000 borrowed at an annual interest rate of 12% for a tenure of 3 years, which of the following spreadsheet formula is correct?",
        options: [
          { id: "A", text: "=PMT(12%/12, 3*12, 500000)" },
          { id: "B", text: "=PMT(12%, 3, 500000)" },
          { id: "C", text: "=PV(12%/12, 36, 500000)" },
          { id: "D", text: "=FV(12%, 3, 500000)" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: The function to calculate loan payment installment is PMT.",
          "Step 2: Since installments are monthly, the interest rate per period must be annual rate divided by 12 $\\implies 12\\%/12$.",
          "Step 3: Number of periods is tenure in years multiplied by 12 $\\implies 3 \\times 12 = 36$.",
          "Step 4: Present value is loan principal = 500000.",
          "Step 5: Formula: =PMT(12%/12, 3*12, 500000). Option A is exact.",
        ],
      },
      {
        id: "accountancy_u6_t1_we2",
        questionNumber: 2,
        question: "In a relational database, what is the role of a Foreign Key?",
        options: [
          { id: "A", text: "To uniquely identify each record in its own table" },
          { id: "B", text: "To establish a relationship between two tables and maintain referential integrity" },
          { id: "C", text: "To encrypt confidential customer passwords" },
          { id: "D", text: "To automatically calculate financial totals" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: A primary key uniquely identifies rows in its own relation.",
          "Step 2: A foreign key is a field in one table that refers to the primary key in another table.",
          "Step 3: Its main role is to link tables together and enforce referential integrity so that no record references a non-existent parent. Option B is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Spreadsheet Function Syntax",
        frequency: "Very High",
        typicalStem: "In Excel/Calc, what does the fourth argument [range_lookup] in the VLOOKUP function signify when set to FALSE?",
        strategy: "FALSE specifies an EXACT match; TRUE specifies an approximate match.",
      },
      {
        patternType: "Relational Key Terminology",
        frequency: "High",
        typicalStem: "An attribute in a table that can never contain a NULL value and uniquely distinguishes each row is called a:",
        strategy: "Primary Key.",
      },
    ],
    commonTraps: [
      {
        concept: "Monthly Rate in PMT",
        misconception: "Entering annual rate directly into PMT for monthly installments.",
        correctUnderstanding: "For monthly installments, rate MUST be divided by 12, and nper MUST be multiplied by 12.",
      },
      {
        concept: "Tuple vs Attribute",
        misconception: "Confusing row and column terminology in DBMS.",
        correctUnderstanding: "Tuple = Row = Record. Attribute = Column = Field.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "DBMS Row & Column",
        mnemonic: "T-R-A-C: Tuple is Row, Attribute is Column.",
        explanation: "Simple acronym to avoid misidentifying rows and columns in DBMS questions.",
      },
    ],
    quickRevisionCard: {
      title: "Computerised Accounting — Quick Revision Card",
      bulletPoints: [
        "CAS automates ledger posting, trial balance extraction, and financial reporting.",
        "PMT(rate, nper, pv): Rate and nper must match payment frequency (divide rate by 12 for monthly).",
        "VLOOKUP(val, table, col, FALSE): FALSE guarantees exact match.",
        "Absolute reference: $A$1 does not change on copy; Relative: A1 changes.",
        "Tuple = Row/Record; Attribute = Column/Field.",
        "Primary Key: Uniquely identifies records, CANNOT be NULL.",
        "Foreign Key: References primary key of another table, preserves referential integrity.",
        "SQL: DDL (CREATE, ALTER, DROP); DML (SELECT, INSERT, UPDATE, DELETE).",
      ],
    },
    practiceQuestions: [
      {
        id: "accountancy_u6_t1_q1",
        question: "In a relational database table, a row is technically called a:",
        options: [
          { id: "A", text: "Attribute" },
          { id: "B", text: "Tuple" },
          { id: "C", text: "Domain" },
          { id: "D", text: "Schema" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "In relational database terminology, a row in a table is called a Tuple (or Record), and a column is called an Attribute (or Field).",
      },
      {
        id: "accountancy_u6_t1_q2",
        question: "In electronic spreadsheets, which function is used to calculate the periodic payment for an annuity based on constant payments and a constant interest rate?",
        options: [
          { id: "A", text: "PV" },
          { id: "B", text: "FV" },
          { id: "C", text: "PMT" },
          { id: "D", text: "NPER" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The PMT function calculates the payment for a loan based on constant payments and a constant interest rate.",
      },
      {
        id: "accountancy_u6_t1_q3",
        question: "Which of the following keys in a relational database cannot contain a NULL value?",
        options: [
          { id: "A", text: "Foreign Key" },
          { id: "B", text: "Primary Key" },
          { id: "C", text: "Secondary Key" },
          { id: "D", text: "Composite Candidate Key" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Under the Entity Integrity constraint, a Primary Key must uniquely identify each record and therefore can never accept a NULL value.",
      },
      {
        id: "accountancy_u6_t1_q4",
        question: "In electronic spreadsheet software, which symbol is used to create an absolute cell reference?",
        options: [
          { id: "A", text: "#" },
          { id: "B", text: "$" },
          { id: "C", text: "&" },
          { id: "D", text: "@" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The dollar sign ($) is used in spreadsheets to fix a column or row coordinate (e.g. $A$1) so that the reference remains absolute when copied.",
      },
      {
        id: "accountancy_u6_t1_q5",
        question: "Which of the following SQL commands belongs to Data Definition Language (DDL)?",
        options: [
          { id: "A", text: "SELECT" },
          { id: "B", text: "INSERT" },
          { id: "C", text: "CREATE" },
          { id: "D", text: "UPDATE" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "CREATE, ALTER, and DROP are DDL commands because they define and modify the schema/structure of the database.",
      },
      {
        id: "accountancy_u6_t1_q6",
        question: "In the VLOOKUP function, setting the fourth argument [range_lookup] to FALSE specifies:",
        options: [
          { id: "A", text: "An approximate match" },
          { id: "B", text: "An exact match" },
          { id: "C", text: "Search from bottom to top" },
          { id: "D", text: "Case sensitive matching" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Setting [range_lookup] to FALSE tells VLOOKUP to find an exact match for the lookup value.",
      },
      {
        id: "accountancy_u6_t1_q7",
        question: "Referential integrity in a database ensures that:",
        options: [
          { id: "A", text: "All data entries are in capital letters" },
          { id: "B", text: "A foreign key value must always match an existing primary key value in the referenced parent table" },
          { id: "C", text: "Tables are automatically backed up every hour" },
          { id: "D", text: "Numerical fields do not contain alphabetic characters" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Referential integrity is a database constraint that prevents orphan records by requiring foreign key values to match valid primary key values in the parent table.",
      },
      {
        id: "accountancy_u6_t1_q8",
        question: "An interactive spreadsheet tool used to quickly summarize, aggregate, and analyze large amounts of tabular data is called a:",
        options: [
          { id: "A", text: "Macro" },
          { id: "B", text: "Pivot Table" },
          { id: "C", text: "Sparkline" },
          { id: "D", text: "Data Validation dropdown" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "A Pivot Table is a powerful spreadsheet feature that enables users to reorganize and summarize selected columns and rows of data.",
      },
      {
        id: "accountancy_u6_t1_q9",
        question: "Which of the following is a key advantage of Computerised Accounting Systems over manual systems?",
        options: [
          { id: "A", text: "No requirement for skilled personnel" },
          { id: "B", text: "Instant and automated posting of transactions to ledger accounts and financial statements" },
          { id: "C", text: "Complete immunity from power failures or computer viruses" },
          { id: "D", text: "Zero cost of hardware and software installation" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "In a computerized system, entering an accounting voucher automatically posts entries to all relevant ledgers and updates Trial Balance and financial statements simultaneously.",
      },
      {
        id: "accountancy_u6_t1_q10",
        question: "In SQL, which clause is used to filter records based on a specified condition?",
        options: [
          { id: "A", text: "GROUP BY" },
          { id: "B", text: "ORDER BY" },
          { id: "C", text: "WHERE" },
          { id: "D", text: "HAVING" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The WHERE clause is used to extract only those records that fulfill a specified condition in SQL.",
      },
    ],
  },
];
