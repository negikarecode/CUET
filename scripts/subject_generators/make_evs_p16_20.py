import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, os.path.dirname(__file__))
from slot_helpers import case_q

# ==============================================================================
# MOCK 16 PASSAGES
# ==============================================================================
P1_M16_TXT = (
    "Read the following atmospheric acid deposition and heritage conservation case study and answer the questions that follow:\n\n"
    "The Taj Mahal in Agra, constructed between 1632 and 1653 out of pure white Makrana marble (calcium carbonate, CaCO3), stands as a sublime architectural "
    "masterpiece. However, by the late 20th century, atmospheric environmental degradation threatened its physical existence. Upwind industrial clusters—specifically "
    "the Mathura Oil Refinery located 50 kilometers northwest, iron foundries, railway shunting yards, and hundreds of coal-fired glass manufacturing units in "
    "Firozabad—discharged immense quantities of sulfur dioxide (SO2) and nitrogen oxides (NOx) into the ambient atmosphere. In the presence of atmospheric "
    "moisture, solar ultraviolet radiation, and suspended catalysts, SO2 oxidizes into sulfur trioxide (SO3) and dissolves in cloud droplets to form dilute "
    "sulfuric acid (H2SO4), precipitating as acid rain (pH < 5.6). When acidic precipitation strikes the crystalline marble, a corrosive chemical reaction occurs: "
    "CaCO3 + H2SO4 + 2H2O -> CaSO4.2H2O + CO2. The crystalline calcium carbonate dissolves and transforms into friable calcium sulfate dihydrate (gypsum), which "
    "leaches away during rains, leaving pitted craters and yellowed stains—a chemical phenomenon termed 'Marble Cancer'. In response to a public interest "
    "litigation filed by environmental lawyer M.C. Mehta, the Supreme Court of India delivered a landmark 1996 verdict. The Court ordered the establishment of "
    "the Taj Trapezium Zone (TTZ)—a 10,400-square-kilometer trapezoidal buffer zone encompassing Agra, Mathura, and Firozabad—and mandated that 292 polluting "
    "industrial units either switch immediately to clean fuels (Compressed Natural Gas, CNG, or Liquefied Petroleum Gas, LPG) or relocate outside the zone. "
    "To restore the discolored marble, the Archaeological Survey of India (ASI) applied non-abrasive 'Multani Mitti' (Fuller's earth) mud-pack poultices, "
    "which gently draw out adsorbed oily soot and particulate grime without scratching the underlying stone."
)
P1_M16_QS = [
    case_q("Monitoring the Environment and Pollution", "Marble Cancer Chemical Reaction",
           "What is the precise chemical mechanism by which acid rain corrodes the Taj Mahal's marble, causing 'Marble Cancer'?",
           "Sulfuric acid (H2SO4) in acid rain reacts with marble's calcium carbonate (CaCO3) to form soluble, powdery gypsum (CaSO4.2H2O)",
           ["Nitric acid reacts with marble to form pure explosive dynamite crystals",
            "Hydrochloric acid reacts with marble to freeze it into solid glacial ice",
            "Carbonic acid converts the white marble into synthetic plastic polymers"],
           "CaCO3 reacts with H2SO4 to yield CaSO4.2H2O (gypsum), which dissolves and spalls off, causing pitting known as marble cancer."),
    case_q("Monitoring the Environment and Pollution", "Primary Industrial SO2 Emitter",
           "Which major petroleum infrastructure located 50 km upwind was identified as a principal source of atmospheric sulfur dioxide (SO2) threatening the monument?",
           "The Mathura Oil Refinery",
           ["The Mumbai High Offshore Oil Platform", "The Digboi Oil Refinery", "The Jamnagar Petrochemical Complex"],
           "The Mathura Refinery, commissioned in the late 1970s, released large loads of SO2 that drifted southeast directly toward Agra."),
    case_q("Monitoring the Environment and Pollution", "Taj Trapezium Zone (TTZ) Demarcation",
           "What is the geographic area and purpose of the 'Taj Trapezium Zone' (TTZ) established by the Supreme Court of India?",
           "A 10,400-square-kilometer defined buffer zone across Agra, Mathura, and Firozabad within which polluting coal-based industries are strictly regulated",
           ["A 10-square-meter garden enclosed inside the central burial chamber of the Taj Mahal",
            "A national highway running from Delhi to Kolkata with no speed limits",
            "An international tax-free zone for foreign luxury chemical manufacturers"],
           "The TTZ spans approx. 10,400 sq km, demarcated to protect the Taj Mahal and other Mughal monuments from industrial air pollution."),
    case_q("Monitoring the Environment and Pollution", "Mandatory Clean Fuel Transition",
           "Under the Supreme Court's landmark 1996 ruling in M.C. Mehta v. Union of India, what clean energy mandate was imposed on regional industries?",
           "Mandatory technological conversion from polluting coal and coke fuels to Compressed Natural Gas (CNG) or Liquefied Petroleum Gas (LPG)",
           ["Mandatory burning of high-sulfur diesel fuel during night hours only",
            "Mandatory usage of wood charcoal harvested from Himalayan national parks",
            "A requirement that all factories burn municipal raw garbage"],
           "The Supreme Court gave 292 industries the choice to either switch over to clean CNG/LPG natural gas or relocate outside the TTZ."),
    case_q("Monitoring the Environment and Pollution", "Multani Mitti Conservation Poultice",
           "Why did the Archaeological Survey of India (ASI) select 'Multani Mitti' (Fuller's earth) clay packs to clean the yellowed marble surfaces?",
           "It acts as a non-abrasive, natural absorbent poultice that draws out embedded soot, grease, and atmospheric hydrocarbons without chemical abrasion",
           ["It permanently coats the marble in a bright green waterproof synthetic paint",
            "It bleaches the stone using high-concentration chlorine gas",
            "It melts the top five centimeters of marble to expose fresh stone"],
           "Multani Mitti mud packs safely adsorb surface particulates, grime, and atmospheric hydrocarbons from porous marble without scratching or chemical erosion.")
]

P2_M16_TXT = (
    "Read the following community forestry and state collaborative governance case study and answer the questions that follow:\n\n"
    "In the early 1970s, the semi-arid lateritic forest tracts of Arabari in the Midnapore district of West Bengal were severely degraded. Decades of colonial "
    "custodial forestry, unauthorized timber illicit felling, and relentless grazing had reduced vast canopy forests of Sal (Shorea robusta) to scrubby, stunted "
    "rootstocks. Traditional forest department policing and criminal trespass cases had alienated the local tribal and rural communities, leading to violent "
    "clashes. In 1971–1972, a visionary Divisional Forest Officer, Dr. Ajit Kumar Banerjee, initiated an unorthodox social experiment across 1,272 hectares of "
    "degraded Arabari forest. Recognizing that state policing could never succeed against impoverished forest-dependent villagers who relied on forest produce "
    "for basic survival, Dr. Banerjee convened open village meetings across 11 neighboring settlements. He formulated an unprecedented mutual pact: if the "
    "villagers agreed to stop illicit felling, stall-feed cattle, and protect the regenerating sal coppice from fire and grazing, the forest department would "
    "provide them immediate wage employment in silvicultural and soil conservation works; free, unrestricted usufruct rights to collect non-timber forest produce "
    "(NTFP)—such as Kendu leaves for bidi rolling, Sal seeds for edible oil extraction, Mahua flowers for brewing and food, and dry fallen twigs for fuel; and, "
    "most radically, a statutory 25 percent cash share of the net commercial revenue realized when the mature Sal timber crop was harvested after 10 to 15 years. "
    "The villagers formed Forest Protection Committees (FPCs). Within a decade, the coppice stumps regenerated into dense, high-canopy Sal timber stands worth "
    "crores of rupees, transforming a degraded wasteland into a thriving socio-ecological asset. The spectacular success of the Arabari experiment served as the "
    "empirical blueprint for India's landmark National Forest Policy, 1988, which officially discarded exclusionary forestry in favor of participatory "
    "'Joint Forest Management' (JFM)."
)
P2_M16_QS = [
    case_q("Human Beings and Nature", "Historic Origin of Joint Forest Management",
           "Where and under whose leadership was the pioneering collaborative community forestry experiment initiated in 1971–1972 that laid the foundation for JFM?",
           "Arabari forest range in Midnapore, West Bengal, spearheaded by Dr. A.K. Banerjee",
           ["Silent Valley in Palakkad, Kerala, led by Prof. M.S. Swaminathan",
            "Ranthambore National Park in Rajasthan, led by Kailash Sankhala",
            "Gir National Park in Gujarat, led by Jim Corbett"],
           "Dr. A.K. Banerjee pioneered the Arabari socio-forestry experiment in West Bengal, creating the foundation for nationwide JFM."),
    case_q("Human Beings and Nature", "Core Economic Incentive for Arabari Villagers",
           "What revolutionary revenue-sharing incentive did the Arabari experiment provide to participating village Forest Protection Committees?",
           "A statutory 25 percent share of the net commercial revenue realized from the final harvesting of mature Sal timber, plus free collection of all NTFPs",
           ["100 percent ownership of all forest department buildings and vehicles",
            "Free international airline tickets to foreign logging conventions",
            "Exemption from paying all municipal and national income taxes forever"],
           "Villagers received wage labor, usufruct rights to NTFPs (sal leaves, seeds, mahua), and a 25% share of the final commercial timber harvest value."),
    case_q("Human Beings and Nature", "Silvicultural Species Regenerated",
           "Which commercially and ecologically valuable native tree species regenerated rapidly from dormant coppice rootstocks under Arabari community protection?",
           "Sal (Shorea robusta)",
           ["Exotic Eucalyptus globulus", "Subabul (Leucaena leucocephala)", "Casuarina equisetifolia"],
           "Sal (Shorea robusta) has remarkable coppicing ability; protected from grazing and fire, dormant stumps vigorously regenerated into high-value timber."),
    case_q("Human Beings and Nature", "Non-Timber Forest Produce (NTFP) Role",
           "How did the statutory right to gather Non-Timber Forest Produce (NTFP) provide immediate livelihood security to rural forest dwellers?",
           "By enabling continuous, non-destructive daily collection of food, fodder, medicinal herbs, Mahua flowers, and Kendu leaves for cash income",
           ["By permitting villagers to clear-cut and export ancient teak logs to overseas markets",
            "By allowing villagers to establish open-cast coal strip mines inside the forest",
            "By authorizing villagers to hunt and sell endangered tiger pelts in urban markets"],
           "NTFPs provide vital non-destructive sustenance and seasonal income (sal seeds, mahua flowers, kendu leaves) without felling living trees."),
    case_q("Human Beings and Nature", "National Forest Policy 1988 Transformation",
           "What fundamental paradigm shift was formally institutionalized by the National Forest Policy, 1988, drawing directly from the Arabari model?",
           "A shift from revenue-maximizing colonial policing to participatory Joint Forest Management (JFM) prioritizing ecological stability and local community needs",
           ["The complete privatization of all national forest land to multinational logging corporations",
            "The permanent expulsion of all tribal communities from all forest areas in India",
            "Declaring that forests should be replaced by industrial palm oil monocultures"],
           "The 1988 NFP revolutionized Indian forestry by emphasizing environmental stability, meeting local tribal subsistence needs, and institutionalizing JFM.")
]

# ==============================================================================
# MOCK 17 PASSAGES
# ==============================================================================
P1_M17_TXT = (
    "Read the following global carbon governance and international climate finance case study and answer the questions that follow:\n\n"
    "Under the 2015 Paris Agreement, Article 6 provides the multilateral legal framework enabling countries to utilize international carbon markets and "
    "voluntary cooperation to achieve and exceed their Nationally Determined Contributions (NDCs). Article 6 is structured around three primary pillars: "
    "1. Article 6.2: a decentralized bilateral or multilateral framework governing the trade of 'Internationally Transferred Mitigation Outcomes' (ITMOs) "
    "between sovereign states; 2. Article 6.4: a centralized, UN-supervised multilateral crediting mechanism (succeeding the Kyoto Protocol's Clean Development "
    "Mechanism, CDM) that certifies emission reduction projects and issues verified carbon credits; and 3. Article 6.8: a framework for non-market collaborative "
    "approaches involving technology transfer, capacity building, and climate finance. A central challenge in international carbon accounting is avoiding "
    "'Double Counting'—a situation where both the host country where the emission reduction occurred and the purchasing country claim the same metric ton of "
    "avoided CO2 toward their respective NDC targets. To ensure absolute environmental integrity, Article 6 mandates the implementation of 'Corresponding "
    "Adjustments': when an ITMO or certified credit is authorized and sold internationally, the host country must add that emission reduction back to its own "
    "national emissions tally, while the purchasing nation deducts it from its inventory. Additionally, projects must fulfill strict 'Additionality' criteria, "
    "proving that the carbon mitigation would not have transpired under a standard business-as-usual scenario without carbon finance. In India, Parliament "
    "enacted the Energy Conservation (Amendment) Act, 2022, establishing the domestic Carbon Credit Trading Scheme (CCTS) administered by the Bureau of "
    "Energy Efficiency (BEE), laying the institutional foundation for compliance and voluntary carbon trading."
)
P1_M17_QS = [
    case_q("International Environmental Treaties and Indian Policy", "Corresponding Adjustments Mandate",
           "In Article 6 carbon market accounting, what is the vital role of a 'Corresponding Adjustment'?",
           "To prevent double counting by ensuring the selling host nation adds the transferred carbon reduction back into its inventory while the buyer deducts it",
           ["To adjust currency exchange rates between the US Dollar and the Euro automatically",
            "To double the recorded carbon emissions of developing countries as an international penalty",
            "To exempt private corporations from paying corporate income taxes"],
           "Corresponding adjustments guarantee environmental integrity by ensuring an emission reduction is counted by exactly one country, eliminating double counting."),
    case_q("International Environmental Treaties and Indian Policy", "Article 6.2 vs Article 6.4 Architecture",
           "How does Article 6.2 differ structurally from Article 6.4 within the Paris Agreement framework?",
           "Article 6.2 governs decentralized bilateral trading of ITMOs between governments, whereas Article 6.4 is a centralized UN-supervised crediting mechanism",
           ["Article 6.2 applies only to Antarctic ice, whereas Article 6.4 applies only to deep oceans",
            "Article 6.2 mandates military interventions, whereas Article 6.4 regulates commercial aviation",
            "Article 6.2 is completely voluntary for animals, whereas Article 6.4 is compulsory for plants"],
           "Article 6.2 allows bilateral government-to-government ITMO transfers; Article 6.4 establishes a centralized UN supervisory body replacing the Kyoto CDM."),
    case_q("International Environmental Treaties and Indian Policy", "Additionality Principle",
           "What must a carbon offset project rigorously prove under the 'Additionality' requirement to qualify for verified carbon credits?",
           "That the greenhouse gas reduction would not have occurred under a business-as-usual scenario without the financial incentive of carbon credits",
           ["That the project planted exactly one billion trees on an agricultural farm",
            "That the project owner has lived in the country for at least fifty years",
            "That the project produces zero financial profit for its investors"],
           "Additionality requires proof that project emissions reductions are surplus to what would have happened anyway under baseline regulatory or economic conditions."),
    case_q("International Environmental Treaties and Indian Policy", "Indian Domestic Carbon Scheme (CCTS)",
           "Which statutory body is empowered under the Energy Conservation (Amendment) Act 2022 to administer India's Carbon Credit Trading Scheme (CCTS)?",
           "The Bureau of Energy Efficiency (BEE)",
           ["The Reserve Bank of India (RBI)", "The Geological Survey of India (GSI)", "The National Highways Authority of India (NHAI)"],
           "The Bureau of Energy Efficiency (BEE), under the Ministry of Power, is the designated administrator of the Indian Carbon Credit Trading Scheme (CCTS)."),
    case_q("International Environmental Treaties and Indian Policy", "Article 6.8 Non-Market Pillar",
           "What distinguishes Article 6.8 from the market mechanisms of Articles 6.2 and 6.4 in the Paris Agreement?",
           "It focuses on non-market collaborative approaches, including direct climate finance, technology transfer, and joint adaptation initiatives without carbon credit trading",
           ["It legalizes the unregulated international dumping of hazardous industrial wastes",
            "It establishes a global stock exchange for trading rare wildlife species",
            "It mandates that all international climate treaties be dismantled permanently"],
           "Article 6.8 provides a non-market pathway for international cooperation, focusing on adaptation, technology transfer, and capacity-building without market units.")
]

P2_M17_TXT = (
    "Read the following urban acoustics and environmental jurisprudence case study and answer the questions that follow:\n\n"
    "Noise pollution—defined as unwanted, disruptive, or excessive sound that interferes with human health, communication, and well-being—is an acute environmental "
    "hazard in India's densely populated urban centers. Ambient sound intensity is measured on the logarithmic A-weighted Decibel scale [dB(A)], designed to mimic "
    "the human ear's frequency response. Because the decibel scale is logarithmic, an increase of 10 dB represents a tenfold increase in acoustic energy, and a "
    "20 dB increase represents a hundredfold surge. Chronic exposure to ambient noise exceeding 75–85 dB(A) induces permanent sensorineural hearing loss (tinnitus, "
    "auditory threshold shift), while non-auditory physiological impacts include elevated cortisol levels, chronic hypertension, sleep fragmentation, cognitive "
    "impairment in school children, and increased risk of ischemic cardiovascular disease. To regulate this pollutant, the Ministry of Environment and Forests "
    "notified the Noise Pollution (Regulation and Control) Rules, 2000, under the Environment (Protection) Act, 1986. The Rules divide urban spaces into four "
    "functional categories, setting strict Day (6:00 AM to 10:00 PM) and Night (10:00 PM to 6:00 AM) ambient limits: 1. Industrial Zone: 75 dB(A) day / 70 dB(A) "
    "night; 2. Commercial Zone: 65 dB(A) day / 55 dB(A) night; 3. Residential Zone: 55 dB(A) day / 45 dB(A) night; and 4. Silence Zone: 50 dB(A) day / 40 dB(A) "
    "night. A 'Silence Zone' is statutorily defined as an area extending 100 meters around hospitals, educational institutions, and courts of law. Under Rule 5, "
    "the use of public loudspeakers, public address systems, or sound-producing instruments is strictly prohibited during nighttime hours (10:00 PM to 6:00 AM), "
    "with state governments permitted to relax this curfew for a maximum of 15 days in an entire calendar year for recognized religious and cultural festivals. "
    "In the landmark Noise Pollution In Re (2005) case, the Supreme Court ruled that the right to a quiet, undisturbed sleep is an integral dimension of the "
    "Fundamental Right to Life under Article 21 of the Indian Constitution."
)
P2_M17_QS = [
    case_q("Monitoring the Environment and Pollution", "Statutory Origin of Noise Rules",
           "Under which primary environmental statute were the Noise Pollution (Regulation and Control) Rules, 2000, enacted by the Central Government?",
           "The Environment (Protection) Act, 1986",
           ["The Indian Penal Code, 1860", "The Factories Act, 1948", "The Ancient Monuments Preservation Act, 1904"],
           "The Noise Pollution Rules 2000 were notified under the overarching delegated rule-making authority of the Environment (Protection) Act 1986."),
    case_q("Monitoring the Environment and Pollution", "Silence Zone Statutory Definition",
           "In environmental law, how is a 'Silence Zone' precisely demarcated, and what are its ambient noise standards?",
           "An area extending 100 meters around hospitals, educational institutions, and courts; limits are 50 dB(A) by day and 40 dB(A) by night",
           ["A 5-kilometer zone around airports with standards of 90 dB(A) day and 80 dB(A) night",
            "An underground soundproof room inside a recording studio with 0 dB(A)",
            "A commercial market zone with limits of 75 dB(A) day and 70 dB(A) night"],
           "A Silence Zone is legally defined as an area within 100 meters of hospitals, schools/colleges, and courts, with limits of 50 dB day / 40 dB night."),
    case_q("Monitoring the Environment and Pollution", "Logarithmic Decibel Nature",
           "Because acoustic sound levels are measured on a logarithmic decibel [dB(A)] scale, what physical surge in sound energy occurs when noise rises from 50 dB to 70 dB?",
           "A 100-fold (hundredfold) increase in acoustic sound energy",
           ["A 20-fold increase in sound energy", "A 2-fold (double) increase in sound energy", "No increase in acoustic energy at all"],
           "On a logarithmic decibel scale, each 10 dB jump multiplies acoustic sound power by a factor of 10. Thus, a 20 dB rise represents 10 x 10 = 100-fold energy."),
    case_q("Monitoring the Environment and Pollution", "Nighttime Loudspeaker Curfew",
           "Under Rule 5 of the Noise Pollution Rules, 2000, what is the statutory nighttime curfew on operating public address loudspeakers?",
           "A complete ban between 10:00 PM and 6:00 AM, with state governments allowed to grant exemptions for at most 15 festive days per calendar year",
           ["A ban between 12:00 midnight and 1:00 AM only on weekends",
            "Loudspeakers are permitted to operate at maximum volume 24 hours a day",
            "Loudspeakers are prohibited during morning daylight hours between 8:00 AM and 2:00 PM"],
           "Loudspeakers are prohibited between 10:00 PM and 6:00 AM, with a maximum 15-day annual relaxation for festivals, which must still terminate by midnight."),
    case_q("Monitoring the Environment and Pollution", "Constitutional Article 21 Enshrinement",
           "In the landmark Noise Pollution In Re (2005) decision, under which Article of the Constitution did the Supreme Court recognize freedom from noise pollution?",
           "Article 21 (Right to Life and Personal Liberty, encompassing the right to peace, sleep, and well-being)",
           ["Article 14 (Right to Equality)", "Article 25 (Freedom of Religion)", "Article 324 (Powers of the Election Commission)"],
           "The Supreme Court affirmed that freedom from noise pollution and the right to peaceful sleep are integral facets of the Right to Life under Article 21.")
]

# ==============================================================================
# MOCK 18 PASSAGES
# ==============================================================================
P1_M18_TXT = (
    "Read the following river basin rejuvenation and aquatic conservation case study and answer the questions that follow:\n\n"
    "The Ganga River, stretching 2,525 kilometers from its glacial origin at Gangotri to the Bay of Bengal, is India's most sacred and populous river basin, "
    "supporting over 400 million people. Decades of untreated municipal sewage (over 3,000 MLD), industrial discharges, and severe hydrological abstractions "
    "reduced vast stretches of the river to toxic sewers. A catastrophic industrial hotspot existed at Jajmau in Kanpur, where over 400 leather tanneries "
    "discharged untreated effluents laden with highly toxic hexavalent chromium (Cr VI)—a potent mutagen and carcinogen—alongside high biochemical oxygen demand "
    "(BOD) and chemical oxygen demand (COD), destroying aquatic biodiversity. In 2014, the Government launched the integrated flagship program 'Namami Gange' "
    "with a financial outlay of over 20,000 crore rupees, executed by the National Mission for Clean Ganga (NMCG) under the overarching authority of the "
    "National Ganga Council (chaired by the Prime Minister). To address historical failures where municipal sewage treatment plants (STPs) fell into disrepair "
    "due to unpaid municipal operating bills, Namami Gange introduced the 'Hybrid Annuity Model' (HAM): the central government pays 40 percent of the capital cost "
    "during construction, while the remaining 60 percent is disbursed as operational annuities over a 15-year period linked strictly to verified effluent discharge "
    "quality standards. Crucially, in October 2018, NMCG issued a historic statutory notification mandating minimum 'Environmental Flows' (E-flows) across the "
    "Upper Ganga Basin (from Gangotri to Unnao). Hydroelectric dams and barrages (such as Tehri, Bhimgoda, and Narora) are legally bound to release continuous "
    "ecological flows (20–36% of flow during dry seasons) to sustain the river's ecological connectivity, sediment transport, and flagship aquatic wildlife: "
    "the blind Gangetic River Dolphin (Platanista gangetica)—India's National Aquatic Animal—the critically endangered Gharial (Gavialis gangeticus), and the Golden Mahseer."
)
P1_M18_QS = [
    case_q("Monitoring the Environment and Pollution", "Kanpur Tannery Toxic Effluent",
           "What hazardous, carcinogenic heavy metal was discharged in massive quantities by the leather tanneries of Jajmau (Kanpur), severely polluting the Ganga?",
           "Hexavalent Chromium [Cr(VI)]",
           ["Pure metallic gold", "Radioactive Uranium-235", "Magnesium sulfate crystals"],
           "Chrome tanning processes release toxic Hexavalent Chromium [Cr(VI)], a persistent carcinogenic heavy metal that contaminates river sediments and bioaccumulates."),
    case_q("Monitoring the Environment and Pollution", "Hybrid Annuity Model (HAM) Innovation",
           "How does the Hybrid Annuity Model (HAM) under Namami Gange ensure the long-term operational success of newly constructed sewage treatment plants (STPs)?",
           "By paying 40% capital costs during construction and tying the remaining 60% to performance-based operational annuities over 15 years linked to effluent quality",
           ["By making private contractors build plants for free without any financial compensation",
            "By handing over sewage treatment plants to international tourist cruise operators",
            "By shutting down all treatment plants during the monsoon season every year"],
           "HAM links ongoing 15-year annuity payments to verified effluent quality standards, eliminating the historical problem of abandoned municipal STPs."),
    case_q("Monitoring the Environment and Pollution", "Historic 2018 E-Flows Mandate",
           "What was the groundbreaking legal and ecological significance of the NMCG's October 2018 notification on the Ganga River?",
           "It statutorily mandated minimum Environmental Flows (E-flows) that dams and barrages must continuously release to preserve downstream river ecology",
           ["It ordered the total permanent draining of the Ganga River to build a subway rail network",
            "It banned all swimming and spiritual bathing across the entire river length forever",
            "It declared that the Ganga River is an artificial man-made canal"],
           "The 2018 notification made India the first developing nation to legally mandate minimum environmental flows (E-flows) across a major river basin."),
    case_q("Monitoring the Environment and Pollution", "National Aquatic Animal of India",
           "Which flagship freshwater species, serving as a vital bio-indicator of the Ganga's ecological health, was declared the National Aquatic Animal of India?",
           "The Gangetic River Dolphin (Platanista gangetica)",
           ["The Great White Shark", "The Indian Mugger Crocodile", "The Blue Whale"],
           "The Gangetic River Dolphin (Platanista gangetica), a nearly blind freshwater cetacean that hunts using echolocation, is India's National Aquatic Animal."),
    case_q("Monitoring the Environment and Pollution", "National Ganga Council Leadership",
           "Who serves as the ex-officio Chairperson of the apex National Ganga Council for River Ganga (Rejuvenation, Protection and Management)?",
           "The Prime Minister of India",
           ["The Union Minister of Railways", "The Chief Minister of Uttar Pradesh", "The Director General of the World Bank"],
           "The National Ganga Council is an apex inter-state constitutional body chaired directly by the Prime Minister of India.")
]

P2_M18_TXT = (
    "Read the following agricultural biotechnology and ecological resistance case study and answer the questions that follow:\n\n"
    "In 2002, the Genetic Engineering Appraisal Committee (GEAC) approved the commercial release of India's first transgenic crop: Bt Cotton. Engineered "
    "with genes (Cry1Ac and later Cry2Ab in Bollgard II) derived from the entomopathogenic soil bacterium Bacillus thuringiensis, the crop produces crystalline "
    "delta-endotoxin proteins inside plant tissues. When targeted lepidopteran insect pests—primarily the devastating American Bollworm (Helicoverpa armigera)—ingest "
    "the plant tissue, the high alkaline pH of the insect midgut dissolves the protoxin crystal, and gut proteases cleave it into an active toxin. The toxin "
    "binds specifically to cadherin receptors on the microvillar membrane of midgut epithelial cells, creating pores that cause osmotic cell lysis, paralysis, "
    "and starvation death of the caterpillar. In the first decade of adoption, Bt cotton revolutionized Indian agriculture: synthetic chemical insecticide "
    "sprays plummeted by over 50 percent, and national cotton production doubled, transforming India into a premier global cotton exporter. However, ecological "
    "shortcomings soon emerged. To prevent insects from developing physiological resistance, regulatory guidelines mandated the 'Refugia' strategy: farmers "
    "must plant 20 percent of their cotton plot borders with non-Bt cotton (or 5 percent with pigeon pea). The non-Bt refuge crops maintain a population of "
    "homozygous susceptible bollworms (ss) that mate with the rare homozygous resistant mutants (rr) emerging from the Bt crop, producing heterozygous offspring (rs) "
    "that remain susceptible to high-dose Bt toxin. Because millions of smallholder Indian farmers failed to plant non-Bt refugia due to land constraints, the "
    "Pink Bollworm (Pectinophora gossypiella) evolved widespread resistance across Gujarat, Maharashtra, and Andhra Pradesh. Concurrently, the eradication of "
    "bollworms created an ecological vacuum, sparking 'Secondary Pest Surges' of sap-sucking hemipteran insects (such as whiteflies, jassids, and mealybugs) "
    "that are completely immune to Bt Cry toxins, requiring farmers to resume heavy pesticide applications."
)
P2_M18_QS = [
    case_q("Human Beings and Nature", "Bt Endotoxin Insecticidal Mechanism",
           "How does the crystalline Cry delta-endotoxin protein expressed by Bt cotton selectively destroy targeted bollworm caterpillars?",
           "The alkaline midgut of the caterpillar activates the protoxin, which binds to gut epithelial receptors, puncturing cell membranes and causing osmotic lysis",
           ["The protein freezes the insect's blood into solid ice within three seconds",
            "The protein produces a high-voltage electric shock that electrocutes the pest",
            "The protein emits a sweet scent that entices the insect to commit suicide in ponds"],
           "Bt protoxins dissolve in the alkaline caterpillar midgut, where protease-cleaved toxins form lethal lytic pores in epithelial membranes."),
    case_q("Human Beings and Nature", "Biological Purpose of Non-Bt Refugia",
           "What is the crucial evolutionary genetics rationale behind the mandatory planting of non-Bt 'Refugia' crops alongside Bt cotton fields?",
           "To maintain a surviving population of Bt-susceptible insects to mate with rare resistant mutants, diluting resistance alleles and delaying pest resistance",
           ["To provide delicious food for domestic dairy cows in adjacent pastures",
            "To attract beneficial honeybees from European countries to pollinate crops",
            "To absorb solar ultraviolet radiation and protect the transgenic cotton from sun damage"],
           "Refugia provide a reservoir of homozygous susceptible insects (ss); when they mate with rare resistant mutants (rr), heterozygous offspring (rs) are killed by Bt toxin."),
    case_q("Human Beings and Nature", "Pink Bollworm Resistance Crisis",
           "Which devastating pest evolved widespread field-level resistance to Bollgard I (Cry1Ac) and Bollgard II (Cry1Ac+Cry2Ab) toxins in Central and Western India?",
           "The Pink Bollworm (Pectinophora gossypiella)",
           ["The Desert Locust", "The Colorado Potato Beetle", "The Fall Armyworm"],
           "Lack of adherence to the refugia strategy accelerated the evolution of Cry toxin resistance in the Pink Bollworm across major cotton belts."),
    case_q("Human Beings and Nature", "Secondary Pest Surge Ecological Phenomenon",
           "What ecological imbalance transpired when broad-spectrum pesticide use dropped following widespread Bt cotton adoption?",
           "An aggressive surge in sap-sucking secondary pests (such as whiteflies, jassids, and mealybugs) that are inherently immune to Bt Cry toxins",
           ["A massive invasion of carnivorous tigers into cotton agricultural fields",
            "The total extinction of all earthworms and beneficial nitrogen-fixing soil bacteria",
            "The transformation of cotton plants into giant poisonous woody trees"],
           "Bt toxins exclusively kill target lepidopteran larvae, allowing non-target sap-sucking hemipterans (whiteflies, jassids) to proliferate as secondary pests."),
    case_q("Human Beings and Nature", "Regulatory Approval Authority",
           "Which apex statutory committee under the Ministry of Environment, Forest and Climate Change evaluates and approves the environmental release of GMOs in India?",
           "The Genetic Engineering Appraisal Committee (GEAC)",
           ["The Food Safety and Standards Authority of India (FSSAI)",
            "The University Grants Commission (UGC)",
            "The Indian Council of Historical Research (ICHR)"],
           "The Genetic Engineering Appraisal Committee (GEAC), established under the EPA 1986 rules of 1989, is the apex statutory regulator for GMO releases.")
]

# ==============================================================================
# MOCK 19 PASSAGES
# ==============================================================================
P1_M19_TXT = (
    "Read the following nuclear technology, radiation safety, and radioactive waste case study and answer the questions that follow:\n\n"
    "On April 26, 1986, Unit 4 of the Chernobyl Nuclear Power Plant in Ukraine (then USSR) suffered the worst disaster in commercial nuclear power history. "
    "During an ill-conceived unauthorized test of the steam turbine generator's power run-down capabilities at low reactor power, operators violated multiple "
    "mandatory safety protocols, withdrawing almost all control rods. The reactor design—an RBMK-1000 graphite-moderated, water-cooled system—possessed a "
    "dangerous inherent physical flaw: a 'Positive Void Coefficient' of reactivity. When cooling water boiled into steam bubbles ('voids'), neutron absorption "
    "plummeted while moderation by graphite remained high, causing a runaway, uncontrollable thermal power surge. The power spiked to over 100 times nominal capacity "
    "within seconds, vaporizing fuel cladding and triggering two colossal steam explosions that blew off the 1,000-tonne concrete reactor upper lid. The exposed "
    "burning graphite core ignited a fire that raged for ten days, ejecting over 5.2 exabecquerels of volatile radioactive fission products into the troposphere "
    "and stratosphere. The radioactive cloud drifted across Europe, dispersing short-lived Iodine-131 (half-life 8 days, which bioaccumulates in the thyroid "
    "gland, causing pediatric thyroid carcinomas) and long-lived Cesium-137 (half-life 30.1 years) and Strontium-90 (half-life 28.8 years, which mimics calcium "
    "and integrates into bone hydroxyapatite, inducing leukemia). Managing nuclear fission waste requires strict lifecycle segregation. While Low-Level Waste (LLW) "
    "and Intermediate-Level Waste (ILW) can be compacted and buried in near-surface engineered trenches, spent reactor fuel and High-Level Waste (HLW)—rich in "
    "transuranic actinides (Plutonium, Americium) that remain radiotoxic for hundreds of thousands of years—demand absolute geological isolation. In advanced "
    "fuel cycles (including India's closed three-stage Bhabha program), spent fuel is reprocessed to recover unspent Uranium and Plutonium. The residual high-level "
    "liquid acidic waste is immobilized through 'Vitrification'—homogeneously incorporating radioactive oxides into a molten Borosilicate Glass matrix at 1,150°C, "
    "pouring it into stainless-steel canisters, and storing it in deep underground Deep Geological Repositories (DGR) embedded in stable crystalline granite."
)
P1_M19_QS = [
    case_q("International Environmental Treaties and Indian Policy", "Positive Void Coefficient Flaw",
           "What inherent physical design defect in the Chernobyl RBMK reactor caused the runaway explosive power surge?",
           "A Positive Void Coefficient of reactivity: boiling water into steam bubbles reduced neutron absorption, rapidly escalating nuclear fission power",
           ["The reactor was powered entirely by explosive dynamite rather than uranium",
            "The reactor had no concrete floor, allowing magma to leak into the earth",
            "The electrical wiring was constructed entirely of flammable cardboard"],
           "In an RBMK reactor, steam voids decrease neutron absorption without hurting graphite moderation, causing power to spike uncontrollably."),
    case_q("International Environmental Treaties and Indian Policy", "Thyroid Cancer Fallout Isotope",
           "Which volatile radioactive isotope released during the Chernobyl fallout accumulated in the human thyroid gland, triggering pediatric thyroid carcinomas?",
           "Iodine-131 (half-life 8.02 days)",
           ["Helium-4", "Carbon-12", "Nitrogen-14"],
           "Radioactive Iodine-131 is readily absorbed by the thyroid gland, leading to thyroid cancer; prophylactic potassium iodide tablets block its uptake."),
    case_q("International Environmental Treaties and Indian Policy", "Bone-Seeking Radioisotopes",
           "Why are Strontium-90 and Cesium-137 isotopes particularly dangerous when ingested through contaminated milk and agricultural food crops?",
           "Strontium-90 chemically mimics calcium, integrating into bone marrow and inducing leukemia, while Cesium-137 mimics potassium, irradiating muscle tissue",
           ["They turn human bones into pure transparent glass",
            "They cause human skin to reflect all visible light into total darkness",
            "They evaporate all water molecules inside the human blood vessels instantly"],
           "Sr-90 is a calcium analog that integrates into bones and teeth, causing leukemia and bone cancer; Cs-137 acts like potassium, irradiating whole-body soft tissue."),
    case_q("International Environmental Treaties and Indian Policy", "Vitrification Immobilization Technology",
           "In high-level radioactive waste management, what is the chemical engineering process of 'Vitrification'?",
           "Incorporating concentrated radioactive waste oxides homogeneously into a molten borosilicate glass matrix at high temperatures to prevent leaching",
           ["Dissolving radioactive spent fuel in household cooking oil and pouring it down municipal drains",
            "Compressing radioactive sludge into solid ice cubes stored in household refrigerators",
            "Baking radioactive waste into ceramic dinner plates for commercial sale"],
           "Vitrification fuses toxic radioactive fission oxides into insoluble, highly leach-resistant borosilicate glass canisters for permanent repository storage."),
    case_q("International Environmental Treaties and Indian Policy", "Homi Bhabha Closed Nuclear Fuel Cycle",
           "How does India's unique three-stage nuclear power program, envisioned by Dr. Homi J. Bhabha, optimize resource utilization and minimize ultimate high-level waste?",
           "By adopting a 'Closed Fuel Cycle' that chemically reprocesses spent fuel to extract Plutonium-239 and breed fissile Uranium-233 from vast Thorium reserves",
           ["By importing 100 percent of all nuclear reactor components from Arctic research centers",
            "By disposing of all radioactive fuel in the Indian Ocean immediately after single use",
            "By converting nuclear power plants into coal-fired brick kilns after five years"],
           "Bhabha's closed fuel cycle reprocesses spent fuel to harness India's vast Thorium deposits in fast breeder reactors, drastically reducing final waste volume.")
]

P2_M19_TXT = (
    "Read the following subnational governance, data metrics, and sustainable development case study and answer the questions that follow:\n\n"
    "In September 2015, the United Nations General Assembly adopted the 2030 Agenda for Sustainable Development, comprising 17 Sustainable Development Goals "
    "(SDGs) and 169 actionable targets. To translate these global goals into concrete national and subnational outcomes, the Government of India designated "
    "NITI Aayog (the National Institution for Transforming India) as the nodal agency for SDG coordination and monitoring across the country. Recognizing "
    "that India's success is indispensable to the world achieving the 2030 Agenda, NITI Aayog pioneered the 'SDG India Index & Dashboard' in 2018. Developed "
    "in collaboration with the Ministry of Statistics and Programme Implementation (MoSPI), the United Nations in India, and state governments, the index "
    "evaluates the progress of all 28 States and 8 Union Territories across 16 of the 17 SDGs using over 100 objective statistical indicators. The index "
    "calculates a composite score ranging from 0 to 100 for each state, classifying them into four distinct performance categories: 1. Aspirant (Score 0–49); "
    "2. Performer (Score 50–64); 3. Front Runner (Score 65–99); and 4. Achiever (Score 100). The index has fostered a spirited dynamic of 'Cooperative and "
    "Competitive Federalism', where states actively compete, benchmark best practices, and allocate budgetary resources toward lagging goals. Southern states, "
    "most notably Kerala and Tamil Nadu, have consistently emerged as overall Front Runners due to high investments in universal healthcare (SDG 3), quality "
    "education (SDG 4), and poverty eradication (SDG 1). Crucially, NITI Aayog spearheaded the 'Localization of SDGs'—institutionalizing District Indicator "
    "Frameworks (DIF) and Gram Panchayat Development Plans (GPDP) to decentralize goal monitoring directly to grassroots administrative units."
)
P2_M19_QS = [
    case_q("Human Beings and Nature", "Nodal Agency for SDGs in India",
           "Which premier policy think-tank of the Government of India serves as the nodal coordinating and monitoring institution for the Sustainable Development Goals?",
           "NITI Aayog (National Institution for Transforming India)",
           ["The Union Public Service Commission (UPSC)",
            "The Reserve Bank of India (RBI)",
            "The National Highway Traffic Safety Administration"],
           "NITI Aayog is the designated nodal agency entrusted with monitoring, coordinating, and localizing the UN SDGs across all Indian states."),
    case_q("Human Beings and Nature", "SDG India Index Classification Bands",
           "According to NITI Aayog's SDG India Index scoring methodology, what are the four standardized performance tiers?",
           "Aspirant (0–49), Performer (50–64), Front Runner (65–99), and Achiever (100)",
           ["Novice (0–10), Average (11–50), Advanced (51–90), Master (91–100)",
            "Fail (0–33), Third Division (34–50), Second Division (51–60), First Division (61–100)",
            "Red Zone, Orange Zone, Yellow Zone, and Green Zone"],
           "NITI Aayog categorizes state performance into: Aspirant (0-49), Performer (50-64), Front Runner (65-99), and Achiever (100)."),
    case_q("Human Beings and Nature", "Consistent Front Runner State",
           "Which Indian state has consistently secured top ranking on NITI Aayog's composite SDG India Index, excelling in health, education, and sanitation?",
           "Kerala",
           ["Bihar", "Uttar Pradesh", "Jharkhand"],
           "Kerala consistently ranks first on the composite SDG India Index, propelled by decades of social development in healthcare, literacy, and gender equality."),
    case_q("Human Beings and Nature", "Cooperative and Competitive Federalism Dynamic",
           "How does the SDG India Index leverage 'Competitive Federalism' to accelerate sustainable development outcomes across states?",
           "By providing transparent, objective data benchmarking that spurs peer competition, highlights regional disparities, and drives targeted budget allocations",
           ["By imposing direct military curfews on states that score below 50 points",
            "By taking away the voting rights of citizens residing in lower-ranking states",
            "By shutting down all hospitals in underperforming districts"],
           "Transparent annual ranking fosters healthy peer competition among states, motivating chief ministers to address governance gaps in lagging indicators."),
    case_q("Human Beings and Nature", "Localization of SDGs Concept",
           "What is meant by the strategic administrative initiative termed 'Localization of SDGs' in the Indian context?",
           "Translating high-level national targets into District and Panchayat-level Indicator Frameworks for grassroots planning and monitoring",
           ["Translating UN documents into foreign European languages only",
            "Banning all rural panchayats from discussing environmental matters",
            "Restricting sustainable development policies exclusively to New Delhi"],
           "Localization of SDGs breaks down national goals into village (GPDP) and district action plans, ensuring grassroots execution and monitoring.")
]

# ==============================================================================
# MOCK 20 PASSAGES
# ==============================================================================
P1_M20_TXT = (
    "Read the following ecological footprint, resource accounting, and carrying capacity case study and answer the questions that follow:\n\n"
    "To quantify humanity's aggregate impact on the biosphere, ecological economists Mathis Wackernagel and William Rees formulated the concept of the "
    "'Ecological Footprint' in the early 1990s. The Ecological Footprint measures the total biologically productive land and water surface area—including "
    "cropland, grazing land, fishing grounds, built-up urban infrastructure, and forest area required to assimilate anthropogenic carbon dioxide emissions—necessary "
    "to provide the renewable natural resources a given human population consumes and to absorb the wastes it generates, using prevailing technology. "
    "Both the Ecological Footprint and the corresponding 'Biocapacity' (the capacity of ecosystems to regenerate biological resources and absorb waste) are "
    "standardized in a universal metric unit: the 'Global Hectare' (gha)—a biologically productive hectare with world-average bioproductivity. Comparing "
    "humanity's aggregate footprint against global biocapacity reveals whether the global socio-economic system operates within planetary boundaries. "
    "According to the Global Footprint Network, humanity's total ecological footprint currently exceeds Earth's annual regenerative biocapacity by over 75 percent, "
    "meaning humanity consumes ecological resources as if living on 1.75 planet Earths. This structural deficit is termed 'Ecological Overshoot'. Each year, "
    "the date on which humanity's resource demand exceeds Earth's regenerative budget for that entire calendar year is marked as 'Earth Overshoot Day'. "
    "In the early 1970s, Earth Overshoot Day fell in late December; today, it has advanced into late July or early August. Among the various footprint components, "
    "the 'Carbon Footprint'—the forest area required to sequester industrial carbon emissions—is the largest and fastest-growing, accounting for approximately "
    "60 percent of humanity's total ecological footprint. When a nation's ecological footprint surpasses its domestic biocapacity, it becomes an 'Ecological Debtor', "
    "surviving by depleting its natural capital (deforestation, aquifer overdraft) or importing biocapacity from other nations."
)
P1_M20_QS = [
    case_q("Human Beings and Nature", "Ecological Footprint Core Definition",
           "What does the 'Ecological Footprint' metric fundamentally quantify in environmental resource accounting?",
           "The total biologically productive land and water area required to produce the resources a population consumes and absorb the wastes it generates",
           ["The physical size of leather shoes manufactured by an industrial factory",
            "The geographic surface area covered by all asphalt roads in a country",
            "The volume of atmospheric oxygen inhaled by an individual over a lifetime"],
           "Ecological Footprint measures the biologically productive area needed to provide renewable resources and absorb CO2 waste for a given human population."),
    case_q("Human Beings and Nature", "Global Hectare (gha) Standard Unit",
           "What standardized international metric unit is utilized to measure both Ecological Footprint and planetary Biocapacity?",
           "Global Hectares (gha)",
           ["Kilowatt-hours (kWh)", "Barrels of crude petroleum", "Parts per million (ppm)"],
           "A global hectare (gha) is a standardized hectare of biologically productive space with world average productivity, allowing universal comparison."),
    case_q("Human Beings and Nature", "Dominant Footprint Component",
           "Which component forms the single largest and fastest-growing proportion (approx. 60%) of humanity's total ecological footprint?",
           "The Carbon Footprint (forest land area required to sequester greenhouse gas emissions)",
           ["The Cropland Footprint", "The Built-up Urban Land Footprint", "The Fishing Grounds Footprint"],
           "The carbon footprint makes up roughly 60% of humanity's overall ecological footprint, driving the rapid expansion of global ecological overshoot."),
    case_q("Human Beings and Nature", "Earth Overshoot Day Significance",
           "What critical milestone does 'Earth Overshoot Day' mark on the annual calendar?",
           "The calendar date when humanity's cumulative resource consumption for that year exceeds Earth's annual biological regenerative capacity",
           ["The specific day when the earth passes closest to the sun during winter",
            "The international holiday celebrating the invention of commercial plastics",
            "The day when all human satellites orbit the planet simultaneously"],
           "Earth Overshoot Day marks the date when humanity's demand for biological resources surpasses what Earth can regenerate in that entire year."),
    case_q("Human Beings and Nature", "Ecological Debtor Nation Definition",
           "In biocapacity accounting, when is a nation formally categorized as an 'Ecological Debtor'?",
           "When its domestic Ecological Footprint exceeds the biological regenerative biocapacity of its national territory",
           ["When it owes monetary loans in US Dollars to the International Monetary Fund",
            "When its population drops below 10 million citizens",
            "When it produces more organic food than it consumes domestically"],
           "An ecological debtor nation consumes more biocapacity than its own national borders provide, incurring ecological deficits funded by imports or depletion.")
]

P2_M20_TXT = (
    "Read the following groundwater extraction, corporate liability, and constitutional jurisprudence case study and answer the questions that follow:\n\n"
    "In March 2000, Hindustan Coca-Cola Beverages Private Limited commissioned a massive bottling plant in the agrarian village of Plachimada, within the "
    "Perumatty Grama Panchayat of Palakkad district, Kerala. Operating multiple high-capacity deep borewells and pumping over 500,000 liters of groundwater "
    "daily, the plant quickly depleted the shallow unconfined and deep confined crystalline rock aquifers. Within two years, agricultural tube wells and drinking "
    "wells across neighboring tribal and farming hamlets dried up entirely, and remaining water became brackish, foul-tasting, and alkaline. Simultaneously, "
    "the factory generated truckloads of toxic chemical sludge from effluent treatment clarifiers, which it deceitfully marketed to local farmers as free "
    "'organic fertilizer'. Rigorous chemical analysis by BBC investigative reporters and the Kerala State Pollution Control Board revealed that the sludge "
    "contained perilous concentrations of heavy metals, specifically Cadmium (up to 200 mg/kg) and Lead (up to 1,100 mg/kg), severely contaminating surrounding "
    "paddy fields. Spearheaded by Adivasi women led by grassroots leader Mayilamma, the community launched a historic 24x7 peaceful protest vigil outside the "
    "factory gates. In April 2003, the local Perumatty Grama Panchayat boldly exercised its statutory autonomy under the Kerala Panchayat Raj Act, 1994, refusing "
    "to renew the factory's operating license in the public interest. When the company appealed, the landmark Kerala High Court verdict (Perumatty Grama "
    "Panchayat v. State of Kerala, 2003) delivered by Justice K. Balakrishnan Nair established a historic legal precedent. The High Court affirmed that underground "
    "water is a collective national asset belonging to the public. Applying the 'Public Trust Doctrine', the Court ruled that the state is a mere trustee "
    "bound by constitutional duty under Article 21 to prevent excessive private groundwater over-exploitation, affirming that the Panchayat acted lawfully "
    "to safeguard community survival."
)
P2_M20_QS = [
    case_q("Human Beings and Nature", "Plachimada Groundwater Depletion Crisis",
           "What primary ecological catastrophe was inflicted upon Plachimada's rural community by the commercial soft drink bottling plant?",
           "Catastrophic drawdown of the regional groundwater table and severe salinity/hardness contamination caused by excessive borewell extraction",
           ["A massive volcanic eruption that buried the entire village in basaltic lava",
            "An earthquake that caused all agricultural fields to sink into the ocean",
            "A sudden nuclear explosion inside the bottling plant storage facility"],
           "Extracting half a million liters daily depleted regional aquifers, drying up irrigation wells and concentrating salts and contaminants in remaining drinking water."),
    case_q("Human Beings and Nature", "Toxic Heavy Metals in Sludge",
           "Which hazardous, carcinogenic heavy metals were detected in high concentrations in the factory sludge dumped as 'fertilizer' on local farmland?",
           "Cadmium (Cd) and Lead (Pb)",
           ["Pure vitamin C and calcium", "Iron and magnesium nutrients only", "Gold and platinum nanoparticles"],
           "Laboratory testing proved the industrial sludge contained dangerous levels of toxic Cadmium (Cd) and Lead (Pb), contaminating soils and crops."),
    case_q("Human Beings and Nature", "Public Trust Doctrine Invocation",
           "What historic environmental jurisprudence doctrine was invoked by the Kerala High Court in the Plachimada decision?",
           "The Public Trust Doctrine (groundwater is a natural resource held by the state in sacred trust for the public and cannot be privatized)",
           ["The Doctrine of Sovereign Immunity (the state can never be held accountable)",
            "The Doctrine of Caveat Emptor (let the buyer beware)",
            "The Doctrine of Eminent Domain for foreign private profit"],
           "The High Court held that groundwater is a public trust asset: the government is a trustee holding it for citizens and must prevent excessive private extraction."),
    case_q("Human Beings and Nature", "Panchayat Statutory Power Assertion",
           "Under which democratic legislation did the Perumatty Grama Panchayat exercise its statutory power to revoke the multinational corporation's license?",
           "The Kerala Panchayat Raj Act, 1994 (enacted under the 73rd Constitutional Amendment for local self-governance)",
           ["The Foreign Direct Investment Act", "The Indian Patent Act, 1970", "The Maritime Zones of India Act"],
           "The Perumatty Grama Panchayat exercised its decentralized statutory authority under the Kerala Panchayat Raj Act 1994 to cancel the plant's operational permit."),
    case_q("Human Beings and Nature", "Grassroots Adivasi Woman Leader",
           "Who was the fearless Adivasi woman activist who spearheaded the protracted non-violent anti-Coca-Cola agitation at Plachimada?",
           "Mayilamma",
           ["Gaura Devi", "Amrita Devi", "Medha Patkar"],
           "Mayilamma, an indigenous woman from the Vijayanagaram tribal colony, led the Plachimada protest, mobilizing international attention against corporate groundwater grabbing.")
]

# ==============================================================================
# PASSAGES_16_20 EXPORT LIST
# ==============================================================================
PASSAGES_16_20 = [
    ((P1_M16_TXT, P1_M16_QS), (P2_M16_TXT, P2_M16_QS)),
    ((P1_M17_TXT, P1_M17_QS), (P2_M17_TXT, P2_M17_QS)),
    ((P1_M18_TXT, P1_M18_QS), (P2_M18_TXT, P2_M18_QS)),
    ((P1_M19_TXT, P1_M19_QS), (P2_M19_TXT, P2_M19_QS)),
    ((P1_M20_TXT, P1_M20_QS), (P2_M20_TXT, P2_M20_QS))
]

if __name__ == '__main__':
    assert len(PASSAGES_16_20) == 5, f"Expected 5 pairs, got {len(PASSAGES_16_20)}"
    for idx, (p1, p2) in enumerate(PASSAGES_16_20, 16):
        assert len(p1[1]) == 5, f"Mock {idx} P1 has {len(p1[1])} Qs"
        assert len(p2[1]) == 5, f"Mock {idx} P2 has {len(p2[1])} Qs"
    print(f"EVS Passages 16 to 20 compiled successfully: {len(PASSAGES_16_20)} pairs (10 passages, 50 questions).")
