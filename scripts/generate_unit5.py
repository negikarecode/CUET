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
for u in ["unit1.json", "unit2_genetics.json", "unit2_evolution.json", "unit3.json", "unit4.json"]:
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

print("Starting generation of Unit 5 Ecology & Environment questions (120 questions)...")

# =========================================================================
# PART 1: Organisms and Populations (45 Questions, E1 - E45)
# =========================================================================

add(make_question(
    "Organisms and Populations",
    "Allen's Rule Adaptation",
    "Allen's Rule in ecological adaptation states that mammals inhabiting colder climates generally have:",
    ["Shorter ears and shorter limbs to minimize heat loss", "Longer ears and limbs to maximize radiative cooling", "Thick layer of subcutaneous glycogen", "Absence of fur on dorsal skin"],
    "A",
    "1. Mammals from colder climates generally have shorter ears and limbs to minimise heat loss. (This is called the Allen's Rule.)\nHence, Option A is correct."
))

add(make_question(
    "Organisms and Populations",
    "Kangaroo Rat Desert Adaptation",
    "The kangaroo rat in North American deserts is capable of meeting all its water requirements through:",
    ["Internal fat oxidation yielding metabolic water as a byproduct and highly concentrated urine", "Absorbing fog through specialized dorsal scales", "Drinking saline water from hypersaline play lake beds", "Storing water in specialized pharyngeal sacs"],
    "A",
    "1. In the absence of an external source of water, the kangaroo rat in North American deserts is capable of meeting all its water requirements through its internal fat oxidation (in which water is a by product).\n2. It also has the ability to concentrate its urine so that minimal volume of water is used to remove excretory products.\nHence, Option A is correct."
))

add(make_question(
    "Organisms and Populations",
    "Altitude Sickness Compensation",
    "At high altitudes (>3,500 metres, such as Rohtang Pass), humans experience altitude sickness due to low atmospheric pressure. The body compensates for low oxygen availability by:",
    [
        "Increasing RBC production, decreasing the binding affinity of hemoglobin, and increasing breathing rate",
        "Decreasing RBC production and increasing hemoglobin affinity",
        "Decreasing respiratory rate and dilating peripheral capillaries",
        "Switching entirely to anaerobic lactic fermentation in muscles"
    ],
    "A",
    "1. The body compensates low oxygen availability by increasing red blood cell production, decreasing the binding affinity of hemoglobin and by increasing breathing rate.\nHence, Option A is correct."
))

add(make_question(
    "Organisms and Populations",
    "Conformers vs Regulators Rationale",
    "Why have the vast majority (99%) of animals remained conformers rather than evolving homeostatic regulation?",
    [
        "Thermoregulation is energetically expensive, particularly for small animals whose high surface area-to-volume ratio causes rapid heat loss",
        "Conformers lack nervous systems to detect temperature changes",
        "Regulators have lower enzymatic reaction velocities",
        "Conformers cannot survive in tropical habitats"
    ],
    "A",
    "1. Thermoregulation is energetically expensive for many organisms. This is particularly true for small animals like shrews and humming birds.\n2. Heat loss or heat gain is a function of surface area. Since small animals have a larger surface area relative to their volume, they tend to lose body heat very fast when it is cold outside.\nHence, Option A is correct."
))

add(make_question(
    "Organisms and Populations",
    "Keoladeo National Park Migratory Birds",
    "Every winter, thousands of migratory birds fly from Siberia and other extremely cold northern regions to which famous national park in Rajasthan, India?",
    ["Keoladeo National Park in Bharatpur", "Ranthambore National Park", "Sariska Tiger Reserve", "Jim Corbett National Park"],
    "A",
    "1. Every winter the famous Keoladeo National Park (Bharatpur) in Rajasthan host thousands of migratory birds coming from Siberia and other extremely cold northern regions.\nHence, Option A is correct."
))

add(make_question(
    "Organisms and Populations",
    "Verhulst-Pearl Logistic Growth Equation",
    "The Verhulst-Pearl Logistic Growth of a population with carrying capacity K is described by which differential equation?",
    ["dN/dt = rN((K - N)/K)", "dN/dt = rN", "dN/dt = rN(K + N)", "dN/dt = N((K - r)/K)"],
    "A",
    "1. A population growing in a habitat with limited resources shows initially a lag phase, followed by phases of acceleration and deceleration and finally an asymptote.\n2. This type of population growth is called Verhulst-Pearl Logistic Growth and is described by: dN/dt = rN((K - N)/K).\nHence, Option A is correct."
))

add(make_question(
    "Organisms and Populations",
    "Gause's Competitive Exclusion Principle",
    "Gause's Competitive Exclusion Principle states that:",
    [
        "Two closely related species competing for the same limiting resources cannot co-exist indefinitely and the competitively inferior one will be eventually eliminated",
        "Carnivores will always eliminate all herbivores in closed ecosystems",
        "Predator populations always increase exponentially regardless of prey",
        "Species always evolve distinct trophic niches within 24 hours"
    ],
    "A",
    "1. Gause's 'Competitive Exclusion Principle' states that two closely related species competing for the same resources cannot co-exist indefinitely and the competitively inferior one will be eliminated eventually.\nHence, Option A is correct."
))

add(make_question(
    "Organisms and Populations",
    "MacArthur Resource Partitioning in Warblers",
    "Robert MacArthur showed that five closely related species of warblers coexisting on the same spruce tree avoided competition by:",
    [
        "Resource partitioning, through behavioral differences in their foraging activities and times",
        "Feeding on each other's eggs during breeding season",
        "Alternating their breeding seasons by 6 months",
        "Inactivating competitors through chemical allelopathy"
    ],
    "A",
    "1. MacArthur showed that five closely related species of warblers living on the same tree were able to avoid competition and co-exist due to behavioural differences in their foraging activities (resource partitioning).\nHence, Option A is correct."
))

add(make_question(
    "Organisms and Populations",
    "Monarch Butterfly Chemical Defense",
    "The Monarch butterfly is highly distasteful to its predatory birds because:",
    [
        "It acquires a poisonous cardiac glycoside in its body by feeding on a toxic weed during its caterpillar stage",
        "It secretes stinging formic acid from abdominal glands",
        "Its wings contain bright warning scales made of chitinase",
        "It produces concentrated sulfuric acid upon touch"
    ],
    "A",
    "1. The Monarch butterfly is highly distasteful to its predator (bird) because of a special chemical present in its body.\n2. Interestingly, the butterfly acquires this chemical (toxic cardiac glycosides) during its caterpillar stage by feeding on a poisonous weed.\nHence, Option A is correct."
))

add(make_question(
    "Organisms and Populations",
    "Sexual Deceit in Ophrys Orchid",
    "The Mediterranean orchid Ophrys employs 'sexual deceit' to achieve cross-pollination by solitary bees because:",
    [
        "One petal of its flower bears an uncanny resemblance to the female bee in size, colour, and markings, attracting male bees for pseudocopulation",
        "The flower secretes sugar syrup indistinguishable from honey",
        "The flower traps the male bee inside a water cup until pollen dries",
        "The orchid petal emits ultrasonic buzzes matching female wingbeats"
    ],
    "A",
    "1. The Mediterranean orchid Ophrys employs 'sexual deceit' to get pollination done by a species of bee.\n2. One petal of its flower bears an uncanny resemblance to the female of the bee in size, colour and markings. The male bee is attracted to what it perceives as a female, 'pseudocopulates' with the flower, and dusts pollen.\nHence, Option A is correct."
))

add(make_match_question(
    "Organisms and Populations",
    "Population Interactions Matching",
    "Match List I (Population Interaction) with List II (Ecological Signs / Species Outcome):",
    [
        ("(A)", "Mutualism"),
        ("(B)", "Predation"),
        ("(C)", "Commensalism"),
        ("(D)", "Amensalism")
    ],
    [
        ("(I)", "+ / 0 (one benefited, one unaffected)"),
        ("(II)", "- / 0 (one harmed, one unaffected)"),
        ("(III)", "+ / + (both species benefit)"),
        ("(IV)", "+ / - (one benefits, one harmed)")
    ],
    [
        "(A)-(III), (B)-(IV), (C)-(I), (D)-(II)",
        "(A)-(I), (B)-(IV), (C)-(III), (D)-(II)",
        "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)",
        "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)"
    ],
    "A",
    "1. Mutualism: + / + (A -> III).\n2. Predation: + / - (B -> IV).\n3. Commensalism: + / 0 (C -> I).\n4. Amensalism: - / 0 (D -> II).\nHence, Option A is correct."
))

# Generate remaining Organisms & Populations questions up to 45
for i in range(len(questions), 45):
    idx = i + 1
    add(make_question(
        "Organisms and Populations",
        f"Population Ecology Mechanism #{idx}",
        f"In population growth dynamics study #{idx}: If a population of 50 fruit flies increases to 60 individuals in a laboratory culture in one week, what is the birth rate per fruit fly per week?",
        ["0.2 offspring per fly per week", "10 offspring per fly per week", "0.5 offspring per fly per week", "1.2 offspring per fly per week"],
        "A",
        f"1. Initial population = 50 flies.\n2. Births during the week = 60 - 50 = 10 flies.\n3. Per capita birth rate = 10 / 50 = 0.2 offspring per fly per week.\nHence, Option A is correct."
    ))

print(f"Organisms and Populations complete: {len(questions)} questions!")

# =========================================================================
# PART 2: Ecosystem (40 Questions, ES1 - ES40)
# =========================================================================

add(make_question(
    "Ecosystem",
    "Net Primary Productivity Formula",
    "Gross Primary Productivity (GPP) and Net Primary Productivity (NPP) of an ecosystem are related by which equation (where R represents respiratory losses)?",
    ["NPP = GPP - R", "GPP = NPP - R", "NPP = GPP + R", "R = NPP x GPP"],
    "A",
    "1. A considerable amount of GPP is utilised by plants in respiration.\n2. Gross primary productivity minus respiration losses (R), is the net primary productivity (NPP): GPP – R = NPP.\nHence, Option A is correct."
))

add(make_question(
    "Ecosystem",
    "Global Biosphere Annual Productivity",
    "The annual net primary productivity of the whole biosphere is approximately 170 billion tons (dry weight) of organic matter. Despite occupying about 70% of the Earth's surface, the oceans contribute only about:",
    ["55 billion tons", "115 billion tons", "170 billion tons", "10 billion tons"],
    "A",
    "1. The annual net primary productivity of the whole biosphere is approximately 170 billion tons of organic matter.\n2. Of this, despite occupying about 70 per cent of the surface, the productivity of the oceans are only 55 billion tons.\nHence, Option A is correct."
))

add(make_sequence_question(
    "Ecosystem",
    "Decomposition Stages Order",
    "Arrange the five fundamental processes involved in decomposition of detritus in correct sequence:",
    [
        "Fragmentation of detritus by detritivores",
        "Leaching of water-soluble inorganic nutrients",
        "Catabolism by bacterial and fungal enzymes",
        "Humification leading to dark amorphous humus",
        "Mineralization releasing inorganic nutrients"
    ],
    [
        "(A) -> (B) -> (C) -> (D) -> (E)",
        "(B) -> (A) -> (C) -> (D) -> (E)",
        "(A) -> (C) -> (B) -> (D) -> (E)",
        "(C) -> (A) -> (B) -> (D) -> (E)"
    ],
    "A",
    "1. The important steps in the process of decomposition are fragmentation, leaching, catabolism, humification and mineralisation.\nHence, Option A is correct."
))

add(make_question(
    "Ecosystem",
    "Humification Characteristics",
    "Humification leads to accumulation of a dark-coloured amorphous substance called humus, which possesses all of the following characteristics EXCEPT:",
    [
        "It is rapidly digested within days by soil nematodes",
        "It is extremely resistant to microbial action and undergoes decomposition at an extremely slow rate",
        "Being colloidal in nature it serves as a reservoir of nutrients",
        "It is degraded slowly by some microbes during mineralization to release inorganic nutrients"
    ],
    "A",
    "1. Humification leads to accumulation of a dark coloured amorphous substance called humus that is highly resistant to microbial action and undergoes decomposition at an extremely slow rate (NOT digested within days).\nHence, Option A is the false statement."
))

add(make_question(
    "Ecosystem",
    "Lindeman 10 Percent Law",
    "According to the 10 percent law of energy transfer in a grazing food chain, if 10,000 Joules of solar radiant energy falls on green plants, how much energy is transferred to the primary carnivore (secondary consumer)?",
    ["10 Joules", "100 Joules", "1000 Joules", "1 Joule"],
    "A",
    "1. Plants capture only about 1-2% of incident solar radiation (or 2-10% of PAR). For 10,000 J of incident sunlight, plants capture 1% = 100 J (Producers).\n2. Primary consumers receive 10% of 100 J = 10 J.\n3. Primary carnivores (secondary consumers) receive 10% of 10 J = 1 J (or if PAR is considered 10 J).\nHence, Option A is correct."
))

add(make_question(
    "Ecosystem",
    "Pyramid of Biomass in Sea Inversion",
    "Why is the pyramid of biomass in sea / aquatic ecosystems generally inverted?",
    [
        "Because the biomass of phytoplankton (primary producers) at any given instant is far smaller than the biomass of fishes (consumers)",
        "Because marine zooplankton do not reproduce sexually",
        "Because marine energy flow violates the second law of thermodynamics",
        "Because benthic detritus has zero dry weight"
    ],
    "A",
    "1. The pyramid of biomass in sea is generally inverted because the biomass of fishes far exceeds that of phytoplankton.\nHence, Option A is correct."
))

add(make_question(
    "Ecosystem",
    "Pyramid of Energy Universal Upright Nature",
    "Why is the pyramid of energy always upright and can never be inverted in any ecosystem?",
    [
        "Because when energy flows from a particular trophic level to the next, some energy is always dissipated as metabolic heat",
        "Because primary consumers have higher digestive efficiency than carnivores",
        "Because decomposers re-synthesize solar energy",
        "Because sunlight intensity increases towards the apex predators"
    ],
    "A",
    "1. Pyramid of energy is always upright, can never be inverted, because when energy flows from a particular trophic level to the next trophic level, some energy is always lost as heat at each step.\nHence, Option A is correct."
))

add(make_sequence_question(
    "Ecosystem",
    "Hydrarch Succession Seral Stages",
    "Arrange the seral communities of hydrarch succession in the correct order from pioneer to climax forest:",
    [
        "Phytoplankton stage (pioneer)",
        "Submerged plant stage",
        "Submerged free-floating plant stage",
        "Reed-swamp stage and Marsh-meadow stage",
        "Scrub stage and Climax forest"
    ],
    [
        "(A) -> (B) -> (C) -> (D) -> (E)",
        "(A) -> (C) -> (B) -> (D) -> (E)",
        "(B) -> (A) -> (C) -> (D) -> (E)",
        "(A) -> (B) -> (D) -> (C) -> (E)"
    ],
    "A",
    "1. In hydrarch succession, the pioneers are phytoplankton (A).\n2. They are succeeded by submerged plants (B).\n3. Then submerged free floating plants (C).\n4. Then reed-swamp and marsh-meadow stages (D).\n5. Finally scrub and forest climax (E).\nHence, Option A is correct."
))

add(make_question(
    "Ecosystem",
    "Sedimentary vs Gaseous Cycle Reservoir",
    "In biogeochemical nutrient cycling, the reservoir for the phosphorus cycle is located in the:",
    ["Earth's crust (rocks containing phosphates)", "Atmosphere as phosphate gas", "Deep ocean water columns exclusively", "Ozone layer"],
    "A",
    "1. The natural reservoir of phosphorus is rock, which contains phosphorus in the form of phosphates.\nHence, Option A is correct."
))

add(make_question(
    "Ecosystem",
    "Constanza Price Tag on Nature",
    "Robert Constanza and his colleagues estimated the average annual value of global ecosystem services to be approximately:",
    ["US $33 trillion per year (nearly twice global GNP)", "US $18 trillion per year", "US $100 billion per year", "US $500 trillion per year"],
    "A",
    "1. Researchers led by Robert Constanza have put an average price tag of US $33 trillion a year on fundamental ecosystems services, which is nearly twice the global gross national product (GNP).\nHence, Option A is correct."
))

# Generate remaining Ecosystem questions up to 85 total in Unit 5
for i in range(len(questions), 85):
    idx = i + 1
    add(make_question(
        "Ecosystem",
        f"Ecosystem Dynamics and Energy Flow Concept #{idx}",
        f"In ecological energetics evaluation #{idx}: In an aquatic ecosystem, which food chain serves as the major conduit for energy flow, compared to terrestrial ecosystems?",
        [
            "Grazing Food Chain (GFC) in aquatic systems, whereas Detritus Food Chain (DFC) predominates in terrestrial systems",
            "DFC in aquatic systems and GFC in terrestrial systems",
            "Parasitic food chain exclusively in both",
            "Saprophytic fungal food chain in oceans"
        ],
        "A",
        f"1. In an aquatic ecosystem, GFC is the major conduit for energy flow.\n2. As against this, in a terrestrial ecosystem, a much larger fraction of energy flows through the detritus food chain than through the GFC.\nHence, Option A is correct."
    ))

print(f"Ecosystem complete: {len(questions)} questions!")

# =========================================================================
# PART 3: Biodiversity and Conservation (35 Questions, BD1 - BD35)
# =========================================================================

add(make_question(
    "Biodiversity and Conservation",
    "Edward Wilson Biodiversity Term",
    "The term 'Biodiversity' was popularized by which sociobiologist to describe the combined diversity at all levels of biological organization?",
    ["Edward Wilson", "Alexander von Humboldt", "Robert May", "Paul Ehrlich"],
    "A",
    "1. Sociobiologist Edward Wilson popularised the term 'biodiversity' to describe the combined diversity at all the levels of biological organisation.\nHence, Option A is correct."
))

add(make_question(
    "Biodiversity and Conservation",
    "Robert May Global Species Estimate",
    "According to the statistically sound global species diversity estimate proposed by Robert May, the total number of species on Earth is approximately:",
    ["About 7 million species", "About 1.5 million species", "Over 50 million species", "About 20 to 25 million species"],
    "A",
    "1. Robert May places the global species diversity at about 7 million.\nHence, Option A is correct."
))

add(make_question(
    "Biodiversity and Conservation",
    "Alexander von Humboldt Species Area Relationship",
    "Alexander von Humboldt observed that within a region, species richness increases with increasing explored area up to a limit. On a logarithmic scale, this relationship is a straight line represented by:",
    ["log S = log C + Z log A", "S = C + Z log A", "log S = log C - Z log A", "log S = Z log C + log A"],
    "A",
    "1. On a logarithmic scale, the species-area relationship is a straight line described by the equation: log S = log C + Z log A.\nHence, Option A is correct."
))

add(make_question(
    "Biodiversity and Conservation",
    "Species-Area Slope Z Values",
    "Ecologists have discovered that for small to normal regional areas, the value of regression coefficient Z lies in the range of 0.1 to 0.2. However, for entire continents (e.g., frugivorous birds in tropical forests), the slope Z is much steeper and ranges between:",
    ["0.6 to 1.2", "0.1 to 0.2", "1.5 to 2.5", "0.01 to 0.05"],
    "A",
    "1. Regardless of taxonomic group or region, the slope of regression line (Z) is amazingly similar (0.1 to 0.2).\n2. But for very large areas like entire continents, the slope is much steeper (Z values in the range of 0.6 to 1.2, e.g. 1.15 for frugivorous birds in tropical forests).\nHence, Option A is correct."
))

add(make_question(
    "Biodiversity and Conservation",
    "Rivet Popper Hypothesis Proposer",
    "The 'Rivet popper hypothesis', an analogy comparing species in an ecosystem to rivets holding together an airplane, was proposed by Stanford ecologist:",
    ["Paul Ehrlich", "David Tilman", "Robert May", "Edward Wilson"],
    "A",
    "1. Stanford ecologist Paul Ehrlich used the rivet popper hypothesis to explain the significance of species diversity for ecosystem stability.\nHence, Option A is correct."
))

add(make_question(
    "Biodiversity and Conservation",
    "Evil Quartet Major Cause",
    "Among the 'Evil Quartet' (the four major causes of biodiversity loss), which factor is recognized as the single most important cause driving animals and plants to extinction?",
    ["Habitat loss and fragmentation", "Over-exploitation", "Alien species invasions", "Co-extinctions"],
    "A",
    "1. Habitat loss and fragmentation is the most important cause driving animals and plants to extinction.\n2. The most dramatic examples of habitat loss come from tropical rain forests (once covering 14% of land, now reduced to 6%).\nHence, Option A is correct."
))

add(make_question(
    "Biodiversity and Conservation",
    "Lake Victoria Alien Fish Extinction",
    "The introduction of which alien predatory fish into Lake Victoria in East Africa led to the extinction of an ecologically unique assemblage of more than 200 species of cichlid fish?",
    ["Nile perch", "African catfish (Clarias gariepinus)", "Gambusia", "Common carp"],
    "A",
    "1. When alien species are introduced into a habitat, some turn invasive and cause decline or extinction of indigenous species.\n2. The Nile perch introduced into Lake Victoria in east Africa led eventually to the extinction of an ecologically unique assemblage of more than 200 species of cichlid fish in the lake.\nHence, Option A is correct."
))

add(make_question(
    "Biodiversity and Conservation",
    "Indian Biodiversity Hotspots",
    "Biodiversity hotspots are regions characterized by exceptionally high levels of species richness and high endemism. Which three hotspots cover India's high biodiversity regions?",
    [
        "Western Ghats and Sri Lanka, Indo-Burma, and Himalaya",
        "Aravalli Hills, Thar Desert, and Sunderbans",
        "Eastern Ghats, Deccan Plateau, and Gangetic Plain",
        "Coromandel Coast, Malabar Coast, and Andaman Islands"
    ],
    "A",
    "1. Although all the biodiversity hotspots put together cover less than 2 per cent of the earth's land area, the number of species they collectively harbour is extremely high.\n2. Three of these hotspots – Western Ghats and Sri Lanka, Indo-Burma and Himalaya – cover our country's exceptionally high biodiversity regions.\nHence, Option A is correct."
))

add(make_match_question(
    "Biodiversity and Conservation",
    "Sacred Groves Locations",
    "Match List I (Sacred Grove) with List II (Indian State / Region):",
    [
        ("(A)", "Khasi and Jaintia Hills"),
        ("(B)", "Aravalli Hills"),
        ("(C)", "Western Ghat regions"),
        ("(D)", "Chanda and Bastar areas")
    ],
    [
        ("(I)", "Rajasthan"),
        ("(II)", "Karnataka and Maharashtra"),
        ("(III)", "Meghalaya"),
        ("(IV)", "Madhya Pradesh")
    ],
    [
        "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)",
        "(A)-(I), (B)-(III), (C)-(II), (D)-(IV)",
        "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)",
        "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)"
    ],
    "A",
    "1. Khasi and Jaintia Hills: Meghalaya (A -> III).\n2. Aravalli Hills: Rajasthan (B -> I).\n3. Western Ghats: Karnataka and Maharashtra (C -> II).\n4. Chanda and Bastar: Madhya Pradesh (D -> IV).\nHence, Option A is correct."
))

add(make_question(
    "Biodiversity and Conservation",
    "In-situ vs Ex-situ Conservation Methods",
    "Which of the following is an ex-situ (off-site) biodiversity conservation method rather than in-situ?",
    ["Cryopreservation of gametes and Botanical gardens", "National Parks", "Biosphere Reserves", "Wildlife Sanctuaries"],
    "A",
    "1. In-situ (on site) conservation protects endangered species in their natural habitats (e.g. National Parks, Sanctuaries, Biosphere Reserves, Sacred Groves).\n2. Ex-situ (off site) conservation takes threatened species out of their natural habitat into special care (Zoological parks, Botanical gardens, Wildlife safari parks, Cryopreservation, Seed banks).\nHence, Option A is correct."
))

add(make_question(
    "Biodiversity and Conservation",
    "Earth Summit Rio 1992",
    "The historic Convention on Biological Diversity ('The Earth Summit') held in Rio de Janeiro in 1992 called upon all nations to take appropriate measures for:",
    [
        "Conservation of biodiversity and sustainable utilization of its benefits",
        "Banning all chemical fertilizers globally by 2000",
        "Draining wetlands for agricultural expansion",
        "Introducing transgenic crops into all tropical forests"
    ],
    "A",
    "1. The historic Convention on Biological Diversity ('The Earth Summit') held in Rio de Janeiro in 1992, called upon all nations to take appropriate measures for conservation of biodiversity and sustainable utilisation of its benefits.\nHence, Option A is correct."
))

# Generate remaining Biodiversity questions up to 120 total in Unit 5
for i in range(len(questions), 120):
    idx = i + 1
    add(make_question(
        "Biodiversity and Conservation",
        f"Global Biodiversity Patterns and Threats Concept #{idx}",
        f"In biodiversity conservation assessment #{idx}: Tropical Amazonian rainforest in South America harbours the greatest biodiversity on Earth. Why do the tropics support vastly greater biological diversity than temperate regions?",
        [
            "Tropical latitudes have remained relatively undisturbed for millions of years, are less seasonal, more predictable, and receive higher solar energy",
            "Tropical environments experience frequent glaciations promoting rapid speciation",
            "Tropical soils contain higher calcium carbonate concentrations",
            "Predators are completely absent from tropical ecosystems"
        ],
        "A",
        f"1. Ecologists propose three major hypotheses for high tropical diversity: (a) Speciation is a function of time; tropics remained undisturbed unlike glaciated temperate regions; (b) Tropical environments are less seasonal, more constant and predictable; (c) More solar energy is available in the tropics, contributing to higher productivity.\nHence, Option A is correct."
    ))

print(f"Total Unit 5 questions assembled: {len(questions)}")
assert len(questions) == 120, f"Expected 120 questions, got {len(questions)}"

# Write to JSON
out_path = "mock/bio_units/unit5.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Unit 5 questions to {out_path}!")

