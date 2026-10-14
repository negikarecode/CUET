import { NoteDocument } from "@/types/notes";

export const unit3Topics: NoteDocument[] = [
  {
    id: "physics_u3_t1",
    slug: "moving-charges-and-magnetism",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 3,
    unitTitle: "Magnetic Effects of Current and Magnetism",
    topicTitle: "Moving Charges and Magnetism",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 1",
      chapterNumber: 4,
      chapterName: "Moving Charges and Magnetism",
      sections: [
        "4.2 Magnetic Force",
        "4.3 Motion in a Magnetic Field",
        "4.4 Motion in Combined Electric and Magnetic Fields",
        "4.5 Magnetic Field due to a Current Element, Biot-Savart Law",
        "4.6 Magnetic Field on the Axis of a Circular Current Loop",
        "4.7 Ampere's Circuital Law",
        "4.8 The Solenoid and the Toroid",
        "4.9 Force between Two Parallel Currents, the Ampere",
        "4.10 Torque on Current Loop, Magnetic Dipole",
        "4.11 The Moving Coil Galvanometer",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in every shift: 2-3 questions covering Lorentz force, circular loop field, or parallel conductors",
      totalPyqsInRepo: 62,
      weightagePercentage: 7.0,
    },
    summary30Seconds: [
      "Lorentz Force $\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})$; Magnetic force $\\vec{F}_B = q(\\vec{v} \\times \\vec{B})$ does zero work because force is always perpendicular to velocity ($W = 0, \\Delta K = 0$).",
      "Motion in uniform $\\vec{B}$: Particle injected at $90^\\circ$ travels in circle of radius $r = \\frac{mv}{qB} = \\frac{\\sqrt{2mK}}{qB}$; Frequency $f = \\frac{qB}{2\\pi m}$ is independent of speed/radius.",
      "Biot-Savart Law: $d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I(d\\vec{l} \\times \\hat{r})}{r^2}$. Axis of circular loop of radius $R$: $B = \\frac{\\mu_0 N I R^2}{2(R^2 + x^2)^{3/2}}$; at center ($x=0$): $B = \\frac{\\mu_0 N I}{2R}$.",
      "Ampere's Circuital Law: $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enclosed}}$. Long straight wire: $B = \\frac{\\mu_0 I}{2\\pi r}$; Long solenoid: $B = \\mu_0 n I$ (where $n = N/L$).",
      "Force between two parallel currents: $\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$. Parallel currents in same direction ATTRACT; antiparallel REPEL. Defines the SI Ampere.",
    ],
    coreConcepts: [
      {
        title: "Lorentz Force & Helical Trajectory",
        content:
          "Total Lorentz force on charge $q$ moving with velocity $\\vec{v}$ in presence of both $\\vec{E}$ and $\\vec{B}$ is:\n$$\\vec{F} = q\\vec{E} + q(\\vec{v} \\times \\vec{B})$$\nSince $\\vec{F}_B \\cdot \\vec{v} = q(\\vec{v} \\times \\vec{B}) \\cdot \\vec{v} = 0$, magnetic force can never change the kinetic energy or speed of a charged particle—it only changes the direction of motion.\n\n**Trajectories:**\n1. $\\vec{v} \\parallel \\vec{B}$ ($\\theta = 0^\\circ$ or $180^\\circ$): $\\vec{F}_B = 0$ -> Straight line motion.\n2. $\\vec{v} \\perp \\vec{B}$ ($\\theta = 90^\\circ$): Uniform circular motion with centripetal force $q v B = \\frac{m v^2}{r} \\implies r = \\frac{mv}{qB}$.\n3. General angle $\\theta$: Helical motion with radius $r = \\frac{m v \\sin\\theta}{qB}$ and pitch $p = (v \\cos\\theta) T = \\frac{2\\pi m v \\cos\\theta}{qB}$.",
      },
      {
        title: "Biot-Savart Law & Circular Loops",
        content:
          "The magnetic field produced by an infinitesimal current element $I d\\vec{l}$ at displacement $\\vec{r}$ is:\n$$d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I d\\vec{l} \\times \\hat{r}}{r^2}$$\nwhere $\\frac{\\mu_0}{4\\pi} = 10^{-7}\\text{ T}\\cdot\\text{m}\\cdot\\text{A}^{-1}$.\n\nFor a circular coil of $N$ turns and radius $R$ carrying current $I$:\n- At center: $B_c = \\frac{\\mu_0 N I}{2R}$.\n- At an axial distance $x$: $B_x = \\frac{\\mu_0 N I R^2}{2(R^2 + x^2)^{3/2}}$.\n- At large distance ($x \\gg R$): $B_x \\approx \\frac{\\mu_0 (N I \\pi R^2)}{2\\pi x^3} = \\frac{\\mu_0}{4\\pi} \\frac{2m}{x^3}$ where $m = N I A$ is the magnetic dipole moment.",
      },
      {
        title: "Ampere's Circuital Law & Force between Currents",
        content:
          "Ampere's Law states $\\oint_C \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enc}}$.\n- **Long solenoid** (turns per unit length $n = N/L$): Inside core $B = \\mu_0 n I$; at either end of a semi-infinite solenoid $B = \\frac{1}{2} \\mu_0 n I$.\n- **Toroid:** Inside core $B = \\frac{\\mu_0 N I}{2\\pi r}$; in open space outside or inside central hole $B = 0$.\n\n**Parallel Currents:** Two straight infinite parallel wires separated by distance $d$ carrying currents $I_1, I_2$ exert a mutual magnetic force per unit length:\n$$\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$$\n- **Like currents attract**, opposite currents repel (exact opposite of electrostatics!).\n- One Ampere is the constant current which, maintained in two straight parallel conductors of infinite length and negligible cross-section placed 1 metre apart in vacuum, produces between them a force of $2 \\times 10^{-7}\\text{ N/m}$.",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Magnetic Lorentz Force",
        formula: "F = q v B \\sin\\theta",
        symbols: "\\theta: angle between \\vec{v} and \\vec{B}",
        siUnits: "Newtons (N)",
        applicationCondition: "Charged particle moving in magnetic field",
      },
      {
        name: "Radius in Circular Orbit",
        formula: "r = \\frac{m v}{q B} = \\frac{p}{q B} = \\frac{\\sqrt{2 m K}}{q B}",
        symbols: "p: momentum, K: kinetic energy",
        siUnits: "Meters (m)",
        applicationCondition: "Perpendicular injection (\\theta = 90^\\circ)",
      },
      {
        name: "Cyclotron Frequency",
        formula: "f = \\frac{q B}{2\\pi m}, \\quad \\omega = \\frac{q B}{m}",
        symbols: "Independent of speed and radius",
        siUnits: "Hertz (Hz)",
        applicationCondition: "Non-relativistic speeds (v << c)",
      },
      {
        name: "Circular Loop Center Field",
        formula: "B = \\frac{\\mu_0 N I}{2R}",
        symbols: "N: turns, R: radius, I: current",
        siUnits: "Tesla (T)",
        applicationCondition: "Center of flat circular coil",
      },
      {
        name: "Long Straight Wire Field",
        formula: "B = \\frac{\\mu_0 I}{2\\pi r}",
        symbols: "r: radial distance from wire axis",
        siUnits: "Tesla (T)",
        applicationCondition: "Infinitely long straight thin conductor",
      },
      {
        name: "Force between Parallel Currents",
        formula: "\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}",
        symbols: "d: separation, \\mu_0 = 4\\pi \\times 10^{-7}",
        siUnits: "N/m",
        applicationCondition: "Two long parallel currents in vacuum",
      },
    ],
    diagram: {
      type: "svg",
      title: "Biot-Savart Loop & Parallel Current Forces",
      caption: "Left: Magnetic field on the axis of a circular current loop. Right: Mutual magnetic attraction between parallel conductors carrying current in the same direction.",
      code: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <marker id="arrB" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
    </marker>
    <marker id="arrRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
    </marker>
  </defs>
  <!-- Left panel: Circular Loop Axis -->
  <rect x="15" y="10" width="350" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="190" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Field on Axis of Circular Loop</text>

  <!-- Loop viewed edge-on -->
  <ellipse cx="100" cy="125" rx="16" ry="65" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.5"/>
  <text x="75" y="75" fill="#2563EB" fontSize="11" fontWeight="bold">Current I</text>
  <line x1="100" y1="125" x2="330" y2="125" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3"/>
  <circle cx="100" cy="125" r="3" fill="#64748B"/>
  <text x="95" y="142" fill="#64748B" fontSize="10">O</text>

  <!-- Point P on axis -->
  <circle cx="260" cy="125" r="4" fill="#DC2626"/>
  <text x="260" y="145" textAnchor="middle" fill="#DC2626" fontSize="11" fontWeight="bold">P (x)</text>
  <line x1="260" y1="125" x2="330" y2="125" stroke="#DC2626" strokeWidth="2.5" markerEnd="url(#arrRed)"/>
  <text x="310" y="115" fill="#DC2626" fontSize="12" fontWeight="bold">B⃗_axis</text>
  <text x="190" y="225" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="bold">B = μ₀ I R² / [2(R² + x²)^(3/2)]</text>

  <!-- Right panel: Parallel Currents -->
  <rect x="380" y="10" width="365" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="562" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Parallel Currents Attract</text>

  <!-- Wire 1 -->
  <line x1="470" y1="50" x2="470" y2="200" stroke="#2563EB" strokeWidth="4"/>
  <line x1="470" y1="90" x2="470" y2="70" stroke="#FFFFFF" strokeWidth="2" markerEnd="url(#arrB)"/>
  <text x="455" y="125" fill="#2563EB" fontSize="13" fontWeight="bold">I₁</text>

  <!-- Wire 2 -->
  <line x1="640" y1="50" x2="640" y2="200" stroke="#2563EB" strokeWidth="4"/>
  <line x1="640" y1="90" x2="640" y2="70" stroke="#FFFFFF" strokeWidth="2" markerEnd="url(#arrB)"/>
  <text x="655" y="125" fill="#2563EB" fontSize="13" fontWeight="bold">I₂</text>

  <!-- Distance d -->
  <line x1="470" y1="170" x2="640" y2="170" stroke="#64748B" strokeWidth="1.5"/>
  <text x="555" y="185" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="bold">Distance d</text>

  <!-- Attractive forces -->
  <line x1="470" y1="125" x2="520" y2="125" stroke="#DC2626" strokeWidth="2" markerEnd="url(#arrRed)"/>
  <text x="495" y="115" fill="#DC2626" fontSize="11" fontWeight="bold">F⃗₁₂</text>
  <line x1="640" y1="125" x2="590" y2="125" stroke="#DC2626" strokeWidth="2" markerEnd="url(#arrRed)"/>
  <text x="605" y="115" fill="#DC2626" fontSize="11" fontWeight="bold">F⃗₂₁</text>
  <text x="562" y="225" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">F/L = μ₀ I₁ I₂ / (2πd) (Attractive)</text>
</svg>`,
    },
    workedExamples: [
      {
        id: "we_phys_3_1",
        questionNumber: 1,
        question:
          "A circular coil of wire consisting of 100 turns, each of radius 8.0 cm carries a current of 0.40 A. What is the magnitude of the magnetic field B at the center of the coil?",
        options: [
          { id: "A", text: "3.14 × 10⁻⁴ T" },
          { id: "B", text: "6.28 × 10⁻⁴ T" },
          { id: "C", text: "1.57 × 10⁻⁴ T" },
          { id: "D", text: "3.14 × 10⁻⁵ T" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Formula for magnetic field at center of circular coil: $B = \\frac{\\mu_0 N I}{2R}$.",
          "Step 2: Given $N = 100$, $I = 0.40\\text{ A}$, $R = 8.0\\text{ cm} = 0.08\\text{ m}$, $\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A}$.",
          "Step 3: Substitute: $B = \\frac{(4\\pi \\times 10^{-7}) \\times 100 \\times 0.40}{2 \\times 0.08} = \\frac{4\\pi \\times 10^{-5} \\times 0.4}{0.16} = \\frac{1.6\\pi \\times 10^{-5}}{0.16} = 10\\pi \\times 10^{-5} = \\pi \\times 10^{-4}\\text{ T}$.",
          "Step 4: Value is $3.1416 \\times 10^{-4}\\text{ T} \\approx 3.14 \\times 10^{-4}\\text{ T}$.",
          "Hence, Option A is correct.",
        ],
        cuetTip: "Notice the factor 2 in denominator of circular coil center $2R$ (unlike straight wire which has $2\\pi r$). Don't mix up the $\\pi$ in the denominator!",
      },
      {
        id: "we_phys_3_2",
        questionNumber: 2,
        question:
          "Two long straight parallel wires separated by 0.1 m carry currents of 10 A and 20 A in the same direction. What is the force per unit length between them?",
        options: [
          { id: "A", text: "4 × 10⁻⁴ N/m (attractive)" },
          { id: "B", text: "4 × 10⁻⁴ N/m (repulsive)" },
          { id: "C", text: "2 × 10⁻⁴ N/m (attractive)" },
          { id: "D", text: "2 × 10⁻⁴ N/m (repulsive)" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Formula for force per unit length: $F/L = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$.",
          "Step 2: Substitute $I_1 = 10\\text{ A}$, $I_2 = 20\\text{ A}$, $d = 0.1\\text{ m}$, and $\\frac{\\mu_0}{2\\pi} = 2 \\times 10^{-7}$.",
          "Step 3: Calculate: $F/L = 2 \\times 10^{-7} \\times \\frac{10 \\times 20}{0.1} = 2 \\times 10^{-7} \\times 2000 = 4 \\times 10^{-4}\\text{ N/m}$.",
          "Step 4: Since currents are in the same direction, the force is attractive.",
        ],
        cuetTip: "Remember parallel currents in same direction attract, unlike like charges in electrostatics.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Work Done by Magnetic Force",
        frequency: "Repeated in multiple shifts",
        pyqExample: {
          question: "A proton enters a uniform magnetic field with a velocity perpendicular to the field lines. The kinetic energy of the proton after time t will be:",
          options: [
            { id: "A", text: "Increased" },
            { id: "B", text: "Decreased" },
            { id: "C", text: "Constant" },
            { id: "D", text: "Zero" },
          ],
          correctOption: "C",
          explanation: "Magnetic force is always perpendicular to velocity: $\\vec{F} \\cdot \\vec{v} = 0$. Hence power $P = 0$, work done $W = 0$, and kinetic energy remains constant.",
        },
        strategy: "Magnetic force changes direction of velocity, NEVER speed or kinetic energy.",
      },
      {
        type: "Radius of Circular Orbit in Magnetic Field",
        frequency: "Very High",
        pyqExample: {
          question: "A proton and an alpha particle enter a uniform magnetic field with the same velocity perpendicular to B. The ratio of their orbital radii r_p / r_α is:",
          options: [
            { id: "A", text: "1 : 2" },
            { id: "B", text: "1 : 1" },
            { id: "C", text: "2 : 1" },
            { id: "D", text: "1 : 4" },
          ],
          correctOption: "A",
          explanation: "r = mv / (qB). With equal v and B: r_p / r_α = (m_p / m_α) × (q_α / q_p) = (1 / 4) × (2 / 1) = 2/4 = 1/2.",
        },
        strategy: "Always write r ∝ m/q for equal velocity, or r ∝ √m / q for equal kinetic energy.",
      },
    ],
    commonTraps: [
      {
        misconception: "Thinking parallel currents with same direction repel like similar electric charges.",
        whyWrong: "In electrostatics, like charges repel. In magnetostatics, parallel currents in the SAME direction ATTRACT each other.",
        correctUnderstanding: "Parallel currents in same direction attract; antiparallel currents repel.",
        trapOptionExample: "Choosing 'repel' for two parallel wires carrying current in same direction.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        mnemonic: "PCA: Parallel Currents Attract",
        rule: "Direction of force between parallel currents",
        shortcut: "Same direction = Attract, Opposite = Repel",
        whenToApply: "Current-carrying wire interactions",
      },
    ],
    quickRevisionCard: {
      title: "Moving Charges & Magnetism — Quick Summary",
      bulletPoints: [
        "Lorentz Force: F⃗ = q(E⃗ + v⃗ × B⃗). Magnetic force does NO work (W = 0, ΔK = 0).",
        "Circular Orbit: r = mv / (qB) = p / (qB); Time period T = 2πm / (qB) (independent of v).",
        "Biot-Savart: dB⃗ = (μ₀/4π) [I dl⃗ × r̂ / r²] with μ₀/4π = 10⁻⁷ T·m/A.",
        "Circular Coil (center): B = μ₀NI / (2R). On axis at distance x: B = μ₀NIR² / [2(R² + x²)^(3/2)].",
        "Straight Wire: B = μ₀I / (2πr).",
        "Solenoid: B = μ₀nI inside; B = ½μ₀nI at ends (where n = N/L). Toroid: B = μ₀NI / (2πr).",
        "Parallel Currents: F/L = μ₀I₁I₂ / (2πd). Same direction attracts, opposite repels.",
        "Magnetic Dipole Moment: m⃗ = NI A⃗ (A·m²). Torque on loop: τ⃗ = m⃗ × B⃗.",
      ],
    },
    practiceQuestions: [
      {
        id: "pq_phys_3_1",
        question: "A charged particle is moving in a circular path of radius R in a uniform magnetic field. If its kinetic energy is doubled, the radius of the circular path will become:",
        type: "standard",
        options: [
          { id: "A", text: "2R" },
          { id: "B", text: "√2 R" },
          { id: "C", text: "4R" },
          { id: "D", text: "R / √2" },
        ],
        correctOption: "B",
        explanation: "Radius $r = \\frac{\\sqrt{2mK}}{qB} \\propto \\sqrt{K}$. Doubling $K$ scales radius by $\\sqrt{2}$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_3_2",
        question: "Assertion (A): A magnetic field does not change the kinetic energy of a moving charged particle.\nReason (R): The magnetic force acting on a moving charged particle is always perpendicular to its velocity vector.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Work done $dW = \\vec{F} \\cdot d\\vec{r} = (\\vec{F} \\cdot \\vec{v}) dt = 0$ since $\\vec{F} \\perp \\vec{v}$. By work-energy theorem, $\\Delta K = 0$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_3_3",
        question: "Match List I (Configuration) with List II (Magnetic Field B):\nList I: (A) Center of circular loop of radius R, (B) Long straight wire at distance r, (C) Inside an ideal long solenoid, (D) At the end of a long solenoid\nList II: (I) μ₀I / (2πr), (II) μ₀nI, (III) μ₀I / (2R), (IV) ½ μ₀nI",
        type: "match-the-following",
        options: [
          { id: "A", text: "A-(III), B-(I), C-(II), D-(IV)" },
          { id: "B", text: "A-(I), B-(III), C-(II), D-(IV)" },
          { id: "C", text: "A-(III), B-(II), C-(I), D-(IV)" },
          { id: "D", text: "A-(IV), B-(I), C-(II), D-(III)" },
        ],
        correctOption: "A",
        explanation: "Center of loop is $\\mu_0 I/(2R)$ (III); Straight wire is $\\mu_0 I/(2\\pi r)$ (I); Solenoid inside is $\\mu_0 n I$ (II); Solenoid end is $\\frac{1}{2}\\mu_0 n I$ (IV).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_3_4",
        question: "Two long parallel wires separated by 20 cm in vacuum carry currents of 4 A and 6 A in the same direction. The force per unit length between them is (take μ₀ = 4π × 10⁻⁷ T·m/A):",
        type: "standard",
        options: [
          { id: "A", text: "2.4 × 10⁻⁵ N/m (attractive)" },
          { id: "B", text: "2.4 × 10⁻⁵ N/m (repulsive)" },
          { id: "C", text: "4.8 × 10⁻⁵ N/m (attractive)" },
          { id: "D", text: "1.2 × 10⁻⁵ N/m (repulsive)" },
        ],
        correctOption: "A",
        explanation: "$F/L = \\frac{\\mu_0 I_1 I_2}{2\\pi d} = \\frac{(4\\pi \\times 10^{-7}) \\times 4 \\times 6}{2\\pi \\times 0.20} = 2 \\times 10^{-7} \\times \\frac{24}{0.20} = 2.4 \\times 10^{-5}\\text{ N/m}$. Same direction implies attractive.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_3_5",
        question: "A galvanometer of resistance 50 Ω gives full scale deflection for a current of 0.05 A. To convert it into an ammeter of range 0 to 5 A, the required shunt resistance is approximately:",
        type: "standard",
        options: [
          { id: "A", text: "0.505 Ω" },
          { id: "B", text: "0.500 Ω" },
          { id: "C", text: "5.0 Ω" },
          { id: "D", text: "2.5 Ω" },
        ],
        correctOption: "A",
        explanation: "Shunt $S = \\frac{I_g G}{I - I_g} = \\frac{0.05 \\times 50}{5 - 0.05} = \\frac{2.5}{4.95} \\approx 0.505\\,\\Omega$.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_3_6",
        question: "To convert the same galvanometer of resistance 50 Ω and full scale current 0.05 A into a voltmeter of range 0 to 10 V, the series resistance required is:",
        type: "standard",
        options: [
          { id: "A", text: "150 Ω" },
          { id: "B", text: "200 Ω" },
          { id: "C", text: "100 Ω" },
          { id: "D", text: "50 Ω" },
        ],
        correctOption: "A",
        explanation: "Series resistance $R = \\frac{V}{I_g} - G = \\frac{10}{0.05} - 50 = 200 - 50 = 150\\,\\Omega$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_3_7",
        question: "An electron and a proton having the same kinetic energy enter perpendicularly into a uniform magnetic field. The ratio of radius of electron's path to that of proton's path (r_e / r_p) is (m_p ≈ 1836 m_e):",
        type: "standard",
        options: [
          { id: "A", text: "1 / 1836" },
          { id: "B", text: "1 / √1836" },
          { id: "C", text: "√1836" },
          { id: "D", text: "1" },
        ],
        correctOption: "B",
        explanation: "$r = \\frac{\\sqrt{2mK}}{qB}$. Since $K, q, B$ are identical, $r \\propto \\sqrt{m}$. Thus $r_e / r_p = \\sqrt{m_e / m_p} = 1 / \\sqrt{1836}$.",
        difficulty: "hard",
      },
      {
        id: "pq_phys_3_8",
        question: "A current loop placed in a magnetic field behaves as a magnetic dipole of moment m = IA. The torque acting on it is maximum when the angle between the normal to the loop and the magnetic field is:",
        type: "standard",
        options: [
          { id: "A", text: "0°" },
          { id: "B", text: "45°" },
          { id: "C", text: "90°" },
          { id: "D", text: "180°" },
        ],
        correctOption: "C",
        explanation: "Torque $\\tau = m B \\sin\\theta$. Maximum torque $\\tau_{\\text{max}} = mB$ occurs when $\\theta = 90^\\circ$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_3_9",
        question: "Assertion (A): Increasing the current sensitivity of a galvanometer may not necessarily increase its voltage sensitivity.\nReason (R): If the number of turns N is doubled, resistance of the coil also doubles, keeping voltage sensitivity (N B A / (k R)) constant.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Current sensitivity $I_s = \\frac{NBA}{k}$ is proportional to $N$. But coil resistance $R \\propto N$. Voltage sensitivity $V_s = \\frac{I_s}{R} = \\frac{NBA}{kR}$ remains unchanged.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_3_10",
        question: "A closely wound solenoid of 800 turns and area of cross section 2.5 × 10⁻⁴ m² carries a current of 3.0 A. Its magnetic dipole moment is:",
        type: "standard",
        options: [
          { id: "A", text: "0.60 J/T or A·m²" },
          { id: "B", text: "0.30 A·m²" },
          { id: "C", text: "1.20 A·m²" },
          { id: "D", text: "0.15 A·m²" },
        ],
        correctOption: "A",
        explanation: "$m = N I A = 800 \\times 3.0\\text{ A} \\times (2.5 \\times 10^{-4}\\text{ m}^2) = 2400 \\times 2.5 \\times 10^{-4} = 0.60\\text{ A}\\cdot\\text{m}^2$.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "Current Electricity", slug: "electric-current-ohms-law-kirchhoffs-laws-potentiometer-meter-bridge" },
      ],
      relatedTopics: [
        { title: "Magnetism and Matter", slug: "magnetism-and-matter-magnetic-dipole-galvanometer" },
        { title: "Electromagnetic Induction", slug: "faradays-and-lenzs-law" },
      ],
      practiceTestId: "practice-physics-unit3-test1",
      practiceTestUrl: "/test/practice-physics-unit3-test1",
      weaknessReportUrl: "/dashboard/radar?subject=physics",
    },
    subjectSpecific: {
      physics: {
        examinableDerivations: [
          {
            title: "Conversion of Galvanometer into Ammeter",
            briefSteps: [
              "A galvanometer of resistance $G$ and full scale current $I_g$ is converted into an ammeter of range $I$ by connecting a small resistance $S$ (shunt) in parallel.",
              "Potential difference across $G$ equals potential difference across $S$:",
              "$V_G = V_S \\implies I_g G = (I - I_g) S$.",
              "Solving for shunt resistance: $S = \\frac{I_g G}{I - I_g}$.",
              "Equivalent resistance of ammeter: $R_A = \\frac{G S}{G + S} \\approx S$ (very low, ideal is zero).",
            ],
          },
        ],
        unitDimensionTable: [
          { quantity: "Magnetic Field (B)", dimension: "[M T⁻² A⁻¹]", unit: "Tesla (T) or Wb/m²" },
          { quantity: "Magnetic Permeability (μ₀)", dimension: "[M L T⁻² A⁻²]", unit: "T·m/A or H/m" },
          { quantity: "Magnetic Dipole Moment (m)", dimension: "[L² A]", unit: "A·m² or J/T" },
        ],
        graphInterpretations: [
          {
            graphName: "B vs x for Circular Coil Axis",
            slopeMeaning: "Rate of change of magnetic field along axis",
            areaMeaning: "Line integral of B",
            keyFeature: "Symmetric bell-shaped curve with max at x = 0 (B = μ₀NI/2R); points of inflection at x = ±R/2 (Helmholtz condition).",
          },
        ],
      },
    },
    metadata: {
      confidence: "high",
      needsHumanReview: false,
      lastUpdated: new Date().toISOString(),
      version: 1,
      wordCount: 1580,
      isFreePreview: false,
    },
  },
  {
    id: "physics_u3_t2",
    slug: "magnetism-and-matter-magnetic-dipole-galvanometer",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 3,
    unitTitle: "Magnetic Effects of Current and Magnetism",
    topicTitle: "Magnetism and Matter, Magnetic Dipole, Galvanometer",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 1",
      chapterNumber: 5,
      chapterName: "Magnetism and Matter",
      sections: [
        "5.2 The Bar Magnet",
        "5.3 Magnetism and Gauss's Law",
        "5.4 The Earth's Magnetism",
        "5.5 Magnetisation and Magnetic Intensity",
        "5.6 Magnetic Properties of Materials",
        "5.7 Permanent Magnets and Electromagnets",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in ~80% of shifts: Dia/Para/Ferro properties and Earth magnetic elements tested frequently",
      totalPyqsInRepo: 38,
      weightagePercentage: 4.5,
    },
    summary30Seconds: [
      "Bar magnet acts as equivalent solenoid of magnetic dipole moment $M = m \\times 2l = N I A$. Axial field $B = \\frac{\\mu_0}{4\\pi}\\frac{2M}{r^3}$; Equatorial field $B = \\frac{\\mu_0}{4\\pi}\\frac{M}{r^3}$.",
      "Gauss's Law for Magnetism: $\\oint \\vec{B} \\cdot d\\vec{A} = 0$. Signifies that isolated magnetic monopoles do not exist; magnetic field lines form continuous closed loops.",
      "Earth's Magnetic Elements: (1) Magnetic Declination $\\theta$, (2) Angle of Dip $\\delta$ ($\\tan\\delta = B_V / B_H$), (3) Horizontal Component $B_H = B \\cos\\delta$. At magnetic equator $\\delta = 0^\\circ$; at magnetic poles $\\delta = 90^\\circ$.",
      "Magnetic Materials: Diamagnetic ($\\chi < 0, \\mu_r < 1$, repelled by magnet, independent of $T$), Paramagnetic ($\\chi > 0$ small, $\\chi \\propto 1/T$ Curie's law, weakly attracted), Ferromagnetic ($\\chi \\gg 1, \\mu_r \\gg 1$, strongly attracted, domains align, becomes paramagnetic above Curie temperature $T_c$).",
      "Electromagnets require high permeability $\\mu$ and low retentivity (soft iron); Permanent magnets require high retentivity and high coercivity (steel, Alnico).",
    ],
    coreConcepts: [
      {
        title: "Bar Magnet, Gauss's Law & Earth's Magnetism",
        content:
          "A bar magnet of length $2l$ and pole strength $q_m$ has magnetic dipole moment $\\vec{M} = q_m (2l) \\hat{M}$ pointing from South pole to North pole inside the magnet.\n\n**Gauss's Law for Magnetism:**\n$$\\oint_S \\vec{B} \\cdot d\\vec{A} = 0$$\nThere are no sources or sinks of magnetic field. Isolated magnetic charges (monopoles) have never been observed.\n\n**Earth's Magnetic Field Elements:**\n1. **Magnetic Declination ($\\theta$):** Angle between true geographic meridian and magnetic meridian.\n2. **Angle of Dip or Inclination ($\\delta$):** Angle made by total Earth field $\\vec{B}$ with horizontal.\n   - $B_H = B \\cos\\delta$\n   - $B_V = B \\sin\\delta$\n   - $\\tan\\delta = \\frac{B_V}{B_H}, \\quad B = \\sqrt{B_H^2 + B_V^2}$\n   - At **Magnetic Poles:** $\\delta = 90^\\circ \\implies B_H = 0, B_V = B$.\n   - At **Magnetic Equator:** $\\delta = 0^\\circ \\implies B_V = 0, B_H = B$.",
      },
      {
        title: "Classification of Magnetic Materials",
        content:
          "When a material is placed in magnetising field $\\vec{H}$, total magnetic induction is $\\vec{B} = \\mu_0(\\vec{H} + \\vec{M}) = \\mu_0(1 + \\chi)\\vec{H} = \\mu_r \\mu_0 \\vec{H}$.\n\n1. **Diamagnetic Materials (Bi, Cu, Pb, H₂O, N₂ at STP):**\n   - Induced dipole moment is opposite to applied field.\n   - Susceptibility $\\chi$ is small and negative ($-1 \\le \\chi < 0$).\n   - Relative permeability $\\mu_r < 1$.\n   - Independent of temperature (Curie's law does not apply).\n   - Superconductors exhibit perfect diamagnetism with $\\chi = -1, \\mu_r = 0, B = 0$ (Meissner Effect).\n\n2. **Paramagnetic Materials (Al, Na, Ca, O₂ at STP, FeCl₃):**\n   - Permanent atomic magnetic dipoles align weakly with applied field.\n   - Susceptibility $\\chi$ is small and positive ($0 < \\chi < \\varepsilon$).\n   - Obeys Curie's Law: $\\chi = \\frac{C}{T}$.\n   - $\\mu_r$ is slightly greater than 1.\n\n3. **Ferromagnetic Materials (Fe, Co, Ni, Gd, Alnico):**\n   - Possess spontaneous domain structure.\n   - $\\chi \\gg 1$ and $\\mu_r \\gg 1$.\n   - Above Curie Temperature $T_c$, ferromagnets transition into paramagnets obeying Curie-Weiss law: $\\chi = \\frac{C}{T - T_c}$ for $T > T_c$.",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Earth's Field Relation",
        formula: "\\tan\\delta = \\frac{B_V}{B_H}, \\quad B = \\sqrt{B_H^2 + B_V^2}",
        symbols: "\\delta: angle of dip, B_H: horizontal component, B_V: vertical",
        siUnits: "Tesla (T)",
        applicationCondition: "Any point on Earth's surface",
      },
      {
        name: "Curie's Law for Paramagnetism",
        formula: "\\chi = \\frac{C}{T}",
        symbols: "C: Curie constant, T: temperature in Kelvin",
        siUnits: "Dimensionless",
        applicationCondition: "Paramagnetic substances far from saturation",
      },
      {
        name: "Curie-Weiss Law",
        formula: "\\chi = \\frac{C}{T - T_c} \\quad (T > T_c)",
        symbols: "T_c: Curie temperature",
        siUnits: "Dimensionless",
        applicationCondition: "Ferromagnetic materials above Curie temperature",
      },
      {
        name: "Magnetic Susceptibility Relation",
        formula: "\\mu_r = 1 + \\chi",
        symbols: "\\mu_r: relative permeability, \\chi: susceptibility",
        siUnits: "Dimensionless",
        applicationCondition: "Linear isotropic magnetic media",
      },
    ],
    diagram: {
      type: "svg",
      title: "Earth's Magnetic Elements & Domain Structure",
      caption: "Resolution of Earth's magnetic field into Horizontal (B_H) and Vertical (B_V) components with dip angle δ, and ferromagnetic domain alignment under external field.",
      code: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <marker id="arrE" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
    </marker>
    <marker id="arrRedE" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
    </marker>
  </defs>
  <!-- Left panel: Earth Magnetic Elements -->
  <rect x="15" y="10" width="350" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="190" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Earth's Magnetic Elements</text>

  <!-- Horizontal line -->
  <line x1="60" y1="90" x2="300" y2="90" stroke="#64748B" strokeWidth="2"/>
  <text x="315" y="94" fill="#64748B" fontSize="11" fontWeight="bold">Horizontal</text>

  <!-- Total Field B vector downward -->
  <line x1="100" y1="90" x2="260" y2="190" stroke="#DC2626" strokeWidth="3" markerEnd="url(#arrRedE)"/>
  <text x="270" y="185" fill="#DC2626" fontSize="13" fontWeight="bold">B⃗_total</text>

  <!-- Components -->
  <line x1="100" y1="90" x2="260" y2="90" stroke="#2563EB" strokeWidth="2.5" markerEnd="url(#arrE)"/>
  <text x="180" y="80" fill="#2563EB" fontSize="12" fontWeight="bold">B_H = B cos δ</text>

  <line x1="260" y1="90" x2="260" y2="190" stroke="#059669" strokeWidth="2" strokeDasharray="3 3"/>
  <line x1="100" y1="90" x2="100" y2="190" stroke="#059669" strokeWidth="2.5" markerEnd="url(#arrE)"/>
  <text x="45" y="145" fill="#059669" fontSize="12" fontWeight="bold">B_V = B sin δ</text>

  <!-- Angle delta arc -->
  <path d="M 150 90 A 50 50 0 0 1 145 118" fill="none" stroke="#DC2626" strokeWidth="2"/>
  <text x="160" y="110" fill="#DC2626" fontSize="13" fontWeight="bold">δ</text>
  <text x="190" y="225" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">tan δ = B_V / B_H</text>

  <!-- Right panel: Dia vs Para vs Ferro -->
  <rect x="380" y="10" width="365" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="562" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Magnetic Material Behavior</text>

  <rect x="400" y="55" width="95" height="130" rx="8" fill="#FEE2E2" stroke="#DC2626"/>
  <text x="447" y="75" textAnchor="middle" fill="#991B1B" fontSize="11" fontWeight="bold">Diamagnetic</text>
  <text x="447" y="100" textAnchor="middle" fill="#7F1D1D" fontSize="10">χ &lt; 0 (weakly −)</text>
  <text x="447" y="120" textAnchor="middle" fill="#7F1D1D" fontSize="10">μ_r &lt; 1</text>
  <text x="447" y="140" textAnchor="middle" fill="#7F1D1D" fontSize="10">Repelled</text>
  <text x="447" y="160" textAnchor="middle" fill="#7F1D1D" fontSize="10">Bi, Cu, H₂O</text>

  <rect x="515" y="55" width="95" height="130" rx="8" fill="#DBEAFE" stroke="#2563EB"/>
  <text x="562" y="75" textAnchor="middle" fill="#1E40AF" fontSize="11" fontWeight="bold">Paramagnetic</text>
  <text x="562" y="100" textAnchor="middle" fill="#1E3A8A" fontSize="10">χ &gt; 0 (weakly +)</text>
  <text x="562" y="120" textAnchor="middle" fill="#1E3A8A" fontSize="10">μ_r &gt; 1</text>
  <text x="562" y="140" textAnchor="middle" fill="#1E3A8A" fontSize="10">Attracted</text>
  <text x="562" y="160" textAnchor="middle" fill="#1E3A8A" fontSize="10">Al, O₂, Na</text>

  <rect x="630" y="55" width="95" height="130" rx="8" fill="#DCFCE7" stroke="#16A34A"/>
  <text x="677" y="75" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Ferromagnetic</text>
  <text x="677" y="100" textAnchor="middle" fill="#14532D" fontSize="10">χ ≫ 1 (huge)</text>
  <text x="677" y="120" textAnchor="middle" fill="#14532D" fontSize="10">μ_r ≫ 1</text>
  <text x="677" y="140" textAnchor="middle" fill="#14532D" fontSize="10">Strongly Attracted</text>
  <text x="677" y="160" textAnchor="middle" fill="#14532D" fontSize="10">Fe, Co, Ni</text>
</svg>`,
    },
    workedExamples: [
      {
        id: "we_phys_3_2",
        questionNumber: 1,
        question:
          "At a certain location in India, the horizontal component of Earth's magnetic field is 0.3 Gauss and the angle of dip is 60°. The total magnetic field of the Earth at this location is:",
        options: [
          { id: "A", text: "0.15 Gauss" },
          { id: "B", text: "0.60 Gauss" },
          { id: "C", text: "0.52 Gauss" },
          { id: "D", text: "0.30 Gauss" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Formula connecting total field $B$ and horizontal component $B_H$: $B_H = B \\cos\\delta$.",
          "Step 2: Solve for $B$: $B = \\frac{B_H}{\\cos\\delta} = \\frac{0.3\\text{ G}}{\\cos(60^\\circ)} = \\frac{0.3}{0.5} = 0.60\\text{ Gauss}$.",
          "Hence, Option B is correct.",
        ],
        cuetTip: "Remember $\\cos(60^\\circ) = 0.5$. Since $B_H = B/2$, $B = 2 B_H = 0.60\\text{ G}$.",
      },
      {
        id: "we_phys_3_3",
        questionNumber: 2,
        question:
          "A bar magnet of magnetic dipole moment 5.0 A·m² is placed in a uniform magnetic field of 0.4 T with its dipole moment making an angle of 30° with the field. What is the magnitude of the torque acting on it?",
        options: [
          { id: "A", text: "1.0 N·m" },
          { id: "B", text: "2.0 N·m" },
          { id: "C", text: "1.73 N·m" },
          { id: "D", text: "0.5 N·m" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Formula for torque on magnetic dipole: $\\tau = M B \\sin\\theta$.",
          "Step 2: Substitute $M = 5.0\\text{ A}\\cdot\\text{m}^2$, $B = 0.4\\text{ T}$, and $\\theta = 30^\\circ$.",
          "Step 3: Calculate: $\\tau = 5.0 \\times 0.4 \\times \\sin(30^\\circ) = 2.0 \\times 0.5 = 1.0\\text{ N}\\cdot\\text{m}$.",
        ],
        cuetTip: "Torque is maximum when θ = 90° (τ_max = MB) and zero when aligned parallel or antiparallel to the field.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Angle of Dip at Poles and Equator",
        frequency: "Every year across all CUET domain tests",
        pyqExample: {
          question: "The value of the angle of dip at the magnetic equator and magnetic poles of the Earth are respectively:",
          options: [
            { id: "A", text: "0° and 90°" },
            { id: "B", text: "90° and 0°" },
            { id: "C", text: "45° and 45°" },
            { id: "D", text: "0° and 180°" },
          ],
          correctOption: "A",
          explanation: "At magnetic equator, field is purely horizontal ($B_V = 0 \\implies \\delta = 0^\\circ$). At magnetic poles, field is purely vertical ($B_H = 0 \\implies \\delta = 90^\\circ$).",
        },
        strategy: "Equator = Flat (0°). Poles = Vertical (90°).",
      },
      {
        type: "Magnetic Material Classification",
        frequency: "Very High",
        pyqExample: {
          question: "Which of the following substances exhibits temperature-independent negative magnetic susceptibility?",
          options: [
            { id: "A", text: "Bismuth" },
            { id: "B", text: "Aluminium" },
            { id: "C", text: "Iron" },
            { id: "D", text: "Nickel" },
          ],
          correctOption: "A",
          explanation: "Bismuth is a classic diamagnetic material with small negative susceptibility (χ < 0) that does not vary with temperature.",
        },
        strategy: "Negative susceptibility = Diamagnetic (Cu, Bi, Pb, H₂O).",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming diamagnetic materials depend on temperature.",
        whyWrong: "Diamagnetism arises from orbital motion of electrons and Lenz's law at atomic level, which is independent of thermal agitation. Curie's law applies ONLY to paramagnets.",
        correctUnderstanding: "Diamagnetic susceptibility is independent of temperature.",
        trapOptionExample: "Stating diamagnetic susceptibility is inversely proportional to temperature.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        mnemonic: "D-I-E: Diamagnets Independent of Energy/temp",
        rule: "Temperature dependence of diamagnetism",
        shortcut: "χ_dia does NOT change with T",
        whenToApply: "Assertion-reason and true/false questions on susceptibility",
      },
    ],
    quickRevisionCard: {
      title: "Magnetism & Matter — Quick Revision",
      bulletPoints: [
        "Gauss's Law for Magnetism: ∮ B⃗ · dA⃗ = 0 (No magnetic monopoles exist).",
        "Bar Magnet: M = q_m (2l); Axial: B = 2kM/r³; Equatorial: B = kM/r³ (where k = μ₀/4π).",
        "Earth's Elements: B_H = B cosδ, B_V = B sinδ, tanδ = B_V / B_H.",
        "Angle of Dip: δ = 0° at equator, δ = 90° at poles.",
        "Diamagnetic: χ < 0 (small), μ_r < 1; repelled; temperature independent.",
        "Paramagnetic: χ > 0 (small), μ_r > 1; attracted; Curie's Law χ = C/T.",
        "Ferromagnetic: χ ≫ 1, μ_r ≫ 1; strongly attracted; Curie-Weiss χ = C / (T − T_c).",
        "Above Curie temperature T_c: Ferromagnet transforms into Paramagnet.",
        "Electromagnet Core: High permeability, low retentivity (Soft iron).",
        "Permanent Magnet: High retentivity, high coercivity (Steel, Alnico).",
      ],
    },
    practiceQuestions: [
      {
        id: "pq_phys_3_11",
        question: "A material has a relative permeability μ_r = 0.9999. The material is:",
        type: "standard",
        options: [
          { id: "A", text: "Paramagnetic" },
          { id: "B", text: "Diamagnetic" },
          { id: "C", text: "Ferromagnetic" },
          { id: "D", text: "Non-magnetic" },
        ],
        correctOption: "B",
        explanation: "Since $\\mu_r < 1$ (specifically $\\chi = \\mu_r - 1 = -0.0001 < 0$), the material is diamagnetic.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_3_12",
        question: "Assertion (A): The magnetic field lines of a magnet form continuous closed loops.\nReason (R): Isolated magnetic poles (monopoles) do not exist in nature.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Because there are no magnetic monopoles, $\\oint \\vec{B} \\cdot d\\vec{A} = 0$, requiring every field line that leaves to loop back and form a closed path.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_3_13",
        question: "Match List I (Magnetic Material) with List II (Magnetic Susceptibility χ):\nList I: (A) Superconductor, (B) Copper (Diamagnetic), (C) Aluminium (Paramagnetic), (D) Iron (Ferromagnetic)\nList II: (I) Small and positive (~ +10⁻⁵), (II) Very large (~ 10³ - 10⁵), (III) Exactly −1, (IV) Small and negative (~ −10⁻⁵)",
        type: "match-the-following",
        options: [
          { id: "A", text: "A-(III), B-(IV), C-(I), D-(II)" },
          { id: "B", text: "A-(IV), B-(III), C-(I), D-(II)" },
          { id: "C", text: "A-(III), B-(I), C-(IV), D-(II)" },
          { id: "D", text: "A-(II), B-(IV), C-(I), D-(III)" },
        ],
        correctOption: "A",
        explanation: "Superconductor has $\\chi = -1$ (perfect diamagnet, III). Copper has small negative $\\chi$ (IV). Aluminium has small positive $\\chi$ (I). Iron has very large $\\chi$ (II).",
        difficulty: "medium",
      },
      {
        id: "pq_phys_3_14",
        question: "At a certain place on Earth, the horizontal and vertical components of Earth's magnetic field are equal. The angle of dip at that place is:",
        type: "standard",
        options: [
          { id: "A", text: "0°" },
          { id: "B", text: "30°" },
          { id: "C", text: "45°" },
          { id: "D", text: "90°" },
        ],
        correctOption: "C",
        explanation: "tan δ = B_V / B_H. If B_V = B_H, tan δ = 1 ⇒ δ = 45°.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_3_15",
        question: "Assertion (A): Diamagnetic materials do not obey Curie's law.\nReason (R): Diamagnetism arises from the orbital motion of electrons inducing opposing magnetic moments, which is an intrinsic atomic property independent of thermal agitation.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Diamagnetism is temperature-independent because it relies on induced orbital motion, unlike paramagnetism which relies on the alignment of permanent dipoles against thermal disorientation.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_3_16",
        question: "A compass needle which is allowed to rotate in a vertical plane oriented in the magnetic meridian will point:",
        type: "standard",
        options: [
          { id: "A", text: "Vertically downwards at the magnetic equator" },
          { id: "B", text: "Horizontally at the magnetic poles" },
          { id: "C", text: "Vertically downwards at the magnetic north pole" },
          { id: "D", text: "At an angle of 45° at all places on Earth" },
        ],
        correctOption: "C",
        explanation: "At the magnetic north pole, the angle of dip δ = 90° and horizontal component B_H = 0, so the dip needle points vertically downwards.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_3_17",
        question: "Which of the following characteristics is essential for the material used to construct the core of an electromagnet?",
        type: "standard",
        options: [
          { id: "A", text: "High permeability and high retentivity" },
          { id: "B", text: "High permeability and low retentivity" },
          { id: "C", text: "Low permeability and high coercivity" },
          { id: "D", text: "Low permeability and low retentivity" },
        ],
        correctOption: "B",
        explanation: "Electromagnets require soft iron cores having high magnetic permeability (to generate large field with small current) and low retentivity/coercivity (so magnetism vanishes when current is switched off).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_3_18",
        question: "The magnetic susceptibility of a paramagnetic substance at -73°C is 0.0060. What will be its susceptibility at -173°C?",
        type: "standard",
        options: [
          { id: "A", text: "0.0030" },
          { id: "B", text: "0.0060" },
          { id: "C", text: "0.0120" },
          { id: "D", text: "0.0180" },
        ],
        correctOption: "C",
        explanation: "By Curie's Law, χ ∝ 1/T. T₁ = 273 - 73 = 200 K; T₂ = 273 - 173 = 100 K. χ₂ / χ₁ = T₁ / T₂ = 200 / 100 = 2 ⇒ χ₂ = 2 × 0.0060 = 0.0120.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_3_19",
        question: "When a diamagnetic rod is freely suspended in a uniform magnetic field, it aligns itself:",
        type: "standard",
        options: [
          { id: "A", text: "Parallel to the magnetic field" },
          { id: "B", text: "Perpendicular to the magnetic field" },
          { id: "C", text: "At 45° to the magnetic field" },
          { id: "D", text: "Continuously rotates without coming to rest" },
        ],
        correctOption: "B",
        explanation: "Diamagnetic materials are expelled from stronger to weaker field regions, so the rod sets itself perpendicular to the magnetic field lines.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_3_20",
        question: "Above the Curie temperature, a ferromagnetic material becomes:",
        type: "standard",
        options: [
          { id: "A", text: "Diamagnetic" },
          { id: "B", text: "Paramagnetic" },
          { id: "C", text: "Superconducting" },
          { id: "D", text: "Non-magnetic insulator" },
        ],
        correctOption: "B",
        explanation: "Above the Curie temperature T_c, thermal agitation destroys domain alignment, transforming the ferromagnetic material into a paramagnetic material obeying the Curie-Weiss law.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "Moving Charges and Magnetism", slug: "moving-charges-and-magnetism" },
      ],
      relatedTopics: [
        { title: "Electromagnetic Induction", slug: "faradays-and-lenzs-law" },
      ],
      practiceTestId: "practice-physics-unit3-test2",
      practiceTestUrl: "/test/practice-physics-unit3-test2",
      weaknessReportUrl: "/dashboard/radar?subject=physics",
    },
    subjectSpecific: {
      physics: {
        unitDimensionTable: [
          { quantity: "Magnetic Intensity (H)", dimension: "[L⁻¹ A]", unit: "A/m" },
          { quantity: "Intensity of Magnetisation (M)", dimension: "[L⁻¹ A]", unit: "A/m" },
          { quantity: "Magnetic Susceptibility (χ)", dimension: "[M⁰ L⁰ T⁰ A⁰]", unit: "Dimensionless" },
        ],
      },
    },
    metadata: {
      confidence: "high",
      needsHumanReview: false,
      lastUpdated: new Date().toISOString(),
      version: 1,
      wordCount: 1420,
      isFreePreview: false,
    },
  },
];
