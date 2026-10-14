import { NoteDocument } from "@/types/notes";

export const economicsMicroTopics: NoteDocument[] = [
  // Unit 1: Utility Analysis, Indifference Curves, Law of Demand, Elasticity of Demand
  {
    id: "eco_u1_t1",
    slug: "utility-analysis-indifference-curves-law-of-demand-elasticity-of-demand",
    subject: "eco",
    subjectName: "Economics",
    subjectCode: "309",
    unitNumber: 1,
    unitTitle: "Consumer Behaviour and Demand",
    topicTitle: "Utility Analysis, Indifference Curves, Law of Demand, Elasticity of Demand",
    ncertReference: {
      class: "Class 12",
      book: "Introductory Microeconomics",
      chapterNumber: 2,
      chapterName: "Theory of Consumer Behaviour",
      sections: [
        "2.1 Utility: Total Utility (TU) and Marginal Utility (MU), Law of Diminishing Marginal Utility",
        "2.2 Consumer's Equilibrium: Single Commodity and Two Commodity Cases (Equimarginal Utility)",
        "2.3 Ordinal Utility Approach: Indifference Curve (IC) Analysis, Properties of IC, Marginal Rate of Substitution (MRS)",
        "2.4 Budget Line and Budget Set: Equation, Slope ($P_x/P_y$), Shifts and Rotations",
        "2.5 Consumer's Optimum ($MRS_{xy} = P_x/P_y$)",
        "2.6 Demand Curve, Law of Demand, Normal vs Inferior vs Giffen Goods",
        "2.7 Price Elasticity of Demand ($E_d$): Percentage Method, Total Expenditure Method, Geometric/Point Method",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (7-9 questions per shift)",
      totalPyqsInRepo: 275,
      weightagePercentage: 15,
    },
    summary30Seconds: [
      "Cardinal Utility: Law of Diminishing Marginal Utility ($MU = \\Delta TU / \\Delta Q$). Consumer equilibrium: $\\frac{MU_x}{P_x} = \\frac{MU_y}{P_y} = MU_m$.",
      "Ordinal Utility (Hicks & Allen): Indifference curves are downward sloping and convex to origin due to diminishing Marginal Rate of Substitution ($MRS_{xy}$). Optimum: $MRS_{xy} = P_x / P_y$.",
      "Price Elasticity of Demand ($E_d = -\\frac{\\% \\Delta Q}{\\% \\Delta P}$): Elastic ($E_d > 1$), Inelastic ($E_d < 1$), Unitary ($E_d = 1$, rectangular hyperbola demand curve).",
    ],
    coreConcepts: [
      {
        title: "Cardinal Utility Analysis & Consumer's Equilibrium",
        content: `**Utility Concepts**:
- **Total Utility (TU)**: Total psychological satisfaction derived from consuming a given amount of a commodity ($TU_n = \\sum MU$).
- **Marginal Utility (MU)**: Addition to total utility from consuming one additional unit ($MU_n = TU_n - TU_{n-1}$ or $\\frac{\\Delta TU}{\\Delta Q}$).
- **Law of Diminishing Marginal Utility (Gossen's First Law)**: As consumption of a commodity increases, the marginal utility derived from each successive unit declines continuously.
- **Relationship between TU and MU**:
  1. When $MU > 0$, $TU$ increases at a diminishing rate.
  2. When $MU = 0$, $TU$ is at its maximum (**Point of Satiety**).
  3. When $MU < 0$, $TU$ begins to decline.

**Consumer's Equilibrium**:
- *One-Commodity Case*: Consumer is in equilibrium when marginal utility of the good in terms of money equals its price:
  $$\\frac{MU_x}{P_x} = MU_m$$
- *Two-Commodity Case (Law of Equi-Marginal Utility / Gossen's Second Law)*:
  $$\\frac{MU_x}{P_x} = \\frac{MU_y}{P_y} = MU_m$$
  If $\\frac{MU_x}{P_x} > \\frac{MU_y}{P_y}$, consumer increases consumption of $X$, reducing $MU_x$ until equality is restored.`,
        ncertPointers: [
          "Assumptions of Cardinal Utility: Cardinal measurement in utils, constant marginal utility of money ($MU_m$), rational consumer, continuous consumption of standard units.",
          "Consumer surplus is the difference between what a consumer is willing to pay and what he actually pays.",
        ],
      },
      {
        title: "Ordinal Approach: Indifference Curves & Budget Constraint",
        content: `**Indifference Curve (IC)**:
Locus of points representing different combinations of two goods providing identical satisfaction to the consumer.
- **Properties of Indifference Curves**:
  1. Downward sloping from left to right (negative slope).
  2. **Convex to the origin** due to diminishing Marginal Rate of Substitution ($MRS_{xy} = -\\frac{\\Delta Y}{\\Delta X} = \\frac{MU_x}{MU_y}$).
  3. Higher IC represents higher level of satisfaction (**Monotonic Preferences**).
  4. Two ICs never intersect each other.

**Budget Line & Consumer's Optimum**:
- **Budget Line Equation**: $P_x X + P_y Y = M$ (where $M$ = consumer income).
- **Slope of Budget Line**: $-\\frac{P_x}{P_y}$ (Market rate of exchange).
- **Consumer's Tangency Optimum**:
  Consumer maximizes satisfaction at the point of tangency where the budget line touches the highest attainable Indifference Curve:
  $$\\mathbf{MRS_{xy} = \\frac{P_x}{P_y}} \\quad \\text{and IC must be convex to origin at this point}$$`,
        ncertPointers: [
          "If $P_x$ falls, budget line rotates outward along X-axis. If income $M$ increases, budget line shifts parallel to the right.",
          "Giffen Goods: Highly inferior goods with strong negative income effect that outweighs substitution effect, violating the Law of Demand (positive price elasticity).",
        ],
      },
      {
        title: "Elasticity of Demand: Methods & Determinants",
        content: `**Price Elasticity of Demand ($E_d$)**:
Degree of responsiveness of quantity demanded to a change in price of the commodity:
$$E_d = - \\frac{\\% \\Delta Q}{\\% \\Delta P} = - \\frac{\\Delta Q}{\\Delta P} \\times \\frac{P}{Q}$$

**Degrees of Price Elasticity**:
1. $E_d = 0$: Perfectly Inelastic (Vertical demand curve, e.g. life-saving insulin).
2. $E_d < 1$: Inelastic (Steep demand curve, necessities like salt).
3. $E_d = 1$: Unitary Elastic (**Rectangular Hyperbola** demand curve; total expenditure remains constant).
4. $E_d > 1$: Elastic (Flatter demand curve, luxury goods).
5. $E_d = \\infty$: Perfectly Elastic (Horizontal demand curve).

**Total Expenditure (Outlay) Method (Alfred Marshall)**:
- If Price and Total Expenditure move in **opposite directions** $\\implies E_d > 1$.
- If Total Expenditure **remains unchanged** when price changes $\\implies E_d = 1$.
- If Price and Total Expenditure move in the **same direction** $\\implies E_d < 1$.

**Geometric / Point Method**:
$$E_d = \\frac{\\text{Lower Segment of Demand Curve}}{\\text{Upper Segment of Demand Curve}}$$`,
        ncertPointers: [
          "Cross elasticity of demand: Positive for substitute goods (tea and coffee); Negative for complementary goods (car and petrol).",
          "Income elasticity: Positive for normal goods; Negative for inferior goods.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Consumer Optimum Tangency Condition",
        formula: "MRS_{xy} = \\frac{MU_x}{MU_y} = \\frac{P_x}{P_y}",
        symbols: "MRS = Marginal Rate of Substitution, P_x/P_y = Price Ratio",
        siUnits: "Unitless slope equality",
        applicationCondition: "Ordinal utility consumer equilibrium",
      },
      {
        name: "Price Elasticity of Demand Formula",
        formula: "E_d = - \\frac{\\Delta Q}{\\Delta P} \\times \\frac{P}{Q} \\quad | \\quad \\text{Point Elasticity} = \\frac{\\text{Lower Segment}}{\\text{Upper Segment}}",
        symbols: "P, Q, \\Delta P, \\Delta Q",
        siUnits: "Elasticity coefficient",
        applicationCondition: "Demand responsiveness measurement",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Consumer's Equilibrium: Indifference Curve Tangency to Budget Line</text>
  
  <!-- Axes -->
  <line x1="80" y1="250" x2="680" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <line x1="80" y1="50" x2="80" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <text x="380" y="278" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Good X (Units)</text>
  <text x="45" y="150" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold" transform="rotate(-90 45 150)">Good Y (Units)</text>
  
  <!-- Budget Line AB -->
  <line x1="80" y1="80" x2="480" y2="250" stroke="#f59e0b" strokeWidth="3"/>
  <text x="70" y="80" textAnchor="end" fill="#fbbf24" fontSize="12" fontWeight="bold">A (M/Py)</text>
  <text x="480" y="270" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">B (M/Px)</text>
  
  <!-- IC1 (Under) -->
  <path d="M 120,230 Q 180,180 300,160" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4"/>
  <text x="310" y="165" fill="#64748b" fontSize="10">IC1</text>
  
  <!-- IC2 (Tangency) -->
  <path d="M 140,190 Q 240,150 420,130" fill="none" stroke="#10b981" strokeWidth="3"/>
  <text x="430" y="135" fill="#34d399" fontSize="12" fontWeight="bold">IC2</text>
  
  <!-- Tangency Point E -->
  <circle cx="280" cy="165" r="7" fill="#ec4899"/>
  <text x="295" y="160" fill="#f472b6" fontSize="12" fontWeight="bold">E (Optimum: MRS = Px/Py)</text>
  
  <!-- Guide Lines from E -->
  <line x1="280" y1="165" x2="280" y2="250" stroke="#94a3b8" strokeDasharray="3 3"/>
  <line x1="80" y1="165" x2="280" y2="165" stroke="#94a3b8" strokeDasharray="3 3"/>
  <text x="280" y="265" textAnchor="middle" fill="#f8fafc" fontSize="11">X*</text>
  <text x="65" y="170" textAnchor="end" fill="#f8fafc" fontSize="11">Y*</text>
  
  <!-- IC3 (Unattainable) -->
  <path d="M 220,150 Q 320,110 520,95" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4"/>
  <text x="530" y="100" fill="#94a3b8" fontSize="10">IC3 (Unattainable)</text>
</svg>`,
    workedExamples: [
      {
        id: "eco_u1_t1_we1",
        questionNumber: 1,
        question: "When the price of a good falls from ₹10 to ₹8 per unit, its quantity demanded increases from 100 units to 150 units. Calculate the price elasticity of demand.",
        options: [
          { id: "A", text: "2.5" },
          { id: "B", text: "1.5" },
          { id: "C", text: "0.5" },
          { id: "D", text: "3.0" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Initial Price $P = 10$, New Price $P_1 = 8 \\implies \\Delta P = 8 - 10 = -2$.",
          "Step 2: Initial Quantity $Q = 100$, New Quantity $Q_1 = 150 \\implies \\Delta Q = 150 - 100 = 50$.",
          "Step 3: $E_d = - \\frac{\\Delta Q}{\\Delta P} \\times \\frac{P}{Q} = - \\frac{50}{-2} \\times \\frac{10}{100} = 25 \\times 0.1 = 2.5$.",
          "Step 4: Demand is highly elastic ($E_d = 2.5$). Option A is exact.",
        ],
      },
      {
        id: "eco_u1_t1_we2",
        questionNumber: 2,
        question: "A consumer consumes only two goods X and Y. The marginal utility of Good X is 40 utils and its price is ₹10. The price of Good Y is ₹5. If the consumer is in equilibrium, what must be the marginal utility of Good Y?",
        options: [
          { id: "A", text: "20 utils" },
          { id: "B", text: "40 utils" },
          { id: "C", text: "80 utils" },
          { id: "D", text: "10 utils" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Consumer equilibrium in two-commodity case requires $\\frac{MU_x}{P_x} = \\frac{MU_y}{P_y}$.",
          "Step 2: $\\frac{40}{10} = \\frac{MU_y}{5}$.",
          "Step 3: $4 = \\frac{MU_y}{5} \\implies MU_y = 4 \\times 5 = 20$ utils.",
          "Step 4: Option A is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Shape of Demand Curve for Unitary Elasticity",
        frequency: "Very High",
        typicalStem: "A demand curve that has unitary price elasticity at all points is shaped as a:",
        strategy: "Rectangular Hyperbola.",
      },
      {
        patternType: "Relationship between TU and MU",
        frequency: "High",
        typicalStem: "When Total Utility is at its maximum point, Marginal Utility is equal to:",
        strategy: "Zero (Point of Satiety).",
      },
    ],
    commonTraps: [
      {
        concept: "Negative Elasticity Sign Convention",
        misconception: "Confusing magnitude with mathematical sign.",
        correctUnderstanding: "Price elasticity of demand is mathematically negative due to the inverse relationship, but in economics the minus sign is often ignored and reported as an absolute value ($|E_d| = 2.5 > 1$).",
      },
      {
        concept: "Substitute vs Complementary Cross Elasticity",
        misconception: "Marking negative cross elasticity for tea and coffee.",
        correctUnderstanding: "Substitute goods have POSITIVE cross elasticity (rise in price of tea increases demand for coffee). Complementary goods have NEGATIVE cross elasticity.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Total Outlay Method Rules",
        mnemonic: "Opposite = Elastic (>1); Same = Inelastic (<1); Unchanged = Unitary (=1).",
        explanation: "Quick test of price and expenditure direction.",
      },
    ],
    quickRevisionCard: {
      title: "Consumer Behaviour & Demand — Quick Card",
      bulletPoints: [
        "When $MU = 0$, $TU$ is at maximum (point of satiety).",
        "Single commodity equilibrium: $MU_x / P_x = MU_m$.",
        "Two commodity equilibrium: $MU_x / P_x = MU_y / P_y = MU_m$.",
        "Indifference curve is convex to origin due to diminishing MRS.",
        "Consumer's optimum: $MRS_{xy} = P_x / P_y$ (tangency of IC to budget line).",
        "Slope of budget line is $-P_x / P_y$.",
        "Unitary elastic demand curve ($E_d = 1$) is a Rectangular Hyperbola.",
        "Cross elasticity: Positive for substitutes; Negative for complements.",
      ],
    },
    practiceQuestions: [
      {
        id: "eco_u1_t1_q1",
        question: "When Total Utility (TU) reaches its maximum level, the Marginal Utility (MU) is:",
        options: [
          { id: "A", text: "Positive and increasing" },
          { id: "B", text: "Zero" },
          { id: "C", text: "Negative" },
          { id: "D", text: "Equal to Total Utility" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "At the point of satiety, Total Utility is maximized and Marginal Utility is exactly zero.",
      },
      {
        id: "eco_u1_t1_q2",
        question: "The shape of an Indifference Curve is convex to the origin primarily due to:",
        options: [
          { id: "A", text: "Law of Diminishing Marginal Utility" },
          { id: "B", text: "Diminishing Marginal Rate of Substitution (MRS)" },
          { id: "C", text: "Constant price of commodities" },
          { id: "D", text: "Monotonic preferences" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "An indifference curve is convex to the origin because the Marginal Rate of Substitution ($MRS_{xy}$) diminishes continuously as the consumer substitutes Good X for Good Y.",
      },
      {
        id: "eco_u1_t1_q3",
        question: "A demand curve with unitary elasticity ($E_d = 1$) throughout its length takes the geometric shape of a:",
        options: [
          { id: "A", text: "Straight horizontal line" },
          { id: "B", text: "Straight vertical line" },
          { id: "C", text: "Rectangular Hyperbola" },
          { id: "D", text: "Upward sloping straight line" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "A rectangular hyperbola demand curve yields unitary price elasticity ($E_d = 1$) at all points because total expenditure ($P \\times Q$) remains constant at every point.",
      },
      {
        id: "eco_u1_t1_q4",
        question: "If a fall in the price of Good A leads to an increase in the demand for Good B, the two goods are:",
        options: [
          { id: "A", text: "Substitute goods" },
          { id: "B", text: "Complementary goods" },
          { id: "C", text: "Giffen goods" },
          { id: "D", text: "Inferior goods" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Complementary goods have negative cross price elasticity; when price of one falls (e.g. car), demand for its complement (e.g. petrol) rises.",
      },
      {
        id: "eco_u1_t1_q5",
        question: "The slope of the budget line is given by:",
        options: [
          { id: "A", text: "- P_y / P_x" },
          { id: "B", text: "- P_x / P_y" },
          { id: "C", text: "MU_x / MU_y" },
          { id: "D", text: "M / P_x" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The slope of the budget line is the negative ratio of the prices of the two goods, $-P_x / P_y$, which represents the rate at which the market allows the consumer to substitute Good X for Good Y.",
      },
      {
        id: "eco_u1_t1_q6",
        question: "If Total Expenditure on a good remains constant despite a 20% rise in its price, its price elasticity of demand is:",
        options: [
          { id: "A", text: "Greater than 1" },
          { id: "B", text: "Less than 1" },
          { id: "C", text: "Equal to 1" },
          { id: "D", text: "Zero" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Under the Total Outlay Method, if total expenditure remains unchanged when price changes, the price elasticity of demand is unitary ($E_d = 1$).",
      },
      {
        id: "eco_u1_t1_q7",
        question: "Which of the following conditions must hold simultaneously at the point of consumer equilibrium under the indifference curve approach?",
        options: [
          { id: "A", text: "MRS_xy = P_x / P_y and IC is convex to the origin" },
          { id: "B", text: "MRS_xy = P_y / P_x and IC is concave to the origin" },
          { id: "C", text: "MU_x = MU_y and Budget Line is horizontal" },
          { id: "D", text: "MRS_xy = 0" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Consumer equilibrium requires the slope of IC to equal the slope of budget line ($MRS_{xy} = P_x / P_y$) and the IC must be convex to origin (diminishing MRS) at the point of tangency.",
      },
      {
        id: "eco_u1_t1_q8",
        question: "Goods for which demand decreases as consumer income increases are called:",
        options: [
          { id: "A", text: "Normal goods" },
          { id: "B", text: "Inferior goods" },
          { id: "C", text: "Luxury goods" },
          { id: "D", text: "Public goods" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Inferior goods have a negative income elasticity of demand; when income rises, consumers shift away to superior substitutes, reducing demand for inferior goods.",
      },
      {
        id: "eco_u1_t1_q9",
        question: "Using the point method, price elasticity of demand at the mid-point of a straight-line downward sloping demand curve is:",
        options: [
          { id: "A", text: "Infinity" },
          { id: "B", text: "Zero" },
          { id: "C", text: "Equal to 1" },
          { id: "D", text: "Greater than 1" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "At the mid-point of a linear demand curve, Lower Segment = Upper Segment, so $E_d = \\text{Lower} / \\text{Upper} = 1$.",
      },
      {
        id: "eco_u1_t1_q10",
        question: "Assertion (A): Two indifference curves can never intersect each other.\nReason (R): Each indifference curve represents a distinct and uniform level of consumer satisfaction due to monotonic preferences.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is not the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        questionType: "Assertion-Reason",
        difficulty: "medium",
        explanation: "If two ICs intersect, the point of intersection would imply that two different levels of satisfaction are identical, which violates the transitivity and monotonicity of consumer preferences.",
      },
    ],
  },

  // Unit 2: Production Function, Law of Variable Proportions, Cost Curves, Revenue
  {
    id: "eco_u2_t1",
    slug: "production-function-law-of-variable-proportions-cost-curves-revenue",
    subject: "eco",
    subjectName: "Economics",
    subjectCode: "309",
    unitNumber: 2,
    unitTitle: "Producer Behaviour and Supply",
    topicTitle: "Production Function, Law of Variable Proportions, Cost Curves, Revenue",
    ncertReference: {
      class: "Class 12",
      book: "Introductory Microeconomics",
      chapterNumber: 3,
      chapterName: "Production and Costs & The Theory of the Firm under Perfect Competition",
      sections: [
        "3.1 Short-Run vs Long-Run Production Function (Fixed and Variable Factors)",
        "3.2 Total Product (TP), Average Product (AP), Marginal Product (MP)",
        "3.3 The Law of Variable Proportions (Three Stages of Production)",
        "3.4 Returns to Scale (Constant, Increasing, Decreasing in Long Run)",
        "3.5 Short-Run Costs: TFC, TVC, TC, AFC (Rectangular Hyperbola), AVC, ATC/AC, MC",
        "3.6 Revenue Concepts: Total Revenue (TR), Average Revenue (AR = Price), Marginal Revenue (MR)",
        "3.7 Producer's Equilibrium (MR = MC approach)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (8-10 questions per shift)",
      totalPyqsInRepo: 295,
      weightagePercentage: 16,
    },
    summary30Seconds: [
      "Law of Variable Proportions: Stage 1 (Increasing Returns), Stage 2 (Diminishing Returns - rational stage of production), Stage 3 (Negative Returns).",
      "Cost Curves: $TC = TFC + TVC$; Average Fixed Cost (AFC) is a rectangular hyperbola; Marginal Cost ($MC$) cuts $AC$ and $AVC$ at their lowest points from below.",
      "Producer's Equilibrium under MR-MC approach: 1. $MR = MC$, and 2. $MC$ must be rising (cut MR from below). Under perfect competition, $P = AR = MR = MC$.",
    ],
    coreConcepts: [
      {
        title: "Production Function & The Law of Variable Proportions",
        content: `**Short-Run Production Concepts**:
- **Total Product (TP)**: Total volume of goods produced by employing variable inputs with fixed inputs.
- **Average Product (AP)**: Output per unit of variable factor ($AP = \\frac{TP}{L}$).
- **Marginal Product (MP)**: Addition to total product when one more unit of variable factor is employed ($MP = \\frac{\\Delta TP}{\\Delta L} = TP_n - TP_{n-1}$).

**The Law of Variable Proportions (Returns to a Factor)**:
As more and more units of a variable factor are combined with fixed factors, marginal product initially rises, then falls, and eventually becomes negative:
1. **Stage I: Increasing Returns**:
   - $TP$ increases at an increasing rate $\\implies MP$ rises and reaches maximum.
   - Ends where $AP$ reaches its maximum ($AP = MP$).
2. **Stage II: Diminishing Returns (Rational Stage of Operation)**:
   - $TP$ increases at a diminishing rate $\\implies MP$ is positive but declines.
   - Ends where $TP$ reaches maximum and $MP = 0$.
   - A rational producer operates strictly in this stage.
3. **Stage III: Negative Returns**:
   - $TP$ declines $\\implies MP$ becomes negative ($MP < 0$).`,
        ncertPointers: [
          "Relationship between AP and MP: When MP > AP, AP rises; When MP = AP, AP is at maximum; When MP < AP, AP falls. MP cuts AP at its maximum point.",
          "Returns to Scale (Long Run): All inputs are variable. Constant returns to scale occurs when a proportional increase in all inputs causes output to increase by identical proportion (Cobb-Douglas with $\\alpha + \\beta = 1$).",
        ],
      },
      {
        title: "Short-Run Cost Analysis: Shapes & Relationships",
        content: `**Total Cost Components**:
$$TC = TFC + TVC$$
- **Total Fixed Cost (TFC)**: Costs that do not vary with output (rent, insurance, permanent staff salary). Horizontal straight line.
- **Total Variable Cost (TVC)**: Costs that change directly with output (raw materials, casual labor). Inverse S-shaped due to law of variable proportions.

**Per-Unit Cost Curves**:
1. **Average Fixed Cost (AFC)**: $AFC = \\frac{TFC}{Q}$. Shapes as a **Rectangular Hyperbola** asymptotic to both axes (never touches either axis).
2. **Average Variable Cost (AVC)**: $AVC = \\frac{TVC}{Q}$. U-shaped.
3. **Average Total Cost (ATC / AC)**: $AC = AFC + AVC = \\frac{TC}{Q}$. U-shaped. Vertical distance between $AC$ and $AVC$ diminishes continuously as $Q$ increases, but they never intersect.
4. **Marginal Cost (MC)**: Addition to total cost from producing one more unit ($MC = \\frac{\\Delta TC}{\\Delta Q} = \\frac{\\Delta TVC}{\\Delta Q}$).
   - **MC cuts both AVC and AC at their minimum points from below**.`,
        ncertPointers: [
          "Explicit costs involve direct cash outlays (wages, rent); Implicit costs are estimated value of inputs owned by entrepreneur (owner's salary, imputed rent).",
          "Economic Cost = Explicit Cost + Implicit Cost.",
        ],
      },
      {
        title: "Revenue Curves & Producer's Equilibrium",
        content: `**Revenue Concepts**:
- **Total Revenue (TR)**: $TR = P \\times Q$.
- **Average Revenue (AR)**: Revenue per unit of output ($AR = \\frac{TR}{Q} = \\frac{P \\times Q}{Q} = P$). **AR curve is always identical to the Price / Demand curve**.
- **Marginal Revenue (MR)**: Addition to total revenue from selling one more unit ($MR = \\frac{\\Delta TR}{\\Delta Q} = TR_n - TR_{n-1}$).

**Market Structures Comparison**:
- *Under Perfect Competition*: Firm is a price taker $\\implies P$ is constant. Thus, **$P = AR = MR$** (horizontal straight line parallel to X-axis).
- *Under Monopoly / Monopolistic Competition*: Firm must lower price to sell more output $\\implies AR$ and $MR$ slope downward; $MR$ lies below $AR$ and is twice as steep.

**Producer's Equilibrium (MR - MC Approach)**:
A producer attains profit-maximizing equilibrium when:
1. **$MR = MC$** (First-order condition).
2. **$MC$ is rising / $MC$ cuts $MR$ from below** (Second-order condition).`,
        ncertPointers: [
          "Break-even Point: Where $TR = TC$ or $P = AC$ (normal profits earned).",
          "Shut-down Point in Short Run: Where $TR = TVC$ or $P = AVC$ (firm covers variable costs but loses fixed costs). If $P < AVC$, firm must shut down immediately.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Cost Relationships",
        formula: "TC = TFC + TVC; \\quad AC = AFC + AVC; \\quad MC = \\frac{\\Delta TVC}{\\Delta Q}",
        symbols: "TFC, TVC, TC, AFC, AVC, AC, MC",
        siUnits: "Monetary cost units",
        applicationCondition: "Short-run production cost theory",
      },
      {
        name: "Producer Equilibrium Conditions",
        formula: "1. \\; MR = MC \\quad \\text{and} \\quad 2. \\; \\frac{d(MC)}{dQ} > 0 \\; (MC \\text{ cuts } MR \\text{ from below})",
        symbols: "MR, MC",
        siUnits: "Marginal analysis",
        applicationCondition: "Profit maximization across all market forms",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Short-Run Cost Curves: AC, AVC, AFC &amp; MC Intersections</text>
  
  <!-- Axes -->
  <line x1="80" y1="250" x2="680" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <line x1="80" y1="50" x2="80" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <text x="380" y="278" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Output (Units)</text>
  <text x="45" y="150" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold" transform="rotate(-90 45 150)">Cost (₹)</text>
  
  <!-- AFC (Rectangular Hyperbola) -->
  <path d="M 90,90 Q 140,210 400,240" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4"/>
  <text x="410" y="245" fill="#94a3b8" fontSize="11">AFC</text>
  
  <!-- AVC (U-shaped) -->
  <path d="M 100,190 Q 230,225 350,195 Q 460,170 560,120" fill="none" stroke="#f59e0b" strokeWidth="2.5"/>
  <text x="570" y="125" fill="#fbbf24" fontSize="11" fontWeight="bold">AVC</text>
  
  <!-- AC (U-shaped, above AVC) -->
  <path d="M 110,130 Q 250,170 380,165 Q 490,150 580,95" fill="none" stroke="#3b82f6" strokeWidth="3"/>
  <text x="590" y="100" fill="#60a5fa" fontSize="12" fontWeight="bold">AC</text>
  
  <!-- MC (Cuts AVC and AC at minimum points) -->
  <path d="M 120,220 Q 200,230 250,220 Q 320,180 450,70" fill="none" stroke="#10b981" strokeWidth="3"/>
  <text x="460" y="70" fill="#34d399" fontSize="13" fontWeight="bold">MC</text>
  
  <!-- Minimum markers -->
  <circle cx="280" cy="215" r="5" fill="#f59e0b"/>
  <circle cx="380" cy="165" r="5" fill="#3b82f6"/>
  <text x="380" y="185" textAnchor="middle" fill="#86efac" fontSize="10">MC cuts AC at min point</text>
</svg>`,
    workedExamples: [
      {
        id: "eco_u2_t1_we1",
        questionNumber: 1,
        question: "A firm's Total Cost schedule shows that at 0 units of output, Total Cost is ₹100. At 4 units of output, Total Cost is ₹260. Calculate the Average Variable Cost (AVC) at 4 units of output.",
        options: [
          { id: "A", text: "₹40" },
          { id: "B", text: "₹65" },
          { id: "C", text: "₹25" },
          { id: "D", text: "₹160" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: At 0 units of output, Total Variable Cost is 0, so $TC = TFC = ₹100$.",
          "Step 2: Total Cost at 4 units = ₹260.",
          "Step 3: Total Variable Cost at 4 units = $TC - TFC = ₹260 - ₹100 = ₹160$.",
          "Step 4: Average Variable Cost $AVC = \\frac{TVC}{Q} = \\frac{₹160}{4} = ₹40$.",
          "Step 5: Option A is correct.",
        ],
      },
      {
        id: "eco_u2_t1_we2",
        questionNumber: 2,
        question: "Under perfect competition, a firm sells 20 units of output at ₹15 per unit. If output increases to 25 units, what will be the Marginal Revenue (MR)?",
        options: [
          { id: "A", text: "₹15" },
          { id: "B", text: "₹75" },
          { id: "C", text: "₹300" },
          { id: "D", text: "₹5" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Under perfect competition, price remains constant for all levels of output.",
          "Step 2: When price is constant, Average Revenue equals Marginal Revenue ($AR = MR = P$).",
          "Step 3: Since price is ₹15 per unit, Marginal Revenue is also ₹15 for every additional unit sold.",
          "Step 4: Option A is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Shape of Average Fixed Cost Curve",
        frequency: "Very High",
        typicalStem: "The Average Fixed Cost (AFC) curve has the shape of a:",
        strategy: "Rectangular Hyperbola (its area under curve represents TFC which is constant).",
      },
      {
        patternType: "Intersection of MC and AC/AVC",
        frequency: "High",
        typicalStem: "Marginal Cost curve cuts the Average Cost curve and Average Variable Cost curve at:",
        strategy: "Their lowest / minimum points from below.",
      },
    ],
    commonTraps: [
      {
        concept: "AFC Touching Axes",
        misconception: "Believing AFC touches the X-axis at very large outputs.",
        correctUnderstanding: "AFC approaches the X-axis asymptotically but NEVER touches it, because TFC is positive and cannot be zero.",
      },
      {
        concept: "MC Formula with Fixed Costs",
        misconception: "Thinking MC is affected by changes in TFC.",
        correctUnderstanding: "Marginal Cost is independent of fixed costs; it is the derivative of TVC ($MC = \\Delta TVC / \\Delta Q$). A change in fixed costs does not shift the MC curve.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "MC Cut Rule",
        mnemonic: "MC cuts from below at the trough (lowest point).",
        explanation: "Never forget that MC intersects AC and AVC at their lowest points.",
      },
    ],
    quickRevisionCard: {
      title: "Production & Costs — High-Yield Cheat Sheet",
      bulletPoints: [
        "Stage 2 of variable proportions (Diminishing returns) is the rational stage of production.",
        "When $MP > AP$, $AP$ rises; $MP = AP$ at maximum $AP$; $MP < AP$, $AP$ falls.",
        "AFC is a Rectangular Hyperbola (never touches either axis).",
        "MC cuts both AVC and AC at their lowest points from below.",
        "Vertical distance between AC and AVC = AFC (diminishes as Q rises, but never zero).",
        "Under perfect competition: $P = AR = MR$ (horizontal line).",
        "Producer equilibrium: $MR = MC$, and $MC$ must cut $MR$ from below.",
        "Shut-down point in short run: $P = AVC$. Break-even point: $P = AC$.",
      ],
    },
    practiceQuestions: [
      {
        id: "eco_u2_t1_q1",
        question: "The Average Fixed Cost (AFC) curve is shaped as a:",
        options: [
          { id: "A", text: "U-shaped curve" },
          { id: "B", text: "Horizontal straight line" },
          { id: "C", text: "Rectangular Hyperbola" },
          { id: "D", text: "Inverted U-shaped curve" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "As output increases, constant TFC is divided by larger Q, making AFC fall continuously in the form of a rectangular hyperbola.",
      },
      {
        id: "eco_u2_t1_q2",
        question: "Marginal Cost curve intersects the Average Variable Cost curve at its:",
        options: [
          { id: "A", text: "Maximum point" },
          { id: "B", text: "Minimum point from below" },
          { id: "C", text: "Point of inflection" },
          { id: "D", text: "Any random point" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The Marginal Cost curve cuts both AVC and AC at their minimum points from below.",
      },
      {
        id: "eco_u2_t1_q3",
        question: "Under the Law of Variable Proportions, a rational producer will always operate in:",
        options: [
          { id: "A", text: "Stage I (Increasing Returns)" },
          { id: "B", text: "Stage II (Diminishing Returns)" },
          { id: "C", text: "Stage III (Negative Returns)" },
          { id: "D", text: "Either Stage I or Stage III" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Stage II (from max AP to max TP where MP = 0) is the rational stage because MP is positive and diminishing, maximizing total profit.",
      },
      {
        id: "eco_u2_t1_q4",
        question: "In the short run, if a competitive firm's product price falls below its minimum Average Variable Cost (AVC), the firm should:",
        options: [
          { id: "A", text: "Increase production" },
          { id: "B", text: "Shut down operations immediately" },
          { id: "C", text: "Continue producing to cover fixed costs" },
          { id: "D", text: "Raise the market price" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "If $P < AVC$, the firm cannot even cover its variable operating costs; producing would add variable losses on top of fixed losses, so it must shut down.",
      },
      {
        id: "eco_u2_t1_q5",
        question: "Under perfect competition, the relationship between Price (P), Average Revenue (AR), and Marginal Revenue (MR) is:",
        options: [
          { id: "A", text: "P = AR = MR" },
          { id: "B", text: "P = AR > MR" },
          { id: "C", text: "P > AR > MR" },
          { id: "D", text: "P < AR < MR" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Under perfect competition, the firm is a price taker; price is constant for all units sold, meaning $P = AR = MR$.",
      },
      {
        id: "eco_u2_t1_q6",
        question: "The vertical distance between the Average Total Cost (AC) curve and the Average Variable Cost (AVC) curve represents:",
        options: [
          { id: "A", text: "Marginal Cost" },
          { id: "B", text: "Average Fixed Cost" },
          { id: "C", text: "Total Fixed Cost" },
          { id: "D", text: "Normal Profit" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Since $AC = AVC + AFC$, the vertical gap $AC - AVC = AFC$.",
      },
      {
        id: "eco_u2_t1_q7",
        question: "When Marginal Product (MP) is zero, Total Product (TP) is at its:",
        options: [
          { id: "A", text: "Minimum level" },
          { id: "B", text: "Maximum level" },
          { id: "C", text: "Point of inflection" },
          { id: "D", text: "Negative phase" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "When $MP = 0$, the addition to total product is zero, representing the maximum point of the Total Product curve.",
      },
      {
        id: "eco_u2_t1_q8",
        question: "Which of the following is an implicit cost for a business firm?",
        options: [
          { id: "A", text: "Wages paid to hired workers" },
          { id: "B", text: "Imputed rent on the entrepreneur's own factory building" },
          { id: "C", text: "Payment for purchase of raw materials" },
          { id: "D", text: "Electricity bill paid to utility company" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Implicit costs are the imputed costs of self-owned, self-employed resources for which no direct cash payment is made to third parties.",
      },
      {
        id: "eco_u2_t1_q9",
        question: "At the point of producer's equilibrium, which second-order condition must be satisfied under the MR-MC approach?",
        options: [
          { id: "A", text: "MC must be falling" },
          { id: "B", text: "MC must be rising (cut MR from below)" },
          { id: "C", text: "AC must equal AR" },
          { id: "D", text: "TFC must be zero" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The second-order condition requires that beyond equilibrium output, $MC > MR$, which means $MC$ must cut $MR$ from below.",
      },
      {
        id: "eco_u2_t1_q10",
        question: "A firm produces 10 units of a commodity at an Average Total Cost of ₹50. When it produces 11 units, Average Total Cost becomes ₹52. What is the Marginal Cost of the 11th unit?",
        options: [
          { id: "A", text: "₹72" },
          { id: "B", text: "₹52" },
          { id: "C", text: "₹2" },
          { id: "D", text: "₹22" },
        ],
        correctOption: "A",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "medium",
        explanation: "$TC_{10} = 10 \\times 50 = ₹500$. $TC_{11} = 11 \\times 52 = ₹572$. $MC_{11} = TC_{11} - TC_{10} = 572 - 500 = ₹72$.",
      },
    ],
  },

  // Unit 3: Perfect Competition, Price Determination, Shifts in Demand and Supply
  {
    id: "eco_u3_t1",
    slug: "perfect-competition-price-determination-shifts-in-demand-and-supply",
    subject: "eco",
    subjectName: "Economics",
    subjectCode: "309",
    unitNumber: 3,
    unitTitle: "Forms of Market and Price Determination",
    topicTitle: "Perfect Competition, Price Determination, Shifts in Demand and Supply",
    ncertReference: {
      class: "Class 12",
      book: "Introductory Microeconomics",
      chapterNumber: 4,
      chapterName: "The Theory of the Firm under Perfect Competition & Market Equilibrium",
      sections: [
        "4.1 Perfect Competition: Features (Large number of buyers/sellers, Homogeneous product, Free entry/exit, Perfect knowledge, Perfect mobility)",
        "4.2 The Firm as a Price Taker & Industry as Price Maker",
        "5.1 Market Equilibrium: Equilibrium Price and Equilibrium Quantity ($Q_d = Q_s$)",
        "5.2 Excess Demand and Excess Supply (Market mechanism adjustment)",
        "5.3 Simultaneous Shifts of Demand and Supply Curves",
        "5.4 Special Cases: Perfectly Elastic and Perfectly Inelastic Demand/Supply",
        "5.5 Applications of Tools of Demand and Supply: Price Ceiling (Rationing) and Price Floor (Minimum Support Price - MSP)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (6-8 questions per shift)",
      totalPyqsInRepo: 240,
      weightagePercentage: 13,
    },
    summary30Seconds: [
      "Perfect Competition: Homogeneous product implies uniform single price across the market; free entry and exit ensures firms earn ONLY normal profit in the long run ($P = AC$).",
      "Market Equilibrium: Intersection of market demand and market supply ($Q_d = Q_s$). Excess demand drives price up; excess supply drives price down.",
      "Government Interventions: Price Ceiling (maximum legal price below equilibrium, leading to shortages and black marketing); Price Floor / MSP (minimum legal price above equilibrium, creating agricultural surplus).",
    ],
    coreConcepts: [
      {
        title: "Features of Perfect Competition & Price Taker Status",
        content: `**Distinctive Characteristics**:
1. **Very Large Number of Buyers and Sellers**: Each individual buyer and seller contributes a negligibly tiny fraction to total market volume and cannot influence the market price.
2. **Homogeneous Products**: Goods offered by all firms are perfect substitutes (identical in size, quality, packaging). Consequently, **no firm can charge a higher price**, yielding a single uniform market price.
3. **Free Entry and Exit of Firms**:
   - In the short run, firms can earn supernormal profit or incur losses.
   - If supernormal profits exist, new firms enter $\\to$ supply increases $\\to$ price drops until only **normal profits** remain ($P = AC$).
   - If losses exist, inefficient firms exit $\\to$ supply decreases $\\to$ price rises until losses are eliminated.
4. **Perfect Knowledge & Perfect Factor Mobility**: Complete transparency; transport costs are assumed to be zero.

**Price Maker vs Price Taker**:
- The **Industry is the Price Maker**: Market demand and market supply curves intersect to determine the equilibrium price.
- The **Firm is a Price Taker**: Takes the industry equilibrium price as given; faces a perfectly horizontal elastic demand curve ($AR = MR = P$).`,
        ncertPointers: [
          "Pure Competition: Has the first three conditions (large numbers, homogeneous product, free entry/exit) but lacks perfect knowledge and mobility.",
          "Firms under perfect competition do not incur any selling/advertisement costs.",
        ],
      },
      {
        title: "Market Equilibrium & Simultaneous Shifts",
        content: `**Market Equilibrium Condition**:
$$Q_d(P) = Q_s(P)$$
- **Excess Demand**: When $P < P^*$, $Q_d > Q_s$. Buyers compete, driving price up toward equilibrium.
- **Excess Supply**: When $P > P^*$, $Q_s > Q_d$. Sellers compete, driving price down toward equilibrium.

**Effects of Shifts in Demand and Supply**:
1. **Demand Shifts Alone**:
   - Increase in Demand: Both equilibrium price and quantity increase.
   - Decrease in Demand: Both equilibrium price and quantity decrease.
2. **Supply Shifts Alone**:
   - Increase in Supply: Equilibrium price falls, equilibrium quantity rises.
   - Decrease in Supply: Equilibrium price rises, equilibrium quantity falls.
3. **Simultaneous Shifts**:
   - *Both Demand and Supply increase equally*: Equilibrium quantity rises, but price remains unchanged.
   - *Demand increases more than supply*: Both price and quantity rise.
   - *Supply increases more than demand*: Price falls, quantity rises.`,
        ncertPointers: [
          "If supply is perfectly elastic (horizontal), an increase in demand increases quantity while price remains unchanged.",
          "If supply is perfectly inelastic (vertical, like land), an increase in demand increases price while quantity remains unchanged.",
        ],
      },
      {
        title: "Government Interventions: Price Ceiling & Price Floor",
        content: `**Price Ceiling (Maximum Price Legislation)**:
- Government imposes an upper legal limit on the price of an essential good (wheat, sugar, LPG, life-saving medicines) set **BELOW the equilibrium market price**.
- **Economic Consequences**:
  1. **Shortage / Excess Demand**: Lower price increases demand ($Q_d > Q_s$).
  2. **Rationing & Quotas**: Distribution through fair price shops (ration cards).
  3. **Black Marketing**: Goods sold illegally at exorbitant prices above the ceiling.
  4. Deterioration in product quality.

**Price Floor / Support Price (Minimum Price Legislation)**:
- Government imposes a lower legal limit on the price of agricultural produce (Minimum Support Price - MSP) or labor (Minimum Wages) set **ABOVE the equilibrium market price**.
- **Economic Consequences**:
  1. **Surplus / Excess Supply**: Higher price encourages farmers to produce more than market demands ($Q_s > Q_d$).
  2. **Buffer Stock Procurement**: Government must purchase the entire surplus at MSP to keep prices from crashing, storing it in FCI godowns.`,
        ncertPointers: [
          "Price Ceiling is intended to protect consumers; Price Floor is intended to protect producers/farmers.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Market Equilibrium Condition",
        formula: "Q_d(P) = Q_s(P) \\implies \\text{Equilibrium Price } P^* \\text{ and Quantity } Q^*",
        symbols: "Q_d = \\text{Demand}, Q_s = \\text{Supply}",
        siUnits: "Units and Currency",
        applicationCondition: "Market clearing price determination",
      },
      {
        name: "Price Ceiling vs Price Floor Matrix",
        formula: "\\text{Ceiling } (P_c < P^*) \\implies \\text{Shortage (Excess Demand)}; \\quad \\text{Floor } (P_f > P^*) \\implies \\text{Surplus (Excess Supply)}",
        symbols: "P_c, P_f, P^*",
        siUnits: "Price relative to equilibrium",
        applicationCondition: "Government microeconomic price controls",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Market Equilibrium, Price Ceiling (Shortage) &amp; Price Floor (Surplus)</text>
  
  <!-- Axes -->
  <line x1="80" y1="250" x2="680" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <line x1="80" y1="50" x2="80" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <text x="380" y="278" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Quantity (Q)</text>
  <text x="45" y="150" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold" transform="rotate(-90 45 150)">Price (P)</text>
  
  <!-- Demand Curve DD -->
  <line x1="120" y1="70" x2="580" y2="230" stroke="#ef4444" strokeWidth="3"/>
  <text x="590" y="235" fill="#f87171" fontSize="12" fontWeight="bold">Demand (D)</text>
  
  <!-- Supply Curve SS -->
  <line x1="120" y1="230" x2="580" y2="70" stroke="#10b981" strokeWidth="3"/>
  <text x="590" y="75" fill="#34d399" fontSize="12" fontWeight="bold">Supply (S)</text>
  
  <!-- Equilibrium Point E -->
  <circle cx="350" cy="150" r="6" fill="#38bdf8"/>
  <text x="365" y="145" fill="#38bdf8" fontSize="12" fontWeight="bold">E (Equilibrium: P*, Q*)</text>
  
  <!-- Price Floor Line (Above Pe) -->
  <line x1="80" y1="95" x2="620" y2="95" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 5"/>
  <text x="630" y="98" fill="#fbbf24" fontSize="11" fontWeight="bold">Price Floor (MSP) > P*</text>
  <text x="350" y="85" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">SURPLUS (Excess Supply: Qs > Qd)</text>
  
  <!-- Price Ceiling Line (Below Pe) -->
  <line x1="80" y1="205" x2="620" y2="205" stroke="#ec4899" strokeWidth="2" strokeDasharray="5 5"/>
  <text x="630" y="208" fill="#f472b6" fontSize="11" fontWeight="bold">Price Ceiling &lt; P*</text>
  <text x="350" y="222" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">SHORTAGE (Excess Demand: Qd > Qs)</text>
</svg>`,
    workedExamples: [
      {
        id: "eco_u3_t1_we1",
        questionNumber: 1,
        question: "In a competitive market, the demand and supply equations are given by $Q_d = 1000 - 50P$ and $Q_s = 200 + 30P$. Determine the equilibrium price and equilibrium quantity.",
        options: [
          { id: "A", text: "Price = ₹10, Quantity = 500 units" },
          { id: "B", text: "Price = ₹15, Quantity = 650 units" },
          { id: "C", text: "Price = ₹10, Quantity = 600 units" },
          { id: "D", text: "Price = ₹12, Quantity = 400 units" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: At market equilibrium, Quantity Demanded equals Quantity Supplied ($Q_d = Q_s$).",
          "Step 2: $1000 - 50P = 200 + 30P$.",
          "Step 3: $1000 - 200 = 30P + 50P \\implies 800 = 80P \\implies P^* = 10$.",
          "Step 4: Substitute $P = 10$ into demand equation: $Q^* = 1000 - 50(10) = 1000 - 500 = 500$ units.",
          "Step 5: Equilibrium Price = ₹10, Equilibrium Quantity = 500 units. Option A is exact.",
        ],
      },
      {
        id: "eco_u3_t1_we2",
        questionNumber: 2,
        question: "If the government imposes a price ceiling on milk below its equilibrium price, what will be the immediate economic consequence in the market?",
        options: [
          { id: "A", text: "Excess supply / surplus of milk" },
          { id: "B", text: "Excess demand / shortage of milk" },
          { id: "C", text: "Fall in quantity demanded" },
          { id: "D", text: "Increase in market price" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: A price ceiling is legally fixed BELOW the equilibrium price.",
          "Step 2: At this lower price, quantity demanded increases while quantity supplied by dairy producers decreases.",
          "Step 3: Hence $Q_d > Q_s$, creating an excess demand or shortage of milk. Option B is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Simultaneous Shifts Equal Change Result",
        frequency: "Very High",
        typicalStem: "When both market demand and market supply increase by an equal proportion, what happens to equilibrium price and quantity?",
        strategy: "Equilibrium quantity increases, but equilibrium price remains completely UNCHANGED.",
      },
      {
        patternType: "Price Ceiling and Floor Placement",
        frequency: "High",
        typicalStem: "Price ceiling is fixed ______ equilibrium price, while price floor is fixed ______ equilibrium price.",
        strategy: "Price ceiling = Below; Price floor = Above.",
      },
    ],
    commonTraps: [
      {
        concept: "Ceiling vs Floor Level Misconception",
        misconception: "Thinking a ceiling must be high up (above equilibrium) and a floor must be down low (below equilibrium).",
        correctUnderstanding: "To be legally binding and effective, **Price Ceiling is set BELOW equilibrium** (to protect consumers from high prices), and **Price Floor is set ABOVE equilibrium** (to protect producers from low prices).",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Price Controls Reversal Rule",
        mnemonic: "Ceiling is Below (C-B); Floor is Above (F-A).",
        explanation: "Never invert the placement of price controls in CUET.",
      },
    ],
    quickRevisionCard: {
      title: "Markets & Price Determination — Quick Card",
      bulletPoints: [
        "Perfect competition: Homogeneous goods $\\implies$ single uniform price across market.",
        "Free entry and exit $\\implies$ firms earn ONLY normal profit ($P = AC$) in long run.",
        "Industry is Price Maker; Firm is Price Taker ($P = AR = MR$).",
        "Equilibrium: $Q_d = Q_s$. Excess demand drives price up; excess supply drives price down.",
        "Equal increase in D & S $\\implies$ Quantity rises, Price UNCHANGED.",
        "Price Ceiling: Set BELOW equilibrium $\\implies$ Shortage, Rationing, Black Marketing.",
        "Price Floor (MSP): Set ABOVE equilibrium $\\implies$ Surplus, Buffer stock purchase.",
      ],
    },
    practiceQuestions: [
      {
        id: "eco_u3_t1_q1",
        question: "In a perfectly competitive market, the demand curve faced by an individual firm is:",
        options: [
          { id: "A", text: "Downward sloping" },
          { id: "B", text: "Perfectily elastic (horizontal straight line)" },
          { id: "C", text: "Perfectily inelastic (vertical straight line)" },
          { id: "D", text: "Upward sloping" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Because an individual firm is a price taker and products are homogeneous, the firm can sell any quantity at the given market price; its demand curve is horizontal and perfectly elastic.",
      },
      {
        id: "eco_u3_t1_q2",
        question: "A price ceiling set below the equilibrium market price leads to:",
        options: [
          { id: "A", text: "Excess supply (surplus)" },
          { id: "B", text: "Excess demand (shortage)" },
          { id: "C", text: "Fall in demand" },
          { id: "D", text: "Equilibrium restoration automatically" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "When price is held below equilibrium, consumers demand more than suppliers are willing to produce ($Q_d > Q_s$), leading to a market shortage.",
      },
      {
        id: "eco_u3_t1_q3",
        question: "If both market demand and market supply increase by the same magnitude, what will happen to the equilibrium price and equilibrium quantity?",
        options: [
          { id: "A", text: "Price rises, quantity rises" },
          { id: "B", text: "Price remains unchanged, quantity rises" },
          { id: "C", text: "Price falls, quantity remains unchanged" },
          { id: "D", text: "Price falls, quantity rises" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "An equal rightward shift in demand and supply leaves the equilibrium price unchanged while equilibrium quantity unambiguously expands.",
      },
      {
        id: "eco_u3_t1_q4",
        question: "Minimum Support Price (MSP) for agricultural crops fixed by the government is an example of:",
        options: [
          { id: "A", text: "Price Ceiling" },
          { id: "B", text: "Price Floor" },
          { id: "C", text: "Rationing price" },
          { id: "D", text: "Monopoly pricing" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "MSP is a legally mandated minimum price set above equilibrium to guarantee remunerative returns to farmers $\\implies$ Price Floor.",
      },
      {
        id: "eco_u3_t1_q5",
        question: "In the long run, firms under perfect competition earn:",
        options: [
          { id: "A", text: "Supernormal profits" },
          { id: "B", text: "Normal profits only" },
          { id: "C", text: "Subnormal profits (losses)" },
          { id: "D", text: "Monopoly rents" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Due to free entry and exit, any supernormal profit attracts new firms until price equals average cost ($P = AC$), leaving only normal profits.",
      },
      {
        id: "eco_u3_t1_q6",
        question: "Which of the following is NOT a feature of a perfectly competitive market?",
        options: [
          { id: "A", text: "Large number of buyers and sellers" },
          { id: "B", text: "Heterogeneous and differentiated products" },
          { id: "C", text: "Freedom of entry and exit" },
          { id: "D", text: "Perfect knowledge among market participants" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Products in perfect competition are strictly homogeneous and perfect substitutes, not differentiated.",
      },
      {
        id: "eco_u3_t1_q7",
        question: "If market supply is perfectly inelastic (vertical line), an increase in market demand will cause:",
        options: [
          { id: "A", text: "Equilibrium price to rise while quantity remains constant" },
          { id: "B", text: "Equilibrium quantity to rise while price remains constant" },
          { id: "C", text: "Both price and quantity to rise" },
          { id: "D", text: "Both price and quantity to fall" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "When supply cannot expand (perfectly inelastic), any increase in demand results solely in bidding up the equilibrium price, with output fixed.",
      },
      {
        id: "eco_u3_t1_q8",
        question: "In a competitive market where demand equation is Qd = 80 - 2P and supply equation is Qs = 20 + 4P, what is the equilibrium price?",
        options: [
          { id: "A", text: "₹10" },
          { id: "B", text: "₹15" },
          { id: "C", text: "₹8" },
          { id: "D", text: "₹12" },
        ],
        correctOption: "A",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "easy",
        explanation: "$80 - 2P = 20 + 4P \\implies 60 = 6P \\implies P = 10$.",
      },
      {
        id: "eco_u3_t1_q9",
        question: "One of the undesirable adverse consequences of imposing a price ceiling on essential goods is:",
        options: [
          { id: "A", text: "Emergence of black marketing" },
          { id: "B", text: "Accumulation of massive unsold surpluses" },
          { id: "C", text: "Excessive profits for producers" },
          { id: "D", text: "Fall in consumer demand" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Because demand exceeds supply at the ceiling price, illegal black markets develop where goods are sold at high unofficial prices.",
      },
      {
        id: "eco_u3_t1_q10",
        question: "Under perfect competition, who determines the market price?",
        options: [
          { id: "A", text: "The largest firm in the industry" },
          { id: "B", text: "The industry through market forces of demand and supply" },
          { id: "C", text: "A trade union" },
          { id: "D", text: "The consumer forum" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The industry acts as the price maker through the aggregate intersection of total market demand and total market supply.",
      },
    ],
  },
];
