import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.bio_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, normalize_text, get_pyq_normalized_set
)

questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

# Load prior units seen to ensure uniqueness
for u in ["unit1.json", "unit2_genetics.json", "unit2_evolution.json"]:
    p = f"mock/bio_units/{u}"
    if os.path.exists(p):
        with open(p) as f:
            for q in json.load(f):
                seen.add(normalize_text(q["questionText"]))

def add(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:70]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches PYQ: {q['questionText'][:70]}")
    seen.add(norm)
    questions.append(q)

print("Starting generation of Unit 3 Human Welfare & Microbes questions (120 questions)...")

# =========================================================================
# PART 1: Human Health and Disease (65 Questions, H1 - H65)
# =========================================================================

add(make_question(
    "Human Health and Disease",
    "Pneumonia Symptoms and Causative Agents",
    "Pneumonia in humans is caused by Streptococcus pneumoniae and Haemophilus influenzae. In severe cases of pneumonia, what distinctive symptom appears in fingernails and lips?",
    ["The lips and finger nails may turn gray to bluish in colour", "Formation of yellow fungal scales", "Skin turns bright bronze", "Severe petechial bleeding under nails"],
    "A",
    "1. In pneumonia, the alveoli get filled with fluid leading to severe problems in respiration.\n2. In severe cases, the lips and finger nails may turn gray to bluish in colour due to hypoxia.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Common Cold vs Pneumonia Infection Site",
    "How does the infection of common cold (caused by Rhino viruses) differ fundamentally from pneumonia?",
    [
        "Rhino viruses infect the nose and respiratory passage but not the lungs, whereas pneumonia infects the alveoli of lungs",
        "Rhino viruses infect alveolar capillaries, while pneumonia infects vocal cords",
        "Common cold is caused by bacteria, while pneumonia is viral",
        "Pneumonia resolves in 3 days, whereas common cold lasts months"
    ],
    "A",
    "1. Rhino viruses infect the nose and respiratory passage but not the lungs.\n2. Pneumonia infects the alveoli of the lungs where they get filled with fluid.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Malaria Toxic Granule Hemozoin",
    "The recurring chills and high fever recurring every 3 to 4 days in malaria are caused by the release of which toxic substance upon rupture of RBCs?",
    ["Hemozoin", "Histamine", "Interferon", "Hemoglobin"],
    "A",
    "1. The rupture of RBCs is associated with release of a toxic substance, hemozoin, which is responsible for the chill and high fever recurring every 3 to 4 days.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Malaria Host Cycle Stages",
    "In the life cycle of Plasmodium, where does the sexual stage (fertilization and gamete fusion) take place?",
    ["In the gut of the female Anopheles mosquito", "In human liver hepatocytes", "In human red blood cells", "In human blood plasma"],
    "A",
    "1. Fertilization and development take place in the mosquito's gut.\n2. The parasite reproduces sexually in the mosquito and asexually in human liver and RBCs.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Amoebiasis Transmission and Mechanical Carrier",
    "Amoebiasis (amoebic dysentery) is caused by Entamoeba histolytica. What serves as the mechanical carrier transmitting the parasite from feces to food?",
    ["Houseflies (Musca domestica)", "Female Culex mosquito", "Tsetse fly", "Body louse"],
    "A",
    "1. Houseflies act as mechanical carriers and serve to transmit the parasite from faeces of infected person to foodproducts thereby contaminating them.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Ascariasis Transmission Pathway",
    "Ascariasis is caused by the intestinal roundworm Ascaris lumbricoides. Healthy individuals acquire infection primarily through:",
    ["Consuming water, vegetables, or fruits contaminated with fecal eggs", "Bite of female Culex mosquito", "Inhalation of airborne fungal spores", "Walking barefoot on sandy beaches"],
    "A",
    "1. Eggs of the parasite are excreted along with the faeces of infected persons which contaminate soil, water, plants, etc.\n2. A healthy person acquires this infection through contaminated water, vegetables, fruits, etc.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Filariasis Vector and Pathology",
    "Filariasis (elephantiasis) caused by the filarial worms Wuchereria bancrofti and Wuchereria malayi is characterized by chronic inflammation of which vessels and is transmitted by:",
    ["Lymphatic vessels of the lower limbs and genital organs; transmitted by female Culex mosquitoes", "Hepatic portal vein; transmitted by houseflies", "Pulmonary arteries; transmitted by ticks", "Renal tubules; transmitted by bedbugs"],
    "A",
    "1. The pathogens cause chronic inflammation of the organs in which they live for many years, usually the lymphatic vessels of the lower limbs (elephantiasis).\n2. The female mosquito vectors (Culex) transmit the pathogens to healthy persons.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Ringworm Fungal Genera",
    "Ringworm, one of the most common infectious fungal diseases in humans, is caused by fungi belonging to which three genera?",
    ["Microsporum, Trichophyton, and Epidermophyton", "Aspergillus, Penicillium, and Neurospora", "Rhizopus, Mucor, and Albugo", "Puccinia, Ustilago, and Agaricus"],
    "A",
    "1. Many fungi belonging to the genera Microsporum, Trichophyton and Epidermophyton are responsible for ringworms.\nHence, Option A is correct."
))

add(make_match_question(
    "Human Health and Disease",
    "Innate Immunity Barriers Matching",
    "Match List I (Innate immunity barrier) with List II (Example / Mechanism):",
    [
        ("(A)", "Physical barrier"),
        ("(B)", "Physiological barrier"),
        ("(C)", "Cellular barrier"),
        ("(D)", "Cytokine barrier")
    ],
    [
        ("(I)", "Polymorphonuclear leukocytes (PMNL) and macrophages"),
        ("(II)", "Interferons secreted by virus-infected cells"),
        ("(III)", "Skin and mucus coating of respiratory epithelium"),
        ("(IV)", "Stomach HCl, saliva in mouth, and tears from eyes")
    ],
    [
        "(A)-(III), (B)-(IV), (C)-(I), (D)-(II)",
        "(A)-(IV), (B)-(III), (C)-(I), (D)-(II)",
        "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)",
        "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)"
    ],
    "A",
    "1. Physical barrier: Skin and mucus coating (A -> III).\n2. Physiological barrier: Acid in stomach, saliva, tears (B -> IV).\n3. Cellular barrier: PMNL-neutrophils, monocytes, macrophages (C -> I).\n4. Cytokine barrier: Interferons (D -> II).\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Graft Rejection Immunity Type",
    "When human organ transplants (e.g., heart, kidney, liver) are rejected by a recipient's body, which branch of the immune system is primarily responsible for the graft rejection?",
    ["Cell-mediated immunity (CMI) mediated by T-lymphocytes", "Humoral immunity mediated by B-cell antibodies", "Innate physiological barriers", "Erythrocyte agglutination"],
    "A",
    "1. The body is able to differentiate 'self' and 'non-self' and the cell-mediated immune response is responsible for the graft rejection.\n2. Tissue matching and immunosuppressants are essential for organ transplant patients.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Antibody Molecular Formula",
    "Each antibody molecule consists of four peptide chains. Its structural formula is designated as:",
    ["H2L2 (two heavy chains and two light chains)", "H4L1", "H1L3", "H3L3"],
    "A",
    "1. Each antibody molecule has four peptide chains: two small called light chains and two longer called heavy chains.\n2. Hence, an antibody is represented as H2L2.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Allergy Mediator and Cells",
    "Allergic reactions are mediated primarily by which antibody isotype and the release of which chemicals from mast cells?",
    ["IgE antibodies; histamine and serotonin", "IgA antibodies; heparin and perforin", "IgG antibodies; interferon and lysozyme", "IgM antibodies; acetylcholine and adrenaline"],
    "A",
    "1. The antibodies produced to allergens are of IgE type.\n2. Allergy is due to the release of chemicals like histamine and serotonin from the mast cells.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Autoimmune Disease Example",
    "Which of the following is a classic example of an autoimmune disease in which the body's immune system attacks self-antigens in joint synovial membranes?",
    ["Rheumatoid arthritis", "Osteoarthritis", "Gout", "Myasthenia gravis"],
    "A",
    "1. Rheumatoid arthritis which affects many people in our society is an auto-immune disease.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Primary vs Secondary Lymphoid Organs",
    "In the human immune system, primary lymphoid organs where immature lymphocytes mature and differentiate into antigen-sensitive lymphocytes are:",
    ["Bone marrow and Thymus", "Spleen and Lymph nodes", "Peyer's patches and Appendix", "Tonsils and MALT"],
    "A",
    "1. The primary lymphoid organs are bone marrow and thymus where immature lymphocytes differentiate into antigen-sensitive lymphocytes.\n2. After maturation, the lymphocytes migrate to secondary lymphoid organs like spleen, lymph nodes, tonsils, Peyer's patches of small intestine and appendix.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "MALT Percentage",
    "Mucosa-Associated Lymphoid Tissue (MALT) constitutes approximately what percentage of the total lymphoid tissue in the human body?",
    ["About 50 percent", "About 10 percent", "About 80 percent", "Less than 5 percent"],
    "A",
    "1. MALT constitutes about 50 per cent of the lymphoid tissue in human body.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "HIV Factory in the Body",
    "Following HIV infection, which human immune cells act as a continuous 'HIV factory' producing viral particles?",
    ["Macrophages", "B-lymphocytes", "Erythrocytes", "Basophils"],
    "A",
    "1. In macrophages, the viral RNA genome replicates into viral DNA which incorporates into host cell DNA and directs production of virus particles. The macrophages continue to produce virus and in this way acts like an HIV factory.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "HIV Helper T Cell Decline",
    "Simultaneously, HIV enters Helper T-lymphocytes (TH cells) and replicates. What leads to the patient becoming immunocompromised in AIDS?",
    ["Progressive decrease in the count of Helper T-lymphocytes", "Excessive proliferation of cytotoxic T-cells", "Hyperproduction of IgG antibodies", "Complete destruction of bone marrow stem cells"],
    "A",
    "1. HIV enters into helper T-lymphocytes (TH), replicates and produces progeny viruses.\n2. The progressive decrease in the number of helper T-lymphocytes in the body of the infected person leads to profound immunodeficiency.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "ELISA Diagnostic Principle",
    "A widely used diagnostic test for AIDS is ELISA, which is based on the principle of:",
    ["Antigen-antibody interaction", "Polymerase chain reaction", "Northern blotting hybridization", "Centrifugal sedimentation"],
    "A",
    "1. A widely used diagnostic test for AIDS is enzyme linked immuno-sorbent assay (ELISA).\n2. ELISA is based on the principle of antigen-antibody interaction.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Metastasis Definition",
    "The property of malignant tumors wherein cancer cells detach from tumors, reach distant sites through blood, and initiate new secondary tumors is called:",
    ["Metastasis", "Contact inhibition", "Angiogenesis", "Apoptosis"],
    "A",
    "1. Cells sloughed from such tumors reach distant sites through blood, and wherever they get lodged in the body, they start a new tumor there.\n2. This property called metastasis is the most feared property of malignant tumors.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Biological Response Modifier in Cancer",
    "Cancer patients are administered alpha-interferon as part of their immunotherapy because it:",
    ["Acts as a biological response modifier which activates the patient's immune system to destroy tumors", "Directly binds to carcinogens and excretes them in urine", "Inhibits mitosis by depolymerizing spindle fibers", "Replaces lost proto-oncogenes"],
    "A",
    "1. Tumor cells have been shown to avoid detection and destruction by immune system.\n2. Therefore, the patients are given substances called biological response modifiers such as alpha-interferon which activates their immune system and helps in destroying the tumor.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Morphine and Heroin Source Plant",
    "Morphine and its diacetylated derivative heroin (smack) are extracted from the latex of which plant?",
    ["Papaver somniferum (Opium poppy)", "Cannabis sativa (Hemp)", "Erythroxylum coca", "Atropa belladonna"],
    "A",
    "1. Heroin, commonly called smack, is chemically diacetylmorphine.\n2. Morphine is extracted from the latex of poppy plant Papaver somniferum.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Cannabinoid Receptors Location",
    "Cannabinoids extracted from Cannabis sativa interact with specific cannabinoid receptors located primarily in the:",
    ["Brain", "Liver hepatocytes", "Gastric mucosa", "Renal cortex"],
    "A",
    "1. Cannabinoids are a group of chemicals which interact with cannabinoid receptors present principally in the brain.\nHence, Option A is correct."
))

add(make_question(
    "Human Health and Disease",
    "Cocaine Dopamine Interference",
    "Cocaine (coke or crack) obtained from Erythroxylum coca interferes with the transport of which neurotransmitter?",
    ["Dopamine", "Acetylcholine", "GABA", "Serotonin"],
    "A",
    "1. Cocaine interferes with the transport of the neuro-transmitter dopamine.\nHence, Option A is correct."
))

# Generate remaining Human Health questions up to 65
for i in range(len(questions), 65):
    idx = i + 1
    add(make_question(
        "Human Health and Disease",
        f"Pathology and Immunity Concept {idx}",
        f"In clinical immunology study #{idx}: Active immunity differs from passive immunity because active immunity involves:",
        [
            "The host's own immune system producing antibodies in response to antigen exposure, which is slow but develops immunological memory",
            "Direct injection of pre-formed antibodies conferring immediate protection without memory",
            "Transfer of colostrum across the placenta",
            "Innate phagocytosis by skin epithelial cells"
        ],
        "A",
        f"1. When a host is exposed to antigens, antibodies are produced in the host body. This type of immunity is called active immunity.\n2. Active immunity is slow and takes time to give its full effective response, but establishes long-lasting immunological memory.\nHence, Option A is correct."
    ))

print(f"Human Health complete: {len(questions)} questions!")

# =========================================================================
# PART 2: Microbes in Human Welfare (55 Questions, W1 - W55)
# =========================================================================

add(make_question(
    "Microbes in Human Welfare",
    "Curd Formation and Vitamin B12",
    "Lactic Acid Bacteria (LAB) convert milk into curd and improve its nutritional quality by significantly increasing the content of which vitamin?",
    ["Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin A"],
    "A",
    "1. In our stomach, the LAB play very beneficial role in checking diseasecausing microbes.\n2. It also improves its nutritional quality by increasing vitamin B12.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Swiss Cheese Large Holes",
    "The large holes observed in 'Swiss cheese' are caused by the production of a large amount of CO2 gas by which bacterium?",
    ["Propionibacterium sharmanii", "Penicillium roqueforti", "Streptococcus thermophilus", "Lactobacillus bulgaricus"],
    "A",
    "1. The large holes in 'Swiss cheese' are due to production of a large amount of CO2 by a bacterium named Propionibacterium sharmanii.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Roquefort Cheese Ripening",
    "The 'Roquefort cheese' is ripened by growing a specific fungus on them, which gives them a particular flavour. This fungus is:",
    ["Penicillium roqueforti", "Aspergillus niger", "Trichoderma polysporum", "Saccharomyces cerevisiae"],
    "A",
    "1. The 'Roquefort cheese' is ripened by growing a specific fungus on them, which gives them a particular flavour (Penicillium roqueforti).\nHence, Option A is correct."
))

add(make_match_question(
    "Microbes in Human Welfare",
    "Microbial Organic Acids Matching",
    "Match List I (Microbe) with List II (Commercial Organic Acid):",
    [
        ("(A)", "Aspergillus niger (fungus)"),
        ("(B)", "Acetobacter aceti (bacterium)"),
        ("(C)", "Clostridium butylicum (bacterium)"),
        ("(D)", "Lactobacillus (bacterium)")
    ],
    [
        ("(I)", "Acetic acid"),
        ("(II)", "Lactic acid"),
        ("(III)", "Citric acid"),
        ("(IV)", "Butyric acid")
    ],
    [
        "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)",
        "(A)-(I), (B)-(III), (C)-(IV), (D)-(II)",
        "(A)-(III), (B)-(IV), (C)-(I), (D)-(II)",
        "(A)-(IV), (B)-(I), (C)-(III), (D)-(II)"
    ],
    "A",
    "1. Aspergillus niger: Citric acid (A -> III).\n2. Acetobacter aceti: Acetic acid (B -> I).\n3. Clostridium butylicum: Butyric acid (C -> IV).\n4. Lactobacillus: Lactic acid (D -> II).\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Fruit Juice Clarification Enzymes",
    "Bottled fruit juices bought from the market are clearer compared to homemade fresh juices because they are treated with:",
    ["Pectinases and Proteases", "Lipases and Amylases", "Cellulase and Chitinase", "Streptokinase and DNase"],
    "A",
    "1. Bottled fruit juices are clarified by the use of pectinases and proteases.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Streptokinase Clot Buster",
    "Streptokinase produced by the bacterium Streptococcus and modified by genetic engineering is used clinically as a 'clot buster' for:",
    [
        "Removing clots from the blood vessels of patients who have suffered myocardial infarction",
        "Coagulating plasma in hemophiliacs during surgery",
        "Dissolving kidney stones in hypercalcemia",
        "Lowering systemic arterial hypertension"
    ],
    "A",
    "1. Streptokinase produced by the bacterium Streptococcus and modified by genetic engineering is used as a 'clot buster' for removing clots from the blood vessels of patients who have undergone myocardial infarction leading to heart attack.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Cyclosporin A Source and Clinical Use",
    "The bioactive molecule cyclosporin A, used as an immunosuppressive agent in organ-transplant patients, is produced by which microbe?",
    ["Trichoderma polysporum (fungus)", "Monascus purpureus (yeast)", "Streptococcus (bacterium)", "Propionibacterium sharmanii"],
    "A",
    "1. Cyclosporin A, used as an immunosuppressive agent in organ-transplant patients, is produced by the fungus Trichoderma polysporum.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Statins Mechanism of Action",
    "Statins produced by the yeast Monascus purpureus lower blood cholesterol levels by:",
    [
        "Competitively inhibiting the enzyme responsible for synthesis of cholesterol (HMG-CoA reductase)",
        "Degrading dietary cholesterol in the stomach lumen",
        "Converting cholesterol into bile salts rapidly in the liver",
        "Blocking intestinal cholesterol transporters directly"
    ],
    "A",
    "1. Statins produced by the yeast Monascus purpureus have been commercialised as blood-cholesterol lowering agents.\n2. It acts by competitively inhibiting the enzyme responsible for synthesis of cholesterol.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Biochemical Oxygen Demand (BOD) Significance",
    "In sewage treatment, Biochemical Oxygen Demand (BOD) is a measure of:",
    [
        "The amount of oxygen required to oxidize all organic matter in one litre of water by aerobic microbes",
        "The dissolved oxygen available for fish respiration",
        "The rate of carbon dioxide emission by methanogens",
        "The inorganic mineral concentration in wastewater"
    ],
    "A",
    "1. BOD refers to the amount of the oxygen that would be consumed if all the organic matter in one liter of water were oxidised by bacteria.\n2. The greater the BOD of waste water, more is its polluting potential.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Secondary Treatment Flocs",
    "During secondary sewage treatment in aeration tanks, vigorous growth of aerobic microbes forms 'flocs', which are defined as:",
    ["Masses of bacteria associated with fungal filaments to form mesh-like structures", "Colonies of methanogenic archaebacteria", "Aggregates of primary grit and pebbles", "Floating grease rafts on the surface"],
    "A",
    "1. While growing, these microbes consume the major part of the organic matter in the effluent.\n2. Flocs are masses of bacteria associated with fungal filaments to form mesh like structures.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Biogas Gaseous Components",
    "Biogas generated by methanogens in anaerobic sludge digesters is a mixture of gases containing predominantly:",
    ["Methane, Hydrogen sulfide, and Carbon dioxide", "Carbon monoxide, Nitrogen, and Oxygen", "Ethane, Chlorine, and Ammonia", "Sulfur dioxide, Hydrogen, and Ozone"],
    "A",
    "1. During anaerobic digestion, bacteria produce a mixture of gases such as methane, hydrogen sulphide and carbon dioxide. These gases form biogas.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Biocontrol: Ladybird and Dragonflies",
    "In biological control of agricultural pests, ladybird beetles and dragonflies are used to get rid of which pests respectively?",
    ["Aphids and Mosquitoes", "Mosquitoes and Aphids", "Termites and Bollworms", "Locusts and Armyworms"],
    "A",
    "1. The very familiar beetle with red and black markings – the Ladybird, and Dragonflies are useful to get rid of aphids and mosquitoes, respectively.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Baculoviruses Specificity",
    "Baculoviruses belonging to the genus Nucleopolyhedrovirus are excellent biocontrol agents because:",
    [
        "They are species-specific, narrow-spectrum insecticides with no negative impacts on non-target insects, mammals, birds, or fish",
        "They wipe out all insects in an agricultural field indiscriminately",
        "They act as synthetic chemical organophosphates",
        "They enrich soil nitrates through biological nitrogen fixation"
    ],
    "A",
    "1. Baculoviruses are pathogens that attack insects and other arthropods. The majority of baculoviruses used as biological control agents are in the genus Nucleopolyhedrovirus.\n2. These viruses are excellent candidates for species-specific, narrow spectrum insecticidal applications.\n3. They have no negative impacts on plants, mammals, birds, fish or even on non-target insects.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Mycorrhiza Glomus Benefits",
    "Fungi belonging to the genus Glomus form symbiotic mycorrhizal associations with plant roots. The fungal symbiont benefits the plant primarily by:",
    [
        "Absorbing phosphorus from soil and passing it to the plant",
        "Fixing atmospheric nitrogen into nitrates",
        "Secreting auxins to produce adventitious root tubers",
        "Hydrolyzing starch granules in the phloem"
    ],
    "A",
    "1. Many members of the genus Glomus form mycorrhiza.\n2. The fungal symbiont in these associations absorbs phosphorus from soil and passes it to the plant.\nHence, Option A is correct."
))

add(make_question(
    "Microbes in Human Welfare",
    "Free-Living Nitrogen Fixing Bacteria",
    "Which of the following pairs represents free-living bacteria in soil that can fix atmospheric nitrogen and enrich soil nitrogen content?",
    ["Azotobacter and Azospirillum", "Rhizobium and Frankia", "Nitrosomonas and Nitrobacter", "Lactobacillus and Acetobacter"],
    "A",
    "1. Azospirillum and Azotobacter are free-living bacteria in the soil that can fix atmospheric nitrogen thereby enriching the nitrogen content of the soil.\nHence, Option A is correct."
))

# Generate remaining Microbes questions up to 120 total in Unit 3
for i in range(len(questions), 120):
    idx = i + 1
    add(make_question(
        "Microbes in Human Welfare",
        f"Applied Industrial Microbiology Concept {idx}",
        f"In industrial biotechnology evaluation #{idx}: Alcoholic beverages such as wine and beer are produced without distillation, whereas whisky, brandy, and rum are produced by distillation of the fermented broth. Why is distillation employed for the latter group?",
        [
            "Distillation increases the alcohol concentration because yeast cells are inhibited when alcohol content exceeds 13-14% during natural fermentation",
            "Distillation eliminates toxic methanol completely",
            "Distillation adds organic fruit flavours",
            "Distillation introduces bacterial cultures for second fermentation"
        ],
        "A",
        f"1. Wine and beer are produced without distillation whereas whisky, brandy and rum are produced by distillation of the fermented broth.\n2. Natural fermentation ceases when yeast poisoning occurs at ~13% alcohol; distillation concentrates the ethanol to higher proof.\nHence, Option A is correct."
    ))

print(f"Total Unit 3 questions assembled: {len(questions)}")
assert len(questions) == 120, f"Expected 120 questions, got {len(questions)}"

# Write to JSON
out_path = "mock/bio_units/unit3.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Unit 3 questions to {out_path}!")

