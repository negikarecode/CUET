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

# Load seen questions from units 1 to 11
for u in range(1, 12):
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
# UNIT 12: India: Mineral and Energy Resources (60 Questions)
# =================================================================================================
CHAPTER_U12 = "India: Mineral and Energy Resources"
u12_qs = []
u12_seen = set()

def add_u12(q):
    u12_qs.append(q)

# Q1: North-Eastern Plateau Region minerals
opts, c, s = rotate_options(
    "Chotanagpur, Odisha, West Bengal, and Chhattisgarh (iron ore, coal, manganese, bauxite, mica)",
    ["Aravalli ranges of Rajasthan and Gujarat (copper, zinc, marble)", "Western Ghats of Kerala and Tamil Nadu (monazite and lignite)", "Himalayan ranges of Ladakh and Kashmir"],
    "A",
    "The North-Eastern Plateau Region (covering Chotanagpur, Odisha plateau, West Bengal, and parts of Chhattisgarh) is India's premier mineral belt, rich in iron ore, coking coal, manganese, bauxite, and mica.\nHence, Option {{CORR}} is correct.",
    "Identifies the North-Eastern Plateau Region as India's premier mineral belt."
)
add_u12(make_question(CHAPTER_U12, "Mineral Belts of India", "Which region constitutes the richest and most diverse mineral belt of India?", opts, c, s))

# Q2: South-Western Plateau Region minerals
opts, c, s = rotate_options(
    "Karnataka, Goa, and contiguous Tamil Nadu/Kerala uplands (rich in iron ore, manganese, bauxite; lacks coking coal)",
    ["Punjab, Haryana, and Rajasthan (rich in coking coal and crude petroleum)", "Sundarbans delta of West Bengal (rich in emeralds and diamonds)", "Kashmir valley (rich in bauxite and iron ore)"],
    "B",
    "The South-Western Plateau Region extends over Karnataka, Goa, and uplands of Tamil Nadu and Kerala. It is rich in ferrous metals (iron ore, manganese) and bauxite, but lacks high-grade coking coal (containing only tertiary lignite at Neyveli).\nHence, Option {{CORR}} is correct.",
    "Describes the mineral wealth and coking coal deficit of the South-Western Plateau Region."
)
add_u12(make_question(CHAPTER_U12, "Mineral Belts of India", "What defines the mineral profile of the 'South-Western Plateau Region' of India?", opts, c, s))

# Q3: North-Western Region minerals
opts, c, s = rotate_options(
    "Aravallis in Rajasthan and Gujarat (copper, zinc, lead, limestone, gypsum, marble, and petroleum in Gujarat)",
    ["Coal, iron ore, and manganese in deep crystalline rocks", "Monazite beach sands and offshore uranium deposits", "Gold and platinum reefs in river alluvium"],
    "C",
    "The North-Western mineral belt extends along the Aravalli range in Rajasthan and parts of Gujarat, rich in non-ferrous minerals (copper, zinc, lead), building stones (marble, sandstone, granite), gypsum, and petroleum in Gujarat.\nHence, Option {{CORR}} is correct.",
    "Identifies non-ferrous minerals, building stones, and petroleum in the North-Western belt."
)
add_u12(make_question(CHAPTER_U12, "Mineral Belts of India", "Which minerals characterize the 'North-Western Region' encompassing Rajasthan and Gujarat?", opts, c, s))

# Q4: Monazite beach sands in Kerala
opts, c, s = rotate_options(
    "Thorium and Ilmenite",
    ["Coking coal and Lignite", "Hematite and Magnetite iron ore", "Potash and Sulphur"],
    "D",
    "The coastal beach sands of Kerala (particularly in Kollam and Alappuzha districts) are world-famous for their rich concentration of Monazite (the primary ore of Thorium) and Ilmenite.\nHence, Option {{CORR}} is correct.",
    "Identifies Thorium and Ilmenite in the monazite beach sands of Kerala."
)
add_u12(make_question(CHAPTER_U12, "Nuclear Minerals", "The coastal beach sands of Kerala are rich in which strategic nuclear and mineral resources?", opts, c, s))

# Q5: Bailadila Iron Ore mine location
opts, c, s = rotate_options(
    "Dantewada district of Chhattisgarh (high-grade hematite ore exported to Japan via Visakhapatnam)",
    ["Jhansi district of Uttar Pradesh", "Jodhpur district of Rajasthan", "Gaya district of Bihar"],
    "A",
    "The Bailadila iron ore range is situated in Dantewada district of Chhattisgarh. Its super-high grade hematite deposits are mined mechanically and exported to Japan and South Korea via Visakhapatnam port.\nHence, Option {{CORR}} is correct.",
    "Locates Bailadila iron ore in Dantewada, Chhattisgarh, exported via Visakhapatnam."
)
add_u12(make_question(CHAPTER_U12, "Iron Ore", "In which state and district is the famous 'Bailadila' high-grade iron ore mine situated?", opts, c, s))

# Q6: Odisha Iron Ore deposits
opts, c, s = rotate_options(
    "Mayurbhanj (Gurumahisani, Sulaipat, Badampahar) and Kendujhar (Kiriburu)",
    ["Kolar and Hutti", "Khetri and Zawar", "Ankleshwar and Kalol"],
    "B",
    "In Odisha, high-grade hematite iron ore occurs in the hills of Mayurbhanj district (Gurumahisani, Sulaipat, Badampahar) and Kendujhar district (Kiriburu).\nHence, Option {{CORR}} is correct.",
    "Identifies Mayurbhanj and Kendujhar iron ore deposits in Odisha."
)
add_u12(make_question(CHAPTER_U12, "Iron Ore", "Which districts in Odisha contain the prominent iron ore mining centers of Gurumahisani, Badampahar, and Kiriburu?", opts, c, s))

# Q7: Karnataka Iron Ore deposits
opts, c, s = rotate_options(
    "Bellary-Hospet, Sandur, Kudremukh, and Bababudan hills in Chikmagalur",
    ["Durgapur and Burnpur in Bardhaman", "Singhbhum and Bokaro in Jharkhand", "Korba and Raigarh in Chhattisgarh"],
    "C",
    "In Karnataka, major iron ore deposits occur in the Sandur-Hospet area of Bellary district, Bababudan hills, and Kudremukh in Chikmagalur district, as well as Chitradurga and Tumakuru.\nHence, Option {{CORR}} is correct.",
    "Lists major iron ore belts in Karnataka: Bellary-Hospet, Sandur, Kudremukh, Bababudan."
)
add_u12(make_question(CHAPTER_U12, "Iron Ore", "Which regions constitute the primary iron ore mining belt in the state of Karnataka?", opts, c, s))

# Q8: Manganese leading producer state
opts, c, s = rotate_options(
    "Odisha (Kendujhar, Sundargarh, Balangir)",
    ["Tamil Nadu", "Punjab", "Assam"],
    "D",
    "Odisha is the leading producer of manganese ore in India, accounting for over one-fourth of national production, with major mines in Kendujhar, Sundargarh, and Balangir.\nHence, Option {{CORR}} is correct.",
    "Identifies Odisha as India's leading manganese producer."
)
add_u12(make_question(CHAPTER_U12, "Manganese", "Which state is the leading producer of manganese in India?", opts, c, s))

# Q9: Bauxite leading producer state
opts, c, s = rotate_options(
    "Odisha, with the Panchpatmali deposits in Koraput district being the most important",
    ["Kerala, with deposits in Wayanad", "Punjab, with deposits in Amritsar", "Rajasthan, with deposits in Bikaner"],
    "A",
    "Odisha is by far the largest bauxite producing state in India, contributing over half of the national output. The Panchpatmali deposits in Koraput district are the most extensive bauxite reserves.\nHence, Option {{CORR}} is correct.",
    "Identifies Odisha and the Panchpatmali deposits in Koraput as India's premier bauxite source."
)
add_u12(make_question(CHAPTER_U12, "Bauxite", "Which state dominates India's bauxite production, and which specific district contains the famous 'Panchpatmali' deposits?", opts, c, s))

# Q10: Copper mining centers in India
opts, c, s = rotate_options(
    "Balaghat (Malanjkhand in MP), Jhunjhunu (Khetri in Rajasthan), and Singhbhum (Mosabani in Jharkhand)",
    ["Bhadravati and Hospet in Karnataka", "Neyveli and Salem in Tamil Nadu", "Digboi and Moran in Assam"],
    "B",
    "Major copper mining centers in India are Malanjkhand in Balaghat district (MP, largest producer), Khetri-Singhana belt in Jhunjhunu district (Rajasthan), and Mosabani/Rakha in Singhbhum district (Jharkhand).\nHence, Option {{CORR}} is correct.",
    "Lists major Indian copper mining centers: Malanjkhand (MP), Khetri (Rajasthan), Singhbhum (Jharkhand)."
)
add_u12(make_question(CHAPTER_U12, "Copper", "Which group correctly identifies the major copper mining centers of India?", opts, c, s))

# Q11: Mica: Koderma belt
opts, c, s = rotate_options(
    "Koderma-Gaya-Hazaribagh belt in Jharkhand-Bihar, producing world-renowned 'Ruby Mica'",
    ["Kolar gold fields in Karnataka", "Makum coalfields in Assam", "Ankleshwar petroleum fields in Gujarat"],
    "C",
    "The 150 km-long Koderma-Gaya-Hazaribagh belt in Jharkhand and Bihar is historically celebrated for producing the world's finest quality clear, sheet-grade 'Ruby Mica'.\nHence, Option {{CORR}} is correct.",
    "Identifies the Koderma-Gaya-Hazaribagh belt as the premier source of 'Ruby Mica'."
)
add_u12(make_question(CHAPTER_U12, "Mica", "Which mining belt in eastern India is globally renowned for producing the finest quality 'Ruby Mica'?", opts, c, s))

# Q12: Gondwana Coal vs Tertiary Coal
opts, c, s = rotate_options(
    "Gondwana coal is over 200 million years old (accounting for 98% of reserves and metallurgical coking coal); Tertiary coal is ~55 million years old (in Assam, Meghalaya, Arunachal)",
    ["Gondwana coal is formed in seawater, while Tertiary coal is formed in clouds", "Gondwana coal is found only in Kashmir, while Tertiary coal is found in Tamil Nadu", "Both are identical and contain zero carbon"],
    "D",
    "About 98% of India's coal reserves belong to the Gondwana geological period (200 million years old), located in river valleys and providing metallurgical coal. Tertiary coal (55 million years old) is younger with higher sulfur, found in Assam, Meghalaya, and Nagaland.\nHence, Option {{CORR}} is correct.",
    "Contrasts ancient Gondwana coal (98% reserves, coking coal) with younger Tertiary coal."
)
add_u12(make_question(CHAPTER_U12, "Coal Resources", "What is the crucial geological distinction between 'Gondwana Coal' and 'Tertiary Coal' in India?", opts, c, s))

# Q13: Damodar Valley Coalfields
opts, c, s = rotate_options(
    "Raniganj (oldest coalfield, in West Bengal), Jharia (largest coking coalfield, in Jharkhand), Bokaro, and Giridih",
    ["Singrauli and Korba in central India", "Singareni in the Godavari valley", "Talcher in the Mahanadi valley"],
    "A",
    "The Damodar Valley along the Jharkhand-West Bengal border is India's premier metallurgical coal belt: Raniganj (opened in 1774, oldest coalfield), Jharia (largest coalfield with prime coking coal), Bokaro, and Giridih.\nHence, Option {{CORR}} is correct.",
    "Lists major Damodar Valley coalfields: Raniganj, Jharia, Bokaro, Giridih."
)
add_u12(make_question(CHAPTER_U12, "Coal Resources", "Which historic coalfields are situated within the Damodar River Valley?", opts, c, s))

# Q14: Singareni Coalfields
opts, c, s = rotate_options(
    "Godavari River Valley in Telangana",
    ["Damodar River Valley in Jharkhand", "Mahanadi River Valley in Odisha", "Son River Valley in Madhya Pradesh"],
    "B",
    "The Singareni Collieries are located in the Godavari River Valley in Telangana, serving thermal power stations and industries across southern India.\nHence, Option {{CORR}} is correct.",
    "Locates the Singareni coalfields in the Godavari River Valley in Telangana."
)
add_u12(make_question(CHAPTER_U12, "Coal Resources", "The prominent 'Singareni' coalfield is situated in which river valley and state?", opts, c, s))

# Q15: Neyveli Lignite deposits
opts, c, s = rotate_options(
    "Cuddalore district of Tamil Nadu, utilized for major thermal power generation and briquetting",
    ["Kutch district of Gujarat", "Barmer district of Rajasthan", "Bastar district of Chhattisgarh"],
    "C",
    "Neyveli in Cuddalore district of Tamil Nadu contains India's largest deposits of lignite (brown coal), mined by the Neyveli Lignite Corporation (NLC) for thermal electricity generation.\nHence, Option {{CORR}} is correct.",
    "Locates Neyveli lignite deposits in Cuddalore district, Tamil Nadu."
)
add_u12(make_question(CHAPTER_U12, "Lignite Coal", "Where are the largest commercial deposits of 'Lignite' (brown coal) in India situated?", opts, c, s))

# Q16: Oldest oilfield in India
opts, c, s = rotate_options(
    "Digboi in Tinsukia district of Assam, drilled in the late nineteenth century (1866/1889)",
    ["Ankleshwar in Gujarat", "Mumbai High off Maharashtra", "Mangala in Rajasthan"],
    "D",
    "Digboi in Assam is the oldest continuously operating oilfield in India and Asia, where commercial crude oil extraction commenced in 1889.\nHence, Option {{CORR}} is correct.",
    "Identifies Digboi in Assam as India's oldest operational oilfield."
)
add_u12(make_question(CHAPTER_U12, "Petroleum Resources", "Which is the oldest commercial oil-producing field in India?", opts, c, s))

# Q17: Mumbai High Offshore oilfield
opts, c, s = rotate_options(
    "Discovered in 1973, located 160 km off the coast of Mumbai in the Arabian Sea, drilled by mobile platform 'Sagar Samrat'",
    ["Discovered in 1850 on the beaches of Goa", "Located inside the Sundarbans delta of West Bengal", "Discovered in 1999 in the Palk Strait of Tamil Nadu"],
    "A",
    "Mumbai High is an offshore oilfield discovered in 1973 by the ONGC, situated 160 km west-northwest of Mumbai in the Arabian Sea. Commercial production began in 1976 using the jack-up rig 'Sagar Samrat'.\nHence, Option {{CORR}} is correct.",
    "Details Mumbai High offshore field (1973, 160 km offshore, Sagar Samrat)."
)
add_u12(make_question(CHAPTER_U12, "Petroleum Resources", "What are the historical and operational facts regarding the 'Mumbai High' offshore petroleum field?", opts, c, s))

# Q18: Gujarat oilfields
opts, c, s = rotate_options(
    "Ankleshwar (most important), Kalol, Nawagam, Mehsana, and Lunej around the Gulf of Khambhat",
    ["Khetri and Zawar in the Aravallis", "Jharia and Bokaro in the Damodar valley", "Bailadila and Dalli-Rajhara in the Bastar hills"],
    "B",
    "Major oilfields in Gujarat lie around the Gulf of Khambhat (Cambay basin): Ankleshwar (the largest onshore field in Gujarat), Kalol, Nawagam, Mehsana, Sobhasan, and Lunej.\nHence, Option {{CORR}} is correct.",
    "Lists major onshore oilfields in Gujarat: Ankleshwar, Kalol, Nawagam, Mehsana, Lunej."
)
add_u12(make_question(CHAPTER_U12, "Petroleum Resources", "Which group represents the major onshore petroleum fields in the state of Gujarat?", opts, c, s))

# Q19: First Nuclear Power Station in India
opts, c, s = rotate_options(
    "Tarapur Nuclear Power Station in Maharashtra, commissioned in 1969",
    ["Rawatbhata near Kota in Rajasthan", "Narora in Uttar Pradesh", "Kalpakkam in Tamil Nadu"],
    "C",
    "The Tarapur Atomic Power Station (TAPS) in Palghar district of Maharashtra was the first commercial nuclear power station built in India, commissioned in October 1969.\nHence, Option {{CORR}} is correct.",
    "Identifies Tarapur (Maharashtra, 1969) as India's first nuclear power plant."
)
add_u12(make_question(CHAPTER_U12, "Nuclear Energy", "Which was the first commercial nuclear power station commissioned in India, and in which state?", opts, c, s))

# Q20: Match Nuclear Power Plants with States
add_u12(make_match_question(
    CHAPTER_U12, "Nuclear Power Stations",
    "Match List I (Nuclear Power Station) with List II (State):",
    [("A", "Tarapur"), ("B", "Rawatbhata"), ("C", "Kalpakkam"), ("D", "Narora")],
    [("I", "Rajasthan (near Kota)"), ("II", "Uttar Pradesh (Bulandshahr)"), ("III", "Maharashtra (Palghar)"), ("IV", "Tamil Nadu (Chengalpattu)")],
    "A-III, B-I, C-IV, D-II", "D",
    "Tarapur is in Maharashtra (III); Rawatbhata is in Rajasthan (I); Kalpakkam is in Tamil Nadu (IV); Narora is in Uttar Pradesh (II).",
    "Matches major Indian nuclear power stations to their respective states."
))

# Q21: Kaiga and Kakrapar nuclear plants
opts, c, s = rotate_options(
    "Kaiga is in Karnataka (Uttara Kannada); Kakrapar is in Gujarat (Surat district)",
    ["Kaiga is in Kerala; Kakrapar is in Punjab", "Kaiga is in Bihar; Kakrapar is in Odisha", "Both are located in Madhya Pradesh"],
    "A",
    "The Kaiga Atomic Power Station is situated in Uttara Kannada district of Karnataka, while the Kakrapar Atomic Power Station is located near Surat in Gujarat.\nHence, Option {{CORR}} is correct.",
    "Locates Kaiga in Karnataka and Kakrapar in Gujarat."
)
add_u12(make_question(CHAPTER_U12, "Nuclear Energy", "In which states are the 'Kaiga' and 'Kakrapar' nuclear power stations situated respectively?", opts, c, s))

# Q22: Bhadla Solar Park location
opts, c, s = rotate_options(
    "Phalodi / Jodhpur district of Rajasthan (one of the world's largest solar parks with over 2,245 MW capacity)",
    ["Kutch district of Gujarat", "Anantapur district of Andhra Pradesh", "Rewa district of Madhya Pradesh"],
    "B",
    "Bhadla Solar Park, situated in the arid Thar desert in Jodhpur/Phalodi district of Rajasthan, spans over 14,000 acres with an installed capacity exceeding 2,245 MW, making it one of the largest solar installations in the world.\nHence, Option {{CORR}} is correct.",
    "Identifies Bhadla Solar Park in Jodhpur/Phalodi, Rajasthan, as one of the world's largest."
)
add_u12(make_question(CHAPTER_U12, "Solar Energy", "Where is the mega 'Bhadla Solar Park', one of the world's largest photovoltaic solar parks, located?", opts, c, s))

# Q23: Largest Wind Farm cluster in India
opts, c, s = rotate_options(
    "Muppandal wind farm cluster in Kanyakumari / Tirunelveli districts of Tamil Nadu",
    ["Lamba wind farm in coastal Gujarat", "Jaisalmer wind park in Rajasthan", "Chikmagalur wind farm in Karnataka"],
    "C",
    "The Muppandal wind farm cluster, located near Kanyakumari in southern Tamil Nadu, harnesses strong mountain gap winds through the Palghat/Aralvaimozhi pass, representing India's largest operational wind power cluster.\nHence, Option {{CORR}} is correct.",
    "Identifies the Muppandal wind farm cluster in Tamil Nadu as India's largest."
)
add_u12(make_question(CHAPTER_U12, "Wind Energy", "Which region in India hosts the country's largest operational onshore wind farm cluster?", opts, c, s))

# Q24: Geothermal Energy pilot plants in India
opts, c, s = rotate_options(
    "Manikaran in Parbati Valley (Himachal Pradesh) and Puga Valley in Ladakh",
    ["Sundarbans in West Bengal and Chilika in Odisha", "Thar desert in Jaisalmer and Rann of Kutch", "Kovalam in Kerala and Marina in Chennai"],
    "D",
    "Geothermal energy in India has been experimentally harnessed at two premier hot-spring geothermal sites: Manikaran in Himachal Pradesh and Puga Valley in Ladakh.\nHence, Option {{CORR}} is correct.",
    "Locates geothermal pilot projects at Manikaran (Himachal Pradesh) and Puga Valley (Ladakh)."
)
add_u12(make_question(CHAPTER_U12, "Geothermal Energy", "Where have experimental pilot projects been initiated in India to harness geothermal energy?", opts, c, s))

# Q25: Tidal Energy potential in India
opts, c, s = rotate_options(
    "Gulf of Kuchchh and Gulf of Khambhat in Gujarat, and the Sundarbans delta in West Bengal",
    ["Dal Lake in Srinagar and Wular Lake in Kashmir", "Ganga river at Varanasi and Yamuna at Delhi", "Chilika lake in Odisha and Pulicat lake in Andhra Pradesh"],
    "A",
    "The Gulf of Kuchchh and Gulf of Khambhat in Gujarat offer ideal oceanic tidal ranges (up to 8-11 meters) for generating tidal energy, alongside tidal creeks in the Sundarbans of West Bengal.\nHence, Option {{CORR}} is correct.",
    "Identifies Gulf of Kuchchh, Gulf of Khambhat, and Sundarbans as prime tidal energy sites."
)
add_u12(make_question(CHAPTER_U12, "Tidal Energy", "Which coastal water bodies provide the highest potential for generating 'Tidal Energy' in India?", opts, c, s))

# Q26: GAIL and HVJ Pipeline
opts, c, s = rotate_options(
    "Hazira (Gujarat) - Vijaipur (MP) - Jagdishpur (UP) cross-country natural gas pipeline (1,750 km)",
    ["Haldia - Varanasi - Jamshedpur crude oil pipeline", "Hyderabad - Vijayawada - Jabalpur water pipeline", "Haridwar - Vrindavan - Jaipur milk pipeline"],
    "B",
    "The Gas Authority of India Limited (GAIL) constructed the iconic 1,750 km Hazira-Vijaipur-Jagdishpur (HVJ) pipeline, transporting natural gas from offshore fields to fertilizer, power, and industrial plants across Gujarat, MP, Rajasthan, and UP.\nHence, Option {{CORR}} is correct.",
    "Identifies the 1,750 km Hazira-Vijaipur-Jagdishpur (HVJ) natural gas pipeline."
)
add_u12(make_question(CHAPTER_U12, "Gas Pipelines", "What is the famous 'HVJ Pipeline' constructed by GAIL to transport natural gas across North-Western India?", opts, c, s))

# Q27: Port-based vs Market-based Oil Refineries
opts, c, s = rotate_options(
    "Port-based refineries process imported crude oil at coastal ports (e.g. Kochi, Mangalore, Jamnagar); Market-based refineries are located in interior consuming centers (e.g. Mathura, Panipat, Barauni)",
    ["Port-based refineries use solar panels, while market-based refineries use coal stoves", "Port-based refineries refine vegetable oil, while market-based refineries refine crude oil", "Both are identical and located exclusively on offshore islands"],
    "C",
    "Coastal port-based refineries (Kochi, Mangalore, Jamnagar, Mumbai, Visakhapatnam) receive crude directly from tankers. Inland market-based refineries (Mathura, Panipat, Barauni, Bhatinda) receive crude via cross-country pipelines and serve inland fuel demand.\nHence, Option {{CORR}} is correct.",
    "Contrasts coastal port-based refineries with inland pipeline-fed market refineries."
)
add_u12(make_question(CHAPTER_U12, "Petroleum Refining", "What is the distinction between 'Port-Based' and 'Market-Based' oil refineries in India?", opts, c, s))

# Q28: World's largest grass-roots petroleum refinery
opts, c, s = rotate_options(
    "Jamnagar Refinery in Gujarat (operated by Reliance Industries)",
    ["Digboi Refinery in Assam", "Barauni Refinery in Bihar", "Mathura Refinery in Uttar Pradesh"],
    "D",
    "The Jamnagar Refinery complex in Gujarat, operated by Reliance Industries, has an aggregate refining capacity of 1.24 million barrels per day, making it the world's largest single-location petroleum refining complex.\nHence, Option {{CORR}} is correct.",
    "Identifies Reliance Jamnagar in Gujarat as the world's largest petroleum refinery."
)
add_u12(make_question(CHAPTER_U12, "Petroleum Refining", "Which oil refinery in India is recognized as the world's largest single-location grass-roots refining complex?", opts, c, s))

# Q29: Match Mineral to Principal Mining District
add_u12(make_match_question(
    CHAPTER_U12, "Mineral Geography",
    "Match List I (Mineral) with List II (Premier Mining District / Location):",
    [("A", "Iron Ore"), ("B", "Manganese"), ("C", "Copper"), ("D", "Bauxite")],
    [("I", "Panchpatmali (Koraput, Odisha)"), ("II", "Malanjkhand (Balaghat, MP)"), ("III", "Bailadila (Dantewada, Chhattisgarh)"), ("IV", "Kendujhar (Odisha)")],
    "A-III, B-IV, C-II, D-I", "A",
    "Iron ore is at Bailadila (III); Manganese is at Kendujhar (IV); Copper is at Malanjkhand (II); Bauxite is at Panchpatmali (I).",
    "Correctly correlates strategic minerals with their hallmark Indian deposits."
))

# Q30: Statement on Gondwana Coal Quality
add_u12(make_statement_question(
    CHAPTER_U12, "Coal Quality",
    "Gondwana coal in India is largely bituminous in rank, with high ash content and low moisture content.",
    "Gondwana coal is completely free of any ash and has zero carbon content.",
    3, "B",
    "Statement I is correct: Indian Gondwana coals are primarily non-coking and semi-coking bituminous coals characterized by high mineral matter/ash content (15-40%). Statement II is absurd.",
    "Characterizes Gondwana coal: bituminous rank with relatively high ash content."
))

# Q31: Assertion-Reason on Conservation of Mineral Resources
add_u12(make_assertion_question(
    CHAPTER_U12, "Mineral Conservation",
    "There is an urgent necessity to conserve mineral resources through recycling, scrap utilization, and substitute materials.",
    "Minerals are finite, non-renewable geological assets that take millions of years to form and cannot be regenerated once exhausted.",
    1, "C",
    "Both Assertion and Reason are true, and Reason correctly explains the Assertion. Non-renewable mineral wealth requires conservation, scrap recycling (e.g. scrap steel in mini-mills), and alternative materials to ensure sustainable development.",
    "Validates the necessity of mineral conservation due to geological exhaustibility."
))

# Q32: Multi-statement on Nuclear Minerals in India
add_u12(make_multi_statement_question(
    CHAPTER_U12, "Nuclear Minerals",
    "Which of the following statements regarding nuclear mineral resources in India are correct?",
    [
        ("A", "Uranium deposits occur in Dharwar crystalline rocks at Jaduguda in Singhbhum, Jharkhand."),
        ("B", "Thorium is derived mainly from monazite beach sands along the coasts of Kerala and Tamil Nadu."),
        ("C", "India possesses the world's largest known reserves of Thorium in its coastal sands."),
        ("D", "Nuclear minerals are extracted exclusively from commercial wheat farmlands in Punjab.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "D",
    "Statements A, B, and C are accurate facts about India's nuclear resources. Statement D is an absurd distractor.",
    "Identifies geographical locations and global significance of India's uranium and thorium reserves."
))

# Q33: Coking Coal Import requirement
opts, c, s = rotate_options(
    "India has vast reserves of iron ore but limited reserves of prime metallurgical coking coal, requiring imports from Australia",
    ["India imports iron ore because it has zero iron deposits", "India has no coal of any kind anywhere in the country", "Indian steel plants use exclusively coconut oil instead of coal"],
    "A",
    "Although India is rich in high-grade iron ore, its reserves of low-ash metallurgical coking coal are limited. Hence, Indian integrated steel plants import millions of tons of premium coking coal annually, primarily from Australia.\nHence, Option {{CORR}} is correct.",
    "Explains India's need to import metallurgical coking coal from Australia."
)
add_u12(make_question(CHAPTER_U12, "Coking Coal Deficit", "Why do integrated steel plants in India import substantial quantities of coking coal from abroad (such as Australia)?", opts, c, s))

# Q34: Khetri Copper Belt
opts, c, s = rotate_options(
    "Jhunjhunu district, Rajasthan (operated by Hindustan Copper Limited)",
    ["Bhopal district, Madhya Pradesh", "Ranchi district, Jharkhand", "Nagpur district, Maharashtra"],
    "B",
    "The Khetri Copper Complex, operated by state-owned Hindustan Copper Limited (HCL), is situated in Jhunjhunu district of Rajasthan along the foothills of the Aravalli range.\nHence, Option {{CORR}} is correct.",
    "Locates the Khetri Copper Complex in Jhunjhunu district, Rajasthan."
)
add_u12(make_question(CHAPTER_U12, "Copper Mining", "In which district of Rajasthan is the renowned 'Khetri Copper Complex' located?", opts, c, s))

# Q35: Zawar Mines: Zinc and Lead
opts, c, s = rotate_options(
    "Udaipur district of Rajasthan (operated by Hindustan Zinc Limited)",
    ["Dhanbad district of Jharkhand", "Korba district of Chhattisgarh", "Kolar district of Karnataka"],
    "C",
    "The Zawar mines in Udaipur district, Rajasthan, are the premier source of zinc and lead in India, containing extensive underground sulfide ore deposits.\nHence, Option {{CORR}} is correct.",
    "Identifies Zawar in Udaipur, Rajasthan, as India's premier zinc and lead mining center."
)
add_u12(make_question(CHAPTER_U12, "Lead and Zinc", "The historic 'Zawar Mines' in Rajasthan are celebrated for the extraction of which non-ferrous metals?", opts, c, s))

# Q36: Korba Coalfield location
opts, c, s = rotate_options(
    "Chhattisgarh (in the Hasdeo river valley)",
    ["West Bengal", "Maharashtra", "Telangana"],
    "D",
    "The Korba coalfield is situated in the Hasdeo River basin in Chhattisgarh, fueling giant thermal power stations and the Bharat Aluminium Company (BALCO) smelter.\nHence, Option {{CORR}} is correct.",
    "Locates the Korba coalfield in the Hasdeo valley of Chhattisgarh."
)
add_u12(make_question(CHAPTER_U12, "Coal Resources", "In which state is the 'Korba Coalfield' situated?", opts, c, s))

# Q37: Talcher Coalfield location
opts, c, s = rotate_options(
    "Odisha (in the Brahmani river valley)",
    ["Jharkhand", "Madhya Pradesh", "Rajasthan"],
    "A",
    "The Talcher coalfield, one of the largest coal reserves in India, is situated in Angul district of Odisha in the Brahmani river basin.\nHence, Option {{CORR}} is correct.",
    "Locates the Talcher coalfield in Angul district, Odisha (Brahmani basin)."
)
add_u12(make_question(CHAPTER_U12, "Coal Resources", "The major coalfield of 'Talcher' is situated in which state and river basin?", opts, c, s))

# Q38: Singrauli Coalfield location
opts, c, s = rotate_options(
    "Madhya Pradesh and Uttar Pradesh (fueling major NTPC pithead thermal plants)",
    ["Gujarat and Rajasthan", "Assam and Meghalaya", "Karnataka and Goa"],
    "B",
    "The Singrauli coalfield spans Sidhi/Singrauli district in Madhya Pradesh and Sonbhadra district in Uttar Pradesh, renowned as the energy capital of India with numerous pithead super thermal power stations.\nHence, Option {{CORR}} is correct.",
    "Locates Singrauli coalfield across Madhya Pradesh and Uttar Pradesh."
)
add_u12(make_question(CHAPTER_U12, "Coal Resources", "Which state boundary is straddled by the prominent 'Singrauli' coal belt?", opts, c, s))

# Q39: Ankleshwar oilfield location
opts, c, s = rotate_options(
    "Bharuch district of Gujarat",
    ["Surat district of Gujarat", "Jamnagar district of Gujarat", "Vadodara district of Gujarat"],
    "C",
    "The Ankleshwar petroleum field is situated in Bharuch district of Gujarat, discovered in 1958 and famously referred to by Jawaharlal Nehru as the 'fountain of prosperity'.\nHence, Option {{CORR}} is correct.",
    "Locates Ankleshwar oilfield in Bharuch district, Gujarat."
)
add_u12(make_question(CHAPTER_U12, "Petroleum Resources", "In which district of Gujarat is the iconic 'Ankleshwar' oilfield located?", opts, c, s))

# Q40: Krishna-Godavari (KG) Basin discoveries
opts, c, s = rotate_options(
    "Massive deep-water offshore natural gas and crude reserves (e.g. KG-D6 block)",
    ["Massive underground coking coal seams", "Surface diamond gravels along river banks", "Perennial glacial ice streams"],
    "D",
    "The Krishna-Godavari (KG) offshore basin in the Bay of Bengal off the coast of Andhra Pradesh has yielded massive deep-water natural gas discoveries, notably the KG-D6 block.\nHence, Option {{CORR}} is correct.",
    "Highlights major deep-water natural gas discoveries in the Krishna-Godavari (KG) offshore basin."
)
add_u12(make_question(CHAPTER_U12, "Natural Gas", "What major hydrocarbon resource was discovered in the deep-water 'Krishna-Godavari (KG) Basin'?", opts, c, s))

# Q41: Kudremukh Iron Ore mine
opts, c, s = rotate_options(
    "Chikmagalur district, Karnataka: horse-faced peak, previously slurry piped to Mangalore Port",
    ["Dantewada district, Chhattisgarh", "Mayurbhanj district, Odisha", "Singhbhum district, Jharkhand"],
    "A",
    "Kudremukh (meaning 'horse face' in Kannada) is an iron ore deposit in Chikmagalur district of Karnataka, where iron ore was formerly pulverized and transported as slurry through a 67 km pipeline to New Mangalore Port.\nHence, Option {{CORR}} is correct.",
    "Identifies Kudremukh in Chikmagalur, Karnataka, and its slurry pipeline to Mangalore."
)
add_u12(make_question(CHAPTER_U12, "Iron Ore", "Where is the famous 'Kudremukh' iron ore deposit located, and how was its ore transported to the coast?", opts, c, s))

# Q42: Ratnagiri Iron Ore deposits
opts, c, s = rotate_options(
    "Maharashtra",
    ["Gujarat", "Andhra Pradesh", "Kerala"],
    "B",
    "In Maharashtra, iron ore deposits occur in Chandrapur, Bhandara, and coastal Ratnagiri districts (Redi mine), exported via Marmagao or local jetties.\nHence, Option {{CORR}} is correct.",
    "Locates Ratnagiri iron ore deposits in Maharashtra."
)
add_u12(make_question(CHAPTER_U12, "Iron Ore", "The 'Ratnagiri' iron ore mining district is situated in which state?", opts, c, s))

# Q43: Balaghat Manganese and Copper
opts, c, s = rotate_options(
    "Madhya Pradesh",
    ["Chhattisgarh", "Jharkhand", "Odisha"],
    "C",
    "Balaghat district in Madhya Pradesh is uniquely endowed with both India's premier copper deposit (Malanjkhand) and major high-grade manganese mines.\nHence, Option {{CORR}} is correct.",
    "Identifies Balaghat district in Madhya Pradesh for copper and manganese."
)
add_u12(make_question(CHAPTER_U12, "Metallic Minerals", "Which state contains the mineral-rich district of 'Balaghat', famous for both copper and manganese extraction?", opts, c, s))

# Q44: Nellore Mica belt
opts, c, s = rotate_options(
    "Andhra Pradesh",
    ["Tamil Nadu", "Karnataka", "Kerala"],
    "D",
    "The Nellore mica belt in Andhra Pradesh is one of India's three primary mica-producing regions, producing high-quality muscovite and phlogopite mica.\nHence, Option {{CORR}} is correct.",
    "Identifies Andhra Pradesh as the location of the Nellore mica belt."
)
add_u12(make_question(CHAPTER_U12, "Non-Metallic Minerals", "In which state is the prominent 'Nellore Mica Belt' situated?", opts, c, s))

# Q45: Tertiary coal in North-East
opts, c, s = rotate_options(
    "Makum and Nazira in Assam, Cherrapunji and Daranggiri in Meghalaya, and Namchik-Namphuk in Arunachal Pradesh",
    ["Raniganj, Jharia, and Bokaro in Damodar valley", "Singrauli and Korba in central plateau", "Neyveli in Tamil Nadu"],
    "A",
    "Tertiary coal deposits occur in the North-Eastern states: Makum, Nazira, and Ledo in Assam; Cherrapunji and Mewlong in Meghalaya; and Namchik-Namphuk in Arunachal Pradesh.\nHence, Option {{CORR}} is correct.",
    "Lists major Tertiary coalfields of the North-East: Makum, Nazira, Cherrapunji, Namchik-Namphuk."
)
add_u12(make_question(CHAPTER_U12, "Tertiary Coal", "Which mining centers represent the 'Tertiary Coal' deposits in North-Eastern India?", opts, c, s))

# Q46: Non-Conventional energy advantage
opts, c, s = rotate_options(
    "Renewable, inexhaustible, environmentally clean, and generates zero greenhouse gas emissions during power generation",
    ["Consumes massive quantities of imported coking coal", "Emits heavy sulfur dioxide smoke and toxic fly ash", "Generates radioactive nuclear waste that lasts 10,000 years"],
    "B",
    "Non-conventional renewable energy resources (solar, wind, biomass, tidal, geothermal) are inexhaustible, decentralized, and provide clean energy without contributing to greenhouse gas emissions or acid rain.\nHence, Option {{CORR}} is correct.",
    "Highlights the renewable, clean, and zero-emission nature of non-conventional energy."
)
add_u12(make_question(CHAPTER_U12, "Renewable Energy", "What is the primary ecological advantage of 'Non-Conventional Energy Resources' (such as solar and wind)?", opts, c, s))

# Q47: Match Energy Types with Sites
add_u12(make_match_question(
    CHAPTER_U12, "Non-Conventional Energy",
    "Match List I (Non-Conventional Energy Source) with List II (Prominent Indian Site):",
    [("A", "Solar Energy"), ("B", "Wind Energy"), ("C", "Geothermal Energy"), ("D", "Tidal Energy")],
    [("I", "Muppandal (Tamil Nadu)"), ("II", "Bhadla (Rajasthan)"), ("III", "Gulf of Kuchchh (Gujarat)"), ("IV", "Manikaran (Himachal Pradesh)")],
    "A-II, B-I, C-IV, D-III", "C",
    "Solar is at Bhadla (II); Wind is at Muppandal (I); Geothermal is at Manikaran (IV); Tidal is in Gulf of Kuchchh (III).",
    "Matches non-conventional energy sources to their prime Indian operational sites."
))

# Q48: Statement on Petroleum Formation
add_u12(make_statement_question(
    CHAPTER_U12, "Hydrocarbon Geology",
    "Petroleum occurs in sedimentary rocks of marine origin, trapped in anticlines and fault traps of Tertiary age.",
    "Crude petroleum is found exclusively in igneous granite rocks of volcanic origin.",
    3, "D",
    "Statement I is correct: crude petroleum and natural gas are organic hydrocarbons formed in sedimentary basins and trapped under anticlines. Statement II is false: igneous rocks cannot harbor petroleum.",
    "Explains that petroleum occurs in sedimentary anticlinal and fault traps of marine origin."
))

# Q49: Assertion-Reason on Aluminum as Lightweight Metal
add_u12(make_assertion_question(
    CHAPTER_U12, "Bauxite and Aluminum",
    "Aluminum is widely used as a substitute for steel, copper, and zinc in aerospace, electrical, and transport industries.",
    "Aluminum combines high electrical conductivity and tensile strength with exceptional lightness and corrosion resistance.",
    1, "A",
    "Both Assertion and Reason are true, and Reason correctly explains the Assertion. Aluminum extracted from bauxite is light, malleable, rust-resistant, and an excellent conductor, making it invaluable for aircraft, power cables, and vehicles.",
    "Explains aluminum's versatility as an industrial substitute metal."
))

# Q50: Multi-statement on Mineral Conservation
add_u12(make_multi_statement_question(
    CHAPTER_U12, "Resource Stewardship",
    "Which of the following measures are recommended for the conservation of mineral resources in India?",
    [
        ("A", "Promoting scrap metal recycling and secondary metallurgy."),
        ("B", "Developing renewable substitutes for scarce minerals (like plastics and ceramics)."),
        ("C", "Adopting advanced low-waste mining technologies to utilize low-grade ores."),
        ("D", "Mandating the destruction and dumping of all mined ore into deep river canyons.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C are authentic conservation strategies. Statement D is an absurd distractor.",
    "Identifies valid strategies for mineral conservation and sustainable resource management."
))

# Q51: Magnetite vs Hematite
opts, c, s = rotate_options(
    "Magnetite is the finest iron ore with up to 70% iron content and magnetic properties; Hematite has 60-70% iron content and is the most important industrial ore in quantity",
    ["Magnetite is liquid petroleum, while hematite is coal", "Magnetite has 5% iron, while hematite has 99% copper", "Both are identical and contain zero iron"],
    "C",
    "Magnetite (Fe3O4) contains over 70% metallic iron and has excellent magnetic qualities (used in electrical industries). Hematite (Fe2O3) contains 60-70% iron and is the most widely mined industrial iron ore in India.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Magnetite (70% iron, magnetic) from Hematite (60-70% iron, main industrial ore)."
)
add_u12(make_question(CHAPTER_U12, "Iron Ore Types", "What is the difference between 'Magnetite' and 'Hematite' iron ores?", opts, c, s))

# Q52: Limonite and Siderite
opts, c, s = rotate_options(
    "Lower-grade iron ores containing between 40% to 50% metallic iron content and higher impurities",
    ["Precious gemstones used for royal jewelry", "Nuclear isotopes used in atomic warheads", "Synthetic plastics manufactured from petroleum"],
    "D",
    "Limonite (yellowish/brown, ~40-60% iron) and Siderite (carbonate ore, ~40% iron) are inferior grades of iron ore with lower metallic yield and higher impurities.\nHence, Option {{CORR}} is correct.",
    "Identifies Limonite and Siderite as lower-grade iron ores."
)
add_u12(make_question(CHAPTER_U12, "Iron Ore Types", "What grade of mineral resource do 'Limonite' and 'Siderite' represent?", opts, c, s))

# Q53: Jaduguda Uranium mine location
opts, c, s = rotate_options(
    "East Singhbhum district of Jharkhand (operated by Uranium Corporation of India Limited)",
    ["Bikaner district of Rajasthan", "Cuddalore district of Tamil Nadu", "Raipur district of Chhattisgarh"],
    "A",
    "Jaduguda in the Singhbhum copper-uranium belt of Jharkhand was India's first operational underground uranium mine, commissioned in 1967 and managed by the UCIL.\nHence, Option {{CORR}} is correct.",
    "Locates the Jaduguda uranium mine in East Singhbhum, Jharkhand."
)
add_u12(make_question(CHAPTER_U12, "Nuclear Minerals", "Where is India's historic 'Jaduguda' underground uranium mine situated?", opts, c, s))

# Q54: Tummalapalle Uranium deposit
opts, c, s = rotate_options(
    "Kadapa (YSR) district of Andhra Pradesh, confirmed as one of the world's largest uranium reserves",
    ["Kolar district of Karnataka", "Kutch district of Gujarat", "Alwar district of Rajasthan"],
    "B",
    "Tummalapalle in Kadapa district of Andhra Pradesh hosts immense strata-bound uranium deposits in carbonate rocks, confirmed by the Atomic Minerals Directorate (AMD) as one of the largest uranium reserves globally.\nHence, Option {{CORR}} is correct.",
    "Identifies Tummalapalle in Kadapa district, Andhra Pradesh, as a massive uranium reserve."
)
add_u12(make_question(CHAPTER_U12, "Nuclear Minerals", "In which district of Andhra Pradesh was the massive 'Tummalapalle' uranium reserve discovered?", opts, c, s))

# Q55: Coal-Bed Methane (CBM)
opts, c, s = rotate_options(
    "Natural gas adsorbed within coal seams, extracted as an unconventional clean energy source from Gondwana coalfields",
    ["Toxic smoke released during coal combustion in blast furnaces", "A liquid chemical fertilizer sprayed on tea bushes", "A radioactive gas emitted by uranium mines"],
    "C",
    "Coal-Bed Methane (CBM) is an unconventional form of natural gas found trapped within deep coal seams, successfully explored and produced in Raniganj and Jharia.\nHence, Option {{CORR}} is correct.",
    "Defines Coal-Bed Methane (CBM) as natural gas adsorbed within underground coal seams."
)
add_u12(make_question(CHAPTER_U12, "Unconventional Hydrocarbons", "What is 'Coal-Bed Methane' (CBM) in energy exploration?", opts, c, s))

# Q56: Barmer Basin petroleum discoveries
opts, c, s = rotate_options(
    "Major onshore oilfields (Mangala, Bhagyam, and Aishwarya) in Rajasthan",
    ["Offshore marine gas fields in the Bay of Bengal", "Underground coal mining tunnels in West Bengal", "Bauxite processing plants in Odisha"],
    "D",
    "The Barmer Basin in western Rajasthan has emerged as a major onshore petroleum producing province, with commercial fields including Mangala, Bhagyam, and Aishwarya (operated by Cairn/Vedanta).\nHence, Option {{CORR}} is correct.",
    "Identifies Mangala, Bhagyam, and Aishwarya oilfields in the Barmer Basin of Rajasthan."
)
add_u12(make_question(CHAPTER_U12, "Petroleum Discoveries", "The Mangala, Bhagyam, and Aishwarya onshore oil discoveries are situated in which sedimentary basin?", opts, c, s))

# Q57: National Solar Mission
opts, c, s = rotate_options(
    "Jawaharlal Nehru National Solar Mission (JNNSM), launched under the National Action Plan on Climate Change (NAPCC)",
    ["A scheme to build glass mirrors across all railway tracks", "A project to import solar panels exclusively from Antarctica", "A law requiring citizens to paint all house roofs black"],
    "A",
    "The Jawaharlal Nehru National Solar Mission (JNNSM) was launched in 2010 as a major initiative under the National Action Plan on Climate Change (NAPCC) to establish India as a global solar leader.\nHence, Option {{CORR}} is correct.",
    "Identifies the National Solar Mission launched under the NAPCC in 2010."
)
add_u12(make_question(CHAPTER_U12, "Solar Policies", "Under which national policy framework was the 'National Solar Mission' launched in 2010?", opts, c, s))

# Q58: Bio-energy generation methods
opts, c, s = rotate_options(
    "Biological conversion of organic agricultural waste, urban municipal refuse, and animal dung into clean bio-gas and electricity",
    ["Extracting electricity by crushing granite rocks in mills", "Burning synthetic plastic bottles in open street bonfires", "Freezing river water into industrial ice slabs"],
    "B",
    "Bio-energy is derived from biological wastes (agricultural crop residues, bagasse, animal dung, municipal garbage), converted via anaerobic digestion into methane-rich biogas for cooking and decentralized power generation.\nHence, Option {{CORR}} is correct.",
    "Describes bio-energy conversion from agricultural and municipal organic wastes."
)
add_u12(make_question(CHAPTER_U12, "Bio-Energy", "How is 'Bio-Energy' generated from organic waste in rural and urban India?", opts, c, s))

# Q59: Sequence of Oil Discoveries in India
add_u12(make_sequence_question(
    CHAPTER_U12, "Petroleum Chronology",
    "Arrange the following landmark petroleum discoveries in India in chronological order:",
    [("A", "Discovery of Mumbai High offshore field"), ("B", "First commercial drilling at Digboi in Assam"), ("C", "Discovery of Ankleshwar oilfield in Gujarat"), ("D", "Discovery of deep-water gas in Krishna-Godavari (KG) basin")],
    "B, C, A, D", "B",
    "1. Digboi discovered in 1889 (B).\n2. Ankleshwar discovered in 1958 (C).\n3. Mumbai High discovered in 1973 (A).\n4. Deep-water KG Basin gas discovered in the early 2000s (D).",
    "Sequences India's major petroleum discoveries chronologically."
))

# Q60: Open Acreage Licensing Policy (OALP)
opts, c, s = rotate_options(
    "Allows exploration companies to carve out hydrocarbon blocks of their choice using national data repository data, with revenue-sharing contracts",
    ["Bans all private companies from searching for oil", "Transfers all oil refineries to foreign embassies", "Permits only manual hand-digging of petroleum wells"],
    "C",
    "The Open Acreage Licensing Policy (OALP), part of the Hydrocarbon Exploration and Licensing Policy (HELP), enables companies to select blocks of their choice year-round with single exploration-cum-production licenses and revenue sharing.\nHence, Option {{CORR}} is correct.",
    "Explains the Open Acreage Licensing Policy (OALP) for hydrocarbon exploration."
)
add_u12(make_question(CHAPTER_U12, "Energy Policy", "What is the primary reform introduced by the 'Open Acreage Licensing Policy' (OALP) in India's hydrocarbon exploration sector?", opts, c, s))

validate_and_collect(u12_qs, u12_seen)
assert len(u12_qs) == 60
with open("mock/geo_units/unit12.json", "w", encoding="utf-8") as f:
    json.dump(u12_qs, f, indent=2, ensure_ascii=False)
print("Unit 12 generated: 60 questions")

# =================================================================================================
# UNIT 13: India: Manufacturing Industries & Sustainable Development Planning (60 Questions)
# =================================================================================================
CHAPTER_U13 = "India: Manufacturing Industries and Planning for Sustainable Development"
u13_qs = []
u13_seen = set()

def add_u13(q):
    u13_qs.append(q)

# Q1: TISCO Jamshedpur founding
opts, c, s = rotate_options(
    "Founded in 1907 by Jamshedji Tata at Sakchi (Jamshedpur) at the confluence of Subarnarekha and Kharkai rivers",
    ["Founded in 1950 by the Government of India in New Delhi", "Founded in 1854 by British merchants in Mumbai", "Founded in 1971 by SAIL in Bokaro"],
    "A",
    "The Tata Iron and Steel Company (TISCO) was established in 1907 by Jamshedji Tata at Sakchi (renamed Jamshedpur) in Singhbhum district of Jharkhand, situated strategically at the confluence of the Subarnarekha and Kharkai rivers.\nHence, Option {{CORR}} is correct.",
    "Identifies TISCO founded in 1907 by Jamshedji Tata at Jamshedpur (Subarnarekha and Kharkai)."
)
add_u13(make_question(CHAPTER_U13, "Iron and Steel Industry", "When and where was the historic 'Tata Iron and Steel Company' (TISCO) established?", opts, c, s))

# Q2: TISCO raw material sources
opts, c, s = rotate_options(
    "Iron ore from Noamundi and Badampahar, coking coal from Jharia and Bokaro, and limestone from Birmitrapur",
    ["Iron ore imported from Australia, coal from South Africa, limestone from England", "Iron ore from Kolar, coal from Neyveli, limestone from Salem", "Iron ore from Bailadila, coal from Korba, limestone from Katni"],
    "B",
    "TISCO obtains iron ore from Noamundi (Jharkhand) and Badampahar (Odisha), coking coal from Jharia and Bokaro coalfields, manganese from Joda, and limestone/dolomite from Birmitrapur (Odisha).\nHence, Option {{CORR}} is correct.",
    "Lists TISCO raw material linkages: Noamundi/Badampahar ore, Jharia coal, Birmitrapur limestone."
)
add_u13(make_question(CHAPTER_U13, "Iron and Steel Industry", "From which sources does TISCO at Jamshedpur procure its iron ore, coking coal, and limestone?", opts, c, s))

# Q3: IISCO plants
opts, c, s = rotate_options(
    "Kulti, Hirapur, and Burnpur along the Damodar River in West Bengal",
    ["Jamshedpur, Bokaro, and Ranchi in Jharkhand", "Rourkela, Talcher, and Paradip in Odisha", "Bhilai, Durg, and Raipur in Chhattisgarh"],
    "C",
    "The Indian Iron and Steel Company (IISCO) set up its iron and steel plants at Kulti (1870/1874), Hirapur, and Burnpur in West Bengal along the Damodar river valley coalfields.\nHence, Option {{CORR}} is correct.",
    "Identifies Kulti, Hirapur, and Burnpur as the constituent plants of IISCO."
)
add_u13(make_question(CHAPTER_U13, "Iron and Steel Industry", "Which three industrial units constitute the historic 'Indian Iron and Steel Company' (IISCO)?", opts, c, s))

# Q4: VISL Bhadravati energy source
opts, c, s = rotate_options(
    "Initially used charcoal from local forests because coking coal was unavailable; later switched to hydroelectric power from the Sharavati project",
    ["Imported petroleum from Saudi Arabia by tanker", "Nuclear energy from a dedicated atomic reactor", "Solar panels installed across the Western Ghats"],
    "D",
    "Visvesvaraya Iron and Steel Ltd (VISL) at Bhadravati in Karnataka initially used charcoal from surrounding forests for smelting because coal was absent in southern India. Later, it switched to electric furnaces using Sharavati hydropower.\nHence, Option {{CORR}} is correct.",
    "Explains VISL's historic use of forest charcoal and subsequent switch to Sharavati hydropower."
)
add_u13(make_question(CHAPTER_U13, "Iron and Steel Industry", "How did Visvesvaraya Iron and Steel Ltd (VISL) at Bhadravati historically overcome the complete absence of local coking coal?", opts, c, s))

# Q5: Bhilai Steel Plant collaboration and location
opts, c, s = rotate_options(
    "Established in 1959 in Durg district of Chhattisgarh with collaboration from the USSR (Soviet Union)",
    ["Established in 1959 with collaboration from West Germany in Odisha", "Established in 1962 with collaboration from the United Kingdom in West Bengal", "Established in 1907 by private American investors in Mumbai"],
    "A",
    "The Bhilai Steel Plant in Durg district of Chhattisgarh was established during the Second Five Year Plan in collaboration with the Soviet Union (USSR), commencing production in 1959.\nHence, Option {{CORR}} is correct.",
    "Identifies Bhilai Steel Plant (1959, Durg, Chhattisgarh) built with Soviet collaboration."
)
add_u13(make_question(CHAPTER_U13, "Public Sector Steel", "In which state and with which foreign country's collaboration was the 'Bhilai Steel Plant' established?", opts, c, s))

# Q6: Rourkela Steel Plant collaboration
opts, c, s = rotate_options(
    "Sundargarh district of Odisha, established in 1959 in collaboration with West Germany (Krupp and Demag)",
    ["Durg district of Chhattisgarh with USSR", "Bardhaman district of West Bengal with UK", "Salem district of Tamil Nadu with Japan"],
    "B",
    "The Rourkela Steel Plant was set up in Sundargarh district of Odisha during the Second Plan (1959) in collaboration with a West German consortium of Krupp and Demag.\nHence, Option {{CORR}} is correct.",
    "Identifies Rourkela Steel Plant (1959, Odisha) built with West German collaboration."
)
add_u13(make_question(CHAPTER_U13, "Public Sector Steel", "The 'Rourkela Steel Plant' was established with foreign collaboration from which country?", opts, c, s))

# Q7: Durgapur Steel Plant collaboration
opts, c, s = rotate_options(
    "Bardhaman district of West Bengal, established in 1962 in collaboration with the Government of the United Kingdom (UK)",
    ["Chhattisgarh with collaboration from France", "Odisha with collaboration from the USA", "Karnataka with collaboration from Sweden"],
    "C",
    "The Durgapur Steel Plant in West Bengal was set up during the Second Five Year Plan in collaboration with the British Government, operationalized in 1962.\nHence, Option {{CORR}} is correct.",
    "Identifies Durgapur Steel Plant (1962, West Bengal) built with British collaboration."
)
add_u13(make_question(CHAPTER_U13, "Public Sector Steel", "Which country partnered with India to establish the 'Durgapur Steel Plant' in West Bengal?", opts, c, s))

# Q8: Bokaro Steel Plant
opts, c, s = rotate_options(
    "Set up in 1964 in Jharkhand with Soviet collaboration, planned on the principle of transportation cost minimization using empty wagons returning from Rourkela",
    ["Set up in 1850 by British textile merchants", "Set up in 1991 by Japanese automobile companies", "Built on a floating barge in the Bay of Bengal"],
    "D",
    "Bokaro Steel Plant in Jharkhand was established in 1964 under the Third Plan with USSR assistance. It was planned to minimize transport costs: it sends coal to Rourkela and uses the returning empty rail wagons to bring back iron ore.\nHence, Option {{CORR}} is correct.",
    "Explains Bokaro's 1964 Soviet setup and transport minimization principle with Rourkela."
)
add_u13(make_question(CHAPTER_U13, "Public Sector Steel", "What unique logistical transport principle was implemented in the design of the 'Bokaro Steel Plant' (1964)?", opts, c, s))

# Q9: Visakhapatnam Steel Plant: Coastal location
opts, c, s = rotate_options(
    "India's first shore-based integrated steel plant, with deep-water port access for imported coking coal and export of finished steel",
    ["An inland plant located in the high Himalayas", "A mini steel mill operating inside a residential apartment", "A scrap-iron foundry operating on the Thar desert border"],
    "A",
    "Visakhapatnam Steel Plant (Rashtriya Ispat Nigam Ltd - RINL) in Andhra Pradesh is India's first shore-based integrated steel plant, taking advantage of port access for importing metallurgical coal and exporting steel products.\nHence, Option {{CORR}} is correct.",
    "Identifies Visakhapatnam Steel Plant as India's premier shore-based integrated steel plant."
)
add_u13(make_question(CHAPTER_U13, "Shore-Based Steel", "What is the strategic geographical uniqueness of the 'Visakhapatnam Steel Plant' (RINL)?", opts, c, s))

# Q10: First modern cotton textile mill in India
opts, c, s = rotate_options(
    "First mill attempted at Fort Gloster near Kolkata in 1818 (which failed); first successful modern mill established in Mumbai in 1854 by KGN Daber",
    ["First mill built in New Delhi in 1947", "First mill established in Chennai in 1900", "First mill built in Ahmedabad in 1750"],
    "B",
    "The first cotton textile mill was established at Fort Gloster near Kolkata in 1818, but it was unsuccessful. The first successful modern cotton mill was established in Mumbai in 1854 by Cowasjee Nanabhoy Daber (Bombay Spinning & Weaving Co).\nHence, Option {{CORR}} is correct.",
    "Differentiates 1818 Fort Gloster attempt from 1854 successful mill in Mumbai by KGN Daber."
)
add_u13(make_question(CHAPTER_U13, "Cotton Textile History", "Where and in which years were the first attempted cotton mill and the first successful modern cotton textile mill set up in India?", opts, c, s))

# Q11: Why Mumbai became the Cottonopolis
opts, c, s = rotate_options(
    "Proximity to black cotton soil hinterland, humid maritime climate preventing yarn snapping, port for importing machinery and exporting yarn, and capital",
    ["High mountain cold blizzards that bleached the cotton white", "Mandatory decree by the Mughal emperors banning all other industries", "Presence of rich gold mines in Bombay harbor"],
    "C",
    "Mumbai emerged as India's 'Cottonopolis' due to: (1) Proximity to black cotton soils of Gujarat and Maharashtra, (2) Humid coastal climate preventing yarn breakage during spinning, (3) World-class port for machinery imports, and (4) Rich Parsi/Bhatia commercial capital.\nHence, Option {{CORR}} is correct.",
    "Lists factors that made Mumbai the 'Cottonopolis': raw cotton proximity, humid climate, port, capital."
)
add_u13(make_question(CHAPTER_U13, "Cotton Textile Industry", "What combination of geographical and commercial advantages established Mumbai as the 'Cottonopolis' of India?", opts, c, s))

# Q12: Manchester of India: Ahmedabad
opts, c, s = rotate_options(
    "Ahmedabad (Gujarat)",
    ["Kolkata (West Bengal)", "Surat (Gujarat)", "Ludhiana (Punjab)"],
    "D",
    "Ahmedabad is historically celebrated as the 'Manchester of India' due to its vast concentration of modern cotton textile mills, located directly inside the Gujarat cotton bowl.\nHence, Option {{CORR}} is correct.",
    "Identifies Ahmedabad as the 'Manchester of India'."
)
add_u13(make_question(CHAPTER_U13, "Cotton Textile Industry", "Which city in western India earned the moniker 'Manchester of India'?", opts, c, s))

# Q13: Manchester of South India: Coimbatore
opts, c, s = rotate_options(
    "Coimbatore (Tamil Nadu)",
    ["Madurai (Tamil Nadu)", "Bengaluru (Karnataka)", "Kochi (Kerala)"],
    "A",
    "Coimbatore in Tamil Nadu is known as the 'Manchester of South India' because of its extensive clustering of cotton spinning and weaving mills powered by Pykara hydroelectricity.\nHence, Option {{CORR}} is correct.",
    "Identifies Coimbatore as the 'Manchester of South India'."
)
add_u13(make_question(CHAPTER_U13, "Cotton Textile Industry", "Which city is famously celebrated as the 'Manchester of South India'?", opts, c, s))

# Q14: Sugar Industry: Cooperative sector dominance
opts, c, s = rotate_options(
    "Maharashtra, where sugarcane farmers own and operate cooperative sugar mills, eliminating exploitation by private millers",
    ["Punjab, where mills are run by the military", "Assam, where mills are owned by tea corporations", "Kerala, where mills are run by fishermen"],
    "B",
    "In Maharashtra, the sugar industry is overwhelmingly organized on a cooperative basis, where cane growers are cooperative shareholders, allowing seamless harvesting, transport coordination, and shared profits.\nHence, Option {{CORR}} is correct.",
    "Highlights Maharashtra's cooperative sugar mill model owned by cane farmers."
)
add_u13(make_question(CHAPTER_U13, "Sugar Industry", "In which major sugar-producing state is the industry predominantly organized and operated in the 'Cooperative Sector'?", opts, c, s))

# Q15: Petrochemicals: NOCIL and IPCL
opts, c, s = rotate_options(
    "NOCIL was established in 1961 as the first private petrochemical firm; IPCL was established in 1969 in the public sector at Vadodara",
    ["NOCIL was a British railway company, while IPCL was an airline", "Both were established in 1850 to mine coal in Bengal", "Both manufacture cotton sarees in Coimbatore"],
    "C",
    "National Organic Chemical Industries Limited (NOCIL) was established in 1961 as India's first private petrochemical company near Mumbai. Indian Petrochemicals Corporation Limited (IPCL) was set up in 1969 as a public sector giant at Vadodara.\nHence, Option {{CORR}} is correct.",
    "Identifies NOCIL (1961) and IPCL (1969, Vadodara) as pioneers of Indian petrochemicals."
)
add_u13(make_question(CHAPTER_U13, "Petrochemical Industry", "Which two pioneer enterprises laid the foundation for the petrochemical industry in India in the 1960s?", opts, c, s))

# Q16: Petrochemical complexes in Gujarat
opts, c, s = rotate_options(
    "Hazira, Gandhar, Vadodara, and Dahej",
    ["Jharia, Bokaro, and Dhanbad", "Bhadravati, Hospet, and Bellary", "Digboi, Naharkatiya, and Moran"],
    "D",
    "Gujarat is the premier petrochemical hub of India, hosting massive cracker and polymer complexes at Hazira, Gandhar, Vadodara, Dahej, and Jamnagar, fed by oil/gas from the Cambay basin and imports.\nHence, Option {{CORR}} is correct.",
    "Lists major petrochemical complexes in Gujarat: Hazira, Gandhar, Vadodara, Dahej."
)
add_u13(make_question(CHAPTER_U13, "Petrochemical Industry", "Which industrial nodes form the backbone of the petrochemical industry in the state of Gujarat?", opts, c, s))

# Q17: Bengaluru: Silicon Valley of India
opts, c, s = rotate_options(
    "Capital of Karnataka, hub of high-tech software, IT services, aerospace (HAL), electronics (ISRO, BEL), and biotechnology",
    ["The premier coal mining pit in southern India", "The leading center for deep-sea pearl diving", "An exclusive desert oasis for camel herders"],
    "A",
    "Bengaluru is known as the 'Silicon Valley of India' due to its pleasant year-round climate, world-class scientific institutes (IISc), defense aerospace hubs (HAL, ISRO), and thousands of multinational software development firms.\nHence, Option {{CORR}} is correct.",
    "Explains why Bengaluru is celebrated as the 'Silicon Valley of India'."
)
add_u13(make_question(CHAPTER_U13, "Information Technology", "Why has Bengaluru earned the prestigious title of 'Silicon Valley of India'?", opts, c, s))

# Q18: 8 Major Industrial Regions of India
opts, c, s = rotate_options(
    "Mumbai-Pune, Hugli, Bengaluru-Chennai, Gujarat, Chotanagpur, Vishakhapatnam-Guntur, Gurgaon-Delhi-Meerut, and Kollam-Thiruvananthapuram",
    ["Kashmir valley, Ladakh, Spiti, Kumaon, Garhwal, Sikkim, Bhutan, and Arunachal", "Thar desert, Rann of Kutch, Bikaner, Jaisalmer, Barmer, Jodhpur, Nagaur, and Churu", "Sundarbans, Andaman, Nicobar, Lakshadweep, Minicoy, Daman, Diu, and Goa"],
    "B",
    "India has 8 major industrial regions: (1) Mumbai-Pune, (2) Hugli, (3) Bengaluru-Chennai, (4) Gujarat, (5) Chotanagpur, (6) Vishakhapatnam-Guntur, (7) Gurgaon-Delhi-Meerut, and (8) Kollam-Thiruvananthapuram.\nHence, Option {{CORR}} is correct.",
    "Lists the 8 major industrial regions of India identified in NCERT."
)
add_u13(make_question(CHAPTER_U13, "Industrial Regions", "Which of the following represents the complete set of the 'Eight Major Industrial Regions' of India recognized in geography?", opts, c, s))

# Q19: Hugli Industrial Region features
opts, c, s = rotate_options(
    "Extends along the Hugli river from Bansberia to Birlanagar; historical center of jute, tea export, engineering, and chemicals supported by Kolkata port and cheap labor",
    ["An isolated electronics park located on the peak of Kanchenjunga", "A desert petroleum zone operating with zero river water", "A diamond mining district operating in the Deccan traps"],
    "C",
    "The Hugli industrial region stretches along the Hugli River for about 100 km from Bansberia in the north to Birlanagar in the south, supported by Kolkata port, the historic jute belt, tea from Assam/Darjeeling, and labor from Bihar/Odisha.\nHence, Option {{CORR}} is correct.",
    "Describes the Hugli industrial corridor extending along the river from Bansberia to Birlanagar."
)
add_u13(make_question(CHAPTER_U13, "Industrial Regions", "What are the geographical extent and economic pillars of the 'Hugli Industrial Region' in West Bengal?", opts, c, s))

# Q20: Chotanagpur Industrial Region nickname
opts, c, s = rotate_options(
    "The 'Ruhr of India', due to its immense concentration of heavy metallurgy, coalfields, iron and steel plants, and heavy engineering",
    ["The 'Breadbasket of India', due to perennial wheat farming", "The 'Fruit Bowl of India', due to apple orchards", "The 'Silicon Valley of India', due to software startups"],
    "D",
    "The Chotanagpur industrial region (spanning Jharkhand, northern Odisha, and western WB) is popularly hailed as the 'Ruhr of India' because of its heavy coal mining, blast furnaces, and heavy machinery works.\nHence, Option {{CORR}} is correct.",
    "Identifies Chotanagpur as the 'Ruhr of India' for heavy coal and metallurgy."
)
add_u13(make_question(CHAPTER_U13, "Industrial Regions", "Why is the Chotanagpur industrial region frequently referred to as the 'Ruhr of India'?", opts, c, s))

# Q21: Gurgaon-Delhi-Meerut Industrial Region
opts, c, s = rotate_options(
    "Fast-growing market-oriented region specializing in automobiles (Maruti Suzuki), electronics, textiles, pharmaceuticals, and software",
    ["Traditional heavy steel blast furnaces located on coal mines", "Deep-sea whaling and tuna processing harbors", "Nomadic carpet weaving tents operating in high alpine meadows"],
    "A",
    "The Gurgaon-Delhi-Meerut region is a dynamic, market-driven industrial cluster located away from mineral belts, specializing in electronics, automobiles (Gurugram/Manesar auto cluster), textiles, engineering, and IT services.\nHence, Option {{CORR}} is correct.",
    "Characterizes the market-oriented Gurgaon-Delhi-Meerut industrial cluster (automobiles, electronics)."
)
add_u13(make_question(CHAPTER_U13, "Industrial Regions", "What distinguishes the 'Gurgaon-Delhi-Meerut Industrial Region' from mineral-based industrial belts?", opts, c, s))

# Q22: Target Area Planning vs Target Group Planning
opts, c, s = rotate_options(
    "Target Area Planning focuses on developing backward geographical regions (e.g. Hill Area, Drought Prone Area); Target Group Planning focuses on uplifting specific vulnerable social groups (e.g. Small Farmers, Tribal Development)",
    ["Target Area focuses on building airports, while Target Group focuses on buying airplanes", "Target Area is run by private companies, while Target Group is run by banks", "Both terms are identical and mean urban real estate zoning"],
    "B",
    "Target Area Planning designs special programs to develop economically backward regions (like Hill Area Development Programme, Drought Prone Area Programme). Target Group Planning focuses on socially disadvantaged cohorts (Small Farmers Development Agency - SFDA, Marginal Farmers and Agricultural Labourers - MFAL).\nHence, Option {{CORR}} is correct.",
    "Distinguishes Target Area Planning (spatial focus) from Target Group Planning (social cohort focus)."
)
add_u13(make_question(CHAPTER_U13, "Planning Strategies", "In Indian regional planning, what is the conceptual difference between 'Target Area Planning' and 'Target Group Planning'?", opts, c, s))

# Q23: Hill Area Development Programme (HADP)
opts, c, s = rotate_options(
    "Initiated during the Fifth Five Year Plan covering 15 backward hill districts in Uttar Pradesh (now Uttarakhand), Assam, West Bengal, and Tamil Nadu",
    ["Initiated during the First Five Year Plan for desert oases in Rajasthan", "Launched in 2020 for coastal mangrove swamps in Gujarat", "Designed exclusively for island ports in the Indian Ocean"],
    "C",
    "The Hill Area Development Programme (HADP) was initiated in the Fifth Five Year Plan, covering 15 hill districts across Uttar Pradesh (now Uttarakhand hills), Mikir and North Cachar hills of Assam, Darjeeling (WB), and Nilgiris (Tamil Nadu).\nHence, Option {{CORR}} is correct.",
    "Identifies HADP initiated in the 5th Plan covering 15 hill districts."
)
add_u13(make_question(CHAPTER_U13, "Target Area Planning", "During which Five Year Plan was the 'Hill Area Development Programme' (HADP) initiated, and which regions did it cover?", opts, c, s))

# Q24: Drought Prone Area Programme (DPAP)
opts, c, s = rotate_options(
    "Fifth Five Year Plan, focusing on restoration of ecological balance, soil and moisture conservation, afforestation, and drought-hardy crop development",
    ["First Plan, building giant amusement parks in cities", "Third Plan, building naval warship docks in Punjab", "Ninth Plan, draining all groundwater aquifers"],
    "D",
    "Initiated during the Fifth Plan, the Drought Prone Area Programme (DPAP) shifted emphasis from mere civil works employment to integrated ecological restoration, watershed management, afforestation, pasture development, and livestock improvement in water-stressed arid districts.\nHence, Option {{CORR}} is correct.",
    "Describes DPAP in the 5th Plan focusing on ecological restoration and watershed development."
)
add_u13(make_question(CHAPTER_U13, "Target Area Planning", "What core strategy was adopted under the 'Drought Prone Area Programme' (DPAP) during the Fifth Five Year Plan?", opts, c, s))

# Q25: Bharmaur Tribal Region: ITDP Case Study
opts, c, s = rotate_options(
    "Chamba district of Himachal Pradesh, inhabited by the 'Gaddi' tribal community who practice transhumance",
    ["Bastar district of Chhattisgarh, inhabited by the Gond tribe", "Mayurbhanj district of Odisha, inhabited by the Santhal tribe", "Leh district of Ladakh, inhabited by the Changpa tribe"],
    "A",
    "B規範aur tribal region lies in Chamba district of Himachal Pradesh, inhabited by the Gaddi tribal agro-pastoral community who speak the Gaddiali dialect and practice seasonal transhumance between mountain pastures and low valleys.\nHence, Option {{CORR}} is correct.",
    "Identifies Bharmaur in Chamba district, HP, inhabited by the Gaddi tribe practicing transhumance."
)
add_u13(make_question(CHAPTER_U13, "Case Study: Bharmaur ITDP", "The 'Integrated Tribal Development Project' (ITDP) in Bharmaur was implemented for which indigenous community and in which district?", opts, c, s))

# Q26: Bharmaur ITDP Achievements
opts, c, s = rotate_options(
    "Dramatic leap in female literacy from 1.88% in 1971 to 65% in 2011, piped drinking water, electricity, healthcare clinics, and school networks",
    ["Building a 10-lane highway with heavy automobile traffic", "Establishment of ten heavy iron and steel blast furnaces", "Conversion of all tribal alpine pastures into open-cast coal mines"],
    "B",
    "The implementation of ITDP in Bharmaur achieved transformative socio-economic gains: female literacy skyrocketed from an abysmal 1.88% in 1971 to 65% in 2011, sex ratio improved, and modern healthcare and schools were established across remote villages.\nHence, Option {{CORR}} is correct.",
    "Highlights Bharmaur ITDP success: female literacy jumping from 1.88% to 65%, schools, and healthcare."
)
add_u13(make_question(CHAPTER_U13, "Case Study: Bharmaur ITDP", "What was the most remarkable socio-developmental achievement of the Integrated Tribal Development Project in Bharmaur?", opts, c, s))

# Q27: Indira Gandhi Canal: Conceived and Launched
opts, c, s = rotate_options(
    "Conceived by engineer Kanwar Sain in 1948; project officially launched on 31 March 1958",
    ["Conceived by Lord Curzon in 1905; launched in 1914", "Conceived by Akbar in 1580; launched in 1857", "Conceived by the World Bank in 1991; launched in 2005"],
    "C",
    "The Indira Gandhi Canal (originally Rajasthan Canal) was conceived by eminent hydraulic engineer Kanwar Sain in 1948. The project was formally launched by the Government on 31 March 1958.\nHence, Option {{CORR}} is correct.",
    "Dates Indira Gandhi Canal conceived by Kanwar Sain (1948) and launched in 1958."
)
add_u13(make_question(CHAPTER_U13, "Indira Gandhi Canal Project", "Who conceived the ambitious 'Indira Gandhi Canal' (Rajasthan Canal) project, and in which year was it formally launched?", opts, c, s))

# Q28: Indira Gandhi Canal origin barrage
opts, c, s = rotate_options(
    "Harike Barrage in Punjab, at the confluence of the Satluj and Beas rivers",
    ["Bhakra Dam on the Satluj river in Himachal Pradesh", "Tehri Dam on the Bhagirathi river in Uttarakhand", "Hirakud Dam on the Mahanadi river in Odisha"],
    "D",
    "The Indira Gandhi Canal originates at the Harike Barrage in Punjab, located at the confluence of the Satluj and Beas rivers, from where the Rajasthan Feeder canal carries water into the Thar desert.\nHence, Option {{CORR}} is correct.",
    "Identifies Harike Barrage in Punjab (confluence of Satluj and Beas) as canal origin."
)
add_u13(make_question(CHAPTER_U13, "Indira Gandhi Canal Project", "At which barrage and river confluence does the Indira Gandhi Canal originate?", opts, c, s))

# Q29: Indira Gandhi Canal Stages: Stage I vs Stage II
opts, c, s = rotate_options(
    "Stage I covers Ganganagar, Hanumangarh, and northern Bikaner; Stage II covers southern Bikaner, Jaisalmer, Barmer, and Jodhpur",
    ["Stage I is in Punjab; Stage II is in Gujarat", "Stage I covers the Himalayas; Stage II covers the Deccan plateau", "Stage I is a pipeline; Stage II is an airline"],
    "A",
    "The Indira Gandhi Canal Command Area comprises Stage I (culturable command area in Ganganagar, Hanumangarh, and northern Bikaner) and Stage II (covering hyper-arid tracts of Bikaner, Jaisalmer, Barmer, Jodhpur, and Nagaur).\nHence, Option {{CORR}} is correct.",
    "Distinguishes Stage I (Ganganagar/Hanumangarh/Bikaner) from Stage II (Jaisalmer/Barmer/Jodhpur)."
)
add_u13(make_question(CHAPTER_U13, "Indira Gandhi Canal Project", "Which districts are covered under 'Stage I' and 'Stage II' of the Indira Gandhi Canal Command Area respectively?", opts, c, s))

# Q30: Flow System vs Lift System in Indira Gandhi Canal
opts, c, s = rotate_options(
    "Flow canals lie on the left bank where land slopes gently away from canal; Lift canals lie on the right bank where water must be mechanically lifted up onto higher dunes",
    ["Flow canals carry boats, while lift canals carry airplanes", "Flow canals are frozen solid, while lift canals are boiling hot", "Both are identical and require no energy"],
    "B",
    "All the lift canals of the Indira Gandhi Canal system are on the left bank (eastern side) where land elevation is higher and water is mechanically lifted, while all flow canals are on the right bank (western/gentle slope side).\nHence, Option {{CORR}} is correct.",
    "Differentiates flow canals (gravity flow) from lift canals (mechanical lifting onto higher terrain)."
)
add_u13(make_question(CHAPTER_U13, "Indira Gandhi Canal Project", "Why are 'Lift Canals' engineered on the eastern side of the Indira Gandhi Main Canal?", opts, c, s))

# Q31: Ecological impact of Indira Gandhi Canal
opts, c, s = rotate_options(
    "Intensive canal irrigation in arid desert has caused rising water tables, leading to severe waterlogging and soil salinization/alkalization",
    ["Has caused permanent snowfall across Jaisalmer desert", "Has completely dried up all vegetation in Ganganagar", "Has created deep ocean trenches inside Rajasthan"],
    "C",
    "While the canal transformed arid desert into productive wheat, cotton, and mustard fields, excessive watering and poor drainage have caused serious waterlogging, rising water tables, and mineral salts encrusting fertile soil (salinization).\nHence, Option {{CORR}} is correct.",
    "Explains waterlogging and soil salinization caused by over-irrigation in the Indira Gandhi Canal command."
)
add_u13(make_question(CHAPTER_U13, "Indira Gandhi Canal Ecology", "What severe environmental and soil degradation problem has emerged in the Indira Gandhi Canal command area?", opts, c, s))

# Q32: Sustainable development measures for Indira Gandhi Canal
opts, c, s = rotate_options(
    "Strict enforcement of water management (warabandi), lining of watercourses, shelterbelt afforestation, pasture development, and growing drought-hardy crops",
    ["Flooding all desert dunes with 10 feet of standing water year-round", "Banning all tree planting along canal banks", "Converting the canal into a high-speed automotive race track"],
    "D",
    "Seven critical measures proposed for sustainable development in the canal command include: strict water auditing, lining of field channels, extensive afforestation (shelterbelts), pasture development, and restricting water-intensive crops in favor of plantation horticulture (citrus).\nHence, Option {{CORR}} is correct.",
    "Lists sustainable development measures: water auditing, lining of channels, shelterbelt afforestation."
)
add_u13(make_question(CHAPTER_U13, "Sustainable Development Measures", "Which policy measures are vital for ensuring long-term ecological sustainability in the Indira Gandhi Canal command area?", opts, c, s))

# Q33: Brundtland Commission Report 'Our Common Future'
opts, c, s = rotate_options(
    "Published in 1987 by the World Commission on Environment and Development (WCED), defining sustainable development as meeting present needs without compromising future generations",
    ["Published in 1776 by Adam Smith on wealth creation", "Published in 1914 by the League of Nations on world peace", "Published in 1945 by the United Nations on decolonization"],
    "A",
    "The Brundtland Commission Report ('Our Common Future'), published in 1987 by the WCED chaired by Gro Harlem Brundtland, formally defined sustainable development as 'development that meets the needs of the present without compromising the ability of future generations to meet their own needs.'\nHence, Option {{CORR}} is correct.",
    "Attributes the 1987 'Our Common Future' sustainable development definition to the Brundtland Commission."
)
add_u13(make_question(CHAPTER_U13, "Sustainable Development Concepts", "Which international report, published in 1987, famously formulated the foundational definition of 'Sustainable Development'?", opts, c, s))

# Q34: Match Industrial Region with Hallmark Centers
add_u13(make_match_question(
    CHAPTER_U13, "Industrial Clusters",
    "Match List I (Major Industrial Region) with List II (Key Manufacturing Centers):",
    [("A", "Mumbai-Pune Region"), ("B", "Bengaluru-Chennai Region"), ("C", "Gujarat Region"), ("D", "Chotanagpur Region")],
    [("I", "Ahmedabad, Vadodara, Surat, Bharuch"), ("II", "Ranchi, Dhanbad, Jamshedpur, Bokaro"), ("III", "Thane, Trombay, Kalyan, Pimpri"), ("IV", "Hosur, Salem, Coimbatore, Mysuru")],
    "A-III, B-IV, C-I, D-II", "B",
    "Mumbai-Pune corresponds to Thane, Trombay, Pimpri (III); Bengaluru-Chennai corresponds to Hosur, Salem, Coimbatore (IV); Gujarat corresponds to Ahmedabad, Vadodara, Surat (I); Chotanagpur corresponds to Ranchi, Dhanbad, Jamshedpur (II).",
    "Matches major Indian industrial regions with their prominent manufacturing nodes."
))

# Q35: Match Steel Plants with Water Sources
add_u13(make_match_question(
    CHAPTER_U13, "Steel Plant Infrastructure",
    "Match List I (Steel Plant) with List II (Associated Water / Energy Source):",
    [("A", "TISCO (Jamshedpur)"), ("B", "Rourkela Steel Plant"), ("C", "Bhilai Steel Plant"), ("D", "VISL (Bhadravati)")],
    [("I", "Tandula Dam / Gondli Canal"), ("II", "Sharavati Hydro-electric Project"), ("III", "Subarnarekha and Kharkai rivers"), ("IV", "Mandira Dam on Sankh river")],
    "A-III, B-IV, C-I, D-II", "C",
    "TISCO draws from Subarnarekha and Kharkai (III); Rourkela draws from Mandira Dam (IV); Bhilai draws from Tandula Dam (I); VISL draws power from Sharavati hydro project (II).",
    "Correctly links steel plants to their dedicated water and power supply sources."
))

# Q36: Statement on Cotton Textile Shift from Mumbai
add_u13(make_statement_question(
    CHAPTER_U13, "Industrial Dispersion",
    "The cotton textile industry in India has decentralized away from Mumbai towards interior market centres like Coimbatore, Kanpur, and Ludhiana.",
    "Cotton is a pure, non-weight losing raw material, allowing textile mills to locate wherever cheap labor, electricity, and local clothing markets exist.",
    1, "D",
    "Both statements are correct. Because raw cotton loses no weight during spinning, mills are free to disperse across the nation to tap regional consumer markets and cheaper labor.",
    "Explains the decentralization of cotton textile mills from coastal hubs to interior market centers."
))

# Q37: Assertion-Reason on Sugar Industry Cooperative Success in Maharashtra
add_u13(make_assertion_question(
    CHAPTER_U13, "Sugar Cooperatives",
    "The cooperative sugar mill sector has achieved immense commercial success and high operational efficiency in Maharashtra.",
    "Cane-growing farmers are cooperative shareholders and manage harvesting schedules directly, eliminating delays between cane cutting and crushing.",
    1, "A",
    "Both Assertion and Reason are true, and Reason is the correct explanation. In Maharashtra's cooperative mills, farmer-members coordinate transport to crush freshly cut cane immediately, preserving high sucrose percentages and sharing profits.",
    "Validates the operational efficiency of Maharashtra's farmer-owned cooperative sugar mills."
))

# Q38: Multi-statement on Indira Gandhi Canal Stage I vs II
add_u13(make_multi_statement_question(
    CHAPTER_U13, "Canal Command Details",
    "Which of the following statements regarding the Indira Gandhi Canal project are correct?",
    [
        ("A", "Stage I was initiated in 1958 and covers Ganganagar, Hanumangarh, and northern Bikaner."),
        ("B", "Stage II extends into the hyper-arid sand dune tracts of Jaisalmer and Barmer."),
        ("C", "It has transformed the desert ecology, enabling extensive commercial cultivation of wheat, cotton, and mustard."),
        ("D", "The canal derives water from the Godavari river in peninsular South India.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C are authentic facts about the canal. Statement D is false because the canal draws water from the Satluj-Beas confluence at Harike in Punjab.",
    "Identifies key factual and geographical milestones of the Indira Gandhi Canal project."
))

# Q39: Gaddi Tribe transhumance cycle
opts, c, s = rotate_options(
    "Migrate with their sheep and goats to high Himalayan alpine pastures (Dhar) in summer, and descend to Kangra and lower valleys in winter",
    ["Migrate across the Indian Ocean to Australia in wooden canoes", "Live permanently inside underground caves without animals", "Travel by airplane between Delhi and Mumbai every weekend"],
    "C",
    "The Gaddi agro-pastoral tribe of Bharmaur practices seasonal transhumance: in summer (June-October) they ascend to high alpine pastures with their herds, and with the onset of winter blizzards, they descend to the valleys of Kangra.\nHence, Option {{CORR}} is correct.",
    "Describes the transhumance cycle of the Gaddi pastoralists between Bharmaur and Kangra."
)
add_u13(make_question(CHAPTER_U13, "Case Study: Bharmaur ITDP", "How does the seasonal pastoral migration cycle of the 'Gaddi' tribe of Bharmaur operate?", opts, c, s))

# Q40: Kollam-Thiruvananthapuram Industrial Region
opts, c, s = rotate_options(
    "Agricultural processing, coir manufacturing, cashew nut processing, seafood export, and titanium dioxide extraction",
    ["Heavy iron and steel blast furnaces using local coking coal", "Automobile manufacturing assembly plants", "Locomotive engine fabrication yards"],
    "D",
    "The Kollam-Thiruvananthapuram industrial belt in southern Kerala specializes in agro-based and coastal resources: coir products, cashew nut processing, marine seafood freezing, and mineral extraction (titanium and rare earths from coastal sands).\nHence, Option {{CORR}} is correct.",
    "Lists key industrial specializations of the Kollam-Thiruvananthapuram belt: coir, cashew, seafood, titanium."
)
add_u13(make_question(CHAPTER_U13, "Industrial Regions", "Which industrial specializations define the 'Kollam-Thiruvananthapuram Industrial Region' in Kerala?", opts, c, s))

# Q41: Vishakhapatnam-Guntur Industrial Region
opts, c, s = rotate_options(
    "Grown around Visakhapatnam port, featuring petroleum refining, shipbuilding (Hindustan Shipyard), fertilizers, and shore-based steel",
    ["Exclusively dedicated to cottage handloom carpet weaving", "A software park located in the interior of the Thar desert", "A traditional coal-mining region in the Himalayas"],
    "A",
    "The Vishakhapatnam-Guntur industrial corridor extends from Visakhapatnam to Guntur, anchored by deep-water port access, Hindustan Shipyard, an oil refinery, petrochemicals, fertilizers, and the RINL steel plant.\nHence, Option {{CORR}} is correct.",
    "Characterizes the Vishakhapatnam-Guntur industrial region: port, shipbuilding, refining, steel."
)
add_u13(make_question(CHAPTER_U13, "Industrial Regions", "What are the anchor industries in the 'Vishakhapatnam-Guntur Industrial Region'?", opts, c, s))

# Q42: Salem Steel Plant
opts, c, s = rotate_options(
    "Tamil Nadu, specialized in high-grade stainless steel manufacturing utilizing local Kanjamalai iron ore",
    ["Kerala, manufacturing aluminum foil", "Karnataka, smelting copper wire", "Andhra Pradesh, refining crude petroleum"],
    "B",
    "The Salem Steel Plant (a unit of SAIL) in Tamil Nadu was commissioned in 1981, specializing in the production of premium stainless steel sheets utilizing local magnetite iron ore from Kanjamalai hills.\nHence, Option {{CORR}} is correct.",
    "Identifies Salem Steel Plant in Tamil Nadu, specializing in stainless steel."
)
add_u13(make_question(CHAPTER_U13, "Specialized Steel", "In which state is the 'Salem Steel Plant', renowned for its high-grade stainless steel production, situated?", opts, c, s))

# Q43: Vijayanagar Steel Plant
opts, c, s = rotate_options(
    "Hospet in Bellary district of Karnataka, utilizing local high-grade hematite iron ore",
    ["Bhopal district of Madhya Pradesh", "Ranchi district of Jharkhand", "Nagpur district of Maharashtra"],
    "C",
    "The Vijayanagar Steel Plant is situated at Toranagallu near Hospet in Bellary district of Karnataka, located directly within the rich Bellary-Hospet iron ore belt.\nHence, Option {{CORR}} is correct.",
    "Locates the Vijayanagar Steel Plant at Hospet in Bellary district, Karnataka."
)
add_u13(make_question(CHAPTER_U13, "Public Sector Steel", "Where is the 'Vijayanagar Steel Plant' situated in Karnataka?", opts, c, s))

# Q44: Synthetic Fibres vs Natural Fibres in Textile
opts, c, s = rotate_options(
    "Synthetic fibres (nylon, polyester) are wrinkle-free, durable, and cheaper, leading to extensive blended fabric manufacturing with natural cotton and wool",
    ["Synthetic fibres are made of raw cow milk", "Natural fibres can only be worn during polar winters", "Synthetic fibres dissolve completely in cold water"],
    "D",
    "The introduction of synthetic petrochemical fibres (polyester, nylon, acrylic) revolutionized the Indian textile industry, leading to widespread production of blended fabrics (terycot, polycot) that combine durability with easy washing.\nHence, Option {{CORR}} is correct.",
    "Explains the rise of synthetic and blended fabrics in the modern Indian textile industry."
)
add_u13(make_question(CHAPTER_U13, "Textile Technology", "How has the emergence of synthetic fibres influenced the Indian textile manufacturing industry?", opts, c, s))

# Q45: Warabandi system in canal irrigation
opts, c, s = rotate_options(
    "A rotational water allocation system ensuring equitable distribution of canal water among farmers on a fixed time roster per unit land",
    ["A system where canal water is auctioned to the highest bidder", "A method of burning weeds inside empty canal beds", "A law prohibiting farmers from ever touching canal water"],
    "A",
    "The Warabandi system is a rotational water distribution roster strictly allocating canal water to farmers in proportion to their landholdings on specified days and hours of the week, ensuring tail-end farmers receive water.\nHence, Option {{CORR}} is correct.",
    "Defines the Warabandi rotational water allocation system in canal commands."
)
add_u13(make_question(CHAPTER_U13, "Indira Gandhi Canal Management", "What is the 'Warabandi System' implemented in the Indira Gandhi Canal Command Area?", opts, c, s))

# Q46: Shelterbelts in Thar Desert
opts, c, s = rotate_options(
    "Planting rows of trees and shrubs perpendicular to prevailing desert winds to stabilize shifting sand dunes and reduce canal siltation",
    ["Building 50-foot concrete walls around every farm", "Constructing underground blast shelters for livestock", "Erecting giant circus tents over wheat fields"],
    "B",
    "Shelterbelts involve afforestation of multiple rows of drought-hardy trees (like Khejri, Acacia, Eucalyptus) across the wind direction to arrest wind erosion, anchor shifting sand dunes, and shield irrigation canals from sand-drifts.\nHence, Option {{CORR}} is correct.",
    "Explains shelterbelt afforestation stabilizing sand dunes and preventing canal siltation."
)
add_u13(make_question(CHAPTER_U13, "Desert Afforestation", "What is the ecological purpose of planting 'Shelterbelts' in the Thar desert canal command area?", opts, c, s))

# Q47: ITDP Bharmaur: Gaddiali dialect
opts, c, s = rotate_options(
    "Gaddiali, belonging to the Western Pahari group of languages",
    ["Telugu, belonging to the Dravidian family", "Santhali, belonging to the Austric family", "Bengali, belonging to the Indo-Aryan family"],
    "C",
    "The Gaddi tribal community of Bharmaur speak the Gaddiali dialect, which belongs to the Western Pahari group of Indo-Aryan languages.\nHence, Option {{CORR}} is correct.",
    "Identifies the Gaddiali dialect (Western Pahari) spoken by the Gaddi tribe."
)
add_u13(make_question(CHAPTER_U13, "Case Study: Bharmaur ITDP", "Which dialect is natively spoken by the Gaddi tribal people of Bharmaur?", opts, c, s))

# Q48: Sectoral Planning definition
opts, c, s = rotate_options(
    "Formulating development programs for specific economic sectors like agriculture, irrigation, manufacturing, power, transport, or education",
    ["Dividing a single farm into four equal quadrants", "Restricting government spending to the armed forces alone", "Banning all private commercial enterprise"],
    "D",
    "Sectoral planning means formulation and implementation of the sets of schemes or programmes aimed at the development of various sectors of the economy, such as agriculture, power, industries, transport, and education.\nHence, Option {{CORR}} is correct.",
    "Defines Sectoral Planning as formulating programs for specific economic sectors."
)
add_u13(make_question(CHAPTER_U13, "Planning Concepts", "What is 'Sectoral Planning' in the context of national developmental planning?", opts, c, s))

# Q49: Regional Disparities in Development
opts, c, s = rotate_options(
    "Unequal levels of economic growth, infrastructure, and human development across different states and geographical areas within a country",
    ["Identical distribution of wealth among all citizens", "The uniform presence of snowcapped mountains in all states", "The equal length of coastlines across landlocked territories"],
    "A",
    "Regional disparity refers to the significant gap in economic progress, industrial concentration, infrastructure, and living standards between prosperous regions (e.g. western/southern coastal hubs) and backward interior areas (e.g. eastern/tribal tracts).\nHence, Option {{CORR}} is correct.",
    "Defines Regional Disparities as spatial inequalities in economic and infrastructural progress."
)
add_u13(make_question(CHAPTER_U13, "Regional Planning", "What does the problem of 'Regional Disparities' signify in economic geography?", opts, c, s))

# Q50: Command Area Development Programme (CADP)
opts, c, s = rotate_options(
    "Initiated in 1974-75 to bridge the gap between potential created and utilized in major irrigation projects through on-farm development works",
    ["A program to construct military airbases along the coast", "A scheme to recruit rural youth into the army", "A project to build satellite launch pads in desert areas"],
    "B",
    "The Command Area Development Programme (CADP) was launched in 1974-75 to ensure rapid and optimal utilization of irrigation water created by major river valley projects through construction of field channels, land leveling, and drainage.\nHence, Option {{CORR}} is correct.",
    "Outlines CADP (1974-75) bridging the gap between created and utilized irrigation potential."
)
add_u13(make_question(CHAPTER_U13, "Irrigation Planning", "What was the primary developmental objective of the 'Command Area Development Programme' (CADP) launched in 1974-75?", opts, c, s))

# Q51: Match Industrial Centers with Signature Industries
add_u13(make_match_question(
    CHAPTER_U13, "Industrial Specialization",
    "Match List I (Industrial Center) with List II (Signature Manufacturing Output):",
    [("A", "Gurugram (Haryana)"), ("B", "Ludhiana (Punjab)"), ("C", "Surat (Gujarat)"), ("D", "Jamshedpur (Jharkhand)")],
    [("I", "Hosiery and woolen knitwear"), ("II", "Automobiles (Maruti Suzuki)"), ("III", "Iron and steel smelting (TISCO)"), ("IV", "Diamond cutting and synthetic textiles")],
    "A-II, B-I, C-IV, D-III", "C",
    "Gurugram corresponds to Automobiles (II); Ludhiana to Woolen hosiery (I); Surat to Diamond cutting/textiles (IV); Jamshedpur to Iron and steel (III).",
    "Matches renowned Indian manufacturing cities to their premier industrial outputs."
))

# Q52: Statement on Chotanagpur's Heavy Industrial Concentration
add_u13(make_statement_question(
    CHAPTER_U13, "Industrial Geography",
    "The Chotanagpur region contains the heaviest concentration of integrated iron and steel plants and heavy engineering works in India.",
    "The region provides unique raw material agglomeration: iron ore, coking coal, manganese, and limestone within close spatial proximity.",
    1, "D",
    "Both statements are correct. The Chotanagpur plateau and adjacent Damodar-Subarnarekha valleys possess India's richest mineral juxtaposition, creating massive agglomeration economies for heavy metallurgy.",
    "Explains the mineral agglomeration underpinning Chotanagpur's heavy metallurgy."
))

# Q53: Assertion-Reason on Sugar Mill Location Near Farms
add_u13(make_assertion_question(
    CHAPTER_U13, "Sugar Mills",
    "Sugar factories are invariably established directly inside sugarcane growing districts rather than in distant metropolitan consuming cities.",
    "Sugarcane is a bulky, weight-losing perishable commodity that rapidly loses sucrose content after being cut.",
    1, "A",
    "Both Assertion and Reason are true, and Reason correctly explains the Assertion. Because crushed cane produces only 9-10% sugar by weight and cut cane loses sucrose within 24 hours, transporting raw cane over long distances is economically impossible.",
    "Validates the raw-material orientation of sugar manufacturing."
))

# Q54: Multi-statement on Bharmaur ITDP Transformation
add_u13(make_multi_statement_question(
    CHAPTER_U13, "Bharmaur ITDP",
    "Which of the following infrastructural transformations occurred in Bharmaur under the Integrated Tribal Development Project?",
    [
        ("A", "Electrification of remote mountain villages and establishment of piped drinking water supply."),
        ("B", "Construction of all-weather roads and pedestrian suspension bridges across the Ravi gorge."),
        ("C", "Expansion of primary and secondary schools and community primary health centers."),
        ("D", "Construction of a deep-sea container shipping terminal on the mountain peak.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C describe authentic development achievements in Bharmaur. Statement D is an absurd physical impossibility.",
    "Identifies infrastructural achievements of the Bharmaur Integrated Tribal Development Project."
))

# Q55: Software Technology Parks of India (STPI)
opts, c, s = rotate_options(
    "Autonomous societies under MeitY providing single-window statutory services, high-speed data communications, and incubation to IT export firms",
    ["Parks where agricultural tractors are assembled by hand", "Public gardens reserved solely for planting ornamental roses", "Suburban housing estates for retired coal miners"],
    "C",
    "Software Technology Parks of India (STPI), established in 1991, provides state-of-the-art satellite earth stations, high-speed international data lines, and duty-free import incentives to boost software exports.\nHence, Option {{CORR}} is correct.",
    "Defines STPI as specialized export infrastructure providers for the software industry."
)
add_u13(make_question(CHAPTER_U13, "Information Technology", "What role do 'Software Technology Parks of India' (STPI) play in facilitating the IT export sector?", opts, c, s))

# Q56: Automobile Manufacturing Hubs in India
opts, c, s = rotate_options(
    "Gurugram-Manesar (North), Pune-Chakan (West), and Chennai-Sriperumbudur (South)",
    ["Bikaner, Jaisalmer, and Barmer", "Srinagar, Leh, and Kargil", "Imphal, Kohima, and Aizawl"],
    "D",
    "India's automobile manufacturing industry is concentrated in three premier spatial triangles: Gurugram-Manesar-Faridabad in the north, Pune-Chakan-Mumbai in the west, and Chennai-Sriperumbudur in the south (often called the 'Detroit of India').\nHence, Option {{CORR}} is correct.",
    "Lists the three premier automobile manufacturing clusters: Gurugram-Manesar, Pune-Chakan, Chennai."
)
add_u13(make_question(CHAPTER_U13, "Automobile Industry", "Which three metropolitan regions host India's primary automotive manufacturing clusters?", opts, c, s))

# Q57: Detroit of India: Chennai
opts, c, s = rotate_options(
    "Chennai, due to its massive concentration of automobile assembly plants (Hyundai, Ford, Renault, BMW, Ashok Leyland) and auto-component suppliers",
    ["Kolkata, due to historic jute processing mills", "Surat, due to diamond cutting workshops", "Varanasi, due to silk saree weaving"],
    "A",
    "Chennai is widely hailed as the 'Detroit of India' (and of South Asia) because it accounts for more than one-third of India's automotive exports and automobile component manufacturing.\nHence, Option {{CORR}} is correct.",
    "Explains why Chennai is celebrated as the 'Detroit of India'."
)
add_u13(make_question(CHAPTER_U13, "Automobile Industry", "Which Indian metropolitan city is famously designated as the 'Detroit of India'?", opts, c, s))

# Q58: Sequence of Steel Plants establishment
add_u13(make_sequence_question(
    CHAPTER_U13, "Steel History",
    "Arrange the establishment of the following iron and steel plants in India in chronological order:",
    [("A", "Bokaro Steel Plant (Jharkhand)"), ("B", "TISCO at Jamshedpur"), ("C", "Bhilai Steel Plant (Chhattisgarh)"), ("D", "Kulti Iron Works (Bengal Iron Works)")],
    "D, B, C, A", "B",
    "1. Kulti Iron Works established in 1870/1874 (D).\n2. TISCO founded at Jamshedpur in 1907 (B).\n3. Bhilai Steel Plant established in 1959 (C).\n4. Bokaro Steel Plant set up in 1964 (A).",
    "Sequences historical iron and steel plants chronologically."
))

# Q59: Sustainable development definition: WCED 1987
opts, c, s = rotate_options(
    "Development that meets the needs of the present without compromising the ability of future generations to meet their own needs",
    ["Maximizing the extraction of all underground minerals within ten years", "Eliminating all environmental regulations to maximize quarterly industrial profits", "Banning all human economic activities across entire continents"],
    "C",
    "The 1987 Brundtland Commission report defined sustainable development as economic progress that fulfills the needs of the current generation while safeguarding ecological assets so future generations can meet their own needs.\nHence, Option {{CORR}} is correct.",
    "States the classic 1987 WCED definition of sustainable development."
)
add_u13(make_question(CHAPTER_U13, "Sustainable Development", "How is 'Sustainable Development' officially defined in the landmark 1987 Brundtland Report?", opts, c, s))

# Q60: Agro-processing and rural industrialization
opts, c, s = rotate_options(
    "Creates off-farm rural employment, prevents distress migration to cities, and reduces post-harvest agricultural crop wastage",
    ["Causes the total desertification of rural farmlands", "Forces all farmers to sell their cattle to foreign tourists", "Eliminates all agricultural food production"],
    "D",
    "Agro-based processing industries (food canning, juice bottling, dairy packaging) create non-farm jobs in villages, enhance farmer incomes, add value to farm produce, and curb distress rural-urban migration.\nHence, Option {{CORR}} is correct.",
    "Highlights the socio-economic benefits of agro-processing in rural development."
)
add_u13(make_question(CHAPTER_U13, "Agro-Processing", "What developmental benefits are generated by establishing agro-processing industries in rural hinterlands?", opts, c, s))

validate_and_collect(u13_qs, u13_seen)
assert len(u13_qs) == 60
with open("mock/geo_units/unit13.json", "w", encoding="utf-8") as f:
    json.dump(u13_qs, f, indent=2, ensure_ascii=False)
print("Unit 13 generated: 60 questions")

# =================================================================================================
# UNIT 14: India: Transport, Communication, International Trade & Selected Environmental Issues (40 Questions)
# =================================================================================================
CHAPTER_U14 = "India: Transport, Communication, International Trade and Environmental Issues"
u14_qs = []
u14_seen = set()

def add_u14(q):
    u14_qs.append(q)

# Q1: Total road network of India
opts, c, s = rotate_options(
    "Over 63 lakh km, making it the second largest road network in the world after the USA",
    ["50,000 km, smaller than small island nations", "10 million km of underground railway subways", "Zero km because all travel is by river boat"],
    "A",
    "India has one of the largest road networks in the world, aggregating more than 63.7 lakh km, second only to the United States of America.\nHence, Option {{CORR}} is correct.",
    "Identifies India's road network as over 63 lakh km, second largest in the world."
)
add_u14(make_question(CHAPTER_U14, "Road Transport", "What is the approximate total length and global standing of India's road network?", opts, c, s))

# Q2: NHAI operationalization
opts, c, s = rotate_options(
    "National Highways Authority of India (NHAI), operationalized in 1995 under the Ministry of Surface Transport",
    ["Operationalized in 1947 by the British Army", "Operationalized in 1960 by the Border Roads Organisation", "Operationalized in 2020 by the Supreme Court"],
    "B",
    "The National Highways Authority of India (NHAI) was constituted by an Act of Parliament in 1988 and became operational in 1995, entrusted with the development, maintenance, and operation of National Highways.\nHence, Option {{CORR}} is correct.",
    "Identifies NHAI operationalized in 1995 for National Highways development."
)
add_u14(make_question(CHAPTER_U14, "Highway Administration", "In which year did the 'National Highways Authority of India' (NHAI) become operational?", opts, c, s))

# Q3: Golden Quadrilateral (GQ)
opts, c, s = rotate_options(
    "5,846 km long, 4/6 lane highway connecting the four major metropolitan mega-cities: Delhi, Mumbai, Chennai, and Kolkata",
    ["A circular railway track surrounding the state of Rajasthan", "A high-speed canal connecting the four corners of the Thar desert", "A trans-oceanic shipping lane connecting Mumbai with New York"],
    "C",
    "The Golden Quadrilateral comprises 5,846 km of 4/6-lane high-density highway connecting India's four major economic nodes: Delhi, Mumbai, Chennai, and Kolkata, drastically cutting transit time.\nHence, Option {{CORR}} is correct.",
    "Specifies the 5,846 km Golden Quadrilateral connecting Delhi, Mumbai, Chennai, Kolkata."
)
add_u14(make_question(CHAPTER_U14, "Express Highways", "What is the total route length and metropolitan alignment of the 'Golden Quadrilateral' super-highway?", opts, c, s))

# Q4: North-South and East-West Corridors
opts, c, s = rotate_options(
    "North-South corridor links Srinagar (J&K) to Kanniyakumari (Tamil Nadu, 4,076 km); East-West corridor links Silchar (Assam) to Porbandar (Gujarat, 3,640 km)",
    ["North-South links Amritsar to Kolkata; East-West links Mumbai to Chennai", "North-South links Shimla to Goa; East-West links Bikaner to Patna", "Both corridors run solely within the state of Madhya Pradesh"],
    "D",
    "The North-South Corridor connects Srinagar in Jammu and Kashmir with Kanniyakumari in Tamil Nadu (4,076 km). The East-West Corridor connects Silchar in Assam with the port city of Porbandar in Gujarat (3,640 km).\nHence, Option {{CORR}} is correct.",
    "Defines North-South (Srinagar-Kanniyakumari) and East-West (Silchar-Porbandar) corridors."
)
add_u14(make_question(CHAPTER_U14, "Express Highways", "Which terminal cities are connected by the 'North-South Corridor' and 'East-West Corridor' respectively?", opts, c, s))

# Q5: Intersection of North-South and East-West corridors
opts, c, s = rotate_options(
    "Jhansi (Uttar Pradesh)",
    ["Nagpur (Maharashtra)", "Bhopal (Madhya Pradesh)", "Agra (Uttar Pradesh)"],
    "A",
    "The North-South and East-West National Highway corridors intersect at the historic junction city of Jhansi in Uttar Pradesh.\nHence, Option {{CORR}} is correct.",
    "Identifies Jhansi in Uttar Pradesh as the crossing junction of North-South and East-West corridors."
)
add_u14(make_question(CHAPTER_U14, "Express Highways", "At which junction city in Uttar Pradesh do the North-South and East-West corridors intersect?", opts, c, s))

# Q6: Border Roads Organisation (BRO)
opts, c, s = rotate_options(
    "Established in May 1960 for accelerating economic development and strengthening defense preparedness in northern and northeastern border areas",
    ["Established in 1853 to build the first railway line in Bombay", "Established in 1995 to operate toll booths on private city expressways", "Established in 1914 to dig the Panama canal"],
    "B",
    "The Border Roads Organisation (BRO) was established in May 1960 for rapid development of strategic road infrastructure in the high-altitude, difficult border terrains of the north and north-eastern borders.\nHence, Option {{CORR}} is correct.",
    "Identifies the Border Roads Organisation (BRO) established in May 1960 for strategic border roads."
)
add_u14(make_question(CHAPTER_U14, "Border Infrastructure", "When and with what primary strategic mandate was the 'Border Roads Organisation' (BRO) created?", opts, c, s))

# Q7: Atal Tunnel Rohtang
opts, c, s = rotate_options(
    "9.02 km long tunnel built by BRO across the Pir Panjal range under Rohtang Pass, connecting Manali with Lahaul-Spiti valley year-round",
    ["A 50 km underwater tunnel connecting Mumbai with Goa", "A railway tunnel through the Western Ghats near Kochi", "A desert pipeline carrying water from Punjab to Bikaner"],
    "C",
    "The Atal Tunnel (9.02 km), constructed by BRO at an altitude of over 3,000 meters under Rohtang Pass in the Pir Panjal range of the Himalayas, provides year-round all-weather connectivity between Manali and Lahaul-Spiti valley.\nHence, Option {{CORR}} is correct.",
    "Identifies Atal Tunnel (9.02 km, Pir Panjal, Rohtang Pass) connecting Manali to Lahaul-Spiti."
)
add_u14(make_question(CHAPTER_U14, "Border Infrastructure", "What is the engineering significance of the 'Atal Tunnel' built by the BRO under Rohtang Pass?", opts, c, s))

# Q8: Indian Railways first train
opts, c, s = rotate_options(
    "16 April 1853, covering a distance of 34 km from Bombay (Bori Bunder) to Thane",
    ["15 August 1947, covering 100 km from Delhi to Agra", "26 January 1950, covering 500 km from Kolkata to Patna", "1 January 1900, covering 10 km from Chennai to Tambaram"],
    "D",
    "Indian Railways commenced operations on 16 April 1853, when the first passenger train carrying 400 passengers steamed over a distance of 34 km from Bori Bunder (Bombay) to Thane.\nHence, Option {{CORR}} is correct.",
    "Dates the first Indian train to 16 April 1853 from Bombay to Thane (34 km)."
)
add_u14(make_question(CHAPTER_U14, "Rail Transport", "On which historic date and between which two stations did the first passenger train run in India?", opts, c, s))

# Q9: Konkan Railway engineering marvel
opts, c, s = rotate_options(
    "760 km long route traversing rugged Western Ghats terrain from Roha (Maharashtra) to Thokur/Mangalore (Karnataka) via Goa, with 91 tunnels and 146 rivers",
    ["A desert railway line connecting Jaisalmer with Bikaner", "A high-altitude line circling the Dal lake in Kashmir", "An underground metro line running beneath the river Ganga in Varanasi"],
    "A",
    "The 760 km Konkan Railway, constructed in 1998, traverses challenging terrain of Maharashtra, Goa, and Karnataka, crossing 146 rivers and streams, 2,000 bridges, and 91 tunnels (including the 6.5 km Karbude tunnel).\nHence, Option {{CORR}} is correct.",
    "Describes the Konkan Railway: 760 km, Roha to Mangalore, 91 tunnels, 146 river crossings."
)
add_u14(make_question(CHAPTER_U14, "Rail Transport", "What engineering feats characterize the landmark 'Konkan Railway' constructed along India's western coast?", opts, c, s))

# Q10: National Waterways: NW-1
opts, c, s = rotate_options(
    "Ganga-Bhagirathi-Hugli river system from Prayagraj (Allahabad) to Haldia (1,620 km), India's longest National Waterway",
    ["Brahmaputra river from Sadiya to Dhubri (891 km)", "West Coast Canal in Kerala from Kottapuram to Kollam (205 km)", "Kakinada-Puducherry canal system along Godavari and Krishna"],
    "B",
    "National Waterway-1 (NW-1) is India's longest inland waterway, declared in 1986, stretching 1,620 km along the Ganga-Bhagirathi-Hugli river system from Prayagraj (UP) to Haldia (West Bengal).\nHence, Option {{CORR}} is correct.",
    "Identifies NW-1: Ganga-Bhagirathi-Hugli from Prayagraj to Haldia (1,620 km)."
)
add_u14(make_question(CHAPTER_U14, "Inland Waterways", "Which river corridor constitutes 'National Waterway No. 1' (NW-1), India's longest navigable inland waterway?", opts, c, s))

# Q11: National Waterways: NW-2
opts, c, s = rotate_options(
    "Brahmaputra river from Sadiya to Dhubri in Assam (891 km)",
    ["Ganga river from Varanasi to Patna", "Mahanadi river from Sambalpur to Paradip", "Narmada river from Jabalpur to Bharuch"],
    "C",
    "National Waterway-2 (NW-2) covers the Brahmaputra River for 891 km between Sadiya in the east and Dhubri near the Bangladesh border in Assam, declared in 1988.\nHence, Option {{CORR}} is correct.",
    "Identifies NW-2: Brahmaputra river from Sadiya to Dhubri (891 km)."
)
add_u14(make_question(CHAPTER_U14, "Inland Waterways", "Which navigable river stretch constitutes 'National Waterway No. 2' (NW-2)?", opts, c, s))

# Q12: National Waterways: NW-3
opts, c, s = rotate_options(
    "West Coast Canal in Kerala from Kottapuram to Kollam (205 km), including Champakara and Udyogmandal canals",
    ["Indira Gandhi canal in Rajasthan", "Buckingham canal in Andhra Pradesh", "Damodar canal in West Bengal"],
    "D",
    "National Waterway-3 (NW-3) comprises the 205 km West Coast Canal in Kerala, extending from Kottapuram to Kollam, alongside the Champakara and Udyogmandal industrial canals, providing 24-hour navigation.\nHence, Option {{CORR}} is correct.",
    "Identifies NW-3: West Coast Canal in Kerala from Kottapuram to Kollam (205 km)."
)
add_u14(make_question(CHAPTER_U14, "Inland Waterways", "What is the alignment of 'National Waterway No. 3' (NW-3) in South India?", opts, c, s))

# Q13: Kandla / Deendayal Port
opts, c, s = rotate_options(
    "Gulf of Kuchchh, Gujarat: developed as a major tidal port after Karachi went to Pakistan post-partition, serving northwestern states",
    ["Gulf of Mannar, Tamil Nadu: developed for pearl fishing", "Bay of Bengal, Odisha: developed for coal export", "Goa coast: developed for iron ore export"],
    "A",
    "Kandla Port (renamed Deendayal Port) at the head of the Gulf of Kuchchh in Gujarat was the first major port developed after Independence to compensate for the loss of Karachi to Pakistan and decongest Mumbai.\nHence, Option {{CORR}} is correct.",
    "Identifies Kandla / Deendayal Port developed post-partition to replace Karachi."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "Why and where was 'Kandla Port' (Deendayal Port) developed as a premier major seaport following Independence?", opts, c, s))

# Q14: Mumbai Port - Natural Harbour and Gateway
opts, c, s = rotate_options(
    "A spacious natural harbour and India's largest port by capacity, strategically positioned along maritime routes to the Middle East, Europe, and North America",
    ["An artificial riverine port situated 128 km inland on the Hooghly river", "A shallow tidal lagoon incapable of handling large bulk cargo vessels", "A tiny fishing dock restricted strictly to passenger catamarans"],
    "C",
    "Mumbai Port is a magnificent natural deep-water harbour and the largest port in India. Stretching 20 km long and 6-10 km wide with 54 berths, it is strategically located closest to the general sea routes connecting India with the Middle East, Mediterranean countries, North Africa, Europe, and North America.\nHence, Option {{CORR}} is correct.",
    "Identifies Mumbai Port as India's premier spacious natural harbour and gateway to western maritime routes."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "Which of the following describes the geographical and strategic significance of 'Mumbai Port'?", opts, c, s))

# Q15: JNPT / Nhava Sheva Port
opts, c, s = rotate_options(
    "Jawaharlal Nehru Port (Nhava Sheva) near Mumbai, built as a modern mechanized satellite port to decongest Mumbai Port, India's largest container port",
    ["A shallow fishing harbor built for small country catamarans", "An inland river barge terminal situated on the Yamuna river", "A private dockyard reserved exclusively for naval submarines"],
    "B",
    "Jawaharlal Nehru Port Trust (JNPT) at Nhava Sheva across Mumbai harbour was commissioned in 1989 as a dedicated satellite container port equipped with modern technology to relieve congestion at Mumbai Port.\nHence, Option {{CORR}} is correct.",
    "Identifies JNPT (Nhava Sheva) as India's premier mechanized container port built to decongest Mumbai."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "What was the primary objective behind constructing the 'Jawaharlal Nehru Port' (Nhava Sheva) in Maharashtra?", opts, c, s))

# Q16: Marmagao Port in Goa
opts, c, s = rotate_options(
    "Located at the entrance of the Zuari estuary in Goa, premier port for iron ore export to Japan and Europe",
    ["Located on the Hugli river for jute export", "Located on the Gulf of Cambay for salt export", "Located in the Sundarbans for timber export"],
    "C",
    "Marmagao Port in Goa, situated at the entrance of the natural harbour formed by the Zuari estuary, is India's leading port for the export of iron ore mined in Goa and neighboring Karnataka.\nHence, Option {{CORR}} is correct.",
    "Identifies Marmagao Port in Goa at the Zuari estuary, specialized in iron ore export."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "At which estuary is 'Marmagao Port' located, and what is its primary export cargo?", opts, c, s))

# Q17: New Mangalore Port
opts, c, s = rotate_options(
    "Karnataka coast, caters specifically to the export of iron ore concentrates from Kudremukh, along with fertilizers, petroleum, and coffee",
    ["Tamil Nadu coast, for exporting cotton yarn", "Gujarat coast, for exporting raw cotton", "Odisha coast, for exporting coal"],
    "D",
    "New Mangalore Port in Karnataka was developed specifically to cater to the export of iron ore from Kudremukh, and also handles fertilizers, petroleum products, coffee, and cashew nuts.\nHence, Option {{CORR}} is correct.",
    "Identifies New Mangalore Port in Karnataka handling Kudremukh iron ore, coffee, and fertilizers."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "Which major seaport on the Karnataka coast was developed to handle iron ore exports from Kudremukh?", opts, c, s))

# Q18: Kochi Port: Queen of the Arabian Sea
opts, c, s = rotate_options(
    "Situated at the opening of the Vembanad Kayal (lagoon), serving Kerala, southern Tamil Nadu, and Karnataka",
    ["Situated in the Gulf of Mannar", "Situated at the delta of the Krishna river", "Situated at the mouth of the Narmada river"],
    "A",
    "Kochi Port, celebrated as the 'Queen of the Arabian Sea', is a natural harbour situated at the mouth of the Vembanad backwaters in Kerala, equipped with the Vallarpadam International Container Transshipment Terminal.\nHence, Option {{CORR}} is correct.",
    "Identifies Kochi Port at the mouth of Vembanad Kayal, known as the 'Queen of the Arabian Sea'."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "Where is 'Kochi Port', the 'Queen of the Arabian Sea', geographically situated?", opts, c, s))

# Q19: Tuticorin / V.O. Chidambaranar Port
opts, c, s = rotate_options(
    "Tamil Nadu (Gulf of Mannar): artificial deep-sea harbour developed to relieve Chennai Port, handles coal, salt, edible oils, and trade with Sri Lanka",
    ["Kerala coast, handling timber and coir", "Goa coast, handling iron ore", "Gujarat coast, handling petroleum"],
    "B",
    "V.O. Chidambaranar Port (formerly Tuticorin Port) in southern Tamil Nadu on the Gulf of Mannar is an artificial deep-water port handling coal, salt, foodgrains, and heavy trade with neighboring Sri Lanka.\nHence, Option {{CORR}} is correct.",
    "Describes Tuticorin / VO Chidambaranar Port in southern Tamil Nadu handling Sri Lanka trade."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "What is the strategic location and commercial role of 'V.O. Chidambaranar Port' (Tuticorin)?", opts, c, s))

# Q20: Chennai Port: Oldest artificial port
opts, c, s = rotate_options(
    "One of the oldest artificial harbours on the eastern coast of India, built in 1859 without a natural bay",
    ["A natural deep-water fjord carved by glaciers", "A riverine port located 200 km inland along the Cauvery", "A floating artificial island constructed in the deep ocean"],
    "C",
    "Chennai Port is one of the oldest artificial harbours on the east coast of India, with maritime construction dating back to 1859, lacking a natural bay and sheltered by massive artificial breakwaters.\nHence, Option {{CORR}} is correct.",
    "Identifies Chennai Port as an historic artificial harbour dating to 1859."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "What historical feature distinguishes 'Chennai Port' on India's eastern seaboard?", opts, c, s))

# Q21: Visakhapatnam Port: Deepest land-locked port
opts, c, s = rotate_options(
    "Deepest land-locked, protected natural harbour in Andhra Pradesh, with an outer harbour built to handle massive iron ore carriers",
    ["Shallow river basin with maximum depth of 1 meter", "Artificial canal lock port operating on freshwater", "A wooden jetty restricted to passenger ferries"],
    "D",
    "Visakhapatnam Port in Andhra Pradesh is a land-locked natural harbour connected to the sea through a channel cut through solid rock (Dolphin's Nose), making it India's deepest protected natural port.\nHence, Option {{CORR}} is correct.",
    "Identifies Visakhapatnam Port as India's deepest land-locked protected natural harbour."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "Which seaport in Andhra Pradesh is renowned as India's deepest land-locked and protected natural port?", opts, c, s))

# Q22: Paradip Port in Odisha
opts, c, s = rotate_options(
    "Deep-water port situated on the Mahanadi delta in Odisha, primarily designed to handle large-scale export of iron ore to Japan",
    ["A riverine passenger port in Kolkata", "A naval submarine base in Goa", "A shallow salt port in Gujarat"],
    "A",
    "Paradip Port is situated in Jagatsinghpur district of Odisha on the Mahanadi delta, constructed as a deep-water port to handle bulk export of iron ore from Odisha and Jharkhand mines to Japan.\nHence, Option {{CORR}} is correct.",
    "Identifies Paradip Port in Odisha on the Mahanadi delta, specialized in iron ore export to Japan."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "Where is 'Paradip Port' located, and what is its primary bulk export commodity?", opts, c, s))

# Q23: Kolkata-Haldia Port: Riverine Port
opts, c, s = rotate_options(
    "Kolkata is a riverine port located 128 km inland on the Hugli river, suffering from siltation; Haldia was developed downstream as a deep-water outport",
    ["Kolkata is a deep ocean coral port, while Haldia is an inland mountain lake", "Both are small fishing villages with zero commercial trade", "Both are situated on the Arabian sea coast of Gujarat"],
    "B",
    "Kolkata is India's only major riverine port, located 128 km inland from the sea on the Hugli River. To relieve congestion and accommodate larger deep-draft vessels unable to navigate upriver, Haldia was built downstream.\nHence, Option {{CORR}} is correct.",
    "Explains Kolkata as a riverine port on the Hugli and Haldia as its downstream deep-water outport."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "What is the geographical relationship between the riverine 'Kolkata Port' and 'Haldia Port'?", opts, c, s))

# Q24: Major item in India's import bill
opts, c, s = rotate_options(
    "Petroleum, crude, and petroleum products, accounting for about 25 to 30 percent of total import expenditure",
    ["Food grains like wheat and rice", "Fresh river drinking water", "Timber logs and wooden matchsticks"],
    "C",
    "Crude petroleum and petroleum products constitute the single largest item in India's import basket, accounting for roughly 25-30% of total import expenditure to fuel transport, power, and industry.\nHence, Option {{CORR}} is correct.",
    "Identifies petroleum and crude oil as the largest item in India's import bill (~25-30%)."
)
add_u14(make_question(CHAPTER_U14, "Foreign Trade Composition", "Which commodity group consistently accounts for the single largest share of India's total import expenditure?", opts, c, s))

# Q25: Leading export items of India
opts, c, s = rotate_options(
    "Refined petroleum products, gems and jewellery, pharmaceuticals, engineering goods, and electronic merchandise",
    ["Raw coal and unprocessed iron boulders exclusively", "Fresh glacial ice and mountain snow", "Second-hand wooden bullock carts"],
    "D",
    "India's leading export commodities have shifted toward value-added manufactured goods: refined petroleum products, cut and polished gems and jewellery, pharmaceuticals, engineering goods, and electronics.\nHence, Option {{CORR}} is correct.",
    "Lists India's top export items: refined petroleum, gems & jewellery, pharmaceuticals, engineering."
)
add_u14(make_question(CHAPTER_U14, "Foreign Trade Composition", "Which group of commodities represents India's leading export earners in international merchandise trade?", opts, c, s))

# Q26: Largest trading partners of India
opts, c, s = rotate_options(
    "United States of America (largest export market) and China (largest source of merchandise imports)",
    ["Brazil and Argentina", "South Africa and Nigeria", "Norway and Iceland"],
    "A",
    "The United States is India's largest export destination and premier overall trading partner, while China is the largest source of India's manufactured imports, followed by the UAE and Saudi Arabia.\nHence, Option {{CORR}} is correct.",
    "Identifies USA (top export destination) and China (top import source) as India's premier partners."
)
add_u14(make_question(CHAPTER_U14, "Trading Partners", "Which two countries constitute India's leading international trading partners in merchandise trade?", opts, c, s))

# Q27: Air transport nationalization in India
opts, c, s = rotate_options(
    "Air transport was nationalized in 1953, creating Air India (for international routes) and Indian Airlines (for domestic routes)",
    ["Nationalized in 1853 by the East India Company", "Nationalized in 1914 during the First World War", "Nationalized in 1991 during economic reforms"],
    "B",
    "In 1953, the Government of India nationalized air transport by merging existing private airlines into two public corporations: Air India (international operations) and Indian Airlines (domestic/regional services).\nHence, Option {{CORR}} is correct.",
    "Identifies the nationalization of Indian air transport in 1953 (Air India and Indian Airlines)."
)
add_u14(make_question(CHAPTER_U14, "Air Transport History", "In which year was air transport formally nationalized in India, establishing public sector aviation corporations?", opts, c, s))

# Q28: Pawan Hans Helicopters Limited
opts, c, s = rotate_options(
    "Provides helicopter services to the petroleum sector (ONGC offshore operations) and connects inaccessible hilly northeastern and Himalayan terrains",
    ["Operates commercial supersonic passenger flights between Mumbai and London", "Constructs railway locomotives for desert coal mines", "Manages deep-sea oceanic container freight vessels"],
    "C",
    "Pawan Hans Limited provides vital helicopter support services to the offshore petroleum sector (ONGC at Mumbai High) and connects remote, inaccessible tourist and administrative centers in the North-East and Himalayas.\nHence, Option {{CORR}} is correct.",
    "Describes Pawan Hans helicopter services supporting offshore ONGC operations and remote hill connectivity."
)
add_u14(make_question(CHAPTER_U14, "Air Services", "What strategic role is performed by 'Pawan Hans Limited' in Indian aviation and resource sectors?", opts, c, s))

# Q29: Open Dumping of Solid Waste environmental hazard
opts, c, s = rotate_options(
    "Produces toxic leachate that percolates into groundwater aquifers, emits foul odor and greenhouse methane, and breeds disease vectors",
    ["Turns municipal waste instantly into pure gold ingots", "Increases the fertility of underground aquifers", "Eliminates all air pollution from surrounding cities"],
    "D",
    "Unscientific open dumping of untreated urban solid waste generates toxic leachate that contaminates groundwater tables, releases inflammable methane and dioxins, and creates breeding grounds for rodents and flies.\nHence, Option {{CORR}} is correct.",
    "Details hazards of open waste dumping: toxic leachate contaminating aquifers and methane emissions."
)
add_u14(make_question(CHAPTER_U14, "Solid Waste Management", "What major environmental and public health hazards are caused by the unscientific 'Open Dumping' of municipal solid waste?", opts, c, s))

# Q30: Land Degradation in Chambal Valley
opts, c, s = rotate_options(
    "Severe gully erosion creating deep ravines and badland topography, rendering fertile soils uncultivable",
    ["Massive volcanic lava deposits covering all farm fields", "Perennial glacial ice sheets crushing rural houses", "Submergence beneath seawater due to ocean tsunamis"],
    "A",
    "The Chambal river basin in Madhya Pradesh, Rajasthan, and UP is notoriously famous for extreme gully erosion, where running water has carved out deep, extensive ravines (badland topography), destroying arable land.\nHence, Option {{CORR}} is correct.",
    "Identifies gully erosion creating ravines and badland topography in the Chambal valley."
)
add_u14(make_question(CHAPTER_U14, "Land Degradation", "What distinctive form of severe land degradation characterizes the 'Chambal River Basin'?", opts, c, s))

# Q31: Air Pollution: Thermal Power Plants and Vehicles
opts, c, s = rotate_options(
    "Sulfur dioxide (SO2), Nitrogen oxides (NOx), Carbon monoxide (CO), and Particulate Matter (PM2.5 and PM10), causing smog and respiratory illnesses",
    ["Pure distilled oxygen and water vapor exclusively", "Liquid nitrogen and liquid helium", "Dry sand and pure limestone dust"],
    "B",
    "Coal-fired thermal power plants and motor vehicles emit massive volumes of sulfur dioxide, nitrogen oxides, carbon monoxide, unburnt hydrocarbons, and fine particulate matter (PM2.5/PM10), triggering deadly winter smog.\nHence, Option {{CORR}} is correct.",
    "Lists primary air pollutants from thermal power and vehicular exhaust: SO2, NOx, CO, PM2.5."
)
add_u14(make_question(CHAPTER_U14, "Air Pollution", "Which primary atmospheric pollutants are released in large quantities by coal-based thermal power plants and vehicular transport in Indian cities?", opts, c, s))

# Q32: Match Major Ports with Coastlines
add_u14(make_match_question(
    CHAPTER_U14, "Port Geography",
    "Match List I (Major Seaport) with List II (Coastline / Coastal State):",
    [("A", "Kandla (Deendayal)"), ("B", "Marmagao"), ("C", "Paradip"), ("D", "Tuticorin (V.O.C.)")],
    [("I", "Goa (Western Coast)"), ("II", "Gujarat (Western Coast)"), ("III", "Tamil Nadu (Eastern Coast)"), ("IV", "Odisha (Eastern Coast)")],
    "A-II, B-I, C-IV, D-III", "C",
    "Kandla is in Gujarat (II); Marmagao is in Goa (I); Paradip is in Odisha (IV); Tuticorin is in Tamil Nadu (III).",
    "Correctly matches major Indian seaports with their respective coasts and states."
))

# Q33: Match National Waterways with River Terminals
add_u14(make_match_question(
    CHAPTER_U14, "National Waterways",
    "Match List I (National Waterway) with List II (River Stretch / Terminals):",
    [("A", "NW-1"), ("B", "NW-2"), ("C", "NW-3"), ("D", "NW-4")],
    [("I", "Brahmaputra river: Sadiya to Dhubri"), ("II", "West Coast Canal: Kottapuram to Kollam"), ("III", "Ganga river: Prayagraj to Haldia"), ("IV", "Krishna-Godavari & canals: Kakinada to Puducherry")],
    "A-III, B-I, C-II, D-IV", "D",
    "NW-1 is Ganga (Prayagraj to Haldia) (III); NW-2 is Brahmaputra (Sadiya to Dhubri) (I); NW-3 is West Coast Canal (Kottapuram to Kollam) (II); NW-4 is Kakinada to Puducherry (IV).",
    "Matches National Waterways No. 1 to 4 with their official river stretches and terminals."
))

# Q34: Statement on Indian Railway Gauge Distribution
add_u14(make_statement_question(
    CHAPTER_U14, "Railway Infrastructure",
    "Broad gauge (1.676 m) accounts for more than 85 to 90 percent of the total route length of Indian Railways under Project Unigauge.",
    "Narrow gauge (0.762 m and 0.610 m) is confined mostly to scenic hill railways like Darjeeling, Kalka-Shimla, and Nilgiri.",
    1, "A",
    "Both statements are correct. Project Unigauge converted most metre-gauge tracks to broad gauge (1.676 m), while narrow gauge remains preserved in UNESCO heritage mountain railways (Darjeeling, Kalka-Shimla).",
    "Affirms facts about broad gauge dominance and narrow gauge hill lines in Indian Railways."
))

# Q35: Assertion-Reason on Inland Waterway Potential vs Utilization
add_u14(make_assertion_question(
    CHAPTER_U14, "Waterway Economics",
    "Despite having over 14,500 km of navigable waterways, inland water transport currently contributes less than 1-2 percent of India's total freight movement.",
    "Diversion of river waters for agricultural canal irrigation causes heavy seasonal siltation and insufficient navigable depth in river channels during the dry season.",
    1, "B",
    "Both Assertion and Reason are true, and Reason correctly explains the Assertion. Severe water abstraction for agriculture leaves river channels shallow with sandbars, limiting year-round navigation by heavy cargo barges.",
    "Explains why river water diversion for irrigation restricts inland commercial barge transport."
))

# Q36: Multi-statement on Environmental Pollution Types
add_u14(make_multi_statement_question(
    CHAPTER_U14, "Environmental Pollution",
    "Which of the following statements regarding pollution in Indian geographical contexts are correct?",
    [
        ("A", "Water pollution in the Yamuna is acute between Delhi and its confluence with Chambal."),
        ("B", "Noise pollution from traffic, sirens, and industrial machinery creates chronic cardiovascular and auditory stress."),
        ("C", "Fly ash from coal thermal plants causes severe land and atmospheric particulate pollution."),
        ("D", "Industrial pollution in India has eliminated all monsoonal cloud formation.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "C",
    "Statements A, B, and C are real, well-documented pollution facts. Statement D is absurd as monsoonal dynamics operate on planetary thermal scales.",
    "Assesses factual characteristics of water, noise, and industrial pollution in India."
))

# Q37: Swachh Bharat Abhiyan (SBA)
opts, c, s = rotate_options(
    "Launched on 2 October 2014 to eliminate open defecation, achieve universal sanitation coverage, and ensure scientific solid waste management",
    ["A program to construct 500 new airports across rural India", "A plan to export municipal garbage to Antarctica", "A scheme to ban the manufacture of soap and detergents"],
    "D",
    "The Swachh Bharat Abhiyan was launched on 2 October 2014 by Prime Minister Narendra Modi to accelerate sanitation coverage, eradicate open defecation (ODF), and establish scientific municipal solid waste management.\nHence, Option {{CORR}} is correct.",
    "Summarizes the objectives of Swachh Bharat Abhiyan launched on 2 October 2014."
)
add_u14(make_question(CHAPTER_U14, "Sanitation Missions", "What is the primary national mandate of the 'Swachh Bharat Abhiyan' launched on 2 October 2014?", opts, c, s))

# Q38: Kamarajar / Ennore Port
opts, c, s = rotate_options(
    "Tamil Nadu, located 25 km north of Chennai Port: India's first major corporatized seaport, specialized in handling thermal coal imports",
    ["A small river harbor on the Brahmaputra in Assam", "A shallow fishing harbor on the coast of Goa", "A private dockyard located on Dal Lake in Kashmir"],
    "A",
    "Kamarajar Port (formerly Ennore Port) in Tamil Nadu was developed as a satellite port to decongest Chennai Port, functioning as India's first corporatized major port (publicly owned company) specialized in bulk thermal coal.\nHence, Option {{CORR}} is correct.",
    "Identifies Kamarajar / Ennore Port as India's first corporatized major port handling thermal coal."
)
add_u14(make_question(CHAPTER_U14, "Major Ports", "What distinction is held by 'Kamarajar Port' (Ennore) in Indian port administration?", opts, c, s))

# Q39: Satellite Communication: INSAT and IRS
opts, c, s = rotate_options(
    "INSAT (telecommunications, television broadcasting, weather forecasting) and IRS (natural resource mapping, remote sensing, agriculture)",
    ["INSAT is used only for making phone calls to Mars", "IRS is a missile system for coastal defense", "Both satellites were launched in 1850 by steam rockets"],
    "B",
    "India operates two major space constellations: INSAT (Indian National Satellite System for telecommunications, DTH TV, and cyclone warning) and IRS (Indian Remote Sensing satellite system for land, water, crop, and mineral mapping).\nHence, Option {{CORR}} is correct.",
    "Distinguishes INSAT (telecom/meteorology) from IRS (natural resource remote sensing)."
)
add_u14(make_question(CHAPTER_U14, "Space Technology", "What are the distinct operational functions of India's 'INSAT' and 'IRS' satellite constellations?", opts, c, s))

# Q40: Sequence of Port Developments in Post-Independence India
add_u14(make_sequence_question(
    CHAPTER_U14, "Port History",
    "Arrange the development of the following major seaports in post-independence India in chronological sequence:",
    [("A", "Commissioning of Jawaharlal Nehru Port (JNPT) at Nhava Sheva"), ("B", "Development of Kandla (Deendayal) Port to compensate for Karachi"), ("C", "Commissioning of Paradip Port in Odisha for iron ore export"), ("D", "Corporatization of Ennore (Kamarajar) Port")],
    "B, C, A, D", "B",
    "1. Kandla developed in the 1950s after partition (B).\n2. Paradip commissioned in 1966 (C).\n3. JNPT commissioned in 1989 (A).\n4. Ennore corporatized in 2001 (D).",
    "Sequences post-independence major port developments chronologically."
))

validate_and_collect(u14_qs, u14_seen)
assert len(u14_qs) == 40
with open("mock/geo_units/unit14.json", "w", encoding="utf-8") as f:
    json.dump(u14_qs, f, indent=2, ensure_ascii=False)
print("Unit 14 generated: 40 questions")
print("Total questions in part_b2:", len(u12_qs) + len(u13_qs) + len(u14_qs))
