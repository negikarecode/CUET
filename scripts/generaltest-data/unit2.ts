export const generalTestUnit2 = [
  // UNIT 2 - TOPIC 1: Number Series
  {
    id: "general-test-unit2-number-series",
    slug: "number-series",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 2,
    unitTitle: "General Mental Ability & Numerical Ability",
    topicTitle: "Number Series",
    ncertReference: {
      book: "CUET General Test / General Mental Ability & Reasoning",
      chapter: "Section 5: Arithmetic, Geometric & Hybrid Number Sequences",
      pages: "Pages 157-192",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 104,
      weightagePercentage: 14.5,
    },
    thirtySecondSummary: [
      "Number Series questions test pattern recognition involving sequences governed by mathematical logic (addition, subtraction, multiplication, division, squares, cubes, and primes).",
      "Common Patterns: Constant differences, increasing/decreasing difference of differences (step series), alternating patterns, and Fibonacci-style recursive sums.",
      "Power Patterns: Sequences based on n^2, n^2 ± k, n^3, n^3 ± k, and (n * k) ± c.",
      "Golden Rule: Always calculate first-order differences (d1) and second-order differences (d2) if no obvious ratio or power pattern is apparent.",
      "Question Types: Missing term identification (find '?'), wrong term identification, and dual interleaved series.",
    ],
    coreConcepts: [
      {
        title: "Difference and Double-Difference Series (Step Ladders)",
        explanation:
          "The vast majority of arithmetic series in CUET yield clear patterns when consecutive terms are subtracted:\n1. First-Order Difference: If the sequence is 3, 7, 11, 15, 19..., the difference between adjacent terms is constant (+4).\n2. Second-Order Difference (Step Series): If differences are not constant, take the difference between consecutive differences:\n  - Sequence: 2, 5, 10, 17, 26, 37...\n  - 1st Differences: 3, 5, 7, 9, 11...\n  - 2nd Differences: 2, 2, 2, 2... (constant). Next 1st difference = 11 + 2 = 13. Next term = 37 + 13 = 50.\n  - Note that this is also equivalent to (n^2 + 1) for n = 1, 2, 3, 4, 5, 6, 7.",
        keyTakeaways: [
          "Take first-order differences immediately if numbers grow moderately.",
          "If 1st differences form an AP, 2nd difference is constant.",
          "Identify algebraic equivalents like n^2 + k or n^2 - k.",
        ],
        ncertPointer:
          "CUET Reasoning Handbook, Number Series & Sequence Logic, pp. 158-168.",
      },
      {
        title: "Multiplicative, Mixed Operations and Interleaved Series",
        explanation:
          "When terms expand rapidly or oscillate, multiplicative or composite rules apply:\n1. Multiplicative with Addition/Subtraction: Pattern of type (Term * x) ± y:\n  - Example: 4, 9, 19, 39, 79... -> (4 * 2 + 1 = 9), (9 * 2 + 1 = 19), (19 * 2 + 1 = 39) -> next is (79 * 2 + 1 = 159).\n  - Varying multiplier: (Term * 1 + 1), (Term * 2 + 2), (Term * 3 + 3)...\n2. Alternating / Interleaved Series: Two separate sequences interwoven at odd and even positions:\n  - Example: 2, 15, 4, 12, 6, 9, 8, 6...\n  - Odd terms: 2, 4, 6, 8 (+2 AP)\n  - Even terms: 15, 12, 9, 6 (-3 AP).\n  - If terms fluctuate up and down repeatedly, test for interleaved sequences.",
        keyTakeaways: [
          "Rapid growth implies multiplication: (n * a) ± b.",
          "Oscillating high-low values indicate two interleaved series.",
        ],
        ncertPointer:
          "CUET General Test Guide, Sequences & Progressive Logic, pp. 170-182.",
      },
      {
        title: "Squares, Cubes, and Prime Number Series",
        explanation:
          "Recognizing landmark numerical powers and prime distributions saves critical exam minutes:\n1. Perfect Squares and Modifications: Know squares up to 35^2 (e.g., 28^2 = 784, 29^2 = 841, 31^2 = 961). Watch for (n^2 - 1): 0, 3, 8, 15, 24, 35, 48...\n2. Perfect Cubes and Modifications: Know cubes up to 15^3 (e.g., 11^3 = 1331, 12^3 = 1728). Look for (n^3 - n): 0, 6, 24, 60, 120, 210, 336...\n3. Prime Number Sequences: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47... Notice that 2 is the only even prime, and 1 is neither prime nor composite.",
        keyTakeaways: [
          "n^3 - n series (0, 6, 24, 60, 120, 210, 336) is a CUET favorite.",
          "Never confuse prime series with odd number series (primes skip 9, 15, 21, 25, 27).",
        ],
        ncertPointer:
          "CUET General Test Quantitative & Logic, pp. 184-192.",
      },
    ],
    keyFacts: [
      {
        concept: "Cube Differences (n^3 - n)",
        formulaOrFact: "0, 6, 24, 60, 120, 210, 336, 504, 720",
        explanation: "Formed by n(n - 1)(n + 1), product of three consecutive integers.",
        examTip: "Instantly recognize 6, 24, 60, 120 as (n^3 - n) without manual factor testing.",
      },
      {
        concept: "Step Difference Technique",
        formulaOrFact: "d1 = T_(k+1) - T_k; d2 = d1_(k+1) - d1_k",
        explanation: "Resolves quadratic and cubic sequence rules by reducing orders.",
        examTip: "Standard first approach whenever numbers are relatively close.",
      },
      {
        concept: "Interleaved Check",
        formulaOrFact: "Separate into: Odd indices (1, 3, 5...) and Even indices (2, 4, 6...)",
        explanation: "Prevents confusing two separate independent sequences as a chaotic single sequence.",
        examTip: "Triggered whenever numbers alternate between increasing and decreasing.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="nsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4338ca"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <filter id="shadowNS" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f8fafc" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#1e1b4b">CUET Number Series Decision Framework</text>

  <!-- Step Ladder Visual -->
  <g transform="translate(50, 60)">
    <rect width="280" height="230" rx="8" fill="#ffffff" stroke="#c7d2fe" stroke-width="1.5" filter="url(#shadowNS)"/>
    <rect width="280" height="38" rx="8" fill="url(#nsGrad)"/>
    <text x="140" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Step-Difference Method</text>
    
    <!-- Terms -->
    <text x="30" y="75" font-family="monospace" font-size="13" font-weight="700" fill="#1e293b">Series: 2    5    10   17   26   [?]</text>
    
    <!-- 1st Difference -->
    <path d="M 40 85 L 60 115 L 80 85" fill="none" stroke="#6366f1" stroke-width="1.5"/>
    <text x="60" y="128" font-family="monospace" font-size="11" font-weight="700" fill="#4338ca" text-anchor="middle">+3</text>

    <path d="M 90 85 L 110 115 L 130 85" fill="none" stroke="#6366f1" stroke-width="1.5"/>
    <text x="110" y="128" font-family="monospace" font-size="11" font-weight="700" fill="#4338ca" text-anchor="middle">+5</text>

    <path d="M 140 85 L 160 115 L 180 85" fill="none" stroke="#6366f1" stroke-width="1.5"/>
    <text x="160" y="128" font-family="monospace" font-size="11" font-weight="700" fill="#4338ca" text-anchor="middle">+7</text>

    <path d="M 190 85 L 210 115 L 230 85" fill="none" stroke="#6366f1" stroke-width="1.5"/>
    <text x="210" y="128" font-family="monospace" font-size="11" font-weight="700" fill="#4338ca" text-anchor="middle">+9</text>

    <!-- 2nd Difference -->
    <text x="85" y="165" font-family="monospace" font-size="10.5" font-weight="700" fill="#047857">+2</text>
    <text x="135" y="165" font-family="monospace" font-size="10.5" font-weight="700" fill="#047857">+2</text>
    <text x="185" y="165" font-family="monospace" font-size="10.5" font-weight="700" fill="#047857">+2</text>

    <rect x="20" y="185" width="240" height="35" rx="5" fill="#e0e7ff"/>
    <text x="140" y="207" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#3730a3" text-anchor="middle">Next d1 = 9 + 2 = 11 -> [?] = 26 + 11 = 37</text>
  </g>

  <!-- Pattern Taxonomy Box -->
  <g transform="translate(370, 60)">
    <rect width="280" height="230" rx="8" fill="#ffffff" stroke="#c7d2fe" stroke-width="1.5" filter="url(#shadowNS)"/>
    <rect width="280" height="38" rx="8" fill="#1e3a8a"/>
    <text x="140" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Common CUET Series archetypes</text>
    
    <text x="15" y="68" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e3a8a">1. Multiplicative + Constant:</text>
    <text x="25" y="86" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">T_(n+1) = (T_n × 2) ± k</text>
    
    <text x="15" y="112" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e3a8a">2. Powers (n^3 ± n or n^2 ± 1):</text>
    <text x="25" y="130" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">0, 6, 24, 60, 120, 210, 336...</text>
    
    <text x="15" y="156" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e3a8a">3. Alternating / Interleaved:</text>
    <text x="25" y="174" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Odd indices: +3, +3, +3</text>
    <text x="25" y="190" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Even indices: ×2, ×2, ×2</text>
    
    <text x="15" y="214" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e3a8a">4. Primes:</text>
    <text x="25" y="228" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">2, 3, 5, 7, 11, 13, 17, 19, 23, 29...</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u2-we1",
        questionNumber: 1,
        question:
          "Find the missing number in the sequence:\n3, 10, 29, 66, 127, ?",
        options: [
          { id: "A", text: "216" },
          { id: "B", text: "218" },
          { id: "C", text: "222" },
          { id: "D", text: "225" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Inspect the sequence relative to cubes of natural numbers (1, 8, 27, 64, 125, 216...).\n  - Term 1: 1^3 + 2 = 1 + 2 = 3\n  - Term 2: 2^3 + 2 = 8 + 2 = 10\n  - Term 3: 3^3 + 2 = 27 + 2 = 29\n  - Term 4: 4^3 + 2 = 64 + 2 = 66\n  - Term 5: 5^3 + 2 = 125 + 2 = 127.",
          "Step 2: The pattern is clearly n^3 + 2 for consecutive natural numbers n = 1, 2, 3, 4, 5...",
          "Step 3: Calculate the 6th term for n = 6: 6^3 + 2 = 216 + 2 = 218.",
        ],
        cuetInsight:
          "Recognizing n^3 ± k or n^2 ± k patterns instantly saves 60 seconds of trial-and-error subtraction.",
      },
      {
        id: "general-test-u2-we2",
        questionNumber: 2,
        question:
          "Find the wrong number in the following series:\n5, 12, 26, 54, 112, 222",
        options: [
          { id: "A", text: "12" },
          { id: "B", text: "26" },
          { id: "C", text: "54" },
          { id: "D", text: "112" },
        ],
        correctOption: "D",
        solutionStepByStep: [
          "Step 1: Test multiplicative relationship (Term * 2 + c):\n  - 5 * 2 + 2 = 12 (Correct)\n  - 12 * 2 + 2 = 26 (Correct)\n  - 26 * 2 + 2 = 54 (Correct)\n  - 54 * 2 + 2 = 110 (The series gives 112)\n  - Testing with 110: 110 * 2 + 2 = 222 (Matches the final term!).",
          "Step 2: Therefore, 112 is the incorrect number in the sequence and should have been 110.",
        ],
        cuetInsight:
          "In 'Wrong Term' questions, always verify if the subsequent term works when your corrected value is plugged in.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Missing Term in Step Difference",
        frequency: "Very High",
        typicalStem: "What will come in place of question mark (?) in the following series?",
        strategy:
          "Compute consecutive differences. If differences increase steadily, calculate difference of differences.",
      },
      {
        patternType: "Wrong Term in Mixed Series",
        frequency: "High",
        typicalStem: "One number in the given series is incorrect. Identify the wrong number.",
        strategy:
          "Find the algebraic generator rule across the first 3 terms, then test where the generator breaks.",
      },
    ],
    commonTraps: [
      {
        trap: "Assuming odd numbers when primes are tested",
        whyStudentsFail:
          "In the series 2, 3, 5, 7, 11, ?, predicting 13 is easy, but if 9 is skipped, students mistakenly guess an arithmetic difference rather than prime progression.",
        howToAvoid:
          "Check whether composite odd numbers (9, 15, 21, 25) are absent.",
      },
      {
        trap: "Missing an interleaved sequence",
        whyStudentsFail:
          "Trying to find a single complex relation when terms alternate high and low.",
        howToAvoid:
          "Split terms into odd-positioned (1st, 3rd, 5th) and even-positioned (2nd, 4th, 6th).",
      },
    ],
    mnemonics: [
      {
        concept: "Sequence Attack Order",
        mnemonic: "D-P-M-I (Difference, Power, Multiply, Interleaved)",
        explanation:
          "Order of testing: First Difference, then Powers (squares/cubes), then Multiplication, then Interleaved split.",
      },
    ],
    quickRevisionCard: {
      title: "Number Series Mastery Card",
      bulletPoints: [
        "First move: compute first differences (d1); if not constant, compute second differences (d2).",
        "n^3 - n series: 0, 6, 24, 60, 120, 210, 336...",
        "n^3 + k series: (1+k), (8+k), (27+k), (64+k), (125+k)...",
        "Multiplicative model: T_(k+1) = (T_k * m) ± c.",
        "Oscillating terms -> split into two alternating sequences.",
        "Wrong number identification -> verify corrected value generates the subsequent term.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u2-t1-q1",
        question:
          "What will come in place of the question mark (?) in the following series?\n4, 7, 12, 19, 28, ?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "37" },
          { id: "B", text: "39" },
          { id: "C", text: "41" },
          { id: "D", text: "43" },
        ],
        correctOption: "B",
        explanation:
          "Calculate differences between consecutive terms: 7 - 4 = 3; 12 - 7 = 5; 19 - 12 = 7; 28 - 19 = 9. The differences are consecutive odd numbers (3, 5, 7, 9). The next difference is 11. Therefore, ? = 28 + 11 = 39.",
      },
      {
        id: "general-test-u2-t1-q2",
        question:
          "Find the missing term in the sequence:\n6, 13, 28, 59, 122, ?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "245" },
          { id: "B", text: "247" },
          { id: "C", text: "249" },
          { id: "D", text: "251" },
        ],
        correctOption: "C",
        explanation:
          "The pattern is: (Term * 2) + 1, (Term * 2) + 2, (Term * 2) + 3...:\n6 * 2 + 1 = 13\n13 * 2 + 2 = 28\n28 * 2 + 3 = 59\n59 * 2 + 4 = 122\n122 * 2 + 5 = 244 + 5 = 249.",
      },
      {
        id: "general-test-u2-t1-q3",
        question:
          "Identify the next number in the series:\n2, 3, 5, 7, 11, 13, 17, 19, 23, ?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "25" },
          { id: "B", text: "27" },
          { id: "C", text: "29" },
          { id: "D", text: "31" },
        ],
        correctOption: "C",
        explanation:
          "This is the sequence of consecutive prime numbers. The prime number immediately following 23 is 29.",
      },
      {
        id: "general-test-u2-t1-q4",
        question:
          "What is the missing value (?) in the sequence:\n0, 6, 24, 60, 120, 210, ?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "336" },
          { id: "B", text: "343" },
          { id: "C", text: "350" },
          { id: "D", text: "324" },
        ],
        correctOption: "A",
        explanation:
          "The pattern corresponds to (n^3 - n):\n1^3 - 1 = 0\n2^3 - 2 = 6\n3^3 - 3 = 24\n4^3 - 4 = 60\n5^3 - 5 = 120\n6^3 - 6 = 210\n7^3 - 7 = 343 - 7 = 336.",
      },
      {
        id: "general-test-u2-t1-q5",
        question:
          "Assertion (A): In the series 3, 8, 15, 24, 35, the next term is 48.\nReason (R): The terms follow the algebraic pattern (n^2 - 1) for n = 2, 3, 4, 5, 6, 7.",
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
          "For n = 2, 2^2 - 1 = 3; for n = 3, 3^2 - 1 = 8; for n = 4, 4^2 - 1 = 15; for n = 5, 5^2 - 1 = 24; for n = 6, 6^2 - 1 = 35. For n = 7, 7^2 - 1 = 49 - 1 = 48. Both statements are true and (R) explains (A).",
      },
      {
        id: "general-test-u2-t1-q6",
        question:
          "Find the wrong number in the following series:\n1, 4, 9, 16, 25, 35, 49",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "16" },
          { id: "B", text: "25" },
          { id: "C", text: "35" },
          { id: "D", text: "49" },
        ],
        correctOption: "C",
        explanation:
          "The series consists of consecutive perfect squares: 1^2, 2^2, 3^2, 4^2, 5^2, 6^2, 7^2. The term 6^2 should be 36, but 35 is given. Hence, 35 is the wrong term.",
      },
      {
        id: "general-test-u2-t1-q7",
        question:
          "What will come in place of the question mark (?) in the interleaved series:\n2, 20, 4, 17, 8, 14, 16, 11, ?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "32" },
          { id: "B", text: "8" },
          { id: "C", text: "24" },
          { id: "D", text: "18" },
        ],
        correctOption: "A",
        explanation:
          "Split into odd and even position series:\n- Odd positions (1st, 3rd, 5th, 7th, 9th): 2, 4, 8, 16, ? -> each term is multiplied by 2. Next term = 16 * 2 = 32.\n- Even positions (2nd, 4th, 6th, 8th): 20, 17, 14, 11 -> subtracted by 3.",
      },
      {
        id: "general-test-u2-t1-q8",
        question:
          "Match the sequence in List-I with its governing rule in List-II:\n(P) 2, 5, 10, 17, 26 — 1. n^2 + 1\n(Q) 1, 8, 27, 64, 125 — 2. n^3\n(R) 2, 6, 12, 20, 30 — 3. n^2 + n\n(S) 0, 7, 26, 63, 124 — 4. n^3 - 1",
        type: "match-the-following",
        difficulty: "medium",
        options: [
          { id: "A", text: "P-1, Q-2, R-3, S-4" },
          { id: "B", text: "P-2, Q-1, R-4, S-3" },
          { id: "C", text: "P-1, Q-3, R-2, S-4" },
          { id: "D", text: "P-4, Q-2, R-1, S-3" },
        ],
        correctOption: "A",
        explanation:
          "All four are classic standard algebraic patterns: n^2 + 1 gives 2, 5, 10...; n^3 gives 1, 8, 27...; n(n+1) = n^2 + n gives 2, 6, 12, 20...; n^3 - 1 gives 0, 7, 26...",
      },
      {
        id: "general-test-u2-t1-q9",
        question:
          "What is the missing term in the sequence:\n7, 15, 32, 67, 138, ?",
        type: "standard",
        difficulty: "hard",
        options: [
          { id: "A", text: "281" },
          { id: "B", text: "283" },
          { id: "C", text: "279" },
          { id: "D", text: "285" },
        ],
        correctOption: "A",
        explanation:
          "The pattern is: (Term * 2) + 1, (Term * 2) + 2, (Term * 2) + 3, (Term * 2) + 4...:\n7 * 2 + 1 = 15\n15 * 2 + 2 = 32\n32 * 2 + 3 = 67\n67 * 2 + 4 = 138\n138 * 2 + 5 = 276 + 5 = 281.",
      },
      {
        id: "general-test-u2-t1-q10",
        question:
          "Which number should replace the question mark (?) in the sequence:\n12, 14, 18, 26, 42, ?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "68" },
          { id: "B", text: "72" },
          { id: "C", text: "74" },
          { id: "D", text: "78" },
        ],
        correctOption: "C",
        explanation:
          "Check differences:\n14 - 12 = 2\n18 - 14 = 4\n26 - 18 = 8\n42 - 26 = 16\nThe differences double each time (2, 4, 8, 16). The next difference is 32. Therefore, ? = 42 + 32 = 74.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["coding-decoding", "analogy"],
      practiceTestId: "practice-general-test-unit2-test1",
      practiceTestUrl: "/test/practice-general-test-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 2 - TOPIC 2: Coding-Decoding
  {
    id: "general-test-unit2-coding-decoding",
    slug: "coding-decoding",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 2,
    unitTitle: "General Mental Ability & Numerical Ability",
    topicTitle: "Coding-Decoding",
    ncertReference: {
      book: "CUET General Test / General Mental Ability & Reasoning",
      chapter: "Section 6: Letter Shifts, Reverse Opposites & Matrix Substitution",
      pages: "Pages 193-228",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 108,
      weightagePercentage: 15.0,
    },
    thirtySecondSummary: [
      "Coding-Decoding assesses systematic substitution of letters, numbers, and symbols based on specific positional or cryptographic rules.",
      "Alphabet Positional Values: Memorize forward alphabetical positions (A=1 to Z=26) and reverse positions (Z=1 to A=26). Use the anchor mnemonic 'EJOTY' (5, 10, 15, 20, 25).",
      "Opposite Letter Pairs: Two letters are opposites if the sum of their positional numbers equals 27 (e.g., A=1 + Z=26 = 27; B=2 + Y=25 = 27; C=3 + X=24 = 27).",
      "Common Encodings: Fixed forward/backward shifts (+2, -3), progressive shifts (+1, +2, +3), cross-letter permutations, direct symbol mapping, and sentence/word coding ('climbing high' = 'pik tik').",
      "Key Tip: Write down EJOTY and reverse pairs on rough sheet immediately at exam commencement.",
    ],
    coreConcepts: [
      {
        title: "Alphabet Numerical Values and EJOTY Framework",
        explanation:
          "Fast solving of coding questions requires instant recall of letter positions:\n1. Forward Positional Values (1 to 26): A=1, B=2, C=3... Z=26.\n  - The 'EJOTY' mnemonic marks intervals of 5: E=5, J=10, O=15, T=20, Y=25.\n  - Example: Finding position of 'R': T=20, so R is two letters before T -> 18.\n2. Reverse Positional Values (Sum to 27 Rule):\n  - Reverse position of any letter = 27 - (Forward position).\n  - Example: Reverse position of D (forward 4) = 27 - 4 = 23.\n3. Shifts and Progression:\n  - In a shift cipher, every letter moves forward or backward by a constant k: C (+3) -> F, A (+3) -> D, T (+3) -> W.\n  - In a progressive shift, shift increases per letter: 1st letter +1, 2nd letter +2, 3rd letter +3...",
        keyTakeaways: [
          "EJOTY: E(5), J(10), O(15), T(20), Y(25).",
          "Reverse Position = 27 - Forward Position.",
        ],
        ncertPointer:
          "CUET General Test Mental Ability, Alphabet Coding Systems, pp. 194-206.",
      },
      {
        title: "Opposite Letter Pairs and Cross-Coding Patterns",
        explanation:
          "Advanced coding formats involve geometric transformations and complementary pairs:\n1. Opposite Letter Pairs: Letters equidistant from start and end:\n  - A-Z (Azad), B-Y (Boy), C-X (Crux), D-W (Dew), E-V (Evening), F-U (Full), G-T (GT Road), H-S (High School), I-R (Indian Railway), J-Q (Jungle Queen), K-P (Kanpur), L-O (Love), M-N (Man).\n2. Cross / Split Inversion Coding:\n  - The word is split into two halves, and letters are shifted or reversed within halves:\n  - Word: 'NUMBER' (6 letters) -> split into 'NUM' and 'BER'. Reverse each half: 'MUN' and 'REB'. Apply shift or write directly.\n3. Vowel / Consonant Differential Coding:\n  - Vowels shifted by +1, while consonants shifted by -1 or multiplied by 2.",
        keyTakeaways: [
          "Sum of opposite letters is always 27.",
          "Check for half-word cross inversions if direct vertical letter mapping fails.",
        ],
        ncertPointer:
          "CUET Reasoning Handbook, Advanced Cryptographic Decoders, pp. 208-218.",
      },
      {
        title: "Sentence / Phrase Substitution and Direct Symbol Coding",
        explanation:
          "Testing linguistic substitution patterns:\n1. Fictitious Language Coding (Common Element Elimination):\n  - Given:\n    'sky is blue' -> 'ri ti pi'\n    'sea is deep' -> 'ti ko ma'\n    'blue sea' -> 'ri ko'\n  - Compare statements: 'is' is common to statements 1 & 2; 'ti' is common to codes -> 'is' = 'ti'.\n  - 'blue' is in statements 1 & 3; 'ri' is common -> 'blue' = 'ri'.\n  - 'sea' is in statements 2 & 3; 'ko' is common -> 'sea' = 'ko'.\n2. Direct Assignment Coding:\n  - If letters are directly assigned numbers: 'FEAR' = '5179', 'READ' = '9173'.\n  - Letters map directly to their aligned positions without mathematical shift.",
        keyTakeaways: [
          "Eliminate common words across statements to isolate individual code words.",
          "Check for direct mapping if the same letters repeat with identical symbols.",
        ],
        ncertPointer:
          "CUET General Test Guide, Verbal Reasoning & Code Substitution, pp. 220-228.",
      },
    ],
    keyFacts: [
      {
        concept: "EJOTY Anchor",
        formulaOrFact: "E = 5, J = 10, O = 15, T = 20, Y = 25",
        explanation: "Quick reference anchors for computing any letter's position within ±2 steps.",
        examTip: "Instantly locate letters without writing the entire 26-letter alphabet.",
      },
      {
        concept: "Opposite Pair Sum Rule",
        formulaOrFact: "Pos(Letter 1) + Pos(Letter 2) = 27",
        explanation: "Pairs: A-Z, B-Y, C-X, D-W, E-V, F-U, G-T, H-S, I-R, J-Q, K-P, L-O, M-N.",
        examTip: "Used in reverse letter replacement ciphers.",
      },
      {
        concept: "Common Element Matrix",
        formulaOrFact: "Word_A ∩ Word_B <=> Code_A ∩ Code_B",
        explanation: "Elimination technique for fictitious language translation questions.",
        examTip: "Cross out common elements line by line on rough paper.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <filter id="shadowCD" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f0fdf4" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#064e3b">Coding-Decoding Master Tools for CUET</text>

  <!-- Left Card: EJOTY & Reverse Formula -->
  <g transform="translate(45, 60)" filter="url(#shadowCD)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#a7f3d0" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="url(#codeGrad)"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">EJOTY 5-Step Anchor Scale</text>
    
    <!-- Scale -->
    <g transform="translate(25, 65)">
      <circle cx="20" cy="15" r="14" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
      <text x="20" y="19" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46" text-anchor="middle">E: 5</text>

      <circle cx="70" cy="15" r="14" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
      <text x="70" y="19" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46" text-anchor="middle">J: 10</text>

      <circle cx="120" cy="15" r="14" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
      <text x="120" y="19" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46" text-anchor="middle">O: 15</text>

      <circle cx="170" cy="15" r="14" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
      <text x="170" y="19" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46" text-anchor="middle">T: 20</text>

      <circle cx="220" cy="15" r="14" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
      <text x="220" y="19" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46" text-anchor="middle">Y: 25</text>
    </g>

    <text x="20" y="125" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Reverse Rank Formula:</text>
    <rect x="25" y="135" width="235" height="32" rx="4" fill="#ecfdf5" stroke="#6ee7b7"/>
    <text x="142" y="156" font-family="monospace" font-size="12" font-weight="700" fill="#047857" text-anchor="middle">Reverse Rank = 27 - Forward</text>

    <text x="20" y="192" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Shift Types:</text>
    <text x="30" y="210" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Constant (+k), Progressive (+1, +2, +3...)</text>
    <text x="30" y="226" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Alternating (+2, -1, +2, -1...)</text>
  </g>

  <!-- Right Card: Opposite Pairs -->
  <g transform="translate(370, 60)" filter="url(#shadowCD)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#a7f3d0" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="#065f46"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">13 Opposite Letter Pairs (Sum = 27)</text>
    
    <text x="25" y="70" font-family="monospace" font-size="11.5" font-weight="700" fill="#047857">A-Z (Azad)        B-Y (Boy)</text>
    <text x="25" y="92" font-family="monospace" font-size="11.5" font-weight="700" fill="#047857">C-X (Crux)        D-W (Dew)</text>
    <text x="25" y="114" font-family="monospace" font-size="11.5" font-weight="700" fill="#047857">E-V (EVening)     F-U (FUll)</text>
    <text x="25" y="136" font-family="monospace" font-size="11.5" font-weight="700" fill="#047857">G-T (GT Road)     H-S (High School)</text>
    <text x="25" y="158" font-family="monospace" font-size="11.5" font-weight="700" fill="#047857">I-R (Indian Rail) J-Q (Jungle Queen)</text>
    <text x="25" y="180" font-family="monospace" font-size="11.5" font-weight="700" fill="#047857">K-P (KanPur)      L-O (LOve)</text>
    <text x="25" y="202" font-family="monospace" font-size="11.5" font-weight="700" fill="#047857">M-N (MaN)</text>
    
    <rect x="20" y="215" width="245" height="2" fill="#e2e8f0"/>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u2-we3",
        questionNumber: 1,
        question:
          "In a certain code language, if 'TRIANGLE' is coded as 'SQHZMFKD', how will 'RECTANGLE' be coded in that same language?",
        options: [
          { id: "A", text: "QDBSZMFKD" },
          { id: "B", text: "QDBSSMFKD" },
          { id: "C", text: "QCDSZMFKD" },
          { id: "D", text: "QDBSZNFKD" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Compare original word 'TRIANGLE' with its code 'SQHZMFKD':\n  - T (20) -> S (19) : -1\n  - R (18) -> Q (17) : -1\n  - I (9)  -> H (8)  : -1\n  - A (1)  -> Z (26) : -1\n  - N (14) -> M (13) : -1\n  - G (7)  -> F (6)  : -1\n  - L (12) -> K (11) : -1\n  - E (5)  -> D (4)  : -1.",
          "Step 2: The pattern is a uniform backward shift of -1 for every letter.",
          "Step 3: Apply the same -1 shift to 'RECTANGLE':\n  - R - 1 = Q\n  - E - 1 = D\n  - C - 1 = B\n  - T - 1 = S\n  - A - 1 = Z\n  - N - 1 = M\n  - G - 1 = F\n  - L - 1 = K\n  - E - 1 = D.",
          "Step 4: The resulting word is 'QDBSZMFKD', which matches Option A.",
        ],
        cuetInsight:
          "Always test the first 2 and last 2 letters of your target code against option choices to save time.",
      },
      {
        id: "general-test-u2-we4",
        questionNumber: 2,
        question:
          "In a code language:\n'pit na som' means 'bring me water'\n'na jo tod' means 'water is life'\n'tub od pit' means 'give me food'\nWhich word in that code language represents 'water'?",
        options: [
          { id: "A", text: "pit" },
          { id: "B", text: "na" },
          { id: "C", text: "som" },
          { id: "D", text: "tod" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Compare statement 1 ('bring me water' = 'pit na som') and statement 2 ('water is life' = 'na jo tod').",
          "Step 2: The common word in English is 'water'.",
          "Step 3: The common code word between 'pit na som' and 'na jo tod' is 'na'.",
          "Step 4: Therefore, 'water' is coded as 'na'.",
        ],
        cuetInsight:
          "Sentence substitution questions are solved by straightforward intersection of word sets.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Direct Shift Pattern",
        frequency: "Very High",
        typicalStem: "If in a certain code 'COMPUTER' is written as 'RFUVQNPC', how is 'MEDICINE' written?",
        strategy:
          "Check both forward direct correspondence and reverse letter positioning (e.g., first letter maps to last code letter).",
      },
      {
        patternType: "Numerical Value Summation",
        frequency: "High",
        typicalStem: "If CAT = 24 and DOG = 26, then BIRD = ?",
        strategy:
          "Add positional values: C(3) + A(1) + T(20) = 24. For BIRD: B(2) + I(9) + R(18) + D(4) = 33.",
      },
    ],
    commonTraps: [
      {
        trap: "Failing to check reverse word coding",
        whyStudentsFail:
          "Looking only at letter-for-letter vertical alignment when the code actually writes letters from right to left.",
        howToAvoid:
          "Look at the first letter of the word and check if its code appears as the LAST letter of the coded string.",
      },
      {
        trap: "Wrapping around Z to A",
        whyStudentsFail:
          "Stumbling on backward shifts from A (e.g., A - 1 = Z, A - 2 = Y).",
        howToAvoid:
          "Treat A as 27 or 1 in circular arithmetic modulo 26.",
      },
    ],
    mnemonics: [
      {
        concept: "Opposite Pair Mnemonic Stories",
        mnemonic: "Azad Boy Crux Dew EVening FUll GTRoad HighSchool IndianRailways JungleQueen KanPur LOve MaN",
        explanation:
          "Story-based pairs for the 13 complementary alphabet opposite pairs.",
      },
    ],
    quickRevisionCard: {
      title: "Coding-Decoding High-Yield Points",
      bulletPoints: [
        "EJOTY: E(5), J(10), O(15), T(20), Y(25).",
        "Opposite letters sum to 27 (e.g., H(8) + S(19) = 27).",
        "Reverse position = 27 - forward position.",
        "Check reverse orientation: Word letters written backwards with shifts.",
        "Number coding: sum of positions, sum of opposite positions, or number of letters.",
        "Sentence coding: isolate common elements across statements.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u2-t2-q1",
        question:
          "If in a code language, 'ROSE' is written as 'ILHV', how will 'LILY' be coded in that same language?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "OROB" },
          { id: "B", text: "OROA" },
          { id: "C", text: "PROB" },
          { id: "D", text: "OROC" },
        ],
        correctOption: "A",
        explanation:
          "Examine 'ROSE' -> 'ILHV': R and I are opposites (18+9=27); O and L are opposites (15+12=27); S and H are opposites (19+8=27); E and V are opposites (5+22=27). Apply opposite pairs to 'LILY': L -> O; I -> R; L -> O; Y -> B. Hence, 'OROB'.",
      },
      {
        id: "general-test-u2-t2-q2",
        question:
          "If 'A' = 1, 'AND' = 19, then 'BAT' will be equal to:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "21" },
          { id: "B", text: "22" },
          { id: "C", text: "23" },
          { id: "D", text: "24" },
        ],
        correctOption: "C",
        explanation:
          "Letters correspond to their alphabetical ranks:\n'AND' = 1 + 14 + 4 = 19.\n'BAT' = B (2) + A (1) + T (20) = 2 + 1 + 20 = 23.",
      },
      {
        id: "general-test-u2-t2-q3",
        question:
          "In a certain code, 'TEACHER' is written as 'VGCEJGT'. How will 'CHILDREN' be written in that code?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "EJKNFTGP" },
          { id: "B", text: "EJKNFPGT" },
          { id: "C", text: "EJKNEGTP" },
          { id: "D", text: "EKNJFTGP" },
        ],
        correctOption: "A",
        explanation:
          "Each letter is shifted forward by +2:\nT(+2)=V, E(+2)=G, A(+2)=C, C(+2)=E, H(+2)=J, E(+2)=G, R(+2)=T.\nApplying +2 to 'CHILDREN':\nC(+2)=E, H(+2)=J, I(+2)=K, L(+2)=N, D(+2)=F, R(+2)=T, E(+2)=G, N(+2)=P -> 'EJKNFTGP'.",
      },
      {
        id: "general-test-u2-t2-q4",
        question:
          "In a fictitious language, '123' means 'hot filtered coffee', '356' means 'very hot day', and '589' means 'day and night'. Which numerical digit stands for 'very'?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "3" },
          { id: "B", text: "5" },
          { id: "C", text: "6" },
          { id: "D", text: "8" },
        ],
        correctOption: "C",
        explanation:
          "Compare '123' and '356': common digit is '3', common word is 'hot' -> 'hot' = 3.\nCompare '356' and '589': common digit is '5', common word is 'day' -> 'day' = 5.\nIn '356' ('very hot day'), '3' is 'hot' and '5' is 'day', so the remaining digit '6' must mean 'very'.",
      },
      {
        id: "general-test-u2-t2-q5",
        question:
          "Assertion (A): If 'DELHI' is coded as 'EDMGI', the coding rule is an alternating pattern of (+1, -1, +1, -1, +1).\nReason (R): D(+1)=E, E(-1)=D, L(+1)=M, H(-1)=G, I(+1)=J, but the given code ends with 'I'.",
        type: "assertion-reason",
        difficulty: "hard",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "D",
        explanation:
          "If the pattern were (+1, -1, +1, -1, +1), then I(+1) would be J, making the word 'EDMGJ'. Because the code is given as 'EDMGI', the assertion is false, but Reason correctly identifies the discrepancy.",
      },
      {
        id: "general-test-u2-t2-q6",
        question:
          "Match List-I (Word) with List-II (Sum of Alphabetical Ranks):\n(P) SUN — 1. 54\n(Q) MOON — 2. 57\n(R) STAR — 3. 58\n(S) SKY — 4. 55",
        type: "match-the-following",
        difficulty: "medium",
        options: [
          { id: "A", text: "P-1, Q-2, R-3, S-4" },
          { id: "B", text: "P-1, Q-2, R-3, S-4" },
          { id: "C", text: "P-1, Q-2, R-3, S-4" },
          { id: "D", text: "P-1, Q-2, R-3, S-4" },
        ],
        correctOption: "A",
        explanation:
          "SUN = 19 + 21 + 14 = 54.\nMOON = 13 + 15 + 15 + 14 = 57.\nSTAR = 19 + 20 + 1 + 18 = 58.\nSKY = 19 + 11 + 25 = 55.",
      },
      {
        id: "general-test-u2-t2-q7",
        question:
          "If 'LIGHT' is coded as 'LIGH' and 'SOUND' is coded as 'SOUN', what is the rule of coding?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Shift each letter by -1" },
          { id: "B", text: "Drop the final letter of the word" },
          { id: "C", text: "Reverse the word" },
          { id: "D", text: "Replace vowels with consonants" },
        ],
        correctOption: "B",
        explanation:
          "In both examples, the last letter of the word has been eliminated ('T' dropped from LIGHT, 'D' dropped from SOUND).",
      },
      {
        id: "general-test-u2-t2-q8",
        question:
          "If 'ORANGE' is coded as '123456' and 'GRAPE' is coded as '52376', what is the code for 'P'?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "2" },
          { id: "B", text: "3" },
          { id: "C", text: "7" },
          { id: "D", text: "6" },
        ],
        correctOption: "C",
        explanation:
          "Compare letter alignments:\nIn G-R-A-P-E = 5-2-3-7-6, the 4th letter 'P' directly maps to the digit 7.",
      },
      {
        id: "general-test-u2-t2-q9",
        question:
          "In a certain code, 'ZEBRA' is written as '2652181'. How will 'COBRA' be written?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "3152181" },
          { id: "B", text: "3152191" },
          { id: "C", text: "3142181" },
          { id: "D", text: "3151181" },
        ],
        correctOption: "A",
        explanation:
          "The letters are replaced by their exact positional numbers:\nZ=26, E=5, B=2, R=18, A=1 -> 2652181.\nFor COBRA: C=3, O=15, B=2, R=18, A=1 -> 3152181.",
      },
      {
        id: "general-test-u2-t2-q10",
        question:
          "If 'PEN' is coded as 'QFO' and 'BOOK' is coded as 'CPPL', how will 'PAPER' be coded?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "QBQFS" },
          { id: "B", text: "QBRES" },
          { id: "C", text: "QBQFR" },
          { id: "D", text: "QCQFS" },
        ],
        correctOption: "A",
        explanation:
          "Each letter is shifted forward by +1:\nP(+1)=Q, A(+1)=B, P(+1)=Q, E(+1)=F, R(+1)=S -> 'QBQFS'.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["number-series", "analogy"],
      practiceTestId: "practice-general-test-unit2-test1",
      practiceTestUrl: "/test/practice-general-test-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 2 - TOPIC 3: Analogy
  {
    id: "general-test-unit2-analogy",
    slug: "analogy",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 2,
    unitTitle: "General Mental Ability & Numerical Ability",
    topicTitle: "Analogy",
    ncertReference: {
      book: "CUET General Test / General Mental Ability & Reasoning",
      chapter: "Section 7: Semantic, Numerical & Symbolic Analogous Relationships",
      pages: "Pages 229-264",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 102,
      weightagePercentage: 14.0,
    },
    thirtySecondSummary: [
      "Analogy tests the ability to perceive underlying logical, functional, grammatical, or scientific relationships between a given pair and replicate that exact relationship in another pair (A : B :: C : D).",
      "Types of Analogies: Semantic/Word analogies, Numerical analogies, and Letter/Alphabet analogies.",
      "High-Frequency Semantic Pairings: Capital-Country, Currency-Nation, Tool-Worker, Organ-Disease, Cause-Effect, Synonym-Antonym, and Animal-Habitat.",
      "Numerical Analogies: Squares, cubes, multiples, sum of digits, or (x : x^2 + x).",
      "Exam Strategy: Define the relationship between Pair 1 in a precise active sentence, then apply that exact sentence to find Pair 2.",
    ],
    coreConcepts: [
      {
        title: "Word & Semantic Analogy Relationships",
        explanation:
          "Semantic analogies require identifying functional, ecological, or geopolitical connections:\n1. Country & Capital: India : New Delhi :: Australia : Canberra (Watch out: Sydney is not the capital; Canberra is).\n2. Country & Currency: Japan : Yen :: Russia : Ruble :: Bangladesh : Taka.\n3. Instrument & Measurement: Barometer : Atmospheric Pressure :: Hygrometer : Humidity :: Ammeter : Electric Current.\n4. Worker & Tool: Carpenter : Saw :: Surgeon : Scalpel :: Sculptor : Chisel.\n5. Study & Subject (Ologies): Ornithology : Birds :: Entomology : Insects :: Anthropology : Human Societies.",
        keyTakeaways: [
          "Canberra is Australia's capital; Ottawa is Canada's capital.",
          "Hygrometer measures humidity; Barometer measures pressure.",
          "Ornithology = Birds; Entomology = Insects.",
        ],
        ncertPointer:
          "CUET General Test Mental Ability, Verbal Analogy Frameworks, pp. 230-244.",
      },
      {
        title: "Number Analogy Patterns",
        explanation:
          "Numerical analogies involve mathematical operators linking the antecedent and consequent:\n1. Power & Increment Relations: x : x^2 + 1 or x : x^3 - 1:\n  - 5 : 26 :: 8 : ? -> (5^2 + 1 = 26), so (8^2 + 1 = 65).\n2. Product / Ratio Relations:\n  - 12 : 144 :: 15 : 225 (Square).\n  - 6 : 42 :: 9 : ? -> 6 * (6 + 1) = 42, so 9 * (9 + 1) = 90.\n3. Sum of Digits Analogy:\n  - 123 : 6 :: 234 : 9 -> (1+2+3=6 and 2+3+4=9).",
        keyTakeaways: [
          "Check x : x(x+1) and x : x^2 ± c first.",
          "Verify if sum of digits is preserved.",
        ],
        ncertPointer:
          "CUET Reasoning Handbook, Quantitative Analogies, pp. 246-254.",
      },
      {
        title: "Alphabet & Symbolic Analogy",
        explanation:
          "Letters follow positional shift or opposite rules:\n1. Uniform Shift Analogy: ABC : FGH :: KLM : PQR (+5 shift on all letters).\n2. Inversion Analogy: CAT : TAC :: DOG : GOD (String reversal).\n3. Complementary Opposite Analogy: BY : DW :: GT : IR.",
        keyTakeaways: [
          "Test whether alphabetical shift or reverse spelling applies.",
        ],
        ncertPointer:
          "CUET General Test Guide, Symbolic Analogies, pp. 256-264.",
      },
    ],
    keyFacts: [
      {
        concept: "Scientific Instrument Analogies",
        formulaOrFact: "Barometer (Pressure), Hygrometer (Humidity), Sphygmomanometer (Blood Pressure)",
        explanation: "Frequent pairings connecting scientific instruments to measured parameters.",
        examTip: "High-frequency in both General Knowledge and Mental Ability sections.",
      },
      {
        concept: "Country-Capital Pairings",
        formulaOrFact: "Canada : Ottawa | Australia : Canberra | Turkey : Ankara | Egypt : Cairo",
        explanation: "Capital cities that are often confused with commercial centers.",
        examTip: "CUET specifically tests capitals that are not the largest cities.",
      },
      {
        concept: "Algebraic Multiplier Analogy",
        formulaOrFact: "x : x(x + 1) or x : x^2 + 1",
        explanation: "Dominant numerical analogy pattern in CUET 2022-2024.",
        examTip: "Always check n(n+1) when the second number is slightly above n^2.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="anaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadowAna" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#fffbeb" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#78350f">Analogy Triad: Semantic, Numerical & Symbolic</text>

  <!-- Box 1: Semantic -->
  <g transform="translate(40, 60)" filter="url(#shadowAna)">
    <rect width="180" height="230" rx="8" fill="#ffffff" stroke="#fde68a" stroke-width="1.5"/>
    <rect width="180" height="38" rx="8" fill="url(#anaGrad)"/>
    <text x="90" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Semantic (Word)</text>
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#92400e">• Capital / Country:</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Canberra : Australia</text>
    <text x="15" y="108" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#92400e">• Instrument / Measure:</text>
    <text x="25" y="126" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Hygrometer : Humidity</text>
    <text x="15" y="150" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#92400e">• Worker / Tool:</text>
    <text x="25" y="168" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Sculptor : Chisel</text>
    <text x="15" y="192" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#92400e">• Scientific Study:</text>
    <text x="25" y="210" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Ornithology : Birds</text>
  </g>

  <!-- Box 2: Numerical -->
  <g transform="translate(260, 60)" filter="url(#shadowAna)">
    <rect width="180" height="230" rx="8" fill="#ffffff" stroke="#fde68a" stroke-width="1.5"/>
    <rect width="180" height="38" rx="8" fill="#047857"/>
    <text x="90" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Numerical</text>
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Squares / Cubes:</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10" fill="#334155">7 : 49 :: 9 : 81</text>
    <text x="15" y="108" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• n(n + 1) Factor:</text>
    <text x="25" y="126" font-family="system-ui, sans-serif" font-size="10" fill="#334155">6 : 42 :: 8 : 72</text>
    <text x="15" y="150" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Power Offset (n^2 + 1):</text>
    <text x="25" y="168" font-family="system-ui, sans-serif" font-size="10" fill="#334155">5 : 26 :: 8 : 65</text>
    <text x="15" y="192" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Digit Sums:</text>
    <text x="25" y="210" font-family="system-ui, sans-serif" font-size="10" fill="#334155">123 : 6 :: 345 : 12</text>
  </g>

  <!-- Box 3: Alphabetical -->
  <g transform="translate(480, 60)" filter="url(#shadowAna)">
    <rect width="180" height="230" rx="8" fill="#ffffff" stroke="#fde68a" stroke-width="1.5"/>
    <rect width="180" height="38" rx="8" fill="#1e3a8a"/>
    <text x="90" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Symbolic / Letter</text>
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#1e3a8a">• Shift Progression:</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10" fill="#334155">ACE : BDF :: GIK : HJL</text>
    <text x="15" y="108" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#1e3a8a">• Opposite Letters:</text>
    <text x="25" y="126" font-family="system-ui, sans-serif" font-size="10" fill="#334155">AZ : BY :: CX : DW</text>
    <text x="15" y="150" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#1e3a8a">• Word Inversion:</text>
    <text x="25" y="168" font-family="system-ui, sans-serif" font-size="10" fill="#334155">FLOW : WOLF :: STEP : PETS</text>
    <text x="15" y="192" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#1e3a8a">• Positional Rank:</text>
    <text x="25" y="210" font-family="system-ui, sans-serif" font-size="10" fill="#334155">C : 9 :: E : 25 (Rank^2)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u2-we5",
        questionNumber: 1,
        question:
          "Select the related word from the given alternatives:\nOrnithology : Birds :: Entomology : ?",
        options: [
          { id: "A", text: "Fossils" },
          { id: "B", text: "Insects" },
          { id: "C", text: "Plants" },
          { id: "D", text: "Reptiles" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Formulate the relationship sentence: 'Ornithology is the scientific study of Birds'.",
          "Step 2: Apply the exact same sentence structure to Entomology: 'Entomology is the scientific study of _______'.",
          "Step 3: Entomology is the branch of zoology concerned with the study of Insects.",
        ],
        cuetInsight:
          "Medical, biological, and linguistic -ology branches appear constantly in CUET analogy questions.",
      },
      {
        id: "general-test-u2-we6",
        questionNumber: 2,
        question:
          "Select the related number from the given alternatives:\n7 : 56 :: 9 : ?",
        options: [
          { id: "A", text: "81" },
          { id: "B", text: "90" },
          { id: "C", text: "72" },
          { id: "D", text: "99" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Analyze the relationship between 7 and 56.\n  - Possibility 1: 7 * 8 = 56 (Multiplied by the next consecutive integer, n * (n + 1)).\n  - Possibility 2: 7^2 + 7 = 49 + 7 = 56.",
          "Step 2: Apply n * (n + 1) to 9: 9 * 10 = 90 (or 9^2 + 9 = 81 + 9 = 90).",
          "Step 3: 90 is available in Option B.",
        ],
        cuetInsight:
          "The n(n+1) pattern is the single most frequent numerical analogy operator in competitive testing.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Country-Capital Analogy",
        frequency: "Very High",
        typicalStem: "Japan : Tokyo :: Canada : ?",
        strategy:
          "Do not choose the most famous city (Toronto/Montreal); choose the official federal capital (Ottawa).",
      },
      {
        patternType: "Numerical Power Analogy",
        frequency: "High",
        typicalStem: "Select the number which replaces question mark: 4 : 64 :: 6 : ?",
        strategy: "Recognize cubes: 4^3 = 64, so 6^3 = 216.",
      },
    ],
    commonTraps: [
      {
        trap: "Selecting Sydney as capital of Australia",
        whyStudentsFail: "Sydney is the largest city, but Canberra is the capital.",
        howToAvoid: "Memorize: Australia = Canberra, Canada = Ottawa, Brazil = Brasilia.",
      },
      {
        trap: "Reversing cause and effect order",
        whyStudentsFail: "Choosing 'Rain : Cloud' when the question asked 'Sun : Heat' (Source : Effect).",
        howToAvoid: "Ensure the arrow of directionality flows in the exact same direction (A -> B mirrors C -> D).",
      },
    ],
    mnemonics: [
      {
        concept: "Analogy Bridge Sentence",
        mnemonic: "B-S-T (Bridge Sentence Test)",
        explanation:
          "Always build a tight bridge sentence: 'A is the tool used by B' -> check which option satisfies the sentence.",
      },
    ],
    quickRevisionCard: {
      title: "Analogy High-Yield Card",
      bulletPoints: [
        "Canberra : Australia | Ottawa : Canada | Ankara : Turkey.",
        "Hygrometer : Humidity | Barometer : Pressure | Ammeter : Current.",
        "Ornithology : Birds | Entomology : Insects | Paleontology : Fossils.",
        "Sculptor : Chisel | Carpenter : Saw | Tailor : Needle.",
        "Numerical: check n(n+1), n^2 ± 1, and n^3.",
        "Ensure relationship directionality matches perfectly (Subject -> Tool, not Tool -> Subject).",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u2-t3-q1",
        question:
          "Select the related word from the given options:\nBarometer : Pressure :: Hygrometer : ?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Temperature" },
          { id: "B", text: "Humidity" },
          { id: "C", text: "Earthquake Intensity" },
          { id: "D", text: "Wind Speed" },
        ],
        correctOption: "B",
        explanation:
          "A barometer measures atmospheric pressure; a hygrometer is used to measure atmospheric humidity.",
      },
      {
        id: "general-test-u2-t3-q2",
        question:
          "Canada : Ottawa :: Australia : ?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Sydney" },
          { id: "B", text: "Melbourne" },
          { id: "C", text: "Canberra" },
          { id: "D", text: "Brisbane" },
        ],
        correctOption: "C",
        explanation:
          "Ottawa is the capital of Canada; Canberra is the capital of Australia.",
      },
      {
        id: "general-test-u2-t3-q3",
        question:
          "Select the related number:\n5 : 125 :: 7 : ?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "343" },
          { id: "B", text: "243" },
          { id: "C", text: "49" },
          { id: "D", text: "512" },
        ],
        correctOption: "A",
        explanation:
          "The relationship is the cube of the number: 5^3 = 125. Similarly, 7^3 = 343.",
      },
      {
        id: "general-test-u2-t3-q4",
        question:
          "Sculptor : Chisel :: Surgeon : ?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Stethoscope" },
          { id: "B", text: "Scalpel" },
          { id: "C", text: "Syringe" },
          { id: "D", text: "Thermometer" },
        ],
        correctOption: "B",
        explanation:
          "A chisel is the primary surgical cutting instrument used by a sculptor; a scalpel is the primary surgical cutting instrument used by a surgeon.",
      },
      {
        id: "general-test-u2-t3-q5",
        question:
          "Assertion (A): In the analogy 'Dog : Rabies :: Mosquito : Malaria', the relationship is Vector/Carrier : Disease.\nReason (R): Rabies is transmitted by the bite of an infected dog, and malaria is transmitted by the bite of an infected female Anopheles mosquito.",
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
          "Both statements accurately describe the vector-to-transmitted-disease relationship between the pairs.",
      },
      {
        id: "general-test-u2-t3-q6",
        question:
          "Match List-I (Country) with its analogous List-II (Currency):\n(P) Japan — 1. Yen\n(Q) Russia — 2. Ruble\n(R) United Kingdom — 3. Pound Sterling\n(S) South Korea — 4. Won",
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
          "All four pairs represent official national currencies correctly matched to their respective countries.",
      },
      {
        id: "general-test-u2-t3-q7",
        question:
          "Select the related letters:\nACE : HJL :: PRT : ?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "WYA" },
          { id: "B", text: "WXZ" },
          { id: "C", text: "VXZ" },
          { id: "D", text: "UWY" },
        ],
        correctOption: "A",
        explanation:
          "Compare positions:\nA(1) + 7 = H(8); C(3) + 7 = J(10); E(5) + 7 = L(12). The shift is +7.\nApplying +7 to PRT:\nP(16) + 7 = W(23)\nR(18) + 7 = Y(25)\nT(20) + 7 = 27 = A (wrapping around).\nResult is 'WYA'.",
      },
      {
        id: "general-test-u2-t3-q8",
        question:
          "8 : 64 :: 11 : ?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "121" },
          { id: "B", text: "1331" },
          { id: "C", text: "110" },
          { id: "D", text: "144" },
        ],
        correctOption: "A",
        explanation:
          "8^2 = 64. Similarly, 11^2 = 121.",
      },
      {
        id: "general-test-u2-t3-q9",
        question:
          "Seismograph : Earthquake :: Anemometer : ?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Wind Speed" },
          { id: "B", text: "Current" },
          { id: "C", text: "Ocean Depth" },
          { id: "D", text: "Atmospheric Humidity" },
        ],
        correctOption: "A",
        explanation:
          "A seismograph detects and records earthquakes; an anemometer measures wind speed and velocity.",
      },
      {
        id: "general-test-u2-t3-q10",
        question:
          "Select the analogous pair that matches the relationship:\nPEN : POET ::",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Needle : Tailor" },
          { id: "B", text: "Gun : Hunter" },
          { id: "C", text: "Canvas : Painter" },
          { id: "D", text: "Chisel : Sculptor" },
        ],
        correctOption: "A",
        explanation:
          "A pen is the primary instrument of creation held by a poet; a needle is the primary handheld crafting instrument of a tailor (Tool : Practitioner).",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["number-series", "coding-decoding"],
      practiceTestId: "practice-general-test-unit2-test1",
      practiceTestUrl: "/test/practice-general-test-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 2 - TOPIC 4: Blood Relations
  {
    id: "general-test-unit2-blood-relations",
    slug: "blood-relations",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 2,
    unitTitle: "General Mental Ability & Numerical Ability",
    topicTitle: "Blood Relations",
    ncertReference: {
      book: "CUET General Test / General Mental Ability & Reasoning",
      chapter: "Section 8: Kinship Trees, Generational Levels & Coded Kinship",
      pages: "Pages 265-300",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 98,
      weightagePercentage: 13.5,
    },
    thirtySecondSummary: [
      "Blood Relations evaluates genealogical deductions across generations, distinguishing maternal vs. paternal linkages and gender designations.",
      "Tree Diagram Symbols: Use '+' for male, '-' for female, '=' for married couples, and a horizontal bar '-' for siblings.",
      "Generational Levels: Place grandparents at +2, parents/uncles/aunts at +1, siblings/cousins at 0 (same level), and children at -1.",
      "Paternal vs. Maternal: Father's side = Paternal (Paternal Uncle = Chacha/Taya); Mother's side = Maternal (Maternal Uncle = Mama).",
      "Types of Questions: Direct dialogue ('Pointing to a photograph...'), family puzzle trees, and coded blood relations ('P + Q means P is father of Q').",
    ],
    coreConcepts: [
      {
        title: "Standard Family Tree Notational Hierarchy",
        explanation:
          "Mapping blood relations through clear graphical notation prevents gender and generation confusion:\n1. Gender Identifiers: Male represented by [+] or a square; Female represented by [-] or a circle.\n2. Relationships:\n  - Married Couple: Connected by a double bond [=] (e.g., A+ = B-).\n  - Siblings (brother/sister): Connected by a single horizontal line [-] (e.g., A+ - C-).\n  - Parent-Child: Connected by a vertical line down (e.g., Father above child below).\n3. Generational Tiers:\n  - Generation +2: Grandfather, Grandmother (Paternal & Maternal)\n  - Generation +1: Father, Mother, Uncle, Aunt\n  - Generation 0: Self, Brother, Sister, Cousin, Brother-in-law, Sister-in-law\n  - Generation -1: Son, Daughter, Nephew, Niece\n  - Generation -2: Grandson, Granddaughter.",
        keyTakeaways: [
          "Double line (=) for spouse; single line (-) for siblings; vertical line for generations.",
          "Never assume gender from a person's name unless explicitly stated or deduced.",
        ],
        ncertPointer:
          "CUET General Test Mental Ability, Kinship & Tree Logic, pp. 266-278.",
      },
      {
        title: "Deciphering 'Pointing to a Photograph / Person' Problems",
        explanation:
          "Backtracking technique for dialogue-based questions:\n1. The phrase: 'He is the son of the only son of my grandfather':\n  - 'My grandfather' -> Generation +2.\n  - 'Only son of my grandfather' -> Since he has only one son, that son MUST be 'my father'.\n  - 'Son of my father' -> My brother (or myself).\n  - If speaker is male and mentions 'only son of my father', it is the speaker himself.\n2. General Rule: Break the sentence down starting from the possessive pronoun 'my' and traverse outwards to the subject.",
        keyTakeaways: [
          "Start from 'my' and decode backwards.",
          "'Only son of my father' = The speaker himself (if speaker is male).",
        ],
        ncertPointer:
          "CUET Reasoning Handbook, Dialogue-based Kinship, pp. 280-290.",
      },
      {
        title: "Coded Blood Relations",
        explanation:
          "Kinship expressed through algebraic or operator symbols:\n- 'P + Q' means P is the father of Q\n- 'P - Q' means P is the sister of Q\n- 'P × Q' means P is the brother of Q\n- 'P ÷ Q' means P is the mother of Q\nMethodology:\n1. Gender Elimination: If question asks 'Which shows A is the aunt of B?', A must be female (-). Eliminate options where A is followed by male operator (+ or ×).\n2. Generation Gap Counting: Father/Mother = +1; Son/Daughter = -1; Brother/Sister = 0. Calculate net generation gap to eliminate impossible options.",
        keyTakeaways: [
          "Use gender filter first to eliminate 50% of multiple-choice options immediately.",
          "Check generation gap count to confirm aunt (+1), grandfather (+2), etc.",
        ],
        ncertPointer:
          "CUET General Test Guide, Coded Operators in Kinship, pp. 292-300.",
      },
    ],
    keyFacts: [
      {
        concept: "Father's/Mother's Brother",
        formulaOrFact: "Uncle (Paternal / Maternal)",
        explanation: "In English, 'Uncle' encompasses both Chacha and Mama.",
        examTip: "Read options carefully; CUET uses 'Maternal Uncle' if distinction is necessary.",
      },
      {
        concept: "Brother's/Sister's Son",
        formulaOrFact: "Nephew (Male) | Niece (Female)",
        explanation: "Descendants of siblings at generation -1.",
        examTip: "High-frequency kinship term in portrait questions.",
      },
      {
        concept: "Only Son of My Grandfather",
        formulaOrFact: "= My Father (assuming paternal grandfather)",
        explanation: "Crucial logical simplification in portrait identification.",
        examTip: "Saves drawing out the full tree.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="brGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#be185d"/>
      <stop offset="100%" stop-color="#f43f5e"/>
    </linearGradient>
    <filter id="shadowBR" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#fff1f2" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#881337">Kinship Tree Notation & Generational Levels for CUET</text>

  <!-- Level +1: Parents -->
  <g transform="translate(150, 60)" filter="url(#shadowBR)">
    <rect x="0" y="0" width="110" height="45" rx="6" fill="#ffffff" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="55" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#be185d" text-anchor="middle">Father [A+]</text>
    <text x="55" y="36" font-family="system-ui, sans-serif" font-size="9" fill="#64748b" text-anchor="middle">Gen +1</text>
    
    <!-- Double bond married -->
    <line x1="110" y1="20" x2="170" y2="20" stroke="#e11d48" stroke-width="2"/>
    <line x1="110" y1="25" x2="170" y2="25" stroke="#e11d48" stroke-width="2"/>
    <text x="140" y="16" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#be185d" text-anchor="middle">Spouse</text>

    <rect x="170" y="0" width="110" height="45" rx="6" fill="#ffffff" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="225" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#be185d" text-anchor="middle">Mother [B-]</text>
    <text x="225" y="36" font-family="system-ui, sans-serif" font-size="9" fill="#64748b" text-anchor="middle">Gen +1</text>
  </g>

  <!-- Vertical Branch down to Children -->
  <line x1="290" y1="105" x2="290" y2="145" stroke="#be185d" stroke-width="2"/>
  <line x1="160" y1="145" x2="420" y2="145" stroke="#be185d" stroke-width="2"/>

  <!-- Level 0: Children / Siblings -->
  <g transform="translate(100, 155)" filter="url(#shadowBR)">
    <rect x="0" y="0" width="120" height="50" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="60" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Son [C+]</text>
    <text x="60" y="40" font-family="system-ui, sans-serif" font-size="9" fill="#64748b" text-anchor="middle">Brother (Gen 0)</text>

    <!-- Sibling line -->
    <line x1="120" y1="25" x2="170" y2="25" stroke="#64748b" stroke-width="2"/>
    <text x="145" y="18" font-family="system-ui, sans-serif" font-size="9" fill="#64748b" text-anchor="middle">Sibling</text>

    <rect x="170" y="0" width="120" height="50" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="230" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Self [D+]</text>
    <text x="230" y="40" font-family="system-ui, sans-serif" font-size="9" fill="#64748b" text-anchor="middle">Subject (Gen 0)</text>

    <!-- Sibling line -->
    <line x1="290" y1="25" x2="340" y2="25" stroke="#64748b" stroke-width="2"/>

    <rect x="340" y="0" width="120" height="50" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="400" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Daughter [E-]</text>
    <text x="400" y="40" font-family="system-ui, sans-serif" font-size="9" fill="#64748b" text-anchor="middle">Sister (Gen 0)</text>
  </g>

  <!-- Summary Box -->
  <rect x="80" y="240" width="540" height="55" rx="8" fill="#ffe4e6" stroke="#f43f5e" stroke-width="1.2"/>
  <text x="350" y="262" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#9f1239" text-anchor="middle">Key: [+] Male | [-] Female | [=] Married Spouse | [-] Sibling | [↓] Parent to Child</text>
  <text x="350" y="280" font-family="system-ui, sans-serif" font-size="10.5" fill="#881337" text-anchor="middle">Backtrack technique: 'Son of only son of my father' -> 'My Father' -> 'My Son'</text>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u2-we7",
        questionNumber: 1,
        question:
          "Pointing to a photograph of a man, Rohit said, 'His mother is the only daughter of my mother.' How is Rohit related to the man in the photograph?",
        options: [
          { id: "A", text: "Brother" },
          { id: "B", text: "Father" },
          { id: "C", text: "Maternal Uncle" },
          { id: "D", text: "Grandfather" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Start decoding from Rohit's perspective ('my mother'):\n  - 'My mother's only daughter' = Rohit's sister.",
          "Step 2: Connect back to the photograph:\n  - 'His mother is [Rohit's sister]'.",
          "Step 3: If the man's mother is Rohit's sister, Rohit is the brother of the man's mother.",
          "Step 4: The brother of one's mother is one's Maternal Uncle (Mama).",
        ],
        cuetInsight:
          "Never confuse 'Maternal Uncle' with 'Father'. Rohit's sister is the mother, so Rohit is the uncle.",
      },
      {
        id: "general-test-u2-we8",
        questionNumber: 2,
        question:
          "A is the father of B. C is the sister of A. D is the grandson of C. How is D related to B?",
        options: [
          { id: "A", text: "Nephew" },
          { id: "B", text: "Cousin" },
          { id: "C", text: "Son" },
          { id: "D", text: "Brother" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Map the tree:\n  - A is father of B (A is Gen +1 relative to B).\n  - C is sister of A (C is in Gen +1; C is B's aunt).\n  - D is grandson of C (D is 2 generations below C, so D is in Gen -1 relative to B).",
          "Step 2: Since C is the aunt of B, C's children are B's first cousins.",
          "Step 3: D is the son of B's cousin (grandson of C).\n  - The child of a sibling or cousin is a nephew.",
          "Step 4: Therefore, D is B's nephew.",
        ],
        cuetInsight:
          "Generation counting immediately eliminates Cousin (Gen 0) and Brother (Gen 0).",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Portrait Identification",
        frequency: "Very High",
        typicalStem: "Pointing to a woman in a picture, a man said: 'Her father's only son is my father.' How is the woman related to the man?",
        strategy:
          "'Her father's only son' = Her brother. 'Her brother is my father'. Thus, the woman is the man's paternal aunt (Bua).",
      },
      {
        patternType: "Family Tree Puzzle",
        frequency: "High",
        typicalStem: "In a family of six persons A, B, C, D, E and F, there are two married couples...",
        strategy: "Draw out the boxes and double bonds first before reading the final question.",
      },
    ],
    commonTraps: [
      {
        trap: "Assuming gender based on names",
        whyStudentsFail: "Assuming 'Kiran' or 'Deepak' is male/female without confirmation from pronouns or parentage.",
        howToAvoid: "Never assign [+] or [-] unless 'son', 'daughter', 'mother', 'father', 'he', or 'she' is specified.",
      },
      {
        trap: "Confusing Maternal and Paternal relatives",
        whyStudentsFail: "Mixing up mother's brother (Maternal Uncle) with father's brother (Paternal Uncle).",
        howToAvoid: "Always specify M (maternal) or P (paternal) in rough work notes.",
      },
    ],
    mnemonics: [
      {
        concept: "Tree Notation Standard",
        mnemonic: "G-G-S (Gender, Generation, Spouse)",
        explanation:
          "Always verify all three: Gender (+/-), Generation tier (+1/0/-1), and Spouse double-bond.",
      },
    ],
    quickRevisionCard: {
      title: "Blood Relations High-Yield Points",
      bulletPoints: [
        "Notation: Male [+], Female [-], Spouse [=], Sibling [-].",
        "Generations: Grandparents (+2), Parents/Uncles/Aunts (+1), Siblings/Cousins (0), Children/Nephews (-1).",
        "Mother's side = Maternal; Father's side = Paternal.",
        "Brother's/Sister's son = Nephew; daughter = Niece.",
        "Portrait dialogue: decode backwards starting from 'my'.",
        "Never assume gender from proper nouns unless explicitly established.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u2-t4-q1",
        question:
          "Pointing to a lady, Raman said, 'The son of her only brother is the brother of my wife.' How is the lady related to Raman?",
        type: "standard",
        difficulty: "hard",
        options: [
          { id: "A", text: "Mother's sister" },
          { id: "B", text: "Sister of father-in-law" },
          { id: "C", text: "Mother-in-law" },
          { id: "D", text: "Sister-in-law" },
        ],
        correctOption: "B",
        explanation:
          "Brother of Raman's wife is Raman's brother-in-law. Son of the lady's brother is Raman's brother-in-law, which means the lady's brother is the father of Raman's wife (Raman's father-in-law). Thus, the lady is the sister of Raman's father-in-law.",
      },
      {
        id: "general-test-u2-t4-q2",
        question:
          "Introducing a girl, Vipin said, 'Her mother is the only daughter of my mother-in-law.' How is Vipin related to the girl?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Brother" },
          { id: "B", text: "Father" },
          { id: "C", text: "Uncle" },
          { id: "D", text: "Husband" },
        ],
        correctOption: "B",
        explanation:
          "The only daughter of Vipin's mother-in-law is Vipin's wife. If the girl's mother is Vipin's wife, then Vipin is the father of the girl.",
      },
      {
        id: "general-test-u2-t4-q3",
        question:
          "A is B's sister. C is B's mother. D is C's father. E is D's mother. Then, how is A related to D?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Grandmother" },
          { id: "B", text: "Granddaughter" },
          { id: "C", text: "Daughter" },
          { id: "D", text: "Grandfather" },
        ],
        correctOption: "B",
        explanation:
          "A is the daughter of C. C is the daughter of D. Therefore, A is the granddaughter of D.",
      },
      {
        id: "general-test-u2-t4-q4",
        question:
          "If P is the brother of Q, Q is the sister of R, and R is the father of S, how is P related to S?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Paternal Uncle" },
          { id: "B", text: "Maternal Uncle" },
          { id: "C", text: "Father" },
          { id: "D", text: "Brother" },
        ],
        correctOption: "A",
        explanation:
          "R is the father of S. P is the brother of R. The brother of one's father is one's Paternal Uncle.",
      },
      {
        id: "general-test-u2-t4-q5",
        question:
          "Assertion (A): If X says 'Y is the only son of my father', and X is male, then Y must be X himself.\nReason (R): Since X's father has only one son, and X is a male, X cannot have any brothers.",
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
          "Because X is male, his father's only son is uniquely X himself. Both statements are logically sound and (R) explains (A).",
      },
      {
        id: "general-test-u2-t4-q6",
        question:
          "Match List-I (Kinship Expression) with List-II (Simplified Relation):\n(P) Father's only son's wife — 1. Mother (if speaker is the child)\n(Q) Mother's brother — 2. Maternal Uncle\n(R) Wife's brother — 3. Brother-in-law\n(S) Brother's daughter — 4. Niece",
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
          "All pairings represent standard family relations.",
      },
      {
        id: "general-test-u2-t4-q7",
        question:
          "Deepak said to Nitin, 'That boy playing with football is the younger of the two brothers of the daughter of my father's wife.' How is the boy related to Deepak?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Son" },
          { id: "B", text: "Brother" },
          { id: "C", text: "Cousin" },
          { id: "D", text: "Nephew" },
        ],
        correctOption: "B",
        explanation:
          "Father's wife = Mother. Daughter of mother = Sister. Brothers of sister = Brothers of Deepak. Therefore, the boy is Deepak's brother.",
      },
      {
        id: "general-test-u2-t4-q8",
        question:
          "In a family, there are a husband and wife, two sons and two daughters. All the ladies were invited to a dinner. Both sons went out to play. The husband did not return from office. Who was at home?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Only the husband" },
          { id: "B", text: "Nobody" },
          { id: "C", text: "Only the sons" },
          { id: "D", text: "All ladies" },
        ],
        correctOption: "B",
        explanation:
          "Ladies (wife + 2 daughters) went to dinner. Sons went to play. Husband did not return. Hence, nobody was at home.",
      },
      {
        id: "general-test-u2-t4-q9",
        question:
          "Rahul's mother is the only daughter of Monika's father. How is Monika's husband related to Rahul?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Uncle" },
          { id: "B", text: "Father" },
          { id: "C", text: "Grandfather" },
          { id: "D", text: "Brother" },
        ],
        correctOption: "B",
        explanation:
          "The only daughter of Monika's father is Monika herself. Since Rahul's mother is Monika, Monika's husband must be Rahul's father.",
      },
      {
        id: "general-test-u2-t4-q10",
        question:
          "If 'A $ B' means A is the brother of B, 'A @ B' means A is the mother of B, and 'A # B' means A is the daughter of B, what does 'P $ Q @ R' mean?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "P is the maternal uncle of R" },
          { id: "B", text: "P is the father of R" },
          { id: "C", text: "P is the nephew of R" },
          { id: "D", text: "P is the grandfather of R" },
        ],
        correctOption: "A",
        explanation:
          "Q @ R means Q is the mother of R. P $ Q means P is the brother of Q. Therefore, P is the brother of R's mother, which is the Maternal Uncle of R.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["coding-decoding", "direction-sense"],
      practiceTestId: "practice-general-test-unit2-test1",
      practiceTestUrl: "/test/practice-general-test-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 2 - TOPIC 5: Direction Sense
  {
    id: "general-test-unit2-direction-sense",
    slug: "direction-sense",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 2,
    unitTitle: "General Mental Ability & Numerical Ability",
    topicTitle: "Direction Sense",
    ncertReference: {
      book: "CUET General Test / General Mental Ability & Reasoning",
      chapter: "Section 9: Cardinal Directions, Pythagoras Triples & Shadow Logic",
      pages: "Pages 301-336",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 96,
      weightagePercentage: 13.0,
    },
    thirtySecondSummary: [
      "Direction Sense tests spatial orientation, sequential vector movements, straight-line displacement (Pythagoras theorem), and solar shadow geometry.",
      "The 8 Compass Directions: Four Cardinals (North, South, East, West) and four Ordinals (North-East, South-East, North-West, South-West).",
      "Turns: Right turn = 90° Clockwise; Left turn = 90° Counter-Clockwise. Facing North: Right is East, Left is West. Facing South: Right is West, Left is East.",
      "Displacement Formula: Shortest straight-line distance = sqrt((Δx)^2 + (Δy)^2) using Pythagorean triples (3-4-5, 5-12-13, 8-15-17, 7-24-25).",
      "Shadow Logic: At sunrise, sun is in East -> shadows fall towards West. At sunset, sun is in West -> shadows fall towards East. At 12 noon, no lateral shadow.",
    ],
    coreConcepts: [
      {
        title: "The 8-Point Compass and Turn Geometry",
        explanation:
          "Clear mental navigation of cardinal and intercardinal coordinates:\n1. Cardinal Axes: North (Up / +Y), South (Down / -Y), East (Right / +X), West (Left / -X).\n2. Ordinals: NE (45° between N and E), SE (45° between S and E), SW (45° between S and W), NW (45° between N and W).\n3. Angular Rotation Rules:\n  - Clockwise (CW): N -> NE (45°) -> E (90°) -> SE (135°) -> S (180°).\n  - Counter-Clockwise (CCW): N -> NW (45°) -> W (90°) -> SW (135°) -> S (180°).\n  - Net Rotation = Sum of CW angles - Sum of CCW angles.",
        keyTakeaways: [
          "Right turn always equals 90° Clockwise.",
          "Left turn always equals 90° Counter-Clockwise.",
          "Net rotation angle determines final facing direction.",
        ],
        ncertPointer:
          "CUET General Test Mental Ability, Compass & Coordinate Geometry, pp. 302-314.",
      },
      {
        title: "Shortest Distance Calculation and Pythagorean Triples",
        explanation:
          "Determining straight-line distance from the starting origin:\n1. Vector Addition: Separate motion into horizontal (X) and vertical (Y) components:\n  - Moving East: +x; Moving West: -x\n  - Moving North: +y; Moving South: -y\n  - Net Displacement d = sqrt((Net x)^2 + (Net y)^2).\n2. Standard Pythagorean Triples in CUET:\n  - 3, 4, 5 (and multiples: 6, 8, 10; 9, 12, 15)\n  - 5, 12, 13 (and 10, 24, 26)\n  - 8, 15, 17\n  - 7, 24, 25\n  - Recognizing triples bypasses manual squaring and square roots.",
        keyTakeaways: [
          "Sum horizontal and vertical components independently.",
          "Shortest distance is the hypotenuse of the right-angled displacement triangle.",
        ],
        ncertPointer:
          "CUET Reasoning Handbook, Displacement & Spatial Vectors, pp. 316-324.",
      },
      {
        title: "Solar Shadow Logic (Morning, Evening, Noon)",
        explanation:
          "Shadows depend strictly on the position of the Sun:\n1. Sunrise / Morning (Sun in the East):\n  - All shadows fall towards the WEST.\n  - If a person faces North, their shadow falls to their LEFT (West).\n  - If a person faces South, their shadow falls to their RIGHT (West).\n2. Sunset / Evening (Sun in the West):\n  - All shadows fall towards the EAST.\n  - If a person faces North, their shadow falls to their RIGHT (East).\n  - If a person faces South, their shadow falls to their LEFT (East).\n3. Exactly at 12:00 Noon: The sun is vertically overhead; shadows fall directly underneath and do not project horizontally.",
        keyTakeaways: [
          "Morning shadow is ALWAYS towards West.",
          "Evening shadow is ALWAYS towards East.",
          "Facing North: West is Left, East is Right.",
          "Facing South: West is Right, East is Left.",
        ],
        ncertPointer:
          "CUET General Test Guide, Shadow Geometry & Sun Trajectories, pp. 326-336.",
      },
    ],
    keyFacts: [
      {
        concept: "Morning Shadow Direction",
        formulaOrFact: "Always West",
        explanation: "Since the Sun rises in the East, shadows are projected in the opposite direction (West).",
        examTip: "Instantly anchors the West direction in conversation problems.",
      },
      {
        concept: "Evening Shadow Direction",
        formulaOrFact: "Always East",
        explanation: "Sun in the West projects shadows directly East.",
        examTip: "Look for keywords 'one evening' or 'before sunset'.",
      },
      {
        concept: "Pythagorean Triples",
        formulaOrFact: "3-4-5 | 5-12-13 | 8-15-17",
        explanation: "Immediate shortest distance answers for perpendicular paths.",
        examTip: "If horizontal = 8 km and vertical = 6 km, distance is 10 km (2 * 3-4-5).",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="dirGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <filter id="shadowDir" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f0f9ff" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#0c4a6e">8-Point Compass & Shadow Geometry for CUET</text>

  <!-- Left: 8-Point Compass Rose -->
  <g transform="translate(180, 160)">
    <!-- Axes -->
    <line x1="-110" y1="0" x2="110" y2="0" stroke="#0284c7" stroke-width="2.5"/>
    <line x1="0" y1="-110" x2="0" y2="110" stroke="#0284c7" stroke-width="2.5"/>
    
    <!-- Ordinal Dashed Lines -->
    <line x1="-75" y1="-75" x2="75" y2="75" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4"/>
    <line x1="-75" y1="75" x2="75" y2="-75" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4"/>

    <!-- Labels -->
    <text x="0" y="-118" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0369a1" text-anchor="middle">NORTH (0°)</text>
    <text x="0" y="128" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0369a1" text-anchor="middle">SOUTH (180°)</text>
    <text x="120" y="4" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0369a1" text-anchor="start">EAST (90°)</text>
    <text x="-120" y="4" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0369a1" text-anchor="end">WEST (270°)</text>

    <!-- Ordinal Labels -->
    <text x="82" y="-78" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#64748b">NE (45°)</text>
    <text x="82" y="88" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#64748b">SE (135°)</text>
    <text x="-82" y="88" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#64748b" text-anchor="end">SW (225°)</text>
    <text x="-82" y="-78" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#64748b" text-anchor="end">NW (315°)</text>

    <circle cx="0" cy="0" r="6" fill="#0284c7"/>
  </g>

  <!-- Right: Shadow Rules Card -->
  <g transform="translate(370, 55)" filter="url(#shadowDir)">
    <rect width="285" height="235" rx="8" fill="#ffffff" stroke="#bae6fd" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="url(#dirGrad)"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Sun & Shadow Orientation Guide</text>
    
    <text x="15" y="68" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0369a1">1. Morning (Sunrise in EAST):</text>
    <text x="25" y="86" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Shadows fall towards: WEST</text>
    <text x="25" y="102" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Facing North -> Shadow on LEFT</text>
    <text x="25" y="118" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Facing South -> Shadow on RIGHT</text>

    <text x="15" y="146" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0369a1">2. Evening (Sunset in WEST):</text>
    <text x="25" y="164" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Shadows fall towards: EAST</text>
    <text x="25" y="180" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Facing North -> Shadow on RIGHT</text>
    <text x="25" y="196" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">• Facing South -> Shadow on LEFT</text>

    <text x="15" y="222" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#b45309">12:00 Noon: No horizontal shadow</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u2-we9",
        questionNumber: 1,
        question:
          "A person walks 12 km North, then turns right and walks 5 km. How far and in which direction is he from his starting point?",
        options: [
          { id: "A", text: "13 km, North-East" },
          { id: "B", text: "17 km, North-East" },
          { id: "C", text: "13 km, North-West" },
          { id: "D", text: "15 km, South-East" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Set origin (0, 0).\n  - Walks 12 km North: position = (0, +12).\n  - Turns right (facing East) and walks 5 km: position = (+5, +12).",
          "Step 2: Distance from origin = sqrt((5)^2 + (12)^2) = sqrt(25 + 144) = sqrt(169) = 13 km (Standard 5-12-13 triple).",
          "Step 3: Direction from origin: +x is East and +y is North -> North-East.",
          "Step 4: The person is 13 km North-East from the starting point.",
        ],
        cuetInsight:
          "5-12-13 is a textbook Pythagorean triple in CUET displacement problems.",
      },
      {
        id: "general-test-u2-we10",
        questionNumber: 2,
        question:
          "One morning after sunrise, Suresh was standing facing a pole. The shadow of the pole fell exactly to his right. In which direction was Suresh facing?",
        options: [
          { id: "A", text: "East" },
          { id: "B", text: "West" },
          { id: "C", text: "South" },
          { id: "D", text: "North" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Note the time: 'One morning after sunrise' -> Sun is in the East.",
          "Step 2: Therefore, all shadows fall towards the WEST.",
          "Step 3: The shadow falls to Suresh's RIGHT. This means Suresh's RIGHT arm is pointing towards the WEST.",
          "Step 4: If your right hand points West, your left hand points East, your back is to the North, and you are facing SOUTH.",
        ],
        cuetInsight:
          "Shadow problems are solved in 10 seconds: Sun position -> Shadow direction -> match to subject's Right/Left.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Shortest Distance with Turns",
        frequency: "Very High",
        typicalStem: "A man walks 4 km East, turns right, walks 3 km. How far is he from his initial point?",
        strategy: "Use Pythagoras theorem: sqrt(4^2 + 3^2) = 5 km.",
      },
      {
        patternType: "Face-to-Face Morning Dialogue",
        frequency: "High",
        typicalStem: "Two friends A and B are talking facing each other in the morning. A's shadow falls to the left of B...",
        strategy: "Determine shadow direction (West), then map to B's left/right orientation.",
      },
    ],
    commonTraps: [
      {
        trap: "Confusing total distance traveled with displacement",
        whyStudentsFail: "Summing 12 + 5 = 17 km instead of calculating straight-line displacement (13 km).",
        howToAvoid: "Check whether question asks 'total distance covered' (scalar) or 'how far is he from starting point' (displacement).",
      },
      {
        trap: "Left/Right confusion when facing South",
        whyStudentsFail: "When facing South, Right is West and Left is East (opposite to facing North).",
        howToAvoid: "Mentally turn your body or rotate the rough paper sheet.",
      },
    ],
    mnemonics: [
      {
        concept: "Compass Rotation",
        mnemonic: "N-E-S-W (Never Eat Soggy Waffles)",
        explanation:
          "Clockwise order of cardinal points starting from North.",
      },
    ],
    quickRevisionCard: {
      title: "Direction Sense Mastery Card",
      bulletPoints: [
        "Right turn = 90° Clockwise; Left turn = 90° Counter-Clockwise.",
        "Shortest distance = sqrt((Δx)^2 + (Δy)^2).",
        "Key Triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25.",
        "Morning (Sunrise in East) -> Shadow falls WEST.",
        "Evening (Sunset in West) -> Shadow falls EAST.",
        "Facing North: Right is East, Left is West.",
        "Facing South: Right is West, Left is East.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u2-t5-q1",
        question:
          "Rohan walks 8 km towards North, then turns right and walks 6 km. What is the shortest distance between his starting point and final position?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "14 km" },
          { id: "B", text: "10 km" },
          { id: "C", text: "12 km" },
          { id: "D", text: "2 km" },
        ],
        correctOption: "B",
        explanation:
          "Using Pythagoras theorem: Shortest Distance = sqrt(8^2 + 6^2) = sqrt(64 + 36) = sqrt(100) = 10 km.",
      },
      {
        id: "general-test-u2-t5-q2",
        question:
          "One evening before sunset, Rekha and Hema were talking to each other face to face. If Hema's shadow was exactly to the right of Hema, which direction was Rekha facing?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "North" },
          { id: "B", text: "South" },
          { id: "C", text: "East" },
          { id: "D", text: "West" },
        ],
        correctOption: "B",
        explanation:
          "In the evening, the sun is in the West, so shadows fall towards the East. Hema's shadow falls to her right, meaning Hema's right is East -> Hema is facing North. Since Rekha is talking face to face with Hema, Rekha must be facing SOUTH.",
      },
      {
        id: "general-test-u2-t5-q3",
        question:
          "A man is facing North-West. He turns 90° in the clockwise direction, and then 180° in the counter-clockwise direction. Which direction is he facing now?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "South-East" },
          { id: "B", text: "South-West" },
          { id: "C", text: "North-East" },
          { id: "D", text: "East" },
        ],
        correctOption: "B",
        explanation:
          "Calculate net angle of rotation:\n+90° (Clockwise) - 180° (Counter-Clockwise) = -90° (Net 90° Counter-Clockwise).\n90° Counter-Clockwise from North-West is South-West.",
      },
      {
        id: "general-test-u2-t5-q4",
        question:
          "A car travels 20 km North, then turns left and travels 30 km, then turns left again and travels 20 km. How far is the car from its starting position?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "70 km" },
          { id: "B", text: "30 km" },
          { id: "C", text: "40 km" },
          { id: "D", text: "50 km" },
        ],
        correctOption: "B",
        explanation:
          "The car moves 20 km North (+y), 30 km West (-x), and 20 km South (-y). The North and South movements cancel each other out (+20 - 20 = 0). The car is 30 km directly West of the starting point.",
      },
      {
        id: "general-test-u2-t5-q5",
        question:
          "Assertion (A): At exactly 12:00 noon on the equator, a vertical stick does not cast any horizontal shadow.\nReason (R): The sun is directly overhead at the zenith, so rays strike vertically perpendicular to the ground.",
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
          "Both statements are true and (R) correctly explains why no lateral shadow is formed at noon when the sun is directly overhead.",
      },
      {
        id: "general-test-u2-t5-q6",
        question:
          "Match List-I (Initial Facing & Turn) with List-II (Final Direction):\n(P) Facing North, turns 90° Clockwise — 1. East\n(Q) Facing East, turns 180° — 2. West\n(R) Facing South, turns 90° Clockwise — 3. West\n(S) Facing West, turns 90° Counter-Clockwise — 4. South",
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
          "North + 90° CW = East; East + 180° = West; South + 90° CW = West; West + 90° CCW = South.",
      },
      {
        id: "general-test-u2-t5-q7",
        question:
          "Kunal walks 10 km towards North. From there he walks 6 km towards South. Then, he walks 3 km towards East. How far and in which direction is he with reference to his starting point?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "5 km, North-East" },
          { id: "B", text: "5 km, South-East" },
          { id: "C", text: "7 km, North-East" },
          { id: "D", text: "7 km, South-West" },
        ],
        correctOption: "A",
        explanation:
          "Net North-South displacement: 10 km North - 6 km South = 4 km North.\nEast-West displacement: 3 km East.\nShortest Distance = sqrt(4^2 + 3^2) = sqrt(16 + 9) = 5 km.\nDirection: North-East.",
      },
      {
        id: "general-test-u2-t5-q8",
        question:
          "If South-East becomes North, North-East becomes West, and so on, what will West become?",
        type: "standard",
        difficulty: "hard",
        options: [
          { id: "A", text: "North-East" },
          { id: "B", text: "South-East" },
          { id: "C", text: "South-West" },
          { id: "D", text: "North-West" },
        ],
        correctOption: "B",
        explanation:
          "South-East is at 135° from North. If South-East becomes North (0°), the compass is rotated 135° counter-clockwise. Applying a 135° counter-clockwise rotation to West (270°): 270° - 135° = 135°, which is South-East.",
      },
      {
        id: "general-test-u2-t5-q9",
        question:
          "A clock is placed such that at 12 noon, the minute hand points towards North-East. In which direction does the hour hand point at 4:30 pm?",
        type: "standard",
        difficulty: "hard",
        options: [
          { id: "A", text: "South" },
          { id: "B", text: "South-West" },
          { id: "C", text: "East" },
          { id: "D", text: "South-East" },
        ],
        correctOption: "A",
        explanation:
          "Normally at 12 noon, the minute hand points North. Here it points North-East, meaning a rotation of 45° clockwise. At 4:30, the hour hand normally lies between 4 and 5 (approx 135° from North, which is South-East). Adding 45° clockwise: 135° + 45° = 180° = South.",
      },
      {
        id: "general-test-u2-t5-q10",
        question:
          "A boy starts from school, walks 5 km East, turns right and walks 6 km, then turns left and walks 3 km. What is his net East-West displacement?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "5 km East" },
          { id: "B", text: "8 km East" },
          { id: "C", text: "2 km West" },
          { id: "D", text: "8 km West" },
        ],
        correctOption: "B",
        explanation:
          "He walks 5 km East, then 6 km South, then turns left (facing East again) and walks 3 km East. Net East-West displacement = 5 km + 3 km = 8 km East.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["blood-relations", "syllogisms"],
      practiceTestId: "practice-general-test-unit2-test1",
      practiceTestUrl: "/test/practice-general-test-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },
];
