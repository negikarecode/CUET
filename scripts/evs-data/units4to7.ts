export const evsUnits4to7 = [
  {
    id: "environmental_studies_u4_t1",
    slug: "urbanisation-industrialization-mega-dams-environmental-impact-assessment-eia",
    subject: "environmental_studies",
    subjectName: "Environmental Studies",
    subjectCode: "310",
    unitNumber: 4,
    unitTitle: "Development and Environment",
    topicTitle: "Urbanisation, Industrialization, Mega Dams, Environmental Impact Assessment (EIA)",
    ncertReference: {
      class: "12",
      book: "Environmental Studies & Development NCERT Class XII",
      chapterNumber: 4,
      chapterName: "Development, Infrastructure and Environmental Governance",
      sections: ["4.1 Environmental Impacts of Rapid Urbanisation & Industrialization", "4.2 Mega Dams: Ecological and Socio-Economic Displacements (Narmada Bachao Andolan)", "4.3 Environmental Impact Assessment (EIA): Definition, Legal Framework & EIA Notification 2006", "4.4 The 4 Stages of EIA: Screening, Scoping, Public Hearing & Appraisal"]
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely popular in CUET. EIA 4 stages (screening, scoping, public hearing, appraisal), Narmada Bachao Andolan, Tehri dam seismicity, and urban heat islands appear frequently.",
      totalPyqsInRepo: 0,
      weightagePercentage: 14
    },
    summary30Seconds: [
      "Urbanisation & Industry: Creates Urban Heat Islands (UHI), impervious surface flooding, municipal waste overload, and air pollution.",
      "Mega Dams: Provide hydroelectric power and irrigation, but cause reservoir-induced seismicity (RIS), submergence of pristine forests, siltation, and forced tribal displacement (Narmada Bachao Andolan led by Medha Patkar).",
      "Environmental Impact Assessment (EIA): Statutory tool under Environment (Protection) Act 1986 evaluating socio-environmental consequences before project clearance.",
      "4 EIA Stages: (1) Screening (Category A vs B), (2) Scoping (formulating Terms of Reference - ToR), (3) Public Consultation / Hearing, (4) Appraisal by Expert Appraisal Committee (EAC)."
    ],
    coreConcepts: [
      {
        title: "1. Environmental Consequences of Rapid Urbanisation & Industrialization",
        content: "Unplanned urbanization and industrial growth exert massive ecological stress:\n- Urban Heat Island (UHI) Effect: Urban metropolitan areas exhibit significantly higher ambient temperatures than surrounding rural areas due to high thermal mass of asphalt and concrete, lack of vegetated canopy evapotranspiration, and concentrated anthropogenic heat from vehicles and air conditioners.\n- Hydrological Disruption: Paving soil with impervious concrete prevents rainwater infiltration, causing flash urban flooding while simultaneously depleting local groundwater aquifers.\n- Industrial Effluents & Brownfields: Unregulated release of untreated heavy metals and chemical effluents contaminates urban waterways (e.g. Yamuna in Delhi, Bellandur lake in Bengaluru).",
        ncertPointers: [
          "Green Belts and urban forestry (Miyawaki method) mitigate the Urban Heat Island effect by providing natural shade and evaporative cooling.",
          "Fly ash from coal thermal plants must be utilized in brick manufacturing and cement blending under CPCB mandates."
        ]
      },
      {
        title: "2. Mega Dams: Ecological Costs and Social Movements",
        content: "Large multipurpose river valley projects (hailed historically by Jawaharlal Nehru as 'Temples of Modern India') involve complex ecological and humanitarian trade-offs:\n- Benefits: Hydroelectric clean power generation, flood control, perennial irrigation, and municipal water supply.\n- Ecological Costs: Submergence of thousands of hectares of biodiversity-rich primary forests, disruption of aquatic fish migration (loss of river connectivity for hilsa/mahseer), reservoir sedimentation, and Reservoir-Induced Seismicity (RIS, e.g. Koyna earthquake 1967, Tehri dam in high seismic Zone V).\n- Social Displacement & People's Movements:\n- Narmada Bachao Andolan (NBA): Formed in 1985, spearheaded by Medha Patkar and Baba Amte against the Sardar Sarovar Dam in Gujarat. Protested the forced displacement of over 250,000 predominantly tribal (Adivasi) villagers without adequate rehabilitation ('Rehabilitation before Submergence').\n- Tehri Dam Movement: Spearheaded by Sundarlal Bahuguna against construction of the massive rock-fill dam on the Bhagirathi River in Uttarakhand due to catastrophic earthquake risks.",
        ncertPointers: [
          "Reservoir siltation reduces the active water storage capacity of dams and deprives downstream floodplains of natural nutrient-rich silt.",
          "Decomposition of submerged organic forest vegetation under anaerobic reservoir conditions produces significant greenhouse emissions (Methane, CH₄)."
        ]
      },
      {
        title: "3. Environmental Impact Assessment (EIA): Concept and 4 Stages",
        content: "EIA is a formal administrative and planning tool used to predict, evaluate, and mitigate the environmental, social, and economic consequences of a proposed development project prior to granting environmental clearance (EC).\n- Legal Mandate: Governed under the Environment (Protection) Act, 1986 and EIA Notification, 2006 (Ministry of Environment, Forest and Climate Change - MoEFCC).\n- Project Categorization:\n- Category A: High-impact projects (ports, nuclear plants, large highways); require mandatory EIA and central clearance from MoEFCC based on Expert Appraisal Committee (EAC) recommendations.\n- Category B: Cleared at state level by State Environmental Impact Assessment Authority (SEIAA). Subdivided into B1 (requires EIA) and B2 (exempt from EIA).\n\nThe 4 Sequential Stages of the EIA Process:\n1. Screening: Determining whether a proposed project requires an EIA study based on scale, investment, and location.\n2. Scoping: Determining the comprehensive 'Terms of Reference' (ToR) detailing all specific environmental aspects to be studied (baseline air, water, soil, ecological biodiversity, socio-economic baseline).\n3. Public Consultation (Public Hearing): Mandatory democratic public hearing conducted by the State Pollution Control Board in the project vicinity to solicit objections, feedback, and concerns of affected local communities.\n4. Appraisal: Detailed scrutiny of the final EIA report and public hearing outcome by the Expert Appraisal Committee (EAC), culminating in granting or rejecting Environmental Clearance (EC).",
        ncertPointers: [
          "EMP (Environmental Management Plan): Mandatory component of EIA outlining specific mitigation measures, disaster management, and compensatory afforestation.",
          "Post-clearance monitoring requires project proponents to submit half-yearly compliance reports."
        ]
      }
    ],
    keyFormulasAndTables: [
      {
        name: "EIA 4-Stage Regulatory Sequence (EIA 2006)",
        formula: "Screening -> Scoping (ToR) -> Public Consultation -> Appraisal",
        symbols: "MoEFCC Regulatory Pipeline",
        siUnits: "Administrative steps",
        applicationCondition: "EIA procedural questions in CUET",
        notes: "Category A projects go directly to Scoping without Screening."
      },
      {
        name: "EIA Project Categorization",
        formula: "Category A = Central MoEFCC Clearance | Category B = State SEIAA Clearance (B1: EIA needed; B2: Exempt)",
        symbols: "Jurisdictional classification",
        siUnits: "Project threshold",
        applicationCondition: "Environmental governance questions",
        notes: "Established under the landmark EIA Notification of September 14, 2006."
      }
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%">
  <defs>
    <linearGradient id="evs4Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#142438"/>
    </linearGradient>
    <linearGradient id="eiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" rx="12" fill="url(#evs4Grad)"/>
  <text x="400" y="32" fill="#38bdf8" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">CUET Environmental Studies: Mega Dams &amp; 4 Stages of EIA</text>
  
  <!-- Left Box: Mega Dams & Movements -->
  <g transform="translate(30, 60)">
    <rect width="360" height="320" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <text x="180" y="25" fill="#fde68a" font-size="14" font-weight="bold" text-anchor="middle">Mega Dams: Ecological &amp; Social Trade-offs</text>
    
    <rect x="15" y="45" width="330" height="80" rx="6" fill="#78350f" opacity="0.3" stroke="#f59e0b"/>
    <text x="25" y="65" fill="#fcd34d" font-size="11" font-weight="bold">Ecological Hazards:</text>
    <text x="25" y="82" fill="#cbd5e1" font-size="10">• Submergence of pristine tropical biodiversity &amp; wildlife</text>
    <text x="25" y="97" fill="#cbd5e1" font-size="10">• Reservoir-Induced Seismicity (RIS - e.g. Koyna 1967, Tehri)</text>
    <text x="25" y="112" fill="#cbd5e1" font-size="9">• Methane emissions from anaerobic decomposition of rotting forests</text>
    
    <rect x="15" y="135" width="330" height="80" rx="6" fill="#831843" opacity="0.25" stroke="#ec4899"/>
    <text x="25" y="155" fill="#f472b6" font-size="11" font-weight="bold">Social Movements:</text>
    <text x="25" y="172" fill="#cbd5e1" font-size="10">• Narmada Bachao Andolan (NBA, 1985):</text>
    <text x="35" y="187" fill="#fbcfe8" font-size="9">Medha Patkar &amp; Baba Amte against Sardar Sarovar Dam</text>
    <text x="25" y="202" fill="#cbd5e1" font-size="10">• Tehri Dam Movement: Sundarlal Bahuguna (Himalayan risk)</text>
    
    <rect x="15" y="225" width="330" height="75" rx="6" fill="#1e3a8a" opacity="0.25" stroke="#3b82f6"/>
    <text x="25" y="243" fill="#93c5fd" font-size="11" font-weight="bold">Urban Heat Island (UHI) Effect:</text>
    <text x="25" y="260" fill="#cbd5e1" font-size="10">• Concrete &amp; asphalt trap solar heat; low evapotranspiration</text>
    <text x="25" y="275" fill="#cbd5e1" font-size="9">• Miyawaki urban forests &amp; green roofs provide micro-climate relief</text>
  </g>

  <!-- Right Box: 4 Stages of EIA -->
  <g transform="translate(420, 60)">
    <rect width="350" height="320" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
    <text x="175" y="25" fill="#7dd3fc" font-size="14" font-weight="bold" text-anchor="middle">EIA Notification 2006 (4 Stages)</text>
    
    <!-- Step 1 -->
    <rect x="15" y="45" width="320" height="50" rx="6" fill="#0369a1" opacity="0.25" stroke="#0284c7"/>
    <text x="25" y="65" fill="#38bdf8" font-size="11" font-weight="bold">1. SCREENING:</text>
    <text x="25" y="82" fill="#cbd5e1" font-size="10">Decides if project needs EIA. Cat A = Yes; Cat B1 = Yes; B2 = No</text>
    
    <!-- Step 2 -->
    <rect x="15" y="102" width="320" height="50" rx="6" fill="#0369a1" opacity="0.25" stroke="#0284c7"/>
    <text x="25" y="122" fill="#38bdf8" font-size="11" font-weight="bold">2. SCOPING:</text>
    <text x="25" y="139" fill="#cbd5e1" font-size="10">Formulates Terms of Reference (ToR) detailing environmental baseline</text>
    
    <!-- Step 3 -->
    <rect x="15" y="160" width="320" height="58" rx="6" fill="#065f46" opacity="0.25" stroke="#10b981"/>
    <text x="25" y="180" fill="#34d399" font-size="11" font-weight="bold">3. PUBLIC CONSULTATION (Public Hearing):</text>
    <text x="25" y="197" fill="#cbd5e1" font-size="10">Democratic hearing in project vicinity; gathers community concerns</text>
    
    <!-- Step 4 -->
    <rect x="15" y="225" width="320" height="58" rx="6" fill="#7e22ce" opacity="0.2" stroke="#a855f7"/>
    <text x="25" y="245" fill="#c4b5fd" font-size="11" font-weight="bold">4. APPRAISAL:</text>
    <text x="25" y="262" fill="#cbd5e1" font-size="10">Scrutiny by Expert Appraisal Committee (EAC) to grant/reject EC</text>
    
    <rect x="15" y="290" width="320" height="20" rx="3" fill="#0f172a"/>
    <text x="175" y="303" fill="#94a3b8" font-size="9" text-anchor="middle">Governed under Environment (Protection) Act, 1986</text>
  </g>

  <text x="400" y="405" fill="#64748b" font-size="11" text-anchor="middle">NCERT Class 12 Environmental Studies • Infrastructure Governance, Dam Impacts &amp; EIA</text>
</svg>`,
    workedExamples: [
      {
        questionNumber: 1,
        question: "Under the EIA Notification 2006 issued by the Ministry of Environment, Forest and Climate Change (MoEFCC), what is the correct chronological order of the 4 statutory stages in the Environmental Clearance process?",
        options: [
          { id: "A", text: "Scoping -> Screening -> Appraisal -> Public Consultation" },
          { id: "B", text: "Screening -> Scoping -> Public Consultation -> Appraisal" },
          { id: "C", text: "Public Consultation -> Screening -> Scoping -> Appraisal" },
          { id: "D", text: "Screening -> Appraisal -> Scoping -> Public Consultation" }
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The EIA process in India follows a structured legal pipeline under the EIA Notification 2006.",
          "Step 2: Stage 1 is Screening (determining whether EIA is needed).",
          "Step 3: Stage 2 is Scoping (formulating Terms of Reference - ToR).",
          "Step 4: Stage 3 is Public Consultation (conducting democratic public hearings).",
          "Step 5: Stage 4 is Appraisal (Expert Appraisal Committee evaluation for grant of clearance).",
          "Conclusion: Option B (Screening -> Scoping -> Public Consultation -> Appraisal) is correct."
        ],
        cuetTip: "Mnemonic: S-S-P-A -> Screening, Scoping, Public Consultation, Appraisal."
      },
      {
        questionNumber: 2,
        question: "Who was the leading activist and founder of the Narmada Bachao Andolan (NBA) who organized nationwide non-violent protests against the Sardar Sarovar Dam?",
        options: [
          { id: "A", text: "Chandi Prasad Bhatt" },
          { id: "B", text: "Medha Patkar" },
          { id: "C", text: "Sunita Narain" },
          { id: "D", text: "Maneka Gandhi" }
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The Narmada Bachao Andolan (NBA) was founded in 1985 to oppose the massive displacement of tribal villagers by the Sardar Sarovar Dam.",
          "Step 2: Medha Patkar, along with social activist Baba Amte, led indefinite fasts, satyagrahas, and legal petitions demanding justice and rehabilitation.",
          "Conclusion: Option B is correct."
        ],
        cuetTip: "Narmada Bachao Andolan = Medha Patkar & Baba Amte. Chipko Movement = Sunderlal Bahuguna & Gaura Devi."
      }
    ],
    howCuetAsksThis: [
      {
        type: "EIA Stage Definition",
        frequency: "High (2 questions)",
        typicalStem: "In which stage of the EIA process is the 'Terms of Reference' (ToR) formulated to delineate the environmental baseline studies?",
        strategy: "Scoping stage."
      },
      {
        type: "Assertion-Reason",
        frequency: "Medium (2 questions)",
        typicalStem: "Assertion (A): Large dam reservoirs constructed in seismic fault zones can trigger earthquakes through Reservoir-Induced Seismicity (RIS).\nReason (R): The immense hydrostatic weight of millions of tons of impounded water, coupled with lubricating water seepage into subterranean fault lines, alters pore pressure and triggers fault slips.",
        strategy: "Both are true, and R correctly explains the geotechnical mechanics of RIS."
      }
    ],
    commonTraps: [
      {
        misconception: "Believing Category A projects undergo the Screening stage.",
        whyWrong: "Under EIA 2006, all Category A projects automatically require a full EIA study and go directly to the Scoping stage, completely bypassing Screening.",
        correctUnderstanding: "Screening applies only to Category B projects (to bifurcate into B1 and B2).",
        trapOptionExample: "Stating Category A projects are screened to see if they need EIA."
      },
      {
        misconception: "Confusing Chipko Movement with Narmada Bachao Andolan.",
        whyWrong: "Chipko (1974) was about forest logging in Uttarakhand; Narmada Bachao Andolan (1985) was against mega-dam submergence and displacement in the Narmada River basin.",
        correctUnderstanding: "Chipko = Trees/Forests; NBA = Mega Dam displacement.",
        trapOptionExample: "Stating Medha Patkar led the Chipko movement."
      }
    ],
    mnemonicsAndShortcuts: [
      {
        title: "EIA 4 Stages Sequence",
        mnemonic: "S-S-P-A",
        shortcut: "Screening -> Scoping -> Public hearing -> Appraisal.",
        whenToApply: "EIA regulatory sequence questions.",
        explanation: "Simple 4-letter acronym for EIA steps."
      }
    ],
    quickRevisionCard: {
      title: "Development, Dams & EIA — Flash Card",
      bulletPoints: [
        "Urban Heat Island (UHI): Higher city temperatures due to concrete thermal mass and lack of tree canopy.",
        "Mega Dams: Benefits (hydro power, irrigation); Hazards (RIS, forest loss, tribal displacement, siltation).",
        "Narmada Bachao Andolan (1985): Medha Patkar & Baba Amte against Sardar Sarovar Dam displacement.",
        "Tehri Dam Movement: Sundarlal Bahuguna opposing high-dam seismic risk in Uttarakhand.",
        "EIA Legal Mandate: Governed under Environment (Protection) Act 1986 and EIA Notification 2006.",
        "Category A Projects: Cleared at central level by MoEFCC and Expert Appraisal Committee (EAC).",
        "Category B Projects: Handled at state level by SEIAA (B1 requires EIA; B2 is exempt).",
        "4 EIA Stages: (1) Screening, (2) Scoping (creates ToR), (3) Public Consultation, (4) Appraisal.",
        "Public Hearing: Democratic hearing conducted in project vicinity by State Pollution Control Board.",
        "Miyawaki Urban Forests: Dense native afforestation method to counter urban heat."
      ]
    },
    practiceQuestions: [
      {
        id: "evs_u4_q1",
        question: "In the 4-stage EIA process under the EIA Notification 2006, during which stage are the 'Terms of Reference' (ToR) addressing all specific environmental concerns formally determined?",
        type: "standard",
        questionType: "EIA Stage Mechanism",
        difficulty: "easy",
        options: [
          { id: "A", text: "Screening" },
          { id: "B", text: "Scoping" },
          { id: "C", text: "Appraisal" },
          { id: "D", text: "Post-monitoring" }
        ],
        correctOption: "B",
        explanation: "Scoping is the second stage of EIA, where the Expert Appraisal Committee determines detailed and comprehensive Terms of Reference (ToR) addressing all environmental aspects of the project."
      },
      {
        id: "evs_u4_q2",
        question: "What phenomenon describes metropolitan urban centers experiencing significantly elevated ambient temperatures compared to surrounding rural outskirts due to concrete surfaces and lack of vegetation?",
        type: "standard",
        questionType: "Urban Climatology",
        difficulty: "easy",
        options: [
          { id: "A", text: "Thermal Inversion" },
          { id: "B", text: "Urban Heat Island (UHI) Effect" },
          { id: "C", text: "Greenhouse effect" },
          { id: "D", text: "Acid Rain" }
        ],
        correctOption: "B",
        explanation: "The Urban Heat Island (UHI) effect occurs when concrete, asphalt, and urban infrastructure absorb and re-emit solar heat more than natural rural landscapes."
      },
      {
        id: "evs_u4_q3",
        question: "Under the EIA Notification 2006, which category of developmental projects is appraised directly at the Central level by the Ministry of Environment, Forest and Climate Change (MoEFCC)?",
        type: "standard",
        questionType: "Regulatory Authority",
        difficulty: "medium",
        options: [
          { id: "A", text: "Category A" },
          { id: "B", text: "Category B1" },
          { id: "C", text: "Category B2" },
          { id: "D", text: "Category C" }
        ],
        correctOption: "A",
        explanation: "Category A projects possess high potential environmental impacts and require mandatory Environmental Clearance (EC) from the Central Government (MoEFCC)."
      },
      {
        id: "evs_u4_q4",
        question: "Which of the following environmental and geological risks is specifically associated with the impoundment of massive water reservoirs behind mega dams?",
        type: "standard",
        questionType: "Mega Dam Hazard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Ozone layer thinning" },
          { id: "B", text: "Reservoir-Induced Seismicity (RIS)" },
          { id: "C", text: "Desertification of reservoir floor" },
          { id: "D", text: "Acid drainage from air" }
        ],
        correctOption: "B",
        explanation: "Reservoir-Induced Seismicity (RIS) refers to earthquakes triggered by the immense hydrostatic pressure of massive impounded water bodies altering tectonic fault stress."
      },
      {
        id: "evs_u4_q5",
        question: "Who was the legendary Gandhian and Chipko leader who staged extended fasts against the construction of the Tehri Dam on the Bhagirathi River in Uttarakhand?",
        type: "standard",
        questionType: "Environmental Movement Leader",
        difficulty: "easy",
        options: [
          { id: "A", text: "Sundarlal Bahuguna" },
          { id: "B", text: "Medha Patkar" },
          { id: "C", text: "Rajendra Singh" },
          { id: "D", text: "Anil Agarwal" }
        ],
        correctOption: "A",
        explanation: "Sundarlal Bahuguna opposed the high rock-fill Tehri Dam, pointing to high seismicity, threat to ancient sacred Himalayan geography, and submergence of historic Tehri town."
      },
      {
        id: "evs_u4_q6",
        question: "Which primary greenhouse gas is generated and released into the atmosphere by the anaerobic decomposition of submerged organic forest vegetation under mega dam reservoirs?",
        type: "standard",
        questionType: "Biochemical Emission",
        difficulty: "medium",
        options: [
          { id: "A", text: "Sulfur Hexafluoride (SF₆)" },
          { id: "B", text: "Methane (CH₄)" },
          { id: "C", text: "Chlorofluorocarbon-11" },
          { id: "D", text: "Ozone" }
        ],
        correctOption: "B",
        explanation: "When vast forests are submerged, rotting biomass at the oxygen-depleted bottom of the reservoir undergoes methanogenesis by anaerobic bacteria, releasing Methane (CH₄)."
      },
      {
        id: "evs_u4_q7",
        question: "Under which umbrella environmental legislation is the statutory process of Environmental Impact Assessment (EIA) notified and enforced in India?",
        type: "standard",
        questionType: "Legal Framework",
        difficulty: "easy",
        options: [
          { id: "A", text: "Water (Prevention and Control of Pollution) Act 1974" },
          { id: "B", text: "Air (Prevention and Control of Pollution) Act 1981" },
          { id: "C", text: "Environment (Protection) Act, 1986" },
          { id: "D", text: "Biological Diversity Act 2002" }
        ],
        correctOption: "C",
        explanation: "EIA notifications (1994, 2006) are issued under Section 3 of the overarching Environment (Protection) Act, 1986."
      },
      {
        id: "evs_u4_q8",
        question: "Assertion (A): Public Hearing is an optional cosmetic stage in the EIA process that project proponents can bypass without legal consequences.\nReason (R): Under the EIA Notification 2006, Public Consultation is a mandatory democratic requirement conducted by the State Pollution Control Board to record local community objections.",
        type: "assertion-reason",
        questionType: "Assertion-Reason",
        difficulty: "easy",
        options: [
          { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is false, but (R) is true." },
          { id: "D", text: "(A) is true, but (R) is false." }
        ],
        correctOption: "C",
        explanation: "Assertion (A) is false because Public Hearing is a mandatory statutory component. Bypassing it renders environmental clearance invalid. Reason (R) is true."
      },
      {
        id: "evs_u4_q9",
        question: "Assertion (A): Category A projects under the EIA Notification 2006 skip the initial Screening stage.\nReason (R): Category A projects possess significant potential environmental impacts by default, making full EIA studies automatically mandatory without preliminary screening.",
        type: "assertion-reason",
        questionType: "Assertion-Reason",
        difficulty: "medium",
        options: [
          { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true, but (R) is false." },
          { id: "D", text: "(A) is false, but (R) is true." }
        ],
        correctOption: "A",
        explanation: "Both statements are true. Screening exists only to determine if Category B projects need an EIA (bifurcating into B1 and B2); Category A projects go directly to Scoping."
      },
      {
        id: "evs_u4_q10",
        question: "Match the Environmental Movements in List I with their Associated Feature in List II:\nList I:\n(P) Narmada Bachao Andolan\n(Q) Tehri Dam Protest\n(R) Chipko Movement\n(S) Silent Valley Movement\n\nList II:\n(1) Protecting pristine tropical evergreen forest from a hydroelectric project in Kerala\n(2) Gaura Devi and villagers hugging trees to prevent commercial felling in Uttarakhand\n(3) Medha Patkar opposing displacement from Sardar Sarovar Dam\n(4) Sundarlal Bahuguna opposing high-dam seismic risk on Bhagirathi river",
        type: "match-the-following",
        questionType: "Match The Following",
        difficulty: "medium",
        options: [
          { id: "A", text: "P-3, Q-4, R-2, S-1" },
          { id: "B", text: "P-4, Q-3, R-2, S-1" },
          { id: "C", text: "P-3, Q-2, R-4, S-1" },
          { id: "D", text: "P-1, Q-4, R-2, S-3" }
        ],
        correctOption: "A",
        explanation: "NBA = Sardar Sarovar displacement (P-3); Tehri = Bhagirathi high dam (Q-4); Chipko = Tree hugging (R-2); Silent Valley = Kerala tropical rainforest protection (S-1). Matches A."
      }
    ]
  },
  {
    id: "environmental_studies_u5_t1",
    slug: "green-revolution-impacts-organic-farming-integrated-pest-management-water-conservation",
    subject: "environmental_studies",
    subjectName: "Environmental Studies",
    subjectCode: "310",
    unitNumber: 5,
    unitTitle: "Sustainable Agriculture in India",
    topicTitle: "Green Revolution Impacts, Organic Farming, Integrated Pest Management, Water Conservation",
    ncertReference: {
      class: "12",
      book: "Sustainable Agriculture and Soil Ecology NCERT Class XII",
      chapterNumber: 5,
      chapterName: "Sustainable Agriculture, Agroecology and Water Conservation",
      sections: ["5.1 The Green Revolution: High Yielding Varieties (HYVs) & Ecological Aftermath", "5.2 Soil Salinization, Waterlogging & Groundwater Depletion", "5.3 Organic Farming: Biofertilizers, Biopesticides & Sikkim Model", "5.4 Integrated Pest Management (IPM) & Micro-Irrigation (Drip/Sprinkler)"]
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Core Indian agroecology unit. Biofertilizers (Rhizobium, Azospirillum, Azolla), soil salinization mechanisms, IPM pyramid, and drip irrigation efficiency.",
      totalPyqsInRepo: 0,
      weightagePercentage: 14
    },
    summary30Seconds: [
      "Green Revolution (1960s): Dr. M.S. Swaminathan (India) & Norman Borlaug (Global); introduced HYV seeds (semi-dwarf wheat/rice) achieving food self-sufficiency, but caused soil salinization, water table collapse, and chemical toxicity.",
      "Ecological Crises: Excessive canal flood irrigation causes Waterlogging and capillary Soil Salinization; tube well over-extraction creates dark zones.",
      "Organic Farming: Avoids synthetic agrochemicals; uses biofertilizers (Rhizobium, Azotobacter, Mycorrhiza/VAM, Blue-Green Algae/Azolla) and vermicompost; Sikkim became world's 100% organic state (2016).",
      "IPM & Water: Integrated Pest Management (cultural, biological, mechanical, chemical as last resort); Micro-irrigation (Drip irrigation delivers water directly to root zone with >90% water efficiency; 'Per Drop More Crop')."
    ],
    coreConcepts: [
      {
        title: "1. The Green Revolution: Achievements and Long-Term Ecological Fallout",
        content: "The Green Revolution was launched in the mid-1960s to overcome severe food grain deficits:\n- Key Drivers: Semi-dwarf High-Yielding Variety (HYV) seeds (Kalyan Sona, Sonalika wheat developed from Norman Borlaug's Mexican dwarf lines; IR-8 rice), synthetic chemical fertilizers (NPK), chemical pesticides, and assured canal/tubewell irrigation.\n- Historic Achievement: Transformed India from 'ship-to-mouth' food dependence to a grain exporter (P.L. 480 wheat import cessation).\n- Ecological Aftermath in Intensive Belts (Punjab, Haryana, Western UP):\n1. Groundwater Depletion: Excessive reliance on free electricity for submersible tube wells caused groundwater tables to plunge dramatically into 'Over-exploited/Dark zones'.\n2. Soil Salinization and Waterlogging: Injudicious canal flood irrigation in arid/semi-arid regions without adequate drainage causes water tables to rise near the surface. As capillary water evaporates under intense sun, dissolved mineral salts (NaCl, Na₂SO₄) are deposited on the topsoil, forming an infertile white saline crust (Kallar / Reh).\n3. Micronutrient Exhaustion: Decades of unbalanced NPK use without organic manure depleted vital soil micronutrients (Zinc, Iron, Boron, Copper) and killed beneficial soil earthworms.",
        ncertPointers: [
          "Dr. M.S. Swaminathan is recognized as the 'Father of the Green Revolution in India'; Dr. Norman Borlaug was awarded the Nobel Peace Prize in 1970 for breeding semi-dwarf wheat.",
          "Punjab's Malwa region experienced severe health crises (the 'Cancer Train' from Bathinda to Bikaner) linked to high pesticide contamination in groundwater."
        ]
      },
      {
        title: "2. Organic Farming and Biofertilizers",
        content: "Organic farming is an agroecological production system that eliminates synthetic fertilizers, chemical pesticides, genetically modified seeds, and growth regulators, relying instead on crop rotations, crop residues, animal manures, and biological pest control.\n- Biofertilizers: Living microbial inoculants that enhance nutrient availability by fixing atmospheric nitrogen or solubilizing phosphorus:\n- Nitrogen Fixers: Symbiotic (Rhizobium in leguminous root nodules); Free-living (Azotobacter in aerobic soils, Clostridium in anaerobic soils); Associative (Azospirillum in grasses/cereals).\n- Aquatic Biofertilizer: Azolla (aquatic water fern) hosting symbiotic cyanobacteria Anabaena azollae, fixing nitrogen in wet paddy fields.\n- Phosphate Solubilizers: Bacillus polymyxa and fungal Mycorrhiza (VAM - Vesicular Arbuscular Mycorrhiza), which dramatically expands root surface area to absorb phosphorus from soil.\n- National Model: Sikkim was declared the world's first 100% certified organic state by the UN FAO in 2016, winning the Future Policy Gold Award.",
        ncertPointers: [
          "Vermicomposting uses epigeic earthworms (Eisenia fetida) to convert agricultural and cow dung wastes into nutrient-rich vermicast.",
          "Paramparagat Krishi Vikas Yojana (PKVY) promotes cluster-based organic farming with Participatory Guarantee System (PGS) certification."
        ]
      },
      {
        title: "3. Integrated Pest Management (IPM) and Water Conservation",
        content: "Sustainable crop protection and water stewardship:\n- Integrated Pest Management (IPM): An ecological approach to pest control that combines complementary methods to suppress pest populations below the Economic Injury Level (EIL), reserving synthetic chemical pesticides only as an absolute last resort:\n1. Cultural Control: Crop rotation, mixed cropping, trap cropping (e.g. planting Marigold around tomatoes to trap fruit borers).\n2. Mechanical / Physical Control: Pheromone traps, light traps, yellow sticky traps, manual handpicking of caterpillars.\n3. Biological Control: Natural predators and parasitoids (Trichogramma wasps parasitic on moth eggs, ladybird beetles devouring aphids), and bio-pesticides (Bacillus thuringiensis / Bt, Neem oil / Azadirachtin, Trichoderma viride fungus against soil-borne wilt).\n4. Chemical Control: Selective, low-toxicity chemical sprays used only when pest threshold crosses EIL.\n\nWater Conservation in Agriculture:\n- Flood Irrigation: Traditional, highly inefficient (water loss up to 60% through evaporation and percolation).\n- Drip (Trickle) Irrigation: Emits water drop-by-drop directly into the plant root zone via perforated dripper emitters. Achieves 90-95% water efficiency, eliminates weed growth between rows, and enables fertigation (injecting liquid fertilizers directly into irrigation lines).\n- Sprinkler Irrigation: Simulates rainfall, ideal for undulating uneven terrains with sandy soil.\n- Pradhan Mantri Krishi Sinchayee Yojana (PMKSY): National flagship scheme promoting 'Per Drop More Crop'.",
        ncertPointers: [
          "Neem (Azadirachta indica) contains the active insecticidal compound 'Azadirachtin', which disrupts insect feeding and hormone metamorphosis.",
          "Economic Threshold Level (ETL) is the pest density at which control measures must be initiated to prevent reaching the Economic Injury Level (EIL)."
        ]
      }
    ],
    keyFormulasAndTables: [
      {
        name: "Biofertilizer Taxonomy & Target Crops",
        formula: "Rhizobium (Legumes) | Azolla-Anabaena (Paddy/Rice) | Azotobacter (Wheat/Maize) | VAM Mycorrhiza (Phosphorus)",
        symbols: "Microbial bio-inoculants",
        siUnits: "Agro-biological agents",
        applicationCondition: "Biofertilizer matching in CUET",
        notes: "Azolla fern doubles rice yield while providing organic green manure."
      },
      {
        name: "IPM Hierarchy of Controls",
        formula: "Cultural (Base) -> Mechanical/Physical -> Biological (Predators/Bt) -> Chemical (Top/Last Resort)",
        symbols: "IPM Pyramid",
        siUnits: "Ecological interventions",
        applicationCondition: "Pest management sequencing questions",
        notes: "Chemical pesticide is applied strictly when pest density exceeds the Economic Threshold Level."
      },
      {
        name: "Irrigation Water Use Efficiency",
        formula: "Drip Irrigation: 90-95% Efficiency | Sprinkler: 70-80% | Traditional Surface Flood: 35-45%",
        symbols: "Water Conservation Ratios",
        siUnits: "Percentage efficiency",
        applicationCondition: "Agricultural water conservation questions",
        notes: "Drip irrigation reduces soil salinization risk by eliminating surface ponding."
      }
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%">
  <defs>
    <linearGradient id="evs5Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#091b15"/>
      <stop offset="100%" stop-color="#143b22"/>
    </linearGradient>
    <linearGradient id="orgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <linearGradient id="ipmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" rx="12" fill="url(#evs5Grad)"/>
  <text x="400" y="32" fill="#86efac" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">CUET Sustainable Agriculture: Organic Farming, IPM &amp; Micro-Irrigation</text>
  
  <!-- Left Box: Green Rev Fallout & Organic Farming -->
  <g transform="translate(30, 60)">
    <rect width="360" height="320" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="180" y="25" fill="#a7f3d0" font-size="14" font-weight="bold" text-anchor="middle">Green Rev Fallout &amp; Biofertilizers</text>
    
    <rect x="15" y="45" width="330" height="75" rx="6" fill="#831843" opacity="0.25" stroke="#ec4899"/>
    <text x="25" y="65" fill="#f472b6" font-size="11" font-weight="bold">Green Revolution Ecological Costs:</text>
    <text x="25" y="82" fill="#cbd5e1" font-size="10">• Excessive flood irrigation → Waterlogging &amp; Soil Salinization</text>
    <text x="25" y="97" fill="#cbd5e1" font-size="10">• Ground water dark zones (over-extracted tube wells)</text>
    <text x="25" y="110" fill="#fbcfe8" font-size="9">Pioneered by Dr. M.S. Swaminathan (India) &amp; Norman Borlaug</text>
    
    <rect x="15" y="130" width="330" height="95" rx="6" fill="#065f46" opacity="0.25" stroke="#10b981"/>
    <text x="25" y="150" fill="#34d399" font-size="11" font-weight="bold">Key Biofertilizers:</text>
    <text x="25" y="168" fill="#cbd5e1" font-size="10">• Rhizobium: Symbiotic N₂ fixation in leguminous root nodules</text>
    <text x="25" y="183" fill="#cbd5e1" font-size="10">• Azolla-Anabaena: Aquatic fern for nitrogen in wet paddy</text>
    <text x="25" y="198" fill="#cbd5e1" font-size="10">• Azotobacter: Free-living N₂ fixer in wheat &amp; maize</text>
    <text x="25" y="213" fill="#cbd5e1" font-size="10">• Mycorrhiza (VAM): Fungal hyphae absorb soil Phosphorus</text>
    
    <rect x="15" y="235" width="330" height="65" rx="6" fill="#0284c7" opacity="0.2" stroke="#0284c7"/>
    <text x="25" y="253" fill="#38bdf8" font-size="11" font-weight="bold">100% Organic State Model:</text>
    <text x="25" y="270" fill="#cbd5e1" font-size="10">Sikkim declared world's first 100% organic state (2016)</text>
    <text x="25" y="285" fill="#bae6fd" font-size="9">Won UN FAO Future Policy Gold Award (zero chemical farming)</text>
  </g>

  <!-- Right Box: IPM Hierarchy & Water Conservation -->
  <g transform="translate(420, 60)">
    <rect width="350" height="320" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <text x="175" y="25" fill="#fcd34d" font-size="14" font-weight="bold" text-anchor="middle">Integrated Pest Management (IPM) &amp; Drip</text>
    
    <!-- IPM Pyramid -->
    <rect x="15" y="45" width="320" height="135" rx="6" fill="#78350f" opacity="0.2" stroke="#f59e0b"/>
    <text x="25" y="65" fill="#fde68a" font-size="11" font-weight="bold">IPM Tiered Strategy (Below Injury Level):</text>
    <text x="25" y="83" fill="#cbd5e1" font-size="10">1. Cultural: Crop rotation, trap crops (Marigold in tomato)</text>
    <text x="25" y="98" fill="#cbd5e1" font-size="10">2. Mechanical: Pheromone traps, yellow sticky boards</text>
    <text x="25" y="113" fill="#cbd5e1" font-size="10">3. Biological: Ladybird beetles, Trichogramma, Bt, Neem</text>
    <text x="25" y="128" fill="#fca5a5" font-size="10">4. Chemical: Selective pesticide strictly as LAST RESORT</text>
    <text x="35" y="142" fill="#fed7aa" font-size="9">Azadirachtin (Neem) disrupts insect hormonal metamorphosis</text>
    <text x="35" y="156" fill="#fed7aa" font-size="9">Triggered only when pest crosses Economic Threshold (ETL)</text>
    
    <!-- Drip Irrigation -->
    <rect x="15" y="190" width="320" height="110" rx="6" fill="#0369a1" opacity="0.2" stroke="#0284c7"/>
    <text x="25" y="210" fill="#38bdf8" font-size="11" font-weight="bold">Micro-Irrigation (Per Drop More Crop):</text>
    <text x="25" y="228" fill="#cbd5e1" font-size="10">• Drip Irrigation: 90-95% Water Efficiency</text>
    <text x="35" y="243" fill="#bae6fd" font-size="9">Water delivered drop-by-drop to roots; zero weed run</text>
    <text x="25" y="260" fill="#cbd5e1" font-size="10">• Fertigation: Liquid nutrients injected through drip pipes</text>
    <text x="25" y="275" fill="#cbd5e1" font-size="10">• Sprinklers: 75% efficiency on undulating sandy soil</text>
  </g>

  <text x="400" y="405" fill="#64748b" font-size="11" text-anchor="middle">NCERT Class 12 Environmental Studies • Agroecology, Organic Certification &amp; Water Management</text>
</svg>`,
    workedExamples: [
      {
        questionNumber: 1,
        question: "Which Indian state achieved global acclaim by becoming the world's first fully certified 100% organic state in 2016, winning the UN FAO Future Policy Gold Award?",
        options: [
          { id: "A", text: "Kerala" },
          { id: "B", text: "Punjab" },
          { id: "C", text: "Sikkim" },
          { id: "D", text: "Himachal Pradesh" }
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: In 2003, the Government of Sikkim formally resolved to transition completely to organic agriculture.",
          "Step 2: Over a 13-year period, synthetic fertilizers and chemical pesticides were banned and phased out entirely.",
          "Step 3: In January 2016, Sikkim was officially declared India's and the world's first 100% organic state.",
          "Conclusion: Option C (Sikkim) is correct."
        ],
        cuetTip: "World's first 100% organic state = Sikkim (2016). Landmark CUET question!"
      },
      {
        questionNumber: 2,
        question: "Which biofertilizer consists of an aquatic water fern living in symbiotic association with the nitrogen-fixing cyanobacterium Anabaena, widely cultivated in wet paddy rice fields?",
        options: [
          { id: "A", text: "Rhizobium" },
          { id: "B", text: "Azolla" },
          { id: "C", text: "Mycorrhiza" },
          { id: "D", text: "Trichoderma" }
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Azolla is a free-floating small aquatic freshwater fern.",
          "Step 2: Inside its dorsal leaf lobes, it hosts colonies of the blue-green alga Anabaena azollae.",
          "Step 3: Anabaena fixes atmospheric nitrogen, providing significant organic nitrogen and green manure to flooded rice paddies.",
          "Conclusion: Option B (Azolla) is correct."
        ],
        cuetTip: "Paddy/Rice fields biofertilizer = Azolla-Anabaena. Legumes biofertilizer = Rhizobium."
      }
    ],
    howCuetAsksThis: [
      {
        type: "Biofertilizer-Crop Association",
        frequency: "High (3 questions)",
        typicalStem: "Match the Biofertilizer in List I with its Associated Host Plant in List II (Rhizobium, Azolla, Azotobacter, VAM Mycorrhiza).",
        strategy: "Rhizobium = Pulses/Legumes; Azolla = Wet Paddy/Rice; Azotobacter = Wheat/Cereals; VAM = Phosphorus uptake in forest/horticulture crops."
      },
      {
        type: "Assertion-Reason",
        frequency: "Medium (2 questions)",
        typicalStem: "Assertion (A): Drip irrigation significantly reduces the risk of secondary soil salinization in arid agricultural lands.\nReason (R): Drip irrigation delivers water directly to the plant root zone in precise small quantities, preventing high water table rise and capillary evaporation of dissolved salts.",
        strategy: "Both are true, and R correctly explains how drip irrigation prevents soil salinization."
      }
    ],
    commonTraps: [
      {
        misconception: "Believing IPM aims to eradicate 100% of all insects in a crop field.",
        whyWrong: "IPM recognizes that total insect eradication is ecologically disastrous and impossible. Its goal is to manage pest populations BELOW the Economic Injury Level (EIL) while preserving beneficial predators.",
        correctUnderstanding: "IPM manages pests below damage thresholds, not total eradication.",
        trapOptionExample: "Stating IPM uses heavy aerial chemical sprays to eliminate all insects."
      },
      {
        misconception: "Confusing Soil Salinization with Acidification.",
        whyWrong: "Canal flood irrigation in hot arid regions causes dissolved mineral salts to rise via capillary action, forming an alkaline white saline crust (Kallar), not acidity.",
        correctUnderstanding: "Capillary evaporation causes salinization/alkalization.",
        trapOptionExample: "Claiming excessive canal water makes soil strongly acidic."
      }
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Biofertilizers by Crop",
        mnemonic: "R-L, A-P",
        shortcut: "Rhizobium for Legumes | Azolla for Paddy.",
        whenToApply: "Biofertilizer matching questions.",
        explanation: "Two most tested biofertilizer relationships in CUET."
      }
    ],
    quickRevisionCard: {
      title: "Sustainable Agriculture & IPM — Flash Card",
      bulletPoints: [
        "Green Revolution (1960s): HYV seeds (Swaminathan, Borlaug) + NPK + tube wells; food self-sufficiency.",
        "Fallout: Groundwater collapse (dark zones), Waterlogging, Soil Salinization (Kallar/Reh crust).",
        "Organic Farming: Zero synthetic chemicals; crop rotation, vermicompost, biofertilizers.",
        "Biofertilizers: Rhizobium (legumes), Azolla-Anabaena (paddy), Azotobacter (free-living), VAM (Phosphorus).",
        "Sikkim: World's first 100% organic state (2016, UN FAO Future Policy Gold Award).",
        "IPM: Keeps pests below Economic Injury Level (EIL); Cultural -> Mechanical -> Biological -> Chemical (last).",
        "Biological Pest Control: Ladybird beetles (aphids), Trichogramma wasps, Bacillus thuringiensis (Bt), Neem oil.",
        "Azadirachtin: Active compound in Neem disrupting insect growth and feeding.",
        "Drip Irrigation: 90-95% efficiency; delivers water to root zone; enables fertigation.",
        "PMKSY: Pradhan Mantri Krishi Sinchayee Yojana ('Per Drop More Crop')."
      ]
    },
    practiceQuestions: [
      {
        id: "evs_u5_q1",
        question: "What primary active insecticidal biochemical compound present in the seed kernels and leaves of the Neem tree (Azadirachta indica) disrupts insect feeding and hormone metamorphosis?",
        type: "standard",
        questionType: "Biopesticide Chemistry",
        difficulty: "easy",
        options: [
          { id: "A", text: "Reserpine" },
          { id: "B", text: "Azadirachtin" },
          { id: "C", text: "Nicotine" },
          { id: "D", text: "Pyrethrum" }
        ],
        correctOption: "B",
        explanation: "Azadirachtin is the principal limonoid compound extracted from neem that acts as a potent antifeedant, repellent, and insect growth disruptor."
      },
      {
        id: "evs_u5_q2",
        question: "Why does prolonged canal flood irrigation in arid and semi-arid regions of Punjab and Haryana lead to severe Soil Salinization?",
        type: "standard",
        questionType: "Geochemical Mechanism",
        difficulty: "medium",
        options: [
          { id: "A", text: "Canal water dissolves bedrock granite" },
          { id: "B", text: "Excessive water elevates groundwater tables, and capillary evaporation under intense sunlight deposits dissolved salts on the topsoil" },
          { id: "C", text: "Chemical pesticides convert soil into sea salt" },
          { id: "D", text: "Earthworms secrete sodium chloride" }
        ],
        correctOption: "B",
        explanation: "Waterlogging brings subsoil saline water near the surface through capillary action. When water evaporates under hot sunshine, dissolved salts (NaCl, Na₂SO₄) precipitate as an infertile white crust (Kallar)."
      },
      {
        id: "evs_u5_q3",
        question: "Which of the following fungal biofertilizers forms a symbiotic association with plant roots (VAM), dramatically enhancing the absorption of soil Phosphorus?",
        type: "standard",
        questionType: "Biofertilizer Function",
        difficulty: "easy",
        options: [
          { id: "A", text: "Mycorrhiza" },
          { id: "B", text: "Rhizobium" },
          { id: "C", text: "Azospirillum" },
          { id: "D", text: "Nostoc" }
        ],
        correctOption: "A",
        explanation: "Mycorrhiza (specifically Vesicular-Arbuscular Mycorrhiza / VAM) penetrates plant root cortical cells, forming extensive fungal networks that solubilize and transport phosphorus into the plant."
      },
      {
        id: "evs_u5_q4",
        question: "In Integrated Pest Management (IPM), what is the defined economic threshold level (ETL) for initiating chemical pesticide intervention?",
        type: "standard",
        questionType: "IPM Metric",
        difficulty: "medium",
        options: [
          { id: "A", text: "The moment a single insect egg is observed" },
          { id: "B", text: "The pest population density at which control action must be taken to prevent pest numbers from reaching the Economic Injury Level (EIL)" },
          { id: "C", text: "After the entire crop has been destroyed" },
          { id: "D", text: "Only during monsoon season" }
        ],
        correctOption: "B",
        explanation: "The Economic Threshold Level (ETL) is the actionable pest density trigger that warns farmers to apply selective control measures to prevent pest populations from reaching the Economic Injury Level (EIL) where economic losses exceed treatment costs."
      },
      {
        id: "evs_u5_q5",
        question: "What is the specialized farming technique of injecting water-soluble fertilizers directly into a pressurized Drip Irrigation network called?",
        type: "standard",
        questionType: "Irrigation Technology",
        difficulty: "easy",
        options: [
          { id: "A", text: "Hydroponics" },
          { id: "B", text: "Fertigation" },
          { id: "C", text: "Sublimation" },
          { id: "D", text: "Aquaponics" }
        ],
        correctOption: "B",
        explanation: "Fertigation is the precise simultaneous application of liquid fertilizers and soil amendments through irrigation water via micro-drip emitters directly to plant root zones."
      },
      {
        id: "evs_u5_q6",
        question: "Which epigeic earthworm species is most extensively utilized in India for rapid, commercial Vermicomposting of cattle dung and agricultural residues?",
        type: "standard",
        questionType: "Organic Farming Biology",
        difficulty: "medium",
        options: [
          { id: "A", text: "Eisenia fetida (Red Wiggler)" },
          { id: "B", text: "Pheretima posthuma" },
          { id: "C", text: "Hirudinaria granulosa" },
          { id: "D", text: "Lumbricus terrestris" }
        ],
        correctOption: "A",
        explanation: "Eisenia fetida (commonly known as the Red Wiggler or manure worm) is the voracious surface-dwelling (epigeic) earthworm universally preferred for efficient vermicomposting."
      },
      {
        id: "evs_u5_q7",
        question: "Who is celebrated as the 'Father of the Green Revolution in India' for spearheading the introduction of semi-dwarf wheat genetics in the 1960s?",
        type: "standard",
        questionType: "Pioneer Direct",
        difficulty: "easy",
        options: [
          { id: "A", text: "Dr. Verghese Kurien" },
          { id: "B", text: "Dr. M.S. Swaminathan" },
          { id: "C", text: "Dr. Homi Bhabha" },
          { id: "D", text: "Sir C.V. Raman" }
        ],
        correctOption: "B",
        explanation: "Dr. M.S. Swaminathan collaborated with Nobel laureate Dr. Norman Borlaug to introduce high-yielding Mexican dwarf wheat varieties to India, pioneering the Green Revolution."
      },
      {
        id: "evs_u5_q8",
        question: "Assertion (A): Micro-drip irrigation systems achieve significantly higher water-use efficiency (over 90%) than conventional surface flood irrigation.\nReason (R): Drip systems deliver water slowly and directly to the plant root zone, virtually eliminating evaporation, surface runoff, and deep percolation losses.",
        type: "assertion-reason",
        questionType: "Assertion-Reason",
        difficulty: "easy",
        options: [
          { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true, but (R) is false." },
          { id: "D", text: "(A) is false, but (R) is true." }
        ],
        correctOption: "A",
        explanation: "Both statements are true. Drip irrigation prevents water from wetting non-target inter-row spaces, reducing water consumption by 50-70% while improving crop yields."
      },
      {
        id: "evs_u5_q9",
        question: "Assertion (A): Integrated Pest Management (IPM) advocates the complete, total eradication of all insect species present in an agricultural ecosystem.\nReason (R): Total insect eradication disrupts natural food chains and eliminates beneficial insect predators like ladybird beetles, causing pest resurgence.",
        type: "assertion-reason",
        questionType: "Assertion-Reason",
        difficulty: "medium",
        options: [
          { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is false, but (R) is true." },
          { id: "D", text: "(A) is true, but (R) is false." }
        ],
        correctOption: "C",
        explanation: "Assertion (A) is false because IPM aims to suppress pests below the economic damage threshold, NOT total eradication. Reason (R) is true."
      },
      {
        id: "evs_u5_q10",
        question: "Match the Agricultural Biofertilizers in List I with their Biological Mechanism in List II:\nList I:\n(P) Rhizobium\n(Q) Azolla-Anabaena\n(R) VAM Mycorrhiza\n(S) Azotobacter\n\nList II:\n(1) Free-living non-symbiotic aerobic nitrogen fixation in cereal soils\n(2) Symbiotic nitrogen fixation in leguminous root nodules\n(3) Aquatic fern fixing nitrogen in flooded paddy fields\n(4) Symbiotic fungal hyphae absorbing soil phosphorus",
        type: "match-the-following",
        questionType: "Match The Following",
        difficulty: "medium",
        options: [
          { id: "A", text: "P-2, Q-3, R-4, S-1" },
          { id: "B", text: "P-1, Q-3, R-4, S-2" },
          { id: "C", text: "P-2, Q-4, R-3, S-1" },
          { id: "D", text: "P-3, Q-2, R-4, S-1" }
        ],
        correctOption: "A",
        explanation: "Rhizobium = Legume nodules (P-2); Azolla = Flooded paddy (Q-3); VAM Mycorrhiza = Phosphorus absorption (R-4); Azotobacter = Free-living nitrogen fixer (S-1). Matches A."
      }
    ]
  },
  {
    id: "environmental_studies_u6_t1",
    slug: "resource-valuation-carbon-credits-polluter-pays-principle-green-accounting",
    subject: "environmental_studies",
    subjectName: "Environmental Studies",
    subjectCode: "310",
    unitNumber: 6,
    unitTitle: "Environmental and Natural Resource Economics",
    topicTitle: "Resource Valuation, Carbon Credits, Polluter Pays Principle, Green Accounting",
    ncertReference: {
      class: "12",
      book: "Environmental Economics & Resource Management NCERT Class XII",
      chapterNumber: 6,
      chapterName: "Environmental Economics, Market Mechanisms and Green Accounting",
      sections: ["6.1 Environmental Valuation: Market, Hedonic Pricing & Contingent Valuation Method (CVM)", "6.2 Market-Based Instruments: Carbon Credits (1 CER = 1 MT CO2e) & Cap-and-Trade", "6.3 Environmental Law Principles: Polluter Pays & Precautionary Principle", "6.4 Green Accounting, Green GDP & System of Environmental-Economic Accounting (SEEA)"]
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Pivotal economic governance unit. Carbon credit definition (1 credit = 1 metric ton CO₂ equivalent), Polluter Pays Principle (Vellore Citizens case), Contingent Valuation (WTP/WTA), and Green GDP calculations.",
      totalPyqsInRepo: 0,
      weightagePercentage: 11
    },
    summary30Seconds: [
      "Environmental Valuation: Total Economic Value (TEV = Use Value + Non-Use/Existence Value); Contingent Valuation Method (CVM uses Willingness-to-Pay / WTP surveys).",
      "Carbon Credits: 1 Carbon Credit = 1 Metric Ton of CO₂ equivalent (1 MT CO₂e) reduced or sequestered; traded under Cap-and-Trade compliance and voluntary carbon markets.",
      "Legal Axioms: Polluter Pays Principle (the polluter must bear the full financial cost of environmental remediation and victim compensation); Precautionary Principle (lack of full scientific certainty cannot justify postponing cost-effective preventive action).",
      "Green Accounting: Adjusts traditional GDP by deducting the depreciation of natural capital and environmental degradation costs (Green GDP = Traditional GDP - Net Natural Capital Depletion)."
    ],
    coreConcepts: [
      {
        title: "1. Environmental Valuation and Total Economic Value (TEV)",
        content: "Environmental resources are public goods often lacking formal market prices, leading to market failure and overexploitation ('Tragedy of the Commons').\nTotal Economic Value (TEV) Framework:\n1. Use Value:\n- Direct Use Value: Consumptive extraction (timber, medicinal plants, fish) and non-consumptive uses (recreation, ecotourism).\n- Indirect Use Value: Ecosystem services (carbon sequestration, watershed protection, pollination, flood attenuation).\n- Option Value: Value of preserving a natural asset for potential future economic or scientific utility.\n2. Non-Use (Passive) Value:\n- Existence Value: Moral satisfaction derived from simply knowing that an endangered species or pristine wilderness exists (e.g. blue whales), even if one never sees it.\n- Bequest Value: Value placed on passing down pristine ecosystems intact to future generations.\n\nValuation Methodologies:\n- Hedonic Pricing Method (HPM): Estimates value based on property price differentials reflecting environmental amenities (clean air, scenic park views vs noisy highways).\n- Travel Cost Method (TCM): Estimates the recreational economic value of national parks based on expenditures visitors incur to travel there.\n- Contingent Valuation Method (CVM): Stated-preference survey technique that directly asks citizens their hypothetical 'Willingness to Pay' (WTP) to preserve a resource or 'Willingness to Accept' (WTA) compensation for its loss.",
        ncertPointers: [
          "Robert Costanza et al. (1997) famously estimated the annual global value of 17 ecosystem services at US $33 trillion (nearly double global GDP at the time).",
          "CVM is vulnerable to 'hypothetical bias' where surveyed individuals pledge higher values than they would actually pay."
        ]
      },
      {
        title: "2. Carbon Markets, Carbon Credits and Cap-and-Trade",
        content: "Market-based instruments incentivize carbon reduction by putting a financial price on greenhouse gas emissions:\n- Carbon Credit (Certified Emission Reduction - CER): A legally tradable certificate permitting the holder to emit greenhouse gases. Definition: Exactly 1 Carbon Credit represents the verified reduction, avoidance, or removal of ONE METRIC TON of Carbon Dioxide equivalent (1 MT CO₂e).\n- Cap-and-Trade (Emissions Trading Scheme - ETS): Government regulatory bodies set an aggregate maximum limit ('Cap') on total emissions across an industrial sector. The cap is partitioned into emission allowances distributed or auctioned to companies. Companies that reduce emissions below their quota can sell their excess surplus allowances to carbon-intensive companies struggling to meet their caps. Creates economic financial incentive to decarbonize.\n- Clean Development Mechanism (CDM): Established under Article 12 of the Kyoto Protocol, enabling developed nations (Annex I) to finance emission-reduction projects in developing nations (non-Annex I, like India) to earn CER credits toward their emission reduction targets.",
        ncertPointers: [
          "Carbon Offset: Compensating for emissions made in one sector by investing in a verified carbon reduction or reforestation project elsewhere.",
          "India launched its own domestic Carbon Credit Trading Scheme (CCTS) under the Energy Conservation (Amendment) Act 2022."
        ]
      },
      {
        title: "3. Environmental Legal Doctrines: Polluter Pays and Precautionary Principle",
        content: "Judicial doctrines embedded in Indian environmental jurisprudence:\n1. Polluter Pays Principle (PPP): The party responsible for producing pollution must bear the full financial costs of remediating the environmental damage caused, restoring degraded ecosystems, and compensating affected victims. Origin: OECD (1972). Embedded in Indian law by the Supreme Court of India in landmark judgments:\n- Indian Council for Enviro-Legal Action v. Union of India (Bichhri sludge case, 1996): Polluting chemical units held liable for complete soil and water aquifer remediation.\n- Vellore Citizens' Welfare Forum v. Union of India (1996): Supreme Court held Polluter Pays and Precautionary principles to be essential features of sustainable development and part of the environmental law of the land under Article 21 (Right to Life).\n2. Precautionary Principle: Where there are threats of serious or irreversible environmental damage, lack of full scientific certainty shall not be used as a reason for postponing cost-effective measures to prevent environmental degradation (Rio Principle 15).\n3. Public Trust Doctrine (M.C. Mehta v. Kamal Nath, 1997): Certain natural resources (rivers, forests, seashores, air) are held by the state in perpetual trusteeship for the public and cannot be converted into private commercial ownership.",
        ncertPointers: [
          "National Green Tribunal (NGT): Statutory judicial body established under NGT Act 2010 for expeditious disposal of environmental disputes (mandated to resolve cases within 6 months).",
          "Absolute Liability (M.C. Mehta v. Union of India - Oleum Gas Leak Case, 1987): Hazardous enterprises bear absolute, non-delegable liability without any exceptions (stricter than English strict liability in Rylands v. Fletcher)."
        ]
      },
      {
        title: "4. Green Accounting and Green GDP",
        content: "Conventional Gross Domestic Product (GDP) measures economic output but fails to account for the depreciation and depletion of natural capital:\n- Flaw in Traditional GDP: Clear-cutting a pristine virgin rainforest to sell timber increases traditional GDP, while completely ignoring the permanent loss of carbon storage, biodiversity, and soil protection.\n- Green Accounting (Environmental-Economic Accounting): An integrated accounting framework that incorporates environmental assets, resource depletion, and pollution abatement costs into national accounts.\n- System of Environmental-Economic Accounting (SEEA): The global international statistical standard developed by the United Nations Statistics Division (UNSD).\n- Green GDP Formula: `Green GDP = Traditional GDP - Net Depletion of Natural Capital - Environmental Degradation Costs`.\n- Natural Capital Accounting in India: Ministry of Statistics and Programme Implementation (MoSPI) implements the EnviStats-India reporting framework aligned with SEEA.",
        ncertPointers: [
          "Natural Capital: The world's stock of natural assets, including geology, soil, air, water, and all living organisms.",
          "Green GDP provides a genuine indicator of whether current economic growth is sustainable or merely mortgaging future well-being."
        ]
      }
    ],
    keyFormulasAndTables: [
      {
        name: "Carbon Credit Metric Standard",
        formula: "1 Carbon Credit = 1 Metric Ton of CO₂ equivalent (1 MT CO₂e)",
        symbols: "CER (Certified Emission Reduction)",
        siUnits: "1 Metric Ton CO2e",
        applicationCondition: "Carbon market calculations and emissions trading",
        notes: "Carbon credits can be earned through afforestation, renewable energy, and methane capture."
      },
      {
        name: "Green GDP Accounting Equation",
        formula: "Green GDP = Traditional GDP - Depletion of Natural Resources - Environmental Degradation Costs",
        symbols: "Adjusted National Income",
        siUnits: "Monetary currency (INR / USD)",
        applicationCondition: "Environmental economic accounting questions in CUET",
        notes: "Deducts natural capital depreciation, analogous to subtracting physical capital depreciation for NNP."
      },
      {
        name: "Landmark Indian Environmental Jurisprudence",
        formula: "Bichhri Case (1996: Polluter Pays) | Vellore Citizens (1996: Precautionary Principle) | Kamal Nath (1997: Public Trust)",
        symbols: "Supreme Court Precedents",
        siUnits: "Case laws",
        applicationCondition: "Judicial doctrines in Environmental Studies",
        notes: "Supreme Court anchored these doctrines under Article 21 (Right to a healthy environment)."
      }
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%">
  <defs>
    <linearGradient id="evs6Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#142838"/>
    </linearGradient>
    <linearGradient id="carbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <linearGradient id="lawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" rx="12" fill="url(#evs6Grad)"/>
  <text x="400" y="32" fill="#38bdf8" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">CUET Environmental Economics: Carbon Credits, Polluter Pays &amp; Green GDP</text>
  
  <!-- Left Box: Carbon Credits & Valuation -->
  <g transform="translate(30, 60)">
    <rect width="360" height="320" rx="8" fill="#1e293b" stroke="#059669" stroke-width="2"/>
    <text x="180" y="25" fill="#a7f3d0" font-size="14" font-weight="bold" text-anchor="middle">Carbon Credits &amp; Resource Valuation</text>
    
    <rect x="15" y="45" width="330" height="80" rx="6" fill="#065f46" opacity="0.3" stroke="#10b981"/>
    <text x="25" y="65" fill="#34d399" font-size="11" font-weight="bold">Carbon Credit Standard Definition:</text>
    <text x="25" y="83" fill="#cbd5e1" font-size="10">• 1 Carbon Credit = 1 Metric Ton CO₂ Equivalent (1 MT CO₂e)</text>
    <text x="25" y="98" fill="#cbd5e1" font-size="10">• Traded under Cap-and-Trade (ETS) &amp; Kyoto Protocol CDM</text>
    <text x="25" y="112" fill="#a7f3d0" font-size="9">Surplus allowances sold to carbon-heavy entities</text>
    
    <rect x="15" y="135" width="330" height="90" rx="6" fill="#1e3a8a" opacity="0.25" stroke="#3b82f6"/>
    <text x="25" y="153" fill="#60a5fa" font-size="11" font-weight="bold">Total Economic Value (TEV) Framework:</text>
    <text x="25" y="170" fill="#cbd5e1" font-size="10">• Direct Use: Timber, medicinal herbs, ecotourism</text>
    <text x="25" y="185" fill="#cbd5e1" font-size="10">• Indirect Use: Carbon sinks, watershed protection</text>
    <text x="25" y="200" fill="#cbd5e1" font-size="10">• Non-Use Value: Existence value &amp; Bequest value</text>
    <text x="25" y="213" fill="#bae6fd" font-size="9">CVM: Contingent Valuation via Willingness to Pay (WTP)</text>
    
    <rect x="15" y="235" width="330" height="65" rx="6" fill="#78350f" opacity="0.2" stroke="#f59e0b"/>
    <text x="25" y="253" fill="#fcd34d" font-size="11" font-weight="bold">Green GDP Formula:</text>
    <text x="25" y="270" fill="#cbd5e1" font-size="10">Green GDP = Traditional GDP - Natural Capital Depletion</text>
    <text x="25" y="285" fill="#cbd5e1" font-size="9">- Environmental Degradation Costs (UN SEEA Framework)</text>
  </g>

  <!-- Right Box: Environmental Law Doctrines -->
  <g transform="translate(420, 60)">
    <rect width="350" height="320" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
    <text x="175" y="25" fill="#7dd3fc" font-size="14" font-weight="bold" text-anchor="middle">Legal Doctrines &amp; Judicial Precedents</text>
    
    <!-- Polluter Pays -->
    <rect x="15" y="45" width="320" height="80" rx="6" fill="#0369a1" opacity="0.25" stroke="#0284c7"/>
    <text x="25" y="65" fill="#38bdf8" font-size="11" font-weight="bold">1. Polluter Pays Principle (PPP):</text>
    <text x="25" y="82" fill="#cbd5e1" font-size="10">• Polluter bears complete costs of ecological restoration</text>
    <text x="25" y="97" fill="#cbd5e1" font-size="10">• Plus financial compensation to affected community victims</text>
    <text x="25" y="112" fill="#bae6fd" font-size="9">Landmark: Bichhri Case (1996) &amp; Vellore Citizens (1996)</text>
    
    <!-- Precautionary & Public Trust -->
    <rect x="15" y="135" width="320" height="85" rx="6" fill="#7e22ce" opacity="0.2" stroke="#a855f7"/>
    <text x="25" y="153" fill="#c4b5fd" font-size="11" font-weight="bold">2. Precautionary Principle:</text>
    <text x="25" y="170" fill="#cbd5e1" font-size="10">• Lack of full scientific certainty cannot justify postponing</text>
    <text x="35" y="185" fill="#e9d5ff" font-size="9">cost-effective preventive measures against ecological threats</text>
    <text x="25" y="202" fill="#c4b5fd" font-size="11" font-weight="bold">3. Public Trust Doctrine (M.C. Mehta, 1997):</text>
    <text x="35" y="215" fill="#e9d5ff" font-size="9">Rivers, air, forests held by State in sacred trust for public</text>
    
    <!-- NGT & Absolute Liability -->
    <rect x="15" y="230" width="320" height="70" rx="6" fill="#b91c1c" opacity="0.2" stroke="#ef4444"/>
    <text x="25" y="248" fill="#fca5a5" font-size="11" font-weight="bold">Absolute Liability &amp; NGT Act 2010:</text>
    <text x="25" y="265" fill="#cbd5e1" font-size="10">• Oleum Gas Leak (1987): Hazardous industry liable with no defense</text>
    <text x="25" y="280" fill="#cbd5e1" font-size="9">• NGT: Fast-track environmental tribunal (6-month disposal rule)</text>
  </g>

  <text x="400" y="405" fill="#64748b" font-size="11" text-anchor="middle">NCERT Class 12 Environmental Studies • Resource Valuation, Carbon Markets &amp; Jurisprudence</text>
</svg>`,
    workedExamples: [
      {
        questionNumber: 1,
        question: "In international carbon trading and climate economics, what physical quantity of greenhouse gas reduction or sequestration is represented by exactly ONE Carbon Credit (CER)?",
        options: [
          { id: "A", text: "1 Kilogram of Carbon Monoxide" },
          { id: "B", text: "1 Metric Ton of Carbon Dioxide equivalent (1 MT CO₂e)" },
          { id: "C", text: "1,000 Metric Tons of Methane" },
          { id: "D", text: "1 Litre of Biofuel" }
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Under the United Nations Framework Convention on Climate Change (UNFCCC) and Kyoto Protocol Clean Development Mechanism (CDM), the unit of trade is the Certified Emission Reduction (CER).",
          "Step 2: By international definition, 1 CER credit is issued for every ONE METRIC TON of CO₂ equivalent (1 MT CO₂e) reduced, sequestered, or avoided by a verified project.",
          "Conclusion: Option B (1 Metric Ton of CO₂ equivalent) is correct."
        ],
        cuetTip: "Universal Carbon Credit metric: 1 Credit = 1 Metric Ton CO₂ equivalent (1 MT CO₂e)."
      },
      {
        questionNumber: 2,
        question: "In which landmark 1996 judgment did the Supreme Court of India explicitly establish that the 'Polluter Pays Principle' and the 'Precautionary Principle' are essential parts of the environmental law of the land under Article 21 of the Indian Constitution?",
        options: [
          { id: "A", text: "Kesavananda Bharati v. State of Kerala" },
          { id: "B", text: "Vellore Citizens' Welfare Forum v. Union of India" },
          { id: "C", text: "Maneka Gandhi v. Union of India" },
          { id: "D", text: "Shah Bano Begum Case" }
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: In Vellore Citizens' Welfare Forum v. Union of India (1996), tanneries in Tamil Nadu were discharging untreated toxic effluents into the Palar river.",
          "Step 2: Justice Kuldip Singh ruled that the 'Precautionary Principle' and 'Polluter Pays Principle' are essential features of Sustainable Development and are implicit within Article 21 (Right to Life) and Articles 48A and 51A(g).",
          "Conclusion: Option B is correct."
        ],
        cuetTip: "Vellore Citizens Case (1996) = Supreme Court formally incorporated 'Polluter Pays' and 'Precautionary Principle' into Indian constitutional environmental law!"
      }
    ],
    howCuetAsksThis: [
      {
        type: "Valuation Method Identification",
        frequency: "High (2 questions)",
        typicalStem: "Which environmental valuation technique surveys individuals directly about their hypothetical 'Willingness to Pay' (WTP) to prevent the extinction of an endangered species?",
        strategy: "Contingent Valuation Method (CVM)."
      },
      {
        type: "Assertion-Reason",
        frequency: "Medium (2 questions)",
        typicalStem: "Assertion (A): Traditional Gross Domestic Product (GDP) provides a misleadingly inflated picture of long-term economic progress when natural forests are clear-felled.\nReason (R): Traditional GDP records the market revenue from timber sales as economic growth, but completely fails to deduct the depletion of natural capital and loss of ecosystem services.",
        strategy: "Both are true, and R correctly explains the rationale for Green GDP."
      }
    ],
    commonTraps: [
      {
        misconception: "Believing Green GDP increases when natural resource depletion accelerates.",
        whyWrong: "Resource depletion and environmental degradation are DEDUCTED from traditional GDP in Green Accounting, causing Green GDP to decrease when nature is damaged.",
        correctUnderstanding: "Green GDP = Traditional GDP MINUS Natural Capital Depletion.",
        trapOptionExample: "Adding environmental damage costs to GDP."
      },
      {
        misconception: "Confusing Direct Use Value with Existence Value.",
        whyWrong: "Direct use value involves physical extraction (timber, fruit) or recreation (visiting a park). Existence value is a purely non-use moral satisfaction derived from knowing a species exists without ever using or visiting it.",
        correctUnderstanding: "Existence value = Non-use value.",
        trapOptionExample: "Calling entry tickets to a national park existence value."
      }
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Green GDP Formula",
        mnemonic: "GDP minus Natural Loss",
        shortcut: "Green GDP = Traditional GDP - Natural Capital Depletion - Environmental Damage.",
        whenToApply: "Green accounting equations in CUET.",
        explanation: "Simple subtraction formula for adjusted national wealth."
      }
    ],
    quickRevisionCard: {
      title: "Environmental Economics & Law — Flash Card",
      bulletPoints: [
        "1 Carbon Credit: Exactly 1 Metric Ton of Carbon Dioxide equivalent (1 MT CO₂e) reduced/sequestered.",
        "Cap-and-Trade: Regulatory limit (Cap) with tradable surplus allowances (Trade) creating carbon pricing.",
        "Total Economic Value: Use Value (Direct, Indirect, Option) + Non-Use Value (Existence, Bequest).",
        "CVM (Contingent Valuation Method): Stated-preference survey measuring Willingness to Pay (WTP).",
        "Hedonic Pricing: Estimates environmental value from property price differentials.",
        "Polluter Pays Principle (PPP): Polluter bears full restoration cost + victim compensation (Bichhri & Vellore cases).",
        "Precautionary Principle: Scientific uncertainty cannot justify postponing preventive ecological action.",
        "Public Trust Doctrine (Kamal Nath case, 1997): Natural resources held in public trust by State.",
        "Absolute Liability (Oleum gas leak, 1987): Hazardous industry liable with no legal exceptions.",
        "Green GDP: Traditional GDP minus Natural Capital Depletion minus Pollution Degradation costs.",
        "National Green Tribunal (NGT Act 2010): Fast-track judicial body for environmental disputes."
      ]
    },
    practiceQuestions: [
      {
        id: "evs_u6_q1",
        question: "In carbon markets and emissions trading schemes, exactly how much reduction in greenhouse gas emissions does ONE Carbon Credit represent?",
        type: "standard",
        questionType: "Carbon Accounting",
        difficulty: "easy",
        options: [
          { id: "A", text: "100 Kilograms of CO₂" },
          { id: "B", text: "1 Metric Ton of CO₂ equivalent (1 MT CO₂e)" },
          { id: "C", text: "10 Metric Tons of CO₂" },
          { id: "D", text: "1 Pound of Carbon" }
        ],
        correctOption: "B",
        explanation: "Under international climate frameworks, one carbon credit equals one metric ton of carbon dioxide equivalent (1 MT CO₂e) prevented from entering the atmosphere or sequestered from it."
      },
      {
        id: "evs_u6_q2",
        question: "Which stated-preference survey method asks citizens directly about their hypothetical 'Willingness to Pay' (WTP) to preserve a non-market environmental asset, such as a scenic wetland?",
        type: "standard",
        questionType: "Valuation Methodology",
        difficulty: "medium",
        options: [
          { id: "A", text: "Hedonic Pricing Method" },
          { id: "B", text: "Travel Cost Method" },
          { id: "C", text: "Contingent Valuation Method (CVM)" },
          { id: "D", text: "Opportunity Cost Analysis" }
        ],
        correctOption: "C",
        explanation: "The Contingent Valuation Method (CVM) constructs a hypothetical market via questionnaires to measure an individual's maximum Willingness to Pay (WTP) for environmental improvements."
      },
      {
        id: "evs_u6_q3",
        question: "Under the 'Polluter Pays Principle' established by the Supreme Court of India in the Bichhri case (1996), what full liability is imposed on the polluting party?",
        type: "standard",
        questionType: "Environmental Law Doctrine",
        difficulty: "easy",
        options: [
          { id: "A", text: "Paying a token fine of ₹100 to the local municipal council" },
          { id: "B", text: "Bearing the entire financial cost of environmental remediation, ecosystem restoration, and compensation to affected victims" },
          { id: "C", text: "Shutting down the plant for 24 hours only" },
          { id: "D", text: "Planting five saplings near the factory gate" }
        ],
        correctOption: "B",
        explanation: "The Polluter Pays Principle mandates that the polluter is liable not only to compensate the victims of pollution, but also to pay the comprehensive financial costs of restoring the damaged environment."
      },
      {
        id: "evs_u6_q4",
        question: "In the Total Economic Value (TEV) framework, what is the value placed on simply knowing that an endangered species (like the Blue Whale) exists in the wild, even if one never intends to see or consume it?",
        type: "standard",
        questionType: "Resource Valuation Category",
        difficulty: "easy",
        options: [
          { id: "A", text: "Direct Use Value" },
          { id: "B", text: "Indirect Use Value" },
          { id: "C", text: "Existence Value" },
          { id: "D", text: "Consumptive Value" }
        ],
        correctOption: "C",
        explanation: "Existence value is a non-use value reflecting the moral or altruistic satisfaction individuals derive from the mere knowledge that an environmental asset continues to exist in nature."
      },
      {
        id: "evs_u6_q5",
        question: "How is 'Green GDP' mathematically computed in relation to traditional Gross Domestic Product (GDP)?",
        type: "standard",
        questionType: "Green Accounting Formula",
        difficulty: "medium",
        options: [
          { id: "A", text: "Green GDP = Traditional GDP + Carbon Credit revenues" },
          { id: "B", text: "Green GDP = Traditional GDP - Net Depletion of Natural Capital - Environmental Degradation Costs" },
          { id: "C", text: "Green GDP = Agricultural GDP × Total Forest Area" },
          { id: "D", text: "Green GDP = Traditional GDP divided by national population" }
        ],
        correctOption: "B",
        explanation: "Green GDP adjusts traditional GDP by subtracting the economic value of natural resource depletion and the costs of environmental degradation, reflecting true sustainable national income."
      },
      {
        id: "evs_u6_q6",
        question: "In which landmark environmental tort case did the Supreme Court of India formulate the doctrine of 'Absolute Liability' following a hazardous toxic chemical disaster in Delhi?",
        type: "standard",
        questionType: "Judicial Precedent",
        difficulty: "medium",
        options: [
          { id: "A", text: "Bhopal Gas Leak Case" },
          { id: "B", text: "M.C. Mehta v. Union of India (Oleum Gas Leak Case, 1987)" },
          { id: "C", text: "Subhash Kumar v. State of Bihar" },
          { id: "D", text: "Narmada Bachao Andolan v. Union of India" }
        ],
        correctOption: "B",
        explanation: "In the Oleum Gas Leak Case (1987), Chief Justice P.N. Bhagwati formulated the doctrine of Absolute Liability, holding that enterprises engaged in inherently hazardous activities owe an absolute and non-delegable duty to the community, with no defenses."
      },
      {
        id: "evs_u6_q7",
        question: "What is the statutory deadline mandated by the National Green Tribunal Act, 2010 for the NGT to expeditiously hear and dispose of environmental applications and appeals?",
        type: "standard",
        questionType: "Statutory Time Limit",
        difficulty: "medium",
        options: [
          { id: "A", text: "30 days" },
          { id: "B", text: "60 days" },
          { id: "C", text: "6 months" },
          { id: "D", text: "3 years" }
        ],
        correctOption: "C",
        explanation: "Section 18(3) of the National Green Tribunal Act 2010 mandates that the tribunal shall endeavor to dispose of environmental applications and appeals within 6 months of filing."
      },
      {
        id: "evs_u6_q8",
        question: "Assertion (A): The Precautionary Principle mandates that where there are threats of serious ecological damage, a lack of full scientific certainty cannot be used to postpone preventive measures.\nReason (R): Waiting for absolute scientific certainty before regulating toxic pollutants often results in irreversible environmental harm and permanent destruction of ecosystems.",
        type: "assertion-reason",
        questionType: "Assertion-Reason",
        difficulty: "easy",
        options: [
          { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true, but (R) is false." },
          { id: "D", text: "(A) is false, but (R) is true." }
        ],
        correctOption: "A",
        explanation: "Both statements are true. The Precautionary Principle acts proactively to avert catastrophic damage rather than waiting for conclusive, delayed scientific proof."
      },
      {
        id: "evs_u6_q9",
        question: "Assertion (A): Traditional Gross Domestic Product (GDP) accurately accounts for the depreciation of forests, minerals, and clean water supplies.\nReason (R): Traditional national income accounting treats the extraction and sale of non-renewable fossil fuels and timber exclusively as income without deducting the depletion of natural capital.",
        type: "assertion-reason",
        questionType: "Assertion-Reason",
        difficulty: "medium",
        options: [
          { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is false, but (R) is true." },
          { id: "D", text: "(A) is true, but (R) is false." }
        ],
        correctOption: "C",
        explanation: "Assertion (A) is false because traditional GDP completely ignores natural capital depreciation. Reason (R) is true, explaining this critical shortcoming."
      },
      {
        id: "evs_u6_q10",
        question: "Match the Environmental Economic Concepts in List I with their Core Definition in List II:\nList I:\n(P) Carbon Credit\n(Q) Cap-and-Trade\n(R) Hedonic Pricing\n(S) Public Trust Doctrine\n\nList II:\n(1) Estimating environmental value from property price differentials\n(2) Tradable certificate representing 1 Metric Ton of CO₂ equivalent reduced\n(3) Sovereign government holds natural resources in trust for the public\n(4) Market mechanism where emission quotas are capped and surplus permits traded",
        type: "match-the-following",
        questionType: "Match The Following",
        difficulty: "medium",
        options: [
          { id: "A", text: "P-2, Q-4, R-1, S-3" },
          { id: "B", text: "P-4, Q-2, R-1, S-3" },
          { id: "C", text: "P-2, Q-1, R-4, S-3" },
          { id: "D", text: "P-3, Q-4, R-1, S-2" }
        ],
        correctOption: "A",
        explanation: "Carbon Credit = 1 MT CO₂e (P-2); Cap-and-trade = Quota cap and traded permits (Q-4); Hedonic pricing = Property price differentials (R-1); Public trust = State holds resources in trust (S-3). Matches A."
      }
    ]
  },
  {
    id: "environmental_studies_u7_t1",
    slug: "unfccc-kyoto-protocol-paris-agreement-montreal-protocol-global-environmental-treaties",
    subject: "environmental_studies",
    subjectName: "Environmental Studies",
    subjectCode: "310",
    unitNumber: 7,
    unitTitle: "International Relations and Environment",
    topicTitle: "UNFCCC, Kyoto Protocol, Paris Agreement, Montreal Protocol, Global Environmental Treaties",
    ncertReference: {
      class: "12",
      book: "International Environmental Law & Global Governance NCERT Class XII",
      chapterNumber: 7,
      chapterName: "International Environmental Treaties, Multilateral Agreements and Climate Diplomacy",
      sections: ["7.1 The Rio Earth Summit (1992) & UNFCCC Architecture (CBDR-RC Principle)", "7.2 Kyoto Protocol (1997): Annex I vs Non-Annex I & Flexibility Mechanisms (CDM, ET, JI)", "7.3 The Paris Agreement (2015): 1.5°C/2.0°C Target, NDCs & Global Stocktake", "7.4 Stratospheric Ozone Depletion: Montreal Protocol (1987) & Kigali Amendment (2016)"]
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Pivotal global governance unit. Common But Differentiated Responsibilities (CBDR), Paris Agreement temperature goals (1.5°C), Montreal Protocol ODS phaseout, and Kigali HFC amendment.",
      totalPyqsInRepo: 0,
      weightagePercentage: 15
    },
    summary30Seconds: [
      "Rio Earth Summit (1992): Birthed UNFCCC, CBD, UNCCD, Agenda 21, and the foundational CBDR-RC principle (Common But Differentiated Responsibilities and Respective Capabilities).",
      "Kyoto Protocol (1997, adopted COP3): Legally binding emission reduction targets (average 5.2% below 1990 levels) for industrialized nations (Annex I) across 6 GHGs; 3 flexible mechanisms: CDM, Emissions Trading (ET), Joint Implementation (JI).",
      "Paris Agreement (2015, COP21): Legally binding global treaty to limit global warming to well below 2.0°C and pursue efforts for 1.5°C above pre-industrial levels; relies on bottom-up Nationally Determined Contributions (NDCs) updated every 5 years.",
      "Ozone Protection: Montreal Protocol (1987 - universally ratified; phased out CFCs/halons); Kigali Amendment (2016 - phases down HFCs, avoiding up to 0.5°C warming by 2100)."
    ],
    coreConcepts: [
      {
        title: "1. The 1992 Rio Earth Summit and the UNFCCC Framework",
        content: "The United Nations Conference on Environment and Development (UNCED), known as the Rio Earth Summit, was convened in Rio de Janeiro in June 1992:\n- Landmark Outcomes: Rio Declaration on Environment and Development (27 principles), Agenda 21 (action plan for sustainable development), Forest Principles, and three legally binding 'Rio Conventions':\n1. UNFCCC (United Nations Framework Convention on Climate Change)\n2. CBD (Convention on Biological Diversity)\n3. UNCCD (United Nations Convention to Combat Desertification)\n- Core Pillar Principle: CBDR-RC (Common But Differentiated Responsibilities and Respective Capabilities - Rio Principle 7). Acknowledges that while all nations share a common duty to protect the planetary climate, developed countries have historically emitted the vast majority of cumulative greenhouse gases and possess greater financial/technological capabilities, thereby bearing the primary ethical and legal responsibility to lead mitigation and provide climate finance ($100 billion annual commitment) to developing nations.",
        ncertPointers: [
          "UNFCCC entered into force in 1994; its supreme decision-making body is the Conference of the Parties (COP), meeting annually since COP1 in Berlin (1995).",
          "COP3 (1997) produced Kyoto; COP21 (2015) produced the Paris Agreement; COP26 (2021, Glasgow) produced the Glasgow Climate Pact."
        ]
      },
      {
        title: "2. The Kyoto Protocol (1997): Structure and Flexibility Mechanisms",
        content: "Adopted at COP3 in Kyoto, Japan, in December 1997 (entered into force in 2005 after Russian ratification):\n- Structure: Top-down, legally binding reduction targets for developed industrialized countries (Annex I Parties). Non-Annex I (developing countries like India and China) had no mandatory binding emission caps to ensure their right to develop.\n- Target: 1st Commitment Period (2008-2012) mandated Annex I countries to reduce collective emissions of 6 greenhouse gases by an average of 5.2% below 1990 levels.\n- 6 Kyoto Greenhouse Gases: Carbon Dioxide (CO₂), Methane (CH₄), Nitrous Oxide (N₂O), Hydrofluorocarbons (HFCs), Perfluorocarbons (PFCs), and Sulfur Hexafluoride (SF₆). (NF₃ added later in Doha Amendment).\n- Three Market-Based Flexibility Mechanisms:\n1. Clean Development Mechanism (CDM - Article 12): Annex I countries invest in emission-reduction projects in developing nations to earn Certified Emission Reduction (CER) credits.\n2. Joint Implementation (JI - Article 6): Annex I countries invest in emission-reduction projects in other Annex I countries (e.g. economies in transition) to earn Emission Reduction Units (ERUs).\n3. International Emissions Trading (IET - Article 17): Direct trading of Assigned Amount Units (AAUs) between Annex I countries.",
        ncertPointers: [
          "The USA famously signed the Kyoto Protocol under Bill Clinton but the US Senate refused to ratify it under George W. Bush.",
          "Doha Amendment (2012) established the 2nd Commitment Period of the Kyoto Protocol (2013-2020)."
        ]
      },
      {
        title: "3. The Paris Agreement (2015, COP21) Architecture",
        content: "Adopted on December 12, 2015 at COP21 in Paris; entered into force on November 4, 2016:\n- Core Temperature Target (Article 2): Holding the increase in global average temperature to 'well below 2.0°C above pre-industrial levels' and pursuing efforts to 'limit the temperature increase to 1.5°C above pre-industrial levels'.\n- Hybrid Architecture: Replaced Kyoto's rigid top-down Annex bifurcation with universal participation through bottom-up Nationally Determined Contributions (NDCs). Every country (developed and developing) pledges domestic climate targets, updated every 5 years with a mandatory 'ratchet mechanism' (each successive NDC must represent a progression).\n- Global Stocktake (GST - Article 14): Assesses collective global progress every 5 years (first Global Stocktake concluded at COP28 in Dubai, 2023, calling for 'transitioning away from fossil fuels').\n- India's Updated NDCs (Panchamrit targets presented at COP26):\n1. Reach 500 GW non-fossil energy capacity by 2030.\n2. Meet 50% of energy requirements from renewables by 2030.\n3. Reduce emissions intensity of GDP by 45% by 2030 (from 2005 levels).\n4. Create additional carbon sink of 2.5 to 3 billion tons of CO₂e through afforestation by 2030.\n5. Achieve Net-Zero greenhouse gas emissions by the year 2070.",
        ncertPointers: [
          "Article 6 of the Paris Agreement establishes bilateral carbon trading (Article 6.2) and a multilateral centralized carbon crediting mechanism (Article 6.4).",
          "Loss and Damage Fund was officially established at COP27 (Sharm el-Sheikh, 2022) to assist vulnerable nations facing catastrophic climate impacts."
        ]
      },
      {
        title: "4. Stratospheric Ozone Protection: Montreal Protocol & Kigali Amendment",
        content: "The most successful multilateral environmental agreement in history:\n- Stratospheric Ozone Layer: Located in the stratosphere (15-35 km), absorbs lethal solar Ultraviolet-B (UV-B) radiation. Destroyed by Chlorofluorocarbons (CFCs), halons, and carbon tetrachloride. Catalytic cycle: UV radiation breaks CFCs to release free Chlorine radicals (`Cl·`), which catalytically destroy over 100,000 ozone molecules (`Cl· + O₃ -> ClO· + O₂`).\n- Vienna Convention for the Protection of the Ozone Layer (1985): Framework treaty.\n- Montreal Protocol on Substances that Deplete the Ozone Layer (1987): Signed September 16, 1987 (observed globally as World Ozone Day). Established legally binding phaseout schedules for Ozone Depleting Substances (ODSs). First UN treaty to achieve universal ratification by all 197 countries.\n- Kigali Amendment to the Montreal Protocol (2016): Hydrofluorocarbons (HFCs) replaced CFCs because they have zero Ozone Depletion Potential (ODP = 0). However, HFCs are potent greenhouse gases with Global Warming Potentials (GWPs) thousands of times higher than CO₂. Adopted in Kigali, Rwanda, in October 2016, legally mandating countries to phase down HFC production and consumption by 80-85% over 30 years, projected to prevent up to 0.5°C of global warming by 2100.",
        ncertPointers: [
          "Ozone layer thickness is measured in Dobson Units (DU); normal atmospheric thickness is ~300 DU; an 'ozone hole' is defined when levels drop below 220 DU over Antarctica.",
          "India is placed in Group 2 under the Kigali Amendment, scheduled to freeze HFCs by 2028 and reduce by 85% by 2047."
        ]
      }
    ],
    keyFormulasAndTables: [
      {
        name: "Paris Agreement Core Temperature Thresholds",
        formula: "Well Below 2.0°C | Pursue Efforts to Limit Warming to 1.5°C Above Pre-Industrial Levels",
        symbols: "Article 2, Paris Agreement (2015)",
        siUnits: "Degrees Celsius",
        applicationCondition: "Global climate treaty targets in CUET",
        notes: "IPCC Special Report (2018) confirmed catastrophic tipping points occur beyond 1.5°C."
      },
      {
        name: "The 6 Kyoto Protocol Greenhouse Gases",
        formula: "Carbon Dioxide (CO₂) + Methane (CH₄) + Nitrous Oxide (N₂O) + HFCs + PFCs + Sulfur Hexafluoride (SF₆)",
        symbols: "Annex A Kyoto GHGs",
        siUnits: "Chemical formulas",
        applicationCondition: "Kyoto treaty greenhouse gas identification",
        notes: "Water vapor and ground-level ozone are NOT covered under Kyoto commitments."
      },
      {
        name: "India's Panchamrit Climate Pledges",
        formula: "500 GW Non-Fossil | 50% Renewables | 45% Emission Intensity Cut | 2.5-3 Bt Carbon Sink | Net-Zero by 2070",
        symbols: "COP26 Pledges",
        siUnits: "National targets by 2030 & 2070",
        applicationCondition: "Indian climate diplomacy questions",
        notes: "Presented by Prime Minister Modi at COP26 in Glasgow."
      }
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%">
  <defs>
    <linearGradient id="evs7Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="100%" stop-color="#141c38"/>
    </linearGradient>
    <linearGradient id="unGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <linearGradient id="ozGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" rx="12" fill="url(#evs7Grad)"/>
  <text x="400" y="32" fill="#38bdf8" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">CUET Environmental Studies: UNFCCC, Paris Agreement &amp; Montreal Protocol</text>
  
  <!-- Left Box: UNFCCC, Kyoto & Paris -->
  <g transform="translate(30, 60)">
    <rect width="360" height="320" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
    <text x="180" y="25" fill="#7dd3fc" font-size="14" font-weight="bold" text-anchor="middle">Climate Treaties: Rio, Kyoto &amp; Paris</text>
    
    <rect x="15" y="45" width="330" height="60" rx="6" fill="#0369a1" opacity="0.25" stroke="#0284c7"/>
    <text x="25" y="65" fill="#38bdf8" font-size="11" font-weight="bold">1. Rio Earth Summit (1992) &amp; UNFCCC:</text>
    <text x="25" y="82" fill="#cbd5e1" font-size="10">• Established CBDR-RC: Common But Differentiated Responsibilities</text>
    <text x="25" y="96" fill="#bae6fd" font-size="9">Historical polluters bear primary legal duty for climate finance</text>
    
    <rect x="15" y="112" width="330" height="75" rx="6" fill="#78350f" opacity="0.2" stroke="#f59e0b"/>
    <text x="25" y="130" fill="#fcd34d" font-size="11" font-weight="bold">2. Kyoto Protocol (1997, COP3):</text>
    <text x="25" y="147" fill="#cbd5e1" font-size="10">• Legally binding -5.2% cuts for Annex I (developed)</text>
    <text x="25" y="162" fill="#cbd5e1" font-size="10">• 6 GHGs: CO₂, CH₄, N₂O, HFCs, PFCs, SF₆</text>
    <text x="25" y="177" fill="#fed7aa" font-size="9">3 Mechanisms: CDM (Certified Emission Reductions), JI, ET</text>
    
    <rect x="15" y="195" width="330" height="110" rx="6" fill="#065f46" opacity="0.25" stroke="#10b981"/>
    <text x="25" y="213" fill="#34d399" font-size="11" font-weight="bold">3. Paris Agreement (2015, COP21):</text>
    <text x="25" y="230" fill="#cbd5e1" font-size="10">• Core Goal: Keep warming well below 2.0°C; pursue 1.5°C</text>
    <text x="25" y="245" fill="#cbd5e1" font-size="10">• Bottom-up Nationally Determined Contributions (NDCs, 5-yr)</text>
    <text x="25" y="260" fill="#a7f3d0" font-size="10">• India's NDCs: 50% renewables by 2030, Net-Zero by 2070</text>
    <text x="25" y="275" fill="#a7f3d0" font-size="9">Global Stocktake (GST) every 5 years to assess progress</text>
  </g>

  <!-- Right Box: Ozone Layer & Montreal Protocol -->
  <g transform="translate(420, 60)">
    <rect width="350" height="320" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
    <text x="175" y="25" fill="#c4b5fd" font-size="14" font-weight="bold" text-anchor="middle">Ozone Protection: Montreal &amp; Kigali</text>
    
    <rect x="15" y="45" width="320" height="110" rx="6" fill="#4c1d95" opacity="0.3" stroke="#8b5cf6"/>
    <text x="25" y="65" fill="#c4b5fd" font-size="11" font-weight="bold">1. Montreal Protocol (1987):</text>
    <text x="25" y="83" fill="#cbd5e1" font-size="10">• Signed Sept 16, 1987 (World Ozone Day)</text>
    <text x="25" y="98" fill="#cbd5e1" font-size="10">• Universally ratified by all 197 UN countries</text>
    <text x="25" y="113" fill="#cbd5e1" font-size="10">• Phased out Ozone Depleting Substances (CFCs, Halons)</text>
    <text x="25" y="128" fill="#cbd5e1" font-size="10">• 1 Chlorine radical destroys &gt;100,000 O₃ molecules</text>
    <text x="25" y="143" fill="#ddd6fe" font-size="9">Ozone thickness measured in Dobson Units (DU; &lt;220 = Hole)</text>
    
    <rect x="15" y="165" width="320" height="100" rx="6" fill="#1e3a8a" opacity="0.25" stroke="#3b82f6"/>
    <text x="25" y="185" fill="#60a5fa" font-size="11" font-weight="bold">2. Kigali Amendment (2016):</text>
    <text x="25" y="203" fill="#cbd5e1" font-size="10">• HFCs don't harm ozone (ODP=0) but have high GWP</text>
    <text x="25" y="218" fill="#cbd5e1" font-size="10">• Legally mandates phasing down HFCs by 80-85%</text>
    <text x="25" y="233" fill="#cbd5e1" font-size="10">• Projected to avert up to 0.5°C global warming by 2100</text>
    <text x="25" y="248" fill="#bae6fd" font-size="9">India freezes HFCs by 2028; 85% phase-down by 2047</text>
    
    <rect x="15" y="275" width="320" height="35" rx="4" fill="#0f172a"/>
    <text x="175" y="297" fill="#94a3b8" font-size="10" text-anchor="middle">Most successful environmental treaty in history</text>
  </g>

  <text x="400" y="405" fill="#64748b" font-size="11" text-anchor="middle">NCERT Class 12 Environmental Studies • Global Environmental Diplomacy, UNFCCC &amp; Protocols</text>
</svg>`,
    workedExamples: [
      {
        questionNumber: 1,
        question: "Under Article 2 of the landmark 2015 Paris Agreement (COP21), what is the primary long-term global temperature goal established for the international community?",
        options: [
          { id: "A", text: "Freezing global greenhouse gas emissions at 1990 levels" },
          { id: "B", text: "Holding the increase in global average temperature to well below 2.0°C and pursuing efforts to limit it to 1.5°C above pre-industrial levels" },
          { id: "C", text: "Lowering global temperature by 3.0°C below 2000 levels" },
          { id: "D", text: "Banning all coal extraction immediately by 2020" }
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The Paris Agreement was adopted by consensus in December 2015.",
          "Step 2: Article 2(1)(a) explicitly lays down the central temperature objective: 'Holding the increase in the global average temperature to well below 2°C above pre-industrial levels and pursuing efforts to limit the temperature increase to 1.5°C above pre-industrial levels'.",
          "Conclusion: Option B is correct."
        ],
        cuetTip: "Paris Agreement goals: Well below 2°C, with concerted efforts toward 1.5°C above pre-industrial levels."
      },
      {
        questionNumber: 2,
        question: "Why was the Kigali Amendment adopted in 2016 to amend the Montreal Protocol, even though Hydrofluorocarbons (HFCs) have zero Ozone Depletion Potential (ODP = 0)?",
        options: [
          { id: "A", text: "HFCs cause immediate acid rain" },
          { id: "B", text: "HFCs are extremely potent greenhouse gases with Global Warming Potentials thousands of times higher than CO₂, accelerating global climate change" },
          { id: "C", text: "HFCs are toxic to honeybees" },
          { id: "D", text: "HFCs deplete stratospheric nitrogen" }
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: When CFCs were phased out by the Montreal Protocol, chemical industries replaced them with HFCs (Hydrofluorocarbons).",
          "Step 2: While HFCs do not harm the stratospheric ozone layer (ODP = 0), they are super-greenhouse gases with immense Global Warming Potentials (GWP).",
          "Step 3: The Kigali Amendment (2016) brought HFCs under the Montreal Protocol mandate to phase them down by 80-85%, preventing up to 0.5°C warming.",
          "Conclusion: Option B is correct."
        ],
        cuetTip: "HFCs have ODP = 0 (no ozone harm), but super-high GWP (global warming)! Kigali Amendment phases down HFCs to stop 0.5°C warming."
      }
    ],
    howCuetAsksThis: [
      {
        type: "Treaty-Date-Objective Matching",
        frequency: "High (3 questions)",
        typicalStem: "Match the Multilateral Environmental Agreement in List I with its Primary Objective in List II (Montreal Protocol, Kyoto Protocol, Paris Agreement, Basel Convention).",
        strategy: "Montreal = Ozone layer ODS phaseout; Kyoto = Legally binding Annex I GHG cuts; Paris = 1.5°C/2.0°C NDCs; Basel = Transboundary hazardous waste control."
      },
      {
        type: "Assertion-Reason",
        frequency: "Medium (2 questions)",
        typicalStem: "Assertion (A): The principle of Common But Differentiated Responsibilities (CBDR-RC) demands equal, uniform percentage emissions cuts from all developed and developing countries alike.\nReason (R): CBDR-RC recognizes that developed nations have historically caused the majority of cumulative atmospheric greenhouse gas accumulation and have greater financial resources.",
        strategy: "Assertion is false (demands differentiated, not equal cuts), Reason is true."
      }
    ],
    commonTraps: [
      {
        misconception: "Believing India had mandatory legally binding emission reduction caps under the Kyoto Protocol.",
        whyWrong: "India was classified as a Non-Annex I (developing) country under the Kyoto Protocol and had zero mandatory binding emission cut targets.",
        correctUnderstanding: "Under Kyoto, only Annex I (industrialized) nations had binding targets.",
        trapOptionExample: "Stating India was legally forced to cut emissions by 5.2% under Kyoto."
      },
      {
        misconception: "Thinking the Montreal Protocol is part of the UNFCCC climate treaties.",
        whyWrong: "The Montreal Protocol was created under the 1985 Vienna Convention to protect the stratospheric ozone layer, completely separate from the UNFCCC climate convention.",
        correctUnderstanding: "Montreal Protocol = Ozone layer (Vienna Convention); Kyoto/Paris = Climate Change (UNFCCC).",
        trapOptionExample: "Listing the Montreal Protocol as a COP treaty under UNFCCC."
      }
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Major Treaties Chronology",
        mnemonic: "Montreal 87 -> Rio 92 -> Kyoto 97 -> Paris 15",
        shortcut: "M-R-K-P: 1987, 1992, 1997, 2015.",
        whenToApply: "Chronological arrangement questions in CUET.",
        explanation: "Simple 4-stage global environmental timeline."
      }
    ],
    quickRevisionCard: {
      title: "Global Treaties & Climate Diplomacy — Flash Card",
      bulletPoints: [
        "Rio Earth Summit (1992): Birthed UNFCCC, CBD, UNCCD, Agenda 21, and the CBDR-RC principle.",
        "CBDR-RC: Common But Differentiated Responsibilities; historical polluters must lead mitigation & finance.",
        "Kyoto Protocol (1997, COP3): Binding -5.2% cuts for Annex I (developed); Non-Annex I had no caps.",
        "Kyoto 6 GHGs: CO₂, CH₄, N₂O, HFCs, PFCs, SF₆; 3 Mechanisms: CDM (CERs), JI, Emissions Trading.",
        "Paris Agreement (2015, COP21): Limit warming well below 2.0°C, pursue 1.5°C; bottom-up NDCs every 5 yrs.",
        "India's COP26 Pledges: 500 GW non-fossil, 50% renewables, 45% carbon intensity cut by 2030, Net-Zero by 2070.",
        "Montreal Protocol (1987): Phased out Ozone Depleting Substances (CFCs, Halons); universal 197 ratification.",
        "Ozone Metric: Dobson Unit (DU); <220 DU = Antarctic Ozone Hole; World Ozone Day = Sept 16.",
        "Kigali Amendment (2016): Legally binding phase-down of high-GWP HFCs; avoids up to 0.5°C warming by 2100.",
        "Loss & Damage Fund: Established at COP27 (Sharm el-Sheikh, 2022) to aid climate-vulnerable nations."
      ]
    },
    practiceQuestions: [
      {
        id: "evs_u7_q1",
        question: "On which date is 'World Ozone Day' observed worldwide every year to commemorate the signing of the Montreal Protocol in 1987?",
        type: "standard",
        questionType: "International Calendar Day",
        difficulty: "easy",
        options: [
          { id: "A", text: "5th June" },
          { id: "B", text: "22nd April" },
          { id: "C", text: "16th September" },
          { id: "D", text: "1st December" }
        ],
        correctOption: "C",
        explanation: "The United Nations General Assembly proclaimed 16th September as the International Day for the Preservation of the Ozone Layer (World Ozone Day) to mark the signing date of the Montreal Protocol."
      },
      {
        id: "evs_u7_q2",
        question: "Which foundational environmental equity principle adopted at the 1992 Rio Earth Summit recognizes that industrialized nations bear greater historical responsibility for global climate mitigation?",
        type: "standard",
        questionType: "Diplomatic Principle",
        difficulty: "easy",
        options: [
          { id: "A", text: "Strict Sovereign Equality" },
          { id: "B", text: "Common But Differentiated Responsibilities and Respective Capabilities (CBDR-RC)" },
          { id: "C", text: "Absolute Free Market Deregulation" },
          { id: "D", text: "Territorial Hegemony" }
        ],
        correctOption: "B",
        explanation: "Principle 7 of the Rio Declaration establishes CBDR-RC, acknowledging historical contributions to climate change and different national technological/economic capacities."
      },
      {
        id: "evs_u7_q3",
        question: "Under the Kyoto Protocol, which flexibility mechanism allows an industrialized (Annex I) nation to earn Certified Emission Reduction (CER) credits by investing in clean energy projects in a developing (Non-Annex I) country?",
        type: "standard",
        questionType: "Kyoto Mechanism",
        difficulty: "medium",
        options: [
          { id: "A", text: "Joint Implementation (JI)" },
          { id: "B", text: "Clean Development Mechanism (CDM)" },
          { id: "C", text: "International Emissions Trading (IET)" },
          { id: "D", text: "Green Climate Fund grant" }
        ],
        correctOption: "B",
        explanation: "The Clean Development Mechanism (CDM), defined in Article 12 of the Kyoto Protocol, enables Annex I countries to implement emission-reduction projects in developing nations to earn CER credits."
      },
      {
        id: "evs_u7_q4",
        question: "In what year has India officially committed to achieve 'Net-Zero' greenhouse gas emissions under its enhanced climate pledges announced at COP26 in Glasgow?",
        type: "standard",
        questionType: "National Climate Pledge",
        difficulty: "easy",
        options: [
          { id: "A", text: "2030" },
          { id: "B", text: "2050" },
          { id: "C", text: "2070" },
          { id: "D", text: "2100" }
        ],
        correctOption: "C",
        explanation: "At the COP26 World Leaders Summit in Glasgow, Prime Minister Narendra Modi declared India's target to reach Net-Zero carbon emissions by the year 2070."
      },
      {
        id: "evs_u7_q5",
        question: "What unit is standardly used by atmospheric scientists to measure the total column thickness of stratospheric ozone gas above a geographical area?",
        type: "standard",
        questionType: "Scientific Unit",
        difficulty: "easy",
        options: [
          { id: "A", text: "Decibels (dB)" },
          { id: "B", text: "Dobson Unit (DU)" },
          { id: "C", text: "Becquerel (Bq)" },
          { id: "D", text: "Parts per million (ppm)" }
        ],
        correctOption: "B",
        explanation: "The Dobson Unit (DU) is the standard measurement unit for total column atmospheric ozone; an ozone concentration dropping below 220 DU defines the Antarctic ozone hole."
      },
      {
        id: "evs_u7_q6",
        question: "Which amendment to the Montreal Protocol, adopted in October 2016 in Rwanda, legally binds nations to phase down the production and consumption of potent greenhouse Hydrofluorocarbons (HFCs)?",
        type: "standard",
        questionType: "International Treaty Amendment",
        difficulty: "easy",
        options: [
          { id: "A", text: "Doha Amendment" },
          { id: "B", text: "Kigali Amendment" },
          { id: "C", text: "Copenhagen Accord" },
          { id: "D", text: "Minamata Convention" }
        ],
        correctOption: "B",
        explanation: "The Kigali Amendment (2016) amended the Montreal Protocol to mandate an 80-85% global phasedown of HFCs, avoiding up to 0.5°C of planetary warming by 2100."
      },
      {
        id: "evs_u7_q7",
        question: "At which UN Climate Change Conference (COP27) held in Egypt in 2022 was the historic breakthrough decision taken to establish a dedicated 'Loss and Damage Fund' for vulnerable countries?",
        type: "standard",
        questionType: "COP Milestone",
        difficulty: "medium",
        options: [
          { id: "A", text: "COP21 (Paris)" },
          { id: "B", text: "COP26 (Glasgow)" },
          { id: "C", text: "COP27 (Sharm el-Sheikh)" },
          { id: "D", text: "COP28 (Dubai)" }
        ],
        correctOption: "C",
        explanation: "COP27 in Sharm el-Sheikh, Egypt (2022) concluded with a landmark agreement to create a dedicated 'Loss and Damage Fund' to compensate developing countries suffering from unavoidable climate disasters."
      },
      {
        id: "evs_u7_q8",
        question: "Assertion (A): The 2015 Paris Agreement relies on mandatory, centrally imposed uniform emissions quotas enforced through punitive trade sanctions.\nReason (R): The Paris Agreement functions on a bottom-up hybrid framework of nationally determined contributions (NDCs) with five-year ratcheting progress cycles.",
        type: "assertion-reason",
        questionType: "Assertion-Reason",
        difficulty: "easy",
        options: [
          { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is false, but (R) is true." },
          { id: "D", text: "(A) is true, but (R) is false." }
        ],
        correctOption: "C",
        explanation: "Assertion (A) is false because Paris abandoned top-down punitive quotas in favor of voluntary bottom-up NDCs. Reason (R) is true."
      },
      {
        id: "evs_u7_q9",
        question: "Assertion (A): Although Hydrofluorocarbons (HFCs) do not destroy stratospheric ozone, their phase-down was incorporated into the Montreal Protocol via the Kigali Amendment.\nReason (R): HFCs are extremely potent greenhouse gases with Global Warming Potentials hundreds to thousands of times higher than Carbon Dioxide, threatening global climate stability.",
        type: "assertion-reason",
        questionType: "Assertion-Reason",
        difficulty: "easy",
        options: [
          { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true, but (R) is false." },
          { id: "D", text: "(A) is false, but (R) is true." }
        ],
        correctOption: "A",
        explanation: "Both statements are true. Because the Montreal Protocol had caused the widespread adoption of HFCs as alternatives to CFCs, the treaty assumed responsibility for phasing them down to avert climate warming."
      },
      {
        id: "evs_u7_q10",
        question: "Match the Multilateral Environmental Agreements in List I with their Principal Mandate in List II:\nList I:\n(P) Montreal Protocol (1987)\n(Q) Kyoto Protocol (1997)\n(R) Paris Agreement (2015)\n(S) Basel Convention (1989)\n\nList II:\n(1) Temperature stabilization well below 2.0°C via bottom-up NDCs\n(2) Phasedown and elimination of Ozone Depleting Substances (CFCs/halons)\n(3) Regulating transboundary movements and disposal of hazardous wastes\n(4) Legally binding emission reduction targets for Annex I industrialized nations",
        type: "match-the-following",
        questionType: "Match The Following",
        difficulty: "medium",
        options: [
          { id: "A", text: "P-2, Q-4, R-1, S-3" },
          { id: "B", text: "P-4, Q-2, R-1, S-3" },
          { id: "C", text: "P-2, Q-1, R-4, S-3" },
          { id: "D", text: "P-3, Q-4, R-1, S-2" }
        ],
        correctOption: "A",
        explanation: "Montreal = Ozone ODS (P-2); Kyoto = Annex I binding cuts (Q-4); Paris = NDCs 1.5°C/2.0°C (R-1); Basel = Hazardous waste trade (S-3). Matches A."
      }
    ]
  }
];
