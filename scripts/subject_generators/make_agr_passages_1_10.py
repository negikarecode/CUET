import sys, os

out_path = "scripts/subject_generators/agr_passages_1_10.py"

content = '''import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# ==============================================================================
# MOCK 1 PASSAGES
# ==============================================================================
P1_M1_TXT = (
    "Read the following case study on Agrometeorological Forecasting and Terminal Heat Stress in Wheat, "
    "and answer the questions that follow:\\n\\n"
    "In the Indo-Gangetic Plains of northern India, wheat (Triticum aestivum) is cultivated as the premier rabi cereal. "
    "However, recurring climate anomalies have elevated the frequency of 'terminal heat stress'—episodes of unseasonably "
    "high daytime temperatures (>32°C–35°C) during the reproductive grain-filling phase in late February and March. "
    "Agrometeorologists at the India Meteorological Department (IMD) issue bi-weekly District Agro-Meteorological Advisory "
    "Bulletins utilizing numerical weather prediction models and Growing Degree Days (GDD) metrics to warn farmers. "
    "Exposure of wheat ears to terminal heat disrupts starch synthase enzyme activity in the developing endosperm, "
    "abruptly truncating the grain-filling duration and forcing early physiological maturity. Consequently, the harvested "
    "grains exhibit shriveled testas, reduced test weight (1,000-grain weight falling from 42 g to <30 g), and yield losses "
    "exceeding 15% to 25%. To mitigate this climatic hazard, agronomists recommend advancing the sowing date to the first fortnight "
    "of November, adopting heat-tolerant cultivars (such as DBW 187 / Karan Vandana and PBW 725), and providing light, frequent "
    "sprinkler micro-irrigations or foliar sprays of 0.2% potassium nitrate (KNO3) during anthesis to cool the crop canopy."
)
P1_M1_QS = [
    case_q("Agrometeorology and Climate Change", "Terminal Heat Stress Timing in Wheat",
           "In northern India, terminal heat stress in wheat occurs predominantly during which critical crop growth stage?",
           "Reproductive grain filling and milky-to-dough ripening phase (late February to March)",
           ["Crown Root Initiation stage in November", "Early vegetative tillering phase in December", "Post-harvest summer storage in May"],
           "Terminal heat stress occurs during the reproductive grain-filling period in late winter/early spring, causing premature cessation of starch accumulation."),
    case_q("Agrometeorology and Climate Change", "Enzyme Impaired by High Temperature",
           "According to physiological research mentioned, terminal heat stress disrupts the activity of which key endosperm enzyme?",
           "Soluble Starch Synthase",
           ["Alcohol dehydrogenase", "Cellulase", "Nitrate reductase"],
           "Thermal stress (>32°C) denatures and inactivates soluble starch synthase in wheat endosperm, preventing the conversion of sucrose into starch."),
    case_q("Agrometeorology and Climate Change", "Physical Grain Defect from Terminal Heat",
           "What characteristic physical defect occurs in harvested wheat kernels exposed to severe terminal heat during grain development?",
           "Shriveled grains with drastically reduced 1,000-grain test weight",
           ["Gigantic swollen grains with double kernels", "Formation of purple anthocyanin coats", "Complete conversion of grain into sugar syrup"],
           "Premature cessation of grain filling results in thin, wrinkled, shriveled kernels with reduced 1,000-grain test weight."),
    case_q("Agrometeorology and Climate Change", "Agronomic Mitigation by Sowing Date",
           "What primary cultural adjustment do agronomists advocate to escape terminal heat stress in the north-western plains?",
           "Advancing wheat sowing to the first fortnight of November (timely sowing)",
           ["Delaying sowing to late January", "Broadcasting seed in flooded water in August", "Harvesting the crop during the flowering stage"],
           "Sowing in early November ensures that flowering and grain filling occur in the cool winter window (Jan-Feb) before hot March temperatures arrive."),
    case_q("Agrometeorology and Climate Change", "Canopy Cooling Foliar Spray",
           "Which foliar chemical spray is recommended during anthesis to alleviate thermal shock and support membrane stability in wheat canopies?",
           "Foliar spray of 0.2% Potassium Nitrate (KNO3)",
           ["Foliar spray of concentrated sulfuric acid", "Foliar spray of 10% sodium chloride", "Pure kerosene emulsion"],
           "Potassium nitrate sprays provide osmo-regulation, maintain guard cell turgor, and reduce canopy temperature under heat stress.")
]

P2_M1_TXT = (
    "Read the following excerpt on Crossbreeding in Indian Dairy Cattle and the Evolution of Karan Fries at NDRI, Karnal, "
    "and answer the questions that follow:\\n\\n"
    "To overcome the low genetic milk yield potential of indigenous zebu cattle (Bos indicus) without compromising heat tolerance "
    "and disease resistance, the National Dairy Research Institute (ICAR-NDRI), Karnal, initiated systematic crossbreeding experiments. "
    "The landmark composite strain 'Karan Fries' was synthesized by crossbreeding high-yielding exotic Holstein Friesian (Bos taurus) "
    "sires with hardy indigenous Tharparkar (Bos indicus) dams. Genetic selection across successive generations stabilized exotic "
    "inheritance between 50% and 62.5% (approx. 5/8th HF and 3/8th Tharparkar). Karan Fries cows average lactation yields exceeding "
    "3,500 to 4,200 kg of milk with an average butterfat content of 3.8% to 4.0%, reaching age at first calving around 30 to 32 months. "
    "While purebred exotic Holstein Friesians suffer severe respiratory heat distress, tick vulnerability, and reproductive collapse "
    "under hot humid summers, Karan Fries inherits sufficient zebu sweat gland density and vascular heat dispersion from Tharparkar "
    "to maintain high metabolic productivity. Intensive management, including loose housing sheds oriented east-west, ad libitum green "
    "succulent fodder (maize and berseem), and timely preventive vaccination against FMD and Theileriosis, remains vital for commercial success."
)
P2_M1_QS = [
    case_q("Breeds of Livestock and Poultry", "Karan Fries Genetic Parentage",
     "The Karan Fries synthetic dairy cattle breed was evolved at ICAR-NDRI Karnal by crossing:",
     "Holstein Friesian (exotic sire) with Tharparkar (indigenous dam)",
     ["Jersey with Sahiwal", "Brown Swiss with Red Sindhi", "Guernsey with Gir"],
     "Karan Fries was bred at NDRI Karnal by crossing Holstein Friesian bulls with indigenous Tharparkar cows."),
    case_q("Breeds of Livestock and Poultry", "Optimal Exotic Inheritance Level",
     "What stabilized level of exotic inheritance is maintained in commercial Karan Fries crossbred cattle to balance yield and hardiness?",
     "50% to 62.5% (approx. 5/8th exotic inheritance)",
     ["100% pure exotic", "Less than 10% exotic", "95% exotic inheritance"],
     "Research at NDRI demonstrated that stabilizing exotic inheritance between 50% and 62.5% maximizes milk yield while retaining tropical hardiness."),
    case_q("Breeds of Livestock and Poultry", "Indigenous Maternal Parent Trait Contribution",
     "What key physiological adaptation did the maternal Tharparkar parent contribute to the Karan Fries crossbred?",
     "Superior heat tolerance, sweating capacity, and tropical tick disease resistance",
     ["World-record 10,000 kg milk yield", "Absence of horns", "Dwarf miniature body size"],
     "Tharparkar contributed sweat gland density, vascular heat dissipation, and resilience against tropical tick-borne hemoprotozoan diseases."),
    case_q("Breeds of Livestock and Poultry", "Average Lactation Performance of Karan Fries",
     "Under sound farm management, what is the typical average lactation milk yield of Karan Fries cows?",
     "3,500 to 4,200 kg of milk per lactation",
     ["500 to 800 kg per lactation", "10,000 to 15,000 kg per lactation", "Only 200 kg per lactation"],
     "Karan Fries yields 3,500–4,200 kg per lactation, vastly outperforming indigenous non-descript cattle."),
    case_q("Breeds of Livestock and Poultry", "Preventive Vaccination Priority in Crossbreds",
     "Crossbred cattle like Karan Fries require strict preventive vaccination schedules against which devastating tick-transmitted hemoprotozoan disease?",
     "Bovine Tropical Theileriosis (caused by Theileria annulata)",
     ["Avian Influenza", "Equine Glanders", "Swine Erysipelas"],
     "Crossbred calves lack innate zebu immunity to Theileria annulata (vectored by Hyalomma ticks), necessitating mandatory preventive vaccination.")
]

# ==============================================================================
# MOCK 2 PASSAGES
# ==============================================================================
P1_M2_TXT = (
    "Read the following case study on Cytoplasmic Genetic Male Sterility (CGMS) and Hybrid Rice Seed Production, "
    "and answer the questions that follow:\\n\\n"
    "Hybrid rice technology has emerged as an indispensable genetic tool to raise the yield ceiling of Oryza sativa by 15% to 20% "
    "over pureline inbred varieties. In India, commercial hybrid rice seed production relies primarily on the three-line system "
    "utilizing Cytoplasmic Genetic Male Sterility (CGMS). The three lines comprise: (1) Line A (the female sterile parent possessing "
    "sterile S-cytoplasm and recessive nuclear non-restoring genes rf/rf), (2) Line B (the maintainer line, having normal fertile N-cytoplasm "
    "and rf/rf nuclear genes, isogenically identical to Line A except for pollen fertility, used to perpetuate Line A), and (3) Line R "
    "(the restorer parent, having normal cytoplasm and dominant nuclear fertility restoring genes Rf/Rf). Crossing Line A x Line R yields "
    "fully fertile F1 hybrid seed (Rf/rf). The sterile cytoplasm used across over 90% of commercial hybrids is derived from the 'Wild Abortive' "
    "(WA) wild rice source. Because rice is strictly self-pollinating, commercial seed production in A x R seed multiplication plots requires "
    "specialized agronomic techniques: maintaining an isolation distance of at least 100 meters, synchronizing flowering through staggered "
    "nursery sowings, clipping flag leaves to enhance panicle exposure, foliar spraying of Gibberellic Acid (GA3 at 45–60 g/ha) to overcome "
    "incomplete panicle exertion in Line A, and supplementary rope-pulling across rows at anthesis to disperse pollen."
)
P1_M2_QS = [
    case_q("Genetics, Cytology and Plant Breeding", "Three-Line Hybrid Rice Components",
           "In the three-line hybrid rice production system, which line acts as the male-sterile seed parent?",
           "Line A (Male-sterile line with sterile cytoplasm)",
           ["Line B (Maintainer line)", "Line R (Restorer line)", "F2 segregating population"],
           "Line A is the male-sterile seed parent; Line B maintains Line A without restoring fertility; Line R restores fertility in the F1 hybrid."),
    case_q("Genetics, Cytology and Plant Breeding", "Genetic Role of Maintainer Line B",
           "Why is Maintainer Line B indispensable in hybrid rice seed multiplication?",
           "It pollinates Line A to produce 100% male-sterile Line A progeny identical to the parent",
           ["It restores fertility so that farmers can save seed", "It kills all insect pests biologically", "It provides edible basmati grains"],
           "Line B has normal N-cytoplasm and homozygous recessive nuclear genes (rf/rf); crossing Line A (S-rf/rf) with Line B yields 100% sterile Line A progeny."),
    case_q("Genetics, Cytology and Plant Breeding", "Dominant Cytoplasm Source in Asian Hybrids",
           "What is the source of sterile cytoplasm present in the vast majority of commercial hybrid rice varieties in Asia?",
           "Wild Abortive (WA) cytoplasm",
           ["Texas (T) cytoplasm", "Kafir cytoplasm", "Tift 23A cytoplasm"],
           "Wild Abortive (WA) cytoplasm, originally identified in a wild male-sterile Oryza rufipogon plant on Hainan Island, underpins commercial rice hybrids."),
    case_q("Genetics, Cytology and Plant Breeding", "Role of GA3 Spray in Line A Seed Plots",
           "In hybrid rice seed plots, foliar spraying of Gibberellic Acid (GA3) on Line A is performed to:",
           "Overcome poor panicle exertion and ensure complete emergence of panicles from the sheath",
           ["Sterilize female ovaries completely", "Dye seeds yellow for brand identification", "Induce dwarfing in plants"],
           "Line A panicles frequently remain trapped inside the flag leaf sheath; GA3 stimulates rapid rachis elongation, fully exposing panicles for cross-pollination."),
    case_q("Genetics, Cytology and Plant Breeding", "Supplementary Pollination Technique",
           "Which physical cultural practice is conducted in seed production plots during morning anthesis to facilitate cross-pollination?",
           "Rope-pulling or rod-shaking across restorer (Line R) rows to shake pollen onto Line A",
           ["Blowing smoke with leaf burners", "Spraying water onto wet flowers", "Covering entire plots with opaque canvas"],
           "Dragging a nylon rope across Line R rows during peak flowering (10:00 to 11:30 AM) shakes anthers, dusting Line A stigmas with airborne pollen.")
]

P2_M2_TXT = (
    "Read the following excerpt on Ruminant Stomach Architecture and Microbial Fiber Digestion, and answer the questions that follow:\\n\\n"
    "The digestive physiology of ruminants (cattle, buffaloes, sheep, and goats) is uniquely adapted to convert low-quality lignocellulosic "
    "fibrous biomass into high-value animal protein and milk fat. The adult ruminant stomach comprises four compartments: Rumen (paunch), "
    "Reticulum (honeycomb), Omasum (manyplies), and Abomasum (true glandular stomach). The rumen acts as a gigantic anaerobic fermentation "
    "vat harboring an intricate symbiotic microbiome comprising anaerobic bacteria (10^10 to 10^11 cells/ml, such as Fibrobacter succinogenes "
    "and Ruminococcus flavefaciens), protozoa, and anaerobic fungi (Neocallimastix). Microbial cellulases and hemicellulases cleave structural "
    "plant polysaccharides into hexoses and pentoses, which are subsequently fermented into Volatile Fatty Acids (VFAs)—principally Acetic Acid, "
    "Propionic Acid, and Butyric Acid. These VFAs are absorbed across the ruminal epithelium into the portal circulation, supplying 70% to 80% "
    "of the animal's total metabolisable energy. Acetate serves as the indispensable biochemical precursor for de novo milk fat synthesis in "
    "the mammary gland. Consequently, diets deficient in effective fiber (NDF) depress acetate production, causing 'Milk Fat Depression'. "
    "Furthermore, ruminal microbes synthesize all essential B-complex vitamins and convert dietary non-protein nitrogen (NPN) into complete microbial protein."
)
P2_M2_QS = [
    case_q("Animal Nutrition and Feed Technology", "True Secretory Glandular Stomach",
     "In which compartment of the adult ruminant stomach are hydrochloric acid and pepsin secreted, corresponding to the human simple stomach?",
     "Abomasum",
     ["Rumen", "Reticulum", "Omasum"],
     "The abomasum is the fourth compartment and the only true secretory stomach with gastric glands that secrete HCl and pepsin."),
    case_q("Animal Nutrition and Feed Technology", "Primary Cellulolytic Bacteria in Rumen",
     "Which of the following anaerobic bacterial species plays a dominant role in digesting plant cellulose in the rumen?",
     "Fibrobacter succinogenes and Ruminococcus albus",
     ["Escherichia coli and Salmonella enterica", "Lactobacillus bulgaricus", "Rhizobium leguminosarum"],
     "Fibrobacter succinogenes, Ruminococcus flavefaciens, and R. albus are the primary cellulolytic bacteria degrading plant cell walls in the rumen."),
    case_q("Animal Nutrition and Feed Technology", "Principal Precursor for Milk Fat",
     "Which volatile fatty acid (VFA) produced during fiber fermentation serves as the primary biochemical precursor for milk fat synthesis?",
     "Acetic Acid (Acetate)",
     ["Propionic Acid (Propionate)", "Lactic Acid", "Hydrochloric Acid"],
     "Acetate absorbed from the rumen is converted into acetyl-CoA in mammary secretory epithelial cells, fueling de novo milk fatty acid synthesis."),
    case_q("Animal Nutrition and Feed Technology", "Cause of Milk Fat Depression Syndrome",
     "Why does feeding a high-concentrate, low-roughage diet cause 'Milk Fat Depression' (low fat %) in dairy cows?",
     "It shifts fermentation towards propionate and lowers ruminal pH, starving the mammary gland of acetate precursors",
     ["It completely stops all milk secretion", "It causes immediate destruction of mammary glands", "It turns milk into pure water"],
     "Starch-rich, low-fiber rations lower rumen pH and favor propionate-producing bacteria, curtailing acetate production and depressing milk fat percentage."),
    case_q("Animal Nutrition and Feed Technology", "De Novo Synthesis by Ruminal Microbiota",
     "Unlike monogastric animals, adult ruminants do not require dietary supplementation of which group of vitamins under normal conditions?",
     "Vitamin B-complex and Vitamin K",
     ["Vitamin A and Vitamin D", "Vitamin E only", "Minerals like calcium and phosphorus"],
     "Ruminal microflora synthesize all B-complex vitamins (thiamine, riboflavin, B12) and Vitamin K in sufficient quantities for host metabolic needs.")
]

# ==============================================================================
# MOCK 3 PASSAGES
# ==============================================================================
P1_M3_TXT = (
    "Read the following case study on Silage Making Principles and Microbial Fermentation Dynamics, and answer the questions that follow:\\n\\n"
    "Ensiling is a time-tested conservation technology to preserve succulent green forages during periods of seasonal surplus (monsoon/autumn) "
    "for utilization during lean fodder months (summer and winter). The process relies on natural anaerobic fermentation of water-soluble carbohydrates "
    "(WSC) present in green crop tissues by epiphytic lactic acid bacteria (such as Lactobacillus plantarum and Enterococcus faecium). "
    "Green fodder crops such as Maize (Zea mays), Sorghum (Sorghum bicolor), and Pearl Millet (Pennisetum glaucum) harvested at the milk-to-dough "
    "stage (containing 30% to 35% dry matter and >8% to 10% WSC) are the gold standard for silage making. Leguminous forages like lucerne and "
    "berseem ensile poorly on their own due to low fermentable sugars and high buffering capacity. In commercial trench or bunker silos, the harvested "
    "forage is chopped into fine pieces of 2 to 3 cm length, compacted in layers using heavy tractors to expel all entrapped oxygen, and sealed "
    "hermetically with thick UV-stabilized polyethylene sheets weighted down with soil or tires. Under strict anaerobic conditions, lactic acid "
    "accumulates within 2 to 3 weeks, driving the pH down rapidly to 3.8–4.2. This intense acidity permanently inhibits the growth of spoilage organisms, "
    "particularly putrefactive Clostridium species that produce offensive butyric acid and break down amino acids into ammonia."
)
P1_M3_QS = [
    case_q("Animal Nutrition and Feed Technology", "Ideal Crop for Silage Production",
           "Which crop is universally regarded as the premier crop for silage making due to high soluble carbohydrates and ideal dry matter?",
           "Maize (Zea mays)",
           ["Lucerne (Alfalfa)", "Berseem (Egyptian clover)", "Cowpea"],
           "Maize contains abundant water-soluble carbohydrates (sugars) and optimal dry matter (30-35%), making it the premier silage crop."),
    case_q("Animal Nutrition and Feed Technology", "Optimal Moisture and Harvest Stage for Ensiling",
           "At what physiological growth stage and dry matter level should green fodder maize be harvested for superior silage?",
           "Milk-to-dough stage, containing 30% to 35% Dry Matter",
           ["Young seedling stage at 10% dry matter", "Completely dead, bone-dry stover stage at 90% dry matter", "Pre-flowering seedling stage"],
           "Harvesting at the milk-to-dough stage guarantees high soluble sugars, optimal dry matter (30–35%), and minimal nutrient loss during fermentation."),
    case_q("Animal Nutrition and Feed Technology", "Target pH of Well-Preserved Silage",
           "Good quality, properly fermented silage is stabilized at what target pH range?",
           "pH 3.8 to 4.2",
           ["pH 6.8 to 7.2", "pH 8.5 to 9.5", "pH 1.0 to 1.5"],
           "Lactic acid accumulation drops the pH to 3.8–4.2, which preserves silage indefinitely under airtight conditions."),
    case_q("Animal Nutrition and Feed Technology", "Harmful Fermentation in Defective Silage",
           "Spoiled, foul-smelling silage characterized by dark slimy discoloration contains high concentrations of which undesirable organic acid?",
           "Butyric Acid (produced by Clostridium bacteria under aerobic/wet conditions)",
           ["Lactic Acid", "Citric Acid", "Ascorbic Acid"],
           "Clostridial fermentation decomposes proteins into toxic amines and foul-smelling butyric acid, indicating defective anaerobic preservation."),
    case_q("Animal Nutrition and Feed Technology", "Why Legumes Ensile Poorly Alone",
           "Why do high-protein legume crops like Lucerne and Berseem ensile poorly when ensiled without additives?",
           "They contain low soluble sugars and possess high buffering capacity that resists pH decline",
           ["They contain toxic nerve poisons", "They have zero water content", "They produce excessive lactic acid"],
           "High crude protein and organic salts in legumes impart high buffering capacity, neutralizing lactic acid and preventing the required pH drop.")
]

P2_M3_TXT = (
    "Read the following excerpt on the Diagnosis and Chemical Reclamation of Sodic (Alkali) Soils, and answer the questions that follow:\\n\\n"
    "In the arid and semi-arid tracts of the Indo-Gangetic basin, millions of hectares of agricultural land are afflicted with sodicity (alkalinity). "
    "According to the diagnostic standards of the Central Soil Salinity Research Institute (ICAR-CSSRI), Karnal, a 'Sodic Soil' is defined by an "
    "Exchangeable Sodium Percentage (ESP) exceeding 15%, an Electrical Conductivity of saturated extract (ECe) generally <4.0 dS/m, and a soil pH "
    "ranging between 8.5 and 10.5. The excessive presence of monovalent sodium ions (Na+) on clay colloidal surfaces weakens inter-particle electrostatic "
    "attraction, causing extensive deflocculation (dispersion) of soil clays. Upon wetting, dispersed clay particles migrate and clog soil macropores, "
    "forming a dense, impermeable surface crust with virtually zero water infiltration and severe aeration deficits. To reclaim these soils, "
    "calcium-supplying chemical amendments are applied, with Agricultural Gypsum (CaSO4.2H2O) being the most cost-effective and dependable amendment. "
    "The required Gypsum Requirement (GR) is computed based on initial ESP and Cation Exchange Capacity. Upon broadcast and shallow mixing into the "
    "top 10 cm, gypsum dissolves slowly, releasing divalent calcium ions (Ca2+) that displace toxic Na+ from the clay complex into the soil solution, "
    "where it forms soluble sodium sulfate (Na2SO4) which is subsequently leached out through ponding. Following gypsum application, growing salt-tolerant "
    "rice varieties (e.g., CSR 30, CSR 36) followed by Dhaincha (Sesbania aculeata) green manuring accelerates biological reclamation."
)
P2_M3_QS = [
    case_q("Soil Fertility, Problematic Soils and Reclamation", "Chemical Diagnostic Parameters of Sodic Soils",
     "What combination of chemical thresholds definitively characterizes a Sodic (Alkali) Soil?",
     "ESP > 15%, soil pH > 8.5, and ECe < 4.0 dS/m",
     ["ESP < 15%, pH < 7.0, and ECe > 10.0 dS/m", "ESP > 50%, pH < 4.0, and ECe = 0", "ESP = 0, pH = 7.0, and ECe = 1.0 dS/m"],
     "Sodic soils are characterized by ESP > 15%, elevated pH (>8.5, often up to 10.0), and low electrolyte conductivity (ECe < 4 dS/m)."),
    case_q("Soil Fertility, Problematic Soils and Reclamation", "Physical Consequence of High Exchangeable Sodium",
     "What physical deterioration occurs in soil structure when exchangeable sodium exceeds 15% on clay surfaces?",
     "Severe clay dispersion (deflocculation), breakdown of soil aggregates, and loss of hydraulic conductivity",
     ["Formation of porous crumb aggregates", "Rapid water infiltration exceeding 50 cm/hour", "Total liquefaction into pure sand"],
     "High hydration radius of sodium forces clay platelets apart (dispersion), sealing macropores and causing waterlogging and crusting."),
    case_q("Soil Fertility, Problematic Soils and Reclamation", "Chemical Amendment of Choice",
     "Which chemical compound is the standard amendment applied for the chemical reclamation of sodic soils in India?",
     "Agricultural Gypsum (Hydrated Calcium Sulfate, CaSO4.2H2O)",
     ["Sodium Chloride (NaCl)", "Urea fertilizer", "Caustic soda (NaOH)"],
     "Agricultural gypsum provides soluble Ca2+ ions that displace adsorbed Na+ from the clay exchange complex."),
    case_q("Soil Fertility, Problematic Soils and Reclamation", "Role of Leaching Post-Gypsum Application",
     "Why must a sodic field be ponded with clean irrigation water following the incorporation of gypsum?",
     "To leach the displaced, soluble Sodium Sulfate (Na2SO4) down below the crop root zone",
     ["To convert gypsum into limestone", "To evaporate all water into steam", "To drown all earthworms"],
     "Ponding leaches soluble sodium sulfate out of the root zone; without leaching, displaced sodium remains in solution and re-adsorbs onto colloids."),
    case_q("Soil Fertility, Problematic Soils and Reclamation", "Pioneer Reclamation Crop",
     "Which cereal crop is universally recommended as the premier first crop to grow in newly amended sodic soils due to high sodicity tolerance?",
     "Transplanted Wetland Rice (using salt-tolerant varieties like CSR 30 / CSR 36)",
     ["Chickpea (Gram)", "Soybean", "Groundnut"],
     "Wetland rice tolerates standing water, benefits from high moisture that dilutes salts, and its root respiration generates CO2 that helps dissolve native calcium.")
]

# ==============================================================================
# MOCK 4 PASSAGES
# ==============================================================================
P1_M4_TXT = (
    "Read the following case study on Subclinical Mastitis, Somatic Cell Count (SCC), and Herd Milk Hygiene, "
    "and answer the questions that follow:\\n\\n"
    "Bovine mastitis—an inflammatory condition of the mammary parenchyma—ranks as the most economically devastating disease "
    "afflicting the global dairy industry. In India, while clinical mastitis (characterized by visible udder swelling, heat, pain, "
    "and watery or clotted milk) is readily noticed, 'subclinical mastitis' accounts for over 70% to 80% of total economic losses. "
    "Subclinical mastitis exhibits no observable physical alteration in the udder tissue or gross appearance of the milk; however, "
    "intramammary bacterial infection (principally by Staphylococcus aureus, Streptococcus uberis, and coliforms) triggers massive "
    "leukocyte infiltration into the milk ducts. The Somatic Cell Count (SCC), comprising neutrophils (up to 90% in infected quarters) "
    "and epithelial cells, serves as the definitive biomarker of udder inflammation. Normal, healthy bovine milk contains <100,000 to "
    "200,000 somatic cells per ml, whereas quarters afflicted with subclinical mastitis exhibit SCC exceeding 400,000 to over 1,000,000 cells/ml. "
    "Elevated SCC correlates with profound compositional degradation: milk lactose and casein synthesis drops sharply, while blood whey proteins "
    "(serum albumin, immunoglobulins) and proteolytic enzymes leak into the milk, degrading cheese yield and causing off-flavors. "
    "For rapid, cow-side detection, the California Mastitis Test (CMT) is deployed: mixing milk with an alkyl aryl sulfonate reagent "
    "lyses somatic cell nuclei, releasing DNA that forms a viscous, gelatinous mass whose thickness directly reflects the somatic cell density."
)
P1_M4_QS = [
    case_q("Animal Reproduction, AI and Health Management", "Economic Iceberg Effect of Mastitis",
           "Why does subclinical mastitis cause far greater aggregate financial losses to dairy farmers than clinical mastitis?",
           "It exhibits no visible gross symptoms, remaining undetected while depressing daily milk yields by 10% to 25% across herds",
           ["It kills every infected cow within 24 hours", "It turns all milk into solid cheese instantly inside the udder", "It requires complete slaughter of the herd"],
           "Subclinical mastitis is insidious and widespread (affecting 30–50% of cows), causing persistent production drops without visual signs."),
    case_q("Animal Reproduction, AI and Health Management", "Somatic Cell Count Threshold for Infection",
     "In dairy herd health monitoring, a Somatic Cell Count (SCC) exceeding what threshold indicates intramammary inflammation?",
     "Over 200,000 to 400,000 cells per ml of milk",
     ["Over 10 cells per liter", "Over 100,000,000 cells per drop", "Exactly 5 cells per ml"],
     "An SCC > 200,000–400,000 cells/ml indicates neutrophil recruitment into the mammary gland in response to infection."),
    case_q("Animal Reproduction, AI and Health Management", "Diagnostic Reagent Mechanism in CMT",
     "How does the California Mastitis Test (CMT) reagent generate a visible gel in mastitic milk samples?",
     "The detergent reagent lyses somatic cell membranes, releasing nuclear DNA which forms a viscous gelatinous polymer",
     ["It precipitates milk sugar as heavy crystals", "It freezes milk into ice", "It boils the milk instantly"],
     "Alkyl aryl sulfonate detergent disrupts somatic cell membranes; freed nuclear DNA strands polymerize into a viscous slime whose viscosity mirrors cell count."),
    case_q("Animal Reproduction, AI and Health Management", "Milk Compositional Degradation from Mastitis",
     "Which valuable milk constituents show a sharp decline in concentration in milk harvested from mastitic quarters?",
     "Casein protein, Lactose (milk sugar), and Total Solids",
     ["Sodium and Chloride ions", "Immunoglobulins and serum albumin", "Somatic cells"],
     "Damaged secretory alveolar cells synthesize less casein, lactose, and fat, while capillary permeability increases sodium and chloride leakage into milk."),
    case_q("Animal Reproduction, AI and Health Management", "Clean Milk Management Practice",
     "What routine hygiene procedure performed immediately after milking provides the most effective barrier against contagious mastitis pathogens?",
     "Post-milking teat dipping in 0.5% to 1.0% povidone-iodine solution",
     ["Washing udders with dirty pond water", "Tying the teat closed with wire", "Allowing cows to lie down immediately in wet dung"],
     "Post-milking germicidal teat dipping coats the open streak canal with an antiseptic barrier while the muscular sphincter slowly contracts over 30–45 minutes.")
]

P2_M4_TXT = (
    "Read the following excerpt on Micro-Irrigation and Precision Fertigation in Arid Horticulture, and answer the questions that follow:\\n\\n"
    "In the water-stressed arid and semi-arid horticultural belts of northwest and peninsular India, pressurized micro-irrigation systems "
    "have revolutionized fruit production (citrus, pomegranate, guava, mango). Drip (trickle) irrigation achieves unmatched water application "
    "efficiencies of 90% to 95% (compared to 30% to 45% in surface flooding) by delivering water at low discharge rates (1 to 8 liters/hour) "
    "directly to the root zone via emitters installed along lateral polyethylene tubing. By maintaining soil water potential continuously near "
    "field capacity (-10 to -30 kPa), drip irrigation avoids the cyclical moisture stress-saturation oscillations characteristic of flood irrigation. "
    "A crowning technological synergy of drip systems is 'Fertigation'—the simultaneous injection of water-soluble fertilizers into the irrigation "
    "stream via Venturi injectors or fertilizer injection pumps. Fertigation delivers nutrients directly into the active root wetted bulb at "
    "crop-growth-stage-specific concentrations, raising Nutrient Use Efficiency (NUE) by 30% to 50% while slashing fertilizer leaching losses. "
    "However, maintenance of the drip network requires rigorous preventive engineering: hard irrigation waters containing high calcium and magnesium "
    "bicarbonates precipitate insoluble calcium carbonate scale in emitter labyrinths. To prevent chemical clogging, periodic acid flushing "
    "with commercial hydrochloric acid (HCl) or phosphoric acid is performed to lower line water pH to 1.5–2.0, dissolving mineral encrustations."
)
P2_M4_QS = [
    case_q("Water Management and Micro-Irrigation Systems", "Water Application Efficiency of Drip Irrigation",
     "What is the typical water application efficiency achieved by a well-designed drip irrigation system in commercial orchards?",
     "90% to 95%",
     ["30% to 40%", "50% to 60%", "100% with zero transpiration"],
     "Drip irrigation achieves 90-95% efficiency by eliminating conveyance, runoff, deep percolation, and canopy evaporation losses."),
    case_q("Water Management and Micro-Irrigation Systems", "Soil Moisture Regime Maintained by Drip",
     "Drip irrigation enhances fruit tree physiological growth primarily by maintaining root zone soil moisture continuously near:",
     "Field Capacity (low soil water suction of -10 to -30 kPa)",
     ["Permanent Wilting Point (-15 bars)", "Hygroscopic Coefficient (-31 bars)", "Air-dry desert moisture"],
     "Frequent low-volume drip applications keep root-zone matric suction near field capacity, allowing unhindered water uptake without waterlogging."),
    case_q("Water Management and Micro-Irrigation Systems", "Agronomic Advantages of Fertigation",
     "What is the primary agronomic benefit of practicing precision fertigation over traditional broadcast fertilizer application?",
     "Substantial increase in Nutrient Use Efficiency (NUE) by placing soluble nutrients directly into the active root wetted zone",
     ["It eliminates the need for nitrogen fertilizers", "It makes fruits harvest themselves automatically", "It permanently sterilizes soil microbes"],
     "Fertigation synchronizes nutrient delivery with plant developmental demand directly in the wetted root bulb, cutting volatilization and leaching."),
    case_q("Water Management and Micro-Irrigation Systems", "Cause of Emitter Clogging in Micro-Irrigation",
     "What is the primary cause of chemical emitter blockage in drip irrigation systems operating with hard groundwater?",
     "Precipitation of insoluble Calcium Carbonate (CaCO3) and Magnesium scale in emitter orifices",
     ["Accumulation of pure gold crystals", "Growth of large earthworms inside the pipes", "Rusting of plastic polyethylene pipes"],
     "Dissolved calcium and bicarbonate ions precipitate as insoluble CaCO3 scale in fine emitter labyrinths as water evaporates and warms."),
    case_q("Water Management and Micro-Irrigation Systems", "Chemical Treatment for Dissolving Scale",
     "What chemical maintenance procedure is routinely executed to unclog drip lines encrusted with mineral carbonate scales?",
     "Periodic acid treatment (flushing with dilute Hydrochloric Acid or Phosphoric Acid at pH 1.5–2.0)",
     ["Flushing with caustic soda at pH 14", "Injecting molten sulfur", "Pumping boiling motor oil through laterals"],
     "Acid injection lowers water pH to 1.5–2.0 for 30–60 minutes, dissolving carbonate precipitates into soluble calcium salts, flushed out via lateral ends.")
]

# ==============================================================================
# MOCK 5 PASSAGES
# ==============================================================================
P1_M5_TXT = (
    "Read the following case study on Mutation Breeding and Induced Polyploidy in Crop Improvement, "
    "and answer the questions that follow:\\n\\n"
    "Mutation breeding has served as a powerful tool to generate novel genetic variability in self-pollinated field crops where natural "
    "germplasm reserves are exhausted. Induced mutagenesis exposes seeds or vegetative propagules to physical mutagens (ionizing radiations "
    "such as Gamma rays from Cobalt-60, X-rays, fast neutrons) or chemical mutagens (alkylating agents like Ethyl Methane Sulfonate / EMS, "
    "Sodium Azide). A celebrated milestone of mutation breeding in India was the evolution of the amber-grained wheat cultivar 'Sharbati Sonora' "
    "by Dr. M. S. Swaminathan and colleagues at IARI, New Delhi, by irradiating the red-grained Mexican dwarf wheat variety Sonora 64 with gamma rays. "
    "Beyond point mutations, manipulating ploidy levels (Polyploidy Breeding) has created revolutionary crop architectures. Autopolyploids "
    "are induced by treating dividing apical meristems with the plant alkaloid 'Colchicine' (extracted from autumn crocus Colchicum autumnale). "
    "Colchicine inhibits microtubule spindle fiber polymerization during mitotic metaphase, preventing chromatid separation and effectively "
    "doubling the chromosome number. In watermelon (Citrullus lanatus), crossing an induced autotetraploid (4n = 44) female with a normal "
    "diploid (2n = 22) male produces commercial triploid (3n = 33) hybrid seeds. Because triploid plants suffer severe meiotic chromosome "
    "unbalance during gametogenesis, they fail to form functional seeds, producing prize 'Seedless Watermelons'."
)
P1_M5_QS = [
    case_q("Genetics, Cytology and Plant Breeding", "Sharbati Sonora Mutagenic Origin",
           "The famous amber-grained dwarf wheat cultivar 'Sharbati Sonora' was developed at IARI by exposing which red-grained variety to gamma radiation?",
           "Sonora 64",
           ["Kalyansona", "Lerma Rojo 64A", "Sonalika"],
           "Sharbati Sonora was created by gamma irradiation of Mexican Sonora 64, changing seed coat color from unacceptable red to preferred amber."),
    case_q("Genetics, Cytology and Plant Breeding", "Colchicine Chemical Mechanism of Action",
     "How does the alkaloid colchicine induce chromosome doubling in dividing plant meristems?",
     "It binds tubulin dimers, halting mitotic spindle fiber assembly and arresting division at metaphase",
     ["It breaks DNA into millions of fragments", "It fuses cell walls together permanently", "It dissolves the cell nucleus completely"],
     "Colchicine blocks mitotic spindle microtubule formation, arresting chromosomes at metaphase; the nuclear membrane reforms around doubled chromosomes."),
    case_q("Genetics, Cytology and Plant Breeding", "Triploid Seedless Watermelon Parentage",
     "What specific parental cross is executed to generate triploid (3n = 33) seedless watermelon seeds?",
     "Autotetraploid (4n) female crossed with Diploid (2n) male",
     ["Diploid (2n) female crossed with Haploid (1n) male", "Triploid crossed with Hexaploid", "Diploid crossed with Diploid"],
     "Crossing an induced tetraploid (4n) as female with a diploid (2n) male yields triploid (3n) hybrid embryos in the 4n mother fruit."),
    case_q("Genetics, Cytology and Plant Breeding", "Biological Cause of Seedlessness in Triploids",
     "Why are triploid (3n) watermelon fruits completely seedless upon maturity?",
     "Irregular distribution of three sets of homologous chromosomes during meiotic anaphase-I causes aneuploid gametic sterility",
     ["The fruit contains no placental tissues", "Triploid plants never produce flowers", "Bees refuse to visit triploid flowers"],
     "During meiosis in triploids, trivalent pairing leads to unequal chromosome distribution, generating non-viable gametes that cannot set seeds."),
    case_q("Genetics, Cytology and Plant Breeding", "Popular Chemical Mutagen in Crop Plants",
     "Which of the following chemical mutagens is an alkylating agent widely used in plant mutation breeding to induce high-frequency transition mutations?",
     "Ethyl Methane Sulfonate (EMS)",
     ["Sodium Chloride", "Urea formaldehyde", "Calcium carbonate"],
     "Ethyl Methane Sulfonate (EMS) is the most potent and widely deployed chemical mutagen, alkylating guanine to induce G:C to A:T transitions.")
]

P2_M5_TXT = (
    "Read the following excerpt on Clean Milk Production and Platform Testing at Village Dairy Cooperative Societies, "
    "and answer the questions that follow:\\n\\n"
    "Under the cooperative dairy framework pioneered by Operation Flood (Amul model), the preservation of raw milk quality between "
    "milking and factory pasteurization is crucial. Freshly drawn bovine milk contains a natural bacteriostatic system (lactoperoxidase, "
    "lactoferrin, lysozyme) that retards bacterial multiplication for roughly 2 to 3 hours at ambient temperatures. If not chilled "
    "promptly below 4°C, ambient mesophilic bacteria (principally Lactococcus lactis and coliforms) multiply exponentially, fermenting "
    "milk sugar (lactose) into lactic acid. When titratable acidity surpasses 0.20% to 0.22% (expressed as lactic acid), milk destabilizes "
    "under heat and curdles upon boiling. At primary village collection centers, rapid 'Platform Tests' are conducted before pouring milk into "
    "bulk chillers. The 'Clot-on-Boiling' (COB) test detects high developed acidity: boiling 5 ml of milk in a test tube causes immediate "
    "clotting if acidity is >0.20%, rendering it unacceptable for transport. The Alcohol Test (mixing milk with equal volume of 68% ethanol) "
    "detects mineral imbalance and early curdling potential. Microbial hygiene is benchmarked via the Methylene Blue Reduction Test (MBRT): "
    "metabolic respiration of actively dividing bacteria consumes dissolved oxygen, transferring electrons to the redox dye methylene blue, "
    "decolorizing it from deep blue to white. Raw milk retaining its blue color for >5 hours is classified as Excellent; reduction in <30 minutes "
    "denotes Very Poor quality. Milk density is verified with a calibrated Quevenne lactometer to detect illegal water adulteration."
)
P2_M5_QS = [
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Clot-on-Boiling (COB) Test Significance",
     "What biochemical condition does the Clot-on-Boiling (COB) platform test detect in raw milk?",
     "High developed acidity (>0.20% lactic acid) indicating milk is unstable for heat pasteurization",
     ["Low butterfat percentage", "Presence of synthetic chemical detergents", "High calcium concentration"],
     "When developed acidity exceeds 0.20%, heat denatures destabilized casein micelles, causing curd coagulation in the COB test."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Methylene Blue Reduction Test (MBRT) Principle",
     "The Methylene Blue Reduction Test (MBRT) evaluates raw milk quality on the biochemical basis of:",
     "Depletion of dissolved oxygen by bacterial metabolic respiration, reducing the blue redox dye to colorless leucomethylene blue",
     ["Acid hydrolysis of milk butterfat into free glycerol", "Thermal breakdown of casein micelles", "Precipitation of lactose crystals"],
     "Bacterial enzymatic dehydrogenases consume oxygen, lowering redox potential (Eh); the dye acts as electron acceptor, decolorizing to white."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "MBRT Standard for Excellent Quality Milk",
     "Raw milk that takes 5 hours or longer to decolorize methylene blue dye is officially classified as:",
     "Good to Excellent Quality (low bacterial count)",
     ["Very Poor Quality (filthy milk)", "Completely sour and curdled", "Adulterated with river water"],
     "An MBRT reduction time > 5 hours signifies a very low microbial population (<500,000 bacteria/ml), indicating sanitary clean milk production."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Cold Chain Storage Temperature",
     "To halt bacterial proliferation following village collection, milk must be chilled in Bulk Milk Coolers (BMCs) to what temperature?",
     "4°C or below",
     ["25°C", "15°C", "Below freezing point at -20°C"],
     "Cooling to 4°C arrests the metabolic multiplication of mesophilic bacteria, preserving raw milk quality for up to 48 hours before factory processing."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Lactometer Reading and Water Adulteration",
     "How does illegal adulteration of pure whole milk with water affect its lactometer reading and specific gravity?",
     "It lowers both the lactometer reading and specific gravity towards that of pure water (1.000)",
     ["It increases specific gravity above 1.050", "It has zero effect on density", "It turns the lactometer bright red"],
     "Pure cow milk has a specific gravity of 1.028–1.032; adding water (density 1.000) lowers lactometer reading and density proportionally.")
]

# ==============================================================================
# MOCK 6 PASSAGES
# ==============================================================================
P1_M6_TXT = (
    "Read the following case study on the System of Rice Intensification (SRI) vs Conventional Puddled Rice, "
    "and answer the questions that follow:\\n\\n"
    "Lowland puddled transplanted rice culture is an enormous consumer of fresh water, requiring approximately 3,000 to 5,000 liters "
    "of water to produce a single kilogram of milled rice under continuous flooded ponding (5 to 10 cm standing water). "
    "Amid escalating groundwater depletion across India, the System of Rice Intensification (SRI)—originally developed in Madagascar "
    "by Fr. Henri de Laulanie—has emerged as a resource-conserving paradigm. SRI challenges conventional flood-irrigation dogmas through "
    "four synergistic principles: (1) Transplanting very young, single seedlings (8 to 12 days old, at the 2-leaf stage, with the seed sac attached) "
    "instead of overaged 25–35 day old bunches, preserving phyllochron tillering potential; (2) Wide square planting geometry (typically 25 x 25 cm "
    "or 30 x 30 cm) with single seedlings per hill, providing expansive solar radiation and root volume; (3) Non-flooded water management "
    "known as Alternate Wetting and Drying (AWD), keeping the soil moist but aerobically unsaturated during vegetative growth, and maintaining "
    "a shallow 1–2 cm water layer only from panicle initiation to grain dough stage; and (4) Mechanical inter-cultivation using a rotary cono-weeder "
    "2 to 4 times between rows at 10-day intervals. Cono-weeding churns weeds into the soil as in situ green manure while aerating the upper "
    "rhizosphere, stimulating profuse, deep root systems and mycorrhizal associations. Field evaluations show SRI reduces irrigation water input "
    "by 30% to 40%, slashes seed rate from 40–50 kg/ha down to just 5–7 kg/ha, and increases grain yields by 15% to 30%."
)
P1_M6_QS = [
    case_q("Agronomy of Major Cereal Crops", "SRI Seedling Age for Transplanting",
           "Under System of Rice Intensification (SRI) guidelines, what is the recommended age of seedlings for transplanting?",
           "8 to 12 days old (at 2-leaf stage, with seed sac still attached)",
           ["30 to 40 days old", "60 days old", "1 day old pre-germinated seeds only"],
           "SRI transplants young 8–12 day old seedlings (2-leaf stage) to avoid trauma to apical meristems and preserve tillering phyllochrons."),
    case_q("Agronomy of Major Cereal Crops", "SRI Geometric Spacing Standard",
     "What planting geometry is standardly adopted in SRI fields to provide adequate solar exposure and root exploration volume?",
     "Wide square spacing of 25 cm x 25 cm with a single seedling per hill",
     ["Dense planting at 10 cm x 10 cm with 10 seedlings per hill", "Random broadcasting across untilled mud", "Continuous drilling at 5 cm spacing"],
     "Square spacing at 25x25 cm allows unshaded lateral tillering, producing 30–50 tillers per hill from a single transplanted seedling."),
    case_q("Agronomy of Major Cereal Crops", "Water Management Regime in SRI",
     "How is irrigation scheduled in an SRI paddy field during the vegetative growth period?",
     "Alternate Wetting and Drying (AWD), keeping soil moist and aerated without standing water",
     ["Continuous deep flooding under 15 cm stagnant water", "Keeping soil completely dry and cracked for 3 months", "Submerging leaves entirely"],
     "AWD maintains aerobic soil conditions, promoting extensive root branching and avoiding root anoxia caused by continuous flooding."),
    case_q("Agronomy of Major Cereal Crops", "Mechanical Cono-Weeder Dual Function",
     "What dual agronomic functions are accomplished by running a mechanical rotary cono-weeder across SRI rows?",
     "Uprooting and burying weeds as green manure while simultaneously aerating the rhizosphere",
     ["Shattering mature rice grains onto the soil", "Harvesting the straw mechanically", "Spraying toxic chemical herbicides"],
     "Cono-weeders incorporate weeds into the mud while churning and aerating the root zone, triggering explosive root hair proliferation."),
    case_q("Agronomy of Major Cereal Crops", "Seed Rate Economy in SRI",
     "What approximate quantity of certified seed is required to plant one hectare of paddy under the SRI methodology?",
     "5 to 7 kg per hectare (compared to 40–50 kg in conventional transplanting)",
     ["100 to 150 kg per hectare", "500 kg per hectare", "Less than 10 grams"],
     "Planting single seedlings at 25x25 cm requires only 5–7 kg seed/ha, saving over 80% of precious seed volume.")
]

P2_M6_TXT = (
    "Read the following excerpt on Bovine Semen Cryopreservation and Artificial Insemination (AI) Technology, "
    "and answer the questions that follow:\\n\\n"
    "Artificial Insemination (AI) using deep-frozen semen straws represents the primary vehicle for genetic improvement in Indian "
    "dairy cattle and buffaloes. In commercial Artificial Breeding Stations, elite progeny-tested bulls are trained to mount a dummy "
    "and ejaculate into an Artificial Vagina (AV) maintained at physiological temperature (41°C to 44°C) and pressure. Freshly collected "
    "bovine semen (volume 4 to 8 ml, concentration 1.0 to 1.5 billion sperm/ml) is evaluated for mass motility and progressive individual "
    "motility (>70%). The qualified ejaculate is extended using a Tris-egg yolk-citric acid-glycerol extender. Glycerol (at 6.4% to 7.0%) "
    "serves as the indispensable permeating cryoprotective agent that penetrates sperm plasma membranes, depressing the freezing point "
    "and preventing lethal intracellular ice crystallization during ultra-rapid freezing. The extended semen is packaged into 0.25 ml French "
    "polyvinyl chloride 'mini straws' (each containing a minimum of 20 million spermatozoa), equilibrated at 4°C for 3 to 4 hours, frozen "
    "in liquid nitrogen vapor, and finally plunged into Liquid Nitrogen at -196°C (-320°F) for indefinite cryogenic storage. In the field, "
    "the AI technician thaws the 0.25 ml straw in a water bath at 37°C for precisely 30 seconds, loads it into an AI gun, and deposits the "
    "semen using the 'Recto-Vaginal Method' past the tortuous cervical rings directly into the body of the uterus."
)
P2_M6_QS = [
    case_q("Animal Reproduction, AI and Health Management", "Liquid Nitrogen Cryopreservation Temperature",
     "Bovine frozen semen straws are cryopreserved and maintained indefinitely in vacuum cryo-containers at what temperature?",
     "-196°C in liquid nitrogen",
     ["-20°C in home freezers", "0°C in melting ice", "-79°C in dry ice"],
     "Liquid nitrogen maintains a temperature of -196°C (-320°F), completely halting cellular metabolism and preserving sperm viability for decades."),
    case_q("Animal Reproduction, AI and Health Management", "Thawing Protocol for French Semen Straws",
     "What is the standard, globally recommended water bath thawing protocol for a 0.25 ml French bovine semen straw prior to insemination?",
     "37°C for 30 seconds",
     ["100°C boiling water for 5 minutes", "0°C ice water for 1 hour", "Thawing in direct sunlight for 15 minutes"],
     "Thawing at 37°C for 30 seconds achieves rapid, uniform rewarming without membrane recrystallization damage."),
    case_q("Animal Reproduction, AI and Health Management", "Cryoprotectant in Semen Extenders",
     "Which chemical compound is incorporated into semen extenders at 6.5% to 7.0% to prevent intracellular ice crystal formation during freezing?",
     "Glycerol",
     ["Formaldehyde", "Ethyl alcohol", "Sulfuric acid"],
     "Glycerol acts as a penetrating cryoprotectant, preventing mechanical rupture of sperm plasma membranes and acrosomal caps."),
    case_q("Animal Reproduction, AI and Health Management", "Standard Anatomical Site of Semen Deposition",
     "In the recto-vaginal technique of AI in cattle, where should the semen straw be deposited for maximum conception rates?",
     "Just inside the body of the uterus (past the internal os of the cervix)",
     ["In the vulva", "Deep inside one ovary", "Inside the urinary bladder"],
     "Depositing semen in the uterine body ensures equal distribution of capacitated spermatozoa into both horn oviducts."),
    case_q("Animal Reproduction, AI and Health Management", "Sperm Count Standard per French Mini Straw",
     "Under national minimum standards in India, a commercial 0.25 ml French mini straw must contain a minimum of how many motile spermatozoa before freezing?",
     "20 million spermatozoa per straw",
     ["100 spermatozoa", "1,000,000,000 spermatozoa", "Exactly 50 cells"],
     "National standards mandate a minimum of 20 million total spermatozoa per 0.25 ml straw (yielding >10 million post-thaw progressively motile sperm).")
]

# ==============================================================================
# MOCK 7 PASSAGES
# ==============================================================================
P1_M7_TXT = (
    "Read the following case study on Herbicide Resistance Evolution in Phalaris minor and Integrated Weed Management, "
    "and answer the questions that follow:\\n\\n"
    "In the high-productivity rice-wheat cropping system of northwest India (Punjab, Haryana, western Uttar Pradesh), the grassy weed "
    "Phalaris minor (Canary grass / Gullidanda) emerged as the single most devastating biological threat to irrigated dwarf wheat. "
    "Because Phalaris minor closely mimics wheat morphologically during vegetative growth, manual hand weeding is virtually impossible "
    "at the early tillering stage. In the late 1970s and 1980s, the chemical herbicide Isoproturon (a Photosystem-II inhibiting substituted urea) "
    "provided spectacular control. However, continuous continuous monoculture of rice-wheat coupled with repetitive, sole reliance on Isoproturon "
    "imposed intense selection pressure. By 1992–93, Phalaris minor populations across millions of hectares in Haryana and Punjab evolved complete "
    "metabolic resistance to Isoproturon, mediated by elevated levels of Cytochrome P450 monooxygenases that rapidly detoxified the herbicide. "
    "Faced with catastrophic yield losses (wheat yields dropping to zero in severely infested fields), weed scientists formulated an Integrated "
    "Weed Management (IWM) strategy: (1) Introducing alternate-mode-of-action herbicides (Sulfosulfuron - ALS inhibitor, Clodinafop-propargyl - "
    "ACCase inhibitor, and Pinoxaden); (2) Crop diversification by rotating wheat with berseem, mustard, or potato; and (3) Conservation agriculture "
    "deploying the 'Happy Seeder' to drill wheat directly into heavy retained paddy residues under zero tillage. The surface paddy straw mulch "
    "physically intercepts sunlight, smothering germinating Phalaris seeds and suppressing weed emergence by 60% to 80%."
)
P1_M7_QS = [
    case_q("Weed Science and Herbicide Management", "Morphological Mimicry of Phalaris minor",
           "Why is manual hand weeding ineffective in controlling Phalaris minor in young wheat fields?",
           "Phalaris minor mimics the vegetative morphology, leaf shape, and tillering of young wheat plants almost identically",
           ["It grows 10 meters tall within 2 days", "It releases toxic nerve gas upon touch", "It lives entirely underground"],
           "Vegetative Phalaris minor is indistinguishable from young wheat tillers to the untrained eye, making selective manual roguing unfeasible."),
    case_q("Weed Science and Herbicide Management", "Herbicide Resistance Mechanism",
     "Widespread field resistance of Phalaris minor to Isoproturon in Haryana was primarily driven by:",
     "Repetitive, continuous use of Isoproturon in rice-wheat monoculture, selecting for enhanced Cytochrome P450 metabolic detoxification",
     ["Spontaneous viral mutation of wheat plants", "Excessive application of chemical urea", "Aerial spraying of DDT"],
     "Continuous monoculture and sole reliance on Isoproturon selected for resistant biotypes possessing elevated cytochrome P450 monooxygenase enzymes."),
    case_q("Weed Science and Herbicide Management", "Alternate Mode of Action Herbicides",
     "Which of the following alternate post-emergence herbicides was introduced to control Isoproturon-resistant Phalaris minor?",
     "Clodinafop-propargyl (ACCase inhibitor) and Sulfosulfuron (ALS inhibitor)",
     ["2,4-D ethyl ester only", "Atrazine", "Paraquat"],
     "Clodinafop (lipid synthesis inhibitor) and Sulfosulfuron (acetolactate synthase inhibitor) provide alternate biochemical pathways to kill resistant Phalaris."),
    case_q("Weed Science and Herbicide Management", "Zero Tillage Straw Mulch Weed Suppression",
     "How does direct drilling of wheat with the Happy Seeder under zero tillage suppress Phalaris minor emergence?",
     "Dense surface-retained paddy straw mulch blocks sunlight from reaching the soil, physically smothering emerging weed seedlings",
     ["It burns all weed seeds with high voltage electricity", "It injects chemical formalin into the soil", "It freezes the soil surface"],
     "Thick paddy residue cover acts as a physical and light barrier; Phalaris seeds require light for germination and exhaust seed reserves under mulch."),
    case_q("Weed Science and Herbicide Management", "Cultural Control via Crop Rotation",
     "Which crop rotation effectively breaks the seed bank cycle of Phalaris minor in irrigated north-western plains?",
     "Rotating wheat with multi-cut Berseem (Trifolium alexandrinum)",
     ["Growing continuous wheat for 20 years", "Leaving the land completely unplowed and uncultivated", "Planting eucalyptus trees"],
     "Berseem is repeatedly cut 4–6 times throughout winter; frequent mowing decapitates emerging Phalaris before it can set viable seeds, exhausting the seed bank.")
]

P2_M7_TXT = (
    "Read the following excerpt on Dairy Chemistry of Milk Proteins and Industrial Paneer Manufacturing, "
    "and answer the questions that follow:\\n\\n"
    "Traditional indigenous dairy products consume over 50% of India's total milk production. Among coagulated dairy foods, Paneer "
    "(a heat-acid coagulated non-fermented traditional cottage cheese) is the most prominent. The scientific manufacture of paneer relies "
    "on the physicochemical destabilization of Casein, which constitutes approx. 80% of total bovine milk protein. Casein exists in milk "
    "as colloidal spherical micelles (40 to 300 nm diameter) composed of alpha-s1, alpha-s2, beta, and kappa-casein, cross-linked by colloidal "
    "calcium phosphate. Kappa-casein molecules occupy the outer micellar surface, displaying hydrophilic, negatively charged hairy tails "
    "(glycomacropeptide) that provide steric and electrostatic repulsion, keeping casein micelles dispersed in liquid milk. In commercial paneer "
    "production, standardized buffalo milk (min. 6.0% fat, 9.0% SNF) is heated to 85°C–90°C (denaturing whey proteins and co-precipitating "
    "them with casein) and cooled to 70°C–75°C. At this temperature, hot 1% to 2% food-grade Citric Acid (or sour whey) is slowly added with "
    "gentle agitation until a clear, greenish-yellow whey separates at pH 5.3 to 5.4. The acid neutralizes negative surface charges, collapsing "
    "kappa-casein hairs and causing micelles to agglomerate into cohesive curds that entrap emulsified milk fat globules. The hot coagulum is "
    "strained into hoops lined with muslin cloth and pressed under 2 to 3 kg/cm² pressure for 15 to 20 minutes, followed by chilling in chilled "
    "water (4°C) for 2 to 3 hours to firm the body and produce sliceable paneer blocks yielding 20% to 22% recovery from buffalo milk."
)
P2_M7_QS = [
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Micelle Stabilization by Kappa-Casein",
     "What molecular mechanism prevents casein micelles from spontaneously coagulating in fresh liquid milk?",
     "Hydrophilic, negatively charged outer hairy tails of kappa-casein that exert electrostatic and steric repulsion",
     ["Insoluble wax coatings on fat droplets", "High concentrations of dissolved sulfuric acid", "Magnetic fields inside the cow's udder"],
     "Kappa-casein forms a protective steric and electrostatic hairy layer on the micellar surface, preventing calcium-induced agglomeration."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Preheating Temperature Purpose in Paneer Making",
     "Why is milk heated to 85°C–90°C prior to acid coagulation in commercial paneer manufacturing?",
     "To denature heat-sensitive whey proteins (beta-lactoglobulin), co-precipitating them with casein to increase product yield and moisture retention",
     ["To boil all water out of the milk", "To caramelize all sugars into dark brown syrup", "To kill the cow's red blood cells"],
     "Heating to 85–90°C unfolds whey proteins, forming disulfide complexes with kappa-casein that co-precipitate, boosting paneer yield and softness."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Coagulating Agent and Coagulation Temperature",
     "What chemical coagulant and temperature are standardly utilized for paneer curd precipitation?",
     "1% to 2% Citric Acid solution added at 70°C to 75°C",
     ["Concentrated hydrochloric acid at 10°C", "Rennet enzyme at 30°C", "Sodium hydroxide at 100°C"],
     "Citric acid (or lactic acid/sour whey) added slowly at 70–75°C yields a soft, cohesive curd with sparkling greenish whey at pH 5.3–5.4."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Why Buffalo Milk is Preferred for Paneer",
     "Why is buffalo milk universally preferred over cow milk for commercial paneer manufacturing?",
     "Buffalo milk contains higher butterfat, casein, and calcium, producing a higher yield (20–22%) and firm, sliceable texture",
     ["Cow milk cannot curdle with acid", "Buffalo milk has zero moisture", "Cow milk paneer is completely poisonous"],
     "Buffalo milk's rich solids and colloidal calcium produce a firm, elastic curd matrix with high fat recovery that slices cleanly without crumbling."),
    case_q("Dairy Chemistry, Clean Milk and Milk Processing", "Cold Water Chilling Step Function",
     "Why are freshly pressed hot paneer blocks immersed in chilled water (4°C) for 2 to 3 hours?",
     "To chill and firm the protein-fat matrix, enhance slicing texture, and reduce moisture loss",
     ["To wash away all the milk fat", "To bleach the color of the paneer", "To dissolve the proteins completely"],
     "Chilling in ice water (4°C) sets the curd, hardens milk fat, improves slicing firmness, and extends retail refrigerated shelf life.")
]

# ==============================================================================
# MOCK 8 PASSAGES
# ==============================================================================
P1_M8_TXT = (
    "Read the following case study on High-Density Planting (HDP) and Canopy Regulation in Mango cv. Amrapali, "
    "and answer the questions that follow:\\n\\n"
    "Traditional mango (Mangifera indica) orchards in India were established at wide spacings (10 m x 10 m to 12 m x 12 m), "
    "accommodating barely 70 to 100 trees per hectare, requiring 10 to 15 years to achieve commercial economic yields. "
    "To modernize mango production, the Division of Fruits and Horticultural Technology at ICAR-IARI, New Delhi, bred the landmark "
    "dwarf hybrid 'Amrapali' (Dashehari x Neelum). Amrapali displays genetic dwarfism, precocious bearing (initiating flowering in the "
    "3rd year), and regular bearing habits. Because of its compact canopy and short internodes, Amrapali is planted in High Density "
    "Planting (HDP) layouts at 2.5 m x 2.5 m spacing in a triangular or square grid, accommodating an astonishing 1,600 plants per hectare. "
    "At this density, HDP Amrapali orchards yield 16 to 22 tonnes of fruit per hectare in early bearing years (compared to 6–8 tonnes in "
    "traditional orchards). However, maintaining long-term productivity in HDP systems requires rigorous canopy management: annual post-harvest "
    "pruning (heading back past fruited shoots to 10–15 cm and thinning overcrowded cross-branches in July-August) ensures solar penetration "
    "into the interior canopy. To guarantee regular annual flowering and suppress excessive vegetative shoot flushes during monsoon, growers "
    "apply 'Paclobutrazol' (Cultar, a gibberellin biosynthesis inhibitor) as a soil collar drench around the trunk basin in September at "
    "1.5 to 3.0 grams active ingredient per meter canopy diameter. Amrapali fruits feature deep orange-red pulp containing 2.5 to 3 times "
    "more beta-carotene (Vitamin A precursor) than parental Dashehari."
)
P1_M8_QS = [
    case_q("Tropical and Subtropical Fruit Production", "Amrapali Parentage Cross",
           "The famous dwarf high-density mango hybrid 'Amrapali' was evolved at ICAR-IARI by crossing which parental varieties?",
           "Dashehari (female) x Neelum (male)",
           ["Neelum x Dashehari (Mallika)", "Alphonso x Banganapalli", "Langra x Chausa"],
           "Amrapali is the progeny of Dashehari crossed with Neelum, inheriting dwarfness from Neelum and sweetness/quality from Dashehari."),
    case_q("Tropical and Subtropical Fruit Production", "HDP Spacing and Tree Population",
     "What is the standard planting spacing and resulting tree population per hectare for an Amrapali High Density orchard?",
     "2.5 m x 2.5 m spacing, accommodating 1,600 trees per hectare",
     ["10 m x 10 m spacing, accommodating 100 trees per hectare", "50 cm x 50 cm spacing, accommodating 100,000 plants", "1 m x 1 m spacing, accommodating 10,000 trees"],
     "Amrapali is planted at 2.5x2.5 m, accommodating 1,600 plants/ha, maximizing early commercial yield per hectare."),
    case_q("Tropical and Subtropical Fruit Production", "Chemical Growth Retardant for Flowering Induction",
     "Which plant growth retardant is applied as a soil drench in September to inhibit vegetative flushes and induce regular flowering in mango?",
     "Paclobutrazol (Cultar)",
     ["Gibberellic acid (GA3)", "Indole-3-acetic acid (IAA)", "Ethylene glycol"],
     "Paclobutrazol inhibits ent-kaurene oxidase in gibberellin synthesis, restricting vegetative vigor and triggering floral bud differentiation."),
    case_q("Tropical and Subtropical Fruit Production", "Post-Harvest Pruning Timing",
     "When should annual canopy regulation and shoot pruning be executed in HDP Amrapali orchards?",
     "Immediately after fruit harvest in July to August",
     ["In peak summer flowering in March", "In freezing mid-winter in December", "Every week throughout the year"],
     "Pruning immediately post-harvest (July-August) allows new vegetative flushes to emerge, mature, and undergo floral differentiation by winter."),
    case_q("Tropical and Subtropical Fruit Production", "Nutritional Distinction of Amrapali Pulp",
     "What nutritional compound is present in remarkably elevated concentrations in ripe Amrapali pulp compared to traditional varieties?",
     "Beta-Carotene (Pro-Vitamin A)",
     ["Vitamin B12", "Caffeine", "Strychnine"],
     "Amrapali contains the highest Vitamin A content (approx. 16,800 IU / 100g pulp) among Indian commercial mango cultivars.")
]

P2_M8_TXT = (
    "Read the following excerpt on the Biochemical Criteria of Essentiality of Plant Nutrients and Micronutrient Deficiencies, "
    "and answer the questions that follow:\\n\\n"
    "Plants absorb dozens of chemical elements from their environment, but only 17 are universally acknowledged as 'Essential Plant Nutrients'. "
    "In 1939, D. I. Arnon and P. R. Stout established the classic three 'Criteria of Essentiality': (1) A plant cannot complete its vegetative "
    "and reproductive life cycle (set viable seed) in the total absence of the element; (2) The requirement is specific to that element, "
    "and cannot be substituted or replaced by any other element; and (3) The element must be directly involved in the internal nutrition "
    "and cellular metabolism of the plant (e.g., as an enzyme constituent, activator, or structural component). In 1987, Nickel (Ni) was "
    "established as the 17th essential element, required as an indispensable cofactor for the metalloenzyme Urease. While macronutrients "
    "(N, P, K, Ca, Mg, S) are required in large quantities (>1,000 mg/kg dry matter), micronutrients (Fe, Mn, Zn, Cu, B, Mo, Cl, Ni) are "
    "functional in minute traces (<100 mg/kg dry matter) but their deficiency induces devastating physiological disorders. For example, "
    "Zinc (Zn) deficiency in lowland flooded rice soils provokes 'Khaira Disease' (rust-colored bronze necrotic pigmentation on young leaves "
    "due to impaired auxin biosynthesis and carbonic anhydrase inactivation, cured by foliar spraying 0.5% ZnSO4). Similarly, Molybdenum (Mo) "
    "deficiency in acidic soils induces 'Whiptail' in cauliflower (blade-less strap-like leaves due to nitrate reductase failure), while Boron (B) "
    "deficiency causes 'Heart Rot' of sugar beet and 'Browning' of cauliflower curds due to impaired carbohydrate translocation and cell wall synthesis."
)
P2_M8_QS = [
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Formulators of Essentiality Criteria",
     "Who formulated the universally accepted three 'Criteria of Essentiality' of plant nutrients in 1939?",
     "D. I. Arnon and P. R. Stout",
     ["Justus von Liebig", "J. B. Lawes and J. H. Gilbert", "Norman Borlaug"],
     "Arnon and Stout established the three core criteria defining essential mineral plant nutrients."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Total Number of Essential Nutrients",
     "How many chemical elements are currently recognized as essential for the growth and reproduction of higher agricultural crops?",
     "17 elements (with Nickel as the 17th element)",
     ["10 elements", "50 elements", "8 elements"],
     "17 elements are recognized: C, H, O, N, P, K, Ca, Mg, S, Fe, Mn, Zn, Cu, B, Mo, Cl, and Ni."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Nickel Physiological Essentiality",
     "Nickel (Ni) is classified as an essential micronutrient because it acts as an indispensable metal cofactor for which enzyme?",
     "Urease (which hydrolyzes urea into ammonia and CO2 in plant tissues)",
     ["Alcohol dehydrogenase", "DNA polymerase", "Cellulase"],
     "Urease requires two nickel ions per active site; without nickel, urea accumulates to toxic levels, causing necrotic leaf tip burn."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Khaira Disease of Rice Causal Deficiency",
     "The widespread 'Khaira Disease' of lowland rice in the Indo-Gangetic plains is a physiological disorder caused by acute deficiency of:",
     "Zinc (Zn)",
     ["Nitrogen (N)", "Iron (Fe)", "Sulfur (S)"],
     "Khaira was discovered by Dr. Y. L. Nene at Pantnagar; zinc deficiency causes bronze chlorosis, cured by applying zinc sulfate."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Whiptail of Cauliflower Causal Deficiency",
     "The 'Whiptail' disorder of cauliflower in acid soils, where leaf blades fail to expand leaving bare midribs, is caused by deficiency of:",
     "Molybdenum (Mo)",
     ["Boron (B)", "Calcium (Ca)", "Potassium (K)"],
     "Molybdenum is the metallic cofactor of nitrate reductase; deficiency at low pH stunts laminar tissue, producing strap-like whiptail leaves.")
]

# ==============================================================================
# MOCK 9 PASSAGES
# ==============================================================================
P1_M9_TXT = (
    "Read the following case study on the Seed Plot Technique in Potato and Viral Degeneration Management, "
    "and answer the questions that follow:\\n\\n"
    "The Potato (Solanum tuberosum) is a vegetatively propagated tuber crop highly susceptible to 'seed degeneration'—the cumulative "
    "build-up of systemic viral pathogens (Potato Leaf Roll Virus / PLRV, Potato Virus Y / PVY, Potato Virus X / PVX) across successive "
    "generations of vegetative tuber multiplication, resulting in catastrophic yield declines. Historically, certified disease-free "
    "seed potatoes could only be multiplied in high-altitude temperate valleys (e.g., Kufri, Himachal Pradesh at >2,500 m elevation) "
    "where freezing cold suppressed aphid vectors. This created massive logistical bottlenecks, as 90% of India's commercial potato crop "
    "is grown in the vast subtropical plains of northern India. To break this dependency, renowned potato breeder Dr. Pushkarnath at "
    "ICAR-CPRI, Shimla, evolved the revolutionary 'Seed Plot Technique' (SPT) in 1959. Entomological studies demonstrated that in the "
    "northern plains (Punjab, Haryana, UP, Bihar), the primary aphid vectors (Myzus persicae and Aphis gossypii) appear only in late winter "
    "and remain below the 'critical economic threshold' of 20 aphids per 100 compound leaves from early October to the end of December. "
    "Under SPT, breeders plant certified seed tubers in early October. The crop grows under low aphid pressure; in late December, before "
    "aphid populations surge above the critical vector threshold, the entire green top canopy is mechanically cut at ground level ('Dehaulming'). "
    "The tubers are left undisturbed in the soil for 10 to 15 days without irrigation to allow the periderm (skin) to suberize and harden, "
    "followed by harvest of healthy, virus-free certified seed tubers."
)
P1_M9_QS = [
    case_q("Solanaceous and Root Vegetable Crops", "Architect of Seed Plot Technique",
           "Who developed the revolutionary 'Seed Plot Technique' (SPT) for potato seed production at ICAR-CPRI?",
           "Dr. Pushkarnath",
           ["Dr. M. S. Swaminathan", "Dr. B. P. Pal", "Dr. Verghese Kurien"],
           "Dr. Pushkarnath pioneered the Seed Plot Technique at CPRI, enabling commercial seed potato production in the northern plains."),
    case_q("Solanaceous and Root Vegetable Crops", "Critical Aphid Vector Threshold",
     "Under the Seed Plot Technique, what is the critical threshold of aphid population above which viral transmission becomes epidemic?",
     "20 aphids per 100 compound potato leaves",
     ["1,000 aphids per single leaf", "Zero aphids", "500 aphids per plant"],
     "When Myzus persicae exceeds 20 aphids/100 compound leaves, systemic viral transmission escalates exponentially."),
    case_q("Solanaceous and Root Vegetable Crops", "Primary Viral Vectors in Potato",
     "Which insect pest serves as the most dangerous and efficient vector transmitting Potato Leaf Roll Virus (PLRV) and PVY?",
     "Green Peach Aphid (Myzus persicae)",
     ["Potato tuber moth", "Root-knot nematode", "Termite"],
     "Myzus persicae is the principal aphid vector capable of acquiring and transmitting PLRV and PVY between potato plants."),
    case_q("Solanaceous and Root Vegetable Crops", "Purpose of Dehaulming Operation",
     "What is the primary agronomic objective of 'Dehaulming' (cutting green foliage stems) in seed potato production?",
     "To halt further tuber enlargement and prevent aphids from transmitting viruses from leaves to underground tubers",
     ["To collect cattle fodder", "To prepare the field for wheat sowing immediately", "To kill potato beetles with fire"],
     "Dehaulming arrests tuber growth at seed size (30–50 g) and severs vascular links before multiplying aphids can transmit foliar viruses to tubers."),
    case_q("Solanaceous and Root Vegetable Crops", "In-Soil Tuber Curing Objective",
     "Why are potato tubers left in the soil for 10 to 15 days after dehaulming before final harvest?",
     "To allow periderm suberization and skin hardening to resist mechanical bruising and storage rot",
     ["To allow tubers to absorb rainwater", "To freeze the tubers solid", "To allow weeds to cover the soil"],
     "Curing in soil promotes suberization of the periderm, hardening the skin so tubers withstand harvesting machinery and post-harvest storage.")
]

P2_M9_TXT = (
    "Read the following excerpt on the Epidemiology, Virology, and Control of Foot and Mouth Disease (FMD) in Livestock, "
    "and answer the questions that follow:\\n\\n"
    "Foot and Mouth Disease (FMD) is an acute, febrile, extraordinarily contagious viral disease afflicting all cloven-footed domesticated "
    "and wild ungulates (cattle, buffaloes, sheep, goats, pigs). The disease is incited by an Aphthovirus belonging to the Picornaviridae family, "
    "a non-enveloped single-stranded positive-sense RNA virus. The virus exists as seven immunologically distinct major serotypes: O, A, C, "
    "Asia-1, SAT-1, SAT-2, and SAT-3, without cross-immunity between serotypes. In India, serotype 'O' is responsible for >80% to 85% of clinical "
    "outbreaks, followed by Asia-1 and A (serotype C has not been detected since 1995). The virus is shed in enormous quantities in breath, saliva, "
    "milk, urine, and ruptured vesicle fluid, spreading rapidly via aerosols over miles. Following an incubation period of 2 to 8 days, infected "
    "animals exhibit high fever (40°C–41°C / 104°F–106°F), profound depression, smacking of lips with profuse ropy drooling salivation, and "
    "the formation of painful fluid-filled vesicles (blisters) on the tongue, dental pad, gums, coronary band of hooves, interdigital clefts, "
    "and teats. When vesicles rupture, they leave raw, bleeding ulcers, causing agonizing lameness ('Foot' lesions) and inability to eat ('Mouth' lesions). "
    "In adult animals, mortality is low (1–5%), but secondary bacterial infections, mastitis, permanent loss of milk production (30–50%), and "
    "respiratory panting due to endocrine thyroid damage ('panting syndrome') cause catastrophic economic ruin. In young calves, the virus causes "
    "peracute myocardial necrosis ('tiger heart'), precipitating sudden death without vesicular signs. The Government of India operates the "
    "National Animal Disease Control Programme (NADCP) to vaccinate 100% of bovine livestock biannually with inactivated trivalent oil-adjuvant vaccine."
)
P2_M9_QS = [
    case_q("Animal Reproduction, AI and Health Management", "FMD Causal Pathogen Classification",
     "Foot and Mouth Disease (FMD) is caused by which viral agent?",
     "Aphthovirus (family Picornaviridae, single-stranded RNA virus)",
     ["Lyssavirus (family Rhabdoviridae)", "Pestivirus (family Flaviviridae)", "Bacillus anthracis bacterium"],
     "FMD is caused by an Aphthovirus of the Picornaviridae family, containing a single-stranded positive-sense RNA genome."),
    case_q("Animal Reproduction, AI and Health Management", "Dominant FMD Serotype in India",
     "Which serotype of FMD virus is responsible for the vast majority (>80%) of clinical disease outbreaks in India?",
     "Serotype O",
     ["Serotype SAT-1", "Serotype C", "Serotype SAT-3"],
     "Serotype O is the dominant endemic serotype in India and South Asia, followed sporadically by Asia-1 and A."),
    case_q("Animal Reproduction, AI and Health Management", "Tiger Heart Pathology in Calves",
     "Why does FMD cause sudden high mortality in young suckling calves without typical vesicular blisters on hooves or mouth?",
     "The virus causes peracute myocardial degeneration and myocarditis, creating striped 'Tiger Heart' lesions",
     ["The virus causes acute kidney rupture", "The virus turns blood into ice", "Calves suffocate due to broken teeth"],
     "In young calves, the virus has high affinity for cardiac muscle cells, causing severe necrotizing myocarditis ('tiger heart') and sudden heart failure."),
    case_q("Animal Reproduction, AI and Health Management", "Long-Term Chronic Sequela in Cattle",
     "Cattle that recover from virulent FMD frequently suffer permanent endocrine and thermoregulatory damage manifested as:",
     "'Panting Syndrome' (rough hair coat, heat intolerance, panting, and permanent drop in milk production)",
     ["Spontaneous transformation into wild buffaloes", "Doubling of body weight every month", "Immunity to all tick parasites"],
     "FMD viral damage to the pituitary and thyroid glands causes 'panting syndrome', leaving cattle heat-intolerant, emaciated, with shaggy coats."),
    case_q("Animal Reproduction, AI and Health Management", "National Control Programme Vaccination",
     "Under the National Animal Disease Control Programme (NADCP) in India, what type of vaccine is administered to cattle and buffaloes?",
     "Biannual vaccination using inactivated trivalent (O, A, Asia-1) oil-adjuvanted vaccine",
     ["Live virulent virus in drinking water", "Oral antibiotics in feed", "Annual homeopathic drops"],
     "NADCP delivers 100% bi-annual vaccination coverage using killed, purified trivalent oil-adjuvanted vaccine containing serotypes O, A, and Asia-1.")
]

# ==============================================================================
# MOCK 10 PASSAGES
# ==============================================================================
P1_M10_TXT = (
    "Read the following case study on Protected Cultivation of Dutch Roses in Climate-Controlled Polyhouses, "
    "and answer the questions that follow:\\n\\n"
    "Commercial cut rose production for domestic luxury florists and international export (Valentine's Day shipments) has transitioned "
    "from open fields to hi-tech naturally ventilated and climate-controlled polyhouses. In protected polyhouses, modern 'Dutch Rose' cultivars "
    "(such as Grand Gala, First Red, Passion, Noblesse, Avalanche) belonging to the Hybrid Tea class are cultivated. Mother plants are propagated "
    "by T-budding or stenting onto vigorous, nematode-tolerant rootstocks, primarily Rosa multiflora or Rosa indica var. odorata. Plants are "
    "established in raised beds filled with sterilized media (soil, cocopeat, and compost) and irrigated via automated pressure-compensating "
    "drip fertigation delivering precise electrical conductivity (EC 1.5 to 1.8 dS/m) and pH (5.5 to 6.2). To build a productive vegetative "
    "framework capable of generating long, thick, premium flowering stems (60 to 80 cm length), growers practice 'Bending' (Arching): "
    "weak, thin, blind, or non-flowering shoots are bent horizontally towards the path at the crown. Bending breaks apical dominance without "
    "removing leaf tissue, transforming the bent shoots into an active photosynthesizing 'solar factory' that pumps carbohydrates into the "
    "crown to force thick, upright, commercial 'bottom breaks' (basal shoots). Stems are harvested at the 'tight bud' stage (when 1–2 outer "
    "petals begin to unfurl, with calyx reflexed downward). Harvested stems are immediately stood in clean buckets of chilled sanitizing water "
    "containing 50 ppm sodium hypochlorite, pre-cooled at 2°C–4°C for 4 hours, and 'pulsed' in a solution containing 2% to 3% sucrose and "
    "200 ppm 8-Hydroxyquinoline Citrate (8-HQC) for 12 to 24 hours to extend vase life."
)
P1_M10_QS = [
    case_q("Ornamental Horticulture, Landscaping and Floriculture", "Standard Rootstock for Greenhouse Roses",
           "Which rose rootstock is most widely used in India for budding greenhouse cut roses due to high vigor and root-knot nematode tolerance?",
           "Rosa multiflora (or Rosa indica var. odorata)",
           ["Rosa canina", "Rosa damascena", "Rosa rubiginosa"],
           "Rosa multiflora provides exceptional root vigor, non-dormant continuous growth, and tolerance to salinity and nematodes under greenhouse conditions."),
    case_q("Ornamental Horticulture, Landscaping and Floriculture", "Bending or Arching Technique Purpose",
     "What is the primary physiological purpose of practicing 'Bending' (Arching) in greenhouse Dutch rose cultivation?",
     "To preserve foliar photosynthetic leaf area while breaking apical dominance to force thick, upright basal flowering shoots",
     ["To kill all spider mites mechanically", "To dry out rose roots", "To prevent leaves from absorbing sunlight"],
     "Bending weak shoots horizontally keeps leaves active photosynthetically, channeling reserves to the crown to generate vigorous flowering basal canes."),
    case_q("Ornamental Horticulture, Landscaping and Floriculture", "Harvesting Maturity Stage for Cut Roses",
     "At what maturity stage should greenhouse cut roses be harvested for long-distance export transport?",
     "Tight bud stage (when 1 to 2 outer sepals reflex downward and outer petals just begin to loosen)",
     ["When all petals are fully open and falling off", "At green vegetative seedling stage", "After hips have formed seeds"],
     "Harvesting at the tight bud stage guarantees transport durability without mechanical petal bruising, allowing flowers to open gracefully in the vase."),
    case_q("Ornamental Horticulture, Landscaping and Floriculture", "Vase Life Pulsing Solution Components",
     "What are the two primary chemical ingredients in a post-harvest 'Pulsing' solution for cut rose stems?",
     "Sucrose sugar (respiratory energy source) and 8-Hydroxyquinoline Citrate (8-HQC germicide)",
     ["Sodium hydroxide and sulfuric acid", "Pure kerosene and formaline", "Common salt and alcohol"],
     "Sucrose provides respiratory carbon for opening flower buds; 8-HQC acidifies water and inhibits bacterial stem-end xylem blockage."),
    case_q("Ornamental Horticulture, Landscaping and Floriculture", "Critical Pest in Polyhouse Roses",
     "Which microscopic pest thrives in warm, dry polyhouse environments, causing stippled bronze speckling on rose foliage and fine webbing?",
     "Two-Spotted Spider Mite (Tetranychus urticae)",
     ["Desert Locust", "Mango shoot borer", "Citrus psylla"],
     "Tetranychus urticae multiplies explosively in hot, dry greenhouse atmospheres, piercing epidermal cells and spinning dense web colonies.")
]

P2_M10_TXT = (
    "Read the following excerpt on Biological Nitrogen Fixation (BNF) and Legume-Rhizobium Symbiosis, "
    "and answer the questions that follow:\\n\\n"
    "Biological Nitrogen Fixation (BNF)—the biochemical reduction of atmospheric dinitrogen gas (N2) into ammonia (NH3)—contributes "
    "over 100 million tonnes of nitrogen annually to global agricultural ecosystems. The most efficient terrestrial BNF association occurs "
    "through the symbiotic relationship between leguminous host plants (family Fabaceae) and soil bacteria belonging to the genera Rhizobium, "
    "Bradyrhizobium, and Sinorhizobium. The infection process is highly host-specific, coordinated by chemical molecular cross-talk: legume "
    "roots secrete specific flavonoids and isoflavonoids into the rhizosphere, which induce bacterial 'nod genes' to synthesize lipo-chitooligosaccharide "
    "signaling molecules called 'Nod Factors'. In response, legume root hairs curl tightly around the bacteria, and an invagination of the host "
    "cell membrane forms an 'Infection Thread'. The bacteria travel through the thread into the root cortex, stimulating cortical cell divisions "
    "that differentiate into a specialized root nodule. Inside cortical cells, bacteria are enclosed within peribacteroid membranes and transform "
    "into swollen, non-dividing metabolic endosymbionts termed 'Bacteroids'. Biological nitrogen reduction is catalyzed by the oxygen-sensitive "
    "enzyme complex 'Nitrogenase' (consisting of an Fe-protein dinitrogenase reductase and an Mo-Fe-protein dinitrogenase). Because the nitrogenase "
    "enzyme is irreversibly inactivated by free molecular oxygen, the legume host synthesizes a specialized pink-red heme-protein called "
    "'Leghemoglobin'. Leghemoglobin possesses an extraordinarily high affinity for oxygen, buffering free O2 to nanomolar concentrations "
    "in the nodule interior to protect nitrogenase while delivering adequate oxygen to support high-rate bacteroid oxidative phosphorylation."
)
P2_M10_QS = [
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Enzyme Complex Catalyzing Nitrogen Fixation",
     "Which enzyme complex is solely responsible for biological reduction of atmospheric dinitrogen into ammonia in root nodules?",
     "Nitrogenase complex (consisting of Mo-Fe protein and Fe protein)",
     ["Nitrate reductase", "Ribulose-1,5-bisphosphate carboxylase", "Urease"],
     "Nitrogenase catalyzes N2 + 8H+ + 8e- + 16 ATP -> 2 NH3 + H2 + 16 ADP + 16 Pi, requiring molybdenum and iron cofactors."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Leghemoglobin Oxygen Scavenging Role",
     "What is the crucial physiological role of the pink heme-protein Leghemoglobin present in active legume nodules?",
     "It buffers and scavenges free oxygen at nanomolar levels to protect oxygen-labile nitrogenase from irreversible inactivation",
     ["It provides red dye to color seeds", "It transports sucrose to leaves", "It poisons soil nematodes"],
     "Leghemoglobin acts as an oxygen buffer: it keeps free O2 near zero to preserve oxygen-sensitive nitrogenase while facilitating O2 flux for respiration."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Initial Chemical Signal from Legume Roots",
     "What group of secondary chemical compounds is secreted by legume root hairs to activate bacterial nodulation genes (nod genes)?",
     "Flavonoids and Isoflavonoids",
     ["Alkaloids like nicotine", "Ethylene gas", "Hydrochloric acid"],
     "Legume roots exude specific flavonoids (e.g., luteolin, daidzein) that bind NodD proteins in compatible Rhizobium, triggering Nod factor synthesis."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Morphological Stage of Endosymbiont inside Nodule",
     "Within the infected host cortical cells of the root nodule, the transformed, swollen, nitrogen-fixing bacterial cells are termed:",
     "Bacteroids",
     ["Spores", "Plasmids", "Mycelia"],
     "Upon release into host cell cytoplasm, rhizobia stop dividing and differentiate into enlarged, irregularly shaped, nitrogen-fixing bacteroids."),
    case_q("Plant Nutrition, Fertilizers and Biofertilizers", "Diagnostic Feature of Functional Nodule",
     "When an active, healthy nitrogen-fixing legume root nodule is sliced open in the field, what characteristic internal color is observed?",
     "Distinct pink to reddish interior color (due to leghemoglobin)",
     ["Chalky white or pale green (denoting inactive/parasitic nodule)", "Pitch black rotten core", "Bright metallic yellow"],
     "A functional, actively fixing nodule has a vivid pink/red interior caused by high leghemoglobin concentration; green/white denotes senescent or ineffective nodules.")
]

PASSAGES_1_10 = [
    ( (P1_M1_TXT, P1_M1_QS), (P2_M1_TXT, P2_M1_QS) ),
    ( (P1_M2_TXT, P1_M2_QS), (P2_M2_TXT, P2_M2_QS) ),
    ( (P1_M3_TXT, P1_M3_QS), (P2_M3_TXT, P2_M3_QS) ),
    ( (P1_M4_TXT, P1_M4_QS), (P2_M4_TXT, P2_M4_QS) ),
    ( (P1_M5_TXT, P1_M5_QS), (P2_M5_TXT, P2_M5_QS) ),
    ( (P1_M6_TXT, P1_M6_QS), (P2_M6_TXT, P2_M6_QS) ),
    ( (P1_M7_TXT, P1_M7_QS), (P2_M7_TXT, P2_M7_QS) ),
    ( (P1_M8_TXT, P1_M8_QS), (P2_M8_TXT, P2_M8_QS) ),
    ( (P1_M9_TXT, P1_M9_QS), (P2_M9_TXT, P2_M9_QS) ),
    ( (P1_M10_TXT, P1_M10_QS), (P2_M10_TXT, P2_M10_QS) )
]

assert len(PASSAGES_1_10) == 10, f"Expected 10 pairs, got {len(PASSAGES_1_10)}"
for m_idx, (p1, p2) in enumerate(PASSAGES_1_10, start=1):
    assert len(p1[1]) == 5, f"Mock {m_idx} P1 has {len(p1[1])} Qs"
    assert len(p2[1]) == 5, f"Mock {m_idx} P2 has {len(p2[1])} Qs"

print(f"Agriculture Passages 1 to 10 compiled successfully: 10 pairs (20 passages, 100 questions).")
'''

with open(out_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Generated {out_path} ({len(content)} bytes)")
