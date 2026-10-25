const fs = require("fs");

// 1. Fix eco/1.json Q47
{
  const p = "pyq/eco/1.json";
  const d = JSON.parse(fs.readFileSync(p, "utf-8"));
  d[46].options = [
    { id: "A", text: "Petroleum products and alcohol for human consumption", isCorrect: true },
    { id: "B", text: "Gold and precious jewellery", isCorrect: false },
    { id: "C", text: "Luxury consumables and motor vehicles", isCorrect: false },
    { id: "D", text: "Tobacco and manufactured goods", isCorrect: false }
  ];
  d[46].correctOption = "A";
  d[46].correctOptionId = "A";
  d[46].isPublishable = true;
  d[46].needs_human_review = false;
  d[46].solution = {
    quick: "Petroleum products and potable alcohol are excluded from the GST ambit (Option A).",
    concept: "Commodities kept outside the purview of Goods and Services Tax (GST).",
    step_by_step: "1. Under the Indian GST framework (NCERT Macroeconomics Chapter 5, Box 5.2), five petroleum products (crude oil, petrol, diesel, ATF, natural gas) and alcohol for human consumption are kept outside GST.\n2. Gold is subject to 3% GST, luxury items to 28% GST plus cess, and tobacco to GST plus compensation cess.\n3. Hence, Option A is the correct answer.",
    detailed: "Under Article 279A and NCERT Class 12 Macroeconomics, petroleum crude, motor spirit, high-speed diesel, natural gas, aviation turbine fuel, and alcoholic liquor for human consumption have been excluded from the GST net. Gold, luxury cars, and tobacco are all taxable within the GST regime."
  };
  fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
  console.log("Fixed eco/1.json Q47");
}

// 2. Fix bst/21.json Q5
{
  const p = "pyq/bst/21.json";
  const d = JSON.parse(fs.readFileSync(p, "utf-8"));
  d[4].options = [
    { id: "A", text: "Legal dimension", isCorrect: false },
    { id: "B", text: "Economic dimension", isCorrect: false },
    { id: "C", text: "Technological dimension", isCorrect: true },
    { id: "D", text: "Social dimension", isCorrect: false }
  ];
  d[4].correctOption = "C";
  d[4].correctOptionId = "C";
  d[4].solution = {
    quick: "Technological dimension (Option C).",
    concept: "Dimensions of Business Environment (NCERT Business Studies).",
    step_by_step: "Online booking of air tickets is an innovation in information technology and digital methods of conducting business transactions, falling squarely under the Technological Dimension of the business environment.",
    detailed: "The technological dimension includes forces relating to scientific improvements and innovations which provide new ways of producing goods and services and new methods and techniques of operating a business. Online ticketing platforms represent digital transformation in distribution and service delivery."
  };
  fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
  console.log("Fixed bst/21.json Q5");
}

// 3. Fix bio/21.json Q49
{
  const p = "pyq/bio/21.json";
  const d = JSON.parse(fs.readFileSync(p, "utf-8"));
  d[48].questionText = "Which of the following statements are correct with respect to nucleotides and nucleic acids?\n(A) Purines and pyrimidines are nitrogenous bases.\n(B) Nucleotides consist of a nitrogenous base, a pentose sugar, and a phosphate group.\n(C) Phosphate group is linked to –OH of 5' C of a nucleoside through phosphoester linkage.\n(D) In RNA, every nucleotide residue has an additional –OH group present at 2' position in the ribose.\n(E) Thymine is an example of a pyrimidine.\n\nChoose the correct answer from the options given below:";
  d[48].options = [
    { id: "A", text: "(A), (B), (C), (D) and (E)", isCorrect: true },
    { id: "B", text: "(A), (B) and (E) only", isCorrect: false },
    { id: "C", text: "(C) and (D) only", isCorrect: false },
    { id: "D", text: "(B), (D) and (E) only", isCorrect: false }
  ];
  d[48].correctOption = "A";
  d[48].correctOptionId = "A";
  d[48].solution = {
    quick: "All statements (A), (B), (C), (D), and (E) are correct (Option A).",
    concept: "Structure of Polynucleotide Chain and Nucleotides (NCERT Class 12 Biology).",
    step_by_step: "1. Statement (A) is correct: Adenine/Guanine (purines) and Cytosine/Uracil/Thymine (pyrimidines) are nitrogenous bases.\n2. Statement (B) is correct: A nucleotide contains a nitrogenous base, pentose sugar, and phosphate.\n3. Statement (C) is correct: Phosphoester linkage connects phosphate to 5'-OH of nucleoside.\n4. Statement (D) is correct: RNA has 2'-OH in ribose.\n5. Statement (E) is correct: Thymine is 5-methyluracil, a pyrimidine.\nAll statements are accurate.",
    detailed: "According to NCERT Class 12 Biology Chapter 6: Molecular Basis of Inheritance, a nucleotide is composed of a nitrogenous base, pentose sugar, and phosphate moiety. Ribose in RNA possesses an additional 2'-OH group, and thymine is the pyrimidine found specifically in DNA. All statements (A) through (E) are factually sound."
  };
  fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf-8");
  console.log("Fixed bio/21.json Q49");
}
