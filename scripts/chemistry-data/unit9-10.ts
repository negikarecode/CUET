import { NoteDocument } from "@/types/notes";

export const units9and10Topics: NoteDocument[] = [
  // Unit 9: Amines
  {
    id: "chemistry_u9_t1",
    slug: "classification-preparation-diazonium-salts-and-synthetic-applications",
    subject: "chemistry",
    subjectName: "Chemistry",
    subjectCode: "306",
    unitNumber: 9,
    unitTitle: "Amines",
    topicTitle: "Classification, Preparation, Diazonium Salts and Synthetic Applications",
    ncertReference: {
      class: "Class 12",
      book: "Chemistry Part 2",
      chapterNumber: 9,
      chapterName: "Amines",
      sections: [
        "9.1 Structure & Classification of Amines",
        "9.2 Nomenclature of Amines",
        "9.3 Preparation of Amines (Gabriel Phthalimide, Hoffmann Bromamide)",
        "9.4 Physical Properties & Basicity of Amines (Aqueous vs Gaseous)",
        "9.5 Chemical Reactions (Carbylamine Test, Hinsberg Test, Acylation)",
        "9.6 Diazonium Salts: Preparation & Stability",
        "9.7 Synthetic Importance of Diazonium Salts (Sandmeyer, Gattermann, Azo Coupling)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4 questions per shift)",
      totalPyqsInRepo: 120,
      weightagePercentage: 8.5,
    },
    summary30Seconds: [
      "Basicity order in gaseous phase: 3° > 2° > 1° > NH3 (pure +I inductive effect).",
      "Basicity order in aqueous solution: Ethyl series: 2° > 3° > 1° > NH3 ((C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3); Methyl series: 2° > 1° > 3° > NH3 ((CH3)2NH > CH3NH2 > (CH3)3N > NH3) due to combined inductive, solvation, and steric effects.",
      "Aniline is vastly weaker base than ammonia ($pK_b = 9.38$ vs $4.75$) because lone pair on nitrogen is delocalized into the benzene ring over 5 resonance structures.",
      "Gabriel Phthalimide synthesis: Prepares pure aliphatic PRIMARY amines only. Aromatic primary amines CANNOT be prepared because aryl halides do not undergo nucleophilic substitution with phthalimide anion.",
      "Hoffmann Bromamide degradation: Primary acid amide $+ Br_2 + 4KOH \\rightarrow$ primary amine with ONE LESS carbon atom ($RCONH_2 \\rightarrow RNH_2$).",
      "Carbylamine test: Only primary amines (both aliphatic and aromatic) give an extremely foul-smelling isocyanide ($R-NC$) on heating with $CHCl_3 + alcoholic\\ KOH$. Secondary and tertiary amines give a negative test.",
      "Hinsberg test ($C_6H_5SO_2Cl$): 1° amine yields N-alkylbenzenesulphonamide soluble in alkali; 2° amine yields N,N-dialkylbenzenesulphonamide insoluble in alkali; 3° amine does not react.",
      "Diazonium salts ($ArN_2^+ Cl^-$): Stable only at $0-5^\\circ\\text{C}$ (273-278 K). Azo dye coupling with phenol at pH 9-10 gives orange p-hydroxyazobenzene; with aniline at pH 4-5 gives yellow p-aminoazobenzene.",
    ],
    coreConcepts: [
      {
        title: "Basicity of Amines: Gaseous versus Aqueous Phase",
        content:
          "Amines possess an unshared lone pair of electrons on nitrogen, making them Lewis bases and Brønsted-Lowry bases.\n\n1. **In Gaseous Phase (No Solvation)**:\n   Basicity is governed purely by the electron-donating inductive ($+I$) effect of alkyl groups:\n   $$3^\\circ > 2^\\circ > 1^\\circ > NH_3$$\n\n2. **In Aqueous Solution (Combined Effects)**:\n   Basicity is an interplay of three competing factors:\n   - **Inductive Effect ($+I$)**: Favors $3^\\circ > 2^\\circ > 1^\\circ$.\n   - **Hydration / Solvation Energy**: Substituted ammonium cations are stabilized by H-bonding with water. Greater number of hydrogens attached to nitrogen $\\implies$ greater hydration energy: $1^\\circ (RNH_3^+) > 2^\\circ (R_2NH_2^+) > 3^\\circ (R_3NH^+)$.\n   - **Steric Hindrance**: Bulky alkyl groups crowd the protonation site, disfavoring $3^\\circ$.\n   \n   *The Resulting Experimental Orders (Absolute CUET Essentials)*:\n   - **Ethyl groups ($-C_2H_5$)**: $2^\\circ > 3^\\circ > 1^\\circ > NH_3$:\n     $$(C_2H_5)_2NH > (C_2H_5)_3N > C_2H_5NH_2 > NH_3 \\quad (\\text{'231' Rule})$$\n   - **Methyl groups ($-CH_3$)**: $2^\\circ > 1^\\circ > 3^\\circ > NH_3$:\n     $$(CH_3)_2NH > CH_3NH_2 > (CH_3)_3N > NH_3 \\quad (\\text{'213' Rule})$$\n\n3. **Arylamines (Aniline)**:\n   Aniline is significantly less basic than cyclohexylamine and ammonia. The lone pair on nitrogen is in resonance with the benzene ring, reducing electron density on nitrogen. Additionally, anilinium ion ($C_6H_5NH_3^+$) has only 2 resonance structures, whereas aniline has 5 resonance structures; hence protonation is thermodynamically disfavored.",
        ncertPointers: [
          "Electron-withdrawing groups (-NO2, -CN, -X) decrease aniline basicity; electron-donating groups (-OCH3, -CH3) increase aniline basicity.",
        ],
      },
      {
        title: "Gabriel Phthalimide, Hoffmann Bromamide & Chemical Tests",
        content:
          "**1. Gabriel Phthalimide Synthesis**:\n- Phthalimide $+ KOH \\rightarrow$ Potassium phthalimide $\\xrightarrow{R-X} N$-alkylphthalimide $\\xrightarrow{aq. NaOH} R-NH_2$ ($1^\\circ$ amine) $+$ Sodium phthalate.\n- Produces pure primary amines without contamination by $2^\\circ$ or $3^\\circ$ amines.\n- *Limitation*: Aromatic primary amines cannot be prepared because aryl halides do not undergo nucleophilic substitution with potassium phthalimide due to resonance double-bond character of $C-X$.\n\n**2. Hoffmann Bromamide Degradation**:\n- Primary amide reacts with bromine in aqueous or ethanolic $KOH$:\n  $$R-CONH_2 + Br_2 + 4 KOH \\rightarrow R-NH_2 + K_2CO_3 + 2 KBr + 2 H_2O$$\n- Key Feature: The amine formed has **one carbon less** than the starting amide (descent of series).\n\n**3. Diagnostic Chemical Tests**:\n- **Carbylamine Test (Isocyanide Test)**: Heated with $CHCl_3$ and alcoholic $KOH$, primary amines form extremely offensive, foul-smelling carbylamines (isocyanides):\n  $$R-NH_2 + CHCl_3 + 3 KOH \\xrightarrow{\\Delta} R-NC + 3 KCl + 3 H_2O$$\n  Secondary and tertiary amines do NOT give this test.\n- **Hinsberg Test (Benzenesulphonyl Chloride, $C_6H_5SO_2Cl$)**:\n  - Primary amine $\\rightarrow N$-alkylbenzenesulphonamide, which has an acidic hydrogen on nitrogen and **dissolves in aqueous $KOH$**.\n  - Secondary amine $\\rightarrow N,N$-dialkylbenzenesulphonamide, which has NO hydrogen on nitrogen and is **insoluble in aqueous $KOH$**.\n  - Tertiary amine $\\rightarrow$ **No reaction** (no hydrogen attached to nitrogen).",
        ncertPointers: [
          "Acylation of aniline: Aniline is acetylated with acetic anhydride to acetanilide (-NHCOCH3) before nitration/bromination to prevent poly-substitution and oxidation by HNO3.",
        ],
      },
      {
        title: "Diazonium Salts & Synthetic Azo Dye Applications",
        content:
          "Benzene diazonium chloride ($C_6H_5N_2^+ Cl^-$) is prepared by diazotization of aniline with $NaNO_2 + HCl$ at $0-5^\\circ\\text{C}$ (273-278 K):\n$$C_6H_5NH_2 + NaNO_2 + 2 HCl \\xrightarrow{273-278\\text{ K}} C_6H_5N_2^+ Cl^- + NaCl + 2 H_2O$$\n\n**Synthetic Replacement of Diazonium Group**:\n1. **Sandmeyer Reaction**: $ArN_2^+ Cl^- \\xrightarrow{Cu_2Cl_2/HCl} Ar-Cl$; with $Cu_2Br_2/HBr \\rightarrow Ar-Br$; with $CuCN/KCN \\rightarrow Ar-CN$.\n2. **Gattermann Reaction**: $ArN_2^+ Cl^- \\xrightarrow{Cu/HCl} Ar-Cl$; with $Cu/HBr \\rightarrow Ar-Br$.\n3. **Replacement by Iodine**: $ArN_2^+ Cl^- + KI \\rightarrow Ar-I + N_2\\uparrow + KCl$ (does not need copper catalyst).\n4. **Balz-Schiemann Reaction**: $ArN_2^+ Cl^- + HBF_4 \\rightarrow Ar-N_2^+ BF_4^- \\xrightarrow{\\Delta} Ar-F + BF_3 + N_2$ (best synthesis of aryl fluorides).\n5. **Reduction to Benzene**: $ArN_2^+ Cl^- + H_3PO_2 + H_2O \\xrightarrow{Cu^+} C_6H_6 + H_3PO_3 + HCl + N_2$.\n\n**Azo Coupling Reactions (Dye Synthesis)**:\n- **Coupling with Phenol**: In alkaline medium (pH 9-10), diazonium ion couples at para-position to yield **p-hydroxyazobenzene (orange dye)**.\n- **Coupling with Aniline**: In mildly acidic medium (pH 4-5), couples at para-position to yield **p-aminoazobenzene (yellow dye)**.",
        ncertPointers: [
          "Aliphatic diazonium salts are extremely unstable and decompose immediately at 0°C to liberate nitrogen gas quantitatively and form alcohols.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Aqueous Basicity Rules",
        formula: "(C_2H_5)_2NH > (C_2H_5)_3N > C_2H_5NH_2 > NH_3 \\quad (231); \\quad (CH_3)_2NH > CH_3NH_2 > (CH_3)_3N > NH_3 \\quad (213)",
        symbols: "231 for Ethyl; 213 for Methyl",
        siUnits: "Basicity ranking in aqueous media",
        applicationCondition: "Aliphatic amines dissolved in water",
      },
      {
        name: "Hoffmann Bromamide Degradation",
        formula: "R-CONH_2 + Br_2 + 4 KOH \\rightarrow R-NH_2 + K_2CO_3 + 2 KBr + 2 H_2O",
        symbols: "Amide to primary amine with descent of carbon series",
        siUnits: "Chemical synthesis",
        applicationCondition: "Primary aliphatic or aromatic amides",
      },
      {
        name: "Carbylamine Reaction",
        formula: "R-NH_2 + CHCl_3 + 3 KOH \\xrightarrow{\\Delta} R-NC + 3 KCl + 3 H_2O",
        symbols: "R-NC = \\text{carbylamine / isocyanide (foul smelling)}",
        siUnits: "Diagnostic qualitative test",
        applicationCondition: "Specific to primary amines only (aliphatic and aromatic)",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="250" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Benzene Diazonium Chloride Synthetic Wheel</text>

  <!-- Central Hub: Diazonium Salt -->
  <circle cx="380" cy="135" r="45" fill="#1e293b" stroke="#38bdf8" strokeWidth="2"/>
  <text x="380" y="132" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">C₆H₅-N₂⁺Cl⁻</text>
  <text x="380" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9">0-5 °C</text>

  <!-- Spoke 1: Cu2Cl2/HCl -> Chlorobenzene -->
  <line x1="335" y1="135" x2="160" y2="90" stroke="#64748b" strokeWidth="1.5"/>
  <rect x="70" y="70" width="100" height="40" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="1"/>
  <text x="120" y="87" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">C₆H₅-Cl</text>
  <text x="120" y="102" textAnchor="middle" fill="#94a3b8" fontSize="8">Cu₂Cl₂ / HCl</text>

  <!-- Spoke 2: KI -> Iodobenzene -->
  <line x1="335" y1="150" x2="160" y2="180" stroke="#64748b" strokeWidth="1.5"/>
  <rect x="70" y="160" width="100" height="40" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1"/>
  <text x="120" y="177" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">C₆H₅-I</text>
  <text x="120" y="192" textAnchor="middle" fill="#94a3b8" fontSize="8">Warm with KI</text>

  <!-- Spoke 3: HBF4 / Heat -> Fluorobenzene -->
  <line x1="425" y1="135" x2="600" y2="90" stroke="#64748b" strokeWidth="1.5"/>
  <rect x="590" y="70" width="105" height="40" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1"/>
  <text x="642" y="87" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">C₆H₅-F</text>
  <text x="642" y="102" textAnchor="middle" fill="#94a3b8" fontSize="8">HBF₄, Δ (Schiemann)</text>

  <!-- Spoke 4: Phenol coupling -> Orange Dye -->
  <line x1="425" y1="150" x2="600" y2="180" stroke="#64748b" strokeWidth="1.5"/>
  <rect x="580" y="160" width="125" height="40" rx="6" fill="#1e293b" stroke="#eab308" strokeWidth="1"/>
  <text x="642" y="177" textAnchor="middle" fill="#eab308" fontSize="10" fontWeight="bold">Orange Azo Dye</text>
  <text x="642" y="192" textAnchor="middle" fill="#94a3b8" fontSize="8">Phenol (pH 9-10)</text>
</svg>`,
    workedExamples: [
      {
        id: "chem_u9_we1",
        questionNumber: 1,
        question:
          "Which of the following amines CANNOT be prepared by the Gabriel Phthalimide synthesis?",
        options: [
          { id: "A", text: "Methylamine" },
          { id: "B", text: "Ethylamine" },
          { id: "C", text: "Aniline" },
          { id: "D", text: "Benzylamine" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Gabriel Phthalimide synthesis involves nucleophilic attack of potassium phthalimide anion on an organic halide ($R-X$).",
          "Step 2: To prepare aniline, chlorobenzene ($C_6H_5-Cl$) would have to be used.",
          "Step 3: In chlorobenzene, the $C-Cl$ bond has partial double bond character due to resonance and the phenyl ring repels nucleophiles.",
          "Step 4: Aryl halides cannot undergo nucleophilic substitution with phthalimide anion under normal conditions. Therefore, aniline cannot be prepared by this method.",
        ],
        cuetTip: "Benzylamine CAN be prepared by Gabriel synthesis because benzyl chloride ($C_6H_5CH_2Cl$) is an aliphatic alkyl halide where the halogen is on an $sp^3$ carbon!",
      },
      {
        id: "chem_u9_we2",
        questionNumber: 2,
        question:
          "A primary amide (X) on heating with bromine and aqueous $KOH$ yields an amine (Y). When (Y) is treated with $CHCl_3$ and alcoholic $KOH$, an unbearable foul smell is produced. What is the number of carbons in (Y) compared to (X)?",
        options: [
          { id: "A", text: "Same number of carbons" },
          { id: "B", text: "One less carbon" },
          { id: "C", text: "One more carbon" },
          { id: "D", text: "Double the carbons" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Reaction of primary amide with $Br_2 + KOH$ is the Hoffmann Bromamide degradation.",
          "Step 2: The carbonyl carbon of the amide is eliminated as carbonate ($K_2CO_3$), forming an amine with one less carbon atom ($R-CONH_2 \\rightarrow R-NH_2$).",
          "Step 3: The foul smell confirms the Carbylamine test, verifying that (Y) is indeed a primary amine.",
          "Step 4: Thus, (Y) has one less carbon atom than (X).",
        ],
        cuetTip: "To convert $CH_3CH_2COOH$ to $CH_3CH_2NH_2$: Convert to amide ($SOCl_2 + NH_3$) then Hoffmann bromamide will reduce a carbon! If same carbon is wanted, use reduction ($LiAlH_4$).",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Basicity Ranking in Aqueous Solution",
        frequency: "Very High",
        pyqExample: {
          question:
            "The correct decreasing order of basic strength of methyl substituted amines and ammonia in aqueous solution is:",
          options: [
            { id: "A", text: "(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃" },
            { id: "B", text: "(CH₃)₃N > (CH₃)₂NH > CH₃NH₂ > NH₃" },
            { id: "C", text: "(CH₃)₂NH > (CH₃)₃N > CH₃NH₂ > NH₃" },
            { id: "D", text: "CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N > NH₃" },
          ],
          correctOption: "A",
          explanation: "For methyl substituted amines in water, the order is secondary (2°) > primary (1°) > tertiary (3°) > NH3 (the 213 rule).",
        },
        strategy: "Memorize: Ethyl is 231 (secondary > tertiary > primary). Methyl is 213 (secondary > primary > tertiary). Secondary is ALWAYS top in both!",
      },
      {
        type: "Hinsberg Reagent Test Differentiation",
        frequency: "High",
        pyqExample: {
          question:
            "An amine responds to Hinsberg's reagent to give a solid product that dissolves in aqueous $KOH$. The amine is:",
          options: [
            { id: "A", text: "Primary amine" },
            { id: "B", text: "Secondary amine" },
            { id: "C", text: "Tertiary amine" },
            { id: "D", text: "Quaternary ammonium salt" },
          ],
          correctOption: "A",
          explanation: "Primary amines form N-alkylbenzenesulphonamide, which has an acidic hydrogen attached to nitrogen, enabling it to dissolve in alkali.",
        },
        strategy: "Soluble in alkali $\\implies 1^\\circ$. Insoluble in alkali $\\implies 2^\\circ$. Does not react $\\implies 3^\\circ$.",
      },
    ],
    commonTraps: [
      {
        misconception: "Thinking tertiary amines are the strongest bases in aqueous solution because they have three +I alkyl groups.",
        whyWrong: "In water, bulky alkyl groups create steric hindrance and prevent effective hydrogen bonding between water and the protonated ammonium ion.",
        correctUnderstanding: "Tertiary amines are strongest only in the GASEOUS phase. In water, secondary amines are the strongest bases.",
      },
      {
        misconception: "Believing secondary and tertiary amines give the carbylamine test.",
        whyWrong: "The carbylamine reaction requires two replaceable hydrogen atoms on the nitrogen atom ($-NH_2$).",
        correctUnderstanding: "Only PRIMARY amines (both aliphatic and aromatic) give the carbylamine test. Secondary and tertiary amines lack two hydrogens and cannot react.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Aqueous Basicity Phone Codes",
        mnemonic: "Ethyl is 2-3-1. Methyl is 2-1-3.",
        rule: "Ethyl: 2° > 3° > 1° > NH3. Methyl: 2° > 1° > 3° > NH3.",
        shortcut: "Secondary is always number 1. For bigger ethyl, 3 beats 1 (231). For smaller methyl, 1 beats 3 (213).",
        whenToApply: "Aqueous amine basicity order questions.",
      },
      {
        title: "Azo Dye Coupling Colors",
        mnemonic: "Phenol gives Peach/Orange. Aniline gives Yellow.",
        rule: "Phenol + Diazonium (pH 9-10) $\\rightarrow$ Orange dye. Aniline + Diazonium (pH 4-5) $\\rightarrow$ Yellow dye.",
        shortcut: "PO (Phenol Orange) and AY (Aniline Yellow).",
        whenToApply: "Diazonium coupling dye questions.",
      },
    ],
    quickRevisionCard: {
      title: "Amines — Quick Revision Card",
      bulletPoints: [
        "Gas basicity: 3° > 2° > 1° > NH3. Aqueous basicity: Ethyl = 231; Methyl = 213.",
        "Aniline is weak base ($pK_b = 9.38$); lone pair delocalized over 5 resonance structures.",
        "Gabriel phthalimide: Primary aliphatic amines only. Cannot make aniline.",
        "Hoffmann bromamide: $RCONH_2 + Br_2 + 4KOH \\rightarrow RNH_2$ (one less carbon).",
        "Carbylamine test: $RNH_2 + CHCl_3 + KOH \\rightarrow R-NC$ (foul smell). Only 1° amines.",
        "Hinsberg test: 1° = soluble in alkali; 2° = insoluble in alkali; 3° = no reaction.",
        "Diazotization: $ArNH_2 + NaNO_2 + HCl \\xrightarrow{0-5^\\circ\\text{C}} ArN_2^+ Cl^-$.",
        "Balz-Schiemann: $ArN_2^+ Cl^- + HBF_4 \\xrightarrow{\\Delta} Ar-F$ (best synthesis of fluoroarenes).",
        "Coupling with Phenol: Orange azo dye at pH 9-10.",
        "Coupling with Aniline: Yellow azo dye at pH 4-5.",
      ],
    },
    practiceQuestions: [
      {
        id: "chem_u9_q1",
        question: "Which of the following compounds gives a foul-smelling isocyanide on heating with chloroform and alcoholic $KOH$?",
        type: "standard",
        options: [
          { id: "A", text: "Dimethylamine" },
          { id: "B", text: "Trimethylamine" },
          { id: "C", text: "Aniline" },
          { id: "D", text: "N-Methylaniline" },
        ],
        correctOption: "C",
        explanation: "Carbylamine test is positive ONLY for primary amines. Aniline ($C_6H_5NH_2$) is a primary aromatic amine and gives phenyl isocyanide ($C_6H_5NC$).",
        difficulty: "easy",
      },
      {
        id: "chem_u9_q2",
        question: "When acetamide is treated with bromine and caustic potash, the product formed is:",
        type: "standard",
        options: [
          { id: "A", text: "Methylamine" },
          { id: "B", text: "Ethylamine" },
          { id: "C", text: "Methanamide" },
          { id: "D", text: "Bromoacetamide" },
        ],
        correctOption: "A",
        explanation: "Hoffmann bromamide degradation of acetamide ($CH_3CONH_2$) degrades the carbonyl carbon to carbonate, yielding methylamine ($CH_3NH_2$).",
        difficulty: "easy",
      },
      {
        id: "chem_u9_q3",
        question: "The reagent used in the Hinsberg test to distinguish between primary, secondary, and tertiary amines is:",
        type: "standard",
        options: [
          { id: "A", text: "Benzenesulphonyl chloride" },
          { id: "B", text: "Benzoyl chloride" },
          { id: "C", text: "Acetyl chloride" },
          { id: "D", text: "p-Toluenesulphonic acid" },
        ],
        correctOption: "A",
        explanation: "Hinsberg's reagent is benzenesulphonyl chloride ($C_6H_5SO_2Cl$).",
        difficulty: "easy",
      },
      {
        id: "chem_u9_q4",
        question: "Assertion (A): Gabriel phthalimide synthesis cannot be used to prepare aniline.\nReason (R): Aryl halides do not undergo nucleophilic substitution with potassium phthalimide anion.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "Chlorobenzene has partial double bond character due to resonance and does not undergo nucleophilic substitution with phthalimide ion under Gabriel conditions.",
        difficulty: "medium",
      },
      {
        id: "chem_u9_q5",
        question: "Match List-I (Reaction Name) with List-II (Key Reagents / Synthetic Role):\nP. Gabriel phthalimide synthesis\nQ. Carbylamine reaction\nR. Balz-Schiemann reaction\nS. Gattermann reaction",
        type: "match-the-following",
        options: [
          { id: "A", text: "P-Preparation of pure 1° aliphatic amines, Q-Test for primary amines, R-Synthesis of aryl fluorides via HBF4, S-ArN2+Cl- with Cu powder/HCl" },
          { id: "B", text: "P-Test for primary amines, Q-Preparation of 1° amines, R-Cu powder/HCl, S-Synthesis of aryl fluorides" },
          { id: "C", text: "P-Synthesis of aryl fluorides, Q-Preparation of 1° amines, R-Test for primary amines, S-Cu powder/HCl" },
          { id: "D", text: "P-Preparation of 1° amines, Q-Synthesis of aryl fluorides, R-Test for primary amines, S-Cu powder/HCl" },
        ],
        correctOption: "A",
        explanation: "Gabriel synthesis makes 1° aliphatic amines; Carbylamine tests 1° amines; Balz-Schiemann makes Ar-F; Gattermann uses Cu powder.",
        difficulty: "easy",
      },
      {
        id: "chem_u9_q6",
        question: "Coupling of benzene diazonium chloride with phenol in alkaline medium (pH 9-10) produces:",
        type: "standard",
        options: [
          { id: "A", text: "p-Hydroxyazobenzene (orange dye)" },
          { id: "B", text: "p-Aminoazobenzene (yellow dye)" },
          { id: "C", text: "Chlorobenzene" },
          { id: "D", text: "Diphenyl ether" },
        ],
        correctOption: "A",
        explanation: "In alkaline medium, phenol exists as phenoxide ion, which is strongly activated and couples with diazonium cation to form orange p-hydroxyazobenzene.",
        difficulty: "easy",
      },
      {
        id: "chem_u9_q7",
        question: "In the gaseous phase, the order of basicity of aliphatic amines is:",
        type: "standard",
        options: [
          { id: "A", text: "3° > 2° > 1° > NH₃" },
          { id: "B", text: "2° > 3° > 1° > NH₃" },
          { id: "C", text: "2° > 1° > 3° > NH₃" },
          { id: "D", text: "NH₃ > 1° > 2° > 3°" },
        ],
        correctOption: "A",
        explanation: "In the gaseous phase, there is no solvent effect; basicity is determined purely by the electron-donating inductive effect (+I), which increases with the number of alkyl groups (3° > 2° > 1° > NH3).",
        difficulty: "medium",
      },
      {
        id: "chem_u9_q8",
        question: "Aniline on direct nitration with concentrated $HNO_3 / H_2SO_4$ yields a significant amount (~47%) of m-nitroaniline because:",
        type: "standard",
        options: [
          { id: "A", text: "Amino group is meta-directing" },
          { id: "B", text: "In strong acid medium, aniline is protonated to anilinium ion which is meta-directing" },
          { id: "C", text: "Nitration occurs via free radicals" },
          { id: "D", text: "Ortho position is sterically hindered" },
        ],
        correctOption: "B",
        explanation: "In strongly acidic conditions, $-NH_2$ is protonated to $-NH_3^+$ (anilinium ion), which has a strong -I deactivating effect and directs the incoming electrophile to the meta position.",
        difficulty: "medium",
      },
      {
        id: "chem_u9_q9",
        question: "Primary, secondary, and tertiary amines can be separated from each other using:",
        type: "standard",
        options: [
          { id: "A", text: "Hinsberg's reagent" },
          { id: "B", text: "Tollens' reagent" },
          { id: "C", text: "Fehling's solution" },
          { id: "D", text: "Lucas reagent" },
        ],
        correctOption: "A",
        explanation: "Benzenesulphonyl chloride (Hinsberg's reagent) reacts differently with 1°, 2°, and 3° amines, allowing complete separation based on solubility in alkali.",
        difficulty: "easy",
      },
      {
        id: "chem_u9_q10",
        question: "The conversion of aniline to fluorobenzene is accomplished by:",
        type: "standard",
        options: [
          { id: "A", text: "Sandmeyer reaction" },
          { id: "B", text: "Balz-Schiemann reaction" },
          { id: "C", text: "Gattermann reaction" },
          { id: "D", text: "Finkelstein reaction" },
        ],
        correctOption: "B",
        explanation: "Diazotization followed by treatment with fluoroboric acid ($HBF_4$) precipitates diazonium fluoroborate, which on heating yields fluorobenzene (Balz-Schiemann reaction).",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["chemistry_u8_t1"],
      relatedTopics: ["chemistry_u10_t1"],
      practiceTestId: "practice-chemistry-unit9-test1",
      practiceTestUrl: "/test/practice-chemistry-unit9-test1",
      weaknessReportUrl: "/dashboard/radar?subject=chemistry",
      weaknessRadarUrl: "/dashboard/radar?subject=chemistry",
    },
    subjectSpecific: {
      chemistry: {
        namedReactions: [
          { name: "Gabriel Phthalimide Synthesis", reagents: "Phthalimide + KOH -> R-X -> aq. NaOH", condition: "Heat", equation: "C6H4(CO)2NK + R-X -> R-NH2 + C6H4(COONa)2" },
          { name: "Hoffmann Bromamide Degradation", reagents: "Br2 + 4 KOH", condition: "Heat", equation: "RCONH2 + Br2 + 4KOH -> RNH2 + K2CO3 + 2KBr + 2H2O" },
          { name: "Carbylamine Reaction", reagents: "CHCl3 + 3 alc. KOH", condition: "Warm", equation: "RNH2 + CHCl3 + 3KOH -> RNC + 3KCl + 3H2O" },
          { name: "Balz-Schiemann Reaction", reagents: "HBF4 then heat", condition: "Dry heat", equation: "ArN2+Cl- + HBF4 -> ArN2+BF4- -> ArF + BF3 + N2" },
        ],
        exceptionsList: [
          "Aniline direct nitration yields 47% meta-product due to anilinium ion formation.",
          "Secondary amines are the strongest bases in aqueous solution for both methyl and ethyl series.",
        ],
      },
    },
  },

  // Unit 10: Biomolecules
  {
    id: "chemistry_u10_t1",
    slug: "carbohydrates-proteins-amino-acids-nucleic-acids-dna-and-rna-vitamins",
    subject: "chemistry",
    subjectName: "Chemistry",
    subjectCode: "306",
    unitNumber: 10,
    unitTitle: "Biomolecules",
    topicTitle: "Carbohydrates, Proteins, Amino Acids, Nucleic Acids (DNA & RNA), Vitamins",
    ncertReference: {
      class: "Class 12",
      book: "Chemistry Part 2",
      chapterNumber: 10,
      chapterName: "Biomolecules",
      sections: [
        "10.1 Carbohydrates: Classification & Monosaccharides (Glucose & Fructose)",
        "10.2 Cyclic Structure of Glucose, Anomers & Mutarotation",
        "10.3 Disaccharides: Sucrose (Invert Sugar), Maltose, Lactose",
        "10.4 Polysaccharides: Starch (Amylose vs Amylopectin), Cellulose, Glycogen",
        "10.5 Amino Acids: Zwitterion & Classification (Essential vs Non-essential)",
        "10.6 Proteins: Peptide Bond, Primary, Secondary (alpha-helix, beta-sheet), Denaturation",
        "10.7 Nucleic Acids: DNA vs RNA, Nucleosides, Nucleotides, Chargaff's Rule",
        "10.8 Vitamins: Classification (Water vs Fat Soluble) and Deficiency Diseases",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4-5 questions per shift)",
      totalPyqsInRepo: 110,
      weightagePercentage: 9.0,
    },
    summary30Seconds: [
      "Glucose chemical evidence: HI reduction gives n-hexane (linear 6-carbon chain); Bromine water oxidizes to gluconic acid (aldehyde group); Conc. HNO3 oxidizes to saccharic acid (terminal -CH2OH and -CHO both oxidized); Acetic anhydride forms pentaacetate (5 -OH groups).",
      "Anomers: Diastereomers differing only at C1 configuration (anomeric carbon). $\\alpha$-D-glucopyranose and $\\beta$-D-glucopyranose undergo mutarotation in water until equilibrium rotation of $+52.7^\\circ$ is reached.",
      "Sucrose is a NON-REDUCING sugar: Glycosidic linkage connects C1 of $\\alpha$-D-glucose and C2 of $\\beta$-D-fructose, tying up both reducing functional groups. Hydrolysis produces 'Invert Sugar' (dextrorotatory $+66.5^\\circ$ becomes levorotatory $-39.9^\\circ$).",
      "Starch: 15-20% Amylose (water-soluble, linear $\\alpha-1,4$ glycosidic bonds) + 80-85% Amylopectin (water-insoluble, branched with $\\alpha-1,4$ chain and $\\alpha-1,6$ branch points).",
      "Amino acids: Exist as dipolar Zwitterions ($H_3N^+-CHR-COO^-$). All natural amino acids (except achiral Glycine) have L-configuration at $\\alpha$-carbon.",
      "Protein structures: $1^\\circ$ = amino acid sequence; $2^\\circ$ = $\\alpha$-helix and $\\beta$-pleated sheet stabilized by H-bonds; $3^\\circ$ = overall folding (fibrous vs globular). Denaturation disrupts $2^\\circ$ and $3^\\circ$ structures but leaves $1^\\circ$ peptide sequence INTACT.",
      "Nucleic acids: Base + Sugar = Nucleoside; Nucleoside + Phosphate = Nucleotide. DNA has Deoxyribose, A, G, C, T; RNA has Ribose, A, G, C, U. Chargaff rule: $A=T$ and $G=C$ ($A+G = T+C$).",
      "Vitamins: Fat-soluble (A, D, E, K); Water-soluble (B-complex, C). Vitamin C cannot be stored in body and is excreted in urine. Deficiency: A $\\rightarrow$ Night blindness; B1 $\\rightarrow$ Beriberi; B12 $\\rightarrow$ Pernicious anaemia; C $\\rightarrow$ Scurvy; D $\\rightarrow$ Rickets; K $\\rightarrow$ Increased blood clotting time.",
    ],
    coreConcepts: [
      {
        title: "Carbohydrates: Glucose Reactions, Anomers & Invert Sugar",
        content:
          "**Reactions Confirming D-Glucose Open Chain Structure**:\n1. $Glucose + HI \\xrightarrow{\\Delta} n\\text{-hexane}$ (proves all 6 carbons are linked in a straight unbranched chain).\n2. $Glucose + NH_2OH \\rightarrow \\text{Oxime}$; $Glucose + HCN \\rightarrow \\text{Cyanohydrin}$ (proves presence of a carbonyl group).\n3. $Glucose + Br_2 \\text{ water} \\rightarrow \\text{Gluconic acid}$ (mild oxidation proves carbonyl is an **aldehyde**).\n4. $Glucose + (CH_3CO)_2O \\rightarrow \\text{Glucose pentaacetate}$ (proves presence of **five -OH groups** on 5 different carbons).\n5. $Glucose + conc.\\ HNO_3 \\rightarrow \\text{Saccharic acid}$ (proves presence of one primary alcohol group, $-CH_2OH$).\n\n**Cyclic Structure & Mutarotation**:\n- Glucose does not form a 2,4-DNP derivative or restore Schiff's reagent because the $-CHO$ group forms an intramolecular hemiacetal with the $-OH$ on C5, creating a 6-membered pyranose ring.\n- **Anomeric Carbon (C1)**: The new chiral center created on cyclization. $\\alpha$-anomer ($-OH$ on C1 is on right / down) has specific rotation $+112^\\circ$; $\\beta$-anomer ($-OH$ on C1 is on left / up) has specific rotation $+19^\\circ$.\n- **Mutarotation**: Spontaneous change in specific rotation of an optically active anomer in water until an equilibrium value of $+52.7^\\circ$ (36% $\\alpha$, 64% $\\beta$) is reached.\n\n**Disaccharides & Reducing Nature**:\n- **Maltose**: $\\alpha$-D-glucose + $\\alpha$-D-glucose ($\\alpha-1,4$ linkage). Hemiacetal at second C1 is free $\\implies$ **Reducing sugar**.\n- **Lactose (Milk Sugar)**: $\\beta$-D-galactose + $\\beta$-D-glucose ($\\beta-1,4$ linkage) $\\implies$ **Reducing sugar**.\n- **Sucrose (Cane Sugar)**: $\\alpha$-D-glucose (C1) + $\\beta$-D-fructose (C2) ($\\alpha-1,\\beta-2$ glycosidic bond). Both reducing groups are locked in the glycosidic bond $\\implies$ **Non-reducing sugar**.\n- **Inversion of Sugar**: Sucrose is dextrorotatory ($+66.5^\\circ$). Hydrolysis yields D-(+)-glucose ($+52.7^\\circ$) and D-(-)-fructose ($-92.4^\\circ$). Since levorotation of fructose is greater than dextrorotation of glucose, the mixture is levorotatory ($-39.7^\\circ$). The product is called **Invert Sugar**.",
        ncertPointers: [
          "Cellulose is composed of beta-D-glucose units joined by beta-1,4-glycosidic linkages. Humans cannot digest cellulose because our digestive system lacks cellulase enzymes.",
        ],
      },
      {
        title: "Amino Acids, Protein Structure & Denaturation",
        content:
          "**Amino Acids & Zwitterion**:\n- Bifunctional molecules containing an amino group ($-NH_2$) and carboxyl group ($-COOH$).\n- In neutral aqueous solution, the carboxyl group loses a proton and the amino group gains a proton, forming an internal salt called a **Zwitterion** ($H_3N^+-CHR-COO^-$).\n- **Isoelectric Point (pI)**: The pH at which the zwitterion carries no net electrical charge and does not migrate in an electric field.\n- All 20 standard amino acids have **L-configuration** at the $\\alpha$-carbon. **Glycine ($H_2N-CH_2-COOH$) is the only optically inactive (achiral) amino acid**.\n- **10 Essential Amino Acids** (must be obtained from diet): Valine, Leucine, Isoleucine, Phenylalanine, Tryptophan, Threonine, Methionine, Lysine, Histidine, Arginine.\n\n**Levels of Protein Structure**:\n1. **Primary ($1^\\circ$) Structure**: The exact linear sequence of amino acids joined by peptide (amide, $-CO-NH-$) bonds. A change in even one amino acid alters biological function (e.g., Sickle-cell anaemia: glutamic acid replaced by valine at position 6 of $\\beta$-chain of hemoglobin).\n2. **Secondary ($2^\\circ$) Structure**: Local spatial folding of peptide chain stabilized strictly by **Hydrogen bonding** between $>C=O$ and $-NH-$ groups:\n   - **$\\alpha$-Helix**: Polypeptide chain coils like a right-handed screw, with H-bonds between $C=O$ of residue $n$ and $N-H$ of residue $n+4$.\n   - **$\\beta$-Pleated Sheet**: Polypeptide chains lie side-by-side in parallel or antiparallel arrangements held by interchain H-bonds (e.g., silk fibroin).\n3. **Tertiary ($3^\\circ$) Structure**: Overall three-dimensional folding of the polypeptide chain stabilized by disulfide bonds ($-S-S-$), H-bonds, electrostatic attractions, and hydrophobic interactions. Yields **Fibrous** (insoluble, keratin, collagen) or **Globular** (soluble, insulin, myoglobin) proteins.\n4. **Denaturation of Proteins**: When a protein is subjected to physical changes (temperature) or chemical changes (pH), hydrogen bonds are broken, secondary and tertiary structures unfold, and biological activity is lost. **Primary structure remains completely intact** (e.g., coagulation of egg white on boiling; curdling of milk).",
        ncertPointers: [
          "Disulfide bonds (-S-S-) in tertiary protein structure are formed between cysteine residues.",
        ],
      },
      {
        title: "Nucleic Acids & Vitamin Classification",
        content:
          "**Nucleic Acids (DNA and RNA)**:\n- Polymers of nucleotides linked by **$3',5'$-phosphodiester linkages**.\n- **Components**:\n  - **Nitrogenous Bases**: Purines (Adenine 'A', Guanine 'G'); Pyrimidines (Cytosine 'C', Thymine 'T' in DNA, Uracil 'U' in RNA).\n  - **Pentose Sugar**: $\\beta$-D-2-deoxyribose in DNA; $\\beta$-D-ribose in RNA.\n  - **Phosphate Group**: Attached to C5' of pentose sugar.\n- **Nucleoside vs Nucleotide**:\n  - $\\text{Nucleoside} = \\text{Base} + \\text{Sugar}$ (attached at C1' by $\\beta$-N-glycosidic bond).\n  - $\\text{Nucleotide} = \\text{Base} + \\text{Sugar} + \\text{Phosphate}$ (esterified at C5' of sugar).\n- **DNA Double Helix (Watson and Crick)**:\n  - Two antiparallel polynucleotide strands coiled around a central axis.\n  - Bases point inward: Adenine pairs with Thymine via **2 hydrogen bonds** ($A=T$); Guanine pairs with Cytosine via **3 hydrogen bonds** ($G \\equiv C$).\n  - **Chargaff's Rule**: In double-stranded DNA, the molar ratio of $A:T = 1:1$ and $G:C = 1:1$; Total Purines ($A+G$) = Total Pyrimidines ($T+C$).\n\n**Vitamins & Deficiency Diseases**:\n1. **Fat-Soluble Vitamins (A, D, E, K)**: Stored in liver and adipose tissue. Excessive intake causes hypervitaminosis.\n   - Vitamin A (Retinol): Night blindness, Xerophthalmia.\n   - Vitamin D (Calciferol): Rickets in children, Osteomalacia in adults.\n   - Vitamin E (Tocopherol): Muscular weakness, increased fragility of RBCs.\n   - Vitamin K (Phylloquinone): Defective blood coagulation, increased clotting time.\n2. **Water-Soluble Vitamins (B-complex, C)**: Excreted in urine; must be supplied regularly in diet.\n   - Vitamin B1 (Thiamine): Beriberi (loss of appetite, neurological symptoms).\n   - Vitamin B2 (Riboflavin): Cheilosis (fissuring at corners of mouth), glossitis.\n   - Vitamin B12 (Cyanocobalamin): Pernicious anaemia (RBC deficiency; contains Cobalt).\n   - Vitamin C (Ascorbic acid): Scurvy (bleeding gums). Destroyed by cooking.",
        ncertPointers: [
          "Vitamin B12 cannot be synthesized by human body and is obtained from animal sources (liver, milk, eggs, fish). Strict vegans may develop B12 deficiency.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Chargaff's Base Pairing Rule",
        formula: "\\text{Moles of } A = \\text{Moles of } T, \\quad \\text{Moles of } G = \\text{Moles of } C \\implies \\frac{A + G}{T + C} = 1",
        symbols: "Valid strictly for double-stranded DNA",
        siUnits: "Molar stoichiometry",
        applicationCondition: "Double-stranded DNA base calculations",
      },
      {
        name: "Reducing Sugar Test Results",
        formula: "\\text{Reducing: Glucose, Fructose, Maltose, Lactose} \\quad \\text{vs} \\quad \\text{Non-reducing: Sucrose, Starch, Cellulose}",
        symbols: "Free hemiacetal/hemiketal group reduces Fehling and Tollens reagents",
        siUnits: "Diagnostic classification",
        applicationCondition: "Carbohydrate classification",
      },
      {
        name: "Vitamin Solubility Table",
        formula: "\\text{Fat-Soluble} = \\{A, D, E, K\\}; \\quad \\text{Water-Soluble} = \\{B\\text{-complex}, C\\}",
        symbols: "Vitamin C cannot be stored; excreted in urine",
        siUnits: "Biochemical classification",
        applicationCondition: "Nutritional chemistry",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="260" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Biomolecules: Disaccharide Linkages & DNA Base Pairing</text>

  <!-- Left: Sucrose Invert Sugar -->
  <g transform="translate(60, 55)">
    <rect width="290" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1"/>
    <text x="145" y="24" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Sucrose (Non-Reducing Sugar)</text>
    <text x="145" y="55" textAnchor="middle" fill="#f8fafc" fontSize="11">α-D-Glucose (C1) + β-D-Fructose (C2)</text>
    <text x="145" y="80" textAnchor="middle" fill="#f59e0b" fontSize="10">Both anomeric carbons involved in linkage</text>
    <text x="145" y="110" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Inversion of Optical Rotation</text>
    <text x="145" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">Sucrose (+66.5°) → Glucose (+52.7°) + Fructose (-92.4°)</text>
    <text x="145" y="160" textAnchor="middle" fill="#38bdf8" fontSize="11">Net Hydrolyzed Mixture is Levorotatory (-39.7°)</text>
  </g>

  <!-- Right: DNA Watson-Crick Pairing -->
  <g transform="translate(410, 55)">
    <rect width="290" height="180" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1"/>
    <text x="145" y="24" textAnchor="middle" fill="#a855f7" fontSize="13" fontWeight="bold">DNA Base Pairing (Watson-Crick)</text>
    <text x="145" y="55" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">Adenine === Thymine  (2 H-bonds)</text>
    <text x="145" y="80" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">Guanine ≡≡≡ Cytosine  (3 H-bonds)</text>
    <text x="145" y="110" textAnchor="middle" fill="#a855f7" fontSize="11" fontWeight="bold">Chargaff Rule: A = T,  G = C</text>
    <text x="145" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">Purines (A+G) = Pyrimidines (T+C)</text>
    <text x="145" y="160" textAnchor="middle" fill="#fbbf24" fontSize="10">RNA replaces Thymine (T) with Uracil (U)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "chem_u10_we1",
        questionNumber: 1,
        question:
          "A sample of double-stranded DNA is analyzed and found to contain 20% Adenine. What is the percentage of Cytosine in this DNA sample?",
        options: [
          { id: "A", text: "20%" },
          { id: "B", text: "30%" },
          { id: "C", text: "40%" },
          { id: "D", text: "60%" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: According to Chargaff's rule for double-stranded DNA, $\%A = \\%T$ and $\%G = \\%C$.",
          "Step 2: Since Adenine is 20%, Thymine must also be 20%. Total $(A + T) = 20 + 20 = 40\\%$.",
          "Step 3: The remaining bases are Guanine and Cytosine: $\\%G + \\%C = 100\\% - 40\\% = 60\\%$.",
          "Step 4: Since $\%G = \\%C$, Cytosine percentage $= 60\\% / 2 = 30\\%$.",
        ],
        cuetTip: "Standard CUET calculation: If A is given as x%, then Cytosine and Guanine are each $(50 - x)\\%$. Here $50 - 20 = 30\\%$.",
      },
      {
        id: "chem_u10_we2",
        questionNumber: 2,
        question:
          "Which of the following amino acids is OPTICALLY INACTIVE?",
        options: [
          { id: "A", text: "Alanine" },
          { id: "B", text: "Glycine" },
          { id: "C", text: "Valine" },
          { id: "D", text: "Leucine" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Optical activity requires a chiral carbon (a carbon bonded to 4 different groups).",
          "Step 2: In Glycine ($H_2N-CH_2-COOH$), the $\\alpha$-carbon is bonded to two identical hydrogen atoms.",
          "Step 3: Because it lacks a chiral carbon, Glycine possesses a plane of symmetry and is optically inactive (achiral).",
          "Step 4: All other natural amino acids have 4 different groups attached to the $\\alpha$-carbon and are optically active.",
        ],
        cuetTip: "Glycine is the only achiral amino acid. Every other natural amino acid is chiral and has the L-configuration.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Reducing vs Non-Reducing Sugar Discrimination",
        frequency: "Very High",
        pyqExample: {
          question:
            "Which of the following carbohydrates is a NON-REDUCING sugar?",
          options: [
            { id: "A", text: "Glucose" },
            { id: "B", text: "Fructose" },
            { id: "C", text: "Maltose" },
            { id: "D", text: "Sucrose" },
          ],
          correctOption: "D",
          explanation: "Sucrose is non-reducing because the glycosidic bond is formed between the anomeric carbon C1 of alpha-glucose and C2 of beta-fructose, leaving no free hemiacetal group.",
        },
        strategy: "All monosaccharides are reducing. Among disaccharides: Maltose and Lactose are reducing; SUCROSE is non-reducing.",
      },
      {
        type: "Vitamin Deficiency Matching",
        frequency: "High",
        pyqExample: {
          question:
            "Match List-I (Vitamin) with List-II (Deficiency Disease):\nP. Vitamin A\nQ. Vitamin B₁\nR. Vitamin C\nS. Vitamin D",
          options: [
            { id: "A", text: "P-Night blindness, Q-Beriberi, R-Scurvy, S-Rickets" },
            { id: "B", text: "P-Beriberi, Q-Night blindness, R-Rickets, S-Scurvy" },
            { id: "C", text: "P-Scurvy, Q-Rickets, R-Night blindness, S-Beriberi" },
            { id: "D", text: "P-Night blindness, Q-Scurvy, R-Beriberi, S-Rickets" },
          ],
          correctOption: "A",
          explanation: "A causes night blindness; B1 causes beriberi; C causes scurvy; D causes rickets.",
        },
        strategy: "A-eyes, B1-beriberi, C-gums, D-bones. Instant score in CUET.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming denaturation of proteins breaks peptide bonds and destroys primary structure.",
        whyWrong: "Denaturation only disrupts hydrogen bonds, disulfide linkages, and hydrophobic interactions responsible for 2° and 3° structures.",
        correctUnderstanding: "The covalent peptide bonds of the PRIMARY structure remain completely intact during denaturation.",
      },
      {
        misconception: "Thinking fructose cannot reduce Tollens' or Fehling's reagent because it is a ketone.",
        whyWrong: "In basic solution (Tollens and Fehling reagents), fructose undergoes keto-enol tautomerism (Lobry de Bruyn-van Ekenstein transformation) to form an aldose.",
        correctUnderstanding: "Fructose IS a reducing sugar and gives positive Tollens' and Fehling's tests.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Vitamin Solubility Mnemonic",
        mnemonic: "K-E-D-A are FAT. B and C swim in WATER.",
        rule: "Vitamins K, E, D, A are fat-soluble. Vitamins B-complex and C are water-soluble.",
        shortcut: "Water-soluble vitamins (B, C) cannot be stored and must be consumed daily.",
        whenToApply: "Vitamin classification questions.",
      },
      {
        title: "DNA Base Hydrogen Bonds",
        mnemonic: "AT has 2 letters $\\implies 2$ bonds. GC has 3 letters in curve $\\implies 3$ bonds.",
        rule: "$A=T$ (2 hydrogen bonds). $G \\equiv C$ (3 hydrogen bonds).",
        shortcut: "DNA with higher G-C content has a higher melting temperature ($T_m$).",
        whenToApply: "DNA stability and base pairing questions.",
      },
    ],
    quickRevisionCard: {
      title: "Biomolecules — High-Yield Review",
      bulletPoints: [
        "Glucose structure: $HI \\rightarrow$ n-hexane; $Br_2$ water $\\rightarrow$ gluconic acid; $HNO_3 \\rightarrow$ saccharic acid.",
        "Anomers: Differ at C1 only. $\\alpha$ (+112°) and $\\beta$ (+19°) mutarotate to equilibrium (+52.7°).",
        "Sucrose: $\\alpha-1,\\beta-2$ glycosidic link; non-reducing; invert sugar is levorotatory (-39.7°).",
        "Starch: Amylose (15-20%, water soluble, $\\alpha-1,4$) + Amylopectin (80-85%, branched, $\\alpha-1,4$ and $\\alpha-1,6$).",
        "Glycine: The ONLY optically inactive (achiral) amino acid.",
        "Essential amino acids: 10 total (cannot be synthesized by human body).",
        "Denaturation: Breaks $2^\\circ$ and $3^\\circ$ structures; primary sequence remains intact.",
        "DNA bases: A, T, G, C. RNA bases: A, U, G, C. Chargaff: $A=T, G \\equiv C$.",
        "Fat-soluble vitamins: K, E, D, A. Water-soluble: B-complex, C (excreted in urine).",
        "Deficiency: Vit A $\\rightarrow$ night blindness; B1 $\\rightarrow$ beriberi; B12 $\\rightarrow$ pernicious anaemia; C $\\rightarrow$ scurvy; D $\\rightarrow$ rickets.",
      ],
    },
    practiceQuestions: [
      {
        id: "chem_u10_q1",
        question: "Reaction of glucose with concentrated nitric acid ($HNO_3$) yields:",
        type: "standard",
        options: [
          { id: "A", text: "Gluconic acid" },
          { id: "B", text: "Saccharic acid (Glucaric acid)" },
          { id: "C", text: "n-Hexane" },
          { id: "D", text: "Sorbiitol" },
        ],
        correctOption: "B",
        explanation: "Concentrated $HNO_3$ is a strong oxidizing agent that oxidizes both the terminal aldehyde ($-CHO$) and primary alcohol ($-CH_2OH$) groups to carboxylic acids, forming dicarboxylic saccharic acid.",
        difficulty: "easy",
      },
      {
        id: "chem_u10_q2",
        question: "Which of the following bases is present in RNA but NOT in DNA?",
        type: "standard",
        options: [
          { id: "A", text: "Thymine" },
          { id: "B", text: "Uracil" },
          { id: "C", text: "Cytosine" },
          { id: "D", text: "Guanine" },
        ],
        correctOption: "B",
        explanation: "DNA contains Adenine, Guanine, Cytosine, and Thymine. In RNA, Thymine is replaced by Uracil.",
        difficulty: "easy",
      },
      {
        id: "chem_u10_q3",
        question: "During the denaturation of proteins, which of the following structural levels remains UNALTERED?",
        type: "standard",
        options: [
          { id: "A", text: "Primary structure" },
          { id: "B", text: "Secondary structure" },
          { id: "C", text: "Tertiary structure" },
          { id: "D", text: "Quaternary structure" },
        ],
        correctOption: "A",
        explanation: "Denaturation disrupts hydrogen bonds and hydrophobic interactions, uncoiling the secondary and tertiary structures, but cannot hydrolyze covalent peptide bonds; hence the primary sequence remains intact.",
        difficulty: "easy",
      },
      {
        id: "chem_u10_q4",
        question: "Assertion (A): Sucrose is a non-reducing sugar.\nReason (R): In sucrose, the reducing groups of glucose and fructose are involved in glycosidic bond formation.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "The glycosidic bond in sucrose joins C1 of alpha-glucose and C2 of beta-fructose, locking both potential carbonyl groups so they cannot reduce Fehling's or Tollens' reagents.",
        difficulty: "medium",
      },
      {
        id: "chem_u10_q5",
        question: "Deficiency of Vitamin B₁₂ leads to which disease?",
        type: "standard",
        options: [
          { id: "A", text: "Beriberi" },
          { id: "B", text: "Pernicious anaemia" },
          { id: "C", text: "Scurvy" },
          { id: "D", text: "Cheilosis" },
        ],
        correctOption: "B",
        explanation: "Vitamin B12 (cyanocobalamin) deficiency prevents proper RBC maturation, causing pernicious anaemia. (Beriberi is caused by B1; Scurvy by C; Cheilosis by B2).",
        difficulty: "easy",
      },
      {
        id: "chem_u10_q6",
        question: "Which of the following vitamins cannot be stored in the body and must be supplied regularly in diet?",
        type: "standard",
        options: [
          { id: "A", text: "Vitamin A" },
          { id: "B", text: "Vitamin D" },
          { id: "C", text: "Vitamin C" },
          { id: "D", text: "Vitamin K" },
        ],
        correctOption: "C",
        explanation: "Vitamin C is water-soluble and is readily excreted in urine, so it cannot be stored in adipose tissue or the liver like fat-soluble vitamins (A, D, E, K).",
        difficulty: "easy",
      },
      {
        id: "chem_u10_q7",
        question: "The helical structure of proteins ($\\alpha$-helix) is stabilized by:",
        type: "standard",
        options: [
          { id: "A", text: "Peptide bonds" },
          { id: "B", text: "Hydrogen bonds" },
          { id: "C", text: "Disulfide bonds" },
          { id: "D", text: "Van der Waals forces" },
        ],
        correctOption: "B",
        explanation: "The alpha-helix is held in its coiled shape by intramolecular hydrogen bonds between the carbonyl oxygen (>C=O) of one amino acid residue and the amide hydrogen (-NH-) of the fourth residue down the chain.",
        difficulty: "easy",
      },
      {
        id: "chem_u10_q8",
        question: "Amylopectin is a polymer of $\\alpha$-D-glucose with branching occurring at:",
        type: "standard",
        options: [
          { id: "A", text: "C1-C4 glycosidic linkage only" },
          { id: "B", text: "C1-C6 glycosidic linkage only" },
          { id: "C", text: "C1-C4 chain with C1-C6 branching points" },
          { id: "D", text: "C1-C3 chain with C1-C4 branching points" },
        ],
        correctOption: "C",
        explanation: "Amylopectin is an insoluble branched polysaccharide consisting of linear chains with alpha-1,4-glycosidic linkages and branch points occurring at alpha-1,6-glycosidic linkages every 20-25 glucose units.",
        difficulty: "medium",
      },
      {
        id: "chem_u10_q9",
        question: "A nucleoside differs from a nucleotide in lacking a:",
        type: "standard",
        options: [
          { id: "A", text: "Phosphate group" },
          { id: "B", text: "Nitrogenous base" },
          { id: "C", text: "Pentose sugar" },
          { id: "D", text: "Hydroxyl group" },
        ],
        correctOption: "A",
        explanation: "Nucleoside = Base + Sugar. Nucleotide = Base + Sugar + Phosphate group. Therefore, a nucleoside lacks the phosphate group.",
        difficulty: "easy",
      },
      {
        id: "chem_u10_q10",
        question: "Assertion (A): In solution, glucose exists predominantly in cyclic hemiacetal forms rather than open-chain form.\nReason (R): The open-chain aldehyde group reacts intramolecularly with the hydroxyl group on C5 to form a stable 6-membered pyranose ring.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "In aqueous solution, >99% of D-glucose exists as a cyclic 6-membered pyranose ring formed by nucleophilic attack of the C5-OH on the C1 carbonyl group.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["chemistry_u9_t1"],
      relatedTopics: ["bio_u1_t1"],
      practiceTestId: "practice-chemistry-unit10-test1",
      practiceTestUrl: "/test/practice-chemistry-unit10-test1",
      weaknessReportUrl: "/dashboard/radar?subject=chemistry",
      weaknessRadarUrl: "/dashboard/radar?subject=chemistry",
    },
    subjectSpecific: {
      chemistry: {
        exceptionsList: [
          "Glycine is the only naturally occurring amino acid that is achiral and optically inactive.",
          "Sucrose is non-reducing, whereas its hydrolysis product (invert sugar) is reducing and levorotatory.",
          "Vitamin C is destroyed by heat/cooking and cannot be stored in the human body.",
        ],
        trendsTable: [
          { property: "DNA Base Pair Stability", trend: "G-C pair > A-T pair", reason: "G-C is held by 3 hydrogen bonds; A-T is held by 2 hydrogen bonds" },
          { property: "Reducing Nature", trend: "Monosaccharides & maltose/lactose (reducing) vs Sucrose & polysaccharides (non-reducing)", reason: "Free anomeric hemiacetal carbon is required for reducing action" },
        ],
      },
    },
  },
];
