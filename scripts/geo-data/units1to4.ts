import { NoteDocument } from "@/types/notes";

export const geoUnits1to4Topics: NoteDocument[] = [
  // -------------------------------------------------------------------------
  // UNIT 1: Human Geography - Nature and Scope
  // -------------------------------------------------------------------------
  {
    id: "geo_u1_t1",
    slug: "determinism-possibilism-neo-determinism-environmental-approaches",
    subject: "geo",
    subjectName: "Geography",
    subjectCode: "313",
    unitNumber: 1,
    unitTitle: "Human Geography - Nature and Scope",
    topicTitle: "Determinism, Possibilism, Neo-Determinism, Environmental Approaches",
    ncertReference: {
      class: "12",
      book: "Fundamentals of Human Geography",
      chapterNumber: 1,
      chapterName: "Human Geography: Nature and Scope",
      sections: [
        "Nature of Human Geography",
        "Naturalisation of Humans and Humanisation of Nature",
        "Human Geography through the Corridors of Time",
        "Fields and Sub-fields of Human Geography",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Frequently tested every year (12+ questions across slots)",
      totalPyqsInRepo: 28,
      weightagePercentage: 6.5,
    },
    summary30Seconds: [
      "Human Geography studies the inter-relationship between physical environment and socio-cultural environment created by human beings through mutual interaction.",
      "Environmental Determinism: Nature dominates humans; low technological development and primitive human society naturalised humans (Ratzel, Ellen Semple).",
      "Possibilism: Technological development allows human beings to overcome environmental constraints; nature offers opportunities and humans make choices (Vidal de la Blache).",
      "Neo-Determinism (Stop and Go Determinism): Propounded by Griffith Taylor; middle path between absolute environmental determinism and absolute possibilism; development within environmental limits (traffic light analogy).",
      "Major Schools of 1970s: Welfare/Humanistic (David M. Smith), Radical (Marxian theory on poverty & inequality), and Behavioural (lived experience & perception).",
    ],
    coreConcepts: [
      {
        title: "1. Core Definitions and Conceptual Foundations",
        content:
          "Human geography synthesises human societies and Earth's surface. Key classical definitions are crucial for CUET:\n" +
          "• **Friedrich Ratzel**: 'Human geography is the synthetic study of relationship between human societies and earth's surface.' (Emphasised synthesis; author of *Anthropogeographie*).\n" +
          "• **Ellen Churchill Semple**: 'Human geography is the study of the changing relationship between the unresting man and the unstable earth.' (Dynamism and active interaction).\n" +
          "• **Paul Vidal de la Blache**: 'Conception resulting from a more synthetic knowledge of the physical laws governing our earth and of the relations between the living beings which inhabit it.' (Conception of terrestrial whole).",
        ncertPointers: [
          "NCERT quote questions frequently ask which geographer formulated which definition.",
          "Remember: Ratzel = Synthesis; Semple = Dynamic/unresting man & unstable earth; Vidal de la Blache = Terrestrial whole/synthetic knowledge.",
        ],
      },
      {
        title: "2. Environmental Determinism vs Possibilism vs Neo-Determinism",
        content:
          "The interaction between human beings and the natural environment evolved through distinct philosophical frameworks:\n\n" +
          "**A. Environmental Determinism (Naturalisation of Humans)**:\n" +
          "• In primitive stages of society, technology was extremely low and humans adapted directly to environmental dictates.\n" +
          "• Nature is seen as a supreme, commanding force; human beings worship nature and live in complete harmony or subjugation (e.g., Benda's tribe in Abujhmarh, central India).\n\n" +
          "**B. Possibilism (Humanisation of Nature)**:\n" +
          "• With cultural and technological development, humans create possibilities using environmental resources.\n" +
          "• Humans modify nature: air conditioning in extreme summers, greenhouses in sub-polar regions, reclamation of sea land, satellites in space (e.g., Kari residing in Trondheim, Norway).\n" +
          "• Nature provides opportunities, and human beings are the active choosers.\n\n" +
          "**C. Neo-Determinism (Stop and Go Determinism)**:\n" +
          "• Introduced by Australian geographer **Griffith Taylor**.\n" +
          "• Rejects both extremes: neither is nature an absolute tyrant (fatalism) nor can humans conquer nature recklessly without consequence (environmental degradation, ozone depletion, global warming).\n" +
          "• **Traffic Light Analogy**: Just like red signals 'stop', amber 'prepare/get ready', and green 'go', humans can respond to nature's signals; we can accelerate development only within nature's permissible limits.",
        ncertPointers: [
          "CUET explicitly questions the creator of 'Stop-and-Go Determinism' (Griffith Taylor).",
          "Match-the-following questions often pair thinkers with their philosophical schools.",
        ],
      },
      {
        title: "3. Historical Approaches to Human Geography",
        content:
          "The discipline evolved through historical phases:\n" +
          "• **Early Colonial Period**: Exploration and description (imperial trade encyclopaedias).\n" +
          "• **Later Colonial Period**: Regional analysis (elaboration of all aspects of a region).\n" +
          "• **1930s (Inter-war period)**: Areal differentiation (identifying unique characteristics of regions).\n" +
          "• **Late 1950s to late 1960s**: Spatial organisation (application of quantitative techniques, computers, and statistical models; also called Quantitative Revolution).\n" +
          "• **1970s**: Emergence of Humanistic, Radical, and Behavioural schools.\n" +
          "• **1990s**: Post-modernism in geography (generalised grand theories rejected; local contexts emphasised).",
        ncertPointers: [
          "Quantitative Revolution is associated with the 'Spatial Organisation' phase (late 1950s to late 1960s).",
          "Radical school used Marxian theory to address social problems like poverty, deprivation, and social inequality.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Philosophical Paradigms Comparison",
        formula: "Determinism vs Possibilism vs Neo-Determinism",
        symbols: "D (Ratzel/Semple), P (Vidal), ND (Taylor)",
        siUnits: "Theoretical Framework",
        applicationCondition: "Exam questions contrasting views on nature-human primacy",
        notes: "Neo-determinism represents sustainable development before the term became widespread.",
      },
      {
        name: "1970s Schools of Thought in Human Geography",
        formula: "Welfare (Smith) | Radical (Marx) | Behavioural (Wright/Kirk)",
        symbols: "Social well-being vs Political economy vs Human agency & cognition",
        siUnits: "Methodological Paradigms",
        applicationCondition: "Direct attribution questions in CUET",
        notes: "Welfare school studied housing, health, education, and geography of social well-being.",
      },
      {
        name: "Chronological Approaches Matrix",
        formula: "Exploration -> Regional Analysis -> Areal Diff -> Spatial Org -> 1970s Schools -> Post-modernism",
        symbols: "Colonial to 1990s",
        siUnits: "Historical stages",
        applicationCondition: "Chronology and ordering questions",
        notes: "Match-the-following: late 1950s = Quantitative revolution / Spatial organisation.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Triad of Human-Nature Approaches",
      caption: "Conceptual spectrum from Environmental Determinism to Possibilism resolved by Griffith Taylor's Neo-Determinism.",
      code: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <rect x="20" y="40" width="190" height="150" rx="10" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
        <text x="115" y="75" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="14">Environmental Determinism</text>
        <text x="115" y="105" text-anchor="middle" fill="#7f1d1d" font-size="12">Nature Dominates Man</text>
        <text x="115" y="130" text-anchor="middle" fill="#b91c1c" font-size="11">Ratzel &amp; Ellen Semple</text>
        <text x="115" y="155" text-anchor="middle" fill="#450a0a" font-size="11">Primitive / Passive Human</text>

        <rect x="255" y="20" width="190" height="190" rx="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
        <text x="350" y="55" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="15">Neo-Determinism</text>
        <text x="350" y="80" text-anchor="middle" fill="#b45309" font-size="12">"Stop and Go" Determinism</text>
        <text x="350" y="110" text-anchor="middle" font-weight="bold" fill="#78350f" font-size="12">Griffith Taylor</text>
        <circle cx="350" cy="140" r="12" fill="#ef4444"/>
        <circle cx="350" cy="165" r="10" fill="#f59e0b"/>
        <circle cx="350" cy="190" r="12" fill="#10b981"/>

        <rect x="490" y="40" width="190" height="150" rx="10" fill="#dcfce7" stroke="#10b981" stroke-width="2"/>
        <text x="585" y="75" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="14">Possibilism</text>
        <text x="585" y="105" text-anchor="middle" fill="#047857" font-size="12">Man Humanises Nature</text>
        <text x="585" y="130" text-anchor="middle" fill="#059669" font-size="11">Vidal de la Blache</text>
        <text x="585" y="155" text-anchor="middle" fill="#064e3b" font-size="11">Technology / Opportunities</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <rect x="20" y="40" width="190" height="150" rx="10" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <text x="115" y="75" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="14">Environmental Determinism</text>
      <text x="115" y="105" text-anchor="middle" fill="#7f1d1d" font-size="12">Nature Dominates Man</text>
      <text x="115" y="130" text-anchor="middle" fill="#b91c1c" font-size="11">Ratzel &amp; Ellen Semple</text>
      <text x="115" y="155" text-anchor="middle" fill="#450a0a" font-size="11">Primitive / Passive Human</text>

      <rect x="255" y="20" width="190" height="190" rx="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
      <text x="350" y="55" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="15">Neo-Determinism</text>
      <text x="350" y="80" text-anchor="middle" fill="#b45309" font-size="12">"Stop and Go" Determinism</text>
      <text x="350" y="110" text-anchor="middle" font-weight="bold" fill="#78350f" font-size="12">Griffith Taylor</text>
      <circle cx="350" cy="140" r="12" fill="#ef4444"/>
      <circle cx="350" cy="165" r="10" fill="#f59e0b"/>
      <circle cx="350" cy="190" r="12" fill="#10b981"/>

      <rect x="490" y="40" width="190" height="150" rx="10" fill="#dcfce7" stroke="#10b981" stroke-width="2"/>
      <text x="585" y="75" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="14">Possibilism</text>
      <text x="585" y="105" text-anchor="middle" fill="#047857" font-size="12">Man Humanises Nature</text>
      <text x="585" y="130" text-anchor="middle" fill="#059669" font-size="11">Vidal de la Blache</text>
      <text x="585" y="155" text-anchor="middle" fill="#064e3b" font-size="11">Technology / Opportunities</text>
    </svg>`,
    workedExamples: [
      {
        id: "geo_u1_we1",
        questionNumber: 1,
        question:
          "Which of the following statements best characterizes Griffith Taylor's concept of 'Neo-Determinism'?\n" +
          "(A) Human beings can completely control and master natural forces without limits.\n" +
          "(B) Nature is the sole determinant of human choices, and humans are entirely passive.\n" +
          "(C) It is a middle path between environmental determinism and possibilism where humans obey nature's rules to overcome its constraints.\n" +
          "(D) It rejects both physical laws and human culture in spatial analysis.",
        options: [
          { id: "A", text: "Human beings can completely control and master natural forces without limits." },
          { id: "B", text: "Nature is the sole determinant of human choices, and humans are entirely passive." },
          { id: "C", text: "It is a middle path between environmental determinism and possibilism where humans obey nature's rules to overcome its constraints." },
          { id: "D", text: "It rejects both physical laws and human culture in spatial analysis." },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Understand Taylor's concept of Neo-Determinism or 'Stop and Go Determinism'.",
          "Step 2: Taylor argued that humans can direct the flow of traffic (development) but cannot modify the direction of nature itself; humans can conquer nature only by obeying it.",
          "Step 3: Option C accurately articulates this dialectical middle ground.",
        ],
        cuetTip: "Look for keywords like 'middle path', 'traffic lights', or 'obey nature to overcome constraints'.",
      },
      {
        id: "geo_u1_we2",
        questionNumber: 2,
        question:
          "Match List-I (School of Thought, 1970s) with List-II (Core Focus/Theorist Foundation):\n" +
          "List-I:\n" +
          "p. Welfare/Humanistic School\n" +
          "q. Radical School\n" +
          "r. Behavioural School\n" +
          "List-II:\n" +
          "1. Marxian theory explaining poverty and social inequality\n" +
          "2. Lived experience and perception of space by ethnic and social groups\n" +
          "3. Aspects like housing, health, and education (social well-being)\n" +
          "Choose the correct match:\n" +
          "(A) p-3, q-1, r-2\n" +
          "(B) p-1, q-3, r-2\n" +
          "(C) p-2, q-1, r-3\n" +
          "(D) p-3, q-2, r-1",
        options: [
          { id: "A", text: "p-3, q-1, r-2" },
          { id: "B", text: "p-1, q-3, r-2" },
          { id: "C", text: "p-2, q-1, r-3" },
          { id: "D", text: "p-3, q-2, r-1" },
        ],
        correctOption: "A",
        solutionStepByStep: [
          "Step 1: Welfare school is concerned with the geography of social well-being (housing, health, education) -> p-3.",
          "Step 2: Radical school employed Marxian theory to address root causes of poverty and social problems -> q-1.",
          "Step 3: Behavioural school laid great emphasis on lived experience and environmental perception based on social categories -> r-2.",
          "Step 4: The combination is p-3, q-1, r-2, matching Option A.",
        ],
        cuetTip: "NCERT Class 12 Fundamentals Ch 1 explicitly names these 3 schools in a dedicated box.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Direct Conceptual Attribution",
        frequency: "High (every year)",
        typicalStem: "Who defined human geography as 'the synthetic study of relationship between human societies and earth's surface'?",
        strategy: "Memorise the exact keywords for Ratzel ('synthesis'), Semple ('unresting man & unstable earth'), and Vidal ('terrestrial whole').",
      },
      {
        patternType: "Assertion-Reason on Neo-Determinism",
        frequency: "High",
        typicalStem: "Assertion (A): Neo-determinism reflects a middle path between environmental determinism and possibilism. Reason (R): It conceives human development within environmental possibilities without causing ecological damage.",
        strategy: "Both A and R are true and R is the correct explanation. Taylor's traffic light analogy is the classic justification.",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing Ellen Semple's definition with Ratzel's.",
        whyWrong: "Students often conflate Ratzel and his student Semple. Ratzel authored *Anthropogeographie* focusing on 'synthetic study', while Semple emphasised the 'changing relationship between unresting man and unstable earth'.",
        correctUnderstanding: "Ratzel = Synthetic study; Semple = Changing relationship / dynamic process.",
        trapOptionExample: "Stating Ratzel defined human geography through 'unresting man and unstable earth'.",
      },
      {
        misconception: "Believing Quantitative Revolution happened in the 1970s.",
        whyWrong: "The Quantitative Revolution / Spatial Organisation period took place in the late 1950s to late 1960s; the 1970s was a reaction against quantitative technocentrism, bringing humanistic and radical schools.",
        correctUnderstanding: "Late 1950s-1960s = Spatial Organisation / Quantitative Revolution; 1970s = Radical, Behavioural, Welfare schools.",
        trapOptionExample: "Option claiming Quantitative methods were introduced in the 1970s.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Chronology of Approaches Mnemonic",
        mnemonic: "E-R-A-S-H-P (Every Region Always Showcases Human Prosperity)",
        rule: "Exploration -> Regional analysis -> Areal differentiation -> Spatial organisation -> Humanistic/Radical (1970s) -> Postmodernism (1990s)",
        explanation: "Helps you sequence historical approaches from colonial times to contemporary geography in 5 seconds.",
      },
      {
        title: "Thinkers-Approaches Pairing",
        mnemonic: "R-E-D / V-I-P / G-E-N",
        rule: "Ratzel/Ellen = Determinism | Vidal = Possibilism | Griffith = Neo-determinism",
        explanation: "Never mismatch the foundational geographer with their school of thought.",
      },
    ],
    quickRevisionCard: {
      title: "Human Geography: Nature & Scope — 60-Second Flash Card",
      bulletPoints: [
        "Human Geography: Spatial relationship between human societies and natural landscape.",
        "Ratzel (Germany): Synthetic study; father of modern human geography; Anthropogeographie.",
        "Ellen Semple (USA): Student of Ratzel; unresting man and unstable earth.",
        "Vidal de la Blache (France): Possibilism; nature gives possibilities, man creates culture.",
        "Griffith Taylor (Australia): Neo-determinism / Stop-and-Go determinism; middle path; traffic lights.",
        "Late 1950s - late 1960s: Spatial Organisation & Quantitative Revolution (computers & physics laws).",
        "1970s: Welfare (David Smith), Radical (Karl Marx), Behavioural (lived experience).",
        "1990s: Post-modernism (local contexts, anti-universal grand theories).",
      ],
      examTricks: [
        "Look out for 'Stop-and-Go': always Griffith Taylor.",
        "Social well-being (housing, health) is always Welfare School.",
      ],
    },
    practiceQuestions: [
      {
        id: "geo_u1_q1",
        question: "Who among the following geographers propounded the concept of 'Stop-and-Go Determinism'?",
        type: "standard",
        options: [
          { id: "A", text: "Paul Vidal de la Blache" },
          { id: "B", text: "Griffith Taylor" },
          { id: "C", text: "Friedrich Ratzel" },
          { id: "D", text: "Ellen Churchill Semple" },
        ],
        correctOption: "B",
        explanation: "Griffith Taylor propounded Neo-determinism, also known as 'Stop-and-Go Determinism', using the traffic light metaphor.",
        difficulty: "easy",
      },
      {
        id: "geo_u1_q2",
        question: "Which school of thought in human geography employed Marxian theory to explain the basic cause of poverty, deprivation, and social inequality?",
        type: "standard",
        options: [
          { id: "A", text: "Humanistic School" },
          { id: "B", text: "Behavioural School" },
          { id: "C", text: "Radical School" },
          { id: "D", text: "Welfare School" },
        ],
        correctOption: "C",
        explanation: "The Radical school in the 1970s applied Marxian social theory to examine capitalism, poverty, and uneven spatial development.",
        difficulty: "medium",
      },
      {
        id: "geo_u1_q3",
        question:
          "Assertion (A): Possibilism posits that physical environment provides possibilities and humans are the master of these possibilities.\n" +
          "Reason (R): Humans, through technological knowledge, create cultural landscapes like ports, satellite communication, and highland health resorts.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Possibilism explains how humans use technology to transform natural constraints into opportunities, creating cultural landscapes.",
        difficulty: "medium",
      },
      {
        id: "geo_u1_q4",
        question: "The period of late 1950s to the late 1960s in human geography is best known for which of the following approaches?",
        type: "standard",
        options: [
          { id: "A", text: "Areal Differentiation" },
          { id: "B", text: "Spatial Organisation and Quantitative Revolution" },
          { id: "C", text: "Post-modernism in Geography" },
          { id: "D", text: "Exploration and Description" },
        ],
        correctOption: "B",
        explanation: "The late 1950s to late 1960s saw the emergence of Spatial Organisation characterised by statistical tools, mapping laws, and quantitative models.",
        difficulty: "medium",
      },
      {
        id: "geo_u1_q5",
        question:
          "Match List-I (Period) with List-II (Dominant Approach in Geography):\n" +
          "List-I:\n" +
          "1. Early Colonial\n" +
          "2. 1930s Inter-war\n" +
          "3. 1970s\n" +
          "4. 1990s\n" +
          "List-II:\n" +
          "p. Areal differentiation\n" +
          "q. Exploration and description\n" +
          "r. Post-modernism\n" +
          "s. Humanistic, Radical & Behavioural schools\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "1-q, 2-p, 3-s, 4-r" },
          { id: "B", text: "1-p, 2-q, 3-r, 4-s" },
          { id: "C", text: "1-q, 2-r, 3-s, 4-p" },
          { id: "D", text: "1-s, 2-p, 3-q, 4-r" },
        ],
        correctOption: "A",
        explanation: "1-q (Colonial: Exploration), 2-p (1930s: Areal differentiation), 3-s (1970s: Radical/Humanistic), 4-r (1990s: Post-modernism).",
        difficulty: "hard",
      },
      {
        id: "geo_u1_q6",
        question: "Which of the following sub-fields belongs to the field of 'Economic Geography'?",
        type: "standard",
        options: [
          { id: "A", text: "Electoral Geography" },
          { id: "B", text: "Military Geography" },
          { id: "C", text: "Geography of Tourism" },
          { id: "D", text: "Historical Geography" },
        ],
        correctOption: "C",
        explanation: "Geography of Tourism, Agriculture, Resources, Industries, Marketing, and International Trade are sub-fields of Economic Geography.",
        difficulty: "easy",
      },
      {
        id: "geo_u1_q7",
        question: "The concept of 'naturalisation of humans' is most closely associated with:",
        type: "standard",
        options: [
          { id: "A", text: "Possibilism" },
          { id: "B", text: "Environmental Determinism" },
          { id: "C", text: "Neo-Determinism" },
          { id: "D", text: "Welfare Geography" },
        ],
        correctOption: "B",
        explanation: "Naturalisation of humans refers to primitive stages where human activity was directly dictated by nature (Environmental Determinism).",
        difficulty: "easy",
      },
      {
        id: "geo_u1_q8",
        question:
          "Assertion (A): Griffith Taylor's neo-determinism implies that human beings can conquer nature only by obeying its fundamental laws.\n" +
          "Reason (R): Ignoring ecological red lights leads to problems such as global warming, ozone depletion, and receding glaciers.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Taylor emphasized that reckless exploitation triggers environmental crises; sustainable progress is possible only by recognizing natural thresholds.",
        difficulty: "medium",
      },
      {
        id: "geo_u1_q9",
        question: "Who authored the seminal work 'Anthropogeographie'?",
        type: "standard",
        options: [
          { id: "A", text: "Ellen Churchill Semple" },
          { id: "B", text: "Friedrich Ratzel" },
          { id: "C", text: "Paul Vidal de la Blache" },
          { id: "D", text: "Alexander von Humboldt" },
        ],
        correctOption: "B",
        explanation: "German geographer Friedrich Ratzel authored 'Anthropogeographie' laying the foundation of modern human geography.",
        difficulty: "easy",
      },
      {
        id: "geo_u1_q10",
        question: "Which of the following is NOT one of the 1970s schools of thought in human geography?",
        type: "standard",
        options: [
          { id: "A", text: "Welfare School" },
          { id: "B", text: "Radical School" },
          { id: "C", text: "Behavioural School" },
          { id: "D", text: "Quantitative School" },
        ],
        correctOption: "D",
        explanation: "Quantitative geography flourished during the late 1950s-1960s; the 1970s was a humanist and critical reaction to quantitative techniques.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Basic Physical Geography concepts"],
      relatedTopics: ["World Population Distribution", "Human Development Index"],
      practiceTestId: "practice-geo-unit1-test1",
      practiceTestUrl: "/test/practice-geo-unit1-test1",
      weaknessReportUrl: "/dashboard/radar?subject=geo",
      weaknessRadarUrl: "/dashboard/radar?subject=geo",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 2: People (World Population and Human Development)
  // -------------------------------------------------------------------------
  {
    id: "geo_u2_t1",
    slug: "world-population-distribution-density-growth-demographic-transition-hdi",
    subject: "geo",
    subjectName: "Geography",
    subjectCode: "313",
    unitNumber: 2,
    unitTitle: "People (World Population and Human Development)",
    topicTitle: "World Population Distribution, Density, Growth, Demographic Transition, HDI",
    ncertReference: {
      class: "12",
      book: "Fundamentals of Human Geography",
      chapterNumber: 2,
      chapterName: "The World Population: Distribution, Density and Growth & Human Development",
      sections: [
        "Patterns of Population Distribution in the World",
        "Density of Population and Factors Influencing Distribution",
        "Population Growth and Components of Change",
        "Demographic Transition Theory",
        "Concept and Four Pillars of Human Development",
        "Approaches to Human Development and International Comparisons",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (15+ questions across paper sets)",
      totalPyqsInRepo: 34,
      weightagePercentage: 8.0,
    },
    summary30Seconds: [
      "George B. Cressey's famous observation: 'Asia has many places where people are few and few places where people are very many.'",
      "Arithmetic Population Density = Total Population / Total Area (persons per sq km).",
      "Factors influencing distribution: Geographical (water, landforms, climate, soils), Economic (minerals, urbanisation, industrialisation), Socio-cultural.",
      "Demographic Transition Theory: 3 stages (Stage 1: High CBR & CDR, agrarian; Stage 2: High CBR, rapidly falling CDR, explosion; Stage 3: Low CBR & CDR, stable/urban).",
      "HDI (Mahbub ul Haq & Amartya Sen, 1990): 4 pillars (Equity, Sustainability, Productivity, Empowerment); 3 dimensions (Health/Life Expectancy, Knowledge/Schooling, Standard of Living/GNI per capita PPP$).",
    ],
    coreConcepts: [
      {
        title: "1. Population Distribution and Density",
        content:
          "Population distribution refers to the spatial arrangement of people across Earth's surface. 90% of world population lives in about 10% of its land area.\n" +
          "• **Top 10 Most Populous Countries**: China, India, USA, Indonesia, Pakistan, Nigeria, Brazil, Bangladesh, Russia, Mexico (together account for ~60% of world population; 6 in Asia).\n" +
          "• **Arithmetic Density**: Ratio between the number of people to the size of land:\n" +
          "  $$\\text{Density} = \\frac{\\text{Total Population}}{\\text{Total Area}}$$\n" +
          "• **Densely populated regions (>200 persons/sq km)**: East Asia, South Asia, North-Western Europe, North-Eastern USA.\n" +
          "• **Sparsely populated regions (<1 person/sq km)**: Polar ice caps, hot deserts (Sahara), cold deserts, equatorial rainforests (Amazon).",
        ncertPointers: [
          "Arithmetic density formula is repeatedly asked in simple numerical MCQs.",
          "Note: Kobe-Osaka industrial region in Japan is a classic NCERT example of industrialisation driving high density.",
        ],
      },
      {
        title: "2. Components of Population Change & Migration",
        content:
          "There are three components of population change: **Births**, **Deaths**, and **Migration**.\n" +
          "• **Crude Birth Rate (CBR)**: Number of live births in a year per 1,000 mid-year population: $$\\text{CBR} = \\frac{\\text{Bi}}{\\text{P}} \\times 1000$$\n" +
          "• **Crude Death Rate (CDR)**: Number of deaths in a year per 1,000 mid-year population: $$\\text{CDR} = \\frac{\\text{D}}{\\text{P}} \\times 1000$$\n" +
          "• **Natural Increase** = Crude Birth Rate - Crude Death Rate.\n" +
          "• **Actual Population Growth** = (Births - Deaths) + (In-Migration - Out-Migration).\n\n" +
          "**Migration**: Place of Origin (point of departure) vs Place of Destination (point of arrival).\n" +
          "• **Push Factors** (make place of origin less attractive): Unemployment, poor living conditions, political turmoil, unpleasant climate, natural disasters, epidemics.\n" +
          "• **Pull Factors** (make place of destination more attractive): Better job opportunities, higher wages, political stability, security of life and property, pleasant climate.",
        ncertPointers: [
          "CUET test questions frequently test classification: 'Which of the following is a PULL factor?' (e.g., peace and stability is pull, whereas epidemics is push).",
        ],
      },
      {
        title: "3. Demographic Transition Theory",
        content:
          "Describes how a society moves from high fertility and high mortality to low fertility and low mortality as it transforms from rural-agrarian to urban-industrial:\n\n" +
          "• **Stage I (High Fluctuating)**:\n" +
          "  - High CBR and high CDR; slow growth.\n" +
          "  - Primitive technology, rain-fed agriculture, high epidemic risk, low life expectancy.\n" +
          "  - Examples: Primitive tribes, historical societies, rainfed Bangladesh before modern health.\n\n" +
          "• **Stage II (Expanding / Transitional)**:\n" +
          "  - CBR remains high initially, while CDR drops dramatically due to improved sanitation and healthcare.\n" +
          "  - Huge net addition to population -> Population explosion.\n" +
          "  - Examples: Developing countries (Kenya, Peru, Sri Lanka).\n\n" +
          "• **Stage III (Low Fluctuating / Contracting)**:\n" +
          "  - Both CBR and CDR decline sharply; population becomes stable or grows very slowly (or even declines).\n" +
          "  - Highly urbanised, literate, high technological control on family size.\n" +
          "  - Examples: Japan, Germany, Canada, USA.",
        ncertPointers: [
          "Be ready for diagrammatic questions showing the widening gap between CBR and CDR in Stage 2.",
        ],
      },
      {
        title: "4. Human Development: Pillars, Dimensions & Measuring HDI",
        content:
          "Introduced by Pakistani economist **Dr. Mahbub ul Haq** in 1990 in collaboration with Nobel Laureate **Prof. Amartya Sen**.\n" +
          "• **Definition**: Human development is development that enlarges people's choices and improves their lives.\n\n" +
          "**Four Pillars of Human Development**:\n" +
          "1. **Equity**: Equal access to opportunities available to everybody regardless of gender, race, income, or caste.\n" +
          "2. **Sustainability**: Continuity in the availability of opportunities for future generations.\n" +
          "3. **Productivity**: Human labour productivity; building capabilities through healthcare, education, and skill training.\n" +
          "4. **Empowerment**: Power to make choices; freedom and capability (especially disadvantaged groups).\n\n" +
          "**Dimensions of HDI (Weight: 1/3 each)**:\n" +
          "• **Health**: Measured by Life Expectancy at birth.\n" +
          "• **Education**: Measured by Expected Years of Schooling & Mean Years of Schooling (Adult Literacy + Gross Enrolment).\n" +
          "• **Access to Resources**: Measured by Gross National Income (GNI) per capita in Purchasing Power Parity (PPP in US $).\n\n" +
          "**HDI Score Categories**:\n" +
          "• Very High: Score > 0.800 (66 countries)\n" +
          "• High: Score 0.700 to 0.799 (53 countries)\n" +
          "• Medium: Score 0.550 to 0.699 (37 countries, includes India)\n" +
          "• Low: Score < 0.550 (33 countries)",
        ncertPointers: [
          "Four pillars vs three dimensions: Common trap! Pillars = Equity, Sustainability, Productivity, Empowerment. Dimensions = Health, Education, Resources.",
          "India falls under the 'Medium Human Development' category in NCERT classification.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Arithmetic Density Formula",
        formula: "Density = Total Population / Total Area (sq km)",
        symbols: "D = P / A",
        siUnits: "Persons per sq km",
        applicationCondition: "Calculating population density from land area and population figures",
        notes: "Does not differentiate between arable and non-arable land (that is physiological density).",
      },
      {
        name: "Natural vs Actual Growth Rate",
        formula: "Natural = CBR - CDR | Actual = (Births - Deaths) + (In-migration - Out-migration)",
        symbols: "Natural vs Net Migratory Growth",
        siUnits: "Per 1,000 population or percentage (%)",
        applicationCondition: "CUET statement I/II questions distinguishing natural from actual increase",
        notes: "Actual growth includes migration balance; natural growth includes only vital statistics.",
      },
      {
        name: "Four Approaches to Human Development",
        formula: "Income Approach | Welfare Approach | Basic Needs Approach | Capability Approach",
        symbols: "Oldest (Income) to Sen's (Capability)",
        siUnits: "Theoretical paradigms",
        applicationCondition: "Match-the-following in CUET",
        notes: "Basic Needs approach was introduced by International Labour Organisation (ILO) with 6 basic needs: health, education, food, water, sanitation, shelter.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Demographic Transition Theory Stages",
      caption: "CBR and CDR curves across Stage 1 (Fluctuating), Stage 2 (Expanding), and Stage 3 (Contracting/Stable).",
      code: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <line x1="60" y1="210" x2="680" y2="210" stroke="#334155" stroke-width="2"/>
        <line x1="60" y1="30" x2="60" y2="210" stroke="#334155" stroke-width="2"/>
        <text x="30" y="120" transform="rotate(-90 30,120)" font-size="12" fill="#475569" font-weight="bold">Birth &amp; Death Rates (per 1000)</text>
        
        <line x1="260" y1="30" x2="260" y2="210" stroke="#cbd5e1" stroke-dasharray="4"/>
        <line x1="480" y1="30" x2="480" y2="210" stroke="#cbd5e1" stroke-dasharray="4"/>
        
        <text x="160" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Stage I: High Stationary</text>
        <text x="370" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Stage II: Early Expanding</text>
        <text x="580" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Stage III: Low Stationary</text>

        <!-- Birth Rate Curve -->
        <path d="M 60,60 Q 160,55 260,60 Q 370,65 480,120 Q 580,170 680,175" fill="none" stroke="#2563eb" stroke-width="3"/>
        <text x="630" y="155" fill="#2563eb" font-size="12" font-weight="bold">CBR (Births)</text>

        <!-- Death Rate Curve -->
        <path d="M 60,75 Q 160,85 260,95 Q 350,150 480,175 Q 580,180 680,180" fill="none" stroke="#dc2626" stroke-width="3"/>
        <text x="630" y="200" fill="#dc2626" font-size="12" font-weight="bold">CDR (Deaths)</text>

        <!-- Gap in Stage 2 -->
        <rect x="320" y="90" width="110" height="40" rx="4" fill="#fef08a" stroke="#ca8a04"/>
        <text x="375" y="115" text-anchor="middle" font-size="11" font-weight="bold" fill="#854d0e">Population Explosion</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <line x1="60" y1="210" x2="680" y2="210" stroke="#334155" stroke-width="2"/>
      <line x1="60" y1="30" x2="60" y2="210" stroke="#334155" stroke-width="2"/>
      <text x="30" y="120" transform="rotate(-90 30,120)" font-size="12" fill="#475569" font-weight="bold">Birth &amp; Death Rates (per 1000)</text>
      
      <line x1="260" y1="30" x2="260" y2="210" stroke="#cbd5e1" stroke-dasharray="4"/>
      <line x1="480" y1="30" x2="480" y2="210" stroke="#cbd5e1" stroke-dasharray="4"/>
      
      <text x="160" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Stage I: High Stationary</text>
      <text x="370" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Stage II: Early Expanding</text>
      <text x="580" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Stage III: Low Stationary</text>

      <!-- Birth Rate Curve -->
      <path d="M 60,60 Q 160,55 260,60 Q 370,65 480,120 Q 580,170 680,175" fill="none" stroke="#2563eb" stroke-width="3"/>
      <text x="630" y="155" fill="#2563eb" font-size="12" font-weight="bold">CBR (Births)</text>

      <!-- Death Rate Curve -->
      <path d="M 60,75 Q 160,85 260,95 Q 350,150 480,175 Q 580,180 680,180" fill="none" stroke="#dc2626" stroke-width="3"/>
      <text x="630" y="200" fill="#dc2626" font-size="12" font-weight="bold">CDR (Deaths)</text>

      <!-- Gap in Stage 2 -->
      <rect x="320" y="90" width="110" height="40" rx="4" fill="#fef08a" stroke="#ca8a04"/>
      <text x="375" y="115" text-anchor="middle" font-size="11" font-weight="bold" fill="#854d0e">Population Explosion</text>
    </svg>`,
    workedExamples: [
      {
        id: "geo_u2_we1",
        questionNumber: 1,
        question:
          "Country 'X' has a total population of 150 million people living in an area of 500,000 square kilometres. What is the arithmetic population density of Country 'X'?\n" +
          "(A) 30 persons/sq km\n" +
          "(B) 300 persons/sq km\n" +
          "(C) 75 persons/sq km\n" +
          "(D) 3000 persons/sq km",
        options: [
          { id: "A", text: "30 persons/sq km" },
          { id: "B", text: "300 persons/sq km" },
          { id: "C", text: "75 persons/sq km" },
          { id: "D", text: "3000 persons/sq km" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Formula for Arithmetic Density = Total Population / Total Area.",
          "Step 2: Total Population = 150,000,000.",
          "Step 3: Total Area = 500,000 sq km.",
          "Step 4: Density = 150,000,000 / 500,000 = 1500 / 5 = 300 persons per sq km.",
        ],
        cuetTip: "Keep zeros in check during calculation: 150 million = 150 * 10^6.",
      },
      {
        id: "geo_u2_we2",
        questionNumber: 2,
        question:
          "Which of the following is NOT one of the six basic needs identified by the International Labour Organisation (ILO) in its Basic Needs Approach to Human Development?\n" +
          "(A) Health\n" +
          "(B) Education\n" +
          "(C) Political freedom\n" +
          "(D) Sanitation",
        options: [
          { id: "A", text: "Health" },
          { id: "B", text: "Education" },
          { id: "C", text: "Political freedom" },
          { id: "D", text: "Sanitation" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Recall the ILO's Basic Needs Approach described in NCERT Class 12 Fundamentals of Human Geography.",
          "Step 2: Six specific basic needs were identified: (1) Health, (2) Education, (3) Food, (4) Water supply, (5) Sanitation, (6) Housing.",
          "Step 3: Political freedom, while vital for human development generally (and emphasised in Sen's Capability approach), was not one of the six basic physical survival needs in the ILO approach.",
        ],
        cuetTip: "Six ILO needs = Health, Education, Food, Water, Sanitation, Housing (HEFWSH).",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Classification of Push vs Pull Factors",
        frequency: "Very High",
        typicalStem: "Which one of the following is a 'pull factor' of migration?",
        strategy: "Pull factors are positive opportunities attracting migrants to the destination (jobs, security, education), whereas push factors are distress signals forcing them out.",
      },
      {
        patternType: "Four Pillars vs Three Dimensions of HDI",
        frequency: "High",
        typicalStem: "Which among the following is a pillar of human development?",
        strategy: "Pillars are the structural legs: Equity, Sustainability, Productivity, Empowerment. Dimensions are what HDI measures: Health, Education, Resources.",
      },
    ],
    commonTraps: [
      {
        misconception: "Treating 'Income' as a pillar of human development.",
        whyWrong: "Income is an approach (the oldest approach) and a dimension (GNI per capita), but it is NOT one of the four pillars (which are Equity, Sustainability, Productivity, Empowerment).",
        correctUnderstanding: "Four Pillars = E-S-P-E (Equity, Sustainability, Productivity, Empowerment).",
        trapOptionExample: "Listing Income as a pillar alongside Equity and Sustainability.",
      },
      {
        misconception: "Confusing Stage 1 with Stage 2 of Demographic Transition.",
        whyWrong: "Students assume mortality drops in Stage 1. In Stage 1, both birth and death rates are high and fluctuate. Mortality drops sharply only in Stage 2, causing population expansion.",
        correctUnderstanding: "Stage 1 = High births + High deaths; Stage 2 = High births + Falling deaths; Stage 3 = Low births + Low deaths.",
        trapOptionExample: "Option claiming death rates fall rapidly in Stage 1.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Four Pillars of Human Development",
        mnemonic: "E-S-P-E (Especially Super People Excel)",
        rule: "Equity, Sustainability, Productivity, Empowerment",
        explanation: "Memorise these 4 exact words; NCERT tests them as options.",
      },
      {
        title: "Six ILO Basic Needs",
        mnemonic: "F-W-S-H-E-H (Fast Water Softens Hard Emotional Hearts)",
        rule: "Food, Water supply, Sanitation, Housing, Education, Health",
        explanation: "The six needs identified by ILO in the Basic Needs approach.",
      },
    ],
    quickRevisionCard: {
      title: "World Population & HDI — 60-Second Flash Card",
      bulletPoints: [
        "90% of global population lives on ~10% of land area; 6 of top 10 populated nations are in Asia.",
        "Arithmetic Density = Population / Area (persons/km²).",
        "Natural Growth = Births - Deaths; Actual Growth = (B - D) + (In-migration - Out-migration).",
        "Push Factors (leave origin): Poverty, unemployment, war; Pull Factors (attract to destination): High wages, peace.",
        "Demographic Transition: Stage 1 (High CBR/CDR), Stage 2 (High CBR, plunging CDR = explosion), Stage 3 (Low CBR/CDR = stability).",
        "HDI introduced by Mahbub ul Haq (1990); Amartya Sen capability concept.",
        "4 Pillars: Equity, Sustainability, Productivity, Empowerment.",
        "3 Dimensions: Health (Life Expectancy), Education (Schooling years), Living standard (GNI per capita in PPP$).",
        "India: Medium HDI category (0.550 to 0.699).",
      ],
      examTricks: [
        "Kobe-Osaka industrial belt = industrial factor attracting high population density.",
        "GNI in HDI is always calculated in Purchasing Power Parity (PPP US$).",
      ],
    },
    practiceQuestions: [
      {
        id: "geo_u2_q1",
        question: "Who among the following economists introduced the concept of Human Development in 1990?",
        type: "standard",
        options: [
          { id: "A", text: "Dr. Manmohan Singh" },
          { id: "B", text: "Dr. Mahbub ul Haq" },
          { id: "C", text: "Prof. Muhammad Yunus" },
          { id: "D", text: "Jagdish Bhagwati" },
        ],
        correctOption: "B",
        explanation: "Pakistani economist Dr. Mahbub ul Haq introduced the Human Development Report and Index in 1990.",
        difficulty: "easy",
      },
      {
        id: "geo_u2_q2",
        question: "Which of the following is considered a 'Push Factor' for migration?",
        type: "standard",
        options: [
          { id: "A", text: "Peace and political stability" },
          { id: "B", text: "Better job opportunities" },
          { id: "C", text: "Poor living conditions and epidemics" },
          { id: "D", text: "Pleasant climate" },
        ],
        correctOption: "C",
        explanation: "Poor living conditions, natural disasters, unemployment, and epidemics are push factors compelling people to leave their place of origin.",
        difficulty: "easy",
      },
      {
        id: "geo_u2_q3",
        question:
          "Assertion (A): Stage II of the Demographic Transition is characterised by a huge net addition to population, often called population explosion.\n" +
          "Reason (R): In Stage II, fertility remains high while mortality declines dramatically due to improved medical services and sanitation.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "The widening gap between high fertility and sharply declining mortality in Stage II produces rapid population expansion.",
        difficulty: "medium",
      },
      {
        id: "geo_u2_q4",
        question: "Which of the following is NOT one of the four pillars of human development?",
        type: "standard",
        options: [
          { id: "A", text: "Equity" },
          { id: "B", text: "Sustainability" },
          { id: "C", text: "Productivity" },
          { id: "D", text: "Urbanisation" },
        ],
        correctOption: "D",
        explanation: "The four pillars of human development are Equity, Sustainability, Productivity, and Empowerment. Urbanisation is not a pillar.",
        difficulty: "easy",
      },
      {
        id: "geo_u2_q5",
        question:
          "Match List-I (Approach to Human Development) with List-II (Core Concept):\n" +
          "List-I:\n" +
          "p. Income Approach\n" +
          "q. Welfare Approach\n" +
          "r. Basic Needs Approach\n" +
          "s. Capability Approach\n" +
          "List-II:\n" +
          "1. Six basic needs identified by ILO\n" +
          "2. Associated with Prof. Amartya Sen (building human capabilities)\n" +
          "3. Higher the level of income, higher the level of human development\n" +
          "4. Higher government expenditure on health, education, and amenities\n" +
          "Select the correct match:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-3, q-4, r-1, s-2" },
          { id: "B", text: "p-4, q-3, r-1, s-2" },
          { id: "C", text: "p-3, q-1, r-4, s-2" },
          { id: "D", text: "p-2, q-4, r-1, s-3" },
        ],
        correctOption: "A",
        explanation: "Income (p-3: oldest), Welfare (q-4: govt expenditure), Basic Needs (r-1: ILO 6 needs), Capability (s-2: Amartya Sen).",
        difficulty: "medium",
      },
      {
        id: "geo_u2_q6",
        question: "In the calculation of the Human Development Index (HDI), access to resources is measured by:",
        type: "standard",
        options: [
          { id: "A", text: "Gross Domestic Product (GDP) per capita in local currency" },
          { id: "B", text: "Gross National Income (GNI) per capita in Purchasing Power Parity (US $)" },
          { id: "C", text: "Net National Product (NNP) at factor cost" },
          { id: "D", text: "Total foreign exchange reserves per capita" },
        ],
        correctOption: "B",
        explanation: "Access to resources in HDI is evaluated through Gross National Income (GNI) per capita measured in Purchasing Power Parity in US dollars.",
        difficulty: "medium",
      },
      {
        id: "geo_u2_q7",
        question: "According to the Human Development Report, countries with an HDI score between 0.700 and 0.799 are classified under:",
        type: "standard",
        options: [
          { id: "A", text: "Very High Human Development" },
          { id: "B", text: "High Human Development" },
          { id: "C", text: "Medium Human Development" },
          { id: "D", text: "Low Human Development" },
        ],
        correctOption: "B",
        explanation: "Very High is >0.800, High is 0.700 to 0.799, Medium is 0.550 to 0.699, and Low is below 0.550.",
        difficulty: "easy",
      },
      {
        id: "geo_u2_q8",
        question:
          "Assertion (A): Bhutan is the only country in the world to officially measure progress through Gross National Happiness (GNH).\n" +
          "Reason (R): GNH places spiritual, cultural, and ecological well-being above material growth.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Bhutan officially introduced Gross National Happiness, making spiritual and ecological balance the central measure of development.",
        difficulty: "easy",
      },
      {
        id: "geo_u2_q9",
        question: "Which of the following geographical regions has a population density of less than 1 person per square kilometre?",
        type: "standard",
        options: [
          { id: "A", text: "Western Europe" },
          { id: "B", text: "Ganga-Brahmaputra Delta" },
          { id: "C", text: "Kobe-Osaka industrial belt" },
          { id: "D", text: "Polar ice-caps and high northern latitudes" },
        ],
        correctOption: "D",
        explanation: "Polar regions, extreme deserts, and dense tropical rainforests have density under 1 person per sq km due to severe climatic constraints.",
        difficulty: "easy",
      },
      {
        id: "geo_u2_q10",
        question: "What is 'Natural Increase' in population studies?",
        type: "standard",
        options: [
          { id: "A", text: "Total population minus net migrants" },
          { id: "B", text: "Crude Birth Rate minus Crude Death Rate" },
          { id: "C", text: "In-migration minus out-migration" },
          { id: "D", text: "Total births plus immigrants" },
        ],
        correctOption: "B",
        explanation: "Natural increase is simply the excess of births over deaths in a given population (CBR - CDR).",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Human Geography Nature & Scope"],
      relatedTopics: ["Human Activities", "Indian Demographic Dynamics"],
      practiceTestId: "practice-geo-unit2-test1",
      practiceTestUrl: "/test/practice-geo-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=geo",
      weaknessRadarUrl: "/dashboard/radar?subject=geo",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 3: Human Activities (Primary, Secondary, Tertiary)
  // -------------------------------------------------------------------------
  {
    id: "geo_u3_t1",
    slug: "subsistence-and-commercial-agriculture-mining-manufacturing-service-sectors",
    subject: "geo",
    subjectName: "Geography",
    subjectCode: "313",
    unitNumber: 3,
    unitTitle: "Human Activities (Primary, Secondary, Tertiary)",
    topicTitle: "Subsistence & Commercial Agriculture, Mining, Manufacturing, Service Sectors",
    ncertReference: {
      class: "12",
      book: "Fundamentals of Human Geography",
      chapterNumber: 4,
      chapterName: "Primary, Secondary, Tertiary and Quaternary Activities",
      sections: [
        "Hunting and Gathering, Pastoralism",
        "Agriculture: Subsistence, Plantation, Extensive Commercial, Mixed, Dairy, Mediterranean",
        "Mining: Surface and Shaft Mining",
        "Secondary Activities: Cottage, Small-scale, Large-scale, Footloose Industries",
        "Tertiary Activities: Trade, Transport, Communication, Services",
        "Quaternary and Quinary Activities",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Massive weightage in CUET (20+ questions across slots)",
      totalPyqsInRepo: 42,
      weightagePercentage: 9.5,
    },
    summary30Seconds: [
      "Primary Activities: Directly dependent on environment (hunting, pastoralism, agriculture, mining). Shifting cultivation known as Jhuming (NE India), Milpa (Central America), Ladang (Malaysia/Indonesia).",
      "Plantation Agriculture: Large estates, single crop, foreign capital, managerial staff (Tea in India/Sri Lanka, Rubber in Malaysia, Coffee/Fazendas in Brazil, Cocoa in Ghana).",
      "Extensive Commercial Grain Cultivation: Low yield per hectare but high yield per person; temperate grasslands (Steppes, Prairies, Pampas, Velds, Downs).",
      "Mediterranean Agriculture: Highly specialised viticulture (grapes for wine) and citrus fruits.",
      "Industry Classification: Footloose industries not tied to raw materials; Quaternary = information/knowledge; Quinary = highest decision-makers ('gold collar').",
    ],
    coreConcepts: [
      {
        title: "1. Agriculture Types & Global Spatial Distribution",
        content:
          "NCERT classifies agricultural systems based on economic organisation and physical factors:\n\n" +
          "• **Shifting Cultivation / Slash and Burn**:\n" +
          "  - Practised by indigenous tribes in tropical forests.\n" +
          "  - Vegetation cleared by fire; ashes add potash to soil. Land abandoned after 3-5 years due to loss of soil fertility.\n" +
          "  - Regional names: **Jhuming** (North-East India), **Milpa** (Central America and Mexico), **Ladang** (Malaysia and Indonesia).\n\n" +
          "• **Intensive Subsistence Agriculture**:\n" +
          "  - **Wet Paddy Dominated**: High population density (Monsoon Asia); high yield per unit area but low yield per labourer; animal and manual labour.\n" +
          "  - **Other Crops Dominated**: Wheat, barley, soya bean, sorghum in areas with lower rainfall (North China, Manchuria, Indo-Gangetic Plains).\n\n" +
          "• **Plantation Agriculture**:\n" +
          "  - Introduced by European colonial powers.\n" +
          "  - Characteristics: Large estates, single cash crop, heavy capital investment, technical and managerial support, cheap migrant labour, integrated processing units.\n" +
          "  - Key crops: Tea (India, Sri Lanka), Coffee (Brazil, Colombia), Rubber (Malaysia, Indonesia), Sugarcane (Cuba, Brazil), Cocoa (Ghana, Ivory Coast), Banana (Central America). In Brazil, coffee plantations are termed **Fazendas**.\n\n" +
          "• **Extensive Commercial Grain Farming**:\n" +
          "  - Practised in interior temperate continental grasslands with low population density.\n" +
          "  - Highly mechanised: tractors, combine harvesters. Low yield per hectare, but exceptionally high yield per worker.\n" +
          "  - Regions: Eurasian **Steppes**, North American **Prairies**, Argentine **Pampas**, South African **Velds**, Australian **Downs**, New Zealand **Canterbury Plains**.\n\n" +
          "• **Dairy Farming**:\n" +
          "  - Most advanced, efficient, and capital-intensive livestock rearing.\n" +
          "  - Proximity to urban industrial centres (perishable milk).\n" +
          "  - 3 main regions: North-Western Europe (largest), Canada, South-Eastern Australia & New Zealand.\n\n" +
          "• **Mediterranean Agriculture**:\n" +
          "  - Highly specialised commercial farming around the Mediterranean Sea, California, Central Chile, South-Western South Africa, South and South-West Australia.\n" +
          "  - Renowned for **viticulture** (grape cultivation for high-grade wine), olives, figs, and citrus fruits.",
        ncertPointers: [
          "Local names of shifting cultivation (Milpa, Ladang, Jhuming) are tested in nearly every CUET exam.",
          "Remember: Fazendas = Brazilian coffee plantations.",
          "Distinguish: Extensive grain farming = LOW yield per hectare, HIGH yield per worker.",
        ],
      },
      {
        title: "2. Mining Methods: Surface vs Underground",
        content:
          "Mining is influenced by physical factors (size, grade, depth of ore) and economic factors (demand, technology, capital, infrastructure).\n" +
          "• **Surface Mining (Open-cast)**: Cheapest and easiest method; used when minerals lie close to the surface; low overhead costs, safety precautions minimal.\n" +
          "• **Underground Mining (Shaft method)**: Required when ore lies deep below the surface; uses vertical shafts and underground galleries; needs elevators, drills, haulage vehicles, ventilation, and lighting. Highly capital-intensive and carries hazards (poisonous gases, roof collapse, flooding).",
        ncertPointers: [
          "Open-cast is also called surface mining; shaft method is underground mining.",
        ],
      },
      {
        title: "3. Secondary Activities & Industrial Classification",
        content:
          "Secondary activities transform raw materials into finished products with added value.\n" +
          "• **Classification by Scale**:\n" +
          "  - *Household/Cottage*: Smallest unit, local raw materials, simple tools, family labour, products consumed locally or sold in local markets.\n" +
          "  - *Small-scale*: Local raw materials, power-driven machinery, semi-skilled labour, creates extensive local employment.\n" +
          "  - *Large-scale*: Massive capital investment, specialised assembly-line production, advanced technology, huge power and raw material consumption.\n\n" +
          "• **Footloose Industries**:\n" +
          "  - Industries that do not depend on any specific raw material (neither weight-losing nor weight-gaining).\n" +
          "  - Can be located in a wide variety of places; largely dependent on component parts delivered by road transport; light pollution, small labour force (e.g., electronic chip assembly).",
        ncertPointers: [
          "Footloose industries have accessibility as the sole spatial determinant; not tied to raw material sources.",
        ],
      },
      {
        title: "4. Tertiary, Quaternary and Quinary Sectors",
        content:
          "• **Tertiary Activities**: Production of services rather than tangible goods. Includes wholesale and retail trade, transport networks, communication, finance, personal and professional services.\n" +
          "• **Quaternary Activities**: Knowledge-based activities involving processing, collection, research, and dissemination of information. Software developers, tax consultants, financial analysts, mutual fund managers ('white collar').\n" +
          "• **Quinary Activities**: Highest level of decision-making and policy formulation. Focus on the creation, re-arrangement, and evaluation of new and existing ideas. Includes government ministers, corporate CEOs, research scientists, policy advisors ('**Gold Collar**' workers).",
        ncertPointers: [
          "Remember collar colours: Primary = Red collar; Secondary = Blue collar; Tertiary = Pink collar; Quaternary = White collar; Quinary = Gold collar.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Temperate Grasslands for Commercial Grain Farming",
        formula: "Steppes (Eurasia) | Prairies (N. America) | Pampas (Argentina) | Velds (S. Africa) | Downs (Australia) | Canterbury (NZ)",
        symbols: "Global Grassland Regions",
        siUnits: "Extensive Commercial Wheat Belts",
        applicationCondition: "Matching grasslands with geographic regions",
        notes: "Highly mechanised; low yield per hectare, very high yield per man.",
      },
      {
        name: "Shifting Cultivation Nomenclature",
        formula: "Jhuming (NE India) | Milpa (Central America/Mexico) | Ladang (Malaysia/Indonesia)",
        symbols: "Slash-and-burn systems",
        siUnits: "Traditional agricultural typologies",
        applicationCondition: "Direct match-the-following in CUET",
        notes: "Vegetation cleared and burnt; ash enriches soil temporarily.",
      },
      {
        name: "Collar Color Categorisation",
        formula: "Red (Primary) | Blue (Secondary) | Pink (Tertiary) | White (Quaternary) | Gold (Quinary)",
        symbols: "Occupational Stratification",
        siUnits: "Economic Geography Classifications",
        applicationCondition: "Direct multiple choice on labor categories",
        notes: "Quinary includes top policy makers and executives (gold collar).",
      },
    ],
    diagram: {
      type: "svg",
      title: "Spectrum of Economic Activities",
      caption: "From Primary resource extraction to Quinary top-level decision making.",
      code: `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <rect x="15" y="40" width="125" height="140" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <text x="77" y="70" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="13">Primary</text>
        <text x="77" y="95" text-anchor="middle" fill="#7f1d1d" font-size="11">Agriculture</text>
        <text x="77" y="115" text-anchor="middle" fill="#7f1d1d" font-size="11">Mining, Fishing</text>
        <text x="77" y="150" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="11">Red Collar</text>

        <rect x="155" y="40" width="125" height="140" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
        <text x="217" y="70" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="13">Secondary</text>
        <text x="217" y="95" text-anchor="middle" fill="#1e3a8a" font-size="11">Manufacturing</text>
        <text x="217" y="115" text-anchor="middle" fill="#1e3a8a" font-size="11">Processing</text>
        <text x="217" y="150" text-anchor="middle" font-weight="bold" fill="#1d4ed8" font-size="11">Blue Collar</text>

        <rect x="295" y="40" width="125" height="140" rx="8" fill="#fce7f3" stroke="#db2777" stroke-width="2"/>
        <text x="357" y="70" text-anchor="middle" font-weight="bold" fill="#9d174d" font-size="13">Tertiary</text>
        <text x="357" y="95" text-anchor="middle" fill="#831843" font-size="11">Trade, Transport</text>
        <text x="357" y="115" text-anchor="middle" fill="#831843" font-size="11">Services, Tourism</text>
        <text x="357" y="150" text-anchor="middle" font-weight="bold" fill="#be185d" font-size="11">Pink Collar</text>

        <rect x="435" y="40" width="125" height="140" rx="8" fill="#f3e8ff" stroke="#9333ea" stroke-width="2"/>
        <text x="497" y="70" text-anchor="middle" font-weight="bold" fill="#6b21a8" font-size="13">Quaternary</text>
        <text x="497" y="95" text-anchor="middle" fill="#581c87" font-size="11">R&amp;D, Software</text>
        <text x="497" y="115" text-anchor="middle" fill="#581c87" font-size="11">Information</text>
        <text x="497" y="150" text-anchor="middle" font-weight="bold" fill="#7e22ce" font-size="11">White Collar</text>

        <rect x="575" y="40" width="130" height="140" rx="8" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
        <text x="640" y="70" text-anchor="middle" font-weight="bold" fill="#854d0e" font-size="13">Quinary</text>
        <text x="640" y="95" text-anchor="middle" fill="#713f12" font-size="11">Policy Makers</text>
        <text x="640" y="115" text-anchor="middle" fill="#713f12" font-size="11">CEOs, Scientists</text>
        <text x="640" y="150" text-anchor="middle" font-weight="bold" fill="#a16207" font-size="11">Gold Collar</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <rect x="15" y="40" width="125" height="140" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
      <text x="77" y="70" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="13">Primary</text>
      <text x="77" y="95" text-anchor="middle" fill="#7f1d1d" font-size="11">Agriculture</text>
      <text x="77" y="115" text-anchor="middle" fill="#7f1d1d" font-size="11">Mining, Fishing</text>
      <text x="77" y="150" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="11">Red Collar</text>

      <rect x="155" y="40" width="125" height="140" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
      <text x="217" y="70" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="13">Secondary</text>
      <text x="217" y="95" text-anchor="middle" fill="#1e3a8a" font-size="11">Manufacturing</text>
      <text x="217" y="115" text-anchor="middle" fill="#1e3a8a" font-size="11">Processing</text>
      <text x="217" y="150" text-anchor="middle" font-weight="bold" fill="#1d4ed8" font-size="11">Blue Collar</text>

      <rect x="295" y="40" width="125" height="140" rx="8" fill="#fce7f3" stroke="#db2777" stroke-width="2"/>
      <text x="357" y="70" text-anchor="middle" font-weight="bold" fill="#9d174d" font-size="13">Tertiary</text>
      <text x="357" y="95" text-anchor="middle" fill="#831843" font-size="11">Trade, Transport</text>
      <text x="357" y="115" text-anchor="middle" fill="#831843" font-size="11">Services, Tourism</text>
      <text x="357" y="150" text-anchor="middle" font-weight="bold" fill="#be185d" font-size="11">Pink Collar</text>

      <rect x="435" y="40" width="125" height="140" rx="8" fill="#f3e8ff" stroke="#9333ea" stroke-width="2"/>
      <text x="497" y="70" text-anchor="middle" font-weight="bold" fill="#6b21a8" font-size="13">Quaternary</text>
      <text x="497" y="95" text-anchor="middle" fill="#581c87" font-size="11">R&amp;D, Software</text>
      <text x="497" y="115" text-anchor="middle" fill="#581c87" font-size="11">Information</text>
      <text x="497" y="150" text-anchor="middle" font-weight="bold" fill="#7e22ce" font-size="11">White Collar</text>

      <rect x="575" y="40" width="130" height="140" rx="8" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
      <text x="640" y="70" text-anchor="middle" font-weight="bold" fill="#854d0e" font-size="13">Quinary</text>
      <text x="640" y="95" text-anchor="middle" fill="#713f12" font-size="11">Policy Makers</text>
      <text x="640" y="115" text-anchor="middle" fill="#713f12" font-size="11">CEOs, Scientists</text>
      <text x="640" y="150" text-anchor="middle" font-weight="bold" fill="#a16207" font-size="11">Gold Collar</text>
    </svg>`,
    workedExamples: [
      {
        id: "geo_u3_we1",
        questionNumber: 1,
        question:
          "Which of the following statements regarding 'Extensive Commercial Grain Cultivation' is correct?\n" +
          "(A) Yield per hectare is very high, but yield per worker is low.\n" +
          "(B) Yield per hectare is low, but yield per worker is high.\n" +
          "(C) It is practised exclusively in tropical rainforest valleys.\n" +
          "(D) It relies primarily on manual family labour with primitive hoes.",
        options: [
          { id: "A", text: "Yield per hectare is very high, but yield per worker is low." },
          { id: "B", text: "Yield per hectare is low, but yield per worker is high." },
          { id: "C", text: "It is practised exclusively in tropical rainforest valleys." },
          { id: "D", text: "It relies primarily on manual family labour with primitive hoes." },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Extensive commercial grain cultivation takes place in vast temperate grasslands with low population density.",
          "Step 2: Operations are heavily mechanised across vast farms. Because farm size is enormous, yield per hectare is relatively low compared to intensive farming, but yield per person is very high.",
          "Step 3: Option B correctly reflects this hallmark NCERT distinction.",
        ],
        cuetTip: "Intensive = High per hectare, Low per worker; Extensive = Low per hectare, High per worker.",
      },
      {
        id: "geo_u3_we2",
        questionNumber: 2,
        question:
          "In Brazil, large coffee plantations managed on a commercial corporate scale are traditionally known as:\n" +
          "(A) Kolkhoz\n" +
          "(B) Fazendas\n" +
          "(C) Estancias\n" +
          "(D) Milpas",
        options: [
          { id: "A", text: "Kolkhoz" },
          { id: "B", text: "Fazendas" },
          { id: "C", text: "Estancias" },
          { id: "D", text: "Milpas" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: NCERT explicitly defines Fazendas as the large coffee plantations in Brazil.",
          "Step 2: Kolkhoz is collective farming in the former Soviet Union; Milpa is shifting cultivation in Central America.",
          "Step 3: Correct answer is Fazendas (Option B).",
        ],
        cuetTip: "Watch out for Kolkhoz (USSR collective farm) vs Fazendas (Brazil coffee estate).",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Regional Nomenclature of Shifting Cultivation",
        frequency: "Extremely High",
        typicalStem: "Match the regional name of shifting agriculture with the corresponding area: Milpa, Ladang, Jhuming.",
        strategy: "Memorise: Jhuming = NE India, Milpa = Mexico/Central America, Ladang = Malaysia/Indonesia, Ray = Vietnam.",
      },
      {
        patternType: "Classification of Collar Colors",
        frequency: "High",
        typicalStem: "'Gold Collar' workers represent which sector of economic activities?",
        strategy: "Quinary activities represent the highest decision-makers and policy architects, termed Gold Collar.",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing Extensive Grain Cultivation with Intensive Subsistence Agriculture yields.",
        whyWrong: "Students often flip the two: Intensive Subsistence has high yield per hectare (due to intensive manual labour on tiny plots) but low yield per worker. Extensive has low yield per hectare but high yield per worker.",
        correctUnderstanding: "Intensive = High/hectare, Low/worker; Extensive = Low/hectare, High/worker.",
        trapOptionExample: "Option stating Intensive paddy farming has high yield per worker.",
      },
      {
        misconception: "Assuming Footloose industries require heavy raw materials.",
        whyWrong: "Footloose industries are completely independent of raw material weight or perishability; they rely on universally available component parts delivered by road.",
        correctUnderstanding: "Footloose industries can be located anywhere with good transport links.",
        trapOptionExample: "Stating iron and steel smelting is a footloose industry.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Grassland Regions Mnemonic",
        mnemonic: "S-P-P-V-D-C (Some People Prefer Very Delicious Cookies)",
        rule: "Steppes (Eurasia), Prairies (N. America), Pampas (Argentina), Velds (S. Africa), Downs (Australia), Canterbury (NZ)",
        explanation: "Never forget the six temperate grasslands of extensive grain cultivation.",
      },
      {
        title: "Shifting Agriculture Acronym",
        mnemonic: "M-M / L-M / J-I",
        rule: "Milpa = Mexico | Ladang = Malaysia | Jhuming = India",
        explanation: "Quick mental check during matching questions in CUET.",
      },
    ],
    quickRevisionCard: {
      title: "Human Activities — 60-Second Flash Card",
      bulletPoints: [
        "Shifting Cultivation: Jhuming (NE India), Milpa (Central America), Ladang (Malaysia).",
        "Plantation Agriculture: Colonial origin, single crop, large estates, capital intensive; Fazendas = Brazilian coffee estates.",
        "Extensive Commercial Grain: Temperate grasslands (Steppes, Prairies, Pampas, Velds, Downs); low yield/hectare, high yield/worker.",
        "Dairy Farming: Highly capital intensive, perishable milk near cities; NW Europe is largest region.",
        "Mediterranean Agriculture: Viticulture (grapes for wine), citrus fruits, olives.",
        "Footloose Industries: Not tied to raw material; depends on transport and component parts.",
        "Economic Sectors: Primary (Red), Secondary (Blue), Tertiary (Pink), Quaternary (White), Quinary (Gold).",
        "Quaternary: R&D, information; Quinary: CEOs, high policy makers, top scientists.",
      ],
      examTricks: [
        "Kolkhoz = Soviet collective farming introduced to improve agrarian efficiency.",
        "Viticulture is the signature specialty of Mediterranean agriculture.",
      ],
    },
    practiceQuestions: [
      {
        id: "geo_u3_q1",
        question: "In which of the following regions is 'Ladang' the regional term for shifting cultivation?",
        type: "standard",
        options: [
          { id: "A", text: "North-East India" },
          { id: "B", text: "Mexico and Central America" },
          { id: "C", text: "Malaysia and Indonesia" },
          { id: "D", text: "Sri Lanka" },
        ],
        correctOption: "C",
        explanation: "Shifting cultivation is called Ladang in Malaysia and Indonesia, Milpa in Central America, and Jhuming in North-East India.",
        difficulty: "easy",
      },
      {
        id: "geo_u3_q2",
        question: "Viticulture is a highly specialised branch of agriculture associated with which climatic region?",
        type: "standard",
        options: [
          { id: "A", text: "Monsoon Asia" },
          { id: "B", text: "Mediterranean region" },
          { id: "C", text: "Equatorial rainforests" },
          { id: "D", text: "Temperate grasslands" },
        ],
        correctOption: "B",
        explanation: "Viticulture, or grape cultivation, is the defining characteristic of Mediterranean agriculture for producing premium wines.",
        difficulty: "easy",
      },
      {
        id: "geo_u3_q3",
        question:
          "Assertion (A): Dairy farming is the most advanced, efficient, and capital-intensive type of livestock rearing.\n" +
          "Reason (R): It requires substantial capital for animal sheds, storage facilities for fodder, milking machines, and veterinary care.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Dairy farming is capital-intensive because cattle care, disease management, artificial insemination, and cold-chain infrastructure demand high investment.",
        difficulty: "medium",
      },
      {
        id: "geo_u3_q4",
        question: "Which of the following grasslands is correctly matched with its geographical location?",
        type: "standard",
        options: [
          { id: "A", text: "Pampas — North America" },
          { id: "B", text: "Downs — Australia" },
          { id: "C", text: "Velds — Argentina" },
          { id: "D", text: "Steppes — South Africa" },
        ],
        correctOption: "B",
        explanation: "Downs are in Australia, Prairies in North America, Pampas in Argentina, and Velds in South Africa.",
        difficulty: "easy",
      },
      {
        id: "geo_u3_q5",
        question:
          "Match List-I (Economic Sector / Worker Category) with List-II (Dominant Activity / Collar Color):\n" +
          "List-I:\n" +
          "p. Primary activities\n" +
          "q. Secondary activities\n" +
          "r. Quaternary activities\n" +
          "s. Quinary activities\n" +
          "List-II:\n" +
          "1. Information generation and R&D (White collar)\n" +
          "2. Resource extraction and agriculture (Red collar)\n" +
          "3. Highest level decision-making and policy formulation (Gold collar)\n" +
          "4. Manufacturing and processing (Blue collar)\n" +
          "Choose the correct match:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-2, q-4, r-1, s-3" },
          { id: "B", text: "p-4, q-2, r-3, s-1" },
          { id: "C", text: "p-2, q-1, r-4, s-3" },
          { id: "D", text: "p-3, q-4, r-1, s-2" },
        ],
        correctOption: "A",
        explanation: "p-2 (Primary = Red), q-4 (Secondary = Blue), r-1 (Quaternary = White), s-3 (Quinary = Gold).",
        difficulty: "medium",
      },
      {
        id: "geo_u3_q6",
        question: "Industries that are not tied to any specific raw material and can locate in a wide variety of places are known as:",
        type: "standard",
        options: [
          { id: "A", text: "Basic industries" },
          { id: "B", text: "Footloose industries" },
          { id: "C", text: "Agro-based industries" },
          { id: "D", text: "Heavy engineering industries" },
        ],
        correctOption: "B",
        explanation: "Footloose industries depend on component parts delivered by road, produce non-weight-losing items, and have light environmental footprint.",
        difficulty: "easy",
      },
      {
        id: "geo_u3_q7",
        question: "Which of the following was the collective farming model introduced in the former Soviet Union?",
        type: "standard",
        options: [
          { id: "A", text: "Fazenda" },
          { id: "B", text: "Kolkhoz" },
          { id: "C", text: "Ejido" },
          { id: "D", text: "Kibbutz" },
        ],
        correctOption: "B",
        explanation: "Kolkhoz was the Soviet collective agricultural system where farmers pooled resources under state supervision to boost agricultural output.",
        difficulty: "medium",
      },
      {
        id: "geo_u3_q8",
        question: "Which mining method is the cheapest and is used when mineral ores lie close to Earth's surface?",
        type: "standard",
        options: [
          { id: "A", text: "Shaft mining" },
          { id: "B", text: "Open-cast (Surface) mining" },
          { id: "C", text: "Drift mining" },
          { id: "D", text: "Sub-sea mining" },
        ],
        correctOption: "B",
        explanation: "Surface or open-cast mining is the cheapest and simplest method when minerals lie close to the surface.",
        difficulty: "easy",
      },
      {
        id: "geo_u3_q9",
        question:
          "Assertion (A): Plantation agriculture was introduced by European colonial powers in tropical colonies.\n" +
          "Reason (R): European colonial powers sought to secure supplies of tropical commodities like tea, coffee, rubber, and cocoa for their home markets.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Plantations were created as commercial enclaves in tropical colonies to supply raw cash crops for European domestic industrial markets.",
        difficulty: "easy",
      },
      {
        id: "geo_u3_q10",
        question: "Which country is renowned for 'Cooperative Farming' where almost every farmer is a member of a cooperative society?",
        type: "standard",
        options: [
          { id: "A", text: "Russia" },
          { id: "B", text: "Denmark" },
          { id: "C", text: "Brazil" },
          { id: "D", text: "Australia" },
        ],
        correctOption: "B",
        explanation: "Cooperative farming achieved its greatest success in Denmark, where practically every single farmer is a member of a cooperative.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["Human Geography Nature & Scope"],
      relatedTopics: ["Transport, Communication and International Trade", "India: Resources and Development"],
      practiceTestId: "practice-geo-unit3-test1",
      practiceTestUrl: "/test/practice-geo-unit3-test1",
      weaknessReportUrl: "/dashboard/radar?subject=geo",
      weaknessRadarUrl: "/dashboard/radar?subject=geo",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 4: Transport, Communication and International Trade
  // -------------------------------------------------------------------------
  {
    id: "geo_u4_t1",
    slug: "land-water-and-air-transport-pipelines-major-trade-blocs",
    subject: "geo",
    subjectName: "Geography",
    subjectCode: "313",
    unitNumber: 4,
    unitTitle: "Transport, Communication and International Trade",
    topicTitle: "Land, Water and Air Transport, Pipelines, Major Trade Blocs",
    ncertReference: {
      class: "12",
      book: "Fundamentals of Human Geography",
      chapterNumber: 7,
      chapterName: "Transport, Communication and International Trade",
      sections: [
        "Land Transport: Roads, Highways, Border Roads, Railways, Trans-Continental Railways",
        "Water Transport: Inland Waterways (Rhine, Danube, Volga, St. Lawrence), Ocean Routes",
        "Canals: Suez Canal and Panama Canal",
        "Air Transport and Pipelines (Big Inch)",
        "International Trade: Bases, Balance of Trade, Types of Ports, WTO & Regional Trade Blocs",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (18+ questions across slots)",
      totalPyqsInRepo: 38,
      weightagePercentage: 9.0,
    },
    summary30Seconds: [
      "Trans-Siberian Railway: Longest railway in the world (9,332 km), runs from St. Petersburg to Vladivostok; double-tracked and electrified.",
      "Trans-Canadian Railway: 7,050 km, runs from Halifax (Atlantic) to Vancouver (Pacific); line of economic unity for Canada.",
      "Suez Canal (1869): Connects Mediterranean Port Said to Red Sea Port Tewfik/Suez; 160 km; sea-level canal without locks; Ferdinand de Lesseps.",
      "Panama Canal (1914): Connects Atlantic Ocean (Colon) with Pacific Ocean (Panama City); 72 km; lock system (Gatun Lake); shortens NY to SF by 13,000 km.",
      "Inland Waterways: Rhine is the world's most heavily used waterway; Big Inch pipeline transports petroleum from Gulf of Mexico to North-Eastern USA; WTO succeeded GATT on 1 Jan 1995 (HQ: Geneva).",
    ],
    coreConcepts: [
      {
        title: "1. Trans-Continental Railways of the World",
        content:
          "Crucial trans-continental arteries connecting opposite coasts across continents:\n\n" +
          "• **Trans-Siberian Railway (Russia)**:\n" +
          "  - Longest railway in the world: **9,332 km**.\n" +
          "  - Connects **St. Petersburg** in the west to **Vladivostok** on the Pacific coast in the east.\n" +
          "  - Passes through Moscow, Ufa, Novosibirsk, Krasnoyarsk, Irkutsk, Chita, and Khabarovsk.\n" +
          "  - Double-tracked and electrified throughout; connects Asian hinterland to European markets.\n\n" +
          "• **Trans-Canadian Railway (Canada)**:\n" +
          "  - **7,050 km** line constructed in 1886.\n" +
          "  - Connects **Halifax** on the Atlantic coast to **Vancouver** on the Pacific coast via Montreal, Ottawa, Winnipeg, and Calgary.\n" +
          "  - Vital conduit for wheat from the Prairies and coniferous timber to eastern industrial ports.\n\n" +
          "• **The Australian Trans-Continental Railway**:\n" +
          "  - Runs east-west across Australia from **Sydney** (east coast) to **Perth** (west coast) via Broken Hill, Peterborough, Port Augusta, and Kalgoorlie.\n\n" +
          "• **Orient Express**:\n" +
          "  - Runs from **Paris** (France) to **Istanbul** (Turkey) passing through Strasbourg, Munich, Vienna, Budapest, and Belgrade.",
        ncertPointers: [
          "Always remember terminal points: Trans-Siberian = St. Petersburg to Vladivostok; Trans-Canadian = Halifax to Vancouver; Australian = Sydney to Perth.",
        ],
      },
      {
        title: "2. The Great Canals: Suez vs Panama",
        content:
          "Both canals transformed global maritime routes, but have fundamentally different engineering designs:\n\n" +
          "• **Suez Canal**:\n" +
          "  - Constructed in **1869** under French engineer **Ferdinand de Lesseps**.\n" +
          "  - Connects **Port Said** on the Mediterranean Sea with **Port Tewfik / Port Suez** on the Red Sea.\n" +
          "  - Length: ~160 km; sea-level canal with **NO LOCK GATES** (water level is uniform).\n" +
          "  - Avoided the treacherous voyage around the Cape of Good Hope, shortening Liverpool to Mumbai route by ~7,300 km.\n\n" +
          "• **Panama Canal**:\n" +
          "  - Opened in **1914** by the United States across the Isthmus of Panama.\n" +
          "  - Connects **Colon** on the Atlantic Ocean with **Panama City** on the Pacific Ocean.\n" +
          "  - Length: ~72 km; features a **LOCK SYSTEM** (three sets of locks: Miraflores, Pedro Miguel, Gatun) because ships must be raised and lowered across Lake Gatun (85 ft above sea level).\n" +
          "  - Shortened maritime travel between New York and San Francisco by **13,000 km**.",
        ncertPointers: [
          "Crucial contrast: Suez = Sea level, NO LOCKS. Panama = Lock system with Lake Gatun.",
          "Opening years: Suez = 1869; Panama = 1914.",
        ],
      },
      {
        title: "3. Major Inland Waterways & Ocean Routes",
        content:
          "• **Rhine Waterway (Europe)**: Flows through Germany and the Netherlands; navigable for 700 km from Basel (Switzerland) to Rotterdam (North Sea). Connects the heavy industrial Ruhr coalfield; world's most heavily used inland waterway.\n" +
          "• **Danube Waterway**: Rises in Black Forest (Germany) and flows eastward into the Black Sea; navigable up to Sulina; passes through Austria, Slovakia, Hungary, Serbia, Romania.\n" +
          "• **Volga Waterway**: Russia's most important river waterway; drains into the Caspian Sea; connected by canals to Moscow and Baltic Sea.\n" +
          "• **Great Lakes - St. Lawrence Seaway (North America)**: Connects Duluth and Chicago through Lake Superior, Huron, Michigan, Erie, Ontario, and the St. Lawrence river to the Atlantic Ocean.\n\n" +
          "• **Major Ocean Routes**:\n" +
          "  - *North Atlantic Sea Route*: Connects North-Eastern USA and North-Western Europe; busiest ocean highway in the world ('**Big Trunk Route**'); carries 1/4th of global foreign trade.\n" +
          "  - *Mediterranean-Indian Ocean Route*: Passes through Gibraltar, Suez Canal, Red Sea, Indian Ocean; connects Western Europe to East Africa, South Asia, SE Asia, and Australia.\n" +
          "  - *Cape of Good Hope Route*: Connects Western Europe and West Africa with South Africa, Australia, and New Zealand.",
        ncertPointers: [
          "'Big Trunk Route' is the North Atlantic Sea Route; Rhine is the busiest inland river.",
        ],
      },
      {
        title: "4. Pipelines & World Trade Organisation (WTO)",
        content:
          "• **Pipelines**: Ideal for transporting liquid petroleum, natural gas, chemicals, and coal slurries without transit loss or delay.\n" +
          "  - **Big Inch**: Famous 24-inch pipeline in the USA transporting crude petroleum from the oil wells of the **Gulf of Mexico** to refineries in the **North-Eastern states**.\n\n" +
          "• **International Trade Concepts**:\n" +
          "  - **Balance of Trade**: Difference between value of exports and imports. Positive/Favourable = Exports > Imports; Negative/Unfavourable = Imports > Exports.\n" +
          "  - **Dumping**: Practice of selling a commodity in two markets at different prices, specifically selling abroad at a price lower than domestic production cost.\n\n" +
          "• **World Trade Organisation (WTO)**:\n" +
          "  - Established on **1 January 1995**, transforming the General Agreement on Tariffs and Trade (GATT, founded 1948).\n" +
          "  - Headquarters: **Geneva, Switzerland**.\n" +
          "  - Only international agency dealing with global rules of trade between nations.\n\n" +
          "• **Major Regional Trade Blocs**:\n" +
          "  - **ASEAN** (Jakarta HQ): Southeast Asian nations.\n" +
          "  - **EU** (Brussels HQ): European Union, single currency Euro.\n" +
          "  - **OPEC** (Vienna HQ): Oil producing and exporting countries.",
        ncertPointers: [
          "Big Inch transports petroleum, NOT natural gas or water.",
          "WTO establishment date: 1 January 1995 (Geneva HQ).",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Suez vs Panama Canal Structural Comparison",
        formula: "Suez (1869, 160km, Sea Level, No Locks) vs Panama (1914, 72km, Lock System, Lake Gatun)",
        symbols: "Med-Red Sea vs Atlantic-Pacific",
        siUnits: "Canal Engineering Specifications",
        applicationCondition: "Direct comparative questions in CUET",
        notes: "Suez cut ~7,300 km (Liverpool-Mumbai); Panama cut ~13,000 km (NY-San Francisco).",
      },
      {
        name: "Major Trans-Continental Terminus Points",
        formula: "Trans-Siberian: St. Petersburg - Vladivostok | Trans-Canadian: Halifax - Vancouver | Australian: Sydney - Perth",
        symbols: "Ocean to Ocean Transits",
        siUnits: "Railway networks",
        applicationCondition: "CUET route and station attribution questions",
        notes: "Trans-Siberian: 9332 km, world's longest.",
      },
      {
        name: "Regional Trade Blocs and Headquarters",
        formula: "WTO: Geneva | EU: Brussels | ASEAN: Jakarta | OPEC: Vienna | NAFTA/USMCA",
        symbols: "Global Trade Governance",
        siUnits: "Institutional locations",
        applicationCondition: "Match-the-following on trade blocs",
        notes: "OPEC headquarters is in Vienna, Austria, even though Austria is not an oil-exporting member.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Comparison of Suez and Panama Canals",
      caption: "Structural elevation and lock mechanisms: Suez (sea level) vs Panama (locks and Gatun Lake).",
      code: `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <!-- Suez Canal Panel -->
        <rect x="20" y="30" width="325" height="175" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
        <text x="182" y="60" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="14">Suez Canal (1869)</text>
        <text x="182" y="85" text-anchor="middle" fill="#1d4ed8" font-size="12">Mediterranean Sea to Red Sea</text>
        <text x="182" y="110" text-anchor="middle" fill="#334155" font-size="11">Port Said &lt;---- 160 km ----&gt; Port Suez</text>
        <rect x="50" y="125" width="265" height="20" fill="#60a5fa" rx="3"/>
        <text x="182" y="140" text-anchor="middle" fill="#ffffff" font-weight="bold" font-size="11">Sea Level Canal (NO LOCKS)</text>
        <text x="182" y="175" text-anchor="middle" fill="#047857" font-weight="bold" font-size="11">Saves ~7,300 km (Liverpool - Mumbai)</text>

        <!-- Panama Canal Panel -->
        <rect x="375" y="30" width="325" height="175" rx="8" fill="#fefce8" stroke="#eab308" stroke-width="2"/>
        <text x="537" y="60" text-anchor="middle" font-weight="bold" fill="#854d0e" font-size="14">Panama Canal (1914)</text>
        <text x="537" y="85" text-anchor="middle" fill="#a16207" font-size="12">Atlantic Ocean to Pacific Ocean</text>
        <text x="537" y="110" text-anchor="middle" fill="#334155" font-size="11">Colon &lt;---- 72 km ----&gt; Panama City</text>
        <!-- Lock steps -->
        <rect x="395" y="135" width="60" height="20" fill="#facc15" rx="2"/>
        <rect x="470" y="120" width="135" height="35" fill="#ca8a04" rx="2"/>
        <rect x="620" y="135" width="60" height="20" fill="#facc15" rx="2"/>
        <text x="537" y="142" text-anchor="middle" fill="#ffffff" font-weight="bold" font-size="11">Gatun Lake (85 ft Locks)</text>
        <text x="537" y="175" text-anchor="middle" fill="#b45309" font-weight="bold" font-size="11">Saves ~13,000 km (NY - San Francisco)</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <!-- Suez Canal Panel -->
      <rect x="20" y="30" width="325" height="175" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
      <text x="182" y="60" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="14">Suez Canal (1869)</text>
      <text x="182" y="85" text-anchor="middle" fill="#1d4ed8" font-size="12">Mediterranean Sea to Red Sea</text>
      <text x="182" y="110" text-anchor="middle" fill="#334155" font-size="11">Port Said &lt;---- 160 km ----&gt; Port Suez</text>
      <rect x="50" y="125" width="265" height="20" fill="#60a5fa" rx="3"/>
      <text x="182" y="140" text-anchor="middle" fill="#ffffff" font-weight="bold" font-size="11">Sea Level Canal (NO LOCKS)</text>
      <text x="182" y="175" text-anchor="middle" fill="#047857" font-weight="bold" font-size="11">Saves ~7,300 km (Liverpool - Mumbai)</text>

      <!-- Panama Canal Panel -->
      <rect x="375" y="30" width="325" height="175" rx="8" fill="#fefce8" stroke="#eab308" stroke-width="2"/>
      <text x="537" y="60" text-anchor="middle" font-weight="bold" fill="#854d0e" font-size="14">Panama Canal (1914)</text>
      <text x="537" y="85" text-anchor="middle" fill="#a16207" font-size="12">Atlantic Ocean to Pacific Ocean</text>
      <text x="537" y="110" text-anchor="middle" fill="#334155" font-size="11">Colon &lt;---- 72 km ----&gt; Panama City</text>
      <!-- Lock steps -->
      <rect x="395" y="135" width="60" height="20" fill="#facc15" rx="2"/>
      <rect x="470" y="120" width="135" height="35" fill="#ca8a04" rx="2"/>
      <rect x="620" y="135" width="60" height="20" fill="#facc15" rx="2"/>
      <text x="537" y="142" text-anchor="middle" fill="#ffffff" font-weight="bold" font-size="11">Gatun Lake (85 ft Locks)</text>
      <text x="537" y="175" text-anchor="middle" fill="#b45309" font-weight="bold" font-size="11">Saves ~13,000 km (NY - San Francisco)</text>
    </svg>`,
    workedExamples: [
      {
        id: "geo_u4_we1",
        questionNumber: 1,
        question:
          "Which of the following ports mark the northern and southern entrances of the Suez Canal, respectively?\n" +
          "(A) Port Colon and Panama City\n" +
          "(B) Port Said and Port Tewfik (Suez)\n" +
          "(C) Alexandria and Cairo\n" +
          "(D) Tripoli and Port Sudan",
        options: [
          { id: "A", text: "Port Colon and Panama City" },
          { id: "B", text: "Port Said and Port Tewfik (Suez)" },
          { id: "C", text: "Alexandria and Cairo" },
          { id: "D", text: "Tripoli and Port Sudan" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: The Suez Canal connects the Mediterranean Sea to the Red Sea.",
          "Step 2: On the northern Mediterranean end sits Port Said.",
          "Step 3: On the southern Red Sea end sits Port Tewfik (also known as Port Suez).",
          "Step 4: Option B is the correct pair.",
        ],
        cuetTip: "North = Port Said (Mediterranean); South = Port Tewfik/Suez (Red Sea).",
      },
      {
        id: "geo_u4_we2",
        questionNumber: 2,
        question:
          "The 'Big Inch' is a famous pipeline that transports which of the following commodities in the United States?\n" +
          "(A) Natural gas from Alaska to Texas\n" +
          "(B) Petroleum from the Gulf of Mexico to the North-Eastern states\n" +
          "(C) Refined iron ore slurry from the Great Lakes to Pittsburgh\n" +
          "(D) Potable water from the Rocky Mountains to California",
        options: [
          { id: "A", text: "Natural gas from Alaska to Texas" },
          { id: "B", text: "Petroleum from the Gulf of Mexico to the North-Eastern states" },
          { id: "C", text: "Refined iron ore slurry from the Great Lakes to Pittsburgh" },
          { id: "D", text: "Potable water from the Rocky Mountains to California" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Locate 'Big Inch' in NCERT Class 12 Fundamentals of Human Geography under Pipelines.",
          "Step 2: Big Inch is a 24-inch pipeline constructed during World War II.",
          "Step 3: It carries crude petroleum from the oil wells of the Gulf of Mexico to refineries in the industrial North-Eastern states.",
        ],
        cuetTip: "Big Inch = Petroleum from Gulf of Mexico to North-East USA.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Terminal Points of Trans-Continental Railways",
        frequency: "Very High",
        typicalStem: "Which are the terminal stations of the Trans-Siberian Railway?",
        strategy: "Memorise: Trans-Siberian (St. Petersburg to Vladivostok), Trans-Canadian (Halifax to Vancouver), Australian (Sydney to Perth).",
      },
      {
        patternType: "Inland Waterways Commercial Dominance",
        frequency: "High",
        typicalStem: "Which is the most heavily used inland waterway in the world?",
        strategy: "The Rhine waterway flowing through Germany and the Netherlands into the North Sea is the world's most heavily utilised inland waterway.",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing Suez Canal has a lock system like Panama.",
        whyWrong: "Suez Canal is cut through flat desert at sea level and has NO locks; water flows freely between the Mediterranean and Red Sea. Panama has three tiers of locks to raise ships to Lake Gatun.",
        correctUnderstanding: "Suez = No locks; Panama = Lock system.",
        trapOptionExample: "Option claiming ships are raised by lock gates in Suez Canal.",
      },
      {
        misconception: "Confusing GATT and WTO establishment years.",
        whyWrong: "GATT was established in 1948 after WWII; WTO came into force on 1 January 1995.",
        correctUnderstanding: "GATT = 1948; WTO = 1995 (Geneva HQ).",
        trapOptionExample: "Stating WTO was formed in 1948.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Canal Lock Shortcut",
        mnemonic: "S-E-A (Suez = Entirely At sea level)",
        rule: "Suez is sea level, Panama has locks",
        explanation: "Never confuse lock requirements in the two famous canals.",
      },
      {
        title: "Trans-Canadian Terminals",
        mnemonic: "H-to-V (Halifax to Vancouver)",
        rule: "Atlantic coast (Halifax) to Pacific coast (Vancouver)",
        explanation: "Immediate recall for Canadian railway terminal cities.",
      },
    ],
    quickRevisionCard: {
      title: "Transport & Trade — 60-Second Flash Card",
      bulletPoints: [
        "Trans-Siberian: Longest railway (9,332 km), St. Petersburg to Vladivostok; double-tracked & electrified.",
        "Trans-Canadian: 7,050 km, Halifax to Vancouver; opened 1886; transports Prairie wheat & timber.",
        "Australian Trans-Continental: Sydney to Perth via Kalgoorlie.",
        "Suez Canal (1869): Port Said to Port Tewfik/Suez; 160 km; sea-level, NO locks; saves 7,300 km.",
        "Panama Canal (1914): Colon to Panama City; 72 km; lock system (Lake Gatun); saves 13,000 km.",
        "Rhine Waterway: Busiest inland river in the world (flows through Ruhr basin into Rotterdam).",
        "North Atlantic Route: 'Big Trunk Route', connects NE USA and NW Europe, 1/4th world trade.",
        "Big Inch: 24-inch pipeline carrying petroleum from Gulf of Mexico to NE USA.",
        "WTO: Founded 1 Jan 1995 (replaced GATT 1948); HQ in Geneva, Switzerland.",
      ],
      examTricks: [
        "Suez = 1869; Panama = 1914.",
        "Big Trunk Route is strictly North Atlantic, NOT trans-Pacific.",
      ],
    },
    practiceQuestions: [
      {
        id: "geo_u4_q1",
        question: "The Trans-Siberian Railway connects which of the following terminal cities?",
        type: "standard",
        options: [
          { id: "A", text: "Moscow to Irkutsk" },
          { id: "B", text: "St. Petersburg to Vladivostok" },
          { id: "C", text: "Kiev to Novosibirsk" },
          { id: "D", text: "Minsk to Khabarovsk" },
        ],
        correctOption: "B",
        explanation: "The Trans-Siberian Railway runs across Russia for 9,332 km from St. Petersburg on the Baltic Sea to Vladivostok on the Pacific Ocean.",
        difficulty: "easy",
      },
      {
        id: "geo_u4_q2",
        question: "Which of the following ocean routes is known as the 'Big Trunk Route'?",
        type: "standard",
        options: [
          { id: "A", text: "South Atlantic Route" },
          { id: "B", text: "North Atlantic Sea Route" },
          { id: "C", text: "Cape of Good Hope Route" },
          { id: "D", text: "North Pacific Sea Route" },
        ],
        correctOption: "B",
        explanation: "The North Atlantic Sea Route connects the two most industrially developed regions (NE North America and NW Europe) and carries 1/4th of global trade.",
        difficulty: "easy",
      },
      {
        id: "geo_u4_q3",
        question:
          "Assertion (A): The Panama Canal contains a lock system to raise and lower ships passing through it.\n" +
          "Reason (R): The canal passes through mountainous terrain and ships must be elevated 85 feet to the level of Lake Gatun.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Unlike the sea-level Suez Canal, the Panama Canal navigates varied elevation via Gatun Lake through a three-stage lock system.",
        difficulty: "medium",
      },
      {
        id: "geo_u4_q4",
        question: "In which year did the World Trade Organisation (WTO) officially come into existence, replacing GATT?",
        type: "standard",
        options: [
          { id: "A", text: "1948" },
          { id: "B", text: "1991" },
          { id: "C", text: "1995" },
          { id: "D", text: "2001" },
        ],
        correctOption: "C",
        explanation: "The WTO was established on 1 January 1995, succeeding the General Agreement on Tariffs and Trade (GATT).",
        difficulty: "easy",
      },
      {
        id: "geo_u4_q5",
        question:
          "Match List-I (Inland Waterway / Route) with List-II (Key Feature / Region):\n" +
          "List-I:\n" +
          "p. Rhine Waterway\n" +
          "q. St. Lawrence Seaway\n" +
          "r. Danube Waterway\n" +
          "s. Big Inch Pipeline\n" +
          "List-II:\n" +
          "1. Transports crude petroleum from Gulf of Mexico to NE USA\n" +
          "2. Flows through Ruhr coalfield; world's busiest inland waterway\n" +
          "3. Rises in Black Forest and drains into Black Sea\n" +
          "4. Deep-water canal link between Great Lakes and Atlantic Ocean\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-2, q-4, r-3, s-1" },
          { id: "B", text: "p-4, q-2, r-1, s-3" },
          { id: "C", text: "p-2, q-3, r-4, s-1" },
          { id: "D", text: "p-1, q-4, r-3, s-2" },
        ],
        correctOption: "A",
        explanation: "Rhine (p-2), St. Lawrence (q-4), Danube (r-3), Big Inch (s-1).",
        difficulty: "medium",
      },
      {
        id: "geo_u4_q6",
        question: "What was the primary economic benefit of the opening of the Suez Canal in 1869?",
        type: "standard",
        options: [
          { id: "A", text: "Shortened the voyage between New York and San Francisco by 13,000 km" },
          { id: "B", text: "Reduced the sea route between Liverpool and Mumbai by approximately 7,300 km" },
          { id: "C", text: "Enabled direct river navigation between the Danube and Rhine rivers" },
          { id: "D", text: "Connected Lake Superior directly to the Atlantic Ocean" },
        ],
        correctOption: "B",
        explanation: "By connecting the Mediterranean Sea and Red Sea, the Suez Canal eliminated the voyage around the Cape of Good Hope, saving ~7,300 km between Europe and India.",
        difficulty: "easy",
      },
      {
        id: "geo_u4_q7",
        question: "Which country constructed and originally controlled the Panama Canal until transferring control in 1999?",
        type: "standard",
        options: [
          { id: "A", text: "United Kingdom" },
          { id: "B", text: "France" },
          { id: "C", text: "United States of America" },
          { id: "D", text: "Spain" },
        ],
        correctOption: "C",
        explanation: "The United States completed the Panama Canal in 1914 and administered the canal zone until handing sovereignty to Panama in 1999.",
        difficulty: "medium",
      },
      {
        id: "geo_u4_q8",
        question: "Selling a commodity in a foreign market at a price lower than its domestic cost of production is known as:",
        type: "standard",
        options: [
          { id: "A", text: "Tariff hedging" },
          { id: "B", text: "Dumping" },
          { id: "C", text: "Bilateral bartering" },
          { id: "D", text: "Trade deficit balancing" },
        ],
        correctOption: "B",
        explanation: "Dumping is the practice of exporting products at prices below normal domestic production cost to capture market share.",
        difficulty: "easy",
      },
      {
        id: "geo_u4_q9",
        question: "The Trans-Canadian Railway runs from Halifax on the Atlantic coast to which city on the Pacific coast?",
        type: "standard",
        options: [
          { id: "A", text: "Victoria" },
          { id: "B", text: "Vancouver" },
          { id: "C", text: "Edmonton" },
          { id: "D", text: "Calgary" },
        ],
        correctOption: "B",
        explanation: "The Trans-Canadian Railway extends 7,050 km from Halifax on the Atlantic coast to Vancouver on the Pacific coast.",
        difficulty: "easy",
      },
      {
        id: "geo_u4_q10",
        question: "Where is the headquarters of the World Trade Organisation (WTO) situated?",
        type: "standard",
        options: [
          { id: "A", text: "New York, USA" },
          { id: "B", text: "Geneva, Switzerland" },
          { id: "C", text: "Brussels, Belgium" },
          { id: "D", text: "Vienna, Austria" },
        ],
        correctOption: "B",
        explanation: "The WTO headquarters is located in Geneva, Switzerland.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Human Activities"],
      relatedTopics: ["India: Transport, Communication & Trade", "Globalisation"],
      practiceTestId: "practice-geo-unit4-test1",
      practiceTestUrl: "/test/practice-geo-unit4-test1",
      weaknessReportUrl: "/dashboard/radar?subject=geo",
      weaknessRadarUrl: "/dashboard/radar?subject=geo",
    },
  },
];
