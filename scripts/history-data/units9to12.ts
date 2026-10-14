import { NoteDocument } from "@/types/notes";

export const historyUnits9to12Topics: NoteDocument[] = [
  // -------------------------------------------------------------------------
  // UNIT 9: Colonialism and the Countryside - Exploring Official Archives
  // -------------------------------------------------------------------------
  {
    id: "history_u9_t1",
    slug: "permanent-settlement-santhal-uprising-deccan-riots-commission",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 9,
    unitTitle: "Colonialism and Rural Society (Colonialism and Countryside)",
    topicTitle: "Permanent Settlement, Santhal Uprising, Deccan Riots Commission",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part III",
      chapterNumber: 9,
      chapterName: "Colonialism and the Countryside: Exploring Official Archives",
      sections: [
        "1. Bengal and the Zamindars (Permanent Settlement 1793, Burdwan Auction)",
        "2. The Hoe and the Plough (Paharias vs Santhals in Rajmahal Hills)",
        "3. A Revolt in the Countryside: The Bombay Deccan (Ryotwari System, Cotton Boom)",
        "4. The Deccan Riots Commission (1878 Report)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely High (5-7 questions per shift in CUET History)",
      totalPyqsInRepo: 68,
      weightagePercentage: 13,
      expectedQuestions: "5 MCQs on Permanent Settlement (Lord Cornwallis, 1793, Sunset Law), Fifth Report (1813), Damin-i-Koh boundary (1832), Sidhu & Kanhu Santhal rebellion (1855-56), and Deccan Limitation Law of 1859",
      typicalQuestionTypes: [
        "Chronological ordering of agrarian events (1793 Permanent Settlement -> 1813 Fifth Report -> 1832 Damin-i-Koh -> 1855 Santhal Revolt -> 1875 Deccan Riots)",
        "Match the Following (Colonial Land System, Architect/Governor General, Region)",
        "Concept identification: Jotedars / Haoladars vs Zamindars in Bengal",
        "Paharias (Hoe / shifting cultivation) vs Santhals (Plough / settled agriculture)",
      ],
    },
    summary30s: [
      "The Permanent Settlement was enacted in Bengal in 1793 under Governor-General Lord Cornwallis, fixing revenue demands on Zamindars in perpetuity.",
      "Zamindars frequently defaulted due to exorbitant initial revenue rates and the 'Sunset Law', giving rise to wealthy village-based peasants called 'Jotedars'.",
      "In the Rajmahal hills, British authorities clashed with the hill-dwelling Paharias (represented by the 'Hoe'), and settled the agricultural Santhals (represented by the 'Plough') in Damin-i-Koh in 1832.",
      "Exploited by moneylenders (Dikus) and British taxes, Santhals rebelled in 1855-56 under brothers Sidhu and Kanhu Manjhi, leading to the creation of the Santhal Pargana.",
      "In the Bombay Deccan, the Ryotwari system and the end of the American Civil War Cotton Boom led to crushing peasant debt; the 1875 Deccan Riots against moneylenders produced the 1878 Deccan Riots Report.",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "The Permanent Settlement (1793) and the Rise of Jotedars",
        explanation:
          "Introduced in Bengal in 1793 by Lord Cornwallis, the Permanent Settlement fixed the land revenue payable by Zamindars forever. If a Zamindar failed to pay by sunset on a specified date (the 'Sunset Law'), his estate was liable to be auctioned. Over 75% of zamindaris changed hands after 1793. Why did Zamindars default? (1) The initial revenue demand was pegged exorbitantly high; (2) Agricultural prices were depressed in the 1790s; (3) The revenue was invariable regardless of harvest failure; (4) The Company curbed zamindars' police power and judicial autonomy. Concurrently, a class of rich peasants known as 'Jotedars' (also termed haoladars, gantidars, or mandals) consolidated power in North Bengal. Jotedars controlled local trade and moneylending, directly resisted zamindars, and deliberately delayed revenue payments.",
        ncertPointer: "Themes in Indian History Part III, Section 1: 'Bengal and the Zamindars'",
        examTip: "Fifth Report: Submitted to the British Parliament in 1813 by a Select Committee on the affairs of the East India Company, running into 1,002 pages, documenting the crisis of Bengal zamindars.",
      },
      {
        id: "c2",
        title: "The Hoe and the Plough: Paharias vs Santhals",
        explanation:
          "In the Rajmahal hills, the indigenous Paharias lived by shifting agriculture, forest produce (Mahua flowers, silk cocoons), and charcoal burning, symbolized by the 'Hoe'. Francis Buchanan, a physician/surveyor who toured the region in the early 19th century, observed their distrust of British officials. When British efforts to tame Paharias failed, the British turned to the Santhals, who practiced settled plough agriculture (symbolized by the 'Plough'). By 1832, a large area of land in the foothills was demarcated as 'Damin-i-Koh' (the skirts of the hills) and declared the land of the Santhals. Santhal population and villages expanded rapidly.",
        ncertPointer: "Themes in Indian History Part III, Section 2: 'The Hoe and the Plough'",
        examTip: "Hoe = Paharias (shifting cultivation, forest dwellers); Plough = Santhals (settled agriculture, clearing forests).",
      },
      {
        id: "c3",
        title: "The Santhal Rebellion of 1855-56",
        explanation:
          "Santhals soon discovered that the land demarcated for them was slipping out of their grasp. The colonial state levied heavy land taxes, zamindars asserted control over the Damin-i-Koh tracts, and moneylenders ('Dikus') charged usurious interest rates (often 50% to 500%), reducing peasants to bonded laborers. In 1855, Santhals rose in armed rebellion under the leadership of two brothers, Sidhu and Kanhu Manjhi. Armed with bows, arrows, and battle-axes, they attacked zamindars, moneylenders, and police stations. The British suppressed the insurrection ruthlessly through martial law, burning villages. Following the revolt, the British carved out the 'Santhal Pargana' (5,500 square miles) from Bhagalpur and Birbhum to conciliate the tribals.",
        ncertPointer: "Themes in Indian History Part III, Section 2",
        examTip: "Leaders of the 1855-56 Santhal revolt: Sidhu and Kanhu Manjhi.",
      },
      {
        id: "c4",
        title: "The Deccan Riots (1875) and the Limitation Law",
        explanation:
          "In Bombay Deccan, the British implemented the Ryotwari settlement: revenue was settled directly with the ryot (cultivator), not permanently, but revised upwards every 30 years. During the American Civil War (1861-65), Britain turned to India for raw cotton, creating an artificial 'Cotton Boom'. Moneylenders (sahukars) gave easy credit to ryots. When the American Civil War ended in 1865, demand collapsed, cotton prices plummeted by 50%, and moneylenders refused further loans while the colonial state hiked revenue by 50%. The British passed the 'Limitation Law of 1859', stating that loan bonds signed between moneylenders and ryots were valid for only three years; moneylenders manipulated this by forcing peasants to sign new bonds every three years, compounding unpaid interest. In May 1875, riots erupted at Supa (Poona district), where ryots attacked sahukars, publicly burning debt bonds (khatas). The Deccan Riots Commission presented its report to the British Parliament in 1878.",
        ncertPointer: "Themes in Indian History Part III, Sections 3 & 4",
        examTip: "The Limitation Law of 1859 set loan bond validity to 3 years, which moneylenders exploited to compound interest.",
      },
    ],
    keyFormulas: [
      {
        name: "Colonial Land Revenue Systems Matrix",
        formula: "\\text{Permanent Settlement (1793)}: \\text{Bengal (Cornwallis)} \\quad | \\quad \\text{Ryotwari (1820s)}: \\text{Bombay/Madras (Munro/Read)} \\quad | \\quad \\text{Mahalwari (1822)}: \\text{NW Provinces (Holt Mackenzie)}",
        symbols: "Permanent: Perpetual demand; Ryotwari: Periodic 30-yr revision; Mahalwari: Assessed on village community (Mahal)",
        siUnits: "Agrarian Systems",
        whenToUse: "Comparative land tenure questions in CUET.",
      },
      {
        name: "Chronological Ladder of Rural Events (1793 - 1878)",
        formula: "1793 (\\text{Permanent Settlement}) \\rightarrow 1813 (\\text{Fifth Report}) \\rightarrow 1832 (\\text{Damin-i-Koh}) \\rightarrow 1855\\text{-}56 (\\text{Santhal Revolt}) \\rightarrow 1859 (\\text{Limitation Law}) \\rightarrow 1875 (\\text{Deccan Riots}) \\rightarrow 1878 (\\text{Deccan Report})",
        symbols: "7 key chronological milestones of 19th-century agrarian history",
        siUnits: "Chronology",
        whenToUse: "Ordering rural events chronologically.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Colonial Countryside: Agrarian Systems & Rebellions",
      caption: "Bengal Permanent Settlement vs Bombay Ryotwari and associated peasant revolts (Santhal & Deccan)",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">COLONIAL COUNTRYSIDE: SETTLEMENTS &amp; PEASANT RESISTANCE</text>

  <!-- Left: Bengal & Santhal -->
  <rect x="50" y="60" width="330" height="300" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="215" y="85" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">BENGAL &amp; RAJMAHAL HILLS</text>

  <rect x="65" y="100" width="300" height="70" fill="#ffffff" stroke="#f59e0b" rx="4" />
  <text x="215" y="120" textAnchor="middle" fill="#78350f" fontSize="12" fontWeight="bold">Permanent Settlement (1793)</text>
  <text x="75" y="140" fill="#78350f" fontSize="10">• Lord Cornwallis; revenue fixed forever</text>
  <text x="75" y="155" fill="#78350f" fontSize="10">• Sunset Law -> Jotedars rise in village</text>

  <rect x="65" y="185" width="300" height="75" fill="#ffffff" stroke="#f59e0b" rx="4" />
  <text x="215" y="205" textAnchor="middle" fill="#78350f" fontSize="12" fontWeight="bold">Hoe vs Plough in Rajmahal</text>
  <text x="75" y="225" fill="#78350f" fontSize="10">• Paharias (Hoe): Shifting forest gatherers</text>
  <text x="75" y="240" fill="#78350f" fontSize="10">• Santhals (Plough): Damin-i-Koh (1832)</text>

  <rect x="65" y="270" width="300" height="75" fill="#fef2f2" stroke="#dc2626" rx="4" />
  <text x="215" y="290" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">Santhal Rebellion (1855-56)</text>
  <text x="75" y="310" fill="#991b1b" fontSize="10">• Led by Sidhu and Kanhu against Dikus</text>
  <text x="75" y="325" fill="#991b1b" fontSize="10">• Outcome: Creation of Santhal Pargana</text>

  <!-- Right: Bombay Deccan -->
  <rect x="420" y="60" width="330" height="300" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="6" />
  <text x="585" y="85" textAnchor="middle" fill="#0369a1" fontSize="14" fontWeight="bold">BOMBAY DECCAN</text>

  <rect x="435" y="100" width="300" height="70" fill="#ffffff" stroke="#38bdf8" rx="4" />
  <text x="585" y="120" textAnchor="middle" fill="#0c4a6e" fontSize="12" fontWeight="bold">Ryotwari Settlement (1820s)</text>
  <text x="445" y="140" fill="#0c4a6e" fontSize="10">• Direct settlement with ryot (cultivator)</text>
  <text x="445" y="155" fill="#0c4a6e" fontSize="10">• Revenue revised periodically every 30 yrs</text>

  <rect x="435" y="185" width="300" height="75" fill="#ffffff" stroke="#38bdf8" rx="4" />
  <text x="585" y="205" textAnchor="middle" fill="#0c4a6e" fontSize="12" fontWeight="bold">Cotton Boom &amp; Bust (1861-1865)</text>
  <text x="445" y="225" fill="#0c4a6e" fontSize="10">• American Civil War boom -> Sahukar credit</text>
  <text x="445" y="240" fill="#0c4a6e" fontSize="10">• 1865 crash -> Moneylenders refuse loans</text>

  <rect x="435" y="270" width="300" height="75" fill="#fef2f2" stroke="#dc2626" rx="4" />
  <text x="585" y="290" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">Deccan Riots (May 1875)</text>
  <text x="445" y="310" fill="#991b1b" fontSize="10">• Began in Supa (Poona); burnt debt bonds</text>
  <text x="445" y="325" fill="#991b1b" fontSize="10">• 1878: Deccan Riots Commission Report</text>

  <!-- Footer Info -->
  <rect x="50" y="375" width="700" height="30" fill="#f1f5f9" rx="4" />
  <text x="400" y="395" textAnchor="middle" fill="#334155" fontSize="11">
    Fifth Report (1813): 1,002-page report to British Parliament on East India Company malpractices
  </text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">COLONIAL COUNTRYSIDE: SETTLEMENTS &amp; PEASANT RESISTANCE</text>
  <rect x="50" y="60" width="330" height="300" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="215" y="85" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">BENGAL &amp; RAJMAHAL HILLS</text>
  <rect x="420" y="60" width="330" height="300" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="6" />
  <text x="585" y="85" textAnchor="middle" fill="#0369a1" fontSize="14" fontWeight="bold">BOMBAY DECCAN</text>
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "Which of the following British legal enactments, passed in 1859, declared that loan bonds signed between moneylenders and ryots would have validity for only three years?\n(A) Sunset Law\n(B) Limitation Law\n(C) Deccan Agriculturists Relief Act\n(D) Vernacular Press Act",
        options: [
          { id: "A", text: "Sunset Law" },
          { id: "B", text: "Limitation Law" },
          { id: "C", text: "Deccan Agriculturists Relief Act" },
          { id: "D", text: "Vernacular Press Act" },
        ],
        correctOption: "B",
        explanation:
          "In 1859 the British passed a Limitation Law that stated that the loan bonds signed between moneylenders and ryots would have validity for only three years. Its objective was to curb accumulation of interest, but moneylenders circumvented it by compelling peasants to sign new bonds every three years.",
        solutionStepByStep: [
          "Step 1: Sunset Law (1793) -> Associated with Bengal Permanent Settlement zamindari auctions.",
          "Step 2: Limitation Law (1859) -> Passed in Bombay Deccan; limited bond validity to 3 years.",
          "Step 3: Deccan Agriculturists Relief Act (1879) -> Passed after the Deccan Riots report.",
          "Conclusion: Option B (Limitation Law) is correct.",
        ],
        cuetPattern: "Colonial economic enactments and their unintended agrarian consequences.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "Who among the following was the leader of the Santhal Rebellion of 1855-56 against the British and Dikus (moneylenders)?\n(A) Birsa Munda\n(B) Sidhu and Kanhu Manjhi\n(C) Shah Mal\n(D) Kunwar Singh",
        options: [
          { id: "A", text: "Birsa Munda" },
          { id: "B", text: "Sidhu and Kanhu Manjhi" },
          { id: "C", text: "Shah Mal" },
          { id: "D", text: "Kunwar Singh" },
        ],
        correctOption: "B",
        explanation:
          "The Santhal insurrection of 1855-56 was led by the brothers Sidhu and Kanhu Manjhi. Birsa Munda led the Ulgulan in 1899-1900; Shah Mal and Kunwar Singh were leaders in the 1857 Revolt.",
        solutionStepByStep: [
          "Step 1: Identify Santhal leaders: Sidhu and Kanhu.",
          "Step 2: They declared that Thakur (God) had commanded them to rebel and reclaim Damin-i-Koh.",
          "Conclusion: Option B is correct.",
        ],
        cuetPattern: "Tribal leader and rebellion matching.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Peasant Stratum Terminology",
        frequency: "Very High",
        typicalStem: "In North Bengal, the rich peasants who held vast lands, controlled village moneylending, and resisted zamindars were called: (A) Jotedars, (B) Raiyats, (C) Adhiyars, (D) Bargadars.",
        strategy: "Jotedars (also known as haoladars, gantidars, or mandals).",
      },
      {
        patternType: "Damin-i-Koh Geographic Demarcation",
        frequency: "High",
        typicalStem: "In which year was Damin-i-Koh demarcated as the land of the Santhals by the British?",
        strategy: "1832 CE.",
      },
    ],
    commonTraps: [
      {
        misconception: "Thinking the Ryotwari settlement in Bombay fixed revenue permanently like Bengal.",
        correctConcept: "Ryotwari revenue was NOT permanent. It was subject to upward revision every 30 years based on fresh land surveys and soil classification.",
        whyTrapWorks: "Students confuse Permanent Settlement (Bengal) with Ryotwari (Bombay/Madras).",
        cuetWarning: "Permanent = Bengal only; Ryotwari = Revised every 30 years.",
      },
      {
        misconception: "Believing Jotedars were loyal agents of the Zamindar.",
        correctConcept: "Jotedars were bitter rivals of the Zamindar. They lived in the village, mobilized the ryots, delayed revenue payments to bankrupt the Zamindar, and bought his auctioned estates.",
        whyTrapWorks: "Questions suggest Jotedars collected taxes for the Zamindar.",
        cuetWarning: "Jotedars actively undermined Zamindars.",
      },
    ],
    mnemonics: [
      {
        title: "Tools of the Rajmahal (Hoe vs Plough)",
        mnemonic: "Paharias Hoe, Santhals Plough",
        expansion: "Paharias = Hoe (shifting cultivation); Santhals = Plough (settled farming)",
        context: "Instantly links the symbolic agricultural implements in NCERT Theme 9.",
      },
    ],
    quickRevisionCard: {
      title: "Colonialism and Countryside Rapid Revision",
      bulletPoints: [
        "Permanent Settlement (1793): Lord Cornwallis in Bengal; fixed revenue in perpetuity; Sunset Law caused zamindari auctions.",
        "Jotedars: Rich peasants in North Bengal (also called haoladars/gantidars); undermined zamindars locally.",
        "Fifth Report (1813): 1,002-page report to British Parliament on East India Company malpractices in Bengal.",
        "Paharias: Shifting cultivators in Rajmahal hills using the 'Hoe'; gathered forest produce; raided plains.",
        "Santhals: Settled agriculturalists using the 'Plough'; settled by British in Damin-i-Koh (1832).",
        "Santhal Revolt (1855-56): Led by Sidhu and Kanhu Manjhi against moneylenders (Dikus) and revenue officers; created Santhal Pargana.",
        "Ryotwari System: Bombay Deccan; direct agreement with ryots; revenue revised upward every 30 years.",
        "Cotton Boom (1861-65): Triggered by American Civil War; easy loans to ryots; ended in 1865 with collapse of prices.",
        "Limitation Law (1859): Loan bonds valid for only 3 years; moneylenders manipulated it to compound peasant debt.",
        "Deccan Riots (May 1875): Began in Supa (Poona); peasants burnt debt account books (khatas); 1878 Deccan Riots Report.",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u9_q1",
        questionNumber: 1,
        question: "Who was the Governor-General of Bengal when the Permanent Settlement was introduced in 1793?",
        options: [
          { id: "A", text: "Warren Hastings" },
          { id: "B", text: "Lord Cornwallis" },
          { id: "C", text: "Lord Wellesley" },
          { id: "D", text: "Lord Dalhousie" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The Permanent Settlement was made with the rajas and taluqdars of Bengal in 1793 under Governor-General Lord Cornwallis.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u9_q2",
        questionNumber: 2,
        question: "Under the Permanent Settlement, what was the 'Sunset Law'?",
        options: [
          { id: "A", text: "No court hearings could occur after sunset" },
          { id: "B", text: "If revenue was not paid by sunset of the specified due date, the zamindari estate was auctioned" },
          { id: "C", text: "Cultivators had to cease all agricultural operations at sunset" },
          { id: "D", text: "British collectors could only enter villages before sunset" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "According to the Sunset Law, if payment did not come in by sunset of the specified day, the zamindari was liable to be auctioned.",
        questionType: "Terminology Definition",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u9_q3",
        questionNumber: 3,
        question: "In which year was 'Damin-i-Koh' demarcated as a separate territory for the Santhals in the Rajmahal hills?",
        options: [
          { id: "A", text: "1793" },
          { id: "B", text: "1813" },
          { id: "C", text: "1832" },
          { id: "D", text: "1855" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "By 1832 a large area of land was demarcated as Damin-i-Koh, declared to be the land of the Santhals.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u9_q4",
        questionNumber: 4,
        question: "Which physician and surveyor travelled through the Rajmahal hills in the early 19th century, leaving detailed accounts of Paharias and Santhals?",
        options: [
          { id: "A", text: "Francis Buchanan" },
          { id: "B", text: "Colin Mackenzie" },
          { id: "C", text: "Alexander Cunningham" },
          { id: "D", text: "William Jones" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Francis Buchanan (later Buchanan-Hamilton) was a surgeon and surveyor employed by the East India Company who surveyed Rajmahal hills.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u9_q5",
        questionNumber: 5,
        question: "Where did the Deccan Riots of May 1875 first break out in Maharashtra?",
        options: [
          { id: "A", text: "Supa in Poona district" },
          { id: "B", text: "Satara" },
          { id: "C", text: "Ahmednagar city" },
          { id: "D", text: "Solapur" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "The movement began at Supa, a large village in Poona (Pune) district, which was a market center where many shopkeepers and moneylenders lived.",
        questionType: "Geographic Location",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u9_q6",
        questionNumber: 6,
        question: "What was the main action taken by rioting ryots during the Deccan Riots of 1875?",
        options: [
          { id: "A", text: "Assassinating the British district magistrate" },
          { id: "B", text: "Burning debt bonds, loan agreements, and account books (khatas)" },
          { id: "C", text: "Blowing up railway bridges and telegraph lines" },
          { id: "D", text: "Refusing to cultivate any food crops" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The ryots attacked the moneylenders, burning the bahi-khatas (account books) and debt bonds in public bonfires.",
        questionType: "Historical Detail",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u9_q7",
        questionNumber: 7,
        question: "Which war in the West created an unprecedented boom in Indian raw cotton exports between 1861 and 1865?",
        options: [
          { id: "A", text: "Crimean War" },
          { id: "B", text: "American Civil War" },
          { id: "C", text: "Franco-Prussian War" },
          { id: "D", text: "Boer War" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "When the American Civil War broke out in 1861, cotton supply from America to Britain plummeted, causing Britain to look to India for raw cotton.",
        questionType: "Historical Context",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u9_q8",
        questionNumber: 8,
        question: "What was the famous parliamentary report on East India Company administration submitted in Britain in 1813 called?",
        options: [
          { id: "A", text: "Third Report" },
          { id: "B", text: "Fifth Report" },
          { id: "C", text: "Deccan Report" },
          { id: "D", text: "Cornwallis Code" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The Fifth Report was submitted to the British Parliament in 1813 on the administration and activities of the East India Company in India.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u9_q9",
        questionNumber: 9,
        question: "Rich peasants who were called 'Jotedars' in Dinajpur (North Bengal) were known by which of the following terms in other parts of Bengal?",
        options: [
          { id: "A", text: "Haoladars, Gantidars, or Mandals" },
          { id: "B", text: "Zamindars, Taluqdars, or Jagirdars" },
          { id: "C", text: "Muqaddams, Patwaris, or Qanungos" },
          { id: "D", text: "Adhiyars, Bargadars, or Sanjhis" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "In some places they were called haoladars, elsewhere they were known as gantidars or mandals.",
        questionType: "Terminology Association",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u9_q10",
        questionNumber: 10,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): The British welcomed the settlement of Santhals in the foothills of Rajmahal.\nReason (R): The British failed to subdue the shifting-cultivator Paharias into settled tax-paying peasants, whereas Santhals were skilled in clearing forests and practicing plough agriculture.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Having failed to tame the Paharias, the British turned to Santhals, who appeared ideal to clear forests and settle the land. Both are true and (R) explains (A).",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: [
        { title: "Mughal Agrarian Society", topicId: "history_u8_t1", slug: "ain-i-akbari-land-revenue-system-village-community-and-mansabdari" },
      ],
      relatedTopics: [
        { title: "Revolt of 1857", topicId: "history_u10_t1", slug: "outbreak-leadership-rebel-proclamations-british-counter-offensive-visual-imagery" },
      ],
      practiceTestId: "practice-history-unit9-test1",
      practiceTestUrl: "/test/practice-history-unit9-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 10: Rebels and the Raj - The 1857 Revolt and Its Representations
  // -------------------------------------------------------------------------
  {
    id: "history_u10_t1",
    slug: "outbreak-leadership-rebel-proclamations-british-counter-offensive-visual-imagery",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 10,
    unitTitle: "Revolt of 1857: Patterns and Representations",
    topicTitle: "Outbreak, Leadership, Rebel Proclamations, British Counter-offensive, Visual Imagery",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part III",
      chapterNumber: 10,
      chapterName: "Rebels and the Raj: The Revolt of 1857 and Its Representations",
      sections: [
        "1. Pattern of the Rebellion (Meerut to Delhi, 10 May 1857)",
        "2. Awadh in Revolt ('A cherry that will drop into our mouth one day')",
        "3. What the Rebels Wanted (The Azamgarh Proclamation 1857)",
        "4. Repression (Martial Law, Recapture of Delhi)",
        "5. Images of the Revolt (British depictions vs Nationalist heroic representations)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely High (6-8 questions per shift in CUET History)",
      totalPyqsInRepo: 76,
      weightagePercentage: 15,
      expectedQuestions: "5-6 MCQs covering Outbreak at Meerut (10 May 1857), Regional leaders (Nana Sahib, Begum Hazrat Mahal, Kunwar Singh, Shah Mal, Gonoo), Dalhousie's annexation of Awadh (1856), Azamgarh Proclamation (25 August 1857), and Paintings (Thomas Jones Barker, Joseph Noel Paton)",
      typicalQuestionTypes: [
        "Match the Following (1857 Rebel Leader with center of revolt)",
        "Lord Dalhousie's quote on Awadh: 'A cherry that will drop into our mouth one day' (1851)",
        "Visual representation analysis (Relief of Lucknow, In Memoriam, Punch cartoons)",
        "Assertion-Reason on Hindu-Muslim unity during the 1857 revolt",
      ],
    },
    summary30s: [
      "The Revolt broke out on late afternoon of 10 May 1857 at the Meerut cantonment; sepoys marched to Delhi, capturing the Red Fort and proclaiming Mughal Emperor Bahadur Shah Zafar as their nominal leader.",
      "Rebellion spread across north India with local leadership: Nana Sahib at Kanpur, Begum Hazrat Mahal at Lucknow, Rani Lakshmibai at Jhansi, Kunwar Singh at Arrah (Bihar), and Shah Mal in Barout (UP).",
      "Awadh was annexed in 1856 by Dalhousie on grounds of misgovernance; its annexation deeply alienated taluqdars and sepoys ('nursery of the Bengal Army').",
      "Rebel proclamations (notably the Azamgarh Proclamation of 25 August 1857) rejected British rule, emphasizing communal unity between Hindus and Muslims.",
      "The British suppressed the revolt with massive force (Martial Law, Delhi recaptured Sept 1857); British paintings celebrated imperial rescue (Barker's 'Relief of Lucknow'), while Indian memory immortalized Rani Lakshmibai.",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "Outbreak and the Chain of Leadership",
        explanation:
          "On 10 May 1857, sepoys at Meerut mutinied in response to rumors of enfield rifle cartridges greased with cow and pig fat. They broke open jails, burnt cantonment bungalows, and marched to Delhi, reaching the Red Fort on 11 May. They persuaded the reluctant Mughal Emperor Bahadur Shah Zafar to accept nominal leadership, giving the uprising political legitimacy. Across north and central India, leaders emerged: at Kanpur, Nana Sahib (adopted son of Peshwa Baji Rao II); at Lucknow, Birjis Qadr (son of Nawab Wajid Ali Shah) and his mother Begum Hazrat Mahal; at Jhansi, Rani Lakshmibai; at Arrah in Bihar, Kunwar Singh (an elderly zamindar); at Barout in Baghpat (UP), Shah Mal mobilized peasants of the Chaurasee des; and in Singhbhum (Chota Nagpur), Gonoo, a Kol tribal cultivator, led the rebellion.",
        ncertPointer: "Themes in Indian History Part III, Section 1: 'Pattern of the Rebellion'",
        examTip: "CUET matching: Shah Mal = Barout / Baghpat; Gonoo = Singhbhum / Kol tribals; Kunwar Singh = Arrah / Bihar; Maulvi Ahmadullah Shah = Danka Shah / Faizabad.",
      },
      {
        id: "c2",
        title: "Awadh: 'A Cherry That Will Drop into Our Mouth One Day'",
        explanation:
          "In 1851, Governor-General Lord Dalhousie described Awadh as 'a cherry that will drop into our mouth one day'. In 1856, the British formally annexed Awadh, dethroning Nawab Wajid Ali Shah on charges of misgovernance and exiling him to Calcutta. This provoked widespread grief throughout Lucknow ('the life was gone out of the body'). The British introduced the 'Summary Settlement of 1856', which dispossessed the powerful local landed elite called Taluqdars (their fortresses were demolished and troops disbanded). Furthermore, Awadh was known as 'the nursery of the Bengal Army' (over 75,000 sepoys came from Awadh); the dispossession of taluqdars directly affected the families of sepoys, sparking universal revolt in Awadh.",
        ncertPointer: "Themes in Indian History Part III, Section 2: 'Awadh in Revolt'",
        examTip: "Summary Settlement of 1856 reduced taluqdars' landholdings from 67% to 38% in Awadh, provoking armed rebellion.",
      },
      {
        id: "c3",
        title: "Vision of Unity: The Azamgarh Proclamation (1857)",
        explanation:
          "Rebel proclamations consistently appealed to all sections of the population, irrespective of their caste and creed. The proclamations issued under the name of Bahadur Shah or other leaders (like the famous 'Azamgarh Proclamation' of 25 August 1857) addressed zamindars, merchants, public servants, artisans, and pandits/maulvis. The proclamations glorified the pre-British Mughal past as a period of coexistence and mutual respect. Significantly, British attempts to create religious divisions (e.g. spending ₹50,000 in Bareilly to incite Hindus against Muslims) completely failed in 1857.",
        ncertPointer: "Themes in Indian History Part III, Section 3: 'What the Rebels Wanted'",
        examTip: "Azamgarh Proclamation: Published 25 August 1857, issued in the name of Firoz Shah (grandson of Mughal Emperor), appealing for pan-Indian solidarity.",
      },
      {
        id: "c4",
        title: "Repression and Visual Representations of 1857",
        explanation:
          "To reconquer North India, the British passed acts in May and June 1857 putting the entire northern region under Martial Law. Military officers and ordinary Britons were given the power to try and punish Indians on suspicion, with execution as the sole penalty. Delhi was recaptured in September 1857 after heavy fighting by John Nicholson. Visual art immortalized the conflict: British paintings celebrated imperial rescue and heroic resilience: (1) 'Relief of Lucknow' (1859) painted by Thomas Jones Barker celebrated the arrival of Colin Campbell; (2) 'In Memoriam' (1858) by Joseph Noel Paton depicted vulnerable British women and children huddled in prayer; (3) 'Justice' in British satirical magazine *Punch* depicted an armored British allegorical figure trampling sepoys. Conversely, Indian nationalist art immortalized Rani Lakshmibai as a hero charging into battle, celebrated in Subhadra Kumari Chauhan's poem: 'Khoob lari mardani woh toh Jhansi wali rani thi'.",
        ncertPointer: "Themes in Indian History Part III, Sections 4 & 5",
        examTip: "Thomas Jones Barker = Relief of Lucknow (celebrating Campbell); Joseph Noel Paton = In Memoriam (women/children); Subhadra Kumari Chauhan = Jhansi poem.",
      },
    ],
    keyFormulas: [
      {
        name: "1857 Rebel Leadership & Centers Roster",
        formula: "\\text{Delhi (Bahadur Shah)} \\quad | \\quad \\text{Kanpur (Nana Sahib)} \\quad | \\quad \\text{Lucknow (Hazrat Mahal / Birjis Qadr)} \\quad | \\quad \\text{Jhansi (Rani Lakshmibai)} \\quad | \\quad \\text{Arrah (Kunwar Singh)} \\quad | \\quad \\text{Barout (Shah Mal)}",
        symbols: "Match the leader with their geographical center of operation",
        siUnits: "Rebel Geography",
        whenToUse: "Match the following 1857 leader with region.",
      },
      {
        name: "Awadh Annexation Timeline",
        formula: "1801 (\\text{Subsidiary Alliance imposed}) \\rightarrow 1851 (\\text{Dalhousie's 'Cherry' quote}) \\rightarrow 1856 (\\text{Annexation & Summary Settlement}) \\rightarrow 1857 (\\text{Total Uprising})",
        symbols: "Lord Dalhousie annexed Awadh; Nawab Wajid Ali Shah exiled to Calcutta",
        siUnits: "Annexation Chronology",
        whenToUse: "Chronology of events leading to the Awadh insurrection.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Revolt of 1857: Epicenters & Leaders",
      caption: "Northern and Central Indian epicenters of the 1857 uprising with their respective leaders",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">THE REVOLT OF 1857: PRINCIPAL HUBS &amp; PROTAGONISTS</text>

  <!-- Node 1: Delhi -->
  <rect x="50" y="60" width="210" height="90" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" rx="6" />
  <text x="155" y="85" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">DELHI (Red Fort)</text>
  <text x="155" y="105" textAnchor="middle" fill="#78350f" fontSize="11">Bahadur Shah Zafar</text>
  <text x="155" y="125" textAnchor="middle" fill="#78350f" fontSize="10">General Bakht Khan (Bareilly sepoy)</text>
  <text x="155" y="140" textAnchor="middle" fill="#b45309" fontSize="9">Recaptured Sept 1857 (Nicholson)</text>

  <!-- Node 2: Meerut -->
  <rect x="295" y="60" width="210" height="90" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" rx="6" />
  <text x="400" y="85" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">MEERUT (Outbreak)</text>
  <text x="400" y="105" textAnchor="middle" fill="#7f1d1d" fontSize="11">10 May 1857 (Afternoon)</text>
  <text x="400" y="125" textAnchor="middle" fill="#7f1d1d" fontSize="10">Greased cartridges mutiny</text>
  <text x="400" y="140" textAnchor="middle" fill="#991b1b" fontSize="9">Sepoys march to Delhi overnight</text>

  <!-- Node 3: Awadh / Lucknow -->
  <rect x="540" y="60" width="210" height="90" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="6" />
  <text x="645" y="85" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">LUCKNOW (Awadh)</text>
  <text x="645" y="105" textAnchor="middle" fill="#0c4a6e" fontSize="11">Begum Hazrat Mahal</text>
  <text x="645" y="125" textAnchor="middle" fill="#0c4a6e" fontSize="10">Birjis Qadr &amp; Taluqdars</text>
  <text x="645" y="140" textAnchor="middle" fill="#0369a1" fontSize="9">Nursery of Bengal Army</text>

  <!-- Node 4: Kanpur -->
  <rect x="50" y="180" width="210" height="90" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" rx="6" />
  <text x="155" y="205" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">KANPUR</text>
  <text x="155" y="225" textAnchor="middle" fill="#14532d" fontSize="11">Nana Sahib (Peshwa)</text>
  <text x="155" y="245" textAnchor="middle" fill="#14532d" fontSize="10">Tatya Tope &amp; Azimullah</text>
  <text x="155" y="260" textAnchor="middle" fill="#15803d" fontSize="9">Siege of Entrenchment</text>

  <!-- Node 5: Jhansi -->
  <rect x="295" y="180" width="210" height="90" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" rx="6" />
  <text x="400" y="205" textAnchor="middle" fill="#9d174d" fontSize="13" fontWeight="bold">JHANSI</text>
  <text x="400" y="225" textAnchor="middle" fill="#831843" fontSize="11">Rani Lakshmibai</text>
  <text x="400" y="245" textAnchor="middle" fill="#831843" fontSize="10">Doctrine of Lapse refusal</text>
  <text x="400" y="260" textAnchor="middle" fill="#be185d" fontSize="9">Martyred in Gwalior (June 1858)</text>

  <!-- Node 6: Arrah & Regional -->
  <rect x="540" y="180" width="210" height="90" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" rx="6" />
  <text x="645" y="205" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">ARRAH &amp; OTHERS</text>
  <text x="645" y="225" textAnchor="middle" fill="#713f12" fontSize="11">Kunwar Singh (Arrah)</text>
  <text x="645" y="245" textAnchor="middle" fill="#713f12" fontSize="10">Shah Mal (Barout/Baghpat)</text>
  <text x="645" y="260" textAnchor="middle" fill="#a16207" fontSize="9">Gonoo (Singhbhum Kol tribal)</text>

  <!-- Visual Representation Box -->
  <rect x="50" y="295" width="700" height="75" fill="#f1f5f9" stroke="#94a3b8" rx="6" />
  <text x="400" y="320" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">VISUAL REPRESENTATIONS OF 1857</text>
  <text x="220" y="342" textAnchor="middle" fill="#334155" fontSize="11">
    British: 'Relief of Lucknow' (T.J. Barker) &amp; 'In Memoriam' (J.N. Paton)
  </text>
  <text x="580" y="342" textAnchor="middle" fill="#334155" fontSize="11">
    Indian: Subhadra Kumari Chauhan ('Jhansi Ki Rani')
  </text>

  <!-- Bottom Info -->
  <rect x="50" y="380" width="700" height="30" fill="#e2e8f0" rx="4" />
  <text x="400" y="400" textAnchor="middle" fill="#475569" fontSize="11">
    Azamgarh Proclamation (25 August 1857): Emphasized Hindu-Muslim unity against colonial subversion
  </text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">THE REVOLT OF 1857: PRINCIPAL HUBS &amp; PROTAGONISTS</text>
  <rect x="50" y="60" width="210" height="90" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" rx="6" />
  <text x="155" y="85" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">DELHI (Red Fort)</text>
  <rect x="295" y="60" width="210" height="90" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" rx="6" />
  <text x="400" y="85" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">MEERUT (Outbreak)</text>
  <rect x="540" y="60" width="210" height="90" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="6" />
  <text x="645" y="85" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">LUCKNOW (Awadh)</text>
  <rect x="50" y="180" width="210" height="90" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" rx="6" />
  <text x="155" y="205" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">KANPUR</text>
  <rect x="295" y="180" width="210" height="90" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" rx="6" />
  <text x="400" y="205" textAnchor="middle" fill="#9d174d" fontSize="13" fontWeight="bold">JHANSI</text>
  <rect x="540" y="180" width="210" height="90" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" rx="6" />
  <text x="645" y="205" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">ARRAH &amp; OTHERS</text>
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "Which British Governor-General described the kingdom of Awadh in 1851 as 'a cherry that will drop into our mouth one day'?\n(A) Lord Wellesley\n(B) Lord Dalhousie\n(C) Lord Canning\n(D) Lord Hardinge",
        options: [
          { id: "A", text: "Lord Wellesley" },
          { id: "B", text: "Lord Dalhousie" },
          { id: "C", text: "Lord Canning" },
          { id: "D", text: "Lord Hardinge" },
        ],
        correctOption: "B",
        explanation:
          "In 1851 Governor General Lord Dalhousie described the kingdom of Awadh as 'a cherry that will drop into our mouth one day'. Five years later, in 1856, the kingdom was formally annexed to the British empire.",
        solutionStepByStep: [
          "Step 1: Wellesley imposed the Subsidiary Alliance on Awadh in 1801.",
          "Step 2: Dalhousie made the famous 'cherry' quote in 1851 and annexed Awadh in 1856.",
          "Conclusion: Option B (Lord Dalhousie) is correct.",
        ],
        cuetPattern: "Direct quotation attribution from NCERT Chapter 10.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "Match List-I (1857 Leader) with List-II (Region of Mobilization):\nList-I:\n(A) Kunwar Singh\n(B) Shah Mal\n(C) Gonoo\n(D) Maulvi Ahmadullah Shah\n\nList-II:\n1. Singhbhum (Chota Nagpur)\n2. Barout (Baghpat, UP)\n3. Arrah (Bihar)\n4. Faizabad (Awadh)",
        options: [
          { id: "A", text: "A-3, B-2, C-1, D-4" },
          { id: "B", text: "A-2, B-3, C-4, D-1" },
          { id: "C", text: "A-3, B-1, C-2, D-4" },
          { id: "D", text: "A-4, B-2, C-1, D-3" },
        ],
        correctOption: "A",
        explanation:
          "Kunwar Singh led the rebellion in Arrah (Bihar); Shah Mal mobilized the peasants of Barout in Baghpat; Gonoo was a Kol tribal leader in Singhbhum; Maulvi Ahmadullah Shah (Danka Shah) led the resistance in Faizabad.",
        solutionStepByStep: [
          "Step 1: Kunwar Singh -> Arrah (Bihar) -> A matches 3.",
          "Step 2: Shah Mal -> Barout in Baghpat -> B matches 2.",
          "Step 3: Gonoo -> Singhbhum (Kol tribals) -> C matches 1.",
          "Step 4: Maulvi Ahmadullah Shah -> Faizabad -> D matches 4.",
          "Conclusion: Option A is correct.",
        ],
        cuetPattern: "Comprehensive 1857 rebel leadership matching.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "British Painting Identification",
        frequency: "Very High",
        typicalStem: "Who painted the celebrated British canvas 'Relief of Lucknow' commemorating the arrival of Colin Campbell in 1859?",
        strategy: "Thomas Jones Barker.",
      },
      {
        patternType: "Awadh Sepoy Proportion",
        frequency: "High",
        typicalStem: "Why was the kingdom of Awadh known as the 'nursery of the Bengal Army'?",
        strategy: "A vast majority of the sepoys in the Bengal Army were recruited from the villages of Awadh and eastern UP.",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing Mangal Pandey started the nationwide Revolt of 1857 at Meerut on 10 May.",
        correctConcept: "Mangal Pandey mutinied individually at Barrackpore (Bengal) on 29 March 1857 and was hanged on 8 April. The nationwide Revolt began on 10 May 1857 at MEERUT by the 3rd Native Cavalry.",
        whyTrapWorks: "Popular films conflate Mangal Pandey's Barrackpore incident with the mass outbreak at Meerut.",
        cuetWarning: "Outbreak of Revolt = 10 May 1857 at Meerut cantonment.",
      },
      {
        misconception: "Assuming the British easily incited communal riots between Hindus and Muslims in 1857.",
        correctConcept: "In 1857, British efforts to create sectarian divisions completely failed; even when British officials in Bareilly spent ₹50,000 to incite Hindus against Muslims in December 1857, the attempt failed.",
        whyTrapWorks: "Questions ask whether communal divisions weakened the 1857 rebellion.",
        cuetWarning: "1857 was characterized by remarkable Hindu-Muslim solidarity.",
      },
    ],
    mnemonics: [
      {
        title: "Key Leaders & Hubs (K-A, S-B, G-S)",
        mnemonic: "King Arrah Saw Baghpat, Gone Singhbhum",
        expansion: "Kunwar = Arrah; Shah Mal = Barout/Baghpat; Gonoo = Singhbhum",
        context: "Instantly solves the most difficult regional leader questions in CUET.",
      },
    ],
    quickRevisionCard: {
      title: "Rebels and the Raj High-Yield Summary",
      bulletPoints: [
        "Outbreak: Late afternoon of Sunday, 10 May 1857 at Meerut cantonment; sepoys seized Delhi Red Fort on 11 May.",
        "Bahadur Shah Zafar: Nominal figurehead emperor; exiled to Rangoon after recapture of Delhi (Sept 1857).",
        "Leaders: Nana Sahib (Kanpur), Begum Hazrat Mahal (Lucknow), Rani Lakshmibai (Jhansi), Kunwar Singh (Arrah), Shah Mal (Baghpat), Gonoo (Singhbhum).",
        "Awadh: Annexed 1856 by Dalhousie ('a cherry that will drop into our mouth one day'); Nawab Wajid Ali Shah exiled.",
        "Summary Settlement 1856: Dispossessed Awadh taluqdars, destroying ties of patronage with peasants.",
        "Nursery of Bengal Army: Awadh provided over 75,000 sepoys to the British army.",
        "Azamgarh Proclamation (25 August 1857): Famous manifesto advocating complete Hindu-Muslim solidarity against British.",
        "Repression: British passed Martial Law acts (May/June 1857); Delhi stormed Sept 1857 by John Nicholson.",
        "British Paintings: 'Relief of Lucknow' by Thomas Jones Barker; 'In Memoriam' by Joseph Noel Paton; Punch cartoon 'Justice'.",
        "Nationalist Memory: Subhadra Kumari Chauhan immortalized Rani of Jhansi ('Khoob lari mardani').",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u10_q1",
        questionNumber: 1,
        question: "On which date did the sepoys at Meerut cantonment mutiny, marking the formal outbreak of the 1857 Revolt?",
        options: [
          { id: "A", text: "29 March 1857" },
          { id: "B", text: "10 May 1857" },
          { id: "C", text: "23 June 1857" },
          { id: "D", text: "15 August 1857" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Late in the afternoon of 10 May 1857, the sepoys in the cantonment of Meerut broke out in mutiny.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u10_q2",
        questionNumber: 2,
        question: "Who among the following was the Kol tribal leader who organized the rebel forces in Singhbhum (Chota Nagpur) during 1857?",
        options: [
          { id: "A", text: "Gonoo" },
          { id: "B", text: "Birsa Munda" },
          { id: "C", text: "Sidhu Manjhi" },
          { id: "D", text: "Shah Mal" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Gonoo, a tribal cultivator of the Kol community in Singhbhum, mobilized the local population during 1857.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u10_q3",
        questionNumber: 3,
        question: "In 1856, the British dethroned and exiled which Nawab of Awadh to Calcutta on grounds of misgovernance?",
        options: [
          { id: "A", text: "Saadat Ali Khan" },
          { id: "B", text: "Asaf-ud-Daula" },
          { id: "C", text: "Wajid Ali Shah" },
          { id: "D", text: "Birjis Qadr" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "Nawab Wajid Ali Shah was dethroned and exiled to Calcutta on the plea that the region was being misgoverned.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u10_q4",
        questionNumber: 4,
        question: "What was the immediate effect of the British Summary Settlement of 1856 in Awadh?",
        options: [
          { id: "A", text: "All peasants were given free ownership of land without taxation" },
          { id: "B", text: "The landed taluqdars were dispossessed of their estates and forts, reducing their holdings from 67% to 38%" },
          { id: "C", text: "The British returned all administrative powers to the royal court" },
          { id: "D", text: "Awadh was declared a tax-free special economic zone" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The Summary Settlement proceeded to remove the taluqdars wherever possible, reducing the proportion of villages under their control from 67% to 38%.",
        questionType: "Conceptual Direct",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u10_q5",
        questionNumber: 5,
        question: "The famous rebel manifesto published on 25 August 1857 appealing for Hindu-Muslim unity and declaring the aims of the rebellion is known as:",
        options: [
          { id: "A", text: "Meerut Manifesto" },
          { id: "B", text: "Azamgarh Proclamation" },
          { id: "C", text: "Delhi Declaration" },
          { id: "D", text: "Kanpur Circular" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The Azamgarh Proclamation of 25 August 1857 was one of the most prominent proclamations setting out the rebel vision.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u10_q6",
        questionNumber: 6,
        question: "Who painted the celebrated canvas 'Relief of Lucknow' in 1859, celebrating the British rescue of the besieged Residency by Colin Campbell?",
        options: [
          { id: "A", text: "Thomas Jones Barker" },
          { id: "B", text: "Joseph Noel Paton" },
          { id: "C", text: "Alexander Greenlaw" },
          { id: "D", text: "Henry Lawrence" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Thomas Jones Barker painted 'Relief of Lucknow' in 1859 to celebrate the arrival of Campbell's forces.",
        questionType: "Art Historical Attribution",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u10_q7",
        questionNumber: 7,
        question: "Which painter produced the emotionally charged painting 'In Memoriam' (1858), depicting British women and children huddled together in terror?",
        options: [
          { id: "A", text: "Joseph Noel Paton" },
          { id: "B", text: "Thomas Jones Barker" },
          { id: "C", text: "Colin Campbell" },
          { id: "D", text: "John Ruskin" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Joseph Noel Paton painted 'In Memoriam' two years after the mutiny, depicting English women and children huddled in prayer.",
        questionType: "Art Historical Attribution",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u10_q8",
        questionNumber: 8,
        question: "Who was the local leader who mobilized the villagers of pargana Barout (Baghpat, UP), turning his house into a 'hall of justice' during 1857?",
        options: [
          { id: "A", text: "Shah Mal" },
          { id: "B", text: "Maulvi Ahmadullah" },
          { id: "C", text: "Kunwar Singh" },
          { id: "D", text: "Bakht Khan" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Shah Mal lived in a large village in pargana Barout (Uttar Pradesh) and mobilized headmen and cultivators of chaurasee des.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u10_q9",
        questionNumber: 9,
        question: "Which Indian poet composed the celebrated nationalist poem featuring the lines 'Khoob lari mardani woh toh Jhansi wali rani thi'?",
        options: [
          { id: "A", text: "Sarojini Naidu" },
          { id: "B", text: "Subhadra Kumari Chauhan" },
          { id: "C", text: "Mahadevi Varma" },
          { id: "D", text: "Toru Dutt" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Subhadra Kumari Chauhan wrote the poem 'Jhansi ki Rani' celebrating Rani Lakshmibai.",
        questionType: "Literary Attribution",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u10_q10",
        questionNumber: 10,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): The annexation of Awadh in 1856 created intense resentment among sepoys of the British Bengal Army.\nReason (R): For decades the sepoys had complained of low pay, difficulty in getting leave, and racial abuse by white officers, and the annexation of their home state directly affected their families' social status and land rights.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Sepoys were 'peasants in uniform'. What affected the countryside directly affected the sepoys. Both are true and (R) explains (A).",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: [
        { title: "Colonialism and Countryside", topicId: "history_u9_t1", slug: "permanent-settlement-santhal-uprising-deccan-riots-commission" },
      ],
      relatedTopics: [
        { title: "Mahatma Gandhi and National Movement", topicId: "history_u11_t1", slug: "non-cooperation-civil-disobedience-salt-march-quit-india-movement-partition" },
      ],
      practiceTestId: "practice-history-unit10-test1",
      practiceTestUrl: "/test/practice-history-unit10-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 11: Mahatma Gandhi and the Nationalist Movement - Civil Disobedience and Beyond
  // -------------------------------------------------------------------------
  {
    id: "history_u11_t1",
    slug: "non-cooperation-civil-disobedience-salt-march-quit-india-movement-partition",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 11,
    unitTitle: "Mahatma Gandhi and National Movement",
    topicTitle: "Non-Cooperation, Civil Disobedience, Salt March, Quit India Movement, Partition",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part III",
      chapterNumber: 11,
      chapterName: "Mahatma Gandhi and the Nationalist Movement: Civil Disobedience and Beyond",
      sections: [
        "1. A Leader Announces Himself (Return from South Africa 1915, BHU Speech 1916)",
        "2. The Making and Unmaking of Non-Cooperation (1920-1922, Chauri Chaura)",
        "3. The Salt Satyagraha: A Case Study (Dandi March, 12 March - 6 April 1930)",
        "4. Round Table Conferences and Gandhi-Irwin Pact (1931)",
        "5. The Last Heroic Days: Quit India (1942), Cabinet Mission (1946), Partition",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely High (6-8 questions per shift)",
      totalPyqsInRepo: 84,
      weightagePercentage: 16,
      expectedQuestions: "6 MCQs covering Gandhi's return (Jan 1915), BHU speech (Feb 1916), Champaran/Kheda/Ahmedabad (1917-18), Non-Cooperation and Chauri Chaura (Feb 1922), Dandi March (12 March - 6 April 1930), Round Table Conferences, and Quit India ('Do or Die', 1942)",
      typicalQuestionTypes: [
        "Chronological ordering of Gandhian movements (Champaran 1917 -> Rowlatt 1919 -> Non-Cooperation 1920 -> Dandi 1930 -> Quit India 1942)",
        "Match the Following (Movement, Year, Catalyst/Trigger)",
        "Dandi March factual parameters (240 miles, 24 days, 78 followers, Sabarmati to Dandi)",
        "Assertion-Reason on withdrawal of Non-Cooperation after Chauri Chaura",
      ],
    },
    summary30s: [
      "Mahatma Gandhi returned to India from South Africa in January 1915; his mentor Gopal Krishna Gokhale advised him to tour the country for a year before engaging in politics.",
      "His first major public appearance was at the opening of Banaras Hindu University (BHU) in February 1916, where he admonished the elite for ignoring the millions of poor peasants.",
      "Early localized satyagrahas in Champaran (1917), Ahmedabad (1918), and Kheda (1918) established his grassroots technique of non-violent mass struggle.",
      "The Non-Cooperation Movement (1920-22) united with Khilafat; called off after the violent Chauri Chaura incident in February 1922.",
      "The Salt March (12 March - 6 April 1930) mobilized women and masses against the British salt monopoly, leading to the Gandhi-Irwin Pact and the 1942 Quit India Movement ('Do or Die').",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "Return to India and Early Satyagrahas (1915-1918)",
        explanation:
          "Gandhiji returned to India in January 1915 after 20 years in South Africa, where he had forged the weapon of Satyagraha. On the advice of Gopal Krishna Gokhale, he spent his first year travelling across the country. In February 1916, he spoke at the opening of Banaras Hindu University (BHU), famously declaring: 'There is no salvation for India unless you strip yourselves of this jewellery and hold it in trust for your countrymen in India.' In 1917, at the request of Rajkumar Shukla, he intervened in Champaran (Bihar) against the oppressive European indigo planters (tinkathia system). In 1918, he led a strike of textile mill workers in Ahmedabad demanding a 35% wage increase, followed by the Kheda Satyagraha supporting peasants facing crop failure.",
        ncertPointer: "Themes in Indian History Part III, Section 1",
        examTip: "Chronology of early satyagrahas: Champaran (1917) -> Ahmedabad Mill Strike (early 1918) -> Kheda (mid 1918).",
      },
      {
        id: "c2",
        title: "Rowlatt Satyagraha and Non-Cooperation Movement (1919-1922)",
        explanation:
          "In 1919, the British passed the Rowlatt Act, allowing detention of political prisoners without trial for two years. Gandhi called for a nationwide hartal on 6 April 1919. On 13 April 1919, General Dyer ordered troops to fire upon an unarmed gathering at Jallianwala Bagh in Amritsar. In 1920, Gandhi linked Non-Cooperation with the Khilafat Movement led by Muhammad Ali and Shaukat Ali to forge Hindu-Muslim unity. The movement entailed boycotting government schools, law courts, foreign cloth, and surrendering titles. On 4 February 1922, a crowd attacked and set fire to a police station at Chauri Chaura (Gorakhpur, UP), killing 22 policemen. Committed strictly to Ahimsa, Gandhi immediately called off the Non-Cooperation Movement.",
        ncertPointer: "Themes in Indian History Part III, Section 2",
        examTip: "Chauri Chaura occurred in February 1922 in Gorakhpur district, prompting Gandhi to suspend Non-Cooperation unconditionally.",
      },
      {
        id: "c3",
        title: "The Salt March and Civil Disobedience (1930-1931)",
        explanation:
          "At the Lahore Congress of December 1929, presided over by Jawaharlal Nehru, the goal of 'Purna Swaraj' (complete independence) was proclaimed, and 26 January 1930 was celebrated as Independence Day. Gandhi launched Civil Disobedience against the state salt monopoly. On 12 March 1930, Gandhi marched from his Sabarmati Ashram with 78 chosen volunteers, covering 240 miles in 24 days to reach Dandi on 5 April. On morning of 6 April 1930, he picked up a handful of natural salt, breaking the colonial salt law. The march made Gandhi world-famous (covered widely by Time magazine) and saw massive participation by women (urged by socialist Kamaladevi Chattopadhyay). In March 1931, the Gandhi-Irwin Pact was signed: British agreed to release political prisoners not guilty of violence and permit coastal salt-making, while Congress suspended Civil Disobedience and agreed to attend the Second Round Table Conference in London.",
        ncertPointer: "Themes in Indian History Part III, Sections 3 & 4",
        examTip: "Kamaladevi Chattopadhyay persuaded Gandhi not to restrict the salt protests to men, inaugurating mass female political mobilization.",
      },
      {
        id: "c4",
        title: "Quit India (1942), Cabinet Mission, and Partition",
        explanation:
          "Following the failure of the Cripps Mission in March 1942, Gandhi launched the 'Quit India Movement' from Bombay on 8 August 1942, issuing the historic mantra: 'Do or Die' (Karo ya Maro). The British arrested the entire Congress Working Committee on 9 August. Mass spontaneous uprisings followed: parallel governments ('Prati Sarkar') were established in Satara (Maharashtra) and Midnapore (Jatiya Sarkar). Underground networks were run by Jayaprakash Narayan, Aruna Asaf Ali, and Ram Manohar Lohia. In 1946, the British sent the Cabinet Mission (Pethick-Lawrence, Stafford Cripps, A.V. Alexander) proposing a three-tiered confederation, but it collapsed over grouping clauses. On 16 August 1946, the Muslim League launched 'Direct Action Day', triggering deadly communal violence in Calcutta. Lord Mountbatten announced the partition plan on 3 June 1947, and on 15 August 1947, India gained independence.",
        ncertPointer: "Themes in Indian History Part III, Section 5",
        examTip: "Three members of 1946 Cabinet Mission: Lord Pethick-Lawrence, Sir Stafford Cripps, and A.V. Alexander.",
      },
    ],
    keyFormulas: [
      {
        name: "Dandi March Quantitative Dimensions",
        formula: "\\text{Start}: 12 \\text{ March 1930} \\rightarrow \\text{Finish}: 6 \\text{ April 1930} \\quad | \\quad \\text{Distance}: 240 \\text{ miles (24 days)} \\quad | \\quad \\text{Volunteers}: 78",
        symbols: "Route: Sabarmati Ashram (Ahmedabad) to Dandi seashore (Navsari)",
        siUnits: "Historical Metrics",
        whenToUse: "Factual MCQ testing parameters of the Salt March.",
      },
      {
        name: "Gandhian Pan-Indian Movement Milestones",
        formula: "1919 (\\text{Rowlatt}) \\rightarrow 1920\\text{-}22 (\\text{Non-Cooperation}) \\rightarrow 1930\\text{-}31 (\\text{Civil Disobedience}) \\rightarrow 1942 (\\text{Quit India})",
        symbols: "Three pan-Indian mass movements led by Mahatma Gandhi",
        siUnits: "Movement Chronology",
        whenToUse: "Ordering major national movements in chronological order.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Trajectory of the Gandhian Mass Movements (1915-1947)",
      caption: "From South Africa return to Champaran, Non-Cooperation, Dandi March, and Quit India",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">GANDHIAN NATIONAL MOVEMENTS CHRONOLOGY (1915 - 1947)</text>

  <!-- Timeline Line -->
  <line x1="80" y1="200" x2="720" y2="200" stroke="#0284c7" strokeWidth="4" />

  <!-- Point 1: 1915-16 -->
  <circle cx="120" cy="200" r="10" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
  <rect x="50" y="90" width="140" height="80" fill="#fef3c7" stroke="#d97706" rx="4" />
  <text x="120" y="115" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">1915 - 1916</text>
  <text x="120" y="132" textAnchor="middle" fill="#78350f" fontSize="10">Return from S. Africa</text>
  <text x="120" y="147" textAnchor="middle" fill="#78350f" fontSize="10">BHU Speech (Feb 1916)</text>
  <text x="120" y="162" textAnchor="middle" fill="#78350f" fontSize="9">Gokhale as mentor</text>

  <!-- Point 2: 1917-18 -->
  <circle cx="260" cy="200" r="10" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
  <rect x="190" y="230" width="140" height="80" fill="#f0fdf4" stroke="#16a34a" rx="4" />
  <text x="260" y="255" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">1917 - 1918</text>
  <text x="260" y="272" textAnchor="middle" fill="#14532d" fontSize="10">Champaran (Indigo)</text>
  <text x="260" y="287" textAnchor="middle" fill="#14532d" fontSize="10">Ahmedabad (Mills)</text>
  <text x="260" y="302" textAnchor="middle" fill="#14532d" fontSize="10">Kheda Satyagraha</text>

  <!-- Point 3: 1920-22 -->
  <circle cx="400" cy="200" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
  <rect x="330" y="90" width="140" height="80" fill="#fee2e2" stroke="#dc2626" rx="4" />
  <text x="400" y="115" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">1920 - 1922</text>
  <text x="400" y="132" textAnchor="middle" fill="#7f1d1d" fontSize="10">Non-Cooperation</text>
  <text x="400" y="147" textAnchor="middle" fill="#7f1d1d" fontSize="10">+ Khilafat Alliance</text>
  <text x="400" y="162" textAnchor="middle" fill="#991b1b" fontSize="9">Chauri Chaura halt</text>

  <!-- Point 4: 1930-31 -->
  <circle cx="540" cy="200" r="10" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
  <rect x="470" y="230" width="140" height="80" fill="#e0f2fe" stroke="#0284c7" rx="4" />
  <text x="540" y="255" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">1930 - 1931</text>
  <text x="540" y="272" textAnchor="middle" fill="#0c4a6e" fontSize="10">Dandi Salt March</text>
  <text x="540" y="287" textAnchor="middle" fill="#0c4a6e" fontSize="10">Civil Disobedience</text>
  <text x="540" y="302" textAnchor="middle" fill="#0369a1" fontSize="9">Gandhi-Irwin Pact</text>

  <!-- Point 5: 1942 -->
  <circle cx="680" cy="200" r="10" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
  <rect x="610" y="90" width="140" height="80" fill="#f5f3ff" stroke="#7c3aed" rx="4" />
  <text x="680" y="115" textAnchor="middle" fill="#5b21b6" fontSize="11" fontWeight="bold">1942</text>
  <text x="680" y="132" textAnchor="middle" fill="#4c1d95" fontSize="10">Quit India Movement</text>
  <text x="680" y="147" textAnchor="middle" fill="#4c1d95" fontSize="10">"Do or Die" call</text>
  <text x="680" y="162" textAnchor="middle" fill="#5b21b6" fontSize="9">Parallel Governments</text>

  <!-- Bottom Info -->
  <rect x="50" y="365" width="700" height="35" fill="#f1f5f9" rx="4" />
  <text x="400" y="387" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
    Dandi March: 12 March to 6 April 1930 | 240 miles from Sabarmati to Dandi | 78 volunteers
  </text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">GANDHIAN NATIONAL MOVEMENTS CHRONOLOGY (1915 - 1947)</text>
  <line x1="80" y1="200" x2="720" y2="200" stroke="#0284c7" strokeWidth="4" />
  <circle cx="120" cy="200" r="10" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
  <circle cx="260" cy="200" r="10" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
  <circle cx="400" cy="200" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
  <circle cx="540" cy="200" r="10" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
  <circle cx="680" cy="200" r="10" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "Which socialist leader persuaded Mahatma Gandhi not to restrict the Salt Satyagraha protests solely to men, leading to thousands of women courting arrest?\n(A) Sarojini Naidu\n(B) Kamaladevi Chattopadhyay\n(C) Aruna Asaf Ali\n(D) Sucheta Kripalani",
        options: [
          { id: "A", text: "Sarojini Naidu" },
          { id: "B", text: "Kamaladevi Chattopadhyay" },
          { id: "C", text: "Aruna Asaf Ali" },
          { id: "D", text: "Sucheta Kripalani" },
        ],
        correctOption: "B",
        explanation:
          "Kamaladevi Chattopadhyay, a socialist activist, persuaded Gandhiji not to restrict the protests to men. Kamaladevi herself was among numerous women who courted arrest by breaking the salt and liquor laws.",
        solutionStepByStep: [
          "Step 1: Check NCERT Theme 11 Section 3: 'The Salt Satyagraha: A Case Study'.",
          "Step 2: Explicitly names Kamaladevi Chattopadhyay as the activist who convinced Gandhi to open the movement to women.",
          "Conclusion: Option B is correct.",
        ],
        cuetPattern: "Women's agency and historical interventions in the freedom struggle.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "Arrange the following historical events in chronological order:\n(i) Chauri Chaura incident\n(ii) Champaran Satyagraha\n(iii) Gandhi-Irwin Pact\n(iv) Launch of Quit India Movement",
        options: [
          { id: "A", text: "(ii), (i), (iii), (iv)" },
          { id: "B", text: "(i), (ii), (iii), (iv)" },
          { id: "C", text: "(ii), (iii), (i), (iv)" },
          { id: "D", text: "(ii), (i), (iv), (iii)" },
        ],
        correctOption: "A",
        explanation:
          "Champaran Satyagraha took place in 1917; Chauri Chaura incident occurred in February 1922; Gandhi-Irwin Pact was signed in March 1931; Quit India Movement was launched on 8 August 1942.",
        solutionStepByStep: [
          "Step 1: Champaran Satyagraha = 1917 (ii).",
          "Step 2: Chauri Chaura incident = February 1922 (i).",
          "Step 3: Gandhi-Irwin Pact = March 1931 (iii).",
          "Step 4: Quit India Movement = August 1942 (iv).",
          "Conclusion: Sequence is (ii), (i), (iii), (iv). Option A is correct.",
        ],
        cuetPattern: "Standard chronological sequence question on modern Indian history.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Dandi March Departure & Arrival Dates",
        frequency: "Very High",
        typicalStem: "On which date did Mahatma Gandhi begin his historic march from Sabarmati to Dandi?",
        strategy: "12 March 1930 (reached Dandi on 5 April, broke salt law on 6 April 1930).",
      },
      {
        patternType: "First Public Appearance in India",
        frequency: "High",
        typicalStem: "Where did Mahatma Gandhi make his first major public appearance in India after returning from South Africa?",
        strategy: "At the opening of Banaras Hindu University (BHU) in February 1916.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming Gandhi attended all three Round Table Conferences in London.",
        correctConcept: "Congress boycotted the First (1930) and Third (1932) Round Table Conferences. Gandhi attended ONLY the Second Round Table Conference (autumn 1931) as the sole representative of the Congress.",
        whyTrapWorks: "Questions ask 'Which Round Table Conference(s) did Gandhi attend?' and students pick 'All three' or 'First and Second'.",
        cuetWarning: "Gandhi attended ONLY the Second Round Table Conference (1931).",
      },
      {
        misconception: "Believing the Lahore Session of Congress happened in 1930.",
        correctConcept: "The historic Lahore Congress Session occurred in DECEMBER 1929 under Jawaharlal Nehru, where Purna Swaraj was adopted; 26 January 1930 was chosen as Independence Day.",
        whyTrapWorks: "26 January 1930 leads students to misdate the session itself to 1930.",
        cuetWarning: "Session = December 1929; Independence Day celebration = 26 January 1930.",
      },
    ],
    mnemonics: [
      {
        title: "Early Satyagrahas (C-A-K)",
        mnemonic: "Gandhi Likes CAKe",
        expansion: "Champaran (1917) -> Ahmedabad (1918) -> Kheda (1918)",
        context: "Instantly orders Gandhi's first three regional satyagrahas in India.",
      },
    ],
    quickRevisionCard: {
      title: "Mahatma Gandhi & National Movement Revision",
      bulletPoints: [
        "Jan 1915: Return from South Africa; mentor Gokhale advised nationwide tour for 1 year.",
        "Feb 1916: BHU opening speech; castigated wealthy elite for neglecting poor peasants.",
        "1917-1918: Champaran (indigo/tinkathia), Ahmedabad (mill strike/35% wage), Kheda (crop failure).",
        "Rowlatt Satyagraha (1919): Protest against detention without trial; Jallianwala Bagh on 13 April 1919 (Dyer).",
        "Non-Cooperation (1920-22): Boycott of schools, courts, cloth; Khilafat alliance; halted after Chauri Chaura (Feb 1922).",
        "Lahore Congress (Dec 1929): Nehru president; Purna Swaraj; celebrated Independence Day on 26 Jan 1930.",
        "Dandi March: 12 March - 6 April 1930; 240 miles, 78 volunteers; broke salt law at Dandi; Kamaladevi urged female entry.",
        "Second Round Table Conference (1931): Gandhi attended as sole Congress representative; deadlocked on separate electorates.",
        "Quit India (8 Aug 1942): 'Do or Die' mantra; CWC arrested; parallel govts at Satara (Prati Sarkar) and Midnapore.",
        "Independence & Partition: Cabinet Mission (1946) rejected; Direct Action Day (16 Aug 1946); Partition on 15 Aug 1947.",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u11_q1",
        questionNumber: 1,
        question: "Whom did Mahatma Gandhi acknowledge as his political mentor upon returning to India in 1915?",
        options: [
          { id: "A", text: "Bal Gangadhar Tilak" },
          { id: "B", text: "Gopal Krishna Gokhale" },
          { id: "C", text: "Bipin Chandra Pal" },
          { id: "D", text: "Dadabhai Naoroji" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "On Gokhale's advice, Gandhiji spent a year travelling around British India, getting to know the land and its peoples.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u11_q2",
        questionNumber: 2,
        question: "In which year did the violent incident at Chauri Chaura take place, prompting Gandhi to call off the Non-Cooperation Movement?",
        options: [
          { id: "A", text: "1920" },
          { id: "B", text: "1921" },
          { id: "C", text: "1922" },
          { id: "D", text: "1924" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "In February 1922, a crowd of peasants attacked and burnt a police station in Chauri Chaura, prompting Gandhi to call off the movement.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u11_q3",
        questionNumber: 3,
        question: "How many chosen volunteers accompanied Mahatma Gandhi when he set out on the Salt March from Sabarmati Ashram on 12 March 1930?",
        options: [
          { id: "A", text: "50" },
          { id: "B", text: "72" },
          { id: "C", text: "78" },
          { id: "D", text: "100" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "Mahatma Gandhi walked with 78 volunteers from his ashram at Sabarmati to the Gujarati coastal village of Dandi.",
        questionType: "Historical Metric",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u11_q4",
        questionNumber: 4,
        question: "At which historic Congress session was the resolution of 'Purna Swaraj' (Complete Independence) formally adopted under the presidency of Jawaharlal Nehru?",
        options: [
          { id: "A", text: "Calcutta Session 1928" },
          { id: "B", text: "Lahore Session 1929" },
          { id: "C", text: "Karachi Session 1931" },
          { id: "D", text: "Tripuri Session 1939" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "At the end of December 1929, the Congress held its annual session in Lahore. The meeting was significant for the election of Jawaharlal Nehru as President, and the proclamation of commitment to Purna Swaraj.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u11_q5",
        questionNumber: 5,
        question: "Which of the three Round Table Conferences held in London was attended by Mahatma Gandhi as the sole representative of the Indian National Congress?",
        options: [
          { id: "A", text: "First Round Table Conference (1930)" },
          { id: "B", text: "Second Round Table Conference (1931)" },
          { id: "C", text: "Third Round Table Conference (1932)" },
          { id: "D", text: "All three conferences" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "A Second Round Table Conference was held in London in late 1931. Here, Gandhiji represented the Congress as its sole representative.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u11_q6",
        questionNumber: 6,
        question: "What historic mantra did Mahatma Gandhi give to the nation on launching the Quit India Movement in August 1942?",
        options: [
          { id: "A", text: "'Inquilab Zindabad'" },
          { id: "B", text: "'Jai Hind'" },
          { id: "C", text: "'Do or Die' ('Karo ya Maro')" },
          { id: "D", text: "'Swaraj is my birthright'" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "Addressing the Congress delegates at Gowalia Tank in Bombay, Gandhi gave the call 'Do or Die'.",
        questionType: "Famous Quotation",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u11_q7",
        questionNumber: 7,
        question: "During the Quit India Movement of 1942, an independent parallel government called 'Prati Sarkar' was established in which district of Maharashtra?",
        options: [
          { id: "A", text: "Satara" },
          { id: "B", text: "Pune" },
          { id: "C", text: "Nagpur" },
          { id: "D", text: "Nasik" },
        ],
        correctOption: "A",
        explanation: "In Satara (Maharashtra), a parallel government called the 'Prati Sarkar' was set up under leaders like Nana Patil.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u11_q8",
        questionNumber: 8,
        question: "Who was the peasant cultivator from Champaran who persistently met Gandhiji at Lucknow and Kanpur to persuade him to visit Champaran?",
        options: [
          { id: "A", text: "Rajkumar Shukla" },
          { id: "B", text: "Sahajanand Saraswati" },
          { id: "C", text: "Babu Kunwar Singh" },
          { id: "D", text: "Anugrah Narayan Sinha" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Rajkumar Shukla, an agriculturist from Champaran, met Gandhi at the Lucknow Congress in December 1916 and persuaded him to visit.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u11_q9",
        questionNumber: 9,
        question: "Which American news magazine initially derided Mahatma Gandhi's physical appearance during the Salt March, but later lauded him as a 'Saint' after the movement's success?",
        options: [
          { id: "A", text: "Time" },
          { id: "B", text: "Newsweek" },
          { id: "C", text: "The New Yorker" },
          { id: "D", text: "Life" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Time magazine initially scoffed at Gandhi's spindly frame, but within weeks changed its tune, saluting him as a Saint and Statesman.",
        questionType: "Historiographical Detail",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u11_q10",
        questionNumber: 10,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): Mahatma Gandhi chose common salt as the central symbol of the 1930 Civil Disobedience movement.\nReason (R): Salt was an indispensable commodity consumed equally by every household, and the British state monopoly and tax on salt was a universally felt grievance uniting all Indians across caste and religion.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Gandhi recognized salt as a universal necessity. The tax fell heavily on the poorest, making it an ideal symbol to unite the nation. Both are true and (R) explains (A).",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "Revolt of 1857", topicId: "history_u10_t1", slug: "outbreak-leadership-rebel-proclamations-british-counter-offensive-visual-imagery" },
      ],
      relatedTopics: [
        { title: "Framing of the Constitution", topicId: "history_u12_t1", slug: "constituent-assembly-debates-objectives-resolution-federalism-language-debates" },
      ],
      practiceTestId: "practice-history-unit11-test1",
      practiceTestUrl: "/test/practice-history-unit11-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },

  // -------------------------------------------------------------------------
  // UNIT 12: Framing the Constitution - The Beginning of a New Era
  // -------------------------------------------------------------------------
  {
    id: "history_u12_t1",
    slug: "constituent-assembly-debates-objectives-resolution-federalism-language-debates",
    subject: "history",
    subjectName: "History",
    subjectCode: "314",
    unitNumber: 12,
    unitTitle: "The Making of the Constitution (Framing the Constitution)",
    topicTitle: "Constituent Assembly Debates, Objectives Resolution, Federalism, Language Debates",
    ncertReference: {
      class: "12",
      book: "Themes in Indian History Part III",
      chapterNumber: 12,
      chapterName: "Framing the Constitution: The Beginning of a New Era",
      sections: [
        "1. A Tumultuous Time (Constituent Assembly Composition, 1946-1949)",
        "2. The Vision of the Constitution (Nehru's Objectives Resolution 13 Dec 1946)",
        "3. Defining Rights (Separate Electorates Debate: Patel vs Pocker Bahadur)",
        "4. The Powers of the State (Union vs States, Santhanam's warning)",
        "5. The Language of the Nation (Hindustani vs Hindi, Dhulekar vs South Indian members)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Extremely High (5-7 questions per shift in CUET History)",
      totalPyqsInRepo: 68,
      weightagePercentage: 14,
      expectedQuestions: "5 MCQs covering Objectives Resolution (13 Dec 1946), Key figures (Nehru, Patel, Prasad, Ambedkar, B.N. Rau, S.N. Mukherjee), Separate Electorates debates (Govind Ballabh Pant, Sardar Patel, Begum Aizaz Rasul), and Language debate compromise (Hindi as Official Language)",
      typicalQuestionTypes: [
        "Match the Following (Constituent Assembly Member with their role/stand)",
        "Chronological ordering of Constitutional milestones (9 Dec 1946 first sitting -> 13 Dec 1946 Objectives Resolution -> 26 Nov 1949 adoption -> 26 Jan 1950 enforcement)",
        "Debates on Depressed Castes (Ambedkar vs Jaipal Singh for tribals)",
        "Assertion-Reason on language compromise (Official vs National language)",
      ],
    },
    summary30s: [
      "The Indian Constitution was drafted by the Constituent Assembly between December 1946 and November 1949, comprising 300 members after Partition (82% Congress members).",
      "Six individuals played pivotal roles: Jawaharlal Nehru, Vallabhbhai Patel, Rajendra Prasad (President of Assembly), B.R. Ambedkar (Drafting Committee Chairman), K.M. Munshi, and Alladi Krishnaswamy Iyer.",
      "Nehru moved the historic 'Objectives Resolution' on 13 December 1946, outlining the ideals of an Independent Sovereign Republic committed to justice, equality, and freedom.",
      "Demands for separate electorates were rejected as divisive by Sardar Patel and Govind Ballabh Pant, while safeguards for Depressed Classes and Adivasis (led by Jaipal Singh) were enshrined.",
      "The language dispute between Hindi enthusiasts (R.V. Dhulekar) and non-Hindi speakers was resolved through the Language Committee's compromise: Hindi in Devanagari script became the 'Official Language', not 'National Language'.",
    ],
    coreConcepts: [
      {
        id: "c1",
        title: "The Constituent Assembly: Composition and Key Roles",
        explanation:
          "The Constituent Assembly had 300 members (originally 389 before Partition). While the Congress held 82% of seats, it accommodated diverse viewpoints: socialists, capitalists, conservatives, and social reformers. Six key individuals shaped proceedings: three from Congress (Jawaharlal Nehru who moved the Objectives Resolution; Vallabhbhai Patel who worked behind the scenes drafting compromise reports; and Dr. Rajendra Prasad who presided as President of the Assembly); two eminent constitutional lawyers (Dr. B.R. Ambedkar who served as Chairman of the Drafting Committee; and K.M. Munshi from Gujarat); and Alladi Krishnaswamy Iyer from Madras. They were assisted by two civil servants: Constitutional Advisor B.N. Rau (prepared background papers on global constitutions) and Chief Draughtsman S.N. Mukherjee (translated complex legal ideas into precise legislative drafting).",
        ncertPointer: "Themes in Indian History Part III, Section 1",
        examTip: "B.N. Rau = Constitutional Advisor; S.N. Mukherjee = Chief Draughtsman; B.R. Ambedkar = Chairman of Drafting Committee.",
      },
      {
        id: "c2",
        title: "The Objectives Resolution (13 December 1946)",
        explanation:
          "On 13 December 1946, Jawaharlal Nehru introduced the historic 'Objectives Resolution'. It outlined the defining ideals of the Constitution: proclaiming India as an 'Independent Sovereign Republic', guaranteeing citizens justice, equality, and freedom, and providing adequate safeguards for minorities, backward and tribal areas, and depressed classes. Nehru emphasized that India was not simply copying Western constitutions (American or French), but adapting universal ideals to the unique genius of the Indian people. Communist member Somnath Lahiri pointed out that the Assembly was functioning under the shadow of British imperialism; Nehru agreed but emphasized that the Assembly derived its authority from the passion of the Indian masses.",
        ncertPointer: "Themes in Indian History Part III, Section 2: 'The Vision of the Constitution'",
        examTip: "Objectives Resolution: Moved by Nehru on 13 Dec 1946; laid the foundation for the Preamble of the Constitution.",
      },
      {
        id: "c3",
        title: "Debates on Rights: Separate Electorates vs Reserved Seats",
        explanation:
          "On 27 August 1947, B. Pocker Bahadur from Madras made a powerful plea for continuing separate electorates for Muslims. This sparked fierce opposition. Sardar Patel condemned separate electorates as a 'poison that has entered the body politic of our country' which caused Partition. Govind Ballabh Pant declared separate electorates suicidal for minorities because it isolated them permanently. Begum Aizaz Rasul (a Muslim member) also agreed that separate electorates were self-destructive. Regarding the Depressed Castes, Dr. Ambedkar abandoned his earlier demand for separate electorates after the 1932 Poona Pact, advocating reservation of seats in legislatures alongside the abolition of untouchability (Article 17). Jaipal Singh, representing Adivasis, spoke eloquently of 6,000 years of dispossession, demanding reserved legislative representation and constitutional protection for tribals.",
        ncertPointer: "Themes in Indian History Part III, Section 3: 'Defining Rights'",
        examTip: "Jaipal Singh = Representative of Adivasis in the Constituent Assembly; Begum Aizaz Rasul = Opposed separate electorates for Muslims.",
      },
      {
        id: "c4",
        title: "Federalism and the National Language Compromise",
        explanation:
          "The Assembly debated the balance of power between the Centre and the States. Drafted after the trauma of Partition, the Constitution created a strong Union. Three lists were crafted: Union List, State List, and Concurrent List; Article 356 gave the Centre power to take over provincial administration. K. Santhanam from Madras warned that overburdening the Centre with fiscal and administrative functions would weaken it, advocating greater financial resources for states. The language debate was the most contentious: R.V. Dhulekar made an aggressive pitch for Hindi as the national language. This provoked deep anxiety among members from South India (Shrimati G. Durgabai, T.A. Ramalingam Chettiar). The Language Committee arrived at a compromise formula: Hindi in the Devanagari script would be the 'Official Language' of the Union (NOT the National Language); English would continue to be used for all official purposes for a transition period of 15 years; and provinces could choose regional languages for provincial administration.",
        ncertPointer: "Themes in Indian History Part III, Sections 4 & 5",
        examTip: "Crucial distinction: Hindi is the OFFICIAL language (Rajbhasha) of the Union, NOT the National language (Rashtrabhasha).",
      },
    ],
    keyFormulas: [
      {
        name: "Constituent Assembly Milestones Chronology",
        formula: "9 \\text{ Dec 1946 (First Sitting)} \\rightarrow 13 \\text{ Dec 1946 (Objectives Resolution)} \\rightarrow 26 \\text{ Nov 1949 (Adoption)} \\rightarrow 26 \\text{ Jan 1950 (Enforcement)}",
        symbols: "Drafting spanned 2 years, 11 months, and 18 days across 11 sessions",
        siUnits: "Constitutional Chronology",
        whenToUse: "Ordering the milestones of the Indian Constitution.",
      },
      {
        name: "Language Formula Compromise Equation",
        formula: "\\text{Union Official Language} = \\text{Hindi (Devanagari)} + \\text{English (15-yr transition)} \\quad \\Longleftrightarrow \\quad \\text{National Language} = \\text{None}",
        symbols: "Crafted by the Language Committee to accommodate non-Hindi regions",
        siUnits: "Constitutional Formulation",
        whenToUse: "Questions on the language debate in the Constituent Assembly.",
      },
    ],
    diagram: {
      type: "svg",
      title: "Constituent Assembly: Key Architecture & Debate Themes",
      caption: "Institutional leadership, advisory apparatus, and core ideological debates",
      code: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">CONSTITUENT ASSEMBLY: ARCHITECTURE &amp; THREE CORE DEBATES</text>

  <!-- Central Leadership Box -->
  <rect x="50" y="60" width="700" height="90" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="400" y="85" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">KEY ARCHITECTS OF THE CONSTITUTION</text>
  <text x="160" y="110" textAnchor="middle" fill="#78350f" fontSize="11">
    <tspan fontWeight="bold">Jawaharlal Nehru:</tspan> Objectives Resolution
  </text>
  <text x="400" y="110" textAnchor="middle" fill="#78350f" fontSize="11">
    <tspan fontWeight="bold">Dr. Rajendra Prasad:</tspan> Assembly President
  </text>
  <text x="640" y="110" textAnchor="middle" fill="#78350f" fontSize="11">
    <tspan fontWeight="bold">Sardar Patel:</tspan> Compromise &amp; Integration
  </text>
  <text x="160" y="135" textAnchor="middle" fill="#78350f" fontSize="11">
    <tspan fontWeight="bold">Dr. B.R. Ambedkar:</tspan> Drafting Chairman
  </text>
  <text x="400" y="135" textAnchor="middle" fill="#78350f" fontSize="11">
    <tspan fontWeight="bold">B.N. Rau:</tspan> Constitutional Advisor
  </text>
  <text x="640" y="135" textAnchor="middle" fill="#78350f" fontSize="11">
    <tspan fontWeight="bold">S.N. Mukherjee:</tspan> Chief Draughtsman
  </text>

  <!-- Debate 1: Electorates & Rights -->
  <rect x="50" y="165" width="220" height="195" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="6" />
  <text x="160" y="190" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">SEPARATE ELECTORATES</text>
  <text x="65" y="215" fill="#0c4a6e" fontSize="10">• Pocker Bahadur demanded</text>
  <text x="65" y="230" fill="#0c4a6e" fontSize="10">  separate electorates</text>
  <text x="65" y="250" fill="#0c4a6e" fontSize="10">• Patel: "Poison in body politic"</text>
  <text x="65" y="270" fill="#0c4a6e" fontSize="10">• Pant &amp; Begum Aizaz Rasul</text>
  <text x="65" y="285" fill="#0c4a6e" fontSize="10">  rejected it as suicidal</text>
  <text x="65" y="305" fill="#0c4a6e" fontSize="10">• Jaipal Singh: Tribal rights</text>
  <text x="65" y="325" fill="#0c4a6e" fontSize="10">• Result: Reserved seats</text>

  <!-- Debate 2: Federalism -->
  <rect x="290" y="165" width="220" height="195" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" rx="6" />
  <text x="400" y="190" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">FEDERALISM &amp; POWERS</text>
  <text x="305" y="215" fill="#14532d" fontSize="10">• Partition trauma necessitated</text>
  <text x="305" y="230" fill="#14532d" fontSize="10">  a strong Central Union</text>
  <text x="305" y="250" fill="#14532d" fontSize="10">• 3 Lists: Union, State, Concurrent</text>
  <text x="305" y="270" fill="#14532d" fontSize="10">• Article 356: Emergency powers</text>
  <text x="305" y="290" fill="#14532d" fontSize="10">• K. Santhanam: Warned that</text>
  <text x="305" y="305" fill="#14532d" fontSize="10">  overburdening Centre impairs it</text>
  <text x="305" y="325" fill="#14532d" fontSize="10">• Fiscal autonomy debated</text>

  <!-- Debate 3: Language -->
  <rect x="530" y="165" width="220" height="195" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" rx="6" />
  <text x="640" y="190" textAnchor="middle" fill="#9d174d" fontSize="13" fontWeight="bold">THE LANGUAGE ISSUE</text>
  <text x="545" y="215" fill="#831843" fontSize="10">• R.V. Dhulekar: Aggressive push</text>
  <text x="545" y="230" fill="#831843" fontSize="10">  for Hindi as national language</text>
  <text x="545" y="250" fill="#831843" fontSize="10">• South members (Durgabai,</text>
  <text x="545" y="265" fill="#831843" fontSize="10">  Ramalingam Chettiar) alarmed</text>
  <text x="545" y="285" fill="#831843" fontSize="10">• Language Committee Compromise:</text>
  <text x="545" y="305" fill="#831843" fontSize="10">  - Hindi = Official Language</text>
  <text x="545" y="325" fill="#831843" fontSize="10">  - English continued for 15 yrs</text>

  <!-- Bottom Info -->
  <rect x="50" y="375" width="700" height="30" fill="#f1f5f9" rx="4" />
  <text x="400" y="395" textAnchor="middle" fill="#334155" fontSize="11">
    Adopted on 26 November 1949 | Signed by 284 members | Came into effect on 26 January 1950
  </text>
</svg>`,
    },
    diagramSvg: `<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="800" height="420" fill="#f8fafc" rx="8" />
  <text x="400" y="30" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">CONSTITUENT ASSEMBLY: ARCHITECTURE &amp; THREE CORE DEBATES</text>
  <rect x="50" y="60" width="700" height="90" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
  <text x="400" y="85" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">KEY ARCHITECTS OF THE CONSTITUTION</text>
  <rect x="50" y="165" width="220" height="195" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="6" />
  <text x="160" y="190" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">SEPARATE ELECTORATES</text>
  <rect x="290" y="165" width="220" height="195" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" rx="6" />
  <text x="400" y="190" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">FEDERALISM &amp; POWERS</text>
  <rect x="530" y="165" width="220" height="195" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" rx="6" />
  <text x="640" y="190" textAnchor="middle" fill="#9d174d" fontSize="13" fontWeight="bold">THE LANGUAGE ISSUE</text>
</svg>`,
    workedExamples: [
      {
        id: "we1",
        questionNumber: 1,
        question:
          "On which date did Jawaharlal Nehru move the historic 'Objectives Resolution' in the Constituent Assembly?\n(A) 9 December 1946\n(B) 11 December 1946\n(C) 13 December 1946\n(D) 26 November 1949",
        options: [
          { id: "A", text: "9 December 1946" },
          { id: "B", text: "11 December 1946" },
          { id: "C", text: "13 December 1946" },
          { id: "D", text: "26 November 1949" },
        ],
        correctOption: "C",
        explanation:
          "On 13 December 1946, Jawaharlal Nehru introduced the 'Objectives Resolution' in the Constituent Assembly, defining the ideals that were to guide the framing of the Constitution.",
        solutionStepByStep: [
          "Step 1: 9 Dec 1946 = First sitting of the Constituent Assembly.",
          "Step 2: 11 Dec 1946 = Dr. Rajendra Prasad elected permanent President.",
          "Step 3: 13 Dec 1946 = Jawaharlal Nehru moved the Objectives Resolution.",
          "Step 4: 26 Nov 1949 = Constitution adopted and enacted.",
          "Conclusion: Option C is correct.",
        ],
        cuetPattern: "Direct constitutional milestone date matching.",
      },
      {
        id: "we2",
        questionNumber: 2,
        question:
          "Who served as the Constitutional Advisor to the Government of India during the drafting of the Constitution, preparing comprehensive comparative background papers?\n(A) Dr. B.R. Ambedkar\n(B) Sir B.N. Rau\n(C) S.N. Mukherjee\n(D) Alladi Krishnaswamy Iyer",
        options: [
          { id: "A", text: "Dr. B.R. Ambedkar" },
          { id: "B", text: "Sir B.N. Rau" },
          { id: "C", text: "S.N. Mukherjee" },
          { id: "D", text: "Alladi Krishnaswamy Iyer" },
        ],
        correctOption: "B",
        explanation:
          "Sir B.N. Rau was the Constitutional Advisor to the Government of India. He prepared a series of background papers based on a close study of the political systems of other countries.",
        solutionStepByStep: [
          "Step 1: Ambedkar was Chairman of the Drafting Committee.",
          "Step 2: B.N. Rau was Constitutional Advisor.",
          "Step 3: S.N. Mukherjee was Chief Draughtsman.",
          "Conclusion: Option B (Sir B.N. Rau) is correct.",
        ],
        cuetPattern: "Differentiating between advisory, drafting, and presiding roles in the Assembly.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Key Assembly Speech Attribution",
        frequency: "Very High",
        typicalStem: "Who famously declared in the Constituent Assembly that separate electorates were 'a poison that has entered the body politic of our country'?",
        strategy: "Sardar Vallabhbhai Patel.",
      },
      {
        patternType: "Language Compromise Formula",
        frequency: "High",
        typicalStem: "According to the Constituent Assembly's Language Committee compromise, Hindi in Devanagari script was declared as the: (A) National Language, (B) Official Language, (C) Lingua Franca, (D) State Language.",
        strategy: "Official Language of the Union (Rajbhasha), NOT National Language.",
      },
    ],
    commonTraps: [
      {
        misconception: "Believing Hindi was made the 'National Language' of India by the Constitution.",
        correctConcept: "The Constitution does NOT declare Hindi as the 'National Language'. The Language Committee designated Hindi in Devanagari script as the 'OFFICIAL Language' (Rajbhasha) of the Union.",
        whyTrapWorks: "Common popular belief conflates Official Language with National Language.",
        cuetWarning: "Hindi is the Official Language, NOT the National Language.",
      },
      {
        misconception: "Confusing B.N. Rau with S.N. Mukherjee.",
        correctConcept: "B.N. Rau was the Constitutional Advisor; S.N. Mukherjee was the Chief Draughtsman.",
        whyTrapWorks: "Both were civil servants working closely with Ambedkar, leading to name confusion.",
        cuetWarning: "Rau = Advisor; Mukherjee = Draughtsman.",
      },
    ],
    mnemonics: [
      {
        title: "Two Key Civil Servants (R-A, M-D)",
        mnemonic: "Rau Advises, Mukherjee Drafts",
        expansion: "B.N. Rau = Constitutional Advisor; S.N. Mukherjee = Chief Draughtsman",
        context: "Instantly prevents confusion between the two civil servant architects of the Constitution.",
      },
    ],
    quickRevisionCard: {
      title: "Framing the Constitution Rapid Revision Sheet",
      bulletPoints: [
        "Constituent Assembly: 300 members (post-partition); Congress held 82% of seats.",
        "Key Leaders: Nehru (Objectives Resolution), Patel (compromise/states), Prasad (President), Ambedkar (Drafting Chairman).",
        "Civil Servants: Sir B.N. Rau (Constitutional Advisor) and S.N. Mukherjee (Chief Draughtsman).",
        "Objectives Resolution: Moved 13 Dec 1946 by Nehru; declared India an 'Independent Sovereign Republic'.",
        "Separate Electorates: Demanded by B. Pocker Bahadur; rejected by Patel ('poison in body politic'), Pant, and Begum Aizaz Rasul.",
        "Adivasi Voice: Jaipal Singh eloquently demanded recognition and reserved representation for indigenous tribes.",
        "Depressed Classes: Ambedkar and J. Nagappa advocated legislative reservations; untouchability abolished (Art. 17).",
        "Federalism: Partition trauma created a strong Centre; 3 lists (Union, State, Concurrent); Santhanam cautioned against overburdening Centre.",
        "Language Compromise: R.V. Dhulekar pushed for Hindi; South opposed; Hindi declared OFFICIAL Language (not National), English kept for 15 yrs.",
        "Timeline: 9 Dec 1946 (First sitting) -> 26 Nov 1949 (Adopted, 284 signatures) -> 26 Jan 1950 (Enforced).",
      ],
    },
    practiceQuestions: [
      {
        id: "history_u12_q1",
        questionNumber: 1,
        question: "Who among the following was the Chairman of the Drafting Committee of the Constituent Assembly?",
        options: [
          { id: "A", text: "Dr. Rajendra Prasad" },
          { id: "B", text: "Dr. B.R. Ambedkar" },
          { id: "C", text: "Jawaharlal Nehru" },
          { id: "D", text: "Sardar Vallabhbhai Patel" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "Dr. B.R. Ambedkar served as Chairman of the Drafting Committee of the Constitution.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u12_q2",
        questionNumber: 2,
        question: "Who was the Chief Draughtsman of the Constituent Assembly who had the ability to put complex proposals into clear legal language?",
        options: [
          { id: "A", text: "Sir B.N. Rau" },
          { id: "B", text: "S.N. Mukherjee" },
          { id: "C", text: "K.M. Munshi" },
          { id: "D", text: "Alladi Krishnaswamy Iyer" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "S.N. Mukherjee was the Chief Draughtsman, whose ability to translate intricate proposals into clear legal language was praised by Ambedkar.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u12_q3",
        questionNumber: 3,
        question: "Who represented the Adivasis in the Constituent Assembly and spoke passionately about their historical dispossession and the need for protection?",
        options: [
          { id: "A", text: "Jaipal Singh" },
          { id: "B", text: "Birsa Munda" },
          { id: "C", text: "Nagappa" },
          { id: "D", text: "K.J. Khandekar" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Jaipal Singh, a gifted speaker and hockey Olympian representing the Adivasis, made a moving speech on tribal rights.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u12_q4",
        questionNumber: 4,
        question: "Which Muslim woman member of the Constituent Assembly spoke against separate electorates, arguing they were self-destructive for minorities?",
        options: [
          { id: "A", text: "Begum Aizaz Rasul" },
          { id: "B", text: "Aruna Asaf Ali" },
          { id: "C", text: "Fatima Jinnah" },
          { id: "D", text: "Sarojini Naidu" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "Begum Aizaz Rasul felt that separate electorates were self-destructive since they isolated the minorities from the majority.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u12_q5",
        questionNumber: 5,
        question: "Which member from Madras warned the Assembly that overburdening the Centre with responsibilities and starving the provinces of funds would cripple both?",
        options: [
          { id: "A", text: "K. Santhanam" },
          { id: "B", text: "Alladi Krishnaswamy Iyer" },
          { id: "C", text: "T.A. Ramalingam Chettiar" },
          { id: "D", text: "C. Rajagopalachari" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "K. Santhanam from Madras defended states' rights and warned that an over-centralized state would break down under its own weight.",
        questionType: "Fact Identification",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u12_q6",
        questionNumber: 6,
        question: "Under the Language Committee compromise, how was Hindi in the Devanagari script designated in the Indian Constitution?",
        options: [
          { id: "A", text: "The National Language (Rashtrabhasha)" },
          { id: "B", text: "The Official Language (Rajbhasha) of the Union" },
          { id: "C", text: "The exclusive language for courts and parliament" },
          { id: "D", text: "The language of education throughout India" },
        ],
        correctOption: "B",
        correctAnswer: "(B)",
        explanation: "The Language Committee decided that Hindi in the Devanagari script would be the official language of the Union, not the national language.",
        questionType: "Terminology Distinction",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u12_q7",
        questionNumber: 7,
        question: "For how many years was English permitted to continue being used for all official purposes of the Union following the commencement of the Constitution?",
        options: [
          { id: "A", text: "5 years" },
          { id: "B", text: "10 years" },
          { id: "C", text: "15 years" },
          { id: "D", text: "25 years" },
        ],
        correctOption: "C",
        correctAnswer: "(C)",
        explanation: "For the first fifteen years, English would continue to be used for all official purposes.",
        questionType: "Historical Metric",
        type: "standard",
        difficulty: "easy",
      },
      {
        id: "history_u12_q8",
        questionNumber: 8,
        question: "Which member of the Constituent Assembly aggressively asserted: 'People who are present in this House to fashion a constitution for India and do not know Hindustani are not worthy to be members of this Assembly'?",
        options: [
          { id: "A", text: "R.V. Dhulekar" },
          { id: "B", text: "Govind Ballabh Pant" },
          { id: "C", text: "Purushottam Das Tandon" },
          { id: "D", text: "Sardar Vallabhbhai Patel" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "R.V. Dhulekar, a Congressman from the United Provinces, made this uncompromising statement on 10 December 1946.",
        questionType: "Famous Quotation",
        type: "standard",
        difficulty: "medium",
      },
      {
        id: "history_u12_q9",
        questionNumber: 9,
        question: "How many members actually signed the Constitution of India when it was finally adopted on 26 November 1949?",
        options: [
          { id: "A", text: "284" },
          { id: "B", text: "299" },
          { id: "C", text: "300" },
          { id: "D", text: "389" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "On 26 November 1949, 284 members were actually present and affixed their signatures to the historic document.",
        questionType: "Historical Metric",
        type: "standard",
        difficulty: "hard",
      },
      {
        id: "history_u12_q10",
        questionNumber: 10,
        question: "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R):\nAssertion (A): The Constituent Assembly drafted a Constitution that created an exceptionally strong Central Government.\nReason (R): The violence of Partition, fears of balkanisation, and chaotic refugee crises convinced leaders that only a powerful Centre could maintain peace, coordinate economic planning, and defend national sovereignty.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        correctAnswer: "(A)",
        explanation: "The historical context of Partition trauma and fears of chaos compelled the Assembly to prioritize a powerful Union over loose provincial decentralization. Both are true and (R) explains (A).",
        questionType: "Assertion-Reason",
        type: "assertion-reason",
        difficulty: "medium",
      },
    ],
    links: {
      prerequisites: [
        { title: "Mahatma Gandhi and National Movement", topicId: "history_u11_t1", slug: "non-cooperation-civil-disobedience-salt-march-quit-india-movement-partition" },
      ],
      relatedTopics: [
        { title: "Harappan Civilisation", topicId: "history_u1_t1", slug: "urban-planning-craft-production-subsistence-strategies-decipherment" },
      ],
      practiceTestId: "practice-history-unit12-test1",
      practiceTestUrl: "/test/practice-history-unit12-test1",
      weaknessReportUrl: "/dashboard/radar?subject=history",
    },
  },
];
