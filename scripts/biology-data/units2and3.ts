import { NoteDocument } from "@/types/notes";

export const biologyUnits2and3Topics: NoteDocument[] = [
  // Unit 2 - Topic 1: Mendelian Inheritance, Chromosomal Theory, Molecular Basis of Inheritance, Evolution
  {
    id: "bio_u2_t1",
    slug: "mendelian-inheritance-chromosomal-theory-molecular-basis-of-inheritance-evolution",
    subject: "bio",
    subjectName: "Biology",
    subjectCode: "304",
    unitNumber: 2,
    unitTitle: "Genetics and Evolution",
    topicTitle: "Mendelian Inheritance, Chromosomal Theory, Molecular Basis of Inheritance, Evolution",
    ncertReference: {
      class: "Class 12",
      book: "Biology",
      chapterNumber: 5,
      chapterName: "Principles of Inheritance and Variation, Molecular Basis of Inheritance & Evolution",
      sections: [
        "5.1 Mendel's Laws of Inheritance (Dominance, Segregation, Independent Assortment)",
        "5.2 Incomplete Dominance (Mirabilis jalapa / Antirrhinum) and Codominance (ABO Blood Groups)",
        "5.3 Chromosomal Theory of Inheritance (Sutton & Boveri, Morgan's Drosophila linkage)",
        "5.4 Sex Determination and Genetic Disorders (Mendelian vs Chromosomal: Haemophilia, Sickle-cell, Down, Klinefelter, Turner)",
        "6.1 The DNA Structure & Packaging (Double Helix, Nucleosome)",
        "6.2 Transforming Principle (Griffith, Avery-MacLeod-McCarty) and Hershey-Chase Experiment",
        "6.3 DNA Replication (Meselson-Stahl, Semiconservative)",
        "6.4 Transcription & Genetic Code (Codons, Wobble hypothesis)",
        "6.5 Translation & Lac Operon (Jacob & Monod)",
        "7.1 Origin of Life (Miller-Urey) & Evidences of Evolution (Homologous vs Analogous organs)",
        "7.2 Hardy-Weinberg Principle (p^2 + 2pq + q^2 = 1)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Highest weightage in Biology: 10-14 questions per shift",
      totalPyqsInRepo: 320,
      weightagePercentage: 18,
    },
    summary30Seconds: [
      "Mendel's Monohybrid phenotypic ratio is 3:1 (genotypic 1:2:1); Incomplete dominance phenotypic and genotypic ratio are identical (1:2:1 in Antirrhinum); Dihybrid ratio is 9:3:3:1.",
      "Morgan proved genes reside on chromosomes (Drosophila melanogaster); Linkage produces higher parental types whereas crossing over yields recombinants.",
      "DNA is the genetic material (Hershey-Chase with 35S and 32P; Meselson-Stahl with 15N proved semiconservative replication). Lac operon: allolactose is inducer; Hardy-Weinberg equilibrium maintains $p^2 + 2pq + q^2 = 1$ in the absence of evolutionary forces.",
    ],
    coreConcepts: [
      {
        title: "Mendelian Genetics & Non-Mendelian Extensions",
        content: `**Mendel's Principles**:
1. **Law of Dominance**: Characters are controlled by discrete units called factors (alleles) that occur in pairs; one dominates over the other.
2. **Law of Segregation**: Alleles do not show any blending; both characters are recovered as such in $F_2$ generation (universal law, no exceptions).
3. **Law of Independent Assortment**: When two pairs of traits are combined in a hybrid, segregation of one pair of characters is independent of the other pair (valid only for non-linked genes).

**Non-Mendelian Ratios**:
- **Incomplete Dominance**: Heterozygote shows intermediate phenotype. In *Antirrhinum majus* (snapdragon), Red ($RR$) $\\times$ White ($rr$) $\\to$ Pink ($Rr$). $F_2$ Phenotypic ratio = Genotypic ratio = **1 Red : 2 Pink : 1 White** ($1:2:1$).
- **Codominance**: Both alleles express independently in heterozygote. Human ABO blood groups controlled by gene $I$ with 3 alleles: $I^A, I^B, i$. $I^A$ and $I^B$ are codominant over $i$; genotype $I^A I^B$ gives blood group **AB** (6 genotypes, 4 phenotypes).
- **Pleiotropy**: A single gene controls multiple phenotypic manifestations (e.g., Phenylketonuria, Sickle-cell anaemia).`,
        ncertPointers: [
          "Test Cross: Unknown dominant phenotype crossed with homozygous recessive ($Tt \\times tt \\to 1:1$; $TtYy \\times ttyy \\to 1:1:1:1$). Used to test zygosity.",
          "Morgan chose Drosophila because: grew on simple synthetic medium, completed life cycle in 2 weeks, single mating produced large number of progeny, clear sexual dimorphism, and easily observable under low power microscope.",
        ],
      },
      {
        title: "Molecular Basis: Replication, Transcription, Translation & Lac Operon",
        content: `**Central Dogma**: $\\text{DNA} \\xrightarrow{\\text{Transcription}} \\text{mRNA} \\xrightarrow{\\text{Translation}} \\text{Protein}$.

**Key Historic Experiments**:
1. **Griffith (1928)**: *Streptococcus pneumoniae* transformation. Heat-killed S-strain + live R-strain transformed R to virulent S.
2. **Avery, MacLeod, McCarty (1944)**: Identified transforming substance as DNA (only DNase inhibited transformation; RNase and Protease had no effect).
3. **Hershey & Chase (1952)**: T2 bacteriophage labeled with $^{35}\\text{S}$ (capsid protein) and $^{32}\\text{P}$ (DNA core). Radioactive $^{32}\\text{P}$ entered bacteria, proving DNA is genetic material.
4. **Meselson & Stahl (1958)**: Heavy isotope $^{15}\\text{N}$ and CsCl density gradient centrifugation proved semiconservative replication. After 1 generation (20 min) $\\to$ 100% hybrid $^{14}\\text{N}/^{15}\\text{N}$; after 2 generations (40 min) $\\to$ 50% hybrid, 50% light $^{14}\\text{N}/^{14}\\text{N}$.

**Lac Operon (Jacob & Monod)**:
- Regulatory gene $i$ synthesizes constitutively the **repressor protein**.
- In absence of lactose (inducer), repressor binds to **operator ($O$)**, blocking RNA polymerase transcription.
- In presence of lactose (or allolactose), inducer binds repressor, inactivating it.
- Structural genes transcribed:
  - $z$ gene: $\\beta$-galactosidase (hydrolyzes lactose to glucose + galactose).
  - $y$ gene: Permease (increases membrane permeability to $\\beta$-galactosides).
  - $a$ gene: Transacetylase.`,
        ncertPointers: [
          "Genetic code is degenerate (some amino acids coded by more than one codon), unambiguous (one codon codes for only one amino acid), nearly universal, and non-overlapping.",
          "AUG is dual function: codes for Methionine and acts as initiator codon. UAA, UAG, UGA are stop/nonsense codons.",
        ],
      },
      {
        title: "Evolution & The Hardy-Weinberg Principle",
        content: `**Evidences of Organic Evolution**:
- **Homologous Organs**: Same fundamental structure and origin, adapted to different functions $\\implies$ **Divergent Evolution** (e.g., Forelimbs of whales, bats, cheetah, and humans; Thorn of *Bougainvillea* and tendril of *Cucurbita*).
- **Analogous Organs**: Different anatomical structures performing similar functions $\\implies$ **Convergent Evolution** (e.g., Wings of butterfly and birds; Eye of octopus and mammal; Sweet potato [root modification] and potato [stem modification]).

**Hardy-Weinberg Equilibrium**:
Allele frequencies in a large random-mating population remain constant from generation to generation in the absence of evolutionary forces:
$$p + q = 1 \\implies p^2 + 2pq + q^2 = 1$$
Where:
- $p^2$ = frequency of homozygous dominant ($AA$)
- $2pq$ = frequency of heterozygous individuals ($Aa$)
- $q^2$ = frequency of homozygous recessive individuals ($aa$)

Factors that disrupt Hardy-Weinberg equilibrium:
1. Gene flow / gene migration
2. Genetic drift (Sewall Wright effect; Founder effect; Bottleneck effect)
3. Mutation
4. Genetic recombination
5. Natural selection (Directional, Stabilising, or Disruptive)`,
        ncertPointers: [
          "Miller-Urey experiment (1953): Electric discharge in flask containing $CH_4, NH_3, H_2$ (ratio 2:1:2) and water vapor at 800°C produced amino acids (glycine, alanine, aspartic acid).",
          "Industrial Melanism in England: Peppered moth (*Biston betularia*) demonstrated natural selection (directional selection favoring dark melanised moths post-industrialisation due to soot-covered tree trunks).",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Hardy-Weinberg Equation",
        formula: "p^2 + 2pq + q^2 = 1 \\quad (p = \\text{freq of } A, \\; q = \\text{freq of } a)",
        symbols: "p^2 (AA), 2pq (Aa), q^2 (aa)",
        siUnits: "Genotype frequencies (sum to 1)",
        applicationCondition: "Large, panmictic population with no selection, drift, or mutation",
      },
      {
        name: "Human Genetic Disorders Summary",
        formula: "\\text{Down: Trisomy 21 (47); Klinefelter: XXY (47); Turner: 45, X0 (Sterile female)}",
        symbols: "Mendelian (Sickle cell: Glu \\to Val at 6th codon of \\beta-chain) vs Chromosomal",
        siUnits: "Karyotype notation",
        applicationCondition: "Clinical cytogenetics",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">The Lac Operon Architecture & Dual Regulation</text>
  
  <!-- DNA Bar -->
  <rect x="60" y="80" width="640" height="40" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2"/>
  
  <!-- Genes -->
  <rect x="80" y="85" width="80" height="30" rx="4" fill="#6366f1"/>
  <text x="120" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">i (Repressor)</text>
  
  <rect x="180" y="85" width="60" height="30" rx="4" fill="#3b82f6"/>
  <text x="210" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">p (Promoter)</text>
  
  <rect x="260" y="85" width="60" height="30" rx="4" fill="#ec4899"/>
  <text x="290" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">o (Operator)</text>
  
  <rect x="340" y="85" width="100" height="30" rx="4" fill="#10b981"/>
  <text x="390" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">z (β-Gal)</text>
  
  <rect x="460" y="85" width="100" height="30" rx="4" fill="#10b981"/>
  <text x="510" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">y (Permease)</text>
  
  <rect x="580" y="85" width="100" height="30" rx="4" fill="#10b981"/>
  <text x="630" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">a (Transacetylase)</text>
  
  <!-- Switched Off State -->
  <rect x="60" y="145" width="300" height="130" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5"/>
  <text x="210" y="170" textAnchor="middle" fill="#fda4af" fontSize="13" fontWeight="bold">Absence of Inducer (Lactose OFF)</text>
  <text x="210" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Gene i produces active repressor protein</text>
  <text x="210" y="215" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Repressor binds to Operator (o)</text>
  <text x="210" y="235" textAnchor="middle" fill="#cbd5e1" fontSize="11">• RNA Polymerase cannot transcribe z, y, a</text>
  <text x="210" y="255" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">Result: Operon SHUT DOWN</text>
  
  <!-- Switched On State -->
  <rect x="400" y="145" width="300" height="130" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5"/>
  <text x="550" y="170" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="bold">Presence of Inducer (Lactose ON)</text>
  <text x="550" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Allolactose binds repressor</text>
  <text x="550" y="215" textAnchor="middle" fill="#cbd5e1" fontSize="11">• Repressor inactivated, cannot bind operator</text>
  <text x="550" y="235" textAnchor="middle" fill="#cbd5e1" fontSize="11">• RNA Pol transcribes polycistronic mRNA</text>
  <text x="550" y="255" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">Result: β-Gal, Permease, Transacetylase made</text>
</svg>`,
    workedExamples: [
      {
        id: "bio_u2_t1_we1",
        questionNumber: 1,
        question: "In a random mating population in Hardy-Weinberg equilibrium, the frequency of recessive homozygous individuals ($aa$) for albinism is 9% (0.09). What is the percentage of carriers (heterozygous individuals, $Aa$) in this population?",
        options: [
          { id: "A", text: "42%" },
          { id: "B", text: "49%" },
          { id: "C", text: "21%" },
          { id: "D", text: "91%" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: In Hardy-Weinberg equation, frequency of homozygous recessive genotype is $q^2 = 0.09$.",
          "Step 2: Therefore, recessive allele frequency $q = \\sqrt{0.09} = 0.3$.",
          "Step 3: Since $p + q = 1$, dominant allele frequency $p = 1 - 0.3 = 0.7$.",
          "Step 4: Heterozygous carrier frequency is $2pq = 2 \\times 0.7 \\times 0.3 = 0.42 = 42\\%$. Option A is correct.",
        ],
      },
      {
        id: "bio_u2_t1_we2",
        questionNumber: 2,
        question: "A DNA sample of bacteriophage contains 20% Adenine. According to Chargaff's rules, calculate the percentage of Cytosine, Guanine, and Thymine in this double-stranded DNA.",
        options: [
          { id: "A", text: "T = 20%, G = 30%, C = 30%" },
          { id: "B", text: "T = 30%, G = 20%, C = 30%" },
          { id: "C", text: "T = 20%, G = 20%, C = 40%" },
          { id: "D", text: "T = 30%, G = 30%, C = 20%" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Chargaff's rule states that in double-stranded DNA, $[A] = [T]$ and $[G] = [C]$.",
          "Step 2: Given $A = 20\\%$, then $T = 20\\%$.",
          "Step 3: $A + T = 20 + 20 = 40\\%$.",
          "Step 4: Remaining $G + C = 100 - 40 = 60\\%$.",
          "Step 5: Since $G = C$, each is $60 / 2 = 30\\%$. Hence $T = 20\\%, G = 30\\%, C = 30\\%$.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Genetic Disorder Karyotype & Symptoms Matching",
        frequency: "Very High",
        typicalStem: "Match Down's syndrome, Turner's syndrome, and Klinefelter's syndrome with their chromosomal configurations.",
        strategy: "Down = Trisomy 21 (47, +21); Turner = Monosomy of X (45, X0, sterile female, webbed neck); Klinefelter = 47, XXY (gynaecomastia, sterile male).",
      },
      {
        patternType: "Meselson-Stahl Density Centrifugation Calculation",
        frequency: "High",
        typicalStem: "If E. coli cells grown in 15N medium are transferred to 14N medium and allowed to divide for 80 minutes, what will be the proportion of light and hybrid DNA?",
        strategy: "Generations $n = 80 / 20 = 4$. Total DNA molecules = $2^4 = 16$. Always exactly 2 hybrid molecules; remainder $16 - 2 = 14$ are light. Ratio 14 light : 2 hybrid (7:1).",
      },
    ],
    commonTraps: [
      {
        concept: "Sickle Cell Anaemia Point Mutation",
        misconception: "Students think sickle cell is caused by substitution of valine by glutamic acid.",
        correctUnderstanding: "It is the exact opposite: **Glutamic acid is substituted by Valine** at the 6th position of the $\\beta$-globin chain due to substitution of GAG by GUG.",
      },
      {
        concept: "Homologous vs Analogous Organs",
        misconception: "Thinking sweet potato and potato are homologous because both store starch.",
        correctUnderstanding: "Sweet potato is a modified root; potato is a modified stem. They perform same function with different origin $\\implies$ **Analogous** (Convergent Evolution).",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Stop Codons Memory Hook",
        mnemonic: "U Go Away (UGA), U Are Away (UAA), U Are Gone (UAG).",
        explanation: "Never forget the 3 termination codons in translation.",
      },
      {
        title: "Homologous vs Divergent Evolution",
        mnemonic: "HD TV: Homologous $\\implies$ Divergent. AC: Analogous $\\implies$ Convergent.",
        explanation: "Instantly solves convergent vs divergent evolution match questions in seconds.",
      },
    ],
    quickRevisionCard: {
      title: "Genetics & Evolution — High-Yield Cheat Sheet",
      bulletPoints: [
        "Incomplete dominance in Snapdragon: Phenotypic = Genotypic = 1:2:1.",
        "ABO blood groups: 3 alleles ($I^A, I^B, i$), 6 genotypes, 4 phenotypes.",
        "Sickle cell anaemia: GAG $\\to$ GUG, Glutamic acid replaced by Valine at position 6.",
        "Klinefelter (47, XXY, male with gynaecomastia); Turner (45, X0, sterile female).",
        "Hershey & Chase: $^{32}\\text{P}$ in DNA, $^{35}\\text{S}$ in protein capsid.",
        "Meselson & Stahl: E. coli in $^{15}\\text{N} \\to ^{14}\\text{N}$. 20 min = 100% hybrid; 40 min = 50% hybrid, 50% light.",
        "AUG: Dual function (Methionine + Initiator). Stop: UAA, UAG, UGA.",
        "Lac operon: Allolactose is inducer. $z = \\beta$-gal, $y = \\text{permease}, a = \\text{transacetylase}$.",
        "Homologous: Forelimbs of whale/bat/human $\\implies$ Divergent evolution.",
        "Analogous: Wings of bird/butterfly; Eye of octopus/mammal $\\implies$ Convergent evolution.",
      ],
    },
    practiceQuestions: [
      {
        id: "bio_u2_t1_q1",
        question: "In snapdragon (Antirrhinum majus), a red-flowered plant was crossed with a white-flowered plant. The F1 offspring had pink flowers. If the F1 plants are self-pollinated, the phenotypic ratio in F2 will be:",
        options: [
          { id: "A", text: "3 Red : 1 White" },
          { id: "B", text: "1 Red : 2 Pink : 1 White" },
          { id: "C", text: "9 Red : 3 Pink : 3 White : 1 Yellow" },
          { id: "D", text: "2 Red : 1 Pink : 1 White" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Flower colour in snapdragon shows incomplete dominance where the heterozygous condition ($Rr$) produces pink flowers. The $F_2$ phenotypic and genotypic ratios are both 1:2:1 (1 Red : 2 Pink : 1 White).",
      },
      {
        id: "bio_u2_t1_q2",
        question: "Which of the following amino acid substitutions occurs in the beta-globin chain of haemoglobin in a patient with sickle-cell anaemia?",
        options: [
          { id: "A", text: "Valine to Glutamic acid at the 6th position" },
          { id: "B", text: "Glutamic acid to Valine at the 6th position" },
          { id: "C", text: "Glycine to Valine at the 6th position" },
          { id: "D", text: "Glutamic acid to Aspartic acid at the 5th position" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Sickle-cell anaemia is caused by substitution of Glutamic acid (Glu) by Valine (Val) at the sixth position of the beta globin chain of haemoglobin.",
      },
      {
        id: "bio_u2_t1_q3",
        question: "In the Hershey-Chase experiment, bacteriophages were labelled with radioactive isotopes to identify the genetic material. Radioactive 32P labelled the _______ while 35S labelled the _______:",
        options: [
          { id: "A", text: "Viral DNA; Viral protein coat" },
          { id: "B", text: "Viral protein coat; Viral DNA" },
          { id: "C", text: "Bacterial cell wall; Viral DNA" },
          { id: "D", text: "Viral RNA; Viral envelope" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Phosphorus is present in DNA but not in proteins, so $^{32}\\text{P}$ labelled DNA. Sulphur is present in methionine/cysteine amino acids in proteins but not in DNA, so $^{35}\\text{S}$ labelled the protein coat.",
      },
      {
        id: "bio_u2_t1_q4",
        question: "The human male affected with Klinefelter's syndrome has which of the following sex-chromosomal complements?",
        options: [
          { id: "A", text: "45 with X0" },
          { id: "B", text: "47 with XXY" },
          { id: "C", text: "47 with XYY" },
          { id: "D", text: "47 with XXX" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Klinefelter's syndrome is caused by the presence of an additional copy of X-chromosome, resulting in a karyotype of 47, XXY. Such individuals are sterile males with overall masculine development and partial breast development (gynaecomastia).",
      },
      {
        id: "bio_u2_t1_q5",
        question: "Which of the following is the inducer molecule in the lactose operon of E. coli?",
        options: [
          { id: "A", text: "Glucose" },
          { id: "B", text: "Galactose" },
          { id: "C", text: "Lactose or Allolactose" },
          { id: "D", text: "cAMP" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Lactose (or allolactose) is the inducer in the lac operon; it binds to the repressor protein, causing conformational change that prevents it from binding to the operator.",
      },
      {
        id: "bio_u2_t1_q6",
        question: "The thorn of Bougainvillea and the tendril of Cucurbita are examples of:",
        options: [
          { id: "A", text: "Analogous organs representing convergent evolution" },
          { id: "B", text: "Homologous organs representing divergent evolution" },
          { id: "C", text: "Vestigial organs representing atavism" },
          { id: "D", text: "Homologous organs representing convergent evolution" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Thorns of Bougainvillea and tendrils of Cucurbita both arise in axillary bud positions (modified axillary stems); hence they share common anatomy/origin but perform different functions (defense vs climbing) $\\implies$ Homologous organs (Divergent evolution).",
      },
      {
        id: "bio_u2_t1_q7",
        question: "Assertion (A): The genetic code is degenerate.\nReason (R): Most amino acids are coded by more than one triplet codon.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is not the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        questionType: "Assertion-Reason",
        difficulty: "medium",
        explanation: "Because there are 61 codons for 20 amino acids, most amino acids are specified by more than one codon. This property is known as degeneracy of the genetic code.",
      },
      {
        id: "bio_u2_t1_q8",
        question: "If a double-stranded DNA has 30% Adenine, what will be the percentage of Cytosine in this DNA?",
        options: [
          { id: "A", text: "20%" },
          { id: "B", text: "30%" },
          { id: "C", text: "40%" },
          { id: "D", text: "70%" },
        ],
        correctOption: "A",
        questionType: "Calculation-Intensive MCQ",
        difficulty: "medium",
        explanation: "By Chargaff's rule, $A = T = 30\\%$. Thus $A + T = 60\\%$. Remaining $G + C = 40\\%$. Since $G = C$, $C = 40 / 2 = 20\\%$.",
      },
      {
        id: "bio_u2_t1_q9",
        question: "Match the following genetic disorders with their causative mechanisms:\n(a) Haemophilia - (i) Autosomal dominant gene mutation\n(b) Down's syndrome - (ii) X-linked recessive gene mutation\n(c) Turner's syndrome - (iii) Trisomy of chromosome 21\n(d) Myotonic dystrophy - (iv) Monosomy of sex chromosome (45, X0)",
        options: [
          { id: "A", text: "a-(ii), b-(iii), c-(iv), d-(i)" },
          { id: "B", text: "a-(ii), b-(iv), c-(iii), d-(i)" },
          { id: "C", text: "a-(i), b-(iii), c-(iv), d-(ii)" },
          { id: "D", text: "a-(iii), b-(ii), c-(iv), d-(i)" },
        ],
        correctOption: "A",
        questionType: "Match The Following",
        difficulty: "medium",
        explanation: "Haemophilia is sex-linked recessive (ii); Down's is trisomy 21 (iii); Turner's is 45, X0 (iv); Myotonic dystrophy is autosomal dominant in NCERT (i).",
      },
      {
        id: "bio_u2_t1_q10",
        question: "In the lac operon of E. coli, the structural gene 'z' codes for:",
        options: [
          { id: "A", text: "Permease" },
          { id: "B", text: "Transacetylase" },
          { id: "C", text: "Beta-galactosidase" },
          { id: "D", text: "Repressor protein" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The 'z' gene codes for beta-galactosidase which hydrolyzes lactose into galactose and glucose; 'y' codes for permease; 'a' codes for transacetylase.",
      },
    ],
  },

  // Unit 3 - Topic 1: Human Health and Diseases, Microbes in Human Welfare
  {
    id: "bio_u3_t1",
    slug: "human-health-and-diseases-microbes-in-human-welfare",
    subject: "bio",
    subjectName: "Biology",
    subjectCode: "304",
    unitNumber: 3,
    unitTitle: "Biology and Human Welfare",
    topicTitle: "Human Health and Diseases, Microbes in Human Welfare",
    ncertReference: {
      class: "Class 12",
      book: "Biology",
      chapterNumber: 8,
      chapterName: "Human Health and Disease & Microbes in Human Welfare",
      sections: [
        "8.1 Common Infectious Diseases in Humans (Typhoid, Pneumonia, Malaria, Amoebiasis, Ascariasis, Ringworm)",
        "8.2 Immunity (Innate vs Acquired, Active vs Passive, Antibodies structure, Cell-mediated vs Humoral)",
        "8.3 AIDS & Cancer (HIV lifecycle, ELISA, Benign vs Malignant tumors, Carcinogens)",
        "8.4 Drugs and Alcohol Abuse (Opioids, Cannabinoids, Coca alkaloids)",
        "10.1 Microbes in Household Products (LAB, Toddy, Swiss cheese, Roquefort cheese)",
        "10.2 Microbes in Industrial Products (Fermented beverages, Antibiotics, Organic acids, Enzymes, Bioactive molecules: Cyclosporin A, Statins)",
        "10.3 Microbes in Sewage Treatment (Primary vs Secondary biological treatment, BOD)",
        "10.4 Biogas Production (Methanogens) and Biocontrol Agents (Bt, Trichoderma, Baculoviruses/NPV)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (7-9 questions per shift)",
      totalPyqsInRepo: 265,
      weightagePercentage: 11,
    },
    summary30Seconds: [
      "Infectious diseases: Typhoid (Salmonella typhi, Widal test); Malaria (Plasmodium vivax/falciparum, female Anopheles vector, malignant tertian malaria by P. falciparum).",
      "Immunity: IgG crosses placenta; IgA in colostrum; Cell-mediated immunity (T-cells) mediates graft rejection; HIV attacks CD4+ helper T-lymphocytes.",
      "Bioactive molecules: Cyclosporin A (Trichoderma polysporum, immunosuppressant); Statins (Monascus purpureus, blood cholesterol lowering agent); Secondary sewage treatment reduces BOD via aerobic flocs.",
    ],
    coreConcepts: [
      {
        title: "Infectious Diseases & Life Cycle of Plasmodium",
        content: `**Common Pathogens & Diseases**:
- **Typhoid**: *Salmonella typhi* enters small intestine via contaminated food/water; sustained high fever (39°–40°C), stomach pain, constipation, headache; severe cases cause intestinal perforation and death. Confirmed by **Widal test**. Classic carrier: Mary Mallon (Typhoid Mary).
- **Pneumonia**: *Streptococcus pneumoniae* and *Haemophilus influenzae*; infects alveoli of lungs; alveoli fill with fluid leading to severe breathing difficulty; in severe cases lips and fingernails turn gray to bluish.
- **Malaria**: *Plasmodium* life cycle requires **two hosts**:
  1. **Human (Asexual reproduction)**: Injected as **sporozoites** by female *Anopheles* mosquito $\\to$ multiply in liver cells (hepatocytes) $\\to$ attack RBCs $\\to$ rupture of RBCs releases **haemozoin** (toxic pigment causing periodic chills and high fever every 3–4 days). Gametocytes develop in RBCs.
  2. **Mosquito (Sexual reproduction)**: Female mosquito takes up gametocytes with blood meal $\\to$ fertilisation and development in mosquito's gut $\\to$ mature sporozoites escape and migrate to **salivary glands**.`,
        ncertPointers: [
          "Amoebiasis (amoebic dysentery): Entamoeba histolytica; houseflies act as mechanical carriers.",
          "Ringworm: Caused by fungi belonging to genera Microsporum, Trichophyton, and Epidermophyton.",
          "Malignant malaria caused by Plasmodium falciparum is the most serious and can even be fatal.",
        ],
      },
      {
        title: "Immunity, AIDS, Cancer & Drug Abuse",
        content: `**Innate vs Acquired Immunity**:
- **Innate Immunity**: Non-specific defense present from birth:
  1. *Physical barriers*: Skin, mucus coating of respiratory, gastrointestinal, and urogenital tracts.
  2. *Physiological barriers*: Acid in stomach, saliva in mouth, tears from eyes.
  3. *Cellular barriers*: Polymorphonuclear leukocytes (PMNL-neutrophils), monocytes, Natural Killer (NK) cells.
  4. *Cytokine barriers*: **Interferons** (proteins secreted by virus-infected cells which protect non-infected cells from further viral infection).
- **Acquired Immunity**: Pathogen-specific with memory.
  - **Humoral**: B-lymphocytes produce antibodies ($H_2L_2$ basic unit). IgA (colostrum), IgG (crosses placenta), IgE (allergic reactions), IgM.
  - **Cell-Mediated (CMI)**: Mediated by T-lymphocytes; responsible for **graft rejection** in organ transplantation (immunosuppressants like Cyclosporin A administered).

**AIDS & Cancer**:
- **HIV**: Retrovirus with RNA genome; reverse transcriptase synthesizes viral DNA $\\to$ integrates into host genome $\\to$ destroys **helper T-lymphocytes ($CD4^+$)**. Diagnosed by **ELISA**; confirmed by Western blot.
- **Cancer**: Normal cells show **contact inhibition**; cancer cells lose this property forming neoplasms (benign vs malignant). Malignant tumors exhibit **metastasis** (most feared property).

**Drugs**:
- **Opioids**: Morphine (diacetylmorphine is Heroin/smack), extracted from latex of poppy plant *Papaver somniferum*; depressant that slows down body functions.
- **Cannabinoids**: Extracted from *Cannabis sativa*; interact with cannabinoid receptors in brain; affect cardiovascular system.
- **Cocaine / Coca alkaloid**: From *Erythroxylum coca*; interferes with neurotransmitter dopamine; produces euphoria and hallucinations at high doses.`,
        ncertPointers: [
          "Primary lymphoid organs: Bone marrow and Thymus (where immature lymphocytes differentiate into antigen-sensitive lymphocytes).",
          "Secondary lymphoid organs: Spleen, lymph nodes, tonsils, Peyer's patches, MALT (Mucosa-Associated Lymphoid Tissue makes up 50% of lymphoid tissue).",
        ],
      },
      {
        title: "Microbes in Household, Industry & Sewage Treatment",
        content: `**Household Products**:
- *Lactobacillus* (LAB): Converts milk to curd, produces acids that coagulate milk proteins; improves nutritional quality by increasing **Vitamin $B_{12}$**.
- Bread making: Fermented by baker's yeast (*Saccharomyces cerevisiae*); puffing-up due to $CO_2$.
- Swiss cheese: Large holes due to production of large amount of $CO_2$ by *Propionibacterium shermanii*.
- Roquefort cheese: Ripened by growing specific fungi (*Penicillium roqueforti*).

**Industrial Bioactive Molecules**:
- **Citric acid**: *Aspergillus niger* (fungus).
- **Acetic acid**: *Acetobacter aceti* (bacterium).
- **Butyric acid**: *Clostridium butylicum* (bacterium).
- **Lactic acid**: *Lactobacillus* (bacterium).
- **Streptokinase**: Produced by *Streptococcus*, used as a "clot buster" for removing blood clots from patients suffering from myocardial infarction.
- **Cyclosporin A**: Produced by fungus *Trichoderma polysporum*; used as an **immunosuppressive agent** in organ-transplant patients.
- **Statins**: Produced by yeast *Monascus purpureus*; used as **blood cholesterol-lowering agents** by competitively inhibiting the enzyme responsible for cholesterol synthesis.

**Sewage Treatment**:
- **Primary treatment**: Physical removal of large and small particles via sequential filtration and sedimentation (forms primary sludge).
- **Secondary (Biological) treatment**: Effluent passed into large aeration tanks where vigorous growth of aerobic microbes (**flocs**: bacteria associated with fungal filaments) consumes organic matter $\\implies$ drastically **reduces BOD (Biochemical Oxygen Demand)**. Greater the BOD of waste water, more is its polluting potential.
- Effluent passed to settling tank $\\to$ flocs sediment as **activated sludge**. A small part pumped back as inoculum; major part pumped into **anaerobic sludge digesters** where anaerobic bacteria produce biogas ($CH_4, CO_2, H_2S$).`,
        ncertPointers: [
          "Baculoviruses belonging to genus Nucleopolyhedrovirus (NPV) are excellent species-specific, narrow-spectrum bioinsecticides with no negative impact on non-target organisms.",
          "Methanogens (Methanobacterium) present in anaerobic sludge and rumen of cattle produce Gobar gas (rich in methane).",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Bioactive Microbial Products Matching Table",
        formula: "\\text{Cyclosporin A } (Trichoderma polysporum) \\implies \\text{Immunosuppressant}; \\text{ Statins } (Monascus purpureus) \\implies \\text{Lowers Cholesterol}",
        symbols: "Streptokinase, Cyclosporin A, Statins, LAB",
        siUnits: "Pharmacological classification",
        applicationCondition: "Industrial microbiology applications",
      },
      {
        name: "Sewage Treatment BOD Relationship",
        formula: "\\text{High Organic Pollution} \\propto \\text{High BOD} \\propto \\text{Low Dissolved } O_2",
        symbols: "\\text{BOD (mg of } O_2 \\text{ consumed per litre)}",
        siUnits: "mg/L",
        applicationCondition: "Effluent water quality monitoring",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Plasmodium Vivax Digenetic Life Cycle Flowchart</text>
  
  <!-- Human Host Box -->
  <rect x="50" y="60" width="310" height="220" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="205" y="85" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">HUMAN HOST (Asexual Cycle)</text>
  
  <rect x="70" y="105" width="270" height="32" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="205" y="125" textAnchor="middle" fill="#f8fafc" fontSize="11">1. Bite: Sporozoites enter bloodstream</text>
  
  <rect x="70" y="145" width="270" height="32" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="205" y="165" textAnchor="middle" fill="#f8fafc" fontSize="11">2. Liver Cells: Multiply asexually (Schizogony)</text>
  
  <rect x="70" y="185" width="270" height="32" rx="6" fill="#0f172a" stroke="#ef4444"/>
  <text x="205" y="205" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">3. RBCs Rupture: Haemozoin $\to$ Chills & Fever</text>
  
  <rect x="70" y="225" width="270" height="32" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="205" y="245" textAnchor="middle" fill="#f8fafc" fontSize="11">4. Gametocytes (Sexual stages) form in RBCs</text>
  
  <!-- Mosquito Host Box -->
  <rect x="400" y="60" width="310" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="555" y="85" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">FEMALE ANOPHELES (Sexual Cycle)</text>
  
  <rect x="420" y="105" width="270" height="32" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="555" y="125" textAnchor="middle" fill="#f8fafc" fontSize="11">1. Takes up Gametocytes with Blood Meal</text>
  
  <rect x="420" y="145" width="270" height="32" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="555" y="165" textAnchor="middle" fill="#f8fafc" fontSize="11">2. Fertilisation & Zygote in Mosquito Gut</text>
  
  <rect x="420" y="185" width="270" height="32" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="555" y="205" textAnchor="middle" fill="#f8fafc" fontSize="11">3. Ookinete $\to$ Oocyst develops sporozoites</text>
  
  <rect x="420" y="225" width="270" height="32" rx="6" fill="#0f172a" stroke="#10b981"/>
  <text x="555" y="245" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">4. Sporozoites migrate to Salivary Glands</text>
</svg>`,
    workedExamples: [
      {
        id: "bio_u3_t1_we1",
        questionNumber: 1,
        question: "Match the following microbial products in Column I with their respective clinical / industrial applications in Column II:\n(A) Cyclosporin A - (i) Clot buster in myocardial infarction\n(B) Statin - (ii) Bioinsecticide targeting arthropods\n(C) Streptokinase - (iii) Immunosuppressant for organ transplant\n(D) Nucleopolyhedrovirus - (iv) Competitive inhibitor of cholesterol synthesis",
        options: [
          { id: "A", text: "A-(iii), B-(iv), C-(i), D-(ii)" },
          { id: "B", text: "A-(iv), B-(iii), C-(i), D-(ii)" },
          { id: "C", text: "A-(iii), B-(i), C-(iv), D-(ii)" },
          { id: "D", text: "A-(i), B-(iv), C-(iii), d-(ii)" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Cyclosporin A (from Trichoderma polysporum) is an immunosuppressive agent used in organ transplant patients $\\to$ (iii).",
          "Step 2: Statin (from Monascus purpureus) competitively inhibits cholesterol synthesis $\\to$ (iv).",
          "Step 3: Streptokinase (from Streptococcus) is a clot buster $\\to$ (i).",
          "Step 4: Nucleopolyhedrovirus is a narrow spectrum bioinsecticide $\\to$ (ii). Correct match: A-(iii), B-(iv), C-(i), D-(ii).",
        ],
      },
      {
        id: "bio_u3_t1_we2",
        questionNumber: 2,
        question: "During biological treatment of sewage, what is the primary role of aerobic flocs in aeration tanks?",
        options: [
          { id: "A", text: "They consume organic matter, dramatically reducing the Biochemical Oxygen Demand (BOD)" },
          { id: "B", text: "They settle down immediately to form the primary sludge" },
          { id: "C", text: "They digest anaerobic bacteria and produce biogas" },
          { id: "D", text: "They chlorinate the effluent to kill all microorganisms" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: In the aeration tank, effluent is agitated mechanically and air pumped in, allowing vigorous growth of aerobic microbes into flocs (masses of bacteria associated with fungal filaments).",
          "Step 2: While growing, these microbes consume the major part of the organic matter in the effluent.",
          "Step 3: This significantly reduces the BOD (Biochemical Oxygen Demand) of the effluent. Option A is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Microbial Source & Product Matching",
        frequency: "Extremely High (appears in >90% shifts)",
        typicalStem: "Statins, which lower blood cholesterol, are extracted from which organism? (A) Monascus purpureus (B) Trichoderma polysporum (C) Aspergillus niger (D) Acetobacter aceti.",
        strategy: "Memorize the 4 fungi and bacteria: Monascus = Statins; Trichoderma = Cyclosporin A; Aspergillus = Citric acid; Streptococcus = Streptokinase.",
      },
      {
        patternType: "Innate Immunity Barrier Categorization",
        frequency: "High",
        typicalStem: "Identify which of the following is a cytokine barrier of innate immunity: (A) Acid in stomach (B) PMNL-neutrophils (C) Interferons (D) Mucus coating.",
        strategy: "Cytokine barrier = Interferons; Cellular = PMNL / monocytes / NK cells; Physiological = Acid / saliva / tears; Physical = Skin / mucus.",
      },
    ],
    commonTraps: [
      {
        concept: "Graft Rejection Immunity Type",
        misconception: "Students mark Humoral immunity / Antibodies for graft rejection.",
        correctUnderstanding: "Cell-Mediated Immunity (CMI) mediated by T-lymphocytes is strictly responsible for graft rejection. That is why patients take T-cell suppressants like Cyclosporin A.",
      },
      {
        concept: "BOD and Water Cleanliness",
        misconception: "Thinking high BOD means clean, oxygen-rich water.",
        correctUnderstanding: "High BOD means microbes need LOTS of oxygen to consume the massive load of organic waste $\\implies$ HIGHLY POLLUTED water.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Microbial Bioactive Molecules",
        mnemonic: "T-C-I: Trichoderma $\\to$ Cyclosporin A $\\to$ Immunosuppressant. M-S-C: Monascus $\\to$ Statins $\\to$ Cholesterol lowering.",
        explanation: "Quick pairs that prevent confusion between Trichoderma and Monascus.",
      },
      {
        title: "Antibodies Abundance Order",
        mnemonic: "GAMED: IgG > IgA > IgM > IgE > IgD.",
        explanation: "Remembers relative abundance in serum (IgG is highest, passes placenta).",
      },
    ],
    quickRevisionCard: {
      title: "Human Health & Microbes — High-Yield Cheat Sheet",
      bulletPoints: [
        "Typhoid: Salmonella typhi, confirmed by Widal test.",
        "Malaria: Rupture of RBCs releases toxic Haemozoin (chills & fever).",
        "IgG crosses placenta; IgA in colostrum (passive natural immunity).",
        "Cell-Mediated Immunity (T-cells) causes graft rejection.",
        "HIV attacks CD4+ Helper T-cells; diagnosed by ELISA.",
        "Metastasis: Most feared characteristic of malignant cancerous tumors.",
        "Cyclosporin A: From Trichoderma polysporum (immunosuppressant).",
        "Statins: From Monascus purpureus (lowers blood cholesterol).",
        "Streptokinase: From Streptococcus (clot buster).",
        "Secondary sewage treatment: Aerobic flocs consume organic matter $\\to$ lowers BOD.",
      ],
    },
    practiceQuestions: [
      {
        id: "bio_u3_t1_q1",
        question: "Which of the following antibodies is predominantly present in colostrum secreted by mother during the initial days of lactation?",
        options: [
          { id: "A", text: "IgG" },
          { id: "B", text: "IgA" },
          { id: "C", text: "IgM" },
          { id: "D", text: "IgE" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The yellowish fluid colostrum secreted by mother during the initial days of lactation has abundant antibodies of type IgA to protect the newborn infant.",
      },
      {
        id: "bio_u3_t1_q2",
        question: "Statins, used as blood cholesterol-lowering agents, are produced commercially by the yeast:",
        options: [
          { id: "A", text: "Trichoderma polysporum" },
          { id: "B", text: "Monascus purpureus" },
          { id: "C", text: "Saccharomyces cerevisiae" },
          { id: "D", text: "Aspergillus niger" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Statins produced by the yeast Monascus purpureus have been commercialised as blood cholesterol-lowering agents by competitively inhibiting the enzyme responsible for synthesis of cholesterol.",
      },
      {
        id: "bio_u3_t1_q3",
        question: "The chemical substance released by the rupture of RBCs during the erythrocytic cycle of Plasmodium that induces periodic chills and high fever is:",
        options: [
          { id: "A", text: "Haemoglobin" },
          { id: "B", text: "Haemozoin" },
          { id: "C", text: "Histamine" },
          { id: "D", text: "Interferon" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The rupture of RBCs is associated with the release of a toxic substance, haemozoin, which is responsible for the chill and high fever recurring every 3 to 4 days.",
      },
      {
        id: "bio_u3_t1_q4",
        question: "Graft rejection in organ transplantation is primarily mediated by:",
        options: [
          { id: "A", text: "Humoral immune response" },
          { id: "B", text: "Cell-mediated immune response" },
          { id: "C", text: "Physiological barrier of innate immunity" },
          { id: "D", text: "Autoimmune response" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Cell-mediated immune response (mediated by T-lymphocytes) is responsible for the graft rejection.",
      },
      {
        id: "bio_u3_t1_q5",
        question: "Which of the following is a cytokine barrier of innate immunity?",
        options: [
          { id: "A", text: "Mucus coating of the gut" },
          { id: "B", text: "Acid in the stomach" },
          { id: "C", text: "Interferons" },
          { id: "D", text: "Polymorphonuclear leukocytes (PMNL)" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Virus-infected cells secrete proteins called interferons which protect non-infected cells from further viral infection. These belong to cytokine barriers.",
      },
      {
        id: "bio_u3_t1_q6",
        question: "A patient suffering from myocardial infarction is urgently administered which microbial enzyme to dissolve coronary blood clots?",
        options: [
          { id: "A", text: "Lipase" },
          { id: "B", text: "Pectinase" },
          { id: "C", text: "Streptokinase" },
          { id: "D", text: "Protease" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Streptokinase produced by the bacterium Streptococcus and modified by genetic engineering is used as a 'clot buster' for removing clots from blood vessels of patients suffering from myocardial infarction.",
      },
      {
        id: "bio_u3_t1_q7",
        question: "Baculoviruses belonging to the genus Nucleopolyhedrovirus are used as:",
        options: [
          { id: "A", text: "Broad-spectrum chemical insecticides" },
          { id: "B", text: "Species-specific, narrow-spectrum bioinsecticides" },
          { id: "C", text: "Biofertilizers that fix nitrogen" },
          { id: "D", text: "Pathogens that kill beneficial pollinators" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Baculoviruses are pathogens that attack insects and other arthropods. The majority used as biocontrol agents belong to the genus Nucleopolyhedrovirus. They are species-specific, narrow spectrum insecticidal applications with no negative impacts on non-target plants, mammals, or birds.",
      },
      {
        id: "bio_u3_t1_q8",
        question: "Biochemical Oxygen Demand (BOD) is a measure of:",
        options: [
          { id: "A", text: "Total inorganic minerals in water" },
          { id: "B", text: "Organic matter present in wastewater" },
          { id: "C", text: "Oxygen generated by autotrophic algae" },
          { id: "D", text: "Heavy metal toxicity in industrial runoff" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "BOD measures the rate of uptake of oxygen by micro-organisms in a sample of water, and thus indirectly, BOD is a measure of the organic matter present in the water.",
      },
      {
        id: "bio_u3_t1_q9",
        question: "Heroin, commonly known as 'smack', is chemically synthesized by:",
        options: [
          { id: "A", text: "Methylation of cocaine" },
          { id: "B", text: "Acetylation of morphine" },
          { id: "C", text: "Glycosylation of cannabinoids" },
          { id: "D", text: "Oxidation of barbiturates" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Heroin (diacetylmorphine) is a white, odourless, bitter crystalline compound obtained by acetylation of morphine, which is extracted from the latex of poppy plant Papaver somniferum.",
      },
      {
        id: "bio_u3_t1_q10",
        question: "Match the following microbes with their organic acid products:\n(a) Aspergillus niger - (i) Butyric acid\n(b) Acetobacter aceti - (ii) Citric acid\n(c) Clostridium butylicum - (iii) Lactic acid\n(d) Lactobacillus - (iv) Acetic acid",
        options: [
          { id: "A", text: "a-(ii), b-(iv), c-(i), d-(iii)" },
          { id: "B", text: "a-(ii), b-(i), c-(iv), d-(iii)" },
          { id: "C", text: "a-(iv), b-(ii), c-(i), d-(iii)" },
          { id: "D", text: "a-(i), b-(iv), c-(ii), d-(iii)" },
        ],
        correctOption: "A",
        questionType: "Match The Following",
        difficulty: "medium",
        explanation: "Aspergillus niger produces citric acid (ii); Acetobacter aceti produces acetic acid (iv); Clostridium butylicum produces butyric acid (i); Lactobacillus produces lactic acid (iii).",
      },
    ],
  },
];
