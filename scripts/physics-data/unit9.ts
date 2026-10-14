import { NoteDocument } from "@/types/notes";

export const unit9Topics: NoteDocument[] = [
  {
    id: "physics_u9_t1",
    slug: "semiconductor-electronics",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 9,
    unitTitle: "Electronic Devices",
    topicTitle: "Semiconductor Electronics",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 2",
      chapterNumber: 14,
      chapterName: "Semiconductor Electronics: Materials, Devices and Simple Circuits",
      sections: [
        "14.2 Classification of Metals, Conductors and Semiconductors",
        "14.3 Intrinsic Semiconductor",
        "14.4 Extrinsic Semiconductor (n-type and p-type)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "2-3 questions per shift. Key focal points: Energy band gap values ($E_g = 1.1\\text{ eV}$ for Si, $0.72\\text{ eV}$ for Ge), mass action law $n_e n_h = n_i^2$, pentavalent (donor) vs trivalent (acceptor) dopants, and electrical neutrality of doped semiconductors.",
      totalPyqsInRepo: 89,
      weightagePercentage: 5.5,
    },
    summary30Seconds: [
      "Energy Bands: Valence band (lower energy, filled with valence electrons) and Conduction band (higher energy, empty at 0 K) separated by forbidden energy band gap $E_g$.",
      "Classification: Metals ($E_g = 0$ or overlapping bands); Semiconductors ($E_g < 3\\text{ eV}$, e.g. $\\text{Si} = 1.1\\text{ eV}, \\text{Ge} = 0.72\\text{ eV}$); Insulators ($E_g > 3\\text{ eV}$, e.g. Diamond $= 5.4\\text{ eV}$).",
      "Intrinsic Semiconductor: Pure tetravalent crystal; at 0 K behaves as an insulator. At $T > 0\\text{ K}$, thermal excitation generates electron-hole pairs: $n_e = n_h = n_i$. Net current $I = I_e + I_h$.",
      "Extrinsic n-type: Doped with pentavalent atoms (P, As, Sb). Electrons are majority carriers ($n_e \\gg n_h$), donor energy level $E_d$ lies just below conduction band.",
      "Extrinsic p-type: Doped with trivalent atoms (B, Al, In, Ga). Holes are majority carriers ($n_h \\gg n_e$), acceptor energy level $E_a$ lies just above valence band.",
      "Mass Action Law: In thermal equilibrium for any semiconductor, $n_e n_h = n_i^2(T)$.",
      "Both n-type and p-type semiconductors are electrically **NEUTRAL** as a whole.",
    ],
    coreConcepts: [
      {
        title: "Energy Band Theory & Classification of Solids",
        content:
          "In isolated atoms, electrons occupy sharp discrete energy levels. In a crystalline solid with $N$ atoms, Pauli's exclusion principle causes closely spaced levels to split into continuous **energy bands**:\n- **Valence Band (VB):** The band of energy levels occupied by valence electrons. Completely filled at $0\\text{ K}$.\n- **Conduction Band (CB):** The band of energy levels above the valence band. Completely empty at $0\\text{ K}$.\n- **Forbidden Energy Gap ($E_g$):** The energy separation between top of VB ($E_v$) and bottom of CB ($E_c$). No electron state can exist inside $E_g$.\n\n**Classification:**\n1. **Conductors / Metals:** CB and VB either overlap ($E_g = 0$) or the VB is partially filled. Resistivity is low ($\\rho \\sim 10^{-2} - 10^{-8}\\ \\Omega\\cdot\\text{m}$).\n2. **Insulators:** Very large band gap ($E_g > 3\\text{ eV}$, diamond $5.4\\text{ eV}$). Extremely high resistivity ($\\rho > 10^{11}\\ \\Omega\\cdot\\text{m}$).\n3. **Semiconductors:** Moderate band gap ($E_g < 3\\text{ eV}$).\n   - Silicon: $E_g = 1.1\\text{ eV}$\n   - Germanium: $E_g = 0.72\\text{ eV}$\n   - Gallium Arsenide (GaAs): $E_g = 1.42\\text{ eV}$",
      },
      {
        title: "Intrinsic Semiconductors & Hole Concept",
        content:
          "Pure Silicon or Germanium has 4 valence electrons forming 4 covalent bonds with neighboring atoms in a diamond-like tetrahedral lattice.\n- At $T = 0\\text{ K}$: All covalent bonds are intact. No free electrons exist in the conduction band $\\implies$ behaves as a perfect insulator (conductivity $\\sigma = 0$).\n- At room temperature ($T > 0\\text{ K}$): Thermal energy breaks a small fraction of covalent bonds. An electron jumps from VB to CB, leaving behind a vacancy with an effective positive charge $+e$ called a **hole**.\n- Intrinsic carrier equality:\n  $$n_e = n_h = n_i$$\n  where $n_i$ is the intrinsic carrier concentration ($n_i \\propto T^{3/2} e^{-E_g / (2 k_B T)}$).\n- **Total Drift Current:** Both electrons in the conduction band and holes in the valence band contribute to conduction in the same direction:\n  $$I = I_e + I_h = e A (n_e v_e + n_h v_h) = e A E (n_e \\mu_e + n_h \\mu_h)$$\n  $$\\sigma = e (n_e \\mu_e + n_h \\mu_h)$$\n  Electron mobility $\\mu_e$ is always greater than hole mobility $\\mu_h$ because electrons move freely in CB while holes require step-by-step bound electron hopping in VB.",
      },
      {
        title: "Extrinsic Semiconductors: n-type & p-type",
        content:
          "Doping is the deliberate addition of a tiny quantity of suitable impurity (~1 ppm) to pure semiconductor to boost conductivity by orders of magnitude.\n\n1. **n-type Semiconductor (Donor Impurity):**\n   - Doped with pentavalent elements: Phosphorus (P), Arsenic (As), Antimony (Sb).\n   - 4 valence electrons bond with neighbors; the 5th electron is loosely bound (ionization energy $\\sim 0.05\\text{ eV}$ in Si, $0.01\\text{ eV}$ in Ge).\n   - At room temperature, almost all 5th electrons escape into the conduction band without creating holes.\n   - **Donor Energy Level ($E_d$):** Lies just $0.01 - 0.05\\text{ eV}$ below the conduction band edge $E_c$.\n   - Carrier concentrations: $n_e \\approx N_d \\gg n_h$. Majority: **electrons**; Minority: **holes**.\n\n2. **p-type Semiconductor (Acceptor Impurity):**\n   - Doped with trivalent elements: Boron (B), Aluminum (Al), Indium (In), Gallium (Ga).\n   - Forms 3 covalent bonds; the 4th bond has a vacancy (hole).\n   - **Acceptor Energy Level ($E_a$):** Lies just $0.01 - 0.05\\text{ eV}$ above the valence band edge $E_v$.\n   - An electron from VB easily jumps into $E_a$, leaving a hole in VB.\n   - Carrier concentrations: $n_h \\approx N_a \\gg n_e$. Majority: **holes**; Minority: **electrons**.\n\n**Mass Action Law:**\n$$n_e n_h = n_i^2$$\nIf donor atoms are added ($n_e \\uparrow$), hole concentration drops drastically ($n_h \\downarrow$) due to enhanced recombination.",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Mass Action Law",
        formula: "n_e n_h = n_i^2",
        symbols: "n_e: electron concentration, n_h: hole concentration, n_i: intrinsic carrier density",
        siUnits: "m^{-6} (carriers/m³ squared)",
        applicationCondition: "Thermal equilibrium in any doped or pure semiconductor",
      },
      {
        name: "Conductivity of Semiconductor",
        formula: "\\sigma = e (n_e \\mu_e + n_h \\mu_h)",
        symbols: "\\mu_e, \\mu_h: mobilities of electron and hole, e: elementary charge",
        siUnits: "\\Omega^{-1}\\cdot\\text{m}^{-1} = \\text{S/m}",
        applicationCondition: "Drift in applied electric field E",
      },
      {
        name: "Forbidden Band Gaps at 300 K",
        formula: "E_g(\\text{Si}) = 1.1\\text{ eV}, \\quad E_g(\\text{Ge}) = 0.72\\text{ eV}, \\quad E_g(\\text{GaAs}) = 1.42\\text{ eV}",
        symbols: "E_g: energy band gap",
        siUnits: "eV",
        applicationCondition: "Room temperature (300 K)",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="bandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3"/>
      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="760" height="260" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>

  <!-- Left: n-type Energy Band Diagram -->
  <g transform="translate(40, 20)">
    <text x="140" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">n-type Semiconductor</text>
    
    <!-- Conduction Band -->
    <rect x="20" y="45" width="240" height="40" rx="6" fill="url(#bandGrad)" stroke="#38bdf8" strokeWidth="1.5"/>
    <text x="140" y="68" fill="#e2e8f0" fontSize="11" textAnchor="middle">Conduction Band (CB)</text>
    <text x="265" y="80" fill="#38bdf8" fontSize="10">E_c</text>

    <!-- Donor Level E_d -->
    <line x1="20" y1="105" x2="260" y2="105" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="265" y="109" fill="#fbbf24" fontSize="10">E_d (Donor level)</text>
    <text x="140" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle">~0.01 - 0.05 eV below E_c</text>

    <!-- Valence Band -->
    <rect x="20" y="155" width="240" height="45" rx="6" fill="url(#bandGrad)" stroke="#64748b" strokeWidth="1.5"/>
    <text x="140" y="180" fill="#cbd5e1" fontSize="11" textAnchor="middle">Valence Band (VB)</text>
    <text x="265" y="160" fill="#64748b" fontSize="10">E_v</text>

    <!-- Band gap arrow -->
    <text x="140" y="225" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">n_e ≈ N_d &gt;&gt; n_h (Electrons Majority)</text>
  </g>

  <!-- Divider -->
  <line x1="365" y1="25" x2="365" y2="235" stroke="#334155" strokeWidth="1" strokeDasharray="4,4"/>

  <!-- Right: p-type Energy Band Diagram -->
  <g transform="translate(410, 20)">
    <text x="140" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">p-type Semiconductor</text>
    
    <!-- Conduction Band -->
    <rect x="20" y="45" width="240" height="40" rx="6" fill="url(#bandGrad)" stroke="#64748b" strokeWidth="1.5"/>
    <text x="140" y="68" fill="#cbd5e1" fontSize="11" textAnchor="middle">Conduction Band (CB)</text>
    <text x="265" y="80" fill="#64748b" fontSize="10">E_c</text>

    <!-- Acceptor Level E_a -->
    <line x1="20" y1="135" x2="260" y2="135" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="265" y="139" fill="#ec4899" fontSize="10">E_a (Acceptor level)</text>
    <text x="140" y="125" fill="#94a3b8" fontSize="9" textAnchor="middle">~0.01 - 0.05 eV above E_v</text>

    <!-- Valence Band -->
    <rect x="20" y="155" width="240" height="45" rx="6" fill="url(#bandGrad)" stroke="#38bdf8" strokeWidth="1.5"/>
    <text x="140" y="180" fill="#e2e8f0" fontSize="11" textAnchor="middle">Valence Band (VB)</text>
    <text x="265" y="160" fill="#38bdf8" fontSize="10">E_v</text>

    <!-- Majority summary -->
    <text x="140" y="225" fill="#ec4899" fontSize="11" fontWeight="bold" textAnchor="middle">n_h ≈ N_a &gt;&gt; n_e (Holes Majority)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        question:
          "A pure silicon crystal has $5 \\times 10^{28}\\text{ atoms/m}^3$. It is doped by $1\\text{ ppm}$ concentration of pentavalent Arsenic. If the intrinsic carrier concentration is $n_i = 1.5 \\times 10^{16}\\text{ m}^{-3}$, calculate the concentration of electrons and holes in the doped semiconductor.",
        options: [
          "(A) n_e = 5 × 10²² m⁻³, n_h = 4.5 × 10⁹ m⁻³",
          "(B) n_e = 5 × 10²² m⁻³, n_h = 1.5 × 10¹⁶ m⁻³",
          "(C) n_e = 1.5 × 10¹⁶ m⁻³, n_h = 5 × 10²² m⁻³",
          "(D) n_e = 5 × 10²⁸ m⁻³, n_h = 4.5 × 10¹⁰ m⁻³",
        ],
        correctOption: "(A) n_e = 5 × 10²² m⁻³, n_h = 4.5 × 10⁹ m⁻³",
        solutionStepByStep: [
          "Step 1: Doping concentration of donor atoms $N_d = 1\\text{ ppm} = 10^{-6} \\times (5 \\times 10^{28}\\text{ m}^{-3}) = 5 \\times 10^{22}\\text{ m}^{-3}$.",
          "Step 2: Since all donor atoms are ionized at room temperature, electron concentration $n_e \\approx N_d = 5 \\times 10^{22}\\text{ m}^{-3}$.",
          "Step 3: Apply the Mass Action Law: $n_e n_h = n_i^2 \\implies n_h = \\frac{n_i^2}{n_e}$.",
          "Step 4: Substitute $n_i = 1.5 \\times 10^{16}\\text{ m}^{-3}$:\n$$n_h = \\frac{(1.5 \\times 10^{16})^2}{5 \\times 10^{22}} = \\frac{2.25 \\times 10^{32}}{5 \\times 10^{22}} = 0.45 \\times 10^{10} = 4.5 \\times 10^9\\text{ m}^{-3}$$.",
        ],
      },
      {
        question:
          "Which of the following elements must be added to pure Germanium to convert it into a p-type semiconductor?",
        options: [
          "(A) Phosphorus",
          "(B) Arsenic",
          "(C) Indium",
          "(D) Antimony",
        ],
        correctOption: "(C) Indium",
        solutionStepByStep: [
          "Step 1: To create a p-type semiconductor, tetravalent Ge (Group 14) must be doped with a trivalent element (Group 13) that acts as an acceptor.",
          "Step 2: Group 13 elements include Boron (B), Aluminum (Al), Gallium (Ga), and Indium (In).",
          "Step 3: Phosphorus (P), Arsenic (As), and Antimony (Sb) belong to Group 15 (pentavalent) and would produce an n-type semiconductor.",
          "Step 4: Hence, Indium (In) produces a p-type semiconductor.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Dopant Classification (Pentavalent vs Trivalent)",
        frequency: "Very High (appears in ~70% of shifts)",
        typicalStem: "To obtain a p-type silicon semiconductor, silicon must be doped with...",
        strategy: "p-type = Group 13 (B, Al, Ga, In). n-type = Group 15 (P, As, Sb, Bi).",
      },
      {
        patternType: "Mass Action Law Numericals",
        frequency: "High",
        typicalStem: "Given intrinsic carrier concentration n_i, find the minority carrier density after doping...",
        strategy: "Use $n_e n_h = n_i^2$. If doped with donor $N_d$, $n_h = n_i^2 / N_d$.",
      },
      {
        patternType: "Assertion-Reason on Neutrality",
        frequency: "Frequent",
        typicalStem: "Assertion: An n-type semiconductor has a large number of free electrons, yet it is electrically neutral.",
        strategy: "True! Every donor atom that contributes a free electron retains an equal positive charge in its stationary nucleus ($q_{\\text{net}} = 0$).",
      },
    ],
    commonTraps: [
      {
        concept: "Net Charge of Doped Semiconductors",
        misconception: "Students believe an n-type semiconductor has a negative net charge and a p-type has a positive net charge.",
        correctFact: "Both n-type and p-type semiconductors are strictly **ELECTRICALLY NEUTRAL**. The extra free carriers are balanced exactly by ionized donor/acceptor core ions.",
      },
      {
        concept: "Temperature dependence of conductivity",
        misconception: "Thinking semiconductors lose conductivity at high temperature like metals.",
        correctFact: "Metals have positive temperature coefficient of resistance (resistance increases with $T$). Semiconductors have **negative temperature coefficient** of resistance: as $T$ rises, covalent bonds break, carrier density increases exponentially, and resistance decreases.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Dopants Memory Hook",
        mnemonic: "B-A-G-I for p-type, P-A-S for n-type",
        explanation: "BAGI = Boron, Aluminum, Gallium, Indium (p-type). PAS = Phosphorus, Arsenic, Antimony (n-type).",
      },
      {
        title: "Negative Temp Coefficient",
        mnemonic: "SEMI = Slow to Electronic Motion when In cold (Insulator at 0 K, Conductor when hot)",
        explanation: "Resistance drops as temperature rises (Negative α).",
      },
    ],
    quickRevisionCard: {
      keyPoints: [
        "Band gap: Conductors E_g = 0; Semiconductors E_g < 3 eV (Si = 1.1 eV, Ge = 0.72 eV); Insulators E_g > 3 eV (Diamond = 5.4 eV).",
        "Pure semiconductor at 0 K is a perfect insulator; at room temp n_e = n_h = n_i.",
        "Total current: I = I_e + I_h = e A (n_e v_e + n_h v_h); Electron mobility μ_e > hole mobility μ_h.",
        "n-type: Pentavalent impurity (P, As, Sb); Donor level E_d is just below CB; n_e ≈ N_d >> n_h.",
        "p-type: Trivalent impurity (B, Al, Ga, In); Acceptor level E_a is just above VB; n_h ≈ N_a >> n_e.",
        "Mass Action Law: n_e n_h = n_i² (holds at thermal equilibrium).",
        "Net charge of doped semiconductor: Strictly ZERO (electrically neutral).",
        "Semiconductors have NEGATIVE temperature coefficient of resistance (resistance falls with temperature).",
      ],
      examTricks: [
        "At absolute zero (0 K), Fermi level in intrinsic semiconductor lies exactly in the middle of forbidden energy gap (E_g / 2).",
        "In n-type, Fermi level shifts up towards conduction band; in p-type, it shifts down towards valence band.",
      ],
    },
    practiceQuestions: [
      {
        id: "phys_u9_q1",
        question: "At absolute zero temperature (0 K), a pure intrinsic semiconductor behaves as:",
        options: [
          "(A) A perfect conductor",
          "(B) A superconductor",
          "(C) A perfect insulator",
          "(D) A semiconductor with high conductivity",
        ],
        correctAnswer: "(C) A perfect insulator",
        explanation: "At 0 K, thermal energy is zero. All covalent bonds remain completely intact, and no electrons are excited to the conduction band. The conduction band is completely empty and the valence band is full, making it a perfect insulator.",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u9_q2",
        question: "The energy band gap of Silicon and Germanium at room temperature are approximately:",
        options: [
          "(A) 1.1 eV and 0.72 eV",
          "(B) 0.72 eV and 1.1 eV",
          "(C) 5.4 eV and 1.1 eV",
          "(D) 0.1 eV and 0.2 eV",
        ],
        correctAnswer: "(A) 1.1 eV and 0.72 eV",
        explanation: "Silicon has E_g = 1.1 eV and Germanium has E_g = 0.72 eV.",
        difficulty: "Easy",
        questionType: "Factual Recall",
      },
      {
        id: "phys_u9_q3",
        question: "An n-type semiconductor is:",
        options: [
          "(A) Negatively charged",
          "(B) Positively charged",
          "(C) Electrically neutral",
          "(D) Negatively or positively charged depending on doping level",
        ],
        correctAnswer: "(C) Electrically neutral",
        explanation: "In an n-type semiconductor, the negative charge of majority electrons is exactly balanced by the positive charge of stationary donor ions and nuclei. The net electrical charge is zero.",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u9_q4",
        question: "Assertion (A): The electrical conductivity of a semiconductor increases with an increase in temperature.\nReason (R): As temperature rises, more covalent bonds break, generating more electron-hole pairs, which dramatically outweighs the decrease in mobility.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "Unlike metals where carrier density is fixed and lattice scattering increases with T, in semiconductors carrier density increases exponentially (n_i ∝ e^(-E_g / 2k_BT)), resulting in higher electrical conductivity (negative temperature coefficient of resistance).",
        difficulty: "Easy",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u9_q5",
        question: "Assertion (A): In an intrinsic semiconductor, the electron mobility is always greater than the hole mobility (μ_e > μ_h).\nReason (R): Electrons move in the higher conduction band as almost free particles, whereas holes require the sequential hopping of bound valence electrons.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "Conduction band electrons experience less binding constraint compared to valence band holes, leading to a smaller effective mass and higher mobility for electrons.",
        difficulty: "Medium",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u9_q6",
        question: "Match List-I with List-II:\n\nList-I (Material / Doping Type)\n(P) Diamond\n(Q) Silicon doped with Indium\n(R) Germanium doped with Arsenic\n(S) Copper\n\nList-II (Band Structure / Conductivity Property)\n(1) n-type semiconductor with donor level near CB\n(2) Conductor with overlapping CB and VB (E_g = 0)\n(3) Insulator with E_g ≈ 5.4 eV\n(4) p-type semiconductor with acceptor level near VB",
        options: [
          "(A) P-3, Q-4, R-1, S-2",
          "(B) P-4, Q-3, R-2, S-1",
          "(C) P-3, Q-1, R-4, S-2",
          "(D) P-1, Q-2, R-3, S-4",
        ],
        correctAnswer: "(A) P-3, Q-4, R-1, S-2",
        explanation: "Diamond is an insulator with E_g = 5.4 eV (P-3). Si + In is p-type (Q-4). Ge + As is n-type (R-1). Copper is a conductor (S-2).",
        difficulty: "Easy",
        questionType: "Match The Following",
      },
      {
        id: "phys_u9_q7",
        question: "In an intrinsic semiconductor, the ratio of number of electrons to the number of holes (n_e / n_h) is:",
        options: [
          "(A) Greater than 1",
          "(B) Less than 1",
          "(C) Equal to 1",
          "(D) Dependent on donor concentration",
        ],
        correctAnswer: "(C) Equal to 1",
        explanation: "In pure intrinsic semiconductors, thermal excitation generates equal numbers of conduction electrons and valence holes, so n_e = n_h = n_i, and n_e / n_h = 1.",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u9_q8",
        question: "The intrinsic carrier concentration of silicon at 300 K is 1.5 × 10¹⁶ m⁻³. If it is doped with 10²² m⁻³ phosphorus atoms, what is the resulting hole concentration at 300 K?",
        options: [
          "(A) 2.25 × 10¹⁰ m⁻³",
          "(B) 1.5 × 10¹⁶ m⁻³",
          "(C) 2.25 × 10³² m⁻³",
          "(D) 2.25 × 10¹⁰ cm⁻³",
        ],
        correctAnswer: "(A) 2.25 × 10¹⁰ m⁻³",
        explanation: "n_e ≈ N_d = 10²² m⁻³. By Mass Action Law: n_h = n_i² / n_e = (1.5 × 10¹⁶)² / 10²² = 2.25 × 10³² / 10²² = 2.25 × 10¹⁰ m⁻³.",
        difficulty: "Medium",
        questionType: "Numerical",
      },
      {
        id: "phys_u9_q9",
        question: "When a pentavalent impurity is added to a pure semiconductor, the extra discrete donor energy level created lies:",
        options: [
          "(A) In the middle of the forbidden energy gap",
          "(B) Just above the top of the valence band",
          "(C) Just below the bottom of the conduction band",
          "(D) Deep inside the valence band",
        ],
        correctAnswer: "(C) Just below the bottom of the conduction band",
        explanation: "Donor levels provide loosely bound electrons that require very little energy (~0.01 to 0.05 eV) to jump into the conduction band, placing the donor level E_d immediately below E_c.",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u9_q10",
        question: "Carbon, Silicon, and Germanium all have 4 valence electrons each. Their forbidden band gaps are E_g(C), E_g(Si), and E_g(Ge). Which relation is correct?",
        options: [
          "(A) E_g(C) < E_g(Si) < E_g(Ge)",
          "(B) E_g(C) > E_g(Si) > E_g(Ge)",
          "(C) E_g(C) = E_g(Si) = E_g(Ge)",
          "(D) E_g(Si) > E_g(C) > E_g(Ge)",
        ],
        correctAnswer: "(B) E_g(C) > E_g(Si) > E_g(Ge)",
        explanation: "As we move down Group 14 (C → Si → Ge), atomic radius increases, valence electrons are farther from nucleus and less tightly bound, causing the band gap to decrease: E_g(C, diamond) ≈ 5.4 eV > E_g(Si) ≈ 1.1 eV > E_g(Ge) ≈ 0.72 eV.",
        difficulty: "Medium",
        questionType: "Conceptual Direct",
      },
    ],
    links: {
      prerequisites: ["physics_u8_t2"],
      relatedTopics: ["physics_u9_t2"],
      practiceTestUrl: "/test/practice-physics-unit9-test1",
      weaknessRadarUrl: "/dashboard/radar?subject=physics",
    },
    physicsModule: {
      derivationsInBrief: [
        {
          title: "Derivation of Total Current and Conductivity in Semiconductors",
          steps: [
            "Electron drift current: I_e = n_e e A v_e = n_e e A μ_e E.",
            "Hole drift current: I_h = n_h e A v_h = n_h e A μ_h E.",
            "Total current: I = I_e + I_h = e A E (n_e μ_e + n_h μ_h).",
            "Current density J = I/A = e E (n_e μ_e + n_h μ_h) = σ E ⇒ σ = e (n_e μ_e + n_h μ_h).",
          ],
        },
      ],
      unitDimensionTable: [
        { quantity: "Mobility (μ)", formula: "μ = v_d / E", siUnit: "m²/(V·s)", dimensionalFormula: "[M⁻¹ L⁰ T² I¹]" },
        { quantity: "Conductivity (σ)", formula: "σ = 1 / ρ", siUnit: "S/m = Ω⁻¹·m⁻¹", dimensionalFormula: "[M⁻¹ L⁻³ T³ I²]" },
        { quantity: "Carrier concentration (n_i)", formula: "n_i = N/V", siUnit: "m⁻³", dimensionalFormula: "[M⁰ L⁻³ T⁰]" },
      ],
      graphInterpretations: [
        {
          graphTitle: "Resistivity (ρ) vs Temperature (T) in Semiconductors vs Metals",
          axes: "x-axis: Temperature T (K), y-axis: Resistivity ρ (Ω·m)",
          keyFeatures: "For metals, ρ increases linearly with T (positive α). For semiconductors, ρ drops exponentially with T (negative α) due to rapid thermal generation of carriers.",
        },
      ],
    },
  },
  {
    id: "physics_u9_t2",
    slug: "p-n-junction-diodes-rectifiers-logic-gates-special-diodes",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 9,
    unitTitle: "Electronic Devices",
    topicTitle: "p-n Junction Diodes, Rectifiers, Logic Gates / Special Diodes",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 2",
      chapterNumber: 14,
      chapterName: "Semiconductor Electronics: Materials, Devices and Simple Circuits",
      sections: [
        "14.5 p-n Junction (Formation, Depletion Region, Barrier Potential)",
        "14.6 Semiconductor Diode (Forward and Reverse Bias)",
        "14.7 Application of Junction Diode as a Rectifier",
        "14.8 Special Purpose p-n Junction Diodes (Zener, Photodiode, LED, Solar Cell)",
        "14.9 Digital Electronics and Logic Gates",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "3-4 questions per shift. Top recurrent items: Rectifier ripple frequency (half-wave $f$, full-wave $2f$), Zener diode as voltage regulator, photodiode reverse bias logic, and Logic Gate truth tables (especially NAND / NOR universal gates and De Morgan's laws).",
      totalPyqsInRepo: 89,
      weightagePercentage: 6.0,
    },
    summary30Seconds: [
      "p-n Junction: Holes diffuse from p to n and electrons from n to p, creating an immobile space-charge **depletion layer** and built-in **barrier potential** ($V_0 \\approx 0.7\\text{ V}$ for Si, $0.3\\text{ V}$ for Ge).",
      "Biasing: Forward bias ($p \\to +, n \\to -$) reduces depletion width and barrier height, causing exponential mA current. Reverse bias ($p \\to -, n \\to +$) widens depletion layer, yielding tiny $\\mu\\text{A}$ reverse saturation current.",
      "Rectifiers: Half-wave produces pulsed DC with ripple frequency $f_{\\text{out}} = f_{\\text{in}}$ (efficiency $40.6\\%$); Full-wave produces $f_{\\text{out}} = 2 f_{\\text{in}}$ (efficiency $81.2\\%$).",
      "Special Diodes: Zener (heavily doped, reverse breakdown, constant voltage regulator); Photodiode (reverse biased, optical detector); LED (forward biased, emits light $h\\nu \\approx E_g$); Solar Cell (unbiased, photovoltaic effect).",
      "Logic Gates: AND ($Y = A \\cdot B$), OR ($Y = A + B$), NOT ($Y = \\bar{A}$). Universal gates: NAND ($Y = \\overline{A \\cdot B}$) and NOR ($Y = \\overline{A + B}$).",
    ],
    coreConcepts: [
      {
        title: "p-n Junction Formation, Barrier Potential & Biasing",
        content:
          "When a p-type semiconductor is joined crystallographically to an n-type semiconductor:\n1. **Diffusion Current:** Majority holes from p-side diffuse into n-side, and majority electrons from n-side diffuse into p-side due to concentration gradient.\n2. **Depletion Layer:** Recombining carriers expose unneutralized immobile ionized donor cores ($+$) on n-side and ionized acceptor cores ($-$) on p-side. This space-charge region is void of free mobile carriers, having width $W \\sim 0.5 - 1\\ \\mu\\text{m}$.\n3. **Drift Current & Barrier Potential ($V_0$):** The built-in electric field ($\\\\sim 10^6\\text{ V/m}$) points from n to p, sweeping minority carriers across the junction (drift). In equilibrium, Diffusion Current = Drift Current, and net current is zero.\n\n**Biasing Characteristics:**\n- **Forward Bias:** Battery positive to p-side, negative to n-side. Applied voltage opposes barrier potential: effective barrier $= V_0 - V$. Depletion layer narrows. Beyond knee voltage ($0.7\\text{ V}$ for Si, $0.3\\text{ V}$ for Ge), current rises exponentially (milliamperes, mA).\n- **Reverse Bias:** Battery positive to n-side, negative to p-side. Applied voltage aids barrier potential: effective barrier $= V_0 + V$. Depletion layer widens. Current drops to a small, almost voltage-independent reverse saturation current (microamperes, $\\mu\\text{A}$) carried exclusively by minority carriers.",
      },
      {
        title: "Rectifiers: Half-Wave & Full-Wave",
        content:
          "Rectification is the conversion of alternating current (AC) into unidirectional direct current (DC).\n\n1. **Half-Wave Rectifier:**\n   - Uses 1 diode.\n   - Conducts only during positive half-cycle of input AC; remains reverse-biased and off during negative half-cycle.\n   - Output ripple frequency: $f_{\\text{out}} = f_{\\text{in}}$ (for $50\\text{ Hz}$ AC, output has $50\\text{ Hz}$ pulses).\n   - Maximum theoretical efficiency: $\\eta_{\\max} = \\frac{0.406 R_L}{r_f + R_L} \\approx 40.6\\%$.\n\n2. **Full-Wave Rectifier (Center-Tapped or Bridge):**\n   - Uses 2 diodes (center-tapped) or 4 diodes (bridge).\n   - Diode $D_1$ conducts during positive half-cycle; Diode $D_2$ conducts during negative half-cycle. Current through load resistor $R_L$ flows in the same direction in both half-cycles.\n   - Output ripple frequency: $f_{\\text{out}} = 2 f_{\\text{in}}$ (for $50\\text{ Hz}$ AC, output has $100\\text{ Hz}$ pulses).\n   - Maximum theoretical efficiency: $\\eta_{\\max} = \\frac{0.812 R_L}{r_f + R_L} \\approx 81.2\\%$.\n   - Capacitor filter: Smoothes ripple by charging to peak voltage $V_m$ and discharging slowly through $R_L$.",
      },
      {
        title: "Special Purpose Diodes",
        content:
          "1. **Zener Diode:** Heavily doped p-n junction with an ultra-thin depletion layer ($< 1\\ \\mu\\text{m}$) and high internal electric field ($> 5 \\times 10^6\\text{ V/m}$). Operates under **reverse breakdown**. At the Zener breakdown voltage $V_Z$, reverse current increases sharply while the voltage across the diode remains virtually constant. Used as a **DC Voltage Regulator** in parallel with load $R_L$.\n2. **Photodiode:** Operates under **reverse bias**. Light of energy $h\\nu > E_g$ falls on the depletion layer, generating electron-hole pairs that are swept apart by the junction field. Reverse saturation current increases linearly with incident light intensity. Operated in reverse bias because the fractional increase in minority carrier current ($\\Delta I_{\\text{rev}} / I_{\\text{rev}}$) is substantially larger and easier to measure than in forward bias.\n3. **Light Emitting Diode (LED):** Heavily doped p-n junction operating under **forward bias**. Electrons and holes recombine near the junction, emitting energy as photons ($h\\nu \\approx E_g$). Must have direct band gap ($E_g \\ge 1.8\\text{ eV}$ for visible light, e.g. $\\text{GaAs}_{1-x}\\text{P}_x$).\n4. **Solar Cell:** Unbiased p-n junction that converts solar photon energy directly into electrical energy via three sequential processes: **Generation** of electron-hole pairs, **Separation** by junction electric field, and **Collection** at front and back metal contacts. $I-V$ characteristic is plotted in the fourth quadrant ($I < 0, V > 0$).",
      },
      {
        title: "Digital Logic Gates & Boolean Algebra",
        content:
          "Logic gates process binary signals ($0$ = Low / False, $1$ = High / True):\n1. **Basic Gates:**\n   - **OR Gate:** $Y = A + B$ (Output is 1 if either input is 1).\n   - **AND Gate:** $Y = A \\cdot B$ (Output is 1 only if both inputs are 1).\n   - **NOT Gate (Inverter):** $Y = \\bar{A}$ (Output is inverted).\n2. **Universal Gates:**\n   - **NAND Gate:** $Y = \\overline{A \\cdot B}$ (AND followed by NOT). Can implement ANY Boolean function.\n   - **NOR Gate:** $Y = \\overline{A + B}$ (OR followed by NOT). Can implement ANY Boolean function.\n3. **De Morgan's Laws:**\n   $$\\overline{A + B} = \\bar{A} \\cdot \\bar{B}$$\n   $$\\overline{A \\cdot B} = \\bar{A} + \\bar{B}$$\n4. **XOR Gate:** $Y = A \\oplus B = A\\bar{B} + \\bar{A}B$ (Output is 1 if inputs are different).",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Dynamic / AC Resistance of Diode",
        formula: "r_d = \\frac{\\Delta V}{\\Delta I}",
        symbols: "\\Delta V: small change in voltage, \\Delta I: corresponding change in current",
        siUnits: "Ohm (\\Omega)",
        applicationCondition: "Linear segment of I-V forward or reverse characteristic",
      },
      {
        name: "Rectifier Ripple Frequency",
        formula: "f_{\\text{out}} = f_{\\text{in}} \\text{ (Half-Wave)}, \\quad f_{\\text{out}} = 2 f_{\\text{in}} \\text{ (Full-Wave)}",
        symbols: "f_{\\text{in}}: frequency of input AC line (typically 50 Hz)",
        siUnits: "Hertz (Hz)",
        applicationCondition: "Standard sinusoidal AC input",
      },
      {
        name: "Rectifier Maximum Efficiency",
        formula: "\\eta_{\\max} = 40.6\\% \\text{ (Half-Wave)}, \\quad \\eta_{\\max} = 81.2\\% \\text{ (Full-Wave)}",
        symbols: "\\eta = P_{\\text{dc}} / P_{\\text{ac}}",
        siUnits: "Percentage (%)",
        applicationCondition: "Ideal diode with zero forward resistance",
      },
      {
        name: "De Morgan's Laws",
        formula: "\\overline{A + B} = \\bar{A} \\cdot \\bar{B}, \\quad \\overline{A \\cdot B} = \\bar{A} + \\bar{B}",
        symbols: "A, B: binary logic variables",
        siUnits: "Dimensionless binary logic",
        applicationCondition: "Boolean simplification and universal gate conversion",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="pGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25"/>
      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1"/>
    </linearGradient>
    <linearGradient id="nGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#ec4899" stopOpacity="0.1"/>
      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="760" height="260" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>

  <!-- Left: p-n Junction Depletion Layer -->
  <g transform="translate(30, 20)">
    <text x="150" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">p-n Junction & Depletion Region</text>
    
    <!-- p-region -->
    <rect x="20" y="50" width="100" height="120" fill="url(#pGrad)" stroke="#38bdf8" strokeWidth="1.5"/>
    <text x="70" y="75" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">p-type</text>
    <text x="70" y="95" fill="#94a3b8" fontSize="10" textAnchor="middle">Majority: Holes</text>

    <!-- Depletion region -->
    <rect x="120" y="50" width="60" height="120" fill="#334155" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,3"/>
    <!-- Negative ions on p-side -->
    <circle cx="132" cy="80" r="5" fill="#ef4444"/>
    <text x="132" y="83" fill="#fff" fontSize="8" textAnchor="middle">-</text>
    <circle cx="132" cy="110" r="5" fill="#ef4444"/>
    <text x="132" y="113" fill="#fff" fontSize="8" textAnchor="middle">-</text>
    <circle cx="132" cy="140" r="5" fill="#ef4444"/>
    <text x="132" y="143" fill="#fff" fontSize="8" textAnchor="middle">-</text>
    <!-- Positive ions on n-side -->
    <circle cx="168" cy="80" r="5" fill="#3b82f6"/>
    <text x="168" y="83" fill="#fff" fontSize="8" textAnchor="middle">+</text>
    <circle cx="168" cy="110" r="5" fill="#3b82f6"/>
    <text x="168" y="113" fill="#fff" fontSize="8" textAnchor="middle">+</text>
    <circle cx="168" cy="140" r="5" fill="#3b82f6"/>
    <text x="168" y="143" fill="#fff" fontSize="8" textAnchor="middle">+</text>

    <!-- n-region -->
    <rect x="180" y="50" width="100" height="120" fill="url(#nGrad)" stroke="#ec4899" strokeWidth="1.5"/>
    <text x="230" y="75" fill="#ec4899" fontSize="14" fontWeight="bold" textAnchor="middle">n-type</text>
    <text x="230" y="95" fill="#94a3b8" fontSize="10" textAnchor="middle">Majority: e⁻</text>

    <!-- Built-in electric field arrow -->
    <line x1="170" y1="185" x2="130" y2="185" stroke="#fbbf24" strokeWidth="2"/>
    <text x="150" y="200" fill="#fbbf24" fontSize="10" textAnchor="middle">E_barrier (n → p)</text>
    <text x="150" y="225" fill="#cbd5e1" fontSize="10" textAnchor="middle">Depletion Width W ≈ 0.5 - 1 μm</text>
  </g>

  <!-- Divider -->
  <line x1="365" y1="25" x2="365" y2="235" stroke="#334155" strokeWidth="1" strokeDasharray="4,4"/>

  <!-- Right: Diode I-V Characteristic -->
  <g transform="translate(410, 20)">
    <text x="150" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Diode I-V Characteristic Curve</text>
    
    <!-- Axes -->
    <line x1="30" y1="130" x2="290" y2="130" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="280" y="120" fill="#94a3b8" fontSize="10">+V_F (V)</text>
    <text x="30" y="120" fill="#94a3b8" fontSize="10">-V_R (V)</text>
    <line x1="160" y1="220" x2="160" y2="40" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="165" y="45" fill="#94a3b8" fontSize="10">+I_F (mA)</text>
    <text x="165" y="215" fill="#94a3b8" fontSize="10">-I_R (μA)</text>

    <!-- Forward characteristic curve -->
    <path d="M 160,130 Q 210,130 220,115 Q 225,90 230,50" fill="none" stroke="#38bdf8" strokeWidth="2.5"/>
    <text x="215" y="145" fill="#38bdf8" fontSize="9">Knee V_0 (0.7V)</text>

    <!-- Reverse characteristic curve -->
    <path d="M 160,130 L 70,135 L 65,210" fill="none" stroke="#ec4899" strokeWidth="2.5"/>
    <text x="70" y="150" fill="#ec4899" fontSize="9">Reverse Sat. Current (μA)</text>
    <text x="50" y="225" fill="#fbbf24" fontSize="10" fontWeight="bold">V_Z (Zener Breakdown)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        question:
          "In a center-tapped full-wave rectifier, an alternating voltage of frequency $50\\text{ Hz}$ is applied to the input transformer. What is the fundamental ripple frequency of the output DC voltage across the load resistor?",
        options: [
          "(A) 25 Hz",
          "(B) 50 Hz",
          "(C) 100 Hz",
          "(D) 200 Hz",
        ],
        correctOption: "(C) 100 Hz",
        solutionStepByStep: [
          "Step 1: In a full-wave rectifier, both the positive and negative half-cycles of the input AC are converted into output DC pulses in the same direction.",
          "Step 2: Therefore, for each complete cycle of the input AC, the rectified output completes 2 cycles.",
          "Step 3: Output ripple frequency $f_{\\text{out}} = 2 f_{\\text{in}}$.",
          "Step 4: Given $f_{\\text{in}} = 50\\text{ Hz}$, the output ripple frequency is $f_{\\text{out}} = 2 \\times 50\\text{ Hz} = 100\\text{ Hz}$.",
        ],
      },
      {
        question:
          "Which Boolean expression represents the logic circuit constructed by connecting the output of a NAND gate to both inputs of another NAND gate?",
        options: [
          "(A) A + B (OR)",
          "(B) A · B (AND)",
          "(C) A ⊕ B (XOR)",
          "(D) NOT (A · B)",
        ],
        correctOption: "(B) A · B (AND)",
        solutionStepByStep: [
          "Step 1: The first NAND gate receives inputs $A$ and $B$, giving output $Y_1 = \\overline{A \\cdot B}$.",
          "Step 2: The second NAND gate has both of its inputs tied together to $Y_1$.",
          "Step 3: A NAND gate with tied inputs acts as an inverter (NOT gate): $Y_2 = \\overline{Y_1 \\cdot Y_1} = \\overline{Y_1}$.",
          "Step 4: Substitute $Y_1$: $Y_2 = \\overline{\\overline{A \\cdot B}} = A \\cdot B$. Thus, the combination acts as an **AND gate**.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Rectifier Ripple Frequency",
        frequency: "Very High (guaranteed question)",
        typicalStem: "If the input AC frequency to a half-wave / full-wave rectifier is 60 Hz, the output frequency is...",
        strategy: "Half-wave: $f_{\\text{out}} = f_{\\text{in}} = 60\\text{ Hz}$. Full-wave: $f_{\\text{out}} = 2 f_{\\text{in}} = 120\\text{ Hz}$.",
      },
      {
        patternType: "Zener Diode Operation & Roles",
        frequency: "High",
        typicalStem: "A Zener diode is designed to operate primarily in...",
        strategy: "Reverse breakdown region. In this mode, voltage remains constant ($V_Z$) while current fluctuates to absorb input variations, acting as a voltage regulator.",
      },
      {
        patternType: "Logic Gate Truth Tables & Universal Gates",
        frequency: "Very High",
        typicalStem: "Given a truth table with outputs 1, 1, 1, 0, identify the gate.",
        strategy: "Inputs (0,0)→1, (0,1)→1, (1,0)→1, (1,1)→0 is **NAND**. Inputs (0,0)→1, (0,1)→0, (1,0)→0, (1,1)→0 is **NOR**.",
      },
    ],
    commonTraps: [
      {
        concept: "Photodiode Biasing Mode",
        misconception: "Students often guess photodiode operates in forward bias because it generates current.",
        correctFact: "Photodiodes are strictly operated in **REVERSE BIAS**. Under reverse bias, the dark current is tiny (minority carriers), so the fractional change upon illumination ($\\Delta I / I_0$) is very large and easily detected.",
      },
      {
        concept: "Depletion layer behavior under forward vs reverse bias",
        misconception: "Confusing whether depletion layer widens or narrows.",
        correctFact: "Forward bias pushes carriers toward junction, **narrowing** the depletion layer. Reverse bias pulls carriers away from junction, **widening** the depletion layer.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Rectifier Ripple Doubler",
        mnemonic: "FULL = TWICE",
        explanation: "Full-wave rectifier doubles the input frequency ($f_{\\text{out}} = 2 f_{\\text{in}}$). Half-wave keeps it the same ($f_{\\text{out}} = f_{\\text{in}}$).",
      },
      {
        title: "Universal Gates",
        mnemonic: "NO-NA are Universal",
        explanation: "NOR and NAND are the two universal logic gates.",
      },
    ],
    quickRevisionCard: {
      keyPoints: [
        "p-n junction: Diffusion creates depletion layer and barrier potential (Si: 0.7 V, Ge: 0.3 V). Built-in field points from n to p.",
        "Forward bias: p → (+), n → (-); depletion layer narrows, barrier drops (V₀ - V), current in mA.",
        "Reverse bias: p → (-), n → (+); depletion layer widens, barrier increases (V₀ + V), current in μA.",
        "Dynamic resistance r_d = ΔV / ΔI.",
        "Half-wave rectifier: 1 diode, f_out = f_in, max efficiency 40.6%.",
        "Full-wave rectifier: 2 or 4 diodes, f_out = 2 f_in, max efficiency 81.2%.",
        "Zener diode: Heavily doped, thin depletion layer, operates in reverse breakdown as voltage regulator.",
        "Photodiode: Reverse biased, optical signal detector (fractional change in reverse current is large).",
        "LED: Forward biased, spontaneous photon emission (direct band gap E_g ≥ 1.8 eV).",
        "Solar Cell: Unbiased p-n junction generating EMF via photovoltaic effect.",
        "Universal gates: NAND and NOR. De Morgan: (A + B)' = A' · B' and (A · B)' = A' + B'.",
      ],
      examTricks: [
        "In a Zener regulator circuit: Load voltage V_L = V_Z (fixed). If unregulated input V_in increases, excess voltage drops across series resistor R_s, and Zener current I_Z increases.",
        "For an LED to emit visible light (red to violet), its semiconductor band gap must be at least 1.8 eV (hc / 700 nm ≈ 1.8 eV).",
      ],
    },
    practiceQuestions: [
      {
        id: "phys_u9_q11",
        question: "In a half-wave rectifier, if the input AC frequency is 50 Hz, the output ripple frequency is:",
        options: [
          "(A) 25 Hz",
          "(B) 50 Hz",
          "(C) 100 Hz",
          "(D) 0 Hz",
        ],
        correctAnswer: "(B) 50 Hz",
        explanation: "A half-wave rectifier conducts once per complete AC input cycle. Thus the output frequency equals the input frequency (50 Hz).",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u9_q12",
        question: "When a p-n junction diode is forward biased, the width of the depletion layer:",
        options: [
          "(A) Increases",
          "(B) Decreases",
          "(C) Remains unchanged",
          "(D) Initially increases then decreases",
        ],
        correctAnswer: "(B) Decreases",
        explanation: "Forward biasing applies a field opposing the built-in barrier field, reducing the barrier potential (V₀ - V) and causing majority carriers to push into the junction, which narrows the depletion layer.",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u9_q13",
        question: "A photodiode is preferably operated under reverse bias because:",
        options: [
          "(A) Reverse bias creates higher forward current",
          "(B) The fractional change in minority carrier current upon illumination is much larger and easily detectable",
          "(C) Reverse bias prevents the diode from burning out",
          "(D) It cannot conduct under forward bias",
        ],
        correctAnswer: "(B) The fractional change in minority carrier current upon illumination is much larger and easily detectable",
        explanation: "Under reverse bias, dark current is extremely small (carried by minority carriers). Generating Δn electron-hole pairs creates a large percentage change (ΔI / I_dark) in reverse current, whereas in forward bias the same ΔI is negligible compared to the large majority current.",
        difficulty: "Medium",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u9_q14",
        question: "Assertion (A): A Zener diode is used to maintain a constant DC voltage across a load resistor despite fluctuations in input voltage.\nReason (R): In the reverse breakdown region, the voltage across a Zener diode remains practically constant over a wide range of reverse currents.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "At Zener breakdown, the dynamic resistance is near zero, meaning dV/dI ≈ 0. Voltage across the diode stays clamped at V_Z while excess current passes through the diode.",
        difficulty: "Easy",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u9_q15",
        question: "Assertion (A): NAND and NOR gates are termed universal logic gates.\nReason (R): Any complex digital logic function (AND, OR, NOT) can be realized using only NAND gates or only NOR gates.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "By combining NAND gates or NOR gates using Boolean identities and De Morgan's laws, all elementary logic operations (NOT, AND, OR) can be constructed without any other gate type.",
        difficulty: "Easy",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u9_q16",
        question: "Match List-I with List-II:\n\nList-I (Semiconductor Device)\n(P) Zener Diode\n(Q) Photodiode\n(R) Light Emitting Diode (LED)\n(S) Solar Cell\n\nList-II (Operating Condition / Characteristic)\n(1) Forward biased, spontaneous light emission\n(2) Reverse biased breakdown, voltage regulation\n(3) Unbiased, converts optical radiation into EMF\n(4) Reverse biased, optical signal detection",
        options: [
          "(A) P-2, Q-4, R-1, S-3",
          "(B) P-4, Q-2, R-3, S-1",
          "(C) P-2, Q-1, R-4, S-3",
          "(D) P-1, Q-2, R-3, S-4",
        ],
        correctAnswer: "(A) P-2, Q-4, R-1, S-3",
        explanation: "Zener operates in reverse breakdown (P-2). Photodiode operates in reverse bias (Q-4). LED is forward biased (R-1). Solar cell is unbiased (S-3).",
        difficulty: "Easy",
        questionType: "Match The Following",
      },
      {
        id: "phys_u9_q17",
        question: "The truth table for a 2-input logic gate has output 1 only when both inputs are 0, and output 0 for all other input combinations. This gate is a/an:",
        options: [
          "(A) AND gate",
          "(B) OR gate",
          "(C) NAND gate",
          "(D) NOR gate",
        ],
        correctAnswer: "(D) NOR gate",
        explanation: "For NOR gate: Y = NOT(A OR B). If A=0, B=0 ⇒ 0 OR 0 = 0 ⇒ NOT(0) = 1. For (0,1), (1,0), (1,1), A OR B = 1 ⇒ NOT(1) = 0.",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u9_q18",
        question: "The maximum efficiency of a full-wave rectifier without filter is:",
        options: [
          "(A) 40.6%",
          "(B) 50.0%",
          "(C) 81.2%",
          "(D) 100%",
        ],
        correctAnswer: "(C) 81.2%",
        explanation: "The maximum theoretical conversion efficiency of a full-wave rectifier is 8/π² ≈ 81.2%. For a half-wave rectifier, it is 4/π² ≈ 40.6%.",
        difficulty: "Easy",
        questionType: "Factual Recall",
      },
      {
        id: "phys_u9_q19",
        question: "In a Zener diode voltage regulator, the input unregulated DC voltage is 15 V, the Zener breakdown voltage is 9 V, and the series resistor is 300 Ω. If the load resistor is 1.5 kΩ, what is the Zener current I_Z?",
        options: [
          "(A) 20 mA",
          "(B) 14 mA",
          "(C) 6 mA",
          "(D) 26 mA",
        ],
        correctAnswer: "(B) 14 mA",
        explanation: "Voltage across series resistor V_s = V_in - V_Z = 15 - 9 = 6 V. Total current through series resistor I_s = V_s / R_s = 6 / 300 = 0.02 A = 20 mA. Load current I_L = V_Z / R_L = 9 / 1500 = 0.006 A = 6 mA. Zener current I_Z = I_s - I_L = 20 mA - 6 mA = 14 mA.",
        difficulty: "Hard",
        questionType: "Numerical",
      },
      {
        id: "phys_u9_q20",
        question: "According to De Morgan's theorem, the expression (A + B)' is equivalent to:",
        options: [
          "(A) A' + B'",
          "(B) A' · B'",
          "(C) A · B",
          "(D) (A · B)'",
        ],
        correctAnswer: "(B) A' · B'",
        explanation: "De Morgan's first theorem states: The complement of a sum is equal to the product of the complements: (A + B)' = A' · B'.",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
    ],
    links: {
      prerequisites: ["physics_u9_t1"],
      relatedTopics: ["physics_u1_t1"],
      practiceTestUrl: "/test/practice-physics-unit9-test1",
      weaknessRadarUrl: "/dashboard/radar?subject=physics",
    },
    physicsModule: {
      derivationsInBrief: [
        {
          title: "Full-Wave Rectifier Ripple Frequency and Efficiency",
          steps: [
            "Input AC voltage: v_in = V_m sin(ωt).",
            "Output current through R_L flows for both half-cycles: i(t) = |I_m sin(ωt)|.",
            "Fourier expansion: i(t) = (2 I_m / π) - (4 I_m / 3π) cos(2ωt) - (4 I_m / 15π) cos(4ωt) - ...",
            "Fundamental ripple angular frequency is 2ω, so ripple frequency is f_out = 2 f_in.",
            "DC power P_dc = I_dc² R_L = (2 I_m / π)² R_L; AC input power P_ac = (I_m / √2)² (r_f + R_L).",
            "Efficiency η = P_dc / P_ac = (8/π²) [R_L / (r_f + R_L)] ≈ 81.2% (for r_f << R_L).",
          ],
        },
      ],
      unitDimensionTable: [
        { quantity: "Barrier potential (V₀)", formula: "V₀ = E · W", siUnit: "Volt (V)", dimensionalFormula: "[M¹ L² T⁻³ I⁻¹]" },
        { quantity: "Dynamic resistance (r_d)", formula: "r_d = dV / dI", siUnit: "Ohm (Ω)", dimensionalFormula: "[M¹ L² T⁻³ I⁻²]" },
        { quantity: "Ripple factor (γ)", formula: "γ = I_ac / I_dc = √( (I_rms / I_dc)² - 1 )", siUnit: "Dimensionless (0.48 for full-wave)", dimensionalFormula: "[M⁰ L⁰ T⁰]" },
      ],
      graphInterpretations: [
        {
          graphTitle: "Zener Diode I-V Characteristic Curve",
          axes: "x-axis: Voltage V, y-axis: Current I",
          keyFeatures: "Forward quadrant is identical to a standard diode (knee at ~0.7 V). In reverse quadrant, current stays near zero until V_Z, where the curve plunges almost vertically with near-zero dynamic resistance.",
        },
      ],
    },
  },
];
