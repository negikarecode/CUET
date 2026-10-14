import { NoteDocument } from "@/types/notes";

export const historyUnits1to4Topics: NoteDocument[] = [
  // -------------------------------------------------------------------------
  // UNIT 1: Bricks, Beads and Bones - The Harappan Civilisation
  // -------------------------------------------------------------------------
  {
    id: "history_u1_t1",
    slug: "urban-planning-craft-production-subsistence-strategies-decipherment",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 1,
    unitTitle: "Harappan Civilisation and Archaeology (Bricks, Beads and Bones)",
    topicTitle: "Urban Planning, Craft Production, Subsistence Strategies, Decipherment",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part I",
      chapterNumber: 1,
      chapterName: "Bricks, Beads and Bones: The Harappan Civilisation",
      sections: [
        "1. Subsistence Strategies",
        "2. Mohenjodaro: A Planned Urban Centre",
        "3. Tracking Social Differences",
        "4. Finding Out About Craft Production",
        "5. Strategies for Procuring Materials",
        "6. Harappan Seals, Script, Weights",
        "7. An Enigmatic Script",
        "8. Ancient Authority and Decline",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in every CUET paper (4-6 questions per 50-question shift)",
      totalPyqsInRepo: 68,
      weightagePercentage: 12,
      expectedQuestions: "4-5 MCQs covering site locations, craft materials, and drainage architecture",
      typicalQuestionTypes: [
        "Match the Following (Harappan site with modern state or archaeological find)",
        "Chronological ordering of archaeological discoveries (Cunningham, Marshall, Wheeler)",
        "Assertion-Reason on urban drainage and citadel structures",
        "Statement I & II verification regarding script decipherment and subsistence",
      ],
    },
    summary30s: [
      "The Harappan (Indus Valley) Civilisation flourished c. 2600-1900 BCE (Mature Harappan phase), distinguished by standardized grid-pattern urban planning and burnt-brick drainage.",
      "Settlements were divided into a raised Western Citadel (for public/ritual functions: Great Bath, Warehouse) and a lower Eastern Town (residential quarters).",
      "Specialized craft centers included Chanhudaro (bead-making, shell-cutting, seal-making) and Lothal, utilizing carnelian, lapis lazuli (Shortughai), copper (Khetri), and steatite.",
      "The Harappan script remains undeciphered; it was written right-to-left (boustrophedon tendencies), logo-syllabic with 375-400 signs, found on seals, copper tablets, and jars.",
      "Subsistence combined domestic agriculture (wheat, barley, lentils, sesame; rice at Lothal/Rangpur) and animal husbandry, supplemented by copper and chert stone blade technology.",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "Planned Urban Layout: Citadel and Lower Town",
        explanation:
          "Mohenjodaro exemplifies Harappan urbanism. The settlement is divided into two distinct sectors: the elevated Citadel (built on mud-brick platforms, walled, housing elite/civic structures like the Great Bath and Warehouse) and the Lower Town (residential sector). Roads cut each other at right angles in a strict grid pattern. Every house had its own bathroom paved with bricks, connected through wall channels directly into street drains.",
        ncertPointer: "Themes in Indian History Part I, Section 2: 'Mohenjodaro A Planned Urban Centre'",
        examTip: "CUET frequently asks: 'The Great Bath was made watertight by setting bricks on edge and using mortar of gypsum.' Remember gypsum mortar was used for waterproofing.",
      },
      {
        id: "c2",
        title: "Craft Production and Raw Material Procurement",
        explanation:
          "Chanhudaro was an almost exclusively specialized craft production center (less than 7 hectares) focused on bead-making, shell-cutting, seal-making, and weight-making. Specialized drills were discovered at Chanhudaro, Lothal, and Dholavira. Raw materials were procured through distant trade and colonies: Lapis lazuli from Shortughai (Afghanistan); Carnelian from Bharuch (Gujarat); Steatite from South Rajasthan and North Gujarat; Copper from Khetri region of Rajasthan (Ganeshwar-Jodhpura culture) and Oman (Magan); Gold from South India (Kolar).",
        ncertPointer: "Themes in Indian History Part I, Section 4 & 5",
        examTip: "Mesopotamian texts refer to Meluhha (land of seafarers / Harappan region), Dilmun (Bahrain), and Magan (Oman).",
      },
      {
        id: "c3",
        title: "Subsistence Strategies and Agricultural Technology",
        explanation:
          "Archaeo-botanists identify wheat, barley, lentil, chickpea, and sesame. Millets are found in Gujarat sites; rice finds are rare. Animal bones include cattle, sheep, goat, buffalo, and pig (domesticated) alongside wild species (boar, deer, gharial). Agricultural technology utilized oxen for ploughing: terracotta models of the plough were found at Cholistan and Banawali (Haryana); evidence of a ploughed field with two perpendicular sets of furrows was excavated at Kalibangan (Rajasthan). Canals have been traced at Shortughai (Afghanistan), but not in Punjab or Sindh.",
        ncertPointer: "Themes in Indian History Part I, Section 1",
        examTip: "Water reservoirs carved in stone for agricultural runoff were found at Dholavira (Gujarat).",
      },
      {
        id: "c4",
        title: "The Undeciphered Script, Weights, and Social Structure",
        explanation:
          "The Harappan script has 375 to 400 distinct signs and is non-alphabetical (logo-syllabic). It was written right-to-left, proven by wide spacing on the right and cramping on the left of seal edges. Weights followed a binary system at lower denominations (1, 2, 4, 8, 16, 32 up to 12,800) and decimal system for higher denominations. Cubical chert weights had no markings. Regarding governance, theories range from a single ruler ('Priest-King' statue of Mohenjodaro) to equal multiple states or community consensus, though a centralized single state best explains standardized brick ratios (1:2:4) across hundreds of miles.",
        ncertPointer: "Themes in Indian History Part I, Section 6 & 7",
        examTip: "Standard brick ratio throughout the Mature Harappan culture was 1 : 2 : 4 (Thickness : Breadth : Length).",
      },
    ],
    keyFormulas: [
      {
        name: "Standard Harappan Brick Dimension Ratio",
        formula: "\\text{Thickness} : \\text{Breadth} : \\text{Length} = 1 : 2 : 4",
        symbols: "Standardized across all settlements from Mohenjodaro to Kalibangan",
        siUnits: "Ratio (Dimensionless)",
        whenToUse: "Direct statement / MCQ questions on architectural standardization.",
      },
      {
        name: "Harappan Weight System Ratio",
        formula: "\\text{Lower Denominations}: 1 : 2 : 4 : 8 : 16 : 32 \\dots (\\text{Binary}) \\quad | \\quad \\text{Higher}: \\text{Decimal}",
        symbols: "Unit 16 = 13.71 grams approx. Made of stone called chert.",
        siUnits: "Binary & Decimal",
        whenToUse: "CUET questions on economic exchange and precision measurements.",
      },
      {
        name: "Key Archaeological Discoveries Timeline",
        formula: "1875 (\\text{Cunningham Report}) \\rightarrow 1921 (\\text{Sahni at Harappa}) \\rightarrow 1922 (\\text{Banerjee at Mohenjodaro}) \\rightarrow 1924 (\\text{Marshall announces IVC}) \\rightarrow 1944 (\\text{Wheeler})",
        symbols: "Daya Ram Sahni, Rakhaldas Banerjee, Sir John Marshall, R.E.M. Wheeler",
        siUnits: "Chronology",
        whenToUse: "Chronological sequence questions on Harappan historiography.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Harappan Urban Layout & Citadel-Lower Town Architecture",
      caption: "Schematic representation of Mohenjodaro: Citadel (Western) vs Lower Town (Eastern) with grid street network and drainage flow",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">MOHENJODARO URBAN SCHEMATIC &amp; ARTIFACT PROVENANCE</text>

  <!-- Citadel Area -->
  <rect x="50" y="60" width="280" height="320" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="190" y="85" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">WESTERN CITADEL (Elevated)</text>
  <rect x="75" y="105" width="230" height="110" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="4" />
  <text x="190" y="130" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="bold">THE GREAT BATH</text>
  <text x="190" y="150" textAnchor="middle" fill="#0369a1" fontSize="10">Watertight: Gypsum Mortar</text>
  <text x="190" y="165" textAnchor="middle" fill="#0369a1" fontSize="10">Corridors on 4 sides, steps N &amp; S</text>
  <text x="190" y="180" textAnchor="middle" fill="#0369a1" fontSize="10">8 Bathrooms in northern wing</text>
  <rect x="75" y="230" width="230" height="60" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" rx="4" />
  <text x="190" y="255" textAnchor="middle" fill="#9d174d" fontSize="12" fontWeight="bold">GRANARY / WAREHOUSE</text>
  <text x="190" y="272" textAnchor="middle" fill="#9d174d" fontSize="10">Massive brick base with wooden superstructure</text>
  <text x="190" y="355" textAnchor="middle" fill="#78350f" fontSize="11" fontStyle="italic">Function: Public Rituals &amp; Civic Administration</text>

  <!-- Lower Town Area -->
  <rect x="370" y="60" width="380" height="320" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" rx="6" />
  <text x="560" y="85" textAnchor="middle" fill="#166534" fontSize="14" fontWeight="bold">LOWER TOWN (Residential Sector)</text>

  <!-- Grid streets -->
  <line x1="390" y1="160" x2="730" y2="160" stroke="#94a3b8" strokeWidth="5" />
  <line x1="390" y1="240" x2="730" y2="240" stroke="#94a3b8" strokeWidth="5" />
  <line x1="480" y1="100" x2="480" y2="340" stroke="#94a3b8" strokeWidth="5" />
  <line x1="620" y1="100" x2="620" y2="340" stroke="#94a3b8" strokeWidth="5" />

  <text x="560" y="130" textAnchor="middle" fill="#334155" fontSize="11">Courtyard-centric Houses (No street-facing windows)</text>
  <text x="435" y="205" textAnchor="middle" fill="#334155" fontSize="10">Private Wells (~700)</text>
  <text x="550" y="205" textAnchor="middle" fill="#334155" fontSize="10">Grid Pattern (90° Intersect)</text>
  <text x="675" y="205" textAnchor="middle" fill="#334155" fontSize="10">Covered Street Drains</text>

  <!-- Drainage Flow Arrow -->
  <rect x="390" y="290" width="340" height="35" fill="#e2e8f0" rx="4" />
  <text x="560" y="312" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Brick Drains with Sump Pits &amp; Limestone Cleaning Slabs</text>
  <text x="400" y="405" textAnchor="middle" fill="#64748b" fontSize="11">Standard Brick Ratio: 1 (Thickness) : 2 (Width) : 4 (Length)</text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">MOHENJODARO URBAN SCHEMATIC &amp; ARTIFACT PROVENANCE</text>
  <rect x="50" y="60" width="280" height="320" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="190" y="85" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">WESTERN CITADEL (Elevated)</text>
  <rect x="75" y="105" width="230" height="110" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="4" />
  <text x="190" y="130" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="bold">THE GREAT BATH</text>
  <text x="190" y="150" textAnchor="middle" fill="#0369a1" fontSize="10">Watertight: Gypsum Mortar</text>
  <rect x="75" y="230" width="230" height="60" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" rx="4" />
  <text x="190" y="255" textAnchor="middle" fill="#9d174d" fontSize="12" fontWeight="bold">GRANARY / WAREHOUSE</text>
  <rect x="370" y="60" width="380" height="320" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" rx="6" />
  <text x="560" y="85" textAnchor="middle" fill="#166534" fontSize="14" fontWeight="bold">LOWER TOWN (Residential Sector)</text>
  <line x1="390" y1="160" x2="730" y2="160" stroke="#94a3b8" strokeWidth="5" />
  <line x1="390" y1="240" x2="730" y2="240" stroke="#94a3b8" strokeWidth="5" />
  <line x1="480" y1="100" x2="480" y2="340" stroke="#94a3b8" strokeWidth="5" />
  <line x1="620" y1="100" x2="620" y2="340" stroke="#94a3b8" strokeWidth="5" />
  <text x="560" y="130" textAnchor="middle" fill="#334155" fontSize="11">Courtyard-centric Houses (No street-facing windows)</text>
  <rect x="390" y="290" width="340" height="35" fill="#e2e8f0" rx="4" />
  <text x="560" y="312" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Brick Drains with Sump Pits &amp; Limestone Cleaning Slabs</text>
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "Match List-I (Harappan Sites) with List-II (Specialized Evidence / Discoveries):\nList-I:\n(A) Kalibangan\n(B) Shortughai\n(C) Chanhudaro\n(D) Dholavira\n\nList-II:\n1. Traces of canals\n2. Water reservoirs\n3. Ploughed field surface with two furrow grids\n4. Exclusive craft production and bead factory",
        options: [
          { id: "A", text: "A-3, B-1, C-4, D-2" },
          { id: "B", text: "A-2, B-4, C-1, D-3" },
          { id: "C", text: "A-3, B-4, C-1, D-2" },
          { id: "D", text: "A-1, B-3, C-4, D-2" },
        ],
        correctOption: "A",
        explanation:
          "Kalibangan shows the earliest ploughed field (two sets of furrows at right angles, suggesting two crops grown together). Shortughai in Afghanistan has evidence of irrigation canals. Chanhudaro was dedicated almost entirely to craft production (bead-making). Dholavira features elaborate stone-cut water harvesting reservoirs.",
        solutionStepByStep: [
          "Step 1: Identify Kalibangan -> ploughed field evidence (Pair A with 3).",
          "Step 2: Identify Shortughai in Afghanistan -> traces of canals found in rocky/semi-arid terrain (Pair B with 1).",
          "Step 3: Identify Chanhudaro -> bead-making workshops and drills (Pair C with 4).",
          "Step 4: Identify Dholavira -> monumental water reservoirs (Pair D with 2).",
          "Conclusion: Option A (A-3, B-1, C-4, D-2) is correct.",
        ],
        cuetPattern: "Match-the-following site association is the single most recurring question format in CUET History Theme 1.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): Harappan domestic architecture demonstrated an extraordinary concern for individual privacy.\nReason (R): Houses in Mohenjodaro had no windows in the walls along the ground level, and the main entrance did not give a direct view of the interior or courtyard.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation:
          "According to NCERT Theme 1 Section 2, residential buildings in the Lower Town centered on a courtyard. There were no windows in walls at ground level to prevent outsiders from peeking, and doorways were positioned so as not to afford direct visual access to inner courtyards. Thus (R) directly explains (A).",
        solutionStepByStep: [
          "Step 1: Evaluate Assertion (A): True. NCERT states explicitly that privacy was a marked feature of Harappan homes.",
          "Step 2: Evaluate Reason (R): True. Wall construction omitted ground-level windows, and entrances were angled.",
          "Step 3: Establish causal link: The absence of windows and indirect entryway were intentional architectural mechanisms designed to guarantee privacy.",
          "Conclusion: Both are true and (R) correctly explains (A). Option A is correct.",
        ],
        cuetPattern: "CUET assertion-reason questions frequently test subtle NCERT architectural and societal observations.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Archaeological Excavator & Discovery Chronology",
        frequency: "High (Appeared in 2022, 2023, 2024)",
        typicalStem: "Arrange the following archaeologists in chronological order of their work on Harappa: (i) R.E.M. Wheeler, (ii) Alexander Cunningham, (iii) John Marshall, (iv) Daya Ram Sahni.",
        strategy: "Memorize: Cunningham (1875) -> Sahni (1921) -> Marshall (1924 announcement) -> Wheeler (1944 Director General of ASI).",
      },
      {
        patternType: "Raw Material & Provenance Association",
        frequency: "Very High (Appeared in multiple shifts)",
        typicalStem: "Which of the following regions was called 'Meluhha' in Mesopotamian texts?",
        strategy: "Meluhha = Harappan region; Magan = Oman (source of copper); Dilmun = Bahrain island.",
      },
    ],
    commonTraps: [
      {
        misconception: "Students often assume canals were excavated in Harappa and Mohenjodaro (Punjab and Sindh).",
        correctConcept: "Canals were only found at Shortughai (Afghanistan). In Punjab and Sindh, irrigation was primarily drawn from wells.",
        whyTrapWorks: "Options list Punjab or Sindh alongside Shortughai, causing confusion due to the proximity of Indus river tributaries.",
        cuetWarning: "Always pick Shortughai for canal traces; pick Dholavira for reservoirs.",
      },
      {
        misconception: "Believing iron tools were used in Mature Harappan craft and agriculture.",
        correctConcept: "Harappans were in the Bronze Age. Iron was completely unknown to Harappans; it appeared in India c. 1000 BCE.",
        whyTrapWorks: "Questions ask 'Which of the following metals was NOT known to the Harappans?' and options include Copper, Bronze, Gold, and Iron.",
        cuetWarning: "Iron is ALWAYS the correct answer for metals unknown to Harappans.",
      },
    ],
    mnemonics: [
      {
        title: "Materials & Their Provenance (L-S, C-B, C-K, G-K)",
        mnemonic: "Lazy Students Cooked Beans, Canines Kept Gold Knives",
        expansion: "Lapis = Shortughai; Carnelian = Bharuch; Copper = Khetri; Gold = Kolar",
        context: "Helps immediately solve raw material matching questions in CUET.",
      },
    ],
    quickRevisionCard: {
      title: "Harappan Civilisation Rapid Revision Sheet",
      bulletPoints: [
        "Mature Harappan Span: 2600 BCE to 1900 BCE; marked by standardized seals, weights, and burnt bricks.",
        "Citadel vs Lower Town: Citadel on high mud-brick platforms; Great Bath sealed with gypsum mortar.",
        "Ploughed Field: Kalibangan (Rajasthan) with perpendicular furrows for mixed cropping.",
        "Canals: Shortughai (Afghanistan); Water Reservoirs: Dholavira (Gujarat).",
        "Craft Hub: Chanhudaro (<7 hectares); specialized drills found at Chanhudaro, Lothal, Dholavira.",
        "Script: Logo-syllabic, ~375-400 signs, written Right to Left; remains undeciphered.",
        "Weights: Chert cubical weights; binary system (1 to 12800) and decimal system for high weights.",
        "Metals Known: Copper, Bronze, Gold, Silver; IRON WAS COMPLETELY UNKNOWN.",
        "Mesopotamian Terms: Meluhha (Harappa), Magan (Oman), Dilmun (Bahrain).",
        "Archaeologists: Cunningham (1875 report), Daya Ram Sahni (1921), Rakhal Das Banerjee (1922), Sir John Marshall (1924 IVC announcement), R.E.M. Wheeler (1944 stratigraphy).",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u1_q1",
        questionNumber: 1,
        question: "Terracotta models of the plough have been discovered by archaeologists at which of the following Harappan sites?",
        options: [
          { id: "A", text: "Cholistan and Banawali" },
          { id: "B", text: "Kalibangan and Lothal" },
          { id: "C", text: "Harappa and Mohenjodaro" },
          { id: "D", text: "Shortughai and Sutkagen Dor" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "According to NCERT Theme 1, terracotta models of the plough have been found at sites in Cholistan and at Banawali (Haryana).",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u1_q2",
        questionNumber: 2,
        question: "Which of the following materials was used to make the Great Bath at Mohenjodaro watertight?",
        options: [
          { id: "A", text: "Bitumen alone" },
          { id: "B", text: "Mortar of gypsum" },
          { id: "C", text: "Lime plaster and mud" },
          { id: "D", text: "Glazed ceramic tiling" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The Great Bath was made watertight by setting bricks on edge and using a mortar of gypsum (Themes in Indian History Part I, p. 7).",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u1_q3",
        questionNumber: 3,
        question: "Consider the following statements regarding Harappan weights:\nI. The lower denominations of weights were binary (1, 2, 4, 8, 16, 32).\nII. The higher denominations followed the decimal system.\nIII. Weights were made of a stone called steatite and were generally spherical.\nWhich of the above statements are correct?",
        options: [
          { id: "A", text: "I and II only" },
          { id: "B", text: "II and III only" },
          { id: "C", text: "I and III only" },
          { id: "D", text: "I, II and III" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Statements I and II are correct. Statement III is incorrect because weights were made of chert (not steatite) and were cubical (not spherical) with no markings.",
        questionType: "Multi-Statement Analysis",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u1_q4",
        questionNumber: 4,
        question: "Match the raw material in List-I with its Harappan procurement location in List-II:\nList-I:\n(A) Copper\n(B) Lapis Lazuli\n(C) Carnelian\n(D) Gold\n\nList-II:\n1. South India (Kolar)\n2. Khetri region of Rajasthan\n3. Shortughai (Afghanistan)\n4. Bharuch (Gujarat)",
        options: [
          { id: "A", text: "A-2, B-3, C-4, D-1" },
          { id: "B", text: "A-3, B-2, C-1, D-4" },
          { id: "C", text: "A-2, B-4, C-3, D-1" },
          { id: "D", text: "A-1, B-3, C-4, D-2" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Copper came from Khetri (Rajasthan) and Oman; Lapis Lazuli from Shortughai; Carnelian from Bharuch; Gold from South India.",
        questionType: "Match The Following",
        type: "match-the-following",
        difficulty: "medium",
      },
      {
        id: "history_u1_q5",
        questionNumber: 5,
        question: "Which of the following Director Generals of the Archaeological Survey of India (ASI) brought military precision and stratigraphy techniques to Harappan excavations in 1944?",
        options: [
          { id: "A", text: "Alexander Cunningham" },
          { id: "B", text: "John Marshall" },
          { id: "C", text: "R.E.M. Wheeler" },
          { id: "D", text: "James Burgess" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "R.E.M. Wheeler took over as Director-General of the ASI in 1944 and recognized that it was necessary to follow the stratigraphy of the mound rather than dig horizontally along mechanical levels.",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u1_q6",
        questionNumber: 6,
        question: "Given below are two statements:\nStatement I: The Harappan script was written from right to left.\nStatement II: Some Harappan seals show wider spacing on the left and cramping on the right, proving scribes started on the left.",
        options: [
          { id: "A", text: "Both Statement I and Statement II are true" },
          { id: "B", text: "Both Statement I and Statement II are false" },
          { id: "C", text: "Statement I is true but Statement II is false" },
          { id: "D", text: "Statement I is false but Statement II is true" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "Statement I is true. Statement II is false because the seals show wider spacing on the right and cramping on the left, proving the scribe started typing from right to left and ran out of space on the left.",
        questionType: "Statement Evaluation",
        type: "standard",
        difficulty: "hard",
      },
      {
        id: "history_u1_q7",
        questionNumber: 7,
        question: "Specialized drills used in Harappan bead-making have been excavated at which of the following sets of sites?",
        options: [
          { id: "A", text: "Harappa, Mohenjodaro, and Rakhigarhi" },
          { id: "B", text: "Chanhudaro, Lothal, and Dholavira" },
          { id: "C", text: "Kalibangan, Banawali, and Ropar" },
          { id: "D", text: "Shortughai, Sutkagen Dor, and Balakot" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "NCERT Theme 1 explicitly states: 'Specialised drills have been found at Chanhudaro, Lothal and more recently at Dholavira.'",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u1_q8",
        questionNumber: 8,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): Cunningham, the first Director-General of the ASI, missed the historical significance of Harappa.\nReason (R): Cunningham used accounts left by 4th-7th century CE Chinese Buddhist pilgrims to locate early historic settlements, mistakenly believing Indian history began with the Ganga valley cities.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Cunningham's main interest was the archaeology of the Early Historic (c. 6th century BCE to 4th century CE) period. Because Harappa was not part of the itinerary of the Chinese pilgrims and did not fit his historical framework, he failed to realize how old it was.",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "hard",
      },
      {
        id: "history_u1_q9",
        questionNumber: 9,
        question: "At which of the following Harappan coastal sites were specialized shell-working industries located for making bangles, ladles, and inlays?",
        options: [
          { id: "A", text: "Nageshwar and Balakot" },
          { id: "B", text: "Lothal and Kalibangan" },
          { id: "C", text: "Banawali and Rakhigarhi" },
          { id: "D", text: "Shortughai and Chanhudaro" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Nageshwar and Balakot were settlements located near the sea coast, specialized for making shell objects like bangles, ladles, and inlays.",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u1_q10",
        questionNumber: 10,
        question: "What was the characteristic feature of Harappan burials in terms of social differentiation?",
        options: [
          { id: "A", text: "Massive deposits of gold and platinum were buried with kings in pyramidal mounds" },
          { id: "B", text: "Burials generally contained pottery and ornaments, reflecting a belief in an afterlife, but without lavish wealth" },
          { id: "C", text: "Complete cremation was universal; no skeletons have survived in burial pits" },
          { id: "D", text: "Only women were buried with jewellery; men were buried without any grave goods" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Harappan burials were in pits containing pottery and simple ornaments (copper mirrors, shell rings). Harappans generally did not believe in burying precious things with the dead, unlike Egyptian Pharaohs.",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: [
        { title: "16 Mahajanapadas and Mauryan Empire", topicId: "history_u2_t1", slug: "16-mahajanapadas-mauryan-empire-epigraphy-inscriptional-evidences" },
      ],
      practiceTestId: "practice-history-unit1-test1",
      practiceTestUrl: "/test/practice-history-unit1-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 2: Kings, Farmers and Towns - Early States and Economies
  // -------------------------------------------------------------------------
  {
    id: "history_u2_t1",
    slug: "16-mahajanapadas-mauryan-empire-epigraphy-inscriptional-evidences",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 2,
    unitTitle: "Political and Economic Systems in Early States (Kings, Farmers and Towns)",
    topicTitle: "16 Mahajanapadas, Mauryan Empire, Epigraphy, Inscriptional Evidences",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part I",
      chapterNumber: 2,
      chapterName: "Kings, Farmers and Towns: Early States and Economies (c. 600 BCE - 600 CE)",
      sections: [
        "1. Prinsep and Piyadassi",
        "2. The Earliest States: 16 Mahajanapadas",
        "3. An Early Empire: The Mauryan Empire",
        "4. New Notions of Kingship: Kushanas and Guptas",
        "5. A Changing Countryside: Popular Perceptions & Land Grants",
        "6. Towns and Trade: Coins, Guilds and Urban Centres",
        "7. How Are Inscriptions Deciphered?",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely High (5-7 questions per shift in CUET History)",
      totalPyqsInRepo: 74,
      weightagePercentage: 14,
      expectedQuestions: "5 MCQs on James Prinsep, Ashokan inscriptions, 16 Mahajanapadas, and Megasthenes' account",
      typicalQuestionTypes: [
        "Match the Following (Mahajanapada with ancient capital city)",
        "Chronological ordering of Mauryan rulers and Gupta inscriptions",
        "Direct MCQs on Prinsep deciphering Brahmi/Kharosthi (1837-38)",
        "Assertion-Reason on land grants (Agrahara) and Prabhavati Gupta's inscription",
      ],
    },
    summary30s: [
      "The sixth century BCE is a major turning point in early Indian history: emergence of early states (16 Mahajanapadas), growing use of iron, coinage, and urban centers along the Ganga.",
      "Magadha became the most powerful Mahajanapada due to iron mines (Jharkhand), fertile Gangetic soil, elephant reserves in forests, and strategic capitals (Rajagriha, then Pataliputra).",
      "Chandragupta Maurya founded the Mauryan Empire (c. 321 BCE). Ashoka (c. 272/268-231 BCE) was the first ruler to inscribe messages on stone surfaces and rocks in Prakrit, Aramaic, and Greek.",
      "James Prinsep deciphered Brahmi and Kharosthi scripts in 1838, linking the title 'Devanampiya Piyadassi' (Beloved of the Gods) to Ashoka.",
      "The Guptas (c. 4th century CE) fostered Prashastis like Harishena's Prayaga Prashasti (Allahabad Pillar) in Sanskrit, praising Samudragupta as a warrior-deity.",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "James Prinsep's Epigraphic Breakthrough (1838)",
        explanation:
          "James Prinsep, an officer in the mint of the British East India Company, deciphered Brahmi and Kharosthi in 1838. These were the two scripts used in the earliest inscriptions and coins. Prinsep discovered that most inscriptions mentioned a king referred to as 'Piyadassi' (pleasant to behold); a few also mentioned King Asoka. This breakthrough provided the epigraphic foundation for reconstructing the political timeline of early India.",
        ncertPointer: "Themes in Indian History Part I, Section 1: 'Prinsep and Piyadassi'",
        examTip: "Brahmi was deciphered by matching Ashokan letters with modern Devanagari (consonant ka, etc.). Kharosthi was deciphered using bilingual coins of Indo-Greek kings bearing Greek and Kharosthi names.",
      },
      {
        id: "c2",
        title: "The 16 Mahajanapadas and the Rise of Magadha",
        explanation:
          "Buddhist and Jaina texts (Anguttara Nikaya, Bhagavati Sutra) list 16 great states (Mahajanapadas). While most were monarchies ruled by a king, some were oligarchies known as Ganas or Sanghas (e.g., Vajji sangha), where power was shared among a group of rajas. Between the 6th and 4th centuries BCE, Magadha (modern Bihar) became the paramount Mahajanapada. Factors behind its supremacy: agricultural productivity of the Ganga basin, accessibility to rich iron ore deposits in Jharkhand for weapons, elephants in nearby forests for armies, and the Ganga and Son rivers offering cheap water transport.",
        ncertPointer: "Themes in Indian History Part I, Section 2",
        examTip: "Rajagriha (House of the King, fortified surrounded by hills) was the initial capital; later in the 4th century BCE, the capital was shifted to Pataliputra (Patna) along riverine routes.",
      },
      {
        id: "c3",
        title: "Mauryan Administration and Ashokan Dhamma",
        explanation:
          "Megasthenes (Greek ambassador to Chandragupta's court) and Kautilya's Arthashastra describe Mauryan administrative architecture. Megasthenes mentions a committee with 6 subcommittees for coordinating military activities: Navy, Transport & Provisions, Foot-soldiers, Horses, Chariots, and Elephants. Five major political centers: Taxila, Ujjayini, Tosali, Suvarnagiri (golden mountain in Karnataka), and Pataliputra. Ashoka inscribed Dhamma across rock edicts: respect to elders, generosity to Brahmanas and ascetics, kind treatment of slaves/servants, and religious tolerance.",
        ncertPointer: "Themes in Indian History Part I, Section 3",
        examTip: "Special officers appointed by Ashoka to propagate and monitor Dhamma were designated as 'Dhamma Mahamatta'.",
      },
      {
        id: "c4",
        title: "Divine Kingship, Land Grants, and Inscriptional Limitations",
        explanation:
          "Kushana rulers (1st century BCE - 1st century CE) claimed divine status, taking titles like 'Devaputra' (son of god) influenced by Chinese rulers, and installing colossal statues at Mat near Mathura and in Afghanistan. In Gupta times, Prashastis (e.g., Prayaga Prashasti composed by court poet Harishena in ornate kavya Sanskrit) deified kings. Land grants (Agrahara grants to Brahmanas, exempt from tax) proliferated from 1st millennium CE. Prabhavati Gupta, daughter of Chandragupta II and Vakataka queen, had access to land and issued a copperplate grant at Danguna village, an exception to customary legal norms against women owning land.",
        ncertPointer: "Themes in Indian History Part I, Sections 4, 5, 7",
        examTip: "Epigraphy has technical limitations: faint letters, missing letters, damaged inscriptions, and elite political bias omitting daily lives of peasants and marginalized groups.",
      },
    ],
    keyFormulas: [
      {
        name: "Epigraphic Decipherment Formula",
        formula: "\\text{Indo-Greek Bilingual Coins} \\xrightarrow{\\text{Greek Match}} \\text{Kharosthi Decipherment}; \\quad \\text{Ashokan Inscriptions} \\xrightarrow{\\text{Devanagari Comparison}} \\text{Brahmi (1838)}",
        symbols: "James Prinsep: 1838. Unlocked names like Eucratides, Menander, and Ashoka Piyadassi.",
        siUnits: "Epigraphic Methodology",
        whenToUse: "Questions asking how Kharosthi and Brahmi scripts were respectively deciphered.",
      },
      {
        name: "Six Military Subcommittees of Megasthenes",
        formula: "\\text{Subcommittee}: \\{ 1: \\text{Navy}, 2: \\text{Transport/Provisions}, 3: \\text{Infantry}, 4: \\text{Cavalry}, 5: \\text{Chariots}, 6: \\text{Elephants} \\}",
        symbols: "6 committees of 5 members each (Megasthenes Indika)",
        siUnits: "Military Structure",
        whenToUse: "CUET questions on Mauryan administration and subcommittees.",
      },
      {
        name: "16 Mahajanapadas Canonical Roster",
        formula: "\\text{Key States}: \\text{Magadha (Pataliputra)}, \\text{Vajji (Vaishali)}, \\text{Kashi (Varanasi)}, \\text{Kosala (Shravasti)}, \\text{Avanti (Ujjayini)}, \\text{Gandhara (Taxila)}",
        symbols: "Total 16 listed in Anguttara Nikaya",
        siUnits: "Geographical Taxonomy",
        whenToUse: "Match the following state with capital.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Mauryan Administrative Centers & Epigraphic Distribution",
      caption: "Major provincial centers (Taxila, Ujjayini, Tosali, Suvarnagiri) and the central authority at Pataliputra",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">MAURYAN EMPIRE: FIVE PRINCIPAL POLITICAL CENTRES</text>

  <!-- Central Hub -->
  <circle cx="400" cy="180" r="65" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
  <text x="400" y="175" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">PATALIPUTRA</text>
  <text x="400" y="195" textAnchor="middle" fill="#92400e" fontSize="11">(Imperial Capital)</text>

  <!-- 4 Provincial Nodes -->
  <!-- North: Taxila -->
  <rect x="70" y="70" width="160" height="70" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="6" />
  <text x="150" y="95" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">TAXILA (North-West)</text>
  <text x="150" y="115" textAnchor="middle" fill="#0369a1" fontSize="10">Long-distance trade route</text>
  <line x1="230" y1="105" x2="340" y2="155" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 4" />

  <!-- West: Ujjayini -->
  <rect x="70" y="270" width="160" height="70" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" rx="6" />
  <text x="150" y="295" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">UJJAYINI (West)</text>
  <text x="150" y="315" textAnchor="middle" fill="#166534" fontSize="10">Crucial trade crossroads</text>
  <line x1="230" y1="295" x2="345" y2="210" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 4" />

  <!-- East: Tosali -->
  <rect x="570" y="70" width="160" height="70" fill="#fce7f3" stroke="#db2777" strokeWidth="2" rx="6" />
  <text x="650" y="95" textAnchor="middle" fill="#9d174d" fontSize="13" fontWeight="bold">TOSALI (East - Kalinga)</text>
  <text x="650" y="115" textAnchor="middle" fill="#9d174d" fontSize="10">Coastal maritime gate</text>
  <line x1="570" y1="105" x2="460" y2="155" stroke="#db2777" strokeWidth="2" strokeDasharray="4 4" />

  <!-- South: Suvarnagiri -->
  <rect x="570" y="270" width="160" height="70" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" rx="6" />
  <text x="650" y="295" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">SUVARNAGIRI (South)</text>
  <text x="650" y="315" textAnchor="middle" fill="#854d0e" fontSize="10">"Golden Mountain" (Kolar)</text>
  <line x1="570" y1="295" x2="455" y2="210" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 4" />

  <!-- Bottom Infobox -->
  <rect x="50" y="365" width="700" height="35" fill="#f1f5f9" rx="4" />
  <text x="400" y="387" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
    Megasthenes: 1 Coordinating Committee + 6 Subcommittees (Navy, Transport, Infantry, Cavalry, Chariots, Elephants)
  </text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">MAURYAN EMPIRE: FIVE PRINCIPAL POLITICAL CENTRES</text>
  <circle cx="400" cy="180" r="65" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
  <text x="400" y="175" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">PATALIPUTRA</text>
  <rect x="70" y="70" width="160" height="70" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="6" />
  <text x="150" y="95" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">TAXILA (North-West)</text>
  <rect x="70" y="270" width="160" height="70" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" rx="6" />
  <text x="150" y="295" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">UJJAYINI (West)</text>
  <rect x="570" y="70" width="160" height="70" fill="#fce7f3" stroke="#db2777" strokeWidth="2" rx="6" />
  <text x="650" y="95" textAnchor="middle" fill="#9d174d" fontSize="13" fontWeight="bold">TOSALI (East - Kalinga)</text>
  <rect x="570" y="270" width="160" height="70" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" rx="6" />
  <text x="650" y="295" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">SUVARNAGIRI (South)</text>
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "Which of the following statements about the Prayaga Prashasti is NOT correct?\n(A) It was composed by Harishena, the court poet of Samudragupta.\n(B) It was inscribed on the pillar at Allahabad in Sanskrit verse and prose.\n(C) It describes Samudragupta as equal to deities such as Kubera, Varuna, Indra, and Yama.\n(D) It was originally composed during the reign of Chandragupta Maurya in Prakrit.",
        options: [
          { id: "A", text: "Statement (A)" },
          { id: "B", text: "Statement (B)" },
          { id: "C", text: "Statement (C)" },
          { id: "D", text: "Statement (D)" },
        ],
        correctOption: "D",
        explanation:
          "The Prayaga Prashasti (also known as the Allahabad Pillar Inscription) was composed in classical Sanskrit by Harishena during the 4th century CE for the Gupta ruler Samudragupta, NOT during the reign of Chandragupta Maurya. Hence statement (D) is incorrect.",
        solutionStepByStep: [
          "Step 1: Check author and patron: Harishena, court poet of Samudragupta (Gupta dynasty) -> (A) is correct.",
          "Step 2: Check language and medium: Sanskrit, inscribed on the Ashokan pillar at Allahabad -> (B) is correct.",
          "Step 3: Check poetic imagery: Samudragupta is depicted as Purusha (Supreme Being), equal to the gods Kubera, Varuna, Indra, and Yama -> (C) is correct.",
          "Step 4: Statement (D) attributes it to Chandragupta Maurya in Prakrit, which is completely false.",
          "Conclusion: Option D is the incorrect statement.",
        ],
        cuetPattern: "CUET often tests historical Prashastis by mixing up dynasty, patron king, and court poet.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "Arrange the following ancient capitals of Magadha in chronological order of their establishment:\n(i) Pataliputra\n(ii) Rajagriha",
        options: [
          { id: "A", text: "(ii) followed by (i)" },
          { id: "B", text: "(i) followed by (ii)" },
          { id: "C", text: "Both were established simultaneously" },
          { id: "D", text: "Neither was a capital of Magadha" },
        ],
        correctOption: "A",
        explanation:
          "Initially, Rajagriha (Prakrit name for Rajgir) was the capital of Magadha. It was a fortified settlement nestled among hills. Later, in the 4th century BCE, the capital was shifted to Pataliputra (modern Patna), commanding communication routes along the Ganga.",
        solutionStepByStep: [
          "Step 1: 6th-5th Century BCE: Rajagriha ('house of the king') served as the fortified capital surrounded by hills.",
          "Step 2: 4th Century BCE: Udayin / Haryanka/Shishunaga rulers shifted the seat of power to Pataliputra on the confluence of Ganga and Son rivers.",
          "Conclusion: Chronology is (ii) Rajagriha then (i) Pataliputra. Option A is correct.",
        ],
        cuetPattern: "Chronology of capital shifts and dynastic transitions in the 16 Mahajanapadas.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Epigraphic Source Attribution",
        frequency: "Very High (Repeated in almost every shift)",
        typicalStem: "Who among the following deciphered the Brahmi and Kharosthi scripts in 1838?",
        strategy: "Instantly identify James Prinsep, Mint Officer in East India Company.",
      },
      {
        patternType: "Mahajanapada Matching",
        frequency: "High",
        typicalStem: "Match the Mahajanapada with its capital: Vajji - Vaishali; Gandhara - Taxila; Kuru - Hastinapura; Kosala - Shravasti.",
        strategy: "Memorize the 6 primary Mahajanapadas and their capitals from NCERT map.",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing all Ashokan inscriptions were written in Sanskrit using Devanagari script.",
        correctConcept: "Ashokan inscriptions were written in Prakrit, Aramaic, and Greek. The scripts used were Brahmi, Kharosthi, Aramaic, and Greek. None were in Devanagari (which developed centuries later).",
        whyTrapWorks: "Students confuse the modern language Hindi/Devanagari with ancient Prakrit/Brahmi.",
        cuetWarning: "In northwestern India, Kharosthi, Aramaic, and Greek scripts were used; elsewhere in the subcontinent, Prakrit in Brahmi script was used.",
      },
      {
        misconception: "Thinking Prabhavati Gupta was prevented from granting land because the Manusmriti barred women from independent property rights.",
        correctConcept: "Prabhavati Gupta DID grant land at Danguna village because she was a queen/regent, showing that royal women could transcend textbook Dharmashastra restrictions.",
        whyTrapWorks: "CUET frames questions like: 'Did Prabhavati Gupta have the legal right to donate land?' and students select 'No' based on general Brahmanical codes.",
        cuetWarning: "Prabhavati Gupta's copperplate inscription proves she had control over land and donated an Agrahara.",
      },
    ],
    mnemonics: [
      {
        title: "5 Provincial Centers of Mauryas (P-T-U-T-S)",
        mnemonic: "Prime Towns Under The Sun",
        expansion: "Pataliputra, Taxila, Ujjayini, Tosali, Suvarnagiri",
        context: "Helps eliminate incorrect provincial capitals in CUET MCQs.",
      },
    ],
    quickRevisionCard: {
      title: "Kings, Farmers & Towns High-Yield Summary",
      bulletPoints: [
        "1838: James Prinsep deciphered Brahmi & Kharosthi; identified Piyadassi as Ashoka.",
        "6th Century BCE: Turning point—16 Mahajanapadas, iron ploughshare, punch-marked coins, urbanization.",
        "Magadha Dominance: Iron in Jharkhand, fertile Ganga soil, elephants in forests, Rajagriha -> Pataliputra.",
        "Mauryan Empire: Founded 321 BCE by Chandragupta Maurya; extended to Afghanistan/Baluchistan.",
        "Megasthenes: Wrote 'Indika'; recorded 1 committee and 6 military subcommittees (Navy, Transport, Infantry, Cavalry, Chariots, Elephants).",
        "Ashokan Dhamma: Promoted by Dhamma Mahamattas; universal moral ethic across all sects.",
        "Kushanas: Claimed divinity ('Devaputra'), colossal statues at Mat (Mathura), issued gold coins.",
        "Prayaga Prashasti: Composed in Sanskrit by Harishena on Allahabad pillar praising Samudragupta.",
        "Prabhavati Gupta: Daughter of Chandragupta II, married Vakataka king, granted land at Danguna village.",
        "Punch-marked Coins: Earliest silver and copper coins (c. 6th century BCE); Indo-Greeks issued first coins with names/portraits; Kushanas issued first gold coins.",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u2_q1",
        questionNumber: 1,
        question: "Which of the following scripts was deciphered by matching the Greek script on bilingual coins issued by Indo-Greek kings?",
        options: [
          { id: "A", text: "Brahmi" },
          { id: "B", text: "Kharosthi" },
          { id: "C", text: "Aramaic" },
          { id: "D", text: "Devanagari" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "European scholars who knew Greek compared letters with the Kharosthi script on bilingual coins of Indo-Greek kings (e.g., the letter for 'a' in Apollodotus).",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u2_q2",
        questionNumber: 2,
        question: "Who among the following was the founder of the Mauryan Empire in c. 321 BCE?",
        options: [
          { id: "A", text: "Bindusara" },
          { id: "B", text: "Ashoka" },
          { id: "C", text: "Chandragupta Maurya" },
          { id: "D", text: "Brihadratha" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "Chandragupta Maurya founded the empire in c. 321 BCE, extending control as far northwest as Afghanistan and Baluchistan.",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u2_q3",
        questionNumber: 3,
        question: "Which of the following rulers issued the first gold coins in the Indian subcontinent in the first century CE?",
        options: [
          { id: "A", text: "Mauryas" },
          { id: "B", text: "Kushanas" },
          { id: "C", text: "Guptas" },
          { id: "D", text: "Satavahanas" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The first gold coins were issued in the first century CE by the Kushanas. These were virtually identical in weight with those issued by contemporary Roman emperors and Parthian rulers.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u2_q4",
        questionNumber: 4,
        question: "An 'Agrahara' in ancient India referred to:",
        options: [
          { id: "A", text: "Land granted to a Brahmana, who usually paid no land revenue or taxes" },
          { id: "B", text: "A fortified palace belonging to the provincial governor" },
          { id: "C", text: "An artisanal guild operating in coastal trade towns" },
          { id: "D", text: "A military camp established during frontier expeditions" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "An agrahara was land granted to a Brahmana, who was usually exempt from paying land revenue and other dues to the king, and was often invested with the right to collect these dues from the local people.",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u2_q5",
        questionNumber: 5,
        question: "Match List-I (Ancient Region / Capital) with List-II (Key Association):\nList-I:\n(A) Suvarnagiri\n(B) Taxila\n(C) Ujjayini\n(D) Pataliputra\n\nList-II:\n1. Imperial capital of Mauryas\n2. Situated on major land trade crossroads\n3. Literally 'Golden Mountain' in modern Karnataka\n4. Provincial center commanding north-western frontier routes",
        options: [
          { id: "A", text: "A-3, B-4, C-2, D-1" },
          { id: "B", text: "A-1, B-2, C-3, D-4" },
          { id: "C", text: "A-3, B-2, C-4, D-1" },
          { id: "D", text: "A-4, B-3, C-2, D-1" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Suvarnagiri ('golden mountain') was in Karnataka near gold mines; Taxila commanded northwest routes; Ujjayini was on trade routes; Pataliputra was the central capital.",
        questionType: "Match The Following",
        type: "match-the-following",
        difficulty: "medium",
      },
      {
        id: "history_u2_q6",
        questionNumber: 6,
        question: "What title did Kushana rulers adopt to claim divine status, inspired by contemporary Chinese emperors?",
        options: [
          { id: "A", text: "Devaputra ('Son of God')" },
          { id: "B", text: "Chakravartin ('Universal Monarch')" },
          { id: "C", text: "Maharajadhiraja ('King of Kings')" },
          { id: "D", text: "Devanampiya ('Beloved of Gods')" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Many Kushana rulers adopted the title 'Devaputra', or 'son of god', possibly inspired by Chinese rulers who called themselves sons of heaven.",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u2_q7",
        questionNumber: 7,
        question: "Which of the following Sanghas / Ganas in ancient India was an oligarchy where Mahavira and Gautama Buddha belonged?",
        options: [
          { id: "A", text: "Vajji" },
          { id: "B", text: "Magadha" },
          { id: "C", text: "Kashi" },
          { id: "D", text: "Avanti" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "In some states known as ganas or sanghas, power was shared by a number of men, often collectively termed rajas. Both Mahavira and the Buddha belonged to such ganas (Vajji / Shakya).",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u2_q8",
        questionNumber: 8,
        question: "Given below are two statements:\nStatement I: The Sudarshana lake in Gujarat was an artificial reservoir repaired by the Shaka ruler Rudradaman in the second century CE.\nStatement II: Rudradaman used revenue raised from heavy special emergency taxes on his subjects to repair the lake.",
        options: [
          { id: "A", text: "Both Statement I and Statement II are true" },
          { id: "B", text: "Both Statement I and Statement II are false" },
          { id: "C", text: "Statement I is true but Statement II is false" },
          { id: "D", text: "Statement I is false but Statement II is true" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "Statement I is true (Junagadh inscription of Rudradaman). Statement II is false because the inscription explicitly states that Rudradaman repaired the embankment from his own resources without oppressing his subjects by imposing taxes.",
        questionType: "Statement Evaluation",
        type: "standard",
        difficulty: "hard",
      },
      {
        id: "history_u2_q9",
        questionNumber: 9,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): Inscriptions alone cannot reconstruct the complete, unbiased political and economic history of ancient India.\nReason (R): Inscriptions invariably reflect the perspective of the patrons who commissioned them and rarely record routine agricultural operations or the tribulations of ordinary people.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Epigraphy has intrinsic limits: inscriptions focus on royal conquests, land grants, and ceremonies, omitting ordinary social and economic experiences. Hence (R) explains (A).",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "medium",
      },
      {
        id: "history_u2_q10",
        questionNumber: 10,
        question: "What was the guild of craftspeople and merchants called in early historic urban centers?",
        options: [
          { id: "A", text: "Shreni" },
          { id: "B", text: "Gahapati" },
          { id: "C", text: "Kutagarashala" },
          { id: "D", text: "Amatya" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Guilds or organisations of craft producers and merchants were known as 'shrenis'. They procured raw materials, regulated production, and marketed the finished product.",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "Harappan Civilisation", topicId: "history_u1_t1", slug: "urban-planning-craft-production-subsistence-strategies-decipherment" },
      ],
      relatedTopics: [
        { title: "Kinship, Caste and Class", topicId: "history_u3_t1", slug: "mahabharata-as-source-varna-and-jati-gender-and-property-access" },
      ],
      practiceTestId: "practice-history-unit2-test1",
      practiceTestUrl: "/test/practice-history-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 3: Kinship, Caste and Class - Early Societies
  // -------------------------------------------------------------------------
  {
    id: "history_u3_t1",
    slug: "mahabharata-as-source-varna-and-jati-gender-and-property-access",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 3,
    unitTitle: "Social Histories of Early Societies (Kinship, Caste and Class)",
    topicTitle: "Mahabharata as Source, Varna and Jati, Gender and Property Access",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part I",
      chapterNumber: 3,
      chapterName: "Kinship, Caste and Class: Early Societies (c. 600 BCE - 600 CE)",
      sections: [
        "1. The Critical Edition of the Mahabharata",
        "2. Kinship and Marriage: Many Rules and Varied Practices",
        "3. Social Differences: Within and Beyond the Framework of Caste",
        "4. Beyond Birth: Resources and Status",
        "5. Explaining Social Differences: A Social Contract",
        "6. Handling Texts: Historians and the Mahabharata",
        "7. A Dynamic Text",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Consistently asked (4-5 questions per shift)",
      totalPyqsInRepo: 62,
      weightagePercentage: 11,
      expectedQuestions: "4 MCQs on V.S. Sukthankar's Critical Edition, Gotra rules, Varna vs Jati, and Chandalas",
      typicalQuestionTypes: [
        "Chronological details of the Critical Edition project (1919, 47 years, 13,000 pages)",
        "Gotra rules (exogamy, adoption of husband's gotra, Satavahana exceptions)",
        "Dharmashastras / Manusmriti rules on stridhana and paternal estate division",
        "Duties of Chandalas according to Manusmriti and Chinese pilgrims (Fa Xian, Xuan Zang)",
      ],
    },
    summary30s: [
      "The critical edition of the Mahabharata was initiated in 1919 under V.S. Sukthankar, taking 47 years to collate over 13,000 pages from Sanskrit manuscripts across India.",
      "The epic portrays patriliny as the ideal kinship structure, though matrilineal naming practices existed among southern dynasties like the Satavahanas.",
      "Brahmanical texts defined 4 Varnas with divine origin (Purusha Sukta) and occupational prescriptions, while Jatis were flexible social categories not restricted to four.",
      "Gender governed property: paternal estate went to sons with a special share for the eldest; women could only hold Stridhana (gifts at marriage), not immovable property.",
      "Buddhism rejected the divine origin of caste, proposing in the Sutta Pitaka a social contract theory (Mahasammata: the Great Elect).",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "The Critical Edition of the Mahabharata (1919-1966)",
        explanation:
          "In 1919, under the leadership of noted Indian Sanskritist V.S. Sukthankar, a mammoth project began to prepare a Critical Edition of the Mahabharata. Scholars collected Sanskrit manuscripts in various scripts (Kashmiri, Bengali, Devanagari, Telugu, Malayalam, Grantha). They selected verses common to all versions. Published in 13,000 pages across numerous volumes, it took 47 years to complete. It revealed two things: striking common elements in the Sanskrit text across the subcontinent, and vast regional variations (recorded in footnotes and appendices, occupying more than half the pages).",
        ncertPointer: "Themes in Indian History Part I, Section 1",
        examTip: "CUET checks numbers: 1919 start year, V.S. Sukthankar team leader, 47 years duration, 13,000 pages.",
      },
      {
        id: "c2",
        title: "Gotra Rules and Satavahana Exceptions",
        explanation:
          "From c. 1000 BCE, people were classified into Gotras named after Vedic seers. Two major rules: (1) Women had to give up their father's gotra and adopt that of their husband upon marriage, and (2) Members of the same gotra could not marry (gotra exogamy). However, Satavahana inscriptions show marked exceptions: Satavahana queens retained their fathers' gotras (e.g., Gotami and Vashithi), and marriages within the same gotra (gotra endogamy) were practiced among kinfolk in South India. Moreover, Satavahana rulers were metronymic (named after mothers: Gautamiputra Satakarni), though succession to the throne remained patrilineal.",
        ncertPointer: "Themes in Indian History Part I, Section 2",
        examTip: "Crucial CUET trap: Satavahana succession was PATRILINEAL even though kings used METRONYMICS (mother's name).",
      },
      {
        id: "c3",
        title: "Varna, Jati, and the Marginalized (Chandalas)",
        explanation:
          "Varna was strictly fourfold and divinely ordained. Jati, however, had no fixed numerical limit; when Brahmanical authorities encountered communities that did not fit the fourfold varna (e.g., forest dwellers / Nishadas, goldsmiths / Suvarnakaras), they classified them as Jatis. Communities sharing a craft were organized into Shrenis (e.g., Mandasor stone inscription of silk weavers). Those outside the system were branded 'Mlechchhas' (barbarians). At the very bottom were 'Untouchables' or Chandalas, whose duties according to the Manusmriti included: living outside the village, using discarded utensils, wearing clothes of the dead, ornaments of iron, and disposing of unclaimed corpses.",
        ncertPointer: "Themes in Indian History Part I, Section 3",
        examTip: "Chinese pilgrim Fa Xian (5th century CE) noted that 'untouchables' had to clap clappers when entering streets so people could avoid seeing them; Xuan Zang noted scavengers were forced to live outside city walls.",
      },
      {
        id: "c4",
        title: "Gendered Access to Property & Buddhist Social Contract",
        explanation:
          "According to the Manusmriti, the paternal estate was to be divided equally among sons after the death of the parents, with a special share for the eldest. Women were not entitled to claim a share of these ancestral resources. However, women could retain gifts received at their marriage as 'Stridhana' (woman's wealth), which could be inherited by their children without the husband having a claim. In contrast, the Buddhist text Sutta Pitaka suggested that initially humans lived in an idyllic state, but with deterioration and greed, people chose an individual through consensus to maintain order in exchange for a share of rice: the 'Mahasammata' (the Great Elect). This was an early social contract theory, rejecting divine creation.",
        ncertPointer: "Themes in Indian History Part I, Section 4 & 5",
        examTip: "Remember the term 'Mahasammata' - the Great Elect chosen by the people in Buddhist philosophy.",
      },
    ],
    keyFormulas: [
      {
        name: "Critical Edition Quantitative Dimensions",
        formula: "\\text{Year}: 1919 \\quad | \\quad \\text{Leader}: \\text{V.S. Sukthankar} \\quad | \\quad \\text{Duration}: 47 \\text{ years} \\quad | \\quad \\text{Volume}: 13,000+ \\text{ pages}",
        symbols: "Collation of Sanskrit manuscripts in multiple scripts",
        siUnits: "Textual Dimension",
        whenToUse: "Factual MCQ testing the Mahabharata Critical Edition project.",
      },
      {
        name: "Brahmanical Gotra Rules vs Satavahana Deviations",
        formula: "\\text{Norm}: \\text{Exogamy} + \\text{Adopt Husband's Gotra} \\quad \\Longleftrightarrow \\quad \\text{Satavahana}: \\text{Endogamy} + \\text{Retain Father's Gotra (Metronymics)}",
        symbols: "Gautamiputra Satakarni, Vashisthiputra Pulumayi",
        siUnits: "Kinship Practice",
        whenToUse: "Contrasting normative Dharmashastra rules with historical dynastic practice.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Social Stratification: Varna, Jati, and Social Contract",
      caption: "Hierarchical division of Varna vs flexible Jati alongside the Buddhist alternative (Mahasammata)",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">EARLY INDIAN SOCIAL ORDER &amp; DIVERGENT MODELS</text>

  <!-- Brahmanical 4-Varna Pyramid -->
  <polygon points="220,70 80,330 360,330" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
  <line x1="185" y1="135" x2="255" y2="135" stroke="#334155" strokeWidth="1.5" />
  <line x1="150" y1="200" x2="290" y2="200" stroke="#334155" strokeWidth="1.5" />
  <line x1="115" y1="265" x2="325" y2="265" stroke="#334155" strokeWidth="1.5" />

  <text x="220" y="115" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">BRAHMANA</text>
  <text x="220" y="170" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">KSHATRIYA</text>
  <text x="220" y="235" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">VAISHYA</text>
  <text x="220" y="300" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">SHUDRA</text>
  <text x="220" y="355" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="bold">OUTSIDE VARNA: CHANDALAS / MLECHCHHAS</text>

  <!-- Buddhist Social Contract Box -->
  <rect x="440" y="70" width="310" height="260" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" rx="6" />
  <text x="595" y="100" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="bold">BUDDHIST SOCIAL THEORY (Sutta Pitaka)</text>
  <rect x="460" y="120" width="270" height="40" fill="#ffffff" stroke="#93c5fd" rx="4" />
  <text x="595" y="145" textAnchor="middle" fill="#1e3a8a" fontSize="12">Natural deterioration &amp; greed</text>
  <text x="595" y="180" textAnchor="middle" fill="#2563eb" fontSize="18">↓</text>
  <rect x="460" y="195" width="270" height="50" fill="#dbeafe" stroke="#3b82f6" rx="4" />
  <text x="595" y="215" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">MAHASAMMATA ('The Great Elect')</text>
  <text x="595" y="232" textAnchor="middle" fill="#1e3a8a" fontSize="10">Elected by consensus; paid tax in rice</text>
  <text x="595" y="280" textAnchor="middle" fill="#047857" fontSize="12" fontStyle="italic">Institution of Kingship as human choice</text>
  <text x="595" y="305" textAnchor="middle" fill="#047857" fontSize="11">(NOT divinely ordained)</text>

  <!-- Footer note -->
  <rect x="50" y="380" width="700" height="30" fill="#e2e8f0" rx="4" />
  <text x="400" y="400" textAnchor="middle" fill="#475569" fontSize="11">
    Satavahana kings: Polygynous, metronymic, married within Gotra, yet succession remained strictly patrilineal.
  </text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">EARLY INDIAN SOCIAL ORDER &amp; DIVERGENT MODELS</text>
  <polygon points="220,70 80,330 360,330" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
  <text x="220" y="115" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">BRAHMANA</text>
  <text x="220" y="170" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">KSHATRIYA</text>
  <text x="220" y="235" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">VAISHYA</text>
  <text x="220" y="300" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">SHUDRA</text>
  <rect x="440" y="70" width="310" height="260" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" rx="6" />
  <text x="595" y="100" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="bold">BUDDHIST SOCIAL THEORY (Sutta Pitaka)</text>
  <rect x="460" y="195" width="270" height="50" fill="#dbeafe" stroke="#3b82f6" rx="4" />
  <text x="595" y="215" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">MAHASAMMATA ('The Great Elect')</text>
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "Which of the following Chinese Buddhist travellers wrote that 'untouchables' (Chandalas) had to sound a clapper in the streets so that people could avoid seeing them?\n(A) Xuan Zang\n(B) Fa Xian\n(C) I-Qing\n(D) Faxian and Xuan Zang together in a joint chronicle",
        options: [
          { id: "A", text: "Xuan Zang" },
          { id: "B", text: "Fa Xian" },
          { id: "C", text: "I-Qing" },
          { id: "D", text: "Both together" },
        ],
        correctOption: "B",
        explanation:
          "According to NCERT Theme 1 Chapter 3, the Chinese Buddhist monk Fa Xian (who visited India c. 5th century CE) wrote that 'untouchables' had to sound a clapper in the streets so that people could avoid seeing them, which was believed to be polluting. Xuan Zang (7th century CE) observed that executioners and scavengers were forced to live outside that city.",
        solutionStepByStep: [
          "Step 1: Fa Xian (5th century CE) -> recorded the striking of clapper/piece of wood upon entering streets.",
          "Step 2: Xuan Zang (7th century CE) -> recorded executioners and scavengers living outside city gates.",
          "Conclusion: Option B (Fa Xian) is the precise historical attribution.",
        ],
        cuetPattern: "Differentiating between Fa Xian's and Xuan Zang's observations on caste pollution.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "The famous Mandasor inscription (Madhya Pradesh) records the history of a guild of:\n(A) Silk weavers who migrated from Lata (Gujarat)\n(B) Ivory carvers of Vidisha who funded Sanchi toranas\n(C) Blacksmiths who forged iron pillars\n(D) Horse merchants from the north-west",
        options: [
          { id: "A", text: "Silk weavers from Lata" },
          { id: "B", text: "Ivory carvers of Vidisha" },
          { id: "C", text: "Blacksmiths" },
          { id: "D", text: "Horse merchants" },
        ],
        correctOption: "A",
        explanation:
          "A stone inscription found at Mandasor (Madhya Pradesh) records the history of a guild of silk weavers who originally lived in Lata (Gujarat) and migrated to Mandasor (then known as Dashapura) attracted by the fame of the local king.",
        solutionStepByStep: [
          "Step 1: Recall the Mandasor inscription (5th century CE).",
          "Step 2: Identifies a guild (shreni) of silk weavers migrating from Lata (Gujarat) to Dashapura (Mandasor).",
          "Step 3: They pooled resources to construct a magnificent temple to the Sun god.",
          "Conclusion: Option A is correct.",
        ],
        cuetPattern: "Direct inscription identification question regarding social mobility of guilds.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Manusmriti Property Rules Analysis",
        frequency: "High",
        typicalStem: "According to Manusmriti, which of the following is true regarding women's right to property?",
        strategy: "Women could own Stridhana (gifts at marriage), but could not claim ancestral land or family property.",
      },
      {
        patternType: "Satavahana Kinship Paradox",
        frequency: "Very High",
        typicalStem: "Satavahana rulers were identified through metronymics. Did this mean society was matriarchal?",
        strategy: "No, succession was patrilineal; only royal names included the mother's gotra (e.g. Gautamiputra).",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming the Mahabharata critical edition was compiled from just a few Sanskrit manuscripts in north India.",
        correctConcept: "It collated hundreds of manuscripts written on palm leaf and paper in various regional scripts (Kashmiri, Devanagari, Bengali, Telugu, Malayalam, Grantha) across North and South India.",
        whyTrapWorks: "Questions ask whether south Indian manuscripts were included; they were thoroughly included.",
        cuetWarning: "The critical edition proved both pan-Indian unity and tremendous regional variations.",
      },
      {
        misconception: "Equating Varna with Jati.",
        correctConcept: "Varna is strictly four (Brahmana, Kshatriya, Vaishya, Shudra). Jati has no fixed number and accommodates new occupational groups, tribes, and foreigners.",
        whyTrapWorks: "Options say 'There were 16 Varnas and 4 Jatis' or similar inversions.",
        cuetWarning: "Varna = 4; Jati = unlimited.",
      },
    ],
    mnemonics: [
      {
        title: "Sukthankar's Project Numbers (1919 - 47 - 13)",
        mnemonic: "1919 Sukthankar Saw 47 Scholars Writing 13 Volumes",
        expansion: "Started 1919, took 47 years, generated 13,000+ pages of text",
        context: "Instantly solves quantitative questions on the Critical Edition of Mahabharata.",
      },
    ],
    quickRevisionCard: {
      title: "Kinship, Caste and Class Quick Revision",
      bulletPoints: [
        "Mahabharata Critical Edition: Started 1919 by V.S. Sukthankar; took 47 years, 13,000 pages.",
        "Patriliny: Traced from father to son; Mahabharata war fought between cousins (Kauravas and Pandavas) over land and power.",
        "Gotra Rules: Brahmanical code required exogamy and changing woman's gotra to husband's upon marriage.",
        "Satavahana Rulers: Practiced gotra endogamy, queens retained father's gotra, metronymic titles used, but succession was patrilineal.",
        "Varna vs Jati: 4 Varnas fixed by birth; Jatis unlimited (e.g., Nishadas, Suvarnakaras).",
        "Mandasor Inscription: 5th-century guild of silk weavers who migrated from Lata (Gujarat) to Dashapura.",
        "Manusmriti on Chandalas: Lived outside village, used broken pots, wore dead clothes, touched corpses.",
        "Stridhana: Gifts given to woman during marriage; her absolute right inherited by children.",
        "Polyandry: Draupadi married to five Pandavas; recognized as a variant form of marriage in early India.",
        "Buddhist View: Sutta Pitaka explains social inequality via 'Mahasammata' (elected king via social contract).",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u3_q1",
        questionNumber: 1,
        question: "Under whose leadership was the ambitious project of preparing the Critical Edition of the Mahabharata initiated in 1919?",
        options: [
          { id: "A", text: "V.S. Sukthankar" },
          { id: "B", text: "B.B. Lal" },
          { id: "C", text: "Alexander Cunningham" },
          { id: "D", text: "R.G. Bhandarkar" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "In 1919, the renowned Sanskritist V.S. Sukthankar led a team of scholars to prepare the Critical Edition of the Mahabharata.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u3_q2",
        questionNumber: 2,
        question: "Which of the following dynasties provides historical evidence of rulers practicing endogamy (marriage within the kin unit/gotra) contrary to Brahmanical rules?",
        options: [
          { id: "A", text: "Mauryas" },
          { id: "B", text: "Satavahanas" },
          { id: "C", text: "Guptas" },
          { id: "D", text: "Kushanas" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Satavahana rulers married women who belonged to the same gotra, illustrating endogamous marriage practices prevalent in parts of South India.",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u3_q3",
        questionNumber: 3,
        question: "According to the Dharmashastras, what was the term used for wealth received by a woman during her marriage that could be inherited by her children?",
        options: [
          { id: "A", text: "Agrahara" },
          { id: "B", text: "Stridhana" },
          { id: "C", text: "Bhoga" },
          { id: "D", text: "Sulka" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Gifts given to a bride during her marriage were called 'stridhana' (literally, woman's wealth), which could be inherited by children without the husband having a claim.",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u3_q4",
        questionNumber: 4,
        question: "In the Buddhist text Sutta Pitaka, the king who was elected by the whole people to maintain social order was designated as:",
        options: [
          { id: "A", text: "Mahasammata" },
          { id: "B", text: "Devaputra" },
          { id: "C", text: "Chakravartin" },
          { id: "D", text: "Piyadassi" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "The Sutta Pitaka suggests people chose someone who would be capable of dispensing justice: he was known as 'Mahasammata', the Great Elect.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u3_q5",
        questionNumber: 5,
        question: "B.B. Lal excavated the village of Hastinapura in Meerut (U.P.) in 1951-52. What was the distinctive ceramic type found in Period II associated with early epic traditions?",
        options: [
          { id: "A", text: "Northern Black Polished Ware (NBPW)" },
          { id: "B", text: "Painted Grey Ware (PGW)" },
          { id: "C", text: "Black and Red Ware (BRW)" },
          { id: "D", text: "Ochre Coloured Pottery (OCP)" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Period II at Hastinapura (c. 12th-7th centuries BCE) yielded Painted Grey Ware (PGW), mud-brick walls, and reed thatch structures.",
        questionType: "Archaeological Association",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u3_q6",
        questionNumber: 6,
        question: "According to the Manusmriti, which of the following was NOT a duty prescribed for the Chandalas?",
        options: [
          { id: "A", text: "They had to live outside the village" },
          { id: "B", text: "They had to wear ornaments of iron and clothes of the dead" },
          { id: "C", text: "They could enter villages at night to purchase grain" },
          { id: "D", text: "They had to serve as executioners and dispose of corpses of those without relatives" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "The Manusmriti explicitly stated that Chandalas could NOT walk about in villages and cities at night; they had to stay outside.",
        questionType: "Except Pattern Analysis",
        type: "standard",
        difficulty: "hard",
      },
      {
        id: "history_u3_q7",
        questionNumber: 7,
        question: "Which of the following forms of marriage involves a woman having multiple husbands simultaneously, as seen in the case of Draupadi?",
        options: [
          { id: "A", text: "Polygyny" },
          { id: "B", text: "Polyandry" },
          { id: "C", text: "Endogamy" },
          { id: "D", text: "Exogamy" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Polyandry is the practice of a woman having several husbands. Draupadi's marriage to the five Pandavas is the most famous example in ancient Indian literature.",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u3_q8",
        questionNumber: 8,
        question: "The story of Matanga, a Bodhisatta born as a Chandala who married Dittha Mangalika, is found in which of the following Buddhist Jatakas?",
        options: [
          { id: "A", text: "Matanga Jataka" },
          { id: "B", text: "Vessantara Jataka" },
          { id: "C", text: "Ruru Jataka" },
          { id: "D", text: "Shibi Jataka" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "The Matanga Jataka tells the story of the Bodhisatta born outside the city as an outcaste Chandala named Matanga.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u3_q9",
        questionNumber: 9,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): Satavahana kings used metronymics, yet their system of dynastic succession was patrilineal.\nReason (R): In the Satavahana kingdom, royal authority and the throne passed from father to son, despite rulers bearing names derived from their mothers like Gautamiputra.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "While Satavahana rulers were identified through metronymics (names derived from mothers), succession to the throne was almost generally patrilineal (passed from father to son). Both are true and (R) explains (A).",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "medium",
      },
      {
        id: "history_u3_q10",
        questionNumber: 10,
        question: "Which category of texts in ancient India defined the 'Dharma' or ideal conduct for the four varnas?",
        options: [
          { id: "A", text: "Dharmasutras and Dharmashastras" },
          { id: "B", text: "Upanishads and Aranyakas" },
          { id: "C", text: "Sangam anthologies" },
          { id: "D", text: "Puranas and Itihasas" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "From c. 500 BCE, Brahmanas compiled Sanskrit legal codes known as the Dharmasutras and Dharmashastras (most notable being the Manusmriti).",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "Early States and Economies", topicId: "history_u2_t1", slug: "16-mahajanapadas-mauryan-empire-epigraphy-inscriptional-evidences" },
      ],
      relatedTopics: [
        { title: "Buddhism and Jainism", topicId: "history_u4_t1", slug: "stupas-at-sanchi-and-bharhut-teachings-of-mahavira-and-buddha-puranic-hinduism" },
      ],
      practiceTestId: "practice-history-unit3-test1",
      practiceTestUrl: "/test/practice-history-unit3-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 4: Thinkers, Beliefs and Buildings - Cultural Developments
  // -------------------------------------------------------------------------
  {
    id: "history_u4_t1",
    slug: "stupas-at-sanchi-and-bharhut-teachings-of-mahavira-and-buddha-puranic-hinduism",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 4,
    unitTitle: "History of Buddhism and Jainism (Thinkers, Beliefs and Buildings)",
    topicTitle: "Stupas at Sanchi and Bharhut, Teachings of Mahavira and Buddha, Puranic Hinduism",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part I",
      chapterNumber: 4,
      chapterName: "Thinkers, Beliefs and Buildings: Cultural Developments (c. 600 BCE - 600 CE)",
      sections: [
        "1. A Glimpse of Sanchi: Preservation by Bhopal Begums",
        "2. The Background: Sacrifices and Debates (Kutagarashala)",
        "3. Beyond Worldly Pleasures: The Message of Mahavira",
        "4. The Buddha and the Quest for Enlightenment",
        "5. The Teachings of the Buddha",
        "6. Followers of the Buddha: The Sangha",
        "7. Stupas: Why were they built? How were they built?",
        "8. Discovering Stupas: The Fate of Amaravati and Sanchi",
        "9. 'Sculptures': Stories in Stone and Symbols of Worship",
        "10. New Religious Traditions: Mahayana, Puranic Hinduism, Early Temples",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Very High (6-8 questions per shift in CUET History)",
      totalPyqsInRepo: 82,
      weightagePercentage: 16,
      expectedQuestions: "6 MCQs on Sanchi preservation (Shahjehan Begum), Stupa architectural parts, Four Noble Truths, Jaina Triratna, and Amaravati vs Sanchi fate",
      typicalQuestionTypes: [
        "Architectural identification: Anda, Harmika, Yashti, Chhatri, Torana",
        "Historical preservation role of the Begums of Bhopal (Shahjehan Begum, Sultan Jehan Begum)",
        "Teachings of Mahavira (Ahimsa, Karma, Asceticism, 5 Vows) and Buddha (Ashtangika Marga)",
        "Why Amaravati was stripped of its marbles (Colin Mackenzie, Walter Elliot) while Sanchi survived",
      ],
    },
    summary30s: [
      "Mid-first millennium BCE witnessed intense philosophical debates across India, Persia (Zarathustra), China (Kongzi), and Greece (Socrates, Plato), questioning Vedic sacrificial rituals.",
      "Jainism teaches that the entire world is animated; Ahimsa (non-injury to living beings, plants, insects) is the core principle. Liberation is achieved through asceticism and penance.",
      "Buddha taught that the world is transient (anicca) and soulless (anatta); suffering (dukkha) can be conquered by following the Middle Path between extreme asceticism and indulgence.",
      "Stupas originated as burial mounds over Buddha's bodily relics. Key parts: circular base, dome (anda), balcony-like harmika (abode of the gods), mast (yashti) with umbrellas (chhatri).",
      "Sanchi stupa survived intact because Bhopal's rulers (Shahjehan Begum and Sultan Jehan Begum) funded plaster casts for Europeans, while Amaravati was stripped bare by colonial antiquarians.",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "Preservation of Sanchi Stupa: The Role of Bhopal Begums",
        explanation:
          "Sanchi Stupa near Vidisha (Bhopal) survived in pristine condition primarily due to the rulers of Bhopal: Nawab Shahjehan Begum and her successor Sultan Jehan Begum. When French and British officers sought permission to take the exquisitely carved Eastern Gateway to museums in Paris and London, the Begums provided carefully prepared plaster-cast copies, satisfying the collectors while keeping the original intact on site. Furthermore, Sultan Jehan Begum funded the museum and guesthouse where Sir John Marshall lived and wrote his monumental volumes, and financed the publication of the research.",
        ncertPointer: "Themes in Indian History Part I, Section 1",
        examTip: "CUET often asks who funded John Marshall's research and the museum at Sanchi: Sultan Jehan Begum of Bhopal.",
      },
      {
        id: "c2",
        title: "The Architecture of the Stupa",
        explanation:
          "The stupa ('heap' in Sanskrit) began as a simple semi-circular mound of earth called the 'anda'. Gradually, it evolved into a sophisticated structure: atop the anda was the 'harmika', a balcony-like structure that represented the abode of the gods. Arising from the harmika was a central mast called the 'yashti', which supported three umbrellas ('chhatri'). The stupa was enclosed by a stone railing (vedika) and entered through four magnificently carved ornamental gateways ('toranas') oriented to the cardinal directions. Worshipers circumambulated the mound in a clockwise direction.",
        ncertPointer: "Themes in Indian History Part I, Section 7",
        examTip: "Harmika = balcony representing abode of the gods; Yashti = central mast; Chhatri = umbrellas; Torana = ornamental gateway.",
      },
      {
        id: "c3",
        title: "Why Amaravati Stupa Perished while Sanchi Survived",
        explanation:
          "Amaravati stupa (Andhra Pradesh) was discovered in 1796 by a local raja who used its stones to build a palace. In 1798, British surveyor Colin Mackenzie visited and made drawings, but his report was never published. Later, Walter Elliot (Commissioner of Guntur) collected marble slabs ('Elliot marbles') and took them to Madras. Sculptures from Amaravati were shipped to Asiatic Society Calcutta, India Office London, and British Museum. Archaeologist H.H. Cole advocated in-situ preservation ('an act of suicidal vandalisation to cart away original works'), but his plea was ignored for Amaravati. Sanchi was discovered later in 1818; by then, the value of keeping finds on-site was recognized.",
        ncertPointer: "Themes in Indian History Part I, Section 8",
        examTip: "H.H. Cole's famous philosophy: 'It seems to me a suicidal and indefensible policy to allow the country to be looted of original works of ancient art.'",
      },
      {
        id: "c4",
        title: "Teachings of Mahavira vs Teachings of the Buddha",
        explanation:
          "Mahavira was the 24th Tirthankara (teacher). Core Jaina tenets: entire world is animated (even rocks and water have life); non-violence (Ahimsa) is paramount; cycle of rebirth is shaped by karma; asceticism and severe penance are required to free oneself from karma (attainable only by monastic renunciation). Five vows: Ahimsa, Asteya (non-stealing), Satya, Brahmacharya, Aparigraha (non-possession). Buddha rejected extreme penance, advocating the 'Middle Path'. Four Noble Truths: Dukkha exists; Dukkha has a cause (Tanha / craving); Dukkha can cease (Nirvana); Path to cessation is the Eightfold Path (Ashtangika Marga). The world is anicca (transient) and anatta (soulless).",
        ncertPointer: "Themes in Indian History Part I, Sections 3, 4, 5",
        examTip: "Therigatha: Verses composed by early Buddhist nuns (Theris), preserving unique female spiritual voices.",
      },
    ],
    keyFormulas: [
      {
        name: "Stupa Anatomy Structural Sequence",
        formula: "\\text{Medhi (Base)} \\rightarrow \\text{Anda (Hemisphere)} \\rightarrow \\text{Harmika (Balcony)} \\rightarrow \\text{Yashti (Mast)} \\rightarrow \\text{Chhatri (Umbrellas)}",
        symbols: "Surrounded by Vedika (stone railing) and 4 Toranas (gateways)",
        siUnits: "Architectural Order",
        whenToUse: "Ordering of architectural elements from ground up in Stupa construction.",
      },
      {
        name: "Buddhist Four Noble Truths (Arya Satya)",
        formula: "\\text{Dukkha (Suffering)} \\rightarrow \\text{Samudaya (Origin: Tanha)} \\rightarrow \\text{Nirodha (Cessation: Nirvana)} \\rightarrow \\text{Magga (Eightfold Path)}",
        symbols: "Core sermon delivered at Isipatana (Deer Park, Sarnath)",
        siUnits: "Doctrinal Framework",
        whenToUse: "MCQs testing Buddhist doctrinal fundamentals.",
      },
      {
        name: "Jainism Five Great Vows (Pancha Mahavrata)",
        formula: "\\text{Ahimsa (Non-violence)} + \\text{Satya (Truth)} + \\text{Asteya (Non-stealing)} + \\text{Brahmacharya (Celibacy)} + \\text{Aparigraha (Non-possession)}",
        symbols: "Four given by Parshvanatha; 5th (Brahmacharya) added by Mahavira",
        siUnits: "Ethical Injunctions",
        whenToUse: "Questions asking which vow was added by Mahavira.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Anatomy of the Buddhist Stupa (Cross-Section)",
      caption: "Detailed anatomical structure: Anda, Harmika, Yashti, Chhatri, Vedika, and Torana",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">STRUCTURAL ANATOMY OF A SANCHI-STYLE STUPA</text>

  <!-- Ground Line -->
  <line x1="100" y1="360" x2="700" y2="360" stroke="#475569" strokeWidth="3" />

  <!-- Stone Railing (Vedika) -->
  <rect x="140" y="310" width="520" height="50" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="8 4" />
  <text x="680" y="335" fill="#475569" fontSize="11" fontWeight="bold">VEDIKA (Railing)</text>

  <!-- Circular Base (Medhi) -->
  <rect x="200" y="310" width="400" height="50" fill="#cbd5e1" stroke="#334155" strokeWidth="2" rx="4" />
  <text x="400" y="340" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">MEDHI (Circular Terraced Base - Pradakshina Path)</text>

  <!-- Dome (Anda) -->
  <path d="M 230,310 A 170,170 0 0,1 570,310 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2.5" />
  <text x="400" y="240" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="bold">ANDA (Hemispherical Dome)</text>
  <text x="400" y="260" textAnchor="middle" fill="#475569" fontSize="11">Containing Buddha's relic casket</text>

  <!-- Harmika -->
  <rect x="360" y="110" width="80" height="30" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
  <text x="400" y="130" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="bold">HARMIKA</text>
  <text x="490" y="125" fill="#854d0e" fontSize="10">(Abode of the Gods)</text>

  <!-- Yashti & Chhatri -->
  <line x1="400" y1="110" x2="400" y2="45" stroke="#0f172a" strokeWidth="3" />
  <text x="360" y="75" textAnchor="end" fill="#0f172a" fontSize="11" fontWeight="bold">YASHTI (Mast)</text>

  <!-- 3 Umbrellas (Chhatravalis) -->
  <ellipse cx="400" cy="50" rx="35" ry="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
  <ellipse cx="400" cy="65" rx="45" ry="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
  <ellipse cx="400" cy="80" rx="55" ry="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
  <text x="480" y="65" fill="#0369a1" fontSize="11" fontWeight="bold">CHHATRI (3 Umbrellas)</text>

  <!-- Torana Gateways on sides -->
  <rect x="110" y="220" width="20" height="140" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
  <rect x="90" y="200" width="60" height="20" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
  <text x="120" y="190" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="bold">TORANA</text>
  <text x="120" y="380" textAnchor="middle" fill="#c2410c" fontSize="10">Ornate Gateway</text>

  <!-- Summary Box -->
  <rect x="220" y="380" width="360" height="25" fill="#f1f5f9" rx="4" />
  <text x="400" y="397" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">
    Sanchi preserved by Shahjehan &amp; Sultan Jehan Begum of Bhopal
  </text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">STRUCTURAL ANATOMY OF A SANCHI-STYLE STUPA</text>
  <rect x="200" y="310" width="400" height="50" fill="#cbd5e1" stroke="#334155" strokeWidth="2" rx="4" />
  <path d="M 230,310 A 170,170 0 0,1 570,310 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2.5" />
  <text x="400" y="240" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="bold">ANDA (Hemispherical Dome)</text>
  <rect x="360" y="110" width="80" height="30" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
  <text x="400" y="130" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="bold">HARMIKA</text>
  <line x1="400" y1="110" x2="400" y2="45" stroke="#0f172a" strokeWidth="3" />
  <ellipse cx="400" cy="50" rx="35" ry="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
  <ellipse cx="400" cy="65" rx="45" ry="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
  <ellipse cx="400" cy="80" rx="55" ry="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
  <text x="480" y="65" fill="#0369a1" fontSize="11" fontWeight="bold">CHHATRI (3 Umbrellas)</text>
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "Which of the following parts of a Buddhist Stupa represented the 'abode of the gods'?\n(A) Anda\n(B) Harmika\n(C) Yashti\n(D) Medhi",
        options: [
          { id: "A", text: "Anda" },
          { id: "B", text: "Harmika" },
          { id: "C", text: "Yashti" },
          { id: "D", text: "Medhi" },
        ],
        correctOption: "B",
        explanation:
          "Above the anda was the harmika, a balcony-like structure that represented the abode of the gods (NCERT Themes in Indian History Part I, p. 96).",
        solutionStepByStep: [
          "Step 1: Anda = semi-circular mound of earth/bricks.",
          "Step 2: Harmika = balcony-like structure on top of the dome, symbolizing the dwelling of celestial gods.",
          "Step 3: Yashti = mast arising from harmika.",
          "Conclusion: Option B (Harmika) is correct.",
        ],
        cuetPattern: "Direct anatomical nomenclature question from NCERT Section 7.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "Why did Sanchi Stupa survive while Amaravati Stupa fell to ruin?\n(A) Amaravati was built of unbaked mud bricks which dissolved in rain\n(B) The rulers of Bhopal preserved Sanchi and prevented original gateways from being looted, whereas Amaravati was dismantled by colonial administrators for its marble sculptures\n(C) Sanchi was protected by the Ashokan imperial guard until the modern era\n(D) Amaravati was destroyed in a massive earthquake in the 10th century",
        options: [
          { id: "A", text: "Reason A" },
          { id: "B", text: "Reason B" },
          { id: "C", text: "Reason C" },
          { id: "D", text: "Reason D" },
        ],
        correctOption: "B",
        explanation:
          "Amaravati was discovered before archaeologists appreciated in-situ preservation. Slabs were carted off to Madras, London, and Calcutta. Sanchi was discovered later, and the Begums of Bhopal provided plaster casts to European collectors, preserving the monument on-site.",
        solutionStepByStep: [
          "Step 1: Amaravati (discovered 1796) fell victim to antiquarians like Colin Mackenzie, Walter Elliot, and local rajas who looted its carved slabs.",
          "Step 2: Sanchi (discovered 1818) was protected by Nawab Shahjehan Begum and Sultan Jehan Begum, who gave plaster casts to British and French officers and funded the site museum.",
          "Conclusion: Option B is the historically accurate reason.",
        ],
        cuetPattern: "Comparative historical causality between Sanchi and Amaravati.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Buddhist Symbolism Decipherment",
        frequency: "Very High",
        typicalStem: "In early Buddhist art at Sanchi, the empty seat symbolized: (A) Meditation of Buddha, (B) Parinirvana, (C) First sermon, (D) Birth.",
        strategy: "Empty seat = Meditation; Stupa = Mahaparinirvana; Wheel (Dharmachakra) = First Sermon at Sarnath.",
      },
      {
        patternType: "Bhopal Begums Contribution",
        frequency: "High",
        typicalStem: "Which Begum of Bhopal funded the museum and guesthouse at Sanchi where John Marshall stayed?",
        strategy: "Sultan Jehan Begum.",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing that early Buddhist art at Sanchi portrayed Buddha in human form.",
        correctConcept: "Early Buddhist sculptors did NOT show Buddha as a human figure. He was represented purely through symbols: the empty seat (meditation), the wheel (first sermon), and the stupa (mahaparinirvana). Anthropomorphic statues appeared later with Mahayana Buddhism.",
        whyTrapWorks: "Students see modern statues of Buddha and assume ancient stupas also carved his human figure.",
        cuetWarning: "Symbols represent Buddha in early Hinayana/Theravada art; human figures only appear in Gandhara/Mathura Mahayana art.",
      },
      {
        misconception: "Thinking Mahavira founded Jainism.",
        correctConcept: "Jain tradition holds that Mahavira was preceded by 23 other teachers called Tirthankaras (those who guide across the river of existence). Mahavira was the 24th and last Tirthankara.",
        whyTrapWorks: "Questions ask 'Who was the founder of Jainism?' and students pick Mahavira instead of recognizing Rishabhadeva as 1st and Mahavira as 24th.",
        cuetWarning: "Always identify Mahavira as the 24th Tirthankara.",
      },
    ],
    mnemonics: [
      {
        title: "Three Primary Symbols of Buddha's Life (S-W-S)",
        mnemonic: "Sit Well Still",
        expansion: "Seat = Meditation; Wheel = Sermon; Stupa = Passing (Mahaparinirvana)",
        context: "Instantly links Sanchi carved symbols with life events of the Buddha in CUET MCQs.",
      },
    ],
    quickRevisionCard: {
      title: "Cultural Developments & Thinkers Rapid Revision",
      bulletPoints: [
        "6th Century BCE: Period of intellectual ferment; 64 sects/schools of thought debated in Kutagarashalas (pointed-roof huts).",
        "Jainism: 24 Tirthankaras; Mahavira was the 24th. Core principle: Ahimsa (even rocks, water, plants possess life).",
        "Jaina Vows: Ahimsa, Satya, Asteya, Brahmacharya (added by Mahavira), Aparigraha.",
        "Buddha's Life: Born at Lumbini, enlightened at Bodh Gaya, first sermon at Sarnath (Dharmachakrapravartana), passed away at Kusinagara.",
        "Buddhist Doctrine: Anicca (transient), Anatta (no permanent self), Dukkha (sorrow); Ashtangika Marga (Middle Path).",
        "Sangha: Organization of monks (Bhikkus) and nuns (Bhikkunis). Mahapajapati Gotami was the first woman ordained as a Bhikkuni.",
        "Therigatha: Pali collection of verses composed by early Buddhist elder nuns (Theris).",
        "Stupa Architecture: Anda (dome) -> Harmika (balcony/gods' abode) -> Yashti (mast) -> Chhatri (umbrellas); enclosed by Vedika with Toranas.",
        "Preservation: Sanchi saved by Bhopal Begums (Shahjehan Begum & Sultan Jehan Begum); Amaravati looted by Walter Elliot & local rajas.",
        "Artistic Symbols: Empty seat = Meditation; Wheel = First Sermon; Stupa = Mahaparinirvana; Tree = Bodhi Enlightenment.",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u4_q1",
        questionNumber: 1,
        question: "Who was the first woman to be ordained as a Bhikkhuni in the Buddhist Sangha upon the intervention of Ananda?",
        options: [
          { id: "A", text: "Mahapajapati Gotami" },
          { id: "B", text: "Yashodhara" },
          { id: "C", text: "Prabhavati Gupta" },
          { id: "D", text: "Dittha Mangalika" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Mahapajapati Gotami, the Buddha's foster mother, was the first woman to be admitted into the Sangha as a bhikkhuni.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u4_q2",
        questionNumber: 2,
        question: "Which of the following rulers of Bhopal provided funds for the preservation of the Sanchi stupa and the publication of John Marshall's research?",
        options: [
          { id: "A", text: "Sultan Jehan Begum" },
          { id: "B", text: "Noor Jahan Begum" },
          { id: "C", text: "Razia Sultan" },
          { id: "D", text: "Jahanara Begum" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Sultan Jehan Begum provided money for the preservation of the ancient site, funded the museum and guesthouse, and financed the publication of John Marshall's volumes.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u4_q3",
        questionNumber: 3,
        question: "In early Buddhist art at Sanchi, which symbol was used by sculptors to represent the Mahaparinirvana (passing away) of the Buddha?",
        options: [
          { id: "A", text: "A wheel" },
          { id: "B", text: "A stupa" },
          { id: "C", text: "An empty seat" },
          { id: "D", text: "A lotus flower" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The stupa represented the mahaparinirvana (Buddha's death/liberation), while the wheel represented the first sermon delivered at Sarnath.",
        questionType: "Art Historical Symbolism",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u4_q4",
        questionNumber: 4,
        question: "What is the meaning of the Sanskrit term 'Harmika' in stupa architecture?",
        options: [
          { id: "A", text: "The semi-circular earthen dome containing the relic" },
          { id: "B", text: "A balcony-like structure atop the dome representing the abode of the gods" },
          { id: "C", text: "The ornamental gateway facing the four cardinal directions" },
          { id: "D", text: "The circular stone pathway used for circumambulation" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Harmika was a balcony-like structure atop the anda that represented the abode of the gods.",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u4_q5",
        questionNumber: 5,
        question: "Which of the following texts is a unique Pali collection of verses composed by Buddhist elder nuns (bhikkhunis) celebrating their spiritual freedom?",
        options: [
          { id: "A", text: "Theragatha" },
          { id: "B", text: "Therigatha" },
          { id: "C", text: "Dipavamsa" },
          { id: "D", text: "Mahavamsa" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The Therigatha is part of the Sutta Pitaka, containing verses composed by theris (women who were senior bhikkhunis) describing their experience of enlightenment.",
        questionType: "Textual Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u4_q6",
        questionNumber: 6,
        question: "Consider the following statements regarding Jaina philosophy:\nI. The most important idea in Jainism is that the entire world is animated.\nII. Asceticism and penance are required to free oneself from the cycle of karma.\nIII. Monastic existence is a necessary condition of salvation.\nWhich of the above statements are correct?",
        options: [
          { id: "A", text: "I and II only" },
          { id: "B", text: "II and III only" },
          { id: "C", text: "I and III only" },
          { id: "D", text: "I, II and III" },
        ],
        correctOption: "D",
        correctAnswer: "(D)",
        explanation: "All three statements accurately summarize core Jaina doctrines as detailed in NCERT Theme 1 Chapter 4.",
        questionType: "Multi-Statement Analysis",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u4_q7",
        questionNumber: 7,
        question: "Match the following places associated with the Buddha's life in List-I with their historical events in List-II:\nList-I:\n(A) Lumbini\n(B) Bodh Gaya\n(C) Sarnath\n(D) Kusinagara\n\nList-II:\n1. First sermon (Dharmachakrapravartana)\n2. Place of birth\n3. Attained enlightenment\n4. Passed away (Mahaparinirvana)",
        options: [
          { id: "A", text: "A-2, B-3, C-1, D-4" },
          { id: "B", text: "A-3, B-2, C-4, D-1" },
          { id: "C", text: "A-2, B-1, C-3, D-4" },
          { id: "D", text: "A-4, B-3, C-1, D-2" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Lumbini: Birth; Bodh Gaya: Enlightenment; Sarnath: First Sermon; Kusinagara: Parinirvana.",
        questionType: "Match The Following",
        type: "match-the-following",
        difficulty: "easy",
      },
      {
        id: "history_u4_q8",
        questionNumber: 8,
        question: "The famous woman figure swinging from the edge of the eastern gateway at Sanchi stupa, initially considered an erotic depiction by European scholars, represents which Indian auspicious motif?",
        options: [
          { id: "A", text: "Gajalakshmi" },
          { id: "B", text: "Shalabhanjika" },
          { id: "C", text: "Mayadevi" },
          { id: "D", text: "Yashodhara" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "According to popular belief, this was the shalabhanjika motif—a woman whose touch caused trees to flower and bear fruit, symbolizing auspiciousness.",
        questionType: "Art Historical Motif",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u4_q9",
        questionNumber: 9,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): Colin Mackenzie and Walter Elliot collected carved marble slabs from Amaravati and transported them away from the site.\nReason (R): 19th-century British officials believed that preserving original artifacts in metropolitan museums (Madras, London, Calcutta) was superior to leaving them in-situ at the original monument.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Officials felt original sculptures were safer in metropolitan museum collections, leading to the stripping of Amaravati. Archaeologist H.H. Cole differed, but his view was adopted only later at Sanchi.",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "medium",
      },
      {
        id: "history_u4_q10",
        questionNumber: 10,
        question: "Which of the following early temple architectural components refers to the small square room where the principal deity was installed?",
        options: [
          { id: "A", text: "Garbhagriha" },
          { id: "B", text: "Shikhara" },
          { id: "C", text: "Mandapa" },
          { id: "D", text: "Antarala" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "The early temple was a small square room called the 'garbhagriha', with a single doorway for a worshipper to enter and offer worship to the image.",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "Kinship, Caste and Class", topicId: "history_u3_t1", slug: "mahabharata-as-source-varna-and-jati-gender-and-property-access" },
      ],
      relatedTopics: [
        { title: "Medieval Society through Travellers Accounts", topicId: "history_u5_t1", slug: "al-biruni-ibn-battuta-francois-bernier-insights-on-society-and-caste" },
      ],
      practiceTestId: "practice-history-unit4-test1",
      practiceTestUrl: "/test/practice-history-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },
];
