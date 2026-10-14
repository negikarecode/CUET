export const agriUnits1to4 = [
  // UNIT 1
  {
    id: "agriculture-unit1-weather-elements-plant-genetics-seed-production-plant-breeding-methods",
    slug: "weather-elements-plant-genetics-seed-production-plant-breeding-methods",
    subject: "agriculture",
    subjectName: "Agriculture",
    subjectCode: "302",
    unitNumber: 1,
    unitTitle: "Agrometeorology, Genetics & Plant Breeding",
    topicTitle: "Weather Elements, Plant Genetics, Seed Production, Plant Breeding Methods",
    ncertReference: {
      book: "ICAR / NCERT Agriculture Class XII",
      chapter: "Unit I: Agrometeorology, Genetics and Plant Breeding, Biochemistry and Microbiology",
      pages: "Pages 1-48",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 18,
      weightagePercentage: 25.0,
    },
    thirtySecondSummary: [
      "Agrometeorology investigates atmospheric elements (solar radiation, temperature, rainfall, humidity, wind) influencing crop physiology and phenology across India's 15 agro-climatic zones (Planning Commission).",
      "Photosynthetically Active Radiation (PAR, 400-700 nm) drives dry matter accumulation; photoperiodism governs flowering (Short-day: Rice, Soybean; Long-day: Wheat, Barley; Day-neutral: Maize, Sunflower).",
      "Plant genetics rests on Mendel's laws of segregation and independent assortment, qualitative vs quantitative traits, cytoplasmic male sterility (CMS), and heterosis (hybrid vigor).",
      "Plant breeding methods vary by pollination mode: Self-pollinated crops use Pureline selection, Mass selection, and Pedigree breeding; Cross-pollinated crops utilize Recurrent selection and Heterosis breeding (single-cross, double-cross hybrids).",
      "Seed production maintains genetic purity across four statutory certification stages: Nucleus Seed -> Breeder Seed (Golden Yellow tag) -> Foundation Seed (White tag) -> Certified Seed (Azure Blue tag).",
    ],
    coreConcepts: [
      {
        title: "Agrometeorological Factors and Crop Microclimate",
        explanation:
          "Agricultural meteorology analyzes the interaction between physical weather variables and agricultural systems.\n1. Solar Radiation & PAR: Only the 400-700 nm waveband constitutes Photosynthetically Active Radiation (PAR). Crops intercept radiation measured via Leaf Area Index (LAI); optimum LAI (3-5) maximizes light interception before self-shading occurs.\n2. Temperature & Cardinal Temperatures: Every crop possesses minimum, optimum, and maximum thermal thresholds. Growing Degree Days (GDD) quantify thermal time: GDD = sum of [(T_max + T_min)/2 - T_base]. Base temperatures: Wheat = 4-5°C; Rice/Maize = 10°C.\n3. Monsoon Dynamics: The South-West Monsoon (June-September) delivers over 75% of India's annual precipitation via the Arabian Sea and Bay of Bengal branches, determining the Kharif cropping calendar.\n4. Agro-Climatic Zones: India is classified into 15 distinct Agro-Climatic Zones by the Planning Commission based on topography, rainfall, temperature, and water resources.",
        keyTakeaways: [
          "PAR: 400-700 nm wavelength band driving photosynthesis.",
          "GDD Formula: Thermal units required for phenological stages; Base temp (Wheat = 4.5°C, Rice = 10°C).",
          "15 Agro-climatic zones categorized by Planning Commission (NITI Aayog).",
        ],
        ncertPointer:
          "ICAR Class XII Unit I, Agrometeorology section, pp. 3-14.",
      },
      {
        title: "Mendelian Genetics and Plant Breeding Systems",
        explanation:
          "Crop improvement utilizes genetic principles to develop high-yielding, biotic/abiotic stress-resistant cultivars.\n1. Mendel's Laws: Monohybrid crosses yield 3:1 phenotypic (1:2:1 genotypic) ratios demonstrating independent segregation; Dihybrid crosses yield 9:3:3:1 phenotypic ratios demonstrating independent assortment.\n2. Quantitative Inheritance: Traits like grain yield, plant height, and drought tolerance are controlled by polygenes influenced heavily by environment (continuous variation).\n3. Pollination Mechanisms: Autogamy (self-pollination; e.g., wheat, rice, tomato) vs Allogamy (cross-pollination; e.g., maize, pearl millet, sunflower). Mechanisms promoting allogamy include monoecy, dioecy, protandry (maize), protogyny (bajra), and self-incompatibility (brassicas).\n4. Breeding Methods: Autogamous crops: Mass selection (improves landraces), Pureline selection (isolated progeny of single homozygous self-pollinated plant, Johannsen 1903), and Pedigree method (records ancestors across generations F2 to F6). Allogamous crops: Exploitation of heterosis (superiority of F1 over mid/better parent) using Cytoplasmic Male Sterility (CMS) lines (A-line: male sterile, B-line: maintainer, R-line: restorer).",
        keyTakeaways: [
          "Pureline: Progeny of a single homozygous self-fertilized plant (Johannsen).",
          "Protandry: Pollen sheds before stigma matures (Maize); Protogyny: Stigma receptive first (Bajra).",
          "Heterosis / Hybrid vigor: Commercialized in maize (double-cross by Jones), sorghum, pearl millet.",
          "CMS system: Three-line method (A-line, B-line, R-line) enables commercial hybrid seed production without manual emasculation.",
        ],
        ncertPointer:
          "ICAR Class XII Unit I, Plant Breeding section, pp. 15-32.",
      },
      {
        title: "Seed Classes, Certification and Quality Standards",
        explanation:
          "A seed is a fertilized mature ovule possessing an embryonic plant, food reserve, and protective coat. High-quality seed must exhibit physical purity, genetic purity, high germination percentage, and vigor.\n1. Nucleus Seed: 100% genetically pure initial seed produced directly under the supervision of the originating plant breeder; no certification tag.\n2. Breeder Seed: Progeny of nucleus seed produced by the breeder or sponsored institution; 100% genetic purity; Golden Yellow certification tag.\n3. Foundation Seed: Progeny of breeder seed produced by National Seeds Corporation (NSC) or State Seed Corporations; certified by State Seed Certification Agency; 99.5% genetic purity; White certification tag.\n4. Certified Seed: Progeny of foundation seed produced by registered progressive farmers; distributed to commercial farmers for commercial crop production; Azure Blue certification tag.",
        keyTakeaways: [
          "Breeder Seed Tag: Golden Yellow (Buff).",
          "Foundation Seed Tag: White.",
          "Certified Seed Tag: Azure Blue.",
          "Seed Replacement Rate (SRR): Percentage of total cropped area sown with quality certified seeds relative to farm-saved seed.",
        ],
        ncertPointer:
          "ICAR Class XII Unit I, Seed Technology section, pp. 35-46.",
      },
    ],
    keyFacts: [
      {
        concept: "Certified Seed Tag Color",
        formulaOrFact: "Azure Blue | Issued by State Seed Certification Agencies (SSCA)",
        explanation: "Certified seed is purchased by farmers for commercial cultivation; tag indicates purity, germination %, weed seed limit.",
        examTip: "CUET directly matches seed class with certification tag colors.",
      },
      {
        concept: "Growing Degree Days (GDD)",
        formulaOrFact: "GDD = ((T_max + T_min) / 2) - T_base",
        explanation: "Quantifies cumulative heat units necessary to advance a crop from one developmental stage to the next.",
        examTip: "Base temperature T_base is 4-5°C for rabi crops (wheat) and 10°C for kharif crops (rice, maize).",
      },
      {
        concept: "Emasculation",
        formulaOrFact: "Removal of stamens/anthers from bisexual flowers before anthesis without damaging female organs",
        explanation: "Mandatory step in artificial hybridization of self-pollinated crops to prevent self-fertilization.",
        examTip: "Done during late afternoon; pollination follows the next morning.",
      },
      {
        concept: "Photoperiodic Classification",
        formulaOrFact: "Short-day (Rice, Soybean) | Long-day (Wheat, Barley, Oat) | Day-neutral (Maize, Cotton, Tomato)",
        explanation: "Short-day crops require day lengths shorter than a critical threshold to initiate flowering.",
        examTip: "Wheat is long-day; planting late in rabi subjects it to terminal heat and forced flowering.",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" fill="#f7fbf7" rx="12"/>
  <text x="400" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#14532d">Seed Multiplication Chain &amp; Breeding Pipeline</text>
  
  <!-- Flow Container -->
  <g transform="translate(60, 65)">
    <!-- Stage 1: Nucleus Seed -->
    <rect x="0" y="0" width="150" height="90" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
    <text x="75" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#15803d">1. Nucleus Seed</text>
    <text x="75" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#166534">100% Genetic Purity</text>
    <text x="75" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#166534">By Plant Breeder</text>
    <rect x="15" y="70" width="120" height="15" rx="3" fill="#e2e8f0"/>
    <text x="75" y="81" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="bold" fill="#475569">NO TAG</text>

    <!-- Arrow 1 -->
    <line x1="150" y1="45" x2="175" y2="45" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Stage 2: Breeder Seed -->
    <rect x="175" y="0" width="150" height="90" rx="8" fill="#fefce8" stroke="#ca8a04" stroke-width="2"/>
    <text x="250" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#a16207">2. Breeder Seed</text>
    <text x="250" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#854d0e">100% Genetic Purity</text>
    <text x="250" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#854d0e">SAUs / ICAR Institutes</text>
    <rect x="190" y="70" width="120" height="15" rx="3" fill="#fde047"/>
    <text x="250" y="81" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="bold" fill="#713f12">GOLDEN YELLOW TAG</text>

    <!-- Arrow 2 -->
    <line x1="325" y1="45" x2="350" y2="45" stroke="#ca8a04" stroke-width="2"/>

    <!-- Stage 3: Foundation Seed -->
    <rect x="350" y="0" width="150" height="90" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
    <text x="425" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#334155">3. Foundation Seed</text>
    <text x="425" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">99.5% Purity</text>
    <text x="425" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">NSC / SSCs / KVKs</text>
    <rect x="365" y="70" width="120" height="15" rx="3" fill="#ffffff" stroke="#94a3b8"/>
    <text x="425" y="81" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="bold" fill="#1e293b">WHITE TAG</text>

    <!-- Arrow 3 -->
    <line x1="500" y1="45" x2="525" y2="45" stroke="#64748b" stroke-width="2"/>

    <!-- Stage 4: Certified Seed -->
    <rect x="525" y="0" width="155" height="90" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <text x="602" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1d4ed8">4. Certified Seed</text>
    <text x="602" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1e40af">Certified by SSCA</text>
    <text x="602" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1e40af">For Commercial Farming</text>
    <rect x="542" y="70" width="120" height="15" rx="3" fill="#60a5fa"/>
    <text x="602" y="81" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="bold" fill="#ffffff">AZURE BLUE TAG</text>
  </g>

  <!-- Breeding Methods Comparison Split -->
  <rect x="60" y="180" width="325" height="260" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
  <text x="222" y="208" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#14532d">Self-Pollinated Breeding (Autogamy)</text>
  
  <rect x="75" y="222" width="295" height="60" rx="6" fill="#dcfce7"/>
  <text x="85" y="242" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#14532d">Pureline Selection (Johannsen):</text>
  <text x="85" y="258" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• Isolates homozygous line from landrace</text>
  <text x="85" y="272" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• No further genetic variance within line</text>

  <rect x="75" y="292" width="295" height="65" rx="6" fill="#dcfce7"/>
  <text x="85" y="312" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#14532d">Pedigree Method:</text>
  <text x="85" y="328" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• Artificial crossing -> F1 -> F2 segregating</text>
  <text x="85" y="342" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• Individual selection with pedigree records to F6</text>

  <rect x="75" y="367" width="295" height="60" rx="6" fill="#dcfce7"/>
  <text x="85" y="387" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#14532d">Mass Selection:</text>
  <text x="85" y="403" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• Phenotypic pooling without progeny testing</text>
  <text x="85" y="417" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• Retains broad genetic base and adaptability</text>

  <!-- Cross-Pollinated Breeding Split -->
  <rect x="415" y="180" width="325" height="260" rx="10" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5"/>
  <text x="577" y="208" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#854d0e">Cross-Pollinated Breeding (Allogamy)</text>
  
  <rect x="430" y="222" width="295" height="60" rx="6" fill="#fef9c3"/>
  <text x="440" y="242" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#713f12">Heterosis / Hybrid Breeding:</text>
  <text x="440" y="258" font-family="system-ui, sans-serif" font-size="11" fill="#854d0e">• Superiority of F1 over parents (Shull, Jones)</text>
  <text x="440" y="272" font-family="system-ui, sans-serif" font-size="11" fill="#854d0e">• Single cross (A x B) vs Double cross ((AxB) x (CxD))</text>

  <rect x="430" y="292" width="295" height="65" rx="6" fill="#fef9c3"/>
  <text x="440" y="312" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#713f12">Three-Line CMS System:</text>
  <text x="440" y="328" font-family="system-ui, sans-serif" font-size="11" fill="#854d0e">• A-line: Male sterile line (cytoplasmic-genetic)</text>
  <text x="440" y="342" font-family="system-ui, sans-serif" font-size="11" fill="#854d0e">• B-line: Maintainer line | R-line: Fertility restorer</text>

  <rect x="430" y="367" width="295" height="60" rx="6" fill="#fef9c3"/>
  <text x="440" y="387" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#713f12">Synthetic &amp; Composite Cultivars:</text>
  <text x="440" y="403" font-family="system-ui, sans-serif" font-size="11" fill="#854d0e">• Inter-mating tested inbred lines</text>
  <text x="440" y="417" font-family="system-ui, sans-serif" font-size="11" fill="#854d0e">• Farmers can reuse seeds for 3-4 generations</text>
</svg>`,
    workedExamples: [
      {
        id: "agriculture-unit1-we1",
        questionNumber: 1,
        question:
          "What is the official certification tag color affixed to bags of 'Foundation Seed' by seed certification agencies in India?",
        options: [
          { id: "A", text: "Golden Yellow" },
          { id: "B", text: "White" },
          { id: "C", text: "Azure Blue" },
          { id: "D", text: "Opal Green" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Review the 4-tier seed generation system in India.",
          "Step 2: Tag colors: Breeder Seed = Golden Yellow; Foundation Seed = White; Certified Seed = Azure Blue.",
          "Step 3: Therefore, Foundation Seed bags carry a pure White certification tag.",
        ],
        cuetInsight:
          "Seed tag colors (Breeder = Yellow, Foundation = White, Certified = Blue) are 100% recurring high-yield questions.",
      },
      {
        id: "agriculture-unit1-we2",
        questionNumber: 2,
        question:
          "Calculate the Growing Degree Days (GDD) accumulated on a day when the maximum temperature was 32°C, minimum temperature was 18°C, and base temperature for the crop is 10°C.",
        options: [
          { id: "A", text: "15 degree-days" },
          { id: "B", text: "25 degree-days" },
          { id: "C", text: "12 degree-days" },
          { id: "D", text: "22 degree-days" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Formula for GDD = ((T_max + T_min) / 2) - T_base.",
          "Step 2: Average temperature = (32 + 18) / 2 = 50 / 2 = 25°C.",
          "Step 3: Subtract base temperature: 25 - 10 = 15 degree-days.",
        ],
        cuetInsight:
          "Simple single-step numerical problems based on GDD and Seed Replacement Rate appear frequently in CUET Agriculture.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Direct Matching: Seed Class & Certification Tag",
        frequency: "Very High",
        typicalStem: "Match Breeder, Foundation, and Certified seeds with Golden Yellow, White, and Azure Blue tags.",
        strategy: "Use the mnemonic 'B-Y, F-W, C-B' (Breeder Yellow, Foundation White, Certified Blue).",
      },
      {
        patternType: "Concept Application: Floral Biology & Pollination",
        frequency: "High",
        typicalStem: "Protandry condition in maize favors which mode of pollination?",
        strategy: "Since male tassels mature and shed pollen before female silk emerges, self-pollination is prevented, ensuring cross-pollination (allogamy).",
      },
    ],
    commonTraps: [
      {
        trap: "Confusing Breeder Seed with Foundation Seed tags.",
        whyItTraps: "Students swap Yellow and White tags.",
        howToAvoid: "Remember: 'Breeder is Gold' (Golden Yellow), 'Foundation is Stone/White' (White).",
      },
      {
        trap: "Assuming wheat is a short-day plant because it grows in winter.",
        whyItTraps: "Rabi crops grow under short winter days initially, but wheat requires long days and warm temperatures to flower and mature (long-day plant).",
        howToAvoid: "Wheat, barley, oat, gram are long-day crops; rice, maize, bajra are short-day / day-neutral.",
      },
    ],
    mnemonics: [
      {
        mnemonic: "B-F-C = Yellow, White, Blue (You Will Bloom)",
        meaning: "Breeder = Yellow, Foundation = White, Certified = Blue.",
        application: "Instant recall for seed certification tags.",
      },
    ],
    quickRevisionCard: {
      title: "Agrometeorology & Genetics Quick Revision",
      keyPoints: [
        "PAR: 400-700 nm; GDD = ((Tmax + Tmin)/2) - Tbase.",
        "Planning Commission agro-climatic zones of India = 15 zones.",
        "Photoperiodism: Wheat/Barley (Long-day); Rice/Soybean (Short-day); Maize/Tomato (Day-neutral).",
        "Pureline Selection: W.L. Johannsen (1903); progeny of single homozygous self-fertilized individual.",
        "CMS Lines: A-line (sterile), B-line (maintainer), R-line (restorer).",
        "Seed Chain: Nucleus (no tag) -> Breeder (Golden Yellow) -> Foundation (White) -> Certified (Azure Blue).",
      ],
    },
    practiceQuestions: [
      {
        id: "agriculture-unit1-q1",
        type: "standard",
        question: "How many Agro-Climatic Zones have been delineated in India by the Planning Commission?",
        options: [
          { id: "A", text: "8" },
          { id: "B", text: "15" },
          { id: "C", text: "21" },
          { id: "D", text: "127" },
        ],
        correctOption: "B",
        explanation: "The Planning Commission delineated 15 broad agro-climatic zones in India based on physiography, climate, soil types, and cropping patterns.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit1-q2",
        type: "standard",
        question: "The concept of 'Pureline Theory' in genetics and plant breeding was proposed by which scientist?",
        options: [
          { id: "A", text: "Gregor Johann Mendel" },
          { id: "B", text: "W.L. Johannsen" },
          { id: "C", text: "G.H. Shull" },
          { id: "D", text: "Norman Borlaug" },
        ],
        correctOption: "B",
        explanation: "W.L. Johannsen (1903) formulated the Pureline Theory based on his work with Princess beans (Phaseolus vulgaris), proving that continuous variation within a pureline is environmental.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit1-q3",
        type: "standard",
        question: "In the three-line hybrid seed production system using Cytoplasmic Genetic Male Sterility (CGMS), what is the function of the B-line?",
        options: [
          { id: "A", text: "It carries fertility restorer genes to restore male fertility in F1 hybrids" },
          { id: "B", text: "It is an isogenic maintainer line used to multiply the male-sterile A-line" },
          { id: "C", text: "It is the commercial hybrid sold to farmers" },
          { id: "D", text: "It carries disease resistance without pollen" },
        ],
        correctOption: "B",
        explanation: "The B-line is male-fertile with normal cytoplasm but possesses the same recessive nuclear non-restorer genes as the A-line, acting as a maintainer to perpetuate A-line seeds.",
        difficulty: "hard",
      },
      {
        id: "agriculture-unit1-q4",
        type: "assertion-reason",
        question: "Given below are two statements:\nAssertion (A): Wheat is classified as a long-day plant (LDP).\nReason (R): Wheat requires exposure to photoperiods exceeding a critical day length to transition from vegetative to reproductive phase and flower.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Both statements are correct and (R) provides the accurate physiological definition of a long-day plant.",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit1-q5",
        type: "match-the-following",
        question: "Match List-I (Seed Class) with List-II (Tag Color):\nList-I:\n(P) Breeder Seed\n(Q) Foundation Seed\n(R) Certified Seed\n(S) Nucleus Seed\n\nList-II:\n(1) Azure Blue\n(2) White\n(3) Golden Yellow\n(4) No Tag",
        options: [
          { id: "A", text: "P-3, Q-2, R-1, S-4" },
          { id: "B", text: "P-2, Q-3, R-1, S-4" },
          { id: "C", text: "P-3, Q-1, R-2, S-4" },
          { id: "D", text: "P-1, Q-2, R-3, S-4" },
        ],
        correctOption: "A",
        explanation: "Breeder = Golden Yellow; Foundation = White; Certified = Azure Blue; Nucleus = No tag.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit1-q6",
        type: "standard",
        question: "The waveband of solar radiation utilized in photosynthesis (PAR) corresponds to:",
        options: [
          { id: "A", text: "100 to 300 nm" },
          { id: "B", text: "400 to 700 nm" },
          { id: "C", text: "750 to 1000 nm" },
          { id: "D", text: "250 to 500 nm" },
        ],
        correctOption: "B",
        explanation: "Photosynthetically Active Radiation (PAR) occupies the visible spectral waveband between 400 nm (blue) and 700 nm (red).",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit1-q7",
        type: "standard",
        question: "Condition where the stamens of a bisexual flower shed pollen before the stigma becomes receptive is termed:",
        options: [
          { id: "A", text: "Protogyny" },
          { id: "B", text: "Protandry" },
          { id: "C", text: "Cleistogamy" },
          { id: "D", text: "Herkogamy" },
        ],
        correctOption: "B",
        explanation: "Protandry occurs when male anthers mature before the female pistil (e.g., maize tassels), encouraging cross-pollination.",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit1-q8",
        type: "standard",
        question: "Double-cross hybrid production technique in maize was developed by:",
        options: [
          { id: "A", text: "G.H. Shull" },
          { id: "B", text: "D.F. Jones" },
          { id: "C", text: "Norman Borlaug" },
          { id: "D", text: "M.S. Swaminathan" },
        ],
        correctOption: "B",
        explanation: "D.F. Jones (1918) suggested the double-cross technique ((A x B) x (C x D)) in maize to overcome the low seed yield of inbred maternal parents in single crosses.",
        difficulty: "hard",
      },
      {
        id: "agriculture-unit1-q9",
        type: "standard",
        question: "What is the standard base temperature (T_base) used for calculating Growing Degree Days in Wheat?",
        options: [
          { id: "A", text: "0°C" },
          { id: "B", text: "4.5°C to 5.0°C" },
          { id: "C", text: "10.0°C" },
          { id: "D", text: "15.0°C" },
        ],
        correctOption: "B",
        explanation: "The base temperature below which vegetative growth ceases in wheat is between 4.0°C and 5.0°C (typically taken as 4.5°C).",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit1-q10",
        type: "standard",
        question: "Which plant breeding method is most appropriate for handling segregating generations (F2 to F6) of a cross in self-pollinated crops where detailed ancestral records are maintained?",
        options: [
          { id: "A", text: "Bulk method" },
          { id: "B", text: "Pedigree method" },
          { id: "C", text: "Mass selection" },
          { id: "D", text: "Recurrent selection" },
        ],
        correctOption: "B",
        explanation: "The pedigree method maintains individual plant selections along with meticulous genealogical (pedigree) records from F2 through to homozygosity in F6/F7.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["Plant Physiology and Genetics (Biology)"],
      relatedTopics: ["Crop Production", "Horticulture"],
      practiceTestId: "practice-agriculture-unit1-test1",
      practiceTestUrl: "/test/practice-agriculture-unit1-test1",
      weaknessReportUrl: "/dashboard/radar?subject=agriculture",
      weaknessRadarUrl: "/dashboard/radar?subject=agriculture",
    },
  },

  // UNIT 2
  {
    id: "agriculture-unit2-care-and-management-of-cattle-poultry-dairy-technology-animal-nutrition",
    slug: "care-and-management-of-cattle-poultry-dairy-technology-animal-nutrition",
    subject: "agriculture",
    subjectName: "Agriculture",
    subjectCode: "302",
    unitNumber: 2,
    unitTitle: "Livestock Production",
    topicTitle: "Care and Management of Cattle, Poultry, Dairy Technology, Animal Nutrition",
    ncertReference: {
      book: "ICAR / NCERT Agriculture Class XII",
      chapter: "Unit II: Livestock Production",
      pages: "Pages 49-92",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 20,
      weightagePercentage: 25.0,
    },
    thirtySecondSummary: [
      "Livestock production provides drought resistance, milk, meat, eggs, and organic manures, forming the backbone of Indian mixed farming systems.",
      "Indigenous cattle breeds (Bos indicus) possess a prominent hump, dewlap, and heat tolerance (Milch: Sahiwal, Red Sindhi, Gir; Draught: Amritmahal, Hallikar; Dual: Hariana, Tharparkar, Ongole); Exotic breeds (Bos taurus) include Holstein-Friesian and Jersey.",
      "Buffalo breeds (Bubalus bubalis) contribute over 50% of India's milk production; Murrah is the premier dairy breed ('Black Gold'), alongside Nili-Ravi, Mehsana, and Jaffarabadi.",
      "Animal nutrition differentiates Roughages (crude fiber > 18%, TDN < 60%) from Concentrates (crude fiber < 18%, TDN > 60%); Silage (anaerobic preservation of green fodder, lactic acid pH 3.8-4.2) and Hay making preserve seasonal surplus.",
      "Dairy technology covers milk composition (Colostrum, casein, lactose), legal standards (Cow milk: 3.5% Fat, 8.5% SNF; Buffalo milk: 6.0% Fat, 9.0% SNF), Pasteurization (LTLT: 63°C for 30 min; HTST: 72°C for 15 sec), and common livestock diseases (Foot & Mouth Disease, Anthrax, Ranikhet).",
    ],
    coreConcepts: [
      {
        title: "Classification of Cattle and Buffalo Breeds",
        explanation:
          "Indian indigenous cattle belong to Bos indicus (humped, Zebu cattle), known for heat tolerance, disease resistance, and tick tolerance.\n1. Milch Breeds: Cows produce high milk yields, bullocks poor for draught.\n- Sahiwal: Origin Montgomery (Pakistan); sweetest milk, loose skin ('Lola'), reddish-dun color.\n- Gir: Origin Kathiawar (Gujarat); convex forehead, pendulous leaf-like curled ears.\n- Red Sindhi: Origin Karachi; deep red body.\n2. Draught Breeds: Bullocks excellent for plowing and carting, cows poor milkers (Amritmahal, Hallikar, Nagori, Khillari).\n3. Dual Purpose Breeds: Cows good milkers, bullocks good for draft (Hariana, Tharparkar, Ongole, Kankrej - known for 'Sawai Chaal').\n4. Exotic Breeds: Holstein-Friesian (highest milk yield in the world, black and white patches), Jersey (highest fat percentage among exotics, 5-5.5%).\n5. Buffalo Breeds: Murrah (jet black, tightly curled horns like spiral rings, world's highest dairy yielder); Mehsana (cross of Murrah x Surti); Surti (sickle-shaped horns); Bhadawari (copper-colored body, highest milk fat up to 13%).",
        keyTakeaways: [
          "Sahiwal: Best indigenous dairy cow, loose skin (Lola).",
          "Gir: Pendulous leaf-like curled ears, convex forehead.",
          "Murrah: Premier buffalo, tightly curved spiral horns, jet black.",
          "Bhadawari: Highest fat percentage in buffalo milk (up to 13%).",
        ],
        ncertPointer:
          "ICAR Class XII Unit II, Cattle & Buffalo breeds, pp. 50-62.",
      },
      {
        title: "Feeds, Animal Nutrition, and Fodder Preservation",
        explanation:
          "Ruminant digestion relies on rumen microbial fermentation of fibrous feedstuffs.\n1. Feed Classification:\n- Roughages: Bulky feeds with > 18% crude fiber (CF) and < 60% Total Digestible Nutrients (TDN). Green roughages: Legumes (Berseem, Lucerne, Cowpea) rich in protein and calcium; Non-legumes (Maize, Jowar, Bajra, Napier grass). Dry roughages: Straw, Stover, Hay.\n- Concentrates: Low fiber (< 18% CF), high energy/protein (> 60% TDN). Energy-rich: Maize, wheat, barley, rice bran; Protein-rich: Mustard cake, groundnut cake, cotton seed cake, soybean meal.\n2. Fodder Preservation:\n- Silage: Green fodder preserved under anaerobic conditions by controlled lactic acid fermentation in silos. Best crops: Carbohydrate-rich fodders like Maize, Sorghum, Bajra. Quality silage has pH 3.8-4.2, greenish-yellow color, and sweet aroma (lactic acid > acetic acid).\n- Hay: Fodder dried to < 15% moisture to prevent spoilage without losing nutrients. Best crop for hay: Thin-stemmed legumes like Oat and Lucerne.",
        keyTakeaways: [
          "Roughages: CF > 18%, TDN < 60%; Concentrates: CF < 18%, TDN > 60%.",
          "Silage: Anaerobic fermentation of maize/jowar; ideal pH 3.8 - 4.2.",
          "Hay: Moisture content reduced to below 15%; ideal crop is Oat / Lucerne.",
        ],
        ncertPointer:
          "ICAR Class XII Unit II, Feeds & Nutrition section, pp. 64-75.",
      },
      {
        title: "Dairy Technology, Milk Standards & Poultry Management",
        explanation:
          "1. Milk Constituents & Colostrum: Colostrum is the first secretion post-parturition rich in immunoglobulins (antibodies), protein, and minerals. Milk protein is Casein (80%); sugar is Lactose; principal mineral is Calcium.\n2. Legal Standards (PFA / FSSAI):\n- Cow Milk: Minimum 3.5% Milk Fat, 8.5% Solids-Not-Fat (SNF).\n- Buffalo Milk: Minimum 6.0% Milk Fat, 9.0% SNF.\n- Standardized Milk: 4.5% Fat, 8.5% SNF.\n- Toned Milk: 3.0% Fat, 8.5% SNF.\n- Double Toned Milk: 1.5% Fat, 9.0% SNF.\n3. Pasteurization Methods: Destroys pathogenic microbes (especially Mycobacterium tuberculosis & Coxiella burnetii).\n- Low Temperature Long Time (LTLT): 63°C (145°F) for 30 minutes.\n- High Temperature Short Time (HTST): 72°C (161°F) for 15 seconds.\n- Ultra High Temperature (UHT): 135-150°C for 1-2 seconds.\n4. Poultry Systems & Diseases: Deep litter vs Cage system; Broilers (meat, 6-7 weeks) vs Layers (egg production starting at 20 weeks). Diseases: Ranikhet / Newcastle disease (viral, respiratory distress, twisting neck), Marek's disease (paralysis), Coccidiosis (protozoan, bloody diarrhea treated with amprolium).",
        keyTakeaways: [
          "Cow milk standard: 3.5% Fat, 8.5% SNF; Buffalo milk: 6.0% Fat, 9.0% SNF.",
          "Pasteurization: LTLT (63°C for 30 min) vs HTST (72°C for 15 sec).",
          "Ranikhet (Newcastle) disease: Highly contagious viral infection of poultry.",
        ],
        ncertPointer:
          "ICAR Class XII Unit II, Dairy & Poultry section, pp. 78-91.",
      },
    ],
    keyFacts: [
      {
        concept: "Murrah Buffalo",
        formulaOrFact: "Origin: Rohtak, Hisar (Haryana) | Characteristics: Jet black body, tightly coiled spiral horns",
        explanation: "Known as 'Black Gold' of India; highest milk yielding buffalo breed averaging 2000-2500 kg per lactation.",
        examTip: "CUET asks which breed is called Black Gold of Haryana.",
      },
      {
        concept: "HTST Pasteurization",
        formulaOrFact: "72°C (161°F) for exactly 15 seconds, followed by rapid cooling to < 4°C",
        explanation: "Destroys all vegetative pathogens without imparting cooked flavor or damaging milk vitamins.",
        examTip: "Phosphatase test confirms complete pasteurization efficiency.",
      },
      {
        concept: "Toned Milk Standard",
        formulaOrFact: "Minimum 3.0% Milk Fat and 8.5% SNF",
        explanation: "Prepared by blending whole buffalo milk with skimmed milk powder and water.",
        examTip: "Double toned milk is 1.5% Fat and 9.0% SNF.",
      },
      {
        concept: "Ranikhet Disease",
        formulaOrFact: "Paramyxovirus-1 | Acute viral disease of poultry",
        explanation: "Characterized by gasping, torticollis (twisted neck), greenish watery diarrhea, and 100% mortality in unvaccinated flocks.",
        examTip: "Vaccination: F1 strain at 1-7 days; R2B / Mukteswar strain at 6-8 weeks.",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" fill="#f8fafc" rx="12"/>
  <text x="400" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0f172a">Livestock Production: Breeds, Feeds &amp; Dairy Standards</text>
  
  <!-- Cattle & Buffalo Breeds Box -->
  <rect x="50" y="55" width="335" height="395" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="217" y="85" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#1e293b">LIVESTOCK BREEDS</text>

  <!-- Indigenous Cattle -->
  <rect x="65" y="105" width="305" height="110" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="75" y="128" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Indigenous Cattle (Bos indicus):</text>
  <text x="75" y="148" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Milch:</tspan> Sahiwal (sweetest milk, Lola), Gir (leaf-like ears), Red Sindhi</text>
  <text x="75" y="168" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Draught:</tspan> Amritmahal, Hallikar, Nagori</text>
  <text x="75" y="188" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Dual Purpose:</tspan> Hariana, Tharparkar, Kankrej ('Sawai Chaal')</text>
  <text x="75" y="206" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Exotic:</tspan> Holstein-Friesian (max milk), Jersey (high fat)</text>

  <!-- Buffalo Breeds -->
  <rect x="65" y="225" width="305" height="100" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="75" y="248" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Buffalo Breeds (Bubalus bubalis):</text>
  <text x="75" y="268" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Murrah:</tspan> Jet black, tightly curled horns, 'Black Gold'</text>
  <text x="75" y="286" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Surti:</tspan> Sickle-shaped horns, Gujarat</text>
  <text x="75" y="304" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Bhadawari:</tspan> Copper body, highest fat (up to 13%)</text>
  <text x="75" y="320" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Mehsana:</tspan> Cross of Murrah x Surti</text>

  <!-- Animal Nutrition Box -->
  <rect x="65" y="335" width="305" height="100" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="75" y="358" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Feeds &amp; Nutrition:</text>
  <text x="75" y="378" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Roughage:</tspan> Crude fiber &gt; 18%, TDN &lt; 60%</text>
  <text x="75" y="396" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Concentrate:</tspan> Crude fiber &lt; 18%, TDN &gt; 60%</text>
  <text x="75" y="414" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Silage:</tspan> Anaerobic corn/jowar, pH 3.8-4.2 (lactic acid)</text>
  <text x="75" y="428" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Hay:</tspan> Oat/Lucerne dried to &lt; 15% moisture</text>

  <!-- Dairy & Poultry Box -->
  <rect x="415" y="55" width="335" height="395" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="582" y="85" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#1e293b">DAIRY STANDARDS &amp; POULTRY</text>

  <!-- Legal Milk Standards Table -->
  <rect x="430" y="105" width="305" height="150" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="440" y="128" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Legal Milk Composition (PFA / FSSAI):</text>
  
  <!-- Row 1 -->
  <rect x="440" y="140" width="285" height="22" fill="#e2e8f0"/>
  <text x="450" y="156" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">Milk Type</text>
  <text x="560" y="156" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">Fat % (Min)</text>
  <text x="650" y="156" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">SNF % (Min)</text>

  <text x="450" y="180" font-family="system-ui, sans-serif" font-size="11" fill="#334155">Cow Milk</text>
  <text x="575" y="180" font-family="system-ui, sans-serif" font-size="11" fill="#334155">3.5 %</text>
  <text x="665" y="180" font-family="system-ui, sans-serif" font-size="11" fill="#334155">8.5 %</text>

  <text x="450" y="200" font-family="system-ui, sans-serif" font-size="11" fill="#334155">Buffalo Milk</text>
  <text x="575" y="200" font-family="system-ui, sans-serif" font-size="11" fill="#334155">6.0 %</text>
  <text x="665" y="200" font-family="system-ui, sans-serif" font-size="11" fill="#334155">9.0 %</text>

  <text x="450" y="220" font-family="system-ui, sans-serif" font-size="11" fill="#334155">Toned Milk</text>
  <text x="575" y="220" font-family="system-ui, sans-serif" font-size="11" fill="#334155">3.0 %</text>
  <text x="665" y="220" font-family="system-ui, sans-serif" font-size="11" fill="#334155">8.5 %</text>

  <text x="450" y="240" font-family="system-ui, sans-serif" font-size="11" fill="#334155">Double Toned Milk</text>
  <text x="575" y="240" font-family="system-ui, sans-serif" font-size="11" fill="#334155">1.5 %</text>
  <text x="665" y="240" font-family="system-ui, sans-serif" font-size="11" fill="#334155">9.0 %</text>

  <!-- Pasteurization Box -->
  <rect x="430" y="265" width="305" height="75" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="440" y="285" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Pasteurization Regimes:</text>
  <text x="440" y="305" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">LTLT:</tspan> 63°C (145°F) for 30 minutes</text>
  <text x="440" y="323" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">HTST:</tspan> 72°C (161°F) for 15 seconds (Plate Exchanger)</text>

  <!-- Poultry Box -->
  <rect x="430" y="350" width="305" height="85" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="440" y="372" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Poultry Management &amp; Health:</text>
  <text x="440" y="392" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Broilers:</tspan> 6-7 weeks (meat) | <tspan font-weight="bold">Layers:</tspan> Egg laying from 20 wks</text>
  <text x="440" y="410" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Ranikhet (Newcastle):</tspan> Viral paramyxovirus; twisting neck</text>
  <text x="440" y="426" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Marek's Disease:</tspan> Herpesvirus; leg paralysis</text>
</svg>`,
    workedExamples: [
      {
        id: "agriculture-unit2-we1",
        questionNumber: 1,
        question:
          "According to statutory legal standards in India, what are the minimum prescribed Milk Fat and Solids-Not-Fat (SNF) percentages for cow milk?",
        options: [
          { id: "A", text: "3.5% Fat and 8.5% SNF" },
          { id: "B", text: "6.0% Fat and 9.0% SNF" },
          { id: "C", text: "4.5% Fat and 8.5% SNF" },
          { id: "D", text: "3.0% Fat and 8.5% SNF" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Recall the standard milk legal compositions under FSSAI / PFA regulations.",
          "Step 2: Cow milk requires a minimum of 3.5% Fat and 8.5% SNF.",
          "Step 3: (Buffalo milk requires 6.0% Fat & 9.0% SNF; Toned milk requires 3.0% Fat & 8.5% SNF).",
        ],
        cuetInsight:
          "Questions testing legal fat and SNF percentages across cow, buffalo, and toned milk are guaranteed points in the dairy section.",
      },
      {
        id: "agriculture-unit2-we2",
        questionNumber: 2,
        question:
          "Which buffalo breed is famous for having the highest fat percentage (up to 13%) in its milk, accompanied by a distinct copper-colored body coat?",
        options: [
          { id: "A", text: "Murrah" },
          { id: "B", text: "Surti" },
          { id: "C", text: "Bhadawari" },
          { id: "D", text: "Nili-Ravi" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Look at the identifying traits: 'copper colored body' and 'highest milk fat (up to 13%)'.",
          "Step 2: Bhadawari breed, originating from the Agra and Etawah region of Uttar Pradesh, possesses these exact characteristics.",
          "Step 3: (Murrah is jet black with coiled horns; Surti has sickle horns).",
        ],
        cuetInsight:
          "Unique breed signatures (Bhadawari copper coat, Gir curled ears, Kankrej sawai chaal) are standard CUET stems.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Classification Match: Cattle Breeds by Purpose",
        frequency: "Very High",
        typicalStem: "Match Milch, Draught, and Dual purpose cattle with Gir, Amritmahal, and Hariana.",
        strategy: "Memorize: Sahiwal/Gir = Milch; Amritmahal/Hallikar = Draught; Hariana/Tharparkar = Dual.",
      },
      {
        patternType: "Disease Etiology & Symptoms in Poultry and Livestock",
        frequency: "High",
        typicalStem: "Ranikhet disease in poultry is caused by which pathogen?",
        strategy: "Remember: Ranikhet / Newcastle disease is caused by Paramyxovirus-1.",
      },
    ],
    commonTraps: [
      {
        trap: "Confusing Silage with Hay requirements.",
        whyItTraps: "Silage requires carbohydrate-rich green fodder preserved anaerobically with 60-70% moisture; Hay requires thin-stemmed green fodder dried down to < 15% moisture.",
        howToAvoid: "Silage = Wet & Anaerobic (pH 3.8-4.2); Hay = Dry (< 15% moisture).",
      },
      {
        trap: "Confusing HTST and LTLT temperature-time combinations.",
        whyItTraps: "LTLT is 63°C for 30 minutes; HTST is 72°C for 15 SECONDS (not 15 minutes!).",
        howToAvoid: "Note the units: HTST is 15 seconds.",
      },
    ],
    mnemonics: [
      {
        mnemonic: "S-G-R = Sweet Golden Rain -> Sahiwal, Gir, Red Sindhi (Top Milch Cows)",
        meaning: "Identifies the 3 premier indigenous milch cattle breeds.",
        application: "Instant recall for milch classification.",
      },
    ],
    quickRevisionCard: {
      title: "Livestock & Dairy Quick Revision",
      keyPoints: [
        "Milch Cattle: Sahiwal (Lola, sweetest milk), Gir (pendulous ears), Red Sindhi.",
        "Draught: Amritmahal, Hallikar, Nagori; Dual: Hariana, Tharparkar, Kankrej.",
        "Buffaloes: Murrah ('Black Gold', spiral horns); Bhadawari (copper coat, up to 13% fat); Surti (sickle horns).",
        "Roughage (CF > 18%, TDN < 60%) vs Concentrate (CF < 18%, TDN > 60%).",
        "Silage: Anaerobic, lactic acid, ideal pH 3.8-4.2; Maize is best crop.",
        "Milk Legal Standards: Cow = 3.5% Fat, 8.5% SNF; Buffalo = 6.0% Fat, 9.0% SNF; Toned = 3.0% Fat, 8.5% SNF.",
        "Pasteurization: LTLT (63°C, 30 min) | HTST (72°C, 15 sec).",
        "Ranikhet Disease: Paramyxovirus; respiratory distress, nervous torticollis.",
      ],
    },
    practiceQuestions: [
      {
        id: "agriculture-unit2-q1",
        type: "standard",
        question: "Which buffalo breed of Haryana is universally celebrated as the 'Black Gold' due to its exceptional milk yield?",
        options: [
          { id: "A", text: "Surti" },
          { id: "B", text: "Murrah" },
          { id: "C", text: "Jaffarabadi" },
          { id: "D", text: "Toda" },
        ],
        correctOption: "B",
        explanation: "Murrah buffaloes, originating from Rohtak, Hisar, and Jind districts of Haryana, are termed 'Black Gold' due to their superior genetics and milk production.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit2-q2",
        type: "standard",
        question: "Under the High Temperature Short Time (HTST) pasteurization method, milk is heated to which temperature for what duration?",
        options: [
          { id: "A", text: "63°C for 30 minutes" },
          { id: "B", text: "72°C for 15 seconds" },
          { id: "C", text: "80°C for 5 minutes" },
          { id: "D", text: "100°C for 1 second" },
        ],
        correctOption: "B",
        explanation: "HTST pasteurization involves heating milk to 72°C (161°F) for 15 seconds in continuous plate heat exchangers, followed by rapid chilling to under 4°C.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit2-q3",
        type: "standard",
        question: "Which of the following is categorized as a leguminous green fodder exceptionally rich in protein and calcium?",
        options: [
          { id: "A", text: "Maize (Zea mays)" },
          { id: "B", text: "Berseem (Trifolium alexandrinum)" },
          { id: "C", text: "Jowar (Sorghum bicolor)" },
          { id: "D", text: "Bajra (Pennisetum glaucum)" },
        ],
        correctOption: "B",
        explanation: "Berseem (Egyptian clover) is a prime leguminous rabi green fodder containing 18-20% crude protein and high calcium content.",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit2-q4",
        type: "assertion-reason",
        question: "Given below are two statements:\nAssertion (A): Maize is considered the most ideal crop for silage making.\nReason (R): Maize stalks contain an abundant concentration of fermentable water-soluble carbohydrates that facilitate rapid lactic acid production under anaerobic conditions.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Both statements are correct and (R) explains why maize produces superior quality silage with a stable low pH (3.8-4.2).",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit2-q5",
        type: "match-the-following",
        question: "Match List-I (Cattle Breed) with List-II (Category):\nList-I:\n(P) Sahiwal\n(Q) Amritmahal\n(R) Hariana\n(S) Holstein-Friesian\n\nList-II:\n(1) Exotic Dairy Breed\n(2) Indigenous Draught Breed\n(3) Indigenous Milch Breed\n(4) Dual Purpose Breed",
        options: [
          { id: "A", text: "P-3, Q-2, R-4, S-1" },
          { id: "B", text: "P-2, Q-3, R-1, S-4" },
          { id: "C", text: "P-3, Q-4, R-2, S-1" },
          { id: "D", text: "P-1, Q-2, R-3, S-4" },
        ],
        correctOption: "A",
        explanation: "Sahiwal = Indigenous Milch; Amritmahal = Indigenous Draught; Hariana = Dual Purpose; Holstein-Friesian = Exotic Dairy.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit2-q6",
        type: "standard",
        question: "What is the maximum permissible moisture percentage in good quality 'Hay' to prevent microbial molding and spontaneous heating during storage?",
        options: [
          { id: "A", text: "15%" },
          { id: "B", text: "35%" },
          { id: "C", text: "50%" },
          { id: "D", text: "65%" },
        ],
        correctOption: "A",
        explanation: "Hay must be dried until moisture drops below 15% (ideally 12-14%) to inhibit bacterial and fungal spoilage in storage stacks.",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit2-q7",
        type: "standard",
        question: "Toned milk is manufactured by standardizing whole buffalo milk to which legal specifications?",
        options: [
          { id: "A", text: "1.5% Fat and 9.0% SNF" },
          { id: "B", text: "3.0% Fat and 8.5% SNF" },
          { id: "C", text: "4.5% Fat and 8.5% SNF" },
          { id: "D", text: "6.0% Fat and 9.0% SNF" },
        ],
        correctOption: "B",
        explanation: "Toned milk has statutory limits of minimum 3.0% Fat and 8.5% Solids-Not-Fat (SNF).",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit2-q8",
        type: "standard",
        question: "The contagious poultry disease characterized by gasping, green diarrhea, and twisting of the neck (torticollis) caused by a Paramyxovirus is:",
        options: [
          { id: "A", text: "Fowl Pox" },
          { id: "B", text: "Ranikhet (Newcastle) Disease" },
          { id: "C", text: "Coccidiosis" },
          { id: "D", text: "Infectious Bursal Disease" },
        ],
        correctOption: "B",
        explanation: "Ranikhet (Newcastle) disease is caused by Avian Paramyxovirus-1, producing acute respiratory, digestive, and nervous signs.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit2-q9",
        type: "standard",
        question: "Which test is routinely employed in dairy processing laboratories to verify the completeness and efficiency of milk pasteurization?",
        options: [
          { id: "A", text: "Phosphatase test" },
          { id: "B", text: "Methylene Blue Reduction Test (MBRT)" },
          { id: "C", text: "Resazurin test" },
          { id: "D", text: "Gerber test" },
        ],
        correctOption: "A",
        explanation: "The alkaline phosphatase enzyme naturally present in raw milk is slightly more heat-resistant than pathogens; its total inactivation indicates adequate pasteurization.",
        difficulty: "hard",
      },
      {
        id: "agriculture-unit2-q10",
        type: "standard",
        question: "Colostrum fed to newborn calves within the first few hours of birth is critical because it contains high concentrations of:",
        options: [
          { id: "A", text: "Starch and fiber" },
          { id: "B", text: "Immunoglobulins (antibodies) for passive immunity" },
          { id: "C", text: "Lactose sugar only" },
          { id: "D", text: "Calcium oxalate" },
        ],
        correctOption: "B",
        explanation: "Calves are born without protective maternal antibodies; colostrum delivers pre-formed immunoglobulins across the gut mucosa to confer passive immunity against infections.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Agrometeorology, Genetics & Plant Breeding"],
      relatedTopics: ["Crop Production", "Dairy Technology"],
      practiceTestId: "practice-agriculture-unit2-test1",
      practiceTestUrl: "/test/practice-agriculture-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=agriculture",
      weaknessRadarUrl: "/dashboard/radar?subject=agriculture",
    },
  },

  // UNIT 3
  {
    id: "agriculture-unit3-soil-science-fertilizers-irrigation-agronomy-of-major-crops",
    slug: "soil-science-fertilizers-irrigation-agronomy-of-major-crops",
    subject: "agriculture",
    subjectName: "Agriculture",
    subjectCode: "302",
    unitNumber: 3,
    unitTitle: "Crop Production",
    topicTitle: "Soil Science, Fertilizers, Irrigation, Agronomy of Major Crops",
    ncertReference: {
      book: "ICAR / NCERT Agriculture Class XII",
      chapter: "Unit III: Crop Production",
      pages: "Pages 93-144",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 24,
      weightagePercentage: 25.0,
    },
    thirtySecondSummary: [
      "Soil science investigates soil genesis, profile horizons (O, A, B, C), physical properties (texture, structure, bulk density 1.33 g/cm³, particle density 2.65 g/cm³), and soil reactions (acid, saline, sodic).",
      "Essential plant nutrients (17 elements, Arnon & Stout criteria) are categorized into Basic (C, H, O), Primary (N, P, K), Secondary (Ca, Mg, S), and Micronutrients (Fe, Mn, Zn, Cu, B, Mo, Cl, Ni); Nickel was added as the 17th essential element.",
      "Commercial fertilizers supply concentrated nutrients: Urea (46% N), DAP (18% N, 46% P2O5), MOP (60% K2O), and SSP (16% P2O5, 11% S, 19% Ca); Biofertilizers include Rhizobium (legumes), Azotobacter (free-living), and VAM (phosphorus uptake).",
      "Irrigation scheduling targets critical growth stages: Crown Root Initiation (CRI at 20-25 DAS) in wheat; Panicle initiation & flowering in rice. Advanced pressurized methods include Drip irrigation (90-95% water use efficiency) and Sprinkler systems.",
      "Agronomy of major crops encompasses seed rates, spacing, weed control, and fertilizer regimes for Cereals (Rice, Wheat, Maize), Pulses (Chickpea, Pigeonpea), and Oilseeds (Mustard, Groundnut).",
    ],
    coreConcepts: [
      {
        title: "Soil Physical Properties, Chemistry and Problematic Soils",
        explanation:
          "Soil is a dynamic natural body comprising mineral matter (45%), organic matter (5%), water (25%), and air (25%).\n1. Physical Properties: Texture (relative proportion of sand, silt, and clay; cannot be changed by farmers); Structure (arrangement of primary soil particles into peds/aggregates; crumb/granular structure is best for crops); Bulk Density (mass of dry soil per unit total volume, typical range 1.2-1.6 g/cm³; particle density is ~2.65 g/cm³).\n2. Problematic Soils & Reclamation:\n- Acid Soils (pH < 6.5): High Al, Fe, and Mn toxicity, deficient in P and Ca; reclaimed by applying Agricultural Lime (CaCO3).\n- Saline Soils (Solonchak, Electrical Conductivity EC > 4 dS/m, Exchangeable Sodium Percentage ESP < 15, pH < 8.5): Reclaimed by leaching with good quality water and installing drainage.\n- Sodic / Alkali Soils (Solonetz, EC < 4 dS/m, ESP > 15, pH > 8.5): Dispersed structure due to high Na+; reclaimed by applying Gypsum (CaSO4.2H2O), replacing exchangeable Na+ with Ca2+.",
        keyTakeaways: [
          "Soil composition: 45% mineral, 5% organic, 25% water, 25% air.",
          "Acid soil reclamation: Lime (CaCO3).",
          "Sodic / Alkali soil reclamation: Gypsum (CaSO4.2H2O).",
          "Saline soil reclamation: Leaching with drainage.",
        ],
        ncertPointer:
          "ICAR Class XII Unit III, Soil Science section, pp. 95-108.",
      },
      {
        title: "Plant Nutrition, Fertilizers, and Biofertilizers",
        explanation:
          "Arnon & Stout (1939) established criteria of essentiality: a plant cannot complete its life cycle without the element, its action is specific, and it is directly involved in metabolism.\n1. Classification:\n- Primary: Nitrogen (vegetative growth, protein), Phosphorus ('key to life', root development, ATP), Potassium (enzyme activation, stomatal regulation, disease resistance).\n- Secondary: Calcium (cell wall pectin), Magnesium (central atom of chlorophyll ring), Sulfur (amino acids methionine and cysteine).\n- Micronutrients: Fe, Mn, Zn ('Khaira' disease in rice), Cu, B (pollen germination, fruit cracking), Mo (nitrogenase enzyme cofactor), Cl, Ni (urease cofactor).\n2. Commercial Fertilizers:\n- Urea: 46% N (highest among solid N fertilizers).\n- Diammonium Phosphate (DAP): 18% N and 46% P2O5.\n- Muriate of Potash (MOP / KCl): 60% K2O.\n- Single Super Phosphate (SSP): 16% P2O5, 11-12% Sulfur, 19% Calcium.\n3. Biofertilizers: Rhizobium (symbiotic N-fixation with legumes; e.g., R. leguminosarum, R. japonicum); Azotobacter (free-living aerobic N-fixer in wheat/maize); Azospirillum (associative N-fixer in sorghum/millets); Blue Green Algae (BGA) and Azolla-Anabaena (lowland wetland rice); Vesicular Arbuscular Mycorrhiza (VAM, mobilize insoluble phosphorus).",
        keyTakeaways: [
          "17 essential elements; Nickel added in 1987.",
          "Fertilizer grades: Urea = 46% N; DAP = 18-46-0; MOP = 60% K2O; SSP = 16% P2O5 + 11% S.",
          "Khaira disease of rice: Zinc deficiency; rectified with ZnSO4 spray.",
          "Rhizobium: Symbiotic N-fixation in pulses; VAM: Phosphorus mobilizer.",
        ],
        ncertPointer:
          "ICAR Class XII Unit III, Fertilizers & Nutrition, pp. 110-124.",
      },
      {
        title: "Irrigation Methods and Agronomy of Major Field Crops",
        explanation:
          "1. Water Management & Critical Stages:\n- Wheat: Crown Root Initiation (CRI) at 20-25 days after sowing (DAS) is the most critical stage; skipping irrigation here reduces yield by > 30%.\n- Rice: Panicle initiation, flowering, and milk stages require continuous shallow submergence (5 cm).\n- Advanced Methods: Drip / Trickle irrigation delivers water drop-by-drop to the root zone (efficiency 90-95%, ideal for orchards, row crops, water-scarce regions); Sprinkler irrigation (efficiency 75-80%, ideal for undulating sandy soils, unsuited for windy or heavy clay soils).\n2. Agronomy of Key Crops:\n- Rice (Oryza sativa): Seed rate: Direct seeded 80-100 kg/ha; Transplanted 40-50 kg/ha; Dapog method 1.5-3 kg/m² nursery (seedlings ready in 11-14 days); SRI (System of Rice Intensification) 5 kg/ha (seedlings at 8-12 days).\n- Wheat (Triticum aestivum): Seed rate 100 kg/ha (normal), 125 kg/ha (late sown); Spacing 22.5 x 5 cm; Dominant weed Phalaris minor (Canary grass, managed with Clodinafop / Sulfosulfuron).\n- Chickpea (Cicer arietinum): Desi (seed rate 65-75 kg/ha) vs Kabuli (100 kg/ha); Nipping at 30-40 DAS to promote lateral branching; susceptible to pod borer (Helicoverpa armigera).",
        keyTakeaways: [
          "Most critical stage in Wheat: Crown Root Initiation (CRI at 20-25 DAS).",
          "Dapog method in rice: Seedlings ready in 11-14 days without soil contact.",
          "SRI technique: 25 x 25 cm spacing, single young seedling (8-12 days old), 5 kg seed/ha.",
          "Canary grass (Phalaris minor): Mimic weed of wheat controlled by Sulfosulfuron.",
        ],
        ncertPointer:
          "ICAR Class XII Unit III, Agronomy of Crops, pp. 126-143.",
      },
    ],
    keyFacts: [
      {
        concept: "Crown Root Initiation (CRI)",
        formulaOrFact: "Occurs at 20-25 days after sowing (DAS) in wheat",
        explanation: "Transitional phase where seminal roots give way to permanent crown roots; moisture stress here drastically halts tillering.",
        examTip: "If only one irrigation is available for wheat, it must be applied at CRI stage.",
      },
      {
        concept: "Khaira Disease of Rice",
        formulaOrFact: "Deficiency of Zinc (Zn) | Discovered by Y.L. Nene at Pantnagar (1966)",
        explanation: "Symptoms: Chlorosis of younger leaves followed by rusty brown spots on older leaves; cured by foliar spray of 0.5% ZnSO4 + 0.25% Lime.",
        examTip: "Frequently tested mineral deficiency symptom in CUET.",
      },
      {
        concept: "Reclamation of Alkali (Sodic) Soils",
        formulaOrFact: "Application of Agricultural Gypsum (CaSO4 . 2H2O)",
        explanation: "Calcium ions replace sodium ions from clay exchange complexes, forming soluble sodium sulfate that is leached out with water.",
        examTip: "Contrast with acid soils which need lime (CaCO3).",
      },
      {
        concept: "Single Super Phosphate (SSP)",
        formulaOrFact: "16% P2O5 | 11-12% Sulfur | 19% Calcium",
        explanation: "Ideal phosphorus source for oilseeds and pulses due to its high sulfur content.",
        examTip: "CUET asks which phosphorus fertilizer contains sulfur.",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" fill="#fdfbf7" rx="12"/>
  <text x="400" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#78350f">Soil Management, Plant Nutrition &amp; Crop Agronomy</text>
  
  <!-- Problematic Soils Box -->
  <rect x="50" y="55" width="335" height="190" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-width="2"/>
  <text x="217" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#b45309">PROBLEMATIC SOILS &amp; RECLAMATION</text>

  <rect x="65" y="98" width="305" height="42" rx="6" fill="#fef3c7"/>
  <text x="75" y="116" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#92400e">Acid Soils (pH &lt; 6.5):</text>
  <text x="75" y="132" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• Al &amp; Fe toxicity, P deficiency | <tspan font-weight="bold">Reclaim:</tspan> Lime (CaCO3)</text>

  <rect x="65" y="146" width="305" height="42" rx="6" fill="#fef3c7"/>
  <text x="75" y="164" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#92400e">Saline Soils (EC &gt; 4, ESP &lt; 15, pH &lt; 8.5):</text>
  <text x="75" y="180" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• Excess soluble salts | <tspan font-weight="bold">Reclaim:</tspan> Leaching + subsurface drainage</text>

  <rect x="65" y="194" width="305" height="42" rx="6" fill="#fef3c7"/>
  <text x="75" y="212" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#92400e">Sodic / Alkali Soils (ESP &gt; 15, pH &gt; 8.5):</text>
  <text x="75" y="228" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• High exchangeable Na+ | <tspan font-weight="bold">Reclaim:</tspan> Gypsum (CaSO4.2H2O)</text>

  <!-- Fertilizers & Nutrient Box -->
  <rect x="50" y="260" width="335" height="190" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
  <text x="217" y="287" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#15803d">FERTILIZERS &amp; BIOFERTILIZERS</text>

  <rect x="65" y="300" width="305" height="65" rx="6" fill="#dcfce7"/>
  <text x="75" y="318" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#14532d">Major Chemical Fertilizers:</text>
  <text x="75" y="334" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• <tspan font-weight="bold">Urea:</tspan> 46% N (highest solid N)</text>
  <text x="75" y="348" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• <tspan font-weight="bold">DAP:</tspan> 18% N, 46% P2O5 | <tspan font-weight="bold">MOP:</tspan> 60% K2O</text>
  <text x="75" y="360" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• <tspan font-weight="bold">SSP:</tspan> 16% P2O5, 11% S, 19% Ca (Ideal for oilseeds)</text>

  <rect x="65" y="372" width="305" height="68" rx="6" fill="#dcfce7"/>
  <text x="75" y="390" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#14532d">Biofertilizers &amp; Inoculants:</text>
  <text x="75" y="406" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• <tspan font-weight="bold">Rhizobium:</tspan> Symbiotic N-fixer in pulses &amp; legumes</text>
  <text x="75" y="420" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• <tspan font-weight="bold">Azotobacter / Azospirillum:</tspan> Free-living / Associative</text>
  <text x="75" y="434" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• <tspan font-weight="bold">VAM &amp; PSB:</tspan> Phosphorus mobilization &amp; uptake</text>

  <!-- Agronomy & Water Management Box -->
  <rect x="415" y="55" width="335" height="395" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
  <text x="582" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1d4ed8">IRRIGATION &amp; CROP AGRONOMY</text>

  <!-- Wheat Agronomy -->
  <rect x="430" y="100" width="305" height="105" rx="6" fill="#dbeafe" stroke="#93c5fd" stroke-width="1.5"/>
  <text x="440" y="122" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">Wheat (Triticum aestivum):</text>
  <text x="440" y="140" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">CRI Stage (20-25 DAS):</tspan> Most critical irrigation stage</text>
  <text x="440" y="156" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Seed rate: 100 kg/ha | Spacing: 22.5 x 5 cm</text>
  <text x="440" y="172" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Mimic weed: <tspan font-weight="bold">Phalaris minor</tspan> (Gulli danda)</text>
  <text x="440" y="188" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Herbicide: Clodinafop / Sulfosulfuron</text>

  <!-- Rice Agronomy -->
  <rect x="430" y="215" width="305" height="115" rx="6" fill="#dbeafe" stroke="#93c5fd" stroke-width="1.5"/>
  <text x="440" y="236" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">Rice (Oryza sativa):</text>
  <text x="440" y="254" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Nursery: Dapog (ready in 11-14 days; 1.5-3 kg/m²)</text>
  <text x="440" y="270" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">SRI Method:</tspan> 5 kg/ha seed, single seedling at 8-12 days</text>
  <text x="440" y="286" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Water requirement: 1200-1500 mm (highest total water)</text>
  <text x="440" y="302" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Khaira Disease:</tspan> Zn deficiency (rectified with ZnSO4)</text>
  <text x="440" y="318" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Weed control: Pre-emergence Butachlor / Pretilachlor</text>

  <!-- Pressurized Irrigation -->
  <rect x="430" y="340" width="305" height="95" rx="6" fill="#dbeafe" stroke="#93c5fd" stroke-width="1.5"/>
  <text x="440" y="360" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">Modern Pressurized Irrigation:</text>
  <text x="440" y="378" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Drip (Trickle):</tspan> 90-95% efficiency, root zone drops</text>
  <text x="440" y="394" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Enables fertigation (fertilizer through drip lines)</text>
  <text x="440" y="410" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Sprinkler:</tspan> 75-80% efficiency, ideal for undulating sands</text>
  <text x="440" y="424" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Not suited for heavy winds or clay crusting</text>
</svg>`,
    workedExamples: [
      {
        id: "agriculture-unit3-we1",
        questionNumber: 1,
        question:
          "If a farmer has access to irrigation water for only ONE single irrigation throughout the entire wheat crop season, at which phenological growth stage must it be applied to avoid catastrophic yield loss?",
        options: [
          { id: "A", text: "Tillering stage" },
          { id: "B", text: "Crown Root Initiation (CRI) stage" },
          { id: "C", text: "Flowering stage" },
          { id: "D", text: "Dough / Grain filling stage" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Identify the critical growth stages of wheat: CRI (20-25 DAS), Tillering (40-45 DAS), Jointing (60-65 DAS), Flowering (80-85 DAS), Milking (100-105 DAS), Dough (115-120 DAS).",
          "Step 2: Crown Root Initiation (CRI) is universally established as the single most critical irrigation stage.",
          "Step 3: Moisture deficit at CRI irreversibly curtails crown root anchoring and tiller proliferation, causing up to 35-40% yield penalty.",
        ],
        cuetInsight:
          "The 'single irrigation priority at CRI' is one of the most repeatedly asked agronomy questions in all agricultural competitive exams.",
      },
      {
        id: "agriculture-unit3-we2",
        questionNumber: 2,
        question:
          "Which chemical amendment is specifically recommended for the chemical reclamation of sodic (alkali) soils having an ESP > 15 and pH > 8.5?",
        options: [
          { id: "A", text: "Calcium Carbonate (Agricultural Lime)" },
          { id: "B", text: "Calcium Sulfate dihydrate (Gypsum)" },
          { id: "C", text: "Sodium Chloride" },
          { id: "D", text: "Urea" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Diagnose the soil type: Sodic (alkali) soils suffer from excess exchangeable sodium on the clay complex.",
          "Step 2: Gypsum (CaSO4.2H2O) supplies soluble Ca2+ ions.",
          "Step 3: Ca2+ displaces adsorbed Na+, converting sodium clay to calcium clay and forming soluble Na2SO4 which is leached out.",
        ],
        cuetInsight:
          "Always remember: Acid soils -> Lime; Sodic/Alkali soils -> Gypsum.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Nutrient Deficiency Symptom & Disease",
        frequency: "Very High",
        typicalStem: "'Khaira' disease in rice is caused by the deficiency of which mineral nutrient?",
        strategy: "Immediately identify Zinc (Zn) deficiency, discovered by Dr. Y.L. Nene at Pantnagar.",
      },
      {
        patternType: "Fertilizer Grade Calculation & Nutrient Percentage",
        frequency: "High",
        typicalStem: "How much nitrogen is contained in a 50 kg bag of commercial Urea fertilizer?",
        strategy: "Urea is 46% N. Therefore, in 50 kg of urea: 50 x 0.46 = 23 kg of Nitrogen.",
      },
    ],
    commonTraps: [
      {
        trap: "Recommending Lime for Sodic soils.",
        whyItTraps: "Students confuse acidic and alkaline problematic soils. Lime (CaCO3) raises pH and is used for ACID soils; Gypsum (CaSO4) reduces exchangeable sodium without raising pH in SODIC soils.",
        howToAvoid: "Mnemonic: 'Acid = Lime', 'Sodic = Gypsum'.",
      },
      {
        trap: "Confusing Dapog nursery duration with conventional wet nursery in rice.",
        whyItTraps: "Conventional wet bed seedlings take 25-30 days to transplant; Dapog seedlings are ready in just 11-14 days.",
        howToAvoid: "Dapog = 11 to 14 days (fastest nursery technique, originating from Philippines).",
      },
    ],
    mnemonics: [
      {
        mnemonic: "C-R-I = Crown Roots In (21 Days)",
        meaning: "Crown Root Initiation occurs at ~21 (20-25) days after sowing in wheat.",
        application: "Never forget the exact DAS for CRI stage in wheat.",
      },
    ],
    quickRevisionCard: {
      title: "Crop Production & Soil Science High-Yield Card",
      keyPoints: [
        "Soil Composition: 45% Mineral, 5% Organic matter, 25% Water, 25% Air.",
        "Problem Soils: Acid (reclaim with Lime CaCO3); Sodic (reclaim with Gypsum CaSO4.2H2O); Saline (leach with water).",
        "17 Essential Elements: C, H, O, N, P, K, Ca, Mg, S, Fe, Mn, Zn, Cu, B, Mo, Cl, Ni (Nickel added last).",
        "Fertilizers: Urea (46% N); DAP (18% N, 46% P2O5); MOP (60% K2O); SSP (16% P2O5, 11% S, 19% Ca).",
        "Zinc Deficiency: 'Khaira' disease in rice (cured with ZnSO4 spray).",
        "Wheat Agronomy: CRI at 20-25 DAS is prime irrigation stage; weed Phalaris minor controlled by Sulfosulfuron.",
        "Rice Agronomy: Dapog seedlings ready in 11-14 days; SRI seed rate 5 kg/ha; continuous shallow submergence.",
        "Drip Irrigation: Highest water use efficiency (90-95%); enables automated fertigation.",
      ],
    },
    practiceQuestions: [
      {
        id: "agriculture-unit3-q1",
        type: "standard",
        question: "The percentage of elemental nitrogen contained in commercial technical-grade Urea fertilizer is:",
        options: [
          { id: "A", text: "20.6%" },
          { id: "B", text: "26.0%" },
          { id: "C", text: "46.0%" },
          { id: "D", text: "60.0%" },
        ],
        correctOption: "C",
        explanation: "Urea (CO(NH2)2) contains 46% Nitrogen, the highest nitrogen content among dry solid nitrogenous fertilizers.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit3-q2",
        type: "standard",
        question: "Crown Root Initiation (CRI) stage in wheat normally occurs at how many days after sowing (DAS)?",
        options: [
          { id: "A", text: "10-15 DAS" },
          { id: "B", text: "20-25 DAS" },
          { id: "C", text: "40-45 DAS" },
          { id: "D", text: "60-65 DAS" },
        ],
        correctOption: "B",
        explanation: "Crown Root Initiation (CRI) occurs 20 to 25 days after sowing and marks the critical initiation of the secondary root system in wheat.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit3-q3",
        type: "standard",
        question: "Which major crop deficiency disorder is characterized by rusty brown patches on rice leaves and is caused by the lack of Zinc?",
        options: [
          { id: "A", text: "Blast disease" },
          { id: "B", text: "Khaira disease" },
          { id: "C", text: "Tungro disease" },
          { id: "D", text: "Bacterial leaf blight" },
        ],
        correctOption: "B",
        explanation: "Khaira disease of rice is an abiotic physiological disorder resulting from zinc deficiency in calcareous or waterlogged soils.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit3-q4",
        type: "assertion-reason",
        question: "Given below are two statements:\nAssertion (A): Drip irrigation achieves the highest water use efficiency (90-95%) among all irrigation methods.\nReason (R): Water is applied directly and precisely to the plant root zone drop-by-drop at low rates, virtually eliminating surface evaporation and deep percolation losses.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Both statements are factually accurate and (R) provides the exact physiological and hydraulic mechanism explaining why drip irrigation achieves 90-95% efficiency.",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit3-q5",
        type: "match-the-following",
        question: "Match List-I (Fertilizer) with List-II (Primary Nutrient Content):\nList-I:\n(P) Urea\n(Q) DAP\n(R) MOP\n(S) Single Super Phosphate\n\nList-II:\n(1) 60% K2O\n(2) 46% N\n(3) 16% P2O5\n(4) 18% N and 46% P2O5",
        options: [
          { id: "A", text: "P-2, Q-4, R-1, S-3" },
          { id: "B", text: "P-4, Q-2, R-1, S-3" },
          { id: "C", text: "P-2, Q-1, R-4, S-3" },
          { id: "D", text: "P-3, Q-4, R-1, S-2" },
        ],
        correctOption: "A",
        explanation: "Urea = 46% N; DAP = 18% N & 46% P2O5; MOP = 60% K2O; SSP = 16% P2O5.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit3-q6",
        type: "standard",
        question: "In the 'Dapog' method of raising rice seedlings originating from the Philippines, seedlings become ready for field transplanting in how many days?",
        options: [
          { id: "A", text: "5 to 7 days" },
          { id: "B", text: "11 to 14 days" },
          { id: "C", text: "25 to 30 days" },
          { id: "D", text: "40 to 45 days" },
        ],
        correctOption: "B",
        explanation: "In the Dapog nursery raised on non-absorbent surfaces like polythene or banana leaves, seedlings draw nutrition purely from the endosperm and are ready for transplanting within 11 to 14 days.",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit3-q7",
        type: "standard",
        question: "Which of the following is an obnoxious canary grass weed that mimics wheat morphologically, posing serious control challenges?",
        options: [
          { id: "A", text: "Chenopodium album" },
          { id: "B", text: "Phalaris minor" },
          { id: "C", text: "Echinochloa crus-galli" },
          { id: "D", text: "Cyperus rotundus" },
        ],
        correctOption: "B",
        explanation: "Phalaris minor (locally known as Gulli Danda or Mandusi) is a notorious mimic weed in irrigated wheat fields.",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit3-q8",
        type: "standard",
        question: "Which symbiotic biofertilizer organism forms nitrogen-fixing root nodules exclusively in leguminous pulse crops?",
        options: [
          { id: "A", text: "Azotobacter" },
          { id: "B", text: "Rhizobium" },
          { id: "C", text: "Azospirillum" },
          { id: "D", text: "Anabaena" },
        ],
        correctOption: "B",
        explanation: "Rhizobium species form an obligate symbiotic relationship with leguminous roots, establishing bacteroid nodules containing leghemoglobin that fix atmospheric N2.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit3-q9",
        type: "standard",
        question: "The chemical compound Agricultural Gypsum used to reclaim alkali soils has the chemical formula:",
        options: [
          { id: "A", text: "CaCO3" },
          { id: "B", text: "CaSO4 . 2H2O" },
          { id: "C", text: "CaO" },
          { id: "D", text: "MgSO4 . 7H2O" },
        ],
        correctOption: "B",
        explanation: "Gypsum is hydrated calcium sulfate (CaSO4.2H2O), supplying soluble calcium to displace toxic sodium from clay exchange complexes.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit3-q10",
        type: "standard",
        question: "What is the recommended seed rate of rice under the System of Rice Intensification (SRI) technique?",
        options: [
          { id: "A", text: "5 kg/ha" },
          { id: "B", text: "25 kg/ha" },
          { id: "C", text: "50 kg/ha" },
          { id: "D", text: "100 kg/ha" },
        ],
        correctOption: "A",
        explanation: "The SRI technique utilizes only 5 kg of seed per hectare because single young seedlings (8-12 days old) are transplanted at wide square spacing (25 x 25 cm).",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["Agrometeorology, Genetics & Plant Breeding"],
      relatedTopics: ["Horticulture", "Livestock Production"],
      practiceTestId: "practice-agriculture-unit3-test1",
      practiceTestUrl: "/test/practice-agriculture-unit3-test1",
      weaknessReportUrl: "/dashboard/radar?subject=agriculture",
      weaknessRadarUrl: "/dashboard/radar?subject=agriculture",
    },
  },

  // UNIT 4
  {
    id: "agriculture-unit4-fruits-and-vegetables-production-floriculture-post-harvest-management-landscaping",
    slug: "fruits-and-vegetables-production-floriculture-post-harvest-management-landscaping",
    subject: "agriculture",
    subjectName: "Agriculture",
    subjectCode: "302",
    unitNumber: 4,
    unitTitle: "Horticulture",
    topicTitle: "Fruits and Vegetables Production, Floriculture, Post-Harvest Management, Landscaping",
    ncertReference: {
      book: "ICAR / NCERT Agriculture Class XII",
      chapter: "Unit IV: Horticulture",
      pages: "Pages 145-188",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 22,
      weightagePercentage: 25.0,
    },
    thirtySecondSummary: [
      "Horticulture encompasses Pomology (fruits), Olericulture (vegetables), Floriculture (flowers & ornamental plants), Post-Harvest Management, and Landscaping.",
      "Asexual propagation methods preserve true-to-type elite clones: Air layering / Gootee (Litchi, Guava), T-budding / Shield budding (Rose, Citrus), Inarching & Veneer grafting (Mango), and Stooling / Mound layering (Guava).",
      "Major fruit crops possess specialized agro-climatic demands: Mango (Alphonso, Dashehari, Amrapali: dwarf hybrid suited for high-density planting at 2.5 x 2.5 m), Banana (Grand Naine, Cavendish, propagated via sword suckers), Papaya (dioecious/gynodioecious, papain enzyme), and Citrus.",
      "Post-harvest physiology categorizes fruits into Climacteric (ripen post-harvest with an ethylene and respiratory burst; e.g., Mango, Banana, Papaya, Guava) and Non-Climacteric (do not ripen after harvest; e.g., Citrus, Grape, Litchi, Pomegranate).",
      "Food preservation standards mandate TSS (Total Soluble Solids) and fruit content: Jam (minimum 68% TSS, 45% fruit pulp), Jelly (minimum 65% TSS, 45% clear fruit juice, requires high pectin & acid; alcohol/sheet test), and Marmalade (citrus peel shreds).",
    ],
    coreConcepts: [
      {
        title: "Asexual Plant Propagation Techniques in Fruit Crops",
        explanation:
          "Vegetative propagation ensures genetic uniformity, earlier bearing, and dwarfing.\n1. Cuttings: Stem cuttings (Hardwood: Grape, Pomegranate; Semi-hardwood: Guava; Softwood: Tea), Root cuttings (Blackberry), Leaf cuttings (Bryophyllum, Sansevieria). Auxin IBA (Indole-3-Butyric Acid) is applied to stimulate rooting.\n2. Layering: Rooting induced while the stem remains attached to parent plant.\n- Air Layering (Gootee): A 2.5 cm bark ring is removed from a 1-year-old shoot, treated with IBA (5000 ppm), wrapped in moist sphagnum moss, and enclosed in polythene (standard commercial method in Litchi).\n- Stooling / Mound Layering: Mother plant headed back to ground level, shoots mounded with soil (commercial propagation of Guava and Apple rootstocks).\n3. Grafting & Budding:\n- Veneer & Epicotyl / Stone Grafting: Mango (Epicotyl grafting uses 8-15 day old germinating mango stones).\n- T-Budding (Shield Budding): Rose, Citrus, Ber (an active scion bud slipped into a T-shaped incision on rootstock).",
        keyTakeaways: [
          "IBA (Indole-3-Butyric Acid): Chief root-promoting hormone.",
          "Air Layering (Gootee): Standard propagation for Litchi.",
          "Epicotyl / Stone Grafting: Fast commercial propagation for Mango.",
          "T-Budding (Shield Budding): Standard for Rose and Citrus.",
        ],
        ncertPointer:
          "ICAR Class XII Unit IV, Plant Propagation section, pp. 147-158.",
      },
      {
        title: "Production Technology of Major Fruit and Vegetable Crops",
        explanation:
          "1. Mango (Mangifera indica): King of Fruits, National Fruit of India.\n- Amrapali: Hybrid (Dashehari x Neelum); distinctly dwarf, highly precocious, regular bearer; ideal for high-density planting (HDP) at 2.5 x 2.5 m accommodating 1600 plants/ha.\n- Mallika: (Neelum x Dashehari); highest Vitamin A content.\n- Disorders: Malformation (Fusarium / hormonal imbalance), Black tip (caused by SO2 and carbon monoxide gases from brick kilns near orchards; prevented by spraying 1% Borax), Spongy tissue (internal breakdown in Alphonso caused by convective heat).\n2. Banana (Musa paradisiaca): Heavy feeder, propagated by Sword Suckers weighing 500-750 g or tissue culture; commercial cultivar Grand Naine (AAA triploid).\n3. Papaya (Carica papaya): Rich source of Vitamin A and proteolytic enzyme Papain; Gynodioecious varieties (Pusa Delicious, Pusa Majesty, Solo) yield 100% productive female and hermaphrodite trees without requiring separate male pollinizer trees.\n4. Tomato (Solanum lycopersicum): Lycopene is the red pigment (maximum synthesis at 21-24°C; inhibited above 30°C); Blossom End Rot caused by Calcium (Ca) deficiency.",
        keyTakeaways: [
          "Amrapali Mango: Dwarf, suitable for High Density Planting (2.5 x 2.5 m, 1600 plants/ha).",
          "Black Tip of Mango: Caused by brick kiln fumes (SO2, CO); sprayed with 1% Borax.",
          "Papaya: Gynodioecious varieties yield only female and bisexual fruitful trees.",
          "Lycopene synthesis in tomato: Optimum at 21-24°C; stops above 30°C.",
        ],
        ncertPointer:
          "ICAR Class XII Unit IV, Fruit & Vegetable Crops, pp. 160-174.",
      },
      {
        title: "Post-Harvest Management, Fruit Preservation and Landscaping",
        explanation:
          "Post-harvest losses in fruits and vegetables in India reach 20-30% due to perishable biological nature.\n1. Climacteric vs Non-Climacteric Fruits:\n- Climacteric: Marked rise in respiration and burst of ethylene (C2H4) production during ripening; fruits can be harvested mature-green and ripened artificially (Mango, Banana, Papaya, Guava, Apple, Tomato).\n- Non-Climacteric: No post-harvest respiratory or ethylene surge; must ripen fully on the plant before harvest (Citrus, Grape, Litchi, Pomegranate, Pineapple).\n2. Preservation Standards (FSSAI / FPO):\n- Jam: Minimum 68° Brix TSS, 45% fruit pulp (tested with refractometer).\n- Jelly: Minimum 65° Brix TSS, 45% clear pectin-rich fruit extract. Pectin is essential (Guava, Sour Apple); tested by Alcohol test (clump formation) or Jelmeter. Sheet/Flake test confirms jelly endpoint at 105°C (221°F).\n- Marmalade: Citrus fruit jelly incorporating suspended shreds of citrus peel.\n- Chemical Preservatives: Sodium Benzoate (used for naturally colored products like tomato ketchup, berry juices; active as benzoic acid) vs Potassium Metabisulfite (KMS, releases SO2; used for colorless/light juices; bleached anthocyanin red pigments, so never used for red jams).\n3. Principles of Landscaping: Formal (symmetrical, Mughal gardens like Shalimar / Taj Mahal) vs Informal (asymmetrical, Japanese gardens, English landscape gardens with natural flowing curves, lawns, and rockeries).",
        keyTakeaways: [
          "Climacteric (Mango, Banana, Apple) vs Non-climacteric (Citrus, Grape, Litchi).",
          "Jam standard: 68° Brix TSS; Jelly standard: 65° Brix TSS (endpoint 105°C).",
          "KMS preservative: Releases SO2, prohibited in colored products due to bleaching.",
          "Sodium Benzoate: Preservative for colored fruit products (tomato sauce, ketchup).",
        ],
        ncertPointer:
          "ICAR Class XII Unit IV, Post-Harvest & Landscaping, pp. 176-187.",
      },
    ],
    keyFacts: [
      {
        concept: "Amrapali Mango Planting Density",
        formulaOrFact: "Spacing: 2.5 m x 2.5 m = 1600 plants per hectare",
        explanation: "Developed at IARI New Delhi; dwarf hybrid allows ultra-high density compared to traditional 10 x 10 m spacing (100 plants/ha).",
        examTip: "CUET frequently tests the spacing and parentage (Dashehari x Neelum) of Amrapali.",
      },
      {
        concept: "Jelly End-Point Tests",
        formulaOrFact: "TSS 65° Brix | Boiling Temperature: 105°C (221°F) | Sheet / Flake Test",
        explanation: "When dropped from a cold spoon, the boiling jelly forms a wide sheet rather than flowing as separate drops.",
        examTip: "Guava is the most ideal fruit for jelly making due to naturally rich pectin and acid.",
      },
      {
        concept: "Black Tip of Mango",
        formulaOrFact: "Etiology: Brick kiln fumes (SO2, CO, Ethylene) | Control: 1% Borax spray",
        explanation: "Necrosis of the fruit apex turning brownish-black, causing premature drop.",
        examTip: "Orchards should not be located within 1.5 to 2 km of operating brick kilns.",
      },
      {
        concept: "Potassium Metabisulfite (KMS)",
        formulaOrFact: "Releases active Sulfur Dioxide (SO2) gas",
        explanation: "Potent antimicrobial agent against yeast, molds, and bacteria; must never be used in dark/red-colored juices because SO2 bleaches anthocyanin pigments.",
        examTip: "Sodium Benzoate is preferred for red-colored products.",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" fill="#fdfcf7" rx="12"/>
  <text x="400" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#14532d">Horticulture: Propagation, Pomology &amp; Post-Harvest Standards</text>
  
  <!-- Asexual Propagation Column -->
  <rect x="50" y="55" width="225" height="395" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
  <text x="162" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#15803d">PROPAGATION METHODS</text>

  <rect x="62" y="100" width="201" height="75" rx="6" fill="#dcfce7"/>
  <text x="70" y="120" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#14532d">Air Layering (Gootee):</text>
  <text x="70" y="136" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• 2.5 cm bark ring removed</text>
  <text x="70" y="150" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• IBA 5000 ppm + Sphagnum moss</text>
  <text x="70" y="164" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#15803d">• Commercial in: Litchi</text>

  <rect x="62" y="185" width="201" height="75" rx="6" fill="#dcfce7"/>
  <text x="70" y="205" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#14532d">T-Budding (Shield):</text>
  <text x="70" y="221" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• Inverted T incision on rootstock</text>
  <text x="70" y="235" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• Scion eye inserted &amp; wrapped</text>
  <text x="70" y="249" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#15803d">• Commercial in: Rose &amp; Citrus</text>

  <rect x="62" y="270" width="201" height="75" rx="6" fill="#dcfce7"/>
  <text x="70" y="290" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#14532d">Epicotyl / Stone Grafting:</text>
  <text x="70" y="306" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• Uses 8-15 day old stones</text>
  <text x="70" y="320" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• Fast commercial cloning</text>
  <text x="70" y="334" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#15803d">• Commercial in: Mango</text>

  <rect x="62" y="355" width="201" height="80" rx="6" fill="#dcfce7"/>
  <text x="70" y="375" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#14532d">Stooling / Mound Layering:</text>
  <text x="70" y="391" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• Headed back to ground level</text>
  <text x="70" y="405" font-family="system-ui, sans-serif" font-size="11" fill="#166534">• Mounded with moist soil</text>
  <text x="70" y="419" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#15803d">• Commercial in: Guava &amp; Apple</text>

  <!-- Pomology Column -->
  <rect x="290" y="55" width="235" height="395" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-width="2"/>
  <text x="407" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#b45309">FRUIT CROPS (POMOLOGY)</text>

  <rect x="302" y="100" width="211" height="105" rx="6" fill="#fef3c7"/>
  <text x="310" y="120" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#92400e">Mango (Mangifera indica):</text>
  <text x="310" y="136" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• <tspan font-weight="bold">Amrapali:</tspan> 2.5x2.5 m (1600 pl/ha)</text>
  <text x="310" y="152" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• Parentage: Dashehari x Neelum</text>
  <text x="310" y="168" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• <tspan font-weight="bold">Black Tip:</tspan> Brick kiln fumes; 1% Borax</text>
  <text x="310" y="184" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• <tspan font-weight="bold">Spongy Tissue:</tspan> Alphonso heat breakdown</text>

  <rect x="302" y="215" width="211" height="105" rx="6" fill="#fef3c7"/>
  <text x="310" y="235" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#92400e">Banana &amp; Papaya:</text>
  <text x="310" y="251" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• <tspan font-weight="bold">Banana:</tspan> Sword suckers (500-750g)</text>
  <text x="310" y="267" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• Variety: Grand Naine (AAA triploid)</text>
  <text x="310" y="283" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• <tspan font-weight="bold">Papaya:</tspan> Enzyme Papain | Vitamin A</text>
  <text x="310" y="299" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• Gynodioecious varieties (100% fruitful)</text>

  <rect x="302" y="330" width="211" height="105" rx="6" fill="#fef3c7"/>
  <text x="310" y="350" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#92400e">Ripening Classification:</text>
  <text x="310" y="368" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• <tspan font-weight="bold">Climacteric:</tspan> Ethylene surge</text>
  <text x="310" y="382" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">  (Mango, Banana, Papaya, Guava)</text>
  <text x="310" y="400" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">• <tspan font-weight="bold">Non-Climacteric:</tspan> No surge</text>
  <text x="310" y="414" font-family="system-ui, sans-serif" font-size="11" fill="#78350f">  (Citrus, Grape, Litchi, Pomegranate)</text>

  <!-- Post-Harvest Column -->
  <rect x="540" y="55" width="225" height="395" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
  <text x="652" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1d4ed8">POST-HARVEST &amp; PRESERVATION</text>

  <rect x="552" y="100" width="201" height="105" rx="6" fill="#dbeafe"/>
  <text x="560" y="120" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#1e40af">Jam &amp; Jelly Standards:</text>
  <text x="560" y="138" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Jam:</tspan> Min 68% TSS, 45% pulp</text>
  <text x="560" y="154" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Jelly:</tspan> Min 65% TSS, 45% clear juice</text>
  <text x="560" y="170" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Jelly endpoint: 105°C (Sheet test)</text>
  <text x="560" y="186" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Guava is best for Jelly (high pectin)</text>

  <rect x="552" y="215" width="201" height="105" rx="6" fill="#dbeafe"/>
  <text x="560" y="235" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#1e40af">Chemical Preservatives:</text>
  <text x="560" y="253" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Sodium Benzoate:</tspan> Used for colored</text>
  <text x="560" y="267" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">  products (Tomato ketchup, sauces)</text>
  <text x="560" y="285" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Potassium Metabisulfite (KMS):</tspan></text>
  <text x="560" y="299" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">  Releases SO2; used for colorless juices</text>
  <text x="560" y="313" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">  (Bleaches red anthocyanins!)</text>

  <rect x="552" y="330" width="201" height="105" rx="6" fill="#dbeafe"/>
  <text x="560" y="350" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#1e40af">Landscaping Gardens:</text>
  <text x="560" y="368" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Formal Style:</tspan> Symmetrical balance</text>
  <text x="560" y="382" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">  (Mughal, Persian, Italian)</text>
  <text x="560" y="400" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Informal Style:</tspan> Asymmetrical curves</text>
  <text x="560" y="414" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">  (Japanese, English landscape)</text>
</svg>`,
    workedExamples: [
      {
        id: "agriculture-unit4-we1",
        questionNumber: 1,
        question:
          "Which of the following fruits is strictly classified as a 'Non-Climacteric' fruit that does NOT exhibit a post-harvest respiratory or ethylene surge and must ripen fully on the tree before harvest?",
        options: [
          { id: "A", text: "Mango" },
          { id: "B", text: "Banana" },
          { id: "C", text: "Sweet Orange (Citrus)" },
          { id: "D", text: "Papaya" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Understand climacteric vs non-climacteric fruits.",
          "Step 2: Climacteric fruits (Mango, Banana, Papaya, Guava, Apple) can be harvested at physiological maturity and ripen post-harvest accompanied by an ethylene burst.",
          "Step 3: Citrus fruits (Sweet Orange, Mandarin, Lime) alongside Grapes and Pomegranates are non-climacteric and will not ripen or sweeten once detached from the mother tree.",
        ],
        cuetInsight:
          "Climacteric vs non-climacteric fruit sorting is a very regular question in CUET Section II Agriculture.",
      },
      {
        id: "agriculture-unit4-we2",
        questionNumber: 2,
        question:
          "What is the statutory minimum Total Soluble Solids (TSS in °Brix) required for commercial 'Fruit Jam' under Food Safety and Standards Authority of India (FSSAI) regulations?",
        options: [
          { id: "A", text: "45° Brix" },
          { id: "B", text: "60° Brix" },
          { id: "C", text: "65° Brix" },
          { id: "D", text: "68° Brix" },
        ],
        correctOption: "D",
        solutionSteps: [
          "Step 1: Recall statutory TSS standards: Fruit Jam requires minimum 68% TSS (68° Brix).",
          "Step 2: (Fruit Jelly requires minimum 65% TSS / 65° Brix).",
          "Step 3: Both products require a minimum of 45% fruit pulp/juice content.",
        ],
        cuetInsight:
          "Memorize: Jam = 68° Brix, Jelly = 65° Brix.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Horticultural Disorder & Cause",
        frequency: "Very High",
        typicalStem: "Black tip disorder in mango is caused by which factor?",
        strategy: "Identify sulfur dioxide (SO2) and carbon monoxide fumes emitting from nearby brick kilns, remedied by 1% Borax spray.",
      },
      {
        patternType: "Asexual Propagation Method Match",
        frequency: "High",
        typicalStem: "Match Litchi, Rose, Mango, and Banana with Air Layering, T-Budding, Epicotyl Grafting, and Sword Suckers.",
        strategy: "Anchor your match on Litchi = Air Layering (Gootee) and Rose = T-Budding.",
      },
    ],
    commonTraps: [
      {
        trap: "Using Potassium Metabisulfite (KMS) for red-colored fruit juices.",
        whyItTraps: "KMS releases SO2 gas which permanently bleaches anthocyanin red pigments, turning red syrups and ketchups dull white.",
        howToAvoid: "Use Sodium Benzoate for naturally colored red/purple products.",
      },
      {
        trap: "Confusing Amrapali and Mallika mango traits.",
        whyItTraps: "Amrapali is Dashehari x Neelum (dwarf, high density); Mallika is Neelum x Dashehari (highest Vitamin A).",
        howToAvoid: "Amrapali = D x N (Dwarf); Mallika = N x D (Nutritious/Vit A).",
      },
    ],
    mnemonics: [
      {
        mnemonic: "J-A-M = 68 (Just A Marvel at 68 Brix)",
        meaning: "Jam requires 68° Brix TSS (while Jelly is 65° Brix).",
        application: "Quickly recall exact Brix requirement.",
      },
    ],
    quickRevisionCard: {
      title: "Horticulture & Post-Harvest Quick Recap",
      keyPoints: [
        "Propagation: Litchi (Air Layering / Gootee); Rose/Citrus (T-Budding); Mango (Epicotyl grafting); Banana (Sword suckers); Guava (Stooling).",
        "Amrapali Mango: Dashehari x Neelum; dwarf, 2.5 x 2.5 m (1600 pl/ha).",
        "Mango Disorders: Black tip (brick kiln SO2 fumes, cured with 1% Borax); Spongy tissue in Alphonso.",
        "Ripening: Climacteric (Mango, Banana, Papaya) vs Non-Climacteric (Citrus, Grape, Litchi).",
        "Preservation Standards: Jam = 68° Brix TSS; Jelly = 65° Brix TSS (boiling endpoint 105°C / sheet test).",
        "Preservatives: Sodium Benzoate (colored juices); KMS (colorless juices; releases SO2).",
        "Garden Styles: Formal (Mughal, symmetrical) vs Informal (Japanese, natural curves).",
      ],
    },
    practiceQuestions: [
      {
        id: "agriculture-unit4-q1",
        type: "standard",
        question: "Which plant growth regulator is universally used as a commercial rooting hormone for treating stem cuttings and air layers?",
        options: [
          { id: "A", text: "Gibberellic Acid (GA3)" },
          { id: "B", text: "Indole-3-Butyric Acid (IBA)" },
          { id: "C", text: "Abscisic Acid (ABA)" },
          { id: "D", text: "Ethrel / Ethephon" },
        ],
        correctOption: "B",
        explanation: "Indole-3-Butyric Acid (IBA), a synthetic auxin, is the most widely adopted rooting stimulant in vegetative propagation.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit4-q2",
        type: "standard",
        question: "The dwarf mango hybrid 'Amrapali' developed by IARI New Delhi was obtained from which parental cross?",
        options: [
          { id: "A", text: "Neelum x Dashehari" },
          { id: "B", text: "Dashehari x Neelum" },
          { id: "C", text: "Alphonso x Banganpalli" },
          { id: "D", text: "Ratna x Alphonso" },
        ],
        correctOption: "B",
        explanation: "Amrapali is a cross between Dashehari (female) and Neelum (male) [D x N], yielding dwarf trees suitable for high density planting.",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit4-q3",
        type: "standard",
        question: "Why is Potassium Metabisulfite (KMS) strictly avoided as a chemical preservative in tomato sauce, red jam, and pomegranate juice?",
        options: [
          { id: "A", text: "It is highly toxic to human health" },
          { id: "B", text: "The sulfur dioxide (SO2) gas released bleaches natural red anthocyanin pigments" },
          { id: "C", text: "It causes instant microbial crystallization" },
          { id: "D", text: "It increases acidity above legal limits" },
        ],
        correctOption: "B",
        explanation: "KMS releases SO2 which acts as a powerful reducing and bleaching agent, decolorizing natural red anthocyanin pigments.",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit4-q4",
        type: "assertion-reason",
        question: "Given below are two statements:\nAssertion (A): Guava is considered the most ideal fruit for commercial jelly preparation.\nReason (R): Slightly under-ripe guava fruits possess high natural concentrations of both pectin and acid, which are vital for establishing a firm pectin-sugar-acid gel network.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Both statements are completely true and (R) provides the exact biochemical justification for why guava produces premier quality jelly.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit4-q5",
        type: "match-the-following",
        question: "Match List-I (Fruit Crop) with List-II (Standard Commercial Propagation Method):\nList-I:\n(P) Litchi\n(Q) Rose\n(R) Banana\n(S) Mango\n\nList-II:\n(1) Sword Suckers\n(2) Air Layering (Gootee)\n(3) T-Budding (Shield)\n(4) Epicotyl / Stone Grafting",
        options: [
          { id: "A", text: "P-2, Q-3, R-1, S-4" },
          { id: "B", text: "P-3, Q-2, R-1, S-4" },
          { id: "C", text: "P-2, Q-1, R-3, S-4" },
          { id: "D", text: "P-1, Q-2, R-4, S-3" },
        ],
        correctOption: "A",
        explanation: "Litchi = Air Layering; Rose = T-Budding; Banana = Sword Suckers; Mango = Epicotyl Grafting.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit4-q6",
        type: "standard",
        question: "The boiling temperature indicating the successful completion/end-point of fruit jelly preparation is:",
        options: [
          { id: "A", text: "100°C" },
          { id: "B", text: "105°C (221°F)" },
          { id: "C", text: "115°C" },
          { id: "D", text: "120°C" },
        ],
        correctOption: "B",
        explanation: "When fruit jelly reaches a TSS of 65° Brix, the boiling temperature reaches exactly 105°C (221°F) at sea level, signaling the completion of cooking.",
        difficulty: "medium",
      },
      {
        id: "agriculture-unit4-q7",
        type: "standard",
        question: "Which physiological disorder in mango is caused by fumes of sulfur dioxide and carbon monoxide released from brick kilns located in the vicinity of orchards?",
        options: [
          { id: "A", text: "Spongy Tissue" },
          { id: "B", text: "Black Tip" },
          { id: "C", text: "Internal Necrosis" },
          { id: "D", text: "Die Back" },
        ],
        correctOption: "B",
        explanation: "Black tip disorder of mango is triggered by sulfur dioxide and carbon monoxide fumes from nearby operational brick kilns, managed by spraying 1% Borax.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit4-q8",
        type: "standard",
        question: "Which of the following is an informal, asymmetrical style of gardening that mimics raw natural countryside landscapes with flowing streams and rockeries?",
        options: [
          { id: "A", text: "Mughal Garden" },
          { id: "B", text: "Persian Garden" },
          { id: "C", text: "Japanese Garden" },
          { id: "D", text: "French Garden" },
        ],
        correctOption: "C",
        explanation: "Japanese and English landscape gardens follow the informal style of landscape architecture characterized by asymmetry, natural contours, and organic forms.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit4-q9",
        type: "standard",
        question: "The red color in ripe tomatoes is imparted by which carotenoid pigment, whose synthesis is optimal at 21-24°C?",
        options: [
          { id: "A", text: "Anthocyanin" },
          { id: "B", text: "Lycopene" },
          { id: "C", text: "Beta-carotene" },
          { id: "D", text: "Xanthophyll" },
        ],
        correctOption: "B",
        explanation: "Lycopene is the carotenoid pigment responsible for the vibrant red color of ripe tomatoes; its synthesis stops when temperatures exceed 30°C.",
        difficulty: "easy",
      },
      {
        id: "agriculture-unit4-q10",
        type: "standard",
        question: "Papaya varieties termed 'Gynodioecious' produce which types of plants in the orchard?",
        options: [
          { id: "A", text: "Male plants and female plants" },
          { id: "B", text: "Female plants and hermaphrodite (bisexual) plants" },
          { id: "C", text: "Male plants only" },
          { id: "D", text: "Sterile plants only" },
        ],
        correctOption: "B",
        explanation: "Gynodioecious papaya varieties (e.g., Pusa Delicious, Solo) produce only female and bisexual trees, ensuring that 100% of the plants bear fruit.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["Crop Production", "Plant Physiology"],
      relatedTopics: ["Post-Harvest Technology", "Agribusiness Management"],
      practiceTestId: "practice-agriculture-unit4-test1",
      practiceTestUrl: "/test/practice-agriculture-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=agriculture",
      weaknessRadarUrl: "/dashboard/radar?subject=agriculture",
    },
  },
];
