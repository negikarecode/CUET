import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, os.path.dirname(__file__))
from slot_helpers import case_q

# ==============================================================================
# MOCK 1 PASSAGES
# ==============================================================================
P1_M1_TXT = (
    "Read the following case study on lake pollution and eutrophication and answer the questions that follow:\n\n"
    "Bellandur Lake, an 890-acre water body in Bengaluru, has gained international notoriety for erupting in massive toxic foam and spontaneous surface "
    "fires. Over recent decades, rapid unplanned urban expansion and encroachment of natural catchment wetlands caused over 400 to 500 million liters per day "
    "(MLD) of untreated municipal sewage and chemical effluents to discharge directly into the lake. High concentrations of domestic synthetic detergents "
    "containing sodium tripolyphosphate (STPP) enriched the water with bioavailable phosphorus, while sewage supplied vast loads of nitrogen and organic matter. "
    "This triggered severe cultural eutrophication, sparking explosive blooms of cyanobacteria (Microcystis aeruginosa) and invasive floating weeds (water "
    "hyacinth / Eichhornia crassipes). The massive bacterial decomposition of dead organic biomass drove dissolved oxygen levels down to absolute zero (anoxia), "
    "causing widespread fish kills. Anaerobic methanogenic decomposition in the deep, un-aerated sediments produced combustible methane gas (CH4) and hydrocarbon "
    "sludge that, combined with flammable detergent surfactants on the surface, caught fire repeatedly during hot summer months."
)
P1_M1_QS = [
    case_q("Monitoring the Environment and Pollution", "Cultural Eutrophication Drivers",
           "In the Bellandur Lake crisis, what was the primary chemical limiting nutrient introduced by domestic synthetic detergents that triggered explosive algal growth?",
           "Phosphorus (Phosphates)",
           ["Dissolved Oxygen", "Molecular Chlorine", "Silicon Dioxide"],
           "Phosphates from synthetic detergents act as the primary limiting nutrient in freshwater lakes, fueling explosive cyanobacterial blooms."),
    case_q("Monitoring the Environment and Pollution", "Mechanism of Lake Fires",
           "What primary biogenic flammable gas produced in the anoxic benthic sediments contributed to the repeated surface fires on Bellandur Lake?",
           "Methane (CH4) produced by anaerobic methanogenic bacteria decomposing organic sludge",
           ["Pure oxygen gas produced by rapid algae photosynthesis",
            "Chlorofluorocarbons leaking from discarded refrigerators",
            "Argon gas bubbling up from geological mantle faults"],
           "Anaerobic digestion of organic sludge produces combustible methane gas, which trapped beneath detergent surfactant foam ignited surface fires."),
    case_q("Monitoring the Environment and Pollution", "Dissolved Oxygen and Anoxia",
           "Why did the dissolved oxygen (DO) concentration in Bellandur Lake plummet to zero, suffocating the entire native fish population?",
           "Because aerobic bacteria consumed all dissolved oxygen while metabolizing the massive loads of dead algal biomass and raw organic sewage",
           ["Because water hyacinth plants physically absorb all oxygen molecules into their leaves",
            "Because high water temperatures converted all liquid water into steam",
            "Because atmospheric pressure over Bengaluru dropped to zero"],
           "Massive organic inputs stimulate heterotrophic bacterial respiration, stripping the water column of dissolved oxygen and creating lethal anoxia."),
    case_q("Monitoring the Environment and Pollution", "Ecological Role of Catchment Wetlands",
           "How did the historical encroachment and destruction of natural perimeter wetlands around Bengaluru lakes accelerate the catastrophe?",
           "Wetlands naturally act as 'kidneys of the landscape', filtering suspended solids, trapping silt, and absorbing excess nutrients before water enters the main lake",
           ["Wetlands produce synthetic chemical fertilizers that feed lake fish",
            "Wetlands prevent solar radiation from reaching the water surface",
            "Wetlands heat lake water to boiling temperatures"],
           "Wetlands perform vital bio-filtration, absorbing nutrients and trapping sediments; destroying them allows raw sewage to flood directly into lake basins."),
    case_q("Monitoring the Environment and Pollution", "Lake Restoration Priority",
           "To restore Bellandur Lake to ecological health, environmental engineers agree that the single most indispensable first step is:",
           "Complete interception, diversion, and treatment of all municipal sewage via advanced Sewage Treatment Plants (STPs) before water enters the lake",
           ["Spraying chemical defoliants across the entire lake surface every week",
            "Filling the lake with concrete to build commercial real estate",
            "Diverting industrial chemical effluents directly into groundwater aquifers"],
           "Stopping external nutrient loading through sewage treatment and diversion is the absolute prerequisite for successful lake restoration.")
]

P2_M1_TXT = (
    "Read the following historical case study on pesticide contamination and answer the questions that follow:\n\n"
    "In 1962, marine biologist Rachel Carson published 'Silent Spring', documenting the catastrophic ecological impacts of synthetic chlorinated hydrocarbon "
    "insecticides, specifically Dichloro-diphenyl-trichloroethane (DDT). Extensively sprayed across agricultural crops and coastal salt marshes to control "
    "mosquitoes, DDT was initially praised as an indestructible, miracle chemical. However, because DDT is chemically non-biodegradable and highly lipophilic "
    "(fat-soluble), it resisted environmental breakdown. Rainwater washed trace quantities into aquatic food webs, where it entered phytoplankton at minuscule "
    "concentrations (0.003 parts per billion). Through trophic transfers, DDT accumulated in the adipose fat tissues of primary consumers (zooplankton) and "
    "small fish, magnifying exponentially at each successive trophic step. When apex fish-eating raptors (such as the Bald Eagle, Peregrine Falcon, and Osprey) "
    "consumed contaminated fish, DDT concentrations in their bodies reached nearly 25 parts per million—an amplification of over 10 million times. At these toxic "
    "levels, DDT and its metabolite DDE severely inhibited the enzyme calcium adenosine triphosphatase (Ca-ATPase) in the birds' shell glands, preventing normal "
    "calcium deposition. The raptors laid extremely thin-shelled eggs that crushed under their own incubating weight, precipitating near-extinction."
)
P2_M1_QS = [
    case_q("Monitoring the Environment and Pollution", "Biomagnification Phenomenon",
           "The phenomenon wherein DDT concentration increased from 0.003 parts per billion in water to 25 parts per million in fish-eating birds is termed:",
           "Biomagnification (Biological Amplification)",
           ["Eutrophication", "Thermal Stratification", "Photosynthetic Fixation"],
           "Biomagnification is the progressive increase in toxicant concentration at successively higher trophic levels along a food chain."),
    case_q("Monitoring the Environment and Pollution", "Physiological Properties Favoring Biomagnification",
           "Which two fundamental physical and biochemical properties of DDT make it exceptionally prone to biomagnification in animal food chains?",
           "High environmental persistence (resistance to biodegradation) and high lipophilicity (solubility in body fats)",
           ["High water solubility and instantaneous breakdown by sunlight",
            "High volatility causing it to turn into helium gas",
            "High radioactive half-life emitting alpha radiation"],
           "Toxins that biomagnify are environmentally persistent (long half-life) and lipophilic, allowing them to lodge in adipose tissue without excretion."),
    case_q("Monitoring the Environment and Pollution", "Raptor Reproductive Collapse Mechanism",
           "How did high DDT/DDE concentrations in apex predatory birds cause severe reproductive failure and population collapse?",
           "By inhibiting calcium metabolism enzymes in the shell gland, causing dangerously thin eggshells that broke prematurely during incubation",
           ["By paralyzing the adult birds' wings so they could not fly",
            "By mutating the birds' feathers into scales",
            "By turning all bird embryos into amphibians"],
           "DDT/DDE inhibits Ca-ATPase, disrupting calcium carbonate eggshell deposition and causing eggs to crack under the parent's weight."),
    case_q("Monitoring the Environment and Pollution", "Rachel Carson Historic Impact",
     "What was the monumental policy outcome in the United States and globally that resulted directly from the publication of Rachel Carson's 'Silent Spring'?",
     "A nationwide ban on the agricultural use of DDT in 1972 and the creation of the US Environmental Protection Agency (EPA)",
     ["The mandatory spraying of DDT in all primary schools",
      "The complete abolition of all environmental protection laws",
      "A global treaty requiring all wild birds to be kept in cages"],
     "Silent Spring catalyzed the modern environmental movement, leading directly to the 1972 US agricultural ban on DDT and creation of the EPA."),
    case_q("Monitoring the Environment and Pollution", "Stockholm Convention Status of DDT",
     "Under the international Stockholm Convention on Persistent Organic Pollutants (2001), why is DDT still permitted for restricted, strictly monitored use in certain tropical countries?",
     "For indoor residual spraying (IRS) exclusively for public health vector control to combat deadly malaria transmitted by Anopheles mosquitoes",
     ["For open-field spraying on commercial export wheat crops",
      "For aerial application over tropical coral reefs",
      "For manufacturing commercial children's plastic toys"],
     "The Stockholm Convention allows a specific exemption for DDT strictly for indoor residual spraying (IRS) to control malaria-transmitting mosquitoes in endemic regions.")
]

# ==============================================================================
# MOCK 2 PASSAGES
# ==============================================================================
P1_M2_TXT = (
    "Read the following clinical toxicology case study on industrial pollution and answer the questions that follow:\n\n"
    "Between 1932 and 1968, the Chisso Corporation chemical plant in Minamata City, Kumamoto Prefecture, Japan, discharged hundreds of tons of industrial "
    "wastewater containing inorganic mercury catalysts used in the synthesis of acetaldehyde directly into Minamata Bay. In the anaerobic, organic-rich marine "
    "sediments, sulfate-reducing bacteria biologically methylated the inorganic mercury (Hg2+) into highly toxic, lipid-soluble Methylmercury [CH3Hg]+. "
    "Methylmercury readily entered marine plankton, bioaccumulated in benthic shellfish, and biomagnified up the coastal marine food chain into predatory fish. "
    "Local coastal residents who consumed fish and shellfish as their primary dietary staple suffered chronic, severe neurological toxicity, culminating in the "
    "formal medical recognition of 'Minamata Disease' in 1956. Patients presented with ataxia, numbness in hands and feet, constriction of visual fields "
    "(tunnel vision), speech impairment, and severe involuntary convulsions. Because methylmercury readily crosses the placental blood barrier, pregnant women "
    "who showed mild or no symptoms gave birth to infants suffering from severe congenital neurological damage, microcephaly, and cerebral palsy-like spasticity."
)
P1_M2_QS = [
    case_q("Monitoring the Environment and Pollution", "Bacterial Methylation of Mercury",
           "In the Minamata Bay ecosystem, which biological transformation converted relatively benign inorganic mercury into an acutely neurotoxic compound?",
           "Biomethylation by anaerobic sediment bacteria into lipid-soluble Methylmercury [CH3Hg]+",
           ["Thermal fusion of mercury atoms inside deep undersea volcanic vents",
            "Oxidation of mercury into solid non-toxic elemental cinnabar rock",
            "Photosynthetic conversion of mercury into plant chlorophyll"],
           "Anaerobic bacteria (e.g. sulfate-reducers) methylate inorganic mercury into organic methylmercury, which easily penetrates biological membranes."),
    case_q("Monitoring the Environment and Pollution", "Congenital Minamata Disease Pathology",
           "Why did pregnant mothers who consumed contaminated fish give birth to severely disabled children even when the mothers exhibited minimal symptoms?",
           "Because methylmercury actively crosses the placental barrier and concentrates preferentially in the developing fetal brain, destroying neurological neurons",
           ["Because mercury converts all amniotic fluid into pure salt water",
            "Because the mother's milk lacked vitamin C",
            "Because fetal bones absorb all atmospheric nitrogen"],
           "Methylmercury crosses the placenta and blood-brain barrier, concentrating in fetal brain tissue and arresting neurodevelopment."),
    case_q("Monitoring the Environment and Pollution", "Clinical Hallmarks of Minamata Disease",
           "Which of the following is a classic neurological hallmark observed in clinical patients afflicted with Minamata disease?",
           "Concentric constriction of visual fields (tunnel vision), ataxia, and peripheral sensory numbness",
           ["Severe dental fluorosis and skeletal joint calcification",
            "Instant growth of multiple auxiliary arms and legs",
            "Complete loss of biological blood pressure down to zero"],
           "Minamata disease attacks the central nervous system (cerebellum and visual cortex), causing ataxia, tunnel vision, dysarthria, and tremors."),
    case_q("Monitoring the Environment and Pollution", "Minamata Convention on Mercury",
           "Adopted under the United Nations Environment Programme (UNEP) in 2013, the 'Minamata Convention on Mercury' aims globally to:",
           "Protect human health and the environment by controlling anthropogenic mercury emissions, banning new mercury mines, and phasing out mercury in products",
           ["Mandate that all countries increase industrial mercury dumping by 50%",
            "Establish commercial gold-refining plants in all hospital intensive care units",
            "Abolish all national marine protected areas"],
           "The Minamata Convention (2013) regulates the entire lifecycle of mercury to prevent future disasters like Minamata Bay."),
    case_q("Monitoring the Environment and Pollution", "Bioaccumulation Vector in Humans",
           "What was the primary dietary pathway through which the toxicant reached human populations in Minamata City?",
           "Daily consumption of contaminated coastal marine fish and shellfish that had biomagnified methylmercury",
           ["Drinking municipal chlorinated tap water from mountain reservoirs",
            "Eating unwashed terrestrial wheat grains sprayed with fungicides",
            "Inhaling volcanic ash clouds blown from Mount Fuji"],
           "Bioaccumulation in fish and shellfish was the direct transmission vector: fish-eating coastal families ingested lethal cumulative doses of methylmercury.")
]

P2_M2_TXT = (
    "Read the following excerpt on natural resource economics and answer the questions that follow:\n\n"
    "In 1968, biologist Garrett Hardin published his famous essay 'The Tragedy of the Commons' in the journal Science. Hardin presented a scenario of an open-access "
    "pasture shared by independent herdsmen. Each rational herdsman seeks to maximize individual economic gain. When deciding whether to add another cow to the "
    "common pasture, the herdsman receives all the direct financial benefit (+1) from selling the animal. However, the negative impact of overgrazing caused by the "
    "additional cow is shared among all the herdsmen using the pasture, so the individual herdsman suffers only a fraction of the cost (-1/n). Consequently, every "
    "herdsman is locked into a system that compels him to expand his herd without limit—in a world that is finite. Ruin is the destination toward which all men "
    "rush, each pursuing his own best interest in a society that believes in the freedom of the commons. Hardin concluded that the only solutions to avert "
    "ecological catastrophe were either private property rights (privatization) or coercive governmental regulation ('mutual coercion, mutually agreed upon'). "
    "Decades later, political scientist Elinor Ostrom challenged this rigid dichotomy, proving that communities often self-govern common pool resources (CPRs) "
    "sustainably without either state coercion or privatization."
)
P2_M2_QS = [
    case_q("Environmental and Natural Resource Economics", "Tragedy of the Commons Logic",
           "In Garrett Hardin's tragedy of the commons model, what fundamental economic incentive drives rational individuals to overexploit the shared pasture?",
           "The individual gains the full private benefit of adding an animal (+1), while the ecological cost of overgrazing is shared among all users (-1/n)",
           ["The government taxes farmers who fail to buy new cows every month",
            "The cows reproduce by cloning themselves without human intervention",
            "The pasture land continuously expands in geographic area"],
           "The asymmetry between private individual benefit and diffused collective cost creates the incentive to overexploit common resources."),
    case_q("Environmental and Natural Resource Economics", "Hardin Prescribed Solutions",
           "What two institutional remedies did Garrett Hardin advocate to avert the tragedy of the commons?",
           "Privatization (creating private property rights) or State coercive regulation ('mutual coercion, mutually agreed upon')",
           ["Abolishing all monetary currencies and returning to stone-age bartering",
            "Allowing unrestricted free access to all resources worldwide",
            "Converting all pastures into commercial asphalt highways"],
           "Hardin argued that only private property or centralized state regulation could prevent the depletion of open-access commons."),
    case_q("Environmental and Natural Resource Economics", "Elinor Ostrom Alternative Paradigm",
           "How did Nobel laureate Elinor Ostrom fundamentally challenge Garrett Hardin's conclusions regarding common property resources?",
           "She demonstrated that local resource users can self-organize robust community institutions to sustainably govern commons without private ownership or state control",
           ["She proved that natural resources on Earth are completely infinite and inexhaustible",
            "She showed that animals never overgraze even when pasture grass is exhausted",
            "She proved that government agencies never make mistakes"],
           "Elinor Ostrom documented hundreds of enduring community-managed CPRs, showing that user self-governance successfully avoids resource depletion."),
    case_q("Environmental and Natural Resource Economics", "Common Pool Resource Economic Traits",
     "In economic taxonomy, an open-access fishery or shared pasture is classified as a 'Common Pool Resource' because it possesses:",
     "High rivalness in consumption (subtraction) combined with high difficulty of excluding potential users",
     ["Zero rivalness in consumption and easy excludability",
      "Low rivalness and low excludability (Pure Public Good)",
      "High rivalness and zero difficulty of exclusion (Pure Private Good)"],
     "Common Pool Resources (CPRs) are subtractable/rivalrous (one person's catch leaves less for others) yet difficult to fence or exclude users from."),
    case_q("Environmental and Natural Resource Economics", "Ostrom Design Principles Example",
     "Which of the following is one of Elinor Ostrom's core design principles for long-enduring common property management?",
     "Clearly defined resource boundaries and the presence of low-cost, graduated sanctions for rule violators",
     ["Allowing outside multinational corporations to harvest resources without permits",
      "Banning local community meetings and assemblies",
      "Imposing the death penalty for minor grazing violations"],
     "Ostrom's 8 design principles include clearly defined boundaries, participatory rule-making, active monitoring, and graduated sanctions for infractions.")
]

# ==============================================================================
# MOCK 3 PASSAGES
# ==============================================================================
P1_M3_TXT = (
    "Read the following meteorology and air pollution case study and answer the questions that follow:\n\n"
    "Every year during late October and November, the National Capital Region (NCR) of Delhi and the vast Indo-Gangetic Plains are enveloped in a suffocating "
    "blanket of hazardous toxic smog, pushing the Air Quality Index (AQI) into the 'Severe' category (>450). This annual public health emergency is driven by a "
    "convergence of anthropogenic emissions and unfavorable post-monsoon meteorology. Upstream in Punjab and Haryana, the rapid mechanization of agriculture with "
    "Combine Harvesters leaves 10–15 cm standing paddy stalks in fields. Facing a tight 15-day window between the rice harvest and winter wheat sowing, farmers "
    "burn millions of tons of crop stubble (parali), releasing vast plumes of fine particulate matter (PM2.5), black carbon, carbon monoxide, and volatile organic "
    "compounds. Simultaneously, meteorological wind direction shifts to north-westerly, transporting smoke straight into the bowl-shaped Delhi basin. "
    "Compounding the crisis, the onset of winter causes a meteorological phenomenon known as 'Temperature Inversion': calm surface winds and nocturnal radiative "
    "cooling trap a layer of dense, cold air near the ground beneath a warmer air lid aloft. Vertical atmospheric mixing halts, and the mixing height plummets from "
    "2,000 meters down to less than 100 meters, trapping local vehicular exhaust, industrial fumes, and stubble smoke in a toxic, stagnant surface layer."
)
P1_M3_QS = [
    case_q("Monitoring the Environment and Pollution", "Temperature Inversion Dynamics",
           "How does meteorological 'Temperature Inversion' exacerbate the winter smog crisis in Delhi?",
           "A layer of warm air aloft traps a colder, stagnant air layer at ground level, drastically lowering the mixing height and preventing pollutants from dispersing",
           ["It generates high-speed hurricane winds that blow all pollutants directly into the stratosphere",
            "It heats the ground to 60 degrees Celsius, causing all automobile tires to melt",
            "It turns atmospheric nitrogen gas into liquid ammonia rain"],
     "Inversion reverses normal atmospheric lapse rates: warm air sits over cold surface air, forming an atmospheric lid that traps pollutants near ground level."),
    case_q("Monitoring the Environment and Pollution", "Combine Harvester Stubble Link",
           "Why did the widespread mechanization of paddy harvesting with Combine Harvesters inadvertently trigger the practice of open stubble burning?",
           "Combine harvesters cut only the grain heads, leaving 10–15 cm standing stalks that jam conventional seed drills, incentivizing quick burning to clear fields for wheat",
           ["Combine harvesters spray flammable diesel fuel over the entire crop field",
            "Farmers are legally required by tractor manufacturers to burn fields after each use",
            "Combine harvesters cause paddy stalks to spontaneously catch fire"],
           "Harvesters leave standing stubble that obstructs wheat seeding machines; farmers burn it to clear the field rapidly within their narrow 2-week window."),
    case_q("Monitoring the Environment and Pollution", "PM2.5 Human Health Hazard",
           "Why does particulate matter smaller than 2.5 micrometers (PM2.5) represent a far graver human health threat than larger PM10 particles?",
           "Because PM2.5 particles bypass upper respiratory nasal cilia, penetrate deep into pulmonary alveoli, and diffuse directly into the bloodstream",
           ["Because PM2.5 particles are visible to the naked eye and frighten pedestrians",
            "Because PM2.5 particles contain pure uranium isotopes",
            "Because PM2.5 particles only affect domestic animals while humans are immune"],
           "Due to microscopic size, PM2.5 penetrates deep alveolar lung sacs and enters the vascular bloodstream, causing cardiovascular strain, strokes, and cancer."),
    case_q("Monitoring the Environment and Pollution", "Graded Response Action Plan (GRAP)",
           "What is the function of the 'Graded Response Action Plan' (GRAP) enforced by the Commission for Air Quality Management (CAQM) in Delhi-NCR?",
           "An emergency institutional plan that triggers increasingly stringent anti-pollution curbs (construction bans, truck restrictions, school closures) as AQI worsens",
           ["A permanent plan to demolish all housing within 50 km of Delhi",
            "A subsidy program providing free diesel luxury cars to commuters",
            "A tax on pedestrians who walk on sidewalks during winter"],
           "GRAP triggers staged emergency interventions (Stages I to IV) based on ambient AQI thresholds to prevent atmospheric catastrophic collapse."),
    case_q("Monitoring the Environment and Pollution", "Bio-Decomposer Sustainable Alternative",
           "How does the microbial 'Pusa Bio-Decomposer' developed by ICAR-IARI provide an eco-friendly solution to stubble burning?",
           "It utilizes a fungal consortium that enzymatically digests tough cellulose and lignin in standing paddy straw, converting stubble into organic manure in situ within 25 days",
           ["It freezes the crop stalks so they can be shattered with acoustic speakers",
            "It sets the stubble on fire using cold chemical combustion that emits zero smoke",
            "It transforms crop stubble into synthetic petroleum plastic overnight"],
           "Pusa Bio-Decomposer uses cellulolytic and ligninolytic fungi to decompose standing stubble directly in the field, eliminating the need for open burning.")
]

P2_M3_TXT = (
    "Read the following wildlife conservation case study and answer the questions that follow:\n\n"
    "In 1973, facing a catastrophic collapse in royal Bengal tiger (Panthera tigris) numbers due to relentless trophy hunting, poaching, and habitat loss, the "
    "Government of India launched 'Project Tiger' at Jim Corbett National Park under Prime Minister Indira Gandhi. Initially covering 9 dedicated Tiger Reserves "
    "(over 9,000 km2), the program adopted a core-buffer zonation strategy. Under the Wildlife (Protection) Act 1972, the 'Core / Critical Tiger Habitat' is "
    "maintained as completely inviolate—free from human settlements, commercial forestry, and cattle grazing—to ensure an undisturbed breeding sanctuary for the "
    "apex predator. Surrounding the core, 'Buffer zones' accommodate regulated sustainable human use and forest co-existence. Following the shocking local "
    "extinction of tigers in Sariska (2004) and Panna (2009) due to undetected commercial poaching syndicates, Parliament amended the Wildlife Protection Act in "
    "2006 to establish the National Tiger Conservation Authority (NTCA) on statutory footing and created the Wildlife Crime Control Bureau (WCCB). Today, India "
    "harbors over 75% of the world's wild tiger population across 54+ Tiger Reserves, successfully surpassing the global 'Tx2' target by doubling tiger numbers "
    "ahead of schedule. However, conservation biologists warn that the greatest emerging threat is the severance of linear wildlife corridors connecting reserves, "
    "which isolates small populations and triggers inbreeding depression and escalating human-wildlife conflict."
)
P2_M3_QS = [
    case_q("Biodiversity and Conservation", "Project Tiger Statutory Origin",
           "In which year and at which national park was India's flagship 'Project Tiger' formally inaugurated?",
           "1973 at Jim Corbett National Park, Uttarakhand",
           ["1986 at Ranthambore National Park, Rajasthan",
            "1992 at Kaziranga National Park, Assam",
            "1972 at Gir National Park, Gujarat"],
           "Project Tiger was launched on April 1, 1973 at Corbett National Park by the Government of India with WWF support."),
    case_q("Biodiversity and Conservation", "Core vs Buffer Zonation",
           "Under Section 38V of the Wildlife (Protection) Act 1972, how is the 'Core Area' of a Tiger Reserve legally distinguished from the 'Buffer Zone'?",
           "The Core area is an inviolate natural breeding space where human activities and livestock grazing are strictly prohibited, while the Buffer permits regulated co-existence",
           ["The Core area is reserved for luxury tourist hotel construction, while the buffer is for tigers",
            "The Core area is open for commercial timber logging, while the buffer is protected",
            "There is zero legal distinction between core and buffer areas"],
           "Core areas are strictly inviolate for tiger breeding with voluntary relocation of villages, whereas buffer zones foster human-wildlife co-existence."),
    case_q("Biodiversity and Conservation", "NTCA Creation Context",
           "What major conservation crisis prompted Parliament to enact the 2006 amendment establishing the National Tiger Conservation Authority (NTCA) on a statutory basis?",
           "The shocking local extinction of tigers in Sariska Tiger Reserve in 2004 due to unchecked organized poaching syndicates",
           ["The sudden increase of tigers eating all vegetation in Rajasthan",
            "A direct military confrontation between tigers and domestic cattle",
            "A demand by international zoos to import all wild Indian tigers"],
           "The 2004 Sariska local extinction led to the Tiger Task Force, resulting in the 2006 statutory creation of the NTCA to enforce rigorous management standards."),
    case_q("Biodiversity and Conservation", "Wildlife Corridors Genetic Importance",
           "Why do conservation geneticists emphasize that protecting contiguous 'Wildlife Corridors' between isolated Tiger Reserves is essential for long-term survival?",
           "Corridors facilitate gene flow between disparate reserves, preventing inbreeding depression and rescuing localized demographic declines",
           ["Corridors allow tigers to learn how to swim across oceans",
            "Corridors prevent tigers from ever needing to hunt wild prey",
            "Corridors provide tourists with high-speed concrete expressway tracks"],
           "Corridors connect fragmented reserves, allowing young dispersing tigers to mate across populations, maintaining high genetic heterozygosity and fitness."),
    case_q("Biodiversity and Conservation", "Tx2 Global Commitment",
           "What was the international 'Tx2' conservation goal adopted at the 2010 St. Petersburg Tiger Summit, which India achieved ahead of target?",
           "To double the global population of wild tigers across range countries by the year 2022",
           ["To export wild tigers to two new continents",
            "To train wild tigers to live exclusively in urban households",
            "To reduce wild tiger hunting permits by 2% annually"],
           "The Tx2 goal aimed to double wild tiger numbers by 2022 (the Chinese Year of the Tiger); India achieved this milestone ahead of the deadline.")
]

# ==============================================================================
# MOCK 4 PASSAGES
# ==============================================================================
P1_M4_TXT = (
    "Read the following hydrogeology and public health case study and answer the questions that follow:\n\n"
    "The Bengal Alluvial Basin, spanning West Bengal and Bangladesh, is the theater of the largest mass environmental poisoning in human history. Millions of rural "
    "villagers drink groundwater extracted from shallow unconfined alluvial tube-wells containing arsenic concentrations ranging from 50 to over 1,000 micrograms "
    "per liter (ug/L), far exceeding the WHO and Bureau of Indian Standards (BIS) permissible limit of 10 ug/L (0.01 mg/L). In the 1970s, international aid agencies "
    "promoted tube-wells to provide 'microbially safe' water, replacing surface ponds contaminated with cholera. However, the hydrogeology harbored an invisible "
    "geogenic poison. Geochemists proved that arsenic is not anthropogenic; rather, it is naturally present in Himalayan sediments deposited during the Holocene. "
    "Under subterranean reducing (anoxic) conditions, native iron-reducing bacteria (like Geobacter) metabolize buried organic matter, triggering the 'Reductive "
    "Dissolution' of arsenic-bearing iron oxyhydroxides (FeOOH) in the sediment. This biochemical reaction releases adsorbed arsenite [As(III)] and arsenate [As(V)] "
    "directly into groundwater. Chronic consumption over years manifests clinically as arsenicosis: characteristic raindrops-like melanosis on the chest, painful "
    "hyperkeratosis on palms and soles, peripheral vascular gangrene ('Black Foot Disease'), and terminal internal carcinomas of the bladder, lungs, and liver."
)
P1_M4_QS = [
    case_q("Monitoring the Environment and Pollution", "Groundwater Arsenic Permissible Limit",
           "According to WHO guidelines and Bureau of Indian Standards (BIS 10500:2012), what is the maximum acceptable limit for Arsenic in safe drinking water?",
           "0.01 mg/L (10 micrograms per liter / 10 ug/L)",
           ["1.0 mg/L", "50.0 mg/L", "0.5 mg/L"],
           "The safe drinking water limit for arsenic is 10 ug/L (0.01 mg/L); chronic exposure above this threshold triggers multi-systemic arsenicosis."),
    case_q("Monitoring the Environment and Pollution", "Geogenic Origin vs Anthropogenic Cause",
           "What is the geological source of the arsenic poisoning the Bengal basin groundwater aquifers?",
           "Naturally occurring geogenic arsenic bound in Himalayan alluvial sediments, leached under anaerobic microbial conditions",
           ["Industrial chemical effluent dumped by modern pesticide manufacturing plants in Kolkata",
            "Nuclear radioactive waste buried beneath the Ganges delta",
            "Excessive application of chemical nitrogenous urea by local farmers"],
           "Arsenic in the Bengal Basin is natural/geogenic, originating from upstream Himalayan sulfide ores washed down into deltaic alluvial sediments."),
    case_q("Monitoring the Environment and Pollution", "Reductive Dissolution Mechanism",
           "According to geochemists, what subsurface biogeochemical process triggers the mobilization of bound arsenic into groundwater?",
           "Reductive dissolution of arsenic-rich iron oxyhydroxide minerals catalyzed by anaerobic iron-reducing bacteria decomposing organic matter",
           ["High-temperature boiling of groundwater caused by geothermal magma vents",
            "Direct oxidation of atmospheric nitrogen into solid arsenic crystals",
            "Evaporation of pure freshwater into the atmosphere"],
           "Under anoxic conditions, anaerobic microbes consume buried organic carbon, reducing insoluble Fe(III) to soluble Fe(II) and releasing bound arsenic."),
    case_q("Monitoring the Environment and Pollution", "Clinical Pathology of Arsenicosis",
           "Which diagnostic dermatological symptoms characteristically develop on patients suffering from chronic long-term arsenic poisoning?",
           "Raindrop-like skin melanosis on the torso followed by painful nodular hyperkeratosis on palms and soles",
           ["Complete loss of all skin pigmentation resulting in albinism",
            "Growth of thick scales and feathers on the human face",
            "Instant calcification and hardening of facial jawbones"],
           "Arsenicosis manifests dermatologically as spotted melanosis ('raindrops on dusty road') and rough, cracked keratosis on the palms and soles."),
    case_q("Monitoring the Environment and Pollution", "Technological Remediation Strategy",
           "To remediate arsenic-contaminated tube-well water in rural villages, community Arsenic Removal Plants (ARPs) typically utilize:",
           "Oxidation of As(III) to As(V) followed by coagulation-adsorption with ferric salts or filtration through activated alumina",
           ["Boiling the water in brass vessels for 5 minutes",
            "Passing water through coarse mosquito netting",
            "Adding synthetic chemical pesticides to kill the arsenic"],
           "Arsenic treatment oxidizes mobile arsenite to arsenate, which coprecipitates with iron flocs or adsorbs onto activated alumina beds.")
]

P2_M4_TXT = (
    "Read the following anthropological and ecological case study and answer the questions that follow:\n\n"
    "Across the undulating landscapes of India, 'Sacred Groves' represent ancient traditional community-based conservation refugia. Known regionally as 'Deorais' "
    "in Maharashtra, 'Orans' in Rajasthan, 'Kavu' in Kerala, and 'Law Kyntang' in the Khasi Hills of Meghalaya, these virgin forest patches have been preserved "
    "by indigenous tribal and rural societies for generations through deep spiritual reverence and strictly enforced religious taboos. Communities dedicate the "
    "groves to local folk deities or ancestral spirits (such as Vanadevata, Sarna Ma, or Mother Goddess). Traditional customary laws strictly prohibit the felling "
    "of any standing green tree, the hunting of wild animals, the grazing of domestic livestock, and even the removal of dead fallen firewood. As a result, sacred "
    "groves function as biological 'islands' of pristine climax vegetation within heavily deforested, human-dominated agricultural landscapes. Ecologists studying "
    "Deorais in the Western Ghats have documented that they harbor rare, relict plant species, ancient woody lianas, and endangered medicinal herbs that have "
    "completely vanished from surrounding commercial forestry coupes. Furthermore, the undisturbed thick leaf litter and dense canopy inside sacred groves act as "
    "living hydrological sponges, retaining monsoon moisture and sustaining perennial freshwater springs that supply drinking water to downstream villages."
)
P2_M4_QS = [
    case_q("Human Beings and Nature", "Sacred Groves Definition",
           "In environmental science and traditional ecological knowledge, what is a 'Sacred Grove'?",
           "A community-protected forest patch preserved through religious and cultural taboos forbidding hunting and wood felling",
           ["A commercial monoculture timber plantation owned by the state forest department",
            "An urban municipal greenhouse park built inside a shopping mall",
            "An open-pit gravel quarry operated by private construction contractors"],
           "Sacred groves are communally protected forest tracts preserved through cultural and spiritual taboos without formal state policing."),
    case_q("Human Beings and Nature", "Regional Nomenclature of Sacred Groves",
           "What are Sacred Groves traditionally called in the Western Ghats of Maharashtra and in the desert landscapes of Rajasthan respectively?",
           "Deorais in Maharashtra, and Orans in Rajasthan",
           ["Kavu in Maharashtra, and Deorais in Rajasthan",
            "Law Kyntang in Maharashtra, and Kavu in Rajasthan",
            "Orans in Maharashtra, and Sarna in Rajasthan"],
           "Sacred groves are known as Deorais in Maharashtra, Orans in Rajasthan, Kavu in Kerala, Law Kyntang in Meghalaya, and Sarna in Jharkhand."),
    case_q("Human Beings and Nature", "Conservation Refugia Function",
           "Why do conservation biologists consider sacred groves to be invaluable 'refugia' for regional biodiversity?",
           "Because they preserve climax vegetation, rare endemic flora, and medicinal wild herbs that have been completely eradicated in surrounding landscapes",
           ["Because they provide commercial timber for export paper mills",
            "Because they are the exclusive breeding grounds for domestic farm cattle",
            "Because they contain zero living biological organisms"],
           "Sacred groves act as botanical time capsules, shielding rare, threatened, and endemic taxa from agricultural and industrial deforestation."),
    case_q("Human Beings and Nature", "Hydrological Function of Sacred Groves",
           "What critical hydrological ecosystem service do sacred groves provide to neighboring rural farming communities?",
           "Their multi-tiered canopy and spongy undisturbed leaf litter maximize rainwater infiltration, recharging and sustaining perennial drinking water springs",
           ["They evaporate all groundwater to prevent flood formation",
            "They turn rain runoff into high-pressure steam power",
            "They prevent any rain clouds from passing over the village"],
           "Dense root mats and humus inside sacred groves act as ecological sponges, capturing monsoon rains and feeding perennial freshwater springs."),
    case_q("Human Beings and Nature", "Modern Threats to Sacred Groves",
           "In contemporary India, what is the primary socioeconomic factor eroding the traditional protection of sacred groves?",
           "Commercialization, urban encroachment, dilution of traditional spiritual taboos, and conversion of groves into concrete temples",
           ["An extreme global cooling ice age freezing all forest trees",
            "The total disappearance of all wild birds from India",
            "A national law mandating that all trees be cut down by villagers"],
           "Erosion of animistic spiritual taboos, modern consumerism, road construction, and building concrete shrines threaten ancient sacred groves.")
]

# ==============================================================================
# MOCK 5 PASSAGES
# ==============================================================================
P1_M5_TXT = (
    "Read the following atmospheric chemistry case study and answer the questions that follow:\n\n"
    "The 1987 Montreal Protocol is heralded as the gold standard of multilateral environmental diplomacy. During the 1970s, atmospheric chemists Mario Molina and "
    "F. Sherwood Rowland discovered that chlorofluorocarbons (CFCs)—widely used as non-toxic refrigerants, aerosol propellants, and foam-blowing agents—posed a lethal "
    "threat to the stratospheric ozone layer. Because of their extreme chemical stability, CFCs do not break down in the troposphere. Over decades, they slowly "
    "diffuse across the tropopause into the middle stratosphere. Above the protective ozone layer, intense solar ultraviolet-C radiation photolyzes CFC molecules, "
    "cleaving carbon-chlorine bonds and releasing atomic Chlorine free radicals (Cl). A single chlorine radical acts as a catalyst, initiating an endless chain "
    "reaction: Cl + O3 -> ClO + O2, followed by ClO + O -> Cl + O2. The chlorine atom is regenerated unspent, enabling a single chlorine radical to destroy over "
    "100,000 ozone molecules before diffusing out. Over Antarctica, this chemistry is catastrophically magnified during the polar winter: the isolated Polar Vortex "
    "drops temperatures below -78 degrees Celsius, forming Polar Stratospheric Clouds (PSCs) of nitric acid trihydrate ice. Heterogeneous reactions on PSC ice "
    "crystals convert inactive chlorine reservoirs (HCl and ClONO2) into molecular chlorine (Cl2). When the spring sun rises in September, sunlight photolyzes "
    "Cl2, releasing a sudden burst of active chlorine that obliterates stratospheric ozone, creating the Antarctic Ozone Hole (ozone dropping below 220 Dobson Units)."
)
P1_M5_QS = [
    case_q("International Environmental Treaties and Indian Policy", "Chlorine Catalytic Cycle",
           "In the stratospheric destruction of ozone by CFCs, why can a single chlorine free radical destroy over 100,000 ozone molecules?",
           "Because the chlorine radical acts as a true chemical catalyst, repeatedly regenerated in a continuous cyclic reaction (ClO + O -> Cl + O2)",
           ["Because chlorine atoms multiply by biological cellular division in the clouds",
            "Because chlorine atoms emit radioactive gamma rays that disintegrate ozone",
            "Because chlorine atoms freeze the ozone layer into solid ice"],
           "Chlorine is a homogeneous catalyst: it reacts with O3 to form ClO, which reacts with atomic oxygen to regenerate Cl, repeating the cycle."),
    case_q("International Environmental Treaties and Indian Policy", "Polar Stratospheric Clouds (PSCs) Role",
           "What unique catalytic role do Polar Stratospheric Clouds (PSCs) play in the formation of the Antarctic spring ozone hole?",
           "Their solid ice crystal surfaces catalyze heterogeneous reactions that convert inactive chlorine reservoirs (HCl, ClONO2) into reactive molecular chlorine (Cl2)",
           ["They absorb all ultraviolet radiation, plunging the South Pole into darkness",
            "They freeze all ozone molecules into solid white snow that falls to the ground",
            "They physically block CFCs from entering the Antarctic atmosphere"],
           "Heterogeneous reactions on PSC ice surfaces unlock chlorine from stable reservoirs (HCl and ClONO2), setting the stage for massive spring ozone destruction."),
    case_q("International Environmental Treaties and Indian Policy", "Ozone Hole Definition Benchmark",
           "In atmospheric monitoring, what specific total column ozone threshold formally defines an 'Ozone Hole' over Antarctica?",
           "Total column ozone concentration falling below 220 Dobson Units (DU)",
           ["Total ozone dropping to exactly zero Dobson Units",
            "Ozone thickness exceeding 1,000 Dobson Units",
            "Atmospheric pressure dropping below 1 bar"],
           "An ozone hole is technically defined as total columnar ozone dropping below 220 DU, a severe depletion never recorded before 1979."),
    case_q("International Environmental Treaties and Indian Policy", "Montreal Protocol Milestone",
           "What primary regulatory mechanism made the 1987 Montreal Protocol so uniquely successful in reversing stratospheric ozone depletion?",
           "Binding, universally ratified phased phase-out schedules for all major Ozone Depleting Substances, supported by the Multilateral Fund for developing nations",
           ["A voluntary non-binding recommendation with zero compliance deadlines",
            "Mandating that all refrigerators worldwide be demolished without replacements",
            "A military blockade surrounding the Antarctic continent"],
           "The Montreal Protocol succeeded through binding phase-out schedules, universal 198-country ratification, and dedicated financial assistance via the Multilateral Fund."),
    case_q("International Environmental Treaties and Indian Policy", "Kigali Amendment Focus",
           "The 2016 Kigali Amendment to the Montreal Protocol expanded the treaty's mandate to phase down which class of chemicals that do not destroy ozone but are potent greenhouse gases?",
           "Hydrofluorocarbons (HFCs)",
           ["Carbon Monoxide (CO)", "Sulfur Dioxide (SO2)", "Lead particulates"],
           "The Kigali Amendment targets Hydrofluorocarbons (HFCs), which replaced CFCs to protect ozone but possess global warming potentials thousands of times higher than CO2.")
]

P2_M5_TXT = (
    "Read the following industrial disaster and environmental jurisprudence case study and answer the questions that follow:\n\n"
    "On the freezing midnight of December 2-3, 1984, the city of Bhopal in Madhya Pradesh witnessed the world's most catastrophic industrial disaster at the "
    "Union Carbide India Limited (UCIL) pesticide manufacturing plant. Water entered an un-insulated underground storage tank (Tank 610) containing 42 tons of "
    "liquid Methyl Isocyanate (MIC, CH3NCO), an intermediate chemical used in formulating the carbamate pesticide carbaryl (Sevin). A violent, runaway exothermic "
    "reaction ensued: the temperature surged past 200 degrees Celsius and tank pressure spiked, rupturing the safety relief valve. Because all critical safety "
    "systems (the refrigeration coolant unit, the vent gas scrubber, and the flare tower) were either non-functional, turned off to cut costs, or inoperable, over "
    "40 tons of lethal, gaseous MIC, along with phosgene and hydrogen cyanide, escaped into the cool night air. The dense toxic cloud rolled across adjacent "
    "densely populated shantytowns, exposing over 500,000 citizens. Victims suffered immediate ocular burning, corneal ulceration, intense bronchial spasms, and "
    "died agonizing deaths from pulmonary edema (fluid flooding the lungs). Thousands died within hours, and tens of thousands suffered permanent disability. "
    "In response to the legal aftermath of Bhopal and the subsequent Oleum Gas Leak in Delhi, Chief Justice P.N. Bhagwati formulated the landmark doctrine of "
    "'Absolute Liability' (M.C. Mehta v. Union of India 1987), holding that hazardous industries owe an absolute, non-delegable duty to the public with zero "
    "exceptions, and Parliament enacted the overarching Environment (Protection) Act, 1986."
)
P2_M5_QS = [
    case_q("International Environmental Treaties and Indian Policy", "Bhopal Toxic Chemical",
           "What lethal chemical gas escaped from Tank 610 at the Union Carbide plant, causing the catastrophic 1984 Bhopal disaster?",
           "Methyl Isocyanate (MIC)",
           ["Sulfur Dioxide (SO2)", "Chlorofluorocarbon (CFC-12)", "Carbon Dioxide (CO2)"],
           "The Bhopal gas disaster was caused by the runaway exothermic reaction and release of over 40 tons of toxic Methyl Isocyanate (MIC)."),
    case_q("International Environmental Treaties and Indian Policy", "Pulmonary Edema Mechanism of Death",
           "What was the primary clinical cause of immediate mortality in thousands of victims who inhaled the toxic Bhopal gas cloud?",
           "Acute pulmonary edema (chemical burns to alveolar tissue causing massive fluid accumulation in the lungs and asphyxiation)",
           ["Sudden cardiac arrest caused by sub-zero freezing temperatures",
            "Severe intestinal dehydration caused by amoebic dysentery",
            "Instantaneous destruction of the skeletal kneecaps"],
           "MIC reacts violently with moisture on respiratory mucous membranes, causing severe bronchial corrosion, alveolar leakage, and fatal pulmonary edema."),
    case_q("International Environmental Treaties and Indian Policy", "Doctrine of Absolute Liability Formulation",
           "In the legal aftermath of Bhopal and the Oleum gas leak, how did the Supreme Court's doctrine of 'Absolute Liability' differ from the old British rule of Strict Liability (Rylands v. Fletcher)?",
           "It established that hazardous industrial enterprises are unconditionally liable for all damages, completely eliminating all legal defenses and exceptions (such as Act of God or third-party sabotage)",
           ["It held that companies are only liable if victims can prove intentional corporate murder",
            "It mandated that the government must pay all damages instead of the factory owner",
            "It exempted all chemical companies from paying any monetary compensation"],
           "Absolute liability holds that an enterprise carrying on hazardous activities has an absolute, non-delegable duty to society, without any exceptions of Rylands v. Fletcher."),
    case_q("International Environmental Treaties and Indian Policy", "Environment Protection Act 1986 Enactment",
     "Following the Bhopal Gas Tragedy, under which Article of the Constitution did the Indian Parliament enact the overarching Environment (Protection) Act, 1986?",
     "Article 253 (legislation for giving effect to international agreements, specifically the 1972 Stockholm Conference)",
     ["Article 370", "Article 356", "Article 324"],
     "EPA 1986 was enacted under Article 253, which empowers Parliament to make laws implementing international treaty obligations (Stockholm Declaration 1972)."),
    case_q("International Environmental Treaties and Indian Policy", "Public Liability Insurance Act 1991",
     "Which subsequent statute was passed by Parliament in 1991 to ensure that victims of future toxic chemical industrial accidents receive immediate, no-fault financial compensation?",
     "The Public Liability Insurance Act, 1991",
     ["The Motor Vehicles Act, 1988", "The Indian Contract Act, 1872", "The Foreign Exchange Management Act, 1999"],
     "The Public Liability Insurance Act 1991 mandates that hazardous industries take out mandatory insurance policies to provide rapid, no-fault relief to accident victims.")
]



# ==============================================================================
# MOCK 6 PASSAGES
# ==============================================================================
P1_M6_TXT = (
    "Read the following urban waste management case study and answer the questions that follow:\n\n"
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
    "Read the following watershed revitalization case study and answer the questions that follow:\n\n"
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
    "Read the following marine ecology and climate science case study and answer the questions that follow:\n\n"
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
    "Read the following historical environmental movement case study and answer the questions that follow:\n\n"
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
    "Read the following hazardous materials and informal industrial economy case study and answer the questions that follow:\n\n"
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
    "Read the following agricultural ecology and public health case study and answer the questions that follow:\n\n"
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
    "Read the following wildlife enforcement and biodiversity law case study and answer the questions that follow:\n\n"
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
    "Read the following sustainable agriculture and agro-ecology case study and answer the questions that follow:\n\n"
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
    "Read the following riverine pollution and urban hydrology case study and answer the questions that follow:\n\n"
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
    "Read the following forest rights and indigenous self-governance case study and answer the questions that follow:\n\n"
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



# ==============================================================================
# PASSAGES_1_10 EXPORT LIST
# ==============================================================================
PASSAGES_1_10 = [
    ((P1_M1_TXT, P1_M1_QS), (P2_M1_TXT, P2_M1_QS)),
    ((P1_M2_TXT, P1_M2_QS), (P2_M2_TXT, P2_M2_QS)),
    ((P1_M3_TXT, P1_M3_QS), (P2_M3_TXT, P2_M3_QS)),
    ((P1_M4_TXT, P1_M4_QS), (P2_M4_TXT, P2_M4_QS)),
    ((P1_M5_TXT, P1_M5_QS), (P2_M5_TXT, P2_M5_QS)),
    ((P1_M6_TXT, P1_M6_QS), (P2_M6_TXT, P2_M6_QS)),
    ((P1_M7_TXT, P1_M7_QS), (P2_M7_TXT, P2_M7_QS)),
    ((P1_M8_TXT, P1_M8_QS), (P2_M8_TXT, P2_M8_QS)),
    ((P1_M9_TXT, P1_M9_QS), (P2_M9_TXT, P2_M9_QS)),
    ((P1_M10_TXT, P1_M10_QS), (P2_M10_TXT, P2_M10_QS))
]

assert len(PASSAGES_1_10) == 10, f'Expected 10 pairs, got {len(PASSAGES_1_10)}'
for idx, (p1, p2) in enumerate(PASSAGES_1_10, 1):
    assert len(p1[1]) == 5, f'Mock {idx} P1 has {len(p1[1])} Qs'
    assert len(p2[1]) == 5, f'Mock {idx} P2 has {len(p2[1])} Qs'

print(f'EVS Passages 1 to 10 compiled successfully: {len(PASSAGES_1_10)} pairs (20 passages, 100 questions).')
