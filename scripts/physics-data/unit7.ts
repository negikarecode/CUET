import { NoteDocument } from "@/types/notes";

export const unit7Topics: NoteDocument[] = [
  {
    id: "physics_u7_t1",
    slug: "photoelectric-effect-einstein-s-equation-de-broglie-wavelength",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 7,
    unitTitle: "Dual Nature of Matter and Radiation",
    topicTitle: "Photoelectric Effect, Einstein's Equation, de-Broglie Wavelength",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 2",
      chapterNumber: 11,
      chapterName: "Dual Nature of Radiation and Matter",
      sections: [
        "11.2 Electron Emission",
        "11.3 Photoelectric Effect (Hertz, Hallwachs, Lenard)",
        "11.4 Experimental Study of Photoelectric Effect",
        "11.5 Einstein's Photoelectric Equation: Energy Quantum of Radiation",
        "11.6 Particle Nature of Light: The Photon",
        "11.7 Wave Nature of Matter (de-Broglie Relation)",
        "11.8 Davisson and Germer Experiment",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "2-3 questions per shift. Key focus areas: Einstein's equation $K_{\\max} = h\\nu - \\Phi_0$, stopping potential vs frequency graphs (slope $= h/e$, intercept $= -\\Phi_0/e$), de-Broglie wavelength of electron $\\lambda = \\frac{1.227}{\\sqrt{V}}\\text{ nm}$, and photon momentum $p = h/\\lambda$.",
      totalPyqsInRepo: 64,
      weightagePercentage: 6.0,
    },
    summary30Seconds: [
      "Photoelectric emission is instantaneous ($< 10^{-9}\\text{ s}$) and occurs only if incident light frequency $\\nu \\ge \\nu_0$ (threshold frequency).",
      "Einstein's Equation: $K_{\\max} = e V_0 = h\\nu - \\Phi_0 = h(\\nu - \\nu_0) = hc\\left(\\frac{1}{\\lambda} - \\frac{1}{\\lambda_0}\\right)$.",
      "Stopping potential $V_0$ depends strictly on light frequency and cathode metal work function; it is completely independent of light intensity.",
      "Photoelectric saturation current is strictly proportional to incident light intensity.",
      "Wave Nature of Matter (de Broglie): $\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mE_k}}$. For an electron accelerated through potential $V$: $\\lambda_e = \\frac{1.227}{\\sqrt{V}}\\text{ nm} = \\frac{12.27}{\\sqrt{V}}\\text{ \\AA}$.",
    ],
    coreConcepts: [
      {
        title: "Photoelectric Effect & Lenard's Observations",
        content:
          "When light of sufficiently high frequency falls on a clean metal surface, electrons are ejected instantaneously.\n- **Effect of Intensity:** At constant frequency ($\\\\nu > \\\\nu_0$), saturation current $I_{\\text{sat}}$ is directly proportional to intensity of incident radiation. Stopping potential $V_0$ remains strictly unchanged.\n- **Effect of Frequency:** Increasing frequency increases the maximum kinetic energy of photoelectrons and increases stopping potential $V_0$. Saturation current remains unchanged (for fixed incident photon flux).\n- **Threshold Frequency ($\\nu_0$):** Below $\\nu_0$, no electron emission occurs, regardless of how intense the light beam is.\n- **Time Lag:** Emission occurs with zero measurable delay ($< 10^{-9}\\text{ s}$), directly contradicting wave theory (which predicts light energy takes minutes or hours to accumulate in a localized electron).",
      },
      {
        title: "Einstein's Photoelectric Equation & The Photon",
        content:
          "Einstein postulated that light energy is quantized into discrete packets called **photons**, each with energy $E = h\\nu$ and momentum $p = \\frac{h\\nu}{c} = \\frac{h}{\\lambda}$.\n- When a photon collides with an electron in metal, its entire energy $h\\nu$ is transferred to a single electron in a 1-to-1 process.\n- Part of the energy is used to overcome the metal's binding energy (the **Work Function** $\\Phi_0$), and the remainder appears as the maximum kinetic energy $K_{\\max}$:\n  $$K_{\\max} = h\\nu - \\Phi_0$$\n- In terms of stopping potential $V_0$ ($K_{\\max} = e V_0$):\n  $$e V_0 = h\\nu - \\Phi_0 \\implies V_0 = \\left(\\frac{h}{e}\\right)\\nu - \\frac{\\Phi_0}{e}$$\n- **Graph of $V_0$ vs $\\nu$:**\n  - A straight line with slope $= \\frac{h}{e}$ (a universal constant, identical for all metals).\n  - Threshold frequency $\\nu_0$ is the intercept on the frequency axis ($V_0 = 0$).\n  - The negative intercept on the $V_0$ axis is $-\\frac{\\Phi_0}{e}$.",
      },
      {
        title: "de-Broglie Wavelength of Matter Waves",
        content:
          "Louis de Broglie proposed that nature loves symmetry: if radiation exhibits dual wave-particle properties, material particles in motion must also possess wave properties.\n- **de-Broglie Relation:**\n  $$\\lambda = \\frac{h}{p} = \\frac{h}{m v}$$\n- **In terms of Kinetic Energy $K$:**\n  $$p = \\sqrt{2m K} \\implies \\lambda = \\frac{h}{\\sqrt{2m K}}$$\n- **For a charged particle ($q$) accelerated through potential difference $V$:**\n  $$K = qV \\implies \\lambda = \\frac{h}{\\sqrt{2m q V}}$$\n- **Specific Particles:**\n  1. **Electron ($m_e, e$):**\n     $$\\lambda_e = \\frac{1.227}{\\sqrt{V}}\\text{ nm} = \\frac{12.27}{\\sqrt{V}}\\text{ \\AA}$$\n  2. **Proton ($m_p, e$):**\n     $$\\lambda_p = \\frac{0.286}{\\sqrt{V}}\\text{ \\AA}$$\n  3. **Alpha particle ($4m_p, 2e$):**\n     $$\\lambda_\\alpha = \\frac{0.101}{\\sqrt{V}}\\text{ \\AA}$$\n  4. **Thermal Neutron at temperature $T$:**\n     $$K = \\frac{3}{2} k_B T \\implies \\lambda_n = \\frac{h}{\\sqrt{3m k_B T}}$$",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Einstein's Photoelectric Equation",
        formula: "K_{\\max} = e V_0 = h\\nu - \\Phi_0 = h(\\nu - \\nu_0)",
        symbols: "K_{\\max}: max kinetic energy, V_0: stopping potential, \\Phi_0: work function",
        siUnits: "Joule (J) or electron-Volt (eV)",
        applicationCondition: "Photoelectric emission with monochromatic light \\nu \\ge \\nu_0",
      },
      {
        name: "Slope of Stopping Potential vs Frequency Graph",
        formula: "\\text{Slope} = \\frac{h}{e} \\approx 4.14 \\times 10^{-15}\\text{ V}\\cdot\\text{s}",
        symbols: "h: Planck's constant (6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}), e: elementary charge",
        siUnits: "Volt·second (V·s)",
        applicationCondition: "Universal slope for ALL metals",
      },
      {
        name: "de-Broglie Wavelength of Electron",
        formula: "\\lambda_e = \\frac{1.227}{\\sqrt{V}}\\text{ nm} = \\frac{12.27}{\\sqrt{V}}\\text{ \\AA}",
        symbols: "V: accelerating potential difference in Volts",
        siUnits: "Nanometres (nm) or Angstroms (\\AA)",
        applicationCondition: "Non-relativistic electron accelerated from rest",
      },
      {
        name: "Thermal Neutron Wavelength",
        formula: "\\lambda = \\frac{h}{\\sqrt{3 m k_B T}}",
        symbols: "k_B: Boltzmann constant, T: absolute temperature in Kelvin",
        siUnits: "Metres (m)",
        applicationCondition: "Neutrons in thermal equilibrium at temperature T",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <marker id="arrowCyan" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8"/>
    </marker>
  </defs>
  <rect width="760" height="260" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>

  <!-- Left: Stopping Potential vs Frequency Graph -->
  <g transform="translate(30, 20)">
    <text x="150" y="22" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Stopping Potential (V₀) vs Frequency (ν)</text>
    
    <!-- Axes -->
    <line x1="40" y1="180" x2="280" y2="180" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowCyan)"/>
    <text x="275" y="196" fill="#94a3b8" fontSize="10">ν (Hz)</text>
    <line x1="60" y1="210" x2="60" y2="40" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowCyan)"/>
    <text x="35" y="48" fill="#94a3b8" fontSize="10">V₀ (V)</text>

    <!-- Metal A Line -->
    <line x1="120" y1="180" x2="240" y2="60" stroke="#38bdf8" strokeWidth="2.5"/>
    <line x1="60" y1="240" x2="120" y2="180" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3"/>
    <circle cx="120" cy="180" r="3" fill="#fbbf24"/>
    <text x="120" y="196" fill="#fbbf24" fontSize="10" textAnchor="middle">ν₀ (Metal A)</text>

    <!-- Metal B Line (Parallel) -->
    <line x1="170" y1="180" x2="270" y2="80" stroke="#ec4899" strokeWidth="2.5"/>
    <line x1="60" y1="290" x2="170" y2="180" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3,3"/>
    <circle cx="170" cy="180" r="3" fill="#ec4899"/>
    <text x="180" y="196" fill="#ec4899" fontSize="10" textAnchor="middle">ν₀ (Metal B)</text>

    <!-- Annotations -->
    <text x="150" y="105" fill="#38bdf8" fontSize="10">Slope = h/e (constant)</text>
    <text x="30" y="240" fill="#fbbf24" fontSize="9">-Φ₀/e</text>
  </g>

  <!-- Divider -->
  <line x1="365" y1="25" x2="365" y2="235" stroke="#334155" strokeWidth="1" strokeDasharray="4,4"/>

  <!-- Right: Photocurrent vs Collector Potential -->
  <g transform="translate(400, 20)">
    <text x="160" y="22" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Photocurrent vs Collector Potential</text>
    
    <!-- Axes -->
    <line x1="30" y1="140" x2="310" y2="140" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowCyan)"/>
    <text x="290" y="156" fill="#94a3b8" fontSize="10">+V (Anode)</text>
    <line x1="160" y1="210" x2="160" y2="40" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowCyan)"/>
    <text x="165" y="48" fill="#94a3b8" fontSize="10">Current (I)</text>

    <!-- Curve for Intensity I₂ (Higher) -->
    <path d="M 80,140 C 110,135 140,90 200,80 L 300,80" fill="none" stroke="#fbbf24" strokeWidth="2.5"/>
    <text x="305" y="84" fill="#fbbf24" fontSize="10">Intensity 2I</text>

    <!-- Curve for Intensity I₁ (Lower) -->
    <path d="M 80,140 C 110,138 140,115 200,110 L 300,110" fill="none" stroke="#38bdf8" strokeWidth="2.5"/>
    <text x="305" y="114" fill="#38bdf8" fontSize="10">Intensity I</text>

    <!-- Stopping Potential V₀ marker -->
    <circle cx="80" cy="140" r="3" fill="#f43f5e"/>
    <text x="75" y="160" fill="#f43f5e" fontSize="10" textAnchor="middle">-V₀ (Same)</text>

    <text x="160" y="235" fill="#94a3b8" fontSize="10" textAnchor="middle">Same frequency ν ⇒ Same Stopping Potential -V₀</text>
  </g>
</svg>`,
    workedExamples: [
      {
        question:
          "Monochromatic light of wavelength $300\\text{ nm}$ is incident on a surface whose work function is $2.14\\text{ eV}$. What is the maximum kinetic energy of the emitted photoelectrons and the stopping potential? (Take $hc = 1240\\text{ eV}\\cdot\\text{nm}$)",
        options: [
          "(A) K_max = 2.00 eV, V₀ = 2.00 V",
          "(B) K_max = 1.99 eV, V₀ = 1.99 V",
          "(C) K_max = 4.14 eV, V₀ = 4.14 V",
          "(D) K_max = 1.00 eV, V₀ = 1.00 V",
        ],
        correctOption: "(B) K_max = 1.99 eV, V₀ = 1.99 V",
        solutionStepByStep: [
          "Step 1: Calculate energy of incident photon $E = \\frac{hc}{\\lambda} = \\frac{1240\\text{ eV}\\cdot\\text{nm}}{300\\text{ nm}} \\approx 4.133\\text{ eV}$.",
          "Step 2: Use Einstein's equation: $K_{\\max} = E - \\Phi_0 = 4.133\\text{ eV} - 2.14\\text{ eV} = 1.993\\text{ eV} \\approx 1.99\\text{ eV}$.",
          "Step 3: Stopping potential $V_0 = \\frac{K_{\\max}}{e} = \\frac{1.99\\text{ eV}}{e} = 1.99\\text{ V}$.",
        ],
      },
      {
        question:
          "An electron and an alpha particle are accelerated from rest through the same potential difference $V$. What is the ratio of the de-Broglie wavelength of the electron to that of the alpha particle? ($m_\\alpha \\approx 4 \\times 1840 m_e$, $q_\\alpha = 2e$)",
        options: [
          "(A) \\sqrt{3680}",
          "(B) \\sqrt{7360}",
          "(C) \\sqrt{14720}",
          "(D) 2",
        ],
        correctOption: "(C) \\sqrt{14720}",
        solutionStepByStep: [
          "Step 1: The de-Broglie wavelength of a particle accelerated through potential $V$ is $\\lambda = \\frac{h}{\\sqrt{2mqV}}$.",
          "Step 2: Form the ratio: $\\frac{\\lambda_e}{\\lambda_\\alpha} = \\sqrt{\\frac{m_\\alpha q_\\alpha}{m_e q_e}}$.",
          "Step 3: Substitute $q_\\alpha = 2e$, $q_e = e$, and $m_\\alpha = 4 \\times 1840 m_e = 7360 m_e$:\n$$\\frac{\\lambda_e}{\\lambda_\\alpha} = \\sqrt{\\frac{7360 m_e \\times 2e}{m_e \\times e}} = \\sqrt{7360 \\times 2} = \\sqrt{14720} \\approx 121.3$$.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Stopping Potential Slope & Intercept",
        frequency: "Very High",
        typicalStem: "In a plot of stopping potential V₀ against frequency ν of incident radiation, the slope of the curve represents...",
        strategy: "Slope is always $h/e$, which is constant and identical for all metals. Intercept on frequency axis gives threshold frequency $\\nu_0$.",
      },
      {
        patternType: "Ratio of de-Broglie Wavelengths",
        frequency: "High",
        typicalStem: "A proton, a deuteron, and an alpha particle are accelerated through the same potential difference...",
        strategy: "$\\lambda \\propto \\frac{1}{\\sqrt{m q}}$. Proton: $m=1, q=1 \\to 1$. Deuteron: $m=2, q=1 \\to 1/\\sqrt{2}$. Alpha: $m=4, q=2 \\to 1/\\sqrt{8}$.",
      },
      {
        patternType: "Assertion-Reason on Wave Theory Failure",
        frequency: "Frequent",
        typicalStem: "Assertion: Wave theory of light failed to explain the existence of threshold frequency in photoelectric effect.",
        strategy: "True! Classical wave theory suggests that any frequency, if given sufficient intensity/time, could eject electrons.",
      },
    ],
    commonTraps: [
      {
        concept: "Stopping Potential vs Intensity",
        misconception: "Students mistakenly believe doubling light intensity doubles the kinetic energy and stopping potential.",
        correctFact: "Doubling intensity doubles the number of photons per second, doubling the saturation current. The kinetic energy of individual electrons and the stopping potential remain strictly unchanged.",
      },
      {
        concept: "Photon Rest Mass",
        misconception: "Using $m = h/c\\lambda$ as the rest mass of a photon.",
        correctFact: "The **rest mass** of a photon is strictly **ZERO**. Its dynamic mass / equivalent inertial mass is $m = h\\nu/c^2 = h/(c\\lambda)$.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "de-Broglie Electron Formula",
        mnemonic: "12-POINT-27 over root V",
        explanation: "$\\lambda = \\frac{12.27}{\\sqrt{V}}\\text{ \\AA} = \\frac{1.227}{\\sqrt{V}}\\text{ nm}$. For $V = 100\\text{ V}$, $\\lambda = 12.27 / 10 = 1.227\\text{ \\AA}$.",
      },
      {
        title: "Photoelectric Slope Rule",
        mnemonic: "SHOE = Slope is 'h Over E'",
        explanation: "Slope of $V_0$ vs $\\nu$ graph is always $h/e$.",
      },
    ],
    quickRevisionCard: {
      keyPoints: [
        "Work Function Φ₀ = h ν₀ = hc / λ₀. Minimum energy needed to eject an electron from metal surface.",
        "Einstein: K_max = e V₀ = hν - Φ₀ = h(ν - ν₀).",
        "V₀ vs ν graph: Slope = h/e (universal), x-intercept = ν₀, y-intercept = -Φ₀/e.",
        "Saturation current ∝ Intensity; Stopping potential V₀ depends ONLY on frequency ν and work function Φ₀.",
        "Emission is instantaneous (< 10⁻⁹ s); classical wave theory fails to explain threshold frequency and zero time lag.",
        "Photon: Rest mass = 0, speed = c in vacuum, Energy E = hν, Momentum p = h/λ = E/c.",
        "de-Broglie: λ = h/p = h/mv = h/√(2mE_k).",
        "Accelerated charge in potential V: λ = h/√(2mqV). For electron: λ_e = 1.227/√V nm = 12.27/√V Å.",
        "Thermal neutron at T: λ = h/√(3m k_B T).",
      ],
      examTricks: [
        "If frequency ν is doubled: New K_max' = h(2ν) - Φ₀ = 2(hν - Φ₀) + Φ₀ = 2 K_max + Φ₀ > 2 K_max. Kinetic energy becomes MORE than double!",
        "Davisson-Germer experiment proved the wave nature of electrons using nickel crystal diffraction at 54 V and 50° angle.",
      ],
    },
    practiceQuestions: [
      {
        id: "phys_u7_q1",
        question: "When the frequency of incident radiation on a photocell is doubled, the maximum kinetic energy of the emitted photoelectrons:",
        options: [
          "(A) Doubles",
          "(B) Halves",
          "(C) Remains the same",
          "(D) More than doubles",
        ],
        correctAnswer: "(D) More than doubles",
        explanation: "K₁ = hν - Φ₀. When frequency is doubled, K₂ = 2hν - Φ₀ = 2(hν - Φ₀) + Φ₀ = 2K₁ + Φ₀. Since Φ₀ > 0, K₂ > 2K₁ (more than doubles).",
        difficulty: "Medium",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u7_q2",
        question: "An electron is accelerated through a potential difference of 100 V. Its de-Broglie wavelength is:",
        options: [
          "(A) 1.227 Å",
          "(B) 12.27 Å",
          "(C) 0.1227 Å",
          "(D) 122.7 Å",
        ],
        correctAnswer: "(A) 1.227 Å",
        explanation: "λ = 12.27 / √V Å = 12.27 / √100 = 12.27 / 10 = 1.227 Å (or 0.1227 nm).",
        difficulty: "Easy",
        questionType: "Numerical",
      },
      {
        id: "phys_u7_q3",
        question: "The slope of the graph between stopping potential (V₀) and frequency (ν) of incident radiation is given by:",
        options: [
          "(A) h",
          "(B) h/e",
          "(C) e/h",
          "(D) Φ₀/e",
        ],
        correctAnswer: "(B) h/e",
        explanation: "e V₀ = hν - Φ₀ ⇒ V₀ = (h/e)ν - (Φ₀/e). Comparing with y = mx + c gives slope m = h/e.",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u7_q4",
        question: "Assertion (A): The de-Broglie wavelength of a molecule in a gas increases when the gas is heated.\nReason (R): de-Broglie wavelength is given by λ = h / √(3mk_BT), which is inversely proportional to the square root of absolute temperature.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(D) A is false but R is true",
        explanation: "Since λ ∝ 1/√T, increasing temperature increases kinetic energy and speed, which DECREASES the de-Broglie wavelength. Thus Assertion is false and Reason is true.",
        difficulty: "Medium",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u7_q5",
        question: "Assertion (A): Photoelectric effect demonstrates the particle nature of electromagnetic radiation.\nReason (R): The emission of photoelectrons takes place instantaneously upon illumination without any measurable time lag.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "A single localized photon collides with a single electron and transfers its complete quantum of energy instantaneously (< 10⁻⁹ s), proving radiation behaves as corpuscular packets (photons).",
        difficulty: "Easy",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u7_q6",
        question: "Match List-I with List-II:\n\nList-I (Particle accelerated through potential V)\n(P) Electron\n(Q) Proton\n(R) Alpha particle\n(S) Neutron of kinetic energy E\n\nList-II (de-Broglie Wavelength Formula / Value)\n(1) 0.286 / √V Å\n(2) 1.227 / √V nm\n(3) h / √(2mE)\n(4) 0.101 / √V Å",
        options: [
          "(A) P-2, Q-1, R-4, S-3",
          "(B) P-1, Q-2, R-3, S-4",
          "(C) P-2, Q-4, R-1, S-3",
          "(D) P-4, Q-1, R-2, S-3",
        ],
        correctAnswer: "(A) P-2, Q-1, R-4, S-3",
        explanation: "Electron is 1.227/√V nm (P-2). Proton is 0.286/√V Å (Q-1). Alpha particle is 0.101/√V Å (R-4). Uncharged neutron is h/√(2mE) (S-3).",
        difficulty: "Medium",
        questionType: "Match The Following",
      },
      {
        id: "phys_u7_q7",
        question: "Light of frequency 1.5 times the threshold frequency is incident on a photosensitive material. If the frequency is halved and intensity is doubled, the photoelectric current becomes:",
        options: [
          "(A) Doubled",
          "(B) Halved",
          "(C) Zero",
          "(D) Quadrupled",
        ],
        correctAnswer: "(C) Zero",
        explanation: "Initial frequency is 1.5 ν₀. When halved, the new frequency becomes 0.75 ν₀, which is below the threshold frequency ν₀. Since ν < ν₀, no photoelectric emission occurs regardless of intensity, so current = 0.",
        difficulty: "Medium",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u7_q8",
        question: "The work functions for metals A, B, and C are 1.92 eV, 2.0 eV, and 5.0 eV respectively. Light of wavelength 410 nm falls on all three metals. Photoelectric emission will occur from: (Take hc = 1240 eV·nm)",
        options: [
          "(A) Only A",
          "(B) Both A and B",
          "(C) All three metals",
          "(D) None of the metals",
        ],
        correctAnswer: "(B) Both A and B",
        explanation: "Energy of incident photon E = 1240 / 410 ≈ 3.02 eV. Emission occurs if E > Φ₀. Here 3.02 eV > 1.92 eV (A) and 3.02 eV > 2.0 eV (B), but 3.02 eV < 5.0 eV (C). Hence emission occurs from metals A and B.",
        difficulty: "Medium",
        questionType: "Application",
      },
      {
        id: "phys_u7_q9",
        question: "A proton and an alpha particle have the same kinetic energy. The ratio of their de-Broglie wavelengths (λ_p / λ_α) is:",
        options: [
          "(A) 1:1",
          "(B) 2:1",
          "(C) 1:2",
          "(D) 4:1",
        ],
        correctAnswer: "(B) 2:1",
        explanation: "λ = h/√(2mK). For equal kinetic energy K, λ ∝ 1/√m. Thus λ_p / λ_α = √(m_α / m_p) = √(4m_p / m_p) = √4 = 2/1.",
        difficulty: "Medium",
        questionType: "Numerical",
      },
      {
        id: "phys_u7_q10",
        question: "In the Davisson and Germer experiment, the maximum intensity of scattered electrons was observed at an accelerating voltage of:",
        options: [
          "(A) 44 V at 60°",
          "(B) 54 V at 50°",
          "(C) 64 V at 45°",
          "(D) 50 V at 54°",
        ],
        correctAnswer: "(B) 54 V at 50°",
        explanation: "Davisson and Germer observed a sharp constructive interference diffraction peak at an accelerating potential of 54 V and scattering angle θ = 50° with a nickel target.",
        difficulty: "Easy",
        questionType: "Factual Recall",
      },
    ],
    links: {
      prerequisites: ["physics_u6_t2"],
      relatedTopics: ["physics_u8_t1"],
      practiceTestUrl: "/test/practice-physics-unit7-test1",
      weaknessRadarUrl: "/dashboard/radar?subject=physics",
    },
    physicsModule: {
      derivationsInBrief: [
        {
          title: "de-Broglie Relation from Photon Equivalence",
          steps: [
            "For a photon: E = hν and E = mc² ⇒ mc = hν/c = h/λ.",
            "Since momentum p = mc, we get p = h/λ ⇒ λ = h/p.",
            "de Broglie extended this to material particles of mass m and speed v: p = mv ⇒ λ = h/(mv).",
            "In terms of kinetic energy K = p²/(2m) ⇒ p = √(2mK) ⇒ λ = h/√(2mK).",
          ],
        },
      ],
      unitDimensionTable: [
        { quantity: "Planck's constant (h)", formula: "E = hν", siUnit: "Joule-second (J·s)", dimensionalFormula: "[M¹ L² T⁻¹]" },
        { quantity: "Work function (Φ₀)", formula: "Φ₀ = hν₀", siUnit: "Joule (J) or eV", dimensionalFormula: "[M¹ L² T⁻²]" },
        { quantity: "Stopping potential (V₀)", formula: "e V₀ = K_max", siUnit: "Volt (V)", dimensionalFormula: "[M¹ L² T⁻³ I⁻¹]" },
      ],
      graphInterpretations: [
        {
          graphTitle: "Stopping Potential vs Frequency for Different Metals",
          axes: "x-axis: Frequency ν, y-axis: Stopping Potential V₀",
          keyFeatures: "All lines have identical slope (h/e) and are strictly parallel. Lines for metals with higher work function are shifted further to the right (higher threshold frequency ν₀).",
        },
      ],
    },
  },
];
