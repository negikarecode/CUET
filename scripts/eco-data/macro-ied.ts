import { NoteDocument } from "@/types/notes";

export const economicsMacroIedTopics: NoteDocument[] = [
  // Unit 7: Budget Components, Revenue and Capital Budgets, Deficits and Fiscal Policy
  {
    id: "eco_u7_t1",
    slug: "budget-components-revenue-and-capital-budgets-deficits-and-fiscal-policy",
    subject: "eco",
    subjectName: "Economics",
    subjectCode: "309",
    unitNumber: 7,
    unitTitle: "Government Budget and the Economy",
    topicTitle: "Budget Components, Revenue and Capital Budgets, Deficits and Fiscal Policy",
    ncertReference: {
      class: "Class 12",
      book: "Introductory Macroeconomics",
      chapterNumber: 5,
      chapterName: "Government Budget and the Economy",
      sections: [
        "5.1 Government Budget: Meaning and Objectives (Allocation of resources, Redistribution of income, Economic stability, Growth)",
        "5.2 Classification of Receipts: Revenue Receipts (Tax vs Non-Tax) vs Capital Receipts (Disinvestment, Borrowings, Recovery of loans)",
        "5.3 Classification of Expenditure: Revenue Expenditure vs Capital Expenditure",
        "5.4 Measures of Government Deficit: Revenue Deficit, Fiscal Deficit, Primary Deficit",
        "5.5 Fiscal Policy and Deficit Financing",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (6-8 questions per shift)",
      totalPyqsInRepo: 250,
      weightagePercentage: 14,
    },
    summary30Seconds: [
      "Receipts Criteria: Revenue Receipts neither create liability nor reduce assets (taxes, fines); Capital Receipts EITHER create liability OR reduce assets (borrowings, disinvestment).",
      "Expenditure Criteria: Revenue Expenditure neither creates asset nor reduces liability (subsidies, salaries, interest payments); Capital Expenditure EITHER creates asset OR reduces liability (construction, repayment of debt).",
      "Deficit Measures: Revenue Deficit = $\\text{Revenue Exp} - \\text{Revenue Rec}$; Fiscal Deficit = $\\text{Total Exp} - (\\text{Total Rec excluding borrowings}) = \\text{Total Borrowings}$; Primary Deficit = $\\text{Fiscal Deficit} - \\text{Interest Payments}$.",
    ],
    coreConcepts: [
      {
        title: "Classification of Government Receipts: Revenue vs Capital",
        content: `**Government Receipts Criteria**:
- **Revenue Receipts**: Receipts that satisfy **BOTH** conditions:
  1. Do **NOT create any liability** for the government.
  2. Do **NOT cause any reduction** in the assets of the government.
  - *Tax Revenue*: Direct Taxes (Income tax, Corporate tax - burden cannot be shifted) and Indirect Taxes (GST, Customs duty - burden can be shifted).
  - *Non-Tax Revenue*: Commercial revenue (dividends from PSUs), Interest receipts on loans given to states, Fees, Fines, Penalties, Escheat, Grants-in-aid.
- **Capital Receipts**: Receipts that satisfy **EITHER** of the conditions:
  1. **Create a liability** for the government (Borrowings from RBI/market/abroad).
  2. **Cause a reduction in assets** of the government (Recovery of loans, Disinvestment / privatization of PSU shares).`,
        ncertPointers: [
          "Disinvestment is a capital receipt because it reduces government's ownership of physical/financial assets.",
          "Borrowings are debt-creating capital receipts; recovery of loans and disinvestment are non-debt capital receipts.",
        ],
      },
      {
        title: "Classification of Expenditure & Deficit Measures",
        content: `**Government Expenditure Criteria**:
- **Revenue Expenditure**: Expenses that neither create assets nor reduce liabilities (Salaries of government staff, Old-age pensions, Defense services operational costs, Subsidies, **Interest payments** on past loans).
- **Capital Expenditure**: Expenses that either create physical/financial assets (construction of highways, metro rail, schools) or reduce liabilities (repayment of public debt loans).

**Three Key Deficit Measures**:
1. **Revenue Deficit (RD)**:
   $$\\text{Revenue Deficit} = \\text{Revenue Expenditure} - \\text{Revenue Receipts}$$
   Signifies that government is dissaving and using borrowings to finance day-to-day administrative consumption.
2. **Fiscal Deficit (FD)**:
   $$\\text{Fiscal Deficit} = \\text{Total Budget Expenditure} - (\\text{Total Budget Receipts excluding Borrowings})$$
   $$\\mathbf{\\text{Fiscal Deficit} = \\text{Total Borrowings of Government}}$$
   Indicates total borrowing requirements of the government from all sources (market, RBI, abroad) to bridge the budget gap.
3. **Primary Deficit (PD)**:
   $$\\text{Primary Deficit} = \\text{Fiscal Deficit} - \\text{Interest Payments}$$
   Measures current fiscal indiscipline by deducting past debt servicing obligations (interest payments) from the current fiscal deficit.`,
        ncertPointers: [
          "If Primary Deficit is zero ($PD = 0$), it implies Fiscal Deficit is exactly equal to Interest Payments (borrowing is done solely to service past debt).",
          "Fiscal Deficit leads to a National Debt Trap when borrowings are continually used to service interest on earlier borrowings.",
        ],
      },
      {
        title: "Objectives of Government Budget & Fiscal Policy",
        content: `**Budgetary Policy Objectives**:
1. **Reallocation of Resources**: Influencing allocation of resources through tax concessions / subsidies (e.g. promoting clean solar energy) or heavy taxation on demerit goods (tobacco, alcohol). Direct production of public goods.
2. **Reduction of Income Inequalities**: Progressive income taxation where richer sections pay higher tax rates, and tax revenue is used to fund welfare subsidies for low-income households.
3. **Economic Stability**: Counter-cyclical fiscal policy (deficit spending and tax cuts during depression; budgetary surplus and tax hikes during inflation).
4. **Management of Public Enterprises**: Providing budgetary support to natural monopolies (railways, power grid).`,
        ncertPointers: [
          "FRBM Act (Fiscal Responsibility and Budget Management Act, 2003): Mandated reduction of fiscal deficit to sustainable limits (3% of GDP).",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Government Deficit Formulas",
        formula: "\\text{RD} = \\text{Rev Exp} - \\text{Rev Rec}; \\quad \\text{FD} = \\text{Total Exp} - (\\text{Total Rec} - \\text{Borrowings}) = \\text{Borrowings}; \\quad \\text{PD} = \\text{FD} - \\text{Interest Payments}",
        symbols: "RD = Revenue Deficit, FD = Fiscal Deficit, PD = Primary Deficit",
        siUnits: "Crores of INR",
        applicationCondition: "Government fiscal deficit accounting",
      },
      {
        name: "Receipts & Expenditure Classification Rules",
        formula: "\\text{Revenue: No Liability Created, No Asset Reduced} \\quad | \\quad \\text{Capital: Liability Created OR Asset Reduced}",
        symbols: "Criteria for fiscal classification",
        siUnits: "Binary rule evaluation",
        applicationCondition: "Union Budget item categorization",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Government Budget Architecture &amp; Deficit Measures</text>
  
  <!-- Left Column: Receipts -->
  <rect x="50" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5"/>
  <text x="205" y="90" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">BUDGET RECEIPTS</text>
  
  <rect x="65" y="110" width="280" height="65" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="75" y="128" fill="#38bdf8" fontSize="11" fontWeight="bold">1. Revenue Receipts (No Liab / No Asset Dec)</text>
  <text x="75" y="148" fill="#cbd5e1" fontSize="10">• Tax: Direct (Income/Corp), Indirect (GST)</text>
  <text x="75" y="165" fill="#cbd5e1" fontSize="10">• Non-tax: Interest, Dividends, Fines, Fees</text>
  
  <rect x="65" y="190" width="280" height="65" rx="6" fill="#0f172a" stroke="#f59e0b"/>
  <text x="75" y="208" fill="#fbbf24" fontSize="11" fontWeight="bold">2. Capital Receipts (Liab Inc OR Asset Dec)</text>
  <text x="75" y="228" fill="#cbd5e1" fontSize="10">• Borrowings (Debt creating)</text>
  <text x="75" y="245" fill="#cbd5e1" fontSize="10">• Recovery of loans &amp; Disinvestment (Non-debt)</text>
  
  <!-- Right Column: Expenditures -->
  <rect x="400" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5"/>
  <text x="555" y="90" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">BUDGET EXPENDITURE &amp; DEFICITS</text>
  
  <rect x="415" y="110" width="280" height="55" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="425" y="128" fill="#86efac" fontSize="11" fontWeight="bold">Revenue Exp (Salaries, Subsidies, Interest)</text>
  <text x="425" y="148" fill="#cbd5e1" fontSize="10">Capital Exp (Flyovers, Schools, Repayment of Loans)</text>
  
  <rect x="415" y="175" width="280" height="85" rx="6" fill="#0f172a" stroke="#ef4444"/>
  <text x="425" y="195" fill="#fca5a5" fontSize="11" fontWeight="bold">Key Deficit Formulas:</text>
  <text x="425" y="215" fill="#cbd5e1" fontSize="10">• Revenue Deficit = Rev Exp - Rev Rec</text>
  <text x="425" y="232" fill="#cbd5e1" fontSize="10">• <tspan fill="#fca5a5" fontWeight="bold">Fiscal Deficit = Total Borrowings</tspan></text>
  <text x="425" y="250" fill="#cbd5e1" fontSize="10">• Primary Deficit = Fiscal Deficit - Interest Paid</text>
</svg>`,
    workedExamples: [
      {
        id: "eco_u7_t1_we1",
        questionNumber: 1,
        question: "In a government budget, Revenue Receipts = ₹40,000 crores, Revenue Expenditure = ₹50,000 crores, Capital Receipts (excluding borrowings) = ₹10,000 crores, and Total Capital Expenditure = ₹25,000 crores. Interest payments are ₹8,000 crores. Calculate the Fiscal Deficit and Primary Deficit.",
        options: [
          { id: "A", text: "Fiscal Deficit = ₹25,000 crores; Primary Deficit = ₹17,000 crores" },
          { id: "B", text: "Fiscal Deficit = ₹20,000 crores; Primary Deficit = ₹12,000 crores" },
          { id: "C", text: "Fiscal Deficit = ₹35,000 crores; Primary Deficit = ₹27,000 crores" },
          { id: "D", text: "Fiscal Deficit = ₹15,000 crores; Primary Deficit = ₹7,000 crores" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Total Expenditure = Revenue Expenditure + Capital Expenditure = ₹50,000 + ₹25,000 = ₹75,000 crores.",
          "Step 2: Total Receipts excluding Borrowings = Revenue Receipts + Non-debt Capital Receipts = ₹40,000 + ₹10,000 = ₹50,000 crores.",
          "Step 3: Fiscal Deficit = Total Expenditure - Total Receipts excluding Borrowings = ₹75,000 - ₹50,000 = ₹25,000 crores.",
          "Step 4: Primary Deficit = Fiscal Deficit - Interest Payments = ₹25,000 - ₹8,000 = ₹17,000 crores.",
          "Step 5: Option A is exact.",
        ],
      },
      {
        id: "eco_u7_t1_we2",
        questionNumber: 2,
        question: "What does a zero Primary Deficit imply in government budgeting?",
        options: [
          { id: "A", text: "The government has zero fiscal deficit" },
          { id: "B", text: "The government needs to borrow only to pay interest on past accumulated debts" },
          { id: "C", text: "Revenue deficit is zero" },
          { id: "D", text: "Government has zero revenue receipts" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: $\\text{Primary Deficit} = \\text{Fiscal Deficit} - \\text{Interest Payments}$.",
          "Step 2: If Primary Deficit = 0, then $\\text{Fiscal Deficit} = \\text{Interest Payments}$.",
          "Step 3: This implies that the entire borrowing requirement of the government is solely to finance interest obligations on past debts, with zero current year fiscal deficit beyond interest. Option B is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Fiscal Deficit Identity",
        frequency: "Very High",
        typicalStem: "Fiscal deficit is always equal to:",
        strategy: "Total Borrowings of the Government.",
      },
      {
        patternType: "Classification of Receipts and Expenses",
        frequency: "High",
        typicalStem: "Disinvestment of public sector undertakings (PSUs) is classified under the government budget as:",
        strategy: "Capital Receipt (reduces government asset ownership).",
      },
    ],
    commonTraps: [
      {
        concept: "Interest Payment Classification",
        misconception: "Classifying interest payment as capital expenditure.",
        correctUnderstanding: "Interest payment is a **Revenue Expenditure** (does not create asset or reduce loan liability). Repayment of the loan principal is a Capital Expenditure.",
      },
      {
        concept: "Borrowings in Fiscal Deficit",
        misconception: "Adding borrowings to total receipts when calculating fiscal deficit.",
        correctUnderstanding: "Fiscal deficit is Total Expenditure minus Total Receipts **EXCLUDING BORROWINGS**. If you include borrowings, the budget talleys to zero!",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Deficit Hierarchy",
        mnemonic: "R-F-P: Revenue Deficit $\\to$ Fiscal Deficit $\\to$ Primary Deficit.",
        explanation: "Subtract interest from Fiscal to reach Primary.",
      },
    ],
    quickRevisionCard: {
      title: "Government Budget — High-Yield Cheat Sheet",
      bulletPoints: [
        "Revenue Receipts: No liability created, no asset reduced (Taxes, dividends, fines).",
        "Capital Receipts: Liability created OR asset reduced (Borrowings, disinvestment, loan recovery).",
        "Revenue Exp: No asset created, no liability reduced (Salaries, subsidies, interest payments).",
        "Capital Exp: Asset created OR liability reduced (Construction, loan repayment).",
        "Revenue Deficit = Revenue Expenditure - Revenue Receipts.",
        "Fiscal Deficit = Total Borrowings of Government.",
        "Primary Deficit = Fiscal Deficit - Interest Payments.",
        "Zero Primary Deficit $\\implies$ Fiscal Deficit = Interest Payments.",
      ],
    },
    practiceQuestions: [
      {
        id: "eco_u7_t1_q1",
        question: "Fiscal Deficit in the government budget is always equal to:",
        options: [
          { id: "A", text: "Total interest payments" },
          { id: "B", text: "Total borrowings of the government" },
          { id: "C", text: "Revenue deficit minus capital deficit" },
          { id: "D", text: "Primary deficit plus subsidies" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Fiscal deficit measures the total budgetary gap that must be financed through borrowings; hence Fiscal Deficit = Total Borrowings of the Government.",
      },
      {
        id: "eco_u7_t1_q2",
        question: "Receipts from disinvestment of shares of Public Sector Undertakings (PSUs) are classified as:",
        options: [
          { id: "A", text: "Revenue Receipts" },
          { id: "B", text: "Capital Receipts" },
          { id: "C", text: "Tax Revenue" },
          { id: "D", text: "Non-tax Revenue Receipts" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Disinvestment involves the sale of equity shares owned by the government, which reduces financial assets of the government; therefore it is a Capital Receipt.",
      },
      {
        id: "eco_u7_t1_q3",
        question: "Which of the following is an example of Revenue Expenditure?",
        options: [
          { id: "A", text: "Purchase of defense aircraft from abroad" },
          { id: "B", text: "Construction of a new express highway" },
          { id: "C", text: "Payment of interest on national public debt" },
          { id: "D", text: "Repayment of loan taken from World Bank" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Payment of interest is a routine recurring operational expense that neither creates an asset nor reduces loan principal liability; hence it is a Revenue Expenditure.",
      },
      {
        id: "eco_u7_t1_q4",
        question: "If Primary Deficit is zero, it implies that:",
        options: [
          { id: "A", text: "Fiscal Deficit is zero" },
          { id: "B", text: "Fiscal Deficit is exactly equal to Interest Payments" },
          { id: "C", text: "Revenue Deficit is zero" },
          { id: "D", text: "The government has zero public debt" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Since $\\text{Primary Deficit} = \\text{Fiscal Deficit} - \\text{Interest Payments}$, a zero primary deficit means Fiscal Deficit = Interest Payments.",
      },
      {
        id: "eco_u7_t1_q5",
        question: "Which of the following taxes is a direct tax?",
        options: [
          { id: "A", text: "Goods and Services Tax (GST)" },
          { id: "B", text: "Customs Duty" },
          { id: "C", text: "Corporate Income Tax" },
          { id: "D", text: "Excise Duty" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Corporate tax is levied directly on the net profits of companies, and the liability and incidence fall on the same entity (cannot be shifted).",
      },
      {
        id: "eco_u7_t1_q6",
        question: "A progressive tax system helps to achieve which objective of the government budget?",
        options: [
          { id: "A", text: "Reduction of income and wealth inequalities" },
          { id: "B", text: "Reallocation of resources towards demerit goods" },
          { id: "C", text: "Elimination of foreign trade deficit" },
          { id: "D", text: "Increasing money supply" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Progressive taxation taxes higher income earners at higher marginal rates and uses the revenue to provide public goods and subsidies for poorer sections, reducing income disparity.",
      },
      {
        id: "eco_u7_t1_q7",
        question: "Grants-in-aid given by the Central Government to State Governments are treated in the Union Budget as:",
        options: [
          { id: "A", text: "Capital Expenditure" },
          { id: "B", text: "Revenue Expenditure" },
          { id: "C", text: "Capital Receipts" },
          { id: "D", text: "Loans and Advances" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Grants-in-aid do not create any financial or physical asset for the central government, nor do they reduce liability; hence they are classified as Revenue Expenditure.",
      },
      {
        id: "eco_u7_t1_q8",
        question: "If Revenue Expenditure is ₹70,000 crores and Revenue Deficit is ₹15,000 crores, the Revenue Receipts of the government are:",
        options: [
          { id: "A", text: "₹85,000 crores" },
          { id: "B", text: "₹55,000 crores" },
          { id: "C", text: "₹70,000 crores" },
          { id: "D", text: "₹15,000 crores" },
        ],
        correctOption: "B",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "easy",
        explanation: "$\\text{Revenue Deficit} = \\text{Revenue Expenditure} - \\text{Revenue Receipts} \\implies 15,000 = 70,000 - \\text{Rev Rec} \\implies \\text{Rev Rec} = 70,000 - 15,000 = ₹55,000$ crores.",
      },
      {
        id: "eco_u7_t1_q9",
        question: "Escheat refers to:",
        options: [
          { id: "A", text: "Tax levied on imported luxury items" },
          { id: "B", text: "Revenue claimed by the government on the property of a person who dies without leaving a legal heir or will" },
          { id: "C", text: "Penalty for tax evasion" },
          { id: "D", text: "Profits of commercial public sector undertakings" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Escheat is a non-tax revenue receipt arising when property claims lapse to the state because the deceased owner leaves no legal heirs or will.",
      },
      {
        id: "eco_u7_t1_q10",
        question: "Which of the following is a debt-creating capital receipt?",
        options: [
          { id: "A", text: "Recovery of loans from state governments" },
          { id: "B", text: "Disinvestment of public sector enterprise shares" },
          { id: "C", text: "Market loans raised by government through sovereign bonds" },
          { id: "D", text: "Dividends received from Reserve Bank of India" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Market borrowings through government bonds create a future repayment obligation (liability) and are debt-creating capital receipts.",
      },
    ],
  },

  // Unit 8: Balance of Payments, Foreign Exchange Rate Determination
  {
    id: "eco_u8_t1",
    slug: "balance-of-payments-foreign-exchange-rate-determination",
    subject: "eco",
    subjectName: "Economics",
    subjectCode: "309",
    unitNumber: 8,
    unitTitle: "Balance of Payments and Foreign Exchange",
    topicTitle: "Balance of Payments, Foreign Exchange Rate Determination",
    ncertReference: {
      class: "Class 12",
      book: "Introductory Macroeconomics",
      chapterNumber: 6,
      chapterName: "Open Economy Macroeconomics",
      sections: [
        "6.1 Balance of Payments (BoP): Meaning and Accounting Structure (Credit vs Debit)",
        "6.2 Current Account (Trade Balance in goods, Invisibles: Services, Transfers, Income)",
        "6.3 Capital Account (FDI, FPI/FII, External Commercial Borrowings, NRI Deposits)",
        "6.4 Autonomous vs Accommodating Transactions ('Above the Line' vs 'Below the Line')",
        "6.5 BoP Deficit / Surplus and Official Reserve Transactions",
        "6.6 Foreign Exchange Rate: Fixed vs Flexible vs Managed Floating Exchange Rate Systems",
        "6.7 Determination of Flexible Exchange Rate (Demand and Supply of Forex, Depreciation vs Devaluation, Appreciation vs Revaluation)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (7-9 questions per shift)",
      totalPyqsInRepo: 270,
      weightagePercentage: 15,
    },
    summary30Seconds: [
      "BoP Current Account: Goods trade balance + Invisibles (services, transfers, factor income). BoP Capital Account: Foreign investment (FDI + FPI), external borrowings, banking capital.",
      "Autonomous vs Accommodating: Autonomous ('above the line') are undertaken for economic profit; Accommodating ('below the line') are undertaken by central bank to bridge the BoP gap.",
      "Forex Systems: Flexible exchange rate determined by market forces of demand and supply; Managed Floating (dirty floating) is market-driven with central bank interventions to stabilize volatility; Depreciation (market forces) vs Devaluation (government decree in fixed system).",
    ],
    coreConcepts: [
      {
        title: "Balance of Payments Structure: Current vs Capital Account",
        content: `**BoP Accounting Principles**:
- Systematic record of all economic transactions between residents of a country and the rest of the world during an accounting year.
- Double-entry bookkeeping:
  - **Credit side (+)**: Inflow of foreign exchange (Exports of goods/services, FDI inflows, borrowings from abroad).
  - **Debit side (-)**: Outflow of foreign exchange (Imports of goods/services, investment abroad, lending abroad).

**Current Account vs Capital Account**:
1. **Current Account**: Transactions that do NOT alter the asset/liability status of the country:
   - *Merchandise Trade Balance*: $\\text{Exports of Goods} - \\text{Imports of Goods}$.
   - *Invisibles*: Non-factor services (travel, shipping, software), Factor services (investment income: interest, profits, dividends), and Unilateral transfers (remittances, gifts, donations).
2. **Capital Account**: Transactions that cause a change in the assets or liabilities of residents or government:
   - *Foreign Investment*: **FDI** (Foreign Direct Investment with control, e.g. opening a factory) and **FPI** (Foreign Portfolio Investment without management control, e.g. buying shares).
   - *External Borrowings*: Commercial borrowings and concessional loans.
   - *Banking Capital*: NRI deposits.`,
        ncertPointers: [
          "Current Account Deficit (CAD) = When payments on current account exceed receipts. Financed by capital account surplus or draw down of forex reserves.",
          "Balance of Trade (BOT) covers ONLY tangible goods (merchandise), while Current Account covers goods, services, and transfers.",
        ],
      },
      {
        title: "Autonomous vs Accommodating Transactions & BoP Disequilibrium",
        content: `**Autonomous Transactions ('Above the Line')**:
- Economic transactions undertaken for individual self-interest or business profit considerations, independent of the state of the BoP.
- These transactions determine whether the BoP is in deficit or surplus.

**Accommodating Transactions ('Below the Line')**:
- Compensating transactions undertaken by the central bank to cover the deficit or absorb the surplus arising from autonomous transactions.
- Involves **Official Reserve Transactions (ORT)**:
  - If autonomous receipts < autonomous payments $\\implies$ **BoP Deficit** $\\implies$ Central bank sells foreign exchange from official reserves.
  - If autonomous receipts > autonomous payments $\\implies$ **BoP Surplus** $\\implies$ Central bank purchases foreign exchange, adding to reserves.`,
        ncertPointers: [
          "In accounting terms, BoP always balances ($Current + Capital + ORT = 0$), but economically, BoP has a deficit or surplus based on autonomous items.",
        ],
      },
      {
        title: "Foreign Exchange Systems & Rate Determination",
        content: `**Exchange Rate Regimes**:
1. **Fixed Exchange Rate System (Gold Standard / Bretton Woods)**: Exchange rate officially pegged to gold or US dollar by the government.
   - *Devaluation*: Official lowering of domestic currency value by government decree.
   - *Revaluation*: Official raising of domestic currency value by government decree.
2. **Flexible (Floating) Exchange Rate System**: Determined purely by market forces of demand and supply of foreign currency without government intervention:
   - *Depreciation*: Fall in the value of domestic currency relative to foreign currency due to market forces ($1 = ₹80 \\to $1 = ₹85). **Encourages exports, discourages imports**.
   - *Appreciation*: Rise in the value of domestic currency due to market forces ($1 = ₹80 \\to $1 = ₹75).
3. **Managed Floating (Dirty Floating)**: Exchange rate is determined primarily by market forces, but central bank intervenes by buying or selling forex to curb excessive short-term volatility.`,
        ncertPointers: [
          "Demand for forex arises from: Imports, foreign travel, investment abroad, unilateral transfers abroad, speculative purchases.",
          "Supply of forex arises from: Exports of goods/services, foreign tourists in India, FDI/FPI inflows, remittances from NRIs.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Balance of Trade vs Current Account",
        formula: "\\text{BOT} = \\text{Exports of Goods} - \\text{Imports of Goods}; \\quad \\text{Current Account} = \\text{BOT} + \\text{Net Invisibles}",
        symbols: "Merchandise vs Total Current Transactions",
        siUnits: "USD or INR",
        applicationCondition: "External sector account reconciliation",
      },
      {
        name: "Currency Movement Equivalences",
        formula: "\\text{Market Driven: Depreciation vs Appreciation} \\quad | \\quad \\text{Government Pegged: Devaluation vs Revaluation}",
        symbols: "Exchange rate terminology",
        siUnits: "Price of foreign currency in domestic units",
        applicationCondition: "Forex market analysis",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Foreign Exchange Rate Determination in a Flexible Market</text>
  
  <!-- Axes -->
  <line x1="80" y1="250" x2="680" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <line x1="80" y1="50" x2="80" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <text x="380" y="278" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Quantity of US Dollars ($)</text>
  <text x="45" y="150" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold" transform="rotate(-90 45 150)">Exchange Rate (₹/$)</text>
  
  <!-- Demand Curve for Dollars (Downward sloping: Imports) -->
  <line x1="120" y1="70" x2="580" y2="230" stroke="#ef4444" strokeWidth="3"/>
  <text x="590" y="235" fill="#f87171" fontSize="12" fontWeight="bold">Demand for $ (Imports)</text>
  
  <!-- Supply Curve of Dollars (Upward sloping: Exports) -->
  <line x1="120" y1="230" x2="580" y2="70" stroke="#10b981" strokeWidth="3"/>
  <text x="590" y="75" fill="#34d399" fontSize="12" fontWeight="bold">Supply of $ (Exports)</text>
  
  <!-- Equilibrium E -->
  <circle cx="350" cy="150" r="6" fill="#38bdf8"/>
  <text x="365" y="145" fill="#38bdf8" fontSize="12" fontWeight="bold">E (Equilibrium: R* = ₹83/$)</text>
  
  <!-- Depreciation indicator -->
  <line x1="80" y1="100" x2="620" y2="100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4"/>
  <text x="630" y="105" fill="#fbbf24" fontSize="11">R1 = ₹86 (Depreciation of Rupee)</text>
  
  <!-- Appreciation indicator -->
  <line x1="80" y1="200" x2="620" y2="200" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4"/>
  <text x="630" y="205" fill="#c084fc" fontSize="11">R2 = ₹80 (Appreciation of Rupee)</text>
</svg>`,
    workedExamples: [
      {
        id: "eco_u8_t1_we1",
        questionNumber: 1,
        question: "In an accounting year, a country's merchandise exports were ₹600 billion and merchandise imports were ₹750 billion. Net invisible balance was ₹200 billion. Calculate the Current Account Balance.",
        options: [
          { id: "A", text: "Surplus of ₹50 billion" },
          { id: "B", text: "Deficit of ₹150 billion" },
          { id: "C", text: "Surplus of ₹150 billion" },
          { id: "D", text: "Deficit of ₹50 billion" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Balance of Trade (BOT) = Exports of Goods - Imports of Goods = ₹600 - ₹750 = ₹(-)150 billion.",
          "Step 2: Current Account Balance = Balance of Trade + Net Invisibles = ₹(-)150 + ₹200 = ₹+50 billion.",
          "Step 3: The positive balance represents a Current Account Surplus of ₹50 billion. Option A is exact.",
        ],
      },
      {
        id: "eco_u8_t1_we2",
        questionNumber: 2,
        question: "When the exchange rate moves from $1 = ₹80 to $1 = ₹85 due to changes in market demand and supply, which of the following statements is correct?",
        options: [
          { id: "A", text: "Indian Rupee has appreciated, making Indian exports cheaper" },
          { id: "B", text: "Indian Rupee has depreciated, making Indian exports cheaper for foreign buyers" },
          { id: "C", text: "US Dollar has depreciated against Indian Rupee" },
          { id: "D", text: "Indian imports will become cheaper" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: More rupees are now required to buy one dollar (₹80 $\\to$ ₹85), meaning the Indian Rupee has lost value (depreciated).",
          "Step 2: Depreciation makes domestic goods cheaper for foreign buyers (1 dollar buys ₹85 worth of Indian goods instead of ₹80), thus encouraging Indian exports.",
          "Step 3: Option B is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Autonomous vs Accommodating Classification",
        frequency: "Very High",
        typicalStem: "Transactions that are undertaken by the monetary authorities to finance the deficit or absorb surplus in the Balance of Payments are called:",
        strategy: "Accommodating transactions ('below the line').",
      },
      {
        patternType: "FDI vs FPI Distinction",
        frequency: "High",
        typicalStem: "Foreign institutional investments (FII) in Indian stock market shares are classified under which account of BoP?",
        strategy: "Capital Account (under Foreign Portfolio Investment).",
      },
    ],
    commonTraps: [
      {
        concept: "Depreciation vs Devaluation",
        misconception: "Using depreciation and devaluation interchangeably.",
        correctUnderstanding: "**Depreciation** occurs under a flexible exchange rate system due to market demand and supply. **Devaluation** is an official policy reduction in currency value by the government under a fixed exchange rate system.",
      },
      {
        concept: "BOT vs Current Account",
        misconception: "Equating Balance of Trade with Current Account.",
        correctUnderstanding: "Balance of Trade records ONLY physical tangible merchandise (goods). Current Account includes goods PLUS invisibles (services, investment income, and unilateral transfers).",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Above vs Below the Line",
        mnemonic: "Autonomous is Above (Profit motivated); Accommodating is Below (Gap filler).",
        explanation: "Never reverse above and below the line in BoP.",
      },
    ],
    quickRevisionCard: {
      title: "BoP & Forex — High-Yield Cheat Sheet",
      bulletPoints: [
        "Current Account: Trade in goods + Services + Factor Income + Transfers.",
        "Capital Account: Foreign Investment (FDI + FPI) + Loans + Banking capital.",
        "Autonomous items ('above the line'): Done for commercial profit motives.",
        "Accommodating items ('below the line'): Central bank reserve transactions to bridge BoP gap.",
        "Flexible rate: Set by forex demand and supply; Managed Floating: Market rate with RBI intervention.",
        "Depreciation ($1 = ₹80 $\\to$ ₹85): Makes exports cheaper, imports costlier.",
        "Appreciation ($1 = ₹80 $\\to$ ₹75): Makes imports cheaper, exports costlier.",
        "Devaluation/Revaluation occur ONLY in a fixed exchange rate regime.",
      ],
    },
    practiceQuestions: [
      {
        id: "eco_u8_t1_q1",
        question: "Transactions in the Balance of Payments that are determined by profit considerations and are independent of the BoP position are called:",
        options: [
          { id: "A", text: "Accommodating transactions" },
          { id: "B", text: "Autonomous transactions" },
          { id: "C", text: "Official reserve transactions" },
          { id: "D", text: "Current transfers" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Autonomous transactions ('above the line') are undertaken for economic profit motives and determine whether the overall balance of payments is in surplus or deficit.",
      },
      {
        id: "eco_u8_t1_q2",
        question: "Balance of Trade measures the net difference between:",
        options: [
          { id: "A", text: "Total exports and total imports of both goods and services" },
          { id: "B", text: "Exports and imports of visible physical goods only" },
          { id: "C", text: "Inflow and outflow of foreign capital" },
          { id: "D", text: "Autonomous and accommodating transactions" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Balance of Trade (BOT) or Merchandise Trade Balance covers strictly tangible visible physical goods.",
      },
      {
        id: "eco_u8_t1_q3",
        question: "When the Indian Rupee depreciates against the US Dollar in a flexible exchange rate regime:",
        options: [
          { id: "A", text: "Indian exports become cheaper for foreigners and imports become dearer" },
          { id: "B", text: "Indian exports become costlier and imports become cheaper" },
          { id: "C", text: "Both exports and imports expand equally" },
          { id: "D", text: "National income contracts automatically" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Depreciation means 1 dollar buys more rupees, lowering the price of Indian goods for foreign buyers (boosting exports) and raising the rupee price of imports.",
      },
      {
        id: "eco_u8_t1_q4",
        question: "Which of the following is recorded in the Capital Account of the Balance of Payments?",
        options: [
          { id: "A", text: "Export of software services" },
          { id: "B", text: "Unilateral remittances sent by NRIs to their families" },
          { id: "C", text: "Foreign Direct Investment (FDI) inflows" },
          { id: "D", text: "Import of crude oil" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "FDI causes a change in the international asset/liability position of the country, so it is recorded in the Capital Account.",
      },
      {
        id: "eco_u8_t1_q5",
        question: "A system in which the foreign exchange rate is determined by market forces but the central bank intervenes to stabilize severe volatility is called:",
        options: [
          { id: "A", text: "Fixed exchange rate system" },
          { id: "B", text: "Managed floating (dirty floating)" },
          { id: "C", text: "Gold Standard" },
          { id: "D", text: "Crawling peg" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Managed floating is a hybrid regime where market forces primarily set the rate, but the central bank buys/sells forex to prevent erratic fluctuations.",
      },
      {
        id: "eco_u8_t1_q6",
        question: "Unilateral transfers (gifts, donations, remittances) are recorded in the Balance of Payments under:",
        options: [
          { id: "A", text: "Capital Account" },
          { id: "B", text: "Current Account" },
          { id: "C", text: "Official Reserve Account" },
          { id: "D", text: "Trade Account" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Unilateral transfers are one-way transfer payments that do not create any future financial liability or asset; they are recorded under Invisibles in the Current Account.",
      },
      {
        id: "eco_u8_t1_q7",
        question: "Devaluation of domestic currency refers to:",
        options: [
          { id: "A", text: "Reduction in value of domestic currency by market forces under floating exchange rate" },
          { id: "B", text: "Deliberate downward adjustment of domestic currency value by the government under a fixed exchange rate system" },
          { id: "C", text: "Fall in domestic price level" },
          { id: "D", text: "Rise in foreign exchange reserves" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Devaluation is an official government policy action reducing the par value of the domestic currency under a pegged or fixed exchange rate regime.",
      },
      {
        id: "eco_u8_t1_q8",
        question: "If a country has a Current Account Deficit of ₹400 million and net capital inflows (Capital Account Surplus) of ₹300 million, what will be the effect on Official Reserves?",
        options: [
          { id: "A", text: "Forex reserves will increase by ₹100 million" },
          { id: "B", text: "Forex reserves will decrease by ₹100 million (withdrawal from reserves)" },
          { id: "C", text: "Forex reserves will remain unchanged" },
          { id: "D", text: "Capital account deficit will widen to ₹700 million" },
        ],
        correctOption: "B",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "medium",
        explanation: "Overall BoP balance = Current Account + Capital Account = -400 + 300 = -100 million (deficit). The central bank must finance this by drawing down ₹100 million from foreign exchange reserves.",
      },
      {
        id: "eco_u8_t1_q9",
        question: "The demand curve for foreign exchange is downward sloping because:",
        options: [
          { id: "A", text: "A fall in the exchange rate makes imports cheaper, increasing the demand for foreign currency" },
          { id: "B", text: "A rise in exchange rate increases exports" },
          { id: "C", text: "Central banks buy more dollars when exchange rate rises" },
          { id: "D", text: "Speculative demand decreases when price falls" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "When price of foreign currency falls, imports become cheaper for domestic consumers, increasing import volume and consequently raising the demand for foreign currency.",
      },
      {
        id: "eco_u8_t1_q10",
        question: "Accommodating transactions in the Balance of Payments are also known as:",
        options: [
          { id: "A", text: "Above the line items" },
          { id: "B", text: "Below the line items" },
          { id: "C", text: "Unilateral transfers" },
          { id: "D", text: "Commercial transactions" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Accommodating items are officially termed 'below the line items' because they are determined after autonomous transactions to restore accounting balance.",
      },
    ],
  },

  // Unit 9: Development Policies (1947-1990), LPG Reforms 1991, Current Challenges, Comparison with Neighbors
  {
    id: "eco_u9_t1",
    slug: "development-policies-1947-1990-lpg-reforms-1991-current-challenges-comparison-with-neighbors",
    subject: "eco",
    subjectName: "Economics",
    subjectCode: "309",
    unitNumber: 9,
    unitTitle: "Indian Economic Development",
    topicTitle: "Development Policies (1947-1990), LPG Reforms 1991, Current Challenges, Comparison with Neighbors",
    ncertReference: {
      class: "Class 12",
      book: "Indian Economic Development",
      chapterNumber: 1,
      chapterName: "Development Policies and Experience (1947-1990) & Economic Reforms Since 1991",
      sections: [
        "1.1 Indian Economy on the Eve of Independence (Agriculture stagnation, Zamindari, Drain of wealth)",
        "2.1 Five Year Plans: Common Goals (Growth, Modernisation, Self-reliance, Equity)",
        "2.2 Agricultural Reforms: Land Reforms (Abolition of intermediaries, Land ceiling) & Green Revolution (HYV seeds)",
        "2.3 Industrial Policy Resolution (IPR) 1956 & Import Substitution (Inward-looking trade strategy)",
        "3.1 Economic Crisis of 1991 & Need for Reforms (BoP crisis, Inflation, Fiscal deficit)",
        "3.2 Liberalisation, Privatisation, and Globalisation (LPG): De-licensing, Disinvestment, WTO, Outsourcing",
        "4.1 Current Challenges: Human Capital Formation, Rural Development, Employment (Informalisation), Sustainable Development",
        "5.1 Comparative Development Experiences of India, Pakistan, and China (Demographic indicators, GDP growth, HDI)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (8-10 questions per shift)",
      totalPyqsInRepo: 290,
      weightagePercentage: 16,
    },
    summary30Seconds: [
      "1947–1990 Strategy: Inward-looking trade strategy (import substitution with tariffs and quotas); IPR 1956 classified industries into 3 schedules; Green Revolution introduced HYV seeds (wheat and rice) with subsidies.",
      "1991 New Economic Policy (NEP): Triggered by BoP crisis (forex reserves down to 2 weeks); LPG reforms deregulated industrial licensing (MRTP abolished), allowed FDI, opened up trade, and led to WTO membership in 1995.",
      "Comparative Experience: China launched reforms in 1978 (Great Leap Forward 1958, Commune system, SEZs); Pakistan in 1988; India in 1991. China leads in GDP growth, poverty reduction, and HDI.",
    ],
    coreConcepts: [
      {
        title: "Development Policies (1947–1990): Agriculture & Industry",
        content: `**Foundational Goals of Five Year Plans (PC Mahalanobis Model)**:
1. **Growth**: Increase in country's capacity to produce goods and services (GDP).
2. **Modernisation**: Adoption of new technology and social outlook.
3. **Self-Reliance**: Avoiding dependence on foreign imports for essential goods.
4. **Equity**: Ensuring fruits of development reach the poorest sections.

**Agricultural Strategy**:
- **Land Reforms**: Abolition of intermediaries (zamindars, making 200 lakh tenants direct owners) and **Land Ceiling** (fixing maximum size of land an individual could own to reduce concentration).
- **Green Revolution (mid-1960s)**: High Yielding Variety (HYV) seeds developed by Norman Borlaug, paired with chemical fertilizers, pesticides, and assured irrigation.
  - Phase 1 (mid-60s to mid-70s): Confined to wheat-growing regions (Punjab, Haryana, Western UP).
  - Phase 2 (mid-70s to mid-80s): Spread to rice and diverse regions; achieved **Marketed Surplus** and food self-sufficiency.

**Industrial Strategy & IPR 1956**:
- **Industrial Policy Resolution (IPR) 1956**: Formed basis of Second Five Year Plan:
  - *Schedule A*: 17 industries exclusively owned by State (Atomic energy, Railways, Heavy machinery).
  - *Schedule B*: 12 industries progressively state-owned, private sector supplementing.
  - *Schedule C*: Remaining private industries regulated via **Industrial Licensing**.
- **Inward-Looking Trade Strategy (Import Substitution)**: Replacing imports with domestic production using **Tariffs** (taxes on imports) and **Quotas** (quantitative restrictions).`,
        ncertPointers: [
          "Karve Committee (1955): Village and Small Scale Industries Committee highlighted potential of small-scale industries for generating employment.",
        ],
      },
      {
        title: "Economic Crisis of 1991 & LPG Reforms",
        content: `**Triggers of 1991 Crisis**:
- Foreign exchange reserves plummeted to barely enough to finance **two weeks of imports**.
- Fiscal deficit reached 8.4% of GDP; inflation crossed 12%; Gulf War (1990-91) pushed crude oil prices up.
- India pledged gold reserves with Bank of England and borrowed $7 billion from IMF and World Bank under structural adjustment conditions.

**New Economic Policy (NEP) — LPG Components**:
1. **Liberalisation**:
   - Abolition of industrial licensing for all except a few hazardous/defense lines (alcohol, cigarettes, defense, hazardous chemicals, industrial explosives).
   - Financial sector reforms: RBI shifted role from 'Regulator' to **'Facilitator'**; private and foreign banks allowed.
   - Tax reforms: Simplification of direct and indirect taxes.
   - Foreign exchange reforms: Rupee devalued in July 1991, followed by market-determined exchange rate.
2. **Privatisation**:
   - Disinvestment of government equity in Public Sector Enterprises (PSEs).
   - Granting operational autonomy to profit-making PSEs (**Navratnas, Maharatnas, Miniratnas**).
3. **Globalisation**:
   - Integrating domestic economy with world economy through reduction in tariffs, removal of quantitative quotas.
   - Emergence of India as a global hub for **BPO / Outsourcing** (business process outsourcing) due to low wages and skilled English-speaking workforce.
   - India joined **WTO (World Trade Organization)** on 1st January 1995.`,
        ncertPointers: [
          "Agriculture was neglected during 1991 reforms: Public investment in agricultural infrastructure declined, subsidies were reduced, and export focus diverted land from food crops to cash crops.",
        ],
      },
      {
        title: "Comparative Experiences: India, China & Pakistan",
        content: `**Chronology of Economic Reforms**:
- **China: 1978** (under Deng Xiaoping)
- **Pakistan: 1988**
- **India: 1991**

**China's Rapid Growth Drivers**:
1. **Great Leap Forward (GLF) 1958**: Campaign to industrialize on massive scale by encouraging backyard steel furnaces; agriculture organized under **Commune System** (collective farming).
2. **Great Proletarian Cultural Revolution (1966–76)**: Mao introduced students and professionals to work in countryside.
3. **1978 Reforms**:
   - Phase 1: Agriculture (communes broken into household responsibility contracts).
   - Phase 2: Industrial sector (Township and Village Enterprises - TVEs, Dual Pricing system).
   - **Special Economic Zones (SEZs)** created to attract massive Foreign Direct Investment (FDI).
4. **One-Child Norm (late 1970s)**: Successfully curtailed population growth rate (now around 0.5%), but led to demographic skewing (aging population).

**Comparative Highlights**:
- **HDI Ranking**: China ranks significantly higher than India and Pakistan.
- **Sectoral Transition**: China shifted directly from Agriculture to **Manufacturing** (Industry contributes ~40% of GDP). India shifted from Agriculture directly to the **Services Sector** (~54% of GDP), bypassing high-absorption manufacturing.`,
        ncertPointers: [
          "Pakistan's economic deceleration was caused by political instability, over-reliance on foreign remittances from Middle East, and volatile agricultural harvests.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Reform Timelines Comparison",
        formula: "\\text{China (1978) } \\to \\text{ Pakistan (1988) } \\to \\text{ India (1991)}",
        symbols: "National reform inception years",
        siUnits: "Calendar years",
        applicationCondition: "Comparative Asian economic development",
      },
      {
        name: "IPR 1956 Industry Schedule Classification",
        formula: "\\text{Schedule A: 17 state-exclusive; Schedule B: 12 mixed; Schedule C: Regulated private}",
        symbols: "IPR 1956 classification",
        siUnits: "Industry counts",
        applicationCondition: "Indian industrial planning history",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Evolution of Indian Economic Policy: Pre-1990 vs Post-1991 (LPG)</text>
  
  <!-- Left Box: Pre-1990 Strategy -->
  <rect x="50" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5"/>
  <text x="205" y="90" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Pre-1990 Inward Strategy</text>
  
  <text x="70" y="120" fill="#cbd5e1" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Inward-Looking Trade</tspan> (Import substitution)</text>
  <text x="70" y="145" fill="#cbd5e1" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Licence-Permit-Quota Raj</tspan> (Strict regulations)</text>
  <text x="70" y="170" fill="#cbd5e1" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Dominant Public Sector</tspan> (Commanding heights)</text>
  <text x="70" y="195" fill="#cbd5e1" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Heavy Tariffs &amp; Quotas</tspan> on foreign goods</text>
  <text x="205" y="245" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">Result: Fiscal Deficit &amp; 1991 BoP Crisis</text>
  
  <!-- Right Box: Post-1991 Strategy -->
  <rect x="400" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5"/>
  <text x="555" y="90" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Post-1991 LPG Strategy</text>
  
  <text x="420" y="120" fill="#cbd5e1" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Liberalisation</tspan>: Abolished industrial licensing</text>
  <text x="420" y="145" fill="#cbd5e1" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Privatisation</tspan>: Disinvestment of PSU shares</text>
  <text x="420" y="170" fill="#cbd5e1" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Globalisation</tspan>: Tariffs cut, FDI/FPI permitted</text>
  <text x="420" y="195" fill="#cbd5e1" fontSize="11">• <tspan fill="#ffffff" fontWeight="bold">Outsourcing</tspan>: Global IT/BPO service hub</text>
  <text x="555" y="245" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">Result: High GDP Growth &amp; Forex Surge</text>
</svg>`,
    workedExamples: [
      {
        id: "eco_u9_t1_we1",
        questionNumber: 1,
        question: "Arrange the initiation of economic reform programs in India, China, and Pakistan in correct chronological order:\n(A) Pakistan\n(B) India\n(C) China",
        options: [
          { id: "A", text: "(C) $\\to$ (A) $\\to$ (B)" },
          { id: "B", text: "(B) $\\to$ (A) $\\to$ (C)" },
          { id: "C", text: "(C) $\\to$ (B) $\\to$ (A)" },
          { id: "D", text: "(A) $\\to$ (C) $\\to$ (B)" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: China initiated economic reforms under Deng Xiaoping in 1978 $\\to$ (C).",
          "Step 2: Pakistan launched its structural adjustment reforms in 1988 $\\to$ (A).",
          "Step 3: India launched its New Economic Policy (LPG) in July 1991 $\\to$ (B).",
          "Step 4: Chronological sequence is (C) [1978] $\\to$ (A) [1988] $\\to$ (B) [1991]. Option A is exact.",
        ],
      },
      {
        id: "eco_u9_t1_we2",
        questionNumber: 2,
        question: "Which committee recommended the reservation of production of certain goods exclusively for small-scale industries (SSIs) in 1955?",
        options: [
          { id: "A", text: "Karve Committee (Village and Small Scale Industries Committee)" },
          { id: "B", text: "Narasimham Committee" },
          { id: "C", text: "Mahalanobis Committee" },
          { id: "D", text: "Rangarajan Committee" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: In 1955, the Village and Small Scale Industries Committee (commonly known as the Karve Committee) highlighted the potential of small-scale industries for generating rural employment.",
          "Step 2: It recommended reserving items for exclusive production by SSIs and providing concessional bank loans. Option A is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Reform Years Ordering",
        frequency: "Very High",
        typicalStem: "In which year did China launch its market-oriented economic reforms?",
        strategy: "1978 (China), 1988 (Pakistan), 1991 (India).",
      },
      {
        patternType: "Great Leap Forward Year and Focus",
        frequency: "High",
        typicalStem: "The 'Great Leap Forward' campaign initiated in China in 1958 aimed at:",
        strategy: "Widespread industrialization throughout the country and organizing collective farming into communes.",
      },
    ],
    commonTraps: [
      {
        concept: "Mahalanobis Plan Number",
        misconception: "Associating Mahalanobis with the First Five Year Plan.",
        correctUnderstanding: "First Plan (1951–56) was based on Harrod-Domar model (agriculture). The **Second Five Year Plan (1956–61)** was based on the **Mahalanobis heavy industry model**.",
      },
      {
        concept: "Role of RBI Post-1991",
        misconception: "Believing RBI stopped regulating commercial banks after 1991.",
        correctUnderstanding: "RBI shifted its primary role from a rigid **Regulator to a Facilitator**, giving commercial banks autonomy to fix interest rates and open branches while retaining overall prudential supervision.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Reforms Order Acronym",
        mnemonic: "C-P-I: China (1978), Pakistan (1988), India (1991).",
        explanation: "10-year gaps approximately.",
      },
    ],
    quickRevisionCard: {
      title: "Indian Economic Development — Quick Card",
      bulletPoints: [
        "Common goals of 5-year plans: Growth, Modernisation, Self-reliance, Equity.",
        "IPR 1956: Schedule A (17 state-owned), Schedule B (12 mixed), Schedule C (regulated private).",
        "Karve Committee (1955): Small-scale industry employment promotion.",
        "Green Revolution: HYV seeds + chemical inputs; Phase 1 (wheat), Phase 2 (rice).",
        "1991 Crisis: Forex reserves down to 2 weeks; Gulf War oil shock; 12% inflation.",
        "LPG 1991: Industrial delicensing, Disinvestment, Rupee devaluation, WTO (1995).",
        "Outsourcing: India became IT/BPO hub due to low wages and English fluency.",
        "China (1978): Great Leap Forward (1958), Commune system, SEZs, One-child policy.",
        "Pakistan (1988); India (1991).",
      ],
    },
    practiceQuestions: [
      {
        id: "eco_u9_t1_q1",
        question: "In which year did China initiate its market-oriented economic reform programme?",
        options: [
          { id: "A", text: "1978" },
          { id: "B", text: "1988" },
          { id: "C", text: "1991" },
          { id: "D", text: "1958" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "China introduced market reforms in 1978 under Deng Xiaoping.",
      },
      {
        id: "eco_u9_t1_q2",
        question: "The 'Great Leap Forward' (GLF) campaign was launched in China in the year 1958 with the primary objective of:",
        options: [
          { id: "A", text: "Promoting widespread industrialization in the country" },
          { id: "B", text: "Privatizing state-owned enterprises" },
          { id: "C", text: "Enforcing the one-child policy" },
          { id: "D", text: "Opening the economy to foreign multinational banks" },
        ],
        correctOption: "A",
        solutionSteps: [
          "The Great Leap Forward (GLF) campaign initiated in 1958 aimed at industrialising the country on a massive scale by encouraging people to set up household backyard industries and collectivizing agriculture into communes.",
        ],
        correctAnswer: "A",
      },
      {
        id: "eco_u9_t1_q3",
        question: "Under the Industrial Policy Resolution (IPR) 1956, how many industries were reserved exclusively under public sector ownership (Schedule A)?",
        options: [
          { id: "A", text: "17" },
          { id: "B", text: "12" },
          { id: "C", text: "8" },
          { id: "D", text: "25" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "IPR 1956 classified industries into three categories: Schedule A contained 17 industries owned exclusively by the state.",
      },
      {
        id: "eco_u9_t1_q4",
        question: "The Village and Small Scale Industries Committee set up in 1955 to promote employment is also known as:",
        options: [
          { id: "A", text: "Karve Committee" },
          { id: "B", text: "Mahalanobis Committee" },
          { id: "C", text: "Chakravarty Committee" },
          { id: "D", text: "Chelliah Committee" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The Karve Committee (1955) recommended using small-scale industries to foster rural industrialization and employment.",
      },
      {
        id: "eco_u9_t1_q5",
        question: "As part of financial sector reforms under the New Economic Policy (1991), the role of the Reserve Bank of India (RBI) was transformed from:",
        options: [
          { id: "A", text: "A facilitator to a regulator" },
          { id: "B", text: "A regulator to a facilitator of the financial sector" },
          { id: "C", text: "A commercial bank to an investment bank" },
          { id: "D", text: "An issue bank to a commercial lender" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The reforms shifted RBI's role from a rigid regulator to a facilitator, granting commercial banks greater freedom in setting rates and branch expansion.",
      },
      {
        id: "eco_u9_t1_q6",
        question: "Why has India emerged as a prominent global destination for Business Process Outsourcing (BPO) services post-1991?",
        options: [
          { id: "A", text: "Availability of cheap skilled labor and fluent English-speaking professionals" },
          { id: "B", text: "Abundant agricultural export surpluses" },
          { id: "C", text: "Heavy import tariffs on software" },
          { id: "D", text: "Complete absence of taxation on IT companies" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Low wage costs combined with a large pool of educated, English-literate software engineers and professionals made India the top destination for global outsourcing.",
      },
      {
        id: "eco_u9_t1_q7",
        question: "Which sector contributed the highest share to India's Gross Domestic Product (GDP) post-1991 economic reforms?",
        options: [
          { id: "A", text: "Agriculture" },
          { id: "B", text: "Manufacturing" },
          { id: "C", text: "Services" },
          { id: "D", text: "Mining and quarrying" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Unlike China which transitioned into manufacturing, India's growth was driven predominantly by the rapid expansion of the services sector (>54% of GDP).",
      },
      {
        id: "eco_u9_t1_q8",
        question: "The trade strategy adopted by India between 1950 and 1990 is technically described as:",
        options: [
          { id: "A", text: "Export-led growth strategy" },
          { id: "B", text: "Inward-looking trade strategy (Import Substitution)" },
          { id: "C", text: "Unilateral free trade agreement" },
          { id: "D", text: "Customs union strategy" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "India followed an inward-looking trade strategy aimed at substituting domestic production for foreign imports through tariffs and quota protections.",
      },
      {
        id: "eco_u9_t1_q9",
        question: "India became a founding member of the World Trade Organization (WTO) in the year:",
        options: [
          { id: "A", text: "1991" },
          { id: "B", text: "1995" },
          { id: "C", text: "2001" },
          { id: "D", text: "1988" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The World Trade Organization was established on 1st January 1995, succeeding GATT, and India was one of its founding members.",
      },
      {
        id: "eco_u9_t1_q10",
        question: "Which of the following countries introduced the 'Commune System' of collective farming?",
        options: [
          { id: "A", text: "India" },
          { id: "B", text: "Pakistan" },
          { id: "C", text: "China" },
          { id: "D", text: "Sri Lanka" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Under the Commune System introduced in China during the Great Leap Forward in 1958, peasants were organized collectively to cultivate land collectively.",
      },
    ],
  },
];
