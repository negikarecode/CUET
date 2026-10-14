import { NoteDocument } from "@/types/notes";

export const historyUnits5to8Topics: NoteDocument[] = [
  // -------------------------------------------------------------------------
  // UNIT 5: Through the Eyes of Travellers - Perceptions of Society
  // -------------------------------------------------------------------------
  {
    id: "history_u5_t1",
    slug: "al-biruni-ibn-battuta-francois-bernier-insights-on-society-and-caste",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 5,
    unitTitle: "Medieval Society through Travellers Accounts",
    topicTitle: "Al-Biruni, Ibn Battuta, Francois Bernier: Insights on Society and Caste",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part II",
      chapterNumber: 5,
      chapterName: "Through the Eyes of Travellers: Perceptions of Society (c. 10th - 17th Century)",
      sections: [
        "1. Al-Biruni and the Kitab-ul-Hind",
        "2. Ibn Battuta's Rihla",
        "3. Francois Bernier: A Doctor with a Difference",
        "4. Women: Slaves, Sati and Labourers",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Very High (4-6 questions per shift)",
      totalPyqsInRepo: 64,
      weightagePercentage: 12,
      expectedQuestions: "4-5 MCQs on Kitab-ul-Hind structure, Ibn Battuta's postal system (Uluq & Dawa), Bernier's crown ownership thesis, and travellers' origins",
      typicalQuestionTypes: [
        "Match the Following (Traveller, native country, text, patron monarch)",
        "Chronological ordering of foreign travellers to India (Al-Biruni -> Ibn Battuta -> Bernier)",
        "Statement I & II on Uluq (horse post) vs Dawa (foot post)",
        "Assertion-Reason on Bernier's European bias and concept of 'Camp Towns'",
      ],
    },
    summary30s: [
      "Al-Biruni (from Khwarizm, modern Uzbekistan) came with Mahmud of Ghazni; wrote 'Kitab-ul-Hind' in Arabic across 80 chapters using a geometric/philosophical format.",
      "Al-Biruni identified 3 barriers to understanding India: Sanskrit language, religious beliefs/practices, and the insular self-absorption of Brahmanas.",
      "Ibn Battuta (from Tangier, Morocco) travelled across 73,000 miles, reached Delhi in 1334; appointed Qazi of Delhi by Muhammad bin Tughlaq; authored 'Rihla' in Arabic.",
      "Ibn Battuta detailed Indian urban life and the postal communication system: Uluq (horse post stationed every 4 miles) and Dawa (foot post with 3 stations per mile).",
      "Francois Bernier (French physician/philosopher, 1656-1668) dedicated writings to Louis XIV; argued lack of private property in land caused Mughal decay ('Oriental Despotism').",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "Al-Biruni and the Kitab-ul-Hind",
        explanation:
          "Al-Biruni was born in 973 CE in Khwarizm (modern Uzbekistan) and was well-versed in Syriac, Arabic, Persian, Hebrew, and Sanskrit (though not Greek). He accompanied Sultan Mahmud of Ghazni to India. His monumental Arabic text, 'Kitab-ul-Hind' (written in 1030 CE), consists of 80 chapters covering religion, philosophy, festivals, astronomy, manners, customs, weights, measures, iconography, and laws. Each chapter follows a distinctive geometric structure: beginning with a question, followed by an explanation based on Sanskrit traditions, and ending with a comparison with other cultures.",
        ncertPointer: "Themes in Indian History Part II, Section 1: 'Al-Biruni and the Kitab-ul-Hind'",
        examTip: "Al-Biruni compared the 4 varnas of India with ancient Persia's 4 social categories (knights/princes, monks/fire-priests, lawyers/physicians/astronomers, peasants/artisans).",
      },
      {
        id: "c2",
        title: "Ibn Battuta and the Communication Network (Rihla)",
        explanation:
          "Ibn Battuta came from Tangier (Morocco) and arrived in Delhi via Sindh in 1333-34. Muhammad bin Tughlaq, impressed by his scholarship, appointed him Qazi (judge) of Delhi. His travelogue 'Rihla' provides vivid accounts of Indian cities (describing Delhi as the largest city with massive fortifications and 28 gates, alongside Daulatabad) and trade networks. He was astonished by the efficient postal system: 'Uluq' was the horse post run by royal horses stationed every 4 miles; 'Dawa' was the foot post with three stations per mile. Through this network, goods from Sindh reached Delhi in 5 days, while normal travel took 50 days.",
        ncertPointer: "Themes in Indian History Part II, Section 2: 'Ibn Battuta's Rihla'",
        examTip: "CUET favorite: Uluq = horse post (every 4 miles); Dawa = foot post (3 stops per mile, 1/3 mile apart).",
      },
      {
        id: "c3",
        title: "Francois Bernier and the Crown Ownership Thesis",
        explanation:
          "Francois Bernier was a French physician, political philosopher, and historian who lived in Mughal India from 1656 to 1668, serving as physician to Prince Dara Shikoh and later associated with Danishmand Khan. In 'Travels in the Mogul Empire', dedicated to King Louis XIV of France, Bernier constantly contrasted Mughal India with contemporary Europe, painting India as impoverished and backward. His central thesis was that the Mughal Emperor was the sole owner of all land ('Crown ownership of land'). He argued that because landholders could not pass land to their heirs, they had no incentive to invest in long-term improvement, ruining agriculture. Montesquieu used this to develop 'Oriental Despotism', and Karl Marx developed the 'Asiatic Mode of Production'.",
        ncertPointer: "Themes in Indian History Part II, Section 3",
        examTip: "Bernier called Mughal cities 'Camp Towns'—towns that owed their existence and survival entirely to the presence of the imperial court.",
      },
      {
        id: "c4",
        title: "Accounts of Women, Sati, and Artisanal Reality",
        explanation:
          "Travellers paid close attention to women. Bernier left a gruesome, emotional description of a child-widow forced into Sati at Lahore. Ibn Battuta observed that female slaves were openly traded in markets; Sultan Muhammad bin Tughlaq employed female slaves as spies, domestic servants, and musicians/singers (at the wedding of his sister). Furthermore, Abul Fazl's official records demonstrate that Bernier's thesis of absolute crown ownership was an oversimplification: peasants retained hereditary occupancy rights, and state demand was a tax on crop yield (kharaj), not landlord rent.",
        ncertPointer: "Themes in Indian History Part II, Section 4",
        examTip: "Official Mughal records show land revenue was called 'mal'—a remuneration for imperial sovereignty/protection, not rent for state-owned land.",
      },
    ],
    keyFormulas: [
      {
        name: "Ibn Battuta's Postal Speed Differential",
        formula: "\\text{Ordinary Travel Time (Sindh to Delhi)} = 50 \\text{ days} \\quad \\xrightarrow{\\text{Postal Relay (Uluq/Dawa)}} \\quad \\text{News/Fruit Delivery} = 5 \\text{ days}",
        symbols: "Uluq = 4 miles (horses); Dawa = 1/3 mile (foot couriers carrying rods with copper bells)",
        siUnits: "Speed Relay",
        whenToUse: "Questions on Sultanate communication and intelligence networks.",
      },
      {
        name: "Foreign Travellers Chronology & Provenance",
        formula: "\\text{Al-Biruni (Uzbekistan, 1017)} \\rightarrow \\text{Ibn Battuta (Morocco, 1333)} \\rightarrow \\text{Bernier (France, 1656)}",
        symbols: "Texts: Kitab-ul-Hind (Arabic), Rihla (Arabic), Travels in the Mogul Empire (French)",
        siUnits: "Historiographical Sequence",
        whenToUse: "Chronological matching and text-author associations.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Three Travellers: Origin, Methodology, and Ideology",
      caption: "Comparative matrix of Al-Biruni, Ibn Battuta, and Francois Bernier",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">MEDIEVAL TRAVELLERS THROUGH THE EYES OF HISTORIANS</text>

  <!-- Card 1: Al-Biruni -->
  <rect x="40" y="60" width="220" height="300" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="150" y="90" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">AL-BIRUNI (1030 CE)</text>
  <text x="150" y="110" textAnchor="middle" fill="#92400e" fontSize="11">Origin: Khwarizm (Uzbekistan)</text>
  <rect x="55" y="125" width="190" height="40" fill="#ffffff" rx="4" />
  <text x="150" y="145" textAnchor="middle" fill="#78350f" fontSize="12" fontWeight="bold">Kitab-ul-Hind (Arabic)</text>
  <text x="150" y="158" textAnchor="middle" fill="#78350f" fontSize="10">80 Chapters (Geometric method)</text>
  <text x="60" y="195" fill="#78350f" fontSize="10" fontWeight="bold">Key Focus:</text>
  <text x="60" y="215" fill="#78350f" fontSize="10">• Translating Sanskrit texts</text>
  <text x="60" y="235" fill="#78350f" fontSize="10">• 3 Barriers to understanding</text>
  <text x="60" y="255" fill="#78350f" fontSize="10">• Rejection of pollution notion</text>
  <text x="60" y="275" fill="#78350f" fontSize="10">• Varna compared with Persia</text>

  <!-- Card 2: Ibn Battuta -->
  <rect x="290" y="60" width="220" height="300" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="6" />
  <text x="400" y="90" textAnchor="middle" fill="#0369a1" fontSize="14" fontWeight="bold">IBN BATTUTA (1333 CE)</text>
  <text x="400" y="110" textAnchor="middle" fill="#0369a1" fontSize="11">Origin: Tangier (Morocco)</text>
  <rect x="305" y="125" width="190" height="40" fill="#ffffff" rx="4" />
  <text x="400" y="145" textAnchor="middle" fill="#0c4a6e" fontSize="12" fontWeight="bold">Rihla (Arabic)</text>
  <text x="400" y="158" textAnchor="middle" fill="#0c4a6e" fontSize="10">Appointed Qazi of Delhi</text>
  <text x="310" y="195" fill="#0c4a6e" fontSize="10" fontWeight="bold">Key Focus:</text>
  <text x="310" y="215" fill="#0c4a6e" fontSize="10">• Postal relay: Uluq &amp; Dawa</text>
  <text x="310" y="235" fill="#0c4a6e" fontSize="10">• Delhi's 28 gates &amp; bazaars</text>
  <text x="310" y="255" fill="#0c4a6e" fontSize="10">• Exotica: Paan and Coconut</text>
  <text x="310" y="275" fill="#0c4a6e" fontSize="10">• Female slaves &amp; commerce</text>

  <!-- Card 3: Francois Bernier -->
  <rect x="540" y="60" width="220" height="300" fill="#fce7f3" stroke="#db2777" strokeWidth="2" rx="6" />
  <text x="650" y="90" textAnchor="middle" fill="#9d174d" fontSize="14" fontWeight="bold">FRANCOIS BERNIER (1656)</text>
  <text x="650" y="110" textAnchor="middle" fill="#9d174d" fontSize="11">Origin: France (Physician)</text>
  <rect x="555" y="125" width="190" height="40" fill="#ffffff" rx="4" />
  <text x="650" y="145" textAnchor="middle" fill="#831843" fontSize="12" fontWeight="bold">Travels in Mogul Empire</text>
  <text x="650" y="158" textAnchor="middle" fill="#831843" fontSize="10">Dedicated to Louis XIV</text>
  <text x="560" y="195" fill="#831843" fontSize="10" fontWeight="bold">Key Focus:</text>
  <text x="560" y="215" fill="#831843" fontSize="10">• Crown land ownership thesis</text>
  <text x="560" y="235" fill="#831843" fontSize="10">• Camp towns dependency</text>
  <text x="560" y="255" fill="#831843" fontSize="10">• Eyewitness to child Sati</text>
  <text x="560" y="275" fill="#831843" fontSize="10">• Shaped Oriental Despotism</text>

  <!-- Footer Banner -->
  <rect x="40" y="375" width="720" height="30" fill="#f1f5f9" rx="4" />
  <text x="400" y="395" textAnchor="middle" fill="#334155" fontSize="11">
    Key Distinction: Uluq = Horse post (every 4 miles); Dawa = Foot post (3 stations per mile)
  </text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">MEDIEVAL TRAVELLERS THROUGH THE EYES OF HISTORIANS</text>
  <rect x="40" y="60" width="220" height="300" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="150" y="90" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">AL-BIRUNI (1030 CE)</text>
  <rect x="290" y="60" width="220" height="300" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="6" />
  <text x="400" y="90" textAnchor="middle" fill="#0369a1" fontSize="14" fontWeight="bold">IBN BATTUTA (1333 CE)</text>
  <rect x="540" y="60" width="220" height="300" fill="#fce7f3" stroke="#db2777" strokeWidth="2" rx="6" />
  <text x="650" y="90" textAnchor="middle" fill="#9d174d" fontSize="14" fontWeight="bold">FRANCOIS BERNIER (1656)</text>
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "In the 14th century, the postal system in India described by Ibn Battuta consisted of two types:\n(i) Uluq, which was the horse post stationed every 4 miles.\n(ii) Dawa, which was the foot post stationed at three stops per mile.\nWhich of the statements is/are correct?\n(A) (i) only\n(B) (ii) only\n(C) Both (i) and (ii)\n(D) Neither (i) nor (ii)",
        options: [
          { id: "A", text: "(i) only" },
          { id: "B", text: "(ii) only" },
          { id: "C", text: "Both (i) and (ii)" },
          { id: "D", text: "Neither (i) nor (ii)" },
        ],
        correctOption: "C",
        explanation:
          "According to Ibn Battuta's Rihla, the horse-post was called 'uluq', stationed at a distance of four miles (run by royal horses). The foot-post was called 'dawa', with three stations per mile (one-third of a mile apart). Both statements are completely correct.",
        solutionStepByStep: [
          "Step 1: Verify 'Uluq': Horse post stationed every four miles (four kros). True.",
          "Step 2: Verify 'Dawa': Foot post stationed at intervals of one-third of a mile (three stations per mile). True.",
          "Conclusion: Option C (Both (i) and (ii)) is correct.",
        ],
        cuetPattern: "Direct definition of Sultanate postal logistics from NCERT Theme 5.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "Which of the following European concepts was heavily influenced by Francois Bernier's assertion that the Mughal Emperor was the sole owner of all agricultural land?\n(A) Utilitarianism\n(B) Oriental Despotism\n(C) Social Darwinism\n(D) Mercantilism",
        options: [
          { id: "A", text: "Utilitarianism" },
          { id: "B", text: "Oriental Despotism" },
          { id: "C", text: "Social Darwinism" },
          { id: "D", text: "Mercantilism" },
        ],
        correctOption: "B",
        explanation:
          "Bernier's descriptions influenced French philosopher Montesquieu, who used his account to develop the concept of 'Oriental Despotism', arguing that Asian monarchs exercised absolute authority because subjects possessed no private property.",
        solutionStepByStep: [
          "Step 1: Recall Bernier's crown ownership thesis.",
          "Step 2: Montesquieu read Bernier and formulated 'Oriental Despotism' based on the supposed absence of private landed property in Asia.",
          "Conclusion: Option B is correct.",
        ],
        cuetPattern: "Intellectual influence of travellers on Western political philosophy.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Traveller Provenance Matching",
        frequency: "Very High",
        typicalStem: "Match the foreign traveller with their native country: Duarte Barbosa - Portugal; Bernier - France; Manucci - Italy; Al-Biruni - Uzbekistan.",
        strategy: "Memorize the native land of all 6 travellers listed in NCERT timeline.",
      },
      {
        patternType: "Al-Biruni 3 Barriers Analysis",
        frequency: "High",
        typicalStem: "Which of the following was NOT identified by Al-Biruni as a barrier to understanding Indian society?",
        strategy: "The 3 barriers were: (1) Sanskrit language, (2) Religious divergence, (3) Insularity of Brahmanas. Any other option is false.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming Al-Biruni wrote the Kitab-ul-Hind in Persian.",
        correctConcept: "Kitab-ul-Hind was written in simple, lucid ARABIC, not Persian.",
        whyTrapWorks: "Al-Biruni lived in Khwarizm and Ghazni where Persian was spoken, leading students to select Persian.",
        cuetWarning: "Kitab-ul-Hind = Arabic; Rihla = Arabic; Baburnama = Chagatai Turkish; Akbarnama = Persian.",
      },
      {
        misconception: "Believing Bernier praised the Mughal economy as more prosperous than France.",
        correctConcept: "Bernier was deeply Eurocentric. He systematically depicted Mughal India as degenerate, lacking private property, and plagued by misery compared to France.",
        whyTrapWorks: "Students assume foreign travellers were fascinated and wrote glowing tributes.",
        cuetWarning: "Bernier's explicit goal was to warn Louis XIV against policies that might make France resemble the Mughal Empire.",
      },
    ],
    mnemonics: [
      {
        title: "Postal Stations (U-4, D-1/3)",
        mnemonic: "Unicorns 4 Miles, Dogs 1/3 Mile",
        expansion: "Uluq = 4 miles (horses); Dawa = 1/3 of a mile (foot runners)",
        context: "Instantly prevents mixing up the numbers 4 and 1/3 in CUET postal questions.",
      },
    ],
    quickRevisionCard: {
      title: "Travellers' Accounts High-Yield Revision",
      bulletPoints: [
        "Al-Biruni: From Khwarizm (Uzbekistan); 1030 CE wrote Kitab-ul-Hind in Arabic (80 chapters).",
        "Al-Biruni's 3 Barriers: Sanskrit language, religious beliefs, insular self-absorption of Brahmanas.",
        "Caste Observation: Disapproved of pollution notion as violating laws of nature (sun cleanses air, salt purifies water).",
        "Ibn Battuta: From Tangier (Morocco); 1333 reached Delhi, served Muhammad bin Tughlaq as Qazi.",
        "Rihla: Written in Arabic; described Delhi (28 gates, Budaun gate largest) and Daulatabad.",
        "Postal Relay: Uluq (horse post, every 4 miles) and Dawa (foot post, 3 stations per mile).",
        "Francois Bernier: French physician (1656-1668); dedicated book to Louis XIV.",
        "Crown Ownership Thesis: Claimed Mughal king owned all land, causing agricultural ruin and lack of private property.",
        "Camp Towns: Bernier's term for Mughal cities reliant entirely on imperial court presence.",
        "Other Travellers: Duarte Barbosa (Portuguese, wrote on South Indian trade); Niccolao Manucci (Italian physician, settled in India).",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u5_q1",
        questionNumber: 1,
        question: "In which language was Al-Biruni's famous work 'Kitab-ul-Hind' composed?",
        options: [
          { id: "A", text: "Persian" },
          { id: "B", text: "Arabic" },
          { id: "C", text: "Sanskrit" },
          { id: "D", text: "Turkish" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Al-Biruni's Kitab-ul-Hind was written in Arabic, divided into 80 chapters on various subjects.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u5_q2",
        questionNumber: 2,
        question: "Which Moroccan traveler was appointed as the Qazi (judge) of Delhi by Sultan Muhammad bin Tughlaq?",
        options: [
          { id: "A", text: "Al-Biruni" },
          { id: "B", text: "Ibn Battuta" },
          { id: "C", text: "Abdur Razzaq" },
          { id: "D", text: "Francois Bernier" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Ibn Battuta from Morocco arrived in Delhi in 1334 and was appointed Qazi of Delhi by Muhammad bin Tughlaq.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u5_q3",
        questionNumber: 3,
        question: "According to Ibn Battuta, the foot-post system in India, which had three stations per mile, was known as:",
        options: [
          { id: "A", text: "Uluq" },
          { id: "B", text: "Dawa" },
          { id: "C", text: "Kharaj" },
          { id: "D", text: "Muqaddam" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The foot-post was called 'dawa', which was stationed at one-third of a mile intervals (three stations per mile).",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u5_q4",
        questionNumber: 4,
        question: "Who among the following travellers was a French physician who served at the court of Prince Dara Shikoh?",
        options: [
          { id: "A", text: "Jean-Baptiste Tavernier" },
          { id: "B", text: "Francois Bernier" },
          { id: "C", text: "Niccolao Manucci" },
          { id: "D", text: "Peter Mundy" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Francois Bernier was a French physician who was closely associated with Prince Dara Shikoh and later Danishmand Khan.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u5_q5",
        questionNumber: 5,
        question: "Which of the following was NOT one of the three barriers to understanding Indian society identified by Al-Biruni?",
        options: [
          { id: "A", text: "The Sanskrit language, which was deeply distinct from Arabic and Persian" },
          { id: "B", text: "Differences in religious beliefs and practices" },
          { id: "C", text: "The self-absorption and insularity of the local population (Brahmanas)" },
          { id: "D", text: "The hostility of the Delhi Sultans towards foreign scholars" },
        ],
        correctOption: "D",
        correctAnswer: "(D)",
        explanation: "Al-Biruni identified Sanskrit, religious differences, and Brahmanical insularity as the three barriers. Delhi Sultanate did not even exist during Al-Biruni's time (1017-1030 CE).",
        questionType: "Except Pattern Analysis",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u5_q6",
        questionNumber: 6,
        question: "What term did Francois Bernier use to describe Mughal urban settlements, arguing they were completely dependent on imperial patronage for their survival?",
        options: [
          { id: "A", text: "Camp Towns" },
          { id: "B", text: "Temple Towns" },
          { id: "C", text: "Port Cities" },
          { id: "D", text: "Garrison Towns" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Bernier called Mughal 17th-century cities 'camp towns', by which he meant towns that owed their existence and survival to the imperial camp.",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u5_q7",
        questionNumber: 7,
        question: "Match List-I (Traveller) with List-II (Native Country):\nList-I:\n(A) Duarte Barbosa\n(B) Jean-Baptiste Tavernier\n(C) Niccolao Manucci\n(D) Abdur Razzaq Samarqandi\n\nList-II:\n1. Herat (Persia)\n2. Portugal\n3. France\n4. Italy",
        options: [
          { id: "A", text: "A-2, B-3, C-4, D-1" },
          { id: "B", text: "A-3, B-2, C-1, D-4" },
          { id: "C", text: "A-4, B-3, C-2, D-1" },
          { id: "D", text: "A-1, B-4, C-3, D-2" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Barbosa: Portugal; Tavernier (jeweller): France; Manucci: Italy; Abdur Razzaq: Herat (sent to Calicut/Vijayanagara).",
        questionType: "Match The Following",
        type: "match-the-following",
        difficulty: "medium",
      },
      {
        id: "history_u5_q8",
        questionNumber: 8,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): Al-Biruni disapproved of the Brahmanical notion of pollution associated with caste.\nReason (R): Al-Biruni believed that everything that falls into a state of impurity strives and succeeds in regaining its original state of purity, as seen in nature where the sun cleanses the air and salt prevents the sea from becoming polluted.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Al-Biruni argued that the concept of social pollution was contrary to laws of nature. Both are true and (R) explains (A).",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "hard",
      },
      {
        id: "history_u5_q9",
        questionNumber: 9,
        question: "Which of the following plants did Ibn Battuta describe with fascination as producing nuts resembling a human face with two eyes and a mouth?",
        options: [
          { id: "A", text: "Betel (Paan)" },
          { id: "B", text: "Coconut" },
          { id: "C", text: "Areca nut" },
          { id: "D", text: "Jackfruit" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Ibn Battuta described the coconut tree and noted that the nut resembles a man's head, with what looks like two eyes and a mouth.",
        questionType: "Textual Anecdote",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u5_q10",
        questionNumber: 10,
        question: "In the 17th century, which French jeweller visited India at least six times and was particularly fascinated with the diamond trade?",
        options: [
          { id: "A", text: "Jean-Baptiste Tavernier" },
          { id: "B", text: "Francois Bernier" },
          { id: "C", text: "Father Monserrate" },
          { id: "D", text: "Peter Mundy" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Jean-Baptiste Tavernier was a French jeweller who travelled to India at least six times and compared India's diamond trade with Iran and the Ottoman Empire.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: [
        { title: "Buddhism and Jainism", topicId: "history_u4_t1", slug: "stupas-at-sanchi-and-bharhut-teachings-of-mahavira-and-buddha-puranic-hinduism" },
      ],
      relatedTopics: [
        { title: "Bhakti-Sufi Traditions", topicId: "history_u6_t1", slug: "alvars-nayanars-virashaiva-movement-sufi-silsilas-kabir-guru-nanak-mirabai" },
      ],
      practiceTestId: "practice-history-unit5-test1",
      practiceTestUrl: "/test/practice-history-unit5-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 6: Bhakti-Sufi Traditions - Changes in Religious Beliefs
  // -------------------------------------------------------------------------
  {
    id: "history_u6_t1",
    slug: "alvars-nayanars-virashaiva-movement-sufi-silsilas-kabir-guru-nanak-mirabai",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 6,
    unitTitle: "Religious History: Bhakti-Sufi Traditions",
    topicTitle: "Alvars, Nayanars, Virashaiva Movement, Sufi Silsilas, Kabir, Guru Nanak, Mirabai",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part II",
      chapterNumber: 6,
      chapterName: "Bhakti-Sufi Traditions: Changes in Religious Beliefs and Devotional Texts (c. 8th - 18th Century)",
      sections: [
        "1. A Mosaic of Religious Beliefs and Practices",
        "2. The Early Traditions of Bhakti in Tamil Nadu: Alvars and Nayanars",
        "3. The Virashaiva Tradition in Karnataka (Basavanna)",
        "4. The Religious Ferment in North India",
        "5. New Strands in the Fabric: Islamic Traditions",
        "6. The Growth of Sufism (Khanqahs, Silsilas)",
        "7. The Chishtis in the Subcontinent",
        "8. Weaving Divine Fabric: Kabir",
        "9. Baba Guru Nanak and the Sacred Word",
        "10. Mirabai, the Devotee Princess",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely High (6-8 questions per shift)",
      totalPyqsInRepo: 78,
      weightagePercentage: 15,
      expectedQuestions: "5-6 MCQs covering Alvars vs Nayanars, Nalayira Divyaprabandham, Basavanna's Lingayats, Chishti saints (Ajmer dargah, Nizamuddin Auliya), Kabir's poetry, and Guru Nanak's teachings",
      typicalQuestionTypes: [
        "Match the Following (Bhakti/Sufi Saint with region/dargah/text)",
        "Chronological ordering of Chishti Sheikhs (Muinuddin -> Qutbuddin Bakhtiyar Kaki -> Fariduddin Ganj-i-Shakar -> Nizamuddin Auliya -> Nasiruddin Chiragh-i-Dehli)",
        "Virashaiva social reform identification (rejection of rebirth, child marriage, caste)",
        "Assertion-Reason on Saguna vs Nirguna Bhakti distinctions",
      ],
    },
    summary30s: [
      "Bhakti divided into Saguna (worship of specific deities with anthropomorphic attributes: Rama, Krishna, Shiva, Durga) and Nirguna (worship of abstract, formless ultimate reality).",
      "Tamil Nadu witnessed Alvars (immersed in Vishnu; composed Nalayira Divyaprabandham / Tamil Veda) and Nayanars (devotees of Shiva; Tevaram). Women saints included Andal and Karaikkal Ammeiyar.",
      "In 12th-century Karnataka, Basavanna founded the Virashaiva (Lingayat) movement: worship of Shiva as linga in a silver capsule, rejection of caste, child marriage, and post-cremation pollution.",
      "Sufis organized into Silsilas (Chishti order most influential in India). Khwaja Muinuddin Chishti's Dargah at Ajmer was visited 14 times by Mughal Emperor Akbar.",
      "Kabir challenged institutionalized orthodoxies in vernacular Hindi using 'ulta bansi' (upside-down sayings); Baba Guru Nanak advocated Nirguna bhakti, rejecting caste and sacrificial ritualism.",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "Alvars, Nayanars, and the Tamil Veda",
        explanation:
          "From the 6th century CE, the Bhakti movement blossomed in Tamil Nadu. The Alvars (literally, 'those who are immersed' in devotion to Vishnu) and Nayanars (leaders who were devotees of Shiva) travelled singing hymns in Tamil. They welcomed women and lower castes. Andal, a female Alvar, composed devotional verses that are sung to this day. Karaikkal Ammeiyar, a devotee of Shiva, adopted extreme asceticism. The Alvars compiled their compositions in the 'Nalayira Divyaprabandham' (Four Thousand Sacred Compositions), which was revered as equivalent to the Sanskrit Vedas ('Tamil Veda'). Chola rulers (Parantaka I, Rajaraja I) patronized these traditions, constructing grand stone temples (Thanjavur, Chidambaram) and consecrating metal statues of Appar, Sambandar, and Sundarar.",
        ncertPointer: "Themes in Indian History Part II, Section 2",
        examTip: "Nalayira Divyaprabandham = Tamil Veda of Alvars; Tevaram = hymns of Nayanars (Appar, Sambandar, Sundarar).",
      },
      {
        id: "c2",
        title: "The Virashaiva (Lingayat) Movement in Karnataka",
        explanation:
          "In the 12th century, a radical movement arose in Karnataka led by Basavanna (a minister in the court of a Kalachuri ruler), Allama Prabhu, and Akka Mahadevi. His followers were called Virashaivas (heroes of Shiva) or Lingayats (wearers of the linga). Lingayats worship Shiva in his manifestation as a linga, usually wearing a small linga in a silver reliquary looped on a string over the left shoulder. Lingayats challenged caste hierarchy, rejected rebirth (believing the devotee unites with Shiva upon death and does not return), questioned the Brahmanical concept of pollution associated with death (practicing burial instead of cremation), and encouraged post-puberty marriage and the remarriage of widows. Their teachings were expressed in Kannada prose lyrics called 'Vachanas'.",
        ncertPointer: "Themes in Indian History Part II, Section 3",
        examTip: "Virashaivas bury their dead because they believe the deceased unites with Shiva and will not be reborn.",
      },
      {
        id: "c3",
        title: "Chishti Sufism and the Dargah Tradition",
        explanation:
          "Sufis lived in hospices known as Khanqahs, governed by a Shaikh, Pir, or Murshid. The Chishti order, introduced to India by Khwaja Muinuddin Chishti (Gharib Nawaz, d. 1235) at Ajmer, became dominant. Key Chishti practices included austerity, open kitchens (langar funded by unsolicited charity/futuh), musical assemblies (sama / qawwali) to induce mystical ecstasy (hal), and bowing before the Shaikh. Pilgrimage to the tomb of a Sufi saint is known as 'Ziyarat'. Akbar visited the Ajmer dargah 14 times, offering a massive cauldron (deg) for cooking meals for pilgrims. Amir Khusrau, disciple of Shaikh Nizamuddin Auliya, created the qawwali genre and wrote verses in Hindavi.",
        ncertPointer: "Themes in Indian History Part II, Section 6 & 7",
        examTip: "Chronology of Chishti saints: Muinuddin Chishti (Ajmer) -> Qutbuddin Bakhtiyar Kaki (Delhi) -> Fariduddin Ganj-i Shakar (Ajodhan) -> Nizamuddin Auliya (Delhi) -> Nasiruddin Chiragh-i Dehli (Delhi).",
      },
      {
        id: "c4",
        title: "Kabir, Baba Guru Nanak, and Mirabai",
        explanation:
          "Kabir (c. 14th-15th century) expressed Nirguna Bhakti through poems composed in sant bhasha, recorded in three compilations: Kabir Bijak (preserved in Varanasi), Kabir Granthavali (Rajasthan), and the Adi Granth Sahib. Kabir used 'ulta bansi' (upside-down sayings) and attacked idol worship, polytheism, and untouchability. Baba Guru Nanak (1469-1539) rejected external rituals, caste distinctions, and sacrifices, advocating 'Nirguna' devotion to an absolute, genderless 'Rab'. He set up a community at Kartarpur (Dharamsala) where hymns (shabad) were sung and community kitchen (langar) was shared. Guru Arjan compiled his hymns into the Adi Granth in 1604. Mirabai (c. 15th-16th century) was a Rajput princess of Merta who married into the Sisodia clan of Mewar; she rejected palace luxuries to worship Krishna (Girdhar Gopal) as her eternal divine lover, defying caste barriers by acknowledging Raidas (a leather-worker) as her spiritual guru.",
        ncertPointer: "Themes in Indian History Part II, Sections 8, 9, 10",
        examTip: "Raidas (Ravidas), a leather-worker (regarded as untouchable), was Mirabai's preceptor/guru, defying caste hierarchy.",
      },
    ],
    keyFormulas: [
      {
        name: "Canonical Chronology of Chishti Silsila Masters",
        formula: "\\text{Muinuddin Chishti (Ajmer, 1235)} \\rightarrow \\text{Bakhtiyar Kaki (Delhi, 1235)} \\rightarrow \\text{Fariduddin Ganj-i-Shakar (Ajodhan, 1265)} \\rightarrow \\text{Nizamuddin Auliya (Delhi, 1325)} \\rightarrow \\text{Nasiruddin Chiragh-i Dehli (1356)}",
        symbols: "5 generations of master-disciple lineages",
        siUnits: "Chronological Sequence",
        whenToUse: "Ordering Chishti saints chronologically in CUET MCQs.",
      },
      {
        name: "Bhakti Dichotomy Formulation",
        formula: "\\text{Saguna} = \\text{God with Form (Vishnu/Krishna/Rama/Shiva)} \\quad \\Longleftrightarrow \\quad \\text{Nirguna} = \\text{Formless, Abstract Ultimate Reality (Kabir, Nanak)}",
        symbols: "Saguna: Surdas, Tulsidas, Mirabai, Chaitanya; Nirguna: Kabir, Guru Nanak, Raidas",
        siUnits: "Theological Classification",
        whenToUse: "Classifying Bhakti saints into Saguna vs Nirguna streams.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Bhakti-Sufi Movements: Regional Epicenters & Saints",
      caption: "Geographical distribution of Bhakti and Sufi movements across the Indian subcontinent",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">BHAKTI-SUFI TRADITIONS: SPATIAL &amp; THEOLOGICAL SPECTRUM</text>

  <!-- Region 1: Punjab / Northwest -->
  <rect x="50" y="60" width="220" height="150" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" rx="6" />
  <text x="160" y="85" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">PUNJAB / SINDH</text>
  <text x="160" y="105" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">Guru Nanak (1469-1539)</text>
  <text x="65" y="125" fill="#78350f" fontSize="10">• Nirguna Bhakti (Rab)</text>
  <text x="65" y="142" fill="#78350f" fontSize="10">• Shabad, Sangat, Langar</text>
  <text x="65" y="159" fill="#78350f" fontSize="10">• Rejection of idol worship</text>
  <text x="65" y="176" fill="#78350f" fontSize="10">• Kartarpur community</text>

  <!-- Region 2: Rajasthan & North India -->
  <rect x="290" y="60" width="220" height="150" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="6" />
  <text x="400" y="85" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">RAJASTHAN / GANGA VALLEY</text>
  <text x="400" y="105" textAnchor="middle" fill="#0c4a6e" fontSize="11" fontWeight="bold">Mirabai &amp; Kabir</text>
  <text x="305" y="125" fill="#0c4a6e" fontSize="10">• Mirabai: Saguna (Krishna)</text>
  <text x="305" y="142" fill="#0c4a6e" fontSize="10">• Kabir: Nirguna (Bijak)</text>
  <text x="305" y="159" fill="#0c4a6e" fontSize="10">• Raidas: Guru to Mirabai</text>
  <text x="305" y="176" fill="#0c4a6e" fontSize="10">• Ulta Bansi verses</text>

  <!-- Region 3: Delhi & Ajmer (Chishti) -->
  <rect x="530" y="60" width="220" height="150" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" rx="6" />
  <text x="640" y="85" textAnchor="middle" fill="#9d174d" fontSize="13" fontWeight="bold">CHISHTI SILSILA</text>
  <text x="640" y="105" textAnchor="middle" fill="#831843" fontSize="11" fontWeight="bold">Ajmer &amp; Delhi Khanqahs</text>
  <text x="545" y="125" fill="#831843" fontSize="10">• Khwaja Muinuddin Chishti</text>
  <text x="545" y="142" fill="#831843" fontSize="10">• Nizamuddin Auliya (Delhi)</text>
  <text x="545" y="159" fill="#831843" fontSize="10">• Ziyarat, Sama (Qawwali)</text>
  <text x="545" y="176" fill="#831843" fontSize="10">• Amir Khusrau (disciple)</text>

  <!-- Region 4: Karnataka (Lingayats) -->
  <rect x="120" y="230" width="260" height="140" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" rx="6" />
  <text x="250" y="255" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">KARNATAKA: VIRASHAIVAS</text>
  <text x="250" y="275" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="bold">Basavanna, Allama, Akka Mahadevi</text>
  <text x="135" y="295" fill="#14532d" fontSize="10">• Wear Linga in silver reliquary</text>
  <text x="135" y="312" fill="#14532d" fontSize="10">• Rejection of caste &amp; rebirth</text>
  <text x="135" y="329" fill="#14532d" fontSize="10">• Practiced burial (not cremation)</text>
  <text x="135" y="346" fill="#14532d" fontSize="10">• Vachanas in Kannada</text>

  <!-- Region 5: Tamil Nadu (Alvars & Nayanars) -->
  <rect x="420" y="230" width="260" height="140" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" rx="6" />
  <text x="550" y="255" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">TAMIL NADU: ALVARS &amp; NAYANARS</text>
  <text x="550" y="275" textAnchor="middle" fill="#713f12" fontSize="11" fontWeight="bold">Devotees of Vishnu &amp; Shiva</text>
  <text x="435" y="295" fill="#713f12" fontSize="10">• Alvars: Nalayira Divyaprabandham</text>
  <text x="435" y="312" fill="#713f12" fontSize="10">• Nayanars: Tevaram hymns</text>
  <text x="435" y="329" fill="#713f12" fontSize="10">• Female saints: Andal, Karaikkal Ammeiyar</text>
  <text x="435" y="346" fill="#713f12" fontSize="10">• Chola bronze patronage</text>

  <!-- Bottom banner -->
  <rect x="50" y="380" width="700" height="30" fill="#e2e8f0" rx="4" />
  <text x="400" y="400" textAnchor="middle" fill="#475569" fontSize="11">
    Key Concept: Akbar visited Khwaja Muinuddin Chishti's dargah at Ajmer 14 times
  </text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">BHAKTI-SUFI TRADITIONS: SPATIAL &amp; THEOLOGICAL SPECTRUM</text>
  <rect x="50" y="60" width="220" height="150" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" rx="6" />
  <text x="160" y="85" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">PUNJAB / SINDH</text>
  <rect x="290" y="60" width="220" height="150" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="6" />
  <text x="400" y="85" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">RAJASTHAN / GANGA VALLEY</text>
  <rect x="530" y="60" width="220" height="150" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" rx="6" />
  <text x="640" y="85" textAnchor="middle" fill="#9d174d" fontSize="13" fontWeight="bold">CHISHTI SILSILA</text>
  <rect x="120" y="230" width="260" height="140" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" rx="6" />
  <text x="250" y="255" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">KARNATAKA: VIRASHAIVAS</text>
  <rect x="420" y="230" width="260" height="140" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" rx="6" />
  <text x="550" y="255" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">TAMIL NADU: ALVARS &amp; NAYANARS</text>
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "Arrange the following Chishti Sufi saints in chronological order:\n(i) Shaikh Nizamuddin Auliya\n(ii) Khwaja Muinuddin Chishti\n(iii) Shaikh Fariduddin Ganj-i Shakar\n(iv) Khwaja Qutbuddin Bakhtiyar Kaki",
        options: [
          { id: "A", text: "(ii), (iv), (iii), (i)" },
          { id: "B", text: "(ii), (iii), (iv), (i)" },
          { id: "C", text: "(iv), (ii), (iii), (i)" },
          { id: "D", text: "(i), (iii), (iv), (ii)" },
        ],
        correctOption: "A",
        explanation:
          "The chronological order of the Chishti silsila in India is: (1) Khwaja Muinuddin Chishti of Ajmer (d. 1235), (2) Khwaja Qutbuddin Bakhtiyar Kaki of Delhi (d. 1235), (3) Shaikh Fariduddin Ganj-i Shakar of Ajodhan (d. 1265), and (4) Shaikh Nizamuddin Auliya of Delhi (d. 1325).",
        solutionStepByStep: [
          "Step 1: Muinuddin Chishti establishes the Chishti order in India at Ajmer (ii).",
          "Step 2: His chief disciple is Qutbuddin Bakhtiyar Kaki in Delhi (iv).",
          "Step 3: Bakhtiyar Kaki's disciple is Baba Farid at Ajodhan (iii).",
          "Step 4: Baba Farid's disciple is Nizamuddin Auliya in Delhi (i).",
          "Conclusion: Sequence is (ii), (iv), (iii), (i). Option A is correct.",
        ],
        cuetPattern: "Sufi master-disciple genealogical chronology.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "Which of the following practices was strongly rejected by the Virashaivas (Lingayats) of Karnataka?\n(A) Rebirth and post-cremation pollution\n(B) Devotion to Lord Shiva\n(C) Composing literature in the Kannada language\n(D) Wearing a linga on their body",
        options: [
          { id: "A", text: "Rebirth and post-cremation pollution" },
          { id: "B", text: "Devotion to Lord Shiva" },
          { id: "C", text: "Composing literature in Kannada" },
          { id: "D", text: "Wearing a linga on their body" },
        ],
        correctOption: "A",
        explanation:
          "Lingayats rejected the theory of rebirth (believing the deceased unites directly with Shiva) and did not practice cremation; they buried their dead and rejected the Brahmanical notion of death pollution.",
        solutionStepByStep: [
          "Step 1: Check Virashaiva core doctrines: They wore the linga, were devoted to Shiva, and wrote Vachanas in Kannada.",
          "Step 2: Check their radical reforms: Rejected rebirth, caste, child marriage, and funeral pollution.",
          "Conclusion: Option A is correct.",
        ],
        cuetPattern: "Identifying heterodox socio-religious practices of the Lingayat movement.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Textual Anthology Attribution",
        frequency: "Very High",
        typicalStem: "The 'Nalayira Divyaprabandham' is an anthology of hymns composed by: (A) Alvars, (B) Nayanars, (C) Virashaivas, (D) Chishtis.",
        strategy: "Alvars = Nalayira Divyaprabandham; Nayanars = Tevaram; Lingayats = Vachanas; Kabir = Bijak.",
      },
      {
        patternType: "Female Bhakti Saint Association",
        frequency: "High",
        typicalStem: "Which of the following women was a prominent Alvar saint whose verses expressed love for Vishnu?",
        strategy: "Andal = Alvar (Vishnu); Karaikkal Ammeiyar = Nayanar (Shiva); Akka Mahadevi = Virashaiva (Shiva / Chennamallikarjuna); Mirabai = Saguna (Krishna).",
      },
    ],
    commonTraps: [
      {
        misconception: "Confusing Alvars with Nayanars.",
        correctConcept: "Alvars were Vaishnavite (Vishnu devotees); Nayanars were Shaivite (Shiva devotees).",
        whyTrapWorks: "Both were early medieval Tamil devotional movements, leading students to invert their deities.",
        cuetWarning: "Alvars = Vishnu; Nayanars = Shiva (Nayan = eye, Shiva's third eye).",
      },
      {
        misconception: "Assuming Guru Nanak appointed his son as his successor to lead the Sikh community.",
        correctConcept: "Guru Nanak appointed his disciple Lehna (renamed Guru Angad), not his sons, emphasizing merit over lineage.",
        whyTrapWorks: "Later Gurus were family-based, leading students to assume Guru Nanak started hereditary succession.",
        cuetWarning: "Guru Nanak chose Guru Angad as his successor.",
      },
    ],
    mnemonics: [
      {
        title: "Alvars vs Nayanars (A-V, N-S)",
        mnemonic: "All Visitors Need Shoes",
        expansion: "Alvars = Vishnu; Nayanars = Shiva",
        context: "Instantly links sectarian deities in South Indian Bhakti questions.",
      },
    ],
    quickRevisionCard: {
      title: "Bhakti-Sufi Traditions Rapid Revision",
      bulletPoints: [
        "Saguna: Deity with form/attributes (Rama, Krishna, Shiva); Nirguna: Formless abstract godhead (Kabir, Nanak).",
        "Alvars: Tamil Vaishnava poets; Nalayira Divyaprabandham (Tamil Veda). Andal was a female Alvar.",
        "Nayanars: Tamil Shaiva poets; Tevaram compiled hymns of Appar, Sambandar, Sundarar. Karaikkal Ammeiyar was a female ascetic.",
        "Virashaivas (Lingayats): Founded 12th century by Basavanna in Karnataka; wore linga; buried their dead; rejected caste & rebirth.",
        "Sufism: Mystical Islam; organized in Khanqahs led by Shaikh/Pir; Silsilas (lineages).",
        "Chishti Order: Muinuddin Chishti (Ajmer), Bakhtiyar Kaki, Baba Farid, Nizamuddin Auliya; open kitchen (langar), music (sama).",
        "Akbar at Ajmer: Visited Khwaja Muinuddin Chishti's dargah 14 times; gifted massive cauldron (deg).",
        "Kabir: Monotheistic Nirguna saint; Bijak, Granthavali, Adi Granth; used sant bhasha & 'ulta bansi'.",
        "Guru Nanak: Founded community at Kartarpur; Nirguna 'Rab'; shabad singing and langar; Guru Arjan compiled Adi Granth (1604).",
        "Mirabai: Rajput princess of Mewar; dedicated to Krishna (Girdhar Gopal); accepted Raidas (leather worker) as guru.",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u6_q1",
        questionNumber: 1,
        question: "The 'Nalayira Divyaprabandham', often described as the Tamil Veda, is a compilation of 4,000 hymns composed by:",
        options: [
          { id: "A", text: "Alvars" },
          { id: "B", text: "Nayanars" },
          { id: "C", text: "Virashaivas" },
          { id: "D", text: "Sufis" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "The Nalayira Divyaprabandham is the major collection of devotional compositions of the twelve Alvars.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u6_q2",
        questionNumber: 2,
        question: "Who was the female Alvar saint whose love poems to Lord Vishnu are sung throughout South India?",
        options: [
          { id: "A", text: "Karaikkal Ammeiyar" },
          { id: "B", text: "Andal" },
          { id: "C", text: "Akka Mahadevi" },
          { id: "D", text: "Mirabai" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Andal was the only woman Alvar; she saw herself as the beloved of Vishnu and composed verses celebrating divine love.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u6_q3",
        questionNumber: 3,
        question: "Basavanna, the founder of the Virashaiva movement, was a minister in the court of which dynasty in Karnataka?",
        options: [
          { id: "A", text: "Kalachuri" },
          { id: "B", text: "Chalukya" },
          { id: "C", text: "Hoysala" },
          { id: "D", text: "Rashtrakuta" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Basavanna was a minister in the court of a Kalachuri ruler before founding the Virashaiva movement.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u6_q4",
        questionNumber: 4,
        question: "How many times did the Mughal Emperor Akbar visit the Dargah of Khwaja Muinuddin Chishti at Ajmer?",
        options: [
          { id: "A", text: "5 times" },
          { id: "B", text: "10 times" },
          { id: "C", text: "14 times" },
          { id: "D", text: "21 times" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "Akbar visited the tomb of Khwaja Muinuddin Chishti at Ajmer fourteen times, sometimes two or three times a year.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u6_q5",
        questionNumber: 5,
        question: "Who among the following was the spiritual preceptor (guru) of Mirabai?",
        options: [
          { id: "A", text: "Kabir" },
          { id: "B", text: "Raidas (Ravidas)" },
          { id: "C", text: "Ramananda" },
          { id: "D", text: "Surdas" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "According to tradition, Mirabai recognised Raidas, a leather worker, as her preceptor, indicating her defiance of caste norms.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u6_q6",
        questionNumber: 6,
        question: "In Sufi terminology, what does the term 'Ziyarat' signify?",
        options: [
          { id: "A", text: "Pilgrimage to tombs of Sufi saints on death anniversaries (Urs)" },
          { id: "B", text: "The musical assembly held to induce ecstasy" },
          { id: "C", text: "The community kitchen funded by unsolicited charity" },
          { id: "D", text: "The hospice where disciples lived with the master" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Ziyarat refers to pilgrimage to the tombs of Sufi saints (dargahs), particularly on their death anniversary (Urs).",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u6_q7",
        questionNumber: 7,
        question: "The verses of Baba Guru Nanak were compiled into the Adi Granth in 1604 by which Sikh Guru?",
        options: [
          { id: "A", text: "Guru Angad" },
          { id: "B", text: "Guru Ram Das" },
          { id: "C", text: "Guru Arjan" },
          { id: "D", text: "Guru Gobind Singh" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "Guru Arjan, the fifth Sikh Guru, compiled the compositions of Guru Nanak along with those of other teachers (Baba Farid, Ravidas, Kabir) into the Adi Granth Sahib in 1604.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u6_q8",
        questionNumber: 8,
        question: "Which of the following compositions contains poems that use 'ulta bansi' (upside-down sayings) to convey the impossibility of expressing mystical experience?",
        options: [
          { id: "A", text: "Kabir Bijak" },
          { id: "B", text: "Tevaram" },
          { id: "C", text: "Amuktamalyada" },
          { id: "D", text: "Padmavat" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Kabir's poems use 'ulta bansi' (upside-down sayings) written in a form in which everyday meanings are inverted (e.g. 'the ocean is inside the drop').",
        questionType: "Literary Feature",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u6_q9",
        questionNumber: 9,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): Chola rulers built splendid stone temples for Shiva and made land grants to encourage singing of Tamil devotional hymns.\nReason (R): Chola kings sought to proclaim their divine status and claim legitimacy by winning the support of both the Brahmanas and the popular Vellala peasant-cultivators who revered the Bhakti saints.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Kings often attempted to claim divine support and cultivate loyalty by patronizing popular saints and building temples. Both (A) and (R) are true and (R) explains (A).",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "medium",
      },
      {
        id: "history_u6_q10",
        questionNumber: 10,
        question: "Which of the following musical styles of singing Sufi devotional poetry was pioneered in India by Amir Khusrau?",
        options: [
          { id: "A", text: "Khayal" },
          { id: "B", text: "Dhrupad" },
          { id: "C", text: "Qawwali" },
          { id: "D", text: "Thumri" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "Amir Khusrau (1253-1325), disciple of Shaikh Nizamuddin Auliya, gave unique shape to Chishti sama by developing the qawwali genre.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "Medieval Travellers Accounts", topicId: "history_u5_t1", slug: "al-biruni-ibn-battuta-francois-bernier-insights-on-society-and-caste" },
      ],
      relatedTopics: [
        { title: "Vijayanagara Empire", topicId: "history_u7_t1", slug: "hampi-archeology-royal-center-sacred-center-mahanavami-dibba" },
      ],
      practiceTestId: "practice-history-unit6-test1",
      practiceTestUrl: "/test/practice-history-unit6-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 7: An Imperial Capital - Vijayanagara
  // -------------------------------------------------------------------------
  {
    id: "history_u7_t1",
    slug: "hampi-archeology-royal-center-sacred-center-mahanavami-dibba",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 7,
    unitTitle: "Vijayanagara Empire: Politics, Economy and Architecture",
    topicTitle: "Hampi Archeology, Royal Center, Sacred Center, Mahanavami Dibba",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part II",
      chapterNumber: 7,
      chapterName: "An Imperial Capital: Vijayanagara (c. 14th - 16th Century)",
      sections: [
        "1. The Discovery of Hampi (Colin Mackenzie, 1800)",
        "2. Rayas, Nayakas and Sultans",
        "3. Vijayanagara: The Capital and its Environs (Water resources, Fortifications)",
        "4. The Royal Centre (Mahanavami Dibba, Lotus Mahal, Hazara Rama)",
        "5. The Sacred Centre (Virupaksha Temple, Vitthala Temple, Gopurams)",
        "6. Plotting Palaces, Temples and Bazaars",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely High (5-7 questions per shift in CUET)",
      totalPyqsInRepo: 72,
      weightagePercentage: 14,
      expectedQuestions: "5 MCQs covering Colin Mackenzie's discovery (1800), Krishna Deva Raya's achievements, Fortification walls enclosing agricultural fields, Mahanavami Dibba rituals, and the Amara-Nayaka system",
      typicalQuestionTypes: [
        "Chronological ordering of Vijayanagara dynasties (Sangama -> Saluva -> Tuluva -> Aravidu)",
        "Abdur Razzaq's description of seven lines of fortification walls enclosing fields",
        "Architectural features of Mahanavami Dibba, Lotus Mahal, and Hazara Rama Temple",
        "Amara-Nayaka military system compared with Delhi Sultanate Iqta",
      ],
    },
    summary30s: [
      "Vijayanagara ('City of Victory') was founded in 1336 on the banks of the Tungabhadra river by two brothers, Harihara and Bukka of the Sangama dynasty.",
      "Ruins at Hampi were brought to light in 1800 by Colonel Colin Mackenzie, an engineer and surveyor of the English East India Company.",
      "Krishna Deva Raya (reigned 1509-1529, Tuluva dynasty) was its greatest ruler: built Nagalapuram, composed Amuktamalyada in Telugu, and added the eastern gopuram to Virupaksha temple.",
      "Abdur Razzaq noted seven lines of massive wedge-shaped mortarless stone fortifications that enclosed not just the city, but also agricultural tracts and forests.",
      "The Royal Center housed the monumental Mahanavami Dibba (a massive platform for 10-day Navaratri/Dussehra rituals), Lotus Mahal, and the Hazara Rama temple.",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "The Discovery of Hampi: Colin Mackenzie (1800)",
        explanation:
          "The ruins at Hampi were discovered in 1800 by Colonel Colin Mackenzie, an engineer and antiquarian in the East India Company who later became the first Surveyor General of India. He prepared the first survey map of the site. Much of his initial information was derived from the memories of priests of the Virupaksha temple and the shrine of Pampadevi. Later, in 1856, Alexander Greenlaw took the first detailed photographs of monuments, and epigraphists began collecting hundreds of inscriptions in Kannada, Telugu, Tamil, and Sanskrit.",
        ncertPointer: "Themes in Indian History Part II, Section 1",
        examTip: "Colin Mackenzie discovered Hampi in 1800 and became first Surveyor General of India in 1815.",
      },
      {
        id: "c2",
        title: "Rayas, Dynasties, and the Amara-Nayaka System",
        explanation:
          "Four dynasties ruled Vijayanagara: Sangama (1336-1485) -> Saluva (1485-1503) -> Tuluva (1503-1570) -> Aravidu (1570-c. 1646). Krishna Deva Raya belonged to the Tuluva dynasty. Under him, the empire expanded between the Krishna and Tungabhadra rivers (Raichur doab). The Amara-Nayaka system was a major political innovation: military commanders (Nayakas) were assigned territories (amaram) to govern. They collected taxes, maintained an army of horses and foot-soldiers, and sent an annual tribute to the king while appearing in person at court with gifts.",
        ncertPointer: "Themes in Indian History Part II, Section 2",
        examTip: "The term 'amara' is believed to be derived from the Sanskrit word 'samara', meaning battle or war (similar to Turkish amir).",
      },
      {
        id: "c3",
        title: "Fortifications and Agricultural Irrigation",
        explanation:
          "Abdur Razzaq, an ambassador sent by the ruler of Persia to Calicut in the 15th century, was greatly impressed by the fortifications. He recorded seven lines of forts. Crucially, the outer fortification wall encircled not only the city, but also agricultural fields, gardens, and forests. The walls were constructed using wedge-shaped stone blocks without mortar, held together by interlocking. Enclosing agricultural land prevented starvation during prolonged sieges. Water was channeled through the Kamalapuram tank and the Hiriya canal built by Sangama kings.",
        ncertPointer: "Themes in Indian History Part II, Section 3",
        examTip: "Foreign travelers amazed by fields inside forts: Abdur Razzaq (Persia), Domingo Paes, and Fernao Nuniz (Portugal).",
      },
      {
        id: "c4",
        title: "The Royal Centre, Mahanavami Dibba, and Sacred Centre",
        explanation:
          "The Royal Centre contained over 60 temples and secular pavilions. The 'Mahanavami Dibba' was a massive platform (11,000 sq ft base, rising 40 ft) on which the king watched the 10-day Mahanavami (Navaratri) festival: worship of the state horse, buffalo sacrifices, wrestling matches, and review of the army. Other secular structures included the Lotus Mahal (named by British officers; council chamber) and the Hazara Rama temple (reserved for the king and family, carved with Ramayana scenes). In the Sacred Centre stood the Virupaksha Temple (dedicated to Shiva, patron deity of Vijayanagara) and the Vitthala Temple (featuring the world-famous stone chariot and musical monolithic pillars).",
        ncertPointer: "Themes in Indian History Part II, Sections 4 & 5",
        examTip: "Kings signed royal orders as 'Sri Virupaksha' in Kannada script, claiming to rule on behalf of the god Virupaksha.",
      },
    ],
    keyFormulas: [
      {
        name: "Four Ruling Dynasties of Vijayanagara",
        formula: "\\text{Sangama (1336-1485)} \\rightarrow \\text{Saluva (1485-1503)} \\rightarrow \\text{Tuluva (1503-1570)} \\rightarrow \\text{Aravidu (1570-1646)}",
        symbols: "Harihara/Bukka (Sangama) -> Saluva Narasimha (Saluva) -> Krishna Deva Raya (Tuluva) -> Rama Raya/Tirumala (Aravidu)",
        siUnits: "Dynastic Chronology",
        whenToUse: "Ordering dynasties in chronological sequence.",
      },
      {
        name: "Battle of Talikota (Rakshasi-Tangadi) Equation",
        formula: "1565: \\text{Vijayanagara (Led by Rama Raya)} \\quad \\text{vs} \\quad \\text{Combined Deccan Sultanates (Bijapur, Golconda, Ahmadnagar)}",
        symbols: "Result: Complete sack and abandonment of Vijayanagara city; capital shifted east to Penukonda/Chandragiri",
        siUnits: "Military Turning Point",
        whenToUse: "Questions on the downfall of Vijayanagara.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Vijayanagara Urban Zonation: Sacred vs Royal Centre",
      caption: "Spatial zoning of Vijayanagara: Tungabhadra river, Sacred Centre (Virupaksha/Vitthala), and Royal Centre (Mahanavami Dibba)",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">VIJAYANAGARA: SPATIAL LAYOUT &amp; ARCHITECTURAL ZONING</text>

  <!-- River Tungabhadra at Top -->
  <path d="M 50,70 Q 250,50 450,80 T 750,60" fill="none" stroke="#38bdf8" strokeWidth="12" />
  <text x="400" y="60" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="bold">RIVER TUNGABHADRA (Rocky Granite Terrain)</text>

  <!-- Sacred Centre (North) -->
  <rect x="80" y="100" width="300" height="130" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="230" y="125" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">SACRED CENTRE (Hampi)</text>
  <text x="95" y="150" fill="#78350f" fontSize="11">• Virupaksha Temple (Patron Shiva)</text>
  <text x="95" y="170" fill="#78350f" fontSize="11">• Vitthala Temple (Stone Chariot)</text>
  <text x="95" y="190" fill="#78350f" fontSize="11">• Pampadevi Shrine (Local Goddess)</text>
  <text x="95" y="210" fill="#78350f" fontSize="11">• Monumental Gopurams (Raya Gopurams)</text>

  <!-- Agricultural Tract / Fortifications (Middle) -->
  <rect x="420" y="100" width="300" height="130" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" rx="6" />
  <text x="570" y="125" textAnchor="middle" fill="#166534" fontSize="14" fontWeight="bold">AGRICULTURAL BELT INSIDE FORTS</text>
  <text x="435" y="150" fill="#14532d" fontSize="11">• 7 Lines of Walls (Abdur Razzaq)</text>
  <text x="435" y="170" fill="#14532d" fontSize="11">• Wedge-shaped mortarless masonry</text>
  <text x="435" y="190" fill="#14532d" fontSize="11">• Fields, canals &amp; Kamalapuram tank</text>
  <text x="435" y="210" fill="#14532d" fontSize="11">• Designed to withstand long sieges</text>

  <!-- Royal Centre (South) -->
  <rect x="150" y="250" width="500" height="120" fill="#fce7f3" stroke="#db2777" strokeWidth="2" rx="6" />
  <text x="400" y="275" textAnchor="middle" fill="#9d174d" fontSize="14" fontWeight="bold">ROYAL CENTRE (Civic &amp; Ceremonial)</text>
  <text x="170" y="300" fill="#831843" fontSize="11">• Mahanavami Dibba (Massive platform for 10-day Dussehra festival)</text>
  <text x="170" y="320" fill="#831843" fontSize="11">• Lotus Mahal (Council Chamber / Indo-Islamic arches)</text>
  <text x="170" y="340" fill="#831843" fontSize="11">• Hazara Rama Temple (Royal family shrine carved with Ramayana panels)</text>
  <text x="170" y="360" fill="#831843" fontSize="11">• Elephant Stables &amp; Audience Hall</text>

  <!-- Footer Info -->
  <rect x="80" y="380" width="640" height="30" fill="#e2e8f0" rx="4" />
  <text x="400" y="400" textAnchor="middle" fill="#475569" fontSize="11">
    1565 Battle of Talikota (Rakshasi-Tangadi): Decisive defeat by Bijapur, Golconda, Ahmadnagar
  </text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">VIJAYANAGARA: SPATIAL LAYOUT &amp; ARCHITECTURAL ZONING</text>
  <rect x="80" y="100" width="300" height="130" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="230" y="125" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">SACRED CENTRE (Hampi)</text>
  <rect x="420" y="100" width="300" height="130" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" rx="6" />
  <text x="570" y="125" textAnchor="middle" fill="#166534" fontSize="14" fontWeight="bold">AGRICULTURAL BELT INSIDE FORTS</text>
  <rect x="150" y="250" width="500" height="120" fill="#fce7f3" stroke="#db2777" strokeWidth="2" rx="6" />
  <text x="400" y="275" textAnchor="middle" fill="#9d174d" fontSize="14" fontWeight="bold">ROYAL CENTRE (Civic &amp; Ceremonial)</text>
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "Which of the following Persian ambassadors to Calicut in the 15th century was greatly impressed by the seven lines of fortifications enclosing agricultural fields in Vijayanagara?\n(A) Duarte Barbosa\n(B) Abdur Razzaq Samarqandi\n(C) Fernao Nuniz\n(D) Domingo Paes",
        options: [
          { id: "A", text: "Duarte Barbosa" },
          { id: "B", text: "Abdur Razzaq" },
          { id: "C", text: "Fernao Nuniz" },
          { id: "D", text: "Domingo Paes" },
        ],
        correctOption: "B",
        explanation:
          "Abdur Razzaq, an ambassador sent by the ruler of Persia to Calicut in the 15th century, described seven lines of forts that encircled not only the city, but also its agricultural hinterland and forests.",
        solutionStepByStep: [
          "Step 1: Identify the Persian envoy to Calicut: Abdur Razzaq Samarqandi.",
          "Step 2: Recall his description: Recorded seven lines of fortifications encircling agricultural tracts.",
          "Conclusion: Option B is correct.",
        ],
        cuetPattern: "Foreign traveler testimony on urban planning and military defense.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "The Amuktamalyada, a celebrated work on statecraft composed in Telugu, was authored by which Vijayanagara emperor?\n(A) Harihara I\n(B) Bukka I\n(C) Krishna Deva Raya\n(D) Rama Raya",
        options: [
          { id: "A", text: "Harihara I" },
          { id: "B", text: "Bukka I" },
          { id: "C", text: "Krishna Deva Raya" },
          { id: "D", text: "Rama Raya" },
        ],
        correctOption: "C",
        explanation:
          "Krishna Deva Raya, the most famous ruler of Vijayanagara (Tuluva dynasty), composed a work on statecraft in Telugu known as the Amuktamalyada.",
        solutionStepByStep: [
          "Step 1: Recall Krishna Deva Raya's literary patronage (Ashtadiggajas).",
          "Step 2: His own masterwork in Telugu on kingly duties and statecraft is the Amuktamalyada.",
          "Conclusion: Option C is correct.",
        ],
        cuetPattern: "Royal literary masterworks and administrative texts.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Hampi Archaeological Historiography",
        frequency: "Very High",
        typicalStem: "In which year were the ruins at Hampi brought to light by Colonel Colin Mackenzie?",
        strategy: "1800 CE.",
      },
      {
        patternType: "Mahanavami Dibba Functional Analysis",
        frequency: "High",
        typicalStem: "Which festival was celebrated with grand ceremonies at the Mahanavami Dibba in Vijayanagara?",
        strategy: "The 10-day Mahanavami (Navaratri / Dussehra) festival.",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing Vijayanagara fortifications used lime mortar to cement the granite blocks.",
        correctConcept: "The stone blocks were wedge-shaped, which held them in place by interlocking without ANY mortar or cementing agent.",
        whyTrapWorks: "Questions ask 'Which mortar was used in Vijayanagara fortifications?' and options include Gypsum, Lime, Mud, and None.",
        cuetWarning: "No mortar was used in the outer walls; stones were dry-fit and wedge-shaped.",
      },
      {
        misconception: "Assuming the Battle of Talikota was fought against the Delhi Sultanate.",
        correctConcept: "It was fought in 1565 against the combined armies of the DECCAN Sultanates (Bijapur, Ahmadnagar, and Golconda). Delhi was under Akbar at the time.",
        whyTrapWorks: "Options say 'Delhi Sultanate' or 'Mughal Empire'.",
        cuetWarning: "Talikota = Vijayanagara vs Deccan Sultanates (Bijapur, Golconda, Ahmadnagar).",
      },
    ],
    mnemonics: [
      {
        title: "Four Dynasties of Vijayanagara (S-S-T-A)",
        mnemonic: "Seven Soldiers Took Arms",
        expansion: "Sangama -> Saluva -> Tuluva -> Aravidu",
        context: "Instantly solves chronological ordering of Vijayanagara dynasties in CUET.",
      },
    ],
    quickRevisionCard: {
      title: "Vijayanagara Empire High-Yield Summary",
      bulletPoints: [
        "Founded: 1336 by Harihara and Bukka (Sangama dynasty) on Tungabhadra river.",
        "Discovery: 1800 by Colin Mackenzie (first Surveyor General of India in 1815).",
        "Krishna Deva Raya (1509-1529): Greatest Tuluva king; acquired Raichur doab; built Nagalapuram; authored Amuktamalyada.",
        "Fortifications: 7 concentric walls (Abdur Razzaq); wedge-shaped mortarless blocks enclosing agricultural fields.",
        "Waterworks: Kamalapuram tank and Hiriya canal fed by Tungabhadra dams.",
        "Royal Centre: Mahanavami Dibba (11,000 sq ft, 40 ft high; 10-day Dussehra festival), Lotus Mahal, Hazara Rama temple.",
        "Sacred Centre: Virupaksha Temple (patron deity; kings signed as 'Sri Virupaksha' in Kannada), Vitthala Temple (stone chariot).",
        "Amara-Nayaka System: Military chiefs governed territories (amaram), collected revenue, maintained troops, sent annual tribute.",
        "Battle of Talikota (1565): Rama Raya defeated by Bijapur, Ahmadnagar, Golconda; city looted and abandoned.",
        "Later Capitals: Shifted eastwards to Penukonda and later Chandragiri by Aravidu dynasty.",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u7_q1",
        questionNumber: 1,
        question: "In 1800, who prepared the first survey map of the ruins of Hampi?",
        options: [
          { id: "A", text: "Colonel Colin Mackenzie" },
          { id: "B", text: "Alexander Greenlaw" },
          { id: "C", text: "J.F. Fleet" },
          { id: "D", text: "Sir John Marshall" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Colin Mackenzie, an engineer and antiquarian of the East India Company, brought the ruins of Hampi to light in 1800 and prepared the first survey map.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u7_q2",
        questionNumber: 2,
        question: "To which dynasty did Krishna Deva Raya, the most famous ruler of Vijayanagara, belong?",
        options: [
          { id: "A", text: "Sangama" },
          { id: "B", text: "Saluva" },
          { id: "C", text: "Tuluva" },
          { id: "D", text: "Aravidu" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "Krishna Deva Raya belonged to the Tuluva dynasty, which succeeded the Saluva dynasty in 1503.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u7_q3",
        questionNumber: 3,
        question: "What was unique about the fortifications of Vijayanagara as recorded by foreign travelers like Abdur Razzaq?",
        options: [
          { id: "A", text: "They were made entirely of imported Portuguese marble" },
          { id: "B", text: "They encircled agricultural fields, gardens, and forests within the outer lines" },
          { id: "C", text: "They had no gates or entrances, accessible only by underground tunnels" },
          { id: "D", text: "They were constructed with bricks baked in oil rather than stone" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "What was most significant about the fortifications was that they enclosed agricultural tracts and forests to prevent starvation during sieges.",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u7_q4",
        questionNumber: 4,
        question: "In the Vijayanagara Empire, royal orders were signed in the Kannada script in the name of which deity?",
        options: [
          { id: "A", text: "Sri Vitthala" },
          { id: "B", text: "Sri Virupaksha" },
          { id: "C", text: "Sri Rama" },
          { id: "D", text: "Sri Venkateshwara" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "All royal orders were signed 'Sri Virupaksha', usually in the Kannada script. Rulers claimed to rule on behalf of the god Virupaksha.",
        questionType: "Epigraphic Feature",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u7_q5",
        questionNumber: 5,
        question: "The massive ceremonial platform in the Royal Centre of Vijayanagara where the 10-day autumnal festival was celebrated is known as:",
        options: [
          { id: "A", text: "Lotus Mahal" },
          { id: "B", text: "Mahanavami Dibba" },
          { id: "C", text: "Hazara Rama" },
          { id: "D", text: "Nagalapuram" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The Mahanavami Dibba was a massive platform rising from a base of about 11,000 sq ft to a height of 40 ft, where Navaratri rituals were staged.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u7_q6",
        questionNumber: 6,
        question: "Which canal built by kings of the Sangama dynasty drew water from a dam across the Tungabhadra to irrigate the cultivated valley separating the Sacred Centre from the Urban Core?",
        options: [
          { id: "A", text: "Hiriya Canal" },
          { id: "B", text: "Kamalapuram Canal" },
          { id: "C", text: "Krishna Canal" },
          { id: "D", text: "Tungabhadra Main Canal" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "One of the most prominent waterworks was the Hiriya canal, which drew water from a dam across the Tungabhadra and irrigated the cultivated valley.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u7_q7",
        questionNumber: 7,
        question: "In the Amara-Nayaka system of Vijayanagara, the term 'amara' is believed to be derived from the Sanskrit word:",
        options: [
          { id: "A", text: "Amar (Immortal)" },
          { id: "B", text: "Samara (Battle/War)" },
          { id: "C", text: "Amrit (Nectar)" },
          { id: "D", text: "Amara (Friend)" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The term amara is believed to be derived from the Sanskrit word samara, meaning battle or war. It also resembles the Arabic amir, meaning noble or commander.",
        questionType: "Etymology",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u7_q8",
        questionNumber: 8,
        question: "The Battle of Talikota (also known as Rakshasi-Tangadi), which led to the destruction of Vijayanagara, was fought in which year?",
        options: [
          { id: "A", text: "1526" },
          { id: "B", text: "1556" },
          { id: "C", text: "1565" },
          { id: "D", text: "1576" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "In 1565, the army of Vijayanagara under Rama Raya was routed at Talikota by the combined armies of Bijapur, Ahmadnagar, and Golconda.",
        questionType: "Chronology",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u7_q9",
        questionNumber: 9,
        question: "Which of the following temples in Vijayanagara was reserved exclusively for the king and his immediate royal family?",
        options: [
          { id: "A", text: "Virupaksha Temple" },
          { id: "B", text: "Vitthala Temple" },
          { id: "C", text: "Hazara Rama Temple" },
          { id: "D", text: "Pampadevi Temple" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "The Hazara Rama temple was located in the Royal Centre; it was probably meant to be used only by the king and his family, with walls sculpted with scenes from the Ramayana.",
        questionType: "Architectural Association",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u7_q10",
        questionNumber: 10,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): The Raya Gopurams (monumental temple gateway towers) built by Vijayanagara kings often dwarfed the towers over the central shrines.\nReason (R): These colossal gopurams served as marks of imperial power and royal patronage, signalling the presence of the temple from vast distances.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Raya gopurams were towering statements of royal resources and devotion, visible from miles away. Both are true and (R) explains (A).",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: [
        { title: "Bhakti-Sufi Traditions", topicId: "history_u6_t1", slug: "alvars-nayanars-virashaiva-movement-sufi-silsilas-kabir-guru-nanak-mirabai" },
      ],
      relatedTopics: [
        { title: "Mughal Empire and Agrarian Society", topicId: "history_u8_t1", slug: "ain-i-akbari-land-revenue-system-village-community-and-mansabdari" },
      ],
      practiceTestId: "practice-history-unit7-test1",
      practiceTestUrl: "/test/practice-history-unit7-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 8: Peasants, Zamindars and the State - Agrarian Society and the Mughal Empire
  // -------------------------------------------------------------------------
  {
    id: "history_u8_t1",
    slug: "ain-i-akbari-land-revenue-system-village-community-and-mansabdari",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 8,
    unitTitle: "The Mughal Empire and Agrarian Society (Peasants, Zamindars and State)",
    topicTitle: "Ain-i-Akbari, Land Revenue System, Village Community and Mansabdari",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part II",
      chapterNumber: 8,
      chapterName: "Peasants, Zamindars and the State: Agrarian Society and the Mughal Empire (c. 16th - 17th Century)",
      sections: [
        "1. Peasants and Agricultural Production (Khud-kashta vs Pahi-kashta)",
        "2. The Village Community (Panchayat, Muqaddam, Patwari)",
        "3. Women in Agrarian Society",
        "4. Forest and Tribes (Pargana, Peshkash)",
        "5. The Zamindars (Milkiyat)",
        "6. Land Revenue System (Jama and Hasil, Polaj, Parauti, Chachar, Banjar)",
        "7. The Flow of Silver",
        "8. The Ain-i-Akbari of Abu'l Fazl Allami",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Very High (5-7 questions per shift in CUET)",
      totalPyqsInRepo: 66,
      weightagePercentage: 13,
      expectedQuestions: "5 MCQs covering Abu'l Fazl's Ain-i-Akbari (5 books), land classifications (Polaj, Parauti, Chachar, Banjar), Jama vs Hasil, Khud-kashta vs Pahi-kashta, and Mansabdari ranks (Zat and Sawar)",
      typicalQuestionTypes: [
        "Match the Following (Mughal land classification with fallow period)",
        "Five daftars/books of the Ain-i-Akbari (Manzil-abadi, Sipah-abadi, Mulk-abadi)",
        "Zat (status/salary) vs Sawar (number of cavalrymen) in Mansabdari system",
        "Village officials: Muqaddam/Mandal (headman) and Patwari (accountant)",
      ],
    },
    summary30s: [
      "Mughal agrarian society was documented comprehensively in the 'Ain-i-Akbari', completed in 1598 by Akbar's court historian Abu'l Fazl Allami as part of the Akbarnama.",
      "Peasants were classified into Khud-kashta (residents of the village in which they held lands) and Pahi-kashta (non-resident cultivators who farmed lands in other villages on contractual terms).",
      "Land was categorized into 4 classes based on cultivation continuity: Polaj (annually cultivated), Parauti (fallow briefly), Chachar (fallow for 3-4 years), and Banjar (uncultivated for 5+ years).",
      "Land revenue involved two assessment stages: Jama (the assessed amount) and Hasil (the amount actually collected). Akbar encouraged cash payments though collection in kind was permitted.",
      "The Mansabdari system organized military-administrative nobility using two numerical ranks: Zat (personal rank and salary) and Sawar (number of cavalrymen required to maintain).",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "The Ain-i-Akbari of Abu'l Fazl: Structure and Contents",
        explanation:
          "The Ain-i-Akbari was completed in 1598 by Abu'l Fazl as the third book of the larger official chronicle 'Akbarnama'. It consists of five daftars (books): (1) Manzil-abadi (imperial household, mint, treasury), (2) Sipah-abadi (military and civil administration, mansabdars, army), (3) Mulk-abadi (fiscal system, revenue rates, detailed statistics of 12 Subahs / provinces including Sarkar, Pargana, and Mahal details), (4) Religious, literary, and cultural traditions of the people of India with Hindu philosophy, and (5) A collection of Akbar's wise sayings and moral observations.",
        ncertPointer: "Themes in Indian History Part II, Section 8: 'The Ain-i-Akbari of Abu'l Fazl Allami'",
        examTip: "CUET questions match the daftars: Book 1 = Manzil-abadi (household); Book 2 = Sipah-abadi (military/civic); Book 3 = Mulk-abadi (fiscal/revenue).",
      },
      {
        id: "c2",
        title: "Peasant Classification and the Village Community",
        explanation:
          "17th-century sources distinguish between two kinds of peasants: 'Khud-kashta' were residents of the village in which they held their own lands; 'Pahi-kashta' were non-resident cultivators who belonged to some other village, but cultivated lands elsewhere on a contractual basis (often driven by distress, famine, or favorable tax terms). The village community was held together by three constituents: the cultivators, the Panchayat, and the village headman ('Muqaddam' or 'Mandal'). The headman was chosen by consensus of village elders and confirmed by the Zamindar. The Panchayat was funded through a common pool ('khrach') and maintained village accounts via the 'Patwari'.",
        ncertPointer: "Themes in Indian History Part II, Sections 1 & 2",
        examTip: "Jati Panchayats settled civil and caste disputes within specific caste communities, ensuring caste norms were respected.",
      },
      {
        id: "c3",
        title: "Classification of Land and Revenue Administration",
        explanation:
          "Akbar's revenue minister Raja Todar Mal established the Zabt system. Land was classified into four categories: (1) Polaj: Land cultivated annually for every harvest and never left fallow; (2) Parauti: Land left out of cultivation for a short time that it may recover its strength; (3) Chachar: Land that had lain fallow for three or four years; (4) Banjar: Land uncultivated for five years and more. Revenue assessment had two distinct steps: 'Jama' (the assessed revenue demand) and 'Hasil' (the actual amount collected). The state appointed an 'Amil-guzar' (revenue collector) who was instructed to encourage peasants to cultivate high-value cash crops ('Jins-i-Kamil', e.g., cotton, oilseeds, sugarcane).",
        ncertPointer: "Themes in Indian History Part II, Section 6",
        examTip: "Jins-i-Kamil literally means 'perfect crops' (cash crops like cotton and sugarcane yielding higher revenue).",
      },
      {
        id: "c4",
        title: "The Mansabdari System: Zat and Sawar",
        explanation:
          "Introduced by Akbar, the Mansabdari system was the foundational institution of the Mughal civil and military hierarchy. Every officer held a 'Mansab' (rank) defined by two numerical indicators: 'Zat' and 'Sawar'. Zat indicated the personal rank, position in the imperial court hierarchy, and salary of the mansabdar. Sawar indicated the number of horsemen (cavalrymen) the mansabdar was required to maintain in service. Mansabdars were paid either in cash (naqd) or through revenue assignments called 'Jagirs'. A Jagirdar did not own the land; he only held the right to collect revenue (hasil) assessed by the state up to the value of his salary.",
        ncertPointer: "Themes in Indian History Part II, Section 6 & 8",
        examTip: "Differentiate: Mansabdar = holder of rank; Jagirdar = paid via revenue assignment (Jagir); Zamindar = hereditary rural landed intermediary.",
      },
    ],
    keyFormulas: [
      {
        name: "Mughal Land Classification Hierarchy",
        formula: "\\text{Polaj (Annual)} \\rightarrow \\text{Parauti (Brief fallow)} \\rightarrow \\text{Chachar (3-4 yrs fallow)} \\rightarrow \\text{Banjar (5+ yrs uncultivated)}",
        symbols: "Assessed according to average of good, middling, and bad yields (1/3rd state share)",
        siUnits: "Agrarian Productivity Scale",
        whenToUse: "Matching land category with fallow duration in CUET.",
      },
      {
        name: "Dual Numerical Indicators of Mansabdari",
        formula: "\\text{Mansab} = (\\text{Zat}, \\text{Sawar}) \\quad \\text{where } \\text{Zat} \\ge \\text{Sawar}",
        symbols: "Zat: Personal status and salary; Sawar: Cavalry quota to be maintained for battle",
        siUnits: "Administrative Rank",
        whenToUse: "Questions explaining the difference between Zat and Sawar.",
      },
      {
        name: "Ain-i-Akbari Five Daftars Sequence",
        formula: "\\text{Book 1: Manzil-abadi} \\rightarrow \\text{Book 2: Sipah-abadi} \\rightarrow \\text{Book 3: Mulk-abadi} \\rightarrow \\text{Book 4: Indian Traditions} \\rightarrow \\text{Book 5: Akbar's Sayings}",
        symbols: "Authored by Abu'l Fazl Allami (completed 1598)",
        siUnits: "Textual Division",
        whenToUse: "Ordering or identifying chapters of the Ain-i-Akbari.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Mughal Agrarian Hierarchy: State to Peasant",
      caption: "Fiscal relationship: Emperor -> Mansabdar/Jagirdar -> Zamindar -> Village Panchayat -> Cultivators",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">MUGHAL REVENUE &amp; AGRARIAN ADMINISTRATIVE STRUCTURE</text>

  <!-- Level 1: Imperial Center -->
  <rect x="250" y="55" width="300" height="50" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="400" y="80" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">EMPEROR &amp; CENTRAL DIWAN</text>
  <text x="400" y="95" textAnchor="middle" fill="#92400e" fontSize="10">Establishes revenue rates (Zabt / Todar Mal)</text>
  <line x1="400" y1="105" x2="400" y2="135" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow)" />

  <!-- Level 2: Province & Sarkar -->
  <rect x="220" y="135" width="360" height="55" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="6" />
  <text x="400" y="158" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">SUBADAR, DIWAN &amp; AMIL-GUZAR</text>
  <text x="400" y="176" textAnchor="middle" fill="#0369a1" fontSize="10">Assesses 'Jama' (demand) and collects 'Hasil' (actual)</text>
  <line x1="400" y1="190" x2="400" y2="220" stroke="#0284c7" strokeWidth="2" />

  <!-- Level 3: Intermediaries -->
  <rect x="100" y="220" width="280" height="60" fill="#fce7f3" stroke="#db2777" strokeWidth="2" rx="6" />
  <text x="240" y="245" textAnchor="middle" fill="#9d174d" fontSize="13" fontWeight="bold">MANSABDARS / JAGIRDARS</text>
  <text x="240" y="265" textAnchor="middle" fill="#831843" fontSize="10">Ranked by Zat (salary) &amp; Sawar (troops)</text>

  <rect x="420" y="220" width="280" height="60" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" rx="6" />
  <text x="560" y="245" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">ZAMINDARS (Milkiyat)</text>
  <text x="560" y="265" textAnchor="middle" fill="#713f12" fontSize="10">Hereditary landed rights &amp; local forts</text>

  <!-- Level 4: Village Base -->
  <rect x="100" y="310" width="600" height="65" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" rx="6" />
  <text x="400" y="332" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">THE VILLAGE COMMUNITY (Mauza)</text>
  <text x="250" y="355" textAnchor="middle" fill="#14532d" fontSize="10">
    Muqaddam (Headman) + Patwari (Accountant)
  </text>
  <text x="550" y="355" textAnchor="middle" fill="#14532d" fontSize="10">
    Khud-kashta (Resident) vs Pahi-kashta (Non-resident)
  </text>

  <!-- Bottom info line -->
  <rect x="50" y="385" width="700" height="25" fill="#f1f5f9" rx="4" />
  <text x="400" y="402" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">
    Land Types: Polaj (annual) | Parauti (brief fallow) | Chachar (3-4 yrs fallow) | Banjar (5+ yrs fallow)
  </text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">MUGHAL REVENUE &amp; AGRARIAN ADMINISTRATIVE STRUCTURE</text>
  <rect x="250" y="55" width="300" height="50" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="400" y="80" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">EMPEROR &amp; CENTRAL DIWAN</text>
  <rect x="220" y="135" width="360" height="55" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="6" />
  <text x="400" y="158" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">SUBADAR, DIWAN &amp; AMIL-GUZAR</text>
  <rect x="100" y="220" width="280" height="60" fill="#fce7f3" stroke="#db2777" strokeWidth="2" rx="6" />
  <text x="240" y="245" textAnchor="middle" fill="#9d174d" fontSize="13" fontWeight="bold">MANSABDARS / JAGIRDARS</text>
  <rect x="420" y="220" width="280" height="60" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" rx="6" />
  <text x="560" y="245" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">ZAMINDARS (Milkiyat)</text>
  <rect x="100" y="310" width="600" height="65" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" rx="6" />
  <text x="400" y="332" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">THE VILLAGE COMMUNITY (Mauza)</text>
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "Under Akbar's revenue administration, how was land that had remained uncultivated for five years or more classified?\n(A) Polaj\n(B) Parauti\n(C) Chachar\n(D) Banjar",
        options: [
          { id: "A", text: "Polaj" },
          { id: "B", text: "Parauti" },
          { id: "C", text: "Chachar" },
          { id: "D", text: "Banjar" },
        ],
        correctOption: "D",
        explanation:
          "According to the Ain-i-Akbari, Banjar was land that had lain uncultivated for five years or more. Polaj was cultivated annually; Parauti was fallow for a short period; Chachar was fallow for 3 to 4 years.",
        solutionStepByStep: [
          "Step 1: Check Polaj: Annually cultivated, never fallow.",
          "Step 2: Check Parauti: Left fallow for 1 year to regain fertility.",
          "Step 3: Check Chachar: Fallow for 3-4 years.",
          "Step 4: Check Banjar: Uncultivated for 5 or more years.",
          "Conclusion: Option D (Banjar) is correct.",
        ],
        cuetPattern: "Direct matching of Mughal agrarian terminology from NCERT Chapter 8.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "Which book/daftar of the Ain-i-Akbari provides detailed statistical fiscal information of the subahs (provinces), including revenue rates and administrative subdivisions (sarkars and parganas)?\n(A) Manzil-abadi\n(B) Sipah-abadi\n(C) Mulk-abadi\n(D) Fifth daftar",
        options: [
          { id: "A", text: "Manzil-abadi" },
          { id: "B", text: "Sipah-abadi" },
          { id: "C", text: "Mulk-abadi" },
          { id: "D", text: "Fifth daftar" },
        ],
        correctOption: "C",
        explanation:
          "The third book, Mulk-abadi ('imperial administration'), deals with the fiscal side of the empire, giving quantitative information on revenue rates, measured land, and revenue demand for the subahs and sarkars.",
        solutionStepByStep: [
          "Step 1: Manzil-abadi (1st book) = Imperial household and royal mint.",
          "Step 2: Sipah-abadi (2nd book) = Military and civil administration, mansabdars.",
          "Step 3: Mulk-abadi (3rd book) = Fiscal accounts, revenue rates, and provincial statistics.",
          "Conclusion: Option C is correct.",
        ],
        cuetPattern: "Structural organization of Abu'l Fazl's Ain-i-Akbari.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Peasant Classification Disambiguation",
        frequency: "Very High",
        typicalStem: "In Mughal India, peasants who were residents of the village in which they held lands were called: (A) Pahi-kashta, (B) Khud-kashta, (C) Muzarian, (D) Asami.",
        strategy: "Khud-kashta = resident owners; Pahi-kashta = non-resident contractual tenants.",
      },
      {
        patternType: "Zat vs Sawar Rank Significance",
        frequency: "High",
        typicalStem: "In the Mansabdari system, the rank of 'Sawar' represented: (A) Personal salary, (B) Number of horsemen required to maintain, (C) Court seating precedence, (D) Land measurement.",
        strategy: "Zat = personal rank/salary; Sawar = cavalry quota.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming the Ain-i-Akbari is an independent standalone book.",
        correctConcept: "The Ain-i-Akbari is the THIRD volume (daftar) of the monumental three-part 'Akbarnama' written by Abu'l Fazl.",
        whyTrapWorks: "Questions ask 'What is the relationship between the Ain-i-Akbari and the Akbarnama?' and students think they are two separate chronicles.",
        cuetWarning: "Volume 1: History of mankind from Adam to Akbar; Volume 2: Akbar's reign up to 46th regnal year; Volume 3: Ain-i-Akbari.",
      },
      {
        misconception: "Believing Jama and Hasil were identical amounts.",
        correctConcept: "Jama was the assessed revenue demand; Hasil was the amount actually collected. In reality, Hasil was almost always lower than Jama due to defaults or remissions.",
        whyTrapWorks: "Options claim Jama was collected and Hasil was assessed (inversion trap).",
        cuetWarning: "Jama = Assessed demand; Hasil = Actual cash/grain collected.",
      },
    ],
    mnemonics: [
      {
        title: "Ain-i-Akbari First 3 Daftars (M-S-M)",
        mnemonic: "My Sister's Money",
        expansion: "Manzil-abadi (Household) -> Sipah-abadi (Military) -> Mulk-abadi (Fiscal/Revenue)",
        context: "Instantly recalls the first three daftars of the Ain-i-Akbari in CUET exams.",
      },
    ],
    quickRevisionCard: {
      title: "Mughal Agrarian Society Rapid Revision",
      bulletPoints: [
        "Ain-i-Akbari: Completed 1598 by Abu'l Fazl; 3rd part of Akbarnama; contains 5 daftars (Manzil, Sipah, Mulk, Cultural Traditions, Sayings).",
        "Khud-kashta: Resident peasants cultivating their own lands in their native village.",
        "Pahi-kashta: Non-resident contractual cultivators working in other villages.",
        "Village Heads: Muqaddam/Mandal (headman chosen by elders); Patwari (village accountant).",
        "Jins-i-Kamil: 'Perfect crops' (commercial cash crops: cotton, sugarcane) promoted by the state.",
        "Land Classification: Polaj (annual) -> Parauti (short fallow) -> Chachar (3-4 yrs fallow) -> Banjar (5+ yrs uncultivated).",
        "Revenue Assessment: Jama (assessed demand) vs Hasil (actual collection); Amil-guzar (revenue collector).",
        "Mansabdari System: Dual rank — Zat (personal status & salary) and Sawar (number of cavalry to maintain).",
        "Jagir System: Revenue assignment given to Mansabdars in lieu of cash salary; not hereditary land ownership.",
        "Monetary Flow: Huge influx of silver into India due to maritime trade (cotton/silk exports), facilitating coin monetization.",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u8_q1",
        questionNumber: 1,
        question: "Who was the author of the 'Ain-i-Akbari', completed in 1598 as part of the Akbarnama?",
        options: [
          { id: "A", text: "Faizi" },
          { id: "B", text: "Abu'l Fazl" },
          { id: "C", text: "Abdul Qadir Badauni" },
          { id: "D", text: "Raja Todar Mal" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The Ain-i-Akbari was authored by Akbar's court historian and biographer Abu'l Fazl Allami.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u8_q2",
        questionNumber: 2,
        question: "In Mughal agrarian society, non-resident cultivators who belonged to another village but cultivated lands on a contractual basis were known as:",
        options: [
          { id: "A", text: "Khud-kashta" },
          { id: "B", text: "Pahi-kashta" },
          { id: "C", text: "Muqaddam" },
          { id: "D", text: "Mandal" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Pahi-kashta were peasants who were non-residents of the village in which they cultivated lands on a contractual basis.",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u8_q3",
        questionNumber: 3,
        question: "Which of the following terms was used in Mughal official records for cash crops such as cotton and sugarcane that yielded higher revenue?",
        options: [
          { id: "A", text: "Jins-i-Kamil" },
          { id: "B", text: "Milkiyat" },
          { id: "C", text: "Kharaj" },
          { id: "D", text: "Peshkash" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Mughal state encouraged peasants to cultivate 'jins-i kamil' (literally, perfect crops) like cotton, oilseeds, and sugarcane because they brought in more tax.",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u8_q4",
        questionNumber: 4,
        question: "In Mughal revenue administration, what was the difference between 'Jama' and 'Hasil'?",
        options: [
          { id: "A", text: "Jama was the amount actually collected, while Hasil was the assessed demand" },
          { id: "B", text: "Jama was the assessed revenue demand, while Hasil was the amount actually collected" },
          { id: "C", text: "Jama was tax on trade, while Hasil was tax on agriculture" },
          { id: "D", text: "Jama was paid in kind, while Hasil was paid exclusively in gold coins" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Jama was the assessed revenue demand, and hasil was the actual amount collected by imperial revenue officials.",
        questionType: "Terminology Distinction",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u8_q5",
        questionNumber: 5,
        question: "In the Mansabdari system, what did the rank of 'Zat' signify?",
        options: [
          { id: "A", text: "The number of cavalrymen (sawar) the officer was required to maintain" },
          { id: "B", text: "The personal rank, administrative status, and salary of the noble" },
          { id: "C", text: "The area of land given as hereditary property" },
          { id: "D", text: "The number of cannons deployed during sieges" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Zat was an indicator of position in the imperial hierarchy and determined the personal salary of the mansabdar.",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u8_q6",
        questionNumber: 6,
        question: "Which of the following books (daftars) of the Ain-i-Akbari deals with the imperial household, court etiquette, and the royal mint?",
        options: [
          { id: "A", text: "Manzil-abadi" },
          { id: "B", text: "Sipah-abadi" },
          { id: "C", text: "Mulk-abadi" },
          { id: "D", text: "Fourth daftar" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "The first book, called Manzil-abadi, concerns the imperial household, treasury, and mint maintenance.",
        questionType: "Textual Division",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u8_q7",
        questionNumber: 7,
        question: "Match the Mughal land category in List-I with its description in List-II:\nList-I:\n(A) Polaj\n(B) Parauti\n(C) Chachar\n(D) Banjar\n\nList-II:\n1. Uncultivated for 5 years and more\n2. Cultivated annually, never left fallow\n3. Fallow for 3 to 4 years\n4. Left fallow for a short period to recover strength",
        options: [
          { id: "A", text: "A-2, B-4, C-3, D-1" },
          { id: "B", text: "A-1, B-3, C-4, D-2" },
          { id: "C", text: "A-2, B-3, C-4, D-1" },
          { id: "D", text: "A-4, B-2, C-1, D-3" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Polaj: Annual (2); Parauti: Short fallow (4); Chachar: 3-4 years fallow (3); Banjar: 5+ years fallow (1).",
        questionType: "Match The Following",
        type: "match-the-following",
        difficulty: "medium",
      },
      {
        id: "history_u8_q8",
        questionNumber: 8,
        question: "Who was the village official responsible for maintaining land records and village financial accounts in Mughal rural communities?",
        options: [
          { id: "A", text: "Muqaddam" },
          { id: "B", text: "Patwari" },
          { id: "C", text: "Kotwal" },
          { id: "D", text: "Qanungo" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The Patwari was the village accountant who assisted the headman (muqaddam) and maintained detailed land and tax records.",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u8_q9",
        questionNumber: 9,
        question: "Which metal witnessed a massive influx into India between the 16th and 18th centuries due to flourishing overseas trade, enabling minting of silver rupees?",
        options: [
          { id: "A", text: "Gold" },
          { id: "B", text: "Silver" },
          { id: "C", text: "Copper" },
          { id: "D", text: "Tin" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "A massive influx of silver bullion arrived in India from the Americas via European trading companies to pay for Indian textiles and spices.",
        questionType: "Economic History",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u8_q10",
        questionNumber: 10,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): Akbar's revenue administration allowed flexibility in payment, permitting collection in either cash or kind.\nReason (R): While payment in cash was preferred and encouraged by the state, the amil-guzar was instructed not to refuse collection in grain when peasants faced difficulties.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "The Ain-i-Akbari states that while the collector of revenue should aim to collect in cash, he should not object to taking grain. Both are true and (R) explains (A).",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: [
        { title: "Vijayanagara Empire", topicId: "history_u7_t1", slug: "hampi-archeology-royal-center-sacred-center-mahanavami-dibba" },
      ],
      relatedTopics: [
        { title: "Colonialism and Rural Society", topicId: "history_u9_t1", slug: "permanent-settlement-santhal-uprising-deccan-riots-commission" },
      ],
      practiceTestId: "practice-history-unit8-test1",
      practiceTestUrl: "/test/practice-history-unit8-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },
];
