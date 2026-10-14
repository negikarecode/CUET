import { NoteDocument } from "@/types/notes";

export const unit4Topics: NoteDocument[] = [
  {
    id: "physics_u4_t1",
    slug: "faradays-and-lenzs-law",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 4,
    unitTitle: "Electromagnetic Induction and Alternating Currents",
    topicTitle: "Faraday's & Lenz's Law",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 1",
      chapterNumber: 6,
      chapterName: "Electromagnetic Induction",
      sections: [
        "6.2 The Experiments of Faraday and Henry",
        "6.3 Magnetic Flux",
        "6.4 Faraday's Law of Induction",
        "6.5 Lenz's Law and Conservation of Energy",
        "6.6 Motional Electromotive Force",
        "6.7 Energy Consideration: A Quantitative Study",
        "6.8 Eddy Currents",
        "6.9 Inductance (Self and Mutual Inductance)",
        "6.10 AC Generator",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "2-3 questions per shift: Motional EMF e = Bvl, Self/Mutual Inductance, and Lenz's law directions",
      totalPyqsInRepo: 54,
      weightagePercentage: 6.2,
    },
    summary30Seconds: [
      "Magnetic flux $\\Phi_B = \\vec{B} \\cdot \\vec{A} = B A \\cos\\theta$; Faraday's Law: Induced EMF $\\varepsilon = -N \\frac{d\\Phi_B}{dt}$.",
      "Lenz's Law: Induced current always opposes the very cause (change in flux) producing it. Manifests Conservation of Energy.",
      "Motional EMF: A conducting rod of length $l$ moving with velocity $v$ perpendicular to uniform field $B$ develops EMF $\\varepsilon = B v l$. Rotating rod about one end: $\\varepsilon = \\frac{1}{2} B \\omega l^2$.",
      "Self-inductance: $\\Phi = L I \\implies \\varepsilon = -L \\frac{dI}{dt}$; Solenoid $L = \\mu_0 n^2 A l$; Energy stored in inductor $U = \\frac{1}{2} L I^2$.",
      "Mutual inductance between two coaxial solenoids: $M = \\mu_0 n_1 n_2 A l = k \\sqrt{L_1 L_2}$; Coupling factor $k \\le 1$.",
    ],
    coreConcepts: [
      {
        title: "Faraday's Laws & Lenz's Law Mechanics",
        content:
          "Magnetic flux through area $A$ is $\\Phi_B = \\int \\vec{B} \\cdot d\\vec{A}$. The induced EMF in a closed loop is:\n$$\\varepsilon = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(B A \\cos\\theta)$$\nEMF can be induced by three methods: changing $B$, changing $A$, or changing orientation $\\theta$ (basis of AC generators).\n\n**Lenz's Law & Conservation of Energy:**\nThe negative sign in Faraday's law represents Lenz's Law. When a North pole approaches a coil, an induced current flows counter-clockwise (viewed from outside) to create a North pole repelling the approaching magnet. The mechanical work done against this repulsive force is converted into electrical energy.",
      },
      {
        title: "Motional EMF & Eddy Currents",
        content:
          "When a conductor of length $l$ moves at speed $v$ across a perpendicular magnetic field $B$:\n$$\\varepsilon = B v l$$\n- Induced current: $I = \\frac{\\varepsilon}{R} = \\frac{B v l}{R}$.\n- External force required to keep velocity constant: $F = I l B = \\frac{B^2 l^2 v}{R}$.\n- Power dissipated: $P = F v = I^2 R = \\frac{B^2 l^2 v^2}{R}$. Mechanical power completely matches Joule heating!\n\n**Rotating Rod:** If a rod of length $l$ rotates with angular frequency $\\omega$ in field $B$:\n$$\\varepsilon = \\int_0^l B (\\omega r) dr = \\frac{1}{2} B \\omega l^2$$\n\n**Eddy Currents:** Circulating currents induced in bulk conductors when exposed to changing magnetic flux. Minimized by using laminated cores (e.g. in transformers). Useful in induction furnaces, electromagnetic damping, and electric brakes.",
      },
      {
        title: "Self and Mutual Inductance",
        content:
          "**Self-Inductance (L):** Flux through coil due to its own current is $\\Phi = L I$. Induced back-EMF is $\\varepsilon = -L \\frac{dI}{dt}$.\n- Long solenoid of radius $r$, length $l$, and $N$ turns: $L = \\mu_0 \\frac{N^2}{l} A = \\mu_0 n^2 A l$.\n- Energy stored in magnetic field: $U = \\frac{1}{2} L I^2$; Magnetic energy density: $u_B = \\frac{B^2}{2\\mu_0}$.\n\n**Mutual Inductance (M):** $\\Phi_2 = M I_1 \\implies \\varepsilon_2 = -M \\frac{dI_1}{dt}$.\n- Reciprocity Theorem: $M_{12} = M_{21} = M$.\n- Two coaxial solenoids: $M = \\mu_0 n_1 n_2 A l$. Coupling coefficient $k = \\frac{M}{\\sqrt{L_1 L_2}}$ ($0 \\le k \\le 1$).",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Faraday-Lenz Law",
        formula: "\\varepsilon = -N \\frac{d\\Phi_B}{dt}",
        symbols: "N: turns, \\Phi_B: magnetic flux",
        siUnits: "Volts (V)",
        applicationCondition: "Any loop with time-varying magnetic flux",
      },
      {
        name: "Motional EMF (Straight Conductor)",
        formula: "\\varepsilon = B v l",
        symbols: "B, v, l mutually perpendicular",
        siUnits: "Volts (V)",
        applicationCondition: "Translational motion across uniform field",
      },
      {
        name: "Motional EMF (Rotating Rod)",
        formula: "\\varepsilon = \\frac{1}{2} B \\omega l^2",
        symbols: "\\omega: angular velocity, l: length from pivot",
        siUnits: "Volts (V)",
        applicationCondition: "Rod rotated about one end perpendicular to field",
      },
      {
        name: "Self-Inductance of Solenoid",
        formula: "L = \\mu_0 n^2 A l = \\frac{\\mu_0 N^2 A}{l}",
        symbols: "n = N/l: turns per unit length, A: area, l: length",
        siUnits: "Henry (H)",
        applicationCondition: "Air-core long solenoid",
      },
      {
        name: "Energy Stored in Inductor",
        formula: "U = \\frac{1}{2} L I^2",
        symbols: "L: inductance, I: instantaneous current",
        siUnits: "Joules (J)",
        applicationCondition: "Current carrying inductor in steady state",
      },
    ],
    diagram: {
      type: "svg",
      title: "Motional EMF Rod & Faraday Coil Induction",
      caption: "Left: Conductor sliding on rails in a perpendicular magnetic field generating motional EMF Bvl. Right: Magnet approaching a coil inducing opposing magnetic polarity (Lenz's Law).",
      code: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <marker id="arrInd" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
    </marker>
    <marker id="arrRedInd" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
    </marker>
  </defs>
  <!-- Left Panel: Motional EMF Rails -->
  <rect x="15" y="10" width="350" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="190" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Motional EMF: Sliding Rod on Rails</text>

  <!-- Rails -->
  <line x1="50" y1="80" x2="310" y2="80" stroke="#64748B" strokeWidth="3"/>
  <line x1="50" y1="180" x2="310" y2="180" stroke="#64748B" strokeWidth="3"/>
  <line x1="50" y1="80" x2="50" y2="180" stroke="#64748B" strokeWidth="3"/>
  <rect x="42" y="115" width="16" height="30" fill="#EF4444" rx="2"/>
  <text x="32" y="134" fill="#EF4444" fontSize="10" fontWeight="bold">R</text>

  <!-- Inward Magnetic field symbols (crosses) -->
  <text x="100" y="105" fill="#94A3B8" fontSize="14">⊗</text>
  <text x="150" y="105" fill="#94A3B8" fontSize="14">⊗</text>
  <text x="100" y="160" fill="#94A3B8" fontSize="14">⊗</text>
  <text x="150" y="160" fill="#94A3B8" fontSize="14">⊗</text>
  <text x="260" y="105" fill="#94A3B8" fontSize="14">⊗ B⃗</text>

  <!-- Sliding rod -->
  <rect x="190" y="70" width="10" height="120" fill="#2563EB" rx="2"/>
  <text x="195" y="62" textAnchor="middle" fill="#2563EB" fontSize="11" fontWeight="bold">Rod (l)</text>
  <line x1="205" y1="130" x2="265" y2="130" stroke="#DC2626" strokeWidth="2.5" markerEnd="url(#arrRedInd)"/>
  <text x="240" y="122" fill="#DC2626" fontSize="12" fontWeight="bold">v⃗</text>

  <!-- Induced current direction -->
  <line x1="195" y1="170" x2="195" y2="90" stroke="#059669" strokeWidth="2" markerEnd="url(#arrInd)"/>
  <text x="175" y="135" fill="#059669" fontSize="11" fontWeight="bold">I</text>
  <text x="190" y="222" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="bold">ε = B v l (Counter-Clockwise)</text>

  <!-- Right Panel: Lenz Law Magnet and Coil -->
  <rect x="380" y="10" width="365" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="562" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Lenz's Law: Approaching Magnet</text>

  <!-- Bar magnet moving left -->
  <rect x="580" y="90" width="55" height="30" fill="#EF4444" rx="2"/>
  <text x="607" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">N</text>
  <rect x="635" y="90" width="55" height="30" fill="#3B82F6" rx="2"/>
  <text x="662" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">S</text>
  <line x1="570" y1="105" x2="520" y2="105" stroke="#DC2626" strokeWidth="2.5" markerEnd="url(#arrRedInd)"/>
  <text x="545" y="98" fill="#DC2626" fontSize="12" fontWeight="bold">v⃗</text>

  <!-- Coil -->
  <ellipse cx="440" cy="105" rx="14" ry="50" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.5"/>
  <text x="440" y="45" textAnchor="middle" fill="#2563EB" fontSize="11" fontWeight="bold">Coil Face</text>
  <text x="440" y="110" textAnchor="middle" fill="#DC2626" fontSize="16" fontWeight="bold">N</text>
  <text x="562" y="175" textAnchor="middle" fill="#475569" fontSize="11">Induced current forms N-pole to oppose approach</text>
  <text x="562" y="222" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="bold">Work done = Electrical Energy (Energy Conserved)</text>
</svg>`,
    },
    workedExamples: [
      {
        id: "we_phys_4_1",
        questionNumber: 1,
        question:
          "A 1.0 m long metallic rod is rotated with an angular frequency of 400 rad/s about an axis normal to the rod passing through its one end. The other end of the rod is in contact with a circular metallic ring. A constant and uniform magnetic field of 0.5 T parallel to the axis exists everywhere. The EMF developed between the center and the metallic ring is:",
        options: [
          { id: "A", text: "50 V" },
          { id: "B", text: "100 V" },
          { id: "C", text: "200 V" },
          { id: "D", text: "25 V" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Formula for induced EMF in rotating conductor about one end: $\\varepsilon = \\frac{1}{2} B \\omega l^2$.",
          "Step 2: Given $B = 0.5\\text{ T}$, $\\omega = 400\\text{ rad/s}$, $l = 1.0\\text{ m}$.",
          "Step 3: $\\varepsilon = \\frac{1}{2} \\times 0.5 \\times 400 \\times (1.0)^2 = 0.25 \\times 400 = 100\\text{ V}$.",
          "Hence, Option B is correct.",
        ],
        cuetTip: "Average linear speed of the rotating rod is $v_{\\text{avg}} = \\frac{0 + \\omega l}{2} = \\frac{\\omega l}{2}$. Motional EMF is $\\varepsilon = B v_{\\text{avg}} l = \\frac{1}{2} B \\omega l^2$.",
      },
      {
        id: "we_phys_4_2",
        questionNumber: 2,
        question:
          "Current in a circuit falls from 5.0 A to 0.0 A in 0.1 s. If an average EMF of 200 V is induced, give an estimate of the self-inductance of the circuit.",
        options: [
          { id: "A", text: "2 H" },
          { id: "B", text: "4 H" },
          { id: "C", text: "8 H" },
          { id: "D", text: "1 H" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Formula for induced EMF due to self-inductance: $\\varepsilon = -L \\frac{\\Delta I}{\\Delta t}$.",
          "Step 2: Here $\\varepsilon = 200\\text{ V}$, $\\Delta I = 0 - 5 = -5\\text{ A}$, $\\Delta t = 0.1\\text{ s}$.",
          "Step 3: $200 = -L \\frac{-5}{0.1} = 50 L \\implies L = \\frac{200}{50} = 4\\text{ H}$.",
        ],
        cuetTip: "Self-inductance L is always positive; the minus sign in Faraday's law accounts for Lenz opposition.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Physical Principle of Lenz's Law",
        frequency: "Guaranteed in ~60% of test shifts",
        pyqExample: {
          question: "Lenz's law of electromagnetic induction is a direct manifestation of the law of conservation of:",
          options: [
            { id: "A", text: "Charge" },
            { id: "B", text: "Energy" },
            { id: "C", text: "Momentum" },
            { id: "D", text: "Angular Momentum" },
          ],
          correctOption: "B",
          explanation: "Mechanical work done against opposing induced magnetic forces is directly transformed into electrical energy. If Lenz's law did not oppose, perpetual energy would be created from nothing.",
        },
        strategy: "Lenz's Law = Conservation of Energy (always!).",
      },
      {
        type: "Self & Mutual Inductance Ratios",
        frequency: "High",
        pyqExample: {
          question: "If the number of turns in a coil is doubled without altering its length or radius, its self-inductance becomes:",
          options: [
            { id: "A", text: "Doubled" },
            { id: "B", text: "Quadrupled" },
            { id: "C", text: "Halved" },
            { id: "D", text: "Four times smaller" },
          ],
          correctOption: "B",
          explanation: "L = μ₀ N² A / l. Since L ∝ N², doubling turns N multiplies self-inductance by 2² = 4.",
        },
        strategy: "Remember L ∝ N² (quadratic in turns!).",
      },
    ],
    commonTraps: [
      {
        misconception: "Using ε = Bvl for rotating rods without the factor of 1/2.",
        whyWrong: "Different segments of the rotating rod move with different linear speeds ($v = \\omega r$). Integrating over radius introduces factor 1/2.",
        correctUnderstanding: "Translating rod: $\\varepsilon = B v l$. Rotating rod about end: $\\varepsilon = \\frac{1}{2} B \\omega l^2$.",
        trapOptionExample: "Selecting 200 V instead of 100 V.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        mnemonic: "Lenz = Life: Opposes the very cause that gave it birth!",
        rule: "Lenz's Law direction rule",
        shortcut: "Induced current opposes change in flux (flux increasing -> oppose, flux decreasing -> support)",
        whenToApply: "Direction of induced current in coils and circuits",
      },
    ],
    quickRevisionCard: {
      title: "Electromagnetic Induction — Quick Revision",
      bulletPoints: [
        "Magnetic Flux: Φ_B = B⃗ · A⃗ = BA cosθ (Weber, Wb).",
        "Faraday's Law: ε = −N (dΦ_B / dt).",
        "Lenz's Law: Negative sign signifies opposition; conservation of energy.",
        "Translational Motional EMF: ε = Bvl (B, v, l mutually perpendicular).",
        "Rotational Motional EMF: ε = ½ Bωl².",
        "Self-Inductance: Φ = LI, ε = −L (dI/dt). Solenoid L = μ₀n²Al.",
        "Energy in Inductor: U = ½LI². Energy density u_B = B² / (2μ₀).",
        "Mutual Inductance: Φ₂ = MI₁, ε₂ = −M (dI₁/dt). Coaxial solenoids M = μ₀n₁n₂Al.",
        "Eddy currents: Circulate in bulk metal; minimized by lamination.",
        "AC Generator: ε = NBAω sin(ωt) = ε₀ sin(ωt).",
      ],
    },
    practiceQuestions: [
      {
        id: "pq_phys_4_1",
        question: "If current in an inductor of inductance 2.0 H decreases uniformly from 5 A to 0 A in 0.1 s, the induced EMF is:",
        type: "standard",
        options: [
          { id: "A", text: "100 V" },
          { id: "B", text: "50 V" },
          { id: "C", text: "25 V" },
          { id: "D", text: "10 V" },
        ],
        correctOption: "A",
        explanation: "$\\varepsilon = -L \\frac{\\Delta I}{\\Delta t} = -2.0 \\times \\left(\\frac{0 - 5}{0.1}\\right) = -2.0 \\times (-50) = 100\\text{ V}$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_2",
        question: "Assertion (A): Eddy currents cause undesirable heating in the core of transformers.\nReason (R): Eddy currents can be eliminated by replacing the solid metallic core with thin insulated laminated sheets.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "B",
        explanation: "Both statements are true. Lamination breaks closed current loops, reducing eddy current heat dissipation.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_3",
        question: "Match List I (Phenomenon) with List II (Formula / Law):\nList I: (A) Self-Inductance EMF, (B) Motional EMF of rotating rod, (C) Energy stored in inductor, (D) Faraday's Law\nList II: (I) ½ LI², (II) −L dI/dt, (III) ½ Bωl², (IV) −dΦ/dt",
        type: "match-the-following",
        options: [
          { id: "A", text: "A-(II), B-(III), C-(I), D-(IV)" },
          { id: "B", text: "A-(I), B-(II), C-(III), D-(IV)" },
          { id: "C", text: "A-(II), B-(I), C-(IV), D-(III)" },
          { id: "D", text: "A-(IV), B-(III), C-(I), D-(II)" },
        ],
        correctOption: "A",
        explanation: "Self inductance EMF is $-L dI/dt$ (II). Rotating rod EMF is $\\frac{1}{2}B\\omega l^2$ (III). Stored energy is $\\frac{1}{2}LI^2$ (I). Faraday's law is $-d\\Phi/dt$ (IV).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_1_4",
        question: "A copper ring is held horizontally and a bar magnet is dropped through the ring with its North pole pointing downwards. The acceleration of the falling magnet is:",
        type: "standard",
        options: [
          { id: "A", text: "Equal to g" },
          { id: "B", text: "Less than g while approaching and greater than g while receding" },
          { id: "C", text: "Less than g throughout the fall" },
          { id: "D", text: "Greater than g throughout the fall" },
        ],
        correctOption: "C",
        explanation: "By Lenz's law, the induced current in the ring opposes the motion of the magnet at all times (upward magnetic repulsion when approaching, upward magnetic attraction when receding), so a < g throughout.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_1_5",
        question: "Assertion (A): Lenz's law is a direct consequence of the law of conservation of energy.\nReason (R): The mechanical work done against the opposing induced electromagnetic force is converted into electrical energy in the circuit.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "If Lenz's law did not hold, a slight displacement would accelerate the magnet indefinitely without work, creating energy out of nothing, which violates the first law of thermodynamics.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_1_6",
        question: "A conducting rod of length 1 m is rotated in a horizontal plane with an angular speed of 100 rad/s about an axis passing through one end, perpendicular to a uniform vertical magnetic field of 0.2 T. The EMF induced across its ends is:",
        type: "standard",
        options: [
          { id: "A", text: "5 V" },
          { id: "B", text: "10 V" },
          { id: "C", text: "20 V" },
          { id: "D", text: "100 V" },
        ],
        correctOption: "B",
        explanation: "ε = ½ B ω l² = ½ × 0.2 × 100 × (1)² = 10 V.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_1_7",
        question: "The mutual inductance of two coaxial long solenoids of radii r₁ and r₂ (r₁ < r₂) having turns N₁ and N₂ and common length l is given by:",
        type: "standard",
        options: [
          { id: "A", text: "μ₀ N₁ N₂ π r₁² / l" },
          { id: "B", text: "μ₀ N₁ N₂ π r₂² / l" },
          { id: "C", text: "μ₀ N₁ N₂ π (r₁ + r₂)² / (2l)" },
          { id: "D", text: "μ₀ N₁² π r₁² / l" },
        ],
        correctOption: "A",
        explanation: "Magnetic flux of the outer solenoid links the smaller inner area π r₁² of the inner solenoid: M = μ₀ n₁ n₂ π r₁² l = μ₀ (N₁ N₂ / l) π r₁².",
        difficulty: "medium",
      },
      {
        id: "pq_phys_4_1_8",
        question: "When current in a circular coil of 50 turns changes from +2 A to -2 A in 0.05 s, an EMF of 8 V is induced. The self-inductance of the coil is:",
        type: "standard",
        options: [
          { id: "A", text: "0.1 H" },
          { id: "B", text: "0.2 H" },
          { id: "C", text: "0.05 H" },
          { id: "D", text: "0.4 H" },
        ],
        correctOption: "A",
        explanation: "|ε| = L |ΔI / Δt| ⇒ 8 = L × |(-2 - 2) / 0.05| = L × (4 / 0.05) = 80 L ⇒ L = 8 / 80 = 0.1 H.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_4_1_9",
        question: "A metallic square loop of side 10 cm and resistance 0.5 Ω is moved with a constant velocity of 2 m/s perpendicular to a uniform magnetic field of 0.5 T out of the field region. What is the induced current?",
        type: "standard",
        options: [
          { id: "A", text: "0.1 A" },
          { id: "B", text: "0.2 A" },
          { id: "C", text: "0.05 A" },
          { id: "D", text: "1.0 A" },
        ],
        correctOption: "B",
        explanation: "ε = B v l = 0.5 × 2 × 0.1 = 0.1 V. Induced current I = ε / R = 0.1 / 0.5 = 0.2 A.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_1_10",
        question: "Two coils have self-inductances L₁ = 4 mH and L₂ = 9 mH. If the coupling between them is perfect (coefficient of coupling k = 1), their mutual inductance is:",
        type: "standard",
        options: [
          { id: "A", text: "6 mH" },
          { id: "B", text: "13 mH" },
          { id: "C", text: "36 mH" },
          { id: "D", text: "2.25 mH" },
        ],
        correctOption: "A",
        explanation: "M = k √(L₁ L₂) = 1 × √(4 × 9) = √36 = 6 mH.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "Moving Charges and Magnetism", slug: "moving-charges-and-magnetism" },
      ],
      relatedTopics: [
        { title: "AC Circuits, Resonance, Power in AC, Transformers", slug: "ac-circuits-resonance-power-in-ac-transformers" },
      ],
      practiceTestId: "practice-physics-unit4-test1",
      practiceTestUrl: "/test/practice-physics-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=physics",
    },
    subjectSpecific: {
      physics: {
        unitDimensionTable: [
          { quantity: "Magnetic Flux (Φ_B)", dimension: "[M L² T⁻² A⁻¹]", unit: "Weber (Wb) or T·m²" },
          { quantity: "Self / Mutual Inductance (L, M)", dimension: "[M L² T⁻² A⁻²]", unit: "Henry (H)" },
        ],
      },
    },
    metadata: {
      confidence: "high",
      needsHumanReview: false,
      lastUpdated: new Date().toISOString(),
      version: 1,
      wordCount: 1490,
      isFreePreview: false,
    },
  },
  {
    id: "physics_u4_t2",
    slug: "ac-circuits-resonance-power-in-ac-transformers",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 4,
    unitTitle: "Electromagnetic Induction and Alternating Currents",
    topicTitle: "AC Circuits, Resonance, Power in AC, Transformers",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 1",
      chapterNumber: 7,
      chapterName: "Alternating Current",
      sections: [
        "7.2 AC Voltage Applied to a Resistor",
        "7.3 Representation of AC Current and Voltage by Rotating Vectors — Phasors",
        "7.4 AC Voltage Applied to an Inductor",
        "7.5 AC Voltage Applied to a Capacitor",
        "7.6 AC Voltage Applied to a Series LCR Circuit",
        "7.7 Power in AC Circuit: The Power Factor",
        "7.8 LC Oscillations",
        "7.9 Transformers",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of shifts: LCR series resonance, impedance triangle, power factor cosφ, and transformer turns ratio",
      totalPyqsInRepo: 68,
      weightagePercentage: 7.8,
    },
    summary30Seconds: [
      "RMS values: $V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0$, $I_{\\text{rms}} = \\frac{I_0}{\\sqrt{2}}$; AC meters measure RMS values, not peak.",
      "Reactance: Inductive $X_L = \\omega L = 2\\pi f L$ (current lags voltage by $90^\\circ$); Capacitive $X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi f C}$ (current leads voltage by $90^\\circ$).",
      "Series LCR Circuit: Impedance $Z = \\sqrt{R^2 + (X_L - X_C)^2}$; Phase angle $\\tan\\phi = \\frac{X_L - X_C}{R}$.",
      "Resonance: When $X_L = X_C$, resonant frequency $\\omega_0 = \\frac{1}{\\sqrt{LC}}$ ($f_0 = \\frac{1}{2\\pi\\sqrt{LC}}$); Impedance is minimum ($Z = R$), current is maximum ($I_0 = V_0/R$), power factor $\\cos\\phi = 1$.",
      "Power in AC: $P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi$. Power factor $\\cos\\phi = \\frac{R}{Z}$. Pure L or C circuit dissipates zero average power (wattless current). Transformer: $\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}$.",
    ],
    coreConcepts: [
      {
        title: "Phasors, Reactance & Series LCR Impedance",
        content:
          "In AC circuits with $V = V_0 \\sin(\\omega t)$:\n- **Pure Resistor (R):** Current $I$ is in phase with voltage ($\\phi = 0$).\n- **Pure Inductor (L):** $X_L = \\omega L$. Current lags voltage by $\\pi/2$ ($\\phi = -90^\\circ$).\n- **Pure Capacitor (C):** $X_C = \\frac{1}{\\omega C}$. Current leads voltage by $\\pi/2$ ($\\phi = +90^\\circ$).\n\n**Series LCR Circuit:**\nApplying phasor addition of voltages:\n$$V^2 = V_R^2 + (V_L - V_C)^2 \\implies Z = \\sqrt{R^2 + (\\omega L - 1/\\omega C)^2}$$\n- If $X_L > X_C$: Circuit is inductive; current lags voltage.\n- If $X_C > X_L$: Circuit is capacitive; current leads voltage.\n- Phase angle: $\\tan\\phi = \\frac{X_L - X_C}{R}$, and power factor is $\\cos\\phi = \\frac{R}{Z}$.",
      },
      {
        title: "Resonance, Sharpness & Quality Factor Q",
        content:
          "At resonance, $X_L = X_C \\implies \\omega_0 L = \\frac{1}{\\omega_0 C}$:\n$$\\omega_0 = \\frac{1}{\\sqrt{LC}} \\implies f_0 = \\frac{1}{2\\pi\\sqrt{LC}}$$\nKey characteristics at series resonance:\n1. Total reactance is zero ($X = 0$).\n2. Impedance is purely resistive and minimum: $Z_{\\text{min}} = R$.\n3. Current amplitude is maximum: $I_0 = \\frac{V_0}{R}$.\n4. Voltage across L and C are equal in magnitude and $180^\\circ$ out of phase: $V_L + V_C = 0$.\n5. Circuit behaves as purely resistive with power factor $\\cos\\phi = 1$.\n\n**Quality Factor (Q):**\nMeasures the sharpness of resonance:\n$$Q = \\frac{\\omega_0 L}{R} = \\frac{1}{\\omega_0 C R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}} = \\frac{\\omega_0}{2\\Delta\\omega}$$\nHigh Q implies narrow bandwidth $2\\Delta\\omega$, giving high selectivity in tuning radio receivers.",
      },
      {
        title: "Average Power, Wattless Current & Transformers",
        content:
          "Instantaneous power is $p(t) = v(t) i(t)$. Average power over a complete cycle is:\n$$P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi$$\n- For pure L or pure C: $\\phi = 90^\\circ \\implies \\cos\\phi = 0 \\implies P_{\\text{avg}} = 0$. The current is called **wattless current** ($I_{\\text{wattless}} = I_{\\text{rms}} \\sin\\phi$).\n\n**Transformer:**\nWorks on the principle of mutual induction using AC:\n$$\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = K$$\nFor an ideal transformer (100% efficiency, $P_{\\text{in}} = P_{\\text{out}}$):\n$$\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}$$\n- **Step-up:** $N_s > N_p \\implies V_s > V_p, I_s < I_p$.\n- **Step-down:** $N_s < N_p \\implies V_s < V_p, I_s > I_p$.\n- Energy losses: Flux leakage, Joule heating in copper windings, Eddy current losses in iron core, and Hysteresis loss.",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Series LCR Impedance",
        formula: "Z = \\sqrt{R^2 + (X_L - X_C)^2} = \\sqrt{R^2 + (\\omega L - 1/\\omega C)^2}",
        symbols: "X_L = \\omega L, X_C = 1/(\\omega C)",
        siUnits: "Ohms (Ω)",
        applicationCondition: "Series LCR with sinusoidal source",
      },
      {
        name: "Resonant Frequency",
        formula: "f_0 = \\frac{1}{2\\pi \\sqrt{LC}}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}",
        symbols: "L in Henry, C in Farad",
        siUnits: "Hertz (Hz)",
        applicationCondition: "Series LCR resonance (X_L = X_C)",
      },
      {
        name: "Quality Factor Q",
        formula: "Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}} = \\frac{\\omega_0 L}{R}",
        symbols: "R: resistance, L: inductance, C: capacitance",
        siUnits: "Dimensionless",
        applicationCondition: "Sharpness of resonance calculation",
      },
      {
        name: "Average Power in AC",
        formula: "P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi = \\frac{V_{\\text{rms}}^2 R}{Z^2}",
        symbols: "\\cos\\phi = R/Z (power factor)",
        siUnits: "Watts (W)",
        applicationCondition: "Steady-state sinusoidal AC circuit",
      },
      {
        name: "Transformer Equation",
        formula: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        symbols: "N: turns, V: voltage, I: current",
        siUnits: "Dimensionless ratio",
        applicationCondition: "Ideal transformer (efficiency = 100%)",
      },
    ],
    diagram: {
      type: "svg",
      title: "LCR Phasor Diagram & Transformer Cores",
      caption: "Left: Phasor diagram and impedance triangle of a series LCR circuit. Right: Laminated core step-up transformer showing primary and secondary windings.",
      code: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <marker id="arrAC" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
    </marker>
    <marker id="arrRedAC" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
    </marker>
  </defs>
  <!-- Left Panel: Impedance Triangle -->
  <rect x="15" y="10" width="350" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="190" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">LCR Impedance Triangle</text>

  <!-- Triangle -->
  <line x1="80" y1="180" x2="260" y2="180" stroke="#2563EB" strokeWidth="3" markerEnd="url(#arrAC)"/>
  <text x="170" y="200" textAnchor="middle" fill="#2563EB" fontSize="12" fontWeight="bold">Resistance R</text>

  <line x1="260" y1="180" x2="260" y2="70" stroke="#059669" strokeWidth="3" markerEnd="url(#arrAC)"/>
  <text x="295" y="125" fill="#059669" fontSize="12" fontWeight="bold">X_L − X_C</text>

  <line x1="80" y1="180" x2="260" y2="70" stroke="#DC2626" strokeWidth="3" markerEnd="url(#arrRedAC)"/>
  <text x="145" y="110" fill="#DC2626" fontSize="13" fontWeight="bold">Z = √(R² + (X_L−X_C)²)</text>

  <!-- Phase angle phi -->
  <path d="M 120 180 A 40 40 0 0 0 115 155" fill="none" stroke="#DC2626" strokeWidth="2"/>
  <text x="130" y="170" fill="#DC2626" fontSize="12" fontWeight="bold">ϕ</text>
  <text x="190" y="228" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">Power Factor cos ϕ = R / Z</text>

  <!-- Right Panel: Transformer -->
  <rect x="380" y="10" width="365" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="562" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Step-Up Transformer (N_s &gt; N_p)</text>

  <!-- Iron Core -->
  <rect x="440" y="60" width="240" height="130" rx="6" fill="#E2E8F0" stroke="#475569" strokeWidth="3"/>
  <rect x="490" y="85" width="140" height="80" rx="4" fill="#F8FAFC" stroke="#475569" strokeWidth="2"/>

  <!-- Primary coil -->
  <rect x="428" y="75" width="24" height="100" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" rx="3"/>
  <text x="400" y="125" fill="#2563EB" fontSize="11" fontWeight="bold">Primary</text>
  <text x="400" y="140" fill="#2563EB" fontSize="10">N_p, V_p</text>

  <!-- Secondary coil -->
  <rect x="668" y="70" width="24" height="110" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5" rx="3"/>
  <text x="702" y="125" fill="#16A34A" fontSize="11" fontWeight="bold">Secondary</text>
  <text x="702" y="140" fill="#16A34A" fontSize="10">N_s, V_s</text>

  <text x="562" y="222" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="bold">V_s / V_p = N_s / N_p = I_p / I_s</text>
</svg>`,
    },
    workedExamples: [
      {
        id: "we_phys_4_2",
        questionNumber: 1,
        question:
          "A series LCR circuit has R = 20 Ω, L = 1.5 H and C = 35 μF. It is connected to a variable frequency 220 V AC supply. What is the frequency at which resonance occurs, and what is the current amplitude at resonance?",
        options: [
          { id: "A", text: "f₀ = 22 Hz, I₀ = 11 A" },
          { id: "B", text: "f₀ = 22 Hz, I₀ = 15.55 A" },
          { id: "C", text: "f₀ = 50 Hz, I₀ = 11 A" },
          { id: "D", text: "f₀ = 100 Hz, I₀ = 7.77 A" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Calculate resonant angular frequency: $\\omega_0 = \\frac{1}{\\sqrt{LC}} = \\frac{1}{\\sqrt{1.5 \\times 35 \\times 10^{-6}}} = \\frac{1}{\\sqrt{5.25 \\times 10^{-5}}} = \\frac{1000}{\\sqrt{52.5}} \\approx \\frac{1000}{7.246} \\approx 138\\text{ rad/s}$.",
          "Step 2: Linear frequency $f_0 = \\frac{\\omega_0}{2\\pi} = \\frac{138}{6.283} \\approx 22\\text{ Hz}$.",
          "Step 3: At resonance, impedance $Z = R = 20\\,\\Omega$.",
          "Peak voltage $V_0 = \\sqrt{2} V_{\\text{rms}} = 1.414 \\times 220 \\approx 311\\text{ V}$.",
          "Peak current amplitude: $I_0 = \\frac{V_0}{R} = \\frac{311}{20} = 15.55\\text{ A}$ (or $I_{\\text{rms}} = 220/20 = 11\\text{ A}$).",
          "Hence, Option B matches the question asking for frequency and current amplitude (peak).",
        ],
        cuetTip: "Distinguish carefully between RMS current ($I_{\\text{rms}} = 11\\text{ A}$) and current amplitude ($I_0 = \\sqrt{2} \\times 11 = 15.55\\text{ A}$).",
      },
      {
        id: "we_phys_4_3",
        questionNumber: 2,
        question:
          "In an ideal step-down transformer, the primary coil has 2000 turns and is connected to a 220 V AC source. If the secondary coil has 100 turns and powers a 22 Ω resistive load, what are the secondary voltage and the primary current?",
        options: [
          { id: "A", text: "V_s = 11 V, I_p = 0.025 A" },
          { id: "B", text: "V_s = 22 V, I_p = 0.05 A" },
          { id: "C", text: "V_s = 11 V, I_p = 0.5 A" },
          { id: "D", text: "V_s = 44 V, I_p = 0.1 A" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Use transformer voltage ratio: $\\frac{V_s}{V_p} = \\frac{N_s}{N_p} \\implies V_s = 220 \\times \\frac{100}{2000} = 11\\text{ V}$.",
          "Step 2: Secondary current through load: $I_s = \\frac{V_s}{R_L} = \\frac{11}{22} = 0.5\\text{ A}$.",
          "Step 3: In an ideal transformer, power is conserved: $V_p I_p = V_s I_s \\implies I_p = I_s \\times \\frac{N_s}{N_p} = 0.5 \\times \\frac{100}{2000} = 0.025\\text{ A}$.",
        ],
        cuetTip: "Step-down transformer reduces voltage by factor N_s/N_p, but current in primary is smaller by the same factor.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Impedance at Resonance",
        frequency: "Appeared in nearly 80% of official test papers",
        pyqExample: {
          question: "In a series LCR resonant circuit, the impedance of the circuit is:",
          options: [
            { id: "A", text: "Zero" },
            { id: "B", text: "Minimum and purely resistive" },
            { id: "C", text: "Maximum and purely inductive" },
            { id: "D", text: "Infinity" },
          ],
          correctOption: "B",
          explanation: "At series resonance, $X_L = X_C$, so $Z = \\sqrt{R^2 + 0} = R$. It is at its minimum possible value and purely resistive, making power factor unity ($\cos\\phi = 1$).",
        },
        strategy: "Remember series resonance = minimum impedance ($Z = R$), maximum current. Parallel resonance is opposite (maximum impedance).",
      },
      {
        type: "Power Factor Calculation",
        frequency: "High (tested in ~60% of shifts)",
        pyqExample: {
          question: "An AC voltage V = V₀ sin(ωt) is applied across a series combination of a resistor R and an inductor L. The phase difference ϕ between the applied voltage and the current is given by:",
          options: [
            { id: "A", text: "tan ϕ = ωL / R" },
            { id: "B", text: "tan ϕ = R / (ωL)" },
            { id: "C", text: "sin ϕ = ωL / R" },
            { id: "D", text: "cos ϕ = ωL / R" },
          ],
          correctOption: "A",
          explanation: "From the impedance triangle, tan ϕ = X_L / R = ωL / R, and power factor is cos ϕ = R / √(R² + ω²L²).",
        },
        strategy: "Always remember: tan ϕ = (X_L - X_C) / R.",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing average power dissipated across an inductor or capacitor in AC is non-zero.",
        whyWrong: "Because voltage and current are $90^\\circ$ out of phase in ideal L and C, $\\cos\\phi = \\cos(90^\\circ) = 0$. Stored energy is returned to the source every quarter cycle.",
        correctUnderstanding: "Average power consumed by pure L or pure C over a full cycle is strictly zero.",
        trapOptionExample: "Calculating $P = V I$ without the $\\cos\\phi$ term.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        mnemonic: "CIVIL: In C, I leads V; V leads I in L",
        rule: "Phase relationship in pure C and L",
        shortcut: "C - I - V - I - L: In Capacitor, I leads V; In Inductor, V leads I",
        whenToApply: "Remembering who leads whom in AC reactances",
      },
    ],
    quickRevisionCard: {
      title: "Alternating Current — Quick Revision",
      bulletPoints: [
        "RMS Values: V_rms = V₀/√2 ≈ 0.707 V₀; I_rms = I₀/√2.",
        "Reactance: X_L = ωL = 2πfL (I lags V by 90°); X_C = 1/(ωC) (I leads V by 90°).",
        "Series LCR: Z = √[R² + (X_L − X_C)²]; tanϕ = (X_L − X_C) / R.",
        "Resonance: X_L = X_C; ω₀ = 1/√(LC); Z_min = R; I_max = V₀/R; cosϕ = 1.",
        "Quality Factor: Q = ω₀L/R = (1/R)√(L/C) (sharpness of resonance).",
        "Power in AC: P_avg = V_rms I_rms cosϕ; Power factor cosϕ = R/Z.",
        "Wattless Current: I_wattless = I_rms sinϕ (occurs when cosϕ = 0).",
        "Ideal Transformer: V_s / V_p = N_s / N_p = I_p / I_s.",
        "Step-up: N_s > N_p (V increases, I decreases). Step-down: N_s < N_p.",
      ],
    },
    practiceQuestions: [
      {
        id: "pq_phys_4_4",
        question: "In an AC circuit, an alternating voltage V = 200√2 sin(100t) V is connected to a capacitor of capacity 1 μF. The RMS value of current in the circuit is:",
        type: "standard",
        options: [
          { id: "A", text: "20 mA" },
          { id: "B", text: "10 mA" },
          { id: "C", text: "100 mA" },
          { id: "D", text: "200 mA" },
        ],
        correctOption: "A",
        explanation: "$V_{\\text{rms}} = 200\\text{ V}$, $\\omega = 100\\text{ rad/s}$. $X_C = \\frac{1}{\\omega C} = \\frac{1}{100 \\times 10^{-6}} = 10^4\\,\\Omega$. $I_{\\text{rms}} = \\frac{V_{\\text{rms}}}{X_C} = \\frac{200}{10000} = 0.02\\text{ A} = 20\\text{ mA}$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_5",
        question: "Assertion (A): At resonance in a series LCR circuit, the current and voltage are in the same phase.\nReason (R): At resonance, inductive reactance equals capacitive reactance, so net reactance of the circuit becomes zero.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Since $X_L = X_C$, $\\tan\\phi = \\frac{X_L - X_C}{R} = 0 \\implies \\phi = 0^\\circ$. The power factor is unity ($\cos\\phi = 1$).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_6",
        question: "A step-down transformer transforms 2200 V into 220 V. If the primary coil has 5000 turns and efficiency is 90%, the number of turns in the secondary coil is:",
        type: "standard",
        options: [
          { id: "A", text: "500" },
          { id: "B", text: "450" },
          { id: "C", text: "555" },
          { id: "D", text: "50" },
        ],
        correctOption: "A",
        explanation: "Turns ratio depends strictly on flux linkage: $\\frac{N_s}{N_p} = \\frac{V_s}{V_p} \\implies N_s = 5000 \\times \\frac{220}{2200} = 500$. (Efficiency affects current and power, not the turns ratio!).",
        difficulty: "medium",
      },
      {
        id: "pq_phys_4_7",
        question: "Match List I (Circuit Type) with List II (Phase angle ϕ between V and I):\nList I: (A) Pure Inductor, (B) Pure Capacitor, (C) Pure Resistor, (D) Series LCR at resonance\nList II: (I) Voltage lags current by 90°, (II) In phase (ϕ = 0°), (III) Voltage leads current by 90°, (IV) Zero phase angle with maximum impedance",
        type: "match-the-following",
        options: [
          { id: "A", text: "A-(III), B-(I), C-(II), D-(II)" },
          { id: "B", text: "A-(I), B-(III), C-(II), D-(IV)" },
          { id: "C", text: "A-(III), B-(II), C-(I), D-(IV)" },
          { id: "D", text: "A-(II), B-(I), C-(III), D-(IV)" },
        ],
        correctOption: "A",
        explanation: "Pure inductor: voltage leads by 90° (III). Pure capacitor: voltage lags by 90° (I). Pure resistor: in phase (II). LCR at resonance: in phase (II).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_8",
        question: "In an AC circuit containing an inductance L and resistance R in series, the power factor is:",
        type: "standard",
        options: [
          { id: "A", text: "R / √(R² + ω²L²)" },
          { id: "B", text: "ωL / R" },
          { id: "C", text: "√(R² + ω²L²) / R" },
          { id: "D", text: "R / (ωL)" },
        ],
        correctOption: "A",
        explanation: "Power factor cos ϕ = R / Z = R / √(R² + X_L²) = R / √(R² + ω²L²).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_9",
        question: "Assertion (A): A choke coil is preferred over an ohmic resistor to reduce current in an AC circuit without significant energy loss.\nReason (R): For an ideal inductor, the average power dissipated over a full cycle is zero (P_avg = V_rms I_rms cos 90° = 0).",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "An ideal inductor has phase angle 90° and cos 90° = 0, meaning it introduces reactance to limit current while dissipating zero average Joule heat, whereas a resistor wastes power as I²R heat.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_10",
        question: "In a series LCR circuit, R = 10 Ω, L = 2 mH, and C = 5 μF. The resonant angular frequency ω₀ is:",
        type: "standard",
        options: [
          { id: "A", text: "10,000 rad/s" },
          { id: "B", text: "1,000 rad/s" },
          { id: "C", text: "5,000 rad/s" },
          { id: "D", text: "20,000 rad/s" },
        ],
        correctOption: "A",
        explanation: "ω₀ = 1 / √(LC) = 1 / √(2 × 10⁻³ × 5 × 10⁻⁶) = 1 / √(10⁻⁸) = 1 / 10⁻⁴ = 10⁴ rad/s = 10,000 rad/s.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_4_11",
        question: "In an AC circuit, the instantaneous values of voltage and current are v = 100 sin(100t) V and i = 100 sin(100t + π/3) mA. The average power consumed in the circuit is:",
        type: "standard",
        options: [
          { id: "A", text: "2.5 W" },
          { id: "B", text: "5.0 W" },
          { id: "C", text: "10.0 W" },
          { id: "D", text: "2.5 mW" },
        ],
        correctOption: "A",
        explanation: "P_avg = ½ V₀ I₀ cos ϕ = ½ × 100 × (100 × 10⁻³) × cos(π/3) = ½ × 10 × ½ = 2.5 W.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_4_12",
        question: "Which of the following losses in a transformer is minimized by using a laminated soft iron core?",
        type: "standard",
        options: [
          { id: "A", text: "Hysteresis loss" },
          { id: "B", text: "Eddy current loss" },
          { id: "C", text: "Copper loss" },
          { id: "D", text: "Flux leakage" },
        ],
        correctOption: "B",
        explanation: "Laminations break electrical continuity of the core perpendicular to the magnetic flux, dramatically reducing the cross-sectional area of eddy current loops and slashing I²R heating losses.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_4_13",
        question: "The quality factor Q of an LCR series circuit with R = 2 Ω, L = 2 mH, and C = 2 μF is:",
        type: "standard",
        options: [
          { id: "A", text: "15.8" },
          { id: "B", text: "31.6" },
          { id: "C", text: "10.0" },
          { id: "D", text: "50.0" },
        ],
        correctOption: "A",
        explanation: "Q = (1/R) √(L/C) = (1/2) √( (2 × 10⁻³) / (2 × 10⁻⁶) ) = ½ √1000 = ½ × 31.62 = 15.81.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: [
        { title: "Faraday's & Lenz's Law", slug: "faradays-and-lenzs-law" },
      ],
      relatedTopics: [
        { title: "Electromagnetic Waves", slug: "displacement-current" },
      ],
      practiceTestId: "practice-physics-unit4-test2",
      practiceTestUrl: "/test/practice-physics-unit4-test2",
      weaknessReportUrl: "/dashboard/radar?subject=physics",
    },
    subjectSpecific: {
      physics: {
        unitDimensionTable: [
          { quantity: "Impedance / Reactance (Z, X_L, X_C)", dimension: "[M L² T⁻³ A⁻²]", unit: "Ohm (Ω)" },
          { quantity: "Quality Factor (Q)", dimension: "[M⁰ L⁰ T⁰ A⁰]", unit: "Dimensionless" },
          { quantity: "Power Factor (cos ϕ)", dimension: "[M⁰ L⁰ T⁰ A⁰]", unit: "Dimensionless" },
        ],
      },
    },
    metadata: {
      confidence: "high",
      needsHumanReview: false,
      lastUpdated: new Date().toISOString(),
      version: 1,
      wordCount: 1610,
      isFreePreview: false,
    },
  },
];
