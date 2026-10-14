import { NoteDocument } from "@/types/notes";

export const mathsUnits1to3Topics: NoteDocument[] = [
  // Unit 1: Relations and Functions & Inverse Trig
  {
    id: "maths_u1_t1",
    slug: "types-of-relations-one-one-and-onto-functions-inverse-trigonometric-functions",
    subject: "maths",
    subjectName: "Mathematics",
    subjectCode: "319",
    unitNumber: 1,
    unitTitle: "Relations and Functions",
    topicTitle: "Types of Relations, One-one and Onto Functions, Inverse Trigonometric Functions",
    ncertReference: {
      class: "Class 12",
      book: "Mathematics Part 1",
      chapterNumber: 1,
      chapterName: "Relations and Functions & Inverse Trigonometric Functions",
      sections: [
        "1.2 Types of Relations (Reflexive, Symmetric, Transitive, Equivalence)",
        "1.3 Types of Functions (One-One / Injective, Onto / Surjective, Bijective)",
        "1.4 Composition of Functions and Invertible Functions",
        "2.1 Inverse Trigonometric Functions: Basic Concepts & Principal Value Branches",
        "2.2 Properties of Inverse Trigonometric Functions",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (5-6 questions per shift)",
      totalPyqsInRepo: 240,
      weightagePercentage: 11.0,
    },
    summary30Seconds: [
      "Relation $R$ on set $A$: Reflexive if $(a, a) \\in R, \\forall a \\in A$; Symmetric if $(a, b) \\in R \\implies (b, a) \\in R$; Transitive if $(a, b) \\in R$ and $(b, c) \\in R \\implies (a, c) \\in R$. Equivalence if all three hold.",
      "Number of relations: Total relations on set with $n$ elements $= 2^{n^2}$; Total reflexive relations $= 2^{n(n-1)}$; Total symmetric relations $= 2^{\\frac{n(n+1)}{2}}$.",
      "Function classification: Injective (one-one) if $f(x_1) = f(x_2) \\implies x_1 = x_2$; Surjective (onto) if Range = Co-domain; Bijective if both one-one and onto $\\implies$ invertible ($f^{-1}$ exists).",
      "Number of functions: From set $A$ ($|A|=m$) to set $B$ ($|B|=n$): Total functions $= n^m$; One-one functions $= ^n P_m$ (if $n \\ge m$); Onto functions $= \\sum_{r=0}^n (-1)^{n-r} \\binom{n}{r} r^m$.",
      "Principal Value Branches (PVB) of Inverse Trig: $\\sin^{-1} x \\in [-\\pi/2, \\pi/2]$; $\\cos^{-1} x \\in [0, \\pi]$; $\\tan^{-1} x \\in (-\\pi/2, \\pi/2)$; $\\sec^{-1} x \\in [0, \\pi] - \\{\\pi/2\\}$; $\\csc^{-1} x \\in [-\\pi/2, \\pi/2] - \\{0\\}$; $\\cot^{-1} x \\in (0, \\pi)$.",
      "Negative argument identities: $\\sin^{-1}(-x) = -\\sin^{-1}(x)$; $\\tan^{-1}(-x) = -\\tan^{-1}(x)$; $\\cos^{-1}(-x) = \\pi - \\cos^{-1}(x)$; $\\sec^{-1}(-x) = \\pi - \\sec^{-1}(x)$; $\\cot^{-1}(-x) = \\pi - \\cot^{-1}(x)$.",
      "Complementary sum: $\\sin^{-1} x + \\cos^{-1} x = \\pi/2$; $\\tan^{-1} x + \\cot^{-1} x = \\pi/2$; $\\sec^{-1} x + \\csc^{-1} x = \\pi/2$ (for valid domains).",
    ],
    coreConcepts: [
      {
        title: "Equivalence Relations, Equivalence Classes & Counting Formulae",
        content:
          "Let $R$ be a binary relation on a non-empty set $A$:\n1. **Reflexive**: $(a, a) \\in R$ for **every** $a \\in A$.\n2. **Symmetric**: Whenever $(a, b) \\in R$, then $(b, a) \\in R$.\n3. **Transitive**: Whenever $(a, b) \\in R$ and $(b, c) \\in R$, then $(a, c) \\in R$.\n4. **Equivalence Relation**: A relation that is simultaneously reflexive, symmetric, and transitive.\n- **Equivalence Class $[a]$**: The set of all elements in $A$ related to $a$: $[a] = \\{x \\in A : (x, a) \\in R\\}$. Equivalence classes form a partition of $A$ (mutually disjoint and their union is $A$).\n\n**Combinatorial Counting Formulae for Set with $n$ Elements ($|A| = n$)**:\n- Total subsets of $A \\times A$ (Total Relations) $= 2^{n^2}$\n- Number of Reflexive Relations $= 2^{n^2 - n} = 2^{n(n-1)}$\n- Number of Symmetric Relations $= 2^{\\frac{n(n+1)}{2}}$\n- Number of Reflexive and Symmetric Relations $= 2^{\\frac{n(n-1)}{2}}$",
        ncertPointers: [
          "The empty relation on a non-empty set is symmetric and transitive, but NOT reflexive.",
          "The universal relation $R = A \\times A$ is an equivalence relation.",
        ],
      },
      {
        title: "Functions: Injectivity, Surjectivity, Bijectivity & Invertibility",
        content:
          "Let $f: A \\rightarrow B$ where $|A| = m$ and $|B| = n$:\n1. **One-One (Injective)**:\n   - Algebraic test: $f(x_1) = f(x_2) \\implies x_1 = x_2$.\n   - Calculus test: If $f'(x) > 0$ strictly (strictly increasing) or $f'(x) < 0$ strictly (strictly decreasing) on its domain, $f$ is one-one.\n   - Horizontal Line Test: Any horizontal line intersects the graph of $f(x)$ at **most once**.\n   - Number of one-one functions from $A$ to $B$:\n     $$N_{\\text{injective}} = \\begin{cases} ^n P_m = \\frac{n!}{(n - m)!} & \\text{if } n \\ge m \\\\ 0 & \\text{if } n < m \\end{cases}$$\n\n2. **Onto (Surjective)**:\n   - Range of $f = \\text{Codomain } B$.\n   - If $m < n$, no onto function can exist.\n   - If $m = n$, a function is one-one if and only if it is onto.\n\n3. **Bijective & Invertible**:\n   - $f$ is bijective $\\iff$ it is both one-one and onto.\n   - $f$ is invertible $\\iff f$ is bijective. If $f(x) = y$, then $f^{-1}(y) = x$ and $(f \\circ f^{-1})(y) = y$, $(f^{-1} \\circ f)(x) = x$.",
        ncertPointers: [
          "f(x) = x^2 from R -> R is neither one-one nor onto; but f(x) = x^2 from [0, inf) -> [0, inf) is bijective and invertible.",
        ],
      },
      {
        title: "Inverse Trigonometric Functions: Domains, Ranges & Identities",
        content:
          "Trigonometric functions are periodic and hence not one-to-one over $\\mathbb{R}$. To define their inverses, their domains are restricted to the **Principal Value Branches (PVB)**:\n\n| Function | Domain | Principal Value Branch (Range) |\n| :--- | :--- | :--- |\n| $y = \\sin^{-1} x$ | $[-1, 1]$ | $[-\\pi/2, \\pi/2]$ |\n| $y = \\cos^{-1} x$ | $[-1, 1]$ | $[0, \\pi]$ |\n| $y = \\tan^{-1} x$ | $\\mathbb{R}$ | $(-\\pi/2, \\pi/2)$ |\n| $y = \\cot^{-1} x$ | $\\mathbb{R}$ | $(0, \\pi)$ |\n| $y = \\sec^{-1} x$ | $\\mathbb{R} - (-1, 1)$ | $[0, \\pi] - \\{\\pi/2\\}$ |\n| $y = \\csc^{-1} x$ | $\\mathbb{R} - (-1, 1)$ | $[-\\pi/2, \\pi/2] - \\{0\\}$ |\n\n**Crucial CUET Identities**:\n1. $\\sin^{-1}(\\sin \\theta) = \\theta$ **ONLY IF** $\\theta \\in [-\\pi/2, \\pi/2]$. If $\\theta = \\frac{2\\pi}{3}$, write $\\sin^{-1}(\\sin(\\pi - \\pi/3)) = \\sin^{-1}(\\sin \\pi/3) = \\pi/3$.\n2. $\\cos^{-1}(\\cos \\theta) = \\theta$ **ONLY IF** $\\theta \\in [0, \\pi]$. If $\\theta = \\frac{7\\pi}{6}$, write $\\cos^{-1}(\\cos(2\\pi - 5\\pi/6)) = 5\\pi/6$.\n3. Negative arguments:\n   - $\\sin^{-1}(-x) = -\\sin^{-1} x, \\quad \\tan^{-1}(-x) = -\\tan^{-1} x, \\quad \\csc^{-1}(-x) = -\\csc^{-1} x$\n   - $\\cos^{-1}(-x) = \\pi - \\cos^{-1} x, \\quad \\sec^{-1}(-x) = \\pi - \\sec^{-1} x, \\quad \\cot^{-1}(-x) = \\pi - \\cot^{-1} x$",
        ncertPointers: [
          "tan^-1 x + cot^-1 x = pi/2 for all x in R.",
          "sin^-1 x + cos^-1 x = pi/2 for all x in [-1, 1].",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Reflexive & Symmetric Relations Count",
        formula: "N_{\\text{ref}} = 2^{n(n-1)}, \\quad N_{\\text{sym}} = 2^{\\frac{n(n+1)}{2}}, \\quad N_{\\text{ref}\\cap\\text{sym}} = 2^{\\frac{n(n-1)}{2}}",
        symbols: "n = \\text{number of elements in set } A",
        siUnits: "Integer counts",
        applicationCondition: "Finite set combinatorial counting",
      },
      {
        name: "Inverse Trigonometric Addition Formula",
        formula: "\\tan^{-1} x + \\tan^{-1} y = \\tan^{-1} \\left(\\frac{x + y}{1 - xy}\\right) \\quad (\\text{for } xy < 1)",
        symbols: "x, y > 0, xy < 1; \\text{if } xy > 1, \\text{ add } \\pi",
        siUnits: "Radians",
        applicationCondition: "Sum of inverse tangents",
      },
      {
        name: "Complementary Angles Sum",
        formula: "\\sin^{-1} x + \\cos^{-1} x = \\frac{\\pi}{2}, \\quad \\tan^{-1} x + \\cot^{-1} x = \\frac{\\pi}{2}, \\quad \\sec^{-1} x + \\csc^{-1} x = \\frac{\\pi}{2}",
        symbols: "x \\in \\text{respective valid domains}",
        siUnits: "Radians",
        applicationCondition: "Orthogonal complementary angles",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="260" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Principal Value Branches (PVB) of Inverse Trigonometric Functions</text>

  <!-- Left: Group 1 ([-pi/2, pi/2] through origin) -->
  <g transform="translate(60, 55)">
    <rect width="290" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1"/>
    <text x="145" y="24" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Group 1: Odd Functions ([-π/2, π/2])</text>
    <text x="145" y="55" textAnchor="middle" fill="#f8fafc" fontSize="11">sin⁻¹(-x) = -sin⁻¹(x)</text>
    <text x="145" y="80" textAnchor="middle" fill="#f8fafc" fontSize="11">tan⁻¹(-x) = -tan⁻¹(x)</text>
    <text x="145" y="105" textAnchor="middle" fill="#f8fafc" fontSize="11">csc⁻¹(-x) = -csc⁻¹(x)</text>
    <text x="145" y="135" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">PVB: Quadrant I (0 to π/2)</text>
    <text x="145" y="155" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">&amp; Quadrant IV (-π/2 to 0)</text>
  </g>

  <!-- Right: Group 2 ([0, pi] with pi - f(x)) -->
  <g transform="translate(410, 55)">
    <rect width="290" height="180" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1"/>
    <text x="145" y="24" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="bold">Group 2: π - f(x) ([0, π])</text>
    <text x="145" y="55" textAnchor="middle" fill="#f8fafc" fontSize="11">cos⁻¹(-x) = π - cos⁻¹(x)</text>
    <text x="145" y="80" textAnchor="middle" fill="#f8fafc" fontSize="11">sec⁻¹(-x) = π - sec⁻¹(x)</text>
    <text x="145" y="105" textAnchor="middle" fill="#f8fafc" fontSize="11">cot⁻¹(-x) = π - cot⁻¹(x)</text>
    <text x="145" y="135" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">PVB: Quadrant I (0 to π/2)</text>
    <text x="145" y="155" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">&amp; Quadrant II (π/2 to π)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "maths_u1_we1",
        questionNumber: 1,
        question:
          "Find the principal value of $\\cos^{-1}\\left(\\cos \\frac{7\\pi}{6}\\right)$.",
        options: [
          { id: "A", text: "7π / 6" },
          { id: "B", text: "5π / 6" },
          { id: "C", text: "π / 6" },
          { id: "D", text: "-π / 6" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The identity $\\cos^{-1}(\\cos \\theta) = \\theta$ holds strictly when $\\theta \\in [0, \\pi]$.",
          "Step 2: Here $\\theta = \\frac{7\\pi}{6} > \\pi$, which lies OUTSIDE the principal value branch $[0, \\pi]$.",
          "Step 3: Rewrite $\\cos \\frac{7\\pi}{6} = \\cos\\left(2\\pi - \\frac{5\\pi}{6}\\right) = \\cos \\frac{5\\pi}{6}$.",
          "Step 4: Since $\\frac{5\\pi}{6} \\in [0, \\pi]$, we have $\\cos^{-1}\\left(\\cos \\frac{5\\pi}{6}\\right) = \\frac{5\\pi}{6}$.",
        ],
        cuetTip: "Never blindly cancel cos^-1 with cos when the angle is in the third or fourth quadrant! The answer for cos^-1 must always be in [0, pi].",
      },
      {
        id: "maths_u1_we2",
        questionNumber: 2,
        question:
          "Let $A = \\{1, 2, 3\\}$. What is the total number of equivalence relations that can be defined on set A?",
        options: [
          { id: "A", text: "3" },
          { id: "B", text: "5" },
          { id: "C", text: "8" },
          { id: "D", text: "9" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The number of equivalence relations on a set of $n$ elements equals the Bell number $B_n$.",
          "Step 2: For $n = 1$: $B_1 = 1$.",
          "Step 3: For $n = 2$: $B_2 = 2$.",
          "Step 4: For $n = 3$: $B_3 = 5$.",
          "Verification by partitions of $\\{1, 2, 3\\}$:\n1. $\\{\\{1\\}, \\{2\\}, \\{3\\}\\}$ (identity relation)\n2. $\\{\\{1, 2\\}, \\{3\\}\\}$\n3. $\\{\\{1, 3\\}, \\{2\\}\\}$\n4. $\\{\\{2, 3\\}, \\{1\\}\\}$\n5. $\\{\\{1, 2, 3\\}\\}$ (universal relation).\nTotal = 5 relations.",
        ],
        cuetTip: "Bell numbers: $B_1 = 1, B_2 = 2, B_3 = 5, B_4 = 15$. For $n=3$, the answer is ALWAYS 5 in CUET.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Principal Value Branch Evaluation",
        frequency: "Very High (every shift)",
        pyqExample: {
          question:
            "The value of $\\sin^{-1}\\left(\\sin \\frac{3\\pi}{5}\\right)$ is:",
          options: [
            { id: "A", text: "3π / 5" },
            { id: "B", text: "2π / 5" },
            { id: "C", text: "-3π / 5" },
            { id: "D", text: "π / 5" },
          ],
          correctOption: "B",
          explanation: "$\\frac{3\\pi}{5} = 108^\\circ > 90^\\circ$, outside $[-\\pi/2, \\pi/2]$. Use $\\sin(\\pi - \\theta) = \\sin \\theta \\implies \\sin\\left(\\pi - \\frac{3\\pi}{5}\\right) = \\sin \\frac{2\\pi}{5}$. Since $\\frac{2\\pi}{5} = 72^\\circ \\in [-\\pi/2, \\pi/2]$, the principal value is $2\\pi/5$.",
        },
        strategy: "Convert angle to degrees if fractions confuse you ($3\\pi/5 = 108^\\circ$). In Q2, $\\sin(180 - 108) = \\sin 72^\\circ = 2\\pi/5$.",
      },
      {
        type: "Relation Properties Checking",
        frequency: "High",
        pyqExample: {
          question:
            "Let $R$ be a relation defined on $\\mathbb{Z}$ by $a R b \\iff a - b$ is divisible by 5. The relation $R$ is:",
          options: [
            { id: "A", text: "Reflexive only" },
            { id: "B", text: "Symmetric only" },
            { id: "C", text: "Transitive only" },
            { id: "D", text: "An equivalence relation" },
          ],
          correctOption: "D",
          explanation: "Reflexive: $a - a = 0 = 5(0)$. Symmetric: If $a - b = 5k$, then $b - a = 5(-k)$. Transitive: $(a - b) + (b - c) = 5k_1 + 5k_2 = 5(k_1 + k_2) = a - c$. Thus $R$ is an equivalence relation.",
        },
        strategy: "Divisibility relations of the form $a - b = kn$ on $\\mathbb{Z}$ are standard equivalence relations.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming sin^-1(sin x) = x for any value of x.",
        whyWrong: "The identity $\\sin^{-1}(\\sin x) = x$ is valid ONLY when $x \\in [-\\pi/2, \\pi/2]$.",
        correctUnderstanding: "For angles outside $[-\\pi/2, \\pi/2]$, use reference angles ($\pi - x$ or $x - 2\\pi$) to bring the value into the principal branch.",
      },
      {
        misconception: "Thinking tan^-1(x) + cot^-1(x) = pi/2 only for positive x.",
        whyWrong: "The identity $\\tan^{-1} x + \\cot^{-1} x = \\frac{\\pi}{2}$ holds for ALL real numbers $x \\in \\mathbb{R}$.",
        correctUnderstanding: "Unlike $\\tan^{-1}(1/x) = \\cot^{-1} x$ (which requires $x > 0$), the complementary sum is unconditionally valid across all $\\mathbb{R}$.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Bell Numbers Shortcut for Equivalence Relations",
        mnemonic: "1-2-5-15: The Bell Sequence.",
        rule: "$n=1 \\implies 1; \\quad n=2 \\implies 2; \\quad n=3 \\implies 5; \\quad n=4 \\implies 15$.",
        shortcut: "For a 3-element set, the answer is always 5.",
        whenToApply: "Number of equivalence relations questions.",
      },
      {
        title: "Negative Arguments in Inverse Trig",
        mnemonic: "C-S-C gets Pi minus (Cosine, Secant, Cotangent).",
        rule: "$\\cos^{-1}(-x) = \\pi - \\cos^{-1}(x)$, $\\sec^{-1}(-x) = \\pi - \\sec^{-1}(x)$, $\\cot^{-1}(-x) = \\pi - \\cot^{-1}(x)$.",
        shortcut: "All other three simply pull the minus sign out: $\\sin^{-1}(-x) = -\\sin^{-1}(x)$, etc.",
        whenToApply: "Evaluating negative values in inverse trig functions.",
      },
    ],
    quickRevisionCard: {
      title: "Relations, Functions & Inverse Trig — Quick Card",
      bulletPoints: [
        "Equivalence relation: Reflexive, Symmetric, and Transitive simultaneously.",
        "Total relations on set with $n$ elements: $2^{n^2}$; Reflexive: $2^{n(n-1)}$; Symmetric: $2^{n(n+1)/2}$.",
        "Equivalence relations on set of 3 elements: Exactly 5.",
        "One-one functions: $^n P_m$ (for $n \\ge m$). If $f'(x) > 0$ strictly $\\implies$ one-one.",
        "Onto functions: Range = Codomain.",
        "$\\sin^{-1} x \\in [-\\pi/2, \\pi/2]$; $\\cos^{-1} x \\in [0, \\pi]$; $\\tan^{-1} x \\in (-\\pi/2, \\pi/2)$.",
        "$\\cos^{-1}(-x) = \\pi - \\cos^{-1}(x)$; $\\sec^{-1}(-x) = \\pi - \\sec^{-1}(x)$; $\\cot^{-1}(-x) = \\pi - \\cot^{-1}(x)$.",
        "$\\sin^{-1}(-x) = -\\sin^{-1}(x)$; $\\tan^{-1}(-x) = -\\tan^{-1}(x)$; $\\csc^{-1}(-x) = -\\csc^{-1}(x)$.",
        "$\\sin^{-1} x + \\cos^{-1} x = \\pi/2$; $\\tan^{-1} x + \\cot^{-1} x = \\pi/2$.",
        "$\\tan^{-1} x + \\tan^{-1} y = \\tan^{-1}\\left(\\frac{x+y}{1-xy}\\right)$ for $xy < 1$.",
      ],
    },
    practiceQuestions: [
      {
        id: "maths_u1_q1",
        question: "The value of $\\cos^{-1}\\left(-\\frac{1}{2}\\right) + 2 \\sin^{-1}\\left(\\frac{1}{2}\\right)$ is:",
        type: "standard",
        options: [
          { id: "A", text: "π / 3" },
          { id: "B", text: "2π / 3" },
          { id: "C", text: "π" },
          { id: "D", text: "4π / 3" },
        ],
        correctOption: "C",
        explanation: "$\\cos^{-1}(-1/2) = \\pi - \\cos^{-1}(1/2) = \\pi - \\pi/3 = 2\\pi/3$. $2\\sin^{-1}(1/2) = 2(\\pi/6) = \\pi/3$. Total $= 2\\pi/3 + \\pi/3 = \\pi$.",
        difficulty: "easy",
      },
      {
        id: "maths_u1_q2",
        question: "Let $A = \\{1, 2, 3, 4\\}$. What is the number of REFLEXIVE relations that can be defined on set A?",
        type: "standard",
        options: [
          { id: "A", text: "2¹² (4096)" },
          { id: "B", text: "2¹⁶ (65536)" },
          { id: "C", text: "2⁸ (256)" },
          { id: "D", text: "2⁴ (16)" },
        ],
        correctOption: "A",
        explanation: "Formula for number of reflexive relations on set of $n$ elements is $2^{n(n-1)}$. For $n=4$: $2^{4(3)} = 2^{12} = 4096$.",
        difficulty: "easy",
      },
      {
        id: "maths_u1_q3",
        question: "The function $f: \\mathbb{R} \\rightarrow \\mathbb{R}$ defined by $f(x) = 3 - 4x$ is:",
        type: "standard",
        options: [
          { id: "A", text: "One-one and onto (Bijective)" },
          { id: "B", text: "One-one but not onto" },
          { id: "C", text: "Onto but not one-one" },
          { id: "D", text: "Neither one-one nor onto" },
        ],
        correctOption: "A",
        explanation: "$f'(x) = -4 < 0$ for all $x \\implies$ strictly decreasing $\\implies$ one-one. Range is $(-\\infty, \\infty) = \\mathbb{R} = \\text{Codomain} \\implies$ onto. Thus $f$ is bijective.",
        difficulty: "easy",
      },
      {
        id: "maths_u1_q4",
        question: "The domain of the function $f(x) = \\sin^{-1}(2x - 1)$ is:",
        type: "standard",
        options: [
          { id: "A", text: "[0, 1]" },
          { id: "B", text: "[-1, 1]" },
          { id: "C", text: "[0, 2]" },
          { id: "D", text: "[-1, 0]" },
        ],
        correctOption: "A",
        explanation: "Domain requires $-1 \\le 2x - 1 \\le 1 \\implies 0 \\le 2x \\le 2 \\implies 0 \\le x \\le 1$. Hence domain is $[0, 1]$.",
        difficulty: "easy",
      },
      {
        id: "maths_u1_q5",
        question: "Assertion (A): The relation $R = \\{(1, 2), (2, 1)\\}$ on set $A = \\{1, 2, 3\\}$ is symmetric.\nReason (R): A relation is symmetric if $(a, b) \\in R \\implies (b, a) \\in R$.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "For the pair $(1, 2) \\in R$, its reverse $(2, 1) \\in R$, so the symmetry condition is completely fulfilled.",
        difficulty: "easy",
      },
      {
        id: "maths_u1_q6",
        question: "The principal value of $\\tan^{-1}(-\\sqrt{3})$ is:",
        type: "standard",
        options: [
          { id: "A", text: "-π / 3" },
          { id: "B", text: "2π / 3" },
          { id: "C", text: "5π / 6" },
          { id: "D", text: "-π / 6" },
        ],
        correctOption: "A",
        explanation: "$\\tan^{-1}(-x) = -\\tan^{-1}(x)$. Since $\\tan(\\pi/3) = \\sqrt{3}$, $\\tan^{-1}(-\\sqrt{3}) = -\\pi/3$.",
        difficulty: "easy",
      },
      {
        id: "maths_u1_q7",
        question: "If $f: A \\rightarrow B$ and $g: B \\rightarrow C$ are both one-one and onto, then $(g \\circ f)^{-1}$ is equal to:",
        type: "standard",
        options: [
          { id: "A", text: "f⁻¹ ∘ g⁻¹" },
          { id: "B", text: "g⁻¹ ∘ f⁻¹" },
          { id: "C", text: "f ∘ g" },
          { id: "D", text: "g ∘ f" },
        ],
        correctOption: "A",
        explanation: "Reversal law of composition of inverse functions: $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$.",
        difficulty: "easy",
      },
      {
        id: "maths_u1_q8",
        question: "The value of $\\tan\\left(2 \\tan^{-1} \\frac{1}{5}\\right)$ is:",
        type: "standard",
        options: [
          { id: "A", text: "5 / 12" },
          { id: "B", text: "12 / 5" },
          { id: "C", text: "5 / 24" },
          { id: "D", text: "1 / 5" },
        ],
        correctOption: "A",
        explanation: "Formula: $2\\tan^{-1} x = \\tan^{-1}\\left(\\frac{2x}{1 - x^2}\\right)$. Here $x = 1/5 \\implies \\frac{2(1/5)}{1 - 1/25} = \\frac{2/5}{24/25} = \\frac{2}{5} \\times \\frac{25}{24} = \\frac{5}{12}$.",
        difficulty: "medium",
      },
      {
        id: "maths_u1_q9",
        question: "Let $A = \\{1, 2, 3\\}$. How many ONE-ONE functions can be defined from set A into set A?",
        type: "standard",
        options: [
          { id: "A", text: "3³ = 27" },
          { id: "B", text: "3! = 6" },
          { id: "C", text: "3² = 9" },
          { id: "D", text: "1" },
        ],
        correctOption: "B",
        explanation: "For a bijection from a set of $n$ elements to itself, total one-one functions is $n! = 3! = 6$.",
        difficulty: "easy",
      },
      {
        id: "maths_u1_q10",
        question: "The principal value of $\\sec^{-1}(-2)$ is:",
        type: "standard",
        options: [
          { id: "A", text: "2π / 3" },
          { id: "B", text: "-2π / 3" },
          { id: "C", text: "π / 3" },
          { id: "D", text: "4π / 3" },
        ],
        correctOption: "A",
        explanation: "$\\sec^{-1}(-x) = \\pi - \\sec^{-1}(x)$. Since $\\sec(\\pi/3) = 2$, $\\sec^{-1}(-2) = \\pi - \\pi/3 = 2\\pi/3$.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["maths_u1_t1"],
      relatedTopics: ["maths_u2_t1", "maths_u3_t1"],
      practiceTestId: "practice-maths-unit1-test1",
      practiceTestUrl: "/test/practice-maths-unit1-test1",
      weaknessReportUrl: "/dashboard/radar?subject=maths",
      weaknessRadarUrl: "/dashboard/radar?subject=maths",
    },
    subjectSpecific: {
      mathematics: {
        standardResults: [
          { result: "\\sin^{-1} x + \\cos^{-1} x = \\frac{\\pi}{2}", condition: "x \\in [-1, 1]" },
          { result: "\\tan^{-1} x + \\cot^{-1} x = \\frac{\\pi}{2}", condition: "x \\in \\mathbb{R}" },
          { result: "\\tan^{-1} x + \\tan^{-1} y = \\tan^{-1}\\left(\\frac{x+y}{1-xy}\\right)", condition: "xy < 1" },
        ],
        graphProperties: [
          { curve: "y = sin^-1 x", keyPoints: "Domain [-1, 1], Range [-pi/2, pi/2], passes through origin, strictly increasing" },
          { curve: "y = cos^-1 x", keyPoints: "Domain [-1, 1], Range [0, pi], strictly decreasing, y-intercept (0, pi/2)" },
        ],
      },
    },
  },

  // Unit 2: Matrices and Determinants
  {
    id: "maths_u2_t1",
    slug: "matrix-operations-invertible-matrices-determinants-adjoint-and-system-of-linear-equations",
    subject: "maths",
    subjectName: "Mathematics",
    subjectCode: "319",
    unitNumber: 2,
    unitTitle: "Algebra (Matrices and Determinants)",
    topicTitle: "Matrix Operations, Invertible Matrices, Determinants, Adjoint and System of Linear Equations",
    ncertReference: {
      class: "Class 12",
      book: "Mathematics Part 1",
      chapterNumber: 2,
      chapterName: "Matrices and Determinants",
      sections: [
        "3.1 Matrix Definition & Types",
        "3.2 Matrix Operations (Addition, Scalar Multiplication, Matrix Multiplication)",
        "3.3 Transpose of a Matrix, Symmetric and Skew-Symmetric Matrices",
        "3.4 Invertible Matrices & Elementary Operations",
        "4.1 Determinant Definition & Properties",
        "4.2 Area of a Triangle using Determinants",
        "4.3 Minors and Cofactors",
        "4.4 Adjoint and Inverse of a Matrix",
        "4.5 Applications: System of Linear Equations (Matrix Method & Consistency)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (5-6 questions per shift)",
      totalPyqsInRepo: 280,
      weightagePercentage: 12.0,
    },
    summary30Seconds: [
      "Matrix multiplication: If $A$ is $m \\times n$ and $B$ is $n \\times p$, then $AB$ is $m \\times p$. Multiplication is associative ($A(BC) = (AB)C$), but generally NON-COMMUTATIVE ($AB \\ne BA$).",
      "Transpose properties: $(AB)^T = B^T A^T$; $(A^T)^T = A$; $(kA)^T = k A^T$.",
      "Symmetric: $A^T = A$; Skew-symmetric: $A^T = -A$ (diagonal elements are strictly ZERO). Any square matrix can be uniquely written as $A = \\frac{1}{2}(A + A^T) + \\frac{1}{2}(A - A^T)$.",
      "Determinant scalar rule: For an $n \\times n$ matrix $A$, $|kA| = k^n |A|$.",
      "Adjoint properties: $A \\cdot (\\text{adj } A) = (\\text{adj } A) \\cdot A = |A| I_n$; $|\\text{adj } A| = |A|^{n-1}$; $|\\text{adj}(\\text{adj } A)| = |A|^{(n-1)^2}$; $\\text{adj}(AB) = (\\text{adj } B)(\\text{adj } A)$.",
      "Inverse: $A^{-1} = \\frac{1}{|A|} \\text{adj } A$. Exists if and only if $A$ is non-singular ($|A| \\ne 0$). $(AB)^{-1} = B^{-1} A^{-1}$.",
      "System of linear equations $AX = B$:\n  - If $|A| \\ne 0$: Unique solution $X = A^{-1}B$ (Consistent).\n  - If $|A| = 0$ and $(\\text{adj } A) B = O$: Infinitely many solutions or inconsistent.\n  - If $|A| = 0$ and $(\\text{adj } A) B \\ne O$: NO SOLUTION (Inconsistent).",
    ],
    coreConcepts: [
      {
        title: "Matrix Operations, Transpose & Symmetric Matrices",
        content:
          "1. **Matrix Multiplication**:\n   - Conformability: Product $AB$ exists $\\iff$ number of columns in $A$ equals number of rows in $B$.\n   - Commutativity: Generally $AB \\ne BA$. Even if $AB = O$, neither $A$ nor $B$ needs to be zero matrix.\n\n2. **Transpose & Symmetry**:\n   - **Symmetric Matrix**: $A^T = A \\iff a_{ij} = a_{ji}$.\n   - **Skew-Symmetric Matrix**: $A^T = -A \\iff a_{ij} = -a_{ji}$. For diagonal elements: $a_{ii} = -a_{ii} \\implies 2a_{ii} = 0 \\implies a_{ii} = 0$. **Every diagonal element of a skew-symmetric matrix is ZERO**.\n   - Determinant of an odd-order skew-symmetric matrix is **always zero**: $|A| = |A^T| = |-A| = (-1)^n |A| = -|A| \\implies 2|A| = 0 \\implies |A| = 0$ for odd $n$.\n   - **Decomposition Theorem**: Any square matrix $A$ can be uniquely expressed as the sum of a symmetric and a skew-symmetric matrix:\n     $$A = P + Q = \\frac{1}{2}(A + A^T) + \\frac{1}{2}(A - A^T)$$",
        ncertPointers: [
          "If A and B are symmetric matrices of the same order, then AB - BA is always a SKEW-SYMMETRIC matrix.",
          "If A and B are symmetric, AB + BA is always a SYMMETRIC matrix.",
        ],
      },
      {
        title: "Determinants, Adjoints & Multiplicative Inverses",
        content:
          "1. **Key Determinant Theorems**:\n   - $|AB| = |A| |B|$\n   - $|A^T| = |A|$\n   - $|A^{-1}| = \\frac{1}{|A|}$\n   - $|kA| = k^n |A|$ where $n$ is the order of square matrix $A$.\n   - If any two rows or columns are identical or proportional, $|A| = 0$.\n\n2. **Adjoint of a Square Matrix ($n \\times n$)**:\n   - Adjoint is the **transpose of the cofactor matrix**: $\\text{adj } A = [C_{ij}]^T$.\n   - **Fundamental Identity**: $A (\\text{adj } A) = (\\text{adj } A) A = |A| I_n$\n   - **Determinant of Adjoint**: Taking determinants of both sides:\n     $$|A| |\\text{adj } A| = |(|A| I_n)| = |A|^n |I_n| = |A|^n \\implies |\\text{adj } A| = |A|^{n - 1}$$\n   - **Adjoint of Adjoint**: $|\\text{adj}(\\text{adj } A)| = |A|^{(n - 1)^2}$, and $\\text{adj}(\\text{adj } A) = |A|^{n - 2} A$.\n\n3. **Inverse of a Matrix ($A^{-1}$)**:\n   - $A^{-1}$ exists $\\iff |A| \\ne 0$ (non-singular matrix).\n   - Formula: $A^{-1} = \\frac{1}{|A|} \\text{adj } A$.\n   - Reversal Law: $(AB)^{-1} = B^{-1} A^{-1}$.",
        ncertPointers: [
          "Area of triangle with vertices (x1, y1), (x2, y2), (x3, y3): Area = 1/2 |det [[x1, y1, 1], [x2, y2, 1], [x3, y3, 1]]|. If area = 0, the three points are collinear.",
        ],
      },
      {
        title: "Solving Systems of Linear Equations (Matrix Method)",
        content:
          "A system of linear equations:\n$$\\begin{cases} a_1 x + b_1 y + c_1 z = d_1 \\\\ a_2 x + b_2 y + c_2 z = d_2 \\\\ a_3 x + b_3 y + c_3 z = d_3 \\end{cases} \\iff A X = B$$\nwhere $A = \\begin{bmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{bmatrix}$, $X = \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}$, $B = \\begin{bmatrix} d_1 \\\\ d_2 \\\\ d_3 \\end{bmatrix}$.\n\n**Consistency Criteria (Cramer / Matrix Method)**:\n1. **Case 1: $|A| \\ne 0$ (Non-singular)**:\n   - The system is **Consistent**.\n   - Possesses a **Unique Solution**: $X = A^{-1} B$.\n2. **Case 2: $|A| = 0$ (Singular)**:\n   - Compute $(\\text{adj } A) B$:\n     - If $(\\text{adj } A) B \\ne O$: The system is **Inconsistent** and has **NO SOLUTION**.\n     - If $(\\text{adj } A) B = O$: The system may be **Consistent with Infinitely Many Solutions**, or Inconsistent.",
        ncertPointers: [
          "Homogeneous system AX = O: If |A| != 0, only trivial solution X = 0 exists. If |A| = 0, non-trivial (infinitely many) solutions exist.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Scalar Multiple Determinant",
        formula: "|k A| = k^n |A|",
        symbols: "n = \\text{order of square matrix } A",
        siUnits: "Scalar determinant value",
        applicationCondition: "Applies to all square matrices of order n",
      },
      {
        name: "Adjoint Determinant Power Law",
        formula: "|\\text{adj } A| = |A|^{n - 1}, \\quad |\\text{adj}(\\text{adj } A)| = |A|^{(n - 1)^2}",
        symbols: "n = \\text{order of matrix } A",
        siUnits: "Pure numeric value",
        applicationCondition: "Square matrix of order n >= 2",
      },
      {
        name: "Matrix Inverse Formula",
        formula: "A^{-1} = \\frac{1}{|A|} \\text{adj } A",
        symbols: "|A| \\ne 0 \\text{ (non-singular condition)}",
        siUnits: "Matrix of order n",
        applicationCondition: "Invertible matrices",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="250" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Matrix Method: Consistency Decision Tree for AX = B</text>

  <!-- Top Root: Calculate |A| -->
  <rect x="290" y="55" width="180" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
  <text x="380" y="80" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Evaluate Determinant |A|</text>

  <!-- Branch Left: |A| != 0 -->
  <line x1="330" y1="95" x2="160" y2="140" stroke="#22c55e" strokeWidth="2"/>
  <rect x="70" y="140" width="180" height="75" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5"/>
  <text x="160" y="162" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">|A| ≠ 0 (Non-Singular)</text>
  <text x="160" y="182" textAnchor="middle" fill="#f8fafc" fontSize="11">Consistent System</text>
  <text x="160" y="202" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Unique Solution: X = A⁻¹ B</text>

  <!-- Branch Right: |A| == 0 -->
  <line x1="430" y1="95" x2="600" y2="140" stroke="#f43f5e" strokeWidth="2"/>
  <rect x="490" y="140" width="220" height="85" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5"/>
  <text x="600" y="162" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="bold">|A| = 0 (Singular Matrix)</text>
  <text x="600" y="182" textAnchor="middle" fill="#f87171" fontSize="10">If (adj A)·B ≠ O → No Solution</text>
  <text x="600" y="202" textAnchor="middle" fill="#facc15" fontSize="10">If (adj A)·B = O → Infinitely Many Sol.</text>
</svg>`,
    workedExamples: [
      {
        id: "maths_u2_we1",
        questionNumber: 1,
        question:
          "Let $A$ be a $3 \\times 3$ non-singular matrix such that $|A| = 4$. What is the value of $|\\text{adj } A|$ and $|3A|$?",
        options: [
          { id: "A", text: "|adj A| = 16, |3A| = 108" },
          { id: "B", text: "|adj A| = 64, |3A| = 12" },
          { id: "C", text: "|adj A| = 16, |3A| = 36" },
          { id: "D", text: "|adj A| = 4, |3A| = 108" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Formula for determinant of adjoint of $n \\times n$ matrix: $|\\text{adj } A| = |A|^{n - 1}$.",
          "Step 2: Here $n = 3$ and $|A| = 4 \\implies |\\text{adj } A| = 4^{3 - 1} = 4^2 = 16$.",
          "Step 3: Formula for scalar multiple determinant: $|k A| = k^n |A|$.",
          "Step 4: Here $k = 3$ and $n = 3 \\implies |3A| = 3^3 |A| = 27 \\times 4 = 108$.",
          "Step 5: Thus, $|\\text{adj } A| = 16$ and $|3A| = 108$.",
        ],
        cuetTip: "Never forget the power $n$ when taking a scalar out of a determinant: $|kA| = k^n |A|$!",
      },
      {
        id: "maths_u2_we2",
        questionNumber: 2,
        question:
          "If $A$ and $B$ are symmetric matrices of the same order, then $AB - BA$ is ALWAYS a:",
        options: [
          { id: "A", text: "Symmetric matrix" },
          { id: "B", text: "Skew-symmetric matrix" },
          { id: "C", text: "Identity matrix" },
          { id: "D", text: "Zero matrix" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Given $A^T = A$ and $B^T = B$.",
          "Step 2: Let $C = AB - BA$. Take transpose of both sides: $C^T = (AB - BA)^T = (AB)^T - (BA)^T$.",
          "Step 3: By reversal law of transposes, $(AB)^T = B^T A^T$ and $(BA)^T = A^T B^T$.",
          "Step 4: Substitute $A^T = A, B^T = B$: $C^T = B A - A B = -(AB - BA) = -C$.",
          "Step 5: Since $C^T = -C$, the matrix $AB - BA$ is strictly skew-symmetric.",
        ],
        cuetTip: "Analogous result: $(AB + BA)^T = AB + BA \\implies$ symmetric. $(AB - BA)^T = -(AB - BA) \\implies$ skew-symmetric.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Adjoint Determinant Power Calculation",
        frequency: "Very High (every shift)",
        pyqExample: {
          question:
            "If $A$ is a square matrix of order 3 such that $|A| = 5$, then $|\\text{adj}(\\text{adj } A)|$ is equal to:",
          options: [
            { id: "A", text: "25" },
            { id: "B", text: "125" },
            { id: "C", text: "625" },
            { id: "D", text: "5" },
          ],
          correctOption: "C",
          explanation: "Formula: $|\\text{adj}(\\text{adj } A)| = |A|^{(n-1)^2}$. For $n = 3$, power is $(3 - 1)^2 = 2^2 = 4$. Thus $|A|^4 = 5^4 = 625$.",
        },
        strategy: "Memorize: $|\\text{adj } A| = |A|^{n-1}$ (for $n=3$, power 2); $|\\text{adj}(\\text{adj } A)| = |A|^{(n-1)^2}$ (for $n=3$, power 4).",
      },
      {
        type: "System of Equations Consistency Check",
        frequency: "High",
        pyqExample: {
          question:
            "The system of equations $x + y + z = 6$, $x + 2y + 3z = 10$, $x + 2y + \\lambda z = \\mu$ has a UNIQUE solution if:",
          options: [
            { id: "A", text: "λ ≠ 3, μ can be any real number" },
            { id: "B", text: "λ = 3, μ = 10" },
            { id: "C", text: "λ = 3, μ ≠ 10" },
            { id: "D", text: "λ = 0, μ = 0" },
          ],
          correctOption: "A",
          explanation: "A unique solution requires $|A| \\ne 0$. $|A| = \\det \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 2 & \\lambda \\end{pmatrix} = \\lambda - 3$. Thus $|A| \\ne 0 \\iff \\lambda \\ne 3$, independent of $\\mu$.",
        },
        strategy: "For unique solution, ONLY the coefficient determinant $|A| \\ne 0$ matters. The constant vector $\\mu$ is irrelevant.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming (A + B)^2 = A^2 + 2AB + B^2 for matrices.",
        whyWrong: "Matrix multiplication is non-commutative ($AB \\ne BA$).",
        correctUnderstanding: "$(A + B)^2 = (A + B)(A + B) = A^2 + AB + BA + B^2$. It equals $A^2 + 2AB + B^2$ ONLY IF $AB = BA$.",
      },
      {
        misconception: "Thinking the determinant of a skew-symmetric matrix is always zero.",
        whyWrong: "The determinant of an ODD-order skew-symmetric matrix is zero. An EVEN-order skew-symmetric matrix has a non-zero determinant (it is a perfect square).",
        correctUnderstanding: "For order $3 \\times 3$, $|A| = 0$. For order $2 \\times 2$ or $4 \\times 4$, $|A| \\ne 0$ in general.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Reversal Law for Inverses and Transposes",
        mnemonic: "Socks and Shoes rule: Put on socks then shoes; take off shoes then socks.",
        rule: "$(AB)^T = B^T A^T$ and $(AB)^{-1} = B^{-1} A^{-1}$.",
        shortcut: "Always reverse the order of terms when expanding transpose or inverse.",
        whenToApply: "Matrix algebra expansions.",
      },
      {
        title: "Adjoint Power Countdown",
        mnemonic: "n-1 for one adj, (n-1)^2 for two adjs.",
        rule: "$|\\text{adj } A| = |A|^{n-1}$. $|\\text{adj}(\\text{adj } A)| = |A|^{(n-1)^2}$.",
        shortcut: "For order 3: single adj $\\rightarrow$ square; double adj $\\rightarrow$ 4th power.",
        whenToApply: "Evaluating adjoint determinants.",
      },
    ],
    quickRevisionCard: {
      title: "Matrices & Determinants — Quick Card",
      bulletPoints: [
        "Matrix multiplication: Non-commutative ($AB \\ne BA$ generally). Associative: $A(BC) = (AB)C$.",
        "Transpose: $(AB)^T = B^T A^T$. Symmetric: $A^T = A$. Skew-symmetric: $A^T = -A$ (diagonal is 0).",
        "Odd-order skew-symmetric matrix: Determinant is ALWAYS ZERO ($|A| = 0$).",
        "Determinants: $|kA| = k^n |A|$; $|AB| = |A| |B|$; $|A^{-1}| = 1 / |A|$.",
        "Adjoint: $A (\\text{adj } A) = |A| I_n$; $|\\text{adj } A| = |A|^{n-1}$.",
        "Double adjoint: $|\\text{adj}(\\text{adj } A)| = |A|^{(n-1)^2}$; $\\text{adj}(\\text{adj } A) = |A|^{n-2} A$.",
        "Inverse: $A^{-1} = \\frac{1}{|A|} \\text{adj } A$. Exists iff $|A| \\ne 0$.",
        "System $AX = B$: If $|A| \\ne 0 \\implies$ unique solution $X = A^{-1} B$.",
        "If $|A| = 0$ and $(\\text{adj } A) B \\ne O \\implies$ NO SOLUTION (Inconsistent).",
        "If $|A| = 0$ and $(\\text{adj } A) B = O \\implies$ Infinitely many solutions or inconsistent.",
      ],
    },
    practiceQuestions: [
      {
        id: "maths_u2_q1",
        question: "If $A$ is a square matrix of order 3 and $|A| = 2$, then $|\\text{adj } A|$ is equal to:",
        type: "standard",
        options: [
          { id: "A", text: "2" },
          { id: "B", text: "4" },
          { id: "C", text: "8" },
          { id: "D", text: "16" },
        ],
        correctOption: "B",
        explanation: "Formula: $|\\text{adj } A| = |A|^{n-1}$. For $n = 3$, $|\\text{adj } A| = 2^{3-1} = 2^2 = 4$.",
        difficulty: "easy",
      },
      {
        id: "maths_u2_q2",
        question: "If $A = \\begin{bmatrix} 2 & 3 \\\\ 1 & 4 \\end{bmatrix}$, then $A^{-1}$ is equal to:",
        type: "standard",
        options: [
          { id: "A", text: "1/5 [4, -3; -1, 2]" },
          { id: "B", text: "1/5 [4, 3; 1, 2]" },
          { id: "C", text: "1/5 [-4, 3; 1, -2]" },
          { id: "D", text: "[4, -3; -1, 2]" },
        ],
        correctOption: "A",
        explanation: "$|A| = (2)(4) - (3)(1) = 8 - 3 = 5$. Adjoint of a $2 \\times 2$ matrix $[a, b; c, d]$ swaps diagonal elements and negates off-diagonal elements: $[d, -b; -c, a] = [4, -3; -1, 2]$. Thus $A^{-1} = \\frac{1}{5}\\begin{bmatrix} 4 & -3 \\\\ -1 & 2 \\end{bmatrix}$.",
        difficulty: "easy",
      },
      {
        id: "maths_u2_q3",
        question: "For any square matrix $A$, which of the following is ALWAYS a symmetric matrix?",
        type: "standard",
        options: [
          { id: "A", text: "A - Aᵀ" },
          { id: "B", text: "A + Aᵀ" },
          { id: "C", text: "Aᵀ" },
          { id: "D", text: "A² - Aᵀ" },
        ],
        correctOption: "B",
        explanation: "$(A + A^T)^T = A^T + (A^T)^T = A^T + A = A + A^T$, so $A + A^T$ is always symmetric.",
        difficulty: "easy",
      },
      {
        id: "maths_u2_q4",
        question: "Assertion (A): The determinant of a skew-symmetric matrix of order 3 is always zero.\nReason (R): For any skew-symmetric matrix $A$ of odd order $n$, $|A| = 0$.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "$|A| = |A^T| = |-A| = (-1)^n |A|$. For odd $n$, $|A| = -|A| \\implies 2|A| = 0 \\implies |A| = 0$.",
        difficulty: "easy",
      },
      {
        id: "maths_u2_q5",
        question: "Match List-I (Property / Expression) with List-II (Result for 3x3 Matrix):\nP. |adj A|\nQ. |adj(adj A)|\nR. |2A|\nS. A · adj(A)",
        type: "match-the-following",
        options: [
          { id: "A", text: "P-|A|², Q-|A|⁴, R-8|A|, S-|A| I" },
          { id: "B", text: "P-|A|⁴, Q-|A|², R-8|A|, S-|A| I" },
          { id: "C", text: "P-|A|², Q-|A|⁴, R-2|A|, S-I" },
          { id: "D", text: "P-8|A|, Q-|A|², R-|A|⁴, S-|A| I" },
        ],
        correctOption: "A",
        explanation: "For $n=3$: $|\\text{adj } A| = |A|^2$, $|\\text{adj}(\\text{adj } A)| = |A|^4$, $|2A| = 2^3 |A| = 8|A|$, and $A \\cdot \\text{adj } A = |A| I$.",
        difficulty: "easy",
      },
      {
        id: "maths_u2_q6",
        question: "If points $(k, 0)$, $(4, 0)$, and $(0, 2)$ form a triangle of area 4 square units, the value of $k$ is:",
        type: "standard",
        options: [
          { id: "A", text: "0 or 8" },
          { id: "B", text: "-8 or 0" },
          { id: "C", text: "4 or -4" },
          { id: "D", text: "2 or 6" },
        ],
        correctOption: "A",
        explanation: "Area $= \\frac{1}{2} |\\det [k, 0, 1; 4, 0, 1; 0, 2, 1]| = \\frac{1}{2} |-2(k - 4)| = |4 - k| = 4 \\implies 4 - k = \\pm 4 \\implies k = 0$ or $k = 8$.",
        difficulty: "medium",
      },
      {
        id: "maths_u2_q7",
        question: "If $A$ is an invertible matrix of order 3, then $|A^{-1}|$ equals:",
        type: "standard",
        options: [
          { id: "A", text: "|A|" },
          { id: "B", text: "1 / |A|" },
          { id: "C", text: "1" },
          { id: "D", text: "|A|³" },
        ],
        correctOption: "B",
        explanation: "Since $A A^{-1} = I$, $|A A^{-1}| = |A| |A^{-1}| = |I| = 1 \\implies |A^{-1}| = 1 / |A|$.",
        difficulty: "easy",
      },
      {
        id: "maths_u2_q8",
        question: "A system of linear equations $AX = B$ with a non-singular matrix $A$ has:",
        type: "standard",
        options: [
          { id: "A", text: "Infinitely many solutions" },
          { id: "B", text: "No solution" },
          { id: "C", text: "A unique solution given by X = A⁻¹ B" },
          { id: "D", text: "Two solutions" },
        ],
        correctOption: "C",
        explanation: "When $|A| \\ne 0$, $A^{-1}$ exists uniquely, guaranteeing exactly one unique solution $X = A^{-1}B$.",
        difficulty: "easy",
      },
      {
        id: "maths_u2_q9",
        question: "If $A$ and $B$ are square matrices of the same order such that $AB = A$ and $BA = B$, then $A^2$ is equal to:",
        type: "standard",
        options: [
          { id: "A", text: "A" },
          { id: "B", text: "B" },
          { id: "C", text: "I" },
          { id: "D", text: "O" },
        ],
        correctOption: "A",
        explanation: "$A^2 = A A = A (AB) = (AB) B = A B = A$. So $A$ is idempotent ($A^2 = A$).",
        difficulty: "medium",
      },
      {
        id: "maths_u2_q10",
        question: "The value of a third-order determinant whose elements in the first row are equal to the elements in the third row is:",
        type: "standard",
        options: [
          { id: "A", text: "1" },
          { id: "B", text: "0" },
          { id: "C", text: "-1" },
          { id: "D", text: "Product of diagonal elements" },
        ],
        correctOption: "B",
        explanation: "If any two rows (or columns) of a determinant are identical, the value of the determinant is zero.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["maths_u1_t1"],
      relatedTopics: ["maths_u3_t1"],
      practiceTestId: "practice-maths-unit2-test1",
      practiceTestUrl: "/test/practice-maths-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=maths",
      weaknessRadarUrl: "/dashboard/radar?subject=maths",
    },
    subjectSpecific: {
      mathematics: {
        standardResults: [
          { result: "|k A| = k^n |A|", condition: "Square matrix of order n" },
          { result: "|\\text{adj } A| = |A|^{n - 1}", condition: "Square matrix of order n" },
          { result: "A (\\text{adj } A) = |A| I_n", condition: "All square matrices" },
        ],
        graphProperties: [
          { curve: "AX = B (2 variables)", keyPoints: "Intersecting lines = unique solution; parallel lines = inconsistent; coincident lines = infinite solutions" },
        ],
      },
    },
  },

  // Unit 3: Calculus
  {
    id: "maths_u3_t1",
    slug: "continuity-and-differentiability-applications-of-derivatives-integrals-applications-of-integrals-differential-equations",
    subject: "maths",
    subjectName: "Mathematics",
    subjectCode: "319",
    unitNumber: 3,
    unitTitle: "Calculus",
    topicTitle: "Continuity & Differentiability, Applications of Derivatives, Integrals, Applications of Integrals, Differential Equations",
    ncertReference: {
      class: "Class 12",
      book: "Mathematics Parts 1 & 2",
      chapterNumber: 3,
      chapterName: "Calculus Complete Module",
      sections: [
        "5.1 Continuity & Differentiability (LHL = RHL = f(a))",
        "5.2 Chain Rule, Implicit Differentiation & Logarithmic Differentiation",
        "6.1 Rate of Change, Increasing/Decreasing Functions",
        "6.2 Maxima and Minima (First and Second Derivative Tests)",
        "7.1 Indefinite Integrals: Substitution, Parts, Partial Fractions",
        "7.2 Definite Integrals: Fundamental Theorem & Properties (King's Rule)",
        "8.1 Area Bounded by Curves (Parabolas, Circles, Ellipses)",
        "9.1 Differential Equations: Order, Degree & Integrating Factor",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (12-14 questions per shift)",
      totalPyqsInRepo: 650,
      weightagePercentage: 28.0,
    },
    summary30Seconds: [
      "Continuity: $\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)$. Differentiability $\\implies$ Continuity, but Continuity does NOT imply Differentiability (e.g., $f(x) = |x|$ at $x=0$).",
      "Logarithmic differentiation: Essential for functions of the form $y = [u(x)]^{v(x)}$: take $\\ln y = v \\ln u$ before differentiating.",
      "Increasing/Decreasing: $f'(x) \\ge 0$ on $(a, b) \\implies$ increasing; $f'(x) \\le 0 \\implies$ decreasing. Critical points occur where $f'(x) = 0$ or $f'(x)$ is undefined.",
      "Maxima/Minima: If $f'(c) = 0$ and $f''(c) < 0 \\implies$ local maximum; if $f''(c) > 0 \\implies$ local minimum. If $f''(c) = 0$, use higher derivatives or first derivative sign test.",
      "Integration by parts: $\\int u v\\, dx = u \\int v\\, dx - \\int (u' \\int v\\, dx)\\, dx$ using ILATE priority rule.",
      "King's Property of Definite Integrals: $\\int_a^b f(x)\\, dx = \\int_a^b f(a + b - x)\\, dx$. For limits $0$ to $\\pi/2$: $\\int_0^{\\pi/2} \\frac{\\sin^n x}{\\sin^n x + \\cos^n x}\\, dx = \\frac{\\pi}{4}$.",
      "Area between curves: Area between $y^2 = 4ax$ and $x^2 = 4by$ is $\\frac{16ab}{3}$. Area between $y^2 = 4ax$ and $y = mx$ is $\\frac{8a^2}{3m^3}$.",
      "Differential equations: Linear form $\\frac{dy}{dx} + P y = Q$ has Integrating Factor $I.F. = e^{\\int P\\, dx}$, and solution $y \\cdot (I.F.) = \\int Q \\cdot (I.F.)\\, dx + C$.",
    ],
    coreConcepts: [
      {
        title: "Continuity, Differentiability & Derivatives",
        content:
          "1. **Continuity at $x = c$**:\n   $$\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)$$\n   All polynomial, exponential, trigonometric, and logarithmic functions are continuous on their domains.\n\n2. **Differentiability at $x = c$**:\n   $$L f'(c) = \\lim_{h \\to 0} \\frac{f(c - h) - f(c)}{-h} = \\lim_{h \\to 0} \\frac{f(c + h) - f(c)}{h} = R f'(c)$$\n   - Sharp turns or corners (like $y = |x|$ at $x = 0$) are continuous but **not differentiable**.\n   - **Theorem**: Every differentiable function is continuous, but the converse is NOT true.\n\n3. **Derivative of Parametric Functions**:\n   If $x = f(t)$ and $y = g(t)$, then $\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$.\n   *Second Derivative*: $\\frac{d^2 y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right) = \\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\cdot \\frac{dt}{dx} = \\frac{\\frac{d}{dt}(dy/dx)}{dx/dt}$.",
        ncertPointers: [
          "Do not forget the dt/dx term when evaluating second derivatives of parametric functions!",
        ],
      },
      {
        title: "Definite Integrals & The Powerful 'King's Property'",
        content:
          "**Standard Properties of Definite Integrals**:\n1. $\\int_a^b f(x)\\, dx = \\int_a^b f(t)\\, dt$ (dummy variable)\n2. $\\int_a^b f(x)\\, dx = -\\int_b^a f(x)\\, dx$\n3. $\\int_a^b f(x)\\, dx = \\int_a^c f(x)\\, dx + \\int_c^b f(x)\\, dx$\n4. **King's Property**:\n   $$\\int_a^b f(x)\\, dx = \\int_a^b f(a + b - x)\\, dx$$\n   Special case ($a = 0$):\n   $$\\int_0^a f(x)\\, dx = \\int_0^a f(a - x)\\, dx$$\n   *Classic CUET Application*: Let $I = \\int_0^{\\pi/2} \\frac{\\sin^n x}{\\sin^n x + \\cos^n x}\\, dx$. Applying King's property gives $I = \\int_0^{\\pi/2} \\frac{\\cos^n x}{\\cos^n x + \\sin^n x}\\, dx$. Adding both: $2I = \\int_0^{\\pi/2} 1\\, dx = [x]_0^{\\pi/2} = \\pi/2 \\implies I = \\frac{\\pi}{4}$.\n5. **Odd/Even Functions (Symmetric Limits $[ -a, a ]$)**:\n   $$\\int_{-a}^a f(x)\\, dx = \\begin{cases} 2 \\int_0^a f(x)\\, dx & \\text{if } f(-x) = f(x) \\text{ (even)} \\\\ 0 & \\text{if } f(-x) = -f(x) \\text{ (odd)} \\end{cases}$$\n6. **Periodic Property**: If $f(x + T) = f(x)$, then $\\int_0^{nT} f(x)\\, dx = n \\int_0^T f(x)\\, dx$.",
        ncertPointers: [
          "Integral of e^x [f(x) + f'(x)] dx = e^x f(x) + C. This standard form appears in nearly every CUET test paper.",
        ],
      },
      {
        title: "Differential Equations: Order, Degree & Linear First-Order Form",
        content:
          "1. **Order & Degree**:\n   - **Order**: Highest derivative present in the differential equation.\n   - **Degree**: Highest power (exponent) of the highest order derivative, when the equation is a polynomial in derivatives.\n   - *Trap*: $\\frac{d^2 y}{dx^2} + \\sin\\left(\\frac{dy}{dx}\\right) = 0$ has Order = 2, but **Degree is NOT DEFINED** (because $\\sin(y')$ is not a polynomial in derivatives).\n\n2. **Linear Differential Equation of First Order**:\n   $$\\frac{dy}{dx} + P(x) y = Q(x)$$\n   - **Integrating Factor (I.F.)**: $I.F. = e^{\\int P(x)\\, dx}$\n   - **General Solution**:\n     $$y \\cdot (I.F.) = \\int Q(x) \\cdot (I.F.)\\, dx + C$$\n   - **Alternative Form**: $\\frac{dx}{dy} + P(y) x = Q(y)$:\n     $$I.F. = e^{\\int P(y)\\, dy}, \\quad x \\cdot (I.F.) = \\int Q(y) \\cdot (I.F.)\\, dy + C$$",
        ncertPointers: [
          "Separation of variables: dy/dx = f(x) g(y) => dy/g(y) = f(x) dx.",
          "Homogeneous equation: dy/dx = F(y/x). Substitute y = vx, dy/dx = v + x dv/dx.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "King's Definite Integral Property",
        formula: "\\int_0^a f(x)\\, dx = \\int_0^a f(a - x)\\, dx",
        symbols: "Valid for all continuous functions on [0, a]",
        siUnits: "Definite integral evaluation",
        applicationCondition: "Symmetric trigonometric and rational integrands",
      },
      {
        name: "Standard Exponential-Function Integral",
        formula: "\\int e^x \\left[f(x) + f'(x)\\right]\\, dx = e^x f(x) + C",
        symbols: "f'(x) = \\text{derivative of } f(x)",
        siUnits: "Indefinite integral",
        applicationCondition: "Integrands involving e^x with sum of function and its derivative",
      },
      {
        name: "Linear Differential Equation Solution",
        formula: "I.F. = e^{\\int P\\, dx}, \\quad y \\cdot (I.F.) = \\int Q \\cdot (I.F.)\\, dx + C",
        symbols: "P, Q = \\text{functions of } x \\text{ only}",
        siUnits: "Differential equation solution",
        applicationCondition: "First order linear ODE in standard form",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="250" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Calculus Core: Definite Integrals & Area Under Curves</text>

  <!-- Left: Area Between Parabolas -->
  <g transform="translate(60, 55)">
    <rect width="290" height="170" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1"/>
    <text x="145" y="24" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Area Bounded by Two Parabolas</text>
    <text x="145" y="55" textAnchor="middle" fill="#f8fafc" fontSize="11">y² = 4ax  and  x² = 4by</text>
    <text x="145" y="90" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">Area = 16 a b / 3</text>
    <text x="145" y="125" textAnchor="middle" fill="#94a3b8" fontSize="11">Special case: y² = 4ax and x² = 4ay</text>
    <text x="145" y="150" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">Area = 16 a² / 3</text>
  </g>

  <!-- Right: Standard King's Property Result -->
  <g transform="translate(410, 55)">
    <rect width="290" height="170" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1"/>
    <text x="145" y="24" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="bold">Symmetric King's Rule Result</text>
    <text x="145" y="55" textAnchor="middle" fill="#f8fafc" fontSize="11">∫₀^(π/2) [sinⁿ(x) / (sinⁿ(x) + cosⁿ(x))] dx</text>
    <text x="145" y="90" textAnchor="middle" fill="#34d399" fontSize="16" fontWeight="bold">= π / 4</text>
    <text x="145" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">Independent of exponent n (n = 1, 2, 1/2, 2024)</text>
    <text x="145" y="150" textAnchor="middle" fill="#fda4af" fontSize="11">Answer is ALWAYS π/4 in CUET</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "maths_u3_we1",
        questionNumber: 1,
        question:
          "Evaluate the definite integral: $I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}}\\, dx$.",
        options: [
          { id: "A", text: "π / 2" },
          { id: "B", text: "π / 4" },
          { id: "C", text: "π" },
          { id: "D", text: "0" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Let $I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}}\\, dx$ (Equation 1).",
          "Step 2: Apply property $\\int_0^a f(x)\\, dx = \\int_0^a f(a - x)\\, dx$. Replacing $x$ by $\\frac{\\pi}{2} - x$:\n$\\sin(\\pi/2 - x) = \\cos x$ and $\\cos(\\pi/2 - x) = \\sin x$.",
          "Step 3: $I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\cos x}}{\\sqrt{\\cos x} + \\sqrt{\\sin x}}\\, dx$ (Equation 2).",
          "Step 4: Add Equation 1 and Equation 2: $2I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x} + \\sqrt{\\cos x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}}\\, dx = \\int_0^{\\pi/2} 1\\, dx = [x]_0^{\\pi/2} = \\frac{\\pi}{2}$.",
          "Step 5: Solve for $I$: $I = \\frac{1}{2} \\left(\\frac{\\pi}{2}\\right) = \\frac{\\pi}{4}$.",
        ],
        cuetTip: "Universal shortcut: Any integral of type $\\int_0^{\\pi/2} \\frac{f(x)}{f(x) + f(\\pi/2 - x)}\\, dx$ equals $\\frac{\\text{Upper Limit} - \\text{Lower Limit}}{2} = \\frac{\\pi/2 - 0}{2} = \\frac{\\pi}{4}$.",
      },
      {
        id: "maths_u3_we2",
        questionNumber: 2,
        question:
          "Find the Integrating Factor (I.F.) of the differential equation: $x \\frac{dy}{dx} - y = 2x^2$.",
        options: [
          { id: "A", text: "x" },
          { id: "B", text: "1 / x" },
          { id: "C", text: "e^x" },
          { id: "D", text: "-x" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Divide by $x$ to bring into standard linear form: $\\frac{dy}{dx} - \\frac{1}{x} y = 2x$.",
          "Step 2: Identify $P(x) = -\\frac{1}{x}$ and $Q(x) = 2x$.",
          "Step 3: Calculate $\\int P(x)\\, dx = \\int -\\frac{1}{x}\\, dx = -\\ln x = \\ln(x^{-1})$.",
          "Step 4: Integrating Factor $I.F. = e^{\\int P(x)\\, dx} = e^{\\ln(x^{-1})} = x^{-1} = \\frac{1}{x}$.",
        ],
        cuetTip: "Always ensure the coefficient of dy/dx is strictly 1 before picking out P(x)!",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Order and Degree Determination",
        frequency: "Very High",
        pyqExample: {
          question:
            "The order and degree of the differential equation $\\left[1 + \\left(\\frac{dy}{dx}\\right)^2\\right]^{3/2} = \\frac{d^2 y}{dx^2}$ are respectively:",
          options: [
            { id: "A", text: "Order 2, Degree 2" },
            { id: "B", text: "Order 2, Degree 3" },
            { id: "C", text: "Order 1, Degree 2" },
            { id: "D", text: "Order 2, Degree not defined" },
          ],
          correctOption: "A",
          explanation: "Square both sides to eliminate fractional powers: $[1 + (dy/dx)^2]^3 = (d^2y/dx^2)^2$. The highest derivative is $d^2y/dx^2$ (Order = 2), and its highest exponent is 2 (Degree = 2).",
        },
        strategy: "Always eliminate fractional powers and radicals before reading off the degree.",
      },
      {
        type: "Area Enclosed by Standard Parabolas",
        frequency: "High",
        pyqExample: {
          question:
            "The area of the region bounded by the parabolas $y^2 = 4x$ and $x^2 = 4y$ is:",
          options: [
            { id: "A", text: "16 / 3 sq units" },
            { id: "B", text: "8 / 3 sq units" },
            { id: "C", text: "32 / 3 sq units" },
            { id: "D", text: "4 / 3 sq units" },
          ],
          correctOption: "A",
          explanation: "Direct formula: Area bounded by $y^2 = 4ax$ and $x^2 = 4ay$ is $\\frac{16 a^2}{3}$. Here $4a = 4 \\implies a = 1$. Area $= \\frac{16(1)^2}{3} = \\frac{16}{3}$ sq units.",
        },
        strategy: "Memorize the direct formula: Area $= \\frac{16 a b}{3}$. Never perform long integration in CUET for this standard question.",
      },
    ],
    commonTraps: [
      {
        misconception: "Stating degree is defined when dy/dx is trapped inside an exponential or sine function.",
        whyWrong: "The definition of degree requires the differential equation to be a polynomial in derivatives.",
        correctUnderstanding: "If any derivative is an argument of $\\sin(y'), \\cos(y'), e^{y'}$, or $\\ln(y')$, the degree is NOT DEFINED.",
      },
      {
        misconception: "Forgetting to take absolute values when calculating areas below the x-axis.",
        whyWrong: "Definite integrals below the x-axis evaluate to negative numbers, but geometric area is strictly positive.",
        correctUnderstanding: "Always integrate absolute value or split the integral at x-intercepts: $\\text{Area} = |\\int_{x_1}^{x_2} y\\, dx|$.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Integration By Parts Priority",
        mnemonic: "ILATE: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential.",
        rule: "Choose the first function $u$ according to the first letter in ILATE.",
        shortcut: "Algebraic precedes trig ($x \\sin x \\implies u = x, v = \\sin x$). Log always beats algebraic ($x \\ln x \\implies u = \\ln x$).",
        whenToApply: "Integration by parts.",
      },
      {
        title: "Area of Parabola Formula",
        mnemonic: "16/3 Rule: Area between intersecting standard parabolas.",
        rule: "Area between $y^2 = 4ax$ and $x^2 = 4by$ is $\\frac{16ab}{3}$.",
        shortcut: "Multiply $a$ and $b$ by $16/3$.",
        whenToApply: "Direct area questions in CUET.",
      },
    ],
    quickRevisionCard: {
      title: "Calculus — Complete High-Yield Summary",
      bulletPoints: [
        "Continuity: $\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)$. Differentiability $\\implies$ Continuity.",
        "Log diff: $y = u(x)^{v(x)} \\implies \\ln y = v \\ln u$.",
        "Increasing: $f'(x) \\ge 0$; Decreasing: $f'(x) \\le 0$. Maxima: $f'=0, f''<0$; Minima: $f'=0, f''>0$.",
        "Parts: $\\int u v\\, dx = u \\int v - \\int u' (\\int v)\\, dx$ (ILATE rule).",
        "Standard form: $\\int e^x [f(x) + f'(x)]\\, dx = e^x f(x) + C$.",
        "King's property: $\\int_0^a f(x)\\, dx = \\int_0^a f(a - x)\\, dx$. $\\int_0^{\\pi/2} \\frac{\\sin^n x}{\\sin^n x + \\cos^n x}\\, dx = \\frac{\\pi}{4}$.",
        "Odd function: $\\int_{-a}^a f(x)\\, dx = 0$ if $f(-x) = -f(x)$.",
        "Area between $y^2 = 4ax$ and $x^2 = 4by$ is $\\frac{16ab}{3}$.",
        "Linear ODE: $\\frac{dy}{dx} + P y = Q \\implies I.F. = e^{\\int P\\, dx}$; $y \\cdot (I.F.) = \\int Q \\cdot (I.F.)\\, dx + C$.",
        "Degree not defined if derivatives appear inside $\\sin, \\cos, e, \\ln$.",
      ],
    },
    practiceQuestions: [
      {
        id: "maths_u3_q1",
        question: "The value of $\\int e^x (\\tan x + \\sec^2 x)\\, dx$ is:",
        type: "standard",
        options: [
          { id: "A", text: "e^x sec² x + C" },
          { id: "B", text: "e^x tan x + C" },
          { id: "C", text: "e^x (tan x + sec x) + C" },
          { id: "D", text: "e^x + C" },
        ],
        correctOption: "B",
        explanation: "Form $\\int e^x [f(x) + f'(x)]\\, dx = e^x f(x) + C$. Here $f(x) = \\tan x$ and $f'(x) = \\sec^2 x$. The integral is $e^x \\tan x + C$.",
        difficulty: "easy",
      },
      {
        id: "maths_u3_q2",
        question: "The order and degree of the differential equation $\\frac{d^3 y}{dx^3} + 2\\left(\\frac{d^2 y}{dx^2}\\right)^2 - \\frac{dy}{dx} + y = 0$ are:",
        type: "standard",
        options: [
          { id: "A", text: "Order 3, Degree 1" },
          { id: "B", text: "Order 3, Degree 2" },
          { id: "C", text: "Order 2, Degree 3" },
          { id: "D", text: "Order 1, Degree 3" },
        ],
        correctOption: "A",
        explanation: "The highest derivative present is $d^3y/dx^3$ (Order = 3). The exponent of this highest order derivative is 1 (Degree = 1).",
        difficulty: "easy",
      },
      {
        id: "maths_u3_q3",
        question: "The function $f(x) = x^3 - 3x^2 + 3x - 100$ is:",
        type: "standard",
        options: [
          { id: "A", text: "Strictly increasing on R" },
          { id: "B", text: "Strictly decreasing on R" },
          { id: "C", text: "Increasing on (-inf, 1) and decreasing on (1, inf)" },
          { id: "D", text: "Neither increasing nor decreasing" },
        ],
        correctOption: "A",
        explanation: "$f'(x) = 3x^2 - 6x + 3 = 3(x^2 - 2x + 1) = 3(x - 1)^2 \\ge 0$ for all $x \\in \\mathbb{R}$. Since $f'(x) > 0$ almost everywhere, $f(x)$ is strictly increasing on $\\mathbb{R}$.",
        difficulty: "easy",
      },
      {
        id: "maths_u3_q4",
        question: "Assertion (A): The function $f(x) = |x - 2|$ is continuous at $x = 2$ but not differentiable at $x = 2$.\nReason (R): The left-hand derivative $L f'(2) = -1$ and the right-hand derivative $R f'(2) = +1$.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "Since the left and right hand derivatives exist but are unequal (-1 != +1), the function has a corner at x = 2 and is not differentiable, despite being continuous.",
        difficulty: "easy",
      },
      {
        id: "maths_u3_q5",
        question: "The area bounded by the curve $y = \\cos x$ between $x = 0$ and $x = 2\\pi$ is:",
        type: "standard",
        options: [
          { id: "A", text: "0 sq units" },
          { id: "B", text: "2 sq units" },
          { id: "C", text: "4 sq units" },
          { id: "D", text: "1 sq unit" },
        ],
        correctOption: "C",
        explanation: "Cosine has 4 equal quadrants between 0 and $2\\pi$. Each quadrant has area $\\int_0^{\\pi/2} \\cos x\\, dx = [\\sin x]_0^{\\pi/2} = 1$. Total bounded area $= 4 \\times 1 = 4$ sq units.",
        difficulty: "medium",
      },
      {
        id: "maths_u3_q6",
        question: "The value of the definite integral $\\int_{-\\pi/2}^{\\pi/2} (x^3 + x \\cos x + \\tan^5 x + 1)\\, dx$ is:",
        type: "standard",
        options: [
          { id: "A", text: "0" },
          { id: "B", text: "π" },
          { id: "C", text: "2" },
          { id: "D", text: "π / 2" },
        ],
        correctOption: "B",
        explanation: "$x^3$, $x \\cos x$, and $\\tan^5 x$ are all ODD functions; their integrals over $[-\\pi/2, \\pi/2]$ evaluate to 0. The remaining constant 1 is even: $\\int_{-\\pi/2}^{\\pi/2} 1\\, dx = \\frac{\\pi}{2} - (-\\frac{\\pi}{2}) = \\pi$.",
        difficulty: "medium",
      },
      {
        id: "maths_u3_q7",
        question: "The general solution of the differential equation $\\frac{dy}{dx} = e^{x - y}$ is:",
        type: "standard",
        options: [
          { id: "A", text: "e^y = e^x + C" },
          { id: "B", text: "e^-y = e^x + C" },
          { id: "C", text: "e^y = -e^x + C" },
          { id: "D", text: "e^-y = -e^-x + C" },
        ],
        correctOption: "A",
        explanation: "Separate variables: $\\frac{dy}{dx} = \\frac{e^x}{e^y} \\implies e^y\\, dy = e^x\\, dx$. Integrate both sides: $e^y = e^x + C$.",
        difficulty: "easy",
      },
      {
        id: "maths_u3_q8",
        question: "If $y = \\sqrt{\\sin x + \\sqrt{\\sin x + \\sqrt{\\sin x + \\dots \\infty}}}$, then $\\frac{dy}{dx}$ equals:",
        type: "standard",
        options: [
          { id: "A", text: "cos x / (2y - 1)" },
          { id: "B", text: "cos x / (1 - 2y)" },
          { id: "C", text: "sin x / (2y - 1)" },
          { id: "D", text: "-cos x / (2y - 1)" },
        ],
        correctOption: "A",
        explanation: "Square both sides: $y^2 = \\sin x + y$. Differentiate with respect to $x$: $2y \\frac{dy}{dx} = \\cos x + \\frac{dy}{dx} \\implies (2y - 1) \\frac{dy}{dx} = \\cos x \\implies \\frac{dy}{dx} = \\frac{\\cos x}{2y - 1}$.",
        difficulty: "medium",
      },
      {
        id: "maths_u3_q9",
        question: "The maximum value of the function $f(x) = \\left(\\frac{1}{x}\\right)^x$ is achieved at $x = $:",
        type: "standard",
        options: [
          { id: "A", text: "e" },
          { id: "B", text: "1 / e" },
          { id: "C", text: "1" },
          { id: "D", text: "e²" },
        ],
        correctOption: "B",
        explanation: "Let $y = (1/x)^x \\implies \\ln y = -x \\ln x$. Differentiating gives $\\frac{1}{y} y' = -(\\ln x + 1) = 0 \\implies \\ln x = -1 \\implies x = 1/e$.",
        difficulty: "medium",
      },
      {
        id: "maths_u3_q10",
        question: "The value of $\\int_0^1 x(1 - x)^9\\, dx$ is:",
        type: "standard",
        options: [
          { id: "A", text: "1 / 110" },
          { id: "B", text: "1 / 100" },
          { id: "C", text: "1 / 90" },
          { id: "D", text: "1 / 10" },
        ],
        correctOption: "A",
        explanation: "Use property $\\int_0^1 f(x)\\, dx = \\int_0^1 f(1 - x)\\, dx$: $\\int_0^1 (1 - x)(1 - (1 - x))^9\\, dx = \\int_0^1 (1 - x)x^9\\, dx = \\int_0^1 (x^9 - x^{10})\\, dx = \\left[\\frac{x^{10}}{10} - \\frac{x^{11}}{11}\\right]_0^1 = \\frac{1}{10} - \\frac{1}{11} = \\frac{1}{110}$.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["maths_u2_t1"],
      relatedTopics: ["maths_u4_t1"],
      practiceTestId: "practice-maths-unit3-test1",
      practiceTestUrl: "/test/practice-maths-unit3-test1",
      weaknessReportUrl: "/dashboard/radar?subject=maths",
      weaknessRadarUrl: "/dashboard/radar?subject=maths",
    },
    subjectSpecific: {
      mathematics: {
        standardResults: [
          { result: "\\int_0^{\\pi/2} \\frac{\\sin^n x}{\\sin^n x + \\cos^n x}\\, dx = \\frac{\\pi}{4}", condition: "For all n \\in \\mathbb{R}" },
          { result: "\\int e^x [f(x) + f'(x)]\\, dx = e^x f(x) + C", condition: "Differentiable function f" },
          { result: "\\text{Area between } y^2 = 4ax \\text{ and } x^2 = 4by = \\frac{16ab}{3}", condition: "Standard intersecting parabolas" },
        ],
        graphProperties: [
          { curve: "y = |x|", keyPoints: "Continuous everywhere on R, non-differentiable at sharp corner x = 0" },
          { curve: "y = e^x", keyPoints: "Always positive, strictly increasing, asymptote y = 0 as x -> -inf" },
        ],
      },
    },
  },
];
