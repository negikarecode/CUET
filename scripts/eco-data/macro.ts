import { NoteDocument } from "@/types/notes";

export const economicsMacroTopics: NoteDocument[] = [
  // Unit 4: Circular Flow of Income, GDP, GNP, Measurement Methods
  {
    id: "eco_u4_t1",
    slug: "circular-flow-of-income-gdp-gnp-measurement-methods-value-added-income-expenditure",
    subject: "eco",
    subjectName: "Economics",
    subjectCode: "309",
    unitNumber: 4,
    unitTitle: "National Income and Related Aggregates",
    topicTitle: "Circular Flow of Income, GDP, GNP, Measurement Methods (Value Added, Income, Expenditure)",
    ncertReference: {
      class: "Class 12",
      book: "Introductory Macroeconomics",
      chapterNumber: 2,
      chapterName: "National Income Accounting",
      sections: [
        "2.1 Some Basic Concepts of Macroeconomics (Stock vs Flow, Final vs Intermediate goods, Capital vs Consumer goods, Depreciation)",
        "2.2 Circular Flow of Income in a Two-Sector Economy (Real Flow vs Money Flow)",
        "2.3 Aggregates of National Income ($GDP_{mp}, GDP_{fc}, NNP_{fc}$, Nominal vs Real GDP, GDP Deflator)",
        "2.4 Measurement of National Income: Value Added Method (Problem of Double Counting)",
        "2.5 Income Method (Compensation of Employees, Operating Surplus, Mixed Income)",
        "2.6 Expenditure Method ($C + I + G + (X - M)$)",
        "2.7 GDP and Welfare (Externalities, Non-monetary exchanges, Distribution of GDP)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Highest weightage in Macroeconomics (9-12 questions per shift)",
      totalPyqsInRepo: 320,
      weightagePercentage: 18,
    },
    summary30Seconds: [
      "Key Conversion Identities: Gross to Net = Deduct Depreciation; Domestic to National = Add NFIA; Market Price to Factor Cost = Deduct Net Indirect Taxes ($NIT = \\text{Indirect Taxes} - \\text{Subsidies}$).",
      "National Income ($NNP_{fc}$): Value Added Method ($GVA_{mp} = \\text{Value of Output} - \\text{Intermediate Consumption}$); Income Method ($\\text{CoE} + \\text{Operating Surplus} + \\text{Mixed Income} = NDP_{fc}$); Expenditure Method ($C + I + G + (X - M) = GDP_{mp}$).",
      "Real GDP vs Nominal GDP: $\\text{Real GDP} = \\frac{\\text{Nominal GDP}}{\\text{GDP Deflator}} \\times 100$. GDP is not an adequate index of welfare due to non-monetary exchanges, externalities, and uneven distribution.",
    ],
    coreConcepts: [
      {
        title: "Basic Aggregates & The Three Conversion Bridges",
        content: `**Foundational Distinctions**:
- **Stock vs Flow**: Stock is measured at a particular point in time (Capital, Wealth, Inventory at year-end, Money supply); Flow is measured over a period of time (Income, Output, Investment, Depreciation, Exports).
- **Final vs Intermediate Goods**: Final goods are purchased for final consumption or capital formation (investment) and do not undergo further processing. Intermediate goods are purchased for resale or used up completely during production in the same accounting year.
- **Factor Income vs Transfer Income**: Factor income is earned for rendering factor services (wages, rent, interest, profit) and included in national income; Transfer payments (scholarships, old-age pensions, gifts) are unearned and excluded.

**The Three Conversion Bridges**:
1. **Gross vs Net**:
   $$\\text{Net} = \\text{Gross} - \\text{Depreciation (Consumption of Fixed Capital)}$$
2. **Domestic vs National**:
   $$\\text{National} = \\text{Domestic} + \\text{NFIA (Net Factor Income from Abroad)}$$
   *NFIA = Factor income earned from abroad minus factor income paid abroad.*
3. **Market Price (MP) vs Factor Cost (FC)**:
   $$\\text{Factor Cost} = \\text{Market Price} - \\text{Net Indirect Taxes (NIT)}$$
   *NIT = Indirect Taxes - Subsidies.*
$$\\mathbf{\\text{National Income} = NNP_{fc}}$$`,
        ncertPointers: [
          "Operating Surplus = Rent + Royalty + Interest + Profit (Dividends + Undistributed Profits + Corporate Tax).",
          "Mixed Income of self-employed includes labor and capital income of unorganized proprietors/farmers that cannot be segregated.",
        ],
      },
      {
        title: "Three Measurement Methods of National Income",
        content: `**1. Value Added Method (Product Method)**:
- $\\text{Value of Output} = \\text{Sales} + \\Delta \\text{Stock} \\quad (\\Delta \\text{Stock} = \\text{Closing Stock} - \\text{Opening Stock})$.
- Gross Value Added at Market Price ($GVA_{mp} = GDP_{mp}$):
  $$GDP_{mp} = \\text{Value of Output} - \\text{Intermediate Consumption}$$
- *Avoidance of Double Counting*: Take either Value Added at each stage of production OR value of final goods only.

**2. Income Method**:
Measures factor payments generated within domestic territory ($NDP_{fc}$):
$$NDP_{fc} = \\text{Compensation of Employees (CoE)} + \\text{Operating Surplus} + \\text{Mixed Income of Self-Employed}$$
Where:
- *CoE*: Wages & salaries in cash/kind + Employer's contribution to social security schemes.
- *Operating Surplus*: Rent + Royalty + Interest + Profit (Corporate Tax + Dividend + Retained Earnings).
- Then: $NNP_{fc} = NDP_{fc} + NFIA$.

**3. Expenditure Method**:
Measures aggregate final expenditure in domestic territory ($GDP_{mp}$):
$$GDP_{mp} = C + I + G + (X - M)$$
Where:
- $C$ = Private Final Consumption Expenditure.
- $G$ = Government Final Consumption Expenditure.
- $I$ = Gross Domestic Capital Formation (Gross Fixed Capital Formation + Change in Stock).
- $(X - M)$ = Net Exports (Exports - Imports).
- Then: $NNP_{fc} = GDP_{mp} - \\text{Depreciation} + NFIA - NIT$.`,
        ncertPointers: [
          "Careful Trap: If given 'Net Domestic Fixed Capital Formation', add Depreciation and Change in Stock to get Gross Domestic Capital Formation.",
          "Sale of second-hand goods is excluded from National Income (no new production), but broker commission on second-hand sales is included (reward for current services).",
        ],
      },
      {
        title: "Real vs Nominal GDP & GDP and Welfare",
        content: `**Nominal GDP vs Real GDP**:
- **Nominal GDP ($GDP$ at current prices)**: Market value of final goods and services evaluated at current year prices ($P_1 \\times Q_1$).
- **Real GDP ($GDP$ at constant prices)**: Market value evaluated at base year prices ($P_0 \\times Q_1$). Real GDP eliminates price effects and reflects true physical output changes.
- **GDP Deflator**:
  $$\\text{GDP Deflator} = \\frac{\\text{Nominal GDP}}{\\text{Real GDP}} \\times 100$$

**Limitations of GDP as an Indicator of Social Welfare**:
1. **Distribution of GDP**: Unequal distribution of income; a rise in GDP concentrated in top 1% does not improve mass living standards.
2. **Non-Monetary Exchanges**: Barter transactions, unpaid domestic work by housewives, kitchen gardening are excluded from GDP.
3. **Externalities**: Benefits (positive externalities, e.g. public parks) or harms (negative externalities, e.g. industrial pollution) for which no market payment is made.
4. **Composition of GDP**: Production of defence weapons vs healthcare/education.`,
        ncertPointers: [
          "Green GNP: National income adjusted for depletion of natural resources and environmental degradation.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "National Income Aggregates Bridges",
        formula: "NNP_{fc} = GDP_{mp} - \\text{Depreciation} + \\text{NFIA} - \\text{NIT}",
        symbols: "Dep = Consumption of fixed capital, NFIA = Net factor income abroad, NIT = Net indirect taxes",
        siUnits: "Monetary value (Crores of INR)",
        applicationCondition: "National income conversion calculations",
      },
      {
        name: "GDP Deflator & Real Output Formula",
        formula: "\\text{Real GDP} = \\frac{\\text{Nominal GDP}}{\\text{GDP Deflator}} \\times 100",
        symbols: "Nominal GDP, Real GDP, Price Index",
        siUnits: "Index / Real value",
        applicationCondition: "Inflation-adjusted growth measurement",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Circular Flow of Income &amp; The Three National Income Methods</text>
  
  <!-- Households Box -->
  <rect x="50" y="70" width="200" height="90" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="150" y="95" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">HOUSEHOLDS</text>
  <text x="150" y="120" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Own Factor Services</text>
  <text x="150" y="140" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Consume Goods &amp; Services</text>
  
  <!-- Firms Box -->
  <rect x="510" y="70" width="200" height="90" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="610" y="95" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">PRODUCING FIRMS</text>
  <text x="610" y="120" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Produce Goods &amp; Services</text>
  <text x="610" y="140" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Pay Factor Incomes</text>
  
  <!-- Arrows -->
  <path d="M 250,90 L 510,90" stroke="#f59e0b" strokeWidth="3"/>
  <text x="380" y="80" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Factor Services (Land, Labour, Capital, Ent.)</text>
  
  <path d="M 510,130 L 250,130" stroke="#ec4899" strokeWidth="3"/>
  <text x="380" y="125" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">Factor Payments (Rent, Wages, Interest, Profit) [Income Method]</text>
  
  <!-- Bottom Methods Summary -->
  <rect x="50" y="190" width="660" height="85" rx="8" fill="#1e293b" stroke="#475569"/>
  <text x="160" y="215" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">1. Value Added Method</text>
  <text x="160" y="240" textAnchor="middle" fill="#94a3b8" fontSize="11">GVA = Output - Int. Cons</text>
  
  <text x="380" y="215" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">2. Income Method</text>
  <text x="380" y="240" textAnchor="middle" fill="#94a3b8" fontSize="11">NDP_fc = CoE + OS + MI</text>
  
  <text x="590" y="215" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">3. Expenditure Method</text>
  <text x="590" y="240" textAnchor="middle" fill="#94a3b8" fontSize="11">GDP_mp = C + I + G + (X-M)</text>
  <text x="380" y="265" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Triple Identity: Production = Income = Expenditure = National Income (NNP_fc)</text>
</svg>`,
    workedExamples: [
      {
        id: "eco_u4_t1_we1",
        questionNumber: 1,
        question: "Given: $GDP_{mp} = ₹8,000$ crores, Consumption of Fixed Capital (Depreciation) = ₹600 crores, Indirect Taxes = ₹700 crores, Subsidies = ₹100 crores, and Net Factor Income from Abroad (NFIA) = ₹(-)200 crores. Calculate National Income ($NNP_{fc}$).",
        options: [
          { id: "A", text: "₹6,600 crores" },
          { id: "B", text: "₹7,200 crores" },
          { id: "C", text: "₹6,800 crores" },
          { id: "D", text: "₹7,000 crores" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Net Indirect Taxes $NIT = \\text{Indirect Taxes} - \\text{Subsidies} = 700 - 100 = ₹600$ crores.",
          "Step 2: $NNP_{fc} = GDP_{mp} - \\text{Depreciation} + \\text{NFIA} - \\text{NIT}$.",
          "Step 3: $NNP_{fc} = 8,000 - 600 + (-200) - 600$.",
          "Step 4: $NNP_{fc} = 8,000 - 1,400 = ₹6,600$ crores.",
          "Step 5: Option A is exact.",
        ],
      },
      {
        id: "eco_u4_t1_we2",
        questionNumber: 2,
        question: "If Nominal GDP is ₹1,200 crores and the GDP Deflator is 120, what is the Real GDP?",
        options: [
          { id: "A", text: "₹1,000 crores" },
          { id: "B", text: "₹1,440 crores" },
          { id: "C", text: "₹1,200 crores" },
          { id: "D", text: "₹900 crores" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Formula: $\\text{Real GDP} = \\frac{\\text{Nominal GDP}}{\\text{GDP Deflator}} \\times 100$.",
          "Step 2: $\\text{Real GDP} = \\frac{1,200}{120} \\times 100 = 10 \\times 100 = ₹1,000$ crores.",
          "Step 3: Option A is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Stock vs Flow Classification",
        frequency: "Very High",
        typicalStem: "Which of the following is a stock variable? (A) National Income (B) Capital formation (C) Money supply (D) Depreciation.",
        strategy: "Money supply and capital are stocks (measured at a point in time). Income, investment, and depreciation are flows.",
      },
      {
        patternType: "Exclusion of Transfer Payments",
        frequency: "High",
        typicalStem: "Which of the following is NOT included in the estimation of national income? (A) Old-age pensions (B) Retirement pensions (C) Operating surplus (D) Employer contribution to provident fund.",
        strategy: "Old-age pensions are unearned transfer payments (EXCLUDED). Retirement pensions are deferred factor wages (INCLUDED).",
      },
    ],
    commonTraps: [
      {
        concept: "Old Age Pension vs Retirement Pension",
        misconception: "Treating all pensions as transfer payments.",
        correctUnderstanding: "Old-age pensions are transfer payments (excluded). **Retirement pensions** are deferred wages for past factor services and are **INCLUDED in CoE**.",
      },
      {
        concept: "Gross vs Net Investment Trap",
        misconception: "Forgetting to add depreciation when given 'Net Domestic Capital Formation'.",
        correctUnderstanding: "Expenditure method gives $GDP_{mp}$, which requires GROSS investment. If Net investment is given, you MUST add depreciation.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Conversion Acronym",
        mnemonic: "G-D-M to N-N-F: Gross minus Dep = Net; Domestic plus NFIA = National; Market Price minus NIT = Factor Cost.",
        explanation: "The 3 essential conversion bridges for national income.",
      },
    ],
    quickRevisionCard: {
      title: "National Income Accounting — Quick Card",
      bulletPoints: [
        "National Income = $NNP_{fc}$; Domestic Income = $NDP_{fc}$.",
        "Net = Gross - Depreciation; National = Domestic + NFIA; Factor Cost = Market Price - NIT.",
        "NIT = Indirect Taxes - Subsidies.",
        "Stock: Wealth, Capital, Money supply; Flow: Income, Investment, Exports.",
        "Operating Surplus = Rent + Royalty + Interest + Profit (Dividends + Retained Earnings + Corp Tax).",
        "Value Added Method: $GVA_{mp} = \\text{Sales} + \\Delta \\text{Stock} - \\text{Intermediate Consumption}$.",
        "Expenditure Method: $GDP_{mp} = C + I + G + (X - M)$.",
        "Real GDP = (Nominal GDP / GDP Deflator) × 100.",
        "Transfer payments, black money, and second-hand goods are EXCLUDED from national income.",
      ],
    },
    practiceQuestions: [
      {
        id: "eco_u4_t1_q1",
        question: "Which of the following aggregates is formally defined as 'National Income' in macroeconomics?",
        options: [
          { id: "A", text: "GDP at market price (GDP_mp)" },
          { id: "B", text: "NNP at factor cost (NNP_fc)" },
          { id: "C", text: "NDP at factor cost (NDP_fc)" },
          { id: "D", text: "GNP at market price (GNP_mp)" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "National Income is defined as Net National Product at factor cost ($NNP_{fc}$).",
      },
      {
        id: "eco_u4_t1_q2",
        question: "Which of the following is a stock variable?",
        options: [
          { id: "A", text: "Monthly salary" },
          { id: "B", text: "Money supply as on 31st March" },
          { id: "C", text: "Annual exports" },
          { id: "D", text: "Annual depreciation" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "A stock variable is measured at a specific point in time (e.g. money supply on a particular date). Salary, exports, and depreciation are flows measured over a time period.",
      },
      {
        id: "eco_u4_t1_q3",
        question: "Operating Surplus consists of which of the following factor income components?",
        options: [
          { id: "A", text: "Wages, salaries, and pensions" },
          { id: "B", text: "Rent, royalty, interest, and profit" },
          { id: "C", text: "Mixed income and indirect taxes" },
          { id: "D", text: "Subsidies and corporate tax" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Operating surplus is income from property and entrepreneurship, composed of rent, royalty, interest, and profit.",
      },
      {
        id: "eco_u4_t1_q4",
        question: "Why are old-age pensions excluded from the estimation of national income?",
        options: [
          { id: "A", text: "They are paid by the government" },
          { id: "B", text: "They are transfer payments for which no productive service is rendered in return" },
          { id: "C", text: "They are included under intermediate consumption" },
          { id: "D", text: "They represent corporate taxes" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Old-age pensions are unilateral transfer payments that do not contribute to any current flow of goods and services; hence they are excluded from national income.",
      },
      {
        id: "eco_u4_t1_q5",
        question: "Broker's commission on the sale and purchase of second-hand goods is:",
        options: [
          { id: "A", text: "Excluded from national income" },
          { id: "B", text: "Included in national income as it is a reward for rendering current productive services" },
          { id: "C", text: "Treated as a transfer payment" },
          { id: "D", text: "Added to intermediate consumption" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "While the value of second-hand goods is excluded to avoid double counting, broker's commission is an earned factor payment for current facilitation services and is included.",
      },
      {
        id: "eco_u4_t1_q6",
        question: "If Gross Domestic Product at Market Price (GDP_mp) is ₹5,000 crores, Depreciation is ₹400 crores, and Net Indirect Taxes are ₹300 crores, what is the Net Domestic Product at Factor Cost (NDP_fc)?",
        options: [
          { id: "A", text: "₹4,300 crores" },
          { id: "B", text: "₹4,700 crores" },
          { id: "C", text: "₹5,100 crores" },
          { id: "D", text: "₹4,000 crores" },
        ],
        correctOption: "A",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "easy",
        explanation: "$NDP_{fc} = GDP_{mp} - \\text{Depreciation} - \\text{NIT} = 5,000 - 400 - 300 = ₹4,300$ crores.",
      },
      {
        id: "eco_u4_t1_q7",
        question: "The GDP Deflator is mathematically calculated as:",
        options: [
          { id: "A", text: "(Real GDP / Nominal GDP) × 100" },
          { id: "B", text: "(Nominal GDP / Real GDP) × 100" },
          { id: "C", text: "Nominal GDP minus Real GDP" },
          { id: "D", text: "Real GDP divided by Consumer Price Index" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "GDP Deflator = (Nominal GDP / Real GDP) × 100.",
      },
      {
        id: "eco_u4_t1_q8",
        question: "Which of the following is NOT a reason why GDP may fail to serve as an adequate index of social welfare?",
        options: [
          { id: "A", text: "Omission of non-monetary household exchanges" },
          { id: "B", text: "Presence of negative externalities like environmental pollution" },
          { id: "C", text: "High inequality in income distribution" },
          { id: "D", text: "Accurate inclusion of net exports" },
        ],
        correctOption: "D",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Inclusion of net exports is a standard accounting entry; non-monetary exchanges, externalities, and uneven distribution are the actual limitations of GDP as a welfare measure.",
      },
      {
        id: "eco_u4_t1_q9",
        question: "In the value added method, intermediate consumption includes:",
        options: [
          { id: "A", text: "Purchase of raw materials and non-factor services from other firms" },
          { id: "B", text: "Purchase of long-lasting machinery" },
          { id: "C", text: "Wages paid to permanent factory workers" },
          { id: "D", text: "Dividend paid to shareholders" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Intermediate consumption refers to the value of non-factor inputs (raw materials, power, transport) used up in the production process during an accounting year.",
      },
      {
        id: "eco_u4_t1_q10",
        question: "When net factor income from abroad (NFIA) is negative, which of the following relationships is true?",
        options: [
          { id: "A", text: "National Income is greater than Domestic Income" },
          { id: "B", text: "Domestic Income is greater than National Income" },
          { id: "C", text: "Gross Domestic Product equals Gross National Product" },
          { id: "D", text: "Net indirect taxes must be zero" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Since $\\text{National Income} = \\text{Domestic Income} + \\text{NFIA}$, if NFIA is negative, Domestic Income must exceed National Income.",
      },
    ],
  },

  // Unit 5: Money Creation, Central Bank (RBI) Functions, Monetary Policy Tools
  {
    id: "eco_u5_t1",
    slug: "money-creation-central-bank-rbi-functions-monetary-policy-tools",
    subject: "eco",
    subjectName: "Economics",
    subjectCode: "309",
    unitNumber: 5,
    unitTitle: "Money and Banking",
    topicTitle: "Money Creation, Central Bank (RBI) Functions, Monetary Policy Tools",
    ncertReference: {
      class: "Class 12",
      book: "Introductory Macroeconomics",
      chapterNumber: 3,
      chapterName: "Money and Banking",
      sections: [
        "3.1 Money: Meaning, Functions (Primary: Medium of exchange, Unit of account; Secondary: Standard of deferred payment, Store of value)",
        "3.2 Measures of Money Supply in India: M1, M2, M3, M4 (Narrow Money vs Broad Money)",
        "3.3 Credit Creation / Money Creation by Commercial Banks (Deposit Multiplier = $1 / LRR$)",
        "3.4 Central Bank: Meaning and Functions (Bank of Issue, Banker to Government, Banker's Bank & Supervisor, Lender of Last Resort, Custodian of Forex)",
        "3.5 Monetary Policy Instruments: Quantitative (Repo Rate, Reverse Repo, Bank Rate, CRR, SLR, Open Market Operations) vs Qualitative (Margin Requirements, Moral Suasion, Credit Rationing)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (6-8 questions per shift)",
      totalPyqsInRepo: 260,
      weightagePercentage: 14,
    },
    summary30Seconds: [
      "Money Supply Measures: $M_1 = C + DD + OD$ (most liquid); $M_3 = M_1 + \\text{Net Time Deposits with Banks}$ (Broad Money, aggregate monetary resources).",
      "Credit Creation: Commercial banks create credit through fractional reserve system: $\\text{Total Deposits} = \\text{Initial Deposit} \\times \\frac{1}{LRR}$.",
      "Monetary Policy: To curb inflation, RBI raises Repo Rate, Bank Rate, CRR, SLR, and sells securities via OMO; To fight deflation/recession, RBI cuts rates, lowers reserve ratios, and buys securities.",
    ],
    coreConcepts: [
      {
        title: "Money Supply Measures ($M_1$ to $M_4$) & Legal Tender",
        content: `**Money Supply Definition**: Total stock of money in circulation held by the public at a particular point in time (Stock concept). Excludes cash reserves held by commercial banks and government.

**RBI Measures of Money Supply**:
1. **$M_1$ (Narrow Money, Most Liquid)**:
   $$M_1 = C + DD + OD$$
   - $C$: Currency (notes + coins) held by public.
   - $DD$: Demand deposits held by commercial banks (inter-bank deposits excluded).
   - $OD$: Other deposits held with RBI (by international bodies like IMF/World Bank, public institutions; excludes government deposits).
2. **$M_2 = M_1 + \\text{Post Office Savings Bank Deposits}$**.
3. **$M_3$ (Broad Money / Aggregate Monetary Resources)**:
   $$M_3 = M_1 + \\text{Net Time (Fixed) Deposits of Commercial Banks}$$
4. **$M_4 = M_3 + \\text{Total Post Office Deposits (excluding National Savings Certificates / NSC)}$**.
*Liquidity Order*: $M_1 > M_2 > M_3 > M_4$.`,
        ncertPointers: [
          "Fiat Money: Currency backed by government decree/order and legal authority, which every individual is legally bound to accept (Legal Tender).",
          "Fiduciary Money: Money backed by mutual trust between payer and payee, not by legal authority (e.g., Cheques, Drafts).",
          "High Powered Money (Reserve Money, $M_0$): Currency held by public + Cash reserves of commercial banks with RBI + Other deposits with RBI ($H = C + R$).",
        ],
      },
      {
        title: "Credit Creation by Commercial Banking System",
        content: `Commercial banks create credit out of primary cash deposits by maintaining a statutory **Legal Reserve Ratio (LRR)**:
$$LRR = CRR + SLR$$
- **Cash Reserve Ratio (CRR)**: Percentage of Net Demand and Time Liabilities (NDTL) that banks must keep as cash balance with RBI.
- **Statutory Liquidity Ratio (SLR)**: Percentage of NDTL that banks must maintain in liquid assets (gold, unencumbered government securities, cash) with themselves.

**The Money Multiplier Equation**:
$$\\text{Money Multiplier } (k) = \\frac{1}{LRR}$$
$$\\text{Total Credit / Money Created} = \\text{Initial Primary Deposit} \\times \\frac{1}{LRR}$$
*Example*: If initial deposit is ₹1,000 and $LRR = 20\\%$ (0.2), then:
$$\\text{Multiplier } k = \\frac{1}{0.2} = 5 \\implies \\text{Total Credit Created} = ₹1,000 \\times 5 = ₹5,000$$
The banking system creates derivative deposits of ₹4,000 ($₹5,000 - ₹1,000$).`,
        ncertPointers: [
          "Higher the LRR, lower will be the credit creation capacity of the banking system.",
          "Single bank cannot create credit alone; credit creation is an aggregate systemic process across the entire banking chain.",
        ],
      },
      {
        title: "Central Bank Functions & Monetary Policy Instruments",
        content: `**Core Functions of Central Bank (Reserve Bank of India - RBI)**:
1. **Bank of Issue**: Sole authority to issue currency notes (except ₹1 note and coins, which are issued by Ministry of Finance).
2. **Banker, Agent, and Financial Advisor to Government**.
3. **Banker's Bank and Supervisor**: Holds cash reserves of commercial banks and regulates them.
4. **Lender of the Last Resort**: Provides emergency liquidity advances to solvent commercial banks facing temporary liquidity crisis when all other sources fail.
5. **Custodian of Foreign Exchange Reserves**.

**Monetary Policy Instruments**:
- **Quantitative Instruments (Affect overall volume of credit)**:
  1. *Repo Rate*: Rate at which RBI lends short-term funds to commercial banks against government securities collateral.
  2. *Reverse Repo Rate*: Rate at which RBI absorbs liquidity by borrowing funds from commercial banks.
  3. *Bank Rate*: Long-term lending rate without collateral.
  4. *Open Market Operations (OMO)*: Direct purchase and sale of government securities in open market. To contract credit (fight inflation), RBI **sells** securities; to expand credit, RBI **buys** securities.
  5. *CRR and SLR adjustments*.
- **Qualitative / Selective Instruments (Direct flow of credit to specific sectors)**:
  1. *Margin Requirement*: Difference between market value of collateral security and the loan amount granted.
  2. *Moral Suasion*: Informal persuasion and advice by RBI.
  3. *Credit Rationing*: Fixing credit quotas for different business sectors.`,
        ncertPointers: [
          "To control Inflation (Excess Demand): Raise Repo Rate, Bank Rate, CRR, SLR, Margin Requirements; Sell securities in OMO.",
          "To control Deflation (Deficient Demand): Lower Repo Rate, Bank Rate, CRR, SLR, Margin Requirements; Buy securities in OMO.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Money Multiplier & Total Deposit Formula",
        formula: "\\text{Money Multiplier} = \\frac{1}{LRR}; \\quad \\text{Total Deposits} = \\text{Initial Deposit} \\times \\frac{1}{LRR}",
        symbols: "LRR = \\text{Legal Reserve Ratio}",
        siUnits: "Multiplier factor",
        applicationCondition: "Commercial banking deposit expansion",
      },
      {
        name: "Monetary Policy Action Matrix",
        formula: "\\text{Inflation Control} \\implies \\uparrow \\text{Rates, } \\uparrow \\text{Reserves, Sell OMO} \\quad | \\quad \\text{Recession Control} \\implies \\downarrow \\text{Rates, } \\downarrow \\text{Reserves, Buy OMO}",
        symbols: "Policy instruments",
        siUnits: "Percentage rates",
        applicationCondition: "Macroeconomic liquidity management",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Central Bank (RBI) Monetary Policy Transmission Mechanism</text>
  
  <!-- Inflation Stance Box -->
  <rect x="50" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5"/>
  <text x="205" y="90" textAnchor="middle" fill="#fda4af" fontSize="13" fontWeight="bold">Tight Monetary Policy (Fight Inflation)</text>
  
  <text x="80" y="120" fill="#fca5a5" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Increase Repo Rate &amp; Bank Rate</tspan></text>
  <text x="80" y="145" fill="#fca5a5" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Increase CRR and SLR</tspan></text>
  <text x="80" y="170" fill="#fca5a5" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Sell Government Securities (OMO)</tspan></text>
  <text x="80" y="195" fill="#fca5a5" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Increase Margin Requirements</tspan></text>
  
  <rect x="70" y="220" width="270" height="35" rx="6" fill="#0f172a" stroke="#ef4444"/>
  <text x="205" y="242" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">Result: Bank Reserves Fall $\to$ Money Supply Drops</text>
  
  <!-- Deflation Stance Box -->
  <rect x="400" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5"/>
  <text x="555" y="90" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Easy Monetary Policy (Fight Deflation)</text>
  
  <text x="430" y="120" fill="#86efac" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Decrease Repo Rate &amp; Bank Rate</tspan></text>
  <text x="430" y="145" fill="#86efac" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Decrease CRR and SLR</tspan></text>
  <text x="430" y="170" fill="#86efac" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Purchase Government Securities (OMO)</tspan></text>
  <text x="430" y="195" fill="#86efac" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Decrease Margin Requirements</tspan></text>
  
  <rect x="420" y="220" width="270" height="35" rx="6" fill="#0f172a" stroke="#10b981"/>
  <text x="555" y="242" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">Result: Bank Reserves Rise $\to$ Credit Expands</text>
</svg>`,
    workedExamples: [
      {
        id: "eco_u5_t1_we1",
        questionNumber: 1,
        question: "If the Legal Reserve Ratio (LRR) is 25% and the commercial banking system receives an initial primary cash deposit of ₹2,000 crores, calculate the total credit created by the banking system.",
        options: [
          { id: "A", text: "₹8,000 crores" },
          { id: "B", text: "₹6,000 crores" },
          { id: "C", text: "₹10,000 crores" },
          { id: "D", text: "₹2,500 crores" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Money Multiplier $k = \\frac{1}{LRR} = \\frac{1}{0.25} = 4$.",
          "Step 2: Total deposits created = Initial Deposit × Money Multiplier = ₹2,000 × 4 = ₹8,000 crores.",
          "Step 3: Option A is correct.",
        ],
      },
      {
        id: "eco_u5_t1_we2",
        questionNumber: 2,
        question: "To combat high inflation in the economy, what action should the Reserve Bank of India (RBI) take regarding Open Market Operations and the Repo Rate?",
        options: [
          { id: "A", text: "Buy government securities and decrease repo rate" },
          { id: "B", text: "Sell government securities and increase repo rate" },
          { id: "C", text: "Sell government securities and decrease repo rate" },
          { id: "D", text: "Buy government securities and increase repo rate" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: During inflation, money supply and aggregate demand are excessively high.",
          "Step 2: RBI sells government securities in open market operations, absorbing liquidity from banks and the public.",
          "Step 3: RBI increases the repo rate, making borrowing costlier and discouraging commercial bank lending.",
          "Step 4: Both actions contract money supply and curb inflation. Option B is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Money Multiplier Numerical Calculation",
        frequency: "Very High",
        typicalStem: "If initial deposits are ₹500 and total deposits created are ₹5,000, what is the value of the Legal Reserve Ratio (LRR)?",
        strategy: "$k = 5,000 / 500 = 10 \\implies LRR = 1/k = 1/10 = 0.10 = 10\\%$.",
      },
      {
        patternType: "M3 Composition Matching",
        frequency: "High",
        typicalStem: "M3 measure of money supply includes M1 plus which of the following components?",
        strategy: "Net time (fixed) deposits with commercial banks.",
      },
    ],
    commonTraps: [
      {
        concept: "Total Deposit vs Net Credit Created",
        misconception: "Confusing total deposits with derivative/net credit created.",
        correctUnderstanding: "Total deposit created = Initial deposit × Multiplier. Net/derivative credit created = Total deposit - Initial primary deposit.",
      },
      {
        concept: "Inter-bank Deposits in Money Supply",
        misconception: "Including deposits held by one bank with another in M1.",
        correctUnderstanding: "Money supply measures money held ONLY BY THE PUBLIC. Inter-bank deposits are strictly excluded.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Narrow vs Broad Money",
        mnemonic: "M1 is Narrow, M3 is Broad (Time deposits broaden M1).",
        explanation: "Quick anchor for money supply classifications.",
      },
    ],
    quickRevisionCard: {
      title: "Money & Banking — High-Yield Cheat Sheet",
      bulletPoints: [
        "M1 = Currency + Demand Deposits + Other deposits with RBI (most liquid).",
        "M3 = M1 + Net Time Deposits of banks (Broad Money / aggregate resources).",
        "Money Multiplier $k = 1 / LRR$. Total Deposits = Initial Deposit × $(1/LRR)$.",
        "Central Bank functions: Note issue, Banker to government, Lender of last resort.",
        "Repo Rate: Short-term lending to banks; Reverse Repo: Borrowing from banks.",
        "To fight inflation: Raise Repo rate, CRR, SLR; SELL securities in OMO.",
        "To fight deflation: Cut Repo rate, CRR, SLR; BUY securities in OMO.",
        "Margin requirement is a Qualitative / Selective credit control tool.",
      ],
    },
    practiceQuestions: [
      {
        id: "eco_u5_t1_q1",
        question: "Which of the following measures of money supply is considered the most liquid and termed as 'Narrow Money'?",
        options: [
          { id: "A", text: "M1" },
          { id: "B", text: "M2" },
          { id: "C", text: "M3" },
          { id: "D", text: "M4" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "$M_1$ includes currency with public, demand deposits, and other deposits with RBI; it is the most liquid measure of money supply.",
      },
      {
        id: "eco_u5_t1_q2",
        question: "If the Legal Reserve Ratio (LRR) is 20%, what is the value of the money multiplier?",
        options: [
          { id: "A", text: "2" },
          { id: "B", text: "5" },
          { id: "C", text: "10" },
          { id: "D", text: "20" },
        ],
        correctOption: "B",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "easy",
        explanation: "Money multiplier $k = 1 / LRR = 1 / 0.20 = 5$.",
      },
      {
        id: "eco_u5_t1_q3",
        question: "When the Central Bank acts as a 'Lender of Last Resort', it means that:",
        options: [
          { id: "A", text: "It lends money directly to general public during emergencies" },
          { id: "B", text: "It provides financial accommodation to solvent commercial banks facing temporary liquidity crisis when all other sources fail" },
          { id: "C", text: "It finances the budget deficit of the central government exclusively" },
          { id: "D", text: "It guarantees zero interest rates on home loans" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "As the lender of last resort, the central bank stands by commercial banks to prevent bank runs and systemic financial collapse.",
      },
      {
        id: "eco_u5_t1_q4",
        question: "The rate at which the Reserve Bank of India lends short-term funds to commercial banks against approved government securities is called:",
        options: [
          { id: "A", text: "Bank Rate" },
          { id: "B", text: "Repo Rate" },
          { id: "C", text: "Reverse Repo Rate" },
          { id: "D", text: "Statutory Liquidity Ratio" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Repo (repurchase) rate is the rate at which the central bank lends money to commercial banks against pledged collateral securities for short durations.",
      },
      {
        id: "eco_u5_t1_q5",
        question: "To curb inflationary pressures in the economy, the Central Bank should:",
        options: [
          { id: "A", text: "Reduce Cash Reserve Ratio (CRR)" },
          { id: "B", text: "Sell government securities in the open market (OMO)" },
          { id: "C", text: "Decrease the Repo Rate" },
          { id: "D", text: "Lower Margin Requirements" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Selling government securities in the open market sucks liquidity out of the banking system, reducing commercial banks' lending capability.",
      },
      {
        id: "eco_u5_t1_q6",
        question: "Which of the following is a qualitative instrument of monetary policy?",
        options: [
          { id: "A", text: "Cash Reserve Ratio (CRR)" },
          { id: "B", text: "Margin Requirement" },
          { id: "C", text: "Open Market Operations (OMO)" },
          { id: "D", text: "Bank Rate" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Margin requirement is a selective/qualitative instrument used to regulate the direction of credit towards specific sectors.",
      },
      {
        id: "eco_u5_t1_q7",
        question: "High-powered money (H) consists of:",
        options: [
          { id: "A", text: "Currency held by the public and cash reserves of commercial banks" },
          { id: "B", text: "Demand deposits and time deposits only" },
          { id: "C", text: "Post office savings deposits" },
          { id: "D", text: "Treasury bills and government bonds only" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "High-powered money (monetary base) consists of currency held by public ($C$), cash reserves of banks with RBI ($R$), and other deposits with RBI.",
      },
      {
        id: "eco_u5_t1_q8",
        question: "Currency notes in India (other than the one-rupee note) are issued by:",
        options: [
          { id: "A", text: "Ministry of Finance" },
          { id: "B", text: "Reserve Bank of India" },
          { id: "C", text: "State Bank of India" },
          { id: "D", text: "NITI Aayog" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The Reserve Bank of India has the sole right of issuing currency notes in India. One-rupee notes and coins are issued by the Ministry of Finance.",
      },
      {
        id: "eco_u5_t1_q9",
        question: "The Statutory Liquidity Ratio (SLR) requires commercial banks to maintain a specified percentage of their net demand and time liabilities in the form of:",
        options: [
          { id: "A", text: "Cash balance deposited with RBI" },
          { id: "B", text: "Liquid assets (cash, gold, unencumbered approved securities) with themselves" },
          { id: "C", text: "Shares of private companies" },
          { id: "D", text: "Foreign exchange in overseas banks" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "SLR is the proportion of NDTL that commercial banks must maintain in liquid assets (cash, gold, government securities) with themselves.",
      },
      {
        id: "eco_u5_t1_q10",
        question: "In India, the broad money measure M3 is computed as:",
        options: [
          { id: "A", text: "M1 + Post office savings deposits" },
          { id: "B", text: "M1 + Net time deposits with commercial banks" },
          { id: "C", text: "M2 + Total post office deposits" },
          { id: "D", text: "Currency with public + Inter-bank deposits" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "$M_3 = M_1 + \\text{Net time deposits with the banking system}$.",
      },
    ],
  },

  // Unit 6: Aggregate Demand and Supply, Propensities to Consume and Save, Multiplier Mechanism
  {
    id: "eco_u6_t1",
    slug: "aggregate-demand-and-supply-propensities-to-consume-and-save-multiplier-mechanism",
    subject: "eco",
    subjectName: "Economics",
    subjectCode: "309",
    unitNumber: 6,
    unitTitle: "Determination of Income and Employment",
    topicTitle: "Aggregate Demand and Supply, Propensities to Consume and Save, Multiplier Mechanism",
    ncertReference: {
      class: "Class 12",
      book: "Introductory Macroeconomics",
      chapterNumber: 4,
      chapterName: "Determination of Income and Employment",
      sections: [
        "4.1 Aggregate Demand (AD = C + I) and its Components",
        "4.2 Aggregate Supply (AS = C + S = Y, 45-degree line)",
        "4.3 Consumption Function: $C = \\bar{c} + bY$ (Autonomous Consumption and MPC)",
        "4.4 Saving Function: $S = -\\bar{c} + (1 - b)Y$ (MPS)",
        "4.5 Propensities: APC, MPC, APS, MPS (Mathematical relationships: $APC + APS = 1$; $MPC + MPS = 1$)",
        "4.6 Short-Run Equilibrium Output (AD = AS approach and S = I approach)",
        "4.7 Investment Multiplier ($k = \\frac{1}{1 - MPC} = \\frac{1}{MPS}$) & Forward/Backward Working",
        "4.8 Deficient Demand (Deflationary Gap) and Excess Demand (Inflationary Gap) and Fiscal/Monetary Remedies",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (8-10 questions per shift)",
      totalPyqsInRepo: 305,
      weightagePercentage: 17,
    },
    summary30Seconds: [
      "Key Keynesian Identities: $APC + APS = 1$ and $MPC + MPS = 1$. The value of MPC lies strictly between 0 and 1 ($0 < MPC < 1$).",
      "Investment Multiplier: $k = \\frac{\\Delta Y}{\\Delta I} = \\frac{1}{1 - MPC} = \\frac{1}{MPS}$. Minimum value is 1 (when $MPC = 0$), maximum is $\\infty$ (when $MPC = 1$).",
      "Macroeconomic Equilibrium: $AD = AS$ or $S = I$. Excess Demand causes an Inflationary Gap (remedy: cut government spending, raise taxes, tighten credit); Deficient Demand causes a Deflationary Gap (remedy: boost public spending, cut taxes, expand credit).",
    ],
    coreConcepts: [
      {
        title: "Consumption & Saving Functions & Propensities",
        content: `**Consumption Function**:
Linear Keynesian consumption function relates consumption directly to disposable income:
$$C = \\bar{c} + bY$$
Where:
- $\\bar{c}$ = **Autonomous Consumption** (consumption at zero income level, financed through dissaving).
- $b$ = **Marginal Propensity to Consume (MPC)** ($b = \\frac{\\Delta C}{\\Delta Y}$, slope of consumption curve).
- $Y$ = Income.

**Saving Function**:
Derived directly from consumption ($S = Y - C$):
$$S = -\\bar{c} + (1 - b)Y = -\\bar{c} + sY$$
Where:
- $-\\bar{c}$ = Autonomous dissaving at zero income.
- $(1 - b) = s$ = **Marginal Propensity to Save (MPS)** ($s = \\frac{\\Delta S}{\\Delta Y}$, slope of saving curve).

**Mathematical Relationships**:
1. **Average Propensities**:
   - $APC = \\frac{C}{Y}$; $APS = \\frac{S}{Y}$.
   - $APC + APS = \\frac{C}{Y} + \\frac{S}{Y} = \\frac{Y}{Y} = \\mathbf{1}$.
   - *Key Property*: $APC$ can be greater than 1 (when $C > Y$, at low income levels), but $APS$ can be negative.
2. **Marginal Propensities**:
   - $MPC = \\frac{\\Delta C}{\\Delta Y}$; $MPS = \\frac{\\Delta S}{\\Delta Y}$.
   - $MPC + MPS = \\mathbf{1} \\implies MPS = 1 - MPC$.
   - *Key Property*: Both $MPC$ and $MPS$ are always positive and lie strictly between 0 and 1 ($0 \\le MPC \\le 1$).`,
        ncertPointers: [
          "Break-even Point: Where $C = Y$ or $S = 0$, meaning $APC = 1$ and $APS = 0$.",
          "Aggregate Supply ($AS$) line is always represented by a 45-degree line from the origin because $AS = C + S = Y$ at all points.",
        ],
      },
      {
        title: "Macroeconomic Equilibrium & The Investment Multiplier",
        content: `**Equilibrium Output Conditions**:
In a two-sector Keynesian model (Households and Firms):
1. **$AD = AS$ Approach**:
   $$AD = C + I = \\bar{c} + bY + \\bar{I} \\quad \\text{and} \\quad AS = Y$$
   Equilibrium occurs where the $AD$ line intersects the $45^\\circ$ line:
   $$Y = \\frac{\\bar{c} + \\bar{I}}{1 - b} = \\frac{\\bar{A}}{1 - MPC}$$
2. **$S = I$ Approach**:
   Equilibrium occurs where the saving curve intersects the autonomous investment line ($S = I$).
   - If $S > I$: Unintended inventory accumulation $\\to$ firms cut production until $S = I$.
   - If $S < I$: Unintended inventory depletion $\\to$ firms expand production until $S = I$.

**The Investment Multiplier ($k$)**:
Measures the number of times by which income increases due to an autonomous increase in investment:
$$k = \\frac{\\Delta Y}{\\Delta I} = \\frac{1}{1 - MPC} = \\frac{1}{MPS}$$
- **Direct relation with MPC**: Higher the MPC, higher the multiplier.
- **Inverse relation with MPS**: Higher the MPS, lower the multiplier.
- **Range of Multiplier**:
  - If $MPC = 0 \\implies k = 1$ (Minimum value).
  - If $MPC = 1 \\implies k = \\infty$ (Maximum value).`,
        ncertPointers: [
          "Paradox of Thrift: If everyone in the society tries to save more (increase MPS), the aggregate demand falls, reducing total income, so that total savings in the economy either remains unchanged or declines.",
        ],
      },
      {
        title: "Excess Demand vs Deficient Demand & Fiscal Remedies",
        content: `**Excess Demand (Inflationary Gap)**:
- Occurs when Aggregate Demand exceeds Aggregate Supply at full employment level ($AD > AS_{FE}$).
- **Inflationary Gap**: The vertical distance by which actual aggregate demand exceeds aggregate demand required for full employment.
- Result: Does NOT increase real output (since economy is already at full employment); only drives up general price level (**Demand-Pull Inflation**).
- **Remedies**:
  - *Fiscal Policy*: Decrease government spending ($G \\downarrow$), increase taxes ($T \\uparrow$).
  - *Monetary Policy*: Raise Repo Rate, raise CRR/SLR, sell government securities in OMO.

**Deficient Demand (Deflationary Gap)**:
- Occurs when Aggregate Demand is less than Aggregate Supply at full employment level ($AD < AS_{FE}$).
- **Deflationary Gap**: The shortfall in aggregate demand below the full employment level.
- Result: Underemployment equilibrium, idle production capacity, involuntary unemployment, fall in prices.
- **Remedies**:
  - *Fiscal Policy*: Increase government spending ($G \\uparrow$), reduce taxes ($T \\downarrow$), deficit financing.
  - *Monetary Policy*: Lower Repo Rate, reduce CRR/SLR, purchase government securities in OMO.`,
        ncertPointers: [
          "Involuntary unemployment: A situation where capable people willing to work at prevailing wage rates cannot find jobs.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Keynesian Propensities & Multiplier",
        formula: "APC + APS = 1; \\quad MPC + MPS = 1; \\quad k = \\frac{\\Delta Y}{\\Delta I} = \\frac{1}{1 - MPC} = \\frac{1}{MPS}",
        symbols: "k = Multiplier, MPC, MPS, APC, APS",
        siUnits: "Pure numbers / Multipliers",
        applicationCondition: "Income determination theory",
      },
      {
        name: "Equilibrium Income Formula",
        formula: "Y^* = \\frac{\\bar{c} + \\bar{I}}{1 - b} = \\frac{\\text{Autonomous Expenditure}}{MPS}",
        symbols: "\\bar{c} = \\text{Autonomous consumption}, \\bar{I} = \\text{Autonomous investment}",
        siUnits: "Crores of INR",
        applicationCondition: "Two-sector macroeconomic equilibrium",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Keynesian Equilibrium (AD = AS) &amp; Inflationary / Deflationary Gaps</text>
  
  <!-- Axes -->
  <line x1="80" y1="250" x2="680" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <line x1="80" y1="50" x2="80" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <text x="380" y="278" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Income / Output (Y)</text>
  <text x="45" y="150" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold" transform="rotate(-90 45 150)">AD &amp; AS (₹)</text>
  
  <!-- 45-degree AS line -->
  <line x1="80" y1="250" x2="550" y2="60" stroke="#38bdf8" strokeWidth="2.5"/>
  <text x="560" y="65" fill="#38bdf8" fontSize="12" fontWeight="bold">AS = Y (45° line)</text>
  
  <!-- AD Full Employment (AD_FE) -->
  <line x1="80" y1="170" x2="580" y2="90" stroke="#10b981" strokeWidth="3"/>
  <text x="590" y="95" fill="#34d399" fontSize="12" fontWeight="bold">AD (Full Empl.)</text>
  
  <!-- Equilibrium E -->
  <circle cx="395" cy="120" r="6" fill="#fbbf24"/>
  <text x="395" y="105" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">E (Full Empl. Equil.)</text>
  
  <!-- AD Excess Demand (Inflationary) -->
  <line x1="80" y1="130" x2="580" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 5"/>
  <text x="590" y="55" fill="#f87171" fontSize="11">AD (Excess Demand)</text>
  
  <!-- AD Deficient Demand (Deflationary) -->
  <line x1="80" y1="210" x2="580" y2="130" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 5"/>
  <text x="590" y="135" fill="#c084fc" fontSize="11">AD (Deficient Demand)</text>
  
  <!-- Gap Brackets -->
  <line x1="395" y1="75" x2="395" y2="120" stroke="#ef4444" strokeWidth="3"/>
  <text x="385" y="95" textAnchor="end" fill="#f87171" fontSize="10" fontWeight="bold">Inflationary Gap</text>
  
  <line x1="395" y1="120" x2="395" y2="160" stroke="#a855f7" strokeWidth="3"/>
  <text x="385" y="145" textAnchor="end" fill="#c084fc" fontSize="10" fontWeight="bold">Deflationary Gap</text>
</svg>`,
    workedExamples: [
      {
        id: "eco_u6_t1_we1",
        questionNumber: 1,
        question: "In an economy, Marginal Propensity to Consume (MPC) is 0.8. If autonomous investment increases by ₹500 crores, calculate the resulting increase in total National Income (ΔY).",
        options: [
          { id: "A", text: "₹2,500 crores" },
          { id: "B", text: "₹2,000 crores" },
          { id: "C", text: "₹4,000 crores" },
          { id: "D", text: "₹1,000 crores" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Multiplier $k = \\frac{1}{1 - MPC} = \\frac{1}{1 - 0.8} = \\frac{1}{0.2} = 5$.",
          "Step 2: Increase in income $\\Delta Y = k \\times \\Delta I$.",
          "Step 3: $\\Delta Y = 5 \\times ₹500 = ₹2,500$ crores.",
          "Step 4: Option A is exact.",
        ],
      },
      {
        id: "eco_u6_t1_we2",
        questionNumber: 2,
        question: "In an economy with consumption function $C = 100 + 0.75Y$ and autonomous investment $I = ₹200$ crores, calculate the equilibrium level of National Income ($Y$).",
        options: [
          { id: "A", text: "₹1,200 crores" },
          { id: "B", text: "₹1,000 crores" },
          { id: "C", text: "₹800 crores" },
          { id: "D", text: "₹1,500 crores" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: In equilibrium, $Y = C + I$.",
          "Step 2: $Y = (100 + 0.75Y) + 200$.",
          "Step 3: $Y - 0.75Y = 300 \\implies 0.25Y = 300$.",
          "Step 4: $Y = \\frac{300}{0.25} = ₹1,200$ crores.",
          "Step 5: Option A is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Relationship between MPC and Investment Multiplier",
        frequency: "Very High",
        typicalStem: "If Marginal Propensity to Save (MPS) is 0.25, the value of the investment multiplier is:",
        strategy: "$k = 1 / MPS = 1 / 0.25 = 4$.",
      },
      {
        patternType: "Value of APC Greater than One",
        frequency: "High",
        typicalStem: "Can the Average Propensity to Consume (APC) be greater than 1? Explain.",
        strategy: "Yes, at low levels of income before break-even ($C > Y$), $APC = C/Y > 1$ due to dissaving.",
      },
    ],
    commonTraps: [
      {
        concept: "MPC Greater than 1 Trap",
        misconception: "Believing MPC can be greater than 1 like APC.",
        correctUnderstanding: "APC can be greater than 1 (when $C > Y$), but **MPC can NEVER be greater than 1** ($0 \\le MPC \\le 1$), because consumers never spend more than 100% of an addition to income.",
      },
      {
        concept: "Inflationary Gap Output Fallacy",
        misconception: "Thinking an inflationary gap increases real output.",
        correctUnderstanding: "Because the economy is already at full employment, output CANNOT expand further. An inflationary gap leads purely to price inflation.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Multiplier Shortcuts",
        mnemonic: "k = 1 / MPS (Whenever MPS is given, just invert it!).",
        explanation: "MPS 0.2 $\\to k=5$; MPS 0.25 $\\to k=4$; MPS 0.5 $\\to k=2$.",
      },
    ],
    quickRevisionCard: {
      title: "Income & Employment — Quick Revision Card",
      bulletPoints: [
        "Consumption: $C = \\bar{c} + bY$. Saving: $S = -\\bar{c} + (1 - b)Y$.",
        "$APC + APS = 1$; $MPC + MPS = 1$.",
        "APC can be $>1$ (at low income); MPC is always between 0 and 1 ($0 \\le MPC \\le 1$).",
        "At break-even point: $C = Y \\implies S = 0, APC = 1, APS = 0$.",
        "Multiplier $k = \\Delta Y / \\Delta I = 1 / (1 - MPC) = 1 / MPS$.",
        "Minimum value of $k = 1$ (when $MPC = 0$); Maximum value = $\\infty$ (when $MPC = 1$).",
        "Equilibrium: $AD = AS$ or $S = I$.",
        "Inflationary gap $\\implies$ Excess demand at full employment (Solution: Tight fiscal/monetary).",
        "Deflationary gap $\\implies$ Deficient demand below full employment (Solution: Easy fiscal/monetary).",
      ],
    },
    practiceQuestions: [
      {
        id: "eco_u6_t1_q1",
        question: "If Marginal Propensity to Save (MPS) is 0.2, what is the value of the Investment Multiplier?",
        options: [
          { id: "A", text: "2" },
          { id: "B", text: "5" },
          { id: "C", text: "4" },
          { id: "D", text: "10" },
        ],
        correctOption: "B",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "easy",
        explanation: "Investment multiplier $k = 1 / MPS = 1 / 0.2 = 5$.",
      },
      {
        id: "eco_u6_t1_q2",
        question: "Which of the following statements about Average Propensity to Consume (APC) is TRUE?",
        options: [
          { id: "A", text: "APC can never be greater than 1" },
          { id: "B", text: "APC can be greater than 1 at income levels below the break-even point" },
          { id: "C", text: "APC is always equal to MPC" },
          { id: "D", text: "APC is always zero when income is zero" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "At low levels of income before the break-even point, consumption exceeds income ($C > Y$) due to dissaving, so $APC = C / Y > 1$.",
      },
      {
        id: "eco_u6_t1_q3",
        question: "At the break-even point of income:",
        options: [
          { id: "A", text: "Total Consumption = Total Income and Saving = 0" },
          { id: "B", text: "APC = 0 and APS = 1" },
          { id: "C", text: "MPC = 0" },
          { id: "D", text: "Autonomous consumption is zero" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "At the break-even level of income, consumption expenditure equals income ($C = Y$), which means savings are zero ($S = 0$) and $APC = 1$.",
      },
      {
        id: "eco_u6_t1_q4",
        question: "The minimum and maximum possible values of the Investment Multiplier are:",
        options: [
          { id: "A", text: "0 and 1" },
          { id: "B", text: "1 and Infinity" },
          { id: "C", text: "0 and Infinity" },
          { id: "D", text: "1 and 100" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "When $MPC = 0, k = 1 / (1 - 0) = 1$ (minimum). When $MPC = 1, k = 1 / (1 - 1) = \\infty$ (maximum).",
      },
      {
        id: "eco_u6_t1_q5",
        question: "An inflationary gap exists when:",
        options: [
          { id: "A", text: "Aggregate Demand exceeds Aggregate Supply at full employment level" },
          { id: "B", text: "Aggregate Supply exceeds Aggregate Demand at full employment level" },
          { id: "C", text: "There is involuntary unemployment" },
          { id: "D", text: "Money multiplier is equal to zero" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "An inflationary gap is the amount by which actual aggregate demand exceeds the aggregate demand required to establish full employment equilibrium.",
      },
      {
        id: "eco_u6_t1_q6",
        question: "Which of the following fiscal measures is appropriate to correct deficient demand in the economy?",
        options: [
          { id: "A", text: "Reduction in government expenditure" },
          { id: "B", text: "Increase in taxes on households and corporations" },
          { id: "C", text: "Increase in government spending on infrastructure and public works" },
          { id: "D", text: "Increase in Cash Reserve Ratio" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "To correct deficient demand (deflationary gap), government raises public expenditure ($G$), injecting demand directly into the circular flow.",
      },
      {
        id: "eco_u6_t1_q7",
        question: "If the consumption function is C = 50 + 0.6Y, what is the corresponding saving function?",
        options: [
          { id: "A", text: "S = -50 + 0.4Y" },
          { id: "B", text: "S = 50 + 0.4Y" },
          { id: "C", text: "S = -50 + 0.6Y" },
          { id: "D", text: "S = 0.4Y" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Since $S = Y - C = Y - (50 + 0.6Y) = -50 + (1 - 0.6)Y = -50 + 0.4Y$.",
      },
      {
        id: "eco_u6_t1_q8",
        question: "The 'Paradox of Thrift' demonstrates that if all individuals in an economy simultaneously attempt to save more:",
        options: [
          { id: "A", text: "Total national savings will drastically increase" },
          { id: "B", text: "Aggregate demand falls, reducing total income, leaving total savings unchanged or reduced" },
          { id: "C", text: "Investment multiplier increases to infinity" },
          { id: "D", text: "Economic growth accelerates" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Higher thriftiness (MPS) lowers consumption and AD, contracting aggregate national output and income, so total realized saving fails to rise.",
      },
      {
        id: "eco_u6_t1_q9",
        question: "If an increase in investment of ₹1,000 crores leads to an increase in national income of ₹4,000 crores, the Marginal Propensity to Consume (MPC) is:",
        options: [
          { id: "A", text: "0.25" },
          { id: "B", text: "0.75" },
          { id: "C", text: "0.80" },
          { id: "D", text: "0.50" },
        ],
        correctOption: "B",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "medium",
        explanation: "$k = \\Delta Y / \\Delta I = 4,000 / 1,000 = 4$. Since $k = 1 / (1 - MPC) \\implies 4 = 1 / (1 - MPC) \\implies 1 - MPC = 0.25 \\implies MPC = 0.75$.",
      },
      {
        id: "eco_u6_t1_q10",
        question: "Involuntary unemployment occurs when:",
        options: [
          { id: "A", text: "People choose not to work at current wages" },
          { id: "B", text: "People who are willing and able to work at prevailing wages cannot find employment" },
          { id: "C", text: "Workers are moving between jobs" },
          { id: "D", text: "Workers take study leaves" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Involuntary unemployment refers to an economic state where able-bodied persons willing to work at prevailing market wage rates fail to secure employment due to deficient aggregate demand.",
      },
    ],
  },
];
