import { NoteDocument } from "@/types/notes";

export const inorganicChemistryTopics: NoteDocument[] = [
  // Unit 4: d- and f-Block Elements
  {
    id: "chemistry_u4_t1",
    slug: "transition-metals-lanthanoids-and-actinoids-coordination-and-color-properties",
    subject: "chemistry",
    subjectName: "Chemistry",
    subjectCode: "306",
    unitNumber: 4,
    unitTitle: "d and f Block Elements",
    topicTitle: "Transition Metals, Lanthanoids and Actinoids, Coordination & Color Properties",
    ncertReference: {
      class: "Class 12",
      book: "Chemistry Part 1",
      chapterNumber: 4,
      chapterName: "The d- and f-Block Elements",
      sections: [
        "4.1 Position in the Periodic Table",
        "4.2 Electronic Configurations of the d-Block Elements",
        "4.3 General Properties of the Transition Elements (3d Series)",
        "4.4 Potassium Dichromate (K2Cr2O7) and Potassium Permanganate (KMnO4)",
        "4.5 The Lanthanoids: Oxidation States & Lanthanoid Contraction",
        "4.6 The Actinoids: Comparison with Lanthanoids",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (3-4 questions per shift)",
      totalPyqsInRepo: 85,
      weightagePercentage: 8.0,
    },
    summary30Seconds: [
      "Transition element definition: Incompletely filled $d$-subshell in ground state or in any common oxidation state. Zn, Cd, Hg are NOT regarded as transition elements ($d^{10}$ in both elemental & common states).",
      "Scandium (+3 only) and Zinc (+2 only) exhibit single oxidation states; Manganese shows the maximum number of oxidation states (+2 to +7) in the 3d series.",
      "Magnetic moment: Spin-only formula $\\mu = \\sqrt{n(n + 2)}\\text{ BM}$ where $n$ is number of unpaired electrons. Maximum for $Mn^{2+}$ and $Fe^{3+}$ ($n=5, \\mu = 5.92\\text{ BM}$).",
      "Lanthanoid Contraction: Steady decrease in atomic/ionic radii from $La^{3+}$ to $Lu^{3+}$ due to poor shielding of $4f$ electrons. Causes identical sizes of 4d and 5d pairs ($Zr \\approx Hf$, $Nb \\approx Ta$).",
      "Potassium Dichromate ($K_2Cr_2O_7$): Chromate ($CrO_4^{2-}$, yellow) and dichromate ($Cr_2O_7^{2-}$, orange) are interconvertible with pH ($2CrO_4^{2-} + 2H^+ \\rightleftharpoons Cr_2O_7^{2-} + H_2O$).",
      "Potassium Permanganate ($KMnO_4$): Dark purple crystals, strong oxidizing agent. In acidic medium: $MnO_4^- + 8H^+ + 5e^- \\rightarrow Mn^{2+} + 4H_2O$ (change in O.S. = 5).",
    ],
    coreConcepts: [
      {
        title: "General Trends in the 3d Transition Metals",
        content:
          "Transition elements occupy groups 3 to 12. Electronic configuration is $(n-1)d^{1-10} ns^{1-2}$.\n- **Exceptions in 3d series**: Chromium ($[Ar] 3d^5 4s^1$) and Copper ($[Ar] 3d^{10} 4s^1$) due to extra stability of half-filled and fully-filled $d$-subshells.\n- **Atomic & Ionic Radii**: Radii decrease from Sc to Cr due to increasing nuclear charge, remain nearly constant from Fe to Ni (shielding by added $3d$ electrons balances nuclear pull), and slightly increase at Cu-Zn due to electron-electron repulsions.\n- **Standard Electrode Potential ($E^\\circ_{M^{2+}/M}$)**:\n  - $E^\\circ$ for Copper ($Cu^{2+}/Cu$) is **positive** ($+0.34\\text{ V}$), meaning Cu does not displace $H_2$ from non-oxidizing acids. High enthalpy of atomization and hydration enthalpy fails to balance sum of first two ionization enthalpies.\n  - Anomaly of $Mn^{2+}$ ($E^\\circ = -1.18\\text{ V}$) and $Zn^{2+}$ ($E^\\circ = -0.76\\text{ V}$) having more negative values than expected due to stability of half-filled $d^5$ and fully filled $d^{10}$ configurations.",
        ncertPointers: [
          "Zn, Cd, and Hg have low enthalpies of atomization and are soft with low melting points (Hg is liquid at room temp) due to lack of unpaired d-electrons forming metallic bonds.",
          "Highest oxidation state of 3d series (+7) is shown by Manganese in $Mn_2O_7$ and $KMnO_4$.",
        ],
      },
      {
        title: "Catalytic, Magnetic, Interstitial & Color Properties",
        content:
          "1. **Catalytic Activity**: Arises from variable oxidation states (ability to form unstable intermediate compounds) and vacant $d$-orbitals providing surface area. Examples: $V_2O_5$ in Contact Process, finely divided $Fe$ in Haber's Process, $Ni$ in hydrogenation of oils.\n2. **Color Formation**: Ions having partially filled $d$-orbitals ($d^1$ to $d^9$) undergo $d-d$ electronic transitions by absorbing specific visible wavelengths. $Sc^{3+} (3d^0)$ and $Zn^{2+} (3d^{10})$ are colorless.\n   *Exception*: $KMnO_4$ (deep purple, $Mn^{7+}$ has $d^0$) and $K_2Cr_2O_7$ (orange, $Cr^{6+}$ has $d^0$) are intensely colored due to **Charge Transfer Spectra** (Ligand-to-Metal Charge Transfer, LMCT), NOT $d-d$ transitions.\n3. **Magnetic Properties**: Paramagnetism arises from unpaired electrons:\n   $$\\mu_{\\text{spin-only}} = \\sqrt{n(n + 2)}\\text{ Bohr Magnetons (BM)}$$\n4. **Interstitial Compounds**: Formed when small non-metal atoms like H, B, C, or N are trapped inside the crystal lattices of transition metals (e.g., $TiC, Fe_3H, TiH_{1.7}$). They are non-stoichiometric, chemically inert, harder than parent metals, and retain metallic electrical conductivity.",
        ncertPointers: [
          "Alloys are readily formed between transition elements because their atomic radii are within 15% of each other (Hume-Rothery rule). Examples: Brass (Cu + Zn), Bronze (Cu + Sn).",
        ],
      },
      {
        title: "Lanthanoids, Actinoids & Lanthanoid Contraction",
        content:
          "**Lanthanoid Contraction**:\n- In the 4f series ($_{58}Ce$ to $_{71}Lu$), each added electron enters the inner $4f$ subshell. Because $4f$ orbitals have diffused shapes, their mutual shielding effect is very poor.\n- Consequently, the effective nuclear charge increases steadily, pulling electrons closer.\n- **Consequences of Lanthanoid Contraction (Classic CUET PYQs)**:\n  1. **Similarity of 4d and 5d elements**: Zirconium ($_{40}Zr$, $160\\text{ pm}$) and Hafnium ($_{72}Hf$, $159\\text{ pm}$) have almost identical atomic and ionic radii, making their chemical separation extremely difficult.\n  2. **Basic strength of hydroxides**: As size decreases from $La^{3+}$ to $Lu^{3+}$, covalent character of $M-OH$ bond increases (Fajans' rule). Therefore, $La(OH)_3$ is most basic and $Lu(OH)_3$ is least basic.\n  3. **Separation of Lanthanoids**: Due to tiny variations in ionic radii, separation requires modern ion-exchange chromatography.\n\n**Actinoids Comparison**:\n- Greater range of oxidation states (+3 to +7) compared to lanthanoids (+2, +3, +4) because $5f, 6d$, and $7s$ energy levels are of comparable energy.\n- Actinoid contraction is **greater** than lanthanoid contraction because $5f$ electrons exert even poorer shielding than $4f$.",
        ncertPointers: [
          "Mischmetal: Alloy of Lanthanoid metals (~95%), iron (~5%), and traces of S, C, Ca, Al. Used in cigarette lighters and bullet shells.",
          "Promethium ($_{61}Pm$) is the only radioactive lanthanoid.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Spin-Only Magnetic Moment",
        formula: "\\mu = \\sqrt{n(n + 2)}\\text{ BM}",
        symbols: "n = \\text{number of unpaired electrons}, \\text{BM} = \\text{Bohr Magneton}",
        siUnits: "\\text{BM} = 9.274 \\times 10^{-24}\\text{ J T}^{-1}",
        applicationCondition: "Applies to 3d transition metal complexes where orbital contribution is quenched",
      },
      {
        name: "Equivalent Weights of KMnO4 in Different Media",
        formula: "E_{\\text{acidic}} = \\frac{M}{5}, \\quad E_{\\text{neutral/alkaline}} = \\frac{M}{3}, \\quad E_{\\text{strongly basic}} = \\frac{M}{1}",
        symbols: "M = \\text{molar mass of } KMnO_4 (158\\text{ g/mol})",
        siUnits: "\\text{g / equivalent}",
        applicationCondition: "Redox titrations and quantitative stoichiometry",
      },
      {
        name: "Chromate-Dichromate pH Equilibrium",
        formula: "2 CrO_4^{2-} (\\text{yellow}) + 2 H^+ \\rightleftharpoons Cr_2O_7^{2-} (\\text{orange}) + H_2O",
        symbols: "CrO_4^{2-} = \\text{chromate}, Cr_2O_7^{2-} = \\text{dichromate}",
        siUnits: "Equilibrium reaction",
        applicationCondition: "pH < 7 favors dichromate; pH > 7 favors chromate",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="260" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Lanthanoid Contraction & 3d Unpaired Electron Curve</text>
  
  <!-- Left Side: Lanthanoid Contraction -->
  <g transform="translate(50, 60)">
    <rect width="300" height="170" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1"/>
    <text x="150" y="24" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Lanthanoid Contraction</text>
    <path d="M 40,70 L 260,130" fill="none" stroke="#f43f5e" strokeWidth="3"/>
    <circle cx="40" cy="70" r="6" fill="#38bdf8"/>
    <text x="40" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">La³⁺ (103 pm)</text>
    <circle cx="260" cy="130" r="4" fill="#38bdf8"/>
    <text x="260" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">Lu³⁺ (86 pm)</text>
    <text x="150" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="11">Poor 4f Shielding</text>
    <text x="150" y="160" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Zr ≈ Hf (160 pm ≈ 159 pm)</text>
  </g>

  <!-- Right Side: Magnetic Moment Peak -->
  <g transform="translate(410, 60)">
    <rect width="300" height="170" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1"/>
    <text x="150" y="24" textAnchor="middle" fill="#a855f7" fontSize="13" fontWeight="bold">Unpaired Electrons (3d Series)</text>
    <path d="M 30,130 Q 150,40 270,130" fill="none" stroke="#fbbf24" strokeWidth="3"/>
    <circle cx="30" cy="130" r="4" fill="#fbbf24"/>
    <text x="30" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Sc²⁺ (d¹)</text>
    <circle cx="150" cy="50" r="5" fill="#f43f5e"/>
    <text x="150" y="42" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">Mn²⁺ / Fe³⁺ (d⁵, n=5)</text>
    <text x="150" y="80" textAnchor="middle" fill="#fbbf24" fontSize="10">μ = 5.92 BM</text>
    <circle cx="270" cy="130" r="4" fill="#fbbf24"/>
    <text x="270" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Zn²⁺ (d¹⁰, n=0)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "chem_u4_we1",
        questionNumber: 1,
        question:
          "Calculate the spin-only magnetic moment of a divalent ion of an element with atomic number $Z = 25$ in aqueous solution.",
        options: [
          { id: "A", text: "3.87 BM" },
          { id: "B", text: "4.90 BM" },
          { id: "C", text: "5.92 BM" },
          { id: "D", text: "1.73 BM" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Element with $Z = 25$ is Manganese ($Mn$). Neutral configuration: $[Ar] 3d^5 4s^2$.",
          "Step 2: Divalent ion $Mn^{2+}$ loses the two $4s$ electrons: configuration is $[Ar] 3d^5 4s^0$.",
          "Step 3: In $3d^5$, all five d-orbitals have 1 electron $\\implies n = 5$ unpaired electrons.",
          "Step 4: Spin-only magnetic moment $\\mu = \\sqrt{n(n + 2)} = \\sqrt{5(5 + 2)} = \\sqrt{35} \\approx 5.916 \\approx 5.92\\text{ BM}$.",
        ],
        cuetTip: "Quick trick: The integer part of $\\mu$ always equals the number of unpaired electrons $n$! If $n=1 \\rightarrow 1.73$, $n=2 \\rightarrow 2.83$, $n=3 \\rightarrow 3.87$, $n=4 \\rightarrow 4.90$, $n=5 \\rightarrow 5.92$.",
      },
      {
        id: "chem_u4_we2",
        questionNumber: 2,
        question:
          "Zirconium ($_{40}Zr$) and Hafnium ($_{72}Hf$) exhibit almost identical chemical properties and atomic radii primarily because of:",
        options: [
          { id: "A", text: "Diagonal relationship" },
          { id: "B", text: "Inert pair effect" },
          { id: "C", text: "Lanthanoid contraction" },
          { id: "D", text: "Belonging to the same period" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Zr belongs to the 4d series (period 5) and Hf belongs to the 5d series (period 6).",
          "Step 2: Between La (57) and Hf (72), the 14 lanthanoid elements intervene with filling of the $4f$ subshell.",
          "Step 3: Due to poor shielding of $4f$ electrons, the progressive decrease in size (Lanthanoid Contraction) cancels the normal increase in size expected down a group.",
          "Step 4: Consequently, $Zr$ ($160\\text{ pm}$) and $Hf$ ($159\\text{ pm}$) have virtually identical radii and chemical behavior.",
        ],
        cuetTip: "Identical pairs caused by Lanthanoid Contraction in CUET: Zr-Hf, Nb-Ta, Mo-W.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Reasoning on Intense Color without d-d Transition",
        frequency: "Very High",
        pyqExample: {
          question:
            "Assertion (A): $KMnO_4$ is intensely purple in color even though $Mn^{7+}$ has no d-electrons ($3d^0$).\nReason (R): The color of $KMnO_4$ is due to charge transfer from oxygen ligands to the central metal atom.",
          options: [
            { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
            { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
            { id: "C", text: "A is true but R is false" },
            { id: "D", text: "A is false but R is true" },
          ],
          correctOption: "A",
          explanation: "In $MnO_4^-$, Mn is in +7 state ($3d^0$). The intense purple color is due to Ligand-to-Metal Charge Transfer (LMCT) from $O^{2-}$ to $Mn^{7+}$.",
        },
        strategy: "Whenever CUET asks why $KMnO_4$ or $K_2Cr_2O_7$ are colored despite $d^0$, the answer is ALWAYS 'Charge Transfer Spectra', NEVER $d-d$ transition.",
      },
      {
        type: "Oxidation State & Basicity Order",
        frequency: "High",
        pyqExample: {
          question:
            "Which of the following orders of basic strength of lanthanoid hydroxides is CORRECT?",
          options: [
            { id: "A", text: "La(OH)₃ > Ce(OH)₃ > Lu(OH)₃" },
            { id: "B", text: "Lu(OH)₃ > Ce(OH)₃ > La(OH)₃" },
            { id: "C", text: "Ce(OH)₃ > La(OH)₃ > Lu(OH)₃" },
            { id: "D", text: "La(OH)₃ = Lu(OH)₃" },
          ],
          correctOption: "A",
          explanation: "Size decreases from $La^{3+}$ to $Lu^{3+}$. Smaller cation has greater polarizing power (Fajans' rule), increasing covalent character of M-OH bond, so basicity decreases from La(OH)3 to Lu(OH)3.",
        },
        strategy: "Remember: La is largest $\\implies$ most ionic $\\implies$ most basic. Lu is smallest $\\implies$ most covalent $\\implies$ least basic.",
      },
    ],
    commonTraps: [
      {
        misconception: "Considering Zinc, Cadmium, and Mercury as true transition elements.",
        whyWrong: "Transition elements by IUPAC definition require an incomplete d-subshell. Zn, Cd, and Hg have full $d^{10}$ in both ground states and common oxidation states ($Zn^{2+}, Cd^{2+}, Hg^{2+}$).",
        correctUnderstanding: "Zn, Cd, and Hg are d-block elements, but NOT transition elements.",
      },
      {
        misconception: "Writing $Cr$ as $3d^4 4s^2$ and $Cu$ as $3d^9 4s^2$.",
        whyWrong: "One electron shifts from $4s$ to $3d$ to achieve the extraordinary exchange energy of half-filled ($3d^5$) and fully-filled ($3d^{10}$) configurations.",
        correctUnderstanding: "Chromium is strictly $[Ar] 3d^5 4s^1$ and Copper is strictly $[Ar] 3d^{10} 4s^1$.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Magnetic Moment Integer Rule",
        mnemonic: "Unpaired Count = Integer Before Decimal.",
        rule: "1 unpaired $\\implies 1.73\\text{ BM}$; 2 unpaired $\\implies 2.83\\text{ BM}$; 3 unpaired $\\implies 3.87\\text{ BM}$; 4 unpaired $\\implies 4.90\\text{ BM}$; 5 unpaired $\\implies 5.92\\text{ BM}$.",
        shortcut: "If $\\mu = 3.87$, immediately write $n = 3$. If $n = 4$, look for the option starting with 4.9.",
        whenToApply: "Spin-only magnetic moment MCQs.",
      },
      {
        title: "Chromate pH Shift",
        mnemonic: "Acid turns yellow to Orange (AO). Base turns orange to Yellow (BY).",
        rule: "Low pH (acidic) favors $Cr_2O_7^{2-}$ (orange). High pH (basic) favors $CrO_4^{2-}$ (yellow).",
        shortcut: "Add acid $\\rightarrow$ orange. Add base $\\rightarrow$ yellow.",
        whenToApply: "Chemical test questions on dichromate equilibria.",
      },
    ],
    quickRevisionCard: {
      title: "d- & f-Block Elements — Revision Card",
      bulletPoints: [
        "Transition element: Incomplete $d$-subshell in atom or ion. Zn, Cd, Hg are excluded.",
        "Exceptions: $Cr = [Ar] 3d^5 4s^1$, $Cu = [Ar] 3d^{10} 4s^1$.",
        "Max oxidation state in 3d series: Manganese (+7 in $KMnO_4$).",
        "Positive $E^\\circ_{M^{2+}/M}$: Only Copper ($+0.34\\text{ V}$).",
        "Color in $KMnO_4$ and $K_2Cr_2O_7$: Charge Transfer (LMCT), NOT d-d transition.",
        "Magnetic moment: $\\mu = \\sqrt{n(n + 2)}\\text{ BM}$. Max for $Mn^{2+} (d^5) = 5.92\\text{ BM}$.",
        "Lanthanoid contraction: Due to poor $4f$ shielding. Causes $Zr \\approx Hf$ and $Nb \\approx Ta$.",
        "Basicity order: $La(OH)_3 > Ce(OH)_3 > \\dots > Lu(OH)_3$ (least basic).",
        "Only radioactive lanthanoid: Promethium ($_{61}Pm$).",
        "KMnO4 in acidic medium: 5 electrons transferred ($Mn^{7+} \\rightarrow Mn^{2+}$). Equivalent wt $= M/5$.",
      ],
    },
    practiceQuestions: [
      {
        id: "chem_u4_q1",
        question: "Which of the following 3d-series ions is COLORLESS in aqueous solution?",
        type: "standard",
        options: [
          { id: "A", text: "Ti³⁺" },
          { id: "B", text: "V³⁺" },
          { id: "C", text: "Sc³⁺" },
          { id: "D", text: "Fe²⁺" },
        ],
        correctOption: "C",
        explanation: "$Sc^{3+}$ has configuration $[Ar] 3d^0$. With no d-electrons, d-d transitions cannot occur, making it completely colorless.",
        difficulty: "easy",
      },
      {
        id: "chem_u4_q2",
        question: "The pair of elements having almost identical atomic radii due to lanthanoid contraction is:",
        type: "standard",
        options: [
          { id: "A", text: "Fe and Co" },
          { id: "B", text: "Zr and Hf" },
          { id: "C", text: "Sc and Y" },
          { id: "D", text: "Cu and Ag" },
        ],
        correctOption: "B",
        explanation: "Zirconium ($_{40}Zr$) and Hafnium ($_{72}Hf$) have nearly identical radii ($160\\text{ pm}$ vs $159\\text{ pm}$) due to the intervening 4f lanthanoid contraction.",
        difficulty: "easy",
      },
      {
        id: "chem_u4_q3",
        question: "The equivalent weight of $KMnO_4$ in acidic medium is (M = molar mass):",
        type: "standard",
        options: [
          { id: "A", text: "M / 1" },
          { id: "B", text: "M / 3" },
          { id: "C", text: "M / 5" },
          { id: "D", text: "M / 6" },
        ],
        correctOption: "C",
        explanation: "In acidic medium, $MnO_4^- + 8H^+ + 5e^- \\rightarrow Mn^{2+} + 4H_2O$. Since 5 electrons are gained, equivalent weight $= M/5$.",
        difficulty: "easy",
      },
      {
        id: "chem_u4_q4",
        question: "Assertion (A): $Cu^{2+}$ is more stable than $Cu^+$ in aqueous solutions.\nReason (R): The much higher hydration enthalpy of $Cu^{2+}$ more than compensates for its second ionization enthalpy.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "In aqueous solution, $2Cu^+ \\rightarrow Cu^{2+} + Cu$ (disproportionation) occurs because the high hydration enthalpy of $Cu^{2+}$ stabilizes it over $Cu^+$.",
        difficulty: "medium",
      },
      {
        id: "chem_u4_q5",
        question: "Match List-I (Catalyst) with List-II (Industrial Process):\nP. V₂O₅\nQ. Finely divided Fe\nR. TiCl₄ + Al(C₂H₅)₃ (Ziegler-Natta)\nS. PdCl₂ (Wacker process)",
        type: "match-the-following",
        options: [
          { id: "A", text: "P-Contact process (H2SO4), Q-Haber process (NH3), R-Polymerization of ethene, S-Oxidation of ethene to ethanal" },
          { id: "B", text: "P-Haber process, Q-Contact process, R-Oxidation of ethene, S-Polymerization" },
          { id: "C", text: "P-Contact process, Q-Polymerization, R-Haber process, S-Oxidation of ethene" },
          { id: "D", text: "P-Polymerization, Q-Haber process, R-Contact process, S-Oxidation of ethene" },
        ],
        correctOption: "A",
        explanation: "V2O5 is used in Contact process; Fe in Haber's process; Ziegler-Natta in HDPE polymerization; PdCl2 in Wacker process.",
        difficulty: "medium",
      },
      {
        id: "chem_u4_q6",
        question: "Which of the following ions has the highest magnetic moment?",
        type: "standard",
        options: [
          { id: "A", text: "Fe²⁺" },
          { id: "B", text: "Mn²⁺" },
          { id: "C", text: "Cr³⁺" },
          { id: "D", text: "Co²⁺" },
        ],
        correctOption: "B",
        explanation: "$Mn^{2+}$ has $3d^5$ with 5 unpaired electrons, giving $\\mu = \\sqrt{5 \\times 7} = 5.92\\text{ BM}$ (highest possible in 3d series).",
        difficulty: "easy",
      },
      {
        id: "chem_u4_q7",
        question: "Mischmetal is predominantly composed of:",
        type: "standard",
        options: [
          { id: "A", text: "Lanthanoid metal (~95%) and iron (~5%)" },
          { id: "B", text: "Actinoid metal (~95%) and copper (~5%)" },
          { id: "C", text: "Chromium (~95%) and nickel (~5%)" },
          { id: "D", text: "Titanium (~95%) and aluminum (~5%)" },
        ],
        correctOption: "A",
        explanation: "Mischmetal consists of a lanthanoid metal (~95%, primarily cerium and lanthanum) and iron (~5%), with traces of S, C, Ca, and Al.",
        difficulty: "easy",
      },
      {
        id: "chem_u4_q8",
        question: "When yellow potassium chromate ($K_2CrO_4$) is acidified, it turns orange due to the formation of:",
        type: "standard",
        options: [
          { id: "A", text: "Cr³⁺ ions" },
          { id: "B", text: "Cr₂O₇²⁻ ions" },
          { id: "C", text: "CrO₃" },
          { id: "D", text: "CrO₅" },
        ],
        correctOption: "B",
        explanation: "In acidic solution, yellow chromate dimerizes: $2CrO_4^{2-} + 2H^+ \\rightleftharpoons Cr_2O_7^{2-} + H_2O$ (orange dichromate).",
        difficulty: "easy",
      },
      {
        id: "chem_u4_q9",
        question: "Which of the following transition metals exhibits the MAXIMUM number of oxidation states?",
        type: "standard",
        options: [
          { id: "A", text: "Sc" },
          { id: "B", text: "Cr" },
          { id: "C", text: "Mn" },
          { id: "D", text: "Fe" },
        ],
        correctOption: "C",
        explanation: "Manganese has 7 valence electrons ($3d^5 4s^2$) and exhibits all oxidation states from +2 to +7 (+2, +3, +4, +5, +6, +7).",
        difficulty: "easy",
      },
      {
        id: "chem_u4_q10",
        question: "Interstitial compounds formed by transition metals are characterized by:",
        type: "standard",
        options: [
          { id: "A", text: "High melting points, higher than parent metals" },
          { id: "B", text: "Being very hard" },
          { id: "C", text: "Retaining metallic conductivity" },
          { id: "D", text: "All of the above" },
        ],
        correctOption: "D",
        explanation: "Interstitial compounds ($TiC, Fe_3H$) have high melting points, extreme hardness, retain conductivity, and are chemically inert.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["chemistry_u1_t1"],
      relatedTopics: ["chemistry_u5_t1"],
      practiceTestId: "practice-chemistry-unit4-test1",
      practiceTestUrl: "/test/practice-chemistry-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=chemistry",
      weaknessRadarUrl: "/dashboard/radar?subject=chemistry",
    },
    subjectSpecific: {
      chemistry: {
        exceptionsList: [
          "$KMnO_4$ is purple without any d-electrons ($3d^0$) due to Charge Transfer from oxygen to manganese.",
          "Copper has positive $E^\\circ(Cu^{2+}/Cu) = +0.34\\text{ V}$ and does not react with dilute $HCl$ or dilute $H_2SO_4$.",
        ],
        trendsTable: [
          { property: "Atomic Radii in 3d Series", trend: "Decreases Sc to Cr, nearly constant Fe to Ni, slightly rises Cu to Zn", reason: "Nuclear charge increase balanced by shielding of added 3d electrons" },
          { property: "Basicity of Lanthanoid Hydroxides", trend: "Decreases from La(OH)3 to Lu(OH)3", reason: "Smaller size increases covalent character (Fajans' rule)" },
        ],
      },
    },
  },

  // Unit 5: Coordination Compounds
  {
    id: "chemistry_u5_t1",
    slug: "werner-s-theory-iupac-nomenclature-valence-bond-and-crystal-field-theories-isomerism",
    subject: "chemistry",
    subjectName: "Chemistry",
    subjectCode: "306",
    unitNumber: 5,
    unitTitle: "Coordination Compounds",
    topicTitle: "Werner's Theory, IUPAC Nomenclature, Valence Bond & Crystal Field Theories, Isomerism",
    ncertReference: {
      class: "Class 12",
      book: "Chemistry Part 1",
      chapterNumber: 5,
      chapterName: "Coordination Compounds",
      sections: [
        "5.1 Werner's Theory of Coordination Compounds",
        "5.2 Definitions of Important Terms & Ligand Classification",
        "5.3 Nomenclature of Coordination Compounds",
        "5.4 Isomerism in Coordination Compounds",
        "5.5 Bonding in Coordination Compounds: VBT and CFT",
        "5.6 Bonding in Metal Carbonyls (Synergic Bonding)",
        "5.7 Importance and Applications of Coordination Compounds",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4 questions per shift)",
      totalPyqsInRepo: 110,
      weightagePercentage: 9.0,
    },
    summary30Seconds: [
      "Werner's Theory: Primary valency is ionizable (= oxidation state, satisfied by anions); Secondary valency is non-ionizable (= coordination number, directional, satisfied by ligands).",
      "IUPAC: Cation named first; ligands named alphabetically (anionic end in '-o', neutral like $H_2O$: aqua, $NH_3$: ammine, $CO$: carbonyl); metal name ends in '-ate' if complex is anionic.",
      "Isomerism: Structural (Ionization, Solvate, Linkage via ambidentate $NO_2^-/SCN^-$, Coordination); Stereoisomerism (Geometrical: cis/trans, fac/mer in $[Ma_3b_3]$; Optical: non-superimposable mirror images in $[M(en)_3]^{3+}$ and cis-$[M(en)_2Cl_2]^+$).",
      "Valence Bond Theory: Strong field ligands cause electron pairing $\\implies$ inner orbital complex ($d^2sp^3$, low spin, diamagnetic); Weak field ligands retain unpaired electrons $\\implies$ outer orbital complex ($sp^3d^2$, high spin).",
      "Crystal Field Theory (CFT): In octahedral field, degenerate d-orbitals split into lower $t_{2g}$ ($d_{xy}, d_{yz}, d_{zx}$, $-0.4\\Delta_o$) and higher $e_g$ ($d_{z^2}, d_{x^2-y^2}$, $+0.6\\Delta_o$). In tetrahedral field, $\\Delta_t = \\frac{4}{9}\\Delta_o$ and splitting is inverted.",
      "Metal Carbonyls exhibit Synergic Bonding: $\\sigma$-bond ($CO \\rightarrow M$) strengthened by $\\pi$-backbonding ($M \\rightarrow \\pi^* CO$). Increases $M-C$ bond strength and weakens $C-O$ bond.",
    ],
    coreConcepts: [
      {
        title: "Werner's Theory, Ligands & IUPAC Nomenclature",
        content:
          "**Werner's Theory Postulates**:\n1. Metals exhibit two types of valencies: Primary (ionizable, corresponds to oxidation state) and Secondary (non-ionizable, corresponds to coordination number).\n2. Secondary valencies are directional and project toward fixed spatial positions, giving the complex its definite geometry (e.g., octahedral, tetrahedral, square planar).\n- *Classic Precipitation Test*: $CoCl_3 \\cdot 6NH_3 = [Co(NH_3)_6]Cl_3 \\implies 3$ moles of $AgCl$ ppt with excess $AgNO_3$; $CoCl_3 \\cdot 5NH_3 = [Co(NH_3)_5Cl]Cl_2 \\implies 2$ moles $AgCl$; $CoCl_3 \\cdot 4NH_3 = [Co(NH_3)_4Cl_2]Cl \\implies 1$ mole $AgCl$.\n\n**Ligand Classification**:\n- **Denticity**: Unidentate ($Cl^-, NH_3, H_2O$), Bidentate (Oxalate $C_2O_4^{2-}$, Ethane-1,2-diamine $en$), Hexadentate ($EDTA^{4-}$).\n- **Ambidentate Ligands**: Can coordinate through two different donor atoms (e.g., $NO_2^-$ via N: nitro; $ONO^-$ via O: nitrito; $SCN^-$: thiocyanato; $NCS^-$: isothiocyanato). Gives rise to **Linkage Isomerism**.\n- **Chelate Effect**: Chelating ligands forming 5- or 6-membered rings with the central metal confer extraordinary thermodynamic stability to the complex (e.g., $[Co(en)_3]^{3+}$ is vastly more stable than $[Co(NH_3)_6]^{3+}$ due to positive entropy change $\\Delta S > 0$).",
        ncertPointers: [
          "EDTA4- is used for estimating water hardness (titration with Ca2+/Mg2+) and in lead poisoning treatment.",
        ],
      },
      {
        title: "Isomerism in Coordination Compounds",
        content:
          "**1. Structural Isomerism**:\n- **Ionization**: Interchange of ligand inside sphere with counter ion outside (e.g., $[Co(NH_3)_5SO_4]Br$ gives $AgBr$ ppt vs $[Co(NH_3)_5Br]SO_4$ gives $BaSO_4$ ppt).\n- **Solvate / Hydrate**: Differ in whether solvent water is inside or outside coordination sphere (e.g., $[Cr(H_2O)_6]Cl_3$ violet vs $[Cr(H_2O)_5Cl]Cl_2 \\cdot H_2O$ grey-green).\n- **Linkage**: Occurs with ambidentate ligands (e.g., $[Co(NH_3)_5(NO_2)]Cl_2$ yellow vs $[Co(NH_3)_5(ONO)]Cl_2$ red).\n- **Coordination**: Interchange of ligands between cationic and anionic complex entities (e.g., $[Co(NH_3)_6][Cr(CN)_6]$ and $[Cr(NH_3)_6][Co(CN)_6]$).\n\n**2. Stereoisomerism**:\n- **Geometrical (cis/trans)**:\n  - Square planar $[Ma_2b_2]$ (e.g., cisplatin $[Pt(NH_3)_2Cl_2]$: cis-isomer is an anti-cancer drug; trans is inactive).\n  - Octahedral $[Ma_4b_2]$ (e.g., $[Co(NH_3)_4Cl_2]^+$: cis is violet, trans is green).\n  - Octahedral $[Ma_3b_3]$: Exhibits **fac-mer** isomerism (facial: three identical ligands on the same triangular face; meridional: three ligands around a meridian).\n- **Optical Isomerism (Enantiomers)**:\n  - Optical activity requires lack of plane of symmetry.\n  - Tris-bidentate complexes: $[Co(en)_3]^{3+}$ exists as non-superimposable d- and l-enantiomers.\n  - Bis-bidentate complexes: **cis-$[Co(en)_2Cl_2]^+$ is optically active**, whereas **trans-$[Co(en)_2Cl_2]^+$ has a plane of symmetry and is optically INACTIVE**.",
        ncertPointers: [
          "Square planar complexes of the type [Ma4], [Ma3b], [Mab3] do NOT show geometrical isomerism.",
          "Tetrahedral complexes do not show geometrical isomerism because all positions are adjacent to each other.",
        ],
      },
      {
        title: "Crystal Field Theory (CFT) & Synergic Bonding",
        content:
          "CFT considers metal-ligand bonds as purely electrostatic interactions.\n- **Octahedral Splitting ($\\Delta_o$)**:\n  - Ligands approach along the Cartesian axes ($x, y, z$). Orbitals pointing along axes ($d_{z^2}, d_{x^2-y^2}$) experience greater repulsion $\\rightarrow$ rise in energy by $+0.6\\Delta_o$ ($e_g$ set).\n  - Orbitals between axes ($d_{xy}, d_{yz}, d_{zx}$) experience less repulsion $\\rightarrow$ drop in energy by $-0.4\\Delta_o$ ($t_{2g}$ set).\n- **Spectrochemical Series** (increasing field strength $\\Delta_o$):\n  $$I^- < Br^- < S^{2-} < SCN^- < Cl^- < F^- < OH^- < C_2O_4^{2-} < H_2O < NCS^- < edta^{4-} < NH_3 < en < CN^- < CO$$\n- **Electron Filling ($d^4$ to $d^7$)**:\n  1. **Weak Field Ligands ($\\Delta_o < P$, Pairing Energy)**: High-spin configuration (e.g., $d^4 = t_{2g}^3 e_g^1$).\n  2. **Strong Field Ligands ($\\Delta_o > P$)**: Low-spin configuration (e.g., $d^4 = t_{2g}^4 e_g^0$).\n- **Tetrahedral Splitting ($\\Delta_t$)**:\n  - Splitting is inverted: $e$ lower, $t_2$ higher. $\\Delta_t = \\frac{4}{9}\\Delta_o$. Since $\\Delta_t$ is always $< P$, tetrahedral complexes are **almost always high spin**.\n- **Synergic Bonding in Metal Carbonyls (e.g., $Ni(CO)_4, Fe(CO)_5$)**:\n  - $\\sigma$-bond formed by donation of lone pair on carbonyl carbon into vacant metal d-orbital.\n  - $\\pi$-backbond formed by donation of electron density from filled metal $d$-orbital into vacant antibonding $\\pi^*$ orbital of $CO$.\n  - This back-donation strengthens the $M-C$ bond and weakens the $C-O$ bond (lowering the $C-O$ stretching frequency in IR).",
        ncertPointers: [
          "Chlorophyll is a coordination compound of Magnesium (Mg); Hemoglobin is of Iron (Fe); Vitamin B12 (cyanocobalamin) is of Cobalt (Co); Cisplatin [Pt(NH3)2Cl2] is anti-cancer.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Crystal Field Stabilization Energy (CFSE) for Octahedral",
        formula: "\\text{CFSE} = \\left[-0.4 \\cdot n(t_{2g}) + 0.6 \\cdot n(e_g)\\right] \\Delta_o + m P",
        symbols: "n(t_{2g}), n(e_g) = \\text{electron counts}, P = \\text{pairing energy}, m = \\text{extra pairs}",
        siUnits: "\\text{kJ mol}^{-1} \\text{ or } \\text{cm}^{-1}",
        applicationCondition: "Octahedral coordination complexes",
      },
      {
        name: "Tetrahedral to Octahedral Splitting Relation",
        formula: "\\Delta_t = \\frac{4}{9} \\Delta_o",
        symbols: "\\Delta_t = \\text{tetrahedral crystal field splitting}, \\Delta_o = \\text{octahedral splitting}",
        siUnits: "\\text{cm}^{-1}",
        applicationCondition: "Same metal, same ligands, same M-L distance",
      },
      {
        name: "Werner Precipitation Moles",
        formula: "\\text{Moles of } AgCl = \\text{Number of chloride ions outside the coordination sphere}",
        symbols: "[Co(NH_3)_6]Cl_3 \\rightarrow 3 AgCl; \\quad [Co(NH_3)_5Cl]Cl_2 \\rightarrow 2 AgCl",
        siUnits: "Moles",
        applicationCondition: "Addition of excess AgNO3 to coordinate complexes",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 270" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="270" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Crystal Field Splitting in Octahedral Field (Δo)</text>

  <!-- Left: Free ion 5 degenerate orbitals -->
  <g transform="translate(60, 140)">
    <rect x="0" y="0" width="22" height="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
    <rect x="25" y="0" width="22" height="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
    <rect x="50" y="0" width="22" height="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
    <rect x="75" y="0" width="22" height="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
    <rect x="100" y="0" width="22" height="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
    <text x="61" y="42" textAnchor="middle" fill="#94a3b8" fontSize="11">Free Metal Ion</text>
  </g>

  <!-- Center: Spherical crystal field -->
  <g transform="translate(270, 120)">
    <rect x="0" y="0" width="22" height="22" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5"/>
    <rect x="25" y="0" width="22" height="22" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5"/>
    <rect x="50" y="0" width="22" height="22" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5"/>
    <rect x="75" y="0" width="22" height="22" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5"/>
    <rect x="100" y="0" width="22" height="22" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="61" y="42" textAnchor="middle" fill="#94a3b8" fontSize="10">Average Energy</text>
  </g>

  <!-- Right: Splitting into eg and t2g -->
  <!-- eg set (higher) -->
  <g transform="translate(530, 70)">
    <rect x="15" y="0" width="24" height="24" fill="#1e293b" stroke="#f43f5e" strokeWidth="2"/>
    <rect x="45" y="0" width="24" height="24" fill="#1e293b" stroke="#f43f5e" strokeWidth="2"/>
    <text x="42" y="-8" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="bold">eg (+0.6 Δo)</text>
    <text x="42" y="38" textAnchor="middle" fill="#fda4af" fontSize="9">dz², dx²-y²</text>
  </g>

  <!-- t2g set (lower) -->
  <g transform="translate(515, 175)">
    <rect x="0" y="0" width="24" height="24" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <rect x="30" y="0" width="24" height="24" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <rect x="60" y="0" width="24" height="24" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <text x="42" y="40" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">t2g (-0.4 Δo)</text>
    <text x="42" y="55" textAnchor="middle" fill="#86efac" fontSize="9">dxy, dyz, dzx</text>
  </g>

  <!-- Splitting delta arrow -->
  <line x1="620" y1="82" x2="620" y2="187" stroke="#38bdf8" strokeWidth="2"/>
  <text x="640" y="140" fill="#38bdf8" fontSize="13" fontWeight="bold">Δo</text>
</svg>`,
    workedExamples: [
      {
        id: "chem_u5_we1",
        questionNumber: 1,
        question:
          "The IUPAC name of the complex $[Co(NH_3)_5(CO_3)]Cl$ is:",
        options: [
          { id: "A", text: "Pentaamminecarbonatocobalt(III) chloride" },
          { id: "B", text: "Carbonatopentaamminecobalt(III) chloride" },
          { id: "C", text: "Pentaamminecarbonatocobaltate(III) chloride" },
          { id: "D", text: "Pentaamminecarbonatocobalt(II) chloride" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Identify oxidation state of Cobalt: $x + 5(0) + (-2) + (-1) = 0 \\implies x - 3 = 0 \\implies x = +3$.",
          "Step 2: Cationic complex $[Co(NH_3)_5(CO_3)]^+$ is named first. Metal retains standard name 'cobalt' (not cobaltate, which is only used for anionic complexes).",
          "Step 3: Ligands in alphabetical order: 'ammine' (starts with 'a') before 'carbonato' (starts with 'c'). Pentaammine + carbonato.",
          "Step 4: Putting together: Pentaamminecarbonatocobalt(III) chloride.",
        ],
        cuetTip: "Spelling matters in CUET: Ammine in coordination complexes has DOUBLE 'm' (ammine), whereas organic amines have a single 'm' (amine).",
      },
      {
        id: "chem_u5_we2",
        questionNumber: 2,
        question:
          "Which of the following complexes is OPTICALLY ACTIVE?",
        options: [
          { id: "A", text: "trans-[Co(en)₂Cl₂]⁺" },
          { id: "B", text: "cis-[Co(en)₂Cl₂]⁺" },
          { id: "C", text: "trans-[Pt(NH₃)₂Cl₂]" },
          { id: "D", text: "[Co(NH₃)₄Cl₂]⁺" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Optical activity requires the molecule to be chiral (absence of plane of symmetry and center of inversion).",
          "Step 2: trans-$[Co(en)_2Cl_2]^+$ has a plane of symmetry passing through the metal and the two chloride ligands $\\implies$ achiral and optically inactive.",
          "Step 3: cis-$[Co(en)_2Cl_2]^+$ lacks any plane or center of symmetry $\\implies$ chiral, non-superimposable on its mirror image $\\implies$ optically active.",
        ],
        cuetTip: "Gold standard CUET rule: 'cis is active, trans is inactive' for bis-bidentate complexes like $[M(en)_2Cl_2]$.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Precipitation Moles from Werner Theory",
        frequency: "Very High",
        pyqExample: {
          question:
            "When 0.1 mol of $CoCl_3 \\cdot 5NH_3$ is treated with excess $AgNO_3$, 0.2 mol of $AgCl$ is precipitated. The formulation of the complex is:",
          options: [
            { id: "A", text: "[Co(NH₃)₅Cl]Cl₂" },
            { id: "B", text: "[Co(NH₃)₄Cl₂]Cl · NH₃" },
            { id: "C", text: "[Co(NH₃)₅]Cl₃" },
            { id: "D", text: "[Co(NH₃)₃Cl₃]" },
          ],
          correctOption: "A",
          explanation: "0.1 mol gives 0.2 mol AgCl $\\implies 2$ chloride ions per formula unit are outside the coordination sphere as counter ions: $[Co(NH_3)_5Cl]Cl_2$.",
        },
        strategy: "Divide moles of AgCl by moles of complex: $\\frac{0.2}{0.1} = 2$. Exactly 2 chloride ions must be outside the square brackets.",
      },
      {
        type: "Synergic Bonding in Metal Carbonyls",
        frequency: "High",
        pyqExample: {
          question:
            "In metal carbonyls, the C-O bond order decreases and C-O bond length increases due to:",
          options: [
            { id: "A", text: "Synergic π-backbonding from filled metal d-orbital to vacant antibonding π* orbital of CO" },
            { id: "B", text: "σ-donation from CO to metal" },
            { id: "C", text: "Electrostatic attraction" },
            { id: "D", text: "Hydrogen bonding" },
          ],
          correctOption: "A",
          explanation: "Back-donation into the antibonding $\\pi^*$ orbital of CO weakens the C-O triple bond, decreasing its bond order and increasing bond length.",
        },
        strategy: "Remember: Backbonding strengthens the M-C bond, but WEAKENS the C-O bond.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming all square planar complexes show optical isomerism.",
        whyWrong: "Square planar complexes lie completely in a single plane, so the molecular plane itself acts as a plane of symmetry ($xy$-plane).",
        correctUnderstanding: "Square planar complexes are almost always optically INACTIVE due to the presence of the molecular plane of symmetry.",
      },
      {
        misconception: "Using '-ate' suffix for metals in neutral or cationic complexes.",
        whyWrong: "The '-ate' suffix (ferrate, cuprate, cobaltate) is reserved STRICTLY for anionic complexes.",
        correctUnderstanding: "In $[Fe(H_2O)_6]^{2+}$, it is 'iron(II)'. In $[Fe(CN)_6]^{4-}$, it is 'ferrate(II)'.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Spectrochemical Series Shortcut",
        mnemonic: "I Brought Some Clean Flags Oh Ox Water No Edta Ammonia En CN CO.",
        rule: "$I^- < Br^- < S^{2-} < Cl^- < F^- < OH^- < ox^{2-} < H_2O < NCS^- < edta^{4-} < NH_3 < en < CN^- < CO$.",
        shortcut: "Halogens ($I, Br, Cl, F$) and Oxygen donors ($OH^-, H_2O, ox$) are WEAK field. Nitrogen ($NH_3, en$) and Carbon donors ($CN^-, CO$) are STRONG field.",
        whenToApply: "Predicting high-spin vs low-spin and magnetic properties in CFT.",
      },
      {
        title: "Fac-Mer Isomerism Mnemonic",
        mnemonic: "Fac = Face (same triangular face). Mer = Meridian (in a planar belt around equator).",
        rule: "$[Ma_3b_3]$ complexes exhibit facial (fac) and meridional (mer) isomerism.",
        shortcut: "Only applies to octahedral complexes with a 3:3 ligand ratio ($[Ma_3b_3]$).",
        whenToApply: "Stereoisomerism MCQs in coordination chemistry.",
      },
    ],
    quickRevisionCard: {
      title: "Coordination Compounds — Quick Card",
      bulletPoints: [
        "Primary valency: Oxidation state, ionizable, non-directional.",
        "Secondary valency: Coordination number, non-ionizable, directional (geometry).",
        "Ambidentate ligands: $NO_2^-/ONO^-$, $SCN^-/NCS^-$ cause linkage isomerism.",
        "Ionization isomerism: Interchange of ligand and counter ion ($[Co(NH_3)_5SO_4]Br$ vs $[Co(NH_3)_5Br]SO_4$).",
        "Optical activity: $[M(en)_3]^{3+}$ is chiral; cis-$[M(en)_2Cl_2]^+$ is chiral; trans is achiral (plane of symmetry).",
        "Octahedral CFT: $t_{2g}$ down by $0.4\\Delta_o$, $e_g$ up by $0.6\\Delta_o$.",
        "Tetrahedral CFT: $\\Delta_t = \\frac{4}{9}\\Delta_o$; always high-spin (no pairing).",
        "Strong ligands: $CO > CN^- > en > NH_3$ (pairing occurs, low-spin).",
        "Weak ligands: $H_2O, F^-, Cl^-, Br^-, I^-$ (no pairing, high-spin).",
        "Metal carbonyls: Synergic bonding strengthens M-C bond, weakens C-O bond.",
      ],
    },
    practiceQuestions: [
      {
        id: "chem_u5_q1",
        question: "The coordination number and oxidation state of Cobalt in $[Co(en)_2Cl_2]^+$ are respectively:",
        type: "standard",
        options: [
          { id: "A", text: "4 and +3" },
          { id: "B", text: "6 and +3" },
          { id: "C", text: "6 and +2" },
          { id: "D", text: "4 and +2" },
        ],
        correctOption: "B",
        explanation: "Ethane-1,2-diamine ($en$) is bidentate (contributes 2 $\\times$ 2 = 4 coordinate bonds), plus 2 monodentate $Cl^-$ gives CN = 6. Oxidation state: $x + 2(0) + 2(-1) = +1 \\implies x = +3$.",
        difficulty: "easy",
      },
      {
        id: "chem_u5_q2",
        question: "Which of the following compounds exhibits LINKAGE isomerism?",
        type: "standard",
        options: [
          { id: "A", text: "[Co(NH₃)₅(NO₂)]Cl₂" },
          { id: "B", text: "[Co(NH₃)₅SO₄]Br" },
          { id: "C", text: "[Cr(H₂O)₆]Cl₃" },
          { id: "D", text: "[Pt(NH₃)₂Cl₂]" },
        ],
        correctOption: "A",
        explanation: "$NO_2^-$ is an ambidentate ligand that can coordinate through Nitrogen ($-NO_2$) or Oxygen ($-ONO$), giving linkage isomerism.",
        difficulty: "easy",
      },
      {
        id: "chem_u5_q3",
        question: "According to Crystal Field Theory, for a $d^4$ ion in an octahedral field with a STRONG field ligand ($\\Delta_o > P$), the electronic configuration is:",
        type: "standard",
        options: [
          { id: "A", text: "t₂g³ eg¹" },
          { id: "B", text: "t₂g⁴ eg⁰" },
          { id: "C", text: "t₂g² eg²" },
          { id: "D", text: "t₂g⁰ eg⁴" },
        ],
        correctOption: "B",
        explanation: "When $\\Delta_o > P$, pairing is favored over jumping to the $e_g$ set. Hence all 4 electrons pair up in the lower $t_{2g}$ set: $t_{2g}^4 e_g^0$.",
        difficulty: "medium",
      },
      {
        id: "chem_u5_q4",
        question: "Assertion (A): $[Ni(CO)_4]$ is diamagnetic.\nReason (R): Carbon monoxide ($CO$) is a strong field ligand that forces the pairing of electrons in $Ni$ ($3d^8 4s^2$) into $3d^{10}$.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "$CO$ is a very strong field ligand. The two $4s$ electrons are pushed into the $3d$ subshell, resulting in a completely paired $[Ar] 3d^{10} 4s^0$ configuration ($sp^3$, diamagnetic).",
        difficulty: "medium",
      },
      {
        id: "chem_u5_q5",
        question: "The complex $[Ma_3b_3]$ exhibits which type of stereoisomerism?",
        type: "standard",
        options: [
          { id: "A", text: "cis-trans isomerism" },
          { id: "B", text: "facial-meridional (fac-mer) isomerism" },
          { id: "C", text: "Optical isomerism" },
          { id: "D", text: "Ionization isomerism" },
        ],
        correctOption: "B",
        explanation: "Octahedral complexes with formula $[Ma_3b_3]$ (such as $[Co(NH_3)_3(NO_2)_3]$) exhibit facial (fac) and meridional (mer) isomerism.",
        difficulty: "easy",
      },
      {
        id: "chem_u5_q6",
        question: "Which of the following ligands is a HEXADENTATE ligand?",
        type: "standard",
        options: [
          { id: "A", text: "en (ethane-1,2-diamine)" },
          { id: "B", text: "ox²⁻ (oxalate)" },
          { id: "C", text: "EDTA⁴⁻ (ethylenediaminetetraacetate)" },
          { id: "D", text: "dien (diethylenetriamine)" },
        ],
        correctOption: "C",
        explanation: "$EDTA^{4-}$ possesses 2 nitrogen donor atoms and 4 oxygen donor atoms from carboxylate groups, coordinating through 6 donor atoms.",
        difficulty: "easy",
      },
      {
        id: "chem_u5_q7",
        question: "Match List-I (Complex / Biological Entity) with List-II (Central Metal Atom):\nP. Chlorophyll\nQ. Hemoglobin\nR. Vitamin B₁₂\nS. Wilkinson's Catalyst",
        type: "match-the-following",
        options: [
          { id: "A", text: "P-Magnesium, Q-Iron, R-Cobalt, S-Rhodium" },
          { id: "B", text: "P-Iron, Q-Magnesium, R-Rhodium, S-Cobalt" },
          { id: "C", text: "P-Cobalt, Q-Iron, R-Magnesium, S-Rhodium" },
          { id: "D", text: "P-Magnesium, Q-Cobalt, R-Iron, S-Rhodium" },
        ],
        correctOption: "A",
        explanation: "Chlorophyll contains Mg; hemoglobin contains Fe; Vitamin B12 contains Co; Wilkinson's catalyst $[RhCl(PPh_3)_3]$ contains Rh.",
        difficulty: "easy",
      },
      {
        id: "chem_u5_q8",
        question: "The hybridization and shape of the complex $[Fe(CN)_6]^{3-}$ are:",
        type: "standard",
        options: [
          { id: "A", text: "sp³d², outer orbital octahedral" },
          { id: "B", text: "d²sp³, inner orbital octahedral" },
          { id: "C", text: "dsp², square planar" },
          { id: "D", text: "sp³, tetrahedral" },
        ],
        correctOption: "B",
        explanation: "$Fe^{3+}$ is $3d^5$. Under strong field ligand $CN^-$, electrons pair up leaving two vacant $3d$ orbitals, yielding $d^2sp^3$ (inner orbital octahedral).",
        difficulty: "medium",
      },
      {
        id: "chem_u5_q9",
        question: "The IUPAC name for $K_3[Fe(CN)_6]$ is:",
        type: "standard",
        options: [
          { id: "A", text: "Potassium hexacyanoferrate(II)" },
          { id: "B", text: "Potassium hexacyanoferrate(III)" },
          { id: "C", text: "Potassium hexacyanoiron(III)" },
          { id: "D", text: "Tripotassium hexacyanoferrate(III)" },
        ],
        correctOption: "B",
        explanation: "Anionic complex of Iron in +3 oxidation state ($3 + x - 6 = 0 \\implies x = +3$) is named Potassium hexacyanoferrate(III).",
        difficulty: "easy",
      },
      {
        id: "chem_u5_q10",
        question: "Assertion (A): trans-$[Co(en)_2Cl_2]^+$ is optically inactive.\nReason (R): trans-$[Co(en)_2Cl_2]^+$ possesses a plane of symmetry.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "The trans isomer has opposite $Cl^-$ ligands across the metal, creating an internal plane of symmetry that renders it superimposable on its mirror image (achiral).",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["chemistry_u4_t1"],
      relatedTopics: ["chemistry_u6_t1"],
      practiceTestId: "practice-chemistry-unit5-test1",
      practiceTestUrl: "/test/practice-chemistry-unit5-test1",
      weaknessReportUrl: "/dashboard/radar?subject=chemistry",
      weaknessRadarUrl: "/dashboard/radar?subject=chemistry",
    },
    subjectSpecific: {
      chemistry: {
        exceptionsList: [
          "Cisplatin cis-$[Pt(NH_3)_2Cl_2]$ is used as an effective anti-tumor cancer drug, whereas the trans-isomer is biologically inactive.",
          "Tetrahedral complexes do not show geometrical isomerism because all four ligand positions are equidistant and mutually adjacent.",
        ],
        trendsTable: [
          { property: "Spectrochemical Field Strength (Δo)", trend: "I- < Br- < Cl- < F- < OH- < H2O < NH3 < en < CN- < CO", reason: "Pi-acceptor ligands (CO, CN-) stabilize metal d-orbitals through backbonding, creating massive splitting" },
          { property: "Chelate Ring Stability", trend: "Chelates (5- or 6-membered rings) > Monodentate analogs", reason: "Favorable entropy change (Delta S > 0) when multidentate ligand displaces multiple monodentate molecules" },
        ],
      },
    },
  },
];
