# Passages for Mocks 1 to 5
p1_to_5 = '''import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, os.path.dirname(__file__))
from slot_helpers import case_q

# ==============================================================================
# MOCK 1 PASSAGES
# ==============================================================================
P1_M1_TXT = (
    "Read the following case study on lake pollution and eutrophication and answer the questions that follow:\\n\\n"
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
    "Read the following historical case study on pesticide contamination and answer the questions that follow:\\n\\n"
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
    "Read the following clinical toxicology case study on industrial pollution and answer the questions that follow:\\n\\n"
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
    "Read the following excerpt on natural resource economics and answer the questions that follow:\\n\\n"
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
    "Read the following meteorology and air pollution case study and answer the questions that follow:\\n\\n"
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
    "Read the following wildlife conservation case study and answer the questions that follow:\\n\\n"
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
    "Read the following hydrogeology and public health case study and answer the questions that follow:\\n\\n"
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
    "Read the following anthropological and ecological case study and answer the questions that follow:\\n\\n"
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
    "Read the following atmospheric chemistry case study and answer the questions that follow:\\n\\n"
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
    "Read the following industrial disaster and environmental jurisprudence case study and answer the questions that follow:\\n\\n"
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
'''

with open('scripts/subject_generators/make_evs_p1_5.py', 'w') as f:
    f.write(p1_to_5)

print("make_evs_p1_5.py written.")
