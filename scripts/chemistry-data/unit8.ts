import { NoteDocument } from "@/types/notes";

export const unit8Topics: NoteDocument[] = [
  {
    id: "chemistry_u8_t1",
    slug: "nucleophilic-addition-reactions-acidity-carboxylic-acid-derivatives",
    subject: "chemistry",
    subjectName: "Chemistry",
    subjectCode: "306",
    unitNumber: 8,
    unitTitle: "Aldehydes, Ketones and Carboxylic Acids",
    topicTitle: "Nucleophilic Addition Reactions, Acidity, Carboxylic Acid Derivatives",
    ncertReference: {
      class: "Class 12",
      book: "Chemistry Part 2",
      chapterNumber: 8,
      chapterName: "Aldehydes, Ketones and Carboxylic Acids",
      sections: [
        "8.1 Nomenclature and Structure of Carbonyl Group",
        "8.2 Preparation of Aldehydes and Ketones (Rosenmund, Stephen, Etard, Ozonolysis)",
        "8.3 Physical Properties: Dipole Moments & Boiling Points",
        "8.4 Nucleophilic Addition Reactions & Mechanisms",
        "8.5 Reductions: Clemmensen & Wolff-Kishner",
        "8.6 Oxidation & Tests: Tollens', Fehling's, and Iodoform Tests",
        "8.7 Reactions involving alpha-Hydrogens: Aldol Condensation & Cannizzaro Reaction",
        "8.8 Carboxylic Acids: Acidity Order & HVZ Reaction",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (5 questions per shift)",
      totalPyqsInRepo: 180,
      weightagePercentage: 11.0,
    },
    summary30Seconds: [
      "Nucleophilic addition reactivity order: $HCHO > CH_3CHO > CH_3COCH_3 > \\text{Acetophenone} > \\text{Benzophenone}$. Aldehydes are more reactive than ketones due to smaller steric crowding and less $+I$ electron donation.",
      "Named preparations: Rosenmund reduction ($RCOCl + H_2 \\xrightarrow{Pd/BaSO_4} RCHO$); Stephen reduction ($RCN + SnCl_2/HCl \\xrightarrow{H_3O^+} RCHO$); Etard reaction (Toluene $+ CrO_2Cl_2 \\rightarrow$ Benzaldehyde).",
      "Reductions to hydrocarbons: Clemmensen reduction ($Zn-Hg / \\text{conc. } HCl$); Wolff-Kishner reduction ($NH_2NH_2 / KOH, \\text{ethylene glycol}$, basic medium).",
      "Qualitative tests: Tollens' reagent ($[Ag(NH_3)_2]^+$) gives silver mirror with all aldehydes; Fehling's solution oxidizes aliphatic aldehydes to red $Cu_2O$ ppt (benzaldehyde gives negative Fehling's test); Iodoform test ($I_2 + NaOH$) gives yellow $CHI_3$ ppt with methyl ketones ($CH_3-CO-$).",
      "Aldol condensation: Requires $\\alpha$-hydrogen; catalyzed by dilute alkali; forms $\\beta$-hydroxyaldehyde (aldol) which dehydrates to $\\alpha,\\beta$-unsaturated carbonyl compound.",
      "Cannizzaro reaction: Aldehydes with NO $\\alpha$-hydrogen ($HCHO, C_6H_5CHO$) undergo self redox (disproportionation) in concentrated alkali (50% $KOH$) to yield an alcohol and a carboxylate salt.",
      "Carboxylic acid acidity: Stronger than phenols and alcohols. Electron withdrawing groups ($-I, -M$) increase acidity ($CF_3COOH > CCl_3COOH > CHCl_2COOH > CH_2ClCOOH > HCOOH > C_6H_5COOH > CH_3COOH$).",
      "HVZ reaction: Carboxylic acids with $\\alpha$-hydrogen react with $Cl_2$ or $Br_2$ in presence of red phosphorus to give $\\alpha$-halocarboxylic acids.",
    ],
    coreConcepts: [
      {
        title: "Carbonyl Structure & Nucleophilic Addition Reactivity",
        content:
          "The carbonyl carbon is $sp^2$ hybridized with a planar geometry ($120^\\circ$ bond angles). The electronegativity difference between carbon (2.5) and oxygen (3.5) creates a strong dipole with positive partial charge on carbon:\n$$>C^{\\delta+} = O^{\\delta-}$$\n\n**Mechanism of Nucleophilic Addition**:\n- Nu⁻ attacks the electrophilic carbonyl carbon from above or below the plane, breaking the $\\pi$-bond and transforming the planar $sp^2$ carbon into a tetrahedral alkoxide $sp^3$ intermediate.\n- Proton transfer yields the addition product.\n\n**Reactivity Trends toward Nucleophilic Attack**:\n1. **Steric Factor**: Bulkier alkyl groups hinder the approaching nucleophile. Aldehydes (one substituent) are much less sterically crowded than ketones (two substituents).\n2. **Electronic (+I) Factor**: Alkyl groups donate electron density ($+I$ effect), neutralizing the partial positive charge on carbon and making it less attractive to nucleophiles. Two methyl groups in acetone reduce electrophilicity more than one methyl in ethanal.\n3. **Aromatic Carbonyls**: In benzaldehyde, resonance delocalizes the ring electrons into the carbonyl group, reducing electrophilicity; hence benzaldehyde is less reactive than aliphatic aldehydes:\n$$HCHO > CH_3CHO > CH_3CH_2CHO > CH_3COCH_3 > C_6H_5CHO > C_6H_5COCH_3 > C_6H_5COC_6H_5$$",
        ncertPointers: [
          "Addition of NaHSO3: Forms crystalline bisulfite addition compounds; used for purification and separation of aldehydes and methyl ketones.",
          "Addition of Grignard reagent to aldehydes gives secondary alcohols; to ketones gives tertiary alcohols.",
        ],
      },
      {
        title: "Aldol Condensation vs Cannizzaro Reaction & Key Tests",
        content:
          "**1. Aldol Condensation (Requires $\\ge 1$ $\\alpha$-hydrogen)**:\n- Aldehydes or ketones containing at least one $\\alpha$-hydrogen react in the presence of dilute alkali ($NaOH, Ba(OH)_2$) to form $\\beta$-hydroxy aldehydes (aldols) or $\\beta$-hydroxy ketones (ketols).\n- On heating, they easily eliminate water to form conjugated **$\\alpha,\\beta$-unsaturated carbonyl compounds**:\n$$2 CH_3CHO \\xrightarrow{\\text{dil. } NaOH} CH_3-CH(OH)-CH_2-CHO \\xrightarrow{\\Delta, -H_2O} CH_3-CH=CH-CHO \\text{ (But-2-enal)}$$\n- **Cross-Aldol**: When two different carbonyl compounds are reacted, a mixture of 4 products is obtained unless one partner lacks $\\alpha$-hydrogens (e.g., $C_6H_5CHO + CH_3CHO \\rightarrow C_6H_5-CH=CH-CHO$, cinnamaldehyde).\n\n**2. Cannizzaro Reaction (Requires NO $\\alpha$-hydrogen)**:\n- Aldehydes lacking $\\alpha$-hydrogens (e.g., Formaldehyde $HCHO$, Benzaldehyde $C_6H_5CHO$, Trimethylacetaldehyde $(CH_3)_3C-CHO$) do not form enolates. In concentrated alkali (50% $KOH$), one molecule is reduced to an alcohol while the second is oxidized to a carboxylate salt (self redox):\n$$2 C_6H_5CHO + \\text{conc. } KOH \\rightarrow C_6H_5CH_2OH \\text{ (Benzyl alcohol)} + C_6H_5COOK \\text{ (Potassium benzoate)}$$\n- **Cross-Cannizzaro**: Formaldehyde with benzaldehyde: $HCHO$ is more electrophilic and oxidizes preferentially to formate, reducing benzaldehyde to benzyl alcohol:\n$$C_6H_5CHO + HCHO + \\text{conc. } NaOH \\rightarrow C_6H_5CH_2OH + HCOONa$$\n\n**3. Diagnostic Qualitative Tests**:\n- **Tollens' Test**: Ammoniacal silver nitrate solution ($[Ag(NH_3)_2]^+$). Both aliphatic and aromatic aldehydes reduce it to a shining silver mirror ($Ag\\downarrow$). Ketones do NOT.\n- **Fehling's Test**: Alkaline $CuSO_4$ (Fehling A) + Sodium potassium tartrate / Rochelle salt (Fehling B). Aliphatic aldehydes give red cuprous oxide ($Cu_2O\\downarrow$) ppt. **Benzaldehyde gives a NEGATIVE Fehling's test**.\n- **Iodoform Test**: Yellow crystalline precipitate of $CHI_3$ (m.p. $119^\\circ\\text{C}$) formed by warming with $I_2 + NaOH$. Positive for compounds containing $CH_3-CO-$ (ethanal, all methyl ketones) or $CH_3-CH(OH)-$ (ethanol, sec-alcohols).",
        ncertPointers: [
          "Benzaldehyde reduces Tollens' reagent but does NOT reduce Fehling's solution. This distinguishes aliphatic and aromatic aldehydes.",
        ],
      },
      {
        title: "Carboxylic Acids: Acidity Trends & The HVZ Reaction",
        content:
          "**Carboxylic Acid Acidity**:\n- Carboxylic acids are the most acidic organic compounds because the carboxylate anion ($-COO^-$) is stabilized by two completely equivalent resonance structures with negative charge delocalized over two highly electronegative oxygen atoms.\n- Phenoxide ion delocalizes charge over carbon atoms, making carboxylate resonance vastly superior.\n- **Substituent Effect**:\n  - Electron-withdrawing groups ($-I, -M$, e.g., $-CF_3, -CCl_3, -NO_2, -CN, -F, -Cl, -Br$) disperse negative charge $\\implies$ increase acid strength.\n  - Electron-donating groups ($+I$, e.g., alkyl groups) intensify negative charge $\\implies$ decrease acid strength.\n  - **Canonical CUET Acidity Order**:\n    $$CF_3COOH > CCl_3COOH > CHCl_2COOH > NO_2CH_2COOH > FCH_2COOH > ClCH_2COOH > HCOOH > C_6H_5COOH > CH_3COOH$$\n  - Formic acid ($HCOOH$, $pK_a = 3.75$) is more acidic than benzoic acid ($pK_a = 4.19$) and acetic acid ($pK_a = 4.76$).\n\n**Hell-Volhard-Zelinsky (HVZ) Reaction**:\n- Carboxylic acids having an $\\alpha$-hydrogen react with chlorine or bromine in the presence of a catalytic amount of red phosphorus, followed by hydrolysis, to yield $\\alpha$-halocarboxylic acids:\n$$R-CH_2-COOH \\xrightarrow{\\text{(i) } X_2 / \\text{Red P}, \\text{ (ii) } H_2O} R-CH(X)-COOH \\quad (X = Cl, Br)$$",
        ncertPointers: [
          "Formic acid reduces Tollens' reagent because it possesses an aldehyde group attached to -OH (H-CO-OH).",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Nucleophilic Addition Reactivity Series",
        formula: "HCHO > RCHO > R_2CO > \\text{ArCHO} > \\text{ArCOAr}",
        symbols: "Reactivity governed by steric accessibility and partial positive charge on carbon",
        siUnits: "Relative kinetic rate order",
        applicationCondition: "Addition of HCN, NaHSO3, Grignard reagents, hydroxylamine",
      },
      {
        name: "Clemmensen vs Wolff-Kishner Reductions",
        formula: ">C=O \\xrightarrow{Zn-Hg / \\text{conc. } HCl} >CH_2 \\quad \\text{vs} \\quad >C=O \\xrightarrow{NH_2NH_2 / KOH, \\text{glycol}} >CH_2",
        symbols: "Clemmensen = \\text{acid sensitive substrates}; Wolff-Kishner = \\text{base sensitive substrates}",
        siUnits: "Complete reduction to alkane",
        applicationCondition: "Converting carbonyls directly into methylene group",
      },
      {
        name: "Hell-Volhard-Zelinsky (HVZ) Equation",
        formula: "R-CH_2-COOH \\xrightarrow{\\text{Br}_2 / \\text{Red P}} \\xrightarrow{H_2O} R-CH(Br)-COOH",
        symbols: "\\alpha\\text{-bromination of aliphatic carboxylic acids}",
        siUnits: "Chemical synthesis",
        applicationCondition: "Requires at least one alpha-hydrogen",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="250" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
  <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Aldol Condensation vs Cannizzaro Reaction Diagnostic</text>

  <!-- Left: Aldol -->
  <g transform="translate(60, 55)">
    <rect width="290" height="170" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1"/>
    <text x="145" y="24" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Aldol Condensation</text>
    <text x="145" y="55" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">Requires at least ONE α-Hydrogen</text>
    <text x="145" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10">Reagent: Dilute alkali (10% NaOH)</text>
    <text x="145" y="110" textAnchor="middle" fill="#f8fafc" fontSize="11">2 CH₃CHO → CH₃-CH(OH)-CH₂-CHO</text>
    <text x="145" y="135" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Δ, -H₂O → CH₃-CH=CH-CHO</text>
    <text x="145" y="155" textAnchor="middle" fill="#38bdf8" fontSize="10">(α,β-unsaturated aldehyde)</text>
  </g>

  <!-- Right: Cannizzaro -->
  <g transform="translate(410, 55)">
    <rect width="290" height="170" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1"/>
    <text x="145" y="24" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="bold">Cannizzaro Reaction</text>
    <text x="145" y="55" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">Requires NO α-Hydrogen (HCHO, C₆H₅CHO)</text>
    <text x="145" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10">Reagent: Concentrated alkali (50% KOH)</text>
    <text x="145" y="110" textAnchor="middle" fill="#fbbf24" fontSize="10">Disproportionation (Self Redox):</text>
    <text x="145" y="135" textAnchor="middle" fill="#f8fafc" fontSize="11">2 C₆H₅CHO → C₆H₅CH₂OH + C₆H₅COOK</text>
    <text x="145" y="155" textAnchor="middle" fill="#fda4af" fontSize="10">One alcohol + One carboxylate salt</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "chem_u8_we1",
        questionNumber: 1,
        question:
          "Which of the following compounds will undergo CANNIZZARO reaction on treatment with concentrated 50% $KOH$ solution?",
        options: [
          { id: "A", text: "CH₃-CHO (Ethanal)" },
          { id: "B", text: "CH₃-CH₂-CHO (Propanal)" },
          { id: "C", text: "(CH₃)₃C-CHO (2,2-Dimethylpropanal)" },
          { id: "D", text: "CH₃-CO-CH₃ (Propanone)" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Cannizzaro reaction occurs strictly in aldehydes having NO $\\alpha$-hydrogens.",
          "Step 2: Ethanal has $3$ $\\alpha$-hydrogens $\\rightarrow$ undergoes aldol condensation.",
          "Step 3: Propanal has $2$ $\\alpha$-hydrogens $\\rightarrow$ undergoes aldol condensation.",
          "Step 4: Propanone has $6$ $\\alpha$-hydrogens $\\rightarrow$ undergoes aldol condensation.",
          "Step 5: In 2,2-dimethylpropanal ($(CH_3)_3C-CHO$), the carbon adjacent to the $-CHO$ group is attached to 3 methyl groups and has ZERO $\\alpha$-hydrogens. Hence it undergoes Cannizzaro reaction.",
        ],
        cuetTip: "Substances showing Cannizzaro in CUET: Formaldehyde ($HCHO$), Benzaldehyde ($C_6H_5CHO$), Trimethylacetaldehyde ($(CH_3)_3C-CHO$), and Chloral ($CCl_3-CHO$).",
      },
      {
        id: "chem_u8_we2",
        questionNumber: 2,
        question:
          "Arrange the following carboxylic acids in order of INCREASING acid strength:\n(I) $CH_3COOH$, (II) $ClCH_2COOH$, (III) $Cl_2CHCOOH$, (IV) $Cl_3CCOOH$",
        options: [
          { id: "A", text: "I < II < III < IV" },
          { id: "B", text: "IV < III < II < I" },
          { id: "C", text: "I < III < II < IV" },
          { id: "D", text: "II < I < III < IV" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Chlorine is an electronegative halogen with a strong electron-withdrawing inductive effect ($-I$).",
          "Step 2: The $-I$ effect stabilizes the conjugate carboxylate anion ($R-COO^-$) by dispersing the negative charge.",
          "Step 3: As the number of chlorine atoms increases from 0 to 3, the cumulative $-I$ effect increases, dramatically enhancing acid strength.",
          "Step 4: Hence the correct increasing order is $CH_3COOH < ClCH_2COOH < Cl_2CHCOOH < Cl_3CCOOH$.",
        ],
        cuetTip: "More halogen atoms on $\\alpha$-carbon $\\implies$ vastly lower $pK_a$ and higher acidity.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Aldol vs Cannizzaro Classification",
        frequency: "Very High",
        pyqExample: {
          question:
            "Which of the following will NOT give an aldol condensation when treated with dilute $NaOH$?",
          options: [
            { id: "A", text: "Acetaldehyde" },
            { id: "B", text: "Benzaldehyde" },
            { id: "C", text: "Acetone" },
            { id: "D", text: "Propanal" },
          ],
          correctOption: "B",
          explanation: "Benzaldehyde ($C_6H_5CHO$) has no alpha-hydrogens, so it cannot form an enolate ion required for aldol condensation. It undergoes Cannizzaro reaction instead.",
        },
        strategy: "Check the carbon directly attached to C=O. If it has no hydrogens attached, it CANNOT do aldol.",
      },
      {
        type: "Chemical Distinguishing Test",
        frequency: "High",
        pyqExample: {
          question:
            "Pentan-2-one and Pentan-3-one can be chemically distinguished by using:",
          options: [
            { id: "A", text: "Tollens' reagent" },
            { id: "B", text: "Fehling's solution" },
            { id: "C", text: "Iodoform test (I₂ + NaOH)" },
            { id: "D", text: "2,4-DNP test" },
          ],
          correctOption: "C",
          explanation: "Pentan-2-one is a methyl ketone ($CH_3-CO-CH_2CH_2CH_3$) and gives a yellow precipitate of iodoform ($CHI_3$). Pentan-3-one lacks a methyl ketone group and gives a negative test.",
        },
        strategy: "Look for $CH_3-CO-$. Pentan-2-one has it; Pentan-3-one does not.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming benzaldehyde reduces Fehling's solution because it is an aldehyde.",
        whyWrong: "Fehling's reagent is a weaker oxidizing agent than Tollens' reagent and cannot oxidize aromatic aldehydes.",
        correctUnderstanding: "Benzaldehyde gives a positive Tollens' test (silver mirror) but a NEGATIVE Fehling's test. Only aliphatic aldehydes reduce Fehling's solution.",
      },
      {
        misconception: "Using Clemmensen reduction on acid-sensitive compounds containing acetals or tertiary alcohols.",
        whyWrong: "Clemmensen reduction uses concentrated $HCl$, which hydrolyzes acetals or causes dehydration of alcohols.",
        correctUnderstanding: "For acid-sensitive compounds, use Wolff-Kishner reduction ($NH_2NH_2 / KOH$, basic medium). For base-sensitive compounds, use Clemmensen reduction ($Zn-Hg / HCl$).",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Aldol vs Cannizzaro Selection",
        mnemonic: "Aldol has Alpha. Cannizzaro CANNOT have Alpha.",
        rule: "Alpha-H present $\\rightarrow$ Aldol. Alpha-H absent $\\rightarrow$ Cannizzaro.",
        shortcut: "Count hydrogens on the carbon next to C=O. $>0 \\implies$ Aldol. $0 \\implies$ Cannizzaro.",
        whenToApply: "Reaction type prediction MCQs.",
      },
      {
        title: "Iodoform Detection Rule",
        mnemonic: "CH3-C=O or CH3-CH(OH) creates Yellow Ice (Iodoform).",
        rule: "A yellow precipitate of $CHI_3$ appears only if the compound has $CH_3-CO-$ or $CH_3-CH(OH)-$.",
        shortcut: "Ethanol is the ONLY primary alcohol that gives positive iodoform test.",
        whenToApply: "Chemical distinguishing tests.",
      },
    ],
    quickRevisionCard: {
      title: "Aldehydes, Ketones & Carboxylic Acids — Quick Card",
      bulletPoints: [
        "Reactivity: $HCHO > CH_3CHO > CH_3COCH_3 > \\text{Aromatic carbonyls}$.",
        "Rosenmund: $RCOCl + H_2 \\xrightarrow{Pd/BaSO_4} RCHO$.",
        "Stephen: $RCN + SnCl_2/HCl \\xrightarrow{H_3O^+} RCHO$.",
        "Clemmensen: $Zn-Hg/HCl$ (acidic); Wolff-Kishner: $NH_2NH_2/KOH$ (basic).",
        "Tollens': Positive for all aldehydes (silver mirror); Negative for ketones.",
        "Fehling's: Positive for aliphatic aldehydes (red $Cu_2O$); Negative for benzaldehyde.",
        "Iodoform: Positive for $CH_3CO-$ and $CH_3CH(OH)-$. Ethanol is only 1° alcohol giving positive test.",
        "Aldol: Needs $\\alpha$-H $\\rightarrow \\beta$-hydroxycarbonyl $\\xrightarrow{\\Delta} \\alpha,\\beta$-unsaturated.",
        "Cannizzaro: No $\\alpha$-H ($HCHO, C_6H_5CHO$) $+ 50\\% KOH \\rightarrow$ alcohol + salt.",
        "Acidity: $CF_3COOH > CCl_3COOH > CHCl_2COOH > HCOOH > C_6H_5COOH > CH_3COOH$.",
      ],
    },
    practiceQuestions: [
      {
        id: "chem_u8_q1",
        question: "Which of the following reagents is used in the Rosenmund reduction to convert acyl chlorides to aldehydes?",
        type: "standard",
        options: [
          { id: "A", text: "H₂ in the presence of Pd poisoned with BaSO₄" },
          { id: "B", text: "SnCl₂ and concentrated HCl" },
          { id: "C", text: "Chromyl chloride in CS₂" },
          { id: "D", text: "DIBAL-H" },
        ],
        correctOption: "A",
        explanation: "Rosenmund reduction uses $H_2$ gas over $Pd$ catalyst poisoned with $BaSO_4$ (and quinoline/sulfur) to prevent further reduction of the aldehyde to an alcohol.",
        difficulty: "easy",
      },
      {
        id: "chem_u8_q2",
        question: "Compound (A) with molecular formula $C_3H_6O$ forms a 2,4-DNP derivative, gives a positive iodoform test, but does NOT reduce Tollens' reagent. Compound (A) is:",
        type: "standard",
        options: [
          { id: "A", text: "Propanal" },
          { id: "B", text: "Propanone (Acetone)" },
          { id: "C", text: "Prop-2-en-1-ol" },
          { id: "D", text: "Methoxyethene" },
        ],
        correctOption: "B",
        explanation: "Forms 2,4-DNP $\\implies$ carbonyl. Negative Tollens' $\\implies$ ketone. Positive iodoform $\\implies$ methyl ketone. Propanone ($CH_3COCH_3$) satisfies all criteria.",
        difficulty: "easy",
      },
      {
        id: "chem_u8_q3",
        question: "The product formed when benzaldehyde is heated with concentrated $NaOH$ solution (Cannizzaro reaction) is:",
        type: "standard",
        options: [
          { id: "A", text: "Benzyl alcohol and Sodium benzoate" },
          { id: "B", text: "Benzoic acid and Phenol" },
          { id: "C", text: "Benzophenone and Methanol" },
          { id: "D", text: "Cinnamic acid" },
        ],
        correctOption: "A",
        explanation: "Disproportionation of two benzaldehyde molecules yields one reduced product (benzyl alcohol, $C_6H_5CH_2OH$) and one oxidized product (sodium benzoate, $C_6H_5COONa$).",
        difficulty: "easy",
      },
      {
        id: "chem_u8_q4",
        question: "Assertion (A): Formic acid ($HCOOH$) reduces Tollens' reagent, whereas acetic acid ($CH_3COOH$) does not.\nReason (R): Formic acid contains both an aldehyde group and a carboxylic acid group in its structure.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both A and R are true and R is the correct explanation of A" },
          { id: "B", text: "Both A and R are true but R is not the correct explanation of A" },
          { id: "C", text: "A is true but R is false" },
          { id: "D", text: "A is false but R is true" },
        ],
        correctOption: "A",
        explanation: "Formic acid structure has a hydrogen directly attached to carbonyl ($H-CO-OH$), allowing it to function as a reducing agent toward Tollens' and Fehling's reagents.",
        difficulty: "medium",
      },
      {
        id: "chem_u8_q5",
        question: "Match List-I (Reduction Reaction) with List-II (Reagents / Conditions):\nP. Clemmensen reduction\nQ. Wolff-Kishner reduction\nR. Stephen reaction\nS. Etard reaction",
        type: "match-the-following",
        options: [
          { id: "A", text: "P-Zn-Hg / conc. HCl, Q-NH2NH2 / KOH in glycol, R-SnCl2 / HCl, S-CrO2Cl2 in CS2" },
          { id: "B", text: "P-NH2NH2 / KOH, Q-Zn-Hg / HCl, R-CrO2Cl2, S-SnCl2 / HCl" },
          { id: "C", text: "P-Zn-Hg / HCl, Q-SnCl2 / HCl, R-NH2NH2 / KOH, S-CrO2Cl2" },
          { id: "D", text: "P-CrO2Cl2, Q-Zn-Hg / HCl, R-SnCl2 / HCl, S-NH2NH2 / KOH" },
        ],
        correctOption: "A",
        explanation: "Clemmensen uses Zn-Hg/HCl; Wolff-Kishner uses hydrazine + KOH in glycol; Stephen uses SnCl2/HCl for nitriles; Etard oxidizes methylbenzene using CrO2Cl2.",
        difficulty: "easy",
      },
      {
        id: "chem_u8_q6",
        question: "Which of the following carboxylic acids does NOT undergo the Hell-Volhard-Zelinsky (HVZ) reaction?",
        type: "standard",
        options: [
          { id: "A", text: "Ethanoic acid" },
          { id: "B", text: "Propanoic acid" },
          { id: "C", text: "2,2-Dimethylpropanoic acid" },
          { id: "D", text: "2-Methylpropanoic acid" },
        ],
        correctOption: "C",
        explanation: "The HVZ reaction requires at least one $\\alpha$-hydrogen. 2,2-dimethylpropanoic acid ($(CH_3)_3C-COOH$) has no $\\alpha$-hydrogens and cannot react.",
        difficulty: "medium",
      },
      {
        id: "chem_u8_q7",
        question: "Which of the following compounds is the MOST reactive toward nucleophilic addition?",
        type: "standard",
        options: [
          { id: "A", text: "Methanal (HCHO)" },
          { id: "B", text: "Ethanal (CH₃CHO)" },
          { id: "C", text: "Propanal (CH₃CH₂CHO)" },
          { id: "D", text: "Propanone (CH₃COCH₃)" },
        ],
        correctOption: "A",
        explanation: "Methanal has no alkyl groups exerting $+I$ inductive effect and minimal steric hindrance, making its carbonyl carbon the most electrophilic.",
        difficulty: "easy",
      },
      {
        id: "chem_u8_q8",
        question: "Treatment of acetaldehyde with dilute $NaOH$ followed by heating yields:",
        type: "standard",
        options: [
          { id: "A", text: "But-2-enal (Crotonaldehyde)" },
          { id: "B", text: "But-1-en-3-one" },
          { id: "C", text: "Butan-1-ol" },
          { id: "D", text: "Ethyl acetate" },
        ],
        correctOption: "A",
        explanation: "$2 CH_3CHO \\xrightarrow{\\text{dil. } NaOH} CH_3-CH(OH)-CH_2-CHO \\xrightarrow{\\Delta, -H_2O} CH_3-CH=CH-CHO$ (crotonaldehyde / but-2-enal).",
        difficulty: "easy",
      },
      {
        id: "chem_u8_q9",
        question: "The reagent that can easily reduce a carboxylic acid directly to a primary alcohol is:",
        type: "standard",
        options: [
          { id: "A", text: "NaBH₄" },
          { id: "B", text: "LiAlH₄ or B₂H₆" },
          { id: "C", text: "H₂ / Pt at room temp" },
          { id: "D", text: "Zn / HCl" },
        ],
        correctOption: "B",
        explanation: "Lithium aluminium hydride ($LiAlH_4$) or diborane ($B_2H_6$) easily reduces carboxylic acids to primary alcohols. $NaBH_4$ cannot reduce carboxylic acids.",
        difficulty: "medium",
      },
      {
        id: "chem_u8_q10",
        question: "Which of the following will NOT give a silver mirror with Tollens' reagent?",
        type: "standard",
        options: [
          { id: "A", text: "Formaldehyde" },
          { id: "B", text: "Acetaldehyde" },
          { id: "C", text: "Benzaldehyde" },
          { id: "D", text: "Acetophenone" },
        ],
        correctOption: "D",
        explanation: "Acetophenone ($C_6H_5COCH_3$) is a ketone and cannot reduce Tollens' reagent. All aldehydes (both aliphatic and aromatic) give a positive Tollens' test.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["chemistry_u7_t1"],
      relatedTopics: ["chemistry_u9_t1"],
      practiceTestId: "practice-chemistry-unit8-test1",
      practiceTestUrl: "/test/practice-chemistry-unit8-test1",
      weaknessReportUrl: "/dashboard/radar?subject=chemistry",
      weaknessRadarUrl: "/dashboard/radar?subject=chemistry",
    },
    subjectSpecific: {
      chemistry: {
        namedReactions: [
          { name: "Rosenmund Reduction", reagents: "H2, Pd/BaSO4", condition: "Boiling xylene", equation: "RCOCl + H2 -> RCHO + HCl" },
          { name: "Clemmensen Reduction", reagents: "Zn-Hg / conc. HCl", condition: "Reflux", equation: ">C=O + 4[H] -> >CH2 + H2O" },
          { name: "Wolff-Kishner Reduction", reagents: "NH2NH2, KOH, ethylene glycol", condition: "453-473 K", equation: ">C=O + NH2NH2 -> >C=NNH2 -> >CH2 + N2" },
          { name: "Cannizzaro Reaction", reagents: "50% aqueous or alcoholic KOH", condition: "Room temp", equation: "2 C6H5CHO + KOH -> C6H5CH2OH + C6H5COOK" },
        ],
        exceptionsList: [
          "Benzaldehyde reduces Tollens' reagent but does not reduce Fehling's solution.",
          "Formic acid (HCOOH) gives a positive Tollens' and Fehling's test due to the presence of an aldehydic hydrogen.",
        ],
      },
    },
  },
];
