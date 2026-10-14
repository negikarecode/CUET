import { NoteDocument } from "@/types/notes";

export const sociologyUnits1to4Topics: NoteDocument[] = [
  // -------------------------------------------------------------------------
  // UNIT 1: Structure of Indian Society
  // -------------------------------------------------------------------------
  {
    id: "sociology_u1_t1",
    slug: "demographic-structure-rural-urban-linkages-and-divisions",
    subject: "sociology",
    subjectName: "Sociology",
    subjectCode: "325",
    unitNumber: 1,
    unitTitle: "Structure of Indian Society",
    topicTitle: "Demographic Structure, Rural-Urban Linkages and Divisions",
    ncertReference: {
      class: "12",
      book: "Indian Society",
      chapterNumber: 2,
      chapterName: "The Demographic Structure of the Indian Society",
      sections: [
        "Demography: Formal Demography vs Social Demography",
        "Theories of Population: Malthusian Theory and Demographic Transition",
        "Common Concepts: CBR, CDR, TFR, Sex Ratio, Child Sex Ratio",
        "Age Structure of the Indian Population & The Demographic Dividend",
        "Rural-Urban Linkages, Divisions, and Urbanisation Dynamics",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (20+ questions across sets)",
      totalPyqsInRepo: 42,
      weightagePercentage: 11.0,
    },
    summary30Seconds: [
      "Formal Demography measures quantitative population metrics; Social Demography investigates causes and social consequences of demographic change.",
      "Malthusian Theory (1798): Population grows geometrically (1, 2, 4, 8, 16...), food production arithmetically (1, 2, 3, 4, 5...); kept in check by Positive checks (famines, war) and Preventive checks (late marriage, celibacy).",
      "Demographic Transition: Stage 1 (High CBR/CDR), Stage 2 (High CBR, plunging CDR = explosion), Stage 3 (Low CBR/CDR = stability).",
      "Demographic Dividend: Temporary window where the proportion of working-age population (15-64) exceeds the dependent population (0-14 and 65+).",
      "Census 2011: National Sex Ratio = 943 females per 1000 males; Child Sex Ratio (0-6 yrs) dropped to an alarming 919 (female foeticide, son preference); Urbanisation rate = 31.16%.",
    ],
    coreConcepts: [
      {
        title: "1. Formal vs Social Demography & Malthusian Theory",
        content:
          "Demography (Greek *demos* = people, *graphein* = describe) studies human populations:\n\n" +
          "• **Formal Demography**: Purely quantitative mathematical study of population statistics (births, deaths, migrations, age-sex structures, rates).\n" +
          "• **Social Demography (Population Studies)**: Analyses social, economic, cultural, and political causes and consequences of demographic changes.\n\n" +
          "• **Thomas Robert Malthus — Essay on the Principle of Population (1798)**:\n" +
          "  - **Core Premise**: Human populations naturally increase at a **geometric rate** ($1, 2, 4, 8, 16, 32, \\dots$), whereas food supply can only increase at an **arithmetic rate** ($1, 2, 3, 4, 5, \\dots$).\n" +
          "  - Hence, population growth inevitably outstrips agricultural subsistence, leading to permanent poverty and hunger (**Malthusian Trap**).\n" +
          "  - **Two Types of Checks**:\n" +
          "    1. *Positive Checks* (Natural catastrophes): Famines, pestilence, epidemics, and wars that restore population to subsistence levels.\n" +
          "    2. *Preventive Checks* (Human volition): Postponing marriage, moral restraint, and celibacy.\n" +
          "  - *Critique of Malthus*: Disproved by the Green Revolution, industrialisation, and modern contraception; food production outstripped population growth in Europe.",
        ncertPointers: [
          "Geometric progression (population) vs Arithmetic progression (food supply).",
          "Malthus identified Positive checks (famines/disease) and Preventive checks (moral restraint).",
        ],
      },
      {
        title: "2. Key Demographic Indicators in Indian Context",
        content:
          "• **Crude Birth Rate (CBR)**: Live births per 1,000 mid-year population.\n" +
          "• **Crude Death Rate (CDR)**: Deaths per 1,000 mid-year population.\n" +
          "• **Total Fertility Rate (TFR)**: The average number of children that would be born to a woman during her childbearing years (15–49 years). **Replacement level TFR is 2.1**.\n" +
          "• **Infant Mortality Rate (IMR)**: Number of infants dying before reaching one year of age per 1,000 live births.\n" +
          "• **Maternal Mortality Ratio (MMR)**: Number of women dying due to pregnancy-related causes per 100,000 live births.\n\n" +
          "• **Sex Ratio in India (Census 2011)**:\n" +
          "  - Overall Sex Ratio: **943 females per 1,000 males** (an improvement from 933 in 2001).\n" +
          "  - **Child Sex Ratio (0–6 years)**: Experienced a catastrophic decline from **927 in 2001 to 919 in 2011**, revealing widespread sex-selective abortions (son preference, dowry pressures, misuse of ultrasound).\n" +
          "  - States with lowest Child Sex Ratio: Haryana (834), Punjab (846), Jammu & Kashmir.",
        ncertPointers: [
          "Replacement level TFR = 2.1.",
          "Census 2011: Overall Sex Ratio = 943; Child Sex Ratio (0-6 yrs) = 919 (alarming drop).",
        ],
      },
      {
        title: "3. Age Structure & The Demographic Dividend",
        content:
          "Age structure refers to the proportion of persons in various age groups:\n\n" +
          "• **Dependency Ratio**:\n" +
          "  $$\\text{Dependency Ratio} = \\frac{\\text{Population (0–14)} + \\text{Population (65+)}}{\\text{Working-Age Population (15–64)}} \\times 100$$\n" +
          "• **The Demographic Dividend**:\n" +
          "  - Occurs when the proportion of working-age population (15–64) is significantly larger than the dependent population.\n" +
          "  - India is currently undergoing this demographic window: median age of India is ~28 years (one of the youngest nations in the world).\n" +
          "  - **Economic Potential**: Higher workforce participation, increased savings, higher economic productivity, and lower social dependency.\n" +
          "  - **Crucial Policy Prerequisite**: Demographic dividend does NOT automatically translate into prosperity; without quality education, healthcare, and employment generation, it risks becoming a **demographic disaster** of mass youth unemployment.",
        ncertPointers: [
          "Dependency ratio formula: (Dependent population / Working population) * 100.",
          "Demographic dividend relies on the bulge in the 15-59/64 age cohort.",
        ],
      },
      {
        title: "4. Rural-Urban Linkages & Urbanisation Dynamics",
        content:
          "• **Rural-Urban Continuum**:\n" +
          "  - The village and the city are not isolated binaries, but interconnected through flows of labour, goods, capital, and media.\n" +
          "  - **Footloose Labour & Circular Migration**: Rural laborers from UP, Bihar, and Odisha work in brick kilns, construction sites, and informal urban jobs in Maharashtra and Delhi, sending remittances home.\n" +
          "• **Urbanisation in India**:\n" +
          "  - According to Census 2011, **31.16%** of India's population resides in urban areas (up from 27.8% in 2001).\n" +
          "  - Growth of **Million-Plus Cities**: 53 urban agglomerations exceed 1 million population (Greater Mumbai, Delhi, Kolkata, Chennai, Bengaluru).\n" +
          "  - Phenomenon of **Slumisation and Urban Informality**: Inadequate urban planning forces migrants into informal squatter settlements lacking potable water and sanitation.",
        ncertPointers: [
          "Census 2011 urban population percentage: 31.16%.",
          "There are 53 million-plus cities in India in the 2011 Census.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Malthusian Progression Contrast",
        formula: "Population (Geometric: 1, 2, 4, 8, 16...) vs Food (Arithmetic: 1, 2, 3, 4, 5...)",
        symbols: "Malthusian Trap",
        siUnits: "Demographic Growth Theory",
        applicationCondition: "Direct mathematical growth formula identification",
        notes: "Malthus published his essay anonymously in 1798.",
      },
      {
        name: "Dependency Ratio Formula",
        formula: "Dependency Ratio = [(Pop 0-14 + Pop 65+) / Pop 15-64] × 100",
        symbols: "DR = (D / W) × 100",
        siUnits: "Demographic dependency percentage",
        applicationCondition: "Calculating dependency ratio or demographic dividend",
        notes: "Falling dependency ratio creates the demographic dividend.",
      },
      {
        name: "Census 2011 Demographic Benchmarks",
        formula: "Sex Ratio (943) | Child Sex Ratio (919) | Urbanisation (31.16%) | Replacement TFR (2.1)",
        symbols: "Vital statistics of India",
        siUnits: "National demographic census indicators",
        applicationCondition: "Factual numerical MCQs in CUET",
        notes: "Child sex ratio tracks girls per 1000 boys in 0-6 years age bracket.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Malthusian Growth vs Demographic Dividend",
      caption: "Geometric vs Arithmetic progression and the age structure demographic dividend.",
      code: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <!-- Left: Malthus Curves -->
        <rect x="25" y="30" width="310" height="175" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
        <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="13">Malthusian Principle of Population</text>
        <path d="M 50,180 Q 150,170 200,120 Q 240,70 300,65" fill="none" stroke="#dc2626" stroke-width="3"/>
        <text x="280" y="60" fill="#dc2626" font-weight="bold" font-size="10">Population (Geometric)</text>
        <line x1="50" y1="180" x2="300" y2="110" stroke="#0284c7" stroke-width="3"/>
        <text x="240" y="105" fill="#0284c7" font-weight="bold" font-size="10">Food (Arithmetic)</text>
        <circle cx="215" cy="132" r="5" fill="#f59e0b"/>
        <text x="215" y="150" text-anchor="middle" font-weight="bold" fill="#b45309" font-size="10">Crisis Point</text>

        <!-- Right: Demographic Dividend Bulge -->
        <rect x="365" y="30" width="310" height="175" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
        <text x="520" y="55" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="13">India's Demographic Dividend</text>
        <!-- Age Pyramid -->
        <rect x="470" y="75" width="100" height="25" fill="#cbd5e1" rx="3"/>
        <text x="520" y="92" text-anchor="middle" font-size="10" fill="#334155">Elderly (65+) - 5%</text>

        <rect x="420" y="105" width="200" height="40" fill="#34d399" rx="3"/>
        <text x="520" y="130" text-anchor="middle" font-weight="bold" font-size="12" fill="#064e3b">Working Age (15-64) - 65%</text>

        <rect x="450" y="150" width="140" height="30" fill="#93c5fd" rx="3"/>
        <text x="520" y="170" text-anchor="middle" font-size="10" fill="#1e3a8a">Children (0-14) - 30%</text>
        <text x="520" y="195" text-anchor="middle" font-weight="bold" fill="#047857" font-size="11">Bulge in Productive Workforce</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <!-- Left: Malthus Curves -->
      <rect x="25" y="30" width="310" height="175" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
      <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="13">Malthusian Principle of Population</text>
      <path d="M 50,180 Q 150,170 200,120 Q 240,70 300,65" fill="none" stroke="#dc2626" stroke-width="3"/>
      <text x="280" y="60" fill="#dc2626" font-weight="bold" font-size="10">Population (Geometric)</text>
      <line x1="50" y1="180" x2="300" y2="110" stroke="#0284c7" stroke-width="3"/>
      <text x="240" y="105" fill="#0284c7" font-weight="bold" font-size="10">Food (Arithmetic)</text>
      <circle cx="215" cy="132" r="5" fill="#f59e0b"/>
      <text x="215" y="150" text-anchor="middle" font-weight="bold" fill="#b45309" font-size="10">Crisis Point</text>

      <!-- Right: Demographic Dividend Bulge -->
      <rect x="365" y="30" width="310" height="175" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
      <text x="520" y="55" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="13">India's Demographic Dividend</text>
      <!-- Age Pyramid -->
      <rect x="470" y="75" width="100" height="25" fill="#cbd5e1" rx="3"/>
      <text x="520" y="92" text-anchor="middle" font-size="10" fill="#334155">Elderly (65+) - 5%</text>

      <rect x="420" y="105" width="200" height="40" fill="#34d399" rx="3"/>
      <text x="520" y="130" text-anchor="middle" font-weight="bold" font-size="12" fill="#064e3b">Working Age (15-64) - 65%</text>

      <rect x="450" y="150" width="140" height="30" fill="#93c5fd" rx="3"/>
      <text x="520" y="170" text-anchor="middle" font-size="10" fill="#1e3a8a">Children (0-14) - 30%</text>
      <text x="520" y="195" text-anchor="middle" font-weight="bold" fill="#047857" font-size="11">Bulge in Productive Workforce</text>
    </svg>`,
    workedExamples: [
      {
        id: "sociology_u1_we1",
        questionNumber: 1,
        question:
          "According to Thomas Robert Malthus, while human population grows at a ____________ progression, agricultural food supply increases at a ____________ progression.\n" +
          "(A) Arithmetic, Geometric\n" +
          "(B) Geometric, Arithmetic\n" +
          "(C) Exponential, Logarithmic\n" +
          "(D) Constant, Variable",
        options: [
          { id: "A", text: "Arithmetic, Geometric" },
          { id: "B", text: "Geometric, Arithmetic" },
          { id: "C", text: "Exponential, Logarithmic" },
          { id: "D", text: "Constant, Variable" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: In his 1798 'Essay on the Principle of Population', Malthus famously argued that population multiplies geometrically (1, 2, 4, 8, 16...).",
          "Step 2: Meanwhile, food production can only expand arithmetically (1, 2, 3, 4, 5...) due to the law of diminishing returns on land.",
          "Step 3: Correct sequence is Geometric, Arithmetic (Option B).",
        ],
        cuetTip: "Population = Geometric (multiplication); Food = Arithmetic (addition).",
      },
      {
        id: "sociology_u1_we2",
        questionNumber: 2,
        question:
          "Which of the following demographic phenomena is defined as the economic growth potential that results when a country's working-age population is larger than the dependent population?\n" +
          "(A) Demographic Transition\n" +
          "(B) Demographic Dividend\n" +
          "(C) Demographic Trap\n" +
          "(D) Total Fertility Surge",
        options: [
          { id: "A", text: "Demographic Transition" },
          { id: "B", text: "Demographic Dividend" },
          { id: "C", text: "Demographic Trap" },
          { id: "D", text: "Total Fertility Surge" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: The demographic dividend occurs due to falling fertility rates, which shrinks the youth dependency ratio.",
          "Step 2: The working-age cohort (15-64) expands relative to dependent age groups (0-14 and 65+).",
          "Step 3: This window of productive potential is termed the Demographic Dividend (Option B).",
        ],
        cuetTip: "Bulge in working-age population (15-64) = Demographic Dividend.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Census 2011 Data Accuracy",
        frequency: "Very High",
        typicalStem: "As per Census 2011, what is the Child Sex Ratio (0-6 years) in India?",
        strategy: "Remember the drop: Overall sex ratio is 943, but Child sex ratio fell to 919.",
      },
      {
        patternType: "Malthusian Checks Classification",
        frequency: "High",
        typicalStem: "Which of the following is classified as a 'Positive Check' by Thomas Malthus?",
        strategy: "Positive checks are natural disasters and mortality drivers (famines, disease, war). Preventive checks are voluntary human decisions (celibacy, late marriage).",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing Overall Sex Ratio (943) with Child Sex Ratio (919).",
        whyWrong: "Students often cite 943 when asked for child sex ratio. The child sex ratio (0-6 years) is significantly worse at 919.",
        correctUnderstanding: "Overall = 943; Child (0-6 yrs) = 919.",
        trapOptionExample: "Stating child sex ratio improved to 943 in 2011.",
      },
      {
        misconception: "Believing Demographic Dividend automatically produces economic growth.",
        whyWrong: "NCERT emphatically notes that demographic dividend is merely an opportunity window; without jobs, healthcare, and education, it leads to mass youth discontent.",
        correctUnderstanding: "Demographic dividend requires investment in human capital and job creation.",
        trapOptionExample: "Option stating demographic dividend guarantees high GDP growth without policy intervention.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Census 2011 Sex Ratios",
        mnemonic: "O-943 / C-919",
        rule: "Overall = 943 | Child = 919",
        explanation: "Keep the two vital sex ratio statistics crystal clear.",
      },
      {
        title: "Malthus Checks",
        mnemonic: "P-N / P-V",
        rule: "Positive = Nature/Death (Famines) | Preventive = Voluntary/Restraint (Late marriage)",
        explanation: "Never reverse positive and preventive checks.",
      },
    ],
    quickRevisionCard: {
      title: "Structure of Indian Society — 60-Second Flash Card",
      bulletPoints: [
        "Formal Demography (quantitative stats) vs Social Demography (societal causes/effects).",
        "Malthus (1798): Population grows geometrically (2,4,8,16), food arithmetically (1,2,3,4).",
        "Malthusian Checks: Positive (famines, war) vs Preventive (moral restraint, late marriage).",
        "Demographic Transition: Stage 1 (High CBR/CDR), Stage 2 (Explosion), Stage 3 (Stability).",
        "Replacement TFR = 2.1 children per woman.",
        "Census 2011: National Sex Ratio = 943; Child Sex Ratio (0-6 yrs) = 919 (fell from 927 in 2001).",
        "Urbanisation Rate: 31.16% (Census 2011); 53 million-plus cities in India.",
        "Demographic Dividend: Bulge in 15-64 age group; median age ~28 years.",
      ],
      examTricks: [
        "Dependency ratio = (0-14 + 65+) / (15-64) * 100.",
        "Child sex ratio measures females per 1000 males aged 0 to 6 years.",
      ],
    },
    practiceQuestions: [
      {
        id: "sociology_u1_q1",
        question: "Who authored the influential 'Essay on the Principle of Population' in 1798?",
        type: "standard",
        options: [
          { id: "A", text: "Karl Marx" },
          { id: "B", text: "Thomas Robert Malthus" },
          { id: "C", text: "Emile Durkheim" },
          { id: "D", text: "Max Weber" },
        ],
        correctOption: "B",
        explanation: "Thomas Robert Malthus published 'An Essay on the Principle of Population' in 1798.",
        difficulty: "easy",
      },
      {
        id: "sociology_u1_q2",
        question: "According to the 2011 Census of India, what is the national sex ratio (females per 1,000 males)?",
        type: "standard",
        options: [
          { id: "A", text: "927" },
          { id: "B", text: "933" },
          { id: "C", text: "943" },
          { id: "D", text: "950" },
        ],
        correctOption: "C",
        explanation: "The overall national sex ratio in Census 2011 was 943 females per 1,000 males.",
        difficulty: "easy",
      },
      {
        id: "sociology_u1_q3",
        question:
          "Assertion (A): The Child Sex Ratio (0-6 years) in India showed a distressing decline in the 2011 Census.\n" +
          "Reason (R): Widespread availability of prenatal sex determination technology combined with persistent socio-cultural son preference resulted in female foeticide.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "The child sex ratio dropped to 919 in 2011 primarily due to illegal sex-selective abortions driven by patriarchal son preference.",
        difficulty: "easy",
      },
      {
        id: "sociology_u1_q4",
        question: "What is the Total Fertility Rate (TFR) required for a population to achieve 'replacement level' stability?",
        type: "standard",
        options: [
          { id: "A", text: "1.5" },
          { id: "B", text: "2.1" },
          { id: "C", text: "2.5" },
          { id: "D", text: "3.0" },
        ],
        correctOption: "B",
        explanation: "A Total Fertility Rate of 2.1 is universally regarded as the replacement-level fertility rate.",
        difficulty: "easy",
      },
      {
        id: "sociology_u1_q5",
        question:
          "Match List-I (Demographic Concept) with List-II (Definition / Value):\n" +
          "List-I:\n" +
          "p. Child Sex Ratio (2011)\n" +
          "q. Urban Population (2011)\n" +
          "r. Dependency Ratio\n" +
          "s. Preventive Check\n" +
          "List-II:\n" +
          "1. 31.16%\n" +
          "2. Ratio of dependents (0-14 & 65+) to working-age population\n" +
          "3. 919 females per 1,000 males\n" +
          "4. Postponing marriage and moral restraint\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-3, q-1, r-2, s-4" },
          { id: "B", text: "p-1, q-3, r-2, s-4" },
          { id: "C", text: "p-3, q-2, r-1, s-4" },
          { id: "D", text: "p-4, q-1, r-2, s-3" },
        ],
        correctOption: "A",
        explanation: "Child sex ratio (p-3: 919), Urban pop (q-1: 31.16%), Dependency ratio (r-2: Dependent to working), Preventive check (s-4: Postponing marriage).",
        difficulty: "easy",
      },
      {
        id: "sociology_u1_q6",
        question: "Which Indian state recorded the lowest Child Sex Ratio (0-6 years) in Census 2011?",
        type: "standard",
        options: [
          { id: "A", text: "Punjab" },
          { id: "B", text: "Haryana" },
          { id: "C", text: "Rajasthan" },
          { id: "D", text: "Uttar Pradesh" },
        ],
        correctOption: "B",
        explanation: "Haryana recorded the lowest child sex ratio in India at 834 females per 1,000 males.",
        difficulty: "easy",
      },
      {
        id: "sociology_u1_q7",
        question: "Which of the following is considered a 'Positive Check' in Malthusian theory?",
        type: "standard",
        options: [
          { id: "A", text: "Late marriage" },
          { id: "B", text: "Voluntary celibacy" },
          { id: "C", text: "Famines and epidemics" },
          { id: "D", text: "Use of contraceptives" },
        ],
        correctOption: "C",
        explanation: "Positive checks are natural and mortality-increasing events such as famines, plagues, and wars that curb population growth.",
        difficulty: "easy",
      },
      {
        id: "sociology_u1_q8",
        question:
          "Assertion (A): The demographic dividend provides a substantial window of economic growth for India.\n" +
          "Reason (R): A large working-age population automatically ensures high GDP growth irrespective of employment opportunities.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "C",
        explanation: "Statement (A) is true, but (R) is false because the demographic dividend does not automatically create growth without jobs, education, and health investments.",
        difficulty: "medium",
      },
      {
        id: "sociology_u1_q9",
        question: "What was the total number of 'Million-Plus Cities' (urban agglomerations) in India according to Census 2011?",
        type: "standard",
        options: [
          { id: "A", text: "35" },
          { id: "B", text: "45" },
          { id: "C", text: "53" },
          { id: "D", text: "68" },
        ],
        correctOption: "C",
        explanation: "Census 2011 recorded 53 million-plus urban agglomerations in India, up from 35 in 2001.",
        difficulty: "medium",
      },
      {
        id: "sociology_u1_q10",
        question: "The study of causes and social consequences of demographic phenomena is known as:",
        type: "standard",
        options: [
          { id: "A", text: "Formal Demography" },
          { id: "B", text: "Social Demography" },
          { id: "C", text: "Anthropogeography" },
          { id: "D", text: "Sociometry" },
        ],
        correctOption: "B",
        explanation: "Social demography analyses the broader social, cultural, and political dynamics of population changes.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Introduction to Indian Society"],
      relatedTopics: ["Social Institutions: Continuity and Change", "Social Inequality and Exclusion"],
      practiceTestId: "practice-sociology-unit1-test1",
      practiceTestUrl: "/test/practice-sociology-unit1-test1",
      weaknessReportUrl: "/dashboard/radar?subject=sociology",
      weaknessRadarUrl: "/dashboard/radar?subject=sociology",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 2: Social Institutions: Continuity and Change
  // -------------------------------------------------------------------------
  {
    id: "sociology_u2_t1",
    slug: "caste-tribe-family-and-kinship-in-india",
    subject: "sociology",
    subjectName: "Sociology",
    subjectCode: "325",
    unitNumber: 2,
    unitTitle: "Social Institutions: Continuity and Change",
    topicTitle: "Caste, Tribe, Family and Kinship in India",
    ncertReference: {
      class: "12",
      book: "Indian Society",
      chapterNumber: 3,
      chapterName: "Social Institutions: Continuity and Change",
      sections: [
        "Caste and the Caste System: Varna vs Jati, Ghurye's Features",
        "Colonialism and Caste: 1901 Census by Herbert Risley",
        "Caste in Contemporary India: M.N. Srinivas (Dominant Caste, Sanskritisation)",
        "Tribal Communities: Permanent vs Acquired Traits, Isolation vs Assimilation",
        "Family and Kinship: Nuclear vs Extended, Patriliny vs Matriliny (Khasi, Garo, Nair)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (24+ questions across sets)",
      totalPyqsInRepo: 48,
      weightagePercentage: 12.0,
    },
    summary30Seconds: [
      "Varna vs Jati: Varna is the 4-fold scriptural textual category (Brahmin, Kshatriya, Vaishya, Shudra); Jati is the real-world, localized, endogamous, occupational group numbering in thousands.",
      "G.S. Ghurye's 6 features of caste: Segmental division, Hierarchy, Restrictions on feeding/social intercourse, Civil/religious disabilities & privileges, Lack of unrestricted choice of occupation, Endogamy.",
      "M.N. Srinivas Concepts: Dominant Caste (large numbers, landownership, political clout, ritual status, e.g. Jats, Vokkaligas, Reddys, Yadavs) and Sanskritisation.",
      "Tribes: Classified by permanent traits (region, language, race) and acquired traits; Debates: Isolationism (Verrier Elwin) vs Assimilation (G.S. Ghurye) vs Nehru's Tribal Panchsheel.",
      "Family: Matrilineal systems (Khasis and Garos in Meghalaya, Nairs of Kerala).",
    ],
    coreConcepts: [
      {
        title: "1. Caste: Varna vs Jati & Classical Features",
        content:
          "Caste is derived from Portuguese *casta* meaning pure breed:\n\n" +
          "• **Varna vs Jati**:\n" +
          "  - **Varna**: Ancient four-fold textual classification: **Brahmin** (priests/teachers), **Kshatriya** (rulers/warriors), **Vaishya** (traders/cultivators), **Shudra** (servants/labourers). Outcastes (*Panchamas* / Untouchables) were excluded from the chaturvarna scheme.\n" +
          "  - **Jati**: Complex, localized, regionally specific, endogamous groupings (thousands across India) with traditional occupational links.\n\n" +
          "• **G.S. Ghurye's Six Definitive Features of the Caste System**:\n" +
          "  1. **Segmental Division of Society**: Membership is strictly determined by birth (ascribed status); no upward mobility across castes.\n" +
          "  2. **Hierarchy**: Rigid rank order based on ritual notions of purity and pollution.\n" +
          "  3. **Restrictions on Feeding and Social Intercourse**: Rules dictating who can share water and food (Pakka vs Kachcha food).\n" +
          "  4. **Civil and Religious Disabilities and Privileges**: Segregated residential spaces (untouchables forced outside village boundaries; denied access to temples and public wells).\n" +
          "  5. **Lack of Unrestricted Choice of Occupation**: Occupations were traditionally hereditary; clean vs unclean work.\n" +
          "  6. **Endogamy**: Marriage strictly within one's own sub-caste or jati (the single most persistent feature).",
        ncertPointers: [
          "Endogamy is the single most enduring, definitive feature of the caste system.",
          "G.S. Ghurye identified the 6 structural features of the caste system.",
        ],
      },
      {
        title: "2. Colonial Impact & Srinivas's 'Dominant Caste'",
        content:
          "• **Colonialism and Caste**:\n" +
          "  - British colonial ethnography rigidified and institutionalised caste boundaries.\n" +
          "  - **1901 Census by Sir Herbert Risley**: Attempted to officially rank and record castes based on social precedence; triggered frantic petitioning by jatis claiming higher varna origins.\n" +
          "  - **Government of India Act 1935**: Officially introduced the legal schedule of 'Scheduled Castes' (SC) and 'Scheduled Tribes' (ST).\n\n" +
          "• **M.N. Srinivas — The Concept of 'Dominant Caste'**:\n" +
          "  - Formulated in his study of **Rampur village** in Mysore (Karnataka).\n" +
          "  - Four defining criteria of a Dominant Caste:\n" +
          "    1. **Sizeable population** (numerical strength in the village/region).\n" +
          "    2. **Control over land** (substantial agricultural landownership created post-land reforms).\n" +
          "    3. **Political power and muscle** (influence over village panchayats and local elections).\n" +
          "    4. **Intermediate or respectable ritual status** in local hierarchy.\n" +
          "  - Prominent Examples in India:\n" +
          "    * **Jats** (Punjab, Haryana, Western UP)\n" +
          "    * **Yadavs** (Bihar and Uttar Pradesh)\n" +
          "    * **Vokkaligas and Lingayats** (Karnataka)\n" +
          "    * **Reddys and Kammas** (Andhra Pradesh and Telangana)\n" +
          "    * **Marathas** (Maharashtra)",
        ncertPointers: [
          "1901 Census was conducted by Herbert Risley (social precedence ranking).",
          "Four criteria of Dominant Caste: Numerical size, Landownership, Political power, Ritual status.",
        ],
      },
      {
        title: "3. Tribal Communities: Classification & Integration Debates",
        content:
          "Tribes (Adivasis) in India constitute ~8.6% of the population (2011 Census):\n\n" +
          "• **Classification Criteria**:\n" +
          "  - **Permanent Traits**:\n" +
          "    * *Region*: Middle/Central India (85% of tribal population: MP, Odisha, Jharkhand, Chhattisgarh, Maharashtra, Gujarat, Rajasthan); North-East (highest proportion of state populations: Mizoram, Nagaland, Meghalaya).\n" +
          "    * *Language*: Indo-Aryan, Dravidian, Austric (Munda, Santhali), Tibeto-Burman.\n" +
          "    * *Physical Type*: Negrito, Australoid, Mongoloid, Dravidian.\n" +
          "  - **Acquired Traits**: Livelihood classification (hunting-gathering, shifting cultivation, settled peasantry, industrial plantation labour) and degree of assimilation into mainstream Hinduism or Christianity.\n\n" +
          "• **Historical Tribal Debates**:\n" +
          "  - **Isolationists (Verrier Elwin)**: Argued that tribes needed protection from exploitative moneylenders, traders, and liquor vendors; proposed 'National Parks' to preserve pristine tribal culture.\n" +
          "  - **Assimilationists (G.S. Ghurye)**: Argued that tribes were merely 'Backward Hindus' who should be assimilated into mainstream Hindu fold.\n" +
          "  - **Nehru's Tribal Panchsheel**: Middle path; respect tribal rights in land and forest, encourage development through their own genius without imposing outside culture.",
        ncertPointers: [
          "G.S. Ghurye termed tribes as 'Backward Hindus'.",
          "Verrier Elwin advocated the Isolationist / National Park approach.",
        ],
      },
      {
        title: "4. Family and Kinship: Nuclear vs Extended & Matriliny",
        content:
          "• **Family Structure**:\n" +
          "  - **Nuclear Family**: Consists of one set of parents and their unmarried children.\n" +
          "  - **Extended / Joint Family**: Multi-generational household consisting of parents, married sons, daughters-in-law, and grandchildren sharing a common hearth and property.\n\n" +
          "• **Lineage and Residence Rules**:\n" +
          "  - **Patrilineal & Patrilocal**: Descent and inheritance traced through male line; wife relocates to husband's home (predominant in India).\n" +
          "  - **Matrilineal & Matrilocal**: Descent and property inheritance traced through female line; husband relocates to wife's home:\n" +
          "    * **Khasi and Garo Tribes of Meghalaya**:\n" +
          "      - Among Khasis, ancestral property is inherited by the youngest daughter (**Ka Khadduh**).\n" +
          "      - *Matrilineal vs Matriarchal*: Khasis are matrilineal (property passes mother to daughter), but NOT matriarchal (political power and public authority remain in the hands of maternal uncles and men). Creates tension between husband and maternal uncle.",
        ncertPointers: [
          "Khasi youngest daughter who inherits ancestral property is the 'Ka Khadduh'.",
          "Matrilineal does NOT equal matriarchal; men still hold executive public authority.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Four Criteria of Dominant Caste (M.N. Srinivas)",
        formula: "Numerical Strength + Landownership + Political Clout + Respectable Ritual Rank",
        symbols: "Rampur Mysore Study",
        siUnits: "Agrarian Political Sociology",
        applicationCondition: "Identifying criteria and examples of Dominant Castes in CUET",
        notes: "Dominant castes intermediate in varna hierarchy transformed economic land power into political dominance.",
      },
      {
        name: "Tribal Debates Matrix",
        formula: "Isolationism (Verrier Elwin) vs Assimilation (G.S. Ghurye) vs Tribal Panchsheel (J.L. Nehru)",
        symbols: "Tribal policy paradigms",
        siUnits: "Anthropological policy frameworks",
        applicationCondition: "Match-the-following on tribal policy proponents",
        notes: "Ghurye argued tribes had been interacting with caste society for centuries as 'backward Hindus'.",
      },
      {
        name: "Varna vs Jati Distinction",
        formula: "Varna (4 pan-Indian theoretical categories) vs Jati (thousands of regional endogamous groups)",
        symbols: "Structural caste units",
        siUnits: "Social stratification",
        applicationCondition: "Contrasting textual varna with empirical jati",
        notes: "Panchamas (untouchables) were outside the four varnas.",
      },
    ],
    diagram: {
      type: "svg",
      title: "M.N. Srinivas: The Four Pillars of a Dominant Caste",
      caption: "Convergence of numerical, economic, political, and ritual elements creating regional dominance.",
      code: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <circle cx="350" cy="115" r="55" fill="#1e293b"/>
        <text x="350" y="110" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="13">DOMINANT</text>
        <text x="350" y="128" text-anchor="middle" font-weight="bold" fill="#38bdf8" font-size="13">CASTE</text>

        <!-- Pillar 1 -->
        <rect x="50" y="30" width="180" height="65" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
        <text x="140" y="58" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="12">1. Numerical Strength</text>
        <text x="140" y="78" text-anchor="middle" fill="#1d4ed8" font-size="10">Large population block</text>
        <line x1="230" y1="65" x2="300" y2="95" stroke="#64748b" stroke-width="2"/>

        <!-- Pillar 2 -->
        <rect x="470" y="30" width="180" height="65" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
        <text x="560" y="58" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="12">2. Landownership</text>
        <text x="560" y="78" text-anchor="middle" fill="#047857" font-size="10">Economic agrarian clout</text>
        <line x1="470" y1="65" x2="400" y2="95" stroke="#64748b" stroke-width="2"/>

        <!-- Pillar 3 -->
        <rect x="50" y="135" width="180" height="65" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
        <text x="140" y="163" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="12">3. Political Power</text>
        <text x="140" y="183" text-anchor="middle" fill="#78350f" font-size="10">Panchayat &amp; vote bank</text>
        <line x1="230" y1="165" x2="300" y2="135" stroke="#64748b" stroke-width="2"/>

        <!-- Pillar 4 -->
        <rect x="470" y="135" width="180" height="65" rx="8" fill="#fce7f3" stroke="#db2777" stroke-width="2"/>
        <text x="560" y="163" text-anchor="middle" font-weight="bold" fill="#9d174d" font-size="12">4. Respectable Ritual Rank</text>
        <text x="560" y="183" text-anchor="middle" fill="#831843" font-size="10">Intermediate clean caste</text>
        <line x1="470" y1="165" x2="400" y2="135" stroke="#64748b" stroke-width="2"/>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <circle cx="350" cy="115" r="55" fill="#1e293b"/>
      <text x="350" y="110" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="13">DOMINANT</text>
      <text x="350" y="128" text-anchor="middle" font-weight="bold" fill="#38bdf8" font-size="13">CASTE</text>

      <!-- Pillar 1 -->
      <rect x="50" y="30" width="180" height="65" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
      <text x="140" y="58" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="12">1. Numerical Strength</text>
      <text x="140" y="78" text-anchor="middle" fill="#1d4ed8" font-size="10">Large population block</text>
      <line x1="230" y1="65" x2="300" y2="95" stroke="#64748b" stroke-width="2"/>

      <!-- Pillar 2 -->
      <rect x="470" y="30" width="180" height="65" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
      <text x="560" y="58" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="12">2. Landownership</text>
      <text x="560" y="78" text-anchor="middle" fill="#047857" font-size="10">Economic agrarian clout</text>
      <line x1="470" y1="65" x2="400" y2="95" stroke="#64748b" stroke-width="2"/>

      <!-- Pillar 3 -->
      <rect x="50" y="135" width="180" height="65" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text x="140" y="163" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="12">3. Political Power</text>
      <text x="140" y="183" text-anchor="middle" fill="#78350f" font-size="10">Panchayat &amp; vote bank</text>
      <line x1="230" y1="165" x2="300" y2="135" stroke="#64748b" stroke-width="2"/>

      <!-- Pillar 4 -->
      <rect x="470" y="135" width="180" height="65" rx="8" fill="#fce7f3" stroke="#db2777" stroke-width="2"/>
      <text x="560" y="163" text-anchor="middle" font-weight="bold" fill="#9d174d" font-size="12">4. Respectable Ritual Rank</text>
      <text x="560" y="183" text-anchor="middle" fill="#831843" font-size="10">Intermediate clean caste</text>
      <line x1="470" y1="165" x2="400" y2="135" stroke="#64748b" stroke-width="2"/>
    </svg>`,
    workedExamples: [
      {
        id: "sociology_u2_we1",
        questionNumber: 1,
        question:
          "Which sociologist formulated the seminal concept of the 'Dominant Caste' based on fieldwork in Rampur village?\n" +
          "(A) G.S. Ghurye\n" +
          "(B) M.N. Srinivas\n" +
          "(C) Andre Beteille\n" +
          "(D) Yogendra Singh",
        options: [
          { id: "A", text: "G.S. Ghurye" },
          { id: "B", text: "M.N. Srinivas" },
          { id: "C", text: "Andre Beteille" },
          { id: "D", text: "Yogendra Singh" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: M.N. Srinivas conducted intensive participant observation in Rampur village (Karnataka).",
          "Step 2: He noted that certain intermediate castes wielded massive local power through large population numbers and landed wealth.",
          "Step 3: He termed this phenomenon the 'Dominant Caste'. Correct answer is M.N. Srinivas (Option B).",
        ],
        cuetTip: "Dominant Caste and Sanskritisation = M.N. Srinivas.",
      },
      {
        id: "sociology_u2_we2",
        questionNumber: 2,
        question:
          "Among the matrilineal Khasi community of Meghalaya, ancestral family property is inherited by the:\n" +
          "(A) Eldest son\n" +
          "(B) Eldest daughter\n" +
          "(C) Youngest daughter (Ka Khadduh)\n" +
          "(D) Maternal uncle",
        options: [
          { id: "A", text: "Eldest son" },
          { id: "B", text: "Eldest daughter" },
          { id: "C", text: "Youngest daughter (Ka Khadduh)" },
          { id: "D", text: "Maternal uncle" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Check NCERT Indian Society, Ch 3 on Matrilineal family structure in Meghalaya.",
          "Step 2: In Khasi society, matriliny dictates that ancestral property passes down to the youngest daughter, designated as 'Ka Khadduh'.",
          "Step 3: Option C is the correct answer.",
        ],
        cuetTip: "Khasi youngest daughter who inherits = Ka Khadduh.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Dominant Caste Identification by State",
        frequency: "Very High",
        typicalStem: "Which of the following castes is a prominent example of a 'Dominant Caste' in Karnataka?",
        strategy: "Vokkaligas and Lingayats in Karnataka; Jats in Haryana/Punjab; Yadavs in UP/Bihar; Reddys/Kammas in AP.",
      },
      {
        patternType: "Ghurye's Features of Caste",
        frequency: "High",
        typicalStem: "Which of the following is considered the most critical, enduring feature of caste by G.S. Ghurye?",
        strategy: "Endogamy (marrying only within one's caste/subcaste) is the defining institutional anchor.",
      },
    ],
    commonTraps: [
      {
        misconception: "Equating Matriliny with Matriarchy.",
        whyWrong: "In Matriliny, property and lineage trace through the female line, but men (especially the mother's brother) still hold executive political power and decision-making authority. Matriarchy (rule by women) has never historically existed in India.",
        correctUnderstanding: "Khasis are matrilineal, NOT matriarchal.",
        trapOptionExample: "Claiming Khasi society is matriarchal where women hold all state political authority.",
      },
      {
        misconception: "Confusing Varna with Jati.",
        whyWrong: "Varna is a pan-Indian scriptural four-fold ideological classification. Jati is the real-world, empirical, endogamous group numbering in the thousands.",
        correctUnderstanding: "Varna = 4 scriptural categories; Jati = Thousands of localized endogamous groups.",
        trapOptionExample: "Stating there are only four jatis in India.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Dominant Castes Across States",
        mnemonic: "J-Y-V-R-M",
        rule: "Jats (North) | Yadavs (UP/Bihar) | Vokkaligas (Karnataka) | Reddys (AP) | Marathas (Maharashtra)",
        explanation: "Matches every major dominant caste with its state.",
      },
      {
        title: "Tribal Debates Thinkers",
        mnemonic: "E-I / G-A / N-P",
        rule: "Elwin = Isolationist | Ghurye = Assimilationist | Nehru = Panchsheel",
        explanation: "Instantly links theorists to their tribal philosophies.",
      },
    ],
    quickRevisionCard: {
      title: "Caste, Tribe & Family — 60-Second Flash Card",
      bulletPoints: [
        "Varna (4 scriptural classes) vs Jati (thousands of local endogamous units).",
        "G.S. Ghurye: 6 features of caste (Hierarchy, Endogamy, Ascription, Purity/Pollution).",
        "1901 Census: Sir Herbert Risley ranked castes on social precedence.",
        "Dominant Caste (M.N. Srinivas): Large population, landownership, political clout, ritual status.",
        "Examples of Dominant Castes: Jats (North), Yadavs (UP/Bihar), Vokkaligas (Karnataka), Reddys (AP).",
        "Tribal Debates: Isolationism (Verrier Elwin), Assimilation/Backward Hindus (Ghurye), Panchsheel (Nehru).",
        "Matriliny: Descent & property through female line; Khasi youngest daughter = Ka Khadduh.",
        "Matriliny != Matriarchy; public political power remains with maternal uncles and men.",
      ],
      examTricks: [
        "Ghurye called tribes 'Backward Hindus'.",
        "Endogamy is the most enduring rule of the caste system.",
      ],
    },
    practiceQuestions: [
      {
        id: "sociology_u2_q1",
        question: "Who among the following sociologists characterized tribes as 'Backward Hindus'?",
        type: "standard",
        options: [
          { id: "A", text: "Verrier Elwin" },
          { id: "B", text: "G.S. Ghurye" },
          { id: "C", text: "M.N. Srinivas" },
          { id: "D", text: "J.L. Nehru" },
        ],
        correctOption: "B",
        explanation: "G.S. Ghurye argued that tribes were not distinct isolated groups but merely 'Backward Hindus' who had partially assimilated into caste society.",
        difficulty: "easy",
      },
      {
        id: "sociology_u2_q2",
        question: "Which of the following is considered the single most defining and enduring rule of the caste system?",
        type: "standard",
        options: [
          { id: "A", text: "Exogamy" },
          { id: "B", text: "Endogamy" },
          { id: "C", text: "Free occupational choice" },
          { id: "D", text: "Social equality" },
        ],
        correctOption: "B",
        explanation: "Endogamy—the strict rule requiring marriage only within one's own sub-caste or jati—is the structural pillar of the caste system.",
        difficulty: "easy",
      },
      {
        id: "sociology_u2_q3",
        question:
          "Assertion (A): In Khasi society, matriliny does not equate to matriarchy.\n" +
          "Reason (R): While ancestral property passes from mother to the youngest daughter, political and public authority resides primarily with men (maternal uncles).",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Matriliny refers to descent and property passing through the female line; men still control public authority and community governance.",
        difficulty: "medium",
      },
      {
        id: "sociology_u2_q4",
        question: "Which of the following is NOT one of M.N. Srinivas's four criteria of a 'Dominant Caste'?",
        type: "standard",
        options: [
          { id: "A", text: "Sizeable numerical strength in the local population" },
          { id: "B", text: "Ownership of a substantial portion of cultivable land" },
          { id: "C", text: "Highest rank in the classical textual Brahminical varna order" },
          { id: "D", text: "Significant political power and influence" },
        ],
        correctOption: "C",
        explanation: "Dominant castes are intermediate castes (often Shudra or peasant varnas), not the highest Brahminical caste; their dominance is empirical and landed.",
        difficulty: "medium",
      },
      {
        id: "sociology_u2_q5",
        question:
          "Match List-I (Dominant Caste) with List-II (State of Dominance):\n" +
          "List-I:\n" +
          "p. Vokkaligas and Lingayats\n" +
          "q. Jats\n" +
          "r. Kammas and Reddys\n" +
          "s. Marathas\n" +
          "List-II:\n" +
          "1. Haryana and Punjab\n" +
          "2. Karnataka\n" +
          "3. Maharashtra\n" +
          "4. Andhra Pradesh and Telangana\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-2, q-1, r-4, s-3" },
          { id: "B", text: "p-1, q-2, r-4, s-3" },
          { id: "C", text: "p-2, q-4, r-1, s-3" },
          { id: "D", text: "p-3, q-1, r-4, s-2" },
        ],
        correctOption: "A",
        explanation: "Vokkaligas/Lingayats (p-2: Karnataka), Jats (q-1: Haryana/Punjab), Kammas/Reddys (r-4: AP/Telangana), Marathas (s-3: Maharashtra).",
        difficulty: "easy",
      },
      {
        id: "sociology_u2_q6",
        question: "Under the Census of 1901, who attempted to rank all Indian castes on the basis of social precedence?",
        type: "standard",
        options: [
          { id: "A", text: "Lord Macaulay" },
          { id: "B", text: "Sir Herbert Risley" },
          { id: "C", text: "Verrier Elwin" },
          { id: "D", text: "William Bentinck" },
        ],
        correctOption: "B",
        explanation: "Sir Herbert Risley, the Census Commissioner in 1901, attempted to officially classify and rank all castes in hierarchical social precedence.",
        difficulty: "easy",
      },
      {
        id: "sociology_u2_q7",
        question: "Which of the following British Acts first introduced the legal categories of 'Scheduled Castes' and 'Scheduled Tribes' in India?",
        type: "standard",
        options: [
          { id: "A", text: "Morley-Minto Reforms 1909" },
          { id: "B", text: "Montagu-Chelmsford Reforms 1919" },
          { id: "C", text: "Government of India Act 1935" },
          { id: "D", text: "Indian Independence Act 1947" },
        ],
        correctOption: "C",
        explanation: "The Government of India Act 1935 legally introduced 'Scheduled Castes' and 'Scheduled Tribes' to replace the label 'depressed classes'.",
        difficulty: "medium",
      },
      {
        id: "sociology_u2_q8",
        question: "Verrier Elwin advocated which of the following approaches toward tribal welfare in colonial and post-colonial India?",
        type: "standard",
        options: [
          { id: "A", text: "Complete assimilation into Hindu society" },
          { id: "B", text: "Isolationism and creation of protected National Parks" },
          { id: "C", text: "Immediate industrialisation of all tribal zones" },
          { id: "D", text: "Conversion to modern commercial market agriculture" },
        ],
        correctOption: "B",
        explanation: "Verrier Elwin advocated an isolationist approach to shield tribal culture from predatory non-tribal exploitation.",
        difficulty: "easy",
      },
      {
        id: "sociology_u2_q9",
        question: "What is the title given to the youngest daughter who inherits ancestral property in the Khasi matrilineal system?",
        type: "standard",
        options: [
          { id: "A", text: "Khadduh (Ka Khadduh)" },
          { id: "B", text: "Kur" },
          { id: "C", text: "Iing" },
          { id: "D", text: "Nokma" },
        ],
        correctOption: "A",
        explanation: "Among the Khasis, the youngest daughter who inherits the ancestral home and property is called 'Ka Khadduh'.",
        difficulty: "easy",
      },
      {
        id: "sociology_u2_q10",
        question: "Which language family is spoken by the Santhal and Munda tribal communities of Central and Eastern India?",
        type: "standard",
        options: [
          { id: "A", text: "Tibeto-Burman" },
          { id: "B", text: "Dravidian" },
          { id: "C", text: "Austric (Austro-Asiatic)" },
          { id: "D", text: "Indo-Aryan" },
        ],
        correctOption: "C",
        explanation: "The Santhals, Mundas, and Hos speak languages belonging to the Austric (Austro-Asiatic) language family.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["Structure of Indian Society"],
      relatedTopics: ["Social Inequality and Exclusion", "Cultural Diversity"],
      practiceTestId: "practice-sociology-unit2-test1",
      practiceTestUrl: "/test/practice-sociology-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=sociology",
      weaknessRadarUrl: "/dashboard/radar?subject=sociology",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 3: Social Inequality and Exclusion
  // -------------------------------------------------------------------------
  {
    id: "sociology_u3_t1",
    slug: "caste-discrimination-untouchability-tribal-movements-gender-and-disability-inequities",
    subject: "sociology",
    subjectName: "Sociology",
    subjectCode: "325",
    unitNumber: 3,
    unitTitle: "Social Inequality and Exclusion",
    topicTitle: "Caste Discrimination, Untouchability, Tribal Movements, Gender and Disability Inequities",
    ncertReference: {
      class: "12",
      book: "Indian Society",
      chapterNumber: 4,
      chapterName: "The Pattern of Social Inequality and Exclusion",
      sections: [
        "Social Inequality and Exclusion: Systematic, Institutionalised Nature",
        "Caste Discrimination and Untouchability: Exclusion, Humiliation, Exploitation",
        "Key Reformers: Jyotirao Phule, Savitribai Phule, B.R. Ambedkar, Periyar, Sri Narayana Guru",
        "Tribal Struggles and Movements: Jal, Jungle, Jameen and Dikus",
        "Gender Inequities: Tarabai Shinde (Stree Purush Tulana), Begum Rokeya Sakhawat Hossain",
        "Disability: Medical vs Social Model of Disability, RPwD Act 2016",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (24+ questions across sets)",
      totalPyqsInRepo: 46,
      weightagePercentage: 11.5,
    },
    summary30Seconds: [
      "Social Stratification: Institutionalised patterns of inequality structured along social groups, not individual traits. Three resources: Economic capital, Cultural capital, Social capital (Pierre Bourdieu).",
      "Untouchability: Three dimensions: Exclusion (physical segregation), Humiliation-Subordination (degrading rituals), Exploitation (forced unpaid labour/begar). Article 17 abolishes untouchability.",
      "Reformers: Jyotirao Phule (Satyashodhak Samaj 1873, *Gulamgiri* 1873); Dr. B.R. Ambedkar (Mahad Satyagraha 1927, Bahishkrit Hitakarini Sabha); Periyar (Self-Respect Movement); Sri Narayana Guru (SNDP Yogam: 'One Caste, One Religion, One God').",
      "Feminist Pioneers: Tarabai Shinde (*Stree Purush Tulana*, 1882); Begum Rokeya Sakhawat Hossain (*Sultana's Dream*, 1905 - Ladyland).",
      "Disability: Social Model views disability as created by an inaccessible society, not by individual biological impairment. Rights of Persons with Disabilities (RPwD) Act 2016 expanded benchmark disabilities from 7 to 21.",
    ],
    coreConcepts: [
      {
        title: "1. Social Inequality, Exclusion & Untouchability Dimensions",
        content:
          "Social inequality is not about natural individual variations (height, strength), but about unequal access to valued social resources:\n\n" +
          "• **Three Forms of Capital (Pierre Bourdieu)**:\n" +
          "  - **Economic Capital**: Material assets, income, land, and wealth.\n" +
          "  - **Cultural Capital**: Educational qualifications, language fluency, refined manners, and social prestige.\n" +
          "  - **Social Capital**: Networks of social connections, kinship contacts, and influential patronage.\n\n" +
          "• **Untouchability (Extreme Social Exclusion)**:\n" +
          "  - Operates across three interconnected dimensions:\n" +
          "    1. **Exclusion**: Denied entry to village temples, public wells, crematoriums, tea stalls; separate drinking cups (two-glass system).\n" +
          "    2. **Humiliation and Subordination**: Compulsory degrading acts: removing footwear in upper-caste streets, bowing, cleaning human excreta, beating drums at funerals.\n" +
          "    3. **Economic Exploitation**: Forced bonded labour (*begar*), low wages, confiscation of land, continuous debt bondage.\n\n" +
          "• **Constitutional & Legal Measures**:\n" +
          "  - **Article 17**: Abolishes untouchability and forbids its practice in any form.\n" +
          "  - **Protection of Civil Rights Act (1955)** (originally Untouchability Offences Act).\n" +
          "  - **Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act 1989**.",
        ncertPointers: [
          "Article 17 explicitly abolishes untouchability.",
          "Three dimensions of untouchability: Exclusion, Humiliation-Subordination, Exploitation.",
        ],
      },
      {
        title: "2. Key Dalit & Backward Class Reformers",
        content:
          "Crucial historical figures who led radical anti-caste movements:\n\n" +
          "• **Jyotirao Govindrao Phule (Maharashtra)**:\n" +
          "  - Founded the **Satyashodhak Samaj** (Truthseekers Society) in **1873**.\n" +
          "  - Authored the landmark book **Gulamgiri (Slavery)** in 1873, dedicating it to the American abolitionist movement against Negro slavery.\n" +
          "  - Pioneered education for lower castes and girls with his wife **Savitribai Phule** (opened India's first school for girls in Bhidewada, Pune in 1848).\n\n" +
          "• **Dr. B.R. Ambedkar**:\n" +
          "  - Founded the **Bahishkrit Hitakarini Sabha** (1924) with the slogan *'Educate, Agitate, Organise'*.\n" +
          "  - Led the historic **Mahad Satyagraha (1927)** asserting untouchables' civil right to drink water from the public Chhadar Tank.\n" +
          "  - Burned the *Manusmriti* in 1927; served as Chairman of the Drafting Committee of the Indian Constitution; converted to Buddhism along with lakhs of followers at Nagpur on 14 October 1956.\n\n" +
          "• **E.V. Ramasamy Naicker 'Periyar' (Tamil Nadu)**:\n" +
          "  - Launched the radical **Self-Respect Movement (1925)** against Brahminical hegemony.\n" +
          "  - Championed rationalism, anti-caste intermarriage without priests, and women's rights.\n\n" +
          "• **Sri Narayana Guru (Kerala)**:\n" +
          "  - Consecrated a Shiva lingam at Aruvippuram (1888) challenging Brahmin monopoly on priesthood.\n" +
          "  - Founded **SNDP Yogam** (Sri Narayana Dharma Paripalana Yogam) in 1903 for the uplift of the Ezhava community with the motto: *'One Caste, One Religion, One God for Man'* (*Oru Jathi, Oru Matham, Oru Daivam Manushyanu*).",
        ncertPointers: [
          "Phule: Satyashodhak Samaj (1873), Gulamgiri (1873, dedicated to American anti-slavery).",
          "Ambedkar: Mahad Satyagraha (1927), Bahishkrit Hitakarini Sabha (1924).",
          "Sri Narayana Guru: 'One Caste, One Religion, One God' (SNDP Yogam).",
        ],
      },
      {
        title: "3. Gender Inequities & Pioneering Feminist Texts",
        content:
          "Gender inequality is socially structured patriarchy, not biological destiny:\n\n" +
          "• **Tarabai Shinde — Stree Purush Tulana (1882)**:\n" +
          "  - Published in Marathi in **1882**; considered modern India's **first published feminist critique**.\n" +
          "  - Written in response to the public condemnation and death sentence given to a young Brahmin widow (Vijayalakshmi) who aborted an unwanted child.\n" +
          "  - Fiercely challenged double standards: men were allowed multiple marriages and mistresses without censure, while widows faced severe social ostracism and torture.\n\n" +
          "• **Begum Rokeya Sakhawat Hossain — Sultana's Dream (1905)**:\n" +
          "  - Groundbreaking feminist utopian science-fiction story written in English.\n" +
          "  - Depicts **'Ladyland'**, a peaceful utopian society where gender roles are reversed: women run the government, conduct scientific research, harness solar energy, and fly solar air-cars, while men are confined to the *murdana* (domestic seclusion).\n" +
          "  - Founded the Sakhawat Memorial Girls' High School in Kolkata.",
        ncertPointers: [
          "Tarabai Shinde wrote 'Stree Purush Tulana' in 1882.",
          "Begum Rokeya wrote 'Sultana's Dream' in 1905 depicting 'Ladyland'.",
        ],
      },
      {
        title: "4. Tribal Dispossession & The Social Model of Disability",
        content:
          "• **Tribal Struggles (Jal, Jungle, Jameen)**:\n" +
          "  - Tribes lost customary forest rights to British colonial reservation laws and post-independence development projects (dams, open-cast coal mines, wildlife sanctuaries).\n" +
          "  - **Dikus**: Tribal term for non-tribal exploitative outsiders (moneylenders, traders, contractors).\n" +
          "  - **Sardar Sarovar Dam & Narmada Bachao Andolan**: Highlighted that Scheduled Tribes, despite being ~8.6% of India's population, comprise over 40% of all displaced persons by development projects.\n\n" +
          "• **Disability: Medical Model vs Social Model**:\n" +
          "  - **Medical / Biological Model**: Views disability as an individual physical defect, pathology, or biological tragedy requiring medical cure.\n" +
          "  - **Social Model**: Differentiates between:\n" +
          "    * *Impairment*: Physical or cognitive biological limitation (e.g., inability to walk).\n" +
          "    * *Disability*: Socially created exclusion arising from an environment constructed exclusively for able-bodied persons (e.g., lack of ramps, braille signage, wheelchair-accessible public transport).\n" +
          "  - **Rights of Persons with Disabilities (RPwD) Act 2016**:\n" +
          "    * Replaced the 1995 Act.\n" +
          "    * Increased recognised benchmark disabilities from **7 to 21** (including autism, acid attack, intellectual disability, cerebral palsy).\n" +
          "    * Raised reservation quota in government jobs from 3% to 4%.",
        ncertPointers: [
          "Social model: Disability is created by an unaccommodating society, not by biological impairment.",
          "RPwD Act 2016 increased covered conditions from 7 to 21.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Pioneering Thinkers and Feminist Texts",
        formula: "Jyotirao Phule (Gulamgiri 1873) | Tarabai Shinde (Stree Purush Tulana 1882) | Begum Rokeya (Sultana's Dream 1905)",
        symbols: "Historic Emancipation Texts",
        siUnits: "Subaltern and Gender Literature",
        applicationCondition: "Direct match-the-following on books, authors, and years",
        notes: "Gulamgiri was dedicated to the American movement to abolish slavery.",
      },
      {
        name: "Anti-Caste Movements and Leaders",
        formula: "Satyashodhak Samaj (Phule, 1873) | Mahad Satyagraha (Ambedkar, 1927) | Self-Respect (Periyar, 1925) | SNDP (Narayana Guru, 1903)",
        symbols: "Social Reform Chronology",
        siUnits: "Historical resistance movements",
        applicationCondition: "Attribution and chronology questions in CUET",
        notes: "Ambedkar's Mahad Satyagraha fought for civic water access from Chhadar tank.",
      },
      {
        name: "Disability Models Comparison",
        formula: "Medical Model (Biological defect / Individual tragedy) vs Social Model (Societal barrier / Inaccessible design)",
        symbols: "Impairment vs Social Disability",
        siUnits: "Disability Studies Framework",
        applicationCondition: "Assertion-Reason and definition questions",
        notes: "RPwD Act 2016 recognizes 21 disabilities with 4% job reservation.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Three Forms of Capital & Untouchability Dimensions",
      caption: "Bourdieu's capital triad (Economic, Cultural, Social) and the 3 dimensions of untouchability.",
      code: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <!-- Left: Bourdieu's Capital -->
        <rect x="25" y="30" width="310" height="175" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
        <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="13">Bourdieu's Three Forms of Capital</text>
        <rect x="45" y="75" width="270" height="30" fill="#dbeafe" rx="3"/>
        <text x="180" y="95" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="11">Economic Capital: Land, income, assets</text>
        <rect x="45" y="115" width="270" height="30" fill="#dbeafe" rx="3"/>
        <text x="180" y="135" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="11">Cultural Capital: Education, status, manners</text>
        <rect x="45" y="155" width="270" height="30" fill="#dbeafe" rx="3"/>
        <text x="180" y="175" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="11">Social Capital: Networks, connections, caste ties</text>

        <!-- Right: 3 Dimensions of Untouchability -->
        <rect x="365" y="30" width="310" height="175" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
        <text x="520" y="55" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="13">Three Dimensions of Untouchability</text>
        <rect x="385" y="75" width="270" height="30" fill="#fee2e2" rx="3"/>
        <text x="520" y="95" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">1. Exclusion: Wells, temples, segregation</text>
        <rect x="385" y="115" width="270" height="30" fill="#fee2e2" rx="3"/>
        <text x="520" y="135" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">2. Humiliation: Subordinate rituals, bowing</text>
        <rect x="385" y="155" width="270" height="30" fill="#fee2e2" rx="3"/>
        <text x="520" y="175" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">3. Exploitation: Forced begar, unpaid labour</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <!-- Left: Bourdieu's Capital -->
      <rect x="25" y="30" width="310" height="175" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
      <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="13">Bourdieu's Three Forms of Capital</text>
      <rect x="45" y="75" width="270" height="30" fill="#dbeafe" rx="3"/>
      <text x="180" y="95" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="11">Economic Capital: Land, income, assets</text>
      <rect x="45" y="115" width="270" height="30" fill="#dbeafe" rx="3"/>
      <text x="180" y="135" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="11">Cultural Capital: Education, status, manners</text>
      <rect x="45" y="155" width="270" height="30" fill="#dbeafe" rx="3"/>
      <text x="180" y="175" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="11">Social Capital: Networks, connections, caste ties</text>

      <!-- Right: 3 Dimensions of Untouchability -->
      <rect x="365" y="30" width="310" height="175" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
      <text x="520" y="55" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="13">Three Dimensions of Untouchability</text>
      <rect x="385" y="75" width="270" height="30" fill="#fee2e2" rx="3"/>
      <text x="520" y="95" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">1. Exclusion: Wells, temples, segregation</text>
      <rect x="385" y="115" width="270" height="30" fill="#fee2e2" rx="3"/>
      <text x="520" y="135" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">2. Humiliation: Subordinate rituals, bowing</text>
      <rect x="385" y="155" width="270" height="30" fill="#fee2e2" rx="3"/>
      <text x="520" y="175" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">3. Exploitation: Forced begar, unpaid labour</text>
    </svg>`,
    workedExamples: [
      {
        id: "sociology_u3_we1",
        questionNumber: 1,
        question:
          "In 1873, Jyotirao Phule dedicated his famous book 'Gulamgiri' (Slavery) to which of the following global struggles?\n" +
          "(A) The French Revolution\n" +
          "(B) The American movement to abolish Negro slavery\n" +
          "(C) The Russian Bolshevik Revolution\n" +
          "(D) The British Chartists Movement",
        options: [
          { id: "A", text: "The French Revolution" },
          { id: "B", text: "The American movement to abolish Negro slavery" },
          { id: "C", text: "The Russian Bolshevik Revolution" },
          { id: "D", text: "The British Chartists Movement" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: In 1873, Jyotirao Phule wrote 'Gulamgiri' (Slavery).",
          "Step 2: In the preface, he explicitly dedicated the work to the good people of the United States of America for their noble struggle in abolishing slavery.",
          "Step 3: Correct answer is Option B.",
        ],
        cuetTip: "Gulamgiri (1873) was dedicated to the American movement to abolish Negro slavery.",
      },
      {
        id: "sociology_u3_we2",
        questionNumber: 2,
        question:
          "Who authored 'Stree Purush Tulana' (A Comparison between Women and Men) published in 1882 in Maharashtra?\n" +
          "(A) Pandita Ramabai\n" +
          "(B) Tarabai Shinde\n" +
          "(C) Savitribai Phule\n" +
          "(D) Anandibai Joshi",
        options: [
          { id: "A", text: "Pandita Ramabai" },
          { id: "B", text: "Tarabai Shinde" },
          { id: "C", text: "Savitribai Phule" },
          { id: "D", text: "Anandibai Joshi" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Check early feminist literature in NCERT Indian Society, Ch 4.",
          "Step 2: Tarabai Shinde, a member of Satyashodhak Samaj, published 'Stree Purush Tulana' in Marathi in 1882.",
          "Step 3: It is widely recognized as the first published modern feminist critique in India.",
        ],
        cuetTip: "Tarabai Shinde = Stree Purush Tulana (1882).",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Book and Author Attribution",
        frequency: "Very High",
        typicalStem: "Match the book with its author: Gulamgiri, Stree Purush Tulana, Sultana's Dream.",
        strategy: "Phule = Gulamgiri; Tarabai Shinde = Stree Purush Tulana; Begum Rokeya = Sultana's Dream.",
      },
      {
        patternType: "Anti-Caste Movement Proponents",
        frequency: "High",
        typicalStem: "Who founded the Self-Respect Movement in Tamil Nadu?",
        strategy: "E.V. Ramasamy Naicker 'Periyar' founded the Self-Respect Movement in 1925.",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing Tarabai Shinde and Pandita Ramabai.",
        whyWrong: "Tarabai Shinde wrote 'Stree Purush Tulana' in 1882. Pandita Ramabai wrote 'The High-Caste Hindu Woman' (1887) and founded Sharada Sadan.",
        correctUnderstanding: "Tarabai Shinde = Stree Purush Tulana (1882); Pandita Ramabai = Sharada Sadan & High-Caste Hindu Woman.",
        trapOptionExample: "Attributing Stree Purush Tulana to Pandita Ramabai.",
      },
      {
        misconception: "Believing Disability in the Social Model is an individual defect.",
        whyWrong: "The Social Model defines disability as societal barriers (stairs, lack of ramps, stigma), contrasting it with biological impairment. The Medical model views it as an individual bodily defect.",
        correctUnderstanding: "Social Model = Societal barriers; Medical Model = Biological defect.",
        trapOptionExample: "Claiming the social model focuses on medical surgery.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Pioneering Texts Chronology",
        mnemonic: "G-S-S (Gulamgiri 1873 -> Stree Purush 1882 -> Sultana's Dream 1905)",
        rule: "Phule (1873), Tarabai (1882), Begum Rokeya (1905)",
        explanation: "Memorize the exact chronology of 3 historic emancipation texts.",
      },
      {
        title: "Untouchability 3 Dimensions",
        mnemonic: "E-H-E",
        rule: "Exclusion, Humiliation-Subordination, Exploitation",
        explanation: "The 3 textbook dimensions of untouchability.",
      },
    ],
    quickRevisionCard: {
      title: "Inequality & Exclusion — 60-Second Flash Card",
      bulletPoints: [
        "Bourdieu Capital: Economic (wealth), Cultural (education/status), Social (networks).",
        "Untouchability: Article 17 abolishes it; 3 dimensions: Exclusion, Humiliation, Exploitation.",
        "Phule: Satyashodhak Samaj (1873); Gulamgiri (1873, dedicated to American anti-slavery).",
        "Ambedkar: Bahishkrit Hitakarini Sabha (1924); Mahad Satyagraha (1927, public water tank).",
        "Periyar: Self-Respect Movement (1925, Tamil Nadu); Sri Narayana Guru: SNDP Yogam (1903).",
        "Tarabai Shinde: Stree Purush Tulana (1882, first modern feminist text).",
        "Begum Rokeya: Sultana's Dream (1905, 'Ladyland' where gender roles reverse).",
        "Disability: Social model (societal barriers create disability) vs Medical model (biological impairment).",
        "RPwD Act 2016: 21 benchmark disabilities, 4% job reservation.",
      ],
      examTricks: [
        "Savitribai & Jyotirao Phule opened the first girls' school at Pune in 1848.",
        "Dikus = non-tribal exploitative outsiders.",
      ],
    },
    practiceQuestions: [
      {
        id: "sociology_u3_q1",
        question: "Which Article of the Constitution of India formally abolishes 'Untouchability' and forbids its practice in any form?",
        type: "standard",
        options: [
          { id: "A", text: "Article 14" },
          { id: "B", text: "Article 17" },
          { id: "C", text: "Article 19" },
          { id: "D", text: "Article 21" },
        ],
        correctOption: "B",
        explanation: "Article 17 of the Indian Constitution abolishes untouchability and makes its practice in any form an offence punishable by law.",
        difficulty: "easy",
      },
      {
        id: "sociology_u3_q2",
        question: "In 1927, Dr. B.R. Ambedkar led which historic satyagraha to assert untouchables' rights to access public drinking water?",
        type: "standard",
        options: [
          { id: "A", text: "Vaikom Satyagraha" },
          { id: "B", text: "Mahad Satyagraha" },
          { id: "C", text: "Bardoli Satyagraha" },
          { id: "D", text: "Kheda Satyagraha" },
        ],
        correctOption: "B",
        explanation: "Dr. B.R. Ambedkar led the Mahad Satyagraha at the Chhadar Tank in Maharashtra in March 1927.",
        difficulty: "easy",
      },
      {
        id: "sociology_u3_q3",
        question:
          "Assertion (A): The Social Model of Disability distinguishes between 'impairment' and 'disability'.\n" +
          "Reason (R): It argues that while impairment is a biological condition, disability is created by an unaccommodating society through physical and attitudinal barriers.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "The social model of disability locates the handicap in social architectural exclusion and stigma rather than in the individual's bodily impairment.",
        difficulty: "medium",
      },
      {
        id: "sociology_u3_q4",
        question: "Who authored the feminist utopian story 'Sultana's Dream' published in 1905?",
        type: "standard",
        options: [
          { id: "A", text: "Tarabai Shinde" },
          { id: "B", text: "Begum Rokeya Sakhawat Hossain" },
          { id: "C", text: "Pandita Ramabai" },
          { id: "D", text: "Sarojini Naidu" },
        ],
        correctOption: "B",
        explanation: "Begum Rokeya Sakhawat Hossain wrote 'Sultana's Dream' in 1905 portraying 'Ladyland' where women govern and men are in seclusion.",
        difficulty: "easy",
      },
      {
        id: "sociology_u3_q5",
        question:
          "Match List-I (Anti-Caste Leader) with List-II (Organisation / Movement):\n" +
          "List-I:\n" +
          "p. Jyotirao Phule\n" +
          "q. E.V. Ramasamy Periyar\n" +
          "r. Sri Narayana Guru\n" +
          "s. Dr. B.R. Ambedkar\n" +
          "List-II:\n" +
          "1. Self-Respect Movement (1925)\n" +
          "2. SNDP Yogam (1903)\n" +
          "3. Satyashodhak Samaj (1873)\n" +
          "4. Bahishkrit Hitakarini Sabha (1924)\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-3, q-1, r-2, s-4" },
          { id: "B", text: "p-1, q-3, r-2, s-4" },
          { id: "C", text: "p-3, q-2, r-1, s-4" },
          { id: "D", text: "p-4, q-1, r-2, s-3" },
        ],
        correctOption: "A",
        explanation: "Phule (p-3: Satyashodhak Samaj), Periyar (q-1: Self-Respect), Narayana Guru (r-2: SNDP Yogam), Ambedkar (s-4: Bahishkrit Hitakarini Sabha).",
        difficulty: "easy",
      },
      {
        id: "sociology_u3_q6",
        question: "How many benchmark disabilities are recognized under the Rights of Persons with Disabilities (RPwD) Act 2016 in India?",
        type: "standard",
        options: [
          { id: "A", text: "7" },
          { id: "B", text: "14" },
          { id: "C", text: "21" },
          { id: "D", text: "28" },
        ],
        correctOption: "C",
        explanation: "The RPwD Act 2016 expanded the list of recognized benchmark disabilities from 7 to 21 conditions.",
        difficulty: "easy",
      },
      {
        id: "sociology_u3_q7",
        question: "In tribal areas, non-tribal exploitative outsiders like traders, moneylenders, and contractors are known as:",
        type: "standard",
        options: [
          { id: "A", text: "Panchamas" },
          { id: "B", text: "Dikus" },
          { id: "C", text: "Ryots" },
          { id: "D", text: "Jotedars" },
        ],
        correctOption: "B",
        explanation: "Dikus is the tribal term used across Central and Eastern India for exploitative non-tribal outsiders.",
        difficulty: "easy",
      },
      {
        id: "sociology_u3_q8",
        question:
          "Assertion (A): In India, Scheduled Tribes represent an overwhelmingly disproportionate share of people displaced by mega developmental projects.\n" +
          "Reason (R): Natural mineral deposits, dense forests, and major river basins are predominantly located in traditional tribal homelands.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Tribals make up ~8.6% of population but constitute over 40% of all displaced persons because dam reservoirs and mining pits target resource-rich tribal territories.",
        difficulty: "medium",
      },
      {
        id: "sociology_u3_q9",
        question: "Who coined the motto 'One Caste, One Religion, One God for Man' in Kerala?",
        type: "standard",
        options: [
          { id: "A", text: "Ayyankali" },
          { id: "B", text: "Sri Narayana Guru" },
          { id: "C", text: "K. Kelappan" },
          { id: "D", text: "Sahodaran Ayyappan" },
        ],
        correctOption: "B",
        explanation: "Sri Narayana Guru coined the immortal motto: 'One Caste, One Religion, One God for Man'.",
        difficulty: "easy",
      },
      {
        id: "sociology_u3_q10",
        question: "According to Pierre Bourdieu, educational qualifications and linguistic style belong to which form of capital?",
        type: "standard",
        options: [
          { id: "A", text: "Economic Capital" },
          { id: "B", text: "Cultural Capital" },
          { id: "C", text: "Social Capital" },
          { id: "D", text: "Physical Capital" },
        ],
        correctOption: "B",
        explanation: "Cultural capital encompasses educational credentials, language fluency, refined cultural knowledge, and academic prestige.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Social Institutions: Continuity and Change"],
      relatedTopics: ["The Challenges of Unity in Diversity", "Process of Social Change in India"],
      practiceTestId: "practice-sociology-unit3-test1",
      practiceTestUrl: "/test/practice-sociology-unit3-test1",
      weaknessReportUrl: "/dashboard/radar?subject=sociology",
      weaknessRadarUrl: "/dashboard/radar?subject=sociology",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 4: The Challenges of Unity in Diversity
  // -------------------------------------------------------------------------
  {
    id: "sociology_u4_t1",
    slug: "cultural-diversity-communalism-regionalism-secularism-and-nation-state",
    subject: "sociology",
    subjectName: "Sociology",
    subjectCode: "325",
    unitNumber: 4,
    unitTitle: "The Challenges of Unity in Diversity",
    topicTitle: "Cultural Diversity, Communalism, Regionalism, Secularism and Nation-State",
    ncertReference: {
      class: "12",
      book: "Indian Society",
      chapterNumber: 6,
      chapterName: "The Challenges of Cultural Diversity",
      sections: [
        "Cultural Diversity and the Indian Nation-State",
        "State vs Nation: Assimilationist vs Integrationist Policies",
        "Regionalism and the Linguistic Reorganisation of States (SRC 1956)",
        "Communalism: Ideology, Politics, and Communal Violence",
        "Secularism: Western vs Indian Concept of Secularism",
        "Civil Society, Democratic Rights, and the Right to Information (RTI 2005)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (20+ questions across sets)",
      totalPyqsInRepo: 40,
      weightagePercentage: 10.0,
    },
    summary30Seconds: [
      "Nation vs State: A State is a political-legal entity holding a monopoly over legitimate physical force; a Nation is a socio-cultural community based on shared identity and destiny (Benedict Anderson's 'imagined community').",
      "Assimilationist policies force minorities into a dominant single culture; Integrationist policies protect cultural diversity within a single political framework.",
      "Regionalism: Linguistic reorganisation of states (States Reorganisation Commission 1956, Fazal Ali) strengthened Indian national unity rather than breaking it.",
      "Communalism: Political ideology that claims religious identity is the primary basis of political and economic solidarity, generating intergroup hostility.",
      "Indian Secularism: Not a strict wall of separation like the West, but 'Principled Distance' and 'Sarva Dharma Sambhava' (equal respect for all religions, protecting minority cultural/educational rights under Articles 29 & 30).",
    ],
    coreConcepts: [
      {
        title: "1. Nation, State & Policies toward Cultural Diversity",
        content:
          "Cultural diversity presents distinct challenges for national integration:\n\n" +
          "• **State vs Nation**:\n" +
          "  - **State**: A political-legal institution possessing a centralised apparatus of rule, sovereign jurisdiction over a defined territory, and monopoly over the legitimate use of physical force (Max Weber).\n" +
          "  - **Nation**: A socio-cultural community with a collective sense of identity, shared history, and common political aspirations (Benedict Anderson: an **'Imagined Community'**).\n" +
          "  - **Nation-State**: A modern state whose borders coincide with the boundaries of a unified national identity.\n\n" +
          "• **State Policies toward Cultural Diversity**:\n" +
          "  - **Assimilationist Policies**: Seek to eliminate cultural differences by forcing minority groups to assimilate into the values, language, and culture of the dominant group ('melting pot').\n" +
          "  - **Integrationist Policies**: Acknowledge and protect distinct cultural identities in the private and public spheres while fostering equal political citizenship within a shared framework ('salad bowl'). India adopted the integrationist plural model.",
        ncertPointers: [
          "Benedict Anderson defined the nation as an 'imagined community'.",
          "India practices Integrationist policies, protecting cultural diversity rather than enforcing assimilation.",
        ],
      },
      {
        title: "2. Regionalism & Linguistic Reorganisation of States",
        content:
          "• **Nature of Regionalism**:\n" +
          "  - Grounded in shared regional culture, language, historical grievances, or perceived economic neglect by the central government.\n" +
          "  - Manifestations: 'Sons of the soil' movements, border disputes between states, demands for separate statehood.\n\n" +
          "• **Linguistic Reorganisation of States (1956)**:\n" +
          "  - After independence, demands for linguistic states peaked with **Potti Sreeramulu's 58-day hunger strike** and death in 1952, forcing the creation of Andhra State for Telugu speakers in 1953.\n" +
          "  - **States Reorganisation Commission (SRC)**: Appointed in 1953 under Justice **Fazal Ali** (with K.M. Panikkar and H.N. Kunzru).\n" +
          "  - **States Reorganisation Act 1956**: Created 14 states and 6 union territories based on linguistic boundaries.\n" +
          "  - *Sociological Significance*: Rather than disintegrating the country as critics feared, linguistic reorganisation strengthened Indian federalism and national unity.",
        ncertPointers: [
          "Potti Sreeramulu's hunger strike led to the first linguistic state (Andhra in 1953).",
          "States Reorganisation Act was enacted in 1956 based on the Fazal Ali Commission.",
        ],
      },
      {
        title: "3. Communalism: Ideology vs Religious Faith",
        content:
          "Communalism in sociology does NOT mean living in a community; it refers to an aggressive political ideology:\n\n" +
          "• **Core Ideological Premises of Communalism**:\n" +
          "  1. People who belong to the same religion have identical political, social, and economic interests.\n" +
          "  2. People of different religions have different, conflicting, and hostile interests.\n" +
          "  3. Religion is made the supreme identity, overriding class, region, gender, and nationhood.\n\n" +
          "• **Communalism vs Religion**:\n" +
          "  - Religion is a personal faith, moral philosophy, and spiritual orientation.\n" +
          "  - Communalism is the political exploitation and weaponisation of religious identity for state power, resource control, or electoral hegemony.\n" +
          "  - Triggers communal riots, communalized violence, and the creation of targeted ghettos.",
        ncertPointers: [
          "Communalism is a modern political ideology, not an ancient religious doctrine.",
        ],
      },
      {
        title: "4. Indian vs Western Secularism & Civil Society",
        content:
          "• **Western Concept of Secularism**:\n" +
          "  - Strict separation of Church and State (mutual exclusion; state has no role in religious matters, and religion has no role in public affairs).\n\n" +
          "• **Indian Concept of Secularism (Principled Distance & Sarva Dharma Sambhava)**:\n" +
          "  - Developed in a multi-religious civilization.\n" +
          "  - Meaning: Equal respect for all religions (*Sarva Dharma Sambhava*).\n" +
          "  - The state maintains **'Principled Distance'**: it does not identify with any official state religion, but can intervene in religion to eradicate social evils (e.g., banning untouchability, sati, triple talaq, child marriage).\n" +
          "  - **Constitutional Guarantees for Minorities**:\n" +
          "    * *Article 29*: Protection of distinct language, script, or culture of minorities.\n" +
          "    * *Article 30*: Right of all religious and linguistic minorities to establish and administer educational institutions.\n\n" +
          "• **Civil Society & Right to Information (RTI 2005)**:\n" +
          "  - Civil Society comprises the sphere of non-coercive collective citizen action, independent of both the state and the private market (NGOs, women's groups, trade unions, media).\n" +
          "  - **RTI Act 2005**: Born out of the grassroots struggle led by **Mazdoor Kisan Shakti Sangathan (MKSS)** in Rajasthan (Aruna Roy), making governance transparent and accountable to citizens.",
        ncertPointers: [
          "Indian secularism: Principled distance and equal respect (Sarva Dharma Sambhava).",
          "Articles 29 and 30 safeguard minority cultural and educational rights.",
          "MKSS (Mazdoor Kisan Shakti Sangathan) spearheaded the RTI movement.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Western vs Indian Secularism Paradigm",
        formula: "Western (Strict wall of separation / Mutual exclusion) vs Indian (Principled distance / Sarva Dharma Sambhava / Reform intervention)",
        symbols: "Secular Governance Models",
        siUnits: "Political Sociology Paradigms",
        applicationCondition: "Contrasting secularism models in CUET",
        notes: "Indian secularism protects minority rights under Articles 29 and 30.",
      },
      {
        name: "Constitutional Minority Safeguards",
        formula: "Article 29 (Preserve language, script, culture) + Article 30 (Establish & administer educational institutions)",
        symbols: "Fundamental Rights (Part III)",
        siUnits: "Constitutional law safeguards",
        applicationCondition: "Article matching and legal guarantee MCQs",
        notes: "Minority status under Article 30 includes both religious and linguistic minorities.",
      },
      {
        name: "Linguistic Reorganisation Milestones",
        formula: "1952 (Potti Sreeramulu fast) -> 1953 (Andhra State) -> 1953-55 (SRC Fazal Ali) -> 1956 (SRC Act)",
        symbols: "Federal Reorganisation Timeline",
        siUnits: "Historical chronology",
        applicationCondition: "Chronological sequence questions",
        notes: "States Reorganisation Act 1956 created 14 states and 6 UTs.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Western vs Indian Secularism Comparison",
      caption: "Strict mutual exclusion (Western) vs Principled Distance with reform & minority protection (Indian).",
      code: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <!-- Left: Western Secularism -->
        <rect x="25" y="30" width="310" height="175" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
        <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#334155" font-size="13">Western Secularism</text>
        <rect x="50" y="80" width="100" height="80" fill="#fee2e2" rx="4"/>
        <text x="100" y="125" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="12">State</text>
        <!-- Wall -->
        <line x1="180" y1="75" x2="180" y2="165" stroke="#ef4444" stroke-width="6"/>
        <text x="180" y="180" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="10">Strict Wall of Separation</text>
        <rect x="210" y="80" width="100" height="80" fill="#fef3c7" rx="4"/>
        <text x="260" y="125" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="12">Religion</text>

        <!-- Right: Indian Secularism -->
        <rect x="365" y="30" width="310" height="175" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
        <text x="520" y="55" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="13">Indian Secularism</text>
        <circle cx="520" cy="120" r="45" fill="#10b981"/>
        <text x="520" y="115" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="11">Principled</text>
        <text x="520" y="130" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="11">Distance</text>
        <text x="520" y="175" text-anchor="middle" font-weight="bold" fill="#064e3b" font-size="10">Sarva Dharma Sambhava</text>
        <text x="520" y="192" text-anchor="middle" fill="#047857" font-size="9">Protects minorities (Art 29, 30) &amp; reforms evils</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <!-- Left: Western Secularism -->
      <rect x="25" y="30" width="310" height="175" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
      <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#334155" font-size="13">Western Secularism</text>
      <rect x="50" y="80" width="100" height="80" fill="#fee2e2" rx="4"/>
      <text x="100" y="125" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="12">State</text>
      <!-- Wall -->
      <line x1="180" y1="75" x2="180" y2="165" stroke="#ef4444" stroke-width="6"/>
      <text x="180" y="180" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="10">Strict Wall of Separation</text>
      <rect x="210" y="80" width="100" height="80" fill="#fef3c7" rx="4"/>
      <text x="260" y="125" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="12">Religion</text>

      <!-- Right: Indian Secularism -->
      <rect x="365" y="30" width="310" height="175" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
      <text x="520" y="55" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="13">Indian Secularism</text>
      <circle cx="520" cy="120" r="45" fill="#10b981"/>
      <text x="520" y="115" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="11">Principled</text>
      <text x="520" y="130" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="11">Distance</text>
      <text x="520" y="175" text-anchor="middle" font-weight="bold" fill="#064e3b" font-size="10">Sarva Dharma Sambhava</text>
      <text x="520" y="192" text-anchor="middle" fill="#047857" font-size="9">Protects minorities (Art 29, 30) &amp; reforms evils</text>
    </svg>`,
    workedExamples: [
      {
        id: "sociology_u4_we1",
        questionNumber: 1,
        question:
          "Which Article of the Constitution of India guarantees the fundamental right of religious and linguistic minorities to establish and administer educational institutions of their choice?\n" +
          "(A) Article 21\n" +
          "(B) Article 25\n" +
          "(C) Article 29\n" +
          "(D) Article 30",
        options: [
          { id: "A", text: "Article 21" },
          { id: "B", text: "Article 25" },
          { id: "C", text: "Article 29" },
          { id: "D", text: "Article 30" },
        ],
        correctOption: "D",
        solutionStepByStep: [
          "Step 1: Review cultural and educational rights in the Indian Constitution.",
          "Step 2: Article 29 gives any section of citizens the right to conserve its distinct language, script, or culture.",
          "Step 3: Article 30 explicitly grants all minorities, whether based on religion or language, the right to establish and administer educational institutions of their choice.",
        ],
        cuetTip: "Article 30 = Right to establish and administer educational institutions.",
      },
      {
        id: "sociology_u4_we2",
        questionNumber: 2,
        question:
          "The States Reorganisation Act of 1956, which reorganized Indian states along linguistic boundaries, was enacted on the recommendations of which commission?\n" +
          "(A) Sarkaria Commission\n" +
          "(B) Fazal Ali Commission\n" +
          "(C) Dhar Commission\n" +
          "(D) Kaka Kalelkar Commission",
        options: [
          { id: "A", text: "Sarkaria Commission" },
          { id: "B", text: "Fazal Ali Commission" },
          { id: "C", text: "Dhar Commission" },
          { id: "D", text: "Kaka Kalelkar Commission" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: The States Reorganisation Commission (SRC) was appointed in 1953.",
          "Step 2: It was headed by Justice Fazal Ali, along with members H.N. Kunzru and K.M. Panikkar.",
          "Step 3: Its 1955 report led directly to the passage of the States Reorganisation Act of 1956.",
        ],
        cuetTip: "States Reorganisation Commission 1953-55 = Fazal Ali Commission.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Article 29 vs 30 Distinction",
        frequency: "Very High",
        typicalStem: "Which article protects minority educational institutions?",
        strategy: "Article 30 is the educational institutions article; Article 29 is the right to conserve language, script, or culture.",
      },
      {
        patternType: "Western vs Indian Secularism",
        frequency: "High",
        typicalStem: "Unlike Western secularism, Indian secularism allows state intervention in religious practices for what purpose?",
        strategy: "To eradicate social evils and ensure social justice (e.g. untouchability, gender discrimination).",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing minority rights in Article 30 apply only to religious groups.",
        whyWrong: "Article 30 explicitly mentions both 'Religious and Linguistic' minorities.",
        correctUnderstanding: "Article 30 protects both religious and linguistic minorities.",
        trapOptionExample: "Option claiming linguistic groups cannot claim minority status under Article 30.",
      },
      {
        misconception: "Confusing Integrationist policies with Assimilationist policies.",
        whyWrong: "Assimilationist policies compel minorities to shed their culture and melt into the dominant identity. Integrationist policies protect cultural diversity within a single democratic citizenship.",
        correctUnderstanding: "Assimilation = Enforced conformity; Integration = Pluralism within unity.",
        trapOptionExample: "Labeling India's linguistic states policy as assimilationist.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Minority Rights Articles",
        mnemonic: "29-Culture / 30-Colleges",
        rule: "Art 29 = Cultural preservation | Art 30 = Educational institutions/Colleges",
        explanation: "Never mix up the two minority rights articles.",
      },
      {
        title: "SRC Trio",
        mnemonic: "F-K-P (Fazal, Kunzru, Panikkar)",
        rule: "Fazal Ali, H.N. Kunzru, K.M. Panikkar",
        explanation: "The three members of the States Reorganisation Commission.",
      },
    ],
    quickRevisionCard: {
      title: "Unity in Diversity — 60-Second Flash Card",
      bulletPoints: [
        "Nation: 'Imagined community' (Benedict Anderson); State: Sovereign monopoly on legitimate force (Weber).",
        "Policies: Assimilationist (force conformity) vs Integrationist (protect pluralism). India is integrationist.",
        "Regionalism: Potti Sreeramulu hunger strike (1952) led to Andhra State (1953).",
        "States Reorganisation Act (1956): Fazal Ali Commission; created 14 states and 6 UTs.",
        "Communalism: Political weaponisation of religious identity, asserting conflicting interests.",
        "Western Secularism: Strict wall of separation between Church and State.",
        "Indian Secularism: Principled distance, Sarva Dharma Sambhava, state intervention for social reform.",
        "Minority Rights: Article 29 (Culture/Language) & Article 30 (Educational institutions).",
        "RTI Act 2005: Grassroots movement led by Mazdoor Kisan Shakti Sangathan (MKSS, Aruna Roy).",
      ],
      examTricks: [
        "Article 30 covers BOTH religious and linguistic minorities.",
        "SRC 1956 was headed by Justice Fazal Ali.",
      ],
    },
    practiceQuestions: [
      {
        id: "sociology_u4_q1",
        question: "Who defined the nation as an 'imagined community'?",
        type: "standard",
        options: [
          { id: "A", text: "Max Weber" },
          { id: "B", text: "Benedict Anderson" },
          { id: "C", text: "Ernest Gellner" },
          { id: "D", text: "Eric Hobsbawm" },
        ],
        correctOption: "B",
        explanation: "Benedict Anderson famously conceptualized the nation as an 'imagined community' in his 1983 book.",
        difficulty: "easy",
      },
      {
        id: "sociology_u4_q2",
        question: "Which of the following describes the core principle of 'Indian Secularism'?",
        type: "standard",
        options: [
          { id: "A", text: "Absolute wall of separation with complete mutual exclusion between state and religion" },
          { id: "B", text: "Principled distance, equal respect for all religions, and state intervention to reform social evils" },
          { id: "C", text: "Complete state hostility toward all religious displays in public life" },
          { id: "D", text: "Official patronage of the majority religion exclusively" },
        ],
        correctOption: "B",
        explanation: "Indian secularism is characterized by principled distance, Sarva Dharma Sambhava (equal respect), and positive state reform intervention.",
        difficulty: "easy",
      },
      {
        id: "sociology_u4_q3",
        question:
          "Assertion (A): The creation of linguistic states in 1956 consolidated rather than fragmented Indian national unity.\n" +
          "Reason (R): Accommodating linguistic identities satisfied regional aspirations and gave diverse linguistic communities a stake in the democratic union.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Linguistic reorganization defused separatist tensions by democratizing regional governance and harmonizing linguistic pride with national unity.",
        difficulty: "easy",
      },
      {
        id: "sociology_u4_q4",
        question: "Whose 58-day hunger strike in 1952 precipitated the creation of Andhra State for Telugu speakers?",
        type: "standard",
        options: [
          { id: "A", text: "Tanguturi Prakasam" },
          { id: "B", text: "Potti Sreeramulu" },
          { id: "C", text: "Neelam Sanjiva Reddy" },
          { id: "D", text: "K. Kamaraj" },
        ],
        correctOption: "B",
        explanation: "Potti Sreeramulu undertook a fast unto death in 1952, culminating in the historic formation of Andhra State in 1953.",
        difficulty: "easy",
      },
      {
        id: "sociology_u4_q5",
        question:
          "Match List-I (Article / Act / Concept) with List-II (Core Subject Matter):\n" +
          "List-I:\n" +
          "p. Article 29\n" +
          "q. Article 30\n" +
          "r. MKSS (Mazdoor Kisan Shakti Sangathan)\n" +
          "s. States Reorganisation Act 1956\n" +
          "List-II:\n" +
          "1. Right of minorities to establish & administer educational institutions\n" +
          "2. Creation of 14 linguistic states and 6 UTs\n" +
          "3. Protection of distinct language, script, or culture\n" +
          "4. Grassroots struggle leading to Right to Information (RTI 2005)\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-3, q-1, r-4, s-2" },
          { id: "B", text: "p-1, q-3, r-4, s-2" },
          { id: "C", text: "p-3, q-2, r-1, s-4" },
          { id: "D", text: "p-4, q-1, r-2, s-3" },
        ],
        correctOption: "A",
        explanation: "Article 29 (p-3: Culture/Language), Article 30 (q-1: Minority schools), MKSS (r-4: RTI struggle), SRC 1956 (s-2: 14 states).",
        difficulty: "easy",
      },
      {
        id: "sociology_u4_q6",
        question: "State policies that seek to suppress cultural differences and force minority communities to adopt the dominant culture are called:",
        type: "standard",
        options: [
          { id: "A", text: "Integrationist policies" },
          { id: "B", text: "Assimilationist policies" },
          { id: "C", text: "Pluralist policies" },
          { id: "D", text: "Federalist policies" },
        ],
        correctOption: "B",
        explanation: "Assimilationist policies aim to homogenize a society by forcing minority groups to abandon their unique identity and adopt the dominant culture.",
        difficulty: "easy",
      },
      {
        id: "sociology_u4_q7",
        question: "In sociology, 'Communalism' is fundamentally understood as:",
        type: "standard",
        options: [
          { id: "A", text: "Deep personal religious piety and prayer" },
          { id: "B", text: "A modern political ideology asserting that religious identity overrides all other socioeconomic interests" },
          { id: "C", text: "Community living in rural agricultural cooperatives" },
          { id: "D", text: "Practising meditation in monastic ashrams" },
        ],
        correctOption: "B",
        explanation: "Communalism is the political mobilization of religious identity asserting that communities with different faiths have conflicting political interests.",
        difficulty: "easy",
      },
      {
        id: "sociology_u4_q8",
        question:
          "Assertion (A): Article 30 of the Constitution grants minorities the right to establish and administer educational institutions.\n" +
          "Reason (R): This protection applies exclusively to religious minorities and excludes linguistic minorities.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "C",
        explanation: "Statement (A) is true, but (R) is false because Article 30 explicitly covers both 'religious or linguistic' minorities.",
        difficulty: "medium",
      },
      {
        id: "sociology_u4_q9",
        question: "The Right to Information (RTI) Act was officially enacted by the Indian Parliament in which year?",
        type: "standard",
        options: [
          { id: "A", text: "1995" },
          { id: "B", text: "2000" },
          { id: "C", text: "2005" },
          { id: "D", text: "2010" },
        ],
        correctOption: "C",
        explanation: "The Right to Information Act came into force in 2005.",
        difficulty: "easy",
      },
      {
        id: "sociology_u4_q10",
        question: "Who among the following was the Chairman of the States Reorganisation Commission appointed in 1953?",
        type: "standard",
        options: [
          { id: "A", text: "Justice Fazal Ali" },
          { id: "B", text: "K.M. Panikkar" },
          { id: "C", text: "H.N. Kunzru" },
          { id: "D", text: "S.K. Dhar" },
        ],
        correctOption: "A",
        explanation: "Justice Fazal Ali was the Chairman of the States Reorganisation Commission (1953-1955).",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Social Inequality and Exclusion"],
      relatedTopics: ["Process of Social Change in India", "Social Change and the Polity / Economy"],
      practiceTestId: "practice-sociology-unit4-test1",
      practiceTestUrl: "/test/practice-sociology-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=sociology",
      weaknessRadarUrl: "/dashboard/radar?subject=sociology",
    },
  },
];
