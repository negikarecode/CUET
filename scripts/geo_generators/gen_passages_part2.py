import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.geo_generators.common import (
    normalize_text,
    get_pyq_normalized_set,
    rotate_options,
    make_question
)

pyq_seen = get_pyq_normalized_set()
global_seen = set()

# Preload all 800 questions from units 1 to 14
for i in range(1, 15):
    p = f"mock/geo_units/unit{i}.json"
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data:
                global_seen.add(normalize_text(item.get("questionText", "")))

# Preload passages part 1
p1_path = "mock/geo_units/passages_part1.json"
passages_part1 = []
if os.path.exists(p1_path):
    with open(p1_path, "r", encoding="utf-8") as f:
        passages_part1 = json.load(f)
        for item in passages_part1:
            global_seen.add(normalize_text(item.get("questionText", "")))

print(f"Loaded {len(global_seen)} questions into global_seen (including {len(passages_part1)} from Passages Part 1).")

passages_part2 = []
seen_part2 = set()

def add_p(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_part2:
        raise ValueError(f"Duplicate within passages part 2: {q['questionText'][:80]}")
    if norm in global_seen:
        raise ValueError(f"Cross-mock duplicate: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate: {q['questionText'][:80]}")
    seen_part2.add(norm)
    global_seen.add(norm)
    assert len(q["options"]) == 4
    assert q["correctOption"] in ["A", "B", "C", "D"]
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"]
    passages_part2.append(q)

def make_pq(chap, topic, p_text, stem, corr_t, wr_t, target_opt, sol_t, mist):
    full_prompt = (
        f"Read the following passage carefully and answer the question that follows:\n\n"
        f"\"{p_text.strip()}\"\n\n"
        f"Question: {stem}"
    )
    opts, c, s = rotate_options(corr_t, wr_t, target_opt, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    return {
        "chapter": chap,
        "topic": topic,
        "questionText": full_prompt,
        "options": opts,
        "correctOption": c,
        "detailedSolution": s
    }

# =================================================================================================
# PASSAGE 21: High-Technology Industry and Technopolies (Book 1, Chapter 6)
# =================================================================================================
P21_TEXT = """High-technology, or simply high-tech, is the latest generation of manufacturing activities. It is best understood as the application of intensive research and development (R&D) efforts leading to the manufacture of products of an advanced scientific and engineering character. Professional (white-collar) workers make up a large share of the total workforce, outnumbering production (blue-collar) workers. Highly skilled specialists who formulate innovative processes are termed 'golden-collar' professionals. Robotics on the assembly line, computer-aided design (CAD) and manufacturing, and electronic controls are typical high-tech hallmarks. High-tech industries that are regionally concentrated, self-sustained, and highly specialized are called 'technopolies'. World-famous examples include Silicon Valley near San Francisco and Route 128 near Boston. Rather than dirty smoke-stacks and expansive slag heaps, high-tech industrial landscapes feature modern, low-density office parks and landscaped campuses."""

add_p(make_pq(
    "Secondary Activities", "High-Tech Characteristics", P21_TEXT,
    "What distinctive workforce characteristic characterizes high-technology manufacturing industries?",
    "White-collar and highly skilled technical professionals outnumber blue-collar assembly floor workers",
    ["Almost all workers are illiterate manual agricultural labourers", "Total absence of any research and development engineers", "Child labour performing unmechanized craft weaving"],
    "A",
    "In high-tech industries, professional white-collar R&D researchers and engineers constitute the majority of personnel.",
    "Identifies white-collar specialists outnumbering blue-collar workers."
))

add_p(make_pq(
    "Secondary Activities", "Golden-Collar Workers", P21_TEXT,
    "Which occupational group is specifically referred to as 'golden-collar' workers in advanced industrial geography?",
    "Highly specialized scientific researchers, software architects, and policy innovators in quaternary and quinary sectors",
    ["Underground coal face diggers working in dark pits", "Commercial sea divers harvesting wild pearls", "Manual sweepers cleaning city municipal roadways"],
    "B",
    "Golden-collar professionals represent the highest echelon of knowledge creators, scientists, executive consultants, and innovators.",
    "Identifies highly skilled scientific researchers and policy innovators as golden-collar workers."
))

add_p(make_pq(
    "Secondary Activities", "Technopoly Concept", P21_TEXT,
    "What geographical term describes regionally concentrated, self-sustaining high-tech industrial agglomerations?",
    "Technopolies (or Science Parks)",
    ["Rust Belts", "Plantation Enclaves", "Cottage Clusters"],
    "C",
    "A technopoly is a regional cluster of high-tech firms, universities, and research institutes (e.g., Silicon Valley).",
    "Identifies technopolies as concentrated high-tech clusters."
))

add_p(make_pq(
    "Secondary Activities", "World Technopoly Examples", P21_TEXT,
    "Which pair of regions represents the classic, globally renowned high-tech technopolies in the United States?",
    "Silicon Valley near San Francisco and Route 128 near Boston",
    ["The Rust Belt around Pittsburgh and Lake Erie", "Appalachian coal valleys of West Virginia", "Mississippi delta cotton plantations in Louisiana"],
    "D",
    "Silicon Valley (San Jose/San Francisco) and Route 128 (Boston) are the archetype technopolies of the world.",
    "Identifies Silicon Valley and Route 128 as premier US technopolies."
))

add_p(make_pq(
    "Secondary Activities", "High-Tech Landscape", P21_TEXT,
    "How does the visual landscape of a high-tech industrial park differ from traditional smokestack heavy industry?",
    "It features modern, spacious, low-density planned office campuses surrounded by green landscaping rather than smoking chimneys",
    ["It is covered in thick soot, towering slag heaps, and polluted railway sidings", "It consists entirely of open paddy fields with thatched huts", "It is located exclusively inside subterranean abandoned iron mines"],
    "A",
    "High-tech parks present neat, landscaped, campus-style architectures with clean laboratory environments.",
    "Contrasts high-tech office campus landscape with dirty smokestack heavy industry."
))

# =================================================================================================
# PASSAGE 22: Coffee Cultivation in Southern India (Book 2, Chapter 5)
# =================================================================================================
P22_TEXT = """Coffee is a tropical plantation crop cultivated on well-drained highland slopes in southern India. The crop was initially introduced into India by the Sufi saint Baba Budan in the seventeenth century, who planted coffee beans brought from Yemen on the Baba Budan Giri hills of Chikmagalur. Coffee requires warm and humid climate with temperatures between 15°C and 28°C, and rainfall ranging between 150 cm and 250 cm. It cannot endure direct scorching sunlight or severe frost; hence, coffee bushes are grown under the protective canopy of tall evergreen shade trees. India primarily produces high-quality mild coffees that are in great demand in international markets. The two major cultivated varieties are Arabica (superior quality with fine floral aroma) and Robusta (hardier with higher caffeine content). Karnataka alone accounts for more than two-thirds of India's total coffee production, followed by Kerala and Tamil Nadu."""

add_p(make_pq(
    "Land Resources and Agriculture", "Historical Introduction of Coffee", P22_TEXT,
    "Who is historically credited with introducing coffee cultivation to the hills of southern India from Yemen?",
    "Sufi saint Baba Budan on the Baba Budan Giri hills",
    ["Portuguese explorer Vasco da Gama in Calicut", "British Governor-General Lord Dalhousie in Kolkata", "Mughal Emperor Akbar in Fatehpur Sikri"],
    "B",
    "Baba Budan brought seven coffee seeds from Yemen in the 17th century and planted them in the Chikmagalur hills of Karnataka.",
    "Identifies Baba Budan as introducing coffee from Yemen."
))

add_p(make_pq(
    "Land Resources and Agriculture", "Dominant Producing State", P22_TEXT,
    "Which Indian state accounts for over two-thirds (more than 70%) of the country's total coffee output?",
    "Karnataka",
    ["Assam", "West Bengal", "Odisha"],
    "C",
    "Karnataka is India's coffee powerhouse (Chikmagalur, Kodagu, Hassan), producing more than two-thirds of national coffee.",
    "Identifies Karnataka as the dominant coffee-producing state."
))

add_p(make_pq(
    "Land Resources and Agriculture", "Coffee Varieties in India", P22_TEXT,
    "Which two commercial varieties of coffee are predominantly grown in Indian plantation estates?",
    "Arabica and Robusta",
    ["Basmati and IR-8", "Liberica and Excelsa exclusively", "Assamica and Camellia"],
    "D",
    "India cultivates both Arabica (high-grade aromatic) and Robusta (strong, disease-resistant) coffee varieties.",
    "Identifies Arabica and Robusta as India's main coffee varieties."
))

add_p(make_pq(
    "Land Resources and Agriculture", "Need for Shade Trees", P22_TEXT,
    "Why are coffee bushes systematically inter-planted beneath tall shade trees in Indian plantations?",
    "To protect tender coffee foliage and berries from direct scorching sunlight and desiccating winds",
    ["To prevent monkeys from climbing onto coffee branches", "Because coffee cannot grow unless roots touch another tree", "To allow coffee plants to climb like creeping vines"],
    "A",
    "Coffee plants are sensitive to direct harsh solar insolation and heavy winds; canopy shade trees provide filtered sunlight.",
    "Identifies canopy shade trees protecting coffee bushes from scorching sunlight."
))

add_p(make_pq(
    "Land Resources and Agriculture", "Soil and Topographic Needs", P22_TEXT,
    "What physical landscape condition is imperative for successful coffee estate establishment?",
    "Well-drained rich loamy soils on undulating hill slopes between 900 m and 1,800 m elevation",
    ["Stagnant marshy waterlogged clay soils in low-lying river deltas", "Barren alkaline desert sand dunes with high salinity", "Perennially frozen mountain peaks above 5,000 m"],
    "B",
    "Like tea, coffee requires well-drained sloping ground to ensure root aeration and avoid water saturation.",
    "Identifies well-drained loamy soil on sloping highland terrain."
))

# =================================================================================================
# PASSAGE 23: Great Lakes - St. Lawrence Seaway (Book 1, Chapter 8)
# =================================================================================================
P23_TEXT = """The Great Lakes of North America — Superior, Huron, Michigan, Erie, and Ontario — together with the St. Lawrence River form one of the most magnificent commercial inland waterways on Earth. This network penetrates over 3,700 kilometers into the continental interior of North America, connecting the manufacturing heartlands and grain belts of the United States and Canada directly with the Atlantic Ocean. Natural navigational obstructions such as the rapids on St. Mary's River and Niagara Falls were overcome by constructing monumental engineering structures: the Soo Canal (linking Lake Superior with Lake Huron) and the Welland Canal (circumventing Niagara Falls between Lake Erie and Lake Ontario). The completed St. Lawrence Seaway, deepened to 8.2 meters, permits large ocean-going vessels to steam inland as far as Duluth in Minnesota and Chicago in Illinois, carrying iron ore, coal, wheat, and manufactured industrial goods."""

add_p(make_pq(
    "Transport, Communication and Trade", "Circumventing Niagara Falls", P23_TEXT,
    "Which engineering canal was constructed to bypass the impassable obstacle of Niagara Falls between Lake Erie and Lake Ontario?",
    "Welland Canal",
    ["Soo Canal", "Erie Canal", "Kiel Canal"],
    "C",
    "The Welland Canal features a series of deep locks that enable ships to bypass the 51-meter drop of Niagara Falls.",
    "Identifies Welland Canal as bypassing Niagara Falls."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Linking Lake Superior and Huron", P23_TEXT,
    "Which famous lock canal connects Lake Superior with Lake Huron past the rapids of the St. Mary's River?",
    "Soo Canal (Sault Ste. Marie)",
    ["Panama Canal", "Suez Canal", "Albert Canal"],
    "D",
    "The Soo Canal at Sault Ste. Marie allows heavy ore boats to navigate between Lake Superior and Lake Huron.",
    "Identifies Soo Canal as connecting Lake Superior and Huron."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Inland Ocean Reach", P23_TEXT,
    "Up to which interior American port can ocean-going vessels navigate along the Great Lakes - St. Lawrence Seaway?",
    "Duluth (on Lake Superior) and Chicago (on Lake Michigan)",
    ["Denver in Colorado and Phoenix in Arizona", "Seattle in Washington and Portland in Oregon", "Dallas in Texas and Atlanta in Georgia"],
    "A",
    "Duluth (Minnesota) on Lake Superior and Chicago (Illinois) on Lake Michigan are major deep-water ports over 3,700 km inland.",
    "Identifies Duluth and Chicago as inland western terminals of the Great Lakes system."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Great Lakes Member Lakes", P23_TEXT,
    "Which of the five Great Lakes is located entirely within the territorial boundaries of the United States?",
    "Lake Michigan",
    ["Lake Superior", "Lake Huron", "Lake Erie"],
    "B",
    "While Superior, Huron, Erie, and Ontario are shared between the USA and Canada, Lake Michigan lies entirely within the USA.",
    "Identifies Lake Michigan as lying entirely within the United States."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Cargo Composition on Great Lakes", P23_TEXT,
    "What primary bulk commodities dominate the eastbound and westbound traffic on the Great Lakes Seaway?",
    "Mesabi iron ore, Appalachian coal, prairie wheat, and steel",
    ["Refined palm oil, raw rubber, and cane molasses exclusively", "Diamond gemstones, luxury perfumes, and gold watches", "Tropical bananas, cocoa beans, and coffee beans"],
    "C",
    "The Great Lakes Seaway is the conveyor belt for heavy industrial materials: iron ore from Mesabi, coal from Pennsylvania/Ohio, and wheat from the Prairies.",
    "Identifies iron ore, coal, and wheat as dominant Great Lakes freight."
))

# =================================================================================================
# PASSAGE 24: Traditional Rainwater Harvesting in India (Book 2, Chapter 6)
# =================================================================================================
P24_TEXT = """Rainwater harvesting is a time-tested technique of collecting and storing rainwater from rooftops, land surfaces, and rock catchments for future beneficial use, while recharging depleted groundwater tables. In India's diverse ecological zones, communities developed ingenious traditional systems. In the arid regions of Rajasthan, every traditional house possessed an underground covered cistern called a 'tanka' inside the courtyard to store clean drinking water harvested from paved rooftops. In the Western Himalayas, hill farmers constructed diversion channels called 'guls' or 'kuls' to lead water into terraced fields. In the floodplains of Bengal, inundation channels irrigated fields. In modern times, rising urban water deficits have prompted statutory mandates; Tamil Nadu became the first state in India to make rooftop rainwater harvesting compulsory across all houses, imposing legal penalties on non-compliant structures."""

add_p(make_pq(
    "Water Resources", "Compulsory Rooftop Harvesting State", P24_TEXT,
    "Which state became the pioneer in India by making rooftop rainwater harvesting structures legally compulsory for all buildings?",
    "Tamil Nadu",
    ["Rajasthan", "Maharashtra", "Punjab"],
    "D",
    "Tamil Nadu was the first Indian state to legislate mandatory rooftop rainwater harvesting for every residential and commercial building.",
    "Identifies Tamil Nadu as the pioneer state for compulsory rooftop harvesting."
))

add_p(make_pq(
    "Water Resources", "Traditional Rajasthan Cisterns", P24_TEXT,
    "What indigenous underground water storage cistern is built inside residential courtyards in arid western Rajasthan?",
    "Tanka",
    ["Johad", "Baoli", "Karez"],
    "A",
    "A 'tanka' is a circular or rectangular underground covered cistern built in Rajasthan homes to collect rooftop rainwater.",
    "Identifies tanka as the traditional courtyard cistern in Rajasthan."
))

add_p(make_pq(
    "Water Resources", "Himalayan Diversion Channels", P24_TEXT,
    "What local name is given to gravity diversion channels excavated across mountain slopes in Himachal Pradesh and Uttarakhand?",
    "Guls or Kuls",
    ["Karez or Qanat", "Surangams", "Dongs"],
    "B",
    "In the Western Himalayas, traditional water diversion canals tapping glacial rivulets are known as 'kuls' or 'guls'.",
    "Identifies guls/kuls as Himalayan diversion channels."
))

add_p(make_pq(
    "Water Resources", "Environmental Purpose of Harvesting", P24_TEXT,
    "Besides meeting domestic water requirements, what major hydrological purpose is served by rainwater harvesting?",
    "Arresting the rapid decline in groundwater levels and improving subsurface aquifer quality",
    ["Increasing surface evaporation rates to trigger dust storms", "Causing widespread basement flooding in municipal wards", "Accelerating coastal seawater intrusion into river mouths"],
    "C",
    "Harvesting rain runoff recharges subterranean aquifers, raises water tables, and prevents brackish groundwater degradation.",
    "Identifies replenishing groundwater tables and improving water quality."
))

add_p(make_pq(
    "Water Resources", "Bengal Inundation Channels", P24_TEXT,
    "How did traditional agricultural communities in Bengal utilize monsoon river waters according to the passage?",
    "They engineered inundation channels to divert floodwaters onto agricultural fields for irrigation and silt replenishment",
    ["They erected high concrete dams that blocked all river flows permanently", "They pumped river water into deep subterranean salt caves", "They built large boiling kettles to evaporate river water"],
    "D",
    "In Bengal, farmers developed flood inundation channels to soak paddy fields with nutrient-rich river floodwaters.",
    "Identifies inundation canals in Bengal used for floodwater irrigation."
))

# =================================================================================================
# PASSAGE 25: Australian Trans-Continental Railway (Book 1, Chapter 8)
# =================================================================================================
P25_TEXT = """The Australian Trans-Continental Railway is the primary east-west trans-continental rail artery traversing the southern part of the Australian continent. Stretching approximately 4,352 kilometers, the railway connects the city of Sydney on the Pacific coast in the east with Perth on the Indian Ocean coast in the west. The line passes through major regional and industrial hubs, including Broken Hill (famous for silver, lead, and zinc mines), Port Augusta, Kalgoorlie (the historic gold-mining center), and Coolgardie. An extraordinary feature of this railway is its transit across the vast, arid, and treeless Nullarbor Plain, which contains the world's longest completely straight stretch of railway track, measuring 478 kilometers without a single bend. The line provides an essential freight and passenger link, moving pastoral wool, wheat, minerals, and manufactured goods across the desert interior."""

add_p(make_pq(
    "Transport, Communication and Trade", "Terminal Oceans Connected", P25_TEXT,
    "Which two oceans are directly linked by the Australian Trans-Continental Railway connecting Sydney and Perth?",
    "Pacific Ocean (at Sydney) and Indian Ocean (at Perth)",
    ["Atlantic Ocean and Arctic Ocean", "Southern Ocean and Mediterranean Sea", "Baltic Sea and Red Sea"],
    "A",
    "The rail line links Sydney on the Pacific Ocean in the east to Perth on the Indian Ocean in the west.",
    "Identifies Pacific and Indian oceans linked by Australian Trans-Continental line."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Longest Straight Track Feature", P25_TEXT,
    "Across which geographic landform does the Australian Trans-Continental line maintain a 478-kilometer dead straight track without curves?",
    "The Nullarbor Plain",
    ["The Great Dividing Range", "The Gibson Desert", "The Darling Downs"],
    "B",
    "The Nullarbor Plain hosts the world's longest continuous straight railway track segment of 478 km.",
    "Identifies the Nullarbor Plain as the site of the world's longest straight railway track."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Mining Towns on the Route", P25_TEXT,
    "Which pair of famous historic mining centers is served along the route of the Australian Trans-Continental Railway?",
    "Broken Hill (lead-zinc-silver) and Kalgoorlie (gold)",
    ["Johannesburg and Kimberley", "Bailadila and Jharia", "Sudbury and Timmins"],
    "C",
    "The line services Broken Hill in New South Wales and the Kalgoorlie-Coolgardie gold mining district in Western Australia.",
    "Identifies Broken Hill and Kalgoorlie as mining nodes on the line."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Total Route Length", P25_TEXT,
    "What is the approximate total distance spanned by the trans-continental line between Sydney and Perth?",
    "Approximately 4,352 kilometers",
    ["About 800 kilometers", "Over 12,000 kilometers", "Exactly 1,200 kilometers"],
    "D",
    "The Sydney-to-Perth rail corridor stretches across approximately 4,352 km.",
    "Identifies 4,352 km as the total route distance."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Primary Commodities Carried", P25_TEXT,
    "What key commodities are carried across the Australian continent by this freight corridor?",
    "Raw wool, wheat, mineral ores, livestock, and manufactured goods",
    ["Tropical spices, tea, and natural rubber only", "Crude petroleum exclusively shipped in wooden barrels", "Fresh arctic codfish and whale oil"],
    "A",
    "Australia's core export commodities — wool, grain, beef, and minerals — are transported via this east-west link.",
    "Identifies wool, wheat, minerals, and livestock as primary freight."
))

# =================================================================================================
# PASSAGE 26: Land Degradation in Irrigated Tracts (Book 2, Chapter 5 & 12)
# =================================================================================================
P26_TEXT = """Land degradation is a serious environmental concern in India, manifesting in diverse forms such as soil erosion, waterlogging, salinization, and alkalization. While dryland tracts suffer from severe wind and gully erosion, irrigated agricultural regions in the Green Revolution heartlands of Punjab, Haryana, and Western Uttar Pradesh face severe chemical degradation of their soils. The extensive introduction of canal irrigation without adequate sub-surface drainage has caused the water table to rise close to the surface. As capillary action pulls water upward under high evaporation rates, dissolved salts are deposited in the topsoil, rendering the land 'usar' (saline or alkaline wasteland). Farmers frequently compound this distress by applying excessive doses of chemical fertilizers like urea and over-pumping groundwater through electric tube wells, which exhausts aquifers and hardens the soil crust."""

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Salinization Mechanism", P26_TEXT,
    "What physical mechanism causes the deposition of harmful mineral salts in the topsoil of canal-irrigated arid tracts?",
    "Capillary action drawing water upward followed by rapid solar evaporation leaving salt crusts",
    ["Acidic rainfall dropping solid table salt from clouds", "Heavy winter snowfall freezing organic humus", "Volcanic lava spreading over agricultural furrows"],
    "B",
    "Excess irrigation raises the water table; intense surface evaporation pulls salt-laden groundwater upward via capillary action.",
    "Identifies capillary action and evaporation as cause of soil salinization."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Affected Green Revolution States", P26_TEXT,
    "Which group of Indian states exhibits high vulnerability to soil salinization and waterlogging due to excessive canal irrigation?",
    "Punjab, Haryana, and Western Uttar Pradesh",
    ["Kerala, Goa, and coastal Karnataka", "Meghalaya, Mizoram, and Nagaland", "Odisha, Chhattisgarh, and Jharkhand"],
    "C",
    "Intensively canal-irrigated alluvial plains of Punjab, Haryana, and Western UP suffer widespread salinization and alkalinity.",
    "Identifies Punjab, Haryana, and Western UP as salinization-affected areas."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Local Name for Degraded Soils", P26_TEXT,
    "What traditional Hindi term is used in the northern plains to describe saline and alkaline degraded soils?",
    "Kallar, Rehor, or Usar",
    ["Khadar", "Bhangar", "Bhabhar"],
    "D",
    "Saline/alkaline wastelands in northern India are locally referred to as 'usar', 'kallar', or 'reh'.",
    "Identifies Usar, Kallar, and Reh as local terms for saline wastelands."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Remedial Agricultural Measures", P26_TEXT,
    "Which agronomic intervention is recommended to reclaim soils suffering from alkalinity and waterlogging?",
    "Application of gypsum, installation of sub-surface drainage, and planting salt-tolerant crops",
    ["Doubling the application of synthetic urea fertilizers", "Flooding fields with additional canal water every week", "Paving the entire field with concrete slabs"],
    "A",
    "Alkaline soils are neutralized using chemical gypsum; proper drainage channels flush out accumulated salts.",
    "Identifies gypsum application and drainage as reclamation measures."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Groundwater Depletion Cause", P26_TEXT,
    "Why have groundwater levels dropped precipitously across north-western India despite heavy canal networks?",
    "Over-pumping through deep tube wells for water-intensive summer paddy cultivation",
    ["Earthquakes creating massive cracks that swallowed all aquifers", "Excessive forest cover transpiring all subsurface water", "Complete cessation of all monsoonal rainfall for fifty years"],
    "B",
    "Free or subsidized electricity led to rampant over-extraction of groundwater for water-guzzling crops like paddy.",
    "Identifies over-extraction by tube wells for paddy cultivation."
))

# =================================================================================================
# PASSAGE 27: Major Ports of the Eastern Coast: Visakhapatnam and Paradip (Book 2, Chapter 11)
# =================================================================================================
P27_TEXT = """The eastern coastline of India possesses several major seaports that play a pivotal role in handling India's overseas bulk mineral and industrial trade. Visakhapatnam Port in Andhra Pradesh is unique as India's deepest land-locked and protected natural harbour. Access to the harbour is through a narrow channel cut through solid rock between the Dolphin's Nose hill and Ross Hill. An outer harbour with deep draft was constructed specifically to handle ultra-large crude carriers and iron ore vessels bound for Japan. Further north along the Odisha coast lies Paradip Port, situated in the Mahanadi river delta. Commissioned in 1966, Paradip was developed as a specialized deep-water port primarily dedicated to the bulk export of iron ore extracted from the rich mining belts of Odisha and Jharkhand. Both ports have subsequently diversified to handle petroleum crude, thermal coal, fertilizers, and containerized cargo."""

add_p(make_pq(
    "International Trade", "Visakhapatnam Harbour Feature", P27_TEXT,
    "What distinctive physiographic landmark protects the entrance channel of Visakhapatnam Port?",
    "Dolphin's Nose promontory hill",
    ["Marine Drive promenade", "Elephant Rock", "Tiger Hill scarp"],
    "C",
    "Visakhapatnam harbour is sheltered from open sea swells by a massive rocky promontory known as Dolphin's Nose.",
    "Identifies Dolphin's Nose as the protective landmark of Visakhapatnam Port."
))

add_p(make_pq(
    "International Trade", "Paradip Primary Export", P27_TEXT,
    "What raw mineral commodity was Paradip Port primarily commissioned to export in 1966?",
    "Iron ore from Odisha and Jharkhand mining belts destined for Japan",
    ["Refined gold bullion for European central banks", "Raw cotton for British textile factories", "Bauxite powder for Canadian paper mills"],
    "D",
    "Paradip was developed primarily as a dedicated deep-water iron ore export terminal catering to Japanese steel mills.",
    "Identifies iron ore export to Japan as original purpose of Paradip Port."
))

add_p(make_pq(
    "International Trade", "Geographic Setting of Paradip", P27_TEXT,
    "In which river delta along the Odisha coast is Paradip Port geographically located?",
    "Mahanadi river delta",
    ["Godavari river delta", "Ganga-Brahmaputra delta", "Kaveri river delta"],
    "A",
    "Paradip is situated on the coast of Jagatsinghpur district in Odisha, at the mouth of the Mahanadi delta.",
    "Identifies Mahanadi delta as the location of Paradip Port."
))

add_p(make_pq(
    "International Trade", "Nature of Visakhapatnam Port", P27_TEXT,
    "How is Visakhapatnam Port categorized in terms of its physical maritime design?",
    "A deep, land-locked, protected natural harbour connected by an excavated rock channel",
    ["An artificial river lagoon shallow enough for rowboats only", "An open roadstead port completely exposed to cyclones with no breakwaters", "A wooden floating dock moored in fresh river water"],
    "B",
    "Visakhapatnam is acclaimed as the deepest land-locked natural harbour in India, sheltered by rocky headlands.",
    "Identifies Visakhapatnam as a land-locked protected natural harbour."
))

add_p(make_pq(
    "International Trade", "Cargo Diversification", P27_TEXT,
    "Besides iron ore, which bulk commodities are extensively handled at these eastern major ports today?",
    "Crude petroleum, coking coal, thermal coal, and fertilizers",
    ["Only fresh tropical fruits and live sheep", "Precious gems and high-fashion garments exclusively", "Uranium nuclear rods and jet fighter engines only"],
    "C",
    "Visakhapatnam and Paradip have evolved into mega-hubs handling crude oil imports, coal for power plants, and chemical fertilizers.",
    "Identifies petroleum, coal, and fertilizers as diversified cargo."
))

# =================================================================================================
# PASSAGE 28: Non-Conventional Energy in India (Book 2, Chapter 7)
# =================================================================================================
P28_TEXT = """With the depletion of exhaustible fossil fuels and mounting climate concerns, India has vigorously accelerated the development of non-conventional, renewable energy sources. Solar energy holds tremendous promise as India is a tropical country receiving nearly 300 clear sunny days annually. Photovoltaic technology converts sunlight directly into electricity. Rajasthan possesses immense potential for solar energy development; the Bhadla Solar Park in Jodhpur district is one of the largest operational solar parks in the world. Similarly, wind energy has witnessed dramatic expansion. India has a vast coastline and open plateau tracts where steady winds blow. The largest wind farm cluster in India is located in Tamil Nadu, extending from Muppandal near Kanniyakumari to Perungudi, taking advantage of the high-velocity winds funneling through the Palghat gap. Non-conventional energy promotes regional equity, clean power, and ecological sustainability."""

add_p(make_pq(
    "Mineral and Energy Resources", "Bhadla Solar Park Location", P28_TEXT,
    "In which district of Rajasthan is the world-renowned Bhadla Solar Park established?",
    "Jodhpur district",
    ["Jaipur district", "Udaipur district", "Banswara district"],
    "D",
    "The mega Bhadla Solar Park is located in the arid Phodi tehsil of Jodhpur district in Rajasthan.",
    "Identifies Jodhpur district as host of Bhadla Solar Park."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Largest Wind Farm Cluster", P28_TEXT,
    "Where is India's largest commercial wind farm cluster situated?",
    "Muppandal to Perungudi in Tamil Nadu",
    ["Jaisalmer desert in Rajasthan", "Lahaul and Spiti in Himachal Pradesh", "Sundarbans mangrove delta in West Bengal"],
    "A",
    "The Muppandal wind farm cluster near Kanniyakumari in Tamil Nadu is India's largest operational wind power complex.",
    "Identifies Muppandal-Perungudi in Tamil Nadu as largest wind cluster."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Solar Energy Technology", P28_TEXT,
    "Which technology directly converts solar radiation into electrical current without mechanical turbines?",
    "Photovoltaic (PV) solar cells",
    ["Steam condensation towers", "Internal combustion carburetors", "Geothermal hydraulic pistons"],
    "B",
    "Solar photovoltaic (PV) cells utilize semiconductor materials to convert photons directly into direct electric current.",
    "Identifies photovoltaic technology converting sunlight to electricity."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Geographical Drivers of Wind Power", P28_TEXT,
    "Which physiographic feature helps channel strong winds towards the Muppandal wind complex in southern India?",
    "Gaps and passes in the Southern Western Ghats (like the Palghat and Shencottah gaps)",
    ["The snow-covered peaks of the Great Himalayas", "The dense tropical rainforest canopy of Assam", "The deep underground caves of Meghalaya"],
    "C",
    "Gaps in the Western Ghats act as natural wind tunnels, concentrating monsoonal and seasonal airflows onto the plains.",
    "Identifies Western Ghats gaps channeling high-velocity wind currents."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Environmental Value of Renewables", P28_TEXT,
    "What is the primary ecological benefit of transitioning from coal power to solar and wind energy?",
    "Zero emission of greenhouse gases like carbon dioxide and preservation of finite fossil reserves",
    ["Complete elimination of all daytime sunlight", "Accelerated destruction of ozone molecules in the stratosphere", "Permanent cooling of ocean waters to sub-zero temperatures"],
    "D",
    "Renewable energy generates electricity without burning carbonaceous fuels, drastically reducing carbon emissions and global warming.",
    "Identifies greenhouse gas emission abatement and conservation of fossil fuels."
))

# =================================================================================================
# PASSAGE 29: International Trade and the World Trade Organization (Book 1, Chapter 9)
# =================================================================================================
P29_TEXT = """International trade is the exchange of goods and services among countries across international borders. After the Second World War, the General Agreement on Tariffs and Trade (GATT) was formed in 1948 to reduce tariffs and trade barriers. On 1 January 1995, GATT was transformed into the World Trade Organization (WTO), headquartered in Geneva, Switzerland. The WTO is the only international agency overseeing the global rules of trade between nations. It resolves trade disputes, provides a forum for multilateral trade negotiations, and promotes free and predictable trade. However, critics argue that the WTO has exacerbated inequalities between developed and developing nations by forcing developing countries to open their domestic markets to subsidized agricultural and manufactured goods from advanced nations, a practice known as 'dumping', while intellectual property rules restrict affordable access to lifesaving pharmaceuticals."""

add_p(make_pq(
    "International Trade", "WTO Inception Date", P29_TEXT,
    "On which date did the World Trade Organization (WTO) formally come into existence, replacing GATT?",
    "1 January 1995",
    ["15 August 1947", "24 October 1945", "1 April 2000"],
    "A",
    "The WTO was officially established on 1 January 1995 following the Marrakesh Agreement of 1994.",
    "Identifies 1 January 1995 as the establishment of WTO."
))

add_p(make_pq(
    "International Trade", "WTO Headquarters", P29_TEXT,
    "In which city is the permanent headquarters of the World Trade Organization located?",
    "Geneva, Switzerland",
    ["New York, USA", "Paris, France", "London, United Kingdom"],
    "B",
    "The WTO is headquartered in the Centre William Rappard in Geneva, Switzerland.",
    "Identifies Geneva, Switzerland as WTO headquarters."
))

add_p(make_pq(
    "International Trade", "Predecessor Organization", P29_TEXT,
    "Which international agreement functioned as the institutional predecessor to the WTO from 1948 to 1994?",
    "General Agreement on Tariffs and Trade (GATT)",
    ["North Atlantic Treaty Organization (NATO)", "International Monetary Fund (IMF)", "Organization of the Petroleum Exporting Countries (OPEC)"],
    "C",
    "GATT was established in 1948 and governed international trade before being superseded by the WTO in 1995.",
    "Identifies GATT as the precursor to the WTO."
))

add_p(make_pq(
    "International Trade", "Dumping Practice", P29_TEXT,
    "In international trade economics, what does the term 'dumping' refer to?",
    "Selling commodities in a foreign market at a price below their domestic market value or production cost",
    ["Throwing commercial plastic waste into open international ocean waters", "Banning all foreign ships from entering national seaports", "Importing goods using purely barter arrangements without money"],
    "D",
    "Dumping involves unloading subsidized surplus goods onto foreign markets below cost, damaging domestic local producers.",
    "Defines dumping as selling goods abroad below home market price or cost."
))

add_p(make_pq(
    "International Trade", "Criticisms Faced by WTO", P29_TEXT,
    "What is a principal criticism leveled against the WTO by developing economies?",
    "It often enforces rules that compel developing countries to open markets while rich nations subsidize their own agriculture",
    ["It forces all member countries to adopt a single global currency called the dollar", "It bans all international air flights carrying commercial passengers", "It requires all trade negotiations to be conducted strictly in Latin"],
    "A",
    "Developing nations contend that WTO rules disproportionately benefit wealthy nations while limiting policy space for poor countries.",
    "Identifies market opening pressure alongside rich-nation agricultural subsidies."
))

# =================================================================================================
# PASSAGE 30: Internal Migration Dynamics in India (Book 2, Chapter 2)
# =================================================================================================
P30_TEXT = """Migration represents a crucial redistributive process of human population across space. In the Indian Census, a person is enumerated as a migrant if the place of enumeration differs from the place of birth or place of last residence. Internal migration in India encompasses four distinct spatial streams: rural-to-rural, rural-to-urban, urban-to-urban, and urban-to-rural. A striking gender dichotomy characterizes these streams. Females dominate internal migration overwhelmingly in absolute numbers, particularly in the rural-to-rural stream, where marriage constitutes the principal reason (accounting for over 65 percent of female migration across India, except in Meghalaya where matriliny prevails). Conversely, males dominate the rural-to-urban migration stream, propelled by economic 'push' factors (rural poverty, unemployment, lack of land) and 'pull' factors (employment prospects, higher wages, modern civic amenities in mega cities)."""

add_p(make_pq(
    "Population: Distribution, Density, Growth and Composition", "Female Migration Reason", P30_TEXT,
    "What is the single most dominant cause of internal migration among females in India?",
    "Marriage",
    ["Higher education", "Corporate employment", "Business expansion"],
    "B",
    "Marriage is the foremost reason for female mobility in India, moving from natal homes to their husband's village.",
    "Identifies marriage as the primary reason for female migration."
))

add_p(make_pq(
    "Population: Distribution, Density, Growth and Composition", "Matriliny Exception State", P30_TEXT,
    "In which north-eastern Indian state does marriage not lead to female out-migration due to prevailing matrilineal traditions?",
    "Meghalaya",
    ["Assam", "Tripura", "Manipur"],
    "C",
    "In matrilineal communities like the Khasis and Garos in Meghalaya, men customarily move to the bride's household upon marriage.",
    "Identifies Meghalaya as the matrilineal exception state."
))

add_p(make_pq(
    "Population: Distribution, Density, Growth and Composition", "Male Dominance Stream", P30_TEXT,
    "In which migration stream do males distinctly outnumber females in India?",
    "Rural-to-urban migration stream driven by the search for employment",
    ["Rural-to-rural migration stream driven by marriage", "Urban-to-rural migration of retired senior citizens only", "International pilgrimage journeys"],
    "D",
    "The rural-to-urban stream is dominated by adult male breadwinners seeking employment and livelihoods in industrial cities.",
    "Identifies rural-to-urban stream as predominantly male."
))

add_p(make_pq(
    "Population: Distribution, Density, Growth and Composition", "Census Enumeration Basis", P30_TEXT,
    "On which two fundamental criteria does the Census of India identify and record an individual as a migrant?",
    "Place of birth and place of last residence",
    ["Religious affiliation and caste category", "Blood group and dietary preferences", "Political voting record and tax bracket"],
    "A",
    "The Census records migration on two bases: Place of Birth (if different from place of enumeration) and Place of Last Residence.",
    "Identifies place of birth and place of last residence as census criteria."
))

add_p(make_pq(
    "Population: Distribution, Density, Growth and Composition", "Rural Push Factors", P30_TEXT,
    "Which of the following operates as an economic 'push factor' expelling rural workers towards urban centers?",
    "High population pressure on land, fragmentation of agricultural holdings, and seasonal unemployment",
    ["Availability of world-class tertiary super-specialty hospitals in villages", "Abundant white-collar high-paying corporate jobs in rural hamlets", "Provision of free air conditioning across rural farmlands"],
    "B",
    "Rural distress — small landholdings, agricultural underemployment, lack of basic amenities — acts as powerful push factors.",
    "Identifies population pressure on land and unemployment as rural push factors."
))

# =================================================================================================
# PASSAGE 31: Coal Mining and the Damodar Valley (Book 2, Chapter 7)
# =================================================================================================
P31_TEXT = """Coal is India's most abundant fossil fuel, supplying over half of the country's commercial energy requirements. Indian coal deposits belong to two primary geological eras: Gondwana coal deposits and Tertiary coal deposits. Gondwana coal constitutes roughly 98 percent of India's total coal reserves and almost 99 percent of national coal production. Gondwana coal is of bituminous type, characterized by low moisture and moderate ash content. The premier Gondwana coalfield belt is located along the Damodar River valley, straddling Jharkhand and West Bengal. Major coalfields in this valley include Raniganj (India's oldest coalfield, opened in 1774), Jharia (India's largest coalfield and primary repository of prime metallurgical coking coal), Bokaro, and Giridih. However, intensive open-cast mining over decades has caused severe land subsidence, underground mine fires, deforestation, and water contamination across the Damodar basin."""

add_p(make_pq(
    "Mineral and Energy Resources", "Gondwana Coal Share", P31_TEXT,
    "Approximately what percentage of India's total coal reserves is hosted within Gondwana geological formations?",
    "About 98 percent of total reserves",
    ["Only 10 percent of reserves", "Exactly 50 percent of reserves", "Less than 2 percent of reserves"],
    "C",
    "Gondwana coal formations account for about 98% of India's total coal reserves and 99% of its production.",
    "Identifies 98% share for Gondwana coal formations."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Oldest Coalfield in India", P31_TEXT,
    "Which is the oldest commercial coalfield in India, where mining commenced in 1774?",
    "Raniganj in West Bengal",
    ["Jharia in Jharkhand", "Singrauli in Madhya Pradesh", "Talcher in Odisha"],
    "D",
    "Raniganj coalfield in West Bengal was the earliest coalfield mined in India, dating back to 1774 during British East India Company rule.",
    "Identifies Raniganj as India's oldest coalfield."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Prime Coking Coal Source", P31_TEXT,
    "Which coalfield holds India's richest deposits of prime metallurgical coking coal essential for blast furnaces?",
    "Jharia coalfield in Jharkhand",
    ["Neyveli in Tamil Nadu", "Makum in Assam", "Palana in Rajasthan"],
    "A",
    "Jharia is India's premier coalfield and the exclusive source of prime metallurgical coking coal for the steel industry.",
    "Identifies Jharia as the premier source of coking coal."
))

add_p(make_pq(
    "Mineral and Energy Resources", "River Basin of Premier Coalfields", P31_TEXT,
    "Along the valley of which river are India's premier coalfields (Raniganj, Jharia, Bokaro) concentrated?",
    "Damodar River valley",
    ["Narmada River valley", "Brahmaputra River valley", "Cauvery River valley"],
    "B",
    "The Damodar Valley is known as the 'Ruhr of India' due to its exceptional concentration of Gondwana coal deposits.",
    "Identifies the Damodar River valley as the coal heartland."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Environmental Hazards of Mining", P31_TEXT,
    "What chronic environmental disaster has plagued the Jharia coal belt for nearly a century?",
    "Uncontrolled underground mine fires and massive ground land subsidence",
    ["Continuous volcanic eruptions emitting basaltic lava", "Sub-zero permafrost freezing underground shafts", "Severe seawater flooding through limestone sinkholes"],
    "C",
    "Jharia suffers from chronic underground coal fires burning since 1916, resulting in toxic fumes and surface land subsidence.",
    "Identifies underground coal fires and land subsidence in Jharia."
))

# =================================================================================================
# PASSAGE 32: Canadian Pacific Railway (Book 1, Chapter 8)
# =================================================================================================
P32_TEXT = """The Canadian Pacific Railway is the premier trans-continental railway of Canada, stretching 7,050 kilometers across the breadth of North America. Constructed between 1881 and 1885, the railway connects Montreal and Quebec City on the St. Lawrence River and Atlantic seaboard in the east with Vancouver on the Pacific Ocean in the west. The line was originally built as a political commitment to bring British Columbia into the Canadian Federation. Navigating westwards, the railway crosses the industrial heartland of Ontario, traverses the fertile spring-wheat belt of the Canadian Prairies via Winnipeg, Regina, and Calgary, and conquers the rugged Rocky Mountains through the historic Kicking Horse Pass before descending the Fraser River valley to Vancouver. The railway connects Canada's agricultural breadbasket to world grain markets and forms a crucial segment of the 'Trans-Continental Land Bridge' linking Europe and Asia."""

add_p(make_pq(
    "Transport, Communication and Trade", "Canadian Pacific Terminals", P32_TEXT,
    "Which terminal cities on the Atlantic and Pacific seaboards are linked by the Canadian Pacific Railway?",
    "Montreal/Quebec City in the east and Vancouver on the Pacific coast in the west",
    ["Halifax in the east and San Francisco in the west", "Toronto in the east and Los Angeles in the west", "New York in the east and Seattle in the west"],
    "D",
    "The Canadian Pacific Railway links the eastern maritime cities of Montreal/Quebec with Vancouver on the Pacific coast.",
    "Identifies Montreal/Quebec and Vancouver as Canadian Pacific terminals."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Mountain Pass Conquered", P32_TEXT,
    "Through which famous mountain pass does the Canadian Pacific Railway cross the formidable Rocky Mountains?",
    "Kicking Horse Pass",
    ["Yellowhead Pass", "Bolan Pass", "Khyber Pass"],
    "A",
    "The Canadian Pacific Railway crosses the Continental Divide of the Canadian Rockies through Kicking Horse Pass.",
    "Identifies Kicking Horse Pass as the route through the Canadian Rockies."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Prairie Nodes Served", P32_TEXT,
    "Which prominent Prairie grain-collecting and commercial centers are traversed by this railway?",
    "Winnipeg, Regina, and Calgary",
    ["Ottawa, Hamilton, and Windsor", "Boston, Philadelphia, and Baltimore", "Edmonton, Dawson, and Anchorage"],
    "B",
    "The railway runs through the Prairie grain nodes of Winnipeg (the world's wheat capital), Regina, and Calgary.",
    "Identifies Winnipeg, Regina, and Calgary as Prairie rail centers."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Political Motivation", P32_TEXT,
    "What political objective drove the construction of the Canadian Pacific Railway in the 1880s?",
    "To integrate British Columbia on the Pacific coast into the Canadian Confederation",
    ["To facilitate the military annexation of Mexico by Canada", "To establish an overland trade route with the Russian Empire", "To construct a continuous wall along the United States border"],
    "C",
    "British Columbia agreed to join the Canadian Confederation in 1871 on the explicit guarantee of a transcontinental railway link.",
    "Identifies joining British Columbia to the Canadian Confederation."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Total Track Length", P32_TEXT,
    "What is the total continuous route length of the Canadian Pacific Railway mainline?",
    "7,050 kilometers",
    ["2,000 kilometers", "15,000 kilometers", "3,500 kilometers"],
    "D",
    "The Canadian Pacific Railway spans approximately 7,050 km across Canada.",
    "Identifies 7,050 km as the total route length."
))

# =================================================================================================
# PASSAGE 33: Cotton Textile Industry Spatial Dynamics in India (Book 2, Chapter 8)
# =================================================================================================
P33_TEXT = """The cotton textile industry is one of the oldest and most geographically widespread organized manufacturing sectors in India. The first modern mechanized cotton mill was set up at Fort Gloster near Kolkata in 1818, though the first commercially successful mill was established by C.N. Davar in Mumbai in 1854. Initially, the industry was concentrated heavily in Mumbai and Ahmedabad in the black soil (regur) cotton tract of Maharashtra and Gujarat, benefiting from local raw cotton, humid maritime climate preventing yarn snapping, access to Mumbai Port for machinery imports, and ready capital. Over time, the industry underwent profound spatial decentralization. Because cotton is a pure raw material that does not lose weight during spinning, mills can be located near consumer markets without incurring heavy freight penalties. Today, significant cotton textile clusters flourish in Tamil Nadu (Coimbatore, known as the 'Manchester of South India'), Uttar Pradesh (Kanpur), and Punjab."""

add_p(make_pq(
    "Secondary Activities", "First Successful Mill", P33_TEXT,
    "Who established the first commercially successful cotton textile mill in Mumbai in 1854?",
    "Cowasji Nanabhoy Davar",
    ["Jamsetji Tata", "G.D. Birla", "Ardeshir Godrej"],
    "A",
    "C.N. Davar established the Bombay Spinning and Weaving Mill in Mumbai in 1854.",
    "Identifies C.N. Davar as founder of the first successful Mumbai cotton mill in 1854."
))

add_p(make_pq(
    "Secondary Activities", "Pure Raw Material Concept", P33_TEXT,
    "Why is the modern cotton textile industry capable of extensive geographic decentralization near consumer markets?",
    "Because ginned cotton is a pure raw material that does not lose weight during yarn manufacturing",
    ["Because cotton yarn evaporates if moved more than 10 km from a farm", "Because cotton can only be spun using solar panels on urban rooftops", "Because state laws prohibit moving raw cotton across district borders"],
    "B",
    "Raw ginned cotton is a weight-sustaining 'pure' raw material; 1 tonne of raw cotton yields roughly 1 tonne of yarn, enabling market-based locations.",
    "Explains weight-sustaining pure raw material concept facilitating market decentralization."
))

add_p(make_pq(
    "Secondary Activities", "Manchester of South India", P33_TEXT,
    "Which industrial city in Tamil Nadu is famously designated as the 'Manchester of South India' due to its dense concentration of spinning mills?",
    "Coimbatore",
    ["Madurai", "Tiruchirappalli", "Salem"],
    "C",
    "Coimbatore hosts hundreds of spinning and weaving textile units, earning the title 'Manchester of South India'.",
    "Identifies Coimbatore as the Manchester of South India."
))

add_p(make_pq(
    "Secondary Activities", "Early Concentration Factors", P33_TEXT,
    "Which environmental factor favored the early concentration of cotton mills in Mumbai and Ahmedabad?",
    "Humid coastal climate which prevented the snapping and breaking of fine cotton yarn threads during spinning",
    ["Freezing winter temperatures that killed cotton boll weevils", "Heavy monsoonal snowfall providing natural refrigeration", "Absence of any local population allowing giant automated robotic plants"],
    "D",
    "Humid maritime air in coastal western India was essential in early manual spinning to prevent dry cotton yarn threads from snapping.",
    "Identifies humid coastal climate preventing yarn breakage."
))

add_p(make_pq(
    "Secondary Activities", "First Mill at Fort Gloster", P33_TEXT,
    "Where was the very first mechanized cotton mill established in India in 1818, which later failed?",
    "Fort Gloster near Kolkata, West Bengal",
    ["Surat in Gujarat", "Sholapur in Maharashtra", "Gwalior in Madhya Pradesh"],
    "A",
    "The first cotton mill in India was started in 1818 at Fort Gloster near Kolkata, though it was commercially unsuccessful.",
    "Identifies Fort Gloster near Kolkata as the site of the 1818 mill."
))

# =================================================================================================
# PASSAGE 34: Solid Waste Management & Urban Environmental Stress (Book 2, Chapter 12)
# =================================================================================================
P34_TEXT = """Solid waste disposal has become an alarming environmental crisis across Indian cities and towns, driven by rapid urbanization, consumerism, and population agglomeration. Municipal solid waste comprises domestic refuse, commercial garbage, plastic packaging, construction debris, and electronic waste (e-waste). In most Indian metropolises, waste is dumped indiscriminately in open unscientific landfills on city outskirts, such as Ghazipur in Delhi or Deonar in Mumbai. These open dump sites generate toxic leachate that seeps into subterranean aquifers, contaminating groundwater with heavy metals. Decomposing organic refuse emits massive plumes of methane, a potent greenhouse gas that triggers frequent spontaneous landfill fires, blanketing adjoining residential zones in hazardous smog. An informal army of ragpickers and scrap dealers performs the vital socio-ecological function of collecting, sorting, and recycling plastic, paper, and scrap metal, yet they work under hazardous, unsanitary conditions without protective gear."""

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Landfill Environmental Hazards", P34_TEXT,
    "What hazardous liquid byproduct seeps from open unlined urban landfills, threatening subsurface groundwater quality?",
    "Toxic leachate containing dissolved pollutants and heavy metals",
    ["Liquid pure oxygen", "Concentrated sugarcane syrup", "Fresh spring mineral water"],
    "B",
    "Rainwater percolating through rotting garbage produces leachate, a highly toxic chemical liquid that contaminates groundwater tables.",
    "Identifies toxic leachate as the contaminant of aquifers."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Greenhouse Gas from Landfills", P34_TEXT,
    "Which potent greenhouse gas is emitted by anaerobic decomposition of organic waste in open municipal dumps?",
    "Methane (CH4)",
    ["Pure Argon (Ar)", "Nitrogen gas (N2)", "Helium (He)"],
    "C",
    "Anaerobic bacteria breaking down organic food and plant waste generate large volumes of methane, causing landfill fires.",
    "Identifies methane gas produced by anaerobic decomposition."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Famous Open Landfill Sites", P34_TEXT,
    "Which pair of prominent open landfill dump sites corresponds to Delhi and Mumbai respectively?",
    "Ghazipur (Delhi) and Deonar (Mumbai)",
    ["Bhadla (Delhi) and Kudremukh (Mumbai)", "Dharavi (Delhi) and Sakchi (Mumbai)", "Khetri (Delhi) and Digboi (Mumbai)"],
    "D",
    "Ghazipur in east Delhi and Deonar in eastern Mumbai are notorious, towering open municipal garbage dump mountains.",
    "Identifies Ghazipur (Delhi) and Deonar (Mumbai) as major landfill dump sites."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Informal Recycling Sector", P34_TEXT,
    "What essential ecological service is performed by informal ragpickers in urban India?",
    "Manual segregating, salvaging, and diverting recyclable plastics, metals, and paper away from landfills",
    ["Enforcing municipal court fines on illegal industrial factories", "Constructing multi-lane concrete bypass expressways", "Providing free dental checkups to slum school children"],
    "A",
    "Ragpickers collect and channel thousands of tonnes of reusable recyclable materials back into industrial processing.",
    "Identifies manual sorting and recycling of waste materials as key informal function."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Urban Waste Generation Drivers", P34_TEXT,
    "What twin socio-economic factors have exponentially accelerated solid waste generation in Indian metropolises?",
    "Rapid urban population expansion and increasing consumption of single-use disposable packaging",
    ["A complete collapse of all urban manufacturing activities", "Mandatory shifting of all citizens into forest tree houses", "A return to prehistoric subsistence hunting lifestyles"],
    "B",
    "Urban population concentration combined with consumer lifestyles relying on plastic and single-use packaging drives mounting waste volumes.",
    "Identifies urbanization and disposable packaging consumption as waste drivers."
))

# =================================================================================================
# PASSAGE 35: Tourism as a Tertiary Service Industry (Book 1, Chapter 7)
# =================================================================================================
P35_TEXT = """Tourism is travel undertaken for purposes of recreation rather than business. It has grown into the world's single largest tertiary activity in total registered jobs and total revenue generated. Tourism fosters local infrastructure, crafts, and heritage conservation, generating substantial employment for hoteliers, tour operators, guides, transport providers, and restaurant operators. In recent decades, specialized niches of tourism have emerged, notably 'Medical Tourism'. When medical treatment is combined with international tourism activity, it is called medical tourism. India has emerged as a premier global hub for medical tourism, attracting patients from the United States, Europe, the Middle East, and neighbouring South Asian countries for complex cardiac surgeries, joint replacements, and dental treatments. Foreign patients are drawn to world-class accredited private hospitals in metropolises like Delhi, Chennai, and Mumbai, where medical procedures cost a fraction of what they cost in Western countries."""

add_p(make_pq(
    "Tertiary and Quaternary Activities", "Medical Tourism Definition", P35_TEXT,
    "What does the concept of 'Medical Tourism' specifically signify?",
    "Traveling to another country to obtain medical treatment combined with recreational tourism",
    ["Traveling to remote islands solely to study tropical infectious diseases", "Medical doctors taking compulsory vacations on government cruise ships", "Transporting pharmaceutical vaccines in cargo airplanes across borders"],
    "C",
    "Medical tourism refers to people traveling overseas for medical diagnosis or surgery, often combined with sightseeing.",
    "Defines medical tourism as cross-border medical care combined with tourism."
))

add_p(make_pq(
    "Tertiary and Quaternary Activities", "India's Competitive Advantage", P35_TEXT,
    "What is the primary factor attracting international patients to Indian hospitals for medical treatments?",
    "High-quality medical expertise and cutting-edge technology available at a fraction of Western costs",
    ["Free international airline tickets provided by the Indian government", "Complete absence of any medical doctors in North America and Europe", "Compulsory requirement for all world tourists to undergo surgery"],
    "D",
    "India offers world-class accredited clinical care, English-speaking surgeons, and modern equipment at highly competitive prices.",
    "Identifies high clinical standards at affordable prices as India's advantage."
))

add_p(make_pq(
    "Tertiary and Quaternary Activities", "Tertiary Sector Ranking", P35_TEXT,
    "What status does the tourism industry hold among global tertiary service activities?",
    "It is the world's single largest tertiary sector activity in terms of registered employment and revenue",
    ["It is the smallest economic sector with zero registered workers", "It has been completely replaced by digital virtual reality headsets", "It generates less revenue than traditional sea salt pan drying"],
    "A",
    "Globally, tourism is the largest single tertiary employer, generating millions of direct and indirect jobs.",
    "Identifies tourism as the world's largest tertiary service industry."
))

add_p(make_pq(
    "Tertiary and Quaternary Activities", "Medical Tourism Hubs in India", P35_TEXT,
    "Which Indian cities have evolved as foremost destinations for international medical travelers?",
    "Delhi, Chennai, Mumbai, and Bengaluru",
    ["Leh, Kargil, and Baramulla", "Jaisalmer, Barmer, and Bikaner", "Dhanbad, Bokaro, and Asansol"],
    "B",
    "Metropolitan centers like Chennai (health capital of India), Delhi NCR, Mumbai, and Bengaluru possess world-class tertiary healthcare facilities.",
    "Identifies Chennai, Delhi, Mumbai, and Bengaluru as medical hubs."
))

add_p(make_pq(
    "Tertiary and Quaternary Activities", "Local Economic Multiplier", P35_TEXT,
    "How does tourism stimulate local economic development beyond direct hospitality providers?",
    "Through positive multiplier effects on regional transport, traditional handicrafts, cultural arts, and food services",
    ["By forcing local farmers to abandon all land to build airports", "By causing an immediate global drop in local real estate values", "By prohibiting local residents from earning commercial wages"],
    "C",
    "Tourist spending cascades through local economies, benefiting auto-drivers, artisans, souvenir vendors, and local food producers.",
    "Identifies economic multiplier effects on handicrafts, transport, and cultural sectors."
))

# =================================================================================================
# PASSAGE 36: Bauxite Mining and Aluminium Smelting (Book 2, Chapter 7 & 8)
# =================================================================================================
P36_TEXT = """Bauxite is the primary raw mineral ore used in the manufacturing of aluminium. Bauxite deposits are formed by the deep weathering and decomposition of a wide variety of rocks rich in aluminium silicates under tropical conditions with alternating wet and dry seasons. India's bauxite deposits are primarily associated with laterite rocks found on the plateaus and hill ranges of peninsular India. Odisha is by far the largest bauxite-producing state in India, accounting for over half of the national output. The premier bauxite belt in Odisha is located in the Panchpatmali deposits in Koraput district, followed by deposits in Kalahandi, Bolangir, and Rayagada. Aluminium is a versatile, lightweight, corrosion-resistant, and highly conductive metal that is widely substituted for copper, steel, and zinc. However, aluminium smelting is an extraordinarily energy-intensive industry, requiring approximately 18,500 kilowatt-hours of continuous electricity per tonne of metal produced, making uninterrupted cheap electrical power the overriding locational determinant for smelters."""

add_p(make_pq(
    "Mineral and Energy Resources", "Leading Bauxite Producing State", P36_TEXT,
    "Which state is India's premier producer of bauxite, contributing more than half of the national production?",
    "Odisha",
    ["Rajasthan", "Punjab", "Kerala"],
    "D",
    "Odisha dominates India's bauxite output, producing over 50% of the national total from its rich southern plateau belts.",
    "Identifies Odisha as the leading bauxite-producing state."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Panchpatmali Bauxite Deposits", P36_TEXT,
    "In which district of Odisha are the prolific Panchpatmali bauxite deposits mined by NALCO located?",
    "Koraput district",
    ["Sundargarh district", "Mayurbhanj district", "Cuttack district"],
    "A",
    "The Panchpatmali plateau in Koraput district of Odisha contains India's largest single bauxite deposit, mined by NALCO.",
    "Identifies Koraput district as location of Panchpatmali bauxite mines."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Aluminium Smelter Location Determinant", P36_TEXT,
    "What is the overriding locational factor determining the establishment of an aluminium smelting plant?",
    "Availability of massive, cheap, and uninterrupted electrical power supplies",
    ["Proximity to deep underground coal mines yielding anthracite coal", "Access to freezing cold sub-zero mountain winds for chilling molds", "Availability of abundant cheap child labour"],
    "B",
    "Smelting alumina into aluminium requires enormous electrical energy (over 18,000 kWh per tonne), tying smelters to cheap hydro or thermal power.",
    "Identifies cheap and continuous electricity as overriding locational determinant."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Geological Association of Bauxite", P36_TEXT,
    "With which rock type are Indian bauxite deposits primarily associated across peninsular plateaus?",
    "Laterite capping rocks formed by intense tropical leaching",
    ["Gondwana sedimentary sandstones", "Precambrian marble and slate formations", "Recent alluvial silt deposits of river floodplains"],
    "C",
    "Bauxite occurs as residual capping pockets over laterite rocks on plateau summits subject to intense monsoonal leaching.",
    "Identifies laterite rocks formed by tropical leaching as bauxite matrix."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Properties of Aluminium", P36_TEXT,
    "Which combination of properties makes aluminium an indispensable modern structural metal?",
    "Remarkable lightness, high corrosion resistance, excellent electrical conductivity, and ductility",
    ["Extremely high weight, rapid rusting in moist air, and zero electrical conductivity", "High fragility that breaks into dust when touched", "Radioactivity that emits gamma rays continuously"],
    "D",
    "Aluminium is celebrated for its lightweight strength, resistance to oxidation, electrical conductivity, and malleability.",
    "Identifies lightweight, corrosion resistance, and high conductivity."
))

# =================================================================================================
# PASSAGE 37: Satellite Remote Sensing and Space Applications (Book 2, Chapter 10)
# =================================================================================================
P37_TEXT = """Space technology and satellite communications have revolutionized the acquisition and analysis of geographical data in India. The Indian Space Research Organisation (ISRO), established in 1969, has positioned India among the elite spacefaring nations of the world. India maintains two major operational satellite constellations: the Indian National Satellite (INSAT) system for telecommunications, television broadcasting, and meteorological disaster warning, and the Indian Remote Sensing (IRS) satellite system for natural resource management. Remote sensing involves acquiring information about the Earth's surface from a distance using sensors on satellites. IRS data collected by the National Remote Sensing Centre (NRSC) in Hyderabad is used for mapping forest cover, monitoring surface water bodies, forecasting agricultural crop acreage and yield, assessing flood and drought damage, and tracking urban sprawl. ISRO's geo-portal 'Bhuvan' provides free access to multi-sensor satellite imagery across the subcontinent."""

add_p(make_pq(
    "Transport and Communication", "NRSC Headquarters", P37_TEXT,
    "In which city is the National Remote Sensing Centre (NRSC) of ISRO headquartered?",
    "Hyderabad, Telangana",
    ["Bengaluru, Karnataka", "Thiruvananthapuram, Kerala", "Ahmedabad, Gujarat"],
    "A",
    "The National Remote Sensing Centre (NRSC), responsible for satellite data acquisition and dissemination, is located in Hyderabad.",
    "Identifies Hyderabad as the headquarters of NRSC."
))

add_p(make_pq(
    "Transport and Communication", "INSAT vs IRS Distinctions", P37_TEXT,
    "What is the primary operational mandate of India's IRS satellite series as contrasted with INSAT?",
    "Management, monitoring, and mapping of natural resources and environmental parameters",
    ["Providing intercontinental ballistic missile defense guidance", "Television entertainment broadcasting and telecommunications exclusively", "Conducting manned space tourism flights to lunar orbit"],
    "B",
    "IRS (Indian Remote Sensing) satellites are dedicated earth observation platforms for agriculture, water, forest, and mineral mapping.",
    "Identifies natural resource monitoring and mapping as IRS mandate."
))

add_p(make_pq(
    "Transport and Communication", "ISRO Geo-Portal", P37_TEXT,
    "What is the name of ISRO's indigenous web-based geospatial portal that provides satellite imagery and earth observation data?",
    "Bhuvan",
    ["Prithvi", "Akash", "Vayu"],
    "C",
    "Bhuvan is ISRO's national geo-spatial platform providing multi-resolution satellite data and geospatial analysis services.",
    "Identifies Bhuvan as ISRO's geospatial portal."
))

add_p(make_pq(
    "Transport and Communication", "Applications of Remote Sensing", P37_TEXT,
    "Which of the following represents a direct real-world application of satellite remote sensing in Indian agriculture?",
    "Pre-harvest crop acreage estimation, crop health monitoring, and drought assessment",
    ["Direct mechanical ploughing of agricultural fields from orbit", "Spraying chemical liquid fertilizers onto crops from satellites", "Eliminating weed growth using laser rays from outer space"],
    "D",
    "Satellite sensors capture spectral signatures of crops, allowing scientists to estimate acreage, health, and moisture stress.",
    "Identifies pre-harvest crop acreage, health, and drought assessment."
))

add_p(make_pq(
    "Transport and Communication", "ISRO Inception Year", P37_TEXT,
    "In which year was the Indian Space Research Organisation (ISRO) formally established?",
    "1969",
    ["1947", "1984", "2000"],
    "A",
    "ISRO was founded on 15 August 1969 under the visionary leadership of Dr. Vikram Sarabhai.",
    "Identifies 1969 as the establishment year of ISRO."
))

# =================================================================================================
# PASSAGE 38: Sugar Industry Spatial Shift in India (Book 2, Chapter 8)
# =================================================================================================
P38_TEXT = """The sugar industry is the second largest agro-based industry in India after cotton textiles. Sugarcane is a weight-losing and perishable crop; its sucrose content begins to deteriorate rapidly through inversion within 24 to 48 hours after harvesting. Furthermore, sugar recovery from cane typically ranges between only 9 to 12 percent. Consequently, sugar mills must be located in close proximity to sugarcane producing fields. Historically, the sugar industry was heavily concentrated in the sub-tropical northern belt of Uttar Pradesh and Bihar. In recent decades, however, there has been a dramatic southward shift of the sugar industry towards peninsular India, especially Maharashtra, Tamil Nadu, Karnataka, and Andhra Pradesh. This locational shift is driven by distinct advantages in peninsular India: a tropical maritime climate free from frost, which yields higher sucrose content per cane; a longer crushing season lasting 7 to 8 months compared to 4 months in north India; and the widespread success of sugarcane farmers' cooperatives."""

add_p(make_pq(
    "Secondary Activities", "Peninsular Advantages for Sugarcane", P38_TEXT,
    "Why has the sugar industry expanded rapidly in peninsular India compared to the northern states?",
    "Higher sucrose content due to tropical climate, longer crushing season, and flourishing cooperative mills",
    ["Northern states have completely prohibited the cultivation of sugarcane by law", "Peninsular soils require zero irrigation and zero sunshine to grow cane", "All northern sugar mills were dismantled and shipped abroad"],
    "B",
    "Peninsular India enjoys maritime tropical weather, giving canes higher sugar content and sustaining longer crushing operations through cooperatives.",
    "Identifies higher sucrose, longer crushing season, and cooperative mills as peninsular advantages."
))

add_p(make_pq(
    "Secondary Activities", "Sugarcane Weight-Losing Character", P38_TEXT,
    "Why are sugar manufacturing mills strictly located within sugarcane cultivation tracts?",
    "Because sugarcane is heavy, bulky, weight-losing, and its sucrose content rapidly deteriorates after cutting",
    ["Because refined white sugar crystals cannot be transported on trains", "Because sugarcane will catch fire if carried more than 5 kilometers", "Because state governments require all workers to live inside cane fields"],
    "C",
    "Sugarcane loses moisture and sucrose content rapidly after harvesting, and sugar recovery is only 10% of total cane weight.",
    "Explains raw material weight loss and rapid sucrose inversion necessitating local milling."
))

add_p(make_pq(
    "Secondary Activities", "Organizational Structure in Maharashtra", P38_TEXT,
    "Which organizational model has been uniquely successful in managing the sugar industry in Maharashtra?",
    "Cooperative sector owned and operated by sugarcane farmer-members",
    ["Private multinational corporations based in London", "100 percent state-owned central government departmental units", "Foreign joint ventures managed by international banks"],
    "D",
    "Maharashtra's sugar revolution is built upon rural cooperative societies where cane farmers jointly own and operate the processing mills.",
    "Identifies cooperative sector management by sugarcane farmers."
))

add_p(make_pq(
    "Secondary Activities", "Typical Sugar Recovery Rate", P38_TEXT,
    "What is the average sugar recovery percentage obtained from crushed sugarcane in Indian sugar mills?",
    "Approximately 9 to 12 percent of total cane weight",
    ["Over 75 percent of total cane weight", "Exactly 50 percent of total cane weight", "Less than 1 percent of total cane weight"],
    "A",
    "For every 100 kg of sugarcane crushed, only about 9 to 12 kg of commercial sugar is recovered, making cane a heavy weight-losing crop.",
    "Identifies 9 to 12 percent as typical sugar recovery rate."
))

add_p(make_pq(
    "Secondary Activities", "Historical Northern Heartlands", P38_TEXT,
    "Which two northern states formed the historical core of the Indian sugar milling industry in the early 20th century?",
    "Uttar Pradesh and Bihar",
    ["Punjab and Haryana", "Rajasthan and Gujarat", "Assam and West Bengal"],
    "B",
    "Uttar Pradesh and Bihar accounted for the vast bulk of India's sugar production during the colonial and early post-independence eras.",
    "Identifies Uttar Pradesh and Bihar as the historical sugar core."
))

# =================================================================================================
# PASSAGE 39: Nuclear Energy and Atomic Minerals in India (Book 2, Chapter 7)
# =================================================================================================
P39_TEXT = """Nuclear energy has emerged as a viable and clean alternative to fossil fuel power generation in India. The Atomic Energy Commission was established in 1948 under the chairmanship of Dr. Homi J. Bhabha, followed by the Department of Atomic Energy in 1954. India possesses limited reserves of uranium but holds some of the world's largest known deposits of thorium. Uranium is primarily extracted from the Singhbhum copper-uranium belt in Jharkhand (Jaduguda mines) and Tummalapalle in Andhra Pradesh. Thorium is derived from 'monazite' sands found extensively in the beach placer sands along the coast of Kerala (Palakkad and Kollam districts), Tamil Nadu, and Odisha. India's commercial nuclear power program commenced in 1969 with the commissioning of the Tarapur Atomic Power Station in Maharashtra. Today, operational nuclear power plants include Rawatbhata near Kota (Rajasthan), Kalpakkam and Kudankulam (Tamil Nadu), Narora (Uttar Pradesh), Kakrapar (Gujarat), and Kaiga (Karnataka)."""

add_p(make_pq(
    "Mineral and Energy Resources", "Monazite Placer Sands", P39_TEXT,
    "Which radioactive mineral ore is derived from the world-famous monazite beach placer sands of Kerala?",
    "Thorium",
    ["Platinum", "Bauxite", "Graphite"],
    "C",
    "Monazite beach sands of Kerala and Tamil Nadu are rich in thorium, the foundation for the third stage of India's nuclear power programme.",
    "Identifies thorium derived from coastal monazite sands."
))

add_p(make_pq(
    "Mineral and Energy Resources", "First Nuclear Power Station", P39_TEXT,
    "Which was India's first commercial nuclear power station, commissioned in 1969?",
    "Tarapur Atomic Power Station in Maharashtra",
    ["Narora Atomic Power Station in Uttar Pradesh", "Kakrapar Nuclear Plant in Gujarat", "Kaiga Nuclear Power Station in Karnataka"],
    "D",
    "Tarapur Atomic Power Station (TAPS) in Palghar district of Maharashtra was India's first nuclear power station, commissioned in 1969.",
    "Identifies Tarapur in Maharashtra as the first nuclear station."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Jaduguda Uranium Mines", P39_TEXT,
    "In which state are the historic Jaduguda uranium underground mines situated?",
    "Jharkhand (Singhbhum belt)",
    ["Rajasthan (Khetri belt)", "Madhya Pradesh (Balaghat belt)", "Karnataka (Kolar belt)"],
    "A",
    "Jaduguda in the East Singhbhum district of Jharkhand was the first uranium mine in India, operated by UCIL.",
    "Identifies Jharkhand (Singhbhum) as location of Jaduguda uranium mines."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Founding Chairman of AEC", P39_TEXT,
    "Who was the visionary architect and founding chairman of India's Atomic Energy Commission in 1948?",
    "Dr. Homi Jehangir Bhabha",
    ["Dr. A.P.J. Abdul Kalam", "Dr. Vikram Sarabhai", "Sir C.V. Raman"],
    "B",
    "Dr. Homi J. Bhabha was the founding father and first chairman of the Indian Atomic Energy Commission.",
    "Identifies Dr. Homi J. Bhabha as the founder of Indian atomic energy."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Nuclear Power Plant Location Match", P39_TEXT,
    "Which nuclear power station is correctly matched with its host state?",
    "Kaiga — Karnataka",
    ["Narora — Rajasthan", "Rawatbhata — Uttar Pradesh", "Kalpakkam — Gujarat"],
    "C",
    "Kaiga is in Karnataka, Narora is in Uttar Pradesh, Rawatbhata is in Rajasthan, and Kalpakkam is in Tamil Nadu.",
    "Matches Kaiga correctly with Karnataka."
))

# =================================================================================================
# PASSAGE 40: Kolkata-Haldia Port Complex & Hooghly Siltation (Book 2, Chapter 11)
# =================================================================================================
P40_TEXT = """Kolkata Port, situated on the east bank of the Hooghly River approximately 128 kilometers inland from the Bay of Bengal, is India's only major riverine port. Built by the British East India Company, it served as the commercial gateway of British India. However, Kolkata Port has long suffered from acute physical limitations: heavy river siltation, narrow twisting navigation channels, and tidal bores that restrict the movement of large deep-draft ocean vessels. Ships must wait for high tide and rely on specialized river pilots to negotiate shifting sandbars. To augment headwater flows down the Hooghly and flush accumulated silt into the sea, the Farakka Barrage was constructed on the Ganga. Furthermore, to decongest Kolkata and handle modern containerized and bulk cargo vessels requiring deep drafts, a satellite deep-water dock system was developed downstream at Haldia, located at the confluence of the Hooghly and Haldi rivers."""

add_p(make_pq(
    "International Trade", "Kolkata Port Riverine Nature", P40_TEXT,
    "What physical distinction sets Kolkata Port apart from all other major seaports of India?",
    "It is India's only major riverine port, situated 128 km inland along the Hooghly River",
    ["It is the only port located in a freshwater mountain glacier", "It has no connection to any ocean or sea", "It is built entirely on floating bamboo rafts"],
    "D",
    "Kolkata Port is located 128 km inland on the tidal Hooghly River, making it the sole major riverine port of India.",
    "Identifies Kolkata Port as India's sole major riverine port."
))

add_p(make_pq(
    "International Trade", "Farakka Barrage Function", P40_TEXT,
    "What was the primary hydrological purpose behind constructing the Farakka Barrage across the Ganga?",
    "To divert upland freshwater flows into the Hooghly River to flush silt and maintain navigation depths",
    ["To stop all river water from flowing into Bangladesh permanently", "To generate nuclear electricity using river mud", "To create a massive reservoir for breeding ocean sharks"],
    "A",
    "Farakka Barrage diverts water from the Ganga into the Bhagirathi-Hooghly system to flush sediment and protect Kolkata Port.",
    "Identifies flushing silt from the Hooghly to sustain navigability as Farakka's purpose."
))

add_p(make_pq(
    "International Trade", "Haldia Satellite Port", P40_TEXT,
    "Why was the deep-water satellite port of Haldia developed downstream from Kolkata?",
    "To handle large deep-draft cargo ships and petroleum tankers that cannot navigate the shallow Hooghly",
    ["Because Kolkata Port was completely closed and turned into a shopping mall", "To serve exclusively as an international naval submarine warfare base", "Because all ocean trade with Europe was permanently halted"],
    "B",
    "Haldia dock complex was commissioned downstream to handle deep-draft bulk carriers, container ships, and crude oil tankers.",
    "Identifies handling deep-draft vessels and decongesting Kolkata as Haldia's objective."
))

add_p(make_pq(
    "International Trade", "Tidal Phenomenon on the Hooghly", P40_TEXT,
    "Which maritime hydrological phenomenon poses severe navigational hazards to vessels entering Kolkata Port?",
    "Tidal bores and fluctuating water depths over shifting sandbanks",
    ["Sub-zero iceberg collisions in the Bay of Bengal", "Continuous underwater volcanic earthquakes", "Permanent whirlpools that swallow container ships"],
    "C",
    "Tidal bores surge up the funnel-shaped Hooghly estuary during spring tides, making navigation treacherous without expert pilots.",
    "Identifies tidal bores and sandbars as major navigational hazards."
))

add_p(make_pq(
    "International Trade", "Confluence of Haldia", P40_TEXT,
    "At the confluence of which two rivers is the Haldia Port complex situated?",
    "Hooghly and Haldi rivers",
    ["Ganga and Brahmaputra rivers", "Damodar and Subarnarekha rivers", "Mahanadi and Baitarani rivers"],
    "D",
    "Haldia is situated on the south-west bank of the Hooghly River at its confluence with the Haldi River in Purba Medinipur.",
    "Identifies Hooghly and Haldi rivers as the confluence site of Haldia Port."
))

# Validation and export
assert len(passages_part2) == 100
all_passages = passages_part1 + passages_part2
assert len(all_passages) == 200

with open("mock/geo_units/passages_part2.json", "w", encoding="utf-8") as f:
    json.dump(passages_part2, f, indent=2, ensure_ascii=False)

with open("mock/geo_units/passages.json", "w", encoding="utf-8") as f:
    json.dump(all_passages, f, indent=2, ensure_ascii=False)

print(f"Passages Part 2 generated successfully: {len(passages_part2)} questions across 20 passages.")
print(f"Total passages.json generated successfully: {len(all_passages)} questions across 40 passages.")
