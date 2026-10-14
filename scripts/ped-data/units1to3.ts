export const pedUnits1to3 = [
  {
    id: "physical_education_u1_t1",
    slug: "major-diseases-national-health-programmes-hygiene-and-community-health",
    subject: "physical_education",
    subjectName: "Physical Education",
    subjectCode: "321",
    unitNumber: 1,
    unitTitle: "Health Status and Programmes in India",
    topicTitle: "Major Diseases, National Health Programmes, Hygiene and Community Health",
    ncertReference: {
      class: "12",
      book: "Physical Education & Health NCERT Class XII",
      chapterNumber: 1,
      chapterName: "Health Status and Community Health in India",
      sections: ["1.1 Communicable and Non-Communicable Diseases", "1.2 National Health Programmes in India", "1.3 Personal, School and Community Hygiene", "1.4 Healthcare Delivery System and Ayushman Bharat"]
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Core health domain topic. Tested frequently on disease vectors, communicable vs non-communicable categories, and government flagship schemes.",
      totalPyqsInRepo: 0,
      weightagePercentage: 20
    },
    summary30Seconds: [
      "Communicable diseases spread via biological agents (air, water, vectors, contact): Malaria (Plasmodium via Anopheles), Tuberculosis (Mycobacterium tuberculosis), Cholera (Vibrio cholerae).",
      "Non-communicable diseases (NCDs) are lifestyle and metabolic disorders: Diabetes Mellitus (insulin deficiency/resistance), Hypertension (>140/90 mmHg), Cardiovascular Diseases, Cancer.",
      "National Health Programmes: National Tuberculosis Elimination Programme (NTEP - target elimination), National Vector Borne Disease Control Programme (NVBDCP), Ayushman Bharat (PM-JAY covering ₹5 lakh/family/year).",
      "Community Hygiene: Safe drinking water, waste disposal (sanitary landfills/composting), sewage treatment, and vector control prevent epidemic outbreaks."
    ],
    coreConcepts: [
      {
        title: "1. Communicable vs Non-Communicable Diseases (NCDs)",
        content: "Communicable (Infectious) Diseases: Caused by pathogens (viruses, bacteria, fungi, protozoa) and transmitted from infected reservoir to susceptible host. Modes of transmission: Direct (physical contact, droplet spray like Influenza/COVID-19) and Indirect (water/food-borne like Typhoid/Cholera, vector-borne like Dengue by Aedes mosquito, fomite-borne). Prevention requires immunization, sanitation, quarantine, and chemotherapy.\n\nNon-Communicable Diseases (NCDs): Chronic conditions that are not transmissible. Driven by lifestyle risk factors: tobacco use, physical inactivity, unhealthy diet, and alcohol abuse. Key NCDs: Cardiovascular Diseases (leading global cause of death; atherosclerosis and coronary artery disease), Diabetes (Type 1 autoimmune beta-cell destruction; Type 2 lifestyle insulin resistance), Chronic Respiratory Diseases (Asthma, COPD), and Cancer.",
        ncertPointers: [
          "Tuberculosis is detected via Mantoux tuberculin skin test and Sputum Microscopy; treated with DOTS (Directly Observed Treatment, Short-course).",
          "Malaria is caused by Plasmodium protozoa (P. vivax, P. falciparum - malignant malaria), transmitted by female Anopheles mosquitoes.",
          "Dengue and Chikungunya are transmitted by daytime biting female Aedes aegypti mosquitoes."
        ]
      },
      {
        title: "2. Major National Health Programmes in India",
        content: "India operates targeted national programmes to curb disease burden:\n1. NTEP (National TB Elimination Programme): Rebranded from RNTCP; aims to eliminate TB in India through Nikshay digital tracking, free molecular testing (CBNAAT/TrueNat), and nutritional support (Nikshay Poshan Yojana ₹500/month).\n2. NVBDCP (National Vector Borne Disease Control Programme): Integrates control of 6 vector-borne diseases: Malaria, Filaria, Kala-azar, Japanese Encephalitis, Dengue, and Chikungunya.\n3. Universal Immunization Programme (UIP) & Mission Indradhanush: Provides free vaccines against 12 vaccine-preventable diseases (TB, Diphtheria, Pertussis, Tetanus, Polio, Measles, Rubella, Hepatitis B, Meningitis/Pneumonia due to Hib, Rotavirus, Pneumococcal Conjugate Vaccine, Japanese Encephalitis).\n4. Ayushman Bharat (Pradhan Mantri Jan Arogya Yojana - PM-JAY): World's largest government-funded healthcare scheme providing health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
        ncertPointers: [
          "Mission Indradhanush was launched in December 2014 to ensure full immunization coverage for children and pregnant women.",
          "Health and Wellness Centres (HWCs) under Ayushman Bharat deliver Comprehensive Primary Health Care (CPHC)."
        ]
      },
      {
        title: "3. Hygiene and Community Health Infrastructure",
        content: "Health is defined by WHO as 'a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity.'\nPersonal Hygiene: Regular bathing, oral hygiene, handwashing with soap (removes 99% of transient pathogenic microbes, prevents fecal-oral route transmission).\nCommunity Health: Collective organized efforts of society to protect and improve the health of people. Key components: Safe municipal water supply (coagulation, sedimentation, filtration, chlorination), solid waste management (segregation at source: biodegradable vs non-biodegradable, composting, incineration, sanitary landfilling), and safe sewage disposal (primary mechanical settling, secondary biological oxidation).",
        ncertPointers: [
          "Chlorination of drinking water destroys pathogenic vegetative bacteria; recommended free residual chlorine is 0.5 mg/L after 30 minutes contact.",
          "Primary Health Centres (PHCs) cover 30,000 population in plains and 20,000 in hilly/tribal areas."
        ]
      }
    ],
    keyFormulasAndTables: [
      {
        name: "Vector-Borne Disease Matrix",
        formula: "Malaria -> Anopheles; Dengue/Chikungunya -> Aedes; Filaria -> Culex",
        symbols: "Pathogen - Vector pairing",
        siUnits: "Biological taxonomy",
        applicationCondition: "Epidemiological matching questions in CUET",
        notes: "Anopheles breeds in clean stagnant water; Aedes breeds in clean artificial containers (coolers, tyres)."
      },
      {
        name: "Blood Pressure Clinical Thresholds",
        formula: "Normal: <120/80 mmHg; Hypertension: ≥140/90 mmHg",
        symbols: "Systolic / Diastolic pressure",
        siUnits: "mmHg",
        applicationCondition: "Cardiovascular health assessments",
        notes: "Measured using a Sphygmomanometer."
      },
      {
        name: "Ayushman Bharat PM-JAY Coverage Norm",
        formula: "Coverage = ₹5,00,000 per family per year",
        symbols: "Secondary and Tertiary care",
        siUnits: "INR",
        applicationCondition: "Bottom 40% vulnerable population (SECC 2011 database)",
        notes: "Completely cashless and paperless access at empaneled hospitals."
      }
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%">
  <defs>
    <linearGradient id="ped1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#14532d"/>
    </linearGradient>
    <linearGradient id="commGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <linearGradient id="ncdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#c2410c"/>
    </linearGradient>
    <linearGradient id="govGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" rx="12" fill="url(#ped1Grad)"/>
  <text x="400" y="32" fill="#86efac" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">CUET Physical Education: Health Status &amp; National Programmes</text>
  
  <!-- Communicable Diseases -->
  <g transform="translate(30, 60)">
    <rect width="230" height="320" rx="8" fill="#1e293b" stroke="#059669" stroke-width="2"/>
    <rect width="230" height="35" rx="8" fill="url(#commGrad)"/>
    <text x="115" y="23" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">1. Communicable Diseases</text>
    <text x="15" y="65" fill="#6ee7b7" font-size="11" font-weight="bold">Vectors &amp; Pathogens:</text>
    <text x="20" y="85" fill="#cbd5e1" font-size="10">• Malaria: Plasmodium (Anopheles)</text>
    <text x="20" y="105" fill="#cbd5e1" font-size="10">• Dengue: Flavi virus (Aedes)</text>
    <text x="20" y="125" fill="#cbd5e1" font-size="10">• Filaria: W. bancrofti (Culex)</text>
    <text x="20" y="145" fill="#cbd5e1" font-size="10">• Cholera: Vibrio cholerae (Water)</text>
    <text x="20" y="165" fill="#cbd5e1" font-size="10">• TB: Mycobacterium (Droplet)</text>
    
    <text x="15" y="195" fill="#6ee7b7" font-size="11" font-weight="bold">Control Measures:</text>
    <text x="20" y="215" fill="#cbd5e1" font-size="10">• Vaccination (UIP / Indradhanush)</text>
    <text x="20" y="235" fill="#cbd5e1" font-size="10">• Vector control (Gambusia fish)</text>
    <text x="20" y="255" fill="#cbd5e1" font-size="10">• Water chlorination (0.5 mg/L)</text>
    <rect x="15" y="275" width="200" height="28" rx="4" fill="#047857" opacity="0.3"/>
    <text x="115" y="293" fill="#a7f3d0" font-size="10" text-anchor="middle">DOTS treatment for Tuberculosis</text>
  </g>

  <!-- Non-Communicable Diseases -->
  <g transform="translate(285, 60)">
    <rect width="230" height="320" rx="8" fill="#1e293b" stroke="#ea580c" stroke-width="2"/>
    <rect width="230" height="35" rx="8" fill="url(#ncdGrad)"/>
    <text x="115" y="23" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">2. Non-Communicable (NCDs)</text>
    <text x="15" y="65" fill="#fdba74" font-size="11" font-weight="bold">Lifestyle Disorders:</text>
    <text x="20" y="85" fill="#cbd5e1" font-size="10">• Hypertension: BP ≥ 140/90</text>
    <text x="20" y="105" fill="#cbd5e1" font-size="10">• Diabetes: Type 1 &amp; Type 2</text>
    <text x="20" y="125" fill="#cbd5e1" font-size="10">• Atherosclerosis: Plaque buildup</text>
    <text x="20" y="145" fill="#cbd5e1" font-size="10">• COPD &amp; Asthma: Airway damage</text>
    
    <text x="15" y="175" fill="#fdba74" font-size="11" font-weight="bold">Primary Risk Factors:</text>
    <text x="20" y="195" fill="#cbd5e1" font-size="10">• Tobacco &amp; Alcohol abuse</text>
    <text x="20" y="215" fill="#cbd5e1" font-size="10">• Physical inactivity / Sedentary</text>
    <text x="20" y="235" fill="#cbd5e1" font-size="10">• High sodium &amp; trans-fat diet</text>
    <rect x="15" y="275" width="200" height="28" rx="4" fill="#c2410c" opacity="0.3"/>
    <text x="115" y="293" fill="#fed7aa" font-size="10" text-anchor="middle">NCDs account for ~63% of deaths</text>
  </g>

  <!-- National Health Programmes -->
  <g transform="translate(540, 60)">
    <rect width="230" height="320" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
    <rect width="230" height="35" rx="8" fill="url(#govGrad)"/>
    <text x="115" y="23" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">3. National Programmes</text>
    <text x="15" y="65" fill="#93c5fd" font-size="11" font-weight="bold">Flagship Initiatives:</text>
    <text x="20" y="85" fill="#cbd5e1" font-size="10">• Ayushman Bharat (PM-JAY):</text>
    <text x="30" y="103" fill="#38bdf8" font-size="9">₹5 Lakh/family/year coverage</text>
    
    <text x="20" y="125" fill="#cbd5e1" font-size="10">• Mission Indradhanush:</text>
    <text x="30" y="143" fill="#38bdf8" font-size="9">Full vaccine coverage for children</text>
    
    <text x="20" y="165" fill="#cbd5e1" font-size="10">• NTEP (TB Elimination):</text>
    <text x="30" y="183" fill="#38bdf8" font-size="9">Nikshay portal &amp; nutritional aid</text>
    
    <text x="20" y="205" fill="#cbd5e1" font-size="10">• NVBDCP: 6 Vector Diseases</text>
    <text x="20" y="225" fill="#cbd5e1" font-size="10">• Swachh Bharat Abhiyan (ODF)</text>
    
    <rect x="15" y="275" width="200" height="28" rx="4" fill="#0369a1" opacity="0.3"/>
    <text x="115" y="293" fill="#bae6fd" font-size="10" text-anchor="middle">PHC: 30,000 (plains) / 20,000 (hills)</text>
  </g>

  <text x="400" y="405" fill="#64748b" font-size="11" text-anchor="middle">NCERT Class 12 Physical Education • Health &amp; Community Wellness Overview</text>
</svg>`,
    workedExamples: [
      {
        questionNumber: 1,
        question: "Under the Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY), what is the maximum annual financial health cover provided per eligible family for secondary and tertiary care hospitalization?",
        options: [
          { id: "A", text: "₹2,00,000" },
          { id: "B", text: "₹3,00,000" },
          { id: "C", text: "₹5,00,000" },
          { id: "D", text: "₹10,00,000" }
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Ayushman Bharat PM-JAY was launched in September 2018 as the world's largest health assurance scheme.",
          "Step 2: The scheme provides a defined benefit cover of ₹5,00,000 per family per year on a family floater basis.",
          "Step 3: This cover is fully cashless and portable across all empaneled public and private hospitals across India.",
          "Conclusion: Option C (₹5,00,000) is correct."
        ],
        cuetTip: "CUET regularly asks the exact financial cover limit (₹5 lakh) and the year of launch (2018) for PM-JAY."
      },
      {
        questionNumber: 2,
        question: "Which of the following diseases is caused by a protozoan parasite and transmitted to humans specifically by the bite of an infected female Anopheles mosquito?",
        options: [
          { id: "A", text: "Dengue" },
          { id: "B", text: "Malaria" },
          { id: "C", text: "Chikungunya" },
          { id: "D", text: "Kala-azar" }
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Malaria is caused by the protozoan Plasmodium (vivax, falciparum, malariae, ovale).",
          "Step 2: The vector for malaria is the female Anopheles mosquito.",
          "Step 3: Dengue and Chikungunya are viral infections transmitted by Aedes aegypti.",
          "Step 4: Kala-azar is caused by Leishmania donovani and transmitted by the Sandfly (Phlebotomus).",
          "Conclusion: Malaria (Option B) is correct."
        ],
        cuetTip: "Keep the vectors straight: Malaria = Female Anopheles; Dengue/Chikungunya/Yellow Fever = Aedes; Kala-azar = Sandfly; Filaria = Culex."
      }
    ],
    howCuetAsksThis: [
      {
        type: "Vector-Disease Matching",
        frequency: "High (2 questions)",
        typicalStem: "Match the Disease with its transmitting Vector (Malaria, Dengue, Kala-azar, Sleeping Sickness).",
        strategy: "Pair Malaria with Anopheles, Dengue with Aedes, Kala-azar with Sandfly, Sleeping Sickness with Tsetse fly."
      },
      {
        type: "Assertion-Reason",
        frequency: "Medium (1-2 questions)",
        typicalStem: "Assertion (A): Non-communicable diseases like hypertension and Type 2 diabetes cannot be prevented by traditional vaccination.\nReason (R): NCDs are not caused by infectious pathogens; they stem from chronic physiological and behavioral lifestyle factors.",
        strategy: "Both statements are factually sound and R correctly explains A."
      }
    ],
    commonTraps: [
      {
        misconception: "Believing female Aedes mosquitoes bite exclusively at night.",
        whyWrong: "Aedes aegypti (the dengue vector) is predominantly a daytime biter (peak biting during early morning and late afternoon before dusk).",
        correctUnderstanding: "Anopheles bites mainly at night; Aedes bites primarily during daytime.",
        trapOptionExample: "Option stating Dengue transmission occurs during midnight sleep."
      },
      {
        misconception: "Confusing DOTS strategy with diabetes therapy.",
        whyWrong: "DOTS stands for Directly Observed Treatment, Short-course and is the WHO/NTEP global strategy for Tuberculosis.",
        correctUnderstanding: "DOTS is exclusively for Tuberculosis bacteriological eradication.",
        trapOptionExample: "Associating DOTS with insulin monitoring."
      }
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Vector Pairing Mnemonic",
        mnemonic: "MAD-KSC",
        shortcut: "Malaria-Anopheles | Dengue-Aedes | Kala-azar-Sandfly | Culex-Filariasis.",
        whenToApply: "Vector-borne disease matching questions.",
        explanation: "Quick mental anchor for CUET match-the-following tables."
      }
    ],
    quickRevisionCard: {
      title: "Health & Disease Programmes — Flash Card",
      bulletPoints: [
        "Communicable: Pathogen-driven; droplet, contact, water/food, or vector transmission.",
        "Malaria: Plasmodium protozoa; transmitted by female Anopheles.",
        "Dengue & Chikungunya: Arbovirus; transmitted by daytime-biting female Aedes.",
        "Tuberculosis: Mycobacterium tuberculosis; detected by Sputum/Mantoux; cured via DOTS.",
        "Non-Communicable (NCDs): Lifestyle/metabolic; Hypertension (≥140/90), Type 2 Diabetes, CVD, Cancer.",
        "PM-JAY: ₹5 Lakh/family/year secondary & tertiary cashless coverage.",
        "Mission Indradhanush: Universal full immunization for infants and pregnant mothers.",
        "NVBDCP covers 6 vector diseases: Malaria, Filaria, Kala-azar, JE, Dengue, Chikungunya.",
        "Water Chlorination: 0.5 mg/L free residual chlorine after 30 min contact time.",
        "PHC Population: 30,000 (plain areas) and 20,000 (hilly/tribal areas)."
      ]
    },
    practiceQuestions: [
      {
        id: "ped_u1_q1",
        question: "Which of the following organisms causes Tuberculosis, and what is the primary organ it infects?",
        type: "standard",
        questionType: "Pathology Direct",
        difficulty: "easy",
        options: [
          { id: "A", text: "Vibrio cholerae; Small Intestine" },
          { id: "B", text: "Mycobacterium tuberculosis; Lungs" },
          { id: "C", text: "Salmonella typhi; Liver" },
          { id: "D", text: "Plasmodium falciparum; Spleen" }
        ],
        correctOption: "B",
        explanation: "Tuberculosis is caused by the bacterium Mycobacterium tuberculosis and most commonly affects the lungs (pulmonary tuberculosis)."
      },
      {
        id: "ped_u1_q2",
        question: "Which mosquito vector is responsible for transmitting the viruses causing Dengue fever and Chikungunya?",
        type: "standard",
        questionType: "Vector Identification",
        difficulty: "easy",
        options: [
          { id: "A", text: "Female Anopheles" },
          { id: "B", text: "Culex fatigans" },
          { id: "C", text: "Female Aedes aegypti" },
          { id: "D", text: "Mansonia" }
        ],
        correctOption: "C",
        explanation: "Female Aedes aegypti mosquitoes transmit both Dengue and Chikungunya viruses, breeding predominantly in artificial clean water containers."
      },
      {
        id: "ped_u1_q3",
        question: "According to standard clinical guidelines, what blood pressure reading indicates Stage 1 Hypertension?",
        type: "standard",
        questionType: "Clinical Parameter",
        difficulty: "medium",
        options: [
          { id: "A", text: "Systolic 120 mmHg and Diastolic 80 mmHg" },
          { id: "B", text: "Systolic ≥ 140 mmHg or Diastolic ≥ 90 mmHg" },
          { id: "C", text: "Systolic 110 mmHg and Diastolic 70 mmHg" },
          { id: "D", text: "Systolic 90 mmHg and Diastolic 60 mmHg" }
        ],
        correctOption: "B",
        explanation: "Normal blood pressure is approximately 120/80 mmHg. Hypertension is clinically diagnosed when systolic blood pressure is ≥140 mmHg and/or diastolic pressure is ≥90 mmHg."
      },
      {
        id: "ped_u1_q4",
        question: "What is the primary objective of the government scheme 'Mission Indradhanush' in India?",
        type: "standard",
        questionType: "Scheme Objective",
        difficulty: "medium",
        options: [
          { id: "A", text: "Providing tap water connections to every rural household" },
          { id: "B", text: "Achieving full immunization coverage for all children and pregnant women" },
          { id: "C", text: "Constructing community toilets in tribal regions" },
          { id: "D", text: "Providing free school uniforms to girl students" }
        ],
        correctOption: "B",
        explanation: "Mission Indradhanush was launched by the Ministry of Health and Family Welfare to rapidly boost immunization coverage to over 90% for unvaccinated and partially vaccinated children and pregnant women."
      },
      {
        id: "ped_u1_q5",
        question: "What does the abbreviation 'DOTS' stand for in the context of the National Tuberculosis Elimination Programme?",
        type: "standard",
        questionType: "Direct Full Form",
        difficulty: "easy",
        options: [
          { id: "A", text: "Direct Observation of Treatment and Sanitation" },
          { id: "B", text: "Directly Observed Treatment, Short-course" },
          { id: "C", text: "Daily Oral Therapy for Sputum-positive cases" },
          { id: "D", text: "Diagnostic Oncology and Tuberculosis Strategy" }
        ],
        correctOption: "B",
        explanation: "DOTS stands for Directly Observed Treatment, Short-course, the recognized internationally recommended strategy for TB control."
      },
      {
        id: "ped_u1_q6",
        question: "Which of the following biological control methods is officially deployed to curb mosquito larvae in freshwater ponds and stagnant pools?",
        type: "standard",
        questionType: "Vector Control Method",
        difficulty: "medium",
        options: [
          { id: "A", text: "Introducing Gambusia (Mosquitofish)" },
          { id: "B", text: "Adding concentrated sodium chloride" },
          { id: "C", text: "Introducing hydra" },
          { id: "D", text: "Covering the pond with plastic sheets" }
        ],
        correctOption: "A",
        explanation: "Gambusia affinis (mosquitofish) is a larvivorous fish species widely introduced into freshwater bodies as an eco-friendly biological control agent that feeds voraciously on mosquito larvae."
      },
      {
        id: "ped_u1_q7",
        question: "What is the recommended standard population norm for setting up a Primary Health Centre (PHC) in plain areas of India?",
        type: "standard",
        questionType: "Health Administration Norm",
        difficulty: "medium",
        options: [
          { id: "A", text: "5,000" },
          { id: "B", text: "10,000" },
          { id: "C", text: "30,000" },
          { id: "D", text: "1,00,000" }
        ],
        correctOption: "C",
        explanation: "In India, a Primary Health Centre (PHC) covers a population of 30,000 in plain areas and 20,000 in hilly, tribal, and difficult-to-reach areas."
      },
      {
        id: "ped_u1_q8",
        question: "Assertion (A): Diseases such as Atherosclerosis and Type 2 Diabetes are classified as lifestyle disorders.\nReason (R): Their primary etiological drivers include physical inactivity, high saturated fat diets, and chronic psychological stress rather than microbial contagion.",
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
        explanation: "Both (A) and (R) are true. Lifestyle disorders are non-communicable conditions arising directly from behavioral and daily life factors."
      },
      {
        id: "ped_u1_q9",
        question: "Assertion (A): Drinking water treated with chlorine contains zero chemical residues after 30 minutes.\nReason (R): A free residual chlorine level of 0.5 mg/L is intentionally maintained to protect water against post-treatment secondary microbial contamination.",
        type: "assertion-reason",
        questionType: "Assertion-Reason",
        difficulty: "hard",
        options: [
          { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is false, but (R) is true." },
          { id: "D", text: "(A) is true, but (R) is false." }
        ],
        correctOption: "C",
        explanation: "Assertion (A) is false because drinking water is explicitly kept with a small residual chlorine concentration (0.5 mg/L) to prevent recontamination in the distribution pipeline. Reason (R) is true."
      },
      {
        id: "ped_u1_q10",
        question: "Match the Disease in List I with the Transmitting Vector / Mode in List II:\nList I:\n(P) Malaria\n(Q) Dengue\n(R) Typhoid\n(S) Filariasis\n\nList II:\n(1) Contaminated water and food\n(2) Female Anopheles mosquito\n(3) Culex mosquito\n(4) Aedes aegypti mosquito",
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
        explanation: "Malaria = Female Anopheles (P-2); Dengue = Aedes (Q-4); Typhoid = Contaminated food/water (R-1); Filariasis = Culex mosquito (S-3). Matches A."
      }
    ]
  },
  {
    id: "physical_education_u2_t1",
    slug: "motivation-anxiety-aggression-socialization-through-sports",
    subject: "physical_education",
    subjectName: "Physical Education",
    subjectCode: "321",
    unitNumber: 2,
    unitTitle: "Psychological and Sociological Aspects of Sports",
    topicTitle: "Motivation, Anxiety, Aggression, Socialization through Sports",
    ncertReference: {
      class: "12",
      book: "Physical Education & Sports Psychology NCERT Class XII",
      chapterNumber: 2,
      chapterName: "Psychological and Sociological Dimensions of Sports",
      sections: ["2.1 Concept and Types of Motivation", "2.2 Anxiety, Arousal and the Inverted-U Hypothesis", "2.3 Types of Aggression in Sports", "2.4 Socialization through Physical Education and Sports"]
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely popular in CUET. Inverted-U hypothesis, intrinsic vs extrinsic motivation, and instrumental vs hostile aggression appear annually.",
      totalPyqsInRepo: 0,
      weightagePercentage: 20
    },
    summary30Seconds: [
      "Motivation: Intrinsic (internal joy, mastery, self-determined) vs Extrinsic (external rewards, trophies, cash prizes, social praise).",
      "Arousal and Anxiety: Trait anxiety (stable personality predisposition) vs State anxiety (temporary, situation-specific autonomic arousal).",
      "Inverted-U Hypothesis (Yerkes-Dodson Law): Optimal athletic performance occurs at moderate arousal; under-arousal causes lethargy, over-arousal impairs motor control.",
      "Aggression: Hostile (intent to harm/injure as primary goal), Instrumental (harm as a means to achieve victory), Assertive behavior (forceful play within rules, no intent to harm).",
      "Socialization: Sports cultivate cooperation, empathy, leadership, emotional control, and national integration."
    ],
    coreConcepts: [
      {
        title: "1. Motivation in Sports: Intrinsic vs Extrinsic",
        content: "Motivation is the internal state that initiates, directs, and sustains goal-oriented athletic behavior.\n- Intrinsic Motivation: Driven by internal factors such as personal enjoyment, interest, satisfaction of mastering a new motor skill, and pursuit of self-actualization. Research demonstrates that intrinsic motivation fosters long-term adherence and psychological resilience.\n- Extrinsic Motivation: Driven by external reinforcements such as medals, prize money, university sports quotas, fame, or avoidance of punishment. Over-reliance on extrinsic rewards can sometimes reduce intrinsic interest (the 'Overjustification Effect'). Techniques to enhance athletic motivation: Goal setting (SMART: Specific, Measurable, Achievable, Relevant, Time-bound), positive reinforcement, constructive feedback, and mental imagery.",
        ncertPointers: [
          "Self-Determination Theory (Deci & Ryan) identifies three basic psychological needs: Autonomy, Competence, and Relatedness.",
          "Verbal praise and encouraging self-talk enhance an athlete's self-efficacy (Bandura)."
        ]
      },
      {
        title: "2. Anxiety, Arousal, and the Inverted-U Hypothesis",
        content: "Arousal is a state of physiological and psychological activation of the body, ranging from deep sleep to intense excitement.\nAnxiety is an emotional state characterized by apprehension, nervousness, and elevated autonomic nervous system activation (elevated heart rate, sweating, muscle tension).\n- State Anxiety: A transitory, temporary emotional response to a specific competitive situation (e.g. taking a penalty kick in the final).\n- Trait Anxiety: A stable personality characteristic that predisposes an athlete to perceive competitive situations as threatening.\n\nThe Inverted-U Hypothesis (Yerkes-Dodson Law): Explains the relationship between arousal and performance. Performance increases with arousal up to an optimal midpoint. Beyond this optimal zone, excessive arousal triggers cognitive anxiety and panic, leading to precipitous performance deterioration ('choking under pressure'). Complex tasks (archery, shooting) require lower optimal arousal, while explosive tasks (weightlifting, sprinting) tolerate higher arousal.",
        ncertPointers: [
          "Drive Theory (Hull-Spence) posited a linear relationship (Performance = Habit × Drive), but is superseded by the Inverted-U Law for complex athletic skills.",
          "Catastrophe Theory (Hardy) suggests that high cognitive anxiety causes sudden, catastrophic collapse in performance rather than a smooth decline."
        ]
      },
      {
        title: "3. Aggression in Sports: Types and Theories",
        content: "Aggression in sport is defined as any physical or verbal behavior directed toward another human being with the deliberate intent to cause physical or psychological harm.\nThree primary categories:\n1. Hostile (Reactive) Aggression: The primary intent is to inflict bodily injury or psychological distress on an opponent, driven by anger (e.g. punching an opponent after a foul).\n2. Instrumental Aggression: The intent to cause harm or intimidation is used as an instrumental vehicle to achieve a non-aggressive goal like winning the ball, tackling to score, or defending a goal. No personal animosity.\n3. Assertive Behavior: Using legitimate physical force, high energy, and enthusiasm within the official rules of the game without any intention to harm (e.g. aggressive rebounding in basketball or strong legal sliding tackle in football).",
        ncertPointers: [
          "Frustration-Aggression Hypothesis (Dollard et al.): Frustration at being blocked from a goal inevitably leads to an aggressive response.",
          "Social Learning Theory (Bandura): Aggression is learned through observational modeling and reinforcement from coaches, peers, and media."
        ]
      },
      {
        title: "4. Socialization through Physical Education and Sports",
        content: "Socialization is the lifelong process by which individuals learn and internalize values, social norms, attitudes, and behaviors required to participate effectively in society.\nSports act as a powerful socializing agent:\n- Social Values: Teamwork, cooperation, respect for opponents, obedience to rules (sportsmanship), fair play, humility in victory, and dignity in defeat.\n- Leadership and Character Building: Assuming captaincy, organizing drills, communicating under pressure, and accepting responsibility.\n- Inclusivity and National Integration: Sports transcend barriers of caste, creed, gender, and socio-economic status, fostering national pride and mutual empathy.",
        ncertPointers: [
          "Primary socializing agencies in sports: Family, school/PE teachers, peer groups, and community sports clubs.",
          "Gender stereotypes in sports are dismantled as female athletes achieve global excellence in wrestling, boxing, badminton, and cricket."
        ]
      }
    ],
    keyFormulasAndTables: [
      {
        name: "Aggression Classification Matrix",
        formula: "Hostile (Intent: Harm, Emotion: Anger) | Instrumental (Intent: Win, Emotion: Cold) | Assertive (Intent: Rule-Bound Force, No Harm)",
        symbols: "Sport Aggression Taxonomy",
        siUnits: "Behavioral categories",
        applicationCondition: "Identifying sport behavior scenarios in CUET questions",
        notes: "Assertive behavior is NOT considered true aggression because there is no intent to injure."
      },
      {
        name: "Yerkes-Dodson Law of Arousal",
        formula: "Performance = f(Arousal) [Parabolic / Inverted-U Curve]",
        symbols: "P = Performance, A = Arousal",
        siUnits: "Psychological curve",
        applicationCondition: "Motor skill execution under competitive pressure",
        notes: "Optimal arousal point shifts left for fine motor skills (shooting) and right for gross motor skills (rugby, weightlifting)."
      }
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%">
  <defs>
    <linearGradient id="ped2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="100%" stop-color="#1e1e38"/>
    </linearGradient>
    <linearGradient id="arousalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="aggrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#b91c1c"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" rx="12" fill="url(#ped2Grad)"/>
  <text x="400" y="32" fill="#60a5fa" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">CUET Sports Psychology: Arousal, Aggression &amp; Motivation</text>
  
  <!-- Left Box: Inverted-U Hypothesis Curve -->
  <g transform="translate(30, 60)">
    <rect width="360" height="320" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="180" y="25" fill="#93c5fd" font-size="14" font-weight="bold" text-anchor="middle">Inverted-U Hypothesis (Yerkes-Dodson)</text>
    
    <!-- Coordinate axes -->
    <line x1="45" y1="260" x2="330" y2="260" stroke="#94a3b8" stroke-width="2"/>
    <line x1="45" y1="260" x2="45" y2="60" stroke="#94a3b8" stroke-width="2"/>
    <text x="330" y="275" fill="#94a3b8" font-size="10" text-anchor="end">Arousal Level →</text>
    <text x="25" y="70" fill="#94a3b8" font-size="10" transform="rotate(-90 25, 70)" text-anchor="end">Performance →</text>
    
    <!-- The Parabola Curve -->
    <path d="M 50 250 Q 185 45 320 250" fill="none" stroke="#38bdf8" stroke-width="3.5"/>
    
    <!-- Peak / Optimal Point -->
    <circle cx="185" cy="98" r="6" fill="#f59e0b"/>
    <line x1="185" y1="98" x2="185" y2="260" stroke="#f59e0b" stroke-dasharray="4,4" stroke-width="1.5"/>
    <text x="185" y="80" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">Optimal Zone</text>
    
    <!-- Left: Under-arousal -->
    <text x="80" y="220" fill="#93c5fd" font-size="10">Under-arousal</text>
    <text x="80" y="235" fill="#64748b" font-size="9">(Boredom / Sluggish)</text>
    
    <!-- Right: Over-arousal -->
    <text x="255" y="220" fill="#f87171" font-size="10">Over-arousal</text>
    <text x="255" y="235" fill="#64748b" font-size="9">(Anxiety / Choking)</text>
    
    <rect x="25" y="275" width="310" height="30" rx="4" fill="#1e3a8a" opacity="0.4"/>
    <text x="180" y="294" fill="#bae6fd" font-size="10" text-anchor="middle">Fine skills (archery): Lower arousal | Gross: Higher arousal</text>
  </g>

  <!-- Right Box: Aggression & Motivation Matrix -->
  <g transform="translate(420, 60)">
    <rect width="350" height="320" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
    <text x="175" y="25" fill="#fca5a5" font-size="14" font-weight="bold" text-anchor="middle">Aggression Spectrum &amp; Motivation</text>
    
    <!-- 3 Types of Aggression -->
    <rect x="20" y="45" width="310" height="60" rx="6" fill="#7f1d1d" opacity="0.3" stroke="#b91c1c"/>
    <text x="30" y="65" fill="#fca5a5" font-size="12" font-weight="bold">1. Hostile (Reactive) Aggression</text>
    <text x="30" y="82" fill="#cbd5e1" font-size="10">• Intent: Inflict physical/psychological harm</text>
    <text x="30" y="96" fill="#fca5a5" font-size="10">• Driven by anger, frustration; primary goal is pain</text>
    
    <rect x="20" y="115" width="310" height="60" rx="6" fill="#b45309" opacity="0.2" stroke="#d97706"/>
    <text x="30" y="135" fill="#fcd34d" font-size="12" font-weight="bold">2. Instrumental Aggression</text>
    <text x="30" y="152" fill="#cbd5e1" font-size="10">• Intent: Harm used as a tool to achieve non-aggressive goal</text>
    <text x="30" y="166" fill="#fed7aa" font-size="10">• Primary goal: Win ball/match, not personal grudge</text>
    
    <rect x="20" y="185" width="310" height="55" rx="6" fill="#065f46" opacity="0.2" stroke="#059669"/>
    <text x="30" y="205" fill="#6ee7b7" font-size="12" font-weight="bold">3. Assertive Behavior (Not True Aggression)</text>
    <text x="30" y="222" fill="#cbd5e1" font-size="10">• Forceful, energetic play strictly WITHIN official rules</text>
    <text x="30" y="235" fill="#a7f3d0" font-size="10">• NO intent to harm (e.g. fair sliding tackle)</text>
    
    <!-- Motivation split -->
    <rect x="20" y="250" width="310" height="55" rx="6" fill="#1e293b" stroke="#64748b"/>
    <text x="30" y="270" fill="#93c5fd" font-size="11" font-weight="bold">Intrinsic vs Extrinsic Motivation:</text>
    <text x="30" y="287" fill="#cbd5e1" font-size="10">Intrinsic: Joy of playing, mastery (Sustainable)</text>
    <text x="30" y="300" fill="#cbd5e1" font-size="10">Extrinsic: Medals, cash prizes, fame (Short-term)</text>
  </g>

  <text x="400" y="405" fill="#64748b" font-size="11" text-anchor="middle">NCERT Class 12 Physical Education • Sports Psychology &amp; Social Dynamics</text>
</svg>`,
    workedExamples: [
      {
        questionNumber: 1,
        question: "A defender in soccer executes a hard tackle with the deliberate goal of injuring the star forward of the opposing team out of frustration and anger from a prior foul. Under sports psychology taxonomy, how is this behavior categorized?",
        options: [
          { id: "A", text: "Instrumental Aggression" },
          { id: "B", text: "Assertive Behavior" },
          { id: "C", text: "Hostile Aggression" },
          { id: "D", text: "Constructive Arousal" }
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Identify the primary intent: the defender deliberately intends to inflict physical injury.",
          "Step 2: Identify the emotional state: it is accompanied by anger and frustration.",
          "Step 3: When the primary goal of the aggressive act is to cause harm and distress driven by anger, it is classified as Hostile (Reactive) Aggression.",
          "Conclusion: Option C is correct."
        ],
        cuetTip: "Distinguish Hostile vs Instrumental: If harm is the primary objective = Hostile. If harm is merely a means to achieve a competitive outcome (e.g. winning possession) = Instrumental."
      },
      {
        questionNumber: 2,
        question: "According to the Inverted-U Hypothesis (Yerkes-Dodson Law), what happens to athletic performance if an athlete's physiological arousal continues to increase beyond the optimal midpoint?",
        options: [
          { id: "A", text: "Performance continues to improve linearly" },
          { id: "B", text: "Performance remains permanently plateaued at peak" },
          { id: "C", text: "Performance progressively deteriorates due to excessive anxiety" },
          { id: "D", text: "Performance transforms directly into assertive behavior" }
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: The Inverted-U curve shows that performance increases with arousal only up to an optimal level.",
          "Step 2: If arousal surpasses the optimal midpoint, over-arousal induces hyperventilation, muscle tension, loss of perceptual focus, and cognitive anxiety.",
          "Step 3: This causes performance to decline, forming the inverted U shape.",
          "Conclusion: Option C is correct."
        ],
        cuetTip: "Drive Theory claimed linear improvement (disproven). Inverted-U predicts a curvilinear relationship where over-arousal impairs performance!"
      }
    ],
    howCuetAsksThis: [
      {
        type: "Behavioral Scenario Classification",
        frequency: "High (3 questions)",
        typicalStem: "Identify the type of aggression shown by a fast bowler who bowls an aggressive legal bouncer within cricket rules.",
        strategy: "No intent to injure and strictly within rules = Assertive Behavior."
      },
      {
        type: "Assertion-Reason",
        frequency: "Medium (2 questions)",
        typicalStem: "Assertion (A): Complex and fine motor skills such as pistol shooting require a lower level of arousal for optimal performance.\nReason (R): High arousal increases neuromuscular tension and fine muscle tremors, impairing delicate steady-hand motor coordination.",
        strategy: "Both are true, and R correctly explains why fine motor skills demand lower arousal."
      }
    ],
    commonTraps: [
      {
        misconception: "Labeling aggressive legal play (like tackling in rugby) as hostile aggression.",
        whyWrong: "If the action is legal within rules and lacks intent to cause bodily injury, it is Assertive Behavior, not aggression.",
        correctUnderstanding: "Intent to harm is the defining criterion for true aggression.",
        trapOptionExample: "Calling a legal defensive block in basketball hostile aggression."
      },
      {
        misconception: "Confusing State Anxiety with Trait Anxiety.",
        whyWrong: "State is temporary and transient; Trait is an enduring personality characteristic.",
        correctUnderstanding: "State = Situation-specific (right now); Trait = General disposition (always).",
        trapOptionExample: "Defining trait anxiety as pre-match nervousness before a final."
      }
    ],
    mnemonicsAndShortcuts: [
      {
        title: "State vs Trait",
        mnemonic: "State is Situation; Trait is Temperament",
        shortcut: "State = Situational / Temporary; Trait = Permanent / Personality.",
        whenToApply: "Sports psychology anxiety questions.",
        explanation: "Never confuse transient competitive anxiety (State) with enduring disposition (Trait)."
      }
    ],
    quickRevisionCard: {
      title: "Sports Psychology & Socialization — Flash Card",
      bulletPoints: [
        "Intrinsic Motivation: Self-driven, internal joy, mastery of skills, long-term persistence.",
        "Extrinsic Motivation: External rewards, trophies, cash prizes, social recognition.",
        "State Anxiety: Temporary, transient autonomic reaction to a specific competitive event.",
        "Trait Anxiety: Stable personality disposition to perceive competitive scenarios as threatening.",
        "Inverted-U Hypothesis (Yerkes-Dodson): Parabolic curve; optimal performance at moderate arousal.",
        "Fine motor tasks (archery, shooting) require LOWER optimal arousal.",
        "Gross motor tasks (sprinting, weightlifting) tolerate HIGHER optimal arousal.",
        "Hostile Aggression: Primary goal is to inflict bodily or psychological harm out of anger.",
        "Instrumental Aggression: Harm is used as a vehicle to secure victory or tactical advantage.",
        "Assertive Behavior: Forceful, enthusiastic play within official rules with NO intent to injure.",
        "Socialization: Internalization of teamwork, fair play, rule compliance, leadership, and national unity."
      ]
    },
    practiceQuestions: [
      {
        id: "ped_u2_q1",
        question: "Which form of motivation is characterized by participating in sport purely for personal satisfaction, joy, and the inner drive to master athletic skills?",
        type: "standard",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        options: [
          { id: "A", text: "Extrinsic Motivation" },
          { id: "B", text: "Intrinsic Motivation" },
          { id: "C", text: "Instrumental Motivation" },
          { id: "D", text: "Reactive Motivation" }
        ],
        correctOption: "B",
        explanation: "Intrinsic motivation originates from within the individual, driven by personal enjoyment, curiosity, and the inherent thrill of athletic mastery without needing external rewards."
      },
      {
        id: "ped_u2_q2",
        question: "Which type of anxiety represents a temporary, transient emotional state characterized by apprehension and autonomic arousal in response to a specific match situation?",
        type: "standard",
        questionType: "Direct Terminology",
        difficulty: "easy",
        options: [
          { id: "A", text: "Trait Anxiety" },
          { id: "B", text: "State Anxiety" },
          { id: "C", text: "Somatic Habituation" },
          { id: "D", text: "Cognitive Dissonance" }
        ],
        correctOption: "B",
        explanation: "State anxiety is situational and temporary, fluctuating directly with the perceived threat or stakes of a specific competitive moment."
      },
      {
        id: "ped_u2_q3",
        question: "In the Inverted-U Hypothesis (Yerkes-Dodson Law), which type of athletic sport typically requires a LOWER level of arousal for optimal performance?",
        type: "standard",
        questionType: "Skill Application",
        difficulty: "medium",
        options: [
          { id: "A", text: "Heavyweight Powerlifting" },
          { id: "B", text: "100m Sprint" },
          { id: "C", text: "Rifle Shooting and Archery" },
          { id: "D", text: "Rugby Tackle" }
        ],
        correctOption: "C",
        explanation: "Fine motor skills requiring steady hands, precise coordination, and intense concentration (such as rifle shooting and archery) perform best at low levels of arousal to prevent tremors."
      },
      {
        id: "ped_u2_q4",
        question: "A defender tackles an opposing striker aggressively to knock the ball away, intending only to dispossess the player within the rules, without any intent to injure. How is this behavior classified?",
        type: "standard",
        questionType: "Behavioral Classification",
        difficulty: "medium",
        options: [
          { id: "A", text: "Hostile Aggression" },
          { id: "B", text: "Instrumental Aggression" },
          { id: "C", text: "Assertive Behavior" },
          { id: "D", text: "Social loafing" }
        ],
        correctOption: "C",
        explanation: "Assertive behavior involves high physical intensity, determination, and force within the rules of the sport, completely lacking any intent to injure."
      },
      {
        id: "ped_u2_q5",
        question: "Which theory of aggression proposes that aggressive behavior in athletes is learned through observing coaches, role models, and media, followed by reinforcement?",
        type: "standard",
        questionType: "Theorist & Concept",
        difficulty: "medium",
        options: [
          { id: "A", text: "Instinct Theory (Freud)" },
          { id: "B", text: "Social Learning Theory (Bandura)" },
          { id: "C", text: "Frustration-Aggression Hypothesis (Dollard)" },
          { id: "D", text: "Drive Theory (Hull)" }
        ],
        correctOption: "B",
        explanation: "Albert Bandura's Social Learning Theory posits that aggressive behaviors are acquired through modeling, observational learning, and social reinforcement."
      },
      {
        id: "ped_u2_q6",
        question: "What term describes the phenomenon where an athlete's performance drastically collapses under extreme competitive pressure and over-arousal?",
        type: "standard",
        questionType: "Sport Psychology Term",
        difficulty: "easy",
        options: [
          { id: "A", text: "Choking" },
          { id: "B", text: "Habituation" },
          { id: "C", text: "Hyper-trophy" },
          { id: "D", text: "Pacing" }
        ],
        correctOption: "A",
        explanation: "'Choking under pressure' refers to the acute deterioration of athletic execution in high-stakes situations when anxiety overwhelms attentional focus."
      },
      {
        id: "ped_u2_q7",
        question: "Which of the following social qualities is developed through team sports when an athlete willingly accepts the referee's verdict and congratulates victorious opponents?",
        type: "standard",
        questionType: "Sociological Value",
        difficulty: "easy",
        options: [
          { id: "A", text: "Sportsmanship" },
          { id: "B", text: "Hostility" },
          { id: "C", text: "Ethnocentrism" },
          { id: "D", text: "Dogmatism" }
        ],
        correctOption: "A",
        explanation: "Sportsmanship encapsulates fair play, respect for officials, adherence to rules, and gracious behavior toward opponents in both victory and defeat."
      },
      {
        id: "ped_u2_q8",
        question: "Assertion (A): Extrinsic rewards such as trophies and scholarships can sometimes undermine an athlete's intrinsic love for the sport.\nReason (R): The Overjustification Effect occurs when external incentives shift an athlete's perceived locus of causality from internal enjoyment to external compulsion.",
        type: "assertion-reason",
        questionType: "Assertion-Reason",
        difficulty: "hard",
        options: [
          { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
          { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
          { id: "C", text: "(A) is true, but (R) is false." },
          { id: "D", text: "(A) is false, but (R) is true." }
        ],
        correctOption: "A",
        explanation: "Both (A) and (R) are true. Psychological research confirms that excessive external rewards can displace intrinsic joy via the overjustification effect."
      },
      {
        id: "ped_u2_q9",
        question: "Assertion (A): Hostile aggression and instrumental aggression both involve the deliberate intent to cause harm to an opponent.\nReason (R): In hostile aggression the primary goal is to cause pain and suffering, whereas in instrumental aggression the harm is a means to achieve a competitive outcome.",
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
        explanation: "Both statements are correct. Both forms share the defining criterion of intent to harm, but differ fundamentally in their end goals."
      },
      {
        id: "ped_u2_q10",
        question: "Match the Psychological Terms in List I with their Core Definition in List II:\nList I:\n(P) Trait Anxiety\n(Q) State Anxiety\n(R) Instrumental Aggression\n(S) Assertive Behavior\n\nList II:\n(1) Transient, situation-specific nervousness\n(2) General, stable personality disposition toward perceived threat\n(3) Forceful legal play with zero intent to harm\n(4) Inflicting harm intentionally to achieve a strategic victory",
        type: "match-the-following",
        questionType: "Match The Following",
        difficulty: "medium",
        options: [
          { id: "A", text: "P-2, Q-1, R-4, S-3" },
          { id: "B", text: "P-1, Q-2, R-4, S-3" },
          { id: "C", text: "P-2, Q-4, R-1, S-3" },
          { id: "D", text: "P-3, Q-1, R-4, S-2" }
        ],
        correctOption: "A",
        explanation: "Trait anxiety is permanent personality (P-2); State anxiety is temporary (Q-1); Instrumental aggression harms to win (R-4); Assertive behavior is forceful legal play without intent to harm (S-3). Matches A."
      }
    ]
  },
  {
    id: "physical_education_u3_t1",
    slug: "asanas-pranayama-kriyas-stress-management-through-yogic-lifestyle",
    subject: "physical_education",
    subjectName: "Physical Education",
    subjectCode: "321",
    unitNumber: 3,
    unitTitle: "Yoga and Yogic Practices",
    topicTitle: "Asanas, Pranayama, Kriyas, Stress Management through Yogic Lifestyle",
    ncertReference: {
      class: "12",
      book: "Yoga and Yogic Practices NCERT Class XII",
      chapterNumber: 3,
      chapterName: "Yoga as Preventive Care for Lifestyle Diseases",
      sections: ["3.1 Ashtanga Yoga: Eight Limbs of Patanjali", "3.2 Asanas for Obesity, Diabetes, Asthma, Hypertension", "3.3 Pranayama: Breathing Techniques and Physiological Impact", "3.4 Shatkarmas (Yogic Kriyas) & Stress Management"]
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Crucial scoring topic in CUET PE. Features specific asana contraindications, disease-asana mappings, and Patanjali's 8 limbs.",
      totalPyqsInRepo: 0,
      weightagePercentage: 20
    },
    summary30Seconds: [
      "Patanjali's Ashtanga Yoga (8 Limbs): Yama (social restraints), Niyama (personal observances), Asana (posture), Pranayama (breath control), Pratyahara (sense withdrawal), Dharana (concentration), Dhyana (meditation), Samadhi (self-realization).",
      "Asanas for Lifestyle Diseases: Obesity (Vajrasana, Trikonasana, Hastottanasana); Diabetes (Bhujangasana, Paschimottanasana, Ardha Matsyendrasana); Asthma (Sukhasana, Matsyasana, Gomukhasana); Hypertension (Tadasana, Shavasana, Vakrasana).",
      "Pranayama: Puraka (inhalation), Kumbhaka (retention), Rechaka (exhalation). Nadi Shodhana purifies energy channels; Bhramari calms nervous system.",
      "Shatkarmas (6 Cleansing Kriyas): Neti (nasal), Dhauti (digestive), Nauli (abdominal churning), Basti (colonic), Kapalabhati (frontal brain cleansing), Trataka (gazing)."
    ],
    coreConcepts: [
      {
        title: "1. Ashtanga Yoga: The Eightfold Path of Patanjali",
        content: "Sage Patanjali in the Yoga Sutras formulated Ashtanga Yoga (the eight limbs) to attain Kaivalya (liberation/mental stillness):\n1. Yama (Social Ethics / Moral Restraints): Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (continence/moderation), Aparigraha (non-possessiveness).\n2. Niyama (Personal Observances): Saucha (purity/cleanliness), Santosha (contentment), Tapas (disciplined austerity), Svadhyaya (self-study of scriptures), Ishvara Pranidhana (surrender to the divine).\n3. Asana: Steady and comfortable physical postures ('Sthira Sukham Asanam').\n4. Pranayama: Conscious regulation and control of vital life energy (Prana) via breathing.\n5. Pratyahara: Inward withdrawal of the senses from external sensory objects.\n6. Dharana: Fixing the mind onto a single focal object or point of concentration.\n7. Dhyana: Uninterrupted continuous flow of contemplation on that focal point.\n8. Samadhi: State of deep meditative absorption where the meditator and the object merge.",
        ncertPointers: [
          "Limbs 1 to 5 (Yama, Niyama, Asana, Pranayama, Pratyahara) constitute Bahiranga (External Yoga).",
          "Limbs 6 to 8 (Dharana, Dhyana, Samadhi) constitute Antaranga (Internal Yoga), collectively termed 'Samyama'."
        ]
      },
      {
        title: "2. Therapeutic Asanas for Lifestyle Diseases & Contraindications",
        content: "Asanas serve as preventive and curative health measures by stimulating endocrinological organs and toning the musculoskeletal system:\n- Obesity: Vajrasana (can be practiced immediately after meals, stimulates digestive fire/Jatharagni), Hastottanasana (stretches abdominal fat), Trikonasana, Ardha Matsyendrasana.\n- Diabetes Mellitus: Paschimottanasana (intense forward bend stimulates pancreas to secrete insulin), Bhujangasana (cobra pose stretches abdominal viscera), Ardha Matsyendrasana (spinal twist compresses and rejuvenates pancreatic islets of Langerhans), Pawanmuktasana.\n- Asthma: Matsyasana (fish pose opens thoracic chest cavity, enhances lung capacity), Gomukhasana (cow face pose expands intercostal muscles), Sukhasana, Bhujangasana.\n- Hypertension (High BP): Shavasana (corpse pose lowers sympathetic nervous tone, activates parasympathetic branch), Tadasana, Vakrasana. Contraindication: Inverted postures (Sirshasana, Sarvangasana) are STRICTLY contraindicated for hypertension patients.",
        ncertPointers: [
          "Vajrasana is the ONLY asana that can and should be practiced immediately after eating meals.",
          "Patients suffering from severe peptic ulcers or acute hernia must avoid intense back-bending and forward-bending asanas."
        ]
      },
      {
        title: "3. Pranayama and Shatkarmas (Yogic Cleansing)",
        content: "Pranayama consists of three distinct phases: Puraka (controlled inhalation), Kumbhaka (breath retention: Antar Kumbhaka inside, Bahir Kumbhaka outside), and Rechaka (controlled exhalation).\nKey Pranayamas:\n- Nadi Shodhana / Anuloma Viloma: Alternate nostril breathing balancing Ida (parasympathetic, left) and Pingala (sympathetic, right) nadis.\n- Bhramari: Humming bee exhalation that stimulates nitric oxide release, reduces cortisol, and induces deep parasympathetic calmness.\n- Ujjayi: Ocean sound breathing generated by mild glottis constriction.\n- Sheetali / Sheetkari: Cooling breaths through curled tongue or teeth, reducing core body temperature.\n\nShatkarmas (The 6 Cleansing Actions from Hatha Yoga Pradipika):\n1. Neti: Nasal cleansing (Jala Neti using saline water; Sutra Neti using thread).\n2. Dhauti: Cleansing of upper digestive tract (Vamana Dhauti / Vastra Dhauti).\n3. Nauli: Isolation and circular churning of rectus abdominis muscles.\n4. Basti: Yogic enema cleansing the lower colon.\n5. Kapalabhati: Rapid active exhalations with passive inhalations; cleanses frontal sinuses and purges stagnant CO₂.\n6. Trataka: Steady, unblinking gazing at an object or ghee lamp flame until tears flow; improves eyesight and concentration.",
        ncertPointers: [
          "Kapalabhati is technically a Shatkarma (cleansing kriya), although widely practiced as a pranayama.",
          "Kapalabhati and Bhastrika are strictly contraindicated for individuals with severe hypertension or heart disease due to acute spikes in thoracic pressure."
        ]
      }
    ],
    keyFormulasAndTables: [
      {
        name: "Ashtanga Yoga Hierarchy Table",
        formula: "Bahiranga: Yama -> Niyama -> Asana -> Pranayama -> Pratyahara | Antaranga: Dharana -> Dhyana -> Samadhi",
        symbols: "Patanjali 8 Limbs",
        siUnits: "Philosophical stages",
        applicationCondition: "Chronological sequence questions in CUET",
        notes: "Antaranga triad (Dharana, Dhyana, Samadhi) is called Samyama."
      },
      {
        name: "Disease vs Curative Asana Mapping",
        formula: "Diabetes: Paschimottanasana, Ardha Matsyendrasana | Asthma: Matsyasana, Gomukhasana | Obesity: Vajrasana, Trikonasana",
        symbols: "Therapeutic pairing",
        siUnits: "Asana therapy",
        applicationCondition: "Disease management multiple-choice matching",
        notes: "Hypertension strictly prohibits Sirshasana (headstand) and Sarvangasana."
      }
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%">
  <defs>
    <linearGradient id="ped3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#091b29"/>
      <stop offset="100%" stop-color="#0f2b46"/>
    </linearGradient>
    <linearGradient id="limbGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <linearGradient id="limbGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" rx="12" fill="url(#ped3Grad)"/>
  <text x="400" y="32" fill="#38bdf8" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">CUET Yoga &amp; Stress Management: Ashtanga &amp; Asana Therapy</text>
  
  <!-- Left Box: Ashtanga Yoga 8 Limbs -->
  <g transform="translate(30, 60)">
    <rect width="360" height="320" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
    <text x="180" y="25" fill="#7dd3fc" font-size="14" font-weight="bold" text-anchor="middle">Patanjali's Ashtanga Yoga (8 Limbs)</text>
    
    <!-- Bahiranga -->
    <rect x="20" y="45" width="320" height="145" rx="6" fill="#0369a1" opacity="0.2" stroke="#0284c7"/>
    <text x="30" y="65" fill="#38bdf8" font-size="12" font-weight="bold">Bahiranga Yoga (External 5 Limbs):</text>
    <text x="30" y="85" fill="#cbd5e1" font-size="10">1. Yama: Ahimsa, Satya, Asteya, Brahmacharya, Aparigraha</text>
    <text x="30" y="105" fill="#cbd5e1" font-size="10">2. Niyama: Saucha, Santosha, Tapas, Svadhyaya, Ishvara-P.</text>
    <text x="30" y="125" fill="#cbd5e1" font-size="10">3. Asana: Steady and comfortable posture</text>
    <text x="30" y="145" fill="#cbd5e1" font-size="10">4. Pranayama: Puraka, Kumbhaka, Rechaka</text>
    <text x="30" y="165" fill="#cbd5e1" font-size="10">5. Pratyahara: Withdrawal of senses inward</text>
    
    <!-- Antaranga -->
    <rect x="20" y="200" width="320" height="100" rx="6" fill="#6d28d9" opacity="0.2" stroke="#8b5cf6"/>
    <text x="30" y="220" fill="#c4b5fd" font-size="12" font-weight="bold">Antaranga Yoga / Samyama (Internal 3 Limbs):</text>
    <text x="30" y="240" fill="#cbd5e1" font-size="10">6. Dharana: Concentration on single focal point</text>
    <text x="30" y="260" fill="#cbd5e1" font-size="10">7. Dhyana: Unbroken stream of meditation</text>
    <text x="30" y="280" fill="#cbd5e1" font-size="10">8. Samadhi: Absorption &amp; self-realization (Kaivalya)</text>
  </g>

  <!-- Right Box: Asanas for Diseases & Shatkarmas -->
  <g transform="translate(420, 60)">
    <rect width="350" height="320" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="175" y="25" fill="#6ee7b7" font-size="14" font-weight="bold" text-anchor="middle">Therapeutic Asanas &amp; Shatkarmas</text>
    
    <!-- Disease Mapping -->
    <rect x="20" y="45" width="310" height="135" rx="6" fill="#047857" opacity="0.2" stroke="#10b981"/>
    <text x="30" y="65" fill="#34d399" font-size="12" font-weight="bold">Disease-Specific Asanas:</text>
    <text x="30" y="85" fill="#cbd5e1" font-size="10">• Diabetes: Paschimottanasana, Ardha Matsyendrasana</text>
    <text x="30" y="105" fill="#cbd5e1" font-size="10">• Asthma: Matsyasana (fish pose), Gomukhasana</text>
    <text x="30" y="125" fill="#cbd5e1" font-size="10">• Obesity: Vajrasana (post-meal!), Trikonasana</text>
    <text x="30" y="145" fill="#cbd5e1" font-size="10">• Hypertension: Shavasana, Tadasana (NO Headstand!)</text>
    <text x="30" y="165" fill="#fca5a5" font-size="9">Contraindication: Inversions prohibited in high BP</text>
    
    <!-- Shatkarmas -->
    <rect x="20" y="190" width="310" height="110" rx="6" fill="#d97706" opacity="0.2" stroke="#f59e0b"/>
    <text x="30" y="210" fill="#fcd34d" font-size="12" font-weight="bold">Shatkarmas (6 Cleansing Kriyas):</text>
    <text x="30" y="230" fill="#cbd5e1" font-size="10">1. Neti (Nasal)  2. Dhauti (Digestive)  3. Nauli (Churning)</text>
    <text x="30" y="250" fill="#cbd5e1" font-size="10">4. Basti (Colon) 5. Kapalabhati (Skull) 6. Trataka (Gazing)</text>
    <text x="30" y="275" fill="#fde68a" font-size="10">Pranayama: Puraka (Inhale), Kumbhaka (Hold),</text>
    <text x="30" y="290" fill="#fde68a" font-size="10">Rechaka (Exhale). Bhramari calms cortisol.</text>
  </g>

  <text x="400" y="405" fill="#64748b" font-size="11" text-anchor="middle">NCERT Class 12 Physical Education • Yogic Science &amp; Preventive Health</text>
</svg>`,
    workedExamples: [
      {
        questionNumber: 1,
        question: "Which of the following asanas is explicitly recommended to be performed immediately after consuming a full meal to facilitate digestion and prevent obesity?",
        options: [
          { id: "A", text: "Bhujangasana" },
          { id: "B", text: "Paschimottanasana" },
          { id: "C", text: "Vajrasana" },
          { id: "D", text: "Halasana" }
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Most yoga asanas require an empty stomach with at least 4 hours after a full meal.",
          "Step 2: Vajrasana (Thunderbolt pose / Diamond pose) alters blood circulation by reducing blood flow to the lower limbs and channeling blood to the pelvic and abdominal digestive organs.",
          "Step 3: This stimulates digestive enzymes and Jatharagni, making it the solitary asana recommended post-meal.",
          "Conclusion: Option C (Vajrasana) is correct."
        ],
        cuetTip: "Remember: Vajrasana is the ONLY asana practiced after eating meals. It is a recurring CUET question!"
      },
      {
        questionNumber: 2,
        question: "Arrange the first five limbs of Patanjali's Ashtanga Yoga (Bahiranga Yoga) in correct chronological order:\n(1) Asana\n(2) Niyama\n(3) Pratyahara\n(4) Yama\n(5) Pranayama",
        options: [
          { id: "A", text: "4 -> 2 -> 1 -> 5 -> 3" },
          { id: "B", text: "2 -> 4 -> 1 -> 5 -> 3" },
          { id: "C", text: "4 -> 1 -> 2 -> 5 -> 3" },
          { id: "D", text: "1 -> 2 -> 4 -> 5 -> 3" }
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: Patanjali's eight limbs are enumerated sequentially in the Yoga Sutras.",
          "Step 2: 1st limb is Yama (4), 2nd is Niyama (2), 3rd is Asana (1), 4th is Pranayama (5), 5th is Pratyahara (3).",
          "Step 3: The correct chronological order is 4 -> 2 -> 1 -> 5 -> 3.",
          "Conclusion: Option A is correct."
        ],
        cuetTip: "Mnemonic: Y-N-A-P-P-D-D-S (Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi)."
      }
    ],
    howCuetAsksThis: [
      {
        type: "Contraindication Alert",
        frequency: "High (2 questions)",
        typicalStem: "Which asana is strictly contraindicated for individuals suffering from severe hypertension and cardiovascular disease?",
        strategy: "Look for inverted postures like Sirshasana (headstand) or Sarvangasana (shoulder stand) which increase intracranial arterial pressure."
      },
      {
        type: "Match The Following",
        frequency: "High (2 questions)",
        typicalStem: "Match the Shatkarma in List I with its Anatomical Cleansing Area in List II (Neti, Dhauti, Nauli, Kapalabhati).",
        strategy: "Neti = Nasal passages; Dhauti = Upper digestive tract; Nauli = Abdominal churning; Kapalabhati = Frontal brain/skull."
      }
    ],
    commonTraps: [
      {
        misconception: "Thinking Kapalabhati is primarily an asana.",
        whyWrong: "In classical Hatha Yoga texts, Kapalabhati is classified as one of the six Shatkarmas (cleansing kriyas), not an asana.",
        correctUnderstanding: "Kapalabhati is a Shatkarma (frontal skull cleansing) involving active forced exhalations.",
        trapOptionExample: "Classifying Kapalabhati as an inverted asana."
      },
      {
        misconception: "Confusing Dharana and Dhyana.",
        whyWrong: "Dharana is initial focused concentration on a point; Dhyana is the sustained, unbroken continuous flow of meditative awareness.",
        correctUnderstanding: "Dharana leads into Dhyana.",
        trapOptionExample: "Defining Dharana as unbroken continuous meditation."
      }
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Ashtanga Yoga Limbs",
        mnemonic: "You Never Ask Parents Practical Decision During Stress",
        shortcut: "Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi.",
        whenToApply: "Sequence questions for Patanjali's 8 limbs.",
        explanation: "Ensures error-free ordering of the 8 stages."
      }
    ],
    quickRevisionCard: {
      title: "Yoga & Stress Management — Flash Card",
      bulletPoints: [
        "Ashtanga Yoga: Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi.",
        "Bahiranga (External): First 5 limbs; Antaranga (Internal/Samyama): Last 3 limbs.",
        "Yama (5 Restraints): Ahimsa, Satya, Asteya, Brahmacharya, Aparigraha.",
        "Niyama (5 Observances): Saucha, Santosha, Tapas, Svadhyaya, Ishvara Pranidhana.",
        "Vajrasana: The ONLY asana recommended immediately following food consumption.",
        "Diabetes: Paschimottanasana & Ardha Matsyendrasana (stimulate pancreatic islets).",
        "Asthma: Matsyasana & Gomukhasana (expand thoracic lung volume).",
        "Hypertension: Shavasana & Tadasana; Inverted poses (Sirshasana) strictly forbidden.",
        "Pranayama: Puraka (Inhale), Kumbhaka (Retention), Rechaka (Exhale).",
        "Shatkarmas: Neti (nasal), Dhauti (stomach), Nauli (abdominal), Basti (colon), Kapalabhati (skull), Trataka (eyes)."
      ]
    },
    practiceQuestions: [
      {
        id: "ped_u3_q1",
        question: "According to Patanjali's Yoga Sutras, which of the following is NOT one of the five moral restraints (Yamas)?",
        type: "standard",
        questionType: "Taxonomy Direct",
        difficulty: "easy",
        options: [
          { id: "A", text: "Ahimsa (Non-violence)" },
          { id: "B", text: "Satya (Truthfulness)" },
          { id: "C", text: "Santosha (Contentment)" },
          { id: "D", text: "Aparigraha (Non-possessiveness)" }
        ],
        correctOption: "C",
        explanation: "Santosha (Contentment) is a Niyama (personal observance), not a Yama. The five Yamas are Ahimsa, Satya, Asteya, Brahmacharya, and Aparigraha."
      },
      {
        id: "ped_u3_q2",
        question: "Which of the following asanas involves an intense forward bend that massages and stimulates the pancreas, aiding in blood glucose regulation for diabetic individuals?",
        type: "standard",
        questionType: "Therapeutic Asana",
        difficulty: "medium",
        options: [
          { id: "A", text: "Paschimottanasana" },
          { id: "B", text: "Trikonasana" },
          { id: "C", text: "Shavasana" },
          { id: "D", text: "Vrikshasana" }
        ],
        correctOption: "A",
        explanation: "Paschimottanasana (Seated Forward Bend) compresses the abdominal viscera, stimulating the pancreatic beta cells to produce insulin and improving glycemic control."
      },
      {
        id: "ped_u3_q3",
        question: "Why are inverted asanas such as Sirshasana (Headstand) and Sarvangasana strictly contraindicated for patients suffering from High Blood Pressure (Hypertension)?",
        type: "standard",
        questionType: "Contraindication Rationale",
        difficulty: "medium",
        options: [
          { id: "A", text: "They induce hypothermia in leg muscles" },
          { id: "B", text: "They drastically increase hydrostatic blood pressure in cranial and retinal blood vessels" },
          { id: "C", text: "They cause excessive digestion of food" },
          { id: "D", text: "They inhibit lung oxygen intake" }
        ],
        correctOption: "B",
        explanation: "Inverted postures invert hydrostatic pressure, channeling massive arterial blood flow to the head, which can precipitate cerebrovascular hemorrhage (stroke) or retinal damage in hypertensive individuals."
      },
      {
        id: "ped_u3_q4",
        question: "Which phase of Pranayama corresponds to the controlled, deliberate retention of breath inside the lungs?",
        type: "standard",
        questionType: "Pranayama Anatomy",
        difficulty: "easy",
        options: [
          { id: "A", text: "Puraka" },
          { id: "B", text: "Rechaka" },
          { id: "C", text: "Antar Kumbhaka" },
          { id: "D", text: "Pratyahara" }
        ],
        correctOption: "C",
        explanation: "Kumbhaka is breath retention. Inhalation is Puraka; holding the breath inside is Antar Kumbhaka; holding breath outside after exhalation is Bahir Kumbhaka; exhalation is Rechaka."
      },
      {
        id: "ped_u3_q5",
        question: "Which Shatkarma involves gazing unblinkingly at an external flame or small point until involuntary tears flow, designed to cleanse the tear ducts and enhance mental focus?",
        type: "standard",
        questionType: "Kriya Direct",
        difficulty: "easy",
        options: [
          { id: "A", text: "Nauli" },
          { id: "B", text: "Trataka" },
          { id: "C", text: "Dhauti" },
          { id: "D", text: "Neti" }
        ],
        correctOption: "B",
        explanation: "Trataka is the yogic cleansing kriya of steady gazing at an object (such as a candle flame) without blinking until tears are produced, purifying the eyes and calming the mind."
      },
      {
        id: "ped_u3_q6",
        question: "In Hatha Yoga, the isolation and rhythmic circular churning of the abdominal rectus muscles is known as:",
        type: "standard",
        questionType: "Kriya Identification",
        difficulty: "medium",
        options: [
          { id: "A", text: "Basti" },
          { id: "B", text: "Nauli" },
          { id: "C", text: "Neti" },
          { id: "D", text: "Uddiyana" }
        ],
        correctOption: "B",
        explanation: "Nauli is one of the six Shatkarmas, consisting of contracting and isolating the abdominal muscles (rectus abdominis) and rolling them from left to right and right to left."
      },
      {
        id: "ped_u3_q7",
        question: "Which Pranayama is characterized by making a soft humming bee sound during exhalation, known to stimulate nitric oxide production and reduce stress hormones?",
        type: "standard",
        questionType: "Pranayama Specifics",
        difficulty: "easy",
        options: [
          { id: "A", text: "Bhramari" },
          { id: "B", text: "Sheetali" },
          { id: "C", text: "Bhastrika" },
          { id: "D", text: "Surya Bhedana" }
        ],
        correctOption: "A",
        explanation: "Bhramari Pranayama derives its name from the Indian black bee (Bhramari); exhalation is accompanied by a resonant humming vibration that induces deep parasympathetic relaxation."
      },
      {
        id: "ped_u3_q8",
        question: "Assertion (A): Practicing Matsyasana (Fish pose) is therapeutically advantageous for bronchial asthma patients.\nReason (R): Matsyasana hyperextends the cervical and dorsal spine, elevating the thoracic cage and significantly expanding pulmonary lung volume.",
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
        explanation: "Both statements are true. By arching the chest and throat backward, Matsyasana opens the intercostal muscles and enhances lung capacity, alleviating asthmatic spasms."
      },
      {
        id: "ped_u3_q9",
        question: "Assertion (A): The last three limbs of Ashtanga Yoga—Dharana, Dhyana, and Samadhi—are collectively designated as 'Bahiranga Yoga'.\nReason (R): These three practices are internal mental disciplines performed without visible bodily movement, formally termed 'Samyama'.",
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
        explanation: "Assertion (A) is false because Dharana, Dhyana, and Samadhi are Antaranga (Internal Yoga), not Bahiranga (which includes limbs 1 to 5). Reason (R) is true."
      },
      {
        id: "ped_u3_q10",
        question: "Match the Ashtanga Yoga Limbs in List I with their Essential Meaning in List II:\nList I:\n(P) Saucha\n(Q) Aparigraha\n(R) Pratyahara\n(S) Sthira Sukham\n\nList II:\n(1) Non-possessiveness / non-greed\n(2) Internal and external purity\n(3) Steady and comfortable posture\n(4) Sensory withdrawal from external stimuli",
        type: "match-the-following",
        questionType: "Match The Following",
        difficulty: "medium",
        options: [
          { id: "A", text: "P-2, Q-1, R-4, S-3" },
          { id: "B", text: "P-1, Q-2, R-4, S-3" },
          { id: "C", text: "P-2, Q-4, R-1, S-3" },
          { id: "D", text: "P-3, Q-1, R-4, S-2" }
        ],
        correctOption: "A",
        explanation: "Saucha = Cleanliness/Purity (P-2); Aparigraha = Non-possessiveness (Q-1); Pratyahara = Sense withdrawal (R-4); Sthira Sukham = Asana definition (S-3). Matches A."
      }
    ]
  }
];
