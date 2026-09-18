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

# Load seen questions from units 1 to 8
for u in range(1, 9):
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
# UNIT 9: India: Population, Density, Growth, Composition & Migration (60 Questions)
# =================================================================================================
CHAPTER_U9 = "India: Population, Density, Growth, Composition and Migration"
u9_qs = []
u9_seen = set()

def add_u9(q):
    u9_qs.append(q)

# Q1: Total population Census 2011
opts, c, s = rotate_options(
    "1,210.8 million (1.21 billion), accounting for 17.5% of the world's population on 2.4% of world land",
    ["500 million, accounting for 5% of world population", "2,500 million, accounting for 50% of world population", "800 million, accounting for 10% of world population"],
    "A",
    "According to Census 2011, India's total population was 1,210.8 million (121 crore), making it the second most populous country in the world, holding 17.5% of global population on just 2.4% of the world's land area.\nHence, Option {{CORR}} is correct.",
    "Identifies India's Census 2011 population as 1.21 billion (17.5% of global population)."
)
add_u9(make_question(CHAPTER_U9, "Demographic Profile", "According to the Census of India 2011, what was India's total population and its share of the global population?", opts, c, s))

# Q2: Most populous state in India
opts, c, s = rotate_options(
    "Uttar Pradesh, with about 199.8 million people (16.5% of India's population)",
    ["Maharashtra, with 50 million people", "Bihar, with 75 million people", "Rajasthan, with 120 million people"],
    "B",
    "Uttar Pradesh is the most populous state in India, with a population of 199.8 million (Census 2011), accounting for about 16.5% of the country's total population.\nHence, Option {{CORR}} is correct.",
    "Identifies Uttar Pradesh as India's most populous state (199.8 million)."
)
add_u9(make_question(CHAPTER_U9, "Population Distribution", "Which is the most populous state in India according to Census 2011?", opts, c, s))

# Q3: National population density Census 2011
opts, c, s = rotate_options(
    "382 persons per square kilometer (up from 325 in 2001)",
    ["117 persons per square kilometer", "500 persons per square kilometer", "250 persons per square kilometer"],
    "C",
    "The population density of India in 2011 was 382 persons per sq km, showing a substantial increase from 325 persons per sq km in 2001 and 117 persons per sq km in 1951.\nHence, Option {{CORR}} is correct.",
    "Identifies India's 2011 population density as 382 persons per sq km."
)
add_u9(make_question(CHAPTER_U9, "Population Density", "What was India's average population density recorded in Census 2011?", opts, c, s))

# Q4: Highest population density state
opts, c, s = rotate_options(
    "Bihar (1,106 persons per sq km), followed by West Bengal (1,028 persons per sq km)",
    ["Kerala (860 persons per sq km), followed by Tamil Nadu", "Uttar Pradesh (829 persons per sq km), followed by Punjab", "Maharashtra, followed by Gujarat"],
    "D",
    "Among all Indian states, Bihar records the highest population density with 1,106 persons per sq km, surpassing West Bengal (1,028 persons per sq km).\nHence, Option {{CORR}} is correct.",
    "Identifies Bihar (1,106 persons/sq km) as the state with the highest population density."
)
add_u9(make_question(CHAPTER_U9, "Population Density", "Which Indian state recorded the highest population density in Census 2011?", opts, c, s))

# Q5: Lowest population density state
opts, c, s = rotate_options(
    "Arunachal Pradesh, with only 17 persons per square kilometer",
    ["Sikkim, with 86 persons per square kilometer", "Mizoram, with 52 persons per square kilometer", "Nagaland, with 119 persons per square kilometer"],
    "A",
    "Arunachal Pradesh has the lowest population density in India, with only 17 persons per sq km, due to its mountainous relief and dense forests.\nHence, Option {{CORR}} is correct.",
    "Identifies Arunachal Pradesh as the state with the lowest population density (17 persons/sq km)."
)
add_u9(make_question(CHAPTER_U9, "Population Density", "Which state has the lowest population density in India according to Census 2011?", opts, c, s))

# Q6: Highest density Union Territory
opts, c, s = rotate_options(
    "NCT of Delhi, with 11,320 persons per square kilometer",
    ["Chandigarh, with 9,258 persons per square kilometer", "Puducherry, with 2,547 persons per square kilometer", "Daman and Diu, with 2,191 persons per square kilometer"],
    "B",
    "Among the Union Territories, the National Capital Territory (NCT) of Delhi has the highest population density, recording 11,320 persons per sq km in Census 2011.\nHence, Option {{CORR}} is correct.",
    "Identifies NCT of Delhi as having the highest density among Union Territories (11,320 persons/sq km)."
)
add_u9(make_question(CHAPTER_U9, "Population Density", "Which Union Territory of India recorded the highest population density in Census 2011?", opts, c, s))

# Q7: Phase I of Indian population growth (1901-1921)
opts, c, s = rotate_options(
    "Period of stagnant or stationary growth, where high birth rate was cancelled out by high death rate, with negative growth in 1911-1921",
    ["Period of explosive rapid population growth due to mass industrialization", "Period of zero birth rates due to national law", "Period of massive international immigration from Europe"],
    "C",
    "The phase of 1901-1921 is referred to as the period of stagnant or stationary growth. Both birth rate and death rate were very high. In the decade 1911-1921, India recorded a negative growth rate of -0.31% due to the influenza epidemic and famines.\nHence, Option {{CORR}} is correct.",
    "Describes Phase I (1901-1921) as stagnant growth with negative growth in 1911-1921."
)
add_u9(make_question(CHAPTER_U9, "Phases of Population Growth", "What characterized 'Phase I' (1901-1921) of population growth in India?", opts, c, s))

# Q8: The Great Demographic Divide
opts, c, s = rotate_options(
    "1921",
    ["1951", "1981", "2001"],
    "D",
    "The year 1921 is recognized as the 'Great Demographic Divide' in India's demographic history because prior to 1921 population growth was stagnant and fluctuated, while after 1921 India entered a phase of steady, continuous population increase.\nHence, Option {{CORR}} is correct.",
    "Identifies 1921 as the 'Great Demographic Divide' in Indian demographic history."
)
add_u9(make_question(CHAPTER_U9, "Phases of Population Growth", "Which census year is historically designated as the 'Great Demographic Divide' in India?", opts, c, s))

# Q9: Phase III: Population Explosion (1951-1981)
opts, c, s = rotate_options(
    "Rapid fall in mortality rate due to improved sanitation and healthcare while fertility remained very high, yielding over 2.2% annual growth",
    ["Mortality rate increased tenfold due to nuclear fallout", "Fertility dropped to zero while all growth was driven by overseas tourists", "Growth rate turned negative due to civil war"],
    "A",
    "The decade 1951-1981 is known as the period of population explosion in India. Developmental planning, introduction of antibiotics, and malaria eradication led to a rapid fall in mortality, while birth rates remained stubbornly high, causing annual growth to exceed 2.2%.\nHence, Option {{CORR}} is correct.",
    "Explains Phase III (1951-1981) population explosion driven by plunging mortality and high fertility."
)
add_u9(make_question(CHAPTER_U9, "Phases of Population Growth", "What primary demographic mechanism caused the 'Population Explosion' in India during Phase III (1951-1981)?", opts, c, s))

# Q10: Lowest decadal growth rate state (2001-2011)
opts, c, s = rotate_options(
    "Kerala (9.4%), followed by Goa and Andhra Pradesh",
    ["Meghalaya (27.95%), followed by Arunachal Pradesh", "Bihar (25.4%), followed by Uttar Pradesh", "Rajasthan (21.3%), followed by Madhya Pradesh"],
    "B",
    "Kerala recorded the lowest decadal population growth rate among major Indian states during 2001-2011 (9.4%), reflecting high female literacy, universal healthcare, and early demographic transition.\nHence, Option {{CORR}} is correct.",
    "Identifies Kerala as recording the lowest decadal population growth rate (9.4%)."
)
add_u9(make_question(CHAPTER_U9, "Regional Growth Variations", "Which Indian state recorded the lowest decadal population growth rate (9.4%) during 2001-2011?", opts, c, s))

# Q11: Linguistic families: Austric / Nishada
opts, c, s = rotate_options(
    "1.38% of population, including Khasi, Jaintia, Santhali, Mundari, Ho, and Korku",
    ["73% of population, including Hindi, Bengali, and Punjabi", "20% of population, including Tamil, Telugu, and Kannada", "0.85% of population, including Bodo and Manipuri"],
    "C",
    "The Austric (Nishada) language family accounts for about 1.38% of the Indian population, spoken by tribal groups in Central India and Meghalaya (Khasi, Jaintia, Santhali, Mundari, Ho, Korku).\nHence, Option {{CORR}} is correct.",
    "Identifies the Austric (Nishada) linguistic family, its percentage (1.38%), and representative tribal tongues."
)
add_u9(make_question(CHAPTER_U9, "Linguistic Composition", "Which description accurately represents the 'Austric (Nishada)' language family in India?", opts, c, s))

# Q12: Sino-Tibetan / Kirata family
opts, c, s = rotate_options(
    "0.85% of population, spoken in the sub-Himalayan region (Bodo, Garo, Tripuri, Manipuri, Ladakhi)",
    ["20% of population, spoken across the Deccan peninsula", "50% of population, spoken in the Indo-Gangetic plain", "10% of population, spoken in the Andaman islands exclusively"],
    "D",
    "The Sino-Tibetan (Tibeto-Burman / Kirata) family constitutes about 0.85% of the population, spoken primarily across the Himalayan and North-Eastern borderlands (Bodo, Garo, Tripuri, Miri, Manipuri, Ladakhi).\nHence, Option {{CORR}} is correct.",
    "Identifies the Sino-Tibetan (Kirata) family (0.85%) spoken in the Himalayan borderlands."
)
add_u9(make_question(CHAPTER_U9, "Linguistic Composition", "What percentage of India's population speaks languages belonging to the 'Sino-Tibetan (Kirata)' family?", opts, c, s))

# Q13: Dravidian language family
opts, c, s = rotate_options(
    "Accounts for about 20% of the population, including Tamil, Telugu, Kannada, Malayalam, Gondi, and Kurukh",
    ["Accounts for 73% of the population in northern plains", "Accounts for less than 0.1% in the Thar desert", "Accounts for 50% in the Himalayan valleys"],
    "A",
    "The Dravidian language family accounts for about 20% of India's population, dominant in southern India (Tamil, Telugu, Kannada, Malayalam) as well as central tribal pockets (Gondi, Kurukh).\nHence, Option {{CORR}} is correct.",
    "Specifies the Dravidian language family share (~20%) and its primary languages."
)
add_u9(make_question(CHAPTER_U9, "Linguistic Composition", "What is the demographic share and geographic coverage of the 'Dravidian' language family in India?", opts, c, s))

# Q14: Indo-European / Indo-Aryan family
opts, c, s = rotate_options(
    "The largest family, accounting for about 73% of the population (Hindi, Bengali, Marathi, Punjabi, Gujarati, Odia, Assamese, Urdu)",
    ["Accounts for 20% of population in the Western Ghats", "Accounts for 1.38% in the Chotanagpur plateau", "Accounts for 0.85% in the Northeast hills"],
    "B",
    "The Indo-Aryan branch of the Indo-European family is the largest linguistic family in India, spoken by approximately 73% of the total population across northern, central, western, and eastern India.\nHence, Option {{CORR}} is correct.",
    "Identifies Indo-Aryan as the largest linguistic family in India (~73%)."
)
add_u9(make_question(CHAPTER_U9, "Linguistic Composition", "Which is the largest linguistic family in India, comprising roughly 73 percent of the total population?", opts, c, s))

# Q15: Most spoken language in India
opts, c, s = rotate_options(
    "Hindi (43.6%), followed by Bengali (8.03%) and Marathi (6.86%)",
    ["English (50%), followed by Hindi and Tamil", "Telugu (30%), followed by Tamil and Malayalam", "Bengali (40%), followed by Punjabi and Gujarati"],
    "C",
    "According to Census 2011, Hindi is the most widely spoken language in India, with 43.63% speakers, followed by Bengali (8.03%), Marathi (6.86%), Telugu (6.70%), and Tamil (5.70%).\nHence, Option {{CORR}} is correct.",
    "Identifies Hindi (43.6%) and Bengali (8.03%) as India's most spoken languages."
)
add_u9(make_question(CHAPTER_U9, "Scheduled Languages", "Which language has the highest percentage of native speakers in India according to Census 2011, and which ranks second?", opts, c, s))

# Q16: Religious Composition percentages
opts, c, s = rotate_options(
    "Hindus 79.8%, Muslims 14.2%, Christians 2.3%, Sikhs 1.7%, Buddhists 0.7%, Jains 0.4%",
    ["Hindus 60%, Muslims 30%, Christians 5%, Sikhs 5%", "Hindus 90%, Muslims 5%, Christians 3%, Sikhs 2%", "Hindus 50%, Muslims 25%, Christians 15%, Buddhists 10%"],
    "D",
    "According to Census 2011, the religious breakdown of India's population is: Hindus (79.8%), Muslims (14.2%), Christians (2.3%), Sikhs (1.7%), Buddhists (0.7%), and Jains (0.4%).\nHence, Option {{CORR}} is correct.",
    "Lists exact Census 2011 religious population shares in India."
)
add_u9(make_question(CHAPTER_U9, "Religious Composition", "According to the 2011 Census, what are the accurate percentage shares of major religious communities in India?", opts, c, s))

# Q17: Work Participation Rate Census 2011
opts, c, s = rotate_options(
    "39.8 percent of the total population",
    ["15.2 percent of the total population", "75.5 percent of the total population", "55.0 percent of the total population"],
    "A",
    "The Work Participation Rate (WPR) in India as recorded by Census 2011 was 39.8%, meaning about 40% of the population are workers (main + marginal), while roughly 60% are non-workers.\nHence, Option {{CORR}} is correct.",
    "Identifies India's 2011 Work Participation Rate as 39.8%."
)
add_u9(make_question(CHAPTER_U9, "Occupational Structure", "What was the national 'Work Participation Rate' recorded in Census 2011?", opts, c, s))

# Q18: Definition of Main Worker
opts, c, s = rotate_options(
    "A person who works for at least 183 days (or six months) in the census reference year",
    ["A person who works for only 30 days during harvest", "A person who holds a permanent government pension", "Any person registered with an employment exchange regardless of work done"],
    "B",
    "In the Census of India, a 'Main Worker' is defined as a person who worked for major part of the reference year—i.e., at least 183 days or six months.\nHence, Option {{CORR}} is correct.",
    "Defines Main Worker as working for at least 183 days (6 months) in the reference year."
)
add_u9(make_question(CHAPTER_U9, "Occupational Structure", "According to the Census of India, who is classified as a 'Main Worker'?", opts, c, s))

# Q19: Definition of Marginal Worker
opts, c, s = rotate_options(
    "A person who works for less than 183 days (or six months) in the census reference year",
    ["A person who works exactly 365 days a year without taking leave", "A person who owns more than 50 hectares of farmland", "A person who operates a commercial software corporation"],
    "C",
    "A 'Marginal Worker' is defined as a person who works for less than 183 days (or less than six months) during the census reference year.\nHence, Option {{CORR}} is correct.",
    "Defines Marginal Worker as working for less than 183 days in the reference year."
)
add_u9(make_question(CHAPTER_U9, "Occupational Structure", "What is the census definition of a 'Marginal Worker' in India?", opts, c, s))

# Q20: Occupational categories share (Cultivators vs Agri Laborers)
opts, c, s = rotate_options(
    "Cultivators: 24.6%, Agricultural Labourers: 30.0%, Household Industry Workers: 3.8%, Other Workers: 41.6%",
    ["Cultivators: 60%, Agricultural Labourers: 30%, Industry: 10%, Services: 0%", "Cultivators: 10%, Agricultural Labourers: 10%, Industry: 40%, Services: 40%", "Cultivators: 50%, Agricultural Labourers: 5%, Industry: 25%, Services: 20%"],
    "D",
    "In Census 2011, the occupational structure shows: Cultivators (24.6%), Agricultural Labourers (30.0%), Household Industry Workers (3.8%), and Other Workers (including secondary and tertiary: 41.6%). Together, primary agricultural workers make up 54.6%.\nHence, Option {{CORR}} is correct.",
    "Lists Census 2011 occupational shares: Cultivators 24.6%, Agri Laborers 30.0%, Other Workers 41.6%."
)
add_u9(make_question(CHAPTER_U9, "Occupational Structure", "In Census 2011, what was the percentage breakdown of India's working population across the four census occupational categories?", opts, c, s))

# Q21: Rural to Rural migration female predominance
opts, c, s = rotate_options(
    "Marriage migration, where custom requires women to move to their husband's village (except in Meghalaya)",
    ["Employment in underground coal mines in rural areas", "Compulsory military service in rural border areas", "Relocation to attend rural agricultural universities"],
    "A",
    "In India, the Rural-to-Rural migration stream is overwhelmingly dominated by females due to patrilocal marriage customs, where brides move to their husband's village (except in matrilineal Meghalaya).\nHence, Option {{CORR}} is correct.",
    "Identifies marriage as the primary reason for female-dominated rural-to-rural migration."
)
add_u9(make_question(CHAPTER_U9, "Migration Streams", "Why is the 'Rural to Rural' internal migration stream in India overwhelmingly dominated by female migrants?", opts, c, s))

# Q22: Rural to Urban migration male predominance
opts, c, s = rotate_options(
    "Employment, economic search for livelihood, and lack of jobs in rural agrarian areas",
    ["Compulsory marriage to urban residents", "Banning of male workers from farming in rural villages", "Mandatory retirement of all rural youth"],
    "B",
    "The Rural-to-Urban migration stream is predominantly male-dominated because men migrate to cities seeking employment, higher wages, and business opportunities, often leaving families in rural villages.\nHence, Option {{CORR}} is correct.",
    "Identifies economic livelihood search as the driver of male rural-to-urban migration."
)
add_u9(make_question(CHAPTER_U9, "Migration Streams", "What is the primary factor responsible for male predominance in the 'Rural to Urban' migration stream in India?", opts, c, s))

# Q23: State with largest net in-migrants
opts, c, s = rotate_options(
    "Maharashtra, followed by NCT of Delhi, Gujarat, and Haryana",
    ["Uttar Pradesh, followed by Bihar", "Kerala, followed by Tamil Nadu", "Odisha, followed by Jharkhand"],
    "C",
    "Maharashtra receives the largest number of net in-migrants in India, attracted by Mumbai-Pune industrial and commercial opportunities, followed by the NCT of Delhi, Gujarat, and Haryana.\nHence, Option {{CORR}} is correct.",
    "Identifies Maharashtra as the state receiving the largest net in-migrants."
)
add_u9(make_question(CHAPTER_U9, "Inter-State Migration", "Which Indian state receives the largest number of net in-migrants from other states?", opts, c, s))

# Q24: State with largest out-migrants
opts, c, s = rotate_options(
    "Uttar Pradesh and Bihar",
    ["Maharashtra and Gujarat", "Punjab and Haryana", "Goa and Karnataka"],
    "D",
    "Uttar Pradesh and Bihar account for the largest number of out-migrants in India, driven by high population density, severe land fragmentation, poverty, and lack of industrial jobs.\nHence, Option {{CORR}} is correct.",
    "Identifies Uttar Pradesh and Bihar as the largest out-migrant sending states."
)
add_u9(make_question(CHAPTER_U9, "Inter-State Migration", "Which two states in India generate the largest number of out-migrants to other parts of the country?", opts, c, s))

# Q25: Economic consequence: Hundi / Remittances
opts, c, s = rotate_options(
    "Remittances sent by migrants back to their families in rural villages, used for food, repayment of debt, healthcare, and education",
    ["Tax penalties imposed by city corporations on migrant workers", "Money confiscated by interstate police checkpoints", "Bribes paid to obtain industrial factory permits"],
    "A",
    "Remittances (locally called hundi) sent by migrants back home represent a vital source of livelihood for rural households in Bihar, UP, Odisha, and Rajasthan, financing daily sustenance, debt clearance, and schooling.\nHence, Option {{CORR}} is correct.",
    "Defines remittances (hundi) as economic transfers sustaining rural households."
)
add_u9(make_question(CHAPTER_U9, "Consequences of Migration", "What are 'Remittances' (hundi) in the economic impact of internal migration in India?", opts, c, s))

# Q26: Demographic consequence of migration
opts, c, s = rotate_options(
    "Causes serious age and sex selective imbalances: rural sending areas lose young males leading to aging rural populations, while cities face severe male-skewed sex ratios",
    ["Doubles the fertility rate in cities instantly", "Eliminates all differences between male and female mortality", "Forces all urban residents to become farmers"],
    "B",
    "Rural-urban migration is age and sex selective. The departure of young working-age men leaves rural areas with distorted sex ratios and elderly dependents, while cities experience skewed sex ratios and male-dominated urban enclaves.\nHence, Option {{CORR}} is correct.",
    "Explains demographic distortions caused by sex-selective out-migration."
)
add_u9(make_question(CHAPTER_U9, "Consequences of Migration", "What demographic imbalance is created in rural source villages due to age- and sex-selective out-migration?", opts, c, s))

# Q27: Social consequences of migration
opts, c, s = rotate_options(
    "Promotes diffusion of new ideas, family planning concepts, new technologies, and intermixing of diverse cultures",
    ["Causes the total disappearance of all regional Indian languages", "Forces all citizens to adopt a single tribal dialect", "Bans all religious festivals across the country"],
    "C",
    "Migration acts as an agent of social change: urban migrants bring back new ideas related to education, modern technologies, family planning, and women's rights, while fostering cultural integration across communities.\nHence, Option {{CORR}} is correct.",
    "Highlights social integration and diffusion of ideas resulting from migration."
)
add_u9(make_question(CHAPTER_U9, "Consequences of Migration", "How does internal migration act as a catalyst for progressive social change in rural India?", opts, c, s))

# Q28: Environmental consequences of migration
opts, c, s = rotate_options(
    "Overcrowding in cities, proliferation of unhygienic slums, severe strain on civic infrastructure, water depletion, and untreated sewage discharge",
    ["Instant conversion of city streets into pristine national parks", "Reduction in urban air pollution to absolute zero", "The complete elimination of municipal solid waste"],
    "D",
    "Unchecked rural-urban migration places acute pressure on urban infrastructure, causing housing deficits, growth of unauthorized slums, water shortages, traffic congestion, and solid waste crises in metropolitan cities.\nHence, Option {{CORR}} is correct.",
    "Identifies overcrowding, slum expansion, and infrastructure stress as urban environmental costs of migration."
)
add_u9(make_question(CHAPTER_U9, "Consequences of Migration", "What are the major environmental consequences of rapid, unplanned rural-to-urban migration in Indian megacities?", opts, c, s))

# Q29: Match Language Families with Linguistic Branches
add_u9(make_match_question(
    CHAPTER_U9, "Linguistic Families",
    "Match List I (Language Family) with List II (Sub-family / Representative Dialects):",
    [("A", "Austric (Nishada)"), ("B", "Sino-Tibetan (Kirata)"), ("C", "Dravidian"), ("D", "Indo-European (Indo-Aryan)")],
    [("I", "Bodo, Garo, Manipuri, Ladakhi"), ("II", "Tamil, Telugu, Kannada, Gondi"), ("III", "Santhali, Mundari, Ho, Khasi"), ("IV", "Hindi, Bengali, Marathi, Punjabi")],
    "A-III, B-I, C-II, D-IV", "A",
    "Austric includes Santhali, Mundari, Khasi (III); Sino-Tibetan includes Bodo, Garo, Manipuri (I); Dravidian includes Tamil, Telugu, Gondi (II); Indo-European includes Hindi, Bengali, Marathi (IV).",
    "Correctly correlates Indian language families with their member tongues."
))

# Q30: Match Population Phases with Decadal Periods
add_u9(make_match_question(
    CHAPTER_U9, "Phases of Population Growth",
    "Match List I (Phase of Indian Population Growth) with List II (Period / Defining Attribute):",
    [("A", "Phase I"), ("B", "Phase II"), ("C", "Phase III"), ("D", "Phase IV")],
    [("I", "1951-1981 (Population explosion, mortality fell sharply)"), ("II", "Post-1981 to present (Declining fertility, slowing growth rate)"), ("III", "1901-1921 (Stagnant growth, negative growth in 1911-1921)"), ("IV", "1921-1951 (Steady continuous growth, 1921 divide)")],
    "A-III, B-IV, C-I, D-II", "B",
    "Phase I is 1901-1921 (III); Phase II is 1921-1951 (IV); Phase III is 1951-1981 (I); Phase IV is post-1981 (II).",
    "Matches the four demographic growth phases of India to their respective timeframes."
))

# Q31: Statement on Christian Population Distribution
add_u9(make_statement_question(
    CHAPTER_U9, "Religious Geography",
    "The Christian population in India is concentrated along the western coast (Goa and Kerala) and in North-Eastern states like Nagaland, Mizoram, and Meghalaya.",
    "In the rural interior of the Thar Desert, Christians constitute over 90% of the total population.",
    3, "C",
    "Statement I is correct: Christians are heavily clustered along the coastal belts of Goa/Kerala and in hill states of the Northeast. Statement II is false: the Thar desert is overwhelmingly Hindu and Muslim.",
    "Evaluates the regional concentration of the Christian community in India."
))

# Q32: Assertion-Reason on Negative Growth in 1911-1921
add_u9(make_assertion_question(
    CHAPTER_U9, "Historical Demography",
    "India registered a negative decadal population growth rate of -0.31% during the decade 1911-1921.",
    "The catastrophic influenza pandemic of 1918-1919 and recurring famines caused extraordinarily high mortality across India.",
    1, "D",
    "Both Assertion and Reason are true, and Reason is the correct explanation. The 1918 Spanish flu pandemic killed an estimated 12 to 14 million people in India, resulting in an absolute decline in population.",
    "Explains the causes of India's unique negative population growth in 1911-1921."
))

# Q33: Multi-statement on Agricultural Workers
add_u9(make_multi_statement_question(
    CHAPTER_U9, "Agricultural Workforce",
    "Which of the following statements about India's agricultural workforce in Census 2011 are correct?",
    [
        ("A", "Agricultural workers (cultivators + agricultural labourers) constitute 54.6% of total workers."),
        ("B", "The percentage of agricultural labourers (30.0%) exceeds the percentage of cultivators (24.6%)."),
        ("C", "States like Bihar, Chhattisgarh, and Odisha exhibit very high agricultural workforce participation."),
        ("D", "In Delhi and Chandigarh, over 95% of the working population are cultivators.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C are correct facts from Census 2011. Statement D is false because Delhi and Chandigarh are almost entirely urban with less than 2% agricultural workforce.",
    "Identifies structural facts about agricultural labor and cultivators in India."
))

# Q34: Patrilocal marriage migration in India
opts, c, s = rotate_options(
    "Nearly 65% of female migrants cite marriage as the primary reason for their migration",
    ["Less than 1% of women move due to marriage", "Women move primarily to join the merchant navy", "Women migrate exclusively to operate deep-sea oil rigs"],
    "B",
    "According to the Census, marriage is the predominant reason for female migration in India, accounting for roughly 65% of all female internal movements (moving to the husband's household).\nHence, Option {{CORR}} is correct.",
    "Highlights marriage as the single largest cause of female migration in India (~65%)."
)
add_u9(make_question(CHAPTER_U9, "Female Migration", "What percentage of female internal migration in India is attributed to marriage?", opts, c, s))

# Q35: Work and Employment as Male Migration cause
opts, c, s = rotate_options(
    "Nearly 38% of male migrants cite work and employment as the main reason for migration",
    ["Men move primarily to attend pre-primary daycare", "Men migrate exclusively to escape warm sunshine", "Men move only to purchase postage stamps"],
    "C",
    "Among male migrants, 'Work/Employment' is the single most important reason for migration, accounting for about 38% of male internal movements, followed by business and education.\nHence, Option {{CORR}} is correct.",
    "Identifies employment as the primary driver of male internal migration in India (~38%)."
)
add_u9(make_question(CHAPTER_U9, "Male Migration", "What is the primary reason stated by the largest proportion of male migrants for migrating in India?", opts, c, s))

# Q36: High proportion of young population challenge
opts, c, s = rotate_options(
    "Requires high national expenditure on schooling, nutrition, skill development, and creating non-farm jobs for entrants",
    ["Immediate abundance of fully funded retirement homes", "Total elimination of demand for universities and colleges", "Automatic elimination of national food consumption"],
    "D",
    "India's large youthful population represents a demographic dividend only if the state invests heavily in education, healthcare, skills, and employment generation; otherwise it risks severe youth underemployment.\nHence, Option {{CORR}} is correct.",
    "Explains the policy imperatives of harnessing India's youthful demographic dividend."
)
add_u9(make_question(CHAPTER_U9, "Demographic Dividend", "What policy challenges are posed by India's large proportion of adolescents and youth in the population?", opts, c, s))

# Q37: National Youth Policy (NYP-2014)
opts, c, s = rotate_options(
    "Persons in the age group of 15 to 29 years",
    ["Persons aged 5 to 10 years", "Persons aged 60 to 75 years", "Persons aged 40 to 60 years"],
    "A",
    "The National Youth Policy (NYP-2014) defines 'youth' as persons in the age group of 15 to 29 years, focusing on developing their potential to contribute to national growth.\nHence, Option {{CORR}} is correct.",
    "Identifies the age bracket 15 to 29 years defined as 'youth' under NYP-2014."
)
add_u9(make_question(CHAPTER_U9, "National Policies", "Under the National Youth Policy (NYP-2014) launched by the Government of India, how is 'Youth' defined in terms of age?", opts, c, s))

# Q38: Jain community distribution
opts, c, s = rotate_options(
    "Largely an urban-dwelling commercial community concentrated in Rajasthan, Gujarat, and Maharashtra",
    ["Exclusively rural nomadic pastoralists living in the high Himalayas", "Confined solely to the Andaman and Nicobar Islands", "Living only as deep-sea fishermen along the Coromandel coast"],
    "B",
    "Jains constitute 0.4% of India's population and are heavily concentrated in urban areas, particularly in commercial and financial trades in Rajasthan, Gujarat, and Maharashtra.\nHence, Option {{CORR}} is correct.",
    "Describes the Jain community: urban, commercial, clustered in Rajasthan, Gujarat, Maharashtra."
)
add_u9(make_question(CHAPTER_U9, "Religious Geography", "What spatial and occupational pattern characterizes the 'Jain' community in India?", opts, c, s))

# Q39: Buddhist population concentration
opts, c, s = rotate_options(
    "Maharashtra (largest concentration due to Neo-Buddhist movement), followed by Sikkim, Arunachal Pradesh, and Ladakh",
    ["Gujarat and Rajasthan", "Kerala and Tamil Nadu", "Punjab and Haryana"],
    "C",
    "Maharashtra has the largest Buddhist population in India (stemming from Dr. B.R. Ambedkar's 1956 conversion movement), followed by traditional Himalayan Buddhist regions (Sikkim, Arunachal Pradesh, Ladakh).\nHence, Option {{CORR}} is correct.",
    "Locates the largest Buddhist population in Maharashtra, followed by Himalayan regions."
)
add_u9(make_question(CHAPTER_U9, "Religious Geography", "Which Indian state is home to the largest number of Buddhists in India?", opts, c, s))

# Q40: Sikh population concentration
opts, c, s = rotate_options(
    "Concentrated predominantly in Punjab, with significant presence in neighboring Haryana, Delhi, and Rajasthan",
    ["Concentrated exclusively in Kerala and Tamil Nadu", "Concentrated along the coast of Odisha and West Bengal", "Concentrated in the northeastern hill states of Nagaland and Mizoram"],
    "D",
    "The Sikh population (1.7% nationally) is heavily concentrated in the state of Punjab, where they form the majority, with substantial populations in Haryana, Delhi, and western Uttar Pradesh.\nHence, Option {{CORR}} is correct.",
    "Identifies Punjab and adjoining northwestern regions as the core Sikh concentration."
)
add_u9(make_question(CHAPTER_U9, "Religious Geography", "Where is the Sikh population of India geographically concentrated?", opts, c, s))

# Q41: States with lowest work participation rates
opts, c, s = rotate_options(
    "Goa (39.6%), Uttar Pradesh (32.9%), Bihar (33.4%), and Punjab (35.7%)",
    ["Himachal Pradesh, Nagaland, and Sikkim", "Chhattisgarh and Andhra Pradesh", "Madhya Pradesh and Rajasthan"],
    "A",
    "States like Uttar Pradesh (32.9%), Bihar (33.4%), and Punjab (35.7%) have relatively low work participation rates, partly due to low female work participation in formal census enumerations.\nHence, Option {{CORR}} is correct.",
    "Identifies northern states with low work participation rates (UP, Bihar, Punjab)."
)
add_u9(make_question(CHAPTER_U9, "Occupational Structure", "Which states exhibit relatively low work participation rates in Census 2011?", opts, c, s))

# Q42: States with highest work participation rates
opts, c, s = rotate_options(
    "Himachal Pradesh, Nagaland, Sikkim, and Chhattisgarh",
    ["Delhi, Chandigarh, and Puducherry", "Punjab, Haryana, and Uttar Pradesh", "Kerala, Goa, and Lakshadweep"],
    "B",
    "High work participation rates are found in hill and tribal states like Himachal Pradesh, Nagaland, Sikkim, and Chhattisgarh, where women actively participate in subsistence agricultural labor.\nHence, Option {{CORR}} is correct.",
    "Lists states with high work participation rates driven by female agricultural engagement."
)
add_u9(make_question(CHAPTER_U9, "Occupational Structure", "Which group of states exhibits higher work participation rates (above 45-50%) in Census 2011?", opts, c, s))

# Q43: International in-migration to India by country of origin
opts, c, s = rotate_options(
    "Bangladesh accounts for the largest share (over 50%) of all foreign-born migrants in India, followed by Pakistan and Nepal",
    ["United States accounts for 90% of immigrants in India", "Australia accounts for 75% of immigrants in India", "Germany accounts for 60% of immigrants in India"],
    "C",
    "Among foreign-born migrants living in India, neighboring Bangladesh accounts for the largest proportion (over 50%), followed by Pakistan, Nepal, and Sri Lanka.\nHence, Option {{CORR}} is correct.",
    "Identifies Bangladesh as the leading country of origin for international immigrants in India."
)
add_u9(make_question(CHAPTER_U9, "International Migration", "Which neighboring country accounts for the largest share of international immigrants enumerated in India?", opts, c, s))

# Q44: Net out-migration from India: Indian Diaspora
opts, c, s = rotate_options(
    "Indentured laborers during colonial period (Girmitiyas), semi-skilled workers to West Asia during oil boom, and professionals (IT/doctors) to USA/UK",
    ["Only medieval Buddhist monks traveling to China on foot", "Pirates operating off the coast of Madagascar", "Nomadic hunters migrating to Antarctic ice sheets"],
    "D",
    "The Indian diaspora evolved in three waves: (1) Colonial indentured laborers (Girmitiyas to Mauritius, Fiji, Caribbean), (2) Professionals and semi-skilled labor to West Asia (Gulf boom 1970s), and (3) Highly educated software engineers/doctors to North America and Europe.\nHence, Option {{CORR}} is correct.",
    "Summarizes the three historical waves of the Indian overseas diaspora."
)
add_u9(make_question(CHAPTER_U9, "Indian Diaspora", "What are the three distinct historical waves of Indian emigration that shaped the modern Indian diaspora?", opts, c, s))

# Q45: Girmitiya labor destination countries
opts, c, s = rotate_options(
    "Mauritius, Fiji, Trinidad & Tobago, Guyana, and Suriname",
    ["Norway, Sweden, Denmark, and Finland", "Japan, South Korea, and Taiwan", "Russia, Poland, and Ukraine"],
    "A",
    "During the British colonial era, millions of indentured Indian laborers ('Girmitiyas' bound by Girmit agreements) were shipped to sugarcane plantations in Mauritius, Fiji, Trinidad, Guyana, and Suriname.\nHence, Option {{CORR}} is correct.",
    "Lists historic destinations of colonial indentured Indian 'Girmitiya' labor."
)
add_u9(make_question(CHAPTER_U9, "Indian Diaspora", "To which colonial plantation territories were Indian indentured laborers ('Girmitiyas') predominantly transported?", opts, c, s))

# Q46: Gulf Boom emigration states
opts, c, s = rotate_options(
    "Kerala, Tamil Nadu, Andhra Pradesh, Uttar Pradesh, and Bihar",
    ["Sikkim, Arunachal Pradesh, and Mizoram", "Jammu and Kashmir and Himachal Pradesh", "Nagaland and Manipur"],
    "B",
    "Following the 1973 oil boom, hundreds of thousands of semi-skilled and skilled laborers migrated to the Gulf countries (UAE, Saudi Arabia, Kuwait), predominantly from Kerala, Tamil Nadu, AP, UP, and Bihar.\nHence, Option {{CORR}} is correct.",
    "Identifies Indian source states for labor migration to West Asia."
)
add_u9(make_question(CHAPTER_U9, "Gulf Migration", "Which Indian states became the primary sources of labor migration to the Gulf countries (West Asia) after the 1970s?", opts, c, s))

# Q47: Brain Drain phenomenon
opts, c, s = rotate_options(
    "Emigration of highly trained doctors, engineers, and scientists from developing countries like India to Western developed nations",
    ["The loss of human memory due to severe dehydration", "The physical injury to workers in underground coal mines", "The retirement of elderly civil servants from government service"],
    "C",
    "Brain drain refers to the emigration of highly educated, skilled human capital (software professionals, physicians, research scientists) from India to the USA, UK, and Canada, resulting in domestic talent loss.\nHence, Option {{CORR}} is correct.",
    "Defines 'Brain Drain' as high-skill professional emigration to developed nations."
)
add_u9(make_question(CHAPTER_U9, "Skilled Migration", "What does the term 'Brain Drain' designate in the context of Indian international migration?", opts, c, s))

# Q48: Physiological Density formula
opts, c, s = rotate_options(
    "Total Population / Net Cultivated (Sown) Area",
    ["Total Population / Total Geographic Area", "Total Agricultural Laborers / Total Forest Area", "Total Urban Population / Total Desert Area"],
    "D",
    "Physiological density reflects the real pressure of human population on agricultural land: Physiological Density = Total Population / Net Cultivated Area.\nHence, Option {{CORR}} is correct.",
    "Accurately specifies the formula for Physiological Density (Total Population / Net Cultivated Area)."
)
add_u9(make_question(CHAPTER_U9, "Density Metrics", "How is 'Physiological Density' calculated to measure real population pressure on agricultural land?", opts, c, s))

# Q49: Agricultural Density formula
opts, c, s = rotate_options(
    "Total Agricultural Population / Net Cultivated Area",
    ["Total Urban Population / Total Highway Length", "Total Population / Total Area", "Total Number of Tractors / Total Cultivated Land"],
    "A",
    "Agricultural density assesses the labor intensity on arable land: Agricultural Density = Total Agricultural Population (cultivators + agricultural laborers + their dependents) / Net Cultivated Area.\nHence, Option {{CORR}} is correct.",
    "Specifies Agricultural Density as Total Agricultural Population divided by Net Cultivated Area."
)
add_u9(make_question(CHAPTER_U9, "Density Metrics", "What is the mathematical formula used to calculate 'Agricultural Density'?", opts, c, s))

# Q50: Sequence of States by Population 2011
add_u9(make_sequence_question(
    CHAPTER_U9, "State Populations",
    "Arrange the following states in descending order of their total population as per Census 2011:",
    [("A", "Bihar"), ("B", "Uttar Pradesh"), ("C", "Maharashtra"), ("D", "West Bengal")],
    "B, C, A, D", "B",
    "1. Uttar Pradesh is 1st (199.8 million) (B).\n2. Maharashtra is 2nd (112.4 million) (C).\n3. Bihar is 3rd (104.1 million) (A).\n4. West Bengal is 4th (91.3 million) (D).",
    "Ranks India's four most populous states in descending order as per Census 2011."
))

# Q51: Grierson's Linguistic Survey findings
opts, c, s = rotate_options(
    "179 languages and 544 dialects were enumerated in his comprehensive survey (1903-1928)",
    ["Exactly 2 languages across all of India", "10,000 national scheduled languages", "Only Sanskrit and Latin"],
    "C",
    "Sir George Grierson's monumental 'Linguistic Survey of India' (conducted between 1903 and 1928) identified 179 languages and 544 dialects across the Indian subcontinent.\nHence, Option {{CORR}} is correct.",
    "Identifies George Grierson's survey findings: 179 languages and as many as 544 dialects."
)
add_u9(make_question(CHAPTER_U9, "Linguistic Survey", "According to George Abraham Grierson's historic 'Linguistic Survey of India', how many languages and dialects existed in the country?", opts, c, s))

# Q52: Eighth Schedule of Indian Constitution
opts, c, s = rotate_options(
    "22 Scheduled Languages",
    ["14 Scheduled Languages", "18 Scheduled Languages", "28 Scheduled Languages"],
    "D",
    "There are 22 languages officially recognized and listed in the Eighth Schedule of the Constitution of India (Hindi, Bengali, Marathi, Telugu, Tamil, Urdu, Gujarati, Kannada, Odia, Malayalam, Punjabi, Assamese, Maithili, Santali, Kashmiri, Nepali, Sindhi, Dogri, Konkani, Bodo, Manipuri, Sanskrit).\nHence, Option {{CORR}} is correct.",
    "Identifies that there are 22 official languages in the Eighth Schedule of the Indian Constitution."
)
add_u9(make_question(CHAPTER_U9, "Constitutional Framework", "How many scheduled languages are currently listed in the Eighth Schedule of the Constitution of India?", opts, c, s))

# Q53: Smallest scheduled languages by speakers
opts, c, s = rotate_options(
    "Sanskrit, Bodo, and Manipuri have the smallest speaker populations among scheduled languages",
    ["Hindi, Bengali, and Marathi", "Telugu, Tamil, and Urdu", "Gujarati, Punjabi, and Kannada"],
    "A",
    "Among the scheduled languages, Sanskrit has the fewest speakers (around 24,000), followed by Bodo, Manipuri, and Dogri.\nHence, Option {{CORR}} is correct.",
    "Identifies Sanskrit, Bodo, and Manipuri as having the smallest speaker counts in the 8th Schedule."
)
add_u9(make_question(CHAPTER_U9, "Scheduled Languages", "Which of the following scheduled languages have the smallest percentage of native speakers in India?", opts, c, s))

# Q54: Female work participation in primary activities
opts, c, s = rotate_options(
    "High concentration in agricultural labor and cultivation, but low presence in secondary factory manufacturing and high-end services",
    ["Dominating 99% of civil aviation and merchant navy captains", "Exclusively employed in software algorithm development", "Prohibited from touching any agricultural crops"],
    "B",
    "In India, female workers are heavily concentrated in the primary agricultural sector (especially as unpaid family helpers and agricultural wage laborers), but their participation in manufacturing and formal services remains disproportionately low.\nHence, Option {{CORR}} is correct.",
    "Highlights female worker concentration in agricultural labor."
)
add_u9(make_question(CHAPTER_U9, "Gender and Work", "What structural pattern characterizes female workforce participation in India according to census data?", opts, c, s))

# Q55: Inter-censal migration duration definition
opts, c, s = rotate_options(
    "Migration by place of last residence: enumerated if the person's last place of residence differs from the place of enumeration",
    ["Only recorded if the migrant crossed an international ocean by submarine", "Recorded only if the migrant changed their legal name", "Recorded only if the migrant purchased commercial real estate"],
    "C",
    "In the Indian Census, migration is enumerated based on two criteria: (1) Place of Birth (if different from place of enumeration: life-time migrant), and (2) Place of Last Residence (if different from place of enumeration: migrant by last residence).\nHence, Option {{CORR}} is correct.",
    "Explains the two census criteria for measuring migration: place of birth and place of last residence."
)
add_u9(make_question(CHAPTER_U9, "Census Enumeration", "On which two distinct bases does the Census of India enumerate internal migrants?", opts, c, s))

# Q56: Lifetime Migrant definition
opts, c, s = rotate_options(
    "A person whose place of birth is different from the place of census enumeration",
    ["A person who has traveled to 100 foreign countries", "A person who works 80 years in a single factory", "A person who was born on an airplane in flight"],
    "D",
    "If a person's place of birth does not match the place where they are enumerated during the census, that person is categorized as a 'Lifetime Migrant'.\nHence, Option {{CORR}} is correct.",
    "Defines Lifetime Migrant as born in a place different from the enumeration site."
)
add_u9(make_question(CHAPTER_U9, "Census Enumeration", "When is an individual officially categorized as a 'Lifetime Migrant' in the Census of India?", opts, c, s))

# Q57: Push factor: Land fragmentation
opts, c, s = rotate_options(
    "Successive division of ancestral holdings among heirs creates tiny non-viable plots, forcing rural youth to seek urban jobs",
    ["Consolidation of agricultural land into 50,000-acre corporate ranches", "Free distribution of modern tractors to all landless laborers", "Construction of free municipal housing in every village"],
    "A",
    "Severe fragmentation of landholdings caused by laws of inheritance reduces average farm size to uneconomic fractions, making farming inadequate to support family needs and pushing members toward cities.\nHence, Option {{CORR}} is correct.",
    "Explains land fragmentation as a major rural push factor in migration."
)
add_u9(make_question(CHAPTER_U9, "Migration Push Factors", "How does 'Fragmentation of Landholdings' act as a potent push factor in rural India?", opts, c, s))

# Q58: Pull factor: City infrastructure
opts, c, s = rotate_options(
    "Availability of higher education institutions, advanced healthcare facilities, dependable electricity, and entertainment",
    ["Frequent devastating earthquakes and tsunamis in city centers", "Total absence of drinking water and food markets in cities", "Mandatory curfews and closure of all transport links"],
    "B",
    "Better educational institutions, specialized hospitals, stable utilities, modern amenities, and social mobility act as powerful urban pull factors attracting youth from rural hinterlands.\nHence, Option {{CORR}} is correct.",
    "Identifies civic infrastructure, education, and healthcare as urban pull factors."
)
add_u9(make_question(CHAPTER_U9, "Migration Pull Factors", "Which of the following amenities constitute powerful 'Pull Factors' drawing rural migrants to Indian metropolitan centers?", opts, c, s))

# Q59: Remittances from overseas Indian workers
opts, c, s = rotate_options(
    "India is the world's top recipient of international remittances, receiving over $80-100 billion annually from diaspora in Gulf and West",
    ["India sends $500 billion to foreign countries as aid every month", "India has prohibited all citizens from sending money home", "Remittances to India are strictly zero"],
    "C",
    "India has consistently ranked as the world's top recipient of international migrant remittances (surpassing $80 to $100 billion annually), significantly bolstering national foreign exchange reserves and domestic consumption in states like Kerala, Punjab, and Goa.\nHence, Option {{CORR}} is correct.",
    "Highlights India as the world's top recipient of foreign remittances (over $80-100 billion)."
)
add_u9(make_question(CHAPTER_U9, "International Remittances", "What is India's global standing regarding foreign exchange remittances received from its overseas diaspora?", opts, c, s))

# Q60: Adolescent Population in India (Census 2011)
opts, c, s = rotate_options(
    "Accounts for about 20.9% of total population (aged 10-19 years), representing a critical human resource requiring targeted health and educational empowerment",
    ["Accounts for less than 1% of the total population", "Accounts for 75% of the total population", "Accounts for zero percent as all citizens are over 50 years old"],
    "D",
    "Adolescents (aged 10-19 years) constitute about 20.9% of India's population (Census 2011). Because this cohort faces issues of early marriage, malnutrition, anemia, and school dropouts, specialized interventions are vital.\nHence, Option {{CORR}} is correct.",
    "Specifies that adolescents (aged 10-19) constitute 20.9% of India's population."
)
add_u9(make_question(CHAPTER_U9, "Adolescent Population", "What proportion of India's population is comprised of 'Adolescents' (aged 10-19 years) as per Census 2011?", opts, c, s))

validate_and_collect(u9_qs, u9_seen)
assert len(u9_qs) == 60
with open("mock/geo_units/unit9.json", "w", encoding="utf-8") as f:
    json.dump(u9_qs, f, indent=2, ensure_ascii=False)
print("Unit 9 generated: 60 questions")

# =================================================================================================
# UNIT 10: India: Land Resources & Agriculture (60 Questions)
# =================================================================================================
CHAPTER_U10 = "India: Land Resources and Agriculture"
u10_qs = []
u10_seen = set()

def add_u10(q):
    u10_qs.append(q)

# Q1: Net Sown Area definition
opts, c, s = rotate_options(
    "The total physical extent of land on which crops are sown and harvested during an agricultural year",
    ["The total area of land owned by the national defense ministry", "The area covered by inland rivers and glacial lakes", "Land that has been abandoned for more than 50 years"],
    "A",
    "Net Sown Area represents the total physical area sown with crops and orchards counting each hectare only once, regardless of whether it is cropped once or multiple times in the year.\nHence, Option {{CORR}} is correct.",
    "Defines Net Sown Area as the physical extent of cropped land."
)
add_u10(make_question(CHAPTER_U10, "Land Use Categories", "What is the official definition of 'Net Sown Area' in Indian land records?", opts, c, s))

# Q2: Current Fallow definition
opts, c, s = rotate_options(
    "Cultivable land left without cultivation for one year or less to naturally recover its soil fertility",
    ["Land left uncultivated for more than 10 consecutive years", "Land permanently paved with concrete for highway toll plazas", "Land submerged beneath seawater during high tide"],
    "B",
    "Current fallow is the land which is left without cultivation for one agricultural year or less. Fallowing is a traditional cultural practice allowing depleted soil to regain its natural fertility.\nHence, Option {{CORR}} is correct.",
    "Defines Current Fallow as land left uncultivated for 1 year or less."
)
add_u10(make_question(CHAPTER_U10, "Land Use Categories", "What is meant by 'Current Fallow' in agricultural land classification?", opts, c, s))

# Q3: Fallow other than Current Fallow
opts, c, s = rotate_options(
    "Cultivable land left uncultivated for more than one year but less than five years",
    ["Land uncultivated for exactly 100 years", "Land under permanent snowcaps in Ladakh", "Land used exclusively for industrial chemical waste dumps"],
    "C",
    "Land left fallow for a period of more than one year and up to five years is classified as 'Fallow other than current fallow'. If left uncultivated beyond five years, it becomes 'Culturable wasteland'.\nHence, Option {{CORR}} is correct.",
    "Defines Fallow other than current fallow as uncultivated for 1 to 5 years."
)
add_u10(make_question(CHAPTER_U10, "Land Use Categories", "How is 'Fallow Other Than Current Fallow' defined in land-use records?", opts, c, s))

# Q4: Culturable Wasteland definition
opts, c, s = rotate_options(
    "Land available for cultivation but not cultivated during the last five years or more in succession; can be reclaimed using soil conservation",
    ["Rocky mountain precipices where no plants can grow", "Land occupied by railway platforms and airports", "Land reserved exclusively for urban cemetery burial grounds"],
    "D",
    "Culturable wasteland includes land available for cultivation (whether fallow or covered with shrubs) which has not been cultivated during the current year and the last five years or more in succession. It can be brought under farming through reclamation.\nHence, Option {{CORR}} is correct.",
    "Defines Culturable Wasteland as land uncultivated for 5+ years that can be reclaimed."
)
add_u10(make_question(CHAPTER_U10, "Land Use Categories", "What constitutes 'Culturable Wasteland' in Indian agricultural land-use statistics?", opts, c, s))

# Q5: Three Cropping Seasons: Kharif, Rabi, Zaid
opts, c, s = rotate_options(
    "Kharif (June-September), Rabi (October-March), and Zaid (April-June)",
    ["Spring (January-March), Summer (April-June), and Autumn (July-September)", "Monsoon (August-October), Winter (December-February), and Dry (March-May)", "Season 1 (July), Season 2 (November), Season 3 (March)"],
    "A",
    "India has three distinct agricultural cropping seasons: Kharif (coincides with Southwest monsoon, June to September), Rabi (begins with onset of winter, October to March/April), and Zaid (short summer season, April to June).\nHence, Option {{CORR}} is correct.",
    "Lists India's three cropping seasons and calendar timings: Kharif, Rabi, Zaid."
)
add_u10(make_question(CHAPTER_U10, "Cropping Seasons", "What are the three distinct cropping seasons in India and their respective calendar spans?", opts, c, s))

# Q6: Kharif Season crops
opts, c, s = rotate_options(
    "Rice, cotton, jute, jowar, bajra, tur, and maize",
    ["Wheat, gram, rapeseed, mustard, and barley", "Watermelon, cucumber, vegetables, and summer fodder", "Apples, cherries, almonds, and walnuts"],
    "B",
    "Kharif crops are sown with the onset of the southwest monsoon in June/July: Rice, Cotton, Jute, Jowar, Bajra, Tur (Arhar), Groundnut, and Maize.\nHence, Option {{CORR}} is correct.",
    "Identifies major Kharif crops (monsoon season): Rice, Cotton, Jute, Jowar, Bajra, Tur."
)
add_u10(make_question(CHAPTER_U10, "Cropping Seasons", "Which of the following groups consists exclusively of 'Kharif' crops?", opts, c, s))

# Q7: Rabi Season crops
opts, c, s = rotate_options(
    "Wheat, gram, rapeseed, mustard, barley, and peas",
    ["Rice, jute, cotton, and sugarcane", "Watermelon, muskmelon, and cucumber", "Rubber, tea, coffee, and cocoa"],
    "C",
    "Rabi crops are winter crops sown in October-November and harvested in March-April: Wheat, Gram, Rapeseed and Mustard, Barley, and Peas.\nHence, Option {{CORR}} is correct.",
    "Identifies major Rabi crops (winter season): Wheat, Gram, Mustard, Barley."
)
add_u10(make_question(CHAPTER_U10, "Cropping Seasons", "Which of the following sets comprises quintessential 'Rabi' crops in India?", opts, c, s))

# Q8: Zaid Season crops
opts, c, s = rotate_options(
    "Watermelon, muskmelon, cucumber, seasonal vegetables, and fodder crops",
    ["Wheat, mustard, and gram", "Cotton, jute, and paddy", "Coffee, tea, and rubber"],
    "D",
    "Zaid is a short summer cropping season between March/April and June, specializing in fast-maturing crops: watermelons, cucumbers, vegetables, and green fodder.\nHence, Option {{CORR}} is correct.",
    "Identifies Zaid crops (summer season): watermelon, cucumber, fodder."
)
add_u10(make_question(CHAPTER_U10, "Cropping Seasons", "Which crops are characteristically cultivated during the short summer 'Zaid' season?", opts, c, s))

# Q9: Rice: Three seasonal crops in West Bengal (Aus, Aman, Boro)
opts, c, s = rotate_options(
    "Aus (autumn), Aman (winter), and Boro (summer)",
    ["Kharif, Rabi, and Zaid", "Paddy, Basmati, and Sona Masoori", "Jhum, Milpa, and Ladang"],
    "A",
    "In West Bengal, Assam, and parts of coastal Odisha, farmers grow three crops of rice in an agricultural year due to warm year-round temperatures and water availability: Aus (autumn rice), Aman (winter rice), and Boro (summer rice).\nHence, Option {{CORR}} is correct.",
    "Identifies Aus, Aman, and Boro as the three rice crops grown annually in West Bengal/Assam."
)
add_u10(make_question(CHAPTER_U10, "Rice Cultivation", "What are the names of the three successive rice crops cultivated within a single year in West Bengal and Assam?", opts, c, s))

# Q10: Rice climatic and soil conditions
opts, c, s = rotate_options(
    "High temperature (above 25°C), high humidity with annual rainfall above 100 cm, and heavy clayey/alluvial soils with standing water",
    ["Freezing sub-zero temperatures with dry sandy desert soil", "Temperate climate with 20 cm rainfall and chalky limestone hills", "Perennial drought with zero irrigation"],
    "B",
    "Rice is a tropical, semi-aquatic plant requiring high temperatures (above 25°C), high humidity, annual rainfall above 100 cm (or canal irrigation), and deep clayey/loamy alluvial soil that can hold standing water.\nHence, Option {{CORR}} is correct.",
    "Specifies climatic and soil requirements for wet paddy rice cultivation."
)
add_u10(make_question(CHAPTER_U10, "Rice Cultivation", "What are the ideal climatic and soil requirements for the cultivation of rice in India?", opts, c, s))

# Q11: Top Rice producing states
opts, c, s = rotate_options(
    "West Bengal, Uttar Pradesh, and Punjab",
    ["Rajasthan, Gujarat, and Haryana", "Maharashtra, Karnataka, and Kerala", "Himachal Pradesh, Uttarakhand, and Jammu & Kashmir"],
    "C",
    "The leading rice-producing states in India are West Bengal (largest producer), followed by Uttar Pradesh and Punjab (which achieves the highest per-hectare yield through Green Revolution tubewell irrigation).\nHence, Option {{CORR}} is correct.",
    "Identifies West Bengal, UP, and Punjab as leading rice producers."
)
add_u10(make_question(CHAPTER_U10, "Rice Cultivation", "Which three states are the leading producers of rice in India?", opts, c, s))

# Q12: Wheat climatic requirements
opts, c, s = rotate_options(
    "Cool growing season (10°-15°C) and bright sunshine at the time of ripening, with 50-75 cm annual rainfall",
    ["Continuous tropical torrential rain (300 cm) and 40°C heat throughout the year", "Perennial frost and polar blizzards throughout the growing cycle", "High humidity with standing water covering the crops for 4 months"],
    "D",
    "Wheat is a temperate rabi crop requiring a cool growing season (10°-15°C), bright warm sunshine at harvest/ripening (20°-25°C), and 50 to 75 cm of rainfall or winter canal/tubewell irrigation.\nHence, Option {{CORR}} is correct.",
    "Specifies cool growing season and bright ripening sunshine required for wheat."
)
add_u10(make_question(CHAPTER_U10, "Wheat Cultivation", "What climatic conditions are ideal for the growth and harvesting of wheat in India?", opts, c, s))

# Q13: Leading Wheat producing states
opts, c, s = rotate_options(
    "Uttar Pradesh, Madhya Pradesh, Punjab, and Haryana",
    ["Kerala, Tamil Nadu, and Andhra Pradesh", "Assam, West Bengal, and Odisha", "Goa, Karnataka, and Maharashtra"],
    "A",
    "Uttar Pradesh is the largest wheat producer in India, followed by Madhya Pradesh, Punjab, and Haryana. Punjab and Haryana record the nation's highest per-hectare wheat yields.\nHence, Option {{CORR}} is correct.",
    "Identifies UP, MP, Punjab, and Haryana as India's leading wheat producers."
)
add_u10(make_question(CHAPTER_U10, "Wheat Cultivation", "Which states constitute the principal wheat-producing belt of India?", opts, c, s))

# Q14: Jowar (Sorghum) largest producing state
opts, c, s = rotate_options(
    "Maharashtra, accounting for more than half of the total national production",
    ["Punjab", "West Bengal", "Assam"],
    "B",
    "Maharashtra alone produces more than half of India's total Jowar (sorghum) output, followed by Karnataka, Madhya Pradesh, and Andhra Pradesh.\nHence, Option {{CORR}} is correct.",
    "Identifies Maharashtra as producing over half of India's total Jowar."
)
add_u10(make_question(CHAPTER_U10, "Coarse Cereals", "Which Indian state dominates jowar (sorghum) production, accounting for over half of total national output?", opts, c, s))

# Q15: Bajra (Pearl Millet) largest producing state
opts, c, s = rotate_options(
    "Rajasthan, followed by Uttar Pradesh, Gujarat, and Haryana",
    ["Kerala, followed by Tamil Nadu", "West Bengal, followed by Bihar", "Odisha, followed by Assam"],
    "C",
    "Bajra is a hardy drought-resistant crop grown on poor sandy soils in hot, dry climates. Rajasthan is the largest producer of bajra in India, followed by UP, Gujarat, and Haryana.\nHence, Option {{CORR}} is correct.",
    "Identifies Rajasthan as the largest producer of Bajra."
)
add_u10(make_question(CHAPTER_U10, "Coarse Cereals", "Which state is the largest producer of bajra (pearl millet) in India?", opts, c, s))

# Q16: Gram (Chickpea) largest producing state
opts, c, s = rotate_options(
    "Madhya Pradesh, followed by Rajasthan and Maharashtra",
    ["Kerala, followed by Goa", "West Bengal, followed by Tripura", "Assam, followed by Meghalaya"],
    "D",
    "Gram (chickpea) is the most important pulse crop in India, predominantly grown as a rabi crop in sub-tropical semi-arid areas. Madhya Pradesh is the leading producer, followed by Rajasthan and Maharashtra.\nHence, Option {{CORR}} is correct.",
    "Identifies Madhya Pradesh as the leading producer of gram (chickpea)."
)
add_u10(make_question(CHAPTER_U10, "Pulses", "Which state leads the country in the production of gram (chickpea)?", opts, c, s))

# Q17: Tur / Arhar (Pigeon Pea)
opts, c, s = rotate_options(
    "Second most important pulse crop in India, grown under rainfed conditions; Maharashtra is the largest producer",
    ["A temperate crop grown only in snowbound valleys of Kashmir", "An aquatic plant harvested from tidal mangrove swamps", "A tree crop cultivated only for timber logs"],
    "A",
    "Tur (Arhar or pigeon pea) is the second most important pulse crop in India after gram. It is grown as a rainfed kharif crop. Maharashtra is the leading producer, followed by UP, Karnataka, and Gujarat.\nHence, Option {{CORR}} is correct.",
    "Identifies Tur/Arhar as the 2nd most important pulse, led by Maharashtra."
)
add_u10(make_question(CHAPTER_U10, "Pulses", "What is the status of 'Tur' (Arhar) in Indian agriculture, and which state is its largest producer?", opts, c, s))

# Q18: Groundnut largest producing state
opts, c, s = rotate_options(
    "Gujarat, followed by Rajasthan, Tamil Nadu, and Andhra Pradesh",
    ["Punjab, followed by Haryana", "West Bengal, followed by Bihar", "Assam, followed by Nagaland"],
    "B",
    "Groundnut is the most important oilseed in India, accounting for roughly half of the major oilseeds produced. Gujarat is the largest producer, followed by Rajasthan, Tamil Nadu, and Andhra Pradesh.\nHence, Option {{CORR}} is correct.",
    "Identifies Gujarat as the largest producer of groundnut."
)
add_u10(make_question(CHAPTER_U10, "Oilseeds", "Which Indian state is the premier producer of groundnut?", opts, c, s))

# Q19: Rapeseed and Mustard largest producer
opts, c, s = rotate_options(
    "Rajasthan, accounting for about one-third of the total national output",
    ["Kerala", "Tamil Nadu", "Maharashtra"],
    "C",
    "Rapeseed and mustard are subtropical rabi oilseeds that are sensitive to frost. Rajasthan is the largest producer in India, accounting for over one-third of total national output, followed by Haryana and MP.\nHence, Option {{CORR}} is correct.",
    "Identifies Rajasthan as the premier producer of rapeseed and mustard."
)
add_u10(make_question(CHAPTER_U10, "Oilseeds", "Which state leads India in the production of rapeseed and mustard?", opts, c, s))

# Q20: Cotton: Soil and frost-free days
opts, c, s = rotate_options(
    "Black cotton soil (Regur) of the Deccan plateau, requiring at least 210 frost-free days and warm climate",
    ["Sponge peat moss soil in sub-zero alpine valleys", "Saline marsh soil in coastal mangrove swamps", "Laterite gravel soil with continuous heavy rainfall throughout harvest"],
    "D",
    "Cotton is a tropical and subtropical crop grown on the black soil (regur) of the Deccan and Malwa plateaus. It requires high temperature, light rainfall or irrigation, and at least 210 frost-free days with bright sunshine.\nHence, Option {{CORR}} is correct.",
    "Specifies black regur soil and 210 frost-free days required for cotton."
)
add_u10(make_question(CHAPTER_U10, "Fibre Crops: Cotton", "What soil type and climatic requirement are critical for successful commercial cotton cultivation?", opts, c, s))

# Q21: Leading Cotton producing states
opts, c, s = rotate_options(
    "Gujarat and Maharashtra, followed by Telangana and Andhra Pradesh",
    ["Assam and West Bengal", "Kerala and Goa", "Uttarakhand and Himachal Pradesh"],
    "A",
    "Gujarat and Maharashtra are the leading producers of raw cotton in India, accounting for a major share of national output, followed by Telangana and Andhra Pradesh.\nHence, Option {{CORR}} is correct.",
    "Identifies Gujarat and Maharashtra as the leading cotton producing states."
)
add_u10(make_question(CHAPTER_U10, "Fibre Crops: Cotton", "Which two states are the leading producers of cotton in India?", opts, c, s))

# Q22: Jute: Golden Fibre state
opts, c, s = rotate_options(
    "West Bengal, accounting for about three-fourths (70-75%) of the country's total jute production",
    ["Rajasthan, accounting for 90% of total production", "Gujarat, accounting for 80% of total production", "Punjab, accounting for 60% of total production"],
    "B",
    "Jute is known as the 'golden fibre'. It requires high temperature, heavy rainfall, and fertile floodplains where silt is renewed annually. West Bengal accounts for about 70-75% of India's total jute output, followed by Bihar and Assam.\nHence, Option {{CORR}} is correct.",
    "Identifies West Bengal as producing 70-75% of India's jute."
)
add_u10(make_question(CHAPTER_U10, "Fibre Crops: Jute", "Which Indian state dominates the production of 'Jute' (the golden fibre), contributing roughly three-fourths of total national production?", opts, c, s))

# Q23: Sugarcane: North vs South India
opts, c, s = rotate_options(
    "Uttar Pradesh has the largest acreage and production, but Southern states (Maharashtra, Tamil Nadu) have higher yields and higher sucrose content due to maritime climate",
    ["Northern states have much higher sucrose content than southern states", "Sugarcane cannot be grown anywhere in South India", "Sugarcane is grown exclusively on the Himalayan snowline"],
    "C",
    "Uttar Pradesh is the largest producer of sugarcane in India. However, the tropical maritime climate of peninsular India (Maharashtra, Tamil Nadu, Karnataka) yields higher cane tonnage per hectare and higher sucrose percentage with longer crushing seasons.\nHence, Option {{CORR}} is correct.",
    "Explains UP's production lead vs Southern India's superior yield and sucrose content."
)
add_u10(make_question(CHAPTER_U10, "Sugarcane Cultivation", "How does sugarcane cultivation in South India compare with that in North India (Uttar Pradesh)?", opts, c, s))

# Q24: Tea: Origin and soil conditions
opts, c, s = rotate_options(
    "Indigenous to northern China hills; requires deep, fertile, well-drained loamy soil rich in humus and organic matter on undulating hills without stagnant water",
    ["Indigenous to the Sahara desert; requires heavy alkaline clay with stagnant floodwater", "Indigenous to the Arctic tundra; requires frozen permafrost soil", "Indigenous to the Amazon basin; requires complete shade and zero rainfall"],
    "D",
    "Tea is a plantation beverage crop indigenous to the hills of northern China. It requires a sub-tropical climate, warm moist frost-free weather, frequent showers distributed evenly throughout the year, and well-drained, acidic loamy slopes that prevent waterlogging around roots.\nHence, Option {{CORR}} is correct.",
    "Details tea soil/topography requirements: well-drained undulating loamy slopes rich in humus."
)
add_u10(make_question(CHAPTER_U10, "Plantation Crops: Tea", "What are the essential soil and topographic conditions required for commercial tea plantation cultivation?", opts, c, s))

# Q25: Leading Tea producing state
opts, c, s = rotate_options(
    "Assam (Brahmaputra and Barak valleys), accounting for over half of India's total tea production",
    ["Gujarat", "Punjab", "Rajasthan"],
    "A",
    "Assam is the leading tea-producing state in India, contributing more than half of the total national tea output, followed by West Bengal (Darjeeling, Jalpaiguri) and Tamil Nadu (Nilgiri hills).\nHence, Option {{CORR}} is correct.",
    "Identifies Assam as producing over half of India's total tea."
)
add_u10(make_question(CHAPTER_U10, "Plantation Crops: Tea", "Which state leads India in tea production, contributing over half of the country's total output?", opts, c, s))

# Q26: Coffee variety in India
opts, c, s = rotate_options(
    "Arabica variety (originally brought from Yemen), known for its superior international market quality, alongside Robusta",
    ["Excelsa variety brought from Siberia", "Tundra dwarf variety harvested from permafrost", "Carthaginian variety bred in the Sahara"],
    "B",
    "India predominantly produces high-quality Arabica coffee (originally brought from Yemen by Baba Budan) which is in high demand worldwide for its superior cup aroma, as well as the robust Robusta variety.\nHence, Option {{CORR}} is correct.",
    "Identifies Arabica (from Yemen) as India's premium coffee variety."
)
add_u10(make_question(CHAPTER_U10, "Plantation Crops: Coffee", "Which prized variety of coffee, originally brought from Yemen, is famously cultivated in India?", opts, c, s))

# Q27: Leading Coffee producing state
opts, c, s = rotate_options(
    "Karnataka, accounting for more than 70% of total national coffee production (in Kodagu, Chikmagalur, and Hassan districts)",
    ["Assam, accounting for 90%", "Uttar Pradesh, accounting for 60%", "Punjab, accounting for 50%"],
    "C",
    "Karnataka is the undisputed leader in Indian coffee production, accounting for over 70% of total national output, concentrated in the Western Ghats highlands of Kodagu, Chikmagalur, and Hassan.\nHence, Option {{CORR}} is correct.",
    "Identifies Karnataka as producing over 70% of India's coffee."
)
add_u10(make_question(CHAPTER_U10, "Plantation Crops: Coffee", "Which state dominates coffee production in India, contributing over 70 percent of total output?", opts, c, s))

# Q28: Protective vs Productive Irrigation
opts, c, s = rotate_options(
    "Protective irrigation protects crops from adverse soil moisture deficits during dry spells; Productive irrigation provides optimal moisture throughout crop cycle for maximum yield",
    ["Protective irrigation uses sea water, while productive uses river water", "Protective irrigation is conducted by the military, while productive is conducted by farmers", "Both are identical and refer exclusively to rainwater harvesting"],
    "D",
    "Protective irrigation aims to protect crops from adverse effects of soil moisture deficiency and act as supplementary insurance to save crops. Productive irrigation provides sufficient moisture throughout the crop growth cycle to achieve maximum high-yield potential.\nHence, Option {{CORR}} is correct.",
    "Distinguishes protective irrigation (moisture insurance) from productive irrigation (yield maximization)."
)
add_u10(make_question(CHAPTER_U10, "Irrigation Types", "What is the distinction between 'Protective Irrigation' and 'Productive Irrigation' in Indian farming?", opts, c, s))

# Q29: Dryland vs Wetland Farming
opts, c, s = rotate_options(
    "Dryland farming is practiced in areas with rainfall <75 cm (growing drought-hardy crops like ragi, bajra, pulses); Wetland farming in areas with rainfall >75 cm (growing water-intensive paddy, sugarcane, jute)",
    ["Dryland farming is conducted in greenhouses, while wetland farming is done on deserts", "Dryland farming grows only rice, while wetland farming grows only wheat", "Dryland farming requires 500 cm of rain, while wetland requires 5 cm"],
    "A",
    "In India, dryland farming is confined to regions with annual rainfall less than 75 cm, cultivating drought-resistant crops (ragi, bajra, gram, guar) and practicing soil moisture conservation. Wetland farming occurs in areas with rainfall above 75 cm, growing rice, jute, and sugarcane.\nHence, Option {{CORR}} is correct.",
    "Distinguishes dryland farming (<75 cm rain) from wetland farming (>75 cm rain)."
)
add_u10(make_question(CHAPTER_U10, "Farming Systems", "How are 'Dryland Farming' and 'Wetland Farming' differentiated in Indian agricultural geography?", opts, c, s))

# Q30: Match Major Crops with Leading Producer States
add_u10(make_match_question(
    CHAPTER_U10, "Crop Geographies",
    "Match List I (Crop) with List II (Leading Producer State):",
    [("A", "Tea"), ("B", "Coffee"), ("C", "Jute"), ("D", "Groundnut")],
    [("I", "Karnataka"), ("II", "Assam"), ("III", "Gujarat"), ("IV", "West Bengal")],
    "A-II, B-I, C-IV, D-III", "B",
    "Tea is led by Assam (II); Coffee is led by Karnataka (I); Jute is led by West Bengal (IV); Groundnut is led by Gujarat (III).",
    "Correctly matches major commercial and cash crops to their top producing states."
))

# Q31: Match Agricultural Seasons with Crops
add_u10(make_match_question(
    CHAPTER_U10, "Cropping Seasons",
    "Match List I (Cropping Season) with List II (Typical Crop Cultivated):",
    [("A", "Kharif"), ("B", "Rabi"), ("C", "Zaid"), ("D", "Perennial Plantation")],
    [("I", "Wheat and Gram"), ("II", "Watermelon and Cucumber"), ("III", "Rice and Cotton"), ("IV", "Tea and Coffee")],
    "A-III, B-I, C-II, D-IV", "C",
    "Kharif corresponds to Rice and Cotton (III); Rabi corresponds to Wheat and Gram (I); Zaid corresponds to Watermelon and Cucumber (II); Perennial plantation corresponds to Tea and Coffee (IV).",
    "Matches Indian agricultural cropping seasons with their representative crops."
))

# Q32: Statement on Green Revolution in India
add_u10(make_statement_question(
    CHAPTER_U10, "Green Revolution",
    "The Green Revolution in the late 1960s introduced High Yielding Varieties (HYV) of wheat and rice along with chemical fertilizers and assured tubewell irrigation.",
    "The Green Revolution was initially adopted uniformly across all rainfed, dryland, and tribal districts of India without any regional disparity.",
    3, "D",
    "Statement I is correct: HYV seeds, fertilizers, and irrigation transformed food production. Statement II is false: the Green Revolution was initially concentrated in irrigated northwestern states (Punjab, Haryana, western UP), creating marked inter-regional disparities.",
    "Assesses the technology package and regional concentration of the Green Revolution."
))

# Q33: Assertion-Reason on Pulses as Leguminous Crops
add_u10(make_assertion_question(
    CHAPTER_U10, "Pulses",
    "Pulses are widely cultivated in crop rotation cycles across Indian agricultural plains.",
    "Being leguminous crops, pulses fix atmospheric nitrogen in the soil through root-nodule bacteria, naturally restoring soil fertility.",
    1, "A",
    "Both Assertion and Reason are true, and Reason is the correct explanation. Leguminous pulses (gram, tur, moong) harbor Rhizobium bacteria that fix nitrogen, replenishing soil fertility for succeeding cereal crops.",
    "Explains the ecological and soil-fertility role of pulses in crop rotation."
))

# Q34: Multi-statement on Agricultural Problems in India
add_u10(make_multi_statement_question(
    CHAPTER_U10, "Agricultural Challenges",
    "Which of the following constitute chronic structural challenges faced by Indian agriculture?",
    [
        ("A", "Excessive dependence on erratic monsoon rainfall in rainfed tracts."),
        ("B", "Low per-hectare productivity compared to international standards."),
        ("C", "Extreme fragmentation and sub-division of operational landholdings."),
        ("D", "Universal shortage of sunlight and warmth across peninsular plains.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C are real, well-known problems of Indian agriculture. Statement D is false because India enjoys abundant tropical and sub-tropical sunshine throughout the year.",
    "Identifies structural and technological bottlenecks in Indian agriculture."
))

# Q35: Cropping Intensity formula
opts, c, s = rotate_options(
    "Cropping Intensity = (Gross Cropped Area / Net Sown Area) * 100",
    ["Cropping Intensity = (Net Sown Area / Total Geographic Area) * 100", "Cropping Intensity = (Total Agricultural Laborers / Culturable Wasteland) * 100", "Cropping Intensity = (Total Fertilizer Consumption / Gross Cropped Area) * 10"],
    "C",
    "Cropping intensity indicates the number of times a crop is grown on the same field in a single year: Cropping Intensity = (Gross Cropped Area / Net Sown Area) * 100.\nHence, Option {{CORR}} is correct.",
    "Specifies the formula for Cropping Intensity in agricultural statistics."
)
add_u10(make_question(CHAPTER_U10, "Agricultural Metrics", "How is 'Cropping Intensity' mathematically calculated in agricultural economics?", opts, c, s))

# Q36: Gross Cropped Area definition
opts, c, s = rotate_options(
    "Total area sown once as well as more than once in an agricultural year (counting multiple cropped fields repeatedly)",
    ["The physical land area of the entire national territory", "The land area under forest reserves exclusively", "The land left fallow without cultivation for 5 years"],
    "D",
    "Gross Cropped Area (GCA) is the total area sown with crops: if a field of 1 hectare is sown twice in a year, its Net Sown Area is 1 hectare, but its Gross Cropped Area is 2 hectares.\nHence, Option {{CORR}} is correct.",
    "Defines Gross Cropped Area as counting multi-cropped acreage each time it is sown."
)
add_u10(make_question(CHAPTER_U10, "Agricultural Metrics", "What does 'Gross Cropped Area' measure in land-use statistics?", opts, c, s))

# Q37: Barren and Wastelands
opts, c, s = rotate_options(
    "Land that cannot be brought under cultivation with available technologies (e.g. barren rocky hills, desert sand dunes, deep ravines)",
    ["Fertile alluvial floodplains waiting for canal water", "Land under multi-story residential housing complexes", "Orchards bearing apples and mangoes"],
    "A",
    "Barren and wasteland covers land which cannot be brought under cultivation with existing cost-effective technologies, such as bare rocky mountains, sand dunes in deserts, and highly gullied ravine lands.\nHence, Option {{CORR}} is correct.",
    "Defines Barren and Wasteland as uncultivable terrain like rocky hills and sand dunes."
)
add_u10(make_question(CHAPTER_U10, "Land Use Categories", "What type of terrain is classified under 'Barren and Wasteland' in Indian land records?", opts, c, s))

# Q38: Decline in common pasture lands
opts, c, s = rotate_options(
    "Conversion of pastures into agricultural fields and non-agricultural infrastructure, reducing grazing resources for landless pastoralists",
    ["Spontaneous freezing of all grasslands under permanent ice sheets", "Banning of domestic cattle from entering rural villages", "The mandatory conversion of all pastures into salt pans"],
    "B",
    "Permanent pastures and grazing lands have declined in India due to illegal encroachment, conversion into cultivated fields under population pressure, and diversion for rural road and housing construction.\nHence, Option {{CORR}} is correct.",
    "Explains the causes and consequences of declining common property pasture lands."
)
add_u10(make_question(CHAPTER_U10, "Pasture Land", "What factor explains the continuous decline in 'Permanent Pastures and Grazing Lands' in rural India?", opts, c, s))

# Q39: Ragi (Finger Millet) leading producer
opts, c, s = rotate_options(
    "Karnataka, accounting for the largest share of national production",
    ["Punjab", "Haryana", "Uttar Pradesh"],
    "C",
    "Ragi is a highly nutritious coarse millet rich in calcium and iron, grown in dry regions of southern India. Karnataka is the largest producer of ragi in India.\nHence, Option {{CORR}} is correct.",
    "Identifies Karnataka as the leading producer of ragi (finger millet)."
)
add_u10(make_question(CHAPTER_U10, "Millets", "Which state is the leading producer of 'Ragi' (finger millet) in India?", opts, c, s))

# Q40: Soyabean leading producer state
opts, c, s = rotate_options(
    "Madhya Pradesh and Maharashtra",
    ["Kerala and Tamil Nadu", "West Bengal and Assam", "Himachal Pradesh and Jammu & Kashmir"],
    "D",
    "Madhya Pradesh (traditionally called the 'Soybean State') and Maharashtra together account for the bulk of India's total soybean production.\nHence, Option {{CORR}} is correct.",
    "Identifies Madhya Pradesh and Maharashtra as leading soybean producing states."
)
add_u10(make_question(CHAPTER_U10, "Oilseeds", "Which two states dominate commercial 'Soybean' production in India?", opts, c, s))

# Q41: Sunflower leading producer state
opts, c, s = rotate_options(
    "Karnataka, followed by Odisha, Bihar, and Maharashtra",
    ["Punjab and Haryana", "Rajasthan and Gujarat", "Assam and Meghalaya"],
    "A",
    "Karnataka is the leading producer of sunflower in India, an important commercial edible oilseed crop grown in dryland regions.\nHence, Option {{CORR}} is correct.",
    "Identifies Karnataka as the leading producer of sunflower."
)
add_u10(make_question(CHAPTER_U10, "Oilseeds", "Which Indian state leads in the production of 'Sunflower' oilseed?", opts, c, s))

# Q42: Retting process in Jute
opts, c, s = rotate_options(
    "Submerging jute stalks in clean, slow-flowing water to soften the outer bark and separate the golden fiber",
    ["Baking jute stalks inside high-temperature coal kilns", "Spraying chemical acids onto growing jute plants", "Grinding jute roots into industrial fertilizer powder"],
    "B",
    "Retting is the microbiological process of steeping harvested jute bundles in clean, stagnant or slow-flowing fresh water for 2-3 weeks to rot the cellular tissue, enabling manual stripping of the bast fibers.\nHence, Option {{CORR}} is correct.",
    "Defines Retting as soaking jute stalks in water to extract the bast fibers."
)
add_u10(make_question(CHAPTER_U10, "Jute Processing", "What is the crucial water-based processing stage known as 'Retting' in commercial jute production?", opts, c, s))

# Q43: High per-hectare wheat yield states
opts, c, s = rotate_options(
    "Punjab and Haryana (over 4,000 to 5,000 kg/ha due to Green Revolution tubewell irrigation)",
    ["Rajasthan and Gujarat (less than 500 kg/ha)", "Assam and Odisha (rainfed)", "Karnataka and Kerala"],
    "C",
    "Punjab and Haryana achieve the highest per-hectare wheat yields in India (exceeding 4,500-5,000 kg per hectare) owing to 100% canal and tubewell irrigation, HYV seeds, and heavy fertilizer application.\nHence, Option {{CORR}} is correct.",
    "Identifies Punjab and Haryana as having the highest per-hectare wheat yields in India."
)
add_u10(make_question(CHAPTER_U10, "Wheat Productivity", "Which states in India achieve the highest per-hectare wheat yields?", opts, c, s))

# Q44: Low per-hectare agricultural productivity causes
opts, c, s = rotate_options(
    "Erratic monsoons, degraded soils, small uneconomic holdings, low capital investment, and lack of modern inputs in rainfed areas",
    ["Excessive supply of free combine harvesters in every village", "Government bans on harvesting food grain crops", "Perennial snow cover across the Indo-Gangetic plains"],
    "D",
    "Low average crop productivity in India stems from rainfed dependence, sub-division of land into fragmented parcels, traditional farming techniques, inadequate farm credit, and poor marketing infrastructure.\nHence, Option {{CORR}} is correct.",
    "Lists the multi-dimensional causes of low agricultural productivity in rainfed tracts."
)
add_u10(make_question(CHAPTER_U10, "Agricultural Productivity", "What primary factors account for the relatively low average agricultural yields in rainfed Indian regions?", opts, c, s))

# Q45: Land Degradation in Green Revolution areas
opts, c, s = rotate_options(
    "Soil salinization, alkalization, and waterlogging caused by excessive canal irrigation, alongside chemical fertilizer toxicity",
    ["Encroachment of polar ice glaciers onto wheat fields", "Massive deposits of volcanic lava across river valleys", "Complete destruction of topsoil by tidal tsunami waves"],
    "A",
    "In the Green Revolution belt of Punjab, Haryana, and western UP, excessive canal irrigation has raised water tables, causing severe waterlogging, soil salinization, and alkalization (turning arable soils into barren reh/kallar).\nHence, Option {{CORR}} is correct.",
    "Identifies soil salinization and waterlogging caused by over-irrigation in Green Revolution areas."
)
add_u10(make_question(CHAPTER_U10, "Land Degradation", "What major environmental and soil degradation problem has arisen in the Green Revolution belt of Punjab and Haryana?", opts, c, s))

# Q46: National Mission for Sustainable Agriculture (NMSA)
opts, c, s = rotate_options(
    "Promoting organic farming, soil health management, efficient water utilization, and climate-resilient agriculture",
    ["Mandating the conversion of all farmlands into coal mines", "Banning the use of all organic manure and compost", "Prohibiting farmers from selling harvested crops in domestic markets"],
    "B",
    "The National Mission for Sustainable Agriculture (NMSA) was launched to make Indian agriculture more productive, sustainable, and climate resilient through water-use efficiency, soil health card distribution, and integrated farming.\nHence, Option {{CORR}} is correct.",
    "Outlines objectives of NMSA: soil health, water efficiency, and sustainable agriculture."
)
add_u10(make_question(CHAPTER_U10, "Agricultural Policies", "What is the primary objective of the 'National Mission for Sustainable Agriculture' (NMSA) in India?", opts, c, s))

# Q47: Match Crop Types with Primary Soil Preferences
add_u10(make_match_question(
    CHAPTER_U10, "Soils and Crops",
    "Match List I (Crop) with List II (Ideal Soil Type):",
    [("A", "Cotton"), ("B", "Tea"), ("C", "Jute"), ("D", "Bajra")],
    [("I", "Sandy, poor loamy soils of arid regions"), ("II", "Deep, acidic, well-drained loamy slopes"), ("III", "Black cotton soil (Regur)"), ("IV", "Fertile deltaic silt and clay renewed by floods")],
    "A-III, B-II, C-IV, D-I", "C",
    "Cotton prefers black regur soil (III); Tea prefers deep acidic well-drained slopes (II); Jute prefers deltaic flood silt (IV); Bajra thrives on sandy arid soil (I).",
    "Matches major crops with their characteristic soil requirements."
))

# Q48: Statement on Tea Plantation Worker Characteristics
add_u10(make_statement_question(
    CHAPTER_U10, "Tea Labor",
    "Tea is a labor-intensive crop requiring abundant, cheap, and skilled labor, particularly for plucking the delicate tea leaves.",
    "Women are employed in large numbers on tea plantations because plucking leaves requires delicate manual dexterity.",
    1, "D",
    "Both statements are correct. Tea plucking ('two leaves and a bud') is a painstaking manual process where female workers form a large share of the plantation labor force.",
    "Affirms the labor intensity and female labor predominance in tea plucking."
))

# Q49: Assertion-Reason on Sugarcane Shift to South India
add_u10(make_assertion_question(
    CHAPTER_U10, "Sugarcane Geography",
    "In recent decades, there has been a noticeable spatial shift of the sugarcane and sugar industry from North India to South India.",
    "The tropical peninsular climate ensures higher sucrose content in the cane, higher cane yield per hectare, and a significantly longer crushing season.",
    1, "A",
    "Both Assertion and Reason are true, and Reason is the correct explanation. Maharashtra and southern states offer maritime tropical climate without winter frost, leading to richer sucrose and cooperative mill efficiency.",
    "Explains the geographical migration of sugarcane cultivation to Peninsular India."
))

# Q50: Multi-statement on Pulse Production Significance
add_u10(make_multi_statement_question(
    CHAPTER_U10, "Pulses Significance",
    "Which of the following statements regarding the significance of pulse crops in India are correct?",
    [
        ("A", "India is the largest producer, largest consumer, and largest importer of pulses in the world."),
        ("B", "Pulses are the primary source of vegetarian protein in the diet of the Indian population."),
        ("C", "Being leguminous, they restore natural soil fertility by fixing atmospheric nitrogen."),
        ("D", "Pulses require 300 cm of standing floodwater and must be grown in deep coastal swamps.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C are well-known facts about Indian pulses. Statement D is false because pulses are dryland crops sensitive to waterlogging.",
    "Highlights the nutritional, ecological, and economic significance of pulses in India."
))

# Q51: Rainfed Farming percentage
opts, c, s = rotate_options(
    "About 55 to 60 percent of the net sown area in India is still dependent entirely on rainfed conditions",
    ["100 percent of Indian agriculture is covered by automated drip pipes", "Zero percent of agriculture depends on rain because of giant domes", "Only 2 percent of land is rainfed"],
    "C",
    "Despite massive expansion of canal and tubewell networks since independence, roughly 55-60% of India's net cultivated area remains purely rainfed, making the performance of the southwest monsoon crucial for agricultural GDP.\nHence, Option {{CORR}} is correct.",
    "Identifies that 55-60% of India's net sown area is still rainfed."
)
add_u10(make_question(CHAPTER_U10, "Rainfed Agriculture", "What proportion of India's net sown area remains dependent entirely on rainfall (rainfed farming)?", opts, c, s))

# Q52: Baba Budan Hills and Coffee
opts, c, s = rotate_options(
    "Chikmagalur district of Karnataka, where coffee was first introduced in India in the seventeenth century",
    ["Kashmir valley in Jammu and Kashmir", "Sundarbans delta in West Bengal", "Thar desert in Rajasthan"],
    "D",
    "Coffee cultivation was initiated in India on the Baba Budan Giri hills in Chikmagalur district of Karnataka, after sufi saint Baba Budan brought seven coffee beans from Yemen in the 17th century.\nHence, Option {{CORR}} is correct.",
    "Identifies Baba Budan Hills in Chikmagalur, Karnataka, as the historic cradle of Indian coffee."
)
add_u10(make_question(CHAPTER_U10, "Coffee History", "Where are the famous 'Baba Budan Hills', historic cradle of coffee cultivation in India, situated?", opts, c, s))

# Q53: Nilgiri Hills plantation crops
opts, c, s = rotate_options(
    "Tea and Coffee grown on the junction of Tamil Nadu, Kerala, and Karnataka",
    ["Wheat and Barley on flat alluvial plains", "Jute and Sugarcane in saline marshlands", "Cotton and Bajra on arid sandy soils"],
    "A",
    "The Nilgiri Hills (at the tri-junction of Tamil Nadu, Kerala, and Karnataka) are famous for extensive high-altitude tea and coffee plantations producing distinctive aromatic varieties.\nHence, Option {{CORR}} is correct.",
    "Identifies the Nilgiri Hills as a premier tea and coffee plantation belt."
)
add_u10(make_question(CHAPTER_U10, "Plantation Belts", "Which two major plantation crops dominate the agricultural landscape of the 'Nilgiri Hills' in South India?", opts, c, s))

# Q54: Agricultural Land Use: Non-Agricultural Uses
opts, c, s = rotate_options(
    "Land covered by settlements (rural and urban), infrastructure (roads, railways, canals), and industrial sites",
    ["Land covered by natural reserve sal and teak forests", "Land used exclusively for growing organic basmati rice", "Land submerged beneath permafrost ice caps"],
    "B",
    "The category 'Land put to non-agricultural uses' includes land occupied by human settlements (villages, towns, cities), transport networks (roads, railway tracks, airports, canals), and factories, which has expanded steadily with urbanization.\nHence, Option {{CORR}} is correct.",
    "Defines 'Land put to non-agricultural uses' in official land records."
)
add_u10(make_question(CHAPTER_U10, "Land Use Categories", "What types of human land uses are classified under 'Land Put to Non-Agricultural Uses'?", opts, c, s))

# Q55: Land under Miscellaneous Tree Crops
opts, c, s = rotate_options(
    "Land under orchards, fruit groves, casuarina trees, and bamboo clumps that is not included in Net Sown Area",
    ["Fields sown with wheat and barley by tractors", "Underground coal mining tunnels", "Municipal sewage dumping lagoons"],
    "C",
    "Land under miscellaneous tree crops and groves includes land under fruit orchards, flowering shrubs, casuarina trees, and bamboo brakes, which are privately owned but excluded from Net Sown Area statistics.\nHence, Option {{CORR}} is correct.",
    "Explains 'Land under miscellaneous tree crops and groves' (orchards and bamboo groves)."
)
add_u10(make_question(CHAPTER_U10, "Land Use Categories", "What does the land classification 'Land Under Miscellaneous Tree Crops and Groves' represent?", opts, c, s))

# Q56: Tubewell Irrigation boom in Punjab and Haryana
opts, c, s = rotate_options(
    "Expanded rapidly post-1960s, providing reliable water on demand for HYV wheat and paddy, but leading to severe groundwater table depletion",
    ["Eliminated all groundwater use by relying only on seawater", "Was banned by the central government in 1965", "Caused continuous cooling of the regional climate"],
    "D",
    "The rapid diffusion of diesel and electric tubewells in Punjab and Haryana underpinned Green Revolution wheat-rice double cropping, but has caused catastrophic depletion of underground aquifers.\nHence, Option {{CORR}} is correct.",
    "Describes the tubewell irrigation revolution in Punjab/Haryana and resulting aquifer depletion."
)
add_u10(make_question(CHAPTER_U10, "Irrigation Geography", "What has been the long-term ecological consequence of the intensive tubewell irrigation boom in Punjab and Haryana?", opts, c, s))

# Q57: Rice-Wheat Cropping System
opts, c, s = rotate_options(
    "Growing kharif paddy followed immediately by rabi wheat in the same field, dominant in the Indo-Gangetic plains",
    ["Growing rubber trees and harvesting wheat flour from tree trunks", "Planting rice and wheat together in alternate furrows during winter", "Banning rice in summer and wheat in winter"],
    "A",
    "The Rice-Wheat cropping system is the backbone of India's food security in the Indo-Gangetic plains (Punjab, Haryana, UP, Bihar, West Bengal), where monsoon paddy is followed by winter irrigated wheat.\nHence, Option {{CORR}} is correct.",
    "Describes the dominant Rice-Wheat rotation in the Indo-Gangetic plains."
)
add_u10(make_question(CHAPTER_U10, "Cropping Systems", "What constitutes the renowned 'Rice-Wheat Cropping System' of the Indo-Gangetic plains?", opts, c, s))

# Q58: Sequence of States by Rice Production
add_u10(make_sequence_question(
    CHAPTER_U10, "Rice Production Ranks",
    "Arrange the following states in descending order of their total rice production:",
    [("A", "Punjab"), ("B", "West Bengal"), ("C", "Uttar Pradesh")],
    "B, C, A", "B",
    "1. West Bengal is the largest rice producer in India (B).\n2. Uttar Pradesh ranks second in total rice output (C).\n3. Punjab ranks third in output (with highest per-hectare yield) (A).",
    "Ranks top rice-producing states in descending order: West Bengal, UP, Punjab."
))

# Q59: Agricultural indebtedness in India
opts, c, s = rotate_options(
    "Small farmers taking loans at exorbitant interest rates from informal moneylenders for crop inputs and social ceremonies, resulting in debt traps",
    ["Farmers investing billions of dollars in international Wall Street hedge funds", "Commercial banks offering 100% free grants with zero repayment", "Farmers owning multiple corporate passenger airlines"],
    "C",
    "Agricultural indebtedness is a major structural malaise where marginal farmers, burdened by crop failure, rising input costs, and informal moneylender interest rates, fall into intergenerational debt traps.\nHence, Option {{CORR}} is correct.",
    "Explains agricultural indebtedness and the informal moneylender debt trap."
)
add_u10(make_question(CHAPTER_U10, "Rural Socio-Economics", "What drives the persistent problem of 'Agricultural Indebtedness' among small and marginal Indian farmers?", opts, c, s))

# Q60: PM Kisan Samman Nidhi
opts, c, s = rotate_options(
    "Direct income support of Rs 6,000 per year transferred in three equal instalments to eligible farmer families",
    ["Confiscating all agricultural land from smallholders", "Banning all tractor sales across rural districts", "Mandatory free export of all harvested food grains to Europe"],
    "D",
    "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme providing direct income support of Rs 6,000 per annum to all landholding farmer families across India in three equal four-monthly instalments.\nHence, Option {{CORR}} is correct.",
    "Outlines the PM-KISAN scheme providing direct income support of Rs 6,000 per year."
)
add_u10(make_question(CHAPTER_U10, "Government Schemes", "What direct financial support is provided to farmer families under the 'PM-KISAN' scheme?", opts, c, s))

validate_and_collect(u10_qs, u10_seen)
assert len(u10_qs) == 60
with open("mock/geo_units/unit10.json", "w", encoding="utf-8") as f:
    json.dump(u10_qs, f, indent=2, ensure_ascii=False)
print("Unit 10 generated: 60 questions")

# =================================================================================================
# UNIT 11: India: Water Resources & Watershed Management (60 Questions)
# =================================================================================================
CHAPTER_U11 = "India: Water Resources and Watershed Management"
u11_qs = []
u11_seen = set()

def add_u11(q):
    u11_qs.append(q)

# Q1: Total surface water resources of India
opts, c, s = rotate_options(
    "Average annual flow in all river basins is estimated at 1,869 cubic km, of which only 690 cubic km (about 32%) can be utilized",
    ["100,000 cubic km, all of which is used for bottled mineral water", "50 cubic km, shared equally with Antarctica", "Zero cubic km because all Indian rivers are completely dry"],
    "A",
    "India accounts for about 4% of world's water resources. The total average annual flow in all the river basins of India is estimated to be 1,869 cubic km, but due to topographical and hydrological limitations, only about 690 cubic km (32%) can be utilized.\nHence, Option {{CORR}} is correct.",
    "Identifies India's total river flow (1,869 cubic km) and usable surface water (690 cubic km)."
)
add_u11(make_question(CHAPTER_U11, "Surface Water Resources", "What is the total estimated annual flow in India's river basins, and how much of it is utilizable surface water?", opts, c, s))

# Q2: River basins holding over 60% of surface water
opts, c, s = rotate_options(
    "Ganga, Brahmaputra, Indus, and Godavari river basins",
    ["Sabarmati, Mahi, Luni, and Banas", "Cauvery, Vaigai, Tambraparni, and Periyar", "Narmada, Tapi, Mandovi, and Zuari"],
    "B",
    "Much of the annual water flow in India (over 60%) is concentrated in just four major river basins: the Ganga, Brahmaputra, Indus, and Godavari basins.\nHence, Option {{CORR}} is correct.",
    "Lists the four major river basins containing over 60% of India's surface water."
)
add_u11(make_question(CHAPTER_U11, "Surface Water Distribution", "Which four major river basins account for more than 60 percent of the total surface water resources in India?", opts, c, s))

# Q3: Total replenishable groundwater resource
opts, c, s = rotate_options(
    "Approximately 432 Billion Cubic Meters (BCM) per year",
    ["10,000 BCM per year", "50 BCM per year", "1 BCM per year"],
    "C",
    "The total replenishable groundwater resource in the country is estimated at approximately 432 Billion Cubic Meters (BCM) per annum, recharged primarily by monsoonal rainfall.\nHence, Option {{CORR}} is correct.",
    "Identifies India's total replenishable groundwater resource as ~432 BCM."
)
add_u11(make_question(CHAPTER_U11, "Groundwater Resources", "What is the estimated total replenishable groundwater potential of India per year?", opts, c, s))

# Q4: States with over-exploited groundwater (>85-90%)
opts, c, s = rotate_options(
    "Punjab, Haryana, Rajasthan, and Tamil Nadu",
    ["Assam, Meghalaya, and Arunachal Pradesh", "Odisha, Chhattisgarh, and Jharkhand", "Kerala, Goa, and Sikkim"],
    "D",
    "The level of groundwater utilization is very high in the states of Punjab (over 100%), Haryana, Rajasthan, and Tamil Nadu, where tube-wells have pumped aquifers far beyond natural annual recharge rates.\nHence, Option {{CORR}} is correct.",
    "Identifies Punjab, Haryana, Rajasthan, and Tamil Nadu as having over-exploited groundwater."
)
add_u11(make_question(CHAPTER_U11, "Groundwater Overexploitation", "Which group of states exhibits critical groundwater overexploitation exceeding 85 to 100 percent of annual recharge?", opts, c, s))

# Q5: Sectoral water consumption: Agriculture share
opts, c, s = rotate_options(
    "Agriculture consumes 89% of surface water and 92% of groundwater utilization",
    ["Agriculture consumes only 5% of total water", "Manufacturing industries consume 95% of total water", "Domestic municipal kitchens consume 80% of total water"],
    "A",
    "In India, agriculture accounts for the lion's share of water utilization: roughly 89% of total surface water and 92% of total groundwater are consumed by agricultural irrigation.\nHence, Option {{CORR}} is correct.",
    "States agriculture's dominant water share: 89% surface water, 92% groundwater."
)
add_u11(make_question(CHAPTER_U11, "Sectoral Water Demand", "What proportion of India's surface water and groundwater resources is consumed by the agricultural sector?", opts, c, s))

# Q6: Industrial and Domestic water shares
opts, c, s = rotate_options(
    "Industrial sector consumes ~2% of surface and ~5% of groundwater; Domestic sector consumes ~9% of surface and ~3% of groundwater",
    ["Industrial consumes 50%, Domestic consumes 40%", "Industrial consumes 90%, Domestic consumes 10%", "Both sectors consume zero water"],
    "B",
    "Compared to agriculture, industrial water use is currently low: about 2% of surface water and 5% of groundwater. The domestic municipal sector accounts for roughly 9% of surface water and 3% of groundwater.\nHence, Option {{CORR}} is correct.",
    "Specifies industrial (2% surface, 5% ground) and domestic (9% surface, 3% ground) water shares."
)
add_u11(make_question(CHAPTER_U11, "Sectoral Water Demand", "What percentage shares of surface and groundwater are consumed by the industrial and domestic sectors in India?", opts, c, s))

# Q7: Fluoride and Arsenic contamination in groundwater
opts, c, s = rotate_options(
    "Excessive pumping of groundwater has lowered water tables, concentrating fluoride in Rajasthan/Gujarat and arsenic in West Bengal/Bihar",
    ["Groundwater is contaminated with molten gold in Kerala", "Excessive rain has dissolved platinum into Himalayan streams", "All groundwater has turned into liquid petroleum"],
    "C",
    "Over-withdrawal of groundwater in parts of Rajasthan and Gujarat has led to high concentrations of fluoride, while over-extraction in the alluvial aquifers of West Bengal and Bihar has caused lethal arsenic contamination.\nHence, Option {{CORR}} is correct.",
    "Links groundwater over-extraction to fluoride (Rajasthan/Gujarat) and arsenic (West Bengal/Bihar)."
)
add_u11(make_question(CHAPTER_U11, "Water Quality Problems", "What toxic chemical contaminations have emerged in Indian groundwater due to severe over-extraction?", opts, c, s))

# Q8: Watershed Management definition
opts, c, s = rotate_options(
    "Rational, integrated management of land, water, vegetation, and human resources within a natural drainage basin to prevent soil erosion and recharge aquifers",
    ["Building 100-story concrete skyscrapers along riverbanks", "Dumping industrial chemical waste into rural streams", "Extracting all groundwater within six months for export"],
    "D",
    "Watershed management refers to the integrated, sustainable management of natural resources (especially water and soil) within a hydrological watershed or catchment, combining check dams, reforestation, and community participation.\nHence, Option {{CORR}} is correct.",
    "Defines Watershed Management as integrated conservation of water, soil, and biomass in a catchment."
)
add_u11(make_question(CHAPTER_U11, "Watershed Management", "What is the foundational concept of 'Watershed Management' in resource conservation?", opts, c, s))

# Q9: Haryali Program
opts, c, s = rotate_options(
    "Central government-sponsored watershed development project executed by Gram Panchayats with people's participation for drinking, irrigation, and afforestation",
    ["A commercial scheme to manufacture chemical fertilizers in cities", "A defense program to build military barracks on river islands", "A program to export fresh river water to foreign countries"],
    "A",
    "Haryali is a central government-sponsored watershed development program executed by Gram Panchayats with community participation, aimed at conserving rainwater for drinking, irrigation, fisheries, and rural afforestation.\nHence, Option {{CORR}} is correct.",
    "Describes Haryali as a central watershed development scheme executed by Gram Panchayats."
)
add_u11(make_question(CHAPTER_U11, "Watershed Projects", "What is the 'Haryali' program launched by the Central Government of India?", opts, c, s))

# Q10: Neeru-Meeru Program
opts, c, s = rotate_options(
    "A popular community water harvesting and conservation program launched in Andhra Pradesh (meaning 'Water and You')",
    ["A commercial luxury cruise line operating in Goa", "A state mineral extraction corporation in Jharkhand", "A hydro-electric dam built on the Brahmaputra river"],
    "B",
    "Neeru-Meeru (Water and You) is a successful community-led watershed harvesting movement in Andhra Pradesh, involving the construction of percolation tanks, check dams, and contour trenches.\nHence, Option {{CORR}} is correct.",
    "Identifies Neeru-Meeru (Water and You) as Andhra Pradesh's water harvesting program."
)
add_u11(make_question(CHAPTER_U11, "Watershed Projects", "The 'Neeru-Meeru' (Water and You) watershed development program was initiated in which Indian state?", opts, c, s))

# Q11: Arvary Pani Sansad
opts, c, s = rotate_options(
    "Alwar district, Rajasthan: revived the seasonal Arvari river by constructing indigenous earthen check dams (johads)",
    ["Bikaner district, by digging deep tube-wells into desert sand", "Jodhpur district, by constructing a nuclear water desalination plant", "Udaipur district, by draining the freshwater lakes"],
    "C",
    "The Arvary Pani Sansad was a grassroots water parliament in Alwar district of Rajasthan, where villagers built indigenous earthen percolation check-dams called 'Johads', successfully reviving the dried-up Arvari river.\nHence, Option {{CORR}} is correct.",
    "Identifies Arvary Pani Sansad in Alwar, Rajasthan, reviving the Arvari river via Johads."
)
add_u11(make_question(CHAPTER_U11, "Watershed Projects", "Where was the famous 'Arvary Pani Sansad' community water parliament formed, reviving local streams through johads?", opts, c, s))

# Q12: Ralegan Siddhi case study
opts, c, s = rotate_options(
    "Ahmednagar district of Maharashtra, transformed by Anna Hazare into a self-sufficient village through watershed development",
    ["Nagpur district, transformed into an industrial coal smelting zone", "Pune district, converted into an international airport runway", "Thane district, converted into a deep-water chemical port"],
    "D",
    "Ralegan Siddhi in Ahmednagar district of Maharashtra is globally celebrated as a model village transformed from extreme poverty and water scarcity into a prosperous, self-reliant ecological community through watershed management led by Anna Hazare.\nHence, Option {{CORR}} is correct.",
    "Identifies Ralegan Siddhi in Ahmednagar, Maharashtra, transformed by Anna Hazare's watershed work."
)
add_u11(make_question(CHAPTER_U11, "Watershed Case Studies", "In which district of Maharashtra is the model watershed village 'Ralegan Siddhi' situated?", opts, c, s))

# Q13: State with Mandatory Rainwater Harvesting
opts, c, s = rotate_options(
    "Tamil Nadu, which made rooftop rainwater harvesting compulsory for all buildings across the state",
    ["Punjab", "Uttar Pradesh", "Bihar"],
    "A",
    "Tamil Nadu was the pioneer state in India to enact legislation making rooftop rainwater harvesting structures legally compulsory for all residential and commercial buildings.\nHence, Option {{CORR}} is correct.",
    "Identifies Tamil Nadu as the first state making rooftop rainwater harvesting mandatory."
)
add_u11(make_question(CHAPTER_U11, "Rainwater Harvesting", "Which Indian state was the first in the country to make rooftop rainwater harvesting compulsory for all houses?", opts, c, s))

# Q14: Most polluted rivers in India
opts, c, s = rotate_options(
    "Ganga (especially between Kannauj and Varanasi) and Yamuna (between Delhi and its confluence with Chambal at Etawah)",
    ["Brahmaputra in Arunachal Pradesh", "Periyar in the Western Ghats", "Indus in Ladakh"],
    "B",
    "The Ganga (particularly along Kanpur, Prayagraj, and Varanasi) and the Yamuna (flowing past Delhi, Mathura, and Agra) are the most heavily polluted river stretches in India due to untreated urban sewage and industrial chemical effluents.\nHence, Option {{CORR}} is correct.",
    "Identifies Ganga and Yamuna (Delhi to Etawah) as the most heavily polluted river stretches."
)
add_u11(make_question(CHAPTER_U11, "Water Pollution", "Which two major North Indian rivers contain stretches categorized as among the most heavily polluted in the country?", opts, c, s))

# Q15: Namami Gange Programme
opts, c, s = rotate_options(
    "Integrated conservation mission launched in 2014 to accomplish effective abatement of pollution and conservation/rejuvenation of River Ganga",
    ["A project to construct 50 nuclear power plants along the Ganga", "A program to drain all water from the Ganga into the Arabian Sea", "A plan to replace the Ganga riverbed with a concrete highway"],
    "C",
    "The 'Namami Gange Programme' is an Integrated Conservation Mission approved in June 2014 with a budget outlay to accomplish twin objectives of effective abatement of pollution and conservation/rejuvenation of the National River Ganga.\nHence, Option {{CORR}} is correct.",
    "Outlines the Namami Gange Programme launched in 2014 for cleaning and rejuvenating the Ganga."
)
add_u11(make_question(CHAPTER_U11, "River Rejuvenation", "What is the primary objective of the 'Namami Gange Programme' launched by the Union Government?", opts, c, s))

# Q16: Key pillars of Namami Gange
opts, c, s = rotate_options(
    "Sewerage treatment infrastructure, river front development, river surface cleaning, biodiversity conservation, afforestation, and Ganga Grams",
    ["Converting the entire river into an offshore oil refinery", "Banning all religious rituals and closing riverside towns", "Constructing thermal power plants on riverbanks"],
    "D",
    "The core pillars of the Namami Gange programme include: Sewerage Treatment Infrastructure, River-Front Development, River-Surface Cleaning, Biodiversity Conservation, Afforestation, Public Awareness, Industrial Effluent Monitoring, and Ganga Grams.\nHence, Option {{CORR}} is correct.",
    "Lists the core intervention pillars of the Namami Gange mission."
)
add_u11(make_question(CHAPTER_U11, "Namami Gange", "Which of the following interventions constitute the major implementation pillars of the Namami Gange Programme?", opts, c, s))

# Q17: National Water Policy priority order
opts, c, s = rotate_options(
    "Drinking water, followed by Irrigation, Hydro-power, Navigation, and Industrial/other uses",
    ["Industrial uses, followed by Sports, Tourism, and Drinking water", "Navigation, followed by Swimming pools, Golf courses, and Agriculture", "Hydro-power, followed by Export, Bottled soda, and Livestock"],
    "A",
    "The National Water Policy assigns top priority to Drinking Water, followed by Irrigation, Hydro-power, Navigation, and Industrial and other agro-processing uses.\nHence, Option {{CORR}} is correct.",
    "Specifies National Water Policy allocation priority: Drinking water first, then irrigation and hydro-power."
)
add_u11(make_question(CHAPTER_U11, "National Water Policy", "In what priority sequence does the National Water Policy allocate water resources among competing sectors?", opts, c, s))

# Q18: Rainwater harvesting benefits
opts, c, s = rotate_options(
    "Increases water availability, recharges depleted aquifers, prevents urban flooding, and prevents seawater intrusion in coastal areas",
    ["Causes catastrophic landslides inside subway stations", "Increases the salinity of municipal drinking water", "Eliminates all clouds from the atmosphere"],
    "B",
    "Rainwater harvesting captures and stores rainwater, recharges underground aquifers, raises falling water tables, prevents street flooding, dilutes groundwater salinity, and halts coastal seawater intrusion.\nHence, Option {{CORR}} is correct.",
    "Highlights benefits of rainwater harvesting: aquifer recharge, flood mitigation, coastal salinity barrier."
)
add_u11(make_question(CHAPTER_U11, "Rainwater Harvesting", "What are the primary hydro-geological benefits of community rainwater harvesting?", opts, c, s))

# Q19: Lagoons and Backwaters in India
opts, c, s = rotate_options(
    "Kerala, Odisha, and West Bengal (used for fishing and irrigating certain varieties of paddy and coconut)",
    ["Rajasthan, Haryana, and Punjab", "Ladakh, Himachal Pradesh, and Uttarakhand", "Madhya Pradesh and Chhattisgarh"],
    "C",
    "India has a long coastline and indented coasts in some states, creating large brackish lagoons and backwaters (Kayals in Kerala, Chilika in Odisha, Sundarbans in West Bengal), used for fishing and coconut cultivation.\nHence, Option {{CORR}} is correct.",
    "Identifies Kerala, Odisha, and West Bengal as states with extensive coastal lagoons and backwaters."
)
add_u11(make_question(CHAPTER_U11, "Coastal Water Bodies", "In which states are extensive coastal lagoons and brackish backwaters (such as Kayals) prominent water features?", opts, c, s))

# Q20: Per capita water availability trend
opts, c, s = rotate_options(
    "Steadily declining over decades due to rapid population growth and environmental contamination",
    ["Doubling every five years due to melting ice caps", "Remaining perpetually constant at 100,000 liters per person", "Rising to infinity as rivers expand"],
    "D",
    "Due to burgeoning population growth, expanding industrialization, and contamination of freshwater bodies, the per capita annual availability of water in India has been declining steadily toward water-stressed thresholds.\nHence, Option {{CORR}} is correct.",
    "Points out the steady decline in per capita water availability in India."
)
add_u11(make_question(CHAPTER_U11, "Water Scarcity", "What is the historical trend of per capita water availability in India?", opts, c, s))

# Q21: Water Quality Deterioration causes
opts, c, s = rotate_options(
    "Discharge of untreated municipal domestic sewage, toxic industrial effluents, and runoff containing chemical fertilizers and pesticides",
    ["Planting too many banyan and peepal trees along riverbanks", "Atmospheric rainfall containing pure distilled natural water", "Constructing stone check-dams across seasonal gullies"],
    "A",
    "Water quality suffers severe degradation when rivers and lakes receive untreated domestic sewage, toxic heavy metals and chemicals from industrial plants, and agricultural runoff laden with chemical insecticides and nitrate fertilizers.\nHence, Option {{CORR}} is correct.",
    "Identifies untreated sewage, industrial effluents, and agro-chemicals as prime causes of water pollution."
)
add_u11(make_question(CHAPTER_U11, "Water Pollution", "What are the primary sources responsible for the widespread deterioration of water quality in Indian rivers?", opts, c, s))

# Q22: Match Watershed Programs with States
add_u11(make_match_question(
    CHAPTER_U11, "Watershed Programs",
    "Match List I (Watershed Management / Water Program) with List II (Associated State / Agency):",
    [("A", "Haryali"), ("B", "Neeru-Meeru"), ("C", "Arvary Pani Sansad"), ("D", "Mandatory Rooftop Harvesting")],
    [("I", "Andhra Pradesh"), ("II", "Tamil Nadu"), ("III", "Alwar, Rajasthan"), ("IV", "Central Government / Gram Panchayats")],
    "A-IV, B-I, C-III, D-II", "B",
    "Haryali is Central Govt/Gram Panchayats (IV); Neeru-Meeru is Andhra Pradesh (I); Arvary Pani Sansad is Alwar, Rajasthan (III); Mandatory Rooftop Harvesting is Tamil Nadu (II).",
    "Correctly connects community water projects with their respective locations or authorities."
))

# Q23: Match River Basins with Characteristics
add_u11(make_match_question(
    CHAPTER_U11, "River Basin Geographies",
    "Match List I (River Basin) with List II (Water Resource Attribute):",
    [("A", "Ganga Basin"), ("B", "Brahmaputra Basin"), ("C", "Indus Basin"), ("D", "Godavari Basin")],
    [("I", "Largest peninsular river basin with significant replenishable groundwater"), ("II", "Highest average annual water flow among all basins in India"), ("III", "Heavily utilized for irrigation in Punjab and Haryana"), ("IV", "Largest surface water catchment and population support in India")],
    "A-IV, B-II, C-III, D-I", "C",
    "Ganga has largest catchment/population support (IV); Brahmaputra has highest annual water flow (II); Indus is heavily used in Punjab/Haryana (III); Godavari is largest peninsular basin (I).",
    "Matches major Indian river basins to their hydrographic and usage characteristics."
))

# Q24: Statement on Groundwater Exploitation in Eastern States
add_u11(make_statement_question(
    CHAPTER_U11, "Groundwater Potential",
    "States like Chhattisgarh, Odisha, and Bihar have utilized less than 30 to 40 percent of their replenishable groundwater potential.",
    "Groundwater over-exploitation is severe in the northeastern states of Assam and Arunachal Pradesh.",
    3, "D",
    "Statement I is correct: eastern states have vast unutilized groundwater reserves. Statement II is false: Assam and Arunachal Pradesh have very low groundwater utilization and abundant surface rainfall.",
    "Contrasts under-utilized eastern groundwater with over-exploited northwestern aquifers."
))

# Q25: Assertion-Reason on Irrigation Demand in Agriculture
add_u11(make_assertion_question(
    CHAPTER_U11, "Agricultural Water Demand",
    "Irrigation is indispensable for agriculture across most parts of India.",
    "Rainfall in India is spatial-temporally erratic, highly seasonal (confined to 3-4 monsoon months), and characterized by frequent dry spells.",
    1, "A",
    "Both Assertion and Reason are true, and Reason correctly explains the Assertion. Because monsoonal rainfall is concentrated in just 100 days with high variability, irrigation is essential for rabi crops, high-yielding varieties, and summer zaid crops.",
    "Explains why temporal and spatial monsoon variability makes irrigation indispensable."
))

# Q26: Multi-statement on Rainwater Harvesting Methods
add_u11(make_multi_statement_question(
    CHAPTER_U11, "Rainwater Harvesting Techniques",
    "Which of the following techniques are commonly utilized in India for harvesting and storing rainwater?",
    [
        ("A", "Rooftop collection channels directing water into underground recharge wells or masonry tanks."),
        ("B", "Construction of earthen check-dams (johads) across seasonal village streams."),
        ("C", "Excavation of percolation tanks to enhance groundwater infiltration."),
        ("D", "Pumping untreated toxic industrial factory acids into public village drinking wells.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C are authentic, sustainable rainwater harvesting techniques. Statement D is an absurd distractor.",
    "Identifies valid community and household rainwater harvesting methodologies."
))

# Q27: Water Act 1974
opts, c, s = rotate_options(
    "Water (Prevention and Control of Pollution) Act, 1974, establishing pollution control boards to monitor water quality",
    ["An Act declaring all rivers private corporate property", "An Act banning all forms of agricultural irrigation in India", "An Act requiring all citizens to drink only bottled mineral water"],
    "C",
    "The Water (Prevention and Control of Pollution) Act was enacted in 1974, providing the legislative framework for the establishment of the Central and State Pollution Control Boards (CPCB and SPCB).\nHence, Option {{CORR}} is correct.",
    "Identifies the Water (Prevention and Control of Pollution) Act, 1974."
)
add_u11(make_question(CHAPTER_U11, "Environmental Legislation", "Which landmark environmental law was enacted in 1974 to establish pollution control boards and regulate water quality in India?", opts, c, s))

# Q28: Environment Protection Act 1986
opts, c, s = rotate_options(
    "Set standards for environmental quality, hazardous waste management, and industrial effluent discharge limits across India",
    ["Banned all chemical laboratories and pharmacies in the country", "Eliminated all national forest reserves", "Authorized factories to dump untreated waste into oceans"],
    "D",
    "The Environment (Protection) Act, 1986 serves as an umbrella legislation setting comprehensive environmental quality standards, regulating industrial emissions, and empowering authorities to penalize polluting units.\nHence, Option {{CORR}} is correct.",
    "Describes the Environment (Protection) Act of 1986 setting industrial effluent standards."
)
add_u11(make_question(CHAPTER_U11, "Environmental Legislation", "What regulatory mandate is established by the 'Environment (Protection) Act, 1986' regarding industrial effluents?", opts, c, s))

# Q29: CPCB and SPCB functions
opts, c, s = rotate_options(
    "Central Pollution Control Board (CPCB) and State Pollution Control Boards (SPCB) monitor river water quality and enforce discharge standards",
    ["They construct high-speed expressways across river deltas", "They manage national cricket stadiums in capital cities", "They print bank currency notes for the reserve bank"],
    "A",
    "The CPCB and SPCBs are statutory regulatory agencies that operate water quality monitoring networks across thousands of river stations, setting effluent standards and issuing closure notices to non-compliant factories.\nHence, Option {{CORR}} is correct.",
    "Identifies CPCB and SPCB as statutory agencies monitoring river water quality."
)
add_u11(make_question(CHAPTER_U11, "Pollution Control Authorities", "What is the primary responsibility of the Central Pollution Control Board (CPCB) and State Pollution Control Boards?", opts, c, s))

# Q30: Ganga Action Plan (GAP) launch year
opts, c, s = rotate_options(
    "Phase I was launched in 1985 by Prime Minister Rajiv Gandhi",
    ["Launched in 1947 by Jawaharlal Nehru", "Launched in 1965 by Lal Bahadur Shastri", "Launched in 2020 by the Supreme Court"],
    "B",
    "The Ganga Action Plan (GAP) Phase I was launched in 1985 by the Government of India with the primary objective of improving water quality by intercepting and treating domestic sewage and industrial effluents.\nHence, Option {{CORR}} is correct.",
    "Dates the launch of Ganga Action Plan Phase I to 1985."
)
add_u11(make_question(CHAPTER_U11, "River Cleaning History", "In which year was the historic 'Ganga Action Plan' (Phase I) officially launched to intercept and treat river sewage?", opts, c, s))

# Q31: Johads in Rajasthan
opts, c, s = rotate_options(
    "Traditional small earthen check dams constructed across seasonal hillside rivulets to capture rainwater and recharge local aquifers",
    ["Deep vertical shafts used for underground copper mining", "High-voltage electrical transmission towers erected in the desert", "Concrete irrigation canal aqueducts carrying water from Punjab"],
    "C",
    "Johads are traditional, simple, mud-and-stone micro-dams built across natural hillside drainage depressions in Rajasthan to catch seasonal runoff, allowing water to percolate into aquifers and recharge village wells.\nHence, Option {{CORR}} is correct.",
    "Defines 'Johads' as traditional earthen check dams for rainwater harvesting and aquifer recharge."
)
add_u11(make_question(CHAPTER_U11, "Traditional Water Harvesting", "What are 'Johads', which played a central role in the water rejuvenation movement in Rajasthan?", opts, c, s))

# Q32: Kunds / Tankas in Western Rajasthan
opts, c, s = rotate_options(
    "Underground covered rainwater storage tanks constructed within house courtyards or community catchments in arid Thar desert",
    ["Open wooden barrels used to store petrol in truck garages", "Large artificial lakes created by damming perennial rivers", "Floating ice boxes used by fishermen in coastal bays"],
    "D",
    "Tankas (or Kunds) are traditional underground rainwater cisterns built in the courtyards of houses or in paved community catchments across arid western Rajasthan to store clean drinking water.\nHence, Option {{CORR}} is correct.",
    "Defines 'Tankas' / 'Kunds' as underground rainwater storage cisterns in the Thar desert."
)
add_u11(make_question(CHAPTER_U11, "Traditional Water Harvesting", "In the arid regions of western Rajasthan, what are 'Tankas' (or Kunds)?", opts, c, s))

# Q33: Bamboo Drip Irrigation System
opts, c, s = rotate_options(
    "Meghalaya, using bamboo pipes to tap stream and spring water for irrigating betel leaf and black pepper crops on hillsides",
    ["Thar Desert of Rajasthan", "Rann of Kuchchh in Gujarat", "Deccan plateau of Maharashtra"],
    "A",
    "The ingenious Bamboo Drip Irrigation system has been practiced for over 200 years in Meghalaya. Bamboo pipes transport stream water from high hillsides over hundreds of meters to irrigate betel leaf plantations drip by drip.\nHence, Option {{CORR}} is correct.",
    "Identifies Meghalaya as the state practicing the 200-year-old Bamboo Drip Irrigation system."
)
add_u11(make_question(CHAPTER_U11, "Traditional Irrigation", "In which Indian state is the unique 200-year-old 'Bamboo Drip Irrigation System' traditionally practiced?", opts, c, s))

# Q34: Hiware Bazar case study
opts, c, s = rotate_options(
    "Ahmednagar district, Maharashtra: achieved complete water self-sufficiency and banned water-guzzling crops like sugarcane under Popatrao Pawar",
    ["Bikaner, Rajasthan: built a private nuclear reactor", "Dharavi, Mumbai: converted into an apple orchard", "Kollam, Kerala: drained all lagoons"],
    "B",
    "Hiware Bazar in Ahmednagar district, Maharashtra, under village sarpanch Popatrao Pawar, transformed its drought-prone economy through watershed development, strict water auditing, ban on borewells, and prohibition of sugarcane.\nHence, Option {{CORR}} is correct.",
    "Highlights Hiware Bazar's water budgeting, borewell ban, and sugarcane prohibition."
)
add_u11(make_question(CHAPTER_U11, "Watershed Management", "What decisive water management regulation was enacted by the model village of 'Hiware Bazar' in Maharashtra?", opts, c, s))

# Q35: Crop requiring most irrigation in India
opts, c, s = rotate_options(
    "Sugarcane and Rice (Paddy)",
    ["Bajra and Ragi", "Gram and Tur", "Jowar and Mustard"],
    "C",
    "Rice and sugarcane are highly water-intensive crops, consuming the majority of India's irrigation water. A single kilogram of rice can consume over 3,000 to 5,000 liters of irrigation water.\nHence, Option {{CORR}} is correct.",
    "Identifies Rice and Sugarcane as India's most irrigation-intensive crops."
)
add_u11(make_question(CHAPTER_U11, "Irrigation Demand", "Which two crops consume the largest share of irrigation water in Indian agriculture?", opts, c, s))

# Q36: Micro-irrigation: Drip and Sprinkler
opts, c, s = rotate_options(
    "Applies water directly to plant roots or sprays evenly over crops, saving 40-60% of water and dramatically increasing water-use efficiency",
    ["Floods entire fields with 3 feet of standing water continuously", "Drains all underground aquifers into deep ocean trenches", "Requires zero pipes and relies entirely on human breathing"],
    "D",
    "Micro-irrigation systems (drip irrigation and sprinklers) apply water precisely to the root zone, reducing evaporation and conveyance losses, conserving 40-60% of water compared to traditional flood irrigation.\nHence, Option {{CORR}} is correct.",
    "Highlights water conservation (40-60%) and efficiency of drip and sprinkler micro-irrigation."
)
add_u11(make_question(CHAPTER_U11, "Modern Irrigation", "What are the primary resource-saving advantages of 'Micro-Irrigation' (Drip and Sprinkler systems)?", opts, c, s))

# Q37: Inter-state water disputes example: Cauvery
opts, c, s = rotate_options(
    "Karnataka, Tamil Nadu, Kerala, and Puducherry",
    ["Punjab, Haryana, and Rajasthan", "Maharashtra, Gujarat, and Madhya Pradesh", "Goa and Karnataka"],
    "A",
    "The long-standing Cauvery river water dispute involves the riparian states of Karnataka (upper riparian) and Tamil Nadu (lower riparian), alongside Kerala and the Union Territory of Puducherry.\nHence, Option {{CORR}} is correct.",
    "Identifies Karnataka, Tamil Nadu, Kerala, and Puducherry in the Cauvery water dispute."
)
add_u11(make_question(CHAPTER_U11, "Inter-State Water Disputes", "Which states and Union Territories are parties to the historic 'Cauvery River Water Dispute'?", opts, c, s))

# Q38: Inter-state water disputes: Krishna
opts, c, s = rotate_options(
    "Maharashtra, Karnataka, Telangana, and Andhra Pradesh",
    ["Assam, West Bengal, and Bihar", "Uttar Pradesh and Madhya Pradesh", "Punjab and Himachal Pradesh"],
    "B",
    "The Krishna Water Disputes Tribunal adjudicates water allocation between the Krishna river basin states: Maharashtra, Karnataka, Telangana, and Andhra Pradesh.\nHence, Option {{CORR}} is correct.",
    "Identifies riparian states in the Krishna river water dispute: Maharashtra, Karnataka, Telangana, AP."
)
add_u11(make_question(CHAPTER_U11, "Inter-State Water Disputes", "Which riparian states are involved in the 'Krishna River Water Dispute'?", opts, c, s))

# Q39: Yamuna Action Plan (YAP)
opts, c, s = rotate_options(
    "A bilateral river restoration project undertaken with assistance from Japan (JICA) to clean the Yamuna, especially in Delhi, Haryana, and UP",
    ["A plan to construct naval warships inside Delhi", "A project to pump saltwater from the Arabian Sea to Delhi", "A program to divert the entire Yamuna river into the Indus"],
    "C",
    "The Yamuna Action Plan (YAP) was initiated in 1993 with financial and technical cooperation from the Japan International Cooperation Agency (JICA) to construct sewage treatment plants in Delhi, Haryana, and Uttar Pradesh.\nHence, Option {{CORR}} is correct.",
    "Describes the Yamuna Action Plan (YAP) supported by JICA for cleaning the Yamuna."
)
add_u11(make_question(CHAPTER_U11, "River Rejuvenation", "What is the 'Yamuna Action Plan' (YAP), and which international agency partnered in its implementation?", opts, c, s))

# Q40: Recycled / Reclaimed Water in Industry
opts, c, s = rotate_options(
    "Treating industrial effluents and urban wastewater for reuse in factory cooling towers, flushing, and urban gardening, conserving fresh water",
    ["Bottling untreated sewage and selling it as infant formula", "Pumping toxic cyanide into village ponds", "Banning factories from ever using treated water"],
    "D",
    "Recycling and reuse of wastewater enables industries to use treated effluents for machine cooling, landscaping, and boilers, reducing pressure on pristine drinking water aquifers.\nHence, Option {{CORR}} is correct.",
    "Explains the role of treated wastewater reuse in industrial cooling and urban landscaping."
)
add_u11(make_question(CHAPTER_U11, "Water Recycling", "How does the 'Recycling and Reuse of Wastewater' contribute to sustainable urban and industrial water management?", opts, c, s))

# Q41: Check Dam function in Watershed
opts, c, s = rotate_options(
    "Slows down surface runoff velocity, traps silt, reduces gully erosion, and promotes water percolation into underlying aquifers",
    ["Speeds up flood runoff to wash away topsoil faster", "Stores radioactive waste from nuclear reactors", "Prevents tree roots from absorbing water"],
    "A",
    "Check dams are small stone or earthen barriers built across small drainage channels to reduce runoff velocity, prevent gully deepening, retain sediment, and facilitate infiltration into groundwater.\nHence, Option {{CORR}} is correct.",
    "Explains the function of check dams: slowing runoff, trapping silt, and recharging aquifers."
)
add_u11(make_question(CHAPTER_U11, "Watershed Engineering", "What is the primary hydrological function of a 'Check Dam' in watershed conservation?", opts, c, s))

# Q42: Rainwater Harvesting in Urban Centers
opts, c, s = rotate_options(
    "Recharging declining urban aquifers through filter pits and borewells, and reducing urban flash flooding and street waterlogging",
    ["Increasing municipal property taxes by 500%", "Causing city skyscrapers to sink into underground sand", "Preventing rainfall from ever touching city rooftops"],
    "B",
    "In heavily built-up urban cities, rooftop rainwater harvesting diverts storm runoff into recharge shafts or storage sumps, combating severe groundwater depletion and alleviating urban street waterlogging.\nHence, Option {{CORR}} is correct.",
    "Highlights urban rainwater harvesting combating aquifer decline and flash flooding."
)
add_u11(make_question(CHAPTER_U11, "Urban Water Management", "Why is rooftop rainwater harvesting particularly crucial for large, congested Indian metropolises?", opts, c, s))

# Q43: Jal Jeevan Mission (JJM)
opts, c, s = rotate_options(
    "Providing functional household tap connections (FHTC) providing 55 liters per capita per day to every rural household by 2024",
    ["Distributing plastic water bottles to all highway truck drivers", "Banning all household water taps in rural villages", "Exporting mineral water to Pacific islands"],
    "C",
    "The Jal Jeevan Mission (JJM) was launched in August 2019 to provide safe and adequate drinking water through individual Functional Household Tap Connections (FHTC) of 55 lpcd to every rural home ('Har Ghar Jal').\nHence, Option {{CORR}} is correct.",
    "States the goal of Jal Jeevan Mission: Functional Household Tap Connection (55 lpcd) to every rural home."
)
add_u11(make_question(CHAPTER_U11, "Government Missions", "What is the primary target of the central flagship program 'Jal Jeevan Mission' (JJM)?", opts, c, s))

# Q44: Atal Bhujal Yojana
opts, c, s = rotate_options(
    "Community-led sustainable groundwater management in water-stressed districts of seven states with World Bank assistance",
    ["Building nuclear submarines for coastal naval defense", "Constructing thermal coal power plants in the Himalayas", "Banning all private water wells in India"],
    "D",
    "Atal Bhujal Yojana (ATAL JAL) is a World Bank-supported scheme launched in December 2019 focusing on community-led groundwater management, water security planning, and demand-side management in priority water-stressed areas across 7 states.\nHence, Option {{CORR}} is correct.",
    "Outlines Atal Bhujal Yojana for community-led groundwater management in water-stressed states."
)
add_u11(make_question(CHAPTER_U11, "Groundwater Schemes", "What is the focus of the 'Atal Bhujal Yojana' (ATAL JAL) launched with World Bank partnership?", opts, c, s))

# Q45: Transboundary River: Indus Water Treaty 1960
opts, c, s = rotate_options(
    "Signed between India and Pakistan in 1960, brokered by World Bank: India has unrestricted use of Eastern rivers (Sutlej, Beas, Ravi), Pakistan receives Western rivers (Indus, Jhelum, Chenab)",
    ["India received 100% of all six rivers while Pakistan received zero water", "Pakistan received all six rivers while India was forbidden from using any water", "Both countries agreed to drain all Himalayan rivers into the Thar desert"],
    "A",
    "Under the Indus Waters Treaty signed in 1960 between Prime Minister Nehru and President Ayub Khan (brokered by the World Bank), waters of the three eastern rivers (Ravi, Beas, Sutlej) were allocated to India, while the three western rivers (Indus, Jhelum, Chenab) were allocated to Pakistan, subject to specified domestic/run-of-the-river uses by India.\nHence, Option {{CORR}} is correct.",
    "Summarizes the 1960 Indus Waters Treaty allocation (Eastern rivers to India, Western to Pakistan)."
)
add_u11(make_question(CHAPTER_U11, "Transboundary Waters", "How are the river waters distributed between India and Pakistan under the landmark 'Indus Waters Treaty' of 1960?", opts, c, s))

# Q46: Transboundary River: Ganga Treaty 1996
opts, c, s = rotate_options(
    "Signed between India and Bangladesh in 1996 for sharing Ganga waters at Farakka Barrage for a period of 30 years",
    ["Signed between India and Myanmar to share the Irrawaddy river", "Signed between India and China to dam the Brahmaputra at Great Bend", "Signed between India and Sri Lanka across the Palk Strait"],
    "B",
    "The 1996 Ganga Water Treaty was signed between India and Bangladesh, establishing a formula for sharing the dry-season flow of the Ganga river measured at Farakka Barrage in West Bengal for 30 years.\nHence, Option {{CORR}} is correct.",
    "Identifies the 1996 India-Bangladesh Ganga Water Treaty sharing water at Farakka Barrage."
)
add_u11(make_question(CHAPTER_U11, "Transboundary Waters", "What agreement was established between India and Bangladesh under the historic '1996 Ganga Water Treaty'?", opts, c, s))

# Q47: Farakka Barrage location and objective
opts, c, s = rotate_options(
    "Located in Murshidabad district, West Bengal, designed to divert Ganga waters into the Bhagirathi-Hugli river to flush silt and keep Kolkata Port navigable",
    ["Located in Punjab to irrigate wheat fields in Haryana", "Located in Assam to prevent floods in Guwahati", "Located in Gujarat to supply water to Kandla Port"],
    "C",
    "The Farakka Barrage was constructed on the Ganga in Murshidabad district, West Bengal, to divert 40,000 cusecs of water into the Bhagirathi-Hugli river during dry season to flush out sediment and preserve navigation depth for Kolkata Port.\nHence, Option {{CORR}} is correct.",
    "Explains Farakka Barrage diverting Ganga water into Hugli to preserve Kolkata Port navigability."
)
add_u11(make_question(CHAPTER_U11, "Hydraulic Engineering", "Why was the 'Farakka Barrage' constructed on the Ganga river in West Bengal?", opts, c, s))

# Q48: Sequence of Water Development Landmarks in India
add_u11(make_sequence_question(
    CHAPTER_U11, "Water Policy History",
    "Arrange the following water-related policy landmarks in India in chronological sequence:",
    [("A", "Launch of Namami Gange Programme"), ("B", "Water (Prevention and Control of Pollution) Act"), ("C", "Launch of Ganga Action Plan Phase I"), ("D", "Adoption of first National Water Policy")],
    "B, C, D, A", "C",
    "1. Water (Prevention and Control of Pollution) Act passed in 1974 (B).\n2. Ganga Action Plan Phase I launched in 1985 (C).\n3. First National Water Policy adopted in 1987 (D).\n4. Namami Gange Programme launched in 2014 (A).",
    "Sequences national water legislative and river action policy milestones chronologically."
))

# Q49: Siltation of reservoirs
opts, c, s = rotate_options(
    "Heavy erosion in upstream catchments deposits sediment in dam reservoirs, steadily reducing their live water storage capacity and flood buffer",
    ["Silt turns reservoir water into pure drinking milk", "Silt increases the depth of the reservoir by 100 meters annually", "Silt eliminates all aquatic fish species completely"],
    "D",
    "Deforestation and poor soil conservation in catchment areas cause severe erosion, washing massive quantities of silt into reservoirs (like Bhakra, Hirakud, DVC), diminishing their effective storage capacity and flood cushioning.\nHence, Option {{CORR}} is correct.",
    "Explains reservoir siltation reducing water storage capacity and flood buffer."
)
add_u11(make_question(CHAPTER_U11, "Reservoir Management", "What major operational hazard does 'Siltation' pose to large multipurpose dam reservoirs in India?", opts, c, s))

# Q50: Tank irrigation dominance in South India
opts, c, s = rotate_options(
    "Hard crystalline peninsular plateau rocks make canal digging and well-drilling difficult, while natural depressions easily store monsoon runoff",
    ["South Indian farmers refuse to use canal water due to religious taboos", "South India receives 5,000 cm of rain every single week", "Tanks in South India are constructed exclusively by foreign tourists"],
    "A",
    "Tank irrigation is predominant in Peninsular India (Tamil Nadu, Andhra Pradesh, Karnataka, Telangana) because the hard granitic bedrock prevents deep percolation and makes canal excavation difficult, while undulating relief provides ideal natural basins for bunding tanks.\nHence, Option {{CORR}} is correct.",
    "Explains why tank irrigation dominates in the hard-rock peninsular plateau."
)
add_u11(make_question(CHAPTER_U11, "Traditional Irrigation", "Why has 'Tank Irrigation' historically been the predominant mode of irrigation in the peninsular plateau of South India?", opts, c, s))

# Q51: Inundation Canals vs Perennial Canals
opts, c, s = rotate_options(
    "Inundation canals draw water only during seasonal river flood stages without barrages; Perennial canals draw water year-round from permanent barrages/dams",
    ["Inundation canals are constructed on mountaintops, while perennial are underground", "Inundation canals use concrete pipes, while perennial canals use wooden buckets", "Both terms are identical and mean rooftop rainwater pipes"],
    "B",
    "Inundation canals are flood canals that lack headworks/barrages and divert water only when the river swells above bank level during monsoons. Perennial canals have permanent barrages across rivers that divert controlled flows throughout the entire year.\nHence, Option {{CORR}} is correct.",
    "Distinguishes flood-dependent Inundation canals from permanent Perennial canals."
)
add_u11(make_question(CHAPTER_U11, "Canal Systems", "What is the difference between an 'Inundation Canal' and a 'Perennial Canal'?", opts, c, s))

# Q52: Seawater Intrusion in Coastal Aquifers
opts, c, s = rotate_options(
    "Excessive pumping of coastal fresh groundwater causes the hydraulic gradient to reverse, drawing saline seawater into inland drinking wells",
    ["Seawater evaporates completely into space", "Coastal cities sink 500 meters beneath ocean waves", "Freshwater turns into crude petroleum naturally"],
    "C",
    "Over-pumping of coastal fresh groundwater aquifers (in Chennai, Saurashtra, and coastal Odisha) lowers the water table below sea level, causing dense saline seawater to intrude inland, ruining drinking water wells.\nHence, Option {{CORR}} is correct.",
    "Explains seawater intrusion in coastal aquifers caused by groundwater over-extraction."
)
add_u11(make_question(CHAPTER_U11, "Coastal Hydrogeology", "What causes 'Seawater Intrusion' into freshwater aquifers in coastal Indian cities like Chennai and Saurashtra?", opts, c, s))

# Q53: Groundwater recharge methods: Pits and Shafts
opts, c, s = rotate_options(
    "Recharge pits and recharge shafts allow captured surface rainwater to penetrate impermeable clay layers directly into deep aquifers",
    ["Pits are used to burn plastic waste underground", "Shafts are used to launch weather research rockets", "Pits are used to store industrial radioactive wastewater"],
    "D",
    "Recharge pits and deep recharge shafts are engineered structures that channel clean filtered surface rainwater through dense, impermeable upper clay strata directly into porous, permeable water-bearing aquifer rock formations.\nHence, Option {{CORR}} is correct.",
    "Explains recharge pits and shafts bypassing impermeable upper layers to recharge deep aquifers."
)
add_u11(make_question(CHAPTER_U11, "Artificial Recharge", "How do engineered 'Recharge Shafts' and 'Recharge Pits' facilitate groundwater recharge?", opts, c, s))

# Q54: Water footprints of agricultural exports
opts, c, s = rotate_options(
    "Virtual water: export of water-intensive crops like basmati rice and sugarcane amounts to exporting billions of liters of scarce domestic groundwater",
    ["Exporting bottled river water to European supermarkets", "Water leaking from cargo freight containers onto railway tracks", "Importing foreign rainwater in oceanic tankers"],
    "A",
    "The concept of 'Virtual Water' demonstrates that when water-stressed India exports millions of tons of water-guzzling rice and sugar, it is effectively exporting billions of cubic meters of its depleted freshwater aquifers.\nHence, Option {{CORR}} is correct.",
    "Explains the 'Virtual Water' concept embedded in India's agricultural exports."
)
add_u11(make_question(CHAPTER_U11, "Virtual Water", "What is the significance of the concept of 'Virtual Water' in the context of India's rice and sugar exports?", opts, c, s))

# Q55: Interlinking of Rivers project (NRLP)
opts, c, s = rotate_options(
    "National River Linking Project: transferring surplus flood waters from Himalayan and Peninsular basins to water-deficit drought-prone basins",
    ["Draining all Indian rivers into a giant underground cavern in Delhi", "Pumping Arabian seawater across the Himalayas into Tibet", "Building a single continuous concrete dam across the entire coastline"],
    "B",
    "The National River Linking Project (NRLP) envisions connecting 30 major river links (Himalayan and Peninsular components) via storage reservoirs and link canals to transfer surplus flood waters to chronically drought-prone arid regions.\nHence, Option {{CORR}} is correct.",
    "Outlines the National River Linking Project transferring surplus floodwaters to drought basins."
)
add_u11(make_question(CHAPTER_U11, "River Interlinking", "What is the primary objective of the proposed 'National River Linking Project' (NRLP) in India?", opts, c, s))

# Q56: First Ken-Betwa river link
opts, c, s = rotate_options(
    "Madhya Pradesh and Uttar Pradesh, transferring surplus water from the Ken river to the water-deficit Betwa basin in Bundelkhand",
    ["Punjab and Haryana, linking the Sutlej and Yamuna", "Maharashtra and Gujarat, linking the Narmada and Tapi", "Kerala and Tamil Nadu, linking the Periyar and Vaigai"],
    "C",
    "The Ken-Betwa Link Project is the first river interlinking project taken up under the National Perspective Plan, transferring water from the Ken basin in MP to the drought-prone Betwa basin in Bundelkhand (UP and MP).\nHence, Option {{CORR}} is correct.",
    "Identifies the Ken-Betwa Link transferring surplus water to drought-prone Bundelkhand (MP & UP)."
)
add_u11(make_question(CHAPTER_U11, "River Interlinking", "The 'Ken-Betwa Link Project', the first river interlinking project implemented in India, benefits which drought-prone region?", opts, c, s))

# Q57: Eutrophication in freshwater lakes
opts, c, s = rotate_options(
    "Excessive nutrient runoff (nitrates and phosphates) causes massive algal blooms, depleting dissolved oxygen and killing aquatic fish",
    ["The water turns completely into dry white salt overnight", "The lake basin permanently elevates into a high mountain plateau", "The water becomes immune to all forms of chemical pollution"],
    "D",
    "Eutrophication occurs when agricultural fertilizer runoff and untreated domestic sewage introduce excess nitrates and phosphates into lakes, triggering explosive algal blooms that consume dissolved oxygen and cause fish asphyxiation.\nHence, Option {{CORR}} is correct.",
    "Defines Eutrophication: nutrient enrichment causing algal blooms and dissolved oxygen depletion."
)
add_u11(make_question(CHAPTER_U11, "Lake Ecology", "What ecological disaster is triggered by 'Eutrophication' in polluted freshwater lakes?", opts, c, s))

# Q58: Domestic Water Consumption norm: Urban vs Rural
opts, c, s = rotate_options(
    "135 liters per capita per day (lpcd) for urban piped communities, and 55 lpcd for rural households under Jal Jeevan Mission",
    ["1,000 lpcd in villages and 10 lpcd in cities", "10 lpcd in cities and 500 lpcd in villages", "Equal at 5,000 lpcd across all regions"],
    "A",
    "The Bureau of Indian Standards (BIS 1172) prescribes a benchmark of 135 liters per capita per day (lpcd) for urban communities with full flushing systems, while Jal Jeevan Mission targets 55 lpcd for rural households.\nHence, Option {{CORR}} is correct.",
    "Specifies domestic water supply norms: 135 lpcd urban benchmark and 55 lpcd rural JJM target."
)
add_u11(make_question(CHAPTER_U11, "Water Supply Norms", "What are the standard benchmark water supply norms prescribed for urban areas and rural households (under Jal Jeevan Mission) in India?", opts, c, s))

# Q59: Rainwater harvesting in desert Beris / Matkas
opts, c, s = rotate_options(
    "Shallow narrow percolation wells dug in saline clay depressions of western Rajasthan to collect sweet freshwater perched above clay beds",
    ["Deep borewells drilled 2,000 meters into solid granite to extract steam", "Concrete pipelines carrying river water from the Ganges to Jaisalmer", "Wooden barrels placed on camel carts to transport mountain snow"],
    "B",
    "In western Rajasthan, 'Beris' (or Dhis) are shallow, pitcher-shaped percolation wells dug in depressions where a subsurface impermeable bentonite clay layer (khada) prevents collected rainwater from mixing with deep saline groundwater.\nHence, Option {{CORR}} is correct.",
    "Describes traditional 'Beris' in Rajasthan tapping sweet perched rainwater above saline aquifers."
)
add_u11(make_question(CHAPTER_U11, "Traditional Water Harvesting", "In the desert tracts of western Rajasthan, what are 'Beris' (or Dhis)?", opts, c, s))

# Q60: Integrated Water Resources Management (IWRM)
opts, c, s = rotate_options(
    "A holistic process that promotes the coordinated development and management of water, land, and related resources to maximize economic and social welfare equitably without compromising sustainability",
    ["A commercial scheme to privatize all natural lakes and auction them to hotel chains", "A policy of building dams across every river without environmental impact assessments", "A strategy of draining all freshwater rivers into industrial salt works"],
    "C",
    "Integrated Water Resources Management (IWRM) is the globally accepted paradigm that coordinates the conservation, allocation, and use of water across sectors (agriculture, urban, industry, ecosystems) equitably and sustainably.\nHence, Option {{CORR}} is correct.",
    "Defines Integrated Water Resources Management (IWRM) as coordinated, equitable, sustainable water governance."
)
add_u11(make_question(CHAPTER_U11, "Water Governance", "What is the core principle of 'Integrated Water Resources Management' (IWRM)?", opts, c, s))

validate_and_collect(u11_qs, u11_seen)
assert len(u11_qs) == 60
with open("mock/geo_units/unit11.json", "w", encoding="utf-8") as f:
    json.dump(u11_qs, f, indent=2, ensure_ascii=False)
print("Unit 11 generated: 60 questions")
print("Total questions in part_b1:", len(u9_qs) + len(u10_qs) + len(u11_qs))
