import { NoteDocument } from "@/types/notes";

export const psychologyUnits1to4Topics: NoteDocument[] = [
  // -------------------------------------------------------------------------
  // UNIT 1: Variations in Psychological Attributes
  // -------------------------------------------------------------------------
  {
    id: "psychology_u1_t1",
    slug: "individual-differences-theories-of-intelligence-emotional-intelligence-aptitude-and-creativity",
    subject: "psychology",
    subjectName: "Psychology",
    subjectCode: "324",
    unitNumber: 1,
    unitTitle: "Variations in Psychological Attributes",
    topicTitle: "Individual Differences, Theories of Intelligence, Emotional Intelligence, Aptitude & Creativity",
    ncertReference: {
      class: "12",
      book: "Psychology",
      chapterNumber: 1,
      chapterName: "Variations in Psychological Attributes",
      sections: [
        "Individual Differences in Human Functioning and Assessment Domains",
        "Theories of Intelligence: Psychometric vs Information-Processing",
        "PASS Model of Intelligence (Das, Naglieri, Kirby)",
        "Individual Differences in Intelligence: Bell Curve, Giftedness, Intellectual Disability",
        "Culture and Intelligence (Technological vs Integral Intelligence / Buddhi)",
        "Emotional Intelligence (EQ), Aptitude and Creativity",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Highest yield unit in Psychology (25+ questions across sets)",
      totalPyqsInRepo: 48,
      weightagePercentage: 12.0,
    },
    summary30Seconds: [
      "Theories of Intelligence: Psychometric (Binet 1-factor, Spearman 2-factor 'g' and 's', Thurstone 7 Primary Mental Abilities, Jensen hierarchical, Guilford 180-cell SOI) vs Information-Processing (Gardner 8 Multiple Intelligences, Sternberg Triarchic theory, Das-Naglieri PASS Model).",
      "Normal Probability Curve of IQ: Mean = 100, SD = 15. Intellectual Disability: IQ < 70 with adaptive skill deficits. Intellectual Giftedness: IQ > 130.",
      "Indian Concept of Intelligence: J.P. Das on 'Buddhi' (Holistic/Integral intelligence encompassing cognitive, social, emotional, and entrepreneurial competence).",
      "Emotional Intelligence (Salovey & Mayer / Goleman): Ability to monitor, discriminate, and use emotional information to guide thinking.",
      "Creativity vs Intelligence (Terman): High intelligence does not guarantee creativity, but a threshold level of intelligence is necessary.",
    ],
    coreConcepts: [
      {
        title: "1. Core Assessment Domains & Psychometric Theories",
        content:
          "Psychological attributes vary across individuals. Assessment uses standardised procedures (Psychological Tests, Interviews, Case Studies, Observations, Self-Reports):\n\n" +
          "• **Alfred Binet (1905)**: Uni-factor / One-factor theory. Conceptualised intelligence as a single general set of abilities used for solving any problem. Defined Mental Age (MA).\n" +
          "• **Charles Spearman (1927)**: Two-Factor Theory. Discovered via factor analysis that mental operations involve:\n" +
          "  - **General factor ('g'-factor)**: Universal inborn mental energy common to all cognitive performances.\n" +
          "  - **Specific factors ('s'-factors)**: Specific abilities unique to particular tasks (e.g., singing, painting, mechanics).\n" +
          "• **Louis Thurstone**: Theory of Primary Mental Abilities (PMA). Proposed 7 independent primary abilities:\n" +
          "  1. Verbal Comprehension (V), 2. Numerical Ability (N), 3. Spatial Relations (S), 4. Perceptual Speed (P), 5. Word Fluency (W), 6. Memory (M), 7. Inductive Reasoning (I).\n" +
          "• **Arthur Jensen**: Hierarchical Model of Intelligence:\n" +
          "  - **Level I (Associative Learning)**: Output is more or less similar to input; rote learning (e.g., memorising multiplication tables).\n" +
          "  - **Level II (Cognitive Competence)**: Higher-order skills; transformation and manipulation of input to produce output.\n" +
          "• **J.P. Guilford**: Structure of Intellect (SOI) Model. Classified intellectual traits along 3 dimensions: **Operations** (6), **Contents** (5), and **Products** (6) -> 6 × 5 × 6 = **180 cells**.",
        ncertPointers: [
          "Thurstone = 7 Primary Mental Abilities; Guilford = 180 cells (Operations × Contents × Products).",
          "Jensen Level I = Associative/Rote; Level II = Cognitive Competence/Higher-order.",
        ],
      },
      {
        title: "2. Information-Processing Theories: Gardner, Sternberg & PASS Model",
        content:
          "Information-processing theories study the cognitive processes that underlie intelligent behavior:\n\n" +
          "• **Howard Gardner — Theory of Multiple Intelligences**:\n" +
          "  - Rejects single IQ; proposes 8 distinct, autonomous intelligences:\n" +
          "    1. *Linguistic*: Word sensitivity (poets, writers).\n" +
          "    2. *Logical-Mathematical*: Abstract reasoning, scientific thinking (scientists, mathematicians).\n" +
          "    3. *Spatial*: Visual-spatial transformations (architects, pilots, sailors).\n" +
          "    4. *Musical*: Rhythm, pitch, timbre sensitivity (musicians, composers).\n" +
          "    5. *Bodily-Kinaesthetic*: Using body flexibilities and fine motor control (athletes, dancers, surgeons).\n" +
          "    6. *Interpersonal*: Understanding others' motives, moods, and feelings (psychologists, politicians, teachers).\n" +
          "    7. *Intrapersonal*: Self-awareness, knowing one's strengths, weaknesses, and desires (philosophers, spiritual leaders).\n" +
          "    8. *Naturalistic*: Sensitivity to natural fauna and flora (botanists, wildlife conservationists, farmers).\n\n" +
          "• **Robert Sternberg — Triarchic Theory of Intelligence**:\n" +
          "  - Defines intelligence as ability to adapt to, shape, and select environments.\n" +
          "  - 3 Sub-theories / Types:\n" +
          "    1. **Componential / Analytical Intelligence**: Academic problem solving (Meta-components, Performance components, Knowledge acquisition components).\n" +
          "    2. **Experiential / Creative Intelligence**: Dealing with novelty and automating responses (inventors, artists).\n" +
          "    3. **Contextual / Practical Intelligence**: 'Street smartness', adapting to, shaping, or selecting daily environments.\n\n" +
          "• **J.P. Das, Jack Naglieri, and Kirby — PASS Model of Intelligence**:\n" +
          "  - Brain operates through 3 functional units:\n" +
          "    1. **Planning**: Setting goals, formulating strategies, evaluating outcomes (prefrontal cortex).\n" +
          "    2. **Arousal / Attention**: Optimal arousal enables focusing selective attention (reticular activating system & brainstem).\n" +
          "    3. **Simultaneous and Successive Processing**: Simultaneous integrates stimuli into patterns (Raven's matrices, spatial tasks); Successive recalls stimuli in serial linear order (learning digits, alphabets).\n" +
          "  - Assessed via the **Cognitive Assessment System (CAS)** for individuals aged 5 to 18.",
        ncertPointers: [
          "Gardner = 8 intelligences; Sternberg = Componential, Experiential, Contextual.",
          "PASS model = Planning, Attention-Arousal, Simultaneous, Successive (tested by CAS).",
        ],
      },
      {
        title: "3. IQ Distribution, Giftedness & Intellectual Disability",
        content:
          "• **William Stern (1912)** devised Intelligence Quotient: $$\\text{IQ} = \\frac{\\text{Mental Age (MA)}}{\\text{Chronological Age (CA)}} \\times 100$$\n" +
          "• **Normal Distribution of IQ**:\n" +
          "  - Bell-shaped symmetrical curve: Mean = 100, Standard Deviation (SD) = 15.\n" +
          "  - Normal/Average Range: IQ 90 to 109 (~50% of the population).\n" +
          "• **Intellectual Deficiency (AAMR / DSM Definition)**:\n" +
          "  - Characterised by sub-average intellectual functioning (**IQ < 70**) along with concurrent deficits in **adaptive behaviour**, manifesting before the age of 18.\n" +
          "  - Levels: Mild (IQ 55-69, educable), Moderate (IQ 40-54, trainable), Severe (IQ 25-39, dependent), Profound (IQ < 25, life support).\n" +
          "• **Intellectual Giftedness**:\n" +
          "  - IQ > 130; exceptional performance across domains; high creativity, self-motivation, independent thinking, intrinsic locus of control.",
        ncertPointers: [
          "IQ formula: (MA / CA) * 100.",
          "Intellectual disability diagnosis requires TWO criteria: IQ < 70 AND adaptive deficits before age 18.",
        ],
      },
      {
        title: "4. Culture, Emotional Intelligence & Aptitude vs Creativity",
        content:
          "• **Culture and Intelligence**:\n" +
          "  - Technological societies reward Western notions: speed, abstract thinking, individual autonomy, logic.\n" +
          "  - Indian / Non-Western notions: **Buddhi** (knowledge, affective and socio-motivational components):\n" +
          "    1. Cognitive capacity, 2. Social competence (respect for elders, social harmony), 3. Emotional competence (self-regulation), 4. Entrepreneurial competence (commitment, perseverance).\n" +
          "• **Emotional Intelligence (EQ)**:\n" +
          "  - Conceptualised by **Salovey and Mayer**, popularised by **Daniel Goleman**.\n" +
          "  - Ability to monitor one's own and others' emotions, to discriminate among them, and to use this information to guide one's thinking and action.\n" +
          "• **Aptitude vs Interest**:\n" +
          "  - Aptitude: An individual's underlying potential for acquiring skills in a specific domain after training (e.g., mechanical, clerical, musical aptitude).\n" +
          "  - Interest: Preference for engaging in one activity over another.\n" +
          "• **Creativity and Intelligence**:\n" +
          "  - Lewis Terman's longitudinal studies proved that a person with high IQ may not be creative.\n" +
          "  - Intelligence provides a **threshold** (minimum baseline IQ ~110-120), beyond which creativity depends on divergent thinking, persistence, and environmental openness.",
        ncertPointers: [
          "Buddhi comprises cognitive, social, emotional, and entrepreneurial competencies.",
          "Creativity requires divergent thinking; conventional IQ tests measure convergent thinking.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "William Stern IQ Formula",
        formula: "IQ = (Mental Age / Chronological Age) × 100",
        symbols: "IQ = (MA / CA) × 100",
        siUnits: "Intelligence Quotient Score",
        applicationCondition: "Calculating IQ from given Mental Age and Chronological Age",
        notes: "If MA = CA, IQ = 100. If MA > CA, IQ > 100. If MA < CA, IQ < 100.",
      },
      {
        name: "IQ Classification Table (NCERT)",
        formula: ">130 (Very Superior/Gifted) | 120-129 (Superior) | 110-119 (High Average) | 90-109 (Average) | 80-89 (Low Average) | 70-79 (Borderline) | <70 (Intellectually Deficient)",
        symbols: "Normal Curve distribution",
        siUnits: "Score bands",
        applicationCondition: "Direct score classification questions",
        notes: "Average range (90-109) encompasses approximately 50% of the normal population.",
      },
      {
        name: "Gardner's 8 Intelligences Matrix",
        formula: "Linguistic | Logical-Math | Spatial | Musical | Bodily-Kinaesthetic | Interpersonal | Intrapersonal | Naturalistic",
        symbols: "Autonomous Modular Intelligences",
        siUnits: "Multiple Intelligences framework",
        applicationCondition: "Match-the-following on professions and dominant intelligences",
        notes: "Existential intelligence was discussed later as a 9th candidate but 8 are canonical in NCERT.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Sternberg's Triarchic Theory of Intelligence",
      caption: "Three sub-theories: Componential (Analytical), Experiential (Creative), and Contextual (Practical).",
      code: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <rect x="250" y="15" width="200" height="50" rx="8" fill="#1e293b"/>
        <text x="350" y="45" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="14">Triarchic Intelligence</text>

        <!-- Componential / Analytical -->
        <rect x="20" y="100" width="195" height="120" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
        <text x="117" y="125" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="13">Componential</text>
        <text x="117" y="145" text-anchor="middle" fill="#1d4ed8" font-size="11">(Analytical Intelligence)</text>
        <text x="117" y="170" text-anchor="middle" fill="#1e3a8a" font-size="10">• Meta-components</text>
        <text x="117" y="190" text-anchor="middle" fill="#1e3a8a" font-size="10">• Performance &amp; Acquisition</text>

        <!-- Experiential / Creative -->
        <rect x="250" y="100" width="200" height="120" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
        <text x="350" y="125" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="13">Experiential</text>
        <text x="350" y="145" text-anchor="middle" fill="#b45309" font-size="11">(Creative Intelligence)</text>
        <text x="350" y="170" text-anchor="middle" fill="#78350f" font-size="10">• Dealing with novelty</text>
        <text x="350" y="190" text-anchor="middle" fill="#78350f" font-size="10">• Automating responses</text>

        <!-- Contextual / Practical -->
        <rect x="485" y="100" width="195" height="120" rx="8" fill="#dcfce7" stroke="#10b981" stroke-width="2"/>
        <text x="582" y="125" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="13">Contextual</text>
        <text x="582" y="145" text-anchor="middle" fill="#047857" font-size="11">(Practical Intelligence)</text>
        <text x="582" y="170" text-anchor="middle" fill="#064e3b" font-size="10">• "Street smartness"</text>
        <text x="582" y="190" text-anchor="middle" fill="#064e3b" font-size="10">• Adaptation &amp; Shaping</text>

        <!-- Connection lines -->
        <line x1="300" y1="65" x2="117" y2="100" stroke="#64748b" stroke-width="2"/>
        <line x1="350" y1="65" x2="350" y2="100" stroke="#64748b" stroke-width="2"/>
        <line x1="400" y1="65" x2="582" y2="100" stroke="#64748b" stroke-width="2"/>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <rect x="250" y="15" width="200" height="50" rx="8" fill="#1e293b"/>
      <text x="350" y="45" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="14">Triarchic Intelligence</text>

      <!-- Componential / Analytical -->
      <rect x="20" y="100" width="195" height="120" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
      <text x="117" y="125" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="13">Componential</text>
      <text x="117" y="145" text-anchor="middle" fill="#1d4ed8" font-size="11">(Analytical Intelligence)</text>
      <text x="117" y="170" text-anchor="middle" fill="#1e3a8a" font-size="10">• Meta-components</text>
      <text x="117" y="190" text-anchor="middle" fill="#1e3a8a" font-size="10">• Performance &amp; Acquisition</text>

      <!-- Experiential / Creative -->
      <rect x="250" y="100" width="200" height="120" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text x="350" y="125" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="13">Experiential</text>
      <text x="350" y="145" text-anchor="middle" fill="#b45309" font-size="11">(Creative Intelligence)</text>
      <text x="350" y="170" text-anchor="middle" fill="#78350f" font-size="10">• Dealing with novelty</text>
      <text x="350" y="190" text-anchor="middle" fill="#78350f" font-size="10">• Automating responses</text>

      <!-- Contextual / Practical -->
      <rect x="485" y="100" width="195" height="120" rx="8" fill="#dcfce7" stroke="#10b981" stroke-width="2"/>
      <text x="582" y="125" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="13">Contextual</text>
      <text x="582" y="145" text-anchor="middle" fill="#047857" font-size="11">(Practical Intelligence)</text>
      <text x="582" y="170" text-anchor="middle" fill="#064e3b" font-size="10">• "Street smartness"</text>
      <text x="582" y="190" text-anchor="middle" fill="#064e3b" font-size="10">• Adaptation &amp; Shaping</text>

      <!-- Connection lines -->
      <line x1="300" y1="65" x2="117" y2="100" stroke="#64748b" stroke-width="2"/>
      <line x1="350" y1="65" x2="350" y2="100" stroke="#64748b" stroke-width="2"/>
      <line x1="400" y1="65" x2="582" y2="100" stroke="#64748b" stroke-width="2"/>
    </svg>`,
    workedExamples: [
      {
        id: "psychology_u1_we1",
        questionNumber: 1,
        question:
          "A child with a chronological age (CA) of 10 years successfully completes cognitive tasks designated for a 12-year-old child. What is this child's Intelligence Quotient (IQ)?\n" +
          "(A) 83.3\n" +
          "(B) 100\n" +
          "(C) 120\n" +
          "(D) 130",
        options: [
          { id: "A", text: "83.3" },
          { id: "B", text: "100" },
          { id: "C", text: "120" },
          { id: "D", text: "130" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Formula for IQ = (Mental Age / Chronological Age) × 100.",
          "Step 2: Mental Age (MA) = 12 years; Chronological Age (CA) = 10 years.",
          "Step 3: IQ = (12 / 10) × 100 = 1.2 × 100 = 120.",
        ],
        cuetTip: "IQ = (MA / CA) * 100. If MA > CA, the score must be above 100.",
      },
      {
        id: "psychology_u1_we2",
        questionNumber: 2,
        question:
          "According to the PASS Model of Intelligence propounded by J.P. Das, Jack Naglieri, and Kirby, which cognitive functional process is responsible for setting goals, selecting strategies, and evaluating performance?\n" +
          "(A) Arousal / Attention\n" +
          "(B) Simultaneous Processing\n" +
          "(C) Successive Processing\n" +
          "(D) Planning",
        options: [
          { id: "A", text: "Arousal / Attention" },
          { id: "B", text: "Simultaneous Processing" },
          { id: "C", text: "Successive Processing" },
          { id: "D", text: "Planning" },
        ],
        correctOption: "D",
        solutionStepByStep: [
          "Step 1: Recall the four components of the PASS model: Planning, Attention-Arousal, Simultaneous, and Successive processing.",
          "Step 2: Planning is the executive component activated after information is processed; it allows goal setting, strategy selection, monitoring, and outcome evaluation.",
          "Step 3: Correct answer is Planning (Option D).",
        ],
        cuetTip: "Goal setting, strategy selection, and monitoring = Planning.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Theory-Theorist Attribution Match",
        frequency: "Very High",
        typicalStem: "Match the theory of intelligence with its propounder: Primary Mental Abilities, Triarchic Theory, PASS Model, Multiple Intelligences.",
        strategy: "Thurstone = PMA; Sternberg = Triarchic; Das/Naglieri/Kirby = PASS; Gardner = Multiple Intelligences.",
      },
      {
        patternType: "Profession to Gardner's Intelligence Match",
        frequency: "High",
        typicalStem: "An architect or air traffic controller predominantly utilises which type of intelligence according to Howard Gardner?",
        strategy: "Visualising 3D space, mental rotation, and spatial coordinates = Spatial Intelligence.",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing high IQ guarantees high creativity.",
        whyWrong: "Terman's classic longitudinal studies found that high IQ alone does not ensure creativity. Creative individuals generally possess above-average IQ (threshold hypothesis), but beyond that baseline, personality, divergent thinking, and persistence determine creativity.",
        correctUnderstanding: "Intelligence is a necessary but not sufficient condition for creativity.",
        trapOptionExample: "Option stating an individual with an IQ of 145 is necessarily a creative genius.",
      },
      {
        misconception: "Confusing Simultaneous and Successive processing.",
        whyWrong: "Simultaneous processing integrates multiple stimuli into an interrelated spatial or meaningful pattern (e.g., Raven's Progressive Matrices). Successive processing requires sequential recall in a fixed serial order (e.g., reciting a phone number or alphabets).",
        correctUnderstanding: "Simultaneous = Spatial pattern integration; Successive = Serial linear order.",
        trapOptionExample: "Claiming memorising a sequence of digits is simultaneous processing.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Gardner's 8 Intelligences",
        mnemonic: "L-L-S-M-B-I-I-N (Little Lions See Monkeys Bouncing In Indian Nature)",
        rule: "Linguistic, Logical-Math, Spatial, Musical, Bodily-Kinaesthetic, Interpersonal, Intrapersonal, Naturalistic",
        explanation: "Quick mnemonic to verify all 8 multiple intelligences.",
      },
      {
        title: "Sternberg's Triarchic Types",
        mnemonic: "C-A-P (Creative, Analytical, Practical)",
        rule: "Creative (Experiential), Analytical (Componential), Practical (Contextual)",
        explanation: "Matches Sternberg's three intelligence dimensions instantly.",
      },
    ],
    quickRevisionCard: {
      title: "Variations in Psychological Attributes — 60-Second Flash Card",
      bulletPoints: [
        "Binet: 1-factor theory; Spearman: 2-factor ('g' general + 's' specific).",
        "Thurstone: 7 Primary Mental Abilities (PMA); Jensen: Level I (Rote) & Level II (Cognitive).",
        "Guilford: SOI model = 6 Operations × 5 Contents × 6 Products = 180 cells.",
        "Gardner: 8 independent intelligences (Linguistic, Logic, Spatial, Musical, Bodily, Inter, Intra, Naturalistic).",
        "Sternberg: Triarchic theory (Componential/Analytical, Experiential/Creative, Contextual/Practical).",
        "PASS Model (Das, Naglieri, Kirby): Planning, Attention-Arousal, Simultaneous, Successive (CAS test).",
        "Normal Curve: Mean = 100, SD = 15; Intellectual disability = IQ < 70 + adaptive deficits before 18.",
        "Buddhi: Comprehensive Indian view including cognitive, social, emotional, and entrepreneurial facets.",
        "Emotional Intelligence (EQ): Salovey, Mayer, Goleman (monitor and use emotions constructively).",
      ],
      examTricks: [
        "IQ = (Mental Age / Chronological Age) * 100.",
        "Simultaneous = Raven's matrices; Successive = Digit span.",
      ],
    },
    practiceQuestions: [
      {
        id: "psychology_u1_q1",
        question: "Who among the following psychologists proposed the Theory of Primary Mental Abilities consisting of seven independent abilities?",
        type: "standard",
        options: [
          { id: "A", text: "Charles Spearman" },
          { id: "B", text: "Louis Thurstone" },
          { id: "C", text: "Arthur Jensen" },
          { id: "D", text: "J.P. Guilford" },
        ],
        correctOption: "B",
        explanation: "Louis Thurstone propounded the Theory of Primary Mental Abilities, identifying seven distinct primary mental abilities.",
        difficulty: "easy",
      },
      {
        id: "psychology_u1_q2",
        question: "According to Robert Sternberg's Triarchic Theory, 'street smartness' or the ability to adapt to everyday environmental demands is known as:",
        type: "standard",
        options: [
          { id: "A", text: "Componential Intelligence" },
          { id: "B", text: "Experiential Intelligence" },
          { id: "C", text: "Contextual Intelligence" },
          { id: "D", text: "Spatial Intelligence" },
        ],
        correctOption: "C",
        explanation: "Contextual or practical intelligence involves applying knowledge to navigate, adapt to, and shape everyday real-world environments.",
        difficulty: "easy",
      },
      {
        id: "psychology_u1_q3",
        question:
          "Assertion (A): According to the PASS model, planning is a higher-order cognitive function.\n" +
          "Reason (R): Planning enables an individual to establish goals, inspect alternatives, implement action strategies, and evaluate behavioural outcomes.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Planning is the supervisory executive function in the PASS model mediated by the frontal cortex, responsible for goal setting and monitoring.",
        difficulty: "medium",
      },
      {
        id: "psychology_u1_q4",
        question: "A child has a Chronological Age of 8 years and a Mental Age of 10 years. What is the child's IQ?",
        type: "standard",
        options: [
          { id: "A", text: "80" },
          { id: "B", text: "100" },
          { id: "C", text: "125" },
          { id: "D", text: "140" },
        ],
        correctOption: "C",
        explanation: "IQ = (MA / CA) × 100 = (10 / 8) × 100 = 1.25 × 100 = 125.",
        difficulty: "easy",
      },
      {
        id: "psychology_u1_q5",
        question:
          "Match List-I (Theorist) with List-II (Model of Intelligence):\n" +
          "List-I:\n" +
          "p. J.P. Guilford\n" +
          "q. Howard Gardner\n" +
          "r. Arthur Jensen\n" +
          "s. Das, Naglieri, Kirby\n" +
          "List-II:\n" +
          "1. Theory of Multiple Intelligences\n" +
          "2. Structure of Intellect (180 cells)\n" +
          "3. PASS Model\n" +
          "4. Hierarchical Model (Level I & Level II)\n" +
          "Select the correct match:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-2, q-1, r-4, s-3" },
          { id: "B", text: "p-1, q-2, r-4, s-3" },
          { id: "C", text: "p-2, q-4, r-1, s-3" },
          { id: "D", text: "p-3, q-1, r-4, s-2" },
        ],
        correctOption: "A",
        explanation: "Guilford (p-2: 180 cells), Gardner (q-1: Multiple Intelligences), Jensen (r-4: Hierarchical Level I/II), Das-Naglieri-Kirby (s-3: PASS).",
        difficulty: "easy",
      },
      {
        id: "psychology_u1_q6",
        question: "An individual diagnosed with Intellectual Deficiency must exhibit an IQ below 70 as well as concurrent deficits in:",
        type: "standard",
        options: [
          { id: "A", text: "Physical motor reflexes" },
          { id: "B", text: "Adaptive behaviour" },
          { id: "C", text: "Spatial rotation ability" },
          { id: "D", text: "Musical pitch sensitivity" },
        ],
        correctOption: "B",
        explanation: "Diagnostic criteria require both sub-average intellectual functioning (IQ < 70) and deficits in adaptive behaviour manifesting during the developmental period.",
        difficulty: "easy",
      },
      {
        id: "psychology_u1_q7",
        question: "Which of Gardner's multiple intelligences is most prominently developed in surgeons, dancers, and gymnasts?",
        type: "standard",
        options: [
          { id: "A", text: "Spatial Intelligence" },
          { id: "B", text: "Bodily-Kinaesthetic Intelligence" },
          { id: "C", text: "Interpersonal Intelligence" },
          { id: "D", text: "Naturalistic Intelligence" },
        ],
        correctOption: "B",
        explanation: "Bodily-Kinaesthetic intelligence involves fine motor coordination and whole-body flexibility required by dancers, athletes, and surgeons.",
        difficulty: "easy",
      },
      {
        id: "psychology_u1_q8",
        question:
          "Assertion (A): A person with high intelligence is not necessarily creative.\n" +
          "Reason (R): Intelligence tests primarily measure convergent thinking, whereas creativity requires divergent thinking.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Conventional intelligence tests evaluate convergent thinking (finding one correct answer), while creativity depends on open-ended, novel divergent ideation.",
        difficulty: "medium",
      },
      {
        id: "psychology_u1_q9",
        question: "The concept of 'Buddhi' in Indian psychological tradition encompasses which of the following competencies?",
        type: "standard",
        options: [
          { id: "A", text: "Only cognitive problem-solving ability" },
          { id: "B", text: "Cognitive, social, emotional, and entrepreneurial competence" },
          { id: "C", text: "Speed of information processing exclusively" },
          { id: "D", text: "Physical endurance and yogic posture mastery" },
        ],
        correctOption: "B",
        explanation: "Buddhi represents an integral, holistic view encompassing cognitive capacity, social competence, emotional regulation, and entrepreneurial persistence.",
        difficulty: "easy",
      },
      {
        id: "psychology_u1_q10",
        question: "Who among the following pioneered the concept of Emotional Intelligence (EQ)?",
        type: "standard",
        options: [
          { id: "A", text: "Alfred Binet and Theodore Simon" },
          { id: "B", text: "Peter Salovey and John Mayer" },
          { id: "C", text: "Charles Spearman and Louis Thurstone" },
          { id: "D", text: "Raymond Cattell and Hans Eysenck" },
        ],
        correctOption: "B",
        explanation: "Peter Salovey and John Mayer first formally defined Emotional Intelligence, which was later popularised globally by Daniel Goleman.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["Introduction to Psychology"],
      relatedTopics: ["Self and Personality", "Meeting Life Challenges"],
      practiceTestId: "practice-psychology-unit1-test1",
      practiceTestUrl: "/test/practice-psychology-unit1-test1",
      weaknessReportUrl: "/dashboard/radar?subject=psychology",
      weaknessRadarUrl: "/dashboard/radar?subject=psychology",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 2: Self and Personality
  // -------------------------------------------------------------------------
  {
    id: "psychology_u2_t1",
    slug: "concept-of-self-type-and-trait-theories-psychodynamic-approach-humanistic-approach-assessment",
    subject: "psychology",
    subjectName: "Psychology",
    subjectCode: "324",
    unitNumber: 2,
    unitTitle: "Self and Personality",
    topicTitle: "Concept of Self, Type and Trait Theories, Psychodynamic Approach, Humanistic Approach, Assessment",
    ncertReference: {
      class: "12",
      book: "Psychology",
      chapterNumber: 2,
      chapterName: "Self and Personality",
      sections: [
        "Concept of Self: Self-Esteem, Self-Efficacy, Self-Regulation",
        "Type Theories: Hippocrates, Ayurveda, Sheldon, Jung, Friedman-Rosenman",
        "Trait Theories: Allport, Cattell (16PF), Eysenck, Big Five (OCEAN)",
        "Psychodynamic Approach (Freud: Id, Ego, Superego, Defence Mechanisms, Psychosexual Stages)",
        "Post-Freudians: Jung, Adler, Horney, Erikson",
        "Humanistic Approach (Rogers, Maslow) & Personality Assessment (MMPI, Rorschach, TAT)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (24+ questions across sets)",
      totalPyqsInRepo: 46,
      weightagePercentage: 11.5,
    },
    summary30Seconds: [
      "Concept of Self: Self-concept (perception of oneself), Self-esteem (evaluative value of self), Self-efficacy (Bandura: belief in ability to achieve goals), Self-regulation (delay of gratification).",
      "Type Theories: Hippocrates (4 humours), Ayurveda (Tridoshas: Vata, Pitta, Kapha; Trigunas: Sattva, Rajas, Tamas), Sheldon (Endomorphic, Mesomorphic, Ectomorphic), Jung (Introvert/Extravert), Friedman-Rosenman (Type A prone to CHD vs Type B; Type C cancer prone; Type D depression prone).",
      "Trait Theories: Allport (Cardinal, Central, Secondary), Cattell (16 Primary Factors, Source vs Surface traits), Eysenck (Extraversion, Neuroticism, Psychoticism), Big Five OCEAN (Costa & McCrae).",
      "Freud Psychodynamics: Id (Pleasure, unconscious), Ego (Reality, conscious mediator), Superego (Moral judge). Defence mechanisms: Repression, Projection, Reaction Formation, Rationalisation, Displacement.",
      "Projective Tests: Rorschach Inkblot (10 cards), TAT (Morgan & Murray, 30 picture cards + 1 blank), Rosenzweig P-F study.",
    ],
    coreConcepts: [
      {
        title: "1. Self-Efficacy, Self-Regulation & Classical Type Approaches",
        content:
          "• **Concept of Self**:\n" +
          "  - Personal Self (individual identity, autonomy) vs Social Self (social roles, family, community links).\n" +
          "  - **Self-Efficacy (Albert Bandura)**: Person's belief in their ability to master situations and produce positive outcomes. High self-efficacy people choose challenging tasks and persist.\n" +
          "  - **Self-Regulation**: Ability to monitor and control one's behavior; **delay of gratification** (resisting immediate impulses for long-term goals).\n\n" +
          "• **Type Theories of Personality**:\n" +
          "  - **Hippocrates**: Four humours/fluids: Sanguine (blood, cheerful), Melancholic (black bile, sad), Choleric (yellow bile, hot-tempered), Phlegmatic (phlegm, calm/sluggish).\n" +
          "  - **Ayurveda (Charaka Samhita)**: Three Tridoshas (**Vata, Pitta, Kapha**) and Three Trigunas (**Sattva** - cleanliness and truthfulness; **Rajas** - passion and action; **Tamas** - lethargy and ignorance).\n" +
          "  - **William Sheldon (Somatotypes)**: Body types linked to temperament:\n" +
          "    * *Endomorphic*: Round, soft, fat -> Viscerotonic (sociable, relaxed, fond of food).\n" +
          "    * *Mesomorphic*: Muscular, strong, rectangular -> Somatotonic (energetic, courageous, assertive).\n" +
          "    * *Ectomorphic*: Thin, fragile, brainy -> Cerebrotonic (introverted, artistic, sensitive).\n" +
          "  - **Carl Jung**: Grouped individuals into **Introverts** (withdrawn, reflective) and **Extraverts** (outgoing, sociable).\n" +
          "  - **Friedman and Rosenman**: **Type A** (highly competitive, impatient, chronic sense of time urgency, high risk for coronary heart disease) vs **Type B** (relaxed, patient, easy-going). Morris added **Type C** (unassertive, suppresses anger, prone to cancer); **Type D** (prone to depression and negative affectivity).",
        ncertPointers: [
          "Type A personality = Coronary Heart Disease (CHD); Type C = Prone to Cancer.",
          "Sheldon: Endomorphic = round/fond of food; Mesomorphic = muscular/energetic; Ectomorphic = thin/sensitive.",
        ],
      },
      {
        title: "2. Trait Theories: Allport, Cattell, Eysenck & Big Five",
        content:
          "Traits are relatively stable, enduring psychological characteristics:\n\n" +
          "• **Gordon Allport**:\n" +
          "  - **Cardinal Traits**: Pervasive traits that dominate a person's entire life and define them (e.g., Mahatma Gandhi's non-violence, Mother Teresa's compassion, Machiavellianism).\n" +
          "  - **Central Traits**: General characteristics (5 to 10) found in some degree in everyone (e.g., honesty, punctuality, kindness); used in writing testimonials.\n" +
          "  - **Secondary Traits**: Preferences and peripheral attitudes (e.g., preference for ethnic food, liking green clothes).\n\n" +
          "• **Raymond B. Cattell**:\n" +
          "  - Differentiated between **Surface Traits** (observable behaviors) and **Source Traits** (underlying basic units of personality).\n" +
          "  - Used factor analysis to identify **16 Source Traits (Primary Factors)**, creating the **16PF (Sixteen Personality Factor Questionnaire)**.\n\n" +
          "• **H.J. Eysenck**:\n" +
          "  - Biologically based hierarchical trait structure with 3 bipolar dimensions (**Eysenck Personality Questionnaire - EPQ**):\n" +
          "    1. **Extraversion vs Introversion**: Sociable, outgoing vs quiet, reserved.\n" +
          "    2. **Neuroticism vs Emotional Stability**: Anxious, temperamental vs calm, even-tempered.\n" +
          "    3. **Psychoticism vs Sociability**: Egocentric, hostile, non-conforming vs altruistic, empathetic.\n\n" +
          "• **Paul Costa and Robert McCrae — Five Factor Model (The 'Big Five' / OCEAN)**:\n" +
          "  1. **O — Openness to Experience**: Imaginative, curious, creative vs conventional, narrow interests.\n" +
          "  2. **C — Conscientiousness**: Organized, disciplined, goal-driven vs careless, impulsive.\n" +
          "  3. **E — Extraversion**: Outgoing, affectionate, talkative vs quiet, solitary.\n" +
          "  4. **A — Agreeableness**: Cooperative, trusting, warm vs suspicious, hostile.\n" +
          "  5. **N — Neuroticism**: Emotionally unstable, anxious, moody vs calm, resilient.",
        ncertPointers: [
          "Allport: Cardinal (defining), Central (5-10 core), Secondary (minor preferences).",
          "Big Five acronym = OCEAN (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism).",
        ],
      },
      {
        title: "3. Sigmund Freud: Psychodynamics, Defence Mechanisms & Stages",
        content:
          "Sigmund Freud founded psychoanalysis, viewing personality as an ongoing conflict between primal drives and societal morals:\n\n" +
          "• **Levels of Consciousness**: Conscious (current thoughts), Preconscious (accessible memories), Unconscious (repressed instincts, drives, traumas; accessed through dreams and Freudian slips).\n" +
          "• **Personality Structure**:\n" +
          "  - **Id**: Instinctual, unconscious, works on **Pleasure Principle**; immediate gratification via primary process thinking.\n" +
          "  - **Ego**: Realistic executive, works on **Reality Principle**; mediates between Id's demands, Superego's morals, and external reality via secondary process thinking.\n" +
          "  - **Superego**: Internalised moral standards of parents and society; works on **Moral Principle**; rewards with pride, punishes with guilt.\n\n" +
          "• **Ego Defence Mechanisms** (Unconscious distortions of reality to alleviate anxiety):\n" +
          "  - **Repression**: Pushing threatening thoughts into unconscious (fundamental defence).\n" +
          "  - **Projection**: Attributing one's own unacceptable impulses onto others (e.g., an aggressive person claiming everyone is out to attack them).\n" +
          "  - **Reaction Formation**: Expressing the exact opposite of one's real unacceptable impulses (e.g., exaggerated love masking hostility).\n" +
          "  - **Rationalisation**: Inventing socially acceptable excuses for unacceptable behavior ('sour grapes').\n" +
          "  - **Displacement**: Redirecting hostility away from dangerous source onto a safer target (e.g., employee yelled at by boss kicks his dog at home).\n\n" +
          "• **Psychosexual Stages**:\n" +
          "  - 1. **Oral Stage (0-1)**: Pleasure in mouth (sucking, biting). Fixation: smoking, overeating.\n" +
          "  - 2. **Anal Stage (1-3)**: Toilet training; pleasure in bowel retention or expulsion. Fixation: anal retentive (stubborn, stingy) or anal expulsive (messy).\n" +
          "  - 3. **Phallic Stage (3-6)**: Focus on genitals. Boys experience **Oedipus Complex** (desire for mother, castration anxiety toward father); Girls experience **Electra Complex** (penis envy, attachment to father).\n" +
          "  - 4. **Latency Stage (6-puberty)**: Sexual urges dormant; energy channelled into school, athletics, peer friendships.\n" +
          "  - 5. **Genital Stage (puberty onwards)**: Mature heterosexual attachments and adult sexual intimacy.",
        ncertPointers: [
          "Oedipus & Electra complexes occur in the Phallic stage (ages 3 to 6).",
          "Reaction formation = Expressing the exact opposite emotion.",
          "Displacement = Shifting emotional attack onto a safer substitute target.",
        ],
      },
      {
        title: "4. Post-Freudians, Humanistic View & Assessment Techniques",
        content:
          "• **Post-Freudians** (Neo-Analytic):\n" +
          "  - **Carl Jung (Analytical Psychology)**: Individual unconscious + **Collective Unconscious** (inherited evolutionary memories); **Archetypes** (universal thought forms: Persona, Shadow, Anima, Animus).\n" +
          "  - **Alfred Adler (Individual Psychology)**: **Inferiority Complex** and striving for superiority.\n" +
          "  - **Karen Horney**: Challenged Freud's penis envy (proposed male 'womb envy'); explored **Basic Anxiety** stemming from disturbed parent-child relations; coping styles: moving toward, against, or away from people.\n" +
          "  - **Erik Erikson**: Formulated 8 psychosocial crisis stages spanning the lifespan; introduced concept of **Identity Crisis**.\n\n" +
          "• **Humanistic Approach (Carl Rogers & Abraham Maslow)**:\n" +
          "  - People have an innate drive toward **Self-Actualisation**.\n" +
          "  - Carl Rogers: Theory of **Fully Functioning Person**; real self vs ideal self congruence; development requires **Unconditional Positive Regard**.\n\n" +
          "• **Personality Assessment Techniques**:\n" +
          "  - **Self-Report Inventories**: MMPI (Minnesota Multiphasic Personality Inventory - Hathaway & McKinley; 567 true/false items; 10 clinical scales); 16PF (Cattell); EPQ (Eysenck).\n" +
          "  - **Projective Techniques** (unstructured ambiguous stimuli reveal unconscious motives):\n" +
          "    * *Rorschach Inkblot Test* (Hermann Rorschach): 10 cards (5 black & white, 2 black & red, 3 pastel colours); administered in Performance and Inquiry phases.\n" +
          "    * *Thematic Apperception Test (TAT)* (Morgan & Murray): 30 picture cards portraying people in ambiguous scenarios + 1 blank card; respondent narrates a story with past, present, and future.\n" +
          "    * *Rosenzweig Picture-Frustration Study (P-F Study)*: Cartoon vignettes depicting mild frustration; measures direction of aggression (**Extrapunitive**, **Intrapunitive**, **Impunitive**).",
        ncertPointers: [
          "Rorschach = 10 cards (5 B&W, 2 B&R, 3 multicoloured/pastel).",
          "TAT = Morgan & Murray (30 picture cards + 1 blank card).",
          "P-F study = Rosenzweig (Extrapunitive, Intrapunitive, Impunitive).",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Big Five Personality Dimensions (OCEAN)",
        formula: "Openness | Conscientiousness | Extraversion | Agreeableness | Neuroticism",
        symbols: "Costa & McCrae Five Factor Model",
        siUnits: "Personality trait spectrum",
        applicationCondition: "Direct trait categorization questions in CUET",
        notes: "Neuroticism measures emotional instability vs emotional stability.",
      },
      {
        name: "Freud's Structural Personality Model",
        formula: "Id (Pleasure Principle) vs Ego (Reality Principle) vs Superego (Moral Principle)",
        symbols: "Dynamic structural components",
        siUnits: "Psychoanalytic construct",
        applicationCondition: "Contrasting principles and stages of consciousness",
        notes: "Ego uses defence mechanisms to protect against anxiety created by Id-Superego conflict.",
      },
      {
        name: "Projective Tests Inventory",
        formula: "Rorschach (10 Inkblots) | TAT (30+1 Pictures) | P-F Study (Cartoons) | Sentence Completion",
        symbols: "Projective hypothesis assessment",
        siUnits: "Diagnostic personality testing",
        applicationCondition: "Match-the-following on personality tests",
        notes: "Projective techniques allow projection of unconscious conflicts onto ambiguous stimuli.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Freud's Iceberg Model of Consciousness & Personality Structure",
      caption: "Conscious Ego, Preconscious Superego, and deep Unconscious Id.",
      code: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <!-- Water line -->
        <rect x="0" y="80" width="700" height="160" fill="#e0f2fe"/>
        <line x1="0" y1="80" x2="700" y2="80" stroke="#0284c7" stroke-width="3" stroke-dasharray="6"/>
        <text x="640" y="75" font-size="11" fill="#0369a1" font-weight="bold">Waterline</text>

        <!-- Iceberg Tip (Conscious) -->
        <polygon points="350,15 260,80 440,80" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
        <text x="350" y="55" text-anchor="middle" font-weight="bold" fill="#0f172a" font-size="12">Conscious</text>
        <text x="350" y="72" text-anchor="middle" fill="#334155" font-size="10">Ego (Reality Principle)</text>

        <!-- Iceberg Middle (Preconscious) -->
        <polygon points="260,80 440,80 490,130 210,130" fill="#bae6fd" stroke="#94a3b8" stroke-width="2"/>
        <text x="350" y="105" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="12">Preconscious</text>
        <text x="350" y="122" text-anchor="middle" fill="#075985" font-size="10">Superego (Moral Judge)</text>

        <!-- Iceberg Deep (Unconscious) -->
        <polygon points="210,130 490,130 420,230 280,230" fill="#38bdf8" stroke="#94a3b8" stroke-width="2"/>
        <text x="350" y="165" text-anchor="middle" font-weight="bold" fill="#0c4a6e" font-size="14">Unconscious (Huge Mass)</text>
        <text x="350" y="185" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="12">Id (Pleasure Principle)</text>
        <text x="350" y="205" text-anchor="middle" fill="#082f49" font-size="10">Repressed instincts, drives, traumas</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <!-- Water line -->
      <rect x="0" y="80" width="700" height="160" fill="#e0f2fe"/>
      <line x1="0" y1="80" x2="700" y2="80" stroke="#0284c7" stroke-width="3" stroke-dasharray="6"/>
      <text x="640" y="75" font-size="11" fill="#0369a1" font-weight="bold">Waterline</text>

      <!-- Iceberg Tip (Conscious) -->
      <polygon points="350,15 260,80 440,80" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
      <text x="350" y="55" text-anchor="middle" font-weight="bold" fill="#0f172a" font-size="12">Conscious</text>
      <text x="350" y="72" text-anchor="middle" fill="#334155" font-size="10">Ego (Reality Principle)</text>

      <!-- Iceberg Middle (Preconscious) -->
      <polygon points="260,80 440,80 490,130 210,130" fill="#bae6fd" stroke="#94a3b8" stroke-width="2"/>
      <text x="350" y="105" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="12">Preconscious</text>
      <text x="350" y="122" text-anchor="middle" fill="#075985" font-size="10">Superego (Moral Judge)</text>

      <!-- Iceberg Deep (Unconscious) -->
      <polygon points="210,130 490,130 420,230 280,230" fill="#38bdf8" stroke="#94a3b8" stroke-width="2"/>
      <text x="350" y="165" text-anchor="middle" font-weight="bold" fill="#0c4a6e" font-size="14">Unconscious (Huge Mass)</text>
      <text x="350" y="185" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="12">Id (Pleasure Principle)</text>
      <text x="350" y="205" text-anchor="middle" fill="#082f49" font-size="10">Repressed instincts, drives, traumas</text>
    </svg>`,
    workedExamples: [
      {
        id: "psychology_u2_we1",
        questionNumber: 1,
        question:
          "Rohan is an extremely competitive corporate lawyer who constantly monitors his watch, becomes irritable when queued, and works through weekends without rest. According to Friedman and Rosenman, Rohan exhibits:\n" +
          "(A) Type B Personality, prone to hypertension\n" +
          "(B) Type A Personality, prone to Coronary Heart Disease\n" +
          "(C) Type C Personality, prone to autoimmune conditions\n" +
          "(D) Type D Personality, prone to introversion",
        options: [
          { id: "A", text: "Type B Personality, prone to hypertension" },
          { id: "B", text: "Type A Personality, prone to Coronary Heart Disease" },
          { id: "C", text: "Type C Personality, prone to autoimmune conditions" },
          { id: "D", text: "Type D Personality, prone to introversion" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Identify Rohan's traits: high competitiveness, impatience, constant sense of time urgency, inability to relax.",
          "Step 2: Friedman and Rosenman defined these traits as characteristic of Type A personality.",
          "Step 3: Type A individuals are psychologically predisposed to Coronary Heart Disease (CHD).",
        ],
        cuetTip: "Type A = Competitive, impatient, time-urgent -> Coronary Heart Disease.",
      },
      {
        id: "psychology_u2_we2",
        questionNumber: 2,
        question:
          "An employee who is severely reprimanded by his company director returns home and violently kicks his pet dog. Which Freudian defence mechanism is illustrated in this behavior?\n" +
          "(A) Reaction Formation\n" +
          "(B) Projection\n" +
          "(C) Displacement\n" +
          "(D) Rationalisation",
        options: [
          { id: "A", text: "Reaction Formation" },
          { id: "B", text: "Projection" },
          { id: "C", text: "Displacement" },
          { id: "D", text: "Rationalisation" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: The employee feels anger toward his boss, but expressing it directly is too dangerous (risk of losing job).",
          "Step 2: Instead, he redirects that unacceptable aggressive impulse onto a safer, defenseless target (his dog).",
          "Step 3: This redirection of an impulse from a dangerous source to a safer substitute is Displacement (Option C).",
        ],
        cuetTip: "Displacement = Redirecting aggression to a safer substitute target.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Defence Mechanism Vignette Questions",
        frequency: "Very High",
        typicalStem: "A student who fails an exam insists that the teacher was unfair and biased. Which defence mechanism is being used?",
        strategy: "Justifying failures with socially plausible excuses = Rationalisation. Attributing one's own faults to others = Projection.",
      },
      {
        patternType: "Personality Test Cards & Specifications",
        frequency: "High",
        typicalStem: "The Rorschach Inkblot Test consists of how many inkblot cards?",
        strategy: "Always remember: Exactly 10 cards (5 black & white, 2 black & red, 3 pastel multicoloured).",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing Projection and Displacement.",
        whyWrong: "In Projection, you attribute your own unacceptable thoughts onto someone else ('He hates me' instead of 'I hate him'). In Displacement, you redirect your action/emotion onto a safer target (kicking a chair when mad at your parent).",
        correctUnderstanding: "Projection = Attributing thoughts to others; Displacement = Redirecting actions to safer objects.",
        trapOptionExample: "Labeling kicking a dog after being scolded as Projection.",
      },
      {
        misconception: "Believing Sheldon's Endomorph is thin and fragile.",
        whyWrong: "Endomorph is round, soft, and relaxed (viscerotonic). Ectomorph is thin, fragile, and sensitive (cerebrotonic). Mesomorph is muscular and bold.",
        correctUnderstanding: "Endo = Fat/Sociable; Meso = Muscular/Assertive; Ecto = Thin/Artistic.",
        trapOptionExample: "Calling a thin artistic person an Endomorph.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Big Five Traits Mnemonic",
        mnemonic: "O-C-E-A-N",
        rule: "Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism",
        explanation: "Universal acronym for the Costa & McCrae Five Factor Model.",
      },
      {
        title: "Allport's Trait Hierarchy",
        mnemonic: "C-C-S (Chief, Core, Secondary)",
        rule: "Cardinal (Life-dominating) -> Central (5-10 Core traits) -> Secondary (Preferences)",
        explanation: "Never mismatch the 3 levels of Allport's trait hierarchy.",
      },
    ],
    quickRevisionCard: {
      title: "Self and Personality — 60-Second Flash Card",
      bulletPoints: [
        "Self-Efficacy: Bandura's concept of belief in one's capability to succeed.",
        "Sheldon Somatotypes: Endomorph (round, relaxed), Mesomorph (muscular, bold), Ectomorph (thin, sensitive).",
        "Friedman-Rosenman: Type A (competitive, impatient -> heart disease) vs Type B (relaxed). Type C (cancer prone).",
        "Allport: Cardinal (defining), Central (5-10 building blocks), Secondary (minor preferences).",
        "Cattell: 16PF inventory; Surface traits vs Source traits (primary factors).",
        "Big Five (OCEAN): Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism (Costa & McCrae).",
        "Freud: Id (Pleasure, unconscious), Ego (Reality, conscious), Superego (Moral, guilt).",
        "Phallic Stage (3-6 yrs): Oedipus complex (boys) & Electra complex (girls).",
        "Projective Tests: Rorschach (10 cards), TAT (Morgan & Murray, 31 cards), Rosenzweig P-F study (cartoons).",
      ],
      examTricks: [
        "Reaction formation = Behaving in the exact opposite manner.",
        "Type A personality = Coronary Heart Disease (CHD).",
      ],
    },
    practiceQuestions: [
      {
        id: "psychology_u2_q1",
        question: "Who among the following developed the Sixteen Personality Factor Questionnaire (16PF)?",
        type: "standard",
        options: [
          { id: "A", text: "Gordon Allport" },
          { id: "B", text: "Raymond B. Cattell" },
          { id: "C", text: "Hans Eysenck" },
          { id: "D", text: "Carl Jung" },
        ],
        correctOption: "B",
        explanation: "Raymond Cattell used factor analysis to identify 16 source traits, creating the 16PF inventory.",
        difficulty: "easy",
      },
      {
        id: "psychology_u2_q2",
        question: "According to Sigmund Freud, the Oedipus Complex occurs during which psychosexual stage of development?",
        type: "standard",
        options: [
          { id: "A", text: "Oral Stage" },
          { id: "B", text: "Anal Stage" },
          { id: "C", text: "Phallic Stage" },
          { id: "D", text: "Latency Stage" },
        ],
        correctOption: "C",
        explanation: "The Oedipus complex (and Electra complex in girls) occurs during the Phallic stage (ages 3 to 6).",
        difficulty: "easy",
      },
      {
        id: "psychology_u2_q3",
        question:
          "Assertion (A): Type A personality individuals possess a heightened vulnerability to coronary heart disease.\n" +
          "Reason (R): Type A individuals are characterised by high competitiveness, impatience, chronic sense of time urgency, and hostility.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Friedman and Rosenman demonstrated that the chronic stress and hostility of Type A behavior directly strains the cardiovascular system.",
        difficulty: "easy",
      },
      {
        id: "psychology_u2_q4",
        question: "Which of the following defence mechanisms involves attributing one's own unacceptable impulses or traits onto other people?",
        type: "standard",
        options: [
          { id: "A", text: "Reaction Formation" },
          { id: "B", text: "Projection" },
          { id: "C", text: "Sublimation" },
          { id: "D", text: "Repression" },
        ],
        correctOption: "B",
        explanation: "In Projection, people defend against their own unconscious impulses by seeing those negative traits in others.",
        difficulty: "easy",
      },
      {
        id: "psychology_u2_q5",
        question:
          "Match List-I (Personality Theorist) with List-II (Core Concept / Test):\n" +
          "List-I:\n" +
          "p. Hermann Rorschach\n" +
          "q. Morgan and Murray\n" +
          "r. Albert Bandura\n" +
          "s. Paul Costa & Robert McCrae\n" +
          "List-II:\n" +
          "1. Self-Efficacy\n" +
          "2. Thematic Apperception Test (TAT)\n" +
          "3. 10 Inkblot Cards\n" +
          "4. Big Five Model (OCEAN)\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-3, q-2, r-1, s-4" },
          { id: "B", text: "p-2, q-3, r-1, s-4" },
          { id: "C", text: "p-3, q-1, r-2, s-4" },
          { id: "D", text: "p-4, q-2, r-1, s-3" },
        ],
        correctOption: "A",
        explanation: "Rorschach (p-3: Inkblots), Morgan & Murray (q-2: TAT), Bandura (r-1: Self-Efficacy), Costa & McCrae (s-4: Big Five).",
        difficulty: "easy",
      },
      {
        id: "psychology_u2_q6",
        question: "In the Big Five Personality Model, an individual who is highly organised, punctual, reliable, and goal-directed scores high on:",
        type: "standard",
        options: [
          { id: "A", text: "Openness to Experience" },
          { id: "B", text: "Conscientiousness" },
          { id: "C", text: "Agreeableness" },
          { id: "D", text: "Extraversion" },
        ],
        correctOption: "B",
        explanation: "Conscientiousness reflects self-discipline, organization, dependability, and goal-directed persistence.",
        difficulty: "easy",
      },
      {
        id: "psychology_u2_q7",
        question: "According to Gordon Allport, traits that are so pervasive that an individual's entire life revolves around them are called:",
        type: "standard",
        options: [
          { id: "A", text: "Central traits" },
          { id: "B", text: "Secondary traits" },
          { id: "C", text: "Cardinal traits" },
          { id: "D", text: "Source traits" },
        ],
        correctOption: "C",
        explanation: "Cardinal traits are rare, defining traits that dominate and shape a person's entire identity (e.g., Gandhian non-violence).",
        difficulty: "easy",
      },
      {
        id: "psychology_u2_q8",
        question:
          "Assertion (A): Carl Rogers proposed that when there is a significant discrepancy between the real self and the ideal self, a person experiences maladjustment.\n" +
          "Reason (R): High congruence between real and ideal self fosters self-actualisation and psychological well-being.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "In Rogers' person-centred theory, congruence between self-concept and real experience leads to the fully functioning state, whereas incongruence causes anxiety and neurosis.",
        difficulty: "medium",
      },
      {
        id: "psychology_u2_q9",
        question: "How many total cards are used in the administration of the Thematic Apperception Test (TAT)?",
        type: "standard",
        options: [
          { id: "A", text: "10 cards" },
          { id: "B", text: "16 cards" },
          { id: "C", text: "31 cards (30 pictures + 1 blank)" },
          { id: "D", text: "50 cards" },
        ],
        correctOption: "C",
        explanation: "The complete TAT set consists of 30 picture cards depicting ambiguous human situations and 1 blank card (total 31).",
        difficulty: "medium",
      },
      {
        id: "psychology_u2_q10",
        question: "Which post-Freudian psychologist developed the concept of the 'Collective Unconscious' containing universal 'Archetypes'?",
        type: "standard",
        options: [
          { id: "A", text: "Alfred Adler" },
          { id: "B", text: "Karen Horney" },
          { id: "C", text: "Carl Jung" },
          { id: "D", text: "Erik Erikson" },
        ],
        correctOption: "C",
        explanation: "Carl Jung founded Analytical Psychology and introduced the Collective Unconscious populated by ancient evolutionary Archetypes.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Variations in Psychological Attributes"],
      relatedTopics: ["Meeting Life Challenges", "Psychological Disorders"],
      practiceTestId: "practice-psychology-unit2-test1",
      practiceTestUrl: "/test/practice-psychology-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=psychology",
      weaknessRadarUrl: "/dashboard/radar?subject=psychology",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 3: Meeting Life Challenges
  // -------------------------------------------------------------------------
  {
    id: "psychology_u3_t1",
    slug: "nature-of-stress-sources-stress-management-techniques-coping-strategies",
    subject: "psychology",
    subjectName: "Psychology",
    subjectCode: "324",
    unitNumber: 3,
    unitTitle: "Meeting Life Challenges",
    topicTitle: "Nature of Stress, Sources, Stress Management Techniques, Coping Strategies",
    ncertReference: {
      class: "12",
      book: "Psychology",
      chapterNumber: 3,
      chapterName: "Meeting Life Challenges",
      sections: [
        "Nature and Definition of Stress: Hans Selye, Eustress vs Distress",
        "Cognitive Appraisal of Stress: Richard Lazarus (Primary and Secondary Appraisal)",
        "Types of Stress: Physical, Environmental, Psychological, Social",
        "General Adaptation Syndrome (GAS): Alarm, Resistance, Exhaustion",
        "Stress and Immune Function (Psychoneuroimmunology)",
        "Coping Strategies (Endler & Parker, Lazarus & Folkman) and Stress Management",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Very high yield (18+ questions across sets)",
      totalPyqsInRepo: 36,
      weightagePercentage: 9.0,
    },
    summary30Seconds: [
      "Hans Selye defined stress as the 'non-specific response of the body to any demand'. Eustress is healthy, motivating stress; Distress is negative, damaging stress.",
      "Richard Lazarus Cognitive Appraisal: Primary Appraisal evaluates if an event is positive, neutral, or negative (Harm, Threat, Challenge); Secondary Appraisal evaluates available coping resources.",
      "General Adaptation Syndrome (GAS): Alarm Reaction (adrenal activation, fight/flight), Resistance (coping adaptations), Exhaustion (immune collapse, burnout).",
      "Coping Strategies: Endler & Parker (Task-oriented, Emotion-oriented, Avoidance-oriented); Lazarus & Folkman (Problem-focused vs Emotion-focused).",
      "Kobasa's Hardiness (3 Cs): Commitment, Control, Challenge (protects against stress illness).",
    ],
    coreConcepts: [
      {
        title: "1. Nature of Stress & Lazarus's Cognitive Appraisal Model",
        content:
          "Stress originated from Latin word *strictus* meaning tight or narrow:\n\n" +
          "• **Hans Selye's Formulation**:\n" +
          "  - 'Stress is the non-specific response of the body to any demand made upon it.'\n" +
          "  - **Eustress**: Positive, optimum level of stress that motivates, enhances performance, and helps overcome life challenges.\n" +
          "  - **Distress**: Negative stress that exhausts energy, impairs performance, and causes psychosomatic illness.\n\n" +
          "• **Richard Lazarus's Cognitive Appraisal Theory**:\n" +
          "  - An event becomes stressful only when perceived as such by the individual.\n" +
          "  - **Primary Appraisal**: Perceiving a new event as positive, neutral, or negative. Negative events are appraised for:\n" +
          "    1. *Harm*: Damage already incurred (e.g., job loss, injury).\n" +
          "    2. *Threat*: Anticipation of future harm.\n" +
          "    3. *Challenge*: Expectation of growth, mastery, and confident coping.\n" +
          "  - **Secondary Appraisal**: Assessment of one's coping resources and whether they are sufficient to meet the threat (mental, social, financial resources).",
        ncertPointers: [
          "Primary appraisal evaluates the event (harm/threat/challenge); Secondary appraisal evaluates coping resources.",
          "Hans Selye coined Eustress vs Distress and defined stress as a 'non-specific response'.",
        ],
      },
      {
        title: "2. Types and Sources of Stress",
        content:
          "Stressors are events that cause our body to give the stress response:\n\n" +
          "• **1. Physical and Environmental Stress**:\n" +
          "  - Physical: Overexertion, malnutrition, injury, lack of sleep.\n" +
          "  - Environmental: Air/noise pollution, crowding, intense heat/cold, natural disasters (earthquakes, floods).\n\n" +
          "• **2. Psychological Stress**:\n" +
          "  - Unique to human beings; generated internally:\n" +
          "    * *Frustration*: Blocking of needs and motives by an obstacle.\n" +
          "    * *Conflicts*: Incompatibility between two or more motives (approach-approach, avoidance-avoidance, approach-avoidance).\n" +
          "    * *Internal Pressures*: Unrealistic high self-expectations ('I must score 100% in everything').\n" +
          "    * *Social Pressures*: Excessive demands made by parents, peers, and society.\n\n" +
          "• **3. Social Stress**:\n" +
          "  - Interpersonal friction, bereavement, divorce, neighbourhood disputes, social isolation.",
        ncertPointers: [
          "Differentiate: Frustration = blocked motive; Conflict = choosing between opposing motives.",
        ],
      },
      {
        title: "3. General Adaptation Syndrome (GAS) & Psychoneuroimmunology",
        content:
          "Hans Selye observed a uniform physiological response pattern to prolonged stress:\n\n" +
          "• **Stage 1: Alarm Reaction**:\n" +
          "  - Hypothalamus triggers the sympathetic nervous system and the **HPA axis (Hypothalamic-Pituitary-Adrenal axis)**.\n" +
          "  - Release of adrenaline, noradrenaline, and cortisol. Heart rate, blood pressure, and respiration skyrocket; 'Fight-or-Flight' response.\n\n" +
          "• **Stage 2: Resistance**:\n" +
          "  - If stressor persists, body enters resistance. Parasympathetic system attempts to conserve energy, but hormone levels remain elevated.\n" +
          "  - Individual mobilises coping mechanisms to adapt.\n\n" +
          "• **Stage 3: Exhaustion**:\n" +
          "  - Prolonged, unrelenting exposure depletes the body's physiological resources.\n" +
          "  - Adrenal exhaustion, immune suppression, burnout, and onset of stress-related illnesses (hypertension, ulcers, heart attacks).\n\n" +
          "• **Psychoneuroimmunology**:\n" +
          "  - Science linking psychological states, nervous system, and immune function.\n" +
          "  - Chronic stress increases **cortisol**, which suppresses **white blood cells (Leukocytes: T cells, B cells, Natural Killer cells)**, impairing antibody production.",
        ncertPointers: [
          "GAS order: Alarm -> Resistance -> Exhaustion (A-R-E).",
          "Cortisol suppresses natural killer (NK) cells and T-lymphocytes.",
        ],
      },
      {
        title: "4. Coping Strategies, Hardiness & Stress Management Techniques",
        content:
          "• **Coping Frameworks**:\n" +
          "  - **Endler and Parker**:\n" +
          "    1. *Task-oriented*: Obtaining information, direct action to alter situation.\n" +
          "    2. *Emotion-oriented*: Regulating internal emotional state (crying, blaming oneself).\n" +
          "    3. *Avoidance-oriented*: Denying the problem, watching TV, sleeping, escaping.\n" +
          "  - **Lazarus and Folkman**:\n" +
          "    1. *Problem-Focused Coping*: Attacking the problem directly (time management, studying).\n" +
          "    2. *Emotion-Focused Coping*: Managing psychological distress (meditation, seeking emotional support).\n\n" +
          "• **Suzanne Kobasa's Psychological Hardiness (The 3 Cs)**:\n" +
          "  - Personality traits that buffer against stress illness:\n" +
          "    1. **Commitment**: Strong dedication to personal goals, work, and relationships.\n" +
          "    2. **Control**: Belief that one has the power to influence life events (internal locus of control).\n" +
          "    3. **Challenge**: Viewing change and problems as opportunities for growth rather than threats.\n\n" +
          "• **Stress Management Techniques**:\n" +
          "  - *Relaxation Techniques* (Deep breathing, progressive muscle relaxation).\n" +
          "  - *Biofeedback* (Training to consciously regulate involuntary autonomic bodily functions like heart rate).\n" +
          "  - *Creative Visualisation* (Visualising tranquil scenes or successful problem resolution).\n" +
          "  - *Cognitive Behavioural Techniques* (**Stress Inoculation Training** by Donald Meichenbaum: replacing irrational negative self-talk with coping statements).",
        ncertPointers: [
          "Kobasa's Hardiness 3 Cs: Commitment, Control, Challenge.",
          "Stress Inoculation Training = Donald Meichenbaum.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "General Adaptation Syndrome (GAS) Stages",
        formula: "Alarm Reaction -> Resistance -> Exhaustion",
        symbols: "A-R-E (Hans Selye)",
        siUnits: "Physiological adaptation curve",
        applicationCondition: "Chronological sequence and stage characteristics questions",
        notes: "Exhaustion stage leads to burnout, immune suppression, and psychosomatic illness.",
      },
      {
        name: "Coping Taxonomies Comparison",
        formula: "Endler & Parker (Task, Emotion, Avoidance) vs Lazarus & Folkman (Problem-focused, Emotion-focused)",
        symbols: "Coping behavioural matrices",
        siUnits: "Psychological adaptation taxonomies",
        applicationCondition: "Distinguishing between coping theories in CUET",
        notes: "Task-oriented is equivalent to problem-focused coping.",
      },
      {
        name: "Kobasa's Hardiness Triad",
        formula: "Commitment + Control + Challenge",
        symbols: "The 3 Cs of Resilience",
        siUnits: "Stress-buffering personality constructs",
        applicationCondition: "Direct multiple choice on resilient personality",
        notes: "People high in hardiness exhibit low rates of stress-induced illnesses.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Hans Selye's General Adaptation Syndrome (GAS)",
      caption: "Resistance to stress across Alarm Reaction, Resistance, and Exhaustion stages.",
      code: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <line x1="50" y1="200" x2="660" y2="200" stroke="#334155" stroke-width="2"/>
        <line x1="50" y1="30" x2="50" y2="200" stroke="#334155" stroke-width="2"/>
        <text x="25" y="115" transform="rotate(-90 25,115)" font-size="11" fill="#475569" font-weight="bold">Resistance Level</text>
        
        <!-- Normal baseline -->
        <line x1="50" y1="140" x2="660" y2="140" stroke="#94a3b8" stroke-dasharray="4"/>
        <text x="600" y="132" fill="#64748b" font-size="10">Normal Level of Resistance</text>

        <!-- Division Lines -->
        <line x1="220" y1="30" x2="220" y2="200" stroke="#cbd5e1" stroke-dasharray="3"/>
        <line x1="440" y1="30" x2="440" y2="200" stroke="#cbd5e1" stroke-dasharray="3"/>

        <!-- Curve -->
        <path d="M 50,140 Q 120,185 160,175 Q 220,90 330,70 Q 440,75 510,130 Q 580,210 650,225" fill="none" stroke="#dc2626" stroke-width="3"/>

        <!-- Labels -->
        <text x="135" y="55" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="12">1. Alarm Reaction</text>
        <text x="135" y="75" text-anchor="middle" fill="#7f1d1d" font-size="10">Fight or Flight</text>

        <text x="330" y="45" text-anchor="middle" font-weight="bold" fill="#047857" font-size="12">2. Resistance</text>
        <text x="330" y="62" text-anchor="middle" fill="#065f46" font-size="10">Coping Adaptations</text>

        <text x="540" y="55" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="12">3. Exhaustion</text>
        <text x="540" y="75" text-anchor="middle" fill="#991b1b" font-size="10">Immune Breakdown</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <line x1="50" y1="200" x2="660" y2="200" stroke="#334155" stroke-width="2"/>
      <line x1="50" y1="30" x2="50" y2="200" stroke="#334155" stroke-width="2"/>
      <text x="25" y="115" transform="rotate(-90 25,115)" font-size="11" fill="#475569" font-weight="bold">Resistance Level</text>
      
      <!-- Normal baseline -->
      <line x1="50" y1="140" x2="660" y2="140" stroke="#94a3b8" stroke-dasharray="4"/>
      <text x="600" y="132" fill="#64748b" font-size="10">Normal Level of Resistance</text>

      <!-- Division Lines -->
      <line x1="220" y1="30" x2="220" y2="200" stroke="#cbd5e1" stroke-dasharray="3"/>
      <line x1="440" y1="30" x2="440" y2="200" stroke="#cbd5e1" stroke-dasharray="3"/>

      <!-- Curve -->
      <path d="M 50,140 Q 120,185 160,175 Q 220,90 330,70 Q 440,75 510,130 Q 580,210 650,225" fill="none" stroke="#dc2626" stroke-width="3"/>

      <!-- Labels -->
      <text x="135" y="55" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="12">1. Alarm Reaction</text>
      <text x="135" y="75" text-anchor="middle" fill="#7f1d1d" font-size="10">Fight or Flight</text>

      <text x="330" y="45" text-anchor="middle" font-weight="bold" fill="#047857" font-size="12">2. Resistance</text>
      <text x="330" y="62" text-anchor="middle" fill="#065f46" font-size="10">Coping Adaptations</text>

      <text x="540" y="55" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="12">3. Exhaustion</text>
      <text x="540" y="75" text-anchor="middle" fill="#991b1b" font-size="10">Immune Breakdown</text>
    </svg>`,
    workedExamples: [
      {
        id: "psychology_u3_we1",
        questionNumber: 1,
        question:
          "According to Richard Lazarus, an assessment of one's coping resources and abilities to meet a potential stressor is known as:\n" +
          "(A) Primary appraisal\n" +
          "(B) Secondary appraisal\n" +
          "(C) Tertiary appraisal\n" +
          "(D) Stress inoculation",
        options: [
          { id: "A", text: "Primary appraisal" },
          { id: "B", text: "Secondary appraisal" },
          { id: "C", text: "Tertiary appraisal" },
          { id: "D", text: "Stress inoculation" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: In Lazarus's model, Primary Appraisal evaluates the situation itself (is it positive, neutral, harm, threat, or challenge?).",
          "Step 2: Secondary Appraisal specifically evaluates available coping resources (skills, money, social support) to tackle the situation.",
          "Step 3: Correct answer is Secondary appraisal (Option B).",
        ],
        cuetTip: "Primary = Evaluates situation; Secondary = Evaluates coping resources.",
      },
      {
        id: "psychology_u3_we2",
        questionNumber: 2,
        question:
          "Which of the following is NOT one of the '3 Cs' of Psychological Hardiness identified by Suzanne Kobasa?\n" +
          "(A) Commitment\n" +
          "(B) Control\n" +
          "(C) Challenge\n" +
          "(D) Compensation",
        options: [
          { id: "A", text: "Commitment" },
          { id: "B", text: "Control" },
          { id: "C", text: "Challenge" },
          { id: "D", text: "Compensation" },
        ],
        correctOption: "D",
        solutionStepByStep: [
          "Step 1: Kobasa studied stress-resistant executives and formulated the 'Hardiness' personality construct.",
          "Step 2: The three components are Commitment, Control, and Challenge (the 3 Cs).",
          "Step 3: Compensation is not part of Kobasa's triad.",
        ],
        cuetTip: "Hardiness = Commitment, Control, Challenge.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Chronological Sequence of GAS Stages",
        frequency: "Very High",
        typicalStem: "Identify the correct chronological sequence of stages in Hans Selye's General Adaptation Syndrome (GAS).",
        strategy: "The sequence is always: Alarm Reaction -> Resistance -> Exhaustion.",
      },
      {
        patternType: "Coping Strategy Classification",
        frequency: "High",
        typicalStem: "A student scheduled for an examination sets up a study timetable and practices mock papers. Which coping strategy is this?",
        strategy: "Directly addressing the root cause of stress through action = Task-oriented (Endler & Parker) or Problem-focused (Lazarus).",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing all stress is harmful and should be eliminated.",
        whyWrong: "Eustress is healthy, adaptive, and necessary to provide the optimum arousal needed for peak performance. Only distress is detrimental.",
        correctUnderstanding: "Eustress = Positive/healthy; Distress = Negative/damaging.",
        trapOptionExample: "Option stating all forms of stress lead to psychological breakdown.",
      },
      {
        misconception: "Confusing Primary and Secondary Appraisal.",
        whyWrong: "Students often think Primary appraisal means evaluating personal skills. Primary appraisal strictly evaluates the external event; Secondary appraisal evaluates internal coping resources.",
        correctUnderstanding: "Primary = Event evaluation; Secondary = Coping resources evaluation.",
        trapOptionExample: "Stating Secondary appraisal determines whether an event is a harm or threat.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "GAS Sequence Mnemonic",
        mnemonic: "A-R-E (Always Respond Efficiently)",
        rule: "Alarm Reaction -> Resistance -> Exhaustion",
        explanation: "Never reverse the order of Hans Selye's 3 GAS stages.",
      },
      {
        title: "Hardiness 3 Cs",
        mnemonic: "C-C-C",
        rule: "Commitment, Control, Challenge",
        explanation: "Instantly identify Kobasa's hardiness components.",
      },
    ],
    quickRevisionCard: {
      title: "Meeting Life Challenges — 60-Second Flash Card",
      bulletPoints: [
        "Hans Selye: 'Non-specific response of body to demand'; Eustress (good) vs Distress (bad).",
        "Lazarus Appraisal: Primary (Harm, Threat, Challenge) vs Secondary (Coping resources).",
        "Types of Stress: Physical/Environmental, Psychological (Frustration, Conflict, Pressure), Social.",
        "GAS (Selye): Alarm Reaction (HPA axis/cortisol) -> Resistance -> Exhaustion (burnout).",
        "Psychoneuroimmunology: Chronic stress releases cortisol which suppresses killer T-cells & B-cells.",
        "Endler & Parker: Task-oriented, Emotion-oriented, Avoidance-oriented coping.",
        "Lazarus & Folkman: Problem-focused vs Emotion-focused coping.",
        "Kobasa's Hardiness: 3 Cs — Commitment, Control, Challenge.",
        "Stress Inoculation Training: Donald Meichenbaum (Cognitive restructuring).",
      ],
      examTricks: [
        "A-R-E is the strict order of GAS.",
        "Secondary appraisal is strictly about evaluating coping resources.",
      ],
    },
    practiceQuestions: [
      {
        id: "psychology_u3_q1",
        question: "Who among the following is widely regarded as the 'father of modern stress research'?",
        type: "standard",
        options: [
          { id: "A", text: "Richard Lazarus" },
          { id: "B", text: "Hans Selye" },
          { id: "C", text: "Donald Meichenbaum" },
          { id: "D", text: "Suzanne Kobasa" },
        ],
        correctOption: "B",
        explanation: "Hans Selye is considered the father of modern stress research, having defined stress as a non-specific bodily response.",
        difficulty: "easy",
      },
      {
        id: "psychology_u3_q2",
        question: "What is the correct sequence of stages in the General Adaptation Syndrome (GAS)?",
        type: "standard",
        options: [
          { id: "A", text: "Resistance -> Alarm Reaction -> Exhaustion" },
          { id: "B", text: "Alarm Reaction -> Resistance -> Exhaustion" },
          { id: "C", text: "Exhaustion -> Resistance -> Alarm Reaction" },
          { id: "D", text: "Alarm Reaction -> Exhaustion -> Resistance" },
        ],
        correctOption: "B",
        explanation: "The three stages of GAS in exact order are Alarm Reaction, Resistance, and Exhaustion.",
        difficulty: "easy",
      },
      {
        id: "psychology_u3_q3",
        question:
          "Assertion (A): Chronic stress leads to an increased vulnerability to infectious diseases.\n" +
          "Reason (R): Sustained elevation of cortisol levels suppresses the activity of white blood cells (T cells and natural killer cells).",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Psychoneuroimmunology confirms that high circulating corticosteroids from prolonged stress directly suppress immune lymphocytes.",
        difficulty: "medium",
      },
      {
        id: "psychology_u3_q4",
        question: "Viewing a stressful life change as an opportunity for personal growth and learning rather than a threat reflects which component of Hardiness?",
        type: "standard",
        options: [
          { id: "A", text: "Commitment" },
          { id: "B", text: "Control" },
          { id: "C", text: "Challenge" },
          { id: "D", text: "Confidence" },
        ],
        correctOption: "C",
        explanation: "Challenge is the disposition to view changes and obstacles as positive opportunities for self-development.",
        difficulty: "easy",
      },
      {
        id: "psychology_u3_q5",
        question:
          "Match List-I (Coping / Stress Technique) with List-II (Proponent / Core Concept):\n" +
          "List-I:\n" +
          "p. Cognitive Appraisal\n" +
          "q. Stress Inoculation Training\n" +
          "r. Task/Emotion/Avoidance Coping\n" +
          "s. 3 Cs of Hardiness\n" +
          "List-II:\n" +
          "1. Donald Meichenbaum\n" +
          "2. Richard Lazarus\n" +
          "3. Suzanne Kobasa\n" +
          "4. Endler and Parker\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-2, q-1, r-4, s-3" },
          { id: "B", text: "p-1, q-2, r-4, s-3" },
          { id: "C", text: "p-2, q-4, r-1, s-3" },
          { id: "D", text: "p-3, q-1, r-4, s-2" },
        ],
        correctOption: "A",
        explanation: "Lazarus (p-2: Appraisal), Meichenbaum (q-1: Stress Inoculation), Endler & Parker (r-4: Coping styles), Kobasa (s-3: Hardiness).",
        difficulty: "easy",
      },
      {
        id: "psychology_u3_q6",
        question: "Which of the following describes an 'avoidance-oriented' coping strategy?",
        type: "standard",
        options: [
          { id: "A", text: "Making a schedule to complete study targets" },
          { id: "B", text: "Watching movies and overeating to forget about an upcoming exam" },
          { id: "C", text: "Engaging in emotional venting with a friend" },
          { id: "D", text: "Consulting an expert counsellor for advice" },
        ],
        correctOption: "B",
        explanation: "Avoidance coping involves escapist activities (watching TV, overeating, excessive sleeping) to deny or ignore the stressor.",
        difficulty: "easy",
      },
      {
        id: "psychology_u3_q7",
        question: "In Richard Lazarus's appraisal framework, an appraisal of 'Harm' refers to:",
        type: "standard",
        options: [
          { id: "A", text: "Anticipation of future potential injury" },
          { id: "B", text: "Damage or loss that has already occurred" },
          { id: "C", text: "Assessment of coping resources" },
          { id: "D", text: "Expecting positive mastery of the situation" },
        ],
        correctOption: "B",
        explanation: "Harm is an appraisal that damage, loss, or injury has already been experienced.",
        difficulty: "medium",
      },
      {
        id: "psychology_u3_q8",
        question: "Which gland is activated along with the pituitary gland to form the primary neuroendocrine axis of stress response?",
        type: "standard",
        options: [
          { id: "A", text: "Adrenal gland" },
          { id: "B", text: "Pancreas" },
          { id: "C", text: "Thymus" },
          { id: "D", text: "Parathyroid gland" },
        ],
        correctOption: "A",
        explanation: "The HPA axis consists of the Hypothalamus, Pituitary, and Adrenal glands, which release cortisol and adrenaline during stress.",
        difficulty: "easy",
      },
      {
        id: "psychology_u3_q9",
        question: "The stress management technique where physiological indicators (like heart rate, muscle tension) are converted into auditory or visual signals is:",
        type: "standard",
        options: [
          { id: "A", text: "Biofeedback" },
          { id: "B", text: "Creative Visualisation" },
          { id: "C", text: "Cognitive Restructuring" },
          { id: "D", text: "Assertiveness Training" },
        ],
        correctOption: "A",
        explanation: "Biofeedback provides immediate sensory monitoring of autonomic bodily processes to facilitate voluntary conscious control.",
        difficulty: "easy",
      },
      {
        id: "psychology_u3_q10",
        question: "The term 'Eustress' is best described as:",
        type: "standard",
        options: [
          { id: "A", text: "Severe psychological burnout causing depression" },
          { id: "B", text: "Good, motivating stress that enhances performance" },
          { id: "C", text: "Chronic stress lasting more than six months" },
          { id: "D", text: "A somatic disorder with physical paralysis" },
        ],
        correctOption: "B",
        explanation: "Eustress is the positive, adaptive level of stress that energises action and facilitates achievement.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Self and Personality"],
      relatedTopics: ["Psychological Disorders", "Therapeutic Approaches"],
      practiceTestId: "practice-psychology-unit3-test1",
      practiceTestUrl: "/test/practice-psychology-unit3-test1",
      weaknessReportUrl: "/dashboard/radar?subject=psychology",
      weaknessRadarUrl: "/dashboard/radar?subject=psychology",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 4: Psychological Disorders
  // -------------------------------------------------------------------------
  {
    id: "psychology_u4_t1",
    slug: "anxiety-disorders-somatoform-dissociative-mood-disorders-schizophrenia",
    subject: "psychology",
    subjectName: "Psychology",
    subjectCode: "324",
    unitNumber: 4,
    unitTitle: "Psychological Disorders",
    topicTitle: "Anxiety Disorders, Somatoform, Dissociative, Mood Disorders, Schizophrenia",
    ncertReference: {
      class: "12",
      book: "Psychology",
      chapterNumber: 4,
      chapterName: "Psychological Disorders",
      sections: [
        "Historical Views and the 4 Ds of Abnormality (Deviance, Distress, Dysfunction, Danger)",
        "Classification: DSM-5 and ICD-11",
        "Anxiety Disorders: GAD, Panic Disorder, Phobias, OCD, PTSD",
        "Somatic Symptom and Dissociative Disorders (Amnesia, Fugue, DID)",
        "Mood Disorders: Major Depressive Disorder, Bipolar Disorders, Suicide",
        "Schizophrenia: Positive vs Negative Symptoms",
        "Neurodevelopmental, Feeding, and Substance-Related Disorders",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (26+ questions across sets)",
      totalPyqsInRepo: 52,
      weightagePercentage: 13.0,
    },
    summary30Seconds: [
      "The 4 Ds of Abnormality: Deviance (violates social norms), Distress (unpleasant/upsetting), Dysfunction (interferes with daily life), Danger (harm to self or others).",
      "Anxiety Disorders: GAD (free-floating anxiety), Panic Disorder (sudden terror spikes), Phobias (irrational fears; Agoraphobia = fear of entering unfamiliar situations), OCD (Obsessions = intrusive thoughts; Compulsions = repetitive acts), PTSD.",
      "Somatic Symptom & Dissociative: Conversion Disorder (loss of motor/sensory function without physiological basis); Dissociative Fugue (flight to a new place with new identity).",
      "Mood Disorders: Major Depression (anhedonia, guilt) vs Bipolar Disorder (alternating mania and depression).",
      "Schizophrenia: Positive symptoms (Delusions of persecutory/reference/grandeur, Hallucinations - auditory most common, formal thought disorder) vs Negative symptoms (Avolition, Alogia, Anhedonia, Flat affect).",
    ],
    coreConcepts: [
      {
        title: "1. The 4 Ds of Abnormality & Diagnostic Systems",
        content:
          "Abnormal behavior is characterised by the **4 Ds**:\n" +
          "• **Deviance**: Behavior that is different, extreme, unusual, and violates societal norms.\n" +
          "• **Distress**: Unpleasant, distressing, and upsetting to the individual or those around them.\n" +
          "• **Dysfunction**: Interferes with the individual's ability to carry out everyday activities (occupational, social, academic).\n" +
          "• **Danger**: Behavior that poses an imminent risk of harm to oneself (suicide) or to others.\n\n" +
          "• **Major Classification Systems**:\n" +
          "  - **DSM-5**: Diagnostic and Statistical Manual of Mental Disorders (published by the American Psychiatric Association - APA).\n" +
          "  - **ICD-11**: International Classification of Diseases (published by the World Health Organisation - WHO).",
        ncertPointers: [
          "The 4 Ds: Deviance, Distress, Dysfunction, Danger.",
          "DSM-5 is by APA; ICD-11 is by WHO.",
        ],
      },
      {
        title: "2. Anxiety Disorders, Somatic Symptom & Dissociative Disorders",
        content:
          "• **Anxiety Disorders**:\n" +
          "  - **Generalised Anxiety Disorder (GAD)**: Chronic, persistent, unrealistic worry and apprehension not tied to any specific object (**'Free-Floating Anxiety'**); muscle tension, motor restlessness.\n" +
          "  - **Panic Disorder**: Recurrent, unexpected panic attacks; intense terror, racing heart, dizziness, hyperventilation, feeling of impending doom.\n" +
          "  - **Phobias**: Irrational fears out of proportion to actual danger: Specific Phobias (insects, heights), Social Anxiety Disorder, **Agoraphobia** (fear of entering unfamiliar places, open spaces, or crowded areas from which escape is difficult).\n" +
          "  - **Obsessive-Compulsive Disorder (OCD)**: **Obsessions** (persistent, intrusive, recurrent distressing ideas/thoughts, e.g., contamination) accompanied by **Compulsions** (repetitive, ritualistic motor behaviors performed to neutralize anxiety, e.g., handwashing 50 times).\n" +
          "  - **Post-Traumatic Stress Disorder (PTSD)**: Flashbacks, nightmares, hyper-vigilance following catastrophic trauma (war, rape, tsunami).\n\n" +
          "• **Somatic Symptom and Related Disorders**:\n" +
          "  - **Somatic Symptom Disorder**: Preoccupation with persistent physical symptoms without medical explanation.\n" +
          "  - **Illness Anxiety Disorder (Hypochondriasis)**: Persistent fear of having or acquiring a serious illness despite medical reassurances.\n" +
          "  - **Conversion Disorder**: Sudden loss of voluntary motor or sensory function (e.g., blindness, paralysis, loss of voice) without any neurological or medical cause; often accompanied by **'la belle indifférence'** (calm lack of concern).\n\n" +
          "• **Dissociative Disorders** (Disruption in memory, identity, and consciousness):\n" +
          "  - **Dissociative Amnesia**: Inability to recall important personal information, usually of traumatic nature, beyond normal forgetfulness.\n" +
          "  - **Dissociative Fugue**: Sudden unexpected travel away from home with assumption of a new identity and complete amnesia for previous life.\n" +
          "  - **Dissociative Identity Disorder (DID)**: Formerly multiple personality disorder; presence of two or more distinct personality states within one individual.",
        ncertPointers: [
          "Obsessions = Thoughts; Compulsions = Actions/behaviors.",
          "Conversion disorder = Physical sensory/motor loss without neurological cause.",
          "Dissociative fugue = Sudden unexpected travel + new identity.",
        ],
      },
      {
        title: "3. Mood Disorders & Suicide Dynamics",
        content:
          "Disturbances in emotional state or affect:\n\n" +
          "• **Major Depressive Disorder (MDD)**:\n" +
          "  - Depressed mood, loss of interest/pleasure in all activities (**anhedonia**).\n" +
          "  - Sleep disturbances (insomnia/hypersomnia), appetite loss/gain, fatigue, feelings of worthlessness/guilt, psychomotor agitation/retardation, recurrent suicidal ideation.\n\n" +
          "• **Bipolar Disorders (Manic-Depression)**:\n" +
          "  - Alternating periods of depression and mania.\n" +
          "  - **Mania**: Grandiose self-esteem, decreased need for sleep, pressured rapid speech, flight of ideas, extreme hyperactivity, reckless financial or sexual adventures.\n\n" +
          "• **Suicide Factors & Myths**:\n" +
          "  - Risk factors: Prior attempts, depressive illness, social isolation, substance abuse, impulsive crisis.\n" +
          "  - *Myth*: Talking about suicide gives someone the idea. *Fact*: Open, empathetic conversation reduces distress and provides life-saving intervention.",
        ncertPointers: [
          "Anhedonia is the hallmark loss of interest in pleasurable activities in major depression.",
          "Mania is characterized by grandiosity and flight of ideas.",
        ],
      },
      {
        title: "4. Schizophrenia Spectrum: Positive vs Negative Symptoms",
        content:
          "Schizophrenia involves severe distortions in thinking, perception, emotion, and behaviour:\n\n" +
          "• **Positive Symptoms (Pathological Excesses / Additions)**:\n" +
          "  - **Delusions** (False, fixed beliefs firmly held despite contrary evidence):\n" +
          "    1. *Delusion of Persecution*: Belief that one is being plotted against, spied on, poisoned, or slandered.\n" +
          "    2. *Delusion of Reference*: Belief that neutral everyday events, news broadcasts, or billboard signs are directed specifically at them.\n" +
          "    3. *Delusion of Grandeur*: Belief that one is a supernatural deity, king, or possesses extraordinary superpowers.\n" +
          "    4. *Delusion of Control*: Belief that one's thoughts, feelings, or actions are controlled by external agents (satellites, demons).\n" +
          "  - **Hallucinations** (Perceptions in the absence of external sensory stimuli):\n" +
          "    * **Auditory Hallucinations** are the most common (hearing voices talking to or about the patient).\n" +
          "    * Visual, tactile, olfactory, and gustatory hallucinations.\n" +
          "  - **Formal Thought Disorders**: Incoherent thought structure; *loose associations* (derailment), *neologisms* (inventing made-up words), *perseveration* (persistent repetition of words).\n\n" +
          "• **Negative Symptoms (Pathological Deficits / Losses)**:\n" +
          "  - **Avolition / Apathy**: Inability to initiate or persist in goal-directed activities.\n" +
          "  - **Alogia (Poverty of Speech)**: Reduction in speech content or fluency.\n" +
          "  - **Anhedonia**: Inability to experience pleasure.\n" +
          "  - **Flat Affect / Blunted Affect**: Complete absence or showing almost no emotional expression (monotone voice, immobile face).\n\n" +
          "• **Catatonic Symptoms**:\n" +
          "  - *Catatonic Stupor*: Motionless, silent rigidity for hours.\n" +
          "  - *Catatonic Rigidity*: Rigid upright posture resisting all efforts to move.\n" +
          "  - *Catatonic Posturing*: Assuming bizarre awkward positions for long periods.",
        ncertPointers: [
          "Delusion of reference vs persecution: Reference = events refer to them; Persecution = being attacked/plotted against.",
          "Auditory hallucinations are the most frequent type of hallucination in schizophrenia.",
          "Negative symptoms: 4 As — Avolition, Alogia, Anhedonia, Affective flattening.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Positive vs Negative Symptoms of Schizophrenia",
        formula: "Positive (Excess: Delusions, Hallucinations, Derailment) vs Negative (Deficit: Avolition, Alogia, Anhedonia, Flat Affect)",
        symbols: "Schizophrenia Symptomatology Matrix",
        siUnits: "Clinical psychopathology",
        applicationCondition: "Sorting symptoms into positive or negative categories in CUET",
        notes: "Positive symptoms respond better to anti-psychotic medications than negative symptoms.",
      },
      {
        name: "Delusion Typology Matrix",
        formula: "Persecution (Harmed) | Reference (Personalised messages) | Grandeur (Superpower) | Control (Puppet of external force)",
        symbols: "Fixed false beliefs",
        siUnits: "Delusional frameworks",
        applicationCondition: "Vignette-based delusion identification",
        notes: "Delusion of reference is famously tested in CUET using news anchor/radio examples.",
      },
      {
        name: "Anxiety vs Somatoform vs Dissociative",
        formula: "Anxiety (Autonomic hyperarousal) vs Somatoform (Physical symptoms without organic cause) vs Dissociative (Identity/memory split)",
        symbols: "Diagnostic category boundaries",
        siUnits: "Clinical categorization",
        applicationCondition: "Differential diagnosis MCQs",
        notes: "Conversion disorder features pseudoneurological symptoms (e.g. hysterical blindness).",
      },
    ],
    diagram: {
      type: "svg",
      title: "Symptoms of Schizophrenia: Positive vs Negative",
      caption: "Bifurcation between pathological excesses (Positive) and pathological deficits (Negative).",
      code: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <!-- Positive Symptoms -->
        <rect x="25" y="30" width="310" height="175" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
        <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="14">Positive Symptoms (Excesses)</text>
        <text x="45" y="80" fill="#7f1d1d" font-size="11">• Delusions: Persecution, Reference, Grandeur, Control</text>
        <text x="45" y="105" fill="#7f1d1d" font-size="11">• Hallucinations: Auditory (most common), Visual</text>
        <text x="45" y="130" fill="#7f1d1d" font-size="11">• Disorganised Speech: Loose associations, Neologisms</text>
        <text x="45" y="155" fill="#7f1d1d" font-size="11">• Catatonic Excitement &amp; Inappropriate Affect</text>
        <rect x="45" y="170" width="270" height="20" fill="#fee2e2" rx="3"/>
        <text x="180" y="184" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="10">Responds better to dopamine antagonists</text>

        <!-- Negative Symptoms -->
        <rect x="365" y="30" width="310" height="175" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
        <text x="520" y="55" text-anchor="middle" font-weight="bold" fill="#166534" font-size="14">Negative Symptoms (Deficits)</text>
        <text x="385" y="80" fill="#14532d" font-size="11">• Avolition: Inability to initiate/persist in tasks</text>
        <text x="385" y="105" fill="#14532d" font-size="11">• Alogia: Poverty of speech output</text>
        <text x="385" y="130" fill="#14532d" font-size="11">• Anhedonia: Loss of capacity for pleasure</text>
        <text x="385" y="155" fill="#14532d" font-size="11">• Flat / Blunted Affect: Immobile expressionless face</text>
        <rect x="385" y="170" width="270" height="20" fill="#dcfce7" rx="3"/>
        <text x="520" y="184" text-anchor="middle" font-weight="bold" fill="#15803d" font-size="10">Associated with structural cerebral deficits</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <!-- Positive Symptoms -->
      <rect x="25" y="30" width="310" height="175" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
      <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="14">Positive Symptoms (Excesses)</text>
      <text x="45" y="80" fill="#7f1d1d" font-size="11">• Delusions: Persecution, Reference, Grandeur, Control</text>
      <text x="45" y="105" fill="#7f1d1d" font-size="11">• Hallucinations: Auditory (most common), Visual</text>
      <text x="45" y="130" fill="#7f1d1d" font-size="11">• Disorganised Speech: Loose associations, Neologisms</text>
      <text x="45" y="155" fill="#7f1d1d" font-size="11">• Catatonic Excitement &amp; Inappropriate Affect</text>
      <rect x="45" y="170" width="270" height="20" fill="#fee2e2" rx="3"/>
      <text x="180" y="184" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="10">Responds better to dopamine antagonists</text>

      <!-- Negative Symptoms -->
      <rect x="365" y="30" width="310" height="175" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
      <text x="520" y="55" text-anchor="middle" font-weight="bold" fill="#166534" font-size="14">Negative Symptoms (Deficits)</text>
      <text x="385" y="80" fill="#14532d" font-size="11">• Avolition: Inability to initiate/persist in tasks</text>
      <text x="385" y="105" fill="#14532d" font-size="11">• Alogia: Poverty of speech output</text>
      <text x="385" y="130" fill="#14532d" font-size="11">• Anhedonia: Loss of capacity for pleasure</text>
      <text x="385" y="155" fill="#14532d" font-size="11">• Flat / Blunted Affect: Immobile expressionless face</text>
      <rect x="385" y="170" width="270" height="20" fill="#dcfce7" rx="3"/>
      <text x="520" y="184" text-anchor="middle" font-weight="bold" fill="#15803d" font-size="10">Associated with structural cerebral deficits</text>
    </svg>`,
    workedExamples: [
      {
        id: "psychology_u4_we1",
        questionNumber: 1,
        question:
          "Suman firmly believes that the television news broadcaster is transmitting secret encoded instructions specifically meant to guide her personal life. Suman is exhibiting a:\n" +
          "(A) Delusion of Persecution\n" +
          "(B) Delusion of Reference\n" +
          "(C) Delusion of Grandeur\n" +
          "(D) Delusion of Control",
        options: [
          { id: "A", text: "Delusion of Persecution" },
          { id: "B", text: "Delusion of Reference" },
          { id: "C", text: "Delusion of Grandeur" },
          { id: "D", text: "Delusion of Control" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: In a Delusion of Reference, people attach special and personal meaning to neutral environmental occurrences or mass media broadcasts.",
          "Step 2: Believing a public television anchor is broadcasting encoded personal messages is the textbook example of a Delusion of Reference.",
          "Step 3: Correct answer is Option B.",
        ],
        cuetTip: "Believing neutral media broadcasts or signs have a special personal message = Delusion of Reference.",
      },
      {
        id: "psychology_u4_we2",
        questionNumber: 2,
        question:
          "A person who experiences an unexpected sudden flight away from home, assumes an entirely new identity in another town, and suffers total amnesia for their previous past is diagnosed with:\n" +
          "(A) Dissociative Amnesia\n" +
          "(B) Dissociative Identity Disorder\n" +
          "(C) Dissociative Fugue\n" +
          "(D) Conversion Disorder",
        options: [
          { id: "A", text: "Dissociative Amnesia" },
          { id: "B", text: "Dissociative Identity Disorder" },
          { id: "C", text: "Dissociative Fugue" },
          { id: "D", text: "Conversion Disorder" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Dissociative amnesia involves memory loss without unexpected relocation.",
          "Step 2: Dissociative fugue involves unexpected travel away from home accompanied by complete identity loss and adoption of a new identity.",
          "Step 3: Correct answer is Dissociative Fugue (Option C).",
        ],
        cuetTip: "Unexpected travel + new identity + amnesia = Dissociative Fugue.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Classification of Schizophrenic Symptoms",
        frequency: "Very High",
        typicalStem: "Which of the following is a negative symptom of schizophrenia: Hallucinations, Delusions, Flat Affect, Neologisms?",
        strategy: "Negative symptoms involve a deficit or absence of normal functions: Flat Affect, Alogia, Avolition, Anhedonia.",
      },
      {
        patternType: "Phobia and Anxiety Distinctions",
        frequency: "High",
        typicalStem: "Irrational fear of unfamiliar places, open grounds, or crowded markets from which escape seems difficult is termed:",
        strategy: "Agoraphobia is the fear of unfamiliar or open/crowded spaces from which escape would be difficult or embarrassing.",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing Obsessions and Compulsions.",
        whyWrong: "Obsessions are persistent, uncontrollable intrusive thoughts, impulses, or mental images. Compulsions are repetitive physical rituals or actions carried out to reduce anxiety caused by obsessions.",
        correctUnderstanding: "Obsession = Mental thought; Compulsion = Physical repetitive action.",
        trapOptionExample: "Calling repetitive handwashing an obsession.",
      },
      {
        misconception: "Believing Conversion Disorder has an underlying neurological defect.",
        whyWrong: "Conversion disorder exhibits genuine motor or sensory symptoms (blindness, paralysis) but has NO physiological or neurological defect; it is a psychological conflict converted into a somatic deficit.",
        correctUnderstanding: "Conversion disorder has no organic cause.",
        trapOptionExample: "Stating Conversion Disorder is caused by peripheral nerve damage.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Negative Symptoms of Schizophrenia (4 As)",
        mnemonic: "A-A-A-A (Apathy, Alogia, Anhedonia, Affect-flat)",
        rule: "Avolition (apathy), Alogia (poverty of speech), Anhedonia (no pleasure), Affective flattening",
        explanation: "Never confuse positive and negative symptoms in exams.",
      },
      {
        title: "The 4 Ds of Abnormality",
        mnemonic: "D-D-D-D",
        rule: "Deviance, Distress, Dysfunction, Danger",
        explanation: "Core criteria for diagnosing abnormal behavior.",
      },
    ],
    quickRevisionCard: {
      title: "Psychological Disorders — 60-Second Flash Card",
      bulletPoints: [
        "4 Ds of Abnormality: Deviance, Distress, Dysfunction, Danger.",
        "GAD: Free-floating chronic anxiety; Panic Disorder: Sudden terror spikes.",
        "Phobias: Specific, Social, Agoraphobia (unfamiliar/open places).",
        "OCD: Obsessions (intrusive thoughts) + Compulsions (repetitive ritual actions).",
        "Somatic Disorders: Conversion Disorder (pseudoneurological paralysis/blindness, 'la belle indifférence').",
        "Dissociative Disorders: Amnesia, Fugue (travel + new identity), DID (multiple personalities).",
        "Mood Disorders: Major Depression (anhedonia) vs Bipolar (mania + depression).",
        "Schizophrenia Positive: Delusions (Persecution, Reference, Grandeur, Control), Auditory Hallucinations.",
        "Schizophrenia Negative: 4 As — Avolition, Alogia, Anhedonia, Flat Affect.",
      ],
      examTricks: [
        "Auditory hallucinations are the most frequent type.",
        "Conversion disorder patients often display 'la belle indifférence'.",
      ],
    },
    practiceQuestions: [
      {
        id: "psychology_u4_q1",
        question: "Which of the following is NOT one of the '4 Ds' commonly used to define psychological abnormality?",
        type: "standard",
        options: [
          { id: "A", text: "Deviance" },
          { id: "B", text: "Distress" },
          { id: "C", text: "Dysfunction" },
          { id: "D", text: "Divergence" },
        ],
        correctOption: "D",
        explanation: "The four criteria defining abnormality are Deviance, Distress, Dysfunction, and Danger. Divergence is not one of them.",
        difficulty: "easy",
      },
      {
        id: "psychology_u4_q2",
        question: "A chronic, persistent state of anxiety that is not attached to any specific object or situation is clinically known as:",
        type: "standard",
        options: [
          { id: "A", text: "Panic Disorder" },
          { id: "B", text: "Generalised Anxiety Disorder (Free-Floating Anxiety)" },
          { id: "C", text: "Agoraphobia" },
          { id: "D", text: "Social Phobia" },
        ],
        correctOption: "B",
        explanation: "Generalised Anxiety Disorder (GAD) features free-floating anxiety where worry is diffuse and not bound to any specific stimulus.",
        difficulty: "easy",
      },
      {
        id: "psychology_u4_q3",
        question:
          "Assertion (A): Patients suffering from Conversion Disorder often show 'la belle indifférence'.\n" +
          "Reason (R): They display a surprising lack of distress or emotional concern regarding their sudden physical impairment like paralysis or blindness.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "'La belle indifférence' describes the calm, non-panicked acceptance of severe pseudoneurological symptoms characteristic of Conversion Disorder.",
        difficulty: "medium",
      },
      {
        id: "psychology_u4_q4",
        question: "In schizophrenia, the complete lack of motivation to initiate or persist in goal-directed activities is known as:",
        type: "standard",
        options: [
          { id: "A", text: "Alogia" },
          { id: "B", text: "Avolition" },
          { id: "C", text: "Anhedonia" },
          { id: "D", text: "Catatonia" },
        ],
        correctOption: "B",
        explanation: "Avolition or apathy is the negative symptom characterized by an inability to initiate and follow through on basic tasks.",
        difficulty: "easy",
      },
      {
        id: "psychology_u4_q5",
        question:
          "Match List-I (Psychological Disorder) with List-II (Signature Characteristic):\n" +
          "List-I:\n" +
          "p. Agoraphobia\n" +
          "q. Dissociative Fugue\n" +
          "r. Major Depressive Disorder\n" +
          "s. Bipolar Disorder\n" +
          "List-II:\n" +
          "1. Sudden unexpected travel with new identity adoption\n" +
          "2. Alternating episodes of depression and mania\n" +
          "3. Fear of entering unfamiliar, open, or crowded settings\n" +
          "4. Anhedonia and profound pervasive sadness\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-3, q-1, r-4, s-2" },
          { id: "B", text: "p-1, q-3, r-4, s-2" },
          { id: "C", text: "p-3, q-4, r-1, s-2" },
          { id: "D", text: "p-4, q-1, r-3, s-2" },
        ],
        correctOption: "A",
        explanation: "Agoraphobia (p-3: open spaces), Dissociative Fugue (q-1: travel + new identity), Major Depression (r-4: anhedonia), Bipolar (s-2: mania/depression).",
        difficulty: "easy",
      },
      {
        id: "psychology_u4_q6",
        question: "Which of the following is considered a 'Positive Symptom' of schizophrenia?",
        type: "standard",
        options: [
          { id: "A", text: "Flat affect" },
          { id: "B", text: "Alogia" },
          { id: "C", text: "Auditory Hallucinations" },
          { id: "D", text: "Avolition" },
        ],
        correctOption: "C",
        explanation: "Auditory hallucinations, delusions, and formal thought disorder are positive symptoms (pathological additions).",
        difficulty: "easy",
      },
      {
        id: "psychology_u4_q7",
        question: "A person who invents made-up words that have meaning only to themselves during a conversation is exhibiting:",
        type: "standard",
        options: [
          { id: "A", text: "Neologisms" },
          { id: "B", text: "Perseveration" },
          { id: "C", text: "Loose Associations" },
          { id: "D", text: "Echolalia" },
        ],
        correctOption: "A",
        explanation: "Neologisms are made-up words coined by patients suffering from formal thought disorder in schizophrenia.",
        difficulty: "medium",
      },
      {
        id: "psychology_u4_q8",
        question:
          "Assertion (A): In Obsessive-Compulsive Disorder (OCD), compulsions are performed to alleviate the severe anxiety created by obsessions.\n" +
          "Reason (R): Compulsions are repetitive, purposeful ritual acts carried out according to rigid rules.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Compulsive rituals (e.g., checking locks, washing hands) temporarily reduce the intolerable psychic tension produced by obsessive thoughts.",
        difficulty: "easy",
      },
      {
        id: "psychology_u4_q9",
        question: "The loss of the ability to experience pleasure in activities once found enjoyable is termed:",
        type: "standard",
        options: [
          { id: "A", text: "Alogia" },
          { id: "B", text: "Anhedonia" },
          { id: "C", text: "Avolition" },
          { id: "D", text: "Agnosia" },
        ],
        correctOption: "B",
        explanation: "Anhedonia is the inability to feel pleasure, a core symptom of Major Depressive Disorder and negative schizophrenia.",
        difficulty: "easy",
      },
      {
        id: "psychology_u4_q10",
        question: "A false belief that one is being spied on, poisoned, or slandered is classified as a:",
        type: "standard",
        options: [
          { id: "A", text: "Delusion of Grandeur" },
          { id: "B", text: "Delusion of Persecution" },
          { id: "C", text: "Delusion of Control" },
          { id: "D", text: "Delusion of Reference" },
        ],
        correctOption: "B",
        explanation: "Delusion of Persecution involves the false conviction that one is the victim of a hostile conspiracy or harassment.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Meeting Life Challenges"],
      relatedTopics: ["Therapeutic Approaches", "Attitude and Social Cognition"],
      practiceTestId: "practice-psychology-unit4-test1",
      practiceTestUrl: "/test/practice-psychology-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=psychology",
      weaknessRadarUrl: "/dashboard/radar?subject=psychology",
    },
  },
];
