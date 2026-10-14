import { NoteDocument } from "@/types/notes";

export const unit5Topics: NoteDocument[] = [
  {
    id: "physics_u5_t1",
    slug: "displacement-current",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 5,
    unitTitle: "Electromagnetic Waves",
    topicTitle: "Displacement Current",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 1",
      chapterNumber: 8,
      chapterName: "Electromagnetic Waves",
      sections: [
        "8.2 Displacement Current",
        "8.3 Electromagnetic Waves (Sources, Nature)",
      ],
    },
    cuetRelevance: {
      level: "Medium",
      pyqFrequency: "Appears in ~50% of shifts: displacement current formula I_d = ε₀ dΦ_E/dt, capacitor gap continuity, and Maxwell equations",
      totalPyqsInRepo: 24,
      weightagePercentage: 2.8,
    },
    summary30Seconds: [
      "Ampere's original law was logically incomplete for time-varying electric fields (such as charging a capacitor).",
      "Maxwell showed that a changing electric field induces a magnetic field, introducing **Displacement Current**: $I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}$.",
      "Ampere-Maxwell Law: $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 (I_c + I_d) = \\mu_0 I_c + \\mu_0 \\varepsilon_0 \\frac{d\\Phi_E}{dt}$.",
      "Continuity: Conduction current $I_c$ in the connecting wire equals displacement current $I_d$ in the capacitor gap at every instant ($I_c = I_d$).",
      "Maxwell's 4 equations unify electricity, magnetism, and optics, proving light is an electromagnetic wave travelling at $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}$.",
    ],
    coreConcepts: [
      {
        title: "The Inconsistency of Ampere's Law & Displacement Current",
        content:
          "Consider a parallel plate capacitor charging with current $I(t)$. By Ampere's original circuital law $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enc}}$:\n- For a flat circular surface spanning the loop outside the plates, current passes through the wire: $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I$.\n- For a pot-shaped surface whose open mouth is the same loop but whose bulging body passes between the capacitor plates, no conduction current crosses the surface: $\\oint \\vec{B} \\cdot d\\vec{l} = 0$.\n\nThis paradox violates mathematical consistency. Between the plates, as charge $q(t)$ accumulates, the electric field increases: $E = \\frac{q}{\\varepsilon_0 A}$. The electric flux is $\\Phi_E = E A = \\frac{q}{\\varepsilon_0}$. Differentiating with respect to time:\n$$\\frac{d\\Phi_E}{dt} = \\frac{1}{\\varepsilon_0} \\frac{dq}{dt} = \\frac{I_c}{\\varepsilon_0} \\implies I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt} = I_c$$\nThus, current is continuous throughout the circuit: conduction current $I_c$ in wires and displacement current $I_d$ across the dielectric gap.",
      },
      {
        title: "Maxwell's Four Fundamental Equations",
        content:
          "The complete classical theory of electromagnetism is summarized by Maxwell's equations:\n\n1. **Gauss's Law in Electrostatics:**\n   $$\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q}{\\varepsilon_0}$$\n   (Electric charges are monopoles that produce diverging electric fields).\n\n2. **Gauss's Law in Magnetism:**\n   $$\\oint \\vec{B} \\cdot d\\vec{A} = 0$$\n   (Magnetic monopoles do not exist; magnetic field lines are continuous closed loops).\n\n3. **Faraday-Lenz Law of Induction:**\n   $$\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi_B}{dt}$$\n   (A time-varying magnetic field produces a circulating electric field).\n\n4. **Ampere-Maxwell Law:**\n   $$\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_c + \\mu_0 \\varepsilon_0 \\frac{d\\Phi_E}{dt}$$\n   (Magnetic fields are produced both by moving electric charges and by time-varying electric fields).",
      },
      {
        title: "Properties of Electromagnetic Waves",
        content:
          "Accelerated electric charges radiate electromagnetic waves.\n- **Transverse Nature:** $\\vec{E}$ and $\\vec{B}$ oscillate sinusoidally perpendicular to each other and perpendicular to the direction of wave propagation $\\hat{k}$:\n  $$\\hat{k} = \\hat{E} \\times \\hat{B}$$\n- **Wave Speed:** In vacuum, $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{E_0}{B_0} \\approx 3 \\times 10^8\\text{ m/s}$. In a material medium with refractive index $n$, $v = \\frac{1}{\\sqrt{\\mu \\varepsilon}} = \\frac{c}{n}$.\n- **Energy Equipartition:** Total energy density $u = u_E + u_B = \\frac{1}{2}\\varepsilon_0 E^2 + \\frac{B^2}{2\\mu_0} = \\varepsilon_0 E_{\\text{rms}}^2 = \\frac{B_{\\text{rms}}^2}{\\mu_0}$. Electric and magnetic field energies are exactly equal on average: $\\langle u_E \\rangle = \\langle u_B \\rangle$.\n- **Poynting Vector & Intensity:** $\\vec{S} = \\frac{1}{\\mu_0} (\\vec{E} \\times \\vec{B})$; Average intensity $I = c \\langle u \\rangle = \\frac{1}{2} c \\varepsilon_0 E_0^2 = c \\varepsilon_0 E_{\\text{rms}}^2$.",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Displacement Current",
        formula: "I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt} = \\varepsilon_0 A \\frac{dE}{dt}",
        symbols: "\\Phi_E: electric flux, A: plate area",
        siUnits: "Ampere (A)",
        applicationCondition: "Regions of time-varying electric flux",
      },
      {
        name: "Speed of Light in Vacuum",
        formula: "c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{E_0}{B_0}",
        symbols: "E_0: peak electric field, B_0: peak magnetic field",
        siUnits: "m/s",
        applicationCondition: "Electromagnetic wave in vacuum",
      },
      {
        name: "Average Energy Density",
        formula: "u_{\\text{avg}} = \\frac{1}{2}\\varepsilon_0 E_{\\text{rms}}^2 + \\frac{B_{\\text{rms}}^2}{2\\mu_0} = \\varepsilon_0 E_{\\text{rms}}^2",
        symbols: "u_E = u_B on average",
        siUnits: "J/m³",
        applicationCondition: "Harmonic plane electromagnetic waves",
      },
      {
        name: "Radiation Pressure",
        formula: "P_{\\text{abs}} = \\frac{I}{c}, \\quad P_{\\text{refl}} = \\frac{2I}{c}",
        symbols: "I: beam intensity, c: speed of light",
        siUnits: "N/m² or Pascal (Pa)",
        applicationCondition: "Normal incidence on completely absorbing / reflecting surfaces",
      },
    ],
    diagram: {
      type: "svg",
      title: "Transverse Electromagnetic Wave Propagation",
      caption: "Mutually perpendicular oscillating electric field E (along y-axis) and magnetic field B (along z-axis) propagating along x-axis at speed c.",
      code: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <marker id="arrEM" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
    </marker>
    <marker id="arrRedEM" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
    </marker>
  </defs>
  <!-- Background panel -->
  <rect x="20" y="10" width="720" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="380" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Plane Transverse Electromagnetic Wave: E⃗ ⟂ B⃗ ⟂ Propagation Direction</text>

  <!-- Axes -->
  <line x1="80" y1="130" x2="680" y2="130" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrEM)"/>
  <text x="695" y="135" fill="#64748B" fontSize="12" fontWeight="bold">x (c⃗)</text>

  <line x1="80" y1="130" x2="80" y2="40" stroke="#DC2626" strokeWidth="2" markerEnd="url(#arrRedEM)"/>
  <text x="75" y="30" fill="#DC2626" fontSize="12" fontWeight="bold">y (E⃗)</text>

  <line x1="80" y1="130" x2="40" y2="190" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrEM)"/>
  <text x="25" y="200" fill="#2563EB" fontSize="12" fontWeight="bold">z (B⃗)</text>

  <!-- E-field Sine wave along Y (Red) -->
  <path d="M 80 130 Q 155 50 230 130 Q 305 210 380 130 Q 455 50 530 130 Q 605 210 680 130" fill="none" stroke="#DC2626" strokeWidth="2.5"/>
  <line x1="155" y1="130" x2="155" y2="65" stroke="#DC2626" strokeWidth="1.5" markerEnd="url(#arrRedEM)"/>
  <line x1="455" y1="130" x2="455" y2="65" stroke="#DC2626" strokeWidth="1.5" markerEnd="url(#arrRedEM)"/>
  <text x="165" y="80" fill="#DC2626" fontSize="11" fontWeight="bold">E₀</text>

  <!-- B-field Sine wave along Z (Blue dashed perspective) -->
  <path d="M 80 130 Q 130 160 230 130 Q 330 100 380 130 Q 430 160 530 130 Q 630 100 680 130" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="4 2"/>
  <line x1="130" y1="130" x2="145" y2="155" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arrEM)"/>
  <text x="155" y="160" fill="#2563EB" fontSize="11" fontWeight="bold">B₀</text>

  <text x="380" y="222" textAnchor="middle" fill="#0F172A" fontSize="12" fontWeight="bold">c = E₀ / B₀ = 1 / √(μ₀ε₀) ≈ 3 × 10⁸ m/s</text>
</svg>`,
    },
    workedExamples: [
      {
        id: "we_phys_5_1",
        questionNumber: 1,
        question:
          "A parallel plate capacitor with circular plates of radius 1 m has a capacitance of 1 nF. At t = 0, it is connected for charging in series with a resistor R = 1 MΩ across a 2 V battery. What is the value of the displacement current between the plates at t = 10⁻³ s?",
        options: [
          { id: "A", text: "2.0 μA" },
          { id: "B", text: "0.736 μA" },
          { id: "C", text: "1.47 μA" },
          { id: "D", text: "0 μA" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The displacement current between capacitor plates is identical to the instantaneous conduction current: $I_d(t) = I_c(t)$.",
          "Step 2: Circuit time constant: $\\tau = R C = (10^6\\,\\Omega) \\times (10^{-9}\\text{ F}) = 10^{-3}\\text{ s} = 1\\text{ ms}$.",
          "Step 3: Initial charging current $I_0 = \\frac{V}{R} = \\frac{2\\text{ V}}{10^6\\,\\Omega} = 2 \\times 10^{-6}\\text{ A} = 2\\,\\mu\\text{A}$.",
          "Step 4: Current at time $t = 10^{-3}\\text{ s} = \\tau$ is: $I(t) = I_0 e^{-t/\\tau} = 2\\,\\mu\\text{A} \\times e^{-1} = \\frac{2}{2.718} \\approx 0.736\\,\\mu\\text{A}$.",
          "Hence, Option B is correct.",
        ],
        cuetTip: "Remember the fundamental identity: $I_d(t) = I_c(t)$ in a series charging circuit at any moment. No need to integrate electric fields!",
      },
      {
        id: "we_phys_5_2",
        questionNumber: 2,
        question:
          "The amplitude of the magnetic field part of a harmonic electromagnetic wave in vacuum is B₀ = 510 nT. What is the amplitude of the electric field part of the wave?",
        options: [
          { id: "A", text: "153 N/C" },
          { id: "B", text: "1.7 × 10⁻¹⁵ N/C" },
          { id: "C", text: "510 N/C" },
          { id: "D", text: "300 N/C" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Formula connecting electric and magnetic field amplitudes in EM wave: $E_0 = c B_0$.",
          "Step 2: Substitute $B_0 = 510\\text{ nT} = 510 \\times 10^{-9}\\text{ T}$ and $c = 3 \\times 10^8\\text{ m/s}$.",
          "Step 3: $E_0 = (3 \\times 10^8) \\times (510 \\times 10^{-9}) = 1530 \\times 10^{-1} = 153\\text{ N/C}$ (or $\\text{V/m}$).",
        ],
        cuetTip: "Remember E₀ is always larger than B₀ in SI units by the huge factor of c (3 × 10⁸).",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Conduction vs Displacement Current",
        frequency: "Observed in 60% of test sessions",
        pyqExample: {
          question: "During charging of a capacitor, the ratio of displacement current between the plates to the conduction current in the connecting wires is:",
          options: [
            { id: "A", text: "Zero" },
            { id: "B", text: "1" },
            { id: "C", text: "Infinity" },
            { id: "D", text: "1/2" },
          ],
          correctOption: "B",
          explanation: "By conservation of charge and Maxwell's continuity principle, conduction current entering plate equals displacement current in the gap at all times ($I_d / I_c = 1$).",
        },
        strategy: "Displacement current $I_d$ in the gap is always identical in magnitude to conduction current $I_c$ in the wire.",
      },
      {
        type: "Wave Propagation Direction Vector",
        frequency: "Very High",
        pyqExample: {
          question: "The direction of propagation of an electromagnetic wave is given by the direction of:",
          options: [
            { id: "A", text: "E⃗ × B⃗" },
            { id: "B", text: "B⃗ × E⃗" },
            { id: "C", text: "E⃗" },
            { id: "D", text: "B⃗" },
          ],
          correctOption: "A",
          explanation: "Poynting vector S⃗ = (1/μ₀) (E⃗ × B⃗) defines the direction of energy propagation. Thus k̂ = Ê × B̂.",
        },
        strategy: "Always E first, then cross into B (E × B). B × E is in the opposite direction!",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming displacement current involves physical flow of real electrons through the gap.",
        whyWrong: "Displacement current does NOT involve real electric charges. It is caused solely by the time rate of change of electric flux ($\\varepsilon_0 d\\Phi_E/dt$).",
        correctUnderstanding: "Displacement current is a mathematical and physical manifestation of a time-varying electric field behaving like a current.",
        trapOptionExample: "Asserting electrons jump across the vacuum gap.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        mnemonic: "Equal Energy: E-field energy = B-field energy",
        rule: "Energy Equipartition in EM waves",
        shortcut: "u_E = u_B = ½ u_total",
        whenToApply: "Calculating energy carried by electric vs magnetic components of light",
      },
    ],
    quickRevisionCard: {
      title: "Displacement Current & EM Waves — Summary",
      bulletPoints: [
        "Displacement Current: I_d = ε₀ (dΦ_E / dt). In capacitor gap, I_d = I_c.",
        "Ampere-Maxwell: ∮ B⃗ · dl⃗ = μ₀I_c + μ₀ε₀ (dΦ_E / dt).",
        "Maxwell 1: ∮ E⃗ · dA⃗ = q/ε₀ (Gauss Electrostatics).",
        "Maxwell 2: ∮ B⃗ · dA⃗ = 0 (No magnetic monopoles).",
        "Maxwell 3: ∮ E⃗ · dl⃗ = −dΦ_B/dt (Faraday-Lenz Law).",
        "Maxwell 4: ∮ B⃗ · dl⃗ = μ₀(I_c + I_d) (Ampere-Maxwell).",
        "EM Wave Speed: c = 1 / √(μ₀ε₀) = E₀ / B₀ = 3 × 10⁸ m/s.",
        "Direction: Propagation vector along E⃗ × B⃗.",
        "Energy Equipartition: u_E = u_B = ¼ ε₀E₀² = ¼ (B₀² / μ₀). Total u = ½ ε₀E₀².",
        "Radiation Pressure: P = I/c (absorbing), P = 2I/c (reflecting).",
      ],
    },
    practiceQuestions: [
      {
        id: "pq_phys_5_1",
        question: "In a plane electromagnetic wave, the electric field oscillates sinusoidally at a frequency of 2.0 × 10¹⁰ Hz and amplitude 48 V/m. The amplitude of the oscillating magnetic field is:",
        type: "standard",
        options: [
          { id: "A", text: "1.6 × 10⁻⁷ T" },
          { id: "B", text: "1.44 × 10¹⁰ T" },
          { id: "C", text: "1.6 × 10⁻⁸ T" },
          { id: "D", text: "2.4 × 10⁻⁷ T" },
        ],
        correctOption: "A",
        explanation: "$B_0 = \\frac{E_0}{c} = \\frac{48\\text{ V/m}}{3 \\times 10^8\\text{ m/s}} = 1.6 \\times 10^{-7}\\text{ T}$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_2",
        question: "Assertion (A): The displacement current in a capacitor gap is zero when the capacitor is fully charged by a DC source.\nReason (R): For a fully charged capacitor connected across a DC supply, the charge and electric field between the plates become constant, making dΦ_E/dt = 0.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "When fully charged, current ceases ($I_c = 0$) and electric field is static ($dE/dt = 0$), so $I_d = \\varepsilon_0 A (dE/dt) = 0$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_3",
        question: "Match List I (Maxwell's Equation) with List II (Physical Significance):\nList I: (A) ∮ E⃗ · dA⃗ = q/ε₀, (B) ∮ B⃗ · dA⃗ = 0, (C) ∮ E⃗ · dl⃗ = −dΦ_B/dt, (D) ∮ B⃗ · dl⃗ = μ₀(I_c + ε₀ dΦ_E/dt)\nList II: (I) Time-varying B produces circulating E, (II) Non-existence of isolated magnetic monopoles, (III) Electric charges are sources of electrostatic fields, (IV) Time-varying E produces magnetic field",
        type: "match-the-following",
        options: [
          { id: "A", text: "A-(III), B-(II), C-(I), D-(IV)" },
          { id: "B", text: "A-(II), B-(III), C-(I), D-(IV)" },
          { id: "C", text: "A-(III), B-(I), C-(II), D-(IV)" },
          { id: "D", text: "A-(IV), B-(II), C-(I), D-(III)" },
        ],
        correctOption: "A",
        explanation: "Gauss electrostatics -> charge sources (III); Gauss magnetism -> no monopoles (II); Faraday -> time-varying B gives E (I); Ampere-Maxwell -> time-varying E gives B (IV).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_1_4",
        question: "A parallel plate capacitor with circular plates of radius 10 cm is being charged by a steady current of 0.2 A. The displacement current through a circular area of radius 5 cm concentric with the plates is:",
        type: "standard",
        options: [
          { id: "A", text: "0.2 A" },
          { id: "B", text: "0.1 A" },
          { id: "C", text: "0.05 A" },
          { id: "D", text: "0.025 A" },
        ],
        correctOption: "C",
        explanation: "Electric field between plates is uniform: E = q / (ε₀ A). Flux through radius r is Φ_E = E π r². Thus I_d(r) = I_total × (π r² / π R²) = 0.2 × (5 / 10)² = 0.2 × 0.25 = 0.05 A.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_5_1_5",
        question: "Assertion (A): Electromagnetic waves are transverse in nature.\nReason (R): Electromagnetic waves can be polarized, and their electric and magnetic field vectors oscillate mutually perpendicular to each other and to the direction of propagation.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Polarization is a unique signature of transverse waves. In EM waves, E⃗ ⊥ B⃗ ⊥ k̂ (propagation vector k̂ = Ê × B̂).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_1_6",
        question: "The ratio of the average electric energy density (u_E) to the average magnetic energy density (u_B) in a plane electromagnetic wave travelling in free space is:",
        type: "standard",
        options: [
          { id: "A", text: "1 : 1" },
          { id: "B", text: "c : 1" },
          { id: "C", text: "c² : 1" },
          { id: "D", text: "1 : c" },
        ],
        correctOption: "A",
        explanation: "u_E = ¼ ε₀ E₀² and u_B = ¼ (B₀² / μ₀). Since E₀ = c B₀ and c² = 1 / (μ₀ ε₀), u_E = u_B. Energy is shared equally between electric and magnetic fields.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_1_7",
        question: "If the amplitude of the electric field of an EM wave is doubled, its intensity will:",
        type: "standard",
        options: [
          { id: "A", text: "Double" },
          { id: "B", text: "Halve" },
          { id: "C", text: "Quadruple" },
          { id: "D", text: "Remain unchanged" },
        ],
        correctOption: "C",
        explanation: "Intensity I = ½ c ε₀ E₀². Since I ∝ E₀², doubling the electric field amplitude increases intensity by a factor of 2² = 4.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_1_8",
        question: "An electromagnetic wave of intensity I strikes a perfectly reflecting surface at normal incidence. The radiation pressure exerted on the surface is:",
        type: "standard",
        options: [
          { id: "A", text: "I / c" },
          { id: "B", text: "2I / c" },
          { id: "C", text: "I / (2c)" },
          { id: "D", text: "I c" },
        ],
        correctOption: "B",
        explanation: "For complete reflection, momentum change per photon is 2p = 2E/c. Thus force per unit area (radiation pressure) is P = 2I / c. (For perfect absorption it is I/c).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_1_9",
        question: "An electromagnetic wave propagates along the positive z-axis. If the electric field vector at any instant oscillates along the x-axis, the magnetic field vector oscillates along the:",
        type: "standard",
        options: [
          { id: "A", text: "+y-axis" },
          { id: "B", text: "-y-axis" },
          { id: "C", text: "+z-axis" },
          { id: "D", text: "+x-axis" },
        ],
        correctOption: "A",
        explanation: "The wave vector k̂ = Ê × B̂. Given k̂ = +ẑ and Ê = +x̂: since x̂ × ŷ = ẑ, B̂ must point along the +y-axis.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_1_10",
        question: "The speed of electromagnetic waves in a non-magnetic medium with dielectric constant K = 4.0 is:",
        type: "standard",
        options: [
          { id: "A", text: "3.0 × 10⁸ m/s" },
          { id: "B", text: "1.5 × 10⁸ m/s" },
          { id: "C", text: "0.75 × 10⁸ m/s" },
          { id: "D", text: "6.0 × 10⁸ m/s" },
        ],
        correctOption: "B",
        explanation: "v = c / √(μ_r ε_r) = c / √K = (3 × 10⁸) / √4 = 1.5 × 10⁸ m/s.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "AC Circuits & Transformers", slug: "ac-circuits-resonance-power-in-ac-transformers" },
      ],
      relatedTopics: [
        { title: "Electromagnetic Spectrum & Applications", slug: "electromagnetic-spectrum-and-applications" },
      ],
      practiceTestId: "practice-physics-unit5-test1",
      practiceTestUrl: "/test/practice-physics-unit5-test1",
      weaknessReportUrl: "/dashboard/radar?subject=physics",
    },
    subjectSpecific: {
      physics: {
        unitDimensionTable: [
          { quantity: "Displacement Current (I_d)", dimension: "[A]", unit: "Ampere (A)" },
          { quantity: "Poynting Vector / Intensity (S, I)", dimension: "[M T⁻³]", unit: "W/m²" },
          { quantity: "Radiation Pressure (P)", dimension: "[M L⁻¹ T⁻²]", unit: "N/m² or Pa" },
        ],
      },
    },
    metadata: {
      confidence: "high",
      needsHumanReview: false,
      lastUpdated: new Date().toISOString(),
      version: 1,
      wordCount: 1410,
      isFreePreview: false,
    },
  },
  {
    id: "physics_u5_t2",
    slug: "electromagnetic-spectrum-and-applications",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 5,
    unitTitle: "Electromagnetic Waves",
    topicTitle: "Electromagnetic Spectrum & Applications",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 1",
      chapterNumber: 8,
      chapterName: "Electromagnetic Waves",
      sections: [
        "8.4 Electromagnetic Spectrum (Radio, Micro, Infrared, Visible, UV, X-rays, Gamma rays)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Highest ROI topic in Physics: 2-3 guaranteed direct/match questions on wavelength ordering and medical/industrial applications",
      totalPyqsInRepo: 42,
      weightagePercentage: 4.8,
    },
    summary30Seconds: [
      "Wavelength order (increasing): $\\gamma < \\text{X-rays} < \\text{UV} < \\text{Visible} (400-700\\text{ nm}) < \\text{Infrared} < \\text{Microwaves} < \\text{Radio waves}$.",
      "Frequency order (increasing): Radio waves < Microwaves < Infrared < Visible < UV < X-rays < $\\gamma$-rays.",
      "Microwaves ($\\lambda \\sim 1\\text{ mm} - 0.1\\text{ m}$): Generated by klystron, magnetron, or Gunn diodes; used in RADAR, satellite communications, and microwave ovens.",
      "Infrared ($\\lambda \\sim 700\\text{ nm} - 1\\text{ mm}$): Produced by hot bodies; known as 'heat waves'; used in physical therapy, greenhouse effect, TV remotes, night vision.",
      "Ultraviolet ($400\\text{ nm} - 1\\text{ nm}$): Produced by mercury lamps, electric arcs; used in water purifiers (germicidal), LASIK eye surgery. Ozone layer absorbs solar UV.",
    ],
    coreConcepts: [
      {
        title: "The Complete Electromagnetic Spectrum Hierarchy",
        content:
          "All electromagnetic waves travel at speed $c = 3 \\times 10^8\\text{ m/s}$ in vacuum ($c = \\nu \\lambda$).\n\n| Band | Wavelength Range | Frequency Range | Source / Production | Detection |\n| :--- | :--- | :--- | :--- | :--- |\n| **Radio waves** | $> 0.1\\text{ m}$ | $500\\text{ kHz} - 1000\\text{ MHz}$ | Rapid acceleration of charges in conducting wires (LC circuits) | Antennas, tuned LC circuits |\n| **Microwaves** | $0.1\\text{ m} - 1\\text{ mm}$ | $1\\text{ GHz} - 300\\text{ GHz}$ | Special vacuum tubes (Klystron, Magnetron, Gunn diodes) | Point-contact diodes |\n| **Infrared** | $1\\text{ mm} - 700\\text{ nm}$ | $300\\text{ GHz} - 4 \\times 10^{14}\\text{ Hz}$ | Vibration of atoms and molecules in hot bodies | Thermopiles, bolometers, infrared photographic film |\n| **Visible light** | $700\\text{ nm} - 400\\text{ nm}$ | $4 \\times 10^{14} - 7.5 \\times 10^{14}\\text{ Hz}$ | Electrons transitioning to lower atomic energy states | Human retina, photocells |\n| **Ultraviolet** | $400\\text{ nm} - 1\\text{ nm}$ | $7.5 \\times 10^{14} - 3 \\times 10^{16}\\text{ Hz}$ | Inner shell electron transitions, very hot bodies (Sun, electric arcs) | Photographic plates, photocells |\n| **X-rays** | $1\\text{ nm} - 10^{-3}\\text{ nm}$ | $3 \\times 10^{16} - 3 \\times 10^{19}\\text{ Hz}$ | Bombarding high-Z heavy metal targets with high-speed electrons | Photographic film, Geiger counters |\n| **Gamma rays** | $< 10^{-3}\\text{ nm}$ | $> 3 \\times 10^{19}\\text{ Hz}$ | Radioactive decay of atomic nuclei, nuclear reactions | Ionization chambers, scintillation detectors |",
      },
      {
        title: "NCERT-Specific Functional Applications",
        content:
          "CUET questions test these exact NCERT practical applications:\n1. **Radio Waves:** AM band (530–1710 kHz), Shortwave band (up to 54 MHz), TV signals (54–890 MHz), FM band (88–108 MHz), Cellular mobile phones (UHF band ~800–900 MHz).\n2. **Microwaves:** Radar systems for aircraft navigation; Microwave ovens (frequency tuned to ~2.45 GHz matching the resonant rotational frequency of water molecules to heat food efficiently).\n3. **Infrared Waves:** Known as 'heat waves' because water, CO₂, and NH₃ molecules readily absorb them and thermalize energy; Greenhouse effect keeping Earth's surface warm; TV/VCR remote controls; Infrared lamps in physical therapy; Satellite earth-imaging for haze-free photography.\n4. **Ultraviolet Rays:** Germicidal water purifiers (UV kills bacteria by destroying nucleic acids); LASIK eye surgery (excimer laser in UV region cleans corneal tissue with high precision); Detecting forged currency and invisible fingerprints; Hazard: prolonged exposure causes skin cancer and cataract (welder's goggles absorb UV).\n5. **X-rays:** Diagnostic radiography for detecting bone fractures; Radiation therapy for cancer; Investigating crystal structure and diffraction.\n6. **Gamma Rays:** Destroying malignant cancerous cells (radiotherapy); Sterilizing surgical instruments and preserving food.",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Wave Speed & Frequency Relation",
        formula: "c = \\nu \\lambda \\implies \\nu = \\frac{c}{\\lambda}",
        symbols: "\\nu: frequency, \\lambda: wavelength, c = 3 \\times 10^8\\text{ m/s}",
        siUnits: "Hz and meters",
        applicationCondition: "All electromagnetic radiations in vacuum",
      },
      {
        name: "Photon Energy",
        formula: "E = h \\nu = \\frac{h c}{\\lambda} \\approx \\frac{1240}{\\lambda\\text{ (nm)}}\\text{ eV}",
        symbols: "h = 6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}",
        siUnits: "eV or Joules",
        applicationCondition: "Quantum energy of an EM radiation packet",
      },
    ],
    diagram: {
      type: "svg",
      title: "Electromagnetic Spectrum Chart",
      caption: "Logarithmic scale of electromagnetic spectrum from Radio waves to Gamma rays showing wavelength, frequency, and representative applications.",
      code: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect x="15" y="10" width="730" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="380" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">The Electromagnetic Spectrum (Decreasing Wavelength → Increasing Frequency)</text>

  <!-- Bands -->
  <g transform="translate(30, 55)">
    <!-- Radio -->
    <rect x="0" y="0" width="95" height="110" fill="#DBEAFE" stroke="#2563EB" rx="6"/>
    <text x="47" y="24" textAnchor="middle" fill="#1E40AF" fontSize="11" fontWeight="bold">Radio</text>
    <text x="47" y="44" textAnchor="middle" fill="#3B82F6" fontSize="10">&gt; 0.1 m</text>
    <text x="47" y="70" textAnchor="middle" fill="#1E293B" fontSize="9">Broadcast</text>
    <text x="47" y="85" textAnchor="middle" fill="#1E293B" fontSize="9">Mobile / TV</text>

    <!-- Micro -->
    <rect x="100" y="0" width="95" height="110" fill="#E0F2FE" stroke="#0284C7" rx="6"/>
    <text x="147" y="24" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">Micro</text>
    <text x="147" y="44" textAnchor="middle" fill="#0284C7" fontSize="10">0.1m - 1mm</text>
    <text x="147" y="70" textAnchor="middle" fill="#1E293B" fontSize="9">RADAR</text>
    <text x="147" y="85" textAnchor="middle" fill="#1E293B" fontSize="9">Ovens</text>

    <!-- Infrared -->
    <rect x="200" y="0" width="95" height="110" fill="#FEF3C7" stroke="#D97706" rx="6"/>
    <text x="247" y="24" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="bold">Infrared</text>
    <text x="247" y="44" textAnchor="middle" fill="#D97706" fontSize="10">1mm - 700nm</text>
    <text x="247" y="70" textAnchor="middle" fill="#1E293B" fontSize="9">Heat Waves</text>
    <text x="247" y="85" textAnchor="middle" fill="#1E293B" fontSize="9">Remotes</text>

    <!-- Visible -->
    <rect x="300" y="0" width="95" height="110" fill="#FCE7F3" stroke="#DB2777" rx="6"/>
    <text x="347" y="24" textAnchor="middle" fill="#BE185D" fontSize="11" fontWeight="bold">Visible</text>
    <text x="347" y="44" textAnchor="middle" fill="#DB2777" fontSize="10">700 - 400nm</text>
    <text x="347" y="70" textAnchor="middle" fill="#1E293B" fontSize="9">VIBGYOR</text>
    <text x="347" y="85" textAnchor="middle" fill="#1E293B" fontSize="9">Human Vision</text>

    <!-- UV -->
    <rect x="400" y="0" width="95" height="110" fill="#EDE9FE" stroke="#7C3AED" rx="6"/>
    <text x="447" y="24" textAnchor="middle" fill="#6D28D9" fontSize="11" fontWeight="bold">UV Rays</text>
    <text x="447" y="44" textAnchor="middle" fill="#7C3AED" fontSize="10">400 - 1nm</text>
    <text x="447" y="70" textAnchor="middle" fill="#1E293B" fontSize="9">Water Purifier</text>
    <text x="447" y="85" textAnchor="middle" fill="#1E293B" fontSize="9">LASIK</text>

    <!-- X-rays -->
    <rect x="500" y="0" width="95" height="110" fill="#FEE2E2" stroke="#DC2626" rx="6"/>
    <text x="547" y="24" textAnchor="middle" fill="#B91C1C" fontSize="11" fontWeight="bold">X-Rays</text>
    <text x="547" y="44" textAnchor="middle" fill="#DC2626" fontSize="10">1nm - 10⁻³nm</text>
    <text x="547" y="70" textAnchor="middle" fill="#1E293B" fontSize="9">Bone Imaging</text>
    <text x="547" y="85" textAnchor="middle" fill="#1E293B" fontSize="9">Crystallography</text>

    <!-- Gamma -->
    <rect x="600" y="0" width="95" height="110" fill="#FEF2F2" stroke="#991B1B" rx="6"/>
    <text x="647" y="24" textAnchor="middle" fill="#7F1D1D" fontSize="11" fontWeight="bold">Gamma (γ)</text>
    <text x="647" y="44" textAnchor="middle" fill="#991B1B" fontSize="10">&lt; 10⁻³ nm</text>
    <text x="647" y="70" textAnchor="middle" fill="#1E293B" fontSize="9">Nuclear Decay</text>
    <text x="647" y="85" textAnchor="middle" fill="#1E293B" fontSize="9">Cancer Therapy</text>
  </g>

  <!-- Arrows -->
  <text x="180" y="195" textAnchor="middle" fill="#2563EB" fontSize="11" fontWeight="bold">⟵ Increasing Wavelength (λ)</text>
  <text x="580" y="195" textAnchor="middle" fill="#DC2626" fontSize="11" fontWeight="bold">Increasing Frequency (ν) &amp; Energy (E) ⟶</text>
</svg>`,
    },
    workedExamples: [
      {
        id: "we_phys_5_2",
        questionNumber: 1,
        question:
          "Which of the following electromagnetic radiations is used in LASIK eye surgery, and which is used in water purifiers to kill germs?",
        options: [
          { id: "A", text: "Infrared for LASIK, X-rays for water purifiers" },
          { id: "B", text: "Ultraviolet rays for both LASIK and water purifiers" },
          { id: "C", text: "Microwaves for LASIK, Ultraviolet for water purifiers" },
          { id: "D", text: "Ultraviolet for LASIK, Gamma rays for water purifiers" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Check NCERT Physics Class 12 Chapter 8 Section 8.4 on Ultraviolet radiation.",
          "Step 2: Excimer lasers producing ultraviolet rays are used in LASIK (Laser-Assisted In Situ Keratomileusis) eye surgery to ablate corneal tissue with sub-micron precision.",
          "Step 3: UV lamps are germicidal; UV light kills microbes in water purifiers by disrupting their cellular DNA.",
          "Hence, Ultraviolet rays are used for both applications (Option B).",
        ],
        cuetTip: "NCERT explicitly highlights both water purification and LASIK under the Ultraviolet radiation section. Memorize these exact pairings!",
      },
      {
        id: "we_phys_5_3",
        questionNumber: 2,
        question:
          "A plane electromagnetic wave of frequency 25 MHz travels in free space along the x-direction. At a particular point in space and time, E⃗ = 6.3 ĵ V/m. What is B⃗ at this point?",
        options: [
          { id: "A", text: "2.1 × 10⁻⁸ k̂ T" },
          { id: "B", text: "-2.1 × 10⁻⁸ k̂ T" },
          { id: "C", text: "1.89 × 10⁹ k̂ T" },
          { id: "D", text: "2.1 × 10⁻⁸ ĵ T" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Magnitude of magnetic field: $B = \\frac{E}{c} = \\frac{6.3\\text{ V/m}}{3 \\times 10^8\\text{ m/s}} = 2.1 \\times 10^{-8}\\text{ T}$.",
          "Step 2: Direction of propagation is along $+x$ (unit vector $\\hat{i}$).",
          "Step 3: Since $\\hat{k}_{\\text{wave}} = \\hat{E} \\times \\hat{B} \\implies \\hat{i} = \\hat{j} \\times \\hat{B}$.",
          "Step 4: Since $\\hat{j} \\times \\hat{k} = \\hat{i}$, the unit vector for $\\vec{B}$ must be $+\\hat{k}$. Thus $\\vec{B} = 2.1 \\times 10^{-8} \\hat{k}\\text{ T}$.",
        ],
        cuetTip: "Use right-hand cross product: E (along y) crossed into B (along z) gives wave propagation along x.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Match List Wavelength & Applications",
        frequency: "Top 3 most common Physics question in CUET",
        pyqExample: {
          question:
            "Match List I (Electromagnetic Wave) with List II (Primary Application):\nList I: (A) Microwaves, (B) Infrared, (C) Ultraviolet, (D) X-rays\nList II: (I) Greenhouse effect & physical therapy, (II) Radar & aircraft navigation, (III) Diagnostic radiography, (IV) Water purifiers & LASIK",
          options: [
            { id: "A", text: "A-(II), B-(I), C-(IV), D-(III)" },
            { id: "B", text: "A-(I), B-(II), C-(III), D-(IV)" },
            { id: "C", text: "A-(II), B-(IV), C-(I), D-(III)" },
            { id: "D", text: "A-(III), B-(I), C-(IV), D-(II)" },
          ],
          correctOption: "A",
          explanation: "Microwaves -> Radar (II); Infrared -> Greenhouse effect/therapy (I); UV -> Water purifiers/LASIK (IV); X-rays -> Diagnostic radiography (III).",
        },
        strategy: "Instantly link Microwaves -> Radar or Infrared -> Heat/Greenhouse to lock in the correct option.",
      },
      {
        type: "Order of Wavelength / Frequency",
        frequency: "Very High",
        pyqExample: {
          question: "Which sequence correctly arranges the electromagnetic radiations in order of decreasing wavelength?",
          options: [
            { id: "A", text: "Radio waves > Microwaves > Infrared > Visible > Ultraviolet > X-rays > Gamma rays" },
            { id: "B", text: "Gamma rays > X-rays > Ultraviolet > Visible > Infrared > Microwaves > Radio waves" },
            { id: "C", text: "Radio waves > Infrared > Microwaves > Visible > Ultraviolet > X-rays > Gamma rays" },
            { id: "D", text: "Visible > Infrared > Ultraviolet > Radio waves > X-rays > Gamma rays" },
          ],
          correctOption: "A",
          explanation: "Wavelength decreases from Radio (>0.1 m) down to Gamma rays (<10⁻¹² m).",
        },
        strategy: "Mnemonic: 'Rich Men In Venus Use X-ray Guns' (Radio, Micro, Infrared, Visible, UV, X-ray, Gamma).",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing frequency order with wavelength order.",
        whyWrong: "$c = \\nu \\lambda$, so frequency is inversely proportional to wavelength. Gamma rays have the SMALLEST wavelength but HIGHEST frequency/energy.",
        correctUnderstanding: "Radio has max wavelength, Gamma has max frequency and energy.",
        trapOptionExample: "Selecting radio waves as having highest frequency.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        mnemonic: "R-M-I-V-U-X-G: Rich Men In Vegas Use X-ray Glasses",
        rule: "Order of increasing frequency / decreasing wavelength",
        shortcut: "Radio -> Microwave -> Infrared -> Visible -> UV -> X-ray -> Gamma",
        whenToApply: "Ordering spectrum bands by frequency or wavelength",
      },
    ],
    quickRevisionCard: {
      title: "EM Spectrum — Complete Quick Summary",
      bulletPoints: [
        "Wavelength: Radio > Micro > IR > Visible > UV > X-ray > Gamma (R-M-I-V-U-X-G).",
        "Frequency/Energy: Gamma > X-ray > UV > Visible > IR > Micro > Radio.",
        "Radio waves (> 0.1 m): Rapid charge oscillations in LC circuits; AM, FM, Cellular.",
        "Microwaves (0.1 m − 1 mm): Klystrons/magnetrons; RADAR, microwave ovens (2.45 GHz).",
        "Infrared (1 mm − 700 nm): 'Heat waves' from hot bodies; Greenhouse effect, TV remotes.",
        "Visible light (700 − 400 nm): Electron atomic transitions; human vision.",
        "UV rays (400 − 1 nm): Mercury arcs; Germicidal water purifiers, LASIK eye surgery.",
        "X-rays (1 nm − 10⁻³ nm): Fast electrons striking heavy metal targets; bone fracture radiography.",
        "Gamma rays (< 10⁻³ nm): Nuclear radioactive decay; cancer radiotherapy treatment.",
      ],
    },
    practiceQuestions: [
      {
        id: "pq_phys_5_4",
        question: "Which electromagnetic radiation is produced when high energy electrons strike a heavy metal target of high melting point?",
        type: "standard",
        options: [
          { id: "A", text: "Gamma rays" },
          { id: "B", text: "X-rays" },
          { id: "C", text: "Ultraviolet rays" },
          { id: "D", text: "Microwaves" },
        ],
        correctOption: "B",
        explanation: "X-rays are generated by decelerating high-energy electrons colliding with high-atomic-number metal targets (such as tungsten or molybdenum) in a Coolidge tube.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_5",
        question: "Arrange the following radiations in increasing order of their frequency:\n(A) Microwaves, (B) Gamma rays, (C) Infrared, (D) Ultraviolet",
        type: "standard",
        options: [
          { id: "A", text: "A < C < D < B" },
          { id: "B", text: "B < D < C < A" },
          { id: "C", text: "C < A < D < B" },
          { id: "D", text: "A < D < C < B" },
        ],
        correctOption: "A",
        explanation: "Increasing frequency order: Microwaves ($10^9\\text{ Hz}$) < Infrared ($10^{12}\\text{ Hz}$) < Ultraviolet ($10^{15}\\text{ Hz}$) < Gamma rays ($10^{20}\\text{ Hz}$).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_6",
        question: "Assertion (A): Infrared waves are often called heat waves.\nReason (R): Water molecules and other molecules present in most materials readily absorb infrared waves, increasing their thermal motion and temperature.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Infrared frequencies match natural vibrational frequencies of polar molecules like water, converting radiant energy into internal thermal energy.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_7",
        question: "Match List I (Electromagnetic Wave) with List II (Primary Application):\nList I: (A) Microwaves, (B) Ultraviolet rays, (C) Infrared waves, (D) Gamma rays\nList II: (I) LASIK eye surgery & water purification, (II) Radar navigation & aircraft control, (III) Cancer radiation therapy, (IV) Remote controls & haze photography",
        type: "match-the-following",
        options: [
          { id: "A", text: "A-(II), B-(I), C-(IV), D-(III)" },
          { id: "B", text: "A-(I), B-(II), C-(III), D-(IV)" },
          { id: "C", text: "A-(II), B-(IV), C-(I), D-(III)" },
          { id: "D", text: "A-(IV), B-(I), C-(II), D-(III)" },
        ],
        correctOption: "A",
        explanation: "Microwaves are used in radar (II). UV rays are used in LASIK and sterilizers (I). Infrared is used in remote controls and haze photography (IV). Gamma rays treat cancer (III).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_8",
        question: "The ozone layer in the upper atmosphere absorbs which component of solar radiation?",
        type: "standard",
        options: [
          { id: "A", text: "Infrared rays" },
          { id: "B", text: "Ultraviolet rays" },
          { id: "C", text: "X-rays" },
          { id: "D", text: "Radio waves" },
        ],
        correctOption: "B",
        explanation: "The stratosphere ozone layer absorbs harmful short-wavelength ultraviolet radiation (UV-B and UV-C) from the Sun.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_9",
        question: "Which electromagnetic radiation has the highest penetrating power through matter?",
        type: "standard",
        options: [
          { id: "A", text: "Ultraviolet rays" },
          { id: "B", text: "X-rays" },
          { id: "C", text: "Gamma rays" },
          { id: "D", text: "Infrared rays" },
        ],
        correctOption: "C",
        explanation: "Gamma rays possess the highest photon energy and highest frequency ($E = h\\nu > 10^5\\text{ eV}$), giving them the greatest penetrating depth through dense matter.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_10",
        question: "Assertion (A): Microwaves are used in radar systems for aircraft navigation.\nReason (R): Due to their relatively short wavelength (compared to radio waves), microwaves can be transmitted as sharp, narrow, directional beams that reflect cleanly from metallic aircraft surfaces.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Short wavelengths minimize diffraction spreading, allowing microwave radar transmitters to create narrow beams that pinpoint airplane locations with high angular resolution.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_11",
        question: "Greenhouse effect keeps the Earth's surface warm because the atmosphere traps:",
        type: "standard",
        options: [
          { id: "A", text: "Ultraviolet rays" },
          { id: "B", text: "Infrared radiation" },
          { id: "C", text: "Cosmic rays" },
          { id: "D", text: "X-rays" },
        ],
        correctOption: "B",
        explanation: "The Earth reradiates energy at longer infrared wavelengths, which are absorbed by atmospheric greenhouse gases (CO₂, H₂O, CH₄) and reradiated back to Earth.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_12",
        question: "Welder's wear special goggles with face masks to protect their eyes from:",
        type: "standard",
        options: [
          { id: "A", text: "Infrared radiation" },
          { id: "B", text: "Ultraviolet radiation" },
          { id: "C", text: "Microwaves" },
          { id: "D", text: "Gamma rays" },
        ],
        correctOption: "B",
        explanation: "Electric welding arcs emit large amounts of harmful ultraviolet radiation that can cause severe cornea damage ('arc eye'). Specialized glass filters absorb UV rays.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_5_13",
        question: "Which of the following electromagnetic waves is produced by transitions of atomic nuclei?",
        type: "standard",
        options: [
          { id: "A", text: "X-rays" },
          { id: "B", text: "Gamma rays" },
          { id: "C", text: "Ultraviolet rays" },
          { id: "D", text: "Infrared rays" },
        ],
        correctOption: "B",
        explanation: "Gamma rays originate from de-excitation transitions within atomic nuclei. In contrast, X-rays originate from inner-shell atomic electron transitions or bremsstrahlung.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "Displacement Current", slug: "displacement-current" },
      ],
      relatedTopics: [
        { title: "Ray Optics and Optical Instruments", slug: "ray-optics-and-optical-instruments" },
      ],
      practiceTestId: "practice-physics-unit5-test2",
      practiceTestUrl: "/test/practice-physics-unit5-test2",
      weaknessReportUrl: "/dashboard/radar?subject=physics",
    },
    subjectSpecific: {
      physics: {
        unitDimensionTable: [
          { quantity: "Wavelength (λ)", dimension: "[L]", unit: "Meter (m) or Angstrom (Å)" },
          { quantity: "Frequency (ν)", dimension: "[T⁻¹]", unit: "Hertz (Hz)" },
        ],
      },
    },
    metadata: {
      confidence: "high",
      needsHumanReview: false,
      lastUpdated: new Date().toISOString(),
      version: 1,
      wordCount: 1540,
      isFreePreview: false,
    },
  },
];
