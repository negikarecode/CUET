# Passages for Mocks 6 to 10
p6_to_10 = '''
# ==============================================================================
# MOCK 6 PASSAGES
# ==============================================================================
P1_M6_TXT = (
    "Read the following urban waste management case study and answer the questions that follow:\\n\\n"
    "The Ghazipur landfill in East Delhi, standing over 65 meters tall and holding over 14 million tonnes of unsegregated municipal solid waste, exemplifies the acute "
    "waste crisis of Indian megacities. Established in 1984 and exhausted of design capacity in 2002, the mountain of garbage continued receiving thousands of tonnes "
    "daily. Deep within the compacted, un-aerated core of the unlined dump, anaerobic microbial decomposition of organic food wastes produces enormous volumes of "
    "highly combustible methane gas (CH4). During scorching summer heatwaves, subterranean temperatures exceed 70 degrees Celsius, triggering spontaneous landfill "
    "fires that burn uncontrollably for days, choking neighboring neighborhoods in toxic smoke laden with carbon monoxide, dioxins, and particulate matter. "
    "Concurrently, monsoon precipitation percolating through the heterogeneous waste dissolves heavy metals, industrial solvents, and organic acids, forming a "
    "black, foul-smelling liquid called 'Leachate'. Because Ghazipur lacks any basal impermeable geomembrane liner or leachate collection sump, this toxic leachate "
    "seeps freely into the shallow unconfined groundwater table and overflows into the adjacent Hindon Cut canal, contaminating the regional aquifer. Under the "
    "Solid Waste Management Rules 2016 and Swachh Bharat Mission-Urban 2.0, municipal authorities initiated massive 'Biomining' operations: excavating the legacy "
    "mound, aerating the waste with biocultures, and passing it through multi-deck rotary trommel sieves to separate soil enricher, recyclables, and refuse-derived "
    "fuel (RDF) for cement kilns, aiming to reclaim prime urban land."
)
P1_M6_QS = [
    case_q("Monitoring the Environment and Pollution", "Landfill Subterranean Fires Mechanism",
           "What primary flammable gas produced by anaerobic decomposition inside the Ghazipur landfill fuels the spontaneous, recurring surface fires?",
           "Methane (CH4)",
           ["Pure atmospheric oxygen", "Sulfur Hexafluoride", "Carbon Monoxide only"],
           "Methanogenic archaea decompose organic waste under anaerobic conditions inside landfills, generating combustible methane gas (50–60% of landfill gas)."),
    case_q("Monitoring the Environment and Pollution", "Leachate Groundwater Threat",
           "Why does leachate escaping from the unlined Ghazipur dumpsite pose a catastrophic hazard to regional drinking water security?",
           "Because the unlined dump allows toxic leachate containing heavy metals, organic acids, and pathogens to percolate directly into the unconfined groundwater aquifer",
           ["Because leachate turns all underground water into solid granite rock",
            "Because leachate freezes regional aquifers to sub-zero temperatures",
            "Because leachate causes underground tectonic earthquakes"],
           "Without impermeable clay or HDPE liners, toxic leachate migrates downward, creating extensive contamination plumes in drinking water aquifers."),
    case_q("Monitoring the Environment and Pollution", "Biomining and Trommel Sieving Technique",
           "How does the remediation process of 'Biomining' process millions of tonnes of legacy waste at dumpsites like Ghazipur?",
           "By excavating, bio-stabilizing with microbial inoculants, and mechanically sorting legacy waste using rotary trommel screens into soil enricher, combustibles (RDF), and inert debris",
           ["By burning the entire garbage mountain with aviation jet fuel",
            "By burying the garbage twice as deep underground",
            "By spraying perfume over the garbage mountain"],
           "Biomining uses trommels to physically classify legacy waste: fine soil enricher, refuse-derived fuel (RDF) for cement plants, and construction inerts."),
    case_q("Monitoring the Environment and Pollution", "Refuse-Derived Fuel (RDF) End Use",
           "Under the Solid Waste Management Rules 2016, the high-calorific, combustible fraction separated from municipal waste (RDF) is mandated to be utilized as:",
           "Alternative fuel in energy-intensive cement manufacturing kilns and waste-to-energy power plants",
           ["Direct food feed for dairy cattle in urban dairies",
            "Cosmetic facial powder sold in beauty salons",
            "Paving material for playground sand pits"],
           "RDF (shredded combustible plastics, textiles, packaging) provides high thermal calorific value, replacing fossil coal in industrial cement kilns."),
    case_q("Monitoring the Environment and Pollution", "Solid Waste Source Segregation Rule",
           "According to the Solid Waste Management Rules 2016, what is the mandatory foundational duty of all individual waste generators to prevent future landfill crises?",
           "To segregate municipal solid waste at source into three distinct streams: Wet (Biodegradable), Dry (Recyclable), and Domestic Hazardous waste",
           ["To throw all mixed garbage into open storm-water drains at night",
            "To burn all household plastics in backyard gardens",
            "To bury domestic electronic waste inside house basements"],
           "Rule 4 of SWM Rules 2016 mandates source segregation into wet, dry, and domestic hazardous streams, preventing mixed garbage from reaching dumpsites.")
]

P2_M6_TXT = (
    "Read the following watershed revitalization case study and answer the questions that follow:\\n\\n"
    "In the semi-arid Alwar district of Rajasthan, decades of rampant deforestation on the Aravalli hills, soil erosion, and unchecked mechanical tube-well "
    "over-extraction caused a catastrophic environmental collapse by the 1980s. The regional groundwater table plunged below 100 meters, shallow open wells dried up, "
    "agricultural farms turned barren, and the historic Arvari River ceased to flow, becoming a dead seasonal nullah. Facing mass outward distress migration, the "
    "villagers turned to traditional ecological wisdom under the leadership of social worker Rajendra Singh and the NGO Tarun Bharat Sangh. Mobilizing local "
    "indigenous knowledge, villagers revived the construction of 'Johads'—traditional, semi-circular crescent-shaped earthen check-dams built across natural "
    "topographic contours. Constructed entirely with local labor, stone, and earth, Johads do not store water for direct surface diversion; instead, they retard "
    "monsoon surface runoff, pooling rainwater in shallow reservoirs that allow steady, deep percolation into underlying unconfined aquifers. Between 1985 and 2000, "
    "villagers constructed over 375 Johads across the Arvari catchment. As underground aquifers steadily recharged, regional water tables rose from 100 meters depth "
    "to within 3–8 meters of the surface. In 1990, perennial baseflow was miraculously restored to the Arvari River, which began flowing year-round for 45 kilometers. "
    "The villagers established the 'Arvari River Parliament' (Arvari Sansad)—a democratic, community-governed assembly of 72 riparian villages that regulates "
    "water extraction, bans water-intensive commercial cash crops, and enforces collective conservation rules without state bureaucracy."
)
P2_M6_QS = [
    case_q("Human Beings and Nature", "Johad Engineering Working Principle",
           "What is the primary hydrological function of an indigenous earthen 'Johad' constructed across a contour in Rajasthan?",
           "To retard rushing monsoon surface runoff and hold it in a shallow basin, facilitating steady percolation to recharge underlying groundwater aquifers",
           ["To generate high-voltage commercial hydroelectricity for nearby cities",
            "To evaporate water into the clouds as fast as possible to induce rainstorms",
            "To store industrial chemical wastewater from urban factories"],
           "Johads are infiltration structures: by holding surface runoff, they allow water to seep deep into the subsoil, recharging the unconfined aquifer."),
    case_q("Human Beings and Nature", "Arvari River Rejuvenation Milestone",
           "How was the dried-up, dead Arvari River successfully transformed back into a perennial, year-round flowing river?",
           "By constructing hundreds of community Johads across its catchment, which recharged regional groundwater tables to the point where baseflow naturally fed the riverbed year-round",
           ["By pumping billions of liters of sea water from the Arabian Sea through steel pipelines",
            "By building a massive concrete mega-dam 200 meters tall across the river",
            "By seeding clouds with silver iodide every afternoon"],
           "Baseflow from revived groundwater aquifers sustained the river throughout the dry season, turning a seasonal dead nullah into a perennial river."),
    case_q("Human Beings and Nature", "Waterman of India Identity",
           "Which prominent Indian environmental leader was awarded the Ramon Magsaysay Award (2001) and the Stockholm Water Prize (2015) for mobilizing communities to build Johads?",
           "Rajendra Singh (Tarun Bharat Sangh)",
           ["Sundarlal Bahuguna", "Chandi Prasad Bhatt", "Madhav Gadgil"],
           "Rajendra Singh, known as the 'Waterman of India', led the community-driven watershed restoration movement in Rajasthan through Tarun Bharat Sangh."),
    case_q("Human Beings and Nature", "Arvari River Parliament Democratic Innovation",
           "What unique institutional self-governance model was created by the 72 riparian villages of the Arvari river basin to manage their revived water resource?",
           "The Arvari River Parliament (Arvari Sansad), a decentralized community assembly regulating water extraction and banning water-intensive commercial crops",
           ["A private commercial corporation selling bottled drinking water to multinational beverage brands",
            "A military defense police force that shoots any villager who drinks water",
            "A state government agency that privatized all wells"],
           "The Arvari Sansad is a grassroots parliament representing riparian villages, exemplifying Elinor Ostrom's principles of decentralized CPR governance."),
    case_q("Human Beings and Nature", "Traditional Water Wisdom Replication",
           "What profound lesson does the Arvari river rejuvenation provide for contemporary Indian water resource management?",
           "Decentralized, low-cost, community-managed traditional rainwater harvesting can restore river hydrology and groundwater far more sustainably than capital-intensive mega-dams",
           ["That rivers can only flow if they are encased in concrete tunnels",
            "That rural communities are incapable of understanding water management",
            "That all agricultural farming should be completely banned in India"],
           "The Arvari experience proves that decentralized indigenous technologies (Johads) combined with community ownership achieve cost-effective hydrological revival.")
]

# ==============================================================================
# MOCK 7 PASSAGES
# ==============================================================================
P1_M7_TXT = (
    "Read the following marine ecology and climate science case study and answer the questions that follow:\\n\\n"
    "Coral reefs, often celebrated as the 'rainforests of the sea', cover less than 0.1% of the ocean floor yet harbor over 25% of all marine species. These biogenic "
    "limestone structures are created by tiny calcifying anthozoan coral polyps living in an obligate mutualistic symbiosis with photosynthetic microscopic "
    "dinoflagellate microalgae known as 'Zooxanthellae' (genus Symbiodinium). Zooxanthellae reside within the coral gastrodermal tissues, photosynthesizing and "
    "providing up to 90% of the polyp's metabolic energy in the form of glycerol, glucose, and amino acids, while receiving inorganic nutrients and shelter in "
    "return. However, anthropogenic global warming and rising atmospheric CO2 pose an existential double jeopardy: Marine Heatwaves and Ocean Acidification. "
    "When ocean sea surface temperatures rise merely 1 to 1.5 degrees Celsius above normal summer maximums for sustained weeks, the photosynthetic apparatus of "
    "zooxanthellae breaks down, producing toxic Reactive Oxygen Species (ROS) that damage coral cellular membranes. To survive, the stressed coral host actively "
    "expels the zooxanthellae, revealing the stark white, translucent calcium carbonate skeleton beneath—a phenomenon termed 'Mass Coral Bleaching'. "
    "Simultaneously, rising oceanic absorption of CO2 lowers seawater pH and depletes Carbonate ions (CO3(2-)), drastically depressing the Aragonite Saturation State "
    "(\\Omega_arag) and making it energetically exhausting or impossible for bleached corals to rebuild their structural skeletons."
)
P1_M7_QS = [
    case_q("Monitoring the Environment and Pollution", "Coral-Zooxanthellae Symbiosis",
           "In the coral reef ecosystem, what is the precise biological nature of the relationship between coral polyps and zooxanthellae algae?",
           "Obligate mutualistic symbiosis (+, +) where the algae provide photosynthetic nutrients and the coral provides shelter and metabolic waste products",
           ["Parasitic relationship (+, -) where algae feed on coral blood",
            "Amensal relationship (-, 0) where corals inhibit algae growth",
            "Predator-prey relationship where corals consume algae to extinction"],
           "Coral polyps and photosynthetic zooxanthellae live in mutualism: algae provide photosynthates (energy/color) and corals provide nitrogen/phosphorus shelter."),
    case_q("Monitoring the Environment and Pollution", "Mass Coral Bleaching Mechanism",
           "What cellular biochemical trigger causes a stressed coral polyp to expel its symbiotic zooxanthellae during a marine heatwave?",
           "Thermal breakdown of the algal photosynthetic apparatus generating toxic Reactive Oxygen Species (ROS) that damage host cells",
           ["Sudden freezing of seawater into solid underwater icebergs",
            "Complete disappearance of all salt from the ocean water",
            "Attacks by deep-sea submarine sonar radio pulses"],
           "Elevated temperature damages algal photosystem II, releasing cytotoxic reactive oxygen species (ROS), forcing the host polyp to expel the algae to survive."),
    case_q("Monitoring the Environment and Pollution", "Aragonite Saturation and Ocean Acidification",
           "Why does anthropogenic ocean acidification (lowering ocean pH) directly impair the recovery and calcification of marine coral reefs?",
           "It reacts with and depletes dissolved Carbonate ions (CO3(2-)), lowering the aragonite saturation state required to precipitate calcium carbonate skeletons",
           ["It dissolves all coral tissue into pure gaseous nitrogen",
            "It turns ocean water into concentrated hydrochloric acid that boils fish",
            "It causes all marine calcium to mutate into radioactive plutonium"],
           "Excess H+ ions from carbonic acid bind with free carbonate ions, starving corals of the essential building blocks needed to precipitate aragonite CaCO3 skeletons."),
    case_q("Monitoring the Environment and Pollution", "Biodiversity Significance of Coral Reefs",
           "Although coral reefs cover less than 0.1% of the global ocean surface area, they support approximately what proportion of all marine biological species?",
           "Over 25% of all marine species",
           ["Less than 0.001% of marine life", "Exactly 100% of all organisms on Earth", "Only microscopic bacterial species"],
     "Coral reefs are global marine biodiversity hotspots, supporting over one-fourth of all marine fishes, invertebrates, and pelagic species on just 0.1% of ocean floor."),
    case_q("Monitoring the Environment and Pollution", "Global Warming Ceiling for Coral Survival",
           "According to the IPCC Special Report on 1.5 C (SR15), what is the projected catastrophic fate of global warm-water coral reefs if global warming reaches 2.0 C above pre-industrial levels?",
           "Over 99% of all warm-water coral reefs will be virtually obliterated globally",
           ["Coral reefs will expand and cover all polar continents",
            "Coral reefs will experience zero biological changes",
            "Coral reefs will transform into terrestrial pine forests"],
           "IPCC SR15 projects that 1.5 C warming declines coral reefs by 70–90%, but 2.0 C warming causes catastrophic, virtually complete (>99%) global extinction.")
]

P2_M7_TXT = (
    "Read the following historical environmental movement case study and answer the questions that follow:\\n\\n"
    "In the late 1970s, the pristine tropical wet evergreen rainforests of the Silent Valley in the Palakkad district of Kerala became the center of India's fiercest "
    "environmental battle between industrial developmentalism and ecological conservation. The Kerala State Electricity Board (KSEB) proposed constructing a "
    "hydroelectric dam across the Kunthipuzha River, plunging into the valley to generate 120 MW of peak electrical power to drive regional industrialization. "
    "However, the proposed reservoir would have submerged over 830 hectares of completely undisturbed, continuous tropical rainforest that had evolved over millions "
    "of years without major anthropogenic disturbance. Pioneering grassroots mobilization led by the Kerala Sastra Sahitya Parishad (KSSP)—a progressive people's "
    "science movement—partnered with poets (Sugathakumari), naturalists, and leading biologists. Zoologists (such as Dr. Salim Ali and Dr. Steven Green) proved that "
    "Silent Valley was one of the last viable wild strongholds for the endangered, endemic Lion-tailed Macaque (Macaca silenus). The movement framed the debate not "
    "merely as energy versus ecology, but challenged the technocratic cost-benefit analysis of destroying an irreplaceable evolutionary gene bank for marginal, "
    "short-lived electrical kilowatts. In 1983, following an expert committee review headed by Prof. M.G.K. Menon, Prime Minister Indira Gandhi formally declared that "
    "the hydroelectric project was abandoned. In 1985, Prime Minister Rajiv Gandhi officially inaugurated the area as the inviolate Silent Valley National Park."
)
P2_M7_QS = [
    case_q("Biodiversity and Conservation", "Silent Valley Hydroelectric Conflict",
           "What proposed developmental infrastructure project sparked the historic 'Save Silent Valley' environmental movement in Kerala?",
           "A hydroelectric dam across the Kunthipuzha River proposed by the Kerala State Electricity Board (KSEB) that would submerge 830 hectares of rainforest",
           ["An open-cast coal strip-mining complex proposed by an international mining conglomerate",
            "A high-speed nuclear weapons testing facility constructed inside the valley",
            "A commercial international airport built on the mountain ridges"],
           "The movement fought against KSEB's proposed 120 MW hydroelectric dam across the Kunthipuzha river that threatened to flood pristine evergreen rainforest."),
    case_q("Biodiversity and Conservation", "Kerala Sastra Sahitya Parishad (KSSP) Role",
           "What distinctive organizational strategy enabled the Kerala Sastra Sahitya Parishad (KSSP) to mobilize massive popular resistance against the dam?",
           "Using people's science education, popular street plays (Jathas), environmental poetry, and rigorous socio-economic critique of KSEB's power claims",
           ["Filing patent applications on all wild plants to block government access",
            "Armed violent sabotage of electrical transmission lines across Kerala",
            "Purchasing the entire forest with international private bank loans"],
           "KSSP mobilized society using popular science, street theatre, literature (Sugathakumari's poetry), and techno-economic analyses showing power could be generated elsewhere."),
    case_q("Biodiversity and Conservation", "Flagship Endemic Species of Silent Valley",
           "Which critically endangered, arboreal primate endemic to the tropical wet evergreen forests of the Western Ghats served as the flagship ecological symbol of the Silent Valley campaign?",
           "Lion-tailed Macaque (Macaca silenus)",
           ["Bengal Tiger", "Nilgiri Tahr", "Golden Langur"],
           "The Lion-tailed Macaque, a canopy-dwelling primate requiring contiguous rainforest canopy, was the flagship species proving the unique ecological value of Silent Valley."),
    case_q("Biodiversity and Conservation", "M.G.K. Menon Committee Role",
           "What was the decisive finding of the Joint Expert Committee chaired by Prof. M.G.K. Menon appointed by the Central Government to evaluate Silent Valley?",
           "The committee recommended abandoning the dam, concluding that the ecological damage to an ancient, irreplaceable evolutionary gene bank far outweighed electrical power benefits",
           ["The committee recommended doubling the height of the dam to submerge the entire district",
            "The committee concluded that tropical rainforests have zero ecological value",
            "The committee recommended clear-felling all trees to build shopping malls"],
           "Prof. M.G.K. Menon's report confirmed the unique biological wealth of the valley, leading Prime Minister Indira Gandhi to scrap the dam project."),
    case_q("Biodiversity and Conservation", "Silent Valley National Park Inauguration",
           "In which year was the saved Silent Valley formally inaugurated as an inviolate National Park by Prime Minister Rajiv Gandhi?",
           "1985",
           ["1972", "1992", "2000"],
           "Silent Valley National Park was formally inaugurated in September 1985 by Prime Minister Rajiv Gandhi, securing legal protection under the Wildlife Protection Act.")
]

# ==============================================================================
# MOCK 8 PASSAGES
# ==============================================================================
P1_M8_TXT = (
    "Read the following hazardous materials and informal industrial economy case study and answer the questions that follow:\\n\\n"
    "Seelampur, a densely populated low-income neighborhood in North East Delhi, is recognized as one of the largest informal electronic waste (e-waste) processing "
    "hubs in Asia. Every day, truckloads of obsolete computers, mobile phones, printed circuit boards (PCBs), and cathode ray tubes (CRTs) arrive from across India. "
    "Operating in narrow residential alleys without any personal protective equipment, ventilation, or regulatory oversight, informal workers—many of them women and "
    "children—manually dismantle electronic hardware. To extract valuable precious metals (such as Gold, Silver, and Copper), workers heat circuit boards over open "
    "kerosene burners to desolder components, inhaling dense fumes of lead (Pb) and toxic polybrominated diphenyl ethers (PBDE flame retardants). Circuit board scrap "
    "is then immersed in primitive open-air chemical baths of concentrated nitric acid and aqua regia (acid leaching) on rooftops to strip copper and gold. "
    "The spent, highly acidic leaching sludges containing lethal concentrations of cyanide, lead, cadmium, and mercury are dumped directly into unlined open gutters "
    "that discharge into the Yamuna river. Blood tests of informal e-waste workers reveal alarming blood lead levels exceeding 40 ug/dL (far above the CDC action level "
    "of 5 ug/dL), severe respiratory impairment, kidney tubular damage, and irreversible neurological disorders."
)
P1_M8_QS = [
    case_q("Monitoring the Environment and Pollution", "Informal Acid Leaching Pollution",
           "What hazardous chemical process is practiced in informal e-waste yards like Seelampur to extract trace gold and copper, generating toxic acid runoff?",
           "Open-air acid leaching of printed circuit boards using concentrated nitric acid and aqua regia (HCl + HNO3)",
           ["Biological composting with earthworms in wooden boxes",
            "Solar thermal melting inside glass greenhouse tubes",
            "Sub-zero freezing with liquid nitrogen gas"],
           "Informal workers use open acid baths (nitric acid and aqua regia) to dissolve base metals and precipitate gold, dumping toxic cyanide/acid residues into city drains."),
    case_q("Monitoring the Environment and Pollution", "Toxic Solder Inhalation Hazard",
           "When informal workers heat printed circuit boards over open kerosene flames to desolder electronic chips, what toxic heavy metal vapor do they directly inhale?",
           "Lead (Pb) vapors originating from traditional tin-lead electrical solder",
           ["Pure oxygen gas", "Calcium carbonate dust", "Argon gas"],
           "Traditional electronics use 60/40 tin-lead solder; torching boards vaporizes lead, causing severe neurotoxic inhalation and lead encephalopathy."),
    case_q("Monitoring the Environment and Pollution", "E-Waste Management Rules 2022 Mandate",
     "The E-Waste (Management) Rules, 2022 enacted by the Ministry of Environment aim to dismantle hazardous informal dismantling by mandating that:",
     "Producers must meet rising, legally enforceable Extended Producer Responsibility (EPR) recycling quotas routed exclusively through authorized formal recyclers",
     ["Informal workers be issued free chemical acid tanks by the municipal council",
      "All electronic computers be thrown directly into municipal solid waste landfills",
      "All electronic manufacturing in India be permanently banned"],
     "The 2022 E-waste rules enforce a digital EPR credit portal: producers must purchase verified recycling certificates from formal, registered recycling facilities."),
    case_q("Monitoring the Environment and Pollution", "Cathode Ray Tube (CRT) Toxic Constituent",
     "Old television sets and CRT computer monitors dismantled in informal yards are hazardous primarily because their funnel glass contains large quantities of:",
     "Lead Oxide (PbO) used to shield viewers from internal X-ray radiation",
     ["Pure edible sugar crystals", "Liquid helium coolant", "Solid natural rubber"],
     "CRT glass contains up to 2–3 kg of lead oxide to block cathode X-rays; crushing CRTs in open yards releases toxic lead dust into ambient air and soil."),
    case_q("Monitoring the Environment and Pollution", "RoHS Global Directive Standards",
     "Under international electrical standards and Indian e-waste rules, what does the 'RoHS' regulatory compliance directive stand for?",
     "Restriction of Hazardous Substances (restricting the concentration of Lead, Mercury, Cadmium, Hexavalent Chromium, PBB, and PBDE in electronics)",
     ["Regulation of Household Smartphones", "Recovery of Heavy Soils", "Relocation of Hazardous Ships"],
     "RoHS restricts six hazardous substances (Lead, Mercury, Cadmium, Cr(VI), PBBs, PBDEs) in electronic equipment to maximum threshold concentrations (e.g. 0.1% or 1,000 ppm).")
]

P2_M8_TXT = (
    "Read the following agricultural ecology and public health case study and answer the questions that follow:\\n\\n"
    "The Malwa agricultural belt of southwestern Punjab (districts of Bathinda, Mansa, and Muktsar) represents the dark, tragic aftermath of the Green Revolution's "
    "input-intensive paradigm. In the 1960s and 70s, high-yielding varieties of cotton, paddy, and wheat turned Punjab into the celebrated 'food bowl of India'. "
    "However, the relentless pursuit of maximized yields spawned an unsustainable agrochemical treadmill. Farmers applied chemical synthetic fertilizers (Urea and "
    "DAP) at rates triple the national average, alongside heavy cocktail sprays of chemical pesticides, insecticides, and weedicides. Concurrently, free agricultural "
    "electricity subsidized over 1.4 million motorized tube-wells, causing severe waterlogging in canal-irrigated lowlands and acute groundwater depletion elsewhere. "
    "Excess irrigation drew mineral salts upward via capillary action, salinizing vast agricultural tracts (known locally as 'Kallar' or 'Reh'). Decades of chemical "
    "overdosing leached synthetic nitrogen and pesticide residues into shallow drinking water aquifers, pushing groundwater nitrate and heavy metal levels "
    "(Uranium, Arsenic, Lead) dangerously above safe limits. Chronic bioaccumulation triggered an alarming surge in neurological disorders, reproductive failures, "
    "and malignancies. Every night, the passenger train connecting Bathinda to the regional cancer treatment hospital in Bikaner, Rajasthan, is filled with so many "
    "impoverished rural cancer patients that it has gained international notoriety as the 'Cancer Train' (Train No. 54703)."
)
P2_M8_QS = [
    case_q("Third World Development and Sustainable Agriculture", "Etiology of the Cancer Train",
           "The passenger train running between Bathinda (Punjab) and Bikaner (Rajasthan) became known internationally as the 'Cancer Train' because:",
           "It carries hundreds of rural agricultural patients suffering from malignant cancers induced by chronic lifetime exposure to agrochemical cocktail residues in drinking water",
           ["The train engine is powered by an open nuclear uranium reactor",
            "The train tracks are paved with toxic lead battery plates",
            "The train travels exclusively through chemical weapon testing grounds"],
           "The 'Cancer Train' transports dozens of cancer patients daily from Punjab's pesticide-intensive Malwa belt to the subsidized cancer hospital in Bikaner."),
    case_q("Third World Development and Sustainable Agriculture", "Soil Salinization Mechanism (Kallar / Reh)",
           "How did excessive canal flood irrigation without adequate underground drainage lead to widespread soil salinization ('Kallar') in southwestern Punjab?",
           "Over-irrigation raised the water table; capillary action drew dissolved mineral salts to the soil surface where water evaporated, leaving sterile white salt crusts",
           ["Canal water contained solid granite boulders that crushed the soil",
            "Farmers sprayed commercial sea salt over their wheat fields",
            "Heavy rain clouds deposited pure sodium metal on the crops"],
           "Waterlogging forces the saline water table near the surface; intense summer evaporation leaves high concentrations of soluble sodium salts, destroying soil fertility."),
    case_q("Third World Development and Sustainable Agriculture", "Nitrate Groundwater Pollution Threshold",
           "In agricultural aquifers beneath heavily fertilized crop fields, drinking water nitrate levels often exceed the Bureau of Indian Standards (BIS) safe permissible limit of:",
           "45 mg/L (NO3-), posing severe risks of infant Methemoglobinemia (Blue Baby Syndrome)",
           ["1,000 mg/L", "0.001 mg/L", "500 mg/L"],
           "The maximum permissible limit for nitrate in drinking water is 45 mg/L; exceeding this causes infant methemoglobinemia and chronic carcinogenic nitrosamine formation."),
    case_q("Third World Development and Sustainable Agriculture", "The Agrochemical Treadmill Phenomenon",
           "Why did Punjab cotton farmers continually increase pesticide spray frequencies from 2 sprays to over 20 sprays per season during the 1990s?",
           "Because chemical sprays eliminated natural insect predators while target bollworms and whiteflies evolved genetic resistance, forcing higher chemical dependency",
           ["Because government laws mandated daily spraying of all crops",
            "Because pesticides acted as artificial food for farm cows",
            "Because pesticides made the cotton plants grow 100 feet tall"],
           "The pesticide treadmill: destroying natural biocontrol predators and selecting resistant pest mutants forces farmers to apply higher, costlier chemical doses."),
    case_q("Third World Development and Sustainable Agriculture", "Sustainable Agricultural Transition",
           "To rescue Punjab's agriculture from ecological and health collapse, agro-economists unanimously recommend diversifying away from the paddy-wheat monoculture toward:",
           "Direct-seeded pulses, oilseeds, millets, and certified organic farming using organic composts and natural biocontrol agents",
           ["Doubling the amount of chemical urea applied per acre",
            "Paving all agricultural farmlands with industrial concrete",
            "Spraying chemical defoliants across all rural districts"],
           "Sustainable rescue requires crop diversification: replacing water-guzzling summer paddy with millets, pulses, and zero-budget organic practices to restore soil and water.")
]

# ==============================================================================
# MOCK 9 PASSAGES
# ==============================================================================
P1_M9_TXT = (
    "Read the following wildlife enforcement and biodiversity law case study and answer the questions that follow:\\n\\n"
    "Kaziranga National Park in Assam, a UNESCO World Heritage site situated in the fertile floodplains of the Brahmaputra River, harbors over 2,600 Greater "
    "One-Horned Rhinoceroses (Rhinoceros unicornis)—representing more than two-thirds of the world's surviving wild population. Despite this conservation triumph, "
    "the species faces persistent existential threats from organized international wildlife trafficking syndicates. Rhinoceros horn is composed entirely of "
    "agglutinated keratin (the exact same fibrous structural protein that forms human hair and fingernails), lacking any bone core. Nonetheless, pseudoscientific myths "
    "in traditional East Asian folk medicine falsely attribute miraculous therapeutic, aphrodisiac, and antipyretic healing properties to pulverized rhino horn, "
    "driving illegal black-market prices above $60,000 per kilogram—far exceeding the street price of gold or cocaine. Poachers equipped with military-grade assault "
    "rifles, night-vision optics, and silencers infiltrate Kaziranga's tall elephant grass during annual monsoon floods when rhinos migrate toward the higher Karbi "
    "Anglong hills. In response, the Government of Assam enacted unprecedented legal measures: amending the Wildlife (Protection) Act to empower forest rangers with "
    "statutory immunity for using lethal firearms against poachers, deploying armed Special Rhino Protection Task Forces (SRPA) with thermal drones, and collaborating "
    "with the Wildlife Crime Control Bureau (WCCB) and INTERPOL. Because Rhinoceros unicornis is listed on Appendix I of CITES and Schedule I of the Wildlife "
    "Protection Act 1972, all international commercial trade in rhino specimens is strictly and absolutely prohibited."
)
P1_M9_QS = [
    case_q("Biodiversity and Conservation", "Rhinoceros Horn Composition",
           "What is the actual biochemical composition of a rhinoceros horn, debunking the pseudoscientific medical myths that drive international poaching?",
           "Agglutinated fibrous Keratin (the exact same structural protein found in human hair and fingernails)",
           ["A solid calcified bone containing pure ivory crystals",
            "A condensed chunk of radioactive uranium ore",
            "A specialized hormonal gland secreting gold dust"],
           "Rhino horn contains zero bone or medicinal compounds; it is purely compacted keratin protein, identical to human fingernails and horse hooves."),
    case_q("Biodiversity and Conservation", "Kaziranga World Heritage Status",
           "Kaziranga National Park holds what proportion of the world's total surviving wild population of the Greater One-Horned Rhinoceros?",
           "Over two-thirds (approx. 70%) of the world's total wild population",
           ["Less than 1% of the global population",
            "Exactly 100% of all mammals on Earth",
            "Zero, as Kaziranga only houses Bengal tigers"],
           "Kaziranga is the primary global sanctuary for the Indian one-horned rhino, housing over 2,600 out of ~3,700 individuals left in the wild."),
    case_q("Biodiversity and Conservation", "CITES Appendix I Legal Trade Status",
           "Under the international CITES convention, what legal status is conferred upon species listed on Appendix I (such as Rhinoceros unicornis)?",
           "Total, absolute prohibition of all international commercial trade in live specimens, body parts, or derivative products",
           ["Unrestricted free commercial trade without any customs inspection",
            "Permitted commercial export provided a 5% export tariff is paid",
            "Trade is restricted exclusively to private auction houses in Europe"],
           "Appendix I lists species threatened with extinction; all international commercial trade in their parts (including rhino horn and tiger bone) is banned."),
    case_q("Biodiversity and Conservation", "Monsoon Flooding and Poaching Vulnerability",
           "Why are Kaziranga rhinos exceptionally vulnerable to commercial poaching syndicates during annual Brahmaputra monsoon floods?",
           "Floods submerge over 80% of the park, forcing rhinos to migrate out of protected riverine grasslands toward the elevated Karbi Anglong hills, crossing unprotected highways",
           ["Because flood water causes the rhinos' horns to fall off naturally",
            "Because rhinos lose the biological ability to run during rainfall",
            "Because forest guards are legally prohibited from entering water"],
           "Severe floods submerge the lowlands, forcing rhinos to flee across national highway NH-37 into unprotected tea gardens and hills where poachers wait."),
    case_q("Biodiversity and Conservation", "Wildlife Crime Control Bureau (WCCB) Statutory Role",
           "What is the statutory operational mandate of the Wildlife Crime Control Bureau (WCCB) established under the Wildlife Protection Act?",
           "To collect and collate intelligence on organized wildlife crime, coordinate cross-border enforcement across states, and assist international agencies like INTERPOL",
           ["To operate commercial slaughterhouses for wild animals",
            "To construct luxury tourist resorts inside national park core zones",
            "To sell confiscated tiger skins to private fashion collectors"],
           "The WCCB is India's premier intelligence and enforcement agency combating organized transnational wildlife smuggling syndicates.")
]

P2_M9_TXT = (
    "Read the following sustainable agriculture and agro-ecology case study and answer the questions that follow:\\n\\n"
    "In the rainfed, drought-prone districts of Andhra Pradesh (such as Ananthapuramu), smallholder farmers trapped in spiraling debts from purchasing costly "
    "chemical fertilizers, hybrid seeds, and synthetic pesticides have spearheaded a massive agro-ecological transformation known as 'Zero Budget Natural Farming' "
    "(ZBNF), now institutionalized as Andhra Pradesh Community-Managed Natural Farming (APCNF). Pioneered by Padmashri Subhash Palekar, ZBNF is based on the "
    "foundational premise that all essential plant nutrients are already abundantly present in healthy soil, needing only microbial activation rather than external "
    "chemical additions. ZBNF is anchored by 'Four Pillars': (1) 'Bijamrita' (a biological seed coating prepared from native Desi cow dung, urine, lime, and virgin "
    "forest soil that coats seeds in beneficial mycorrhizal and bacterial endophytes, preventing soil-borne fungal rots); (2) 'Jiwamrita' (a fermented liquid microbial "
    "culture of fresh cow dung, urine, pulse flour, jaggery, and forest soil applied to the soil to catalyze earthworms and billions of nitrogen-fixing and "
    "phosphate-solubilizing microflora); (3) 'Acchadana' (continuous organic mulching with crop straw and multi-species biomass that preserves soil moisture, "
    "buffers root temperature, and suppresses weeds); and (4) 'Whapasa' (a microclimate condition in the soil where water vapor and air coexist in equal balance, "
    "slashing irrigation requirements by up to 50–70%). By eliminating purchased chemical inputs, ZBNF restores degraded soil organic carbon, enhances household food "
    "security, and drastically reduces farmer suicide risks."
)
P2_M9_QS = [
    case_q("Third World Development and Sustainable Agriculture", "Four Pillars of ZBNF",
           "Which of the following correctly enumerates the 'Four Core Pillars' of Subhash Palekar's Zero Budget Natural Farming?",
           "Bijamrita (seed treatment), Jiwamrita (microbial inoculant), Acchadana (mulching), and Whapasa (soil aeration-moisture balance)",
           ["Urea, Diammonium Phosphate, Glyphosate, and Endosulfan",
            "Deep plowing, Tractor compaction, Flood irrigation, and Burning",
            "Genetic modification, Gene editing, Tissue culture, and Cloning"],
           "The 4 pillars of ZBNF are Bijamrita (seed coating), Jiwamrita (liquid bio-inoculum), Acchadana (mulch cover), and Whapasa (soil aeration)."),
    case_q("Third World Development and Sustainable Agriculture", "Bijamrita Functional Role",
           "In the ZBNF framework, what is the primary agronomic purpose of treating crop seeds with 'Bijamrita' prior to sowing?",
           "To coat the seed with beneficial antagonistic microbes and natural antimicrobials that shield young seedlings from seed- and soil-borne fungal pathogens",
           ["To make seeds waterproof so they never germinate in soil",
            "To color seeds pink so they look attractive to market buyers",
            "To eliminate the need for planting seeds in soil"],
           "Bijamrita acts as an organic seed shield: beneficial bacteria from virgin soil and cow dung protect germinating seedlings from damping-off and root rots."),
    case_q("Third World Development and Sustainable Agriculture", "Jiwamrita Preparation Ingredients",
           "What natural biological ingredients are fermented together in a barrel to brew the microbial liquid inoculant 'Jiwamrita'?",
           "Water, fresh Desi cow dung, Desi cow urine, jaggery (organic sugar), pulse flour (besan), and a handful of fertile virgin forest soil",
           ["Synthetic chemical urea, sulfuric acid, and copper sulfate",
            "Powdered coal ash, engine oil, and industrial bleach",
            "Distilled alcohol, liquid mercury, and refined white table salt"],
           "Jiwamrita is brewed from water, cow dung, urine, jaggery (carbon source), pulse flour (protein/nitrogen for microbes), and virgin forest soil (microbial inoculum)."),
    case_q("Third World Development and Sustainable Agriculture", "Whapasa Soil Ecological Condition",
           "In natural farming agronomy, what specific root-zone physical state does the concept of 'Whapasa' describe?",
           "The presence of both air molecules and water vapor in optimal dynamic balance within soil pores, completely avoiding waterlogged saturation",
           ["A state where soil is baked into solid ceramic brick",
            "A condition where soil is flooded under 2 meters of stagnant water",
            "A state where soil contains zero oxygen or air"],
           "Whapasa describes optimal soil capillary aeration: plant roots absorb water vapor rather than standing liquid water, requiring ~50% less irrigation."),
    case_q("Third World Development and Sustainable Agriculture", "Socio-Economic Philosophy of ZBNF",
           "Why is this agro-ecological system specifically named 'Zero Budget' Natural Farming?",
           "Because it eliminates the need for farmers to purchase commercial fertilizers, chemical pesticides, and hybrid seeds on credit, slashing production costs to near-zero",
           ["Because farmers are legally forbidden from earning any money from their harvest",
            "Because the government spends zero rupees on national agriculture",
            "Because the crops produced have zero monetary market value"],
           "The term 'Zero Budget' emphasizes liberation from debt: farmers prepare all microbial inputs on-farm from free local biological resources.")
]

# ==============================================================================
# MOCK 10 PASSAGES
# ==============================================================================
P1_M10_TXT = (
    "Read the following riverine pollution and urban hydrology case study and answer the questions that follow:\\n\\n"
    "The 22-kilometer stretch of the Yamuna River passing through the National Capital Territory of Delhi—from the Wazirabad barrage down to the Okhla barrage—accounts "
    "for less than 2% of the river's total length, yet contributes over 76% of the river's total pollution load. Upstream of Delhi, almost the entire fresh river flow "
    "is diverted at Hathnikund Barrage in Haryana for irrigation canals and municipal drinking water. As a result, the river enters Delhi at Wazirabad with virtually "
    "zero fresh environmental baseflow (E-flow) during non-monsoon months. Within Delhi, 22 major un-trapped municipal storm drains (including the infamous Najafgarh "
    "and Shahdara drains) discharge over 3,500 million liters per day (MLD) of untreated and partially treated sewage, industrial tanneries effluent, and chemical waste "
    "directly into the dry riverbed. During festival seasons, dramatic images of thick, white, toxic foam floating on the river at Kalindi Kunj and Okhla barrage "
    "make international headlines. Environmental chemists determined that the toxic frothing is caused by high concentrations of non-biodegradable surfactants from "
    "household detergents, industrial phosphate builders, and decaying organic matter. When wastewater plunges over the Okhla barrage gates, mechanical aeration and "
    "turbulence churn the surfactant-rich water into persistent, billowing foam containing pathogenic bacteria and heavy metals. Dissolved oxygen along this entire "
    "stretch remains at 0 mg/L throughout non-monsoon months, rendering the river ecologically dead."
)
P1_M10_QS = [
    case_q("Monitoring the Environment and Pollution", "Yamuna Toxic Frothing Chemistry",
           "What primary chemical compounds in municipal wastewater are responsible for the dramatic toxic foam floating on the Yamuna at Okhla barrage?",
           "High concentrations of synthetic surfactants and phosphate builders from household detergents, churned by mechanical turbulence at the barrage gates",
           ["Naturally occurring sea salt crystals blown from the ocean",
            "Pure liquid nitrogen leaking from atmospheric research stations",
            "Frozen snow crystals falling during unexpected tropical blizzards"],
           "Toxic foam is caused by untreated laundry detergent surfactants and phosphates: high surface-active agents foam up when plunged over weir barrages."),
    case_q("Monitoring the Environment and Pollution", "Ecological Flow (E-Flow) Absence in Yamuna",
           "Why does the Yamuna river become completely incapable of natural self-purification and dilution as it flows through Delhi?",
           "Because nearly 100% of fresh river water is diverted upstream at Hathnikund barrage, leaving zero natural environmental baseflow to dilute incoming city sewage",
           ["Because the river flows through a subterranean underground cavern beneath Delhi",
            "Because Delhi's high altitude causes water to flow backwards toward the Himalayas",
            "Because the riverbed is made of porous volcanic pumice that absorbs water"],
           "Upstream diversions at Hathnikund strip the river of fresh dilution water; in Delhi, the Yamuna consists entirely of raw sewage without environmental flows."),
    case_q("Monitoring the Environment and Pollution", "Dissolved Oxygen in Delhi Yamuna",
           "What is the characteristic Dissolved Oxygen (DO) level measured by CPCB across the Yamuna from Wazirabad to Okhla during non-monsoon months?",
           "0 mg/L (Absolute anoxia, supporting zero aquatic fish life)",
           ["14.0 mg/L (Super-saturated pristine water)",
            "8.0 mg/L (Optimal drinking water quality)",
            "5.0 mg/L (Safe outdoor bathing standard)"],
           "Continuous sewage discharges consume all available oxygen, keeping DO at 0 mg/L along the 22-km Delhi stretch throughout the dry season."),
    case_q("Monitoring the Environment and Pollution", "Najafgarh Drain Contribution",
           "In Delhi's urban drainage network, which massive channel contributes over 60% of the total sewage and wastewater volume entering the Yamuna?",
           "Najafgarh Drain (the channelized outfall of the Sahibi River basin)",
           ["Barapullah Drain", "Shahdara Drain", "Delhi Gate Drain"],
           "The Najafgarh drain is Delhi's largest sewage channel, discharging over 2,000 MLD of wastewater and accounting for ~60% of the city's pollution load."),
    case_q("Monitoring the Environment and Pollution", "Interception and Diversion (I&D) Engineering Solution",
           "Under the Yamuna Action Plan and Namami Gange, what is the primary engineering strategy of 'Interception and Diversion' (I&D) projects?",
           "Tapping open sewage drains before they reach the river and laying parallel interceptor trunk sewers to divert wastewater directly to modern Sewage Treatment Plants",
           ["Spraying chemical perfume into the open river to mask sewage smells",
            "Building high concrete walls along the river so citizens cannot see the water",
            "Pumping polluted river water into private domestic swimming pools"],
           "Interception & Diversion (I&D) captures sewage flowing through open storm drains, routing it through interceptor sewers to treatment plants before it hits the river.")
]

P2_M10_TXT = (
    "Read the following forest rights and indigenous self-governance case study and answer the questions that follow:\\n\\n"
    "Mendha-Lekha, a small Gond tribal village in the Gadchiroli district of Maharashtra, made historic legal history in 2011 by becoming the very first village in "
    "India to secure formal statutory ownership and harvesting rights over bamboo under the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of "
    "Forest Rights) Act, 2006 (FRA). For over a century under colonial and post-colonial forest policies, the State Forest Department held absolute monopoly over "
    "forests, leasing out bamboo forests to commercial paper mills at nominal rates while criminalizing tribal collection. Led by visionary local leaders (such as "
    "Devaji Tofa), the village adopted the radical constitutional principle of grassroots direct democracy encapsulated in their famous slogan: 'Dilli, Mumbai mein "
    "hamari sarkar, hamare gaon mein hum hi sarkar' (In Delhi and Mumbai we elect our government, but in our village, we are the government). Following the "
    "operationalization of FRA 2006, the Mendha-Lekha Gram Sabha asserted Community Forest Resource (CFR) rights under Section 3(1)(i) over 1,800 hectares of their "
    "ancestral forest. In April 2011, Union Environment Minister Jairam Ramesh handed over transit pass authority directly to the Gram Sabha, legally ending the "
    "classification of bamboo as 'timber' and affirming its statutory status as a Non-Timber Minor Forest Produce (MFP). The Gram Sabha formulated strict internal "
    "conservation guidelines: rotational bamboo harvesting, fireline clearing, and equitable distribution of commercial auction profits into a village bank fund."
)
P2_M10_QS = [
    case_q("International Environmental Treaties and Indian Policy", "Mendha-Lekha Historic Milestone",
           "Why is the Gond tribal village of Mendha-Lekha in Maharashtra celebrated as a landmark historic milestone in Indian environmental history?",
           "It became the first village in India to be legally granted Community Forest Resource (CFR) rights and transit pass authority over bamboo under FRA 2006",
           ["It was the first village to completely clear-fell all forest trees to build a factory",
            "It was the first village to ban all forms of agriculture",
            "It was the site where commercial nuclear power was first generated in India"],
           "In April 2011, Mendha-Lekha became India's first village to exercise sovereign Community Forest Rights (CFR) over bamboo under the Forest Rights Act."),
    case_q("International Environmental Treaties and Indian Policy", "Legal Reclassification of Bamboo",
           "Under the Forest Rights Act 2006 and the Indian Forest (Amendment) Act 2017, what crucial legal reclassification restored bamboo rights to forest dwellers?",
           "Bamboo harvested outside forest areas was legally removed from the colonial definition of 'Tree / Timber' and categorized as a Minor Forest Produce (MFP)",
           ["Bamboo was declared an illegal toxic weed subject to nationwide eradication",
            "Bamboo was reclassified as a synthetic chemical plastic polymer",
            "Bamboo was classified as an endangered animal protected under Schedule I"],
           "FRA 2006 and 2017 amendments removed bamboo from the definition of 'timber', recognizing it as non-timber minor forest produce owned by forest dwellers."),
    case_q("International Environmental Treaties and Indian Policy", "Community Forest Resource (CFR) Rights Scope",
           "Under Section 3(1)(i) of the Forest Rights Act 2006, what does a 'Community Forest Resource' (CFR) title grant to a village Gram Sabha?",
           "The statutory right to protect, regenerate, conserve, and sustainably manage their traditional community forest resources for sustainable use",
           ["The right to sell the forest land to foreign private real estate developers",
            "The right to establish private commercial chemical weapons testing ranges",
            "The right to evict all neighboring wild animals from the national boundary"],
           "CFR rights legally empower the Gram Sabha to govern, protect, and sustainably harvest their traditional customary forests without forest department interference."),
    case_q("International Environmental Treaties and Indian Policy", "Gram Sabha Supreme Authority under FRA",
           "In the statutory framework of the Forest Rights Act 2006, which democratic local institution is recognized as the supreme decision-making authority?",
           "The Gram Sabha (the full village assembly of all adult resident voting citizens)",
           ["The State Principal Chief Conservator of Forests (PCCF)",
            "The Divisional Forest Officer (DFO)",
            "The commercial paper mill management board"],
           "FRA 2006 radically democratized forestry by establishing the Gram Sabha as the apex statutory authority to initiate, verify, and approve forest rights claims."),
    case_q("International Environmental Treaties and Indian Policy", "Democratic Slogan of Mendha-Lekha",
           "What famous democratic self-rule slogan coined by the villagers of Mendha-Lekha epitomized their assertion of grassroots constitutional sovereignty?",
           "'In Delhi and Mumbai we elect our government, but in our village, we are the government'",
           ["'Export all trees to foreign countries for maximum profit'",
            "'Burn the forests to build concrete shopping plazas'",
            "'Only private companies can protect the environment'"],
           "Devaji Tofa and Mendha-Lekha villagers asserted direct democracy through: 'Dilli, Mumbai mein hamari sarkar, hamare gaon mein hum hi sarkar'.")
]
'''

with open('scripts/subject_generators/make_evs_p6_10.py', 'w') as f:
    f.write(p6_to_10)

print("make_evs_p6_10.py written.")
