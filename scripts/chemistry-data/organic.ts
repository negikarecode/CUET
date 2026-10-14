import { NoteDocument } from "@/types/notes";

export const organicChemistryTopics: NoteDocument[] = [
  // Unit 6: Haloalkanes and Haloarenes
  {
    id: "chemistry_u6_t1",
    slug: "nomenclature-nature-of-c-x-bond-sn1-and-sn2-mechanisms-optical-activity",
    subject: "chemistry",
    subjectName: "Chemistry",
    subjectCode: "306",
    unitNumber: 6,
    unitTitle: "Haloalkanes and Haloarenes",
    topicTitle: "Nomenclature, Nature of C-X Bond, SN1 and SN2 Mechanisms, Optical Activity",
    ncertReference: {
      class: "Class 12",
      book: "Chemistry Part 2",
      chapterNumber: 6,
      chapterName: "Haloalkanes and Haloarenes",
      sections: [
        "6.1 Classification & Nomenclature",
        "6.2 Nature of C-X Bond",
        "6.3 Methods of Preparation (Finkelstein, Swarts, Sandmeyer)",
        "6.4 Nucleophilic Substitution: SN1 vs SN2 Mechanisms",
        "6.5 Elimination Reactions: Saytzeff's Rule",
        "6.6 Reactions of Haloarenes (Low Reactivity, Dow's Process)",
        "6.7 Polyhalogen Compounds (Dichloromethane, Chloroform, Iodoform, Freons, DDT)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4-5 questions per shift)",
      totalPyqsInRepo: 140,
      weightagePercentage: 9.5,
    },
    summary30Seconds: [
      "SN1 mechanism: 2 steps, carbocation intermediate, order: 3° > 2° > 1° > CH3-X; favored by polar protic solvents (H2O, alcohol); results in racemization with partial inversion.",
      "SN2 mechanism: 1 step, backside nucleophilic attack via penta-coordinate transition state; order: CH3-X > 1° > 2° > 3°; favored by polar aprotic solvents (acetone, DMSO, DMF); results in 100% Walden inversion.",
      "Halide exchange: Finkelstein reaction ($R-Cl/Br + NaI \\xrightarrow{\\text{dry acetone}} R-I + NaCl\\downarrow$); Swarts reaction ($R-Cl/Br + AgF/Hg_2F_2/CoF_2/SbF_3 \\rightarrow R-F$).",
      "Elimination: Dehydrohalogenation by alcoholic $KOH$ follows Saytzeff (Zaitsev) rule: the more highly substituted, stable alkene is the major product.",
      "Haloarenes are extremely unreactive toward nucleophilic substitution due to: resonance partial double-bond character of C-Cl bond, $sp^2$ hybridized carbon (more electronegative), and instability of phenyl cation.",
      "Reactions of Haloarenes: Wurtz-Fittig ($ArX + RX + 2Na \\xrightarrow{\\text{ether}} Ar-R$), Fittig ($2ArX + 2Na \\rightarrow Ar-Ar$), and Dow's process ($Chlorobenzene + NaOH \\xrightarrow{623\\text{ K}, 300\\text{ atm}} Phenol$).",
    ],
    coreConcepts: [
      {
        title: "SN1 versus SN2 Reaction Mechanisms & Stereochemistry",
        content:
          "Nucleophilic substitution at $sp^3$ carbon proceeds via two contrasting pathways:\n\n1. **$S_N1$ (Substitution Nucleophilic Unimolecular)**:\n   - **Step 1 (Slow, Rate-determining)**: Heterolytic cleavage of C-X bond to form a planar carbocation intermediate: $\\text{Rate} = k [R-X]$.\n   - **Step 2 (Fast)**: Nucleophile attacks the planar carbocation equally from front and rear faces, giving a racemic mixture (50% retention + 50% inversion; practically, inversion slightly exceeds retention due to shielding by leaving group ion).\n   - **Reactivity Order**: $3^\\circ > 2^\\circ > 1^\\circ > \\text{CH}_3-X$. Allylic ($CH_2=CH-CH_2-X$) and benzylic ($C_6H_5-CH_2-X$) halides show exceptionally high $S_N1$ reactivity due to resonance stabilization of carbocations.\n   - **Solvent**: Polar protic ($H_2O, CH_3OH, CH_3COOH$) stabilizes carbocation and leaving group anion through hydrogen bonding.\n\n2. **$S_N2$ (Substitution Nucleophilic Bimolecular)**:\n   - **Single Concerted Step**: Nucleophile attacks from the side opposite to the leaving group (180° backside attack), passing through a penta-coordinate carbon transition state: $\\text{Rate} = k [R-X] [\\text{Nu}^-]$.\n   - **Stereochemistry**: Complete **Walden Inversion** of configuration (like an umbrella turning inside out in a storm).\n   - **Reactivity Order**: $\\text{CH}_3-X > 1^\\circ > 2^\\circ > 3^\\circ$ (strictly governed by steric hindrance; bulky groups hinder backside attack).\n   - **Solvent**: Polar aprotic (Acetone, DMSO, DMF, acetonitrile) solvates cations without solvating nucleophile, leaving nucleophile bare and highly reactive.",
        ncertPointers: [
          "Tertiary halides NEVER undergo SN2 due to massive steric crowding of 3 methyl groups.",
          "Optically active 2-bromooctane with aqueous hydroxide gives 2-octanol with inverted configuration via SN2.",
        ],
      },
      {
        title: "Named Reactions & Saytzeff's Elimination",
        content:
          "1. **Finkelstein Reaction**: Alkyl iodides are prepared by treating alkyl chlorides or bromides with sodium iodide in dry acetone:\n   $$R-Cl + NaI \\xrightarrow{\\text{dry acetone}} R-I + NaCl \\downarrow$$\n   *Why dry acetone?* $NaCl$ and $NaBr$ are insoluble in acetone and precipitate out, shifting the equilibrium forward according to Le Chatelier's principle.\n2. **Swarts Reaction**: Best method for synthesizing alkyl fluorides by heating alkyl chlorides or bromides with inorganic fluorides ($AgF, Hg_2F_2, CoF_2, \\text{or } SbF_3$):\n   $$CH_3-Br + AgF \\rightarrow CH_3-F + AgBr \\downarrow$$\n3. **Dehydrohalogenation ($\\beta$-Elimination) & Saytzeff's Rule**:\n   When a haloalkane with $\\beta$-hydrogen is heated with alcoholic $KOH$, an alkene is formed. When multiple alkenes can be formed, **Saytzeff's Rule** dictates:\n   *The preferred alkene is that which has the greater number of alkyl groups attached to the doubly bonded carbon atoms (more substituted, thermodynamically more stable alkene).*",
        ncertPointers: [
          "Alcoholic KOH acts as a base and causes elimination (E2); Aqueous KOH acts as a nucleophile and causes substitution (SN).",
        ],
      },
      {
        title: "Low Reactivity of Haloarenes & Organometallic Couplings",
        content:
          "Chlorobenzene is extremely resistant to nucleophilic substitution compared to chloroethane due to four distinct factors:\n1. **Resonance Effect**: Lone pairs on chlorine delocalize into the benzene ring, imparting partial double bond character to the $C-Cl$ bond (bond length $169\\text{ pm}$ vs $178\\text{ pm}$ in $R-Cl$), making it much harder to break.\n2. **Hybridization**: Carbon attached to halogen is $sp^2$ hybridized in haloarenes (33.3% s-character) vs $sp^3$ in haloalkanes (25% s-character). More electronegative $sp^2$ carbon holds $C-Cl$ electrons more tightly.\n3. **Instability of Phenyl Cation**: Self-ionization to phenyl cation is prohibited.\n4. **Electronic Repulsion**: Approaching nucleophile experiences repulsion from the electron-rich aromatic $\\pi$-cloud.\n\n*Activating Haloarenes*: Introduction of electron-withdrawing groups ($-NO_2$) at **ortho and para positions** greatly increases reactivity by stabilizing the intermediate carbanion (Meisenheimer complex). Meta position has no direct resonance stabilization of the negative charge.\n\n**Organometallic Coupling Reactions**:\n- **Wurtz Reaction**: $2 R-X + 2Na \\xrightarrow{\\text{dry ether}} R-R + 2NaX$\n- **Wurtz-Fittig Reaction**: $Ar-X + R-X + 2Na \\xrightarrow{\\text{dry ether}} Ar-R + 2NaX$\n- **Fittig Reaction**: $2 Ar-X + 2Na \\xrightarrow{\\text{dry ether}} Ar-Ar \\text{ (Diphenyl)} + 2NaX$",
        ncertPointers: [
          "Picryl chloride (2,4,6-trinitrochlorobenzene) hydrolyzes to picric acid by simply warming with warm water without any strong base!",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "SN1 vs SN2 Comparison",
        formula: "\\text{Rate}_{S_N1} = k[R-X] \\quad \\text{vs} \\quad \\text{Rate}_{S_N2} = k[R-X][\\text{Nu}^-]",
        symbols: "SN1 = \\text{unimolecular, carbocation}; SN2 = \\text{bimolecular, transition state}",
        siUnits: "Rate in mol/(L s)",
        applicationCondition: "Nucleophilic aliphatic substitution",
      },
      {
        name: "Saytzeff Elimination Rule",
        formula: "R-CH_2-CH(X)-CH_3 \\xrightarrow{\\text{alc. } KOH} R-CH=CH-CH_3 (\\text{major, Saytzeff}) + R-CH_2-CH=CH_2 (\\text{minor, Hofmann})",
        symbols: "Major product = \\text{more substituted alkene}",
        siUnits: "Chemical reaction",
        applicationCondition: "Dehydrohalogenation of secondary/tertiary halides",
      },
      {
        name: "Finkelstein and Swarts Reactions",
        formula: "R-X + NaI \\xrightarrow{\\text{acetone}} R-I; \\quad R-X + AgF \\rightarrow R-F",
        symbols: "Halide exchange reactions",
        siUnits: "Synthetic preparations",
        applicationCondition: "Synthesis of iodo- and fluoro-alkanes",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="250" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">SN1 vs SN2 Reaction Mechanisms</text>

  <!-- Left: SN1 -->
  <g transform="translate(60, 55)">
    <rect width="290" height="170" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1"/>
    <text x="145" y="24" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">SN1 Mechanism (2 Steps)</text>
    <text x="145" y="55" textAnchor="middle" fill="#f8fafc" fontSize="11">R-X  →  [ R⁺ ] (Planar)  +  X⁻</text>
    <text x="145" y="80" textAnchor="middle" fill="#f59e0b" fontSize="10">Nu⁻ attacks from Front or Back</text>
    <text x="145" y="110" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Racemization (Inversion &gt; Retention)</text>
    <text x="145" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">Order: 3° &gt; 2° &gt; 1° &gt; CH₃X</text>
    <text x="145" y="155" textAnchor="middle" fill="#93c5fd" fontSize="10">Solvent: Polar Protic (H₂O, EtOH)</text>
  </g>

  <!-- Right: SN2 -->
  <g transform="translate(410, 55)">
    <rect width="290" height="170" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1"/>
    <text x="145" y="24" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="bold">SN2 Mechanism (1 Step)</text>
    <text x="145" y="55" textAnchor="middle" fill="#f8fafc" fontSize="11">Nu⁻  +  C-X  →  [ Nu···C···X ]‡  →  Nu-C</text>
    <text x="145" y="80" textAnchor="middle" fill="#f59e0b" fontSize="10">Strict 180° Backside Attack</text>
    <text x="145" y="110" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">100% Walden Inversion</text>
    <text x="145" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">Order: CH₃X &gt; 1° &gt; 2° &gt; 3°</text>
    <text x="145" y="155" textAnchor="middle" fill="#fda4af" fontSize="10">Solvent: Polar Aprotic (Acetone, DMF)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "chem_u6_we1",
        questionNumber: 1,
        question:
          "Which of the following alkyl halides undergoes $S_N1$ hydrolysis at the FASTEST rate?",
        options: [
          { id: "A", text: "CH₃-CH₂-Cl" },
          { id: "B", text: "(CH₃)₂CH-Cl" },
          { id: "C", text: "(CH₃)₃C-Cl" },
          { id: "D", text: "C₆H₅-CH₂-Cl" },
        ],
        correctOption: "D",
        solutionSteps: [
          "Step 1: In $S_N1$, rate is directly determined by stability of the carbocation formed in the rate-determining step.",
          "Step 2: Compare carbocations: $CH_3CH_2^+$ (1°), $(CH_3)_2CH^+$ (2°), $(CH_3)_3C^+$ (3°), and $C_6H_5-CH_2^+$ (benzyl cation).",
          "Step 3: The benzyl carbocation is resonance-stabilized across 4 canonical resonance structures in the benzene ring.",
          "Step 4: Benzylic halides undergo $S_N1$ exceptionally fast, even faster than ordinary tertiary aliphatic halides in aqueous media.",
        ],
        cuetTip: "Rank of SN1 carbocation stability: Benzyl $\\approx$ Allyl > 3° > 2° > 1° > Methyl.",
      },
      {
        id: "chem_u6_we2",
        questionNumber: 2,
        question:
          "Heating 2-bromopentane with alcoholic $KOH$ produces pent-2-ene as the major product. This regioselectivity is explained by:",
        options: [
          { id: "A", text: "Markovnikov's rule" },
          { id: "B", text: "Saytzeff's rule" },
          { id: "C", text: "Hofmann's rule" },
          { id: "D", text: "Kharasch effect" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Dehydrohalogenation of $CH_3-CH_2-CH_2-CH(Br)-CH_3$ with alcoholic KOH can yield either pent-1-ene (disubstituted) or pent-2-ene (trisubstituted/more substituted).",
          "Step 2: Saytzeff (Zaitsev) rule states that in dehydrohalogenation, hydrogen is preferentially eliminated from the $\\beta$-carbon having fewer hydrogens, yielding the more highly substituted, stable alkene.",
          "Step 3: Pent-2-ene has 5 hyperconjugative $\\alpha$-hydrogens, making it more stable than pent-1-ene (2 $\\alpha$-hydrogens). Hence pent-2-ene is the major product (~81%).",
        ],
        cuetTip: "Alcoholic KOH $\\implies$ Saytzeff (more substituted). Bulky base like potassium tert-butoxide $\\implies$ Hofmann (less substituted alkene).",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Order of SN2 Reactivity",
        frequency: "Very High",
        pyqExample: {
          question:
            "Arrange the following compounds in decreasing order of reactivity toward $S_N2$ displacement:\n(I) 1-Bromobutane, (II) 2-Bromobutane, (III) 2-Bromo-2-methylpropane, (IV) 1-Bromo-2-methylpropane",
          options: [
            { id: "A", text: "I > IV > II > III" },
            { id: "B", text: "III > II > IV > I" },
            { id: "C", text: "I > II > IV > III" },
            { id: "D", text: "IV > I > II > III" },
          ],
          correctOption: "A",
          explanation: "SN2 is governed by steric hindrance: 1° unbranched (I) > 1° branched at beta carbon (IV) > 2° (II) > 3° (III).",
        },
        strategy: "For SN2, count carbons attached directly to the alpha-carbon: 1° > 2° > 3°. If two are 1°, less branching at beta-carbon is faster.",
      },
      {
        type: "Haloarene Inertness Statement Question",
        frequency: "High",
        pyqExample: {
          question:
            "Which of the following factors is NOT responsible for the low reactivity of chlorobenzene toward nucleophilic substitution?",
          options: [
            { id: "A", text: "Resonance stabilization of C-Cl bond with partial double bond character" },
            { id: "B", text: "sp² hybridization of the carbon atom attached to chlorine" },
            { id: "C", text: "Inductive effect of chlorine making ring electron deficient" },
            { id: "D", text: "Instability of the phenyl cation" },
          ],
          correctOption: "C",
          explanation: "The -I effect of chlorine actually makes the ring more positive; it does NOT hinder nucleophilic attack. The true reasons are resonance double bond character, sp² hybridization, phenyl cation instability, and repulsion from aromatic pi-electrons.",
        },
        strategy: "Memorize NCERT's four exact reasons for haloarene inertness. Option C is the standard distractor.",
      },
    ],
    commonTraps: [
      {
        misconception: "Thinking alcoholic KOH causes nucleophilic substitution because OH- is present.",
        whyWrong: "In alcohol ($C_2H_5OH$), $KOH$ forms ethoxide ion ($C_2H_5O^-$), which is a much stronger base than $OH^-$.",
        correctUnderstanding: "Alcoholic KOH acts as a strong BASE and causes elimination (E2 $\\rightarrow$ alkene). Aqueous KOH is strongly hydrated and acts as a NUCLEOPHILE, causing substitution (SN $\\rightarrow$ alcohol).",
      },
      {
        misconception: "Expecting nitro group at meta position to activate chlorobenzene toward nucleophilic substitution.",
        whyWrong: "In nucleophilic aromatic substitution, the negative charge in the intermediate carbanion delocalizes only to the ortho and para positions.",
        correctUnderstanding: "$-NO_2$ groups at ortho and para positions strongly activate haloarenes; a $-NO_2$ group at the meta position has NO direct resonance activating effect.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "SN1 vs SN2 Inversion Mnemonic",
        mnemonic: "SN2 is a TWO-sided attack $\\rightarrow$ flips like an umbrella (Walden Inversion).",
        rule: "SN2 = Inversion. SN1 = Racemization (both retention and inversion).",
        shortcut: "Backside attack in SN2 always reverses optical configuration (R $\\rightarrow$ S or S $\\rightarrow$ R).",
        whenToApply: "Stereochemistry questions in haloalkanes.",
      },
      {
        title: "Halide Exchange Reagent Hook",
        mnemonic: "Finkelstein uses I-odine in Acetone. Swarts uses S-ilver fluoride.",
        rule: "Finkelstein = NaI in dry acetone $\\rightarrow$ R-I. Swarts = Metal fluorides ($AgF, Hg_2F_2, CoF_2$) $\\rightarrow$ R-F.",
        shortcut: "Finkelstein $\\rightarrow$ I. Swarts $\\rightarrow$ F.",
        whenToApply: "Named reaction identification questions.",
      },
    ],
    quickRevisionCard: {
      title: "Haloalkanes & Haloarenes — Quick Card",
      bulletPoints: [
        "SN1: 2-step, carbocation, 3° > 2° > 1°, polar protic, racemization.",
        "SN2: 1-step, transition state, CH3X > 1° > 2° > 3°, polar aprotic, Walden inversion.",
        "Finkelstein: $R-X + NaI \\xrightarrow{\\text{acetone}} R-I + NaX\\downarrow$.",
        "Swarts: $R-X + AgF/Hg_2F_2/CoF_2/SbF_3 \\rightarrow R-F$.",
        "Saytzeff's rule: Elimination gives more substituted, stable alkene.",
        "Alc. KOH $\\rightarrow$ Elimination (alkene); Aq. KOH $\\rightarrow$ Substitution (alcohol).",
        "Chlorobenzene inertness: Resonance partial double bond, sp² C, phenyl cation instability.",
        "NO2 at ortho/para activates chlorobenzene toward nucleophilic substitution.",
        "Wurtz: $2RX \\rightarrow R-R$; Wurtz-Fittig: $ArX + RX \\rightarrow Ar-R$; Fittig: $2ArX \\rightarrow Ar-Ar$.",
        "DDT: Dichlorodiphenyltrichloroethane, non-biodegradable insecticide.",
      ],
    },
    practiceQuestions: [
      {
        id: "chem_u6_q1",
        question: "Which of the following solvents is best suited for an $S_N2$ reaction?",
        type: "standard",
        options: [
          { id: "A", text: "Water" },
          { id: "B", text: "Ethanol" },
          { id: "C", text: "Dimethyl sulfoxide (DMSO)" },
          { id: "D", text: "Acetic acid" },
        ],
        correctOption: "C",
        explanation: "DMSO is a polar aprotic solvent. It solvates the metal cation without solvating the nucleophile, leaving the nucleophile highly reactive for SN2 attack.",
        difficulty: "medium",
      },
      {
        id: "chem_u6_q2",
        question: "The conversion of chlorobenzene into phenol by heating with 6-8% aqueous $NaOH$ at 623 K and 300 atm pressure is known as:",
        type: "standard",
        options: [
          { id: "A", text: "Dow's process" },
          { id: "B", text: "Raschig process" },
          { id: "C", text: "Darzen's process" },
          { id: "D", text: "Kolbe's process" },
        ],
        correctOption: "A",
        explanation: "Dow's process industrially hydrolyzes chlorobenzene under drastic conditions (623 K, 300 atm) via a benzyne intermediate to produce phenol.",
        difficulty: "easy",
      },
      {
        id: "chem_u6_q3",
        question: "Which of the following compounds gives a positive Iodoform test with yellow precipitate of $CHI_3$?",
        type: "standard",
        options: [
          { id: "A", text: "Methanol" },
          { id: "B", text: "Ethanol" },
          { id: "C", text: "1-Propanol" },
          { id: "D", text: "Benzophenone" },
        ],
        correctOption: "B",
        explanation: "The iodoform test requires a $CH_3-CH(OH)-$ or $CH_3-CO-$ group. Ethanol ($CH_3CH_2OH$) contains this group and oxidizes to ethanal to give yellow $CHI_3$.",
        difficulty: "easy",
      },
      {
        id: "chem_u6_q4",
        question: "Assertion (A): Chloroform is stored in dark, closed bottles completely filled up to the brim.\nReason (R): In the presence of sunlight and air, chloroform oxidizes into a highly poisonous gas called phosgene ($COCl_2$).",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "$2CHCl_3 + O_2 \\xrightarrow{h\\nu} 2COCl_2 + 2HCl$. Storing in dark amber bottles filled to the neck excludes air and light, preventing phosgene formation.",
        difficulty: "easy",
      },
      {
        id: "chem_u6_q5",
        question: "Match List-I (Reaction Name) with List-II (Key Reagents / Mechanism):\nP. Finkelstein reaction\nQ. Swarts reaction\nR. Wurtz-Fittig reaction\nS. Sandmeyer reaction",
        type: "match-the-following",
        options: [
          { id: "A", text: "P-NaI in dry acetone, Q-AgF or CoF2, R-ArX + RX + Na in ether, S-ArN2+Cl- with Cu2Cl2/HCl" },
          { id: "B", text: "P-AgF, Q-NaI in acetone, R-ArN2+Cl-, S-ArX + RX + Na" },
          { id: "C", text: "P-NaI in dry acetone, Q-ArX + RX + Na, R-AgF, S-Cu2Cl2/HCl" },
          { id: "D", text: "P-Cu2Cl2/HCl, Q-AgF, R-NaI, S-ArX + RX + Na" },
        ],
        correctOption: "A",
        explanation: "Finkelstein prepares R-I using NaI/acetone; Swarts prepares R-F using AgF; Wurtz-Fittig couples ArX and RX; Sandmeyer prepares ArCl using Cu2Cl2/HCl.",
        difficulty: "easy",
      },
      {
        id: "chem_u6_q6",
        question: "In the $S_N2$ reaction of $(R)$-2-bromobutane with aqueous $NaOH$, the product obtained is:",
        type: "standard",
        options: [
          { id: "A", text: "(R)-butan-2-ol" },
          { id: "B", text: "(S)-butan-2-ol" },
          { id: "C", text: "Racemic butan-2-ol" },
          { id: "D", text: "But-2-ene" },
        ],
        correctOption: "B",
        explanation: "$S_N2$ proceeds strictly via backside attack resulting in 100% Walden inversion: the $(R)$ reactant yields pure $(S)$ product.",
        difficulty: "medium",
      },
      {
        id: "chem_u6_q7",
        question: "Which of the following compounds has the HIGHEST boiling point?",
        type: "standard",
        options: [
          { id: "A", text: "CH₃-CH₂-CH₂-CH₂-Br" },
          { id: "B", text: "(CH₃)₂CH-CH₂-Br" },
          { id: "C", text: "(CH₃)₃C-Br" },
          { id: "D", text: "CH₃-CH₂-CH(Br)-CH₃" },
        ],
        correctOption: "A",
        explanation: "For isomeric alkyl halides, boiling point decreases with increasing branching because branching makes the molecule spherical, decreasing surface area and van der Waals forces. 1-bromobutane has the highest surface area.",
        difficulty: "medium",
      },
      {
        id: "chem_u6_q8",
        question: "Treating chlorobenzene with $HNO_3 / H_2SO_4$ gives 1-chloro-4-nitrobenzene as the major product because chlorine is:",
        type: "standard",
        options: [
          { id: "A", text: "Ortho, para-directing and activating" },
          { id: "B", text: "Ortho, para-directing and deactivating" },
          { id: "C", text: "Meta-directing and deactivating" },
          { id: "D", text: "Meta-directing and activating" },
        ],
        correctOption: "B",
        explanation: "Chlorine is overall deactivating due to strong -I effect, but ortho, para-directing due to +M resonance effect, favoring the less sterically hindered para product.",
        difficulty: "medium",
      },
      {
        id: "chem_u6_q9",
        question: "Which of the following will react most readily with moist silver oxide ($Ag_2O / H_2O$) to form an alcohol?",
        type: "standard",
        options: [
          { id: "A", text: "C₆H₅-Cl" },
          { id: "B", text: "CH₂=CH-Cl" },
          { id: "C", text: "CH₂=CH-CH₂-Cl" },
          { id: "D", text: "CH₃-Cl" },
        ],
        correctOption: "C",
        explanation: "Allyl chloride ($CH_2=CH-CH_2-Cl$) hydrolyzes readily because the resulting allyl carbocation is resonance-stabilized.",
        difficulty: "medium",
      },
      {
        id: "chem_u6_q10",
        question: "Assertion (A): Alkyl iodides darken on standing for a long time.\nReason (R): Alkyl iodides slowly decompose in the presence of light to liberate free iodine.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "Due to the weak $C-I$ bond ($238\\text{ kJ/mol}$), light decomposes alkyl iodides: $2R-I \\xrightarrow{h\\nu} R-R + I_2$, turning the liquid brown/violet.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["chemistry_u1_t1"],
      relatedTopics: ["chemistry_u7_t1"],
      practiceTestId: "practice-chemistry-unit6-test1",
      practiceTestUrl: "/test/practice-chemistry-unit6-test1",
      weaknessReportUrl: "/dashboard/radar?subject=chemistry",
      weaknessRadarUrl: "/dashboard/radar?subject=chemistry",
    },
    subjectSpecific: {
      chemistry: {
        namedReactions: [
          { name: "Finkelstein Reaction", reagents: "NaI in dry acetone", condition: "Room temp / reflux", equation: "R-Cl + NaI -> R-I + NaCl(s)" },
          { name: "Swarts Reaction", reagents: "AgF, Hg2F2, CoF2, or SbF3", condition: "Heat", equation: "R-Br + AgF -> R-F + AgBr" },
          { name: "Wurtz-Fittig Reaction", reagents: "Na in dry ether", condition: "Room temp", equation: "Ar-Br + R-Br + 2Na -> Ar-R + 2NaBr" },
        ],
        exceptionsList: [
          "Chlorine is deactivating overall (-I > +M) yet ortho-para directing in electrophilic aromatic substitutions.",
          "Neopentyl halides [(CH3)3C-CH2-X] are primary halides but undergo SN2 extraordinarily slowly due to massive steric hindrance from the beta-tert-butyl group.",
        ],
      },
    },
  },
];
