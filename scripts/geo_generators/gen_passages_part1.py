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

print(f"Loaded {len(global_seen)} questions from Units 1-14 into global_seen.")

passages_part1 = []
seen_part1 = set()

def add_p(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_part1:
        raise ValueError(f"Duplicate within passages part 1: {q['questionText'][:80]}")
    if norm in global_seen:
        raise ValueError(f"Cross-mock duplicate: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate: {q['questionText'][:80]}")
    seen_part1.add(norm)
    global_seen.add(norm)
    assert len(q["options"]) == 4
    assert q["correctOption"] in ["A", "B", "C", "D"]
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"]
    passages_part1.append(q)

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
# PASSAGE 1: Bharmaur Tribal Region & ITDP (Book 2, Chapter 9)
# =================================================================================================
P1_TEXT = """Bharmaur tribal area comprises Bharmaur and Holi tehsils of Chamba district in Himachal Pradesh. It is a notified tribal area inhabited by the 'Gaddi' tribal community who have maintained a distinct cultural identity through pastoralism, transhumance, and their unique dialect. Situated between 1,500 m and 3,700 m altitude in the Pir Panjal and Dhauladhar ranges, Bharmaur faces harsh climatic conditions, low resource base, and fragile ecology. Under the Fifth Five Year Plan, the Integrated Tribal Development Project (ITDP) was launched in Bharmaur in 1974. The priority areas of the project included development of transport and communication networks, provision of potable water, healthcare, and education. The most significant achievement of the project has been the dramatic improvement in female literacy, which surged from 1.88 percent in 1971 to 65 percent in 2011, alongside a steady transition from nomadic pastoralism to sedentary horticulture and cash cropping."""

add_p(make_pq(
    "Planning and Sustainable Development", "Bharmaur Tribal Area", P1_TEXT,
    "Which tribal community constitutes the indigenous population of the Bharmaur region in Himachal Pradesh?",
    "Gaddi community, practicing seasonal transhumance and speaking a distinct dialect",
    ["Santhal community engaged in settled plough agriculture", "Bhil community inhabiting the Vindhyan forests", "Toda community residing in the Nilgiri plateau"],
    "A",
    "Bharmaur tribal region is predominantly inhabited by the Gaddi tribal community of Himachal Pradesh.",
    "Identifies Gaddi tribe as the indigenous inhabitants of Bharmaur."
))

add_p(make_pq(
    "Planning and Sustainable Development", "ITDP Launch", P1_TEXT,
    "During which Five Year Plan was the Integrated Tribal Development Project (ITDP) operationalized in Bharmaur?",
    "Fifth Five Year Plan in 1974",
    ["First Five Year Plan in 1951", "Second Five Year Plan in 1956", "Ninth Five Year Plan in 1997"],
    "B",
    "The Bharmaur Integrated Tribal Development Project (ITDP) was initiated in 1974 during the Fifth Five Year Plan.",
    "Identifies the Fifth Five Year Plan (1974) as the inception period for Bharmaur ITDP."
))

add_p(make_pq(
    "Planning and Sustainable Development", "ITDP Socio-economic Impact", P1_TEXT,
    "According to the passage, what has been the most remarkable developmental outcome of the ITDP in Bharmaur between 1971 and 2011?",
    "Rapid increase in female literacy rate from 1.88% in 1971 to 65% in 2011",
    ["Complete conversion of all mountain slopes into heavy industrial manufacturing zones", "Construction of a six-lane international expressway across Pir Panjal", "Total eradication of agriculture in favour of deep underground coal mining"],
    "C",
    "The passage explicitly states that female literacy surged from 1.88% in 1971 to 65% in 2011.",
    "Identifies dramatic rise in female literacy from 1.88% to 65%."
))

add_p(make_pq(
    "Planning and Sustainable Development", "Agrarian Transition in Bharmaur", P1_TEXT,
    "How did the economic activities of the Gaddis change following the implementation of the ITDP?",
    "They experienced a transition from nomadic pastoralism towards sedentary horticulture and cash crop cultivation",
    ["They shifted completely from agriculture to large-scale deep sea commercial trawling", "They abandoned all sedentary farming to become full-time shifting cultivators in tropical rainforests", "They transitioned entirely into IT software export processing in urban clusters"],
    "D",
    "Post-ITDP development encouraged Gaddis to transition from traditional nomadic pastoral transhumance to settled horticulture (apples) and cash crops.",
    "Identifies agrarian transition towards sedentary horticulture and cash cropping."
))

add_p(make_pq(
    "Planning and Sustainable Development", "Bharmaur Physiography", P1_TEXT,
    "Between which two major Himalayan mountain ranges is the Bharmaur tribal region geographically situated?",
    "Pir Panjal and Dhauladhar ranges",
    ["Zaskar and Ladakh ranges", "Great Himalaya and Shiwalik ranges in Uttarakhand", "Patkai Bum and Lushai hills"],
    "A",
    "Bharmaur tribal region lies surrounded by the Pir Panjal and Dhauladhar ranges of Himachal Pradesh.",
    "Identifies Pir Panjal and Dhauladhar ranges as bounding Bharmaur."
))

# =================================================================================================
# PASSAGE 2: Suez Canal and Global Maritime Trade (Book 1, Chapter 8)
# =================================================================================================
P2_TEXT = """The Suez Canal was officially opened in 1869 across the Isthmus of Suez in Egypt, constructed under the supervision of French engineer Ferdinand de Lesseps. Connecting Port Said on the Mediterranean Sea with Port Suez on the Red Sea, this 160-kilometer sea-level canal has no locks because the water level of both seas is practically identical. It reduced the maritime sailing distance between Liverpool and Mumbai by approximately 9,600 kilometers compared to the ancient Cape of Good Hope route around Africa. Ships of draft up to 15 meters can navigate the canal, traveling in convoys through the Great Bitter Lake to avoid collisions. The canal provides Europe with a direct and economical gateway to the Indian Ocean, drastically cutting transit times for petroleum crude from the Persian Gulf, manufactured goods from Europe, and agricultural commodities from South and Southeast Asia."""

add_p(make_pq(
    "Transport, Communication and Trade", "Suez Canal Geography", P2_TEXT,
    "Which two water bodies are directly connected by the Suez Canal?",
    "Mediterranean Sea (Port Said) and Red Sea (Port Suez)",
    ["Atlantic Ocean and Pacific Ocean", "Baltic Sea and North Sea", "Black Sea and Aegean Sea"],
    "B",
    "The Suez Canal connects the Mediterranean Sea at Port Said in the north with the Red Sea at Port Suez in the south.",
    "Identifies the Mediterranean Sea and Red Sea as connected by the Suez Canal."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Engineering Characteristics of Suez", P2_TEXT,
    "Why does the Suez Canal operate without locks unlike the Panama Canal?",
    "Because the water surface levels of the Mediterranean Sea and Red Sea are practically identical",
    ["Because it was excavated through solid granite plateaus where water cannot flow", "Because all ships are lifted across the desert using giant magnetic rails", "Because water is pumped continuously uphill using nuclear engines"],
    "C",
    "The Suez Canal is a sea-level canal requiring no locks because both the Mediterranean and Red seas share almost identical sea levels.",
    "Identifies sea-level design without locks due to equal water levels."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Distance Reduction Impact", P2_TEXT,
    "By approximately how much distance did the opening of the Suez Canal shorten the sea route between Liverpool and Mumbai?",
    "About 9,600 kilometers compared to the Cape of Good Hope circumnavigation",
    ["Only 50 kilometers", "Over 45,000 kilometers", "It actually lengthened the journey by 2,000 kilometers"],
    "D",
    "The Suez route saved around 9,600 km between Liverpool and Mumbai by avoiding the long voyage around Africa.",
    "Identifies 9,600 km distance reduction between Liverpool and Mumbai."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Suez Canal History", P2_TEXT,
    "In which year was the Suez Canal opened to international maritime navigation?",
    "1869",
    ["1914", "1800", "1947"],
    "A",
    "The Suez Canal was opened for international navigation in the year 1869.",
    "Identifies 1869 as opening year of Suez Canal."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Suez Transit Organization", P2_TEXT,
    "Where do ship convoys pass or wait while transiting the Suez Canal to prevent collisions?",
    "Great Bitter Lake",
    ["Lake Victoria", "Lake Baikal", "Lake Superior"],
    "B",
    "The Great Bitter Lake acts as a major intermediate waiting and passing basin for ship convoys in the Suez Canal.",
    "Identifies Great Bitter Lake as the passing basin for convoys in Suez Canal."
))

# =================================================================================================
# PASSAGE 3: Indira Gandhi Canal (Nahar) Command Area (Book 2, Chapter 9)
# =================================================================================================
P3_TEXT = """The Indira Gandhi Canal, previously known as the Rajasthan Canal, is one of the largest canal systems in India. Conceived by Kanwar Sain in 1948, the project was launched on 31 March 1958. The canal originates at Harike Barrage in Punjab at the confluence of the Satluj and Beas rivers, running parallel to the Pakistan border at an average distance of 40 km across Thar desert. The command area covers parts of Ganganagar, Bikaner, Jaisalmer, Barmer, Jodhpur, and Churu districts. The project is implemented in two stages: Stage I covering Ganganagar, Hanumangarh, and Bikaner, and Stage II covering Bikaner, Jaisalmer, and Barmer. While irrigation has transformed the arid landscape into green fields of wheat, cotton, and mustard, intensive and unscientific canal irrigation without adequate drainage has created severe environmental hazards, including waterlogging and soil salinization."""

add_p(make_pq(
    "Planning and Sustainable Development", "Canal Origin and Headworks", P3_TEXT,
    "At which barrage and confluence of rivers does the Indira Gandhi Canal originate?",
    "Harike Barrage at the confluence of the Satluj and Beas rivers in Punjab",
    ["Bhakra Nangal Dam on the Sutlej river in Himachal Pradesh", "Tehri Dam on the Bhagirathi river in Uttarakhand", "Hirakud Dam on the Mahanadi river in Odisha"],
    "C",
    "The canal originates at Harike Barrage in Punjab where the Satluj and Beas rivers meet.",
    "Identifies Harike Barrage at confluence of Satluj and Beas."
))

add_p(make_pq(
    "Planning and Sustainable Development", "Project Conception", P3_TEXT,
    "Who originally conceived the idea of the Rajasthan (Indira Gandhi) Canal in 1948?",
    "Kanwar Sain",
    ["Dr. M.S. Swaminathan", "Verghese Kurien", "Sir Arthur Cotton"],
    "D",
    "The Indira Gandhi Canal project was originally conceived by engineer Kanwar Sain in 1948.",
    "Identifies Kanwar Sain as the visionary engineer of the project."
))

add_p(make_pq(
    "Planning and Sustainable Development", "Crop Pattern Transformation", P3_TEXT,
    "Which crops have expanded significantly in the Thar desert due to the introduction of canal irrigation?",
    "Wheat, cotton, gram, and mustard",
    ["Tea, coffee, and rubber", "Jute, coconut, and rubber", "Apple, saffron, and walnut"],
    "A",
    "Canal waters facilitated high yields of wheat, cotton, gram, and mustard across northern and western Rajasthan.",
    "Identifies wheat, cotton, and mustard as major beneficiary crops."
))

add_p(make_pq(
    "Planning and Sustainable Development", "Ecological Consequences", P3_TEXT,
    "What major environmental problems have emerged due to intensive canal irrigation in the command area?",
    "Waterlogging and secondary soil salinization due to poor drainage and excessive seepage",
    ["Accelerated desertification due to zero rainfall", "Acid rain from high-sulfur thermal plants", "Permanent snow accumulation across the desert"],
    "B",
    "Over-irrigation in sandy desert terrain lacking proper sub-surface drainage leads to rising water tables, waterlogging, and salinization.",
    "Identifies waterlogging and soil salinization as twin ecological hazards."
))

add_p(make_pq(
    "Planning and Sustainable Development", "Command Area Geography", P3_TEXT,
    "Which pair of districts falls primarily within the Stage II command area of the Indira Gandhi Canal?",
    "Bikaner and Jaisalmer",
    ["Shimla and Kangra", "Kanpur and Varanasi", "Pune and Solapur"],
    "C",
    "Stage II encompasses arid tracts of Bikaner, Jaisalmer, and parts of Barmer.",
    "Identifies Bikaner and Jaisalmer as Stage II command districts."
))

# =================================================================================================
# PASSAGE 4: Trans-Siberian Railway (Book 1, Chapter 8)
# =================================================================================================
P4_TEXT = """The Trans-Siberian Railway is the premier arterial railway network of the Russian Federation and the longest continuous railway line in the world. Running a total length of approximately 9,332 kilometers, it links St. Petersburg in the west with Vladivostok on the Pacific Ocean coast in the east. The line passes through major industrial and regional nodes, including Moscow, Nizhny Novgorod, Kazan, Samara, Chelyabinsk, Omsk, Novosibirsk, Krasnoyarsk, Irkutsk, and Chita. Fully electrified and built with double tracks, the Trans-Siberian line connects the fertile agricultural steppes, the Siberian taiga forests, and rich mineral basins of the Urals and Kuznetsk. It has opened up Asian Russia to global markets, transporting timber, machinery, coking coal, iron ore, and grain, while providing vital transit corridors to Mongolia and China."""

add_p(make_pq(
    "Transport, Communication and Trade", "Trans-Siberian Route Terminals", P4_TEXT,
    "What are the western and eastern terminal cities connected by the Trans-Siberian Railway?",
    "St. Petersburg in the west and Vladivostok on the Pacific coast in the east",
    ["London in the west and Beijing in the east", "Berlin in the west and Tokyo in the east", "Murmansk in the north and Sochi in the south"],
    "D",
    "The Trans-Siberian Railway connects St. Petersburg (and Moscow) in the west to Vladivostok on the Pacific Ocean in the east.",
    "Identifies St. Petersburg and Vladivostok as the railway terminals."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Trans-Siberian Length", P4_TEXT,
    "What is the approximate total route length of the Trans-Siberian Railway?",
    "9,332 kilometers",
    ["1,500 kilometers", "25,000 kilometers", "4,200 kilometers"],
    "A",
    "The Trans-Siberian Railway stretches across Russia for approximately 9,332 km.",
    "Identifies 9,332 km as the total length."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Track and Traction Standard", P4_TEXT,
    "Which engineering characteristics distinguish the Trans-Siberian Railway line today?",
    "It is fully electrified and configured with double broad-gauge tracks throughout",
    ["It remains a single-track narrow gauge line operating on steam engines", "It runs entirely underground beneath the Siberian permafrost", "It operates exclusively on elevated monorail magnetic levitation"],
    "B",
    "The entire route of the Trans-Siberian Railway has been double-tracked and completely electrified.",
    "Identifies electrified double track standard."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Economic Significance", P4_TEXT,
    "What primary raw materials and commodities are transported along the Trans-Siberian line from Siberia?",
    "Lumber, timber, coal, iron ore, machinery, and agricultural grain",
    ["Tropical spices, tea, and natural rubber latex", "Raw silk, pearls, and ivory only", "Exclusively refined petroleum shipped in wooden casks"],
    "C",
    "The railway opens the vast natural wealth of Siberia, hauling timber, ores, coking coal, grain, and manufactured heavy machinery.",
    "Identifies timber, minerals, coal, and grain as primary freight."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Asian Russia Integration", P4_TEXT,
    "Which Asian countries are connected to the Trans-Siberian railway network via southern branch lines?",
    "Mongolia and China (via Ulaanbaatar and Harbin/Beijing)",
    ["India and Sri Lanka", "Iran and Saudi Arabia", "Myanmar and Thailand"],
    "D",
    "Branch lines connect the Trans-Siberian network at Ulan-Ude to Ulaanbaatar (Mongolia) and onwards to Beijing (China).",
    "Identifies Mongolia and China as southern rail connections."
))

# =================================================================================================
# PASSAGE 5: Demographic Transition Theory (Book 1, Chapter 2)
# =================================================================================================
P5_TEXT = """Demographic Transition Theory describes and predicts the future population of any area by analyzing how society progresses from high birth rates and high death rates to low birth rates and low death rates as it transforms from a rural, agrarian, and illiterate community to an urban, industrial, and literate society. The transition occurs in three distinct stages. In Stage I, both birth and death rates are high, resulting in slow and fluctuating population growth; life expectancy is low and epidemics and food shortages are frequent. In Stage II, death rates decline sharply due to improvements in sanitation and medical healthcare, while fertility remains high initially, resulting in a massive natural increase and population explosion. In Stage III, both fertility and mortality decline significantly, converging at low levels, leading to stable or very slow population growth."""

add_p(make_pq(
    "World Population", "Core Proposition of DTT", P5_TEXT,
    "What fundamental societal shift underlies the Demographic Transition Theory?",
    "Transformation from a rural, agrarian, and illiterate society to an urban, industrial, and literate society",
    ["Transition from space colonization to primitive hunting", "A shift from democratic governance to feudal monarchy", "A change from digital telecommunications to stone inscription"],
    "A",
    "Demographic transition tracks demographic shifts alongside urbanization, industrialization, and rising literacy.",
    "Identifies rural agrarian to urban industrial modernization as driver of transition."
))

add_p(make_pq(
    "World Population", "Stage I Characteristics", P5_TEXT,
    "What are the demographic hallmarks of Stage I of the Demographic Transition?",
    "High birth rates and high death rates, low life expectancy, and slow or fluctuating population growth",
    ["Zero birth rates and negative population growth", "Low birth rates and high death rates with rapid extinction", "Extremely high life expectancy exceeding 90 years"],
    "B",
    "In Stage I, high fertility is balanced by high mortality, keeping net population growth low and erratic.",
    "Identifies high fertility and high mortality in Stage I."
))

add_p(make_pq(
    "World Population", "Stage II Population Explosion", P5_TEXT,
    "Why does rapid population expansion occur in Stage II of the demographic transition?",
    "Mortality declines rapidly due to healthcare improvements while fertility remains persistently high",
    ["Both birth and death rates double simultaneously", "Fertility drops to zero while immigration triples", "Infant mortality increases to 90%"],
    "C",
    "The widening gap between declining death rates (due to sanitation/medicine) and high birth rates produces rapid net natural increase.",
    "Identifies falling mortality alongside high fertility as driver of Stage II population surge."
))

add_p(make_pq(
    "World Population", "Stage III Equilibrium", P5_TEXT,
    "What characterizes the demographic regime of Stage III?",
    "Both fertility and mortality decline to low levels, leading to population stability or very slow growth",
    ["Extremely high infant mortality with skyrocketing family size", "Birth rates rising exponentially above 60 per thousand", "Complete depopulation within two generations"],
    "D",
    "In Stage III, controlled fertility matches low mortality, stabilizing population numbers.",
    "Identifies low birth and death rates stabilizing population in Stage III."
))

add_p(make_pq(
    "World Population", "Socio-economic Indicators", P5_TEXT,
    "Which public health intervention is primarily responsible for triggering the transition from Stage I to Stage II?",
    "Improvements in sanitation, clean drinking water, and access to medical healthcare",
    ["Widespread prohibition of all marriages", "Destruction of urban sewer lines", "Mandatory emigration of senior citizens"],
    "A",
    "The decline in death rates in Stage II is triggered by modern healthcare, disease control, and sanitation.",
    "Identifies sanitation and medical healthcare as catalysts for death rate reduction."
))

# =================================================================================================
# PASSAGE 6: Mediterranean Agriculture and Viticulture (Book 1, Chapter 5)
# =================================================================================================
P6_TEXT = """Mediterranean agriculture is a highly specialized commercial farming system practiced in countries bordering the Mediterranean Sea in Europe and North Africa, central Chile, California's Central Valley, the south-western tip of South Africa, and south-western and southern Australia. It is characterized by hot, dry summers and mild, wet winters. Viticulture, or grape cultivation, is a specialty of this region. The best quality wines in the world with distinctive flavors are produced from high-grade grapes in European Mediterranean countries like France, Italy, and Spain. Inferior grapes are dried into raisins and currants. This region is also renowned for commercial citrus fruits like oranges, lemons, and grapefruits, alongside olives and figs, catering to premium urban consumer markets across northern Europe and North America."""

add_p(make_pq(
    "Primary Activities", "Mediterranean Viticulture", P6_TEXT,
    "What is the term specifically used to denote the intensive commercial cultivation of grapes in Mediterranean agriculture?",
    "Viticulture",
    ["Sericulture", "Pisciculture", "Apiculture"],
    "B",
    "Viticulture is the specialized agricultural branch dealing with the cultivation of grapevines.",
    "Identifies viticulture as commercial grape farming."
))

add_p(make_pq(
    "Primary Activities", "Climatic Regime", P6_TEXT,
    "Which climatic characteristic provides the ideal environmental conditions for Mediterranean agriculture?",
    "Hot, dry summers and mild, rainy winters",
    ["Continuous torrential rainfall throughout all 12 months with no sunshine", "Sub-zero temperatures with permanent permafrost year-round", "Extremely humid summers and freezing dry winters"],
    "C",
    "Mediterranean climate is defined by dry summers under subtropical high pressure and wet winters with westerly depressions.",
    "Identifies hot dry summers and mild wet winters."
))

add_p(make_pq(
    "Primary Activities", "Global Distribution", P6_TEXT,
    "Apart from the Mediterranean basin, in which other region is Mediterranean agriculture commercially practiced?",
    "Central California, Central Chile, and south-western tip of South Africa",
    ["Siberian plains and northern Scandinavia", "Amazon river basin in Brazil", "Gobi desert and Tibetan plateau"],
    "D",
    "Mediterranean farming extends to Mediterranean climate zones: California, Central Chile, Cape Province (South Africa), and SW/South Australia.",
    "Identifies California, Chile, and SW South Africa as Mediterranean agricultural zones."
))

add_p(make_pq(
    "Primary Activities", "Processed Fruit Products", P6_TEXT,
    "What are inferior or surplus grapes processed into within Mediterranean farming systems?",
    "Raisins and currants",
    ["Industrial crude rubber", "Bio-diesel and heavy furnace fuel", "High-protein cattle bone meal"],
    "A",
    "Superior grapes produce fine vintage wines, while inferior grapes are dried into raisins (sultanas) and currants.",
    "Identifies raisins and currants as dried grape products."
))

add_p(make_pq(
    "Primary Activities", "Specialty Orchard Crops", P6_TEXT,
    "Which group of fruit crops is famously associated with the Mediterranean agricultural economy?",
    "Citrus fruits (oranges, lemons), olives, and figs",
    ["Apples, cherries, and cranberries exclusively", "Bananas, coconuts, and oil palm", "Sugarcane, rubber, and jute"],
    "B",
    "The Mediterranean region is the premier producer of citrus fruits, olives, figs, and grapes.",
    "Identifies citrus fruits, olives, and figs as signature orchard crops."
))

# =================================================================================================
# PASSAGE 7: Human Development Concept (Book 1, Chapter 3)
# =================================================================================================
P7_TEXT = """The concept of Human Development was introduced by Pakistani economist Dr. Mahbub ul Haq in 1990. Dr. Haq described human development as development that enlarges people's choices and improves their lives. People are central to all development, and the purpose of development is to create conditions where people can lead meaningful lives with dignity. Nobel laureate Prof. Amartya Sen saw the primary objective of development as the expansion of human freedom and capabilities. The Human Development Index (HDI), published annually by the United Nations Development Programme (UNDP), ranks countries based on their achievements across three key dimensions: health (measured by life expectancy at birth), education (measured by expected and mean years of schooling), and access to resources (measured by purchasing power parity in US dollars). Four pillars sustain human development: equity, sustainability, productivity, and empowerment."""

add_p(make_pq(
    "Human Development", "Founders of Human Development", P7_TEXT,
    "Who pioneered the concept of Human Development and formulated the Human Development Index in 1990?",
    "Dr. Mahbub ul Haq",
    ["Adam Smith", "Karl Marx", "Thomas Malthus"],
    "C",
    "Dr. Mahbub ul Haq created the concept of Human Development and led the publication of the first Human Development Report in 1990.",
    "Identifies Dr. Mahbub ul Haq as the pioneer of Human Development."
))

add_p(make_pq(
    "Human Development", "Amartya Sen Perspective", P7_TEXT,
    "According to Prof. Amartya Sen, what constitutes the fundamental objective of development?",
    "Expansion of human freedoms, capabilities, and removal of unfreedoms",
    ["Maximization of gross industrial factory output regardless of social inequality", "Accumulation of gold reserves by the central banking treasury", "Compulsory state conscription into heavy mining industries"],
    "D",
    "Amartya Sen conceptualized development as 'Development as Freedom' — expanding substantive freedoms and human capabilities.",
    "Identifies expansion of human freedom and capabilities as Amartya Sen's philosophy."
))

add_p(make_pq(
    "Human Development", "Three Dimensions of HDI", P7_TEXT,
    "Which three fundamental dimensions are measured to compute the UNDP Human Development Index?",
    "Health (life expectancy), education (schooling years), and standard of living (purchasing power)",
    ["Military expenditure, naval fleet size, and nuclear stockpile", "Number of automobiles, skyscraper density, and gold holdings", "Agricultural land area, fertilizer consumption, and tractor density"],
    "A",
    "The HDI synthesizes three core indicators: health (life expectancy), education (mean/expected years of schooling), and command over resources (income/PPP).",
    "Identifies health, education, and access to resources as HDI components."
))

add_p(make_pq(
    "Human Development", "Pillars of Human Development", P7_TEXT,
    "Which of the following represents the four foundational pillars of human development?",
    "Equity, Sustainability, Productivity, and Empowerment",
    ["Capitalism, Socialism, Imperialism, and Feudalism", "Exploitation, Urbanization, Centralization, and Mechanization", "Taxes, Tariffs, Subsidies, and Deficits"],
    "B",
    "The four pillars of human development are Equity (equal opportunity), Sustainability (continuity in availability), Productivity (capacity building), and Empowerment (freedom to make choices).",
    "Identifies Equity, Sustainability, Productivity, and Empowerment as the 4 pillars."
))

add_p(make_pq(
    "Human Development", "Meaning of Meaningful Life", P7_TEXT,
    "In the context of human development, what does leading a 'meaningful life' signify?",
    "A life where people are healthy, develop their talents, participate in society, and are free to achieve their goals",
    ["Merely surviving biologically for as many years as possible without any choices", "Earning millions of dollars by working 20 hours a day in isolation", "Obeying central administrative directives without questioning"],
    "C",
    "A meaningful life is not merely long life, but a life with purpose, capability, dignity, social participation, and genuine choices.",
    "Explains meaningful life as capability, self-determination, and active participation."
))

# =================================================================================================
# PASSAGE 8: Dharavi Slum and Urban Environmental Stress (Book 2, Chapter 12)
# =================================================================================================
P8_TEXT = """Dharavi, situated in central Mumbai, is widely recognized as one of the largest slums in Asia. Spanning over 2.1 square kilometers, it houses an estimated population of over 700,000 to one million people, creating an astounding population density. Originating in the late nineteenth century as a swampy edge inhabited by Koli fishermen, it progressively absorbed migrants from Gujarat (potters creating Kumbharwada), Tamil Nadu (leather tanners), and Uttar Pradesh (embroidery and garment artisans). Dharavi is simultaneously a bustling hub of informal enterprise, generating an estimated annual economic turnover exceeding 1 billion US dollars through recycling, leather processing, pottery, and textiles. However, this economic dynamism stands in stark contrast to its appalling living conditions: extreme overcrowding, open sewage ditches, narrow dark alleys, acute shortage of potable water, and an infamous ratio of one toilet serving hundreds of residents."""

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Dharavi Location", P8_TEXT,
    "In which metropolitan city of India is the slum settlement of Dharavi located?",
    "Central Mumbai, Maharashtra",
    ["Old Delhi, NCT of Delhi", "North Kolkata, West Bengal", "Central Bengaluru, Karnataka"],
    "D",
    "Dharavi is situated in central Mumbai between the western and central suburban railway lines.",
    "Identifies Mumbai as the host city of Dharavi."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Informal Economy of Dharavi", P8_TEXT,
    "What distinctive economic role does Dharavi perform despite its severe living constraints?",
    "A vibrant informal manufacturing and recycling hub generating over 1 billion dollars annually",
    ["An exclusively state-owned space satellite manufacturing facility", "An agricultural cooperative producing organic basmati rice", "A heavy military dockyard repairing aircraft carriers"],
    "A",
    "Dharavi houses thousands of informal units engaged in plastic/scrap recycling, pottery, leather craft, and garment fabrication.",
    "Identifies Dharavi as a thriving informal recycling and manufacturing cluster."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Kumbharwada Community", P8_TEXT,
    "Which migrant community established the famous traditional pottery quarter known as 'Kumbharwada' in Dharavi?",
    "Potters migrating from Gujarat",
    ["Weavers from Kashmir", "Fishermen from Kerala", "Coal miners from Dhanbad"],
    "B",
    "Kumbharwada was established in Dharavi by traditional potter families migrating from rural Saurashtra/Gujarat in the 19th century.",
    "Identifies Gujarati potter migrants as founders of Kumbharwada."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Environmental and Civic Deficits", P8_TEXT,
    "What acute sanitation deficit characterizes the daily living environment in Dharavi?",
    "Severe shortage of toilets, open unpaved sewage drains, and contaminated living spaces",
    ["Over-abundance of luxury swimming pools wasting drinking water", "Zero presence of human residents leading to abandoned ghost streets", "Excessive forest tree cover blocking vehicular movement"],
    "C",
    "Dharavi suffers from extreme sanitation distress, open sewage, lack of private toilets, and overflowing public latrines.",
    "Identifies critical sanitation and toilet shortages as primary civic crisis."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Historical Origins", P8_TEXT,
    "Who were the original indigenous inhabitants of the marshy island creek before Dharavi expanded into an urban slum?",
    "Koli fishermen community",
    ["Bhutia pastoralists", "Gaddi shepherds", "Santhal coal diggers"],
    "D",
    "The area was originally a swampy mangrove creek inhabited by the indigenous Koli fishing community of Bombay.",
    "Identifies Koli fishermen as the earliest inhabitants of Dharavi."
))

# =================================================================================================
# PASSAGE 9: Haryali and Watershed Management in India (Book 2, Chapter 6)
# =================================================================================================
P9_TEXT = """Watershed management refers to the efficient and sustainable management and conservation of surface and groundwater resources. It includes conservation, recharge, and judicious use of water through check dams, percolation tanks, and recharge wells. The Central Government sponsored the 'Haryali' watershed development project executed by Gram Panchayats with people's active participation. Its aim is to enable rural populations to conserve water for drinking, irrigation, fisheries, and afforestation. Successful community watershed initiatives include 'Neeru-Meeru' (Water and You) in Andhra Pradesh and 'Arvary Pani Sansad' in Alwar, Rajasthan, where local villagers constructed percolation ponds and check dams ('johads'). Watershed development has helped replenish depleted aquifers, increase crop productivity, expand vegetative cover, and revive dry seasonal rivulets into perennial watercourses."""

add_p(make_pq(
    "Water Resources", "Central Watershed Programme", P9_TEXT,
    "Which Central Government-sponsored watershed development project is executed at the village level by Gram Panchayats?",
    "Haryali",
    ["Operation Flood", "Pradhan Mantri Gram Sadak Yojana", "Swachh Vidyalaya Abhiyan"],
    "A",
    "Haryali is a landmark watershed management project sponsored by the Central Government and executed through Gram Panchayats.",
    "Identifies Haryali as the Central Government watershed programme."
))

add_p(make_pq(
    "Water Resources", "Arvary Pani Sansad", P9_TEXT,
    "In which district of Rajasthan was the famous 'Arvary Pani Sansad' community water harvesting movement initiated?",
    "Alwar",
    ["Jaisalmer", "Bikaner", "Kota"],
    "B",
    "The Arvary Pani Sansad was organized in Alwar district of Rajasthan, led by water conservationist Rajendra Singh.",
    "Identifies Alwar as the location of Arvary Pani Sansad."
))

add_p(make_pq(
    "Water Resources", "Neeru-Meeru Programme", P9_TEXT,
    "Which Indian state pioneered the participatory water conservation programme known as 'Neeru-Meeru' (Water and You)?",
    "Andhra Pradesh",
    ["Punjab", "Assam", "Kerala"],
    "C",
    "The Neeru-Meeru programme was launched in Andhra Pradesh to promote public water harvesting and groundwater percolation.",
    "Identifies Andhra Pradesh as the state of the Neeru-Meeru programme."
))

add_p(make_pq(
    "Water Resources", "Traditional Water Harvesting Structures", P9_TEXT,
    "What traditional water harvesting structures were constructed by villagers in Rajasthan to revive the Arvari river basin?",
    "Johads and earthen check dams",
    ["Tube wells driven by diesel pumps", "Multi-tier canal aqueducts built of steel", "Concrete coastal storm sea-walls"],
    "D",
    "Villagers built indigenous earthen check dams called 'johads' to trap monsoon runoff and recharge underground aquifers.",
    "Identifies johads and earthen check dams as traditional harvesting structures."
))

add_p(make_pq(
    "Water Resources", "Watershed Ecological Outcomes", P9_TEXT,
    "What ecological benefits accrue to dryland regions following comprehensive watershed management?",
    "Recharge of groundwater aquifers, revival of dried streams, and expansion of green vegetative cover",
    ["Increase in severe soil erosion and dust storms", "Complete drying up of all local wells", "Rapid salinization of drinking water reservoirs"],
    "A",
    "Watershed treatments raise water table depths, sustain base flow in streams, and support biomass regeneration.",
    "Identifies groundwater recharge and stream rejuvenation as watershed benefits."
))

# =================================================================================================
# PASSAGE 10: Panama Canal and Inter-Oceanic Shipping (Book 1, Chapter 8)
# =================================================================================================
P10_TEXT = """The Panama Canal is an artificial 82-kilometer waterway in Central America that connects the Atlantic Ocean (via the Caribbean Sea) with the Pacific Ocean across the narrow Isthmus of Panama. Completed and opened by the United States in 1914, the canal severed North and South America. Unlike the sea-level Suez Canal, the Panama Canal traverses rugged mountainous terrain, necessitating an intricate lock system. Ships are lifted and lowered through three sets of twin locks — Gatun Locks on the Atlantic side, and Pedro Miguel and Miraflores Locks on the Pacific side — utilizing fresh water supplied by Lake Gatun, an artificial lake situated 26 meters above sea level. The canal dramatically shortened maritime transit, cutting approximately 13,000 kilometers from the hazardous voyage around Cape Horn at the southern tip of South America, facilitating brisk commercial exchange between the eastern seaboard of the United States and the Asia-Pacific basin."""

add_p(make_pq(
    "Transport, Communication and Trade", "Panama Canal Opening", P10_TEXT,
    "In which year was the Panama Canal officially opened for commercial shipping?",
    "1914",
    ["1869", "1945", "1898"],
    "B",
    "The Panama Canal was completed by the United States and opened to maritime traffic in August 1914.",
    "Identifies 1914 as the opening year of Panama Canal."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Lock System vs Sea Level", P10_TEXT,
    "Why does the Panama Canal require an elaborate lock system unlike the Suez Canal?",
    "Because ships must be elevated 26 meters above sea level to cross the rugged Continental Divide and Lake Gatun",
    ["Because the Atlantic Ocean is made of salt water while the Pacific is fresh water", "Because the Panama Canal flows entirely through an underwater subway", "Because gravity does not operate in Central America"],
    "C",
    "The Panama Canal cuts through the mountainous Continental Divide; locks raise and lower vessels over Lake Gatun (26 m above sea level).",
    "Identifies elevation of 26 meters across Continental Divide as reason for lock system."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Distance Shortened", P10_TEXT,
    "Approximately how many kilometers of maritime travel does the Panama Canal save compared to navigating around Cape Horn?",
    "About 13,000 kilometers between New York and San Francisco",
    ["Only 200 kilometers", "Over 50,000 kilometers", "It actually increases travel distance by 5,000 kilometers"],
    "D",
    "The canal reduces the sailing distance between New York and San Francisco by roughly 13,000 km.",
    "Identifies 13,000 km distance saved between eastern and western US coasts."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Panama Canal Locks", P10_TEXT,
    "Which of the following is one of the famous lock chambers operating on the Atlantic entrance of the Panama Canal?",
    "Gatun Locks",
    ["Sault Ste. Marie Locks", "Welland Locks", "St. Petersburg Locks"],
    "A",
    "The Gatun Locks lift ships up from the Atlantic/Caribbean side into Lake Gatun.",
    "Identifies Gatun Locks on the Atlantic side."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Intermediate Water Reservoir", P10_TEXT,
    "Which artificial lake provides the fresh water required to operate the lock chambers of the Panama Canal?",
    "Lake Gatun",
    ["Lake Superior", "Lake Titicaca", "Lake Victoria"],
    "B",
    "Lake Gatun, formed by damming the Chagres River, provides the water necessary to fill and drain the lock chambers.",
    "Identifies Lake Gatun as the water reservoir powering the locks."
))

# =================================================================================================
# PASSAGE 11: Tea Plantation Agriculture in Assam (Book 2, Chapter 5)
# =================================================================================================
P11_TEXT = """Tea is an indigenous crop of the hills in northern China, but commercial tea plantations were introduced into India by the British in the 1840s in the Brahmaputra valley of Assam. Tea is a sub-tropical plantation crop requiring a hot and humid climate with abundant rainfall (150 to 250 cm) distributed evenly throughout the year. Crucially, tea bushes cannot tolerate stagnant water around their roots; hence, well-drained, deep, friable loamy soil on undulating terrain or mountain slopes is essential. Tea is a labour-intensive industry requiring abundant, cheap, and skilled manual labour for plucking tender leaves, a task predominantly performed by women. Assam is the leading tea-producing state in India, accounting for more than half of the total national output, concentrated in the upper Brahmaputra plain, followed by West Bengal (Dooars, Terai, and Darjeeling)."""

add_p(make_pq(
    "Land Resources and Agriculture", "Topographical Requisite of Tea", P11_TEXT,
    "Why are tea plantations primarily situated on hill slopes and undulating rolling plains?",
    "Because tea bushes cannot tolerate stagnant water at their root systems and need excellent drainage",
    ["Because mountain winds blow away harmful insects without pesticides", "Because tea seeds only germinate when exposed to freezing snow", "Because tea plucking cannot be performed on flat terrain"],
    "C",
    "Waterlogging damages tea root systems; sloping topography ensures rapid water runoff and root aeration.",
    "Identifies need for excellent soil drainage preventing root waterlogging."
))

add_p(make_pq(
    "Land Resources and Agriculture", "Leading Tea Producing State", P11_TEXT,
    "Which state is India's premier tea producer, contributing more than half of the total domestic production?",
    "Assam",
    ["Kerala", "Tamil Nadu", "Himachal Pradesh"],
    "D",
    "Assam produces over 50% of India's annual tea harvest, followed by West Bengal.",
    "Identifies Assam as India's leading tea producing state."
))

add_p(make_pq(
    "Land Resources and Agriculture", "Labour Dynamic of Tea Plucking", P11_TEXT,
    "Why does tea plucking predominantly employ a high proportion of female workers?",
    "Because plucking tender tea leaves is a delicate, labour-intensive operation requiring patience and dexterity",
    ["Because men are legally prohibited from working on agricultural plantations in India", "Because tea processing can only be operated without modern electricity", "Because female workers receive free tea leaves as sole wages"],
    "A",
    "Plucking 'two leaves and a bud' demands fine dexterity and patience, leading to heavy employment of female labor.",
    "Identifies manual dexterity and patience required for plucking two leaves and a bud."
))

add_p(make_pq(
    "Land Resources and Agriculture", "Historical Introduction", P11_TEXT,
    "Who introduced commercial tea plantations to the Brahmaputra valley of Assam in the 1840s?",
    "The British colonial administration",
    ["Portuguese traders from Goa", "Mughal emperors from Agra", "French botanists from Pondicherry"],
    "B",
    "The British East India Company introduced commercial tea plantations to Assam during the 1840s.",
    "Identifies British introduction of tea plantations in Assam."
))

add_p(make_pq(
    "Land Resources and Agriculture", "Climatic Requirements", P11_TEXT,
    "What ideal climatic conditions are essential for healthy commercial tea bush cultivation?",
    "Hot and humid climate with 150 to 250 cm well-distributed rainfall and absence of severe frost",
    ["Arid desert climate with less than 20 cm annual rainfall", "Continuous sub-zero freezing temperatures with severe frost", "Dry Mediterranean summers with zero cloud cover"],
    "C",
    "Tea flourishes in warm, humid sub-tropical conditions with frequent showers distributed evenly throughout the year.",
    "Identifies hot, humid climate with 150-250 cm rainfall and absence of frost."
))

# =================================================================================================
# PASSAGE 12: Konkan Railway Engineering Marvel (Book 2, Chapter 10)
# =================================================================================================
P12_TEXT = """The construction of the Konkan Railway in 1998 is one of the greatest engineering feats in the history of Indian Railways. Stretching over a length of 760 kilometers, this route connects Roha in Maharashtra to Thokur near Mangaluru in Karnataka, traversing through Maharashtra, Goa, and Karnataka. Prior to this route, traveling between Mumbai and Mangaluru required an arduous, circuitous inland detour through the Deccan plateau. The rail line cuts through the rugged Western Ghats, an inhospitable terrain prone to severe landslides, torrential monsoon downpours, and turbulent river valleys. The railway project required the construction of 146 major rivers and streams, nearly 2,000 bridges, and 91 tunnels spanning a collective length of 84 kilometers. Among these is Asia's longest railway tunnel at Karbude, extending over 6.5 kilometers. It reduced travel time between Mumbai and Kochi by nearly 12 hours."""

add_p(make_pq(
    "Transport and Communication", "Konkan Railway Route Terminals", P12_TEXT,
    "Which two terminal stations mark the endpoints of the 760-kilometer Konkan Railway route?",
    "Roha in Maharashtra and Thokur near Mangaluru in Karnataka",
    ["Mumbai CST and Panaji in Goa", "Ahmedabad in Gujarat and Kozhikode in Kerala", "Pune in Maharashtra and Chennai Central in Tamil Nadu"],
    "D",
    "The Konkan Railway extends 760 km from Roha (Maharashtra) in the north to Thokur (Karnataka) in the south.",
    "Identifies Roha and Thokur as Konkan Railway terminals."
))

add_p(make_pq(
    "Transport and Communication", "Karbude Tunnel Distinction", P12_TEXT,
    "What engineering distinction is associated with the 'Karbude Tunnel' on the Konkan Railway line?",
    "It is one of Asia's longest railway tunnels, measuring approximately 6.5 kilometers in length",
    ["It is the world's highest tunnel excavated through active volcanic basalt", "It is an underwater tube running beneath the Arabian Sea", "It is built entirely of polished teak wood timber"],
    "A",
    "The Karbude tunnel near Ratnagiri is 6.5 km long, ranking among the longest railway tunnels in Asia.",
    "Identifies Karbude tunnel as 6.5 km long engineering landmark."
))

add_p(make_pq(
    "Transport and Communication", "Participating States", P12_TEXT,
    "Which Indian states are direct geographic and financial partners in the Konkan Railway Corporation?",
    "Maharashtra, Goa, Karnataka, and Kerala",
    ["Punjab, Haryana, Rajasthan, and Gujarat", "Odisha, West Bengal, Bihar, and Jharkhand", "Assam, Meghalaya, Tripura, and Mizoram"],
    "B",
    "Konkan Railway operates through Maharashtra, Goa, Karnataka, with Kerala as a partner beneficiary.",
    "Identifies Maharashtra, Goa, Karnataka, and Kerala as partner states."
))

add_p(make_pq(
    "Transport and Communication", "Terrain Challenges", P12_TEXT,
    "What formidable physiographic obstacles did engineers conquer during the construction of the Konkan Railway?",
    "Rugged terrain of the Western Ghats, flash floods, deep river gorges, and frequent landslides",
    ["Shifting sand dunes of the Thar desert", "Permanent glacial ice crevasses of the Greater Himalayas", "Vast marshy mangrove creeks of the Sundarbans"],
    "C",
    "The Western Ghats presented intense engineering challenges: precipitous scarps, 146 river crossings, and heavy tropical rain.",
    "Identifies rugged Western Ghats terrain, monsoonal torrents, and landslides."
))

add_p(make_pq(
    "Transport and Communication", "Socio-Economic Impact", P12_TEXT,
    "How did the commissioning of the Konkan Railway transform passenger travel between Mumbai and Kochi?",
    "It curtailed travel journey time by approximately 12 hours compared to the older inland route",
    ["It lengthened transit time by three entire days", "It eliminated passenger traffic completely in favour of ore trains", "It forced all passengers to disembark and take ferries at Goa"],
    "D",
    "The direct coastal route cut travel time between Mumbai and Kerala (Kochi) by around 12 hours.",
    "Identifies 12-hour travel time reduction between Mumbai and Kochi."
))

# =================================================================================================
# PASSAGE 13: Iron and Steel Industry at Jamshedpur (Book 2, Chapter 8)
# =================================================================================================
P13_TEXT = """The Tata Iron and Steel Company (TISCO) at Jamshedpur, founded by Jamsetji Tata and established in 1907, is the oldest integrated steel plant in India. Its location is an ideal demonstration of Alfred Weber's raw material-oriented industrial location theory. High-grade hematite iron ore is sourced from Noamundi and Badampahar in the Gorumahisani belt of Mayurbhanj and Paschimi Singhbhum. Coking coal is brought from the Jharia and West Bokaro coalfields, located approximately 180 km away. Limestone and dolomite fluxes are supplied from Birmitrapur in Sundargarh (Odisha). Plentiful perennial water supplies for cooling the blast furnaces are obtained from the confluence of the Subarnarekha and Kharkai rivers. Finished steel products enjoy direct rail access to the vast domestic market and export facilities through Kolkata Port, situated 240 km to the east."""

add_p(make_pq(
    "Mineral and Energy Resources", "TISCO Water Supply", P13_TEXT,
    "Which two perennial rivers meet at Jamshedpur to provide uninterrupted water supplies to the TISCO steel plant?",
    "Subarnarekha and Kharkai rivers",
    ["Damodar and Barakar rivers", "Ganga and Yamuna rivers", "Mahanadi and Brahmani rivers"],
    "A",
    "TISCO is located at Sakchi (Jamshedpur) at the confluence of the Subarnarekha and Kharkai rivers.",
    "Identifies Subarnarekha and Kharkai rivers as water sources."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Iron Ore Sourcing", P13_TEXT,
    "From which nearby mining belts does Jamshedpur source its primary supplies of hematite iron ore?",
    "Gorumahisani, Noamundi, and Badampahar in Odisha and Jharkhand",
    ["Bailadila and Dalli-Rajhara in Chhattisgarh", "Kudremukh and Bababudan in Karnataka", "Ratnagiri and Chandrapur in Maharashtra"],
    "B",
    "TISCO draws its iron ore from the Gorumahisani, Badampahar (Mayurbhanj), and Noamundi (Singhbhum) mines.",
    "Identifies Noamundi, Badampahar, and Gorumahisani as iron ore mines."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Coking Coal Origin", P13_TEXT,
    "Which coalfields supply essential metallurgical coking coal to the blast furnaces at Jamshedpur?",
    "Jharia and West Bokaro coalfields",
    ["Raniganj and Asansol coalfields exclusively", "Singareni coalfield in Telangana", "Neyveli lignite mines in Tamil Nadu"],
    "C",
    "Jamshedpur obtains its coking coal from the nearby Jharia and Bokaro coal basins.",
    "Identifies Jharia and Bokaro as the coking coal suppliers."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Industrial Location Principle", P13_TEXT,
    "Which industrial location principle best explains the spatial positioning of the TISCO plant at Jamshedpur?",
    "Location governed by Weber's principle of raw material weight-losing orientation and nodality",
    ["Pure market attraction with zero consideration of mineral freight", "Footloose positioning dependent solely on clean atmospheric air", "Location dictated exclusively by cheap international ocean shipping"],
    "D",
    "Iron and steel manufacture utilizes heavy, weight-losing raw materials (iron ore, coal, limestone), making raw material proximity paramount.",
    "Identifies raw material weight-losing orientation (Weber's theory)."
))

add_p(make_pq(
    "Mineral and Energy Resources", "Port and Market Gateway", P13_TEXT,
    "Which major seaport, located approximately 240 km away, provides export facilities and capital goods access to Jamshedpur?",
    "Kolkata Port",
    ["Kandla Port", "Marmagao Port", "Cochin Port"],
    "A",
    "Kolkata Port serves as the premier ocean gateway and trading outlet for the Chotanagpur heavy industrial zone.",
    "Identifies Kolkata Port as the maritime gateway for Jamshedpur."
))

# =================================================================================================
# PASSAGE 14: Inland Waterways of Europe: The Rhine (Book 1, Chapter 8)
# =================================================================================================
P14_TEXT = """The Rhine Waterway is the world's most heavily utilized inland navigable waterway, traversing through Switzerland, Germany, France, and the Netherlands. Originating in the Swiss Alps, the river flows through a scenic rift valley and the industrial heartland of Europe before discharging into the North Sea at Rotterdam. Navigable for approximately 700 kilometers from Basel to its ocean mouth, the Rhine connects the rich Ruhr coalfield and industrial complex with world maritime trade. Ocean-going vessels can navigate up to Cologne, while specialized river barges navigate up to Basel. The river flows through dense manufacturing districts, chemical plants, and steel mills, moving massive volumes of bulk freight including coal, iron ore, chemicals, machinery, and agricultural goods. It links with the Danube via the Rhine-Main-Danube canal, creating a trans-continental waterway connecting the North Sea with the Black Sea."""

add_p(make_pq(
    "Transport, Communication and Trade", "Rhine Ocean Outlet", P14_TEXT,
    "At which major world seaport does the Rhine River waterway discharge into the North Sea?",
    "Rotterdam, Netherlands",
    ["Hamburg, Germany", "Antwerp, Belgium", "Le Havre, France"],
    "B",
    "The Rhine flows through the Netherlands and empties into the North Sea at Europoort/Rotterdam.",
    "Identifies Rotterdam as the ocean terminal of the Rhine."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Inland Navigable Reach", P14_TEXT,
    "Up to which Swiss city is the Rhine Waterway navigable for commercial river barges?",
    "Basel",
    ["Zurich", "Geneva", "Bern"],
    "C",
    "The Rhine is navigable for commercial river barges all the way inland to Basel in Switzerland.",
    "Identifies Basel as the upstream terminal of the Rhine waterway."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Industrial Heartland Served", P14_TEXT,
    "Which premier European industrial and coalfield region is directly traversed and sustained by the Rhine Waterway?",
    "The Ruhr industrial region in Germany",
    ["The Donbas basin in Ukraine", "The Po Valley in Italy", "The Midlands industrial basin in England"],
    "D",
    "The Rhine flows directly past the Ruhr industrial basin, Europe's foremost heavy industrial agglomeration.",
    "Identifies the Ruhr industrial region of Germany."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Trans-Continental Water Link", P14_TEXT,
    "Which engineering canal connects the Rhine river system with the Danube river, linking the North Sea to the Black Sea?",
    "Rhine-Main-Danube Canal",
    ["Kiel Canal", "St. Lawrence Seaway", "Erie Canal"],
    "A",
    "The Rhine-Main-Danube canal links the Rhine basin with the Danube river, connecting the North Sea with the Black Sea.",
    "Identifies the Rhine-Main-Danube Canal."
))

add_p(make_pq(
    "Transport, Communication and Trade", "Freight Composition", P14_TEXT,
    "What types of cargo constitute the predominant traffic moving along the Rhine Waterway?",
    "Bulky raw materials and industrial commodities such as coal, iron ore, chemicals, and machinery",
    ["Only fresh tropical fruits and live livestock", "Strictly nuclear radioactive waste canisters", "Pure gold bullion and currency notes exclusively"],
    "B",
    "Inland waterways excel at transporting heavy, bulky, non-perishable goods like ores, coal, fertilizers, and heavy chemicals.",
    "Identifies bulky industrial raw materials (coal, iron ore, chemicals) as main freight."
))

# =================================================================================================
# PASSAGE 15: Urban Settlements and Mega Cities (Book 1, Chapter 10 & Book 2, Chapter 4)
# =================================================================================================
P15_TEXT = """Urban settlements are generally large, compact, and engaged in non-agricultural secondary, tertiary, and quaternary pursuits. The process of urbanization has accelerated globally, leading to the rapid emergence of metropolitan cities and mega cities. According to the United Nations, a 'mega city' or 'megapolis' is an urban agglomeration with a total population exceeding 10 million inhabitants. The world's first city to attain a population of one million was London around 1800, followed by Paris in 1850 and New York in 1860. In India, Census classifies urban centers into six classes, where Class I cities have populations over 100,000. Million-plus cities are designated as metropolitan centers, while urban giants like Greater Mumbai, Delhi, and Kolkata have surpassed the 10-million threshold, functioning as global economic powerhouses while confronting severe infrastructural deficits, housing shortages, and environmental degradation."""

add_p(make_pq(
    "Human Settlements", "Mega City Population Threshold", P15_TEXT,
    "According to the United Nations standard, what is the minimum population required for an urban agglomeration to be designated a 'mega city'?",
    "10 million inhabitants (1 crore)",
    ["1 million inhabitants (10 lakh)", "500,000 inhabitants", "50 million inhabitants"],
    "C",
    "The United Nations defines a mega city as an urban agglomeration having a population of 10 million or more.",
    "Identifies 10 million inhabitants as the threshold for a mega city."
))

add_p(make_pq(
    "Human Settlements", "First Million City in History", P15_TEXT,
    "Which world city was the first to cross the historic demographic milestone of one million inhabitants around 1800?",
    "London",
    ["Rome", "Tokyo", "Beijing"],
    "D",
    "London became the first modern city to reach a population of one million around 1800 AD.",
    "Identifies London as the first city to reach 1 million population."
))

add_p(make_pq(
    "Human Settlements", "Indian Census Urban Classification", P15_TEXT,
    "In Indian census terminology, what is the population qualification for an urban center to be classified as a 'Class I city'?",
    "Population of 100,000 (1 lakh) and above",
    ["Population between 10,000 and 19,999", "Population strictly below 5,000", "Population exceeding 50 million"],
    "A",
    "Class I cities in India are urban centers with a population of 100,000 or more.",
    "Identifies 100,000 and above as the threshold for Class I urban centers."
))

add_p(make_pq(
    "Human Settlements", "Indian Mega Cities Examples", P15_TEXT,
    "Which group of Indian cities qualifies as 'mega cities' having crossed the 10-million population benchmark?",
    "Greater Mumbai, Delhi, and Kolkata",
    ["Shimla, Manali, and Dharamshala", "Panaji, Margao, and Vasco", "Agartala, Kohima, and Aizawl"],
    "B",
    "Greater Mumbai, Delhi, and Kolkata are premier Indian mega-cities with agglomeration populations exceeding 10 million.",
    "Identifies Greater Mumbai, Delhi, and Kolkata as mega cities."
))

add_p(make_pq(
    "Human Settlements", "Functional Nature of Urban Settlements", P15_TEXT,
    "What fundamentally distinguishes urban settlements from rural settlements functionally?",
    "Urban settlements depend primarily on secondary, tertiary, and quaternary economic activities rather than primary agriculture",
    ["Urban settlements have zero commercial shops", "Urban residents are engaged exclusively in shifting cultivation and gathering", "Rural settlements always have higher population densities than cities"],
    "C",
    "Rural settlements draw sustenance from primary activities (farming/fishing/forestry), whereas urban settlements thrive on manufacturing and services.",
    "Contrasts non-primary urban functions with agrarian rural pursuits."
))

# =================================================================================================
# PASSAGE 16: Golden Quadrilateral & NHDP (Book 2, Chapter 10)
# =================================================================================================
P16_TEXT = """The National Highways Development Project (NHDP) initiated by the Government of India represents the most ambitious highway expansion program in the nation's history, implemented by the National Highways Authority of India (NHAI). The flagship component of this project is the 'Golden Quadrilateral' (GQ), comprising 5,846 kilometers of 4/6-lane high-density express corridors connecting India's four major mega-metropolises: Delhi, Mumbai, Chennai, and Kolkata. Alongside the GQ, the project includes the North-South Corridor (4,076 km connecting Srinagar in Jammu and Kashmir with Kanniyakumari in Tamil Nadu) and the East-West Corridor (3,640 km connecting Silchar in Assam with Porbandar in Gujarat). These two corridors intersect at Jhansi in Uttar Pradesh. The development of these world-class expressways has drastically compressed travel times, eliminated bottlenecks, and spurred industrial corridor expansion across the hinterlands."""

add_p(make_pq(
    "Transport and Communication", "GQ Total Length", P16_TEXT,
    "What is the total operational route length of the Golden Quadrilateral highway network in India?",
    "5,846 kilometers",
    ["10,500 kilometers", "3,200 kilometers", "1,200 kilometers"],
    "D",
    "The Golden Quadrilateral highway network spans an exact total length of 5,846 kilometers.",
    "Identifies 5,846 km as the length of Golden Quadrilateral."
))

add_p(make_pq(
    "Transport and Communication", "Corridor Intersection Node", P16_TEXT,
    "At which historic junction city in Uttar Pradesh do the North-South and East-West express corridors intersect?",
    "Jhansi",
    ["Varanasi", "Agra", "Kanpur"],
    "A",
    "The North-South Corridor and East-West Corridor intersect at Jhansi in southern Uttar Pradesh.",
    "Identifies Jhansi as the intersection node of the two national corridors."
))

add_p(make_pq(
    "Transport and Communication", "Terminals of East-West Corridor", P16_TEXT,
    "Which two peripheral cities form the eastern and western terminals of the East-West Corridor?",
    "Silchar in Assam and Porbandar in Gujarat",
    ["Guwahati in Assam and Mumbai in Maharashtra", "Kolkata in West Bengal and Kandla in Gujarat", "Imphal in Manipur and Surat in Gujarat"],
    "B",
    "The East-West Corridor spans 3,640 km connecting Silchar (Assam) in the east to Porbandar (Gujarat) in the west.",
    "Identifies Silchar and Porbandar as East-West Corridor terminals."
))

add_p(make_pq(
    "Transport and Communication", "Terminals of North-South Corridor", P16_TEXT,
    "What are the terminal points of the 4,076-kilometer North-South Corridor?",
    "Srinagar in Jammu & Kashmir and Kanniyakumari in Tamil Nadu",
    ["Leh in Ladakh and Kochi in Kerala", "Jammu in J&K and Madurai in Tamil Nadu", "Amritsar in Punjab and Kanyakumari in Tamil Nadu"],
    "C",
    "The North-South Corridor extends from Srinagar in the north to Kanniyakumari at the southern tip of mainland India.",
    "Identifies Srinagar and Kanniyakumari as North-South Corridor terminals."
))

add_p(make_pq(
    "Transport and Communication", "Implementing Agency", P16_TEXT,
    "Which autonomous statutory organization was entrusted with the construction and operation of the NHDP?",
    "National Highways Authority of India (NHAI)",
    ["Border Roads Organisation (BRO)", "Central Public Works Department (CPWD)", "Rail Vikas Nigam Limited (RVNL)"],
    "D",
    "NHAI, operationalized under an Act of Parliament in 1995, oversees the planning and maintenance of National Highways including GQ.",
    "Identifies NHAI as the implementing agency of the NHDP."
))

# =================================================================================================
# PASSAGE 17: Water Pollution in River Ganga & Namami Gange (Book 2, Chapter 12)
# =================================================================================================
P17_TEXT = """River water pollution is one of the most pressing environmental challenges in India, with the Ganga and Yamuna being the most severely degraded river systems. The Ganga flows through densely populated plains supporting over 400 million people. Point sources of pollution include untreated domestic sewage from major riparian cities like Kanpur, Prayagraj, Varanasi, and Patna, alongside toxic industrial effluents discharging from tanneries, textile mills, paper and pulp mills, and chemical factories. Non-point sources include agricultural runoff laden with chemical fertilizers and pesticides, open defecation along riverbanks, and dumping of unburnt corpses. In response, the Government of India launched the 'Namami Gange' Programme as an integrated conservation mission with a budget outlay of 20,000 crore rupees. Key pillars include sewerage treatment infrastructure, riverfront development, river surface cleaning, biodiversity conservation, afforestation, and public awareness."""

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Major Industrial Polluter", P17_TEXT,
    "Which industrial center along the Ganga is notoriously associated with toxic heavy metal effluents from leather tanneries?",
    "Kanpur in Uttar Pradesh",
    ["Haridwar in Uttarakhand", "Rishikesh in Uttarakhand", "Ranchi in Jharkhand"],
    "A",
    "Kanpur has a dense concentration of leather tanning industries whose chrome-rich chemical wastewater enters the Ganga.",
    "Identifies Kanpur tanneries as major source of toxic industrial effluents."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Namami Gange Flagship Mission", P17_TEXT,
    "What is the official title of the comprehensive integrated river rejuvenation programme launched for the Ganga basin?",
    "Namami Gange Programme",
    ["Ganga Jal Kranti", "Narmada Bachao Abhiyan", "Clean Yamuna Clean India"],
    "B",
    "The Union Government launched the 'Namami Gange' Programme as an Integrated Conservation Mission.",
    "Identifies Namami Gange Programme as the integrated mission."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Point vs Non-Point Sources", P17_TEXT,
    "Which of the following constitutes a 'non-point source' of river pollution in the Ganga basin?",
    "Agricultural runoff containing synthetic chemical fertilizers and pesticides",
    ["Direct municipal sewer pipe outfall discharging from a factory", "Tannery discharge drain emptying directly into the river channel", "Industrial chemical drain pipe from an oil refinery"],
    "C",
    "Non-point source pollution originates from diffuse, widespread areas like agricultural fields treated with agrochemicals, unlike single pipe outfalls.",
    "Identifies agricultural runoff as a non-point source of water pollution."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Core Pillars of Rejuvenation", P17_TEXT,
    "Which of the following actions is included among the strategic pillars of the Namami Gange initiative?",
    "Construction of modern sewage treatment plants (STPs) and riverfront afforestation",
    ["Complete diversion of the Ganga into underground pipes to prevent evaporation", "Dumping of solid plastic waste directly into deep river gorges", "Prohibition of all water use for drinking across Uttar Pradesh"],
    "D",
    "Namami Gange focuses on setting up STPs to intercept municipal sewage, river surface cleaning, and riparian afforestation.",
    "Identifies sewage treatment plants and afforestation as core pillars."
))

add_p(make_pq(
    "Geographical Perspective on Selected Issues", "Population Pressure on Ganga", P17_TEXT,
    "Approximately how many people depend directly on the fertile basin of the Ganga for their water and livelihood?",
    "Over 400 million people",
    ["Less than 5 million people", "1 billion people exclusively in hill valleys", "Only 50,000 fishing families"],
    "A",
    "The Ganga river basin supports more than 400 million people, representing over 40% of India's population.",
    "Identifies over 400 million inhabitants dependent on the Ganga basin."
))

# =================================================================================================
# PASSAGE 18: Petroleum Pipelines and the HVJ Network (Book 2, Chapter 7 & 10)
# =================================================================================================
P18_TEXT = """Pipelines represent the most convenient, energy-efficient, and economical mode of transporting liquid hydrocarbons, crude oil, petroleum products, and natural gas across vast continental distances. Pipelines eliminate transshipment losses and delays, operating continuously under all weather conditions. India's oil industry commenced in 1889 at Digboi in Assam, which possesses the country's oldest operating oil refinery. Following Independence, the discovery of massive offshore oil and gas reserves at Mumbai High in 1973 transformed India's energy scenario. To transport gas across landlocked northern states, the Gas Authority of India Limited (GAIL) constructed the landmark 1,750-kilometer Hazira-Vijaipur-Jagdishpur (HVJ) cross-country pipeline. Starting at Hazira in Gujarat, passing through Vijaipur in Madhya Pradesh, and terminating at Jagdishpur in Uttar Pradesh, this pipeline supplies gas as feedstock to fertilizer plants, power stations, and city gas networks."""

add_p(make_pq(
    "Transport and Communication", "HVJ Pipeline Terminals", P18_TEXT,
    "Which three states are directly connected by the landmark 1,750-kilometer HVJ natural gas pipeline?",
    "Gujarat, Madhya Pradesh, and Uttar Pradesh",
    ["Punjab, Haryana, and Rajasthan", "Maharashtra, Goa, and Karnataka", "Odisha, West Bengal, and Bihar"],
    "B",
    "The HVJ pipeline links Hazira (Gujarat), Vijaipur (Madhya Pradesh), and Jagdishpur (Uttar Pradesh).",
    "Identifies Gujarat, Madhya Pradesh, and Uttar Pradesh as HVJ states."
))

add_p(make_pq(
    "Transport and Communication", "Oldest Oil Refinery in India", P18_TEXT,
    "Where was India's earliest commercial oil well drilled and oldest refinery established in 1889?",
    "Digboi in Assam",
    ["Ankleshwar in Gujarat", "Mumbai High off Maharashtra", "Barmer in Rajasthan"],
    "C",
    "Digboi in the upper Assam valley was the site where oil was first struck in India in 1889, hosting India's oldest operational refinery.",
    "Identifies Digboi in Assam as the oldest oil refinery."
))

add_p(make_pq(
    "Transport and Communication", "Advantages of Pipeline Transport", P18_TEXT,
    "What is the foremost logistical advantage of pipeline transportation over road and rail tankers?",
    "Negligible transshipment losses, uninterrupted flow, and immunity to surface traffic delays",
    ["Ability to transport heavy solid iron ore boulders without crushing", "Zero initial construction cost compared to dirt roads", "Capacity to carry passenger crowds during holiday seasons"],
    "D",
    "Pipelines ensure continuous, low-energy transit with virtually zero transit evaporation or leakage losses.",
    "Identifies elimination of transshipment losses and continuous supply as key advantage."
))

add_p(make_pq(
    "Transport and Communication", "Discovery of Mumbai High", P18_TEXT,
    "In which year was the offshore oilfield of 'Mumbai High' discovered on the continental shelf of the Arabian Sea?",
    "1973",
    ["1889", "1947", "1991"],
    "A",
    "Mumbai High offshore field was struck in 1973 and commissioned in 1976 by the Oil and Natural Gas Commission (ONGC).",
    "Identifies 1973 as the discovery year of Mumbai High."
))

add_p(make_pq(
    "Transport and Communication", "Industrial Utilization of HVJ Gas", P18_TEXT,
    "What primary industrial facilities utilize the natural gas transmitted through the HVJ pipeline network?",
    "Chemical fertilizer plants, gas-based thermal power stations, and city gas distribution",
    ["Heavy copper smelting blast furnaces", "Traditional stone carving and handmade paper cottages", "Open-cast coal washing washeries"],
    "B",
    "HVJ natural gas provides crucial chemical feedstock for urea fertilizer plants and clean fuel for gas-fired power turbines.",
    "Identifies fertilizer plants and power stations as primary users of HVJ gas."
))

# =================================================================================================
# PASSAGE 19: Subsistence Nomadism vs Commercial Ranching (Book 1, Chapter 5)
# =================================================================================================
P19_TEXT = """Pastoralism represents an adaptation to arid, semi-arid, and cold environments where crop farming is difficult. It exists in two fundamentally distinct forms: Nomadic Herding (pastoral nomadism) and Commercial Livestock Ranching. Nomadic herding is a primitive subsistence activity where herders rely on animals for food, clothing, shelter, and transport. They move from place to place in search of pastures and water along well-defined territories. In mountainous areas such as the Himalayas, pastoralists like the Gujjars, Bakarwals, Gaddis, and Bhotiyas practice 'transhumance' — seasonal vertical migration from lowlands to alpine pastures in summer and down to valleys in winter. In contrast, Commercial Livestock Ranching is highly organized, capital-intensive, and market-oriented. Ranches cover permanent, fenced parcels of land called paddocks. It is specialized in a single type of animal (cattle, sheep, or horses) in temperate grasslands like the Pampas of Argentina, Prairies of North America, Velds of South Africa, and Downs of Australia."""

add_p(make_pq(
    "Primary Activities", "Nomadic Transhumance Definition", P19_TEXT,
    "What does the term 'transhumance' signify in the lifestyle of Himalayan pastoral communities?",
    "Seasonal vertical migration between low-altitude valleys in winter and high alpine meadows in summer",
    ["Permanent migration of rural farmers to urban metropolitan centers", "Traveling across oceans on merchant container vessels", "Forced relocation of indigenous populations due to dam construction"],
    "C",
    "Transhumance is the seasonal rhythmic movement of pastoralists and livestock between lowland pastures in winter and mountain meadows in summer.",
    "Defines transhumance as seasonal vertical migration."
))

add_p(make_pq(
    "Primary Activities", "Himalayan Pastoral Tribes", P19_TEXT,
    "Which group of communities practices transhumance in the Himalayan and sub-Himalayan tracts?",
    "Gujjars, Bakarwals, Gaddis, and Bhotiyas",
    ["Santhals, Mundas, Oraons, and Hos", "Gonds, Bhils, Chenchus, and Baigas", "Toda, Kurumba, Irula, and Badaga"],
    "D",
    "Gujjars, Bakarwals (J&K/HP), Gaddis (HP), and Bhotiyas (Uttarakhand) are renowned for practicing Himalayan transhumance.",
    "Identifies Gujjars, Bakarwals, Gaddis, and Bhotiyas as transhumant pastoralists."
))

add_p(make_pq(
    "Primary Activities", "Commercial Ranching Characteristics", P19_TEXT,
    "Which feature distinguishes commercial livestock ranching from nomadic pastoralism?",
    "It is permanent, capital-intensive, organized into fenced paddocks, and specialized on a single animal breed",
    ["It involves continuous wandering across barren deserts without permanent shelters", "It produces goods exclusively for domestic family survival without trade", "It rejects all veterinary healthcare and scientific breeding"],
    "A",
    "Commercial livestock ranching is scientific, highly mechanized, uses permanent fenced paddocks, and focuses on global commercial markets.",
    "Identifies capital intensity, fenced paddocks, and single-animal specialization."
))

add_p(make_pq(
    "Primary Activities", "Temperate Grassland Distribution", P19_TEXT,
    "Which temperate grassland corresponds correctly with its respective country/region where commercial livestock ranching thrives?",
    "Pampas in Argentina and Downs in Australia",
    ["Steppes in Brazil and Velds in Canada", "Prairies in Australia and Downs in USA", "Pampas in South Africa and Velds in Argentina"],
    "B",
    "Pampas are in Argentina/Uruguay, Prairies in North America, Velds in South Africa, and Downs in Australia.",
    "Matches Pampas (Argentina) and Downs (Australia)."
))

add_p(make_pq(
    "Primary Activities", "Subsistence Nomadism Constraints", P19_TEXT,
    "Why has the spatial extent and population of nomadic herders been contracting rapidly across the globe?",
    "Imposition of political boundaries, loss of traditional pastures to settled agriculture, and state settlement policies",
    ["A sudden global extinction of all cattle, sheep, and goats", "Mandatory banning of all meat and wool consumption by the United Nations", "Conversion of all deserts into deep freshwater lakes"],
    "C",
    "Nomadic grazing has shrunk due to modern international border restrictions, expansion of irrigated farming, and state sedentarization programs.",
    "Identifies political boundaries and agricultural encroachment as causes of nomadic decline."
))

# =================================================================================================
# PASSAGE 20: Kandla / Deendayal Port and Maritime Evolution (Book 2, Chapter 11)
# =================================================================================================
P20_TEXT = """Kandla Port, officially rechristened as Deendayal Port, is situated at the inner head of the Gulf of Kuchchh in Gujarat. It was the first major seaport developed by India after Independence. Following the partition of British India in 1947, the premier port of Karachi went to West Pakistan. This severed northern and north-western India from its traditional maritime gateway, placing immense pressure on Mumbai Port. To compensate for the loss of Karachi and relieve severe congestion at Mumbai, Kandla was developed as a modern tidal port. Its extensive hinterland encompasses Rajasthan, Haryana, Punjab, Himachal Pradesh, Jammu and Kashmir, and Gujarat. Kandla was also designated as India's first Free Trade Zone (FTZ) / Special Economic Zone (SEZ) to boost export-oriented manufacturing. Today, Kandla is one of the highest cargo-handling ports in India, dominating the import of crude petroleum, petroleum products, fertilizers, and edible oils, while exporting grain and engineering goods."""

add_p(make_pq(
    "International Trade", "Historical Catalyst for Kandla", P20_TEXT,
    "What historical event directly necessitated the rapid development of Kandla Port after 1947?",
    "The partition of India and the loss of Karachi Port to Pakistan",
    ["The opening of the Suez Canal in Egypt", "The construction of the Panama Canal in the Americas", "The total destruction of Mumbai Port by a tsunami"],
    "D",
    "Kandla was built specifically to replace Karachi Port after partition severed north-west India from its ocean outlet.",
    "Identifies 1947 partition and loss of Karachi as catalyst for Kandla Port."
))

add_p(make_pq(
    "International Trade", "Geographical Setting", P20_TEXT,
    "Where is Kandla (Deendayal Port) geographically situated along the Indian coastline?",
    "At the head of the Gulf of Kuchchh in Gujarat",
    ["At the mouth of the Gulf of Khambhat near Surat", "Along the Malabar Coast of Kerala", "On the Coromandel Coast of Andhra Pradesh"],
    "A",
    "Kandla is a tidal port situated at the inner head of the Gulf of Kuchchh in western Gujarat.",
    "Identifies head of Gulf of Kuchchh in Gujarat as Kandla's location."
))

add_p(make_pq(
    "International Trade", "Free Trade Pioneer", P20_TEXT,
    "What economic milestone was achieved by Kandla Port to encourage export manufacturing?",
    "It was established as India's first Free Trade Zone (FTZ)",
    ["It was declared the first offshore tax haven of Asia", "It became the world's only port reserved strictly for barter trade", "It banned all foreign ships from entering its docks"],
    "B",
    "Kandla was established in 1965 as India's first Free Trade Zone (FTZ) to promote export processing.",
    "Identifies Kandla as India's first Free Trade Zone (FTZ)."
))

add_p(make_pq(
    "International Trade", "Cargo Profile", P20_TEXT,
    "Which group of commodities dominates the inbound import traffic handled at Kandla Port?",
    "Crude petroleum, petroleum products, fertilizers, and edible oils",
    ["Fine silk textiles, spices, and electronic microchips only", "High-grade metallurgical coking coal for blast furnaces exclusively", "Fresh tropical flowers and live dairy cattle"],
    "C",
    "Kandla is a premier liquid bulk port handling vast volumes of crude oil (for northern refineries), LPG, and chemical fertilizers.",
    "Identifies crude petroleum, fertilizers, and edible oils as dominant imports."
))

add_p(make_pq(
    "International Trade", "Hinterland Reach", P20_TEXT,
    "Which geographic zone forms the primary economic hinterland served by Kandla Port?",
    "North and north-western India including Gujarat, Rajasthan, Punjab, Haryana, and J&K",
    ["Eastern India including West Bengal, Bihar, and Odisha", "Southern peninsula including Tamil Nadu and Kerala", "North-eastern hill states including Assam and Mizoram"],
    "D",
    "Kandla's hinterland spans the northern and north-western agricultural and industrial belts of India.",
    "Identifies north and north-western India as Kandla's hinterland."
))

# Validation and export
assert len(passages_part1) == 100
with open("mock/geo_units/passages_part1.json", "w", encoding="utf-8") as f:
    json.dump(passages_part1, f, indent=2, ensure_ascii=False)

print(f"Passages Part 1 generated successfully: {len(passages_part1)} questions across 20 passages.")
