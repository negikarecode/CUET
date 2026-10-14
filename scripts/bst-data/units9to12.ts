import { NoteDocument } from "@/types/notes";

export const bstUnits9to12Topics: NoteDocument[] = [
  // Unit 9: Financial Decisions, Capital Structure, Fixed and Working Capital
  {
    id: "bst_u9_t1",
    slug: "financial-decisions-capital-structure-fixed-and-working-capital",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 9,
    unitTitle: "Financial Management",
    topicTitle: "Financial Decisions, Capital Structure, Fixed and Working Capital",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Business Finance and Marketing",
      chapterNumber: 9,
      chapterName: "Financial Management",
      sections: [
        "9.1 Meaning, Objectives of Financial Management (Wealth Maximisation of Shareholders)",
        "9.2 Three Financial Decisions: Investment Decision (Capital Budgeting vs Working Capital), Financing Decision (Cost of Debt vs Equity), Dividend Decision",
        "9.3 Financial Planning: Concept and Objectives (Ensuring availability of funds, Avoiding idle funds)",
        "9.4 Capital Structure: Meaning, Financial Leverage / Trading on Equity ($ROI > \\text{Cost of Debt}$), Factors affecting Capital Structure",
        "9.5 Fixed Capital: Meaning and Determinants",
        "9.6 Working Capital: Operating Cycle, Gross vs Net Working Capital, Factors affecting Working Capital requirements",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (6-8 questions per shift)",
      totalPyqsInRepo: 250,
      weightagePercentage: 11,
    },
    summary30Seconds: [
      "Prime Objective of Financial Management: Wealth Maximisation of Equity Shareholders (maximizing market price per share).",
      "Three Decisions: Investment (Capital Budgeting: long-term asset allocation), Financing (Debt vs Equity mix), Dividend (retained earnings vs payout).",
      "Trading on Equity (Financial Leverage): When Return on Investment (ROI) > Cost of Debt, issuing more debt increases Earnings Per Share (EPS). Fixed Capital is needed for long-term assets; Working Capital depends on length of the operating cycle.",
    ],
    coreConcepts: [
      {
        title: "Three Financial Decisions & Wealth Maximisation",
        content: `**Primary Objective**: Wealth Maximisation of Equity Shareholders.
- Measured by maximizing the **Market Price of Equity Shares** ($MPS$).
- All financial decisions are evaluated by whether they add to shareholder wealth.

**The Three Interrelated Financial Decisions**:
1. **Investment Decision (Capital Budgeting Decision)**:
   - Allocation of firm's capital funds to long-term assets (buying plant, machinery, launching new product).
   - Involves huge capital outlays, irreversible commitments, and long-term risk.
   - Factors considered: Cash flows of project, Rate of Return ($ROI$), and investment criteria involved.
2. **Financing Decision**:
   - Deciding the proportion of debt and equity in total capital.
   - *Debt*: Cheaper source (interest is a tax-deductible expense), but involves financial risk of mandatory interest/repayment.
   - *Equity*: Safe source (no mandatory dividend), but costlier due to higher flotation costs and dilution of control.
3. **Dividend Decision**:
   - Deciding how much of net profit after tax should be distributed to shareholders as dividends and how much retained as retained earnings for future growth.
   - Factors: Stability of earnings, growth opportunities, cash flow position, shareholder preferences, taxation policy.`,
        ncertPointers: [
          "Financial Management is concerned with optimal procurement as well as optimal usage of finance.",
          "Working capital decisions affect liquidity as well as profitability.",
        ],
      },
      {
        title: "Capital Structure & Trading on Equity (Financial Leverage)",
        content: `**Capital Structure**: The permanent financing mix of **Debt and Equity**:
$$\\text{Financial Leverage} = \\frac{\\text{Debt}}{\\text{Equity}} \\quad \\text{or} \\quad \\frac{\\text{Debt}}{\\text{Debt} + \\text{Equity}}$$

**Trading on Equity (Favourable Financial Leverage)**:
Refers to the practice of increasing the proportion of debt in capital structure to **magnify the Earnings Per Share (EPS)** for equity shareholders.
- **Condition for Favourable Financial Leverage**:
  $$\\mathbf{ROI > \\text{Rate of Interest on Debt}}$$
  - When $ROI > \\text{Cost of Debt}$, each additional rupee borrowed at a fixed low interest rate earns a higher return in business operations. The surplus after paying interest and tax accrues to equity holders, increasing $EPS$.
- **Unfavourable Financial Leverage**:
  - If $ROI < \\text{Cost of Debt}$, debt becomes a burden; paying fixed interest reduces $EPS$ drastically, raising bankruptcy risk.
- **Tax Deductibility of Interest**:
  - Since interest on debt is deducted from taxable income before calculating corporate tax, the effective after-tax cost of debt is:
    $$\\text{Effective Cost of Debt} = \\text{Interest Rate} \\times (1 - \\text{Tax Rate})$$`,
        ncertPointers: [
          "EBIT-EPS Analysis is used to determine optimal capital structure.",
          "High business risk requires lower financial risk (less debt).",
        ],
      },
      {
        title: "Fixed vs Working Capital Requirements",
        content: `**1. Fixed Capital Determinants** (Capital invested in long-term fixed assets):
- *Nature of Business*: Manufacturing firms require high fixed capital (plant, machinery); Trading firms require low fixed capital.
- *Scale of Operations*: Larger scale requires more fixed assets.
- *Choice of Technique*: Capital-intensive technology requires more fixed capital than labor-intensive.
- *Technology Upgradation*: Rapid obsolescence (e.g. IT/computers) demands frequent fixed capital investments.
- *Financing Alternatives*: Availability of leasing facilities reduces fixed capital requirements.

**2. Working Capital Determinants** (Capital for day-to-day operations: $CA - CL$):
- *Operating Cycle*: Time period between acquisition of raw materials and final cash realization from debtors. **Longer operating cycle $\\implies$ Higher working capital requirement**.
- *Business Cycle*: Boom periods increase production and sales $\\implies$ higher working capital.
- *Seasonal Factors*: Peak season requires higher working capital.
- *Credit Allowed to Debtors*: Liberal credit policy increases debtors $\\implies$ higher working capital.
- *Credit Availed from Creditors*: Generous credit from suppliers reduces working capital needs.`,
        ncertPointers: [
          "Gross Working Capital = Total Current Assets. Net Working Capital = Current Assets - Current Liabilities.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Condition for Trading on Equity",
        formula: "\\text{Favourable Leverage (EPS Increases)} \\iff \\text{ROI} > \\text{Interest Rate on Debt}",
        symbols: "ROI = EBIT / Total Capital Employed",
        siUnits: "Percentages",
        applicationCondition: "Capital structure optimization",
      },
      {
        name: "Operating Cycle Relation",
        formula: "\\text{Operating Cycle } \\uparrow \\implies \\text{Working Capital Requirement } \\uparrow",
        symbols: "Time to cash conversion",
        siUnits: "Days / Months",
        applicationCondition: "Working capital estimation",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">The Three Interconnected Financial Management Decisions</text>
  
  <!-- Investment Decision Box -->
  <rect x="50" y="70" width="200" height="180" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="150" y="95" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">1. Investment Decision</text>
  <text x="150" y="115" textAnchor="middle" fill="#93c5fd" fontSize="11">(Capital Budgeting)</text>
  <text x="150" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Long-term asset deployment</text>
  <text x="150" y="165" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Capital expenditure ROI</text>
  <text x="150" y="185" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Working capital liquidity</text>
  <text x="150" y="230" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Where to invest?</text>
  
  <!-- Financing Decision Box -->
  <rect x="280" y="70" width="200" height="180" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="380" y="95" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">2. Financing Decision</text>
  <text x="380" y="115" textAnchor="middle" fill="#86efac" fontSize="11">(Capital Structure)</text>
  <text x="380" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Debt vs Equity mix</text>
  <text x="380" y="165" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Financial leverage</text>
  <text x="380" y="185" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Trading on equity</text>
  <text x="380" y="230" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Where to raise funds?</text>
  
  <!-- Dividend Decision Box -->
  <rect x="510" y="70" width="200" height="180" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
  <text x="610" y="95" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">3. Dividend Decision</text>
  <text x="610" y="115" textAnchor="middle" fill="#fde68a" fontSize="11">(Profit Distribution)</text>
  <text x="610" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Dividend payout ratio</text>
  <text x="610" y="165" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Retained earnings for growth</text>
  <text x="610" y="185" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Shareholder preferences</text>
  <text x="610" y="230" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">How much to distribute?</text>
  
  <!-- Common Goal Footer -->
  <text x="380" y="275" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Ultimate Common Objective: Wealth Maximisation of Equity Shareholders (Max MPS)</text>
</svg>`,
    workedExamples: [
      {
        id: "bst_u9_t1_we1",
        questionNumber: 1,
        question: "A company has Total Capital Employed of ₹30,00,000. It earns an EBIT (Operating Profit) of ₹6,00,000. The company borrows ₹10,00,000 via 10% Debentures. Tax rate is 30%. Does Trading on Equity benefit equity shareholders?",
        options: [
          { id: "A", text: "Yes, because Return on Investment (20%) is greater than the Cost of Debt (10%)" },
          { id: "B", text: "No, because borrowing creates financial risk" },
          { id: "C", text: "Yes, because tax rate is 30%" },
          { id: "D", text: "No, because debentures are non-convertible" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Calculate Return on Investment: $ROI = \\frac{EBIT}{\\text{Capital Employed}} \\times 100 = \\frac{6,00,000}{30,00,000} \\times 100 = 20\\%$.",
          "Step 2: Cost of Debt is 10%.",
          "Step 3: Since $ROI (20\\%) > \\text{Cost of Debt } (10\\%)$, the company is in a state of **Favourable Financial Leverage**.",
          "Step 4: The excess return earned on borrowed capital accrues directly to equity shareholders, increasing EPS (Trading on Equity is successful). Option A is exact.",
        ],
      },
      {
        id: "bst_u9_t1_we2",
        questionNumber: 2,
        question: "Which of the following enterprises will require the LEAST amount of working capital?",
        options: [
          { id: "A", text: "A heavy machinery manufacturing company with a 12-month operating cycle" },
          { id: "B", text: "A trading enterprise that sells fast-moving goods strictly for cash and receives 60 days credit from suppliers" },
          { id: "C", text: "A company allowing 90 days credit to customers" },
          { id: "D", text: "An automobile manufacturer" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Working capital requirement is directly proportional to the length of the operating cycle and credit extended to customers.",
          "Step 2: A trading firm that sells strictly for cash has zero funds tied up in debtors, while enjoying 60 days credit from suppliers.",
          "Step 3: This results in an extremely short or negative operating cash cycle, requiring minimal working capital. Option B is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Trading on Equity Condition",
        frequency: "Very High",
        typicalStem: "Trading on equity is advantageous and increases EPS when:",
        strategy: "Return on Investment (ROI) is greater than the rate of interest on debt.",
      },
      {
        patternType: "Primary Objective of Financial Management",
        frequency: "High",
        typicalStem: "The primary objective of financial management is to:",
        strategy: "Maximise shareholders' wealth (maximize market price of equity shares).",
      },
    ],
    commonTraps: [
      {
        concept: "Profit Maximisation vs Wealth Maximisation",
        misconception: "Assuming profit maximization is the primary goal of financial management.",
        correctUnderstanding: "Profit maximization ignores time value of money and risk. The true primary objective is **Wealth Maximisation of Equity Shareholders** (maximizing market price per share).",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Favourable Leverage Rule",
        mnemonic: "ROI > Interest Rate = EPS Soars!",
        explanation: "Simple condition for successful trading on equity.",
      },
    ],
    quickRevisionCard: {
      title: "Financial Management — Quick Card",
      bulletPoints: [
        "Primary goal: Wealth Maximisation of Equity Shareholders (maximize share market price).",
        "3 Decisions: Investment (Capital Budgeting), Financing (Capital Structure), Dividend.",
        "Capital Structure: Proportion of Debt and Equity.",
        "Trading on Equity: Increasing debt to boost EPS (works ONLY when $ROI > \\text{Cost of Debt}$).",
        "Debt is cheaper because interest is tax-deductible.",
        "Fixed Capital needed for long-term assets (depends on nature of business, technology).",
        "Working Capital = $CA - CL$ (depends on operating cycle length, credit terms).",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u9_t1_q1",
        question: "The primary and ultimate objective of financial management in a modern corporate enterprise is:",
        options: [
          { id: "A", text: "Maximisation of current accounting profits" },
          { id: "B", text: "Wealth Maximisation of Equity Shareholders" },
          { id: "C", text: "Minimisation of tax liabilities" },
          { id: "D", text: "Maximisation of total sales volume" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The primary objective of financial management is to maximize shareholders' wealth, reflected in the market price of the company's equity shares.",
      },
      {
        id: "bst_u9_t1_q2",
        question: "Trading on Equity results in an increase in Earnings Per Share (EPS) only when:",
        options: [
          { id: "A", text: "Rate of Interest on Debt is greater than Return on Investment (ROI)" },
          { id: "B", text: "Return on Investment (ROI) is greater than the Rate of Interest on Debt" },
          { id: "C", text: "Tax rate is 0%" },
          { id: "D", text: "The firm uses zero equity" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Trading on equity magnifies EPS if and only if $ROI > \\text{Cost of Debt}$; otherwise, it causes unfavorable leverage and depresses EPS.",
      },
      {
        id: "bst_u9_t1_q3",
        question: "A Capital Budgeting decision is an example of which of the three financial decisions?",
        options: [
          { id: "A", text: "Financing Decision" },
          { id: "B", text: "Investment Decision" },
          { id: "C", text: "Dividend Decision" },
          { id: "D", text: "Liquidity Decision" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Capital budgeting involves long-term investment decisions regarding allocating funds to fixed assets and long-term capital projects.",
      },
      {
        id: "bst_u9_t1_q4",
        question: "Why is Debt considered a cheaper source of finance compared to Equity?",
        options: [
          { id: "A", text: "Lenders do not demand security" },
          { id: "B", text: "Interest paid on debt is a tax-deductible expense for calculating corporate tax" },
          { id: "C", text: "Debentures never mature" },
          { id: "D", text: "Debenture holders have voting control" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Interest on debt is deducted from taxable income before calculating tax, providing a tax shield that reduces the effective cost of capital.",
      },
      {
        id: "bst_u9_t1_q5",
        question: "The time gap between the acquisition of raw materials and the final collection of cash from debtors is called:",
        options: [
          { id: "A", text: "Production Cycle" },
          { id: "B", text: "Operating Cycle" },
          { id: "C", text: "Investment Cycle" },
          { id: "D", text: "Accounting Period" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The operating cycle is the time duration required for a business to purchase raw materials, produce inventory, sell goods, and collect cash from debtors.",
      },
      {
        id: "bst_u9_t1_q6",
        question: "Which of the following factors will DECREASE the working capital requirement of an enterprise?",
        options: [
          { id: "A", text: "Longer operating cycle" },
          { id: "B", text: "Liberal credit granted to customers" },
          { id: "C", text: "Availing generous long credit periods from suppliers" },
          { id: "D", text: "Inflationary rise in raw material prices" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Getting liberal credit terms from suppliers allows the firm to procure raw materials without upfront cash, reducing working capital requirements.",
      },
      {
        id: "bst_u9_t1_q7",
        question: "A company deciding whether to distribute ₹50 crores as cash dividends or retain it for setting up a solar power plant is facing which financial decision?",
        options: [
          { id: "A", text: "Financing Decision" },
          { id: "B", text: "Dividend Decision" },
          { id: "C", text: "Working Capital Decision" },
          { id: "D", text: "Liquidity Decision" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The dividend decision determines what proportion of net profit after tax should be distributed to shareholders versus retained in the business.",
      },
      {
        id: "bst_u9_t1_q8",
        question: "Availability of leasing facilities for industrial machinery leads to:",
        options: [
          { id: "A", text: "Higher fixed capital requirement" },
          { id: "B", text: "Lower fixed capital requirement" },
          { id: "C", text: "Higher working capital requirement" },
          { id: "D", text: "Zero debt in capital structure" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Leasing allows a company to acquire the right to use fixed assets by paying periodic rentals rather than paying the full purchase price upfront, reducing fixed capital needs.",
      },
      {
        id: "bst_u9_t1_q9",
        question: "Capital Structure refers to the ratio between:",
        options: [
          { id: "A", text: "Current Assets and Current Liabilities" },
          { id: "B", text: "Debt and Equity" },
          { id: "C", text: "Gross Profit and Sales" },
          { id: "D", text: "Fixed Assets and Working Capital" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Capital structure refers to the mix between long-term sources of funds, namely owned capital (equity) and borrowed capital (debt).",
      },
      {
        id: "bst_u9_t1_q10",
        question: "Net Working Capital is mathematically calculated as:",
        options: [
          { id: "A", text: "Current Assets minus Current Liabilities" },
          { id: "B", text: "Total Assets minus Total Liabilities" },
          { id: "C", text: "Fixed Assets minus Current Assets" },
          { id: "D", text: "Gross Working Capital plus Depreciation" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Net Working Capital is the excess of Current Assets over Current Liabilities ($NWC = CA - CL$).",
      },
    ],
  },

  // Unit 10: Money Market, Capital Market, Stock Exchange, SEBI
  {
    id: "eco_u10_t1",
    slug: "money-market-capital-market-stock-exchange-sebi",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 10,
    unitTitle: "Financial Markets",
    topicTitle: "Money Market, Capital Market, Stock Exchange, SEBI",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Business Finance and Marketing",
      chapterNumber: 10,
      chapterName: "Financial Markets",
      sections: [
        "10.1 Financial Market: Meaning, Functions (Mobilisation of savings, Price discovery, Liquidity, Reducing transaction costs)",
        "10.2 Money Market: Meaning and Instruments (Treasury Bills / T-Bills, Commercial Paper, Call Money, Certificate of Deposit, Commercial Bill)",
        "10.3 Capital Market: Primary Market (Methods of Floatation: Prospectus, Offer for sale, Private placement, Rights issue, e-IPOs) vs Secondary Market (Stock Exchange)",
        "10.4 Trading and Settlement Procedure on Stock Exchange (Depository Services: NSDL, CDSL, Dematerialisation)",
        "10.5 Securities and Exchange Board of India (SEBI): Objectives, Regulatory, Development, and Protective Functions",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (5-7 questions per shift)",
      totalPyqsInRepo: 235,
      weightagePercentage: 10,
    },
    summary30Seconds: [
      "Money Market: Short-term debt (< 1 year). Key instruments: Treasury Bills (zero coupon bonds issued by RBI on behalf of Govt, min ₹25,000), Commercial Paper (unsecured promissory note for bridge financing), Call Money (1-14 days interbank).",
      "Capital Market: Long-term funds. Primary Market (new issues) vs Secondary Market (trading existing securities). Dematerialisation converts physical share certificates into electronic book entries via NSDL/CDSL.",
      "SEBI (established 1988, statutory powers 1992): Regulatory (registering brokers, auditing exchanges), Developmental (training, research), and Protective (checking insider trading, price rigging, investor education).",
    ],
    coreConcepts: [
      {
        title: "Money Market Instruments & Characteristics",
        content: `**Money Market**: Market for short-term funds with maturity up to **one year**. Low credit risk, high liquidity.

**Five Major Money Market Instruments**:
1. **Treasury Bills (T-Bills / Zero Coupon Bonds)**:
   - Issued by **RBI on behalf of the Central Government** to meet short-term deficit.
   - Issued at a discount and redeemed at par (zero coupon).
   - Available in minimum denomination of **₹25,000** and in multiples thereof.
   - Maturities: 91 days, 182 days, 364 days.
2. **Commercial Paper (CP)**:
   - Short-term **unsecured promissory note** issued by highly rated creditworthy corporations.
   - Maturity: **15 days to 1 year**.
   - Used for **Bridge Financing**: Raising short-term funds to cover floatation costs of issuing long-term shares/debentures.
3. **Call Money**:
   - Short-term finance repayable on demand with maturity from **1 day to 14 days**.
   - Used for inter-bank transactions to maintain statutory **Cash Reserve Ratio (CRR)**.
   - Interest rate is volatile, known as the **Call Rate**.
4. **Certificate of Deposit (CD)**:
   - Unsecured negotiable bearer instruments issued by commercial banks and development financial institutions to corporations during periods of tight liquidity.
   - Maturity: 7 days to 1 year for banks.
5. **Commercial Bill**:
   - Bill of exchange drawn by seller (drawer) on buyer (drawee) for credit sales; can be discounted with commercial banks before maturity.`,
        ncertPointers: [
          "Treasury bills are risk-free sovereign debt instruments.",
          "Call rate is inversely related to other short-term money market rates.",
        ],
      },
      {
        title: "Capital Market: Primary vs Secondary & Trading Procedure",
        content: `**Capital Market**: Market for medium and long-term funds (> 1 year).

**Primary Market (New Issues Market)**:
Methods of floating new securities:
1. *Offer through Prospectus*: Public issue inviting subscriptions through direct advertisement.
2. *Offer for Sale*: Securities sold through intermediaries (issuing houses, stock brokers) rather than directly by company.
3. *Private Placement*: Allotment of securities to selected institutional investors and high-net-worth individuals (economical, saves floatation costs).
4. *Rights Issue*: Offering new shares to existing shareholders in proportion to their current holding (pre-emptive right under Section 62).
5. *e-IPOs*: Issuing shares online through registered stock exchange brokers.

**Secondary Market (Stock Exchange)**:
Market for buying and selling **existing, already issued securities**. Provides liquidity and continuous price discovery.

**Screen-Based Trading and Settlement Process**:
1. Select a registered SEBI broker and open a **Trading Account** and a **Demat Account** (with Depository Participant / DP).
2. Investor places an order with broker $\\to$ Broker connects to stock exchange terminal $\\to$ Order matched electronically.
3. Trade Confirmation slip generated $\\to$ Broker issues **Contract Note** within 24 hours (with unique order number and brokerage details).
4. **Rolling Settlement**: Trades settled on **$T+1$ basis** (Trade date + 1 working day) where securities and pay-in / pay-out occur.`,
        ncertPointers: [
          "Dematerialisation: Process of converting physical share certificates into electronic book balances.",
          "Two Depositories in India: NSDL (National Securities Depository Limited) and CDSL (Central Depository Services Limited).",
        ],
      },
      {
        title: "Securities and Exchange Board of India (SEBI)",
        content: `Established in 1988, given statutory powers through SEBI Act on **30th January 1992**.
- **Objectives**: Protect interests of investors, promote development of securities market, and regulate stock market operations.

**Three Core Functions of SEBI**:
1. **Protective Functions**:
   - Prohibiting **fraudulent and unfair trade practices** like **Price Rigging** (manipulating market prices artificially).
   - Prohibiting **Insider Trading** (using confidential unpublished price-sensitive information to make personal trading profits).
   - Educating investors and promoting fair practices.
2. **Developmental Functions**:
   - Training of intermediaries of the securities market.
   - Conducting research and publishing useful market surveys.
   - Introducing screen-based electronic trading and internet trading.
3. **Regulatory Functions**:
   - Registration of brokers, sub-brokers, merchant bankers, mutual funds.
   - Levying fees and other charges for carrying out SEBI purposes.
   - Performing audits of stock exchanges and intermediaries.
   - Regulating substantial takeover of companies.`,
        ncertPointers: [
          "Insider trading carries severe civil and criminal penalties under SEBI regulations.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Money Market Instruments Key Facts",
        formula: "\\text{T-Bills: RBI, Min ₹25,000} \\quad | \\quad \\text{CP: Bridge Financing, 15d-1yr} \\quad | \\quad \\text{Call Money: 1-14 days for CRR}",
        symbols: "Instrument features",
        siUnits: "Maturity thresholds",
        applicationCondition: "Money market classification",
      },
      {
        name: "SEBI Three Function Groups",
        formula: "\\text{Protective: Curb Insider Trading \\& Rigging} \\; | \\; \\text{Regulatory: Register \\& Audit} \\; | \\; \\text{Development: Train \\& Internet Trading}",
        symbols: "SEBI functions",
        siUnits: "Statutory jurisdiction",
        applicationCondition: "SEBI question categorization",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Structure of the Indian Financial Market</text>
  
  <!-- Central Top Node -->
  <rect x="290" y="55" width="180" height="35" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2"/>
  <text x="380" y="77" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">FINANCIAL MARKET</text>
  
  <!-- Split into Money vs Capital -->
  <line x1="380" y1="90" x2="380" y2="110" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="180" y1="110" x2="580" y2="110" stroke="#94a3b8" strokeWidth="2"/>
  
  <!-- Money Market Box -->
  <rect x="40" y="125" width="280" height="150" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
  <text x="180" y="148" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">1. Money Market (&lt; 1 Year)</text>
  <text x="180" y="175" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Treasury Bills (RBI, min ₹25k)</text>
  <text x="180" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Commercial Paper (Bridge finance)</text>
  <text x="180" y="215" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Call Money (1-14 days for CRR)</text>
  <text x="180" y="235" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Certificate of Deposit &amp; Comm. Bills</text>
  
  <!-- Capital Market Box -->
  <rect x="440" y="125" width="280" height="150" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="580" y="148" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">2. Capital Market (&gt; 1 Year)</text>
  
  <rect x="455" y="165" width="115" height="95" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="512" y="185" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">Primary</text>
  <text x="512" y="205" textAnchor="middle" fill="#cbd5e1" fontSize="9">New Issues</text>
  <text x="512" y="222" textAnchor="middle" fill="#cbd5e1" fontSize="9">IPO, Rights,</text>
  <text x="512" y="238" textAnchor="middle" fill="#cbd5e1" fontSize="9">Private Plcmt</text>
  
  <rect x="590" y="165" width="115" height="95" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="647" y="185" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Secondary</text>
  <text x="647" y="205" textAnchor="middle" fill="#cbd5e1" fontSize="9">Stock Exchange</text>
  <text x="647" y="222" textAnchor="middle" fill="#cbd5e1" fontSize="9">Existing Shares</text>
  <text x="647" y="238" textAnchor="middle" fill="#cbd5e1" fontSize="9">T+1 Settlement</text>
</svg>`,
    workedExamples: [
      {
        id: "bst_u10_t1_we1",
        questionNumber: 1,
        question: "A company plans to issue equity shares to the public to raise ₹50 crores. However, to meet the immediate floatation costs of issuing shares (printing prospectus, underwriting commission, brokerage), the company issues short-term unsecured promissory notes with a maturity of 90 days. Which financial instrument is being used for bridge financing?",
        options: [
          { id: "A", text: "Treasury Bills" },
          { id: "B", text: "Commercial Paper" },
          { id: "C", text: "Call Money" },
          { id: "D", text: "Certificate of Deposit" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The company requires short-term unsecured funds specifically to cover the floatation costs of issuing equity shares.",
          "Step 2: Using Commercial Paper to raise short-term funds to finance the floatation costs of a long-term capital issue is known as **Bridge Financing**.",
          "Step 3: Option B is correct.",
        ],
      },
      {
        id: "bst_u10_t1_we2",
        questionNumber: 2,
        question: "A senior executive of a pharmaceutical company learns that the US FDA has approved their blockbuster cancer drug before this news is made public. He secretly buys 50,000 shares of the company through his brother's trading account. Which fraudulent practice has been committed, and which function of SEBI prevents it?",
        options: [
          { id: "A", text: "Price Rigging; Regulatory Function" },
          { id: "B", text: "Insider Trading; Protective Function" },
          { id: "C", text: "Dematerialisation; Developmental Function" },
          { id: "D", text: "Short Selling; Supervisory Function" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Using unpublished price-sensitive confidential information by company insiders to make private trading profits is **Insider Trading**.",
          "Step 2: Prohibiting insider trading and imposing penalties is a **Protective Function** of SEBI.",
          "Step 3: Option B is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "SEBI Function Classification",
        frequency: "Very High",
        typicalStem: "'Prohibiting fraudulent and unfair trade practices like price rigging' is which function of SEBI?",
        strategy: "Protective Function.",
      },
      {
        patternType: "Treasury Bills Minimum Denomination",
        frequency: "High",
        typicalStem: "Treasury Bills (T-Bills) can be issued for a minimum amount of:",
        strategy: "₹25,000 and in multiples thereof.",
      },
    ],
    commonTraps: [
      {
        concept: "Price Rigging vs Insider Trading",
        misconception: "Confusing price rigging with insider trading.",
        correctUnderstanding: "**Price Rigging** = Artificially inflating/deflating market price of shares through circular trading. **Insider Trading** = Trading on unpublished price-sensitive corporate secrets.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "T-Bills Rule",
        mnemonic: "T-Bills = 25k (Minimum ticket size ₹25,000).",
        explanation: "Never forget the ₹25,000 minimum denomination.",
      },
    ],
    quickRevisionCard: {
      title: "Financial Markets — High-Yield Cheat Sheet",
      bulletPoints: [
        "Money Market (< 1 yr): T-Bills (RBI, min ₹25,000), Commercial Paper (Bridge finance, 15d-1yr), Call Money (1-14 days for CRR).",
        "Capital Market (> 1 yr): Primary (new issues) and Secondary (Stock Exchange).",
        "Primary methods: Prospectus, Offer for Sale, Private Placement, Rights Issue, e-IPO.",
        "Demat: Converting physical certificates to electronic book entries (NSDL, CDSL).",
        "Settlement cycle on Indian stock exchanges: $T+1$ rolling settlement.",
        "SEBI (1992 statutory): Regulatory (register & audit), Developmental (train), Protective (curb insider trading & price rigging).",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u10_t1_q1",
        question: "Treasury Bills (T-Bills) in India are issued by:",
        options: [
          { id: "A", text: "Commercial Banks" },
          { id: "B", text: "Reserve Bank of India on behalf of the Central Government" },
          { id: "C", text: "State Governments" },
          { id: "D", text: "SEBI" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Treasury bills are short-term promissory notes issued by the Reserve Bank of India on behalf of the Government of India to meet short-term financial mismatches.",
      },
      {
        id: "bst_u10_t1_q2",
        question: "The minimum denomination for which Treasury Bills can be purchased is:",
        options: [
          { id: "A", text: "₹10,000" },
          { id: "B", text: "₹25,000" },
          { id: "C", text: "₹50,000" },
          { id: "D", text: "₹1,00,000" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Treasury bills are issued in the minimum denomination of ₹25,000 and in multiples thereof.",
      },
      {
        id: "bst_u10_t1_q3",
        question: "Commercial Paper is used by creditworthy corporations primarily for:",
        options: [
          { id: "A", text: "Bridge Financing to cover floatation costs of long-term capital issues" },
          { id: "B", text: "Purchasing permanent plant and machinery" },
          { id: "C", text: "Fulfilling statutory CRR requirements" },
          { id: "D", text: "Inter-bank clearing balances" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Companies issue Commercial Paper to meet short-term floatation costs (underwriting, advertising) incurred while launching long-term equity/debenture issues (bridge financing).",
      },
      {
        id: "bst_u10_t1_q4",
        question: "The method of floating new securities in the primary market where an existing company offers new shares to its existing shareholders in proportion to their current shareholding is called:",
        options: [
          { id: "A", text: "Offer for Sale" },
          { id: "B", text: "Private Placement" },
          { id: "C", text: "Rights Issue" },
          { id: "D", text: "e-IPO" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Rights issue is a privilege given to existing shareholders to subscribe to a new issue of shares in proportion to the number of shares they already hold.",
      },
      {
        id: "bst_u10_t1_q5",
        question: "The process of converting physical share certificates into an electronic balance maintained in a demat account is called:",
        options: [
          { id: "A", text: "Rematerialisation" },
          { id: "B", text: "Dematerialisation" },
          { id: "C", text: "Listing" },
          { id: "D", text: "Securitisation" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Dematerialisation is the process whereby physical paper share certificates of an investor are surrendered and converted into electronic credit balances.",
      },
      {
        id: "bst_u10_t1_q6",
        question: "Prohibiting insider trading and checking fraudulent market practices like price rigging is classified under which function of SEBI?",
        options: [
          { id: "A", text: "Regulatory Function" },
          { id: "B", text: "Protective Function" },
          { id: "C", text: "Developmental Function" },
          { id: "D", text: "Adjudicatory Function" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "SEBI's protective functions include prohibiting insider trading, controlling fraudulent practices, and protecting investor interests.",
      },
      {
        id: "bst_u10_t1_q7",
        question: "Call Money market is used by commercial banks primarily to:",
        options: [
          { id: "A", text: "Maintain the statutory Cash Reserve Ratio (CRR)" },
          { id: "B", text: "Finance long-term industrial projects" },
          { id: "C", text: "Pay annual dividends" },
          { id: "D", text: "Underwrite new stock issues" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Banks borrow in the inter-bank call money market (for 1 to 14 days) to maintain their mandatory daily Cash Reserve Ratio with the RBI.",
      },
      {
        id: "bst_u10_t1_q8",
        question: "In India, rolling settlement on stock exchanges is currently conducted on which time cycle?",
        options: [
          { id: "A", text: "T + 5" },
          { id: "B", text: "T + 2" },
          { id: "C", text: "T + 1" },
          { id: "D", text: "T + 7" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Indian stock markets have transitioned to the T+1 rolling settlement system where trade settlement occurs within one working day of trade execution.",
      },
      {
        id: "bst_u10_t1_q9",
        question: "Making artificial bids and offers to manipulate and inflate the market price of a company's shares is known as:",
        options: [
          { id: "A", text: "Price Rigging" },
          { id: "B", text: "Insider Trading" },
          { id: "C", text: "Demutualisation" },
          { id: "D", text: "Bridge Financing" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Price rigging involves artificially manipulating the prices of securities with the objective of inflating or depressing them to deceive investors.",
      },
      {
        id: "bst_u10_t1_q10",
        question: "The two apex depository institutions in India that hold securities in dematerialized electronic form are:",
        options: [
          { id: "A", text: "BSE and NSE" },
          { id: "B", text: "NSDL and CDSL" },
          { id: "C", text: "RBI and SEBI" },
          { id: "D", text: "SBI and LIC" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "National Securities Depository Limited (NSDL) and Central Depository Services Limited (CDSL) are the two licensed depositories in India.",
      },
    ],
  },

  // Unit 11: Marketing Mix: Product, Price, Place, Promotion
  {
    id: "bst_u11_t1",
    slug: "marketing-mix-product-price-place-promotion",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 11,
    unitTitle: "Marketing",
    topicTitle: "Marketing Mix: Product, Price, Place, Promotion",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Business Finance and Marketing",
      chapterNumber: 11,
      chapterName: "Marketing",
      sections: [
        "11.1 Marketing: Meaning, Marketing vs Selling",
        "11.2 Marketing Management Philosophies (Production, Product, Selling, Marketing, Societal Marketing Concepts)",
        "11.3 Functions of Marketing (Market research, Planning, Standardization, Packaging, Labelling, Branding, Pricing, Physical distribution, Promotion)",
        "11.4 The Marketing Mix: The 4 Ps (Product, Price, Place, Promotion)",
        "11.5 Product: Branding (Brand name, Brand mark, Trade mark), Packaging (Primary, Secondary, Transportation), Labelling",
        "11.6 Price: Factors determining Price of a product",
        "11.7 Place / Physical Distribution: Channels of Distribution (Direct vs Indirect: 1-level, 2-level, 3-level), Physical distribution components",
        "11.8 Promotion: Promotion Mix (Advertising, Personal Selling, Sales Promotion, Public Relations)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (6-8 questions per shift)",
      totalPyqsInRepo: 260,
      weightagePercentage: 11,
    },
    summary30Seconds: [
      "5 Marketing Philosophies: Production (quantity), Product (quality), Selling (aggressive pushing), Marketing (customer satisfaction), Societal Marketing (customer satisfaction + environmental welfare).",
      "The 4 Ps of Marketing Mix: Product (Branding, Packaging, Labelling), Price (cost, competition, demand), Place (channels of distribution, logistics), Promotion (Advertising, Personal selling, Sales promotion, PR).",
      "Packaging levels: Primary (immediate container: toothpaste tube), Secondary (cardboard box), Transportation (corrugated cartons). Trade Mark is a brand name granted legal protection.",
    ],
    coreConcepts: [
      {
        title: "Five Marketing Management Philosophies",
        content: `Evolution of marketing thought:
1. **Production Concept**:
   - Focus: Large-scale production, low cost, widespread availability.
   - Assumption: Consumers favor products that are widely available and inexpensive.
2. **Product Concept**:
   - Focus: Product quality, performance, and continuous product improvement.
   - Defect: May cause 'Marketing Myopia' (focusing on product rather than underlying customer need).
3. **Selling Concept**:
   - Focus: Existing product; aggressive selling and promotional persuasion.
   - Maxim: 'Sell what is made by hook or crook'.
4. **Marketing Concept**:
   - Focus: Identifying customer needs first, producing goods to satisfy those needs, and achieving profit through **customer satisfaction**.
   - Pillars: Target market identification, understanding customer needs, integrated marketing, profitability through satisfaction.
5. **Societal Marketing Concept**:
   - Focus: Customer satisfaction **plus environmental and social well-being**.
   - Addresses ecology, pollution, deforestation, resource depletion, and ethical marketing.`,
        ncertPointers: [
          "Selling starts after production; Marketing starts long before production (with market research) and continues after sales (after-sales service).",
        ],
      },
      {
        title: "The 4 Ps: Product & Price",
        content: `**1. Product Mix**:
- **Branding**:
  - *Brand Name*: Verbal part (e.g. Nike, Maggi, Tata).
  - *Brand Mark*: Visual symbol/logo (e.g. Nike swoosh).
  - *Trade Mark*: A brand that is registered and granted **legal protection**; no other firm can copy it.
- **Packaging**:
  - *Primary Package*: Immediate container (e.g. toothpaste tube, cough syrup bottle).
  - *Secondary Package*: Additional layer of protection discarded when ready for use (e.g. cardboard box holding toothpaste tube).
  - *Transportation Package*: Outer packaging for bulk transport and storage (e.g. corrugated carton of 50 tubes).
- **Labelling**: Providing product information, ingredients, MRP, expiry date, batch number, usage instructions.

**2. Price Mix**:
Factors determining price:
- Product cost (floor price).
- The utility and demand of the product (ceiling price).
- Extent of competition in the market.
- Government regulations (e.g. price ceiling on essential medicines).
- Pricing objectives (profit maximization, obtaining market share leadership, surviving).`,
        ncertPointers: [
          "Packaging acts as a silent salesman in self-service supermarkets.",
        ],
      },
      {
        title: "The 4 Ps: Place & Promotion Mix",
        content: `**3. Place / Physical Distribution Mix**:
- **Channels of Distribution**:
  - *Zero Level (Direct)*: Manufacturer $\\to$ Customer (Bata stores, company websites).
  - *One Level*: Manufacturer $\\to$ Retailer $\\to$ Customer (Automobiles, consumer durables).
  - *Two Level*: Manufacturer $\\to$ Wholesaler $\\to$ Retailer $\\to$ Customer (FMCG soaps, groceries).
  - *Three Level*: Manufacturer $\\to$ Agent $\\to$ Wholesaler $\\to$ Retailer $\\to$ Customer.
- Components of physical distribution: Order processing, Transportation, Warehousing, Inventory control.

**4. Promotion Mix (Tools of Communication)**:
1. **Advertising**: Paid form of non-personal presentation and promotion by an identified sponsor. High reach, impersonal, lacks direct feedback.
2. **Personal Selling**: Face-to-face verbal presentation with prospective buyers. Personalized, immediate feedback, flexible, high cost per contact.
3. **Sales Promotion**: Short-term incentives to encourage quick purchase (Rebates, Discounts, Buy-one-get-one, Contests, Samples).
4. **Public Relations (PR)**: Building healthy relations with public, media, and stakeholders; protecting company image from negative publicity.`,
        ncertPointers: [
          "Rebate: Selling product at special reduced price to clear excess inventory (e.g. ₹10,000 off on car).",
          "Discount: Deducting a percentage off the list price (e.g. 20% off).",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "5 Marketing Philosophies Summary",
        formula: "\\text{Production (Quantity) } \\to \\text{ Product (Quality) } \\to \\text{ Selling (Push) } \\to \\text{ Marketing (Satisfaction) } \\to \\text{ Societal (Ecology)}",
        symbols: "Evolutionary stages",
        siUnits: "Philosophical focus",
        applicationCondition: "Philosophy identification questions",
      },
      {
        name: "Packaging Tiers",
        formula: "\\text{Primary: Immediate Tube} \\quad | \\quad \\text{Secondary: Cardboard Box} \\quad | \\quad \\text{Transportation: Bulk Carton}",
        symbols: "Packaging levels",
        siUnits: "Structural layers",
        applicationCondition: "Packaging classification",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">The 4 Ps of Marketing Mix: Product, Price, Place, Promotion</text>
  
  <!-- 4 Quadrants -->
  <!-- Product -->
  <rect x="50" y="65" width="310" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="205" y="90" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">1. PRODUCT MIX</text>
  <text x="205" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Branding (Brand Name, Trade Mark)</text>
  <text x="205" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Packaging (Primary, Secondary, Transport)</text>
  <text x="205" y="153" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Labelling (Nutritional/Usage disclosures)</text>
  
  <!-- Price -->
  <rect x="400" y="65" width="310" height="100" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="555" y="90" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">2. PRICE MIX</text>
  <text x="555" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Product Cost (Floor price)</text>
  <text x="555" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Customer Utility (Ceiling price)</text>
  <text x="555" y="153" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Competition &amp; Government price regulations</text>
  
  <!-- Place -->
  <rect x="50" y="180" width="310" height="100" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
  <text x="205" y="205" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">3. PLACE (DISTRIBUTION)</text>
  <text x="205" y="228" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Direct (Zero level) vs Indirect channels</text>
  <text x="205" y="248" textAnchor="middle" fill="#cbd5e1" fontSize="11">• 1-Level, 2-Level (Wholesaler/Retailer)</text>
  <text x="205" y="266" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Physical logistics: Warehousing &amp; Inventory</text>
  
  <!-- Promotion -->
  <rect x="400" y="180" width="310" height="100" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="2"/>
  <text x="555" y="205" textAnchor="middle" fill="#f472b6" fontSize="13" fontWeight="bold">4. PROMOTION MIX</text>
  <text x="555" y="228" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Advertising (Paid non-personal reach)</text>
  <text x="555" y="248" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Personal Selling (Face-to-face feedback)</text>
  <text x="555" y="266" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Sales Promotion (Incentives) &amp; Public Relations</text>
</svg>`,
    workedExamples: [
      {
        id: "bst_u11_t1_we1",
        questionNumber: 1,
        question: "A company manufacturing organic baby food packages its cereal in a biodegradable plastic pouch, which is placed inside an attractive printed cardboard box. When shipped from the factory to retail supermarkets, 24 cardboard boxes are packed together into a heavy corrugated carton. Identify the primary, secondary, and transportation packages.",
        options: [
          { id: "A", text: "Primary: Biodegradable pouch; Secondary: Cardboard box; Transportation: Corrugated carton" },
          { id: "B", text: "Primary: Cardboard box; Secondary: Pouch; Transportation: Corrugated carton" },
          { id: "C", text: "Primary: Corrugated carton; Secondary: Box; Transportation: Pouch" },
          { id: "D", text: "All three are primary packages" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: The immediate container directly holding the food product is the biodegradable plastic pouch $\\implies$ **Primary Package**.",
          "Step 2: The printed cardboard box providing extra protection and visual appeal is discarded upon opening $\\implies$ **Secondary Package**.",
          "Step 3: The bulk corrugated carton used for storage and transport is the **Transportation Package**.",
          "Step 4: Option A is exact.",
        ],
      },
      {
        id: "bst_u11_t1_we2",
        questionNumber: 2,
        question: "A consumer electronics retailer announces: 'Buy a 55-inch Smart TV and get a Soundbar worth ₹8,000 absolutely free.' Which promotional tool is being utilized?",
        options: [
          { id: "A", text: "Advertising" },
          { id: "B", text: "Personal Selling" },
          { id: "C", text: "Sales Promotion (Product Combination)" },
          { id: "D", text: "Public Relations" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Offering another product as a free gift along with the main product purchase is a classic short-term incentive.",
          "Step 2: Short-term incentives designed to induce immediate purchases fall under **Sales Promotion** (specifically 'Product Combination').",
          "Step 3: Option C is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Marketing Philosophy Identification",
        frequency: "Very High",
        typicalStem: "A company that prioritizes consumer satisfaction along with ecological preservation and sustainable waste disposal adheres to which concept?",
        strategy: "Societal Marketing Concept.",
      },
      {
        patternType: "Trademark Definition",
        frequency: "High",
        typicalStem: "A brand or part of a brand that is given legal protection against unauthorized copying is called a:",
        strategy: "Trade Mark.",
      },
    ],
    commonTraps: [
      {
        concept: "Rebate vs Discount Distinction",
        misconception: "Treating rebate and discount as identical terms in sales promotion.",
        correctUnderstanding: "**Rebate** = Offering products at special reduced prices to clear excess inventory (e.g. ₹5,000 off on slow-moving stock). **Discount** = Deducting a percentage off the list price during regular trade (e.g. 10% discount).",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "The 4 Ps",
        mnemonic: "Product, Price, Place, Promotion (McCarthy's 4 Ps).",
        explanation: "Foundation of all marketing mix strategies.",
      },
    ],
    quickRevisionCard: {
      title: "Marketing — High-Yield Cheat Sheet",
      bulletPoints: [
        "Marketing Concept: Focus on customer satisfaction; Societal: Satisfaction + Ecological welfare.",
        "Brand Name: Spoken part; Brand Mark: Visual logo; Trade Mark: Legally protected brand.",
        "Packaging: Primary (immediate container), Secondary (cardboard box), Transport (bulk carton).",
        "Packaging acts as a 'Silent Salesman' in retail stores.",
        "Price: Floor is product cost; Ceiling is customer utility.",
        "Place Channels: Zero-level (Direct), 1-level (Retailer), 2-level (Wholesaler + Retailer).",
        "Promotion Mix: Advertising (paid non-personal), Personal Selling (face-to-face), Sales Promotion (short-term incentives), PR.",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u11_t1_q1",
        question: "A brand name or brand mark that is registered under law and granted legal protection against duplication by competitors is called a:",
        options: [
          { id: "A", text: "Trade Mark" },
          { id: "B", text: "Patent" },
          { id: "C", text: "Copyright" },
          { id: "D", text: "Brand Label" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "A brand or part of a brand that is given legal protection is called a trademark, granting the firm exclusive legal rights to its commercial use.",
      },
      {
        id: "bst_u11_t1_q2",
        question: "Which marketing management philosophy asserts that business should focus on customer satisfaction along with long-term ecological and societal well-being?",
        options: [
          { id: "A", text: "Production Concept" },
          { id: "B", text: "Product Concept" },
          { id: "C", text: "Societal Marketing Concept" },
          { id: "D", text: "Selling Concept" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The societal marketing concept holds that the task of any organisation is to determine needs and deliver satisfaction in a manner that preserves or enhances the consumer's and society's well-being.",
      },
      {
        id: "bst_u11_t1_q3",
        question: "In self-service retail supermarkets, which element of the product mix functions as a 'Silent Salesman' to attract consumer attention?",
        options: [
          { id: "A", text: "Packaging" },
          { id: "B", text: "Warehousing" },
          { id: "C", text: "Credit terms" },
          { id: "D", text: "Personal selling" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Attractive, informative, and convenient packaging captures buyer attention on store shelves and stimulates purchase without requiring a sales assistant.",
      },
      {
        id: "bst_u11_t1_q4",
        question: "The tube directly holding medicinal ointment is an example of:",
        options: [
          { id: "A", text: "Secondary Package" },
          { id: "B", text: "Primary Package" },
          { id: "C", text: "Transportation Package" },
          { id: "D", text: "Tertiary Package" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Primary package refers to the product's immediate container that stays with the product until it is completely used up.",
      },
      {
        id: "bst_u11_t1_q5",
        question: "Selling goods directly to consumers through company-owned retail outlets without any intermediaries (e.g. Bata shoe stores) is an example of a:",
        options: [
          { id: "A", text: "Zero-level Channel" },
          { id: "B", text: "One-level Channel" },
          { id: "C", text: "Two-level Channel" },
          { id: "D", text: "Three-level Channel" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "In a zero-level (direct) channel, the manufacturer sells directly to final consumers without involving any wholesaler or retailer.",
      },
      {
        id: "bst_u11_t1_q6",
        question: "Offering products at special reduced prices to clear excess inventory or off-season stock (e.g., ₹10,000 off on a car) is a sales promotion tool known as:",
        options: [
          { id: "A", text: "Rebate" },
          { id: "B", text: "Discount" },
          { id: "C", text: "Refund" },
          { id: "D", text: "Product Combination" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Under rebate, products are offered at special reduced prices to clear off excess inventory.",
      },
      {
        id: "bst_u11_t1_q7",
        question: "Which of the following sets the LOWER LIMIT (floor) of the price at which a product can be sold?",
        options: [
          { id: "A", text: "Total cost of the product" },
          { id: "B", text: "Utility and demand of the buyer" },
          { id: "C", text: "Competitors' prices" },
          { id: "D", text: "Government price ceiling" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The total cost of production and distribution sets the minimum floor price below which no business firm can sell in the long run without incurring losses.",
      },
      {
        id: "bst_u11_t1_q8",
        question: "Personal selling differs from advertising because personal selling is:",
        options: [
          { id: "A", text: "Impersonal and inflexible" },
          { id: "B", text: "A personal face-to-face dialogue providing immediate direct feedback" },
          { id: "C", text: "Capable of reaching millions of people at lowest cost per contact" },
          { id: "D", text: "A non-paid form of promotion" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Personal selling involves oral, face-to-face conversation with prospective buyers, allowing the salesperson to adapt his pitch and receive immediate feedback.",
      },
      {
        id: "bst_u11_t1_q9",
        question: "Building and maintaining good relations with the press, public, and government to handle unfavorable rumors and create corporate goodwill is the function of:",
        options: [
          { id: "A", text: "Advertising" },
          { id: "B", text: "Sales Promotion" },
          { id: "C", text: "Public Relations (PR)" },
          { id: "D", text: "Personal Selling" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Public relations involves a variety of programmes designed to promote or protect a company's image or its individual products in the eyes of the public.",
      },
      {
        id: "bst_u11_t1_q10",
        question: "The marketing philosophy that focuses purely on product quality and technical excellence, but risks failure by ignoring customer needs, is the:",
        options: [
          { id: "A", text: "Product Concept" },
          { id: "B", text: "Production Concept" },
          { id: "C", text: "Selling Concept" },
          { id: "D", text: "Societal Concept" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The product concept assumes consumers favor products of superior quality and continuous improvements, but can fail if customers do not actually need those features.",
      },
    ],
  },

  // Unit 12: Consumer Rights, Consumer Protection Act 2019, Redressal Agencies
  {
    id: "bst_u12_t1",
    slug: "consumer-rights-consumer-protection-act-2019-redressal-agencies",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 12,
    unitTitle: "Consumer Protection",
    topicTitle: "Consumer Rights, Consumer Protection Act 2019, Redressal Agencies",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Business Finance and Marketing",
      chapterNumber: 12,
      chapterName: "Consumer Protection",
      sections: [
        "12.1 Consumer Protection: Importance from Consumer and Business perspectives",
        "12.2 Consumer Rights under Consumer Protection Act 2019 (Right to Safety, Information, Choice, Heard, Seek Redressal, Consumer Education)",
        "12.3 Consumer Responsibilities",
        "12.4 Three-Tier Quasi-Judicial Redressal Machinery under CPA 2019 (District Commission, State Commission, National Commission: Pecuniary jurisdictions, Appeals)",
        "12.5 Remedies available to Consumers (Removal of defects, Replacement, Refund, Compensation, Punitive damages)",
        "12.6 Role of Consumer NGOs and Consumer Awareness (Jago Grahak Jago)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4-5 questions per shift)",
      totalPyqsInRepo: 190,
      weightagePercentage: 8,
    },
    summary30Seconds: [
      "Consumer Rights (6): Right to Safety, Right to be Informed, Right to Choose, Right to be Heard, Right to Seek Redressal, Right to Consumer Education.",
      "Consumer Protection Act 2019 Pecuniary Jurisdictions: District Commission (up to ₹1 Crore); State Commission (above ₹1 Crore up to ₹10 Crores); National Commission (above ₹10 Crores).",
      "Appeals: Appeal against District Commission lies before State Commission within 45 days; Appeal against State Commission lies before National Commission within 30 days; Appeal against original order of National Commission lies before Supreme Court within 30 days.",
    ],
    coreConcepts: [
      {
        title: "Consumer Rights under Consumer Protection Act, 2019",
        content: `The Consumer Protection Act (CPA) 2019 guarantees six basic statutory rights:
1. **Right to Safety**: Right to be protected against marketing of goods and services which are hazardous to life and property (e.g., look for ISI mark on electrical appliances, AGMARK on agricultural foods, Hallmark on jewelry).
2. **Right to be Informed**: Right to be informed about quality, quantity, potency, purity, standard, and price of goods to protect against unfair trade practices. (Mandatory labelling: MRP, manufacturing & expiry date, ingredients).
3. **Right to Assured / Choose**: Right to be assured access to a variety of goods and services at competitive prices without monopolistic coercion.
4. **Right to be Heard**: Right to voice consumer grievances and receive due consideration in appropriate forums; businesses establish consumer care cells.
5. **Right to Seek Redressal**: Right to seek legal remedies against unfair trade practices or exploitation, including compensation for harm, product replacement, or refund.
6. **Right to Consumer Education**: Right to acquire knowledge and skill to be an informed consumer throughout life ('Jago Grahak Jago' campaigns).`,
        ncertPointers: [
          "Consumer Responsibilities: Ask for cash memo (essential proof of purchase for filing complaints), buy standardized goods (ISI, AGMARK), read labels carefully, assert oneself honestly.",
        ],
      },
      {
        title: "Three-Tier Redressal Machinery (CPA 2019 Jurisdictions)",
        content: `**1. District Consumer Disputes Redressal Commission (District Commission)**:
- Jurisdiction: Where value of goods or services paid as consideration **does not exceed ₹1 Crore**.
- Appeal: Any person aggrieved by an order of the District Commission can appeal to the **State Commission within 45 days** from the date of the order.

**2. State Consumer Disputes Redressal Commission (State Commission)**:
- Jurisdiction: Where value of goods or services paid as consideration **exceeds ₹1 Crore but does not exceed ₹10 Crores**.
- Appeal: Any person aggrieved by an original order of the State Commission can appeal to the **National Commission within 30 days**.

**3. National Consumer Disputes Redressal Commission (National Commission)**:
- Jurisdiction: Where value of goods or services paid as consideration **exceeds ₹10 Crores**.
- Appeal: Any person aggrieved by an **original order** of the National Commission can appeal to the **Supreme Court of India within 30 days**.

*Important Note*: An appeal to the Supreme Court lies ONLY if the matter originated originally in the National Commission (claims > ₹10 Crores). Matters appealed from State Commission to National Commission cannot be taken further to Supreme Court as a routine matter.`,
        ncertPointers: [
          "CPA 2019 introduced Product Liability: Manufacturers, service providers, and sellers can be held liable to compensate consumers for injury or damage caused by defective products or deficient services.",
          "Central Consumer Protection Authority (CCPA) was established under CPA 2019 to regulate matters relating to violation of consumer rights, unfair trade practices, and false/misleading advertisements.",
        ],
      },
      {
        title: "Remedies Available to Consumers",
        content: `If the Consumer Commission is satisfied that the goods or services are defective/deficient, it can issue one or more of the following orders:
1. Removal of defect from the goods.
2. Replacement of the defective product with a new defect-free item.
3. Refund of the price paid by the consumer.
4. Payment of reasonable compensation for injury, loss, or harassment suffered.
5. Payment of punitive damages in appropriate circumstances.
6. Discontinuance of unfair or restrictive trade practices.
7. Withdrawal of hazardous goods from sale and ceiling their manufacture.
8. Issuing corrective advertisement to neutralize the effect of misleading advertisements.
9. Cease manufacturing of hazardous goods.`,
        ncertPointers: [
          "Who can file a complaint? A consumer, any registered consumer association, Central/State Government, or legal heirs of a deceased consumer.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "CPA 2019 Pecuniary Jurisdiction Thresholds",
        formula: "\\text{District: } \\le \\text{₹1 Crore} \\quad | \\quad \\text{State: } \\text{₹1 Cr to ₹10 Cr} \\quad | \\quad \\text{National: } > \\text{₹10 Crores}",
        symbols: "Consideration paid values",
        siUnits: "Crores of INR",
        applicationCondition: "Consumer court jurisdiction determination",
      },
      {
        name: "Appeals Time Limits",
        formula: "\\text{District to State: 45 days} \\quad | \\quad \\text{State to National: 30 days} \\quad | \\quad \\text{National to Supreme Court: 30 days}",
        symbols: "Statutory limitation periods",
        siUnits: "Days",
        applicationCondition: "Consumer appeal filing",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Consumer Redressal Hierarchy under CPA 2019 (Jurisdiction &amp; Appeals)</text>
  
  <!-- Supreme Court -->
  <rect x="260" y="55" width="240" height="40" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="2"/>
  <text x="380" y="80" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="bold">Supreme Court of India</text>
  
  <!-- Arrow National to SC -->
  <line x1="380" y1="95" x2="380" y2="120" stroke="#94a3b8" strokeWidth="2"/>
  <text x="440" y="112" fill="#fda4af" fontSize="9">Appeal within 30 days</text>
  
  <!-- National Commission -->
  <rect x="220" y="120" width="320" height="45" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
  <text x="380" y="142" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">National Commission (&gt; ₹10 Crores)</text>
  <text x="380" y="157" textAnchor="middle" fill="#fde68a" fontSize="10">Original jurisdiction above ₹10 Crores</text>
  
  <!-- Arrow State to National -->
  <line x1="380" y1="165" x2="380" y2="190" stroke="#94a3b8" strokeWidth="2"/>
  <text x="440" y="182" fill="#fbbf24" fontSize="9">Appeal within 30 days</text>
  
  <!-- State Commission -->
  <rect x="200" y="190" width="360" height="45" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="380" y="212" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">State Commission (₹1 Crore to ₹10 Crores)</text>
  <text x="380" y="227" textAnchor="middle" fill="#86efac" fontSize="10">Original jurisdiction between ₹1 Cr and ₹10 Cr</text>
  
  <!-- Arrow District to State -->
  <line x1="380" y1="235" x2="380" y2="255" stroke="#94a3b8" strokeWidth="2"/>
  <text x="440" y="248" fill="#86efac" fontSize="9">Appeal within 45 days</text>
  
  <!-- District Commission -->
  <rect x="180" y="255" width="400" height="38" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="380" y="278" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">District Commission (Up to ₹1 Crore)</text>
</svg>`,
    workedExamples: [
      {
        id: "bst_u12_t1_we1",
        questionNumber: 1,
        question: "Mr. Sharma bought an imported luxury SUV for ₹1.8 Crores. Due to a manufacturing brake defect, the car met with an accident. Mr. Sharma seeks replacement of the vehicle and ₹50 lakhs as compensation for injury. Under the Consumer Protection Act 2019, which commission should Mr. Sharma approach to file his initial complaint?",
        options: [
          { id: "A", text: "District Commission" },
          { id: "B", text: "State Commission" },
          { id: "C", text: "National Commission" },
          { id: "D", text: "Supreme Court directly" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Under the Consumer Protection Act 2019, pecuniary jurisdiction is determined by the value of goods or services paid as consideration.",
          "Step 2: The price paid for the vehicle was ₹1.8 Crores.",
          "Step 3: Since ₹1.8 Crores is **greater than ₹1 Crore but does not exceed ₹10 Crores**, the case falls under the original jurisdiction of the **State Commission**.",
          "Step 4: Option B is correct.",
        ],
      },
      {
        id: "bst_u12_t1_we2",
        questionNumber: 2,
        question: "A consumer purchased a branded electric geyser. The packet lacked the mandatory ISI safety certification mark. When installed, a short circuit caused serious burn injuries. Which consumer right was primarily violated in this case?",
        options: [
          { id: "A", text: "Right to Information" },
          { id: "B", text: "Right to Safety" },
          { id: "C", text: "Right to Consumer Education" },
          { id: "D", text: "Right to be Heard" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The electric appliance caused physical bodily injury due to safety lapses and absence of standardization certification (ISI).",
          "Step 2: The **Right to Safety** protects consumers against the marketing of goods and services that are hazardous to human life and health.",
          "Step 3: Option B is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Pecuniary Jurisdiction Matching",
        frequency: "Very High",
        typicalStem: "Under the Consumer Protection Act 2019, complaints involving consideration up to ₹1 Crore are filed before:",
        strategy: "District Commission (State = ₹1 Cr to ₹10 Cr; National = > ₹10 Cr).",
      },
      {
        patternType: "Appeals Time Limit",
        frequency: "High",
        typicalStem: "An appeal against the order of the District Commission must be filed before the State Commission within how many days?",
        strategy: "45 days.",
      },
    ],
    commonTraps: [
      {
        concept: "1986 vs 2019 Act Limits",
        misconception: "Using the old 1986 limits (₹20 lakhs, ₹1 crore).",
        correctUnderstanding: "Under the current **Consumer Protection Act 2019**: District = **Up to ₹1 Crore**; State = **₹1 Crore to ₹10 Crores**; National = **Above ₹10 Crores**.",
      },
      {
        concept: "Cash Memo Requirement",
        misconception: "Believing a consumer court complaint can be entertained without any receipt or invoice.",
        correctUnderstanding: "A **Cash Memo** is the primary legal proof of purchase; it is the consumer's responsibility to ask for and preserve the cash memo.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "2019 Jurisdictions",
        mnemonic: "1 - 10 Rule: District $\\le$ 1 Cr; State = 1 to 10 Cr; National > 10 Cr.",
        explanation: "Simple memory hook for 2019 Act thresholds.",
      },
    ],
    quickRevisionCard: {
      title: "Consumer Protection — High-Yield Cheat Sheet",
      bulletPoints: [
        "6 Rights: Safety, Informed, Choose, Heard, Seek Redressal, Consumer Education.",
        "Cash Memo is the vital proof of purchase.",
        "CPA 2019 Jurisdictions: District $\\le$ ₹1 Cr; State = ₹1 Cr to ₹10 Cr; National > ₹10 Cr.",
        "Appeals: District $\\to$ State (45 days); State $\\to$ National (30 days); National $\\to$ Supreme Court (30 days).",
        "Standard Marks: ISI (industrial/electrical), AGMARK (agricultural), Hallmark (gold).",
        "Central Consumer Protection Authority (CCPA) regulates unfair trade practices.",
        "Product liability holds manufacturers liable for harm caused by defective products.",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u12_t1_q1",
        question: "Under the Consumer Protection Act 2019, a complaint can be filed in the District Commission if the value of goods or services paid as consideration does not exceed:",
        options: [
          { id: "A", text: "₹20 Lakhs" },
          { id: "B", text: "₹50 Lakhs" },
          { id: "C", text: "₹1 Crore" },
          { id: "D", text: "₹10 Crores" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "As per the Consumer Protection Act 2019, the District Commission has jurisdiction to entertain complaints where the value of goods or services paid as consideration does not exceed ₹1 Crore.",
      },
      {
        id: "bst_u12_t1_q2",
        question: "An appeal against an order passed by the District Commission can be filed before the State Commission within a period of:",
        options: [
          { id: "A", text: "30 days" },
          { id: "B", text: "45 days" },
          { id: "C", text: "60 days" },
          { id: "D", text: "90 days" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Under CPA 2019, any person aggrieved by an order of the District Commission may prefer an appeal to the State Commission within 45 days from the date of the order.",
      },
      {
        id: "bst_u12_t1_q3",
        question: "Which consumer right ensures that an aggrieved consumer receives compensation for damage caused by defective goods or deficient services?",
        options: [
          { id: "A", text: "Right to be Heard" },
          { id: "B", text: "Right to Seek Redressal" },
          { id: "C", text: "Right to Information" },
          { id: "D", text: "Right to Safety" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The Right to Seek Redressal gives consumers the legal right to seek compensation, repair, replacement, or refund against unfair trade practices.",
      },
      {
        id: "bst_u12_t1_q4",
        question: "The quality standardization certification mark used for agricultural food products in India is:",
        options: [
          { id: "A", text: "ISI Mark" },
          { id: "B", text: "AGMARK" },
          { id: "C", text: "Hallmark" },
          { id: "D", text: "FPO Mark" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "AGMARK is a certification mark employed on agricultural products in India, assuring that they conform to a set of standards approved by the Directorate of Marketing and Inspection.",
      },
      {
        id: "bst_u12_t1_q5",
        question: "A complaint where the value of goods or services paid as consideration is ₹5 Crores should be filed initially before:",
        options: [
          { id: "A", text: "District Commission" },
          { id: "B", text: "State Commission" },
          { id: "C", text: "National Commission" },
          { id: "D", text: "Supreme Court" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Under CPA 2019, claims where consideration exceeds ₹1 Crore up to ₹10 Crores fall under the original jurisdiction of the State Commission.",
      },
      {
        id: "bst_u12_t1_q6",
        question: "Which of the following is an essential document that a consumer must preserve as legal proof of purchase when lodging a complaint?",
        options: [
          { id: "A", text: "Advertising brochure" },
          { id: "B", text: "Cash Memo / Tax Invoice" },
          { id: "C", text: "Visiting card of salesperson" },
          { id: "D", text: "Product wrapper" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "A cash memo or tax invoice is the fundamental documentary proof of purchase required by consumer commissions to establish the transaction.",
      },
      {
        id: "bst_u12_t1_q7",
        question: "An appeal against an original order of the National Commission can be preferred before the:",
        options: [
          { id: "A", text: "President of India" },
          { id: "B", text: "High Court" },
          { id: "C", text: "Supreme Court of India within 30 days" },
          { id: "D", text: "State Commission" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Any person aggrieved by an original order of the National Commission may appeal to the Supreme Court of India within 30 days.",
      },
      {
        id: "bst_u12_t1_q8",
        question: "Which statutory authority was established under the Consumer Protection Act 2019 to regulate violations of consumer rights and false/misleading advertisements?",
        options: [
          { id: "A", text: "Central Consumer Protection Authority (CCPA)" },
          { id: "B", text: "SEBI" },
          { id: "C", text: "Competition Commission of India" },
          { id: "D", text: "NITI Aayog" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "CPA 2019 established the Central Consumer Protection Authority (CCPA) to enforce consumer rights and curb misleading ads.",
      },
      {
        id: "bst_u12_t1_q9",
        question: "The concept of 'Product Liability' introduced in the Consumer Protection Act 2019 means that:",
        options: [
          { id: "A", text: "A consumer is liable to pay double tax on defective items" },
          { id: "B", text: "Manufacturers, service providers, and sellers are legally liable to compensate a consumer for harm caused by defective products or deficient services" },
          { id: "C", text: "Retailers can never be sued" },
          { id: "D", text: "Consumers cannot return opened packages" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Product liability holds product manufacturers, service providers, or sellers accountable to compensate consumers for injury or property damage caused by defective items.",
      },
      {
        id: "bst_u12_t1_q10",
        question: "Providing detailed information on a product's label regarding its weight, date of manufacture, MRP, expiry date, and ingredients satisfies the consumer's:",
        options: [
          { id: "A", text: "Right to be Informed" },
          { id: "B", text: "Right to Safety" },
          { id: "C", text: "Right to Choose" },
          { id: "D", text: "Right to Consumer Education" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The Right to be Informed guarantees access to complete factual information about the product so the consumer can make an informed purchasing decision.",
      },
    ],
  },
];
