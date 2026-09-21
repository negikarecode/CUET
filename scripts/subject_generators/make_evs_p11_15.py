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
# PASSAGES_11_15 EXPORT LIST
# ==============================================================================
PASSAGES_11_15 = [
    ((P1_M11_TXT, P1_M11_QS), (P2_M11_TXT, P2_M11_QS)),
    ((P1_M12_TXT, P1_M12_QS), (P2_M12_TXT, P2_M12_QS)),
    ((P1_M13_TXT, P1_M13_QS), (P2_M13_TXT, P2_M13_QS)),
    ((P1_M14_TXT, P1_M14_QS), (P2_M14_TXT, P2_M14_QS)),
    ((P1_M15_TXT, P1_M15_QS), (P2_M15_TXT, P2_M15_QS))
]

if __name__ == '__main__':
    assert len(PASSAGES_11_15) == 5, f"Expected 5 pairs, got {len(PASSAGES_11_15)}"
    for idx, (p1, p2) in enumerate(PASSAGES_11_15, 11):
        assert len(p1[1]) == 5, f"Mock {idx} P1 has {len(p1[1])} Qs"
        assert len(p2[1]) == 5, f"Mock {idx} P2 has {len(p2[1])} Qs"
    print(f"EVS Passages 11 to 15 compiled successfully: {len(PASSAGES_11_15)} pairs (10 passages, 50 questions).")
