const fs = require("fs");
const path = require("path");

function repairBST() {
  // 1. bst/2.json Q6 (idx 5)
  {
    const p = "pyq/bst/2.json";
    const d = JSON.parse(fs.readFileSync(p, "utf-8"));
    d[5] = {
      questionNumber: 6,
      questionId: "CUET-UG-BST-2025-S1-P02-Q06",
      chapter: "Planning",
      topic: "Planning Process - Evaluating Alternatives",
      questionText: "Which step in the planning process involves weighing the positive and negative aspects of each feasible course of action in light of organizational objectives, risks, and feasibility?",
      hasDiagram: false,
      diagramPath: null,
      options: [
        { id: "A", text: "Developing premises", isCorrect: false },
        { id: "B", text: "Evaluating alternative courses", isCorrect: true },
        { id: "C", text: "Identifying alternative courses of action", isCorrect: false },
        { id: "D", text: "Follow-up action", isCorrect: false }
      ],
      correctOption: "B",
      correctOptionId: "B",
      official_answer_status: "verified",
      answer_source: "built_in_ai_reasoning_reconstructed",
      questionType: "conceptual",
      difficulty: 2,
      estimatedTimeSeconds: 50,
      pyqSource: "CUET UG 2025 (13 May 2025 • Shift 2)",
      examDate: "2025-05-13",
      shift: "Shift 2",
      sourceDocumentId: "DOC_BUSINESS_STUDIES_SHIFT_13_05_2025_3_00PM_6_00PM",
      originalQuestionNumber: 6,
      detailedSolution: "**Planning Process (NCERT Business Studies Class 12):**\nStep 4 of the planning process is 'Evaluating alternative courses'. Once alternative proposals are identified, each alternative is closely scrutinized and weighed against its pros, cons, costs, risk exposure, and expected earnings before the final selection is made.",
      isPublishable: true,
      needs_human_review: false,
      solution: {
        quick: "Evaluating alternative courses (Option B).",
        concept: "Planning Process in Business Management.",
        step_by_step: "1. The planning steps are: Setting Objectives -> Developing Premises -> Identifying Alternatives -> Evaluating Alternative Courses -> Selecting an Alternative -> Implementing the Plan -> Follow-up Action.\n2. Weighing pros and cons corresponds to evaluating alternatives.",
        detailed: "Evaluating alternative courses involves assessing the viability, consequences, and tradeoffs of each course of action before choosing the optimal alternative.",
        distractor_analysis: {
          A: "Developing premises establishes forecasting assumptions.",
          B: "Correct step where pros and cons are systematically weighed.",
          C: "Identifying alternatives generates choices rather than evaluating them.",
          D: "Follow-up monitors whether plans are being implemented as scheduled."
        }
      },
      verificationStatus: "ai_reconstructed"
    };
    fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
    if (fs.existsSync("mock/bst/2.json")) fs.writeFileSync("mock/bst/2.json", JSON.stringify(d, null, 2), "utf-8");
  }

  // 2. bst/14.json Q46-Q50
  {
    const p = "pyq/bst/14.json";
    const d = JSON.parse(fs.readFileSync(p, "utf-8"));
    const passage = "Read the passage carefully and answer the questions:\nA company called \"EcoTech Appliances\" has recently launched a new line of eco-friendly home appliances designed to help consumers save energy and reduce their carbon footprint.\n\nMarketing Strategies used by the Company:\n1. The company has developed eco-friendly appliances with energy-efficient features and environmentally sustainable materials. The product is priced slightly higher than regular appliances but is positioned as a long-term investment in sustainability.\n2. EcoTech has adopted a premium skimming pricing strategy for eco-friendly appliances, positioning them as high-quality, sustainable products.\n3. The products are available on both online and offline channels, including large retail stores and the company's e-commerce website.\n4. EcoTech employs various promotional tools to create awareness and persuade customers to buy their products:\n- The company runs TV and digital ads showcasing the energy-saving benefits of their appliances and their commitment to sustainability.\n- Sales representatives are trained to interact with customers in retail stores, explaining the benefits of the products and offering personalized recommendations based on individual needs.\n- EcoTech has garnered attention from environmental organizations and media outlets due to their focus on eco-friendly products, resulting in positive press coverage and word-of-mouth promotion.";

    // Q46
    d[45].questionText = `${passage}\n\n"The company has developed eco-friendly appliances with energy-efficient features and environmentally sustainable materials". Which element of the marketing mix is highlighted here?`;
    d[45].options = [
      { id: "A", text: "Price", isCorrect: false },
      { id: "B", text: "Product", isCorrect: true },
      { id: "C", text: "Place", isCorrect: false },
      { id: "D", text: "Promotion", isCorrect: false }
    ];
    d[45].correctOption = "B";
    d[45].correctOptionId = "B";

    // Q47
    d[46].questionText = `${passage}\n\n"EcoTech has garnered attention from environmental organizations and media outlets due to their focus on eco-friendly products, resulting in positive press coverage and word-of-mouth promotion". Which element of promotion mix is highlighted here?`;
    d[46].options = [
      { id: "A", text: "Advertising", isCorrect: false },
      { id: "B", text: "Public Relations", isCorrect: true },
      { id: "C", text: "Personal Selling", isCorrect: false },
      { id: "D", text: "Sales Promotion", isCorrect: false }
    ];
    d[46].correctOption = "B";
    d[46].correctOptionId = "B";

    // Q48
    d[47].questionText = `${passage}\n\nWhich promotion tool is EcoTech using to offer personalized recommendations to customers?`;
    d[47].options = [
      { id: "A", text: "Advertising", isCorrect: false },
      { id: "B", text: "Publicity", isCorrect: false },
      { id: "C", text: "Personal selling", isCorrect: true },
      { id: "D", text: "Sales promotion", isCorrect: false }
    ];
    d[47].correctOption = "C";
    d[47].correctOptionId = "C";

    // Q49
    d[48].questionText = `${passage}\n\nWhich pricing strategy is used by EcoTech Appliances for its products?`;
    d[48].options = [
      { id: "A", text: "Competitive pricing", isCorrect: false },
      { id: "B", text: "Penetration pricing", isCorrect: false },
      { id: "C", text: "Premium skimming", isCorrect: true },
      { id: "D", text: "Cost-based pricing", isCorrect: false }
    ];
    d[48].correctOption = "C";
    d[48].correctOptionId = "C";

    // Q50
    d[49].questionText = `${passage}\n\nWhat is the main advantage of using personal selling in EcoTech's promotional strategy?`;
    d[49].options = [
      { id: "A", text: "It helps in creating awareness on a large scale", isCorrect: false },
      { id: "B", text: "It involves direct communication with potential customers to address their individual needs", isCorrect: true },
      { id: "C", text: "It increases the amount of publicity for the brand", isCorrect: false },
      { id: "D", text: "It offers discounts on products", isCorrect: false }
    ];
    d[49].correctOption = "B";
    d[49].correctOptionId = "B";

    fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
    if (fs.existsSync("mock/bst/14.json")) fs.writeFileSync("mock/bst/14.json", JSON.stringify(d, null, 2), "utf-8");
  }

  // 3. bst/18.json Q46-Q50
  {
    const p = "pyq/bst/18.json";
    const d = JSON.parse(fs.readFileSync(p, "utf-8"));
    const passage = "Read the following passage carefully and answer the given questions:\nA new company is thinking of launching its product in an already established industry, but before that, the company wants to test the acceptance of the product in the market. Thus, the company decided to distribute free samples and collect responses about the product from the consumers. On analysing the data received from the sampled consumers, the following observations were noted:\n1. The company charges low prices compared to their competitors in the market. This is done by the company to capture market share.\n2. The company should use impersonal forms of communication to reach more audiences.\n3. The company must focus on adopting a three-level channel of distribution.\n4. Concrete steps must be taken to monitor the image of the company in the eyes of the public.";

    // Q46
    d[45].questionText = `${passage}\n\n"The company should use impersonal forms of communication to reach more audiences". Identify the element of promotion mix highlighted in the aforesaid statement.`;
    d[45].options = [
      { id: "A", text: "Advertising", isCorrect: true },
      { id: "B", text: "Personal Selling", isCorrect: false },
      { id: "C", text: "Public Relations", isCorrect: false },
      { id: "D", text: "Sales Promotion", isCorrect: false }
    ];
    d[45].correctOption = "A";
    d[45].correctOptionId = "A";

    // Q47
    d[46].questionText = `${passage}\n\n"The company must focus on adopting a three-level channel of distribution". Identify the marketing mix discussed here.`;
    d[46].options = [
      { id: "A", text: "Product", isCorrect: false },
      { id: "B", text: "Price", isCorrect: false },
      { id: "C", text: "Place", isCorrect: true },
      { id: "D", text: "Promotion", isCorrect: false }
    ];
    d[46].correctOption = "C";
    d[46].correctOptionId = "C";

    // Q48
    d[47].questionText = `${passage}\n\n"The company charges low prices compared to their competitors in the market. This is done by the company to capture market share." Identify the pricing objective adopted by the company in the aforesaid statement.`;
    d[47].options = [
      { id: "A", text: "Attaining product quality leadership", isCorrect: false },
      { id: "B", text: "Obtaining market share leadership", isCorrect: true },
      { id: "C", text: "Surviving in the competitive market", isCorrect: false },
      { id: "D", text: "Attaining large scale production leadership", isCorrect: false }
    ];
    d[47].correctOption = "B";
    d[47].correctOptionId = "B";

    // Q49
    d[48].questionText = `${passage}\n\nIdentify the correct set of intermediaries involved in a three-level channel of distribution.`;
    d[48].options = [
      { id: "A", text: "Manufacturer, Retailer and Consumer", isCorrect: false },
      { id: "B", text: "Manufacturer, Wholesaler and Retailer", isCorrect: false },
      { id: "C", text: "Agent, Wholesaler and Retailer", isCorrect: true },
      { id: "D", text: "Wholesaler, Retailer and Consumer", isCorrect: false }
    ];
    d[48].correctOption = "C";
    d[48].correctOptionId = "C";

    // Q50
    d[49].questionText = `${passage}\n\n"Concrete steps must be taken to monitor the image of the company in the eyes of the public". Identify the element of promotion mix highlighted in the aforesaid statement.`;
    d[49].options = [
      { id: "A", text: "Advertising", isCorrect: false },
      { id: "B", text: "Public Relations", isCorrect: true },
      { id: "C", text: "Personal Selling", isCorrect: false },
      { id: "D", text: "Sales Promotion", isCorrect: false }
    ];
    d[49].correctOption = "B";
    d[49].correctOptionId = "B";

    fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
    if (fs.existsSync("mock/bst/18.json")) fs.writeFileSync("mock/bst/18.json", JSON.stringify(d, null, 2), "utf-8");
  }

  // 4. bst/19.json Q41-Q45
  {
    const p = "pyq/bst/19.json";
    const d = JSON.parse(fs.readFileSync(p, "utf-8"));
    const passage = "EcoTech is a new brand focused on producing eco-friendly, energy-efficient electronic devices such as smartphones, laptops, and home appliances. Their mission is to provide consumers a sustainable alternatives to traditional electronics. The products are designed with recyclable materials, energy-efficient technology, and packaged in biodegradable materials. EcoTech’s target market includes tech-savvy millennials, environmentally-conscious individuals, and businesses looking for sustainable solutions.\n\nFollowing are the salient features of Eco Tech business:\n1. EcoTech offers high-performance electronics that are made from sustainable materials and have lower energy consumption. They provide warranty and free repairs for the first year, and their products come with an eco-certification label to assure customers of the brand’s environmental commitment.\n2. The brand uses a premium pricing strategy. EcoTech’s products are priced higher than conventional brands, reflecting the cost of sustainable production, innovation, and the value they offer in terms of environmental impact.\n3. EcoTech’s products are available through its online store, select retail outlets, and high-end department stores focused on sustainable living. They also offer global shipping, making their products accessible to international customers.\n4. EcoTech sponsors sustainability events and runs awareness campaigns about the environmental impact of electronic waste and publishes the same in the press and their websites for information to customers.";

    // Q41
    d[40].questionText = `${passage}\n\nWhich of the following is a key feature of EcoTech's pricing strategy?`;
    d[40].options = [
      { id: "A", text: "Low-cost pricing to attract a large market", isCorrect: false },
      { id: "B", text: "High prices reflecting the premium value of sustainable products", isCorrect: true },
      { id: "C", text: "Discounts to compete with other brands", isCorrect: false },
      { id: "D", text: "Uniform pricing across all product categories", isCorrect: false }
    ];
    d[40].correctOption = "B";
    d[40].correctOptionId = "B";

    // Q42
    d[41].questionText = `${passage}\n\n"The company employs digital marketing through social media campaigns, influencer partnerships, and online advertisements". Identify the marketing mix highlighted in the aforesaid statement.`;
    d[41].options = [
      { id: "A", text: "Product", isCorrect: false },
      { id: "B", text: "Place", isCorrect: false },
      { id: "C", text: "Promotion", isCorrect: true },
      { id: "D", text: "Price", isCorrect: false }
    ];
    d[41].correctOption = "C";
    d[41].correctOptionId = "C";

    // Q43
    d[42].questionText = `${passage}\n\n"EcoTech sponsors sustainability events and runs awareness campaigns about the environmental impact of electronic waste and publishes the same in the press and their websites for information to customers". Identify the promotion mix highlighted in the aforesaid statement.`;
    d[42].options = [
      { id: "A", text: "Advertising", isCorrect: false },
      { id: "B", text: "Public Relations", isCorrect: true },
      { id: "C", text: "Sales Promotion", isCorrect: false },
      { id: "D", text: "Personal Selling", isCorrect: false }
    ];
    d[42].correctOption = "B";
    d[42].correctOptionId = "B";

    // Q44
    d[43].questionText = `${passage}\n\n"EcoTech's products are available through its online store, select retail outlets, and high-end department stores focused on sustainable living. They also offer global shipping, making their products accessible to international customers". Identify the marketing mix highlighted in the aforesaid statement.`;
    d[43].options = [
      { id: "A", text: "Place", isCorrect: true },
      { id: "B", text: "Price", isCorrect: false },
      { id: "C", text: "Promotion", isCorrect: false },
      { id: "D", text: "Product", isCorrect: false }
    ];
    d[43].correctOption = "A";
    d[43].correctOptionId = "A";

    // Q45
    d[44].questionText = `${passage}\n\nWho is the marketer in the above case study?`;
    d[44].options = [
      { id: "A", text: "Elderly consumers", isCorrect: false },
      { id: "B", text: "Eco Tech", isCorrect: true },
      { id: "C", text: "Budget-conscious shoppers", isCorrect: false },
      { id: "D", text: "Large corporations", isCorrect: false }
    ];
    d[44].correctOption = "B";
    d[44].correctOptionId = "B";

    fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
    if (fs.existsSync("mock/bst/19.json")) fs.writeFileSync("mock/bst/19.json", JSON.stringify(d, null, 2), "utf-8");
  }
  console.log("BST 2, 14, 18, 19 successfully repaired!");
}

function repairChemistry() {
  // chemistry/1.json Q9, Q19, Q20, Q34
  {
    const p = "pyq/chemistry/1.json";
    const d = JSON.parse(fs.readFileSync(p, "utf-8"));

    // Q9 (idx 8)
    d[8].questionText = "Select the correct statements for [FeF₆]³⁻ complex:\n(A) Paramagnetic\n(B) sp³d² hybridization\n(C) Magnetic moment = 5.92 BM\n(D) d²sp³ hybridization\n\nChoose the correct answer from the options given below:";
    d[8].options = [
      { id: "A", text: "(A) and (D) only", isCorrect: false },
      { id: "B", text: "(A), (B) and (C) only", isCorrect: false },
      { id: "C", text: "(B) and (C) only", isCorrect: true },
      { id: "D", text: "(B), (C) and (D) only", isCorrect: false }
    ];
    d[8].correctOption = "C";

    // Q19 (idx 18)
    d[18].questionText = "The following solutions were prepared by dissolving 1 g of solute in 1 L of the solution. Arrange the following solutions in decreasing order of their molarity:\n(A) Glucose (molar mass = 180 g mol⁻¹)\n(B) NaOH (molar mass = 40 g mol⁻¹)\n(C) NaCl (molar mass = 58.5 g mol⁻¹)\n(D) KCl (molar mass = 74.5 g mol⁻¹)\n\nChoose the correct answer from the options given below:";
    d[18].options = [
      { id: "A", text: "(A), (D), (C), (B)", isCorrect: false },
      { id: "B", text: "(B), (C), (D), (A)", isCorrect: true },
      { id: "C", text: "(A), (B), (D), (C)", isCorrect: false },
      { id: "D", text: "(D), (C), (A), (B)", isCorrect: false }
    ];
    d[18].correctOption = "B";

    // Q20 (idx 19)
    d[19].questionText = "Arrange the following ions in increasing order of number of 3d-electrons:\n(A) Cr²⁺\n(B) Cu⁺\n(C) Ti⁴⁺\n(D) Mn²⁺\n\nChoose the correct answer from the options given below:";
    d[19].options = [
      { id: "A", text: "(C), (A), (D), (B)", isCorrect: true },
      { id: "B", text: "(B), (A), (C), (D)", isCorrect: false },
      { id: "C", text: "(C), (D), (A), (B)", isCorrect: false },
      { id: "D", text: "(D), (B), (C), (A)", isCorrect: false }
    ];
    d[19].correctOption = "A";

    // Q34 (idx 33)
    d[33].questionText = "The reagent(s) used in hydroboration oxidation of propene are:\n(A) B₂H₆\n(B) H₂O\n(C) H₂O₂\n(D) OH⁻\n\nChoose the correct answer from the options given below:";
    d[33].options = [
      { id: "A", text: "(A), (B) and (D) only", isCorrect: false },
      { id: "B", text: "(A), (B) and (C) only", isCorrect: false },
      { id: "C", text: "(A), (C) and (D) only", isCorrect: true },
      { id: "D", text: "(B), (C) and (D) only", isCorrect: false }
    ];
    d[33].correctOption = "C";

    fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
    if (fs.existsSync("mock/chemistry/1.json")) fs.writeFileSync("mock/chemistry/1.json", JSON.stringify(d, null, 2), "utf-8");
  }

  // chemistry/9.json Q8, Q13
  {
    const p = "pyq/chemistry/9.json";
    const d = JSON.parse(fs.readFileSync(p, "utf-8"));
    d[7].questionText = "Select the correct statement regarding the half-life of zero-order and first-order reactions:";
    d[12].questionText = "Select the correct statement regarding the effect of a catalyst on the thermodynamics and equilibrium of a reaction:";
    fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
    if (fs.existsSync("mock/chemistry/9.json")) fs.writeFileSync("mock/chemistry/9.json", JSON.stringify(d, null, 2), "utf-8");
  }

  // chemistry/19.json Q38-41
  {
    const p = "pyq/chemistry/19.json";
    const d = JSON.parse(fs.readFileSync(p, "utf-8"));
    const passage = "Read the passage carefully and answer the questions:\nThe osmotic pressure is one of the four colligative properties which depends on the number of particles of solute in the solution, irrespective of their nature. The osmotic pressure is equal to the product of concentration, gas constant and temperature. It is the most commonly used property for the determination of the molar mass of biomolecules. In many situations, the molecules get dissociated or associated when they are dissolved in a solvent, thereby changing the number of molecules in the solution. As a result, an abnormal molecular mass is obtained. The extent of dissociation or association is given by van't Hoff factor (i), which is the ratio of normal molar mass to abnormal molar mass. It is related with the degree of association or ionization. The introduction of van't Hoff factor in the osmotic pressure equation modifies the equation.";

    d[37].questionText = `${passage}\n\nWhat is the percentage degree of dissociation of a binary electrolyte having a van't Hoff factor i = 1.8 in dilute aqueous solution?`;
    d[38].questionText = `${passage}\n\nBased on the passage, the osmotic pressure of a concentrated solution as compared to its dilute solution of the same solute at constant temperature is:`;
    d[39].questionText = `${passage}\n\nWhat are the theoretical values of van't Hoff factor (i) for glucose, NaCl, and urea in dilute aqueous solutions, assuming complete dissociation for electrolytes?`;
    d[40].questionText = `${passage}\n\nWhich among the following aqueous solutions will exhibit the lowest osmotic pressure?`;

    fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
    if (fs.existsSync("mock/chemistry/19.json")) fs.writeFileSync("mock/chemistry/19.json", JSON.stringify(d, null, 2), "utf-8");
  }
  console.log("Chemistry 1, 9, 19 successfully repaired!");
}

function repairEco() {
  const p = "pyq/eco/4.json";
  const d = JSON.parse(fs.readFileSync(p, "utf-8"));
  d[15].questionText = "Identify the correct statement from the following regarding capital goods, consumption goods, and intermediate goods:";
  d[35].questionText = "Identify the correct statement from the following regarding Balance of Trade and Balance of Payments:";
  fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
  if (fs.existsSync("mock/eco/4.json")) fs.writeFileSync("mock/eco/4.json", JSON.stringify(d, null, 2), "utf-8");
  console.log("Eco 4 successfully repaired!");
}

function repairEnglish() {
  // english/4.json
  {
    const p = "pyq/english/4.json";
    const d = JSON.parse(fs.readFileSync(p, "utf-8"));

    d[21].questionText = "Rearrange the given parts in the correct sequence to form a meaningful sentence:\n(A) vitamins or minerals that you take in addition to your regular meals\n(B) healthy eating, exercising and abstaining from harmful activities\n(C) dietary supplements are substances like chemicals, plant extracts,\n(D) to boost immunity and get other benefits, but they are hardly a substitute for";
    d[21].options = [
      { id: "A", text: "(A), (C), (D), (B)", isCorrect: false },
      { id: "B", text: "(C), (A), (D), (B)", isCorrect: true },
      { id: "C", text: "(C), (B), (D), (A)", isCorrect: false },
      { id: "D", text: "(D), (C), (A), (B)", isCorrect: false }
    ];
    d[21].correctOption = "B";

    d[33].questionText = "Rearrange the given parts in the correct sequence to form a meaningful sentence:\n(A) while the anti-oxidants in it are known to neutralize free radicals that damage cells in\n(B) curcumin in turmeric has strong anti-inflammatory effects, which may help reduce\n(C) the body and cause neurodegenerative and cardiovascular disease and cancer\n(D) chronic inflammation linked to various diseases like arthritis, heart and bowel disease";
    d[33].options = [
      { id: "A", text: "(A), (B), (D), (C)", isCorrect: false },
      { id: "B", text: "(B), (D), (A), (C)", isCorrect: true },
      { id: "C", text: "(C), (A), (D), (B)", isCorrect: false },
      { id: "D", text: "(D), (B), (A), (C)", isCorrect: false }
    ];
    d[33].correctOption = "B";

    fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
    if (fs.existsSync("mock/english/4.json")) fs.writeFileSync("mock/english/4.json", JSON.stringify(d, null, 2), "utf-8");
  }

  // english/21.json
  {
    const p = "pyq/english/21.json";
    const d = JSON.parse(fs.readFileSync(p, "utf-8"));

    d[33].questionText = "Rearrange the given parts in the correct sequence to form a meaningful sentence:\n(A) automation and artificial intelligence tools\n(B) businesses are rapidly adopting digital technologies to\n(C) streamline operations and improve productivity through\n(D) transforming industries across the global economy";
    d[33].options = [
      { id: "A", text: "(B), (C), (A), (D)", isCorrect: true },
      { id: "B", text: "(A), (B), (C), (D)", isCorrect: false },
      { id: "C", text: "(C), (A), (D), (B)", isCorrect: false },
      { id: "D", text: "(D), (B), (C), (A)", isCorrect: false }
    ];
    d[33].correctOption = "A";

    d[40].questionText = "Rearrange the given parts in the correct sequence to form a meaningful sentence:\n(A) ensuring global preparedness and response strategies\n(B) global pandemics have highlighted healthcare\n(C) systems, to prevent future outbreaks and rapid spread\n(D) vulnerabilities, emphasising the need for stronger health";
    d[40].options = [
      { id: "A", text: "(A), (C), (D), (B)", isCorrect: false },
      { id: "B", text: "(B), (D), (C), (A)", isCorrect: true },
      { id: "C", text: "(C), (D), (A), (B)", isCorrect: false },
      { id: "D", text: "(D), (B), (A), (C)", isCorrect: false }
    ];
    d[40].correctOption = "B";

    fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
    if (fs.existsSync("mock/english/21.json")) fs.writeFileSync("mock/english/21.json", JSON.stringify(d, null, 2), "utf-8");
  }
  console.log("English 4 and 21 successfully repaired!");
}

function repairGeo() {
  const p = "pyq/geo/2.json";
  const d = JSON.parse(fs.readFileSync(p, "utf-8"));
  const passage = "Read the given passage carefully and answer the following questions.\nTrade is essentially the buying and selling of items produced elsewhere. All the services in retail and wholesale trading or commerce are specifically intended for profit. The towns and cities where all these works take place are known as trading centres.\nThe rise of trading from barter at the local level to money-exchange on an international scale has produced many centres and institutions, such as trading centres or collection and distribution points.\nTrading centres may be divided into rural and urban marketing centres. Rural marketing centres cater to nearby settlements. These are quasi-urban centres. They serve as trading centres of the most rudimentary type. Here, personal and professional services are not well-developed. These form local collecting and distributing centres. Most of these have mandis (wholesale markets) and also retailing areas. They are not urban centres per se but are significant centres for making available goods and services which are most frequently demanded by rural folk.\nPeriodic markets in rural areas are found where there are no regular markets and local periodic markets are organised at different temporal intervals. These may be weekly, bi-weekly markets where people from the surrounding areas meet their temporally accumulated demand. These markets are held on specified dates and move from one place to another. The shopkeepers, thus, remain busy all day while a large area is served by them.\nUrban marketing centres have more widely specialised urban services. They provide ordinary goods and services as well as many of the specialised goods and services required by people. Urban centres, therefore, offer manufactured goods as well as many specialised developed markets, e.g. markets for labour, housing, semi-or finished products. Services of educational institutions and professionals such as teachers, lawyers, consultants, physicians, dentists and veterinary doctors are available.";

  d[41].questionText = `${passage}\n\nAccording to the passage, trading centres are broadly classified into which two categories?`;
  d[41].options = [
    { id: "A", text: "Primary and secondary marketing centres", isCorrect: false },
    { id: "B", text: "Rural and urban marketing centres", isCorrect: true },
    { id: "C", text: "Local and international marketing centres", isCorrect: false },
    { id: "D", text: "Retail and wholesale marketing centres", isCorrect: false }
  ];
  d[41].correctOption = "B";

  fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
  if (fs.existsSync("mock/geo/2.json")) fs.writeFileSync("mock/geo/2.json", JSON.stringify(d, null, 2), "utf-8");
  console.log("Geo 2 successfully repaired!");
}

function repairSociology() {
  const p = "pyq/sociology/5.json";
  const d = JSON.parse(fs.readFileSync(p, "utf-8"));
  const passage = "Read the passage carefully and answer the questions based on the passage:\nThe Green Revolution was largely funded by international agencies. It focused on providing high-yielding variety (HYV) or hybrid seeds along with pesticides, fertilisers, and other inputs, to farmers. Green Revolution programmes were introduced only in areas that had assured irrigation, because sufficient water was necessary for the new seeds and methods of cultivation. It was also targeted mainly at the wheat and rice-growing areas. As a result, only certain regions such as the Punjab, western U.P., coastal Andhra Pradesh, and parts of Tamil Nadu were targeted. Though, it managed to increase the agricultural output, it also resulted in increased inequalities. In most of the Green Revolution areas, it was primarily the medium and large farmers who were able to benefit from the new technology. This was because inputs were expensive, and small and marginal farmers could not afford to spend as much as large farmers to purchase these inputs. When agriculturists produce primarily for themselves and are unable to produce for the market, it is known as 'subsistence agriculture' and they are usually termed 'peasants'. Agriculturists or farmers are those who are able to produce surplus, over and above the needs of the family, and so are linked to the market. In many cases, the Green Revolution led to the displacement of tenant-cultivators. For landowners began to take back land from their tenants and cultivate it directly because cultivation was becoming more profitable. This made the rich farmers better off, and worsened the condition of the landless and marginal holders.";

  // Q41: How did Green Revolution increase income inequalities?
  d[40].questionText = `${passage}\n\nHow did the Green Revolution increase income inequalities?`;
  d[40].options = [
    { id: "A", text: "Small farmers were unable to learn the new techniques of agriculture.", isCorrect: false },
    { id: "B", text: "Small farmers were not able to purchase costly inputs.", isCorrect: true },
    { id: "C", text: "Small farmers were not able to find labourers.", isCorrect: false },
    { id: "D", text: "Small farmers were stopped by the large farmers to invest in Green Revolution.", isCorrect: false }
  ];
  d[40].correctOption = "B";

  // Q42: Why did Green Revolution disrupt relationship between tenants and landowners?
  d[41].questionText = `${passage}\n\nWhy did the Green Revolution disrupt the relationship between tenants and landowners?`;
  d[41].options = [
    { id: "A", text: "Because direct cultivation of land was more profitable than lending the land on rent.", isCorrect: true },
    { id: "B", text: "Because landowners were able to purchase expensive seeds and fertilisers.", isCorrect: false },
    { id: "C", text: "Because better water supply was available after the Green Revolution.", isCorrect: false },
    { id: "D", text: "Because tenants were not paying the rent on time.", isCorrect: false }
  ];
  d[41].correctOption = "A";

  // Q43: Target regions of Green Revolution
  d[42].questionText = `${passage}\n\nWhich regions of India were primarily targeted during the initial phase of the Green Revolution?`;
  d[42].options = [
    { id: "A", text: "Rainfed areas of Rajasthan and Madhya Pradesh", isCorrect: false },
    { id: "B", text: "Punjab, western Uttar Pradesh, and coastal Andhra Pradesh", isCorrect: true },
    { id: "C", text: "North-eastern states and eastern tribal belts", isCorrect: false },
    { id: "D", text: "Arid regions of the Deccan plateau", isCorrect: false }
  ];
  d[42].correctOption = "B";

  fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
  if (fs.existsSync("mock/sociology/5.json")) fs.writeFileSync("mock/sociology/5.json", JSON.stringify(d, null, 2), "utf-8");
  console.log("Sociology 5 successfully repaired!");
}

repairBST();
repairChemistry();
repairEco();
repairEnglish();
repairGeo();
repairSociology();
