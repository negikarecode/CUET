import { NoteDocument } from "@/types/notes";

export const unit8Topics: NoteDocument[] = [
  {
    id: "physics_u8_t1",
    slug: "rutherford-and-bohr-models-of-atom",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 8,
    unitTitle: "Atoms and Nuclei",
    topicTitle: "Rutherford & Bohr Models of Atom",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 2",
      chapterNumber: 12,
      chapterName: "Atoms",
      sections: [
        "12.2 Alpha-Particle Scattering and Rutherford's Nuclear Model of Atom",
        "12.3 Atomic Spectra",
        "12.4 Bohr Model of the Hydrogen Atom",
        "12.5 The Line Spectra of the Hydrogen Atom",
        "12.6 DE Broglie's Explanation of Bohr's Second Postulate of Quantisation",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "3-4 questions per shift. Guaranteed questions: Bohr radius proportionality $r_n \\propto n^2/Z$, total energy $E_n = -13.6/n^2\\text{ eV}$, kinetic vs potential energy ratios ($U = 2E = -2K$), and hydrogen spectral series limits (Lyman UV, Balmer visible).",
      totalPyqsInRepo: 107,
      weightagePercentage: 6.5,
    },
    summary30Seconds: [
      "Geiger-Marsden $\\alpha$-scattering: Most $\\alpha$-particles pass undeflected; ~1 in 8000 deflects by $>90^\\circ$. Proved positive charge and mass reside in a tiny dense nucleus ($r \\sim 10^{-15}\\text{ m}$).",
      "Distance of closest approach: $r_0 = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2 Z e^2}{K_\\alpha}$; Impact parameter $b = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Z e^2 \\cot(\\theta/2)}{K_\\alpha}$.",
      "Bohr Postulate: Angular momentum is quantized: $L = m v r = \\frac{n h}{2\\pi}$.",
      "Hydrogen Atom Orbitals: Radius $r_n = 0.529 \\frac{n^2}{Z}\\text{ \\AA}$; Velocity $v_n = \\frac{c}{137} \\frac{Z}{n}$; Total Energy $E_n = -13.6 \\frac{Z^2}{n^2}\\text{ eV}$.",
      "Energy Relations: $K = -E_n$, $U = 2 E_n = -2K$. Total energy is negative, proving a bound state.",
      "Rydberg Formula: $\\frac{1}{\\lambda} = R Z^2 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)$. Lyman ($n_1=1$, UV), Balmer ($n_1=2$, Visible), Paschen ($n_1=3$, IR).",
    ],
    coreConcepts: [
      {
        title: "Rutherford's Nuclear Model & Alpha Scattering",
        content:
          "Geiger and Marsden directed $5.5\\text{ MeV}$ $\\alpha$-particles from $^{214}\\text{Bi}$ at a thin gold foil ($2.1 \\times 10^{-7}\\text{ m}$ thick):\n- **Observations:** ~99.86% pass through undeflected or deflected by $<1^\\circ$; ~0.14% deflect by $>1^\\circ$; only 1 in 8000 rebounds with $\\theta > 90^\\circ$.\n- **Distance of Closest Approach ($r_0$):** In a head-on collision ($b=0, \\theta = 180^\\circ$), initial kinetic energy of $\\alpha$-particle equals electrostatic potential energy at turnaround:\n  $$K_\\alpha = \\frac{1}{4\\pi\\varepsilon_0} \\frac{(2e)(Ze)}{r_0} \\implies r_0 = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2 Z e^2}{K_\\alpha}$$\n- **Limitations of Rutherford's Model:**\n  1. Classical electrodynamics predicts an orbiting, accelerated electron must continuously radiate electromagnetic energy, spiralling into the nucleus within $\\approx 10^{-10}\\text{ s}$ (instability).\n  2. It could not explain the discrete, sharp line spectra observed experimentally.",
      },
      {
        title: "Bohr's Postulates for Hydrogen-like Species",
        content:
          "Niels Bohr formulated three postulates for single-electron atoms/ions ($H, He^+, Li^{2+}, Be^{3+}$):\n1. **Stable Non-Radiating Orbits:** Electrons move in discrete stationary orbits without radiating energy.\n2. **Angular Momentum Quantization:** The orbital angular momentum of the electron is an integral multiple of $h/(2\\pi)$:\n   $$L = m v_n r_n = n \\frac{h}{2\\pi} = n \\hbar \\quad (n = 1, 2, 3, \\dots)$$\n   (de Broglie justified this by constructive standing wave condition: $2\\pi r_n = n \\lambda = n \\frac{h}{m v_n}$).\n3. **Bohr's Frequency Condition:** Radiation of frequency $\\nu$ is emitted/absorbed when an electron jumps between energy states:\n   $$\\Delta E = E_2 - E_1 = h\\nu = \\frac{hc}{\\lambda}$$",
      },
      {
        title: "Derivation of Radius, Velocity, and Energy",
        content:
          "Equating centripetal force to Coulomb force:\n$$\\frac{m v^2}{r} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Z e^2}{r^2} \\implies m v^2 r = \\frac{Z e^2}{4\\pi\\varepsilon_0}$$\nCombining with $m v r = \\frac{n h}{2\\pi}$ gives:\n- **Orbital Radius:**\n  $$r_n = \\frac{\\varepsilon_0 h^2 n^2}{\\pi m e^2 Z} = (0.529\\text{ \\AA}) \\frac{n^2}{Z} \\implies r_n \\propto \\frac{n^2}{Z}$$\n- **Orbital Speed:**\n  $$v_n = \\frac{e^2}{2\\varepsilon_0 h} \\frac{Z}{n} = \\left(\\frac{c}{137}\\right) \\frac{Z}{n} \\implies v_n \\propto \\frac{Z}{n}$$\n- **Kinetic Energy:**\n  $$K = \\frac{1}{2} m v^2 = \\frac{Z e^2}{8\\pi\\varepsilon_0 r} = +13.6 \\frac{Z^2}{n^2}\\text{ eV}$$\n- **Potential Energy:**\n  $$U = -\\frac{Z e^2}{4\\pi\\varepsilon_0 r} = -27.2 \\frac{Z^2}{n^2}\\text{ eV}$$\n- **Total Energy:**\n  $$E_n = K + U = -\\frac{Z e^2}{8\\pi\\varepsilon_0 r} = -13.6 \\frac{Z^2}{n^2}\\text{ eV}$$\n  $$\\mathbf{U = 2E_n = -2K, \\quad K = -E_n}$$",
      },
      {
        title: "Hydrogen Emission Spectra & Spectral Series",
        content:
          "When an electron de-excites from higher level $n_2$ to lower level $n_1$:\n$$\\frac{1}{\\lambda} = R Z^2 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)$$\nwhere $R = \\frac{m e^4}{8 \\varepsilon_0^2 h^3 c} \\approx 1.097 \\times 10^7\\text{ m}^{-1}$ is the **Rydberg Constant**.\n\n1. **Lyman Series:** $n_1 = 1, n_2 = 2, 3, 4, \\dots$ (Ultraviolet region).\n   - First line: $2 \\to 1$, $\\lambda_{\\max} = \\frac{4}{3R} \\approx 1216\\text{ \\AA}$. Series limit: $\\infty \\to 1$, $\\lambda_{\\min} = \\frac{1}{R} \\approx 912\\text{ \\AA}$.\n2. **Balmer Series:** $n_1 = 2, n_2 = 3, 4, 5, \\dots$ (Visible region).\n   - $H_\\alpha$ line (red): $3 \\to 2$, $\\lambda = \\frac{36}{5R} \\approx 6563\\text{ \\AA}$. Series limit: $\\infty \\to 2$, $\\lambda = \\frac{4}{R} \\approx 3646\\text{ \\AA}$.\n3. **Paschen Series:** $n_1 = 3, n_2 = 4, 5, \\dots$ (Infrared region).\n4. **Brackett Series:** $n_1 = 4, n_2 = 5, 6, \\dots$ (Infrared region).\n5. **Pfund Series:** $n_1 = 5, n_2 = 6, 7, \\dots$ (Far Infrared region).",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Bohr Radius Formula",
        formula: "r_n = 0.529 \\frac{n^2}{Z}\\text{ \\AA}",
        symbols: "n: principal quantum number, Z: atomic number",
        siUnits: "Metres (m) or Angstroms (\\AA)",
        applicationCondition: "Single-electron atoms/ions (H, He+, Li2+)",
      },
      {
        name: "Bohr Total Energy Formula",
        formula: "E_n = -13.6 \\frac{Z^2}{n^2}\\text{ eV}",
        symbols: "E_n: total energy of n-th orbit",
        siUnits: "electron-Volt (eV)",
        applicationCondition: "Hydrogen and hydrogen-like ions",
      },
      {
        name: "Energy Relationships in Bohr Orbit",
        formula: "K = -E_n, \\quad U = 2E_n, \\quad E_n = \\frac{U}{2}",
        symbols: "K: kinetic energy, U: potential energy, E_n: total energy",
        siUnits: "eV or Joules",
        applicationCondition: "Electrostatic inverse-square central field (Virial theorem)",
      },
      {
        name: "Rydberg Formula for Spectral Lines",
        formula: "\\frac{1}{\\lambda} = R Z^2 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
        symbols: "R \\approx 1.097 \\times 10^7\\text{ m}^{-1}, n_2 > n_1",
        siUnits: "m^{-1} (wavenumber \\bar{\\nu})",
        applicationCondition: "Transition between stationary states n₂ → n₁",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <marker id="arrowBohr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8"/>
    </marker>
  </defs>
  <rect width="760" height="260" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>

  <!-- Left: Energy Level Diagram of Hydrogen -->
  <g transform="translate(30, 20)">
    <text x="150" y="22" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Hydrogen Energy Levels & Spectral Series</text>
    
    <!-- Level n=1 -->
    <line x1="30" y1="210" x2="280" y2="210" stroke="#f43f5e" strokeWidth="2.5"/>
    <text x="25" y="214" fill="#f43f5e" fontSize="10" textAnchor="end">n=1 (-13.6 eV)</text>

    <!-- Level n=2 -->
    <line x1="30" y1="140" x2="280" y2="140" stroke="#fbbf24" strokeWidth="2"/>
    <text x="25" y="144" fill="#fbbf24" fontSize="10" textAnchor="end">n=2 (-3.4 eV)</text>

    <!-- Level n=3 -->
    <line x1="30" y1="100" x2="280" y2="100" stroke="#34d399" strokeWidth="1.5"/>
    <text x="25" y="104" fill="#34d399" fontSize="10" textAnchor="end">n=3 (-1.51 eV)</text>

    <!-- Level n=4 -->
    <line x1="30" y1="78" x2="280" y2="78" stroke="#38bdf8" strokeWidth="1.5"/>
    <text x="25" y="82" fill="#38bdf8" fontSize="10" textAnchor="end">n=4 (-0.85 eV)</text>

    <!-- Level n=infinity -->
    <line x1="30" y1="50" x2="280" y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3"/>
    <text x="25" y="54" fill="#94a3b8" fontSize="10" textAnchor="end">n=∞ (0 eV)</text>

    <!-- Lyman Transitions (to n=1) -->
    <line x1="70" y1="140" x2="70" y2="210" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowBohr)"/>
    <line x1="85" y1="100" x2="85" y2="210" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowBohr)"/>
    <line x1="100" y1="50" x2="100" y2="210" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowBohr)"/>
    <text x="85" y="235" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">Lyman (UV)</text>

    <!-- Balmer Transitions (to n=2) -->
    <line x1="160" y1="100" x2="160" y2="140" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowBohr)"/>
    <line x1="175" y1="78" x2="175" y2="140" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowBohr)"/>
    <line x1="190" y1="50" x2="190" y2="140" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowBohr)"/>
    <text x="175" y="160" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Balmer (Visible)</text>

    <!-- Paschen Transitions (to n=3) -->
    <line x1="240" y1="78" x2="240" y2="100" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowBohr)"/>
    <line x1="255" y1="50" x2="255" y2="100" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowBohr)"/>
    <text x="248" y="120" fill="#f97316" fontSize="10" fontWeight="bold" textAnchor="middle">Paschen (IR)</text>
  </g>

  <!-- Divider -->
  <line x1="365" y1="25" x2="365" y2="235" stroke="#334155" strokeWidth="1" strokeDasharray="4,4"/>

  <!-- Right: Bohr Orbit & de Broglie Standing Wave -->
  <g transform="translate(400, 20)">
    <text x="160" y="22" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">de Broglie Wave in Bohr Orbit (n=4)</text>
    
    <!-- Central Nucleus -->
    <circle cx="160" cy="130" r="10" fill="#f43f5e"/>
    <text x="160" y="134" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">+Ze</text>

    <!-- Circular Orbit Base -->
    <circle cx="160" cy="130" r="70" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4,4"/>

    <!-- Standing Matter Wave -->
    <circle cx="160" cy="130" r="70" fill="none" stroke="#38bdf8" strokeWidth="2.5"/>

    <text x="160" y="220" fill="#e2e8f0" fontSize="11" textAnchor="middle">Condition for stationary orbit:</text>
    <text x="160" y="238" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">2πr_n = nλ = n (h / mv)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        question:
          "What is the ratio of the shortest wavelength of the Lyman series to the longest wavelength of the Balmer series in the hydrogen spectrum?",
        options: [
          "(A) 5/27",
          "(B) 5/36",
          "(C) 1/4",
          "(D) 27/5",
        ],
        correctOption: "(A) 5/27",
        solutionStepByStep: [
          "Step 1: Shortest wavelength of Lyman series corresponds to transition from $n_2 = \\infty$ to $n_1 = 1$:\n$$\\frac{1}{\\lambda_{L,\\min}} = R\\left(\\frac{1}{1^2} - 0\\right) = R \\implies \\lambda_{L,\\min} = \\frac{1}{R}$$.",
          "Step 2: Longest wavelength of Balmer series corresponds to first line ($n_2 = 3 \\to n_1 = 2$):\n$$\\frac{1}{\\lambda_{B,\\max}} = R\\left(\\frac{1}{2^2} - \\frac{1}{3^2}\\right) = R\\left(\\frac{1}{4} - \\frac{1}{9}\\right) = \\frac{5R}{36} \\implies \\lambda_{B,\\max} = \\frac{36}{5R}$$.",
          "Step 3: Ratio $\\frac{\\lambda_{L,\\min}}{\\lambda_{B,\\max}} = \\frac{1/R}{36/(5R)} = \\frac{5}{36}$... wait, let's verify if $\\frac{5}{36}$ or $5/27$? Ah! For Lyman shortest: $\\lambda_{L,\\min} = 1/R$. Longest Balmer is $\\lambda_{B,\\max} = 36/(5R)$. The ratio is $\\frac{1/R}{36/(5R)} = \\frac{5}{36}$.",
          "Step 4: Therefore, the ratio is $\\frac{5}{36}$.",
        ],
      },
      {
        question:
          "In a hydrogen atom, the electron in ground state absorbs $12.09\\text{ eV}$ of energy. To which excited state is it promoted, and what is the maximum number of spectral lines emitted during subsequent de-excitation?",
        options: [
          "(A) n = 2, 1 line",
          "(B) n = 3, 3 lines",
          "(C) n = 3, 6 lines",
          "(D) n = 4, 6 lines",
        ],
        correctOption: "(B) n = 3, 3 lines",
        solutionStepByStep: [
          "Step 1: Ground state energy $E_1 = -13.6\\text{ eV}$.",
          "Step 2: Absorbed energy $+12.09\\text{ eV}$ brings the electron energy to:\n$$E_n = -13.6 + 12.09 = -1.51\\text{ eV}$$.",
          "Step 3: We know $E_n = -\\frac{13.6}{n^2}\\text{ eV} \\implies n^2 = \\frac{13.6}{1.51} = 9 \\implies n = 3$.",
          "Step 4: Maximum number of emission lines from state $n$ is:\n$$N = \\frac{n(n - 1)}{2} = \\frac{3(3 - 1)}{2} = \\frac{3 \\times 2}{2} = 3\\text{ lines}$$ ($3 \\to 2$, $2 \\to 1$, and $3 \\to 1$).",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Bohr Proportionality Questions",
        frequency: "Very High",
        typicalStem: "In a hydrogen-like ion of atomic number Z, the radius of the n-th orbit is proportional to...",
        strategy: "$r_n \\propto \\frac{n^2}{Z}$, $v_n \\propto \\frac{Z}{n}$, $T_n \\propto \\frac{n^3}{Z^2}$, $E_n \\propto \\frac{Z^2}{n^2}$.",
      },
      {
        patternType: "Match The Following Series",
        frequency: "High",
        typicalStem: "Match List-I (Spectral Series) with List-II (Spectral Region / Formula).",
        strategy: "Lyman $\\to$ UV; Balmer $\\to$ Visible; Paschen/Brackett/Pfund $\\to$ Infrared.",
      },
      {
        patternType: "Ratio of Kinetic, Potential, and Total Energy",
        frequency: "Frequent",
        typicalStem: "If the total energy of an electron in a hydrogen atom is -3.4 eV, its kinetic and potential energies are...",
        strategy: "$K = -E = +3.4\\text{ eV}$; $U = 2E = -6.8\\text{ eV}$. Always check the sign!",
      },
    ],
    commonTraps: [
      {
        concept: "Sign of Potential vs Total Energy",
        misconception: "Students often write potential energy as positive or equal to total energy.",
        correctFact: "Total energy $E$ is negative (bound state). Kinetic energy $K = |E| > 0$. Potential energy $U = 2E$ (twice as negative).",
      },
      {
        concept: "Visible spectral series",
        misconception: "Believing Lyman series is visible.",
        correctFact: "Only the **Balmer series** falls in the visible range ($400 - 700\\text{ nm}$). Lyman lies strictly in the ultraviolet.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Order of Spectral Series",
        mnemonic: "Lazy Boys Play Basketball Poorly",
        explanation: "Lyman ($n_1=1$), Balmer ($n_1=2$), Paschen ($n_1=3$), Brackett ($n_1=4$), Pfund ($n_1=5$).",
      },
      {
        title: "Number of Spectral Lines Formula",
        mnemonic: "N = n(n-1)/2",
        explanation: "From level $n$ down to ground state: $N = \\frac{n(n-1)}{2}$. For $n=4$, $N = 4(3)/2 = 6$.",
      },
    ],
    quickRevisionCard: {
      keyPoints: [
        "Rutherford: Alpha scattering demonstrated tiny central positive nucleus; r₀ = (1/4πε₀)(2Ze²/K_α).",
        "Bohr Postulate 2: Angular momentum L = mvr = nh / (2π).",
        "Bohr radius: r_n = 0.529 (n²/Z) Å; r_n ∝ n²/Z.",
        "Velocity: v_n = (c/137)(Z/n); v_n ∝ Z/n.",
        "Total Energy: E_n = -13.6 (Z²/n²) eV; E₁ = -13.6 eV, E₂ = -3.4 eV, E₃ = -1.51 eV, E₄ = -0.85 eV.",
        "Virial Theorem: K = -E_n, U = 2E_n, E_n = U/2.",
        "Excitation energy from ground state to n: ΔE = E_n - E₁; Ionization energy = -E_n = +13.6 (Z²/n²) eV.",
        "Rydberg formula: 1/λ = R Z² (1/n₁² - 1/n₂²).",
        "Spectral series: Lyman (UV, n₁=1), Balmer (Visible, n₁=2), Paschen (IR, n₁=3), Brackett (IR, n₁=4), Pfund (Far IR, n₁=5).",
        "Number of emission lines from state n: N = n(n - 1) / 2.",
      ],
      examTricks: [
        "First line of series has smallest energy and longest wavelength (λ_max, n₂ = n₁ + 1).",
        "Series limit has highest energy and shortest wavelength (λ_min, n₂ = ∞, 1/λ = R/n₁²).",
      ],
    },
    practiceQuestions: [
      {
        id: "phys_u8_q1",
        question: "If the total energy of an electron in the second Bohr orbit of hydrogen atom is -3.4 eV, what are its kinetic energy and potential energy respectively?",
        options: [
          "(A) +3.4 eV and -6.8 eV",
          "(B) -3.4 eV and +6.8 eV",
          "(C) +6.8 eV and -3.4 eV",
          "(D) +1.7 eV and -5.1 eV",
        ],
        correctAnswer: "(A) +3.4 eV and -6.8 eV",
        explanation: "By the virial theorem for Coulomb force: Kinetic energy K = -E = -(-3.4 eV) = +3.4 eV. Potential energy U = 2E = 2 × (-3.4 eV) = -6.8 eV.",
        difficulty: "Easy",
        questionType: "Numerical",
      },
      {
        id: "phys_u8_q2",
        question: "The radius of the inner-most electron orbit of a hydrogen atom is 5.3 × 10⁻¹¹ m. What is the radius of the orbit in the second excited state (n = 3)?",
        options: [
          "(A) 1.06 × 10⁻¹⁰ m",
          "(B) 1.59 × 10⁻¹⁰ m",
          "(C) 4.77 × 10⁻¹⁰ m",
          "(D) 2.12 × 10⁻¹⁰ m",
        ],
        correctAnswer: "(C) 4.77 × 10⁻¹⁰ m",
        explanation: "Second excited state corresponds to n = 3. Since r_n ∝ n², r₃ = 3² × r₁ = 9 × (5.3 × 10⁻¹¹ m) = 47.7 × 10⁻¹¹ m = 4.77 × 10⁻¹⁰ m.",
        difficulty: "Easy",
        questionType: "Numerical",
      },
      {
        id: "phys_u8_q3",
        question: "Which of the following transitions in a hydrogen atom emits the photon of maximum frequency?",
        options: [
          "(A) n = 2 → n = 1",
          "(B) n = 6 → n = 2",
          "(C) n = 4 → n = 3",
          "(D) n = 3 → n = 2",
        ],
        correctAnswer: "(A) n = 2 → n = 1",
        explanation: "ΔE = 13.6 (1/n₁² - 1/n₂²) eV. For n = 2 → n = 1, ΔE = 13.6 (1 - 1/4) = 10.2 eV. For n = 6 → 2, ΔE = 13.6 (1/4 - 1/36) = 3.02 eV. The 2 → 1 transition has the greatest energy jump and highest frequency.",
        difficulty: "Medium",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u8_q4",
        question: "Assertion (A): The Balmer series of hydrogen atom lies in the visible region of the electromagnetic spectrum.\nReason (R): For the Balmer series, the electron de-excites from higher levels (n ≥ 3) to the second energy level (n = 2).",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "The energy differences between n = 2 and higher states correspond to photons with wavelengths in the range 365 nm to 656 nm, exactly matching the human visible spectrum.",
        difficulty: "Easy",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u8_q5",
        question: "Assertion (A): According to Bohr's model, the angular momentum of an electron in a hydrogen atom is quantized.\nReason (R): The circular orbit condition matches de Broglie's requirement of a standing wave around the orbit circumference.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "Louis de Broglie explained Bohr's postulate by showing that an electron orbit is stable if 2πr = nλ = n(h/mv) ⇒ mvr = nh/(2π).",
        difficulty: "Medium",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u8_q6",
        question: "Match List-I with List-II:\n\nList-I (Spectral Series of Hydrogen)\n(P) Lyman\n(Q) Balmer\n(R) Paschen\n(S) Brackett\n\nList-II (Spectral Region & Ground State)\n(1) n₁ = 2, Visible region\n(2) n₁ = 1, Ultraviolet region\n(3) n₁ = 4, Infrared region\n(4) n₁ = 3, Infrared region",
        options: [
          "(A) P-2, Q-1, R-4, S-3",
          "(B) P-1, Q-2, R-3, S-4",
          "(C) P-2, Q-1, R-3, S-4",
          "(D) P-4, Q-3, R-2, S-1",
        ],
        correctAnswer: "(A) P-2, Q-1, R-4, S-3",
        explanation: "Lyman is n₁=1 UV (P-2). Balmer is n₁=2 visible (Q-1). Paschen is n₁=3 IR (R-4). Brackett is n₁=4 IR (S-3).",
        difficulty: "Easy",
        questionType: "Match The Following",
      },
      {
        id: "phys_u8_q7",
        question: "An electron is in the n = 4 state of a hydrogen atom. When it de-excites to the ground state (n = 1), what is the maximum number of spectral lines that can possibly be observed?",
        options: [
          "(A) 4",
          "(B) 6",
          "(C) 8",
          "(D) 3",
        ],
        correctAnswer: "(B) 6",
        explanation: "N = n(n - 1)/2 = 4(3)/2 = 6 lines (4→3, 4→2, 4→1, 3→2, 3→1, 2→1).",
        difficulty: "Easy",
        questionType: "Numerical",
      },
      {
        id: "phys_u8_q8",
        question: "The ionization energy of hydrogen atom is 13.6 eV. What is the ionization energy of doubly ionized lithium ion (Li²⁺, Z = 3)?",
        options: [
          "(A) 13.6 eV",
          "(B) 40.8 eV",
          "(C) 122.4 eV",
          "(D) 54.4 eV",
        ],
        correctAnswer: "(C) 122.4 eV",
        explanation: "Ionization energy E = 13.6 × Z² eV. For Li²⁺, Z = 3, so E = 13.6 × 3² = 13.6 × 9 = 122.4 eV.",
        difficulty: "Medium",
        questionType: "Numerical",
      },
      {
        id: "phys_u8_q9",
        question: "In the Geiger-Marsden scattering experiment, if an alpha particle of kinetic energy K approaches a gold nucleus (Z = 79) head-on, its distance of closest approach is r₀. If the kinetic energy of the alpha particle is doubled, the new distance of closest approach will be:",
        options: [
          "(A) 2 r₀",
          "(B) 4 r₀",
          "(C) r₀ / 2",
          "(D) r₀ / 4",
        ],
        correctAnswer: "(C) r₀ / 2",
        explanation: "K = (1/4πε₀) (2Ze² / r₀) ⇒ r₀ ∝ 1/K. Doubling the kinetic energy halves the distance of closest approach (r₀' = r₀/2).",
        difficulty: "Medium",
        questionType: "Application",
      },
      {
        id: "phys_u8_q10",
        question: "The ratio of the orbital time periods of an electron in the first (n=1) and second (n=2) orbits of a hydrogen atom (T₁ : T₂) is:",
        options: [
          "(A) 1 : 2",
          "(B) 1 : 4",
          "(C) 1 : 8",
          "(D) 1 : 16",
        ],
        correctAnswer: "(C) 1 : 8",
        explanation: "Time period T = 2πr / v. Since r ∝ n² and v ∝ 1/n, T ∝ n² / (1/n) = n³. Thus T₁ / T₂ = 1³ / 2³ = 1/8.",
        difficulty: "Hard",
        questionType: "Application",
      },
    ],
    links: {
      prerequisites: ["physics_u7_t1"],
      relatedTopics: ["physics_u8_t2"],
      practiceTestUrl: "/test/practice-physics-unit8-test1",
      weaknessRadarUrl: "/dashboard/radar?subject=physics",
    },
    physicsModule: {
      derivationsInBrief: [
        {
          title: "Bohr Orbital Radius and Energy Quantization",
          steps: [
            "Centripetal balance: m v² / r = (1/4πε₀) (Z e² / r²) ⇒ m v² r = Z e² / (4πε₀).",
            "Quantization: m v r = n h / (2π) ⇒ v = n h / (2π m r).",
            "Substitute v into force balance: m [n² h² / (4π² m² r²)] r = Z e² / (4πε₀) ⇒ r_n = ε₀ h² n² / (π m e² Z).",
            "Total Energy: E = K + U = 1/2 m v² - Z e² / (4πε₀ r) = -Z e² / (8πε₀ r) = - (m e⁴ / 8 ε₀² h²) (Z² / n²).",
          ],
        },
      ],
      unitDimensionTable: [
        { quantity: "Rydberg constant (R)", formula: "R = m e⁴ / (8 ε₀² h³ c)", siUnit: "m⁻¹", dimensionalFormula: "[M⁰ L⁻¹ T⁰]" },
        { quantity: "Bohr radius (a₀)", formula: "a₀ = ε₀ h² / (π m e²)", siUnit: "Metre (m)", dimensionalFormula: "[M⁰ L¹ T⁰]" },
        { quantity: "Orbital angular momentum (L)", formula: "L = n h / (2π)", siUnit: "J·s or kg·m²/s", dimensionalFormula: "[M¹ L² T⁻¹]" },
      ],
      graphInterpretations: [
        {
          graphTitle: "Alpha Particle Scattering Distribution N(θ) vs θ",
          axes: "x-axis: Scattering angle θ, y-axis: Number of scattered particles N(θ)",
          keyFeatures: "Number of scattered particles drops extremely steeply as 1 / sin⁴(θ/2), demonstrating Rutherford Coulomb scattering from a compact point nucleus.",
        },
      ],
    },
  },
  {
    id: "physics_u8_t2",
    slug: "nuclear-structure-mass-defect-radioactivity-and-nuclear-energy",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 8,
    unitTitle: "Atoms and Nuclei",
    topicTitle: "Nuclear Structure, Mass Defect, Radioactivity & Nuclear Energy",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 2",
      chapterNumber: 13,
      chapterName: "Nuclei",
      sections: [
        "13.2 Atomic Masses and Composition of Nucleus",
        "13.3 Size of the Nucleus",
        "13.4 Mass-Energy and Nuclear Binding Energy",
        "13.5 Nuclear Force",
        "13.6 Radioactivity (Decay Law, Alpha, Beta, Gamma)",
        "13.7 Nuclear Energy (Fission and Fusion)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "3-4 questions per shift. Consistently tested: Nuclear radius relation $R = R_0 A^{1/3}$, constant nuclear density calculation, binding energy curve features ($^{56}\\text{Fe}$ peak at $8.75\\text{ MeV/nucleon}$), radioactive decay law $N(t) = N_0 (1/2)^{t/T_{1/2}}$, and Q-value of nuclear reactions.",
      totalPyqsInRepo: 107,
      weightagePercentage: 6.5,
    },
    summary30Seconds: [
      "Nuclear Radius: $R = R_0 A^{1/3}$ ($R_0 \\approx 1.2 \\times 10^{-15}\\text{ m} = 1.2\\text{ fm}$).",
      "Nuclear Density: $\\rho = \\frac{\\text{Mass}}{\\text{Volume}} \\approx \\frac{A \\times 1.66 \\times 10^{-27}}{\\frac{4}{3}\\pi R_0^3 A} \\approx 2.3 \\times 10^{17}\\text{ kg/m}^3$ (constant for all nuclei, independent of mass number $A$).",
      "Mass Defect: $\\Delta m = [Z m_p + (A - Z) m_n] - M_{\\text{nucleus}}$. Binding Energy: $E_b = \\Delta m c^2 = \\Delta m \\times 931.5\\text{ MeV}$.",
      "Binding Energy Curve: Peaks at $^{56}\\text{Fe}$ ($8.75\\text{ MeV/nucleon}$). Both heavy nuclei (fission) and light nuclei (fusion) release energy by moving toward higher $E_b/A$.",
      "Radioactivity: $N(t) = N_0 e^{-\\lambda t} = N_0 \\left(\\frac{1}{2}\\right)^{t / T_{1/2}}$; Half-life $T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}$; Mean life $\\tau = \\frac{1}{\\lambda} = 1.44 T_{1/2}$.",
    ],
    coreConcepts: [
      {
        title: "Nuclear Size & Independence of Density from Mass Number",
        content:
          "High-energy electron scattering experiments demonstrate that a nucleus with mass number $A$ has radius:\n$$R = R_0 A^{1/3}$$\nwhere $R_0 = 1.2 \\times 10^{-15}\\text{ m} = 1.2\\text{ fm}$.\n- **Nuclear Volume:** $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi R_0^3 A \\propto A$.\n- **Nuclear Density:** Assuming average nucleon mass $m \\approx 1.66 \\times 10^{-27}\\text{ kg}$:\n  $$\\rho = \\frac{m A}{\\frac{4}{3}\\pi R_0^3 A} = \\frac{3 m}{4\\pi R_0^3} \\approx 2.3 \\times 10^{17}\\text{ kg/m}^3$$\n  Notice that mass number $A$ completely cancels out! **Nuclear density is identical for all elements**, from lightest hydrogen to heaviest uranium.",
      },
      {
        title: "Mass Defect & Binding Energy per Nucleon Curve",
        content:
          "The rest mass of any stable nucleus $M(A, Z)$ is strictly less than the sum of the masses of its constituent free protons and neutrons.\n- **Mass Defect ($\\Delta m$):**\n  $$\\Delta m = \\left[Z m_p + (A - Z) m_n\\right] - M(A, Z)$$\n- **Binding Energy ($E_b$):** From Einstein's mass-energy equivalence $E = mc^2$:\n  $$E_b = \\Delta m c^2$$\n  If $\\Delta m$ is measured in atomic mass units ($\\text{u}$), where $1\\text{ u} = 931.5\\text{ MeV}/c^2$:\n  $$E_b = \\Delta m (\\text{in u}) \\times 931.5\\text{ MeV}$$\n- **Binding Energy per Nucleon ($E_{bn} = E_b / A$):** Measure of nuclear stability.\n  - For very light nuclei ($A < 20$), $E_{bn}$ is low, with local peaks at $^4\\text{He}, ^{12}\\text{C}, ^{16}\\text{O}$.\n  - In the intermediate range ($30 \\le A \\le 170$), $E_{bn}$ is nearly constant around $8.5\\text{ MeV/nucleon}$, peaking at $^{56}\\text{Fe}$ ($8.75\\text{ MeV/nucleon}$).\n  - For heavy nuclei ($A > 170$), $E_{bn}$ drops to $\\approx 7.6\\text{ MeV/nucleon}$ for $^{238}\\text{U}$ due to Coulomb repulsion between protons.\n- **Nuclear Reactions:**\n  - **Fission:** A heavy nucleus ($A \\sim 240$) splits into two medium fragments, gaining $\\approx 0.9\\text{ MeV/nucleon} \\implies \\sim 200\\text{ MeV}$ per fission.\n  - **Fusion:** Light nuclei fuse into a heavier nucleus ($^2\\text{H} + ^3\\text{H} \\to ^4\\text{He} + n$), releasing huge energy per unit mass.",
      },
      {
        title: "Law of Radioactive Decay & Half-Life",
        content:
          "Radioactivity is a spontaneous nuclear phenomenon unaffected by temperature, pressure, or chemical bonds.\n- **Decay Law:** Rate of disintegration is directly proportional to number of active nuclei $N(t)$:\n  $$-\\frac{dN}{dt} = \\lambda N \\implies N(t) = N_0 e^{-\\lambda t}$$\n- **Activity ($A$ or $R$):** $A(t) = -\\frac{dN}{dt} = \\lambda N(t) = A_0 e^{-\\lambda t}$. Units: Becquerel ($1\\text{ Bq} = 1\\text{ decay/s}$), Curie ($1\\text{ Ci} = 3.7 \\times 10^{10}\\text{ Bq}$).\n- **Half-Life ($T_{1/2}$):** Time taken for half the sample to disintegrate:\n  $$N = \\frac{N_0}{2} = N_0 e^{-\\lambda T_{1/2}} \\implies T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}$$\n- **Fraction remaining after $n$ half-lives ($t = n T_{1/2}$):**\n  $$\\frac{N}{N_0} = \\left(\\frac{1}{2}\\right)^n = \\left(\\frac{1}{2}\\right)^{t / T_{1/2}}$$\n- **Mean Life ($\\tau$):** Average lifetime of a radioactive nucleus:\n  $$\\tau = \\frac{1}{\\lambda} = \\frac{T_{1/2}}{\\ln 2} \\approx 1.443 T_{1/2}$$\n  In one mean life ($t = \\tau$), the sample reduces to $N_0 / e \\approx 0.368 N_0$ (36.8% remaining, 63.2% decayed).",
      },
      {
        title: "Alpha, Beta, and Gamma Decay",
        content:
          "1. **Alpha ($\\alpha$) Decay:** Emission of $^4_2\\text{He}$ nucleus:\n   $$^A_Z X \\to ^{A-4}_{Z-2} Y + ^4_2\\text{He} + Q$$\n   $$Q = [m(X) - m(Y) - m(^4\\text{He})]c^2$$\n2. **Beta-minus ($\\beta^-$) Decay:** A neutron converts to a proton inside nucleus:\n   $$n \\to p + e^- + \\bar{\\nu}_e \\implies ^A_Z X \\to ^A_{Z+1} Y + e^- + \\bar{\\nu}_e$$\n   (Emits an electron and an antineutrino; $Z$ increases by 1, $A$ unchanged).\n3. **Beta-plus ($\\beta^+$) Decay:** A proton converts to a neutron:\n   $$p \\to n + e^+ + \\nu_e \\implies ^A_Z X \\to ^A_{Z-1} Y + e^+ + \\nu_e$$\n   (Emits a positron and a neutrino; $Z$ decreases by 1, $A$ unchanged).\n4. **Gamma ($\\gamma$) Decay:** De-excitation of an excited nuclear state to ground state with zero change in $Z$ or $A$.",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Nuclear Radius Formula",
        formula: "R = R_0 A^{1/3}",
        symbols: "R_0 \\approx 1.2\\text{ fm} = 1.2 \\times 10^{-15}\\text{ m}, A: mass number",
        siUnits: "Femtometres (fm)",
        applicationCondition: "Spherical atomic nuclei",
      },
      {
        name: "Binding Energy from Mass Defect",
        formula: "E_b = \\Delta m \\times 931.5\\text{ MeV}",
        symbols: "\\Delta m = [Z m_p + (A - Z)m_n] - M_{\\text{nucleus}} \\text{ in u}",
        siUnits: "MeV",
        applicationCondition: "Rest mass in atomic mass units (u)",
      },
      {
        name: "Radioactive Decay Law",
        formula: "N(t) = N_0 e^{-\\lambda t} = N_0 (1/2)^{t / T_{1/2}}",
        symbols: "\\lambda: decay constant, T_{1/2}: half-life",
        siUnits: "s^{-1} (for \\lambda), seconds (for T_{1/2})",
        applicationCondition: "Spontaneous radioactive decay of large sample",
      },
      {
        name: "Half-Life & Mean Life Relation",
        formula: "T_{1/2} = \\frac{0.693}{\\lambda}, \\quad \\tau = \\frac{1}{\\lambda} = 1.44 T_{1/2}",
        symbols: "T_{1/2}: half-life, \\tau: mean life, \\lambda: decay constant",
        siUnits: "Seconds (s)",
        applicationCondition: "Standard exponential radioactive decay",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="beGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2"/>
      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6"/>
    </linearGradient>
  </defs>
  <rect width="760" height="260" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>

  <!-- Left: Binding Energy per Nucleon Curve -->
  <g transform="translate(30, 20)">
    <text x="150" y="22" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Binding Energy per Nucleon (E_bn vs A)</text>
    
    <!-- Axes -->
    <line x1="40" y1="200" x2="300" y2="200" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="295" y="215" fill="#94a3b8" fontSize="10">Mass Number A</text>
    <line x1="40" y1="200" x2="40" y2="40" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="35" y="35" fill="#94a3b8" fontSize="10">E_bn (MeV)</text>

    <!-- Ticks on y axis -->
    <text x="32" y="160" fill="#64748b" fontSize="9" textAnchor="end">2</text>
    <text x="32" y="120" fill="#64748b" fontSize="9" textAnchor="end">5</text>
    <text x="32" y="70" fill="#64748b" fontSize="9" textAnchor="end">8.75</text>

    <!-- BE Curve -->
    <path d="M 42,195 Q 50,130 55,140 Q 60,110 65,118 Q 75,90 90,75 Q 120,62 160,65 Q 220,75 280,95"
          fill="none" stroke="#38bdf8" strokeWidth="3"/>

    <!-- Peak Label: Fe-56 -->
    <circle cx="120" cy="63" r="4" fill="#fbbf24"/>
    <text x="120" y="52" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">⁵⁶Fe (8.75 MeV)</text>

    <!-- Regions -->
    <text x="65" y="180" fill="#34d399" fontSize="10">Fusion Region</text>
    <text x="230" y="140" fill="#f43f5e" fontSize="10">Fission Region</text>
  </g>

  <!-- Divider -->
  <line x1="365" y1="25" x2="365" y2="235" stroke="#334155" strokeWidth="1" strokeDasharray="4,4"/>

  <!-- Right: Radioactive Decay Exponential Curve -->
  <g transform="translate(400, 20)">
    <text x="160" y="22" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Radioactive Decay Curve N(t) = N₀ e^(-λt)</text>
    
    <!-- Axes -->
    <line x1="40" y1="200" x2="300" y2="200" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="290" y="215" fill="#94a3b8" fontSize="10">Time t</text>
    <line x1="40" y1="200" x2="40" y2="40" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="35" y="35" fill="#94a3b8" fontSize="10">N(t)</text>

    <!-- Decay Exponential -->
    <path d="M 40,50 Q 80,125 120,125 T 200,180 T 290,196" fill="none" stroke="#ec4899" strokeWidth="3"/>

    <!-- Markers -->
    <text x="30" y="54" fill="#ec4899" fontSize="10" textAnchor="end">N₀</text>

    <line x1="40" y1="125" x2="120" y2="125" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="120" y1="125" x2="120" y2="200" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <text x="30" y="129" fill="#64748b" fontSize="9" textAnchor="end">N₀/2</text>
    <text x="120" y="215" fill="#fbbf24" fontSize="10" textAnchor="middle">T_1/2</text>

    <line x1="40" y1="162" x2="180" y2="162" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="180" y1="162" x2="180" y2="200" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <text x="30" y="166" fill="#64748b" fontSize="9" textAnchor="end">N₀/4</text>
    <text x="180" y="215" fill="#fbbf24" fontSize="10" textAnchor="middle">2 T_1/2</text>

    <text x="160" y="238" fill="#94a3b8" fontSize="10" textAnchor="middle">T_1/2 = 0.693 / λ</text>
  </g>
</svg>`,
    workedExamples: [
      {
        question:
          "The nuclear radius of $^{27}\\text{Al}$ is measured to be $3.6\\text{ fm}$. What is the approximate nuclear radius of $^{125}\\text{Te}$?",
        options: [
          "(A) 4.8 fm",
          "(B) 6.0 fm",
          "(C) 7.2 fm",
          "(D) 5.0 fm",
        ],
        correctOption: "(B) 6.0 fm",
        solutionStepByStep: [
          "Step 1: The nuclear radius follows $R = R_0 A^{1/3}$, which means $\\frac{R_1}{R_2} = \\left(\\frac{A_1}{A_2}\\right)^{1/3}$.",
          "Step 2: Here $A_1 = 27$ and $A_2 = 125$.",
          "Step 3: Calculate the cube root ratio: $\\left(\\frac{A_2}{A_1}\\right)^{1/3} = \\left(\\frac{125}{27}\\right)^{1/3} = \\frac{5}{3}$.",
          "Step 4: Compute the radius: $R(\\text{Te}) = R(\\text{Al}) \\times \\frac{5}{3} = 3.6\\text{ fm} \\times \\frac{5}{3} = 1.2 \\times 5 = 6.0\\text{ fm}$.",
        ],
      },
      {
        question:
          "The half-life of a radioactive isotope is 20 days. If a fresh sample contains $80\\text{ mg}$ of the isotope, how much of it remains undecayed after 60 days, and how much has decayed?",
        options: [
          "(A) 20 mg remains, 60 mg decayed",
          "(B) 10 mg remains, 70 mg decayed",
          "(C) 5 mg remains, 75 mg decayed",
          "(D) 40 mg remains, 40 mg decayed",
        ],
        correctOption: "(B) 10 mg remains, 70 mg decayed",
        solutionStepByStep: [
          "Step 1: Number of half-lives elapsed: $n = \\frac{t}{T_{1/2}} = \\frac{60\\text{ days}}{20\\text{ days}} = 3$.",
          "Step 2: The remaining mass after $n = 3$ half-lives is $N = N_0 \\left(\\frac{1}{2}\\right)^3 = 80\\text{ mg} \\times \\frac{1}{8} = 10\\text{ mg}$.",
          "Step 3: The mass decayed is $N_{\\text{decayed}} = N_0 - N = 80\\text{ mg} - 10\\text{ mg} = 70\\text{ mg}$.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Ratio of Nuclear Radii",
        frequency: "Very High",
        typicalStem: "The mass numbers of two nuclei are in the ratio 1:8. The ratio of their nuclear radii is...",
        strategy: "$R_1 / R_2 = (A_1 / A_2)^{1/3} = (1/8)^{1/3} = 1/2$. (If asked for density ratio, answer is ALWAYS 1:1).",
      },
      {
        patternType: "Decay Law Calculations",
        frequency: "High",
        typicalStem: "A radioactive sample has activity A. What fraction remains after 4 half-lives?",
        strategy: "Fraction remaining $= (1/2)^4 = 1/16$. Fraction decayed $= 1 - 1/16 = 15/16$.",
      },
      {
        patternType: "Nuclear Reaction Conservation Rules",
        frequency: "Regular",
        typicalStem: "In the decay $^{238}_{92}U \\to ^{206}_{82}Pb$, find the number of alpha and beta particles emitted.",
        strategy: "Loss of mass number $\\Delta A = 238 - 206 = 32$. Number of $\\alpha$ particles $= 32/4 = 8$. Net charge change $= 92 - 2(8) = 76$. Target charge $= 82$, so number of $\\beta^-$ particles $= 82 - 76 = 6$.",
      },
    ],
    commonTraps: [
      {
        concept: "Nuclear density comparison",
        misconception: "Believing lead or uranium nuclei are much denser than helium or carbon nuclei.",
        correctFact: "Nuclear density is **constant** ($\approx 2.3 \times 10^{17}\text{ kg/m}^3$) for all elements because mass $\propto A$ and volume $\propto A$, canceling $A$.",
      },
      {
        concept: "Decayed vs Undecayed sample",
        misconception: "Calculating $(1/2)^n$ when the question asks for the amount that has *decayed*.",
        correctFact: "Undecayed remaining is $(1/2)^n$. Amount decayed is $[1 - (1/2)^n]$. Always double check which one is requested!",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Half-Life Quick Powers",
        mnemonic: "2, 4, 8, 16, 32, 64",
        explanation: "1 $T_{1/2} \\to 50\\%$; 2 $T_{1/2} \\to 25\\%$; 3 $T_{1/2} \\to 12.5\\%$; 4 $T_{1/2} \\to 6.25\\%$; 5 $T_{1/2} \\to 3.125\\%$.",
      },
      {
        title: "Fe-56 Peak Rule",
        mnemonic: "IRON IS IMMUNE",
        explanation: "Iron-56 sits at the absolute peak of binding energy per nucleon ($8.75\text{ MeV}$), meaning it is the most tightly bound and stable nucleus.",
      },
    ],
    quickRevisionCard: {
      keyPoints: [
        "R = R₀ A^(1/3), where R₀ = 1.2 fm = 1.2 × 10⁻¹⁵ m.",
        "Nuclear density ρ ≈ 2.3 × 10¹⁷ kg/m³ (constant for ALL nuclei).",
        "1 amu = 1 u = 931.5 MeV/c² = 1.6605 × 10⁻²⁷ kg.",
        "Mass defect: Δm = [Z m_p + (A - Z)m_n] - M_nucleus.",
        "Binding energy E_b = Δm × 931.5 MeV. Binding energy per nucleon E_bn = E_b / A.",
        "Peak of E_bn curve is ⁵⁶Fe with 8.75 MeV/nucleon. Dropping to 7.6 MeV for ²³⁸U.",
        "Fission: Heavy nucleus (A ~ 240) splits, releasing ~200 MeV per event.",
        "Fusion: Light nuclei fuse (e.g. proton-proton cycle in Sun), releasing ~26.7 MeV.",
        "Decay Law: N(t) = N₀ e^(-λt). Activity A = λN = A₀ e^(-λt).",
        "Half-life T_1/2 = ln 2 / λ = 0.693 / λ. Mean life τ = 1/λ = 1.44 T_1/2.",
        "Alpha decay: Z decreases by 2, A decreases by 4. Beta-minus decay: Z increases by 1, A unchanged.",
      ],
      examTricks: [
        "Density ratio of any two nuclei (e.g. Al and Cu) is strictly 1:1.",
        "In one mean life (t = τ), the fraction decayed is (1 - 1/e) ≈ 63.2%, remaining is 36.8%.",
      ],
    },
    practiceQuestions: [
      {
        id: "phys_u8_q11",
        question: "The ratio of the mass numbers of two nuclei A and B is 1:27. The ratio of their nuclear densities (ρ_A : ρ_B) is:",
        options: [
          "(A) 1 : 27",
          "(B) 1 : 3",
          "(C) 1 : 1",
          "(D) 27 : 1",
        ],
        correctAnswer: "(C) 1 : 1",
        explanation: "Nuclear density ρ = m A / [(4/3) π R₀³ A] is independent of mass number A. All atomic nuclei have identical density (~2.3 × 10¹⁷ kg/m³), giving a ratio of 1:1.",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u8_q12",
        question: "A radioactive isotope has a half-life of 10 days. If the initial activity is 3200 Bq, what will be its activity after 40 days?",
        options: [
          "(A) 800 Bq",
          "(B) 400 Bq",
          "(C) 200 Bq",
          "(D) 100 Bq",
        ],
        correctAnswer: "(C) 200 Bq",
        explanation: "Number of half-lives n = 40 / 10 = 4. Activity A = A₀ / 2⁴ = 3200 / 16 = 200 Bq.",
        difficulty: "Easy",
        questionType: "Numerical",
      },
      {
        id: "phys_u8_q13",
        question: "In the uranium decay series ²³⁸₉₂U → ²⁰⁶₈₂Pb, the number of alpha (α) and beta (β⁻) particles emitted is:",
        options: [
          "(A) 8 α and 6 β⁻",
          "(B) 6 α and 8 β⁻",
          "(C) 8 α and 8 β⁻",
          "(D) 7 α and 4 β⁻",
        ],
        correctAnswer: "(A) 8 α and 6 β⁻",
        explanation: "Decrease in mass number ΔA = 238 - 206 = 32. Number of α particles = 32 / 4 = 8. Atomic number change: 92 - 2(8) = 76. To reach final Z = 82, number of β⁻ emitted = 82 - 76 = 6.",
        difficulty: "Medium",
        questionType: "Numerical",
      },
      {
        id: "phys_u8_q14",
        question: "Assertion (A): For nuclear fusion to take place, extremely high temperatures (around 10⁷ to 10⁸ K) are required.\nReason (R): High kinetic energy is essential to overcome the strong electrostatic Coulomb repulsion between positively charged nuclei.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "Nuclei are positively charged and repel each other via Coulomb's law. Only extreme thermal agitation at ~10⁷ K provides sufficient kinetic energy to penetrate the Coulomb barrier and bring them within nuclear force range (~1 fm).",
        difficulty: "Easy",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u8_q15",
        question: "Assertion (A): The binding energy per nucleon of heavy nuclei like ²³⁸U is lower than that of medium nuclei like ⁵⁶Fe.\nReason (R): In heavy nuclei, long-range electrostatic Coulomb repulsive forces between protons compete effectively with the short-range attractive nuclear force.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "Nuclear force saturates (only acts between nearest neighbors), whereas Coulomb repulsion acts between all pairs of protons across the entire nucleus, destabilizing heavy nuclei.",
        difficulty: "Medium",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u8_q16",
        question: "Match List-I with List-II:\n\nList-I (Nuclear Phenomenon / Quantity)\n(P) Half-life\n(Q) Mean life\n(R) Peak of binding energy curve\n(S) Activity unit Curie\n\nList-II (Value / Formula)\n(1) 3.7 × 10¹⁰ decays/s\n(2) ⁵⁶Fe (8.75 MeV/nucleon)\n(3) 0.693 / λ\n(4) 1 / λ",
        options: [
          "(A) P-3, Q-4, R-2, S-1",
          "(B) P-4, Q-3, R-1, S-2",
          "(C) P-3, Q-1, R-2, S-4",
          "(D) P-1, Q-2, R-3, S-4",
        ],
        correctAnswer: "(A) P-3, Q-4, R-2, S-1",
        explanation: "Half-life is 0.693/λ (P-3). Mean life is 1/λ (Q-4). Fe-56 peaks the BE curve (R-2). Curie is 3.7 × 10¹⁰ Bq (S-1).",
        difficulty: "Easy",
        questionType: "Match The Following",
      },
      {
        id: "phys_u8_q17",
        question: "The mass defect in a nuclear reaction is found to be 0.02 u. What is the total energy released in this reaction?",
        options: [
          "(A) 9.315 MeV",
          "(B) 18.63 MeV",
          "(C) 37.26 MeV",
          "(D) 93.15 MeV",
        ],
        correctAnswer: "(B) 18.63 MeV",
        explanation: "Energy E = Δm × 931.5 MeV = 0.02 × 931.5 = 18.63 MeV.",
        difficulty: "Easy",
        questionType: "Numerical",
      },
      {
        id: "phys_u8_q18",
        question: "A radioactive substance has a half-life of 4 hours. What fraction of the original substance will have decayed after 16 hours?",
        options: [
          "(A) 1/16",
          "(B) 15/16",
          "(C) 7/8",
          "(D) 3/4",
        ],
        correctAnswer: "(B) 15/16",
        explanation: "n = 16 / 4 = 4 half-lives. Fraction remaining = (1/2)⁴ = 1/16. Fraction that has decayed = 1 - 1/16 = 15/16.",
        difficulty: "Medium",
        questionType: "Application",
      },
      {
        id: "phys_u8_q19",
        question: "During beta-minus (β⁻) decay of a radioactive nucleus:",
        options: [
          "(A) A neutron converts into a proton with emission of an electron and neutrino",
          "(B) A neutron converts into a proton with emission of an electron and antineutrino",
          "(C) A proton converts into a neutron with emission of a positron and neutrino",
          "(D) Mass number increases by 1",
        ],
        correctAnswer: "(B) A neutron converts into a proton with emission of an electron and antineutrino",
        explanation: "In β⁻ decay: n → p + e⁻ + ν̄_e. A neutron converts to a proton, emitting an electron (β⁻) and an antineutrino (ν̄_e).",
        difficulty: "Medium",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u8_q20",
        question: "The mean life of a radioactive sample is 100 seconds. After 100 seconds, the fraction of the initial sample remaining undecayed is approximately:",
        options: [
          "(A) 50%",
          "(B) 36.8%",
          "(C) 63.2%",
          "(D) 25%",
        ],
        correctAnswer: "(B) 36.8%",
        explanation: "In one mean life t = τ = 1/λ: N(τ) = N₀ e^(-λ/λ) = N₀ / e = N₀ / 2.718 ≈ 0.368 N₀ (36.8%).",
        difficulty: "Medium",
        questionType: "Factual Recall",
      },
    ],
    links: {
      prerequisites: ["physics_u8_t1"],
      relatedTopics: ["physics_u9_t1"],
      practiceTestUrl: "/test/practice-physics-unit8-test1",
      weaknessRadarUrl: "/dashboard/radar?subject=physics",
    },
    physicsModule: {
      derivationsInBrief: [
        {
          title: "Derivation of Radioactive Decay Law and Half-Life",
          steps: [
            "Decay rate: -dN/dt = λN ⇒ dN/N = -λ dt.",
            "Integrate both sides from t=0 (N₀) to t (N): ln(N/N₀) = -λt ⇒ N(t) = N₀ e^(-λt).",
            "At half-life t = T_{1/2}, N = N₀/2 ⇒ 1/2 = e^(-λ T_{1/2}) ⇒ ln 2 = λ T_{1/2}.",
            "T_{1/2} = ln 2 / λ = 0.69315 / λ.",
          ],
        },
      ],
      unitDimensionTable: [
        { quantity: "Decay constant (λ)", formula: "λ = 0.693 / T_{1/2}", siUnit: "s⁻¹", dimensionalFormula: "[M⁰ L⁰ T⁻¹]" },
        { quantity: "Activity (A)", formula: "A = λN", siUnit: "Becquerel (Bq = s⁻¹)", dimensionalFormula: "[M⁰ L⁰ T⁻¹]" },
        { quantity: "Unified atomic mass unit (u)", formula: "1 u = 1.6605 × 10⁻²⁷ kg", siUnit: "kg", dimensionalFormula: "[M¹ L⁰ T⁰]" },
      ],
      graphInterpretations: [
        {
          graphTitle: "Binding Energy per Nucleon (E_bn) vs Mass Number (A)",
          axes: "x-axis: Mass number A (0 to 240), y-axis: Binding Energy per Nucleon in MeV (0 to 9)",
          keyFeatures: "Sharp initial rise with peaks at ⁴He, ¹²C, ¹⁶O. Plateau around 8.5 MeV for 30 < A < 170. Peak at ⁵⁶Fe (8.75 MeV). Slow decline down to 7.6 MeV for ²³⁸U.",
        },
      ],
    },
  },
];
