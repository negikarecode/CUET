import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.geo_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, make_multi_statement_question,
    rotate_options, normalize_text, get_pyq_normalized_set
)

pyq_seen = get_pyq_normalized_set()
global_seen = set()

# Load already generated seen texts from part a1
for u in [1, 2, 3]:
    p = f"mock/geo_units/unit{u}.json"
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            for q in json.load(f):
                global_seen.add(normalize_text(q["questionText"]))

def validate_and_collect(q_list, target_seen):
    for q in q_list:
        norm = normalize_text(q["questionText"])
        if norm in target_seen:
            raise ValueError(f"Duplicate within unit: {q['questionText'][:80]}")
        if norm in global_seen:
            raise ValueError(f"Cross-unit duplicate: {q['questionText'][:80]}")
        if norm in pyq_seen:
            raise ValueError(f"PYQ duplicate: {q['questionText'][:80]}")
        target_seen.add(norm)
        global_seen.add(norm)
        assert len(q["options"]) == 4
        assert q["correctOption"] in ["A", "B", "C", "D"]
        assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
        assert q["detailedSolution"]

# =================================================================================================
# UNIT 4: Primary Activities (60 Questions)
# =================================================================================================
CHAPTER_U4 = "Primary Activities"
u4_qs = []
u4_seen = set()

def add_u4(q):
    u4_qs.append(q)

# Q1: Gathering high latitude
opts, c, s = rotate_options(
    "Northern Canada, northern Eurasia, and southern Chile",
    ["Great Plains of North America and Australian Downs", "Indo-Gangetic alluvial plains and Nile delta", "Amazon basin and Congo basin exclusively"],
    "A",
    "Gathering is practiced in two major zones: High latitude zones (Northern Canada, northern Eurasia, and southern Chile) and Low latitude zones (Amazon Basin, tropical Africa, Southeast Asian interiors).\nHence, Option {{CORR}} is correct.",
    "Correctly identifies the high-latitude gathering regions."
)
add_u4(make_question(CHAPTER_U4, "Hunting and Gathering", "Which of the following global regions represents the 'High Latitude Zone' where gathering is still practiced?", opts, c, s))

# Q2: Chicle and chewing gum
opts, c, s = rotate_options(
    "Zapote tree",
    ["Rubber tree (Hevea brasiliensis)", "Cinchona tree", "Eucalyptus tree"],
    "B",
    "The chewing gum is made from the milky juice called 'chicle', which is extracted from the bark of the zapote tree.\nHence, Option {{CORR}} is correct.",
    "Identifies the zapote tree as the source of chicle for chewing gum."
)
add_u4(make_question(CHAPTER_U4, "Gathering Products", "From which tree is the milky latex called 'chicle', used as the base for chewing gum, collected?", opts, c, s))

# Q3: Quinine extraction
opts, c, s = rotate_options(
    "Bark of the Cinchona tree",
    ["Leaves of the Zapote tree", "Roots of the Tea plant", "Sap of the Betel nut palm"],
    "C",
    "Quinine, an important anti-malarial drug, is dried and extracted from the bark of the Cinchona tree.\nHence, Option {{CORR}} is correct.",
    "Identifies Cinchona tree bark as the source of quinine."
)
add_u4(make_question(CHAPTER_U4, "Gathering Products", "The medicinal drug 'Quinine' used to treat malaria is gathered from which natural forest source?", opts, c, s))

# Q4: Nomadic Herding definition
opts, c, s = rotate_options(
    "A primitive subsistence activity where herders rely on animals for food, clothing, shelter, tools, and transport, moving seasonally",
    ["A high-tech capital intensive ranching system for global beef export", "Sedentary confinement of cattle in automated dairy stalls", "Annual round-up of wild deer for zoo exhibition"],
    "D",
    "Nomadic pastoralism or herding is a primitive subsistence activity in which the herders rely on animals for food, clothing, shelter, tools, and transport. They move from one place to another along with their livestock.\nHence, Option {{CORR}} is correct.",
    "Defines Nomadic Herding as a primitive subsistence pastoral activity."
)
add_u4(make_question(CHAPTER_U4, "Pastoralism", "What is the defining characteristic of 'Nomadic Herding' (Pastoral Nomadism)?", opts, c, s))

# Q5: Transhumance
opts, c, s = rotate_options(
    "Seasonal migration of pastoralists and their herds between summer pastures in high mountains and winter pastures in low valleys",
    ["Permanent migration of young villagers to metropolitan software parks", "Transfer of dairy cows from pasture to slaughterhouse", "Relocation of honey bees across commercial apple orchards"],
    "A",
    "Transhumance is the process of seasonal migration from plains to mountain pastures in summer and from mountain pastures to plains in winter (practiced by Gujjars, Bakarwals, Gaddis, and Bhotiyas in the Himalayas).\nHence, Option {{CORR}} is correct.",
    "Defines Transhumance as seasonal vertical pastoral migration."
)
add_u4(make_question(CHAPTER_U4, "Transhumance", "In pastoral geography, what does the term 'Transhumance' signify?", opts, c, s))

# Q6: Himalayan pastoral nomadic tribes
opts, c, s = rotate_options(
    "Gujjars, Bakarwals, Gaddis, and Bhotiyas",
    ["Santhals, Mundas, Oraons, and Hos", "Bhil, Mina, Sahariya, and Garasia", "Toda, Kota, Kurumba, and Badaga"],
    "B",
    "In the mountain regions of the Himalayas, pastoral tribes like Gujjars, Bakarwals, Gaddis, and Bhotiyas migrate from plains to the mountains in summer and to the plains in winter.\nHence, Option {{CORR}} is correct.",
    "Lists Himalayan pastoral tribes practicing transhumance."
)
add_u4(make_question(CHAPTER_U4, "Pastoral Communities", "Which of the following groups represents Himalayan pastoral communities practicing seasonal transhumance?", opts, c, s))

# Q7: Animals in Tundra pastoralism
opts, c, s = rotate_options(
    "Reindeer and Caribou",
    ["Camels and Horses", "Yaks and Llamas", "Cattle and Buffaloes"],
    "C",
    "In the cold sub-arctic and arctic Tundra regions of northern Europe and Siberia, nomadic herders rear reindeer and caribou.\nHence, Option {{CORR}} is correct.",
    "Identifies reindeer and caribou as the livestock of Tundra herders."
)
add_u4(make_question(CHAPTER_U4, "Pastoral Animals", "Which animals are predominantly reared by nomadic pastoralists in the arctic and sub-arctic Tundra regions?", opts, c, s))

# Q8: Commercial Livestock Rearing
opts, c, s = rotate_options(
    "Capital intensive, organized on permanent ranches, highly specialized in single animal types, and practiced for global commercial sale",
    ["Primitive subsistence movement of livestock without fenced ranches", "Dependent entirely on wild gathering without any veterinary care", "Confined exclusively to high Himalayan alpine glaciers"],
    "D",
    "Commercial livestock rearing is organized, capital-intensive, practiced on permanent ranches, and specializes in only one type of animal (cattle, sheep, horses, goats). Products like meat, wool, and hides are scientifically processed and exported.\nHence, Option {{CORR}} is correct.",
    "Describes the core features of commercial livestock rearing on permanent ranches."
)
add_u4(make_question(CHAPTER_U4, "Commercial Livestock Rearing", "How does 'Commercial Livestock Rearing' differ fundamentally from nomadic herding?", opts, c, s))

# Q9: Major Commercial Livestock Countries
opts, c, s = rotate_options(
    "New Zealand, Australia, Argentina, Uruguay, and the United States of America",
    ["Chad, Niger, Mali, and Sudan", "Norway, Sweden, Finland, and Iceland", "Nepal, Bhutan, Bangladesh, and Sri Lanka"],
    "A",
    "Important countries where commercial livestock rearing is practiced include New Zealand, Australia, Argentina, Uruguay, and the United States of America.\nHence, Option {{CORR}} is correct.",
    "Lists premier countries practicing commercial livestock ranching."
)
add_u4(make_question(CHAPTER_U4, "Commercial Livestock Rearing", "Which group of countries dominates global commercial livestock rearing on large scientific ranches?", opts, c, s))

# Q10: Shifting Cultivation names: Jhuming, Milpa, Ladang
opts, c, s = rotate_options(
    "Jhuming in North-East India, Milpa in Central America/Mexico, and Ladang in Malaysia/Indonesia",
    ["Jhuming in Mexico, Milpa in Indonesia, and Ladang in Assam", "Jhuming in Malaysia, Milpa in Assam, and Ladang in Mexico", "Jhuming in Brazil, Milpa in Argentina, and Ladang in Canada"],
    "B",
    "Shifting cultivation (slash-and-burn) is called Jhuming in North-East India, Milpa in Central America and Mexico, and Ladang in Malaysia and Indonesia.\nHence, Option {{CORR}} is correct.",
    "Correctly matches shifting cultivation names: Jhuming (NE India), Milpa (Central America), Ladang (Malaysia/Indonesia)."
)
add_u4(make_question(CHAPTER_U4, "Shifting Cultivation", "What are the local regional names of shifting cultivation in North-East India, Central America/Mexico, and Malaysia/Indonesia respectively?", opts, c, s))

# Q11: Primitive Subsistence Agriculture features
opts, c, s = rotate_options(
    "Use of primitive tools like sticks and hoes, slash-and-burn clearing of vegetation, and loss of soil fertility after 3-5 years",
    ["Heavy use of chemical fertilizers, tractors, and combine harvesters", "Perennial canal irrigation and automated sprinkler systems", "Production solely for export to international commodity markets"],
    "C",
    "Primitive subsistence agriculture relies on primitive tools like sticks and hoes, manual clearing by slashing and burning vegetation, reliance on rainfall, and shifting plots when soil fertility declines after 3 to 5 years.\nHence, Option {{CORR}} is correct.",
    "Lists classic features of primitive subsistence shifting agriculture."
)
add_u4(make_question(CHAPTER_U4, "Subsistence Agriculture", "Which of the following characteristics defines 'Primitive Subsistence Agriculture'?", opts, c, s))

# Q12: Intensive Subsistence: Wet Paddy Dominated
opts, c, s = rotate_options(
    "High population density, very small farm holdings, intensive family labor, high yield per unit area, but low yield per worker",
    ["Vast corporate estates of 10,000 hectares with minimal human labor", "Exclusive production of citrus fruits for wine distillation", "Low yield per unit area but massive surplus per laborer"],
    "D",
    "Intensive subsistence agriculture dominated by wet paddy is found in densely populated Monsoon Asia. Land holdings are tiny due to inheritance laws, manual family labor is intensive, fertilizers are farmyard manure, yield per unit area is high, but labor productivity is low.\nHence, Option {{CORR}} is correct.",
    "Explains characteristics of wet-paddy intensive subsistence farming."
)
add_u4(make_question(CHAPTER_U4, "Intensive Subsistence Farming", "What are the hallmark features of 'Intensive Subsistence Agriculture Dominated by Wet Paddy' in Monsoon Asia?", opts, c, s))

# Q13: Intensive Subsistence Dominated by Crops other than Paddy
opts, c, s = rotate_options(
    "Wheat, soya bean, barley, and sorghum in northern China, Manchuria, North Korea, and dry parts of western India",
    ["Rubber and cocoa in equatorial Amazonia", "Apples and cherries in southern Chile", "Tea and coffee in the British Isles"],
    "A",
    "In areas where relief, temperature, or rainfall does not permit wet paddy cultivation (northern China, Manchuria, North Korea, northern Japan, and dry western India), intensive subsistence agriculture focuses on wheat, soya bean, barley, and sorghum.\nHence, Option {{CORR}} is correct.",
    "Identifies crops and regions where intensive subsistence is dominated by crops other than paddy."
)
add_u4(make_question(CHAPTER_U4, "Intensive Subsistence Farming", "In which regions is intensive subsistence agriculture dominated by crops OTHER than paddy (such as wheat, barley, and soya bean) commonly practiced?", opts, c, s))

# Q14: Plantation Agriculture introducers
opts, c, s = rotate_options(
    "European colonial powers in tropical and sub-tropical colonies",
    ["Indigenous nomadic pastoral tribes in high alpine valleys", "Ancient Mesopotamian merchants in desert oases", "Modern Antarctic scientific research teams"],
    "B",
    "Plantation agriculture was introduced by the Europeans in colonies situated in the tropics. Some important plantation crops are tea, coffee, cocoa, rubber, cotton, oil palm, sugarcane, bananas, and pineapples.\nHence, Option {{CORR}} is correct.",
    "Attributes plantation agriculture to European colonial expansion in the tropics."
)
add_u4(make_question(CHAPTER_U4, "Plantation Agriculture", "Who introduced 'Plantation Agriculture' into tropical territories of the Americas, Africa, and Asia?", opts, c, s))

# Q15: Fazendas in Brazil
opts, c, s = rotate_options(
    "Large coffee plantations",
    ["Extensive wheat ranches", "Deep-sea tuna fishing harbors", "Underground emerald mining shafts"],
    "C",
    "In Brazil, large coffee plantations are traditionally called 'Fazendas', some of which are still managed by European corporate syndicates.\nHence, Option {{CORR}} is correct.",
    "Identifies Fazendas as large coffee plantations in Brazil."
)
add_u4(make_question(CHAPTER_U4, "Plantation Agriculture", "In Brazil, what are the large, extensive coffee plantations known as?", opts, c, s))

# Q16: European Plantation assignments
opts, c, s = rotate_options(
    "British set up tea in India/Sri Lanka and rubber in Malaysia; French established cocoa/coffee in West Africa; Dutch developed sugarcane in Indonesia",
    ["British set up banana plantations in Norway and Iceland", "French introduced cotton plantations to polar Greenland", "Dutch established rubber plantations exclusively in Switzerland"],
    "D",
    "The British set up large tea gardens in India and Sri Lanka, rubber plantations in Malaysia, and sugarcane in West Indies; the French established cocoa and coffee in West Africa; the Dutch once monopolized sugarcane in Indonesia.\nHence, Option {{CORR}} is correct.",
    "Correctly attributes colonial plantation crops to respective European imperial powers."
)
add_u4(make_question(CHAPTER_U4, "Plantation Agriculture", "Which statement accurately links European colonial powers to the specific plantation crops they established?", opts, c, s))

# Q17: Extensive Commercial Grain Farming regions
opts, c, s = rotate_options(
    "Eurasian steppes, North American prairies, Argentine pampas, South African velds, Australian downs, and Canterbury plains of New Zealand",
    ["Amazon basin, Congo basin, and Indonesian rain forests", "Sahara desert, Arabian peninsula, and Thar desert", "Deccan plateau, Tibetan plateau, and Ethiopian highlands"],
    "A",
    "Extensive commercial grain cultivation is practiced in the interior parts of semi-arid lands of the mid-latitudes: Eurasian steppes, North American prairies, Argentine pampas, South African velds, Australian downs, and Canterbury plains of New Zealand.\nHence, Option {{CORR}} is correct.",
    "Lists global temperate grassland regions of extensive commercial grain farming."
)
add_u4(make_question(CHAPTER_U4, "Commercial Grain Farming", "Which of the following groups includes the premier mid-latitude grassland regions of 'Extensive Commercial Grain Cultivation'?", opts, c, s))

# Q18: Commercial Grain Farming Characteristics
opts, c, s = rotate_options(
    "Wheat is the principal crop, farms are very large, operations are mechanized from plowing to harvesting, yield per acre is low but yield per person is very high",
    ["Farms are tiny, manual hand-weeding is universal, yield per acre is highest in the world, yield per person is zero", "Rice is grown under standing flood waters using draft bullocks", "Operations are strictly manual without any mechanical equipment"],
    "B",
    "In extensive commercial grain farming, wheat is the main crop. Farms are large (hundreds of hectares), plowing to harvesting is mechanized with combine harvesters. Low yield per acre but high yield per person is its hallmark.\nHence, Option {{CORR}} is correct.",
    "Explains extensive grain farming: mechanization, large size, low yield per acre, high yield per person."
)
add_u4(make_question(CHAPTER_U4, "Commercial Grain Farming", "What are the distinctive production characteristics of extensive commercial grain farming?", opts, c, s))

# Q19: Mixed Farming features
opts, c, s = rotate_options(
    "Equal emphasis on crop cultivation and animal husbandry, crop rotation, intercropping, and high capital investment in farm machinery",
    ["Exclusively growing maize without keeping any livestock", "Practicing shifting slash-and-burn farming in tropical rainforests", "Cultivating only flowers in glass greenhouses without soil"],
    "C",
    "Mixed farming is found in highly developed parts of the world. Farms are moderate in size, and equal emphasis is laid on crop cultivation and animal husbandry. Crops like wheat, barley, rye, oats, and fodder are grown alongside cattle, pigs, and sheep.\nHence, Option {{CORR}} is correct.",
    "Identifies the integration of crop cultivation and animal husbandry in Mixed Farming."
)
add_u4(make_question(CHAPTER_U4, "Mixed Farming", "Which statement accurately describes 'Mixed Farming' as practiced in North-Western Europe and Eastern North America?", opts, c, s))

# Q20: Dairy Farming regions
opts, c, s = rotate_options(
    "North-Western Europe, Canada, and South-Eastern Australia / New Zealand / Tasmania",
    ["Sahara desert, Gobi desert, and Kalahari desert", "Amazon basin, Congo basin, and Borneo island", "Tibetan plateau, Siberian tundra, and Greenland"],
    "D",
    "There are three main regions of commercial dairy farming: (1) North-Western Europe, (2) Canada, and (3) South-Eastern Australia, New Zealand, and Tasmania.\nHence, Option {{CORR}} is correct.",
    "Lists the three premier global belts of commercial dairy farming."
)
add_u4(make_question(CHAPTER_U4, "Dairy Farming", "What are the three premier geographical belts of commercial dairy farming in the world?", opts, c, s))

# Q21: Characteristics of Dairy Farming
opts, c, s = rotate_options(
    "Most advanced, highly capital-intensive, highly labor-intensive with no off-season, located near urban and industrial markets",
    ["Zero capital investment, strictly seasonal with nine months of complete inactivity", "Located thousands of miles away from urban centers in uninhabited deserts", "Relies entirely on wild hunting of bison"],
    "A",
    "Dairy farming is the most advanced and efficient type of livestock rearing. It is capital intensive (milking machines, sheds), labor intensive (feeding, milking year-round with no off-season), and located near urban markets.\nHence, Option {{CORR}} is correct.",
    "Highlights high capital/labor intensity and urban proximity in dairy farming."
)
add_u4(make_question(CHAPTER_U4, "Dairy Farming", "Why is commercial dairy farming described as the most advanced and capital-intensive form of animal rearing?", opts, c, s))

# Q22: Mediterranean Agriculture: Viticulture
opts, c, s = rotate_options(
    "Grape cultivation, where high-quality grapes are used for winemaking and inferior grapes are dried into raisins and sultanas",
    ["Cultivation of virgin olive trees for industrial jet lubricant", "Propagation of silk worms on white mulberry leaves", "Breeding of race horses for metropolitan derbies"],
    "B",
    "Viticulture or grape cultivation is a speciality of the Mediterranean region. Best quality grapes are used to make high-value wines, while inferior grapes are dried to produce raisins and sultanas.\nHence, Option {{CORR}} is correct.",
    "Defines Viticulture as specialized grape cultivation for wine and raisins."
)
add_u4(make_question(CHAPTER_U4, "Mediterranean Agriculture", "What is 'Viticulture', a hallmark speciality of Mediterranean agriculture?", opts, c, s))

# Q23: Mediterranean Agriculture Regions
opts, c, s = rotate_options(
    "Lands bordering the Mediterranean Sea in Europe/North Africa/Asia, southern California, central Chile, south-western South Africa, and south/south-western Australia",
    ["Scandinavian tundra, northern Siberia, and Alaskan interior", "Ganga-Brahmaputra delta, Irrawaddy delta, and Mekong delta", "Patagonian desert, Atacama desert, and Mojave desert"],
    "C",
    "Mediterranean agriculture is practiced in countries bordering the Mediterranean Sea, southern California, central Chile, south-western tip of South Africa, and southern and south-western parts of Australia.\nHence, Option {{CORR}} is correct.",
    "Identifies global regions sharing Mediterranean climate and agricultural practices."
)
add_u4(make_question(CHAPTER_U4, "Mediterranean Agriculture", "In which global regions outside the Mediterranean basin is 'Mediterranean Agriculture' prominently practiced?", opts, c, s))

# Q24: Market Gardening and Horticulture
opts, c, s = rotate_options(
    "Cultivation of high-value crops such as vegetables, fruits, and flowers solely for urban markets",
    ["Extensive broadcast sowing of coarse millets in rain-fed deserts", "Breeding of wool sheep on remote mountain plateaus", "Commercial forestry of coniferous softwoods in the taiga"],
    "D",
    "Market gardening and horticulture specializes in the cultivation of high-value crops such as vegetables, fruits, and flowers, solely for urban markets. Farms are small and located where transport links are excellent.\nHence, Option {{CORR}} is correct.",
    "Defines Market Gardening and Horticulture as urban-oriented high-value crop production."
)
add_u4(make_question(CHAPTER_U4, "Market Gardening", "What characterizes 'Market Gardening and Horticulture' in modern peri-urban farming?", opts, c, s))

# Q25: Truck Farming
opts, c, s = rotate_options(
    "Farming specializing only in vegetables, where the distance of farms from markets is governed by the distance a truck can cover overnight",
    ["Farming where heavy trucks are manufactured and repaired in farm workshops", "Transporting mining ores using dump trucks across deserts", "Mobile vegetable trucks selling fast food in entertainment parks"],
    "A",
    "The regions where farmers specialize in vegetables only, the farming is known as 'Truck Farming'. The name originates because the distance of the truck farm from the market is governed by the distance that a truck can travel overnight.\nHence, Option {{CORR}} is correct.",
    "Explains the origin and meaning of the term 'Truck Farming'."
)
add_u4(make_question(CHAPTER_U4, "Truck Farming", "Why is specialized peri-urban vegetable farming commonly referred to as 'Truck Farming'?", opts, c, s))

# Q26: Tulip cultivation country
opts, c, s = rotate_options(
    "Netherlands",
    ["Spain", "Greece", "Norway"],
    "B",
    "The Netherlands specializes in growing flowers and horticultural crops, especially tulips, which are flown to all major cities of Europe.\nHence, Option {{CORR}} is correct.",
    "Identifies the Netherlands as the world's premier tulip and flower cultivation hub."
)
add_u4(make_question(CHAPTER_U4, "Horticulture", "Which European country is globally famous for its specialized commercial cultivation and export of tulips and cut flowers?", opts, c, s))

# Q27: Factory Farming
opts, c, s = rotate_options(
    "Rearing poultry and cattle in stalls and pens, fed on manufactured feedstuffs and carefully monitored under disease-free conditions",
    ["Building automotive assembly lines in the middle of cornfields", "Growing cotton inside textile spinning mills", "Manual harvesting of sugarcane by factory laborers"],
    "C",
    "In industrial regions of Western Europe and North America, 'Factory Farming' rears livestock, particularly poultry and cattle, in stalls and pens. They are fed on manufactured feedstuff and carefully monitored for disease.\nHence, Option {{CORR}} is correct.",
    "Defines Factory Farming as intensive indoor pen/stall rearing of livestock."
)
add_u4(make_question(CHAPTER_U4, "Factory Farming", "What does the term 'Factory Farming' mean in contemporary agricultural geography?", opts, c, s))

# Q28: Cooperative Farming success country
opts, c, s = rotate_options(
    "Denmark",
    ["United States of America", "Soviet Union", "Brazil"],
    "D",
    "Cooperative farming has been the most successful in Denmark, where practically every single farmer is a member of a cooperative. It has also succeeded in the Netherlands, Belgium, Sweden, and Italy.\nHence, Option {{CORR}} is correct.",
    "Identifies Denmark as the most successful nation in cooperative farming."
)
add_u4(make_question(CHAPTER_U4, "Cooperative Farming", "In which country has 'Cooperative Farming' achieved its greatest success, with practically every farmer enrolled as a cooperative member?", opts, c, s))

# Q29: Collective Farming (Kolkhoz)
opts, c, s = rotate_options(
    "Former Soviet Union (USSR)",
    ["Federal Republic of Germany", "United Kingdom", "Japan"],
    "A",
    "The concept of Collective Farming or the 'Kolkhoz' model was introduced in the former Soviet Union to improve agricultural efficiency and make the country self-sufficient in food by pooling land, labor, and cattle.\nHence, Option {{CORR}} is correct.",
    "Associates the Kolkhoz collective farming model with the former Soviet Union."
)
add_u4(make_question(CHAPTER_U4, "Collective Farming", "In which country was the system of collective farming known as 'Kolkhoz' introduced after the socialist revolution?", opts, c, s))

# Q30: Mining Methods: Open-cast vs Underground
opts, c, s = rotate_options(
    "Open-cast mining is used for minerals near the surface and is cheaper, while Underground (shaft) mining is used for deep deposits and involves safety hazards",
    ["Open-cast mining uses vertical lifts, while shaft mining uses open bulldozers", "Open-cast mining is restricted to diamonds, while shaft mining is used only for river sand", "Both methods are identical and require no machinery"],
    "B",
    "Open-cast (surface) mining is the easiest and cheapest way of mining minerals lying close to the surface. Shaft (underground) mining is required when the ore lies deep below the surface, requiring lifts, ventilation, and carrying risks of poisonous gases, fire, and cave-ins.\nHence, Option {{CORR}} is correct.",
    "Distinguishes open-cast (surface) mining from underground shaft mining."
)
add_u4(make_question(CHAPTER_U4, "Mining Methods", "What is the primary difference between 'Open-Cast (Surface) Mining' and 'Shaft (Underground) Mining'?", opts, c, s))

# Q31: Match Agricultural Systems with Typical Regions
add_u4(make_match_question(
    CHAPTER_U4, "Agricultural Systems",
    "Match List I (Agricultural System) with List II (Characteristic Region):",
    [("A", "Mediterranean Agriculture"), ("B", "Extensive Commercial Grain Farming"), ("C", "Dairy Farming"), ("D", "Plantation Agriculture")],
    [("I", "North-Western Europe and New Zealand"), ("II", "Central Chile and Southern California"), ("III", "Eurasian Steppes and North American Prairies"), ("IV", "Tropical colonies in Sri Lanka and Malaysia")],
    "A-II, B-III, C-I, D-IV", "C",
    "Mediterranean agriculture is in Central Chile/California (II); Extensive grain farming is in Steppes/Prairies (III); Dairy farming is in NW Europe/New Zealand (I); Plantation is in tropical Sri Lanka/Malaysia (IV).",
    "Matches agricultural typologies with their prominent geographic locations."
))

# Q32: Match Local Shifting Cultivation Names
add_u4(make_match_question(
    CHAPTER_U4, "Shifting Cultivation Nomenclature",
    "Match List I (Local Term for Shifting Cultivation) with List II (Country / Region):",
    [("A", "Jhuming"), ("B", "Milpa"), ("C", "Ladang"), ("D", "Roka")],
    [("I", "Central America and Mexico"), ("II", "North-East India"), ("III", "Brazil"), ("IV", "Malaysia and Indonesia")],
    "A-II, B-I, C-IV, D-III", "D",
    "Jhuming is in North-East India (II); Milpa is in Central America/Mexico (I); Ladang is in Malaysia/Indonesia (IV); Roka is in Brazil (III).",
    "Matches local names of shifting agriculture to respective world regions."
))

# Q33: Statement on Open-cast vs Shaft Mining
add_u4(make_statement_question(
    CHAPTER_U4, "Mining Hazards",
    "Open-cast mining carries severe occupational hazards of toxic gas asphyxiation and roof collapse.",
    "Shaft mining requires specialized vertical lifts, haulage vehicles, and air ventilation systems.",
    4, "A",
    "Statement I is false: toxic gases, flooding, and roof collapse are hazards of deep shaft (underground) mining, not open-cast mining. Statement II is correct: shaft mining requires elaborate vertical lifts and ventilation.",
    "Contrasts the technological and safety profiles of open-cast and shaft mining."
))

# Q34: Assertion-Reason on Dairy Farming Location
add_u4(make_assertion_question(
    CHAPTER_U4, "Dairy Farming Location",
    "Commercial dairy farming is predominantly located in close proximity to major urban and industrial conurbations.",
    "Milk and fresh dairy products are highly perishable goods requiring rapid delivery to large consumer markets.",
    1, "B",
    "Both Assertion and Reason are true, and Reason correctly explains the Assertion. The perishability of fresh milk necessitates that commercial dairy farms be positioned near urban consuming centres with rapid refrigerated transport.",
    "Explains the urban market orientation of dairy farming."
))

# Q35: Multi-statement on Nomadic Pastoralism
add_u4(make_multi_statement_question(
    CHAPTER_U4, "Nomadic Pastoralism",
    "Which of the following statements about nomadic pastoralism are correct?",
    [
        ("A", "Nomadic herders move from one place to another along with their livestock on defined territories."),
        ("B", "In the Sahara and Asiatic deserts, sheep, goats, and camels are the primary animals reared."),
        ("C", "In mountainous areas of Tibet and Andes, yaks and llamas are reared."),
        ("D", "Nomadic pastoralists operate highly automated industrial slaughterhouses on permanent ranches.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "C",
    "Statements A, B, and C are correct facts about nomadic pastoralism. Statement D is false because permanent ranches and industrial slaughterhouses belong to commercial livestock rearing, not nomadic herding.",
    "Identifies true characteristics of nomadic pastoralism and eliminates commercial ranching distractors."
))

# Q36: Co-operative Farming Principle
opts, c, s = rotate_options(
    "Farmers pool their resources voluntarily while retaining individual ownership of their agricultural lands",
    ["State forcibly confiscates all private land without compensation", "Farmers are legally forbidden from selling their harvested produce", "Only landless industrial factory workers are permitted to farm"],
    "D",
    "A group of farmers form a co-operative society by pooling their resources voluntarily for more efficient and profitable farming. Individual farms remain intact and farming is a matter of cooperative initiative.\nHence, Option {{CORR}} is correct.",
    "Clarifies that cooperative farming maintains private individual land ownership."
)
add_u4(make_question(CHAPTER_U4, "Cooperative Farming", "What is the foundational organizational principle of 'Co-operative Farming'?", opts, c, s))

# Q37: Gathering in Low Latitude Zones
opts, c, s = rotate_options(
    "Amazon Basin, tropical Africa, Northern fringe of Australia, and interior parts of Southeast Asia",
    ["Scandinavian fjords, Siberian tundra, and Iceland", "Canterbury plains of New Zealand and Australian downs", "Pampas of Argentina and Prairies of Canada"],
    "A",
    "Low latitude gathering is practiced in the Amazon Basin, tropical Africa, Northern fringe of Australia, and interior parts of Southeast Asia.\nHence, Option {{CORR}} is correct.",
    "Lists low-latitude equatorial gathering belts."
)
add_u4(make_question(CHAPTER_U4, "Gathering", "Which of the following regions constitutes the 'Low Latitude Zone' of primitive gathering?", opts, c, s))

# Q38: Why Gathering has little chance of becoming global
opts, c, s = rotate_options(
    "Synthetic and manufactured substitutes often of better quality and lower price have replaced many natural forest products",
    ["Forest gatherers refuse to accept international paper currency", "All forest trees have been completely cut down globally", "Gatherers have formed a global military cartel controlling all trade"],
    "B",
    "Gathering has little chance of becoming important at the global level because products gathered from nature cannot compete with synthetic products often of better quality and lower prices manufactured in factories.\nHence, Option {{CORR}} is correct.",
    "Explains that synthetic industrial substitutes outcompete natural gathered forest products."
)
add_u4(make_question(CHAPTER_U4, "Gathering in Modern World", "Why does primitive forest gathering have little chance of becoming a major commercial trade at the global level?", opts, c, s))

# Q39: Pastoral nomadism decline reasons
opts, c, s = rotate_options(
    "Imposition of political boundaries and new settlement plans by national governments",
    ["Complete disappearance of all pasture grasses worldwide", "Mandatory conversion of all pastoralists into commercial pilots", "Zero market demand for animal meat and wool globally"],
    "C",
    "The number of pastoral nomads has been decreasing and the areas operated by them shrinking due to: (1) Imposition of political boundaries, and (2) New settlement plans by different countries.\nHence, Option {{CORR}} is correct.",
    "Identifies political boundaries and state settlement policies as reasons for declining pastoral nomadism."
)
add_u4(make_question(CHAPTER_U4, "Nomadic Pastoralism Decline", "What are the two primary reasons for the steady decline in the numbers of pastoral nomads globally?", opts, c, s))

# Q40: Kolkhoz organization
opts, c, s = rotate_options(
    "Farmers pooled land, livestock, and labor, were assigned yearly production targets, and were allowed small private plots for personal use",
    ["Farmers operated purely as independent feudal landlords owning 500 slaves each", "All crops were burned annually as religious sacrifice", "Farming was conducted exclusively by foreign imported robots"],
    "D",
    "In Kolkhoz collective farms, members pooled resources, worked collectively, were paid according to work performed, and delivered fixed quotas to the state at fixed prices, while retaining small private plots for domestic food.\nHence, Option {{CORR}} is correct.",
    "Explains the operational structure of the Kolkhoz collective farm."
)
add_u4(make_question(CHAPTER_U4, "Collective Farming", "How was the 'Kolkhoz' collective farm system structured in the Soviet Union?", opts, c, s))

# Q41: Market Gardening in Netherlands
opts, c, s = rotate_options(
    "Cut flowers like tulips, cultivated under glasshouses and exported across Europe",
    ["Low-grade feed barley cultivated on extensive dry ranches", "Rubber and oil palm harvested from tropical swamps", "Extensive commercial wheat harvested by combine harvesters"],
    "A",
    "Netherlands is globally renowned for specialized market gardening of flowers, especially tulips, grown under climate-controlled glasshouses and flown daily to European capitals.\nHence, Option {{CORR}} is correct.",
    "Highlights Dutch greenhouse flower cultivation and export."
)
add_u4(make_question(CHAPTER_U4, "Horticulture", "What is the primary export commodity of the highly sophisticated Dutch horticultural sector?", opts, c, s))

# Q42: Intensive subsistence high yield per unit area
opts, c, s = rotate_options(
    "Very high per unit area, but low per labor unit due to heavy population pressure on land",
    ["Extremely low per unit area, but infinite per labor unit", "Zero per unit area because crops fail every alternate season", "Identical to extensive wheat farming in Canada"],
    "B",
    "In intensive subsistence agriculture, yield per unit of land is very high because every inch of soil is carefully tended, but yield per worker is low because a very large family labor force works on small plots.\nHence, Option {{CORR}} is correct.",
    "Explains high land yield vs low worker productivity in intensive subsistence farming."
)
add_u4(make_question(CHAPTER_U4, "Intensive Subsistence Farming", "How does agricultural productivity compare in 'Intensive Subsistence Farming' between yield per unit of land and yield per worker?", opts, c, s))

# Q43: Shifting cultivation environmental impact
opts, c, s = rotate_options(
    "Deforestation, soil erosion, and loss of topsoil when rotation cycles become too short",
    ["Massive urban smog and industrial acid rain", "Rapid accumulation of radioactive nuclear waste", "Freezing of underground water aquifers"],
    "C",
    "When population pressure forces farmers to shorten the fallow cycle in shifting cultivation, the forest cannot regenerate, leading to severe deforestation, soil erosion, and land degradation.\nHence, Option {{CORR}} is correct.",
    "Identifies soil erosion and deforestation caused by shortened shifting cultivation cycles."
)
add_u4(make_question(CHAPTER_U4, "Shifting Cultivation Impact", "What major ecological problem arises when the fallow period in shifting cultivation is drastically shortened?", opts, c, s))

# Q44: Viticulture climatic condition
opts, c, s = rotate_options(
    "Warm, dry summers and mild, rainy winters with abundant sunshine during the fruit ripening period",
    ["Perennial sub-zero blizzards and six months of polar night", "Continuous daily torrential tropical thunderstorms with 100% cloud cover", "Extreme continental winters with temperatures dropping to -50°C"],
    "D",
    "Grapes require the classic Mediterranean climate: mild wet winters and warm dry sunny summers that allow the sugars in grapes to concentrate properly for premium winemaking.\nHence, Option {{CORR}} is correct.",
    "Specifies Mediterranean climatic conditions essential for high-quality viticulture."
)
add_u4(make_question(CHAPTER_U4, "Mediterranean Agriculture", "Which climatic regime is uniquely suited for specialized viticulture (grape cultivation)?", opts, c, s))

# Q45: Mixed farming livestock
opts, c, s = rotate_options(
    "Cattle, sheep, pigs, and poultry",
    ["Reindeer and polar bears", "Elephants and rhinos", "Wild tigers and leopards"],
    "A",
    "In mixed farming, animals like cattle (for beef and milk), sheep (wool and mutton), pigs, and poultry are reared alongside crop cultivation, providing significant farm income.\nHence, Option {{CORR}} is correct.",
    "Lists the livestock reared in mixed farming systems."
)
add_u4(make_question(CHAPTER_U4, "Mixed Farming", "Which animals constitute the main livestock reared in mixed farming systems of Europe and North America?", opts, c, s))

# Q46: Extensive grain farming crop
opts, c, s = rotate_options(
    "Wheat",
    ["Rubber", "Coffee", "Jute"],
    "B",
    "Wheat is the principal crop grown in extensive commercial grain farming, although corn, barley, oats, and rye are also grown in smaller quantities.\nHence, Option {{CORR}} is correct.",
    "Identifies wheat as the principal crop of extensive commercial grain farming."
)
add_u4(make_question(CHAPTER_U4, "Commercial Grain Farming", "What is the principal crop cultivated in extensive commercial grain farming across the mid-latitude grasslands?", opts, c, s))

# Q47: Canterbury plains location
opts, c, s = rotate_options(
    "New Zealand",
    ["South Africa", "Argentina", "Australia"],
    "C",
    "The Canterbury plains are located in New Zealand, recognized as a premier region for extensive commercial grain cultivation and livestock rearing.\nHence, Option {{CORR}} is correct.",
    "Locates the Canterbury plains in New Zealand."
)
add_u4(make_question(CHAPTER_U4, "Grassland Regions", "The 'Canterbury Plains', renowned for commercial grain farming, are situated in which country?", opts, c, s))

# Q48: Velds location
opts, c, s = rotate_options(
    "South Africa",
    ["Australia", "Canada", "Kazakhstan"],
    "D",
    "The temperate grassland region known as the 'Velds' is located in South Africa.\nHence, Option {{CORR}} is correct.",
    "Identifies South Africa as the location of the Velds."
)
add_u4(make_question(CHAPTER_U4, "Grassland Regions", "In which country is the temperate grassland region called the 'Velds' situated?", opts, c, s))

# Q49: Downs location
opts, c, s = rotate_options(
    "Australia",
    ["Argentina", "Russia", "United States"],
    "A",
    "The temperate grasslands of Australia are called the 'Downs', famous for mechanized wheat cultivation and merino sheep rearing.\nHence, Option {{CORR}} is correct.",
    "Identifies Australia as the location of the Downs."
)
add_u4(make_question(CHAPTER_U4, "Grassland Regions", "Which country contains the extensive temperate agricultural grassland known as the 'Downs'?", opts, c, s))

# Q50: Pampas location
opts, c, s = rotate_options(
    "Argentina and Uruguay",
    ["Canada and USA", "South Africa and Namibia", "New Zealand and Australia"],
    "B",
    "The 'Pampas' are fertile temperate grasslands located in Argentina and Uruguay, central to commercial grain farming and cattle ranching.\nHence, Option {{CORR}} is correct.",
    "Identifies Argentina and Uruguay as the home of the Pampas."
)
add_u4(make_question(CHAPTER_U4, "Grassland Regions", "The 'Pampas' grassland belt is located in which South American countries?", opts, c, s))

# Q51: Match Grasslands with Countries
add_u4(make_match_question(
    CHAPTER_U4, "Temperate Grasslands",
    "Match List I (Temperate Grassland) with List II (Country / Continent):",
    [("A", "Prairies"), ("B", "Steppes"), ("C", "Pampas"), ("D", "Velds")],
    [("I", "Eurasia (Russia / Ukraine)"), ("II", "North America (USA / Canada)"), ("III", "South Africa"), ("IV", "Argentina")],
    "A-II, B-I, C-IV, D-III", "C",
    "Prairies are in North America (II); Steppes are in Eurasia (I); Pampas are in Argentina (IV); Velds are in South Africa (III).",
    "Correctly matches world temperate grasslands with their respective geographical territories."
))

# Q52: Statement on Plantation Farming Estate Management
add_u4(make_statement_question(
    CHAPTER_U4, "Plantation Agriculture",
    "Plantation agriculture involves large estates, single crop specialization, capital-intensive inputs, and managerial supervision.",
    "Plantation agriculture relies exclusively on barter exchange within small remote village markets.",
    3, "D",
    "Statement I is correct: plantations feature large corporate landholdings, monoculture, and scientific management. Statement II is false: plantations are export-oriented commercial enterprises integrated into global shipping networks.",
    "Analyzes the commercial and corporate estate structure of plantation agriculture."
))

# Q53: Assertion-Reason on Shifting Cultivation Soil Fertility
add_u4(make_assertion_question(
    CHAPTER_U4, "Shifting Cultivation",
    "In shifting cultivation, farmers abandon the cultivated clearing after 3 to 5 years and clear a new patch in the forest.",
    "Tropical forest soils lose their natural fertility rapidly through intense leaching under heavy rainfall and continuous crop nutrient extraction.",
    1, "A",
    "Both Assertion and Reason are true, and Reason is the correct explanation. In wet tropical zones, burning biomass adds ash nutrients that deplete in 3-5 years due to leaching and harvests, prompting cultivators to shift.",
    "Explains the ecological rationale behind periodic plot abandonment in shifting cultivation."
))

# Q54: Dairy products: butter and cheese
opts, c, s = rotate_options(
    "Extensive development of refrigeration, pasteurisation, and refrigerated transport systems",
    ["Freezing the milk in outdoor snowdrifts during polar blizzards", "Banning all trade between neighboring districts", "Transporting milk exclusively on camel backs across desert dunes"],
    "B",
    "The development of transportation, refrigeration, pasteurisation, and other preservation processes has allowed dairy products like butter, cheese, and milk powder to be stored and traded over vast global distances.\nHence, Option {{CORR}} is correct.",
    "Identifies refrigeration and pasteurization as drivers of the global dairy trade."
)
add_u4(make_question(CHAPTER_U4, "Dairy Farming Technology", "What technological innovations enabled dairy products to be preserved and transported across international markets?", opts, c, s))

# Q55: Deep-sea fishing primary activity
opts, c, s = rotate_options(
    "Primary activity",
    ["Secondary activity", "Tertiary activity", "Quaternary activity"],
    "C",
    "Fishing, like hunting, gathering, pastoralism, agriculture, forestry, and mining, extracts resources directly from the earth and is categorized as a Primary Activity.\nHence, Option {{CORR}} is correct.",
    "Categorizes commercial deep-sea fishing as a primary activity."
)
add_u4(make_question(CHAPTER_U4, "Activity Classification", "Commercial deep-sea marine fishing is categorized under which sector of economic activities?", opts, c, s))

# Q56: Open-cast mining overburden
opts, c, s = rotate_options(
    "The layer of useless topsoil and rock that must be stripped away to expose mineral ore",
    ["The excessive profits earned by mining shareholders", "The toxic smoke emitted by coal-fired thermal generators", "The weight of gold bullion stored in federal bank vaults"],
    "D",
    "In open-cast or strip mining, 'overburden' refers to the rock, soil, and ecosystem overlying the mineral deposit that must be excavated and removed to access the ore.\nHence, Option {{CORR}} is correct.",
    "Defines 'overburden' in surface open-cast mining."
)
add_u4(make_question(CHAPTER_U4, "Mining Terminology", "In open-cast surface mining, what does the term 'Overburden' refer to?", opts, c, s))

# Q57: Red Collar Workers
opts, c, s = rotate_options(
    "Workers engaged in primary activities, reflecting the outdoor nature of their physical labor",
    ["White collar corporate software managers", "Blue collar factory assembly technicians", "Gold collar prime ministerial policy advisers"],
    "A",
    "People engaged in primary activities are called 'Red Collar Workers' due to the outdoor nature of their work.\nHence, Option {{CORR}} is correct.",
    "Identifies primary sector laborers as 'Red Collar Workers'."
)
add_u4(make_question(CHAPTER_U4, "Labor Classification", "Workers engaged in primary economic activities are commonly designated by which collar color code?", opts, c, s))

# Q58: Sequence of Agricultural Revolutions
add_u4(make_sequence_question(
    CHAPTER_U4, "Agricultural History",
    "Arrange the following stages of human subsistence in historical chronological sequence:",
    [("A", "Plantation and Commercial Grain Agriculture"), ("B", "Hunting and Gathering"), ("C", "Pastoralism (Nomadic Herding)"), ("D", "Primitive Subsistence (Shifting) Agriculture")],
    "B, C, D, A", "B",
    "1. Hunting and gathering was the earliest human subsistence stage (B).\n2. Pastoralism emerged next with animal domestication (C).\n3. Primitive shifting agriculture developed with plant domestication (D).\n4. Modern commercial plantation and grain farming arose in colonial and modern eras (A).",
    "Sequences the historical evolution of human agricultural and subsistence systems."
))

# Q59: Market gardening intensive use of capital
opts, c, s = rotate_options(
    "Expensive greenhouses, artificial heating in cold regions, high-cost hybrid seeds, and rapid refrigerated transport",
    ["Purchasing 50,000 hectares of desert sand for wild buffaloes", "Building trans-oceanic oil tankers", "Constructing nuclear submarines for coastal patrols"],
    "C",
    "Market gardening demands heavy capital investment in greenhouses, irrigation, high-yield seeds, fertilizers, insecticides, and specialized transport vans.\nHence, Option {{CORR}} is correct.",
    "Explains the heavy capital expenditure required in peri-urban market gardening."
)
add_u4(make_question(CHAPTER_U4, "Market Gardening", "Why does market gardening require substantial capital investment despite occupying relatively small land acreage?", opts, c, s))

# Q60: Gathering vs Commercial Logging
opts, c, s = rotate_options(
    "Gathering collects non-timber forest products without felling the forest, while commercial logging cuts timber for wood and paper pulp",
    ["Gathering cuts down entire trees for export, while logging collects only fallen leaves", "Both terms are identical and mean planting urban ornamental trees", "Gathering is done only in Antarctic ice sheets, while logging is done in deserts"],
    "D",
    "Gathering involves extracting leaves, bark, nuts, medicinal herbs, and resins from standing forests. Logging is the commercial felling of trees for timber, firewood, and paper pulp.\nHence, Option {{CORR}} is correct.",
    "Accurately differentiates non-destructive forest gathering from commercial logging."
)
add_u4(make_question(CHAPTER_U4, "Forest Activities", "How does primitive forest gathering differ from commercial forestry and logging?", opts, c, s))

validate_and_collect(u4_qs, u4_seen)
assert len(u4_qs) == 60
with open("mock/geo_units/unit4.json", "w", encoding="utf-8") as f:
    json.dump(u4_qs, f, indent=2, ensure_ascii=False)
print("Unit 4 generated: 60 questions")

# =================================================================================================
# UNIT 5: Secondary Activities (60 Questions)
# =================================================================================================
CHAPTER_U5 = "Secondary Activities"
u5_qs = []
u5_seen = set()

def add_u5(q):
    u5_qs.append(q)

# Q1: Secondary activities definition
opts, c, s = rotate_options(
    "Add value to natural resources by transforming raw materials into valuable finished products",
    ["Extract minerals directly from the earth's crust without processing", "Provide personal barber and legal services to consumers", "Collect scientific meteorological data using orbital satellites"],
    "A",
    "Secondary activities add value to natural resources by transforming raw materials into valuable products. Secondary activities, therefore, are concerned with manufacturing, processing, and construction industries.\nHence, Option {{CORR}} is correct.",
    "Defines secondary activities as adding value by transforming raw materials into finished goods."
)
add_u5(make_question(CHAPTER_U5, "Secondary Activities Concept", "What is the defining economic function of 'Secondary Activities' in human geography?", opts, c, s))

# Q2: Footloose Industries
opts, c, s = rotate_options(
    "Industries that can be located in a wide variety of places, do not depend on any specific raw material, and produce in small quantities with accessible road links",
    ["Heavy iron and steel blast furnaces located exclusively on coalfield pits", "Industries that manufacture footwear and leather shoes exclusively", "Cottage handloom spinning units operating in rural tribal huts"],
    "B",
    "Footloose industries can be located in a wide variety of places. They are not dependent on any specific raw material (weight-losing or otherwise). They largely depend on component parts, produce in small quantities, and employ a small labor force.\nHence, Option {{CORR}} is correct.",
    "Defines Footloose Industries as non-resource-tied, mobile manufacturing with component assembly."
)
add_u5(make_question(CHAPTER_U5, "Footloose Industries", "What are 'Footloose Industries' in industrial geography?", opts, c, s))

# Q3: Household / Cottage Industry
opts, c, s = rotate_options(
    "Smallest manufacturing unit, using locally available raw materials, simple tools, family labor, and producing for local consumption",
    ["Massive automated industrial complexes employing 20,000 engineers", "High-tech pharmaceutical laboratories operating clean rooms", "Shipbuilding dry docks producing trans-oceanic oil tankers"],
    "C",
    "Cottage or household manufacturing is the smallest manufacturing unit. The artisans use local raw materials and simple tools to produce everyday goods in their homes with the help of their family members.\nHence, Option {{CORR}} is correct.",
    "Describes household/cottage manufacturing: smallest unit, local materials, family labor."
)
add_u5(make_question(CHAPTER_U5, "Scale of Manufacturing", "Which of the following describes 'Cottage or Household Industry'?", opts, c, s))

# Q4: Small Scale Industry
opts, c, s = rotate_options(
    "Uses local raw materials, simple power-driven machines, semi-skilled labor, and provides significant employment in developing countries",
    ["Operates completely without any electricity or mechanical power", "Employs tens of thousands of workers per plant with global stock listings", "Requires billions of dollars in foreign direct investment"],
    "D",
    "Small scale manufacturing uses local raw materials, simple power-driven machines, and semi-skilled labor. It provides employment and raises local purchasing power, especially in developing countries like India, China, and Brazil.\nHence, Option {{CORR}} is correct.",
    "Identifies features of small-scale manufacturing: power-driven machines, semi-skilled labor, local materials."
)
add_u5(make_question(CHAPTER_U5, "Scale of Manufacturing", "What distinguishes 'Small Scale Manufacturing' from cottage industry?", opts, c, s))

# Q5: Large Scale Manufacturing features
opts, c, s = rotate_options(
    "Mass production, specialized machinery, advanced division of labor, large capital investment, and global distribution networks",
    ["Exclusive reliance on barter exchange in weekly periodic village markets", "Production solely inside the living room of a single family artisan", "Complete absence of management hierarchy or financial accounting"],
    "A",
    "Large scale manufacturing involves a large market, various raw materials, enormous energy, specialized workers, advanced technology, assembly-line mass production, and large capital.\nHence, Option {{CORR}} is correct.",
    "Lists key features of large-scale manufacturing: mass production, division of labor, large capital."
)
add_u5(make_question(CHAPTER_U5, "Scale of Manufacturing", "Which set of characteristics defines 'Large Scale Manufacturing'?", opts, c, s))

# Q6: Agro-based Industries
opts, c, s = rotate_options(
    "Food processing, sugar, tea, coffee, cotton textiles, jute, and vegetable oil",
    ["Iron and steel smelting, copper refining, and cement manufacturing", "Plastics, synthetic rubber, and chemical fertilizers", "Paper pulp, timber sawmills, and natural lac"],
    "B",
    "Agro-based industries involve the processing of agricultural raw materials into food and other commercial products: food processing, sugar, pickles, fruit juices, beverages (tea, coffee, cocoa), spices, and textiles.\nHence, Option {{CORR}} is correct.",
    "Lists major agro-based industries utilizing farm produce."
)
add_u5(make_question(CHAPTER_U5, "Industry Classification: Inputs", "Which of the following groups consists exclusively of 'Agro-based Industries'?", opts, c, s))

# Q7: Mineral-based: Ferrous vs Non-ferrous
opts, c, s = rotate_options(
    "Ferrous industries process iron and steel containing iron, while Non-ferrous industries process aluminium, copper, and zinc",
    ["Ferrous industries process forest timber, while non-ferrous process ocean fish", "Ferrous industries process agricultural wheat, while non-ferrous process dairy milk", "Both are identical and refer exclusively to plastic polymer synthesis"],
    "C",
    "Mineral-based industries are divided into Ferrous (those using iron ore, like iron and steel industries) and Non-ferrous (those using minerals that do not contain iron, such as aluminium, copper, and zinc).\nHence, Option {{CORR}} is correct.",
    "Differentiates ferrous (iron-containing) from non-ferrous mineral industries."
)
add_u5(make_question(CHAPTER_U5, "Industry Classification: Inputs", "How are mineral-based industries categorized into 'Ferrous' and 'Non-Ferrous' groups?", opts, c, s))

# Q8: Chemical-based Industries
opts, c, s = rotate_options(
    "Petrochemicals, synthetic fibres, plastics, chemical fertilisers, and pharmaceuticals",
    ["Cotton spinning, wool weaving, and silk sericulture", "Lumbering, wood pulp, and timber furniture", "Leather tanning, ivory carving, and pearl culture"],
    "D",
    "Chemical-based industries use natural chemical minerals (salts, sulphur, potash) or mineral oil (petroleum) to produce petrochemicals, synthetic fibres, plastics, and chemical fertilizers.\nHence, Option {{CORR}} is correct.",
    "Lists chemical-based manufacturing industries: petrochemicals, plastics, synthetic fibres."
)
add_u5(make_question(CHAPTER_U5, "Industry Classification: Inputs", "Which of the following industries are classified as 'Chemical-based Industries'?", opts, c, s))

# Q9: Forest-based Industries
opts, c, s = rotate_options(
    "Timber, paper and pulp, lac, turpentine, and rayon",
    ["Aluminium smelting, brass foundry, and bronze casting", "Automobile manufacturing, aircraft assembly, and locomotives", "Synthetic detergents, cosmetics, and paints"],
    "A",
    "Forest-based industries use forest products as raw materials: timber for furniture and construction, wood pulp for paper, lac, rayon, and turpentine oil.\nHence, Option {{CORR}} is correct.",
    "Identifies forest-based industries: timber, paper pulp, lac, turpentine."
)
add_u5(make_question(CHAPTER_U5, "Industry Classification: Inputs", "Which of the following manufacturing activities belong to the 'Forest-based Industry' category?", opts, c, s))

# Q10: Animal-based Industries
opts, c, s = rotate_options(
    "Leather for shoes and bags, and wool for woolen textiles",
    ["Cement for construction and glass for bottles", "Petroleum refining for kerosene and diesel", "Cotton spinning for denim apparel"],
    "B",
    "Leather and wool are important animal-based raw materials used in the manufacture of leather goods, footwear, and woolen textiles. Ivory is also an animal product.\nHence, Option {{CORR}} is correct.",
    "Identifies leather and wool as primary animal-based manufacturing inputs."
)
add_u5(make_question(CHAPTER_U5, "Industry Classification: Inputs", "What are the two most important raw materials used in 'Animal-based Industries'?", opts, c, s))

# Q11: Basic Industry definition
opts, c, s = rotate_options(
    "An industry whose finished products are used as raw materials to make other goods (e.g. Iron and Steel)",
    ["An industry that produces finished biscuits and bread directly for household snacks", "An industry that generates only software code without physical goods", "An industry that collects garbage from municipal streets"],
    "C",
    "The industry whose products are used to make other goods by using them as raw materials are called basic industries. The iron and steel industry is a basic industry because its steel is used to make machines, bridges, and transport equipment.\nHence, Option {{CORR}} is correct.",
    "Defines a Basic Industry (e.g., Iron & Steel) as one providing inputs for other manufacturers."
)
add_u5(make_question(CHAPTER_U5, "Industry Classification: Output", "What is meant by a 'Basic Industry' in industrial classification?", opts, c, s))

# Q12: Consumer Goods Industry
opts, c, s = rotate_options(
    "Industries that produce goods consumed directly by the public (e.g. bread, tea, soaps, paper, television sets)",
    ["Industries that smelt heavy pig iron ingots for ship hulls", "Industries that manufacture blast furnaces and rolling mills", "Industries that lay underground optical fibre transatlantic cables"],
    "D",
    "Consumer goods industries produce goods which are consumed directly by the consumers: bread, biscuits, tea, soaps, toiletries, paper for writing, televisions, and garments.\nHence, Option {{CORR}} is correct.",
    "Defines Consumer Goods Industries as producing goods directly used by consumers."
)
add_u5(make_question(CHAPTER_U5, "Industry Classification: Output", "Which of the following is classified as a 'Consumer Goods Industry'?", opts, c, s))

# Q13: Weber's Location Theory / Raw Material Index
opts, c, s = rotate_options(
    "Weight-losing raw materials pull industries to the raw material source, while pure/non-weight-losing materials allow market orientation",
    ["All industries must be located strictly on coastal islands regardless of raw materials", "Raw materials have zero influence on transport costs or industrial location", "Industries should be located where land taxes are highest"],
    "A",
    "Industries using weight-losing raw materials (like iron ore, copper, sugarcane) are located near the source of raw materials to minimize transport costs. Industries using pure raw materials can be located near the market.\nHence, Option {{CORR}} is correct.",
    "Explains weight-losing raw materials pulling industries to material sources."
)
add_u5(make_question(CHAPTER_U5, "Location Factors", "In industrial location theory, how do 'Weight-Losing Raw Materials' influence the geographical location of a manufacturing plant?", opts, c, s))

# Q14: Agglomeration Economies
opts, c, s = rotate_options(
    "Benefits and savings derived by industries from locating near each other and sharing common infrastructure, banking, and services",
    ["Government penalties imposed on factories that operate in the same city", "The loss of revenue when multiple companies share the same highway", "Mandatory relocation of urban factories into remote deserts"],
    "B",
    "Agglomeration economies refer to the benefits and cost reductions that industries derive from clustering together, such as shared labor pools, financial institutions, transport networks, and utility infrastructure.\nHence, Option {{CORR}} is correct.",
    "Defines Agglomeration Economies as cost savings from industrial clustering."
)
add_u5(make_question(CHAPTER_U5, "Location Factors", "What is meant by 'Agglomeration Economies' in industrial geography?", opts, c, s))

# Q15: Traditional Industrial Region: Ruhr Coalfield
opts, c, s = rotate_options(
    "Germany",
    ["United Kingdom", "France", "Poland"],
    "C",
    "The Ruhr coalfield is located in Germany. It has been one of the major industrial regions of Europe for a long time, historically famous for coal mining and heavy steel production.\nHence, Option {{CORR}} is correct.",
    "Identifies Germany as the home of the Ruhr industrial coalfield basin."
)
add_u5(make_question(CHAPTER_U5, "Traditional Industrial Regions", "The famous 'Ruhr Coalfield' industrial basin is located in which European country?", opts, c, s))

# Q16: Transition of the Ruhr Region
opts, c, s = rotate_options(
    "Shifted from heavy 'smoke-stack' coal and steel industries to high-tech manufacturing, service sectors, and clean tourism ('from rust to green/silicon')",
    ["Completely abandoned by its population and turned into an uninhabited desert", "Converted into an exclusive sugarcane plantation belt", "Reverted to primitive hunting and gathering"],
    "D",
    "The Ruhr region faced declining demand for coal and iron ore exhaustion. It underwent structural restructuring, transforming from a traditional 'smoke-stack' rust belt into a clean region of new chemical industries, services, and industrial heritage tourism.\nHence, Option {{CORR}} is correct.",
    "Describes the restructuring of the Ruhr from heavy rust belt to clean services and technology."
)
add_u5(make_question(CHAPTER_U5, "Industrial Restructuring", "How has the Ruhr industrial region of Germany transformed in recent decades?", opts, c, s))

# Q17: High-Technology Industry features
opts, c, s = rotate_options(
    "Application of intensive R&D, advanced electronics, robotics, computer-aided design, and clean modern campus-like office parks",
    ["Massive blast furnaces spewing black coal soot in dark alleys", "Manual spinning of raw wool using wooden hand-cranked spindles", "Open-air periodic market stalls operating without electricity"],
    "A",
    "High technology is the latest generation of manufacturing activities. It involves intensive research and development (R&D), manufacturing of electronics, robotics, computer-aided design (CAD), pharmaceuticals, and operates in clean, modern office campuses.\nHence, Option {{CORR}} is correct.",
    "Identifies characteristics of high-tech manufacturing: R&D, robotics, clean office parks."
)
add_u5(make_question(CHAPTER_U5, "High-Tech Industries", "What are the distinguishing features of 'High-Technology Industries'?", opts, c, s))

# Q18: Technopolis
opts, c, s = rotate_options(
    "High-tech industrial regions that are regionally concentrated, self-sustained, and highly specialized (e.g. Silicon Valley)",
    ["Ancient medieval fortified trading towns surrounded by stone walls", "Slum settlements formed around municipal solid waste dumps", "Rural fishing hamlets situated along mangrove coastlines"],
    "B",
    "High-tech industrial regions that are regionally concentrated, self-sustained, and highly specialized are called 'Technopolies'. Famous examples include Silicon Valley near San Francisco and Route 128 near Boston.\nHence, Option {{CORR}} is correct.",
    "Defines a Technopolis as a concentrated, specialized high-tech cluster."
)
add_u5(make_question(CHAPTER_U5, "High-Tech Industries", "What is a 'Technopolis' in modern economic geography?", opts, c, s))

# Q19: Silicon Valley location
opts, c, s = rotate_options(
    "Near San Francisco, California, USA",
    ["Near Detroit, Michigan, USA", "Near Pittsburgh, Pennsylvania, USA", "Near New Orleans, Louisiana, USA"],
    "C",
    "Silicon Valley is situated near San Francisco in northern California, USA. It is the world's most renowned technopolis, pioneering microprocessor, software, and semiconductor industries.\nHence, Option {{CORR}} is correct.",
    "Locates Silicon Valley near San Francisco, California."
)
add_u5(make_question(CHAPTER_U5, "Technopolies", "Where is the premier global technopolis known as 'Silicon Valley' situated?", opts, c, s))

# Q20: White Collar vs Blue Collar in High-Tech
opts, c, s = rotate_options(
    "White-collar (professional, scientific, engineering) workers greatly outnumber blue-collar (production/assembly) workers",
    ["Blue-collar manual workers make up 99% of the workforce", "No human workers are employed because all decisions are made by animals", "All workers are classified as red-collar outdoor agricultural laborers"],
    "D",
    "In high-technology industries, white-collar (professional, research, engineering) workers greatly outnumber blue-collar (manual assembly line) workers.\nHence, Option {{CORR}} is correct.",
    "Points out the predominance of white-collar professionals over blue-collar labor in high-tech."
)
add_u5(make_question(CHAPTER_U5, "High-Tech Labor", "How does the workforce structure of high-technology industries differ from traditional manufacturing?", opts, c, s))

# Q21: Iron and Steel raw materials
opts, c, s = rotate_options(
    "Iron ore, coking coal, limestone, and manganese",
    ["Bauxite, copper, sulphur, and potash", "Petroleum, natural gas, uranium, and thorium", "Timber, sawdust, resin, and turpentine"],
    "A",
    "The primary raw materials for the traditional iron and steel industry are: iron ore, coking coal, limestone (as flux), and manganese. Dolomite and water are also required in large quantities.\nHence, Option {{CORR}} is correct.",
    "Lists essential raw materials for iron and steel smelting: iron ore, coking coal, limestone, manganese."
)
add_u5(make_question(CHAPTER_U5, "Iron and Steel Industry", "Which four raw materials are essential for smelting iron in a traditional blast furnace?", opts, c, s))

# Q22: Mini Steel Mills
opts, c, s = rotate_options(
    "Electric arc furnaces that use scrap iron as raw material and locate near urban markets",
    ["Giant blast furnaces requiring millions of tons of imported coking coal", "Mills that manufacture toy iron knives for children", "Primitive open hearths using firewood in remote forests"],
    "B",
    "Mini steel mills are less expensive to build and operate. They use electric arc furnaces, consume scrap iron as raw material, do not require coking coal, and are located close to markets.\nHence, Option {{CORR}} is correct.",
    "Explains mini steel mills: electric arc furnaces, scrap iron raw material, market proximity."
)
add_u5(make_question(CHAPTER_U5, "Iron and Steel Industry", "What distinguishes modern 'Mini Steel Mills' from integrated steel plants?", opts, c, s))

# Q23: Cotton textile manufacturing stages
opts, c, s = rotate_options(
    "Ginning, spinning, weaving, and finishing",
    ["Smelting, rolling, casting, and forging", "Pasteurisation, bottling, capping, and refrigeration", "Cracking, refining, polymerisation, and molding"],
    "C",
    "Cotton textile manufacturing involves four distinct stages: (1) Ginning (separating seeds from raw fiber), (2) Spinning (turning fiber into yarn), (3) Weaving (turning yarn into cloth), and (4) Dyeing and finishing.\nHence, Option {{CORR}} is correct.",
    "Sequences the stages of cotton textile production: ginning, spinning, weaving, finishing."
)
add_u5(make_question(CHAPTER_U5, "Textile Industry", "What are the four primary sequential stages involved in cotton textile manufacturing?", opts, c, s))

# Q24: Powerlooms vs Handlooms
opts, c, s = rotate_options(
    "Powerlooms use electricity and produce more cloth per worker, while handlooms rely on manual labor and employ more weavers",
    ["Handlooms operate on jet aviation fuel, while powerlooms use human feet", "Handlooms produce 90% of global industrial steel", "Powerlooms are strictly forbidden in developing countries"],
    "D",
    "Handloom sector is labor intensive and provides employment to semi-skilled workers, requiring little capital. The powerloom sector introduces machines, consumes electricity, and produces larger volumes with higher productivity.\nHence, Option {{CORR}} is correct.",
    "Contrasts labor-intensive handlooms with mechanized, higher-productivity powerlooms."
)
add_u5(make_question(CHAPTER_U5, "Textile Industry", "What is the key economic distinction between the 'Handloom' and 'Powerloom' sectors in textile manufacturing?", opts, c, s))

# Q25: Rust Bowl of the USA
opts, c, s = rotate_options(
    "Pittsburgh-Lake Erie region",
    ["Silicon Valley, California", "Gulf Coast of Texas", "Miami, Florida"],
    "A",
    "The Pittsburgh industrial region of the USA was formerly the steel capital of the world. With declining competitiveness, obsolete machinery, and shifting markets, it experienced industrial decay, becoming known as the 'Rust Bowl'.\nHence, Option {{CORR}} is correct.",
    "Identifies the Pittsburgh region as the historic 'Rust Bowl' of the United States."
)
add_u5(make_question(CHAPTER_U5, "Industrial Rust Belts", "Which historic American manufacturing region, formerly the world's steel capital, became famously known as the 'Rust Bowl'?", opts, c, s))

# Q26: Match Raw Materials to Industry Types
add_u5(make_match_question(
    CHAPTER_U5, "Industrial Raw Materials",
    "Match List I (Raw Material Category) with List II (Representative Manufacturing Industry):",
    [("A", "Agro-based"), ("B", "Mineral-based (Ferrous)"), ("C", "Chemical-based"), ("D", "Forest-based")],
    [("I", "Iron and steel smelting"), ("II", "Petrochemicals and synthetic plastics"), ("III", "Fruit canning and sugar mills"), ("IV", "Paper pulp and timber sawmills")],
    "A-III, B-I, C-II, D-IV", "B",
    "Agro-based corresponds to fruit canning/sugar (III); Ferrous mineral corresponds to iron/steel (I); Chemical corresponds to petrochemicals/plastics (II); Forest corresponds to paper pulp/timber (IV).",
    "Matches raw material categories to corresponding manufacturing industries."
))

# Q27: Match Industrial Types by Scale
add_u5(make_match_question(
    CHAPTER_U5, "Scale of Industry",
    "Match List I (Manufacturing Scale) with List II (Defining Feature):",
    [("A", "Cottage / Household Industry"), ("B", "Small-Scale Industry"), ("C", "Large-Scale Industry"), ("D", "Footloose Industry")],
    [("I", "Simple power-driven machinery, semi-skilled labor, outside home"), ("II", "Family labor, local materials, simple tools, lowest capital"), ("III", "Mass production, huge capital, specialized labor, global market"), ("IV", "Not bound by raw material weight, relies on component parts")],
    "A-II, B-I, C-III, D-IV", "C",
    "Cottage industry uses family labor and simple tools (II); Small-scale uses power-driven machines (I); Large-scale involves mass production and large capital (III); Footloose is not bound by raw materials (IV).",
    "Correctly links industrial scale categories to their operational characteristics."
))

# Q28: Statement on Footloose Industries
add_u5(make_statement_question(
    CHAPTER_U5, "Footloose Manufacturing",
    "Footloose industries are tied closely to heavy weight-losing raw material deposits like iron ore and bauxite.",
    "Footloose industries largely produce in small quantities, do not pollute, and depend on component parts delivered via roads.",
    4, "D",
    "Statement I is false: footloose industries are explicitly NOT tied to weight-losing raw material deposits. Statement II is correct: they assemble component parts, produce in smaller quantities, and are non-polluting.",
    "Contrasts resource-tied heavy industry with footloose component manufacturing."
))

# Q29: Assertion-Reason on Sugar Mill Location
add_u5(make_assertion_question(
    CHAPTER_U5, "Agro-Industry Location",
    "Sugar mills are located in close proximity to sugarcane farming fields.",
    "Sugarcane is a weight-losing raw material whose sucrose content begins to decline rapidly within 24 hours of cutting.",
    1, "A",
    "Both Assertion and Reason are true, and Reason is the correct explanation. Sugarcane loses weight during crushing (bagasse) and sucrose deteriorates quickly after harvest, compelling mills to locate inside cane-growing tracts.",
    "Explains the raw-material orientation of sugar mills due to weight loss and sucrose decay."
))

# Q30: Multi-statement on High-Tech Technopolies
add_u5(make_multi_statement_question(
    CHAPTER_U5, "Technopolies",
    "Which of the following statements about 'Technopolies' are correct?",
    [
        ("A", "They are regionally concentrated clusters of high-technology industrial firms."),
        ("B", "They feature planned industrial parks with campus-style environments and modern laboratories."),
        ("C", "Silicon Valley near San Francisco and Route 128 near Boston are classic technopolies."),
        ("D", "They rely primarily on heavy coal-fired steam engines and child labor.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C are correct facts about technopolies. Statement D is absurd as technopolies rely on advanced electronics, clean energy, and highly educated white-collar scientists.",
    "Identifies essential characteristics and global examples of technopolies."
))

# Q31: Artisan Products in Cottage Industry
opts, c, s = rotate_options(
    "Pottery, bamboo baskets, handloom mats, leather shoes, and decorative clay artifacts",
    ["High-bypass turbofan jet aircraft engines", "Microprocessor semiconductor wafers", "Heavy diesel railway locomotives"],
    "C",
    "Cottage industries produce everyday utilitarian and artistic goods like pottery, mats, woven baskets, leather shoes, pottery, and jewelry using local clays, reeds, and fibers.\nHence, Option {{CORR}} is correct.",
    "Lists authentic products of cottage and household artisan manufacturing."
)
add_u5(make_question(CHAPTER_U5, "Cottage Manufacturing", "Which of the following items are characteristically produced by traditional household or cottage industries?", opts, c, s))

# Q32: Division of Labor in Modern Manufacturing
opts, c, s = rotate_options(
    "Each worker performs a single specialized, repetitive task on an assembly line, dramatically increasing output speed",
    ["A single craftsman produces the entire automobile by hand over six months", "All workers rotate jobs every five minutes randomly", "Workers are prohibited from using any mechanical tools"],
    "D",
    "A key feature of modern large-scale manufacturing is the extreme division of labor, where manufacturing is broken down into minute, specialized repetitive tasks along an assembly line, maximizing productivity.\nHence, Option {{CORR}} is correct.",
    "Explains the principle of extreme division of labor in assembly-line mass production."
)
add_u5(make_question(CHAPTER_U5, "Manufacturing Organization", "What is the primary operational advantage of 'Specialisation and Division of Labour' in modern large-scale factories?", opts, c, s))

# Q33: Mechanisation definition
opts, c, s = rotate_options(
    "Using gadgets and machines to accomplish tasks, with automation being the advanced stage where computers execute control",
    ["Replacing all machines with manual human muscle power", "Banning all electrical motors in industrial plants", "Limiting production solely to hand-written manuscripts"],
    "A",
    "Mechanisation means using gadgets which accomplish tasks. Automation is the advanced stage of mechanisation where machines execute tasks and control processes automatically without human thinking.\nHence, Option {{CORR}} is correct.",
    "Defines mechanisation and its advanced stage: computer-driven automation."
)
add_u5(make_question(CHAPTER_U5, "Manufacturing Concepts", "In industrial technology, what is the distinction between 'Mechanisation' and 'Automation'?", opts, c, s))

# Q34: Heavy Industries definition
opts, c, s = rotate_options(
    "Industries that produce bulky, heavy goods using large volumes of heavy raw materials and extensive capital (e.g. Iron and Steel, Shipbuilding)",
    ["Industries that manufacture microchips and lightweight watches", "Industries that produce silk embroidery handkerchiefs", "Cottage shops making pottery lamps"],
    "B",
    "Heavy industries produce large, bulky, heavy goods using heavy raw materials and large capital investments, such as iron and steel smelting, heavy machinery fabrication, and shipbuilding.\nHence, Option {{CORR}} is correct.",
    "Defines Heavy Industries as capital-intensive production of bulky, heavy capital goods."
)
add_u5(make_question(CHAPTER_U5, "Industry Types", "What defines a 'Heavy Industry' in manufacturing geography?", opts, c, s))

# Q35: Consumer Goods vs Capital Goods
opts, c, s = rotate_options(
    "Capital goods are machines and tools used by other factories to produce items, while Consumer goods are bought directly by households",
    ["Capital goods are consumed by infants, while consumer goods are stored in bank vaults", "Capital goods are free, while consumer goods cost money", "Both are identical and refer exclusively to fresh vegetables"],
    "C",
    "Capital goods (producer goods) are manufactured items used by other industries to produce further goods (e.g. machine tools, cranes, industrial furnaces). Consumer goods are purchased directly by end consumers (e.g. television, toothpaste).\nHence, Option {{CORR}} is correct.",
    "Distinguishes Capital Goods (factory machinery) from Consumer Goods (household items)."
)
add_u5(make_question(CHAPTER_U5, "Product Classification", "What is the economic difference between 'Capital Goods' and 'Consumer Goods' in manufacturing output?", opts, c, s))

# Q36: Synthetic Fibres
opts, c, s = rotate_options(
    "Nylon, polyester, and acrylic manufactured from petrochemical chemical polymers",
    ["Cotton, linen, and hemp harvested from agricultural fields", "Wool sheared from merino sheep", "Silk unreeled from silkworm cocoons"],
    "D",
    "Synthetic fibres like nylon, polyester, and terylene are chemical-based materials produced through polymerisation of petroleum derivatives, unlike natural plant or animal fibres.\nHence, Option {{CORR}} is correct.",
    "Identifies nylon and polyester as synthetic petrochemical fibres."
)
add_u5(make_question(CHAPTER_U5, "Chemical Fibres", "Which of the following fibers are classified as 'Synthetic Chemical Fibers' derived from petrochemicals?", opts, c, s))

# Q37: Integrated Steel Plant location factor
opts, c, s = rotate_options(
    "Near coalfields or iron ore mines, or at coastal deep-water ports for imported raw materials",
    ["At high mountain hill resort peaks", "Inside dense tropical mangrove swamps", "In the center of arid sand dune fields"],
    "A",
    "Integrated steel plants require immense quantities of heavy, weight-losing raw materials (coal and iron ore) and are therefore located either on coalfields (e.g. Bokaro, Durgapur), near iron ore (e.g. Bhilai), or at deep-water ports (e.g. Visakhapatnam, coastal Japan).\nHence, Option {{CORR}} is correct.",
    "Identifies proximity to coal, iron ore, or deepwater ports as location factors for steel plants."
)
add_u5(make_question(CHAPTER_U5, "Iron and Steel Location", "Where are large integrated iron and steel plants traditionally located to minimize transportation costs?", opts, c, s))

# Q38: Smoke-stack Industries
opts, c, s = rotate_options(
    "Traditional heavy industrial regions characterized by air pollution, tall smoking chimneys, high housing density, and heavy metal production",
    ["Clean air software development campuses in suburban California", "Organic strawberry farms using solar greenhouses", "Boutique fashion design studios in Milan"],
    "B",
    "Traditional large-scale industrial regions are often called 'smoke-stack industries' due to their high concentration of chimneys, heavy metal foundries, soot, high worker density, and environmental pollution.\nHence, Option {{CORR}} is correct.",
    "Describes traditional 'smoke-stack' heavy industries."
)
add_u5(make_question(CHAPTER_U5, "Traditional Industries", "Why were traditional heavy manufacturing regions historically described as 'Smoke-stack Industries'?", opts, c, s))

# Q39: Blue Collar Workers
opts, c, s = rotate_options(
    "Workers engaged in manual physical labor on factory production floors and assembly lines",
    ["Senior research scientists in pharmaceutical laboratories", "Chief Executive Officers of multinational technology conglomerates", "Outdoor agricultural laborers harvesting wheat"],
    "C",
    "Factory workers engaged in direct manual physical labor, machinery operation, and manufacturing assembly are designated as 'Blue Collar Workers'.\nHence, Option {{CORR}} is correct.",
    "Identifies factory production workers as 'Blue Collar Workers'."
)
add_u5(make_question(CHAPTER_U5, "Labor Classification", "Factory workers performing manual physical labor on industrial production floors are designated as:", opts, c, s))

# Q40: White Collar Workers
opts, c, s = rotate_options(
    "Professional, managerial, scientific, and administrative personnel in offices and R&D laboratories",
    ["Manual miners operating coal picks underground", "Fishermen hauling marine nets on trawlers", "Lumberjacks felling coniferous trees in the taiga"],
    "D",
    "White-collar workers refer to professionals, scientists, engineers, managers, and clerical staff who perform non-manual, administrative, or research tasks.\nHence, Option {{CORR}} is correct.",
    "Defines White Collar Workers as non-manual professional and managerial staff."
)
add_u5(make_question(CHAPTER_U5, "Labor Classification", "Which workers are classified as 'White Collar Workers' in industrial organizations?", opts, c, s))

# Q41: Cotton Textile decentralization
opts, c, s = rotate_options(
    "Shifted from traditional colonial centers (UK, New England) to developing nations with cheap labor, abundant raw cotton, and growing domestic markets (China, India, Pakistan, Bangladesh)",
    ["Relocated entirely to polar research stations in Antarctica", "Disappeared completely because humans stopped wearing clothes", "Became concentrated exclusively on floating oceanic oil rigs"],
    "A",
    "The cotton textile industry has seen significant geographical decentralization, declining in older industrialized countries like Britain and New England, and shifting to developing nations with cheap labor and cotton (China, India, Pakistan, Bangladesh).\nHence, Option {{CORR}} is correct.",
    "Explains the global shift of cotton textile manufacturing to developing Asian nations."
)
add_u5(make_question(CHAPTER_U5, "Global Industrial Shift", "How has the geographical distribution of the global cotton textile industry shifted since the mid-twentieth century?", opts, c, s))

# Q42: Non-weight losing raw material: Cotton
opts, c, s = rotate_options(
    "Raw cotton is a pure, non-weight losing material where 1 ton of cotton fiber yields approximately 1 ton of cotton yarn",
    ["Cotton loses 99% of its weight during spinning", "Cotton is an explosive mineral that cannot be transported across rivers", "Cotton can only be spun inside underground salt mines"],
    "B",
    "Unlike sugarcane or iron ore, raw cotton is a 'pure raw material'—it loses practically negligible weight in the spinning process. Hence, textile mills can be located near cotton fields, near market cities, or at transport hubs with equal ease.\nHence, Option {{CORR}} is correct.",
    "Explains that raw cotton is pure (non-weight losing), allowing market or material location."
)
add_u5(make_question(CHAPTER_U5, "Textile Location Factors", "Why can cotton textile mills be located near consuming markets as easily as near cotton-producing fields?", opts, c, s))

# Q43: Government Policy in Industrial Location
opts, c, s = rotate_options(
    "Governments offer tax concessions, cheap land, and infrastructure subsidies to promote industries in backward or disadvantaged regions",
    ["Governments ban all manufacturing inside national territory", "Governments require all factories to use 18th-century watermills", "Governments forbid factories from hiring any local workers"],
    "C",
    "Governments often adopt policies of regional development, offering subsidies, tax holidays, and industrial estates to encourage industries to locate in backward regions to reduce regional economic disparities.\nHence, Option {{CORR}} is correct.",
    "Explains how government policy and subsidies promote industrialization in backward areas."
)
add_u5(make_question(CHAPTER_U5, "Location Factors: State Policy", "How does government policy influence the geographical distribution of manufacturing industries?", opts, c, s))

# Q44: Synthetic Rubber Industry
opts, c, s = rotate_options(
    "Chemical-based industry deriving raw materials from petroleum refining",
    ["Agro-based industry deriving raw materials from sugarcane juice", "Animal-based industry deriving raw materials from camel wool", "Forest-based industry collecting sap from coniferous pines"],
    "D",
    "Synthetic rubber is manufactured through chemical synthesis of butadiene and styrene derived from crude petroleum refining, classifying it as a chemical-based industry.\nHence, Option {{CORR}} is correct.",
    "Classifies synthetic rubber as a petroleum-derived chemical industry."
)
add_u5(make_question(CHAPTER_U5, "Chemical Manufacturing", "Under which category of manufacturing is the 'Synthetic Rubber' industry classified?", opts, c, s))

# Q45: Petrochemical cracker plant
opts, c, s = rotate_options(
    "Breaks down heavy petroleum hydrocarbons into smaller chemical building blocks like ethylene and propylene for plastics",
    ["Crushes iron ore rocks into fine gravel for road ballast", "Bakes wheat flour into edible crackers and biscuits", "Spins cotton bolls into high-tensile embroidery thread"],
    "A",
    "In petrochemical manufacturing, a cracker plant breaks down (cracks) long-chain hydrocarbons from petroleum or natural gas into lighter olefins like ethylene and propylene, used as feedstocks for plastics.\nHence, Option {{CORR}} is correct.",
    "Explains the function of a petrochemical cracker plant producing olefin feedstocks."
)
add_u5(make_question(CHAPTER_U5, "Petrochemicals", "What is the primary industrial function of a 'Petrochemical Cracker Plant'?", opts, c, s))

# Q46: Agglomeration diseconomies
opts, c, s = rotate_options(
    "Urban congestion, soaring land rents, labor shortages, and heavy environmental pollution forcing industries to decentralize",
    ["Instant doubling of company profits due to free city municipal water", "Elimination of all highway traffic in capital cities", "The total disappearance of industrial taxes in metropolises"],
    "B",
    "When industrial clusters become excessively large, agglomeration economies can turn into 'diseconomies' due to soaring land costs, severe traffic congestion, pollution, and high labor costs, prompting factories to relocate to peripheral zones.\nHence, Option {{CORR}} is correct.",
    "Identifies traffic congestion, high rents, and pollution as agglomeration diseconomies."
)
add_u5(make_question(CHAPTER_U5, "Agglomeration Dynamics", "What factors can cause 'Agglomeration Economies' to reverse into 'Agglomeration Diseconomies' in major metropolitan industrial hubs?", opts, c, s))

# Q47: Match Industrial Belts with Hallmark Countries
add_u5(make_match_question(
    CHAPTER_U5, "World Industrial Belts",
    "Match List I (Famous Industrial Region) with List II (Country):",
    [("A", "Ruhr Valley"), ("B", "Silicon Valley"), ("C", "Kanto Plains (Tokyo-Yokohama)"), ("D", "Lombardy Industrial Plain")],
    [("I", "United States of America"), ("II", "Germany"), ("III", "Italy"), ("IV", "Japan")],
    "A-II, B-I, C-IV, D-III", "C",
    "Ruhr Valley is in Germany (II); Silicon Valley is in USA (I); Kanto Plain is in Japan (IV); Lombardy is in Italy (III).",
    "Matches world manufacturing regions with their respective nations."
))

# Q48: Statement on High-tech Industrial Park Architecture
add_u5(make_statement_question(
    CHAPTER_U5, "High-Tech Workspaces",
    "High-technology manufacturing complexes typically feature planned, spacious, campus-style developments with manicured landscaping.",
    "High-technology industries deliberately locate in narrow, soot-covered slums alongside open-hearth blast furnaces.",
    3, "D",
    "Statement I is correct: technopolies and high-tech parks feature modern campus layouts with green lawns and clean buildings. Statement II is false: high-tech explicitly rejects the dirty environments of traditional smoke-stack heavy industry.",
    "Contrasts modern high-tech park environments with old smoke-stack industrial districts."
))

# Q49: Assertion-Reason on Footloose Industry Location
add_u5(make_assertion_question(
    CHAPTER_U5, "Footloose Industries",
    "Footloose manufacturing industries are not tied to the raw material site.",
    "Footloose industries assemble standardized, lightweight components and produce low-bulk, high-value goods with minimal transport weight loss.",
    1, "A",
    "Both Assertion and Reason are true, and Reason is the correct explanation. Because their components and finished products are light and non-weight losing, footloose plants can locate wherever transport access and labor are favorable.",
    "Explains why footloose industries enjoy spatial freedom."
))

# Q50: Multi-statement on Cottage Industry Economic Role
add_u5(make_multi_statement_question(
    CHAPTER_U5, "Cottage Industries",
    "Which of the following statements about cottage industries are correct?",
    [
        ("A", "They require minimal capital and utilize local raw materials."),
        ("B", "Finished goods are mostly consumed locally or sold in village periodic markets."),
        ("C", "They provide supplementary employment to agricultural households during off-seasons."),
        ("D", "They consume 90% of global industrial electricity through high-voltage transmission grids.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C are authentic socio-economic traits of cottage industries. Statement D is false because cottage manufacturing uses simple hand tools or minimal power.",
    "Identifies the socio-economic benefits and operational simplicity of cottage industries."
))

# Q51: Assembly Line Production pioneer
opts, c, s = rotate_options(
    "Henry Ford in automotive manufacturing",
    ["Thomas Edison in telegraph wires", "Alexander Graham Bell in telephone poles", "James Watt in coal steam locomotives"],
    "C",
    "The conveyor assembly-line method of mass production was famously pioneered by Henry Ford in Detroit for the mass manufacture of Model T automobiles, becoming the global model for twentieth-century factory manufacturing.\nHence, Option {{CORR}} is correct.",
    "Attributes the conveyor assembly-line manufacturing model to Henry Ford."
)
add_u5(make_question(CHAPTER_U5, "Mass Production", "Who famously pioneered the modern conveyor-belt 'Assembly Line' method of industrial mass production?", opts, c, s))

# Q52: Cement Industry raw material
opts, c, s = rotate_options(
    "Limestone, clay, and gypsum",
    ["Bauxite, copper, and lead", "Crude petroleum, natural gas, and naphtha", "Timber pulp, lac, and resin"],
    "D",
    "The cement industry is a heavy, weight-losing mineral-based industry requiring massive quantities of limestone, clay, silica, and gypsum, alongside coal for kiln heating.\nHence, Option {{CORR}} is correct.",
    "Lists the primary mineral raw materials required for cement manufacturing."
)
add_u5(make_question(CHAPTER_U5, "Mineral-based Industries", "What are the primary mineral raw materials utilized in the manufacture of Portland cement?", opts, c, s))

# Q53: Paper and Pulp Industry water requirement
opts, c, s = rotate_options(
    "Enormous quantities of clean fresh water for washing, bleaching, and pulping wood chips",
    ["Zero water because paper is manufactured using dry sand blasters", "Saltwater from the ocean exclusively to prevent ink absorption", "Liquid mercury and sulfuric acid as the sole liquid media"],
    "A",
    "The paper and pulp industry requires massive volumes of fresh water for processing timber, digesting wood chips, bleaching pulp, and floating slurry onto drying screens.\nHence, Option {{CORR}} is correct.",
    "Explains the heavy clean fresh water requirement of the paper and pulp industry."
)
add_u5(make_question(CHAPTER_U5, "Forest-based Industries", "Why are commercial paper and pulp mills consistently located near large perennial rivers or lakes?", opts, c, s))

# Q54: Aluminium Smelting location factor
opts, c, s = rotate_options(
    "Abundant, continuous, and cheap electrical energy (hydroelectric or thermal power)",
    ["Proximity to gold mines in high mountain ranges", "Availability of cheap camel transport in hyper-arid sand dunes", "Sub-zero freezing outdoor air temperatures"],
    "B",
    "Aluminium smelting is an intensely power-hungry electrochemical process. Smelters are located where continuous, cheap electricity (usually hydroelectric power) is abundant, even if bauxite has to be shipped from far away.\nHence, Option {{CORR}} is correct.",
    "Identifies cheap, abundant electrical power as the decisive location factor for aluminium smelters."
)
add_u5(make_question(CHAPTER_U5, "Non-Ferrous Metallurgy", "What is the decisive location factor that determines the geographic site of an 'Aluminium Smelting' plant?", opts, c, s))

# Q55: Copper Smelting location factor
opts, c, s = rotate_options(
    "Located at or near copper mines because copper ore contains less than 1 to 2 percent metal, making raw ore transport economically prohibitive",
    ["Located exclusively at international international airport passenger terminals", "Located in agricultural fruit orchards to avoid paying city taxes", "Located thousands of miles away in polar tundra regions"],
    "C",
    "Copper ore has an extremely low metal content (often less than 1-2% pure copper). Smelters are situated right at the mine site to produce concentrated blister copper and avoid hauling 98% waste rock.\nHence, Option {{CORR}} is correct.",
    "Explains why copper smelters must locate at the mine site due to extreme weight loss."
)
add_u5(make_question(CHAPTER_U5, "Non-Ferrous Metallurgy", "Why are copper smelting plants almost invariably situated directly at the mining site?", opts, c, s))

# Q56: Industrial Estate definition
opts, c, s = rotate_options(
    "A tract of land developed and subdivided into plots with pre-built roads, power, water, and sewage infrastructure for factory installation",
    ["A private country palace owned by historical feudal aristocracy", "An agricultural reserve where all tree felling is strictly banned", "A municipal cemetery for retired factory workers"],
    "D",
    "An industrial estate is a planned tract of land zoned and developed with pre-installed utilities, arterial roads, electricity substations, and effluent treatment systems to attract new manufacturing units.\nHence, Option {{CORR}} is correct.",
    "Defines an Industrial Estate as a planned infrastructure-ready manufacturing zone."
)
add_u5(make_question(CHAPTER_U5, "Industrial Planning", "What is an 'Industrial Estate' in the context of government-led regional industrialization?", opts, c, s))

# Q57: Industrial Inertia
opts, c, s = rotate_options(
    "The tendency of an industry to remain in its original location even after the initial geographical advantages (like local raw material) have disappeared",
    ["The sudden overnight bankruptcy of all manufacturing corporations", "The physical stoppage of assembly line machines during electrical blackouts", "The complete prohibition of factory exports by customs officials"],
    "A",
    "Industrial inertia is the reluctance or inability of established manufacturing industries to relocate from an existing area, even when the original advantages (e.g. local coal) have depleted, because of sunk capital, fixed infrastructure, and skilled labor.\nHence, Option {{CORR}} is correct.",
    "Defines Industrial Inertia as factories remaining in historic locations despite loss of original advantages."
)
add_u5(make_question(CHAPTER_U5, "Industrial Dynamics", "In economic geography, what does the concept of 'Industrial Inertia' signify?", opts, c, s))

# Q58: Sequence of Industrial Revolutions
add_u5(make_sequence_question(
    CHAPTER_U5, "Industrial History",
    "Arrange the following technological milestones of manufacturing in chronological order:",
    [("A", "Microprocessor, Computer-Aided Design (CAD), and Robotics"), ("B", "Steam engine mechanisation and coal-powered textile mills"), ("C", "Electrical power grid, conveyor assembly line, and mass production"), ("D", "Traditional cottage handloom artisan production")],
    "D, B, C, A", "B",
    "1. Traditional cottage artisan production was dominant before the Industrial Revolution (D).\n2. Steam engine mechanisation began in late 18th century (B).\n3. Electrical power and assembly line mass production emerged in early 20th century (C).\n4. Microprocessors, CAD, and robotics arose in the late 20th century (A).",
    "Sequences the historical technological milestones of manufacturing."
))

# Q59: Footloose Industry example: Electronics assembly
opts, c, s = rotate_options(
    "Assembly of mobile phones, watches, and microelectronic circuit boards",
    ["Smelting iron ore into pig iron in coal blast furnaces", "Crushing whole sugarcane into unrefined jaggery", "Baking raw limestone rocks in giant rotary cement kilns"],
    "C",
    "Assembly of microelectronic gadgets, smartphones, and watches uses lightweight standardized parts, emits zero smoke, and can be situated wherever skilled labor and transport exist, exemplifying footloose manufacturing.\nHence, Option {{CORR}} is correct.",
    "Identifies microelectronics assembly as the quintessential footloose industry."
)
add_u5(make_question(CHAPTER_U5, "Footloose Examples", "Which of the following manufacturing operations serves as a classic contemporary example of a 'Footloose Industry'?", opts, c, s))

# Q60: Value Addition in Secondary Activities
opts, c, s = rotate_options(
    "Raw iron ore transformed into steel beams, or raw cotton fiber woven into finished garments, multiplying economic utility and market price",
    ["Leaving harvested timber to rot in wet rainforest soils", "Throwing mined copper ore into the ocean", "Burning harvested cotton bolls on agricultural fields"],
    "D",
    "Secondary activities create 'value addition' by converting low-value raw natural commodities (iron ore, raw cotton, bauxite) into highly useful, high-priced finished articles (steel vehicles, designer clothing, aeroplanes).\nHence, Option {{CORR}} is correct.",
    "Explains how secondary manufacturing creates economic value addition."
)
add_u5(make_question(CHAPTER_U5, "Value Addition", "How does the manufacturing process in secondary activities achieve 'Value Addition'?", opts, c, s))

validate_and_collect(u5_qs, u5_seen)
assert len(u5_qs) == 60
with open("mock/geo_units/unit5.json", "w", encoding="utf-8") as f:
    json.dump(u5_qs, f, indent=2, ensure_ascii=False)
print("Unit 5 generated: 60 questions")

# =================================================================================================
# UNIT 6: Tertiary and Quaternary Activities (60 Questions)
# =================================================================================================
CHAPTER_U6 = "Tertiary and Quaternary Activities"
u6_qs = []
u6_seen = set()

def add_u6(q):
    u6_qs.append(q)

# Q1: Tertiary activities definition
opts, c, s = rotate_options(
    "Concerned with the provision of services rather than the production of tangible physical goods",
    ["Direct extraction of biological plants from soil", "Mechanical smelting of iron ore into steel ingots", "Growing commercial crops on irrigated floodplains"],
    "A",
    "Tertiary activities involve the practical skills, experience, and knowledge of personnel to provide services rather than manufacturing tangible goods. They include trade, transport, communication, and personal/professional services.\nHence, Option {{CORR}} is correct.",
    "Defines Tertiary Activities as service provision rather than material production."
)
add_u6(make_question(CHAPTER_U6, "Tertiary Concept", "What is the defining characteristic of 'Tertiary Activities' in economic geography?", opts, c, s))

# Q2: Four categories of Tertiary activities
opts, c, s = rotate_options(
    "Trade and commerce, Transport, Communication, and Services",
    ["Hunting, Gathering, Pastoralism, and Mining", "Spinning, Weaving, Smelting, and Refining", "Exploration, Colonization, Conquest, and Annexation"],
    "B",
    "Tertiary activities are broadly categorized into four sectors: (1) Trade and commerce, (2) Transport, (3) Communication, and (4) Services.\nHence, Option {{CORR}} is correct.",
    "Lists the four main branches of tertiary economic activities."
)
add_u6(make_question(CHAPTER_U6, "Tertiary Categories", "Into which four broad categories are tertiary activities classified?", opts, c, s))

# Q3: Retail Trading vs Wholesale Trading
opts, c, s = rotate_options(
    "Retail trading sells goods directly to consumers in small quantities, while Wholesale trading buys in bulk from producers and sells to retailers",
    ["Retail trading is strictly conducted by national armed forces", "Wholesale trading sells goods only to foreign tourists at airports", "Both terms are identical and mean online barter trading"],
    "C",
    "Retail trading is the business activity concerned with the sale of goods directly to the consumers. Wholesale trading constitutes bulk business through numerous intermediaries and merchants, supplying retailers.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Retail Trading (direct to consumer) from Wholesale Trading (bulk merchant supply)."
)
add_u6(make_question(CHAPTER_U6, "Trade and Commerce", "What is the distinction between 'Retail Trading' and 'Wholesale Trading'?", opts, c, s))

# Q4: Periodic Markets
opts, c, s = rotate_options(
    "Markets held on specific days of the week or month in rural areas where there are no permanent shops",
    ["Automated 24-hour drive-through supermarket chains in megacities", "Underground currency trading rooms operating on Wall Street", "Perennial wholesale commodity exchanges in metropolitan ports"],
    "D",
    "Periodic markets in rural areas are found where there are no regular shops. They are held on specified days and move from one place to another, serving temporary shopping needs of local villagers.\nHence, Option {{CORR}} is correct.",
    "Defines Periodic Markets as rotating markets held on specific days in rural areas."
)
add_u6(make_question(CHAPTER_U6, "Trade and Commerce", "What are 'Periodic Markets' in rural geography?", opts, c, s))

# Q5: Rural Marketing Centres vs Urban Marketing Centres
opts, c, s = rotate_options(
    "Rural centres provide quasi-urban trading for local agricultural produce, while Urban centres offer specialized goods, personal, and professional services",
    ["Rural centres operate international stock exchanges, while urban centres sell only firewood", "Rural centres are open only once every 50 years", "Urban centres are strictly forbidden from selling manufactured consumer goods"],
    "A",
    "Rural marketing centres are quasi-urban centres that serve surrounding rural settlements, trading agricultural produce and basic consumer goods. Urban marketing centres provide specialized goods and advanced professional services.\nHence, Option {{CORR}} is correct.",
    "Contrasts rural marketing centres with specialized urban marketing centres."
)
add_u6(make_question(CHAPTER_U6, "Marketing Centres", "How do 'Rural Marketing Centres' differ from 'Urban Marketing Centres'?", opts, c, s))

# Q6: Transport Network: Nodes and Links
opts, c, s = rotate_options(
    "A Node is a meeting point of two or more routes or a terminal, while a Link is a route that joins two nodes",
    ["A Node is an oceanic container ship, while a Link is a deep-water harbor", "A Node is an airline passenger, while a Link is a pilot license", "Nodes and Links refer exclusively to computer memory chips"],
    "B",
    "In transport geography, a Node is a meeting point of two or more routes, a point of origin, a point of destination or any sizeable town along a route. Every road that joins two nodes is called a Link.\nHence, Option {{CORR}} is correct.",
    "Defines Nodes (junctions/terminals) and Links (connecting routes) in transport networks."
)
add_u6(make_question(CHAPTER_U6, "Transport Geography", "In the analysis of transport networks, how are 'Nodes' and 'Links' defined?", opts, c, s))

# Q7: Isochrone Lines
opts, c, s = rotate_options(
    "Lines drawn on a map joining places that are equal in terms of the time taken to reach them from a central point",
    ["Lines joining places of equal atmospheric air pressure", "Lines connecting places of identical annual rainfall", "Lines marking the territorial boundary of sovereign countries"],
    "C",
    "Isochrone lines are lines drawn on a map to join places equal in terms of the time taken to reach them from a given central starting point.\nHence, Option {{CORR}} is correct.",
    "Defines Isochrone Lines as lines of equal travel time from a point."
)
add_u6(make_question(CHAPTER_U6, "Transport Mapping", "What are 'Isochrone Lines' used to depict on geographical transport maps?", opts, c, s))

# Q8: Telecommunications definition
opts, c, s = rotate_options(
    "The electrical or optical transmission of messages, words, and data across distances via telegraph, telephone, satellites, and the internet",
    ["Manual postal delivery of handwritten letters by foot messengers", "Broadcasting announcements using temple drums across valleys", "Flashing mirror signals from mountain watchtowers during sunny days"],
    "D",
    "Telecommunications is the transmission of information over significant distances by electronic or optical means (telegraph, telephone, mobile networks, satellites, and the internet), transforming communication speed.\nHence, Option {{CORR}} is correct.",
    "Defines Telecommunications as electronic/optical transmission of messages over distance."
)
add_u6(make_question(CHAPTER_U6, "Communication", "What constitutes the core domain of 'Telecommunications' in modern service infrastructure?", opts, c, s))

# Q9: Mass Media definition
opts, c, s = rotate_options(
    "Communication media like radio, television, newspapers, and the internet that reach vast audiences simultaneously",
    ["Private handwritten diaries locked in family cabinets", "Encrypted diplomatic dispatches exchanged between two embassies", "Face-to-face whispering between two village elders"],
    "A",
    "Mass media refers to communication technologies (print media: newspapers, magazines; electronic media: radio, television, internet) that reach millions of people across the globe at the same time.\nHence, Option {{CORR}} is correct.",
    "Defines Mass Media as communication reaching vast audiences simultaneously."
)
add_u6(make_question(CHAPTER_U6, "Communication", "Which technologies are collectively classified as 'Mass Media'?", opts, c, s))

# Q10: Low-order vs High-order Services
opts, c, s = rotate_options(
    "Low-order services are common everyday needs (grocers, laundries), while High-order services are specialized (physicians, accountants, lawyers)",
    ["Low-order services are practiced only by emperors, while high-order are practiced by slaves", "Low-order services operate in outer space, while high-order operate on ocean floors", "Both are identical and refer exclusively to primary agricultural farming"],
    "B",
    "Low-order services (grocery stores, barbers, laundries) are widespread and used frequently in everyday life. High-order services (physicians, specialized surgeons, lawyers, chartered accountants) are specialized and less frequent.\nHence, Option {{CORR}} is correct.",
    "Distinguishes common low-order services from specialized high-order services."
)
add_u6(make_question(CHAPTER_U6, "Services Classification", "What is the distinction between 'Low-order Services' and 'High-order Services'?", opts, c, s))

# Q11: Informal / Unorganised Sector in Services
opts, c, s = rotate_options(
    "Unregulated, low-wage personal services lacking job security or formal contracts (e.g. domestic servants, cooks, street vendors)",
    ["Tenured university professors and supreme court judges", "Licensed commercial airline pilots operating transatlantic flights", "Civil service administrative permanent secretaries"],
    "C",
    "The informal or unorganised sector comprises low-paid, unregulated personal service workers (domestic helpers, cooks, rickshaw pullers, street hawkers) who have no job security, pension, or formal trade union protections.\nHence, Option {{CORR}} is correct.",
    "Defines the informal service sector: unregulated, low-paid, lacking social security."
)
add_u6(make_question(CHAPTER_U6, "Informal Sector", "What characterizes the 'Informal or Unorganised Sector' in tertiary service provision?", opts, c, s))

# Q12: Mumbai Dabbawalas
opts, c, s = rotate_options(
    "An unorganized personal service of delivering home-cooked lunchboxes to 175,000 office customers daily across Mumbai using suburban trains",
    ["An industrial steel foundry operating in Dharavi slums", "A commercial cargo airline flying freight from Mumbai to London", "A cooperative dairy farm producing pasteurized milk in Gujarat"],
    "D",
    "Mumbai's Dabbawalas represent a world-renowned informal service sector network, delivering freshly cooked lunchboxes from suburban homes to over 175,000 customers in downtown offices using suburban railway trains.\nHence, Option {{CORR}} is correct.",
    "Identifies the Mumbai Dabbawalas as an iconic informal lunchbox delivery service network."
)
add_u6(make_question(CHAPTER_U6, "Informal Services", "What unique service is provided by the world-famous 'Mumbai Dabbawalas' in urban transport geography?", opts, c, s))

# Q13: Tourism: World's Largest Tertiary Activity
opts, c, s = rotate_options(
    "Tourism",
    ["Commercial coal mining", "High-speed rail construction", "Deep-sea pearl diving"],
    "A",
    "Tourism is travel undertaken for purposes of recreation rather than business. It has become the world's single largest tertiary activity in terms of registered jobs (over 250 million) and total revenue generation.\nHence, Option {{CORR}} is correct.",
    "Identifies Tourism as the world's largest tertiary activity by jobs and revenue."
)
add_u6(make_question(CHAPTER_U6, "Tourism", "Which service activity has emerged as the world's single largest tertiary sector in terms of employment and revenue?", opts, c, s))

# Q14: Tourist Attractions factors
opts, c, s = rotate_options(
    "Climate, Landscape, History and Art, and Culture and Economy",
    ["High income tax rates, expensive visas, and frequent curfews", "Air pollution, industrial soot, and lack of hotels", "Dangerous volcanic eruptions and contagious epidemics"],
    "B",
    "The four major factors that attract tourists to any destination are: (1) Climate (warm sunny beaches), (2) Landscape (mountains, lakes), (3) History and art (castles, ancient ruins), and (4) Culture and economy (local festivals, cheap living costs).\nHence, Option {{CORR}} is correct.",
    "Lists the four primary determinants of tourist destination attractiveness."
)
add_u6(make_question(CHAPTER_U6, "Tourism", "What four major factors determine the attractiveness of a destination for global tourists?", opts, c, s))

# Q15: Medical Tourism definition
opts, c, s = rotate_options(
    "When people travel abroad for medical treatment, surgery, or therapy combined with international tourism",
    ["When doctors travel to foreign countries to deliver lectures at medical conferences", "When hospitals export pharmaceuticals using cargo freighters", "When ambulance helicopters transport patients within a city"],
    "C",
    "Medical tourism occurs when people travel to another country for medical treatment, surgeries, or therapies, usually combined with relaxation and sightseeing, driven by world-class treatment at much lower costs.\nHence, Option {{CORR}} is correct.",
    "Defines Medical Tourism as traveling internationally for affordable healthcare and leisure."
)
add_u6(make_question(CHAPTER_U6, "Medical Tourism", "What does the term 'Medical Tourism' refer to in modern healthcare services?", opts, c, s))

# Q16: Major Medical Tourism Destinations
opts, c, s = rotate_options(
    "India, Thailand, Singapore, and Malaysia",
    ["Greenland, Antarctica, Iceland, and Siberia", "Chad, Niger, Mali, and Somalia", "Bolivia, Paraguay, Surinam, and Guyana"],
    "D",
    "India, Thailand, Singapore, and Malaysia have emerged as leading global destinations for medical tourism, attracting patients from USA, Europe, and Africa due to advanced hospitals and affordable surgical costs.\nHence, Option {{CORR}} is correct.",
    "Lists leading Asian medical tourism hubs: India, Thailand, Singapore, Malaysia."
)
add_u6(make_question(CHAPTER_U6, "Medical Tourism", "Which group of Asian countries has emerged as premier global hubs for international medical tourism?", opts, c, s))

# Q17: Quaternary Activities definition
opts, c, s = rotate_options(
    "Knowledge-oriented activities involving the collection, production, processing, and dissemination of information, R&D, and financial consulting",
    ["Extracting crude petroleum from offshore continental shelf wells", "Assembling automotive chassis on mechanized factory lines", "Running a roadside tea stall in a periodic village market"],
    "A",
    "Quaternary activities are knowledge-based activities involving the collection, production, processing, and dissemination of information, research and development (R&D), advanced software, and financial/legal consultancy.\nHence, Option {{CORR}} is correct.",
    "Defines Quaternary Activities as knowledge, information processing, and R&D."
)
add_u6(make_question(CHAPTER_U6, "Quaternary Sector", "What constitutes the core focus of 'Quaternary Activities' in economic geography?", opts, c, s))

# Q18: Quinary Activities definition
opts, c, s = rotate_options(
    "The highest level of decision making and policy formulation by corporate executives, government leaders, scientific advisors, and legal authorities",
    ["Manual agricultural weeding of wet paddy fields using family labor", "Hauling timber logs across frozen Siberian rivers", "Operating spinning looms inside cotton textile factories"],
    "B",
    "Quinary activities represent the highest level of decision makers and policy makers. They focus on the creation, re-arrangement, and evaluation of new and existing ideas, data interpretation, and high-level strategic governance.\nHence, Option {{CORR}} is correct.",
    "Defines Quinary Activities as top-level decision making and strategic policy formulation."
)
add_u6(make_question(CHAPTER_U6, "Quinary Sector", "How are 'Quinary Activities' distinguished from other sectors of the economy?", opts, c, s))

# Q19: Gold Collar Workers
opts, c, s = rotate_options(
    "Professionals engaged in quinary activities (top corporate executives, senior government ministers, research scientists, policy makers)",
    ["Underground gold miners drilling reef veins in South Africa", "Jewelry artisans crafting 24-carat wedding necklaces", "Cashiers operating gold bullion vaults in federal banks"],
    "C",
    "Persons performing quinary activities—the highest level of business executives, government leaders, research scientists, and legal consultants—are designated as 'Gold Collar Workers'.\nHence, Option {{CORR}} is correct.",
    "Identifies top-level quinary decision makers as 'Gold Collar Workers'."
)
add_u6(make_question(CHAPTER_U6, "Labor Classification", "Which elite occupational group is designated by the title 'Gold Collar Workers'?", opts, c, s))

# Q20: Outsourcing / Offshoring
opts, c, s = rotate_options(
    "Contracting out business functions, customer support, or data processing to an outside agency (often in overseas low-cost countries) to reduce operational expenses",
    ["Purchasing 100% of manufacturing raw materials from local domestic farmers", "Banning foreign investment in domestic banking institutions", "Mandatory nationalization of private international software companies"],
    "D",
    "Outsourcing or offshoring is the practice of giving work to an outside agency to improve efficiency and reduce costs. When work is transferred to overseas locations with lower labor costs, it is called offshoring.\nHence, Option {{CORR}} is correct.",
    "Defines Outsourcing / Offshoring as contracting business processes overseas to cut costs."
)
add_u6(make_question(CHAPTER_U6, "Outsourcing", "What does 'Outsourcing' (or Offshoring) mean in the global service economy?", opts, c, s))

# Q21: BPO vs KPO
opts, c, s = rotate_options(
    "BPO involves standardized customer service and data entry, while KPO involves knowledge-intensive research, patent analysis, and legal advice",
    ["BPO is practiced exclusively in outer space, while KPO operates underwater", "BPO deals only with banking, while KPO deals only with kindergarten schools", "Both terms are identical and mean buying airline tickets online"],
    "A",
    "Business Process Outsourcing (BPO) involves routine tasks like call centres, customer support, and payroll. Knowledge Process Outsourcing (KPO) involves high-level knowledge work requiring advanced expertise (R&D, patent analysis, legal research, financial advisory).\nHence, Option {{CORR}} is correct.",
    "Contrasts routine BPO (call centres/data) with knowledge-intensive KPO (R&D/legal/financial)."
)
add_u6(make_question(CHAPTER_U6, "BPO vs KPO", "What is the crucial difference between 'Business Process Outsourcing' (BPO) and 'Knowledge Process Outsourcing' (KPO)?", opts, c, s))

# Q22: Major BPO Destination Countries
opts, c, s = rotate_options(
    "India, the Philippines, China, and Eastern European countries",
    ["Saudi Arabia, Kuwait, Oman, and Qatar", "Norway, Sweden, Finland, and Denmark", "Chad, Niger, Mali, and Mauritania"],
    "B",
    "India, the Philippines, China, and several Eastern European nations have become major global destinations for BPO and IT-enabled services due to their large pools of educated, English-speaking, skilled manpower available at competitive wages.\nHence, Option {{CORR}} is correct.",
    "Lists premier global BPO destinations: India, Philippines, China, Eastern Europe."
)
add_u6(make_question(CHAPTER_U6, "Outsourcing Destinations", "Which group of nations represents the premier destinations for global Business Process Outsourcing (BPO)?", opts, c, s))

# Q23: Digital Divide
opts, c, s = rotate_options(
    "The uneven distribution and access to Information and Communication Technology (ICT) across different countries and regions",
    ["The physical distance between two computer manufacturing factories", "The numerical difference between analog radios and digital televisions", "The arithmetic gap between prime numbers in cryptography"],
    "C",
    "The 'Digital Divide' refers to the wide disparities in access to information and communication technology (ICT) and the internet between developed and developing nations, as well as between urban and rural areas within nations.\nHence, Option {{CORR}} is correct.",
    "Defines the Digital Divide as unequal access to ICT across regions and social strata."
)
add_u6(make_question(CHAPTER_U6, "Digital Divide", "What does the concept of 'Digital Divide' denote in modern communications geography?", opts, c, s))

# Q24: Quaternary Sector in Advanced Economies
opts, c, s = rotate_options(
    "Over half of all workers are employed in knowledge, service, and information management activities",
    ["95% of workers are manual agricultural shifting cultivators", "All workers are employed in underground coal mining pits", "No citizens work because automated robots have eliminated all human employment"],
    "D",
    "In highly developed economies (USA, Western Europe, Japan), more than half of the workforce is engaged in the service, quaternary, and knowledge sectors, reflecting post-industrial economic transformation.\nHence, Option {{CORR}} is correct.",
    "Highlights the dominance of quaternary and service employment in advanced post-industrial economies."
)
add_u6(make_question(CHAPTER_U6, "Post-Industrial Economy", "What proportion of the workforce is typically employed in the tertiary, quaternary, and knowledge sectors in advanced post-industrial economies?", opts, c, s))

# Q25: Departmental Stores vs Chain Stores
opts, c, s = rotate_options(
    "Departmental stores delegate management to separate departments under one roof, while Chain stores operate multiple standardized retail outlets across different cities",
    ["Departmental stores sell only military weapons, while chain stores sell iron chains", "Departmental stores operate only online, while chain stores are rural periodic markets", "Both are identical and refer exclusively to postal courier vans"],
    "A",
    "A departmental store delegates responsibility and authority for all aspects of buying and selling to department heads under one large building. Chain stores operate numerous standardized retail outlets in different cities coordinated by a central headquarters.\nHence, Option {{CORR}} is correct.",
    "Distinguishes single-roof Departmental Stores from multi-location Chain Stores."
)
add_u6(make_question(CHAPTER_U6, "Retail Organizations", "How do 'Departmental Stores' differ from 'Chain Stores' in retail trading?", opts, c, s))

# Q26: Consumer Cooperatives
opts, c, s = rotate_options(
    "Retail societies organized and owned by consumers to buy goods in bulk and sell to members at fair prices without middleman markups",
    ["State military supply depots strictly reserved for army officers", "Monopolistic multinational supermarket syndicates operating offshore", "Private loan shark agencies operating in rural villages"],
    "B",
    "Consumer cooperatives are formed voluntarily by consumers to procure goods directly from manufacturers in bulk, eliminating middleman profits and providing quality goods to members at fair prices.\nHence, Option {{CORR}} is correct.",
    "Defines Consumer Cooperatives as consumer-owned retail bodies eliminating middlemen."
)
add_u6(make_question(CHAPTER_U6, "Retail Organizations", "What is the primary operational objective of a 'Consumer Cooperative' in retail trade?", opts, c, s))

# Q27: Mail-order Houses
opts, c, s = rotate_options(
    "Selling goods by post or courier without physical shops, using printed catalogues or internet orders with delivery to doorsteps",
    ["Sending personal love letters to pen pals across oceans", "Operating telegraph machines at frontier railway stations", "Printing postage stamps for national governments"],
    "C",
    "Mail-order retail involves advertising goods through catalogues, circulars, or websites, receiving orders by mail/telephone/internet, and dispatching products directly by postal or courier services.\nHence, Option {{CORR}} is correct.",
    "Describes Mail-order Houses as non-store retail based on catalog/internet ordering."
)
add_u6(make_question(CHAPTER_U6, "Retail Channels", "How do 'Mail-Order Houses' conduct their retail trading business?", opts, c, s))

# Q28: Home Shopping / E-commerce
opts, c, s = rotate_options(
    "Ordering consumer products through television channels, mobile apps, or websites and paying via electronic payment or cash-on-delivery",
    ["Constructing prefabricated residential houses in factory yards", "Selling residential real estate apartments through auction houses", "Cleaning household floors using vacuum sweepers"],
    "D",
    "Home shopping and e-commerce allow consumers to view, select, and purchase goods through television channels, websites, and mobile applications, receiving delivery directly at home.\nHence, Option {{CORR}} is correct.",
    "Defines Home Shopping and E-Commerce as digital remote purchasing."
)
add_u6(make_question(CHAPTER_U6, "Modern Retail", "What characterizes 'Home Shopping' and 'E-Commerce' in contemporary service distribution?", opts, c, s))

# Q29: Wholesale Market Function
opts, c, s = rotate_options(
    "Extends credit to retail stores and buys directly from primary producers in bulk, holding large buffer inventories",
    ["Sells single pencils directly to primary school children", "Prohibits all commercial transactions involving currency", "Operates exclusively on weekends inside rural church courtyards"],
    "A",
    "Wholesalers buy directly from large manufacturers or agricultural producers in bulk, maintain large warehouses, and extend financial credit to retail stores, acting as vital links in the supply chain.\nHence, Option {{CORR}} is correct.",
    "Explains the wholesaler's role: bulk purchasing, inventory holding, and credit extension."
)
add_u6(make_question(CHAPTER_U6, "Wholesale Trading", "What critical financial and logistical role does a 'Wholesaler' perform in commercial trade networks?", opts, c, s))

# Q30: Match Economic Sectors with Collar Codes
add_u6(make_match_question(
    CHAPTER_U6, "Collar Color Codes",
    "Match List I (Economic Activity / Sector) with List II (Associated Collar Designation):",
    [("A", "Primary Activities (outdoor agriculture/mining)"), ("B", "Secondary Activities (factory assembly manual labor)"), ("C", "Quaternary Activities (knowledge/R&D professionals)"), ("D", "Quinary Activities (top policy & strategic decision makers)")],
    [("I", "Blue Collar"), ("II", "Gold Collar"), ("III", "Red Collar"), ("IV", "White Collar")],
    "A-III, B-I, C-IV, D-II", "B",
    "Primary activities are Red Collar (III); Secondary factory labor is Blue Collar (I); Quaternary professionals are White Collar (IV); Quinary decision makers are Gold Collar (II).",
    "Correctly correlates economic sectors with established color collar designations."
))

# Q31: Match Service Sectors with Professional Examples
add_u6(make_match_question(
    CHAPTER_U6, "Service Classifications",
    "Match List I (Sector of Activities) with List II (Representative Professional Role):",
    [("A", "Tertiary (Low-order personal)"), ("B", "Tertiary (High-order professional)"), ("C", "Quaternary"), ("D", "Quinary")],
    [("I", "Specialized cardiac surgeon / corporate tax attorney"), ("II", "Software algorithm architect / patent researcher"), ("III", "Barber / dry-cleaner / domestic cook"), ("IV", "National cabinet minister / multinational Chief Executive Officer")],
    "A-III, B-I, C-II, D-IV", "C",
    "Low-order tertiary includes barber/cook (III); High-order tertiary includes surgeon/attorney (I); Quaternary includes software architect/patent researcher (II); Quinary includes cabinet minister/CEO (IV).",
    "Matches service and knowledge activity sectors with representative professions."
))

# Q32: Statement on BPO and Global Time Zones
add_u6(make_statement_question(
    CHAPTER_U6, "Outsourcing Geography",
    "Differences in global time zones allow outsourcing firms in India to process financial transactions while American clients are asleep.",
    "Outsourcing is restricted exclusively to countries that share an identical time zone with London.",
    3, "D",
    "Statement I is correct: time-zone differentials between the USA/Europe and Asia (like India and the Philippines) enable 24-hour round-the-clock business workflows. Statement II is false: outsourcing thrives precisely because of diverse time zones.",
    "Analyzes the strategic commercial advantage of global time-zone differentials in BPO."
))

# Q33: Assertion-Reason on Medical Tourism Growth in India
add_u6(make_assertion_question(
    CHAPTER_U6, "Medical Tourism",
    "India has become one of the premier global destinations for medical tourism.",
    "India offers world-class medical facilities and accredited surgical specialists at a fraction of the cost incurred in Western nations.",
    1, "A",
    "Both Assertion and Reason are true, and Reason is the correct explanation. High-end diagnostic facilities, skilled doctors, and low surgical costs attract thousands of patients from North America, Europe, and Africa to Indian hospitals.",
    "Explains why cost differentials and advanced medical care drive medical tourism to India."
))

# Q34: Multi-statement on Tourism Economic Significance
add_u6(make_multi_statement_question(
    CHAPTER_U6, "Tourism Economics",
    "Which of the following statements regarding the economic significance of tourism are correct?",
    [
        ("A", "It provides direct employment to hoteliers, transport operators, guides, and restaurant staff."),
        ("B", "It stimulates local craft, souvenir, and cultural entertainment industries."),
        ("C", "Infrastructure built for tourism (airports, highways, water supply) benefits the local resident population."),
        ("D", "Tourism eliminates all need for agriculture and food production in destination regions.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C are well-documented positive economic impacts of tourism. Statement D is false because tourism increases demand for local agricultural fresh produce, vegetables, and dairy products.",
    "Evaluates the multifaceted socio-economic benefits of the tourism industry."
))

# Q35: Home stay / Bed & Breakfast tourism in India
opts, c, s = rotate_options(
    "Heritage homes in Goa, houseboats (Kettuvallams) in Kerala, and farm stays in Himachal Pradesh",
    ["Underground bunkers in the Thar desert", "Offshore oil drilling platforms in the Arabian Sea", "Uninhabited mangrove mudflats in the Sundarbans"],
    "C",
    "Community and heritage tourism has popularized home-stays, such as traditional houseboats (Kettuvallams) in Kerala backwaters, heritage Portuguese homes in Goa, and orchard farm-stays in Himachal Pradesh.\nHence, Option {{CORR}} is correct.",
    "Lists prominent Indian regions pioneering heritage homestays and ecotourism."
)
add_u6(make_question(CHAPTER_U6, "Eco-Tourism", "Which regional accommodation models exemplify successful community-based heritage tourism in India?", opts, c, s))

# Q36: Personal Services vs Business Services
opts, c, s = rotate_options(
    "Personal services are tailored to individual consumer needs, while Business services facilitate commercial enterprise operations (e.g. advertising, auditing)",
    ["Personal services are operated by the military, while business services are operated by farmers", "Personal services are illegal in all democratic nations", "Both are identical and refer exclusively to postal letter delivery"],
    "D",
    "Personal services cater directly to individual consumers (domestic help, laundry, salons). Business services facilitate enterprise operations, such as advertising, legal counsel, auditing, marketing, and equipment maintenance.\nHence, Option {{CORR}} is correct.",
    "Contrasts consumer-oriented Personal Services with enterprise-oriented Business Services."
)
add_u6(make_question(CHAPTER_U6, "Service Classifications", "How do 'Personal Services' differ from 'Business Services' in tertiary geography?", opts, c, s))

# Q37: Periodic market cycle
opts, c, s = rotate_options(
    "Held on specific days of the week, allowing traveling traders to set up stalls in a planned regional circuit across adjacent villages",
    ["Operates continuously 24 hours a day without any break for 100 years", "Held exclusively once every century during solar eclipses", "Operates only inside high-speed international trains"],
    "A",
    "Periodic markets operate on specific days of the week (e.g. Monday market, Thursday market), forming a temporal and spatial circuit that allows traveling shopkeepers to rotate across neighboring settlements.\nHence, Option {{CORR}} is correct.",
    "Explains the weekly rotating spatial circuit of rural periodic markets."
)
add_u6(make_question(CHAPTER_U6, "Rural Marketing", "Why do periodic markets in rural areas follow a weekly rotating cyclical schedule?", opts, c, s))

# Q38: Consumer durables in retail
opts, c, s = rotate_options(
    "Goods that do not quickly wear out and yield utility over long periods (refrigerators, automobiles, televisions, furniture)",
    ["Fresh perishable milk and green vegetables", "Paper handkerchiefs and disposable paper cups", "Freshly baked bread and ice cream cones"],
    "B",
    "Consumer durables are long-lasting manufactured goods that do not have to be purchased frequently because they yield utility over a significant lifespan (automobiles, refrigerators, television sets, furniture).\nHence, Option {{CORR}} is correct.",
    "Defines Consumer Durables as long-lasting goods providing multi-year utility."
)
add_u6(make_question(CHAPTER_U6, "Retail Commodities", "What are 'Consumer Durables' in commercial retail trade?", opts, c, s))

# Q39: Non-durables / FMCG
opts, c, s = rotate_options(
    "Fast Moving Consumer Goods consumed immediately or within a short time (toothpaste, soap, milk, bread)",
    ["Steel suspension bridges across wide sea straits", "Hydroelectric water turbine generators", "Commercial wide-body jet aircraft"],
    "C",
    "Fast Moving Consumer Goods (FMCG) or non-durables are products that have a quick turnover and are consumed rapidly in everyday household life (toiletries, packaged food, soap, milk).\nHence, Option {{CORR}} is correct.",
    "Identifies everyday non-durables / FMCG products."
)
add_u6(make_question(CHAPTER_U6, "Retail Commodities", "Which of the following belongs to the category of 'Fast Moving Consumer Goods' (FMCG)?", opts, c, s))

# Q40: Quaternary sector and Information Age
opts, c, s = rotate_options(
    "Information and knowledge have replaced physical raw materials as the primary source of economic wealth and strategic power",
    ["Society has completely abandoned electricity and computer technology", "Raw agricultural wheat grain is the sole currency accepted for international trade", "All books and written knowledge have been banned globally"],
    "D",
    "In the Information Age, quaternary activities have made intellectual capital, data analytics, software algorithms, and scientific knowledge the paramount drivers of economic productivity and national power.\nHence, Option {{CORR}} is correct.",
    "Describes how knowledge and information have become the prime source of wealth in the Quaternary era."
)
add_u6(make_question(CHAPTER_U6, "Information Economy", "Why is the expansion of the 'Quaternary Sector' considered the hallmark of the modern Information Age?", opts, c, s))

# Q41: Data Processing Outsourcing
opts, c, s = rotate_options(
    "Back-office operations like medical transcription, digitizing tax records, and payroll accounting",
    ["Manual construction of brick walls on suburban housing sites", "Physical harvesting of sugarcane in tropical fields", "Driving heavy diesel trucks across mountain passes"],
    "A",
    "Back-office outsourcing includes routine, standardized data processing such as medical transcription, credit card reconciliation, customer record digitization, and payroll administration.\nHence, Option {{CORR}} is correct.",
    "Lists back-office data processing tasks commonly outsourced overseas."
)
add_u6(make_question(CHAPTER_U6, "Back-Office Outsourcing", "Which tasks constitute classic examples of back-office 'Data Processing Outsourcing'?", opts, c, s))

# Q42: KPO specialization: Patent Analysis
opts, c, s = rotate_options(
    "Evaluating prior art, intellectual property legality, and technological novelty before filing patent applications",
    ["Printing postage stamps on government letterheads", "Cleaning laboratory glassware with distilled water", "Packing manufactured toys in cardboard cartons"],
    "B",
    "Patent analysis in KPO requires highly trained scientists, engineers, and patent attorneys to evaluate technological novelty, search global patent databases, and draft intellectual property claims.\nHence, Option {{CORR}} is correct.",
    "Explains patent analysis as a high-skill Knowledge Process Outsourcing specialization."
)
add_u6(make_question(CHAPTER_U6, "KPO Specialization", "What does 'Patent Analysis' involve as a specialized Knowledge Process Outsourcing (KPO) service?", opts, c, s))

# Q43: R&D in Quaternary activities
opts, c, s = rotate_options(
    "Research and Development: systematic creative work to increase scientific knowledge and devise new applications",
    ["Railway and Delivery: loading parcel packages onto freight cars", "Recreation and Dancing: choreographing festival stage performances", "Refining and Drilling: extracting oil from offshore platforms"],
    "C",
    "In quaternary activities, R&D stands for Research and Development—systematic investigation aimed at discovering new knowledge, developing innovative materials, software, pharmaceuticals, and engineering designs.\nHence, Option {{CORR}} is correct.",
    "Defines Research and Development (R&D) in the quaternary knowledge economy."
)
add_u6(make_question(CHAPTER_U6, "Quaternary Sector", "What is the primary role of 'Research and Development' (R&D) within the quaternary sector?", opts, c, s))

# Q44: Call Centers / Customer Contact Centers
opts, c, s = rotate_options(
    "Centralized offices used for receiving or transmitting large volumes of requests by telephone for customer support and sales",
    ["Offices where telephone hardware cables are physically soldered by hand", "Radio transmission stations broadcasting military naval sonar", "Underground emergency fallout shelters equipped with landlines"],
    "D",
    "Call centres or customer contact centres handle inbound customer queries, technical assistance, telemarketing, and order processing using high-speed telecommunications networks.\nHence, Option {{CORR}} is correct.",
    "Defines Call Centers as centralized telephone-based customer service hubs."
)
add_u6(make_question(CHAPTER_U6, "BPO Services", "What is the operational function of 'Customer Contact Centers' (Call Centers) in the global services trade?", opts, c, s))

# Q45: Factors of Tourism: Climate in Western Europe
opts, c, s = rotate_options(
    "Tourists from cold, overcast Northern Europe seek the warm, sunny Mediterranean Mediterranean beaches in summer",
    ["Tourists from Mediterranean beaches travel to Northern Europe to seek blizzards", "Tourists seek out tropical cyclones and monsoons", "Tourists travel only to places with 100% cloud cover and continuous rainfall"],
    "A",
    "Climate is a major pull factor in tourism. People from colder, cloudier northern climates (UK, Germany, Scandinavia) travel in summer to the warm, sunny Mediterranean coasts of Spain, Italy, and Greece for warmth and sunshine.\nHence, Option {{CORR}} is correct.",
    "Explains the climate pull factor attracting Northern Europeans to the sunny Mediterranean."
)
add_u6(make_question(CHAPTER_U6, "Tourism Drivers", "Why do millions of tourists from Northern and Western Europe migrate annually to the Mediterranean coastlines in summer?", opts, c, s))

# Q46: Heritage Tourism
opts, c, s = rotate_options(
    "Travel aimed at experiencing the places, artifacts, monuments, and authentic activities that represent the historical and cultural identity of a people",
    ["Visiting ultramodern electronic mega-malls to buy discounted computers", "Traveling exclusively to gamble in casino resorts", "Attending deep-sea scuba diving lessons on coral reefs"],
    "B",
    "Heritage tourism focuses on visiting historic monuments, archaeological ruins, ancient temples, castles, battlefields, and UNESCO World Heritage sites to experience cultural history.\nHence, Option {{CORR}} is correct.",
    "Defines Heritage Tourism as travel centered on historical monuments and cultural heritage."
)
add_u6(make_question(CHAPTER_U6, "Tourism Types", "What is meant by 'Heritage Tourism' in contemporary travel geography?", opts, c, s))

# Q47: Adventure Tourism
opts, c, s = rotate_options(
    "Travel involving exploration or travel with perceived risk, outdoor physical activity, and wilderness contact (e.g. trekking, mountaineering, rafting)",
    ["Resting in indoor air-conditioned hotel suites watching television", "Visiting indoor botanical greenhouses in botanical gardens", "Attending business conferences in convention halls"],
    "C",
    "Adventure tourism involves travel to remote, rugged destinations involving physical challenge, excitement, and wilderness elements such as mountaineering, whitewater rafting, paragliding, and desert safaris.\nHence, Option {{CORR}} is correct.",
    "Defines Adventure Tourism as physically challenging outdoor recreation in rugged terrain."
)
add_u6(make_question(CHAPTER_U6, "Tourism Types", "Which of the following activities is characteristic of 'Adventure Tourism'?", opts, c, s))

# Q48: Eco-Tourism
opts, c, s = rotate_options(
    "Responsible travel to natural areas that conserves the environment, sustains the well-being of the local people, and involves education",
    ["Hunting endangered wildlife for commercial trophy exports", "Constructing multi-story concrete mega-casinos inside national parks", "Dumping industrial chemical waste into scenic mountain streams"],
    "D",
    "Eco-tourism emphasizes responsible, sustainable travel to pristine natural areas, minimizing ecological footprints, conserving biodiversity, and supporting local indigenous communities.\nHence, Option {{CORR}} is correct.",
    "Defines Eco-Tourism as environmentally responsible, conservation-oriented travel."
)
add_u6(make_question(CHAPTER_U6, "Tourism Types", "What is the core philosophy of 'Eco-Tourism' in environmental geography?", opts, c, s))

# Q49: Telecommunications and Global Village
opts, c, s = rotate_options(
    "Marshall McLuhan",
    ["David Harvey", "Manuel Castells", "Edward Soja"],
    "A",
    "The phrase 'Global Village', describing how telecommunications and mass media collapse physical space and interconnect all humanity instantaneously, was coined by Canadian communications theorist Marshall McLuhan.\nHence, Option {{CORR}} is correct.",
    "Attributes the term 'Global Village' to communications theorist Marshall McLuhan."
)
add_u6(make_question(CHAPTER_U6, "Communications Theory", "Who coined the famous phrase 'Global Village' to describe the transformative impact of telecommunications and electronic media?", opts, c, s))

# Q50: Cyber Space / Internet
opts, c, s = rotate_options(
    "An electronic, virtual world of computers and networks where information moves without physical terrestrial travel",
    ["An underground tunnel network used by supersonic maglev trains", "An orbital space station operated exclusively by international astronomers", "An ocean trench located 11,000 meters beneath the Pacific Ocean"],
    "B",
    "Cyberspace is the electronic virtual world of computer networks, the internet, and digital communications, allowing instantaneous transfer of information regardless of physical terrestrial distance.\nHence, Option {{CORR}} is correct.",
    "Defines Cyberspace as the electronic virtual network of digital information."
)
add_u6(make_question(CHAPTER_U6, "Cyberspace", "How is 'Cyberspace' defined in the geography of modern telecommunications?", opts, c, s))

# Q51: Match Tourism Types with Representative Examples
add_u6(make_match_question(
    CHAPTER_U6, "Typologies of Tourism",
    "Match List I (Type of Tourism) with List II (Representative Destination / Experience):",
    [("A", "Medical Tourism"), ("B", "Heritage Tourism"), ("C", "Adventure Tourism"), ("D", "Eco-Tourism")],
    [("I", "Visiting the Taj Mahal and historic forts of Rajasthan"), ("II", "Undergoing affordable heart bypass surgery in Chennai or Bangkok"), ("III", "Wildlife safari in Kenya or birdwatching in Costa Rican cloud forests"), ("IV", "Himalayan mountaineering and whitewater rafting in Rishikesh")],
    "A-II, B-I, C-IV, D-III", "C",
    "Medical tourism is surgery in Chennai/Bangkok (II); Heritage is Taj Mahal/Rajasthan forts (I); Adventure is mountaineering/rafting in Rishikesh (IV); Eco-tourism is wildlife in Kenya/Costa Rica (III).",
    "Correctly connects tourism categories with their authentic geographic destinations."
))

# Q52: Statement on Digital Divide between Nations
add_u6(make_statement_question(
    CHAPTER_U6, "Digital Divide",
    "Wide-ranging disparities in access to information and communication technologies exist between developed and developing nations.",
    "Within developing countries, rural and peripheral regions often have identical digital connectivity and internet speeds to metropolitan business districts.",
    3, "D",
    "Statement I is correct: high-income nations enjoy near-universal digital access while developing nations lag. Statement II is false: within nations, a severe digital divide exists between well-connected metropolises and marginalized rural villages.",
    "Evaluates the dual global and internal dimensions of the Digital Divide."
))

# Q53: Assertion-Reason on Quaternary Services Concentration
add_u6(make_assertion_question(
    CHAPTER_U6, "Quaternary Clustering",
    "Quaternary and high-level knowledge activities exhibit a strong tendency to cluster in major metropolitan centres and university cities.",
    "Major metropolises and university hubs provide rich talent pools of highly educated researchers, advanced telecommunications infrastructure, and venture capital.",
    1, "A",
    "Both Assertion and Reason are true, and Reason is the correct explanation. Knowledge-based activities thrive on human capital, research universities, high-speed optical infrastructure, and face-to-face networking found in metropolitan centers.",
    "Explains the metropolitan clustering of quaternary knowledge industries."
))

# Q54: Multi-statement on Tertiary Sector Growth
add_u6(make_multi_statement_question(
    CHAPTER_U6, "Service Sector Growth",
    "Which of the following factors explain the rapid expansion of the tertiary service sector in modern economies?",
    [
        ("A", "Rising per capita incomes leading to greater demand for leisure, dining, travel, and personal care."),
        ("B", "Growing complexity of modern industrial enterprises requiring specialized accounting, legal, and advertising support."),
        ("C", "Expansion of public provision in healthcare, universal schooling, and municipal services."),
        ("D", "Complete abandonment of all mechanical machinery in factories.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C are classic macroeconomic drivers of tertiary growth. Statement D is false because modern factories are more automated and mechanized than ever before.",
    "Identifies valid structural reasons for the expansion of the tertiary service economy."
))

# Q55: Offshoring vs Onshoring
opts, c, s = rotate_options(
    "Offshoring relocates business processes to a foreign overseas country, while Onshoring keeps them within domestic borders",
    ["Offshoring is restricted to marine fishing, while onshoring is restricted to wheat farming", "Offshoring is illegal under international maritime law", "Both are identical and mean sailing a container ship onto the beach"],
    "C",
    "Offshoring means moving business operations or services overseas (often to low-cost developing countries). Onshoring refers to keeping or returning those operations within the home country.\nHence, Option {{CORR}} is correct.",
    "Differentiates Offshoring (overseas relocation) from Onshoring (domestic retention)."
)
add_u6(make_question(CHAPTER_U6, "Sourcing Strategies", "What is the distinction between 'Offshoring' and 'Onshoring' in global service delivery?", opts, c, s))

# Q56: Footloose nature of Quaternary activities
opts, c, s = rotate_options(
    "They rely on electronic data transmission and can be carried out anywhere with high-speed internet and computer terminals",
    ["They require heavy blast furnaces and thousands of tons of coking coal", "They must be situated inside underground gold mines", "They can only operate on floating oceanic oil rigs"],
    "D",
    "Because quaternary activities process intangible information and software rather than bulky raw materials, they are highly footloose and can be located anywhere with reliable internet, electricity, and skilled human talent.\nHence, Option {{CORR}} is correct.",
    "Explains why quaternary knowledge activities enjoy footloose spatial mobility."
)
add_u6(make_question(CHAPTER_U6, "Quaternary Location", "Why do quaternary knowledge activities possess high spatial flexibility and footloose mobility?", opts, c, s))

# Q57: Wholesale Trading without physical shops
opts, c, s = rotate_options(
    "Wholesale transactions are conducted through warehouses, depots, and electronic commodity exchanges without walk-in retail shopfronts",
    ["Wholesale trading occurs only in outdoor street hawker pushcarts", "Wholesale trading is conducted only by door-to-door salespersons", "Wholesale trading operates only inside passenger bus terminals"],
    "A",
    "Wholesale trading does not require prominent retail storefronts; it operates through large storage warehouses, logistics depots, and bulk institutional sales.\nHence, Option {{CORR}} is correct.",
    "Describes the warehouse-and-depot operational structure of wholesale trading."
)
add_u6(make_question(CHAPTER_U6, "Wholesale Logistics", "How does the physical infrastructure of wholesale trade differ from consumer retail storefronts?", opts, c, s))

# Q58: Sequence of Economic Sector Dominance
add_u6(make_sequence_question(
    CHAPTER_U6, "Economic Transition",
    "Arrange the sectors of economic activity in the sequence of their historical dominance in national employment as countries develop:",
    [("A", "Tertiary and Quaternary (Services & Knowledge)"), ("B", "Primary (Agriculture & Mining)"), ("C", "Secondary (Manufacturing & Industry)")],
    "B, C, A", "B",
    "1. In early stages, Primary sector employs the vast majority of people (B).\n2. With industrialization, Secondary sector grows to dominate employment (C).\n3. In advanced post-industrial stages, Tertiary and Quaternary sectors dominate employment (A).",
    "Traces the classic Fisher-Clark three-sector transition model."
))

# Q59: Quinary Policy Makers example
opts, c, s = rotate_options(
    "Chief Justice of the Supreme Court, Central Bank Governors, and Presidential Scientific Advisory Councils",
    ["Tractor mechanics in rural repair garages", "Cashiers operating grocery checkout barcode scanners", "Manual baggage porters at railway stations"],
    "C",
    "Quinary activities encompass the apex leaders who formulate foundational legal, economic, scientific, and constitutional policies: Supreme Court justices, central bank governors, and cabinet ministers.\nHence, Option {{CORR}} is correct.",
    "Identifies institutional apex leaders performing quinary decision-making roles."
)
add_u6(make_question(CHAPTER_U6, "Quinary Examples", "Which of the following professional roles represents an authentic example of 'Quinary Activity'?", opts, c, s))

# Q60: Tourism Multiplier Effect
opts, c, s = rotate_options(
    "Money spent by tourists circulates through the local economy, creating secondary rounds of income and employment in farming, construction, and transport",
    ["The physical multiplication of hotel rooms by dividing existing rooms with plywood", "The automatic doubling of airline flight speeds during tourist season", "The printing of counterfeit tourist currency by municipal authorities"],
    "D",
    "The tourism multiplier effect refers to how tourist spending ripples through the local economy, generating indirect income for local farmers who supply food, construction workers who build resorts, and transport drivers.\nHence, Option {{CORR}} is correct.",
    "Defines the Tourism Multiplier Effect as circulating expenditure generating secondary local incomes."
)
add_u6(make_question(CHAPTER_U6, "Tourism Economics", "What is meant by the 'Tourism Multiplier Effect' in regional economic development?", opts, c, s))

validate_and_collect(u6_qs, u6_seen)
assert len(u6_qs) == 60
with open("mock/geo_units/unit6.json", "w", encoding="utf-8") as f:
    json.dump(u6_qs, f, indent=2, ensure_ascii=False)
print("Unit 6 generated: 60 questions")
print("Total questions in part_a2:", len(u4_qs) + len(u5_qs) + len(u6_qs))
