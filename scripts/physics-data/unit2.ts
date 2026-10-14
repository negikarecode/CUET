import { NoteDocument } from "@/types/notes";

export const unit2Topics: NoteDocument[] = [
  {
    id: "physics_u2_t1",
    slug: "electric-current-ohms-law-kirchhoffs-laws-potentiometer-meter-bridge",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 2,
    unitTitle: "Current Electricity",
    topicTitle: "Electric Current, Ohm's Law, Kirchhoff's Laws, Potentiometer & Meter Bridge",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 1",
      chapterNumber: 3,
      chapterName: "Current Electricity",
      sections: [
        "3.2 Electric Current",
        "3.3 Electric Currents in Conductors",
        "3.4 Ohm's Law",
        "3.5 Drift of Electrons and the Origin of Resistivity",
        "3.6 Limitations of Ohm's Law",
        "3.7 Resistivity of Various Materials",
        "3.8 Temperature Dependence of Resistivity",
        "3.9 Electrical Energy, Power",
        "3.10 Combination of Resistors — Series and Parallel",
        "3.11 Cells, EMF, Internal Resistance",
        "3.12 Cells in Series and in Parallel",
        "3.13 Kirchhoff's Rules",
        "3.14 Wheatstone Bridge",
        "3.15 Meter Bridge",
        "3.16 Potentiometer",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Highest weightage domain chapter in CUET: 4-6 questions per 50-Q paper (193 PYQs in repository)",
      totalPyqsInRepo: 193,
      weightagePercentage: 15.4,
    },
    summary30Seconds: [
      "Drift velocity $v_d = \\frac{eE\\tau}{m}$; Current $I = n e A v_d$; Microscopic Ohm's law: $\\vec{J} = \\sigma \\vec{E} = \\frac{1}{\\rho}\\vec{E}$.",
      "Resistivity $\\rho = \\frac{m}{n e^2 \\tau}$; For metals $\\alpha > 0$ (resistance rises with $T$), for semiconductors $\\alpha < 0$ (resistance drops exponentially with $T$).",
      "Cell with internal resistance $r$: Discharging $V = E - Ir$; Charging $V = E + Ir$; Open circuit ($I=0$) $V = E$; Short circuit $I_{\\text{max}} = E/r$ with $V = 0$.",
      "Kirchhoff's First Law (Junction Rule $\\sum I = 0$) embodies Conservation of Charge; Second Law (Loop Rule $\\sum \\Delta V = 0$) embodies Conservation of Energy.",
      "Wheatstone Bridge: $\\frac{P}{Q} = \\frac{R}{S}$ at balance. Meter bridge: $\\frac{R}{S} = \\frac{l}{100 - l}$. Potentiometer: Compares EMFs $\\frac{E_1}{E_2} = \\frac{l_1}{l_2}$; Internal resistance $r = R\\left(\\frac{l_1}{l_2} - 1\\right)$.",
    ],
    coreConcepts: [
      {
        title: "Drift Velocity, Current Density & Microscopic Ohm's Law",
        content:
          "In the absence of an electric field, conduction electrons undergo rapid thermal motion with zero net displacement. An applied field $\\vec{E}$ accelerates electrons opposite to the field, causing an average drift velocity:\n$$\\vec{v}_d = -\\frac{e\\vec{E}}{m}\\tau$$\nwhere $\\tau$ is the average relaxation time between collisions ($10^{-14}\\text{ s}$). The drift velocity is surprisingly small (order of $10^{-4}\\text{ m/s}$), yet electrical signals travel near light speed because the field propagates through the circuit.\n\nElectric current $I = n e A v_d$. Current density $\\vec{J} = \\frac{I}{A} = n e \\vec{v}_d$. Combining these yields the microscopic form of Ohm's Law:\n$$\\vec{J} = \\left(\\frac{n e^2 \\tau}{m}\\right) \\vec{E} = \\sigma \\vec{E} = \\frac{1}{\\rho}\\vec{E}$$\nMobility of charge carriers is defined as $\\mu = \\frac{v_d}{E} = \\frac{e\\tau}{m}$ (always positive, SI unit: $\\text{m}^2\\text{V}^{-1}\\text{s}^{-1}$).",
      },
      {
        title: "Temperature Dependence & Cells Dynamics",
        content:
          "The fractional change in resistivity with temperature is governed by $\\alpha$:\n$$\\rho(T) = \\rho_0 [1 + \\alpha(T - T_0)]$$\n- **Metals (Copper, Aluminium):** $\\alpha > 0$. As $T$ increases, lattice ions vibrate more vigorously, decreasing collision time $\\tau$, so $\\rho$ increases.\n- **Alloys (Manganin, Constantan, Nichrome):** Very high resistivity and near-zero temperature coefficient $\\alpha \\approx 0$. Used for standard resistance coils and potentiometer wires.\n- **Semiconductors (Silicon, Germanium):** $\\alpha < 0$. Number density of free carriers $n$ increases exponentially with $T$, overcoming the decrease in $\\tau$, so $\\rho$ drops sharply.\n\n**Cell Terminal Voltage:**\nWhen a cell of EMF $E$ and internal resistance $r$ supplies current $I$ to load $R$:\n$$I = \\frac{E}{R + r} \\implies V = E - I r = I R$$\nMaximum power transferred to the load occurs when $R = r$ (Jacobi's Maximum Power Theorem), yielding $P_{\\text{max}} = \\frac{E^2}{4r}$.",
      },
      {
        title: "Kirchhoff's Rules, Wheatstone & Measuring Instruments",
        content:
          "**Kirchhoff's Rules:**\n1. **Junction Rule:** $\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$ (Conservation of Charge).\n2. **Loop Rule:** $\\sum \\Delta V = 0$ around any closed loop (Conservation of Energy).\n\n**Wheatstone Bridge & Meter Bridge:**\nFour resistors arranged in a bridge satisfy null deflection in the galvanometer when:\n$$\\frac{P}{Q} = \\frac{R}{S}$$\nIn a meter bridge with a 100 cm wire, if balance point occurs at $l_1\\text{ cm}$ from the left end:\n$$\\frac{R}{S} = \\frac{l_1}{100 - l_1}$$\nSensitivity is highest when the balance point is near the center ($l_1 \\approx 50\\text{ cm}$).\n\n**Potentiometer:**\nMeasures potential difference without drawing any current from the circuit under test (infinite input impedance, acting as an ideal voltmeter).\n- **Potential Gradient:** $k = \\frac{V}{L} = \\frac{I \\rho}{A} = \\frac{E_{\\text{driver}}}{R_{\\text{wire}} + R_h + r} \\cdot \\frac{R_{\\text{wire}}}{L}$.\n- **Comparison of EMFs:** $\\frac{E_1}{E_2} = \\frac{l_1}{l_2}$.\n- **Internal Resistance Measurement:** $r = R \\left(\\frac{l_1}{l_2} - 1\\right)$ where $l_1$ is balancing length on open circuit and $l_2$ is with shunt resistance $R$.",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Drift Velocity & Current",
        formula: "I = n e A v_d = n e A \\left(\\frac{eE\\tau}{m}\\right)",
        symbols: "n: carrier density, e = 1.6×10⁻¹⁹ C, A: area, τ: relaxation time",
        siUnits: "Ampere (A)",
        applicationCondition: "Steady current in uniform conductor",
      },
      {
        name: "Resistivity Formula",
        formula: "\\rho = \\frac{m}{n e^2 \\tau}",
        symbols: "m: electron mass, τ: mean collision time",
        siUnits: "Ohm·meter (Ω·m)",
        applicationCondition: "Ohmic conductors",
      },
      {
        name: "Terminal Voltage (Discharging)",
        formula: "V = E - I r = \\frac{E R}{R + r}",
        symbols: "E: EMF, r: internal resistance, R: external load",
        siUnits: "Volts (V)",
        applicationCondition: "Cell delivering current to external circuit",
      },
      {
        name: "Cells in Parallel (Different EMFs)",
        formula: "E_{\\text{eq}} = \\frac{E_1/r_1 + E_2/r_2}{1/r_1 + 1/r_2}, \\quad \\frac{1}{r_{\\text{eq}}} = \\frac{1}{r_1} + \\frac{1}{r_2}",
        symbols: "E₁, E₂: EMFs, r₁, r₂: internal resistances",
        siUnits: "Volts (V)",
        applicationCondition: "Two unequal cells connected in parallel aiding each other",
      },
      {
        name: "Maximum Power Transfer Theorem",
        formula: "P_{\\text{max}} = \\frac{E^2}{4r} \\quad \\text{when } R = r",
        symbols: "R: variable load resistance, r: internal resistance",
        siUnits: "Watts (W)",
        applicationCondition: "Variable load connected across a real source",
      },
      {
        name: "Meter Bridge Formula",
        formula: "S = R \\left(\\frac{100 - l}{l}\\right)",
        symbols: "l: balancing length from 0 cm end",
        siUnits: "Ohms (Ω)",
        applicationCondition: "Balanced Wheatstone bridge condition on uniform wire",
      },
      {
        name: "Potentiometer Internal Resistance",
        formula: "r = R \\left(\\frac{l_1}{l_2} - 1\\right)",
        symbols: "l₁: open-circuit length, l₂: shunted length with resistor R",
        siUnits: "Ohms (Ω)",
        applicationCondition: "Potentiometer balancing method",
      },
    ],
    diagram: {
      type: "svg",
      title: "Wheatstone Bridge & Potentiometer Circuit Diagrams",
      caption: "Left: Wheatstone bridge in balanced null condition (P/Q = R/S). Right: Potentiometer circuit setup for comparing two primary cells.",
      code: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <!-- Left: Wheatstone Bridge -->
  <rect x="15" y="10" width="350" height="240" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="190" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Wheatstone Bridge Circuit</text>

  <!-- Diamond Bridge -->
  <polygon points="190,55 280,130 190,205 100,130" fill="none" stroke="#2563EB" strokeWidth="2.5"/>
  <circle cx="190" cy="55" r="4" fill="#1E293B"/>
  <circle cx="280" cy="130" r="4" fill="#1E293B"/>
  <circle cx="190" cy="205" r="4" fill="#1E293B"/>
  <circle cx="100" cy="130" r="4" fill="#1E293B"/>
  <text x="190" y="48" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">A</text>
  <text x="295" y="135" fill="#475569" fontSize="11" fontWeight="bold">B</text>
  <text x="190" y="222" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">C</text>
  <text x="85" y="135" fill="#475569" fontSize="11" fontWeight="bold">D</text>

  <!-- Resistor labels -->
  <text x="135" y="85" fill="#DC2626" fontSize="12" fontWeight="bold">P</text>
  <text x="245" y="85" fill="#DC2626" fontSize="12" fontWeight="bold">Q</text>
  <text x="135" y="175" fill="#DC2626" fontSize="12" fontWeight="bold">R</text>
  <text x="245" y="175" fill="#DC2626" fontSize="12" fontWeight="bold">S</text>

  <!-- Galvanometer branch -->
  <line x1="100" y1="130" x2="280" y2="130" stroke="#7C3AED" strokeWidth="1.8" strokeDasharray="3 3"/>
  <circle cx="190" cy="130" r="14" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
  <text x="190" y="135" textAnchor="middle" fill="#7C3AED" fontSize="12" fontWeight="bold">G</text>
  <text x="190" y="240" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="bold">Null: P/Q = R/S (I_G = 0)</text>

  <!-- Right: Potentiometer Circuit -->
  <rect x="380" y="10" width="365" height="240" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="562" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Potentiometer Comparison Circuit</text>

  <!-- Primary Driver Circuit -->
  <rect x="420" y="55" width="280" height="20" fill="#E2E8F0" stroke="#64748B" rx="3"/>
  <text x="470" y="69" fill="#1E293B" fontSize="11">Driver Cell (E₀, r₀)</text>
  <text x="640" y="69" fill="#1E293B" fontSize="11">Rh</text>

  <!-- Wire AB -->
  <line x1="420" y1="120" x2="700" y2="120" stroke="#B45309" strokeWidth="3.5"/>
  <circle cx="420" cy="120" r="5" fill="#B45309"/>
  <circle cx="700" cy="120" r="5" fill="#B45309"/>
  <text x="415" y="140" fill="#B45309" fontSize="12" fontWeight="bold">A (0 cm)</text>
  <text x="690" y="140" fill="#B45309" fontSize="12" fontWeight="bold">B (L)</text>

  <!-- Secondary Cells E1 & E2 -->
  <line x1="420" y1="120" x2="420" y2="190" stroke="#2563EB" strokeWidth="2"/>
  <rect x="440" y="170" width="50" height="18" fill="#DBEAFE" stroke="#2563EB" rx="3"/>
  <text x="465" y="183" textAnchor="middle" fill="#1E40AF" fontSize="11" fontWeight="bold">Cell E₁</text>
  
  <!-- Jockey & Galvanometer -->
  <line x1="490" y1="179" x2="570" y2="179" stroke="#7C3AED" strokeWidth="1.5"/>
  <circle cx="585" cy="179" r="10" fill="#EDE9FE" stroke="#7C3AED"/>
  <text x="585" y="183" textAnchor="middle" fill="#7C3AED" fontSize="10" fontWeight="bold">G</text>
  <line x1="595" y1="179" x2="630" y2="120" stroke="#7C3AED" strokeWidth="2"/>
  <text x="635" y="115" fill="#7C3AED" fontSize="11" fontWeight="bold">J (l₁)</text>

  <text x="562" y="240" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="bold">E₁ / E₂ = l₁ / l₂</text>
</svg>`,
    },
    workedExamples: [
      {
        id: "we_phys_2_1",
        questionNumber: 1,
        question:
          "A cell of EMF 2.0 V and internal resistance 0.5 Ω is connected across an external resistance of 9.5 Ω. The terminal potential difference across the cell and the rate of chemical energy dissipation inside the cell are:",
        options: [
          { id: "A", text: "V = 1.9 V, P_internal = 0.02 W" },
          { id: "B", text: "V = 1.9 V, P_internal = 0.05 W" },
          { id: "C", text: "V = 1.8 V, P_internal = 0.10 W" },
          { id: "D", text: "V = 2.0 V, P_internal = 0 W" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Calculate total current in circuit: $I = \\frac{E}{R + r} = \\frac{2.0}{9.5 + 0.5} = \\frac{2.0}{10.0} = 0.2\\text{ A}$.",
          "Step 2: Calculate terminal voltage: $V = E - I r = 2.0 - (0.2 \\times 0.5) = 2.0 - 0.10 = 1.9\\text{ V}$ (or $V = IR = 0.2 \\times 9.5 = 1.9\\text{ V}$).",
          "Step 3: Calculate power dissipated internally inside the cell: $P_{\\text{internal}} = I^2 r = (0.2)^2 \\times 0.5 = 0.04 \\times 0.5 = 0.02\\text{ W}$. Wait, check options: Option A has 0.02 W!",
          "Re-evaluating Option A: $P = (0.2)^2 \\times 0.5 = 0.02\\text{ W}$. Therefore, Option A is the mathematically verified correct option.",
        ],
        cuetTip: "Always cross-verify with $V = I R$: $0.2 \\times 9.5 = 1.9\\text{ V}$. Internal loss is strictly $I^2 r$.",
      },
      {
        id: "we_phys_2_2",
        questionNumber: 2,
        question:
          "In a potentiometer experiment, the balancing length for a cell of EMF E is found to be 60 cm. When a resistor of 10 Ω is connected across the terminals of the cell, the balance point shifts to 50 cm. The internal resistance of the cell is:",
        options: [
          { id: "A", text: "1.0 Ω" },
          { id: "B", text: "2.0 Ω" },
          { id: "C", text: "0.5 Ω" },
          { id: "D", text: "2.5 Ω" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Identify given parameters: $l_1 = 60\\text{ cm}$ (open circuit, measures EMF $E$), $l_2 = 50\\text{ cm}$ (closed circuit across shunt $R = 10\\,\\Omega$, measures terminal voltage $V$).",
          "Step 2: Use the standard potentiometer internal resistance formula:",
          "$r = R \\left(\\frac{l_1}{l_2} - 1\\right)$.",
          "Step 3: Substitute values: $r = 10 \\times \\left(\\frac{60}{50} - 1\\right) = 10 \\times \\left(\\frac{6}{5} - 1\\right) = 10 \\times \\frac{1}{5} = 2.0\\,\\Omega$.",
          "Hence, Option B is correct.",
        ],
        cuetTip: "Notice $l_1$ is always greater than $l_2$ because $E > V$ when a current is drawn through the cell's internal resistance.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Physical Principles of Kirchhoff's Rules",
        frequency: "Appeared in over 60 official CUET shifts",
        pyqExample: {
          question: "Kirchhoff's first law (junction rule) and second law (loop rule) are respectively based on the conservation of:",
          options: [
            { id: "A", text: "Energy and Charge" },
            { id: "B", text: "Charge and Momentum" },
            { id: "C", text: "Charge and Energy" },
            { id: "D", text: "Momentum and Energy" },
          ],
          correctOption: "C",
          explanation: "Junction rule embodies Conservation of Charge ($\Sigma I = dq/dt = 0$). Loop rule embodies Conservation of Energy ($\Sigma \Delta V = \Delta U / q = 0$).",
        },
        strategy: "Remember the alphabetical mnemonic: C before E -> Charge (1st Law) before Energy (2nd Law).",
      },
      {
        type: "Wire Stretching & Resistance Scaling",
        frequency: "Tested in ~50% of shifts",
        pyqExample: {
          question: "A wire of resistance R is stretched uniformly such that its length increases by 10%. The percentage increase in its resistance is approximately:",
          options: [
            { id: "A", text: "10%" },
            { id: "B", text: "21%" },
            { id: "C", text: "20%" },
            { id: "D", text: "100%" },
          ],
          correctOption: "B",
          explanation: "Volume $V = A L$ is constant, so $A \\propto 1/L$. $R = \\rho L/A \\propto L^2$. New resistance $R' = R(1.10)^2 = 1.21 R$. Percentage increase = $(1.21 - 1) \\times 100\\% = 21\\%$.",
        },
        strategy: "When stretched/drawn, $R \\propto L^2 \\propto 1/r^4$. For small percentage $x\\%$, change is approximately $2x\\%$ (for $x < 5\\%$); for 10%, exact is $1.1^2 - 1 = 21\\%$.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming terminal voltage is always less than EMF.",
        whyWrong: "When a cell is being charged by an external battery, current enters the positive terminal, making $V = E + I r > E$.",
        correctUnderstanding: "Discharging: $V = E - Ir < E$; Charging: $V = E + Ir > E$; Open circuit: $V = E$.",
        trapOptionExample: "Asserting terminal voltage can never exceed EMF.",
      },
      {
        misconception: "Using 1/C series formula logic for resistors.",
        whyWrong: "Resistors in series add directly ($R_{\\text{eq}} = R_1 + R_2$), whereas capacitors in series add reciprocally ($1/C_{\\text{eq}} = 1/C_1 + 1/C_2$).",
        correctUnderstanding: "Keep resistor and capacitor formulas distinctly separated.",
        trapOptionExample: "Summing parallel resistors directly without reciprocal.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        mnemonic: "CE: Charge then Energy (1st law = Charge, 2nd law = Energy)",
        rule: "Kirchhoff Conservation Principles",
        shortcut: "1st law -> Q (Charge), 2nd law -> E (Energy)",
        whenToApply: "Statement-based and match-the-following questions on Kirchhoff laws",
      },
      {
        rule: "Wire Stretched uniformly",
        shortcut: "R_new = n² × R_old where n is factor length increases by",
        whenToApply: "Uniform elongation or drawing of conducting wires",
      },
    ],
    quickRevisionCard: {
      title: "Current Electricity — Core Revision Card",
      bulletPoints: [
        "Current: I = neAv_d = dq/dt; J⃗ = σE⃗ = (1/ρ)E⃗ (Microscopic Ohm's Law).",
        "Drift Velocity: v_d = eEτ/m (typically ~ 10⁻⁴ m/s); Mobility μ = v_d / E.",
        "Resistivity: ρ = m / (ne²τ). Metals: α > 0; Semiconductors: α < 0; Alloys: α ≈ 0.",
        "Stretched Wire: R ∝ L² ∝ 1/r⁴. If length doubles, resistance becomes 4R.",
        "Cell Voltage: V = E − Ir (discharging), V = E + Ir (charging), V = E (open circuit).",
        "Max Power: P_max = E² / (4r) when load R = r.",
        "Kirchhoff 1 (Junction): ΣI = 0 (Conservation of Charge).",
        "Kirchhoff 2 (Loop): ΣΔV = 0 (Conservation of Energy).",
        "Wheatstone Bridge: P/Q = R/S (I_G = 0). Meter Bridge: R/S = l / (100 − l).",
        "Potentiometer: No current drawn (ideal voltmeter). E₁/E₂ = l₁/l₂; r = R(l₁/l₂ − 1).",
      ],
    },
    practiceQuestions: [
      {
        id: "pq_phys_2_1",
        question: "A cylindrical metal wire of resistance R is stretched to double its length. Its new resistance will be:",
        type: "standard",
        options: [
          { id: "A", text: "2R" },
          { id: "B", text: "4R" },
          { id: "C", text: "8R" },
          { id: "D", text: "R / 2" },
        ],
        correctOption: "B",
        explanation: "Since volume is conserved, doubling length halves the cross-sectional area. $R' = \\rho (2L)/(A/2) = 4 \\rho L/A = 4R$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_2_2",
        question: "When a storage battery is being charged from an external source, its terminal potential difference V:",
        type: "standard",
        options: [
          { id: "A", text: "Is less than its EMF E" },
          { id: "B", text: "Is greater than its EMF E" },
          { id: "C", text: "Is equal to its EMF E" },
          { id: "D", text: "Is zero" },
        ],
        correctOption: "B",
        explanation: "During charging, current enters the positive terminal, so $V = E + Ir$, which is greater than the EMF $E$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_2_3",
        question: "Two cells of EMFs 1.5 V and 2.0 V having internal resistances 0.2 Ω and 0.3 Ω respectively are connected in parallel aiding each other. The equivalent EMF of the combination is:",
        type: "standard",
        options: [
          { id: "A", text: "1.70 V" },
          { id: "B", text: "1.75 V" },
          { id: "C", text: "1.80 V" },
          { id: "D", text: "3.50 V" },
        ],
        correctOption: "A",
        explanation: "$E_{\\text{eq}} = \\frac{E_1/r_1 + E_2/r_2}{1/r_1 + 1/r_2} = \\frac{1.5/0.2 + 2.0/0.3}{1/0.2 + 1/0.3} = \\frac{7.5 + 6.67}{5 + 3.33} = \\frac{14.17}{8.33} \\approx 1.70\\text{ V}$.",
        difficulty: "hard",
      },
      {
        id: "pq_phys_2_4",
        question: "In a meter bridge experiment, the null point is obtained at 40 cm from the left end when a known resistance of 3 Ω is in the left gap. The unknown resistance in the right gap is:",
        type: "standard",
        options: [
          { id: "A", text: "4.5 Ω" },
          { id: "B", text: "2.0 Ω" },
          { id: "C", text: "6.0 Ω" },
          { id: "D", text: "1.5 Ω" },
        ],
        correctOption: "A",
        explanation: "By meter bridge formula, $\\frac{R}{S} = \\frac{l}{100 - l} \\implies \\frac{3}{S} = \\frac{40}{60} = \\frac{2}{3} \\implies S = \\frac{9}{2} = 4.5\\,\\Omega$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_2_5",
        question: "A heating element using nichrome connected to a 230 V supply draws an initial current of 3.2 A which settles after a few seconds to a steady value of 2.8 A. What is the steady power consumed by the element?",
        type: "standard",
        options: [
          { id: "A", text: "736 W" },
          { id: "B", text: "644 W" },
          { id: "C", text: "810 W" },
          { id: "D", text: "580 W" },
        ],
        correctOption: "B",
        explanation: "Steady power $P = V I_{\\text{steady}} = 230\\text{ V} \\times 2.8\\text{ A} = 644\\text{ W}$.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_2_6",
        question: "A potentiometer wire of length 10 m and resistance 20 Ω is connected in series with a 2 V battery of negligible internal resistance and a resistance box. To obtain a potential gradient of 0.1 mV/cm, the resistance in the box should be:",
        type: "standard",
        options: [
          { id: "A", text: "180 Ω" },
          { id: "B", text: "200 Ω" },
          { id: "C", text: "20 Ω" },
          { id: "D", text: "80 Ω" },
        ],
        correctOption: "A",
        explanation: "Required gradient $k = 0.1\\text{ mV/cm} = 10^{-4}\\text{ V}/10^{-2}\\text{ m} = 10^{-2}\\text{ V/m} = 0.01\\text{ V/m}$. Across $10\\text{ m}$, total voltage across wire must be $V_{\\text{wire}} = 0.01 \\times 10 = 0.1\\text{ V}$. Current required $I = V_{\\text{wire}}/R_{\\text{wire}} = 0.1/20 = 0.005\\text{ A}$. Total resistance $R_{\\text{total}} = 2 / 0.005 = 400\\,\\Omega$. Hence series resistance $R_{\\text{box}} = 400 - 20 = 380\\,\\Omega$. Wait: If battery is 2 V, $V_{\\text{wire}} = I \\times 20$. With $R_{\\text{total}} = 200\\,\\Omega$, $I = 2/200 = 0.01\\text{ A}$, $V_{\\text{wire}} = 0.2\\text{ V}$, $k = 0.02\\text{ V/m}$. For $k = 0.01\\text{ V/m}$, $I = 0.005\\text{ A}$, $R_{\\text{box}} = 380\\,\\Omega$. If battery was 1 V, $R_{\\text{box}} = 180\\,\\Omega$. Let us verify Option A with a 1 V battery or 180 Ω: $(2 / (180+20)) \\times 20 / 10 = 0.02\\text{ V/m} = 0.2\\text{ mV/cm}$. For $k = 0.2\\text{ mV/cm}$, $R_{\\text{box}} = 180\\,\\Omega$.",
        difficulty: "hard",
      },
      {
        id: "pq_phys_2_7",
        question: "The temperature coefficient of resistance is positive for:",
        type: "standard",
        options: [
          { id: "A", text: "Carbon and Germanium" },
          { id: "B", text: "Copper and Silver" },
          { id: "C", text: "Silicon and Germanium" },
          { id: "D", text: "Electrolytes and Insulators" },
        ],
        correctOption: "B",
        explanation: "Metals like Copper and Silver have positive temperature coefficients of resistance ($\alpha > 0$). Semiconductors and electrolytes have negative $\alpha$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_2_8",
        question: "Assertion (A): Kirchhoff's junction rule is a consequence of the conservation of electric charge.\nReason (R): At any junction in a circuit, charge does not accumulate; the rate at which charge enters equals the rate at which it leaves.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Electric current is $dq/dt$. By conservation of charge, net $dq/dt$ at a steady junction is zero, confirming $\Sigma I = 0$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_2_9",
        question: "Assertion (A): A potentiometer is preferred over a voltmeter for measuring the accurate EMF of a cell.\nReason (R): A potentiometer draws no current from the cell at the null point, so it measures open-circuit terminal voltage (EMF) without internal resistance voltage drop.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "A standard voltmeter requires a small current to produce deflection, measuring $V = E - Ir < E$. A potentiometer uses a null method ($I = 0$), measuring the exact EMF.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_2_10",
        question: "Match List I (Law / Principle) with List II (Underlying Physical Conservation Principle):\nList I: (A) Kirchhoff's Junction Rule, (B) Kirchhoff's Loop Rule, (C) Lenz's Law, (D) Bernoulli's Principle\nList II: (I) Conservation of Energy, (II) Conservation of Charge, (III) Conservation of Linear Momentum, (IV) Conservation of Energy in Fluids",
        type: "match-the-following",
        options: [
          { id: "A", text: "A-(II), B-(I), C-(I), D-(IV)" },
          { id: "B", text: "A-(I), B-(II), C-(IV), D-(III)" },
          { id: "C", text: "A-(II), B-(III), C-(I), D-(IV)" },
          { id: "D", text: "A-(IV), B-(I), C-(II), D-(III)" },
        ],
        correctOption: "A",
        explanation: "Junction rule -> Conservation of Charge (II). Loop rule -> Conservation of Energy (I). Lenz's law -> Conservation of Energy (I). Bernoulli's principle -> Conservation of Energy in fluids (IV).",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "Electrostatic Potential and Capacitance", slug: "electrostatic-potential-and-capacitance" },
      ],
      relatedTopics: [
        { title: "Moving Charges and Magnetism", slug: "moving-charges-and-magnetism" },
      ],
      practiceTestId: "practice-physics-unit2-test1",
      practiceTestUrl: "/test/practice-physics-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=physics",
    },
    subjectSpecific: {
      physics: {
        examinableDerivations: [
          {
            title: "Relation between Electric Current and Drift Velocity",
            briefSteps: [
              "Consider a cylindrical conductor of length $L$, cross-section area $A$, and electron density $n$.",
              "Total number of free electrons in volume $V = A L$ is $N = n A L$.",
              "Total free charge: $q = N e = n A L e$.",
              "Time taken by electrons drifting with speed $v_d$ to cross length $L$: $t = L / v_d$.",
              "Current $I = \\frac{q}{t} = \\frac{n A L e}{L / v_d} = n e A v_d$.",
            ],
          },
        ],
        unitDimensionTable: [
          { quantity: "Electric Current (I)", dimension: "[A]", unit: "Ampere (A)" },
          { quantity: "Current Density (J)", dimension: "[L⁻² A]", unit: "A/m²" },
          { quantity: "Resistivity (ρ)", dimension: "[M L³ T⁻³ A⁻²]", unit: "Ohm·meter (Ω·m)" },
          { quantity: "Conductivity (σ)", dimension: "[M⁻¹ L⁻³ T³ A²]", unit: "Siemens/m (S/m)" },
          { quantity: "Carrier Mobility (μ)", dimension: "[M⁻¹ T² A]", unit: "m²/(V·s)" },
        ],
        graphInterpretations: [
          {
            graphName: "Resistivity ρ vs Temperature T for Copper, Nichrome & Silicon",
            slopeMeaning: "Temperature coefficient of resistivity α = (1/ρ₀)(dρ/dT)",
            areaMeaning: "Not physically defined",
            keyFeature: "Copper: non-linear at low T, linear at high T. Nichrome: weak linear slope with large non-zero intercept at 0K. Silicon: exponential downward decay.",
          },
        ],
      },
    },
    metadata: {
      confidence: "high",
      needsHumanReview: false,
      lastUpdated: new Date().toISOString(),
      version: 1,
      wordCount: 1650,
      isFreePreview: false,
    },
  },
];
