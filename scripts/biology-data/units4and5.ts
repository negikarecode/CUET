import { NoteDocument } from "@/types/notes";

export const biologyUnits4and5Topics: NoteDocument[] = [
  // Unit 4 - Topic 1: Principles and Processes of Biotechnology (Recombinant DNA)
  {
    id: "bio_u4_t1",
    slug: "principles-and-processes-of-biotechnology-recombinant-dna",
    subject: "bio",
    subjectName: "Biology",
    subjectCode: "304",
    unitNumber: 4,
    unitTitle: "Biotechnology and its Applications",
    topicTitle: "Principles and Processes of Biotechnology (Recombinant DNA)",
    ncertReference: {
      class: "Class 12",
      book: "Biology",
      chapterNumber: 11,
      chapterName: "Biotechnology: Principles and Processes",
      sections: [
        "11.1 Principles of Biotechnology (Genetic Engineering & Chemical Engineering)",
        "11.2 Tools of Recombinant DNA Technology (Restriction Enzymes, Cloning Vectors: pBR322, Competent Host)",
        "11.3 Processes of Recombinant DNA Technology (Isolation of DNA, Gel Electrophoresis, PCR, Bioreactors, Downstream Processing)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (5-7 questions per shift)",
      totalPyqsInRepo: 215,
      weightagePercentage: 8,
    },
    summary30Seconds: [
      "Restriction endonucleases cleave specific palindromic sequences (e.g. EcoRI: 5'-GAATTC-3') creating staggered sticky ends.",
      "pBR322 vector features origin of replication ($ori$), selectable markers ($amp^R, tet^R$), and restriction sites (PstI/PvuI in $amp^R$; BamHI/SalI in $tet^R$ enabling insertional inactivation).",
      "Agarose gel electrophoresis separates DNA fragments by molecular size (stained with ethidium bromide under UV $\\to$ bright orange bands); PCR amplifies DNA $10^9$-fold via Denaturation (94°C) $\\to$ Annealing (54°C) $\\to$ Extension (72°C using Taq polymerase from Thermus aquaticus).",
    ],
    coreConcepts: [
      {
        title: "Tools of Recombinant DNA Technology: Restriction Enzymes & Vectors",
        content: `**Restriction Endonucleases (Molecular Scissors)**:
- First discovered restriction endonuclease was *HindII* (recognizes a specific 6 base-pair sequence).
- **EcoRI Nomenclature**: $E$ = *Escherichia* (genus), $co$ = *coli* (species), $R$ = strain *RY 13*, $I$ = first endonuclease isolated from this strain.
- Palindromic recognition sequence for **EcoRI**:
  $$5'\\text{-G A A T T C-}3' \\\\ 3'\\text{-C T T A A G-}5'$$
  Cuts between G and A on both strands, generating complementary overhanging single-stranded "sticky ends" that are joined by **DNA ligase**.

**Cloning Vector Characteristics (pBR322)**:
1. **Origin of Replication ($ori$)**: Sequences responsible for initiating replication and controlling copy number of linked DNA.
2. **Selectable Markers**: Identify and eliminate non-transformants and permit selective growth of transformants (e.g., genes conferring resistance to ampicillin, tetracycline, kanamycin, chloramphenicol).
3. **Cloning Sites**: Single recognition sites for commonly used restriction enzymes:
   - In $amp^R$ gene: *PstI*, *PvuI*.
   - In $tet^R$ gene: *BamHI*, *SalI*.
   - Near $ori$: *PvuII* at $rop$ gene (codes for proteins involved in replication of plasmid).
4. **Insertional Inactivation**:
   - Ligation of foreign DNA at *BamHI* site of $tet^R$ gene causes loss of tetracycline resistance. Recombinant transformants grow on ampicillin medium but NOT on tetracycline medium.
   - **Alternative Marker ($\\beta$-galactosidase / LacZ selection)**: Insertional inactivation of $\\beta$-galactosidase gene results in white colonies in presence of chromogenic substrate (X-gal); non-recombinants produce blue colonies.`,
        ncertPointers: [
          "Plasmids are autonomously replicating circular extra-chromosomal DNA found in bacteria.",
          "Ti plasmid of Agrobacterium tumefaciens (a plant pathogen) has been disarmed and is the most widely used cloning vector for dicot plants.",
          "Retroviruses are disarmed to transfer desirable genes into animal cells.",
        ],
      },
      {
        title: "Processes of r-DNA: Gel Electrophoresis, PCR & Bioreactors",
        content: `**Agarose Gel Electrophoresis**:
- DNA fragments are negatively charged (due to phosphate backbone), so they migrate toward the **anode** (+) under an electric field.
- Separation is according to **size/molecular weight** due to the sieving effect of agarose gel (smaller fragments migrate farther).
- Visualisation: Stained with **Ethidium Bromide (EtBr)** and exposed to **UV light** $\\to$ appears as **bright orange coloured bands**.
- **Elution**: The separated bands of DNA are cut out from the agarose gel and extracted from the gel slice.

**Polymerase Chain Reaction (PCR)**:
In vitro amplification of a specific DNA segment by $10^9$ times in 30 cycles:
1. **Denaturation (94°C–96°C)**: High temperature breaks hydrogen bonds between double-stranded DNA to produce single strands.
2. **Annealing (50°C–56°C)**: Two sets of oligonucleotide primers anneal to the $3'$ ends of single-stranded template DNA.
3. **Extension (72°C)**: **Taq polymerase** (thermostable DNA polymerase isolated from thermophilic bacterium *Thermus aquaticus*) extends primers using dNTPs and $Mg^{2+}$.

**Bioreactors & Downstream Processing**:
- Bioreactors (100–1000 litres): Stirred-tank bioreactors (curved base, agitator, sparger) maintain optimum temperature, pH, substrate, and $O_2$.
- **Downstream Processing**: Separation, purification, and clinical formulation with preservatives before marketing.`,
        ncertPointers: [
          "Competent host methods: Divalent cation ($Ca^{2+}$) followed by heat shock (42°C); Micro-injection (DNA injected directly into animal cell nucleus); Biolistics / Gene gun (cells bombarded with gold or tungsten microparticles coated with DNA for plants).",
          "Chilled ethanol is added to precipitate purified spooling DNA.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "EcoRI Recognition Sequence",
        formula: "5'\\text{-G A A T T C-}3' \\quad \\text{cleaved between G and A to leave single-stranded 5'-AATT sticky ends}",
        symbols: "\\text{Palindromic sequence}",
        siUnits: "Base pairs",
        applicationCondition: "r-DNA cleavage and ligation",
      },
      {
        name: "PCR Amplification Factor",
        formula: "\\text{Number of DNA copies after } n \\text{ cycles} = 2^n \\quad (n=30 \\implies \\sim 1.07 \\times 10^9 \\text{ copies})",
        symbols: "n = \\text{cycle number}",
        siUnits: "Copy number",
        applicationCondition: "In vitro thermal cycling with Taq polymerase",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">pBR322 Cloning Vector Restriction Map & Markers</text>
  
  <!-- Central Circular Plasmid -->
  <circle cx="380" cy="165" r="95" fill="#1e293b" stroke="#0ea5e9" strokeWidth="4"/>
  <text x="380" y="160" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="bold">pBR322</text>
  <text x="380" y="180" textAnchor="middle" fill="#94a3b8" fontSize="11">4361 bp</text>
  
  <!-- ampR Sector -->
  <path d="M 285,165 A 95 95 0 0 1 340,75" fill="none" stroke="#10b981" strokeWidth="10"/>
  <text x="260" y="115" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">ampR</text>
  <text x="260" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="10">PstI, PvuI</text>
  
  <!-- tetR Sector -->
  <path d="M 420,75 A 95 95 0 0 1 475,165" fill="none" stroke="#f59e0b" strokeWidth="10"/>
  <text x="500" y="115" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">tetR</text>
  <text x="505" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="10">BamHI, SalI</text>
  
  <!-- ori Sector -->
  <path d="M 330,250 A 95 95 0 0 1 295,200" fill="none" stroke="#ec4899" strokeWidth="10"/>
  <text x="280" y="250" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="bold">ori</text>
  
  <!-- rop Sector -->
  <path d="M 430,245 A 95 95 0 0 1 465,200" fill="none" stroke="#8b5cf6" strokeWidth="10"/>
  <text x="480" y="250" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">rop (PvuII)</text>
  
  <!-- Top Cleavage Sites -->
  <text x="380" y="60" textAnchor="middle" fill="#38bdf8" fontSize="11">EcoRI, ClaI, HindIII</text>
</svg>`,
    workedExamples: [
      {
        id: "bio_u4_t1_we1",
        questionNumber: 1,
        question: "Arrange the chronological sequence of steps in Polymerase Chain Reaction (PCR):\n(A) Extension of primers using thermostable DNA polymerase\n(B) Annealing of oligonucleotide primers to template strands\n(C) Denaturation of double-stranded DNA template at 94°C",
        options: [
          { id: "A", text: "(C) $\\to$ (B) $\\to$ (A)" },
          { id: "B", text: "(B) $\\to$ (C) $\\to$ (A)" },
          { id: "C", text: "(C) $\\to$ (A) $\\to$ (B)" },
          { id: "D", text: "(A) $\\to$ (B) $\\to$ (C)" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Denaturation at ~94°C breaks H-bonds between dsDNA into single strands $\\to$ (C).",
          "Step 2: Annealing at ~54°C binds forward and reverse primers to 3' ends of ssDNA $\\to$ (B).",
          "Step 3: Extension at ~72°C uses Taq polymerase to synthesize complementary DNA $\\to$ (A).",
          "Sequence: (C) $\\to$ (B) $\\to$ (A). Option A is correct.",
        ],
      },
      {
        id: "bio_u4_t1_we2",
        questionNumber: 2,
        question: "A foreign gene was ligated into the BamHI site of the plasmid pBR322. The transformants were plated on ampicillin and tetracycline plates. Which of the following observations confirms recombinant transformants?",
        options: [
          { id: "A", text: "Grow on both ampicillin and tetracycline plates" },
          { id: "B", text: "Grow on ampicillin plate but fail to grow on tetracycline plate" },
          { id: "C", text: "Grow on tetracycline plate but fail to grow on ampicillin plate" },
          { id: "D", text: "Fail to grow on both ampicillin and tetracycline plates" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: BamHI restriction site is located inside the tetracycline resistance ($tet^R$) gene of pBR322.",
          "Step 2: Insertion of foreign DNA disrupts $tet^R$ gene (insertional inactivation), causing loss of tetracycline resistance.",
          "Step 3: The ampicillin resistance ($amp^R$) gene remains intact and functional.",
          "Step 4: Recombinants will grow on ampicillin-containing medium but not on tetracycline-containing medium. Option B is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "pBR322 Restriction Site Localization",
        frequency: "Very High",
        typicalStem: "In pBR322, the restriction endonuclease sites PstI and PvuI are located within which selectable marker gene?",
        strategy: "PstI and PvuI are in $amp^R$; BamHI and SalI are in $tet^R$; PvuII is in $rop$.",
      },
      {
        patternType: "Gel Electrophoresis Visualization",
        frequency: "High",
        typicalStem: "Separated DNA bands on agarose gel can be visualised after staining with ______ and exposure to ______.",
        strategy: "Stain = Ethidium bromide (EtBr); Radiation = UV light; Resulting color = Bright orange.",
      },
    ],
    commonTraps: [
      {
        concept: "Exonuclease vs Endonuclease",
        misconception: "Students confuse where exonucleases and endonucleases cut.",
        correctUnderstanding: "Exonucleases remove nucleotides from the ends ($5'$ or $3'$) of DNA. Endonucleases make cuts at specific positions WITHIN the DNA.",
      },
      {
        concept: "Heat Shock Temperature",
        misconception: "Marking 72°C or 94°C for heat shock of bacterial transformation.",
        correctUnderstanding: "Heat shock for competent bacterial host is 42°C (placed on ice $\\to$ 42°C for 2 min $\\to$ back on ice). 72°C is PCR extension, 94°C is PCR denaturation.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "pBR322 Enzymes Memory Peg",
        mnemonic: "Pst! Pvu! Amp it up! (PstI & PvuI in Ampicillin). Bam! Sal! Tetracycline! (BamHI & SalI in Tetracycline).",
        explanation: "Never mismatch the restriction sites of pBR322.",
      },
      {
        title: "PCR Sequence",
        mnemonic: "DAE: Denaturation $\\to$ Annealing $\\to$ Extension.",
        explanation: "Simple chronological ordering for PCR steps.",
      },
    ],
    quickRevisionCard: {
      title: "Biotechnology Principles — High-Yield Cheat Sheet",
      bulletPoints: [
        "EcoRI: Palindromic 5'-GAATTC-3' cleaved between G and A (sticky ends).",
        "pBR322: PstI/PvuI in $amp^R$; BamHI/SalI in $tet^R$; PvuII in $rop$.",
        "Insertional inactivation of $tet^R$ $\\to$ Recombinants grow on Amp but not Tet.",
        "Blue-White selection: Recombinants have inactive $\\beta$-gal $\\to$ White colonies.",
        "Gel Electrophoresis: DNA moves to Anode (+); EtBr + UV $\\to$ Bright Orange bands.",
        "PCR: Denaturation (94°C) $\\to$ Annealing (54°C) $\\to$ Extension (72°C, Taq Polymerase).",
        "Taq Polymerase isolated from Thermus aquaticus (thermostable).",
        "Plant vector: Disarmed Ti plasmid of Agrobacterium tumefaciens.",
        "Animal gene transfer: Micro-injection; Plant gene transfer: Biolistics (gene gun).",
      ],
    },
    practiceQuestions: [
      {
        id: "bio_u4_t1_q1",
        question: "The DNA fragments separated on an agarose gel can be visualised only after staining with:",
        options: [
          { id: "A", text: "Acetocarmine" },
          { id: "B", text: "Ethidium bromide under UV radiation" },
          { id: "C", text: "Methylene blue under visible light" },
          { id: "D", text: "Safranin" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The separated DNA fragments can be visualised only after staining the DNA with a compound known as ethidium bromide followed by exposure to UV light (producing bright orange bands).",
      },
      {
        id: "bio_u4_t1_q2",
        question: "A thermostable DNA polymerase (Taq polymerase) used in PCR is isolated from:",
        options: [
          { id: "A", text: "Thermus aquaticus" },
          { id: "B", text: "Bacillus thuringiensis" },
          { id: "C", text: "Agrobacterium tumefaciens" },
          { id: "D", text: "Escherichia coli" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Taq polymerase is isolated from the thermophilic bacterium Thermus aquaticus and remains active during the high temperature denaturation step of PCR.",
      },
      {
        id: "bio_u4_t1_q3",
        question: "In pBR322, insertional inactivation of the beta-galactosidase gene results in the formation of:",
        options: [
          { id: "A", text: "Blue recombinant colonies" },
          { id: "B", text: "White recombinant colonies" },
          { id: "C", text: "No colony growth" },
          { id: "D", text: "Red colonies" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Presence of insert results into insertional inactivation of beta-galactosidase and the colonies do not produce any colour; these are identified as recombinant colonies (white colonies).",
      },
      {
        id: "bio_u4_t1_q4",
        question: "Which of the following is used as a cloning vector for introducing genes into dicotyledonous plants?",
        options: [
          { id: "A", text: "Disarmed Ti plasmid of Agrobacterium tumefaciens" },
          { id: "B", text: "Bacteriophage lambda" },
          { id: "C", text: "pUC19" },
          { id: "D", text: "Retrovirus" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The tumor inducing (Ti) plasmid of Agrobacterium tumefaciens has now been modified (disarmed) into a cloning vector which is no more pathogenic to plants but is still able to transfer genes of interest into plant cells.",
      },
      {
        id: "bio_u4_t1_q5",
        question: "The process of cutting out separated DNA bands from the agarose gel and extracting them from the gel slice is called:",
        options: [
          { id: "A", text: "Spooling" },
          { id: "B", text: "Elution" },
          { id: "C", text: "Transformation" },
          { id: "D", text: "Electroporation" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The separated bands of DNA are cut out from the agarose gel and extracted from the gel piece. This step is known as elution.",
      },
      {
        id: "bio_u4_t1_q6",
        question: "During recombinant DNA procedures, what is the role of chilled ethanol?",
        options: [
          { id: "A", text: "Lyses cell wall" },
          { id: "B", text: "Precipitates purified DNA" },
          { id: "C", text: "Denatures RNA polymerase" },
          { id: "D", text: "Stains DNA orange" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Purified DNA ultimately precipitates out after the addition of chilled ethanol. This can be seen as collection of fine threads in suspension (spooling).",
      },
      {
        id: "bio_u4_t1_q7",
        question: "Which method is commonly used to introduce foreign DNA directly into the nucleus of an animal cell?",
        options: [
          { id: "A", text: "Biolistics / Gene gun" },
          { id: "B", text: "Micro-injection" },
          { id: "C", text: "Electroporation" },
          { id: "D", text: "Calcium chloride treatment" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "In micro-injection, recombinant DNA is directly injected into the nucleus of an animal cell.",
      },
      {
        id: "bio_u4_t1_q8",
        question: "The correct palindromic nucleotide sequence recognised by EcoRI restriction endonuclease is:",
        options: [
          { id: "A", text: "5'-GAATTC-3' / 3'-CTTAAG-5'" },
          { id: "B", text: "5'-GGATCC-3' / 3'-CCTAGG-5'" },
          { id: "C", text: "5'-AAGCTT-3' / 3'-TTCGAA-5'" },
          { id: "D", text: "5'-GATATC-3' / 3'-CTATAG-5'" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "EcoRI recognises the specific palindromic sequence 5'-GAATTC-3' and cuts both strands between G and A.",
      },
      {
        id: "bio_u4_t1_q9",
        question: "Assertion (A): Agarose gel electrophoresis separates DNA fragments purely based on their size.\nReason (R): DNA molecules are negatively charged throughout their length due to the phosphate backbone and have a constant charge-to-mass ratio.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is not the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        questionType: "Assertion-Reason",
        difficulty: "medium",
        explanation: "Because all DNA fragments have identical charge per unit mass, the electrical driving force is proportional to size, and the porous agarose sieve separates them strictly according to molecular weight/size.",
      },
      {
        id: "bio_u4_t1_q10",
        question: "In pBR322, the 'rop' gene codes for:",
        options: [
          { id: "A", text: "Resistance to ampicillin" },
          { id: "B", text: "Proteins involved in the replication of the plasmid" },
          { id: "C", text: "Beta-galactosidase enzyme" },
          { id: "D", text: "Resistance to tetracycline" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "'rop' codes for the proteins involved in the replication of the plasmid.",
      },
    ],
  },

  // Unit 4 - Topic 2: Applications in Health and Agriculture
  {
    id: "bio_u4_t2",
    slug: "applications-in-health-and-agriculture",
    subject: "bio",
    subjectName: "Biology",
    subjectCode: "304",
    unitNumber: 4,
    unitTitle: "Biotechnology and its Applications",
    topicTitle: "Applications in Health and Agriculture",
    ncertReference: {
      class: "Class 12",
      book: "Biology",
      chapterNumber: 12,
      chapterName: "Biotechnology and its Applications",
      sections: [
        "12.1 Biotechnological Applications in Agriculture (Bt Cotton, Pest-resistant plants: RNA interference / RNAi)",
        "12.2 Biotechnological Applications in Medicine (Genetically Engineered Insulin, Gene Therapy for ADA deficiency, Molecular Diagnosis: ELISA, PCR)",
        "12.3 Transgenic Animals (Rosie cow, polio vaccine testing, toxicity testing)",
        "12.4 Ethical Issues (GEAC, Biopiracy: Basmati rice patent controversy, Neem, Turmeric)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (5-6 questions per shift)",
      totalPyqsInRepo: 200,
      weightagePercentage: 7,
    },
    summary30Seconds: [
      "Bt Cotton expresses crystalline endotoxin proteins ($CryIAc, CryIIAb$ against cotton bollworms; $CryIAb$ against corn borer) activated in alkaline pH of insect midgut creating fatal pores.",
      "RNA interference (RNAi) in tobacco against root nematode Meloidogyne incognita uses cellular silencing of specific mRNA via dsRNA.",
      "Humulin: Eli Lilly (1983) produced human insulin chains A and B separately in E. coli and bonded them with disulphide bridges; ADA deficiency was treated by gene therapy using functional ADA cDNA via retroviral vector.",
    ],
    coreConcepts: [
      {
        title: "Biotechnology in Agriculture: Bt Cotton & RNAi",
        content: `**Bt Cotton**:
- *Bacillus thuringiensis* forms intracellular protein crystals during sporulation containing toxic insecticidal proteins (**Bt endotoxins**).
- Exists as inactive **protoxins** inside the bacterium.
- Ingestion by insect: Solubilized in the **alkaline pH of the insect midgut**, converting protoxin into active toxin.
- Active toxin binds to surface of midgut epithelial cells, creating **pores** that cause cell swelling, lysis, and death of the insect.
- **Specific Cry Genes**:
  - *cryIAc* and *cryIIAb*: Control **cotton bollworms**.
  - *cryIAb*: Controls **corn borer**.

**RNA Interference (RNAi)**:
- Method of cellular defense in all eukaryotic organisms.
- Target: Nematode *Meloidogyne incognita* infects tobacco plant roots, causing significant yield reduction.
- Mechanism: Using *Agrobacterium* vectors, nematode-specific genes were introduced into the host plant.
- Introduction produced both **sense and anti-sense RNA** in the host cells.
- These complementary RNAs formed a **double-stranded RNA (dsRNA)** that initiated RNAi, binding and silencing the specific mRNA of the nematode, preventing parasite survival.`,
        ncertPointers: [
          "Bt toxin is non-toxic to the bacterium itself because it exists as an inactive crystalline protoxin.",
          "Golden Rice: Genetically modified rice enriched with Provitamin A (beta-carotene) to prevent night blindness.",
        ],
      },
      {
        title: "Biotechnology in Medicine: Insulin, Gene Therapy & Transgenics",
        content: `**Genetically Engineered Insulin (Humulin)**:
- Human pro-insulin contains Chain A (21 amino acids), Chain B (30 amino acids), and an extra stretch called **C-peptide** (33 amino acids).
- C-peptide is removed during maturation; mature functional insulin has Chain A and B linked by **two disulphide bonds**.
- In 1983, American company **Eli Lilly** synthesized two DNA sequences corresponding to A and B chains of human insulin and introduced them into plasmids of *E. coli* to produce chains A and B separately. Chains were extracted and combined by creating disulphide bonds to form human insulin.

**Gene Therapy (ADA Deficiency)**:
- First clinical gene therapy given in 1990 to a 4-year-old girl with **Adenosine Deaminase (ADA) deficiency** (causes SCID - Severe Combined Immunodeficiency due to lack of functional T-lymphocytes).
- Procedure: Lymphocytes from patient's blood cultured *in vitro* $\\to$ functional ADA cDNA introduced using a **retroviral vector** $\\to$ lymphocytes infused back into patient.
- Permanent cure: Gene isolated from bone marrow cells producing ADA introduced into cells at **early embryonic stages**.

**Transgenic Animals & Biopiracy**:
- **Rosie (1997)**: First transgenic cow produced human protein-enriched milk (2.4 grams per litre) containing **human $\\alpha$-lactalbumin**, nutritionally more balanced for human babies.
- **GEAC (Genetic Engineering Appraisal Committee)**: Indian government body that decides validity of GM research and safety of introducing GM organisms for public services.
- **Biopiracy**: Unauthorized exploitation of bio-resources by multinational companies without proper authorization or compensatory payment (e.g., US patent on Basmati rice crossed with semi-dwarf varieties in 1997).`,
        ncertPointers: [
          "ELISA is based on the principle of antigen-antibody interaction.",
          "Transgenic mice are being developed for use in testing safety of vaccines (e.g. polio vaccine) before human trials.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Cry Gene Specificity Table",
        formula: "\\text{cryIAc, cryIIAb } \\implies \\text{Cotton Bollworm}; \\quad \\text{cryIAb } \\implies \\text{Corn Borer}",
        symbols: "cry genes and target pests",
        siUnits: "Biological classification",
        applicationCondition: "Pest resistance engineering",
      },
      {
        name: "Human Insulin Structure",
        formula: "\\text{Proinsulin} = \\text{Chain A (21 aa)} + \\text{Chain B (30 aa)} + \\text{C-peptide (33 aa)}; \\quad \\text{Mature} = A-S-S-B",
        symbols: "Disulphide bridges",
        siUnits: "Amino acid chain length",
        applicationCondition: "Eli Lilly recombinant manufacturing",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Proinsulin Maturation vs Recombinant Eli Lilly Insulin</text>
  
  <!-- Natural Proinsulin -->
  <rect x="50" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5"/>
  <text x="205" y="90" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Natural Human Proinsulin</text>
  
  <rect x="80" y="110" width="100" height="26" rx="4" fill="#3b82f6"/>
  <text x="130" y="127" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Chain A (21 aa)</text>
  
  <rect x="230" y="110" width="100" height="26" rx="4" fill="#10b981"/>
  <text x="280" y="127" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Chain B (30 aa)</text>
  
  <path d="M 130,136 Q 205,190 280,136" fill="none" stroke="#ef4444" strokeWidth="4"/>
  <text x="205" y="180" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">C-Peptide (Removed)</text>
  
  <text x="205" y="225" textAnchor="middle" fill="#cbd5e1" fontSize="11">C-peptide is NOT present in mature insulin</text>
  <text x="205" y="245" textAnchor="middle" fill="#94a3b8" fontSize="11">Chains A and B linked by Disulphide (-S-S-) bonds</text>
  
  <!-- Recombinant Humulin -->
  <rect x="400" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5"/>
  <text x="555" y="90" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Eli Lilly r-DNA Insulin (1983)</text>
  
  <rect x="420" y="115" width="270" height="30" rx="6" fill="#0f172a" stroke="#3b82f6"/>
  <text x="555" y="135" textAnchor="middle" fill="#93c5fd" fontSize="11">Chain A synthesized in E. coli plasmid 1</text>
  
  <rect x="420" y="155" width="270" height="30" rx="6" fill="#0f172a" stroke="#10b981"/>
  <text x="555" y="175" textAnchor="middle" fill="#86efac" fontSize="11">Chain B synthesized in E. coli plasmid 2</text>
  
  <rect x="420" y="200" width="270" height="40" rx="6" fill="#0f172a" stroke="#fbbf24"/>
  <text x="555" y="225" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">Chains combined via Disulphide (-S-S-) bonds</text>
</svg>`,
    workedExamples: [
      {
        id: "bio_u4_t2_we1",
        questionNumber: 1,
        question: "Match the Cry genes in Column I with the specific crop pests they control in Column II:\n(A) cryIAc - (i) Corn borer\n(B) cryIAb - (ii) Cotton bollworm\n(C) cryIIAb - (iii) Tobacco budworm",
        options: [
          { id: "A", text: "A-(ii), B-(i), C-(ii)" },
          { id: "B", text: "A-(i), B-(ii), C-(i)" },
          { id: "C", text: "A-(ii), B-(iii), C-(i)" },
          { id: "D", text: "A-(i), B-(iii), C-(ii)" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: According to NCERT, the proteins encoded by the genes *cryIAc* and *cryIIAb* control cotton bollworms $\\to$ A-(ii) and C-(ii).",
          "Step 2: The gene *cryIAb* controls corn borer $\\to$ B-(i).",
          "Step 3: Hence, Option A is the precise NCERT match.",
        ],
      },
      {
        id: "bio_u4_t2_we2",
        questionNumber: 2,
        question: "Why does the crystalline Bt insecticidal protein not kill the bacterium Bacillus thuringiensis itself?",
        options: [
          { id: "A", text: "Bacteria have thick impermeable capsule" },
          { id: "B", text: "The toxin exists as an inactive protoxin and requires alkaline pH to activate" },
          { id: "C", text: "Bacteria possess intracellular antitoxin enzymes" },
          { id: "D", text: "The toxin is actively exported outside the bacterium instantly" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The Bt toxin protein exists as an inactive protoxin in the bacterium.",
          "Step 2: Once an insect ingests the inactive protoxin, it is converted into an active form of toxin due to the alkaline pH of the gut which solubilises the crystals.",
          "Step 3: Therefore, it does not harm the bacterium. Option B is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Eli Lilly Insulin Assembly",
        frequency: "Very High",
        typicalStem: "How was human insulin produced by Eli Lilly using recombinant DNA technology without the C-peptide?",
        strategy: "Eli Lilly synthesized DNA sequences for Chain A and B separately in E. coli, extracted them, and joined them by creating disulphide bonds.",
      },
      {
        patternType: "RNA Interference Mechanism",
        frequency: "High",
        typicalStem: "RNAi silences the expression of specific genes through the formation of which intermediate molecule?",
        strategy: "Double-stranded RNA (dsRNA) which binds and cleaves target nematode mRNA.",
      },
    ],
    commonTraps: [
      {
        concept: "C-peptide in Mature Insulin",
        misconception: "Students believe mature active insulin contains C-peptide.",
        correctUnderstanding: "C-peptide is present ONLY in proinsulin. During maturation, C-peptide is cleaved off; mature functional insulin contains ONLY Chains A and B.",
      },
      {
        concept: "Alkaline vs Acidic Gut Activation",
        misconception: "Thinking Bt protoxin is activated by acidic pH in stomach.",
        correctUnderstanding: "Bt protoxin is solubilized and activated strictly by the **alkaline pH** of the insect midgut.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Cry Gene Pest Pairs",
        mnemonic: "1Ab = Bor (cryIAb = Corn Borer). 1Ac + 2Ab = Boll (Bollworm).",
        explanation: "Simple memory hook to eliminate incorrect options instantly in CUET.",
      },
      {
        title: "Rosie Transgenic Cow",
        mnemonic: "Rosie = Lactalbumin (2.4 g/L).",
        explanation: "Remembers name of cow and key protein secreted.",
      },
    ],
    quickRevisionCard: {
      title: "Biotechnology Applications — Quick Card",
      bulletPoints: [
        "Bt Toxin: Inactive protoxin activated by alkaline pH of insect midgut $\\to$ creates pores.",
        "cryIAc & cryIIAb $\\to$ Cotton bollworms; cryIAb $\\to$ Corn borer.",
        "RNAi: dsRNA silences target mRNA of Meloidogyne incognita in tobacco roots.",
        "Eli Lilly (1983): Synthesized Chains A and B in E. coli, linked by disulphide bonds.",
        "Proinsulin has C-peptide; Mature insulin LACKS C-peptide.",
        "Gene therapy: ADA deficiency treated with retroviral vector carrying ADA cDNA.",
        "Rosie cow (1997): Produced human alpha-lactalbumin milk (2.4 g/L).",
        "GEAC: Indian regulatory body for GM organism approval and environmental release.",
      ],
    },
    practiceQuestions: [
      {
        id: "bio_u4_t2_q1",
        question: "The Bt toxin is activated in the gut of insect pest due to:",
        options: [
          { id: "A", text: "Acidic pH of the stomach" },
          { id: "B", text: "Alkaline pH of the midgut" },
          { id: "C", text: "Action of salivary amylase" },
          { id: "D", text: "Mechanical grinding in gizzard" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The inactive protoxin is converted into an active form of toxin due to the alkaline pH of the gut which solubilises the crystals.",
      },
      {
        id: "bio_u4_t2_q2",
        question: "Which gene controls the corn borer pest in maize crops?",
        options: [
          { id: "A", text: "cryIAc" },
          { id: "B", text: "cryIIAb" },
          { id: "C", text: "cryIAb" },
          { id: "D", text: "ampR" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "cryIAb controls corn borer, while cryIAc and cryIIAb control cotton bollworms.",
      },
      {
        id: "bio_u4_t2_q3",
        question: "In RNA interference (RNAi), silencing of a specific mRNA is initiated by:",
        options: [
          { id: "A", text: "Single-stranded DNA" },
          { id: "B", text: "Double-stranded RNA (dsRNA)" },
          { id: "C", text: "tRNA molecules" },
          { id: "D", text: "Histone octamer proteins" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "RNAi involves silencing of a specific mRNA due to a complementary double-stranded RNA (dsRNA) molecule that binds to and prevents translation of the mRNA.",
      },
      {
        id: "bio_u4_t2_q4",
        question: "The first clinical gene therapy was given in 1990 to a 4-year-old girl with which of the following genetic enzyme deficiencies?",
        options: [
          { id: "A", text: "Adenosine deaminase (ADA)" },
          { id: "B", text: "Phenylalanine hydroxylase" },
          { id: "C", text: "Tyrosinase" },
          { id: "D", text: "Glucocerebrosidase" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The first clinical gene therapy was given in 1990 to a 4-year-old girl with adenosine deaminase (ADA) deficiency, causing severe combined immunodeficiency (SCID).",
      },
      {
        id: "bio_u4_t2_q5",
        question: "The first transgenic cow, Rosie, produced human protein-enriched milk containing:",
        options: [
          { id: "A", text: "Alpha-1-antitrypsin" },
          { id: "B", text: "Human alpha-lactalbumin" },
          { id: "C", text: "Human insulin" },
          { id: "D", text: "Human serum albumin" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The first transgenic cow, Rosie, produced human protein-enriched milk (2.4 grams per litre). The milk contained the human alpha-lactalbumin and was nutritionally more balanced for human babies.",
      },
      {
        id: "bio_u4_t2_q6",
        question: "What is the primary difference between human pro-insulin and mature functional insulin?",
        options: [
          { id: "A", text: "Pro-insulin has only Chain A" },
          { id: "B", text: "Mature insulin contains an extra C-peptide" },
          { id: "C", text: "Pro-insulin contains an extra stretch of peptide called the C-peptide which is absent in mature insulin" },
          { id: "D", text: "Mature insulin lacks disulphide bonds" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Pro-insulin contains an extra stretch called the C peptide. This C peptide is not present in the mature insulin and is removed during maturation into insulin.",
      },
      {
        id: "bio_u4_t2_q7",
        question: "Which statutory Indian organization evaluates the safety of genetically modified organisms before public release?",
        options: [
          { id: "A", text: "ICMR" },
          { id: "B", text: "GEAC" },
          { id: "C", text: "CSIR" },
          { id: "D", text: "NCL" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The Indian Government has set up organizations such as GEAC (Genetic Engineering Appraisal Committee), which makes decisions regarding the validity of GM research and the safety of introducing GM-organisms for public services.",
      },
      {
        id: "bio_u4_t2_q8",
        question: "In 1997, an American company got patent rights on Basmati rice through the US Patent and Trademark Office by crossing it with:",
        options: [
          { id: "A", text: "Wild grass varieties" },
          { id: "B", text: "Semi-dwarf varieties" },
          { id: "C", text: "Golden rice varieties" },
          { id: "D", text: "Wheat cultivars" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "In 1997, an American company got patent rights on Basmati rice. This 'new' variety of Basmati had actually been derived from Indian farmer's varieties crossed with semi-dwarf varieties.",
      },
      {
        id: "bio_u4_t2_q9",
        question: "The technique used for early molecular diagnosis of HIV in suspected AIDS patients when antibody titers are undetectable is:",
        options: [
          { id: "A", text: "Urine routine analysis" },
          { id: "B", text: "Polymerase Chain Reaction (PCR)" },
          { id: "C", text: "Paper chromatography" },
          { id: "D", text: "Stool smear examination" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Very low concentration of a pathogen can be detected by amplification of their nucleic acid by PCR. It is routinely used to detect HIV in suspected AIDS patients.",
      },
      {
        id: "bio_u4_t2_q10",
        question: "Alpha-1-antitrypsin obtained through transgenic animals is used clinically to treat:",
        options: [
          { id: "A", text: "Emphysema" },
          { id: "B", text: "Phenylketonuria" },
          { id: "C", text: "Cystic fibrosis" },
          { id: "D", text: "Parkinson's disease" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Human protein (alpha-1-antitrypsin) obtained from transgenic animals is used to treat emphysema.",
      },
    ],
  },

  // Unit 5 - Topic 1: Organisms and Populations, Ecosystems, Biodiversity and its Conservation
  {
    id: "bio_u5_t1",
    slug: "organisms-and-populations-ecosystems-biodiversity-and-its-conservation",
    subject: "bio",
    subjectName: "Biology",
    subjectCode: "304",
    unitNumber: 5,
    unitTitle: "Ecology and Environment",
    topicTitle: "Organisms and Populations, Ecosystems, Biodiversity and its Conservation",
    ncertReference: {
      class: "Class 12",
      book: "Biology",
      chapterNumber: 13,
      chapterName: "Organisms and Populations, Ecosystem & Biodiversity and Conservation",
      sections: [
        "13.1 Organism and its Environment (Abiotic factors: Temperature, Water, Light, Soil; Adaptations)",
        "13.2 Populations (Attributes: Birth rate, Death rate, Sex ratio, Age pyramids; Population Growth: Exponential vs Logistic)",
        "13.3 Population Interactions (Mutualism, Competition: Gause's Principle, Predation, Parasitism, Commensalism, Amensalism)",
        "14.1 Ecosystem: Structure and Function (Productivity: GPP vs NPP, Decomposition steps)",
        "14.2 Energy Flow (10% law, Ecological Pyramids: Number, Biomass, Energy)",
        "14.3 Ecological Succession (Hydrarch vs Xerarch, Pioneer $\\to$ Climax)",
        "15.1 Biodiversity: Patterns (Latitudinal gradients, Species-Area Relationship: $S = CA^Z$)",
        "15.2 Loss of Biodiversity (The Evil Quartet) & Conservation (In-situ vs Ex-situ)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (8-10 questions per shift)",
      totalPyqsInRepo: 280,
      weightagePercentage: 12,
    },
    summary30Seconds: [
      "Logistic population growth follows sigmoid curve described by Verhulst-Pearl equation: $dN/dt = rN((K - N)/K)$; Gause's competitive exclusion principle states two closely related species competing for same limited resources cannot coexist indefinitely.",
      "Net Primary Productivity (NPP) = Gross Primary Productivity (GPP) - Respiration losses (R); Pyramid of energy is ALWAYS upright; Pyramid of biomass in sea is inverted.",
      "Species-Area relationship: $\\log S = \\log C + Z \\log A$ (Alexander von Humboldt); The Evil Quartet causes biodiversity loss (Habitat loss/fragmentation, Over-exploitation, Alien species invasions, Co-extinctions). In-situ: National Parks, Biosphere reserves; Ex-situ: Botanical gardens, Cryopreservation.",
    ],
    coreConcepts: [
      {
        title: "Population Ecology: Growth Models & Species Interactions",
        content: `**Population Growth Models**:
1. **Exponential Growth (J-shaped curve)**: Occurs when resources (food, space) are unlimited:
   $$\\frac{dN}{dt} = (b - d)N = rN \\implies N_t = N_0 e^{rt}$$
   Where $r$ = intrinsic rate of natural increase ($r = 0.0205$ for human population in India in 1981).
2. **Logistic Growth (S-shaped / Sigmoid curve)**: Verhulst-Pearl Logistic Growth when resources are finite with a carrying capacity ($K$):
   $$\\frac{dN}{dt} = rN \\left( \\frac{K - N}{K} \\right)$$
   Where $K$ = carrying capacity (maximum population size habitat can sustain). Realistic model in nature.

**Population Interactions Matrix**:
- **Mutualism (+/+)**: Both species benefit. Lichens (fungus + alga/cyanobacteria); Mycorrhizae (fungi + roots of higher plants); Fig and Fig wasp (*Blastophaga*); *Ophrys* (Mediterranean orchid) and male bee (*Colpa*) via **sexual deceit**.
- **Competition (-/-)**: Both species harmed. **Gause's Competitive Exclusion Principle**: Abingdon tortoise in Galapagos became extinct within a decade after goats were introduced due to greater browsing efficiency. Resource partitioning (MacArthur's warblers).
- **Predation (+/-)**: Predator eats prey (Prickly pear cactus controlled by cactus-feeding moth in Australia).
- **Parasitism (+/-)**: Ectoparasites (ticks on dogs, lice on humans, *Cuscuta* on hedge plants); Endoparasites (liver fluke with 2 intermediate hosts: snail and fish); **Brood parasitism** (Koel lays eggs in Crow's nest).
- **Commensalism (+/0)**: Barnacles on whale, Orchid growing as epiphyte on mango branch, Cattle egret and grazing cattle, Sea anemone and clown fish.
- **Amensalism (-/0)**: *Penicillium* produces penicillin inhibiting bacteria.`,
        ncertPointers: [
          "Allen's Rule: Mammals from colder climates generally have shorter ears and limbs to minimise heat loss.",
          "Diapause: Stage of suspended development in zooplankton under unfavourable conditions.",
        ],
      },
      {
        title: "Ecosystem Dynamics: Productivity, Pyramids & Succession",
        content: `**Productivity**:
- **Gross Primary Productivity (GPP)**: Rate of production of organic matter during photosynthesis.
- **Net Primary Productivity (NPP)**: Available biomass for the consumption of heterotrophs:
  $$\\text{NPP} = \\text{GPP} - R$$
  Annual net primary productivity of whole biosphere is about **170 billion tons** (dry weight); despite occupying 70% of earth's surface, oceans contribute only **55 billion tons**.

**Decomposition Steps**:
1. **Fragmentation**: Detritivores (e.g. earthworm) break down detritus into smaller particles.
2. **Leaching**: Water-soluble inorganic nutrients sink into soil horizon and precipitate as unavailable salts.
3. **Catabolism**: Bacterial and fungal enzymes degrade detritus into simpler inorganic substances.
4. **Humification**: Formation of dark, amorphous, colloidal substance (**humus**) resistant to microbial action.
5. **Mineralisation**: Humus degraded by microbes releasing inorganic nutrients.

**Ecological Pyramids**:
- **Pyramid of Energy**: **Always upright**, because energy is lost as heat at each trophic level (Lindeman's **10% Law**).
- **Pyramid of Biomass**: Mostly upright on land; **Inverted in aquatic ecosystems / sea** because biomass of fishes far exceeds that of phytoplankton.
- **Pyramid of Numbers**: Usually upright; inverted in tree ecosystem (1 tree supports thousands of birds/insects).`,
        ncertPointers: [
          "Succession: Primary succession occurs on bare rock / newly cooled lava (slow); Secondary occurs where natural vegetation was destroyed (abandoned farmland, burnt forest - faster).",
          "Hydrarch succession: Phytoplankton $\\to$ Submerged $\\to$ Floating $\\to$ Reed-swamp $\\to$ Marsh-meadow $\\to$ Scrub $\\to$ Forest (Mesic climax).",
        ],
      },
      {
        title: "Biodiversity Patterns, The Evil Quartet & Conservation",
        content: `**Patterns of Biodiversity**:
- **Latitudinal Gradient**: Species diversity decreases from equator toward poles. Tropical Amazonian rain forest in South America has the greatest biodiversity on earth.
- **Species-Area Relationship (Alexander von Humboldt)**:
  $$\\log S = \\log C + Z \\log A \\quad (S = C A^Z)$$
  Where $S$ = species richness, $A$ = area, $C$ = Y-intercept, $Z$ = regression coefficient (slope of the line).
  - For small regions: $Z = 0.1 \\text{ to } 0.2$.
  - For very large continents: $Z = 0.6 \\text{ to } 1.2$ (e.g., frugivorous birds and mammals in tropical forests of continents $Z = 1.15$).

**Loss of Biodiversity — 'The Evil Quartet'**:
1. **Habitat loss and fragmentation**: Most important cause (Amazon rainforest, 'lungs of the planet', cut down for soybean cultivation).
2. **Over-exploitation**: Steller's sea cow, Passenger pigeon driven to extinction.
3. **Alien species invasions**: Nile perch introduced into Lake Victoria caused extinction of >200 species of cichlid fish; Invasive weeds (*Lantana*, *Eichhornia* / water hyacinth, *Parthenium*); African catfish (*Clarias gariepinus*) illegal introduction threatens indigenous catfishes.
4. **Co-extinctions**: Obligate host extinction leads to extinction of parasite.

**Conservation Strategies**:
- **In-situ (On-site)**: Biosphere reserves (14 in India), National Parks (90), Wildlife Sanctuaries (448), **Sacred Groves** (Khasi and Jaintia Hills in Meghalaya, Aravalli Hills in Rajasthan).
- **Ex-situ (Off-site)**: Zoological parks, Botanical gardens, Wildlife safari parks, **Cryopreservation** (gametes preserved at -196°C in liquid nitrogen), Seed banks.`,
        ncertPointers: [
          "Earth Summit (Rio de Janeiro, 1992) for conservation of biodiversity; World Summit (Johannesburg, South Africa, 2002).",
          "Robert May estimates global species diversity at about 7 million.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Verhulst-Pearl Logistic Growth Equation",
        formula: "\\frac{dN}{dt} = rN \\left( \\frac{K - N}{K} \\right)",
        symbols: "N = \\text{population density}, r = \\text{intrinsic rate of natural increase}, K = \\text{carrying capacity}",
        siUnits: "Individuals per unit time",
        applicationCondition: "Finite resources / carrying capacity limit",
      },
      {
        name: "Species-Area Relationship (Alexander von Humboldt)",
        formula: "\\log S = \\log C + Z \\log A \\quad (S = C A^Z)",
        symbols: "S = \\text{species richness}, A = \\text{area}, Z = \\text{slope (regression coefficient)}",
        siUnits: "Logarithmic scale",
        applicationCondition: "Ecological biogeography",
      },
      {
        name: "In-situ vs Ex-situ Conservation Table",
        formula: "\\text{In-situ: National Parks, Biosphere Reserves, Sacred Groves} \\quad | \\quad \\text{Ex-situ: Cryopreservation, Botanical Gardens, Seed Banks}",
        symbols: "On-site vs Off-site preservation",
        siUnits: "Conservation typology",
        applicationCondition: "Biodiversity protection protocols",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Population Growth Curves: Exponential (J-Shaped) vs Logistic (S-Shaped)</text>
  
  <!-- Axes -->
  <line x1="100" y1="250" x2="680" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <line x1="100" y1="50" x2="100" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <text x="390" y="275" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Time (t)</text>
  <text x="50" y="150" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold" transform="rotate(-90 50 150)">Population Density (N)</text>
  
  <!-- Carrying Capacity Line -->
  <line x1="100" y1="110" x2="680" y2="110" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 6"/>
  <text x="600" y="100" textAnchor="middle" fill="#fda4af" fontSize="12" fontWeight="bold">Carrying Capacity (K)</text>
  
  <!-- Exponential Growth Curve (J-shaped) -->
  <path d="M 100,245 Q 260,240 330,160 Q 370,100 390,60" fill="none" stroke="#f59e0b" strokeWidth="3"/>
  <text x="410" y="75" textAnchor="start" fill="#fbbf24" fontSize="12" fontWeight="bold">dN/dt = rN (Exponential, J-shaped)</text>
  
  <!-- Logistic Growth Curve (S-shaped) -->
  <path d="M 100,245 Q 240,240 330,180 Q 420,115 650,112" fill="none" stroke="#10b981" strokeWidth="3.5"/>
  <text x="520" y="145" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">dN/dt = rN((K-N)/K)</text>
  <text x="520" y="165" textAnchor="middle" fill="#86efac" fontSize="11">(Sigmoid / Logistic)</text>
</svg>`,
    workedExamples: [
      {
        id: "bio_u5_t1_we1",
        questionNumber: 1,
        question: "In a pond, there were 20 lotus plants last year. Through reproduction, 8 new plants are added taking the current population to 28. Calculate the birth rate of the lotus population in plants per lotus per year.",
        options: [
          { id: "A", text: "0.4 offspring per lotus per year" },
          { id: "B", text: "0.28 offspring per lotus per year" },
          { id: "C", text: "0.8 offspring per lotus per year" },
          { id: "D", text: "1.4 offspring per lotus per year" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Birth rate is calculated as the number of new individuals added divided by the initial population size.",
          "Step 2: Initial population $N_0 = 20$. New plants added $\\Delta N = 8$.",
          "Step 3: $\\text{Birth rate} = \\frac{\\Delta N}{N_0} = \\frac{8}{20} = 0.4$ offspring per lotus per year.",
          "Step 4: Option A is correct.",
        ],
      },
      {
        id: "bio_u5_t1_we2",
        questionNumber: 2,
        question: "In the species-area relationship equation $\\log S = \\log C + Z \\log A$, what is the typical value of regression coefficient ($Z$) when analysing species richness across very large geographical areas like entire continents?",
        options: [
          { id: "A", text: "0.1 to 0.2" },
          { id: "B", text: "0.6 to 1.2" },
          { id: "C", text: "1.5 to 2.5" },
          { id: "D", text: "0.01 to 0.05" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Alexander von Humboldt observed that within a region, species richness increases with explored area up to a limit.",
          "Step 2: For small, regional areas (regardless of taxonomic group), $Z$ lies in the range of 0.1 to 0.2.",
          "Step 3: But if you analyze the species-area relationship among very large areas like entire continents, the slope of the line is much steeper ($Z$ values in the range of 0.6 to 1.2). Option B is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Population Interaction Identification",
        frequency: "Very High (at least 2 questions per shift)",
        typicalStem: "The interaction between an orchid growing as an epiphyte on a mango tree branch is an example of: (A) Parasitism (B) Commensalism (C) Mutualism (D) Amensalism.",
        strategy: "Orchid benefits (+), Mango is unaffected (0) $\\implies (+/0)$ Commensalism.",
      },
      {
        patternType: "In-situ vs Ex-situ Classification",
        frequency: "High",
        typicalStem: "Which one of the following is NOT an in-situ conservation method? Options: Biosphere reserve, National park, Sacred groves, Cryopreservation.",
        strategy: "Cryopreservation, Botanical gardens, and Zoological parks are off-site (Ex-situ).",
      },
    ],
    commonTraps: [
      {
        concept: "Aquatic Biomass Pyramid Shape",
        misconception: "Students assume all pyramids of biomass are upright.",
        correctUnderstanding: "Pyramid of biomass in an ocean or pond is **INVERTED** because the small biomass of microscopic phytoplankton supports a much larger biomass of zooplankton and fishes.",
      },
      {
        concept: "Total Biosphere Primary Productivity",
        misconception: "Thinking oceans produce most of the world's biomass because they cover 70% of the surface.",
        correctUnderstanding: "Total annual NPP is 170 billion tons. Oceans contribute only **55 billion tons** (less than 33%), while terrestrial ecosystems contribute **115 billion tons**.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "The Evil Quartet",
        mnemonic: "HOAC: Habitat loss > Over-exploitation > Alien species > Co-extinctions.",
        explanation: "Remembers the 4 major drivers of biodiversity extinction.",
      },
      {
        title: "Ex-situ Conservation Trio",
        mnemonic: "B-Z-C: Botanical gardens, Zoo / Safari parks, Cryopreservation.",
        explanation: "Quickly isolates ex-situ methods from national parks and sanctuaries.",
      },
    ],
    quickRevisionCard: {
      title: "Ecology & Biodiversity — High-Yield Cheat Sheet",
      bulletPoints: [
        "Logistic growth equation: $dN/dt = rN((K - N)/K)$ (Verhulst-Pearl sigmoid curve).",
        "Interactions: Mutualism (+/+); Commensalism (+/0); Amensalism (-/0); Competition (-/-).",
        "Orchid on mango: Commensalism (+/0); Mediterranean orchid Ophrys: Sexual deceit.",
        "NPP = GPP - R. Total biosphere NPP = 170 billion tons (Oceans = 55 billion tons).",
        "Pyramid of energy: ALWAYS upright. Pyramid of biomass in sea: INVERTED.",
        "Species-Area: $\\log S = \\log C + Z \\log A$. Continents $Z = 0.6 \\text{ to } 1.2$.",
        "The Evil Quartet: Habitat loss, Overexploitation, Alien species, Co-extinctions.",
        "Alien species: Nile perch (cichlid fish extinction), Parthenium, Eichhornia, Clarias.",
        "In-situ: National Parks, Biosphere reserves, Sacred groves; Ex-situ: Cryopreservation, Zoos.",
      ],
    },
    practiceQuestions: [
      {
        id: "bio_u5_t1_q1",
        question: "In a terrestrial ecosystem, the pyramid of energy is always:",
        options: [
          { id: "A", text: "Inverted" },
          { id: "B", text: "Always upright" },
          { id: "C", text: "Spindle-shaped" },
          { id: "D", text: "Both upright and inverted" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Pyramid of energy is always upright, can never be inverted, because when energy flows from a particular trophic level to the next, some energy is always lost as heat at each step (Lindeman's 10% law).",
      },
      {
        id: "bio_u5_t1_q2",
        question: "The interaction between sea anemone that has stinging tentacles and clown fish that lives among them is an example of:",
        options: [
          { id: "A", text: "Mutualism" },
          { id: "B", text: "Commensalism" },
          { id: "C", text: "Parasitism" },
          { id: "D", text: "Amensalism" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The fish gets protection from predators which stay away from the stinging tentacles. The anemone does not derive any apparent benefit nor harm $\\implies (+/0)$ Commensalism.",
      },
      {
        id: "bio_u5_t1_q3",
        question: "Which of the following is an ex-situ method of biodiversity conservation?",
        options: [
          { id: "A", text: "National Parks" },
          { id: "B", text: "Biosphere Reserves" },
          { id: "C", text: "Cryopreservation of gametes" },
          { id: "D", text: "Sacred Groves" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "In ex-situ conservation, threatened animals and plants are taken out from their natural habitat and placed in special settings. Cryopreservation of gametes at -196°C in liquid nitrogen is an ex-situ technique.",
      },
      {
        id: "bio_u5_t1_q4",
        question: "In the Verhulst-Pearl logistic growth equation dN/dt = rN((K - N)/K), the term (K - N)/K represents:",
        options: [
          { id: "A", text: "Biotic potential" },
          { id: "B", text: "Environmental resistance" },
          { id: "C", text: "Carrying capacity" },
          { id: "D", text: "Intrinsic rate of natural increase" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "The term $((K - N)/K)$ represents environmental resistance which slows population growth as density approaches carrying capacity $K$.",
      },
      {
        id: "bio_u5_t1_q5",
        question: "The introduction of which alien invasive species into Lake Victoria in East Africa led to the extinction of an ecologically unique assemblage of more than 200 species of cichlid fish?",
        options: [
          { id: "A", text: "African catfish (Clarias gariepinus)" },
          { id: "B", text: "Nile perch" },
          { id: "C", text: "Water hyacinth (Eichhornia)" },
          { id: "D", text: "Parthenium" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The Nile perch introduced into Lake Victoria in east Africa led eventually to the extinction of an ecologically unique assemblage of more than 200 species of cichlid fish in the lake.",
      },
      {
        id: "bio_u5_t1_q6",
        question: "The pyramid of biomass in an aquatic (marine) ecosystem is generally:",
        options: [
          { id: "A", text: "Always upright" },
          { id: "B", text: "Inverted" },
          { id: "C", text: "Horizontal" },
          { id: "D", text: "Bell-shaped" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "The pyramid of biomass in sea is generally inverted because the biomass of fishes far exceeds that of phytoplankton.",
      },
      {
        id: "bio_u5_t1_q7",
        question: "The annual net primary productivity of the whole biosphere is approximately 170 billion tons. What is the approximate contribution of the oceans?",
        options: [
          { id: "A", text: "115 billion tons" },
          { id: "B", text: "55 billion tons" },
          { id: "C", text: "85 billion tons" },
          { id: "D", text: "170 billion tons" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Despite occupying about 70 percent of the surface, the productivity of the oceans are only 55 billion tons.",
      },
      {
        id: "bio_u5_t1_q8",
        question: "Gause's competitive exclusion principle states that:",
        options: [
          { id: "A", text: "Two closely related species competing for the same limiting resources cannot co-exist indefinitely" },
          { id: "B", text: "More abundant species will always share resources equally" },
          { id: "C", text: "Larger organisms always outcompete smaller organisms" },
          { id: "D", text: "Predators eliminate prey completely in nature" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Gause's 'Competitive Exclusion Principle' states that two closely related species competing for the same resources cannot co-exist indefinitely and the competitively inferior one will be eliminated eventually.",
      },
      {
        id: "bio_u5_t1_q9",
        question: "Sacred groves in India are tracts of forest preserved primarily because of:",
        options: [
          { id: "A", text: "Commercial timber value" },
          { id: "B", text: "Cultural and religious beliefs of local indigenous tribes" },
          { id: "C", text: "Government-run biological research" },
          { id: "D", text: "Eco-tourism revenue generation" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Sacred groves are tracts of forest where all trees and wildlife within are venerated and given total protection because of religious and cultural traditions (e.g. Khasi and Jaintia Hills in Meghalaya).",
      },
      {
        id: "bio_u5_t1_q10",
        question: "Match the following ecological terms with their correct definitions:\n(a) Allen's rule - (i) Stage of suspended development in zooplankton\n(b) Diapause - (ii) Shorter extremities in mammals from colder climates to reduce heat loss\n(c) Humification - (iii) Accumulation of dark amorphous colloidal substance resistant to microbial action\n(d) Stratification - (iv) Vertical distribution of different species occupying different levels",
        options: [
          { id: "A", text: "a-(ii), b-(i), c-(iii), d-(iv)" },
          { id: "B", text: "a-(i), b-(ii), c-(iii), d-(iv)" },
          { id: "C", text: "a-(ii), b-(iii), c-(i), d-(iv)" },
          { id: "D", text: "a-(iv), b-(i), c-(iii), d-(ii)" },
        ],
        correctOption: "A",
        questionType: "Match The Following",
        difficulty: "medium",
        explanation: "Allen's rule = shorter extremities in cold climates (ii); Diapause = suspended development in zooplankton (i); Humification = accumulation of humus (iii); Stratification = vertical distribution of species (iv).",
      },
    ],
  },
];
