export const englishUnits1to2 = [
  // UNIT 1 - TOPIC 1: Factual Passages
  {
    id: "english-unit1-factual-passages",
    slug: "factual-passages",
    subject: "english",
    subjectName: "English",
    subjectCode: "101",
    unitNumber: 1,
    unitTitle: "Reading Comprehension",
    topicTitle: "Factual Passages",
    ncertReference: {
      book: "CUET-UG English Language / CBSE Class XII Core English",
      chapter: "Section A: Reading Comprehension (Factual / Informative Texts)",
      pages: "Pages 1-35",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 85,
      weightagePercentage: 12.5,
    },
    thirtySecondSummary: [
      "Factual comprehension passages present objective information, empirical data, historical events, scientific reports, or technical analyses (300-450 words in CUET).",
      "Questions focus primarily on direct detail retrieval, quantitative interpretation, true/false statements, chronological sequences, and cause-and-effect relationships.",
      "The 'Skim-and-Scan' strategy is supreme: read question stems first to identify key operational keywords, then scan the passage for rapid targeted location.",
      "Beware of subtle extreme qualifiers in options (always, never, solely, completely) that distort moderate statements in the passage.",
      "CUET tests vocabulary-in-context directly from the passage text (e.g., 'In paragraph 3, the word X most nearly means...').",
    ],
    coreConcepts: [
      {
        title: "Structure and Anatomy of Factual Passages",
        explanation:
          "Factual passages are built around logical organization of evidence rather than emotional storytelling. Typically, the first paragraph establishes the thesis statement or introduces the central phenomenon (e.g., climate change metrics, economic indicators, historical milestones). Subsequent body paragraphs deploy specific supporting evidence—statistics, survey findings, chronological milestones, or expert citations. The concluding paragraph summarizes implications or future outlooks. Because information density is high, test-takers must avoid passive reading and instead map paragraph functions as they read.",
        keyTakeaways: [
          "Topic sentence: Usually located in the first or second sentence of each paragraph.",
          "Supporting data: Dates, percentages, organizational names, and geographical locations.",
          "Tone: Neutral, informative, objective, analytical, or reportorial.",
        ],
        ncertPointer:
          "CBSE Class XII Core English, Section A Reading Skills, pp. 2-14.",
      },
      {
        title: "The Targeted Scanning Technique for CUET Speed",
        explanation:
          "CUET provides 45 minutes for 40 questions (out of 50). Spending 10 minutes reading a single factual passage leads to time panic. Instead, apply the 'Questions-First' scan protocol:\n1. Read Question Stems First: Note proper nouns, dates, numbers, technical terms, or key verbs (e.g., 'According to the author, why did the NASA mission in 2021 fail?').\n2. Rapid Scanning: Move eyes down the passage in a zigzag motion seeking the exact keyword or its direct synonym.\n3. Context Window Reading: Once the keyword is located, read one sentence above and one sentence below to grasp the complete qualifying context before answering.",
        keyTakeaways: [
          "Do not memorize numbers; locate them via targeted scanning.",
          "Beware of paraphrased keywords in higher-difficulty questions.",
          "Always confirm with the context window (sentence before and after).",
        ],
        ncertPointer:
          "CUET Reading Comprehension Guide, Speed reading & Scanning methodology, pp. 16-24.",
      },
      {
        title: "Common Question Archetypes in Factual RC",
        explanation:
          "1. Direct Detail Retrieval: 'According to paragraph 2, what caused X?' -> Match exact textual paraphrase.\n2. Negative Factual / 'Except' Questions: 'Which of the following is NOT mentioned as a benefit of renewable energy?' -> Requires identifying three stated facts and one unstated/contradicted statement.\n3. Chronological Sequencing: 'Arrange the following events in the correct sequence as described in the passage.'\n4. Vocabulary-in-Context: Determining word meaning based strictly on surrounding syntactic and semantic cues rather than dictionary definitions.",
        keyTakeaways: [
          "'Except' questions: Cross out stated options directly as you locate them in the text.",
          "Contextual meaning: Substitute each option back into the original sentence to test grammatical and semantic fit.",
        ],
        ncertPointer:
          "NTA CUET English Question Bank Analysis, Factual RC archetype mapping, pp. 28-35.",
      },
    ],
    keyFacts: [
      {
        concept: "Skimming vs Scanning",
        formulaOrFact: "Skimming = Rapid reading for general gist | Scanning = Targeted searching for specific keywords/data",
        explanation: "Factual passages require 80% scanning for details and 20% skimming for paragraph themes.",
        examTip: "Always circle proper nouns and dates when skimming the passage initially.",
      },
      {
        concept: "Extreme Words Trap",
        formulaOrFact: "Words like 'all', 'none', 'never', 'always', 'exclusively', 'solely'",
        explanation: "Passages usually make qualified, moderate claims. Options using extreme absolutes are almost invariably incorrect distractor choices.",
        examTip: "If the passage says 'many scientists believe', an option stating 'all scientists unanimously agree' is false.",
      },
      {
        concept: "Vocabulary-in-Context Substitution Rule",
        formulaOrFact: "Replace the target word with candidate options directly in the sentence",
        explanation: "A word may have multiple dictionary definitions, but only one preserves the precise logical sense in the passage.",
        examTip: "Do not select an option merely because it is the most common meaning of the word.",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" fill="#f8fafc" rx="12"/>
  <text x="400" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0f172a">Factual Reading Comprehension: Strategy &amp; Question Matrix</text>
  
  <!-- Strategy Steps Box -->
  <rect x="50" y="55" width="335" height="395" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="217" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">SKIM &amp; SCAN PROTOCOL</text>

  <rect x="65" y="98" width="305" height="70" rx="6" fill="#f1f5f9"/>
  <text x="75" y="118" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Step 1: Read Question Stems First</text>
  <text x="75" y="136" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Identify lead keywords (Names, Dates, Proper Nouns)</text>
  <text x="75" y="152" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Do NOT read answer choices yet to avoid bias</text>

  <rect x="65" y="180" width="305" height="70" rx="6" fill="#f1f5f9"/>
  <text x="75" y="200" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Step 2: Targeted Text Scanning</text>
  <text x="75" y="218" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Move eyes rapidly down columns looking for keyword</text>
  <text x="75" y="234" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Look for synonyms and thematic paraphrases</text>

  <rect x="65" y="262" width="305" height="70" rx="6" fill="#f1f5f9"/>
  <text x="75" y="282" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Step 3: Context Window Analysis</text>
  <text x="75" y="300" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Read sentence before and after keyword</text>
  <text x="75" y="316" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Note qualifying conditions (although, however, except)</text>

  <rect x="65" y="344" width="305" height="90" rx="6" fill="#f1f5f9"/>
  <text x="75" y="364" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Step 4: Distractor Elimination</text>
  <text x="75" y="382" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Eliminate extreme qualifiers (always, never, solely)</text>
  <text x="75" y="398" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Beware of out-of-passage personal knowledge traps</text>
  <text x="75" y="414" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Pick option with exact textual synonymy</text>

  <!-- Question Types Matrix -->
  <rect x="415" y="55" width="335" height="395" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="582" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">CUET QUESTION ARCHETYPES</text>

  <rect x="430" y="100" width="305" height="75" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
  <text x="440" y="122" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">1. Direct Fact Retrieval</text>
  <text x="440" y="142" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• "According to the passage, the primary cause of X was..."</text>
  <text x="440" y="158" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Action:</tspan> Match paraphrase; avoid distorted options</text>

  <rect x="430" y="185" width="305" height="75" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
  <text x="440" y="207" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">2. Negative / 'Except' Questions</text>
  <text x="440" y="227" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• "Which of the following is NOT true as per text?"</text>
  <text x="440" y="243" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Action:</tspan> Cross out 3 stated facts; remaining 1 is answer</text>

  <rect x="430" y="270" width="305" height="75" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
  <text x="440" y="292" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">3. Vocabulary in Context</text>
  <text x="440" y="312" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• "In paragraph 3, the word 'resilient' most nearly means..."</text>
  <text x="440" y="328" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Action:</tspan> Substitute candidate words directly in sentence</text>

  <rect x="430" y="355" width="305" height="80" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
  <text x="440" y="377" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">4. Tone &amp; Central Idea</text>
  <text x="440" y="397" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• "The tone of the author throughout the passage is..."</text>
  <text x="440" y="413" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• <tspan font-weight="bold">Factual Tone:</tspan> Objective, analytical, neutral, empirical</text>
</svg>`,
    workedExamples: [
      {
        id: "english-unit1-we1",
        questionNumber: 1,
        question:
          "Read the short excerpt: 'Renewable energy accounted for 28% of global electricity generation in 2021, driven primarily by wind and solar expansion. However, grid integration bottlenecks and storage intermittency continue to pose substantial challenges in developing nations.'\nAccording to the passage, which of the following statements is strictly TRUE?",
        options: [
          { id: "A", text: "Renewable energy has completely solved electricity shortages in developing nations" },
          { id: "B", text: "Wind and solar expansion were the primary drivers of renewable electricity generation reaching 28% in 2021" },
          { id: "C", text: "Storage intermittency is solely an issue in developed countries" },
          { id: "D", text: "More than half of global electricity was generated from renewables in 2021" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Check Option A: Uses extreme word 'completely solved'; text says bottlenecks pose challenges. False.",
          "Step 2: Check Option B: Text states: 'Renewable energy accounted for 28% of global electricity generation in 2021, driven primarily by wind and solar expansion.' This is an exact paraphrase. True.",
          "Step 3: Check Option C: Uses extreme word 'solely' and contradicts text which specifies developing nations. False.",
          "Step 4: Check Option D: 28% is far less than half (50%). False.",
        ],
        cuetInsight:
          "CUET factual questions reward careful verification against extreme qualifiers (completely, solely).",
      },
      {
        id: "english-unit1-we2",
        questionNumber: 2,
        question:
          "In the sentence: 'The team worked relentlessly to reconcile the disparate findings from both laboratories before submitting their final report,' the word 'disparate' most nearly means:",
        options: [
          { id: "A", text: "Harmonious" },
          { id: "B", text: "Distinct and fundamentally different" },
          { id: "C", text: "Desperate and urgent" },
          { id: "D", text: "Fraudulent" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Contextual clue: The team had to 'reconcile' the findings, implying the findings were conflicting, divergent, or fundamentally different.",
          "Step 2: 'Disparate' comes from Latin disparatus (separated/unequal), meaning dissimilar or distinct in kind.",
          "Step 3: Substitute B: 'reconcile the distinct and fundamentally different findings' makes complete logical and syntactic sense.",
        ],
        cuetInsight:
          "Do not confuse 'disparate' (different) with 'desperate' (hopeless/urgent), which is a classic phonetic distractor trap.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Direct Detail with Numerical Fact",
        frequency: "Very High",
        typicalStem: "According to the passage, by what year is the project slated for completion, and what is its projected capacity?",
        strategy: "Scan for the 4-digit year and corresponding percentage or megawatt units in the relevant paragraph.",
      },
      {
        patternType: "Tone Identification of Factual Passages",
        frequency: "High",
        typicalStem: "The author's approach towards the topic in the passage can best be described as:",
        strategy: "Factual texts are almost always 'Objective', 'Analytical', 'Informative', or 'Expository'. Avoid emotional descriptors like 'Satirical' or 'Nostalgic'.",
      },
    ],
    commonTraps: [
      {
        trap: "Answering based on outside personal knowledge rather than the text.",
        whyItTraps: "Students select a statement that is scientifically true in real life, but which is NOT stated anywhere in the given passage.",
        howToAvoid: "Golden Rule of Reading Comprehension: 'If it is not written or logically implied in the text, it is wrong.'",
      },
      {
        trap: "Phonetic similarity in vocabulary questions (Disparate vs Desperate).",
        whyItTraps: "Examiners include words that sound identical to confuse hasty readers.",
        howToAvoid: "Check the exact spelling and etymological root.",
      },
    ],
    mnemonics: [
      {
        mnemonic: "S-C-A-N = Seek Clues, Avoid extremes, Note facts",
        meaning: "Reminds you to seek question clues, eliminate extreme words, and anchor choices on stated facts.",
        application: "Quick operational checklist when tackling factual passages.",
      },
    ],
    quickRevisionCard: {
      title: "Factual RC High-Yield Revision",
      keyPoints: [
        "Factual Texts: Objective data, dates, scientific facts, historical accounts.",
        "Questions-First: Read question stems to note proper nouns and keywords before scanning.",
        "Scan & Window: Move eyes down text; read 1 sentence before and after keyword.",
        "Eliminate Extremes: Reject options with 'always', 'never', 'solely', 'completely'.",
        "Vocabulary-in-Context: Substitute candidate options back into the sentence.",
        "Tone of Factual Passages: Objective, analytical, expository, neutral.",
      ],
    },
    practiceQuestions: [
      {
        id: "english-unit1-q1",
        type: "standard",
        question: "When approaching a factual reading comprehension passage under timed CUET exam conditions, what is the most time-efficient initial step?",
        options: [
          { id: "A", text: "Memorizing all numbers and dates in the passage on rough paper" },
          { id: "B", text: "Reading the question stems first to identify key operational words and targets for scanning" },
          { id: "C", text: "Translating the passage into Hindi line by line" },
          { id: "D", text: "Reading only the first and last paragraph and guessing the middle answers" },
        ],
        correctOption: "B",
        explanation: "Reading question stems first equips the reader with specific search terms (names, dates, terminology) to scan the text purposefully without wasting time.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q2",
        type: "standard",
        question: "Which of the following words in an answer choice is a strong indicator of an 'extreme qualifier' distractor trap in factual comprehension?",
        options: [
          { id: "A", text: "Often" },
          { id: "B", text: "Exclusively" },
          { id: "C", text: "May" },
          { id: "D", text: "Frequently" },
        ],
        correctOption: "B",
        explanation: "'Exclusively' (like solely, always, never) makes an absolute claim that is rarely supported by nuanced factual texts.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q3",
        type: "standard",
        question: "The tone of a passage that presents statistical survey results on youth employment without personal bias or emotional adjectives is best classified as:",
        options: [
          { id: "A", text: "Sarcastic" },
          { id: "B", text: "Objective and Informative" },
          { id: "C", text: "Nostalgic" },
          { id: "D", text: "Belligerent" },
        ],
        correctOption: "B",
        explanation: "Passages presenting empirical data without personal bias possess an objective and informative (expository) tone.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q4",
        type: "assertion-reason",
        question: "Given below are two statements:\nAssertion (A): In reading comprehension, a test-taker should never rely on outside real-world knowledge to answer factual questions.\nReason (R): Factual questions test reading fidelity and textual verification; an answer choice may be scientifically true in reality but incorrect if it contradicts or is absent from the passage.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Both statements are completely true and (R) explains the foundational principle of reading comprehension testing.",
        difficulty: "medium",
      },
      {
        id: "english-unit1-q5",
        type: "standard",
        question: "In the sentence: 'The city's infrastructure proved surprisingly resilient in the wake of the severe cyclone,' the word 'resilient' is closest in meaning to:",
        options: [
          { id: "A", text: "Fragile" },
          { id: "B", text: "Able to withstand or recover quickly from difficult conditions" },
          { id: "C", text: "Obsolete and outdated" },
          { id: "D", text: "Expensive to maintain" },
        ],
        correctOption: "B",
        explanation: "'Resilient' means having the ability to endure hardship and bounce back rapidly.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q6",
        type: "standard",
        question: "What is the primary function of the 'topic sentence' in an informative or factual paragraph?",
        options: [
          { id: "A", text: "To provide a dramatic cliffhanger" },
          { id: "B", text: "To introduce the central theme or controlling idea of that specific paragraph" },
          { id: "C", text: "To list all citations and references" },
          { id: "D", text: "To introduce unrelated humor" },
        ],
        correctOption: "B",
        explanation: "The topic sentence articulates the core point or main argument around which the rest of the paragraph's supporting details revolve.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q7",
        type: "standard",
        question: "When tackling a 'Which of the following is NOT mentioned' (Negative Factual) question, the recommended strategy is to:",
        options: [
          { id: "A", text: "Pick the longest answer choice immediately" },
          { id: "B", text: "Locate and eliminate the three options that ARE explicitly supported by the text" },
          { id: "C", text: "Assume all options are false" },
          { id: "D", text: "Read the entire passage backward" },
        ],
        correctOption: "B",
        explanation: "By actively finding and crossing off the three stated facts in the passage, the single remaining option that is omitted or contradicted emerges clearly.",
        difficulty: "medium",
      },
      {
        id: "english-unit1-q8",
        type: "standard",
        question: "In the context of scientific factual reporting, a 'provisional conclusion' indicates that the finding is:",
        options: [
          { id: "A", text: "Definitive and unalterable forever" },
          { id: "B", text: "Tentative and subject to change based on further empirical evidence" },
          { id: "C", text: "Completely fabricated" },
          { id: "D", text: "Ancient history" },
        ],
        correctOption: "B",
        explanation: "'Provisional' means arranged or existing for the present, possibly to be modified later; tentative.",
        difficulty: "medium",
      },
      {
        id: "english-unit1-q9",
        type: "standard",
        question: "Which of the following techniques is most effective for confirming the contextual meaning of a polysemous word (a word with multiple meanings) in a passage?",
        options: [
          { id: "A", text: "Choosing the most complex dictionary meaning" },
          { id: "B", text: "Substituting each option into the original sentence to verify syntactic and logical coherence" },
          { id: "C", text: "Choosing the first definition learned in primary school" },
          { id: "D", text: "Counting the number of syllables" },
        ],
        correctOption: "B",
        explanation: "Plugging candidate options directly into the sentence ensures that the chosen word matches both the grammar and intended thematic sense of the author.",
        difficulty: "medium",
      },
      {
        id: "english-unit1-q10",
        type: "standard",
        question: "If a factual passage compares two alternative agricultural policies, the structural pattern used by the author is known as:",
        options: [
          { id: "A", text: "Allegorical narrative" },
          { id: "B", text: "Compare and Contrast" },
          { id: "C", text: "Stream of consciousness" },
          { id: "D", text: "Epistolary format" },
        ],
        correctOption: "B",
        explanation: "'Compare and Contrast' is an analytical organizational pattern highlighting similarities and differences between two or more subjects.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Basic English Grammar and Vocabulary"],
      relatedTopics: ["Narrative Passages", "Literary Passages", "Contextual Word Choice"],
      practiceTestId: "practice-english-unit1-test1",
      practiceTestUrl: "/test/practice-english-unit1-test1",
      weaknessReportUrl: "/dashboard/radar?subject=english",
      weaknessRadarUrl: "/dashboard/radar?subject=english",
    },
  },

  // UNIT 1 - TOPIC 2: Narrative Passages
  {
    id: "english-unit1-narrative-passages",
    slug: "narrative-passages",
    subject: "english",
    subjectName: "English",
    subjectCode: "101",
    unitNumber: 1,
    unitTitle: "Reading Comprehension",
    topicTitle: "Narrative Passages",
    ncertReference: {
      book: "CUET-UG English Language / CBSE Class XII Core English",
      chapter: "Section A: Reading Comprehension (Narrative Texts)",
      pages: "Pages 36-68",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 78,
      weightagePercentage: 11.5,
    },
    thirtySecondSummary: [
      "Narrative passages recount a sequence of events—either fictional stories, memoirs, travelogues, or biographical sketches—structured around characters, conflict, setting, and resolution.",
      "Unlike factual texts, narrative RC questions focus heavily on inferential reasoning: character motivations, emotional states, shifts in attitude, implicit themes, and subtext.",
      "Pay keen attention to point of view (First person 'I/we' vs Third person limited/omniscient 'he/she/they') which dictates the narrator's reliability and emotional distance.",
      "Track chronological transitions (flashbacks, foreshadowing, time shifts indicated by words like 'suddenly', 'years later', 'prior to that morning').",
      "Tone in narrative passages is dynamic and expressive (e.g., melancholic, whimsical, introspective, suspenseful, satirical, celebratory).",
    ],
    coreConcepts: [
      {
        title: "Elements of Narrative Architecture",
        explanation:
          "Narrative passages present a story arc containing five core elements:\n1. Exposition: Introduction of protagonist, setting (time and location), and baseline status quo.\n2. Inciting Incident & Rising Action: A conflict arises (internal dilemma vs external struggle with nature, society, or another character) building tension.\n3. Climax: The turning point or peak emotional intensity of the narrative.\n4. Falling Action: The consequences of the climax unfold.\n5. Resolution (Denouement): The conflict resolves, leaving a lingering philosophical takeaway or character transformation. In CUET, passages are often excerpted from longer novels or memoirs, meaning students must quickly identify where the excerpt sits within this emotional arc.",
        keyTakeaways: [
          "Setting establishes mood and atmospheric resonance.",
          "Conflict drives the narrative (Internal: man vs self; External: man vs man / society / nature).",
          "Identify the climax to decode the moral or central transformation.",
        ],
        ncertPointer:
          "CBSE Class XII Core English, Narrative analysis & Fiction reading, pp. 38-50.",
      },
      {
        title: "Inferring Character Traits and Emotional Trajectories",
        explanation:
          "Direct statements ('John was brave') are rare in narrative passages; instead, authors employ 'Show, Don't Tell'. Test-takers must infer psychological traits through:\n1. Actions: How a character reacts under sudden crisis.\n2. Dialogue: Diction, hesitation, tone, and interruptions.\n3. Internal Monologue: Hopes, fears, unspoken regrets, and private calculations.\n4. Physical Descriptions: Posture, involuntary gestures (clenched fists, furrowed brows, averted gaze). When CUET asks: 'The protagonist's reaction to the letter reveals that he was...', look for sensory descriptions of physical and emotional reactions rather than literal definitions.",
        keyTakeaways: [
          "Actions and gestures signal unstated psychological emotions.",
          "Dialogue reveals socio-economic background, sincerity, or deceit.",
          "Track shifts in attitude: How does the narrator feel at the beginning vs the end?",
        ],
        ncertPointer:
          "CUET English Comprehension Guide, Inferential Analysis in Narrative Prose, pp. 52-60.",
      },
      {
        title: "Point of View, Tone and Mood Identification",
        explanation:
          "1. Point of View:\n- First Person ('I', 'We'): Intimate, subjective, potentially unreliable narrator with limited knowledge of others' true minds.\n- Third Person Omniscient: All-knowing narrator who enters the thoughts and feelings of multiple characters.\n- Third Person Limited: Narrator zooms in on the subjective experience of one specific protagonist.\n2. Tone vs Mood:\n- Tone: The author's or narrator's attitude toward the subject matter (e.g., reverent, cynical, bemused, melancholic, nostalgic).\n- Mood: The atmosphere created in the reader (e.g., eerie, uplifting, tense, somber).",
        keyTakeaways: [
          "Tone = Author's attitude; Mood = Reader's emotional atmosphere.",
          "First-person narratives require evaluating the speaker's emotional bias.",
        ],
        ncertPointer:
          "NTA CUET English, Literary Devices & Narrative Modes, pp. 62-68.",
      },
    ],
    keyFacts: [
      {
        concept: "Inferential Reasoning",
        formulaOrFact: "Reading between the lines: Premise in Text + Logical Deductive Implication",
        explanation: "In narrative passages, the correct answer is rarely a direct word-for-word copy; it requires synthesizing emotional clues.",
        examTip: "Always ask: 'What underlying emotion or motive justifies why the character said or did this?'",
      },
      {
        concept: "Shift in Tone",
        formulaOrFact: "Signaled by contrast transition words: 'Yet', 'Suddenly', 'However', 'Alas'",
        explanation: "Stories frequently pivot from tranquil nostalgia to acute alarm or regret.",
        examTip: "CUET questions often ask: 'How does the tone change in the final paragraph?'",
      },
      {
        concept: "Foreshadowing",
        formulaOrFact: "Subtle narrative hints or symbols predicting future plot developments",
        explanation: "E.g., gathering dark clouds or a ticking clock hinting at impending doom.",
        examTip: "Note atmospheric descriptions early in the passage.",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" fill="#fdfbf7" rx="12"/>
  <text x="400" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#78350f">Narrative Comprehension: The Dramatic Arc &amp; Inference Map</text>
  
  <!-- Dramatic Arc Path -->
  <path d="M 80 340 Q 250 330 380 180 Q 430 120 480 140 L 720 340" fill="none" stroke="#d97706" stroke-width="4"/>
  
  <!-- Points on Arc -->
  <!-- 1. Exposition -->
  <circle cx="100" cy="340" r="8" fill="#d97706"/>
  <rect x="50" y="360" width="120" height="55" rx="6" fill="#fef3c7" stroke="#fcd34d"/>
  <text x="110" y="380" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#92400e">1. Exposition</text>
  <text x="110" y="396" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" fill="#78350f">Setting, Characters,</text>
  <text x="110" y="408" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" fill="#78350f">Baseline mood</text>

  <!-- 2. Rising Action -->
  <circle cx="280" cy="280" r="8" fill="#d97706"/>
  <rect x="220" y="195" width="130" height="60" rx="6" fill="#fef3c7" stroke="#fcd34d"/>
  <text x="285" y="215" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#92400e">2. Rising Action</text>
  <text x="285" y="231" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" fill="#78350f">Conflict emerges;</text>
  <text x="285" y="245" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" fill="#78350f">Tension escalates</text>

  <!-- 3. Climax -->
  <circle cx="430" cy="120" r="10" fill="#b45309"/>
  <rect x="365" y="50" width="130" height="55" rx="6" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
  <text x="430" y="72" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#78350f">3. CLIMAX</text>
  <text x="430" y="88" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#92400e">Turning point;</text>
  <text x="430" y="100" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#92400e">Peak emotional crisis</text>

  <!-- 4. Falling Action -->
  <circle cx="560" cy="220" r="8" fill="#d97706"/>
  <rect x="520" y="145" width="130" height="55" rx="6" fill="#fef3c7" stroke="#fcd34d"/>
  <text x="585" y="165" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#92400e">4. Falling Action</text>
  <text x="585" y="181" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" fill="#78350f">Repercussions;</text>
  <text x="585" y="193" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" fill="#78350f">Emotional aftermath</text>

  <!-- 5. Resolution -->
  <circle cx="700" cy="340" r="8" fill="#d97706"/>
  <rect x="635" y="360" width="130" height="55" rx="6" fill="#fef3c7" stroke="#fcd34d"/>
  <text x="700" y="380" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#92400e">5. Resolution</text>
  <text x="700" y="396" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" fill="#78350f">Denouement, moral,</text>
  <text x="700" y="408" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" fill="#78350f">Final transformation</text>

  <!-- Lower Inference Checklist -->
  <rect x="180" y="425" width="440" height="45" rx="8" fill="#fff7ed" stroke="#ea580c"/>
  <text x="400" y="445" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#c2410c">Inference Rule: Look for Actions, Unspoken Hesitations &amp; Tone Shifts</text>
  <text x="400" y="460" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#9a3412">Character motivation is demonstrated through behavior rather than explicit statements</text>
</svg>`,
    workedExamples: [
      {
        id: "english-unit1-narrative-we1",
        questionNumber: 1,
        question:
          "Read the excerpt: 'As the grandfather handed over the worn leather-bound diary, his hands trembled slightly. He opened his mouth to say something, hesitated, and simply pressed the boy's shoulder in silence.'\nThe grandfather's actions primarily convey:",
        options: [
          { id: "A", text: "Physical infirmity and medical distress" },
          { id: "B", text: "Deep, unspoken emotional reverence and overwhelming sentiment that transcended words" },
          { id: "C", text: "Reluctance and anger at having to give away his property" },
          { id: "D", text: "Total indifference toward his grandson" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Analyze the physical gestures: trembling hands, opening mouth to speak but hesitating, pressing the shoulder in silence.",
          "Step 2: Connect the object (worn leather-bound diary = precious personal memory) with the silent gesture of affection.",
          "Step 3: This clearly conveys deep, profound emotion where spoken words fall short (B). Options C and D are completely contradicted by the affectionate touch; Option A is too literal and ignores the sentimental subtext.",
        ],
        cuetInsight:
          "Narrative inference questions penalize overly literal readings (e.g., assuming trembling hands always equals a medical illness).",
      },
      {
        id: "english-unit1-narrative-we2",
        questionNumber: 2,
        question:
          "If a narrative passage opens with fond childhood reminiscences of monsoon rains in a village, but concludes with the adult narrator staring out of an office window at polluted urban smog with a sigh, the overall tone of the passage shifts from:",
        options: [
          { id: "A", text: "Hostile to joyful" },
          { id: "B", text: "Nostalgic to melancholic" },
          { id: "C", text: "Satirical to indifferent" },
          { id: "D", text: "Suspenseful to comedic" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Identify beginning tone: Fond childhood memories = 'Nostalgic'.",
          "Step 2: Identify ending tone: Sighing at polluted urban smog = sadness, longing for the lost past = 'Melancholic'.",
          "Step 3: The trajectory is clearly 'Nostalgic to melancholic' (B).",
        ],
        cuetInsight:
          "Tone trajectory questions are very common in narrative comprehension passages.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Character Motivation & Inference",
        frequency: "Very High",
        typicalStem: "Why did the protagonist choose not to reveal the truth to his companion in the final scene?",
        strategy: "Search the dialogue and internal thoughts in the immediate vicinity to deduce motives (protection, fear, shame, pride).",
      },
      {
        patternType: "Tone & Mood Characterization",
        frequency: "High",
        typicalStem: "The mood established in the opening paragraph of the passage can best be described as:",
        strategy: "Examine descriptive adjectives and sensory imagery (gloomy, vibrant, serene, ominous).",
      },
    ],
    commonTraps: [
      {
        trap: "Choosing an option that is factually stated but irrelevant to the character's motivation.",
        whyItTraps: "Examiners include true facts from the story as distractors to the question 'Why did he act?'.",
        howToAvoid: "Ensure the option explains the psychological CAUSE, not just a concurrent circumstance.",
      },
      {
        trap: "Confusing the Narrator's voice with the Author's personal opinion.",
        whyItTraps: "In first-person fiction, a flawed narrator may say things the author actually condemns.",
        howToAvoid: "Evaluate whether the narrative voice is ironic or biased.",
      },
    ],
    mnemonics: [
      {
        mnemonic: "C-A-R-T = Character, Action, Reaction, Tone",
        meaning: "The 4 pillars to track while reading any narrative text.",
        application: "Quickly anchors reading focus on narrative turning points.",
      },
    ],
    quickRevisionCard: {
      title: "Narrative Comprehension Quick Revision",
      keyPoints: [
        "Narrative Structure: Exposition -> Rising Action -> Climax -> Falling Action -> Resolution.",
        "Inferential Thinking: Interpret physical actions and pauses ('Show, Don't Tell').",
        "Point of View: 1st person ('I' - subjective/unreliable) vs 3rd person (omniscient / limited).",
        "Tone (Author's attitude) vs Mood (Atmosphere felt by reader).",
        "Track Transitions: Look for 'Suddenly', 'However', 'Years later' indicating shifts.",
        "Look for Subtext: What remains unsaid between characters is often the key.",
      ],
    },
    practiceQuestions: [
      {
        id: "english-unit1-q11",
        type: "standard",
        question: "In a narrative text, the literary technique where an author hints at future events or complications before they occur is known as:",
        options: [
          { id: "A", text: "Flashback" },
          { id: "B", text: "Foreshadowing" },
          { id: "C", text: "Alliteration" },
          { id: "D", text: "Hyperbole" },
        ],
        correctOption: "B",
        explanation: "Foreshadowing gives readers subtle clues or warnings about future narrative developments, creating tension and expectation.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q12",
        type: "standard",
        question: "A first-person narrator ('I') in a short story whose personal prejudices or limited awareness cloud his interpretation of events is termed a/an:",
        options: [
          { id: "A", text: "Omniscient narrator" },
          { id: "B", text: "Unreliable narrator" },
          { id: "C", text: "Objective reporter" },
          { id: "D", text: "Dramatic persona" },
        ],
        correctOption: "B",
        explanation: "An unreliable narrator's credibility is compromised by bias, self-interest, naivety, or psychological instability.",
        difficulty: "medium",
      },
      {
        id: "english-unit1-q13",
        type: "standard",
        question: "Which of the following best describes the difference between 'Tone' and 'Mood' in literature?",
        options: [
          { id: "A", text: "Tone is the speed of reading, while mood is the font size" },
          { id: "B", text: "Tone reflects the author's attitude toward the subject, while mood is the emotional atmosphere evoked in the reader" },
          { id: "C", text: "Tone applies only to poetry, while mood applies only to drama" },
          { id: "D", text: "There is no difference between them" },
        ],
        correctOption: "B",
        explanation: "Tone is the writer's attitude (e.g., ironic, reverent); mood is the emotional ambiance experienced by the reader (e.g., gloomy, peaceful).",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q14",
        type: "assertion-reason",
        question: "Given below are two statements:\nAssertion (A): In narrative passages, understanding a character's unstated motivations requires analyzing their physical reactions and dialogue hesitations.\nReason (R): Skilled literary authors often practice the 'Show, Don't Tell' rule, conveying complex psychology through concrete sensory details rather than direct exposition.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Both statements are completely true and (R) explains why inferential analysis of character behavior is essential in narrative comprehension.",
        difficulty: "medium",
      },
      {
        id: "english-unit1-q15",
        type: "standard",
        question: "The moment of peak emotional tension and the decisive turning point in a narrative plot is called the:",
        options: [
          { id: "A", text: "Exposition" },
          { id: "B", text: "Climax" },
          { id: "C", text: "Denouement" },
          { id: "D", text: "Prologue" },
        ],
        correctOption: "B",
        explanation: "The climax is the highest point of dramatic conflict and emotional confrontation in a narrative arc.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q16",
        type: "standard",
        question: "If a traveler's memoir describes an ancient ruin with phrases like 'silent crumbling battlements', 'creeping ivy swallowing forgotten dynasties', and 'whispering desert winds', the mood created is:",
        options: [
          { id: "A", text: "Boisterous and humorous" },
          { id: "B", text: "Somber and contemplative" },
          { id: "C", text: "Fierce and vengeful" },
          { id: "D", text: "Whimsical and festive" },
        ],
        correctOption: "B",
        explanation: "The imagery of crumbling stones and whispering winds evokes a reflective, somber mood on the transience of human empires.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q17",
        type: "standard",
        question: "When a narrative story suddenly interrupts the chronological sequence to describe an episode that occurred years earlier, it is utilizing a:",
        options: [
          { id: "A", text: "Flashback (Analepsis)" },
          { id: "B", text: "Cliffhanger" },
          { id: "C", text: "Soliloquy" },
          { id: "D", text: "Deus ex machina" },
        ],
        correctOption: "A",
        explanation: "A flashback (analepsis) is an interjected scene that takes the narrative back in time from the current point in the story.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q18",
        type: "standard",
        question: "In the sentence: 'He wore a thin, deprecating smile that barely concealed the tempest brewing behind his quiet eyes,' what does the description reveal about the character?",
        options: [
          { id: "A", text: "He was genuinely cheerful and relaxed" },
          { id: "B", text: "He was suppressing profound inner turmoil or anger beneath a polite exterior" },
          { id: "C", text: "He had severe eye strain" },
          { id: "D", text: "He was completely indifferent to the meeting" },
        ],
        correctOption: "B",
        explanation: "The contrast between the polite smile and the 'tempest brewing' directly signals intense suppressed emotional agitation.",
        difficulty: "medium",
      },
      {
        id: "english-unit1-q19",
        type: "standard",
        question: "A narrative passage that exposes societal hypocrisies through witty exaggeration and irony possesses which literary tone?",
        options: [
          { id: "A", text: "Elegiac" },
          { id: "B", text: "Satirical" },
          { id: "C", text: "Apathetic" },
          { id: "D", text: "Eulogistic" },
        ],
        correctOption: "B",
        explanation: "Satire uses humor, irony, and exaggeration to criticize and expose societal folly or corruption.",
        difficulty: "medium",
      },
      {
        id: "english-unit1-q20",
        type: "standard",
        question: "The final resolution of the intricacies of a narrative plot where loose ends are tied up is classically referred to as the:",
        options: [
          { id: "A", text: "Inciting incident" },
          { id: "B", text: "Denouement" },
          { id: "C", text: "Rising action" },
          { id: "D", text: "Exposition" },
        ],
        correctOption: "B",
        explanation: "Denouement (from French 'to untie') is the final part of a story in which the strands of the plot are drawn together and matters are explained or resolved.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["Factual Passages"],
      relatedTopics: ["Literary Passages", "Contextual Word Choice"],
      practiceTestId: "practice-english-unit1-test2",
      practiceTestUrl: "/test/practice-english-unit1-test2",
      weaknessReportUrl: "/dashboard/radar?subject=english",
      weaknessRadarUrl: "/dashboard/radar?subject=english",
    },
  },

  // UNIT 1 - TOPIC 3: Literary Passages
  {
    id: "english-unit1-literary-passages",
    slug: "literary-passages",
    subject: "english",
    subjectName: "English",
    subjectCode: "101",
    unitNumber: 1,
    unitTitle: "Reading Comprehension",
    topicTitle: "Literary Passages",
    ncertReference: {
      book: "CUET-UG English Language / CBSE Class XII Core English",
      chapter: "Section A: Reading Comprehension (Literary Prose & Poetry Extracts)",
      pages: "Pages 69-105",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 72,
      weightagePercentage: 11.0,
    },
    thirtySecondSummary: [
      "Literary passages include sophisticated prose excerpts, essays, and classic/modern poetry rich in figurative language, symbolic imagery, and philosophical reflection.",
      "CUET tests the identification of figures of speech: Simile, Metaphor, Personification, Alliteration, Oxymoron, Hyperbole, Onomatopoeia, and Irony.",
      "In poetry extracts, questions target rhyme scheme, stanza form, speaker identity, tone shifts, and the symbolic meaning of recurring motifs (e.g., seasons, journeys, light vs darkness).",
      "Pay attention to 'extended metaphors' (where a single comparison is sustained across an entire stanza or passage) and 'paradoxes' (seemingly contradictory statements that express an underlying truth).",
      "Always interpret metaphors figuratively rather than literally; look beyond the surface words to decipher abstract philosophical themes.",
    ],
    coreConcepts: [
      {
        title: "Mastery of Figures of Speech (Poetic Devices)",
        explanation:
          "Figures of speech enrich literary texts by expressing ideas imaginatively.\n1. Simile: Direct comparison using 'like' or 'as' (e.g., 'Her cheeks were as pale as a late winter's moon').\n2. Metaphor: Implicit direct equation of two unlike things without 'like' or 'as' (e.g., 'Time is a thief', 'The road was a ribbon of moonlight').\n3. Personification: Attributing human emotions, intentions, or actions to inanimate objects or abstractions (e.g., 'The trees danced in the howling wind', 'Death lays his icy hands on kings').\n4. Oxymoron: Juxtaposition of two contradictory terms side-by-side (e.g., 'sweet sorrow', 'deafening silence', 'cruel kindness').\n5. Hyperbole: Deliberate, dramatic exaggeration not meant to be taken literally (e.g., 'I cried a river', 'Ten thousand saw I at a glance').\n6. Alliteration: Repetition of initial consonant sounds in closely linked words (e.g., 'Fair breeze blew, the white foam flew').\n7. Onomatopoeia: Words that phonetically imitate the sound they describe (e.g., 'buzz', 'hiss', 'murmur', 'clang').",
        keyTakeaways: [
          "Simile = 'like' / 'as'; Metaphor = direct identification without 'like'.",
          "Personification = human qualities given to non-human things.",
          "Oxymoron = contradictory pair of adjacent words ('bittersweet').",
        ],
        ncertPointer:
          "CBSE Class XII Core English, Poetry analysis & Figures of Speech, pp. 70-84.",
      },
      {
        title: "Poetic Structure, Rhyme Scheme and Meter",
        explanation:
          "1. Rhyme Scheme: The pattern of end-rhymes marked with lowercase letters (e.g., ABAB, AABB, ABCB). To determine rhyme scheme, examine only the final word of each line.\n2. Stanza Forms: Couplet (2 lines), Quatrain (4 lines), Sestet (6 lines), Octave (8 lines), Sonnet (14 lines in iambic pentameter: Petrarchan Octave+Sestet vs Shakespearean 3 Quatrains+Couplet ABAB CDCD EFEF GG).\n3. Enjambment: The continuation of a sentence without a pause or punctuation mark beyond the end of a line or stanza, creating fluid rhythmic momentum.\n4. Imagery: Language that appeals directly to the physical senses: Visual (sight), Auditory (sound), Olfactory (smell), Gustatory (taste), Tactile (touch), and Kinesthetic (movement).",
        keyTakeaways: [
          "Determine rhyme scheme by the last sound of each verse line.",
          "Sonnet: 14 lines; Shakespearean ends in rhyming couplet GG.",
          "Enjambment: Run-on line without end punctuation.",
        ],
        ncertPointer:
          "CUET English Poetry & Literary Forms Reference, pp. 86-96.",
      },
      {
        title: "Decoding Symbolism and Abstract Themes",
        explanation:
          "Literary passages operate on dual levels: the literal (denotative) and the symbolic (connotative).\n- Common Archetypal Symbols:\n  • Seasons: Spring = birth/hope; Summer = passion/maturity; Autumn = decay/aging; Winter = death/stagnation.\n  • Journey / Road: Path of life, moral dilemmas, choice ('The Road Not Taken').\n  • Light and Darkness: Knowledge, divine clarity, life vs ignorance, despair, death.\n  • River / Ocean: Passage of time, eternal flow, human consciousness, transition to afterlife. When an examination question asks: 'What does the withered rose symbolize in stanza 2?', look beyond the botanical flower to identify lost youth, unrequited love, or fading innocence.",
        keyTakeaways: [
          "Denotation = literal dictionary meaning; Connotation = emotional and symbolic associations.",
          "Symbols point towards universal human existential themes.",
        ],
        ncertPointer:
          "NTA CUET English, Symbolism and Thematic Interpretation in Literary RC, pp. 98-105.",
      },
    ],
    keyFacts: [
      {
        concept: "Metaphor vs Simile",
        formulaOrFact: "Simile = 'as brave as a lion' | Metaphor = 'he was a lion in the fight'",
        explanation: "Metaphor asserts an identity rather than a mere comparison, delivering stronger emotional and figurative resonance.",
        examTip: "CUET regularly asks students to classify whether an underlined phrase is a simile, metaphor, or personification.",
      },
      {
        concept: "Paradox vs Oxymoron",
        formulaOrFact: "Oxymoron = Two adjacent contradictory words ('deafening silence') | Paradox = A contradictory full statement containing hidden truth",
        explanation: "E.g., 'The child is the father of the man' (Wordsworth) is a paradox; 'open secret' is an oxymoron.",
        examTip: "Phrase level = Oxymoron; Sentence/Statement level = Paradox.",
      },
      {
        concept: "Shakespearean Sonnet Structure",
        formulaOrFact: "14 lines | Rhyme: ABAB CDCD EFEF GG | Ends with a rhyming couplet",
        explanation: "Three quatrains develop the argument or dilemma; the final rhyming couplet delivers a dramatic resolution or twist.",
        examTip: "Couplet GG provides the key to the entire poem's resolution.",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" fill="#faf5ff" rx="12"/>
  <text x="400" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#581c87">Literary Comprehension: Poetic Devices &amp; Imagery Matrix</text>
  
  <!-- Figures of Speech Grid -->
  <g transform="translate(45, 60)">
    <!-- Simile -->
    <rect x="0" y="0" width="220" height="95" rx="8" fill="#ffffff" stroke="#d8b4fe" stroke-width="1.5"/>
    <text x="15" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#6b21a8">Simile</text>
    <text x="15" y="42" font-family="system-ui, sans-serif" font-size="11" fill="#7e22ce">• Comparison using 'like' or 'as'</text>
    <text x="15" y="60" font-family="system-ui, sans-serif" font-size="10.5" font-style="italic" fill="#581c87">"O my Luve is like a red, red rose"</text>
    <text x="15" y="76" font-family="system-ui, sans-serif" font-size="10" fill="#a855f7">Direct sensory linkage</text>

    <!-- Metaphor -->
    <rect x="245" y="0" width="220" height="95" rx="8" fill="#ffffff" stroke="#d8b4fe" stroke-width="1.5"/>
    <text x="260" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#6b21a8">Metaphor</text>
    <text x="260" y="42" font-family="system-ui, sans-serif" font-size="11" fill="#7e22ce">• Direct identity without 'like'/'as'</text>
    <text x="260" y="60" font-family="system-ui, sans-serif" font-size="10.5" font-style="italic" fill="#581c87">"All the world's a stage"</text>
    <text x="260" y="76" font-family="system-ui, sans-serif" font-size="10" fill="#a855f7">Total conceptual equation</text>

    <!-- Personification -->
    <rect x="490" y="0" width="220" height="95" rx="8" fill="#ffffff" stroke="#d8b4fe" stroke-width="1.5"/>
    <text x="505" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#6b21a8">Personification</text>
    <text x="505" y="42" font-family="system-ui, sans-serif" font-size="11" fill="#7e22ce">• Inanimate given human traits</text>
    <text x="505" y="60" font-family="system-ui, sans-serif" font-size="10.5" font-style="italic" fill="#581c87">"The moon veiled her face in clouds"</text>
    <text x="505" y="76" font-family="system-ui, sans-serif" font-size="10" fill="#a855f7">Emotional anthropomorphism</text>
  </g>

  <!-- Row 2 Figures of Speech -->
  <g transform="translate(45, 175)">
    <!-- Oxymoron -->
    <rect x="0" y="0" width="220" height="95" rx="8" fill="#ffffff" stroke="#d8b4fe" stroke-width="1.5"/>
    <text x="15" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#6b21a8">Oxymoron</text>
    <text x="15" y="42" font-family="system-ui, sans-serif" font-size="11" fill="#7e22ce">• Adjacent contradictory terms</text>
    <text x="15" y="60" font-family="system-ui, sans-serif" font-size="10.5" font-style="italic" fill="#581c87">"Living death", "Deafening silence"</text>
    <text x="15" y="76" font-family="system-ui, sans-serif" font-size="10" fill="#a855f7">Compressed contradiction</text>

    <!-- Hyperbole -->
    <rect x="245" y="0" width="220" height="95" rx="8" fill="#ffffff" stroke="#d8b4fe" stroke-width="1.5"/>
    <text x="260" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#6b21a8">Hyperbole</text>
    <text x="260" y="42" font-family="system-ui, sans-serif" font-size="11" fill="#7e22ce">• Deliberate poetic exaggeration</text>
    <text x="260" y="60" font-family="system-ui, sans-serif" font-size="10.5" font-style="italic" fill="#581c87">"Ten thousand saw I at a glance"</text>
    <text x="260" y="76" font-family="system-ui, sans-serif" font-size="10" fill="#a855f7">Dramatizes scale &amp; intensity</text>

    <!-- Alliteration & Onomatopoeia -->
    <rect x="490" y="0" width="220" height="95" rx="8" fill="#ffffff" stroke="#d8b4fe" stroke-width="1.5"/>
    <text x="505" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#6b21a8">Sound Devices</text>
    <text x="505" y="42" font-family="system-ui, sans-serif" font-size="11" fill="#7e22ce">• <tspan font-weight="bold">Alliteration:</tspan> "Nodded, nearly napping"</text>
    <text x="505" y="60" font-family="system-ui, sans-serif" font-size="11" fill="#7e22ce">• <tspan font-weight="bold">Onomatopoeia:</tspan> "Buzz", "Clatter"</text>
    <text x="505" y="76" font-family="system-ui, sans-serif" font-size="10" fill="#a855f7">Auditory acoustic texture</text>
  </g>

  <!-- Lower Structural Breakdown: Sonnet & Symbolism -->
  <rect x="45" y="295" width="345" height="155" rx="10" fill="#ffffff" stroke="#c084fc" stroke-width="1.5"/>
  <text x="217" y="322" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#6b21a8">The Sonnet Form (14 Lines)</text>
  <text x="60" y="346" font-family="system-ui, sans-serif" font-size="11.5" fill="#581c87">• <tspan font-weight="bold">Petrarchan / Italian:</tspan> Octave (ABBA ABBA) + Sestet (CDECDE)</text>
  <text x="60" y="364" font-family="system-ui, sans-serif" font-size="11" fill="#7e22ce">  Volta (turn in thought) occurs at Line 9</text>
  <text x="60" y="386" font-family="system-ui, sans-serif" font-size="11.5" fill="#581c87">• <tspan font-weight="bold">Shakespearean / English:</tspan> 3 Quatrains + Couplet</text>
  <text x="60" y="404" font-family="system-ui, sans-serif" font-size="11" fill="#7e22ce">  Rhyme: ABAB CDCD EFEF GG (Couplet GG resolves theme)</text>
  <text x="60" y="424" font-family="system-ui, sans-serif" font-size="11" fill="#7e22ce">• Meter: Typically written in Iambic Pentameter (10 syllables)</text>

  <!-- Symbolism Breakdown -->
  <rect x="410" y="295" width="345" height="155" rx="10" fill="#ffffff" stroke="#c084fc" stroke-width="1.5"/>
  <text x="582" y="322" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#6b21a8">Universal Archetypal Symbols</text>
  <text x="425" y="346" font-family="system-ui, sans-serif" font-size="11.5" fill="#581c87">• <tspan font-weight="bold">Winter / Twilight:</tspan> Old age, spiritual decline, death</text>
  <text x="425" y="366" font-family="system-ui, sans-serif" font-size="11.5" fill="#581c87">• <tspan font-weight="bold">Spring / Dawn:</tspan> Rebirth, resurrection, renewed hope</text>
  <text x="425" y="386" font-family="system-ui, sans-serif" font-size="11.5" fill="#581c87">• <tspan font-weight="bold">The River / Sea:</tspan> Passage of time, the unconscious, eternity</text>
  <text x="425" y="406" font-family="system-ui, sans-serif" font-size="11.5" fill="#581c87">• <tspan font-weight="bold">Withered Flower:</tspan> Transience of physical beauty, mortality</text>
  <text x="425" y="426" font-family="system-ui, sans-serif" font-size="11" fill="#7e22ce">Always interpret beyond the surface literal meaning!</text>
</svg>`,
    workedExamples: [
      {
        id: "english-unit1-literary-we1",
        questionNumber: 1,
        question:
          "Identify the poetic device / figure of speech employed in the underlined line:\n'The road was a ribbon of moonlight over the purple moor,\nAnd the highwayman came riding,\nRiding, riding...'",
        options: [
          { id: "A", text: "Simile" },
          { id: "B", text: "Metaphor" },
          { id: "C", text: "Oxymoron" },
          { id: "D", text: "Hyperbole" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Examine the phrasing: 'The road was a ribbon of moonlight'.",
          "Step 2: The poet directly equates the road to a ribbon of moonlight without using comparative particles like 'as' or 'like'.",
          "Step 3: This direct equation of two dissimilar entities is the classic definition of a Metaphor.",
        ],
        cuetInsight:
          "If the poet had written 'The road was LIKE a ribbon of moonlight', it would be a Simile. Absence of 'like' makes it a Metaphor.",
      },
      {
        id: "english-unit1-literary-we2",
        questionNumber: 2,
        question:
          "In the verse line: 'Parting is such sweet sorrow that I shall say good night till it be morrow,' the phrase 'sweet sorrow' is an example of:",
        options: [
          { id: "A", text: "Personification" },
          { id: "B", text: "Oxymoron" },
          { id: "C", text: "Onomatopoeia" },
          { id: "D", text: "Alliteration" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Look at the two juxtaposed words: 'sweet' (pleasurable) and 'sorrow' (painful/sad).",
          "Step 2: Placing two inherently contradictory attributes side by side to describe a single complex emotional experience is an Oxymoron.",
        ],
        cuetInsight:
          "Shakespearean oxymorons ('sweet sorrow', 'loving hate', 'brawling love') are favorite question stems in CUET English.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Figure of Speech Identification",
        frequency: "Very High",
        typicalStem: "Which figure of speech is present in the line: 'The sea that bares her bosom to the moon'?",
        strategy: "Identify that the sea is given a human anatomy ('bosom') and human action ('bares'), making it Personification.",
      },
      {
        patternType: "Rhyme Scheme Determination",
        frequency: "High",
        typicalStem: "What is the rhyme scheme of the given 4-line stanza?",
        strategy: "Map the phonetic ending sound of line 1 as 'a', line 2 as 'b', and check matching sounds accordingly.",
      },
    ],
    commonTraps: [
      {
        trap: "Confusing Metaphor with Personification.",
        whyItTraps: "Both make figurative associations. Personification specifically gives HUMAN abilities (thinking, smiling, dancing, crying) to animals or objects. Metaphor equates two concepts (human or non-human).",
        howToAvoid: "If the non-human object acts like a human being, choose Personification.",
      },
      {
        trap: "Assuming all sound repetition is Alliteration.",
        whyItTraps: "Alliteration is the repetition of initial consonant sounds. Vowel repetition is Assonance; middle/end consonant repetition is Consonance.",
        howToAvoid: "Check that the repeated sound is at the START of the words.",
      },
    ],
    mnemonics: [
      {
        mnemonic: "S-H-A-M-P-O-O = Simile, Hyperbole, Alliteration, Metaphor, Personification, Oxymoron, Onomatopoeia",
        meaning: "The 7 classic figures of speech frequently tested in literary comprehension.",
        application: "Quick mental scan when identifying poetic devices.",
      },
    ],
    quickRevisionCard: {
      title: "Literary Comprehension Quick Revision",
      keyPoints: [
        "Simile: Comparison using 'like' or 'as' ('pale as winter's moon').",
        "Metaphor: Direct equation without 'like' or 'as' ('road was a ribbon').",
        "Personification: Human attributes given to non-human entities ('trees danced').",
        "Oxymoron: Adjacent contradictory pair ('sweet sorrow', 'deafening silence').",
        "Hyperbole: Deliberate poetic exaggeration ('ten thousand saw I').",
        "Alliteration: Initial consonant sound repetition ('fair breeze blew').",
        "Onomatopoeia: Words imitating sounds ('buzz', 'hiss', 'clatter').",
        "Sonnet: 14 lines; Shakespearean = 3 quatrains + rhyming couplet (GG).",
      ],
    },
    practiceQuestions: [
      {
        id: "english-unit1-q21",
        type: "standard",
        question: "Which figure of speech is present in the line: 'The wind whistled through the night, howling its lonely lament'?",
        options: [
          { id: "A", text: "Simile" },
          { id: "B", text: "Personification" },
          { id: "C", text: "Oxymoron" },
          { id: "D", text: "Hyperbole" },
        ],
        correctOption: "B",
        explanation: "The wind is personified with human actions ('whistled', 'howling its lonely lament').",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q22",
        type: "standard",
        question: "A fourteen-line poem composed in iambic pentameter with the rhyme scheme ABAB CDCD EFEF GG is known as a/an:",
        options: [
          { id: "A", text: "Petrarchan Sonnet" },
          { id: "B", text: "Shakespearean (English) Sonnet" },
          { id: "C", text: "Spenserian Stanza" },
          { id: "D", text: "Ballad" },
        ],
        correctOption: "B",
        explanation: "The Shakespearean (English) sonnet consists of three quatrains and a concluding rhyming couplet with the rhyme scheme ABAB CDCD EFEF GG.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q23",
        type: "standard",
        question: "In poetry, the running over of a sentence or phrase from one poetic line to the next without terminal punctuation is called:",
        options: [
          { id: "A", text: "Caesura" },
          { id: "B", text: "Enjambment" },
          { id: "C", text: "Refrain" },
          { id: "D", text: "Anaphora" },
        ],
        correctOption: "B",
        explanation: "Enjambment occurs when a syntactic unit does not end at the line break but continues into the following line without terminal punctuation.",
        difficulty: "medium",
      },
      {
        id: "english-unit1-q24",
        type: "assertion-reason",
        question: "Given below are two statements:\nAssertion (A): The phrase 'deafening silence' is an example of an oxymoron.\nReason (R): An oxymoron brings together two contradictory or opposing terms in close juxtaposition to reveal a deeper paradoxical truth.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Both statements are completely true and (R) provides the exact definition that validates why 'deafening silence' is an oxymoron.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q25",
        type: "match-the-following",
        question: "Match List-I (Poetic Example) with List-II (Figure of Speech):\nList-I:\n(P) As brave as a lion\n(Q) Life is a broken-winged bird\n(R) The leaves danced across the lawn\n(S) Parting is such sweet sorrow\n\nList-II:\n(1) Metaphor\n(2) Simile\n(3) Oxymoron\n(4) Personification",
        options: [
          { id: "A", text: "P-2, Q-1, R-4, S-3" },
          { id: "B", text: "P-1, Q-2, R-4, S-3" },
          { id: "C", text: "P-2, Q-4, R-1, S-3" },
          { id: "D", text: "P-4, Q-1, R-2, S-3" },
        ],
        correctOption: "A",
        explanation: "P = Simile ('as'); Q = Metaphor (direct equation); R = Personification (leaves danced); S = Oxymoron (sweet sorrow).",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q26",
        type: "standard",
        question: "The repetition of the same initial consonant sound in a series of words, as in 'The fair breeze blew, the white foam flew', is called:",
        options: [
          { id: "A", text: "Assonance" },
          { id: "B", text: "Alliteration" },
          { id: "C", text: "Apostrophe" },
          { id: "D", text: "Metonymy" },
        ],
        correctOption: "B",
        explanation: "Alliteration is the repetition of identical consonant sounds at the beginning of words in close proximity.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q27",
        type: "standard",
        question: "In Robert Frost's poem 'The Road Not Taken', the two diverged roads in the yellow wood serve as a central symbol for:",
        options: [
          { id: "A", text: "Literal highway infrastructure in rural America" },
          { id: "B", text: "Crucial life-altering choices and decisions where one path precludes another" },
          { id: "C", text: "Deforestation and logging" },
          { id: "D", text: "A bicycle race" },
        ],
        correctOption: "B",
        explanation: "The diverging paths symbolize irreversible existential choices in life where taking one course fundamentally shapes one's future.",
        difficulty: "easy",
      },
      {
        id: "english-unit1-q28",
        type: "standard",
        question: "Which sensory imagery is predominantly evoked by the line: 'The acrid stench of burning rubber filled the stagnant air'?",
        options: [
          { id: "A", text: "Visual imagery" },
          { id: "B", text: "Olfactory imagery" },
          { id: "C", text: "Gustatory imagery" },
          { id: "D", text: "Tactile imagery" },
        ],
        correctOption: "B",
        explanation: "'Acrid stench' appeals directly to the sense of smell (olfactory imagery).",
        difficulty: "medium",
      },
      {
        id: "english-unit1-q29",
        type: "standard",
        question: "A seemingly self-contradictory statement that, upon closer inspection, expresses a profound philosophical truth is called a/an:",
        options: [
          { id: "A", text: "Paradox" },
          { id: "B", text: "Euphemism" },
          { id: "C", text: "Pun" },
          { id: "D", text: "Malapropism" },
        ],
        correctOption: "A",
        explanation: "A paradox is a statement that appears absurd or contradictory but reveals an underlying truth (e.g., 'The only constant is change').",
        difficulty: "medium",
      },
      {
        id: "english-unit1-q30",
        type: "standard",
        question: "In literature, the substitution of an inoffensive or mild expression for one that may offend or suggest something unpleasant (e.g., 'passed away' instead of 'died') is termed:",
        options: [
          { id: "A", text: "Hyperbole" },
          { id: "B", text: "Euphemism" },
          { id: "C", text: "Synecdoche" },
          { id: "D", text: "Irony" },
        ],
        correctOption: "B",
        explanation: "A euphemism is a mild or indirect word or expression substituted for one considered harsh or blunt.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Factual Passages", "Narrative Passages"],
      relatedTopics: ["Para Jumbles", "Vocabulary, Idioms and Phrases"],
      practiceTestId: "practice-english-unit1-test3",
      practiceTestUrl: "/test/practice-english-unit1-test3",
      weaknessReportUrl: "/dashboard/radar?subject=english",
      weaknessRadarUrl: "/dashboard/radar?subject=english",
    },
  },

  // UNIT 2 - TOPIC 1: Para Jumbles
  {
    id: "english-unit2-para-jumbles",
    slug: "para-jumbles",
    subject: "english",
    subjectName: "English",
    subjectCode: "101",
    unitNumber: 2,
    unitTitle: "Verbal Ability & Sentence Rearrangement",
    topicTitle: "Para Jumbles",
    ncertReference: {
      book: "CUET-UG English Language / Verbal Ability & Logic",
      chapter: "Section B: Para Jumbles & Paragraph Coherence",
      pages: "Pages 106-140",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 92,
      weightagePercentage: 13.0,
    },
    thirtySecondSummary: [
      "Para Jumbles present 4 to 5 scrambled sentences (P, Q, R, S) that must be assembled into a logically coherent, cohesive paragraph.",
      "Identify the 'Opening Sentence' (Independent sentence introducing the main subject/noun, free from back-referencing pronouns like he, she, it, they, or contrast connectives like however, but, therefore).",
      "Establish 'Mandatory Pairs' through 4 unbreakable connectors: Pronoun-Antecedent links, Acronym-Full Form order, Chronological timeline links, and Cause-and-Effect conjunctions.",
      "Leverage the Answer Choices: Do not test all 24 possible permutations; examine the starting letters of given options to narrow down candidates immediately.",
      "Confirm the 'Concluding Sentence': Summarizes the main thesis, states an ultimate outcome, or provides a forward-looking recommendation.",
    ],
    coreConcepts: [
      {
        title: "The Anatomy of an Opening Sentence",
        explanation:
          "The first sentence of a well-formed paragraph must possess semantic independence. It introduces the primary subject, concept, or event without presupposing prior knowledge from preceding sentences.\nRules to identify the opener:\n1. Noun before Pronoun: A sentence opening with 'Albert Einstein was a theoretical physicist...' will precede 'He formulated the theory of relativity...'.\n2. Full Name before Abbreviation: 'World Health Organization (WHO)' precedes 'The WHO announced...'.\n3. General before Specific: Broad conceptual definitions precede detailed empirical examples.\n4. Disqualifiers for Openers: Sentences beginning with transitional conjunctions ('However', 'Moreover', 'Furthermore', 'Consequently', 'On the contrary') or demonstrative pronouns ('These measures', 'Such problems', 'This discovery') can NEVER be the opening sentence.",
        keyTakeaways: [
          "Semantic independence: The sentence must make complete sense in isolation.",
          "Full form precedes acronym; noun precedes third-person pronoun.",
          "Transitional adverbs (However, Therefore) cannot start the paragraph.",
        ],
        ncertPointer:
          "CBSE Class XII Core English, Coherence and Paragraph Writing, pp. 108-118.",
      },
      {
        title: "Establishing Mandatory Pairs (The Core Solving Engine)",
        explanation:
          "Rather than trying to sequence the entire paragraph at once, finding ONE mandatory pair (two sentences that MUST sit adjacently) instantly eliminates 2 to 3 wrong options.\n1. Pronoun-Antecedent Link: Sentence A: 'Dr. Jane Goodall arrived in Gombe in 1960.' -> Sentence B: 'She began observing wild chimpanzees.' -> Mandatory Pair: AB.\n2. Conjunction & Contrast Pairs: Sentence A poses a thesis ('Nuclear energy produces zero greenhouse gases.'); Sentence B contrasts it ('However, nuclear waste disposal presents severe environmental hazards.'). Pair: AB.\n3. Cause and Effect: Sentence A describes the cause ('Heavy torrential rains lashed the mountain slopes.'); Sentence B describes the outcome ('Consequently, severe landslides blocked the national highway.').\n4. Question and Answer: A rhetorical or genuine question is immediately followed by its answer or explanation.",
        keyTakeaways: [
          "Mandatory Pair: Find two sentences that cannot be separated.",
          "Cause -> Effect; Noun -> Pronoun; Problem -> Solution.",
          "Filter the 4 options: Keep only options containing the identified pair in sequence.",
        ],
        ncertPointer:
          "CUET Verbal Ability Master Guide, Mandatory Pairs & Cohesion Techniques, pp. 120-130.",
      },
      {
        title: "Option-Driven Elimination Strategy for Speed",
        explanation:
          "CUET provides 4 multiple-choice options (e.g., A) PQRS, B) QPRS, C) SPQR, D) QSRP).\n1. Check the First Letters of the Options: In the example above, the possible openers are P, Q, and S. Sentence R is immediately ruled out as the opener without reading it.\n2. Test Candidate Openers: Determine whether P, Q, or S makes a valid independent opening sentence.\n3. If Q is established as the sole valid opener, eliminate A and C immediately. You are left with only (B) QPRS and (D) QSRP.\n4. Compare B and D: Check whether P follows Q, or S follows Q. This reduces solving time from 2 minutes to 25 seconds.",
        keyTakeaways: [
          "Never arrange blind; always inspect option prefixes.",
          "Narrow down to 2 options within 15 seconds.",
          "Verify the chosen sequence by reading it once as a continuous paragraph.",
        ],
        ncertPointer:
          "NTA CUET English Speed Tactics, Verbal Ability Elimination, pp. 132-140.",
      },
    ],
    keyFacts: [
      {
        concept: "Pronoun-Antecedent Rule",
        formulaOrFact: "Noun (Antecedent) must appear before Third-Person Pronoun (He, She, It, They)",
        explanation: "A pronoun cannot introduce a subject whose identity has not yet been established.",
        examTip: "If sentence P has 'Alexander' and sentence R has 'He marched into India', P MUST precede R (Pair: P...R).",
      },
      {
        concept: "Acronym Rule",
        formulaOrFact: "Full Organization Name precedes its Acronym",
        explanation: "Writing standards mandate defining an acronym on first mention: 'Indian Space Research Organisation (ISRO)' precedes 'ISRO'.",
        examTip: "Sentence with full name must come before sentence with acronym.",
      },
      {
        concept: "Chronological Sequence Link",
        formulaOrFact: "Past -> Present -> Future / Earlier date -> Later date",
        explanation: "Biographical and historical passages strictly follow the arrow of time unless explicit flashback grammar is used.",
        examTip: "Years like 1947 -> 1950 -> 1965 must follow ascending chronological order.",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" fill="#f8fafc" rx="12"/>
  <text x="400" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0f172a">Para Jumbles Solving Protocol: Mandatory Pairs &amp; Elimination</text>
  
  <!-- Flow Container -->
  <g transform="translate(50, 60)">
    <!-- Step 1 -->
    <rect x="0" y="0" width="155" height="110" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="77" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#1d4ed8">Step 1: Check Options</text>
    <text x="77" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1e40af">Inspect First Letters</text>
    <text x="10" y="66" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• E.g., options start with</text>
    <text x="10" y="80" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" fill="#2563eb">  P, Q, or S</text>
    <text x="10" y="96" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Discard R as opener</text>

    <!-- Arrow 1 -->
    <line x1="155" y1="55" x2="180" y2="55" stroke="#3b82f6" stroke-width="2"/>

    <!-- Step 2 -->
    <rect x="180" y="0" width="160" height="110" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="260" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#1d4ed8">Step 2: Find Opener</text>
    <text x="260" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1e40af">Semantic Independence</text>
    <text x="190" y="66" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Full noun introduction</text>
    <text x="190" y="80" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• No 'However', 'Therefore'</text>
    <text x="190" y="96" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• No naked pronouns (he/it)</text>

    <!-- Arrow 2 -->
    <line x1="340" y1="55" x2="365" y2="55" stroke="#3b82f6" stroke-width="2"/>

    <!-- Step 3 -->
    <rect x="365" y="0" width="165" height="110" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="447" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#1d4ed8">Step 3: Mandatory Pair</text>
    <text x="447" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1e40af">The Core Engine</text>
    <text x="375" y="66" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Noun -> Pronoun (AB)</text>
    <text x="375" y="80" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Cause -> Consequence</text>
    <text x="375" y="96" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Thesis -> Contrast link</text>

    <!-- Arrow 3 -->
    <line x1="530" y1="55" x2="555" y2="55" stroke="#3b82f6" stroke-width="2"/>

    <!-- Step 4 -->
    <rect x="555" y="0" width="145" height="110" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="627" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#1d4ed8">Step 4: Verify</text>
    <text x="627" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1e40af">Final Read-Through</text>
    <text x="565" y="66" font-family="system-ui, sans-serif" font-size="10" fill="#334155">• Read sequence as</text>
    <text x="565" y="80" font-family="system-ui, sans-serif" font-size="10" fill="#334155">  continuous story</text>
    <text x="565" y="96" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" fill="#16a34a">100% Accuracy</text>
  </g>

  <!-- 4 Mandatory Pair Types Box -->
  <rect x="50" y="195" width="700" height="255" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="400" y="224" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">THE FOUR MANDATORY PAIR CONNECTORS</text>

  <!-- Pair Type 1 -->
  <rect x="65" y="242" width="320" height="85" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="75" y="264" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">1. Noun – Pronoun Link:</text>
  <text x="75" y="282" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• S1: "Nelson Mandela spent 27 years in prison."</text>
  <text x="75" y="298" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• S2: "He emerged without bitterness to lead the nation."</text>
  <text x="75" y="314" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#2563eb">• Unbreakable Pair: S1 -> S2</text>

  <!-- Pair Type 2 -->
  <rect x="415" y="242" width="320" height="85" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="425" y="264" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">2. Contrast / Conjunction Transition:</text>
  <text x="425" y="282" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• S1: "Electric vehicles boast zero tailpipe emissions."</text>
  <text x="425" y="298" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• S2: "However, battery manufacturing has high carbon debt."</text>
  <text x="425" y="314" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#2563eb">• Unbreakable Pair: S1 -> S2</text>

  <!-- Pair Type 3 -->
  <rect x="65" y="342" width="320" height="90" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="75" y="364" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">3. Acronym &amp; Expansion Rule:</text>
  <text x="75" y="382" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• S1: "The Indian Space Research Organisation (ISRO)..."</text>
  <text x="75" y="398" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• S2: "ISRO subsequently launched the Chandrayaan mission."</text>
  <text x="75" y="416" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#2563eb">• Unbreakable Pair: S1 must precede S2</text>

  <!-- Pair Type 4 -->
  <rect x="415" y="342" width="320" height="90" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="425" y="364" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">4. Cause &amp; Consequence Chain:</text>
  <text x="425" y="382" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• S1: "Severe droughts destroyed three successive harvests."</text>
  <text x="425" y="398" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• S2: "As a result, rural families migrated into cities."</text>
  <text x="425" y="416" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#2563eb">• Unbreakable Pair: S1 -> S2</text>
</svg>`,
    workedExamples: [
      {
        id: "english-unit2-we1",
        questionNumber: 1,
        question:
          "Rearrange the following jumbled sentences to form a logical and coherent paragraph:\n(P) He spent his childhood exploring the woods and streams around his village.\n(Q) Dr. Salim Ali is celebrated as the 'Birdman of India'.\n(R) This early fascination with nature eventually inspired him to dedicate his life to ornithology.\n(S) Born in Mumbai in 1896, he was introduced to the beauty of avians at an early age.",
        options: [
          { id: "A", text: "P Q R S" },
          { id: "B", text: "Q S P R" },
          { id: "C", text: "S P Q R" },
          { id: "D", text: "Q P S R" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Check options: The possible openers are P, Q, and S. Sentence P begins with 'He', which has no antecedent yet. Sentence Q ('Dr. Salim Ali is celebrated...') introduces the subject with full name and honorific. Q is the best opening sentence. Eliminate A and C.",
          "Step 2: We are left with (B) QSPR and (D) QPSR.",
          "Step 3: Compare S and P after Q. Sentence S gives his birth date ('Born in Mumbai in 1896...') and introduces his early love for birds. Sentence P follows by describing what he did in his childhood ('He spent his childhood exploring...').",
          "Step 4: Sentence R ('This early fascination...') refers directly back to the exploration described in P. Thus, PR is a mandatory pair.",
          "Step 5: The coherent sequence is Q -> S -> P -> R (Option B).",
        ],
        cuetInsight:
          "Establishing the opener (Q) and the demonstrative link ('This early fascination' linking to P) solves the question in under 30 seconds.",
      },
      {
        id: "english-unit2-we2",
        questionNumber: 2,
        question:
          "Rearrange the jumbled sentences:\n(P) However, excessive reliance on artificial intelligence poses serious cognitive risks.\n(Q) Technology has undeniably revolutionized everyday productivity and communication.\n(R) For instance, over-dependence on navigation apps can erode natural spatial orientation.\n(S) Therefore, a balanced approach combining digital tools with active human thinking is essential.",
        options: [
          { id: "A", text: "Q P R S" },
          { id: "B", text: "P Q S R" },
          { id: "C", text: "S R P Q" },
          { id: "D", text: "R P Q S" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Identify the opener: P starts with 'However' (contrast); R starts with 'For instance' (example); S starts with 'Therefore' (conclusion). None of these can open the paragraph.",
          "Step 2: Sentence Q introduces the broad positive premise ('Technology has undeniably revolutionized...'). Thus Q must be the first sentence. Only Option A begins with Q!",
          "Step 3: Confirm the sequence in A: Q (positive premise) -> P (contrast: 'However, excessive reliance...') -> R (specific example: 'For instance, navigation apps...') -> S (conclusion: 'Therefore, a balanced approach...'). Perfect logical flow.",
        ],
        cuetInsight:
          "When only ONE option starts with the true independent opening sentence, you can solve the question in 10 seconds without checking other permutations.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "4-Sentence Standard Para Jumble (P-Q-R-S)",
        frequency: "Very High (4-6 questions per shift)",
        typicalStem: "Choose the most logical order of sentences from among the four given options to construct a meaningful paragraph.",
        strategy: "Scan option prefixes first, identify the semantic opener, build one mandatory pair, and confirm.",
      },
      {
        patternType: "Fixed First and Last Sentence (S1 ... S6)",
        frequency: "Medium",
        typicalStem: "Sentence S1 and S6 are fixed. Rearrange P, Q, R, S between them to form a coherent text.",
        strategy: "Find which sentence links directly to S1, and which sentence leads into the concluding S6.",
      },
    ],
    commonTraps: [
      {
        trap: "Selecting a sentence with a demonstrative pronoun ('This problem', 'These findings') as the opener.",
        whyItTraps: "The sentence sounds important and sweeping, but demonstrative adjectives require prior explanation of what 'this' or 'these' refer to.",
        howToAvoid: "Ask: 'Has the specific problem been named yet?' If not, it cannot be the first sentence.",
      },
      {
        trap: "Placing an example before the rule.",
        whyItTraps: "Sentences with 'For example' or 'For instance' explain an assertion, so they must follow the assertion.",
        howToAvoid: "General principle must precede 'For instance'.",
      },
    ],
    mnemonics: [
      {
        mnemonic: "O-P-E-N = Opener first, Pairs mandatory, Eliminate options, Narrative flow",
        meaning: "Step-by-step checklist to solve Para Jumbles rapidly.",
        application: "Prevents reading in chaotic loops.",
      },
    ],
    quickRevisionCard: {
      title: "Para Jumbles High-Yield Revision",
      keyPoints: [
        "Opener: Must have semantic independence (Noun, full name, general premise).",
        "Never Opener: 'However', 'Therefore', 'Moreover', 'Consequently', 'He/She/It/They'.",
        "Mandatory Pairs: Noun -> Pronoun; Full name -> Acronym; Cause -> Effect; Problem -> Solution.",
        "Check Option Prefixes: Eliminate non-opener starting letters immediately.",
        "Example Rule: General claim always precedes 'For example' / 'For instance'.",
        "Read-Through: Always read your final chosen 4-letter sequence to verify smooth transitions.",
      ],
    },
    practiceQuestions: [
      {
        id: "english-unit2-q1",
        type: "standard",
        question: "Which of the following transition words in a sentence strongly indicates that the sentence CANNOT be the opening sentence of a paragraph?",
        options: [
          { id: "A", text: "Consequently" },
          { id: "B", text: "Initially" },
          { id: "C", text: "Traditionally" },
          { id: "D", text: "Throughout history" },
        ],
        correctOption: "A",
        explanation: "'Consequently' introduces a result or effect, which requires an antecedent cause to have been stated in a preceding sentence.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q2",
        type: "standard",
        question: "Rearrange the jumbled sentences:\n(P) It transforms atmospheric carbon dioxide into glucose.\n(Q) Photosynthesis is the fundamental biological engine of life on Earth.\n(R) In doing so, it releases vital oxygen into the atmosphere as a byproduct.\n(S) Through this mechanism, green plants support the entire global food web.",
        options: [
          { id: "A", text: "Q P R S" },
          { id: "B", text: "P Q R S" },
          { id: "C", text: "S P Q R" },
          { id: "D", text: "Q S R P" },
        ],
        correctOption: "A",
        explanation: "Q introduces the concept 'Photosynthesis'; P explains its primary action ('transforms CO2 into glucose'); R adds the byproduct ('In doing so, releases oxygen'); S concludes the global significance.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q3",
        type: "standard",
        question: "In the context of arranging scrambled sentences, the 'Noun-Pronoun Rule' dictates that:",
        options: [
          { id: "A", text: "Pronouns must always precede proper nouns" },
          { id: "B", text: "A proper noun must be introduced in an earlier sentence before a corresponding third-person pronoun (he, she, it, they) can refer to it" },
          { id: "C", text: "Nouns and pronouns cannot exist in the same paragraph" },
          { id: "D", text: "All sentences must begin with pronouns" },
        ],
        correctOption: "B",
        explanation: "A pronoun is a referential word that grammatically requires an established antecedent noun to provide meaning.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q4",
        type: "assertion-reason",
        question: "Given below are two statements:\nAssertion (A): Examining the first letters of the answer choices is the most effective initial step in solving Para Jumbles under timed conditions.\nReason (R): Answer choices typically narrow down the candidate opening sentences to only two or three possibilities, saving the student from evaluating all twenty-four theoretical permutations.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Both statements are completely true and (R) gives the mathematical and tactical reason why option inspection accelerates solving.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q5",
        type: "standard",
        question: "Rearrange the jumbled sentences:\n(P) However, without strict ethical guardrails, synthetic biology could trigger ecological disasters.\n(Q) Genetic engineering holds immense promise for curing hereditary diseases.\n(R) For example, gene editing can eradicate sickle-cell anemia and thalassemia.\n(S) Therefore, international regulatory oversight must precede widespread clinical deployment.",
        options: [
          { id: "A", text: "Q R P S" },
          { id: "B", text: "P Q R S" },
          { id: "C", text: "S R P Q" },
          { id: "D", text: "R Q P S" },
        ],
        correctOption: "A",
        explanation: "Q introduces the promise of genetic engineering; R provides the example ('For example, sickle-cell...'); P introduces the contrast ('However, without guardrails...'); S provides the logical conclusion ('Therefore, oversight...').",
        difficulty: "medium",
      },
      {
        id: "english-unit2-q6",
        type: "standard",
        question: "If sentence A describes 'The discovery of penicillin by Alexander Fleming in 1928' and sentence B describes 'The widespread deployment of antibiotics during World War II in the 1940s', what is the natural chronological relationship between them?",
        options: [
          { id: "A", text: "Sentence B must precede Sentence A" },
          { id: "B", text: "Sentence A must precede Sentence B" },
          { id: "C", text: "Both sentences must be placed at the very end of the paragraph" },
          { id: "D", text: "They cannot belong to the same text" },
        ],
        correctOption: "B",
        explanation: "Historical narrative logic dictates that the initial discovery (1928) must precede the subsequent wartime mass deployment (1940s).",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q7",
        type: "standard",
        question: "Rearrange the jumbled sentences:\n(P) This catastrophic collision led to the extinction of approximately 75% of all plant and animal species.\n(Q) Sixty-six million years ago, a massive asteroid struck the Earth near the Yucatan Peninsula.\n(R) The impact unleashed global wildfires, megatsunamis, and an atmospheric dust veil that blocked sunlight for years.\n(S) Most famously, it brought an abrupt end to the reign of non-avian dinosaurs.",
        options: [
          { id: "A", text: "Q R P S" },
          { id: "B", text: "P Q R S" },
          { id: "C", text: "R P Q S" },
          { id: "D", text: "S P Q R" },
        ],
        correctOption: "A",
        explanation: "Q opens with the asteroid impact 66 mya; R describes the immediate physical aftermath ('The impact unleashed...'); P describes the overall extinction scale ('This catastrophic collision led to...'); S concludes with the famous dinosaur extinction.",
        difficulty: "medium",
      },
      {
        id: "english-unit2-q8",
        type: "standard",
        question: "What is a 'Mandatory Pair' in Para Jumbles terminology?",
        options: [
          { id: "A", text: "Two words that rhyme in the passage" },
          { id: "B", text: "Two sentences whose grammatical or logical connections dictate that they must appear adjacent to one another in an invariant order" },
          { id: "C", text: "Two sentences containing identical numbers of words" },
          { id: "D", text: "The first and last sentence of every story" },
        ],
        correctOption: "B",
        explanation: "A mandatory pair is an unbreakable two-sentence unit linked by cause-effect, noun-pronoun, or chronological continuity.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q9",
        type: "standard",
        question: "Rearrange the jumbled sentences:\n(P) He subsequently established the University of Nalanda as a premier center of Buddhist learning.\n(Q) Emperor Kumaragupta I ruled over the flourishing Gupta Empire in the 5th century CE.\n(R) Under his enlightened patronage, scholars and monks flocked to India from China, Korea, and Central Asia.\n(S) His reign is widely remembered for administrative peace and artistic patronage.",
        options: [
          { id: "A", text: "Q S P R" },
          { id: "B", text: "P Q R S" },
          { id: "C", text: "S Q P R" },
          { id: "D", text: "Q R S P" },
        ],
        correctOption: "A",
        explanation: "Q introduces the emperor; S summarizes his peaceful reign; P notes his founding of Nalanda; R explains the international scholars who flocked to Nalanda.",
        difficulty: "medium",
      },
      {
        id: "english-unit2-q10",
        type: "standard",
        question: "In a four-sentence Para Jumble, a sentence opening with the words 'On the other hand' serves what functional role?",
        options: [
          { id: "A", text: "It introduces the initial independent thesis" },
          { id: "B", text: "It introduces a contrasting viewpoint or alternative perspective to a point made in the preceding sentence" },
          { id: "C", text: "It marks the end of all human communication" },
          { id: "D", text: "It defines a new mathematical term" },
        ],
        correctOption: "B",
        explanation: "'On the other hand' is a contrastive discourse marker indicating a counter-argument or opposing aspect of the topic.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Factual Passages", "Narrative Passages"],
      relatedTopics: ["Rearranging parts of a sentence", "Sentence completion"],
      practiceTestId: "practice-english-unit2-test1",
      practiceTestUrl: "/test/practice-english-unit2-test1",
      weaknessReportUrl: "/dashboard/radar?subject=english",
      weaknessRadarUrl: "/dashboard/radar?subject=english",
    },
  },

  // UNIT 2 - TOPIC 2: Rearranging parts of a sentence
  {
    id: "english-unit2-rearranging-parts-of-a-sentence",
    slug: "rearranging-parts-of-a-sentence",
    subject: "english",
    subjectName: "English",
    subjectCode: "101",
    unitNumber: 2,
    unitTitle: "Verbal Ability & Sentence Rearrangement",
    topicTitle: "Rearranging parts of a sentence",
    ncertReference: {
      book: "CUET-UG English Language / Verbal Ability & Syntax",
      chapter: "Section B: Sentence Syntax, Clause Structure & Phrasal Reordering",
      pages: "Pages 141-170",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 96,
      weightagePercentage: 13.5,
    },
    thirtySecondSummary: [
      "Rearranging parts of a sentence tests syntactic command by splitting a single complex or compound sentence into 4 fragments (P, Q, R, S) that must be reassembled in grammatical order.",
      "The English sentence core follows the canonical SVOMPT structure: Subject + Verb + Object + Manner + Place + Time.",
      "Identify the grammatical subject (Noun / Noun Phrase) and its predicate verb. A fragment ending with a preposition (in, of, for, with) or transitive verb MUST be immediately followed by its noun object.",
      "Maintain relative clause proximity: Relative pronouns (who, whom, which, that) must directly follow the specific noun/antecedent they modify.",
      "Conjunction pairs (not only... but also; either... or; neither... nor; both... and) must maintain parallel grammatical structures.",
    ],
    coreConcepts: [
      {
        title: "Canonical Sentence Syntax (SVOMPT Hierarchy)",
        explanation:
          "Standard English syntax adheres to a strict structural hierarchy:\n[Subject] + [Verb / Aux + Main Verb] + [Direct / Indirect Object] + [Modifier of Manner] + [Modifier of Place] + [Modifier of Time].\nWhen fragments are jumbled, locate:\n1. The Subject Fragment: Who or what is performing the action? (e.g., 'The committee of senior scientists', 'A sudden influx of foreign capital').\n2. The Finite Verb Fragment: The verb displaying tense/agreement (e.g., 'has unanimously approved', 'struggled to maintain').\n3. The Object / Complement: Receiving the action (e.g., 'the revised environmental guidelines', 'equilibrium in the market').",
        keyTakeaways: [
          "Core backbone = Subject + Verb + Object.",
          "Auxiliary verbs (is, was, have, will) must couple with their corresponding main verbs.",
          "Adverbial modifiers of time and place generally sit at the end (or as fronted introductory clauses).",
        ],
        ncertPointer:
          "CBSE Class XII English Grammar & Syntax, Sentence Structure, pp. 142-152.",
      },
      {
        title: "Dangling Prepositions, Conjunctions & Relative Clauses",
        explanation:
          "Sentence fragments often break at syntactic joints. Analyzing boundary words provides instantaneous clues:\n1. Prepositional Anchoring: A fragment ending with 'in search of' cannot end the sentence; it must link to a fragment starting with a noun phrase ('food and shelter').\n2. Correlative Conjunction Pairs:\n- 'Not only' in fragment P requires 'but also' in another fragment.\n- 'Either' requires 'or'; 'Neither' requires 'nor'; 'Between' requires 'and'. Both elements must share parallel parts of speech.\n3. Relative Pronoun Placement: A fragment beginning with 'who lived in London' must follow immediately after a human antecedent ('the distinguished author who lived in London'). Placing it after an inanimate noun ('the published book who lived in London') creates a fatal dangling modifier error.",
        keyTakeaways: [
          "Prepositions demand noun objects immediately following them.",
          "Relative pronouns (who, which, that) must hug their antecedents.",
          "Correlative conjunctions require strict grammatical parallelism.",
        ],
        ncertPointer:
          "CUET Syntax & Sentence Correction Guide, pp. 154-162.",
      },
      {
        title: "Option Verification and Elimination Tactics",
        explanation:
          "Sentence reordering questions in CUET provide 4 letter combinations (e.g., A: PQRS, B: QPRS, C: RPSQ, D: SPRQ).\n1. Check Boundary Continuity: If fragment P ends in 'the', the next fragment CANNOT begin with a finite verb like 'went'; it MUST begin with a noun or adjective.\n2. If fragment R ends with 'to', the following fragment must begin with an infinitive base verb ('investigate') or a noun phrase ('the museum').\n3. Read the assembled sentence aloud in your mind: If there is any syntactic hiccup, comma splice, or broken clause, eliminate that option immediately.",
        keyTakeaways: [
          "Boundary check: Match the last word of fragment X with the first word of fragment Y.",
          "A fragment ending in an article (a, an, the) must link to a noun/adjective.",
          "Test the complete sentence for natural spoken rhythm and grammatical sanity.",
        ],
        ncertPointer:
          "NTA CUET English Language Practice Tests, Sentence Jumbles, pp. 164-170.",
      },
    ],
    keyFacts: [
      {
        concept: "The Article-Noun Link",
        formulaOrFact: "A fragment ending in 'a', 'an', or 'the' must be followed by a Noun or Adjective",
        explanation: "Articles cannot exist in isolation without a noun headword.",
        examTip: "If P ends with 'the', any option where P is followed by a verb or punctuation is instantly eliminated.",
      },
      {
        concept: "Infinitive 'To' Link",
        formulaOrFact: "'To' is followed by a Base Verb (V1) or a Destination Noun",
        explanation: "E.g., 'decided to' must link to 'undertake a perilous journey'.",
        examTip: "Look for the V1 verb among starting words of other fragments.",
      },
      {
        concept: "Parallelism with Correlative Conjunctions",
        formulaOrFact: "Not only [Verb/Noun/Adj] ... but also [Same Part of Speech]",
        explanation: "If 'not only' precedes a verb phrase, 'but also' must precede a verb phrase.",
        examTip: "A frequent grammar checkpoint in higher-difficulty CUET shifts.",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" fill="#fcfcfd" rx="12"/>
  <text x="400" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0f172a">Sentence Rearrangement: Syntactic Linking Rules</text>
  
  <!-- Core Sentence Train -->
  <g transform="translate(45, 60)">
    <!-- Subject -->
    <rect x="0" y="0" width="165" height="85" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="82" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1d4ed8">1. SUBJECT</text>
    <text x="82" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1e40af">Noun / Noun Phrase</text>
    <text x="82" y="62" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#334155">"The panel of experts"</text>

    <!-- Connector 1 -->
    <line x1="165" y1="42" x2="185" y2="42" stroke="#3b82f6" stroke-width="3"/>

    <!-- Verb -->
    <rect x="185" y="0" width="165" height="85" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="267" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1d4ed8">2. VERB / PREDICATE</text>
    <text x="267" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1e40af">Finite Verb / Auxiliary</text>
    <text x="267" y="62" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#334155">"has recommended"</text>

    <!-- Connector 2 -->
    <line x1="350" y1="42" x2="370" y2="42" stroke="#3b82f6" stroke-width="3"/>

    <!-- Object -->
    <rect x="370" y="0" width="165" height="85" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="452" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1d4ed8">3. OBJECT</text>
    <text x="452" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1e40af">Receiver of Action</text>
    <text x="452" y="62" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#334155">"strict new policies"</text>

    <!-- Connector 3 -->
    <line x1="535" y1="42" x2="555" y2="42" stroke="#3b82f6" stroke-width="3"/>

    <!-- Modifiers -->
    <rect x="555" y="0" width="155" height="85" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="632" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1d4ed8">4. MODIFIERS</text>
    <text x="632" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1e40af">Manner / Place / Time</text>
    <text x="632" y="62" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#334155">"in urban hospitals"</text>
  </g>

  <!-- Boundary Traps Grid -->
  <rect x="45" y="175" width="710" height="275" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="400" y="205" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">SYNTACTIC BOUNDARY CHECKS</text>

  <!-- Boundary Rule 1 -->
  <rect x="65" y="225" width="320" height="95" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="75" y="248" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Preposition Ending Check:</text>
  <text x="75" y="266" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• If fragment ends with: <tspan font-weight="bold">of, in, with, for, to</tspan></text>
  <text x="75" y="282" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Next fragment MUST start with a Noun / Gerund</text>
  <text x="75" y="300" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#dc2626">✗ Never followed by: punctuation, 'and', 'but'</text>

  <!-- Boundary Rule 2 -->
  <rect x="415" y="225" width="320" height="95" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="425" y="248" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Article Ending Check:</text>
  <text x="425" y="266" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• If fragment ends with: <tspan font-weight="bold">a, an, the</tspan></text>
  <text x="425" y="282" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Next fragment MUST start with an Adjective/Noun</text>
  <text x="425" y="300" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#dc2626">✗ Never followed by: finite verbs, prepositions</text>

  <!-- Boundary Rule 3 -->
  <rect x="65" y="335" width="320" height="95" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="75" y="358" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Relative Pronoun Proximity:</text>
  <text x="75" y="376" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Who / Whom:</tspan> Must directly follow a Person</text>
  <text x="75" y="392" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• <tspan font-weight="bold">Which / That:</tspan> Must directly follow a Thing/Animal</text>
  <text x="75" y="410" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#16a34a">✓ "The surgeon who performed the operation..."</text>

  <!-- Boundary Rule 4 -->
  <rect x="415" y="335" width="320" height="95" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="425" y="358" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Infinitive 'To' Continuity:</text>
  <text x="425" y="376" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• If fragment ends with: <tspan font-weight="bold">'in order to' / 'decided to'</tspan></text>
  <text x="425" y="392" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Next fragment MUST start with Base Verb (V1)</text>
  <text x="425" y="410" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#16a34a">✓ "decided to [investigate the anomalies]"</text>
</svg>`,
    workedExamples: [
      {
        id: "english-unit2-sent-we1",
        questionNumber: 1,
        question:
          "Rearrange the jumbled parts to form a grammatically correct and meaningful sentence:\n(P) not only for its breathtaking natural beauty\n(Q) the Himalayan valley of Kashmir is renowned\n(R) but also for its rich tradition of exquisite handicrafts\n(S) across the entire civilized world",
        options: [
          { id: "A", text: "Q P S R" },
          { id: "B", text: "Q S P R" },
          { id: "C", text: "P R Q S" },
          { id: "D", text: "S Q P R" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Identify the main subject and finite verb: Fragment Q ('the Himalayan valley of Kashmir is renowned') contains the complete subject and passive verb.",
          "Step 2: Examine correlative conjunctions: Fragment P has 'not only for its...' and Fragment R has 'but also for its...'. This forms a mandatory pair: P -> R.",
          "Step 3: Where does S ('across the entire civilized world') fit? Kashmir is renowned across the entire civilized world not only for... but also for... (Q -> S -> P -> R).",
          "Step 4: Verify the full sentence: 'The Himalayan valley of Kashmir is renowned across the entire civilized world not only for its breathtaking natural beauty but also for its rich tradition of exquisite handicrafts.' Perfect syntax and rhythm.",
        ],
        cuetInsight:
          "Correlative parallelism (not only for X ... but also for Y) is a cornerstone of CUET sentence rearrangement.",
      },
      {
        id: "english-unit2-sent-we2",
        questionNumber: 2,
        question:
          "Rearrange the jumbled fragments:\n(P) to curb greenhouse gas emissions\n(Q) despite repeated warnings by climate scientists\n(R) several industrialized nations have failed\n(S) to take decisive policy measures",
        options: [
          { id: "A", text: "Q R S P" },
          { id: "B", text: "P Q R S" },
          { id: "C", text: "R S P Q" },
          { id: "D", text: "S P Q R" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Fragment Q is an introductory prepositional clause: 'despite repeated warnings by climate scientists,'.",
          "Step 2: The main subject and verb follow in R: 'several industrialized nations have failed'.",
          "Step 3: 'Failed' takes an infinitive: 'failed to take decisive policy measures' (R -> S).",
          "Step 4: 'Measures' is qualified by purpose: 'to curb greenhouse gas emissions' (S -> P).",
          "Step 5: Sequence: Q -> R -> S -> P (Option A).",
        ],
        cuetInsight:
          "Introductory prepositional phrases (Despite X, In spite of Y) frequently lead the sentence.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "4-Part Split Sentence (P-Q-R-S)",
        frequency: "Very High (5-7 questions per shift)",
        typicalStem: "Rearrange the fragments (P, Q, R, S) to create a syntactically correct sentence.",
        strategy: "Locate the subject-verb backbone, link boundary prepositions/infinitives, and match against options.",
      },
      {
        patternType: "Correlative Conjunction Alignment",
        frequency: "High",
        typicalStem: "Sentences featuring 'neither... nor', 'hardly... when', or 'no sooner... than'.",
        strategy: "Ensure the two halves of the correlative pair maintain structural parallelism.",
      },
    ],
    commonTraps: [
      {
        trap: "Linking an infinitive 'to' to an inflected verb (V-ed or V-ing).",
        whyItTraps: "'To' requires the base form of the verb (V1) (e.g., 'to investigate', not 'to investigated').",
        howToAvoid: "Check that the word following 'to' is a bare infinitive.",
      },
      {
        trap: "Splitting an adjective from its noun.",
        whyItTraps: "Examiners break fragments between an adjective and noun to induce awkward phrasing.",
        howToAvoid: "Rejoin modifier with modified noun.",
      },
    ],
    mnemonics: [
      {
        mnemonic: "S-V-O = Subject, Verb, Object (The Sacred Spine)",
        meaning: "Every standard English sentence must anchor on Subject -> Verb -> Object.",
        application: "Quickly identifies the core two fragments.",
      },
    ],
    quickRevisionCard: {
      title: "Sentence Rearrangement Quick Revision",
      keyPoints: [
        "Core Hierarchy: Subject + Verb + Object + Modifiers (Manner, Place, Time).",
        "Preposition Boundary: Words ending in 'of', 'in', 'to', 'for' MUST link to a noun/gerund.",
        "Article Boundary: Words ending in 'a', 'an', 'the' MUST link to an adjective or noun.",
        "Relative Pronouns: 'Who' follows a human; 'Which/That' follows a thing.",
        "Correlative Pairs: 'Not only... but also', 'Either... or', 'Neither... nor'.",
        "Infinitive 'To': Must link to a Base Verb (V1) (e.g., 'decided to embark').",
      ],
    },
    practiceQuestions: [
      {
        id: "english-unit2-q11",
        type: "standard",
        question: "Rearrange the jumbled parts to form a coherent sentence:\n(P) the sudden collapse of the historic bridge\n(Q) an emergency investigative committee\n(R) was constituted by the government\n(S) to look into the root causes of",
        options: [
          { id: "A", text: "Q R S P" },
          { id: "B", text: "P Q R S" },
          { id: "C", text: "S P Q R" },
          { id: "D", text: "R S P Q" },
        ],
        correctOption: "A",
        explanation: "Q is the subject ('an emergency investigative committee'); R is the passive verb ('was constituted by the government'); S is the purpose ('to look into the root causes of'); P is the prepositional object ('the sudden collapse of the historic bridge'). (Q-R-S-P).",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q12",
        type: "standard",
        question: "Rearrange the fragments:\n(P) without understanding the core principles\n(Q) is bound to result in confusion\n(R) memorizing complex mathematical formulas\n(S) during the final examination",
        options: [
          { id: "A", text: "R P Q S" },
          { id: "B", text: "P Q R S" },
          { id: "C", text: "Q S R P" },
          { id: "D", text: "S R P Q" },
        ],
        correctOption: "A",
        explanation: "R is the gerund subject ('memorizing complex mathematical formulas'); P modifies how ('without understanding the core principles'); Q is the predicate ('is bound to result in confusion'); S is the time modifier ('during the final examination'). (R-P-Q-S).",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q13",
        type: "standard",
        question: "Which of the following fragments CANNOT end an English sentence grammatically under standard rules?",
        options: [
          { id: "A", text: "...with remarkable dexterity." },
          { id: "B", text: "...despite the overwhelming odds against the." },
          { id: "C", text: "...before the sun had set." },
          { id: "D", text: "...in the ancient library." },
        ],
        correctOption: "B",
        explanation: "Fragment B ends with the definite article 'the', which is an incomplete modifier that grammatically requires a noun headword.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q14",
        type: "assertion-reason",
        question: "Given below are two statements:\nAssertion (A): In sentence rearrangement, the relative pronoun 'who' must immediately follow an antecedent denoting a human being.\nReason (R): Placing 'who' after an inanimate object creates a misplaced or dangling modifier, violating English grammatical syntax.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Both statements are completely true and (R) defines the syntactic necessity of modifier proximity.",
        difficulty: "medium",
      },
      {
        id: "english-unit2-q15",
        type: "standard",
        question: "Rearrange the fragments:\n(P) have discovered microscopic fossils\n(Q) that could rewrite the history of early life\n(R) deep within the volcanic rock formations\n(S) an international team of paleontologists",
        options: [
          { id: "A", text: "S P R Q" },
          { id: "B", text: "S R P Q" },
          { id: "C", text: "P Q R S" },
          { id: "D", text: "R S P Q" },
        ],
        correctOption: "B",
        explanation: "S is the subject ('an international team of paleontologists'); R gives the location ('deep within the volcanic rock formations'); P gives the verb and object ('have discovered microscopic fossils'); Q is the relative clause modifying fossils ('that could rewrite the history of early life'). (S-R-P-Q).",
        difficulty: "medium",
      },
      {
        id: "english-unit2-q16",
        type: "standard",
        question: "Rearrange the jumbled fragments:\n(P) not only won the prestigious national championship\n(Q) the young athlete from the rural hamlet\n(R) for the upcoming Olympic Games\n(S) but also qualified with record timing",
        options: [
          { id: "A", text: "Q P S R" },
          { id: "B", text: "P Q R S" },
          { id: "C", text: "Q S P R" },
          { id: "D", text: "S R Q P" },
        ],
        correctOption: "A",
        explanation: "Q is the subject; P contains 'not only won...'; S contains 'but also qualified...'; R specifies 'for the upcoming Olympic Games'. (Q-P-S-R).",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q17",
        type: "standard",
        question: "When a fragment begins with the correlative conjunction 'No sooner had...', what conjunction must introduce the subsequent dependent clause?",
        options: [
          { id: "A", text: "when" },
          { id: "B", text: "than" },
          { id: "C", text: "then" },
          { id: "D", text: "while" },
        ],
        correctOption: "B",
        explanation: "'No sooner... than' is an invariant correlative conjunction pair in English grammar (Hardly/Scarcely takes 'when').",
        difficulty: "medium",
      },
      {
        id: "english-unit2-q18",
        type: "standard",
        question: "Rearrange the jumbled fragments:\n(P) in transforming barren desert dunes\n(Q) modern drip irrigation technology\n(R) into lush agricultural fields\n(S) has played an indispensable role",
        options: [
          { id: "A", text: "Q S P R" },
          { id: "B", text: "P R Q S" },
          { id: "C", text: "Q P R S" },
          { id: "D", text: "S Q P R" },
        ],
        correctOption: "A",
        explanation: "Q is the subject ('modern drip irrigation technology'); S is the verb phrase ('has played an indispensable role'); P and R specify the task ('in transforming barren desert dunes into lush agricultural fields'). (Q-S-P-R).",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q19",
        type: "standard",
        question: "Rearrange the fragments:\n(P) the newly appointed executive director\n(Q) pledged to restore complete transparency\n(R) during his inaugural address to the shareholders\n(S) in all corporate financial transactions",
        options: [
          { id: "A", text: "R P Q S" },
          { id: "B", text: "P R Q S" },
          { id: "C", text: "P Q S R" },
          { id: "D", text: "S R P Q" },
        ],
        correctOption: "A",
        explanation: "R sets the occasion ('During his inaugural address...'); P introduces the subject ('the newly appointed executive director'); Q is the verb ('pledged to restore complete transparency'); S is the domain ('in all corporate financial transactions'). (R-P-Q-S).",
        difficulty: "medium",
      },
      {
        id: "english-unit2-q20",
        type: "standard",
        question: "If fragment X ends with 'capable of', which grammatical structure must immediately follow in the next fragment?",
        options: [
          { id: "A", text: "A bare infinitive verb (e.g., 'fly')" },
          { id: "B", text: "A Gerund (-ing verb) or a Noun phrase (e.g., 'flying at supersonic speeds')" },
          { id: "C", text: "A past participle verb alone" },
          { id: "D", text: "A semicolon" },
        ],
        correctOption: "B",
        explanation: "The preposition 'of' governs a noun or gerund (V-ing), making 'capable of [flying / endurance]' syntactically mandatory.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["Para Jumbles"],
      relatedTopics: ["Sentence completion", "Grammar & Fill in the Blanks"],
      practiceTestId: "practice-english-unit2-test2",
      practiceTestUrl: "/test/practice-english-unit2-test2",
      weaknessReportUrl: "/dashboard/radar?subject=english",
      weaknessRadarUrl: "/dashboard/radar?subject=english",
    },
  },

  // UNIT 2 - TOPIC 3: Sentence completion
  {
    id: "english-unit2-sentence-completion",
    slug: "sentence-completion",
    subject: "english",
    subjectName: "English",
    subjectCode: "101",
    unitNumber: 2,
    unitTitle: "Verbal Ability & Sentence Rearrangement",
    topicTitle: "Sentence completion",
    ncertReference: {
      book: "CUET-UG English Language / Verbal Ability & Vocabulary",
      chapter: "Section B: Sentence Completion, Cloze Logic & Contextual Fillers",
      pages: "Pages 171-205",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 88,
      weightagePercentage: 12.0,
    },
    thirtySecondSummary: [
      "Sentence Completion evaluates vocabulary precision, semantic harmony, and grammatical congruity by requiring students to fill one or two blanks in a sentence.",
      "Identify the 'Pivot / Directional Indicator': Transitional words dictate whether the blank reinforces the preceding clause (Support: and, moreover, furthermore, because) or reverses it (Contrast: although, despite, however, yet, nevertheless).",
      "Assign a 'Mental Charge' (+ positive, - negative, or neutral) to the blank before inspecting the options.",
      "Two-blank questions are solved through 'Dual-Filter Elimination': evaluate the easier blank first to eliminate 2 options, then test the remaining choices with the second blank.",
      "Check Collocations and Prepositional Idioms: Words frequently demand specific dependent prepositions (e.g., 'abstain from', 'comply with', 'conducive to', 'replete with').",
    ],
    coreConcepts: [
      {
        title: "Directional Clues: Support vs Contrast Pivots",
        explanation:
          "Sentences contain logical roadmaps established by conjunctions:\n1. Support Indicators (Same Direction):\n- Words: 'and', 'furthermore', 'moreover', 'consequently', 'similarly', 'because', 'since', 'thus'.\n- Logic: If clause A is positive, clause B must be positive. E.g., 'The scientist's research was meticulous, and his findings were _______ (lauded / praised).'\n2. Contrast Indicators (Opposite Direction):\n- Words: 'although', 'despite', 'in spite of', 'however', 'yet', 'nevertheless', 'on the other hand', 'paradoxically'.\n- Logic: If clause A is positive, clause B must be negative, and vice versa. E.g., 'Although the general was known for his _______ in battle, in private life he was remarkably gentle.' (Blank must mean fierce / aggressive / valorous).",
        keyTakeaways: [
          "Identify the pivot word first.",
          "Support = + to + or - to -.",
          "Contrast = + to - or - to +.",
        ],
        ncertPointer:
          "CBSE Class XII Core English, Vocabulary & Logic in Context, pp. 172-184.",
      },
      {
        title: "The Pre-Thought Technique (Anticipating the Blank)",
        explanation:
          "A major trap in sentence completion is reading options immediately, which confuses the mind with multiple competing plausible-sounding words.\nThe Scientific 3-Step Method:\n1. Cover the options with your hand.\n2. Read the sentence and circle directional clue words.\n3. Formulate your OWN simple dummy word for the blank (e.g., 'He was so [generous] that he gave away his wealth').\n4. Uncover the options and pick the synonym that matches your dummy word (e.g., 'magnanimous', 'altruistic').",
        keyTakeaways: [
          "Pre-think a simple substitute word before looking at options.",
          "Matches your intuitive semantic sense without being lured by distractors.",
        ],
        ncertPointer:
          "CUET Verbal Ability Master Guide, Cloze and Sentence Fillers, pp. 186-196.",
      },
      {
        title: "Solving Two-Blank Questions via Dual-Filtering",
        explanation:
          "Two-blank sentence completions can appear daunting, but they are statistically easier because you have two independent filters.\nStrategy:\n1. Read the full sentence and determine the relationship between the two blanks (Are they parallel, opposite, or cause-and-effect?).\n2. Focus exclusively on the blank with the clearer contextual clue.\n3. Eliminate options where the candidate word for that blank fails.\n4. Test the remaining 1 or 2 options with the second blank to confirm flawless grammatical and contextual harmony.",
        keyTakeaways: [
          "Never evaluate both blanks simultaneously; test one column at a time.",
          "Usually, 2 out of 4 options fall away after testing blank 1.",
        ],
        ncertPointer:
          "NTA CUET English Language Practice Tests, Sentence Completion, pp. 198-205.",
      },
    ],
    keyFacts: [
      {
        concept: "Dependent Preposition Collocations",
        formulaOrFact: "Abstain from | Comply with | Conducive to | Replete with | Devoid of | Prone to",
        explanation: "In many sentence completion questions, the blank is followed by a preposition that admits only one specific verb/adjective.",
        examTip: "If the blank is followed by 'to', words like 'conducive' or 'detrimental' work; 'beneficial' or 'harmful' would require 'for'.",
      },
      {
        concept: "Tone Matching",
        formulaOrFact: "Academic tone requires formal vocabulary over colloquial slang",
        explanation: "CUET sentences are drawn from formal literature, academic journals, and quality journalism.",
        examTip: "Prefer sophisticated formal terms (e.g., 'substantiate' over 'back up').",
      },
      {
        concept: "Double Negative Trap",
        formulaOrFact: "'Scarcely', 'hardly', 'barely', 'unlikely', 'denied' reverse sentence polarity",
        explanation: "Sentences containing subtle negative adverbs reverse the expected meaning of the blank.",
        examTip: "Look out for negative prefixes (in-, un-, dis-, non-) embedded in surrounding adjectives.",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" fill="#f8fafc" rx="12"/>
  <text x="400" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0f172a">Sentence Completion: Logic Pivots &amp; Dual-Filter Strategy</text>
  
  <!-- Left Side: Pivot Types -->
  <rect x="50" y="55" width="335" height="395" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="217" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">DIRECTIONAL LOGIC PIVOTS</text>

  <!-- Support Box -->
  <rect x="65" y="100" width="305" height="155" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <text x="75" y="122" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#166534">Support Pivots (Same Direction +/+ or -/-):</text>
  <text x="75" y="142" font-family="system-ui, sans-serif" font-size="11" fill="#14532d">• <tspan font-weight="bold">Keywords:</tspan> and, moreover, furthermore,</text>
  <text x="75" y="156" font-family="system-ui, sans-serif" font-size="11" fill="#14532d">  consequently, because, since, similarly</text>
  <text x="75" y="174" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#166534">• Example:</text>
  <text x="75" y="190" font-family="system-ui, sans-serif" font-size="10.5" font-style="italic" fill="#14532d">"The theory was backed by rigorous data,</text>
  <text x="75" y="204" font-family="system-ui, sans-serif" font-size="10.5" font-style="italic" fill="#14532d">and the committee found it ________."</text>
  <text x="75" y="222" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#15803d">Target: Positive (+): [irrefutable / sound]</text>

  <!-- Contrast Box -->
  <rect x="65" y="270" width="305" height="165" rx="6" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
  <text x="75" y="292" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#991b1b">Contrast Pivots (Opposite Direction +/-):</text>
  <text x="75" y="312" font-family="system-ui, sans-serif" font-size="11" fill="#7f1d1d">• <tspan font-weight="bold">Keywords:</tspan> although, despite, however, yet,</text>
  <text x="75" y="326" font-family="system-ui, sans-serif" font-size="11" fill="#7f1d1d">  nevertheless, in spite of, paradoxically</text>
  <text x="75" y="344" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#991b1b">• Example:</text>
  <text x="75" y="360" font-family="system-ui, sans-serif" font-size="10.5" font-style="italic" fill="#7f1d1d">"Although she appeared serene and calm,</text>
  <text x="75" y="374" font-family="system-ui, sans-serif" font-size="10.5" font-style="italic" fill="#7f1d1d">her mind was full of ________."</text>
  <text x="75" y="392" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#b91c1c">Target: Opposite of calm (-): [turmoil / angst]</text>

  <!-- Right Side: 2-Blank Filter Protocol -->
  <rect x="415" y="55" width="335" height="395" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="582" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">DUAL-FILTER ELIMINATION</text>

  <!-- Step 1 Box -->
  <rect x="430" y="100" width="305" height="75" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
  <text x="440" y="122" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">Step 1: The Pre-Thought Dummy Word</text>
  <text x="440" y="140" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Cover options; anticipate a simple replacement</text>
  <text x="440" y="156" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Assign charge: Positive (+), Negative (-)</text>

  <!-- Step 2 Box -->
  <rect x="430" y="185" width="305" height="75" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
  <text x="440" y="207" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">Step 2: Filter Blank 1 First</text>
  <text x="440" y="227" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Evaluate Column 1 of the 4 options</text>
  <text x="440" y="243" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Immediately cross off options that don't fit</text>

  <!-- Step 3 Box -->
  <rect x="430" y="270" width="305" height="75" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
  <text x="440" y="292" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">Step 3: Test Remaining Choices in Blank 2</text>
  <text x="440" y="312" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Check collocation &amp; preposition fit</text>
  <text x="440" y="328" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Confirm syntactic harmony</text>

  <!-- Step 4 Box -->
  <rect x="430" y="355" width="305" height="80" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
  <text x="440" y="377" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">Step 4: Dependent Preposition Check</text>
  <text x="440" y="397" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• "comply <tspan font-weight="bold">with</tspan>" | "conducive <tspan font-weight="bold">to</tspan>" | "devoid <tspan font-weight="bold">of</tspan>"</text>
  <text x="440" y="413" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">• Let preposition guide your final selection</text>
</svg>`,
    workedExamples: [
      {
        id: "english-unit2-comp-we1",
        questionNumber: 1,
        question:
          "Complete the sentence with the most appropriate word:\n'Although the CEO delivered a confident presentation to the shareholders, her private notes revealed that she was deeply ________ about the company's financial solvency.'",
        options: [
          { id: "A", text: "sanguine" },
          { id: "B", text: "apprehensive" },
          { id: "C", text: "complacent" },
          { id: "D", text: "ebullient" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Identify the directional pivot: 'Although' indicates a contrast.",
          "Step 2: First clause: 'delivered a CONFIDENT presentation' (Positive: confident/optimistic).",
          "Step 3: Second clause must contrast: 'she was deeply ________' (Negative: worried / fearful / anxious).",
          "Step 4: Evaluate options:\n- Sanguine: Optimistic / cheerful (Synonym of confident; wrong).\n- Apprehensive: Anxious or fearful that something bad will happen (Matches our pre-thought word; correct).\n- Complacent: Smugly self-satisfied (Wrong).\n- Ebullient: Overflowing with enthusiasm (Wrong).",
        ],
        cuetInsight:
          "'Sanguine' (optimistic) vs 'Apprehensive' (fearful) is a frequent vocabulary test pair in CUET English.",
      },
      {
        id: "english-unit2-comp-we2",
        questionNumber: 2,
        question:
          "Complete the sentence with the pair of words that best fits the context:\n'The ancient manuscripts were so ________ that even the most experienced conservators handled them with ________ reverence, fearing the slightest friction would crumble the parchment.'",
        options: [
          { id: "A", text: "sturdy ... casual" },
          { id: "B", text: "fragile ... meticulous" },
          { id: "C", text: "resilient ... hurried" },
          { id: "D", text: "archaic ... reckless" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Look at the consequence clause: 'fearing the slightest friction would crumble the parchment.' This proves the manuscripts were extremely delicate / easily breakable.",
          "Step 2: Blank 1 requires a word meaning delicate: 'fragile'. This immediately points to Option B.",
          "Step 3: Check Blank 2 with Option B: 'handled them with meticulous reverence' (careful, precise, attentive). Perfect logical and syntactic fit.",
        ],
        cuetInsight:
          "Cause-and-effect clues ('so X that Y happened') make two-blank sentences straightforward once you spot the consequence.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Single-Blank Vocabulary Precision",
        frequency: "Very High",
        typicalStem: "Choose the word that best fills the blank to make the sentence grammatically and contextually complete.",
        strategy: "Find the directional pivot, assign +/- charge, and pick the matching vocabulary word.",
      },
      {
        patternType: "Preposition-Governed Blank",
        frequency: "High",
        typicalStem: "The new industrial policy was deemed highly ________ to foreign direct investment.",
        strategy: "Look at the preposition 'to' following the blank: 'conducive to' is the standard idiomatic collocation.",
      },
    ],
    commonTraps: [
      {
        trap: "Choosing a word that sounds impressive but has the opposite meaning.",
        whyItTraps: "Words like 'sanguine' (cheerful) are often mistaken for 'bloody' or 'angry' (confused with sanguinary).",
        howToAvoid: "Memorize precise Latin roots: Sanguine = positive/optimistic.",
      },
      {
        trap: "Ignoring the second blank in dual-blank options.",
        whyItTraps: "Option looks great in Blank 1, but Blank 2 introduces a contradiction.",
        howToAvoid: "Always test BOTH words in the sentence before locking your choice.",
      },
    ],
    mnemonics: [
      {
        mnemonic: "P-I-V-O-T = Pivot word, Infer direction, Value (+/-), Option match, Test read",
        meaning: "Step-by-step procedure for tackling sentence completion.",
        application: "Systematic solving routine under exam pressure.",
      },
    ],
    quickRevisionCard: {
      title: "Sentence Completion High-Yield Card",
      keyPoints: [
        "Support Pivots (Same direction): and, moreover, furthermore, consequently, since, because.",
        "Contrast Pivots (Opposite direction): although, despite, however, yet, nevertheless.",
        "Pre-Thought Technique: Anticipate your own dummy word before looking at options.",
        "Collocation Check: Match dependent prepositions (conducive to, comply with, replete with).",
        "Two-Blank Strategy: Solve the easier blank first to eliminate 2 options.",
        "Vocabulary Pitfall: Sanguine = optimistic; Apprehensive = anxious; Fastidious = meticulous.",
      ],
    },
    practiceQuestions: [
      {
        id: "english-unit2-q21",
        type: "standard",
        question: "Complete the sentence:\n'The judge criticized the defense attorney for presenting evidence that was entirely ________ to the murder trial, ordering the jury to disregard it.'",
        options: [
          { id: "A", text: "pertinent" },
          { id: "B", text: "extraneous" },
          { id: "C", text: "compelling" },
          { id: "D", text: "irrefutable" },
        ],
        correctOption: "B",
        explanation: "The judge ordered the jury to disregard the evidence, meaning it was irrelevant or unrelated ('extraneous'). Pertinent, compelling, and irrefutable all mean relevant/strong.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q22",
        type: "standard",
        question: "Complete the sentence:\n'Excessive screen time and lack of physical exercise are considered highly ________ to adolescent cardiovascular health.'",
        options: [
          { id: "A", text: "conducive" },
          { id: "B", text: "detrimental" },
          { id: "C", text: "indifferent" },
          { id: "D", text: "sympathetic" },
        ],
        correctOption: "B",
        explanation: "'Detrimental' means causing harm or damage, perfectly fitting the harmful effects of sedentary habits, followed by the preposition 'to'.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q23",
        type: "standard",
        question: "Complete the sentence:\n'Despite his reputation as a ________ speaker who rarely uttered an unnecessary word, his farewell address was unexpectedly ________ and prolonged.'",
        options: [
          { id: "A", text: "loquacious ... brief" },
          { id: "B", text: "laconic ... verbose" },
          { id: "C", text: "garrulous ... concise" },
          { id: "D", text: "reticent ... taciturn" },
        ],
        correctOption: "B",
        explanation: "Blank 1 requires a word meaning of few words ('laconic'); Blank 2 contrasts with unexpectedly wordy and prolonged ('verbose').",
        difficulty: "medium",
      },
      {
        id: "english-unit2-q24",
        type: "assertion-reason",
        question: "Given below are two statements:\nAssertion (A): In sentence completion, transitional words like 'although', 'nevertheless', and 'yet' are known as contrast pivots.\nReason (R): These conjunctions indicate that the clause containing the blank will logically reverse the semantic tone or expectation established in the adjoining clause.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Both statements are completely true and (R) gives the exact functional linguistic definition of contrastive discourse pivots.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q25",
        type: "standard",
        question: "Complete the sentence:\n'The researcher was so ________ in his laboratory protocols that not a single contamination event was recorded in five years of experiments.'",
        options: [
          { id: "A", text: "negligent" },
          { id: "B", text: "scrupulous" },
          { id: "C", text: "apathetic" },
          { id: "D", text: "sporadic" },
        ],
        correctOption: "B",
        explanation: "'Scrupulous' (or meticulous) means extremely attentive to detail and rigorous in following rules, explaining why zero contamination occurred.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q26",
        type: "standard",
        question: "Complete the sentence:\n'The diplomat's remarks were deliberately ________ so as not to commit her government to any specific treaty obligations prematurely.'",
        options: [
          { id: "A", text: "explicit" },
          { id: "B", text: "ambiguous" },
          { id: "C", text: "lucid" },
          { id: "D", text: "categorical" },
        ],
        correctOption: "B",
        explanation: "'Ambiguous' means open to more than one interpretation or intentionally vague, matching the diplomat's desire to avoid specific commitment.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q27",
        type: "standard",
        question: "Complete the sentence:\n'Far from being ________, the mountainous region was actually ________ with diverse wildlife and endemic alpine flora.'",
        options: [
          { id: "A", text: "fertile ... barren" },
          { id: "B", text: "desolate ... teeming" },
          { id: "C", text: "arid ... devoid" },
          { id: "D", text: "populous ... empty" },
        ],
        correctOption: "B",
        explanation: "'Far from being desolate (empty/deserted), it was actually teeming (swarming/full) with wildlife'.",
        difficulty: "medium",
      },
      {
        id: "english-unit2-q28",
        type: "standard",
        question: "Which of the following adjectives correctly collocates with the preposition 'of' to indicate completely lacking something?",
        options: [
          { id: "A", text: "Devoid" },
          { id: "B", text: "Conducive" },
          { id: "C", text: "Prone" },
          { id: "D", text: "Adjacent" },
        ],
        correctOption: "A",
        explanation: "'Devoid of' is the standard English prepositional idiom meaning entirely lacking or free from.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q29",
        type: "standard",
        question: "Complete the sentence:\n'Because the witness's testimony was ________ by three independent CCTV video recordings, the prosecutor built an airtight case.'",
        options: [
          { id: "A", text: "undermined" },
          { id: "B", text: "corroborated" },
          { id: "C", text: "disputed" },
          { id: "D", text: "fabricated" },
        ],
        correctOption: "B",
        explanation: "'Corroborated' means confirmed or supported with additional evidence, explaining why the case became airtight.",
        difficulty: "easy",
      },
      {
        id: "english-unit2-q30",
        type: "standard",
        question: "Complete the sentence:\n'Although the philanthropist lived an austere and frugal private life, his charitable donations to universities were remarkably ________.'",
        options: [
          { id: "A", text: "parsimonious" },
          { id: "B", text: "munificent" },
          { id: "C", text: "miserly" },
          { id: "D", text: "stingy" },
        ],
        correctOption: "B",
        explanation: "'Munificent' means characterized by great generosity, creating the required contrast with his frugal and austere private lifestyle.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["Rearranging parts of a sentence"],
      relatedTopics: ["Contextual Word Choice", "Common Errors"],
      practiceTestId: "practice-english-unit2-test3",
      practiceTestUrl: "/test/practice-english-unit2-test3",
      weaknessReportUrl: "/dashboard/radar?subject=english",
      weaknessRadarUrl: "/dashboard/radar?subject=english",
    },
  },
];
