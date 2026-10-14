export const generalTestUnit3 = [
  // UNIT 3 - TOPIC 1: Percentages, Profit & Loss, Ratio & Proportion
  {
    id: "general-test-unit3-percentages-profit-and-loss-ratio-and-proportion",
    slug: "percentages-profit-and-loss-ratio-and-proportion",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 3,
    unitTitle: "Quantitative Reasoning & Arithmetic",
    topicTitle: "Percentages, Profit & Loss, Ratio & Proportion",
    ncertReference: {
      book: "CUET General Test / Quantitative Aptitude & Arithmetic",
      chapter: "Section 10: Percentage Fundamentals, Commercial Arithmetic & Ratio Mixtures",
      pages: "Pages 337-376",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 115,
      weightagePercentage: 16.0,
    },
    thirtySecondSummary: [
      "Percentages, Profit & Loss, and Ratios form the core computational foundation of the Quantitative Reasoning section in CUET.",
      "Fraction-to-Percentage Equivalents: Instant conversion saves calculation time (1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%, 1/5 = 20%, 1/6 = 16.67%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%).",
      "Successive Percentage Changes: Net % Change = a + b + (ab / 100)%.",
      "Commercial Arithmetic: Profit = SP - CP; Loss = CP - SP; Profit/Loss % is always calculated on Cost Price (CP) unless explicitly stated.",
      "Marked Price & Discount: Discount = MP - SP; Discount % = (Discount / MP) * 100. Relation: CP * (100 + P%) = MP * (100 - D%).",
      "Ratio & Proportion: If a:b = c:d, then ad = bc. Compounded ratio, duplicate ratio, and alligation/mixture division.",
    ],
    coreConcepts: [
      {
        title: "Percentage Equivalents and Successive Change Formula",
        explanation:
          "Mastering fractional multipliers replaces tedious column division:\n1. Fraction Anchors:\n  - 1/2 = 50% | 1/3 = 33.33% | 1/4 = 25% | 1/5 = 20%\n  - 1/6 = 16.67% | 1/7 = 14.28% | 1/8 = 12.5% | 1/9 = 11.11%\n  - 1/11 = 9.09% | 1/12 = 8.33% | 1/16 = 6.25%.\n2. Multiplier Technique: A 20% increase corresponds to multiplying by (1 + 0.20) = 1.2 or 6/5. A 25% decrease corresponds to multiplying by 0.75 or 3/4.\n3. Net Successive Percentage Change:\n  - For two consecutive percentage changes of a% and b%:\n  - Net % = a + b + (ab / 100)%\n  - For two successive discounts of d1% and d2%: Net Discount = d1 + d2 - (d1 * d2 / 100)%.\n  - Example: Two successive discounts of 20% and 10% = 20 + 10 - 2 = 28% (NOT 30%).",
        keyTakeaways: [
          "Successive change formula: Net % = a + b + (ab / 100)%.",
          "Successive discounts: d1 + d2 - (d1 * d2 / 100)%.",
        ],
        ncertPointer:
          "CUET Quantitative Aptitude, Percentage Foundations & Shortcuts, pp. 338-350.",
      },
      {
        title: "Profit, Loss, Marked Price, and Dishonest Dealer Logic",
        explanation:
          "Every commercial transaction connects Cost Price (CP), Selling Price (SP), and Marked Price (MP):\n1. Base Rules:\n  - Profit % = [(SP - CP) / CP] * 100%\n  - Loss % = [(CP - SP) / CP] * 100%\n  - SP = CP * [(100 ± Gain/Loss %) / 100]\n2. Linking CP, MP, and Discount:\n  - SP = MP * [(100 - Discount %) / 100]\n  - Master Link: CP / MP = (100 - Discount %) / (100 + Profit %).\n3. Dishonest Dealer / False Weights:\n  - If a trader sells goods at cost price but uses a false weight of w grams instead of 1000 grams:\n  - Gain % = [(Error) / (True Value - Error)] * 100% = [(1000 - w) / w] * 100%.\n  - Example: Using 900g instead of 1kg -> Gain = (100 / 900) * 100 = 11.11%.",
        keyTakeaways: [
          "Profit % and Loss % are always calculated on CP.",
          "Discount % is always calculated on Marked Price (MP).",
          "False weight gain % = [Error / False Weight] * 100%.",
        ],
        ncertPointer:
          "CUET Quantitative Aptitude, Commercial Profit & Loss, pp. 352-364.",
      },
      {
        title: "Ratio, Proportion, and Mixture Alligation",
        explanation:
          "Balancing comparisons and combining solutions:\n1. Ratio Properties:\n  - If A:B = 2:3 and B:C = 4:5, combine into A:B:C:\n  - Multiply to equate B: A:B = 8:12, B:C = 12:15 -> A:B:C = 8:12:15.\n2. Proportional Division:\n  - Dividing quantity Q among A, B, C in ratio x:y:z:\n  - Share of A = [x / (x + y + z)] * Q.\n3. Rule of Alligation:\n  - Ratio of quantity of cheaper (q_c) to dearer (q_d) mixed to form mean price (m):\n  - q_c / q_d = (d - m) / (m - c).",
        keyTakeaways: [
          "Equate common terms to combine ratios (A:B and B:C -> A:B:C).",
          "Rule of Alligation: (Cheaper Quantity) / (Dearer Quantity) = (d - m) / (m - c).",
        ],
        ncertPointer:
          "CUET Quantitative Aptitude, Ratios, Partnerships & Alligations, pp. 366-376.",
      },
    ],
    keyFacts: [
      {
        concept: "Successive Discount Formula",
        formulaOrFact: "Net D = d1 + d2 - (d1 * d2 / 100)",
        explanation: "Equivalent single discount replacing two successive discounts.",
        examTip: "High-frequency question in CUET arithmetic.",
      },
      {
        concept: "CP to MP Link",
        formulaOrFact: "MP / CP = (100 + P%) / (100 - D%)",
        explanation: "Directly solves questions where both profit and discount percentages are given.",
        examTip: "Bypasses finding intermediate Selling Price.",
      },
      {
        concept: "False Weight Gain",
        formulaOrFact: "Gain % = [Error / (True Weight - Error)] * 100",
        explanation: "Quantifies dishonest trader profits when selling at claimed cost price.",
        examTip: "Direct substitution formula.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="plGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <filter id="shadowPL" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f8fafc" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#0f172a">Commercial Arithmetic Workflow: CP -> MP -> SP</text>

  <!-- Flowchart Nodes -->
  <!-- CP Box -->
  <g transform="translate(60, 90)" filter="url(#shadowPL)">
    <rect width="130" height="70" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="65" y="32" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0369a1" text-anchor="middle">Cost Price (CP)</text>
    <text x="65" y="52" font-family="system-ui, sans-serif" font-size="10.5" fill="#64748b" text-anchor="middle">100% Base Value</text>
  </g>

  <!-- Markup Arrow -->
  <path d="M 190 115 L 290 80" fill="none" stroke="#059669" stroke-width="2.5" marker-end="url(#arrow)"/>
  <text x="235" y="85" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857" text-anchor="middle">+ Markup %</text>

  <!-- MP Box -->
  <g transform="translate(290, 50)" filter="url(#shadowPL)">
    <rect width="130" height="70" rx="8" fill="#ffffff" stroke="#059669" stroke-width="2"/>
    <text x="65" y="32" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#047857" text-anchor="middle">Marked Price (MP)</text>
    <text x="65" y="52" font-family="system-ui, sans-serif" font-size="10.5" fill="#64748b" text-anchor="middle">List / Sticker Price</text>
  </g>

  <!-- Discount Arrow -->
  <path d="M 420 80 L 510 115" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <text x="470" y="85" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#b91c1c" text-anchor="middle">- Discount %</text>

  <!-- SP Box -->
  <g transform="translate(510, 90)" filter="url(#shadowPL)">
    <rect width="130" height="70" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="2"/>
    <text x="65" y="32" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#6d28d9" text-anchor="middle">Selling Price (SP)</text>
    <text x="65" y="52" font-family="system-ui, sans-serif" font-size="10.5" fill="#64748b" text-anchor="middle">Transaction Price</text>
  </g>

  <!-- Profit/Loss Direct Link -->
  <path d="M 190 145 L 510 145" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="5"/>
  <text x="350" y="165" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1d4ed8" text-anchor="middle">Net Profit = SP - CP | Net Loss = CP - SP (Calculated on CP)</text>

  <!-- Golden Formula Banner -->
  <rect x="60" y="210" width="580" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>
  <text x="350" y="235" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#1e40af" text-anchor="middle">Master Ratio: MP / CP = (100 + Profit %) / (100 - Discount %)</text>
  <text x="350" y="258" font-family="system-ui, sans-serif" font-size="11" fill="#334155" text-anchor="middle">Successive % Change = a + b + (ab / 100)% | Successive Discount = d1 + d2 - (d1×d2 / 100)%</text>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u3-we1",
        questionNumber: 1,
        question:
          "A shopkeeper marks his goods at 40% above the cost price and allows a discount of 25% on the marked price. What is his net profit or loss percentage?",
        options: [
          { id: "A", text: "5% Profit" },
          { id: "B", text: "5% Loss" },
          { id: "C", text: "15% Profit" },
          { id: "D", text: "10% Profit" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Assume Cost Price (CP) = ₹100.",
          "Step 2: Markup is 40% above CP -> Marked Price (MP) = 100 + 40 = ₹140.",
          "Step 3: Discount is 25% on MP -> Discount amount = 25% of 140 = (1/4) * 140 = ₹35.",
          "Step 4: Selling Price (SP) = MP - Discount = 140 - 35 = ₹105.",
          "Step 5: Net Profit = SP - CP = 105 - 100 = ₹5 on CP of ₹100 -> 5% Profit.",
        ],
        cuetInsight:
          "Assuming base CP = 100 simplifies multi-step markup and discount problems into rapid mental arithmetic.",
      },
      {
        id: "general-test-u3-we2",
        questionNumber: 2,
        question:
          "Two vessels A and B contain milk and water in the ratio 4:3 and 2:3 respectively. In what ratio should the contents of both vessels be mixed so that the new mixture contains half milk and half water (1:1)?",
        options: [
          { id: "A", text: "7 : 5" },
          { id: "B", text: "5 : 7" },
          { id: "C", text: "2 : 3" },
          { id: "D", text: "3 : 4" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Focus on the milk concentration in each vessel:\n  - Milk in Vessel A = 4 / (4 + 3) = 4/7.\n  - Milk in Vessel B = 2 / (2 + 3) = 2/5.\n  - Desired milk in final mixture = 1 / (1 + 1) = 1/2.",
          "Step 2: Apply the Rule of Alligation:\n  - Vessel A concentration (c1) = 4/7.\n  - Vessel B concentration (c2) = 2/5.\n  - Mean concentration (m) = 1/2.\n  - (m - c2) = 1/2 - 2/5 = (5 - 4) / 10 = 1/10.\n  - (c1 - m) = 4/7 - 1/2 = (8 - 7) / 14 = 1/14.",
          "Step 3: Ratio of Vessel A to Vessel B = (1/10) : (1/14) = 14 : 10 = 7 : 5.",
        ],
        cuetInsight:
          "Alligation questions on liquid mixtures appear across every year in CUET General Test.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Successive Discount Equivalence",
        frequency: "Very High",
        typicalStem: "A single discount equivalent to two successive discounts of 20% and 15% is:",
        strategy: "Use d1 + d2 - (d1*d2/100) = 20 + 15 - 3 = 32%.",
      },
      {
        patternType: "Dishonest Trader False Weight",
        frequency: "High",
        typicalStem: "A grocer sells sugar at cost price but uses a weight of 950g for 1kg. Find his gain percentage.",
        strategy: "Gain % = (50 / 950) * 100 = 5.26%.",
      },
    ],
    commonTraps: [
      {
        trap: "Calculating discount on cost price",
        whyStudentsFail: "Discount is ALWAYS offered on Marked Price (MP), never on Cost Price.",
        howToAvoid: "Remember: Profit is on CP; Discount is on MP.",
      },
      {
        trap: "Simply adding successive percentages",
        whyStudentsFail: "Thinking successive discounts of 20% and 10% equal 30%.",
        howToAvoid: "Apply 20 + 10 - 2 = 28%.",
      },
    ],
    mnemonics: [
      {
        concept: "Commercial Formula Triad",
        mnemonic: "C-M-S (Cost, Marked, Selling)",
        explanation:
          "Order of flow: Cost Price -> Markup -> Marked Price -> Discount -> Selling Price.",
      },
    ],
    quickRevisionCard: {
      title: "Commercial Math High-Yield Card",
      bulletPoints: [
        "Net % change: a + b + (ab / 100)%.",
        "Successive discounts: d1 + d2 - (d1 * d2 / 100)%.",
        "Profit % = [(SP - CP) / CP] * 100 (Calculated on CP).",
        "Discount % = [(MP - SP) / MP] * 100 (Calculated on MP).",
        "Master Link: MP / CP = (100 + P%) / (100 - D%).",
        "Alligation Rule: Cheaper / Dearer = (Dearer - Mean) / (Mean - Cheaper).",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u3-t1-q1",
        question:
          "A single discount equivalent to two successive discounts of 20% and 10% is:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "30%" },
          { id: "B", text: "28%" },
          { id: "C", text: "25%" },
          { id: "D", text: "18%" },
        ],
        correctOption: "B",
        explanation:
          "Net Discount = d1 + d2 - (d1 * d2 / 100) = 20 + 10 - (20 * 10 / 100) = 30 - 2 = 28%.",
      },
      {
        id: "general-test-u3-t1-q2",
        question:
          "If the cost price of 15 articles is equal to the selling price of 12 articles, find the profit percentage.",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "20%" },
          { id: "B", text: "25%" },
          { id: "C", text: "30%" },
          { id: "D", text: "33.33%" },
        ],
        correctOption: "B",
        explanation:
          "Given: 15 * CP = 12 * SP -> SP / CP = 15 / 12 = 5 / 4.\nProfit % = [(SP - CP) / CP] * 100 = [(5 - 4) / 4] * 100 = (1/4) * 100 = 25%.",
      },
      {
        id: "general-test-u3-t1-q3",
        question:
          "A dishonest shopkeeper sells goods at cost price but uses a weight of 800 grams instead of 1 kilogram. What is his profit percentage?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "20%" },
          { id: "B", text: "25%" },
          { id: "C", text: "15%" },
          { id: "D", text: "22.5%" },
        ],
        correctOption: "B",
        explanation:
          "Error = 1000 - 800 = 200 grams. False weight = 800 grams.\nProfit % = (Error / False Weight) * 100 = (200 / 800) * 100 = (1/4) * 100 = 25%.",
      },
      {
        id: "general-test-u3-t1-q4",
        question:
          "If A : B = 3 : 4 and B : C = 8 : 9, then A : C is equal to:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "1 : 2" },
          { id: "B", text: "2 : 3" },
          { id: "C", text: "3 : 2" },
          { id: "D", text: "4 : 5" },
        ],
        correctOption: "B",
        explanation:
          "A / C = (A / B) * (B / C) = (3 / 4) * (8 / 9) = (3 * 8) / (4 * 9) = 24 / 36 = 2 / 3 -> 2 : 3.",
      },
      {
        id: "general-test-u3-t1-q5",
        question:
          "Assertion (A): If the price of sugar increases by 25%, a family must reduce its consumption by 20% to keep expenditure unchanged.\nReason (R): Percentage reduction in consumption = [r / (100 + r)] * 100% = [25 / 125] * 100% = 20%.",
        type: "assertion-reason",
        difficulty: "medium",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation:
          "Expenditure = Price * Consumption. When price becomes 125/100, consumption must become 100/125 = 4/5, which is a reduction of 1/5 = 20%. Both statements are true and (R) is the exact mathematical proof.",
      },
      {
        id: "general-test-u3-t1-q6",
        question:
          "Match List-I (Fraction) with List-II (Percentage Equivalent):\n(P) 1/8 — 1. 12.5%\n(Q) 1/6 — 2. 16.67%\n(R) 1/7 — 3. 14.28%\n(S) 1/9 — 4. 11.11%",
        type: "match-the-following",
        difficulty: "easy",
        options: [
          { id: "A", text: "P-1, Q-2, R-3, S-4" },
          { id: "B", text: "P-2, Q-1, R-4, S-3" },
          { id: "C", text: "P-1, Q-3, R-2, S-4" },
          { id: "D", text: "P-4, Q-2, R-1, S-3" },
        ],
        correctOption: "A",
        explanation:
          "Standard fraction-to-percentage conversions.",
      },
      {
        id: "general-test-u3-t1-q7",
        question:
          "An item marked at ₹800 is sold for ₹680. What is the rate of discount offered?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "12%" },
          { id: "B", text: "15%" },
          { id: "C", text: "17.5%" },
          { id: "D", text: "20%" },
        ],
        correctOption: "B",
        explanation:
          "Discount amount = 800 - 680 = ₹120.\nDiscount % = (120 / 800) * 100 = 120 / 8 = 15%.",
      },
      {
        id: "general-test-u3-t1-q8",
        question:
          "Divide ₹2,600 among A, B, and C in the ratio 1/2 : 1/3 : 1/4. What is the share of A?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "₹1,200" },
          { id: "B", text: "₹800" },
          { id: "C", text: "₹600" },
          { id: "D", text: "₹1,000" },
        ],
        correctOption: "A",
        explanation:
          "Clear fractions by multiplying by LCM(2, 3, 4) = 12:\nRatio = (12/2) : (12/3) : (12/4) = 6 : 4 : 3.\nSum of ratio parts = 6 + 4 + 3 = 13.\nShare of A = (6 / 13) * 2600 = 6 * 200 = ₹1,200.",
      },
      {
        id: "general-test-u3-t1-q9",
        question:
          "A sum of money is divided among P, Q, and R in the ratio 2 : 7 : 9. If the total of shares of P and R is ₹5,500, what is the share of Q?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "₹3,500" },
          { id: "B", text: "₹4,500" },
          { id: "C", text: "₹2,500" },
          { id: "D", text: "₹3,000" },
        ],
        correctOption: "A",
        explanation:
          "P = 2x, Q = 7x, R = 9x.\nP + R = 2x + 9x = 11x = 5500 -> x = 500.\nShare of Q = 7x = 7 * 500 = ₹3,500.",
      },
      {
        id: "general-test-u3-t1-q10",
        question:
          "By selling an article for ₹1,440, a trader loses 10%. At what price should he sell it to gain 15%?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "₹1,600" },
          { id: "B", text: "₹1,840" },
          { id: "C", text: "₹1,750" },
          { id: "D", text: "₹1,900" },
        ],
        correctOption: "B",
        explanation:
          "SP = 90% of CP = 1440 -> CP = 1440 / 0.9 = ₹1,600.\nTarget SP for 15% gain = 1.15 * 1600 = 1600 + 240 = ₹1,840.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["average-work-and-time-speed-and-distance", "simple-and-compound-interest"],
      practiceTestId: "practice-general-test-unit3-test1",
      practiceTestUrl: "/test/practice-general-test-unit3-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 3 - TOPIC 2: Average, Work & Time, Speed & Distance
  {
    id: "general-test-unit3-average-work-and-time-speed-and-distance",
    slug: "average-work-and-time-speed-and-distance",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 3,
    unitTitle: "Quantitative Reasoning & Arithmetic",
    topicTitle: "Average, Work & Time, Speed & Distance",
    ncertReference: {
      book: "CUET General Test / Quantitative Aptitude & Arithmetic",
      chapter: "Section 11: Rate Problems, LCM Efficiency & Relative Velocities",
      pages: "Pages 377-414",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 118,
      weightagePercentage: 16.5,
    },
    thirtySecondSummary: [
      "Rate-based arithmetic connects three major pillars: Averages (mean, weighted average, inclusion/replacement), Time & Work (LCM efficiency method, pipes & cisterns), and Speed, Time & Distance (relative speed, trains, boats & streams).",
      "Average Formula: Average = (Sum of observations) / (Number of observations). When an old member is replaced: New Age = Old Age + (Change in Average * Total Count).",
      "Time & Work LCM Method: Total Work = LCM of individual times. Individual efficiency = Total Work / Individual time. Time together = Total Work / Combined efficiency.",
      "Speed, Time & Distance: Speed = Distance / Time. Conversion factor: km/h to m/s = Multiply by 5/18; m/s to km/h = Multiply by 18/5.",
      "Average Speed: For two equal distances traveled at speeds u and v: Average Speed = 2uv / (u + v).",
      "Relative Speed: Opposite directions = Add speeds (u + v); Same direction = Subtract speeds (u - v).",
    ],
    coreConcepts: [
      {
        title: "Averages: Weighted Average and Inclusion/Replacement Shortcuts",
        explanation:
          "Formulas for computing means and handling shifts in group compositions:\n1. Weighted Average: When group 1 of size n1 has average A1 and group 2 of size n2 has average A2:\n  - Combined Average A = (n1*A1 + n2*A2) / (n1 + n2).\n2. Inclusion Shortcut:\n  - When a new person joins a group of n members and increases the average by Δ:\n  - New Member Value = Old Average + (n + 1) * Δ.\n3. Replacement Shortcut:\n  - When a member of weight W_old is replaced by a new person, changing average of n members by Δ:\n  - W_new = W_old ± (n * Δ).",
        keyTakeaways: [
          "Replacement formula: New = Old ± (Total Count * Change in Average).",
          "Weighted average combines distinct groups proportionally.",
        ],
        ncertPointer:
          "CUET Quantitative Aptitude, Averages & Weighted Means, pp. 378-388.",
      },
      {
        title: "Time & Work and Pipes & Cisterns (The LCM Efficiency Technique)",
        explanation:
          "The fastest method to solve Time & Work without fractions:\n1. LCM Efficiency Method:\n  - If A completes work in 10 days and B in 15 days:\n  - Assume Total Work = LCM(10, 15) = 30 units.\n  - Daily work of A (Efficiency) = 30 / 10 = 3 units/day.\n  - Daily work of B (Efficiency) = 30 / 15 = 2 units/day.\n  - Combined Efficiency = 3 + 2 = 5 units/day.\n  - Time taken together = 30 / 5 = 6 days.\n2. Work & Wages: Wages are divided in the ratio of work done (which equals ratio of efficiencies if time is equal).\n3. Pipes & Cisterns:\n  - Inlet pipes contribute positive efficiency (+units/hr); Outlet/leak pipes contribute negative efficiency (-units/hr).",
        keyTakeaways: [
          "Always assume Total Work = LCM of individual days.",
          "Time Together = Total Work / Sum of Efficiencies.",
          "Leaks/drainage subtract from total efficiency.",
        ],
        ncertPointer:
          "CUET Reasoning & Math Guide, Work, Efficiency & Pipes, pp. 390-402.",
      },
      {
        title: "Speed, Time & Distance: Trains and Boats & Streams",
        explanation:
          "Motion under relative frames of reference:\n1. Unit Conversion:\n  - 1 km/h = 1000m / 3600s = 5/18 m/s.\n  - To convert km/h to m/s: multiply by 5/18. To convert m/s to km/h: multiply by 18/5.\n2. Average Speed:\n  - Total Distance / Total Time.\n  - If two equal distances are traveled at speeds x and y: Avg Speed = 2xy / (x + y).\n3. Train Crossing Models:\n  - Crossing a point/pole: Distance = Length of train (L_t).\n  - Crossing a platform/bridge: Distance = L_t + Length of platform (L_p).\n4. Boats and Streams:\n  - Speed of boat in still water = u; Speed of stream = v.\n  - Downstream Speed (D) = u + v\n  - Upstream Speed (U) = u - v\n  - Boat speed u = (D + U) / 2; Stream speed v = (D - U) / 2.",
        keyTakeaways: [
          "km/h * (5/18) = m/s.",
          "Average Speed for equal halves = 2xy / (x + y).",
          "Boat speed u = (D + U)/2; Stream speed v = (D - U)/2.",
        ],
        ncertPointer:
          "CUET Quantitative Aptitude, Kinematics & Relative Velocity, pp. 404-414.",
      },
    ],
    keyFacts: [
      {
        concept: "5/18 Conversion Factor",
        formulaOrFact: "1 km/h = 5/18 m/s",
        explanation: "Derived from 1,000 meters / 3,600 seconds.",
        examTip: "Essential step in every train-crossing question.",
      },
      {
        concept: "Harmonic Mean Average Speed",
        formulaOrFact: "Avg Speed = 2uv / (u + v)",
        explanation: "Valid strictly when two equal distances are traveled at speeds u and v.",
        examTip: "Do not take arithmetic mean (u + v)/2.",
      },
      {
        concept: "Boat & Stream Speed",
        formulaOrFact: "u = (Downstream + Upstream) / 2",
        explanation: "Finds still-water boat speed instantly from downstream and upstream speeds.",
        examTip: "Stream speed is (Downstream - Upstream) / 2.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="rateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <filter id="shadowRate" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f0fdf4" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#064e3b">Rate & Motion Triangle: Work, Time, Speed & Distance</text>

  <!-- Left: Work LCM Method -->
  <g transform="translate(45, 60)" filter="url(#shadowRate)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#a7f3d0" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="url(#rateGrad)"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Time & Work LCM Method</text>
    
    <text x="20" y="68" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Total Work = LCM(Time_A, Time_B)</text>
    <text x="20" y="94" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Daily Efficiency:</text>
    <text x="30" y="112" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Eff_A = Total Work / Days_A</text>
    <text x="30" y="128" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Eff_B = Total Work / Days_B</text>

    <text x="20" y="156" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Combined Time:</text>
    <rect x="25" y="166" width="235" height="30" rx="4" fill="#ecfdf5" stroke="#6ee7b7"/>
    <text x="142" y="186" font-family="monospace" font-size="11" font-weight="700" fill="#047857" text-anchor="middle">Time = Total Work / (Eff_A + Eff_B)</text>
    
    <text x="20" y="218" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">• Pipes: Inlets (+), Outlets (-)</text>
  </g>

  <!-- Right: Speed, Distance & Relatives -->
  <g transform="translate(370, 60)" filter="url(#shadowRate)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#a7f3d0" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="#065f46"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Speed, Time & Relative Motion</text>
    
    <text x="20" y="68" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Unit Conversion:</text>
    <text x="30" y="86" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">km/h × (5/18) = m/s | m/s × (18/5) = km/h</text>
    
    <text x="20" y="112" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Average Speed (Equal Halves):</text>
    <text x="30" y="130" font-family="monospace" font-size="11" font-weight="700" fill="#047857">Avg Speed = 2uv / (u + v)</text>

    <text x="20" y="156" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Boats & Streams:</text>
    <text x="30" y="174" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Downstream (D) = u + v</text>
    <text x="30" y="190" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Upstream (U) = u - v</text>
    <text x="30" y="208" font-family="system-ui, sans-serif" font-size="10.5" fill="#047857">Boat u = (D + U)/2 | Stream v = (D - U)/2</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u3-we3",
        questionNumber: 1,
        question:
          "A and B can do a piece of work in 12 days and 18 days respectively. They worked together for 4 days, after which A left. In how many more days will B finish the remaining work alone?",
        options: [
          { id: "A", text: "6 days" },
          { id: "B", text: "8 days" },
          { id: "C", text: "10 days" },
          { id: "D", text: "12 days" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Determine Total Work = LCM(12, 18) = 36 units.",
          "Step 2: Calculate daily efficiencies:\n  - Efficiency of A = 36 / 12 = 3 units/day.\n  - Efficiency of B = 36 / 18 = 2 units/day.\n  - Combined efficiency (A + B) = 3 + 2 = 5 units/day.",
          "Step 3: Work done in the first 4 days = 4 * 5 = 20 units.",
          "Step 4: Remaining work = 36 - 20 = 16 units.",
          "Step 5: Time taken by B alone to finish remaining work = 16 / 2 = 8 days.",
        ],
        cuetInsight:
          "LCM eliminates all fractional arithmetic, making Time & Work questions error-free.",
      },
      {
        id: "general-test-u3-we4",
        questionNumber: 2,
        question:
          "A train 150 meters long is running at a speed of 54 km/h. How many seconds will it take to pass a bridge 250 meters long?",
        options: [
          { id: "A", text: "20 seconds" },
          { id: "B", text: "24 seconds" },
          { id: "C", text: "26.67 seconds" },
          { id: "D", text: "30 seconds" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Total distance to be covered = Length of Train + Length of Bridge = 150 + 250 = 400 meters.",
          "Step 2: Convert speed from km/h to m/s:\n  - Speed = 54 * (5/18) = 3 * 5 = 15 m/s.",
          "Step 3: Time taken = Total Distance / Speed = 400 / 15 = 80 / 3 = 26.67 seconds.",
        ],
        cuetInsight:
          "Always add platform/bridge length to train length; never omit train's own physical length.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Average Speed for Return Trip",
        frequency: "Very High",
        typicalStem: "A car goes from Delhi to Agra at 60 km/h and returns at 40 km/h. What is its average speed for the whole journey?",
        strategy: "Use 2uv / (u + v) = 2*60*40 / 100 = 48 km/h (NOT 50 km/h).",
      },
      {
        patternType: "Replacement in Average",
        frequency: "High",
        typicalStem: "The average age of 24 students increases by 1 year when the teacher's age is included...",
        strategy: "Use Teacher = Old Average + (Total new count * Δ).",
      },
    ],
    commonTraps: [
      {
        trap: "Arithmetic average for speeds",
        whyStudentsFail: "Averaging 60 and 40 as (60 + 40)/2 = 50 km/h.",
        howToAvoid: "Average speed is time-weighted harmonic mean: 2*60*40 / 100 = 48 km/h.",
      },
      {
        trap: "Forgetting to convert km/h to m/s",
        whyStudentsFail: "Dividing distance in meters by speed in km/h directly.",
        howToAvoid: "Multiply km/h by 5/18 before dividing.",
      },
    ],
    mnemonics: [
      {
        concept: "km/h to m/s conversion",
        mnemonic: "Big to Small -> Multiply by Small (5/18)",
        explanation:
          "km/h is bigger than m/s, so multiply by the smaller fraction (5/18 < 1). m/s to km/h multiply by larger (18/5 > 1).",
      },
    ],
    quickRevisionCard: {
      title: "Rate Arithmetic High-Yield Points",
      bulletPoints: [
        "Time & Work: Total Work = LCM of times; Time = Work / Combined Efficiency.",
        "Average Speed = 2uv / (u + v) for equal distances.",
        "km/h to m/s = Multiply by 5/18; m/s to km/h = Multiply by 18/5.",
        "Trains crossing bridge/platform: Distance = L_train + L_bridge.",
        "Relative Speed: Opposite directions (+), Same direction (-).",
        "Boats: Boat speed = (Downstream + Upstream)/2; Stream = (Downstream - Upstream)/2.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u3-t2-q1",
        question:
          "A motorist travels from Town A to Town B at 60 km/h and returns at 40 km/h. What is his average speed for the entire round trip?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "50 km/h" },
          { id: "B", text: "48 km/h" },
          { id: "C", text: "45 km/h" },
          { id: "D", text: "52 km/h" },
        ],
        correctOption: "B",
        explanation:
          "Average Speed = 2uv / (u + v) = 2 * 60 * 40 / (60 + 40) = 4800 / 100 = 48 km/h.",
      },
      {
        id: "general-test-u3-t2-q2",
        question:
          "A can finish a work in 15 days and B in 20 days. If they work together on it for 4 days, then the fraction of the work that is left is:",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "7/15" },
          { id: "B", text: "8/15" },
          { id: "C", text: "1/4" },
          { id: "D", text: "1/10" },
        ],
        correctOption: "B",
        explanation:
          "Total work = LCM(15, 20) = 60 units.\nEfficiency of A = 4 units/day; Efficiency of B = 3 units/day.\nTogether in 4 days = 4 * (4 + 3) = 28 units.\nWork left = 60 - 28 = 32 units.\nFraction left = 32 / 60 = 8 / 15.",
      },
      {
        id: "general-test-u3-t2-q3",
        question:
          "A man can row upstream at 8 km/h and downstream at 14 km/h. What is the speed of the man in still water and the rate of current?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "11 km/h and 3 km/h" },
          { id: "B", text: "10 km/h and 4 km/h" },
          { id: "C", text: "12 km/h and 2 km/h" },
          { id: "D", text: "9 km/h and 5 km/h" },
        ],
        correctOption: "A",
        explanation:
          "Speed in still water = (Downstream + Upstream) / 2 = (14 + 8) / 2 = 11 km/h.\nRate of current = (Downstream - Upstream) / 2 = (14 - 8) / 2 = 3 km/h.",
      },
      {
        id: "general-test-u3-t2-q4",
        question:
          "The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What is the weight of the new person?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "75 kg" },
          { id: "B", text: "80 kg" },
          { id: "C", text: "85 kg" },
          { id: "D", text: "90 kg" },
        ],
        correctOption: "C",
        explanation:
          "Total increase in weight = 8 * 2.5 = 20 kg.\nWeight of new person = Replaced weight + Total increase = 65 + 20 = 85 kg.",
      },
      {
        id: "general-test-u3-t2-q5",
        question:
          "Assertion (A): Two trains of lengths 100m and 150m moving in opposite directions at 36 km/h and 54 km/h cross each other in 10 seconds.\nReason (R): Relative speed in opposite directions = 36 + 54 = 90 km/h = 90 * (5/18) = 25 m/s. Total distance = 100 + 150 = 250m. Time = 250 / 25 = 10 seconds.",
        type: "assertion-reason",
        difficulty: "medium",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation:
          "Relative speed adds in opposite directions: 25 m/s. Total distance to cross is the sum of both train lengths: 250m. Time = 250 / 25 = 10s. Both are true and (R) explains (A).",
      },
      {
        id: "general-test-u3-t2-q6",
        question:
          "Match List-I (Speed in km/h) with List-II (Speed in m/s):\n(P) 36 km/h — 1. 10 m/s\n(Q) 54 km/h — 2. 15 m/s\n(R) 72 km/h — 3. 20 m/s\n(S) 90 km/h — 4. 25 m/s",
        type: "match-the-following",
        difficulty: "easy",
        options: [
          { id: "A", text: "P-1, Q-2, R-3, S-4" },
          { id: "B", text: "P-2, Q-1, R-4, S-3" },
          { id: "C", text: "P-1, Q-3, R-2, S-4" },
          { id: "D", text: "P-4, Q-2, R-1, S-3" },
        ],
        correctOption: "A",
        explanation:
          "Multiplying by 5/18: 36*(5/18)=10; 54*(5/18)=15; 72*(5/18)=20; 90*(5/18)=25.",
      },
      {
        id: "general-test-u3-t2-q7",
        question:
          "Two pipes A and B can fill a tank in 20 minutes and 30 minutes respectively. If both pipes are opened together, the time taken to fill the tank is:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "10 minutes" },
          { id: "B", text: "12 minutes" },
          { id: "C", text: "15 minutes" },
          { id: "D", text: "25 minutes" },
        ],
        correctOption: "B",
        explanation:
          "Total capacity = LCM(20, 30) = 60 units.\nEfficiency of A = 3 units/min; Efficiency of B = 2 units/min.\nCombined efficiency = 3 + 2 = 5 units/min.\nTime = 60 / 5 = 12 minutes.",
      },
      {
        id: "general-test-u3-t2-q8",
        question:
          "The average of five consecutive numbers is 27. What is the largest of these numbers?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "28" },
          { id: "B", text: "29" },
          { id: "C", text: "30" },
          { id: "D", text: "31" },
        ],
        correctOption: "B",
        explanation:
          "For an odd count of consecutive numbers, the average is the middle number.\nMiddle number (3rd) = 27.\nNumbers are 25, 26, 27, 28, 29.\nThe largest number is 29.",
      },
      {
        id: "general-test-u3-t2-q9",
        question:
          "A person walks at 4 km/h instead of 3 km/h and covers 2 km more in the same time. What was the actual distance traveled at 3 km/h?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "6 km" },
          { id: "B", text: "8 km" },
          { id: "C", text: "10 km" },
          { id: "D", text: "12 km" },
        ],
        correctOption: "A",
        explanation:
          "Let time be t hours. Distance at 4 km/h = 4t. Distance at 3 km/h = 3t.\n4t - 3t = 2 km -> t = 2 hours.\nActual distance traveled at 3 km/h = 3 * 2 = 6 km.",
      },
      {
        id: "general-test-u3-t2-q10",
        question:
          "A and B can complete a task together in 10 days. A alone can do it in 15 days. In how many days can B alone complete the task?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "20 days" },
          { id: "B", text: "25 days" },
          { id: "C", text: "30 days" },
          { id: "D", text: "35 days" },
        ],
        correctOption: "C",
        explanation:
          "Total work = LCM(10, 15) = 30 units.\nEfficiency of (A + B) = 3 units/day. Efficiency of A = 2 units/day.\nEfficiency of B = 3 - 2 = 1 unit/day.\nTime taken by B alone = 30 / 1 = 30 days.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["percentages-profit-and-loss-ratio-and-proportion", "simple-and-compound-interest"],
      practiceTestId: "practice-general-test-unit3-test1",
      practiceTestUrl: "/test/practice-general-test-unit3-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 3 - TOPIC 3: Simple & Compound Interest
  {
    id: "general-test-unit3-simple-and-compound-interest",
    slug: "simple-and-compound-interest",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 3,
    unitTitle: "Quantitative Reasoning & Arithmetic",
    topicTitle: "Simple & Compound Interest",
    ncertReference: {
      book: "CUET General Test / Quantitative Aptitude & Arithmetic",
      chapter: "Section 12: Financial Mathematics, Annual Accruals & CI-SI Differentials",
      pages: "Pages 415-448",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 106,
      weightagePercentage: 14.8,
    },
    thirtySecondSummary: [
      "Interest calculations quantify the time value of money under linear accrual (Simple Interest) and exponential accrual (Compound Interest).",
      "Simple Interest (SI): SI = (P * R * T) / 100. Total Amount A = P + SI. Interest earned remains strictly identical every year because it is computed solely on the initial Principal.",
      "Compound Interest (CI): Amount A = P * [1 + (R / 100)]^T. CI = A - P. Interest earns interest recursively.",
      "Compounding Frequencies: Half-yearly -> Rate = R/2, Time = 2T; Quarterly -> Rate = R/4, Time = 4T.",
      "Golden Difference Formulas: For 2 years: CI - SI = P * (R / 100)^2. For 3 years: CI - SI = P * (R / 100)^2 * [(300 + R) / 100].",
      "Doubling Rule (Rule of 72): Time to double under compound interest ≈ 72 / R years.",
    ],
    coreConcepts: [
      {
        title: "Simple Interest Mechanics and Sum Doubling Rules",
        explanation:
          "Under Simple Interest, capital grows linearly:\n1. Standard Formula: SI = (P * R * T) / 100; Total Amount A = P * [1 + (R * T / 100)].\n2. Sum Multiples (n-folding):\n  - If a sum becomes n times itself in T years:\n  - SI earned = (n - 1) * P\n  - Therefore: R * T = (n - 1) * 100.\n  - Example: A sum doubles itself (n=2) in 5 years -> R * 5 = (2 - 1) * 100 = 100 -> R = 20% per annum.\n  - Example: To become 4 times (n=4) at same rate: R * T2 = (4 - 1) * 100 = 300 -> 20 * T2 = 300 -> T2 = 15 years.",
        keyTakeaways: [
          "SI remains constant every year: SI_1 = SI_2 = SI_3.",
          "Formula for sum becoming n times: R * T = (n - 1) * 100.",
        ],
        ncertPointer:
          "CUET Quantitative Aptitude, Simple Interest & Multipliers, pp. 416-426.",
      },
      {
        title: "Compound Interest and Fractional/Sub-Annual Compounding",
        explanation:
          "Compound Interest reflects exponential capital reinvestment:\n1. Standard Annual Compounding: A = P * (1 + R/100)^T; CI = P * [(1 + R/100)^T - 1].\n2. Sub-Annual Compounding Periods:\n  - Semi-Annually (Half-Yearly): Rate becomes R/2, number of periods becomes 2T: A = P * [1 + R / (2 * 100)]^(2T).\n  - Quarterly: Rate becomes R/4, number of periods becomes 4T: A = P * [1 + R / (4 * 100)]^(4T).\n3. Fractional Years (e.g., T = 2 years and 3 months = 2 1/4 years):\n  - A = P * (1 + R/100)^2 * [1 + (1/4 * R) / 100].",
        keyTakeaways: [
          "Half-yearly compounding: R -> R/2, T -> 2T.",
          "Quarterly compounding: R -> R/4, T -> 4T.",
        ],
        ncertPointer:
          "CUET Quantitative Aptitude, Compound Interest & Annuities, pp. 428-438.",
      },
      {
        title: "The CI - SI Difference Master Shortcuts",
        explanation:
          "Questions comparing CI and SI over 2 and 3 years are perennial CUET staples:\n1. For T = 2 Years:\n  - First year: CI_1 = SI_1 (both equal P * R / 100).\n  - Second year: CI_2 exceeds SI_2 by the interest earned on the 1st year's interest: (SI_1 * R / 100) = P * (R / 100)^2.\n  - Difference D_2 = P * (R / 100)^2.\n2. For T = 3 Years:\n  - D_3 = P * (R / 100)^2 * [(300 + R) / 100] = D_2 * [(300 + R) / 100].\n  - This identity saves 3-4 minutes of calculation in 3-year difference problems.",
        keyTakeaways: [
          "2-Year Difference: D_2 = P * (R / 100)^2.",
          "3-Year Difference: D_3 = P * (R / 100)^2 * [(300 + R) / 100].",
        ],
        ncertPointer:
          "CUET Quantitative Aptitude, CI-SI Differential Shortcuts, pp. 440-448.",
      },
    ],
    keyFacts: [
      {
        concept: "2-Year CI-SI Difference",
        formulaOrFact: "D_2 = P * (R / 100)^2",
        explanation: "Equals interest on the first year's interest.",
        examTip: "Given D and R, find P = D * (100 / R)^2 instantly.",
      },
      {
        concept: "3-Year CI-SI Difference",
        formulaOrFact: "D_3 = P * (R / 100)^2 * [(300 + R) / 100]",
        explanation: "Direct formula avoiding cubic expansion.",
        examTip: "High-frequency question in hard-difficulty slots.",
      },
      {
        concept: "SI n-fold Multiplier",
        formulaOrFact: "R * T = (n - 1) * 100",
        explanation: "Finds time or rate for a principal to become n times itself.",
        examTip: "For doubling, n=2 -> RT = 100; for tripling, n=3 -> RT = 200.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="intGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <filter id="shadowInt" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#fffbeb" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#78350f">Simple vs Compound Interest Comparative Accrual</text>

  <!-- Left: Simple Interest Linear -->
  <g transform="translate(45, 60)" filter="url(#shadowInt)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#fde68a" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="url(#intGrad)"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Simple Interest (Linear Accrual)</text>
    
    <text x="20" y="68" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#92400e">• Core Formula: SI = (P × R × T) / 100</text>
    <text x="20" y="94" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#92400e">• Constant Annual Yield:</text>
    <text x="30" y="112" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Year 1 = PR/100 | Year 2 = PR/100</text>
    
    <text x="20" y="140" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#92400e">• Sum Multiples Rule:</text>
    <rect x="25" y="152" width="235" height="32" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
    <text x="142" y="172" font-family="monospace" font-size="11.5" font-weight="700" fill="#b45309" text-anchor="middle">R × T = (n - 1) × 100</text>

    <text x="20" y="210" font-family="system-ui, sans-serif" font-size="10.5" fill="#64748b">Doubles (n=2): RT = 100</text>
    <text x="20" y="226" font-family="system-ui, sans-serif" font-size="10.5" fill="#64748b">Triples (n=3): RT = 200</text>
  </g>

  <!-- Right: Compound Interest & Difference -->
  <g transform="translate(370, 60)" filter="url(#shadowInt)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#fde68a" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="#78350f"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Compound Interest & Differences</text>
    
    <text x="20" y="68" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#78350f">• Core Formula: A = P(1 + R/100)^T</text>
    <text x="20" y="94" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#78350f">• 2-Year Difference (CI - SI):</text>
    <rect x="25" y="104" width="235" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
    <text x="142" y="124" font-family="monospace" font-size="12" font-weight="700" fill="#b45309" text-anchor="middle">D_2 = P × (R / 100)^2</text>

    <text x="20" y="156" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#78350f">• 3-Year Difference (CI - SI):</text>
    <rect x="25" y="166" width="235" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
    <text x="142" y="186" font-family="monospace" font-size="10.5" font-weight="700" fill="#b45309" text-anchor="middle">D_3 = D_2 × (300 + R) / 100</text>

    <text x="20" y="218" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Half-yearly: R -> R/2, Time -> 2T</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u3-we5",
        questionNumber: 1,
        question:
          "The difference between compound interest and simple interest on a certain sum of money at 10% per annum for 2 years is ₹65. What is the principal sum?",
        options: [
          { id: "A", text: "₹6,000" },
          { id: "B", text: "₹6,500" },
          { id: "C", text: "₹7,000" },
          { id: "D", text: "₹7,500" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Use the 2-Year Difference Shortcut:\n  - D_2 = P * (R / 100)^2.",
          "Step 2: Plug in given values: D_2 = 65, R = 10%.\n  - 65 = P * (10 / 100)^2 = P * (1 / 10)^2 = P * (1 / 100).",
          "Step 3: Solve for P:\n  - P = 65 * 100 = ₹6,500.",
        ],
        cuetInsight:
          "Applying the 2-year difference formula yields the answer in under 15 seconds.",
      },
      {
        id: "general-test-u3-we6",
        questionNumber: 2,
        question:
          "A sum of money invested at simple interest doubles itself in 8 years. In how many years will it become 4 times itself at the same rate of interest?",
        options: [
          { id: "A", text: "16 years" },
          { id: "B", text: "20 years" },
          { id: "C", text: "24 years" },
          { id: "D", text: "32 years" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Under Simple Interest, use R * T = (n - 1) * 100.\n  - Case 1 (doubles -> n=2): R * 8 = (2 - 1) * 100 = 100 -> R = 100 / 8 = 12.5% per annum.",
          "Step 2: Case 2 (becomes 4 times -> n=4):\n  - R * T2 = (4 - 1) * 100 = 300.",
          "Step 3: Substitute R = 12.5%:\n  - 12.5 * T2 = 300 -> T2 = 300 / 12.5 = 24 years.",
        ],
        cuetInsight:
          "Notice that tripling or quadrupling under SI is linear, not geometric (24 years, NOT 16 or 32).",
      },
    ],
    howCuetAsks: [
      {
        patternType: "2-Year Difference Formula",
        frequency: "Very High",
        typicalStem: "If the difference between CI and SI on a sum at 5% per annum for 2 years is ₹25, find the sum.",
        strategy: "Use P = D * (100 / R)^2 = 25 * (20)^2 = 25 * 400 = ₹10,000.",
      },
      {
        patternType: "Half-Yearly Compounding Rate Shift",
        frequency: "High",
        typicalStem: "Find the compound interest on ₹10,000 for 1 year at 20% per annum compounded half-yearly.",
        strategy: "Rate = 10%, Time = 2 periods -> A = 10,000 * (1.10)^2 = ₹12,100 -> CI = ₹2,100.",
      },
    ],
    commonTraps: [
      {
        trap: "Confusing SI sum doubling with CI sum doubling",
        whyStudentsFail: "Under CI, if sum doubles in 8 years, it becomes 4 times in 16 years (2^2); under SI, it takes 24 years.",
        howToAvoid: "Check whether question specifies 'at simple interest' or 'at compound interest'.",
      },
      {
        trap: "Omitting the half-yearly rate division",
        whyStudentsFail: "Keeping R = 20% instead of dividing by 2 to get 10%.",
        howToAvoid: "For half-yearly: ALWAYS halve the rate and double the years immediately.",
      },
    ],
    mnemonics: [
      {
        concept: "Half-Yearly Adjustment",
        mnemonic: "H-D (Halve Rate, Double Time)",
        explanation:
          "Halve the rate, Double the number of periods.",
      },
    ],
    quickRevisionCard: {
      title: "Interest Essentials High-Yield Card",
      bulletPoints: [
        "Simple Interest: SI = (P * R * T) / 100.",
        "SI Multiplier: R * T = (n - 1) * 100.",
        "Compound Interest: A = P(1 + R/100)^T.",
        "Half-yearly: R' = R/2, T' = 2T; Quarterly: R' = R/4, T' = 4T.",
        "2-Year Difference: D_2 = P * (R / 100)^2.",
        "3-Year Difference: D_3 = D_2 * [(300 + R) / 100].",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u3-t3-q1",
        question:
          "What will be the compound interest on ₹8,000 at 5% per annum for 2 years, compounded annually?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "₹800" },
          { id: "B", text: "₹820" },
          { id: "C", text: "₹840" },
          { id: "D", text: "₹850" },
        ],
        correctOption: "B",
        explanation:
          "Amount = 8000 * (1 + 5/100)^2 = 8000 * (21/20) * (21/20) = 8000 * (441 / 400) = 20 * 441 = ₹8,820.\nCompound Interest = 8,820 - 8,000 = ₹820.",
      },
      {
        id: "general-test-u3-t3-q2",
        question:
          "The difference between simple and compound interest on ₹5,000 for 2 years at 8% per annum is:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "₹32" },
          { id: "B", text: "₹36" },
          { id: "C", text: "₹40" },
          { id: "D", text: "₹48" },
        ],
        correctOption: "A",
        explanation:
          "Difference D_2 = P * (R / 100)^2 = 5000 * (8 / 100)^2 = 5000 * (64 / 10000) = 64 / 2 = ₹32.",
      },
      {
        id: "general-test-u3-t3-q3",
        question:
          "At what rate of simple interest per annum will a sum of money triple itself in 10 years?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "15%" },
          { id: "B", text: "20%" },
          { id: "C", text: "25%" },
          { id: "D", text: "30%" },
        ],
        correctOption: "B",
        explanation:
          "Using R * T = (n - 1) * 100:\nHere n = 3, T = 10 -> R * 10 = (3 - 1) * 100 = 200 -> R = 20% per annum.",
      },
      {
        id: "general-test-u3-t3-q4",
        question:
          "A sum of ₹12,000 deposited at compound interest becomes double after 5 years. How much will it become after 20 years?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "₹48,000" },
          { id: "B", text: "₹96,000" },
          { id: "C", text: "₹1,44,000" },
          { id: "D", text: "₹1,92,000" },
        ],
        correctOption: "D",
        explanation:
          "Under compound interest, growth is exponential. 20 years = 4 cycles of 5 years (20 / 5 = 4).\nThe sum doubles in each cycle -> After 4 cycles, it becomes 2^4 = 16 times the original principal.\nFinal Amount = 16 * 12,000 = ₹1,92,000.",
      },
      {
        id: "general-test-u3-t3-q5",
        question:
          "Assertion (A): For the first year on an annual compounding scheme, Simple Interest and Compound Interest on the same principal at the same rate are identical.\nReason (R): In the first year, interest is calculated solely on the principal sum in both cases, as no prior interest has accrued.",
        type: "assertion-reason",
        difficulty: "easy",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation:
          "Both statements are true and (R) provides the exact reason why SI and CI are equal for Year 1 under annual compounding.",
      },
      {
        id: "general-test-u3-t3-q6",
        question:
          "Match List-I (Term) with List-II (Formula):\n(P) Simple Interest — 1. (P * R * T) / 100\n(Q) 2-Year CI-SI Difference — 2. P * (R / 100)^2\n(R) Compound Amount (Annual) — 3. P * (1 + R/100)^T\n(S) Sum Tripling under SI — 4. R * T = 200",
        type: "match-the-following",
        difficulty: "easy",
        options: [
          { id: "A", text: "P-1, Q-2, R-3, S-4" },
          { id: "B", text: "P-2, Q-1, R-4, S-3" },
          { id: "C", text: "P-1, Q-3, R-2, S-4" },
          { id: "D", text: "P-4, Q-2, R-1, S-3" },
        ],
        correctOption: "A",
        explanation:
          "Standard formulas in interest mathematics.",
      },
      {
        id: "general-test-u3-t3-q7",
        question:
          "Find the compound interest on ₹10,000 for 1 year at 20% per annum, compounded half-yearly.",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "₹2,000" },
          { id: "B", text: "₹2,100" },
          { id: "C", text: "₹2,200" },
          { id: "D", text: "₹2,400" },
        ],
        correctOption: "B",
        explanation:
          "Half-yearly: Rate = 20/2 = 10%; Time = 1 * 2 = 2 periods.\nAmount = 10,000 * (1 + 10/100)^2 = 10,000 * 1.21 = ₹12,100.\nCI = 12,100 - 10,000 = ₹2,100.",
      },
      {
        id: "general-test-u3-t3-q8",
        question:
          "A sum of ₹1,600 gives a simple interest of ₹252 in 2 years and 3 months. The rate of interest per annum is:",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "6%" },
          { id: "B", text: "7%" },
          { id: "C", text: "8%" },
          { id: "D", text: "9%" },
        ],
        correctOption: "B",
        explanation:
          "Time T = 2 years 3 months = 2 + 3/12 = 2 + 1/4 = 9/4 years.\nSI = (P * R * T) / 100 -> 252 = (1600 * R * (9/4)) / 100 = 16 * R * (9/4) = 4 * 9 * R = 36 * R.\nR = 252 / 36 = 7% per annum.",
      },
      {
        id: "general-test-u3-t3-q9",
        question:
          "The simple interest on a certain sum of money for 3 years at 8% per annum is ₹1,200. What would be the compound interest on the same sum at the same rate and for the same period?",
        type: "standard",
        difficulty: "hard",
        options: [
          { id: "A", text: "₹1,298.56" },
          { id: "B", text: "₹1,324.60" },
          { id: "C", text: "₹1,280.00" },
          { id: "D", text: "₹1,350.25" },
        ],
        correctOption: "A",
        explanation:
          "SI = (P * R * T) / 100 -> 1200 = (P * 8 * 3) / 100 -> P = (1200 * 100) / 24 = ₹5,000.\nCompound Amount for 3 years at 8%:\nA = 5000 * (1.08)^3 = 5000 * 1.259712 = ₹6,298.56.\nCI = 6,298.56 - 5,000 = ₹1,298.56.",
      },
      {
        id: "general-test-u3-t3-q10",
        question:
          "A sum invested at 5% simple interest per annum grows to ₹520 in 5 years and to ₹568 in 7 years. What is the principal sum?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "₹400" },
          { id: "B", text: "₹420" },
          { id: "C", text: "₹450" },
          { id: "D", text: "₹380" },
        ],
        correctOption: "A",
        explanation:
          "Interest earned in 2 years (from year 5 to year 7) = 568 - 520 = ₹48.\nInterest per year = 48 / 2 = ₹24.\nInterest for 5 years = 5 * 24 = ₹120.\nPrincipal = Amount at 5 years - 5 years interest = 520 - 120 = ₹400.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["percentages-profit-and-loss-ratio-and-proportion", "average-work-and-time-speed-and-distance"],
      practiceTestId: "practice-general-test-unit3-test1",
      practiceTestUrl: "/test/practice-general-test-unit3-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },
];
