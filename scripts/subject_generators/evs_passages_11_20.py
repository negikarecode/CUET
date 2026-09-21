import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, os.path.dirname(__file__))
from slot_helpers import case_q

# ==============================================================================
# MOCK 11 PASSAGES
# ==============================================================================
P1_M11_TXT = (
    "Read the following case study on invasive alien flora and forest degradation and answer the questions that follow:\n\n"
    "In the tropical deciduous forests and tiger reserves of Central India (such as Kanha, Bandhavgarh, and Corbett), the explosive proliferation "
    "of Lantana camara—a woody shrub native to tropical South America introduced during British colonial times as an ornamental hedge—has precipitated "
    "an ecological crisis. Lantana exhibits formidable invasive traits: high reproductive output via bird-dispersed berries, rapid vegetative regeneration "
    "following cutting or burning, and potent allelopathy. It secretes allelochemical triterpenoids (such as lantadene A and B) from its foliage and roots "
    "into the soil, aggressively inhibiting the seed germination, mycorrhizal association, and root elongation of native grasses (like Heteropogon and Themeda) "
    "and valuable timber saplings (such as Sal and Teak). As dense, impenetrable thorny thickets monopolize the forest understory, native herbaceous fodder "
    "disappears, dramatically lowering the carrying capacity for wild herbivores (chital, sambar, and gaur). Herbivores are forced into forest fringes, "
    "intensifying human-wildlife conflict and altering predator-prey dynamics. Furthermore, Lantana's high volatile oil content transforms benign ground leaf fires "
    "into destructive canopy-reaching wildfires. To combat this menace, forest ecologists developed the 'Cut-Root-Stock' method—severing the taproot below "
    "the soil collar without disturbing the soil crust—followed by immediate ecological restoration with native perennial grasses."
)
P1_M11_QS = [
    case_q("Human Beings and Nature", "Lantana Allelopathic Mechanism",
           "How does Lantana camara biochemically suppress the regeneration of native grasses and timber saplings in Indian tiger reserves?",
           "By exuding allelopathic triterpenoid compounds (such as lantadenes) into the soil that inhibit seed germination and root growth of native flora",
           ["By releasing radioactive isotopes that poison the forest groundwater",
            "By physically swallowing native tree seeds through carnivorous insectivorous leaves",
            "By cooling the surrounding soil temperature to absolute freezing zero"],
           "Lantana synthesizes allelochemicals (lantadenes) that leach into soil, inhibiting seed germination and seedling growth of neighboring native plants."),
    case_q("Human Beings and Nature", "Trophic Cascade Impacts",
           "What is the primary trophic cascade consequence of dense Lantana infestation in protected tiger reserves?",
           "The disappearance of palatable native fodder grasses sharply reduces herbivore carrying capacity, forcing herbivores and tigers toward fringe villages",
           ["Herbivore populations experience massive uncontrolled population explosions",
            "Carnivorous tigers transition exclusively into fruit-eating herbivores",
            "Forest rivers completely stop flowing due to water consumption by deer"],
           "By replacing edible grasses with toxic unpalatable shrubs, Lantana decimates herbivore food supply, depressing ungulate and tiger density."),
    case_q("Human Beings and Nature", "Wildfire Flammability Alteration",
           "Why does Lantana camara proliferation dramatically elevate the severity of forest fires in tropical deciduous forests?",
           "Its high biomass density and volatile oil content act as continuous ladder fuel, carrying mild ground fires up into destructive forest canopy fires",
           ["It generates explosive methane gas pockets inside its leaves",
            "It attracts electrical lightning strikes during dry winter days",
            "It produces industrial gunpowder within its woody bark"],
           "Lantana creates massive woody ladder fuels rich in volatile oils, converting low-intensity ground fires into catastrophic high-intensity crown fires."),
    case_q("Human Beings and Nature", "Cut-Root-Stock Removal Method",
           "In ecological habitat management, what is the 'Cut-Root-Stock' technique recommended for eradicating Lantana?",
           "Severing the primary taproot 5 to 7 cm below the soil collar using a specialized lever without inverting or heavily disturbing the soil",
           ["Spraying concentrated sulfuric acid over entire national parks",
            "Bulldozing and incinerating all topsoil across the entire wildlife sanctuary",
            "Flooding the entire tiger reserve with salt water"],
           "The Cut-Root-Stock method cuts the taproot below the dormant bud zone with minimal soil disturbance, preventing vigorous resprouting and soil erosion."),
    case_q("Human Beings and Nature", "Statutory Framework on Invasive Species",
           "Under India's Wild Life (Protection) Amendment Act 2022 and the Convention on Biological Diversity (CBD), what is the policy mandate on invasive alien species?",
           "To prevent the introduction of, control, or eradicate alien species that threaten ecosystems, habitats, or native species",
           ["To actively import exotic invasive weeds to replace native Indian flora",
            "To grant statutory constitutional protection to all foreign invasive plants",
            "To ban all scientific ecological restoration in wildlife reserves"],
           "Both CBD Article 8(h) and WPA amendments mandate strict surveillance, control, and eradication of invasive alien species to preserve indigenous biodiversity.")
]

P2_M11_TXT = (
    "Read the following infrastructure, biodiversity, and indigenous rights case study and answer the questions that follow:\n\n"
    "The Government of India's ambitious Great Nicobar Island Holistic Development Project—envisaging an International Container Transshipment Terminal (ICTT), "
    "a greenfield military-civilian international airport, a township, and a gas-and-solar power plant spanning 166 square kilometers—has sparked profound "
    "ecological and human rights concerns. Great Nicobar Island, situated at the southern tip of the Andaman and Nicobar archipelago, is an internationally "
    "recognized UNESCO Biosphere Reserve harboring globally unique evergreen tropical rainforests, pristine coral reefs, and extensive mangrove ecosystems. "
    "The project site at Galathea Bay is the world's most significant nesting beach for the Giant Leatherback Sea Turtle (Dermochelys coriacea), an endangered "
    "pelagic reptile protected under Schedule I of the Wild Life (Protection) Act, 1972. The island is also home to endemic endangered species including the "
    "Nicobar Megapode (a mound-building bird), the Nicobar Tree Shrew, and the Nicobar Long-Tailed Macaque. Socioculturally, the island is the ancestral "
    "homeland of the Shompen, a hunter-gatherer Particularly Vulnerable Tribal Group (PVTG) living in voluntary isolation, and the coastal Nicobarese. Environmental "
    "analysts point out that diverting 130 square kilometers of primary rainforest entails felling nearly one million old-growth trees, triggering irreversible "
    "biodiversity loss that cannot be mitigated by compensatory afforestation carried out thousands of kilometers away in arid mainland states like Haryana."
)
P2_M11_QS = [
    case_q("Human Beings and Nature", "Galathea Bay Turtle Conservation",
           "Why is Galathea Bay on Great Nicobar Island considered of paramount global marine biodiversity significance?",
           "It serves as one of the world's premier, irreplaceable nesting beaches for the endangered Giant Leatherback Sea Turtle (Dermochelys coriacea)",
           ["It is the exclusive breeding sanctuary for Arctic polar bears",
            "It is the only freshwater lake in the Bay of Bengal",
            "It hosts the world's largest commercial salmon fish farm"],
           "Galathea Bay is a globally vital nesting ground for the giant leatherback turtle, the largest living marine reptile, protected under WPA Schedule I."),
    case_q("Human Beings and Nature", "Endemic Avifauna Threatened",
           "Which unique mound-building endemic bird species faces critical nesting ground destruction from the Great Nicobar development project?",
           "The Nicobar Megapode (Megapodius nicobariensis)",
           ["The Great Indian Hornbill", "The Himalayan Monal", "The Indian Peafowl"],
           "The Nicobar Megapode builds large coastal incubation mounds of sand and leaf litter, making it highly vulnerable to coastal port development."),
    case_q("Human Beings and Nature", "Indigenous PVTG Rights",
           "Which indigenous Particularly Vulnerable Tribal Group (PVTG) residing in pristine isolation within Great Nicobar faces severe existential risks?",
           "The Shompen",
           ["The Toda", "The Santhal", "The Gond"],
           "The Shompen are an isolated, nomadic hunter-gatherer PVTG whose customary hunting habitats and survival depend on intact primary rainforests."),
    case_q("Human Beings and Nature", "Critique of Compensatory Afforestation",
           "What is the primary ecological critique regarding 'Compensatory Afforestation' proposed in distant mainland states (e.g., Haryana) for island forest felling?",
           "Monoculture plantations in semi-arid mainland regions cannot replicate the complex biodiversity, endemic microhabitats, or ecological sinks of insular equatorial rainforests",
           ["Mainland plantations produce too much oxygen, creating dangerous atmospheric fires",
            "Trees planted in Haryana grow ten times faster than tropical island trees",
            "The law strictly mandates that no trees can ever be planted in northern India"],
           "Compensatory afforestation in distant, non-contiguous semi-arid zones fails to compensate for the loss of irreplaceable, endemic-rich tropical island rainforests."),
    case_q("Human Beings and Nature", "UNESCO Biosphere Reserve Status",
           "Under which international scientific framework was Great Nicobar designated a Biosphere Reserve in 2013?",
           "UNESCO's Man and the Biosphere (MAB) Programme",
           ["The Antarctic Treaty System", "The World Intellectual Property Organization", "The International Maritime Organization Port Treaty"],
           "Great Nicobar was declared a UNESCO Biosphere Reserve under the MAB Programme in 2013, recognizing its exceptional terrestrial and marine ecosystems.")
]

# ==============================================================================
# MOCK 12 PASSAGES
# ==============================================================================
P1_M12_TXT = (
    "Read the following hydrogeological and public health case study and answer the questions that follow:\n\n"
    "In the semi-arid district of Nalgonda in Telangana, widespread drilling of deep tube wells during the Green Revolution tapped into the deep granitic and "
    "gneissic Precambrian basement aquifer. These deep crystalline igneous rocks are naturally rich in fluoride-bearing minerals such as fluorite (CaF2), "
    "fluorapatite, and biotite mica. The alkaline hydrochemical environment, coupled with high sodium bicarbonate concentrations and prolonged groundwater "
    "residence times, accelerates rock-water interactions, dissolving fluoride ions into drinking water at concentrations ranging from 2.0 to over 10.0 mg/L—far "
    "exceeding the Bureau of Indian Standards (BIS 10500) permissible safety limit of 1.0 to 1.5 mg/L. Decades of chronic ingestion of this high-fluoride water "
    "caused severe endemic fluorosis across hundreds of villages. In growing children, excess fluoride disrupts ameloblast enamel formation, producing chalky "
    "white patches and brown, corroded teeth ('Dental Fluorosis'). In adults, lifelong accumulation in the hydroxyapatite crystal lattice of bones causes "
    "'Skeletal Fluorosis', characterized by bone hardening, calcification of intervertebral ligaments, severe joint stiffness, and debilitating physical "
    "deformities like 'knock-knees' (Genu Valgum) and crippled spines. In response, NEERI engineered the low-cost 'Nalgonda Technique'—a chemical precipitation "
    "method using alum (aluminum sulfate) and lime (calcium hydroxide) followed by bleaching powder. Ultimately, the comprehensive solution was achieved "
    "through the state's Mission Bhagiratha project, which replaced contaminated tube well sources with treated surface water from the Krishna River basin."
)
P1_M12_QS = [
    case_q("Monitoring the Environment and Pollution", "BIS Permissible Limit for Fluoride",
           "According to the Bureau of Indian Standards (BIS 10500:2012) drinking water specification, what is the maximum acceptable and permissible limit for fluoride?",
           "Acceptable limit of 1.0 mg/L, extendable up to 1.5 mg/L in the absence of an alternative source",
           ["10.0 to 20.0 mg/L", "0.001 to 0.005 mg/L", "50.0 to 100.0 mg/L"],
           "BIS 10500 sets 1.0 mg/L as the acceptable limit and 1.5 mg/L as the maximum permissible limit for fluoride in drinking water."),
    case_q("Monitoring the Environment and Pollution", "Hydrogeological Source of Contamination",
           "What is the natural geological source of widespread fluoride contamination in Nalgonda's groundwater aquifers?",
           "The chemical weathering and dissolution of fluorite and fluorapatite minerals present in the deep Precambrian granitic basement rocks",
           ["Heavy surface dumping of plastic bottles and electronic waste",
            "Atmospheric fallout from nuclear power generation plants",
            "Excessive use of nitrogenous urea fertilizers on agricultural crops"],
           "Nalgonda fluorosis is geogenic: deep borewells tap into granitic basement rocks rich in fluorite and fluorapatite minerals."),
    case_q("Monitoring the Environment and Pollution", "Skeletal Fluorosis Pathology",
           "What distinguishing physiological and skeletal deformities characterize severe, chronic Skeletal Fluorosis in afflicted populations?",
           "Excessive calcification of ligaments, extreme joint stiffness, and physical bone deformities such as knock-knees (Genu Valgum) and bent spines",
           ["Rapid loss of hearing and total balance impairment only",
            "Severe lung tissue fibrosis and asthma",
            "Complete paralysis of the ocular eye muscles"],
           "Skeletal fluorosis causes excessive deposition of fluoride in bones and ligaments, resulting in crippling stiffness and genu valgum (knock-knees)."),
    case_q("Monitoring the Environment and Pollution", "Chemical Principle of Nalgonda Technique",
           "What basic chemical reagents are sequentially added in the famous 'Nalgonda Technique' developed by NEERI for defluoridation?",
           "Alum (Aluminum Sulfate) as a coagulant, Lime (Calcium Oxide/Hydroxide) as an alkaline buffer, and Bleaching Powder for disinfection",
           ["Potassium cyanide and mercury chloride",
            "Hydrochloric acid and sodium hydroxide",
            "Liquid methane and diesel fuel"],
           "The Nalgonda technique uses lime to buffer alkalinity and alum to precipitate poly-aluminum hydroxides that adsorb and co-precipitate fluoride ions."),
    case_q("Monitoring the Environment and Pollution", "Long-Term Policy Solution",
           "What sustainable engineering and public health intervention successfully mitigated Nalgonda's fluorosis epidemic under Mission Bhagiratha?",
           "Abandoning deep fluoride-rich groundwater borewells in favor of treated, piped surface water supplied from perennial river basins",
           ["Digging borewells twice as deep into the earth's mantle",
            "Mandating that villagers drink only distilled water boiled with wood",
            "Adding synthetic fluoride powder into all public village wells"],
           "Mission Bhagiratha resolved fluorosis by providing treated surface river water (from the Krishna and Godavari basins), bypassing toxic aquifers.")
]

P2_M12_TXT = (
    "Read the following grassroots environmental history case study and answer the questions that follow:\n\n"
    "In March 1974, in the remote Himalayan village of Reni in the Chamoli district of Uttarakhand (then Uttar Pradesh), twenty-seven village women led by "
    "Gaura Devi stood defiantly in front of commercial logging contractors armed with axes and saws. When the men of the village were lured away to Chamoli "
    "town by government officials under the pretext of receiving land compensation, the loggers arrived to fell 2,415 trees in the Reni forest, which had "
    "been auctioned by the state forest department to a commercial sports goods manufacturer. Gaura Devi mobilized the women, who rushed into the snowy forest, "
    "joined hands, and clung physically to the trunks of the trees, declaring: 'The forest is our mother's home; we will not let you axe it. Shoot us first "
    "before striking the trees.' Faced with the unyielding physical courage of the women, the loggers retreated empty-handed. This act galvanized the Chipko "
    "Andolan, an eco-movement rooted in Gandhian non-violence (Satyagraha) and spearheaded by community leaders like Chandi Prasad Bhatt (founder of Dasholi "
    "Gram Swarajya Sangh) and Sunderlal Bahuguna. The movement emerged directly from the lived experience of the devastating 1970 Alaknanda flash flood, which "
    "demonstrated to hill villagers that clear-cutting hill slopes caused catastrophic landslides and siltation. Chipko became a global symbol of Ecofeminism, "
    "asserting that women—who walk miles daily to collect fuel, fodder, and clean water—are the foremost ecological protectors against commercial exploitation."
)
P2_M12_QS = [
    case_q("Human Beings and Nature", "Reni Village Resistance Leader",
           "Who was the fearless grassroots woman leader who led the 27 village women in hugging the trees at Reni village in March 1974?",
           "Gaura Devi",
           ["Medha Patkar", "Amrita Devi Bishnoi", "Aruna Roy"],
           "Gaura Devi organized and led the women of Reni village to physically hug the trees, forcing the commercial loggers to retreat."),
    case_q("Human Beings and Nature", "Ecological Trigger of Chipko",
           "What major natural disaster in 1970 alerted the local Himalayan villagers to the catastrophic consequences of commercial hillside deforestation?",
           "The devastating Alaknanda River flash floods and landslides",
           ["A severe volcanic eruption in the Siwalik hills",
            "A sudden glacial advance destroying Chamoli town",
            "A massive sea tsunami hitting the mountain peaks"],
           "The 1970 Alaknanda flood washed away hundreds of homes and bridges, teaching villagers that tree cover is essential for soil and water retention."),
    case_q("Human Beings and Nature", "Ecofeminist Core Rationale",
           "In environmental sociology, why is the Chipko Movement hailed as a classic manifestation of Ecofeminism?",
           "Because rural hill women bore the direct burden of ecological destruction in gathering daily fuel, fodder, and water, and spearheaded conservation",
           ["Because only women were legally permitted to own land in Uttar Pradesh",
            "Because men were strictly prohibited by religious scripture from visiting the forest",
            "Because women wanted to cut down the forest themselves to build factories"],
           "Ecofeminism highlights how environmental degradation disproportionately impacts women, motivating their militant leadership in ecological defense."),
    case_q("Human Beings and Nature", "Famous Chipko Slogan",
           "What poetic ecological slogan, popularized by Bachni Devi and Chipko activists, encapsulated the ecological services of mountain forests?",
           "'What do the forests bear? Soil, water and pure air. Soil, water and pure air are the basis of life.'",
           ["'Cut the trees to make paper and wealth.'",
            "'Trees are meant for timber, resin and commercial profit.'",
            "'Nature is the enemy of modern industrial growth.'"],
           "The iconic Chipko slogan emphasized vital ecological services (soil conservation, hydrological regulation, and clean air) over commercial timber exploitation."),
    case_q("Human Beings and Nature", "Indira Gandhi 1980 Policy Outcome",
           "Following sustained Chipko agitation and representations by Sunderlal Bahuguna, what major policy decree was issued by Prime Minister Indira Gandhi in 1980?",
           "A 15-year statutory ban on commercial green felling in the Himalayan forests above 1,000 meters elevation",
           ["The privatization of all Himalayan national parks to foreign logging firms",
            "The mandatory clear-felling of all pine and oak trees in northern India",
            "The permanent abolition of the Indian Forest Service"],
           "In 1980, Prime Minister Indira Gandhi enforced a 15-year moratorium on commercial green tree felling in the Himalayan forests of UP.")
]

# ==============================================================================
# MOCK 13 PASSAGES
# ==============================================================================
P1_M13_TXT = (
    "Read the following cryospheric climate science case study and answer the questions that follow:\n\n"
    "Permafrost—defined as ground, sediment, or rock that remains continuously at or below 0 degrees Celsius for at least two consecutive years—underlies "
    "approximately 24 percent of the exposed land surface in the Northern Hemisphere, spanning vast tracts of Siberia, Alaska, Canada, and the Tibetan Plateau. "
    "These frozen soils act as an immense global carbon sink, trapping an estimated 1,400 to 1,600 gigatons of ancient organic carbon (the undecayed remains "
    "of Pleistocene plants, mammoths, and microbial biomass)—nearly double the total carbon currently present in Earth's entire atmosphere. As anthropogenic "
    "greenhouse gas emissions drive polar amplification, Arctic temperatures are rising at three to four times the global average rate. This intense warming "
    "induces widespread permafrost thaw. As the ground collapses, water collects in depressions, forming millions of 'Thermokarst Lakes'. Within the anoxic, "
    "waterlogged benthic muds of these thermokarst lakes, anaerobic methanogenic archaea rapidly decompose thawed organic matter, releasing massive bubbling "
    "plumes of methane (CH4), alongside carbon dioxide (CO2). Because methane is a potent greenhouse gas with a Global Warming Potential (GWP) 28 times greater "
    "than CO2 over a 100-year timescale, this degassing creates a dangerous self-reinforcing 'Positive Climate Feedback Loop': warming thaws permafrost, releasing "
    "GHGs that trap more heat, triggering further thaw. Additionally, thawing permafrost causes catastrophic coastal erosion, collapses Arctic infrastructure, "
    "and risks releasing long-dormant pathogens, such as the 2016 Siberian anthrax outbreak linked to thawing infected reindeer carcasses."
)
P1_M13_QS = [
    case_q("International Environmental Treaties and Indian Policy", "Permafrost Scientific Definition",
           "In cryospheric science, what is the precise operational definition of 'Permafrost'?",
           "Ground, sediment, or bedrock that remains continuously frozen at or below 0°C for at least two consecutive years",
           ["Snow cover that falls during a single winter blizzard",
            "Sea ice floating on the surface of the Arctic Ocean",
            "Glacial ice moving downhill through a mountain valley"],
           "Permafrost is defined purely by temperature: ground remaining at or below 0°C continuously for two or more years."),
    case_q("International Environmental Treaties and Indian Policy", "Arctic Carbon Reservoir Scale",
           "Approximately how much ancient organic carbon is sequestered within the Northern Hemisphere's permafrost soils?",
           "Between 1,400 and 1,600 gigatons of carbon—nearly twice the amount currently residing in Earth's atmosphere",
           ["Less than 10 kilograms of organic matter",
            "Exactly the same as one single pine tree forest in Europe",
            "500 trillion gigatons of pure diamonds"],
           "Permafrost sequesters an estimated ~1,500 Gt of organic carbon, representing roughly double the atmospheric carbon stock."),
    case_q("International Environmental Treaties and Indian Policy", "Thermokarst Methane Release Mechanism",
           "Why do newly formed 'Thermokarst Lakes' in thawing tundra landscapes emit massive quantities of biogenic methane (CH4)?",
           "Waterlogged, collapsed soils create anoxic benthic environments where anaerobic methanogens decompose thawed organic matter",
           ["The lake water boils spontaneously due to geothermal lava flows",
            "Fish in the lakes synthesize methane through pulmonary breathing",
            "Algae absorb atmospheric nitrogen and convert it into methane gas"],
           "Thermokarst collapse creates waterlogged, oxygen-depleted conditions where anaerobic microbes digest ancient organic matter into CH4."),
    case_q("International Environmental Treaties and Indian Policy", "Permafrost Positive Feedback Loop",
           "Why is permafrost thaw classified as a dangerous 'Positive Feedback Loop' in global climate change models?",
           "Because warming induces thawing, which releases greenhouse gases (CO2 and CH4) that amplify global warming, accelerating further thawing",
           ["Because it cools down the planet and instantly triggers a global ice age",
            "Because thawing ice permanently absorbs all solar radiation without reflecting heat",
            "Because it completely eliminates all greenhouse gases from the planet"],
           "A positive feedback loop is a self-amplifying cycle: warming -> permafrost thaw -> GHG release -> more warming -> faster thaw."),
    case_q("International Environmental Treaties and Indian Policy", "Biological Pathogen Threat",
           "What biological health risk was demonstrated in 2016 when unseasonable permafrost thaw occurred in the Yamal Peninsula of Siberia?",
           "The resurgence of viable Bacillus anthracis (Anthrax) bacterial spores from decades-old thawed reindeer carcasses",
           ["The sudden airborne emergence of living Tyrannosaurus Rex clones",
            "The spontaneous creation of synthetic chemical nerve agents",
            "The total extinction of all Arctic marine fish species"],
           "In 2016, thawing permafrost exposed an anthrax-infected reindeer carcass buried in 1941, triggering an outbreak that hospitalized dozens of people.")
]

P2_M13_TXT = (
    "Read the following biomedical waste regulatory and health case study and answer the questions that follow:\n\n"
    "Healthcare establishments generate diverse categories of clinical waste that, if unsegregated, pose severe biohazard risks of nosocomial infections, "
    "accidental needle-stick injuries, and environmental contamination. Under India's Bio-Medical Waste Management Rules, 2016 (notified under the Environment "
    "Protection Act, 1986), mandatory color-coded segregation at the exact point of generation is statutory. The rules designate four distinct color streams: "
    "1. Yellow Bins: for anatomical waste, animal carcasses, soiled dressings, expired cytotoxic drugs, and microbiology cultures, which must be treated via "
    "high-temperature two-stage Incineration (primary chamber at 800°C and secondary chamber at 1050°C to destroy toxic hydrocarbons) or plasma pyrolysis; "
    "2. Red Bins: for contaminated recyclable plastic wastes (such as IV tubes, catheters, urine bags, and disposable syringes without needles), which undergo "
    "disinfection via Autoclaving or Microwaving followed by mechanical shredding for plastic recycling; 3. White Translucent Puncture-Proof Containers: strictly "
    "for sharps (needles, scalpels, blades, contaminated glass slides) to prevent transmission of blood-borne pathogens (Hepatitis B, Hepatitis C, and HIV), "
    "treated by dry heat sterilization or encapsulation; and 4. Blue Cardboard Boxes: for broken contaminated glassware and metal orthopedic implants. "
    "The 2016 rules strictly prohibit the use of chlorinated plastic bags to prevent toxic dioxin and furan emissions during incineration and mandate barcoding "
    "and GPS tracking of all waste bags destined for Common Bio-medical Waste Treatment Facilities (CBWTF)."
)
P2_M13_QS = [
    case_q("Monitoring the Environment and Pollution", "Golden Rule of Biomedical Waste",
           "What is the foundational management principle mandated by the Bio-Medical Waste Management Rules, 2016 to prevent widespread contamination?",
           "Mandatory color-coded segregation of all waste streams strictly at the exact point of generation",
           ["Mixing all medical wastes with municipal vegetable garbage before disposal",
            "Dumping all hospital waste into open municipal storm sewers",
            "Burying untreated sharps and plastics in hospital front lawns"],
           "Segregation at source into designated color-coded containers is the single most critical rule of biomedical waste management."),
    case_q("Monitoring the Environment and Pollution", "Yellow Category Disposal Method",
           "Under the 2016 BMWM Rules, in which color-coded container must human anatomical tissues and soiled cotton bandages be discarded, and how are they treated?",
           "Yellow non-chlorinated bags; treated by high-temperature incineration or plasma pyrolysis",
           ["Blue cardboard boxes; washed with tap water and reused in surgery",
            "Red plastic containers; buried directly in open agricultural fields",
            "White puncture-proof containers; recycled into household drinking straws"],
           "Yellow bags hold anatomical and pathological waste, requiring high-temperature incineration (1050°C in the secondary chamber) to destroy pathogens."),
    case_q("Monitoring the Environment and Pollution", "Red Category Plastic Recycling Route",
           "How must contaminated plastic wastes (such as IV bottles, tubing, and syringes without needles) discarded in Red bins be processed before recycling?",
           "They must be sterilized through autoclaving or microwaving, followed by mechanical shredding",
           ["They must be directly burned in open community campfires",
            "They must be dissolved in raw milk and fed to livestock",
            "They must be packaged and sold immediately as new medical devices"],
           "Red waste plastics undergo non-burn sterilization (autoclaving/microwaving) and shredding, ensuring they are pathogen-free before plastic recycling."),
    case_q("Monitoring the Environment and Pollution", "White Container Sharps Safety",
           "Why are puncture-proof, leak-proof White Translucent containers mandatory for disposing of needles, scalpels, and blades?",
           "To eliminate accidental needle-stick injuries that transmit deadly blood-borne viruses (such as Hepatitis B, Hepatitis C, and HIV) to healthcare workers",
           ["To ensure needles remain razor-sharp for secondary black-market resale",
            "To prevent needles from rusting when exposed to sunlight",
            "To make hospital trash cans look visually attractive to visitors"],
           "White puncture-proof containers prevent sharps injuries, protecting waste handlers and nurses from lethal blood-borne infections (HIV, HBV, HCV)."),
    case_q("Monitoring the Environment and Pollution", "Prohibition of Chlorinated Plastics",
           "Why do the Bio-Medical Waste Management Rules strictly ban the use of chlorinated plastic bags and gloves in hospitals?",
           "Because incinerating chlorinated plastics generates highly carcinogenic, persistent organic pollutants: Dioxins and Furans",
           ["Because chlorinated plastics decompose instantly into liquid nitrogen",
            "Because chlorinated plastics attract stray dogs into hospital wards",
            "Because chlorinated plastics freeze when placed in indoor rooms"],
           "Combustion of chlorinated plastics at incinerators releases highly toxic, persistent, bioaccumulative dioxins and polychlorinated dibenzofurans.")
]

# ==============================================================================
# MOCK 14 PASSAGES
# ==============================================================================
P1_M14_TXT = (
    "Read the following Western Ghats ecological governance case study and answer the questions that follow:\n\n"
    "The Western Ghats, an ancient mountain range extending 1,600 kilometers across six Indian states (Gujarat, Maharashtra, Goa, Karnataka, Kerala, and "
    "Tamil Nadu), is recognized as one of the world's 36 Global Biodiversity Hotspots and a UNESCO World Heritage Site. Hosting thousands of endemic flowering "
    "plants, amphibians, birds, and mammals, the Ghats also act as the hydrological water tower of peninsular India, giving birth to major rivers including "
    "the Godavari, Krishna, and Kaveri. In 2010, the Ministry of Environment and Forests constituted the Western Ghats Ecology Expert Panel (WGEEP), chaired by "
    "renowned ecologist Prof. Madhav Gadgil. The landmark 2011 Gadgil Report recommended designating the entire Western Ghats region as an Ecologically Sensitive "
    "Area (ESA), stratifying it into three graded Ecologically Sensitive Zones (ESZ-1, ESZ-2, and ESZ-3). In ESZ-1 (highest priority), Gadgil recommended a "
    "complete ban on mining, stone quarrying, thermal power plants, and large dams, alongside a decentralized, bottom-up participatory framework empowering "
    "local Gram Sabhas to determine land-use changes. However, intense political and industrial opposition across all six states—driven by mining lobbies, "
    "plantation owners, and real estate developers—led the government to shelve the report. In 2012, a High-Level Working Group chaired by space scientist "
    "Dr. K. Kasturirangan was appointed. The Kasturirangan Report (2013) adopted a narrower criterion, bifurcating the Ghats into 'Cultural Landscapes' (63%, "
    "dominated by human settlements and agriculture) and 'Natural Landscapes' (37%, demarcated as ESA). Kasturirangan banned mining, thermal power plants, and "
    "heavily polluting 'red category' industries within the 37% ESA, but excluded agricultural areas and populated villages to make implementation politically viable."
)
P1_M14_QS = [
    case_q("Human Beings and Nature", "Western Ghats Ecological Water Tower",
           "Why is the Western Ghats mountain range considered the indispensable hydrological lifeline of Peninsular India?",
           "Because its cloud-capturing forests capture monsoon precipitation, feeding the perennial headwaters of major peninsular rivers (Krishna, Godavari, Kaveri)",
           ["Because it generates massive oceanic saltwater currents that flow toward Europe",
            "Because it holds the world's largest underground petroleum reserve",
            "Because it freezes all rainfall into permanent ice glaciers"],
           "The Western Ghats intercept the southwest monsoon, sustaining perennial flow in vital peninsular river basins that feed hundreds of millions of people."),
    case_q("Human Beings and Nature", "Gadgil Commission Zonation Model",
           "What core zoning framework was recommended by the 2011 Madhav Gadgil Western Ghats Ecology Expert Panel (WGEEP)?",
           "Designating the entire Western Ghats as an Ecologically Sensitive Area, graded into three zones (ESZ-1, ESZ-2, ESZ-3) with strict prohibitions in ESZ-1",
           ["Abolishing all wildlife sanctuaries and selling the land to international timber corporations",
            "Declaring only 2% of the mountain range as protected while opening 98% to open-cast mining",
            "Constructing a continuous 16-lane concrete expressway along the entire mountain crest"],
           "Gadgil recommended a comprehensive landscape approach: the entire Ghats as ESA, divided into ESZ 1, 2, and 3 based on ecological sensitivity."),
    case_q("Human Beings and Nature", "Gadgil Grassroots Governance Principle",
           "What democratic governance mechanism did Prof. Madhav Gadgil prioritize for environmental decision-making in the Western Ghats?",
           "Decentralized, bottom-up participatory governance empowering local Gram Sabhas under the 73rd Constitutional Amendment and FRA 2006",
           ["Centralized bureaucratic control exercised exclusively by industrial mining corporations",
            "A military dictatorship governing all mountain districts",
            "Handing over all forest revenue collection to foreign private banks"],
           "The Gadgil report championed radical grassroots environmental democracy, placing final developmental veto and approval power with local Gram Sabhas."),
    case_q("Human Beings and Nature", "Kasturirangan Demarcation Methodology",
           "How did the 2013 Kasturirangan Committee (HLWG) alter the demarcation methodology compared to the Gadgil Report?",
           "It bifurcated the Western Ghats into 'Cultural Landscapes' (63% human-modified) and designated only the 'Natural Landscapes' (37%) as an Ecologically Sensitive Area",
           ["It expanded the protected area to encompass 100% of all six peninsular states",
            "It declared that the Western Ghats contain zero endangered or endemic species",
            "It ordered the immediate forced eviction of all 50 million mountain residents"],
           "Kasturirangan pruned the protected area by excluding 63% 'cultural landscape' (villages, plantations) and designating only 37% 'natural landscape' as ESA."),
    case_q("Human Beings and Nature", "Prohibited Activities in Kasturirangan ESA",
           "Which specific high-impact economic activities were strictly prohibited within the 37% ESA demarcated by the Kasturirangan Committee?",
           "Commercial mining, quarrying, sand mining, thermal power plants, and highly polluting 'Red Category' industrial units",
           ["Organic rooftop gardening and domestic rainwater harvesting",
            "Handloom textile weaving and solar cooking in homes",
            "Elementary schooling and traditional Ayurvedic herb gathering"],
           "Kasturirangan banned destructive mega-activities: mining, quarrying, thermal power plants, and red-category industries within the 37% ESA.")
]

P2_M14_TXT = (
    "Read the following green engineering and circular economy case study and answer the questions that follow:\n\n"
    "In the early 2000s, Prof. Rajagopalan Vasudevan, a chemistry professor at Thiagarajar College of Engineering in Madurai, Tamil Nadu, pioneered an "
    "ingenious, patented green technology: utilizing post-consumer waste plastic films to construct highly durable asphalt roads ('Plastic Roads'). "
    "India generates over 3.5 million tonnes of plastic waste annually, of which single-use flexible packaging films (such as polyethylene LDPE carry bags, "
    "polypropylene PP snack wrappers, and multi-layered metallized laminate pouches) constitute the most recalcitrant fraction, commonly choking municipal "
    "drains and open landfills. Dr. Vasudevan engineered a simple dry-process technique: post-consumer plastic waste is shredded into uniform 2-to-4 mm flakes. "
    "Coarse stone aggregates are heated in a hot-mix plant to 160–170 degrees Celsius. When the shredded plastic flakes are sprayed onto the hot stones, the plastic "
    "softens instantly (melting point ~115–165°C), spreading uniformly across the aggregate surface to form an ultra-thin, impermeable polymer coating within "
    "30 to 45 seconds. Immediately thereafter, hot bitumen (160°C) is introduced. Because molten plastic and bitumen are both petroleum-derived hydrocarbons, "
    "they form a robust molecular bond. The plastic coating increases the aggregate's crushing strength, prevents stone stripping, and—crucially—eliminates "
    "water absorption into the road foundation. In conventional bitumen roads, monsoon water ingress causes bitumen stripping, creating potholes. Plastic-tar "
    "roads exhibit double the Marshall stability, resist rutting, tolerate extreme summer road surface temperatures up to 66°C, and consume 8 to 10 percent "
    "less expensive bitumen. Recognized by the Indian Roads Congress (IRC:SP:98 guidelines), the Ministry of Road Transport and Highways (MoRTH) made it "
    "mandatory to use waste plastic in the wearing course of all national highways constructed within 50 kilometers of major urban centers."
)
P2_M14_QS = [
    case_q("Monitoring the Environment and Pollution", "Plastic Road Pioneer",
           "Who is internationally celebrated as the 'Plastic Man of India' for inventing and patenting the technology of building roads from waste plastics?",
           "Prof. Rajagopalan Vasudevan",
           ["Dr. A.P.J. Abdul Kalam", "Prof. C.N.R. Rao", "Dr. M.S. Swaminathan"],
           "Prof. Rajagopalan Vasudevan of Thiagarajar College of Engineering, Madurai, invented and open-sourced plastic road technology."),
    case_q("Monitoring the Environment and Pollution", "Dry Process Coating Mechanism",
           "In the Vasudevan dry process of plastic road construction, how is the waste plastic applied to the road construction material?",
           "Shredded waste plastic flakes are sprayed directly onto stone aggregates heated to 165°C–170°C, melting into a uniform thin polymer coating",
           ["Plastic bags are dissolved in concentrated cold sulfuric acid before mixing",
            "Plastic bottles are burned in an open bonfire and the black ash is mixed with water",
            "Plastic sheets are glued onto the road surface using synthetic carpenter's glue"],
           "Shredded plastic melts over hot stone aggregate (165–170°C) within seconds, forming a uniform hydrophobic polymer coating that binds with bitumen."),
    case_q("Monitoring the Environment and Pollution", "Pothole Prevention Mechanism",
           "Why are plastic-coated bitumen roads vastly superior to conventional asphalt roads during heavy monsoon downpours?",
           "The hydrophobic polymer film seals stone aggregate micropores, completely preventing water ingress and bitumen stripping that cause potholes",
           ["Because plastic absorbs all rainwater and evaporates it into pure hydrogen gas",
            "Because plastic turns rainwater into solid gold nuggets on the road surface",
            "Because plastic dissolves completely when wet, allowing water to drain to the mantle"],
           "Water stripping is the primary cause of potholes: the plastic polymer coating acts as a waterproof barrier, preventing water penetration."),
    case_q("Monitoring the Environment and Pollution", "Waste Stream Upcycled",
           "Which problematic solid waste fraction is most effectively diverted from landfills and upcycled through this plastic road technology?",
           "Non-recyclable single-use flexible plastic films (LDPE bags, polypropylene snack wrappers, multi-layered laminates)",
           ["Heavy lead-acid motor vehicle batteries",
            "Radioactive hospital medical imaging isotopes",
            "Hazardous industrial arsenic sludge"],
           "Plastic roads specifically consume low-density, thin post-consumer flexible films (chips wrappers, thin shopping bags) that have zero recycling market value."),
    case_q("Monitoring the Environment and Pollution", "IRC and MoRTH Policy Mandate",
           "Under Indian Roads Congress (IRC:SP:98) standards and MoRTH directives, what is the policy regarding plastic waste in national highway construction?",
           "Mandatory inclusion of waste plastic in bituminous wearing coats for highway construction within a 50 km radius of urban cities with over 5 lakh population",
           ["A complete federal ban on using any plastic materials anywhere near roads",
            "A requirement that all cars be manufactured entirely out of plastic bags",
            "A mandate that national highways be made exclusively of raw unheated garbage"],
           "MoRTH mandated the use of waste plastic in the wearing coat of National Highways within 50 km of urban agglomerations under IRC:SP:98.")
]

# ==============================================================================
# MOCK 15 PASSAGES
# ==============================================================================
P1_M15_TXT = (
    "Read the following marine pollution and industrial catastrophe case study and answer the questions that follow:\n\n"
    "On April 20, 2010, the ultra-deepwater drilling rig Deepwater Horizon, operated by BP in the Macondo Prospect of the Gulf of Mexico (depth 1,500 meters), "
    "suffered a catastrophic high-pressure methane blowout. The explosive surge ignited on the platform, killing 11 workers, and the rig sank two days later. "
    "Crucially, the fail-safe emergency Blowout Preventer (BOP) on the seabed failed to shear the drill pipe and seal the wellhead. For 87 consecutive days, "
    "uncontrolled crude oil gushed from the fractured riser pipe into the ocean, discharging an estimated 4.9 million barrels (approx. 780,000 cubic meters) "
    "of crude petroleum—the largest accidental marine oil spill in history. The environmental devastation was multifaceted. A floating surface oil slick "
    "covered over 180,000 square kilometers, washing ashore onto fragile coastal salt marshes and mangrove estuaries across Louisiana, Mississippi, and Florida. "
    "Seabirds (such as brown pelicans) experienced catastrophic mortality: oil coated their plumage, destroying the feathers' interlocking microscopic barbules, "
    "causing loss of buoyancy and thermal insulation, leading to drowning and hypothermia, while ingestion during preening induced severe liver and kidney failure. "
    "Marine mammals, including bottlenose dolphins, inhaled toxic volatile aromatic hydrocarbons (benzene, toluene), causing acute lung lesions and adrenal "
    "insufficiency. In an unprecedented response, responders applied nearly 1.8 million gallons of chemical dispersants (Corexit 9500A) both at the sea surface "
    "and directly at the leaking wellhead. While dispersants broke the oil into microscopic droplets to prevent surface slicks, scientists discovered that the "
    "dispersant-oil mixture proved vastly more toxic to deep-sea cold-water corals, larval fish, and benthic plankton than crude oil alone. Ultimately, natural "
    "bioremediation by indigenous hydrocarbonoclastic marine bacteria (such as Alcanivorax and Cycloclasticus) broke down aliphatic hydrocarbons over months."
)
P1_M15_QS = [
    case_q("Monitoring the Environment and Pollution", "Blowout Preventer (BOP) Failure",
           "What critical deep-sea seabed safety apparatus failed during the 2010 Deepwater Horizon explosion, allowing crude oil to gush unchecked for 87 days?",
           "The Blowout Preventer (BOP), whose blind shear rams failed to cut the drill pipe and seal the wellbore",
           ["The ship's wooden anchor chain",
            "The kitchen exhaust fan on the rig",
            "The satellite GPS navigation antenna"],
           "The blowout occurred when high-pressure methane gas breached well barriers and the seabed Blowout Preventer (BOP) failed to seal the well."),
    case_q("Monitoring the Environment and Pollution", "Lethal Mechanism of Oil on Seabirds",
           "How does surface crude oil contamination directly cause mass mortality among marine seabirds (such as pelicans and cormorants)?",
           "Oil coats and mats the feathers, destroying waterproofing and thermal insulation, leading to hypothermia, loss of buoyancy, and fatal ingestion",
           ["Oil turns seabird feathers into heavy solid steel armor that pulls them to the seabed",
            "Oil causes seabird beaks to grow ten times larger, preventing flight",
            "Oil induces immediate blindness by turning atmospheric air into solid sulfur"],
           "Crude oil mats plumage, destroying insulation and waterproofing so birds drown or die of hypothermia, while preening ingests lethal toxic hydrocarbons."),
    case_q("Monitoring the Environment and Pollution", "Ecological Controversy of Chemical Dispersants",
           "Why did the massive subsea injection of chemical dispersants (such as Corexit 9500A) provoke intense scientific and ecological controversy?",
           "Because dispersants broke oil into microscopic plumes that increased toxic hydrocarbon bioavailability and toxicity to deep-sea corals and larval fish",
           ["Because Corexit instantly turned all ocean water into frozen freshwater ice",
            "Because dispersants caused the Gulf of Mexico to catch fire for ten years",
            "Because chemical dispersants attracted millions of sharks to coastal swimming beaches"],
           "Dispersants break oil into tiny droplets; while mitigating surface slicks, this creates toxic subsurface plumes harmful to benthic corals and fish larvae."),
    case_q("Monitoring the Environment and Pollution", "Bioremediation by Marine Microorganisms",
           "What biological process naturally accelerated the decomposition of petroleum hydrocarbons in the warm waters of the Gulf of Mexico?",
           "Bioremediation by specialized hydrocarbonoclastic marine bacteria (such as Alcanivorax borkumensis) that utilize hydrocarbons as carbon sources",
           ["Photosynthesis by deep-sea terrestrial cacti",
            "Consumption of oil barrels by giant blue whales",
            "Volcanic incineration from underwater magma vents"],
           "Hydrocarbonoclastic bacteria (e.g. Alcanivorax) possess enzymes that biodegrade straight-chain alkanes and aromatic petroleum hydrocarbons into CO2 and water."),
    case_q("Monitoring the Environment and Pollution", "Long-Term Salt Marsh Degradation",
           "Why did crude oil washing ashore into coastal Louisiana salt marshes trigger catastrophic long-term wetland loss?",
           "Toxic oil killed the root network of Spartina alterniflora cordgrass, causing root decay and rapid erosion of unconsolidated marsh soils by waves",
           ["Oil caused coastal marsh grasses to transform into invasive desert cacti",
            "Oil lowered ocean tides permanently by 50 meters along the entire coast",
            "Oil converted coastal wetlands into solid marble rock cliffs"],
           "Salt marsh grasses (Spartina) stabilize muddy coastlines; when oil killed the root systems, wave action rapidly eroded the vulnerable coastal wetlands.")
]

P2_M15_TXT = (
    "Read the following clean energy transition and ecological footprint case study and answer the questions that follow:\n\n"
    "Located in the arid Thar Desert of Phalodi tehsil in Jodhpur district, Rajasthan, the Bhadla Solar Park spans over 14,000 acres (approx. 57 square kilometers) "
    "with an installed capacity exceeding 2,245 Megawatts (MW)—making it one of the largest operational single-site solar photovoltaic parks on Earth. "
    "Developed under the Ministry of New and Renewable Energy's (MNRE) Ultra Mega Renewable Energy Power Projects (UMREPP) scheme and the Jawaharlal Nehru "
    "National Solar Mission (JNNSM), Bhadla is uniquely situated to exploit exceptional climatic conditions: over 325 cloudless sunny days annually and "
    "extraordinarily high Direct Normal Irradiance (DNI) exceeding 5.6 to 6.0 kWh/m2/day. This mega-park generates clean green electricity, offsetting over "
    "4 million tonnes of greenhouse gas (CO2) emissions annually compared to equivalent coal-fired thermal generation. However, operating a mega-solar utility "
    "in an extreme desert environment poses unique technical and ecological challenges. First, high ambient summer temperatures (exceeding 48°C) degrade silicon "
    "solar cell efficiency due to negative temperature coefficients of power (-0.4% per °C rise above 25°C). Second, severe desert dust storms (Andhi) deposit "
    "thick layers of fine silica sand on panel glass ('soiling'), reducing generation efficiency by up to 30%. In water-scarce Rajasthan, traditional water-washing "
    "would consume hundreds of thousands of liters of precious groundwater; hence, Bhadla pioneered automated, waterless dry-robotic cleaning systems. "
    "Ecologically, the massive conversion of desert commons into fenced solar arrays alters natural wildlife movement corridors (for chinkara and desert fox) "
    "and introduced high-voltage overhead transmission lines, which pose a mortal collision risk to the critically endangered Great Indian Bustard (Ardeotis nigriceps), "
    "prompting Supreme Court orders mandating bird-diverters and underground cabling."
)
P2_M15_QS = [
    case_q("International Environmental Treaties and Indian Policy", "Climatic Suitability of Bhadla",
           "What primary solar resource parameters make Rajasthan's Thar Desert the premier location for ultra-mega solar parks like Bhadla?",
           "High Direct Normal Irradiance (DNI > 5.6 kWh/m2/day), over 325 clear sunny days per year, and vast expanses of flat, non-arable arid land",
           ["Continuous 24-hour equatorial rainfall throughout the entire year",
            "Sub-zero Arctic temperatures that keep solar panels permanently frozen",
            "Dense forest canopy cover that protects panels from direct sunlight"],
           "Bhadla boasts exceptional solar insolation (>325 sunny days, high DNI) and flat arid terrain ideal for massive utility-scale PV deployment."),
    case_q("International Environmental Treaties and Indian Policy", "Negative Temperature Coefficient Effect",
           "Why does extreme summer heat (>45°C) in the Thar desert paradoxically reduce the operational power efficiency of silicon photovoltaic panels?",
           "Silicon semiconductor solar cells have a negative temperature coefficient: electrical voltage output drops as cell temperature rises above 25°C",
           ["High heat causes silicon crystals to transform into liquid petroleum",
            "Sunlight stops reaching the earth when temperatures exceed 40°C",
            "Extreme heat freezes the electrical wiring inside the inverter"],
           "Silicon solar cells operate with a negative temperature coefficient of power (approx -0.4%/°C above 25°C); high heat reduces open-circuit voltage."),
    case_q("International Environmental Treaties and Indian Policy", "Soiling and Waterless Robotic Cleaning",
           "How do operators at Bhadla Solar Park overcome severe dust accumulation (soiling) while conserving critically scarce desert groundwater?",
           "By deploying automated waterless robotic cleaning systems that use micro-fiber wipers and airflow to clean panels without water",
           ["By spraying millions of liters of municipal milk over the panels daily",
            "By building giant concrete roofs directly over the solar panels",
            "By dismantling and washing every single panel by hand in river water"],
           "To prevent water depletion in arid Rajasthan, Bhadla pioneered waterless robotic cleaning that clears dust using specialized microfiber brushes."),
    case_q("International Environmental Treaties and Indian Policy", "Wildlife Collision Threat to GIB",
           "What severe ecological crisis has the proliferation of high-voltage overhead solar power evacuation lines caused in western Rajasthan?",
           "Fatal collisions with the critically endangered Great Indian Bustard (Ardeotis nigriceps), which possesses poor frontal vision and heavy body weight",
           ["Complete destruction of the Indian Ocean coral reef network",
            "Mass extinction of snow leopards in the Himalayan alpine zone",
            "Overpopulation of polar bears across the desert dunes"],
           "The critically endangered Great Indian Bustard has narrow frontal vision; overhead high-voltage transmission lines are the leading cause of adult mortality."),
    case_q("International Environmental Treaties and Indian Policy", "Decarbonization Contribution",
           "Under India's Panchamrit climate goals (COP26), what primary national target is directly supported by mega-solar parks like Bhadla?",
           "Achieving 500 Gigawatts (GW) of non-fossil fuel electricity generation capacity by 2030",
           ["Eliminating all electricity usage across Indian households by 2030",
            "Replacing all solar panels nationwide with coal-fired thermal power plants",
            "Building 100 new diesel-powered locomotive manufacturing units"],
           "Mega-solar parks like Bhadla are cornerstones of India's commitment to install 500 GW of non-fossil energy capacity by 2030.")
]

# ==============================================================================

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


# ==============================================================================
# PASSAGES_11_20 EXPORT LIST
# ==============================================================================
PASSAGES_11_20 = [
    ((P1_M11_TXT, P1_M11_QS), (P2_M11_TXT, P2_M11_QS)),
    ((P1_M12_TXT, P1_M12_QS), (P2_M12_TXT, P2_M12_QS)),
    ((P1_M13_TXT, P1_M13_QS), (P2_M13_TXT, P2_M13_QS)),
    ((P1_M14_TXT, P1_M14_QS), (P2_M14_TXT, P2_M14_QS)),
    ((P1_M15_TXT, P1_M15_QS), (P2_M15_TXT, P2_M15_QS)),
    ((P1_M16_TXT, P1_M16_QS), (P2_M16_TXT, P2_M16_QS)),
    ((P1_M17_TXT, P1_M17_QS), (P2_M17_TXT, P2_M17_QS)),
    ((P1_M18_TXT, P1_M18_QS), (P2_M18_TXT, P2_M18_QS)),
    ((P1_M19_TXT, P1_M19_QS), (P2_M19_TXT, P2_M19_QS)),
    ((P1_M20_TXT, P1_M20_QS), (P2_M20_TXT, P2_M20_QS))
]

assert len(PASSAGES_11_20) == 10, f'Expected 10 pairs, got {len(PASSAGES_11_20)}'
for idx, (p1, p2) in enumerate(PASSAGES_11_20, 11):
    assert len(p1[1]) == 5, f'Mock {idx} P1 has {len(p1[1])} Qs'
    assert len(p2[1]) == 5, f'Mock {idx} P2 has {len(p2[1])} Qs'

print(f'EVS Passages 11 to 20 compiled successfully: {len(PASSAGES_11_20)} pairs (20 passages, 100 questions).')
