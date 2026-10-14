import { NoteDocument } from "@/types/notes";

export const psychologyUnits5to7Topics: NoteDocument[] = [
  // -------------------------------------------------------------------------
  // UNIT 5: Therapeutic Approaches
  // -------------------------------------------------------------------------
  {
    id: "psychology_u5_t1",
    slug: "psychodynamic-therapy-behavior-therapy-cognitive-therapy-humanistic-existential-biomedical",
    subject: "psychology",
    subjectName: "Psychology",
    subjectCode: "324",
    unitNumber: 5,
    unitTitle: "Therapeutic Approaches",
    topicTitle: "Psychodynamic Therapy, Behavior Therapy, Cognitive Therapy, Humanistic-Existential, Biomedical",
    ncertReference: {
      class: "12",
      book: "Psychology",
      chapterNumber: 5,
      chapterName: "Therapeutic Approaches",
      sections: [
        "Nature and Process of Psychotherapy & Therapeutic Alliance",
        "Psychodynamic Therapy: Free Association, Dream Analysis, Transference, Resistance",
        "Behaviour Therapy: Systematic Desensitisation, Aversive Conditioning, Token Economy",
        "Cognitive Therapy: Aaron Beck (Cognitive Triad) and Albert Ellis (REBT: ABCDE Model)",
        "Humanistic-Existential Therapy: Carl Rogers (Client-Centred), Viktor Frankl (Logotherapy), Gestalt",
        "Biomedical, Alternative Therapies (Yoga, Meditation) and Rehabilitation",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (20+ questions across slots)",
      totalPyqsInRepo: 42,
      weightagePercentage: 10.5,
    },
    summary30Seconds: [
      "Psychodynamic Therapy (Freud): Uncovers unconscious conflicts via Free Association, Dream Analysis (manifest vs latent), Transference (positive/negative), and Resistance to achieve emotional insight.",
      "Behaviour Therapy: Modifies maladaptive behavior using conditioning principles. Joseph Wolpe's Systematic Desensitisation pairs relaxation with an anxiety hierarchy (reciprocal inhibition). Token economy uses operant conditioning.",
      "Cognitive Therapies: Albert Ellis REBT (ABCDE model: Activating event, Belief, Consequence, Dispute, Effective philosophy); Aaron Beck's Cognitive Therapy tackles the Cognitive Triad (negative view of self, world, future).",
      "Humanistic-Existential: Carl Rogers Client-Centred Therapy requires Congruence, Unconditional Positive Regard, and Empathy. Viktor Frankl's Logotherapy resolves the 'existential vacuum'.",
      "Rehabilitation: Occupational, social skills, and vocational training to reintegrate patients into society.",
    ],
    coreConcepts: [
      {
        title: "1. The Nature of Psychotherapy & Psychodynamic Therapy",
        content:
          "Psychotherapy is a voluntary relationship between a trained therapist and a client experiencing psychological distress:\n\n" +
          "• **Therapeutic Alliance**: The contractual working partnership based on trust, confidentiality, and unconditional positive regard.\n\n" +
          "• **Psychodynamic Therapy (Sigmund Freud)**:\n" +
          "  - **Goal**: To bring intrapsychic conflicts from the unconscious into consciousness to achieve emotional **insight**.\n" +
          "  - **Method of Free Association**: Client lies relaxed on a couch and vocalises every thought, memory, or feeling without censorship or editing.\n" +
          "  - **Dream Analysis**: Dreams represent royal road to the unconscious. Differentiates between:\n" +
          "    * *Manifest Content*: The surface storyline remembered upon waking.\n" +
          "    * *Latent Content*: The hidden, symbolic unconscious wish disguised by dream work.\n" +
          "  - **Transference**: Client projects repressed emotional feelings toward early parental figures onto the therapist:\n" +
          "    * *Positive Transference*: Client feels affection, admiration, or idealisation toward therapist.\n" +
          "    * *Negative Transference*: Client experiences hostility, anger, or suspicion.\n" +
          "    * *Transference Neurosis*: Full clinical reliving of childhood conflict in the therapeutic setting.\n" +
          "  - **Resistance**: Conscious or unconscious reluctance of the client to recall repressed material (missing sessions, silence, hostility).\n" +
          "  - **Working Through**: Repeated interpretation of resistance and transference until deep insight is integrated.",
        ncertPointers: [
          "Dream analysis: Manifest = Surface; Latent = Hidden symbolic meaning.",
          "Transference neurosis occurs when the therapist becomes the focal substitute for early parental figures.",
        ],
      },
      {
        title: "2. Behaviour Therapy & Conditioning Techniques",
        content:
          "Assumes psychological distress arises from faulty, maladaptive learning. Treatment focuses on modifying observable behaviors:\n\n" +
          "• **Behavioural Analysis**: Identifies Malfunctioning Behaviours, Antecedent factors (triggers), and Maintaining Consequences.\n\n" +
          "• **Key Behavioural Techniques**:\n" +
          "  - **Systematic Desensitisation (Joseph Wolpe)**:\n" +
          "    * Based on the principle of **Reciprocal Inhibition** (two incompatible physiological states—deep relaxation and anxiety—cannot exist simultaneously).\n" +
          "    * Steps: (1) Client is taught deep muscle relaxation; (2) Anxiety Hierarchy constructed (from least to most fearful stimulus); (3) Client visualises fear hierarchy stages while remaining deeply relaxed until the phobia is desensitised.\n" +
          "  - **Aversive Conditioning**: Pairing an undesirable habit (e.g., alcohol addiction) with a painful or noxious stimulus (e.g., electric shock or emetic nausea-inducing drug) until avoidance is conditioned.\n" +
          "  - **Positive Reinforcement & Token Economy**: Operant conditioning technique where desired behaviors earn tokens exchangeable for privileges.\n" +
          "  - **Differential Reinforcement**: Reinforcing positive adaptive behaviors while simultaneously putting maladaptive behaviors on extinction.",
        ncertPointers: [
          "Joseph Wolpe propounded Systematic Desensitisation based on Reciprocal Inhibition.",
          "Token economy is rooted in B.F. Skinner's operant conditioning.",
        ],
      },
      {
        title: "3. Cognitive Therapies: Beck & Ellis",
        content:
          "Cognitive therapies postulate that psychological distress stems from irrational beliefs and cognitive distortions:\n\n" +
          "• **Albert Ellis — Rational Emotive Behaviour Therapy (REBT)**:\n" +
          "  - Distress is caused not by external events, but by irrational beliefs ('I must be loved by everyone at all times').\n" +
          "  - **ABCDE Framework**:\n" +
          "    * **A (Activating Event)**: External stressful trigger.\n" +
          "    * **B (Belief System)**: Irrational evaluation or demand ('musts' and 'shoulds').\n" +
          "    * **C (Consequence)**: Emotional distress (depression, rage).\n" +
          "    * **D (Disputing)**: Therapist challenges and debates irrational beliefs.\n" +
          "    * **E (Effective New Philosophy)**: Rational, flexible, self-accepting outlook.\n\n" +
          "• **Aaron Beck — Cognitive Therapy for Depression**:\n" +
          "  - Depression is maintained by the **Cognitive Triad**:\n" +
          "    1. Negative view of the **Self** ('I am a failure').\n" +
          "    2. Negative view of the **World** ('Everyone is unfair').\n" +
          "    3. Negative view of the **Future** ('Nothing will ever improve').\n" +
          "  - Driven by **Cognitive Distortions**: Overgeneralisation, Selective Abstraction, Dichotomous Thinking (All-or-Nothing / Black-and-White).",
        ncertPointers: [
          "Albert Ellis = REBT (ABCDE model); Aaron Beck = Cognitive Triad (Self, World, Future).",
          "Dichotomous thinking (black-and-white) is a signature cognitive distortion.",
        ],
      },
      {
        title: "4. Humanistic-Existential, Biomedical & Alternative Therapies",
        content:
          "• **Humanistic-Existential Therapies**:\n" +
          "  - **Carl Rogers — Client-Centred Therapy (Person-Centred)**:\n" +
          "    * Non-directive approach; the client has the innate capacity for self-healing.\n" +
          "    * Three essential therapist traits:\n" +
          "      1. **Congruence / Genuineness**: Honest, transparent expression of self.\n" +
          "      2. **Unconditional Positive Regard**: Non-judgmental total acceptance of the client.\n" +
          "      3. **Empathy**: Feeling what the client feels from their internal frame of reference.\n" +
          "  - **Viktor Frankl — Logotherapy**:\n" +
          "    * Derived from *logos* (meaning); people suffer from an **existential vacuum** (loss of meaning in life); therapy helps find spiritual/personal meaning.\n" +
          "  - **Fritz Perls — Gestalt Therapy**:\n" +
          "    * Focuses on the 'Here-and-Now' and bodily awareness to achieve emotional wholeness.\n\n" +
          "• **Alternative Therapies & Rehabilitation**:\n" +
          "  - **Yoga and Meditation**: Sudarshan Kriya Yoga (SKY) alleviates PTSD and depression; Vipassana meditation develops mindful detached observation.\n" +
          "  - **Rehabilitation**: Equips patients with Occupational Therapy (crafts, candle making), Social Skills Training, and Vocational Training for economic independence.",
        ncertPointers: [
          "Logotherapy was created by Viktor Frankl to overcome the 'existential vacuum'.",
          "Rogers' three core conditions: Congruence, Unconditional Positive Regard, Empathy.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Albert Ellis REBT ABCDE Model",
        formula: "Activating Event -> Belief System -> Consequence -> Disputing -> Effective Philosophy",
        symbols: "A -> B -> C -> D -> E",
        siUnits: "Cognitive Restructuring Framework",
        applicationCondition: "Analyzing steps of cognitive debate in REBT",
        notes: "Ellis emphasizes changing irrational 'musts' into flexible preferences.",
      },
      {
        name: "Beck's Cognitive Triad for Depression",
        formula: "Negative Self + Negative World + Negative Future",
        symbols: "Depressogenic Schema Triad",
        siUnits: "Cognitive vulnerability schema",
        applicationCondition: "Identifying Beck's core components in CUET",
        notes: "Supported by cognitive distortions like selective abstraction and overgeneralization.",
      },
      {
        name: "Therapy Types and Proponents Matrix",
        formula: "Psychoanalysis (Freud) | Systematic Desensitisation (Wolpe) | REBT (Ellis) | Cognitive (Beck) | Client-Centred (Rogers) | Logotherapy (Frankl)",
        symbols: "Therapeutic Modalities",
        siUnits: "Clinical psychology paradigms",
        applicationCondition: "Match-the-following on therapy modalities",
        notes: "Wolpe's systematic desensitization is rooted in reciprocal inhibition.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Albert Ellis REBT ABCDE Model",
      caption: "Progression from Activating Event to Effective New Philosophy via Cognitive Disputation.",
      code: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <rect x="20" y="45" width="115" height="130" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
        <text x="77" y="75" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="14">A</text>
        <text x="77" y="100" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">Activating</text>
        <text x="77" y="120" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">Event</text>
        <text x="77" y="150" text-anchor="middle" fill="#b91c1c" font-size="10">Exam failure</text>

        <rect x="155" y="45" width="115" height="130" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
        <text x="212" y="75" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="14">B</text>
        <text x="212" y="100" text-anchor="middle" font-weight="bold" fill="#78350f" font-size="11">Irrational</text>
        <text x="212" y="120" text-anchor="middle" font-weight="bold" fill="#78350f" font-size="11">Belief</text>
        <text x="212" y="150" text-anchor="middle" fill="#b45309" font-size="10">"I must never fail"</text>

        <rect x="290" y="45" width="115" height="130" rx="8" fill="#fce7f3" stroke="#db2777" stroke-width="2"/>
        <text x="347" y="75" text-anchor="middle" font-weight="bold" fill="#9d174d" font-size="14">C</text>
        <text x="347" y="100" text-anchor="middle" font-weight="bold" fill="#831843" font-size="11">Emotional</text>
        <text x="347" y="120" text-anchor="middle" font-weight="bold" fill="#831843" font-size="11">Consequence</text>
        <text x="347" y="150" text-anchor="middle" fill="#be185d" font-size="10">Depression</text>

        <rect x="425" y="45" width="115" height="130" rx="8" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
        <text x="482" y="75" text-anchor="middle" font-weight="bold" fill="#3730a3" font-size="14">D</text>
        <text x="482" y="100" text-anchor="middle" font-weight="bold" fill="#312e81" font-size="11">Disputing</text>
        <text x="482" y="120" text-anchor="middle" font-weight="bold" fill="#312e81" font-size="11">Beliefs</text>
        <text x="482" y="150" text-anchor="middle" fill="#4338ca" font-size="10">Socratic debate</text>

        <rect x="560" y="45" width="120" height="130" rx="8" fill="#dcfce7" stroke="#10b981" stroke-width="2"/>
        <text x="620" y="75" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="14">E</text>
        <text x="620" y="100" text-anchor="middle" font-weight="bold" fill="#047857" font-size="11">Effective New</text>
        <text x="620" y="120" text-anchor="middle" font-weight="bold" fill="#047857" font-size="11">Philosophy</text>
        <text x="620" y="150" text-anchor="middle" fill="#059669" font-size="10">Self-acceptance</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <rect x="20" y="45" width="115" height="130" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <text x="77" y="75" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="14">A</text>
      <text x="77" y="100" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">Activating</text>
      <text x="77" y="120" text-anchor="middle" font-weight="bold" fill="#7f1d1d" font-size="11">Event</text>
      <text x="77" y="150" text-anchor="middle" fill="#b91c1c" font-size="10">Exam failure</text>

      <rect x="155" y="45" width="115" height="130" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text x="212" y="75" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="14">B</text>
      <text x="212" y="100" text-anchor="middle" font-weight="bold" fill="#78350f" font-size="11">Irrational</text>
      <text x="212" y="120" text-anchor="middle" font-weight="bold" fill="#78350f" font-size="11">Belief</text>
      <text x="212" y="150" text-anchor="middle" fill="#b45309" font-size="10">"I must never fail"</text>

      <rect x="290" y="45" width="115" height="130" rx="8" fill="#fce7f3" stroke="#db2777" stroke-width="2"/>
      <text x="347" y="75" text-anchor="middle" font-weight="bold" fill="#9d174d" font-size="14">C</text>
      <text x="347" y="100" text-anchor="middle" font-weight="bold" fill="#831843" font-size="11">Emotional</text>
      <text x="347" y="120" text-anchor="middle" font-weight="bold" fill="#831843" font-size="11">Consequence</text>
      <text x="347" y="150" text-anchor="middle" fill="#be185d" font-size="10">Depression</text>

      <rect x="425" y="45" width="115" height="130" rx="8" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
      <text x="482" y="75" text-anchor="middle" font-weight="bold" fill="#3730a3" font-size="14">D</text>
      <text x="482" y="100" text-anchor="middle" font-weight="bold" fill="#312e81" font-size="11">Disputing</text>
      <text x="482" y="120" text-anchor="middle" font-weight="bold" fill="#312e81" font-size="11">Beliefs</text>
      <text x="482" y="150" text-anchor="middle" fill="#4338ca" font-size="10">Socratic debate</text>

      <rect x="560" y="45" width="120" height="130" rx="8" fill="#dcfce7" stroke="#10b981" stroke-width="2"/>
      <text x="620" y="75" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="14">E</text>
      <text x="620" y="100" text-anchor="middle" font-weight="bold" fill="#047857" font-size="11">Effective New</text>
      <text x="620" y="120" text-anchor="middle" font-weight="bold" fill="#047857" font-size="11">Philosophy</text>
      <text x="620" y="150" text-anchor="middle" fill="#059669" font-size="10">Self-acceptance</text>
    </svg>`,
    workedExamples: [
      {
        id: "psychology_u5_we1",
        questionNumber: 1,
        question:
          "Which behavioral technique is founded on the principle of 'Reciprocal Inhibition', where deep relaxation is paired with an anxiety hierarchy to eliminate phobias?\n" +
          "(A) Aversive conditioning\n" +
          "(B) Systematic desensitisation\n" +
          "(C) Flooding\n" +
          "(D) Differential reinforcement",
        options: [
          { id: "A", text: "Aversive conditioning" },
          { id: "B", text: "Systematic desensitisation" },
          { id: "C", text: "Flooding" },
          { id: "D", text: "Differential reinforcement" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Joseph Wolpe formulated Systematic Desensitisation.",
          "Step 2: He based it on Reciprocal Inhibition—the physiological fact that incompatible responses (deep relaxation and muscular tension/anxiety) cannot co-exist.",
          "Step 3: Correct answer is Systematic desensitisation (Option B).",
        ],
        cuetTip: "Reciprocal inhibition + anxiety hierarchy = Systematic Desensitisation (Joseph Wolpe).",
      },
      {
        id: "psychology_u5_we2",
        questionNumber: 2,
        question:
          "According to Aaron Beck's Cognitive Therapy for depression, the 'Cognitive Triad' consists of negative views about which three components?\n" +
          "(A) Past, Present, and Future\n" +
          "(B) Self, World, and Future\n" +
          "(C) Family, Society, and Self\n" +
          "(D) Id, Ego, and Superego",
        options: [
          { id: "A", text: "Past, Present, and Future" },
          { id: "B", text: "Self, World, and Future" },
          { id: "C", text: "Family, Society, and Self" },
          { id: "D", text: "Id, Ego, and Superego" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Aaron Beck found that depressed patients possess dysfunctional negative schemas forming a triad.",
          "Step 2: The triad consists of negative thoughts regarding the Self ('I am defective'), the World ('The world is hostile'), and the Future ('The future is hopeless').",
          "Step 3: Option B is the correct formulation.",
        ],
        cuetTip: "Beck's Cognitive Triad = Self, World, Future.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Therapeutic Modality Proponent Matching",
        frequency: "Very High",
        typicalStem: "Match the therapy with its pioneer: Logotherapy, Client-Centred Therapy, Systematic Desensitisation, REBT.",
        strategy: "Wolpe = Systematic Desensitisation; Rogers = Client-Centred; Ellis = REBT; Frankl = Logotherapy.",
      },
      {
        patternType: "Core Conditions in Client-Centred Therapy",
        frequency: "High",
        typicalStem: "Which of the following is NOT one of Carl Rogers' three core therapist conditions?",
        strategy: "The three conditions are Congruence/Genuineness, Unconditional Positive Regard, and Empathy.",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing Manifest and Latent dream content.",
        whyWrong: "Manifest content is the actual narrative or surface imagery the client remembers upon waking. Latent content is the hidden, disguised unconscious wish or conflict revealed through psychoanalytic interpretation.",
        correctUnderstanding: "Manifest = Surface story; Latent = Hidden unconscious meaning.",
        trapOptionExample: "Calling the surface storyline of a dream its latent content.",
      },
      {
        misconception: "Believing Client-Centred therapy is directive.",
        whyWrong: "Carl Rogers explicitly designed Client-Centred Therapy to be NON-DIRECTIVE; the therapist provides an accepting psychological climate without giving advice or directives.",
        correctUnderstanding: "Client-Centred therapy is strictly non-directive.",
        trapOptionExample: "Stating Rogers provides direct advice on life decisions.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Rogers' 3 Core Conditions",
        mnemonic: "C-U-E (Congruence, Unconditional regard, Empathy)",
        rule: "Congruence, Unconditional Positive Regard, Empathy",
        explanation: "Never forget the 3 essential therapist qualities in humanistic therapy.",
      },
      {
        title: "Beck's Triad Mnemonic",
        mnemonic: "S-W-F (Self, World, Future)",
        rule: "Negative view of Self, World, and Future",
        explanation: "Instant recall for Beck's cognitive triad in depression.",
      },
    ],
    quickRevisionCard: {
      title: "Therapeutic Approaches — 60-Second Flash Card",
      bulletPoints: [
        "Therapeutic Alliance: Working partnership built on trust, empathy, and confidentiality.",
        "Psychodynamic (Freud): Free association, Dream analysis (manifest vs latent), Transference, Insight.",
        "Systematic Desensitisation (Wolpe): Reciprocal inhibition; relaxation paired with fear hierarchy.",
        "Aversive Conditioning: Pairing undesirable habit with noxious/painful stimulus (alcohol + emetic).",
        "REBT (Albert Ellis): ABCDE model; disputes irrational 'musts' and 'shoulds'.",
        "Cognitive Therapy (Beck): Cognitive Triad (negative view of Self, World, Future).",
        "Client-Centred (Rogers): Non-directive; 3 conditions: Congruence, Unconditional positive regard, Empathy.",
        "Logotherapy (Viktor Frankl): Finding meaning to overcome the 'existential vacuum'.",
        "Rehabilitation: Occupational, social skills, and vocational training for social reintegration.",
      ],
      examTricks: [
        "Joseph Wolpe = Reciprocal inhibition.",
        "Ellis = ABCDE model; Beck = Cognitive triad.",
      ],
    },
    practiceQuestions: [
      {
        id: "psychology_u5_q1",
        question: "Who among the following developed 'Logotherapy', which focuses on finding personal meaning to overcome the 'existential vacuum'?",
        type: "standard",
        options: [
          { id: "A", text: "Carl Rogers" },
          { id: "B", text: "Viktor Frankl" },
          { id: "C", text: "Fritz Perls" },
          { id: "D", text: "Aaron Beck" },
        ],
        correctOption: "B",
        explanation: "Viktor Frankl developed Logotherapy based on the search for meaning in human existence.",
        difficulty: "easy",
      },
      {
        id: "psychology_u5_q2",
        question: "In Sigmund Freud's dream analysis, the actual surface storyline that the dreamer remembers upon waking is termed:",
        type: "standard",
        options: [
          { id: "A", text: "Latent content" },
          { id: "B", text: "Manifest content" },
          { id: "C", text: "Free association" },
          { id: "D", text: "Transference content" },
        ],
        correctOption: "B",
        explanation: "The surface storyline of a dream is the manifest content, whereas the hidden unconscious meaning is the latent content.",
        difficulty: "easy",
      },
      {
        id: "psychology_u5_q3",
        question:
          "Assertion (A): Systematic Desensitisation is an effective behavioral technique for treating debilitating phobias.\n" +
          "Reason (R): It operates on the principle of reciprocal inhibition, where deep physical relaxation inhibits the experiencing of anxiety.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Joseph Wolpe showed that pairing deep relaxation with successive rungs of an anxiety hierarchy desensitises conditioned phobic fear.",
        difficulty: "easy",
      },
      {
        id: "psychology_u5_q4",
        question: "In Albert Ellis's REBT, what does 'D' stand for in the ABCDE framework?",
        type: "standard",
        options: [
          { id: "A", text: "Depression" },
          { id: "B", text: "Disputing irrational beliefs" },
          { id: "C", text: "Differential diagnosis" },
          { id: "D", text: "Desensitisation" },
        ],
        correctOption: "B",
        explanation: "In the ABCDE framework of REBT, D stands for Disputing irrational beliefs through logical questioning.",
        difficulty: "easy",
      },
      {
        id: "psychology_u5_q5",
        question:
          "Match List-I (Therapeutic Modality) with List-II (Core Technique / Proponent):\n" +
          "List-I:\n" +
          "p. Systematic Desensitisation\n" +
          "q. Client-Centred Therapy\n" +
          "r. Rational Emotive Behaviour Therapy\n" +
          "s. Cognitive Therapy for Depression\n" +
          "List-II:\n" +
          "1. Albert Ellis (ABCDE Model)\n" +
          "2. Aaron Beck (Cognitive Triad)\n" +
          "3. Joseph Wolpe (Reciprocal Inhibition)\n" +
          "4. Carl Rogers (Unconditional Positive Regard)\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-3, q-4, r-1, s-2" },
          { id: "B", text: "p-4, q-3, r-1, s-2" },
          { id: "C", text: "p-3, q-1, r-4, s-2" },
          { id: "D", text: "p-2, q-4, r-1, s-3" },
        ],
        correctOption: "A",
        explanation: "Wolpe (p-3: Desensitisation), Rogers (q-4: Client-Centred), Ellis (r-1: REBT), Beck (s-2: Cognitive Triad).",
        difficulty: "easy",
      },
      {
        id: "psychology_u5_q6",
        question: "Which of the following is NOT one of the three core conditions formulated by Carl Rogers for client-centred therapy?",
        type: "standard",
        options: [
          { id: "A", text: "Congruence or Genuineness" },
          { id: "B", text: "Unconditional Positive Regard" },
          { id: "C", text: "Empathic Understanding" },
          { id: "D", text: "Aversive Conditioning" },
        ],
        correctOption: "D",
        explanation: "Rogers' core triad includes Congruence, Unconditional Positive Regard, and Empathy. Aversive conditioning is a behavioral technique.",
        difficulty: "easy",
      },
      {
        id: "psychology_u5_q7",
        question: "When a client in psychoanalysis projects unresolved childhood hostility or affection toward early parental figures onto the therapist, it is called:",
        type: "standard",
        options: [
          { id: "A", text: "Resistance" },
          { id: "B", text: "Transference" },
          { id: "C", text: "Catharsis" },
          { id: "D", text: "Working through" },
        ],
        correctOption: "B",
        explanation: "Transference is the unconscious displacement of feelings, attitudes, and desires originally felt toward early significant figures onto the analyst.",
        difficulty: "easy",
      },
      {
        id: "psychology_u5_q8",
        question:
          "Assertion (A): Token economy is a behavior modification technique based on the principles of operant conditioning.\n" +
          "Reason (R): Desired target behaviors are rewarded with tokens that can later be exchanged for privileges or tangible rewards.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Token economy applies operant positive reinforcement to strengthen adaptive behaviors in psychiatric wards and classrooms.",
        difficulty: "easy",
      },
      {
        id: "psychology_u5_q9",
        question: "A behavioral technique in which an unwanted behavior is paired with an unpleasant or painful stimulus is known as:",
        type: "standard",
        options: [
          { id: "A", text: "Systematic Desensitisation" },
          { id: "B", text: "Aversive Conditioning" },
          { id: "C", text: "Biofeedback" },
          { id: "D", text: "Logotherapy" },
        ],
        correctOption: "B",
        explanation: "Aversive conditioning pairs an undesirable habit (such as alcoholism) with a noxious stimulus (electric shock or nausea-inducing drug).",
        difficulty: "easy",
      },
      {
        id: "psychology_u5_q10",
        question: "Which of the following describes the therapeutic technique of 'Vipassana Meditation'?",
        type: "standard",
        options: [
          { id: "A", text: "Vigorous aerobic exercises while chanting" },
          { id: "B", text: "Mindful, non-judgmental passive observation of bodily sensations and thoughts" },
          { id: "C", text: "Direct confrontation of irrational cognitive schemas" },
          { id: "D", text: "Electric stimulation of the temporal lobes" },
        ],
        correctOption: "B",
        explanation: "Vipassana meditation involves mindful, detached, non-judgmental observation of emerging thoughts and bodily sensations.",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: ["Psychological Disorders"],
      relatedTopics: ["Attitude and Social Cognition", "Social Influence and Group Processes"],
      practiceTestId: "practice-psychology-unit5-test1",
      practiceTestUrl: "/test/practice-psychology-unit5-test1",
      weaknessReportUrl: "/dashboard/radar?subject=psychology",
      weaknessRadarUrl: "/dashboard/radar?subject=psychology",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 6: Attitude and Social Cognition
  // -------------------------------------------------------------------------
  {
    id: "psychology_u6_t1",
    slug: "attitude-formation-and-change-social-cognition-schemas-and-stereotypes-projudice",
    subject: "psychology",
    subjectName: "Psychology",
    subjectCode: "324",
    unitNumber: 6,
    unitTitle: "Attitude and Social Cognition",
    topicTitle: "Attitude Formation and Change, Social Cognition, Schemas and Stereotypes, Projudice",
    ncertReference: {
      class: "12",
      book: "Psychology",
      chapterNumber: 6,
      chapterName: "Attitude and Social Cognition",
      sections: [
        "Nature and Components of Attitudes: The A-B-C Model",
        "Properties of Attitudes: Valence, Extremeness, Simplicity/Complexity, Centrality",
        "Attitude Formation Processes & Theories of Attitude Change",
        "Fritz Heider's Balance Theory (P-O-X) and Leon Festinger's Cognitive Dissonance",
        "S.M. Mohsin's Two-Step Concept of Attitude Change",
        "Prejudice, Stereotypes, Discrimination, and Social Cognition (Schemas, Attribution Errors)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (22+ questions across sets)",
      totalPyqsInRepo: 44,
      weightagePercentage: 11.0,
    },
    summary30Seconds: [
      "A-B-C Components of Attitude: Affective (emotional/feeling), Behavioural (action tendency), Cognitive (beliefs/thoughts).",
      "Properties of Attitudes: Valence (positive vs negative), Extremeness (how far from neutral), Simplicity/Complexity (multiplexity), Centrality (core importance in attitude system).",
      "Theories of Attitude Change: Fritz Heider's P-O-X Balance Theory (balance when product of signs is positive); Festinger's Cognitive Dissonance (psychological tension when cognitions conflict); S.M. Mohsin's Two-Step Concept (Identification -> Attitude adoption).",
      "Prejudice (affective) vs Stereotype (cognitive cluster) vs Discrimination (behavioural differential treatment).",
      "Attribution: Fundamental Attribution Error (overestimating internal dispositions and underestimating external situational forces for others' failures).",
    ],
    coreConcepts: [
      {
        title: "1. Nature & The A-B-C Components of Attitudes",
        content:
          "An attitude is a state of the mind, a set of views, or thoughts regarding an attitude object (person, topic, issue):\n\n" +
          "• **The A-B-C Model of Attitude**:\n" +
          "  - **Affective Component**: The emotional aspect, feelings of liking or disliking toward the attitude object (e.g., feeling positive toward environmental conservation).\n" +
          "  - **Behavioural (Conative) Component**: The tendency to act in a certain way toward the attitude object (e.g., actively planting saplings or recycling plastics).\n" +
          "  - **Cognitive Component**: The beliefs, facts, and ideas held about the attitude object (e.g., knowing that tree plantation reduces carbon footprint).\n\n" +
          "• **Four Core Properties of Attitudes**:\n" +
          "  - **Valence (Positivity or Negativity)**: Whether the attitude is favourable or unfavourable (measured on a scale from 1 to 5, negative to positive).\n" +
          "  - **Extremeness**: How far the attitude is from the neutral midpoint (extreme like vs mild like).\n" +
          "  - **Simplicity or Complexity (Multiplexity)**: Number of beliefs constituting the attitude (simple = one or two beliefs; complex = multi-layered system).\n" +
          "  - **Centrality**: Importance of the attitude in a person's overall cognitive system; high centrality attitudes are resistant to change.",
        ncertPointers: [
          "A-B-C = Affective (Feelings), Behavioural (Actions), Cognitive (Beliefs).",
          "Valence is the direction (positive/negative); Extremeness is the intensity.",
        ],
      },
      {
        title: "2. Theories of Attitude Change: Heider, Festinger & Mohsin",
        content:
          "Attitudes can change through communication, cognitive consistency, or identification:\n\n" +
          "• **Fritz Heider — Balance Theory (P-O-X Triangle)**:\n" +
          "  - Analyses cognitive consistency among three elements:\n" +
          "    * **P** = Person whose attitude is studied.\n" +
          "    * **O** = Another person.\n" +
          "    * **X** = Attitude object or topic.\n" +
          "  - **Balanced State**: When the multiplication of the three relationship signs is **Positive (+)**:\n" +
          "    1. All 3 relations are positive ($+ \\times + \\times + = +$).\n" +
          "    2. 2 relations are negative and 1 is positive ($- \\times - \\times + = +$).\n" +
          "  - **Unbalanced State**: When the multiplication of signs is **Negative (-)**:\n" +
          "    1. All 3 relations are negative ($- \\times - \\times - = -$).\n" +
          "    2. 2 relations are positive and 1 is negative ($+ \\times + \\times - = -$).\n" +
          "  - Unbalanced states create psychological tension, compelling attitude change to restore balance.\n\n" +
          "• **Leon Festinger — Theory of Cognitive Dissonance**:\n" +
          "  - When an individual holds two cognitions (beliefs, values) that are psychologically inconsistent, or acts in a way that contradicts their beliefs, they experience uncomfortable **Cognitive Dissonance**.\n" +
          "  - To relieve dissonance, the person must either: (1) Change their behavior, (2) Change their attitude/cognition, or (3) Add new consonant cognitions (e.g., a smoker justifying smoking by saying 'it helps me relax').\n\n" +
          "• **S.M. Mohsin — Two-Step Concept of Attitude Change**:\n" +
          "  - Propounded by Indian psychologist S.M. Mohsin.\n" +
          "  - **Step 1**: The Target identifies with the Source (admires, likes, respects the source).\n" +
          "  - **Step 2**: The Target adopts the Source's attitude and behavior toward the attitude object.",
        ncertPointers: [
          "P-O-X balance occurs when the product of the three signs is POSITIVE.",
          "Cognitive Dissonance = Leon Festinger; Two-Step Concept = S.M. Mohsin.",
        ],
      },
      {
        title: "3. Prejudice, Stereotypes and Discrimination",
        content:
          "Intergroup hostility manifests through three interrelated constructs:\n\n" +
          "• **Stereotype (Cognitive Component)**:\n" +
          "  - An overgeneralised cluster of beliefs about the characteristics of a particular social group, ignoring individual differences (e.g., 'all athletes are bad at academics').\n\n" +
          "• **Prejudice (Affective Component)**:\n" +
          "  - An unjustified, usually negative emotional attitude directed toward members of a specific social group based solely on their group membership.\n\n" +
          "• **Discrimination (Behavioural Component)**:\n" +
          "  - Unfair, differential treatment of individuals belonging to a particular social, ethnic, or religious group (e.g., denying housing or jobs).\n\n" +
          "• **Sources of Prejudice**:\n" +
          "  - *Learning through socialization*.\n" +
          "  - *Scapegoating* (blaming a powerless minority group for general economic distress).\n" +
          "  - *Kernel of Truth* hypothesis (magnifying a tiny historical reality into an absolute stereotype).\n" +
          "  - *Self-Fulfilling Prophecy* (target group begins acting out the stereotype because of social expectations).\n\n" +
          "• **Strategies for Reducing Prejudice**:\n" +
          "  - Intergroup contact under equal status conditions, introducing superordinate goals, educational campaigns, and reducing social categorisation.",
        ncertPointers: [
          "Stereotype = Cognitive; Prejudice = Affective; Discrimination = Behavioural.",
          "Superordinate goals help eliminate intergroup prejudice (as shown by Sherif).",
        ],
      },
      {
        title: "4. Social Cognition, Schemas & Attribution Biases",
        content:
          "Social cognition deals with how we process, store, and apply information about people and social situations:\n\n" +
          "• **Schemas and Prototypes**:\n" +
          "  - **Schema**: A mental framework or cognitive structure that helps organize and interpret social information.\n" +
          "  - **Prototype**: The most representative exemplar or best example of a particular category (e.g., a mental image of a typical professor).\n\n" +
          "• **Attribution (Bernard Weiner & Fritz Heider)**:\n" +
          "  - Process of assigning causes to behavior:\n" +
          "    * *Internal / Dispositional Attribution*: Explaining behavior through personality traits, abilities, or motivation.\n" +
          "    * *External / Situational Attribution*: Explaining behavior through circumstance, environment, or luck.\n\n" +
          "• **Fundamental Attribution Error (FAE)**:\n" +
          "  - The tendency to **overestimate internal dispositional factors** and **underestimate external situational factors** when explaining *other people's* negative behavior or failures.\n" +
          "  - *Actor-Observer Effect*: When explaining our own failures, we cite external situations ('the exam was unfair'); when explaining others' failures, we blame internal flaws ('he is lazy').",
        ncertPointers: [
          "Fundamental Attribution Error = Blaming another's failure on their character rather than situation.",
          "Actor-Observer Effect = Situational for self, dispositional for others.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "P-O-X Balance Rules (Fritz Heider)",
        formula: "Balance: (+)(+)(+) = + OR (-)(-)(+) = + | Unbalance: (-)(-)(-) = - OR (+)(+)(-) = -",
        symbols: "Cognitive triadic balance signs",
        siUnits: "Structural balance evaluation",
        applicationCondition: "Calculating balance in P-O-X scenarios in CUET",
        notes: "Balance requires an odd number of positive relationships (either 3 or 1).",
      },
      {
        name: "Prejudice Triad Component Mapping",
        formula: "Stereotype (Cognitive) | Prejudice (Affective) | Discrimination (Behavioural)",
        symbols: "Intergroup bias structure",
        siUnits: "Social psychology taxonomy",
        applicationCondition: "Component matching questions in CUET",
        notes: "Stereotype is the belief; prejudice is the feeling; discrimination is the overt act.",
      },
      {
        name: "Attribution Biases Matrix",
        formula: "FAE (Blame others' character) vs Actor-Observer (Self = Situation, Other = Character)",
        symbols: "Causal attribution errors",
        siUnits: "Social cognitive heuristics",
        applicationCondition: "Vignette-based attribution identification",
        notes: "FAE is more prevalent in individualistic Western cultures than collectivistic cultures.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Fritz Heider's P-O-X Balance Theory",
      caption: "Triad relationship between Person (P), Other (O), and Attitude Object (X).",
      code: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <!-- Left: Balanced Triad -->
        <polygon points="175,40 85,175 265,175" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
        <circle cx="175" cy="40" r="18" fill="#047857"/>
        <text x="175" y="45" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">P</text>
        <circle cx="85" cy="175" r="18" fill="#047857"/>
        <text x="85" y="180" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">O</text>
        <circle cx="265" cy="175" r="18" fill="#047857"/>
        <text x="265" y="180" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">X</text>

        <text x="115" y="100" font-weight="bold" fill="#047857" font-size="14">(+)</text>
        <text x="235" y="100" font-weight="bold" fill="#047857" font-size="14">(+)</text>
        <text x="175" y="195" text-anchor="middle" font-weight="bold" fill="#047857" font-size="14">(+)</text>
        <text x="175" y="215" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="12">BALANCED: (+)(+)(+) = (+)</text>

        <!-- Right: Unbalanced Triad -->
        <polygon points="525,40 435,175 615,175" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
        <circle cx="525" cy="40" r="18" fill="#b91c1c"/>
        <text x="525" y="45" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">P</text>
        <circle cx="435" cy="175" r="18" fill="#b91c1c"/>
        <text x="435" y="180" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">O</text>
        <circle cx="615" cy="175" r="18" fill="#b91c1c"/>
        <text x="615" y="180" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">X</text>

        <text x="465" y="100" font-weight="bold" fill="#b91c1c" font-size="14">(+)</text>
        <text x="585" y="100" font-weight="bold" fill="#b91c1c" font-size="14">(-)</text>
        <text x="525" y="195" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="14">(+)</text>
        <text x="525" y="215" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="12">UNBALANCED: (+)(-)(+) = (-)</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <!-- Left: Balanced Triad -->
      <polygon points="175,40 85,175 265,175" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
      <circle cx="175" cy="40" r="18" fill="#047857"/>
      <text x="175" y="45" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">P</text>
      <circle cx="85" cy="175" r="18" fill="#047857"/>
      <text x="85" y="180" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">O</text>
      <circle cx="265" cy="175" r="18" fill="#047857"/>
      <text x="265" y="180" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">X</text>

      <text x="115" y="100" font-weight="bold" fill="#047857" font-size="14">(+)</text>
      <text x="235" y="100" font-weight="bold" fill="#047857" font-size="14">(+)</text>
      <text x="175" y="195" text-anchor="middle" font-weight="bold" fill="#047857" font-size="14">(+)</text>
      <text x="175" y="215" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="12">BALANCED: (+)(+)(+) = (+)</text>

      <!-- Right: Unbalanced Triad -->
      <polygon points="525,40 435,175 615,175" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
      <circle cx="525" cy="40" r="18" fill="#b91c1c"/>
      <text x="525" y="45" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">P</text>
      <circle cx="435" cy="175" r="18" fill="#b91c1c"/>
      <text x="435" y="180" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">O</text>
      <circle cx="615" cy="175" r="18" fill="#b91c1c"/>
      <text x="615" y="180" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="12">X</text>

      <text x="465" y="100" font-weight="bold" fill="#b91c1c" font-size="14">(+)</text>
      <text x="585" y="100" font-weight="bold" fill="#b91c1c" font-size="14">(-)</text>
      <text x="525" y="195" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="14">(+)</text>
      <text x="525" y="215" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="12">UNBALANCED: (+)(-)(+) = (-)</text>
    </svg>`,
    workedExamples: [
      {
        id: "psychology_u6_we1",
        questionNumber: 1,
        question:
          "In Fritz Heider's Balance Theory, Person 'P' likes Person 'O' (+), Person 'P' dislikes Topic 'X' (-), and Person 'O' likes Topic 'X' (+). Is this triad balanced or unbalanced, and why?\n" +
          "(A) Balanced, because two relations are positive.\n" +
          "(B) Unbalanced, because the product of the three signs is negative (+)(−)(+) = (−).\n" +
          "(C) Balanced, because P has a strong opinion on X.\n" +
          "(D) Unbalanced, because all three elements must be negative for balance.",
        options: [
          { id: "A", text: "Balanced, because two relations are positive." },
          { id: "B", text: "Unbalanced, because the product of the three signs is negative (+)(−)(+) = (−)." },
          { id: "C", text: "Balanced, because P has a strong opinion on X." },
          { id: "D", text: "Unbalanced, because all three elements must be negative for balance." },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Write down the signs of the three relationships in the P-O-X triad: P-O is (+), P-X is (−), and O-X is (+).",
          "Step 2: Multiply the signs: (+) × (−) × (+) = (−).",
          "Step 3: According to Heider's rule, a triad is balanced only if the product of signs is positive (+). Since the product is negative (−), the triad is unbalanced.",
          "Step 4: This creates psychological discomfort, forcing P or O to change their attitude.",
        ],
        cuetTip: "Multiply the 3 signs: Positive product = Balanced; Negative product = Unbalanced.",
      },
      {
        id: "psychology_u6_we2",
        questionNumber: 2,
        question:
          "A manager observes that an employee arrives late to work. The manager instantly concludes that the employee is lazy and irresponsible, completely ignoring that there was a major train breakdown. This cognitive error is an example of:\n" +
          "(A) Cognitive Dissonance\n" +
          "(B) Scapegoating\n" +
          "(C) Fundamental Attribution Error (FAE)\n" +
          "(D) Self-Fulfilling Prophecy",
        options: [
          { id: "A", text: "Cognitive Dissonance" },
          { id: "B", text: "Scapegoating" },
          { id: "C", text: "Fundamental Attribution Error (FAE)" },
          { id: "D", text: "Self-Fulfilling Prophecy" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: The manager attributes the employee's tardiness entirely to internal traits (lazy, irresponsible).",
          "Step 2: He overlooks the compelling external situational factor (train breakdown).",
          "Step 3: The tendency to overestimate internal dispositional factors and underestimate situational causes when judging others is the textbook definition of the Fundamental Attribution Error.",
        ],
        cuetTip: "Blaming someone's character while ignoring the situation = Fundamental Attribution Error.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Heider P-O-X Sign Calculation",
        frequency: "Very High",
        typicalStem: "Which of the following combinations of relationships produces a BALANCED state in Heider's theory?",
        strategy: "Look for all three positive (+)(+)(+) or two negative and one positive (−)(−)(+).",
      },
      {
        patternType: "A-B-C Component Attribution",
        frequency: "High",
        typicalStem: "A student feels disgust when thinking about smoking. Which component of attitude does this represent?",
        strategy: "Feelings and emotional reactions = Affective component.",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing a triad with three negative relationships is balanced.",
        whyWrong: "Three negative signs (−)(−)(−) multiply to a NEGATIVE product (−), which is an UNBALANCED state in Heider's theory.",
        correctUnderstanding: "(−) × (−) × (−) = (−), which is UNBALANCED.",
        trapOptionExample: "Option claiming all three negative relationships produce balance.",
      },
      {
        misconception: "Confusing Stereotype with Prejudice.",
        whyWrong: "A stereotype is a cognitive belief/cluster ('all elderly are slow'); prejudice is the negative emotional attitude/feeling ('I dislike being around elderly people').",
        correctUnderstanding: "Stereotype = Thought/Belief; Prejudice = Emotion/Attitude.",
        trapOptionExample: "Calling a cluster of generalized beliefs prejudice.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Heider Balance Product Rule",
        mnemonic: "P-P-P (Product Positive = Peaceful/Balanced)",
        rule: "Multiply the 3 signs: if result is (+), it is balanced",
        explanation: "Solves every P-O-X question in 5 seconds.",
      },
      {
        title: "Two-Step Concept Proponent",
        mnemonic: "M-T (Mohsin Two-step)",
        rule: "S.M. Mohsin developed the Two-Step Concept",
        explanation: "Direct memory hook for Indian contribution to attitude change.",
      },
    ],
    quickRevisionCard: {
      title: "Attitude & Social Cognition — 60-Second Flash Card",
      bulletPoints: [
        "A-B-C Components: Affective (feelings), Behavioural (actions), Cognitive (beliefs).",
        "Properties: Valence (+ or −), Extremeness, Simplicity/Complexity, Centrality.",
        "Heider's Balance (P-O-X): Balanced when product of signs is (+); unbalanced when (−).",
        "Festinger's Dissonance: Uncomfortable tension between conflicting cognitions.",
        "Mohsin's Two-Step: Step 1 (Target identifies with Source) -> Step 2 (Adopts attitude).",
        "Prejudice = Affective; Stereotype = Cognitive; Discrimination = Behavioural.",
        "Sources of Prejudice: Socialization, Scapegoating, Kernel of truth, Self-fulfilling prophecy.",
        "Fundamental Attribution Error (FAE): Overestimating disposition and underestimating situation for others.",
        "Actor-Observer Bias: Situational attribution for self, dispositional for others.",
      ],
      examTricks: [
        "Three negative relations (−)(−)(−) is UNBALANCED.",
        "Superordinate goals resolve intergroup prejudice.",
      ],
    },
    practiceQuestions: [
      {
        id: "psychology_u6_q1",
        question: "Who among the following proposed the 'Two-Step Concept' of attitude change?",
        type: "standard",
        options: [
          { id: "A", text: "Fritz Heider" },
          { id: "B", text: "Leon Festinger" },
          { id: "C", text: "S.M. Mohsin" },
          { id: "D", text: "Bernard Weiner" },
        ],
        correctOption: "C",
        explanation: "S.M. Mohsin, an Indian psychologist, proposed the Two-Step Concept of attitude change involving identification followed by attitude adoption.",
        difficulty: "easy",
      },
      {
        id: "psychology_u6_q2",
        question: "In the A-B-C model of attitudes, which component corresponds to a person's emotional feelings and degree of liking or disliking?",
        type: "standard",
        options: [
          { id: "A", text: "Behavioural component" },
          { id: "B", text: "Affective component" },
          { id: "C", text: "Cognitive component" },
          { id: "D", text: "Attributional component" },
        ],
        correctOption: "B",
        explanation: "The affective component represents feelings, emotions, and evaluations of liking or disliking toward the attitude object.",
        difficulty: "easy",
      },
      {
        id: "psychology_u6_q3",
        question:
          "Assertion (A): In Fritz Heider's Balance Theory, a triad where all three relationships are negative (−)(−)(−) represents an unbalanced state.\n" +
          "Reason (R): When the three signs are multiplied, the resultant product is negative, which produces psychological dissonance.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Multiplying three negative signs yields a negative product, reflecting an unbalanced state of cognitive tension in Heider's model.",
        difficulty: "medium",
      },
      {
        id: "psychology_u6_q4",
        question: "The psychological discomfort experienced when an individual holds two mutually contradictory beliefs or performs an action contrary to their attitudes is called:",
        type: "standard",
        options: [
          { id: "A", text: "Actor-Observer Effect" },
          { id: "B", text: "Cognitive Dissonance" },
          { id: "C", text: "Attitude Polarisation" },
          { id: "D", text: "Fundamental Attribution Error" },
        ],
        correctOption: "B",
        explanation: "Leon Festinger defined Cognitive Dissonance as the psychological tension arising from incompatible cognitions.",
        difficulty: "easy",
      },
      {
        id: "psychology_u6_q5",
        question:
          "Match List-I (Intergroup Construct) with List-II (Core Component):\n" +
          "List-I:\n" +
          "p. Stereotype\n" +
          "q. Prejudice\n" +
          "r. Discrimination\n" +
          "s. Superordinate Goals\n" +
          "List-II:\n" +
          "1. Affective component (negative feelings)\n" +
          "2. Behavioural component (differential unfair action)\n" +
          "3. Common goals requiring cooperative intergroup effort\n" +
          "4. Cognitive component (overgeneralised belief cluster)\n" +
          "Select the correct match:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-4, q-1, r-2, s-3" },
          { id: "B", text: "p-1, q-4, r-2, s-3" },
          { id: "C", text: "p-4, q-2, r-1, s-3" },
          { id: "D", text: "p-2, q-1, r-4, s-3" },
        ],
        correctOption: "A",
        explanation: "Stereotype (p-4: Cognitive), Prejudice (q-1: Affective), Discrimination (r-2: Behavioural), Superordinate Goals (s-3: Cooperative goals).",
        difficulty: "easy",
      },
      {
        id: "psychology_u6_q6",
        question: "The tendency to attribute another person's failure to their internal character flaws while ignoring external situational constraints is called:",
        type: "standard",
        options: [
          { id: "A", text: "Self-Fulfilling Prophecy" },
          { id: "B", text: "Fundamental Attribution Error" },
          { id: "C", text: "Social Loafing" },
          { id: "D", text: "Scapegoating" },
        ],
        correctOption: "B",
        explanation: "Fundamental Attribution Error (FAE) is the bias to overemphasize personal traits and underemphasize situational factors in explaining others' behavior.",
        difficulty: "easy",
      },
      {
        id: "psychology_u6_q7",
        question: "Which property of an attitude indicates whether it is positive, neutral, or negative?",
        type: "standard",
        options: [
          { id: "A", text: "Extremeness" },
          { id: "B", text: "Valence" },
          { id: "C", text: "Centrality" },
          { id: "D", text: "Multiplexity" },
        ],
        correctOption: "B",
        explanation: "Valence indicates the direction of an attitude—whether it is favourable (positive) or unfavourable (negative).",
        difficulty: "easy",
      },
      {
        id: "psychology_u6_q8",
        question:
          "Assertion (A): Introducing superordinate goals is an effective technique for reducing intergroup prejudice and conflict.\n" +
          "Reason (R): Superordinate goals are mutually beneficial and can be achieved only through cooperative, joint effort by competing groups.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Muzafer Sherif's Robbers Cave experiment proved that superordinate goals requiring joint cooperation dismantle intergroup hostility.",
        difficulty: "easy",
      },
      {
        id: "psychology_u6_q9",
        question: "Blaming a vulnerable, powerless minority group for general economic distress or unemployment is known as:",
        type: "standard",
        options: [
          { id: "A", text: "Scapegoating" },
          { id: "B", text: "Dissonance Reduction" },
          { id: "C", text: "Groupthink" },
          { id: "D", text: "Self-efficacy" },
        ],
        correctOption: "A",
        explanation: "Scapegoating is the social psychological phenomenon of deflecting frustration and blame onto an innocent, vulnerable target group.",
        difficulty: "easy",
      },
      {
        id: "psychology_u6_q10",
        question: "A mental structure or cognitive framework that organizes and guides the processing of social information is termed a:",
        type: "standard",
        options: [
          { id: "A", text: "Schema" },
          { id: "B", text: "Defense mechanism" },
          { id: "C", text: "Somatotype" },
          { id: "D", text: "Hierarchy" },
        ],
        correctOption: "A",
        explanation: "A schema is a cognitive blueprint or framework containing structured knowledge about social concepts and entities.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Therapeutic Approaches"],
      relatedTopics: ["Social Influence and Group Processes"],
      practiceTestId: "practice-psychology-unit6-test1",
      practiceTestUrl: "/test/practice-psychology-unit6-test1",
      weaknessReportUrl: "/dashboard/radar?subject=psychology",
      weaknessRadarUrl: "/dashboard/radar?subject=psychology",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 7: Social Influence and Group Processes
  // -------------------------------------------------------------------------
  {
    id: "psychology_u7_t1",
    slug: "conformity-compliance-obedience-group-dynamics-cooperation-and-competition",
    subject: "psychology",
    subjectName: "Psychology",
    subjectCode: "324",
    unitNumber: 7,
    unitTitle: "Social Influence and Group Processes",
    topicTitle: "Conformity, Compliance, Obedience, Group Dynamics, Cooperation and Competition",
    ncertReference: {
      class: "12",
      book: "Psychology",
      chapterNumber: 7,
      chapterName: "Social Influence and Group Processes",
      sections: [
        "Nature and Formation of Groups: Group vs Crowd vs Teams vs Mob",
        "Stages of Group Development: Bruce Tuckman (Forming, Storming, Norming, Performing, Adjourning)",
        "Group Structure: Roles, Norms, Status, Cohesiveness",
        "Social Influence Processes: Conformity (Asch), Compliance Techniques, Obedience (Milgram)",
        "Group Phenomena: Social Facilitation, Social Loafing (Ringelmann), Group Polarisation, Groupthink",
        "Cooperation vs Competition: Prisoner's Dilemma, Sherif's Robbers Cave Experiment",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely high yield (20+ questions across sets)",
      totalPyqsInRepo: 40,
      weightagePercentage: 10.0,
    },
    summary30Seconds: [
      "Group vs Crowd/Mob: A group features mutual interaction, common goals, interdependent roles, and group norms. A crowd is a collection of people present by chance without structure.",
      "Bruce Tuckman's 5 Stages: Forming (orientation) -> Storming (conflict) -> Norming (cohesion/rules) -> Performing (task accomplishment) -> Adjourning (disbandment).",
      "Social Influence: Conformity (Solomon Asch: changing behavior to fit group norm), Compliance (agreeing to a direct request; foot-in-the-door, door-in-the-face), Obedience (Stanley Milgram: obeying direct command from legitimate authority).",
      "Social Loafing: Reduction in individual effort when working collectively on a pooled task (Ringelmann effect; Latane's clapping studies).",
      "Group Polarisation: Groups take more extreme decisions than individuals. Groupthink (Irving Janis): excessive desire for unanimity overrides realistic evaluation.",
    ],
    coreConcepts: [
      {
        title: "1. Nature of Groups & Tuckman's 5 Stages of Development",
        content:
          "A group is an organised system of two or more individuals who interact, are interdependent, share common goals, and see themselves as belonging together:\n\n" +
          "• **Distinctions**:\n" +
          "  - **Crowd**: Collection of people gathered accidentally at a spot (e.g., watching a road accident); lacks mutual interdependence, common structure, or goals.\n" +
          "  - **Mob**: Emotionally charged crowd with a definite destructive objective and high impulsivity.\n" +
          "  - **Audience**: Passive collection of spectators gathered for a specific lecture or show.\n" +
          "  - **Team**: Highly coordinated group with complementary skills and shared mutual accountability.\n\n" +
          "• **Bruce Tuckman's Five Stages of Group Development**:\n" +
          "  1. **Forming (Orientation)**: Members meet, assess acceptable behavior, feel uncertainty about group purpose.\n" +
          "  2. **Storming (Conflict)**: Friction and conflict over leadership, roles, power distribution, and hierarchy.\n" +
          "  3. **Norming (Cohesion)**: Development of group identity, established norms, shared expectations, and mutual support.\n" +
          "  4. **Performing (Productivity)**: Energy is focused on executing tasks and achieving group goals.\n" +
          "  5. **Adjourning (Termination)**: Task completion and disbandment of the group.",
        ncertPointers: [
          "Tuckman's sequence: Forming -> Storming -> Norming -> Performing -> Adjourning.",
          "Conflict over leadership occurs during the 'Storming' stage.",
        ],
      },
      {
        title: "2. Group Structure: Roles, Norms, Status & Cohesiveness",
        content:
          "Four fundamental components define group structure:\n\n" +
          "• **Roles**: Socially defined expectations and obligations assigned to individuals occupying specific positions (e.g., captain, treasurer).\n" +
          "• **Norms**: Unwritten, shared standards of acceptable behavior, attitudes, and values expected of group members.\n" +
          "• **Status**: Relative prestige, social standing, or position of power given to a member within the group.\n" +
          "• **Cohesiveness**: The mutual attraction, unity, team spirit, and 'we-feeling' binding members to the group. Highly cohesive groups have higher loyalty, but can risk Groupthink.",
        ncertPointers: [
          "Norms are shared standards of behavior; Cohesiveness is the 'we-feeling' holding the group together.",
        ],
      },
      {
        title: "3. Social Influence Processes: Conformity, Compliance & Obedience",
        content:
          "The three fundamental types of social influence:\n\n" +
          "• **1. Conformity (Peer Pressure / Social Norms)**:\n" +
          "  - Changing one's opinions or behavior to match the standard or norm of the group.\n" +
          "  - **Solomon Asch's Classic Line Judgement Experiment (1951)**:\n" +
          "    * Participants judged which comparison line matched a standard line in the presence of confederates giving unanimous wrong answers.\n" +
          "    * ~75% of participants conformed to the incorrect group majority at least once.\n" +
          "    * Factors: Group size (peaks at 3-4 confederates), unanimity (even a single dissenter shatters conformity), task ambiguity.\n\n" +
          "• **2. Compliance (Agreeing to a Request)**:\n" +
          "  - Changing behavior in response to a direct, external request from someone who lacks authority over you.\n" +
          "  - **Techniques**:\n" +
          "    * *Foot-in-the-Door*: Securing agreement to a small initial request first, making compliance with a larger subsequent request much more likely.\n" +
          "    * *Door-in-the-Face*: Making an unreasonably large request that is rejected, followed by a smaller, concessionary target request.\n" +
          "    * *Lowball Technique*: Securing commitment on attractive terms before revealing hidden extra costs.\n\n" +
          "• **3. Obedience (Yielding to Authority)**:\n" +
          "  - Direct response to an explicit command issued by a legitimate authority figure.\n" +
          "  - **Stanley Milgram's Classic Shock Experiment (1963)**:\n" +
          "    * Teachers instructed to deliver increasing electric shocks (up to 450 volts, labeled 'XXX') to a learner for memory errors.\n" +
          "    * Found astonishing 65% of participants administered the maximum 450-volt shock under authority commands, proving ordinary people can commit destructive acts under authority.",
        ncertPointers: [
          "Conformity = Asch's line experiment; Obedience = Milgram's electric shock experiment (65% full compliance).",
          "Foot-in-the-door = Small request first; Door-in-the-face = Large rejected request first.",
        ],
      },
      {
        title: "4. Group Phenomena: Social Loafing, Polarisation & Groupthink",
        content:
          "• **Social Loafing (Ringelmann Effect / Latane)**:\n" +
          "  - The tendency for individuals to exert **less effort** when working collectively in a group on a pooled task than when working individually.\n" +
          "  - Why it occurs: Diffusion of responsibility, individual contributions are not identifiable or evaluated, feeling that one's effort is dispensable ('free-rider effect').\n" +
          "  - Reduced by: Making individual efforts identifiable, increasing task importance, establishing individual accountability.\n\n" +
          "• **Group Polarisation**:\n" +
          "  - The tendency of group discussions to strengthen and shift the initial inclination of members toward a **more extreme decision** ('risky shift').\n" +
          "  - Occurs due to hearing new persuasive arguments and social comparison (wanting to appear like a bold group member).\n\n" +
          "• **Groupthink (Irving Janis)**:\n" +
          "  - A distorted mode of thinking that occurs when the desire for **harmony and unanimity** in a cohesive decision-making group overrides realistic appraisal of alternative courses of action.\n" +
          "  - Symptoms: Illusion of invulnerability, self-censorship of dissenting opinions, pressure on dissenters, collective rationalisation (e.g., Bay of Pigs invasion).",
        ncertPointers: [
          "Social loafing occurs because individual contributions cannot be identified.",
          "Groupthink was coined by Irving Janis.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Tuckman's Group Development Stages",
        formula: "Forming -> Storming -> Norming -> Performing -> Adjourning",
        symbols: "F-S-N-P-A",
        siUnits: "Developmental lifecycle",
        applicationCondition: "Chronological order and stage characteristics questions in CUET",
        notes: "Storming is characterized by role ambiguity and leadership struggle.",
      },
      {
        name: "Social Influence Taxonomies",
        formula: "Conformity (Peer norms - Asch) | Compliance (Direct request) | Obedience (Authority command - Milgram)",
        symbols: "Social pressure modalities",
        siUnits: "Social influence continuum",
        applicationCondition: "Vignette-based classification of influence",
        notes: "Foot-in-the-door and Door-in-the-face are compliance tactics.",
      },
      {
        name: "Group Dynamics Matrix",
        formula: "Social Loafing (Effort reduction in pooled tasks) | Group Polarisation (Extreme decisions) | Groupthink (Forced consensus)",
        symbols: "Group-induced behavioral phenomena",
        siUnits: "Collective decision-making heuristics",
        applicationCondition: "Direct distinction questions in CUET",
        notes: "Groupthink thrives in highly cohesive, isolated groups under high stress.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Bruce Tuckman's 5 Stages of Group Development",
      caption: "Linear progression from initial orientation (Forming) to task termination (Adjourning).",
      code: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
        <rect x="15" y="60" width="120" height="100" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
        <text x="75" y="90" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="12">1. Forming</text>
        <text x="75" y="115" text-anchor="middle" fill="#1e3a8a" font-size="10">Orientation</text>
        <text x="75" y="135" text-anchor="middle" fill="#1e3a8a" font-size="10">Initial meeting</text>

        <rect x="150" y="60" width="120" height="100" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
        <text x="210" y="90" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="12">2. Storming</text>
        <text x="210" y="115" text-anchor="middle" fill="#7f1d1d" font-size="10">Conflict &amp; Power</text>
        <text x="210" y="135" text-anchor="middle" fill="#7f1d1d" font-size="10">Role friction</text>

        <rect x="285" y="60" width="120" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
        <text x="345" y="90" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="12">3. Norming</text>
        <text x="345" y="115" text-anchor="middle" fill="#78350f" font-size="10">Cohesiveness</text>
        <text x="345" y="135" text-anchor="middle" fill="#78350f" font-size="10">Shared norms</text>

        <rect x="420" y="60" width="120" height="100" rx="8" fill="#dcfce7" stroke="#10b981" stroke-width="2"/>
        <text x="480" y="90" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="12">4. Performing</text>
        <text x="480" y="115" text-anchor="middle" fill="#047857" font-size="10">Productivity</text>
        <text x="480" y="135" text-anchor="middle" fill="#047857" font-size="10">Goal execution</text>

        <rect x="555" y="60" width="130" height="100" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
        <text x="620" y="90" text-anchor="middle" font-weight="bold" fill="#334155" font-size="12">5. Adjourning</text>
        <text x="620" y="115" text-anchor="middle" fill="#475569" font-size="10">Disbandment</text>
        <text x="620" y="135" text-anchor="middle" fill="#475569" font-size="10">Task complete</text>
      </svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:sans-serif;">
      <rect x="15" y="60" width="120" height="100" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
      <text x="75" y="90" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="12">1. Forming</text>
      <text x="75" y="115" text-anchor="middle" fill="#1e3a8a" font-size="10">Orientation</text>
      <text x="75" y="135" text-anchor="middle" fill="#1e3a8a" font-size="10">Initial meeting</text>

      <rect x="150" y="60" width="120" height="100" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <text x="210" y="90" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="12">2. Storming</text>
      <text x="210" y="115" text-anchor="middle" fill="#7f1d1d" font-size="10">Conflict &amp; Power</text>
      <text x="210" y="135" text-anchor="middle" fill="#7f1d1d" font-size="10">Role friction</text>

      <rect x="285" y="60" width="120" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text x="345" y="90" text-anchor="middle" font-weight="bold" fill="#92400e" font-size="12">3. Norming</text>
      <text x="345" y="115" text-anchor="middle" fill="#78350f" font-size="10">Cohesiveness</text>
      <text x="345" y="135" text-anchor="middle" fill="#78350f" font-size="10">Shared norms</text>

      <rect x="420" y="60" width="120" height="100" rx="8" fill="#dcfce7" stroke="#10b981" stroke-width="2"/>
      <text x="480" y="90" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="12">4. Performing</text>
      <text x="480" y="115" text-anchor="middle" fill="#047857" font-size="10">Productivity</text>
      <text x="480" y="135" text-anchor="middle" fill="#047857" font-size="10">Goal execution</text>

      <rect x="555" y="60" width="130" height="100" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
      <text x="620" y="90" text-anchor="middle" font-weight="bold" fill="#334155" font-size="12">5. Adjourning</text>
      <text x="620" y="115" text-anchor="middle" fill="#475569" font-size="10">Disbandment</text>
      <text x="620" y="135" text-anchor="middle" fill="#475569" font-size="10">Task complete</text>
    </svg>`,
    workedExamples: [
      {
        id: "psychology_u7_we1",
        questionNumber: 1,
        question:
          "In a tug-of-war competition, researchers observed that a group of 8 individuals pulled with less total combined force than the sum of their individual pulling capacities when measured alone. This phenomenon is termed:\n" +
          "(A) Social Facilitation\n" +
          "(B) Social Loafing (Ringelmann Effect)\n" +
          "(C) Groupthink\n" +
          "(D) Group Polarisation",
        options: [
          { id: "A", text: "Social Facilitation" },
          { id: "B", text: "Social Loafing (Ringelmann Effect)" },
          { id: "C", text: "Groupthink" },
          { id: "D", text: "Group Polarisation" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Notice the reduction in individual effort when performing in a pooled group task.",
          "Step 2: Max Ringelmann first documented this in rope-pulling experiments; later defined by Bibb Latané as Social Loafing.",
          "Step 3: Correct answer is Social Loafing (Option B).",
        ],
        cuetTip: "Reduced effort in a collective group = Social Loafing.",
      },
      {
        id: "psychology_u7_we2",
        questionNumber: 2,
        question:
          "A salesperson persuades a customer to sign a petition for road safety. Two days later, the salesperson returns and asks the customer for a ₹2,000 donation to the road safety campaign, which the customer grants. Which compliance technique was used?\n" +
          "(A) Door-in-the-Face Technique\n" +
          "(B) Lowball Technique\n" +
          "(C) Foot-in-the-Door Technique\n" +
          "(D) Normative Conformity",
        options: [
          { id: "A", text: "Door-in-the-Face Technique" },
          { id: "B", text: "Lowball Technique" },
          { id: "C", text: "Foot-in-the-Door Technique" },
          { id: "D", text: "Normative Conformity" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: First, a very small and agreeable request is made (signing a petition).",
          "Step 2: Once committed, the person complies with a significantly larger target request (₹2,000 donation).",
          "Step 3: Starting with a small request to gain compliance for a larger request is the classic Foot-in-the-Door technique (Option C).",
        ],
        cuetTip: "Small request first, then large request = Foot-in-the-Door.",
      },
    ],
    howCuetAsksThis: [
      {
        patternType: "Classic Social Psychology Experiment Matching",
        frequency: "Very High",
        typicalStem: "Match the researcher with their famous experiment: Asch, Milgram, Sherif, Janis.",
        strategy: "Asch = Line judgement / Conformity; Milgram = Electric shock / Obedience; Sherif = Robbers Cave / Superordinate goals; Janis = Groupthink.",
      },
      {
        patternType: "Sequence of Tuckman's Stages",
        frequency: "High",
        typicalStem: "Which stage of group development is characterized by conflict and power struggle over leadership?",
        strategy: "The conflict stage is Storming.",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing Foot-in-the-Door and Door-in-the-Face.",
        whyWrong: "Foot-in-the-Door starts with a small request and moves to a big request. Door-in-the-Face starts with a giant, unreasonable request that is rejected, followed by a smaller concessionary request.",
        correctUnderstanding: "Small -> Big = Foot-in-the-door; Big (rejected) -> Small = Door-in-the-face.",
        trapOptionExample: "Calling a rejected large request followed by a small request foot-in-the-door.",
      },
      {
        misconception: "Assuming Social Loafing occurs in individual tasks.",
        whyWrong: "Social loafing occurs ONLY in pooled collective tasks where individual outputs cannot be evaluated separately. If individual effort is monitored, social loafing disappears.",
        correctUnderstanding: "Social loafing requires pooled, unidentifiable effort.",
        trapOptionExample: "Stating social loafing happens during individual exams.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Tuckman's Stages Lifecycle",
        mnemonic: "F-S-N-P-A",
        rule: "Forming -> Storming -> Norming -> Performing -> Adjourning",
        explanation: "Flawless chronological recall of group development stages.",
      },
      {
        title: "Compliance Door Techniques",
        mnemonic: "Foot = Small entry; Face = Slammed shut first",
        rule: "Foot = Small request first | Face = Large rejected request first",
        explanation: "Never mix up the two compliance tactics.",
      },
    ],
    quickRevisionCard: {
      title: "Social Influence & Groups — 60-Second Flash Card",
      bulletPoints: [
        "Group vs Crowd: Group has shared goals, roles, norms, and interdependence; crowd lacks structure.",
        "Tuckman Stages: Forming (orientation) -> Storming (conflict) -> Norming (cohesion) -> Performing -> Adjourning.",
        "Conformity: Solomon Asch line experiment (75% conformed at least once).",
        "Compliance Tactics: Foot-in-the-door (small first), Door-in-the-face (large rejected first), Lowball.",
        "Obedience: Stanley Milgram shock experiment (65% delivered 450V under authority).",
        "Social Facilitation: Performance improves on simple tasks in presence of others.",
        "Social Loafing (Ringelmann): Individuals exert less effort when effort is pooled.",
        "Group Polarisation: Discussion leads to more extreme decisions ('risky shift').",
        "Groupthink (Janis): Extreme unanimity overrides realistic critical thinking.",
      ],
      examTricks: [
        "Storming = Intra-group conflict.",
        "Milgram's obedience rate was 65% up to the maximum 450 volts.",
      ],
    },
    practiceQuestions: [
      {
        id: "psychology_u7_q1",
        question: "In Bruce Tuckman's model of group development, which stage is characterised by conflict over roles and leadership?",
        type: "standard",
        options: [
          { id: "A", text: "Forming" },
          { id: "B", text: "Storming" },
          { id: "C", text: "Norming" },
          { id: "D", text: "Performing" },
        ],
        correctOption: "B",
        explanation: "The Storming stage is characterised by intragroup conflict, interpersonal friction, and struggles over leadership control.",
        difficulty: "easy",
      },
      {
        id: "psychology_u7_q2",
        question: "Who conducted the classic experiment on 'Conformity' using matching line judgements?",
        type: "standard",
        options: [
          { id: "A", text: "Stanley Milgram" },
          { id: "B", text: "Solomon Asch" },
          { id: "C", text: "Philip Zimbardo" },
          { id: "D", text: "Muzafer Sherif" },
        ],
        correctOption: "B",
        explanation: "Solomon Asch conducted the famous line judgement experiment demonstrating peer conformity.",
        difficulty: "easy",
      },
      {
        id: "psychology_u7_q3",
        question:
          "Assertion (A): Social loafing is reduced when individual contributions to a collective task can be clearly identified and evaluated.\n" +
          "Reason (R): Accountability eliminates the free-rider effect and restores personal responsibility.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Making individual performance identifiable eliminates diffusion of responsibility, neutralizing social loafing.",
        difficulty: "easy",
      },
      {
        id: "psychology_u7_q4",
        question: "What percentage of participants in Stanley Milgram's classic obedience experiment administered the maximum 450-volt shock?",
        type: "standard",
        options: [
          { id: "A", text: "10%" },
          { id: "B", text: "35%" },
          { id: "C", text: "65%" },
          { id: "D", text: "95%" },
        ],
        correctOption: "C",
        explanation: "In Milgram's baseline experiment, approximately 65% of participants obeyed the authority figure up to the maximum 450-volt level.",
        difficulty: "medium",
      },
      {
        id: "psychology_u7_q5",
        question:
          "Match List-I (Social Phenomenon) with List-II (Key Proponent / Concept):\n" +
          "List-I:\n" +
          "p. Groupthink\n" +
          "q. Conformity\n" +
          "r. Obedience to Authority\n" +
          "s. 5 Stages of Group Development\n" +
          "List-II:\n" +
          "1. Stanley Milgram (Shock experiment)\n" +
          "2. Bruce Tuckman\n" +
          "3. Irving Janis\n" +
          "4. Solomon Asch (Line experiment)\n" +
          "Select the correct option:",
        type: "match-the-following",
        options: [
          { id: "A", text: "p-3, q-4, r-1, s-2" },
          { id: "B", text: "p-4, q-3, r-1, s-2" },
          { id: "C", text: "p-3, q-1, r-4, s-2" },
          { id: "D", text: "p-2, q-4, r-1, s-3" },
        ],
        correctOption: "A",
        explanation: "Groupthink (p-3: Janis), Conformity (q-4: Asch), Obedience (r-1: Milgram), Tuckman (s-2: 5 stages).",
        difficulty: "easy",
      },
      {
        id: "psychology_u7_q6",
        question: "The tendency of group discussions to produce more extreme decisions than the average of members' individual preferences is known as:",
        type: "standard",
        options: [
          { id: "A", text: "Social Loafing" },
          { id: "B", text: "Groupthink" },
          { id: "C", text: "Group Polarisation" },
          { id: "D", text: "Social Facilitation" },
        ],
        correctOption: "C",
        explanation: "Group Polarisation is the shift toward more extreme positions following group interaction and discussion.",
        difficulty: "easy",
      },
      {
        id: "psychology_u7_q7",
        question: "Starting with an extreme, unreasonably large request that is rejected, and then following up with a smaller target request is the:",
        type: "standard",
        options: [
          { id: "A", text: "Foot-in-the-door technique" },
          { id: "B", text: "Door-in-the-face technique" },
          { id: "C", text: "Lowball technique" },
          { id: "D", text: "Ingratiation technique" },
        ],
        correctOption: "B",
        explanation: "The Door-in-the-face technique relies on the norm of reciprocity after a large initial request is rejected.",
        difficulty: "easy",
      },
      {
        id: "psychology_u7_q8",
        question:
          "Assertion (A): Groupthink can lead to catastrophic policy and military decisions.\n" +
          "Reason (R): In a groupthink situation, members self-censor doubts and fail to appraise alternative courses of action in pursuit of unanimous consensus.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true but (R) is false." },
          { id: "D", text: "(A) is false but (R) is true." },
        ],
        correctOption: "A",
        explanation: "Groupthink suppresses critical appraisal, generating an illusion of invulnerability that results in flawed policy disasters.",
        difficulty: "easy",
      },
      {
        id: "psychology_u7_q9",
        question: "Shared expectations and rules regarding acceptable behavior within a group are formally termed:",
        type: "standard",
        options: [
          { id: "A", text: "Roles" },
          { id: "B", text: "Norms" },
          { id: "C", text: "Status" },
          { id: "D", text: "Cohesiveness" },
        ],
        correctOption: "B",
        explanation: "Norms are the agreed-upon standards and rules of behavior expected of group members.",
        difficulty: "easy",
      },
      {
        id: "psychology_u7_q10",
        question: "The mutual attraction, team spirit, and 'we-feeling' binding group members together is termed:",
        type: "standard",
        options: [
          { id: "A", text: "Group Cohesiveness" },
          { id: "B", text: "Social Facilitation" },
          { id: "C", text: "Compliance" },
          { id: "D", text: "Deindividuation" },
        ],
        correctOption: "A",
        explanation: "Group cohesiveness refers to the strength of relationships and sense of unity binding members to their group.",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: ["Attitude and Social Cognition"],
      relatedTopics: ["Variations in Psychological Attributes", "Therapeutic Approaches"],
      practiceTestId: "practice-psychology-unit7-test1",
      practiceTestUrl: "/test/practice-psychology-unit7-test1",
      weaknessReportUrl: "/dashboard/radar?subject=psychology",
      weaknessRadarUrl: "/dashboard/radar?subject=psychology",
    },
  },
];
