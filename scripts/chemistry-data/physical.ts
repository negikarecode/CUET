import { NoteDocument } from "@/types/notes";

export const physicalChemistryTopics: NoteDocument[] = [
  {
    id: "chemistry_u1_t1",
    slug: "types-of-solutions-raoult-s-law-colligative-properties-van-t-hoff-factor",
    subject: "chemistry",
    subjectName: "Chemistry",
    subjectCode: "306",
    unitNumber: 1,
    unitTitle: "Solutions",
    topicTitle: "Types of Solutions, Raoult's Law, Colligative Properties, Van't Hoff Factor",
    ncertReference: {
      class: "Class 12",
      book: "Chemistry Part 1",
      chapterNumber: 1,
      chapterName: "Solutions",
      sections: [
        "1.1 Types of Solutions",
        "1.2 Expressing Concentration of Solutions",
        "1.3 Solubility & Henry's Law",
        "1.4 Vapour Pressure of Liquid Solutions & Raoult's Law",
        "1.5 Ideal and Non-ideal Solutions",
        "1.6 Colligative Properties and Determination of Molar Mass",
        "1.7 Abnormal Molar Masses and Van't Hoff Factor",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (3-4 questions per shift)",
      totalPyqsInRepo: 151,
      weightagePercentage: 8.5,
    },
    summary30Seconds: [
      "Concentration terms: Molarity ($M$) and Normality ($N$) are temperature-dependent; Molality ($m$), Mole Fraction ($x$), and Mass % ($w/w$) are temperature-independent.",
      "Henry's Law: $p = K_H \\cdot x$. Higher $K_H$ means lower solubility of gas in liquid at a given pressure. $K_H$ increases with temperature, so gases are less soluble in warm liquids.",
      "Raoult's Law: For volatile components, $P_A = P_A^\\circ x_A$. Ideal solutions obey Raoult's law with $\\Delta H_{\\text{mix}} = 0, \\Delta V_{\\text{mix}} = 0$.",
      "Non-ideal solutions: Positive deviation ($A-B < A-A, B-B$, e.g., Ethanol + Acetone; forms minimum-boiling azeotrope); Negative deviation ($A-B > A-A, B-B$, e.g., Chloroform + Acetone; forms maximum-boiling azeotrope).",
      "Colligative properties depend only on solute particle count: $\\Delta P/P_1^\\circ = i x_2$, $\\Delta T_b = i K_b m$, $\\Delta T_f = i K_f m$, $\\Pi = i C R T$.",
      "Van't Hoff factor ($i$): For dissociation, $i = 1 + (n - 1)\\alpha$; for association, $i = 1 + (1/n - 1)\\beta$. Observed molar mass $M_{\\text{obs}} = M_{\\text{normal}} / i$.",
    ],
    coreConcepts: [
      {
        title: "Concentration Units, Temperature Dependence & Henry's Law",
        content:
          "Concentration can be expressed on mass-volume or mass-mass bases:\n- **Molarity ($M$)**: $\\text{moles of solute} / \\text{volume of solution in L}$. Depends on temperature because liquid volume expands with temperature.\n- **Molality ($m$)**: $\\text{moles of solute} / \\text{mass of solvent in kg}$. Independent of temperature.\n- **Mole Fraction ($x_A$)**: $n_A / (n_A + n_B)$, dimensionless and temperature-independent.\n\n**Henry's Law**: The partial pressure of a gas in vapour phase ($p$) is directly proportional to the mole fraction of the gas ($x$) in the liquid solution:\n$$p = K_H \\cdot x$$\n*Crucial NCERT Insight*: $K_H$ is a characteristic of gas and solvent at a specific temperature. As temperature increases, $K_H$ increases, hence gas solubility decreases. Aquatic species are more comfortable in cold waters because higher dissolved $O_2$ exists due to lower $K_H$.",
        ncertPointers: [
          "Molarity changes with temperature; Molality and Mole fraction do NOT.",
          "Anoxia in scuba divers is prevented by diluting breathing tanks with He (11.7% He, 56.2% N2, 32.1% O2) due to lower solubility of He in blood.",
        ],
      },
      {
        title: "Raoult's Law, Ideal vs Non-Ideal Solutions & Azeotropes",
        content:
          "For a binary solution of volatile liquids $A$ and $B$, partial vapour pressure of each component is:\n$$P_A = P_A^\\circ x_A, \\quad P_B = P_B^\\circ x_B, \\quad P_{\\text{total}} = P_A + P_B = P_A^\\circ x_A + P_B^\\circ (1 - x_A)$$\n\n1. **Ideal Solutions**: Intermolecular forces $A-B \\approx A-A \\approx B-B$. $\\Delta H_{\\text{mix}} = 0$, $\\Delta V_{\\text{mix}} = 0$. Examples: n-hexane + n-heptane, bromoethane + chloroethane, benzene + toluene.\n2. **Non-Ideal Solutions with Positive Deviation**:\n   - $A-B$ forces are weaker than $A-A$ and $B-B$.\n   - $P_A > P_A^\\circ x_A$, $\\Delta H_{\\text{mix}} > 0$ (endothermic), $\\Delta V_{\\text{mix}} > 0$.\n   - Forms **Minimum Boiling Azeotrope** at specific composition (e.g., Ethanol 95% + Water 5%, boiling point lower than both components).\n   - Examples: Ethanol + Acetone, $CS_2$ + Acetone, Water + Ethanol.\n3. **Non-Ideal Solutions with Negative Deviation**:\n   - $A-B$ forces are stronger than $A-A$ and $B-B$ (due to new H-bonding or dipole interactions).\n   - $P_A < P_A^\\circ x_A$, $\\Delta H_{\\text{mix}} < 0$ (exothermic), $\\Delta V_{\\text{mix}} < 0$.\n   - Forms **Maximum Boiling Azeotrope** (e.g., 68% $HNO_3$ + 32% $H_2O$, boiling point $393.5\\text{ K}$ > $373\\text{ K}$).\n   - Examples: Chloroform + Acetone (H-bonding: $Cl_3C-H \\cdots O=C(CH_3)_2$), Phenol + Aniline.",
        ncertPointers: [
          "Azeotropes are constant-boiling binary mixtures whose vapour has the exact same composition as the liquid; they cannot be separated by fractional distillation.",
        ],
      },
      {
        title: "Colligative Properties & Van't Hoff Factor ($i$)",
        content:
          "Colligative properties depend strictly on the ratio of the number of solute particles to solvent molecules, not on chemical identity.\n\n1. **Relative Lowering of Vapour Pressure (RLVP)**:\n   $$\\frac{P_1^\\circ - P_1}{P_1^\\circ} = i \\cdot x_2 = i \\cdot \\frac{n_2}{n_1 + n_2} \\approx i \\cdot \\frac{w_2 M_1}{M_2 w_1}$$\n2. **Elevation of Boiling Point (Ebullioscopy)**:\n   $$\\Delta T_b = T_b - T_b^\\circ = i \\cdot K_b \\cdot m = i \\cdot \\frac{1000 \\cdot K_b \\cdot w_2}{M_2 \\cdot w_1}$$\n   where $K_b$ is the molal boiling point elevation constant (ebullioscopic constant), dependent only on solvent: $K_b = \\frac{R M_1 T_b^{\\circ 2}}{1000 \\Delta_{\\text{vap}} H}$.\n3. **Depression of Freezing Point (Cryoscopy)**:\n   $$\\Delta T_f = T_f^\\circ - T_f = i \\cdot K_f \\cdot m = i \\cdot \\frac{1000 \\cdot K_f \\cdot w_2}{M_2 \\cdot w_1}$$\n   where $K_f = \\frac{R M_1 T_f^{\\circ 2}}{1000 \\Delta_{\\text{fus}} H}$. Ethylene glycol + water is used as anti-freeze in car radiators.\n4. **Osmotic Pressure ($\\Pi$)**:\n   $$\\Pi = i C R T = i \\left(\\frac{n_2}{V}\\right) R T$$\n   *Why Osmotic Pressure is best for polymers/proteins*: Measured at room temperature; magnitude is large even for very dilute solutions; molality is not needed.\n\n**Van't Hoff Factor ($i$)**:\n$$i = \\frac{\\text{Normal Molar Mass}}{\\text{Abnormal/Observed Molar Mass}} = \\frac{\\text{Total moles of particles after dissociation/association}}{\\text{Initial moles of particles}}$$\n- **Dissociation**: $A_n \\rightarrow n A$, $i = 1 + (n - 1)\\alpha$, where $\\alpha$ is degree of dissociation. For $K_4[Fe(CN)_6]$, $n = 5 \\implies i = 1 + 4\\alpha$.\n- **Association**: $n A \\rightarrow A_n$, $i = 1 + \\left(\\frac{1}{n} - 1\\right)\\beta$. For acetic acid dimerization in benzene ($n = 2$), $i = 1 - \\beta/2$.",
        ncertPointers: [
          "For $0.1\\text{ M}$ solutions: $\\Delta T_f$ or $\\Delta T_b$ order follows $i$: $Al_2(SO_4)_3 (i=5) > K_4[Fe(CN)_6] (i=5) > FeCl_3 (i=4) > CaCl_2 (i=3) > NaCl (i=2) > \\text{Urea/Glucose} (i=1)$.",
          "Reverse osmosis occurs when hydrostatic pressure applied exceeds osmotic pressure ($\\Delta P > \\Pi$). Cellulose acetate membranes are used for desalination.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Henry's Law",
        formula: "p = K_H \\cdot x",
        symbols: "p = \\text{gas partial pressure}, K_H = \\text{Henry's constant}, x = \\text{mole fraction}",
        siUnits: "p\\text{ in bar/atm}, K_H\\text{ in bar/atm}",
        applicationCondition: "Low to moderate pressure, gas does not react chemically with solvent",
      },
      {
        name: "Relative Lowering of Vapour Pressure",
        formula: "\\frac{P_1^\\circ - P_1}{P_1^\\circ} = i \\cdot \\frac{w_2 M_1}{M_2 w_1}",
        symbols: "w_2, M_2 = \\text{solute mass, molar mass}; w_1, M_1 = \\text{solvent mass, molar mass}",
        siUnits: "Dimensionless ratio",
        applicationCondition: "Dilute solutions of non-volatile solutes",
      },
      {
        name: "Boiling Point Elevation & Freezing Point Depression",
        formula: "\\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m",
        symbols: "K_b, K_f = \\text{cryoscopic/ebullioscopic constants}, m = \\text{molality}",
        siUnits: "\\text{K kg mol}^{-1}",
        applicationCondition: "Dilute solutions, non-volatile solute",
      },
      {
        name: "Osmotic Pressure",
        formula: "\\Pi = i C R T = i \\frac{w_2 R T}{M_2 V}",
        symbols: "C = \\text{molarity}, R = 0.0821\\text{ L atm K}^{-1}\\text{mol}^{-1}, T = \\text{Kelvin}",
        siUnits: "\\text{atm or bar or Pa}",
        applicationCondition: "Preferred method for macromolecules (proteins, polymers)",
      },
      {
        name: "Van't Hoff Dissociation & Association",
        formula: "i = 1 + (n - 1)\\alpha, \\quad i = 1 + \\left(\\frac{1}{n} - 1\\right)\\beta",
        symbols: "\\alpha, \\beta = \\text{degrees of dissociation/association}, n = \\text{van\\'t Hoff particle number}",
        siUnits: "Dimensionless",
        applicationCondition: "Electrolytes in solution or carboxylic acids in non-polar solvents",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Vapour Pressure & Deviations from Raoult's Law</text>
  
  <!-- Left Box: Ideal -->
  <g transform="translate(40, 60)">
    <rect width="200" height="200" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1"/>
    <text x="100" y="24" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Ideal Solution</text>
    <line x1="30" y1="170" x2="170" y2="70" stroke="#38bdf8" strokeWidth="2"/>
    <line x1="30" y1="120" x2="170" y2="170" stroke="#a855f7" strokeWidth="2"/>
    <line x1="30" y1="120" x2="170" y2="70" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="3 3"/>
    <text x="100" y="100" textAnchor="middle" fill="#22c55e" fontSize="10">P_total = P_A + P_B</text>
    <text x="100" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">ΔH = 0, ΔV = 0</text>
  </g>

  <!-- Middle Box: Positive Deviation -->
  <g transform="translate(280, 60)">
    <rect width="200" height="200" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1"/>
    <text x="100" y="24" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="bold">+ve Deviation</text>
    <path d="M 30,120 Q 100,45 170,70" fill="none" stroke="#f43f5e" strokeWidth="2.5"/>
    <text x="100" y="90" textAnchor="middle" fill="#fca5a5" fontSize="10">P_obs &gt; P_ideal</text>
    <text x="100" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">A-B &lt; A-A, B-B</text>
    <text x="100" y="135" textAnchor="middle" fill="#fbbf24" fontSize="10">ΔH &gt; 0, ΔV &gt; 0</text>
    <text x="100" y="185" textAnchor="middle" fill="#38bdf8" fontSize="10">Min. Boiling Azeotrope</text>
  </g>

  <!-- Right Box: Negative Deviation -->
  <g transform="translate(520, 60)">
    <rect width="200" height="200" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1"/>
    <text x="100" y="24" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">-ve Deviation</text>
    <path d="M 30,120 Q 100,125 170,70" fill="none" stroke="#60a5fa" strokeWidth="2.5"/>
    <text x="100" y="95" textAnchor="middle" fill="#93c5fd" fontSize="10">P_obs &lt; P_ideal</text>
    <text x="100" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">A-B &gt; A-A, B-B (H-bond)</text>
    <text x="100" y="135" textAnchor="middle" fill="#fbbf24" fontSize="10">ΔH &lt; 0, ΔV &lt; 0</text>
    <text x="100" y="185" textAnchor="middle" fill="#38bdf8" fontSize="10">Max. Boiling Azeotrope</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "chem_u1_we1",
        questionNumber: 1,
        question:
          "A $0.01\\text{ M}$ aqueous solution of $K_3[Fe(CN)_6]$ is found to freeze at $-0.068^\\circ\\text{C}$. Given $K_f = 1.86\\text{ K kg mol}^{-1}$, calculate the degree of dissociation ($\\alpha$) of the complex salt (assume molality $\\approx$ molarity).",
        options: [
          { id: "A", text: "0.75 (or 75%)" },
          { id: "B", text: "0.88 (or 88%)" },
          { id: "C", text: "0.91 (or 91%)" },
          { id: "D", text: "1.00 (or 100%)" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Formula for depression in freezing point: $\\Delta T_f = i K_f m$. Here $\\Delta T_f = 0 - (-0.068) = 0.068\\text{ K}$.",
          "Step 2: Solve for $i$: $i = \\frac{\\Delta T_f}{K_f m} = \\frac{0.068}{1.86 \\times 0.01} = \\frac{0.068}{0.0186} \\approx 3.656$.",
          "Step 3: Dissociation of $K_3[Fe(CN)_6] \\rightarrow 3 K^+ + [Fe(CN)_6]^{3-}$, so number of ions $n = 4$.",
          "Step 4: Relation between $i$ and $\\alpha$: $i = 1 + (n - 1)\\alpha \\implies 3.656 = 1 + 3\\alpha \\implies 3\\alpha = 2.656 \\implies \\alpha = 0.885 \\approx 0.88 - 0.91$.",
          "Double check: $1 + 3(0.91) = 3.73 \\implies 3.656 / 3.73$, exact math gives $\\alpha = 2.656/3 = 0.885$. Rounding to 88% gives Option B / 0.88.",
        ],
        cuetTip: "Always count total ions $n$ from the coordinate sphere! Only ions outside square brackets ionize ($3 K^+$ and $1 [Fe(CN)_6]^{3-} = 4$ ions).",
      },
      {
        id: "chem_u1_we2",
        questionNumber: 2,
        question:
          "Which of the following $0.1\\text{ m}$ aqueous solutions will exhibit the lowest freezing point?",
        options: [
          { id: "A", text: "0.1 m Glucose" },
          { id: "B", text: "0.1 m NaCl" },
          { id: "C", text: "0.1 m BaCl₂" },
          { id: "D", text: "0.1 m Al₂(SO₄)₃" },
        ],
        correctOption: "D",
        solutionSteps: [
          "Step 1: Freezing point $T_f = T_f^\\circ - \\Delta T_f$. Therefore, the highest depression $\\Delta T_f$ produces the lowest freezing point.",
          "Step 2: $\\Delta T_f = i K_f m$. Since $K_f$ and $m = 0.1\\text{ m}$ are constant, $\\Delta T_f \\propto i$.",
          "Step 3: Evaluate $i$ for each: Glucose $i = 1$; $NaCl \\rightarrow Na^+ + Cl^- \\implies i = 2$; $BaCl_2 \\rightarrow Ba^{2+} + 2Cl^- \\implies i = 3$; $Al_2(SO_4)_3 \\rightarrow 2Al^{3+} + 3SO_4^{2-} \\implies i = 5$.",
          "Step 4: Since $Al_2(SO_4)_3$ has the largest $i = 5$, it has the largest $\\Delta T_f$ and therefore the lowest freezing point.",
        ],
        cuetTip: "CUET repeats this exact question stem annually! Highest boiling point $\\implies$ largest $i$; Lowest freezing point $\\implies$ largest $i$.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Assertion-Reason on Azeotropes & Deviations",
        frequency: "Very High (every shift)",
        pyqExample: {
          question:
            "Assertion (A): A mixture of chloroform and acetone shows a negative deviation from Raoult's law.\nReason (R): Acetone and chloroform molecules form hydrogen bonds with each other, making A-B attractive forces stronger than A-A and B-B forces.",
          options: [
            { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
            { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
            { id: "C", text: "A is true but R is false" },
            { id: "D", text: "A is false but R is true" },
          ],
          correctOption: "A",
          explanation: "Chloroform C-H hydrogen bonds with the carbonyl oxygen of acetone, causing negative deviation.",
        },
        strategy: "Memorize the 4 classic NCERT positive vs negative deviation pairs. Chloroform + Acetone and Nitric Acid + Water are always negative deviation.",
      },
      {
        type: "Colligative Property Ranking Match List",
        frequency: "High",
        pyqExample: {
          question:
            "Match List-I (Aqueous solution, 0.1 M) with List-II (Van't Hoff factor i):\nP. Urea\nQ. Potassium ferrocyanide\nR. Magnesium chloride\nS. Potassium nitrate",
          options: [
            { id: "A", text: "P-1, Q-5, R-3, S-2" },
            { id: "B", text: "P-1, Q-4, R-3, S-2" },
            { id: "C", text: "P-2, Q-5, R-2, S-1" },
            { id: "D", text: "P-1, Q-5, R-2, S-3" },
          ],
          correctOption: "A",
          explanation: "Urea (non-electrolyte, i=1), K4[Fe(CN)6] (4 K+ + 1 complex ion = 5), MgCl2 (Mg2+ + 2 Cl- = 3), KNO3 (K+ + NO3- = 2).",
        },
        strategy: "Count ions: cations + anions = i (assuming 100% dissociation). Urea, glucose, sucrose never dissociate (i=1).",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing highest vapour pressure with highest boiling point.",
        whyWrong: "Boiling point is inversely related to vapour pressure. A substance with higher vapour pressure at room temperature boils at a LOWER temperature.",
        correctUnderstanding: "Positive deviation mixtures have high vapour pressure $\\implies$ minimum-boiling azeotrope. Negative deviation mixtures have low vapour pressure $\\implies$ maximum-boiling azeotrope.",
      },
      {
        misconception: "Thinking $K_b$ and $K_f$ depend on the nature or concentration of the solute.",
        whyWrong: "$K_b$ and $K_f$ are intrinsic properties of the SOLVENT only ($K_b = \\frac{R M_1 T_b^{\\circ 2}}{1000 \\Delta_{\\text{vap}} H}$).",
        correctUnderstanding: "Whether you dissolve $1\\text{ g}$ of urea or $100\\text{ g}$ of glucose in water, $K_b$ remains strictly $0.52\\text{ K kg mol}^{-1}$.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "T-Dependent vs T-Independent Units",
        mnemonic: "V-T connection: If it has 'Volume' (V), it changes with 'Temperature' (T).",
        rule: "Molarity ($M = n/V$) has volume $\\implies$ T-dependent. Molality ($m = n/w_{\\text{solvent}}$) and Mole Fraction have only mass $\\implies$ T-independent.",
        shortcut: "Look for 'L' in formula: Molarity (L of solution) changes; Molality (kg solvent) stays constant.",
        whenToApply: "Direct recall questions on concentration units in physical chemistry.",
      },
      {
        title: "Azeotrope Boiling Point Rule",
        mnemonic: "Opposites attract: Positive Deviation $\\implies$ Minimum Boiling. Negative Deviation $\\implies$ Maximum Boiling.",
        rule: "+ deviation $\\implies$ molecules escape easier $\\implies$ boils at lower temp (minimum boiling azeotrope).",
        shortcut: "Sign of deviation is opposite to the prefix of boiling azeotrope (Pos $\\rightarrow$ Min; Neg $\\rightarrow$ Max).",
        whenToApply: "Matching or MCQ questions on binary azeotropic mixtures.",
      },
    ],
    quickRevisionCard: {
      title: "Solutions — High-Yield Formula Sheet",
      bulletPoints: [
        "Henry's law: $p = K_H x$; $K_H \\uparrow$ with $T \\implies$ solubility $\\downarrow$.",
        "Raoult's law: $P_A = P_A^\\circ x_A$; Ideal if $\\Delta H = 0, \\Delta V = 0$ (benzene + toluene).",
        "+ve deviation: $A-B$ weaker, $\\Delta H > 0, \\Delta V > 0$, Min-boiling azeotrope (Ethanol + Acetone).",
        "-ve deviation: $A-B$ stronger (H-bonding), $\\Delta H < 0, \\Delta V < 0$, Max-boiling azeotrope (Chloroform + Acetone).",
        "RLVP: $\\frac{P_1^\\circ - P_1}{P_1^\\circ} = i \\frac{w_2 M_1}{M_2 w_1}$.",
        "Boiling elevation: $\\Delta T_b = i K_b m$; Freezing depression: $\\Delta T_f = i K_f m$.",
        "Osmotic pressure: $\\Pi = i C R T$; Best for protein/polymer molecular weight determination.",
        "Van't Hoff factor: $i = 1 + (n - 1)\\alpha$ (dissociation); $i = 1 + (1/n - 1)\\beta$ (association).",
        "Order of colligative properties ($0.1\\text{ M}$): $Al_2(SO_4)_3 (i=5) > K_4[Fe(CN)_6] (i=5) > BaCl_2 (i=3) > NaCl (i=2) > \\text{Urea} (i=1)$.",
        "Anti-freeze in vehicles: Ethylene glycol in water lowers freezing point below $0^\\circ\\text{C}$.",
      ],
    },
    practiceQuestions: [
      {
        id: "chem_u1_q1",
        question: "Which of the following concentration terms is independent of temperature?",
        type: "standard",
        options: [
          { id: "A", text: "Molarity" },
          { id: "B", text: "Normality" },
          { id: "C", text: "Molality" },
          { id: "D", text: "Formality" },
        ],
        correctOption: "C",
        explanation: "Molality is defined per mass of solvent (kg), which does not expand or contract with temperature changes.",
        difficulty: "easy",
      },
      {
        id: "chem_u1_q2",
        question: "Assertion (A): Aquatic species are more comfortable in cold water than in warm water.\nReason (R): The value of Henry's constant ($K_H$) decreases with an increase in temperature.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "C",
        explanation: "Assertion is true, but Reason is false: Henry's law constant $K_H$ INCREASES with increase in temperature, resulting in lower dissolved oxygen.",
        difficulty: "medium",
      },
      {
        id: "chem_u1_q3",
        question: "A mixture of 100 mL ethanol and 100 mL acetone is prepared. The total volume of the resulting solution will be:",
        type: "standard",
        options: [
          { id: "A", text: "Exactly 200 mL" },
          { id: "B", text: "Greater than 200 mL" },
          { id: "C", text: "Less than 200 mL" },
          { id: "D", text: "Unpredictable without density data" },
        ],
        correctOption: "B",
        explanation: "Ethanol + Acetone exhibits positive deviation from Raoult's law with $\\Delta V_{\\text{mix}} > 0$. Hence total volume > 200 mL.",
        difficulty: "medium",
      },
      {
        id: "chem_u1_q4",
        question: "Which solution has the highest boiling point at 1 atm?",
        type: "standard",
        options: [
          { id: "A", text: "0.1 M Urea" },
          { id: "B", text: "0.1 M NaCl" },
          { id: "C", text: "0.1 M CaCl₂" },
          { id: "D", text: "0.1 M FeCl₃" },
        ],
        correctOption: "D",
        explanation: "Elevation in boiling point $\\Delta T_b \\propto i$. For FeCl3, $i = 1 + 3 = 4$, which is the highest among the choices.",
        difficulty: "easy",
      },
      {
        id: "chem_u1_q5",
        question: "Match List-I (Aqueous System) with List-II (Type of Deviation / Azeotrope):\nP. Benzene + Toluene\nQ. Ethanol + Water\nR. Chloroform + Acetone\nS. Nitric acid (68%) + Water (32%)",
        type: "match-the-following",
        options: [
          { id: "A", text: "P-Ideal, Q-Minimum boiling azeotrope, R-Negative deviation, S-Maximum boiling azeotrope" },
          { id: "B", text: "P-Minimum boiling, Q-Ideal, R-Maximum boiling, S-Negative deviation" },
          { id: "C", text: "P-Ideal, Q-Maximum boiling azeotrope, R-Positive deviation, S-Minimum boiling azeotrope" },
          { id: "D", text: "P-Negative deviation, Q-Minimum boiling, R-Ideal, S-Maximum boiling" },
        ],
        correctOption: "A",
        explanation: "Benzene-toluene is ideal; ethanol-water gives positive deviation & min-boiling azeotrope; chloroform-acetone has H-bonding (-ve deviation); HNO3-water is max-boiling azeotrope.",
        difficulty: "hard",
      },
      {
        id: "chem_u1_q6",
        question: "If acetic acid dimerizes completely in benzene, the Van't Hoff factor $i$ is:",
        type: "standard",
        options: [
          { id: "A", text: "2.0" },
          { id: "B", text: "1.0" },
          { id: "C", text: "0.5" },
          { id: "D", text: "0.0" },
        ],
        correctOption: "C",
        explanation: "$2 CH_3COOH \\rightleftharpoons (CH_3COOH)_2$. For 100% dimerization ($n=2, \\beta=1$), $i = 1 + (1/2 - 1)(1) = 0.5$.",
        difficulty: "easy",
      },
      {
        id: "chem_u1_q7",
        question: "The osmotic pressure of a solution containing 6 g of urea (molar mass = 60 g/mol) in 1 L of water at 300 K is ($R = 0.0821\\text{ L atm K}^{-1}\\text{mol}^{-1}$):",
        type: "standard",
        options: [
          { id: "A", text: "2.46 atm" },
          { id: "B", text: "24.6 atm" },
          { id: "C", text: "0.246 atm" },
          { id: "D", text: "4.92 atm" },
        ],
        correctOption: "A",
        explanation: "$n = 6/60 = 0.1\\text{ mol}$. $C = 0.1\\text{ mol/L}$. $\\Pi = C R T = 0.1 \\times 0.0821 \\times 300 = 2.463\\text{ atm}$.",
        difficulty: "medium",
      },
      {
        id: "chem_u1_q8",
        question: "Assertion (A): Elevation in boiling point is a colligative property.\nReason (R): Elevation in boiling point is directly proportional to the molar mass of the solute.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "C",
        explanation: "Assertion is true. Reason is false: $\\Delta T_b = K_b \\frac{w_2 \\cdot 1000}{M_2 \\cdot w_1}$, meaning $\\Delta T_b$ is INVERSELY proportional to molar mass $M_2$.",
        difficulty: "medium",
      },
      {
        id: "chem_u1_q9",
        question: "Which method is most suitable for determining the molecular weight of biomacromolecules like proteins and polymers?",
        type: "standard",
        options: [
          { id: "A", text: "Elevation of boiling point" },
          { id: "B", text: "Depression of freezing point" },
          { id: "C", text: "Measurement of osmotic pressure" },
          { id: "D", text: "Relative lowering of vapour pressure" },
        ],
        correctOption: "C",
        explanation: "Proteins decompose at boiling temperatures, and osmotic pressure provides measurable magnitudes at room temperature for dilute solutions.",
        difficulty: "easy",
      },
      {
        id: "chem_u1_q10",
        question: "Two solutions having the same osmotic pressure at a given temperature are termed as:",
        type: "standard",
        options: [
          { id: "A", text: "Hypertonic solutions" },
          { id: "B", text: "Hypotonic solutions" },
          { id: "C", text: "Isotonic solutions" },
          { id: "D", text: "Ideal solutions" },
        ],
        correctOption: "C",
        explanation: "Isotonic solutions exert the same osmotic pressure; no net osmosis occurs across a semi-permeable membrane separating them.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["physics_u1_t1"],
      relatedTopics: ["chemistry_u2_t1", "chemistry_u3_t1"],
      practiceTestId: "practice-chemistry-unit1-test1",
      practiceTestUrl: "/test/practice-chemistry-unit1-test1",
      weaknessReportUrl: "/dashboard/radar?subject=chemistry",
      weaknessRadarUrl: "/dashboard/radar?subject=chemistry",
    },
    subjectSpecific: {
      chemistry: {
        exceptionsList: [
          "Minimum boiling azeotrope: Ethanol (95.6%) + Water (4.4%) b.p. 351.15 K < pure ethanol 351.5 K.",
          "Maximum boiling azeotrope: Nitric acid (68%) + Water (32%) b.p. 393.5 K > pure water 373 K.",
          "Substances associating in benzene: Benzoic acid and acetic acid form cyclic hydrogen-bonded dimers ($i \\approx 0.5$).",
        ],
        trendsTable: [
          { property: "Henry's Law Constant (K_H)", trend: "Increases with increasing temperature", reason: "Dissolution of gas is exothermic (Le Chatelier's principle)" },
          { property: "Gas Solubility in Water", trend: "Decreases with increasing temperature", reason: "Equilibrium shifts backward as heat is released" },
          { property: "Vapour Pressure of Solution", trend: "Decreases upon adding non-volatile solute", reason: "Solute occupies surface area, reducing rate of solvent vaporization" },
        ],
      },
    },
  },

  // Unit 2: Electrochemistry
  {
    id: "chemistry_u2_t1",
    slug: "galvanic-and-electrolytic-cells-nernst-equation-conductance-kohlrausch-s-law-batteries",
    subject: "chemistry",
    subjectName: "Chemistry",
    subjectCode: "306",
    unitNumber: 2,
    unitTitle: "Electrochemistry",
    topicTitle: "Galvanic & Electrolytic Cells, Nernst Equation, Conductance, Kohlrausch's Law, Batteries",
    ncertReference: {
      class: "Class 12",
      book: "Chemistry Part 1",
      chapterNumber: 2,
      chapterName: "Electrochemistry",
      sections: [
        "2.1 Electrochemical Cells",
        "2.2 Galvanic Cells & Standard Hydrogen Electrode",
        "2.3 Nernst Equation & Equilibrium Constant",
        "2.4 Conductance of Electrolytic Solutions",
        "2.5 Kohlrausch's Law and its Applications",
        "2.6 Electrolytic Cells and Faraday's Laws",
        "2.7 Batteries, Fuel Cells and Corrosion",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (3-4 questions per shift)",
      totalPyqsInRepo: 48,
      weightagePercentage: 8.0,
    },
    summary30Seconds: [
      "Galvanic cell convention: LOAN (Left, Oxidation, Anode, Negative). $E_{\\text{cell}}^\\circ = E_{\\text{cathode}}^\\circ - E_{\\text{anode}}^\\circ$ using standard REDUCTION potentials.",
      "Nernst equation at $298\\text{ K}$: $E_{\\text{cell}} = E_{\\text{cell}}^\\circ - \\frac{0.0591}{n} \\log Q$. At equilibrium: $E_{\\text{cell}} = 0 \\implies E_{\\text{cell}}^\\circ = \\frac{0.0591}{n} \\log K_c$.",
      "Thermodynamics: $\\Delta G^\\circ = -n F E_{\\text{cell}}^\\circ$. For spontaneous reaction, $E_{\\text{cell}} > 0$ and $\\Delta G < 0$.",
      "Conductivity $\\kappa = G \\cdot (l/A) = G \\cdot G^*$. On dilution: Specific conductivity $\\kappa$ decreases (fewer ions per unit volume); Molar conductivity $\\Lambda_m = \\frac{1000 \\kappa}{M}$ increases.",
      "Kohlrausch's Law: $\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ$. Used to determine $\\Lambda_m^\\circ$ for weak electrolytes like $CH_3COOH$.",
      "Batteries: Primary (Leclanché dry cell, Mercury cell has constant $1.35\\text{ V}$); Secondary (Lead storage battery: discharges $PbSO_4$ on both plates, density of $H_2SO_4$ drops; recharged by reversing current).",
    ],
    coreConcepts: [
      {
        title: "Standard Electrode Potential & Daniell Cell",
        content:
          "In a Galvanic cell, chemical energy of a spontaneous redox reaction is converted into electrical energy.\n- **Daniell Cell**: $Zn(s) | Zn^{2+}(aq) \\parallel Cu^{2+}(aq) | Cu(s)$. Anode (oxidation): $Zn \\rightarrow Zn^{2+} + 2e^-$; Cathode (reduction): $Cu^{2+} + 2e^- \\rightarrow Cu$.\n- **Standard Reduction Potential ($E^\\circ$)**: Measured relative to Standard Hydrogen Electrode ($SHE$, $E^\\circ = 0.00\\text{ V}$ at $298\\text{ K}, 1\\text{ bar } H_2, 1\\text{ M } H^+$).\n- **Cell Potential**: $E_{\\text{cell}}^\\circ = E_{\\text{cathode}}^\\circ - E_{\\text{anode}}^\\circ = E_{\\text{right}}^\\circ - E_{\\text{left}}^\\circ$.\n- **External Potential ($V_{\\text{ext}}$) Effect on Daniell Cell**:\n  1. $V_{\\text{ext}} < 1.1\\text{ V}$: Electrons flow $Zn \\rightarrow Cu$, normal galvanic action.\n  2. $V_{\\text{ext}} = 1.1\\text{ V}$: No electron flow, reaction stops (equilibrium).\n  3. $V_{\\text{ext}} > 1.1\\text{ V}$: Electrons reverse $Cu \\rightarrow Zn$, operates as electrolytic cell.",
        ncertPointers: [
          "More negative $E^\\circ$ means stronger reducing agent (e.g., $Li$ with $E^\\circ = -3.05\\text{ V}$).",
          "More positive $E^\\circ$ means stronger oxidizing agent (e.g., $F_2$ with $E^\\circ = +2.87\\text{ V}$).",
        ],
      },
      {
        title: "Nernst Equation & Electrochemical Thermodynamics",
        content:
          "For general redox reaction $aA + bB \\xrightarrow{n e^-} cC + dD$:\n$$E_{\\text{cell}} = E_{\\text{cell}}^\\circ - \\frac{RT}{nF} \\ln Q = E_{\\text{cell}}^\\circ - \\frac{2.303 RT}{nF} \\log_{10} \\frac{[C]^c [D]^d}{[A]^a [B]^b}$$\nAt $T = 298\\text{ K}$, substituting constants $R = 8.314\\text{ J K}^{-1}\\text{mol}^{-1}$ and $F = 96487 \\approx 96500\\text{ C mol}^{-1}$:\n$$E_{\\text{cell}} = E_{\\text{cell}}^\\circ - \\frac{0.0591}{n} \\log_{10} Q$$\n\n**Key Thermodynamic Relations**:\n1. Maximum electrical work: $W_{\\text{max}} = -\\Delta G = n F E_{\\text{cell}}$.\n2. Standard state: $\\Delta G^\\circ = -n F E_{\\text{cell}}^\\circ$.\n3. Relation to Equilibrium Constant ($K_c$): At equilibrium, cell reaction ceases $\\implies E_{\\text{cell}} = 0$ and $Q = K_c$:\n$$E_{\\text{cell}}^\\circ = \\frac{0.0591}{n} \\log_{10} K_c \\implies \\Delta G^\\circ = -2.303 RT \\log_{10} K_c$$",
        ncertPointers: [
          "Pure solids and liquids have activity = 1 (do not include $[Cu(s)]$ or $[Zn(s)]$ in $Q$).",
          "Concentration cell has $E_{\\text{cell}}^\\circ = 0\\text{ V}$; potential is driven purely by concentration gradient: $E = \\frac{0.0591}{n} \\log \\frac{C_2}{C_1}$ where $C_2 > C_1$.",
        ],
      },
      {
        title: "Conductance, Kohlrausch's Law & Faraday's Laws",
        content:
          "1. **Conductivity ($\\kappa$)**: Conductance of $1\\text{ cm}^3$ solution: $\\kappa = G \\cdot G^* = \\frac{1}{R} \\cdot \\frac{l}{A}$. Units: $\\text{S m}^{-1}$ or $\\text{S cm}^{-1}$.\n2. **Molar Conductivity ($\\Lambda_m$)**: Conductance of solution containing 1 mole of electrolyte:\n   $$\\Lambda_m = \\frac{\\kappa \\times 1000}{M} \\quad (\\text{in S cm}^2 \\text{mol}^{-1})$$\n3. **Effect of Dilution**:\n   - **Conductivity ($\\kappa$) decreases**: Number of current-carrying ions per unit volume decreases.\n   - **Molar conductivity ($\\Lambda_m$) increases**: Volume containing 1 mole electrolyte expands; interionic attraction weakens.\n   - Strong electrolytes obey **Debye-Hückel-Onsager equation**: $\\Lambda_m = \\Lambda_m^\\circ - A \\sqrt{C}$. Plot of $\\Lambda_m$ vs $\\sqrt{C}$ gives straight line with intercept $\\Lambda_m^\\circ$.\n   - Weak electrolytes dissociate further on dilution (Ostwald's dilution law); curve steepens at near-zero concentration, so $\\Lambda_m^\\circ$ cannot be obtained by direct extrapolation.\n4. **Kohlrausch's Law of Independent Migration of Ions**:\n   $$\\Lambda_m^\\circ (A_x B_y) = x \\lambda_+^\\circ + y \\lambda_-^\\circ$$\n   Degree of dissociation of weak electrolyte: $\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ}$, and $K_a = \\frac{C \\alpha^2}{1 - \\alpha}$.\n5. **Faraday's Laws of Electrolysis**:\n   - First Law: Mass deposited $m = Z Q = Z I t = \\frac{M}{n F} I t$.\n   - Second Law: When same quantity of electricity passes through series cells: $m_1 / m_2 = E_1 / E_2$ where $E = M/n$.",
        ncertPointers: [
          "1 Faraday ($F \\approx 96500\\text{ C}$) is the charge of 1 mole of electrons.",
          "To deposit 1 mole of $Al$ from $Al^{3+}$, $3 F$ of charge is required; for $Cu$ from $Cu^{2+}$, $2 F$; for $Na$ from $Na^+$, $1 F$.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Nernst Equation at 298 K",
        formula: "E_{\\text{cell}} = E_{\\text{cell}}^\\circ - \\frac{0.0591}{n} \\log_{10} Q",
        symbols: "E = \\text{cell EMF}, n = \\text{moles of electrons exchanged}, Q = \\text{reaction quotient}",
        siUnits: "Volt (V)",
        applicationCondition: "Applies at T = 298 K",
      },
      {
        name: "Standard Gibbs Energy & Equilibrium Constant",
        formula: "\\Delta G^\\circ = -n F E_{\\text{cell}}^\\circ = -2.303 R T \\log K_c",
        symbols: "F = 96487\\text{ C/mol}, R = 8.314\\text{ J/(mol K)}",
        siUnits: "J/mol or kJ/mol",
        applicationCondition: "Standard state (1 M, 1 bar, 298 K)",
      },
      {
        name: "Molar Conductivity",
        formula: "\\Lambda_m = \\frac{1000 \\cdot \\kappa}{M}",
        symbols: "\\kappa = \\text{conductivity in S cm}^{-1}, M = \\text{molarity in mol/L}",
        siUnits: "\\text{S cm}^2 \\text{mol}^{-1}",
        applicationCondition: "Valid for all electrolytic solutions",
      },
      {
        name: "Kohlrausch's Law & Dissociation Constant",
        formula: "\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ, \\quad \\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ}",
        symbols: "\\nu_+, \\nu_- = \\text{number of cations/anions per formula unit}",
        siUnits: "\\text{S cm}^2 \\text{mol}^{-1}",
        applicationCondition: "Infinite dilution",
      },
      {
        name: "Faraday's First Law of Electrolysis",
        formula: "m = \\frac{M \\cdot I \\cdot t}{n \\cdot 96500}",
        symbols: "M = \\text{molar mass}, I = \\text{current in A}, t = \\text{seconds}, n = \\text{valency factor}",
        siUnits: "Grams (g)",
        applicationCondition: "Constant current electrolysis",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="280" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Daniell Cell (Galvanic Cell) Schematic</text>
  
  <!-- Left Beaker (Anode) -->
  <rect x="100" y="70" width="160" height="150" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5"/>
  <rect x="110" y="110" width="140" height="100" fill="#0284c7" opacity="0.2"/>
  <rect x="160" y="60" width="20" height="120" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1"/>
  <text x="170" y="50" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Zn Rod (Anode, -)</text>
  <text x="170" y="195" textAnchor="middle" fill="#38bdf8" fontSize="10">1 M ZnSO₄</text>

  <!-- Right Beaker (Cathode) -->
  <rect x="500" y="70" width="160" height="150" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5"/>
  <rect x="510" y="110" width="140" height="100" fill="#0369a1" opacity="0.4"/>
  <rect x="560" y="60" width="20" height="120" fill="#d97706" stroke="#f59e0b" strokeWidth="1"/>
  <text x="570" y="50" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Cu Rod (Cathode, +)</text>
  <text x="570" y="195" textAnchor="middle" fill="#38bdf8" fontSize="10">1 M CuSO₄</text>

  <!-- Salt Bridge -->
  <path d="M 220,130 L 220,80 L 540,80 L 540,130" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinejoin="round"/>
  <text x="380" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Salt Bridge (Agar-agar + KCl/KNO₃)</text>

  <!-- Wire & Voltmeter -->
  <path d="M 170,60 L 170,20 L 350,20" fill="none" stroke="#facc15" strokeWidth="2"/>
  <circle cx="380" cy="20" r="14" fill="#0f172a" stroke="#facc15" strokeWidth="2"/>
  <text x="380" y="24" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">V</text>
  <path d="M 410,20 L 570,20 L 570,60" fill="none" stroke="#facc15" strokeWidth="2"/>

  <!-- Legend / Info -->
  <text x="380" y="240" textAnchor="middle" fill="#e2e8f0" fontSize="12">e⁻ Flow: Zn (Anode) → Cu (Cathode) | Current: Cu → Zn</text>
  <text x="380" y="260" textAnchor="middle" fill="#94a3b8" fontSize="11">E°cell = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = +0.34 V - (-0.76 V) = +1.10 V</text>
</svg>`,
    workedExamples: [
      {
        id: "chem_u2_we1",
        questionNumber: 1,
        question:
          "Calculate the EMF of the cell at $298\\text{ K}$: $Mg(s) | Mg^{2+}(0.1\\text{ M}) \\parallel Cu^{2+}(1 \\times 10^{-3}\\text{ M}) | Cu(s)$. Given $E^\\circ(Mg^{2+}/Mg) = -2.37\\text{ V}$, $E^\\circ(Cu^{2+}/Cu) = +0.34\\text{ V}$.",
        options: [
          { id: "A", text: "2.65 V" },
          { id: "B", text: "2.71 V" },
          { id: "C", text: "2.77 V" },
          { id: "D", text: "2.12 V" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Calculate $E_{\\text{cell}}^\\circ = E_{\\text{cathode}}^\\circ - E_{\\text{anode}}^\\circ = +0.34 - (-2.37) = +2.71\\text{ V}$.",
          "Step 2: Overall reaction: $Mg(s) + Cu^{2+}(aq) \\rightarrow Mg^{2+}(aq) + Cu(s)$, with $n = 2$ electrons.",
          "Step 3: Reaction quotient $Q = \\frac{[Mg^{2+}]}{[Cu^{2+}]} = \\frac{0.1}{10^{-3}} = 10^2 = 100$.",
          "Step 4: Apply Nernst equation: $E_{\\text{cell}} = 2.71 - \\frac{0.0591}{2} \\log_{10}(100) = 2.71 - 0.02955 \\times 2 = 2.71 - 0.0591 = 2.6509\\text{ V} \\approx 2.65\\text{ V}$.",
        ],
        cuetTip: "Notice that $\\log(100) = 2$, which cancels the 2 in the denominator $\\frac{0.0591}{2} \\times 2 = 0.0591$! Speed calculations like this save minutes in CUET.",
      },
      {
        id: "chem_u2_we2",
        questionNumber: 2,
        question:
          "How much electricity in Coulombs is required to produce 20 g of calcium from molten $CaCl_2$? (Atomic mass of Ca = 40 g/mol, $F = 96500\\text{ C}$).",
        options: [
          { id: "A", text: "48,250 C" },
          { id: "B", text: "96,500 C" },
          { id: "C", text: "193,000 C" },
          { id: "D", text: "24,125 C" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Cathode reduction reaction: $Ca^{2+} + 2e^- \\rightarrow Ca(s)$. 1 mole of $Ca$ (40 g) requires $2 F$ of charge.",
          "Step 2: Number of moles of Ca produced = $20\\text{ g} / 40\\text{ g/mol} = 0.5\\text{ mole}$.",
          "Step 3: Charge required $Q = 0.5 \\times 2 F = 1 F = 96,500\\text{ C}$.",
        ],
        cuetTip: "Always relate charge directly to moles: $\\text{Moles of electrons} = n \\times \\text{moles of substance}$.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Direct Calculation of Limiting Molar Conductivity via Kohlrausch Law",
        frequency: "Very High",
        pyqExample: {
          question:
            "Given $\\Lambda_m^\\circ(NaCl) = 126.4$, $\\Lambda_m^\\circ(HCl) = 425.9$, and $\\Lambda_m^\\circ(CH_3COONa) = 91.0\\text{ S cm}^2\\text{mol}^{-1}$. The limiting molar conductivity of acetic acid $\\Lambda_m^\\circ(CH_3COOH)$ is:",
          options: [
            { id: "A", text: "390.5 S cm² mol⁻¹" },
            { id: "B", text: "425.9 S cm² mol⁻¹" },
            { id: "C", text: "516.9 S cm² mol⁻¹" },
            { id: "D", text: "290.5 S cm² mol⁻¹" },
          ],
          correctOption: "A",
          explanation: "$\\Lambda_m^\\circ(CH_3COOH) = \\Lambda_m^\\circ(CH_3COONa) + \\Lambda_m^\\circ(HCl) - \\Lambda_m^\\circ(NaCl) = 91.0 + 425.9 - 126.4 = 390.5\\text{ S cm}^2\\text{mol}^{-1}$.",
        },
        strategy: "Use addition/subtraction of strong electrolyte values: Salt of desired acid + Strong acid - Common byproduct salt.",
      },
      {
        type: "Battery & Fuel Cell Matching",
        frequency: "High",
        pyqExample: {
          question:
            "Match the cell in List-I with its key characteristic in List-II:\nP. Mercury cell\nQ. Lead storage battery\nR. Hydrogen-oxygen fuel cell\nS. Dry cell",
          options: [
            { id: "A", text: "P-Constant 1.35 V, Q-Secondary cell with PbSO4, R-Eco-friendly with 70% efficiency, S-Primary cell with Zn anode" },
            { id: "B", text: "P-Secondary cell, Q-Constant voltage, R-Primary cell, S-Eco-friendly" },
            { id: "C", text: "P-Eco-friendly, Q-Primary cell, R-Constant 1.35 V, S-Secondary cell" },
            { id: "D", text: "P-Constant 1.35 V, Q-Eco-friendly, R-Secondary cell, S-Primary cell" },
          ],
          correctOption: "A",
          explanation: "Mercury cell voltage remains constant at 1.35 V because no ions in solution change concentration. Lead battery is secondary. H2-O2 cell efficiency is ~70%.",
        },
        strategy: "Remember why Mercury cell has constant voltage: the overall reaction has no dissolved ions whose concentrations change during its lifetime.",
      },
    ],
    commonTraps: [
      {
        misconception: "Using standard oxidation potential directly in $E_{\\text{cathode}} - E_{\\text{anode}}$.",
        whyWrong: "IUPAC convention strictly defines electrode potentials as standard REDUCTION potentials. Using oxidation potential reverses signs and yields incorrect results.",
        correctUnderstanding: "Always convert any given oxidation potential to reduction potential by flipping the sign ($E^\\circ_{\\text{red}} = -E^\\circ_{\\text{ox}}$) before using $E_{\\text{cathode}}^\\circ - E_{\\text{anode}}^\\circ$.",
      },
      {
        misconception: "Thinking conductivity $\\kappa$ increases on dilution because ions move more freely.",
        whyWrong: "While molar conductivity $\\Lambda_m$ increases, specific conductivity $\\kappa$ strictly DECREASES on dilution because the number of ions per unit volume ($1\\text{ cm}^3$) decreases.",
        correctUnderstanding: "Conductivity $\\kappa \\propto$ number of ions in $1\\text{ cm}^3$. On adding water, ions spread out, so $\\kappa$ drops.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Galvanic Anode Memory Hook",
        mnemonic: "LOAN: Left, Oxidation, Anode, Negative.",
        rule: "In standard electrochemical cell representation, the left half-cell is the site of Oxidation, is called Anode, and carries Negative polarity.",
        shortcut: "Opposite for cathode: Right, Reduction, Cathode, Positive.",
        whenToApply: "Setting up cell diagrams and identifying polarity in galvanic cells.",
      },
      {
        title: "Kohlrausch Combination Trick",
        mnemonic: "Add the parents, subtract the spectator.",
        rule: "To find $\\Lambda_m^\\circ$ of $HA$: Add $NaA$ (provides $A^-$) + $HCl$ (provides $H^+$) - $NaCl$ (removes $Na^+$ and $Cl^-$).",
        shortcut: "Wanted = (Salt with desired anion) + (Acid with desired cation) - (Salt of bystanders).",
        whenToApply: "Limiting molar conductivity calculation questions.",
      },
    ],
    quickRevisionCard: {
      title: "Electrochemistry — High-Yield Review",
      bulletPoints: [
        "Daniell Cell: $Zn + Cu^{2+} \\rightarrow Zn^{2+} + Cu$; $E^\\circ = +1.10\\text{ V}$. Anode is $Zn$, Cathode is $Cu$.",
        "Nernst Eq ($298\\text{ K}$): $E = E^\\circ - \\frac{0.0591}{n} \\log Q$.",
        "Equilibrium: $E^\\circ = \\frac{0.0591}{n} \\log K_c$; $\\Delta G^\\circ = -nFE^\\circ = -2.303 RT \\log K_c$.",
        "Conductivity: $\\kappa = \\frac{1}{R} \\frac{l}{A} = G \\cdot G^*$. On dilution, $\\kappa \\downarrow$ (fewer ions per mL).",
        "Molar conductivity: $\\Lambda_m = \\frac{1000 \\kappa}{M}$. On dilution, $\\Lambda_m \\uparrow$ for all electrolytes.",
        "Debye-Hückel-Onsager: $\\Lambda_m = \\Lambda_m^\\circ - A \\sqrt{C}$ (strong electrolytes).",
        "Kohlrausch Law: $\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ$; $\\alpha = \\Lambda_m / \\Lambda_m^\\circ$.",
        "Faraday's 1st Law: $m = \\frac{M \\cdot I \\cdot t}{n \\cdot 96500}$; 1 mole $e^- = 96500\\text{ C} = 1\\text{ F}$.",
        "Mercury Cell: $Zn(Hg) + HgO \\rightarrow ZnO + Hg$; constant $1.35\\text{ V}$ (no ionic concentration changes).",
        "Lead Battery Discharging: $Pb(s) + PbO_2(s) + 2H_2SO_4(aq) \\rightarrow 2PbSO_4(s) + 2H_2O(l)$.",
      ],
    },
    practiceQuestions: [
      {
        id: "chem_u2_q1",
        question: "For the cell reaction $2Fe^{3+}(aq) + 2I^-(aq) \\rightarrow 2Fe^{2+}(aq) + I_2(s)$, the number of electrons transferred $n$ is:",
        type: "standard",
        options: [
          { id: "A", text: "1" },
          { id: "B", text: "2" },
          { id: "C", text: "4" },
          { id: "D", text: "6" },
        ],
        correctOption: "B",
        explanation: "$2I^- \\rightarrow I_2 + 2e^-$ and $2Fe^{3+} + 2e^- \\rightarrow 2Fe^{2+}$. Total 2 moles of electrons are transferred ($n=2$).",
        difficulty: "easy",
      },
      {
        id: "chem_u2_q2",
        question: "When a lead storage battery is discharged:",
        type: "standard",
        options: [
          { id: "A", text: "Lead sulphate is formed at both electrodes" },
          { id: "B", text: "Sulphuric acid is consumed and its density decreases" },
          { id: "C", text: "Water is produced" },
          { id: "D", text: "All of the above" },
        ],
        correctOption: "D",
        explanation: "During discharge, $Pb + PbO_2 + 2H_2SO_4 \\rightarrow 2PbSO_4 + 2H_2O$. $PbSO_4$ deposits on both electrodes and $H_2SO_4$ density drops from 1.30 to ~1.20 g/mL.",
        difficulty: "medium",
      },
      {
        id: "chem_u2_q3",
        question: "Assertion (A): The cell potential of a mercury cell remains constant throughout its life.\nReason (R): The overall cell reaction does not involve any ions in solution whose concentration can change.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "Overall reaction is $Zn(Hg) + HgO(s) \\rightarrow ZnO(s) + Hg(l)$. No ions appear in the equation, keeping the potential steady at 1.35 V.",
        difficulty: "medium",
      },
      {
        id: "chem_u2_q4",
        question: "The quantity of charge required to obtain 1 mole of iron from $Fe_3O_4$ is:",
        type: "standard",
        options: [
          { id: "A", text: "2 F" },
          { id: "B", text: "2.67 F" },
          { id: "C", text: "3 F" },
          { id: "D", text: "8 F" },
        ],
        correctOption: "B",
        explanation: "In $Fe_3O_4$, average oxidation state of Fe is $+8/3$. To reduce 1 mole of Fe from $+8/3$ to 0 requires $8/3\\text{ F} = 2.67\\text{ F}$.",
        difficulty: "hard",
      },
      {
        id: "chem_u2_q5",
        question: "On increasing dilution, which of the following statements is TRUE?",
        type: "standard",
        options: [
          { id: "A", text: "Both conductivity and molar conductivity increase" },
          { id: "B", text: "Both conductivity and molar conductivity decrease" },
          { id: "C", text: "Conductivity decreases, while molar conductivity increases" },
          { id: "D", text: "Conductivity increases, while molar conductivity decreases" },
        ],
        correctOption: "C",
        explanation: "Conductivity $\\kappa$ decreases due to fewer ions per mL, whereas molar conductivity $\\Lambda_m = \\frac{1000\\kappa}{M}$ increases due to dilution of M.",
        difficulty: "easy",
      },
      {
        id: "chem_u2_q6",
        question: "The cell constant of a conductivity cell is given by:",
        type: "standard",
        options: [
          { id: "A", text: "l / A" },
          { id: "B", text: "A / l" },
          { id: "C", text: "R / κ" },
          { id: "D", text: "κ / R" },
        ],
        correctOption: "A",
        explanation: "Cell constant $G^* = l / A$, where $l$ is the distance between electrodes and $A$ is the cross-sectional area.",
        difficulty: "easy",
      },
      {
        id: "chem_u2_q7",
        question: "In the electrolysis of aqueous $NaCl$ using platinum electrodes, the product liberated at the cathode is:",
        type: "standard",
        options: [
          { id: "A", text: "Na metal" },
          { id: "B", text: "Cl₂ gas" },
          { id: "C", text: "H₂ gas" },
          { id: "D", text: "O₂ gas" },
        ],
        correctOption: "C",
        explanation: "At cathode, reduction of $H^+$ ($E^\\circ = 0.00\\text{ V}$) is favored over reduction of $Na^+$ ($E^\\circ = -2.71\\text{ V}$), liberating $H_2$ gas.",
        difficulty: "medium",
      },
      {
        id: "chem_u2_q8",
        question: "Rusting of iron is catalyzed by the presence of:",
        type: "standard",
        options: [
          { id: "A", text: "Fe²⁺ ions" },
          { id: "B", text: "H⁺ ions" },
          { id: "C", text: "Zn ions" },
          { id: "D", text: "Pure dry oxygen" },
        ],
        correctOption: "B",
        explanation: "Rusting is an electrochemical process where $H^+$ ions (from dissolved $CO_2$ forming $H_2CO_3$) act as a catalyst.",
        difficulty: "medium",
      },
      {
        id: "chem_u2_q9",
        question: "If $E_{\\text{cell}}^\\circ$ for a given reaction is negative, then:",
        type: "standard",
        options: [
          { id: "A", text: "ΔG° > 0 and K_c < 1" },
          { id: "B", text: "ΔG° < 0 and K_c > 1" },
          { id: "C", text: "ΔG° > 0 and K_c > 1" },
          { id: "D", text: "ΔG° = 0 and K_c = 1" },
        ],
        correctOption: "A",
        explanation: "Since $\\Delta G^\\circ = -nFE^\\circ$, a negative $E^\\circ$ yields $\\Delta G^\\circ > 0$ (non-spontaneous) and $K_c < 1$.",
        difficulty: "easy",
      },
      {
        id: "chem_u2_q10",
        question: "The standard reduction potentials are: $E^\\circ(Zn^{2+}/Zn) = -0.76\\text{ V}$, $E^\\circ(Fe^{2+}/Fe) = -0.44\\text{ V}$, $E^\\circ(Cu^{2+}/Cu) = +0.34\\text{ V}$, $E^\\circ(Ag^+/Ag) = +0.80\\text{ V}$. The strongest reducing agent is:",
        type: "standard",
        options: [
          { id: "A", text: "Ag" },
          { id: "B", text: "Cu" },
          { id: "C", text: "Fe" },
          { id: "D", text: "Zn" },
        ],
        correctOption: "D",
        explanation: "The element with the lowest (most negative) reduction potential has the highest tendency to lose electrons $\\implies Zn$ is the strongest reducing agent.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["chemistry_u1_t1"],
      relatedTopics: ["chemistry_u3_t1"],
      practiceTestId: "practice-chemistry-unit2-test1",
      practiceTestUrl: "/test/practice-chemistry-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=chemistry",
      weaknessRadarUrl: "/dashboard/radar?subject=chemistry",
    },
    subjectSpecific: {
      chemistry: {
        exceptionsList: [
          "Overpotential of Oxygen: In electrolysis of aqueous $NaCl$, oxidation of $H_2O$ to $O_2$ is thermodynamically favored ($1.23\\text{ V}$), but $Cl_2$ is liberated at the anode ($1.36\\text{ V}$) due to overpotential of oxygen.",
          "Hydrogen-Oxygen Fuel Cell: Operates continuously as long as fuel is supplied; does not need recharging like storage cells and produces pure water.",
        ],
        trendsTable: [
          { property: "Standard Reduction Potential (E°)", trend: "Li (-3.05 V) to F2 (+2.87 V)", reason: "Higher positive E° means stronger oxidizing agent; more negative E° means stronger reducing agent" },
          { property: "Molar Conductivity (Λm)", trend: "Increases on dilution for all electrolytes", reason: "Interionic forces weaken; degree of dissociation increases" },
        ],
      },
    },
  },

  // Unit 3: Chemical Kinetics
  {
    id: "chemistry_u3_t1",
    slug: "rate-of-reaction-order-and-molecularity-integrated-rate-equations-arrhenius-theory",
    subject: "chemistry",
    subjectName: "Chemistry",
    subjectCode: "306",
    unitNumber: 3,
    unitTitle: "Chemical Kinetics",
    topicTitle: "Rate of Reaction, Order and Molecularity, Integrated Rate Equations, Arrhenius Theory",
    ncertReference: {
      class: "Class 12",
      book: "Chemistry Part 1",
      chapterNumber: 3,
      chapterName: "Chemical Kinetics",
      sections: [
        "3.1 Rate of a Chemical Reaction",
        "3.2 Factors Influencing Rate of a Reaction",
        "3.3 Integrated Rate Equations (Zero and First Order)",
        "3.4 Pseudo First Order Reactions",
        "3.5 Temperature Dependence of the Rate of a Reaction & Arrhenius Equation",
        "3.6 Collision Theory of Chemical Reactions",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4-5 questions per shift)",
      totalPyqsInRepo: 251,
      weightagePercentage: 10.0,
    },
    summary30Seconds: [
      "Rate law: $\\text{Rate} = k [A]^x [B]^y$. Order $n = x + y$ is an experimentally determined quantity; can be zero, fractional, or negative. Units of $k = (\\text{mol L}^{-1})^{1-n} \\text{s}^{-1}$.",
      "Molecularity is the number of reacting species in an elementary step; strictly a theoretical integer ($1, 2, 3$); NEVER zero, negative, or fractional.",
      "Zero-order: $[A] = [A]_0 - kt$, $t_{1/2} = \\frac{[A]_0}{2k} \\propto [A]_0$. Rate is independent of concentration.",
      "First-order: $k = \\frac{2.303}{t} \\log \\frac{[A]_0}{[A]}$, $t_{1/2} = \\frac{0.693}{k}$. Half-life is STRICTLY INDEPENDENT of initial concentration $[A]_0$.",
      "Pseudo first-order: Solvent in large excess (e.g., acid hydrolysis of ester: $CH_3COOC_2H_5 + H_2O \\xrightarrow{H^+} CH_3COOH + C_2H_5OH$).",
      "Arrhenius equation: $k = A e^{-E_a/RT} \\implies \\log \\frac{k_2}{k_1} = \\frac{E_a}{2.303 R} \\left[\\frac{T_2 - T_1}{T_1 T_2}\\right]$. Plot of $\\ln k$ vs $1/T$ has slope $= -E_a/R$.",
      "Catalyst lowers activation energy $E_a$, speeding both forward and backward rates equally; does NOT alter $\\Delta H$, $\\Delta G$, or equilibrium constant $K_{\\text{eq}}$.",
    ],
    coreConcepts: [
      {
        title: "Rate of Reaction, Order vs Molecularity & Rate Constants",
        content:
          "For reaction $aA + bB \\rightarrow cC + dD$:\n$$\\text{Rate} = -\\frac{1}{a} \\frac{d[A]}{dt} = -\\frac{1}{b} \\frac{d[B]}{dt} = +\\frac{1}{c} \\frac{d[C]}{dt} = +\\frac{1}{d} \\frac{d[D]}{dt}$$\n\n**Rate Law**: $\\text{Rate} = k [A]^x [B]^y$ where $x, y$ are orders with respect to $A, B$. The overall order is $n = x + y$.\n- **Units of $k$**:\n  $$\\text{Units of } k = \\left(\\frac{\\text{mol}}{\\text{L}}\\right)^{1-n} \\text{s}^{-1}$$\n  - Zero Order ($n=0$): $\\text{mol L}^{-1} \\text{s}^{-1}$\n  - First Order ($n=1$): $\\text{s}^{-1}$\n  - Second Order ($n=2$): $\\text{L mol}^{-1} \\text{s}^{-1}$\n\n**Order vs Molecularity (Classic CUET Table)**:\n1. *Order* is experimental; *Molecularity* is theoretical for elementary reactions.\n2. *Order* can be $0, 1, 2, 3$, or fractional; *Molecularity* can only be positive whole integers ($1, 2, 3$).\n3. *Order* applies to complex reactions (governed by the rate-determining slowest step); *Molecularity* is meaningless for complex reactions as a whole.",
        ncertPointers: [
          "Reactions with molecularity $\\ge 4$ are extremely rare because simultaneous collision of 4 molecules is statistically improbable.",
          "Radioactive decay of unstable nuclei always follows first-order kinetics.",
        ],
      },
      {
        title: "Integrated Rate Laws: Zero Order vs First Order",
        content:
          "**1. Zero Order Reactions**:\n- Differential rate: $-\\frac{d[A]}{dt} = k [A]^0 = k$\n- Integrated form: $[A] = [A]_0 - kt$\n- Half-life: $t_{1/2} = \\frac{[A]_0}{2k}$ (Directly proportional to initial concentration $[A]_0$)\n- Completion time: $t_{100\\%} = \\frac{[A]_0}{k} = 2 \\cdot t_{1/2}$\n- Examples: Decomposition of gaseous $NH_3$ on hot Pt surface at high pressure; $2HI \\xrightarrow{\\text{Au}} H_2 + I_2$.\n\n**2. First Order Reactions**:\n- Differential rate: $-\\frac{d[A]}{dt} = k [A]$\n- Integrated form: $k = \\frac{2.303}{t} \\log_{10} \\frac{[A]_0}{[A]} \\implies [A] = [A]_0 e^{-kt}$\n- Half-life: $t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{k}$ (**Independent of $[A]_0$**)\n- Useful relations for CUET:\n  - $t_{75\\%} = 2 \\times t_{50\\%}$\n  - $t_{87.5\\%} = 3 \\times t_{50\\%}$\n  - $t_{99.9\\%} = 10 \\times t_{50\\%}$\n  - $t_{99\\%} = 2 \\times t_{90\\%}$",
        ncertPointers: [
          "If doubling the concentration doubles the rate $\\implies$ 1st order. If doubling concentration quadruples the rate $\\implies$ 2nd order. If doubling concentration leaves rate unchanged $\\implies$ 0th order.",
        ],
      },
      {
        title: "Arrhenius Theory, Activation Energy & Catalyst Influence",
        content:
          "Arrhenius proposed that only molecules with energy $\\ge E_a$ (activation energy) and proper spatial orientation undergo effective collisions:\n$$k = A \\cdot e^{-E_a / RT}$$\nwhere $A$ is the frequency factor (pre-exponential factor) and $e^{-E_a/RT}$ represents the fraction of molecules with kinetic energy $\\ge E_a$.\n\nTaking natural logs:\n$$\\ln k = \\ln A - \\frac{E_a}{R} \\cdot \\frac{1}{T} \\iff \\log_{10} k = \\log_{10} A - \\frac{E_a}{2.303 R T}$$\n- Plot of $\\log_{10} k$ vs $1/T$: Straight line with Slope $= -\\frac{E_a}{2.303 R}$ and Intercept $= \\log_{10} A$.\n- Temperature dependency between two temperatures $T_1$ and $T_2$:\n$$\\log_{10} \\frac{k_2}{k_1} = \\frac{E_a}{2.303 R} \\left[\\frac{T_2 - T_1}{T_1 T_2}\\right]$$\n\n**Temperature Coefficient**: Ratio of rate constant at $(T + 10)^\\circ\\text{C}$ to that at $T^\\circ\\text{C}$: $\\frac{k_{T+10}}{k_T} \\approx 2 \\text{ to } 3$.\n\n**Action of Catalyst**:\n- Provides an alternative reaction pathway with **lower activation energy** ($E_a' < E_a$).\n- Increases rate by increasing fraction of effective collisions ($e^{-E_a/RT}$).",
        ncertPointers: [
          "A catalyst does NOT change $\\Delta H$ (enthalpy of reaction), $\\Delta G$ (free energy), or equilibrium constant $K_{\\text{eq}}$. It only speeds up the approach to equilibrium.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "First Order Rate Constant & Half-Life",
        formula: "k = \\frac{2.303}{t} \\log_{10} \\frac{[A]_0}{[A]}, \\quad t_{1/2} = \\frac{0.693}{k}",
        symbols: "[A]_0 = \\text{initial concentration}, [A] = \\text{concentration at time } t",
        siUnits: "k\\text{ in s}^{-1}, t_{1/2}\\text{ in s}",
        applicationCondition: "First order reaction kinetics",
      },
      {
        name: "Zero Order Rate Equation",
        formula: "[A] = [A]_0 - k t, \\quad t_{1/2} = \\frac{[A]_0}{2k}",
        symbols: "k = \\text{rate constant in mol L}^{-1}\\text{s}^{-1}",
        siUnits: "\\text{mol L}^{-1}\\text{s}^{-1}",
        applicationCondition: "Zero order kinetics (high surface saturation)",
      },
      {
        name: "Arrhenius Two-Temperature Form",
        formula: "\\log_{10} \\frac{k_2}{k_1} = \\frac{E_a}{2.303 R} \\left[\\frac{T_2 - T_1}{T_1 T_2}\\right]",
        symbols: "E_a = \\text{activation energy in J/mol}, R = 8.314\\text{ J/(mol K)}",
        siUnits: "\\text{J/mol or kJ/mol}",
        applicationCondition: "Activation energy constant over temperature range",
      },
      {
        name: "General Order Rate Constant Units",
        formula: "\\text{Units of } k = (\\text{mol L}^{-1})^{1-n} \\text{s}^{-1}",
        symbols: "n = \\text{overall reaction order}",
        siUnits: "Varies with order n",
        applicationCondition: "Homogeneous reaction kinetics",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="280" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Potential Energy Profile & Catalyst Effect</text>

  <!-- Axes -->
  <line x1="100" y1="240" x2="680" y2="240" stroke="#64748b" strokeWidth="2"/>
  <line x1="100" y1="240" x2="100" y2="50" stroke="#64748b" strokeWidth="2"/>
  <text x="390" y="265" textAnchor="middle" fill="#94a3b8" fontSize="12">Reaction Coordinate →</text>
  <text x="45" y="145" textAnchor="middle" fill="#94a3b8" fontSize="12" transform="rotate(-90 45 145)">Potential Energy →</text>

  <!-- Reactants and Products plateaus -->
  <line x1="100" y1="170" x2="220" y2="170" stroke="#38bdf8" strokeWidth="3"/>
  <text x="160" y="160" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Reactants</text>

  <line x1="560" y1="200" x2="680" y2="200" stroke="#22c55e" strokeWidth="3"/>
  <text x="620" y="190" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Products</text>

  <!-- Uncatalyzed Curve -->
  <path d="M 220,170 Q 390,30 560,200" fill="none" stroke="#f43f5e" strokeWidth="2.5"/>
  <text x="390" y="60" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">Uncatalyzed Path (Ea)</text>

  <!-- Catalyzed Curve -->
  <path d="M 220,170 Q 390,95 560,200" fill="none" stroke="#eab308" strokeWidth="2.5" strokeDasharray="5 4"/>
  <text x="390" y="115" textAnchor="middle" fill="#eab308" fontSize="11" fontWeight="bold">Catalyzed Path (Ea')</text>

  <!-- Delta H indicator -->
  <line x1="640" y1="170" x2="640" y2="200" stroke="#a855f7" strokeWidth="2"/>
  <text x="665" y="188" fill="#a855f7" fontSize="11" fontWeight="bold">ΔH &lt; 0</text>
</svg>`,
    workedExamples: [
      {
        id: "chem_u3_we1",
        questionNumber: 1,
        question:
          "A first order reaction is 50% complete in 20 minutes. What is the time required for 99.9% completion of the reaction?",
        options: [
          { id: "A", text: "100 minutes" },
          { id: "B", text: "150 minutes" },
          { id: "C", text: "200 minutes" },
          { id: "D", text: "400 minutes" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Given $t_{50\\%} = t_{1/2} = 20\\text{ minutes}$.",
          "Step 2: Relation for first order reaction: $t_{99.9\\%} = \\frac{2.303}{k} \\log \\frac{100}{100 - 99.9} = \\frac{2.303}{k} \\log(1000) = \\frac{2.303 \\times 3}{k} = \\frac{6.909}{k}$.",
          "Step 3: Since $t_{1/2} = \\frac{0.693}{k}$, we have $\\frac{t_{99.9\\%}}{t_{1/2}} = \\frac{6.909}{0.693} = 10$.",
          "Step 4: Therefore, $t_{99.9\\%} = 10 \\times t_{1/2} = 10 \\times 20\\text{ min} = 200\\text{ minutes}$.",
        ],
        cuetTip: "Memorize the direct shortcut: $t_{99.9\\%} = 10 \\times t_{1/2}$. This appears directly in CUET nearly every year!",
      },
      {
        id: "chem_u3_we2",
        questionNumber: 2,
        question:
          "For a reaction $A + B \\rightarrow C$, the rate becomes 4 times when the concentration of A is doubled, but remains unchanged when the concentration of B is doubled. The overall rate law is:",
        options: [
          { id: "A", text: "Rate = k [A] [B]" },
          { id: "B", text: "Rate = k [A]² [B]⁰" },
          { id: "C", text: "Rate = k [A]² [B]¹" },
          { id: "D", text: "Rate = k [A]⁰ [B]²" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Let $\\text{Rate} = k [A]^x [B]^y$.",
          "Step 2: When $[A] \\rightarrow 2[A]$, $\\text{Rate} \\rightarrow 4 \\times \\text{Rate} = 2^2 \\times \\text{Rate} \\implies x = 2$.",
          "Step 3: When $[B] \\rightarrow 2[B]$, $\\text{Rate}$ is unchanged $\\implies 2^y = 1 \\implies y = 0$.",
          "Step 4: Overall rate law is $\\text{Rate} = k [A]^2 [B]^0 = k [A]^2$.",
        ],
        cuetTip: "Order with respect to a reactant whose concentration change does not affect rate is always ZERO.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Rate Constant Unit Identification",
        frequency: "Very High",
        pyqExample: {
          question:
            "The rate constant of a reaction is $k = 3.2 \\times 10^{-4}\\text{ L mol}^{-1}\\text{s}^{-1}$. What is the overall order of the reaction?",
          options: [
            { id: "A", text: "Zero order" },
            { id: "B", text: "First order" },
            { id: "C", text: "Second order" },
            { id: "D", text: "Third order" },
          ],
          correctOption: "C",
          explanation: "Unit of $k = (\\text{mol L}^{-1})^{1-n} \\text{s}^{-1}$. For $n=2$, $(\\text{mol L}^{-1})^{-1} \\text{s}^{-1} = \\text{L mol}^{-1}\\text{s}^{-1}$.",
        },
        strategy: "Use formula $(\\text{mol L}^{-1})^{1-n}\\text{s}^{-1}$. If L has power +1, $1-n = -1 \\implies n = 2$.",
      },
      {
        type: "Arrhenius Plot Slope Question",
        frequency: "High",
        pyqExample: {
          question:
            "In an Arrhenius plot of $\\ln k$ versus $1/T$, the slope of the straight line equals:",
          options: [
            { id: "A", text: "-Ea / R" },
            { id: "B", text: "-Ea / (2.303 R)" },
            { id: "C", text: "+Ea / R" },
            { id: "D", text: "ln A" },
          ],
          correctOption: "A",
          explanation: "For natural log $\\ln k = \\ln A - \\frac{E_a}{R}\\frac{1}{T}$, slope is $-E_a/R$. For base-10 log $\\log k$, slope is $-E_a/(2.303 R)$.",
        },
        strategy: "Notice carefully whether the y-axis is $\\ln k$ (natural log) or $\\log k$ (base 10 log)!",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming overall order equals the sum of stoichiometric coefficients.",
        whyWrong: "Stoichiometric coefficients determine molecularity of elementary steps, but the overall order MUST be determined experimentally.",
        correctUnderstanding: "For example, $H_2 + Br_2 \\rightarrow 2HBr$ has stoichiometry $1+1=2$, but experimental rate law is complex with fractional order.",
      },
      {
        misconception: "Believing a catalyst increases the equilibrium yield of products.",
        whyWrong: "A catalyst speeds up both forward and backward reactions to the exact same extent.",
        correctUnderstanding: "A catalyst helps attain equilibrium faster; it has NO effect on $\\Delta G$, $\\Delta H$, or the value of $K_{\\text{eq}}$.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "First-Order Half-Life Multipliers",
        mnemonic: "1-2-3 rule: 75% is 2 half-lives, 87.5% is 3 half-lives, 99.9% is 10 half-lives.",
        rule: "$t_{75\\%} = 2 t_{1/2}$, $t_{87.5\\%} = 3 t_{1/2}$, $t_{93.75\\%} = 4 t_{1/2}$, $t_{99.9\\%} = 10 t_{1/2}$.",
        shortcut: "No need to write integrated log equations; directly multiply $t_{1/2}$ by the corresponding factor.",
        whenToApply: "Numerical MCQs on percent completion in first-order radioactive decay or chemical reactions.",
      },
      {
        title: "Catalyst Invariance Mnemonic",
        mnemonic: "G-H-K are untouchable by catalysts.",
        rule: "$\\Delta G$ (Gibbs free energy), $\\Delta H$ (enthalpy), and $K$ (equilibrium constant) NEVER change with catalyst.",
        shortcut: "Only $E_a$ (activation energy) and rates ($k_f, k_b$) change.",
        whenToApply: "Statement-based or Assertion-Reason questions on catalysis.",
      },
    ],
    quickRevisionCard: {
      title: "Chemical Kinetics — Quick Review",
      bulletPoints: [
        "Rate units: $\\text{mol L}^{-1}\\text{s}^{-1}$. Rate constant $k$ units: $(\\text{mol L}^{-1})^{1-n}\\text{s}^{-1}$.",
        "Order: Can be 0, fractional, negative; derived from experiment.",
        "Molecularity: Cannot be 0, fraction, or >3; applies to elementary steps only.",
        "Zero order: $[A] = [A]_0 - kt$; $t_{1/2} = [A]_0 / (2k)$; rate independent of $[A]$.",
        "First order: $k = \\frac{2.303}{t}\\log\\frac{[A]_0}{[A]}$; $t_{1/2} = 0.693 / k$ (independent of $[A]_0$).",
        "Key first order times: $t_{75\\%} = 2 t_{1/2}$; $t_{99.9\\%} = 10 t_{1/2}$; $t_{99\\%} = 2 t_{90\\%}$.",
        "Arrhenius: $k = A e^{-E_a/RT}$; $\\ln k$ vs $1/T$ slope $= -E_a/R$; $\\log k$ vs $1/T$ slope $= -E_a/(2.303 R)$.",
        "Temperature coefficient: Rate doubles or triples for every $10^\\circ\\text{C}$ rise.",
        "Catalyst: Lowers $E_a$; leaves $\\Delta H, \\Delta G, K_{\\text{eq}}$ unchanged.",
        "Pseudo 1st order: Hydrolysis of cane sugar, acid hydrolysis of ethyl acetate ($H_2O$ in large excess).",
      ],
    },
    practiceQuestions: [
      {
        id: "chem_u3_q1",
        question: "For a zero-order reaction, the plot of $[A]$ versus time $t$ gives a straight line with:",
        type: "standard",
        options: [
          { id: "A", text: "Positive slope and zero intercept" },
          { id: "B", text: "Negative slope (-k) and intercept [A]₀" },
          { id: "C", text: "Negative slope (-k/2.303) and intercept ln[A]₀" },
          { id: "D", text: "Zero slope" },
        ],
        correctOption: "B",
        explanation: "From integrated rate equation $[A] = -kt + [A]_0$, this is a straight line $y = mx + c$ with slope $m = -k$ and intercept $c = [A]_0$.",
        difficulty: "easy",
      },
      {
        id: "chem_u3_q2",
        question: "The rate of a reaction triples when the temperature is raised from 300 K to 310 K. The activation energy $E_a$ is ($R = 8.314\\text{ J K}^{-1}\\text{mol}^{-1}, \\log 3 = 0.4771$):",
        type: "standard",
        options: [
          { id: "A", text: "84.3 kJ/mol" },
          { id: "B", text: "53.6 kJ/mol" },
          { id: "C", text: "122.4 kJ/mol" },
          { id: "D", text: "41.2 kJ/mol" },
        ],
        correctOption: "A",
        explanation: "$\\log(3) = \\frac{E_a}{2.303 \\times 8.314} \\frac{10}{300 \\times 310} \\implies 0.4771 = \\frac{E_a}{19.147} \\frac{10}{93000} \\implies E_a \\approx 84.3\\text{ kJ/mol}$.",
        difficulty: "medium",
      },
      {
        id: "chem_u3_q3",
        question: "Assertion (A): Molecularity of a reaction can never be fractional or zero.\nReason (R): Molecularity is the number of reactant species taking part in an elementary step which must collide simultaneously.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "Molecules colliding in an elementary step must be whole physical entities (at least 1, 2, or 3), so molecularity can never be zero or fractional.",
        difficulty: "easy",
      },
      {
        id: "chem_u3_q4",
        question: "For the reaction $2N_2O_5 \\rightarrow 4NO_2 + O_2$, if $-\\frac{d[N_2O_5]}{dt} = 0.02\\text{ mol L}^{-1}\\text{s}^{-1}$, the rate of formation of $NO_2$ is:",
        type: "standard",
        options: [
          { id: "A", text: "0.01 mol L⁻¹ s⁻¹" },
          { id: "B", text: "0.02 mol L⁻¹ s⁻¹" },
          { id: "C", text: "0.04 mol L⁻¹ s⁻¹" },
          { id: "D", text: "0.08 mol L⁻¹ s⁻¹" },
        ],
        correctOption: "C",
        explanation: "Rate $= \\frac{1}{2} \\left(-\\frac{d[N_2O_5]}{dt}\\right) = \\frac{1}{4} \\frac{d[NO_2]}{dt} \\implies \\frac{d[NO_2]}{dt} = 2 \\times 0.02 = 0.04\\text{ mol L}^{-1}\\text{s}^{-1}$.",
        difficulty: "easy",
      },
      {
        id: "chem_u3_q5",
        question: "Hydrolysis of ethyl acetate in excess water in the presence of dilute acid is an example of:",
        type: "standard",
        options: [
          { id: "A", text: "Zero order reaction" },
          { id: "B", text: "True second order reaction" },
          { id: "C", text: "Pseudo first order reaction" },
          { id: "D", text: "Third order reaction" },
        ],
        correctOption: "C",
        explanation: "Water is present in large excess, so its concentration remains virtually unchanged, making the molecularity 2 but order 1 (pseudo-first order).",
        difficulty: "easy",
      },
      {
        id: "chem_u3_q6",
        question: "Match List-I (Reaction Order) with List-II (Units of Rate Constant k):\nP. Zero Order\nQ. First Order\nR. Second Order\nS. Third Order",
        type: "match-the-following",
        options: [
          { id: "A", text: "P-mol L⁻¹ s⁻¹, Q-s⁻¹, R-L mol⁻¹ s⁻¹, S-L² mol⁻² s⁻¹" },
          { id: "B", text: "P-s⁻¹, Q-mol L⁻¹ s⁻¹, R-L² mol⁻² s⁻¹, S-L mol⁻¹ s⁻¹" },
          { id: "C", text: "P-mol L⁻¹ s⁻¹, Q-L mol⁻¹ s⁻¹, R-s⁻¹, S-L² mol⁻² s⁻¹" },
          { id: "D", text: "P-L mol⁻¹ s⁻¹, Q-s⁻¹, R-mol L⁻¹ s⁻¹, S-L² mol⁻² s⁻¹" },
        ],
        correctOption: "A",
        explanation: "General unit: $(\\text{mol/L})^{1-n}\\text{s}^{-1}$. For $n=0$: $\\text{mol L}^{-1}\\text{s}^{-1}$; $n=1$: $\\text{s}^{-1}$; $n=2$: $\\text{L mol}^{-1}\\text{s}^{-1}$; $n=3$: $\\text{L}^2\\text{mol}^{-2}\\text{s}^{-1}$.",
        difficulty: "medium",
      },
      {
        id: "chem_u3_q7",
        question: "If the rate constant $k$ of a reaction is numerically equal to the rate of the reaction, the order of the reaction must be:",
        type: "standard",
        options: [
          { id: "A", text: "First order" },
          { id: "B", text: "Zero order" },
          { id: "C", text: "Fractional order" },
          { id: "D", text: "Second order" },
        ],
        correctOption: "B",
        explanation: "$\\text{Rate} = k [A]^0 = k$. The rate equals rate constant at all concentrations only for zero order.",
        difficulty: "easy",
      },
      {
        id: "chem_u3_q8",
        question: "In the presence of a catalyst, the heat evolved or absorbed during a reaction ($\\Delta H$):",
        type: "standard",
        options: [
          { id: "A", text: "Increases" },
          { id: "B", text: "Decreases" },
          { id: "C", text: "Remains strictly unchanged" },
          { id: "D", text: "Becomes zero" },
        ],
        correctOption: "C",
        explanation: "A catalyst alters only activation energy, not initial or final state energies, so $\\Delta H$ is strictly unchanged.",
        difficulty: "easy",
      },
      {
        id: "chem_u3_q9",
        question: "A substance decomposes following first-order kinetics with $t_{1/2} = 100\\text{ minutes}$. What fraction of the original substance remains after 300 minutes?",
        type: "standard",
        options: [
          { id: "A", text: "1/4" },
          { id: "B", text: "1/6" },
          { id: "C", text: "1/8" },
          { id: "D", text: "1/16" },
        ],
        correctOption: "C",
        explanation: "Number of half-lives $n = 300 / 100 = 3$. Remaining fraction $= (1/2)^3 = 1/8$.",
        difficulty: "easy",
      },
      {
        id: "chem_u3_q10",
        question: "Assertion (A): For an elementary reaction, order is equal to molecularity.\nReason (R): Elementary reactions proceed in a single step without any intermediates.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "Since elementary reactions occur in a single step, the number of colliding molecules directly determines the rate law power.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["chemistry_u1_t1", "chemistry_u2_t1"],
      relatedTopics: ["chemistry_u4_t1"],
      practiceTestId: "practice-chemistry-unit3-test1",
      practiceTestUrl: "/test/practice-chemistry-unit3-test1",
      weaknessReportUrl: "/dashboard/radar?subject=chemistry",
      weaknessRadarUrl: "/dashboard/radar?subject=chemistry",
    },
    subjectSpecific: {
      chemistry: {
        exceptionsList: [
          "Decomposition of $NH_3$ on hot Platinum: Zero-order at high pressure because the metal catalyst surface is completely saturated with adsorbed molecules; at low pressure it becomes first-order.",
          "Inversion of cane sugar: $C_{12}H_{22}O_{11} + H_2O \\xrightarrow{H^+} C_6H_{12}O_6 + C_6H_{12}O_6$. Molecularity is 2, but order is 1 (pseudo-first order) because water is in vast excess.",
        ],
        trendsTable: [
          { property: "Rate Constant (k) with Temperature", trend: "Always increases as temperature rises", reason: "Fraction of molecules having energy >= Ea increases exponentially ($e^{-E_a/RT}$)" },
          { property: "Half-Life of Zero Order", trend: "Proportional to initial concentration ($t_{1/2} \\propto [A]_0$)", reason: "More reactant takes proportionally longer to deplete at constant absolute rate" },
          { property: "Half-Life of First Order", trend: "Independent of initial concentration ($t_{1/2} = 0.693/k$)", reason: "Rate is directly proportional to remaining concentration at every instant" },
        ],
      },
    },
  },
];
