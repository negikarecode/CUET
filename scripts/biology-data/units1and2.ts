import { NoteDocument } from "@/types/notes";

export const biologyUnits1and2Topics: NoteDocument[] = [
  // Unit 1 - Topic 1: Sexual Reproduction in Flowering Plants
  {
    id: "bio_u1_t1",
    slug: "sexual-reproduction-in-flowering-plants",
    subject: "bio",
    subjectName: "Biology",
    subjectCode: "304",
    unitNumber: 1,
    unitTitle: "Reproduction",
    topicTitle: "Sexual Reproduction in Flowering Plants",
    ncertReference: {
      class: "Class 12",
      book: "Biology",
      chapterNumber: 2,
      chapterName: "Sexual Reproduction in Flowering Plants",
      sections: [
        "2.1 Flower — A Fascinating Organ of Angiosperms",
        "2.2 Pre-fertilisation: Structures and Events (Microsporogenesis, Megasporogenesis, Pollination)",
        "2.3 Double Fertilisation (Syngamy and Triple Fusion)",
        "2.4 Post-fertilisation: Structures and Events (Endosperm, Embryo, Seed, Fruit)",
        "2.5 Apomixis and Polyembryony",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (5-7 questions per shift)",
      totalPyqsInRepo: 210,
      weightagePercentage: 8,
    },
    summary30Seconds: [
      "Angiosperm microsporogenesis produces 2- or 3-celled pollen grains; megasporogenesis yields a monosporic 7-celled, 8-nucleate Polygonum-type embryo sac.",
      "Double fertilisation is unique to angiosperms: Syngamy ($1n + 1n \\to 2n$ Zygote) + Triple Fusion ($1n + 2n \\text{ polar nuclei} \\to 3n$ PEN / Primary Endosperm Nucleus).",
      "Endosperm development precedes embryo development to provide nutrition; seeds can be albuminous (castor, wheat, maize) or non-albuminous (pea, gram, bean).",
    ],
    coreConcepts: [
      {
        title: "Microsporogenesis & Pollen Grain Structure",
        content: `The anther is typically bilobed and dithecous with four microsporangia. The anther wall comprises four distinct layers:
1. **Epidermis**: Outermost protective single layer.
2. **Endothecium**: Layer with $\\alpha$-cellulosic fibrous bands that aid in hygroscopic dehiscence.
3. **Middle Layers**: 1–3 transient ephemeral nutritive layers.
4. **Tapetum**: Innermost layer with dense cytoplasm and polyploid/multinucleate cells that synthesizes sporopollenin, callase, and Pollenkitt.

Microspore mother cells (MMCs) undergo meiosis to produce microspore tetrads. Pollen grains have a two-layered wall:
- **Exine**: Made of **Sporopollenin** (one of the most resistant organic materials known; withstands high temperatures, strong acids, and alkali; no known enzyme degrades it). Possesses germ pores where sporopollenin is absent.
- **Intine**: Thin, continuous inner layer made of cellulose and pectin.
Over 60% of angiosperms shed pollen at the 2-celled stage (vegetative cell + generative cell); in the remaining <40%, the generative cell divides mitotically to form two male gametes before shedding (3-celled stage).`,
        ncertPointers: [
          "Tapetum nourishes developing pollen grains and secretes sporopollenin.",
          "Vegetative cell is bigger with abundant food reserve and irregular nucleus; generative cell floats in vegetative cell's cytoplasm.",
          "Parthenium (carrot grass) came as a contaminant with imported wheat and causes pollen allergy and asthma.",
        ],
      },
      {
        title: "Megasporogenesis & The 7-Celled, 8-Nucleate Embryo Sac",
        content: `The ovule (integumented megasporangium) is attached to the placenta via the funicle. The junction where the body of the ovule fuses with the funicle is the **hilum**.

A single Megaspore Mother Cell (MMC) in the micropylar region of the nucellus undergoes meiosis to form four megaspores. In most angiosperms, three degenerate at the micropylar end and only one functional megaspore at the chalazal end develops into the embryo sac (**Monosporic development**).

The nucleus of the functional megaspore undergoes three sequential free-nuclear mitotic divisions:
- 2-nucleate $\\to$ 4-nucleate $\\to$ 8-nucleate stage.
- Cytokinesis follows, organizing the classic **Polygonum-type embryo sac**:
  - **Egg apparatus** (Micropylar end): 2 Synergids (with filiform apparatus that guides pollen tube entry) + 1 Egg cell ($n$).
  - **Central cell**: Largest cell containing 2 polar nuclei in a large central vacuole.
  - **Antipodal cells** (Chalazal end): 3 cells that degenerate before or after fertilisation.
Total: **7 cells and 8 nuclei**.`,
        ncertPointers: [
          "Filiform apparatus is cellular thickenings of the synergid wall at the micropylar tip.",
          "Monosporic development: only one of the four megaspores gives rise to the female gametophyte.",
          "Chalaza represents the basal part of the ovule; micropyle is the small opening where integuments do not cover.",
        ],
      },
      {
        title: "Outbreeding Devices, Pollination & Double Fertilisation",
        content: `To prevent inbreeding depression caused by continued self-pollination, angiosperms have evolved outbreeding devices:
1. **Dichogamy**: Pollen release and stigma receptivity are non-synchronised (Protandry or Protogyny).
2. **Heterostyly**: Anther and stigma placed at different positions.
3. **Self-incompatibility**: Genetic mechanism preventing self-pollen from fertilising ovules by inhibiting pollen germination or pollen tube growth in the pistil.
4. **Dicliny (Production of unisexual flowers)**: Monoecious plants (castor, maize) prevent autogamy but not geitonogamy; Dioecious plants (papaya, date palm) prevent both autogamy and geitonogamy.

**Double Fertilisation**:
1. **Syngamy**: One male gamete ($n$) fuses with egg cell ($n$) $\\to$ Zygote ($2n$).
2. **Triple Fusion**: Second male gamete ($n$) fuses with the two polar nuclei ($n + n = 2n$) $\\to$ Primary Endosperm Nucleus (PEN, $3n$).`,
        ncertPointers: [
          "Autogamy: Transfer of pollen within the same flower (cleistogamous flowers like Viola, Oxalis, Commelina are invariant autogamous and do not require pollinators).",
          "Geitonogamy: Functionally cross-pollination (requires pollinator) but genetically similar to autogamy since pollen comes from the same plant.",
          "Xenogamy: Genetically and functionally true cross-pollination.",
        ],
      },
      {
        title: "Post-Fertilisation: Endosperm, Embryo, Seed & Apomixis",
        content: `**Endosperm Types**:
- **Free-nuclear endosperm**: PEN undergoes repeated nuclear divisions without cell wall formation (e.g., coconut water is free-nuclear endosperm made of thousands of nuclei; surrounding white kernel is cellular endosperm).

**Embryo Development**:
- In dicots: Zygote $\\to$ Proembryo $\\to$ Globular $\\to$ Heart-shaped $\\to$ Mature embryo with 2 cotyledons, embryonal axis (epicotyl terminating at plumule; hypocotyl terminating at radicle covered by root cap).
- In monocots (grasses): Single shield-shaped cotyledon called **Scutellum**, epicotyl with coleoptile, and radicle with coleorhiza.

**Apomixis & Polyembryony**:
- **Apomixis**: A form of asexual reproduction that mimics sexual reproduction, producing seeds without fertilisation (e.g., Asteraceae and grasses).
- In Citrus and Mango, nucellar cells surrounding the embryo sac start dividing, protrude into the embryo sac, and develop into multiple embryos (**Polyembryony**).`,
        ncertPointers: [
          "False fruits: Thalamus contributes to fruit formation (e.g., apple, strawberry, cashew).",
          "Parthenocarpic fruits: Fruit develops without fertilisation (e.g., banana); seedless.",
          "Perisperm: Persistent residual nucellus found in black pepper and beet.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Ploidy Levels in Angiosperm Reproductive Structures",
        formula: "\\text{Ploidy Chart: Gametes }(n), \\text{ Zygote }(2n), \\text{ PEN }(3n)",
        symbols: "n = \\text{haploid}, 2n = \\text{diploid}, 3n = \\text{triploid}",
        siUnits: "Unitless ploidy values",
        applicationCondition: "Standard angiospermic life cycle",
      },
      {
        name: "Albuminous vs Non-Albuminous Seeds",
        formula: "\\text{Albuminous: Endosperm retained (Maize, Castor); Non-Albuminous: Endosperm fully consumed (Pea, Bean)}",
        symbols: "Endospermic vs Exalbuminous",
        siUnits: "Morphological classification",
        applicationCondition: "Angiosperm mature seed taxonomy",
      },
      {
        name: "Outbreeding Devices Summary",
        formula: "\\text{Dioecy (Papaya) } \\implies \\text{No Autogamy, No Geitonogamy}; \\text{ Cleistogamy } \\implies \\text{Assured Seed Set}",
        symbols: "Genetic and structural adaptations",
        siUnits: "Floral morphology",
        applicationCondition: "Pollination ecology",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Angiosperm Embryo Sac (7-Celled, 8-Nucleate) & Double Fertilisation</text>
  
  <!-- Embryo Sac Outline -->
  <ellipse cx="380" cy="165" rx="170" ry="105" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2.5"/>
  
  <!-- Chalazal End (Antipodals) -->
  <g fill="#f43f5e">
    <circle cx="340" cy="95" r="14"/>
    <circle cx="380" cy="85" r="14"/>
    <circle cx="420" cy="95" r="14"/>
  </g>
  <text x="380" y="70" textAnchor="middle" fill="#fda4af" fontSize="12" fontWeight="bold">3 Antipodal Cells (n) — Chalazal End</text>
  
  <!-- Central Cell with 2 Polar Nuclei -->
  <ellipse cx="380" cy="165" rx="35" ry="24" fill="#334155" stroke="#94a3b8" strokeDasharray="3 3"/>
  <circle cx="368" cy="165" r="8" fill="#fbbf24"/>
  <circle cx="392" cy="165" r="8" fill="#fbbf24"/>
  <text x="380" y="145" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">Central Cell (2 Polar Nuclei: n + n)</text>
  
  <!-- Micropylar End (Egg + Synergids) -->
  <circle cx="380" cy="235" r="16" fill="#10b981"/>
  <text x="380" y="240" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Egg (n)</text>
  
  <circle cx="335" cy="225" r="13" fill="#6366f1"/>
  <circle cx="425" cy="225" r="13" fill="#6366f1"/>
  <text x="380" y="278" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">2 Synergids (n) with Filiform Apparatus — Micropylar End</text>
  
  <!-- Double Fertilisation Annotations -->
  <rect x="30" y="90" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5"/>
  <text x="110" y="112" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Syngamy</text>
  <text x="110" y="132" textAnchor="middle" fill="#94a3b8" fontSize="11">Male Gamete + Egg = 2n Zygote</text>
  
  <rect x="570" y="90" width="160" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5"/>
  <text x="650" y="112" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Triple Fusion</text>
  <text x="650" y="132" textAnchor="middle" fill="#94a3b8" fontSize="11">Male (n) + 2 Polar = 3n PEN</text>
</svg>`,
    workedExamples: [
      {
        id: "bio_u1_t1_we1",
        questionNumber: 1,
        question: "In an angiosperm plant, if the leaf cell has 24 chromosomes, determine the chromosome number in: (i) Pollen grain vegetative cell, (ii) Endosperm cell, (iii) Nucellar cell, and (iv) Synergid.",
        options: [
          { id: "A", text: "(i) 12, (ii) 36, (iii) 24, (iv) 12" },
          { id: "B", text: "(i) 24, (ii) 36, (iii) 24, (iv) 12" },
          { id: "C", text: "(i) 12, (ii) 24, (iii) 24, (iv) 12" },
          { id: "D", text: "(i) 12, (ii) 36, (iii) 12, (iv) 24" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Leaf is a somatic tissue, so $2n = 24$, giving haploid number $n = 12$.",
          "Step 2: (i) Pollen vegetative cell is haploid ($n$) = 12.",
          "Step 3: (ii) Endosperm cell is triploid ($3n$) formed by triple fusion = $3 \\times 12 = 36$.",
          "Step 4: (iii) Nucellus is maternal ovule somatic tissue ($2n$) = 24.",
          "Step 5: (iv) Synergid is a cell of female gametophyte ($n$) = 12. Correct sequence: 12, 36, 24, 12.",
        ],
      },
      {
        id: "bio_u1_t1_we2",
        questionNumber: 2,
        question: "How many meiotic divisions and mitotic divisions are required to produce 100 viable seeds in a typical angiosperm?",
        options: [
          { id: "A", text: "125 meiotic and 700 mitotic divisions" },
          { id: "B", text: "100 meiotic and 800 mitotic divisions" },
          { id: "C", text: "125 meiotic and 100 mitotic divisions" },
          { id: "D", text: "200 meiotic and 500 mitotic divisions" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: 1 seed requires 1 male gametophyte (from 1 pollen grain) and 1 female gametophyte (from 1 megaspore).",
          "Step 2: 1 microspore mother cell yields 4 functional pollen grains $\\to 100 / 4 = 25$ meiotic divisions for male gametophytes.",
          "Step 3: 1 megaspore mother cell yields 4 megaspores, but 3 degenerate, leaving only 1 functional megaspore $\\to 100$ meiotic divisions for female gametophytes.",
          "Step 4: Total meiotic divisions = $25 + 100 = 125$.",
          "Step 5: For each female gametophyte, 1 functional megaspore undergoes 3 mitotic divisions ($100 \\times 3 = 300$). For each pollen grain, 1 mitosis forms 2-celled pollen, and 1 generative cell mitosis forms 2 male gametes ($100 \\times 2 = 200$ to $400$ mitotic). Total mitotic = 700. Option A is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Ploidy & Chromosome Count Calculation",
        frequency: "Very High (at least 1 question per shift)",
        typicalStem: "If the chromosome number of endosperm is 48, what will be the chromosome number in the aleurone layer and generative cell?",
        strategy: "First identify $n$ from the given structure ($3n = 48 \\implies n = 16$). Aleurone layer is endosperm tissue or seed coat ($3n$ or $2n$), generative cell is $n = 16$.",
      },
      {
        patternType: "Match The Column (Fruit & Seed Anatomy)",
        frequency: "High",
        typicalStem: "Match Column I (Perisperm, Apomixis, Cleistogamy, False fruit) with Column II (Asteraceae, Viola, Black Pepper, Apple).",
        strategy: "Anchor with unique NCERT examples: Perisperm = Black pepper / Beet; Cleistogamous = Viola / Oxalis / Commelina; False fruit = Apple / Strawberry.",
      },
    ],
    commonTraps: [
      {
        concept: "Geitonogamy vs Xenogamy",
        misconception: "Students consider Geitonogamy to be genetically cross-pollination because pollen moves from one flower to another.",
        correctUnderstanding: "Genetically, geitonogamy is identical to autogamy because all flowers on the same plant share identical genes. Functionally, it is cross-pollination because it requires a pollinating agent.",
      },
      {
        concept: "Cleistogamy vs Chasmogamy",
        misconception: "Cleistogamous flowers open only at night to attract moths.",
        correctUnderstanding: "Cleistogamous flowers NEVER open at all. They undergo assured autogamy even in the complete absence of pollinators.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Cleistogamous Flowers Trio",
        mnemonic: "VOC: Viola, Oxalis, Commelina never open (Voice Of Cleistogamy).",
        explanation: "Remembers the 3 classic NCERT plants producing both chasmogamous and cleistogamous flowers.",
      },
      {
        title: "Perisperm Examples",
        mnemonic: "PPBB: Persistent Perisperm = Black Pepper & Beet.",
        explanation: "Quickly flags perisperm questions in match-the-column tests.",
      },
    ],
    quickRevisionCard: {
      title: "Sexual Reproduction in Flowering Plants — High-Yield Cheat Sheet",
      bulletPoints: [
        "Pollen exine = Sporopollenin (no enzyme degrades it); Intine = Cellulose + Pectin.",
        "60% angiosperms shed at 2-celled stage; 40% at 3-celled stage.",
        "Embryo sac is 7-celled and 8-nucleate (Polygonum type).",
        "Double Fertilisation: Syngamy ($1n + 1n = 2n$ Zygote) + Triple Fusion ($1n + 2n = 3n$ PEN).",
        "Free-nuclear endosperm: Coconut liquid; Cellular endosperm: Coconut white meat.",
        "Perisperm = Persistent nucellus in Black Pepper and Beet.",
        "Dioecy (Papaya, Date Palm) prevents BOTH autogamy and geitonogamy.",
        "Monoecy (Castor, Maize) prevents autogamy but ALLOWS geitonogamy.",
      ],
    },
    practiceQuestions: [
      {
        id: "bio_u1_t1_q1",
        question: "Which of the following layers of the microsporangial wall is multinucleated and performs the function of nourishing developing pollen grains?",
        options: [
          { id: "A", text: "Epidermis" },
          { id: "B", text: "Endothecium" },
          { id: "C", text: "Middle layers" },
          { id: "D", text: "Tapetum" },
        ],
        correctOption: "D",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Tapetum is the innermost microsporangial wall layer. Its cells have dense cytoplasm and are generally multinucleate, nourishing developing microspores.",
      },
      {
        id: "bio_u1_t1_q2",
        question: "In a fertilised embryo sac, the haploid, diploid, and triploid structures respectively are:",
        options: [
          { id: "A", text: "Synergid, Zygote, and Primary Endosperm Nucleus" },
          { id: "B", text: "Antipodal, Synergid, and Zygote" },
          { id: "C", text: "Zygote, Antipodal, and Endosperm" },
          { id: "D", text: "Synergid, Antipodal, and Zygote" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Synergid is haploid ($n$), Zygote is diploid ($2n$, formed by syngamy), and Primary Endosperm Nucleus (PEN) is triploid ($3n$, formed by triple fusion).",
      },
      {
        id: "bio_u1_t1_q3",
        question: "Which one of the following plants prevents both autogamy and geitonogamy?",
        options: [
          { id: "A", text: "Castor" },
          { id: "B", text: "Maize" },
          { id: "C", text: "Papaya" },
          { id: "D", text: "Cucumber" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Papaya is dioecious (male and female flowers are on separate plants). Hence, it prevents both autogamy (self-pollination in same flower) and geitonogamy (pollination between different flowers of same plant). Castor and maize are monoecious.",
      },
      {
        id: "bio_u1_t1_q4",
        question: "Persistent nucellus in the mature seed is called perisperm. It is found in:",
        options: [
          { id: "A", text: "Groundnut and Gram" },
          { id: "B", text: "Black pepper and Beet" },
          { id: "C", text: "Wheat and Maize" },
          { id: "D", text: "Castor and Sunflower" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "In some seeds such as black pepper and beet, remnants of nucellus are persistent. This residual, persistent nucellus is called perisperm.",
      },
      {
        id: "bio_u1_t1_q5",
        question: "Assertion (A): Cleistogamous flowers produce an assured seed set even in the absence of pollinators.\nReason (R): Cleistogamous flowers do not open at all, and anthers dehisce in close contact with stigma inside the flower bud.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is not the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        questionType: "Assertion-Reason",
        difficulty: "medium",
        explanation: "Because cleistogamous flowers never open, autogamy is invariant and guaranteed, giving an assured seed set without needing any insects or wind.",
      },
      {
        id: "bio_u1_t1_q6",
        question: "The filiform apparatus is a characteristic feature of:",
        options: [
          { id: "A", text: "Aleurone cell" },
          { id: "B", text: "Synergid" },
          { id: "C", text: "Generative cell" },
          { id: "D", text: "Egg cell" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The synergids have special cellular thickenings at the micropylar tip called the filiform apparatus, which play an important role in guiding pollen tubes into the synergid.",
      },
      {
        id: "bio_u1_t1_q7",
        question: "Match Column I with Column II:\n(a) Scutellum - (i) Monosporic 7-celled structure\n(b) Perisperm - (ii) Single shield-shaped cotyledon of grasses\n(c) Embryo sac - (iii) Residual persistent nucellus\n(d) Coleorhiza - (iv) Undifferentiated sheath covering radicle",
        options: [
          { id: "A", text: "a-(ii), b-(iii), c-(i), d-(iv)" },
          { id: "B", text: "a-(ii), b-(i), c-(iii), d-(iv)" },
          { id: "C", text: "a-(iii), b-(ii), c-(i), d-(iv)" },
          { id: "D", text: "a-(iv), b-(iii), c-(i), d-(ii)" },
        ],
        correctOption: "A",
        questionType: "Match The Following",
        difficulty: "medium",
        explanation: "Scutellum is the grass cotyledon (ii); Perisperm is persistent nucellus (iii); Embryo sac is 7-celled 8-nucleate (i); Coleorhiza protects root cap/radicle (iv).",
      },
      {
        id: "bio_u1_t1_q8",
        question: "What is the ploidy of cells of nucellus, MMC, functional megaspore, and female gametophyte respectively?",
        options: [
          { id: "A", text: "2n, 2n, n, n" },
          { id: "B", text: "2n, n, n, n" },
          { id: "C", text: "n, 2n, n, 2n" },
          { id: "D", text: "2n, 2n, 2n, n" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Nucellus is maternal ovule tissue ($2n$); Megaspore Mother Cell undergoes meiosis ($2n$); Functional megaspore is product of meiosis ($n$); Female gametophyte develops from megaspore by mitosis ($n$).",
      },
      {
        id: "bio_u1_t1_q9",
        question: "Parthenocarpic fruits are produced by:",
        options: [
          { id: "A", text: "Fertilisation of flower by foreign pollen" },
          { id: "B", text: "Development of fruit without fertilisation" },
          { id: "C", text: "Triple fusion failure" },
          { id: "D", text: "Apomictic embryo development" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Fruits that develop without fertilisation are called parthenocarpic fruits (e.g. banana). They are seedless.",
      },
      {
        id: "bio_u1_t1_q10",
        question: "Sporopollenin, the exine material of pollen grains, is synthesized by:",
        options: [
          { id: "A", text: "Endothecium" },
          { id: "B", text: "Tapetum" },
          { id: "C", text: "Middle layers" },
          { id: "D", text: "Pollen vegetative cell" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Tapetum synthesizes and secretes Ubisch bodies containing sporopollenin, forming the robust patterned exine of pollen grains.",
      },
    ],
  },

  // Unit 1 - Topic 2: Human Reproduction & Reproductive Health
  {
    id: "bio_u1_t2",
    slug: "human-reproduction-and-reproductive-health",
    subject: "bio",
    subjectName: "Biology",
    subjectCode: "304",
    unitNumber: 1,
    unitTitle: "Reproduction",
    topicTitle: "Human Reproduction & Reproductive Health",
    ncertReference: {
      class: "Class 12",
      book: "Biology",
      chapterNumber: 3,
      chapterName: "Human Reproduction & Reproductive Health",
      sections: [
        "3.1 The Male Reproductive System (Testes, Ducts, Accessory Glands)",
        "3.2 The Female Reproductive System (Ovaries, Oviducts, Uterus)",
        "3.3 Gametogenesis (Spermatogenesis vs Oogenesis)",
        "3.4 Menstrual Cycle & Hormonal Feedback (FSH, LH, Estrogen, Progesterone)",
        "3.5 Fertilisation, Cleavage, Implantation & Placenta",
        "4.1 Reproductive Health: Problems and Strategies",
        "4.2 Population Stabilisation and Birth Control (Contraceptive Methods)",
        "4.3 Medical Termination of Pregnancy (MTP) & Assisted Reproductive Technologies (ART: IVF, ZIFT, GIFT, ICSI)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (6-8 questions per shift)",
      totalPyqsInRepo: 245,
      weightagePercentage: 9,
    },
    summary30Seconds: [
      "Spermatogenesis occurs continuously from puberty yielding 4 motile spermatozoa per primary spermatocyte; Oogenesis begins during embryonic development and arrests at Prophase I (diplotene) until puberty, yielding 1 ovum and polar bodies.",
      "LH surge on day 14 induces ovulation of the secondary oocyte; Corpus luteum secretes high progesterone to sustain endometrium for implantation.",
      "Contraception includes barrier, copper-releasing IUDs (CuT, Cu7, Multiload 375 - suppress sperm motility), hormone-releasing IUDs (Progestasert, LNG-20 - make uterus unsuitable for implantation), and ART (ZIFT for up to 8 blastomeres, IUT for >8 blastomeres).",
    ],
    coreConcepts: [
      {
        title: "Male & Female Reproductive Systems & Gametogenesis",
        content: `**Male Reproductive Anatomy**:
- Testes situated in extra-abdominal **scrotum** maintaining temperature 2–2.5°C lower than normal body temperature for optimal spermatogenesis.
- **Seminiferous Tubules**: Contain Spermatogonia (produce sperm via meiosis) and **Sertoli cells** (nurse cells; provide nutrition to developing germ cells).
- Interstitial spaces contain **Leydig cells** (secrete androgens, primarily testosterone under LH stimulation).
- Male accessory glands: Seminal vesicles (paired; alkaline fructose-rich fluid), Prostate gland (single), and Bulbourethral/Cowper's glands (paired; lubrication of penis).

**Gametogenesis Comparison**:
- **Spermatogenesis**: Spermatogonium ($2n$) $\\to$ Primary spermatocyte ($2n$) $\\xrightarrow{\\text{Meiosis I}}$ 2 Secondary spermatocytes ($n$) $\\xrightarrow{\\text{Meiosis II}}$ 4 Spermatids ($n$) $\\xrightarrow{\\text{Spermiogenesis}}$ 4 Spermatozoa.
- **Oogenesis**: Oogonium ($2n$) $\\to$ Primary oocyte ($2n$, arrested in Prophase I) $\\xrightarrow{\\text{Meiosis I completed at ovulation}}$ 1 Secondary oocyte ($n$) + First polar body. Meiosis II arrests at Metaphase II and completes ONLY upon entry of sperm.`,
        ncertPointers: [
          "Spermiation: Release of mature spermatozoa from Sertoli cells into the cavity of seminiferous tubules.",
          "Spermiogenesis: Transformation of non-motile round spermatids into flagellated spermatozoa.",
          "Antrum: Fluid-filled cavity characteristic of tertiary and Graafian follicles.",
        ],
      },
      {
        title: "Menstrual Cycle & Hormonal Feedback Loops",
        content: `The 28-day human menstrual cycle consists of four distinct phases:
1. **Menstrual Phase (Days 1–5)**: Progesterone and estrogen levels drop due to degeneration of corpus luteum; breakdown of endometrial lining and blood vessels causes menses.
2. **Follicular / Proliferative Phase (Days 6–13)**: Pituitary gonadotropins (FSH and LH) increase gradually, stimulating primary follicles to mature into Graafian follicles. Maturing follicles secrete **Estrogen**, stimulating endometrial proliferation and thickening.
3. **Ovulatory Phase (Day 14)**: Rapid secretion of LH reaches maximum level mid-cycle (**LH surge**). LH surge triggers rupture of Graafian follicle and release of secondary oocyte into pelvic cavity.
4. **Luteal / Secretory Phase (Days 15–28)**: Ruptured Graafian follicle transforms into **Corpus Luteum**, which secretes large quantities of **Progesterone**. Progesterone maintains the glandular endometrium necessary for implantation of the blastocyst.`,
        ncertPointers: [
          "Without fertilisation, corpus luteum degenerates into Corpus Albicans, dropping progesterone and triggering next menses.",
          "Human Chorionic Gonadotropin (hCG) secreted by trophoblast maintains corpus luteum during early pregnancy.",
          "Placenta functions as endocrine gland producing hCG, hPL (human placental lactogen), estrogens, and progesterone. Relaxin is secreted by the ovary later in pregnancy.",
        ],
      },
      {
        title: "Contraceptive Methods & Assisted Reproductive Technologies (ART)",
        content: `**Contraceptive Classification**:
1. **Natural/Traditional**: Periodic abstinence (day 10–17 fertile window), Coitus interruptus, Lactational amenorrhea (effective only up to 6 months post-partum).
2. **Barriers**: Condoms (prevent STIs), Diaphragms/Cervical caps (vault barriers; used with spermicidal creams).
3. **IUDs (Intrauterine Devices)**:
   - **Non-medicated**: Lippes loop (promotes phagocytosis of sperms).
   - **Copper-releasing**: CuT, Cu7, Multiload 375 (Cu ions suppress sperm motility and fertilising capacity).
   - **Hormone-releasing**: Progestasert, LNG-20 (make uterus unsuitable for implantation and cervix hostile to sperms).
4. **Oral Contraceptive Pills**:
   - Daily pills: Contain progestogen-estrogen combinations; inhibit ovulation and alter cervical mucus.
   - **Saheli**: Once-a-week non-steroidal pill developed by CDRI Lucknow; centchroman with minimal side effects.
5. **Surgical (Sterilisation)**: Vasectomy (vas deferens tied/cut) and Tubectomy (fallopian tubes tied/cut). Highly irreversible.

**ART Procedures**:
- **IVF-ET (In Vitro Fertilisation - Embryo Transfer)**:
  - **ZIFT (Zygote Intra-Fallopian Transfer)**: Zygote or early embryo up to **8 blastomeres** transferred into fallopian tube.
  - **IUT (Intra-Uterine Transfer)**: Embryo with **more than 8 blastomeres** transferred directly into uterus.
- **GIFT (Gamete Intra-Fallopian Transfer)**: Transfer of an unfertilised ovum collected from donor into fallopian tube of a female who cannot produce one.
- **ICSI (Intra-Cytoplasmic Sperm Injection)**: Single sperm directly injected into the cytoplasm of an ovum in vitro.
- **AI / IUI (Artificial Insemination / Intra-Uterine Insemination)**: Semen collected from husband/donor introduced into uterus.`,
        ncertPointers: [
          "Amniocentesis: Prenatal diagnostic test using amniotic fluid; banned for sex determination to prevent female foeticide.",
          "MTP Act amended in 2017: Termination allowed up to 12 weeks with opinion of one RMP; 12–20 weeks requires two RMPs.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "IUD Types & Mechanisms of Action",
        formula: "\\text{Cu-IUDs: Suppress Motility} \\quad | \\quad \\text{Hormone-IUDs (LNG-20): Prevent Implantation + Hostile Cervix}",
        symbols: "Non-medicated, Copper-releasing, Hormone-releasing",
        siUnits: "Clinical categorization",
        applicationCondition: "Contraceptive selection in reproductive medicine",
      },
      {
        name: "ART Selection Criteria",
        formula: "\\le 8 \\text{ blastomeres} \\implies \\text{ZIFT}; \\quad > 8 \\text{ blastomeres} \\implies \\text{IUT}; \\quad \\text{Ovum inability} \\implies \\text{GIFT}",
        symbols: "ZIFT, IUT, GIFT, ICSI",
        siUnits: "Cellular stage threshold",
        applicationCondition: "Infertility treatment protocol",
      },
      {
        name: "Hormone Peaks in Menstrual Cycle",
        formula: "\\text{Day 14: LH Surge + FSH Peak + Estrogen Peak}; \\quad \\text{Day 21-23: Progesterone Peak (Corpus Luteum)}",
        symbols: "LH, FSH, Estrogen, Progesterone",
        siUnits: "IU/L & ng/mL",
        applicationCondition: "28-day ovulatory cycle",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Menstrual Cycle Hormonal Dynamics (28-Day Timeline)</text>
  
  <!-- Grid Axis -->
  <line x1="80" y1="240" x2="700" y2="240" stroke="#475569" strokeWidth="2"/>
  <line x1="80" y1="60" x2="80" y2="240" stroke="#475569" strokeWidth="2"/>
  
  <!-- Phases Bands -->
  <rect x="80" y="60" width="100" height="180" fill="#f43f5e" fillOpacity="0.08"/>
  <rect x="180" y="60" width="180" height="180" fill="#3b82f6" fillOpacity="0.08"/>
  <rect x="360" y="60" width="40" height="180" fill="#eab308" fillOpacity="0.15"/>
  <rect x="400" y="60" width="300" height="180" fill="#10b981" fillOpacity="0.08"/>
  
  <!-- Day Labels -->
  <text x="130" y="260" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">Days 1-5: Menses</text>
  <text x="270" y="260" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Days 6-13: Proliferative</text>
  <text x="380" y="260" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">Day 14: Ovulation</text>
  <text x="550" y="260" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">Days 15-28: Luteal / Secretory</text>
  
  <!-- LH Surge Curve -->
  <path d="M 80,210 Q 250,200 340,160 Q 380,70 410,180 Q 550,220 700,225" fill="none" stroke="#f59e0b" strokeWidth="3"/>
  <text x="380" y="65" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">LH Surge (Triggers Ovulation)</text>
  
  <!-- Progesterone Curve -->
  <path d="M 80,230 L 370,230 Q 500,100 560,110 Q 640,120 700,230" fill="none" stroke="#10b981" strokeWidth="3"/>
  <text x="560" y="95" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Progesterone (Corpus Luteum)</text>
  
  <!-- Estrogen Curve -->
  <path d="M 80,225 Q 260,190 320,120 Q 360,140 400,210 Q 530,170 700,225" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4"/>
  <text x="320" y="110" textAnchor="middle" fill="#f472b6" fontSize="11">Estrogen Peak</text>
</svg>`,
    workedExamples: [
      {
        id: "bio_u1_t2_we1",
        questionNumber: 1,
        question: "A couple experiencing primary infertility visits an ART clinic. The husband has normal sperm count and motility, but the wife has blocked fallopian tubes bilaterally and normal ovarian follicular reserve. Which of the following ART procedures is the most appropriate?",
        options: [
          { id: "A", text: "GIFT (Gamete Intra-Fallopian Transfer)" },
          { id: "B", text: "IVF followed by ZIFT" },
          { id: "C", text: "IVF followed by IUT (Intra-Uterine Transfer)" },
          { id: "D", text: "Artificial Insemination (IUI)" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: The female has bilateral blockage of fallopian tubes.",
          "Step 2: GIFT, ZIFT, and IUI require functional fallopian tubes for gamete transport, fertilisation, or early cleavage passage.",
          "Step 3: In vitro fertilisation (IVF) bypasses the fallopian tubes entirely. The resulting embryo (>8 blastomeres) can be transferred directly into the uterus via Intra-Uterine Transfer (IUT). Hence, Option C is correct.",
        ],
      },
      {
        id: "bio_u1_t2_we2",
        questionNumber: 2,
        question: "Match the contraceptive method with its precise mechanism of action:\n(A) Multiload 375 - (i) Non-steroidal once-a-week pill\n(B) Saheli - (ii) Suppresses sperm motility\n(C) LNG-20 - (iii) Blocks gamete transport irreversibly\n(D) Tubectomy - (iv) Makes uterus unsuitable for implantation",
        options: [
          { id: "A", text: "A-(ii), B-(i), C-(iv), D-(iii)" },
          { id: "B", text: "A-(iv), B-(i), C-(ii), D-(iii)" },
          { id: "C", text: "A-(ii), B-(iv), C-(i), D-(iii)" },
          { id: "D", text: "A-(i), B-(ii), C-(iv), D-(iii)" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Multiload 375 is a copper-releasing IUD that releases copper ions to suppress sperm motility and fertilising capacity $\\to$ (ii).",
          "Step 2: Saheli is an oral non-steroidal contraceptive pill taken once a week developed by CDRI $\\to$ (i).",
          "Step 3: LNG-20 is a hormone-releasing IUD that alters endometrial lining, making the uterus unsuitable for implantation $\\to$ (iv).",
          "Step 4: Tubectomy is surgical sterilisation blocking egg transport in fallopian tubes $\\to$ (iii). Correct match: A-(ii), B-(i), C-(iv), D-(iii).",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Hormone Feedback & Peak Identification",
        frequency: "Very High (in every single shift)",
        typicalStem: "Identify the hormone that exhibits a sharp peak immediately prior to ovulation and state its organ of origin.",
        strategy: "LH (Luteinizing Hormone) from Anterior Pituitary peaks on Day 14 (LH surge) causing rupture of Graafian follicle.",
      },
      {
        patternType: "Contraceptive Classification & Brand Matching",
        frequency: "High",
        typicalStem: "Which of the following is an example of hormone-releasing IUD? Options: Multiload 375, LNG-20, Lippes loop, CuT.",
        strategy: "Hormone-releasing IUDs in NCERT are strictly Progestasert and LNG-20.",
      },
    ],
    commonTraps: [
      {
        concept: "Spermatid to Spermatozoa vs Release",
        misconception: "Students confuse Spermiogenesis with Spermiation.",
        correctUnderstanding: "Spermiogenesis is the cytological transformation of spermatid into spermatozoon. Spermiation is the detachment/release of mature sperms from Sertoli cells into the lumen.",
      },
      {
        concept: "ZIFT vs IUT Blastomere Threshold",
        misconception: "Using ZIFT for embryos at the 16-cell or morula stage.",
        correctUnderstanding: "ZIFT transfers embryo up to 8 blastomeres into the fallopian tube. If the embryo has more than 8 blastomeres, it must undergo IUT (Intra-Uterine Transfer) directly into the uterus.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Copper-Releasing IUDs",
        mnemonic: "CMC: CuT, Multiload 375, Cu7.",
        explanation: "Never confuse copper IUDs with Lippes loop (non-medicated) or Progestasert/LNG-20 (hormone).",
      },
      {
        title: "Sperm Pathway in Male Tract",
        mnemonic: "SEVEN UP: Seminiferous tubules $\\to$ Epididymis $\\to$ Vas deferens $\\to$ Ejaculatory duct $\\to$ Urethra $\\to$ Penis.",
        explanation: "Quick anatomical ordering for sequencing MCQs in CUET.",
      },
    ],
    quickRevisionCard: {
      title: "Human Reproduction & Reproductive Health — Quick Card",
      bulletPoints: [
        "Testes temperature: 2–2.5°C below body temperature in scrotum.",
        "Leydig cells: Secrete androgens (testosterone) under LH stimulation.",
        "Sertoli cells: Nurse developing germ cells under FSH stimulation.",
        "LH Surge (Day 14) triggers ovulation of secondary oocyte.",
        "Corpus luteum secretes Progesterone (maintains endometrium for implantation).",
        "Placental hormones: hCG, hPL, Estrogen, Progesterone. Relaxin from ovary.",
        "Non-medicated IUD: Lippes loop; Cu-IUD: CuT, Cu7, Multiload 375.",
        "Hormone IUD: Progestasert, LNG-20; Non-steroidal pill: Saheli (CDRI).",
        "ART rules: ZIFT $\\le 8$ blastomeres (Fallopian tube); IUT $> 8$ blastomeres (Uterus).",
      ],
    },
    practiceQuestions: [
      {
        id: "bio_u1_t2_q1",
        question: "Which of the following hormones is secreted in large amounts by the corpus luteum to maintain the endometrium?",
        options: [
          { id: "A", text: "Estrogen" },
          { id: "B", text: "Progesterone" },
          { id: "C", text: "Luteinizing Hormone (LH)" },
          { id: "D", text: "Follicle Stimulating Hormone (FSH)" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Corpus luteum secretes large amounts of progesterone which is essential for maintenance of the endometrium, required for implantation of the fertilised ovum.",
      },
      {
        id: "bio_u1_t2_q2",
        question: "The function of copper ions released from copper-releasing IUDs (like CuT and Multiload 375) is to:",
        options: [
          { id: "A", text: "Inhibit ovulation completely" },
          { id: "B", text: "Make uterus unsuitable for implantation" },
          { id: "C", text: "Suppress sperm motility and fertilising capacity of sperms" },
          { id: "D", text: "Block the fallopian tubes permanently" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Cu ions released suppress sperm motility and the fertilising capacity of sperms.",
      },
      {
        id: "bio_u1_t2_q3",
        question: "In the context of Assisted Reproductive Technologies (ART), transfer of an embryo with more than 8 blastomeres into the uterus is known as:",
        options: [
          { id: "A", text: "ZIFT" },
          { id: "B", text: "GIFT" },
          { id: "C", text: "IUT" },
          { id: "D", text: "ICSI" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Embryos with more than 8 blastomeres are transferred into the uterus (IUT - Intra-Uterine Transfer), to complete further development.",
      },
      {
        id: "bio_u1_t2_q4",
        question: "Which of the following is a non-steroidal oral contraceptive pill developed by scientists at Central Drug Research Institute (CDRI) in Lucknow?",
        options: [
          { id: "A", text: "Mala-D" },
          { id: "B", text: "Saheli" },
          { id: "C", text: "Progestasert" },
          { id: "D", text: "LNG-20" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Saheli is a new oral contraceptive for females containing a non-steroidal preparation (centchroman), developed by CDRI, Lucknow. It is a 'once-a-week' pill with high contraceptive value.",
      },
      {
        id: "bio_u1_t2_q5",
        question: "Assertion (A): Amniocentesis for sex determination is legally banned in India.\nReason (R): It was widely misused for female foeticide, leading to an alarming decline in child sex ratio.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is not the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        questionType: "Assertion-Reason",
        difficulty: "medium",
        explanation: "A statutory ban on amniocentesis for sex determination was imposed to legally check female foeticide, preserving the child sex ratio.",
      },
      {
        id: "bio_u1_t2_q6",
        question: "Spermiogenesis is defined as the process of:",
        options: [
          { id: "A", text: "Formation of spermatogonia from germ cells" },
          { id: "B", text: "Transformation of spermatids into spermatozoa" },
          { id: "C", text: "Release of sperms from Sertoli cells into the seminiferous tubule" },
          { id: "D", text: "Division of primary spermatocytes into secondary spermatocytes" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The spermatids are transformed into spermatozoa (sperms) by the process called spermiogenesis.",
      },
      {
        id: "bio_u1_t2_q7",
        question: "Which extra-embryonic structure produces human chorionic gonadotropin (hCG) during pregnancy?",
        options: [
          { id: "A", text: "Amnion" },
          { id: "B", text: "Trophoblast / Placenta" },
          { id: "C", text: "Yolk sac" },
          { id: "D", text: "Corpus albicans" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The placenta / chorionic trophoblast acts as an endocrine tissue and produces several hormones including human chorionic gonadotropin (hCG).",
      },
      {
        id: "bio_u1_t2_q8",
        question: "Signals for parturition originate from:",
        options: [
          { id: "A", text: "Fully developed foetus only" },
          { id: "B", text: "Placenta only" },
          { id: "C", text: "Both fully developed foetus and placenta" },
          { id: "D", text: "Maternal pituitary oxytocin only" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "The signals for parturition originate from the fully developed foetus and the placenta which induce mild uterine contractions called foetal ejection reflex.",
      },
      {
        id: "bio_u1_t2_q9",
        question: "Which of the following is an example of a hormone-releasing IUD?",
        options: [
          { id: "A", text: "Multiload 375" },
          { id: "B", text: "LNG-20" },
          { id: "C", text: "Lippes loop" },
          { id: "D", text: "CuT" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Hormone releasing IUDs include Progestasert and LNG-20.",
      },
      {
        id: "bio_u1_t2_q10",
        question: "During which phase of the menstrual cycle do both LH and FSH attain their peak levels?",
        options: [
          { id: "A", text: "Menstrual phase" },
          { id: "B", text: "Early follicular phase" },
          { id: "C", text: "Middle of the cycle (~14th day)" },
          { id: "D", text: "Late luteal phase" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Both LH and FSH attain a peak level in the middle of cycle (about the 14th day). Rapid secretion of LH leading to its maximum level during the mid-cycle is called LH surge.",
      },
    ],
  },
];
