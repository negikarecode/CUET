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

# Load seen questions from units 1 to 6
for u in range(1, 7):
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
# UNIT 7: Transport, Communication & International Trade (World) (80 Questions)
# =================================================================================================
CHAPTER_U7 = "Transport, Communication and International Trade"
u7_qs = []
u7_seen = set()

def add_u7(q):
    u7_qs.append(q)

# Q1: Trans-Siberian Railway terminals
opts, c, s = rotate_options(
    "St. Petersburg in the west to Vladivostok on the Pacific coast",
    ["Moscow in the west to Beijing in the east", "Murmansk in the north to Sevastopol on the Black Sea", "Berlin in Germany to Tokyo in Japan"],
    "A",
    "The Trans-Siberian Railway, the world's longest major rail line (9,332 km), runs from St. Petersburg in the west to Vladivostok on the Pacific coast.\nHence, Option {{CORR}} is correct.",
    "Identifies St. Petersburg and Vladivostok as the terminals of the Trans-Siberian Railway."
)
add_u7(make_question(CHAPTER_U7, "Trans-continental Railways", "What are the two terminal stations of the famous Trans-Siberian Railway?", opts, c, s))

# Q2: Trans-Siberian length and features
opts, c, s = rotate_options(
    "9,332 km; double tracked and electrified throughout",
    ["2,500 km; single line narrow gauge track", "20,000 km; unpaved gravel track for steam engines", "5,000 km; solar powered magnetic levitation track"],
    "B",
    "The Trans-Siberian Railway has a length of 9,332 km. It is double-tracked and completely electrified throughout its entire stretch.\nHence, Option {{CORR}} is correct.",
    "Specifies 9,332 km length and double-tracked electrification of Trans-Siberian Railway."
)
add_u7(make_question(CHAPTER_U7, "Trans-continental Railways", "What is the total length and technical feature of the Trans-Siberian Railway?", opts, c, s))

# Q3: Trans-Siberian intermediate junctions
opts, c, s = rotate_options(
    "Moscow, Ufa, Novosibirsk, Krasnoyarsk, Irkutsk, and Chita",
    ["Warsaw, Prague, Vienna, Budapest, and Belgrade", "Kiev, Odessa, Sevastopol, and Yalta", "Tashkent, Samarkand, Bukhara, and Ashgabat"],
    "C",
    "The Trans-Siberian Railway passes through key industrial and administrative cities: Moscow, Ufa, Novosibirsk, Krasnoyarsk, Irkutsk (near Lake Baikal), Chita, and Khabarovsk.\nHence, Option {{CORR}} is correct.",
    "Lists major intermediate cities along the Trans-Siberian route."
)
add_u7(make_question(CHAPTER_U7, "Trans-continental Railways", "Which of the following cities are important transit nodes along the Trans-Siberian Railway?", opts, c, s))

# Q4: Canadian Pacific Railway terminals
opts, c, s = rotate_options(
    "Halifax and Montreal in the east to Vancouver on the Pacific coast",
    ["Toronto in the east to Los Angeles in the west", "Quebec in the north to Miami in the south", "Calgary in the prairies to Anchorage in Alaska"],
    "D",
    "The Canadian Pacific Railway extends 7,050 km, constructed from Halifax and Montreal in the east to Vancouver on the Pacific coast in British Columbia.\nHence, Option {{CORR}} is correct.",
    "Identifies Halifax/Montreal and Vancouver as terminals of the Canadian Pacific Railway."
)
add_u7(make_question(CHAPTER_U7, "Trans-continental Railways", "Which terminal cities are connected by the Canadian Pacific Railway?", opts, c, s))

# Q5: Australian Trans-continental Railway
opts, c, s = rotate_options(
    "Perth in the west to Sydney in the east via Kalgoorlie, Broken Hill, and Port Augusta",
    ["Darwin in the north to Hobart in the south", "Brisbane in the east to Alice Springs in the center", "Melbourne to Auckland across the Tasman Sea"],
    "A",
    "The Australian Trans-continental Railway runs east-west across the continent from Perth on the Indian Ocean coast to Sydney on the Pacific coast, via Kalgoorlie, Broken Hill, and Port Augusta.\nHence, Option {{CORR}} is correct.",
    "Identifies Perth and Sydney as terminals of the Australian Trans-continental line."
)
add_u7(make_question(CHAPTER_U7, "Trans-continental Railways", "Which major cities form the western and eastern terminals of the Australian Trans-continental Railway?", opts, c, s))

# Q6: Orient Express route
opts, c, s = rotate_options(
    "Paris (France) to Istanbul (Turkey) via Strasbourg, Munich, Vienna, Budapest, and Belgrade",
    ["London to Moscow via Berlin and Warsaw", "Madrid to Rome via Marseille and Genoa", "Stockholm to Athens via Copenhagen and Sofia"],
    "B",
    "The historic Orient Express runs from Paris to Istanbul, passing through Strasbourg, Munich, Vienna, Budapest, and Belgrade, slashing travel time from 10 days to under 40 hours.\nHence, Option {{CORR}} is correct.",
    "Traces the Paris to Istanbul route of the Orient Express."
)
add_u7(make_question(CHAPTER_U7, "Trans-continental Railways", "Which European capitals and cities are traversed by the famous 'Orient Express' railway line?", opts, c, s))

# Q7: Northern Atlantic Sea Route name
opts, c, s = rotate_options(
    "The 'Big Trunk Route', carrying one-fourth of the world's foreign trade",
    ["The 'Silk Oceanic Highway', connecting only desert ports", "The 'Polar Express Channel', operating under thick pack ice", "The 'Spice Lagoon Corridor', carrying only cloves and nutmeg"],
    "C",
    "The Northern Atlantic Sea Route links North-Eastern USA with North-Western Europe—the two most industrially developed regions on Earth. It is famously called the 'Big Trunk Route' and handles about 25% of global maritime commerce.\nHence, Option {{CORR}} is correct.",
    "Identifies the Northern Atlantic route as the 'Big Trunk Route' carrying 25% of world trade."
)
add_u7(make_question(CHAPTER_U7, "Ocean Routes", "Why is the Northern Atlantic Sea Route famously designated as the 'Big Trunk Route'?", opts, c, s))

# Q8: Mediterranean-Indian Ocean Route
opts, c, s = rotate_options(
    "Connects Western Europe with West Africa, South Asia, Southeast Asia, and Australia via the Suez Canal",
    ["Connects North America with South America through the Panama Canal", "Crosses the Arctic Ocean to connect Norway with Alaska", "Runs solely between small islands in the Caribbean Sea"],
    "D",
    "The Mediterranean-Indian Ocean sea route connects Western Europe with Mediterranean ports, passes through the Suez Canal into the Red Sea, and serves East Africa, South Asia (Mumbai, Colombo), Southeast Asia (Singapore), and Australia.\nHence, Option {{CORR}} is correct.",
    "Describes the reach of the Mediterranean-Indian Ocean maritime trade artery."
)
add_u7(make_question(CHAPTER_U7, "Ocean Routes", "Which global regions are directly linked by the Mediterranean-Indian Ocean Sea Route?", opts, c, s))

# Q9: Cape of Good Hope Sea Route
opts, c, s = rotate_options(
    "Connects Western Europe and West Africa with South Africa, Australia, and New Zealand around southern Africa",
    ["Runs between North America and Japan across the Bering Strait", "Links the Black Sea directly with the Baltic Sea without canals", "Circles Antarctica continuously without touching any continent"],
    "A",
    "The Cape of Good Hope sea route connects Western Europe and West Africa with South Africa, Australia, and New Zealand around the southern tip of the African continent.\nHence, Option {{CORR}} is correct.",
    "Identifies the geographic extent of the Cape of Good Hope sea route."
)
add_u7(make_question(CHAPTER_U7, "Ocean Routes", "What is the geographical course of the 'Cape of Good Hope Sea Route'?", opts, c, s))

# Q10: Suez Canal construction and builder
opts, c, s = rotate_options(
    "Constructed in 1869 by French engineer Ferdinand de Lesseps across the Isthmus of Suez",
    ["Constructed in 1914 by the US Army Corps of Engineers across Panama", "Built in 1750 by the British East India Company across Bengal", "Built in 1890 by German engineers across the Kiel peninsula"],
    "B",
    "The Suez Canal was constructed in 1869 in Egypt across the Isthmus of Suez by French diplomat and engineer Ferdinand de Lesseps.\nHence, Option {{CORR}} is correct.",
    "Dates the Suez Canal to 1869, built by Ferdinand de Lesseps."
)
add_u7(make_question(CHAPTER_U7, "Shipping Canals", "In which year and under whose direction was the historic Suez Canal officially constructed?", opts, c, s))

# Q11: Suez Canal terminal ports
opts, c, s = rotate_options(
    "Port Said on the Mediterranean Sea in the north to Port Suez on the Red Sea in the south",
    ["Alexandria on the Mediterranean to Cairo on the Nile", "Colon on the Caribbean to Panama City on the Pacific", "Aden in Yemen to Djibouti on the Horn of Africa"],
    "C",
    "The Suez Canal connects the Mediterranean Sea at Port Said in the north with the Red Sea at Port Suez in the south.\nHence, Option {{CORR}} is correct.",
    "Identifies Port Said and Port Suez as the northern and southern terminals of the Suez Canal."
)
add_u7(make_question(CHAPTER_U7, "Shipping Canals", "What are the northern and southern terminal ports of the Suez Canal?", opts, c, s))

# Q12: Suez Canal technical features
opts, c, s = rotate_options(
    "About 160 km long, a sea-level canal without any locks, saving 6,400 km between Liverpool and Colombo compared to Cape route",
    ["72 km long with three sets of mechanical lifting locks", "500 km long cutting through high granite mountain tunnels", "A freshwater canal fed exclusively by Lake Victoria"],
    "D",
    "The Suez Canal is roughly 160 km long and has no locks because the Mediterranean and Red Seas are at nearly the same sea level. It saves about 6,400 km between Liverpool and Colombo compared to the Cape route.\nHence, Option {{CORR}} is correct.",
    "Highlights Suez Canal features: 160 km length, no locks (sea level), 6400 km distance saved."
)
add_u7(make_question(CHAPTER_U7, "Shipping Canals", "Which technical characteristics accurately describe the Suez Canal?", opts, c, s))

# Q13: Panama Canal construction and opening
opts, c, s = rotate_options(
    "Constructed by the United States Government and opened in 1914 across the Isthmus of Panama",
    ["Constructed by the French Empire in 1869 across the Sinai Peninsula", "Built by the Spanish Armada in 1588 across the Amazon River", "Constructed by Brazil in 1950 across the Andes Mountains"],
    "A",
    "The Panama Canal was constructed by the US Government across the narrow Isthmus of Panama, officially opening for international shipping in 1914.\nHence, Option {{CORR}} is correct.",
    "Identifies 1914 opening of the Panama Canal constructed by the US Government."
)
add_u7(make_question(CHAPTER_U7, "Shipping Canals", "Which government constructed the Panama Canal, and in which year was it opened for maritime navigation?", opts, c, s))

# Q14: Panama Canal terminal ports
opts, c, s = rotate_options(
    "Colon on the Atlantic (Caribbean Sea) to Panama City on the Pacific Ocean",
    ["Port Said on the Mediterranean to Port Suez on the Red Sea", "Havana in Cuba to Kingston in Jamaica", "Buenos Aires on the Atlantic to Valparaiso on the Pacific"],
    "B",
    "The Panama Canal connects Colon on the Atlantic (Caribbean) side with Panama City on the Pacific Ocean side.\nHence, Option {{CORR}} is correct.",
    "Identifies Colon and Panama City as terminals of the Panama Canal."
)
add_u7(make_question(CHAPTER_U7, "Shipping Canals", "What are the terminal ports of the Panama Canal on the Atlantic and Pacific oceans respectively?", opts, c, s))

# Q15: Panama Canal lock system
opts, c, s = rotate_options(
    "Has a lock system with three sets of locks (Gatun, Pedro Miguel, Miraflores) lifting ships 26 meters up to Gatun Lake",
    ["Is a sea-level ditch without any gates or locks", "Uses underground subway trains to carry container ships on flatcars", "Operates solely during low tide when seawater is drained"],
    "C",
    "The Panama Canal has a lock system: ships pass through three sets of locks (Gatun Locks on Atlantic, Pedro Miguel and Miraflores Locks on Pacific), lifting ships 26 meters up to Gatun Lake to cross the continental divide.\nHence, Option {{CORR}} is correct.",
    "Explains the Panama Canal lock system and Gatun Lake."
)
add_u7(make_question(CHAPTER_U7, "Shipping Canals", "How does the lock system of the Panama Canal operate to transport vessels across the continental divide?", opts, c, s))

# Q16: Distance saved by Panama Canal
opts, c, s = rotate_options(
    "Shortens the sea route between New York and San Francisco by about 13,000 km",
    ["Shortens the distance by only 50 km", "Increases the distance by 5,000 km", "Has no effect on shipping distance between American coasts"],
    "D",
    "The Panama Canal eliminated the hazardous voyage around Cape Horn at the tip of South America, shortening the sea journey between New York and San Francisco by about 13,000 km.\nHence, Option {{CORR}} is correct.",
    "Identifies the 13,000 km distance saved between New York and San Francisco via Panama Canal."
)
add_u7(make_question(CHAPTER_U7, "Shipping Canals", "By how much distance does the Panama Canal shorten the sea journey between New York and San Francisco compared to the Cape Horn route?", opts, c, s))

# Q17: Rhine Inland Waterway
opts, c, s = rotate_options(
    "Flows through Germany and the Netherlands, navigable for 700 km from Rotterdam to Basel, serving the Ruhr industrial basin",
    ["Flows through Spain and Portugal into the Mediterranean Sea", "Flows through Russia into the Caspian Sea", "Flows through Greece and Turkey into the Black Sea"],
    "A",
    "The Rhine flows through Germany and the Netherlands. It is navigable for 700 km from Rotterdam at its mouth to Basel in Switzerland. It flows through the Ruhr coalfield and is the world's most heavily used inland waterway.\nHence, Option {{CORR}} is correct.",
    "Describes the Rhine Waterway: Rotterdam to Basel, 700 km, Ruhr industrial artery."
)
add_u7(make_question(CHAPTER_U7, "Inland Waterways", "Which statement accurately describes the 'Rhine Inland Waterway' in Europe?", opts, c, s))

# Q18: Danube Inland Waterway
opts, c, s = rotate_options(
    "Rises in the Black Forest (Germany), flows eastward into the Black Sea, and serves 10 European nations",
    ["Rises in the Alps and flows into the English Channel", "Rises in the Urals and flows into the Arctic Ocean", "Rises in the Pyrenees and flows into the Atlantic Ocean"],
    "B",
    "The Danube river rises in the Black Forest of Germany and flows eastward through Central and Eastern Europe, emptying into the Black Sea at Sulina. It serves 10 countries and carries wheat, maize, and timber.\nHence, Option {{CORR}} is correct.",
    "Details the course of the Danube: Black Forest eastward to Black Sea."
)
add_u7(make_question(CHAPTER_U7, "Inland Waterways", "What is the geographical course and terminal sea of the 'Danube Waterway' in Europe?", opts, c, s))

# Q19: Volga Inland Waterway
opts, c, s = rotate_options(
    "The most important inland waterway in Russia, draining into the Caspian Sea, connected to the Baltic and White Seas via canals",
    ["A river in France connecting Paris with the Mediterranean Sea", "A river in Canada connecting Lake Superior with Hudson Bay", "A river in Australia flowing through the Great Victoria Desert"],
    "C",
    "The Volga is the premier navigable river of Russia, draining into the landlocked Caspian Sea. Canals connect the Volga with the Moscow river, the Baltic Sea, the White Sea, and the Don river (giving access to the Black Sea).\nHence, Option {{CORR}} is correct.",
    "Identifies the Volga as Russia's premier waterway draining to the Caspian and linked via canals."
)
add_u7(make_question(CHAPTER_U7, "Inland Waterways", "What are the significant features of the 'Volga Waterway' in Russian transport geography?", opts, c, s))

# Q20: Great Lakes - St. Lawrence Seaway
opts, c, s = rotate_options(
    "Commercial waterway connecting the five Great Lakes with the Atlantic Ocean via the St. Lawrence river and canals (Soo and Welland canals)",
    ["A high-speed canal connecting the Amazon river with the Orinoco river", "An artificial channel connecting Lake Baikal with the Sea of Okhotsk", "An inland waterway linking Lake Chad with the River Congo"],
    "D",
    "The Great Lakes (Superior, Michigan, Huron, Erie, Ontario) together with the St. Lawrence Seaway form a unique commercial waterway in North America. The Soo Canal overcomes St. Mary's falls and Welland Canal bypasses Niagara Falls.\nHence, Option {{CORR}} is correct.",
    "Explains the Great Lakes - St. Lawrence Seaway network."
)
add_u7(make_question(CHAPTER_U7, "Inland Waterways", "Which inland waterway system allows deep-draft ocean freighters to penetrate 3,700 km into the North American heartland?", opts, c, s))

# Q21: Soo Canal location
opts, c, s = rotate_options(
    "Connects Lake Superior with Lake Huron, bypassing the rapids of the St. Mary's River",
    ["Connects Lake Erie with Lake Ontario, bypassing Niagara Falls", "Connects Lake Michigan with the Mississippi River", "Connects Lake Victoria with Lake Tanganyika in Africa"],
    "A",
    "The Soo Canal (Sault Ste. Marie Canal) connects Lake Superior with Lake Huron, bypassing the rapids of the St. Mary's River.\nHence, Option {{CORR}} is correct.",
    "Identifies the Soo Canal connecting Lake Superior with Lake Huron."
)
add_u7(make_question(CHAPTER_U7, "Canals and Locks", "Which two Great Lakes are connected by the 'Soo Canal'?", opts, c, s))

# Q22: Welland Canal location
opts, c, s = rotate_options(
    "Connects Lake Erie with Lake Ontario, bypassing Niagara Falls",
    ["Connects Lake Huron with Lake Michigan", "Connects Lake Superior with Lake Michigan", "Connects Lake Ontario with Hudson Bay"],
    "B",
    "The Welland Canal connects Lake Erie with Lake Ontario, using a series of eight locks to bypass the impassable drop of Niagara Falls.\nHence, Option {{CORR}} is correct.",
    "Identifies the Welland Canal bypassing Niagara Falls between Lake Erie and Lake Ontario."
)
add_u7(make_question(CHAPTER_U7, "Canals and Locks", "Which natural obstacle is bypassed by the 'Welland Canal' between Lake Erie and Lake Ontario?", opts, c, s))

# Q23: Mississippi Waterway terminal
opts, c, s = rotate_options(
    "Gulf of Mexico at New Orleans",
    ["Chesapeake Bay at Baltimore", "Hudson River at New York City", "Puget Sound at Seattle"],
    "C",
    "The Mississippi-Ohio waterway connects the interior of the United States with the Gulf of Mexico in the south, terminating at the major seaport of New Orleans.\nHence, Option {{CORR}} is correct.",
    "Identifies the Gulf of Mexico (New Orleans) as the Mississippi waterway terminus."
)
add_u7(make_question(CHAPTER_U7, "Inland Waterways", "At which major seaport does the Mississippi inland waterway system terminate in the south?", opts, c, s))

# Q24: Big Inch Pipeline
opts, c, s = rotate_options(
    "Transports crude petroleum from the oil wells of the Gulf of Mexico to refineries in the North-Eastern USA",
    ["Carries fresh drinking water from Lake Superior to Los Angeles", "Transports natural gas from Alaska to South America", "Carries liquid nitrogen across the Mojave Desert"],
    "D",
    "The 'Big Inch' is one of the most famous petroleum pipelines in the world, carrying crude oil from oilfields around the Gulf of Mexico to the heavily populated, industrial North-Eastern states of the USA.\nHence, Option {{CORR}} is correct.",
    "Identifies Big Inch pipeline carrying Gulf of Mexico crude to North-Eastern USA."
)
add_u7(make_question(CHAPTER_U7, "Pipelines", "What commodity is transported by the famous 'Big Inch' pipeline in the United States, and between which regions?", opts, c, s))

# Q25: Advantages of Pipeline Transport
opts, c, s = rotate_options(
    "Continuous, uninterrupted flow of liquids and gases, low operating cost after construction, immune to adverse weather, and minimal transit losses",
    ["Can transport heavy solid iron ore boulders without crushing", "Can be easily converted into high-speed passenger subway tracks", "Requires zero capital investment to construct across mountains"],
    "A",
    "Pipelines provide uninterrupted supply of liquids and gases through difficult terrains, do not suffer from traffic congestion or weather delays, and have very low operating costs after initial laying.\nHence, Option {{CORR}} is correct.",
    "Lists key advantages of pipeline transportation for liquids and gases."
)
add_u7(make_question(CHAPTER_U7, "Pipelines", "What are the primary operational advantages of pipelines compared to surface road or rail transport?", opts, c, s))

# Q26: WTO establishment date and headquarters
opts, c, s = rotate_options(
    "Established on 1 January 1995, headquartered in Geneva, Switzerland",
    ["Established on 24 October 1945, headquartered in New York, USA", "Established on 15 August 1947, headquartered in London, UK", "Established on 1 July 1944, headquartered in Washington DC, USA"],
    "B",
    "The World Trade Organization (WTO) was established on 1 January 1995 as the permanent successor to the General Agreement on Tariffs and Trade (GATT). Its headquarters are in Geneva, Switzerland.\nHence, Option {{CORR}} is correct.",
    "Dates the WTO to 1 January 1995 with headquarters in Geneva."
)
add_u7(make_question(CHAPTER_U7, "International Trade Bodies", "On which date was the World Trade Organization (WTO) formally established, and where is its global headquarters situated?", opts, c, s))

# Q27: Predecessor of WTO
opts, c, s = rotate_options(
    "General Agreement on Tariffs and Trade (GATT), formed in 1948",
    ["International Monetary Fund (IMF)", "League of Nations Trade Committee", "United Nations Development Programme (UNDP)"],
    "C",
    "The predecessor of the WTO was the General Agreement on Tariffs and Trade (GATT), created in 1948 by 23 nations to reduce tariffs and promote non-discriminatory international trade.\nHence, Option {{CORR}} is correct.",
    "Identifies GATT (1948) as the direct predecessor to the WTO."
)
add_u7(make_question(CHAPTER_U7, "International Trade Bodies", "Which international multilateral trade treaty served as the direct predecessor to the World Trade Organization?", opts, c, s))

# Q28: Bilateral vs Multilateral Trade
opts, c, s = rotate_options(
    "Bilateral trade is conducted between two countries, while Multilateral trade is conducted with many countries simultaneously",
    ["Bilateral trade is conducted using paper currency, while multilateral trade uses barter", "Bilateral trade occurs only on Sundays, while multilateral trade occurs on weekdays", "Both terms are identical and mean domestic trade within a single province"],
    "D",
    "Bilateral trade is the trade carried on between two countries on mutually agreed commodities. Multilateral trade is trade conducted with many trading countries simultaneously, allowing a country to use surplus with one nation to pay deficits with another.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Bilateral trade (two nations) from Multilateral trade (many nations)."
)
add_u7(make_question(CHAPTER_U7, "Types of Trade", "What is the distinction between 'Bilateral Trade' and 'Multilateral Trade'?", opts, c, s))

# Q29: Balance of Trade: Favourable vs Unfavourable
opts, c, s = rotate_options(
    "Favourable when the value of exports exceeds imports; Unfavourable when the value of imports exceeds exports",
    ["Favourable when imports exceed exports tenfold", "Favourable only when a country stops all foreign trade", "Unfavourable when exports exceed imports by 100%"],
    "A",
    "Balance of trade is the difference between the monetary value of exports and imports. If the value of exports is greater than imports, it is a Favourable (positive) balance. If imports exceed exports, it is an Unfavourable (negative) balance.\nHence, Option {{CORR}} is correct.",
    "Accurately defines favourable (exports > imports) and unfavourable (imports > exports) balance of trade."
)
add_u7(make_question(CHAPTER_U7, "Balance of Trade", "When is a country's 'Balance of Trade' considered to be 'Favourable'?", opts, c, s))

# Q30: Dumping in International Trade
opts, c, s = rotate_options(
    "The practice of selling a commodity in two countries at different prices, selling in a foreign market below cost price to capture market share",
    ["Throwing commercial cargo into the ocean during severe storms", "Dumping industrial solid waste into municipal landfills", "Selling counterfeit paper currency in underground markets"],
    "B",
    "Dumping is the practice of price discrimination where an exporting nation sells goods in a foreign country at a price below its domestic cost of production, driving out domestic competitor manufacturers.\nHence, Option {{CORR}} is correct.",
    "Defines Dumping as selling goods overseas below domestic production cost."
)
add_u7(make_question(CHAPTER_U7, "Trade Practices", "What does the commercial term 'Dumping' refer to in international trade policy?", opts, c, s))

# Q31: Ports of Call definition
opts, c, s = rotate_options(
    "Ports developed originally as calling points on ocean routes to refuel, take on fresh water, and restock food (e.g. Aden, Honolulu, Singapore)",
    ["Ports designed exclusively for military submarine construction", "Ports that handle only mail envelopes across river ferries", "Ports that process raw sewage from coastal cities"],
    "C",
    "Ports of Call are ports which originally developed as calling points on main sea routes where ships used to anchor for refueling, watering, and taking on food supplies (e.g. Aden, Honolulu, Singapore).\nHence, Option {{CORR}} is correct.",
    "Defines Ports of Call (Aden, Honolulu, Singapore) for refueling and supplies."
)
add_u7(make_question(CHAPTER_U7, "Port Classification", "What is a 'Port of Call' in international maritime trade geography?", opts, c, s))

# Q32: Packet Stations / Ferry Ports
opts, c, s = rotate_options(
    "Ports concerned with the transport of passengers and mail across short water bodies (e.g. Dover in England and Calais in France)",
    ["Ports that store petroleum in large round storage tanks", "Ports that load iron ore into automated bulk carrier ships", "Ports that operate commercial rocket launch pads"],
    "D",
    "Packet stations (ferry ports) specialize in conveying passengers, mail, and vehicles across short stretches of water between two countries (e.g. Dover across the English Channel to Calais in France).\nHence, Option {{CORR}} is correct.",
    "Defines Packet Stations (Dover-Calais) transporting passengers/mail across narrow waters."
)
add_u7(make_question(CHAPTER_U7, "Port Classification", "What are 'Packet Stations' (or Ferry Ports), such as Dover and Calais across the English Channel?", opts, c, s))

# Q33: Entrepôt Ports
opts, c, s = rotate_options(
    "Collection centres where goods are imported from various countries for temporary storage, packaging, and re-export to other nations (e.g. Singapore, Rotterdam)",
    ["Ports restricted exclusively to small wooden fishing rowboats", "Ports that manufacture iron and steel from raw hematite ore", "Ports that operate underground gold bullion vaults"],
    "A",
    "Entrepôt ports are commercial collection hubs where goods are brought from different countries for re-export to other destinations, without paying heavy import duties (e.g. Singapore, Rotterdam, Copenhagen).\nHence, Option {{CORR}} is correct.",
    "Defines Entrepôt Ports as re-export collection centers (Singapore, Rotterdam)."
)
add_u7(make_question(CHAPTER_U7, "Port Classification", "What is the defining function of an 'Entrepôt Port' in global commerce?", opts, c, s))

# Q34: Oil Ports
opts, c, s = rotate_options(
    "Ports that specialize in receiving, storing, refining, and exporting crude oil and petroleum products (e.g. Maracaibo, Esskhira, Tripoli)",
    ["Ports that supply vegetable cooking oil to local grocery stores", "Ports that catch and process whale oil in the Antarctic", "Ports that manufacture lubricating grease for bicycles"],
    "B",
    "Oil ports deal in the processing and shipping of oil. Some are tanker ports (like Maracaibo in Venezuela, Esskhira in Tunisia, Tripoli in Lebanon) and some are refinery ports (like Abadan in Iran).\nHence, Option {{CORR}} is correct.",
    "Defines Oil Ports (Maracaibo, Esskhira, Tripoli) specialized in petroleum shipping."
)
add_u7(make_question(CHAPTER_U7, "Port Classification", "Which of the following seaports are classified as specialized 'Oil Ports'?", opts, c, s))

# Q35: Inland Ports vs Outports
opts, c, s = rotate_options(
    "Inland ports are located on navigable rivers or canals away from the sea coast, while Outports are deep-water ports built in deeper water to serve parent cities",
    ["Inland ports are for military aircraft, while outports are for space rockets", "Inland ports handle only grain, while outports handle only bananas", "Both are identical and refer exclusively to postal rail terminals"],
    "C",
    "Inland ports are located on rivers or canals away from the sea, linked by river channels (e.g. Kolkata on Hugli, Duisburg on Rhine). Outports are deep-water ports built closer to the sea to accommodate large ships unable to reach parent ports (e.g. Athens' outport Piraeus, Kolkata's outport Haldia).\nHence, Option {{CORR}} is correct.",
    "Distinguishes riverine Inland Ports from deep-water Outports."
)
add_u7(make_question(CHAPTER_U7, "Port Classification", "What is the difference between an 'Inland Port' and an 'Outport'?", opts, c, s))

# Q36: Match Ports with Functional Types
add_u7(make_match_question(
    CHAPTER_U7, "Port Typology",
    "Match List I (Seaport Name) with List II (Functional Classification):",
    [("A", "Rotterdam and Singapore"), ("B", "Dover and Calais"), ("C", "Honolulu and Aden"), ("D", "Maracaibo and Tripoli")],
    [("I", "Packet Stations / Ferry Ports"), ("II", "Ports of Call"), ("III", "Entrepôt Ports"), ("IV", "Oil Ports")],
    "A-III, B-I, C-II, D-IV", "D",
    "Rotterdam and Singapore are Entrepôt ports (III); Dover and Calais are Packet stations (I); Honolulu and Aden are Ports of Call (II); Maracaibo and Tripoli are Oil ports (IV).",
    "Correctly matches global seaports to their functional classifications."
))

# Q37: Match Canals with Connecting Bodies
add_u7(make_match_question(
    CHAPTER_U7, "Global Canals",
    "Match List I (Canal / Waterway) with List II (Water Bodies Connected):",
    [("A", "Suez Canal"), ("B", "Panama Canal"), ("C", "Soo Canal"), ("D", "Welland Canal")],
    [("I", "Lake Erie and Lake Ontario"), ("II", "Mediterranean Sea and Red Sea"), ("III", "Atlantic Ocean and Pacific Ocean"), ("IV", "Lake Superior and Lake Huron")],
    "A-II, B-III, C-IV, D-I", "A",
    "Suez Canal connects Mediterranean and Red Sea (II); Panama connects Atlantic and Pacific (III); Soo connects Superior and Huron (IV); Welland connects Erie and Ontario (I).",
    "Matches world canals with the respective water bodies they connect."
))

# Q38: Statement on Pan-American Highway
add_u7(make_statement_question(
    CHAPTER_U7, "Highways",
    "The Pan-American Highway links the countries of North America, Central America, and South America.",
    "The Trans-Canadian Highway links St. John's in Newfoundland with Victoria in British Columbia.",
    1, "B",
    "Both statements are correct. The Pan-American Highway traverses North, Central, and South America. The Trans-Canadian Highway extends across Canada from St. John's (Newfoundland) in the east to Victoria (British Columbia) in the west.",
    "Affirms facts about major continental highway arteries (Pan-American and Trans-Canadian)."
))

# Q39: Assertion-Reason on Suez Canal Sea-Level Route
add_u7(make_assertion_question(
    CHAPTER_U7, "Suez Canal Engineering",
    "The Suez Canal was constructed without any mechanical lock gates.",
    "The waters of the Mediterranean Sea and the Red Sea are at approximately the same sea-level elevation.",
    1, "C",
    "Both Assertion and Reason are true, and Reason correctly explains the Assertion. Unlike the Panama Canal, which crosses the Isthmus of Panama with lock gates, the Suez Canal cuts through flat desert sand where sea levels are identical.",
    "Explains why the Suez Canal is a sea-level canal without locks."
))

# Q40: Multi-statement on Basis of International Trade
add_u7(make_multi_statement_question(
    CHAPTER_U7, "International Trade Basis",
    "Which of the following factors constitute the fundamental basis of international trade?",
    [
        ("A", "Difference in national natural resources (geology, mineral wealth, and climate)."),
        ("B", "Population factors (size, density, and unique cultural craft specializations)."),
        ("C", "Disparity in the stage of economic development and technological capability."),
        ("D", "Strict universal ban on all foreign maritime shipping.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "D",
    "Statements A, B, and C are fundamental drivers of international trade according to NCERT. Statement D is contradictory as international trade relies on open maritime shipping corridors.",
    "Identifies valid economic, geographic, and demographic foundations of international trade."
))

# Q41: Regional Trade Blocs: ASEAN, EU, NAFTA, OPEC
opts, c, s = rotate_options(
    "Groups of nations that enter into trade agreements to reduce or eliminate tariffs and stimulate intra-regional commerce",
    ["Military pacts designed exclusively for launching nuclear strikes", "Religious congregations meeting once a century in Rome", "International sports federations organizing soccer world cups"],
    "A",
    "Regional trade blocs (e.g. EU, NAFTA/USMCA, ASEAN, MERCOSUR, OPEC) are formed by neighboring or allied countries to foster free trade, reduce tariffs, and accelerate mutual economic development.\nHence, Option {{CORR}} is correct.",
    "Defines Regional Trade Blocs as economic associations reducing intra-regional tariffs."
)
add_u7(make_question(CHAPTER_U7, "Trade Blocs", "What is the primary objective of forming 'Regional Trade Blocs' like the European Union (EU) or ASEAN?", opts, c, s))

# Q42: OPEC headquarters
opts, c, s = rotate_options(
    "Vienna, Austria",
    ["Riyadh, Saudi Arabia", "Tehran, Iran", "Kuwait City, Kuwait"],
    "B",
    "The Organization of the Petroleum Exporting Countries (OPEC) was founded in Baghdad in 1960 and has its permanent headquarters in Vienna, Austria.\nHence, Option {{CORR}} is correct.",
    "Identifies Vienna, Austria as the headquarters of OPEC."
)
add_u7(make_question(CHAPTER_U7, "Trade Blocs", "Where is the permanent headquarters of the Organization of the Petroleum Exporting Countries (OPEC) situated?", opts, c, s))

# Q43: ASEAN headquarters
opts, c, s = rotate_options(
    "Jakarta, Indonesia",
    ["Bangkok, Thailand", "Kuala Lumpur, Malaysia", "Singapore"],
    "C",
    "The Association of Southeast Asian Nations (ASEAN) was established in 1967 (Bangkok Declaration) and has its secretariat headquarters in Jakarta, Indonesia.\nHence, Option {{CORR}} is correct.",
    "Identifies Jakarta, Indonesia as the headquarters of ASEAN."
)
add_u7(make_question(CHAPTER_U7, "Trade Blocs", "Where is the central secretariat headquarters of ASEAN (Association of Southeast Asian Nations) located?", opts, c, s))

# Q44: European Union headquarters
opts, c, s = rotate_options(
    "Brussels, Belgium",
    ["Geneva, Switzerland", "Paris, France", "Berlin, Germany"],
    "D",
    "The European Union (EU), which evolved from the European Coal and Steel Community and EEC into a single market and monetary union, is headquartered in Brussels, Belgium.\nHence, Option {{CORR}} is correct.",
    "Identifies Brussels, Belgium as the administrative headquarters of the European Union."
)
add_u7(make_question(CHAPTER_U7, "Trade Blocs", "In which European capital city is the administrative headquarters of the European Union situated?", opts, c, s))

# Q45: North Pacific Sea Route terminals
opts, c, s = rotate_options(
    "Ports of Western North America (Vancouver, Seattle, San Francisco) with Asian ports (Yokohama, Kobe, Shanghai, Manila)",
    ["London and Liverpool with Cape Town and Durban", "New York and Boston with Rio de Janeiro and Buenos Aires", "Sydney and Melbourne with Valparaiso across the South Pacific"],
    "A",
    "The North Pacific Sea Route links the trade ports on the west coast of North America (Vancouver, Seattle, Portland, San Francisco, Los Angeles) with the major ports of East and Southeast Asia (Yokohama, Kobe, Shanghai, Hong Kong, Manila, Singapore).\nHence, Option {{CORR}} is correct.",
    "Details the terminal port clusters of the North Pacific Sea Route."
)
add_u7(make_question(CHAPTER_U7, "Ocean Routes", "Which major port clusters are connected across the North Pacific Sea Route?", opts, c, s))

# Q46: Silk Route historical trade
opts, c, s = rotate_options(
    "6,000 km overland route connecting Rome in Europe with Chang'an (Xi'an) in China, trading silk, wool, and precious metals",
    ["An underwater submarine trench linking Madagascar with Antarctica", "A desert camel track connecting Cairo with Cape Town exclusively", "A maritime corridor between Hawaii and Tahiti"],
    "B",
    "The historic Silk Route was a 6,000 km overland trade network connecting Rome in the west with Chang'an (Xi'an) in China, facilitating the exchange of Chinese silk, iron, jade for Roman gold, wool, and glassware.\nHence, Option {{CORR}} is correct.",
    "Describes the historic 6,000 km Silk Route connecting Rome and China."
)
add_u7(make_question(CHAPTER_U7, "History of Trade", "What was the geographical course and commercial significance of the ancient 'Silk Route'?", opts, c, s))

# Q47: Slave Trade historical context
opts, c, s = rotate_options(
    "Forced shipment of millions of Africans across the Atlantic to work on sugarcane, cotton, and tobacco plantations in the Americas (15th-19th century)",
    ["Export of European kings to rule African tribal villages", "Voluntary tourism of Asian silk weavers to North America", "Migration of South American miners to Australian gold rushes"],
    "C",
    "From the fifteenth to nineteenth centuries, the transatlantic slave trade forcibly transported millions of captured Africans to North and South America to provide slave labor for European colonial plantations.\nHence, Option {{CORR}} is correct.",
    "Explains the historical transatlantic slave trade fueling American colonial plantations."
)
add_u7(make_question(CHAPTER_U7, "History of Trade", "How was the transatlantic 'Slave Trade' organized from the fifteenth to nineteenth centuries?", opts, c, s))

# Q48: Major port as gateway of trade
opts, c, s = rotate_options(
    "The gateways of international trade, providing facilities for docking, loading, unloading, and storage for cargo freighters",
    ["Fortified military fortresses where all foreign merchants are arrested", "Quarantine islands where infected livestock are buried", "Lighthouses operating solely to warn fishing dinghies"],
    "D",
    "Ports are the gateways of international trade. They provide facilities for docking, loading, unloading, warehousing, and customs clearance for international oceanic cargo vessels.\nHence, Option {{CORR}} is correct.",
    "Defines seaports as gateways of international trade providing docking and cargo handling."
)
add_u7(make_question(CHAPTER_U7, "Port Functions", "Why are seaports historically characterized as the 'Gateways of International Trade'?", opts, c, s))

# Q49: Comprehensive Ports
opts, c, s = rotate_options(
    "Handle great volumes of bulk cargo (grain, coal, ore) as well as general manufactured containerized cargo",
    ["Handle only single passenger rowing boats", "Operate exclusively inside mountain caves without sea access", "Handle only gold and diamond coins"],
    "A",
    "Comprehensive ports are large multipurpose ports that handle immense volumes of both bulk cargo (coal, petroleum, grains, ores) and general manufactured containerized goods. Most world premier ports are comprehensive ports.\nHence, Option {{CORR}} is correct.",
    "Defines Comprehensive Ports handling bulk and general containerized cargo."
)
add_u7(make_question(CHAPTER_U7, "Port Classification", "What distinguishing feature defines a 'Comprehensive Port' in maritime logistics?", opts, c, s))

# Q50: Naval Ports definition
opts, c, s = rotate_options(
    "Ports that have only strategic significance, serving warships and maintaining naval repair dockyards (e.g. Portsmouth, Kochi)",
    ["Ports designed exclusively for luxury passenger cruise ships", "Ports where all sea trade is operated by private fishing trawlers", "Ports that export only agricultural pineapples"],
    "B",
    "Naval ports are ports of strategic military importance designed to accommodate naval warships, submarines, provide munitions storage, and operate naval repair dockyards (e.g. Portsmouth in UK, Kochi in India).\nHence, Option {{CORR}} is correct.",
    "Defines Naval Ports (Portsmouth, Kochi) of strategic defense significance."
)
add_u7(make_question(CHAPTER_U7, "Port Classification", "What is the primary function of a 'Naval Port'?", opts, c, s))

# Q51: Match Regional Blocs with Member Groupings
add_u7(make_match_question(
    CHAPTER_U7, "Regional Blocs",
    "Match List I (Trade Bloc) with List II (Founding/Leading Nations):",
    [("A", "OPEC"), ("B", "NAFTA / USMCA"), ("C", "ASEAN"), ("D", "EU")],
    [("I", "USA, Canada, and Mexico"), ("II", "Saudi Arabia, Iran, Iraq, Kuwait, UAE"), ("III", "Germany, France, Italy, Belgium"), ("IV", "Indonesia, Malaysia, Thailand, Singapore")],
    "A-II, B-I, C-IV, D-III", "C",
    "OPEC members include Saudi Arabia, Iran, Iraq, Kuwait (II); NAFTA/USMCA includes USA, Canada, Mexico (I); ASEAN includes Indonesia, Malaysia, Thailand, Singapore (IV); EU includes Germany, France, Italy, Belgium (III).",
    "Matches regional trade blocs to their prominent member nations."
))

# Q52: Statement on Rotterdam Port
add_u7(make_statement_question(
    CHAPTER_U7, "European Ports",
    "Rotterdam is an entrepôt port situated at the mouth of the Rhine river in the Netherlands.",
    "Rotterdam serves as the primary gateway for industrial raw materials and exports for the German Ruhr industrial basin.",
    1, "D",
    "Both statements are correct. Rotterdam is situated at the Rhine-Meuse delta in the Netherlands, acting as a massive entrepôt port and the chief sea gateway for the German industrial heartland.",
    "Affirms Rotterdam's role as a premier European entrepôt and Rhine gateway."
))

# Q53: Assertion-Reason on Inland Waterway Advantages
add_u7(make_assertion_question(
    CHAPTER_U7, "Inland Waterways",
    "Inland water transport is the cheapest mode of transport for heavy, bulky commodities like coal, iron ore, and timber.",
    "Inland waterways require no expensive track construction and water provides low friction compared to road or rail surfaces.",
    1, "A",
    "Both Assertion and Reason are true, and Reason correctly explains the Assertion. Moving heavy bulk freight by river barges consumes far less energy per ton-kilometer than rail or truck due to water buoyancy and lack of roadway wear.",
    "Explains why inland water transport is cheapest for heavy bulk freight."
)

)
# Q54: Multi-statement on Trans-Siberian Economic Impact
add_u7(make_multi_statement_question(
    CHAPTER_U7, "Trans-Siberian Railway",
    "Which of the following statements about the economic impact of the Trans-Siberian Railway are correct?",
    [
        ("A", "It opened up the vast Asian Siberian territory to Russian agricultural settlement and mineral exploitation."),
        ("B", "It connects the wheat-producing steppes of Siberia with the industrial cities of European Russia."),
        ("C", "It connects with branch lines southward into Mongolia and China."),
        ("D", "It is operated entirely with wooden horse-drawn wagons on narrow dirt tracks.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C are correct facts about the Trans-Siberian line. Statement D is absurd because the Trans-Siberian is a high-speed, double-tracked, fully electrified modern railway.",
    "Assesses the historical and economic significance of the Trans-Siberian railway."
))

# Q55: Inter-modal freight transport: Containerisation
opts, c, s = rotate_options(
    "Standardized steel shipping containers that can be transferred smoothly between cargo ships, freight trains, and trucks without unloading contents",
    ["Unpacking every single cardboard carton by hand at every border crossing", "Carrying loose grains in open wooden wheelbarrows", "Pouring crude petroleum into open passenger bus seats"],
    "C",
    "Containerisation revolutionized global freight through standard ISO steel containers that move seamlessly across ships, trains, and semi-trailer trucks, slashing port turnaround times and cargo theft.\nHence, Option {{CORR}} is correct.",
    "Defines Containerisation as inter-modal freight transport using standardized containers."
)
add_u7(make_question(CHAPTER_U7, "Modern Freight Logistics", "How did 'Containerisation' revolutionize international freight transportation?", opts, c, s))

# Q56: Air Transport advantages
opts, c, s = rotate_options(
    "Fastest mode of transport, essential for valuable cargo, perishable goods, emergency medical relief, and overcoming mountainous or desert obstacles",
    ["The cheapest mode of transport for bulky low-grade coal and gravel", "Operates without consuming any aviation fuel or electrical energy", "Requires zero airport runways or radar traffic control towers"],
    "D",
    "Air transport is the fastest mode, invaluable for long-distance passenger travel, high-value light goods, perishable commodities, disaster rescue, and reaching rugged terrains where roads cannot be built.\nHence, Option {{CORR}} is correct.",
    "Highlights the distinct operational advantages of air transport."
)
add_u7(make_question(CHAPTER_U7, "Air Transport", "What are the distinct operational advantages of 'Air Transport' in global logistics?", opts, c, s))

# Q57: Air Transport limitations
opts, c, s = rotate_options(
    "Extremely costly, limited cargo carrying capacity, weather dependent, and requires high capital expenditure on airports and navigation gear",
    ["Slower than walking on foot across muddy terrain", "Completely banned across all oceanic airspace", "Prohibited from transporting any human passengers"],
    "A",
    "Air transport is costly, highly fuel intensive, has limited payload capacity, is easily disrupted by fogs and storms, and requires expensive airport terminals and traffic control equipment.\nHence, Option {{CORR}} is correct.",
    "Identifies high costs, limited capacity, and weather vulnerability as air transport limitations."
)
add_u7(make_question(CHAPTER_U7, "Air Transport", "What are the primary economic and operational limitations of air transport?", opts, c, s))

# Q58: Dense Air Network continent
opts, c, s = rotate_options(
    "North America and Western Europe",
    ["Antarctica", "Central Africa", "Siberian Arctic"],
    "B",
    "The world's densest air transport networks are concentrated in North America (especially USA) and Western Europe, where over 60% of world air traffic originates and terminates.\nHence, Option {{CORR}} is correct.",
    "Identifies North America and Western Europe as having the densest global air networks."
)
add_u7(make_question(CHAPTER_U7, "Air Transport Geography", "Which two continental regions account for the densest commercial air transport networks in the world?", opts, c, s))

# Q59: Satellite Communication era
opts, c, s = rotate_options(
    "Since the 1970s, pioneering continuous global real-time telecommunications, television broadcast, and meteorological monitoring",
    ["Since the ancient Roman Empire in 100 BCE", "Since the French Revolution in 1789", "Since the First World War in 1914"],
    "C",
    "Satellite communications revolutionized global telecommunications from the 1970s onward, enabling live intercontinental broadcasting, direct-to-home television, cellular networks, and weather monitoring.\nHence, Option {{CORR}} is correct.",
    "Dates the emergence of satellite communication revolution to the 1970s."
)
add_u7(make_question(CHAPTER_U7, "Telecommunications", "In which decade did 'Satellite Communications' begin to fundamentally transform intercontinental telecommunications?", opts, c, s))

# Q60: Cyber Space: Internet users growth
opts, c, s = rotate_options(
    "Grown exponentially from a few million in the 1990s to over 5 billion users globally across all continents",
    ["Declined from 1 billion users in 1800 to zero users today", "Remains restricted solely to military generals in Switzerland", "Has been replaced entirely by carrier pigeon postal routes"],
    "D",
    "Internet and cyberspace usage has expanded from a few million users in the early 1990s to more than 5 billion people worldwide today, shrinking physical distance and democratizing global information.\nHence, Option {{CORR}} is correct.",
    "Highlights the exponential global growth of the internet and cyberspace."
)
add_u7(make_question(CHAPTER_U7, "Cyberspace", "What characterizes the global expansion of internet users and cyberspace connectivity since the 1990s?", opts, c, s))

# Q61: Pipeline: Natural gas transportation
opts, c, s = rotate_options(
    "Liquefied Natural Gas (LNG) and compressed natural gas piped directly from gas wells to power plants and city domestic gas grids",
    ["Transporting live cattle and sheep through high-pressure water tubes", "Moving steel railway locomotives underground", "Shipping harvested timber logs across deserts"],
    "A",
    "Natural gas is transported safely and cleanly via specialized high-pressure steel pipelines directly from extraction wells to power plants, fertilizer factories, and urban city domestic gas distribution networks.\nHence, Option {{CORR}} is correct.",
    "Describes natural gas transport through high-pressure gas pipeline grids."
)
add_u7(make_question(CHAPTER_U7, "Gas Pipelines", "What is the primary commercial utility of dedicated natural gas pipelines in modern energy systems?", opts, c, s))

# Q62: GATT creation year
opts, c, s = rotate_options(
    "1948",
    ["1919", "1960", "1985"],
    "B",
    "The General Agreement on Tariffs and Trade (GATT) was signed in 1947 and took effect on 1 January 1948 to prevent destructive protectionist tariff wars that had worsened the Great Depression.\nHence, Option {{CORR}} is correct.",
    "Identifies 1948 as the year GATT went into effect."
)
add_u7(make_question(CHAPTER_U7, "International Trade Bodies", "In which year did the General Agreement on Tariffs and Trade (GATT) officially come into effect?", opts, c, s))

# Q63: South Atlantic Sea Route
opts, c, s = rotate_options(
    "Connects Western Europe and West Africa with South American countries like Brazil, Argentina, and Uruguay",
    ["Runs between Alaska and Hawaii across the Pacific", "Connects India with Australia across the Indian Ocean", "Connects China with Japan across the Yellow Sea"],
    "C",
    "The South Atlantic Sea Route connects West European and West African countries with Brazil, Argentina, and Uruguay in South America. Traffic is less dense than the North Atlantic due to lower industrial concentration.\nHence, Option {{CORR}} is correct.",
    "Describes the South Atlantic Sea Route connecting Europe/West Africa with South America."
)
add_u7(make_question(CHAPTER_U7, "Ocean Routes", "Which regions are connected by the 'South Atlantic Sea Route'?", opts, c, s))

# Q64: Panama Canal locks: Gatun Lake
opts, c, s = rotate_options(
    "An artificial lake created 26 meters above sea level to facilitate ship transit across the continental divide",
    ["A saltwater bay carved directly into the Pacific shoreline", "An underground subterranean cavern without sunlight", "A freshwater spring used only for bottled drinking water in Panama City"],
    "D",
    "Gatun Lake is an artificial freshwater lake created during the construction of the Panama Canal, situated 26 meters above sea level. Ships are raised by locks into Gatun Lake, sail across it, and are lowered to the other ocean.\nHence, Option {{CORR}} is correct.",
    "Explains the role of Gatun Lake in the Panama Canal lock transit."
)
add_u7(make_question(CHAPTER_U7, "Shipping Canals", "What role does 'Gatun Lake' play in the operation of the Panama Canal?", opts, c, s))

# Q65: Stuart Highway in Australia
opts, c, s = rotate_options(
    "Connects Darwin in the north with Alice Springs and Port Augusta / Adelaide in the south across central Australia",
    ["Runs along the Great Barrier Reef coastline from Cairns to Sydney", "Connects Perth with Melbourne along the southern beach", "Circles the island of Tasmania"],
    "A",
    "The Stuart Highway runs straight through the arid red heart of Australia from Darwin in the Northern Territory southward through Alice Springs to Port Augusta and Adelaide.\nHence, Option {{CORR}} is correct.",
    "Identifies the Stuart Highway connecting Darwin in the north to Adelaide/Port Augusta in the south."
)
add_u7(make_question(CHAPTER_U7, "Highways", "What is the course of the famous 'Stuart Highway' in Australia?", opts, c, s))

# Q66: Trans-Canadian Highway
opts, c, s = rotate_options(
    "St. John's (Newfoundland) in the east to Victoria (British Columbia) in the west",
    ["Toronto in the east to Montreal in the west", "Halifax in the north to Ottawa in the south", "Calgary to Edmonton across Alberta"],
    "B",
    "The Trans-Canadian Highway links St. John's in Newfoundland on the Atlantic coast with Victoria on Vancouver Island in British Columbia on the Pacific coast, spanning roughly 7,800 km.\nHence, Option {{CORR}} is correct.",
    "Specifies the eastern and western terminals of the Trans-Canadian Highway."
)
add_u7(make_question(CHAPTER_U7, "Highways", "What are the terminal cities of the Trans-Canadian Highway?", opts, c, s))

# Q67: Suez Canal ownership nationalization
opts, c, s = rotate_options(
    "Nationalized by Egyptian President Gamal Abdel Nasser in 1956",
    ["Purchased by the United States Government in 1914", "Donated by France to the United Nations in 1945", "Conquered by the British East India Company in 1857"],
    "C",
    "In 1956, Egyptian President Gamal Abdel Nasser nationalized the Suez Canal, transferring control from the British-French Suez Canal Company to the Egyptian state.\nHence, Option {{CORR}} is correct.",
    "Attributes the 1956 nationalization of the Suez Canal to Gamal Abdel Nasser."
)
add_u7(make_question(CHAPTER_U7, "Suez Canal History", "In which year and by which Egyptian leader was the Suez Canal formally nationalized?", opts, c, s))

# Q68: Rhine waterway: Basel location
opts, c, s = rotate_options(
    "Switzerland",
    ["Austria", "Belgium", "Luxembourg"],
    "D",
    "Basel is situated in Switzerland at the junction of Swiss, German, and French borders. It is the upstream navigable terminus of the Rhine river for cargo barges.\nHence, Option {{CORR}} is correct.",
    "Locates the inland port of Basel on the Rhine in Switzerland."
)
add_u7(make_question(CHAPTER_U7, "Inland Waterways", "The inland river port of 'Basel', the southern navigable terminus of the Rhine Waterway, is located in which country?", opts, c, s))

# Q69: Industrial Ports vs Commercial Ports
opts, c, s = rotate_options(
    "Industrial ports specialize in bulk raw materials (grain, oil, ores), while Commercial ports handle general manufactured cargo and packaged merchandise",
    ["Industrial ports serve only wooden canoes, while commercial ports serve only warships", "Industrial ports are built inside sports stadiums", "Both are identical and handle zero maritime freight"],
    "A",
    "Industrial ports specialize in bulk cargo like iron ore, coal, grains, and petroleum. Commercial ports handle general cargo, packaged goods, containerized manufactures, and passenger transport.\nHence, Option {{CORR}} is correct.",
    "Contrasts bulk-handling Industrial Ports with general-cargo Commercial Ports."
)
add_u7(make_question(CHAPTER_U7, "Port Types", "How do 'Industrial Ports' differ from 'Commercial Ports' in their operational cargo profile?", opts, c, s))

# Q70: Trade Deficit
opts, c, s = rotate_options(
    "When a nation spends more on imported goods and services than it earns from exported products",
    ["When a nation earns ten times more from exports than it spends on imports", "When national foreign currency reserves reach infinite levels", "When a nation eliminates all customs checkpoints"],
    "B",
    "A trade deficit occurs when a country's total value of imports exceeds its total value of exports over a given period, leading to a negative trade balance and outflow of foreign exchange.\nHence, Option {{CORR}} is correct.",
    "Defines Trade Deficit as imports exceeding exports in monetary value."
)
add_u7(make_question(CHAPTER_U7, "Trade Balance", "What constitutes a 'Trade Deficit' in national balance of payments?", opts, c, s))

# Q71: Free Trade / Trade Liberalisation
opts, c, s = rotate_options(
    "The policy of opening up economies for trade by removing or reducing tariffs, quotas, and non-tariff barriers",
    ["Giving away all manufactured factory goods to foreign countries for free", "Prohibiting any merchant from charging money for services", "Confiscating all private shipping vessels by the military"],
    "C",
    "Free trade or trade liberalisation is the act of opening up economies for trading by reducing or removing customs duties, tariffs, quotas, and non-tariff barriers on goods and services traded between nations.\nHence, Option {{CORR}} is correct.",
    "Defines Free Trade as lowering or removing tariffs, quotas, and trade barriers."
)
add_u7(make_question(CHAPTER_U7, "Trade Policy", "What is meant by 'Free Trade' or 'Trade Liberalisation' in international economics?", opts, c, s))

# Q72: Criticism of WTO
opts, c, s = rotate_options(
    "Critics argue it favors powerful developed nations, forces open developing markets without reciprocal access, and neglects worker rights and environmental standards",
    ["Critics claim it gives all world wealth to small island nations exclusively", "Critics argue it has abolished all maritime shipping across the oceans", "Critics claim it forces all countries to adopt a single world language"],
    "D",
    "Critics argue that WTO agreements have been influenced heavily by major developed Western nations, creating unfair competition for developing nations, compromising agricultural livelihoods, and neglecting local environmental standards.\nHence, Option {{CORR}} is correct.",
    "Explains major criticisms leveled against the WTO by developing nations."
)
add_u7(make_question(CHAPTER_U7, "WTO Debates", "What is the primary criticism leveled by developing countries and civil society against the World Trade Organization?", opts, c, s))

# Q73: Pipeline for slurry transport
opts, c, s = rotate_options(
    "Transporting solid minerals (like iron ore or coal) by crushing them into powder and mixing with water to form a slurry",
    ["Transporting molten lava directly from active volcanic craters", "Pumping dry whole apples across continents without water", "Transmitting electrical lightning bolts through water tubes"],
    "A",
    "Pipelines can transport solids by converting them into 'slurry'—solid ores (like iron ore or coal) are pulverized, mixed with water, and pumped through pipelines to coastal pellet plants (e.g. Kudremukh iron ore slurry pipeline in India).\nHence, Option {{CORR}} is correct.",
    "Explains slurry pipelines transporting pulverized solids mixed with water."
)
add_u7(make_question(CHAPTER_U7, "Pipelines", "How can solid minerals like iron ore or coal be transported through pipelines?", opts, c, s))

# Q74: Air freight high-value commodities
opts, c, s = rotate_options(
    "Diamonds, gold bullion, precious pharmaceuticals, high-precision electronics, and fresh perishable cut flowers",
    ["Bulk coking coal, iron ore gravel, and limestone flux", "Heavy granite building stone and raw timber logs", "Crude unrefined petroleum and asphalt bitumen"],
    "B",
    "Because air freight charges are high, air cargo specializes in high-value, low-bulk, or urgently needed perishable goods: gold, gems, emergency vaccines, microelectronics, and luxury fresh flowers.\nHence, Option {{CORR}} is correct.",
    "Lists commodities suitable for air transport: precious metals, pharmaceuticals, cut flowers."
)
add_u7(make_question(CHAPTER_U7, "Air Cargo", "Which group of commodities is best suited for transport via international commercial air freight?", opts, c, s))

# Q75: Suez Canal: Bitter Lakes
opts, c, s = rotate_options(
    "Lake Timsah, Great Bitter Lake, and Little Bitter Lake",
    ["Lake Superior, Lake Huron, and Lake Michigan", "Lake Baikal, Lake Balkhash, and Lake Ladoga", "Lake Victoria, Lake Tanganyika, and Lake Malawi"],
    "C",
    "The Suez Canal route utilizes natural salt lakes along its alignment across the Isthmus of Suez: Lake Ballah, Lake Timsah, Great Bitter Lake, and Little Bitter Lake, which act as passing and anchorage basins.\nHence, Option {{CORR}} is correct.",
    "Identifies the Bitter Lakes and Lake Timsah along the Suez Canal."
)
add_u7(make_question(CHAPTER_U7, "Suez Canal Geography", "Which natural lakes were incorporated into the alignment of the Suez Canal to facilitate ship passage?", opts, c, s))

# Q76: Panama Canal handover to Panama
opts, c, s = rotate_options(
    "31 December 1999 (Torrijos-Carter Treaties)",
    ["15 August 1947", "1 January 1914", "4 July 1976"],
    "D",
    "The United States formally handed over full sovereignty and operational control of the Panama Canal to the Republic of Panama on 31 December 1999, fulfilling the Torrijos-Carter Treaties of 1977.\nHence, Option {{CORR}} is correct.",
    "Dates the handover of the Panama Canal to Panama to 31 December 1999."
)
add_u7(make_question(CHAPTER_U7, "Panama Canal Geopolitics", "On which date did the United States formally transfer full control of the Panama Canal to the Republic of Panama?", opts, c, s))

# Q77: Rhine waterway: Duisburg port
opts, c, s = rotate_options(
    "The world's largest inland river port, located at the confluence of the Rhine and Ruhr rivers in Germany",
    ["A deep-sea fishing port on the Mediterranean coast of Spain", "A river port in Russia on the Amur river bordering China", "An oceanic port in South Africa near Cape of Good Hope"],
    "A",
    "Duisburg in Germany, situated at the confluence of the Rhine and Ruhr rivers, is recognized as the world's largest inland river port, handling millions of tons of coal, steel, and chemical freight.\nHence, Option {{CORR}} is correct.",
    "Identifies Duisburg as the world's largest inland river port at the Rhine-Ruhr confluence."
)
add_u7(make_question(CHAPTER_U7, "Inland Ports", "What is the global significance of the inland river port of 'Duisburg' in Germany?", opts, c, s))

# Q78: Sequence of Major Global Canals and Railways
add_u7(make_sequence_question(
    CHAPTER_U7, "Infrastructure Chronology",
    "Arrange the opening of the following landmark transport infrastructures in chronological order:",
    [("A", "Opening of the Panama Canal"), ("B", "Opening of the Suez Canal"), ("C", "Completion of the Trans-Siberian Railway"), ("D", "First passenger railway service in Britain (Stockton to Darlington)")],
    "D, B, C, A", "B",
    "1. Stockton to Darlington railway opened in 1825 (D).\n2. Suez Canal opened in 1869 (B).\n3. Trans-Siberian Railway completed across Russia in 1904/1916 (C).\n4. Panama Canal opened in 1914 (A).",
    "Sequences historical landmark transport infrastructures chronologically."
))

# Q79: Air Transport: London Heathrow and Chicago O'Hare
opts, c, s = rotate_options(
    "Major global hub airports with multi-directional intercontinental flight connections",
    ["Regional river barge terminals for loading timber", "Underground railway freight stations for coal", "Deep-water tanker ports for crude petroleum"],
    "C",
    "London Heathrow, Chicago O'Hare, Atlanta Hartsfield-Jackson, and Dubai International are pre-eminent global hub airports serving millions of connecting passengers on trans-continental routes.\nHence, Option {{CORR}} is correct.",
    "Identifies major global hub airports with dense intercontinental flight connections."
)
add_u7(make_question(CHAPTER_U7, "Aviation Hubs", "What role do airports like London Heathrow and Chicago O'Hare play in the global transport system?", opts, c, s))

# Q80: High-speed rail: Shinkansen and TGV
opts, c, s = rotate_options(
    "Bullet trains in Japan (Shinkansen) and France (TGV) competing effectively with air transport for distances up to 800-1000 km",
    ["Steam locomotives operating on narrow gauge mountain tracks in Africa", "Diesel cargo freight trains transporting coal in Australia", "Subway trains running exclusively inside single city limits"],
    "D",
    "High-speed rail networks, famously pioneered by Japan's Shinkansen (1964) and France's TGV, operate at speeds exceeding 300 km/h, successfully capturing passenger traffic from airlines over medium distances.\nHence, Option {{CORR}} is correct.",
    "Highlights high-speed rail (Shinkansen, TGV) competing with airlines over 500-1000 km."
)
add_u7(make_question(CHAPTER_U7, "Modern Rail Networks", "What is the strategic significance of high-speed rail systems like Japan's 'Shinkansen' and France's 'TGV'?", opts, c, s))

validate_and_collect(u7_qs, u7_seen)
assert len(u7_qs) == 80
with open("mock/geo_units/unit7.json", "w", encoding="utf-8") as f:
    json.dump(u7_qs, f, indent=2, ensure_ascii=False)
print("Unit 7 generated: 80 questions")

# =================================================================================================
# UNIT 8: Human Settlements (World & General Principles) (60 Questions)
# =================================================================================================
CHAPTER_U8 = "Human Settlements"
u8_qs = []
u8_seen = set()

def add_u8(q):
    u8_qs.append(q)

# Q1: Settlement definition
opts, c, s = rotate_options(
    "A cluster of dwellings of any type or size where human beings live, ranging from a small hamlet to a metropolitan megacity",
    ["A temporary campsite erected by wild animals in a national park", "An uninhabited mountain ridge with zero human buildings", "An automated satellite constellation orbiting the Earth"],
    "A",
    "A human settlement is defined as a place inhabited more or less permanently. The houses may be designed or redesigned, buildings may be altered, but the settlement endures through space and time.\nHence, Option {{CORR}} is correct.",
    "Defines human settlement as a permanent inhabited cluster of dwellings."
)
add_u8(make_question(CHAPTER_U8, "Settlement Concepts", "What is the foundational definition of a 'Human Settlement' in geography?", opts, c, s))

# Q2: Rural vs Urban settlements basic difference
opts, c, s = rotate_options(
    "Rural settlements derive their livelihood primarily from primary activities (agriculture, fishing, forestry), while Urban settlements depend on secondary and tertiary services",
    ["Rural settlements are located only in clouds, while urban settlements are on the ocean floor", "Rural settlements have zero human population, while urban settlements have 100% literacy", "Both are identical in economy, size, and functional structure"],
    "B",
    "The basic difference between rural and urban settlements is their economic function: rural dwellers derive their living mainly from primary agricultural and environmental activities, while urban populations depend on manufacturing, trade, and services.\nHence, Option {{CORR}} is correct.",
    "Distinguishes rural (primary activities) from urban (secondary/tertiary activities)."
)
add_u8(make_question(CHAPTER_U8, "Rural vs Urban", "What is the fundamental functional difference between rural and urban settlements?", opts, c, s))

# Q3: Four Rural Settlement Types
opts, c, s = rotate_options(
    "Clustered (agglomerated/nucleated), Semi-clustered (fragmented), Hamleted, and Dispersed (isolated)",
    ["Igloos, Tepees, Yurts, and Caravans", "Skyscrapers, Penthouse, Duplex, and Studio", "Metropolis, Megalopolis, Conurbation, and Suburb"],
    "C",
    "Rural settlements are broadly classified into four major patterns based on spacing of houses: (1) Clustered, agglomerated or nucleated, (2) Semi-clustered or fragmented, (3) Hamleted, and (4) Dispersed or isolated.\nHence, Option {{CORR}} is correct.",
    "Lists the four structural categories of rural settlements."
)
add_u8(make_question(CHAPTER_U8, "Rural Settlement Types", "Into which four structural categories are rural settlements classified based on physical arrangement and spacing?", opts, c, s))

# Q4: Clustered Settlement features
opts, c, s = rotate_options(
    "Compact or closely built-up area of houses with living areas distinct and separated from surrounding farmland and pastures",
    ["Isolated individual farmhouses separated by 10 kilometers of dense jungle", "Houses built in a single line on the surface of a moving glacier", "Underground caves inhabited by single hermit monks"],
    "D",
    "A clustered rural settlement is a compact or closely built-up area of houses. In this type of village, the general living area is distinct and separated from surrounding farms, barns, and pastures.\nHence, Option {{CORR}} is correct.",
    "Describes Clustered/Nucleated settlements as compact built-up areas distinct from farms."
)
add_u8(make_question(CHAPTER_U8, "Rural Settlement Types", "Which of the following describes a 'Clustered' (or Nucleated) rural settlement?", opts, c, s))

# Q5: Semi-clustered Settlement
opts, c, s = rotate_options(
    "Results from clustering in a restricted area of dispersed settlement or segregation/fragmentation of a large compact village (e.g. landowning dominant caste in center, lower castes on outer fringes)",
    ["A high-density cluster of 50-story residential towers in a metropolis", "A collection of houseboats anchored in a calm marine harbor", "A single farmhouse located in the interior of the Sahara Desert"],
    "A",
    "Semi-clustered settlements result from the tendency of clustering in a restricted area of dispersed settlement, or when a large village becomes fragmented. Social segregation often forces weaker sections to settle on the outer periphery.\nHence, Option {{CORR}} is correct.",
    "Explains Semi-clustered settlements arising from fragmentation and social segregation."
)
add_u8(make_question(CHAPTER_U8, "Rural Settlement Types", "What causes the formation of 'Semi-Clustered' (or Fragmented) rural settlements?", opts, c, s))

# Q6: Hamleted Settlements
opts, c, s = rotate_options(
    "Fragmented into several physical units physically separated from each other but bearing a common name (known locally as panna, para, palli, nagla, dhani)",
    ["Built exclusively on floating rafts in the middle of deep ocean straits", "Single continuous apartment complexes containing 10,000 households", "Underground mining barracks connected by electric elevators"],
    "B",
    "Hamleted settlements are fragmented into several small physical units bearing a common name, motivated by social and ethnic factors. They are locally termed panna, para, palli, nagla, dhani, etc., across the Indian subcontinent.\nHence, Option {{CORR}} is correct.",
    "Defines Hamleted settlements (panna, para, palli, nagla, dhani) sharing a common identity."
)
add_u8(make_question(CHAPTER_U8, "Rural Settlement Types", "What are 'Hamleted Settlements', locally known as panna, para, palli, nagla, or dhani in India?", opts, c, s))

# Q7: Dispersed Settlement features
opts, c, s = rotate_options(
    "Isolated huts or small hamlets of few huts scattered over remote hills, plateau pastures, or agricultural farms",
    ["Extremely crowded urban slums with 500 people per room", "Fortified castle towns enclosed by deep protective moats", "Compact villages built along straight grid-iron streets"],
    "C",
    "Dispersed or isolated settlement pattern appears in the form of isolated huts or hamlets of few huts in remote jungles, steep hills, or pastures. Extremely fragmented terrain and remote landholdings cause this pattern.\nHence, Option {{CORR}} is correct.",
    "Describes Dispersed settlements as isolated huts scattered across rugged terrain."
)
add_u8(make_question(CHAPTER_U8, "Rural Settlement Types", "Where are 'Dispersed' (or Isolated) rural settlements characteristically found?", opts, c, s))

# Q8: Linear Settlement Pattern
opts, c, s = rotate_options(
    "Houses located along a road, railway line, river, canal, or coastal levee in a straight line",
    ["Houses arranged in a circle around a sacred village pond", "Houses clustered on a hill peak around a military watchtower", "Houses scattered at random with no connecting paths"],
    "D",
    "In linear settlements, houses are arranged in a straight or gentle alignment along a transport route like a road, railway line, river, canal embankment, or coastal beach ridge.\nHence, Option {{CORR}} is correct.",
    "Identifies Linear settlements aligned along roads, railways, rivers, or canals."
)
add_u8(make_question(CHAPTER_U8, "Rural Patterns", "Which physical alignment characterizes a 'Linear Settlement Pattern'?", opts, c, s))

# Q9: Circular Settlement Pattern
opts, c, s = rotate_options(
    "Houses built around a lake, tank, or village central common pasture, keeping the water body accessible to all",
    ["Houses built along a single straight transcontinental railway track", "Houses built on the two opposite banks of a wide rushing canyon", "Houses arranged in a cross-shape at four-way road crossroads"],
    "A",
    "Circular settlements develop around lakes, tanks, or village ponds so that the central water body or common pasture is accessible to all households.\nHence, Option {{CORR}} is correct.",
    "Explains Circular settlement patterns developing around lakes, tanks, or village ponds."
)
add_u8(make_question(CHAPTER_U8, "Rural Patterns", "Around what geographical features do 'Circular Settlement Patterns' typically develop?", opts, c, s))

# Q10: Rectangular Settlement Pattern
opts, c, s = rotate_options(
    "Found in flat plains or wide intermontane valleys where streets are straight and intersect each other at right angles",
    ["Found on steep conical volcanic peaks where streets spiral upward", "Found on isolated coral atolls where houses float on timber rafts", "Found inside dense mangrove swamps with no solid ground"],
    "B",
    "Rectangular settlement patterns are found in plain areas or wide valleys where roads run straight, meet at right angles, and houses are constructed in neat rectangular blocks.\nHence, Option {{CORR}} is correct.",
    "Identifies Rectangular patterns in flat plains with lanes meeting at right angles."
)
add_u8(make_question(CHAPTER_U8, "Rural Patterns", "Under what geographical terrain conditions does a 'Rectangular Settlement Pattern' develop?", opts, c, s))

# Q11: Star-like Settlement Pattern
opts, c, s = rotate_options(
    "Develops where several roads converge on a central point and houses spread out along the radiating roads in all directions",
    ["Houses built in a solitary straight line on a steep sea cliff", "Houses built in concentric circles around a nuclear reactor", "Houses built under water inside an artificial lagoon"],
    "C",
    "Star-like settlements develop where several metalled or unmetalled roads converge on a single central hub, and houses spread outward along the radiating roads, resembling a star.\nHence, Option {{CORR}} is correct.",
    "Describes Star-like patterns radiating along multiple converging roads."
)
add_u8(make_question(CHAPTER_U8, "Rural Patterns", "What geographical layout generates a 'Star-Like' rural settlement pattern?", opts, c, s))

# Q12: Wet-Point vs Dry-Point Settlements
opts, c, s = rotate_options(
    "Wet-point settlements locate near water sources (springs, rivers) in dry regions; Dry-point settlements locate on upland knolls to avoid floods in wet regions",
    ["Wet-point settlements are located inside swimming pools, while dry-point are in bakeries", "Wet-point settlements are exclusively marine harbors, while dry-point are coal mines", "Both terms are identical and mean underground sewer networks"],
    "D",
    "Wet-point settlements are located near water sources (wells, springs, oases) in arid areas where water is scarce. Dry-point settlements are sited on upland mounds, river terraces, or knolls in floodplains to escape flooding.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Wet-point (water seeking in arid land) from Dry-point (flood escaping in wetlands)."
)
add_u8(make_question(CHAPTER_U8, "Site Factors", "What is the distinction between 'Wet-Point' and 'Dry-Point' settlements?", opts, c, s))

# Q13: First million city in the world
opts, c, s = rotate_options(
    "London, in 1810",
    ["Paris, in 1700", "New York, in 1850", "Rome, in 100 BCE"],
    "A",
    "The city of London attained a population of one million by about 1810, becoming the first city in modern history to reach this milestone, followed by Paris in 1850 and New York in 1860.\nHence, Option {{CORR}} is correct.",
    "Identifies London (1810) as the world's first modern city to reach 1 million population."
)
add_u8(make_question(CHAPTER_U8, "Urban History", "Which city became the first in the world to reach a population of one million, and in which year?", opts, c, s))

# Q14: Patrick Geddes: Conurbation
opts, c, s = rotate_options(
    "Patrick Geddes, in 1915",
    ["Jean Gottmann, in 1957", "Lewis Mumford, in 1938", "Ernest Burgess, in 1925"],
    "B",
    "The term 'Conurbation' was coined by Scottish polymath and urbanist Patrick Geddes in 1915 to denote a continuous urban coalescence of separate towns or cities (e.g. Greater London, Manchester, Chicago, Tokyo).\nHence, Option {{CORR}} is correct.",
    "Attributes the coining of 'Conurbation' in 1915 to Patrick Geddes."
)
add_u8(make_question(CHAPTER_U8, "Urban Terminology", "Who coined the term 'Conurbation' in 1915 to describe an unbroken continuous urbanized zone formed by merging towns?", opts, c, s))

# Q15: Jean Gottmann: Megalopolis
opts, c, s = rotate_options(
    "Jean Gottmann, in 1957",
    ["Patrick Geddes, in 1915", "Carl Sauer, in 1925", "Homer Hoyt, in 1939"],
    "C",
    "The Greek term 'Megalopolis' (meaning 'great city') was popularized by geographer Jean Gottmann in 1957 to describe the super-metropolitan conurbation stretching from Boston to Washington (Boswash) in the USA.\nHence, Option {{CORR}} is correct.",
    "Attributes the term 'Megalopolis' in 1957 to Jean Gottmann."
)
add_u8(make_question(CHAPTER_U8, "Urban Terminology", "Who popularized the concept of 'Megalopolis' in 1957 to characterize massive super-metropolitan urban regions like Boswash?", opts, c, s))

# Q16: Boswash Megalopolis
opts, c, s = rotate_options(
    "The continuous urbanized megalopolis on the US Atlantic coast extending from Boston in the north to Washington D.C. in the south",
    ["An industrial region in Germany extending from Bonn to Stuttgart", "A highway corridor connecting Buenos Aires with Santiago", "A continuous suburban strip linking Beijing with Shanghai"],
    "D",
    "The classic example of a Megalopolis is 'Boswash', extending over 800 km along the North-Eastern US seaboard from Boston through New York, Philadelphia, and Baltimore down to Washington D.C.\nHence, Option {{CORR}} is correct.",
    "Defines the Boswash megalopolis extending from Boston to Washington D.C."
)
add_u8(make_question(CHAPTER_U8, "Urban Terminology", "What is 'Boswash', the classic global prototype of a Megalopolis?", opts, c, s))

# Q17: Million City definition
opts, c, s = rotate_options(
    "A city with a total population exceeding one million inhabitants",
    ["A city where exactly one million trees are planted annually", "A city with annual municipal tax revenues of one million dollars", "A city that has survived for one million years"],
    "A",
    "A 'Million City' is an urban settlement whose population exceeds one million (1,000,000) residents.\nHence, Option {{CORR}} is correct.",
    "Defines a Million City as one exceeding 1 million population."
)
add_u8(make_question(CHAPTER_U8, "Urban Hierarchy", "What is the demographic criterion for an urban center to be classified as a 'Million City'?", opts, c, s))

# Q18: Megacity definition
opts, c, s = rotate_options(
    "A city or metropolitan agglomeration with a population of 10 million or more",
    ["A city with 100,000 residents", "A city that covers more than 500 square kilometers regardless of population", "A city that hosts the Olympic Games"],
    "B",
    "A 'Megacity' (or mega-city) is a metropolitan agglomeration that has a total population of 10 million or more (e.g. Tokyo, Delhi, Shanghai, Mumbai, Sao Paulo).\nHence, Option {{CORR}} is correct.",
    "Defines a Megacity as an urban agglomeration with 10 million or more people."
)
add_u8(make_question(CHAPTER_U8, "Urban Hierarchy", "What population threshold qualifies an urban agglomeration to be designated as a 'Megacity'?", opts, c, s))

# Q19: Most populous megacity in the world
opts, c, s = rotate_options(
    "Tokyo (Japan)",
    ["New York (USA)", "London (UK)", "Sydney (Australia)"],
    "C",
    "The Tokyo metropolitan agglomeration in Japan is currently the world's most populous megacity, with an urban population exceeding 37 million people.\nHence, Option {{CORR}} is correct.",
    "Identifies Tokyo as the world's most populous megacity."
)
add_u8(make_question(CHAPTER_U8, "Global Megacities", "Which metropolitan agglomeration currently ranks as the world's most populous megacity?", opts, c, s))

# Q20: Administrative Towns examples
opts, c, s = rotate_options(
    "National capitals housing central government headquarters (e.g. New Delhi, Canberra, Washington D.C., Ottawa, London)",
    ["Mining pits extracting copper ore in the desert", "Industrial steel foundry towns like Jamshedpur and Pittsburgh", "Religious temple towns like Varanasi and Mecca"],
    "D",
    "Administrative towns are cities whose primary function is administering the nation or state, housing parliaments, ministries, and embassies: New Delhi, Canberra, Washington D.C., Ottawa, Brasilia, London.\nHence, Option {{CORR}} is correct.",
    "Lists major administrative capital cities: New Delhi, Canberra, Washington, Ottawa."
)
add_u8(make_question(CHAPTER_U8, "Functional Classification", "Which group of cities represents premier examples of 'Administrative Towns'?", opts, c, s))

# Q21: Industrial Towns examples
opts, c, s = rotate_options(
    "Pittsburgh, Jamshedpur, Detroit, and Birmingham",
    ["Vatican City, Jerusalem, and Varanasi", "Canberra, Ottawa, and New Delhi", "St. Moritz, Cannes, and Miami Beach"],
    "A",
    "Industrial towns are urban centres dominated by manufacturing, metal smelting, chemical synthesis, or automobile assembly: Pittsburgh (steel), Detroit (automobiles), Jamshedpur (steel), Birmingham (engineering).\nHence, Option {{CORR}} is correct.",
    "Lists prominent industrial manufacturing towns: Pittsburgh, Jamshedpur, Detroit, Birmingham."
)
add_u8(make_question(CHAPTER_U8, "Functional Classification", "Which of the following cities are classic examples of 'Industrial Towns'?", opts, c, s))

# Q22: Transport and Port Towns examples
opts, c, s = rotate_options(
    "Rotterdam, Singapore, Aden, and Mumbai",
    ["Cambridge, Oxford, and Heidelberg", "Vatican City, Mecca, and Puri", "Canberra, Brasilia, and Islamabad"],
    "B",
    "Transport towns are centres primarily engaged in transporting goods and passengers: port cities (Rotterdam, Singapore, Mumbai, New York) or major railway hubs (Mughalsarai, Chicago).\nHence, Option {{CORR}} is correct.",
    "Lists transport and seaport cities: Rotterdam, Singapore, Aden, Mumbai."
)
add_u8(make_question(CHAPTER_U8, "Functional Classification", "Which group of cities is functionally classified as 'Transport and Port Towns'?", opts, c, s))

# Q23: Commercial Towns examples
opts, c, s = rotate_options(
    "Trading centres specializing in banking, wholesale trade, and commerce (e.g. Frankfurt, Amsterdam, New York)",
    ["Mining towns like Kalgoorlie and Broken Hill", "Garrison cantonments like Mhow and Babina", "Tourist resorts like Aspen and Nice"],
    "C",
    "Commercial towns are centres of business, banking, wholesale marketing, and financial exchanges (e.g. Frankfurt, Amsterdam, New York, Hong Kong).\nHence, Option {{CORR}} is correct.",
    "Identifies commercial, financial, and trading centers."
)
add_u8(make_question(CHAPTER_U8, "Functional Classification", "Which cities are classified as 'Commercial Towns' centered on international commerce, wholesale markets, and banking?", opts, c, s))

# Q24: Mining Towns examples
opts, c, s = rotate_options(
    "Kalgoorlie, Coolgardie, Broken Hill, and Jharia",
    ["Geneva, Brussels, and Strasbourg", "Cannes, Nice, and Honolulu", "Oxford, Cambridge, and Harvard"],
    "D",
    "Mining towns develop in mineral-rich areas: Kalgoorlie and Coolgardie in Western Australia (gold), Broken Hill (zinc/lead), Jharia in India (coal), and Sudbury in Canada (nickel).\nHence, Option {{CORR}} is correct.",
    "Lists famous mining towns: Kalgoorlie, Coolgardie, Broken Hill, Jharia."
)
add_u8(make_question(CHAPTER_U8, "Functional Classification", "Which of the following clusters consists of urban settlements categorized as 'Mining Towns'?", opts, c, s))

# Q25: Garrison / Cantonment Towns examples
opts, c, s = rotate_options(
    "Towns established primarily for military troops, training, and defense barracks (e.g. Mhow, Babina, Jalandhar Cantt, Portsmouth)",
    ["Towns that manufacture chocolate and confectionery", "Towns that operate ocean cruise terminals exclusively", "Towns dedicated solely to commercial grape viticulture"],
    "A",
    "Garrison or cantonment towns are urban settlements established primarily for the stationing, garrisoning, and training of military personnel (e.g. Mhow, Babina, Jalandhar Cantt, Portsmouth).\nHence, Option {{CORR}} is correct.",
    "Defines Garrison/Cantonment towns serving defense and armed forces."
)
add_u8(make_question(CHAPTER_U8, "Functional Classification", "What is a 'Garrison or Cantonment Town', and which cities exemplify this category?", opts, c, s))

# Q26: Educational Towns examples
opts, c, s = rotate_options(
    "Oxford, Cambridge, Heidelberg, and Roorkee",
    ["Rotterdam, Colon, and Port Said", "Detroit, Pittsburgh, and Bhilai", "Mhow, Babina, and Udhampur"],
    "B",
    "Educational towns develop around renowned universities, research institutions, and academic centers (e.g. Oxford, Cambridge, Heidelberg, Roorkee, Pilani).\nHence, Option {{CORR}} is correct.",
    "Lists famous university and educational towns: Oxford, Cambridge, Heidelberg, Roorkee."
)
add_u8(make_question(CHAPTER_U8, "Functional Classification", "Which of the following groups exemplifies 'Educational Towns' grown around world-famous academic universities?", opts, c, s))

# Q27: Religious and Cultural Towns examples
opts, c, s = rotate_options(
    "Jerusalem, Mecca, Vatican City, and Varanasi",
    ["Detroit, Flint, and Wolfsburg", "Kalgoorlie, Jharia, and Koderma", "Rotterdam, Singapore, and Panama City"],
    "C",
    "Religious and cultural towns attract pilgrims, religious institutions, and cultural scholars: Jerusalem, Mecca, Vatican City, Varanasi, Haridwar, Puri, and Amritsar.\nHence, Option {{CORR}} is correct.",
    "Lists major religious and cultural pilgrimage cities: Jerusalem, Mecca, Vatican, Varanasi."
)
add_u8(make_question(CHAPTER_U8, "Functional Classification", "Which of the following sets consists of premier 'Religious and Cultural Towns'?", opts, c, s))

# Q28: Tourist Towns examples
opts, c, s = rotate_options(
    "Miami, Nice, St. Moritz, Nainital, and Shimla",
    ["Durgapur, Rourkela, and Bokaro", "Babina, Mhow, and Meerut Cantt", "Jharia, Raniganj, and Singrauli"],
    "D",
    "Tourist towns specialize in catering to tourists seeking relaxation, scenic landscapes, or winter sports: Miami, Nice, Cannes, St. Moritz, Nainital, Shimla, and Darjeeling.\nHence, Option {{CORR}} is correct.",
    "Lists prominent tourist and hill resort towns: Miami, Nice, St. Moritz, Nainital, Shimla."
)
add_u8(make_question(CHAPTER_U8, "Functional Classification", "Which group of cities is functionally classified as 'Tourist Towns'?", opts, c, s))

# Q29: Match Urban Functions with Cities
add_u8(make_match_question(
    CHAPTER_U8, "Urban Functions",
    "Match List I (Functional Classification of Town) with List II (Representative City):",
    [("A", "Administrative Town"), ("B", "Mining Town"), ("C", "Garrison Town"), ("D", "Educational Town")],
    [("I", "Mhow / Babina"), ("II", "Canberra / New Delhi"), ("III", "Oxford / Roorkee"), ("IV", "Kalgoorlie / Jharia")],
    "A-II, B-IV, C-I, D-III", "A",
    "Administrative corresponds to Canberra/New Delhi (II); Mining corresponds to Kalgoorlie/Jharia (IV); Garrison corresponds to Mhow/Babina (I); Educational corresponds to Oxford/Roorkee (III).",
    "Matches functional town categories to representative global and Indian cities."
))

# Q30: Match Rural Settlement Patterns
add_u8(make_match_question(
    CHAPTER_U8, "Rural Patterns",
    "Match List I (Rural Settlement Pattern) with List II (Terrain / Spatial Feature):",
    [("A", "Linear Pattern"), ("B", "Circular Pattern"), ("C", "Star-like Pattern"), ("D", "Rectangular Pattern")],
    [("I", "Around a central lake, pond, or village common pasture"), ("II", "Along a road, railway line, river levee, or canal embankment"), ("III", "Flat fertile plains with roads intersecting at right angles"), ("IV", "Convergence of multiple roads with houses radiating outward")],
    "A-II, B-I, C-IV, D-III", "B",
    "Linear pattern develops along roads/rivers (II); Circular pattern develops around lakes/ponds (I); Star-like develops along converging roads (IV); Rectangular develops in flat plains (III).",
    "Connects rural settlement geometry to geographic layout features."
))

# Q31: Statement on Urban Slums
add_u8(make_statement_question(
    CHAPTER_U8, "Urban Problems",
    "Slums in developing countries suffer from extreme overcrowding, lack of piped drinking water, open drainage, and poor ventilation.",
    "Rapid rural-to-urban migration of low-income job seekers exceeds the capacity of cities to provide affordable housing and basic civic infrastructure.",
    1, "C",
    "Both statements are correct. Unplanned rural-urban migration outstrips urban municipal capacity, forcing millions of impoverished migrants into informal, unhygienic slums.",
    "Affirms the drivers and living conditions of urban slums in developing nations."
))

# Q32: Assertion-Reason on Defence as Settlement Site Factor
add_u8(make_assertion_question(
    CHAPTER_U8, "Site Factors",
    "Historically, many villages and towns were constructed on defensive hilltops, inselbergs, or river meander loops.",
    "Elevated hilltops and river meanders provided natural barriers against hostile raiders and permitted early detection of advancing enemy armies.",
    1, "D",
    "Both Assertion and Reason are true, and Reason is the correct explanation. During periods of political instability and warfare, defensible positions (high hills, meander necks) were preferred to protect communities from sudden attack.",
    "Explains why defense considerations determined historical settlement sites."
))

# Q33: Multi-statement on Environmental Problems of Cities
add_u8(make_multi_statement_question(
    CHAPTER_U8, "Urban Environment",
    "Which of the following constitute major environmental challenges faced by modern megacities?",
    [
        ("A", "Depletion of groundwater aquifers and contaminated urban water supplies."),
        ("B", "Severe air pollution and smog resulting from vehicular exhaust and industrial emissions."),
        ("C", "Inadequate solid waste management leading to massive unmanaged landfill mounds."),
        ("D", "Complete disappearance of all atmospheric gravity on city streets.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C are real, well-documented urban environmental crises. Statement D is an absurd distractor.",
    "Identifies valid environmental challenges in modern urban agglomerations."
))

# Q34: Urban Heat Island effect
opts, c, s = rotate_options(
    "Urban areas become significantly warmer than surrounding rural areas due to concrete structures, asphalt roads, and waste heat emissions",
    ["Cities experiencing continuous snowfall throughout the month of July", "Urban rivers freezing solid during mid-summer heatwaves", "The construction of artificial volcanic islands in city harbor bays"],
    "B",
    "The Urban Heat Island (UHI) effect occurs when concrete pavements, brick buildings, asphalt roadways, and vehicular/air-conditioning emissions absorb and trap heat, making urban centres several degrees warmer than adjacent rural countryside.\nHence, Option {{CORR}} is correct.",
    "Defines the Urban Heat Island effect caused by concrete surfaces and waste heat."
)
add_u8(make_question(CHAPTER_U8, "Urban Environment", "What causes the 'Urban Heat Island' phenomenon in large metropolitan agglomerations?", opts, c, s))

# Q35: Planned Capital Cities: Canberra and Brasilia
opts, c, s = rotate_options(
    "Canberra was designed by Walter Burley Griffin, and Brasilia was planned by Lucio Costa and Oscar Niemeyer as master-planned administrative capitals",
    ["Canberra was an ancient Roman fort town, while Brasilia was an 18th-century gold mining pit", "Both cities were built entirely under water inside coastal lagoons", "Both cities were settled by nomadic reindeer herders without roads"],
    "C",
    "Canberra was chosen as Australia's capital in 1911 and planned by American architect Walter Burley Griffin. Brasilia was master-planned by Lucio Costa and Oscar Niemeyer in the 1950s in the interior of Brazil to stimulate interior development.\nHence, Option {{CORR}} is correct.",
    "Identifies Canberra and Brasilia as famous planned administrative capitals."
)
add_u8(make_question(CHAPTER_U8, "Planned Cities", "What distinguished historical feature is shared by 'Canberra' (Australia) and 'Brasilia' (Brazil)?", opts, c, s))

# Q36: Canberra's radial garden design
opts, c, s = rotate_options(
    "Designed with a central artificial lake (Lake Burley Griffin) and circular/radial avenues respecting natural topography and garden city ideals",
    ["Designed as a dark underground bunker network beneath a coal mine", "Built as a single linear highway 1,000 km long with no cross-streets", "Constructed as a walled medieval fortress with four iron drawbridges"],
    "D",
    "Walter Burley Griffin's plan for Canberra incorporated the landscape with a central artificial lake (Lake Burley Griffin), geometric radial axes, circular roadways, and extensive parklands embodying garden city ideals.\nHence, Option {{CORR}} is correct.",
    "Describes Walter Burley Griffin's plan for Canberra: central lake, radial avenues, parklands."
)
add_u8(make_question(CHAPTER_U8, "Planned Cities", "What are the core spatial features of Walter Burley Griffin's master plan for the city of Canberra?", opts, c, s))

# Q37: Brasilia aircraft shape
opts, c, s = rotate_options(
    "The city is planned in the symbolic shape of a massive airplane, with government ministries along the fuselage and residential superquadras on the wings",
    ["The city is built as a perfect square surrounded by deep moats", "The city is arranged in twelve concentric circles around a stone pyramid", "The city has no roads and relies entirely on aerial ropeway gondolas"],
    "A",
    "Lucio Costa designed Brasilia in the shape of an airplane: the fuselage (Eixo Monumental) houses administrative ministries and the congress, while the curved wings (Asas) contain residential sectors ('superquadras') and commercial zones.\nHence, Option {{CORR}} is correct.",
    "Explains Brasilia's airplane-shaped urban layout planned by Lucio Costa."
)
add_u8(make_question(CHAPTER_U8, "Planned Cities", "What distinctive symbolic geometrical shape was adopted by urban planner Lucio Costa for the layout of Brasilia?", opts, c, s))

# Q38: Rural settlement building materials: Local availability
opts, c, s = rotate_options(
    "Stone and clay in arid plateaus, timber and thatch in forests, and mud bricks in alluvial plains reflect direct adaptation to local materials",
    ["All rural houses globally are built with imported titanium alloys", "Rural houses are constructed exclusively of plastic sheets imported from Japan", "Houses are forbidden from using any local stones, wood, or mud"],
    "B",
    "Building materials in rural settlements directly reflect local geology and ecology: stone in rocky hills, sun-dried mud bricks in alluvial plains, timber in forested mountains, and bamboo/thatch in wet tropical areas.\nHence, Option {{CORR}} is correct.",
    "Highlights the direct relationship between local natural materials and rural house construction."
)
add_u8(make_question(CHAPTER_U8, "House Types", "Why do building materials used in traditional rural houses vary systematically across geographical regions?", opts, c, s))

# Q39: T-shaped and Y-shaped settlement patterns
opts, c, s = rotate_options(
    "T-shaped develop at tri-junctions of roads; Y-shaped develop where two roads converge into one main thoroughfare",
    ["T-shaped are built around railway turntables; Y-shaped are built on mountaintops", "T-shaped are circular, while Y-shaped are square", "Both refer exclusively to underground subway station tunnels"],
    "C",
    "T-shaped settlements develop at a tri-junction where a road joins another at right angles. Y-shaped settlements develop where two roads meet and merge into a single highway, with houses lining all three arms.\nHence, Option {{CORR}} is correct.",
    "Distinguishes T-shaped road tri-junctions from Y-shaped road convergence settlements."
)
add_u8(make_question(CHAPTER_U8, "Rural Patterns", "Where do 'T-shaped' and 'Y-shaped' rural settlements characteristically evolve?", opts, c, s))

# Q40: Cruciform / Cross-shaped Pattern
opts, c, s = rotate_options(
    "Develops at cross-roads where two highways intersect at right angles, with houses extending in all four directions",
    ["Develops around a circular lake with houses facing the water", "Develops on a linear sandbar along an ocean coast", "Develops on an isolated cliff peak with only one road"],
    "D",
    "Cruciform or cross-shaped settlements develop at crossroads where two major thoroughfares intersect, and houses spread along the road frontages in all four directions from the central junction.\nHence, Option {{CORR}} is correct.",
    "Defines Cruciform/Cross-shaped settlement patterns at four-way road intersections."
)
add_u8(make_question(CHAPTER_U8, "Rural Patterns", "What layout defines a 'Cruciform' (or Cross-shaped) settlement pattern?", opts, c, s))

# Q41: Slum definition (UN-Habitat)
opts, c, s = rotate_options(
    "Contiguous settlement lacking durable housing, sufficient living space, clean water, sanitation, and secure tenure",
    ["A luxury gated residential community with private golf courses", "A university academic campus with student hostels and libraries", "A suburban shopping complex with multi-story parking structures"],
    "A",
    "UN-Habitat defines a slum as a contiguous settlement where inhabitants face one or more shelter deprivations: lack of access to safe water, lack of sanitation, poor structural quality of housing, overcrowding, and insecure residential tenure.\nHence, Option {{CORR}} is correct.",
    "States the UN-Habitat definition of an informal urban slum."
)
add_u8(make_question(CHAPTER_U8, "Urban Slums", "According to UN-Habitat, what defines an informal urban settlement as a 'Slum'?", opts, c, s))

# Q42: Dharavi in Mumbai
opts, c, s = rotate_options(
    "Asia's largest slum, known for intense informal recycling, leather, and pottery cottage industries alongside extreme overcrowding",
    ["A high-tech aerospace research park near Mumbai airport", "An exclusive private yacht marina on the Arabian Sea", "A deep-water nuclear submarine dockyard"],
    "B",
    "Dharavi in Mumbai is one of the largest slums in Asia. Despite severe congestion and inadequate sanitation, it functions as a vibrant informal economic hub generating over a billion dollars in recycling, leather tanning, and pottery.\nHence, Option {{CORR}} is correct.",
    "Describes Dharavi in Mumbai: Asia's largest slum with immense informal economic productivity."
)
add_u8(make_question(CHAPTER_U8, "Urban Case Study: Dharavi", "What dual characteristics define 'Dharavi' in Mumbai in urban geography?", opts, c, s))

# Q43: Sub-urbanisation definition
opts, c, s = rotate_options(
    "Movement of people from congested central cities to new, residential peripheral areas and suburbs beyond city limits",
    ["Abandoning cities to live as nomadic herders in the desert", "Moving all government ministries into underwater caves", "Forcing all rural villagers to relocate into downtown high-rises"],
    "C",
    "Sub-urbanisation is the trend of the city population moving away from the congested and expensive urban centre to cleaner, quieter residential areas outside the city periphery.\nHence, Option {{CORR}} is correct.",
    "Defines Sub-urbanisation as migration from congested city cores to peripheral suburbs."
)
add_u8(make_question(CHAPTER_U8, "Urban Dynamics", "What does the process of 'Sub-urbanisation' entail?", opts, c, s))

# Q44: Urban Sprawl
opts, c, s = rotate_options(
    "Unrestricted, low-density horizontal expansion of housing and commercial zones over agricultural and forested peripheral lands",
    ["Vertical construction of 150-story skyscrapers in city downtowns", "The complete demolition of all roads leading into a city", "Planting continuous green forest belts around urban boundaries"],
    "D",
    "Urban sprawl refers to the uncoordinated, rapid, low-density horizontal spread of a metropolitan area into surrounding rural hinterlands, consuming productive farmland and increasing dependence on private automobiles.\nHence, Option {{CORR}} is correct.",
    "Defines Urban Sprawl as horizontal low-density expansion consuming peripheral land."
)
add_u8(make_question(CHAPTER_U8, "Urban Expansion", "What is meant by 'Urban Sprawl' in metropolitan planning?", opts, c, s))

# Q45: Dry-point settlements in floodplains
opts, c, s = rotate_options(
    "Sited on natural river levees, terraces, or raised mounds to protect homes from seasonal inundation",
    ["Built on the bed of dry seasonal lakes to collect rain", "Constructed inside river channels to generate hydropower", "Located in underground caverns to avoid sunlight"],
    "A",
    "In low-lying deltaic regions and river floodplains (like Bangladesh or the Netherlands), settlements locate on natural levees, river terraces, or artificial earth mounds to avoid seasonal floods (dry-point sites).\nHence, Option {{CORR}} is correct.",
    "Explains dry-point settlement siting on levees and mounds to avoid floodwaters."
)
add_u8(make_question(CHAPTER_U8, "Site Factors", "Why are 'Dry-Point Settlements' in low-lying river deltas specifically sited on river levees and terraces?", opts, c, s))

# Q46: Wet-point settlements in desert oases
opts, c, s = rotate_options(
    "Sited around natural springs, oases, or perennial water sources in arid zones where water is scarce",
    ["Sited on hyper-arid sand dunes where water is completely absent", "Built in underground salt mines", "Constructed on rocky mountain peaks above the snowline"],
    "B",
    "In arid and semi-arid environments (like the Sahara or Rajasthan), water is the single most critical survival resource; settlements cluster tightly around available oases, springs, or tanks (wet-point sites).\nHence, Option {{CORR}} is correct.",
    "Explains wet-point settlement clustering around oases in arid deserts."
)
add_u8(make_question(CHAPTER_U8, "Site Factors", "What determines the location of 'Wet-Point Settlements' in arid desert regions?", opts, c, s))

# Q47: Match World Conurbations and Megalopolises
add_u8(make_match_question(
    CHAPTER_U8, "Urban Concepts",
    "Match List I (Urban Agglomeration / Concept) with List II (Associated City / Pioneer):",
    [("A", "Conurbation (1915)"), ("B", "Megalopolis (1957)"), ("C", "First Million City (1810)"), ("D", "World's Largest Megacity")],
    [("I", "London"), ("II", "Tokyo (37+ million)"), ("III", "Patrick Geddes"), ("IV", "Jean Gottmann (Boswash)")],
    "A-III, B-IV, C-I, D-II", "C",
    "Conurbation was coined by Patrick Geddes (III); Megalopolis by Jean Gottmann (IV); First million city was London (I); Largest megacity is Tokyo (II).",
    "Matches foundational urban geographic concepts with their pioneers and exemplars."
))

# Q48: Statement on Dispersed Settlements in Mountainous Terrain
add_u8(make_statement_question(
    CHAPTER_U8, "Dispersed Settlements",
    "Dispersed settlements are commonly found in the Himalayan hills of Uttarakhand, Himachal Pradesh, and northern West Bengal.",
    "Dispersed settlement patterns develop where terrain is rugged, agricultural land is fragmented, and water is available only in tiny scattered springs.",
    1, "D",
    "Both statements are correct. Rugged mountain terrain, tiny terraced agricultural patches, and scattered water springs lead to isolated, dispersed homesteads across the Himalayan states.",
    "Explains the physical factors causing dispersed settlements in mountainous terrain."
))

# Q49: Assertion-Reason on Rural-Urban Functional Interdependence
add_u8(make_assertion_question(
    CHAPTER_U8, "Rural-Urban Continuum",
    "Rural and urban settlements are economically interdependent and linked through the exchange of goods and services.",
    "Rural settlements supply agricultural raw materials and food to cities, while urban settlements provide manufactured consumer goods and specialized services.",
    1, "A",
    "Both Assertion and Reason are true, and Reason correctly explains the Assertion. Rural-urban linkages form a functional continuum: agricultural surplus feeds urban workers, while urban factories supply tools, fertilizers, and services to villages.",
    "Explains the economic symbiosis and functional interdependence between rural and urban areas."
))

# Q50: Multi-statement on Rural Housing Problems in Developing Countries
add_u8(make_multi_statement_question(
    CHAPTER_U8, "Rural Problems",
    "Which of the following represent pervasive infrastructural deficiencies in rural settlements of developing nations?",
    [
        ("A", "Inadequate supply of clean drinking water, leading to high incidence of water-borne diseases."),
        ("B", "Lack of proper sanitation and toilet facilities, contributing to open defecation."),
        ("C", "Kachcha houses made of unbaked mud and thatch, vulnerable to heavy rain, flood, and fire damage."),
        ("D", "Universal presence of 24-hour underground electric subway train networks.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C accurately depict classic rural infrastructural and shelter deprivations. Statement D is an absurd distractor.",
    "Identifies real infrastructural challenges in developing rural communities."
))

# Q51: Administrative Town criteria: Census of India
opts, c, s = rotate_options(
    "Places with a municipality, corporation, cantonment board, or notified town area committee",
    ["Any village that contains more than 10 sheep", "Any forest clearing where nomadic herders pitch tents for two nights", "Any uninhabited mountain valley"],
    "C",
    "According to the Census of India, a statutory town is any place with a municipality, municipal corporation, cantonment board, or notified town area committee.\nHence, Option {{CORR}} is correct.",
    "States the Indian Census definition of a statutory administrative town."
)
add_u8(make_question(CHAPTER_U8, "Urban Definitions", "According to the Census of India, what constitutes a 'Statutory Town'?", opts, c, s))

# Q52: Census Town 3 criteria in India
opts, c, s = rotate_options(
    "Minimum population of 5,000; at least 75% of male main workers in non-agricultural pursuits; density of at least 400 persons per sq km",
    ["Population of 500; 100% farmers; density of 10 persons per sq km", "Population of 1,000,000; all government employees; zero land taxes", "Population of 100; all fishermen; density of 1 person per sq km"],
    "D",
    "The Census of India defines a 'Census Town' by three strict criteria: (1) Minimum population of 5,000, (2) At least 75% of male main working population engaged in non-agricultural pursuits, and (3) A population density of at least 400 persons per sq km.\nHence, Option {{CORR}} is correct.",
    "Details the 3 criteria for an Indian Census Town: 5000 pop, 75% non-agri males, 400/sq km density."
)
add_u8(make_question(CHAPTER_U8, "Urban Definitions", "What three quantitative criteria are required by the Census of India to classify a settlement as a 'Census Town'?", opts, c, s))

# Q53: Metropolitan Area population in India
opts, c, s = rotate_options(
    "An urban agglomeration with a population of 1 million (10 lakhs) or more",
    ["An urban area with 10,000 residents", "A settlement with 50,000 residents", "A district with 100 residents"],
    "A",
    "In India, a metropolitan city (or Million-plus city) is officially designated as an urban agglomeration with a population of 1 million (10 lakhs) or more.\nHence, Option {{CORR}} is correct.",
    "Identifies 1 million (10 lakhs) as the threshold for a Metropolitan City in India."
)
add_u8(make_question(CHAPTER_U8, "Indian Urban Hierarchy", "What is the official population threshold for a city to be designated as a 'Metropolitan City' (Million-plus city) in India?", opts, c, s))

# Q54: Urban Agglomeration definition
opts, c, s = rotate_options(
    "A continuous urban spread consisting of a core town and its adjoining urban outgrowths, or two or more physically contiguous towns",
    ["A rural district with 500 separate scattered farmhouses", "An agricultural cooperative society owning combine harvesters", "A marine archipelago of uninhabited coral islands"],
    "B",
    "An Urban Agglomeration (UA) is a continuous urban spread comprising a statutory town and its adjoining urban outgrowths (OGs), or two or more contiguous towns with or without outgrowths.\nHence, Option {{CORR}} is correct.",
    "Defines an Urban Agglomeration as a continuous urban spread with adjoining outgrowths."
)
add_u8(make_question(CHAPTER_U8, "Urban Definitions", "How is an 'Urban Agglomeration' (UA) defined by the Census of India?", opts, c, s))

# Q55: Primate City concept
opts, c, s = rotate_options(
    "Mark Jefferson, in 1939: the largest city in a nation being disproportionately larger than any other (often twice as large as the second city)",
    ["Walter Christaller, in 1933: all cities are identical in size", "Von Thunen, in 1826: cities are concentric rings of wheat", "August Losch, in 1940: hexagonal markets across an isotropic plain"],
    "C",
    "The Law of the Primate City was formulated by Mark Jefferson in 1939, asserting that a country's leading city is disproportionately large and exceptionally expressive of national capacity and feeling, dominating the urban hierarchy.\nHence, Option {{CORR}} is correct.",
    "Attributes the Primate City concept to Mark Jefferson (1939)."
)
add_u8(make_question(CHAPTER_U8, "Urban Hierarchy Theories", "Who formulated the 'Law of the Primate City' in 1939, describing disproportionately dominant leading cities in national hierarchies?", opts, c, s))

# Q56: Rank-Size Rule
opts, c, s = rotate_options(
    "George Zipf, in 1949: the population of the nth ranked city is 1/n times the population of the largest city",
    ["Albert Einstein, in 1905: cities expand at the speed of light", "Charles Darwin, in 1859: cities evolve through natural selection", "Adam Smith, in 1776: city populations are determined by the invisible hand"],
    "D",
    "The Rank-Size Rule was popularized by George Zipf in 1949, stating that the population of the nth ranked city will be 1/n of the population of the largest city in the country (Pn = P1 / n).\nHence, Option {{CORR}} is correct.",
    "Attributes the Rank-Size Rule (Pn = P1 / n) to George Zipf (1949)."
)
add_u8(make_question(CHAPTER_U8, "Urban Hierarchy Theories", "Who formulated the mathematical 'Rank-Size Rule' (Pn = P1/n) governing settlement population hierarchies?", opts, c, s))

# Q57: Central Place Theory
opts, c, s = rotate_options(
    "Walter Christaller (1933), explaining the size, number, and distribution of settlements using hexagonal market areas",
    ["Griffith Taylor (1940), using traffic lights on city intersections", "Ellen Semple (1911), analyzing unresting man and unstable earth", "Patrick Geddes (1915), defining industrial conurbations"],
    "A",
    "Central Place Theory was formulated by German geographer Walter Christaller in 1933, using hexagonal market areas and nested hierarchies (k=3, k=4, k=7) to explain the spacing and functions of central settlements.\nHence, Option {{CORR}} is correct.",
    "Attributes Central Place Theory and hexagonal service areas to Walter Christaller (1933)."
)
add_u8(make_question(CHAPTER_U8, "Urban Location Theories", "Who propounded the 'Central Place Theory' (1933) using hexagonal market hierarchies to explain settlement distribution?", opts, c, s))

# Q58: Concentric Zone Model
opts, c, s = rotate_options(
    "Ernest Burgess (1925), depicting cities growing outward in five concentric rings from the Central Business District (CBD)",
    ["Homer Hoyt (1939), using sectoral wedges along transit corridors", "Harris and Ullman (1945), using multiple nuclei nodes", "Jean Gottmann (1957), mapping Boswash megalopolis"],
    "B",
    "The Concentric Zone Model was proposed by sociologist Ernest Burgess in 1925 based on Chicago, modeling city expansion in five concentric rings from the CBD outwards to the commuter zone.\nHence, Option {{CORR}} is correct.",
    "Attributes the Concentric Zone urban model to Ernest Burgess (1925)."
)
add_u8(make_question(CHAPTER_U8, "Urban Morphology", "Which urban theorist formulated the 'Concentric Zone Model' (1925) depicting city growth in five concentric rings?", opts, c, s))

# Q59: Sector Model of Urban Structure
opts, c, s = rotate_options(
    "Homer Hoyt (1939), arguing that cities grow outward in wedge-shaped sectors along major transportation corridors radiating from the CBD",
    ["Ernest Burgess (1925), using five concentric circles", "Patrick Geddes (1915), using valley sections", "Walter Christaller (1933), using hexagons"],
    "C",
    "Economist Homer Hoyt proposed the Sector Model in 1939, asserting that high-rent residential districts and industrial zones expand outward in pie-shaped wedge sectors along major rail and arterial highway corridors.\nHence, Option {{CORR}} is correct.",
    "Attributes the Sector Model of urban growth along transport wedges to Homer Hoyt (1939)."
)
add_u8(make_question(CHAPTER_U8, "Urban Morphology", "Who formulated the 'Sector Model' (1939) in urban geography, stating that cities grow in wedge-shaped sectors along transportation routes?", opts, c, s))

# Q60: Multiple Nuclei Model
opts, c, s = rotate_options(
    "C.D. Harris and E.L. Ullman (1945), asserting that modern cities do not grow around a single center but around several distinct specialized nuclei",
    ["Mark Jefferson (1939), analyzing primate capital cities", "George Zipf (1949), formulating the rank-size rule", "Ferdinand de Lesseps (1869), designing shipping canals"],
    "D",
    "The Multiple Nuclei Model was developed by Chauncy Harris and Edward Ullman in 1945, showing that large modern cities develop multiple distinct nodes (ports, manufacturing districts, suburban business parks, universities) rather than a single CBD.\nHence, Option {{CORR}} is correct.",
    "Attributes the Multiple Nuclei Model to Harris and Ullman (1945)."
)
add_u8(make_question(CHAPTER_U8, "Urban Morphology", "Which geographers formulated the 'Multiple Nuclei Model' (1945) showing that cities expand around multiple specialized nodes?", opts, c, s))

validate_and_collect(u8_qs, u8_seen)
assert len(u8_qs) == 60
with open("mock/geo_units/unit8.json", "w", encoding="utf-8") as f:
    json.dump(u8_qs, f, indent=2, ensure_ascii=False)
print("Unit 8 generated: 60 questions")
print("Total questions in part_a3:", len(u7_qs) + len(u8_qs))
