import { NoteDocument } from "@/types/notes";

export const mathsUnits4to7Topics: NoteDocument[] = [
  // Unit 4: Vectors and 3D Geometry
  {
    id: "maths_u4_t1",
    slug: "dot-and-cross-products-of-vectors-direction-cosines-lines-and-planes-in-3d-space",
    subject: "maths",
    subjectName: "Mathematics",
    subjectCode: "319",
    unitNumber: 4,
    unitTitle: "Vectors and Three-Dimensional Geometry",
    topicTitle: "Dot and Cross Products of Vectors, Direction Cosines, Lines and Planes in 3D Space",
    ncertReference: {
      class: "Class 12",
      book: "Mathematics Part 2",
      chapterNumber: 4,
      chapterName: "Vector Algebra and Three-Dimensional Geometry",
      sections: [
        "10.1 Types of Vectors & Addition",
        "10.2 Scalar (Dot) Product of Two Vectors & Projection",
        "10.3 Vector (Cross) Product of Two Vectors",
        "11.1 Direction Cosines and Direction Ratios of a Line",
        "11.2 Equation of a Line in Space (Vector and Cartesian)",
        "11.3 Angle Between Two Lines & Shortest Distance between Skew Lines",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (6-7 questions per shift)",
      totalPyqsInRepo: 310,
      weightagePercentage: 14.0,
    },
    summary30Seconds: [
      "Dot product: $\\vec{a} \\cdot \\vec{b} = |\\vec{a}| |\\vec{b}| \\cos \\theta$. Perpendicular condition: $\\vec{a} \\cdot \\vec{b} = 0$. Projection of $\\vec{a}$ on $\\vec{b}$: $\\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}$.",
      "Cross product: $\\vec{a} \\times \\vec{b} = |\\vec{a}| |\\vec{b}| \\sin \\theta\\, \\hat{n}$. Collinear condition: $\\vec{a} \\times \\vec{b} = \\vec{0}$. Non-commutative: $\\vec{a} \\times \\vec{b} = -(\\vec{b} \\times \\vec{a})$.",
      "Area formulas: Triangle with adjacent sides $\\vec{a}, \\vec{b}$: $\\frac{1}{2} |\\vec{a} \\times \\vec{b}|$; Parallelogram with diagonals $\\vec{d}_1, \\vec{d}_2$: $\\frac{1}{2} |\\vec{d}_1 \\times \\vec{d}_2|$.",
      "Direction cosines: $l = \\cos \\alpha, m = \\cos \\beta, n = \\cos \\gamma$ with $l^2 + m^2 + n^2 = 1$. Direction ratios $a, b, c$: $l = \\frac{a}{\\sqrt{a^2+b^2+c^2}}$.",
      "Equation of line: Vector: $\\vec{r} = \\vec{a} + \\lambda \\vec{b}$; Cartesian: $\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c}$.",
      "Shortest distance between skew lines $\\vec{r} = \\vec{a}_1 + \\lambda \\vec{b}_1$ and $\\vec{r} = \\vec{a}_2 + \\mu \\vec{b}_2$:\n$$d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}$$\nLines intersect if and only if $d = 0 \\iff (\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2) = 0$.",
      "Shortest distance between parallel lines: $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\times \\vec{b}|}{|\\vec{b}|}$.",
    ],
    coreConcepts: [
      {
        title: "Scalar & Vector Products and Geometric Applications",
        content:
          "1. **Dot (Scalar) Product**:\n   $$\\vec{a} \\cdot \\vec{b} = a_1 b_1 + a_2 b_2 + a_3 b_3 = |\\vec{a}| |\\vec{b}| \\cos \\theta$$\n   - Commutative: $\\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a}$.\n   - Self-dot product: $\\vec{a} \\cdot \\vec{a} = |\\vec{a}|^2$.\n   - Orthogonality: $\\vec{a} \\perp \\vec{b} \\iff \\vec{a} \\cdot \\vec{b} = 0$.\n   - **Projection of $\\vec{a}$ on $\\vec{b}$**: The scalar length is $\\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}$; vector projection is $\\left(\\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|^2}\\right) \\vec{b}$.\n\n2. **Cross (Vector) Product**:\n   $$\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix} = |\\vec{a}| |\\vec{b}| \\sin \\theta\\, \\hat{n}$$\n   - Anti-commutative: $\\vec{a} \\times \\vec{b} = -(\\vec{b} \\times \\vec{a})$.\n   - Collinearity: $\\vec{a} \\parallel \\vec{b} \\iff \\vec{a} \\times \\vec{b} = \\vec{0}$.\n   - Lagrange's Identity: $|\\vec{a} \\times \\vec{b}|^2 = |\\vec{a}|^2 |\\vec{b}|^2 - (\\vec{a} \\cdot \\vec{b})^2$.\n   - Unit vector perpendicular to both $\\vec{a}$ and $\\vec{b}$: $\\hat{n} = \\pm \\frac{\\vec{a} \\times \\vec{b}}{|\\vec{a} \\times \\vec{b}|}$.",
        ncertPointers: [
          "Area of parallelogram with adjacent sides a and b is |a x b|; with diagonals d1 and d2 is 1/2 |d1 x d2|.",
        ],
      },
      {
        title: "Direction Cosines, Direction Ratios & Lines in 3D Space",
        content:
          "1. **Direction Cosines (DC) & Direction Ratios (DR)**:\n   - Let a directed line make angles $\\alpha, \\beta, \\gamma$ with positive coordinate axes.\n   - Direction cosines: $l = \\cos \\alpha, m = \\cos \\beta, n = \\cos \\gamma$.\n   - Fundamental Identity:\n     $$l^2 + m^2 + n^2 = 1 \\iff \\sin^2 \\alpha + \\sin^2 \\beta + \\sin^2 \\gamma = 2$$\n   - If numbers $a, b, c$ are proportional to $l, m, n$, then $a, b, c$ are direction ratios (DRs):\n     $$l = \\pm \\frac{a}{\\sqrt{a^2 + b^2 + c^2}}, \\quad m = \\pm \\frac{b}{\\sqrt{a^2 + b^2 + c^2}}, \\quad n = \\pm \\frac{c}{\\sqrt{a^2 + b^2 + c^2}}$$\n   - DRs of line joining $(x_1, y_1, z_1)$ and $(x_2, y_2, z_2)$ are $(x_2 - x_1, y_2 - y_1, z_2 - z_1)$.\n\n2. **Equations of a Straight Line in 3D Space**:\n   - Through point $A(\\vec{a})$ and parallel to vector $\\vec{b} = b_1 \\hat{i} + b_2 \\hat{j} + b_3 \\hat{k}$:\n     - Vector: $\\vec{r} = \\vec{a} + \\lambda \\vec{b}$\n     - Cartesian: $\\frac{x - x_1}{b_1} = \\frac{y - y_1}{b_2} = \\frac{z - z_1}{b_3}$\n   - Through two points $A(\\vec{a})$ and $B(\\vec{b})$:\n     - Vector: $\\vec{r} = \\vec{a} + \\lambda (\\vec{b} - \\vec{a})$\n     - Cartesian: $\\frac{x - x_1}{x_2 - x_1} = \\frac{y - y_1}{y_2 - y_1} = \\frac{z - z_1}{z_2 - z_1}$",
        ncertPointers: [
          "Angle theta between two lines with DRs (a1, b1, c1) and (a2, b2, c2): cos theta = |a1 a2 + b1 b2 + c1 c2| / (sqrt(sum a1^2) sqrt(sum a2^2)). Perpendicular if a1 a2 + b1 b2 + c1 c2 = 0.",
        ],
      },
      {
        title: "Skew Lines & Shortest Distance Derivation",
        content:
          "**Skew Lines** are lines in 3D space that are neither parallel nor intersecting (they lie in different planes).\n- Let Line 1: $\\vec{r} = \\vec{a}_1 + \\lambda \\vec{b}_1$ and Line 2: $\\vec{r} = \\vec{a}_2 + \\mu \\vec{b}_2$.\n- The vector perpendicular to both lines is $\\vec{b}_1 \\times \\vec{b}_2$.\n- The shortest distance vector is the projection of $(\\vec{a}_2 - \\vec{a}_1)$ onto $\\vec{b}_1 \\times \\vec{b}_2$:\n$$d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}$$\nIn Cartesian form, the numerator is the determinant:\n$$\\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix}$$\n\n**Condition for Two Lines to Intersect / Be Coplanar**:\n$$(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2) = 0 \\iff \\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix} = 0$$\n\n**Shortest Distance Between Parallel Lines** $\\vec{r} = \\vec{a}_1 + \\lambda \\vec{b}$ and $\\vec{r} = \\vec{a}_2 + \\mu \\vec{b}$:\n$$d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\times \\vec{b}|}{|\\vec{b}|}$$",
        ncertPointers: [
          "Always verify if b1 and b2 are scalar multiples of each other before choosing the formula! If b1 = k b2, use the PARALLEL lines formula (cross product), NOT skew lines.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Shortest Distance Between Skew Lines",
        formula: "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}",
        symbols: "\\vec{a}_1, \\vec{a}_2 = \\text{points on lines}; \\vec{b}_1, \\vec{b}_2 = \\text{direction vectors}",
        siUnits: "Distance in units",
        applicationCondition: "Non-parallel lines in space",
      },
      {
        name: "Area of Parallelogram with Diagonals",
        formula: "\\text{Area} = \\frac{1}{2} |\\vec{d}_1 \\times \\vec{d}_2|",
        symbols: "\\vec{d}_1, \\vec{d}_2 = \\text{diagonal vectors}",
        siUnits: "Square units",
        applicationCondition: "Parallelogram when diagonal vectors are given",
      },
      {
        name: "Direction Cosines Fundamental Identity",
        formula: "l^2 + m^2 + n^2 = 1 \\iff \\cos^2 \\alpha + \\cos^2 \\beta + \\cos^2 \\gamma = 1",
        symbols: "\\alpha, \\beta, \\gamma = \\text{angles made with x, y, z axes}",
        siUnits: "Dimensionless sum",
        applicationCondition: "Valid for all lines in 3D Euclidean space",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="250" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Shortest Distance Between Skew Lines in 3D</text>

  <!-- Line 1 in Plane 1 -->
  <line x1="100" y1="90" x2="660" y2="90" stroke="#38bdf8" strokeWidth="2.5"/>
  <circle cx="250" cy="90" r="5" fill="#38bdf8"/>
  <text x="250" y="75" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">A₁(a₁)</text>
  <text x="580" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10">Line 1: r = a₁ + λ b₁</text>

  <!-- Line 2 in Plane 2 -->
  <line x1="120" y1="190" x2="640" y2="170" stroke="#f43f5e" strokeWidth="2.5"/>
  <circle cx="480" cy="175" r="5" fill="#f43f5e"/>
  <text x="480" y="200" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">A₂(a₂)</text>
  <text x="580" y="160" textAnchor="middle" fill="#94a3b8" fontSize="10">Line 2: r = a₂ + μ b₂</text>

  <!-- Shortest Distance Segment (perpendicular to both) -->
  <line x1="380" y1="90" x2="380" y2="180" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 3"/>
  <circle cx="380" cy="90" r="4" fill="#22c55e"/>
  <circle cx="380" cy="180" r="4" fill="#22c55e"/>
  <text x="395" y="140" fill="#22c55e" fontSize="13" fontWeight="bold">d (Shortest Distance)</text>

  <!-- Normal Vector -->
  <line x1="380" y1="90" x2="380" y2="45" stroke="#facc15" strokeWidth="2"/>
  <text x="380" y="40" textAnchor="middle" fill="#facc15" fontSize="10" fontWeight="bold">n̂ ∥ (b₁ × b₂)</text>
</svg>`,
    workedExamples: [
      {
        id: "maths_u4_we1",
        questionNumber: 1,
        question:
          "Find the projection of the vector $\\vec{a} = 2\\hat{i} + 3\\hat{j} + 2\\hat{k}$ on the vector $\\vec{b} = \\hat{i} + 2\\hat{j} + \\hat{k}$.",
        options: [
          { id: "A", text: "5 / √6" },
          { id: "B", text: "10 / √6" },
          { id: "C", text: "5 / 3" },
          { id: "D", text: "10 / √17" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Formula for projection of $\\vec{a}$ on $\\vec{b}$ is $\\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}$.",
          "Step 2: Calculate $\\vec{a} \\cdot \\vec{b} = (2)(1) + (3)(2) + (2)(1) = 2 + 6 + 2 = 10$.",
          "Step 3: Calculate magnitude of $\\vec{b}$: $|\\vec{b}| = \\sqrt{1^2 + 2^2 + 1^2} = \\sqrt{1 + 4 + 1} = \\sqrt{6}$.",
          "Step 4: Projection $= \\frac{10}{\\sqrt{6}}$.",
        ],
        cuetTip: "Projection of vector a ON vector b divides by magnitude of b! If it asked projection of b ON a, you would divide by magnitude of a.",
      },
      {
        id: "maths_u4_we2",
        questionNumber: 2,
        question:
          "The area of a parallelogram whose diagonals are determined by vectors $\\vec{d}_1 = 3\\hat{i} + \\hat{j} - 2\\hat{k}$ and $\\vec{d}_2 = \\hat{i} - 3\\hat{j} + 4\\hat{k}$ is:",
        options: [
          { id: "A", text: "5√3 sq units" },
          { id: "B", text: "10√3 sq units" },
          { id: "C", text: "20√3 sq units" },
          { id: "D", text: "15 sq units" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Formula for area with DIAGONALS is $\\text{Area} = \\frac{1}{2} |\\vec{d}_1 \\times \\vec{d}_2|$.",
          "Step 2: Compute $\\vec{d}_1 \\times \\vec{d}_2 = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 3 & 1 & -2 \\\\ 1 & -3 & 4 \\end{vmatrix} = \\hat{i}(4 - 6) - \\hat{j}(12 - (-2)) + \\hat{k}(-9 - 1) = -2\\hat{i} - 14\\hat{j} - 10\\hat{k}$.",
          "Step 3: Compute magnitude: $|\\vec{d}_1 \\times \\vec{d}_2| = \\sqrt{(-2)^2 + (-14)^2 + (-10)^2} = \\sqrt{4 + 196 + 100} = \\sqrt{300} = 10\\sqrt{3}$.",
          "Step 4: Area $= \\frac{1}{2} (10\\sqrt{3}) = 5\\sqrt{3}$ sq units.",
        ],
        cuetTip: "Common trap: forgetting the 1/2 factor! 1/2 is required for diagonals. For adjacent sides, no 1/2 is used.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Angle between Vector and Axes",
        frequency: "Very High",
        pyqExample: {
          question:
            "If a line makes angles $\\alpha, \\beta, \\gamma$ with the positive direction of coordinate axes, then the value of $\\sin^2 \\alpha + \\sin^2 \\beta + \\sin^2 \\gamma$ is:",
          options: [
            { id: "A", text: "1" },
            { id: "B", text: "2" },
            { id: "C", text: "-1" },
            { id: "D", text: "3" },
          ],
          correctOption: "B",
          explanation: "$\\cos^2 \\alpha + \\cos^2 \\beta + \\cos^2 \\gamma = 1$. Using $\\sin^2 \\theta = 1 - \\cos^2 \\theta$: $(1 - \\cos^2 \\alpha) + (1 - \\cos^2 \\beta) + (1 - \\cos^2 \\gamma) = 3 - (\\cos^2 \\alpha + \\cos^2 \\beta + \\cos^2 \\gamma) = 3 - 1 = 2$.",
        },
        strategy: "Memorize: $\\cos^2$ sum is 1; $\\sin^2$ sum is 2. Instant 5 marks in CUET.",
      },
      {
        type: "Perpendicular Vectors with Unknown Parameter",
        frequency: "High",
        pyqExample: {
          question:
            "If the vectors $\\vec{a} = 2\\hat{i} - \\lambda \\hat{j} + \\hat{k}$ and $\\vec{b} = \\hat{i} + 2\\hat{j} + 3\\hat{k}$ are orthogonal, then $\\lambda$ is equal to:",
          options: [
            { id: "A", text: "5 / 2" },
            { id: "B", text: "-5 / 2" },
            { id: "C", text: "1" },
            { id: "D", text: "0" },
          ],
          correctOption: "A",
          explanation: "Orthogonal vectors satisfy $\\vec{a} \\cdot \\vec{b} = 0 \\implies (2)(1) + (-\\lambda)(2) + (1)(3) = 0 \\implies 2 - 2\\lambda + 3 = 0 \\implies 2\\lambda = 5 \\implies \\lambda = 5/2$.",
        },
        strategy: "Orthogonal means perpendicular: set dot product to 0 and solve for the unknown.",
      },
    ],
    commonTraps: [
      {
        misconception: "Using the skew lines formula for parallel lines.",
        whyWrong: "For parallel lines, $\\vec{b}_1 \\times \\vec{b}_2 = \\vec{0}$, which makes the denominator of the skew lines formula zero (division by zero).",
        correctUnderstanding: "Check if direction vectors are proportional first. If parallel, use $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\times \\vec{b}|}{|\\vec{b}|}$.",
      },
      {
        misconception: "Writing cross product as commutative (a x b = b x a).",
        whyWrong: "Vector cross product is strictly anti-commutative: $\\vec{a} \\times \\vec{b} = -(\\vec{b} \\times \\vec{a})$.",
        correctUnderstanding: "Reversing the order of vectors in a cross product flips the direction of the resulting vector by 180°.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Direction Cosines Sine vs Cosine Rule",
        mnemonic: "Cos is 1, Sin is 2.",
        rule: "$\\sum \\cos^2 = 1$; $\\sum \\sin^2 = 2$.",
        shortcut: "No need to write algebra; recall 1 for cos and 2 for sin.",
        whenToApply: "Direct recall questions on direction cosines.",
      },
      {
        title: "Perpendicular vs Parallel Vector Tests",
        mnemonic: "Dot = 0 for 90°. Cross = 0 for 0°.",
        rule: "Dot product is zero for perpendicular vectors. Cross product is zero for parallel vectors.",
        shortcut: "Need orthogonal? Compute dot. Need parallel? Compute cross.",
        whenToApply: "Geometric condition checking.",
      },
    ],
    quickRevisionCard: {
      title: "Vectors & 3D Geometry — Quick Card",
      bulletPoints: [
        "Dot product: $\\vec{a} \\cdot \\vec{b} = |a||b|\\cos \\theta$. Perpendicular if $\\vec{a} \\cdot \\vec{b} = 0$.",
        "Projection of $\\vec{a}$ on $\\vec{b}$: $\\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}$.",
        "Cross product: $\\vec{a} \\times \\vec{b} = -(\\vec{b} \\times \\vec{a})$. Parallel if $\\vec{a} \\times \\vec{b} = \\vec{0}$.",
        "Area of parallelogram: $|\\vec{a} \\times \\vec{b}|$ (sides); $\\frac{1}{2} |\\vec{d}_1 \\times \\vec{d}_2|$ (diagonals).",
        "Direction cosines: $l^2 + m^2 + n^2 = 1$; $\\sin^2 \\alpha + \\sin^2 \\beta + \\sin^2 \\gamma = 2$.",
        "Line through $\\vec{a}$ parallel to $\\vec{b}$: $\\vec{r} = \\vec{a} + \\lambda \\vec{b}$.",
        "Skew lines distance: $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}$.",
        "Parallel lines distance: $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\times \\vec{b}|}{|\\vec{b}|}$.",
        "Lines intersect if $(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2) = 0$.",
      ],
    },
    practiceQuestions: [
      {
        id: "maths_u4_q1",
        question: "If $|\vec{a}| = 3$, $|\vec{b}| = 4$, and $\vec{a} \cdot \vec{b} = 6$, then $|\vec{a} \times \vec{b}|$ is equal to:",
        type: "standard",
        options: [
          { id: "A", text: "6√3" },
          { id: "B", text: "12" },
          { id: "C", text: "6" },
          { id: "D", text: "3√3" },
        ],
        correctOption: "A",
        explanation: "By Lagrange's identity: $|\\vec{a} \\times \\vec{b}|^2 = |\\vec{a}|^2 |\\vec{b}|^2 - (\\vec{a} \\cdot \\vec{b})^2 = (3^2)(4^2) - 6^2 = (9)(16) - 36 = 144 - 36 = 108$. Therefore, $|\\vec{a} \\times \\vec{b}| = \\sqrt{108} = 6\\sqrt{3}$.",
        difficulty: "easy",
      },
      {
        id: "maths_u4_q2",
        question: "The distance of the point $(2, 3, 4)$ from the origin is:",
        type: "standard",
        options: [
          { id: "A", text: "√29" },
          { id: "B", text: "9" },
          { id: "C", text: "5" },
          { id: "D", text: "√20" },
        ],
        correctOption: "A",
        explanation: "$d = \\sqrt{2^2 + 3^2 + 4^2} = \\sqrt{4 + 9 + 16} = \\sqrt{29}$.",
        difficulty: "easy",
      },
      {
        id: "maths_u4_q3",
        question: "If a line has direction ratios $2, -1, -2$, then its direction cosines are:",
        type: "standard",
        options: [
          { id: "A", text: "2/3, -1/3, -2/3" },
          { id: "B", text: "2/9, -1/9, -2/9" },
          { id: "C", text: "2/√5, -1/√5, -2/√5" },
          { id: "D", text: "1/3, -2/3, 2/3" },
        ],
        correctOption: "A",
        explanation: "$\\sqrt{a^2 + b^2 + c^2} = \\sqrt{2^2 + (-1)^2 + (-2)^2} = \\sqrt{4 + 1 + 4} = 3$. Hence DCs are $2/3, -1/3, -2/3$.",
        difficulty: "easy",
      },
      {
        id: "maths_u4_q4",
        question: "The angle between two lines whose direction ratios are proportional to $(1, 2, 2)$ and $(2, -2, 1)$ is:",
        type: "standard",
        options: [
          { id: "A", text: "90° (π/2)" },
          { id: "B", text: "60° (π/3)" },
          { id: "C", text: "45° (π/4)" },
          { id: "D", text: "0°" },
        ],
        correctOption: "A",
        explanation: "Compute $a_1 a_2 + b_1 b_2 + c_1 c_2 = (1)(2) + (2)(-2) + (2)(1) = 2 - 4 + 2 = 0$. Since the dot product of direction ratios is 0, the lines are perpendicular ($\\theta = 90^\\circ$).",
        difficulty: "easy",
      },
      {
        id: "maths_u4_q5",
        question: "Assertion (A): The vectors $\vec{a} = \hat{i} + \hat{j} + \hat{k}$ and $\vec{b} = 2\hat{i} + 2\hat{j} + 2\hat{k}$ are collinear.\nReason (R): Two vectors $\vec{a}$ and $\vec{b}$ are collinear if $\vec{b} = \lambda \vec{a}$ for some non-zero scalar $\lambda$.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "Here $\vec{b} = 2\vec{a}$, where $\lambda = 2$. By definition, proportional vectors are collinear.",
        difficulty: "easy",
      },
      {
        id: "maths_u4_q6",
        question: "The shortest distance between the skew lines $\vec{r} = (\hat{i} + 2\hat{j} + \hat{k}) + \lambda(\hat{i} - \hat{j} + \hat{k})$ and $\vec{r} = (2\hat{i} - \hat{j} - \hat{k}) + \mu(2\hat{i} + \hat{j} + 2\hat{k})$ is:",
        type: "standard",
        options: [
          { id: "A", text: "3√2 / 2" },
          { id: "B", text: "√2" },
          { id: "C", text: "2√3" },
          { id: "D", text: "0" },
        ],
        correctOption: "A",
        explanation: "$\\vec{a}_2 - \\vec{a}_1 = \\hat{i} - 3\\hat{j} - 2\\hat{k}$. $\\vec{b}_1 \\times \\vec{b}_2 = \\det [i, j, k; 1, -1, 1; 2, 1, 2] = -3\\hat{i} - 0\\hat{j} + 3\\hat{k}$. $|\\vec{b}_1 \\times \\vec{b}_2| = \\sqrt{9 + 9} = 3\\sqrt{2}$. Numerator $= |(1)(-3) + (-3)(0) + (-2)(3)| = |-3 - 6| = 9$. Distance $= 9 / (3\\sqrt{2}) = 3 / \\sqrt{2} = 3\\sqrt{2} / 2$.",
        difficulty: "medium",
      },
      {
        id: "maths_u4_q7",
        question: "A unit vector perpendicular to both vectors $\vec{a} = 2\hat{i} + \hat{j} - \hat{k}$ and $\vec{b} = 3\hat{i} + 4\hat{j} - \hat{k}$ is:",
        type: "standard",
        options: [
          { id: "A", text: "(3i - j + 5k) / √35" },
          { id: "B", text: "(-3i + j + 5k) / √35" },
          { id: "C", text: "(3i - j + 5k) / 35" },
          { id: "D", text: "(i + j + k) / √3" },
        ],
        correctOption: "A",
        explanation: "$\\vec{a} \\times \\vec{b} = \\det [i, j, k; 2, 1, -1; 3, 4, -1] = 3\\hat{i} - \\hat{j} + 5\\hat{k}$. Magnitude $= \\sqrt{9 + 1 + 25} = \\sqrt{35}$. Unit vector $= \\frac{3\\hat{i} - \\hat{j} + 5\\hat{k}}{\\sqrt{35}}$.",
        difficulty: "easy",
      },
      {
        id: "maths_u4_q8",
        question: "The area of a triangle with vertices at $A(1, 1, 2)$, $B(2, 3, 5)$, and $C(1, 5, 5)$ is:",
        type: "standard",
        options: [
          { id: "A", text: "√61 / 2 sq units" },
          { id: "B", text: "√61 sq units" },
          { id: "C", text: "61 / 2 sq units" },
          { id: "D", text: "5 sq units" },
        ],
        correctOption: "A",
        explanation: "$\\vec{AB} = \\hat{i} + 2\\hat{j} + 3\\hat{k}$, $\\vec{AC} = 0\\hat{i} + 4\\hat{j} + 3\\hat{k}$. $\\vec{AB} \\times \\vec{AC} = -6\\hat{i} - 3\\hat{j} + 4\\hat{k}$. Magnitude $= \\sqrt{36 + 9 + 16} = \\sqrt{61}$. Area $= \\frac{1}{2} |\\vec{AB} \\times \\vec{AC}| = \\frac{\\sqrt{61}}{2}$ sq units.",
        difficulty: "medium",
      },
      {
        id: "maths_u4_q9",
        question: "If a line makes equal angles with the coordinate axes, then its direction cosines are:",
        type: "standard",
        options: [
          { id: "A", text: "± 1/√3, ± 1/√3, ± 1/√3" },
          { id: "B", text: "1, 1, 1" },
          { id: "C", text: "1/3, 1/3, 1/3" },
          { id: "D", text: "1/√2, 1/√2, 0" },
        ],
        correctOption: "A",
        explanation: "Let $\\alpha = \\beta = \\gamma \\implies l = m = n$. Since $l^2 + m^2 + n^2 = 1 \\implies 3l^2 = 1 \\implies l = \\pm 1/\\sqrt{3}$.",
        difficulty: "easy",
      },
      {
        id: "maths_u4_q10",
        question: "If $\vec{a}$ is a unit vector and $(\vec{x} - \vec{a}) \cdot (\vec{x} + \vec{a}) = 8$, then $|\vec{x}|$ is equal to:",
        type: "standard",
        options: [
          { id: "A", text: "3" },
          { id: "B", text: "8" },
          { id: "C", text: "9" },
          { id: "D", text: "√7" },
        ],
        correctOption: "A",
        explanation: "$(\\vec{x} - \\vec{a}) \\cdot (\\vec{x} + \\vec{a}) = |\\vec{x}|^2 - |\\vec{a}|^2 = 8$. Since $|\\vec{a}| = 1$ (unit vector), $|\\vec{x}|^2 - 1 = 8 \\implies |\\vec{x}|^2 = 9 \\implies |\\vec{x}| = 3$.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["maths_u3_t1"],
      relatedTopics: ["maths_u5_t1"],
      practiceTestId: "practice-maths-unit4-test1",
      practiceTestUrl: "/test/practice-maths-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=maths",
      weaknessRadarUrl: "/dashboard/radar?subject=maths",
    },
    subjectSpecific: {
      mathematics: {
        standardResults: [
          { result: "\\text{Shortest Distance Between Skew Lines} = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}", condition: "Non-parallel lines" },
          { result: "\\cos^2 \\alpha + \\cos^2 \\beta + \\cos^2 \\gamma = 1", condition: "Direction cosines" },
          { result: "\\text{Area of Parallelogram} = \\frac{1}{2}|\\vec{d}_1 \\times \\vec{d}_2|", condition: "Given diagonals d1 and d2" },
        ],
        graphProperties: [
          { curve: "Skew lines", keyPoints: "Non-coplanar, non-intersecting, non-parallel lines in 3-dimensional space" },
        ],
      },
    },
  },

  // Unit 5: Linear Programming
  {
    id: "maths_u5_t1",
    slug: "mathematical-formulation-graphical-method-of-solution-feasible-and-infeasible-regions",
    subject: "maths",
    subjectName: "Mathematics",
    subjectCode: "319",
    unitNumber: 5,
    unitTitle: "Linear Programming",
    topicTitle: "Mathematical Formulation, Graphical Method of Solution, Feasible and Infeasible Regions",
    ncertReference: {
      class: "Class 12",
      book: "Mathematics Part 2",
      chapterNumber: 5,
      chapterName: "Linear Programming",
      sections: [
        "12.1 Introduction to Linear Programming Problem (LPP)",
        "12.2 Mathematical Formulation of LPP (Objective Function & Constraints)",
        "12.3 Graphical Method of Solving LPP: Corner Point Theorem",
        "12.4 Bounded and Unbounded Feasible Regions",
        "12.5 Multiple Optimal Solutions and Infeasible Problems",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (3-4 questions per shift)",
      totalPyqsInRepo: 140,
      weightagePercentage: 8.0,
    },
    summary30Seconds: [
      "Components of LPP: Objective function $Z = ax + by$ (to maximize or minimize), Subject to linear constraints (inequalities) and non-negative constraints ($x \\ge 0, y \\ge 0$).",
      "Feasible region: The common region determined by all constraints including non-negativity. A feasible region is ALWAYS a CONVEX set.",
      "Corner Point Theorem: The optimal value (maximum or minimum) of $Z$, if it exists, occurs at one of the **corner points (vertices)** of the feasible region.",
      "Bounded region: Maximum and minimum values of $Z$ both exist unconditionally at corner points.",
      "Unbounded region: $M$ is the maximum value of $Z$ if and only if the open half-plane $ax + by > M$ has NO common point with the feasible region. Otherwise, $Z$ has no maximum.",
      "Multiple optimal solutions: If the objective function line $ax + by = k$ is parallel to a boundary line segment connecting two optimal corner points, then EVERY point on that line segment is also an optimal solution.",
      "Infeasible problem: When there is no common region satisfying all constraints simultaneously.",
    ],
    coreConcepts: [
      {
        title: "Mathematical Formulation & The Corner Point Theorem",
        content:
          "A Linear Programming Problem (LPP) deals with optimizing (maximizing or minimizing) a linear objective function subject to linear constraints.\n- **General Formulation**:\n  $$\\text{Optimize } Z = ax + by$$\n  $$\\text{Subject to: } a_1 x + b_1 y \\le c_1, \\quad a_2 x + b_2 y \\ge c_2, \\quad x \\ge 0, \\; y \\ge 0$$\n\n**Fundamental Theorems of LPP**:\n- **Theorem 1**: Let $R$ be the feasible region for an LPP and let $Z = ax + by$ be the objective function. When $R$ is bounded, the objective function $Z$ has both a maximum and a minimum value on $R$ and each of these occurs at a **corner point (vertex)** of $R$.\n- **Theorem 2**: Let $R$ be the feasible region for an LPP and let $Z = ax + by$ be the objective function. If $R$ is unbounded, then a maximum or minimum value of the objective function may or may not exist. However, if it exists, it must occur at a corner point of $R$.\n\n**Convexity of Feasible Region**:\n- The feasible region of any LPP is always a **convex polygon** (a set where the line segment joining any two points in the region lies entirely within the region).",
        ncertPointers: [
          "Non-negative constraints x >= 0, y >= 0 restrict the feasible region strictly to the FIRST quadrant.",
        ],
      },
      {
        title: "Solving Bounded vs Unbounded Feasible Regions",
        content:
          "**1. Bounded Feasible Region Protocol**:\n- Step 1: Graph all linear inequality boundary lines.\n- Step 2: Shade the common intersection area in the first quadrant to determine the feasible polygon.\n- Step 3: Find the coordinates of all corner points $(x_i, y_i)$.\n- Step 4: Evaluate $Z = ax + by$ at each corner point. The highest number is the absolute maximum; the lowest is the absolute minimum.\n\n**2. Unbounded Feasible Region Protocol**:\n- Evaluate $Z$ at all corner points to identify candidate optimal value $M$ (for max) or $m$ (for min).\n- **Verification Test for Maximum ($M$)**:\n  - Graph the open half-plane $ax + by > M$.\n  - If the open half-plane has **NO common point** with the feasible region, then $M$ is the true maximum value.\n  - If the open half-plane has any common points with the feasible region, then $Z$ has **NO MAXIMUM VALUE** (it can increase indefinitely).\n- **Verification Test for Minimum ($m$)**:\n  - Graph the open half-plane $ax + by < m$.\n  - If it shares no common point with the feasible region, $m$ is the true minimum. Otherwise, no minimum exists.",
        ncertPointers: [
          "In CUET, questions on unbounded regions test whether the open half plane has points in common with the feasible region.",
        ],
      },
      {
        title: "Multiple Optimal Solutions, Redundant Constraints & Infeasibility",
        content:
          "1. **Multiple Optimal Solutions (Infinite Solutions)**:\n   - Occurs when the maximum (or minimum) value of $Z$ is achieved at **two adjacent corner points**, say $P(x_1, y_1)$ and $Q(x_2, y_2)$.\n   - In this case, the objective function line $ax + by = k$ is parallel to the boundary edge joining $P$ and $Q$.\n   - **Consequence**: Every single point on the line segment connecting $P$ and $Q$ gives the same maximum (or minimum) value of $Z$, resulting in infinitely many optimal solutions.\n\n2. **Infeasible LPP**:\n   - When the constraints contradict each other (e.g., $x + y \\le 1$ and $x + y \\ge 3$ with $x, y \\ge 0$).\n   - There is no point that satisfies all constraints simultaneously; the feasible region is empty ($\\Phi$).\n\n3. **Redundant Constraints**:\n   - A constraint that does not affect the feasible region (its removal leaves the feasible polygon unchanged).",
        ncertPointers: [
          "If an objective function attains its maximum value at (2, 3) and (4, 1), it also attains the maximum at (3, 2), which is the midpoint of the segment.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Corner Point Optimal Table",
        formula: "Z_{\\text{max}} = \\max_{(x_i, y_i) \\in \\text{Vertices}} \\{a x_i + b y_i\\}",
        symbols: "(x_i, y_i) = \\text{coordinates of corner vertices}",
        siUnits: "Scalar objective value",
        applicationCondition: "Bounded convex feasible regions",
      },
      {
        name: "Unbounded Region Open Half-Plane Test",
        formula: "\\{ (x, y) : a x + b y > M \\} \\cap R_{\\text{feasible}} = \\emptyset",
        symbols: "M = \\text{candidate maximum value}",
        siUnits: "Set intersection condition",
        applicationCondition: "Verification of optimality in unbounded regions",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="250" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">LPP Feasible Region & Corner Point Evaluation</text>

  <!-- Left: Feasible Polygon Graph -->
  <g transform="translate(60, 50)">
    <!-- Axes -->
    <line x1="20" y1="160" x2="260" y2="160" stroke="#64748b" strokeWidth="2"/>
    <line x1="20" y1="160" x2="20" y2="20" stroke="#64748b" strokeWidth="2"/>
    <text x="260" y="175" fill="#94a3b8" fontSize="10">x</text>
    <text x="10" y="25" fill="#94a3b8" fontSize="10">y</text>

    <!-- Feasible Polygon -->
    <polygon points="20,160 180,160 140,80 20,60" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" strokeWidth="2"/>
    <circle cx="20" cy="160" r="4" fill="#38bdf8"/>
    <text x="35" y="155" fill="#f8fafc" fontSize="9">O(0, 0)</text>

    <circle cx="180" cy="160" r="4" fill="#38bdf8"/>
    <text x="180" y="175" fill="#f8fafc" fontSize="9">A(6, 0)</text>

    <circle cx="140" cy="80" r="5" fill="#facc15"/>
    <text x="140" y="70" fill="#facc15" fontSize="10" fontWeight="bold">B(4, 3) Max!</text>

    <circle cx="20" cy="60" r="4" fill="#38bdf8"/>
    <text x="35" y="60" fill="#f8fafc" fontSize="9">C(0, 4)</text>
  </g>

  <!-- Right: Evaluation Table Summary -->
  <g transform="translate(380, 50)">
    <rect width="320" height="170" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1"/>
    <text x="160" y="24" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Corner Point Table (Z = 3x + 2y)</text>
    <line x1="20" y1="35" x2="300" y2="35" stroke="#475569" strokeWidth="1"/>
    <text x="70" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Corner Point</text>
    <text x="220" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Z = 3x + 2y</text>
    <text x="70" y="80" textAnchor="middle" fill="#f8fafc" fontSize="11">(0, 0)</text>
    <text x="220" y="80" textAnchor="middle" fill="#f8fafc" fontSize="11">0 (Min)</text>
    <text x="70" y="105" textAnchor="middle" fill="#f8fafc" fontSize="11">(6, 0)</text>
    <text x="220" y="105" textAnchor="middle" fill="#f8fafc" fontSize="11">18</text>
    <text x="70" y="130" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">(4, 3)</text>
    <text x="220" y="130" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">18 + 0? No, 12 + 6 = 18</text>
    <text x="70" y="155" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Multiple Opt: Segment AB</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "maths_u5_we1",
        questionNumber: 1,
        question:
          "The corner points of the feasible region determined by a system of linear constraints are $(0, 0)$, $(0, 40)$, $(20, 40)$, $(60, 20)$, and $(60, 0)$. The objective function is $Z = 4x + 3y$. The maximum value of $Z$ is:",
        options: [
          { id: "A", text: "120" },
          { id: "B", text: "200" },
          { id: "C", text: "300" },
          { id: "D", text: "240" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Evaluate $Z = 4x + 3y$ at each corner point:",
          "At $(0, 0)$: $Z = 4(0) + 3(0) = 0$",
          "At $(0, 40)$: $Z = 4(0) + 3(40) = 120$",
          "At $(20, 40)$: $Z = 4(20) + 3(40) = 80 + 120 = 200$",
          "At $(60, 20)$: $Z = 4(60) + 3(20) = 240 + 60 = 300$",
          "At $(60, 0)$: $Z = 4(60) + 3(0) = 240$",
          "Step 2: Comparing all values: $0, 120, 200, 300, 240$. The maximum value is $300$, achieved at vertex $(60, 20)$.",
        ],
        cuetTip: "Always calculate Z systematically in a list! It takes less than 30 seconds to plug in coordinates.",
      },
      {
        id: "maths_u5_we2",
        questionNumber: 2,
        question:
          "If the objective function $Z = ax + by$ has the same maximum value at two corner points $(2, 4)$ and $(6, 2)$, then the relation between $a$ and $b$ is:",
        options: [
          { id: "A", text: "2a = b" },
          { id: "B", text: "a = 2b" },
          { id: "C", text: "a = b" },
          { id: "D", text: "4a = b" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Since $Z$ attains the same value at both points, $Z(2, 4) = Z(6, 2)$.",
          "Step 2: Substitute $(2, 4)$: $Z = a(2) + b(4) = 2a + 4b$.",
          "Step 3: Substitute $(6, 2)$: $Z = a(6) + b(2) = 6a + 2b$.",
          "Step 4: Equate both: $2a + 4b = 6a + 2b \\implies 4b - 2b = 6a - 2a \\implies 2b = 4a \\implies b = 2a \\iff 2a = b$.",
        ],
        cuetTip: "Equate $Z_1 = Z_2$ and rearrange terms. This is a very common 2-step question in CUET.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Multiple Optimal Solutions Condition",
        frequency: "Very High",
        pyqExample: {
          question:
            "If an LPP has an optimal solution at two distinct corner points of the bounded feasible region, then the number of optimal solutions is:",
          options: [
            { id: "A", text: "Exactly 2" },
            { id: "B", text: "Finite but more than 2" },
            { id: "C", text: "Infinitely many" },
            { id: "D", text: "None" },
          ],
          correctOption: "C",
          explanation: "Every point on the line segment joining the two optimal corner points gives the exact same optimal value, resulting in infinitely many solutions.",
        },
        strategy: "Two optimal vertices $\\implies$ entire segment is optimal $\\implies$ infinitely many solutions.",
      },
      {
        type: "Convex Set Definition Question",
        frequency: "High",
        pyqExample: {
          question:
            "The feasible region of a linear programming problem is always a:",
          options: [
            { id: "A", text: "Convex set" },
            { id: "B", text: "Concave set" },
            { id: "C", text: "Circle" },
            { id: "D", text: "Open interval" },
          ],
          correctOption: "A",
          explanation: "The intersection of any number of half-planes (which are convex sets) is always a convex set.",
        },
        strategy: "Direct NCERT theorem: The feasible region of an LPP is ALWAYS a convex set.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming the maximum of an unbounded region is simply the largest corner point value.",
        whyWrong: "In an unbounded region, the objective function can potentially grow without bound towards infinity.",
        correctUnderstanding: "You must verify that the open half-plane $ax + by > M$ has NO common points with the feasible region before declaring $M$ as the maximum.",
      },
      {
        misconception: "Forgetting the non-negative constraints x >= 0, y >= 0.",
        whyWrong: "Leaving out $x \\ge 0, y \\ge 0$ allows negative values, distorting the feasible region across other quadrants.",
        correctUnderstanding: "All practical LPPs require non-negativity, confining the feasible polygon strictly to Quadrant I.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Corner Point Theorem Mnemonic",
        mnemonic: "Corners Count: The Best is on the Edge.",
        rule: "You never need to check internal points. Optimal values occur ONLY at corner vertices.",
        shortcut: "Find intersections of boundary lines, plug into Z.",
        whenToApply: "Solving any bounded LPP.",
      },
      {
        title: "Multiple Optimal Solution Test",
        mnemonic: "Two Winners = Infinite Party.",
        rule: "If two vertices tie for max/min, the whole segment is tied.",
        shortcut: "Immediately mark 'infinitely many solutions'.",
        whenToApply: "Multiple choice questions on LPP solution count.",
      },
    ],
    quickRevisionCard: {
      title: "Linear Programming — Quick Revision Card",
      bulletPoints: [
        "Objective function: $Z = ax + by$ (linear). Constraints: Linear inequalities.",
        "Feasible region: Intersection of all constraints + non-negativity ($x, y \\ge 0$).",
        "Convexity: Feasible region is ALWAYS a convex set.",
        "Corner point theorem: Optimal value occurs at one of the corner vertices.",
        "Bounded region: Max and Min both guaranteed to exist.",
        "Unbounded region: $M$ is max iff open half-plane $ax + by > M$ shares NO points with feasible region.",
        "Two optimal corner points: Infinitely many optimal solutions along connecting line segment.",
        "Infeasible: No common region satisfying all constraints.",
        "Redundant constraint: Removing it does not change the feasible region.",
      ],
    },
    practiceQuestions: [
      {
        id: "maths_u5_q1",
        question: "In an LPP, the objective function is:",
        type: "standard",
        options: [
          { id: "A", text: "A linear function to be optimized" },
          { id: "B", text: "A quadratic inequality" },
          { id: "C", text: "A constant number" },
          { id: "D", text: "An equality constraint" },
        ],
        correctOption: "A",
        explanation: "By definition, the objective function in an LPP is a linear function $Z = ax + by$ that is to be maximized or minimized.",
        difficulty: "easy",
      },
      {
        id: "maths_u5_q2",
        question: "The corner points of a feasible region are $(0, 2)$, $(3, 0)$, $(6, 0)$, $(6, 8)$, and $(0, 5)$. If $Z = 4x + 6y$, the minimum value of $Z$ is:",
        type: "standard",
        options: [
          { id: "A", text: "12" },
          { id: "B", text: "24" },
          { id: "C", text: "30" },
          { id: "D", text: "72" },
        ],
        correctOption: "A",
        explanation: "Evaluate Z: At $(0, 2): 4(0) + 6(2) = 12$; at $(3, 0): 4(3) + 6(0) = 12$; at $(6, 0): 24$; at $(6, 8): 72$; at $(0, 5): 30$. The minimum value is 12 (achieved at $(0, 2)$ and $(3, 0)$).",
        difficulty: "easy",
      },
      {
        id: "maths_u5_q3",
        question: "Assertion (A): An LPP can have infinitely many optimal solutions.\nReason (R): If the objective function line is parallel to a boundary line segment connecting two optimal corner points, every point on that segment is optimal.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "When two corner points produce the exact same optimal value, the objective line coincides with that boundary segment, making every point on that line segment an optimal solution.",
        difficulty: "easy",
      },
      {
        id: "maths_u5_q4",
        question: "Which of the following sets is NOT a convex set?",
        type: "standard",
        options: [
          { id: "A", text: "{(x, y) : x² + y² ≤ 4}" },
          { id: "B", text: "{(x, y) : 2x + 3y ≤ 6, x ≥ 0, y ≥ 0}" },
          { id: "C", text: "{(x, y) : x² + y² ≥ 4}" },
          { id: "D", text: "{(x, y) : |x| ≤ 1, |y| ≤ 1}" },
        ],
        correctOption: "C",
        explanation: "$x^2 + y^2 \\ge 4$ represents the region outside a circle. A line segment connecting $(0, 3)$ and $(0, -3)$ passes through the origin $(0, 0)$, which is NOT in the set; hence it is not convex.",
        difficulty: "medium",
      },
      {
        id: "maths_u5_q5",
        question: "If a linear programming problem has constraints $x + y \\le 1$, $x \\ge 0$, $y \\ge 0$, and $x + y \\ge 3$, then the feasible region is:",
        type: "standard",
        options: [
          { id: "A", text: "Bounded" },
          { id: "B", text: "Unbounded" },
          { id: "C", text: "Empty (Infeasible)" },
          { id: "D", text: "A triangle" },
        ],
        correctOption: "C",
        explanation: "$x + y \\le 1$ and $x + y \\ge 3$ cannot be satisfied simultaneously for non-negative $x, y$. There is no common region; the problem is infeasible.",
        difficulty: "easy",
      },
      {
        id: "maths_u5_q6",
        question: "The maximum value of $Z = x + 3y$ subject to $2x + y \\le 20$, $x + 2y \\le 20$, $x, y \\ge 0$ is:",
        type: "standard",
        options: [
          { id: "A", text: "30" },
          { id: "B", text: "10" },
          { id: "C", text: "20" },
          { id: "D", text: "40" },
        ],
        correctOption: "A",
        explanation: "Corner points of the region are $(0, 0)$, $(10, 0)$, $(20/3, 20/3)$, and $(0, 10)$. Evaluating $Z = x + 3y$: at $(0, 10)$, $Z = 0 + 3(10) = 30$. At $(20/3, 20/3)$, $Z = 20/3 + 60/3 = 80/3 = 26.67$. Maximum value is 30.",
        difficulty: "medium",
      },
      {
        id: "maths_u5_q7",
        question: "The non-negativity conditions $x \\ge 0, y \\ge 0$ imply that the feasible region lies in:",
        type: "standard",
        options: [
          { id: "A", text: "First quadrant only" },
          { id: "B", text: "First and second quadrants" },
          { id: "C", text: "All four quadrants" },
          { id: "D", text: "Fourth quadrant" },
        ],
        correctOption: "A",
        explanation: "$x \\ge 0$ and $y \\ge 0$ restricts the coordinates strictly to the positive x and y directions, which is Quadrant I.",
        difficulty: "easy",
      },
      {
        id: "maths_u5_q8",
        question: "If an unbounded feasible region has a candidate minimum $m$ at a corner point, $m$ is the actual minimum if:",
        type: "standard",
        options: [
          { id: "A", text: "The open half-plane ax + by < m has no points in common with the feasible region" },
          { id: "B", text: "The open half-plane ax + by > m has no points in common with the feasible region" },
          { id: "C", text: "The line ax + by = m passes through the origin" },
          { id: "D", text: "The region is bounded" },
        ],
        correctOption: "A",
        explanation: "If $ax + by < m$ shares no points with the feasible region, no point can produce a value smaller than $m$, confirming $m$ as the true minimum.",
        difficulty: "medium",
      },
      {
        id: "maths_u5_q9",
        question: "In an LPP, the constraints are always:",
        type: "standard",
        options: [
          { id: "A", text: "Linear inequalities or equations" },
          { id: "B", text: "Quadratic equations" },
          { id: "C", text: "Exponential relations" },
          { id: "D", text: "Trigonometric inequalities" },
        ],
        correctOption: "A",
        explanation: "Linear programming strictly requires all constraints to be linear relationships (inequalities $\\le, \\ge$ or equations $=$).",
        difficulty: "easy",
      },
      {
        id: "maths_u5_q10",
        question: "A linear programming problem whose objective function can increase without bound has:",
        type: "standard",
        options: [
          { id: "A", text: "An unbounded solution (no maximum)" },
          { id: "B", text: "A unique solution" },
          { id: "C", text: "An infeasible solution" },
          { id: "D", text: "Multiple optimal solutions" },
        ],
        correctOption: "A",
        explanation: "When $Z$ can become arbitrarily large inside an unbounded feasible region, no finite maximum exists; the problem has an unbounded solution.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["maths_u2_t1"],
      relatedTopics: ["maths_u6_t1"],
      practiceTestId: "practice-maths-unit5-test1",
      practiceTestUrl: "/test/practice-maths-unit5-test1",
      weaknessReportUrl: "/dashboard/radar?subject=maths",
      weaknessRadarUrl: "/dashboard/radar?subject=maths",
    },
    subjectSpecific: {
      mathematics: {
        standardResults: [
          { result: "\\text{Corner Point Theorem}", condition: "Optimal value occurs at extreme points of convex feasible polygon" },
          { result: "\\text{Multiple Solutions Condition}", condition: "Z is parallel to a boundary line segment connecting two optimal vertices" },
        ],
        graphProperties: [
          { curve: "Feasible Region", keyPoints: "Convex polygon, vertices are corner points, bounded by linear constraint half-planes" },
        ],
      },
    },
  },

  // Unit 6: Probability
  {
    id: "maths_u6_t1",
    slug: "conditional-probability-multiplication-theorem-bayes-theorem-random-variables-and-distributions",
    subject: "maths",
    subjectName: "Mathematics",
    subjectCode: "319",
    unitNumber: 6,
    unitTitle: "Probability",
    topicTitle: "Conditional Probability, Multiplication Theorem, Bayes' Theorem, Random Variables and Distributions",
    ncertReference: {
      class: "Class 12",
      book: "Mathematics Part 2",
      chapterNumber: 6,
      chapterName: "Probability",
      sections: [
        "13.1 Conditional Probability: Definition & Properties",
        "13.2 Multiplication Theorem on Probability & Independent Events",
        "13.3 Bayes' Theorem and Law of Total Probability",
        "13.4 Random Variables and their Probability Distributions",
        "13.5 Mean (Expectation) and Variance of a Random Variable",
        "13.6 Bernoulli Trials and Binomial Distribution",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (5-6 questions per shift)",
      totalPyqsInRepo: 260,
      weightagePercentage: 12.0,
    },
    summary30Seconds: [
      "Conditional probability: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ where $P(B) > 0$. If $A$ and $B$ are independent, $P(A|B) = P(A)$.",
      "Independent events: $P(A \\cap B) = P(A) \\cdot P(B)$. If $A$ and $B$ are independent, then $A'$ and $B'$, $A$ and $B'$, and $A'$ and $B$ are also mutually independent.",
      "Law of Total Probability: For a partition $\\{E_1, E_2, \\dots, E_n\\}$, $P(A) = \\sum_{i=1}^n P(E_i) P(A|E_i)$.",
      "Bayes' Theorem: Calculates posterior probability: $P(E_i|A) = \\frac{P(E_i) P(A|E_i)}{\\sum_{j=1}^n P(E_j) P(A|E_j)}$.",
      "Probability distribution: $\\sum p_i = 1$. Mean (Expected Value) $E(X) = \\mu = \\sum x_i p_i$. Variance $\\text{Var}(X) = \\sigma^2 = E(X^2) - [E(X)]^2 = \\sum x_i^2 p_i - \\mu^2$. Standard deviation $\\sigma = \\sqrt{\\text{Var}(X)}$.",
      "Binomial Distribution: $P(X = r) = ^n C_r p^r q^{n-r}$ where $p + q = 1$. Mean $= np$, Variance $= npq$. Note that $\\text{Variance} < \\text{Mean}$ for any binomial distribution.",
    ],
    coreConcepts: [
      {
        title: "Conditional Probability & Independent Events",
        content:
          "1. **Conditional Probability**:\n   The probability of occurrence of event $A$, given that event $B$ has already occurred:\n   $$P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) \\ne 0$$\n   - Properties:\n     - $P(S|B) = 1$, $P(B|B) = 1$\n     - $P(A'|B) = 1 - P(A|B)$\n     - $P((A \\cup B)|E) = P(A|E) + P(B|E) - P((A \\cap B)|E)$\n\n2. **Multiplication Theorem**:\n   $$P(A \\cap B) = P(A) \\cdot P(B|A) = P(B) \\cdot P(A|B)$$\n\n3. **Independent Events**:\n   Two events $A$ and $B$ are independent if the occurrence of one does not affect the probability of the other:\n   $$P(A \\cap B) = P(A) \\cdot P(B)$$\n   - **Difference between Independent & Mutually Exclusive Events**:\n     - Mutually exclusive means $A \\cap B = \\emptyset \\implies P(A \\cap B) = 0$.\n     - Independent means $P(A \\cap B) = P(A) P(B) \\ne 0$ (for non-zero probability events). Two non-empty events cannot be simultaneously mutually exclusive and independent!\n   - **Important Independence Theorem**: If $A$ and $B$ are independent, then:\n     1. $A$ and $B'$ are independent: $P(A \\cap B') = P(A) P(B')$\n     2. $A'$ and $B$ are independent\n     3. $A'$ and $B'$ are independent: $P(A' \\cap B') = P(A') P(B') = [1 - P(A)][1 - P(B)]$",
        ncertPointers: [
          "Probability of at least one of independent events A and B occurring: P(A U B) = 1 - P(A') P(B') = 1 - [1 - P(A)][1 - P(B)].",
        ],
      },
      {
        title: "Bayes' Theorem & The Law of Total Probability",
        content:
          "Let $\\{E_1, E_2, \\dots, E_n\\}$ form a partition of the sample space $S$ ($E_i \\cap E_j = \\emptyset$ for $i \\ne j$, $\\bigcup_{i=1}^n E_i = S$, and $P(E_i) > 0$).\n\n1. **Law of Total Probability**:\n   For any event $A$ associated with $S$:\n   $$P(A) = P(E_1) P(A|E_1) + P(E_2) P(A|E_2) + \\dots + P(E_n) P(A|E_n) = \\sum_{i=1}^n P(E_i) P(A|E_i)$$\n\n2. **Bayes' Theorem**:\n   If event $A$ has occurred, the conditional probability that it was caused by event $E_i$ (posterior probability) is:\n   $$P(E_i|A) = \\frac{P(E_i) P(A|E_i)}{\\sum_{j=1}^n P(E_j) P(A|E_j)}$$\n   - $P(E_i)$: Prior probability of hypothesis $E_i$.\n   - $P(A|E_i)$: Likelihood of observing event $A$ given $E_i$.\n   - $P(E_i|A)$: Posterior probability of $E_i$ given evidence $A$.",
        ncertPointers: [
          "Bag and Ball problems, Disease diagnostic tests, and Factory defect questions in CUET are direct applications of Bayes' Theorem.",
        ],
      },
      {
        title: "Random Variables, Variance & The Binomial Distribution",
        content:
          "1. **Random Variable ($X$)**:\n   A real-valued function whose domain is the sample space $S$.\n   - Probability Distribution: Pairs $(x_i, p_i)$ such that $p_i \\ge 0$ and $\\sum_{i=1}^n p_i = 1$.\n   - **Mean / Expectation**: $\\mu = E(X) = \\sum_{i=1}^n x_i p_i$.\n   - **Variance**: $\\text{Var}(X) = \\sigma^2 = E(X^2) - [E(X)]^2 = \\sum_{i=1}^n x_i^2 p_i - \\mu^2$.\n   - **Standard Deviation**: $\\sigma = \\sqrt{\\text{Var}(X)}$.\n\n2. **Binomial Distribution $B(n, p)$**:\n   Applies to $n$ independent Bernoulli trials (each trial has only two outcomes: Success with probability $p$, Failure with probability $q = 1 - p$):\n   $$P(X = r) = ^n C_r p^r q^{n - r}, \\quad r = 0, 1, 2, \\dots, n$$\n   - **Mean**: $E(X) = n p$\n   - **Variance**: $\\text{Var}(X) = n p q$\n   - **Crucial Inequality**: Since $0 < q < 1$, $npq < np$, which means **$\\text{Variance} < \\text{Mean}$** always holds.",
        ncertPointers: [
          "If a problem states Mean = 4 and Variance = 6 for a binomial distribution, the data is IMPOSSIBLE because variance must be strictly less than mean.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Bayes' Theorem Formula",
        formula: "P(E_i|A) = \\frac{P(E_i) P(A|E_i)}{\\sum_{j=1}^n P(E_j) P(A|E_j)}",
        symbols: "E_i = \\text{partition events}, A = \\text{observed evidence event}",
        siUnits: "Probability (0 to 1)",
        applicationCondition: "Inverting conditional probability with mutually exclusive partition",
      },
      {
        name: "Binomial Mean and Variance",
        formula: "\\text{Mean } \\mu = n p, \\quad \\text{Variance } \\sigma^2 = n p q",
        symbols: "n = \\text{trials}, p = \\text{success probability}, q = 1 - p",
        siUnits: "Moments of distribution",
        applicationCondition: "Bernoulli trials with independent constant probability",
      },
      {
        name: "Random Variable Variance",
        formula: "\\text{Var}(X) = E(X^2) - [E(X)]^2 = \\sum x_i^2 p_i - \\left(\\sum x_i p_i\\right)^2",
        symbols: "x_i = \\text{values of random variable}, p_i = \\text{probabilities}",
        siUnits: "Variance units",
        applicationCondition: "Discrete probability distributions",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="250" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Bayes' Theorem Tree Diagram Architecture</text>

  <!-- Root: Sample Space -->
  <circle cx="120" cy="130" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="2"/>
  <text x="120" y="135" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Start</text>

  <!-- Path 1: E1 -->
  <line x1="148" y1="120" x2="280" y2="80" stroke="#64748b" strokeWidth="2"/>
  <text x="210" y="90" fill="#94a3b8" fontSize="10">P(E₁)</text>
  <circle cx="295" cy="80" r="18" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5"/>
  <text x="295" y="84" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">E₁</text>

  <!-- Branch E1 -> A -->
  <line x1="313" y1="80" x2="450" y2="80" stroke="#22c55e" strokeWidth="2"/>
  <text x="380" y="73" fill="#86efac" fontSize="9">P(A|E₁)</text>
  <rect x="450" y="65" width="240" height="30" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="1"/>
  <text x="570" y="84" textAnchor="middle" fill="#86efac" fontSize="10">P(E₁) · P(A|E₁) (Branch 1)</text>

  <!-- Path 2: E2 -->
  <line x1="148" y1="140" x2="280" y2="180" stroke="#64748b" strokeWidth="2"/>
  <text x="210" y="175" fill="#94a3b8" fontSize="10">P(E₂)</text>
  <circle cx="295" cy="180" r="18" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5"/>
  <text x="295" y="184" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">E₂</text>

  <!-- Branch E2 -> A -->
  <line x1="313" y1="180" x2="450" y2="180" stroke="#f43f5e" strokeWidth="2"/>
  <text x="380" y="173" fill="#fca5a5" fontSize="9">P(A|E₂)</text>
  <rect x="450" y="165" width="240" height="30" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1"/>
  <text x="570" y="184" textAnchor="middle" fill="#fca5a5" fontSize="10">P(E₂) · P(A|E₂) (Branch 2)</text>

  <text x="380" y="230" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">P(E₁|A) = Branch 1 / [Branch 1 + Branch 2]</text>
</svg>`,
    workedExamples: [
      {
        id: "maths_u6_we1",
        questionNumber: 1,
        question:
          "Bag I contains 3 red and 4 black balls, while Bag II contains 5 red and 6 black balls. One ball is drawn at random from one of the bags and it is found to be red. Find the probability that it was drawn from Bag II.",
        options: [
          { id: "A", text: "35 / 68" },
          { id: "B", text: "33 / 68" },
          { id: "C", text: "5 / 11" },
          { id: "D", text: "12 / 68" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Let $E_1$ = Bag I is chosen, $E_2$ = Bag II is chosen. $P(E_1) = P(E_2) = 1/2$.",
          "Step 2: Let $A$ = Drawn ball is red.",
          "Step 3: Likelihoods: $P(A|E_1) = 3/7$ and $P(A|E_2) = 5/11$.",
          "Step 4: Total probability of red: $P(A) = P(E_1) P(A|E_1) + P(E_2) P(A|E_2) = \\frac{1}{2} \\left(\\frac{3}{7}\\right) + \\frac{1}{2} \\left(\\frac{5}{11}\\right) = \\frac{1}{2} \\left(\\frac{33 + 35}{77}\\right) = \\frac{68}{154} = \\frac{34}{77}$.",
          "Step 5: Apply Bayes' Theorem: $P(E_2|A) = \\frac{P(E_2) P(A|E_2)}{P(A)} = \\frac{\\frac{1}{2} \\times \\frac{5}{11}}{\\frac{1}{2} \\times \\frac{68}{77}} = \\frac{5/11}{68/77} = \\frac{5}{11} \\times \\frac{77}{68} = \\frac{35}{68}$.",
        ],
        cuetTip: "Notice the cross-multiplication in numerator: $5 \\times 7 = 35$ and $3 \\times 11 = 33$. Denominator is $35 + 33 = 68$. Thus $P(E_2|A) = 35/68$ in 10 seconds!",
      },
      {
        id: "maths_u6_we2",
        questionNumber: 2,
        question:
          "For a random variable $X$, the probability distribution is given by: $P(X = 0) = k$, $P(X = 1) = 2k$, $P(X = 2) = 3k$. Find the value of $k$ and the expected value $E(X)$.",
        options: [
          { id: "A", text: "k = 1/6, E(X) = 4/3" },
          { id: "B", text: "k = 1/6, E(X) = 1" },
          { id: "C", text: "k = 1/3, E(X) = 2" },
          { id: "D", text: "k = 1/5, E(X) = 7/5" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Total probability must equal 1: $\\sum p_i = k + 2k + 3k = 6k = 1 \\implies k = 1/6$.",
          "Step 2: Probabilities are $P(0) = 1/6$, $P(1) = 2/6$, $P(2) = 3/6$.",
          "Step 3: Calculate expectation: $E(X) = \\sum x_i p_i = 0(1/6) + 1(2/6) + 2(3/6) = 0 + 2/6 + 6/6 = 8/6 = 4/3$.",
        ],
        cuetTip: "Two-part check: First find k using sum of probabilities = 1, then calculate expectation.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Independent Events Intersection Formula",
        frequency: "Very High",
        pyqExample: {
          question:
            "If $A$ and $B$ are two independent events such that $P(A) = 0.3$ and $P(B) = 0.4$, then $P(A \\cup B)$ is equal to:",
          options: [
            { id: "A", text: "0.58" },
            { id: "B", text: "0.70" },
            { id: "C", text: "0.12" },
            { id: "D", text: "0.82" },
          ],
          correctOption: "A",
          explanation: "For independent events, $P(A \\cap B) = P(A) P(B) = (0.3)(0.4) = 0.12$. Then $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.3 + 0.4 - 0.12 = 0.58$.",
        },
        strategy: "Or use $P(A \\cup B) = 1 - P(A') P(B') = 1 - (0.7)(0.6) = 1 - 0.42 = 0.58$.",
      },
      {
        type: "Binomial Mean and Variance Relation",
        frequency: "High",
        pyqExample: {
          question:
            "The mean and variance of a binomial distribution are 4 and 2 respectively. The number of trials $n$ is:",
          options: [
            { id: "A", text: "8" },
            { id: "B", text: "16" },
            { id: "C", text: "4" },
            { id: "D", text: "12" },
          ],
          correctOption: "A",
          explanation: "Mean $= np = 4$. Variance $= npq = 2$. Divide variance by mean: $\\frac{npq}{np} = q = \\frac{2}{4} = \\frac{1}{2}$. Since $p + q = 1$, $p = 1 - 1/2 = 1/2$. Then $n(1/2) = 4 \\implies n = 8$.",
        },
        strategy: "Divide variance by mean to find $q$, then $p = 1 - q$, then $n = \\text{Mean} / p$.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming mutually exclusive events are independent.",
        whyWrong: "If events are mutually exclusive, $P(A \\cap B) = 0$. If they were independent, $P(A \\cap B) = P(A) P(B) > 0$.",
        correctUnderstanding: "Mutually exclusive events with positive probabilities are NEVER independent; the occurrence of one guarantees the non-occurrence of the other.",
      },
      {
        misconception: "Forgetting to square the mean when calculating variance.",
        whyWrong: "$\\text{Var}(X) = E(X^2) - [E(X)]^2$. Forgetting the square yields incorrect negative or distorted values.",
        correctUnderstanding: "Always compute $E(X^2) = \\sum x_i^2 p_i$ and subtract the square of $\\mu = E(X)$.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Bayes Cross-Product Shortcut",
        mnemonic: "Cross and Conquer.",
        rule: "For two bags with $(r_1/t_1)$ and $(r_2/t_2)$: $P(E_2|A) = \\frac{r_2 t_1}{r_1 t_2 + r_2 t_1}$.",
        shortcut: "No need to write full denominator expansion.",
        whenToApply: "Two-bag Bayes theorem problems.",
      },
      {
        title: "Binomial Parameter Extraction",
        mnemonic: "q = Var / Mean.",
        rule: "Dividing variance by mean instantly reveals $q$.",
        shortcut: "$q = \\sigma^2 / \\mu \\implies p = 1 - q \\implies n = \\mu / p$.",
        whenToApply: "Binomial parameter reconstruction.",
      },
    ],
    quickRevisionCard: {
      title: "Probability — High-Yield Review Card",
      bulletPoints: [
        "Conditional: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ ($P(B) > 0$).",
        "Independent: $P(A \\cap B) = P(A) P(B)$. Then $A'$ and $B'$ are also independent.",
        "At least one: $P(A \\cup B) = 1 - P(A') P(B')$ for independent events.",
        "Total probability: $P(A) = \\sum P(E_i) P(A|E_i)$.",
        "Bayes' theorem: $P(E_i|A) = \\frac{P(E_i) P(A|E_i)}{\\sum P(E_j) P(A|E_j)}$.",
        "Expectation: $E(X) = \\mu = \\sum x_i p_i$. Variance: $\\text{Var}(X) = \\sum x_i^2 p_i - \\mu^2$.",
        "Binomial: $P(X = r) = ^n C_r p^r q^{n-r}$. Mean $= np$, Variance $= npq$.",
        "Variance < Mean always for binomial distribution.",
        "Mutually exclusive ($A \\cap B = \\emptyset$) $\\ne$ Independent ($P(A \\cap B) = P(A)P(B)$).",
      ],
    },
    practiceQuestions: [
      {
        id: "maths_u6_q1",
        question: "If $P(A) = 0.4$, $P(B) = 0.8$, and $P(B|A) = 0.6$, then $P(A \\cup B)$ is equal to:",
        type: "standard",
        options: [
          { id: "A", text: "0.96" },
          { id: "B", text: "0.24" },
          { id: "C", text: "0.84" },
          { id: "D", text: "0.48" },
        ],
        correctOption: "A",
        explanation: "$P(A \\cap B) = P(A) P(B|A) = (0.4)(0.6) = 0.24$. Then $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.4 + 0.8 - 0.24 = 1.20 - 0.24 = 0.96$.",
        difficulty: "easy",
      },
      {
        id: "maths_u6_q2",
        question: "A coin is tossed 5 times. The probability of getting EXACTLY 3 heads is:",
        type: "standard",
        options: [
          { id: "A", text: "5 / 16" },
          { id: "B", text: "5 / 32" },
          { id: "C", text: "10 / 16" },
          { id: "D", text: "1 / 2" },
        ],
        correctOption: "A",
        explanation: "Binomial with $n = 5, p = 1/2, q = 1/2$. $P(X = 3) = ^5 C_3 (1/2)^3 (1/2)^2 = 10 \\times (1/32) = 10/32 = 5/16$.",
        difficulty: "easy",
      },
      {
        id: "maths_u6_q3",
        question: "The variance of a random variable $X$ with distribution $P(X = 1) = 0.2$, $P(X = 2) = 0.5$, $P(X = 3) = 0.3$ is:",
        type: "standard",
        options: [
          { id: "A", text: "0.49" },
          { id: "B", text: "2.1" },
          { id: "C", text: "4.9" },
          { id: "D", text: "0.7" },
        ],
        correctOption: "A",
        explanation: "$E(X) = 1(0.2) + 2(0.5) + 3(0.3) = 0.2 + 1.0 + 0.9 = 2.1$. $E(X^2) = 1^2(0.2) + 2^2(0.5) + 3^2(0.3) = 0.2 + 2.0 + 2.7 = 4.9$. $\\text{Var}(X) = E(X^2) - [E(X)]^2 = 4.9 - (2.1)^2 = 4.9 - 4.41 = 0.49$.",
        difficulty: "medium",
      },
      {
        id: "maths_u6_q4",
        question: "Assertion (A): If $P(A) = 0.5$ and $P(B) = 0.6$, then $A$ and $B$ cannot be mutually exclusive events.\nReason (R): For mutually exclusive events $P(A \\cup B) = P(A) + P(B) \\le 1$.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "If they were mutually exclusive, $P(A \\cup B) = 0.5 + 0.6 = 1.1 > 1$, which is impossible since probability cannot exceed 1.",
        difficulty: "easy",
      },
      {
        id: "maths_u6_q5",
        question: "Match List-I (Probability Concept) with List-II (Mathematical Formula):\nP. Conditional Probability P(A|B)\nQ. Independent Events P(A ∩ B)\nR. Law of Total Probability P(A)\nS. Binomial Variance",
        type: "match-the-following",
        options: [
          { id: "A", text: "P-P(A ∩ B)/P(B), Q-P(A)·P(B), R-Σ P(Ei)·P(A|Ei), S-npq" },
          { id: "B", text: "P-P(A)·P(B), Q-P(A ∩ B)/P(B), R-npq, S-Σ P(Ei)·P(A|Ei)" },
          { id: "C", text: "P-npq, Q-P(A)·P(B), R-P(A ∩ B)/P(B), S-Σ P(Ei)·P(A|Ei)" },
          { id: "D", text: "P-P(A ∩ B)/P(B), Q-npq, R-P(A)·P(B), S-Σ P(Ei)·P(A|Ei)" },
        ],
        correctOption: "A",
        explanation: "Direct matching of canonical definitions and formulas from NCERT Chapter 13.",
        difficulty: "easy",
      },
      {
        id: "maths_u6_q6",
        question: "Two cards are drawn successively without replacement from a pack of 52 cards. What is the probability that both are aces?",
        type: "standard",
        options: [
          { id: "A", text: "1 / 221" },
          { id: "B", text: "1 / 169" },
          { id: "C", text: "4 / 221" },
          { id: "D", text: "1 / 13" },
        ],
        correctOption: "A",
        explanation: "First ace: $4/52 = 1/13$. Second ace without replacement: $3/51 = 1/17$. Joint probability $= (1/13) \\times (1/17) = 1/221$.",
        difficulty: "easy",
      },
      {
        id: "maths_u6_q7",
        question: "In a binomial distribution with parameters $n$ and $p$, the ratio of variance to mean is equal to:",
        type: "standard",
        options: [
          { id: "A", text: "p" },
          { id: "B", text: "q (1 - p)" },
          { id: "C", text: "n" },
          { id: "D", text: "np" },
        ],
        correctOption: "B",
        explanation: "$\\frac{\\text{Variance}}{\\text{Mean}} = \\frac{n p q}{n p} = q = 1 - p$.",
        difficulty: "easy",
      },
      {
        id: "maths_u6_q8",
        question: "A problem in mathematics is given to three students whose chances of solving it are $1/2, 1/3$, and $1/4$. What is the probability that the problem is solved?",
        type: "standard",
        options: [
          { id: "A", text: "3 / 4" },
          { id: "B", text: "1 / 4" },
          { id: "C", text: "1 / 24" },
          { id: "D", text: "23 / 24" },
        ],
        correctOption: "A",
        explanation: "Probability of problem solved $= 1 - P(\\text{none solves}) = 1 - P(A') P(B') P(C') = 1 - (1 - 1/2)(1 - 1/3)(1 - 1/4) = 1 - (1/2)(2/3)(3/4) = 1 - 1/4 = 3/4$.",
        difficulty: "medium",
      },
      {
        id: "maths_u6_q9",
        question: "If $P(A) = 0.8$ and $P(B|A) = 0.5$, then $P(A \\cap B)$ is:",
        type: "standard",
        options: [
          { id: "A", text: "0.4" },
          { id: "B", text: "0.3" },
          { id: "C", text: "0.1" },
          { id: "D", text: "0.5" },
        ],
        correctOption: "A",
        explanation: "$P(A \\cap B) = P(A) \\cdot P(B|A) = 0.8 \\times 0.5 = 0.4$.",
        difficulty: "easy",
      },
      {
        id: "maths_u6_q10",
        question: "A fair die is thrown 6 times. What is the probability of obtaining AT LEAST one six?",
        type: "standard",
        options: [
          { id: "A", text: "1 - (5/6)⁶" },
          { id: "B", text: "(5/6)⁶" },
          { id: "C", text: "(1/6)⁶" },
          { id: "D", text: "1 - (1/6)⁶" },
        ],
        correctOption: "A",
        explanation: "$P(\\text{at least one 6}) = 1 - P(\\text{no six in 6 throws}) = 1 - (5/6)^6$.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["maths_u5_t1"],
      relatedTopics: ["maths_u7_t1"],
      practiceTestId: "practice-maths-unit6-test1",
      practiceTestUrl: "/test/practice-maths-unit6-test1",
      weaknessReportUrl: "/dashboard/radar?subject=maths",
      weaknessRadarUrl: "/dashboard/radar?subject=maths",
    },
    subjectSpecific: {
      mathematics: {
        standardResults: [
          { result: "P(A \\cup B) = 1 - P(A') P(B')", condition: "Independent events" },
          { result: "\\text{Variance} = npq < np = \\text{Mean}", condition: "Binomial distribution" },
          { result: "P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum P(E_j)P(A|E_j)}", condition: "Bayes' Theorem" },
        ],
        graphProperties: [
          { curve: "Binomial Distribution", keyPoints: "Symmetric when p = 0.5, positively skewed when p < 0.5, negatively skewed when p > 0.5" },
        ],
      },
    },
  },

  // Unit 7: Applied Mathematics: Financial & Numerical Concepts
  {
    id: "maths_u7_t1",
    slug: "numbers-and-quantification-time-series-inferential-statistics-financial-mathematics",
    subject: "maths",
    subjectName: "Mathematics",
    subjectCode: "319",
    unitNumber: 7,
    unitTitle: "Applied Mathematics: Financial & Numerical Concepts",
    topicTitle: "Numbers and Quantification, Time Series, Inferential Statistics, Financial Mathematics",
    ncertReference: {
      class: "Class 12",
      book: "Applied Mathematics (Subject Code 241/319)",
      chapterNumber: 7,
      chapterName: "Numbers, Quantification and Financial Mathematics",
      sections: [
        "1.1 Modulo Arithmetic, Congruences & Clock Arithmetic",
        "1.2 Perpetuity, Sinking Funds & Amortization of Loans",
        "1.3 Equated Monthly Installments (EMI) Calculation",
        "1.4 Compound Annual Growth Rate (CAGR) & Depreciation",
        "1.5 Time Series: Components & Moving Average Method",
        "1.6 Inferential Statistics: Hypothesis Testing, Null vs Alternate, Type I and II Errors",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4-5 questions per shift)",
      totalPyqsInRepo: 150,
      weightagePercentage: 8.5,
    },
    summary30Seconds: [
      "Modulo arithmetic: $a \\equiv b \\pmod m \\iff m$ divides $(a - b)$ with zero remainder. $a \\pmod m \\in \\{0, 1, \\dots, m-1\\}$.",
      "Perpetuity: An annuity that pays cash flows indefinitely. Present value of ordinary perpetuity: $PV = \\frac{R}{i}$, where $R$ is periodic payment and $i$ is interest rate per period.",
      "Sinking fund: A fund created by regular periodic payments $R$ accumulated at compound interest to pay off a debt or replace an asset: $A = \\frac{R}{i} [(1 + i)^n - 1]$.",
      "EMI (Equated Monthly Installment): $EMI = \\frac{P \\cdot r \\cdot (1 + r)^n}{(1 + r)^n - 1}$ where $P$ is principal, $r$ is monthly interest rate, and $n$ is number of monthly installments.",
      "CAGR (Compound Annual Growth Rate): $\\text{CAGR} = \\left(\\frac{\\text{End Value}}{\\text{Beginning Value}}\\right)^{1/n} - 1$.",
      "Time Series: Consists of 4 components: Secular Trend ($T$), Seasonal variations ($S$), Cyclical variations ($C$), and Irregular/Random fluctuations ($I$). Additive model: $Y = T + S + C + I$; Multiplicative model: $Y = T \\times S \\times C \\times I$.",
      "Hypothesis testing: $H_0$ is Null hypothesis (no effect/no difference); $H_a$ or $H_1$ is Alternate hypothesis. Type I error: Rejecting true $H_0$ (false positive, $\\alpha$). Type II error: Failing to reject false $H_0$ (false negative, $\\beta$).",
    ],
    coreConcepts: [
      {
        title: "Modulo Arithmetic, Congruences & Clock Problems",
        content:
          "1. **Modulo Arithmetic**:\n   Let $a, b \\in \\mathbb{Z}$ and $m$ be a positive integer ($m > 0$). We say $a$ is congruent to $b$ modulo $m$, written as:\n   $$a \\equiv b \\pmod m \\iff m \\mid (a - b)$$\n   - Properties:\n     - $a \\equiv a \\pmod m$ (reflexive)\n     - $a \\equiv b \\pmod m \\implies b \\equiv a \\pmod m$ (symmetric)\n     - $a \\equiv b \\pmod m$ and $b \\equiv c \\pmod m \\implies a \\equiv c \\pmod m$ (transitive)\n     - If $a_1 \\equiv b_1 \\pmod m$ and $a_2 \\equiv b_2 \\pmod m$, then:\n       $$(a_1 + a_2) \\equiv (b_1 + b_2) \\pmod m, \\quad (a_1 a_2) \\equiv (b_1 b_2) \\pmod m$$\n\n2. **Clock Arithmetic (Calendar & Time Problems)**:\n   - 12-hour clock works modulo 12: $15:00 \\equiv 3 \\pmod{12}$.\n   - Day of the week works modulo 7: Monday = 1, Tuesday = 2, ..., Sunday = 7 $\\equiv 0 \\pmod 7$.\n   - *Example*: What day of the week is 100 days after Monday? $100 \\equiv 2 \\pmod 7$. $1 + 2 = 3 \\implies$ Wednesday.",
        ncertPointers: [
          "Remainder when 3^200 is divided by 8: 3^2 = 9 = 1 (mod 8) => (3^2)^100 = 1^100 = 1 (mod 8). Remainder is 1.",
        ],
      },
      {
        title: "Financial Mathematics: Perpetuity, Sinking Funds & EMI",
        content:
          "1. **Perpetuity**:\n   A series of equal periodic payments that continue forever.\n   - **Present Value of Ordinary Perpetuity**:\n     $$PV = \\frac{R}{i}$$\n     where $R$ is periodic payment and $i$ is periodic interest rate in decimal.\n   - **Growing Perpetuity** (payments grow at constant rate $g < i$):\n     $$PV = \\frac{R}{i - g}$$\n\n2. **Sinking Fund**:\n   A special reserve fund created by setting aside periodic deposits $R$ at rate $i$ to accumulate an amount $A$ over $n$ periods:\n   $$A = \\frac{R}{i} \\left[(1 + i)^n - 1\\right] \\implies R = \\frac{A \\cdot i}{(1 + i)^n - 1}$$\n\n3. **Amortization of Loans & EMI**:\n   Loan principal $P$ is repaid in $n$ monthly installments $EMI$ at monthly rate $r = \\frac{\\text{Annual Rate}}{12 \\times 100}$:\n   $$P = \\frac{EMI}{r} \\left[1 - (1 + r)^{-n}\\right] \\iff EMI = P \\cdot r \\cdot \\frac{(1 + r)^n}{(1 + r)^n - 1}$$\n\n4. **Depreciation (Reducing Balance Method)**:\n   $$\\text{Book Value } V_n = V_0 (1 - r)^n$$",
        ncertPointers: [
          "Compound Annual Growth Rate (CAGR) measures mean annual growth over multiple years: CAGR = (End Value / Begin Value)^(1/n) - 1.",
        ],
      },
      {
        title: "Time Series Analysis & Inferential Statistics",
        content:
          "1. **Time Series Components**:\n   A sequence of data points recorded at successive, equally spaced time intervals.\n   - **Secular Trend ($T$)**: Long-term smooth, upward or downward movement over decades (e.g., population growth, technology adoption).\n   - **Seasonal Variations ($S$)**: Periodic, regular fluctuations that repeat within a single year (e.g., umbrella sales in monsoon, ice cream sales in summer).\n   - **Cyclical Variations ($C$)**: Medium-term oscillatory waves related to business cycles (Boom, Recession, Depression, Recovery; span 2 to 10 years).\n   - **Irregular / Random Fluctuations ($I$)**: Unpredictable, erratic events like earthquakes, floods, wars, pandemics.\n   - **Models**:\n     - Additive Model: $Y = T + S + C + I$ (when components are independent of level of trend).\n     - Multiplicative Model: $Y = T \\times S \\times C \\times I$ (when variations are proportional to trend level).\n\n2. **Hypothesis Testing & Statistical Errors**:\n   - **Null Hypothesis ($H_0$)**: Presumption of 'no difference' or 'no effect' until evidence disproves it.\n   - **Alternative Hypothesis ($H_a$ or $H_1$)**: The claim being tested that contradicts $H_0$.\n   - **Decision Matrix (Classic CUET Table)**:\n     | Decision | $H_0$ is Actually True | $H_0$ is Actually False |\n     | :--- | :--- | :--- |\n     | **Reject $H_0$** | **Type I Error ($\\alpha$)** | **Correct Decision (Power $1 - \\beta$)** |\n     | **Fail to Reject $H_0$** | **Correct Decision** | **Type II Error ($\\beta$)** |\n   - **Level of Significance ($\\alpha$)**: Probability of committing a Type I error (typically 5% or 1%).",
        ncertPointers: [
          "Type I error is convicting an innocent person (rejecting true H0). Type II error is letting a guilty person walk free (accepting false H0).",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Present Value of Perpetuity",
        formula: "PV = \\frac{R}{i}, \\quad PV_{\\text{growing}} = \\frac{R}{i - g}",
        symbols: "R = \\text{cash flow}, i = \\text{discount rate}, g = \\text{growth rate}",
        siUnits: "Currency / monetary value",
        applicationCondition: "Perpetual infinite cash flows",
      },
      {
        name: "Equated Monthly Installment (EMI)",
        formula: "EMI = P \\cdot r \\cdot \\frac{(1 + r)^n}{(1 + r)^n - 1}",
        symbols: "P = \\text{principal}, r = \\text{monthly interest rate}, n = \\text{months}",
        siUnits: "Monthly payment currency",
        applicationCondition: "Reducing balance loan amortization",
      },
      {
        name: "Compound Annual Growth Rate",
        formula: "\\text{CAGR} = \\left(\\frac{V_{\\text{final}}}{V_{\\text{initial}}}\\right)^{1/n} - 1",
        symbols: "n = \\text{number of years}",
        siUnits: "Percentage or annual rate",
        applicationCondition: "Multi-year investment return analysis",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="250" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Hypothesis Testing Error Matrix & Time Series Components</text>

  <!-- Left: Type I & II Error Matrix -->
  <g transform="translate(60, 55)">
    <rect width="300" height="170" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1"/>
    <text x="150" y="24" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Type I vs Type II Errors</text>
    <line x1="20" y1="35" x2="280" y2="35" stroke="#475569" strokeWidth="1"/>
    <text x="150" y="60" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">Type I Error (α)</text>
    <text x="150" y="80" textAnchor="middle" fill="#fca5a5" fontSize="10">Rejecting H₀ when H₀ is TRUE</text>
    <text x="150" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">(False Alarm / False Positive)</text>
    <line x1="40" y1="108" x2="260" y2="108" stroke="#334155" strokeWidth="1"/>
    <text x="150" y="128" textAnchor="middle" fill="#eab308" fontSize="11" fontWeight="bold">Type II Error (β)</text>
    <text x="150" y="148" textAnchor="middle" fill="#fef08a" fontSize="10">Failing to reject H₀ when H₀ is FALSE</text>
    <text x="150" y="163" textAnchor="middle" fill="#94a3b8" fontSize="9">(Missed Detection / False Negative)</text>
  </g>

  <!-- Right: 4 Time Series Components -->
  <g transform="translate(400, 55)">
    <rect width="300" height="170" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="1"/>
    <text x="150" y="24" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">Time Series Components</text>
    <text x="30" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold">T - Secular Trend</text>
    <text x="150" y="60" fill="#94a3b8" fontSize="10">Long-term direction</text>
    <text x="30" y="90" fill="#34d399" fontSize="11" fontWeight="bold">S - Seasonal</text>
    <text x="150" y="90" fill="#94a3b8" fontSize="10">Within 1 year (holidays)</text>
    <text x="30" y="120" fill="#fbbf24" fontSize="11" fontWeight="bold">C - Cyclical</text>
    <text x="150" y="120" fill="#94a3b8" fontSize="10">Business cycles (2-10 yrs)</text>
    <text x="30" y="150" fill="#f43f5e" fontSize="11" fontWeight="bold">I - Irregular</text>
    <text x="150" y="150" fill="#94a3b8" fontSize="10">Random, earthquakes, wars</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "maths_u7_we1",
        questionNumber: 1,
        question:
          "What is the present value of a perpetuity paying ₹12,000 at the end of each year, if the interest rate is 6% per annum compounded annually?",
        options: [
          { id: "A", text: "₹2,00,000" },
          { id: "B", text: "₹1,20,000" },
          { id: "C", text: "₹20,000" },
          { id: "D", text: "₹72,000" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Formula for present value of ordinary perpetuity: $PV = \\frac{R}{i}$.",
          "Step 2: Here annual cash flow $R = ₹12,000$ and interest rate $i = 6\\% = 0.06$.",
          "Step 3: Calculate $PV = \\frac{12,000}{0.06} = \\frac{12,000 \\times 100}{6} = 2,000 \\times 100 = ₹2,00,000$.",
        ],
        cuetTip: "Perpetuity formula is the fastest in financial maths: simply divide periodic cash flow by interest rate in decimals.",
      },
      {
        id: "maths_u7_we2",
        questionNumber: 2,
        question:
          "Find the remainder when $2^{100}$ is divided by 7.",
        options: [
          { id: "A", text: "1" },
          { id: "B", text: "2" },
          { id: "C", text: "4" },
          { id: "D", text: "6" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Express powers of 2 modulo 7:\n$2^1 \\equiv 2 \\pmod 7$\n$2^2 \\equiv 4 \\pmod 7$\n$2^3 = 8 \\equiv 1 \\pmod 7$.",
          "Step 2: Notice that $2^3 \\equiv 1 \\pmod 7$, so powers repeat with cycle 3.",
          "Step 3: Express exponent 100 in terms of multiple of 3: $100 = 3 \\times 33 + 1$.",
          "Step 4: Therefore, $2^{100} = (2^3)^{33} \\times 2^1 \\equiv (1)^{33} \\times 2 \\equiv 1 \\times 2 \\equiv 2 \\pmod 7$.",
          "Step 5: The remainder is 2.",
        ],
        cuetTip: "Find the smallest power that yields remainder 1 or -1 modulo m. Here $2^3 = 8 \\equiv 1 \\pmod 7$ simplifies the problem instantly.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Statistical Hypothesis Error Identification",
        frequency: "Very High",
        pyqExample: {
          question:
            "Rejecting a null hypothesis when it is true constitutes:",
          options: [
            { id: "A", text: "Type I Error" },
            { id: "B", text: "Type II Error" },
            { id: "C", text: "Standard Error" },
            { id: "D", text: "No Error" },
          ],
          correctOption: "A",
          explanation: "Type I error is the probability of rejecting a true null hypothesis (false positive, denoted by alpha).",
        },
        strategy: "Type I = False Alarm (rejecting true H0). Type II = Miss (accepting false H0).",
      },
      {
        type: "Time Series Seasonal Variation Recognition",
        frequency: "High",
        pyqExample: {
          question:
            "A spike in the sales of woolen clothes in the month of December each year is an example of:",
          options: [
            { id: "A", text: "Secular Trend" },
            { id: "B", text: "Seasonal Variation" },
            { id: "C", text: "Cyclical Variation" },
            { id: "D", text: "Irregular Variation" },
          ],
          correctOption: "B",
          explanation: "Fluctuations that repeat rhythmically within a 1-year period due to weather, festivals, or seasons are seasonal variations.",
        },
        strategy: "Within 1 year = Seasonal. 2 to 10 year business cycles = Cyclical. Long-term multi-decade = Trend. Natural disaster = Irregular.",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing seasonal and cyclical variations.",
        whyWrong: "Seasonal variations occur within a SINGLE year (12 months) with high predictability (e.g., festivals, winter/summer).",
        correctUnderstanding: "Cyclical variations span MULTIPLE years (2 to 10 years) driven by macroeconomic boom-and-bust cycles.",
      },
      {
        misconception: "Using annual interest rate directly in monthly EMI formula.",
        whyWrong: "EMI is paid monthly, so interest rate must be divided by 12 (monthly rate $r = \\frac{R}{12 \\times 100}$) and time must be converted into number of months ($n$).",
        correctUnderstanding: "Always convert annual rates and years to monthly equivalents before calculating EMI.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Hypothesis Error Legal Analogy",
        mnemonic: "Innocent Convicted = Type I. Guilty Acquitted = Type II.",
        rule: "Type I is convicting an innocent person (H0 is true, but rejected). Type II is letting a guilty criminal go free (H0 is false, but accepted).",
        shortcut: "I for Innocent, II for guilty.",
        whenToApply: "Hypothesis testing error questions.",
      },
      {
        title: "Perpetuity Division Rule",
        mnemonic: "PV = Cash / Rate.",
        rule: "Present value is simply payment divided by interest rate.",
        shortcut: "PV = R / i.",
        whenToApply: "Perpetuity valuation problems.",
      },
    ],
    quickRevisionCard: {
      title: "Applied Mathematics — High-Yield Review",
      bulletPoints: [
        "Modulo arithmetic: $a \\equiv b \\pmod m \\iff m \\mid (a - b)$.",
        "Clock arithmetic: Modulo 12 for hours; Modulo 7 for days of week.",
        "Perpetuity PV: $PV = R / i$. Growing perpetuity: $PV = R / (i - g)$.",
        "Sinking fund deposit: $R = \\frac{A \\cdot i}{(1 + i)^n - 1}$.",
        "EMI formula: $EMI = P \\cdot r \\cdot \\frac{(1+r)^n}{(1+r)^n - 1}$.",
        "CAGR: $\\text{CAGR} = (V_{\\text{final}} / V_{\\text{initial}})^{1/n} - 1$.",
        "Time series components: Secular Trend (long term), Seasonal (< 1 yr), Cyclical (2-10 yrs), Irregular (random).",
        "Type I error ($\\alpha$): Rejecting true $H_0$.",
        "Type II error ($\\beta$): Failing to reject false $H_0$.",
      ],
    },
    practiceQuestions: [
      {
        id: "maths_u7_q1",
        question: "Today is Tuesday. What day of the week will it be after 65 days?",
        type: "standard",
        options: [
          { id: "A", text: "Wednesday" },
          { id: "B", text: "Thursday" },
          { id: "C", text: "Friday" },
          { id: "D", text: "Saturday" },
        ],
        correctOption: "B",
        explanation: "Calculate $65 \\pmod 7$: $65 = 7 \\times 9 + 2 \\equiv 2 \\pmod 7$. Tuesday (day 2) $+ 2 = 4 \\implies$ Thursday.",
        difficulty: "easy",
      },
      {
        id: "maths_u7_q2",
        question: "An investment of ₹1,00,000 grew to ₹1,44,000 in 2 years. What is the Compound Annual Growth Rate (CAGR)?",
        type: "standard",
        options: [
          { id: "A", text: "20%" },
          { id: "B", text: "22%" },
          { id: "C", text: "44%" },
          { id: "D", text: "12%" },
        ],
        correctOption: "A",
        explanation: "$\\text{CAGR} = (144000 / 100000)^{1/2} - 1 = (1.44)^{1/2} - 1 = 1.20 - 1 = 0.20 = 20\\%$.",
        difficulty: "easy",
      },
      {
        id: "maths_u7_q3",
        question: "In time series analysis, the variation in crop output due to an unseasonal severe flood is classified as:",
        type: "standard",
        options: [
          { id: "A", text: "Secular trend" },
          { id: "B", text: "Seasonal variation" },
          { id: "C", text: "Irregular variation" },
          { id: "D", text: "Cyclical variation" },
        ],
        correctOption: "C",
        explanation: "Floods, earthquakes, and wars are completely unforeseen, non-recurrent random events classified as irregular (random) variations.",
        difficulty: "easy",
      },
      {
        id: "maths_u7_q4",
        question: "Assertion (A): The present value of a perpetuity paying ₹6,000 annually at 10% interest rate is ₹60,000.\nReason (R): The present value of an ordinary perpetuity is given by $PV = R / i$.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "$PV = 6000 / 0.10 = ₹60,000$. Both formula and calculation are exact.",
        difficulty: "easy",
      },
      {
        id: "maths_u7_q5",
        question: "A machine costing ₹5,00,000 depreciates at 10% per annum on reducing balance method. Its value after 2 years will be:",
        type: "standard",
        options: [
          { id: "A", text: "₹4,05,000" },
          { id: "B", text: "₹4,00,000" },
          { id: "C", text: "₹4,50,000" },
          { id: "D", text: "₹3,95,000" },
        ],
        correctOption: "A",
        explanation: "$V_2 = V_0 (1 - r)^2 = 500000 (1 - 0.10)^2 = 500000 (0.9)^2 = 500000 \\times 0.81 = ₹4,05,000$.",
        difficulty: "easy",
      },
      {
        id: "maths_u7_q6",
        question: "Type II error in statistical hypothesis testing is committed when:",
        type: "standard",
        options: [
          { id: "A", text: "We accept (fail to reject) a false null hypothesis" },
          { id: "B", text: "We reject a true null hypothesis" },
          { id: "C", text: "We reject a false null hypothesis" },
          { id: "D", text: "We accept a true null hypothesis" },
        ],
        correctOption: "A",
        explanation: "Type II error (beta) occurs when the null hypothesis H0 is false, but we fail to reject it.",
        difficulty: "easy",
      },
      {
        id: "maths_u7_q7",
        question: "The value of $25 \\pmod 7$ is:",
        type: "standard",
        options: [
          { id: "A", text: "4" },
          { id: "B", text: "3" },
          { id: "C", text: "1" },
          { id: "D", text: "5" },
        ],
        correctOption: "A",
        explanation: "$25 = 7 \\times 3 + 4$. The remainder is 4.",
        difficulty: "easy",
      },
      {
        id: "maths_u7_q8",
        question: "In the multiplicative model of a time series, the original value $Y$ is expressed as:",
        type: "standard",
        options: [
          { id: "A", text: "Y = T × S × C × I" },
          { id: "B", text: "Y = T + S + C + I" },
          { id: "C", text: "Y = T + S × C + I" },
          { id: "D", text: "Y = (T + S) / (C + I)" },
        ],
        correctOption: "A",
        explanation: "In the multiplicative model, components interact as percentages/proportions: $Y = T \\times S \\times C \\times I$.",
        difficulty: "easy",
      },
      {
        id: "maths_u7_q9",
        question: "A sinking fund is primarily established to:",
        type: "standard",
        options: [
          { id: "A", text: "Accumulate capital to pay off a known future liability or replace an asset" },
          { id: "B", text: "Pay immediate daily operating expenses" },
          { id: "C", text: "Avoid paying income taxes" },
          { id: "D", text: "Lend money to shareholders" },
        ],
        correctOption: "A",
        explanation: "A sinking fund is an earmarked fund created by periodic investments to pay off a long-term debt (debentures) or replace obsolete machinery.",
        difficulty: "easy",
      },
      {
        id: "maths_u7_q10",
        question: "The probability of committing a Type I error is also known as the:",
        type: "standard",
        options: [
          { id: "A", text: "Level of significance (α)" },
          { id: "B", text: "Power of the test (1 - β)" },
          { id: "C", text: "Degree of freedom" },
          { id: "D", text: "Confidence interval" },
        ],
        correctOption: "A",
        explanation: "The level of significance $\\alpha$ is the pre-specified threshold probability of rejecting a true null hypothesis (Type I error).",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["maths_u6_t1"],
      relatedTopics: ["maths_u1_t1"],
      practiceTestId: "practice-maths-unit7-test1",
      practiceTestUrl: "/test/practice-maths-unit7-test1",
      weaknessReportUrl: "/dashboard/radar?subject=maths",
      weaknessRadarUrl: "/dashboard/radar?subject=maths",
    },
    subjectSpecific: {
      mathematics: {
        standardResults: [
          { result: "PV = \\frac{R}{i}", condition: "Ordinary perpetuity" },
          { result: "a \\equiv b \\pmod m \\iff m \\mid (a - b)", condition: "Modulo congruences" },
          { result: "\\text{Type I Error} = \\alpha, \\quad \\text{Type II Error} = \\beta", condition: "Hypothesis testing" },
        ],
        graphProperties: [
          { curve: "Time Series Secular Trend", keyPoints: "Long term smooth trajectory over decades, estimated via moving averages or least squares regression" },
        ],
      },
    },
  },
];
