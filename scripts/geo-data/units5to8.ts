import { NoteDocument } from "@/types/notes";

export const geoUnits5to8Topics: NoteDocument[] = [
  // -------------------------------------------------------------------------
  // UNIT 5: India: People and Economy - Population & Settlements
  // -------------------------------------------------------------------------
  {
    id: "geo_u5_t1",
    slug: "indian-demographic-dynamics-rural-and-urban-settlements-urbanisation-trends",
    subject: "geo",
    subjectName: "Geography",
    subjectCode: "313",
    unitNumber: 5,
    unitTitle: "India: People and Economy - Population & Settlements",
    topicTitle: "Indian Demographic Dynamics, Rural and Urban Settlements, Urbanisation Trends",
    ncertReference: {
      class: "12",
      book: "India: People and Economy",
      chapterNumber: 1,
      chapterName: "Population: Distribution, Density, Growth and Composition & Human Settlements",
      sections: [
        "Distribution and Density of Population in India (2011 Census)",
        "Phases of Population Growth (1901-2011)",
        "Linguistic and Religious Composition of India",
        "Rural Settlement Types: Clustered, Semi-clustered, Hamleted, Dispersed",
        "Classification of Towns on the Basis of Functions",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (16+ questions across sets)",
      totalPyqsInRepo: 36,
      weightagePercentage: 8.5,
    },
    summary30Seconds: [
      "Census 2011: India's population was 1,210.2 million; average density 382 persons/sq km. Bihar has highest density (1,106), Arunachal Pradesh lowest (17). Delhi highest among UTs (11,320).",
      "Four Growth Phases: Phase I (1901-1921, Stagnant/negative 1911-21); Phase II (1921-1951, Steady growth); Phase III (1951-1981, Population explosion); Phase IV (1981-2011, High growth with deceleration).",
      "Rural Settlement Types: Clustered (Ganga plains, Bundelkhand), Semi-clustered (Gujarat plain, caste segregation), Hamleted (Panna/Para/Dhani), Dispersed (isolated huts, Meghalaya, Kerala hills).",
      "Functional Towns: Administrative (New Delhi, Chandigarh), Industrial (Bhilai, Jamshedpur), Mining (Raniganj, Jharia), Garrison/Cantonment (Ambala, Babina, Mhow), Religious (Varanasi, Puri, Tirupati).",
    ],
    coreConcepts: [
      {
        title: "1. Spatial Distribution & Density of Population in India",
        content:
          "India is the second most populous country in the 2011 Census with 1.21 billion people (17.5% of world population):\n" +
          "• **Arithmetic Density**: 382 persons per sq km in 2011 (up from 325 in 2001 and 117 in 1951).\n" +
          "• **Highest State Density**: **Bihar** (1,106 persons/sq km), followed by West Bengal (1,028) and Kerala (860).\n" +
          "• **Lowest State Density**: **Arunachal Pradesh** (17 persons/sq km).\n" +
          "• **Union Territories**: NCT of Delhi has the highest density in India (11,320 persons/sq km); Andaman and Nicobar Islands has the lowest among UTs (46 persons/sq km).\n" +
          "• **Physiological Density**: $\\frac{\\text{Total Population}}{\\text{Net Cultivated Area}}$.\n" +
          "• **Agricultural Density**: $\\frac{\\text{Total Agricultural Population}}{\\text{Net Cultivable Area}}$. (Agricultural population includes cultivators and agricultural labourers and their family members).",
        ncertPointers: [
          "Arithmetic vs Physiological vs Agricultural density formulas are common numerical/definition MCQs.",
          "Density extremes: Bihar (highest state: 1,106) and Arunachal Pradesh (lowest state: 17).",
        ],
      },
      {
        title: "2. The Four Distinct Phases of Population Growth in India",
        content:
          "India's demographic history over the 20th century is divided into four distinct phases:\n\n" +
          "• **Phase I (1901-1921) — Period of Stagnant or Stationary Phase**:\n" +
          "  - Birth rate and death rate were both very high; growth rate remained very low.\n" +
          "  - **1911-1921 recorded a negative growth rate (-0.31%)** due to famines, plague, and the 1918 influenza epidemic.\n" +
          "  - The year **1921** is termed the **'Great Demographic Divide'**.\n\n" +
          "• **Phase II (1921-1951) — Period of Steady Population Growth**:\n" +
          "  - Overall improvement in sanitation and public health reduced mortality rates.\n" +
          "  - Crude birth rate remained high; steady growth of 1.0% to 1.3% annually.\n\n" +
          "• **Phase III (1951-1981) — Period of Population Explosion**:\n" +
          "  - Rapid fall in mortality rate due to developmental planning and disease eradication, while fertility remained persistently high.\n" +
          "  - Annual average growth rate soared above 2.2% (highest decadal growth was 1961-1971 at 24.8%).\n" +
          "  - International migration from Tibet, Bangladesh, Pakistan, and Nepal also contributed.\n\n" +
          "• **Phase IV (Post-1981 to Present) — High Growth with Definite Signs of Slowing Down**:\n" +
          "  - Crude birth rate started declining steadily due to rising age at marriage, female literacy, and family planning.",
        ncertPointers: [
          "1911-1921 is the ONLY decade in modern Indian census history with negative population growth (-0.31%).",
          "1921 is universally known as the 'Year of the Great Demographic Divide'.",
        ],
      },
      {
        title: "3. Types of Rural Settlements in India",
        content:
          "Rural settlement patterns are shaped by physical terrain, climate, water availability, and socio-cultural factors:\n\n" +
          "• **1. Clustered, Agglomerated or Nucleated Settlements**:\n" +
          "  - Closely built-up houses with streets separating them; distinct living area separated from surrounding fields.\n" +
          "  - Found in the fertile **alluvial plains of the Ganga**, Sutlej plains, and north-eastern states.\n" +
          "  - Practised for security/defence in Bundelkhand and Nagaland, or for water management in Rajasthan.\n\n" +
          "• **2. Semi-Clustered or Fragmented Settlements**:\n" +
          "  - Results from tendency of clustering in a restricted area of dispersed settlement, or segregation of caste groups.\n" +
          "  - Dominant landed community occupies central part of the village; lower castes/menial workers live on outer flanks or fringes.\n" +
          "  - Widespread in **Gujarat plains** and parts of Rajasthan.\n\n" +
          "• **3. Hamleted Settlements**:\n" +
          "  - Fragmented into several physical units bearing common names across space (known locally as **Panna, Para, Palli, Nagla, Dhani**).\n" +
          "  - Motivated by social and ethnic segmentation in middle and lower Ganga plains, Chhattisgarh, and lower valleys of Himalayas.\n\n" +
          "• **4. Dispersed or Isolated Settlements**:\n" +
          "  - Isolated huts or tiny hamlets of a few huts scattered across remote hills, dense forests, or fragmented farms.\n" +
          "  - Characteristic of **Meghalaya, Uttaranchal, Himachal Pradesh, and Kerala**.",
        ncertPointers: [
          "Local names: Panna, Para, Palli, Nagla, Dhani = Hamleted settlements.",
          "Caste segregation on village periphery = Semi-clustered settlements.",
        ],
      },
      {
        title: "4. Functional Classification of Indian Towns",
        content:
          "Towns are classified according to their predominant economic activity or historical function:\n" +
          "• **Administrative Towns**: National/state capitals: New Delhi, Chandigarh, Bhopal, Gandhinagar, Dispur, Bhubaneswar.\n" +
          "• **Industrial Towns**: Prime drivers of industrial production: Bhilai, Jamshedpur, Durgapur, Modinagar, Salem.\n" +
          "• **Transport / Port Towns**: Inland transport nodes (Mughalsarai, Itarsi, Katni) or ocean port cities (Kandla, Kochi, Kozhikode, Visakhapatnam).\n" +
          "• **Commercial Towns**: Specialise in trade and commerce: Kolkata, Saharanpur, Satna, Muzaffarnagar.\n" +
          "• **Mining Towns**: Mineral extraction centres: Raniganj, Jharia, Bokaro, Digboi, Singrauli, Ankleshwar.\n" +
          "• **Garrison / Cantonment Towns**: Military stations: Ambala, Jalandhar, Mhow, Babina, Udhampur.\n" +
          "• **Educational Towns**: Centers of learning: Roorkee, Varanasi, Aligarh, Pilani, Manipal.\n" +
          "• **Religious and Cultural Towns**: Pilgrim centres: Varanasi, Mathura, Amritsar, Madurai, Puri, Tirupati, Ajmer, Haridwar.\n" +
          "• **Tourist Towns**: Hill stations and recreation resorts: Shimla, Nainital, Mussoorie, Ooty (Udhagamandalam), Mount Abu.",
        ncertPointers: [
          "Mhow and Babina are classic Garrison/Cantonment towns in NCERT.",
          "Roorkee and Pilani are iconic Educational towns.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Census 2011 Demographic Extremes",
        formula: "Bihar (1106) vs Arunachal (17) | Delhi (11320) vs A&N (46)",
        symbols: "National Density = 382 persons/km²",
        siUnits: "Persons per sq km",
        applicationCondition: "Exam questions testing factual extremes",
        notes: "Total population: 1,210.2 million; sex ratio: 943 females per 1000 males.",
      },
      {
        name: "Rural Settlement Typology Matrix",
        formula: "Clustered (Ganga/Bundelkhand) | Semi-clustered (Gujarat/Caste) | Hamleted (Para/Dhani) | Dispersed (Kerala/Meghalaya)",
        symbols: "Physical & Social settlement drivers",
        siUnits: "Settlement Geography",
        applicationCondition: "Match-the-following on settlement types and regional examples",
        notes: "Hamleted settlements arise from social fragmentation in agrarian river valleys.",
      },
      {
        name: "Physiological vs Agricultural Density",
        formula: "Physiological = Total Pop / Net Cultivated Area | Agricultural = Agri Pop / Net Cultivable Area",
        symbols: "P_phys = P / NCA | P_agri = Agri_P / NCA",
        siUnits: "Persons per hectare or sq km of cultivable land",
        applicationCondition: "Definition and distinction questions",
        notes: "Agricultural population excludes non-agrarian rural residents (e.g. weavers, carpenters).",
      },
    ],
    diagram: {
      type: "svg",
      title: "Four Rural Settlement Patterns in India",
      caption: "Spatial layout of Clustered, Semi-clustered, Hamleted, and Dispersed rural settlements.",
      code: `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <!-- Clustered -->
        <rect x="20" y="30" width="150" height="160" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
        <text x="95" y="55" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="12">1. Clustered</text>
        <circle cx="80" cy="90" r="8" fill="#047857"/>
        <circle cx="100" cy="95" r="8" fill="#047857"/>
        <circle cx="90" cy="115" r="8" fill="#047857"/>
        <circle cx="110" cy="120" r="8" fill="#047857"/>
        <text x="95" y="165" text-anchor="middle" fill="#064e3b" font-size="10">Ganga Plains, Defence</text>

        <!-- Semi-clustered -->
        <rect x="190" y="30" width="150" height="160" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="2"/>
        <text x="265" y="55" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="12">2. Semi-Clustered</text>
        <circle cx="265" cy="95" r="10" fill="#b45309"/>
        <circle cx="220" cy="125" r="6" fill="#f59e0b"/>
        <circle cx="310" cy="125" r="6" fill="#f59e0b"/>
        <text x="265" y="165" text-anchor="middle" fill="#78350f" font-size="10">Gujarat, Caste Fringes</text>

        <!-- Hamleted -->
        <rect x="360" y="30" width="150" height="160" rx="8" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="2"/>
        <text x="435" y="55" text-anchor="middle" font-weight="bold" fill="#5b21b6" font-size="12">3. Hamleted</text>
        <rect x="385" y="80" width="25" height="20" fill="#7c3aed" rx="3"/>
        <rect x="450" y="90" width="25" height="20" fill="#7c3aed" rx="3"/>
        <rect x="420" y="125" width="25" height="20" fill="#7c3aed" rx="3"/>
        <text x="435" y="165" text-anchor="middle" fill="#4c1d95" font-size="10">Panna, Para, Dhani</text>

        <!-- Dispersed -->
        <rect x="530" y="30" width="170" height="160" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
        <text x="615" y="55" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="12">4. Dispersed</text>
        <circle cx="560" cy="85" r="6" fill="#2563eb"/>
        <circle cx="660" cy="95" r="6" fill="#2563eb"/>
        <circle cx="585" cy="135" r="6" fill="#2563eb"/>
        <circle cx="645" cy="140" r="6" fill="#2563eb"/>
        <text x="615" y="165" text-anchor="middle" fill="#1e3a8a" font-size="10">Meghalaya, Kerala Hills</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <!-- Clustered -->
      <rect x="20" y="30" width="150" height="160" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
      <text x="95" y="55" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="12">1. Clustered</text>
      <circle cx="80" cy="90" r="8" fill="#047857"/>
      <circle cx="100" cy="95" r="8" fill="#047857"/>
      <circle cx="90" cy="115" r="8" fill="#047857"/>
      <circle cx="110" cy="120" r="8" fill="#047857"/>
      <text x="95" y="165" text-anchor="middle" fill="#064e3b" font-size="10">Ganga Plains, Defence</text>

      <!-- Semi-clustered -->
      <rect x="190" y="30" width="150" height="160" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="2"/>
      <text x="265" y="55" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="12">2. Semi-Clustered</text>
      <circle cx="265" cy="95" r="10" fill="#b45309"/>
      <circle cx="220" cy="125" r="6" fill="#f59e0b"/>
      <circle cx="310" cy="125" r="6" fill="#f59e0b"/>
      <text x="265" y="165" text-anchor="middle" fill="#78350f" font-size="10">Gujarat, Caste Fringes</text>

      <!-- Hamleted -->
      <rect x="360" y="30" width="150" height="160" rx="8" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="2"/>
      <text x="435" y="55" text-anchor="middle" font-weight="bold" fill="#5b21b6" font-size="12">3. Hamleted</text>
      <rect x="385" y="80" width="25" height="20" fill="#7c3aed" rx="3"/>
      <rect x="450" y="90" width="25" height="20" fill="#7c3aed" rx="3"/>
      <rect x="420" y="125" width="25" height="20" fill="#7c3aed" rx="3"/>
      <text x="435" y="165" text-anchor="middle" fill="#4c1d95" font-size="10">Panna, Para, Dhani</text>

      <!-- Dispersed -->
      <rect x="530" y="30" width="170" height="160" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
      <text x="615" y="55" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="12">4. Dispersed</text>
      <circle cx="560" cy="85" r="6" fill="#2563eb"/>
      <circle cx="660" cy="95" r="6" fill="#2563eb"/>
      <circle cx="585" cy="135" r="6" fill="#2563eb"/>
      <circle cx="645" cy="140" r="6" fill="#2563eb"/>
      <text x="615" y="165" text-anchor="middle" fill="#1e3a8a" font-size="10">Meghalaya, Kerala Hills</text>
    </svg>`,
    workedExamples: [
      {
        id: "geo_u5_we1",
        questionNumber: 1,
        question:
          "Which decade in the demographic history of India is known for registering a negative population growth rate?\n" +
          "(A) 1901-1911\n" +
          "(B) 1911-1921\n" +
          "(C) 1921-1931\n" +
          "(D) 1941-1951",
        options: [
          { id: "A", text: "1901-1911" },
          { id: "B", text: "1911-1921" },
          { id: "C", text: "1921-1931" },
          { id: "D", text: "1941-1951" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Check the census growth records in NCERT India: People and Economy, Ch 1.",
          "Step 2: During the decade 1911-1921, India recorded a negative growth rate of -0.31% due to massive deaths caused by famines and the 1918 influenza pandemic.",
          "Step 3: This led to 1921 being designated as the 'Year of the Great Divide'. Correct answer is 1911-1921 (Option B).",
        ],
        cuetTip: "Negative growth = 1911-1921 (-0.31%). The year 1921 is the Great Demographic Divide.",
      },
      {
        id: "geo_u5_we2",
        questionNumber: 2,
        question:
          "Which of the following towns is correctly categorised as a 'Garrison / Cantonment Town'?\n" +
          "(A) Bhilai\n" +
          "(B) Babina\n" +
          "(C) Pilani\n" +
          "(D) Ankleshwar",
        options: [
          { id: "A", text: "Bhilai" },
          { id: "B", text: "Babina" },
          { id: "C", text: "Pilani" },
          { id: "D", text: "Ankleshwar" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Review functional classification of Indian towns in NCERT.",
          "Step 2: Bhilai = Industrial town; Pilani = Educational town; Ankleshwar = Mining/Petroleum town.",
          "Step 3: Babina (along with Ambala, Jalandhar, and Mhow) is classified as a Garrison / Cantonment town.",
        ],
        cuetTip: "Garrison towns in NCERT: Ambala, Jalandhar, Mhow, Babina, Udhampur.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Settlement Regional Nomenclature Match",
        frequency: "Very High",
        typicalStem: "Panna, Para, Palli, Nagla, and Dhani are local names for which type of rural settlement?",
        strategy: "These names explicitly indicate Hamleted settlements fragmented across physical parcels.",
      },
      {
        patternType: "Census 2011 Density Extremes",
        frequency: "High",
        typicalStem: "According to Census 2011, which Indian state has the highest population density?",
        strategy: "Bihar has the highest state density (1,106 persons/km²), displacing West Bengal (1,028).",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing West Bengal has the highest population density among Indian states.",
        whyWrong: "West Bengal held the highest rank in 2001, but in the 2011 Census, Bihar took first place with 1,106 persons per sq km.",
        correctUnderstanding: "2011 Census: Bihar = 1,106 (1st), West Bengal = 1,028 (2nd).",
        trapOptionExample: "Choosing West Bengal as the highest density state in 2011.",
      },
      {
        misconception: "Confusing Agricultural Density with Physiological Density.",
        whyWrong: "Physiological density divides Total Population by Net Cultivated Area, whereas Agricultural density divides only the Agricultural Population (cultivators + labourers) by Net Cultivable Area.",
        correctUnderstanding: "Physiological = All people / Net cultivated; Agricultural = Farming population / Net cultivable.",
        trapOptionExample: "Using total population in calculating agricultural density.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Four Growth Phases Timeline",
        mnemonic: "S-S-E-D (Still, Steady, Exploding, Decelerating)",
        rule: "1901-21 (Stationary) -> 1921-51 (Steady) -> 1951-81 (Explosion) -> 1981-2011 (Decelerating)",
        explanation: "Instantly remember the 4 population phases of 20th century India.",
      },
      {
        title: "Garrison Towns Acronym",
        mnemonic: "J-A-M-B-U (Jalandhar, Ambala, Mhow, Babina, Udhampur)",
        rule: "All 5 are textbook military cantonments",
        explanation: "Never miss a garrison town identification question.",
      },
    ],
    quickRevisionCard: {
      title: "India: Population & Settlements — 60-Second Flash Card",
      bulletPoints: [
        "2011 Census: Population = 1,210.2 million; Average density = 382 persons/km².",
        "Density Extremes: Bihar (1,106 highest state), Arunachal (17 lowest state); Delhi (11,320 highest UT).",
        "1911-1921: Only decade of negative growth (-0.31%); 1921 = Year of the Great Divide.",
        "1951-1981: Population explosion phase (growth peaked > 2.2% annually).",
        "Clustered Settlements: Compact, fertile Ganga plain; defence in Bundelkhand & Nagaland.",
        "Semi-clustered: Caste segregation, dominant castes in centre, menial workers on periphery (Gujarat).",
        "Hamleted: Panna, Para, Palli, Nagla, Dhani (fragmented agrarian valleys).",
        "Dispersed: Isolated huts in hills and forests (Kerala, Meghalaya, Himachal).",
        "Functional Towns: Administrative (Chandigarh), Industrial (Bhilai), Mining (Jharia), Garrison (Babina, Mhow).",
      ],
      examTricks: [
        "Physiological density uses Net Cultivated Area in the denominator.",
        "Arunachal Pradesh has density of just 17 persons/km².",
      ],
    },
    practiceQuestions: [
      {
        id: "geo_u5_q1",
        question: "According to the 2011 Census of India, what is the national average population density?",
        type: "standard",
        options: [
          { id: "A", text: "325 persons/sq km" },
          { id: "B", text: "382 persons/sq km" },
          { id: "C", text: "415 persons/sq km" },
          { id: "D", text: "450 persons/sq km" },
        ],
        correctOption: "B",
        explanation: "As per Census 2011, India's arithmetic population density is 382 persons per square kilometre.",
        difficulty: "easy",
      },
      {
        id: "geo_u5_q2",
        question: "Which of the following Indian states recorded the lowest population density in Census 2011?",
        type: "standard",
        options: [
          { id: "A", text: "Sikkim" },
          { id: "B", text: "Mizoram" },
          { id: "C", text: "Arunachal Pradesh" },
          { id: "D", text: "Nagaland" },
        ],
        correctOption: "C",
        explanation: "Arunachal Pradesh recorded the lowest population density among Indian states at 17 persons per square kilometre.",
        difficulty: "easy",
      },
      {
        id: "geo_u5_q3",
        question:
          "Assertion (A): The year 1921 is regarded as the 'Great Demographic Divide' in the demographic history of India.\n" +
          "Reason (R): Prior to 1921, population growth was erratic and often stagnant, whereas after 1921, India entered a phase of steady and continuous population growth.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "1921 marks the transition point where mortality rates began declining steadily due to epidemic controls, ending the era of demographic stagnation.",
        difficulty: "medium",
      },
      {
        id: "geo_u5_q4",
        question: "Rural settlements where the dominant landed community occupies the central village while lower caste labourers live on the outer periphery are termed:",
        type: "standard",
        options: [
          { id: "A", text: "Clustered settlements" },
          { id: "B", text: "Semi-clustered settlements" },
          { id: "C", text: "Hamleted settlements" },
          { id: "D", text: "Dispersed settlements" },
        ],
        correctOption: "B",
        explanation: "Semi-clustered settlements represent segregation where social stratification forces menial workers to live on the village periphery, typical in Gujarat plains.",
        difficulty: "medium",
      },
      {
        id: "geo_u5_q5",
        question:
          "Match List-I (Town) with List-II (Dominant Functional Classification):\n" +
          "List-I:\n" +
          "p. Jamshedpur\n" +
          "q. Mhow\n" +
          "r. Varanasi\n" +
          "s. Pilani\n" +
          "List-II:\n" +
          "1. Religious and cultural town\n" +
          "2. Educational town\n" +
          "3. Industrial town\n" +
          "4. Garrison / Cantonment town\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-3, q-4, r-1, s-2" },
          { id: "B", text: "p-4, q-3, r-1, s-2" },
          { id: "C", text: "p-3, q-1, r-4, s-2" },
          { id: "D", text: "p-2, q-4, r-1, s-3" },
        ],
        correctOption: "A",
        explanation: "Jamshedpur (Industrial: p-3), Mhow (Garrison: q-4), Varanasi (Religious: r-1), Pilani (Educational: s-2).",
        difficulty: "easy",
      },
      {
        id: "geo_u5_q6",
        question: "Local names such as 'Panna', 'Para', 'Palli', 'Nagla', and 'Dhani' are associated with which settlement type?",
        type: "standard",
        options: [
          { id: "A", text: "Dispersed settlements" },
          { id: "B", text: "Hamleted settlements" },
          { id: "C", text: "Compact settlements" },
          { id: "D", text: "Linear coastal settlements" },
        ],
        correctOption: "B",
        explanation: "Hamleted settlements are physically fragmented units sharing a single village identity, known locally as Panna, Para, Nagla, or Dhani.",
        difficulty: "easy",
      },
      {
        id: "geo_u5_q7",
        question: "What is 'Agricultural Density' in population studies?",
        type: "standard",
        options: [
          { id: "A", text: "Total population divided by total geographical area" },
          { id: "B", text: "Total population divided by net cultivated area" },
          { id: "C", text: "Total agricultural population divided by net cultivable area" },
          { id: "D", text: "Rural population divided by gross cropped area" },
        ],
        correctOption: "C",
        explanation: "Agricultural density is calculated as Total Agricultural Population divided by Net Cultivable Area.",
        difficulty: "medium",
      },
      {
        id: "geo_u5_q8",
        question:
          "Assertion (A): Dispersed settlements are commonly found in parts of Meghalaya, Uttarakhand, and Himachal Pradesh.\n" +
          "Reason (R): Highly dissected topography, mountainous terrain, and fragmented land resources encourage isolated hamlets.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Rugged relief and scattered resource pockets in Himalayan regions force people to live in dispersed, isolated homesteads.",
        difficulty: "easy",
      },
      {
        id: "geo_u5_q9",
        question: "Which of the following Union Territories recorded the highest population density in India according to Census 2011?",
        type: "standard",
        options: [
          { id: "A", text: "Chandigarh" },
          { id: "B", text: "Puducherry" },
          { id: "C", text: "NCT of Delhi" },
          { id: "D", text: "Daman and Diu" },
        ],
        correctOption: "C",
        explanation: "NCT of Delhi recorded the highest population density in India at 11,320 persons per square kilometre.",
        difficulty: "easy",
      },
      {
        id: "geo_u5_q10",
        question: "Which of the following is considered an 'Administrative Town'?",
        type: "standard",
        options: [
          { id: "A", text: "Chandigarh" },
          { id: "B", text: "Bhilai" },
          { id: "C", text: "Kandla" },
          { id: "D", text: "Jharia" },
        ],
        correctOption: "A",
        explanation: "Chandigarh serves as a planned administrative capital for both Punjab and Haryana.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["World Population Distribution"],
      relatedTopics: ["India: Resources and Development", "Environmental Issues and Problems"],
      practiceTestId: "practice-geo-unit5-test1",
      practiceTestUrl: "/test/practice-geo-unit5-test1",
      weaknessReportUrl: "/dashboard/radar?subject=geo",
      weaknessRadarUrl: "/dashboard/radar?subject=geo",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 6: India: Resources and Development
  // -------------------------------------------------------------------------
  {
    id: "geo_u6_t1",
    slug: "land-water-mineral-and-energy-resources-planning-and-sustainable-development",
    subject: "geo",
    subjectName: "Geography",
    subjectCode: "313",
    unitNumber: 6,
    unitTitle: "India: Resources and Development",
    topicTitle: "Land, Water, Mineral and Energy Resources, Planning and Sustainable Development",
    ncertReference: {
      class: "12",
      book: "India: People and Economy",
      chapterNumber: 5,
      chapterName: "Land Resources and Agriculture, Water Resources, Mineral & Energy Resources, Planning & Sustainable Development",
      sections: [
        "Land Use Categories and Agricultural Land Use in India",
        "Major Crops: Rice, Wheat, Jowar, Bajra, Cotton, Jute, Tea, Coffee",
        "Water Resources: Surface, Groundwater, Rainwater Harvesting (Neeru-Meeru, Arvary Pani Sansad)",
        "Mineral Belts: North-Eastern Plateau, South-Western Plateau, North-Western Region",
        "Coal (Gondwana vs Tertiary), Petroleum (Mumbai High, Digboi, Ankleshwar)",
        "Target Area Planning: Hill Area, Drought Prone, Indira Gandhi Canal (Command Area)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (22+ questions across slots)",
      totalPyqsInRepo: 44,
      weightagePercentage: 10.0,
    },
    summary30Seconds: [
      "Cropping Seasons: Kharif (June-Sept; rice, cotton, jute), Rabi (Oct-March; wheat, gram, mustard), Zaid (April-June; watermelon, vegetables).",
      "Major Crops: Rice (2nd after China, aus/aman/boro in WB); Wheat (rabi, Punjab/Haryana/UP); Arabica coffee from Yemen grown in Nilgiri hills (Karnataka, Kerala, TN).",
      "Rainwater Harvesting: Neeru-Meeru (Andhra Pradesh), Arvary Pani Sansad (Alwar, Rajasthan), mandatory rooftop rainwater harvesting in Tamil Nadu.",
      "Mineral Belts: North-Eastern Plateau (Chhota Nagpur - 'Ruhr of India'); Coal: 98% Gondwana (Damodar, Son, Mahanadi; Jharia, Raniganj) vs Tertiary (Assam, Meghalaya; Lignite at Neyveli, TN).",
      "Indira Gandhi Canal: Takes off from Harike Barrage (Satlaj-Beas confluence) to green the Thar Desert.",
    ],
    coreConcepts: [
      {
        title: "1. Land Resources & Indian Cropping Seasons",
        content:
          "Agricultural activity in India follows three distinct cropping seasons:\n\n" +
          "• **Kharif Season (June to September)**:\n" +
          "  - Coincides with the South-West Monsoon.\n" +
          "  - Major crops: **Rice (Paddy), Cotton, Jute, Jowar, Bajra, Tur (Arhar)**.\n" +
          "  - In West Bengal, farmers grow three crops of rice in a year: **Aus** (autumn), **Aman** (winter), and **Boro** (summer).\n\n" +
          "• **Rabi Season (October to March / April)**:\n" +
          "  - Begins with the onset of winter and harvested in spring.\n" +
          "  - Major crops: **Wheat, Gram, Rapeseed, Mustard, Barley, Peas**.\n" +
          "  - Success in Punjab and Haryana is aided by western temperate cyclonic disturbances (Mahawat).\n\n" +
          "• **Zaid Season (April to June)**:\n" +
          "  - Short summer cropping season between rabi harvest and kharif sowing.\n" +
          "  - Major crops: **Watermelon, Muskmelon, Cucumber, Vegetables, and Fodder crops**.",
        ncertPointers: [
          "Aus, Aman, and Boro are the three rice crops grown in West Bengal and Assam.",
          "Mustard and Gram are Rabi crops; Cotton and Jute are Kharif crops.",
        ],
      },
      {
        title: "2. Water Resources & Watershed Management Initiatives",
        content:
          "India accounts for ~2.45% of world surface area, 4% of world water resources, but ~17.5% of world population.\n" +
          "• **Groundwater Utilisation**: Extremely high in Punjab, Haryana, Rajasthan, and Tamil Nadu (>85% groundwater overexploited). Moderate in Gujarat, UP, Bihar; low in Chhattisgarh, Odisha, and North-Eastern states.\n" +
          "• **Water Pollution**: Domestic sewage and industrial effluents heavily contaminate river stretches; the **Ganga** (Kanpur to Varanasi) and the **Yamuna** (Delhi to confluence with Chambal) are the most critically polluted.\n\n" +
          "• **Community Watershed & Water Harvesting Success Stories**:\n" +
          "  - **Haryali**: Central government sponsored watershed development project implemented by Gram Panchayats.\n" +
          "  - **Neeru-Meeru (Water and You)**: Popular participatory water conservation programme launched in **Andhra Pradesh**.\n" +
          "  - **Arvary Pani Sansad**: People's water parliament in **Alwar, Rajasthan**, which constructed Johads (earthen check dams).\n" +
          "  - **Tamil Nadu**: The first state in India to make rooftop rainwater harvesting compulsory for all residential houses.",
        ncertPointers: [
          "Match-the-following: Neeru-Meeru -> Andhra Pradesh; Arvary Pani Sansad -> Alwar, Rajasthan.",
          "Tamil Nadu is the state where rooftop rainwater harvesting is legally mandatory.",
        ],
      },
      {
        title: "3. Mineral Belts & Fossil Fuels of India",
        content:
          "India's minerals are concentrated in three major geographic belts:\n\n" +
          "• **1. North-Eastern Plateau Belt**:\n" +
          "  - Covers Chhota Nagpur (Jharkhand), Odisha plateau, and West Bengal.\n" +
          "  - India's richest mineral belt; contains vast reserves of **iron ore, coal, manganese, bauxite, and mica** ('Ruhr of India').\n\n" +
          "• **2. South-Western Plateau Belt**:\n" +
          "  - Extends over Karnataka, Goa, and contiguous Tamil Nadu and Kerala uplands.\n" +
          "  - Rich in **ferrous metals (iron ore in Bellary-Hospet, Kudremukh), bauxite**, and high-grade limestone. Lacks coal except lignite at **Neyveli**.\n\n" +
          "• **3. North-Western Belt**:\n" +
          "  - Extends along the Aravalli in Rajasthan and parts of Gujarat.\n" +
          "  - Famous for **non-ferrous minerals**: copper (Khetri), zinc, lead (Zawar), marble, granite, and sandstone.\n\n" +
          "• **Coal Resources**:\n" +
          "  - **Gondwana Coal (98% of reserves)**: Formed 250 million years ago; bituminous metallurgical grade coal. Major fields: **Jharia** (largest coalfield), **Raniganj** (oldest coalfield), Bokaro, Giridih, Karanpura in Damodar Valley, Son, Mahanadi, Godavari valleys.\n" +
          "  - **Tertiary Coal (2% of reserves)**: Formed 15-50 million years ago; high sulphur, young coal. Found in Assam (Makum, Nazira), Meghalaya (Cherrapunji, Daranggiri), Arunachal Pradesh, Nagaland, and Jammu & Kashmir.\n" +
          "  - **Lignite (Brown Coal)**: Mined at **Neyveli in Cuddalore district of Tamil Nadu** (used for thermal power generation).\n\n" +
          "• **Petroleum**:\n" +
          "  - **Digboi (Assam)**: Oldest oil producing field in India (1889).\n" +
          "  - **Mumbai High**: Offshore oilfield discovered in 1974, situated 160 km off the Mumbai coast in the Arabian Sea; biggest domestic producer.\n" +
          "  - **Gujarat**: Ankleshwar, Kalol, Mehsana, Nawagam, Lunej.",
        ncertPointers: [
          "Jharia is the largest coalfield; Raniganj is the oldest.",
          "Digboi is the oldest oilfield; Mumbai High is offshore.",
          "Neyveli lignite is in Tamil Nadu.",
        ],
      },
      {
        title: "4. Target Area Planning & Indira Gandhi Canal Project",
        content:
          "Target area programmes focus on lagging and ecologically fragile regions:\n" +
          "• **Drought Prone Area Programme (DPAP)**: Initiated during the Fourth Five Year Plan to generate employment and restore ecological balance in arid zones.\n" +
          "• **Hill Area Development Programme (HADP)**: Initiated during Fifth Five Year Plan covering 15 districts (nilgiris, mikir hills, etc.).\n\n" +
          "• **Indira Gandhi Canal (Nahar) Project**:\n" +
          "  - Conceived by **Kanwar Sain** in 1948; launched in March 1958.\n" +
          "  - Takes off from **Harike Barrage** in Punjab at the confluence of the **Satlaj and Beas rivers**.\n" +
          "  - Runs parallel to the Pakistan border for ~650 km through Rajasthan.\n" +
          "  - **Stage I**: Covers Ganganagar, Hanumangarh, and Bikaner districts.\n" +
          "  - **Stage II**: Extends through Bikaner, Jaisalmer, Barmer, Jodhpur, and Churu.\n" +
          "  - Transformed parched desert into agricultural land (wheat, cotton, mustard, groundnut), but excessive irrigation caused serious **waterlogging and soil salinisation**.",
        ncertPointers: [
          "Canal takes off from Harike Barrage (Satlaj + Beas confluence).",
          "Kanwar Sain was the vision engineer behind the canal in 1948.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Three Cropping Seasons Matrix",
        formula: "Kharif (June-Sep: Rice/Cotton) | Rabi (Oct-Mar: Wheat/Mustard) | Zaid (Apr-Jun: Watermelon/Vegetables)",
        symbols: "Monsoon -> Winter -> Summer cycles",
        siUnits: "Agrarian Calendar",
        applicationCondition: "Crop season attribution questions",
        notes: "Aus, Aman, Boro are 3 seasonal rice crops grown in West Bengal.",
      },
      {
        name: "Coal Fields Classification",
        formula: "Gondwana (98%: Jharia, Raniganj, Bokaro) vs Tertiary (2%: Makum, Cherrapunji) vs Lignite (Neyveli)",
        symbols: "Geological Age: 250 mya vs 50 mya",
        siUnits: "Energy Geology",
        applicationCondition: "Direct match on coal fields and coal quality",
        notes: "Jharia has the richest metallurgical coking coal reserves in India.",
      },
      {
        name: "Watershed Harvesting Programs",
        formula: "Neeru-Meeru (AP) | Arvary Pani Sansad (Alwar, Raj) | Haryali (National) | Mandatory Rooftop (TN)",
        symbols: "Community Water Governance",
        siUnits: "Water Resource Policies",
        applicationCondition: "Match-the-following in CUET",
        notes: "Arvary Pani Sansad involved building Johads (earthen dams) led by Rajendra Singh.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Indira Gandhi Canal & Coal Belts Schematic",
      caption: "Confluence point at Harike Barrage feeding the canal, and Gondwana vs Tertiary coal distribution.",
      code: `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <!-- Left: Harike Barrage & Canal -->
        <rect x="25" y="30" width="310" height="165" rx="8" fill="#ecfeff" stroke="#06b6d4" stroke-width="2"/>
        <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#0e7490" font-size="13">Indira Gandhi Canal (Nahar)</text>
        <path d="M 50,85 Q 120,95 180,85" stroke="#0284c7" stroke-width="3" fill="none"/>
        <text x="100" y="80" font-size="10" fill="#0369a1">Satlaj</text>
        <path d="M 120,115 Q 150,95 180,85" stroke="#0284c7" stroke-width="3" fill="none"/>
        <text x="135" y="125" font-size="10" fill="#0369a1">Beas</text>
        <circle cx="180" cy="85" r="7" fill="#dc2626"/>
        <text x="180" y="75" text-anchor="middle" font-weight="bold" font-size="10" fill="#b91c1c">Harike Barrage</text>
        <path d="M 180,85 Q 220,130 290,165" stroke="#0891b2" stroke-width="4" stroke-dasharray="3" fill="none"/>
        <text x="250" y="150" font-weight="bold" fill="#0e7490" font-size="11">Canal (650 km)</text>
        <text x="180" y="185" text-anchor="middle" fill="#155e75" font-size="10">Greens Thar Desert (Ganganagar, Jaisalmer)</text>

        <!-- Right: Indian Coal Classification -->
        <rect x="365" y="30" width="330" height="165" rx="8" fill="#fef2f2" stroke="#f87171" stroke-width="2"/>
        <text x="530" y="55" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="13">Indian Coal Resources</text>
        
        <rect x="385" y="70" width="135" height="55" fill="#fee2e2" stroke="#ef4444" rx="4"/>
        <text x="452" y="90" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">Gondwana (98%)</text>
        <text x="452" y="108" text-anchor="middle" fill="#991b1b" font-size="10">Jharia, Raniganj</text>

        <rect x="540" y="70" width="135" height="55" fill="#fef9c3" stroke="#ca8a04" rx="4"/>
        <text x="607" y="90" text-anchor="middle" font-weight="bold" fill="#713f12" font-size="11">Tertiary (2%)</text>
        <text x="607" y="108" text-anchor="middle" fill="#854d0e" font-size="10">Makum, Nazira</text>

        <rect x="440" y="135" width="180" height="40" fill="#f1f5f9" stroke="#64748b" rx="4"/>
        <text x="530" y="152" text-anchor="middle" font-weight="bold" fill="#334155" font-size="11">Lignite (Brown Coal)</text>
        <text x="530" y="167" text-anchor="middle" fill="#475569" font-size="10">Neyveli (Tamil Nadu)</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <!-- Left: Harike Barrage & Canal -->
      <rect x="25" y="30" width="310" height="165" rx="8" fill="#ecfeff" stroke="#06b6d4" stroke-width="2"/>
      <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#0e7490" font-size="13">Indira Gandhi Canal (Nahar)</text>
      <path d="M 50,85 Q 120,95 180,85" stroke="#0284c7" stroke-width="3" fill="none"/>
      <text x="100" y="80" font-size="10" fill="#0369a1">Satlaj</text>
      <path d="M 120,115 Q 150,95 180,85" stroke="#0284c7" stroke-width="3" fill="none"/>
      <text x="135" y="125" font-size="10" fill="#0369a1">Beas</text>
      <circle cx="180" cy="85" r="7" fill="#dc2626"/>
      <text x="180" y="75" text-anchor="middle" font-weight="bold" font-size="10" fill="#b91c1c">Harike Barrage</text>
      <path d="M 180,85 Q 220,130 290,165" stroke="#0891b2" stroke-width="4" stroke-dasharray="3" fill="none"/>
      <text x="250" y="150" font-weight="bold" fill="#0e7490" font-size="11">Canal (650 km)</text>
      <text x="180" y="185" text-anchor="middle" fill="#155e75" font-size="10">Greens Thar Desert (Ganganagar, Jaisalmer)</text>

      <!-- Right: Indian Coal Classification -->
      <rect x="365" y="30" width="330" height="165" rx="8" fill="#fef2f2" stroke="#f87171" stroke-width="2"/>
      <text x="530" y="55" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="13">Indian Coal Resources</text>
      
      <rect x="385" y="70" width="135" height="55" fill="#fee2e2" stroke="#ef4444" rx="4"/>
      <text x="452" y="90" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">Gondwana (98%)</text>
      <text x="452" y="108" text-anchor="middle" fill="#991b1b" font-size="10">Jharia, Raniganj</text>

      <rect x="540" y="70" width="135" height="55" fill="#fef9c3" stroke="#ca8a04" rx="4"/>
      <text x="607" y="90" text-anchor="middle" font-weight="bold" fill="#713f12" font-size="11">Tertiary (2%)</text>
      <text x="607" y="108" text-anchor="middle" fill="#854d0e" font-size="10">Makum, Nazira</text>

      <rect x="440" y="135" width="180" height="40" fill="#f1f5f9" stroke="#64748b" rx="4"/>
      <text x="530" y="152" text-anchor="middle" font-weight="bold" fill="#334155" font-size="11">Lignite (Brown Coal)</text>
      <text x="530" y="167" text-anchor="middle" fill="#475569" font-size="10">Neyveli (Tamil Nadu)</text>
    </svg>`,
    workedExamples: [
      {
        id: "geo_u6_we1",
        questionNumber: 1,
        question:
          "The Indira Gandhi Canal originates at which barrage, located at the confluence of which two rivers?\n" +
          "(A) Bhakra Barrage at the confluence of Ravi and Beas\n" +
          "(B) Harike Barrage at the confluence of Satlaj and Beas\n" +
          "(C) Nangal Barrage on the Satlaj River\n" +
          "(D) Pong Dam on the Beas River",
        options: [
          { id: "A", text: "Bhakra Barrage at the confluence of Ravi and Beas" },
          { id: "B", text: "Harike Barrage at the confluence of Satlaj and Beas" },
          { id: "C", text: "Nangal Barrage on the Satlaj River" },
          { id: "D", text: "Pong Dam on the Beas River" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Refer to the section on 'Planning and Sustainable Development in Indian Context' in NCERT.",
          "Step 2: The Indira Gandhi Canal (previously Rajasthan Canal) originates at the Harike Barrage in Punjab.",
          "Step 3: Harike Barrage is built at the confluence of the Satlaj and Beas rivers.",
        ],
        cuetTip: "Harike Barrage = Satlaj + Beas.",
      },
      {
        id: "geo_u6_we2",
        questionNumber: 2,
        question:
          "Which of the following is the oldest oil-producing region in India?\n" +
          "(A) Mumbai High\n" +
          "(B) Ankleshwar\n" +
          "(C) Digboi\n" +
          "(D) Krishna-Godavari Basin",
        options: [
          { id: "A", text: "Mumbai High" },
          { id: "B", text: "Ankleshwar" },
          { id: "C", text: "Digboi" },
          { id: "D", text: "Krishna-Godavari Basin" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Check petroleum fields in NCERT India: People and Economy Ch 7.",
          "Step 2: Digboi in Assam was discovered in 1889 and is the oldest oilfield in India.",
          "Step 3: Mumbai High was discovered later in 1974.",
        ],
        cuetTip: "Oldest = Digboi; Largest offshore = Mumbai High.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Watershed Programmes State Pairing",
        frequency: "Very High",
        typicalStem: "Match the watershed harvesting programme with its state: Neeru-Meeru, Arvary Pani Sansad.",
        strategy: "Neeru-Meeru belongs to Andhra Pradesh; Arvary Pani Sansad was in Alwar, Rajasthan.",
      },
      {
        patternType: "Coal Reserves Geological Classification",
        frequency: "High",
        typicalStem: "About 98% of the coal reserves of India belong to which geological age?",
        strategy: "98% belongs to Gondwana coal fields formed 250 million years ago, located primarily in the Damodar, Son, Mahanadi, and Godavari valleys.",
      },
    ],
    commonTraps: [
      {
        misconception: "Thinking Tertiary coal accounts for the majority of India's reserves.",
        whyWrong: "Tertiary coal accounts for only ~2% of reserves; 98% is Gondwana coal.",
        correctUnderstanding: "Gondwana = 98%; Tertiary = 2%.",
        trapOptionExample: "Option stating Tertiary coal forms 80% of Indian coal.",
      },
      {
        misconception: "Believing Indira Gandhi Canal originated from Bhakra Dam.",
        whyWrong: "The canal originates downstream at the Harike Barrage where Satlaj and Beas converge, not at Bhakra Dam.",
        correctUnderstanding: "Origin point is strictly Harike Barrage.",
        trapOptionExample: "Stating canal originates from Bhakra Nangal Dam.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Watershed Programmes States",
        mnemonic: "N-A-P / A-A-R",
        rule: "Neeru-Meeru = Andhra Pradesh | Arvary = Alwar, Rajasthan",
        explanation: "Simple mnemonic to nail community water harvesting match questions.",
      },
      {
        title: "Rice Seasons in Bengal",
        mnemonic: "A-A-B (Autumn-Aus, Autumn/Winter-Aman, Boro-Summer)",
        rule: "Aus, Aman, Boro = Three rice crops grown annually in West Bengal",
        explanation: "Quick recall of the 3 Bengali seasonal rice crops.",
      },
    ],
    quickRevisionCard: {
      title: "India: Resources & Development — 60-Second Flash Card",
      bulletPoints: [
        "Kharif: Rice, cotton, jute; Rabi: Wheat, gram, mustard; Zaid: Watermelon, vegetables.",
        "Aus, Aman, Boro: 3 rice crops grown per year in West Bengal and Assam.",
        "Groundwater overexploited (>85%) in Punjab, Haryana, Rajasthan, Tamil Nadu.",
        "Watershed: Neeru-Meeru (Andhra Pradesh), Arvary Pani Sansad (Alwar, Rajasthan).",
        "Tamil Nadu: First state with mandatory rooftop rainwater harvesting.",
        "Coal: 98% Gondwana (Jharia is largest, Raniganj oldest); Lignite at Neyveli (TN).",
        "Petroleum: Digboi (oldest, Assam); Mumbai High (1974, largest offshore).",
        "Indira Gandhi Canal: Harike Barrage (Satlaj + Beas confluence) in Punjab to Thar Desert.",
      ],
      examTricks: [
        "Jharia has the best coking coal in India.",
        "Neyveli lignite deposits are in Cuddalore district of Tamil Nadu.",
      ],
    },
    practiceQuestions: [
      {
        id: "geo_u6_q1",
        question: "In West Bengal, farmers grow three crops of rice in a year called:",
        type: "standard",
        options: [
          { id: "A", text: "Kharif, Rabi, and Zaid" },
          { id: "B", text: "Aus, Aman, and Boro" },
          { id: "C", text: "Samba, Kuruvai, and Thaladi" },
          { id: "D", text: "Jhum, Milpa, and Ladang" },
        ],
        correctOption: "B",
        explanation: "In West Bengal and Assam, the three seasonal rice crops grown within a single agricultural year are Aus, Aman, and Boro.",
        difficulty: "easy",
      },
      {
        id: "geo_u6_q2",
        question: "Which of the following is the largest coalfield in India in terms of reserves?",
        type: "standard",
        options: [
          { id: "A", text: "Raniganj" },
          { id: "B", text: "Jharia" },
          { id: "C", text: "Bokaro" },
          { id: "D", text: "Singrauli" },
        ],
        correctOption: "B",
        explanation: "Jharia in Jharkhand is the largest coalfield in India, possessing the most valuable metallurgical coking coal reserves.",
        difficulty: "easy",
      },
      {
        id: "geo_u6_q3",
        question:
          "Assertion (A): Excessive canal irrigation in the Indira Gandhi Canal command area has resulted in environmental problems.\n" +
          "Reason (R): Intensive water application in an arid region with poor drainage has led to twin menaces of waterlogging and soil salinisation.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Over-irrigation in sandy desert soils with impermeable hard pans underneath caused the groundwater table to rise, inducing waterlogging and salinisation.",
        difficulty: "medium",
      },
      {
        id: "geo_u6_q4",
        question: "The 'Neeru-Meeru' (Water and You) programme is a watershed management and water harvesting initiative of which state?",
        type: "standard",
        options: [
          { id: "A", text: "Rajasthan" },
          { id: "B", text: "Andhra Pradesh" },
          { id: "C", text: "Gujarat" },
          { id: "D", text: "Madhya Pradesh" },
        ],
        correctOption: "B",
        explanation: "Neeru-Meeru was launched in Andhra Pradesh to undertake community water conservation through excavation of percolation tanks and check dams.",
        difficulty: "easy",
      },
      {
        id: "geo_u6_q5",
        question:
          "Match List-I (Mineral / Energy Resource) with List-II (Key Indian Location):\n" +
          "List-I:\n" +
          "p. Lignite coal\n" +
          "q. Oldest oilfield\n" +
          "r. Copper reserves\n" +
          "s. Largest offshore petroleum\n" +
          "List-II:\n" +
          "1. Digboi (Assam)\n" +
          "2. Mumbai High\n" +
          "3. Neyveli (Tamil Nadu)\n" +
          "4. Khetri (Rajasthan)\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-3, q-1, r-4, s-2" },
          { id: "B", text: "p-1, q-3, r-2, s-4" },
          { id: "C", text: "p-3, q-4, r-1, s-2" },
          { id: "D", text: "p-4, q-1, r-3, s-2" },
        ],
        correctOption: "A",
        explanation: "p-3 (Lignite = Neyveli), q-1 (Oldest oil = Digboi), r-4 (Copper = Khetri), s-2 (Offshore oil = Mumbai High).",
        difficulty: "easy",
      },
      {
        id: "geo_u6_q6",
        question: "Which Indian state was the first to make rooftop rainwater harvesting compulsory for all houses across the state?",
        type: "standard",
        options: [
          { id: "A", text: "Rajasthan" },
          { id: "B", text: "Maharashtra" },
          { id: "C", text: "Tamil Nadu" },
          { id: "D", text: "Kerala" },
        ],
        correctOption: "C",
        explanation: "Tamil Nadu made rooftop rainwater harvesting legally mandatory for all existing and new structures.",
        difficulty: "easy",
      },
      {
        id: "geo_u6_q7",
        question: "Which of the following crops is a Kharif crop in North India but a Rabi crop in South India?",
        type: "standard",
        options: [
          { id: "A", text: "Sesamum" },
          { id: "B", text: "Wheat" },
          { id: "C", text: "Gram" },
          { id: "D", text: "Barley" },
        ],
        correctOption: "A",
        explanation: "Sesamum (Til) is grown as a Kharif crop in North India and as a Rabi crop in South India.",
        difficulty: "medium",
      },
      {
        id: "geo_u6_q8",
        question: "The Harike Barrage is situated at the confluence of which two rivers?",
        type: "standard",
        options: [
          { id: "A", text: "Ravi and Chenab" },
          { id: "B", text: "Satlaj and Beas" },
          { id: "C", text: "Ganga and Yamuna" },
          { id: "D", text: "Jhelum and Indus" },
        ],
        correctOption: "B",
        explanation: "Harike Barrage is constructed at the confluence of the Satlaj and Beas rivers in Punjab.",
        difficulty: "easy",
      },
      {
        id: "geo_u6_q9",
        question: "What proportion of India's total coal reserves belongs to the Gondwana geological formation?",
        type: "standard",
        options: [
          { id: "A", text: "About 50%" },
          { id: "B", text: "About 75%" },
          { id: "C", text: "About 98%" },
          { id: "D", text: "About 25%" },
        ],
        correctOption: "C",
        explanation: "About 98% of Indian coal reserves are Gondwana coal, located primarily in peninsular river valleys.",
        difficulty: "easy",
      },
      {
        id: "geo_u6_q10",
        question: "In which year was the Drought Prone Area Programme (DPAP) initiated in India?",
        type: "standard",
        options: [
          { id: "A", text: "First Five Year Plan" },
          { id: "B", text: "Fourth Five Year Plan" },
          { id: "C", text: "Seventh Five Year Plan" },
          { id: "D", text: "Tenth Five Year Plan" },
        ],
        correctOption: "B",
        explanation: "The Drought Prone Area Programme was initiated during the Fourth Five Year Plan to create employment and restore ecological balance.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["Human Activities"],
      relatedTopics: ["India: Transport, Communication & Trade", "Environmental Pollution"],
      practiceTestId: "practice-geo-unit6-test1",
      practiceTestUrl: "/test/practice-geo-unit6-test1",
      weaknessReportUrl: "/dashboard/radar?subject=geo",
      weaknessRadarUrl: "/dashboard/radar?subject=geo",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 7: India: Transport, Communication & Trade
  // -------------------------------------------------------------------------
  {
    id: "geo_u7_t1",
    slug: "indian-transportation-infrastructure-ports-foreign-trade-composition",
    subject: "geo",
    subjectName: "Geography",
    subjectCode: "313",
    unitNumber: 7,
    unitTitle: "India: Transport, Communication & Trade",
    topicTitle: "Indian Transportation Infrastructure, Ports, Foreign Trade Composition",
    ncertReference: {
      class: "12",
      book: "India: People and Economy",
      chapterNumber: 10,
      chapterName: "Transport and Communication & International Trade",
      sections: [
        "Road Transport: NHDP (Golden Quadrilateral, NS-EW Corridors), BRO, National Highways",
        "Rail Transport: Historical Evolution, Railway Gauges, Konkan Railway",
        "Water Transport: National Waterways (NW-1, NW-2, NW-3)",
        "Major Ports of India: West Coast vs East Coast Ports",
        "Composition and Direction of India's Foreign Trade",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (18+ questions across slots)",
      totalPyqsInRepo: 38,
      weightagePercentage: 9.0,
    },
    summary30Seconds: [
      "Golden Quadrilateral: 5,846 km 4/6-lane highway connecting Delhi, Mumbai, Chennai, Kolkata; implemented by NHAI (est. 1995).",
      "North-South Corridor (Srinagar to Kanyakumari, 4,076 km) & East-West Corridor (Silchar to Porbandar, 3,640 km).",
      "Konkan Railway: 760 km from Roha (Maharashtra) to Thokur (Karnataka); engineering marvel passing 146 rivers, 2,000 bridges, 91 tunnels.",
      "National Waterways: NW-1 (Ganga: Prayagraj to Haldia, 1,620 km, longest); NW-2 (Brahmaputra: Sadiya to Dhubri, 891 km); NW-3 (West Coast Canal: Kottapuram to Kollam, 205 km).",
      "12 Major Ports: West Coast (Kandla, Mumbai, JNPT, Marmagao, New Mangalore, Kochi); East Coast (Tuticorin, Chennai, Ennore, Visakhapatnam, Paradip, Kolkata-Haldia).",
    ],
    coreConcepts: [
      {
        title: "1. Road Transport Infrastructure & Corridors",
        content:
          "India has the second largest road network in the world (~62 lakh km):\n\n" +
          "• **National Highways Development Project (NHDP)**:\n" +
          "  - Implemented by **National Highways Authority of India (NHAI)**, operationalised in 1995 under the Ministry of Surface Transport.\n" +
          "  - **Golden Quadrilateral**: 5,846 km long, 4/6 lane high-density corridor connecting the four mega-cities: **Delhi – Mumbai – Chennai – Kolkata – Delhi**.\n" +
          "  - **North-South Corridor**: Connects **Srinagar** in Jammu & Kashmir to **Kanyakumari** in Tamil Nadu (4,076 km, includes Kochi-Salem spur).\n" +
          "  - **East-West Corridor**: Connects **Silchar** in Assam to **Porbandar** in Gujarat (3,640 km).\n\n" +
          "• **Border Roads Organisation (BRO)**:\n" +
          "  - Established in **May 1960** for accelerating economic development and strengthening defence preparedness through rapid road building in northern and north-eastern border areas.\n" +
          "  - Constructed the landmark **Atal Tunnel** (Rohtang Tunnel, 9.02 km long) connecting Manali to Lahaul-Spiti valley year-round at an altitude of 3,000 metres.",
        ncertPointers: [
          "Terminals of EW Corridor: Silchar (Assam) and Porbandar (Gujarat).",
          "Terminals of NS Corridor: Srinagar (J&K) and Kanyakumari (Tamil Nadu).",
          "BRO establishment year: May 1960.",
        ],
      },
      {
        title: "2. Indian Railways & The Konkan Railway Marvel",
        content:
          "• **Historical Evolution**: First railway train in India ran over a distance of **34 km** from **Bombay (Bori Bunder) to Thane on 16 April 1853**.\n" +
          "• **Railway Gauges in India**:\n" +
          "  - **Broad Gauge**: 1.676 metres (accounts for vast majority of routes under Project Unigauge).\n" +
          "  - **Metre Gauge**: 1.000 metre.\n" +
          "  - **Narrow Gauge**: 0.762 metre and 0.610 metre (confined largely to hill railways like Darjeeling, Kalka-Shimla, Nilgiri).\n\n" +
          "• **The Konkan Railway**:\n" +
          "  - Constructed in 1998, running **760 km** along the western coastal strip.\n" +
          "  - Connects **Roha in Maharashtra** to **Thokur (near Mangalore) in Karnataka**.\n" +
          "  - Traverses through three states: Maharashtra, Goa, and Karnataka.\n" +
          "  - Masterpiece of civil engineering: crosses 146 rivers and streams, nearly 2,000 bridges, and 91 tunnels (including the 6.5 km long Karbude tunnel).",
        ncertPointers: [
          "Konkan Railway terminals: Roha (Maharashtra) to Thokur (Karnataka).",
          "Broad gauge width: 1.676 m.",
        ],
      },
      {
        title: "3. National Waterways of India",
        content:
          "Inland Waterways Authority of India (IWAI) was set up in 1986 for the development, maintenance, and regulation of national waterways:\n\n" +
          "• **National Waterway No. 1 (NW-1)**:\n" +
          "  - River: **Ganga - Bhagirathi - Hugli river system**.\n" +
          "  - Stretch: **Prayagraj (Allahabad) to Haldia**.\n" +
          "  - Length: **1,620 km** (Longest National Waterway in India).\n\n" +
          "• **National Waterway No. 2 (NW-2)**:\n" +
          "  - River: **Brahmaputra River**.\n" +
          "  - Stretch: **Sadiya to Dhubri** (in Assam).\n" +
          "  - Length: **891 km**.\n\n" +
          "• **National Waterway No. 3 (NW-3)**:\n" +
          "  - Waterway: **West Coast Canal** (along with Champakara and Udyogmandal canals).\n" +
          "  - Stretch: **Kottapuram to Kollam** (in Kerala).\n" +
          "  - Length: **205 km**; first national waterway with 24-hour navigation facilities.",
        ncertPointers: [
          "NW-1 = Ganga (Prayagraj to Haldia, 1620 km).",
          "NW-2 = Brahmaputra (Sadiya to Dhubri, 891 km).",
          "NW-3 = West Coast Canal (Kottapuram to Kollam, 205 km).",
        ],
      },
      {
        title: "4. Major Ports of India: Characteristics & Hinterland",
        content:
          "India has 12 major ports and ~200 non-major/minor ports handling 95% of foreign trade by volume:\n\n" +
          "**Western Coast Ports**:\n" +
          "• **Kandla (Deendayal Port)**: Located in Gulf of Kachchh, Gujarat; tidal port developed post-partition to compensate for the loss of Karachi port to Pakistan; houses a major Free Trade Zone (SEZ).\n" +
          "• **Mumbai Port**: Natural harbour and the largest port in India; handles general cargo and petroleum.\n" +
          "• **Jawaharlal Nehru Port (JNPT / Nhava Sheva)**: Satellite port built near Mumbai to decongest Mumbai port; largest container handling port in India.\n" +
          "• **Marmagao (Goa)**: Natural harbour at the mouth of Zuari river; major exporter of iron ore to Japan.\n" +
          "• **New Mangalore (Karnataka)**: Specialised in exporting Kudremukh iron ore concentrates and handling petroleum.\n" +
          "• **Kochi Port**: Located at the head of Vembanad Kayal ('Queen of the Arabian Sea'); natural harbour on Willingdon Island.\n\n" +
          "**Eastern Coast Ports**:\n" +
          "• **Tuticorin (V.O. Chidambaranar Port)**: In Tamil Nadu; artificial deep-sea harbour; handles trade with Sri Lanka.\n" +
          "• **Chennai Port**: Oldest artificial harbour on the east coast (opened 1859).\n" +
          "• **Ennore (Kamarajar Port)**: Located 25 km north of Chennai; first corporatised port in India, built to decongest Chennai port.\n" +
          "• **Visakhapatnam (Andhra Pradesh)**: Deepest landlocked and protected harbour in India, connected to sea via an entrance channel cut through solid rock (Dolphin's Nose).\n" +
          "• **Paradip (Odisha)**: Deep-water port located on the Mahanadi delta; major exporter of iron ore to Japan.\n" +
          "• **Kolkata Port (Syama Prasad Mookerjee Port)**: Riverine port located on the Hugli river, 128 km inland from Bay of Bengal; suffers from siltation; aided by **Haldia Port** (downstream satellite port).",
        ncertPointers: [
          "Visakhapatnam = Deepest landlocked harbour (Dolphin's Nose).",
          "Kolkata = Only major riverine port in India.",
          "Kandla = Developed to compensate for Karachi port after partition.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "National Waterways 1, 2, 3 Matrix",
        formula: "NW-1 (Ganga: Prayagraj-Haldia 1620km) | NW-2 (Brahmaputra: Sadiya-Dhubri 891km) | NW-3 (Kerala: Kottapuram-Kollam 205km)",
        symbols: "IWAI designated inland navigation arteries",
        siUnits: "Kilometres of navigable inland water",
        applicationCondition: "Matching waterways with rivers and terminal points",
        notes: "NW-1 is the longest waterway in India.",
      },
      {
        name: "Major Ports Classification by Coast",
        formula: "West Coast (Kandla, Mumbai, JNPT, Marmagao, Mangalore, Kochi) vs East Coast (Tuticorin, Chennai, Ennore, Vizag, Paradip, Kolkata)",
        symbols: "Arabian Sea vs Bay of Bengal Maritime Hubs",
        siUnits: "Maritime Commerce Ports",
        applicationCondition: "Classification and geographical ordering questions",
        notes: "Ennore is the first corporatised major port in India.",
      },
      {
        name: "National Highway Corridors",
        formula: "Golden Quad (5846km) | NS Corridor (Srinagar-Kanyakumari 4076km) | EW Corridor (Silchar-Porbandar 3640km)",
        symbols: "NHAI Highway Grid",
        siUnits: "Kilometres",
        applicationCondition: "Termini and route questions in CUET",
        notes: "NS and EW corridors intersect at Jhansi, Uttar Pradesh.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Major Ports of India (West Coast vs East Coast)",
      caption: "Geographical distribution of 12 Major Ports of India along the Arabian Sea and Bay of Bengal.",
      code: `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <!-- West Coast Panel -->
        <rect x="25" y="30" width="320" height="175" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
        <text x="185" y="55" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="13">Western Coast Ports (Arabian Sea)</text>
        <text x="50" y="80" fill="#1e3a8a" font-size="11">• Kandla (Deendayal) — Tidal / SEZ</text>
        <text x="50" y="102" fill="#1e3a8a" font-size="11">• Mumbai — Largest natural harbour</text>
        <text x="50" y="124" fill="#1e3a8a" font-size="11">• JNPT (Nhava Sheva) — Largest container port</text>
        <text x="50" y="146" fill="#1e3a8a" font-size="11">• Marmagao (Goa) — Iron ore to Japan</text>
        <text x="50" y="168" fill="#1e3a8a" font-size="11">• New Mangalore — Kudremukh iron ore</text>
        <text x="50" y="190" fill="#1e3a8a" font-size="11">• Kochi — Queen of Arabian Sea (Willingdon Is.)</text>

        <!-- East Coast Panel -->
        <rect x="375" y="30" width="320" height="175" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
        <text x="535" y="55" text-anchor="middle" font-weight="bold" fill="#166534" font-size="13">Eastern Coast Ports (Bay of Bengal)</text>
        <text x="400" y="80" fill="#14532d" font-size="11">• Kolkata — Riverine port (Hugli river)</text>
        <text x="400" y="102" fill="#14532d" font-size="11">• Haldia — Downstream satellite to Kolkata</text>
        <text x="400" y="124" fill="#14532d" font-size="11">• Paradip — Mahanadi delta; iron ore</text>
        <text x="400" y="146" fill="#14532d" font-size="11">• Visakhapatnam — Deepest landlocked harbour</text>
        <text x="400" y="168" fill="#14532d" font-size="11">• Ennore (Kamarajar) — First corporate port</text>
        <text x="400" y="190" fill="#14532d" font-size="11">• Chennai (Oldest artificial) &amp; Tuticorin</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <!-- West Coast Panel -->
      <rect x="25" y="30" width="320" height="175" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
      <text x="185" y="55" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="13">Western Coast Ports (Arabian Sea)</text>
      <text x="50" y="80" fill="#1e3a8a" font-size="11">• Kandla (Deendayal) — Tidal / SEZ</text>
      <text x="50" y="102" fill="#1e3a8a" font-size="11">• Mumbai — Largest natural harbour</text>
      <text x="50" y="124" fill="#1e3a8a" font-size="11">• JNPT (Nhava Sheva) — Largest container port</text>
      <text x="50" y="146" fill="#1e3a8a" font-size="11">• Marmagao (Goa) — Iron ore to Japan</text>
      <text x="50" y="168" fill="#1e3a8a" font-size="11">• New Mangalore — Kudremukh iron ore</text>
      <text x="50" y="190" fill="#1e3a8a" font-size="11">• Kochi — Queen of Arabian Sea (Willingdon Is.)</text>

      <!-- East Coast Panel -->
      <rect x="375" y="30" width="320" height="175" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
      <text x="535" y="55" text-anchor="middle" font-weight="bold" fill="#166534" font-size="13">Eastern Coast Ports (Bay of Bengal)</text>
      <text x="400" y="80" fill="#14532d" font-size="11">• Kolkata — Riverine port (Hugli river)</text>
      <text x="400" y="102" fill="#14532d" font-size="11">• Haldia — Downstream satellite to Kolkata</text>
      <text x="400" y="124" fill="#14532d" font-size="11">• Paradip — Mahanadi delta; iron ore</text>
      <text x="400" y="146" fill="#14532d" font-size="11">• Visakhapatnam — Deepest landlocked harbour</text>
      <text x="400" y="168" fill="#14532d" font-size="11">• Ennore (Kamarajar) — First corporate port</text>
      <text x="400" y="190" fill="#14532d" font-size="11">• Chennai (Oldest artificial) &amp; Tuticorin</text>
    </svg>`,
    workedExamples: [
      {
        id: "geo_u7_we1",
        questionNumber: 1,
        question:
          "Which of the following ports is a riverine port, situated 128 km inland along the Hugli River from the Bay of Bengal?\n" +
          "(A) Paradip Port\n" +
          "(B) Kolkata Port\n" +
          "(C) Haldia Port\n" +
          "(D) Ennore Port",
        options: [
          { id: "A", text: "Paradip Port" },
          { id: "B", text: "Kolkata Port" },
          { id: "C", text: "Haldia Port" },
          { id: "D", text: "Ennore Port" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Check the classification of major ports in NCERT India: People and Economy, Ch 11.",
          "Step 2: Kolkata Port (Syama Prasad Mookerjee Port) is the only major riverine port in India, located 128 km inland on the left bank of the Hugli river.",
          "Step 3: Correct answer is Kolkata Port (Option B).",
        ],
        cuetTip: "Kolkata is a riverine port (Hugli river); Haldia was built downstream to relieve Kolkata's silt congestion.",
      },
      {
        id: "geo_u7_we2",
        questionNumber: 2,
        question:
          "The East-West Corridor under the National Highways Development Project (NHDP) connects which two terminal cities?\n" +
          "(A) Ahmedabad to Kolkata\n" +
          "(B) Porbandar to Silchar\n" +
          "(C) Mumbai to Guwahati\n" +
          "(D) Surat to Imphal",
        options: [
          { id: "A", text: "Ahmedabad to Kolkata" },
          { id: "B", text: "Porbandar to Silchar" },
          { id: "C", text: "Mumbai to Guwahati" },
          { id: "D", text: "Surat to Imphal" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Review NHDP corridor alignments in NCERT.",
          "Step 2: The East-West Corridor spans 3,640 km.",
          "Step 3: Its western terminus is Porbandar in Gujarat and eastern terminus is Silchar in Assam.",
        ],
        cuetTip: "EW Corridor = Porbandar (Gujarat) to Silchar (Assam).",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Terminal Points of National Waterways",
        frequency: "Very High",
        typicalStem: "Between which two stations does National Waterway No. 1 (NW-1) operate?",
        strategy: "NW-1 connects Prayagraj (Allahabad) to Haldia along the Ganga-Bhagirathi-Hugli river system over 1,620 km.",
      },
      {
        patternType: "Major Port Features Match",
        frequency: "High",
        typicalStem: "Which port is known as the 'deepest landlocked and protected port' in India?",
        strategy: "Visakhapatnam in Andhra Pradesh is the deepest landlocked port protected by Dolphin's Nose headland.",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing NW-1 and NW-2 terminal points.",
        whyWrong: "Students often mix them up: NW-1 is on the Ganga (Prayagraj to Haldia); NW-2 is on the Brahmaputra (Sadiya to Dhubri).",
        correctUnderstanding: "NW-1 = Prayagraj to Haldia; NW-2 = Sadiya to Dhubri.",
        trapOptionExample: "Stating NW-1 connects Sadiya and Dhubri.",
      },
      {
        misconception: "Believing Kandla port was built before independence.",
        whyWrong: "Kandla was built specifically after the 1947 partition to make up for the loss of Karachi port to Pakistan.",
        correctUnderstanding: "Kandla port was constructed post-1947.",
        trapOptionExample: "Option claiming Kandla was a colonial port from 1859.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "National Waterways River Acronym",
        mnemonic: "G-B-W (Great Blue Waterways)",
        rule: "NW-1 = Ganga | NW-2 = Brahmaputra | NW-3 = West Coast Canal",
        explanation: "Never forget the rivers associated with NW-1, NW-2, NW-3.",
      },
      {
        title: "Konkan Railway Termini",
        mnemonic: "R-T (Real Train)",
        rule: "Roha (Maharashtra) to Thokur (Karnataka)",
        explanation: "Quick recall of Konkan Railway terminus stations.",
      },
    ],
    quickRevisionCard: {
      title: "Transport & Trade — 60-Second Flash Card",
      bulletPoints: [
        "First Train: 16 April 1853, Bombay to Thane, 34 km.",
        "Golden Quadrilateral: 5,846 km connecting Delhi, Mumbai, Chennai, Kolkata.",
        "North-South Corridor: Srinagar to Kanyakumari (4,076 km).",
        "East-West Corridor: Silchar to Porbandar (3,640 km). Intersect at Jhansi.",
        "Konkan Railway (1998): 760 km from Roha (Maharashtra) to Thokur (Karnataka).",
        "NW-1: Ganga (Prayagraj to Haldia, 1620 km, longest).",
        "NW-2: Brahmaputra (Sadiya to Dhubri, 891 km).",
        "NW-3: West Coast Canal (Kottapuram to Kollam, 205 km).",
        "Ports: Kandla (tidal/SEZ post-partition), Vizag (deepest landlocked), Kolkata (riverine).",
      ],
      examTricks: [
        "Atal Tunnel (9.02 km) is built by Border Roads Organisation (BRO).",
        "Broad gauge track width is 1.676 metres.",
      ],
    },
    practiceQuestions: [
      {
        id: "geo_u7_q1",
        question: "National Waterway No. 1 (NW-1) operates on which river system between which two places?",
        type: "standard",
        options: [
          { id: "A", text: "Brahmaputra river from Sadiya to Dhubri" },
          { id: "B", text: "Ganga-Bhagirathi-Hugli river from Prayagraj to Haldia" },
          { id: "C", text: "West Coast Canal from Kottapuram to Kollam" },
          { id: "D", text: "Godavari-Krishna rivers from Kakinada to Puducherry" },
        ],
        correctOption: "B",
        explanation: "NW-1 extends along the Ganga-Bhagirathi-Hugli river system over 1,620 km from Prayagraj to Haldia.",
        difficulty: "easy",
      },
      {
        id: "geo_u7_q2",
        question: "Which of the following ports is known as the 'deepest landlocked and protected port' in India?",
        type: "standard",
        options: [
          { id: "A", text: "Chennai Port" },
          { id: "B", text: "Visakhapatnam Port" },
          { id: "C", text: "Paradip Port" },
          { id: "D", text: "Marmagao Port" },
        ],
        correctOption: "B",
        explanation: "Visakhapatnam Port is a landlocked natural harbour connected to the Bay of Bengal through a deep channel cut through solid rock (Dolphin's Nose).",
        difficulty: "easy",
      },
      {
        id: "geo_u7_q3",
        question:
          "Assertion (A): Kandla Port in Gujarat was developed soon after India's independence.\n" +
          "Reason (R): It was constructed to ease the heavy pressure on Mumbai port and compensate for the loss of Karachi port to Pakistan.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Partition transferred Karachi port to Pakistan, necessitating a major port in the north-west to handle northern India's maritime trade, leading to Kandla's development.",
        difficulty: "medium",
      },
      {
        id: "geo_u7_q4",
        question: "The Konkan Railway traverses across which three Indian states?",
        type: "standard",
        options: [
          { id: "A", text: "Gujarat, Maharashtra, and Goa" },
          { id: "B", text: "Maharashtra, Goa, and Karnataka" },
          { id: "C", text: "Goa, Karnataka, and Kerala" },
          { id: "D", text: "Maharashtra, Karnataka, and Tamil Nadu" },
        ],
        correctOption: "B",
        explanation: "The Konkan Railway line runs from Roha (Maharashtra) through Goa to Thokur (Karnataka).",
        difficulty: "medium",
      },
      {
        id: "geo_u7_q5",
        question:
          "Match List-I (Highway Project) with List-II (Terminal Locations / Length):\n" +
          "List-I:\n" +
          "p. Golden Quadrilateral\n" +
          "q. North-South Corridor\n" +
          "r. East-West Corridor\n" +
          "s. Konkan Railway\n" +
          "List-II:\n" +
          "1. Silchar to Porbandar\n" +
          "2. 5,846 km connecting four mega cities\n" +
          "3. Roha to Thokur (760 km)\n" +
          "4. Srinagar to Kanyakumari\n" +
          "Select the correct match:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-2, q-4, r-1, s-3" },
          { id: "B", text: "p-4, q-2, r-1, s-3" },
          { id: "C", text: "p-2, q-1, r-4, s-3" },
          { id: "D", text: "p-3, q-4, r-1, s-2" },
        ],
        correctOption: "A",
        explanation: "Golden Quadrilateral (p-2), North-South (q-4), East-West (r-1), Konkan Railway (s-3).",
        difficulty: "easy",
      },
      {
        id: "geo_u7_q6",
        question: "In which year was the Border Roads Organisation (BRO) established in India?",
        type: "standard",
        options: [
          { id: "A", text: "1950" },
          { id: "B", text: "1960" },
          { id: "C", text: "1971" },
          { id: "D", text: "1985" },
        ],
        correctOption: "B",
        explanation: "The Border Roads Organisation (BRO) was established in May 1960 for accelerating development and security in border regions.",
        difficulty: "easy",
      },
      {
        id: "geo_u7_q7",
        question: "What is the standard track width of Broad Gauge in Indian Railways?",
        type: "standard",
        options: [
          { id: "A", text: "1.000 metre" },
          { id: "B", text: "1.676 metres" },
          { id: "C", text: "0.762 metre" },
          { id: "D", text: "1.435 metres" },
        ],
        correctOption: "B",
        explanation: "Broad gauge track width in Indian Railways is exactly 1.676 metres.",
        difficulty: "easy",
      },
      {
        id: "geo_u7_q8",
        question: "Where do the North-South and East-West corridors of NHDP intersect each other?",
        type: "standard",
        options: [
          { id: "A", text: "Nagpur" },
          { id: "B", text: "Bhopal" },
          { id: "C", text: "Jhansi" },
          { id: "D", text: "Gwalior" },
        ],
        correctOption: "C",
        explanation: "The North-South and East-West corridors intersect at Jhansi in Uttar Pradesh.",
        difficulty: "medium",
      },
      {
        id: "geo_u7_q9",
        question: "Which of the following ports was developed as the first corporatised major port in India?",
        type: "standard",
        options: [
          { id: "A", text: "JNPT (Nhava Sheva)" },
          { id: "B", text: "Ennore Port (Kamarajar)" },
          { id: "C", text: "Kandla Port" },
          { id: "D", text: "Paradip Port" },
        ],
        correctOption: "B",
        explanation: "Ennore Port (Kamarajar Port), situated north of Chennai, was registered as a public company under the Companies Act, making it India's first corporate port.",
        difficulty: "medium",
      },
      {
        id: "geo_u7_q10",
        question: "On which date did the first passenger train run in India between Bombay and Thane?",
        type: "standard",
        options: [
          { id: "A", text: "15 August 1857" },
          { id: "B", text: "16 April 1853" },
          { id: "C", text: "26 January 1850" },
          { id: "D", text: "1 November 1858" },
        ],
        correctOption: "B",
        explanation: "India's first passenger train travelled 34 km from Bombay (Bori Bunder) to Thane on 16 April 1853.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["India: Resources and Development"],
      relatedTopics: ["Transport, Communication and International Trade", "Selected Issues and Problems"],
      practiceTestId: "practice-geo-unit7-test1",
      practiceTestUrl: "/test/practice-geo-unit7-test1",
      weaknessReportUrl: "/dashboard/radar?subject=geo",
      weaknessRadarUrl: "/dashboard/radar?subject=geo",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 8: Geographical Perspective on Selected Issues and Problems
  // -------------------------------------------------------------------------
  {
    id: "geo_u8_t1",
    slug: "environmental-pollution-urban-waste-disposal-rural-urban-migration-land-degradation",
    subject: "geo",
    subjectName: "Geography",
    subjectCode: "313",
    unitNumber: 8,
    unitTitle: "Geographical Perspective on Selected Issues and Problems",
    topicTitle: "Environmental Pollution, Urban Waste Disposal, Rural-Urban Migration, Land Degradation",
    ncertReference: {
      class: "12",
      book: "India: People and Economy",
      chapterNumber: 12,
      chapterName: "Geographical Perspective on Selected Issues and Problems",
      sections: [
        "Environmental Pollution: Water, Air, Noise and Land Pollution",
        "Urban Waste Disposal and Solid Waste Management",
        "Rural-Urban Migration Dynamics and Slums (Dharavi Case Study)",
        "Land Degradation: Natural and Anthropogenic Causes (Soil Salinisation, Alkalisation, Waterlogging)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Regularly tested (14+ questions across slots)",
      totalPyqsInRepo: 30,
      weightagePercentage: 7.5,
    },
    summary30Seconds: [
      "Water Pollution: Most polluted river stretches are Ganga (Kanpur to Varanasi) and Yamuna (Delhi to Chambal confluence). Namami Gange launched in 2014.",
      "Air Pollution: Oxides of sulphur and nitrogen cause acid rain; particulate matter triggers respiratory diseases.",
      "Solid Waste: Massive non-biodegradable waste generated in million-plus cities. Dharavi in Mumbai is Asia's largest slum, functioning as a vibrant informal recycling cluster.",
      "Rural-Urban Migration: Male-selective migration drives skewed sex ratios in rural sending areas (UP, Bihar) and infrastructure stress in recipient metro cities.",
      "Land Degradation: Waterlogging, salinisation, and alkalisation caused by excessive canal irrigation in Punjab, Haryana, and Rajasthan.",
    ],
    coreConcepts: [
      {
        title: "1. Environmental Pollution: Types & Critical Hotspots",
        content:
          "Pollution is the release of substances and energy into the environment by human activities in quantities that alter environmental quality:\n\n" +
          "• **Water Pollution**:\n" +
          "  - Sources: Natural (erosion, landslides, decay of plants) and Anthropogenic (industrial effluents, agricultural runoff with synthetic fertilisers and pesticides, domestic sewage).\n" +
          "  - **Most Polluted Rivers**:\n" +
          "    1. **Ganga**: Kanpur (leather tanneries) down to Varanasi.\n" +
          "    2. **Yamuna**: Delhi down to its confluence with the Chambal (discharging unchecked untreated city sewage).\n" +
          "    3. **Sabarmati**: Downstream of Ahmedabad.\n" +
          "    4. **Gomti**: Near Lucknow.\n" +
          "    5. **Musi**: Near Hyderabad.\n" +
          "  - **Namami Gange Programme**: Integrated conservation mission approved in June 2014 with budget of ₹20,000 crore to abate pollution and rejuvenate the Ganga.\n\n" +
          "• **Air Pollution**:\n" +
          "  - Increased concentration of sulphur dioxide ($SO_2$), nitrogen oxides ($NO_x$), carbon monoxide ($CO$), ozone, and suspended particulate matter (SPM).\n" +
          "  - Leads to acid rain, smog (smoke + fog), and chronic respiratory illnesses.\n\n" +
          "• **Noise Pollution**:\n" +
          "  - Measured in decibels ($dB$); sources include traffic, aircraft, construction, loudspeakers, and heavy factories.",
        ncertPointers: [
          "NCERT table specifies the polluted stretches: Yamuna (Delhi to Chambal confluence); Ganga (Kanpur to Varanasi).",
          "Namami Gange was launched in 2014.",
        ],
      },
      {
        title: "2. Urban Waste Disposal & Dharavi Case Study",
        content:
          "Overcrowding and consumerism in urban centres produce massive quantities of solid waste:\n\n" +
          "• **Nature of Solid Waste**:\n" +
          "  - Domestic garbage, industrial sludge, plastic, electronic waste, and construction debris.\n" +
          "  - Untreated open dumping leads to foul odours, fly and rodent proliferation, disease transmission (typhoid, cholera, dengue), and toxic chemical leachate contaminating groundwater.\n\n" +
          "• **Dharavi — Asia's Largest Slum (Mumbai)**:\n" +
          "  - Located in the heart of central Mumbai, occupying ~2.1 sq km with over 1 million residents.\n" +
          "  - Built originally on mangrove swamps in the 19th century by migrating potters, leather workers, and textile labourers.\n" +
          "  - Acute challenges: Single toilet shared by hundreds of residents, open drainage, severe lack of fresh water.\n" +
          "  - Economic resilience: World-famous informal enterprise hub boasting leather manufacturing, pottery, embroidery, and a multi-million-dollar recycling economy processing waste from all over Mumbai.",
        ncertPointers: [
          "Dharavi is featured in an extensive NCERT box describing its history, enterprise, and sanitation challenges.",
        ],
      },
      {
        title: "3. Rural-Urban Migration & Socio-Demographic Consequences",
        content:
          "Rural-to-urban migration is driven by agrarian distress (push) and urban economic attractions (pull):\n\n" +
          "• **Streams of Migration**:\n" +
          "  - Rural to Rural (dominated by females due to marriage).\n" +
          "  - Rural to Urban (dominated by males seeking employment).\n" +
          "  - Major source states: Uttar Pradesh, Bihar, Odisha, Madhya Pradesh.\n" +
          "  - Major receiving destinations: Maharashtra (Mumbai, Pune), Delhi, Gujarat (Surat, Ahmedabad), Karnataka (Bengaluru).\n\n" +
          "• **Socio-Demographic Impacts**:\n" +
          "  - *Sending Areas (Rural)*: Depleted of working-age young males; produces heavily skewed feminine sex ratios; elderly and children left behind.\n" +
          "  - *Receiving Areas (Urban)*: Male-dominated sex ratio; extreme stress on civic housing, sanitation, electricity, potable water; proliferation of squatter settlements and slums.",
        ncertPointers: [
          "Female migration is dominated by Rural-to-Rural (marriage).",
          "Male migration is dominated by Rural-to-Urban (employment).",
        ],
      },
      {
        title: "4. Land Degradation: Salinisation, Alkalisation & Ravines",
        content:
          "Land degradation refers to temporary or permanent decline in the productive capacity of land due to natural and human processes:\n\n" +
          "• **Soil Salinisation and Alkalisation**:\n" +
          "  - Caused by excessive, poorly drained **canal irrigation** in arid and semi-arid tracts.\n" +
          "  - Water table rises close to the surface, and intense evaporation pulls sub-surface salts upwards through capillary action, depositing a white crust of toxic salts (known locally as **Reh** or **Kallar**).\n" +
          "  - Prominent in canal-irrigated command areas of **Punjab, Haryana, and Western Uttar Pradesh**.\n\n" +
          "• **Waterlogging**:\n" +
          "  - Excessive irrigation without adequate sub-surface drainage leaves the soil root zone saturated with stagnant water, suffocating plant roots.\n\n" +
          "• **Gully Erosion & Ravines**:\n" +
          "  - Intense rain-induced running water cuts deep channels into soft alluvial soil.\n" +
          "  - Iconic example: The badlands and ravines of the **Chambal Basin** (Madhya Pradesh and Rajasthan).\n\n" +
          "• **Wastelands Classification**:\n" +
          "  - *Culturable Wastelands*: Gullied/ravinous land, waterlogged land, degraded pastures, shifting cultivation land.\n" +
          "  - *Unculturable Wastelands*: Barren rocky areas, steep slopes, snow-covered peaks, deserts.",
        ncertPointers: [
          "Reh or Kallar = Saline-alkaline efflorescence on soils caused by over-irrigation.",
          "Chambal basin is the prime example of gully erosion and badland topography in India.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Most Polluted River Stretches in India",
        formula: "Ganga (Kanpur-Varanasi) | Yamuna (Delhi-Chambal) | Sabarmati (Ahmedabad) | Gomti (Lucknow)",
        symbols: "CPCB Environmental Hotspots",
        siUnits: "BOD and COD critical reaches",
        applicationCondition: "Direct attribution questions on water pollution",
        notes: "Leather tanneries in Kanpur are primary industrial culprits for Ganga pollution.",
      },
      {
        name: "Soil Degradation Mechanisms",
        formula: "Canal Over-irrigation -> Capillary Action -> Salinisation / Alkalisation (Reh/Kallar)",
        symbols: "Arid irrigated tracts (Punjab, Haryana)",
        siUnits: "Soil Science & Degradation",
        applicationCondition: "Cause-and-effect questions in CUET",
        notes: "Reh and Kallar are indigenous names for saline soil crusts.",
      },
      {
        name: "Migration Stream Demographics",
        formula: "Rural-Rural = Female dominated (Marriage) | Rural-Urban = Male dominated (Employment)",
        symbols: "Census Migration Matrix",
        siUnits: "Demographic stream analysis",
        applicationCondition: "Assertion-Reason and Statement I/II questions",
        notes: "Maharashtra receives the highest number of net in-migrants in India.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Land Degradation & Soil Salinisation Cycle",
      caption: "Over-irrigation leading to water table rise, capillary pull, and salt crust formation (Reh/Kallar).",
      code: `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <rect x="25" y="30" width="310" height="165" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
        <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="13">Soil Salinisation (Reh / Kallar)</text>
        <path d="M 45,90 L 315,90" stroke="#78350f" stroke-width="4"/>
        <text x="180" y="80" text-anchor="middle" font-weight="bold" fill="#ca8a04" font-size="11">White Salt Crust on Surface</text>
        <line x1="90" y1="150" x2="90" y2="100" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow)"/>
        <line x1="180" y1="150" x2="180" y2="100" stroke="#dc2626" stroke-width="2"/>
        <line x1="270" y1="150" x2="270" y2="100" stroke="#dc2626" stroke-width="2"/>
        <text x="180" y="130" text-anchor="middle" fill="#b91c1c" font-size="10">Capillary upward pull of dissolved salts</text>
        <rect x="45" y="150" width="270" height="30" fill="#bae6fd" rx="2"/>
        <text x="180" y="170" text-anchor="middle" fill="#0369a1" font-size="10">High water table due to canal over-irrigation</text>

        <rect x="365" y="30" width="330" height="165" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
        <text x="530" y="55" text-anchor="middle" font-weight="bold" fill="#334155" font-size="13">Migration &amp; Urban Pressures</text>
        <rect x="385" y="75" width="135" height="100" fill="#fef3c7" stroke="#f59e0b" rx="4"/>
        <text x="452" y="95" text-anchor="middle" font-weight="bold" fill="#b45309" font-size="11">Rural Origin</text>
        <text x="452" y="115" text-anchor="middle" fill="#78350f" font-size="10">UP, Bihar, Odisha</text>
        <text x="452" y="135" text-anchor="middle" fill="#78350f" font-size="10">Youth drain</text>
        <text x="452" y="155" text-anchor="middle" fill="#78350f" font-size="10">Feminised sex ratio</text>

        <path d="M 525,125 L 555,125" stroke="#ef4444" stroke-width="3"/>

        <rect x="560" y="75" width="125" height="100" fill="#ecfdf5" stroke="#10b981" rx="4"/>
        <text x="622" y="95" text-anchor="middle" font-weight="bold" fill="#047857" font-size="11">Urban Destination</text>
        <text x="622" y="115" text-anchor="middle" fill="#065f46" font-size="10">Mumbai, Delhi</text>
        <text x="622" y="135" text-anchor="middle" fill="#065f46" font-size="10">Slums (Dharavi)</text>
        <text x="622" y="155" text-anchor="middle" fill="#065f46" font-size="10">Sanitation stress</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <rect x="25" y="30" width="310" height="165" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
      <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="13">Soil Salinisation (Reh / Kallar)</text>
      <path d="M 45,90 L 315,90" stroke="#78350f" stroke-width="4"/>
      <text x="180" y="80" text-anchor="middle" font-weight="bold" fill="#ca8a04" font-size="11">White Salt Crust on Surface</text>
      <line x1="90" y1="150" x2="90" y2="100" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow)"/>
      <line x1="180" y1="150" x2="180" y2="100" stroke="#dc2626" stroke-width="2"/>
      <line x1="270" y1="150" x2="270" y2="100" stroke="#dc2626" stroke-width="2"/>
      <text x="180" y="130" text-anchor="middle" fill="#b91c1c" font-size="10">Capillary upward pull of dissolved salts</text>
      <rect x="45" y="150" width="270" height="30" fill="#bae6fd" rx="2"/>
      <text x="180" y="170" text-anchor="middle" fill="#0369a1" font-size="10">High water table due to canal over-irrigation</text>

      <rect x="365" y="30" width="330" height="165" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
      <text x="530" y="55" text-anchor="middle" font-weight="bold" fill="#334155" font-size="13">Migration &amp; Urban Pressures</text>
      <rect x="385" y="75" width="135" height="100" fill="#fef3c7" stroke="#f59e0b" rx="4"/>
      <text x="452" y="95" text-anchor="middle" font-weight="bold" fill="#b45309" font-size="11">Rural Origin</text>
      <text x="452" y="115" text-anchor="middle" fill="#78350f" font-size="10">UP, Bihar, Odisha</text>
      <text x="452" y="135" text-anchor="middle" fill="#78350f" font-size="10">Youth drain</text>
      <text x="452" y="155" text-anchor="middle" fill="#78350f" font-size="10">Feminised sex ratio</text>

      <path d="M 525,125 L 555,125" stroke="#ef4444" stroke-width="3"/>

      <rect x="560" y="75" width="125" height="100" fill="#ecfdf5" stroke="#10b981" rx="4"/>
      <text x="622" y="95" text-anchor="middle" font-weight="bold" fill="#047857" font-size="11">Urban Destination</text>
      <text x="622" y="115" text-anchor="middle" fill="#065f46" font-size="10">Mumbai, Delhi</text>
      <text x="622" y="135" text-anchor="middle" fill="#065f46" font-size="10">Slums (Dharavi)</text>
      <text x="622" y="155" text-anchor="middle" fill="#065f46" font-size="10">Sanitation stress</text>
    </svg>`,
    workedExamples: [
      {
        id: "geo_u8_we1",
        questionNumber: 1,
        question:
          "Which of the following river stretches in India is identified by the Central Pollution Control Board (CPCB) as the most critically polluted stretch of the Yamuna River?\n" +
          "(A) Yamunotri to Tajewala\n" +
          "(B) Delhi to its confluence with the Chambal River\n" +
          "(C) Mathura to Agra\n" +
          "(D) Chambal confluence to Prayagraj",
        options: [
          { id: "A", text: "Yamunotri to Tajewala" },
          { id: "B", text: "Delhi to its confluence with the Chambal River" },
          { id: "C", text: "Mathura to Agra" },
          { id: "D", text: "Chambal confluence to Prayagraj" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Check NCERT India: People and Economy, Ch 12 on Water Pollution.",
          "Step 2: The table on polluted river stretches specifically marks the Yamuna from Delhi down to its confluence with the Chambal River as critically polluted due to domestic sewage and chemical wastes.",
          "Step 3: Option B is the exact NCERT designation.",
        ],
        cuetTip: "Yamuna's worst reach = Delhi to Chambal confluence.",
      },
      {
        id: "geo_u8_we2",
        questionNumber: 2,
        question:
          "What is the primary cause of soil salinisation and alkalisation in the canal-irrigated agricultural regions of Punjab and Haryana?\n" +
          "(A) Heavy monsoonal floods depositing marine salts\n" +
          "(B) Deforestation causing intense sheet erosion\n" +
          "(C) Excessive canal irrigation causing waterlogging and capillary upward movement of subterranean salts\n" +
          "(D) Heavy application of organic manure",
        options: [
          { id: "A", text: "Heavy monsoonal floods depositing marine salts" },
          { id: "B", text: "Deforestation causing intense sheet erosion" },
          { id: "C", text: "Excessive canal irrigation causing waterlogging and capillary upward movement of subterranean salts" },
          { id: "D", text: "Heavy application of organic manure" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: In the semi-arid Green Revolution belt of Punjab and Haryana, cheap or free canal water led to over-irrigation.",
          "Step 2: The water table rose, and intense evaporation drew groundwater containing dissolved mineral salts to the surface via capillary action.",
          "Step 3: When water evaporates, salts crystallise into a toxic crust ('Reh' or 'Kallar'), rendering land infertile.",
        ],
        cuetTip: "Over-irrigation + capillary action = Salinisation (Reh/Kallar).",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Pollution Source Identification",
        frequency: "High",
        typicalStem: "Which of the following causes of land degradation is prevalent in the Chambal river valley?",
        strategy: "The Chambal basin is infamous for gully erosion leading to extensive ravines and badland topography.",
      },
      {
        patternType: "Demographic Impact of Rural-Urban Migration",
        frequency: "High",
        typicalStem: "Rural-to-urban migration in India has which of the following demographic consequences on rural source regions?",
        strategy: "It leads to a depletion of working-age males and results in an abnormal increase in female sex ratio in sending villages.",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing rural-to-urban migration is dominated by women.",
        whyWrong: "Women dominate rural-to-rural migration due to marriage; rural-to-urban migration is heavily male-dominated due to employment opportunities.",
        correctUnderstanding: "Rural-to-Rural = Females (Marriage); Rural-to-Urban = Males (Work).",
        trapOptionExample: "Option claiming women constitute the largest share of rural-to-urban employment migrants.",
      },
      {
        misconception: "Assuming badlands in Chambal are caused by wind erosion.",
        whyWrong: "Chambal ravines are caused by water erosion—specifically severe gully erosion cut by seasonal torrents in deep alluvium.",
        correctUnderstanding: "Chambal ravines = Gully water erosion.",
        trapOptionExample: "Attributing Chambal ravines to desert wind erosion.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Salt Degradation Names",
        mnemonic: "R-K-S (Reh & Kallar = Saline)",
        rule: "Reh and Kallar are local terms for salt-crusted degraded soils",
        explanation: "Never confuse these indigenous soil degradation names.",
      },
      {
        title: "Namami Gange Launch Year",
        mnemonic: "G-1-4 (Ganga 2014)",
        rule: "Namami Gange approved in June 2014",
        explanation: "Quick recall of the flagship river rejuvenation scheme.",
      },
    ],
    quickRevisionCard: {
      title: "Selected Issues & Problems — 60-Second Flash Card",
      bulletPoints: [
        "Water Pollution: Yamuna (Delhi to Chambal confluence); Ganga (Kanpur to Varanasi).",
        "Namami Gange: ₹20,000 crore integrated mission launched in June 2014.",
        "Dharavi: Asia's largest slum in central Mumbai; ~2.1 km²; multi-million dollar informal recycling hub.",
        "Rural-to-Rural Migration: Dominated by females (marriage).",
        "Rural-to-Urban Migration: Dominated by males (employment; creates skewed rural sex ratios).",
        "Salinisation / Alkalisation: Excessive canal irrigation -> capillary action deposits salt crusts (Reh, Kallar).",
        "Badland Topography / Ravines: Caused by gully erosion in the Chambal river basin.",
        "Air Pollution: Acid rain caused by SO₂ and NOx emissions; smog = smoke + fog.",
      ],
      examTricks: [
        "Chambal = Gully erosion / Ravines.",
        "Reh or Kallar = Saline-alkaline crusts.",
      ],
    },
    practiceQuestions: [
      {
        id: "geo_u8_q1",
        question: "Which of the following river basins in India is notorious for severe gully erosion resulting in badland topography?",
        type: "standard",
        options: [
          { id: "A", text: "Kaveri Basin" },
          { id: "B", text: "Chambal Basin" },
          { id: "C", text: "Brahmaputra Basin" },
          { id: "D", text: "Narmada Basin" },
        ],
        correctOption: "B",
        explanation: "The Chambal river basin in Madhya Pradesh and Rajasthan has suffered severe gully erosion, forming extensive badlands and ravines.",
        difficulty: "easy",
      },
      {
        id: "geo_u8_q2",
        question: "Local names such as 'Reh' and 'Kallar' refer to which type of degraded soil in India?",
        type: "standard",
        options: [
          { id: "A", text: "Laterite soils" },
          { id: "B", text: "Saline and alkaline soils" },
          { id: "C", text: "Acidic peaty soils" },
          { id: "D", text: "Wind-blown desert sands" },
        ],
        correctOption: "B",
        explanation: "Reh and Kallar are indigenous names for saline-alkaline soil crusts caused by over-irrigation and capillary salt accumulation.",
        difficulty: "easy",
      },
      {
        id: "geo_u8_q3",
        question:
          "Assertion (A): Male-selective out-migration from rural areas of Bihar and Eastern Uttar Pradesh has created an abnormal sex ratio in those villages.\n" +
          "Reason (R): Working-age men migrate to metropolitan centres in search of employment, leaving women, children, and the elderly behind.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Selective migration of adult males for employment skews rural village demography, increasing the relative proportion of females.",
        difficulty: "medium",
      },
      {
        id: "geo_u8_q4",
        question: "In which year was the 'Namami Gange Programme' launched by the Union Government?",
        type: "standard",
        options: [
          { id: "A", text: "1985" },
          { id: "B", text: "2000" },
          { id: "C", text: "2014" },
          { id: "D", text: "2019" },
        ],
        correctOption: "C",
        explanation: "Namami Gange was approved as an Integrated Ganga Conservation Mission in June 2014.",
        difficulty: "easy",
      },
      {
        id: "geo_u8_q5",
        question:
          "Match List-I (Environmental Issue / Problem) with List-II (Prime Contributing Factor / Hotspot):\n" +
          "List-I:\n" +
          "p. Ravine formation\n" +
          "q. Soil salinisation\n" +
          "r. Asia's largest slum\n" +
          "s. Critically polluted river reach\n" +
          "List-II:\n" +
          "1. Dharavi (Mumbai)\n" +
          "2. Chambal valley\n" +
          "3. Yamuna (Delhi to Chambal confluence)\n" +
          "4. Canal over-irrigation in Punjab & Haryana\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-2, q-4, r-1, s-3" },
          { id: "B", text: "p-4, q-2, r-1, s-3" },
          { id: "C", text: "p-2, q-1, r-4, s-3" },
          { id: "D", text: "p-3, q-4, r-1, s-2" },
        ],
        correctOption: "A",
        explanation: "Ravines (p-2: Chambal), Salinisation (q-4: Punjab over-irrigation), Dharavi (r-1: Mumbai slum), Polluted river (s-3: Yamuna).",
        difficulty: "easy",
      },
      {
        id: "geo_u8_q6",
        question: "Which of the following migration streams accounts for the highest volume of female migrants in India?",
        type: "standard",
        options: [
          { id: "A", text: "Urban to Urban" },
          { id: "B", text: "Rural to Rural" },
          { id: "C", text: "Rural to Urban" },
          { id: "D", text: "Urban to Rural" },
        ],
        correctOption: "B",
        explanation: "Rural to rural migration is predominantly female due to the custom of patrilocal marriage in India.",
        difficulty: "easy",
      },
      {
        id: "geo_u8_q7",
        question: "Which of the following air pollutants is the chief contributor to the formation of 'Acid Rain'?",
        type: "standard",
        options: [
          { id: "A", text: "Carbon monoxide and methane" },
          { id: "B", text: "Sulphur dioxide and nitrogen oxides" },
          { id: "C", text: "Chlorofluorocarbons" },
          { id: "D", text: "Lead particles" },
        ],
        correctOption: "B",
        explanation: "Sulphur dioxide ($SO_2$) and nitrogen oxides ($NO_x$) react with water vapour in the atmosphere to form sulphuric and nitric acid, producing acid rain.",
        difficulty: "easy",
      },
      {
        id: "geo_u8_q8",
        question: "What is the primary industrial cause of pollution in the Ganga River near Kanpur?",
        type: "standard",
        options: [
          { id: "A", text: "Thermal power plants" },
          { id: "B", text: "Leather tanneries" },
          { id: "C", text: "Sugar processing mills" },
          { id: "D", text: "Automobile manufacturing plants" },
        ],
        correctOption: "B",
        explanation: "Leather tanneries in and around Kanpur discharge chromium-rich toxic effluents directly into the Ganga.",
        difficulty: "easy",
      },
      {
        id: "geo_u8_q9",
        question: "Which of the following is classified as an 'Unculturable Wasteland' in land records?",
        type: "standard",
        options: [
          { id: "A", text: "Degraded pastures" },
          { id: "B", text: "Waterlogged lands" },
          { id: "C", text: "Barren rocky areas and steep desert sands" },
          { id: "D", text: "Shifting cultivation fallows" },
        ],
        correctOption: "C",
        explanation: "Barren rocky cliffs, steep peaks, snow fields, and extreme deserts cannot be brought under cultivation even with modern technology (unculturable).",
        difficulty: "medium",
      },
      {
        id: "geo_u8_q10",
        question: "Dharavi, known for its vibrant informal recycling cluster, was originally settled in the 19th century by:",
        type: "standard",
        options: [
          { id: "A", text: "Shipyard mechanics from Gujarat" },
          { id: "B", text: "Potters, leather workers, and textile migrants" },
          { id: "C", text: "Coal miners from Chhota Nagpur" },
          { id: "D", text: "Tea plantation labourers from Assam" },
        ],
        correctOption: "B",
        explanation: "Dharavi was founded in mangrove terrain by Gujarati potters, Tamil leather tanners, and textile mill workers.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["India: People and Economy"],
      relatedTopics: ["India: Transport, Communication & Trade", "India: Resources and Development"],
      practiceTestId: "practice-geo-unit8-test1",
      practiceTestUrl: "/test/practice-geo-unit8-test1",
      weaknessReportUrl: "/dashboard/radar?subject=geo",
      weaknessRadarUrl: "/dashboard/radar?subject=geo",
    },
  },
];
