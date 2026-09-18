import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.history_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Bricks, Beads and Bones: The Harappan Civilisation"
questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches PYQ: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 60 unique questions for Unit 1: Bricks, Beads and Bones (Harappan Civilisation)...")

# =================================================================================================
# 1. Subsistence Strategies & Agricultural Technology (Q1 - Q15)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Rice",
    ["Wheat", "Barley", "Lentil"],
    "A",
    "1. According to archaeological findings, grains found at Harappan sites include wheat, barley, lentil, chickpea, and sesame. Finds of rice are relatively rare.\nHence, Option {{CORR}} is correct.",
    "Identifies rice as relatively rare among Harappan grain findings."
)
add_q(make_question(CHAPTER, "Subsistence Strategies", "At which of the following Harappan sites were finds of grains like rice found to be relatively rare compared to wheat and barley?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Millets",
    ["Oats", "Maize", "Rye"],
    "B",
    "1. Millets have been found from archaeological sites in Gujarat, indicating dietary diversity.\nHence, Option {{CORR}} is correct.",
    "Identifies millets found in Gujarat Harappan sites."
)
add_q(make_question(CHAPTER, "Subsistence Strategies", "Finds of which of the following food grains have been discovered specifically from Harappan sites in Gujarat?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shortughai in Afghanistan",
    ["Kalibangan in Rajasthan", "Lothal in Gujarat", "Banawali in Haryana"],
    "C",
    "1. Traces of canals for irrigation have been found at the Harappan site of Shortughai in Afghanistan, but not in Punjab or Sindh.\nHence, Option {{CORR}} is correct.",
    "Identifies Shortughai in Afghanistan as site of irrigation canal traces."
)
add_q(make_question(CHAPTER, "Agricultural Technology", "Traces of ancient irrigation canals have been discovered at which Harappan settlement located in Afghanistan?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dholavira in Gujarat",
    ["Chanhudaro in Sindh", "Harappa in Punjab", "Kot Diji in Pakistan"],
    "D",
    "1. Water reservoirs found at Dholavira in Gujarat were probably used to store water for agriculture and municipal use.\nHence, Option {{CORR}} is correct.",
    "Identifies Dholavira for stone-cut water reservoirs."
)
add_q(make_question(CHAPTER, "Agricultural Technology", "Sophisticated stone-cut water reservoirs probably used to store water for agriculture have been found at:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cholistan and Banawali (Haryana)",
    ["Lothal and Rangpur (Gujarat)", "Shortughai and Mundigak (Afghanistan)", "Sutkagen Dor and Amri (Baluchistan)"],
    "A",
    "1. Terracotta models of the plough have been found at sites in Cholistan and at Banawali in Haryana.\nHence, Option {{CORR}} is correct.",
    "Identifies Cholistan and Banawali for terracotta plough models."
)
add_q(make_question(CHAPTER, "Agricultural Technology", "Terracotta models of the plough have been recovered by archaeologists from which Harappan sites?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kalibangan in Rajasthan",
    ["Dholavira in Gujarat", "Mohenjodaro in Sindh", "Rakhigarhi in Haryana"],
    "B",
    "1. Evidence of a ploughed field associated with Early Harappan levels has been found at Kalibangan in Rajasthan, showing two sets of furrows at right angles.\nHence, Option {{CORR}} is correct.",
    "Identifies Kalibangan for ploughed field evidence."
)
add_q(make_question(CHAPTER, "Agricultural Technology", "Evidence of a ploughed field with two sets of furrows crossing at right angles was discovered at:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "That two different crops were grown together simultaneously",
    ["That fields were divided between private landlords and state serfs", "That one set was meant for ritual religious ceremonies only", "That land was prepared exclusively for paddy transplantation"],
    "C",
    "1. The two sets of furrows at right angles at Kalibangan indicated that two different crops were grown together in the same field.\nHence, Option {{CORR}} is correct.",
    "Explains significance of two sets of furrows crossing at right angles."
)
add_q(make_question(CHAPTER, "Agricultural Technology", "What do the two sets of intersecting furrows discovered at Kalibangan suggest regarding agricultural practice?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cattle, sheep, goat, buffalo, and pig",
    ["Horse, lion, camel, and giraffe", "Rhinoceros, zebra, chimpanzee, and yak", "Elephant, kangaroo, llama, and polar bear"],
    "D",
    "1. Animal bones found at Harappan sites include cattle, sheep, goat, buffalo, and pig, indicating they were domesticated.\nHence, Option {{CORR}} is correct.",
    "Identifies domesticated animals at Harappan settlements."
)
add_q(make_question(CHAPTER, "Subsistence Strategies", "Bones of which group of domesticated animals have been confirmed through osteological studies at Harappan sites?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Wild animal species whose bones indicate hunting by Harappans or hunting communities",
    ["Animals kept exclusively for royal carriage transport", "Domestic animals introduced from Egyptian maritime traders", "Extinct mythological beasts depicted on royal seals"],
    "A",
    "1. Bones of wild species such as boar, deer, and gharial are found, indicating Harappans obtained meat through hunting directly or trade with hunter-gatherers.\nHence, Option {{CORR}} is correct.",
    "Identifies wild species found in faunal assemblages."
)
add_q(make_question(CHAPTER, "Subsistence Strategies", "Bones of boar, deer, and gharial found at Harappan sites represent:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Archaeo-botanists",
    ["Archaeo-zoologists", "Numismatists", "Epigraphists"],
    "B",
    "1. Archaeo-botanists are specialists in ancient plant remains who reconstruct dietary and subsistence practices.\nHence, Option {{CORR}} is correct.",
    "Defines Archaeo-botanists."
)
add_q(make_question(CHAPTER, "Subsistence Strategies", "Specialists who reconstruct Harappan subsistence practices through the study of charred seeds and grains are called:", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Agricultural Technology",
    "Terracotta representations of the bull indicate that the bull was known to Harappans and oxen were used for ploughing.",
    "Most Harappan sites are located in semi-arid lands, where irrigation was probably required for agriculture.",
    1, "A",
    "1. Both statements are accurate NCERT facts: oxen were used for ploughing, and most sites in semi-arid zones relied on canal/well irrigation.",
    "Confirms both statements are correct regarding Harappan agriculture."
))

add_q(make_statement_question(
    CHAPTER, "Agricultural Technology",
    "Canals have been found extensively throughout all Mature Harappan sites in Punjab and Sindh.",
    "Traces of canals have been discovered at the Harappan site of Shortughai in Afghanistan.",
    4, "B",
    "1. Statement I is false because traces of canals have NOT been found in Punjab or Sindh; Statement II is true (canals were found at Shortughai).",
    "Identifies Statement I as incorrect and Statement II as correct."
))

add_q(make_assertion_question(
    CHAPTER, "Agricultural Technology",
    "The Harappans practiced multiple cropping in their fields.",
    "Archaeologists discovered a ploughed field at Kalibangan with two sets of furrows at right angles to each other.",
    1, "A",
    "1. Both (A) and (R) are true, and the two intersecting sets of furrows at Kalibangan provide direct material evidence that two different crops were cultivated together.",
    "Confirms (R) is the correct explanation of (A)."
))

add_q(make_match_question(
    CHAPTER, "Agricultural Sites",
    "Match the archaeological discovery in List I with the corresponding Harappan site in List II:",
    [("A", "Ploughed field"), ("B", "Canal traces"), ("C", "Water reservoir"), ("D", "Terracotta plough model")],
    [("i", "Shortughai"), ("ii", "Kalibangan"), ("iii", "Banawali"), ("iv", "Dholavira")],
    "A-ii, B-i, C-iv, D-iii",
    "A",
    "1. Ploughed field is at Kalibangan (A-ii), Canal traces at Shortughai (B-i), Water reservoirs at Dholavira (C-iv), Terracotta plough at Banawali (D-iii).",
    "Matches Harappan agricultural discoveries with sites."
))

opts, corr, sol = rotate_options(
    "Saddle querns made of hard, gritty igneous rock or sandstone",
    ["Rotary electric stone crushers", "Cast-iron industrial rolling mills", "Bronze mortar-and-pestle apparatus"],
    "C",
    "1. Saddle querns were found in large numbers and seem to have been the only means in use for grinding cereals and spices.\nHence, Option {{CORR}} is correct.",
    "Identifies saddle querns used for grinding grain."
)
add_q(make_question(CHAPTER, "Subsistence Strategies", "Which grinding equipment made of hard, gritty rock was used in large numbers at Mohenjodaro for crushing grain and spices?", opts, corr, sol))

# =================================================================================================
# 2. Mohenjodaro: Planned Urban Centre & Drainage (Q16 - Q30)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Citadel (smaller, higher) and Lower Town (larger, lower)",
    ["Upper Acropolis and Subterranean Necropolis", "Fortified Temple Complex and Royal Cantonment", "Administrative Cantonment and Agrarian Commune"],
    "A",
    "1. The settlement of Mohenjodaro was divided into two sections: the Citadel (smaller but higher, walled on mud brick platforms) and the Lower Town (larger but lower).\nHence, Option {{CORR}} is correct.",
    "Identifies two structural sections of Mohenjodaro."
)
add_q(make_question(CHAPTER, "Mohenjodaro Urban Layout", "Mohenjodaro is physically divided into which two distinct architectural sections?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Because buildings in the Citadel were constructed on elevated mud-brick platforms",
    ["Because natural mountain ridges supported the Citadel", "Because multistory skyscrapers were erected there", "Because the Citadel was built on top of ancient wooden piles"],
    "B",
    "1. The Citadel owes its height to the fact that buildings were constructed on massive mud brick platforms.\nHence, Option {{CORR}} is correct.",
    "Explains elevated height of Citadel due to mud-brick platforms."
)
add_q(make_question(CHAPTER, "Mohenjodaro Urban Layout", "Why was the Citadel at Mohenjodaro physically higher than the Lower Town?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sun-dried or baked bricks of standardized ratio (length and breadth were four times and twice the height)",
    ["Cut limestone blocks fastened with iron clamps", "Rough unhewn boulders cemented with bitumen", "Sun-dried wooden beams covered in wet clay plaster"],
    "C",
    "1. Harappan bricks were of a standardized ratio: the length and breadth were four times and twice the height respectively (1:2:4 ratio).\nHence, Option {{CORR}} is correct.",
    "Identifies standardized Harappan brick ratio 1:2:4."
)
add_q(make_question(CHAPTER, "Mohenjodaro Urban Layout", "Bricks used across all Harappan settlements exhibited which standardized dimensional proportion?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Roads and streets were laid out along an approximate 'grid' pattern, intersecting at right angles",
    ["Streets were laid in concentric circular rings around a central ziggurat", "Narrow serpentine lanes converged arbitrarily on a royal palace", "Roads followed random natural drainage contours without symmetry"],
    "D",
    "1. A notable feature of Harappan urban planning was the grid pattern of roads intersecting at right angles.\nHence, Option {{CORR}} is correct.",
    "Identifies grid pattern of Harappan streets intersecting at right angles."
)
add_q(make_question(CHAPTER, "Mohenjodaro Drainage System", "Which urban layout rule characterized the street network of Harappan cities like Mohenjodaro?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Every house had at least one wall along a street so that domestic waste water could flow into street drains",
    ["House drains emptied into central private wells under the bedroom", "Waste water was pumped uphill into the Citadel reservoirs", "Waste was collected in wooden carts parked outside city ramparts"],
    "A",
    "1. If street drains were laid out first, it seems every house needed at least one wall alongside a street to connect domestic drains with street channels.\nHence, Option {{CORR}} is correct.",
    "Explains house wall alignment along streets for drainage connection."
)
add_q(make_question(CHAPTER, "Mohenjodaro Drainage System", "Why was every residential house in the Lower Town built with at least one wall abutting a street?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Burnt bricks laid in mortar, covered with loose bricks or limestone slabs for cleaning",
    ["Open wooden troughs lined with animal fat", "Lead pipes imported from Roman metallurgical centers", "Hollowed-out bamboo stems sealed with resin"],
    "B",
    "1. Street drains were made of burnt bricks laid in mortar and were covered with loose bricks that could be removed for periodic cleaning.\nHence, Option {{CORR}} is correct.",
    "Describes construction of covered street drains in Harappan cities."
)
add_q(make_question(CHAPTER, "Mohenjodaro Drainage System", "The underground street drains of Mohenjodaro were constructed using:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Centred on a courtyard with rooms on all sides, serving as the hub for cooking and weaving",
    ["Arranged linearly without courtyards along an exterior open veranda", "Multi-tiered subterranean caves carved into granite outcrops", "Open communal dormitories housing fifty families together"],
    "C",
    "1. The Lower Town at Mohenjodaro provides examples of residential buildings centred on a courtyard with rooms on all sides.\nHence, Option {{CORR}} is correct.",
    "Describes courtyard-centred domestic architecture of Mohenjodaro."
)
add_q(make_question(CHAPTER, "Domestic Architecture", "The residential architecture of the Lower Town at Mohenjodaro was typically structured around:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "An apparent concern for privacy, as there were no windows in walls at ground level and main entrances did not give a direct view inside",
    ["A shortage of timber required to construct window frames", "Religious taboos prohibiting natural sunlight from entering dwellings", "Fear of flooding from subterranean underground water tables"],
    "D",
    "1. There are no windows in the walls on the ground level, and the main entrance does not give a direct view of the courtyard, showing a concern for privacy.\nHence, Option {{CORR}} is correct.",
    "Identifies concern for privacy reflected in absence of ground-floor windows."
)
add_q(make_question(CHAPTER, "Domestic Architecture", "What architectural concern is reflected in the absence of windows on ground-level walls and indirect views from main entrances at Mohenjodaro?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "About 700 wells",
    ["About 50 wells", "About 2,500 wells", "Zero wells (relied entirely on river fetching)"],
    "A",
    "1. Scholars have estimated that the total number of wells in Mohenjodaro was about 700.\nHence, Option {{CORR}} is correct.",
    "Identifies approximately 700 wells in Mohenjodaro."
)
add_q(make_question(CHAPTER, "Domestic Architecture", "Scholars estimate that the total number of wells located in Mohenjodaro was approximately:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "In a room that could be reached from the outside, perhaps for use by passing travellers",
    ["Deep inside the private master bedroom", "On top of the flat terrace roof", "Inside subterranean grain storage vaults"],
    "B",
    "1. Many houses had wells in a room accessible from the outside, probably intended to allow passers-by to draw water.\nHence, Option {{CORR}} is correct.",
    "Identifies location of wells accessible to passers-by."
)
add_q(make_question(CHAPTER, "Domestic Architecture", "In many residential houses at Mohenjodaro, where were wells deliberately positioned?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A special ritual bath for public or ceremonial occasions",
    ["A commercial swimming pool for civic athletic games", "An industrial water reservoir for cooling bronze foundry furnaces", "A municipal sewage settling tank"],
    "C",
    "1. The uniqueness of the Great Bath and its location on the Citadel suggests that it was meant for some kind of special ritual bath.\nHence, Option {{CORR}} is correct.",
    "Identifies ritual bath function of Great Bath."
)
add_q(make_question(CHAPTER, "The Citadel: Great Bath", "The architectural layout and Citadel location of the 'Great Bath' indicate that it was meant for:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Setting bricks on edge and using a mortar of gypsum",
    ["Coating stone slabs with melted asphalt and iron sheets", "Fixing cedar wooden planks with bronze rivets", "Using unbaked river clay tempered with straw"],
    "D",
    "1. The Great Bath was made watertight by setting bricks on edge and using a mortar of gypsum.\nHence, Option {{CORR}} is correct.",
    "Identifies gypsum mortar used to make Great Bath watertight."
)
add_q(make_question(CHAPTER, "The Citadel: Great Bath", "How was the rectangular tank of the Great Bath made watertight by Harappan engineers?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A massive brick foundation structure whose upper wooden portions likely decayed early",
    ["A stone temple dedicated to the Mother Goddess", "A royal palace containing five hundred residential bed chambers", "A military fortress housing chariots and weapons"],
    "A",
    "1. The Warehouse was a massive structure of which the lower brick portions remain, while the upper portions, probably of wood, decayed long ago.\nHence, Option {{CORR}} is correct.",
    "Describes the Warehouse on the Citadel."
)
add_q(make_question(CHAPTER, "The Citadel: Warehouse", "The 'Warehouse' discovered on the Citadel of Mohenjodaro is architecturally characterized as:", opts, corr, sol))

add_q(make_assertion_question(
    CHAPTER, "Mohenjodaro Drainage System",
    "The drainage system of Mohenjodaro was one of the most complete and sophisticated ancient systems ever discovered.",
    "Even smaller settlements like Lothal had houses built of mud bricks with drains made of burnt bricks.",
    2, "B",
    "1. Both statements are true NCERT facts, but Lothal's drainage is an independent supporting example, not the explanatory cause of Mohenjodaro's complete drainage network.",
    "Confirms both (A) and (R) are true but (R) is not the causal explanation of (A)."
))

add_q(make_statement_question(
    CHAPTER, "Citadel Architecture",
    "The Citadel at Mohenjodaro was walled, which meant that it was physically separated from the Lower Town.",
    "At sites like Dholavira and Lothal, the entire settlement was fortified, and sections within were separated by walls.",
    1, "A",
    "1. Both statements are accurate NCERT facts regarding fortifications at Mohenjodaro, Dholavira, and Lothal.",
    "Confirms both statements are correct regarding Harappan Citadel fortifications."
))

# =================================================================================================
# 3. Social Differences, Burials & Luxury Objects (Q31 - Q40)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Studying burial practices and distinguishing utilitarian objects from luxury goods",
    ["Translating royal decrees inscribed on monumental stone pillars", "Analyzing the personal diaries of Harappan kings", "Examining income tax assessment ledgers recovered from banks"],
    "A",
    "1. Archaeologists study social differences within Harappan society primarily by analyzing burials and classifying artifacts into utilitarian items and luxuries.\nHence, Option {{CORR}} is correct.",
    "Identifies burials and luxury goods analysis to trace social differences."
)
add_q(make_question(CHAPTER, "Tracking Social Differences", "Which two major strategies are employed by archaeologists to identify socioeconomic differences in Harappan society?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Harappans generally did not believe in burying precious things with the dead",
    ["Harappans possessed no gold or precious stone jewelry whatsoever", "All grave goods were compulsorily confiscated by the state priesthood", "Harappan burials were strictly reserved for foreign merchants"],
    "B",
    "1. Although some jewelry was placed in graves, the modest nature of grave goods suggests Harappans did not believe in burying precious valuables with the dead.\nHence, Option {{CORR}} is correct.",
    "Explains absence of huge wealth in Harappan graves compared to Egyptian pyramids."
)
add_q(make_question(CHAPTER, "Burials", "Why do Harappan burials contain relatively modest grave goods compared to royal burials in ancient Egypt?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Three shell rings, a jasper bead, and hundreds of micro-beads near the skull of a male",
    ["A solid gold crown set with rubies and emeralds", "Ten bronze battle chariots and iron longswords", "Fifty silver coins minted by Persian monarchs"],
    "C",
    "1. Excavations at the cemetery in Harappa in the 1980s revealed an ornament consisting of three shell rings, a jasper bead, and hundreds of micro-beads near the skull of a male.\nHence, Option {{CORR}} is correct.",
    "Identifies specific grave ornament found in Harappa cemetery."
)
add_q(make_question(CHAPTER, "Burials", "An excavation in the cemetery at Harappa in the mid-1980s revealed which specific grave ornament?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Made of copper",
    ["Made of silver", "Made of polished glass", "Made of stainless steel"],
    "D",
    "1. Hand mirrors recovered from Harappan burials were made of polished copper.\nHence, Option {{CORR}} is correct.",
    "Identifies Harappan mirrors as made of copper."
)
add_q(make_question(CHAPTER, "Burials", "Hand mirrors occasionally found deposited in Harappan burials were fabricated from:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A material made of ground sand or silica mixed with colour and a gum and then fired",
    ["A natural precious gem mined exclusively in South India", "An alloy of copper and gold imported from Mesopotamia", "A hardened fossil resin obtained from Himalayan pine trees"],
    "A",
    "1. Faience is a material made of ground sand or silica mixed with color and gum and then fired, regarded as luxurious because it was difficult to make.\nHence, Option {{CORR}} is correct.",
    "Defines Faience."
)
add_q(make_question(CHAPTER, "Looking for Luxuries", "In Harappan archaeology, 'faience' is defined as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They were difficult to fabricate and made of costly, non-local or rare materials",
    ["They were legally prohibited from ordinary citizen possession", "They were minted as official currency for paying municipal taxes", "They were imported exclusively from ancient Roman senators"],
    "B",
    "1. Archaeologists classify objects as luxuries if they are rare, made from costly non-local materials, or made with complicated technologies (e.g. faience pots).\nHence, Option {{CORR}} is correct.",
    "Explains criteria for identifying luxury objects."
)
add_q(make_question(CHAPTER, "Looking for Luxuries", "Why are miniature pots of faience considered luxury items by archaeologists?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Concentrated in large urban centres like Mohenjodaro and Harappa, and rarely found in small settlements",
    ["Evenly distributed across all tiny agricultural hamlets", "Found exclusively in coastal fishing villages like Balakot", "Buried exclusively under irrigation canals in Shortughai"],
    "C",
    "1. Valuable materials made of costly materials are found concentrated in large settlements like Mohenjodaro and Harappa and are rarely found in smaller settlements.\nHence, Option {{CORR}} is correct.",
    "Identifies concentration of luxury objects in large urban centres."
)
add_q(make_question(CHAPTER, "Looking for Luxuries", "Where are valuable luxury artifacts, such as gold jewelry and faience vessels, predominantly found in the Harappan world?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hoards of precious objects kept inside pots, often buried by owners for safekeeping and not retrieved",
    ["Wages paid to bricklayers working on the Citadel", "Religious sacrificial offerings thrown into the Indus river", "Scrap metals discarded inside civic street drainage sumps"],
    "D",
    "1. Gold jewelry found at Harappan sites was recovered from hoards—packings of valuables kept safely inside pots, buried and never recovered by original owners.\nHence, Option {{CORR}} is correct.",
    "Explains recovery of Harappan gold jewelry from hoards."
)
add_q(make_question(CHAPTER, "Looking for Luxuries", "Gold jewelry recovered from Harappan settlements was almost exclusively discovered in the form of:", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Tracking Social Differences",
    "At burials in Harappan sites, the dead were generally laid in pits.",
    "Some burial pits were lined with bricks, which may indicate social differences.",
    1, "A",
    "1. Both statements are accurate NCERT facts: bodies were laid in pits, and some pits were lined with bricks, hinting at social stratification.",
    "Confirms both statements are correct regarding Harappan burial pits."
))

add_q(make_assertion_question(
    CHAPTER, "Looking for Luxuries",
    "Little faience pots, probably used as perfume bottles, are found mostly in Mohenjodaro and Harappa.",
    "Faience was an everyday utilitarian material that was cheap and easy to manufacture in small rural hamlets.",
    3, "C",
    "1. Assertion (A) is true (faience pots are concentrated in large cities); Reason (R) is false because faience was difficult and costly to make, making it a luxury item.",
    "Identifies Assertion as true and Reason as false."
))

# =================================================================================================
# 4. Craft Production & Procurement of Materials (Q41 - Q55)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Chanhudaro",
    ["Kalibangan", "Dholavira", "Rakhigarhi"],
    "A",
    "1. Chanhudaro is a tiny settlement (less than 7 hectares) almost exclusively devoted to craft production, including bead-making, shell-cutting, and seal-making.\nHence, Option {{CORR}} is correct.",
    "Identifies Chanhudaro as specialised craft production centre."
)
add_q(make_question(CHAPTER, "Craft Production", "Which small Harappan settlement (less than 7 hectares) was almost exclusively devoted to craft production, including bead-making and seal-making?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Nageshwar and Balakot",
    ["Harappa and Mohenjodaro", "Banawali and Kalibangan", "Ropar and Alamgirpur"],
    "B",
    "1. Both Nageshwar and Balakot are near the coast, specialized in making shell objects including bangles, ladles, and inlay.\nHence, Option {{CORR}} is correct.",
    "Identifies Nageshwar and Balakot for specialized shell production."
)
add_q(make_question(CHAPTER, "Craft Production", "Which two Harappan coastal settlements were specialized centres for the production of shell objects such as bangles, ladles, and inlay?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Chanhudaro, Lothal, and Dholavira",
    ["Kot Diji, Amri, and Sutkagen Dor", "Shortughai, Ropar, and Banawali", "Manda, Alamgirpur, and Daimabad"],
    "C",
    "1. Specialized drills used for bead-making have been discovered at Chanhudaro, Lothal, and more recently at Dholavira.\nHence, Option {{CORR}} is correct.",
    "Identifies sites where specialized bead drills were discovered."
)
add_q(make_question(CHAPTER, "Craft Production", "Specialized drills used in the manufacture of beads have been recovered from which group of Harappan sites?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Firing yellowish raw material and nodules at various stages of production",
    ["Dipping pebbles in powdered lapis lazuli dye", "Hammering raw copper sheets around wooden cores", "Soaking quartz crystals in glacial mountain springs"],
    "D",
    "1. The beautiful red color of carnelian was obtained by firing the yellowish raw material and beads at various stages of production.\nHence, Option {{CORR}} is correct.",
    "Explains how red color of carnelian was obtained through firing."
)
add_q(make_question(CHAPTER, "Craft Production", "How was the distinctive deep red color of carnelian beads produced by Harappan artisans?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Steatite",
    ["Granite", "Obsidian", "Flint"],
    "A",
    "1. Steatite, a very soft stone, was easily worked; some beads were molded from a paste made with steatite powder.\nHence, Option {{CORR}} is correct.",
    "Identifies steatite as soft stone used for micro-beads."
)
add_q(make_question(CHAPTER, "Craft Production", "Which very soft stone was easily worked to produce Harappan seals and micro-beads molded from powder paste?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Presence of raw materials, tools, unfinished objects, rejects, and waste flakes",
    ["Royal inscriptions engraved on stone victory steles", "Statues of factory owners holding account books", "Gold coins inscribed with guild trademarks"],
    "B",
    "1. Waste is one of the best indicators of craft work: discarded flakes, raw material pieces, and unfinished objects mark craft production centres.\nHence, Option {{CORR}} is correct.",
    "Identifies waste material and rejects as best indicator of craft centres."
)
add_q(make_question(CHAPTER, "Craft Production", "What constitutes the most reliable archaeological indicator used to identify craft production centres?", opts, corr, sol))

add_q(make_match_question(
    CHAPTER, "Procurement of Raw Materials",
    "Match the raw material in List I with its primary source region in List II:",
    [("A", "Copper"), ("B", "Lapis Lazuli"), ("C", "Carnelian"), ("D", "Gold")],
    [("i", "Shortughai (Afghanistan)"), ("ii", "Khetri region (Rajasthan)"), ("iii", "South India"), ("iv", "Bharuch (Gujarat)")],
    "A-ii, B-i, C-iv, D-iii",
    "C",
    "1. Copper came from Khetri in Rajasthan (A-ii), Lapis Lazuli from Shortughai (B-i), Carnelian from Bharuch (C-iv), Gold from South India (D-iii).",
    "Matches Harappan raw materials with their source regions."
))

opts, corr, sol = rotate_options(
    "Ganeshwar-Jodhpura culture",
    ["Jorwe culture", "Malwa culture", "Ahar-Banas culture"],
    "D",
    "1. In the Khetri area, archaeologists found evidence of the Ganeshwar-Jodhpura culture with distinctive non-Harappan pottery and an unusual wealth of copper objects.\nHence, Option {{CORR}} is correct.",
    "Identifies Ganeshwar-Jodhpura culture in Khetri copper region."
)
add_q(make_question(CHAPTER, "Procurement of Raw Materials", "The indigenous non-Harappan culture discovered by archaeologists in the copper-rich Khetri region of Rajasthan is known as the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Meluhha",
    ["Dilmun", "Magan", "Elam"],
    "A",
    "1. Mesopotamian texts refer to Meluhha as a land of seafarers, widely identified with the Harappan region.\nHence, Option {{CORR}} is correct.",
    "Identifies Meluhha as Mesopotamian name for Harappan region."
)
add_q(make_question(CHAPTER, "Contact with Distant Lands", "In Mesopotamian cuneiform texts, which region is referred to as a 'land of seafarers' and associated with Harappan trade?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dilmun was the island of Bahrain; Magan was Oman",
    ["Dilmun was Egypt; Magan was Greece", "Dilmun was Sri Lanka; Magan was Madagascar", "Dilmun was Rome; Magan was Persia"],
    "B",
    "1. Mesopotamian texts mention Dilmun (island of Bahrain), Magan (Oman), and Meluhha (Harappan region).\nHence, Option {{CORR}} is correct.",
    "Identifies Dilmun as Bahrain and Magan as Oman."
)
add_q(make_question(CHAPTER, "Contact with Distant Lands", "In the maritime trade network mentioned in Mesopotamian cuneiform texts, what modern regions do 'Dilmun' and 'Magan' correspond to?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Both Omani copper and Harappan artifacts have traces of nickel, suggesting a common origin",
    ["Both regions used identical cuneiform writing tablets", "Oman was ruled directly by Harappan military governors", "Omani gold mines bear Harappan seal stamps"],
    "C",
    "1. Chemical analysis shows that both Omani copper and Harappan artifacts have traces of nickel, indicating a shared geographical source of copper.\nHence, Option {{CORR}} is correct.",
    "Explains chemical evidence of nickel connecting Omani and Harappan copper."
)
add_q(make_question(CHAPTER, "Contact with Distant Lands", "What chemical evidence links the copper used in Harappan artifacts to the Arabian peninsula (Oman)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A thick black layer of clay preventing percolation of liquids, used for maritime transport",
    ["A metallic glaze made of molten bronze", "A waterproof coating of pine tree resin", "A layer of volcanic obsidian powder"],
    "D",
    "1. Distinctive Harappan jars coated with a thick layer of black clay have been found at Omani sites, designed to prevent percolation of liquids.\nHence, Option {{CORR}} is correct.",
    "Describes Harappan black-coated jar found in Oman."
)
add_q(make_question(CHAPTER, "Contact with Distant Lands", "A distinctive Harappan black-slipped jar found at sites in Oman was treated with:", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Seals and Communication",
    "Seals and sealings were used to facilitate long-distance trade and convey the identity of the sender.",
    "If a bag of goods arrived with its sealing intact, it meant that the bag had not been tampered with.",
    1, "A",
    "1. Both statements are accurate NCERT facts: wet clay with seal impressions verified sender identity and intact cargo.",
    "Confirms both statements are correct regarding Harappan seals."
))

add_q(make_sequence_question(
    CHAPTER, "Historiography of Harappan Discovery",
    "Arrange the following archaeologists and discoveries in chronological sequence:",
    [
        ("A", "John Marshall announces the discovery of the Indus Valley Civilisation to the world"),
        ("B", "Alexander Cunningham receives a Harappan seal from an Englishman but fails to recognize its antiquity"),
        ("C", "R.E.M. Wheeler becomes Director-General of ASI and brings military precision to excavations"),
        ("D", "Daya Ram Sahni discovers seals at Harappa")
    ],
    "B, D, A, C",
    "B",
    "1. Cunningham explored in the mid-19th c. (B); Daya Ram Sahni found seals in early 20th c. (D); Marshall announced the discovery in 1924 (A); Wheeler arrived in 1944 (C).",
    "Orders Harappan archaeological discoveries chronologically."
))

# =================================================================================================
# 5. Script, Weights, Authority & The End of Civilisation (Q56 - Q60)
# =================================================================================================

opts, corr, sol = rotate_options(
    "It remains undeciphered, was non-alphabetical with 375 to 400 signs, and was written from right to left",
    ["It was an alphabetical script identical to ancient Brahmi deciphered by Prinsep", "It consisted of exactly 26 Greek letters written from left to right", "It was a pictographic script containing over 5,000 Chinese ideograms"],
    "A",
    "1. The Harappan script remains undeciphered, had between 375 and 400 signs, and was written right to left (evidenced by wider spacing on the right).\nHence, Option {{CORR}} is correct.",
    "Summarizes characteristics of Harappan script."
)
add_q(make_question(CHAPTER, "Seals and Script", "Which of the following correctly describes the Harappan script?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Chert stone, cubical in shape, with no markings",
    ["Terracotta discs marked with roman numerals", "Cast copper spheres stamped with royal seals", "Carved soapstone cones with decimal markings"],
    "B",
    "1. Exchanges were regulated by a precise system of weights made of chert, generally cubical with no markings.\nHence, Option {{CORR}} is correct.",
    "Describes Harappan stone weights."
)
add_q(make_question(CHAPTER, "Weights", "Harappan weights were usually fashioned from which stone and in which geometric shape?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lower denominations were binary (1, 2, 4, 8, 16, 32, etc.) while higher denominations followed the decimal system",
    ["All weights followed the Roman duodecimal system exclusively", "Weights were randomly shaped without mathematical proportions", "Weights followed the sexagesimal system of ancient Babylon exclusively"],
    "C",
    "1. The lower denominations of Harappan weights were binary (1, 2, 4, 8, 16, 32 up to 12,800), while higher denominations followed the decimal system.\nHence, Option {{CORR}} is correct.",
    "Describes binary and decimal system of Harappan weights."
)
add_q(make_question(CHAPTER, "Weights", "The mathematical system governing Harappan weights was structured such that:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A stone statue discovered at Mohenjodaro, labelled so by analogy with Mesopotamian history",
    ["A gold figurine discovered in a burial pit at Lothal", "A life-size bronze statue guarding the Great Bath", "A terracotta seal depicting an armed general seated on a chariot"],
    "D",
    "1. A stone statue was labelled and continues to be known as the 'Priest-King' by analogy with Mesopotamian priest-kings.\nHence, Option {{CORR}} is correct.",
    "Identifies stone statue of Priest-King."
)
add_q(make_question(CHAPTER, "Ancient Authority", "The famous 'Priest-King' of the Indus Valley Civilisation refers to:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Climatic change, deforestation, excessive floods, and the drying up or shifting of rivers",
    ["Massive volcanic eruptions submerging all settlements under lava", "A sudden nuclear explosion caused by ancient technology", "An invasion of European sea explorers carrying smallpox"],
    "A",
    "1. Multiple causes have been put forward for the collapse: climatic change, deforestation, excessive floods, shifting/drying up of rivers, and overuse of the landscape.\nHence, Option {{CORR}} is correct.",
    "Identifies natural environmental factors for collapse of Harappan Civilisation."
)
add_q(make_question(CHAPTER, "The End of the Civilisation", "Which group of environmental factors is widely considered by archaeologists to have contributed to the collapse of the Mature Harappan Civilisation around 1800 BCE?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A figure seated cross-legged in a 'yogic' posture, sometimes surrounded by animals, regarded as a 'proto-Shiva'",
    ["An armed monarch riding an armored war chariot", "A multi-armed goddess holding a trident", "A Buddhist monk meditating under a bodhi tree"],
    "B",
    "1. The seal depicting a figure seated cross-legged in a yogic posture, surrounded by animals, has been interpreted by archaeologists as an early representation of 'proto-Shiva'.\nHence, Option {{CORR}} is correct.",
    "Describes the Proto-Shiva seal."
)
add_q(make_question(CHAPTER, "Religious Practices", "In Harappan religious iconography, the famous seal often interpreted as a depiction of 'proto-Shiva' shows:", opts, corr, sol))

# Verification of Unit 1
print(f"Total questions generated for Unit 1: {len(questions)}")
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"

out_path = "mock/history_units/unit1.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 60 questions to {out_path}!")
