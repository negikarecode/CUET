export const generalTestUnit4 = [
  // UNIT 4 - TOPIC 1: Syllogisms
  {
    id: "general-test-unit4-syllogisms",
    slug: "syllogisms",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 4,
    unitTitle: "Logical & Analytical Reasoning",
    topicTitle: "Syllogisms",
    ncertReference: {
      book: "CUET General Test / Logical & Analytical Reasoning",
      chapter: "Section 13: Categorical Propositions, Venn Tests & Deductive Syllogisms",
      pages: "Pages 449-486",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 105,
      weightagePercentage: 14.2,
    },
    thirtySecondSummary: [
      "Syllogisms assess formal deductive validity using standard categorical propositions (A, E, I, O statements) without regard to real-world empirical truth.",
      "The 4 Categorical Statements: Universal Affirmative ('All A are B' - A), Universal Negative ('No A is B' - E), Particular Affirmative ('Some A are B' - I), and Particular Negative ('Some A are not B' - O).",
      "Venn Diagram Testing: A conclusion follows definitively if and only if it holds true across ALL possible Venn representations of the premises.",
      "Definite vs. Possibility Cases: 'Some A being B is a possibility' is TRUE if there exists at least one valid Venn diagram where the condition is satisfied.",
      "Complementary Pairs (Either-Or): 'Some A are B' and 'No A is B' (I-E pair) or 'All A are B' and 'Some A are not B' (A-O pair) form an 'Either I or II follows' pair when both are individually false.",
    ],
    coreConcepts: [
      {
        title: "The Four Categorical Propositions (A, E, I, O)",
        explanation:
          "Classical syllogistic reasoning operates on four fundamental forms of proposition:\n1. Universal Affirmative (Type A): 'All S are P'\n  - Diagram: Circle S is entirely enclosed within circle P.\n  - Immediate valid conversion: 'Some P are S'. Note: 'All P are S' is NOT definitely valid.\n2. Universal Negative (Type E): 'No S is P'\n  - Diagram: Circle S and circle P are completely disjoint with zero overlap.\n  - Immediate valid conversion: 'No P is S' and 'Some S are not P'.\n3. Particular Affirmative (Type I): 'Some S are P'\n  - Diagram: Circle S and circle P have at least one common element in their intersection.\n  - Immediate valid conversion: 'Some P are S'.\n4. Particular Negative (Type O): 'Some S are not P'\n  - Diagram: At least a portion of circle S lies outside circle P.\n  - Does NOT allow direct conversion.",
        keyTakeaways: [
          "'All A are B' converts to 'Some B are A'.",
          "'No A is B' converts to 'No B is A'.",
          "'Some A are B' converts to 'Some B are A'.",
        ],
        ncertPointer:
          "CUET Logical Reasoning, Categorical Syllogisms & Venns, pp. 450-462.",
      },
      {
        title: "Two-Diagram Rule and Definite Conclusions",
        explanation:
          "To guarantee 100% accuracy in multi-statement syllogisms:\n1. Minimum Overlap (Basic) Diagram: Draw only the minimal intersections explicitly demanded by the premises.\n2. Maximum Overlap (Possibility) Diagram: Draw all allowable intersections that do not violate any negative premise.\n3. Definite Conclusion Rule: A conclusion is DEFINITE if it holds in both the basic diagram and all potential overlapping diagrams.\n4. Possibility Conclusion Rule: A possibility conclusion is VALID if it holds in at least one permissible diagram without contradicting the premises.",
        keyTakeaways: [
          "Definite conclusion: Must hold in ALL diagrams.",
          "Possibility conclusion: Needs to hold in AT LEAST ONE diagram.",
        ],
        ncertPointer:
          "CUET Reasoning Handbook, Multi-Diagram Syllogistic Validation, pp. 464-474.",
      },
      {
        title: "Complementary Pairs and 'Either-Or' Conditions",
        explanation:
          "When neither conclusion follows definitely, an 'Either-Or' relationship may exist if three strict conditions are fulfilled:\n1. Same Elements: Both conclusions share the exact same subject and predicate.\n2. Both Individually Invalid: Neither conclusion follows definitely on its own.\n3. Complementary Pair Forms:\n  - Pair 1: 'Some A are B' + 'No A is B' (I + E)\n  - Pair 2: 'All A are B' + 'Some A are not B' (A + O)\n  - Pair 3: 'Some A are B' + 'Some A are not B' (I + O) [in certain testing frameworks].\n  - Note: 'All' + 'No' (A + E) does NOT form an either-or pair because both can be false simultaneously.",
        keyTakeaways: [
          "Either-Or requires: Same elements, both individually false, and one affirmative + one negative.",
          "'All' and 'No' CANNOT form an Either-Or pair.",
        ],
        ncertPointer:
          "CUET General Test Guide, Complementary Logic & Either-Or Cases, pp. 476-486.",
      },
    ],
    keyFacts: [
      {
        concept: "Valid Conversions",
        formulaOrFact: "All A are B -> Some B are A | No A is B -> No B is A | Some A are B -> Some B are A",
        explanation: "Immediate deductive inferences that are unconditionally valid.",
        examTip: "Instantly validates converse statements without drawing circles.",
      },
      {
        concept: "Either-Or Pair Condition",
        formulaOrFact: "Some + No (I + E) OR All + Some Not (A + O)",
        explanation: "One must be true if the other is false.",
        examTip: "Both statements must be individually unproven.",
      },
      {
        concept: "Negative Premise Rule",
        formulaOrFact: "Two negative premises yield NO definite affirmative conclusion",
        explanation: "From 'No A is B' and 'No B is C', no definite relation exists between A and C.",
        examTip: "Instantly discard definite conclusions between disjoint sets.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="sylGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <filter id="shadowSyl" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f5f3ff" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#312e81">Syllogism Categorical Types & Venn Mappings for CUET</text>

  <!-- Venn 1: All A are B -->
  <g transform="translate(60, 60)" filter="url(#shadowSyl)">
    <rect width="165" height="150" rx="8" fill="#ffffff" stroke="#c7d2fe" stroke-width="1.5"/>
    <text x="82" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#4338ca" text-anchor="middle">Type A: All A are B</text>
    <circle cx="82" cy="85" r="45" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/>
    <text x="82" y="55" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#3730a3" text-anchor="middle">B</text>
    <circle cx="82" cy="95" r="22" fill="#c7d2fe" stroke="#4338ca" stroke-width="1.5"/>
    <text x="82" y="99" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#1e1b4b" text-anchor="middle">A</text>
    <text x="82" y="142" font-family="system-ui, sans-serif" font-size="9" fill="#64748b" text-anchor="middle">Valid: Some B are A</text>
  </g>

  <!-- Venn 2: No A is B -->
  <g transform="translate(265, 60)" filter="url(#shadowSyl)">
    <rect width="165" height="150" rx="8" fill="#ffffff" stroke="#c7d2fe" stroke-width="1.5"/>
    <text x="82" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#4338ca" text-anchor="middle">Type E: No A is B</text>
    <circle cx="48" cy="85" r="28" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
    <text x="48" y="89" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#991b1b" text-anchor="middle">A</text>
    <circle cx="116" cy="85" r="28" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
    <text x="116" y="89" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#991b1b" text-anchor="middle">B</text>
    <line x1="76" y1="85" x2="88" y2="85" stroke="#b91c1c" stroke-width="2"/>
    <text x="82" y="142" font-family="system-ui, sans-serif" font-size="9" fill="#64748b" text-anchor="middle">Disjoint sets: A ∩ B = ∅</text>
  </g>

  <!-- Venn 3: Some A are B -->
  <g transform="translate(470, 60)" filter="url(#shadowSyl)">
    <rect width="165" height="150" rx="8" fill="#ffffff" stroke="#c7d2fe" stroke-width="1.5"/>
    <text x="82" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#4338ca" text-anchor="middle">Type I: Some A are B</text>
    <circle cx="62" cy="85" r="32" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
    <text x="45" y="89" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#065f46" text-anchor="middle">A</text>
    <circle cx="102" cy="85" r="32" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
    <text x="120" y="89" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#065f46" text-anchor="middle">B</text>
    <text x="82" y="142" font-family="system-ui, sans-serif" font-size="9" fill="#64748b" text-anchor="middle">Overlap: A ∩ B ≠ ∅</text>
  </g>

  <!-- Summary Box -->
  <rect x="60" y="230" width="580" height="65" rx="8" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.2"/>
  <text x="350" y="254" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#312e81" text-anchor="middle">Either-Or Requirements: Same Subject-Predicate + Individually Invalid + Complementary Pair</text>
  <text x="350" y="276" font-family="system-ui, sans-serif" font-size="11" fill="#4338ca" text-anchor="middle">Valid Either-Or Pairs: (Some + No) OR (All + Some Not) | 'All' and 'No' NEVER form Either-Or</text>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u4-we1",
        questionNumber: 1,
        question:
          "Statements:\n1. All cats are dogs.\n2. All dogs are birds.\nConclusions:\nI. All cats are birds.\nII. Some birds are cats.\nSelect the correct option:",
        options: [
          { id: "A", text: "Only Conclusion I follows" },
          { id: "B", text: "Only Conclusion II follows" },
          { id: "C", text: "Both Conclusion I and II follow" },
          { id: "D", text: "Neither Conclusion I nor II follows" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Represent the premises diagrammatically:\n  - Premise 1: Circle 'Cats' is completely enclosed inside Circle 'Dogs'.\n  - Premise 2: Circle 'Dogs' is completely enclosed inside Circle 'Birds'.",
          "Step 2: Transitive property: Since Cats ⊆ Dogs and Dogs ⊆ Birds, Cats ⊆ Birds. Therefore, 'All cats are birds' (Conclusion I) is 100% definitely true.",
          "Step 3: Since Cats ⊆ Birds, the region occupied by Cats constitutes a non-empty subset of Birds. Therefore, 'Some birds are cats' (Conclusion II) is also definitely true.",
          "Step 4: Both conclusions I and II follow.",
        ],
        cuetInsight:
          "Universal affirmative chains (All A are B, All B are C) are transitive: All A are C, and Some C are A.",
      },
      {
        id: "general-test-u4-we2",
        questionNumber: 2,
        question:
          "Statements:\n1. Some pens are books.\n2. All books are pencils.\nConclusions:\nI. Some pencils are pens.\nII. No pencil is a pen.\nSelect the correct option:",
        options: [
          { id: "A", text: "Only Conclusion I follows" },
          { id: "B", text: "Only Conclusion II follows" },
          { id: "C", text: "Either Conclusion I or II follows" },
          { id: "D", text: "Neither Conclusion I nor II follows" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Analyze Premise 1: Pens and Books overlap (Some Pens are Books).\n  - Premise 2: All Books are inside Pencils.",
          "Step 2: Because the intersection between Pens and Books is inside Pencils, that same overlapping region is also shared between Pencils and Pens.",
          "Step 3: Therefore, 'Some pencils are pens' is DEFINITELY TRUE (Conclusion I follows).",
          "Step 4: Since Conclusion I is definitely true, Conclusion II ('No pencil is a pen') is definitely false.",
          "Step 5: Only Conclusion I follows.",
        ],
        cuetInsight:
          "Do not be tempted to mark 'Either-Or' simply because 'Some' and 'No' appear. If one conclusion is definitely true, Either-Or does NOT apply.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Two-Statement Classic Syllogism",
        frequency: "Very High",
        typicalStem: "Statements: All cars are buses. Some buses are trucks. Conclusions: (I) Some cars are trucks. (II) No car is truck.",
        strategy:
          "Check whether the two conclusions form an Either-Or complementary pair (Some + No with same elements, neither follows definitely).",
      },
      {
        patternType: "Possibility Checking",
        frequency: "High",
        typicalStem: "Conclusions: Some apples being oranges is a possibility.",
        strategy: "If apples and oranges have no negative restriction separating them, the possibility is VALID.",
      },
    ],
    commonTraps: [
      {
        trap: "Applying real-world facts to syllogisms",
        whyStudentsFail: "Rejecting 'All dogs are birds' because dogs cannot fly in real life.",
        howToAvoid: "Treat the statements as absolute mathematical axioms regardless of biological reality.",
      },
      {
        trap: "Choosing Either-Or for 'All' + 'No'",
        whyStudentsFail: "Thinking 'All A are B' and 'No A is B' are complementary.",
        howToAvoid: "Both can be simultaneously false if 'Some A are B and Some A are not B'. Hence A+E is NOT an Either-Or pair.",
      },
    ],
    mnemonics: [
      {
        concept: "Valid Either-Or Pairs",
        mnemonic: "S-N or A-S-N (Some + No OR All + Some Not)",
        explanation:
          "The only two pairs that form valid Either-Or relationships.",
      },
    ],
    quickRevisionCard: {
      title: "Syllogisms High-Yield Points",
      bulletPoints: [
        "Ignore real-world truth; follow formal logical validity only.",
        "'All A are B' -> Some B are A is valid; All B are A is NOT valid.",
        "'Some A are B' -> Some B are A is valid.",
        "'No A is B' -> No B is A is valid.",
        "Definite conclusion: Must hold across ALL valid Venn diagrams.",
        "Possibility conclusion: Valid if it holds in AT LEAST ONE valid diagram.",
        "Either-Or pair: (Some + No) or (All + Some Not) with identical elements.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u4-t1-q1",
        question:
          "Statements:\n1. All mangoes are fruits.\n2. All fruits are sweet.\nConclusions:\nI. All mangoes are sweet.\nII. Some sweet things are mangoes.\nWhich conclusion(s) follow?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only Conclusion I follows" },
          { id: "B", text: "Only Conclusion II follows" },
          { id: "C", text: "Both Conclusion I and II follow" },
          { id: "D", text: "Neither Conclusion I nor II follows" },
        ],
        correctOption: "C",
        explanation:
          "Mangoes ⊆ Fruits and Fruits ⊆ Sweet -> Mangoes ⊆ Sweet (Conclusion I follows). Since Mangoes ⊆ Sweet, Some Sweet are Mangoes (Conclusion II follows). Both follow.",
      },
      {
        id: "general-test-u4-t1-q2",
        question:
          "Statements:\n1. Some actors are singers.\n2. All singers are dancers.\nConclusions:\nI. Some actors are dancers.\nII. No singer is an actor.\nWhich conclusion(s) follow?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only Conclusion I follows" },
          { id: "B", text: "Only Conclusion II follows" },
          { id: "C", text: "Either I or II follows" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "A",
        explanation:
          "Actors and Singers overlap, and all Singers are inside Dancers, so the overlapping portion is inside Dancers -> 'Some actors are dancers' is true. 'Some actors are singers' converts to 'Some singers are actors', contradicting Conclusion II.",
      },
      {
        id: "general-test-u4-t1-q3",
        question:
          "Statements:\n1. Some papers are pens.\n2. No pen is a pencil.\nConclusions:\nI. Some papers are not pencils.\nII. Some pencils are not papers.\nWhich conclusion(s) follow?",
        type: "standard",
        difficulty: "hard",
        options: [
          { id: "A", text: "Only Conclusion I follows" },
          { id: "B", text: "Only Conclusion II follows" },
          { id: "C", text: "Both I and II follow" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "A",
        explanation:
          "The portion of papers that are pens CANNOT be pencils because no pen is a pencil. Thus, 'Some papers are not pencils' is DEFINITELY TRUE. However, all pencils could theoretically be papers without touching pens, so II does not definitely follow.",
      },
      {
        id: "general-test-u4-t1-q4",
        question:
          "Statements:\n1. All flowers are trees.\n2. No tree is a fruit.\nConclusions:\nI. No flower is a fruit.\nII. Some trees are flowers.\nWhich conclusion(s) follow?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Only Conclusion I follows" },
          { id: "B", text: "Only Conclusion II follows" },
          { id: "C", text: "Both Conclusion I and II follow" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "C",
        explanation:
          "Since Flowers are completely inside Trees, and no Tree is a Fruit, no Flower can be a Fruit (Conclusion I follows). Since Flowers ⊆ Trees, Some Trees are Flowers (Conclusion II follows). Both follow.",
      },
      {
        id: "general-test-u4-t1-q5",
        question:
          "Assertion (A): In syllogisms, the conclusion 'Some B are A' follows necessarily from the premise 'All A are B'.\nReason (R): The universal affirmative proposition (Type A) allows an immediate valid conversion by limitation to a particular affirmative proposition (Type I).",
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
          "Both statements are true and (R) provides the exact classical Aristotelian logic rule (conversion per accidens / by limitation).",
      },
      {
        id: "general-test-u4-t1-q6",
        question:
          "Statements:\n1. Some roads are streets.\n2. Some streets are lanes.\nConclusions:\nI. Some roads are lanes.\nII. No road is a lane.\nWhich option is correct?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Only Conclusion I follows" },
          { id: "B", text: "Only Conclusion II follows" },
          { id: "C", text: "Either Conclusion I or II follows" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "C",
        explanation:
          "From two particular premises (Some + Some), no definite conclusion follows between roads and lanes. Thus, I and II are individually uncertain. Since they form an I-E pair ('Some' + 'No') with identical subject and predicate, they form an Either-Or pair.",
      },
      {
        id: "general-test-u4-t1-q7",
        question:
          "Match List-I (Statement Type) with List-II (Categorical Code):\n(P) All A are B — 1. Universal Affirmative (A)\n(Q) No A is B — 2. Universal Negative (E)\n(R) Some A are B — 3. Particular Affirmative (I)\n(S) Some A are not B — 4. Particular Negative (O)",
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
          "Standard Aristotelian categorical proposition classifications.",
      },
      {
        id: "general-test-u4-t1-q8",
        question:
          "Statements:\n1. All cups are plates.\n2. Some plates are bowls.\nConclusions:\nI. All cups being bowls is a possibility.\nII. Some bowls are plates.\nWhich conclusion(s) follow?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Only Conclusion I follows" },
          { id: "B", text: "Only Conclusion II follows" },
          { id: "C", text: "Both Conclusion I and II follow" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "C",
        explanation:
          "There is no negative premise restricting cups and bowls, so all cups can be bowls (possibility I is valid). 'Some plates are bowls' converts directly to 'Some bowls are plates' (II follows). Both follow.",
      },
      {
        id: "general-test-u4-t1-q9",
        question:
          "Statements:\n1. No door is a window.\n2. No window is a roof.\nConclusions:\nI. No door is a roof.\nII. All roofs are doors.\nWhich conclusion(s) follow?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Only I follows" },
          { id: "B", text: "Only II follows" },
          { id: "C", text: "Either I or II follows" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "D",
        explanation:
          "Two negative premises yield no definite conclusion between doors and roofs. They could overlap, be disjoint, or one could be inside the other. Neither follows, and 'No' + 'All' cannot form an Either-Or pair.",
      },
      {
        id: "general-test-u4-t1-q10",
        question:
          "Statements:\n1. All rivers are oceans.\n2. All oceans are waters.\nConclusions:\nI. All waters are rivers.\nII. Some oceans are rivers.\nWhich conclusion(s) follow?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only Conclusion I follows" },
          { id: "B", text: "Only Conclusion II follows" },
          { id: "C", text: "Both follow" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "B",
        explanation:
          "Rivers ⊆ Oceans ⊆ Waters. All waters are rivers is an invalid converse. However, since Rivers ⊆ Oceans, Some Oceans are Rivers is definitely true. Only II follows.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["venn-diagrams", "statement-and-assumptions"],
      practiceTestId: "practice-general-test-unit4-test1",
      practiceTestUrl: "/test/practice-general-test-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 4 - TOPIC 2: Venn Diagrams
  {
    id: "general-test-unit4-venn-diagrams",
    slug: "venn-diagrams",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 4,
    unitTitle: "Logical & Analytical Reasoning",
    topicTitle: "Venn Diagrams",
    ncertReference: {
      book: "CUET General Test / Logical & Analytical Reasoning",
      chapter: "Section 14: Geometric Sets, Region Intersections & Class Inclusions",
      pages: "Pages 487-520",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 99,
      weightagePercentage: 13.8,
    },
    thirtySecondSummary: [
      "Venn Diagrams evaluate set-theoretic relationships among classes of objects, entities, and professions using overlapping closed geometric figures (circles, rectangles, triangles).",
      "Two Primary Formats in CUET: Identification of best-fit 3-circle Venn models, and numerical region analysis (finding numbers belonging to specific intersecting regions).",
      "Core 3-Class Archetypes: Completely concentric (Father, Male, Human Being), mutually disjoint (Dog, Cat, Cow), intersecting pairs (Teachers, Authors, Women), and subset with disjoint (Mammals, Whales, Reptiles).",
      "Numerical Region Strategy: Carefully isolate conditional keywords: 'ONLY A', 'A and B but NOT C', 'At least two', 'At most one'.",
      "Cardinal Formula: n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A ∩ B) - n(B ∩ C) - n(A ∩ C) + n(A ∩ B ∩ C).",
    ],
    coreConcepts: [
      {
        title: "The Standard 3-Class Conceptual Archetypes",
        explanation:
          "Matching real-world classes to spatial Venn representations:\n1. All-Inclusive Concentric Circles (A ⊂ B ⊂ C):\n  - Example: Seconds, Minutes, Hours or Patna, Bihar, India.\n2. Mutually Disjoint (Zero Overlap):\n  - Example: Doctors, Engineers, Lawyers (distinct professional qualifications).\n3. One Enclosed, One Disjoint:\n  - Example: Mammals, Cows, Birds (Cows ⊂ Mammals, Birds disjoint from both).\n4. Two Disjoint Inside a Super-Class:\n  - Example: Animals, Dogs, Cats (Dogs and Cats are disjoint, but both ⊂ Animals).\n5. Partial 3-Way Overlap (Venn Triad):\n  - Example: Women, Mothers, Doctors (All Mothers are Women; some Women are Doctors; some Mothers are Doctors).",
        keyTakeaways: [
          "Check whether one class is an absolute subset of another.",
          "Identify mutually exclusive professional or biological categories.",
        ],
        ncertPointer:
          "CUET General Test Mental Ability, Set Relationships & Venn Archetypes, pp. 488-500.",
      },
      {
        title: "Numerical Region Decoding and Conditional Keywords",
        explanation:
          "Reading geometric region figures (circle represents tennis players, triangle represents cricket players, rectangle represents hockey players):\n1. 'Only Tennis': Region inside circle strictly outside triangle and rectangle.\n2. 'Tennis and Cricket': Intersection of circle and triangle.\n3. 'Tennis and Cricket but NOT Hockey': Region in circle ∩ triangle that lies outside the rectangle.\n4. 'At least two sports': Sum of all regions where two or more shapes overlap (pair intersections + central triple intersection).\n5. 'Exactly one sport': Sum of the three solitary unshared regions.",
        keyTakeaways: [
          "'Only' excludes all other intersecting boundaries.",
          "'At least two' includes double-overlap and triple-overlap regions.",
        ],
        ncertPointer:
          "CUET Reasoning Handbook, Quantitative Venn Intersections, pp. 502-512.",
      },
      {
        title: "Principle of Inclusion-Exclusion for Three Sets",
        explanation:
          "Mathematical quantification of overlapping groups:\n1. For 2 Sets:\n  - n(A ∪ B) = n(A) + n(B) - n(A ∩ B).\n2. For 3 Sets:\n  - n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - [n(A ∩ B) + n(B ∩ C) + n(A ∩ C)] + n(A ∩ B ∩ C).\n3. Elements in EXACTLY ONE set = n(A) + n(B) + n(C) - 2[Sum of pairs] + 3[Intersection of all three].\n4. Elements in EXACTLY TWO sets = [Sum of pairs] - 3[Intersection of all three].",
        keyTakeaways: [
          "Central triple intersection is subtracted twice in pair overlaps, so it must be added back in n(A ∪ B ∪ C).",
        ],
        ncertPointer:
          "CUET Quantitative & Logical Reasoning, pp. 514-520.",
      },
    ],
    keyFacts: [
      {
        concept: "All Mothers are Women",
        formulaOrFact: "Mothers ⊂ Women (Concentric subset)",
        explanation: "Every biological mother is a woman, establishing an internal circle.",
        examTip: "High-frequency archetype in CUET options.",
      },
      {
        concept: "2-Set Inclusion-Exclusion",
        formulaOrFact: "n(A ∪ B) = n(A) + n(B) - n(A ∩ B)",
        explanation: "Subtracts duplicated intersection once.",
        examTip: "Solves survey questions (e.g., students reading Hindi and English).",
      },
      {
        concept: "Conditional 'Only' Filter",
        formulaOrFact: "Only X = X - (X ∩ Y) - (X ∩ Z) + (X ∩ Y ∩ Z)",
        explanation: "Isolates members belonging exclusively to set X.",
        examTip: "Look for numbers in non-overlapping regions.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <filter id="shadowVenn" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f8fafc" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#0f172a">Three-Set Venn Diagram Region Anatomy for CUET</text>

  <!-- Left: 3 Overlapping Circles -->
  <g transform="translate(190, 160)">
    <!-- Circle A (Top) -->
    <circle cx="0" cy="-45" r="70" fill="#3b82f6" fill-opacity="0.25" stroke="#2563eb" stroke-width="2"/>
    <text x="0" y="-85" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#1d4ed8" text-anchor="middle">Set A</text>
    <text x="0" y="-55" font-family="monospace" font-size="11" font-weight="700" fill="#1e3a8a" text-anchor="middle">Only A</text>

    <!-- Circle B (Bottom Left) -->
    <circle cx="-50" cy="40" r="70" fill="#10b981" fill-opacity="0.25" stroke="#059669" stroke-width="2"/>
    <text x="-95" y="85" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#047857" text-anchor="middle">Set B</text>
    <text x="-55" y="50" font-family="monospace" font-size="11" font-weight="700" fill="#065f46" text-anchor="middle">Only B</text>

    <!-- Circle C (Bottom Right) -->
    <circle cx="50" cy="40" r="70" fill="#f59e0b" fill-opacity="0.25" stroke="#d97706" stroke-width="2"/>
    <text x="95" y="85" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#b45309" text-anchor="middle">Set C</text>
    <text x="55" y="50" font-family="monospace" font-size="11" font-weight="700" fill="#92400e" text-anchor="middle">Only C</text>

    <!-- Overlaps -->
    <text x="-32" y="-5" font-family="monospace" font-size="9.5" font-weight="700" fill="#0f172a" text-anchor="middle">A∩B</text>
    <text x="32" y="-5" font-family="monospace" font-size="9.5" font-weight="700" fill="#0f172a" text-anchor="middle">A∩C</text>
    <text x="0" y="65" font-family="monospace" font-size="9.5" font-weight="700" fill="#0f172a" text-anchor="middle">B∩C</text>
    <text x="0" y="20" font-family="monospace" font-size="10" font-weight="700" fill="#dc2626" text-anchor="middle">A∩B∩C</text>
  </g>

  <!-- Right: Common Real-World Archetypes -->
  <g transform="translate(390, 60)" filter="url(#shadowVenn)">
    <rect width="270" height="230" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="270" height="38" rx="8" fill="#1e3a8a"/>
    <text x="135" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">High-Frequency CUET Archetypes</text>
    
    <text x="15" y="68" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e3a8a">1. Concentric Subset:</text>
    <text x="25" y="86" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Minutes ⊂ Hours ⊂ Days</text>
    
    <text x="15" y="112" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e3a8a">2. Mutually Disjoint:</text>
    <text x="25" y="130" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Doctors, Engineers, Lawyers</text>
    
    <text x="15" y="156" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e3a8a">3. One Subset + One Intersect:</text>
    <text x="25" y="174" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Mothers ⊂ Women; Doctors overlap</text>
    
    <text x="15" y="200" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e3a8a">4. Two Subsets in Universal:</text>
    <text x="25" y="218" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Dogs & Cats inside Animals</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u4-we3",
        questionNumber: 1,
        question:
          "Which of the following Venn diagrams best represents the relationship among:\n'Mammals', 'Cows', and 'Crows'?",
        options: [
          { id: "A", text: "One circle inside another circle, with a third circle completely outside" },
          { id: "B", text: "Three concentric circles" },
          { id: "C", text: "Three mutually intersecting circles" },
          { id: "D", text: "Three completely separate disjoint circles" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Analyze the relationship between 'Cows' and 'Mammals': All cows are mammals. Therefore, the circle for 'Cows' must be completely enclosed inside the circle for 'Mammals' (Cows ⊂ Mammals).",
          "Step 2: Analyze 'Crows': Crows are aves (birds), not mammals. Crows are also disjoint from cows.",
          "Step 3: Therefore, the circle for 'Crows' must be completely separate from both the 'Cows' and 'Mammals' circles.",
          "Step 4: This matches Option A (one circle inside another, and a third circle outside).",
        ],
        cuetInsight:
          "Class-inclusion hierarchy questions are solved by checking biological or physical taxonomy.",
      },
      {
        id: "general-test-u4-we4",
        questionNumber: 2,
        question:
          "In a class of 50 students, 30 play cricket, 25 play football, and 10 play both cricket and football. How many students play neither cricket nor football?",
        options: [
          { id: "A", text: "5" },
          { id: "B", text: "10" },
          { id: "C", text: "15" },
          { id: "D", text: "20" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Use the 2-set inclusion-exclusion formula:\n  - n(C ∪ F) = n(C) + n(F) - n(C ∩ F).",
          "Step 2: Substitute values:\n  - n(C ∪ F) = 30 + 25 - 10 = 55 - 10 = 45 students play at least one sport.",
          "Step 3: Total students = 50.",
          "Step 4: Students playing neither = Total - n(C ∪ F) = 50 - 45 = 5 students.",
        ],
        cuetInsight:
          "Always subtract the intersection so you don't double count students playing both games.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Venn Diagram Selection for 3 Words",
        frequency: "Very High",
        typicalStem: "Which of the following diagrams indicates the best relation between Travelers, Train, and Bus?",
        strategy: "Some travelers travel by train, some by bus; train and bus are separate vehicles.",
      },
      {
        patternType: "Numerical Region Finding",
        frequency: "High",
        typicalStem: "In the given figure, which number represents honest and hardworking rural people?",
        strategy: "Find the intersection region common to all three specified shapes.",
      },
    ],
    commonTraps: [
      {
        trap: "Confusing 'Mothers, Women, Doctors'",
        whyStudentsFail: "Drawing three intersecting circles instead of making Mothers an internal subset of Women.",
        howToAvoid: "All mothers are female/women by definition; Mothers must lie entirely inside Women.",
      },
      {
        trap: "Overlooking 'Neither' in survey questions",
        whyStudentsFail: "Assuming n(A ∪ B) equals total students in the school.",
        howToAvoid: "Check whether some students play no sports or learn no languages.",
      },
    ],
    mnemonics: [
      {
        concept: "Venn Selection Check",
        mnemonic: "S-D-I (Subset, Disjoint, Intersect)",
        explanation:
          "Classify every pair among the 3 words as either Subset (⊂), Disjoint (∅), or Intersecting (∩).",
      },
    ],
    quickRevisionCard: {
      title: "Venn Diagrams High-Yield Points",
      bulletPoints: [
        "All A are B -> Circle A inside Circle B.",
        "No A is B -> Circle A and B disjoint.",
        "Some A are B -> Circles A and B overlap.",
        "Mothers ⊂ Women (All mothers are women).",
        "n(A ∪ B) = n(A) + n(B) - n(A ∩ B).",
        "'Neither' = Total - n(A ∪ B).",
        "'Only A' = Region belonging strictly to A and no other shape.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u4-t2-q1",
        question:
          "Which of the following diagrams represents the correct relationship among:\n'India', 'Delhi', and 'Asia'?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Three concentric circles" },
          { id: "B", text: "Two circles intersecting inside a third circle" },
          { id: "C", text: "Three mutually intersecting circles" },
          { id: "D", text: "Three separate disjoint circles" },
        ],
        correctOption: "A",
        explanation:
          "Delhi is located inside India, and India is located inside Asia. Hence, it is represented by three concentric circles (Delhi ⊂ India ⊂ Asia).",
      },
      {
        id: "general-test-u4-t2-q2",
        question:
          "Which Venn diagram best represents the relationship among:\n'Vegetables', 'Potato', and 'Apple'?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "One circle inside another, with a third circle disjoint outside" },
          { id: "B", text: "Three concentric circles" },
          { id: "C", text: "Three intersecting circles" },
          { id: "D", text: "Two intersecting circles inside a third" },
        ],
        correctOption: "A",
        explanation:
          "Potato is a vegetable (Potato ⊂ Vegetables). Apple is a fruit, completely separate from vegetables. Hence, one circle inside another with a third disjoint circle.",
      },
      {
        id: "general-test-u4-t2-q3",
        question:
          "In a group of 60 people, 35 like tea, 30 like coffee, and 15 like both. How many people like only tea?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "15" },
          { id: "B", text: "20" },
          { id: "C", text: "25" },
          { id: "D", text: "30" },
        ],
        correctOption: "B",
        explanation:
          "People who like only tea = Total who like tea - People who like both = 35 - 15 = 20.",
      },
      {
        id: "general-test-u4-t2-q4",
        question:
          "Which diagram best represents the relationship among:\n'Women', 'Mothers', and 'Engineers'?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "One circle inside another circle, with a third circle intersecting both" },
          { id: "B", text: "Three concentric circles" },
          { id: "C", text: "Three completely disjoint circles" },
          { id: "D", text: "Two intersecting circles inside a third" },
        ],
        correctOption: "A",
        explanation:
          "All mothers are women (Mothers ⊂ Women). Some mothers and some women are engineers, while some engineers are men. Thus, the Engineers circle intersects both Mothers and Women.",
      },
      {
        id: "general-test-u4-t2-q5",
        question:
          "Assertion (A): The Venn diagram for 'Doctors', 'Lawyers', and 'Professionals' consists of two disjoint circles inside a larger circle.\nReason (R): Doctors and Lawyers are distinct, mutually exclusive professional practices, but both belong to the overarching category of Professionals.",
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
          "Both statements are true and (R) correctly explains why Doctors and Lawyers do not overlap but both lie inside Professionals.",
      },
      {
        id: "general-test-u4-t2-q6",
        question:
          "In a survey of 100 students, 60 study Mathematics, 45 study Physics, and 20 study both. How many students study neither Mathematics nor Physics?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "10" },
          { id: "B", text: "15" },
          { id: "C", text: "20" },
          { id: "D", text: "25" },
        ],
        correctOption: "B",
        explanation:
          "n(M ∪ P) = n(M) + n(P) - n(M ∩ P) = 60 + 45 - 20 = 85.\nNeither = 100 - 85 = 15.",
      },
      {
        id: "general-test-u4-t2-q7",
        question:
          "Which diagram best represents the relationship among:\n'Dogs', 'Pets', and 'Animals'?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "One circle inside another circle, with a third circle intersecting both inside the outer circle" },
          { id: "B", text: "Three concentric circles" },
          { id: "C", text: "Three disjoint circles" },
          { id: "D", text: "Two disjoint circles inside a third" },
        ],
        correctOption: "A",
        explanation:
          "All dogs are animals (Dogs ⊂ Animals). Some dogs are pets, and some pets are animals other than dogs (e.g., cats, birds), while all pet animals lie inside Animals.",
      },
      {
        id: "general-test-u4-t2-q8",
        question:
          "Match List-I (Group Trio) with List-II (Venn Diagram Description):\n(P) Seconds, Minutes, Hours — 1. Three concentric circles\n(Q) Lions, Carnivores, Cows — 2. One circle inside another, third circle disjoint\n(R) Cats, Dogs, Pets — 3. Two circles intersecting a central third circle\n(S) Gold, Silver, Metals — 4. Two disjoint circles inside a third circle",
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
          "Standard Venn diagram structural associations.",
      },
      {
        id: "general-test-u4-t2-q9",
        question:
          "Which representation fits 'Table', 'Chair', and 'Furniture'?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Two disjoint circles inside a larger circle" },
          { id: "B", text: "Three concentric circles" },
          { id: "C", text: "Three mutually intersecting circles" },
          { id: "D", text: "Three separate circles" },
        ],
        correctOption: "A",
        explanation:
          "Tables and Chairs are distinct types of items (disjoint), but both are items of Furniture. Represented by two disjoint circles inside a larger circle.",
      },
      {
        id: "general-test-u4-t2-q10",
        question:
          "In a sports club of 40 members, 28 play Badminton, 20 play Tennis, and 12 play both. How many members play only Tennis?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "8" },
          { id: "B", text: "12" },
          { id: "C", text: "16" },
          { id: "D", text: "20" },
        ],
        correctOption: "A",
        explanation:
          "Members playing only Tennis = Total playing Tennis - Playing both = 20 - 12 = 8.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["syllogisms", "statement-and-assumptions"],
      practiceTestId: "practice-general-test-unit4-test1",
      practiceTestUrl: "/test/practice-general-test-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 4 - TOPIC 3: Statement & Assumptions
  {
    id: "general-test-unit4-statement-and-assumptions",
    slug: "statement-and-assumptions",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 4,
    unitTitle: "Logical & Analytical Reasoning",
    topicTitle: "Statement & Assumptions",
    ncertReference: {
      book: "CUET General Test / Logical & Analytical Reasoning",
      chapter: "Section 15: Critical Reasoning, Implicit Premises & Argument Validity",
      pages: "Pages 521-552",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 94,
      weightagePercentage: 13.0,
    },
    thirtySecondSummary: [
      "Statement & Assumptions evaluates implicit premises that an author or speaker takes for granted without stating them explicitly.",
      "Definition of Assumption: An assumption is something supposed, unstated, or taken for granted upon which the entire statement rests.",
      "The Negation Test: If negating the assumption collapses or renders the statement irrational, the assumption is 100% IMPLICIT.",
      "Advertisements & Notices: An advertisement implicitly assumes people will read it, respond positively, and that the product fulfills its claim. A public warning assumes people will heed the advisory.",
      "Common Traps: Avoid extreme words ('only', 'never', 'all', 'always') in assumptions unless the statement is explicitly absolute.",
    ],
    coreConcepts: [
      {
        title: "Nature of an Implicit Assumption and the Negation Test",
        explanation:
          "An assumption is the unmentioned foundational pillar of an argument:\n1. Implicit vs. Explicit: Explicit is what is said; Implicit is what must be true for what is said to make sense.\n2. The Golden Negation Test:\n  - Statement: 'Buy our water purifier to ensure your family's health.'\n  - Assumption: 'Pure drinking water is necessary for good health.'\n  - Negate Assumption: 'Pure drinking water is NOT necessary for good health.'\n  - If drinking pure water has nothing to do with health, advertising a purifier to ensure health becomes nonsensical. The argument collapses!\n  - Therefore, the assumption is IMPLICIT.",
        keyTakeaways: [
          "Assumption is an unstated bridge connecting premises to conclusion.",
          "Negation test: If negating destroys the statement's logic, it is implicit.",
        ],
        ncertPointer:
          "CUET Critical Reasoning, Implicit Assumptions & Logic Gates, pp. 522-534.",
      },
      {
        title: "Notices, Warnings, Appeals, and Advertisements",
        explanation:
          "Institutional communications rely on predictable implicit premises:\n1. Public Warnings & Notices:\n  - Statement: 'Trespassers will be prosecuted.'\n  - Assumption: 'People read notices and fear legal prosecution.' (Implicit).\n2. Advertisements:\n  - Statement: 'Enroll in coaching institute X for guaranteed CUET success.'\n  - Assumption: 'Aspirants desire CUET success and believe coaching aids performance.' (Implicit).\n3. Appeals & Government Advisories:\n  - Statement: 'Donate generously to the Prime Minister's Relief Fund.'\n  - Assumption: 'Citizens possess funds and are willing to donate for humanitarian causes.' (Implicit).",
        keyTakeaways: [
          "Advertisements assume positive customer response.",
          "Warnings assume public compliance and deterrence.",
        ],
        ncertPointer:
          "CUET General Test Guide, Institutional Notices & Assumptions, pp. 536-544.",
      },
      {
        title: "Red Flags and Faulty Assumptions",
        explanation:
          "Identifying flawed or non-implicit assertions:\n1. Extreme Words: Assumptions containing absolute words like 'only', 'all', 'never', 'always', or 'every' are rarely implicit unless the statement uses identical extremes.\n2. External Knowledge / Out of Context: Introducing facts or opinions not directly required by the statement is a non-implicit fallacy.\n3. Restating the Statement: An assumption cannot be a verbatim repetition of the statement; it must be an underlying prerequisite.",
        keyTakeaways: [
          "Beware of 'only', 'all', 'never', and 'best'.",
          "An assumption must not repeat the statement.",
        ],
        ncertPointer:
          "CUET Reasoning Handbook, Critical Fallacies & Logical Traps, pp. 546-552.",
      },
    ],
    keyFacts: [
      {
        concept: "Negation Test Rule",
        formulaOrFact: "Negate Assumption -> Argument Collapses -> Assumption is Implicit",
        explanation: "Falsification test for validating unstated premises.",
        examTip: "The most reliable test for confusing statement-assumption questions.",
      },
      {
        concept: "Advertisements Assumption",
        formulaOrFact: "People read advertisements and react favorably",
        explanation: "No organization spends money advertising without assuming public reception.",
        examTip: "Always mark such commercial assumptions as implicit.",
      },
      {
        concept: "Extreme Words Filter",
        formulaOrFact: "Words like 'Only', 'All', 'Never', 'Always' invalidate assumptions",
        explanation: "Assumptions cannot be broader or more extreme than the statement.",
        examTip: "Instantly eliminate options with unqualified superlatives.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="assGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <filter id="shadowAss" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f8fafc" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#0f172a">Critical Reasoning: Statement & Assumption Architecture</text>

  <!-- Left: The Bridge Concept -->
  <g transform="translate(50, 60)" filter="url(#shadowAss)">
    <rect width="280" height="230" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="280" height="38" rx="8" fill="url(#assGrad)"/>
    <text x="140" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">The Negation Test Bridge</text>
    
    <rect x="25" y="55" width="230" height="36" rx="5" fill="#f1f5f9" stroke="#94a3b8"/>
    <text x="140" y="78" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Given Statement (Explicit)</text>

    <!-- Pillar Bridge -->
    <path d="M 140 91 L 140 120" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow)"/>

    <rect x="25" y="125" width="230" height="42" rx="5" fill="#e0f2fe" stroke="#38bdf8"/>
    <text x="140" y="144" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#0369a1" text-anchor="middle">Implicit Assumption (Unstated Foundation)</text>
    <text x="140" y="159" font-family="system-ui, sans-serif" font-size="9" fill="#0284c7" text-anchor="middle">Without this, statement collapses</text>

    <rect x="25" y="180" width="230" height="38" rx="5" fill="#fee2e2" stroke="#f87171"/>
    <text x="140" y="204" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#991b1b" text-anchor="middle">If Negation Destroys Logic -> VALID</text>
  </g>

  <!-- Right: Validity Criteria -->
  <g transform="translate(370, 60)" filter="url(#shadowAss)">
    <rect width="280" height="230" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="280" height="38" rx="8" fill="#0369a1"/>
    <text x="140" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Rules for Assumption Validity</text>
    
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#047857">✓ Valid Assumptions:</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Notices will be read & obeyed</text>
    <text x="25" y="100" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Advertisements attract consumers</text>
    <text x="25" y="116" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Advisories mitigate accidents</text>

    <text x="15" y="146" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#b91c1c">✗ Invalid Assumptions (Red Flags):</text>
    <text x="25" y="164" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Words: ONLY, ALL, NEVER, ALWAYS</text>
    <text x="25" y="180" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• External knowledge beyond statement</text>
    <text x="25" y="196" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Verbatim repetition of statement</text>
    <text x="25" y="212" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Superlatives: 'Best', 'Cheapest'</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u4-we5",
        questionNumber: 1,
        question:
          "Statement: 'Please do not lean out of the train window while the train is in motion.' — A notice in a railway compartment.\nAssumptions:\nI. Leaning out of a moving train is hazardous.\nII. Passengers generally heed safety notices printed in compartments.\nSelect the correct option:",
        options: [
          { id: "A", text: "Only Assumption I is implicit" },
          { id: "B", text: "Only Assumption II is implicit" },
          { id: "C", text: "Both Assumptions I and II are implicit" },
          { id: "D", text: "Neither Assumption I nor II is implicit" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Test Assumption I: Why would railway authorities prohibit leaning out? Because it poses danger/hazard. If leaning out were safe, the notice would be pointless. Assumption I is implicit.",
          "Step 2: Test Assumption II: Why do authorities put up notices? Because they assume passengers read and follow them. If everyone ignored notices, spending money printing them would be irrational. Assumption II is implicit.",
          "Step 3: Both assumptions are implicit.",
        ],
        cuetInsight:
          "Safety advisories implicitly assume both the existence of danger and public compliance.",
      },
      {
        id: "general-test-u4-we6",
        questionNumber: 2,
        question:
          "Statement: 'Join our coaching institute to crack the CUET exam with top ranks.' — An advertisement.\nAssumptions:\nI. Students aspire to score top ranks in the CUET exam.\nII. Only our coaching institute can provide top ranks in CUET.\nSelect the correct option:",
        options: [
          { id: "A", text: "Only Assumption I is implicit" },
          { id: "B", text: "Only Assumption II is implicit" },
          { id: "C", text: "Both I and II are implicit" },
          { id: "D", text: "Neither I nor II is implicit" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Test Assumption I: Advertisements target existing consumer desires. The ad appeals to students wishing to score top ranks. Assumption I is implicit.",
          "Step 2: Test Assumption II: Contains the extreme word 'Only'. The advertisement claims it can help students crack the exam, but does not claim that NO OTHER institute or self-study method exists. Assumption II is NOT implicit.",
          "Step 3: Therefore, only Assumption I is implicit.",
        ],
        cuetInsight:
          "Watch out for 'Only'—it almost always invalidates an assumption in critical reasoning.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Public Notice & Warning",
        frequency: "Very High",
        typicalStem: "Statement: 'Smoking in public places is an offense.' Assumptions: (I) Smoking is injurious to health. (II) Penalizing smoking discourages people from smoking in public.",
        strategy: "Both assumptions are implicit: one provides the rationale and the second provides the deterrence mechanism.",
      },
      {
        patternType: "Commercial Ad with Extreme Word",
        frequency: "High",
        typicalStem: "Assumptions containing 'only', 'all', 'never'.",
        strategy: "Eliminate extreme word assumptions immediately.",
      },
    ],
    commonTraps: [
      {
        trap: "Treating conclusions as assumptions",
        whyStudentsFail: "A conclusion follows FROM the statement; an assumption PRECEDES the statement.",
        howToAvoid: "Ask: 'Did the author have to believe this BEFORE making the statement?'",
      },
      {
        trap: "Bringing external factual knowledge",
        whyStudentsFail: "Marking an assumption valid because it is true in the real world, even though unrelated to the statement.",
        howToAvoid: "Restrict your reasoning strictly within the boundary established by the statement.",
      },
    ],
    mnemonics: [
      {
        concept: "The Negation Litmus",
        mnemonic: "N-C (Negation Collapses)",
        explanation:
          "Negate the assumption; if the statement collapses, it is implicit.",
      },
    ],
    quickRevisionCard: {
      title: "Statement & Assumptions High-Yield Card",
      bulletPoints: [
        "An assumption is an unstated, taken-for-granted premise.",
        "Negation Test: If negating the assumption destroys the statement, it is implicit.",
        "Advertisements assume positive customer response and desire.",
        "Notices and warnings assume people read and obey them.",
        "Red flags: 'Only', 'All', 'Never', 'Always', 'Best'.",
        "Assumptions precede the statement; conclusions follow from it.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u4-t3-q1",
        question:
          "Statement: 'Beware of dogs; trespassers will be attacked.' — Notice on a gate.\nAssumptions:\nI. The house owner has dogs on the premises.\nII. Visitors generally take notice of warning boards.\nWhich assumption(s) is/are implicit?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only Assumption I is implicit" },
          { id: "B", text: "Only Assumption II is implicit" },
          { id: "C", text: "Both I and II are implicit" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "C",
        explanation:
          "The warning assumes dogs are present to deter intruders (I is implicit) and that trespassers will read and heed the sign (II is implicit). Both are implicit.",
      },
      {
        id: "general-test-u4-t3-q2",
        question:
          "Statement: 'Use detergent X for dazzling white clothes.' — An advertisement.\nAssumptions:\nI. People desire sparkling white clothes.\nII. No other detergent can make clothes white.\nWhich assumption(s) is/are implicit?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only Assumption I is implicit" },
          { id: "B", text: "Only Assumption II is implicit" },
          { id: "C", text: "Both I and II are implicit" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "A",
        explanation:
          "The ad appeals to people's desire for white clothes (I is implicit). Assumption II contains the extreme 'No other detergent', which is an unjustified exaggeration not claimed by the ad.",
      },
      {
        id: "general-test-u4-t3-q3",
        question:
          "Statement: 'The government has decided to provide financial subsidies to farmers adopting drip irrigation.'\nAssumptions:\nI. Farmers are interested in conserving agricultural water through drip irrigation.\nII. Financial subsidies will encourage farmers to adopt modern irrigation technologies.\nWhich assumption(s) is/are implicit?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Only Assumption I is implicit" },
          { id: "B", text: "Only Assumption II is implicit" },
          { id: "C", text: "Both I and II are implicit" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "C",
        explanation:
          "Government subsidies assume farmers are willing to adopt the practice (I) and that monetary support acts as an effective catalyst (II). Both are implicit.",
      },
      {
        id: "general-test-u4-t3-q4",
        question:
          "Statement: 'Please switch off mobile phones inside the hospital intensive care unit (ICU).'\nAssumptions:\nI. Mobile phone signals can interfere with sensitive medical equipment.\nII. Patients and visitors generally carry mobile phones.\nWhich assumption(s) is/are implicit?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only Assumption I is implicit" },
          { id: "B", text: "Only Assumption II is implicit" },
          { id: "C", text: "Both I and II are implicit" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "C",
        explanation:
          "The restriction assumes electromagnetic interference with life-support apparatus (I) and that visitors have mobile phones that need turning off (II). Both are implicit.",
      },
      {
        id: "general-test-u4-t3-q5",
        question:
          "Assertion (A): Assumptions containing words like 'only', 'never', or 'all' are usually not implicit in critical reasoning.\nReason (R): Authors rarely base everyday arguments on absolute, non-exceptionable extremes unless explicitly stated.",
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
          "Both statements are true and (R) explains why extreme assumptions generally fail the test of validity.",
      },
      {
        id: "general-test-u4-t3-q6",
        question:
          "Statement: 'In case of fire, use stairs instead of lifts.' — Safety board.\nAssumptions:\nI. Lifts may stop functioning during fire due to power failure.\nII. Stairs are generally safer during a fire evacuation.\nWhich assumption(s) is/are implicit?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only I is implicit" },
          { id: "B", text: "Only II is implicit" },
          { id: "C", text: "Both I and II are implicit" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "C",
        explanation:
          "The advisory assumes electrical elevators risk trapping occupants (I) and stairwells provide a reliable egress path (II). Both are implicit.",
      },
      {
        id: "general-test-u4-t3-q7",
        question:
          "Statement: 'The municipal corporation has appealed to citizens to boil drinking water during the monsoon.'\nAssumptions:\nI. Monsoon rains may contaminate municipal water pipelines.\nII. Boiling water kills harmful pathogens and prevents waterborne diseases.\nWhich assumption(s) is/are implicit?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only I is implicit" },
          { id: "B", text: "Only II is implicit" },
          { id: "C", text: "Both I and II are implicit" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "C",
        explanation:
          "The health advisory assumes contamination risks during monsoons (I) and that boiling effectively sterilizes drinking water (II). Both are implicit.",
      },
      {
        id: "general-test-u4-t3-q8",
        question:
          "Statement: 'If you are an engineer, we have a challenging job for you.' — Company recruitment advertisement.\nAssumptions:\nI. We need engineers for our operations.\nII. You are an engineer.\nWhich assumption(s) is/are implicit?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Only Assumption I is implicit" },
          { id: "B", text: "Only Assumption II is implicit" },
          { id: "C", text: "Both I and II are implicit" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "A",
        explanation:
          "The company clearly requires engineers (I is implicit). However, the ad begins with 'If you are an engineer', meaning it does not assume every reader is an engineer (II is not implicit).",
      },
      {
        id: "general-test-u4-t3-q9",
        question:
          "Statement: 'Save energy to secure our planet's future.'\nAssumptions:\nI. Current energy consumption patterns are unsustainable.\nII. Conserving energy contributes to environmental sustainability.\nWhich assumption(s) is/are implicit?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only I is implicit" },
          { id: "B", text: "Only II is implicit" },
          { id: "C", text: "Both I and II are implicit" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "C",
        explanation:
          "The slogan assumes environmental threat from unconstrained energy use (I) and that conservation directly supports sustainability (II). Both are implicit.",
      },
      {
        id: "general-test-u4-t3-q10",
        question:
          "Statement: 'Read books daily to expand your vocabulary and cognitive depth.'\nAssumptions:\nI. People want to expand their vocabulary.\nII. Books contain diverse lexicon and complex thought structures.\nWhich assumption(s) is/are implicit?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only I is implicit" },
          { id: "B", text: "Only II is implicit" },
          { id: "C", text: "Both I and II are implicit" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "C",
        explanation:
          "The advice assumes vocabulary enhancement is a desirable goal (I) and that reading books serves as an effective medium for cognitive and lexical growth (II). Both are implicit.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["syllogisms", "deductive-and-inductive-reasoning"],
      practiceTestId: "practice-general-test-unit4-test1",
      practiceTestUrl: "/test/practice-general-test-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 4 - TOPIC 4: Deductive & Inductive Reasoning
  {
    id: "general-test-unit4-deductive-and-inductive-reasoning",
    slug: "deductive-and-inductive-reasoning",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 4,
    unitTitle: "Logical & Analytical Reasoning",
    topicTitle: "Deductive & Inductive Reasoning",
    ncertReference: {
      book: "CUET General Test / Logical & Analytical Reasoning",
      chapter: "Section 16: Epistemology, Top-Down vs. Bottom-Up Reasoning & Fallacies",
      pages: "Pages 553-588",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 90,
      weightagePercentage: 12.5,
    },
    thirtySecondSummary: [
      "Deductive and Inductive reasoning represent the two primary modes of human logical inference.",
      "Deductive Reasoning (Top-Down): Moves from general universal principles to specific certain conclusions (General -> Specific). If premises are true and the form is valid, the conclusion is 100% CERTAIN and cannot be false.",
      "Inductive Reasoning (Bottom-Up): Moves from specific empirical observations to broad generalized hypotheses (Specific -> General). Inductive conclusions are PROBABLE or plausible, never logically guaranteed.",
      "Modus Ponens & Modus Tollens: Valid deductive forms:\n  - Modus Ponens: If P then Q; P is true; therefore Q is true.\n  - Modus Tollens: If P then Q; Q is false; therefore P is false.",
      "Fallacies of the Conditional:\n  - Affirming the Consequent (Invalid): If P then Q; Q is true; therefore P is true.\n  - Denying the Antecedent (Invalid): If P then Q; P is false; therefore Q is false.",
    ],
    coreConcepts: [
      {
        title: "Deductive Reasoning: Structure, Validity, and Soundness",
        explanation:
          "Deductive logic guarantees necessary conclusions:\n1. Top-Down Direction: Starts with established laws or axioms and applies them to a specific case:\n  - Major Premise: All humans are mortal.\n  - Minor Premise: Socrates is human.\n  - Conclusion: Socrates is mortal.\n2. Validity vs. Soundness:\n  - Validity: Relates solely to the logical structure. An argument is valid if the conclusion follows necessarily from the premises, even if premises are false.\n  - Soundness: An argument is SOUND if it is structurally valid AND all its premises are factually true.",
        keyTakeaways: [
          "Deduction = General to Specific.",
          "Deductive conclusions are CERTAIN if premises are true.",
          "Sound argument = Valid structure + True premises.",
        ],
        ncertPointer:
          "CUET Logical Reasoning, Deductive Epistemology & Formal Validity, pp. 554-566.",
      },
      {
        title: "Inductive Reasoning: Generalization and Probabilistic Truth",
        explanation:
          "Induction drives scientific discovery and empirical observation:\n1. Bottom-Up Direction: Collects individual data points to infer a general rule:\n  - Observation 1: Swan 1 is white.\n  - Observation 2: Swan 2 is white.\n  - Observation 1000: Swan 1000 is white.\n  - Inductive Conclusion: All swans are white.\n  - Vulnerability: A single counterexample (e.g., discovery of black swans in Australia) disproves an inductive generalization.\n2. Strength vs. Cogency:\n  - Strong Induction: High probability of conclusion.\n  - Cogent Induction: Strong argument with true premises.",
        keyTakeaways: [
          "Induction = Specific to General.",
          "Inductive conclusions are PROBABLE, not guaranteed.",
          "Vulnerable to the 'Black Swan' counterexample.",
        ],
        ncertPointer:
          "CUET General Test Guide, Empirical Induction & Probabilistic Logic, pp. 568-578.",
      },
      {
        title: "Conditional Forms: Modus Ponens, Modus Tollens & Fallacies",
        explanation:
          "Evaluating conditional statements ('If P, then Q'):\n1. Valid Rule 1: Modus Ponens (Affirming the Antecedent):\n  - If it rains (P), the ground is wet (Q). It is raining (P). Therefore, the ground is wet (Q). [VALID]\n2. Valid Rule 2: Modus Tollens (Denying the Consequent):\n  - If it rains (P), the ground is wet (Q). The ground is NOT wet (not Q). Therefore, it did NOT rain (not P). [VALID]\n3. Invalid Fallacy 1: Affirming the Consequent:\n  - If it rains (P), the ground is wet (Q). The ground is wet (Q). Therefore, it rained (P). [INVALID - ground could be wet from a sprinkler].\n4. Invalid Fallacy 2: Denying the Antecedent:\n  - If it rains (P), the ground is wet (Q). It did not rain (not P). Therefore, the ground is not wet (not Q). [INVALID].",
        keyTakeaways: [
          "Modus Ponens: P -> Q; P; therefore Q (Valid).",
          "Modus Tollens: P -> Q; not Q; therefore not P (Valid).",
          "Affirming Consequent and Denying Antecedent are formal fallacies.",
        ],
        ncertPointer:
          "CUET Reasoning Handbook, Formal Conditional Logic & Fallacies, pp. 580-588.",
      },
    ],
    keyFacts: [
      {
        concept: "Deductive Certainty",
        formulaOrFact: "General -> Specific (Conclusion is 100% Certain)",
        explanation: "Truth of premises logically guarantees truth of conclusion.",
        examTip: "Look for keywords 'necessarily follows', 'certainly true'.",
      },
      {
        concept: "Inductive Probability",
        formulaOrFact: "Specific -> General (Conclusion is Probable)",
        explanation: "Generalizing from observed samples to entire populations.",
        examTip: "Look for keywords 'likely', 'probable', 'plausible'.",
      },
      {
        concept: "Modus Tollens",
        formulaOrFact: "P -> Q; ~Q; therefore ~P",
        explanation: "Denying the consequence logically refutes the antecedent.",
        examTip: "High-frequency pattern in formal logic questions.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="dedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="indGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <filter id="shadowDI" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f8fafc" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#0f172a">Deductive vs. Inductive Reasoning Comparison</text>

  <!-- Left: Deductive -->
  <g transform="translate(50, 60)" filter="url(#shadowDI)">
    <rect width="280" height="230" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="280" height="38" rx="8" fill="url(#dedGrad)"/>
    <text x="140" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Deductive (Top-Down)</text>
    
    <text x="20" y="68" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e3a8a">• Flow: General Theory -> Specific Case</text>
    <text x="20" y="94" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e3a8a">• Conclusion Certainty:</text>
    <text x="30" y="112" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">100% Guaranteed if premises true</text>
    
    <text x="20" y="140" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e3a8a">• Valid Forms:</text>
    <text x="30" y="158" font-family="monospace" font-size="10.5" font-weight="700" fill="#0369a1">Modus Ponens: P->Q; P; ∴ Q</text>
    <text x="30" y="176" font-family="monospace" font-size="10.5" font-weight="700" fill="#0369a1">Modus Tollens: P->Q; ~Q; ∴ ~P</text>

    <text x="20" y="210" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Evaluation: Valid / Sound</text>
  </g>

  <!-- Right: Inductive -->
  <g transform="translate(370, 60)" filter="url(#shadowDI)">
    <rect width="280" height="230" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="280" height="38" rx="8" fill="url(#indGrad)"/>
    <text x="140" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Inductive (Bottom-Up)</text>
    
    <text x="20" y="68" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#047857">• Flow: Specific Observations -> General Law</text>
    <text x="20" y="94" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#047857">• Conclusion Certainty:</text>
    <text x="30" y="112" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Probable / Likely (Not Guaranteed)</text>
    
    <text x="20" y="140" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#047857">• Methodology:</text>
    <text x="30" y="158" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Empirical sampling, polling, experiments</text>
    <text x="30" y="176" font-family="system-ui, sans-serif" font-size="10.5" fill="#dc2626">Vulnerable to counterexamples</text>

    <text x="20" y="210" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Evaluation: Strong / Cogent</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u4-we7",
        questionNumber: 1,
        question:
          "Consider the following argument:\n'Every mammal has a backbone. A whale is a mammal. Therefore, a whale has a backbone.'\nWhat type of reasoning does this argument exemplify?",
        options: [
          { id: "A", text: "Inductive reasoning" },
          { id: "B", text: "Deductive reasoning" },
          { id: "C", text: "Abductive reasoning" },
          { id: "D", text: "Analogical reasoning" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Identify the flow of logic:\n  - Major premise: 'Every mammal has a backbone' (Universal general rule).\n  - Minor premise: 'A whale is a mammal' (Specific instance).\n  - Conclusion: 'A whale has a backbone' (Necessary deduction).",
          "Step 2: The argument proceeds from a universal general law to a specific case with absolute logical necessity.",
          "Step 3: This is classic top-down Deductive Reasoning.",
        ],
        cuetInsight:
          "General rule + specific case = Deductive reasoning. Specific observations + generalized conclusion = Inductive reasoning.",
      },
      {
        id: "general-test-u4-we8",
        questionNumber: 2,
        question:
          "Given the conditional premise: 'If a student scores above 95% marks, they qualify for the scholarship.'\nStudent Rohan qualified for the scholarship. Can we logically conclude that Rohan scored above 95% marks?",
        options: [
          { id: "A", text: "Yes, by Modus Ponens" },
          { id: "B", text: "Yes, by Modus Tollens" },
          { id: "C", text: "No, this commits the fallacy of Affirming the Consequent" },
          { id: "D", text: "No, this commits the fallacy of Denying the Antecedent" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Formalize: P = 'Scores above 95%', Q = 'Qualifies for scholarship'.\n  - Rule: If P, then Q.",
          "Step 2: Observation: Rohan qualifies for the scholarship (Q is true).\n  - Conclusion attempted: Therefore P is true.",
          "Step 3: This attempts to deduce the antecedent P by affirming the consequent Q. However, Rohan might have qualified through sports quota, need-based criteria, or minority scholarship.",
          "Step 4: This is the formal fallacy of Affirming the Consequent.",
        ],
        cuetInsight:
          "Conditional fallacies are favorite conceptual items in CUET analytical reasoning.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Deductive vs. Inductive Classification",
        frequency: "High",
        typicalStem: "Which of the following demonstrates inductive reasoning?",
        strategy: "Look for generalized conclusions derived from repetitive specific observations ('The sun rose in the east today, yesterday, and every recorded day...').",
      },
      {
        patternType: "Conditional Fallacy Identification",
        frequency: "Medium",
        typicalStem: "Identify the logical fallacy in the argument.",
        strategy: "Map to P -> Q. If argument assumes P from Q, it affirms the consequent.",
      },
    ],
    commonTraps: [
      {
        trap: "Confusing Validity with Truth",
        whyStudentsFail: "An argument can be 100% valid in structure even if its premises are completely false.",
        howToAvoid: "Validity is purely structural; Soundness requires true premises.",
      },
      {
        trap: "Believing inductive conclusions are 100% guaranteed",
        whyStudentsFail: "Thinking observing 100 white swans proves all swans are white.",
        howToAvoid: "Induction provides high probability, never absolute certainty.",
      },
    ],
    mnemonics: [
      {
        concept: "Deduction vs Induction Direction",
        mnemonic: "D-G-S and I-S-G",
        explanation:
          "Deduction: General to Specific. Induction: Specific to General.",
      },
    ],
    quickRevisionCard: {
      title: "Reasoning Modes High-Yield Points",
      bulletPoints: [
        "Deductive: General to Specific (100% Certain, Top-Down).",
        "Inductive: Specific to General (Probable, Bottom-Up).",
        "Modus Ponens: P -> Q; P; therefore Q (Valid).",
        "Modus Tollens: P -> Q; not Q; therefore not P (Valid).",
        "Affirming Consequent: P -> Q; Q; therefore P (Fallacy).",
        "Denying Antecedent: P -> Q; not P; therefore not Q (Fallacy).",
        "Soundness = Valid logical form + Factually true premises.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u4-t4-q1",
        question:
          "Reasoning that proceeds from specific empirical observations to arrive at a generalized broad conclusion is known as:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Deductive reasoning" },
          { id: "B", text: "Inductive reasoning" },
          { id: "C", text: "Syllogistic deduction" },
          { id: "D", text: "Axiomatic proof" },
        ],
        correctOption: "B",
        explanation:
          "Inductive reasoning moves bottom-up from specific instances or observations to formulate broader generalizations and theories.",
      },
      {
        id: "general-test-u4-t4-q2",
        question:
          "Which valid deductive rule of inference states: 'If P then Q; not Q; therefore not P'?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Modus Ponens" },
          { id: "B", text: "Modus Tollens" },
          { id: "C", text: "Affirming the Consequent" },
          { id: "D", text: "Denying the Antecedent" },
        ],
        correctOption: "B",
        explanation:
          "Modus Tollens (denying the consequent) is the valid deductive rule stating that if a conditional statement is accepted, denying the consequent necessitates the denial of the antecedent.",
      },
      {
        id: "general-test-u4-t4-q3",
        question:
          "A deductive argument is said to be 'sound' if and only if:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Its conclusion is probable" },
          { id: "B", text: "It is valid in form and all its premises are factually true" },
          { id: "C", text: "Its conclusion is longer than its premises" },
          { id: "D", text: "It proceeds from specific to general" },
        ],
        correctOption: "B",
        explanation:
          "In formal logic, a deductive argument is sound when it possesses both structural validity and factual truth across all premises.",
      },
      {
        id: "general-test-u4-t4-q4",
        question:
          "'If it is raining, the grass is wet. It is not raining. Therefore, the grass is not wet.' Which logical fallacy is committed here?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Affirming the Consequent" },
          { id: "B", text: "Denying the Antecedent" },
          { id: "C", text: "Circular Reasoning" },
          { id: "D", text: "Hasty Generalization" },
        ],
        correctOption: "B",
        explanation:
          "The argument infers that because the antecedent ('it is raining') is false, the consequent ('grass is wet') must also be false. However, the grass could be wet from sprinklers. This is Denying the Antecedent.",
      },
      {
        id: "general-test-u4-t4-q5",
        question:
          "Assertion (A): Scientific laws established through inductive empirical observation can never be considered 100% immune to future falsification.\nReason (R): Inductive generalizations are derived from finite sample observations, and a single authentic counterexample can disprove the general hypothesis.",
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
          "Both statements are epistemologically true and (R) explains why induction yields probability rather than absolute deductive certainty.",
      },
      {
        id: "general-test-u4-t4-q6",
        question:
          "Match List-I (Inference Form) with List-II (Description):\n(P) Modus Ponens — 1. If P then Q; P; therefore Q\n(Q) Modus Tollens — 2. If P then Q; not Q; therefore not P\n(R) Affirming the Consequent — 3. If P then Q; Q; therefore P (Fallacy)\n(S) Denying the Antecedent — 4. If P then Q; not P; therefore not Q (Fallacy)",
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
          "Formal conditional logic patterns and corresponding fallacies.",
      },
      {
        id: "general-test-u4-t4-q7",
        question:
          "'All metals conduct electricity. Copper is a metal. Therefore, copper conducts electricity.' This is an example of:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Deductive reasoning" },
          { id: "B", text: "Inductive reasoning" },
          { id: "C", text: "Statistical probability" },
          { id: "D", text: "Abductive conjecture" },
        ],
        correctOption: "A",
        explanation:
          "This argument applies a universal property of metals to a specific metal (copper) with absolute necessity, representing deductive reasoning.",
      },
      {
        id: "general-test-u4-t4-q8",
        question:
          "'The first 50 mangoes picked from the orchard were ripe and sweet. Therefore, all mangoes in this orchard are ripe and sweet.' This argument is:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Deductive and sound" },
          { id: "B", text: "Inductive and probabilistic" },
          { id: "C", text: "Axiomatic" },
          { id: "D", text: "Modus Tollens" },
        ],
        correctOption: "B",
        explanation:
          "Generalizing from a 50-mango sample to the entire harvest is an inductive generalization that is probable but not guaranteed.",
      },
      {
        id: "general-test-u4-t4-q9",
        question:
          "Can an argument be structurally valid even if all its premises are factually false in the real world?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Yes, because validity depends entirely on logical form, not factual truth" },
          { id: "B", text: "No, false premises automatically make an argument invalid" },
          { id: "C", text: "Only in inductive reasoning" },
          { id: "D", text: "Only in mathematical equations" },
        ],
        correctOption: "A",
        explanation:
          "Validity is a property of the argument's structure. For example: 'All dogs have 8 legs. All 8-legged animals fly. Therefore, all dogs fly.' This argument is completely valid in form, even though factually false.",
      },
      {
        id: "general-test-u4-t4-q10",
        question:
          "Which of the following best defines 'Modus Ponens'?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Affirming the antecedent" },
          { id: "B", text: "Denying the antecedent" },
          { id: "C", text: "Affirming the consequent" },
          { id: "D", text: "Denying the consequent" },
        ],
        correctOption: "A",
        explanation:
          "Modus Ponens translates to 'the mode that affirms', specifically referring to affirming the antecedent of a conditional proposition.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["syllogisms", "critical-thinking"],
      practiceTestId: "practice-general-test-unit4-test1",
      practiceTestUrl: "/test/practice-general-test-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 4 - TOPIC 5: Critical Thinking
  {
    id: "general-test-unit4-critical-thinking",
    slug: "critical-thinking",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 4,
    unitTitle: "Logical & Analytical Reasoning",
    topicTitle: "Critical Thinking",
    ncertReference: {
      book: "CUET General Test / Logical & Analytical Reasoning",
      chapter: "Section 17: Arguments, Strengthening & Weakening, Course of Action",
      pages: "Pages 589-624",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 95,
      weightagePercentage: 13.2,
    },
    thirtySecondSummary: [
      "Critical Thinking tests analytical decision-making through Statement & Arguments (Strong vs. Weak), Courses of Action, Cause & Effect, and Assertion-Reasoning.",
      "Strong vs. Weak Arguments: A strong argument is directly relevant, objective, and backed by factual, legal, or constitutional principles. A weak argument is vague, emotional, based on personal bias, or merely expresses opinion.",
      "Course of Action: A valid course of action must be a practical, proportionate, and direct remedy to the stated problem without creating a worse secondary crisis.",
      "Cause and Effect: Determine whether event A caused event B, event B caused event A, both are effects of an independent cause, or both are effects of a common cause.",
      "Golden Rule: Avoid extreme courses of action (e.g., immediate termination of all staff or total shutdown of an industry) unless the problem is catastrophic.",
    ],
    coreConcepts: [
      {
        title: "Evaluating Strong vs. Weak Arguments",
        explanation:
          "Criteria for assessing logical strength in debate questions:\n1. Strong Arguments:\n  - Directly connected to the core issue.\n  - Supported by proven empirical evidence, constitutional rights, or established social consequences.\n  - Example: 'Should physical education be mandatory in schools?' -> 'Yes, because clinical evidence demonstrates regular physical activity enhances cardiovascular fitness and cognitive retention in adolescents.' (STRONG).\n2. Weak Arguments:\n  - Ambiguous, super-emotional, or dogmatic.\n  - Based on pure personal preference, superstition, or peer pressure.\n  - Example: 'No, because students do not like getting sweaty.' (WEAK).",
        keyTakeaways: [
          "Strong arguments are realistic, non-emotional, and socially beneficial.",
          "Weak arguments rely on personal whims, trivialities, or blind tradition.",
        ],
        ncertPointer:
          "CUET Critical Reasoning, Strong vs Weak Arguments, pp. 590-602.",
      },
      {
        title: "Formulating Effective Courses of Action",
        explanation:
          "Solving administrative and social dilemmas in CUET:\n1. Direct Feasibility: The proposed action must address the root cause of the problem, not merely a symptom.\n2. Proportionality: The severity of the action must match the magnitude of the problem.\n  - If water is contaminated in one locality, a valid course of action is supplying clean tankers and repairing municipal pipes immediately.\n  - An invalid course of action would be arresting the entire municipal water department.\n3. Non-Escalation: The remedy must not create an even more destructive problem.",
        keyTakeaways: [
          "Action must directly target root causes.",
          "Must be feasible, legal, and proportionate.",
          "Avoid extreme or over-reactionary measures.",
        ],
        ncertPointer:
          "CUET General Test Guide, Administrative Decision Making & Courses of Action, pp. 604-614.",
      },
      {
        title: "Cause and Effect Logical Analysis",
        explanation:
          "Identifying causal directions between two events:\n1. A is Cause, B is Effect: Event A occurred first and directly produced event B.\n  - Event I: Severe drought occurred in the district.\n  - Event II: Farmers suffered total crop failure. (I is Cause, II is Effect).\n2. Common Cause: Both events stem from a shared root event.\n  - Event I: Major airlines cancelled flights.\n  - Event II: Ferry boat services were suspended. (Both are effects of a common cause: an approaching severe cyclone).\n3. Independent Causes: Events are entirely unrelated.",
        keyTakeaways: [
          "Check temporal sequence and direct physical/economic connection.",
          "Look for common root causes like weather disasters or economic policy.",
        ],
        ncertPointer:
          "CUET Reasoning Handbook, Causal Relationships & Event Logic, pp. 616-624.",
      },
    ],
    keyFacts: [
      {
        concept: "Strong Argument Test",
        formulaOrFact: "Directly relevant + Factual / Legal backing + Practical",
        explanation: "Separates objective logic from emotional opinion.",
        examTip: "Arguments stating 'because it is my personal belief' are always weak.",
      },
      {
        concept: "Course of Action Proportionality",
        formulaOrFact: "Remedy must be feasible without causing worse side-effects",
        explanation: "Administrative realism in problem solving.",
        examTip: "Mass firings or total shutdowns are almost always incorrect options.",
      },
      {
        concept: "Common Cause Indicators",
        formulaOrFact: "Two simultaneous independent effects sharing an external trigger",
        explanation: "Flight cancellations and school closures due to blizzard/cyclone.",
        examTip: "Recognize that neither caused the other.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="critGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f766e"/>
      <stop offset="100%" stop-color="#14b8a6"/>
    </linearGradient>
    <filter id="shadowCrit" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f0fdfa" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#134e4a">Critical Thinking & Decision Framework for CUET</text>

  <!-- Box 1: Strong vs Weak -->
  <g transform="translate(45, 60)" filter="url(#shadowCrit)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#99f6e4" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="url(#critGrad)"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Strong vs. Weak Arguments</text>
    
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f766e">✓ Strong Argument:</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Grounded in facts & constitutional law</text>
    <text x="25" y="100" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Focuses on realistic social welfare</text>
    <text x="25" y="116" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Directly addresses core problem</text>

    <text x="15" y="146" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#b91c1c">✗ Weak Argument:</text>
    <text x="25" y="164" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Emotional, biased, or super-dogmatic</text>
    <text x="25" y="180" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Merely personal preference or opinion</text>
    <text x="25" y="196" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Trivial or irrelevant side issues</text>
  </g>

  <!-- Box 2: Course of Action & Cause-Effect -->
  <g transform="translate(370, 60)" filter="url(#shadowCrit)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#99f6e4" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="#134e4a"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Courses of Action & Causality</text>
    
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f766e">• Valid Course of Action:</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Feasible, legal, and proportionate</text>
    <text x="25" y="100" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Avoids extreme / destructive reactions</text>
    <text x="25" y="116" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Targets root cause directly</text>

    <text x="15" y="146" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f766e">• Cause & Effect Models:</text>
    <text x="25" y="164" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Event A directly caused Event B</text>
    <text x="25" y="180" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Both events are effects of a Common Cause</text>
    <text x="25" y="196" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Both events are independent</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u4-we9",
        questionNumber: 1,
        question:
          "Statement: 'Should road traffic fines for jumping red lights be dramatically increased in metropolitan cities?'\nArguments:\nI. Yes, strict and heavy fines deter careless driving and significantly reduce road accidents.\nII. No, only wealthy individuals will be able to drive on roads.\nSelect the correct option:",
        options: [
          { id: "A", text: "Only Argument I is strong" },
          { id: "B", text: "Only Argument II is strong" },
          { id: "C", text: "Both Arguments I and II are strong" },
          { id: "D", text: "Neither Argument I nor II is strong" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Evaluate Argument I: Higher penalties create behavioral deterrence, promoting traffic discipline and saving human lives. It is logical, practical, and in the interest of public safety. Argument I is STRONG.",
          "Step 2: Evaluate Argument II: Fines are only paid when a traffic law is violated. Obeying red lights costs zero rupees regardless of wealth. The claim that 'only wealthy people will drive' is an absurd, illogical exaggeration. Argument II is WEAK.",
          "Step 3: Only Argument I is strong.",
        ],
        cuetInsight:
          "Strong arguments prioritize public welfare and empirical deterrence; weak arguments introduce absurd exaggerations.",
      },
      {
        id: "general-test-u4-we10",
        questionNumber: 2,
        question:
          "Statement: 'A severe outbreak of malaria has been reported in multiple residential sectors of the city during the monsoon.'\nCourses of Action:\nI. The municipal authorities should immediately begin intensive insecticide fogging and anti-larval spraying across affected sectors.\nII. All residents of the city should be immediately evacuated to other districts.\nSelect the correct option:",
        options: [
          { id: "A", text: "Only Course of Action I follows" },
          { id: "B", text: "Only Course of Action II follows" },
          { id: "C", text: "Both I and II follow" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Evaluate Course of Action I: Anti-larval spraying and fogging target mosquito breeding at the source. This is a direct, practical, and standard public health response. Action I follows.",
          "Step 2: Evaluate Course of Action II: Evacuating an entire metropolitan population for seasonal malaria is disproportionate, economically unfeasible, and creates massive secondary chaos. Action II does NOT follow.",
          "Step 3: Only Course of Action I follows.",
        ],
        cuetInsight:
          "Administrative actions must be proportionate. Mass evacuations or shutdowns for localized treatable issues are always invalid.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Course of Action Evaluation",
        frequency: "Very High",
        typicalStem: "Problem: Leakage of toxic fumes from a local chemical factory. Courses of Action: (I) Shut down all chemical factories nationwide. (II) Seal the leak, evacuate nearby residents, and inspect safety protocols.",
        strategy: "Action I is an overreaction; Action II is targeted and proportionate.",
      },
      {
        patternType: "Cause and Effect Analysis",
        frequency: "High",
        typicalStem: "Statement I: Heavy torrential rains triggered flash floods. Statement II: The state government deployed disaster relief teams.",
        strategy: "Statement I is the direct cause, and Statement II is its effect.",
      },
    ],
    commonTraps: [
      {
        trap: "Selecting extreme courses of action",
        whyStudentsFail: "Thinking the most drastic measure is the most effective.",
        howToAvoid: "Check whether the proposed remedy is proportionate and feasible.",
      },
      {
        trap: "Confusing common cause with direct cause-and-effect",
        whyStudentsFail: "Believing flight cancellations caused train delays, when an impending cyclone caused both.",
        howToAvoid: "Ask: 'Did Event A directly cause Event B, or did an external factor cause both?'",
      },
    ],
    mnemonics: [
      {
        concept: "Action Feasibility Test",
        mnemonic: "P-P-R (Proportionate, Practical, Root-cause)",
        explanation:
          "A valid course of action must be Proportionate, Practical, and address the Root cause.",
      },
    ],
    quickRevisionCard: {
      title: "Critical Thinking High-Yield Points",
      bulletPoints: [
        "Strong argument: Relevant, objective, grounded in law or social welfare.",
        "Weak argument: Emotional, biased, absurd, or based on personal taste.",
        "Valid Course of Action: Proportionate, feasible, targets root causes.",
        "Invalid Course of Action: Mass firings, total bans, nationwide shutdowns.",
        "Cause & Effect: Identify direct causality vs. effects of a common cause.",
        "Assertion-Reason: Check truth of each statement, then check if R explains A.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u4-t5-q1",
        question:
          "Statement: 'Should single-use plastics be completely banned in India?'\nArguments:\nI. Yes, non-biodegradable plastics choke drainage systems, pollute oceans, and release toxic carcinogens when incinerated.\nII. No, because plastic bags are very convenient for shoppers.\nWhich argument(s) is/are strong?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only Argument I is strong" },
          { id: "B", text: "Only Argument II is strong" },
          { id: "C", text: "Both Arguments I and II are strong" },
          { id: "D", text: "Neither is strong" },
        ],
        correctOption: "A",
        explanation:
          "Argument I is supported by solid ecological and scientific facts regarding pollution and public health. Argument II prioritizes minor individual convenience over grave environmental damage. Only I is strong.",
      },
      {
        id: "general-test-u4-t5-q2",
        question:
          "Statement: 'A major fire broke out in a commercial shopping complex due to a short circuit.'\nCourses of Action:\nI. Firefighters should be dispatched immediately to extinguish the fire and rescue trapped individuals.\nII. The government should immediately demolish all commercial shopping complexes in the city.\nWhich course(s) of action follow(s)?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only Course of Action I follows" },
          { id: "B", text: "Only Course of Action II follows" },
          { id: "C", text: "Both follow" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "A",
        explanation:
          "Course I is an immediate, lifesaving response. Course II is an extreme, absurd overreaction. Only I follows.",
      },
      {
        id: "general-test-u4-t5-q3",
        question:
          "Statement I: The prices of petrol and diesel have increased substantially over the past three months.\nStatement II: State transport corporations have revised bus fares upward by 15%.\nWhich of the following describes the relationship between the two statements?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Statement I is the cause and Statement II is its effect" },
          { id: "B", text: "Statement II is the cause and Statement I is its effect" },
          { id: "C", text: "Both statements are independent causes" },
          { id: "D", text: "Both statements are effects of independent causes" },
        ],
        correctOption: "A",
        explanation:
          "Fuel is the primary operating cost for bus transport. A substantial rise in fuel prices directly forces transport corporations to hike fares to cover operating deficits. Statement I is the cause, and Statement II is its effect.",
      },
      {
        id: "general-test-u4-t5-q4",
        question:
          "Statement I: Most flights arriving at the city airport were diverted or delayed.\nStatement II: Heavy dense fog engulfed the city and reduced runway visibility to near zero.\nWhich of the following is correct?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Statement II is the cause and Statement I is its effect" },
          { id: "B", text: "Statement I is the cause and Statement II is its effect" },
          { id: "C", text: "Both are independent causes" },
          { id: "D", text: "Both are effects of independent causes" },
        ],
        correctOption: "A",
        explanation:
          "Dense fog causing poor runway visibility directly caused the flight delays and diversions. Statement II is the cause, and Statement I is the effect.",
      },
      {
        id: "general-test-u4-t5-q5",
        question:
          "Assertion (A): In analytical problem-solving, a valid course of action must be proportionate to the problem.\nReason (R): Disproportionate or excessively punitive measures often generate severe unintended economic and social crises that worsen the original problem.",
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
          "Both statements are true and (R) explains why disproportionate actions (like closing all schools indefinitely for a minor infraction) are invalid courses of action.",
      },
      {
        id: "general-test-u4-t5-q6",
        question:
          "Statement: 'Should students be allowed to participate in politics while studying at universities?'\nArguments:\nI. Yes, because it fosters civic awareness, democratic leadership qualities, and critical social consciousness among youth.\nII. No, because political participation completely ruins all academic performance.\nWhich argument(s) is/are strong?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Only Argument I is strong" },
          { id: "B", text: "Only Argument II is strong" },
          { id: "C", text: "Both Arguments I and II are strong" },
          { id: "D", text: "Neither is strong" },
        ],
        correctOption: "A",
        explanation:
          "Argument I focuses on constructive civic leadership and democratic empowerment. Argument II uses the sweeping, unproven claim that politics 'completely ruins all academic performance'. Only I is strong.",
      },
      {
        id: "general-test-u4-t5-q7",
        question:
          "Statement: 'A large number of passengers fell ill after eating food served on a premier long-distance train.'\nCourses of Action:\nI. All affected passengers should immediately be provided medical assistance at the next station.\nII. An enquiry should be ordered into the catering contractor and food quality standards.\nWhich course(s) of action follow(s)?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only I follows" },
          { id: "B", text: "Only II follows" },
          { id: "C", text: "Both I and II follow" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "C",
        explanation:
          "Providing immediate medical care is the emergency priority (I follows), and investigating catering hygiene prevents future occurrences (II follows). Both courses of action follow.",
      },
      {
        id: "general-test-u4-t5-q8",
        question:
          "Statement I: The local administration declared a three-day holiday for all schools in the district.\nStatement II: Meteorological department issued a red alert warning of extremely heavy torrential rainfall and cyclonic winds in the district.\nWhich of the following is correct?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Statement II is the cause and Statement I is its effect" },
          { id: "B", text: "Statement I is the cause and Statement II is its effect" },
          { id: "C", text: "Both are independent causes" },
          { id: "D", text: "Both are effects of independent causes" },
        ],
        correctOption: "A",
        explanation:
          "The severe weather red alert directly prompted the administrative closure of schools to protect children. Statement II is the cause, and Statement I is its effect.",
      },
      {
        id: "general-test-u4-t5-q9",
        question:
          "Statement: 'Should homework be completely abolished in primary schools?'\nArguments:\nI. Yes, young children need time for play, sleep, and family bonding after rigorous school hours.\nII. No, because parents will have nothing to monitor in the evening.\nWhich argument(s) is/are strong?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Only Argument I is strong" },
          { id: "B", text: "Only Argument II is strong" },
          { id: "C", text: "Both Arguments I and II are strong" },
          { id: "D", text: "Neither is strong" },
        ],
        correctOption: "A",
        explanation:
          "Argument I is supported by pediatric developmental science regarding play and rest in early childhood. Argument II provides a trivial, parent-centric excuse. Only I is strong.",
      },
      {
        id: "general-test-u4-t5-q10",
        question:
          "Statement: 'Air pollution levels in the city have crossed the severe plus hazardous category during winter.'\nCourses of Action:\nI. The city government should enforce odd-even vehicle curbs and restrict non-essential construction activities.\nII. All factories in the entire state should be permanently shut down.\nWhich course(s) of action follow(s)?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Only Course of Action I follows" },
          { id: "B", text: "Only Course of Action II follows" },
          { id: "C", text: "Both follow" },
          { id: "D", text: "Neither follows" },
        ],
        correctOption: "A",
        explanation:
          "Action I is a standard, proportionate emergency measure targeting vehicular and dust emissions. Action II is a permanent, catastrophic economic overreaction. Only Course of Action I follows.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["statement-and-assumptions", "deductive-and-inductive-reasoning"],
      practiceTestId: "practice-general-test-unit4-test1",
      practiceTestUrl: "/test/practice-general-test-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },
];
