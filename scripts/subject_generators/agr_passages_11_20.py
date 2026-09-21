import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# ==============================================================================
# MOCK 11 PASSAGES
# ==============================================================================
P1_M11_TXT = (
    "Read the following case study on Pectin Chemistry and Gelation Technology in Guava Jelly Manufacture, "
    "and answer the questions that follow:\n\n"
    "Fruit preservation through gelled preserves relies on the physical chemistry of Pectin (polygalacturonic acid methyl esters). "
    "In India, the Guava (Psidium guajava) is recognized as the ideal fruit for manufacturing commercial sparkling clear jelly because "
    "firm, slightly under-ripe sour guavas naturally contain high concentrations of both high-methoxyl pectin (>1.0%) and natural organic "
    "fruit acids (pH 3.0 to 3.3). To manufacture jelly, sliced firm guavas are simmered in water (approx. 1.5 to 2.0 liters water per kg fruit) "
    "with 2–3 grams of citric acid for 30 to 45 minutes to hydrolyze protopectin into soluble pectin. The boiled mass is strained through "
    "muslin cloth without squeezing (squeezing forces insoluble pulp particles into the extract, destroying crystal clarity). The pectin strength "
    "of the clear extract is assayed using a Jelmeter or the Alcohol Test. A high-pectin extract forms a single gelatinous clot with 3 parts ethanol, "
    "requiring 1.0 kg of cane sugar per liter of extract. The mixture is rapidly boiled to concentrate soluble solids. At pH 3.2, sugar molecules "
    "compete with pectin for water of hydration, dehydrating the pectin chains, while hydrogen ions (H+) suppress negative carboxyl ionization, "
    "enabling pectin polymers to cross-link via hydrogen bonding into a three-dimensional continuous network that traps sugar syrup. "
    "Boiling is terminated at exactly 105°C (221°F) or when a cold spoon test demonstrates that the preserve flows together into a broad, "
    "cohesive sheet ('Sheet Test' at 65% Total Soluble Solids / TSS). Pouring hot into sterilized glass jars and sealing with molten paraffin "
    "wax guarantees shelf stability. If acidity is excessive (pH < 3.0), the gel network hyper-contracts, squeezing out syrup in an unsightly defect "
    "known as 'Syneresis' (Weeping of Jelly)."
)
P1_M11_QS = [
    case_q("Fruit and Vegetable Preservation and Processing", "Ideal Fruit Maturity for Jelly",
           "Why are firm, slightly under-ripe guavas preferred over fully ripe, soft guavas for commercial jelly making?",
           "They contain peak concentrations of high-methoxyl pectin and acid, which degrade into pectic acid in over-ripe fruit",
           ["They contain zero water", "They have no seeds inside", "They are naturally colored bright blue"],
           "Under-ripe firm fruits possess intact high-methoxyl pectin; as fruits over-ripen, pectinase degrades pectin into non-gelling pectic acid."),
    case_q("Fruit and Vegetable Preservation and Processing", "Clarification Protocol for Crystal Jelly",
     "Why must the boiled guava extract be filtered through muslin cloth without pressing or squeezing?",
     "Squeezing forces insoluble pulp particles into the extract, making the finished jelly cloudy rather than sparkling clear",
     ["Squeezing destroys all sugar molecules", "Squeezing releases toxic nerve poisons", "Squeezing cools the extract to freezing"],
     "Pressing forces cellular debris into the filtrate; free gravity straining ensures sparkling, transparent, crystal-clear jelly extract."),
    case_q("Fruit and Vegetable Preservation and Processing", "Alcohol Test Clot Interpretation",
     "In the alcohol test for pectin assay, formation of a single firm gelatinous clot upon adding methylated spirit indicates:",
     "High pectin concentration, requiring 1.0 kg sugar per liter of fruit extract",
     ["Zero pectin, requiring addition of artificial gelatin", "Complete spoilage of the extract", "The extract contains pure alcohol"],
     "A single firm clot denotes rich pectin content (approx. 1%), capable of binding an equal weight of sugar (1:1 ratio) into a firm gel."),
    case_q("Fruit and Vegetable Preservation and Processing", "FSSAI Legal Standard for Fruit Jelly",
     "According to FSSAI statutory regulations, a finished commercial fruit jelly must contain a minimum of:",
     "Not less than 65% Total Soluble Solids (TSS) and 45% fruit extract",
     ["Not less than 10% TSS and 10% extract", "Not less than 95% TSS and 5% extract", "Exactly 50% pure mineral salt"],
     "FSSAI mandates minimum 65°Brix TSS and 45% fruit extract by weight for commercial fruit jellies."),
    case_q("Fruit and Vegetable Preservation and Processing", "Syneresis Defect Mechanism",
     "What causes the post-processing defect termed 'Syneresis' (Weeping of Jelly)?",
     "Excessive acidity (pH < 3.0) or low sugar, causing the pectin matrix to hyper-contract and expel liquid",
     ["Storing jelly in sub-zero freezers", "Adding too much cane sugar (>80%)", "Lack of glass jars"],
     "Excess hydrogen ion concentration causes hyper-aggregation of pectin chains, collapsing the capillary network and squeezing out water ('weeping').")
]

P2_M11_TXT = (
    "Read the following excerpt on the Economics, Phenotype, and Breeding Tract of Murrah Buffaloes, "
    "and answer the questions that follow:\n\n"
    "The water buffalo (Bubalus bubalis) is hailed as the 'Black Gold' of the Indian dairy industry, contributing nearly half of "
    "the nation's annual milk output and over 75% of total commercial butterfat production. Among all recognized riverine buffalo breeds, "
    "the 'Murrah' is the undisputed world leader in milk yield. Originating from the Rohtak, Hisar, Jind, and Bhiwani districts of Haryana "
    "(with extensions into Nabha and Patiala in Punjab), Murrah buffaloes are massive animals characterized by jet-black body coats (with "
    "permissible small white switches on the tail), compact bodies, deep barrels, and distinctive, tightly curled, spiral ring-like horns "
    "('Jalebi curl'). The head is comparatively light, clean-cut, with a prominent forehead and alert eyes. Average lactation yields in "
    "well-managed commercial herds range from 2,200 to 3,200 kg of milk (with elite champion cows exceeding 4,000 to 5,000 kg), with an "
    "average butterfat percentage of 7.0% to 8.5% and Solids-Not-Fat (SNF) of 9.0% to 9.5%. In comparison, the Bhadawari breed of the Chambal "
    "ravines yields less milk volume (1,200–1,500 kg) but produces the highest recorded butterfat concentration (often 8% to 13%), prized for "
    "traditional ghee manufacturing. Murrah buffaloes exhibit high feed conversion efficiency for coarse dry straws, but suffer from seasonal "
    "reproductive quiescence: high summer ambient temperatures (>40°C) coupled with limited sweat gland density induce 'silent heat' (anovulatory "
    "or unexpressed estrus), concentrating calving peak between July and November."
)
P2_M11_QS = [
    case_q("Breeds of Livestock and Poultry", "Murrah Native Breeding Tract",
     "The native home tract and epicenter of breeding of the premier Murrah buffalo breed is located in:",
     "Rohtak, Hisar, and Jind districts of Haryana (and adjoining Punjab)",
     ["Nilgiri hills of Tamil Nadu", "Gir forest of Gujarat", "Chota Nagpur plateau of Jharkhand"],
     "Murrah hails from the fertile agricultural tracts of Rohtak, Hisar, Jind, and Gurgaon in Haryana and adjoining districts of Punjab."),
    case_q("Breeds of Livestock and Poultry", "Iconic Morphological Feature of Murrah",
     "What is the most diagnostic, iconic morphological characteristic of a purebred Murrah buffalo?",
     "Tightly coiled, spiral, ring-shaped horns ('Jalebi curl') and deep jet-black coat",
     ["Long sword-like horizontal horns extending backwards to the shoulders", "White spots covering the entire face ('Panch Kalyani')", "A massive thoracic hump like zebu cattle"],
     "Murrah horns emerge outwards, turn backwards, and curve tightly inwards into a tight spiral ring like a 'jalebi'."),
    case_q("Breeds of Livestock and Poultry", "Average Milk Fat Content in Murrah",
     "What is the typical average butterfat percentage in normal whole milk drawn from Murrah buffaloes?",
     "7.0% to 8.5% fat (compared to 3.5–4.5% in dairy cows)",
     ["1.5% to 2.0% fat", "18% to 25% fat", "0.5% fat"],
     "Murrah buffalo milk is rich in butterfat, averaging 7.0–8.5%, yielding superior recovery of cream, butter, and ghee."),
    case_q("Breeds of Livestock and Poultry", "Highest Fat Percentage Buffalo Breed",
     "Which indigenous buffalo breed of the Yamuna-Chambal ravines is famed for producing milk with the highest recorded butterfat (8% to 13%)?",
     "Bhadawari",
     ["Jaffarabadi", "Mehsana", "Surti"],
     "Bhadawari buffaloes (copper-colored coat) yield milk with exceptionally high fat content (8-13%), highly prized for ghee manufacturing."),
    case_q("Breeds of Livestock and Poultry", "Summer Reproductive Problem in Buffaloes",
     "What major physiological reproductive management hurdle affects buffalo herds during the hot summer months?",
     "High incidence of 'Silent Heat' (estrus without conspicuous behavioral signs due to heat stress)",
     ["Permanent testicular atrophy in all bulls", "Inability to lactate after calving", "Complete sex reversal"],
     "Summer heat stress suppresses neuroendocrine LH pulses, causing silent ovulations where cows fail to display mounting or vocalization.")
]

# ==============================================================================
# MOCK 12 PASSAGES
# ==============================================================================
P1_M12_TXT = (
    "Read the following case study on Agroforestry Systems and Alley Cropping for Sustainable Land Management, "
    "and answer the questions that follow:\n\n"
    "Amid declining soil organic carbon and accelerating wind and water erosion across dryland tracts of India, 'Alley Cropping' "
    "(an agroforestry practice also known as Avenue Cropping or Hedgerow Intercropping) has proven highly sustainable. "
    "In alley cropping systems, arable agricultural crops (such as maize, sorghum, pearl millet, cowpea, or pigeonpea) are cultivated "
    "in the spatial 'alleys' (inter-spaces of 4 to 6 meters width) formed between parallel hedgerows of fast-growing, deep-rooted, "
    "multipurpose leguminous woody shrubs or trees. The most widely deployed woody species in tropical alley cropping is Subabul "
    "(Leucaena leucocephala), Gliricidia sepium, or Sesbania grandiflora. To prevent the tree hedgerows from shading the arable alley crops "
    "and competing for solar irradiance, the hedgerows are periodically pruned or lopped back to a low height of 50 to 100 cm during the crop "
    "growing season. The nutrient-dense green leafy biomass loppings (rich in nitrogen, approx. 3.5% to 4.5% N) are spread directly over the "
    "alley soil surface as protective in situ green mulch. The mulch physically dissipates raindrop kinetic energy, halts surface soil crusting, "
    "lowers summer soil surface temperatures by 5°C–8°C, and suppresses weed seedling emergence. As microbial saprophytes decompose the mulch, "
    "it releases 60 to 100 kg of bioavailable nitrogen per hectare, enriching soil organic matter and elevating Cation Exchange Capacity. "
    "Simultaneously, the deep tree taproots act as a 'nutrient pump', mining leached minerals from subsoil depths (>2 meters) and depositing "
    "them on the topsoil through litter fall."
)
P1_M12_QS = [
    case_q("Cropping Systems and Sustainable Organic Agriculture", "Alley Cropping Operational Definition",
           "In agroforestry terminology, 'Alley Cropping' refers to:",
           "Cultivating annual field crops in open alleys between pruned hedgerows of fast-growing leguminous trees or shrubs",
           ["Growing timber trees inside deep underground caves", "Planting fruit trees exclusively along railway tracks", "Covering entire farm fields with concrete slabs"],
           "Alley cropping intercrops food crops between parallel hedgerows of woody legumes, combining food production with in situ nutrient cycling."),
    case_q("Cropping Systems and Sustainable Organic Agriculture", "Subabul Tree Hedgerow Role",
     "Which fast-growing leguminous tree species is widely deployed in tropical alley cropping to provide high-nitrogen biomass loppings?",
     "Leucaena leucocephala (Subabul)",
     ["Eucalyptus globulus", "Pinus roxburghii", "Populus deltoides"],
     "Leucaena leucocephala (Subabul) fixes atmospheric nitrogen, coppices vigorously upon pruning, and yields leaves rich in nitrogen (3.5–4.5% N)."),
    case_q("Cropping Systems and Sustainable Organic Agriculture", "Pruning Height Management of Hedgerows",
     "Why are the tree hedgerows lopped back to a height of 50 to 100 cm during the crop growth season?",
     "To eliminate solar shade competition and prevent trees from overtopping the companion food crops in the alleys",
     ["To kill the tree roots completely", "To collect firewood for paper factories", "To harvest tree seeds"],
     "Periodic lopping prevents canopy shade competition, channeling tree vitality into leafy mulch while allowing full sunlight to alley cereals."),
    case_q("Cropping Systems and Sustainable Organic Agriculture", "Nutrient Pumping Ecological Function",
     "The ecological concept of the 'Nutrient Pump' performed by deep-rooted agroforestry trees refers to:",
     "Tree taproots intercepting and absorbing leached minerals from deep subsoils and cycling them to the topsoil via leaf mulch",
     ["Mechanical diesel pumps pumping liquid fertilizer into tree trunks", "Trees absorbing nitrogen gas directly through roots", "Pumping water out of rivers"],
     "Deep perennial tree roots mine nitrate and potassium that have leached past shallow annual crop roots, recycling them to the topsoil as organic mulch."),
    case_q("Cropping Systems and Sustainable Organic Agriculture", "Microclimatic Mulch Benefit",
     "What microclimatic benefit does spreading fresh tree prunings as surface mulch provide to alley soils during hot dry months?",
     "Suppresses evaporative soil water loss, cools topsoil temperatures by 5°C–8°C, and prevents surface crusting",
     ["Increases soil temperature to boiling point", "Turns topsoil into impermeable rock", "Releases toxic carbon monoxide"],
     "Organic leaf mulches protect soil structure, reduce evaporation, buffer extreme summer soil thermal spikes, and nourish the soil microbiome.")
]

P2_M12_TXT = (
    "Read the following excerpt on Metabolic Disorders of High-Yielding Dairy Cows: Milk Fever and Ketosis, "
    "and answer the questions that follow:\n\n"
    "The transition period—spanning the 3 weeks prior to calving through the 3 weeks post-calving—represents the most metabolically "
    "hazardous phase in high-yielding dairy cows. Immediately upon parturition, the sudden onset of profuse colostrum secretion drains "
    "circulating blood Calcium at a rate exceeding 2 to 3 grams per hour. If homeostatic bone resorption (mediated by parathyroid hormone) "
    "and active intestinal calcium absorption (mediated by 1,25-dihydroxycholecalciferol) cannot match this drain, acute systemic "
    "hypocalcemia ensues, clinically diagnosed as 'Milk Fever' (Parturient Paresis). Total serum calcium plunges from normal (8.5–10.0 mg/dl) "
    "to <5.0 mg/dl. Because calcium is indispensable for acetylcholine release and neuromuscular junction contraction, afflicted cows exhibit "
    "initial muscle tetany followed rapidly by flaccid muscle paralysis, sternal recumbency with the head characteristically turned back into the "
    "flank, subnormal body temperature (hypothermia), cold extremities, and coma. Immediate emergent intravenous infusion of Calcium Borogluconate "
    "(25% to 30% solution, approx. 400–500 ml warmed to body temperature) delivers prompt dramatic recovery. A related transition disorder is "
    "'Ketosis' (Acetonemia), occurring 2 to 6 weeks into lactation. Peak lactation energy demand outstrips dry matter intake capacity, plunging "
    "the cow into Negative Energy Balance (NEB). The cow mobilizes adipose adipose fat reserves, flooding the liver with Non-Esterified Fatty "
    "Acids (NEFA). When liver gluconeogenesis runs out of oxaloacetate precursors, excess acetyl-CoA is diverted into synthesis of Ketone Bodies "
    "(Acetoacetate, Beta-hydroxybutyrate, Acetone), producing sweet acetone-smelling breath, rapid emaciation, inappetence, and drop in milk yield."
)
P2_M12_QS = [
    case_q("Animal Reproduction, AI and Health Management", "Milk Fever Causal Metabolic Deficiency",
     "Milk fever (Parturient Paresis) in freshly calved dairy cows is a metabolic disorder caused by acute deficiency of:",
     "Blood Calcium (acute hypocalcemia)",
     ["Blood Glucose", "Dietary Magnesium", "Blood Sodium"],
     "Colostrum synthesis suddenly drains maternal blood calcium faster than skeletal mobilization can replace it, causing acute hypocalcemia."),
    case_q("Animal Reproduction, AI and Health Management", "Iconic Clinical Posture in Milk Fever",
     "What pathognomonic physical posture is displayed by a dairy cow in the recumbent second stage of milk fever?",
     "Sternal recumbency with the neck curved and head tucked back into the flank, with subnormal body temperature",
     ["Galloping hysterically across the yard", "Standing stiffly on hind legs", "Bellowing loudly continuously"],
     "Flaccid skeletal muscle paralysis causes sternal recumbency with the head resting characteristically against the flank, accompanied by hypothermia."),
    case_q("Animal Reproduction, AI and Health Management", "Emergency Treatment for Milk Fever",
     "What is the life-saving emergent veterinary therapy administered to a cow down with acute milk fever?",
     "Slow intravenous infusion of Calcium Borogluconate (25% solution)",
     ["Oral force-feeding of dry wheat straw", "Injecting large doses of insulin", "Subcutaneous injection of pure alcohol"],
     "IV infusion of warmed calcium borogluconate immediately restores extracellular calcium ion concentration, re-establishing neuromuscular transmission."),
    case_q("Animal Reproduction, AI and Health Management", "Biochemical Driver of Bovine Ketosis",
     "Bovine Ketosis (Acetonemia) in early lactation is triggered by which primary nutritional-metabolic state?",
     "Severe Negative Energy Balance (NEB) due to lactation energy demands exceeding dietary feed energy intake",
     ["Excessive protein overfeeding in late pregnancy", "Drinking ice-cold water in winter", "Bacterial infection of the liver"],
     "Negative energy balance forces massive mobilization of adipose triglycerides; incomplete hepatic oxidation generates toxic ketone bodies."),
    case_q("Animal Reproduction, AI and Health Management", "Diagnostic Sensory Sign of Ketosis",
     "What diagnostic sensory sign allows veterinarians and dairy herdsmen to detect bovine ketosis cow-side?",
     "A characteristic sweet, fruity acetone odor on the cow's breath, milk, and urine",
     ["Smell of rotten fish on hooves", "Smell of burning rubber from ears", "Complete absence of any smell"],
     "Volatile acetone synthesized during ketogenesis is exhaled in breath and excreted in milk/urine, imparting a distinct sweet, fruity solvent odor.")
]

# ==============================================================================
# MOCK 13 PASSAGES
# ==============================================================================
P1_M13_TXT = (
    "Read the following case study on Bt Cotton Transgenic Technology and Resistance Management in Pink Bollworm, "
    "and answer the questions that follow:\n\n"
    "Commercial release of genetically modified insect-resistant 'Bt Cotton' in 2002 transformed India into a global cotton powerhouse. "
    "Transgenic cotton hybrids incorporate crystalline endotoxin genes (Cry1Ac and Cry2Ab) isolated from the soil bacterium Bacillus thuringiensis. "
    "When susceptible lepidopteran larvae (bollworms) chew on cotton squares or bolls, they ingest inactive protoxin protein crystals. "
    "In the insect's alkaline midgut (pH > 9.0), protoxins are solubilized and cleaved by midgut proteases into active endotoxins. The active "
    "toxin binds specifically to cadherin and aminopeptidase receptors on the midgut epithelial brush border membrane, inserting to form lytic "
    "cation-permeable pores. Osmotic shock causes epithelial cell lysis, gut paralysis, cessation of feeding, and septicemic death within 48 hours. "
    "While Bt cotton provided near-complete control of the American bollworm (Helicoverpa armigera) and Spotted bollworm (Earias vittella), "
    "the Pink Bollworm (Pectinophora gossypiella) has developed widespread field resistance to Bollgard-I (Cry1Ac) and Bollgard-II (Cry1Ac + Cry2Ab) "
    "in central and southern India (Gujarat, Maharashtra, Telangana). Pink bollworm is an obligate, monophagous pest whose larvae bore into closed "
    "green bolls, feeding continuously on internal lint and seeds exposed to declining toxin expression. Furthermore, widespread failure of farmers "
    "to plant mandatory non-Bt 'Refuge' border rows (20% non-Bt cotton or 5 border rows) allowed homozygous resistant alleles to proliferate unchecked. "
    "Today, Integrated Pest Management (IPM) incorporates pheromone delta traps with 'Gossyplure' lures (at 5–10 traps/ha for monitoring and "
    "mating disruption), mass roguing of early rosette flowers, and strictly terminating the cotton crop within 150–160 days to prevent winter carryover."
)
P1_M13_QS = [
    case_q("Agronomy of Commercial and Cash Crops", "Bacterial Source of Bt Insecticidal Toxins",
           "The insecticidal Cry endotoxin genes engineered into transgenic Bt cotton were originally cloned from which soil bacterium?",
           "Bacillus thuringiensis",
           ["Agrobacterium tumefaciens", "Rhizobium leguminosarum", "Escherichia coli"],
           "Bacillus thuringiensis is a Gram-positive, spore-forming soil bacterium that synthesizes parasporal insecticidal crystalline Cry proteins."),
    case_q("Agronomy of Commercial and Cash Crops", "Molecular Activation Mechanism of Cry Proteins",
     "Why are Cry endotoxins specifically lethal to target caterpillar pests while harmless to mammals, birds, and humans?",
     "Cry proteins require the highly alkaline insect midgut (pH > 9.0) and specific brush-border cadherin receptors absent in mammals",
     ["Mammalian stomachs are alkaline", "Humans do not eat cotton leaves", "Cry proteins evaporate into steam in air"],
     "Cry protoxins solubilize strictly in the alkaline insect midgut and bind unique invertebrate receptors; acidic mammalian stomachs denature them into harmless dietary protein."),
    case_q("Agronomy of Commercial and Cash Crops", "Primary Factor Driving Pink Bollworm Resistance",
     "Why did the Pink Bollworm (Pectinophora gossypiella) evolve resistance to Bt cotton faster than other bollworm species?",
     "It is a monophagous pest feeding inside closed bolls, where larvae were exposed to declining toxin without non-Bt refuge survival",
     ["It eats only synthetic plastics", "It has no midgut", "It reproduces only by budding"],
     "Pink bollworm feeds strictly on cotton bolls; failure to maintain non-Bt refuges enabled resistant larvae to mate without dilution from susceptible wild moths."),
    case_q("Agronomy of Commercial and Cash Crops", "Purpose of Non-Bt Refuge Planting",
     "In transgenic crop stewardship, the mandatory planting of non-Bt cotton 'Refuge' rows is designed to:",
     "Preserve a large reservoir of homozygous susceptible (ss) insects to mate with rare resistant (rr) survivors, keeping resistance recessive (rs)",
     ["Provide food for grazing cattle", "Trap windblown sand", "Act as a fence against wild animals"],
     "The 'High-Dose / Refuge Strategy' ensures that homozygous resistant moths mate with abundant susceptible moths from refuges, producing heterozygous (rs) progeny killed by Bt."),
    case_q("Agronomy of Commercial and Cash Crops", "Sex Pheromone Lure for Pink Bollworm",
     "Which commercial synthetic female sex pheromone lure is deployed in delta traps for monitoring and mating disruption of Pink Bollworm?",
     "Gossyplure",
     ["Helilure", "Spodolure", "Cue-lure"],
     "Gossyplure is the synthetic sex attractant pheromone of female Pectinophora gossypiella, used in monitoring traps and pheromone mating disruption.")
]

P2_M13_TXT = (
    "Read the following excerpt on Commercial Milk Pasteurization Protocols and Alkaline Phosphatase Validation, "
    "and answer the questions that follow:\n\n"
    "Thermal pasteurization of liquid milk is the fundamental processing barrier protecting public health from milk-borne zoonoses "
    "(such as Mycobacterium tuberculosis, Coxiella burnetii, and Brucella abortus) while extending refrigerated shelf stability. "
    "In industrial dairy plants, two primary continuous/batch pasteurization standards are officially mandated: (1) Low-Temperature "
    "Long-Time (LTLT / Batch) method, where milk is held at a minimum of 63°C (145°F) for at least 30 continuous minutes in a jacketed "
    "vat; and (2) High-Temperature Short-Time (HTST) continuous pasteurization, where milk is pumped through a regenerative Plate Heat "
    "Exchanger (PHE) to reach a minimum of 71.7°C–72.0°C (161°F) for not less than 15 seconds, followed immediately by rapid chilled cooling "
    "to below 4°C. The statutory time-temperature minimums are mathematically calculated based on the thermal thermal death point of "
    "Coxiella burnetii (the causal rickettsial agent of Q-fever), which represents the most heat-resistant non-spore-forming pathogen found in "
    "raw bovine milk. To legally verify that pasteurization was successfully executed, every commercial batch must undergo the 'Alkaline "
    "Phosphatase Test'. Alkaline phosphatase is an indigenous phosphomonoesterase enzyme naturally present in all raw milk. Crucially, "
    "alkaline phosphatase has a thermal inactivation kinetic profile slightly more heat-tolerant than Mycobacterium tuberculosis. Therefore, "
    "the complete absence of alkaline phosphatase activity (yielding zero yellow p-nitrophenol in the laboratory spectrophotometer test) "
    "provides definitive biochemical proof that all vegetative bacterial pathogens have been completely destroyed, without overprocessing the milk."
)
P2_M13_QS = [
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Official HTST Pasteurization Parameters",
     "What are the official regulatory time and temperature parameters for High-Temperature Short-Time (HTST) pasteurization of milk?",
     "71.7°C (72°C) for at least 15 seconds",
     ["63°C for 30 minutes", "100°C for 10 minutes", "135°C for 1 second"],
     "HTST pasteurization pumps milk through plate heat exchangers to 71.7°C (161°F) for 15 seconds followed by rapid chilling to <4°C."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Target Pathogen for Thermal Standards",
     "The time-temperature parameters of modern commercial pasteurization were historically recalibrated to ensure the total thermal destruction of:",
     "Coxiella burnetii (causal rickettsia of Q-Fever, the most heat-tolerant non-spore former)",
     ["Escherichia coli", "Lactobacillus acidophilus", "Yeast and mold spores"],
     "Coxiella burnetii is the most heat-resistant vegetative pathogen in raw milk; thermal inactivation of C. burnetii guarantees safety against all other vegetative pathogens."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Alkaline Phosphatase Test Biochemical Logic",
     "Why is the Alkaline Phosphatase Test the statutory test used globally to verify adequate pasteurization of milk?",
     "Alkaline phosphatase is naturally present in raw milk and is destroyed at temperatures slightly higher than Mycobacterium tuberculosis",
     ["It makes the milk turn bright blue if safe", "It measures the total butterfat content", "It measures the amount of added sucrose"],
     "Because alkaline phosphatase's thermal death curve slightly exceeds that of M. tuberculosis, a negative phosphatase test proves complete pathogenic kill."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Color Indicator in Alkaline Phosphatase Test",
     "In the laboratory alkaline phosphatase assay, positive residual enzyme activity (indicating under-pasteurization or raw milk contamination) is detected by:",
     "Development of a yellow color due to enzymatic liberation of p-nitrophenol",
     ["Formation of an intense pitch black precipitate", "Milk turning into clear water", "Immediate boiling and gas bubbling"],
     "Active alkaline phosphatase hydrolyzes disodium p-nitrophenyl phosphate substrate into free p-nitrophenol, which turns yellow under alkaline conditions."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Ultra-High Temperature (UHT) Processing",
     "How does Ultra-High Temperature (UHT) processing differ from conventional HTST pasteurization in terms of storage capability?",
     "UHT heats milk to 135°C–150°C for 1 to 3 seconds, achieving commercial sterility allowing unrefrigerated shelf storage for months in aseptic tetra-packs",
     ["UHT milk must be consumed within 2 hours", "UHT milk can only be stored in open clay pots", "UHT milk contains zero protein"],
     "UHT destroys all vegetative microbes and resistant bacterial spores, packaged aseptically into multi-layer tetra-packs stable at ambient temperature for 6–9 months.")
]

# ==============================================================================
# MOCK 14 PASSAGES
# ==============================================================================
P1_M14_TXT = (
    "Read the following case study on Propagation Biology and Clonal Multiplication via Air Layering (Gootee), "
    "and answer the questions that follow:\n\n"
    "Air Layering—known traditionally in South Asia as 'Gootee' or Marcottage—is an ancient yet highly effective asexual propagation "
    "technique widely deployed for true-to-type clonal multiplication of difficult-to-root woody fruit trees and shrubs, particularly "
    "Litchi (Litchi chinensis), Guava (Psidium guajava), Pomegranate (Punica granatum), and Lime (Citrus aurantifolia). The biological "
    "premise of air layering relies on inducing adventitious root primordia on an aerial shoot while it remains physically and physiologically "
    "attached to the parent mother tree. During the monsoon season (July-August, when high humidity and temperature optimize cambial cell division), "
    "a healthy, vigorous, 1-to-2-year-old pencil-thick terminal branch is selected. A complete circular ring of bark (approx. 2.5 to 3.0 cm wide) "
    "is excised, removing the outer epidermis, cortex, and functional phloem down to the glistening hard secondary xylem wood. Any remaining "
    "cambial cells on the exposed wood are carefully scraped off to prevent premature bridge healing. Girdling severs downward phloem transport, "
    "causing endogenous carbohydrates (sugars, starch) and natural auxins produced in terminal leaves to accumulate in massive concentrations "
    "at the upper cut edge, inducing localized swelling and meristematic callus formation. To accelerate rooting, the upper rim is dusted or painted "
    "with synthetic auxin: Indole-3-Butyric Acid (IBA) formulation at 2,500 to 5,000 ppm. The debarked girdle is then encased in a baseball-sized "
    "ball of moist Sphagnum moss (or a 1:1 mix of soil and rotted leaf mold) and wrapped hermetically in transparent polyethylene film (200 gauge), "
    "tied securely at both ends with jute twine. Sphagnum moss retains moisture for 60 to 75 days without drying out. Within 6 to 8 weeks, abundant "
    "white fibrous adventitious roots become visible through the transparent plastic, indicating readiness for severing."
)
P1_M14_QS = [
    case_q("Plant Propagation and Nursery Management", "Physiological Consequence of Girdling Phloem",
           "Why is a complete 2.5–3 cm ring of bark (phloem) excised in the air layering technique?",
           "It arrests downward phloem translocation, concentrating carbohydrates and endogenous auxins at the upper cut edge to induce root initials",
           ["To allow tree sap to leak into the air", "To kill the branch leaves within 24 hours", "To hollow out the central wood"],
           "Severing phloem halts downward transport of auxins and photosynthates, pooling them at the upper cut margin where adventitious root primordia differentiate."),
    case_q("Plant Propagation and Nursery Management", "Indispensable Rooting Hormone",
     "Which synthetic plant growth regulator is standardly applied to the upper margin of the girdle to stimulate rapid adventitious rooting?",
     "Indole-3-Butyric Acid (IBA) at 2,500 to 5,000 ppm",
     ["Gibberellic acid (GA3) at 10 ppm", "2,4-D herbicide at 500 ppm", "Abscisic acid (ABA)"],
     "IBA is the premier synthetic auxin for clonal root induction, displaying high chemical stability and localized root-inducing potency."),
    case_q("Plant Propagation and Nursery Management", "Unique Properties of Sphagnum Moss",
     "Why is Sphagnum moss universally preferred as the wrapping rooting medium in commercial Gootee making?",
     "It possesses enormous water-holding capacity (up to 20 times its dry weight), superior porosity, and natural antiseptic properties",
     ["It turns branches into stone", "It contains high levels of chemical fertilizers", "It is 100% waterproof"],
     "Sphagnum moss holds moisture around the rooting zone for weeks without requiring re-watering, providing clean, aerated, mold-resistant cushioning."),
    case_q("Plant Propagation and Nursery Management", "Visual Indicator of Rooting Readiness",
     "How does an orchard propagator know that an air layer is fully rooted and ready to be severed from the parent tree?",
     "Vigorous brown-tipped fibrous adventitious roots become clearly visible through the transparent polyethylene wrap",
     ["All the leaves fall off the branch", "The plastic wrap melts completely", "The mother tree stops flowering"],
     "Transparent plastic wrap permits visual monitoring; appearance of abundant fibrous roots through the plastic indicates readiness for gradual detachment."),
    case_q("Plant Propagation and Nursery Management", "Best Season for Air Layering in India",
     "Air layering of litchi, guava, and pomegranate in the plains of India is executed with highest success during which season?",
     "Rainy monsoon season (July to August)",
     ["Freezing cold December", "Scorching dry summer (May)", "Early autumn leaf fall"],
     "High ambient relative humidity (>80%) and warm temperatures in the monsoon stimulate cambial cell division and prevent desiccation of developing rootlets.")
]

P2_M14_TXT = (
    "Read the following excerpt on Phosphate Solubilizing Biofertilizers (PSB) and Arbuscular Mycorrhizal Fungi (AMF / VAM), "
    "and answer the questions that follow:\n\n"
    "Phosphorus (P) is a vital primary macronutrient required for cellular energy transfer (ATP, ADP), nucleic acids, and root membrane "
    "phospholipids. However, Phosphorus Use Efficiency in agricultural soils rarely exceeds 15% to 20% because applied soluble orthophosphate "
    "fertilizers (such as DAP or SSP) undergo rapid chemical fixation: in acidic soils (pH < 5.5), phosphate precipitates as insoluble aluminum "
    "and iron phosphates (strengite and variscite), while in alkaline calcareous soils (pH > 7.5), it precipitates as insoluble dicalcium "
    "and tricalcium phosphates (hydroxyapatite). To unlock this vast, immobile soil phosphorus pool, biofertilizers play an indispensable role. "
    "Phosphate Solubilizing Bacteria (PSB, predominantly Bacillus megaterium, Bacillus polymyxa, and Pseudomonas putida) and fungi (Aspergillus awamori) "
    "colonize the rhizosphere, where they secrete low-molecular-weight aliphatic organic acids (citric, oxalic, gluconic, succinic, malic acids). "
    "These organic acids chelate divalent and trivalent cations (Ca2+, Fe3+, Al3+) through their hydroxyl and carboxyl functional groups, lowering "
    "micro-rhizosphere pH and freeing bioavailable orthophosphate ions (H2PO4- and HPO4 2-) for plant root uptake. Complementing PSB, Vesicular "
    "Arbuscular Mycorrhizal (VAM / AMF) fungi belonging to the Phylum Glomeromycota (e.g., Glomus mosseae, Rhizophagus irregularis) form an obligate "
    "mutualistic endosymbiosis with crop roots. Fungal hyphae penetrate the root cortex, forming intracellular branched 'arbuscules' (sites of "
    "nutrient exchange) and lipid-storing 'vesicles'. The extensive external fungal mycelial network radiates centimeters into the bulk soil, "
    "effectively expanding the root absorptive surface area 10 to 100-fold, exploring soil volumes far beyond the narrow root phosphorus-depletion zone."
)
P2_M14_QS = [
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Fate of Applied Chemical Phosphorus",
     "Why does chemical phosphorus fertilizer (DAP/SSP) have very low efficiency (15–20%) in tropical soils?",
     "Soluble phosphate reacts rapidly with iron/aluminum in acid soils and calcium in alkaline soils to form insoluble mineral precipitates",
     ["Phosphorus evaporates into the atmosphere as poisonous gas", "Phosphorus is devoured exclusively by birds", "Phosphorus dissolves soil clay completely"],
     "Orthophosphate ions precipitate as insoluble Al/Fe complexes at low pH and insoluble calcium phosphates at high pH, fixing P permanently."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Biochemical Mechanism of Phosphate Solubilization by PSB",
     "How do Phosphate Solubilizing Bacteria (PSB) liberate soluble orthophosphates from insoluble rock phosphates?",
     "By secreting low-molecular-weight organic acids (citric, gluconic, oxalic acids) that chelate metal cations and lower micro-pH",
     ["By synthesizing concentrated hydrochloric acid", "By freezing the soil particles into ice", "By eating soil rocks directly"],
     "Organic acids secreted by PSB chelate calcium, iron, and aluminum ions, releasing bound phosphate into the soil solution for root absorption."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Arbuscules Structure Function in AMF",
     "In Arbuscular Mycorrhizal (AMF) fungal associations, what is the specific biological role of intracellular 'Arbuscules'?",
     "They are highly branched fungal structures within cortical cells acting as the primary bidirectional exchange sites for phosphorus and carbon",
     ["They are resting spores that kill the host plant", "They act as root anchors that strangle weeds", "They produce green chlorophyll"],
     "Arbuscules are finely branched invaginations within root cortical cells, providing extensive surface area for transferring fungal P to host and plant sugar to fungus."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Mycorrhizal Depletion Zone Exploitation",
     "How do mycorrhizal fungal hyphae overcome the diffusion limitation of phosphorus in dry agricultural soils?",
     "Extensive extra-radical hyphae bridge the narrow root depletion zone, exploring soil micro-pores inaccessible to thick plant root hairs",
     ["Hyphae dig deep wells to find underground oil", "Hyphae carry water in buckets to leaves", "Hyphae reflect solar radiation"],
     "Phosphorus diffusion in soil is extremely slow (0.1 mm/day); fungal mycelia radiate centimeters beyond the root depletion zone to scavenge distant P."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Leading PSB Bacterial Genus",
     "Which of the following bacterial genera is most widely utilized in commercial agricultural biofertilizer inoculants for phosphate solubilization?",
     "Bacillus (e.g., Bacillus megaterium) and Pseudomonas (e.g., Pseudomonas putida)",
     ["Salmonella", "Streptococcus", "Clostridium"],
     "Bacillus megaterium var. phosphaticum and Pseudomonas striata are the premier industrial PSB strains formulated as carrier bio-inoculants.")
]

# ==============================================================================
# MOCK 15 PASSAGES
# ==============================================================================
P1_M15_TXT = (
    "Read the following case study on the Sustainable Sugarcane Initiative (SSI) and Spaced Transplanting Method, "
    "and answer the questions that follow:\n\n"
    "Sugarcane (Saccharum officinarum) is an exhaustive commercial cash crop that underpins India's multi-billion dollar rural sugar "
    "economy. However, conventional sugarcane planting suffers from massive inefficiencies: farmers plant 8 to 10 tonnes of bulky three-budded "
    "seed cane setts per hectare in narrow furrows (75 to 90 cm apart). Over 50% of the planted buds rot or fail to sprout due to soil pathogens "
    "and uneven depth, resulting in dense, crowded, light-starved clumps with high pest incidence and low tillering. To overcome these constraints, "
    "the 'Sustainable Sugarcane Initiative' (SSI)—pioneered jointly by ICRISAT and WWF—revolutionized cane agronomy by deploying 'Spaced "
    "Transplanting' (STP). In SSI, seed cane is not dumped into open furrows; instead, single-budded chips are excised using a mechanical hand-operated "
    "bud-chipper machine, saving >85% to 90% of the cane stalk for crushing. The excised single buds (chips) are treated with carbendazim fungicide "
    "and raised in 50-cavity plastic portray trays filled with coco-peat in a shade-net nursery. In just 30 to 35 days, robust, well-rooted single-shoot "
    "settlings with fibrous root balls are ready for field planting. These young settlings are transplanted into wide-spaced furrows at a wide "
    "geometry of 1.2 m to 1.5 m (4 to 5 feet) between rows and 60 cm between plants within the row. The wide spacing, paired with drip fertigation "
    "delivering nutrients directly to roots, admits abundant solar radiation to the basal stools, stimulating explosive tillering (15 to 25 thick "
    "millable canes per stool compared to 4–6 in conventional planting). SSI slashes seed requirement from 10 tonnes down to just 1 tonne per hectare, "
    "reduces water consumption by 40%, and elevates cane yields from 70–80 t/ha to over 120–150 t/ha."
)
P1_M15_QS = [
    case_q("Agronomy of Commercial and Cash Crops", "Seed Cane Saving under SSI Technology",
           "What is the dramatic seed cane reduction achieved by adopting the Sustainable Sugarcane Initiative (SSI) bud-chip method?",
           "Slashes seed cane requirement from 8–10 tonnes/ha down to just 1 to 1.2 tonnes/ha (saving >85% seed volume)",
           ["Saves exactly 2 kg seed per hectare", "Requires twice as much seed cane as conventional planting", "Requires 100 tonnes seed cane/ha"],
           "Using single-bud chips raised in portrays cuts seed sett mass from 8–10 tonnes to approx. 1 tonne/ha, freeing 8 tonnes for sugar recovery."),
    case_q("Agronomy of Commercial and Cash Crops", "Nursery Settling Age for Field Transplanting",
     "At what age and growth stage are portray-raised sugarcane settlings ready for field transplanting in SSI?",
     "30 to 35 days old (with well-established fibrous root balls)",
     ["5 days old pre-germinated chips", "6 months old mature canes", "2 years old overgrown plants"],
     "Single-bud chips grow into sturdy, 4–6 leaf settlings with compact root plugs in 30–35 days, ready for trauma-free field transplanting."),
    case_q("Agronomy of Commercial and Cash Crops", "Wide-Row Planting Geometry in SSI",
     "What planting geometry is standardly adopted for field transplanting in the Sustainable Sugarcane Initiative?",
     "Wide row spacing of 1.2 to 1.5 meters (4 to 5 feet) between rows and 60 cm between plants",
     ["Dense planting at 30 cm x 30 cm", "Random broadcasting across untilled fields", "Burying settlings 2 meters deep"],
     "Wide rows (1.2–1.5 m) allow full solar radiation interception and mechanized tractor cultivation, stimulating massive tillering."),
    case_q("Agronomy of Commercial and Cash Crops", "Physiological Driver of High Millable Cane Count",
     "Why do SSI sugarcane stools produce 15 to 25 millable canes compared to 4 to 6 canes in conventional furrows?",
     "Wide geometric spacing and abundant sunlight prevent tiller mortality and stimulate profuse basal tillering",
     ["Settlings are genetically modified with animal growth hormones", "Cane roots are boiled in hot tea", "Canes are tied to high voltage poles"],
     "Unshaded basal crowns receive direct solar illumination, preventing early tiller senescence and promoting 15–25 heavy, uniform millable stalks."),
    case_q("Agronomy of Commercial and Cash Crops", "Economic Advantage to the Sugar Factory",
     "What immediate commercial benefit does the bud-chip technology offer to sugar factories and participating farmers?",
     "The remaining 85% to 90% of the cane stalk from which buds were excised can be sent directly to the mill for sugar extraction",
     ["Cane stalks turn into gold bars", "Sugar factories can close down completely", "It eliminates the requirement for sugar crystallization"],
     "Chipping extracts only the eye bud and tiny wood core; the remaining intact cane stalk is sent straight to the factory crushing mills.")
]

P2_M15_TXT = (
    "Read the following excerpt on Chemical Food Preservatives: Comparative Science of Potassium Metabisulfite vs Sodium Benzoate, "
    "and answer the questions that follow:\n\n"
    "Chemical food preservatives are statutory additives deployed in fruit processing to arrest microbial proliferation, inhibit enzymatic "
    "browning, and preserve color and aroma in commercial beverages (squashes, cordials, crushes) and condiments (ketchups, sauces, chutneys). "
    "The two primary Class-II chemical preservatives approved by the Food Safety and Standards Authority of India (FSSAI) are Potassium "
    "Metabisulfite (KMS, K2S2O5) and Sodium Benzoate (C6H5COONa). Despite their shared antimicrobial objective, their technological "
    "applications are strictly segregated based on product pigment chemistry and pH. KMS acts by releasing active Sulfur Dioxide (SO2) "
    "gas in acidic fruit juices. SO2 dissolves into water to form sulfurous acid (H2SO3), which dissociates into bisulfite (HSO3-) and "
    "sulfite (SO3 2-) ions. Molecular SO2 diffuses across microbial cell membranes, inactivating dehydrogenase enzymes and cleaving essential "
    "disulfide bonds (-S-S-) in cellular proteins. Furthermore, SO2 is a potent reducing agent, reacting with atmospheric oxygen to prevent "
    "enzymatic and non-enzymatic browning. However, KMS is strictly PROHIBITED in naturally colored red, purple, or blue fruits (such as Jamun, "
    "Phalsa, Pomegranate, Strawberry, Black Grape): sulfurous acid bleaches natural Anthocyanin pigments into colorless sulfonic acid derivatives, "
    "turning attractive ruby beverages into dull, bleached white fluids. Additionally, SO2 corrodes tinplate cans, causing black tin sulfide "
    "staining. For all naturally colored and acidic fruit products (as well as tomato ketchups), Sodium Benzoate is the mandatory preservative. "
    "Sodium benzoate is the sodium salt of benzoic acid; in acidic media (pH < 4.0), it converts into undissociated Benzoic Acid molecules "
    "that penetrate microbial cell walls, inhibiting the glycolytic enzyme phosphofructokinase and destroying spoilage yeasts and molds "
    "without affecting anthocyanin or lycopene colors."
)
P2_M15_QS = [
    case_q("Fruit and Vegetable Preservation and Processing", "Active Antimicrobial Agent in KMS",
     "When Potassium Metabisulfite (KMS) dissolves in fruit juice, what chemical compound acts as the active germicidal agent?",
     "Sulfur Dioxide (SO2, forming sulfurous acid)",
     ["Carbon monoxide", "Pure potassium metal", "Hydrochloric acid"],
     "KMS breaks down in acidic juices to release molecular Sulfur Dioxide (SO2), which forms germicidal sulfurous acid."),
    case_q("Fruit and Vegetable Preservation and Processing", "Why KMS Bleaches Colored Juices",
     "Why must Potassium Metabisulfite (KMS) NEVER be used to preserve naturally red or purple fruit juices like Jamun or Pomegranate?",
     "Sulfur dioxide chemically bleaches and destroys natural anthocyanin pigments, turning colored juices into dull white",
     ["It causes instantaneous explosion of glass bottles", "It turns anthocyanins into deadly poisonous cyanide", "It freezes the juice solid"],
     "SO2 reacts with the flavylium cation of anthocyanins, forming colorless sulfonic acid complexes that permanently destroy fruit red color."),
    case_q("Fruit and Vegetable Preservation and Processing", "Preservative of Choice for Naturally Colored Products",
     "Which chemical food preservative is universally used to preserve naturally colored fruit squashes and tomato ketchups?",
     "Sodium Benzoate",
     ["Potassium Metabisulfite", "Bleaching powder", "Formaldehyde"],
     "Sodium Benzoate does not bleach anthocyanin or lycopene pigments, making it the preservative of choice for colored juices and ketchups."),
    case_q("Fruit and Vegetable Preservation and Processing", "pH Requirement for Sodium Benzoate Activity",
     "Sodium benzoate exhibits potent antimicrobial activity strictly under which chemical condition?",
     "In acidic products having a pH below 4.0 (where it converts into undissociated benzoic acid)",
     ["In strongly alkaline foods at pH 12.0", "In pure neutral distilled water at pH 7.0", "In boiling motor oil"],
     "Benzoate is effective only in acidic foods (pH < 4.0) where low pH pushes equilibrium to lipophilic undissociated benzoic acid."),
    case_q("Fruit and Vegetable Preservation and Processing", "Tin Can Corrosion Hazard with Sulfur Dioxide",
     "Why can fruit beverages preserved with Sulfur Dioxide (KMS) never be packaged in metallic tin cans?",
     "Sulfur dioxide reacts with exposed tinplate to produce hydrogen gas swells and unsightly black tin sulfide precipitates",
     ["Tin melts in the presence of sulfur", "Tin absorbs all the sugar from the juice", "The can grows heavy like lead"],
     "SO2 attacks iron and tin linings, generating foul-smelling hydrogen sulfide that reacts with metals to form black tin/iron sulfide stains.")
]

# ==============================================================================
# MOCK 16 PASSAGES
# ==============================================================================
P1_M16_TXT = (
    "Read the following case study on Controlled Atmosphere Storage (CAS) and Cold Chain Technology for Apple Exports, "
    "and answer the questions that follow:\n\n"
    "The Apple (Malus domestica) is a classic climacteric temperate fruit possessing high post-harvest economic value but substantial "
    "metabolic perishability. Following harvest in the high-altitude valleys of Jammu & Kashmir and Himachal Pradesh, apples continue "
    "active aerobic respiration: consuming cellular sugars and malic acid, exhausting internal moisture via transpiration, and generating "
    "autocatalytic bursts of the ripening hormone Ethylene (C2H4). Conventional cold storage (0°C to 1°C and 90%–95% RH in normal air containing "
    "21% O2 and 0.04% CO2) extends marketable storage to approximately 3 to 4 months, after which fruit softening, mealy breakdown, internal "
    "browning, and superficial scald degrade quality. To preserve crisp harvest freshness for 8 to 12 months, modern packhouses deploy "
    "'Controlled Atmosphere Storage' (CAS). CAS chambers are gas-tight, insulated cold rooms where atmospheric gas concentrations are "
    "artificially regulated alongside temperature. In standard apple CAS rooms, oxygen (O2) concentration is pulled down from 21% to 1.5%–2.5% "
    "using nitrogen generators, carbon dioxide (CO2) is scrubbed and maintained at 1.0% to 2.5%, and temperature is held precisely at 0°C to 0.5°C. "
    "Hypoxic (low O2) and hypercapnic (elevated CO2) atmospheres suppress the respiratory enzyme Cytochrome oxidase, slashing the fruit's "
    "metabolic respiration rate by 60% to 70%. Furthermore, low O2 inhibits the rate-limiting enzyme 1-Aminocyclopropane-1-Carboxylic Acid (ACC) "
    "oxidase, blocking de novo ethylene synthesis, while elevated CO2 competitively blocks ethylene receptors. Potassium permanganate (KMnO4) "
    "scrubbers absorb trace ethylene from room air. Consequently, cell wall pectin hydrolysis (by polygalacturonase) is arrested, chlorophyll "
    "degradation is delayed, and fruit firmness (>14–16 lbs/in²) is preserved for up to a full year."
)
P1_M16_QS = [
    case_q("Post-Harvest Handling and Storage Technology", "Atmospheric Gas Concentrations in Apple CAS",
           "What are the typical target atmospheric gas concentrations maintained inside a commercial Controlled Atmosphere Storage (CAS) room for apples?",
           "Oxygen pulled down to 1.5%–2.5%, and Carbon Dioxide maintained at 1.0%–2.5%",
           ["Pure Oxygen at 100%, and zero CO2", "Oxygen at 50%, and Carbon Dioxide at 50%", "Pure Methane gas at 90%"],
           "CAS for apples maintains ultra-low oxygen (1.5–2.5%) and slightly elevated CO2 (1–2.5%) at 0°C to suppress respiration without causing anoxia."),
    case_q("Post-Harvest Handling and Storage Technology", "Enzyme Blocked by Hypoxic Storage",
     "Sub-atmospheric oxygen levels (<2%) inside CAS rooms preserve fruit firmness primarily by suppressing which ethylene-synthesizing enzyme?",
     "ACC Oxidase (which requires oxygen to convert ACC into ethylene)",
     ["Cellulase", "Amylase", "Invertase"],
     "ACC oxidase strictly requires molecular oxygen as a co-substrate; low O2 (<2%) completely halts ethylene synthesis and subsequent pectin breakdown."),
    case_q("Post-Harvest Handling and Storage Technology", "Difference between CAS and Normal Cold Storage",
     "How does Controlled Atmosphere Storage (CAS) differ fundamentally from conventional refrigerated cold storage?",
     "CAS actively monitors, modifies, and controls the atmospheric gas composition (O2 and CO2) in sealed rooms alongside temperature and humidity",
     ["CAS does not use refrigeration at all", "CAS requires storing apples underwater", "CAS leaves windows open continuously"],
     "Conventional cold storage controls only temperature and humidity in ambient air; CAS actively alters and maintains gas concentrations in gas-tight rooms."),
    case_q("Post-Harvest Handling and Storage Technology", "Ethylene Scavenger Chemical Substance",
     "Which chemical compound is packed in porous filtration beds in CAS air circulation scrubbers to oxidize volatile ethylene gas?",
     "Potassium Permanganate (KMnO4)",
     ["Sodium chloride", "Calcium carbonate", "Urea crystals"],
     "Potassium permanganate acts as a potent oxidizing agent, converting ethylene gas into non-volatile ethylene glycol and CO2."),
    case_q("Post-Harvest Handling and Storage Technology", "Storage Life Extension Achieved by CAS",
     "Commercial CAS technology extends the marketable storage life of premium Delicious apples from 3–4 months in conventional cold storage up to:",
     "8 to 12 months (allowing year-round supply)",
     ["Exactly 2 days", "50 years", "No extension at all"],
     "By arresting respiration and ethylene responsiveness, CAS keeps apples crisp, firm, and market-ready for 8 to 12 months.")
]

P2_M16_TXT = (
    "Read the following excerpt on Small Ruminant Production: Prolificacy of Black Bengal Goats vs Dairy Jamunapari, "
    "and answer the questions that follow:\n\n"
    "Goat farming ('Poor Man's Cow') represents a critical livelihood buffer for millions of landless and marginal farmers across rural India. "
    "The caprine genetic wealth of India features two celebrated breed extremes adapted to divergent ecological niches and production goals: "
    "the 'Black Bengal' and the 'Jamunapari'. The Black Bengal goat, native to West Bengal, Bihar, Jharkhand, and Bangladesh, is globally "
    "celebrated for unmatched prolificacy and carcass quality. It is a dwarf, compact meat breed (adult weight 18 to 22 kg in females, 25 to 30 kg "
    "in males) with short erect ears and predominantly jet-black coat. Black Bengal does mature precociously (age at first kidding 9 to 11 months), "
    "breed year-round, and exhibit phenomenal prolificacy: twinning occurs in >55% to 60% of kiddings, with triplets and quadruplets frequently "
    "recorded (kidding percentage exceeding 200%). Furthermore, Black Bengal yields world-renowned, tender, finely textured meat (chevon) "
    "with low fat content, and its skin produces the finest, most supple, high-value goat leather in international tanning markets ('Kidd leather'). "
    "Conversely, milk yield is negligible (barely 0.4 to 0.7 kg/day), sufficient only for nursing kids. At the opposite anatomical extreme is "
    "the 'Jamunapari'—the largest and premier dairy goat breed of India, indigenous to the ravines of the Yamuna and Chambal rivers in Etawah, "
    "Uttar Pradesh. Jamunapari goats are tall, majestic, long-legged animals (adult bucks weighing 65–85 kg, does 45–60 kg) featuring an iconic "
    "convex 'Roman nose' with a prominent tuft of hair, and extraordinarily long, flat, pendulous folded ears (up to 25–30 cm length). "
    "Jamunapari does are prolific milkers, producing 2.0 to 3.5 kg of rich milk per day (lactation yield 250–350 kg) with approx. 4.0% to 5.0% fat, "
    "but exhibit lower prolificacy, commonly delivering single kids."
)
P2_M16_QS = [
    case_q("Breeds of Livestock and Poultry", "Black Bengal Prolificacy Distinction",
     "What unique reproductive distinction makes the Black Bengal goat globally famous among small ruminant breeds?",
     "Exceptional prolificacy with high frequency of twin, triplet, and quadruplet births (kidding rate > 200%)",
     ["Laying large chicken eggs", "Producing 10 liters of milk per day", "Gestation period of only 10 days"],
     "Black Bengal is renowned for multi-ovular prolificacy, frequently kidding twins and triplets with short kidding intervals (twice a year)."),
    case_q("Breeds of Livestock and Poultry", "Leather Industry Value of Black Bengal",
     "The skin of the Black Bengal goat commands an elite premium in the global leather industry because:",
     "It produces ultra-fine, supple, tight-grained, superior quality leather ('Kidd leather') prized for shoes and luxury gloves",
     ["It is 5 cm thick like elephant hide", "It glows in the dark", "It is made of pure silk fibers"],
     "Black Bengal skin has dense, fine collagen architecture yielding exceptionally supple, durable, high-grade leather in international markets."),
    case_q("Breeds of Livestock and Poultry", "Jamunapari Iconic Morphological Features",
     "What two striking morphological traits distinguish the Jamunapari goat from all other Indian breeds?",
     "Convex 'Roman nose' and extraordinarily long, flat, pendulous drooping ears (25 to 30 cm)",
     ["Absence of legs and horns", "Dense white wool fleece like sheep", "Massive thoracic hump like cattle"],
     "Jamunapari is characterized by a prominent convex facial curvature ('Roman nose') and long, flat, pendulous folded ears."),
    case_q("Breeds of Livestock and Poultry", "Primary Utility Comparison",
     "How do the primary economic utilities of Black Bengal and Jamunapari goats compare?",
     "Black Bengal is a dwarf prolific meat (chevon) and skin breed, whereas Jamunapari is a large dairy and dual-purpose breed",
     ["Black Bengal is a fine merino wool breed, Jamunapari is a racing breed", "Both are exclusively kept as circus pets", "Both are wild non-domesticated goats"],
     "Black Bengal is an elite prolific meat/skin dwarf breed; Jamunapari is India's premier high-yielding dairy goat (yielding 2–3 kg milk/day)."),
    case_q("Breeds of Livestock and Poultry", "Home Tract of Jamunapari",
     "The native breeding tract and home of the majestic Jamunapari goat breed is situated in:",
     "Etawah district and adjoining ravines of the Yamuna and Chambal rivers in Uttar Pradesh",
     ["Kashmir valley in J&K", "Thar desert of Jaisalmer, Rajasthan", "Sundarbans delta of West Bengal"],
     "Jamunapari is native to the ravines of the Yamuna and Chambal rivers in the Etawah district of south-western Uttar Pradesh.")
]

# ==============================================================================
# MOCK 17 PASSAGES
# ==============================================================================
P1_M17_TXT = (
    "Read the following case study on Rapeseed-Mustard Agronomy, Glucosinolate Quality, and Aphid Management, "
    "and answer the questions that follow:\n\n"
    "Rapeseed-Mustard (family Brassicaceae) is India's premier edible winter rabi oilseed crop, accounting for nearly one-third of total "
    "domestic edible oil production. The cultivated brassica complex in India comprises Indian Mustard (Brassica juncea, an amphidiploid "
    "with 2n = 36, genomes AABB, representing >85% of total acreage) and diploid oilseeds (Brassica rapa / campestris: Yellow Sarson, Brown Sarson, "
    "and Toria, with 2n = 20, genomes AA). The seed contains 38% to 42% edible oil. Mustard seeds and oil possess a characteristic sharp, "
    "pungent, biting aroma and flavor prized in Indian gastronomy. This pungency is caused by sulfur-containing secondary metabolites known "
    "as 'Glucosinolates' (predominantly Sinigrin). When seeds are crushed in the presence of water, the endogenous enzyme 'Myrosinase' "
    "(thioglucoside glucohydrolase) hydrolyzes sinigrin into volatile Allyl Isothiocyanate. Consequently, brassica crops have an extraordinarily "
    "high metabolic demand for Sulfur (S): applying 20 to 40 kg S/ha (via Single Super Phosphate or agricultural gypsum) is essential to synthesize "
    "cysteine, methionine, and optimize oil yield. However, conventional mustard oils contain high concentrations (40% to 50%) of 'Erucic Acid' "
    "(a long-chain 22-carbon monounsaturated fatty acid, C22:1), while the defatted seed meal contains high glucosinolates (>100 micromoles/g). "
    "High dietary erucic acid has been linked to myocardial lipidosis in laboratory animal studies, while glucosinolates impair thyroid iodine uptake "
    "in livestock fed on mustard cake. Plant breeders have engineered 'Canola-grade' (Double Zero / '00') mustard varieties (such as Pusa Mustard 30, "
    "Pusa Double Zero 31) possessing <2% erucic acid in oil and <30 micromoles glucosinolates in meal. In the field, the most devastating pest of "
    "mustard is the Mustard Aphid (Lipaphis erysimi): during cool, cloudy, humid weather in January-February, aphids multiply parthenogenetically, "
    "devouring phloem sap from inflorescences and tender pods, causing curled leaves, blasted flowers, and up to 70% yield loss."
)
P1_M17_QS = [
    case_q("Agronomy of Millets, Pulses and Oilseeds", "Amphidiploid Genetic Status of Indian Mustard",
           "According to U's Triangle, Indian Mustard (Brassica juncea) is genetically classified as an:",
           "Allotetraploid / Amphidiploid (2n = 36, genomes AABB) derived from B. rapa x B. nigra",
           ["Autotetraploid with 4 identical genomes", "Diploid with 2n = 10", "Hexaploid with genomes AABBDD"],
           "Nagaharu U proved that B. juncea (2n=36, AABB) evolved by natural interspecific hybridization of B. rapa (2n=20, AA) and B. nigra (2n=16, BB)."),
    case_q("Agronomy of Millets, Pulses and Oilseeds", "Chemical Origin of Mustard Pungency",
     "The characteristic pungent, biting aroma of crushed mustard seed oil is generated by the enzymatic hydrolysis of:",
     "Glucosinolates (Sinigrin) by the enzyme Myrosinase into volatile Allyl Isothiocyanate",
     ["Erucic acid by lipase", "Starch by amylase", "Capsaicin by oxidase"],
     "When cellular compartments rupture, myrosinase cleaves the glucosinolate sinigrin, releasing pungent, volatile allyl isothiocyanate."),
    case_q("Agronomy of Millets, Pulses and Oilseeds", "Double Zero (Canola) Mustard Breeding Standards",
     "In modern brassica quality breeding, a 'Double Zero' (00 / Canola-type) mustard variety must conform to which statutory standards?",
     "Less than 2% Erucic Acid in oil and less than 30 micromoles Glucosinolates per gram of defatted meal",
     ["Zero percent oil and zero percent protein", "50% erucic acid and 50% glucosinolates", "100% pure saturated animal fat"],
     "Double zero quality requires <2% erucic acid in the edible oil (cardiovascular safety) and <30 micromoles glucosinolates in meal (non-toxic livestock feed)."),
    case_q("Agronomy of Millets, Pulses and Oilseeds", "Essential Secondary Nutrient for Oil Synthesis",
     "Why do rapeseed-mustard crops have an extraordinarily high requirement for Sulfur (S) fertilization?",
     "Sulfur is an indispensable structural constituent of sulfur-containing amino acids (methionine, cysteine) and glucosinolates",
     ["Sulfur turns the yellow flowers purple", "Sulfur acts as an insecticide that kills earthworms", "Sulfur turns seeds into liquid oil directly"],
     "Sulfur is a core constituent of amino acids required for protein synthesis and acetyl-CoA enzymes driving triglyceride oil synthesis."),
    case_q("Agronomy of Millets, Pulses and Oilseeds", "Devastating Sap-Sucking Insect Pest",
     "Which insect pest causes catastrophic yield losses in winter rapeseed-mustard by devouring sap from terminal floral shoots?",
     "Mustard Aphid (Lipaphis erysimi)",
     ["Desert locust", "Stem borer", "White grub"],
     "Lipaphis erysimi multiplies explosively in cloudy, humid winter weather, choking inflorescences and excreting honeydew that fosters sooty mold.")
]

P2_M17_TXT = (
    "Read the following excerpt on Commercial Broiler Poultry Production, Deep Litter Management, and Feed Conversion Ratio (FCR), "
    "and answer the questions that follow:\n\n"
    "The Indian poultry meat sector has evolved into a highly industrialized, vertically integrated livestock agribusiness. Modern commercial "
    "'Broiler' chickens are synthetic four-way hybrid crosses (such as Cobb 500, Ross 308, and Hubbard) bred exclusively for lightning-fast "
    "growth and high breast meat yield. Under intensive farm management, day-old broiler chicks (weighing approx. 40–42 grams) attain a target "
    "market live body weight of 2.0 to 2.4 kg in just 35 to 42 days (5 to 6 weeks). The gold standard metric of operational efficiency in broiler "
    "production is the 'Feed Conversion Ratio' (FCR)—calculated as total kilograms of feed consumed divided by total kilograms of live body "
    "weight gained. Elite commercial broiler operations achieve phenomenal FCR values of 1.45 to 1.60 (meaning a bird consumes only 1.5 kg of "
    "feed to produce 1.0 kg of live meat). Broilers are reared predominantly under the 'Deep Litter Housing System': birds roam freely over an "
    "absorbent litter bedding (5 to 8 cm deep) made of clean, dry paddy husk, wood sawdust, or chopped wheat straw. The litter serves to dilute "
    "droppings, absorb fecal moisture, provide thermal insulation against cold concrete floors, and afford natural dust-bathing comfort. "
    "However, litter moisture must be strictly regulated between 20% and 25%: wet, caked litter (>30% moisture) triggers microbial fermentation "
    "generating toxic atmospheric ammonia gas (>25 ppm causes keratoconjunctivitis and respiratory damage) and fosters devastating outbreaks "
    "of Coccidiosis (Eimeria tenella). Biosecurity and vaccination are vital: day-old chicks are vaccinated against Marek's disease at the hatchery, "
    "followed by mild live Ranikhet Disease (F1 / Lasota strain) vaccine administered at 5 to 7 days of age via intraocular eye drops."
)
P2_M17_QS = [
    case_q("Breeds of Livestock and Poultry", "Feed Conversion Ratio (FCR) Meaning",
     "In commercial broiler poultry production, an FCR of 1.5 indicates that:",
     "The broiler consumes 1.5 kg of feed to produce 1.0 kg of live body weight gain",
     ["The bird produces 1.5 kg of eggs per day", "The bird consumes 1.5 liters of milk", "The farmer earns 1.5 rupees per bird"],
     "Feed Conversion Ratio is total feed intake divided by live weight gain; a lower number signifies superior feed conversion efficiency."),
    case_q("Breeds of Livestock and Poultry", "Broiler Market Finishing Age",
     "Modern commercial broiler chickens reach their market weight of 2.0 to 2.4 kg at what age under intensive management?",
     "35 to 42 days (5 to 6 weeks)",
     ["6 months to 1 year", "15 days", "100 to 120 days"],
     "Rapid genetic progress and precision amino-acid balanced nutrition allow modern broilers to reach 2+ kg market weight in just 5–6 weeks."),
    case_q("Breeds of Livestock and Poultry", "Deep Litter Floor Bedding Material",
     "Which of the following materials is most commonly utilized as absorbent bedding litter on broiler farm floors?",
     "Dry paddy husk, wood sawdust, or chopped wheat straw",
     ["Wet sticky clay mud", "Crushed glass bottles", "Uncured fresh cattle dung"],
     "Paddy husk, wood shavings, and peanut hulls serve as litter to absorb moisture, insulate against cold floors, and cushion breasts."),
    case_q("Breeds of Livestock and Poultry", "Consequence of Wet, Caked Litter",
     "Allowing poultry deep litter moisture to exceed 30% causes which serious flock health hazards?",
     "Excessive toxic ammonia gas emission and explosive outbreaks of parasitic Coccidiosis (Eimeria)",
     ["Instant freezing of chicken feathers", "Chicks turn into wild peacocks", "Chickens stop drinking water"],
     "Wet litter fosters bacterial breakdown of uric acid into corrosive ammonia gas, and provides the moisture necessary for Eimeria oocyst sporulation."),
    case_q("Breeds of Livestock and Poultry", "Primary Ranikhet Vaccination Protocol",
     "At what age and by which route is the primary mild Ranikhet (Newcastle) Disease F1 / Lasota vaccine administered to commercial broiler chicks?",
     "5 to 7 days of age via intraocular (eye) or intranasal drops",
     ["At 6 months of age via intramuscular injection", "In feed during the final market week", "Sprayed on the egg shell before hatching"],
     "Administering the lentogenic F1/Lasota vaccine via eye drops at 5–7 days primes the chick's mucosal immune system against virulent paramyxovirus.")
]

# ==============================================================================
# MOCK 18 PASSAGES
# ==============================================================================
P1_M18_TXT = (
    "Read the following case study on Certified Organic Farming Standards, PGS-India, and APEDA NPOP Accreditation, "
    "and answer the questions that follow:\n\n"
    "Certified organic agriculture in India has expanded beyond traditional niche farming into a dynamic global export sector. "
    "Organic farming is defined as a holistic production management system that promotes and enhances agro-ecosystem health, biodiversity, "
    "biological cycles, and soil biological activity. Under statutory organic standards, the use of synthetic chemical fertilizers, chemical "
    "pesticides, synthetic growth regulators, and Genetically Modified Organisms (GMOs) is strictly prohibited. In India, certified organic "
    "production is governed under two distinct, complementary institutional frameworks: (1) The National Programme for Organic Production (NPOP), "
    "launched in 2001 by the Ministry of Commerce and Industry and implemented by the Agricultural and Processed Food Products Export Development "
    "Authority (APEDA). NPOP mandates rigorous Third-Party Certification by accredited commercial certification agencies, featuring full audit "
    "trails, chemical residue testing, and a mandatory 2-to-3-year 'Conversion / Transition Period' during which fields are managed organically "
    "before produce can be marketed as 'Certified Organic'. NPOP certification is mandatory for all international export consignments. "
    "(2) The Participatory Guarantee System for India (PGS-India), implemented by the Ministry of Agriculture and Farmers Welfare. PGS is a "
    "locally focused, peer-review quality assurance certification tailored for small and marginal domestic farmers. Under PGS, localized groups "
    "of 5 or more peer farmers inspect, audit, and guarantee each other's organic integrity, eliminating exorbitant third-party auditing fees "
    "while fostering community trust and local marketing. Fertility management relies on on-farm bio-inputs: FYM, vermicompost, Jeevamrit, "
    "Panchagavya, and green manuring with Sesbania, while pest control utilizes neem seed kernel extract (NSKE 5%), pheromone traps, and Trichoderma."
)
P1_M18_QS = [
    case_q("Cropping Systems and Sustainable Organic Agriculture", "Nodal Agency for NPOP Organic Export",
           "Which statutory organization acts as the nodal implementation agency for the National Programme for Organic Production (NPOP) in India?",
           "APEDA (Ministry of Commerce and Industry)",
           ["ICAR (Indian Council of Agricultural Research)", "FSSAI exclusively", "Reserve Bank of India"],
           "APEDA functions as the Secretariat for the implementation of NPOP, accrediting organic inspection and certification bodies for export."),
    case_q("Cropping Systems and Sustainable Organic Agriculture", "Core Philosophy of Participatory Guarantee System (PGS)",
     "How does the Participatory Guarantee System (PGS-India) differ fundamentally from conventional Third-Party organic certification?",
     "PGS is a peer-review certification conducted mutually by local farmer groups based on active trust and minimal paperwork, eliminating high auditing fees",
     ["PGS permits unlimited use of synthetic chemical pesticides", "PGS is conducted exclusively by foreign satellite cameras", "PGS certifies only industrial chemical factories"],
     "PGS is an affordable, community-based participatory certification where neighboring farmers inspect and vouch for each other's organic practices."),
    case_q("Cropping Systems and Sustainable Organic Agriculture", "Mandatory Conversion Period Duration",
     "Under standard organic certification rules, what is the mandatory transition / conversion period required before conventional farmland achieves certified organic status?",
     "2 to 3 years of documented chemical-free management",
     ["24 hours", "50 years", "Zero days (instantaneous certification)"],
     "A 2-to-3-year conversion period is legally required to allow synthetic pesticide and chemical fertilizer residues in soil to degrade below detection limits."),
    case_q("Cropping Systems and Sustainable Organic Agriculture", "Strictly Prohibited Technologies in Organic Farming",
     "Which of the following technologies is strictly and universally banned under certified organic production standards?",
     "Genetically Modified Organisms (GMOs) and synthetic chemical pesticides/fertilizers",
     ["Compost and farmyard manure", "Earthworms and vermiculture", "Legume green manuring with Sesbania"],
     "Organic standards explicitly prohibit synthetic chemical inputs and Genetically Engineered / Genetically Modified Organisms (transgenics)."),
    case_q("Cropping Systems and Sustainable Organic Agriculture", "Jeevamrit Fermentation Components",
     "In Indian natural organic farming, the liquid microbial bio-stimulant 'Jeevamrit' is prepared by fermenting desi cow dung and urine with:",
     "Jaggery (gur), pulse flour (besan), and a handful of virgin rhizosphere soil",
     ["Synthetic urea and muriate of potash", "Sulfuric acid and bleaching powder", "Kerosene and formaldehyde"],
     "Jeevamrit uses jaggery and pulse flour as carbon and nitrogen substrates to culture billions of beneficial native microorganisms from undisturbed virgin soil.")
]

P2_M18_TXT = (
    "Read the following excerpt on Commercial Production of Butter and Desi Ghee: Phase Inversion and Baudouin Adulteration Test, "
    "and answer the questions that follow:\n\n"
    "Milk fat (butterfat) represents the most economically prized constituent of bovine milk. The industrial manufacturing of table butter "
    "and clarified butterfat (Desi Ghee) involves fundamental physicochemical phase inversions. Whole milk is an oil-in-water (O/W) emulsion "
    "where microscopic fat globules (0.1 to 10 microns) are dispersed in an aqueous serum phase, stabilized by the Milk Fat Globule Membrane (MFGM). "
    "In butter making, standardized cream (35% to 40% fat) is pasteurized, aged at 8°C–10°C to crystallize fat, and subjected to vigorous mechanical "
    "agitation inside a butter churn. Mechanical shear ruptures the protective MFGM, causing exposed liquid fat to cement colliding fat globules "
    "together into macro-granules. Continued churning triggers sudden 'Phase Inversion'—transforming the oil-in-water cream emulsion into a "
    "water-in-oil (W/O) plastic emulsion (table butter, comprising min. 80% fat, max. 16% water, and 2% curd/salt), with liquid buttermilk (whey) "
    "separating out. To manufacture Ghee, butter or cream is subjected to direct thermal clarification in a jacketed stainless steel pan at "
    "110°C to 120°C. Boiling completely flashes off moisture; curd proteins coagulate and settle as brown residue, leaving pure, amber-gold, "
    "clarified butterfat containing <0.5% moisture and >99.5% milk fat. Due to ghee's high market value, unscrupulous vendors frequently adulterate "
    "ghee with cheap hydrogenated vegetable oil (Vanaspati). Under the statutory provisions of the Prevention of Food Adulteration and FSSAI rules, "
    "all commercial Vanaspati must mandatorily contain 5% Sesame Oil. This statutory marker enables rapid, definitive detection via the 'Baudouin Test': "
    "mixing adulterated ghee with concentrated hydrochloric acid and a 2% alcoholic furfural solution produces an unmistakable, intense "
    "crimson-red color within minutes, caused by the reaction of furfural with the natural phenol 'Sesamol' present in sesame oil."
)
P2_M18_QS = [
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Emulsion Phase Inversion in Butter Making",
     "What physical phase change occurs during the churning of cream in commercial butter making?",
     "Phase Inversion from an Oil-in-Water (O/W) emulsion to a Water-in-Oil (W/O) emulsion",
     ["Phase change from solid ice to boiling steam", "Conversion of milk proteins into alcohol", "Dissolution of all milk fat into gas"],
     "Churning ruptures fat globule membranes, transforming the oil-in-water cream into a continuous fat matrix enclosing water droplets (water-in-oil)."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "FSSAI Moisture Standard for Pure Desi Ghee",
     "Under statutory FSSAI regulations, what is the maximum permissible moisture content in pure Desi Ghee?",
     "Not more than 0.5% moisture (minimum 99.5% milk fat)",
     ["Not more than 16.0% moisture", "Not more than 50.0% moisture", "Exactly 5.0% moisture"],
     "Ghee is virtually pure dehydrated milk fat; FSSAI mandates a maximum of 0.5% moisture, granting it prolonged room-temperature shelf stability."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Baudouin Test for Vanaspati Adulteration",
     "The 'Baudouin Test' detects illegal adulteration of pure ghee with hydrogenated vegetable oil (Vanaspati) by detecting mandatory presence of:",
     "Sesame Oil marker (5% statutory addition in Vanaspati)",
     ["Mustard oil", "Castor oil", "Coconut oil"],
     "Indian law mandates 5% sesame oil in all manufactured Vanaspati; sesame oil contains sesamol which yields a crimson red color in the Baudouin test."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Chemical Reagents in Baudouin Test",
     "What chemical reagents are added to suspected ghee in the Baudouin Test to generate the characteristic crimson-red color?",
     "Concentrated Hydrochloric Acid (HCl) and a 2% Furfural solution",
     ["Sulfuric acid and iodine", "Sodium hydroxide and phenolphthalein", "Copper sulfate and lime"],
     "Furfural reacts specifically with sesamol in the presence of concentrated HCl to produce a distinct, stable crimson-red condensation complex."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Moisture Standard for Table Butter",
     "As per legal standards in India, commercial table butter must not exceed what maximum moisture limit?",
     "Not more than 16.0% moisture (and minimum 80% fat)",
     ["Not more than 0.5% moisture", "Not more than 35% moisture", "Zero moisture"],
     "Commercial table butter consists of minimum 80% butterfat, maximum 16% moisture, and up to 3% curd and salt.")
]

# ==============================================================================
# MOCK 19 PASSAGES
# ==============================================================================
P1_M19_TXT = (
    "Read the following case study on Package of Practices for Export-Quality Basmati Rice and Aroma Chemistry, "
    "and answer the questions that follow:\n\n"
    "Basmati rice is India's flagship agricultural export commodity, earning over 4.5 to 5.0 billion US dollars annually in foreign exchange. "
    "Grown in the geographically demarcated GI (Geographical Indication) footprint of the Indo-Gangetic plains (Punjab, Haryana, western UP, "
    "Jammu, Uttarakhand), Basmati is revered for its extraordinary grain elongation upon cooking, tender fluffy texture, and exquisite aroma. "
    "A crowning scientific breakthrough in Basmati breeding was the development of 'Pusa Basmati 1121' by Dr. A. K. Singh and colleagues at "
    "ICAR-IARI, New Delhi. Pusa Basmati 1121 set a Guinness World Record for kernel elongation: raw polished grains measuring 8.4 mm elongate "
    "up to an astonishing 21.5 mm upon cooking (an elongation ratio >2.5) without bursting or curving. The characteristic popcorn-like Basmati "
    "fragrance is chemically governed by the volatile compound '2-Acetyl-1-Pyrroline' (2-AP). The synthesis of 2-AP is controlled by a recessive "
    "mutation in the BADH2 (betaine aldehyde dehydrogenase) gene on chromosome 8; in wild rice, functional BADH2 converts gamma-aminobutyraldehyde "
    "into GABA, but in fragrant Basmati, the mutated non-functional enzyme forces the substrate to accumulate and cyclize into highly aromatic 2-AP. "
    "However, expressing premium Basmati grain quality requires meticulous agronomic management: (1) Sowing nursery in early June and transplanting "
    "25-day-old single seedlings in early July ensures that grain filling and ripening coincide with the cool, sunny weather of October (mean temp 22°C–25°C); "
    "hot weather (>30°C) during grain ripening volatilizes 2-AP, completely destroying aroma; (2) Excessive nitrogen fertilizer (>80–100 kg N/ha) "
    "must be strictly avoided because heavy nitrogen causes severe lodging and elevates grain protein (>8.5%), which impairs linear elongation "
    "and increases grain breakage during milling; and (3) Harvesting must be conducted when grains in the lower panicle turn golden-yellow at "
    "20% to 22% moisture to prevent sun-checking and cracked kernels."
)
P1_M19_QS = [
    case_q("Agronomy of Major Cereal Crops", "Key Chemical Compound of Basmati Aroma",
           "The characteristic exquisite popcorn-like aroma of premium Basmati rice is primarily due to the volatile chemical compound:",
           "2-Acetyl-1-Pyrroline (2-AP)",
           ["Capsaicin", "Allyl isothiocyanate", "Allicin"],
           "2-Acetyl-1-pyrroline (2-AP) is the principal volatile compound responsible for the characteristic aroma of Basmati and Jasmine rices."),
    case_q("Agronomy of Major Cereal Crops", "Genetic Basis of Basmati Fragrance",
     "The genetic synthesis of 2-Acetyl-1-Pyrroline in Basmati rice is caused by a recessive mutation in which gene?",
     "BADH2 gene (Betaine Aldehyde Dehydrogenase 2)",
     ["Rht1 dwarfing gene", "Cry1Ac gene", "NodD gene"],
     "A 8-base-pair deletion in the BADH2 gene creates a non-functional enzyme, accumulating aminoaldehydes that cyclize into fragrant 2-AP."),
    case_q("Agronomy of Major Cereal Crops", "World Record Kernel Elongation Variety",
     "Which landmark semi-dwarf Basmati rice variety bred at ICAR-IARI is globally famous for phenomenal cooked grain elongation exceeding 20 mm?",
     "Pusa Basmati 1121",
     ["IR8", "Taichung Native 1", "Sonora 64"],
     "Pusa Basmati 1121 possesses an exceptionally long raw slender grain (8.4 mm) that elongates over 2.5-fold (to 20–22 mm) upon cooking."),
    case_q("Agronomy of Major Cereal Crops", "Temperature Impact on Aroma Retention",
     "Why must transplanting of Basmati rice be timed so that grain filling coincides with cool autumn weather (20°C–25°C)?",
     "High temperatures (>30°C) during the ripening phase cause rapid volatilization and loss of the volatile aroma compound 2-AP",
     ["Cold weather turns the grain into red color", "Rice plants refuse to form seeds below 35°C", "Hot weather causes grains to double in size"],
     "2-Acetyl-1-pyrroline is highly volatile; high temperatures during late grain filling dissipate aroma into the atmosphere, rendering rice scentless."),
    case_q("Agronomy of Major Cereal Crops", "Harmful Effect of Excess Nitrogen in Basmati",
     "Why do agronomists strictly advise against applying heavy chemical nitrogen fertilizer doses to export-grade Basmati crops?",
     "Excessive nitrogen induces lodging and raises grain protein content, which hinders linear elongation and increases milling grain breakage",
     ["Excess nitrogen turns rice plants into weeds", "Nitrogen stops roots from absorbing water", "Nitrogen makes grains completely black"],
     "High nitrogen increases prolamine protein reserves, cementing starch granules and preventing longitudinal elongation, resulting in burst, sticky grains.")
]

P2_M19_TXT = (
    "Read the following excerpt on Ruminant Nitrogen Metabolism, Urea Feeding Safety, and Natural Anti-Nutritional Factors in Forages, "
    "and answer the questions that follow:\n\n"
    "Ruminants possess the unique symbiotic capability to utilize Non-Protein Nitrogen (NPN) compounds—such as agricultural Urea "
    "[CO(NH2)2, containing 46% Nitrogen, equivalent to 287.5% Crude Protein]—to synthesize high-quality microbial protein. Inside the rumen, "
    "bacterial Urease rapidly hydrolyzes urea into Ammonia (NH3) and Carbon Dioxide. Rumen cellulolytic and amylolytic bacteria utilize this "
    "ammonia alongside carbon skeletons (alpha-keto acids) derived from fermentable carbohydrates (starch, molasses) to synthesize microbial "
    "amino acids. However, urea feeding requires strict safety boundaries: dietary urea must never exceed 1.0% of the total ration Dry Matter "
    "(or 3.0% of the concentrate mixture), and must NEVER be fed to young unweaned calves lacking a functional rumen. If urea is fed in excess "
    "or without adequate fermentable energy (starch/molasses), ruminal urease releases ammonia faster than microbes can assimilate it. Excess free "
    "ammonia is absorbed across the ruminal wall into the blood, overwhelming the liver's urea cycle, causing acute systemic 'Ammonia Toxicity' "
    "(hyperammonemia, muscle tremors, severe bloat, respiratory collapse, and death within 1 to 2 hours). To provide safe, sustained NPN release, "
    "Urea Molasses Mineral Blocks (UMMB) are formulated for cattle grazing low-protein dry straws. Beyond NPN hazards, ruminant nutritionists "
    "must manage potent natural anti-nutritional factors in forage crops: (1) Immature, drought-stunted Sorghum (Jowar) contains dangerous levels "
    "of the cyanogenic glucoside 'Dhurrin', which hydrolyzes in the rumen into lethal Hydrocyanic Acid (HCN / Prussic Acid, causing cellular "
    "asphyxiation by inhibiting cytochrome c oxidase); sorghum must never be grazed before 50% flowering or when under 50 cm height; (2) Raw "
    "cottonseed cake contains toxic polyphenolic 'Gossypol', which impairs spermatogenesis and causes cardiac necrosis in non-ruminants; and "
    "(3) Young brassica and clover forages rich in soluble proteins induce frothy 'Bloat' (Tympanites)."
)
P2_M19_QS = [
    case_q("Animal Nutrition and Feed Technology", "Crude Protein Equivalent of Urea",
     "Because fertilizer-grade urea contains 46% Nitrogen, its theoretical Crude Protein (CP) equivalent value in ruminant nutrition is approximately:",
     "287.5% Crude Protein (46 * 6.25)",
     ["46% Crude Protein", "16% Crude Protein", "100% Crude Protein"],
     "Crude Protein is calculated as % Nitrogen x 6.25; therefore, 46% N x 6.25 = 287.5% crude protein equivalent."),
    case_q("Animal Nutrition and Feed Technology", "Maximum Safe Dietary Urea Limit",
     "What is the maximum safe recommended inclusion rate of urea in adult ruminant diets to prevent fatal ammonia poisoning?",
     "Not more than 1% of total dry matter intake (or 3% of the concentrate mixture)",
     ["10% of total ration", "50% of the daily feed", "Urea can replace all green fodder entirely"],
     "Urea must never exceed 1% of total diet dry matter or 3% of concentrate, and must be accompanied by readily fermentable starch/molasses."),
    case_q("Animal Nutrition and Feed Technology", "Cyanogenic Toxicity in Immature Sorghum",
     "Immature or drought-stunted green Sorghum (Jowar) under 50 cm height poses lethal poisoning hazard to grazing cattle due to high levels of:",
     "Dhurrin, which hydrolyzes into toxic Hydrocyanic Acid (HCN / Prussic Acid)",
     ["Gossypol", "Aflatoxin", "Solanine"],
     "Dhurrin in young sorghum foliage is cleaved by ruminal enzymes into lethal HCN, which halts mitochondrial cellular respiration."),
    case_q("Animal Nutrition and Feed Technology", "Toxic Polyphenol in Raw Cottonseed",
     "Which toxic polyphenolic compound present in raw cottonseed and undecorticated cottonseed cake impairs male fertility and heart function in livestock?",
     "Gossypol",
     ["Dhurrin", "Sinigrin", "Mimosine"],
     "Gossypol is a yellow polyphenolic pigment in cotton pigment glands that binds iron, causing anemia, cardiomyopathy, and spermatogenic arrest."),
    case_q("Animal Nutrition and Feed Technology", "Urea Molasses Mineral Block (UMMB) Role",
     "What is the primary technological advantage of providing Urea Molasses Mineral Blocks (UMMB) to cattle fed on wheat or paddy straw?",
     "It provides a slow, safe, continuous licking release of nitrogen, energy, and minerals that stimulates ruminal cellulolytic digestion of dry straws",
     ["It replaces drinking water completely", "It cures broken bones in calves", "It permanently stops cows from producing dung"],
     "Slow licking of UMMB provides synchrony of nitrogen (urea) and energy (molasses), maximizing microbial colonization and digestion of poor straws.")
]

# ==============================================================================
# MOCK 20 PASSAGES
# ==============================================================================
P1_M20_TXT = (
    "Read the following case study on Spices Processing: Post-Harvest Curing of Turmeric and Black Pepper Extraction, "
    "and answer the questions that follow:\n\n"
    "India is the world's largest producer, consumer, and exporter of spices, earning the title 'Spice Bowl of the World'. "
    "Among commercial plantation and seed spices, Turmeric (Curcuma longa, family Zingiberaceae) and Black Pepper (Piper nigrum, "
    "family Piperaceae) are iconic. Turmeric rhizomes harvested from the field cannot be dried directly because fresh fingers are rock-hard, "
    "contain raw earthy off-flavors, and dry unevenly. Therefore, freshly dug rhizomes must undergo commercial 'Curing'. Curing involves "
    "cooking cleaned rhizome fingers in boiling water (traditionally with 0.1% sodium bicarbonate or lime) in perforated steel drums for "
    "45 to 60 minutes until white froth appears on the surface and fingers become soft to the press of a finger. Scientifically, boiling "
    "gelatinizes the rhizome's dense starch granules, denatures native sprouting enzymes, drives out offensive raw aroma volatiles, and "
    "diffuses the yellow polyphenolic pigment 'Curcumin' (2% to 6% dry basis) uniformly from oil cells throughout the internal parenchymatous "
    "core. The cooked fingers are sun-dried on clean concrete yards for 10 to 15 days until moisture drops to 8%–10%. Dried fingers are polished "
    "in mechanical rotary drums with turmeric powder suspension to remove rough root scales, giving a dazzling golden-yellow sheen. "
    "In Black Pepper ('King of Spices'), the berries are harvested when 1 or 2 berries in a spike turn vivid orange-red. To manufacture standard "
    "black pepper, spikes are threshed, and green berries are blanched in boiling water for 1 minute (which activates polyphenol oxidase enzymes, "
    "accelerating uniform black enzymatic browning and drying) and sun-dried until the moisture reaches 10%. The characteristic pungent, "
    "sharp flavor of black pepper is caused by the crystalline alkaloid 'Piperine' (4% to 9%), while its exotic fragrance is governed by "
    "monoterpene essential oils (beta-caryophyllene, pinene, limonene)."
)
P1_M20_QS = [
    case_q("Medicinal, Aromatic and Spice Crops", "Biochemical Objectives of Turmeric Curing",
           "What primary biochemical transformations occur during the boiling stage of turmeric rhizome curing?",
           "Gelatinization of rhizome starch, destruction of sprouting enzymes, and uniform distribution of yellow curcumin pigment",
           ["Conversion of rhizomes into pure liquid oil", "Complete destruction of all curcumin molecules", "Bleaching yellow color into white"],
           "Boiling gelatinizes starch, halts enzymatic vitality, and diffuses curcumin uniformly through cells, ensuring uniform deep yellow dry fingers."),
    case_q("Medicinal, Aromatic and Spice Crops", "Active Therapeutic Principle in Turmeric",
     "The prized yellow crystalline polyphenolic compound in turmeric responsible for its anti-inflammatory and antioxidant properties is:",
     "Curcumin (diferuloylmethane)",
     ["Piperine", "Capsaicin", "Gingerol"],
     "Curcumin constitutes 2-6% of cured turmeric rhizomes, functioning as a potent antioxidant, antimicrobial, and anti-inflammatory agent."),
    case_q("Medicinal, Aromatic and Spice Crops", "Pungency Alkaloid in Black Pepper",
     "The characteristic biting, pungent kick of black pepper berries is primarily due to the nitrogenous alkaloid:",
     "Piperine",
     ["Curcumin", "Eugenol", "Sinigrin"],
     "Piperine is a pungent crystalline alkaloid concentrated in the outer pericarp and perisperm of Piper nigrum berries."),
    case_q("Medicinal, Aromatic and Spice Crops", "Blanching Effect in Black Pepper Drying",
     "Why are freshly threshed green pepper berries dipped in boiling water for 1 minute before sun drying?",
     "To accelerate rapid, uniform enzymatic blackening by activating polyphenol oxidase and reducing drying time",
     ["To soften berries into liquid paste", "To remove all the piperine alkaloid", "To freeze the berries"],
     "Brief hot water blanching bursts surface cells, activating polyphenol oxidase to oxidize tannins into deep black pigments, drying into wrinkled black pepper."),
    case_q("Medicinal, Aromatic and Spice Crops", "Polishing Operation in Dried Turmeric",
     "What is the primary purpose of polishing dried turmeric fingers in motorized rotary drums?",
     "To remove the rough, dull outer surface skin and root scales, imparting an attractive golden-yellow sheen for commercial grading",
     ["To grind fingers into fine spice curry powder", "To cook the rhizomes for eating", "To wash away all the curcumin"],
     "Polishing mechanically abrades the rough wrinkled outer epidermis and coats fingers with turmeric dust, creating an attractive golden export grade.")
]

P2_M20_TXT = (
    "Read the following excerpt on Commercial Floriculture: Gladiolus Spike Production, Corm Multiplication, "
    "and Post-Harvest Handling, and answer the questions that follow:\n\n"
    "The Gladiolus (Gladiolus grandiflorus, family Iridaceae), colloquially designated as the 'Sword Lily' due to its sword-shaped foliage, "
    "ranks among the top four commercial cut flowers globally alongside rose, carnation, and chrysanthemum. In India, gladiolus is cultivated "
    "extensively during the cool winter season in the plains (and summer in the hills) for its magnificent, stately flower spikes bearing 12 to 24 "
    "florets opening sequentially from the base upwards. The crop is propagated vegetatively via underground storage organs called 'Corms' and "
    "smaller daughter 'Cormels'. For commercial cut spike production, large disease-free corms (conical, measuring 4.0 to 5.5 cm diameter) are "
    "planted at a depth of 5 to 7 cm and spacing of 30 x 20 cm in well-drained, sandy-loam beds. Gladiolus is extremely sensitive to fluoride "
    "toxicity in irrigation water or superphosphate fertilizers, exhibiting characteristic 'tip scorch' necrosis. For commercial marketing, "
    "spikes are harvested at the 'Tight Bud' stage (when the lower 1 to 2 basal florets show clear petal color but remain closed). Stems are severed "
    "with a sharp knife leaving a minimum of 4 to 5 functional basal leaves on the plant; leaving these basal leaves is vital to photosynthetically "
    "nourish and develop the new replacement daughter corms and cormels underground. Immediately upon harvest, cut spikes must be handled and "
    "transported strictly in a vertical upright position inside corrugated cardboard hampers: horizontal positioning triggers strong 'Negative "
    "Geotropism', where the spike apex curves upwards toward the sky, permanently deforming stem straightness and destroying market value. "
    "To maximize vase life, spikes are pulsed for 24 hours in a solution of 20% sucrose plus 200 ppm 8-Hydroxyquinoline Citrate (8-HQC)."
)
P2_M20_QS = [
    case_q("Ornamental Horticulture, Landscaping and Floriculture", "Vegetative Propagation Unit in Gladiolus",
     "The commercial cut flower Gladiolus is vegetatively propagated and multiplied using underground:",
     "Corms and Cormels",
     ["Stem tubers like potato", "Bulbs like onion", "Rhizomes like ginger"],
     "Gladiolus produces solid, rounded underground storage stems termed corms, surrounded by papery tunics, which yield daughter cormels."),
    case_q("Ornamental Horticulture, Landscaping and Floriculture", "Harvesting Stage of Cut Gladiolus Spikes",
     "At what developmental stage should gladiolus spikes be cut for distant transport and floral vase display?",
     "When the bottom 1 to 2 basal florets show flower petal color (tight bud stage)",
     ["When all 20 florets are fully open and wilting", "At young vegetative seedling stage", "After seeds have matured on the spike"],
     "Harvesting at the color-showing tight bud stage ensures safe transport without floret bruising, allowing sequential floret opening in the vase."),
    case_q("Ornamental Horticulture, Landscaping and Floriculture", "Why Basal Leaves Must Be Preserved at Harvest",
     "Why must a gladiolus flower spike be harvested leaving at least 4 to 5 healthy leaves attached to the plant base?",
     "To photosynthetically nourish and synthesize food reserves for the development of daughter replacement corms and cormels underground",
     ["To allow the plant to grow another stem immediately tomorrow", "To prevent soil water from leaking out", "Leaves are poisonous to cut"],
     "Retaining 4–5 basal leaves ensures continuous photosynthate translocation into the newly forming daughter corm, securing next season's planting stock."),
    case_q("Ornamental Horticulture, Landscaping and Floriculture", "Negative Geotropism Hazard during Transport",
     "Why must harvested gladiolus flower spikes be transported strictly in an upright, vertical position?",
     "Horizontal placement triggers negative geotropism, causing spike tips to bend upwards permanently, ruining straight stem geometry",
     ["Horizontal spikes lose all their fragrance instantly", "Horizontal spikes explode under vibration", "The corms fall out in transit"],
     "Gladiolus spikes are strongly negatively geotropic; horizontal transport redistributes auxins, causing stem tips to curve upwards, destroying commercial grade."),
    case_q("Ornamental Horticulture, Landscaping and Floriculture", "Fluoride Toxicity Foliar Symptom",
     "Gladiolus is highly sensitive to trace fluoride impurities in irrigation water or fertilizers, exhibiting which diagnostic foliar injury?",
     "Severe apical leaf tip scorch and marginal necrosis",
     ["Spontaneous doubling of leaf width", "Leaves turn into hollow tubes", "Formation of white powdery mildew"],
     "Gladiolus is a bio-indicator for fluoride; fluorides translocate to leaf tips, causing characteristic dry necrotic tip burn ('tip scorch').")
]

PASSAGES_11_20 = [
    ( (P1_M11_TXT, P1_M11_QS), (P2_M11_TXT, P2_M11_QS) ),
    ( (P1_M12_TXT, P1_M12_QS), (P2_M12_TXT, P2_M12_QS) ),
    ( (P1_M13_TXT, P1_M13_QS), (P2_M13_TXT, P2_M13_QS) ),
    ( (P1_M14_TXT, P1_M14_QS), (P2_M14_TXT, P2_M14_QS) ),
    ( (P1_M15_TXT, P1_M15_QS), (P2_M15_TXT, P2_M15_QS) ),
    ( (P1_M16_TXT, P1_M16_QS), (P2_M16_TXT, P2_M16_QS) ),
    ( (P1_M17_TXT, P1_M17_QS), (P2_M17_TXT, P2_M17_QS) ),
    ( (P1_M18_TXT, P1_M18_QS), (P2_M18_TXT, P2_M18_QS) ),
    ( (P1_M19_TXT, P1_M19_QS), (P2_M19_TXT, P2_M19_QS) ),
    ( (P1_M20_TXT, P1_M20_QS), (P2_M20_TXT, P2_M20_QS) )
]

assert len(PASSAGES_11_20) == 10, f"Expected 10 pairs, got {len(PASSAGES_11_20)}"
for m_idx, (p1, p2) in enumerate(PASSAGES_11_20, start=11):
    assert len(p1[1]) == 5, f"Mock {m_idx} P1 has {len(p1[1])} Qs"
    assert len(p2[1]) == 5, f"Mock {m_idx} P2 has {len(p2[1])} Qs"

print(f"Agriculture Passages 11 to 20 compiled successfully: 10 pairs (20 passages, 100 questions).")
